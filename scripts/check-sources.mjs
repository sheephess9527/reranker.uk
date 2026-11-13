#!/usr/bin/env node
/**
 * Re-reads every source in data/models.json and checks the number this site
 * renders still appears there.
 *
 * Vendors revise their own figures (papers get new arXiv versions, model
 * cards get re-run), and nothing at build time can see that — build.mjs only
 * knows a source_url exists, not what it says. This fetches each one and
 * looks for the value as a standalone number in the page text.
 *
 *   node scripts/check-sources.mjs            # report; exit 1 on any miss
 *   node scripts/check-sources.mjs --verbose  # also print where each hit is
 *   STRICT_FETCH=1 node scripts/check-sources.mjs  # also fail on 429/5xx
 *
 * A source that is still 429/5xx (or unreachable) after every retry is
 * reported as a warning and skipped, not a failure: an outage says nothing
 * about the figure. A 404 or other non-OK status, and any "not found", still
 * exit 1. Set STRICT_FETCH=1 to treat transient errors as failures too.
 *
 * Needs open internet (HuggingFace, arXiv, GitHub), so it runs in the daily
 * real-network workflow rather than in PR CI.
 *
 * Per-fact fields it reads, beyond value/source_url:
 *   check_url   fetch this instead of source_url (e.g. a raw README when the
 *               human-facing page is JS-rendered)
 *   check       "manual" to skip — the number is in an image or a PDF figure
 *   check_note  why it's manual, and how it was read; printed on every run so
 *               a skip never goes unexplained
 *   check_pattern  a regex that must match instead of the bare number, with
 *               {value} standing for the (escaped) value. Use it when the
 *               number alone is too common on the page to prove anything —
 *               "0.05" appears all over a price list; "rerank-3 $0.00005
 *               $0.05" pins it to one row.
 *   check_hint  regex for the context to print on a miss (default: BEIR)
 *   check_raw   true to match check_pattern against the raw HTML rather than
 *               the visible text — for prices a page only ships as embedded
 *               JSON and renders client-side (cohere.com/pricing)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA = JSON.parse(fs.readFileSync(path.join(ROOT, "data/models.json"), "utf8"));
const VERBOSE = process.argv.includes("--verbose");

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", "#39": "'" };
function pageText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(#?\w+);/g, (m, e) => ENTITIES[e] ?? m)
    .replace(/\s+/g, " ");
}

function snippets(text, re, max = 3, pad = 140) {
  const out = [];
  for (const m of text.matchAll(re)) {
    out.push("…" + text.slice(Math.max(0, m.index - pad), m.index + m[0].length + pad).trim() + "…");
    if (out.length >= max) break;
  }
  return out;
}

// A 429 or 5xx says nothing about the figure, only that the host was busy
// (HuggingFace rate-limits runner IPs; docs.voyageai.com has had brief 500s),
// so those are retried a few times before giving up. A 504 from GitHub once
// failed the whole daily run (42471623555), hence the third, longer wait.
const RETRY_WAITS_MS = (process.env.RETRY_WAITS_MS ?? "5000,20000,60000").split(",").map(Number);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const pageCache = new Map();
async function fetchPage(url) {
  if (!pageCache.has(url)) {
    pageCache.set(
      url,
      (async () => {
        for (let attempt = 0; ; attempt++) {
          const res = await fetch(url, { headers: { "user-agent": "reranker.uk source check (+https://reranker.uk)" } });
          if (res.ok) {
            const raw = await res.text();
            return { raw, text: pageText(raw) };
          }
          const transient = res.status === 429 || res.status >= 500;
          if (!transient || attempt >= RETRY_WAITS_MS.length) {
            const err = new Error(`HTTP ${res.status}`);
            err.transient = transient;
            throw err;
          }
          const retryAfter = Number(res.headers.get("retry-after")) * 1000;
          const wait = Math.min(Math.max(RETRY_WAITS_MS[attempt], retryAfter || 0), 60_000);
          console.log(`  (HTTP ${res.status} from ${url}; retrying in ${Math.round(wait / 1000)} s)`);
          await sleep(wait);
        }
      })()
    );
  }
  return pageCache.get(url);
}

const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// In GitHub Actions each miss is also an error annotation, which the REST API
// serves (check-runs/<job id>/annotations) to clients that can't read raw logs.
const annotate = (msg) => process.env.GITHUB_ACTIONS && console.log(`::error title=check-sources::${msg}`);
const warn = (msg) => process.env.GITHUB_ACTIONS && console.log(`::warning title=check-sources::${msg}`);
const STRICT_FETCH = process.env.STRICT_FETCH === "1";

let failed = 0;
// Facts skipped because their source was down — reported, but not a failure.
const unreachable = [];
for (const [id, fields] of Object.entries(DATA)) {
  if (id.startsWith("_")) continue;
  for (const [field, fact] of Object.entries(fields)) {
    const key = `${id}.${field}`;
    const value = String(fact.value);
    if (fact.check === "manual") {
      console.log(`– ${key} = ${value}: manual — ${fact.check_note || "(no check_note: add one)"}`);
      if (!fact.check_note) failed++;
      continue;
    }
    const url = fact.check_url || fact.source_url;
    let page;
    try {
      page = await fetchPage(url);
    } catch (err) {
      // No flag means fetch itself threw (DNS, reset, timeout): also transient.
      if (err.transient !== false && !STRICT_FETCH) {
        console.log(`⚠ ${key} = ${value}: could not fetch ${url} (${err.message}); skipped`);
        warn(`${key} = ${value}: could not fetch ${url} (${err.message}); skipped`);
        unreachable.push(key);
        continue;
      }
      console.log(`✗ ${key} = ${value}: could not fetch ${url} (${err.message})`);
      annotate(`${key} = ${value}: could not fetch ${url} (${err.message})`);
      failed++;
      continue;
    }
    const text = page.text;
    // Standalone number: 55.3 must not match inside 155.36 or 55.367.
    const re = fact.check_pattern
      ? new RegExp(fact.check_pattern.replaceAll("{value}", escRe(value)), "g")
      : new RegExp(`(?<![\\d.])${escRe(value)}(?![\\d])`, "g");
    const hits = snippets(fact.check_raw ? page.raw : text, re);
    if (hits.length) {
      console.log(`✓ ${key} = ${value}: found at ${url}`);
      if (VERBOSE) for (const s of hits) console.log(`    ${s}`);
    } else {
      failed++;
      console.log(`✗ ${key} = ${value}: not found at ${url}`);
      annotate(`${key} = ${value}: not found at ${url}`);
      // Show what the page says instead, so the fix is a reading job, not a hunt.
      const hint = fact.check_hint ? new RegExp(fact.check_hint, "gi") : /BEIR/gi;
      const around = snippets(fact.check_raw ? page.raw : text, hint, 5);
      for (const s of around) console.log(`    ${s}`);
      if (!around.length) console.log(`    (nothing matching ${hint} on the page either — ${text.length} chars of text)`);
    }
  }
}

if (unreachable.length) {
  console.log(`\n⚠ ${unreachable.length} fact(s) skipped, source unreachable: ${unreachable.join(", ")}`);
}
if (failed) {
  console.log(`\n${failed} fact(s) need a look — update data/models.json (value, source_url, verified_on) or the check fields.`);
  process.exit(1);
}
console.log("\nEvery source still says what this site says.");

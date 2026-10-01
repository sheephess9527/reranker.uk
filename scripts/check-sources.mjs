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

const pageCache = new Map();
async function fetchText(url) {
  if (!pageCache.has(url)) {
    pageCache.set(
      url,
      (async () => {
        const res = await fetch(url, { headers: { "user-agent": "reranker.uk source check (+https://reranker.uk)" } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return pageText(await res.text());
      })()
    );
  }
  return pageCache.get(url);
}

const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

let failed = 0;
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
    let text;
    try {
      text = await fetchText(url);
    } catch (err) {
      console.log(`✗ ${key} = ${value}: could not fetch ${url} (${err.message})`);
      failed++;
      continue;
    }
    // Standalone number: 55.3 must not match inside 155.36 or 55.367.
    const re = new RegExp(`(?<![\\d.])${escRe(value)}(?![\\d])`, "g");
    const hits = snippets(text, re);
    if (hits.length) {
      console.log(`✓ ${key} = ${value}: found at ${url}`);
      if (VERBOSE) for (const s of hits) console.log(`    ${s}`);
    } else {
      failed++;
      console.log(`✗ ${key} = ${value}: not found at ${url}`);
      // Show what the page says instead, so the fix is a reading job, not a hunt.
      const around = snippets(text, /BEIR/gi, 5);
      for (const s of around) console.log(`    ${s}`);
      if (!around.length) console.log(`    (no "BEIR" on the page either — ${text.length} chars of text)`);
    }
  }
}

if (failed) {
  console.log(`\n${failed} fact(s) need a look — update data/models.json (value, source_url, verified_on) or the check fields.`);
  process.exit(1);
}
console.log("\nEvery source still says what this site says.");

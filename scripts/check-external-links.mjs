#!/usr/bin/env node
/**
 * Fetches every external link in the page sources and fails on any that no
 * longer resolves. check-links.mjs covers internal links at build time; this
 * covers the vendor docs, model cards and papers the pages cite, which move
 * or vanish without anyone here touching the site.
 *
 *   node scripts/check-external-links.mjs
 *
 * Needs open internet, so it runs in the daily real-network workflow. A 429,
 * 5xx or network error is retried (the host was busy, not gone); anything
 * else non-2xx is a failure. A link that only works via a redirect to a
 * different page is reported but passes — worth updating, not worth a red run.
 *
 * A link still failing that way after the retries is a warning, not a
 * failure, until it has failed on every run for TRANSIENT_DAYS days: on 1 Nov
 * 2026 docs.siliconflow.cn answered 502 on every path for hours and held up a
 * merge that had nothing to do with it. LINK_HEALTH_FILE (a JSON map of URL →
 * date it started failing) carries that across runs; the workflow keeps it in
 * the Actions cache. Without the file every such failure is just a warning on
 * its first day, so a host that stays down still turns the run red.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCES = ["src/pages", "src/partials"];
const SELF = /^https:\/\/(www\.)?reranker\.uk\//;
const RETRY_WAITS_MS = (process.env.RETRY_WAITS_MS ?? "5000,20000").split(",").map(Number);
const TRANSIENT_DAYS = Number(process.env.TRANSIENT_DAYS ?? 3);
const DAY_MS = 24 * 60 * 60 * 1000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function collectLinks() {
  const links = new Map(); // url → first file citing it
  for (const dir of SOURCES) {
    for (const rel of fs.readdirSync(path.join(ROOT, dir), { recursive: true })) {
      if (!rel.endsWith(".html")) continue;
      const html = fs.readFileSync(path.join(ROOT, dir, rel), "utf8");
      for (const [, url] of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
        const clean = url.replace(/&amp;/g, "&");
        if (!SELF.test(clean) && !links.has(clean)) links.set(clean, path.join(dir, rel));
      }
    }
  }
  return links;
}

async function check(url) {
  for (let attempt = 0; ; attempt++) {
    let res;
    try {
      res = await fetch(url, {
        headers: { "user-agent": "reranker.uk link check (+https://reranker.uk)" },
        signal: AbortSignal.timeout(30_000),
      });
    } catch (err) {
      if (attempt >= RETRY_WAITS_MS.length) return { ok: false, transient: true, why: err.cause?.code || err.message };
      await sleep(RETRY_WAITS_MS[attempt]);
      continue;
    }
    await res.body?.cancel();
    if (res.ok) return { ok: true, finalUrl: res.url };
    const transient = res.status === 429 || res.status >= 500;
    if (!transient || attempt >= RETRY_WAITS_MS.length) return { ok: false, transient, why: `HTTP ${res.status}` };
    await sleep(RETRY_WAITS_MS[attempt]);
  }
}

// Same page, give or take a trailing slash, scheme or www.
const samePage = (a, b) => {
  const n = (u) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  return n(a) === n(b);
};

/**
 * Sorts one link's result into pass, warn or fail, and returns the date it
 * started failing (to store) — null once it works or fails for good.
 */
export function judge(result, since, now = new Date(), days = TRANSIENT_DAYS) {
  if (result.ok) return { verdict: "pass", since: null };
  if (!result.transient) return { verdict: "fail", since: null };
  const start = since ? new Date(since) : now;
  const verdict = now - start >= days * DAY_MS ? "fail" : "warn";
  return { verdict, since: start.toISOString().slice(0, 10) };
}

async function main() {
  const links = collectLinks();
  const healthFile = process.env.LINK_HEALTH_FILE;
  let health = {};
  if (healthFile && fs.existsSync(healthFile)) {
    try {
      health = JSON.parse(fs.readFileSync(healthFile, "utf8"));
    } catch {
      health = {};
    }
  }

  let failed = 0;
  let warned = 0;
  const next = {};
  const results = await Promise.all([...links].map(async ([url, file]) => ({ url, file, ...(await check(url)) })));
  for (const r of results.sort((a, b) => a.url.localeCompare(b.url))) {
    const { verdict, since } = judge(r, health[r.url]);
    if (since) next[r.url] = since;
    if (verdict === "fail") {
      failed++;
      const how = r.transient ? `, failing since ${since}` : "";
      console.log(`✗ ${r.url} — ${r.why}${how} (cited in ${r.file})`);
    } else if (verdict === "warn") {
      warned++;
      const msg = `${r.url} — ${r.why} since ${since}; a failure if it lasts ${TRANSIENT_DAYS} days (cited in ${r.file})`;
      console.log(`⚠ ${msg}`);
      if (process.env.GITHUB_ACTIONS) console.log(`::warning::${msg}`);
    } else if (!samePage(r.url, r.finalUrl)) {
      console.log(`↪ ${r.url} → ${r.finalUrl} (cited in ${r.file}; consider linking the new URL)`);
    } else {
      console.log(`✓ ${r.url}`);
    }
  }
  if (healthFile) fs.writeFileSync(healthFile, JSON.stringify(next, null, 2) + "\n");
  const warnNote = warned ? ` ${warned} more unreachable for now (5xx or network), not counted yet.` : "";
  console.log(
    failed
      ? `\n${failed} of ${links.size} external link(s) broken.${warnNote}`
      : warned
        ? `\nNo external link is broken for good.${warnNote}`
        : `\nAll ${links.size} external links resolve.`
  );
  process.exit(failed ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();

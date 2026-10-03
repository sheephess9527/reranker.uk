#!/usr/bin/env node
/**
 * Fetches every external link in the page sources and fails on any that no
 * longer resolves. check-links.mjs covers internal links at build time; this
 * covers the vendor docs, model cards and papers the pages cite, which move
 * or vanish without anyone here touching the site.
 *
 *   node scripts/check-external-links.mjs
 *
 * Needs open internet, so it runs in the daily real-network workflow. A 429
 * or 5xx is retried (the host was busy, not gone); anything else non-2xx is a
 * failure. A link that only works via a redirect to a different page is
 * reported but passes — worth updating, not worth a red run.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCES = ["src/pages", "src/partials"];
const SELF = /^https:\/\/(www\.)?reranker\.uk\//;
const RETRY_WAITS_MS = (process.env.RETRY_WAITS_MS ?? "5000,20000").split(",").map(Number);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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

async function check(url) {
  for (let attempt = 0; ; attempt++) {
    let res;
    try {
      res = await fetch(url, {
        headers: { "user-agent": "reranker.uk link check (+https://reranker.uk)" },
        signal: AbortSignal.timeout(30_000),
      });
    } catch (err) {
      if (attempt >= RETRY_WAITS_MS.length) return { ok: false, why: err.cause?.code || err.message };
      await sleep(RETRY_WAITS_MS[attempt]);
      continue;
    }
    await res.body?.cancel();
    if (res.ok) return { ok: true, finalUrl: res.url };
    const transient = res.status === 429 || res.status >= 500;
    if (!transient || attempt >= RETRY_WAITS_MS.length) return { ok: false, why: `HTTP ${res.status}` };
    await sleep(RETRY_WAITS_MS[attempt]);
  }
}

// Same page, give or take a trailing slash, scheme or www.
const samePage = (a, b) => {
  const n = (u) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  return n(a) === n(b);
};

let failed = 0;
const results = await Promise.all([...links].map(async ([url, file]) => ({ url, file, ...(await check(url)) })));
for (const { url, file, ok, why, finalUrl } of results.sort((a, b) => a.url.localeCompare(b.url))) {
  if (!ok) {
    failed++;
    console.log(`✗ ${url} — ${why} (cited in ${file})`);
  } else if (!samePage(url, finalUrl)) {
    console.log(`↪ ${url} → ${finalUrl} (cited in ${file}; consider linking the new URL)`);
  } else {
    console.log(`✓ ${url}`);
  }
}
console.log(failed ? `\n${failed} of ${links.size} external link(s) broken.` : `\nAll ${links.size} external links resolve.`);
process.exit(failed ? 1 : 0);

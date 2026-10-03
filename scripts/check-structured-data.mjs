#!/usr/bin/env node
/**
 * Checks the JSON-LD in every built page (run after `npm run build`):
 *
 *   - it parses;
 *   - no FAQPage or HowTo. The FAQs these pages carried were never shown on
 *     the page (Google's structured-data rules require marked-up content to
 *     be visible) and had gone stale — they still claimed Jina v3 beat
 *     Qwen3-Reranker-4B after the site withdrew that. Google stopped showing
 *     both rich results for sites like this one in 2023 anyway;
 *   - inLanguage matches the page's locale, and on /zh/ the headline, name,
 *     description and breadcrumb labels are Chinese — the /zh/ copies used to
 *     ship the English structured data verbatim.
 *
 * build.mjs's syncJsonLd() is what makes these hold; this keeps it honest.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PUBLIC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public");
const BANNED = new Set(["FAQPage", "HowTo"]);
const DESCRIBED = new Set(["Article", "WebApplication", "CollectionPage", "WebSite"]);
const CJK = /[一-鿿]/;

const problems = [];
let blocks = 0;
for (const rel of fs.readdirSync(PUBLIC, { recursive: true }).filter((f) => f.endsWith(".html"))) {
  const zh = rel.startsWith("zh" + path.sep);
  const html = fs.readFileSync(path.join(PUBLIC, rel), "utf8");
  for (const [, body] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    blocks++;
    let data;
    try {
      data = JSON.parse(body);
    } catch (err) {
      problems.push(`${rel}: invalid JSON-LD (${err.message})`);
      continue;
    }
    for (const node of Array.isArray(data) ? data : data["@graph"] || [data]) {
      const type = node["@type"];
      if (BANNED.has(type)) problems.push(`${rel}: ${type} — not shown on the page; remove it`);
      if (DESCRIBED.has(type)) {
        const want = zh ? "zh-Hans" : "en";
        if (node.inLanguage !== want) problems.push(`${rel}: ${type} inLanguage ${node.inLanguage}, expected ${want}`);
        if (zh) {
          for (const field of type === "WebSite" ? ["description"] : ["headline", "name", "description"]) {
            if (node[field] && !CJK.test(node[field])) problems.push(`${rel}: ${type}.${field} is not Chinese: ${node[field]}`);
          }
        }
      }
      if (zh && type === "BreadcrumbList") {
        for (const item of node.itemListElement || []) {
          if (!CJK.test(item.name)) problems.push(`${rel}: breadcrumb "${item.name}" is not Chinese`);
        }
      }
    }
  }
}

for (const p of problems) console.log(`✗ ${p}`);
console.log(problems.length ? `\n${problems.length} structured-data problem(s).` : `Checked ${blocks} JSON-LD blocks: OK.`);
process.exit(problems.length ? 1 : 0);

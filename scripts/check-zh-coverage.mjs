#!/usr/bin/env node
/**
 * Reports prose on the built /zh/ pages that is still English.
 *
 * The Chinese mirror is pre-rendered from src/i18n dictionaries keyed on the
 * English source text, so editing an English string silently orphans its
 * translation. This finds those gaps: substantial text blocks that survived
 * the build with little or no CJK in them.
 *
 * Usage: node scripts/check-zh-coverage.mjs [--min 40]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parse } from "node-html-parser";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ZH = path.join(__dirname, "..", "public", "zh");

const minLen = Number(process.argv[process.argv.indexOf("--min") + 1]) || 40;

/* Text that is legitimately English on a Chinese page. */
const ALLOW = [
  /^[\s\w.,;:()/@#+*-]+$/,          // pure ASCII identifiers / model names
  /^(pip|npm|curl|import|from|const|python)\b/i,
];

const SEL = [
  "main h1", "main h2", "main h3", "main h4",
  "main p", "main li", "main blockquote", "main td", "main th",
  "main .lead", "main .meta",
].join(", ");

const cjk = (s) => (s.match(/[一-鿿]/g) || []).length;

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (f.endsWith(".html")) out.push(p);
  }
  return out;
}

let total = 0;
const report = [];

for (const file of walk(ZH)) {
  const root = parse(fs.readFileSync(file, "utf8"));
  const hits = [];
  for (const el of root.querySelectorAll(SEL)) {
    if (el.closest("pre") || el.closest("code")) continue;
    if (el.querySelector("p, li, table")) continue; // containers, not leaves
    const text = el.text.replace(/\s+/g, " ").trim();
    if (text.length < minLen) continue;
    if (cjk(text) / text.length > 0.08) continue;
    if (ALLOW.some((re) => re.test(text))) continue;
    hits.push(text.slice(0, 110));
  }
  if (hits.length) {
    total += hits.length;
    report.push([path.relative(ZH, file), hits]);
  }
}

if (!total) {
  console.log("Chinese pages: no untranslated prose found.");
} else {
  console.log(`Untranslated prose blocks: ${total}\n`);
  for (const [file, hits] of report) {
    console.log(`${file}  (${hits.length})`);
    for (const h of hits) console.log(`   · ${h}`);
    console.log();
  }
}
process.exitCode = 0;

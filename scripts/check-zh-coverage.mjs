#!/usr/bin/env node
/**
 * Reports prose on the built /zh/ pages that is still English.
 *
 * The Chinese mirror is pre-rendered from src/i18n dictionaries keyed on the
 * English source text, so editing an English string silently orphans its
 * translation. This finds those gaps: substantial text blocks that survived
 * the build with little or no CJK in them.
 *
 * Short text is checked a second way, because "$0.05/M tokens† (200M free)"
 * is too short for the first pass and sat untranslated in the models table
 * for weeks: a table cell, heading, pill or list item that reads exactly
 * the same as on the English page and still has an ordinary lowercase
 * English word in it is reported too. Names that are meant to stay English
 * ("v3.5 listwise") are marked by mapping them to themselves in the page's
 * dictionary.
 *
 * Usage: node scripts/check-zh-coverage.mjs [--min 40]
 */
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";
import { parse } from "node-html-parser";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, "..", "public");
const ZH = path.join(PUBLIC, "zh");
const I18N = path.join(__dirname, "..", "src", "i18n");

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

const SHORT_SEL = [
  "main h1", "main h2", "main h3", "main h4", "main li", "main td", "main th",
  "main dt", "main dd", "main summary", "main figcaption", "main caption", "main .pill",
].join(", ");
const ENGLISH_WORD = /(^|[\s(])[a-z]{3,}(?=[\s).,;:!?†*]|$)/;
const squash = (s) => s.replace(/\s+/g, " ").trim();

/* Texts a dictionary deliberately leaves in English (key maps to itself). */
const keptEnglish = new Set();
for (const f of fs.readdirSync(I18N)) {
  if (!f.endsWith(".js") || f === "shared.js") continue;
  const ctx = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(I18N, f), "utf8"), ctx);
  for (const [k, v] of Object.entries(ctx.window.I18N_PAGE?.zh || {})) {
    if (k === v) keptEnglish.add(squash(parse(k).text));
  }
}

const leaves = (root) =>
  root
    .querySelectorAll(SHORT_SEL)
    .filter((el) => !el.closest("pre") && !el.closest("code") && !el.querySelector("p, li, table, td"))
    .map((el) => squash(el.text));

const cjk = (s) => (s.match(/[一-鿿\u3000-\u303f\uff00-\uffef]/g) || []).length; // incl. 、（）：

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
    // Mostly names and a few Chinese words ("用 sentence-transformers 跑 …"):
    // translated, unless a run of plain English words is left in it.
    if (cjk(text) >= 2 && !/\b[a-z]{2,} [a-z]{2,} [a-z]{2,}\b/.test(text)) continue;
    if (ALLOW.some((re) => re.test(text))) continue;
    hits.push(text.slice(0, 110));
  }
  const enFile = path.join(PUBLIC, path.relative(ZH, file));
  if (fs.existsSync(enFile)) {
    const en = new Set(leaves(parse(fs.readFileSync(enFile, "utf8"))));
    for (const text of new Set(leaves(root))) {
      if (text.length >= minLen || !en.has(text) || keptEnglish.has(text)) continue;
      if (ENGLISH_WORD.test(text)) hits.push(text);
    }
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

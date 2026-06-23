#!/usr/bin/env node
/** One-time helper: extract <main> from public/*.html into src/pages/ */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const OUT = path.join(ROOT, "src", "pages");

function walk(dir, base = "") {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.join(base, ent.name);
    if (ent.isDirectory()) out.push(...walk(path.join(dir, ent.name), rel));
    else if (ent.name.endsWith(".html")) out.push(rel.replace(/\\/g, "/"));
  }
  return out;
}

function extractMeta(html) {
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  const description = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || "";
  const robots = (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || "";
  const ogType = (html.match(/<meta property="og:type" content="([^"]*)"/) || [])[1] || "website";
  const ogTitle = (html.match(/<meta property="og:title" content="([^"]*)"/) || [])[1] || title;
  const ogDescription = (html.match(/<meta property="og:description" content="([^"]*)"/) || [])[1] || description;

  const headStart = html.indexOf("<head>");
  const headEnd = html.indexOf("</head>");
  let headInner = html.slice(headStart + 6, headEnd);
  headInner = headInner
    .replace(/<meta charset="[^"]*"[^>]*>\s*/i, "")
    .replace(/<meta name="viewport"[^>]*>\s*/i, "")
    .replace(/<title>[^<]*<\/title>\s*/i, "")
    .replace(/<meta name="description"[^>]*>\s*/i, "")
    .replace(/<link rel="canonical"[^>]*>\s*/i, "")
    .replace(/<meta name="theme-color"[^>]*>\s*/i, "")
    .replace(/<meta name="robots"[^>]*>\s*/i, "")
    .replace(/<meta name="author"[^>]*>\s*/i, "")
    .replace(/<link rel="icon"[^>]*>\s*/i, "")
    .replace(/<link rel="apple-touch-icon"[^>]*>\s*/i, "")
    .replace(/<link rel="manifest"[^>]*>\s*/i, "")
    .replace(/<meta property="og:type"[^>]*>\s*/gi, "")
    .replace(/<meta property="og:title"[^>]*>\s*/gi, "")
    .replace(/<meta property="og:description"[^>]*>\s*/gi, "")
    .replace(/<meta property="og:url"[^>]*>\s*/gi, "")
    .replace(/<meta property="og:site_name"[^>]*>\s*/gi, "")
    .replace(/<meta property="og:locale"[^>]*>\s*/gi, "")
    .replace(/<meta name="twitter:card"[^>]*>\s*/gi, "")
    .replace(/<meta property="og:image"[^>]*>\s*/gi, "")
    .replace(/<meta property="og:image:width"[^>]*>\s*/gi, "")
    .replace(/<meta property="og:image:height"[^>]*>\s*/gi, "")
    .replace(/<meta property="og:image:alt"[^>]*>\s*/gi, "")
    .replace(/<meta name="twitter:image"[^>]*>\s*/gi, "")
    .replace(/<link rel="stylesheet" href="\/assets\/css\/style\.css"[^>]*>\s*/i, "")
    .trim();

  const mainMatch = html.match(/<main[\s\S]*?<\/main>/);
  if (!mainMatch) throw new Error("no main");
  const main = mainMatch[0];

  const scripts = [];
  const i18n = (html.match(/<script src="\/assets\/js\/i18n\/([^"]+)\.js"><\/script>/) || [])[1];
  if (i18n) scripts.push(`<script src="/assets/js/i18n/${i18n}.js"></script>`);
  const demoMod = html.includes('type="module" src="/assets/js/demo.js"');
  if (demoMod) scripts.push('<script type="module" src="/assets/js/demo.js"></script>');

  return {
    title,
    description,
    canonical,
    robots,
    og_type: ogType,
    og_title: ogTitle,
    og_description: ogDescription,
    head_extra: headInner,
    page_scripts: scripts.join("\n  "),
    main,
  };
}

for (const rel of walk(PUBLIC)) {
  const html = fs.readFileSync(path.join(PUBLIC, rel), "utf8");
  if (!html.includes("<main")) continue;
  const m = extractMeta(html);
  const meta = {
    title: m.title,
    description: m.description,
    canonical: m.canonical,
    robots: m.robots,
    og_type: m.og_type,
    og_title: m.og_title,
    og_description: m.og_description,
    head_extra: m.head_extra,
    page_scripts: m.page_scripts,
  };
  const out = `<!-- @meta ${JSON.stringify(meta)} -->\n\n${m.main}\n`;
  const outPath = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, out, "utf8");
  console.log("migrated", rel);
}
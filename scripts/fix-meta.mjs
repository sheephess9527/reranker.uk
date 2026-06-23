#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const PAGES = path.join(ROOT, "src", "pages");

function extractMetaFromPublic(html) {
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  const description = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || "";
  const robots = (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || "";
  const ogType = (html.match(/<meta property="og:type" content="([^"]*)"/) || [])[1] || "website";
  const ogTitle = (html.match(/<meta property="og:title" content="([^"]*)"/) || [])[1] || title;
  const ogDescription =
    (html.match(/<meta property="og:description" content="([^"]*)"/) || [])[1] || description;

  const headStart = html.indexOf("<head>");
  const headEnd = html.indexOf("</head>");
  let headInner = html.slice(headStart + 6, headEnd);
  const strip = [
    /<meta charset="[^"]*"[^>]*>\s*/gi,
    /<meta name="viewport"[^>]*>\s*/gi,
    /<title>[^<]*<\/title>\s*/gi,
    /<meta name="description"[^>]*>\s*/gi,
    /<link rel="canonical"[^>]*>\s*/gi,
    /<meta name="theme-color"[^>]*>\s*/gi,
    /<meta name="robots"[^>]*>\s*/gi,
    /<meta name="author"[^>]*>\s*/gi,
    /<link rel="icon"[^>]*>\s*/gi,
    /<link rel="apple-touch-icon"[^>]*>\s*/gi,
    /<link rel="manifest"[^>]*>\s*/gi,
    /<meta property="og:type"[^>]*>\s*/gi,
    /<meta property="og:title"[^>]*>\s*/gi,
    /<meta property="og:description"[^>]*>\s*/gi,
    /<meta property="og:url"[^>]*>\s*/gi,
    /<meta property="og:site_name"[^>]*>\s*/gi,
    /<meta property="og:locale"[^>]*>\s*/gi,
    /<meta name="twitter:card"[^>]*>\s*/gi,
    /<meta property="og:image"[^>]*>\s*/gi,
    /<meta property="og:image:width"[^>]*>\s*/gi,
    /<meta property="og:image:height"[^>]*>\s*/gi,
    /<meta property="og:image:alt"[^>]*>\s*/gi,
    /<meta name="twitter:image"[^>]*>\s*/gi,
    /<link rel="stylesheet" href="\/assets\/css\/style\.css"[^>]*>\s*/gi,
    /<link rel="preconnect"[^>]*>\s*/gi,
    /<link rel="dns-prefetch"[^>]*>\s*/gi,
  ];
  for (const re of strip) headInner = headInner.replace(re, "");
  headInner = headInner.trim();

  const scripts = [];
  const i18n = (html.match(/<script src="\/assets\/js\/i18n\/([^"]+)\.js"><\/script>/) || [])[1];
  if (i18n) scripts.push(`<script src="/assets/js/i18n/${i18n}.js"></script>`);
  if (html.includes('type="module" src="/assets/js/demo.js"'))
    scripts.push('<script type="module" src="/assets/js/demo.js"></script>');

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
  };
}

function mainFromSrc(raw) {
  const idx = raw.indexOf("<main");
  return idx >= 0 ? raw.slice(idx).trim() : raw.trim();
}

function walk(dir, base = "") {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.join(base, ent.name);
    if (ent.isDirectory()) out.push(...walk(path.join(dir, ent.name), rel));
    else if (ent.name.endsWith(".html")) out.push(rel.replace(/\\/g, "/"));
  }
  return out;
}

for (const rel of walk(PAGES)) {
  const pagePath = path.join(PAGES, rel);
  const metaPath = pagePath.replace(/\.html$/, ".meta.json");
  if (fs.existsSync(metaPath)) continue;

  const srcRaw = fs.readFileSync(pagePath, "utf8");
  const pubPath = path.join(PUBLIC, rel);
  const pubHtml = fs.existsSync(pubPath) ? fs.readFileSync(pubPath, "utf8") : "";
  const meta = pubHtml ? extractMetaFromPublic(pubHtml) : {
    title: "reranker.uk",
    description: "",
    canonical: `https://reranker.uk/${rel.replace(/index\.html$/, "")}`,
    robots: "index, follow",
    og_type: "website",
    og_title: "reranker.uk",
    og_description: "",
    head_extra: "",
    page_scripts: "",
  };

  fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), "utf8");
  fs.writeFileSync(pagePath, mainFromSrc(srcRaw) + "\n", "utf8");
  console.log("fixed", rel);
}
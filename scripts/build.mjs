#!/usr/bin/env node
/**
 * Assembles src/pages/*.html + partials → public/*.html
 * Page files use an HTML comment meta block:
 *   <!-- @meta {"title":"...","canonical":"...", ...} -->
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "src");
const PUBLIC = path.join(ROOT, "public");
const PAGES = path.join(SRC, "pages");
const PARTIALS = path.join(SRC, "partials");

const DEFAULT_META = {
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  og_type: "website",
  og_title: "",
  og_description: "",
  head_extra: "",
  page_scripts: "",
};

function read(p) {
  return fs.readFileSync(p, "utf8");
}

function partial(name) {
  return read(path.join(PARTIALS, name));
}

function fill(tpl, vars) {
  return tpl.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const k = key.toLowerCase();
    return vars[k] != null ? vars[k] : "";
  });
}

function parsePage(filePath) {
  const raw = read(filePath);
  const metaPath = filePath.replace(/\.html$/, ".meta.json");
  let meta = { ...DEFAULT_META };
  let body = raw.trim();

  if (fs.existsSync(metaPath)) {
    meta = { ...meta, ...JSON.parse(read(metaPath)) };
  } else {
    const metaMatch = raw.match(/<!--\s*@meta\s*([\s\S]*?)\s*-->/);
    if (!metaMatch) throw new Error(`Missing meta in ${filePath}`);
    meta = { ...meta, ...JSON.parse(metaMatch[1]) };
    body = raw.slice(metaMatch[0].length).trim();
  }
  return { meta, body };
}

function buildOne(relPath) {
  const { meta, body } = parsePage(path.join(PAGES, relPath));
  const vars = {
    title: meta.title,
    description: meta.description,
    canonical: meta.canonical,
    robots: meta.robots || DEFAULT_META.robots,
    og_type: meta.og_type || meta.ogType || DEFAULT_META.og_type,
    og_title: meta.og_title || meta.ogTitle || meta.title,
    og_description: meta.og_description || meta.ogDescription || meta.description,
    head_extra: meta.head_extra || meta.headExtra || "",
    page_scripts: meta.page_scripts || meta.pageScripts || "",
  };

  let html = fill(partial("head-open.html"), vars);
  html += "\n</head>\n<body>\n";
  html += partial("nav.html");
  html += "\n";
  html += body;
  html += "\n";
  html += fill(partial("footer.html"), {
    page_scripts: vars.page_scripts,
  });

  const outPath = path.join(PUBLIC, relPath);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, "utf8");
  return outPath;
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

function buildAll() {
  const pages = walk(PAGES);
  for (const p of pages) buildOne(p);
  console.log(`Built ${pages.length} pages → public/`);
  return pages.length;
}

const watch = process.argv.includes("--watch");
buildAll();

if (watch) {
  console.log("Watching src/pages and src/partials…");
  const targets = [PAGES, PARTIALS];
  for (const t of targets) {
    fs.watch(t, { recursive: true }, () => {
      try {
        buildAll();
      } catch (e) {
        console.error(e.message);
      }
    });
  }
}
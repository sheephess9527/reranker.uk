#!/usr/bin/env node
/**
 * Renders a 1200×630 social-preview card for every built page, so a link
 * shared to WeChat, X or Slack shows that page's own title instead of the
 * one site-wide cover.
 *
 *   npm run build && node scripts/og-images.mjs && npm run build
 *   node scripts/og-images.mjs --check   # exit 1 if any card is missing or stale
 *
 * Cards are drawn from the built HTML (the page's <h1>, its description and
 * the section it sits in), rendered in Chromium and written to
 * public/assets/og/<page>.jpg (JPEG keeps the gradient small) — /zh/ pages get their own Chinese cards. The
 * build points og:image at a page's card when one exists. Rendering needs a
 * CJK font (WenQuanYi Zen Hei here), so cards are generated locally and
 * committed; --check runs in CI and catches a card whose page has changed.
 * data/og-images.json records a hash of what each card shows, which is how
 * unchanged cards are skipped and stale ones found.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { parse } from "node-html-parser";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const OUT = path.join(PUBLIC, "assets/og");
const MANIFEST = path.join(ROOT, "data/og-images.json");
const CHECK = process.argv.includes("--check");
const TEMPLATE_VERSION = 3;
// Pages that keep the site-wide cover.
const SKIP = new Set(["404", "zh/404"]);

const LABELS = {
  en: { guides: "Guide", models: "Models", tool: "Tool", changelog: "Changelog", page: "" },
  zh: { guides: "指南", models: "模型", tool: "工具", changelog: "更新日志", page: "" },
};

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (p !== path.join(PUBLIC, "assets")) walk(p, out);
    } else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

function cardFor(file) {
  const rel = path.relative(PUBLIC, file).replace(/\.html$/, "").split(path.sep).join("/");
  if (SKIP.has(rel)) return null;
  const root = parse(fs.readFileSync(file, "utf8"));
  const zh = rel.startsWith("zh/");
  const bare = zh ? rel.slice(3) : rel;
  const section = bare.startsWith("guides/") && bare !== "guides/index" ? "guides"
    : bare.startsWith("models/") ? "models"
    : /calculator|demo/.test(bare) ? "tool"
    : bare === "changelog" ? "changelog" : "page";
  const title = root.querySelector("main h1")?.text.replace(/\s+/g, " ").trim();
  const description = root.querySelector('meta[name="description"]')?.getAttribute("content") || "";
  const url = (root.querySelector('link[rel="canonical"]')?.getAttribute("href") || "").replace(/^https:\/\//, "");
  if (!title) return null;
  const card = { rel, lang: zh ? "zh" : "en", label: LABELS[zh ? "zh" : "en"][section], title, description, url };
  card.hash = crypto.createHash("sha1").update(JSON.stringify([TEMPLATE_VERSION, card])).digest("hex").slice(0, 16);
  return card;
}

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const LOGO = fs.readFileSync(path.join(PUBLIC, "assets/img/favicon.svg"), "utf8");

function html(c) {
  const long = c.title.length > (c.lang === "zh" ? 26 : 56);
  return `<!doctype html><html lang="${c.lang === "zh" ? "zh-Hans" : "en"}"><head><meta charset="utf-8"><style>
  *{box-sizing:border-box;margin:0}
  html,body{width:1200px;height:630px}
  body{background:linear-gradient(135deg,#0b0d17 0%,#121530 100%);color:#f4f5fb;
    font-family:"Helvetica Neue",Arial,"WenQuanYi Zen Hei",sans-serif;padding:76px 90px 64px;position:relative;overflow:hidden}
  body:before{content:"";position:absolute;inset:0 0 auto 0;height:8px;background:linear-gradient(90deg,#6366f1,#2dd4bf)}
  .brand{display:flex;align-items:center;gap:22px;font-size:40px;font-weight:700;color:#e6e8f5}
  .brand svg{width:72px;height:72px}
  .brand span{color:#2dd4bf}
  .label{display:inline-block;margin-top:46px;padding:8px 22px;border:1.5px solid #2f3566;border-radius:999px;
    background:#1b1f3d;color:#9fb0ff;font-size:26px;font-weight:600;letter-spacing:.02em}
  h1{margin-top:26px;font-size:${long ? 56 : 66}px;line-height:1.16;font-weight:800;letter-spacing:-.01em;
    display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
  p{margin-top:22px;font-size:28px;line-height:1.4;color:#a9afd0;max-width:1000px;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
  .url{position:absolute;left:90px;bottom:44px;font-size:24px;color:#6f77a8}
  </style></head><body>
  <div class="brand">${LOGO}<div>reranker<span>.uk</span></div></div>
  ${c.label ? `<div class="label">${esc(c.label)}</div>` : `<div style="height:46px"></div>`}
  <h1>${esc(c.title)}</h1>
  <p>${esc(c.description)}</p>
  <div class="url">${esc(c.url)}</div>
  </body></html>`;
}

const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf8")) : {};
const cards = walk(PUBLIC).map(cardFor).filter(Boolean).sort((a, b) => a.rel.localeCompare(b.rel));
const pngPath = (c) => path.join(OUT, c.rel + ".jpg");
const todo = cards.filter((c) => manifest[c.rel] !== c.hash || !fs.existsSync(pngPath(c)));

if (CHECK) {
  for (const c of todo) console.log(`stale or missing: ${c.rel} — run node scripts/og-images.mjs, then npm run build`);
  console.log(todo.length ? `${todo.length} of ${cards.length} social cards need regenerating.` : `All ${cards.length} social cards are current.`);
  process.exit(todo.length ? 1 : 0);
}

if (todo.length) {
  const { chromium } = await import("@playwright/test");
  const pinned = "/opt/pw-browsers/chromium";
  const browser = await chromium.launch(fs.existsSync(pinned) ? { executablePath: pinned } : {});
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  for (const c of todo) {
    await page.setContent(html(c), { waitUntil: "load" });
    fs.mkdirSync(path.dirname(pngPath(c)), { recursive: true });
    await page.screenshot({ path: pngPath(c), type: "jpeg", quality: 85 });
    manifest[c.rel] = c.hash;
    console.log(`rendered ${c.rel}`);
  }
  await browser.close();
}
const keep = new Set(cards.map((c) => c.rel));
for (const k of Object.keys(manifest)) if (!keep.has(k)) delete manifest[k];
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`${todo.length} rendered, ${cards.length - todo.length} unchanged.`);

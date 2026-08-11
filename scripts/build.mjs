#!/usr/bin/env node
/**
 * reranker.uk build
 *
 * Assembles src/pages/*.html + src/partials/*.html into public/, and produces a
 * fully pre-rendered Chinese mirror under public/zh/ so each locale has a real,
 * crawlable URL instead of a client-side toggle.
 *
 * Per page it also:
 *   - resolves canonical + hreflang for both locales,
 *   - marks the current top-nav item with aria-current,
 *   - injects a BreadcrumbList when the page's meta doesn't already carry one,
 *   - collects a sitemap entry with lastmod taken from git.
 *
 * Edit src/. Never hand-edit public/*.html.
 */
import fs from "fs";
import path from "path";
import vm from "vm";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";
import { parse } from "node-html-parser";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "src");
const PUBLIC = path.join(ROOT, "public");
const PAGES = path.join(SRC, "pages");
const PARTIALS = path.join(SRC, "partials");
const I18N_DIR = path.join(SRC, "i18n");

const SITE = "https://reranker.uk";
const ZH_PREFIX = "/zh";

/** Paths that must never be locale-prefixed when rewriting links. */
const LOCALE_NEUTRAL = [
  "/assets/",
  "/sitemap.xml",
  "/robots.txt",
  "/site.webmanifest",
  "/changelog.rss",
];

const DEFAULT_META = {
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  og_type: "website",
  og_title: "",
  og_description: "",
  head_extra: "",
  page_scripts: "",
};

/** Pages excluded from the sitemap. */
const NO_SITEMAP = new Set(["404.html"]);

/** changefreq / priority by URL shape — keeps sitemap tuning out of every meta file. */
function sitemapHints(urlPath) {
  if (urlPath === "/") return { changefreq: "weekly", priority: "1.0" };
  if (urlPath === "/demo.html") return { changefreq: "weekly", priority: "0.9" };
  if (urlPath === "/guides/" || urlPath === "/models/")
    return { changefreq: "monthly", priority: "0.9" };
  if (urlPath === "/privacy.html") return { changefreq: "yearly", priority: "0.3" };
  if (urlPath === "/changelog.html") return { changefreq: "monthly", priority: "0.5" };
  if (urlPath.startsWith("/guides/")) return { changefreq: "monthly", priority: "0.8" };
  if (urlPath.startsWith("/models/")) return { changefreq: "monthly", priority: "0.7" };
  return { changefreq: "monthly", priority: "0.6" };
}

const read = (p) => fs.readFileSync(p, "utf8");
const partial = (name) => read(path.join(PARTIALS, name));

function fill(tpl, vars) {
  return tpl.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const k = key.toLowerCase();
    return vars[k] != null ? vars[k] : "";
  });
}

const escXml = (s) =>
  String(s).replace(/[<>&"']/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" }[c]));

/* ------------------------------------------------------------------ *
 * Source discovery
 * ------------------------------------------------------------------ */

function walk(dir, base = "") {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.join(base, ent.name);
    if (ent.isDirectory()) out.push(...walk(path.join(dir, ent.name), rel));
    else if (ent.name.endsWith(".html")) out.push(rel.replace(/\\/g, "/"));
  }
  return out;
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

/** `guides/index.html` → `/guides/`, `demo.html` → `/demo.html`. */
function urlPathFor(relPath) {
  const clean = relPath.replace(/index\.html$/, "");
  return "/" + clean;
}

/** Most recent commit date touching a source file, for sitemap lastmod. */
function gitLastmod(files) {
  for (const f of files) {
    try {
      const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", f], {
        cwd: ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
      if (out) return out;
    } catch {
      /* not a git checkout, or file never committed */
    }
  }
  return new Date().toISOString().slice(0, 10);
}

/* ------------------------------------------------------------------ *
 * i18n dictionaries (same data the browser engine uses)
 * ------------------------------------------------------------------ */

/** Evaluate an i18n bundle in a sandbox and hand back the `window` it wrote to. */
function loadDict(file) {
  const full = path.join(I18N_DIR, file);
  if (!fs.existsSync(full)) return {};
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  new vm.Script(read(full), { filename: full }).runInContext(sandbox);
  return sandbox.window;
}

const SHARED = loadDict("shared.js").I18N_SHARED || {};
const SHARED_KEYS = SHARED.keys || {};

/** The i18n bundle a page pulls in, e.g. `<script src="…/i18n/home.js">` → home.js */
function dictFileFor(meta) {
  const m = /assets\/js\/i18n\/([A-Za-z0-9._-]+\.js)/.exec(meta.page_scripts || "");
  return m ? m[1] : null;
}

/**
 * Dictionaries are a build-time input now that /zh/ is pre-rendered, so the
 * `<script>` tags that used to ship ~200 KB of translations are dropped from
 * the emitted HTML. The files stay in the repo as the translation source.
 */
function stripDictScripts(pageScripts) {
  return (pageScripts || "")
    .replace(/[ \t]*<script[^>]*assets\/js\/i18n\/[^>]*><\/script>\s*\n?/g, "")
    .trim();
}

const norm = (s) => (s || "").replace(/\s+/g, " ").trim();

/** Selectors the legacy innerHTML dictionaries are keyed against (mirrors i18n.js). */
const LEGACY_SEL = [
  "main h1", "main h2", "main h3", "main h4",
  "main p", "main li", "main blockquote",
  "main td", "main th", "main label",
  "main .eyebrow", "main .btn", "main .meta", "main .breadcrumb",
  "main .toc strong", "main .pill",
].join(", ");

function hasAncestor(el, test) {
  let n = el.parentNode;
  while (n && n.tagName) {
    if (test(n)) return true;
    n = n.parentNode;
  }
  return false;
}

/**
 * Apply the Chinese dictionaries to a parsed document, exactly the way
 * public/assets/js/i18n.js would at runtime — keyed lookups first, then the
 * legacy innerHTML map for article prose.
 */
function translate(root, pageDict) {
  const pageKeys = pageDict.keys || {};
  const legacy = pageDict.zh || {};
  let keyed = 0;
  let prose = 0;
  const missingKeys = [];

  for (const el of root.querySelectorAll("[data-i18n], [data-i18n-html]")) {
    const key = el.getAttribute("data-i18n") || el.getAttribute("data-i18n-html");
    const value = pageKeys[key] != null ? pageKeys[key] : SHARED_KEYS[key];
    if (value == null) {
      missingKeys.push(key);
      continue;
    }
    el.set_content(value);
    keyed++;
  }

  if (Object.keys(legacy).length) {
    for (const el of root.querySelectorAll(LEGACY_SEL)) {
      if (el.closest("pre")) continue;
      if (el.classList.contains("no-i18n")) continue;
      if (el.hasAttribute("data-i18n") || el.hasAttribute("data-i18n-html")) continue;
      if (hasAncestor(el, (n) => n.hasAttribute("data-i18n") || n.hasAttribute("data-i18n-html")))
        continue;
      const hit = legacy[norm(el.innerHTML)];
      if (hit != null) {
        el.set_content(hit);
        prose++;
      }
    }
  }

  return { keyed, prose, missingKeys };
}

/* ------------------------------------------------------------------ *
 * Locale link rewriting
 * ------------------------------------------------------------------ */

const isNeutral = (href) => LOCALE_NEUTRAL.some((p) => href === p || href.startsWith(p));

/**
 * `/guides/` → `/zh/guides/`; leaves assets, anchors and absolute URLs alone.
 * Idempotent, so a link a page already wrote as `/zh/…` is not double-prefixed.
 */
function zhPath(p) {
  if (!p.startsWith("/") || p.startsWith("//")) return p;
  if (isNeutral(p)) return p;
  if (p === ZH_PREFIX || p.startsWith(ZH_PREFIX + "/")) return p;
  return p === "/" ? ZH_PREFIX + "/" : ZH_PREFIX + p;
}

/** Prefix every internal href in an assembled document. */
function localiseLinks(root) {
  for (const a of root.querySelectorAll("a[href]")) {
    const href = a.getAttribute("href");
    if (!href || !href.startsWith("/") || href.startsWith("//")) continue;
    a.setAttribute("href", zhPath(href));
  }
}

/** Same idea for absolute site URLs embedded in JSON-LD / head markup. */
function localiseHeadExtra(html) {
  return html.replace(/https:\/\/reranker\.uk(\/[^"'\s<>]*)?/g, (full, p) => {
    if (!p || p === "/") return SITE + ZH_PREFIX + "/";
    if (isNeutral(p)) return full;
    if (p === ZH_PREFIX || p.startsWith(ZH_PREFIX + "/")) return full;
    return SITE + ZH_PREFIX + p;
  });
}

/* ------------------------------------------------------------------ *
 * Structured data
 * ------------------------------------------------------------------ */

const CRUMB_LABELS = {
  en: { home: "Home", guides: "Guides", models: "Models" },
  zh: { home: "首页", guides: "指南", models: "模型对比" },
};

/**
 * BreadcrumbList for nested pages whose meta doesn't already declare one.
 * Returns "" for top-level pages and for pages that hand-roll their own.
 */
function breadcrumbJsonLd(urlPath, title, locale, headExtra) {
  if (/BreadcrumbList/.test(headExtra)) return "";
  const segments = urlPath.split("/").filter(Boolean);
  if (!segments.length) return "";

  const L = CRUMB_LABELS[locale];
  const base = locale === "zh" ? SITE + ZH_PREFIX + "/" : SITE + "/";
  const items = [{ name: L.home, item: base }];

  const section = segments[0];
  if ((section === "guides" || section === "models") && segments.length > 1) {
    items.push({ name: L[section], item: base + section + "/" });
  }

  const leaf = title.split("|")[0].split("—")[0].trim() || title;
  items.push({ name: leaf, item: (locale === "zh" ? SITE + ZH_PREFIX : SITE) + urlPath });

  const payload = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  };
  return `\n  <script type="application/ld+json">${JSON.stringify(payload)}</script>`;
}

/* ------------------------------------------------------------------ *
 * Page assembly
 * ------------------------------------------------------------------ */

function assemble({ meta, body, relPath, locale, lastmod }) {
  const urlPath = urlPathFor(relPath);
  const enUrl = SITE + urlPath;
  const zhUrl = SITE + zhPath(urlPath);
  const zh = locale === "zh";

  const dictFile = dictFileFor(meta);
  const pageDict = zh && dictFile ? loadDict(dictFile).I18N_PAGE || {} : {};
  const zhStrings = pageDict.zh || {};

  const title = zh && zhStrings._title ? zhStrings._title : meta.title;
  const description = zh && zhStrings._desc ? zhStrings._desc : meta.description;

  let headExtra = meta.head_extra || meta.headExtra || "";
  if (zh) headExtra = localiseHeadExtra(headExtra);
  headExtra += breadcrumbJsonLd(urlPath, title, zh ? "zh" : "en", headExtra);

  const vars = {
    title,
    description,
    canonical: zh ? zhUrl : enUrl,
    alt_en: enUrl,
    alt_zh: zhUrl,
    html_lang: zh ? "zh-Hans" : "en",
    locale: zh ? "zh" : "en",
    og_locale: zh ? "zh_CN" : "en_GB",
    og_locale_alt: zh ? "en_GB" : "zh_CN",
    robots: meta.robots || DEFAULT_META.robots,
    og_type: meta.og_type || meta.ogType || DEFAULT_META.og_type,
    og_title: (zh && zhStrings._title) || meta.og_title || meta.ogTitle || title,
    og_description: (zh && zhStrings._desc) || meta.og_description || meta.ogDescription || description,
    head_extra: headExtra,
    page_scripts: stripDictScripts(meta.page_scripts || meta.pageScripts),
  };

  let html = fill(partial("head-open.html"), vars);
  html += "\n</head>\n<body>\n";
  html += partial("nav.html");
  html += "\n" + body + "\n";
  html += fill(partial("footer.html"), { page_scripts: vars.page_scripts });

  // Post-process the assembled document: nav state, translation, link locale.
  const root = parse(html, { comment: true });

  markActiveNav(root, urlPath);

  let stats = { keyed: 0, prose: 0, missingKeys: [] };
  if (zh) {
    stats = translate(root, pageDict);
    localiseLinks(root);
    root.querySelector("html")?.setAttribute("data-prerendered", "zh");
  }
  // After localiseLinks: the toggle points at the *other* locale, so it must
  // not be swept up by the /zh prefixing pass.
  setLocaleToggle(root, urlPath, zh ? "zh" : "en");

  const outRel = zh ? path.join("zh", relPath) : relPath;
  const outPath = path.join(PUBLIC, outRel);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, "<!DOCTYPE html>\n" + root.toString().replace(/^<!DOCTYPE html>\s*/i, ""), "utf8");

  return { urlPath, enUrl, zhUrl, lastmod, stats, outPath };
}

/**
 * Point the locale toggle at this page's counterpart. Doing it here makes the
 * alternate locale a real, crawlable link rather than a JS-only affordance.
 */
function setLocaleToggle(root, urlPath, locale) {
  const toZh = locale !== "zh";
  const href = toZh ? zhPath(urlPath) : urlPath;
  const label = toZh ? "切换到中文" : "Switch to English";
  for (const a of root.querySelectorAll(".lang-toggle")) {
    a.setAttribute("href", href);
    a.setAttribute("hreflang", toZh ? "zh-Hans" : "en");
    a.setAttribute("aria-label", label);
    a.setAttribute("title", label);
    a.set_content(toZh ? "中文" : "EN");
  }
}

/** Flag the top-nav entry matching this page, for CSS and screen readers. */
function markActiveNav(root, urlPath) {
  const here = urlPath.replace(/index\.html$/, "").replace(/\/$/, "") || "/";
  for (const a of root.querySelectorAll(".nav-links a")) {
    const href = (a.getAttribute("href") || "").replace(/index\.html$/, "").replace(/\/$/, "") || "/";
    const active = href === "/" ? here === "/" : here === href || here.startsWith(href + "/");
    if (active) {
      a.setAttribute("aria-current", "page");
      a.setAttribute("class", ((a.getAttribute("class") || "") + " active").trim());
    }
  }
}

/* ------------------------------------------------------------------ *
 * Sitemap
 * ------------------------------------------------------------------ */

function writeSitemap(entries) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ];

  for (const e of entries) {
    const { changefreq, priority } = sitemapHints(e.urlPath);
    for (const loc of [e.enUrl, e.zhUrl]) {
      lines.push(
        "  <url>",
        `    <loc>${escXml(loc)}</loc>`,
        `    <lastmod>${e.lastmod}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        `    <xhtml:link rel="alternate" hreflang="en" href="${escXml(e.enUrl)}" />`,
        `    <xhtml:link rel="alternate" hreflang="zh-Hans" href="${escXml(e.zhUrl)}" />`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${escXml(e.enUrl)}" />`,
        "  </url>"
      );
    }
  }

  lines.push("</urlset>", "");
  fs.writeFileSync(path.join(PUBLIC, "sitemap.xml"), lines.join("\n"), "utf8");
  return entries.length * 2;
}

/* ------------------------------------------------------------------ *
 * Entry point
 * ------------------------------------------------------------------ */

function buildAll() {
  const pages = walk(PAGES);
  const sitemap = [];
  const gaps = [];
  let written = 0;

  for (const relPath of pages) {
    const srcHtml = path.join(PAGES, relPath);
    const srcMeta = srcHtml.replace(/\.html$/, ".meta.json");
    const { meta, body } = parsePage(srcHtml);
    const lastmod = gitLastmod([
      path.relative(ROOT, srcHtml),
      path.relative(ROOT, srcMeta),
    ]);

    const en = assemble({ meta, body, relPath, locale: "en", lastmod });
    const zh = assemble({ meta, body, relPath, locale: "zh", lastmod });
    written += 2;

    if (zh.stats.missingKeys.length) {
      gaps.push(`${relPath}: ${[...new Set(zh.stats.missingKeys)].join(", ")}`);
    }
    if (!NO_SITEMAP.has(relPath)) sitemap.push(en);
  }

  const urls = writeSitemap(sitemap);

  console.log(`Built ${written} pages → public/ (${pages.length} en + ${pages.length} zh)`);
  console.log(`Sitemap: ${urls} URLs with hreflang alternates`);
  if (gaps.length) {
    console.warn(`\nUntranslated i18n keys in ${gaps.length} page(s):`);
    for (const g of gaps) console.warn("  " + g);
  }
  return written;
}

buildAll();

if (process.argv.includes("--watch")) {
  console.log("Watching src/pages and src/partials…");
  let queued = null;
  for (const target of [PAGES, PARTIALS]) {
    fs.watch(target, { recursive: true }, () => {
      clearTimeout(queued);
      queued = setTimeout(() => {
        try {
          buildAll();
        } catch (e) {
          console.error(e.message);
        }
      }, 80);
    });
  }
}

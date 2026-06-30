# reranker.uk

Educational resource on rerankers for retrieval and RAG, with a live in-browser cross-encoder demo.

- **Live site:** https://reranker.uk
- **Repository:** https://github.com/sheephess9527/reranker.uk
- **Workers preview:** https://reranker.sheephess44.workers.dev
- **Active branch:** `claude/reranker-uk-resource-demo-i09f5t` (do all work here; push with `git push -u origin <branch>`)

---

## Changelog — installable PWA + new icon (2026-06-24)

The site can now be added to the iPhone (and Android) home screen and launches
standalone, with a redesigned icon.

| Change | Detail |
|--------|--------|
| **iOS "Add to Home Screen"** | `src/partials/head-open.html` gains `apple-mobile-web-app-capable`, `mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style=black`, `apple-mobile-web-app-title`, and a sized `apple-touch-icon` (180). Manifest already had `display: standalone` |
| **Maskable icons** | `site.webmanifest` adds `purpose: "maskable"` entries (192 + 512) so Android masks cleanly; full-bleed icon keeps content in the safe zone |
| **New icon** | Redesigned around the brand "ranked bars" motif: dark gradient backdrop + glow, top bar vibrant indigo→teal (glossy), lower bars fading to muted — literally depicts reranking. Master at `public/assets/img/icon-master.svg` |
| **Reproducible rasterisation** | `scripts/render-icons.mjs` (`npm run icons`) renders the master SVG → `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png` via `@resvg/resvg-js` (new devDependency). `favicon.svg` refreshed to match |

To install on iPhone: open https://reranker.uk in Safari → Share → **Add to Home
Screen**. It launches full-screen with the new icon and a dark status bar.

---

## 🚀 Start here — handoff guide for a new contributor / AI agent

> Read this whole section before editing anything. It is written so a fresh
> session (any model, any account) can be productive in five minutes. The
> dated changelogs further down are history; **this section is the source of
> truth for how the project works today.**
>
> **Using Claude Code?** `CLAUDE.md` at the repo root is the condensed,
> auto-loaded operational version of this section — it is pulled into every
> session's context automatically, so a fresh Claude session picks up the
> golden rules, build/i18n gotchas, and recipes with no prompting.

### Mental model in three sentences

reranker.uk is a **static, backend-less educational site** about rerankers, plus
a **live demo that runs a real cross-encoder entirely in the browser** (no API,
no server, no cost). HTML pages are **generated** from `src/` by a ~140-line Node
script; CSS/JS/translations are **hand-written static assets** under `public/`.
The site is **fully bilingual (English + 中文)** via a client-side toggle.

### Golden rules (break these and you create silent bugs)

1. **HTML is generated — never hand-edit `public/*.html`.** Edit `src/pages/` and
   `src/partials/`, then run `node scripts/build.mjs`. A rebuild overwrites every
   `public/*.html`. (We were bitten by this: demo `<noscript>` + preconnect hints
   were once edited into `public/demo.html` only, and the next build silently
   dropped them. Always put HTML changes in `src/`.)
2. **Normalise line endings after every build:**
   `find public -name "*.html" -exec sed -i 's/\r$//' {} +`
   The `.meta.json` `head_extra` fields contain `\r\n`; without this step the
   build flips JSON-LD blocks to CRLF and produces a noisy, misleading diff.
3. **Static assets are NOT generated — edit them directly** under `public/`:
   `assets/css/style.css`, `assets/js/*.js`, `assets/js/i18n/*.js`,
   `sitemap.xml`, `robots.txt`, images. There is no build step for these.
4. **Work on the active branch** (top of this file). Rebase on `origin/main`
   before pushing if you are behind; the remote has at times been ahead.

### Repository map

```
wrangler.jsonc            # Cloudflare Workers static-assets config (serves ./public)
package.json              # npm run build | npm run dev (watch). type: module
scripts/build.mjs         # src/ → public/ assembler (the only build step)
src/
  partials/
    head-open.html        # <head> template with {{TITLE}}, {{HEAD_EXTRA}}, … placeholders
    nav.html              # Shared sticky nav (data-i18n keys)
    footer.html           # Shared footer + {{PAGE_SCRIPTS}} + i18n script tags
  pages/
    <name>.html           # Page BODY only (<main>…</main>), no <head>/<nav>/<footer>
    <name>.meta.json      # Per-page: title, description, canonical, og_*, head_extra, page_scripts
    guides/  models/      # Same pattern, nested
public/                   # DEPLOY ROOT. *.html are GENERATED; everything else is source.
  assets/css/style.css    # All styles (hand-edited)
  assets/js/demo.js       # The in-browser demo (ES module, hand-edited)
  assets/js/main.js       # Nav toggle, year, small chrome
  assets/js/i18n.js       # Bilingual engine (do not duplicate logic; read it once)
  assets/js/i18n/
    shared.js             # window.I18N_SHARED.keys — nav/footer/chrome (all pages)
    <page>.js             # window.I18N_PAGE — per-page _title/_desc + body translations
  sitemap.xml robots.txt site.webmanifest
```

### Build & preview

```bash
node scripts/build.mjs                       # build once (prints "Built N pages")
find public -name "*.html" -exec sed -i 's/\r$//' {} +   # ALWAYS run after build
node scripts/build.mjs --watch               # rebuild on src/ change (no LF-normalise)
npx serve public      # or: python3 -m http.server -d public 8000   # local preview
```

### The i18n system (the most error-prone part — read carefully)

Two layers, both live in `assets/js/i18n.js`:

- **Keyed layer (preferred, for shared chrome):** elements carry
  `data-i18n="shared.nav.home"` / `data-i18n-html="…"`. Values come from
  `window.I18N_SHARED.keys` (in `shared.js`) and optional `window.I18N_PAGE.keys`.
  Used by nav + footer in `src/partials/`.
- **Legacy layer (for article bodies):** `window.I18N_PAGE.zh` is a dictionary
  whose **keys are the element's exact rendered `innerHTML`** (whitespace
  collapsed) and whose values are the Chinese. The engine walks `main h1, h2, h3,
  h4, p, li, blockquote, td, th, label, .eyebrow, .btn, .meta, .breadcrumb,
  .toc strong` and swaps innerHTML when the language is `zh`.

**Script load order matters** (set automatically by the footer partial +
`page_scripts`): `main.js` → `<page>.js` (via `page_scripts`) → `shared.js` →
`i18n.js`. So every page's `.meta.json` must point `page_scripts` at its dict.

**Legacy-key gotchas (these cause silent "stays English" bugs):**

- The key must match innerHTML **exactly**, including inline tags
  (`<strong>`, `<code>`, `<a href="…">`), HTML entities (`&amp;`), em-dashes
  (`—`), en-dashes (`–`) and curly quotes (`" " '`). One mismatched character =
  no translation, no error.
- **Prefer plain ASCII punctuation in new English body text** (write `as-is`,
  not “as is”; avoid `'`) so keys are easy to match. If the existing text already
  has smart quotes, copy them verbatim into the key.
- A CTA button inside a `<p>` is collected twice (the `<p>` and the `<a.btn>`).
  Provide **both** keys: the button text *and* the full `<a …>…</a>` wrapper, or
  the wrapper will re-render English. See `changelog.js` for the pattern.
- `_title` and `_desc` in a page dict translate `<title>` and the meta
  description; they are not innerHTML keys.

**Always validate a new/edited dict** — this prints any string with no key:

```bash
node -e '
const fs=require("fs");const page=process.argv[1];
const html=fs.readFileSync(`public/${page}.html`,"utf8");
const js=fs.readFileSync(`public/assets/js/i18n/${page.split("/").pop()}.js`,"utf8");
const main=html.slice(html.indexOf("<main"),html.indexOf("</main>"));
const re=/<(h1|h2|h3|h4|p|li|blockquote|td|th)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g;
let m,ok=0,miss=0;
while((m=re.exec(main))){const t=m[2].replace(/\s+/g," ").trim();if(!t)continue;
 if(js.includes(JSON.stringify(t)))ok++;else{miss++;console.log("NO KEY:",t.slice(0,80));}}
console.log("matched",ok,"missing",miss);
' changelog        # ← page path, e.g. "privacy", "guides/rerank-rag"
```

### Recipe: add a new page

1. `src/pages/foo.html` — body only (`<main id="main">…</main>`).
2. `src/pages/foo.meta.json` — `title`, `description`, `canonical`, `og_*`,
   optional `head_extra` (JSON-LD etc.), and
   `"page_scripts": "<script src=\"/assets/js/i18n/foo.js\"></script>"`.
3. `public/assets/js/i18n/foo.js` — `window.I18N_PAGE = { zh: { "_title":…, "_desc":…, …body keys… } };`
4. If it should be discoverable, add a link in `src/partials/footer.html` and a
   `shared.footer.*` key in `shared.js`.
5. Add the URL to `public/sitemap.xml`.
6. `node scripts/build.mjs` → LF-normalise → run the validation snippet → commit.

### Recipe: add a demo model or preset

`public/assets/js/demo.js` (ES module). Models are the `MODELS` map near the top
(`id`, `name`, `sigmoid`); presets are the `SAMPLES` array (each has bilingual
`query`/`docs`). Inference loads transformers.js from the jsDelivr CDN and model
weights from the Hugging Face CDN; scoring runs on WASM or WebGPU. Results render
in three columns (Before / bi-encoder proxy / cross-encoder) with an optional
dual-model compare + aligned diff. Keep new models small enough to run in a
browser (Apache-2.0, ONNX, ≤ ~30 MB q8).

### Deploy (Cloudflare Workers static assets)

```bash
node scripts/build.mjs && find public -name "*.html" -exec sed -i 's/\r$//' {} +
npx wrangler deploy        # → https://reranker.uk   (needs `npx wrangler login` once)
```

Auth and API-token alternatives are documented in the **Deploy** section below.
Cloudflare auto-serves `./public`; there is no Worker script.

### Conventions

- Commit messages: imperative summary + short body; this project tags commits
  with `Co-Authored-By:` and a `Claude-Session:` trailer.
- British spelling in copy (`licence`, `organisation`); `en_GB` locale.
- No vendor logos; product names are nominative references (see `/terms.html`).
- Keep the README current: append a dated changelog entry for each change set.

### Current state (2026-06-24)

- **20 generated pages**; every page has a translation dict wired via
  `page_scripts`, and shared chrome (nav/footer) + the bulk of body prose
  translate to 中文.
- Pages: home, demo, guides (index + 7 guides), models (index + 5 models),
  changelog, privacy, terms, 404.
- Legal: `/terms.html` (trademark attribution + disclaimers) and a privacy page;
  vendor pricing notes link to official pricing pages.
- Demo: 3 in-browser models, 5 presets, WebGPU toggle, dual-model compare, token
  stats, animated score bars, share links, CSV/JSON/Markdown export.

**Known i18n gaps (run the validation snippet above to enumerate per page):**

- **In-page TOC anchor links** — `<li><a href="#x">Heading</a></li>` is collected
  by the engine keyed on the *whole anchor*, but most dicts only contain the bare
  heading text. So the “On this page” list still shows English even though the
  matching `<h2>` translates. To fix, add anchor-form keys, e.g.
  `"<a href=\"#why\">Why ranking order is a problem</a>": "<a href=\"#why\">为什么排序顺序是个问题</a>"`.
  This is the single biggest remaining gap and is systematic across guide/model pages.
- A handful of **short labels** still render English on some pages: model-page
  `Pros` / `Cons` / `Other models`, a few table headers, and one or two model-card
  blurbs. The validator flags them.
- **Intentionally NOT translated:** code spans, model IDs (`BAAI/bge-reranker-base`),
  file sizes, and benchmark numbers — these should stay as-is; ignore them in the
  validator output.

**Other possible next steps:** hreflang or separate `/zh/` URLs for Chinese SEO
(currently a client-side toggle only); privacy-friendly analytics; migrating the
legacy innerHTML dictionaries to stable `data-i18n` keys (would make the TOC gap
disappear and end the exact-innerHTML-matching fragility).

---

## Changelog — legal hardening (2026-06-24)

Reduce friction with the vendors whose products the site compares.

| Change | Detail |
|--------|--------|
| **Terms & disclaimer page** | New `src/pages/terms.html` (+ `.meta.json`, bilingual via `public/assets/js/i18n/terms.js`). Covers: educational/no-warranty, **trademark attribution** (all product names belong to their owners; nominative use; no affiliation/endorsement; no logos used), benchmarks/pricing are approximate & may be outdated, model-licence responsibility, external-link disclaimer, limitation of liability, and a good-faith “open an issue and we’ll correct it” note |
| **Footer links** | `Terms & disclaimer` added to the footer column list and the legal bottom row (`shared.footer.terms` / `shared.footer.termsShort` in `shared.js`) — rebuilt into all 20 pages |
| **Pricing → official links** | The “check current rates” notes on Cohere / Jina / Voyage pages now link to each vendor’s official pricing page and say figures are approximate |
| **Sitemap** | `+ /terms.html` (18 → 19 URLs) |
| **Privacy page bilingual** | Added `public/assets/js/i18n/privacy.js` + `page_scripts` so the privacy body translates to 中文 (was English-only on toggle) |
| **Changelog page bilingual** | Added `public/assets/js/i18n/changelog.js` + `page_scripts`; every release note now translates. Site is now fully bilingual on every page |

**Build-system fix (prevented a regression):** the earlier huggingface preconnect
hints and the demo `<noscript>` fallback had been hand-edited directly into
`public/demo.html`, never into source — so the first rebuild stripped them. Ported
both into `src/pages/demo.meta.json` (`head_extra`) and `src/pages/demo.html` so
rebuilds keep them. Built HTML is normalised to LF after `build.mjs` (meta
`head_extra` carries `\r\n`, which would otherwise churn JSON-LD blocks to CRLF).

### Git commits

| Commit | Summary |
|--------|---------|
| `_pending_` | Legal: terms & disclaimer page, footer links, vendor pricing links; restore demo preconnect/noscript in source |

---

## Changelog — i18n completeness + demo polish (2026-06-23)

Two follow-ups: a Chinese-toggle review and a demo UX review. All edits are to
static assets under `public/assets/js/` (no `src/` rebuild needed).

### Chinese translation gaps (`public/assets/js/i18n/`)

Switching to 中文 left some elements in English because dictionary keys had
drifted from the rendered HTML. Fixed across every guide and model page:

| Fix | Detail |
|-----|--------|
| **Breadcrumb keys** | 3 guides still keyed the old `/guides/what-is-a-reranker.html` href; updated to `/guides/` |
| **`.meta` date line** | A `<time>…Updated …</time>` element was appended *after* the keys were written, so the whole line stopped matching; keys now include the `<time>` markup (guides + models) |
| **“On this page”** | TOC heading had no key on any page; added `"On this page": "本页目录"` to all guide + model dicts |
| **4 newer guides** | `hybrid-retrieval-rerank`, `evaluate-reranker`, `self-host-reranker`, `choose-reranker-scenario` had only `_title`/`_desc`; added full body translations (headings, paragraphs, tables, CTAs) |
| **Guides index** | `guides-index.js` gained card title + description translations |

### Demo token stats + bar animation (`public/assets/js/demo.js`)

| Feature | Implementation |
|---------|----------------|
| **Token stats** | `tokenStats()` reads `input_ids.dims` + `attention_mask`; the results stat row now shows **total non-padding tokens** (across all query/passage pairs) and the **longest padded sequence**, each with a tooltip and bilingual label |
| **Score-bar fill** | Bars render at `width:0` carrying `data-pct`; `fillScoreBars()` grows them to target via a double-`requestAnimationFrame` pass over the existing width transition, so each rerank reads as motion rather than a static repaint. Honours `prefers-reduced-motion` |

**Considered but deferred:** a true FLIP reorder animation (passages physically
sliding from retrieved rank → reranked rank) — larger, higher-risk render change,
left out to avoid regressing the working demo.

### Git commits

| Commit | Summary |
|--------|---------|
| `5057b1c` | i18n: fix Chinese translation gaps across all pages |
| `079eb33` | Demo: add token stats and animate score bars on each rerank |

---

## Changelog — medium priority (2026-06-23)

| Feature | Implementation |
|---------|----------------|
| **Self-host guide** | `/guides/self-host-reranker.html` |
| **Scenario guide** | `/guides/choose-reranker-scenario.html` |
| **Passage char counts** | `#doc-char-stats` + per-row counts on mobile; warn above 512 chars |
| **New presets** | Technical docs, Code search (5 → 7 scenarios) |
| **CSV export** | `Copy CSV` button + `exportCsv()` |
| **Light theme** | Nav ☀/🌙 toggle, `data-theme="light"`, `rr_theme` in localStorage |

19 built pages after `node scripts/build.mjs`.

---

## Changelog — demo UX round 2 (2026-06-23)

High-priority improvements from the second review:

| Feature | Implementation |
|---------|----------------|
| **Model loading panel** | `#load-panel`: % progress, MB loaded/total, ETA, current file, cache status (tab memory / browser cache / downloading) |
| **JSON passages** | `parseDocs()` accepts JSON arrays or `{ "passages": [...] }` objects |
| **Dual-model diff** | `#dual-diff` aligned table: per-passage scores, ranks, Δ score, Δ rank |
| **Models table UX** | `public/assets/js/models-index.js` — filter, sortable columns, “Try in demo” → `?m=` for Jina & mxbai |
| **Mobile passage editor** | `#docs-list` add/remove rows on viewports ≤760px; syncs with textarea |
| **Error classification** | `formatError()` — network, WebGPU, memory, token length, passage limit |
| **Changelog + Privacy** | `/changelog.html`, `/privacy.html`; footer links |
| **Nav** | Home + Guides in top bar |

**New pages:** `/changelog.html`, `/privacy.html` (17 built pages after `node scripts/build.mjs`).

---

## Changelog — full release (2026-06-23)

This release implements improvement-plan items **1, 2, 3, 4, 5, 7, 8, 9, 10**. Item **6** (hreflang / separate Chinese URLs) was **not** done.

| # | Plan item | What shipped |
|---|-----------|--------------|
| 1 | Copy fixes | mxbai homepage card; Five families; breadcrumbs → `/guides/` |
| 2 | Demo UX | aria-live, URL share, 30-doc cap + warnings |
| 3 | Footer + dates | GitHub link; `Updated …` on guides/models |
| 4 | Benchmark trust | Last verified June 2026 + source links on `/models/` |
| 5 | Bi-encoder baseline | Demo middle column: token-overlap proxy |
| 7 | i18n refactor | `data-i18n` keys + `shared.js`; legacy body fallback |
| 8 | New content | Guides index, hybrid retrieval, evaluate rerankers |
| 9 | Build system | `src/partials` + `src/pages` + `scripts/build.mjs` |
| 10 | Demo advanced | Dual-model compare; WebGPU toggle |
| 6 | hreflang / `/zh/` | **Deferred** — Chinese still client-side toggle only |

### 1. Content & copy

| Change | Before | After |
|--------|--------|-------|
| Homepage model grid | 4 cards (no mxbai) | 5 cards incl. **mxbai-rerank** |
| `/models/` lead text | “Four families…” | “**Five families**…” |
| Guide breadcrumbs | `Guides` → random guide URL | `Guides` → **`/guides/`** |
| Article meta | No visible date | `Updated 21 Jun 2026` (guides/models); `23 Jun 2026` (new guides) |
| Sitemap | 11 URLs | 14 URLs; new guides + `/guides/` |

**New pages:**

| URL | File (source) |
|-----|----------------|
| `/guides/` | `src/pages/guides/index.html` |
| `/guides/hybrid-retrieval-rerank.html` | `src/pages/guides/hybrid-retrieval-rerank.html` |
| `/guides/evaluate-reranker.html` | `src/pages/guides/evaluate-reranker.html` |

### 2. Models comparison (`/models/`)

- Callout block: **Last verified: June 2026**
- Methodology: BEIR NDCG@10 approximate (18-dataset avg); latency ~50 docs commodity CPU/API
- Source links: [BEIR](https://github.com/beir-cellar/beir), [BAAI HF](https://huggingface.co/BAAI/bge-reranker-v2-m3), [Cohere](https://docs.cohere.com/docs/rerank), [Jina](https://jina.ai/reranker), [Voyage](https://docs.voyageai.com/docs/reranker), [mixedbread-ai HF](https://huggingface.co/mixedbread-ai/mxbai-rerank-large-v1)

### 3. Footer & trust

- **View source on GitHub** in every page footer
- Footer guides: All guides, hybrid, evaluate, existing three guides, demo

### 4. Live demo (`/demo.html`) — `public/assets/js/demo.js`

| Feature | Implementation |
|---------|----------------|
| **Three-column results** | Before (input order) → **bi-encoder proxy** (Jaccard token overlap) → cross-encoder |
| **Dual-model compare** | Checkbox + second `<select>`; extra two-column block under main results |
| **WebGPU** | Checkbox; `device: 'webgpu'` when supported; clear error if it fails |
| **URL sharing** | `?q=&docs=&m=&m2=` via `history.replaceState`; **Copy share link** button |
| **Passage limit** | `MAX_DOCS = 30`; hard block + yellow warning above ~75% |
| **Accessibility** | `#status` → `aria-live="polite"` `aria-atomic="true"` |
| **Keyboard** | Enter (query) · Ctrl+Enter (passages) · Esc (clear) |
| **Reduced motion** | CSS disables `.result-item` animation |

Demo models (unchanged): `Xenova/ms-marco-MiniLM-L-6-v2`, `jinaai/jina-reranker-v1-tiny-en`, `mixedbread-ai/mxbai-rerank-xsmall-v1` — transformers.js 3.5.1, ONNX q8, browser cache.

### 5. i18n (EN / 中文)

| File | Role |
|------|------|
| `public/assets/js/i18n.js` | Engine: `data-i18n` / `data-i18n-html` keys first; legacy `I18N_PAGE.zh` innerHTML fallback for article body |
| `public/assets/js/i18n/shared.js` | Stable keys: nav, footer, skip link, new guide labels (`window.I18N_SHARED.keys`) |
| `public/assets/js/i18n/*.js` | Per-page `_title`, `_desc`, and body zh maps (legacy) |

Nav/footer partials use `data-i18n="shared.*"`. Long guide paragraphs still use legacy dictionaries until migrated to keys.

### 6. Build system (item 9)

**Before:** 12 HTML files each duplicated ~60 lines of `<header>` / `<footer>`.

**After:**

```
src/
  partials/
    head-open.html       # DOCTYPE + shared <head> placeholders
    nav.html             # Sticky nav (data-i18n)
    footer.html          # Footer + script injection
  pages/
    *.html               # <main>…</main> only
    *.meta.json          # title, description, canonical, head_extra, page_scripts
scripts/
  build.mjs              # Assemble → public/*.html (15 pages)
  migrate-pages.mjs      # One-time: public → src/pages
  split-meta.mjs         # One-time: inline @meta → *.meta.json
  fix-meta.mjs           # Fix meta when `-->` in head_extra broke JSON comments
package.json             # npm run build | npm run dev
```

**Rule:** Edit `src/pages/` + `src/partials/` → `node scripts/build.mjs`. Do **not** hand-edit generated `public/*.html`.

### 7. CSS — `public/assets/css/style.css`

- `.compare-grid-3` — demo three columns
- `.check-row`, `.doc-warning`, `.dual-compare`, `.dual-head`, `.benchmark-meta`
- `kbd` styles
- `@media (prefers-reduced-motion: reduce)` — no result animations; `scroll-behavior: auto`

### 8. Complete file manifest

**New directories / files:**

```
package.json
scripts/build.mjs
scripts/migrate-pages.mjs
scripts/split-meta.mjs
scripts/fix-meta.mjs
src/partials/head-open.html
src/partials/nav.html
src/partials/footer.html
src/pages/404.html + 404.meta.json
src/pages/index.html + index.meta.json
src/pages/demo.html + demo.meta.json
src/pages/guides/*.html + *.meta.json (7 guide pages incl. index, hybrid, evaluate)
src/pages/models/*.html + *.meta.json (6 model pages)
public/assets/js/i18n/shared.js
public/assets/js/i18n/guides-index.js
public/assets/js/i18n/hybrid-retrieval-rerank.js
public/assets/js/i18n/evaluate-reranker.js
public/guides/index.html
public/guides/hybrid-retrieval-rerank.html
public/guides/evaluate-reranker.html
```

**Modified:**

```
README.md
public/sitemap.xml
public/assets/css/style.css
public/assets/js/i18n.js
public/assets/js/demo.js
public/assets/js/i18n/home.js
public/assets/js/i18n/models-index.js
public/*.html (all 15 pages rebuilt from src)
```

### 9. Git commits (this release)

| Commit | Summary |
|--------|---------|
| `9861226` | All feature changes: build, demo, guides, i18n, copy fixes |
| `95e44d6` | README deploy auth + release status |
| `1808583` | README: wrangler login localhost troubleshooting |
| `0e48fa5` | README: production deploy marked Done |

### 10. Deploy record

| Step | Result |
|------|--------|
| `git push origin main` | ✅ On GitHub |
| `wrangler login` | ✅ OAuth via `127.0.0.1:8976` (after initial localhost timeout) |
| `node scripts/build.mjs` | ✅ 15 pages |
| `wrangler deploy` | ✅ Version **`503f4ceb-bbf0-4f09-9c47-34b0d1f079e3`** |
| Production | ✅ https://reranker.uk |
| Assets uploaded | 31 new/modified (+ 12 unchanged) |

**Post-deploy verification (2026-06-23):**

- https://reranker.uk/ — mxbai card present
- https://reranker.uk/guides/ — index with 6 cards
- https://reranker.uk/guides/hybrid-retrieval-rerank.html — live
- https://reranker.uk/guides/evaluate-reranker.html — live
- https://reranker.uk/demo.html — WebGPU, dual-model, share link, 3-column UI
- https://reranker.uk/models/ — Five families + Last verified block

### 11. Not in this release

- **hreflang** / separate `/zh/` URLs (Chinese SEO)
- Privacy-friendly analytics (Plausible/Umami etc.)
- Full migration of all article paragraphs to `data-i18n` keys (body text still mostly legacy)

---

## Project structure

```
wrangler.jsonc              # Cloudflare Workers static assets → ./public
src/                        # HTML source (build before deploy)
public/                     # Deploy root (HTML generated + static assets)
  guides/                   # 7 pages
  models/                   # 6 pages
  assets/css|js|img/
  sitemap.xml
  robots.txt
  site.webmanifest
```

---

## Local development

```bash
node scripts/build.mjs          # assemble HTML
node scripts/build.mjs --watch  # rebuild on src/ changes
```

Edit static assets directly under `public/assets/` (no build).

Windows if `npx` blocked:

```bash
node "C:\Program Files\nodejs\node_modules\npm\bin\npx-cli.js" wrangler deploy
```

---

## Deploy (Cloudflare Workers)

### Authenticate (once per machine)

```bash
npx wrangler login
# If browser shows "localhost refused connection":
npx wrangler login --callback-host 127.0.0.1 --callback-port 8976
# Keep terminal open until: "Successfully logged in"
```

**Alternative — API token** (no localhost callback): [Create token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) → template **Edit Cloudflare Workers**:

```powershell
$env:CLOUDFLARE_API_TOKEN = "your-token"
```

### Build + deploy

```bash
node scripts/build.mjs
npx wrangler deploy                    # → reranker.uk
# npx wrangler versions upload         # preview only
```

`wrangler.jsonc`: `assets.directory = ./public`, `not_found_handling = 404-page`.

---

## Bilingual (EN / 中文)

1. HTML defaults to **English** (SEO crawl).
2. Nav **中文** toggle → `localStorage` `rr_lang`.
3. Shared chrome: `data-i18n` + `I18N_SHARED.keys`.
4. Article body: legacy `I18N_PAGE.zh` maps (normalised English `innerHTML` as key).
5. Demo listens for `i18n:changed` to refresh dynamic labels.

---

## Demo architecture

`demo.js` (ES module) loads cross-encoders from HuggingFace via [transformers.js](https://github.com/huggingface/transformers.js). Scoring runs in-browser (WASM or WebGPU). No server, API key, or outbound query data.

---

## Licence & affiliation

Open educational resource · not affiliated with any model vendor.
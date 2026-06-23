# reranker.uk

Educational resource on rerankers for retrieval and RAG, with a live in-browser cross-encoder demo.

Live site: **https://reranker.uk**

---

## Changelog (2026-06-23)

Site-wide improvements from the June 2026 review. Items **1–5, 7–10** from the improvement plan were implemented (item 6 — hreflang / separate Chinese URLs — was deferred).

### Content & copy

| Change | Detail |
|--------|--------|
| Homepage model cards | Added **mxbai-rerank** card (was only in footer / models index) |
| Models index lead | **Four families** → **Five families** (matches 5 rows in the table) |
| Breadcrumbs | Guide pages link **Guides** → `/guides/` (new index) instead of a random guide URL |
| Article dates | Guides and model pages show **Updated …** in the meta line |
| New guides | [`/guides/`](public/guides/index.html) index, [Hybrid retrieval + rerank](public/guides/hybrid-retrieval-rerank.html), [Evaluate rerankers](public/guides/evaluate-reranker.html) |
| Sitemap | New URLs added; `lastmod` bumped to 2026-06-23 where relevant |

### Models comparison (`/models/`)

- **Last verified: June 2026** callout under the comparison table
- Methodology note (BEIR NDCG@10 approximate; latency for ~50 docs on commodity hardware)
- Source links: BEIR, BAAI, Cohere, Jina, Voyage, mixedbread-ai HuggingFace cards

### Footer & trust

- **View source on GitHub** → `https://github.com/sheephess9527/reranker.uk`
- Footer guides list: All guides, hybrid + evaluate links

### Live demo (`/demo.html`)

| Feature | Description |
|---------|-------------|
| **Bi-encoder proxy column** | Middle column ranks by token overlap (no cross-attention) vs cross-encoder on the right |
| **Three-column results** | Before (input order) → bi-encoder proxy → cross-encoder reranked |
| **Dual-model compare** | Optional second model; side-by-side ranking below main results |
| **WebGPU** | Checkbox to use WebGPU when the browser supports it; falls back with a clear message |
| **URL sharing** | Query, passages, and model(s) encoded in `?q=&docs=&m=&m2=`; **Copy share link** button |
| **Passage limit** | Hard cap **30** passages; warning UI above ~75% of limit |
| **Accessibility** | `#status` has `aria-live="polite"`; `prefers-reduced-motion` disables result animations |
| **Keyboard** | Enter in query → run; Ctrl+Enter in passages → run; Esc → clear |

Models in the demo (unchanged): ms-marco MiniLM-L6, jina-reranker v1 tiny, mxbai-rerank xsmall — via transformers.js @ 3.5.1, ONNX q8, browser cache.

### i18n (EN / 中文)

- **New engine** (`public/assets/js/i18n.js`): prefers stable **`data-i18n`** keys on shared chrome
- **Shared keys** (`public/assets/js/i18n/shared.js`): nav, footer, skip link, new guide labels
- **Legacy fallback**: per-page `window.I18N_PAGE.zh` dictionaries keyed by normalised English `innerHTML` still work for long article body text during migration
- New pages ship with `_title` / `_desc` Chinese meta; full body zh for hybrid/evaluate/guides-index is minimal (expand in `assets/js/i18n/*.js`)

### Build system (new)

Previously every HTML file duplicated ~60 lines of header/footer. Now:

```
src/
  partials/
    head-open.html    # <!DOCTYPE> … common <head> ({{TITLE}}, {{HEAD_EXTRA}}, …)
    nav.html          # Sticky nav + lang toggle (data-i18n keys)
    footer.html       # Footer + script tags
  pages/
    index.html        # <main>…</main> only
    index.meta.json   # title, description, canonical, head_extra, page_scripts, …
    guides/…
    models/…
scripts/
  build.mjs           # Assemble partials + pages → public/*.html
  migrate-pages.mjs   # One-time: extract <main> from legacy flat HTML
  split-meta.mjs      # One-time: move @meta JSON to *.meta.json
  fix-meta.mjs        # Repair meta when inline JSON broke on `-->` in head_extra
package.json          # npm run build | npm run dev
```

**Important:** Edit page content in `src/pages/`, shared chrome in `src/partials/`, then run the build. Do not hand-edit generated `public/*.html` — changes will be overwritten.

### CSS

- `.compare-grid-3` for demo three-column layout
- `.check-row`, `.doc-warning`, `.dual-compare`, `.benchmark-meta`
- `kbd` styling; `@media (prefers-reduced-motion: reduce)` for demo animations

### Files touched (summary)

**New:** `package.json`, `src/**`, `scripts/*.mjs`, `public/assets/js/i18n/shared.js`, `guides-index.js`, `hybrid-retrieval-rerank.js`, `evaluate-reranker.js`, `public/guides/index.html`, `hybrid-retrieval-rerank.html`, `evaluate-reranker.html`

**Updated:** `README.md`, `public/sitemap.xml`, `public/assets/js/i18n.js`, `demo.js`, `home.js`, `models-index.js`, `style.css`, all rebuilt `public/*.html`

### Not in this release

- **hreflang** / separate `/zh/` URLs for Chinese SEO (planned separately)
- Server-side analytics (privacy-friendly option left to operator)

---

## Project structure (after build)

```
wrangler.jsonc              # Cloudflare Workers static-assets config
src/                        # Source of truth for HTML pages (see above)
public/                     # Deploy directory
  index.html                # Homepage (generated)
  demo.html                 # Live demo (generated)
  404.html
  guides/
    index.html              # All guides
    what-is-a-reranker.html
    cross-encoder-vs-bi-encoder.html
    rerank-rag.html
    hybrid-retrieval-rerank.html
    evaluate-reranker.html
  models/
    index.html              # Comparison table
    bge-reranker.html … mxbai-rerank.html
  assets/
    css/style.css
    js/main.js
    js/demo.js              # ES module — transformers.js engine
    js/i18n.js              # Bilingual engine
    js/i18n/*.js            # Per-page + shared zh dictionaries
    img/…
  sitemap.xml
  robots.txt
  site.webmanifest
```

---

## Local development

```bash
# Assemble HTML (required after editing src/pages or src/partials)
node scripts/build.mjs
# or: npm run build

# Rebuild on file changes
node scripts/build.mjs --watch
# or: npm run dev
```

Static assets under `public/assets/` are edited directly — no build step.

---

## Deploy (Cloudflare Workers static assets)

```bash
node scripts/build.mjs      # always build before deploy
npx wrangler deploy         # production → reranker.uk
```

Preview / non-production version:

```bash
npx wrangler versions upload
```

`wrangler.jsonc` serves `./public` with `not_found_handling: "404-page"` → `public/404.html`.

The same `public/` folder can be uploaded to GitHub Pages, Netlify, Cloudflare Pages, etc.

---

## Bilingual behaviour

1. HTML ships in **English** (default, SEO-friendly).
2. User toggles **中文** in the nav → `localStorage` key `rr_lang`.
3. `data-i18n` elements swap via `I18N_SHARED.keys` + `I18N_PAGE.keys`.
4. Article paragraphs without `data-i18n` still use legacy `I18N_PAGE.zh` innerHTML maps.
5. Demo dynamic strings listen for `i18n:changed`.

---

## Demo architecture

`public/assets/js/demo.js` lazy-loads quantised cross-encoders from HuggingFace Hub via [transformers.js](https://github.com/huggingface/transformers.js) (ONNX Runtime Web, optional WebGPU). Weights download once and cache in the browser. No server, API key, or outbound query data.

---

## Licence & affiliation

Open educational resource · not affiliated with any model vendor.
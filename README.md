# reranker.uk

Educational resource on rerankers for retrieval and RAG, with a live in-browser cross-encoder demo.

- **Live site:** https://reranker.uk
- **Repository:** https://github.com/sheephess9527/reranker.uk
- **Workers preview:** https://reranker.sheephess44.workers.dev

---

## Changelog — content expansion (2026-06-25, batch 3)

| Feature | Implementation |
|---------|----------------|
| **Models table** | Architecture column + Qwen3 / Contextual / ColBERT / ms-marco rows |
| **Late-interaction guide** | `/guides/late-interaction-rerank.html` |
| **Demo presets** | E-commerce + Multilingual (7 total); ms-marco demo deep link |
| **JSON-LD** | `inLanguage` zh-Hans / en on toggle |
| **Changelog RSS** | `/changelog.rss` |

20 built pages after `node scripts/build.mjs`.

---

## Changelog — i18n & SEO (2026-06-25, batch 2)

| Feature | Implementation |
|---------|----------------|
| **Model page i18n gaps** | Pills, TOC anchors, meta dates, benchmark headers, Pros/Cons, Other models — all 5 families |
| **Changelog + Privacy i18n** | `changelog.js`, `privacy.js` full body zh |
| **hreflang** | `head-open.html`: `en`, `zh-Hans`, `x-default` → same canonical (client toggle) |
| **og:locale:alternate** | `i18n.js` swaps `zh_CN` ↔ `en_GB` with primary `og:locale` |

---

## Changelog — low priority (2026-06-25)

| Feature | Implementation |
|---------|----------------|
| **Guide i18n (full body)** | `self-host-reranker.js`, `choose-reranker-scenario.js`, `hybrid-retrieval-rerank.js`, `evaluate-reranker.js` |
| **Compressed share links** | Demo `?z=` gzip + base64url when URL exceeds ~1600 chars; `CompressionStream` with plain-param fallback |
| **Preset mobile layout** | `.preset-row` 2-column grid ≤560px, single column ≤380px |
| **og:locale** | `i18n.js` sets `zh_CN` / `en_GB` on language toggle |
| **Dual-diff a11y** | Table caption, `scope="row"`, empty row, `role="region"` + `aria-describedby` |

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
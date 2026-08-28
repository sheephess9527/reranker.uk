# reranker.uk

Educational resource on rerankers for retrieval and RAG, with a live in-browser cross-encoder demo.

- **Live site:** https://reranker.uk
- **Chinese:** https://reranker.uk/zh/
- **Repository:** https://github.com/sheephess9527/reranker.uk
- **Workers preview:** https://reranker.sheephess44.workers.dev

---

## Build

```bash
npm install                     # node-html-parser, used to pre-render /zh/
npm run build                   # assemble public/ (22 en + 22 zh pages) + sitemap
npm run dev                     # rebuild on src/ changes
npm run check                   # build, then verify no internal link is broken
npm run check:i18n              # legacy: report untranslated model-page strings
node scripts/check-zh-coverage.mjs   # report English prose left on /zh/ pages
```

**Rule:** edit `src/` only. Everything in `public/*.html`, `public/sitemap.xml`
and `public/llms.txt` is generated — hand edits are overwritten on the next
build. Static assets under `public/assets/`, plus `robots.txt` and
`changelog.rss`, are the exception and are edited directly.

### How a page is assembled

```
src/
  partials/
    head-open.html       # DOCTYPE + shared <head>, locale-aware
    nav.html             # Sticky nav
    footer.html          # Footer + script injection
  pages/
    *.html               # <main>…</main> only
    *.meta.json          # title, description, canonical, head_extra, page_scripts
  i18n/
    shared.js            # nav/footer keys
    <page>.js            # per-page Chinese dictionary (build input, not shipped)
scripts/
  build.mjs              # assemble → public/ + public/zh/ + sitemap.xml
  check-links.mjs        # broken internal links
  check-zh-coverage.mjs  # untranslated prose on /zh/
```

For each source page the build emits **two** pages — English at `/x` and Chinese
at `/zh/x` — and per page it:

1. pre-renders the Chinese copy by applying `src/i18n/` dictionaries (keyed
   lookups first, then the legacy innerHTML map), the same order the old runtime
   engine used;
2. prefixes internal links with `/zh` and rewrites absolute `reranker.uk` URLs
   inside JSON-LD;
3. sets a self-referencing canonical plus `en` / `zh-Hans` / `x-default`
   hreflang;
4. injects a `BreadcrumbList` when the page's meta doesn't already declare one;
5. marks the active nav item and points the locale toggle at the counterpart URL;
6. records a sitemap entry, with `lastmod` read from the file's last commit.

The run also emits `public/llms.txt`, a plain-text map of the site for
assistants that read one before citing a source. It is generated from the same
page tree, so it cannot drift; adding a page to `src/pages/` is enough.

A file that exists once for the whole site rather than per locale — `sitemap.xml`,
`robots.txt`, `changelog.rss`, `llms.txt`, anything under `/assets/` — must be
listed in `LOCALE_NEUTRAL` in `scripts/build.mjs`, or links to it from a Chinese
page get rewritten to a `/zh/` path that does not exist.

### Interactive pages

Two pages carry their own logic and are not just prose:

| Page | Script | Notes |
|------|--------|-------|
| `/demo.html` | `public/assets/js/demo.js` | Cross-encoder in the browser. Deep links: `?s=<preset>` for a built-in scenario, `?q=&docs=` for literal contents, `?m=`/`?m2=` for models, `?z=` for gzipped state. An untouched preset shares as the short `?s=` form. |
| `/rerank-cost-calculator.html` | `public/assets/js/cost-calculator.js` | Cohere per-search vs Voyage per-token pricing. Rates are hard-coded constants — update them alongside the models table each quarter. |

### Bilingual (EN / 中文)

Language is decided by the **URL**, not by `localStorage`. `/x` is English,
`/zh/x` is Chinese, the nav toggle is a real `<a>` between the two, and both
carry hreflang pointing at each other.

Because translation happens at build time, the dictionaries never reach the
browser. When you change an English string you orphan its translation — run
`node scripts/check-zh-coverage.mjs` after content edits and add the missing
key to the relevant `src/i18n/<page>.js`. The dictionary key is the element's
**normalised inner HTML** from the English build.

Changing only a link *target* is handled for you: the build retries the lookup
with hrefs blanked out and repoints the links inside the translation. It gives
up if the two sides carry a different number of links, so a restructured
paragraph still shows up in the coverage report rather than silently acquiring
the wrong targets.

---

## Maintaining benchmarks

Review the models table each quarter (target: **Nov 2026**, then Feb/May/Aug):

1. Re-check BEIR / vendor numbers for mature rows (bge, Jina, mxbai, ms-marco).
2. Where a vendor publishes no comparable figure, write **not published** — do
   not substitute a number from a different protocol without marking it `*`.
3. Spot-check pricing, and note that the *units* differ: Cohere bills per search
   (one query + up to 100 docs), Voyage per token.
4. Bump **Last verified** / **Next review** in `/models/`, add a changelog entry
   and an item in `public/changelog.rss`.

### Verified August 2026

| Model | What was confirmed |
|-------|--------------------|
| Cohere Rerank 4 | `rerank-v4.0-pro` / `rerank-v4.0-fast`, released Apr 2026, 32k context, 100+ languages, $0.0025 / $0.002 per search |
| Voyage rerank-2.5 | `rerank-2.5` / `-lite`, 32k context, instruction following, $0.05 / $0.02 per 1M tokens, first 200M free |
| Jina Reranker v3 | 0.6B listwise on Qwen3-0.6B, 61.94 BEIR nDCG@10, 64 docs in a 131K context |
| llama-nemotron-rerank-1b-v2 | 1.2B, 83.0 Hit@1 / 88.3 Hit@10 on NVIDIA's QA protocol |
| gte-reranker-modernbert-base | ~149M, ties nemotron-1b on Hit@1 |
| Qwen3-Reranker | Apache 2.0, 0.6B/4B/8B, 32K context; 4B reported ~0.48 ahead of 8B on BEIR |

---

## Deploy (Cloudflare Workers)

```bash
npm run build
npx wrangler deploy                    # → reranker.uk
# npx wrangler versions upload         # preview only
```

`wrangler.jsonc`: `assets.directory = ./public`, `not_found_handling = 404-page`.

### Authenticate (once per machine)

```bash
npx wrangler login
# If the browser shows "localhost refused connection":
npx wrangler login --callback-host 127.0.0.1 --callback-port 8976
```

**Alternative — API token** (no localhost callback):
[create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/)
from the **Edit Cloudflare Workers** template, then:

```powershell
$env:CLOUDFLARE_API_TOKEN = "your-token"
```

---

## Demo architecture

`demo.js` (ES module) loads cross-encoders from HuggingFace via
[transformers.js](https://github.com/huggingface/transformers.js). Scoring runs
in-browser (WASM or WebGPU). No server, API key, or outbound query data.

Demo models: `Xenova/ms-marco-MiniLM-L-6-v2`,
`jinaai/jina-reranker-v1-tiny-en`, `mixedbread-ai/mxbai-rerank-xsmall-v1` —
transformers.js 3.5.1, ONNX q8, browser cache.

---

## Changelog

Release notes live on [/changelog.html](https://reranker.uk/changelog.html) and
in [`src/pages/changelog.html`](src/pages/changelog.html). Older entries that
used to be duplicated here were removed in favour of that single source.

---

## Licence & affiliation

Open educational resource · not affiliated with any model vendor.

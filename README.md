# reranker.uk

Educational resource on rerankers for retrieval and RAG, with a live in-browser cross-encoder demo.

## Structure

The deployable site lives under `public/` (the Cloudflare assets directory);
`wrangler.jsonc` and `README.md` stay at the repo root.

```
wrangler.jsonc              # Cloudflare Workers static-assets config
public/                     # ← everything served lives here
  index.html                # Homepage
  404.html                  # Custom not-found page
  demo.html                 # Live reranking demo (transformers.js, 100% client-side)
  guides/
    what-is-a-reranker.html
    cross-encoder-vs-bi-encoder.html
    rerank-rag.html
  models/
    index.html              # Comparison table
    bge-reranker.html
    cohere-rerank.html
    jina-reranker.html
    voyage-rerank.html
    mxbai-rerank.html
  assets/
    css/style.css
    js/main.js              # Nav + shared UI
    js/demo.js              # transformers.js reranking engine (ES module)
    js/i18n.js              # EN/中文 toggle engine (capture-original + dictionary)
    js/i18n/*.js            # Per-page Chinese dictionaries (window.I18N_PAGE)
    img/favicon.svg, og-cover.png, icon-*.png, apple-touch-icon.png
  sitemap.xml
  robots.txt
  site.webmanifest
```

## Bilingual (EN / 中文)

The site ships in English (default, SEO-friendly) and switches to Chinese
client-side via the 🌐 toggle in the nav. `assets/js/i18n.js` captures each
translatable block's original English `innerHTML` on load and swaps in Chinese
from a per-page dictionary (`assets/js/i18n/<page>.js`), keyed by the normalised
English text. Shared chrome (nav/footer) lives in the engine's `SHARED` map. The
choice is persisted in `localStorage` and auto-detected from `navigator.language`
on first visit. Missing keys fall back to English, so partial dictionaries never
break a page. The demo's dynamic strings (status, rank deltas) follow the
language via an `i18n:changed` event.

## How the demo works

`assets/js/demo.js` is an ES module that lazy-loads a quantised cross-encoder
from HuggingFace Hub via transformers.js (ONNX Runtime Web). The model is
downloaded once and cached in the browser. Scoring runs entirely on the user's
device — no server, no API key, no data leaves the page.

Three models are available in the dropdown:
- `Xenova/ms-marco-MiniLM-L-6-v2` (~90 MB) — default
- `jinaai/jina-reranker-v1-tiny-en` (~33 MB) — fastest
- `mixedbread-ai/mxbai-rerank-xsmall-v1` (~70 MB) — strong quality

## Deploy

Zero-build static site. The deploy is configured for **Cloudflare Workers
static assets** via `wrangler.jsonc`, which serves `public/`:

```bash
npx wrangler deploy            # production
npx wrangler versions upload   # non-production version (preview)
```

Because it's just static files, `public/` can also be uploaded to any other
static host (GitHub Pages, Netlify, Cloudflare Pages, etc.) — point the host's
publish/output directory at `public`. No build step required.

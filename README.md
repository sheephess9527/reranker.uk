# reranker.uk

Educational resource on rerankers for retrieval and RAG, with a live in-browser cross-encoder demo.

## Structure

```
index.html                  # Homepage
demo.html                   # Live reranking demo (transformers.js, 100% client-side)
guides/
  what-is-a-reranker.html
  cross-encoder-vs-bi-encoder.html
  rerank-rag.html
models/
  index.html                # Comparison table
  bge-reranker.html
  cohere-rerank.html
  jina-reranker.html
  voyage-rerank.html
assets/
  css/style.css
  js/main.js                # Nav + shared UI
  js/demo.js                # transformers.js reranking engine (ES module)
  img/favicon.svg
sitemap.xml
robots.txt
```

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

Zero-build static site — upload the directory to any static host (GitHub Pages,
Netlify, Cloudflare Pages, etc.). No build step required.

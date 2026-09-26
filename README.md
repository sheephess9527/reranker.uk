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
| `/demo` | `public/assets/js/demo.js` | Cross-encoder in the browser. Deep links: `?s=<preset>` for a built-in scenario, `?q=&docs=` for literal contents, `?m=`/`?m2=` for models, `?z=` for gzipped state. An untouched preset shares as the short `?s=` form. |
| `/rerank-cost-calculator` | `public/assets/js/cost-calculator.js` | Cohere per-search vs Voyage per-token pricing. Rates are hard-coded constants — update them alongside the models table each quarter. |

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

### `data/models.json` — sourced numbers, not hand-typed ones

A benchmark number that's typed directly into a page drifts silently: a model
gets superseded, the page doesn't, and nothing notices (this happened —
`mxbai-rerank-large-v1`'s BEIR figure sat at an unsourced ~62.1 for months;
mixedbread's own numbers put it at 49.32). Any number that's been through this
once goes in `data/models.json` instead — `{value, source_url, protocol_note?,
verified_on}` per fact — and pages reference it with a `{{fact:<model
id>.<field>}}` token that `scripts/build.mjs` resolves at build time:

- No `source_url` → the build throws. A number with nowhere to point doesn't
  ship.
- `verified_on` older than 6 months → a build-time console warning (not a
  failure — it's a nudge for the next quarterly review, not a gate).
- `protocol_note` present → the rendered number always gets a trailing `*`,
  so a reader can't miss that it isn't the same protocol as its neighbours.

This is only wired up for the numbers that have actually been re-verified so
far (the mxbai family, as of Sep 2026) — everything else in the table is
still a hand-typed literal following the quarterly-review process above.
Migrating a row: add its facts to `data/models.json`, replace the literal in
`src/pages/` with the token, rebuild, and confirm the number renders
unchanged (or corrects, if that's why you're touching it).

### Verified September 2026

| Model | What was confirmed |
|-------|--------------------|
| mxbai-rerank-large-v1 | BEIR figure corrected from an unsourced ~62.1 to mixedbread's own 49.32 (their cross-generation comparison table); confirmed English-only |
| mxbai-rerank-base-v2 / large-v2 | New generation, Qwen2.5-based, Apache 2.0, 0.5B/1.5B, 100+ languages incl. Chinese, BEIR 55.57/57.49 — added to the table, which previously carried only the v1 family |

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

## Testing

`npm test` runs a Playwright smoke test of the live demo (`tests/demo.smoke.spec.js`)
against a fake `transformers.js` module — no real download, so it runs in every
PR (see `.github/workflows/ci.yml`) and only proves the demo's own load →
score → render wiring still works.

`npm run test:real` (`tests/demo.smoke.real.spec.js`) runs the same
interaction against the real jsDelivr / HuggingFace / hf-mirror.com chain,
with a real (small) model download and real ONNX Runtime Web inference. This
is what would actually catch one of those three dependencies breaking, which
the mocked test cannot — it's the site's answer to "the demo could go dark
and nobody would know." It's slow and depends on infrastructure this repo
doesn't control, so it isn't run on every PR: `.github/workflows/demo-smoke-daily.yml`
runs it once a day on a schedule instead. Both need `npx playwright install
--with-deps chromium` first if you don't already have a Chromium Playwright
can drive.

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

Release notes live on [/changelog](https://reranker.uk/changelog) and
in [`src/pages/changelog.html`](src/pages/changelog.html). Older entries that
used to be duplicated here were removed in favour of that single source.

---

## Licence & affiliation

Open educational resource · not affiliated with any model vendor.

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

1. Run `npm run check:sources` (or read the daily workflow's `sources` job) and
   re-read the two figures it can't check (BAAI's, published only as an image).
2. Where a vendor publishes no comparable figure, write **not published** — do
   not substitute a number from a different protocol without marking it `*`.
   There is no common BEIR protocol to fall back on: BAAI average 15 datasets
   over bge-large-en-v1.5's top 100, Jina 13 over jina-embeddings-v3's top 100
   (17 for their v1 models), mixedbread their own set, and the same model can
   land 1–4 points apart across them.
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

`scripts/check-sources.mjs` closes the other half of the loop: the build knows
a source exists, not what it says. The script fetches every `source_url` (or
`check_url`, e.g. a raw README) and fails if the value no longer appears there
as a standalone number — or, with `check_pattern`, if a regex pinning the value to
its row no longer matches (a bare "0.05" proves nothing on a price list).
`check_raw` matches against the raw HTML instead, for pages that ship their
numbers as embedded JSON and render them client-side. It needs open internet, so it runs in the daily
real-network workflow, not on PRs. A figure that only exists in an image is
marked `check: "manual"` with a `check_note` saying where to look; the script
prints it on every run so the skip is never silent.

Every number in the `/models/` BEIR column now comes from here (as of Oct
2026). Other hand-typed figures elsewhere on the site still follow the
quarterly-review process above.
Migrating a row: add its facts to `data/models.json`, replace the literal in
`src/pages/` with the token, rebuild, and confirm the number renders
unchanged (or corrects, if that's why you're touching it).

### Measuring the demo

`npm run measure:latency` (after `npm run build`) loads the live demo in
Chromium and times each browser model: the cold first run (download + 10
passages), then the median of 5 warm runs at 10 and 30 passages, plus the
download size the demo reports. It needs open internet, so run it from a
`workflow_dispatch` of the real-network workflow (add it as a step) or a
machine with access. The figures the site quotes live in `data/models.json`
(`browser_*` fields, `check: "manual"`) with the run URL as their source —
update them from a new run rather than editing pages.

`ISOLATION=both` runs every model twice on the same machine, once as served
and once with COOP/COEP stripped from the page response, to measure what
cross-origin isolation buys (Oct 2026: ~1.9x on 4 vCPU).

### Cross-origin isolation on the demo

`/demo` and `/zh/demo` send `Cross-Origin-Opener-Policy: same-origin` and
`Cross-Origin-Embedder-Policy: credentialless`, so ONNX Runtime Web can use
SharedArrayBuffer and score on several threads. `credentialless` needs nothing
from jsDelivr or HuggingFace; a browser that doesn't support it stays
single-threaded. The threaded runtime loads through a `blob:` URL, so those
two pages replace the site-wide CSP with one that adds `blob:` to
`script-src`, using Cloudflare's `! Header-Name` detach syntax in `_headers`
(`scripts/serve.mjs` mirrors it). The daily `headers` job checks both on the
live site.

### Verified October 2026

Checked against the primary sources on a GitHub runner (this sandbox can't
reach HuggingFace or arXiv), via `check-sources.mjs --verbose`.

| Model | What was confirmed |
|-------|--------------------|
| bge-reranker-v2-m3 | BEIR corrected from an untraceable ~60.1 to BAAI's own 55.36 (FlagEmbedding `research/llm_reranker`, image table `BEIR-bge-en-v1.5.png`) |
| bge-reranker page | Whole benchmark table rebuilt: v2-m3 55.36 and v2-gemma 60.71 BEIR; base 65.42 and large 66.10 C-MTEB reranking (BAAI publish no BEIR for v1). The old MS MARCO column had no source and is gone. Sizes were parameter counts written as MB |
| jina-reranker-v3 | 61.94 confirmed on the model card, arXiv abstract and jina.ai; the arXiv v4 full text says 61.85. Protocol: 13 BEIR datasets, top 100 from jina-embeddings-v3 |
| jina-reranker-v1-tiny-en | 48.54 on 17 BEIR datasets (model card). The table's sort key had carried an unsourced 55 |
| ms-marco-MiniLM-L-6-v2 | 48.64, third-party — Jina's v1 model card measured it; its own authors publish no BEIR average |
| jina-reranker-v3.5 | Added. 0.6B (596.8M), CC BY-NC 4.0, announced Aug 2026; 63.20 BEIR on Jina's 2026 protocol (13 datasets, top 100 from jina-embeddings-v5-text-small). Same run: v3 62.10, Qwen3-Reranker-4B 62.28 — so "v3 beats Qwen3-4B" (from the 2025 run: 61.94 vs 61.16) was withdrawn |
| Jina licences | v2-base-multilingual, v3, v3.5, m0: CC BY-NC 4.0; v1 tiny/turbo: Apache 2.0 (HF API `cardData.license` and jina.ai FAQ). `jina-reranker-v1-base-en` returns 401 on the HF API — no longer public |
| Jina pricing | Only what jina.ai serves as text: free trial tokens on new keys, then packages; new pricing model since 6 May 2025; rate limits 100/500/5,000 RPM. Package prices render client-side, so none are quoted |
| Other licences | bge-reranker-base/large MIT; bge v2, Qwen3-Reranker, mxbai v1/v2, gte-modernbert, ms-marco MiniLM Apache 2.0; nemotron-rerank "other" (NVIDIA licence) |
| mxbai-rerank-large-v1 | 435M parameters per HF safetensors metadata; mixedbread's README says 1.5B |
| Cohere pricing | $2.50 / $2 per 1K searches (Pro / Fast), 32,768 context — from the JSON embedded in cohere.com/pricing (the price cards render client-side, hence `check_raw`). Search unit per the same page's FAQ: 1 query + up to 100 docs, docs over 500 tokens incl. query split and counted per chunk. **Reverses the Sep 2026 "chunking myth" note.** Trial keys: 1,000 calls/month, not for production (docs/rate-limits) |
| Voyage rerankers | rerank-3 / -lite are current and recommended (docs/reranker), $0.05 / $0.02 per 1M tokens with 200M free each; rerank-2.5 / -lite are "older models", same price, no free tokens per the price table (one stale sentence on the same page still says otherwise). Batch API 33% off, listed for rerank-2.5 / -lite only; instructions documented for 2.5 only |
| Qwen3-Reranker | MTEB-R 65.80 / 69.76 / 69.02 (0.6B / 4B / 8B), Qwen's own, top 100 from Qwen3-Embedding-0.6B; 8B leads CMTEB-R, MMTEB-R, MLDR, Code; 4B leads FollowIR. Instruction-aware; CrossEncoder-loadable. The old "~0.48 on BEIR" had no source |
| gte-reranker-modernbert-base | 149M, 8192 context, Apache 2.0, English; BEIR 56.19 on its card (protocol unstated). "Ties nemotron on Hit@1" had no source |
| llama-nemotron-rerank-1b-v2 | 1.2B, 8192 tokens, 26 languages evaluated, OpenMDW-1.1 + Llama 3.2 licence, commercial use allowed. Card reports pipeline Recall@5 only; the old "Hit@1 83.0" had no source |
| Contextual AI Rerank v2 | Open weights since Aug 2025: 1B / 2B / 6B, CC BY-NC-SA 4.0, 100+ languages, 32K context, instruction-following. The table had it as an English-only hosted API |

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
| Jina Reranker v3 | 0.6B listwise on Qwen3-0.6B, 61.94 BEIR nDCG@10, 64 docs in a 131K context (superseded Oct 2026 — see above) |
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
once per model in the demo's picker, with real model downloads and real ONNX
Runtime Web inference, and asserts a relevant passage outranks an unrelated
one. This is what would actually catch one of those three dependencies
breaking, which the mocked test cannot — it's the site's answer to "the demo
could go dark and nobody would know." It also logs every redirect it sees
(HF 302s model weights to CDN hosts), since a CSP violation on a redirect
names the wrong host. It's slow and depends on infrastructure this repo
doesn't control, so it isn't run on every PR: `.github/workflows/demo-smoke-daily.yml`
runs it once a day on a schedule instead. Both need `npx playwright install
--with-deps chromium` first if you don't already have a Chromium Playwright
can drive.

**Before merging anything that touches the demo's dependencies** (a
transformers.js bump, a CSP change), run the daily workflow on the branch
from the Actions tab ("Run workflow", `workflow_dispatch`) — that's the only
check in this repo that exercises real model loading. The Sep 2026
transformers.js 3.5.1 → 4.3.0 upgrade was verified that way, and the run
found a CSP break the mocked test couldn't have seen.

`npm test` also runs `tests/a11y.spec.js`: axe-core's WCAG 2.1 A/AA rules
against every built page in **both** themes (contrast is entirely different
between them), with reduced motion so fading-in demo results aren't measured
mid-fade. `npm run test:a11y` runs just that; `node tests/helpers/axeAudit.mjs`
(with `node scripts/serve.mjs` running) prints a full report grouped by rule.
One axe quirk worth knowing: its link check treats *any* differing
`text-decoration-*` property as a visual cue, so a link with
`text-decoration-thickness` set but no underline drawn still passes. The
underline on prose links in `style.css` is the actual requirement.

Both smoke tests also assert zero `securitypolicyviolation` events (see
`tests/helpers/csp.mjs`) — the one way this repo can check the CSP below
against something other than a hand read of the policy string.

---

## Security headers

`public/_headers` (Cloudflare Workers Static Assets' header mechanism, same
syntax as Cloudflare Pages) is generated by `scripts/build.mjs`'s
`writeHeadersFile()`, not hand-maintained — editing it directly gets
overwritten on the next build. It sets `X-Content-Type-Options`,
`X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, and a
**report-only** Content-Security-Policy.

Report-only, not enforcing. `scripts/serve.mjs` (what the Playwright tests
run against) applies `_headers`, and both smoke tests assert no violations;
the daily real-network one is the check that matters, since it loads real
models through real WASM. It has already caught two gaps that would have
broken every model download had the policy been enforcing:

- HuggingFace 302s model weights from `huggingface.co` to CDN hosts
  (`cas-bridge.xethub-eu.hf.co`, `us.aws.cdn.hf.co` — region-dependent),
  hence the `*.hf.co` wildcard in `connect-src`.
- transformers.js 4 imports ONNX Runtime's WASM factory from a `blob:` URL
  by default; the demo sets `env.useWasmCache = false` so `script-src`
  doesn't need `blob:`.

What's still unverified is the **hf-mirror.com** path: CI runs from the US
and always wins the host race to huggingface.co, so the mirror (what
visitors in mainland China get) is never exercised. Before promoting to
enforcing (`Content-Security-Policy` instead of `-Report-Only`), load the
demo once from a network where the mirror wins and check the browser
console for violations, and confirm the daily run has stayed green for a
few days.

The CSP's `script-src` includes a `sha256-...` hash instead of
`'unsafe-inline'`, computed at build time from the literal content of the
one inline `<script>` the site ships (`src/partials/head-open.html`'s
early theme-detection snippet). Change that script and the hash updates
with it automatically — nothing to keep in sync by hand.

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
transformers.js 4.3.0, ONNX q8, browser cache.

---

## Changelog

Release notes live on [/changelog](https://reranker.uk/changelog) and
in [`src/pages/changelog.html`](src/pages/changelog.html). Older entries that
used to be duplicated here were removed in favour of that single source.

---

## Licence & affiliation

Open educational resource · not affiliated with any model vendor.

# Cost calculator copy and a release watch that survives the new year — 2026-11-20

Two user-facing/infrastructure defects were reported from outside the review loop and
fixed together. No model facts, scores, prices, dependencies or analytics changed.

## 1. The "Compare rerank models" card under the cost calculator

`src/pages/rerank-cost-calculator.html` still read *"Architecture, latency, languages and
cost across 16 models."* — true of a smaller table, stale for a long time.

What the table actually holds today: `src/pages/models/index.html` has **38 `<tr
data-name=…>` rows**, of which five are hosted platforms rather than models (Alibaba Cloud
Model Studio, SiliconFlow, Amazon Bedrock, Pinecone, Vertex AI). The page's own counter
(`models-index.js`, `#models-count`) prints "38 of 38 models" from the same rows. So a
fixed number is either wrong (16) or arguable (38 rows vs 33 model rows), and it would go
stale again with the next model added.

Fix: the sentence names no number — *"Architecture, latency, languages and cost for every
reranker in the table."* The Chinese dictionary key moved with it
(`src/i18n/rerank-cost-calculator.js`), because the key **is** the normalised inner HTML;
leaving the old key would have left the Chinese page saying 16.

## 2. `data/release-watch.json`: a URL that expired every January

The "Pinecone changelog" entry watched `https://docs.pinecone.io/release-notes/2026`, with
a standing instruction in the config, README and CLAUDE.md to edit it to `/2027` in
January.

Measured with real requests (20 Nov 2026, UTC):

| URL | Result |
|---|---|
| `https://docs.pinecone.io/release-notes/2026` | 200, 470 KB, lists `cohere-rerank-3.5` and `cohere-rerank-4-fast` |
| `https://docs.pinecone.io/release-notes` | **308 → `/release-notes/2026`**, same page, same IDs |
| `https://docs.pinecone.io/release-notes.md` | 307 → `/release-notes/2026.md` (markdown variant, same behaviour) |
| `https://docs.pinecone.io/release-notes/2025`, `/2024` | 200 (older years stay published) |
| `https://docs.pinecone.io/release-notes/2027` | 404 today (that year has not started) |
| `https://docs.pinecone.io/release-notes/latest`, `/changelog` | 404 (no such aliases) |

Fix: the entry uses the undated `/release-notes`. Its year is resolved by Pinecone's own
redirect, so January needs no edit.

The failure mode this introduces is a silent one — a redirect that stops following the
calendar still answers 200 and still matches model IDs, so the watch would look healthy
while reading last year's announcements. So `scripts/watch-releases.mjs` now records
`res.url` for each fetch and, for an entry marked `"current_year": true`, warns unless the
address it landed on carries the current year. `get()` keeps its signature; the final URLs
live in a small module-level map.

Verified both ways with `node scripts/watch-releases.mjs --baseline`:

- as committed: `Pinecone changelog (https://docs.pinecone.io/release-notes)` →
  `["cohere-rerank-3.5","cohere-rerank-4-fast"]`, `expected but missing: []`, `marked
  retired: []` — identical to the pre-change baseline against `/2026`;
- with the URL temporarily set to `/release-notes/2025`:
  `⚠ Pinecone changelog: https://docs.pinecone.io/release-notes/2025 lands on
  https://docs.pinecone.io/release-notes/2025 — 2025, not 2026; point it at this year's
  page` (config restored afterwards).

### Every watched URL, checked the same way

All 16 `pages[].url` entries were requested (`curl -sIL`) on 2026-11-20:

| Entry | Status |
|---|---|
| Cohere rerank models, Cohere pricing | 200 |
| Voyage rerankers | 200 |
| Jina rerankers | 200 |
| ZeroEntropy models / pricing | no DNS (`curl-error 6`; `docs.zeroentropy.dev` also fails public DoH with "no reachable authority at delegation zeroentropy.dev"). Pre-existing and already recorded in `docs/changes/2026-11-18-patrol.md` (draft PR #77); the watch treats it as a warning, unchanged by this work |
| Mixedbread docs index | 200 |
| Alibaba Cloud Model Studio | 200 |
| SiliconFlow API / models | 200 |
| Pinecone hosted rerankers | 200 |
| Pinecone changelog | 200 after the 308 described above |
| Contextual AI rerank API | 200 |
| Amazon Bedrock rerank models | 200 (`/latest/` path, no year) |
| Google Vertex AI ranking | 200 |
| NVIDIA NIM rerankers | 200, but via a redirect: `…/text-reranking/latest/support-matrix.html` → `…/reranking/latest/support-matrix.html`. Left as-is (it resolves, and the config's `why` describes the 2.3/2.4 split); noted in case NVIDIA drops the old path |

Other year-bearing URLs in the repo were checked too: `data/models.json` cites Voyage's
`https://blog.voyageai.com/2026/09/30/rerank-3/` (200) — an article path, which does not
expire like a year index. `check-sources.mjs`, `check-external-links.mjs` and
`check-links.mjs` do not reference the Pinecone release-notes URL, so nothing else needed
changing.

## Files

- `src/pages/rerank-cost-calculator.html`, `src/i18n/rerank-cost-calculator.js`: the card
  copy and its Chinese key.
- `data/release-watch.json`: undated Pinecone URL, `current_year: true`, updated `why`.
- `scripts/watch-releases.mjs`: final-URL tracking, the year guard, doc comment.
- `src/pages/changelog.html`, `src/i18n/changelog.js`, `public/changelog.rss`: one public
  entry, `#2026-11-20-copy-watch`.
- `README.md`, `CLAUDE.md`, `CHANGELOG.md` and this record: the standing "edit it in
  January" instruction is gone, replaced by what the watch now enforces.
- `public/**/*.html`, `public/sitemap.xml`, `public/changelog.rss`: rebuilt, never
  hand-edited. The sitemap diff is `lastmod` only: the build takes each date from `git log`
  of the page's sources, and the committed copy predates several merged PRs.

## Verification

- `npm run build`: 72 pages (36 en + 36 zh), 70 sitemap URLs, 70 search entries.
- `npm run check:links`: 72 files, no broken internal links.
- `npm run check:ld`: 106 JSON-LD blocks OK. `npm run check:zh`: no untranslated prose.
  `npm run check:og`: 70 social cards current. `npm run check:i18n` still reports its three
  known mxbai false positives (CLAUDE.md, 2026-11-01).
- Full required `npm test` set — **272 passed** (demo 3, feed 2, cost calculator 6, a11y
  140, models table/mobile/link-health 83, search/theme/asset-cache/changelog 28,
  guide-pager/picker/copy/ndcg 10). Run locally with a temporary external Playwright config
  pointing at `127.0.0.1` (this sandbox has no `localhost` entry) and two workers; four
  workers made unrelated specs flake, so the batches were re-run at two.
- `node scripts/watch-releases.mjs --baseline`, before and after, as recorded above.

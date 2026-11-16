# Related LLM hardware calculator — 2026-11-16

Owner-requested reciprocal link with quantized.uk: its model/VRAM pages point to
this site's reranker picker, and this site's shared footer points to the LLM VRAM
calculator. English and Chinese links preserve language. The text explicitly
separates LLM sizing from reranker activation memory. Only public UTM source,
medium and campaign labels are used; no user identifiers or new scripts.

## Files

- src/partials/footer.html: contextual backlink in shared footer.
- src/i18n/shared.js: matching Chinese HTML and destination.
- src/pages/changelog.html, src/i18n/changelog.js, public/changelog.rss: synchronized
  public change entry and source-date timestamp.
- public/**/*.html and generated search/sitemap/llms outputs: rebuilt from source,
  never hand-edited. Their exact changed file inventory is the commit diff.
- README.md, CLAUDE.md, CHANGELOG.md and this record: integration and verification.

## Verification

- `npm run check`: 72 pages built (36 EN + 36 ZH); internal links pass and all
  106 JSON-LD blocks pass.
- `npm run check:zh`: no untranslated prose. `check:og`: all 70 cards current.
- Full required `npm test`: **272 passed**, using two workers and a temporary
  external config pointing to installed Chromium; no repository test settings changed.
- Local reciprocal link checks pass on EN/ZH homepage, picker and model index:
  matching-language target, public UTM source, clickability, explicit LLM scope,
  no page errors or horizontal overflow at mobile/desktop widths.
- Generated public pages are included with source as this repository expects.
  No reranker scores, prices, scoring code, dependencies or new analytics changed.
- Application commit `8e35f70` was fast-forward merged into `main` and pushed.
- GitHub `build-and-test` completed successfully. [Cloudflare Workers deployment](https://dash.cloudflare.com/7d5a680e05e83711c23f19702fc6480d/workers/services/view/reranker/production/builds/f024f50d-a6a8-4c1d-ba36-ded0ed77259d)
  completed successfully.
- Post-deployment Chromium checks passed for **EN and ZH** on the live homepage,
  picker and model index, alongside quantized.uk's model/VRAM forward links.
  Destination language, UTM source, clickable links, LLM scope text, no page
  errors and mobile/desktop overflow checks all passed.
- Quantized reciprocal application commit `fb2c3da` also passed CI and deployment.
- This delivery follow-up changes Markdown only; tested application sources stay
  unchanged. Merged feature branches are removed after production verification.

# CLAUDE.md

Operational guide for Claude Code working in this repository. **Read this fully
before editing.** It is the source of truth for *how the project works*; the
dated changelogs in `README.md` are history, and `README.md` → "🚀 Start here"
has the same material in long form if you need more depth.

## What this is

`reranker.uk` is a **static, backend-less educational site** about rerankers for
retrieval/RAG, plus a **demo that runs a real cross-encoder entirely in the
browser** (transformers.js + ONNX, no API, no server, no cost). HTML pages are
**generated** from `src/` by `scripts/build.mjs`; CSS/JS/translations are
**hand-written static assets** under `public/`. The site is **bilingual
(English + 中文)** via a client-side toggle. Deployed on Cloudflare Workers
(static assets serving `./public`).

## Golden rules (violating these creates silent bugs)

1. **HTML is generated — never hand-edit `public/*.html`.** Edit `src/pages/`
   and `src/partials/`, then run `node scripts/build.mjs`. A rebuild overwrites
   every `public/*.html`. (Real regression we hit: demo `<noscript>` + preconnect
   hints were edited into `public/demo.html` only and the next build dropped them.
   Put HTML changes in `src/`.)
2. **Normalise line endings after every build:**
   `find public -name "*.html" -exec sed -i 's/\r$//' {} +`
   `.meta.json` `head_extra` fields hold `\r\n`; skipping this flips JSON-LD
   blocks to CRLF and makes a noisy, misleading diff.
3. **Static assets are NOT generated — edit them directly** in `public/`:
   `assets/css/style.css`, `assets/js/*.js`, `assets/js/i18n/*.js`,
   `sitemap.xml`, `robots.txt`, images.
4. **Branch:** do all work on `claude/reranker-uk-resource-demo-i09f5t`. Commit,
   then `git push -u origin <branch>`. Rebase on `origin/main` if behind (the
   remote has been ahead before). Never push to `main`. No PRs unless asked.
5. **Keep `README.md` current** — append a dated changelog entry per change set.

## Commands

```bash
node scripts/build.mjs                                    # build src/ → public/
find public -name "*.html" -exec sed -i 's/\r$//' {} +   # ALWAYS run after build
node scripts/build.mjs --watch                           # rebuild on change
npx serve public                                         # local preview (or python3 -m http.server -d public)
npx wrangler deploy                                      # deploy to reranker.uk (npx wrangler login once)
```

## Layout

```
scripts/build.mjs       # the only build step (src/pages + src/partials → public/*.html)
src/partials/           # head-open.html, nav.html, footer.html (shared chrome, {{PLACEHOLDERS}})
src/pages/<name>.html   # page BODY only (<main>…</main>)
src/pages/<name>.meta.json  # title, description, canonical, og_*, head_extra, page_scripts
public/                 # DEPLOY ROOT. *.html GENERATED; everything else is source.
public/assets/js/demo.js         # in-browser demo (ES module)
public/assets/js/i18n.js         # bilingual engine — read once, don't reimplement
public/assets/js/i18n/shared.js  # window.I18N_SHARED.keys (nav/footer/chrome, all pages)
public/assets/js/i18n/<page>.js  # window.I18N_PAGE (per-page _title/_desc + body translations)
```

## i18n — the most error-prone part

Two layers, both in `assets/js/i18n.js`:

- **Keyed (shared chrome):** elements carry `data-i18n="shared.nav.home"`;
  values from `window.I18N_SHARED.keys` (`shared.js`). Used by nav + footer.
- **Legacy (article bodies):** `window.I18N_PAGE.zh` maps **exact rendered
  `innerHTML` (whitespace-collapsed) → Chinese**. The engine swaps innerHTML on
  `main h1,h2,h3,h4,p,li,blockquote,td,th,label,.eyebrow,.btn,.meta,.breadcrumb,.toc strong`.

**Script load order** (auto, via footer partial + `page_scripts`): `main.js` →
`<page>.js` → `shared.js` → `i18n.js`. Every page's `.meta.json` must point
`page_scripts` at its dict.

**Gotchas that cause silent "stays English":**

- Keys must match innerHTML **exactly**: inline tags (`<strong>`, `<code>`,
  `<a href="…">`), entities (`&amp;`), em/en-dashes (`—` `–`), curly quotes
  (`" " '`). One char off = no translation, no error.
- Prefer plain ASCII punctuation in *new* English body text (`as-is`, not
  “as is”); copy existing smart quotes verbatim into keys.
- A CTA `<a class="btn">` inside `<p>` is collected twice — provide **both** the
  button-text key and the full `<a …>…</a>` wrapper key (see `changelog.js`).
- `_title` / `_desc` translate `<title>` and meta description (not innerHTML keys).

**Validate any dict** (prints strings with no key):

```bash
node -e '
const fs=require("fs");const p=process.argv[1];
const html=fs.readFileSync(`public/${p}.html`,"utf8");
const js=fs.readFileSync(`public/assets/js/i18n/${p.split("/").pop()}.js`,"utf8");
const main=html.slice(html.indexOf("<main"),html.indexOf("</main>"));
const re=/<(h1|h2|h3|h4|p|li|blockquote|td|th)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/g;let m,ok=0,miss=0;
while((m=re.exec(main))){const t=m[2].replace(/\s+/g," ").trim();if(!t)continue;
 if(/^[\d.,%\s–—-]+$/.test(t))continue;
 if(js.includes(JSON.stringify(t)))ok++;else{miss++;console.log("NO KEY:",t.slice(0,80));}}
console.log("matched",ok,"missing",miss);
' guides/rerank-rag    # page path; home→home.js, guides/index→guides-index.js, models/index→models-index.js
```

**Known i18n gaps (not yet closed):**

- **In-page TOC anchor links** — `<li><a href="#x">Heading</a></li>` is keyed on
  the whole anchor, but dicts hold only the bare heading text, so the "On this
  page" list stays English while the matching `<h2>` translates. Fix by adding
  anchor-form keys, e.g.
  `"<a href=\"#why\">Why ranking order is a problem</a>": "<a href=\"#why\">为什么排序顺序是个问题</a>"`.
  Systematic across guide/model pages — the biggest remaining gap.
- Scattered short labels on model pages (`Pros`/`Cons`/`Other models`, a few
  table headers, a card blurb or two).
- **Intentionally English:** code spans, model IDs, file sizes, benchmark
  numbers — leave as-is; ignore them in validator output.

## Recipes

**Add a page:** (1) `src/pages/foo.html` (body only) → (2) `src/pages/foo.meta.json`
with `page_scripts` pointing at `/assets/js/i18n/foo.js` → (3) write that dict
(`_title`, `_desc`, body keys) → (4) footer link in `src/partials/footer.html`
+ `shared.footer.*` key in `shared.js` if discoverable → (5) add to
`public/sitemap.xml` → (6) build, LF-normalise, run validator, commit.

**Add a translation:** edit the page's `public/assets/js/i18n/<page>.js`; match
innerHTML exactly; run the validator until `missing 0`.

**Add a demo model/preset:** `public/assets/js/demo.js` — `MODELS` map
(`id`,`name`,`sigmoid`) and `SAMPLES` array (bilingual `query`/`docs`). Models
load from the Hugging Face CDN, transformers.js from jsDelivr; keep models small
enough for a browser (Apache-2.0, ONNX q8, ≤ ~30 MB).

**Change the app icon (PWA / iOS home screen):** edit the master
`public/assets/img/icon-master.svg` (full-bleed square — iOS/Android apply their
own corner mask, so do NOT pre-round it), then `npm install && npm run icons` to
regenerate `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png` via
`scripts/render-icons.mjs` (`@resvg/resvg-js`, a dev dependency). Update
`favicon.svg` (rounded, served as-is to browsers) to match by hand. The
"Add to Home Screen" wiring lives in `src/partials/head-open.html`
(`apple-mobile-web-app-*` meta + `apple-touch-icon`) and `public/site.webmanifest`
(`display: standalone`, icons incl. `maskable`); rebuild after editing the partial.

## Conventions

- Commit messages: imperative summary + short body. This project tags commits
  with `Co-Authored-By:` and a `Claude-Session:` trailer.
- British spelling in copy (`licence`, `organisation`); `en_GB` locale.
- No vendor logos; product names are nominative references (see `/terms.html`).
  Keep the trademark/disclaimer language intact when editing model/legal pages.

## Current state (2026-06-24)

20 generated pages: home, demo, guides (index + 7), models (index + 5),
changelog, privacy, terms, 404. Every page has a translation dict wired; shared
chrome + the bulk of body prose translate (residual gaps above). Legal:
`/terms.html` + privacy page; vendor pricing notes link to official pricing.
Demo: 3 in-browser models, 5 presets, WebGPU toggle, dual-model compare, token
stats, animated score bars, share links, CSV/JSON/Markdown export.

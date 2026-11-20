# ZeroEntropy is gone: what the daily check was seeing, and what changed on the site — 2026-11-20

## Symptom

The daily real-network `sources` job had been reporting `zerank-2.api_usd_per_m` as an unreachable source, and four links on the site pointed at `docs.zeroentropy.dev`. Both were treated as a transient host problem by `check-sources.mjs` (a fetch that throws is reported as a warning, not a failure) and by `check-external-links.mjs` (network errors are transient for three days), which is why the same "small anomaly" kept coming back instead of clearing.

## What is actually wrong: the vendor shut down

- ZeroEntropy was acquired by Notion on **24 July 2026**. Its own announcement says every model was relicensed to **Apache 2.0** at the same time, and that all products would be supported until **4 September 2026** and then sunset, with new signups closed immediately. Live page (gone): `https://zeroentropy.dev/articles/zeroentropy-is-joining-notion/`. Archive used: `https://web.archive.org/web/20260727091207/https://zeroentropy.dev/articles/zeroentropy-is-joining-notion/`. Acquirer's post: `https://www.notion.com/blog/zeroentropy-is-joining-notion`.
- The hosted API, the docs and the dashboard are therefore no longer a service. `zerank-2` on Hugging Face is unaffected: `https://huggingface.co/zeroentropy/zerank-2-reranker` returns 200, card says Apache 2.0, 4B, 32,768 tokens, 52,078 downloads last month at the time of checking.

## DNS measurements (2026-11-20T00:07:49Z)

Not NXDOMAIN and not a transient resolver problem: the `.dev` parent still delegates `zeroentropy.dev`, and the delegated name servers refuse to answer. Both public DoH resolvers agree.

```
$ curl -s -H 'accept: application/dns-json' "https://cloudflare-dns.com/dns-query?name=zeroentropy.dev&type=A"
{"Status":2,...,"Comment":["EDE(22): No Reachable Authority at delegation zeroentropy.dev.",
 "EDE(23): Network Error 216.239.36.109:53 returned REFUSED for zeroentropy.dev A"]}

$ curl -s -H 'accept: application/dns-json' "https://dns.google/resolve?name=zeroentropy.dev&type=A"
{"Status":2,...,"Comment":"Name servers refused query (lame delegation?) [216.239.34.109, 216.239.36.109,
 216.239.32.109, 216.239.38.109]."}
```

`docs.zeroentropy.dev`, `www.zeroentropy.dev` and `api.zeroentropy.dev` return the same SERVFAIL. `curl` to `https://zeroentropy.dev/`, `https://www.zeroentropy.dev/pricing` and `https://docs.zeroentropy.dev/models` exits 000 (no connection); the Hugging Face card resolves and returns 200 in the same run.

## Changes

- **`data/models.json` → `zerank-2.api_usd_per_m`**: `check: "manual"` with a `check_note` that says the figure is the **last listed** price, not a current one, and that the archived docs page is the reference. `source_url` now points at the Wayback copy of `docs.zeroentropy.dev/models` (2026-07-12), the page the $0.025 per 1M tokens came from. The value is unchanged — the site does not rewrite a vendor's last published price, it labels it.
- **`data/release-watch.json`**: the `ZeroEntropy models` and `ZeroEntropy pricing` pages are removed. There is no host to fetch, so the daily watch would warn about them forever. New models published by the `zeroentropy` account are still covered by `hf_authors`, which is where a zerank-3 would appear first anyway.
- **`src/pages/models/zerank.html`** (and `zerank.meta.json`): the page now describes the model as Apache 2.0 weights. The licence section states what the vendor announced instead of warning about a contradiction that no longer exists; the "Hosted API" section becomes "The API, and what replaced it", records the shutdown and the last listed price, and drops the SDK snippet that had nothing left to call. Dead `docs.zeroentropy.dev` links are gone. The "when to pick" and pros/cons lists follow.
- **`src/pages/models/index.html`**: the zerank-2 row loses `api` from `data-type`, its pricing cell is `Free (self-host)`, and the description says the API closed on 4 September 2026.
- **`src/pages/index.html`**: the home card reads "Apache 2.0 weights on Hugging Face. Its hosted API closed in September 2026", with `Open weights` / `API closed` pills.
- **`src/pages/guides/compare-rerankers.html`**: the hosted-API table keeps the row marked "last listed" and the note says the row is to read, not to buy.
- **`src/pages/rerank-cost-calculator.html`** and `public/assets/js/cost-calculator.js`: the option is labelled `ZeroEntropy zerank-2 (API closed)`, keeps the last listed price so the comparison is not silently rewritten, and the explanation points at the weights for self-hosting. `tests/cost-calculator.spec.js` expects the new label.
- **`src/pages/news.html` + `news.rss`**: the retirement is a vendor action, so `/news` gets an entry dated 4 September 2026, at the bottom of the page, sourced to the archived vendor announcement and Notion's post.
- **Bilingual dictionaries, changelog and RSS** updated in the same commit: `src/i18n/{zerank,models-index,home,compare-rerankers,rerank-cost-calculator,contextual-rerank,news,changelog}.js`, `src/pages/changelog.html`, `public/changelog.rss`.

## What was deliberately not done

- No model removed, no score changed, no invented replacement link.
- No claim about which third-party host sells zerank-2 today: Hugging Face's model page says no inference provider serves it, and a marketplace listing is not a support contract. The page sends readers to the still-selling hosted rerankers through the calculator instead.
- Draft PR #77 untouched.

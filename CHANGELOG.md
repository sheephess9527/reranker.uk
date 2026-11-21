# Changelog

Repository and tooling changes. Site-facing data updates live on the public
changelog page (src/pages/changelog.html).

## 2026-11-21

- The Jina model page links its BEIR comparison to the original experiment and describes the candidate pool. Removed broad equivalence claims from the home, comparison and cost pages in both languages.

## 2026-11-20

- The cost calculator's "Compare rerank models" card no longer quotes a model
  count. It read "across 16 models" while the table has carried 38 rows since
  (five of them hosted platforms); the line now names no number, so adding a
  model cannot make it stale again.

- `data/release-watch.json`: the Pinecone changelog entry watches the undated
  `https://docs.pinecone.io/release-notes`, which 308-redirects to the current
  year's page (`/release-notes/2026` when checked on 2026-11-20), instead of
  `/release-notes/2026`, which needed a hand edit every January. The new
  `current_year` flag makes `scripts/watch-releases.mjs` warn when that
  address lands on a year other than this one, so a redirect that stops
  following the calendar is reported rather than silently watching old notes.

## 2026-11-16

- Recorded the scheduled source/candidate patrol and added sourced Ettin 17M
  coverage to the bilingual model table and self-hosting guide. The May release
  is labelled as a catch-up; no full BEIR score or new-release news was invented.

- Added bilingual quantized.uk LLM-memory handoff to the shared footer, with
  explicit reranker-memory scope and public referral labels. Source, public
  changelog, Chinese text, RSS and generated pages are kept together.

## 2026-11-13

### scripts/check-sources.mjs: transient fetch errors no longer fail the run

- **Why:** the daily real-network run 42471623555 (2026-11-08) failed only
  because github.com/mixedbread-ai/mxbai-rerank returned HTTP 504. An outage
  says nothing about whether a figure is still correct.
- **What changed:**
  - When `fetchPage` gives up it throws an `Error` with a `transient` flag:
    `true` for 429/5xx, `false` for other non-OK statuses (404 etc.).
  - Transient errors, and network errors with no flag (DNS, reset, refused),
    are logged as `⚠ … could not fetch …; skipped`, emitted as a
    `::warning title=check-sources::` annotation in GitHub Actions, and
    counted separately. They do **not** cause exit 1.
  - Non-transient fetch errors (e.g. 404) and "not found" misses still fail
    with exit 1, as before.
  - A one-line summary of skipped facts is printed at the end.
  - Default `RETRY_WAITS_MS` is now `5000,20000,60000` (third, longer retry).
- **Opt-out:** set `STRICT_FETCH=1` to treat transient errors as failures
  again (old behaviour).

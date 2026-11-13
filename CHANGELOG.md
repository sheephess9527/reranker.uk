# Changelog

Repository and tooling changes. Site-facing data updates live on the public
changelog page (src/pages/changelog.html).

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

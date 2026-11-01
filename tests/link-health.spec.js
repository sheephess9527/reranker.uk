// @ts-check
import { test, expect } from "@playwright/test";
import { judge } from "../scripts/check-external-links.mjs";

/**
 * The daily external-link check treats a host that is down (5xx, 429, no
 * answer) as a warning until it has stayed down for three days, so one bad
 * afternoon at a vendor's docs site doesn't block a merge. A 404 is still a
 * failure straight away. This pins those rules without touching the network.
 */
const now = new Date("2026-11-04T01:00:00Z");
const down = { ok: false, transient: true, why: "HTTP 502" };

test("a link that works passes and clears any record", () => {
  expect(judge({ ok: true }, "2026-11-02", now, 3)).toEqual({ verdict: "pass", since: null });
});

test("a 404 fails at once, with nothing to remember", () => {
  expect(judge({ ok: false, transient: false, why: "HTTP 404" }, undefined, now, 3)).toEqual({
    verdict: "fail",
    since: null,
  });
});

test("a host that just went down is a warning, dated today", () => {
  expect(judge(down, undefined, now, 3)).toEqual({ verdict: "warn", since: "2026-11-04" });
});

test("still down on the next days stays a warning and keeps the first date", () => {
  expect(judge(down, "2026-11-02", now, 3)).toEqual({ verdict: "warn", since: "2026-11-02" });
});

test("down for three days becomes a failure", () => {
  expect(judge(down, "2026-11-01", now, 3)).toEqual({ verdict: "fail", since: "2026-11-01" });
});

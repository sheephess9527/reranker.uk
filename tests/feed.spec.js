// @ts-check
import { test, expect } from "@playwright/test";

/**
 * public/changelog.rss is hand-edited alongside the changelog page, and one
 * of those edits (Oct 2026) dropped two <item> open tags: the feed stopped
 * being XML and nothing noticed. This parses it the way a reader would and
 * checks it still lines up with the page it summarises.
 */
test("changelog.rss is well-formed and matches the changelog page", async ({ page, request }) => {
  const xml = await (await request.get("/changelog.rss")).text();
  await page.goto("/changelog");

  const feed = await page.evaluate((src) => {
    const doc = new DOMParser().parseFromString(src, "application/xml");
    const error = doc.querySelector("parsererror");
    if (error) return { error: error.textContent };
    return {
      items: [...doc.querySelectorAll("channel > item")].map((item) => ({
        title: item.querySelector("title")?.textContent || "",
        link: item.querySelector("link")?.textContent || "",
        guid: item.querySelector("guid")?.textContent || "",
        pubDate: item.querySelector("pubDate")?.textContent || "",
      })),
    };
  }, xml);
  expect(feed.error, "changelog.rss is not well-formed XML").toBeUndefined();

  const items = feed.items || [];
  expect(items.length).toBeGreaterThan(0);
  const entryIds = await page.$$eval("main .changelog-entry h2[id]", (hs) => hs.map((h) => h.id));
  for (const item of items) {
    expect(item.title, `item ${item.guid} has no title`).not.toBe("");
    expect(Number.isNaN(Date.parse(item.pubDate)), `item ${item.guid} pubDate`).toBe(false);
    expect(item.link).toBe(item.guid);
    const anchor = new URL(item.guid).hash.slice(1);
    expect(entryIds, `feed item ${item.guid} has no entry on the page`).toContain(anchor);
  }
  // The newest entry on the page is the newest item in the feed.
  expect(new URL(items[0].guid).hash.slice(1)).toBe(entryIds[0]);
});

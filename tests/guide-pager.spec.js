// @ts-check
import { test, expect } from "@playwright/test";

/**
 * The five reading-path guides link to their neighbours in the order /guides/
 * lists them (readingPathPager in scripts/build.mjs builds the links from
 * that list). This walks the path both ways, in English and Chinese.
 */
for (const zh of [false, true]) {
  const pre = zh ? "/zh" : "";
  test(`the reading path links each guide to its neighbours${zh ? " (zh)" : ""}`, async ({ page }) => {
    await page.goto(`${pre}/guides/`);
    const order = await page.locator("ol.reading-path a.card").evaluateAll((as) => as.map((a) => a.getAttribute("href")));
    expect(order).toHaveLength(5);
    for (const [i, href] of order.entries()) {
      await page.goto(href);
      const pager = page.locator("nav.guide-pager");
      await expect(pager).toHaveCount(1);
      await expect(pager.locator(".guide-pager-step")).toContainText(String(i + 1));
      const prev = pager.locator('a[rel="prev"]');
      if (i === 0) await expect(prev).toHaveCount(0);
      else await expect(prev).toHaveAttribute("href", order[i - 1]);
      await expect(pager.locator('a[rel="next"]')).toHaveAttribute("href", i < order.length - 1 ? order[i + 1] : `${pre}/guides/`);
      // The link names the next page by its own heading.
      if (i < order.length - 1) {
        const title = await pager.locator('a[rel="next"] .guide-pager-title').textContent();
        await page.goto(order[i + 1]);
        await expect(page.locator("main h1")).toHaveText(title || "");
      }
    }
  });
}

test("guides outside the reading path have no pager", async ({ page }) => {
  await page.goto("/guides/rerank-in-china");
  await expect(page.locator("nav.guide-pager")).toHaveCount(0);
});

// @ts-check
import { test, expect } from "@playwright/test";
import { allPagePaths } from "./helpers/axeAudit.mjs";

/**
 * At phone width every page keeps a side gutter and doesn't scroll
 * sideways. `.section`, `.hero` and `.article` once set `padding: X 0`
 * after `.container`, which zeroed its 20px gutter on 26 pages: text ran
 * into the edge of the screen and no other check noticed.
 */
test.use({ viewport: { width: 390, height: 844 } });

for (const path of allPagePaths()) {
  test(`gutter and no sideways scroll on ${path}`, async ({ page }) => {
    await page.goto(path);
    const { minLeft, maxRight, overflow } = await page.evaluate(() => {
      const boxes = [...document.querySelectorAll("main h1, main h2, main p")]
        .filter((e) => !e.closest(".table-wrap, pre"))
        .map((e) => e.getBoundingClientRect())
        .filter((r) => r.width > 0);
      return {
        minLeft: Math.min(...boxes.map((r) => r.left)),
        maxRight: Math.max(...boxes.map((r) => r.right)),
        overflow: document.documentElement.scrollWidth > window.innerWidth,
      };
    });
    expect(overflow, "page scrolls sideways").toBe(false);
    expect(minLeft, "text touches the left edge").toBeGreaterThanOrEqual(16);
    expect(maxRight, "text touches the right edge").toBeLessThanOrEqual(390 - 16);
  });
}

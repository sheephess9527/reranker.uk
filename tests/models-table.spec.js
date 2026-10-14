// @ts-check
import { test, expect } from "@playwright/test";

/**
 * On a phone the models table scrolls sideways. The model name (first
 * column) and the column headings must stay in view, or a score can't be
 * matched to its row. Desktop keeps the plain table.
 */
for (const path of ["/models/", "/zh/models/"]) {
  test(`model names and headings stay put when scrolling ${path} on a phone`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(path);
    const wrap = page.locator(".table-sticky");
    await wrap.scrollIntoViewIfNeeded();
    await wrap.evaluate((w) => { w.scrollLeft = 600; w.scrollTop = 500; });
    const pos = await wrap.evaluate((w) => {
      const box = w.getBoundingClientRect();
      const name = w.querySelector("tbody tr:nth-child(6) th").getBoundingClientRect();
      const head = w.querySelector("thead th").getBoundingClientRect();
      return { nameLeft: name.left - box.left, nameWidth: name.width, headTop: head.top - box.top };
    });
    expect(pos.nameLeft).toBeLessThan(3);
    expect(pos.headTop).toBeLessThan(3);
    // Leaves at least half the screen for the columns being scrolled.
    expect(pos.nameWidth).toBeLessThan(195);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test("the desktop table is unchanged", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/models/");
  const style = await page.locator("#models-table thead th").first().evaluate((th) => getComputedStyle(th).position);
  expect(style).toBe("static");
});

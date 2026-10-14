// @ts-check
import { test, expect } from "@playwright/test";

/**
 * The site search (public/assets/js/main.js over public/search-index.json):
 * keyboard only, each locale searching its own pages.
 */
test("“/” opens search, results are keyboard-reachable, Esc closes", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("/");
  const input = page.locator("#site-search-input");
  await expect(input).toBeFocused();
  await input.fill("Cohere");
  const first = page.locator("#site-search-results a").first();
  await expect(first).toHaveAttribute("href", "/models/cohere-rerank");
  await page.keyboard.press("ArrowDown");
  await expect(first).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator("#site-search")).toBeHidden();
  await expect(page.locator("#search-toggle")).toBeFocused();
});

test("the Chinese site searches Chinese pages only", async ({ page }) => {
  await page.goto("/zh/");
  await page.keyboard.press("/");
  await page.locator("#site-search-input").fill("百炼");
  const hrefs = await page.locator("#site-search-results a").evaluateAll((as) => as.map((a) => a.getAttribute("href")));
  expect(hrefs).toContain("/zh/guides/rerank-in-china");
  expect(hrefs.every((h) => h.startsWith("/zh/"))).toBe(true);
  await expect(page.locator("#site-search-status")).toContainText("找到");
});

test("typing “/” inside a field doesn’t open search", async ({ page }) => {
  await page.goto("/rerank-cost-calculator");
  await page.locator("#calc-queries").focus();
  await page.keyboard.press("/");
  await expect(page.locator("#site-search")).toBeHidden();
});

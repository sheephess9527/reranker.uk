// @ts-check
import { test, expect } from "@playwright/test";

/**
 * The changelog shows its newest entries and folds older ones into one
 * <details> per month (foldChangelog in scripts/build.mjs). A link to a
 * folded entry — every RSS item links to /changelog#<id> — must still land on
 * it, which main.js does by opening that month.
 */
test("the newest ten entries are open and older months are folded", async ({ page }) => {
  await page.goto("/changelog");
  const entries = page.locator("main article.changelog-entry");
  await expect(entries.nth(9)).toBeVisible();
  await expect(entries.nth(10)).toBeHidden();
  const months = page.locator("main details.changelog-month");
  expect(await months.count()).toBeGreaterThan(0);
  await months.first().locator("summary").click();
  await expect(entries.nth(10)).toBeVisible();
});

test("a link to a folded entry opens its month", async ({ page }) => {
  await page.goto("/changelog");
  const id = await page.locator("main details.changelog-month").last().locator("h2[id]").first().getAttribute("id");
  await page.goto(`/changelog#${id}`);
  await expect(page.locator(`[id="${id}"]`)).toBeVisible();
  await expect(page.locator(`[id="${id}"]`)).toBeInViewport();

  // Following an in-page link after load (hashchange) works too.
  await page.goto("/changelog");
  await page.evaluate((h) => { location.hash = h; }, id);
  await expect(page.locator(`[id="${id}"]`)).toBeVisible();
});

test("the Chinese changelog labels its months in Chinese", async ({ page }) => {
  await page.goto("/zh/changelog");
  await expect(page.locator("main details.changelog-month summary").first()).toContainText("年");
});

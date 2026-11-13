// @ts-check
import { test, expect } from "@playwright/test";

test("code blocks get a Copy button that copies the code", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/guides/self-host-reranker");
  const blocks = await page.locator("main pre").count();
  expect(blocks).toBeGreaterThan(0);
  await expect(page.locator("main .code-wrap > .code-copy")).toHaveCount(blocks);

  const btn = page.locator("main .code-copy").first();
  await btn.click();
  await expect(btn).toHaveText("Copied");
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  const code = await page.locator("main pre").first().textContent();
  expect(copied).toBe((code || "").replace(/\n$/, ""));
  expect(copied).toContain("CrossEncoder");
});

test("the button is labelled in Chinese on Chinese pages", async ({ page }) => {
  await page.goto("/zh/guides/self-host-reranker");
  await expect(page.locator("main .code-copy").first()).toHaveText("复制");
});

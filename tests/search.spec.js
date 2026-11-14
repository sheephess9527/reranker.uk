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

for (const locale of ["en", "zh"]) {
  for (const failure of ["http", "json", "shape"]) {
    test(`${locale} search recovers from ${failure} errors without a reload`, async ({ page }) => {
      let requests = 0;
      await page.route("**/search-index.json", async (route) => {
        requests++;
        if (requests === 1) {
          await route.fulfill({
            status: failure === "http" ? 503 : 200,
            contentType: "application/json",
            body: failure === "json" ? "invalid json" : "{}",
          });
        } else await route.continue();
      });
      await page.goto(locale === "zh" ? "/zh/" : "/");
      await page.locator("#search-toggle").click();
      await expect(page.locator("#site-search-status")).toContainText(locale === "zh" ? "暂时无法加载" : "could not load");
      await page.locator("#site-search-input").fill("Cohere");
      await expect(page.locator("#site-search-results a").first()).toHaveAttribute("href", `${locale === "zh" ? "/zh" : ""}/models/cohere-rerank`);
      await page.locator("#site-search-input").fill("Voyage");
      await expect(page.locator("#site-search-results a").first()).toHaveAttribute("href", `${locale === "zh" ? "/zh" : ""}/models/voyage-rerank`);
      expect(requests).toBe(2);
    });
  }
}

test("search announces loading and coalesces requests while typing", async ({ page }) => {
  let requests = 0;
  let release;
  const pending = new Promise((resolve) => { release = resolve; });
  await page.route("**/search-index.json", async (route) => {
    requests++;
    await pending;
    await route.continue();
  });
  await page.goto("/");
  await page.locator("#search-toggle").click();
  await expect(page.locator("#site-search-status")).toHaveText("Loading search…");
  await page.locator("#site-search-input").fill("Cohere");
  await page.locator("#site-search-input").fill("Voyage");
  await expect(page.locator("#site-search-results")).toHaveAttribute("aria-busy", "true");
  release();
  await expect(page.locator("#site-search-results a").first()).toHaveAttribute("href", "/models/voyage-rerank");
  await expect(page.locator("#site-search-results")).toHaveAttribute("aria-busy", "false");
  expect(requests).toBe(1);
});

test("reopening search retries after a network failure", async ({ page }) => {
  let requests = 0;
  await page.route("**/search-index.json", async (route) => {
    if (++requests === 1) await route.abort();
    else await route.continue();
  });
  await page.goto("/");
  await page.locator("#search-toggle").click();
  await expect(page.locator("#site-search-status")).toContainText("could not load");
  await page.keyboard.press("Escape");
  await page.locator("#search-toggle").click();
  await page.locator("#site-search-input").fill("Cohere");
  await expect(page.locator("#site-search-results a").first()).toHaveAttribute("href", "/models/cohere-rerank");
  expect(requests).toBe(2);
});

for (const locale of ["en", "zh"]) {
  test(`${locale} mobile menu closes with Escape, outside click, focus exit and search`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(locale === "zh" ? "/zh/" : "/");
    const toggle = page.locator(".nav-toggle");
    await expect(toggle).toHaveAttribute("aria-controls", "primary-navigation");
    await toggle.click();
    await page.locator(".nav-links a").first().focus();
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await page.locator("main h1").click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await page.locator("#theme-toggle").focus();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await page.keyboard.press("/");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("#site-search-input")).toBeFocused();
  });
}

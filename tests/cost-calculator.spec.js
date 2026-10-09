// @ts-check
import { test, expect } from "@playwright/test";

/**
 * The cost calculator reads every price from data-* attributes rendered from
 * data/models.json. A missing or renamed attribute silently drops a vendor
 * (the script filters out NaN prices), so this checks each one is there and
 * that the billing rules move the numbers the way the vendors describe.
 */
const rows = (page, id) =>
  page.$$eval(`#${id} tr`, (trs) => trs.map((tr) => [...tr.cells].map((c) => c.innerText.trim())));

test("every vendor is priced, in the right table", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/rerank-cost-calculator");
  const usd = await rows(page, "calc-rows");
  const cny = await rows(page, "calc-rows-cny");
  expect(usd.map((r) => r[0].replace(/\s*cheapest$/, "")).sort()).toEqual(
    [
      "Alibaba Cloud qwen3-rerank (international)",
      "Cohere Rerank 4 Fast",
      "Cohere Rerank 4 Pro",
      "Google Vertex AI ranking",
      "Voyage rerank-3",
      "Voyage rerank-3-lite",
    ].sort()
  );
  expect(cny).toHaveLength(3);
  for (const r of usd) expect(r[3]).toMatch(/^\$[\d,.]+$/);
  for (const r of cny) expect(r[3]).toMatch(/^¥[\d,.]+$/);
  await expect(page.locator("#calc-note-cny")).toContainText("Cheapest paid option");
  expect(errors).toEqual([]);
});

test("Google counts one query per started 100 documents", async ({ page }) => {
  await page.goto("/rerank-cost-calculator");
  await page.fill("#calc-queries", "1000");
  await page.fill("#calc-topk", "100");
  const at100 = (await rows(page, "calc-rows")).find((r) => r[0].startsWith("Google"));
  expect(at100[2]).toBe("1,000 queries");
  expect(at100[3]).toBe("$1.00");
  await page.fill("#calc-topk", "101");
  const at101 = (await rows(page, "calc-rows")).find((r) => r[0].startsWith("Google"));
  expect(at101[2]).toBe("2,000 queries");
  expect(at101[3]).toBe("$2.00");
});

test("long passages warn about qwen3-rerank's 4,000-token limit", async ({ page }) => {
  await page.goto("/rerank-cost-calculator");
  await expect(page.locator("#calc-note-cny")).not.toContainText("4,000");
  await page.fill("#calc-passage", "4500");
  await expect(page.locator("#calc-note-cny")).toContainText("4,000");
});

test("the Chinese page names the options in Chinese", async ({ page }) => {
  await page.goto("/zh/rerank-cost-calculator");
  const cny = await rows(page, "calc-rows-cny");
  expect(cny.some((r) => r[0].includes("阿里云百炼"))).toBe(true);
  await expect(page.locator("#calc-note-cny")).toContainText("付费方案中最便宜的是");
});

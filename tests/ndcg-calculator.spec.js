// @ts-check
import { test, expect } from "@playwright/test";

const cell = (page, row, col) => page.locator(`#ndcg-rows tr:nth-child(${row}) td:nth-child(${col})`);

test("NDCG, MRR and Hit@1 match hand-worked values", async ({ page }) => {
  await page.goto("/ndcg-calculator");
  await page.fill("#ndcg-k", "5");
  // One query: the single relevant document moves from rank 2 to rank 1.
  await page.fill("#ndcg-before", "0 1 0 0 0");
  await page.fill("#ndcg-after", "1 0 0 0 0");
  // NDCG before = 1 / log2(3) = 0.631; MRR before = 0.5.
  await expect(cell(page, 1, 2)).toHaveText("0.631");
  await expect(cell(page, 1, 3)).toHaveText("1.000");
  await expect(cell(page, 2, 2)).toHaveText("0.500");
  await expect(cell(page, 2, 3)).toHaveText("1.000");
  await expect(cell(page, 3, 2)).toHaveText("0.000");
  await expect(cell(page, 3, 3)).toHaveText("1.000");
  await expect(cell(page, 1, 4)).toHaveText("+0.369");

  // Graded labels. Ideal order is 2, 1, 0: DCG 2 + 1/log2(3) = 2.631.
  // Order 1, 2, 0 scores 1 + 2/log2(3) = 2.262, so NDCG = 0.860.
  await page.fill("#ndcg-before", "1 2 0");
  await page.fill("#ndcg-after", "2 1 0");
  await expect(cell(page, 1, 2)).toHaveText("0.860");
  await expect(cell(page, 1, 3)).toHaveText("1.000");
});

test("queries with nothing relevant are left out, and mismatches are explained", async ({ page }) => {
  await page.goto("/ndcg-calculator");
  await page.fill("#ndcg-before", "0 0 0\n0 1 0");
  await page.fill("#ndcg-after", "0 0 0\n1 0 0");
  await expect(page.locator("#ndcg-status")).toContainText("1 queries scored");
  await expect(page.locator("#ndcg-status")).toContainText("1 left out");

  await page.fill("#ndcg-after", "1 0 0");
  await expect(page.locator("#ndcg-status")).toContainText("same number of queries");
  await page.fill("#ndcg-after", "0 0 0\n1 1 0");
  await expect(page.locator("#ndcg-status")).toContainText("same labels");
  await page.fill("#ndcg-before", "0 x 0");
  await expect(page.locator("#ndcg-status")).toContainText("Line 1");
});

test("the Chinese page computes the same numbers and says so in Chinese", async ({ page }) => {
  await page.goto("/zh/ndcg-calculator");
  await page.fill("#ndcg-before", "0 1 0 0 0");
  await page.fill("#ndcg-after", "1 0 0 0 0");
  await expect(cell(page, 1, 2)).toHaveText("0.631");
  await expect(page.locator("#ndcg-status")).toContainText("已计算 1 条查询");
});

/** Shared interaction steps for the demo page, used by both the mocked
 * (PR-time) and real-network (daily) smoke tests, so they exercise
 * identical UI steps and only differ in whether the network is faked. */
export async function runRerank(page, { query, docs }, { timeout } = {}) {
  await page.goto("/demo");
  await page.fill("#query-input", query);
  await page.fill("#docs-input", docs.join("\n"));
  await page.click("#run-btn");
  await page.waitForSelector("#results-region:not([hidden])", { timeout: timeout || 15000 });
  await page.waitForSelector("#results-after .result-item", { timeout: timeout || 15000 });
}

export async function afterColumnTexts(page) {
  return page.$$eval("#results-after .result-item .result-text", (els) => els.map((e) => e.textContent));
}

export async function beforeColumnTexts(page) {
  return page.$$eval("#results-before .result-item .result-text", (els) => els.map((e) => e.textContent));
}

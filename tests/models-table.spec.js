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

/** data-name of every row the filters leave visible, in table order. */
const visible = (page) =>
  page.$$eval("#models-table tbody tr", (trs) =>
    trs.filter((tr) => !tr.hidden).map((tr) => tr.dataset.name || "")
  );

/**
 * Two filters beyond type and architecture: what the model ranks (text, or
 * text plus page images / screenshots / video) and what its open-weights
 * licence allows. Both are attribute-based, so a row that gains an image
 * input or is relicensed needs the attribute in src/pages/models/index.html.
 */
for (const [path, lang] of [["/models/", "en"], ["/zh/models/", "zh"]]) {
  test(`input and licence filters narrow the table (${lang})`, async ({ page }) => {
    await page.goto(path);

    // All rows to start with.
    const total = (await visible(page)).length;
    expect(total).toBeGreaterThan(30);

    // Text + images: the five rows that also take page images or video.
    await page.selectOption("#models-input-filter", "multimodal");
    const multimodal = await visible(page);
    expect(multimodal.sort()).toEqual(
      [
        "alibaba-model-studio",
        "lighton-rerank",
        "llama-nemotron-rerank-vl-1b-v2",
        "nemotron-3.5-rerank-8b",
        "qwen3-vl-reranker",
      ].sort()
    );

    // Text only is the complement, and still counts every hosted API.
    await page.selectOption("#models-input-filter", "text");
    const text = await visible(page);
    expect(text).not.toContain("qwen3-vl-reranker");
    expect(text).toContain("bge-reranker-v2-m3");
    expect(text.length).toBe(total - multimodal.length);

    await page.selectOption("#models-input-filter", "all");

    // Non-commercial weights: Jina v3 / v3.5 and Contextual's open weights.
    await page.selectOption("#models-license-filter", "noncommercial");
    expect((await visible(page)).sort()).toEqual(
      ["contextual-rerank-v2", "jina-reranker-v3", "jina-reranker-v3.5"].sort()
    );

    // Commercial use: open weights only — a hosted-only row has no weights
    // licence to answer for, so it drops out of this filter.
    await page.selectOption("#models-license-filter", "commercial");
    const commercial = await visible(page);
    expect(commercial).toContain("bge-reranker-v2-m3");
    expect(commercial).toContain("bce-reranker-base_v1");
    expect(commercial).not.toContain("jina-reranker-v3.5");
    expect(commercial).not.toContain("cohere-rerank-5-pro");

    // The two filters combine rather than override each other.
    await page.selectOption("#models-input-filter", "multimodal");
    expect((await visible(page)).sort()).toEqual(
      ["lighton-rerank", "llama-nemotron-rerank-vl-1b-v2", "nemotron-3.5-rerank-8b", "qwen3-vl-reranker"].sort()
    );
  });
}

test("a model that reranks pointwise or listwise answers both architecture filters", async ({ page }) => {
  await page.goto("/models/");
  await page.selectOption("#models-arch-filter", "listwise");
  expect(await visible(page)).toContain("lighton-rerank");
  await page.selectOption("#models-arch-filter", "cross-encoder");
  expect(await visible(page)).toContain("lighton-rerank");
});

test("the new filters are translated on the Chinese page", async ({ page }) => {
  await page.goto("/zh/models/");
  await page.selectOption("#models-input-filter", "multimodal");
  const options = await page.$$eval("#models-input-filter option, #models-license-filter option", (els) =>
    els.map((el) => el.textContent)
  );
  expect(options).toContain("文本 + 图片");
  expect(options).toContain("仅限非商用");
  await expect(page.locator("#models-count")).toContainText("显示");
});

test("the toolbar still fits a 390px phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/models/");
  const box = await page.locator(".models-toolbar").evaluate((t) => {
    const r = t.getBoundingClientRect();
    return { width: r.width, scroll: t.scrollWidth };
  });
  expect(box.scroll).toBeLessThanOrEqual(box.width + 1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

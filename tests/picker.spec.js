// @ts-check
import { test, expect } from "@playwright/test";

const visible = (page) => page.$$eval(".picker-result:not([hidden]) h3", (hs) => hs.map((h) => h.textContent));

test("the picker narrows suggestions to the answers", async ({ page }) => {
  await page.goto("/reranker-picker");
  // Defaults: text, hosted API, English, no instructions.
  let shown = await visible(page);
  expect(shown).toHaveLength(1);
  expect(shown[0]).toContain("Cohere Rerank 5");

  await page.check("#p-instr-yes");
  shown = await visible(page);
  expect(shown).toHaveLength(1);
  expect(shown[0]).toContain("Contextual AI");

  await page.check("#p-content-images");
  await page.check("#p-run-gpu");
  shown = await visible(page);
  expect(shown).toHaveLength(1);
  expect(shown[0]).toContain("Qwen3-VL-Reranker");

  await page.check("#p-content-code");
  await page.check("#p-run-cpu");
  await page.check("#p-lang-multi");
  shown = await visible(page);
  expect(shown.join("|")).toContain("bge-reranker-v2-m3");
  expect(shown.join("|")).toContain("fix retrieval first");
});

test("every combination of answers shows at least one suggestion, in Chinese too", async ({ page }) => {
  await page.goto("/zh/reranker-picker");
  for (const c of ["text", "code", "images"]) for (const r of ["api", "gpu", "cpu", "china"])
    for (const l of ["en", "multi"]) for (const i of ["no", "yes"]) {
      await page.check(`#p-content-${c}`);
      await page.check(`#p-run-${r}`);
      await page.check(`#p-lang-${l}`);
      await page.check(`#p-instr-${i}`);
      expect((await visible(page)).length, `${c}/${r}/${l}/${i}`).toBeGreaterThan(0);
    }
  expect((await visible(page)).join("")).toMatch(/[\u4e00-\u9fff]/);
});

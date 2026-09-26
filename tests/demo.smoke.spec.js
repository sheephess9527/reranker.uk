// @ts-check
import { test, expect } from "@playwright/test";
import { mockTransformersOnPage } from "./helpers/mockTransformers.mjs";
import { runRerank, afterColumnTexts, beforeColumnTexts } from "./helpers/demoActions.mjs";

/**
 * Mocked smoke test: no real network reaches jsDelivr, HuggingFace, or
 * hf-mirror.com — a fake transformers.js module stands in. This runs on
 * every PR and only proves the demo's own wiring (load → score → render)
 * still works; it cannot catch a real break in any of those three external
 * dependencies. That's what tests/demo.smoke.real.spec.js is for.
 */
test("reranks candidates end-to-end and renders them in score order", async ({ page }) => {
  await mockTransformersOnPage(page);

  const docs = ["first candidate, lowest score", "second candidate, middle score", "third candidate, highest score"];
  await runRerank(page, { query: "does reranking work", docs });

  const before = await beforeColumnTexts(page);
  expect(before).toEqual(docs); // "before" column preserves input order

  const after = await afterColumnTexts(page);
  expect(after).toHaveLength(3);
  // The fake model scores the last-supplied document highest, so a correct
  // render puts it first after reranking — this is the assertion that would
  // fail if scoring or sorting silently broke.
  expect(after[0]).toBe(docs[2]);
  expect(after[2]).toBe(docs[0]);
});

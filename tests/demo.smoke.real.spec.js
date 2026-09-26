// @ts-check
import { test, expect } from "@playwright/test";
import { runRerank, afterColumnTexts } from "./helpers/demoActions.mjs";

/**
 * Real-network smoke test: no mocking. Actually downloads the smallest
 * demo model (jina-reranker v1 tiny, ~33 MB) from jsDelivr + HuggingFace/
 * hf-mirror.com and runs real inference via ONNX Runtime Web. This is the
 * test that would have caught a real break in any of those three external
 * dependencies — the exact "breaks silently, nobody notices" risk the
 * mocked test above cannot cover. Meant for a scheduled daily run with real
 * internet access, not for every PR: a real model download is slow and its
 * failure mode (a stalled or renamed CDN asset) is not something a PR
 * author's change usually caused.
 */
test.setTimeout(120_000);

test("real model loads and reranks candidates against live infrastructure", async ({ page }) => {
  const failures = [];
  page.on("pageerror", (err) => failures.push(String(err)));

  const docs = ["a completely unrelated sentence about weather", "a passage that closely answers the query"];
  await runRerank(page, { query: "how does reranking improve RAG retrieval", docs }, { timeout: 90_000 });

  const failVisible = await page.isVisible("#load-fail:not([hidden])").catch(() => false);
  expect(failVisible, `load-fail panel shown: ${failures.join("; ")}`).toBe(false);

  const after = await afterColumnTexts(page);
  expect(after).toHaveLength(docs.length);
  expect(failures).toEqual([]);
});

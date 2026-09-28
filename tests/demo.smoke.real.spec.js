// @ts-check
import { test, expect } from "@playwright/test";
import { runRerank, afterColumnTexts } from "./helpers/demoActions.mjs";
import { watchCspViolations, cspViolations } from "./helpers/csp.mjs";

/**
 * Real-network smoke test: no mocking. Downloads each demo model from
 * jsDelivr + HuggingFace/hf-mirror.com and runs real inference via ONNX
 * Runtime Web — the path that breaks when one of those three external
 * dependencies changes, which the mocked test cannot see. Meant for a
 * scheduled daily run with real internet access, not every PR: a real
 * model download is slow and its failure modes (a stalled or renamed CDN
 * asset) usually aren't something a PR caused.
 *
 * Covers every model in the demo's picker, not just the default: a
 * transformers.js upgrade can break one model's tokenizer or output head
 * while leaving the others working.
 */
test.setTimeout(120_000);

const DEMO_MODELS = [
  "jinaai/jina-reranker-v1-tiny-en",
  "mixedbread-ai/mxbai-rerank-xsmall-v1",
  "Xenova/ms-marco-MiniLM-L-6-v2",
];

const QUERY = "how does reranking improve RAG retrieval";
const RELEVANT =
  "Reranking re-scores retrieved passages with a cross-encoder so the most relevant ones reach the LLM, which improves RAG answer quality.";
const UNRELATED = "The weather in London is mild and rainy for much of the year.";

for (const model of DEMO_MODELS) {
  test(`${model} loads and ranks the relevant passage first`, async ({ page }) => {
    const failures = [];
    page.on("pageerror", (err) => failures.push(String(err)));
    await watchCspViolations(page);

    // A CSP violation on a redirected request reports the *pre-redirect* URL
    // (the spec hides cross-origin redirect targets), so the assertion alone
    // names the wrong host to allowlist. Record where each redirect actually
    // went so a failure says what to add.
    const redirects = [];
    page.on("response", (res) => {
      const location = res.headers()["location"];
      if (res.status() >= 300 && res.status() < 400 && location) {
        redirects.push(`${new URL(res.url()).host} → ${new URL(location, res.url()).host}`);
      }
    });

    // Unrelated passage first, so a model that returns the input order
    // unchanged (or constant scores) fails the ranking assertion below.
    const docs = [UNRELATED, RELEVANT];
    await runRerank(page, { query: QUERY, docs, model }, { timeout: 90_000 });

    const failVisible = await page.isVisible("#load-fail:not([hidden])").catch(() => false);
    expect(failVisible, `load-fail panel shown: ${failures.join("; ")}`).toBe(false);
    expect(failures).toEqual([]);

    // Loading and rendering isn't enough — a library upgrade that breaks
    // tokenization or the output head still renders two scored rows, just
    // in the wrong order. Any working reranker puts RELEVANT first here.
    const after = await afterColumnTexts(page);
    expect(after).toEqual([RELEVANT, UNRELATED]);

    const seen = [...new Set(redirects)].join(", ") || "none";
    console.log(`${model} redirects seen: ${seen}`);
    expect(await cspViolations(page), `redirects seen: ${seen}`).toEqual([]);
  });
}

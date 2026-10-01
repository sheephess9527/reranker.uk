#!/usr/bin/env node
/**
 * Measures how long the three browser-demo models take to score passages,
 * using the real demo page, real model downloads and ONNX Runtime Web (WASM).
 *
 *   npm run build && node scripts/measure-demo-latency.mjs
 *
 * Needs open internet (jsDelivr + HuggingFace) and a Playwright Chromium, so
 * it's run by hand or from a workflow_dispatch of the real-network workflow,
 * not in PR CI. The numbers the site quotes come from this script and say
 * which machine produced them — a phone or an old laptop will be slower.
 *
 * Reports, per model:
 *   cold   wall time of the first run in a fresh browser: download + session
 *          setup + scoring 10 passages
 *   MB     what the demo reports downloading on that first run
 *   10/30  median of the demo's own "Inference" figure (scoring only, model
 *          already loaded) over RUNS warm runs, for 10 and 30 passages
 */
import os from "node:os";
import { spawn } from "node:child_process";
import { chromium } from "@playwright/test";

const PORT = 4174;
const BASE = `http://localhost:${PORT}`;
const RUNS = 5;
const MODELS = [
  "jinaai/jina-reranker-v1-tiny-en",
  "mixedbread-ai/mxbai-rerank-xsmall-v1",
  "Xenova/ms-marco-MiniLM-L-6-v2",
];
const QUERY = "how does reranking improve retrieval for RAG";

// 30 distinct passages of about 60 words each — a typical RAG chunk size.
const TOPICS = [
  "cross-encoders", "vector search", "BM25", "chunking", "RAG prompts", "hybrid retrieval",
  "evaluation sets", "NDCG", "latency budgets", "GPU serving", "quantisation", "tokenisers",
  "multilingual search", "legal documents", "support tickets", "code search", "caching",
  "batching", "top-k selection", "late interaction", "listwise ranking", "instructions",
  "pricing", "self-hosting", "API limits", "browser inference", "WASM", "WebGPU",
  "distillation", "fine-tuning",
];
const passage = (t, i) =>
  `Passage ${i + 1} is about ${t}. Teams adding a reranking stage to retrieval usually ask how ${t} ` +
  `affects relevance, cost and latency. In practice the answer depends on the corpus, the length of each ` +
  `chunk, the number of candidates passed to the reranker and the quality of the first-stage retriever, ` +
  `so measuring on your own labelled queries beats relying on a published leaderboard figure.`;
const PASSAGES = TOPICS.map(passage);

const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
};

async function runOnce(page, n) {
  await page.fill("#docs-input", PASSAGES.slice(0, n).join("\n"));
  await page.fill("#query-input", QUERY);
  // Clear the previous result so we wait for this run's chip, not the last one.
  await page.evaluate(() => {
    const s = document.querySelector("#stat-row");
    if (s) s.innerHTML = "";
  });
  const t0 = Date.now();
  await page.click("#run-btn");
  const chip = page.locator("#stat-row .chip", { hasText: /Inference|推理/ });
  await chip.waitFor({ timeout: 180_000 });
  const wall = Date.now() - t0;
  const ms = Number((await chip.textContent()).match(/(\d+)\s*ms/)[1]);
  // Only the first (cold) run downloads; warm runs show "loaded from cache".
  const chips = await page.locator("#stat-row .chip").allTextContents();
  const dl = chips.find((t) => /downloaded|已下载/.test(t)) || "";
  const mb = Number((dl.match(/([\d.]+)\s*MB/) || [])[1]) || null;
  return { wall, ms, mb };
}

const server = spawn(process.execPath, ["scripts/serve.mjs"], { env: { ...process.env, PORT: String(PORT) }, stdio: "ignore" });
await new Promise((r) => setTimeout(r, 1500));

const cpu = os.cpus();
console.log(`machine: ${cpu.length} × ${cpu[0]?.model?.trim()} · ${Math.round(os.totalmem() / 2 ** 30)} GB · ${os.platform()} ${os.release()}`);

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
);
const results = [];
try {
  // ISOLATION=both runs every model twice on the same machine: once as
  // served, once with COOP/COEP stripped from the page response, so the
  // multi-threading gain is measured without a hardware difference in it.
  const modes = process.env.ISOLATION === "both" ? ["as-served", "stripped"] : ["as-served"];
  for (const mode of modes)
  for (const model of MODELS) {
    const ctx = await browser.newContext(); // fresh context: nothing cached
    if (mode === "stripped") {
      await ctx.route(/\/(zh\/)?demo(\?.*)?$/, async (route) => {
        const res = await route.fetch();
        const headers = { ...res.headers() };
        delete headers["cross-origin-opener-policy"];
        delete headers["cross-origin-embedder-policy"];
        await route.fulfill({ response: res, headers });
      });
    }
    const page = await ctx.newPage();
    await page.goto(`${BASE}/demo`);
    await page.selectOption("#model-select", model);
    const isolated = await page.evaluate(() => self.crossOriginIsolated);
    const cold = await runOnce(page, 10);
    const w10 = [], w30 = [];
    for (let i = 0; i < RUNS; i++) w10.push((await runOnce(page, 10)).ms);
    for (let i = 0; i < RUNS; i++) w30.push((await runOnce(page, 30)).ms);
    const row = { mode, model, isolated, coldMs: cold.wall, downloadMB: cold.mb, median10: median(w10), median30: median(w30), runs10: w10, runs30: w30 };
    results.push(row);
    console.log(JSON.stringify(row));
    await ctx.close();
  }
} finally {
  await browser.close();
  server.kill();
}

console.log("\nmode | model | isolated | download | cold (download + 10) | 10 passages | 30 passages");
for (const r of results) {
  console.log(`${r.mode} | ${r.model} | ${r.isolated} | ${r.downloadMB} MB | ${(r.coldMs / 1000).toFixed(1)} s | ${r.median10} ms | ${r.median30} ms`);
}

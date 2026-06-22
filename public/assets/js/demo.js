/* reranker.uk — in-browser cross-encoder reranking demo.
 *
 * Runs entirely client-side with transformers.js (ONNX Runtime Web).
 * No API key, no server, no data leaves the browser. A cross-encoder
 * scores each (query, candidate) pair for relevance, then we sort.
 */
import {
  AutoTokenizer,
  AutoModelForSequenceClassification,
  env,
} from "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.5.1";

// Cache models/tokenizers in the browser so a reload is instant.
env.allowLocalModels = false;
env.useBrowserCache = true;

const MODELS = {
  "Xenova/ms-marco-MiniLM-L-6-v2": {
    name: "ms-marco MiniLM-L6",
    sizeMB: 90,
    noteEn: "sturdy default",
    noteZh: "稳健默认",
    sigmoid: true,
  },
  "jinaai/jina-reranker-v1-tiny-en": {
    name: "jina-reranker v1 tiny",
    sizeMB: 33,
    noteEn: "fastest",
    noteZh: "最快",
    sigmoid: true,
  },
  "mixedbread-ai/mxbai-rerank-xsmall-v1": {
    name: "mxbai-rerank xsmall",
    sizeMB: 70,
    noteEn: "strong quality",
    noteZh: "质量强",
    sigmoid: true,
  },
};

// One reranker instance per model id, loaded on demand.
const cache = new Map();

class Reranker {
  constructor(modelId) {
    this.modelId = modelId;
  }
  async init(onProgress) {
    const opts = {
      dtype: "q8", // quantized: smaller download, fine for a demo
      progress_callback: onProgress,
    };
    [this.tokenizer, this.model] = await Promise.all([
      AutoTokenizer.from_pretrained(this.modelId, opts),
      AutoModelForSequenceClassification.from_pretrained(this.modelId, opts),
    ]);
    return this;
  }
  async score(query, documents) {
    const inputs = this.tokenizer(new Array(documents.length).fill(query), {
      text_pair: documents,
      padding: true,
      truncation: true,
    });
    const { logits } = await this.model(inputs);
    const cfg = MODELS[this.modelId];
    const raw = (cfg && cfg.sigmoid ? logits.sigmoid() : logits).tolist();
    // logits shape is [batch, 1] for these single-label rerankers.
    return raw.map((row) => (Array.isArray(row) ? row[0] : row));
  }
}

async function getReranker(modelId, onProgress) {
  if (cache.has(modelId)) return cache.get(modelId);
  const r = await new Reranker(modelId).init(onProgress);
  cache.set(modelId, r);
  return r;
}

/* ---------------- i18n helpers ---------------- */

function isZh() {
  return (document.documentElement.lang || "").toLowerCase().indexOf("zh") === 0;
}
function L(en, zh) {
  return isZh() ? zh : en;
}

/* ---------------- Sample scenarios ----------------
 * Realistic query + a mix of relevant and distractor passages, at three
 * difficulty levels, so the reranker has something meaningful to do. */

const SAMPLES = [
  {
    id: "rag",
    labelEn: "RAG pipeline",
    labelZh: "RAG 流水线",
    difficultyEn: "medium",
    difficultyZh: "中等",
    en: {
      query: "How do I add a reranking step to my RAG pipeline?",
      docs: [
        "To wire a cross-encoder into RAG: retrieve 50–100 candidates with vector search, rerank them with a cross-encoder, then keep only the top 5 for the prompt.",
        "A reranker takes the query and each retrieved chunk together and outputs a precise relevance score, so you can reorder the top-k before sending them to the LLM.",
        "Bi-encoders embed the query and documents separately, which is fast for first-stage retrieval but weaker at fine-grained ranking.",
        "Cohere Rerank, Jina Reranker and bge-reranker are common hosted or open options for the reranking stage.",
        "Picking a chunk size of 200–400 tokens with some overlap usually retrieves better than indexing whole documents.",
        "London is the capital of the United Kingdom and one of the most populous cities in Europe.",
      ],
    },
    zh: {
      query: "我该如何在 RAG 流水线里加入重排序（rerank）这一步？",
      docs: [
        "把 cross-encoder 接入 RAG 的做法：先用向量检索召回 50–100 个候选，再用 cross-encoder 重排序，最后只保留前 5 条放进 prompt。",
        "reranker 会把查询和每个召回的片段一起送入模型，输出一个精确的相关性分数，从而在交给大模型之前对 top-k 重新排序。",
        "bi-encoder 会分别对查询和文档做嵌入，这在第一阶段检索时很快，但在细粒度排序上较弱。",
        "Cohere Rerank、Jina Reranker 和 bge-reranker 都是重排序阶段常见的托管或开源选项。",
        "把分块大小设为 200–400 个 token 并留一点重叠，通常比直接索引整篇文档检索效果更好。",
        "伦敦是英国的首都，也是欧洲人口最多的城市之一。",
      ],
    },
  },
  {
    id: "support",
    labelEn: "Customer support",
    labelZh: "客服工单",
    difficultyEn: "easy",
    difficultyZh: "简单",
    en: {
      query: "My order shipped a week ago but the tracking number still shows no movement.",
      docs: [
        "When tracking hasn't updated for 3+ business days, the parcel may not have been scanned yet; we can open a carrier investigation and reship if it's confirmed lost.",
        "Stuck tracking is most often a carrier scanning gap rather than a lost package — movement usually resumes within 48 hours.",
        "Most domestic orders arrive in 3–5 business days; international shipping can take 10–20 business days depending on customs.",
        "To request a refund, go to Orders → select the item → Request refund. Refunds reach the original payment method within 5–7 days.",
        "You can reset your account password from the login page using the 'Forgot password' link.",
        "Our gift cards never expire and can be applied at checkout in the promo code field.",
      ],
    },
    zh: {
      query: "我的订单一周前就发货了，但物流单号到现在都没有任何更新。",
      docs: [
        "如果物流连续 3 个工作日以上没有更新，可能是包裹还没有被扫描；我们可以向承运商发起查询，确认丢失后为你补发。",
        "物流卡住通常是承运商漏扫，而不是包裹丢失 —— 一般 48 小时内就会恢复更新。",
        "大多数境内订单在 3–5 个工作日送达；国际物流视清关情况可能需要 10–20 个工作日。",
        "申请退款：进入「订单」→ 选择商品 →「申请退款」。退款会在 5–7 天内退回原支付方式。",
        "你可以在登录页通过「忘记密码」链接重置账户密码。",
        "我们的礼品卡永不过期，可在结算时填入优惠码一栏使用。",
      ],
    },
  },
  {
    id: "legal",
    labelEn: "Legal clause",
    labelZh: "法律条款",
    difficultyEn: "hard",
    difficultyZh: "困难",
    en: {
      query: "Can either party end this agreement early without giving a reason?",
      docs: [
        "Termination for convenience: either party may terminate this Agreement for any reason upon thirty (30) days' prior written notice to the other party.",
        "Termination for cause: a party may terminate immediately if the other party materially breaches the Agreement and fails to cure within fifteen (15) days of written notice.",
        "The Agreement automatically renews for successive one-year terms unless either party gives notice of non-renewal at least sixty (60) days before the end of the then-current term.",
        "Upon termination, each party shall return or destroy the other party's Confidential Information within ten (10) days.",
        "Each party shall indemnify the other against third-party claims arising from its own negligence or wilful misconduct.",
        "This Agreement shall be governed by and construed in accordance with the laws of England and Wales.",
      ],
    },
    zh: {
      query: "任何一方是否都可以无需说明理由就提前终止本协议？",
      docs: [
        "便利终止：任何一方均可基于任何理由终止本协议，但须提前三十（30）天向另一方发出书面通知。",
        "因故终止：若一方实质性违反本协议，并在收到书面通知后十五（15）天内未予补救，另一方可立即终止。",
        "除非任何一方在当前期限届满前至少六十（60）天发出不续约通知，本协议将自动续展为连续的一年期。",
        "协议终止后，各方应在十（10）天内退还或销毁对方的保密信息。",
        "对于因自身过失或故意不当行为引起的第三方索赔，各方应相互赔偿对方。",
        "本协议受英格兰和威尔士法律管辖并据其解释。",
      ],
    },
  },
];

function sampleById(id) {
  return SAMPLES.find((s) => s.id === id) || null;
}
function sampleText(s) {
  return isZh() ? s.zh : s.en;
}

/* ---------------- UI wiring ---------------- */

const els = {
  model: document.getElementById("model-select"),
  modelMeta: document.getElementById("model-meta"),
  presets: document.getElementById("preset-row"),
  query: document.getElementById("query-input"),
  docs: document.getElementById("docs-input"),
  run: document.getElementById("run-btn"),
  clear: document.getElementById("clear-btn"),
  status: document.getElementById("status"),
  progressWrap: document.getElementById("progress-wrap"),
  progressBar: document.getElementById("progress-bar"),
  region: document.getElementById("results-region"),
  resultsBar: document.getElementById("results-bar"),
  stats: document.getElementById("stat-row"),
  before: document.getElementById("results-before"),
  after: document.getElementById("results-after"),
  copyJson: document.getElementById("copy-json"),
  copyMd: document.getElementById("copy-md"),
  copyLabel: document.querySelector(".copy-label"),
};

// Populate model dropdown.
if (els.model) {
  Object.entries(MODELS).forEach(([id, m], i) => {
    const opt = document.createElement("option");
    opt.value = id;
    opt.textContent = `${m.name} · ~${m.sizeMB} MB · ${L(m.noteEn, m.noteZh)}`;
    if (i === 0) opt.selected = true;
    els.model.appendChild(opt);
  });
  els.model.addEventListener("change", renderModelMeta);
}

function renderModelMeta() {
  if (!els.modelMeta || !els.model) return;
  const m = MODELS[els.model.value];
  if (!m) return;
  const cached = cache.has(els.model.value);
  const cachedNote = cached
    ? L(" · already loaded in this tab", " · 本标签页已加载")
    : "";
  els.modelMeta.textContent = L(
    `≈${m.sizeMB} MB quantised — downloaded once, then cached; runs on CPU/WASM in your browser${cachedNote}`,
    `约 ${m.sizeMB} MB（量化）—— 仅下载一次，之后缓存；在你浏览器的 CPU/WASM 上运行${cachedNote}`
  );
}

// Build the preset / scenario buttons.
let currentPreset = SAMPLES[0].id;
let userEdited = false;

function renderPresets() {
  if (!els.presets) return;
  els.presets.innerHTML = SAMPLES.map((s) => {
    const active = s.id === currentPreset && !userEdited ? " active" : "";
    const diff = L(s.difficultyEn, s.difficultyZh);
    return `<button type="button" class="preset-btn${active}" data-id="${s.id}">
        ${esc(L(s.labelEn, s.labelZh))}<span class="preset-diff">${esc(diff)}</span>
      </button>`;
  }).join("");
  els.presets.querySelectorAll(".preset-btn").forEach((btn) => {
    btn.addEventListener("click", () => loadPreset(btn.dataset.id));
  });
}

function loadPreset(id) {
  const s = sampleById(id);
  if (!s) return;
  const t = sampleText(s);
  if (els.query) els.query.value = t.query;
  if (els.docs) els.docs.value = t.docs.join("\n");
  currentPreset = id;
  userEdited = false;
  renderPresets();
  setStatus(
    L(
      "Scenario loaded — hit “Rerank” to score it.",
      "示例已载入 —— 点击“重排序”为它打分。"
    ),
    false
  );
}

function setStatus(text, spinning) {
  if (!els.status) return;
  els.status.innerHTML = spinning
    ? '<span class="spinner"></span> ' + text
    : text;
}

function showProgress(pct) {
  if (!els.progressWrap) return;
  els.progressWrap.style.display = pct == null ? "none" : "block";
  if (pct != null && els.progressBar) els.progressBar.style.width = pct + "%";
}

function parseDocs(raw) {
  return raw
    .split(/\n\s*\n|\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );
}

function mb(bytes) {
  return (bytes / 1048576).toFixed(1);
}

// Color band for a 0–1 relevance score.
function scoreLevel(score) {
  if (score >= 0.6) return "good";
  if (score >= 0.3) return "mid";
  return "low";
}

/* ---------------- Rendering ---------------- */

let lastRun = null; // keep the most recent run so we can re-render on lang switch

function deltaHtml(delta) {
  if (delta > 0)
    return `<span class="delta up">▲ ${delta}</span>`;
  if (delta < 0)
    return `<span class="delta down">▼ ${-delta}</span>`;
  return `<span class="delta">${L("—", "—")}</span>`;
}

function rowHtml(opts) {
  const { rank, text, score, maxScore, origIndex, showDelta, animate } = opts;
  const lvl = scoreLevel(score);
  const pct = Math.round((score / maxScore) * 100);
  const wasLabel = L("was #", "原 #");
  const meta = showDelta
    ? `<span class="muted was">${wasLabel}${origIndex + 1}</span>${deltaHtml(
        origIndex - (rank - 1)
      )}`
    : "";
  const style = animate ? ` style="animation-delay:${(rank - 1) * 40}ms"` : "";
  return `
    <div class="result-item ${rank === 1 && showDelta ? "top" : ""}"${style}>
      <div class="result-head">
        <div class="result-rankline"><span class="rank">${rank}</span>${meta}</div>
        <div class="result-score lvl-${lvl}">${score.toFixed(4)}</div>
      </div>
      <div class="result-text">${esc(text)}</div>
      <div class="score-track lvl-${lvl}"><i style="width:${pct}%"></i></div>
    </div>`;
}

function renderResults(run) {
  lastRun = run;
  if (!els.region) return;
  els.region.hidden = false;

  const { query, items, modelId, ms, didDownload, bytes } = run;
  const maxScore = Math.max(...items.map((s) => s.score), 0.0001);

  // Before = original input order; After = sorted by score desc.
  const before = items.slice().sort((a, b) => a.origIndex - b.origIndex);
  const after = items.slice().sort((a, b) => b.score - a.score);

  // Heading + copy actions.
  if (els.resultsBar) {
    els.resultsBar.innerHTML = `
      <div>
        <h3 class="mt-0">${L("Reranked results", "重排序结果")}</h3>
        <p class="muted results-sub">${L(
          "Color shows the relevance band; the badge shows how far each passage moved.",
          "颜色表示相关性区间；标签显示每段文本移动了多少位。"
        )}</p>
      </div>`;
  }

  // Stat chips.
  if (els.stats) {
    const m = MODELS[modelId];
    const loadChip = didDownload
      ? L(`downloaded ${mb(bytes)} MB`, `已下载 ${mb(bytes)} MB`)
      : L("loaded from cache", "从缓存加载");
    els.stats.innerHTML = [
      `<span class="chip"><span class="chip-k">${L("Model", "模型")}</span>${esc(
        m ? m.name : modelId
      )}</span>`,
      `<span class="chip"><span class="chip-k">${L("Size", "大小")}</span>~${
        m ? m.sizeMB : "?"
      } MB</span>`,
      `<span class="chip"><span class="chip-k">${L(
        "Inference",
        "推理"
      )}</span>${ms} ms</span>`,
      `<span class="chip"><span class="chip-k">${L(
        "Passages",
        "候选"
      )}</span>${items.length}</span>`,
      `<span class="chip chip-soft">${loadChip}</span>`,
    ].join("");
  }

  if (els.before) {
    els.before.innerHTML =
      `<div class="compare-head">${L(
        "Before — as retrieved",
        "重排前 —— 检索原序"
      )}</div>` +
      before
        .map((s) =>
          rowHtml({
            rank: s.origIndex + 1,
            text: s.text,
            score: s.score,
            maxScore,
            origIndex: s.origIndex,
            showDelta: false,
            animate: false,
          })
        )
        .join("");
  }
  if (els.after) {
    els.after.innerHTML =
      `<div class="compare-head">${L(
        "After — reranked",
        "重排后 —— 按相关性"
      )}</div>` +
      after
        .map((s, i) =>
          rowHtml({
            rank: i + 1,
            text: s.text,
            score: s.score,
            maxScore,
            origIndex: s.origIndex,
            showDelta: true,
            animate: true,
          })
        )
        .join("");
  }

  // Copy buttons.
  if (els.copyLabel)
    els.copyLabel.textContent = L("Copy results:", "复制结果：");
  if (els.copyJson)
    els.copyJson.textContent = L("Copy JSON", "复制 JSON");
  if (els.copyMd)
    els.copyMd.textContent = L("Copy Markdown", "复制 Markdown");
}

/* ---------------- Copy results ---------------- */

function rankedForExport() {
  if (!lastRun) return [];
  return lastRun.items
    .slice()
    .sort((a, b) => b.score - a.score)
    .map((s, i) => ({
      rank: i + 1,
      originalPosition: s.origIndex + 1,
      score: Number(s.score.toFixed(4)),
      text: s.text,
    }));
}

function exportJson() {
  return JSON.stringify(
    {
      query: lastRun ? lastRun.query : "",
      model: lastRun ? lastRun.modelId : "",
      results: rankedForExport(),
    },
    null,
    2
  );
}

function exportMarkdown() {
  const rows = rankedForExport();
  const head = `**Query:** ${lastRun ? lastRun.query : ""}\n\n`;
  const table =
    "| Rank | Was | Score | Passage |\n|---:|---:|---:|---|\n" +
    rows
      .map(
        (r) =>
          `| ${r.rank} | #${r.originalPosition} | ${r.score.toFixed(
            4
          )} | ${r.text.replace(/\|/g, "\\|")} |`
      )
      .join("\n");
  return head + table + "\n";
}

async function copyText(text, btn) {
  const ok = L("Copied ✓", "已复制 ✓");
  const original = btn.textContent;
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    btn.textContent = ok;
  } catch (e) {
    btn.textContent = L("Copy failed", "复制失败");
  }
  setTimeout(() => {
    btn.textContent = original;
  }, 1400);
}

/* ---------------- Run ---------------- */

async function run() {
  const query = (els.query.value || "").trim();
  const docs = parseDocs(els.docs.value || "");
  if (!query)
    return setStatus(L("Enter a query first.", "请先输入一个查询。"), false);
  if (docs.length < 2)
    return setStatus(
      L(
        "Add at least two candidate passages (one per line).",
        "请至少添加两段候选文本（每行一段）。"
      ),
      false
    );

  const modelId = els.model.value;
  const wasCached = cache.has(modelId);
  els.run.disabled = true;
  setStatus(
    wasCached
      ? L("Loading cached model…", "正在加载已缓存的模型……")
      : L(
          "Loading model… first run downloads weights, then they are cached.",
          "正在加载模型…… 首次运行会下载权重，之后即缓存。"
        ),
    true
  );
  showProgress(wasCached ? null : 0);

  const files = {};
  let didDownload = false;
  const onProgress = (p) => {
    if (p.status === "progress" && p.file) {
      didDownload = true;
      files[p.file] = { loaded: p.loaded || 0, total: p.total || 0 };
      const vals = Object.values(files);
      const loaded = vals.reduce((a, b) => a + b.loaded, 0);
      const total = vals.reduce((a, b) => a + b.total, 0);
      const pct = total ? Math.min(99, Math.round((loaded / total) * 100)) : 0;
      showProgress(pct);
      setStatus(
        L(
          `Downloading model weights… ${mb(loaded)} / ${mb(total)} MB (${pct}%)`,
          `正在下载模型权重…… ${mb(loaded)} / ${mb(total)} MB（${pct}%）`
        ),
        true
      );
    }
  };

  try {
    const reranker = await getReranker(modelId, onProgress);
    showProgress(100);
    setStatus(L("Scoring candidates…", "正在为候选打分……"), true);
    const t0 = performance.now();
    const scores = await reranker.score(query, docs);
    const ms = Math.round(performance.now() - t0);

    const items = docs.map((text, origIndex) => ({
      text,
      origIndex,
      score: scores[origIndex],
    }));
    const bytes = Object.values(files).reduce((a, b) => a + b.loaded, 0);

    renderResults({ query, items, modelId, ms, didDownload, bytes });
    renderModelMeta();
    showProgress(null);
    setStatus(
      didDownload
        ? L(
            `Done — reranked ${docs.length} passages in ${ms} ms (model downloaded once; cached from now on).`,
            `完成 —— 在 ${ms} ms 内对 ${docs.length} 段文本完成重排序（模型已下载一次，之后将走缓存）。`
          )
        : L(
            `Done — reranked ${docs.length} passages in ${ms} ms, fully in your browser.`,
            `完成 —— 在 ${ms} ms 内对 ${docs.length} 段文本完成重排序，全程在你的浏览器中运行。`
          ),
      false
    );
    if (els.region && els.region.scrollIntoView) {
      els.region.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  } catch (err) {
    console.error(err);
    showProgress(null);
    setStatus(
      L("Something went wrong: ", "出错了：") +
        (err && err.message ? err.message : err),
      false
    );
  } finally {
    els.run.disabled = false;
  }
}

function clearAll() {
  if (els.query) els.query.value = "";
  if (els.docs) els.docs.value = "";
  if (els.region) els.region.hidden = true;
  lastRun = null;
  currentPreset = null;
  userEdited = false;
  renderPresets();
  idleStatus();
  if (els.query) els.query.focus();
}

/* ---------------- Wiring & lifecycle ---------------- */

if (els.run) els.run.addEventListener("click", run);
if (els.clear) els.clear.addEventListener("click", clearAll);
if (els.copyJson)
  els.copyJson.addEventListener("click", () =>
    copyText(exportJson(), els.copyJson)
  );
if (els.copyMd)
  els.copyMd.addEventListener("click", () =>
    copyText(exportMarkdown(), els.copyMd)
  );

function markEdited() {
  if (!userEdited) {
    userEdited = true;
    renderPresets();
  }
}
if (els.query) els.query.addEventListener("input", markEdited);
if (els.docs) els.docs.addEventListener("input", markEdited);

function idleStatus() {
  setStatus(
    L(
      "Ready. Pick a scenario or paste your own, then click “Rerank”.",
      "准备就绪。选择一个示例或粘贴你自己的内容，然后点击“重排序”。"
    ),
    false
  );
}

// First paint: model meta, preset buttons, a loaded sample, idle status.
renderModelMeta();
renderPresets();
loadPreset(currentPreset);
idleStatus();

// Keep dynamic UI in sync when the user switches language.
document.addEventListener("i18n:changed", function () {
  // Re-label the model dropdown notes.
  if (els.model) {
    Array.from(els.model.options).forEach((opt) => {
      const m = MODELS[opt.value];
      if (m) opt.textContent = `${m.name} · ~${m.sizeMB} MB · ${L(m.noteEn, m.noteZh)}`;
    });
  }
  renderModelMeta();
  renderPresets();
  // Reload the active preset in the new language if the user hasn't edited it.
  if (currentPreset && !userEdited) {
    const keepStatus = els.status ? els.status.textContent : "";
    loadPreset(currentPreset);
    // loadPreset overwrites the status line; restore a neutral one if we were idle.
    if (/Ready|准备就绪/.test(keepStatus)) idleStatus();
  }
  // Re-render the results chrome (heads, stats, copy labels) in the new language.
  if (lastRun) renderResults(lastRun);
});

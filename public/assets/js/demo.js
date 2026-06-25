/* reranker.uk — in-browser cross-encoder reranking demo. */
import {
  AutoTokenizer,
  AutoModelForSequenceClassification,
  env,
} from "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.5.1";

env.allowLocalModels = false;
env.useBrowserCache = true;

const MAX_DOCS = 30;
const PASSAGE_CHAR_WARN = 512;
const URL_COMPRESS_THRESHOLD = 1600;
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

const cache = new Map();
let webgpuAvailable = null;

class Reranker {
  constructor(modelId) {
    this.modelId = modelId;
  }
  async init(onProgress, device) {
    const opts = {
      dtype: "q8",
      progress_callback: onProgress,
    };
    if (device === "webgpu") opts.device = "webgpu";
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
    return raw.map((row) => (Array.isArray(row) ? row[0] : row));
  }
}

async function probeWebGPU() {
  if (webgpuAvailable != null) return webgpuAvailable;
  try {
    if (!navigator.gpu) {
      webgpuAvailable = false;
      return false;
    }
    const adapter = await navigator.gpu.requestAdapter();
    webgpuAvailable = !!adapter;
  } catch (e) {
    webgpuAvailable = false;
  }
  return webgpuAvailable;
}

async function getReranker(modelId, onProgress, useWebgpu) {
  const device = useWebgpu ? "webgpu" : "wasm";
  const cacheKey = modelId + ":" + device;
  if (cache.has(cacheKey)) return cache.get(cacheKey);
  const r = await new Reranker(modelId).init(onProgress, useWebgpu ? "webgpu" : undefined);
  cache.set(cacheKey, r);
  return r;
}

function isZh() {
  return (document.documentElement.lang || "").toLowerCase().indexOf("zh") === 0;
}
function L(en, zh) {
  return isZh() ? zh : en;
}

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
  {
    id: "techdocs",
    labelEn: "Technical docs",
    labelZh: "技术文档",
    difficultyEn: "medium",
    difficultyZh: "中等",
    en: {
      query: "What is the rate limit for the REST API per API key?",
      docs: [
        "Rate limits: 1000 requests per minute per API key on the Pro plan; 100 req/min on Free. Burst allowance of 50 requests for 10 seconds.",
        "Authentication uses Bearer tokens in the Authorization header. Rotate keys from the dashboard under Settings → API keys.",
        "Webhooks retry failed deliveries up to 5 times with exponential backoff starting at 30 seconds.",
        "The GraphQL endpoint shares the same rate limit pool as REST — combined traffic counts toward your key quota.",
        "SDK changelog: v2.4 added pagination cursors; v2.3 deprecated the legacy /v1/search route.",
        "Our office cafeteria serves lunch from 11:30 to 1:30 on weekdays.",
      ],
    },
    zh: {
      query: "REST API 每个 API key 的速率限制是多少？",
      docs: [
        "速率限制：Pro 计划每个 API key 每分钟 1000 次请求；Free 为 100 次/分钟。允许 10 秒内 50 次突发请求。",
        "认证使用 Authorization 头中的 Bearer token。可在控制台 设置 → API 密钥 中轮换密钥。",
        "Webhook 失败投递最多重试 5 次，从 30 秒起指数退避。",
        "GraphQL 端点与 REST 共享同一速率限制池 —— 合并流量计入 key 配额。",
        "SDK 更新日志：v2.4 增加分页游标；v2.3 废弃旧版 /v1/search 路由。",
        "公司食堂工作日 11:30–13:30 供应午餐。",
      ],
    },
  },
  {
    id: "code",
    labelEn: "Code search",
    labelZh: "代码检索",
    difficultyEn: "hard",
    difficultyZh: "困难",
    en: {
      query: "How do I implement binary search on a sorted array in Python?",
      docs: [
        "def binary_search(arr, target):\n    lo, hi = 0, len(arr) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: lo = mid + 1\n        else: hi = mid - 1\n    return -1",
        "bisect.bisect_left(a, x) returns the insertion point for x in sorted list a — useful for lower-bound binary search in the standard library.",
        "Linear scan: for i, v in enumerate(arr):\n    if v == target: return i\n# O(n) — fine for small arrays but not for large sorted data.",
        "Recursive binary search splits the array in half each call; watch Python recursion depth on very large inputs — prefer iterative.",
        "numpy.searchsorted(a, v) performs binary search on sorted NumPy arrays and returns the index.",
        "Quicksort picks a pivot and partitions the array — average O(n log n), not the same as binary search.",
      ],
    },
    zh: {
      query: "如何在 Python 里对已排序数组实现二分查找？",
      docs: [
        "def binary_search(arr, target):\n    lo, hi = 0, len(arr) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: lo = mid + 1\n        else: hi = mid - 1\n    return -1",
        "bisect.bisect_left(a, x) 返回 x 在有序列表 a 中的插入位置 —— 标准库中常用于下界二分查找。",
        "线性扫描：for i, v in enumerate(arr):\n    if v == target: return i\n# O(n) —— 小数组可以，大数据不适用。",
        "递归二分每次把数组一分为二；注意 Python 递归深度 —— 大数组建议用迭代写法。",
        "numpy.searchsorted(a, v) 在有序 NumPy 数组上做二分查找并返回索引。",
        "快速排序选 pivot 分区 —— 平均 O(n log n)，与二分查找不是同一算法。",
      ],
    },
  },
];

const els = {
  model: document.getElementById("model-select"),
  modelB: document.getElementById("model-select-b"),
  compareToggle: document.getElementById("compare-toggle"),
  webgpuToggle: document.getElementById("webgpu-toggle"),
  modelMeta: document.getElementById("model-meta"),
  presets: document.getElementById("preset-row"),
  query: document.getElementById("query-input"),
  docs: document.getElementById("docs-input"),
  docsList: document.getElementById("docs-list"),
  docsListItems: document.getElementById("docs-list-items"),
  docsAddBtn: document.getElementById("docs-add-btn"),
  docCharStats: document.getElementById("doc-char-stats"),
  docWarning: document.getElementById("doc-warning"),
  run: document.getElementById("run-btn"),
  clear: document.getElementById("clear-btn"),
  share: document.getElementById("share-btn"),
  status: document.getElementById("status"),
  loadPanel: document.getElementById("load-panel"),
  loadLabel: document.getElementById("load-label"),
  loadModelName: document.getElementById("load-model-name"),
  loadCacheStatus: document.getElementById("load-cache-status"),
  loadPct: document.getElementById("load-pct"),
  loadEta: document.getElementById("load-eta"),
  loadFile: document.getElementById("load-file"),
  progressWrap: document.getElementById("progress-wrap"),
  progressBar: document.getElementById("progress-bar"),
  region: document.getElementById("results-region"),
  resultsBar: document.getElementById("results-bar"),
  stats: document.getElementById("stat-row"),
  before: document.getElementById("results-before"),
  bi: document.getElementById("results-bi"),
  after: document.getElementById("results-after"),
  dualRegion: document.getElementById("dual-results"),
  dualA: document.getElementById("dual-col-a"),
  dualB: document.getElementById("dual-col-b"),
  dualDiff: document.getElementById("dual-diff"),
  dualDiffSub: document.getElementById("dual-diff-sub"),
  diffThA: document.getElementById("diff-th-a"),
  diffThB: document.getElementById("diff-th-b"),
  diffTbody: document.getElementById("diff-tbody"),
  copyJson: document.getElementById("copy-json"),
  copyMd: document.getElementById("copy-md"),
  copyCsv: document.getElementById("copy-csv"),
  copyLabel: document.querySelector(".copy-label"),
};

const MOBILE_MQ = window.matchMedia("(max-width: 760px)");
let loadTrack = { start: 0, lastLoaded: 0, lastTime: 0 };

function sampleById(id) {
  return SAMPLES.find((s) => s.id === id) || null;
}
function sampleText(s) {
  return isZh() ? s.zh : s.en;
}

function fillModelSelect(sel, selectedId) {
  if (!sel) return;
  sel.innerHTML = "";
  Object.entries(MODELS).forEach(([id, m], i) => {
    const opt = document.createElement("option");
    opt.value = id;
    opt.textContent = `${m.name} · ~${m.sizeMB} MB · ${L(m.noteEn, m.noteZh)}`;
    if (id === selectedId || (i === 0 && !selectedId)) opt.selected = true;
    sel.appendChild(opt);
  });
}

if (els.model) {
  fillModelSelect(els.model);
  fillModelSelect(els.modelB, "jinaai/jina-reranker-v1-tiny-en");
  els.model.addEventListener("change", () => {
    renderModelMeta();
    void syncUrl();
  });
}
if (els.modelB) {
  els.modelB.addEventListener("change", () => void syncUrl());
}
if (els.compareToggle) {
  els.compareToggle.addEventListener("change", () => {
    if (els.modelB) els.modelB.disabled = !els.compareToggle.checked;
    if (els.dualRegion) els.dualRegion.hidden = true;
    if (els.dualDiff) els.dualDiff.hidden = true;
  });
}
if (els.webgpuToggle) {
  probeWebGPU().then((ok) => {
    if (!ok && els.webgpuToggle) {
      els.webgpuToggle.disabled = true;
      els.webgpuToggle.parentElement.title = L(
        "WebGPU not available in this browser",
        "此浏览器不支持 WebGPU"
      );
    }
  });
}

let currentPreset = SAMPLES[0].id;
let userEdited = false;
let lastRun = null;

function renderModelMeta() {
  if (!els.modelMeta || !els.model) return;
  const m = MODELS[els.model.value];
  if (!m) return;
  const device = els.webgpuToggle && els.webgpuToggle.checked ? "webgpu" : "wasm";
  const cacheKey = els.model.value + ":" + device;
  const cached = cache.has(cacheKey);
  const cachedNote = cached
    ? L(" · already loaded in this tab", " · 本标签页已加载")
    : "";
  const devNote =
    device === "webgpu"
      ? L(" · WebGPU", " · WebGPU")
      : L(" · WASM/CPU", " · WASM/CPU");
  els.modelMeta.textContent = L(
    `≈${m.sizeMB} MB quantised — downloaded once, then cached${devNote}${cachedNote}`,
    `约 ${m.sizeMB} MB（量化）—— 仅下载一次，之后缓存${devNote}${cachedNote}`
  );
}

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
  updateDocWarning();
  if (MOBILE_MQ.matches) renderDocsList();
  void syncUrl();
  setStatus(
    L("Scenario loaded — hit “Rerank” to score it.", "示例已载入 —— 点击“重排序”为它打分。"),
    false
  );
}

function setStatus(text, spinning) {
  if (!els.status) return;
  els.status.innerHTML = spinning
    ? '<span class="spinner"></span> ' + esc(text)
    : esc(text);
}

function showProgress(pct) {
  if (pct != null && els.progressBar) els.progressBar.style.width = pct + "%";
}

function showLoadPanel(modelId, cachedInTab) {
  if (!els.loadPanel) return;
  const m = MODELS[modelId];
  els.loadPanel.hidden = false;
  if (els.loadLabel)
    els.loadLabel.textContent = L("Loading model", "正在加载模型");
  if (els.loadModelName)
    els.loadModelName.textContent = m
      ? `${m.name} · ~${m.sizeMB} MB`
      : modelId;
  if (els.loadCacheStatus) {
    els.loadCacheStatus.textContent = cachedInTab
      ? L("In tab memory", "已在标签页内存")
      : L("Checking browser cache…", "正在检查浏览器缓存…");
  }
  if (els.loadPct) els.loadPct.textContent = "0%";
  if (els.loadEta) els.loadEta.textContent = "";
  if (els.loadFile) els.loadFile.textContent = "";
  showProgress(0);
  loadTrack = { start: performance.now(), lastLoaded: 0, lastTime: performance.now() };
}

function hideLoadPanel() {
  if (els.loadPanel) els.loadPanel.hidden = true;
  showProgress(0);
}

function formatEta(seconds) {
  if (!seconds || !isFinite(seconds) || seconds < 0) return "";
  if (seconds < 60)
    return L(`~${Math.ceil(seconds)}s left`, `约剩 ${Math.ceil(seconds)} 秒`);
  return L(`~${Math.ceil(seconds / 60)}m left`, `约剩 ${Math.ceil(seconds / 60)} 分钟`);
}

function updateLoadProgress(modelId, files, currentFile, cachedInTab) {
  const vals = Object.values(files);
  const loaded = vals.reduce((a, b) => a + b.loaded, 0);
  const total = vals.reduce((a, b) => a + b.total, 0);
  const pct = total ? Math.min(99, Math.round((loaded / total) * 100)) : 0;
  showProgress(pct);

  const now = performance.now();
  const dt = (now - loadTrack.lastTime) / 1000;
  let eta = "";
  if (dt > 0.2 && loaded > loadTrack.lastLoaded && total > loaded) {
    const speed = (loaded - loadTrack.lastLoaded) / dt;
    if (speed > 0) eta = formatEta((total - loaded) / speed);
    loadTrack.lastLoaded = loaded;
    loadTrack.lastTime = now;
  }

  if (els.loadPct)
    els.loadPct.textContent = total
      ? `${pct}% · ${mb(loaded)}/${mb(total)} MB`
      : L("Preparing…", "准备中…");
  if (els.loadEta) els.loadEta.textContent = eta;
  if (els.loadFile && currentFile) {
    const short = currentFile.split("/").pop() || currentFile;
    els.loadFile.textContent = short;
  }
  if (els.loadCacheStatus && !cachedInTab) {
    els.loadCacheStatus.textContent =
      loaded > 0 && total > 0 && loaded < total
        ? L("Downloading", "正在下载")
        : L("Checking browser cache…", "正在检查浏览器缓存…");
  }
  setStatus(
    L(
      `Downloading ${MODELS[modelId]?.name || modelId}… ${pct}%`,
      `正在下载 ${MODELS[modelId]?.name || modelId}…… ${pct}%`
    ),
    true
  );
}

function parseDocs(raw) {
  const trimmed = (raw || "").trim();
  if (!trimmed) return [];
  if (trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map((s) => String(s).trim()).filter(Boolean);
      }
    } catch (e) {
      /* fall through to line mode */
    }
  }
  if (trimmed.startsWith("{")) {
    try {
      const parsed = JSON.parse(trimmed);
      const arr = parsed.passages || parsed.docs || parsed.documents;
      if (Array.isArray(arr)) {
        return arr.map((s) => String(s).trim()).filter(Boolean);
      }
    } catch (e) {
      /* fall through */
    }
  }
  return trimmed
    .split(/\n\s*\n|\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function inputFormatHint(raw) {
  const t = (raw || "").trim();
  if (!t) return null;
  if (t.startsWith("[") || (t.startsWith("{") && /passages|docs|documents/i.test(t))) {
    return L("JSON input detected", "已识别 JSON 输入");
  }
  return null;
}

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );
}

function mb(bytes) {
  return (bytes / 1048576).toFixed(1);
}

function tokenize(s) {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

/** Lightweight bi-encoder proxy: independent token overlap (no cross-attention). */
function biEncoderProxyScores(query, docs) {
  const qTokens = tokenize(query);
  const qSet = new Set(qTokens);
  if (!qTokens.length) return docs.map(() => 0);
  return docs.map((doc) => {
    const dTokens = tokenize(doc);
    const dSet = new Set(dTokens);
    let inter = 0;
    for (const t of qSet) if (dSet.has(t)) inter++;
    const union = new Set([...qSet, ...dSet]).size || 1;
    return inter / union;
  });
}

function scoreLevel(score) {
  if (score >= 0.6) return "good";
  if (score >= 0.3) return "mid";
  return "low";
}

function deltaHtml(delta) {
  if (delta > 0) return `<span class="delta up">▲ ${delta}</span>`;
  if (delta < 0) return `<span class="delta down">▼ ${-delta}</span>`;
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

function renderColumn(el, items, maxScore, showDelta, animate, headText) {
  if (!el) return;
  const sorted = showDelta
    ? items.slice().sort((a, b) => b.score - a.score)
    : items.slice().sort((a, b) => a.origIndex - b.origIndex);
  el.innerHTML =
    `<div class="compare-head">${headText}</div>` +
    sorted
      .map((s, i) =>
        rowHtml({
          rank: showDelta ? i + 1 : s.origIndex + 1,
          text: s.text,
          score: s.score,
          maxScore,
          origIndex: s.origIndex,
          showDelta,
          animate,
        })
      )
      .join("");
}

function renderResults(run) {
  lastRun = run;
  if (!els.region) return;
  els.region.hidden = false;

  const { query, items, biItems, modelId, ms, didDownload, bytes, compareRun } = run;
  const maxScore = Math.max(...items.map((s) => s.score), 0.0001);
  const maxBi = Math.max(...biItems.map((s) => s.score), 0.0001);

  if (els.resultsBar) {
    els.resultsBar.innerHTML = `
      <div>
        <h3 class="mt-0">${L("Reranked results", "重排序结果")}</h3>
        <p class="muted results-sub">${L(
          "Middle column is a bi-encoder proxy (token overlap). Right column is the real cross-encoder.",
          "中间列为 bi-encoder 代理（词元重叠）。右列为真实 cross-encoder。"
        )}</p>
      </div>`;
  }

  if (els.stats) {
    const m = MODELS[modelId];
    const loadChip = didDownload
      ? L(`downloaded ${mb(bytes)} MB`, `已下载 ${mb(bytes)} MB`)
      : L("loaded from cache", "从缓存加载");
    els.stats.innerHTML = [
      `<span class="chip"><span class="chip-k">${L("Model", "模型")}</span>${esc(m ? m.name : modelId)}</span>`,
      `<span class="chip"><span class="chip-k">${L("Inference", "推理")}</span>${ms} ms</span>`,
      `<span class="chip"><span class="chip-k">${L("Passages", "候选")}</span>${items.length}</span>`,
      `<span class="chip chip-soft">${loadChip}</span>`,
    ].join("");
  }

  renderColumn(
    els.before,
    items,
    maxScore,
    false,
    false,
    L("Before — as retrieved", "重排前 —— 检索原序")
  );
  renderColumn(
    els.bi,
    biItems,
    maxBi,
    true,
    false,
    L("Bi-encoder proxy — token overlap", "Bi-encoder 代理 —— 词元重叠")
  );
  renderColumn(
    els.after,
    items,
    maxScore,
    true,
    true,
    L("After — cross-encoder", "重排后 —— cross-encoder")
  );

  if (els.copyLabel) els.copyLabel.textContent = L("Copy results:", "复制结果：");
  if (els.copyJson) els.copyJson.textContent = L("Copy JSON", "复制 JSON");
  if (els.copyMd) els.copyMd.textContent = L("Copy Markdown", "复制 Markdown");
  if (els.copyCsv) els.copyCsv.textContent = L("Copy CSV", "复制 CSV");

  if (compareRun && els.dualRegion) {
    els.dualRegion.hidden = false;
    renderDualCompare(compareRun);
  } else {
    if (els.dualRegion) els.dualRegion.hidden = true;
    if (els.dualDiff) els.dualDiff.hidden = true;
  }
}

function renderDualCompare(compareRun) {
  const { itemsA, itemsB, modelA, modelB, msB } = compareRun;
  const maxA = Math.max(...itemsA.map((s) => s.score), 0.0001);
  const maxB = Math.max(...itemsB.map((s) => s.score), 0.0001);
  const headA = `${MODELS[modelA]?.name || modelA}`;
  const headB = `${MODELS[modelB]?.name || modelB} (${msB} ms)`;
  renderColumn(els.dualA, itemsA, maxA, true, true, headA);
  renderColumn(els.dualB, itemsB, maxB, true, true, headB);
  renderDualDiff(compareRun);
}

function rankMap(items) {
  const sorted = items.slice().sort((a, b) => b.score - a.score);
  const map = new Map();
  sorted.forEach((item, i) => map.set(item.origIndex, i + 1));
  return map;
}

function scoreDiffHtml(delta) {
  const sign = delta > 0 ? "+" : "";
  const cls = delta > 0 ? "diff-up" : delta < 0 ? "diff-down" : "";
  return `<span class="${cls}">${sign}${delta.toFixed(4)}</span>`;
}

function rankDiffHtml(delta) {
  if (delta > 0) return `<span class="diff-up">▲ ${delta}</span>`;
  if (delta < 0) return `<span class="diff-down">▼ ${-delta}</span>`;
  return `<span class="muted">${L("—", "—")}</span>`;
}

function renderDualDiff(compareRun) {
  if (!els.dualDiff || !els.diffTbody) return;
  const { itemsA, itemsB, modelA, modelB } = compareRun;
  const ranksA = rankMap(itemsA);
  const ranksB = rankMap(itemsB);
  const nameA = MODELS[modelA]?.name || modelA;
  const nameB = MODELS[modelB]?.name || modelB;

  if (els.diffThA) els.diffThA.textContent = nameA;
  if (els.diffThB) els.diffThB.textContent = nameB;
  if (els.dualDiffSub) {
    els.dualDiffSub.textContent = L(
      "Rows aligned by input order. Positive Δ rank means model B ranked this passage higher.",
      "按输入顺序对齐。Δ 名次为正表示模型 B 将该段排名更靠前。"
    );
  }

  const bByIndex = new Map(itemsB.map((item) => [item.origIndex, item]));
  const rows = itemsA
    .slice()
    .sort((a, b) => a.origIndex - b.origIndex)
    .map((itemA) => {
      const itemB = bByIndex.get(itemA.origIndex);
      const rA = ranksA.get(itemA.origIndex);
      const rB = ranksB.get(itemA.origIndex);
      const scoreDelta = itemB ? itemB.score - itemA.score : 0;
      const rankDelta = rB != null && rA != null ? rA - rB : 0;
      const text =
        itemA.text.length > 120 ? itemA.text.slice(0, 117) + "…" : itemA.text;
      return `<tr>
        <td class="diff-idx">${itemA.origIndex + 1}</td>
        <td class="diff-text">${esc(text)}</td>
        <td class="diff-score"><span class="mono">${itemA.score.toFixed(4)}</span> <span class="muted">#${rA}</span></td>
        <td class="diff-score"><span class="mono">${itemB ? itemB.score.toFixed(4) : "—"}</span> <span class="muted">#${rB ?? "—"}</span></td>
        <td>${scoreDiffHtml(scoreDelta)}</td>
        <td>${rankDiffHtml(rankDelta)}</td>
      </tr>`;
    })
    .join("");

  els.diffTbody.innerHTML = rows;
  els.dualDiff.hidden = false;
}

function syncTextareaFromList() {
  if (!els.docsListItems || !els.docs) return;
  const lines = Array.from(els.docsListItems.querySelectorAll(".docs-list-input"))
    .map((el) => el.value.trim())
    .filter(Boolean);
  els.docs.value = lines.join("\n");
  updateDocWarning();
}

function renderDocsList() {
  if (!els.docsListItems || !els.docs) return;
  const docs = parseDocs(els.docs.value);
  const rows = docs.length ? docs : ["", ""];
  els.docsListItems.innerHTML = rows
    .map(
      (text, i) => `
    <div class="docs-list-row" data-idx="${i}">
      <span class="docs-list-num">${i + 1}<small class="docs-list-chars${text.length > PASSAGE_CHAR_WARN ? " over" : ""}">${text.length}</small></span>
      <textarea class="docs-list-input" rows="2" aria-label="${L("Passage", "候选段落")} ${i + 1}">${esc(text)}</textarea>
      <button type="button" class="docs-list-del" aria-label="${L("Remove passage", "删除段落")}">×</button>
    </div>`
    )
    .join("");

  els.docsListItems.querySelectorAll(".docs-list-input").forEach((ta) => {
    ta.addEventListener("input", () => {
      const row = ta.closest(".docs-list-row");
      const ch = row?.querySelector(".docs-list-chars");
      if (ch) {
        ch.textContent = ta.value.length;
        ch.classList.toggle("over", ta.value.length > PASSAGE_CHAR_WARN);
      }
      syncTextareaFromList();
      markEdited();
      void syncUrl();
    });
  });
  els.docsListItems.querySelectorAll(".docs-list-del").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".docs-list-row")?.remove();
      syncTextareaFromList();
      if (!els.docsListItems.querySelector(".docs-list-row")) renderDocsList();
      markEdited();
      void syncUrl();
    });
  });
}

function updateDocsEditorMode() {
  if (!els.docsList) return;
  const mobile = MOBILE_MQ.matches;
  els.docsList.hidden = !mobile;
  if (mobile) renderDocsList();
}

function updateDocWarning() {
  if (!els.docs) return;
  const raw = els.docs.value || "";
  const docs = parseDocs(raw);
  const n = docs.length;
  const lengths = docs.map((d) => d.length);
  const maxLen = lengths.length ? Math.max(...lengths) : 0;
  const overChars = lengths.filter((l) => l > PASSAGE_CHAR_WARN).length;

  if (els.docCharStats) {
    if (n > 0) {
      els.docCharStats.hidden = false;
      let stat = L(
        `${n} passage${n === 1 ? "" : "s"} · longest ${maxLen} chars`,
        `${n} 段 · 最长 ${maxLen} 字符`
      );
      if (overChars) {
        stat += L(
          ` · ${overChars} over ${PASSAGE_CHAR_WARN} (may truncate)`,
          ` · ${overChars} 段超过 ${PASSAGE_CHAR_WARN}（可能被截断）`
        );
      }
      els.docCharStats.textContent = stat;
      els.docCharStats.classList.toggle("warn-chars", overChars > 0);
    } else {
      els.docCharStats.hidden = true;
    }
  }

  if (!els.docWarning) return;
  const fmt = inputFormatHint(raw);
  const parts = [];
  if (fmt) parts.push(fmt);
  if (n > MAX_DOCS) {
    parts.push(
      L(
        `Warning: ${n} passages — scoring more than ${MAX_DOCS} may freeze the tab. Consider trimming the list.`,
        `警告：共 ${n} 段文本 —— 超过 ${MAX_DOCS} 段可能导致页面卡顿，建议精简列表。`
      )
    );
  } else if (n > MAX_DOCS * 0.75) {
    parts.push(
      L(
        `${n} passages — approaching the recommended limit of ${MAX_DOCS}.`,
        `共 ${n} 段 —— 接近建议上限 ${MAX_DOCS}。`
      )
    );
  }
  if (parts.length) {
    els.docWarning.hidden = false;
    els.docWarning.textContent = parts.join(" · ");
  } else {
    els.docWarning.hidden = true;
  }
}

function formatError(err, ctx) {
  const msg = (err?.message || String(err)).toLowerCase();
  const { useWebgpu, docCount } = ctx || {};
  if (/webgpu|gpu|device/.test(msg) && useWebgpu) {
    return L(
      "WebGPU error — uncheck “Use WebGPU” and retry on WASM/CPU.",
      "WebGPU 出错 —— 请取消勾选“使用 WebGPU”，改用 WASM/CPU 重试。"
    );
  }
  if (/fetch|network|failed to fetch|timeout|abort|cors|download|load/.test(msg)) {
    return L(
      "Network error — model files could not download. Check your connection or ad-blocker, then retry.",
      "网络错误 —— 模型文件下载失败。请检查网络或广告拦截器后重试。"
    );
  }
  if (/memory|oom|allocation|out of memory/.test(msg)) {
    return L(
      "Memory limit — try fewer passages, close other tabs, or pick a smaller model (jina-tiny).",
      "内存不足 —— 请减少候选段落、关闭其他标签页，或选择更小模型（jina-tiny）。"
    );
  }
  if (docCount > MAX_DOCS) {
    return L(
      `Too many passages (${docCount}). Trim to ${MAX_DOCS} or fewer.`,
      `候选过多（${docCount}）。请精简到 ${MAX_DOCS} 条以内。`
    );
  }
  if (/token|length|truncat|sequence|max/.test(msg)) {
    return L(
      "Text too long — shorten the query or individual passages.",
      "文本过长 —— 请缩短查询或单段候选文本。"
    );
  }
  return L("Something went wrong: ", "出错了：") + (err?.message || String(err));
}

function bytesToBase64Url(bytes) {
  let bin = "";
  const step = 0x8000;
  for (let i = 0; i < bytes.length; i += step) {
    bin += String.fromCharCode(...bytes.subarray(i, i + step));
  }
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBytes(b64) {
  const pad = b64.length % 4 ? "=".repeat(4 - (b64.length % 4)) : "";
  const std = (b64 + pad).replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(std);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function gzipToBase64Url(text) {
  if (typeof CompressionStream === "undefined") return null;
  const stream = new Blob([new TextEncoder().encode(text)])
    .stream()
    .pipeThrough(new CompressionStream("gzip"));
  const buf = await new Response(stream).arrayBuffer();
  return bytesToBase64Url(new Uint8Array(buf));
}

async function base64UrlToGunzip(b64) {
  const stream = new Blob([base64UrlToBytes(b64)])
    .stream()
    .pipeThrough(new DecompressionStream("gzip"));
  return new Response(stream).text();
}

function buildShareParams() {
  const query = (els.query?.value || "").trim();
  const docs = els.docs?.value || "";
  if (!query && !docs) return null;
  const p = new URLSearchParams();
  if (query) p.set("q", query);
  if (docs) p.set("docs", docs);
  if (els.model?.value) p.set("m", els.model.value);
  if (els.compareToggle?.checked && els.modelB?.value) p.set("m2", els.modelB.value);
  return p;
}

function applyShareState(state) {
  if (state.q && els.query) els.query.value = state.q;
  if (state.docs && els.docs) els.docs.value = state.docs;
  if (state.m && MODELS[state.m] && els.model) els.model.value = state.m;
  if (state.m2 && MODELS[state.m2] && els.modelB) {
    els.modelB.value = state.m2;
    if (els.compareToggle) {
      els.compareToggle.checked = true;
      els.modelB.disabled = false;
    }
  }
  if (state.q || state.docs) {
    currentPreset = null;
    userEdited = true;
    renderPresets();
  }
  updateDocWarning();
  if (MOBILE_MQ.matches) renderDocsList();
}

async function syncUrl() {
  const p = buildShareParams();
  if (!p) return;
  const plain = "?" + p.toString();
  const plainLen = location.pathname.length + plain.length;
  if (plainLen > URL_COMPRESS_THRESHOLD && typeof CompressionStream !== "undefined") {
    const payload = {};
    if (p.has("q")) payload.q = p.get("q");
    if (p.has("docs")) payload.docs = p.get("docs");
    if (p.has("m")) payload.m = p.get("m");
    if (p.has("m2")) payload.m2 = p.get("m2");
    try {
      const z = await gzipToBase64Url(JSON.stringify(payload));
      const compressed = "?z=" + z;
      if (z && location.pathname.length + compressed.length < plainLen) {
        history.replaceState(null, "", compressed);
        return;
      }
    } catch (e) {
      /* fall through to plain params */
    }
  }
  history.replaceState(null, "", plain);
}

async function loadFromUrl() {
  const p = new URLSearchParams(location.search);
  if (p.has("z")) {
    try {
      const state = JSON.parse(await base64UrlToGunzip(p.get("z")));
      applyShareState(state);
      return;
    } catch (e) {
      console.warn("Failed to decompress share URL", e);
    }
  }
  const state = {};
  if (p.has("q")) state.q = p.get("q");
  if (p.has("docs")) state.docs = p.get("docs");
  if (p.has("m")) state.m = p.get("m");
  if (p.has("m2")) state.m2 = p.get("m2");
  if (Object.keys(state).length) applyShareState(state);
}

async function shareLink() {
  await syncUrl();
  const url = location.href;
  try {
    await navigator.clipboard.writeText(url);
    if (els.share) {
      const orig = els.share.textContent;
      els.share.textContent = L("Link copied ✓", "链接已复制 ✓");
      setTimeout(() => {
        els.share.textContent = orig;
      }, 1400);
    }
  } catch (e) {
    setStatus(L("Could not copy link", "无法复制链接"), false);
  }
}

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
          `| ${r.rank} | #${r.originalPosition} | ${r.score.toFixed(4)} | ${r.text.replace(/\|/g, "\\|")} |`
      )
      .join("\n");
  return head + table + "\n";
}

function escCsvCell(s) {
  const t = String(s);
  if (/[",\n\r]/.test(t)) return `"${t.replace(/"/g, '""')}"`;
  return t;
}

function exportCsv() {
  const rows = rankedForExport();
  const lines = [
    "rank,original_position,score,passage",
    ...rows.map(
      (r) =>
        `${r.rank},${r.originalPosition},${r.score},${escCsvCell(r.text)}`
    ),
  ];
  return lines.join("\n") + "\n";
}

async function copyText(text, btn) {
  const ok = L("Copied ✓", "已复制 ✓");
  const original = btn.textContent;
  try {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
    else throw new Error("no clipboard");
    btn.textContent = ok;
  } catch (e) {
    btn.textContent = L("Copy failed", "复制失败");
  }
  setTimeout(() => {
    btn.textContent = original;
  }, 1400);
}

async function scoreWithModel(modelId, query, docs, useWebgpu) {
  const device = useWebgpu ? "webgpu" : "wasm";
  const cacheKey = modelId + ":" + device;
  const cachedInTab = cache.has(cacheKey);
  showLoadPanel(modelId, cachedInTab);
  if (cachedInTab && els.loadCacheStatus) {
    els.loadCacheStatus.textContent = L("In tab memory", "已在标签页内存");
    if (els.loadPct) els.loadPct.textContent = L("Ready", "就绪");
  }

  const files = {};
  let didDownload = false;
  const onProgress = (p) => {
    if (p.status === "progress" && p.file) {
      didDownload = true;
      files[p.file] = { loaded: p.loaded || 0, total: p.total || 0 };
      updateLoadProgress(modelId, files, p.file, cachedInTab);
      if (els.loadCacheStatus) {
        els.loadCacheStatus.textContent = L("Downloading", "正在下载");
      }
    } else if (p.status === "done" && !didDownload && els.loadCacheStatus) {
      els.loadCacheStatus.textContent = L("Browser cache hit", "浏览器缓存命中");
    }
  };
  const reranker = await getReranker(modelId, onProgress, useWebgpu);
  const t0 = performance.now();
  const scores = await reranker.score(query, docs);
  const ms = Math.round(performance.now() - t0);
  const bytes = Object.values(files).reduce((a, b) => a + b.loaded, 0);
  return { scores, ms, didDownload, bytes };
}

async function run() {
  const query = (els.query?.value || "").trim();
  const docs = parseDocs(els.docs?.value || "");
  if (!query)
    return setStatus(L("Enter a query first.", "请先输入一个查询。"), false);
  if (docs.length < 2)
    return setStatus(
      L("Add at least two candidate passages (one per line).", "请至少添加两段候选文本（每行一段）。"),
      false
    );
  if (docs.length > MAX_DOCS)
    return setStatus(
      L(
        `Too many passages (${docs.length}). Trim to ${MAX_DOCS} or fewer.`,
        `候选过多（${docs.length}）。请精简到 ${MAX_DOCS} 条以内。`
      ),
      false
    );

  const modelId = els.model.value;
  const compareOn = els.compareToggle?.checked;
  const modelB = els.modelB?.value;
  const useWebgpu = !!(els.webgpuToggle?.checked && (await probeWebGPU()));

  els.run.disabled = true;
  setStatus(L("Loading model…", "正在加载模型……"), true);

  try {
    const biScores = biEncoderProxyScores(query, docs);
    const primary = await scoreWithModel(modelId, query, docs, useWebgpu);
    hideLoadPanel();

    const items = docs.map((text, origIndex) => ({
      text,
      origIndex,
      score: primary.scores[origIndex],
    }));
    const biItems = docs.map((text, origIndex) => ({
      text,
      origIndex,
      score: biScores[origIndex],
    }));

    let compareRun = null;
    if (compareOn && modelB && modelB !== modelId) {
      setStatus(L("Scoring with second model…", "正在为第二个模型打分……"), true);
      const second = await scoreWithModel(modelB, query, docs, useWebgpu);
      compareRun = {
        modelA: modelId,
        modelB,
        msB: second.ms,
        itemsA: items,
        itemsB: docs.map((text, origIndex) => ({
          text,
          origIndex,
          score: second.scores[origIndex],
        })),
      };
    }

    renderResults({
      query,
      items,
      biItems,
      modelId,
      ms: primary.ms,
      didDownload: primary.didDownload,
      bytes: primary.bytes,
      compareRun,
    });
    renderModelMeta();
    void syncUrl();
    setStatus(
      L(
        `Done — ${docs.length} passages in ${primary.ms} ms (cross-encoder) + bi-encoder proxy shown for comparison.`,
        `完成 —— ${docs.length} 段文本 cross-encoder 耗时 ${primary.ms} ms，并已展示 bi-encoder 代理对比。`
      ),
      false
    );
    els.region?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } catch (err) {
    console.error(err);
    hideLoadPanel();
    setStatus(formatError(err, { useWebgpu, docCount: docs.length }), false);
  } finally {
    els.run.disabled = false;
  }
}

function clearAll() {
  if (els.query) els.query.value = "";
  if (els.docs) els.docs.value = "";
  if (els.region) els.region.hidden = true;
  if (els.dualRegion) els.dualRegion.hidden = true;
  if (els.dualDiff) els.dualDiff.hidden = true;
  hideLoadPanel();
  lastRun = null;
  currentPreset = SAMPLES[0].id;
  userEdited = false;
  history.replaceState(null, "", location.pathname);
  renderPresets();
  loadPreset(currentPreset);
  idleStatus();
  if (els.query) els.query.focus();
}

if (els.run) els.run.addEventListener("click", run);
if (els.clear) els.clear.addEventListener("click", clearAll);
if (els.share) els.share.addEventListener("click", shareLink);
if (els.query) {
  els.query.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      run();
    }
  });
  els.query.addEventListener("input", () => {
    markEdited();
    void syncUrl();
  });
}
if (els.docs) {
  els.docs.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      run();
    }
  });
  els.docs.addEventListener("input", () => {
    markEdited();
    updateDocWarning();
    if (MOBILE_MQ.matches) renderDocsList();
    void syncUrl();
  });
}
if (els.docsAddBtn) {
  els.docsAddBtn.addEventListener("click", () => {
    if (!els.docsListItems) return;
    const row = document.createElement("div");
    row.className = "docs-list-row";
    const n = els.docsListItems.querySelectorAll(".docs-list-row").length + 1;
    row.innerHTML = `
      <span class="docs-list-num">${n}<small class="docs-list-chars">0</small></span>
      <textarea class="docs-list-input" rows="2" aria-label="${L("Passage", "候选段落")} ${n}"></textarea>
      <button type="button" class="docs-list-del" aria-label="${L("Remove passage", "删除段落")}">×</button>`;
    els.docsListItems.appendChild(row);
    row.querySelector(".docs-list-input").addEventListener("input", () => {
      const ta = row.querySelector(".docs-list-input");
      const ch = row.querySelector(".docs-list-chars");
      if (ta && ch) {
        ch.textContent = ta.value.length;
        ch.classList.toggle("over", ta.value.length > PASSAGE_CHAR_WARN);
      }
      syncTextareaFromList();
      markEdited();
      void syncUrl();
    });
    row.querySelector(".docs-list-del").addEventListener("click", () => {
      row.remove();
      syncTextareaFromList();
      markEdited();
      void syncUrl();
    });
    row.querySelector(".docs-list-input").focus();
  });
}
if (typeof MOBILE_MQ.addEventListener === "function") {
  MOBILE_MQ.addEventListener("change", updateDocsEditorMode);
} else {
  MOBILE_MQ.addListener(updateDocsEditorMode);
}
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    document.activeElement &&
    (document.activeElement === els.query || document.activeElement === els.docs)
  ) {
    clearAll();
  }
});
if (els.copyJson)
  els.copyJson.addEventListener("click", () => copyText(exportJson(), els.copyJson));
if (els.copyMd)
  els.copyMd.addEventListener("click", () => copyText(exportMarkdown(), els.copyMd));
if (els.copyCsv)
  els.copyCsv.addEventListener("click", () => copyText(exportCsv(), els.copyCsv));

function markEdited() {
  if (!userEdited) {
    userEdited = true;
    renderPresets();
  }
}

function idleStatus() {
  setStatus(
    L(
      "Ready. Pick a scenario or paste your own, then click “Rerank”. Enter in query · Ctrl+Enter in passages · Esc to clear.",
      "准备就绪。选择示例或粘贴内容，点击“重排序”。查询框 Enter · 段落 Ctrl+Enter · Esc 清空。"
    ),
    false
  );
}

renderModelMeta();
renderPresets();
updateDocsEditorMode();
void (async function initFromUrl() {
  if (location.search) await loadFromUrl();
  if (!(els.query?.value || "").trim() && !parseDocs(els.docs?.value || "").length) {
    loadPreset(currentPreset);
  }
  idleStatus();
})();

document.addEventListener("i18n:changed", function () {
  if (els.model) {
    const sel = els.model.value;
    fillModelSelect(els.model, sel);
    if (els.modelB) fillModelSelect(els.modelB, els.modelB.value);
  }
  renderModelMeta();
  renderPresets();
  updateDocWarning();
  updateDocsEditorMode();
  if (currentPreset && !userEdited) {
    const keepStatus = els.status?.textContent || "";
    loadPreset(currentPreset);
    if (/Ready|准备就绪/.test(keepStatus)) idleStatus();
  }
  if (lastRun) renderResults(lastRun);
});
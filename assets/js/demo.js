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
    label: "ms-marco MiniLM-L6 (≈90 MB) — sturdy default",
    sigmoid: true,
  },
  "jinaai/jina-reranker-v1-tiny-en": {
    label: "jina-reranker v1 tiny (≈33 MB) — fastest",
    sigmoid: true,
  },
  "mixedbread-ai/mxbai-rerank-xsmall-v1": {
    label: "mxbai-rerank xsmall (≈70 MB) — strong quality",
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

/* ---------------- UI wiring ---------------- */

const els = {
  model: document.getElementById("model-select"),
  query: document.getElementById("query-input"),
  docs: document.getElementById("docs-input"),
  run: document.getElementById("run-btn"),
  sample: document.getElementById("sample-btn"),
  status: document.getElementById("status"),
  progressWrap: document.getElementById("progress-wrap"),
  progressBar: document.getElementById("progress-bar"),
  results: document.getElementById("results"),
  resultsHead: document.getElementById("results-head"),
};

// Populate model dropdown
if (els.model) {
  Object.entries(MODELS).forEach(([id, m], i) => {
    const opt = document.createElement("option");
    opt.value = id;
    opt.textContent = m.label;
    if (i === 0) opt.selected = true;
    els.model.appendChild(opt);
  });
}

const SAMPLE = {
  query: "How do I add a reranking step to my RAG pipeline?",
  docs: [
    "A reranker takes the query and each retrieved chunk together and outputs a precise relevance score, so you can reorder the top-k before sending them to the LLM.",
    "Bi-encoders embed the query and documents separately, which is fast for first-stage retrieval but less accurate at fine-grained ranking.",
    "London is the capital of the United Kingdom and one of the most populous cities in Europe.",
    "To wire a cross-encoder into RAG: retrieve 50–100 candidates with vector search, rerank them, then keep the top 5 for the prompt.",
    "Bananas are a good source of potassium and are popular in smoothies and baking.",
    "Cohere Rerank, Jina Reranker and bge-reranker are common hosted or open options for the reranking stage.",
  ],
};

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
  return s.replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );
}

function render(query, scored) {
  if (!els.results) return;
  const max = Math.max(...scored.map((s) => s.score), 0.0001);
  els.resultsHead.style.display = "block";
  els.results.innerHTML = scored
    .map((s, i) => {
      const pct = Math.round((s.score / max) * 100);
      const delta = s.origIndex - i;
      let deltaHtml = '<span class="delta">no move</span>';
      if (delta > 0) deltaHtml = `<span class="delta up">▲ up ${delta}</span>`;
      else if (delta < 0)
        deltaHtml = `<span class="delta down">▼ down ${-delta}</span>`;
      return `
        <div class="result-item ${i === 0 ? "top" : ""}" style="animation-delay:${i * 40}ms">
          <div class="result-head">
            <div><span class="rank">${i + 1}</span><span class="muted" style="font-size:.8rem">was #${s.origIndex + 1}</span>${deltaHtml}</div>
            <div class="result-score">${s.score.toFixed(4)}</div>
          </div>
          <div class="result-text">${esc(s.text)}</div>
          <div class="score-track"><i style="width:${pct}%"></i></div>
        </div>`;
    })
    .join("");
}

async function run() {
  const query = (els.query.value || "").trim();
  const docs = parseDocs(els.docs.value || "");
  if (!query) return setStatus("Enter a query first.", false);
  if (docs.length < 2)
    return setStatus("Add at least two candidate passages (one per line).", false);

  const modelId = els.model.value;
  els.run.disabled = true;
  setStatus("Loading model… first run downloads weights, then they are cached.", true);
  showProgress(0);

  const seen = {};
  const onProgress = (p) => {
    if (p.status === "progress" && p.file) {
      seen[p.file] = p.progress || 0;
      const vals = Object.values(seen);
      const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
      showProgress(Math.min(99, Math.round(avg)));
      setStatus(`Downloading model weights… ${Math.round(avg)}%`, true);
    }
  };

  try {
    const reranker = await getReranker(modelId, onProgress);
    showProgress(100);
    setStatus("Scoring candidates…", true);
    const t0 = performance.now();
    const scores = await reranker.score(query, docs);
    const ms = Math.round(performance.now() - t0);

    const scored = docs
      .map((text, origIndex) => ({ text, origIndex, score: scores[origIndex] }))
      .sort((a, b) => b.score - a.score);

    render(query, scored);
    showProgress(null);
    setStatus(
      `Done — reranked ${docs.length} passages in ${ms} ms, fully in your browser.`,
      false
    );
  } catch (err) {
    console.error(err);
    showProgress(null);
    setStatus("Something went wrong: " + (err && err.message ? err.message : err), false);
  } finally {
    els.run.disabled = false;
  }
}

function loadSample() {
  if (els.query) els.query.value = SAMPLE.query;
  if (els.docs) els.docs.value = SAMPLE.docs.join("\n");
  setStatus("Sample loaded — hit “Rerank” to see scores.", false);
}

if (els.run) els.run.addEventListener("click", run);
if (els.sample) els.sample.addEventListener("click", loadSample);

// Preload a sample so the demo never looks empty.
loadSample();
setStatus('Ready. Click “Rerank” to load the model and score.', false);

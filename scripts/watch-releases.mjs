#!/usr/bin/env node
/**
 * Looks for reranker releases the site doesn't cover yet, from official
 * channels only:
 *
 *   - Hugging Face, new: rerankers created after `hf_since` — any model the
 *     organisations in `hf_authors` publish, plus any `text-ranking` model on
 *     the Hub with at least `hf_new_min_likes` likes (community re-uploads
 *     and quantisations of other people's models are left out);
 *   - Hugging Face, catch-up: `text-ranking` models with at least
 *     `hf_catchup_min_likes` likes, whenever they came out, that no page
 *     on the site mentions — popular releases the watch started too late for;
 *   - vendor pages for hosted APIs (Cohere, Voyage, Jina): model IDs
 *     matching each page's `pattern` that aren't in its `known` list;
 *   - GitHub releases of the libraries the site's code and guides depend on
 *     (`libraries`): a stable release newer than `known`.
 *
 * Config and memory live in data/release-watch.json. Whoever handles a
 * release (adds it to the site, or decides it isn't worth adding) appends it
 * to hf_seen / known, so it isn't reported again.
 *
 *   node scripts/watch-releases.mjs              # report; exit 0 either way
 *   node scripts/watch-releases.mjs --baseline   # print every ID each page has now
 *   node scripts/watch-releases.mjs --issue      # also open/extend a GitHub issue
 *                                                # (needs GITHUB_TOKEN, GITHUB_REPOSITORY)
 *
 * A source that can't be fetched is a warning, not a failure: this is a
 * lookout, and the daily fact check already fails loudly on vendor outages.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG_PATH = path.join(ROOT, "data/release-watch.json");
const CONFIG = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
const BASELINE = process.argv.includes("--baseline");
const ISSUE = process.argv.includes("--issue");
const LABEL = "release-watch";
const UA = { "user-agent": "reranker.uk release watch (+https://reranker.uk)" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url, as = "text") {
  for (let attempt = 0; ; attempt++) {
    const auth = url.startsWith("https://api.github.com/") && process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {};
    const res = await fetch(url, { headers: { ...UA, ...auth }, signal: AbortSignal.timeout(30_000) });
    if (res.ok) return as === "json" ? res.json() : res.text();
    if ((res.status === 429 || res.status >= 500) && attempt < 2) {
      await sleep(5000 * (attempt + 1));
      continue;
    }
    throw new Error(`HTTP ${res.status}`);
  }
}

const warnings = [];
const found = []; // { key, source, title, url, detail }
// RELEASE_WATCH_SINCE overrides hf_since for a one-off look further back.
const since = Date.parse(process.env.RELEASE_WATCH_SINCE || CONFIG.hf_since);
const seen = new Set(CONFIG.hf_seen.map((s) => s.toLowerCase()));
const tracked = new Set(CONFIG.hf_authors.map((a) => a.toLowerCase()));
// Hugging Face's own task tag for rerankers is `text-ranking`; the name test
// catches models published without it.
const isReranker = (m) => m.pipeline_tag === "text-ranking" || /rerank|cross-encoder|colbert/i.test(m.id);
// A GGUF/MLX/AWQ… copy of someone else's model is a packaging, not a release.
const isRepack = (id) => /gguf|mlx|awq|gptq|nvfp4|fp8|int[48]|[-_]\d+bit|onnx|seq-cls|-vllm\b/i.test(id);
const hfModel = (m, source, detail) => {
  const id = m.id || m.modelId;
  if (!id || seen.has(id.toLowerCase()) || found.some((f) => f.key === id)) return;
  found.push({ key: id, source, title: id, url: `https://huggingface.co/${id}`, detail });
};
const stats = (m) => `created ${m.createdAt?.slice(0, 10)}, ${m.likes ?? 0} likes, ${m.downloads ?? 0} downloads`;
const HF = "https://huggingface.co/api/models?full=false";

// --- Hugging Face, new, by organisation
for (const author of CONFIG.hf_authors) {
  try {
    for (const m of await get(`${HF}&author=${encodeURIComponent(author)}&sort=createdAt&direction=-1&limit=50`, "json")) {
      if (isReranker(m) && Date.parse(m.createdAt) > since) hfModel(m, `Hugging Face · ${author}`, stats(m));
    }
  } catch (err) {
    warnings.push(`Hugging Face ${author}: ${err.message}`);
  }
}

// --- Hugging Face, new, from anyone (the list is newest first)
try {
  for (const m of await get(`${HF}&pipeline_tag=text-ranking&sort=createdAt&direction=-1&limit=500`, "json")) {
    if (Date.parse(m.createdAt) <= since) break;
    const author = m.id.split("/")[0].toLowerCase();
    if ((m.likes ?? 0) < CONFIG.hf_new_min_likes || (isRepack(m.id) && !tracked.has(author))) continue;
    hfModel(m, "Hugging Face · new text-ranking model", `${stats(m)} — not from a tracked organisation; check who published it`);
  }
} catch (err) {
  warnings.push(`Hugging Face new: ${err.message}`);
}

// --- Hugging Face, catch-up: popular rerankers no page mentions
// The site's own pages are the record of what it covers, so a model it
// names anywhere (even to say it was left out) is not reported.
const siteText = (() => {
  const out = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".html")) out.push(fs.readFileSync(p, "utf8"));
    }
  };
  walk(path.join(ROOT, "src/pages"));
  return out.join("\n").toLowerCase();
})();
try {
  for (const m of await get(`${HF}&pipeline_tag=text-ranking&sort=likes&direction=-1&limit=200`, "json")) {
    if ((m.likes ?? 0) < CONFIG.hf_catchup_min_likes) break;
    const name = m.id.split("/")[1].toLowerCase();
    if (isRepack(m.id) || siteText.includes(name)) continue;
    hfModel(m, "Hugging Face · popular, never covered", `${stats(m)} — the site doesn't mention it anywhere`);
  }
} catch (err) {
  warnings.push(`Hugging Face catch-up: ${err.message}`);
}

// --- libraries the site's code and guides depend on
for (const lib of CONFIG.libraries) {
  try {
    const releases = await get(`https://api.github.com/repos/${lib.repo}/releases?per_page=10`, "json");
    const latest = releases.find((r) => !r.prerelease && !r.draft);
    if (BASELINE) {
      console.log(`${lib.repo}: ${latest?.tag_name}`);
      continue;
    }
    if (latest && latest.tag_name !== lib.known) {
      found.push({
        key: `${lib.repo}@${latest.tag_name}`,
        source: `GitHub releases · ${lib.repo}`,
        title: `${lib.repo} ${latest.tag_name}`,
        url: latest.html_url,
        detail: `released ${latest.published_at?.slice(0, 10)}; the site was last checked against ${lib.known} — ${lib.why}`,
        notes: latest.body || "",
      });
    }
  } catch (err) {
    warnings.push(`${lib.repo}: ${err.message}`);
  }
}

// --- vendor pages for hosted APIs
const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", nbsp: " " };
for (const page of CONFIG.pages) {
  try {
    const text = (await get(page.url)).replace(/&(#?\w+);/g, (m, e) => ENTITIES[e] ?? m);
    const ids = [...new Set([...text.matchAll(new RegExp(page.pattern, "gi"))].map((m) => m[0].toLowerCase()))].sort();
    if (BASELINE) {
      console.log(`${page.name} (${page.url}):\n  ${JSON.stringify(ids)}`);
      continue;
    }
    if (!ids.length) warnings.push(`${page.name}: no IDs matched ${page.pattern} — page moved or pattern stale?`);
    const known = new Set(page.known.map((k) => k.toLowerCase()));
    for (const id of ids.filter((i) => !known.has(i))) {
      found.push({ key: `${page.name}: ${id}`, source: page.name, title: id, url: page.url, detail: "new model ID on the vendor's page" });
    }
  } catch (err) {
    warnings.push(`${page.name}: ${err.message}`);
  }
}
if (BASELINE) process.exit(0);

for (const w of warnings) console.log(`⚠ ${w}`);
if (!found.length) {
  console.log("No new reranker releases.");
  process.exit(0);
}
// For Hugging Face finds, attach the repo metadata and model card, so the
// review can read the vendor's own words from the issue — it often runs
// where huggingface.co isn't reachable.
async function evidence(f) {
  const fence = "~~~~";
  if (f.notes) {
    return `<details><summary>${f.title}: release notes</summary>\n\n${fence}markdown\n${f.notes.slice(0, 12000)}\n${fence}\n</details>`;
  }
  if (!f.url.startsWith("https://huggingface.co/")) return "";
  const id = f.url.slice("https://huggingface.co/".length);
  try {
    const m = await get(`https://huggingface.co/api/models/${id}`, "json");
    const files = (m.siblings || []).map((x) => x.rfilename);
    const meta = {
      license: m.cardData?.license,
      base_model: m.cardData?.base_model,
      pipeline_tag: m.pipeline_tag,
      languages: m.cardData?.language,
      gated: m.gated,
      has_weights: files.some((x) => /\.(safetensors|bin|onnx|gguf|pt|pth)$/.test(x)),
      files: files.length > 25 ? [...files.slice(0, 25), `…${files.length - 25} more`] : files,
    };
    let card;
    try {
      card = (await get(`https://huggingface.co/${id}/raw/main/README.md`)).slice(0, 12000);
    } catch (err) {
      card = `(README not fetched: ${err.message})`;
    }
    return `<details><summary>${id}: metadata and model card</summary>\n\n${fence}json\n${JSON.stringify(meta, null, 1)}\n${fence}\n\n${fence}markdown\n${card}\n${fence}\n</details>`;
  } catch (err) {
    return `${id}: metadata not fetched (${err.message})`;
  }
}
const postEvidence = async (number, items) => {
  for (const f of items) {
    const body = await evidence(f);
    if (body) await gh("POST", `/issues/${number}/comments`, { body });
  }
};

const lines = found.map((f) => `- [ ] **${f.title}** — ${f.source} — ${f.url} (${f.detail})`);
console.log(`${found.length} new:\n${lines.join("\n")}`);

if (!ISSUE) process.exit(0);

// --- one open issue at a time; later finds are appended as comments
const repo = process.env.GITHUB_REPOSITORY;
const gh = async (method, endpoint, body) => {
  const res = await fetch(`https://api.github.com/repos/${repo}${endpoint}`, {
    method,
    headers: {
      authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      accept: "application/vnd.github+json",
      "content-type": "application/json",
      ...UA,
    },
    body: body && JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GitHub ${method} ${endpoint}: HTTP ${res.status} ${await res.text()}`);
  return res.json();
};
const [open] = await gh("GET", `/issues?labels=${LABEL}&state=open&per_page=1`);
const howTo =
  "Verify each against the vendor's own announcement before touching the site. Once handled (added, or judged not worth adding), " +
  "append it to `hf_seen` or the page's `known` list in `data/release-watch.json` so it isn't reported again, then close this issue.";
if (!open) {
  const issue = await gh("POST", "/issues", {
    title: `Release watch: ${found.length} new reranker release${found.length > 1 ? "s" : ""}`,
    labels: [LABEL],
    body: `${lines.join("\n")}\n\n${howTo}`,
  });
  console.log(`Opened ${issue.html_url}`);
  await postEvidence(issue.number, found);
} else {
  const comments = await gh("GET", `/issues/${open.number}/comments?per_page=100`);
  const already = [open.body, ...comments.map((c) => c.body)].join("\n");
  const fresh = found.filter((f) => !already.includes(`**${f.title}**`));
  if (fresh.length) {
    await gh("POST", `/issues/${open.number}/comments`, {
      body: fresh.map((f) => `- [ ] **${f.title}** — ${f.source} — ${f.url} (${f.detail})`).join("\n"),
    });
    await postEvidence(open.number, fresh);
    console.log(`Added ${fresh.length} to ${open.html_url}`);
  } else {
    console.log(`All already listed in ${open.html_url}`);
  }
}

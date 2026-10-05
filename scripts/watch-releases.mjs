#!/usr/bin/env node
/**
 * Looks for reranker releases the site doesn't cover yet, from official
 * channels only:
 *
 *   - Hugging Face: reranker models created after `hf_since` by the
 *     organisations in `hf_authors`, plus any new reranker trending on the
 *     Hub with at least `hf_trending_min_likes` likes;
 *   - vendor pages for hosted APIs (Cohere, Voyage, Jina): model IDs
 *     matching each page's `pattern` that aren't in its `known` list.
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
    const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(30_000) });
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
const isReranker = (id) => /rerank|cross-encoder|colbert/i.test(id);

// --- Hugging Face, by organisation
for (const author of CONFIG.hf_authors) {
  const url = `https://huggingface.co/api/models?author=${encodeURIComponent(author)}&sort=createdAt&direction=-1&limit=50&full=false`;
  try {
    for (const m of await get(url, "json")) {
      const id = m.id || m.modelId;
      if (!id || !isReranker(id) || seen.has(id.toLowerCase())) continue;
      if (Date.parse(m.createdAt) <= since) continue;
      found.push({
        key: id,
        source: `Hugging Face · ${author}`,
        title: id,
        url: `https://huggingface.co/${id}`,
        detail: `created ${m.createdAt?.slice(0, 10)}, ${m.likes ?? 0} likes, ${m.downloads ?? 0} downloads`,
      });
    }
  } catch (err) {
    warnings.push(`Hugging Face ${author}: ${err.message}`);
  }
}

// --- Hugging Face, trending rerankers from anyone
try {
  const url = "https://huggingface.co/api/models?search=rerank&sort=trendingScore&direction=-1&limit=40&full=false";
  for (const m of await get(url, "json")) {
    const id = m.id || m.modelId;
    if (!id || seen.has(id.toLowerCase()) || found.some((f) => f.key === id)) continue;
    if (Date.parse(m.createdAt) <= since || (m.likes ?? 0) < CONFIG.hf_trending_min_likes) continue;
    found.push({
      key: id,
      source: "Hugging Face · trending",
      title: id,
      url: `https://huggingface.co/${id}`,
      detail: `created ${m.createdAt?.slice(0, 10)}, ${m.likes} likes — not from a tracked organisation; check who published it`,
    });
  }
} catch (err) {
  warnings.push(`Hugging Face trending: ${err.message}`);
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
      has_weights: files.some((x) => /\.(safetensors|bin|onnx|gguf)$/.test(x)),
      files: files.length > 25 ? [...files.slice(0, 25), `…${files.length - 25} more`] : files,
    };
    let card;
    try {
      card = (await get(`https://huggingface.co/${id}/raw/main/README.md`)).slice(0, 12000);
    } catch (err) {
      card = `(README not fetched: ${err.message})`;
    }
    const fence = "~~~~";
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

#!/usr/bin/env node
/**
 * Fetches pages for a reviewer who can't reach them (the scheduled release
 * review often runs where huggingface.co and vendor sites are blocked) and
 * posts their text as comments on a GitHub issue, which the reviewer can read
 * through the REST API.
 *
 *   URLS="https://… https://…" ISSUE=42 node scripts/fetch-for-review.mjs
 *
 * Run by .github/workflows/fetch-for-review.yml (needs GITHUB_TOKEN and
 * GITHUB_REPOSITORY). HTML is reduced to text; Markdown, JSON and plain text
 * are posted as is. Each page is capped so a comment stays under GitHub's
 * 65,536-character limit.
 */
const urls = (process.env.URLS || "").split(/\s+/).filter(Boolean);
const issue = process.env.ISSUE;
const repo = process.env.GITHUB_REPOSITORY;
if (!urls.length || !issue) {
  console.error("URLS and ISSUE are required");
  process.exit(1);
}
const MAX = 60_000;
const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", nbsp: " ", "#8211": "–", "#8212": "—", "#8217": "’" };
const toText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<(br|\/p|\/h\d|\/li|\/tr|\/div)[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(#?\w+);/g, (m, e) => ENTITIES[e] ?? m)
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n\n")
    .trim();

for (const url of urls) {
  let body;
  try {
    const res = await fetch(url, {
      headers: { "user-agent": "reranker.uk fetch-for-review (+https://reranker.uk)" },
      signal: AbortSignal.timeout(30_000),
    });
    const raw = await res.text();
    const html = /html/i.test(res.headers.get("content-type") || "");
    const text = html ? toText(raw) : raw;
    const cut = text.length > MAX ? `${text.slice(0, MAX)}\n…(${text.length - MAX} more characters)` : text;
    body = `**${url}** — HTTP ${res.status}${res.url !== url ? `, redirected to ${res.url}` : ""}\n\n~~~~text\n${cut}\n~~~~`;
  } catch (err) {
    body = `**${url}** — could not fetch (${err.message})`;
  }
  const res = await fetch(`https://api.github.com/repos/${repo}/issues/${issue}/comments`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      accept: "application/vnd.github+json",
      "content-type": "application/json",
    },
    body: JSON.stringify({ body }),
  });
  console.log(`${url}: ${res.ok ? "posted" : `comment failed (HTTP ${res.status})`}`);
  if (!res.ok) process.exitCode = 1;
}

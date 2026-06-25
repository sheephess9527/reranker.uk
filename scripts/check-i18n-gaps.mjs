import fs from "fs";

const pages = [
  ["bge", "src/pages/models/bge-reranker.html", "public/assets/js/i18n/bge-reranker.js"],
  ["cohere", "src/pages/models/cohere-rerank.html", "public/assets/js/i18n/cohere-rerank.js"],
  ["jina", "src/pages/models/jina-reranker.html", "public/assets/js/i18n/jina-reranker.js"],
  ["voyage", "src/pages/models/voyage-rerank.html", "public/assets/js/i18n/voyage-rerank.js"],
  ["mxbai", "src/pages/models/mxbai-rerank.html", "public/assets/js/i18n/mxbai-rerank.js"],
];

const norm = (s) => (s || "").replace(/\s+/g, " ").trim();

for (const [name, htmlPath, jsPath] of pages) {
  const main = (fs.readFileSync(htmlPath, "utf8").match(/<main[\s\S]*<\/main>/) || [""])[0];
  const js = fs.readFileSync(jsPath, "utf8");
  const keys = new Set(
    [...js.matchAll(/"((?:[^"\\]|\\.)*)"\s*:/g)].map((m) => JSON.parse(`"${m[1]}"`))
  );
  const texts = new Set();
  for (const m of main.matchAll(/<(?:h[1-4]|th|strong|span class="pill[^"]*")[^>]*>([\s\S]*?)<\/(?:h[1-4]|th|strong|span)>/gi)) {
    texts.add(norm(m[1]));
  }
  for (const m of main.matchAll(/<p class="(?:meta|lead|muted)[^"]*"[^>]*>([\s\S]*?)<\/p>/gi)) {
    texts.add(norm(m[1]));
  }
  for (const m of main.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)) {
    if (!m[1].includes("<pre")) texts.add(norm(m[1]));
  }
  const missing = [...texts].filter((t) => t && !keys.has(t) && t.length > 2);
  console.log(`\n=== ${name}: ${missing.length} missing ===`);
  missing.forEach((t) => console.log(`  ${t.slice(0, 140)}`));
}
#!/usr/bin/env node
/**
 * Minimal static server for public/, replicating Cloudflare Workers Static
 * Assets' auto-trailing-slash html_handling: an extensionless request is
 * served from the matching .html file on disk, `/` and `/x/` serve
 * `index.html`, and a literal `.html` request 307s to the extensionless
 * form. Used by Playwright tests so they exercise the same URL shape
 * production serves, not an artifact of however the dev server happens to
 * resolve paths.
 */
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "public");
const PORT = Number(process.env.PORT) || 4173;

/**
 * Parses public/_headers (Cloudflare's own syntax: a path pattern line
 * followed by indented "Name: value" lines) so tests run against the same
 * response headers production serves — otherwise a Playwright test against
 * this server can't see a CSP regression at all.
 */
function loadHeaderRules() {
  const file = path.join(ROOT, "_headers");
  if (!fs.existsSync(file)) return [];
  const rules = [];
  let current = null;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    if (!line.trim()) continue;
    if (!line.startsWith(" ") && !line.startsWith("\t")) {
      current = { pattern: line.trim(), headers: {} };
      rules.push(current);
    } else if (current) {
      const idx = line.indexOf(":");
      if (idx === -1) continue;
      current.headers[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    }
  }
  return rules;
}

function headersFor(urlPath, rules) {
  const out = {};
  for (const rule of rules) {
    const matches = rule.pattern === "/*" || rule.pattern === urlPath;
    if (matches) Object.assign(out, rule.headers);
  }
  return out;
}

const headerRules = loadHeaderRules();

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  if (clean.endsWith(".html")) return { redirect: clean.replace(/\.html$/, "") };
  if (clean === "/") return { file: path.join(ROOT, "index.html") };
  if (clean.endsWith("/")) return { file: path.join(ROOT, clean, "index.html") };
  const direct = path.join(ROOT, clean.replace(/^\//, ""));
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return { file: direct };
  const withHtml = direct + ".html";
  if (fs.existsSync(withHtml)) return { file: withHtml };
  return { notFound: true, clean };
}

const server = http.createServer((req, res) => {
  const urlPath = (req.url || "/").split("?")[0].split("#")[0];
  const extraHeaders = headersFor(urlPath, headerRules);
  const result = resolve(req.url || "/");
  if (result.redirect) {
    res.writeHead(307, { Location: result.redirect, ...extraHeaders });
    return res.end();
  }
  if (result.notFound) {
    const notFoundFile = path.join(ROOT, "404.html");
    if (fs.existsSync(notFoundFile)) {
      res.writeHead(404, { "Content-Type": TYPES[".html"], ...extraHeaders });
      return fs.createReadStream(notFoundFile).pipe(res);
    }
    res.writeHead(404, extraHeaders);
    return res.end("Not found");
  }
  const ext = path.extname(result.file);
  res.writeHead(200, { "Content-Type": TYPES[ext] || "application/octet-stream", ...extraHeaders });
  fs.createReadStream(result.file).pipe(res);
});

server.listen(PORT, () => {
  console.log(`Serving public/ at http://localhost:${PORT}`);
});

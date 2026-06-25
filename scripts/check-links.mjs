import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, "..", "public");

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (f.endsWith(".html")) out.push(p);
  }
  return out;
}

function resolveHref(href) {
  if (!href || href.startsWith("http") || href.startsWith("mailto") || href.startsWith("#"))
    return null;
  let h = href.split("#")[0].split("?")[0];
  if (h === "/") return path.join(PUBLIC, "index.html");
  if (h.endsWith("/")) return path.join(PUBLIC, h.slice(1), "index.html");
  return path.join(PUBLIC, h.replace(/^\//, ""));
}

const pages = walk(PUBLIC);
const hrefRe = /href=["']([^"']+)["']/g;
const missing = new Map();

for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  let m;
  while ((m = hrefRe.exec(html))) {
    const target = resolveHref(m[1]);
    if (!target) continue;
    if (!fs.existsSync(target)) {
      const rel = path.relative(PUBLIC, file).replace(/\\/g, "/");
      if (!missing.has(m[1])) missing.set(m[1], []);
      missing.get(m[1]).push(rel);
    }
  }
}

console.log(`Checked ${pages.length} HTML files`);
if (!missing.size) {
  console.log("No broken internal links.");
} else {
  console.log(`Broken links: ${missing.size}`);
  for (const [href, refs] of missing) {
    console.log(`  ${href} <- ${refs.slice(0, 3).join(", ")}`);
  }
}
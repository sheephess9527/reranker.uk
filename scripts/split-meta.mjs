#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES = path.join(__dirname, "..", "src", "pages");

function walk(dir, base = "") {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.join(base, ent.name);
    if (ent.isDirectory()) out.push(...walk(path.join(dir, ent.name), rel));
    else if (ent.name.endsWith(".html")) out.push(rel.replace(/\\/g, "/"));
  }
  return out;
}

for (const rel of walk(PAGES)) {
  const fp = path.join(PAGES, rel);
  const raw = fs.readFileSync(fp, "utf8");
  const m = raw.match(/<!--\s*@meta\s*([\s\S]*?)\s*-->/);
  if (!m) continue;
  try {
    const meta = JSON.parse(m[1]);
    const body = raw.slice(m[0].length).trim();
    const metaPath = fp.replace(/\.html$/, ".meta.json");
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), "utf8");
    fs.writeFileSync(fp, body + "\n", "utf8");
    console.log("split", rel);
  } catch (e) {
    console.error("FAIL", rel, e.message);
  }
}
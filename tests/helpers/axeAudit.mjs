/**
 * Shared axe-core setup for the accessibility check: which pages, which
 * themes, which rules. Used by tests/a11y.spec.js (CI) and runnable on its
 * own for a full report: `node tests/helpers/axeAudit.mjs` (needs the site
 * built and `node scripts/serve.mjs` running).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "public");

export const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

// Dark is the site default; light is opt-in via the toggle, stored in
// localStorage before first paint (src/partials/head-open.html). Contrast
// differs completely between the two, so every page is checked in both.
export const THEMES = ["dark", "light"];

/** Every built page as the URL path production serves it (extensionless). */
export function allPagePaths() {
  const out = [];
  (function walk(dir) {
    for (const f of fs.readdirSync(dir)) {
      const p = path.join(dir, f);
      if (fs.statSync(p).isDirectory()) walk(p);
      else if (f.endsWith(".html")) {
        const rel = "/" + path.relative(ROOT, p).split(path.sep).join("/");
        out.push(rel.replace(/index\.html$/, "").replace(/\.html$/, ""));
      }
    }
  })(ROOT);
  return out.filter((p) => !/\/404$/.test(p)).sort();
}

export async function setTheme(page, theme) {
  await page.addInitScript((t) => {
    try {
      if (t === "light") localStorage.setItem("rr_theme", "light");
      else localStorage.removeItem("rr_theme");
    } catch (e) {}
  }, theme);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { chromium } = await import("@playwright/test");
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  const pinned = "/opt/pw-browsers/chromium";
  const browser = await chromium.launch(fs.existsSync(pinned) ? { executablePath: pinned } : {});
  const byRule = new Map();
  for (const theme of THEMES) {
    for (const p of allPagePaths()) {
      const ctx = await browser.newContext({ reducedMotion: "reduce" });
      const page = await ctx.newPage();
      await setTheme(page, theme);
      await page.goto("http://localhost:4173" + p, { waitUntil: "load" });
      const { violations } = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
      for (const v of violations) {
        const r = byRule.get(v.id) || { impact: v.impact, help: v.help, pages: new Set(), nodes: [] };
        r.pages.add(`${theme}:${p}`);
        for (const n of v.nodes) r.nodes.push({ where: `${theme}:${p}`, target: n.target.join(" "), why: n.failureSummary });
        byRule.set(v.id, r);
      }
      await ctx.close();
    }
  }
  await browser.close();
  for (const [id, r] of [...byRule].sort((a, b) => b[1].nodes.length - a[1].nodes.length)) {
    console.log(`\n### ${id} [${r.impact}] — ${r.help}: ${r.nodes.length} nodes on ${r.pages.size} page-themes`);
    const seen = new Set();
    for (const n of r.nodes) {
      const key = n.target;
      if (seen.has(key)) continue;
      seen.add(key);
      console.log(`  - ${n.where}  ${n.target}\n      ${n.why.split("\n").slice(1).join(" ").slice(0, 220)}`);
      if (seen.size >= 8) break;
    }
  }
  if (!byRule.size) console.log("No WCAG 2.1 A/AA violations.");
}

// @ts-check
import { test, expect } from "@playwright/test";

/**
 * CSS, JS and preview cards are cached for a year (public/_headers), which is
 * only safe because every page names them with ?v=<content hash>
 * (versionAssets in scripts/build.mjs). An /assets/ URL without one would
 * leave readers on a stale file for a year after it changed.
 */
const PAGES = ["/", "/zh/", "/demo", "/zh/models/", "/guides/rerank-in-china", "/rerank-cost-calculator"];

for (const p of PAGES) {
  test(`every /assets/ URL on ${p} carries a content version`, async ({ request }) => {
    const html = await (await request.get(p)).text();
    const urls = [...html.matchAll(/(?:src|href|content)="((?:https:\/\/reranker\.uk)?\/assets\/[^"]+)"/g)].map((m) => m[1]);
    expect(urls.length).toBeGreaterThan(3);
    expect(urls.filter((u) => !/\?v=[0-9a-f]{10}$/.test(u))).toEqual([]);
  });
}

test("versioned CSS and JS are cached for a year; pages are not", async ({ request }) => {
  const html = await (await request.get("/")).text();
  const css = html.match(/href="(\/assets\/css\/style\.css\?v=[^"]+)"/)[1];
  const js = html.match(/src="(\/assets\/js\/main\.js\?v=[^"]+)"/)[1];
  for (const u of [css, js]) {
    expect((await request.get(u)).headers()["cache-control"]).toBe("public, max-age=31536000, immutable");
  }
  expect((await request.get("/")).headers()["cache-control"] || "").not.toContain("immutable");
});

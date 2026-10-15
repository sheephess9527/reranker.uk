// @ts-check
import { test, expect } from "@playwright/test";
import fs from "fs";
import { watchCspViolations, cspViolations } from "./helpers/csp.mjs";

/**
 * Loads every page in the sitemap from the live site (or LIVE_BASE, e.g. a
 * Cloudflare preview) and fails on any CSP violation. The local tests can't
 * see what production adds on its own: Cloudflare can inject scripts
 * (analytics beacons, email obfuscation) that an enforcing CSP would block
 * without anything else on the page failing. Run daily by
 * demo-smoke-daily.yml; the demo's real model loading under the policy is
 * covered by demo.smoke.real.spec.js.
 */
const BASE = (process.env.LIVE_BASE || "https://reranker.uk").replace(/\/$/, "");
const paths = [...fs.readFileSync("public/sitemap.xml", "utf8").matchAll(/<loc>https:\/\/reranker\.uk([^<]*)<\/loc>/g)]
  .map((m) => m[1] || "/");

test.describe.configure({ mode: "parallel" });

for (const p of paths) {
  test(`no CSP violations on ${p}`, async ({ page }) => {
    await watchCspViolations(page);
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (msg) => msg.type() === "error" && /Content Security Policy/i.test(msg.text()) && errors.push(msg.text()));
    const res = await page.goto(BASE + p, { waitUntil: "load" });
    expect(res?.status()).toBe(200);
    await page.waitForTimeout(1000);
    expect(await cspViolations(page)).toEqual([]);
    expect(errors).toEqual([]);
  });
}

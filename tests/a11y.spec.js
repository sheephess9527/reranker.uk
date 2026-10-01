// @ts-check
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { allPagePaths, setTheme, THEMES, WCAG_TAGS } from "./helpers/axeAudit.mjs";
import { watchCspViolations, cspViolations } from "./helpers/csp.mjs";

/**
 * Every built page, in both themes, against axe-core's WCAG 2.1 A/AA rules.
 * The first full run (Sep 2026) found 400+ violations — prose links told
 * apart by colour alone, five sub-4.5:1 text colours, an unfocusable
 * scrolling code block — none of which any other check here could see.
 *
 * Reduced motion so contrast is measured on settled colours: demo results
 * fade in, and mid-fade text reads as a contrast failure it isn't.
 *
 * Since every page is loaded here anyway, each one is also checked for CSP
 * violations against the policy public/_headers ships, so a new inline
 * script or third-party asset on any page fails CI, not just on the demo.
 */
test.use({ contextOptions: { reducedMotion: "reduce" } });

for (const theme of THEMES) {
  for (const path of allPagePaths()) {
    test(`${theme} ${path}`, async ({ page }) => {
      await setTheme(page, theme);
      await watchCspViolations(page);
      await page.goto(path);
      const { violations } = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
      const summary = violations.map(
        (v) => `${v.id} [${v.impact}] ${v.nodes.length}× e.g. ${v.nodes[0].target.join(" ")}`
      );
      expect(summary).toEqual([]);
      expect(await cspViolations(page)).toEqual([]);
    });
  }
}

/**
 * Report-only CSP violations don't throw or fail a request — they only fire
 * a `securitypolicyviolation` DOM event and a console message. Without this,
 * a script-src/connect-src/style-src gap in public/_headers would pass every
 * other assertion silently.
 */
export async function watchCspViolations(page) {
  await page.addInitScript(() => {
    window.__cspViolations = [];
    document.addEventListener("securitypolicyviolation", (e) => {
      window.__cspViolations.push(`${e.violatedDirective}: ${e.blockedURI}`);
    });
  });
}

export async function cspViolations(page) {
  return page.evaluate(() => window.__cspViolations || []);
}

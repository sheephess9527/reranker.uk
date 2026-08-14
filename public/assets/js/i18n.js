/* reranker.uk — locale switcher.
 *
 * Translation happens at build time (scripts/build.mjs pre-renders the Chinese
 * mirror under /zh/ from public/assets/js/i18n/*.js), so the browser no longer
 * ships or applies any dictionaries. What is left is:
 *   - resolving the counterpart URL for the other locale,
 *   - wiring the nav toggle to navigate there and remember the choice,
 *   - announcing the page locale so demo.js / models-index.js can label their
 *     dynamically generated UI.
 */
(function () {
  var STORE_KEY = "rr_lang";
  var root = document.documentElement;
  var lang = root.getAttribute("data-locale") === "zh" ? "zh" : "en";

  /** Same path in the other locale, preserving query string and hash. */
  function counterpart(target) {
    var p = location.pathname;
    var base = /^\/zh(\/|$)/.test(p) ? p.replace(/^\/zh/, "") || "/" : p;
    var next = target === "zh" ? (base === "/" ? "/zh/" : "/zh" + base) : base;
    return next + location.search + location.hash;
  }

  function labelToggles() {
    var toZh = lang !== "zh";
    document.querySelectorAll(".lang-toggle").forEach(function (b) {
      b.textContent = toZh ? "中文" : "EN";
      var label = toZh ? "切换到中文" : "Switch to English";
      b.setAttribute("aria-label", label);
      b.setAttribute("title", label);
      b.setAttribute("href", counterpart(toZh ? "zh" : "en"));
      b.setAttribute("hreflang", toZh ? "zh-Hans" : "en");
    });
  }

  function init() {
    labelToggles();

    document.querySelectorAll(".lang-toggle").forEach(function (b) {
      b.addEventListener("click", function () {
        // Remember the choice so a later visit to the other locale's root can
        // be interpreted by anything that cares; navigation itself is the link.
        try {
          localStorage.setItem(STORE_KEY, lang === "zh" ? "en" : "zh");
        } catch (e) {}
      });
    });

    // Page scripts render their own strings and key off this event.
    try {
      document.dispatchEvent(
        new CustomEvent("i18n:changed", { detail: { lang: lang } })
      );
    } catch (e) {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

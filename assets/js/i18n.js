/* reranker.uk — lightweight bilingual (EN/中文) engine.
 *
 * Strategy: the HTML ships in English (default, SEO-friendly). This script
 * captures each translatable block's original English innerHTML on load and
 * swaps in Chinese from a dictionary when the user picks 中文. Missing keys
 * fall back to English, so partial dictionaries never break the page.
 *
 * Shared chrome (nav/footer) lives in SHARED below; page-specific strings come
 * from window.I18N_PAGE (loaded per page before this script). Dictionary keys
 * are the normalised English innerHTML of each block.
 */
(function () {
  var STORE_KEY = "rr_lang";

  var SHARED = {
    "What is a reranker": "什么是 reranker",
    "Cross- vs bi-encoder": "Cross- vs Bi-encoder",
    "Rerank for RAG": "为 RAG 加重排序",
    "Models": "模型对比",
    "Live demo": "在线 Demo",
    "Guides": "指南",
    "An open educational resource on rerankers for retrieval and RAG — plus a zero-cost demo that runs in your browser.":
      "一个关于检索与 RAG 重排序（reranker）的开放学习资源，外加一个在浏览器里零成本运行的实时 Demo。",
    "Open educational resource · not affiliated with any model vendor":
      "开放教育资源 · 与任何模型厂商无关",
    "On this page": "本页目录",
    "Home": "首页",
    "Keep reading": "继续阅读",
    "Other models": "其他模型",
    "Pros": "优点",
    "Cons": "缺点"
  };

  // Block selectors we translate. <pre>/code and dynamic demo output are skipped.
  var SEL = [
    "nav .nav-links a",
    "main h1", "main h2", "main h3", "main h4",
    "main p", "main li", "main blockquote",
    "main td", "main th", "main label",
    "main .eyebrow", "main .btn", "main .meta", "main .breadcrumb",
    "main .toc strong",
    ".site-footer h4", ".site-footer li a", ".site-footer p",
    ".site-footer .footer-bottom span"
  ].join(", ");

  var norm = function (s) { return (s || "").replace(/\s+/g, " ").trim(); };

  var nodes = [];
  var originals = [];
  var origTitle = document.title;
  var descEl = document.querySelector('meta[name="description"]');
  var origDesc = descEl ? descEl.getAttribute("content") : null;

  function dict() {
    var page = (window.I18N_PAGE && window.I18N_PAGE.zh) || {};
    var merged = {};
    for (var k in SHARED) merged[k] = SHARED[k];
    for (var j in page) merged[j] = page[j];
    return merged;
  }

  function collect() {
    var els = Array.prototype.slice.call(document.querySelectorAll(SEL));
    els.forEach(function (el) {
      if (el.closest("pre")) return;
      if (el.classList.contains("no-i18n")) return;
      nodes.push(el);
      originals.push(el.innerHTML);
    });
  }

  function apply(lang) {
    var d = dict();
    nodes.forEach(function (el, i) {
      var orig = originals[i];
      if (lang === "zh") {
        var t = d[norm(orig)];
        el.innerHTML = t != null ? t : orig;
      } else {
        el.innerHTML = orig;
      }
    });

    if (lang === "zh") {
      if (d._title) document.title = d._title;
      if (descEl && d._desc) descEl.setAttribute("content", d._desc);
    } else {
      document.title = origTitle;
      if (descEl && origDesc != null) descEl.setAttribute("content", origDesc);
    }

    document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";

    document.querySelectorAll(".lang-toggle").forEach(function (b) {
      b.textContent = lang === "zh" ? "EN" : "中文";
      b.setAttribute("aria-label", lang === "zh" ? "Switch to English" : "切换到中文");
      b.setAttribute("title", lang === "zh" ? "Switch to English" : "切换到中文");
    });
  }

  var current = "en";
  function setLang(lang) {
    current = lang;
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
    apply(lang);
    try {
      document.dispatchEvent(new CustomEvent("i18n:changed", { detail: { lang: lang } }));
    } catch (e) {}
  }

  function init() {
    collect();
    var saved = null;
    try { saved = localStorage.getItem(STORE_KEY); } catch (e) {}
    var lang = saved || ((navigator.language || "").toLowerCase().indexOf("zh") === 0 ? "zh" : "en");
    setLang(lang);
    document.querySelectorAll(".lang-toggle").forEach(function (b) {
      b.addEventListener("click", function () { setLang(current === "zh" ? "en" : "zh"); });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/* reranker.uk — bilingual engine (data-i18n keys + legacy fallback).
 *
 * Preferred: stable keys via data-i18n / data-i18n-html on elements.
 * Legacy: innerHTML dictionary keyed by normalised English (window.I18N_PAGE.zh).
 */
(function () {
  var STORE_KEY = "rr_lang";

  var LEGACY_SEL = [
    "main h1", "main h2", "main h3", "main h4",
    "main p", "main li", "main blockquote",
    "main td", "main th", "main label",
    "main .eyebrow", "main .btn", "main .meta", "main .breadcrumb",
    "main .toc strong", "main .pill",
  ].join(", ");

  var norm = function (s) {
    return (s || "").replace(/\s+/g, " ").trim();
  };

  var legacyNodes = [];
  var legacyOriginals = [];
  var jsonLdOriginals = [];
  var origTitle = document.title;
  var descEl = document.querySelector('meta[name="description"]');
  var origDesc = descEl ? descEl.getAttribute("content") : null;
  var ogLocaleEl = document.querySelector('meta[property="og:locale"]');
  var origOgLocale = ogLocaleEl ? ogLocaleEl.getAttribute("content") : null;
  var ogLocaleAltEl = document.querySelector('meta[property="og:locale:alternate"]');
  var origOgLocaleAlt = ogLocaleAltEl ? ogLocaleAltEl.getAttribute("content") : null;

  function sharedKeys() {
    return (window.I18N_SHARED && window.I18N_SHARED.keys) || {};
  }

  function pageKeys() {
    var page = window.I18N_PAGE || {};
    return page.keys || {};
  }

  function legacyDict() {
    return (window.I18N_PAGE && window.I18N_PAGE.zh) || {};
  }

  function lookupKey(key, lang) {
    if (lang !== "zh") return null;
    var k = pageKeys()[key];
    if (k != null) return k;
    k = sharedKeys()[key];
    return k != null ? k : null;
  }

  function captureDefaults() {
    document.querySelectorAll("[data-i18n], [data-i18n-html]").forEach(function (el) {
      if (el.dataset.i18nDefault != null) return;
      el.dataset.i18nDefault = el.hasAttribute("data-i18n-html")
        ? el.innerHTML
        : el.textContent;
    });
  }

  function applyKeyed(lang) {
    document.querySelectorAll("[data-i18n], [data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n") || el.getAttribute("data-i18n-html");
      var useHtml = el.hasAttribute("data-i18n-html");
      var def = el.dataset.i18nDefault || "";
      if (lang === "zh") {
        var t = lookupKey(key, lang);
        if (t != null) {
          if (useHtml) el.innerHTML = t;
          else el.textContent = t;
        } else if (useHtml) el.innerHTML = def;
        else el.textContent = def;
      } else {
        if (useHtml) el.innerHTML = def;
        else el.textContent = def;
      }
    });
  }

  function collectLegacy() {
    var d = legacyDict();
    if (!Object.keys(d).length) return;
    var els = Array.prototype.slice.call(document.querySelectorAll(LEGACY_SEL));
    els.forEach(function (el) {
      if (el.closest("pre")) return;
      if (el.classList.contains("no-i18n")) return;
      if (el.closest("[data-i18n], [data-i18n-html]")) return;
      if (el.hasAttribute("data-i18n") || el.hasAttribute("data-i18n-html")) return;
      legacyNodes.push(el);
      legacyOriginals.push(el.innerHTML);
    });
  }

  function applyLegacy(lang) {
    var d = legacyDict();
    legacyNodes.forEach(function (el, i) {
      var orig = legacyOriginals[i];
      if (lang === "zh") {
        var t = d[norm(orig)];
        el.innerHTML = t != null ? t : orig;
      } else {
        el.innerHTML = orig;
      }
    });
  }

  function patchJsonLdLang(obj, lang) {
    if (!obj || typeof obj !== "object") return;
    var t = obj["@type"];
    if (
      t === "Article" ||
      t === "WebPage" ||
      t === "WebSite" ||
      t === "Organization"
    ) {
      obj.inLanguage = lang === "zh" ? "zh-Hans" : "en";
    }
    if (Array.isArray(obj["@graph"])) obj["@graph"].forEach(function (n) {
      patchJsonLdLang(n, lang);
    });
    Object.keys(obj).forEach(function (k) {
      if (obj[k] && typeof obj[k] === "object") patchJsonLdLang(obj[k], lang);
    });
  }

  function captureJsonLd() {
    document.querySelectorAll('script[type="application/ld+json"]').forEach(function (script) {
      jsonLdOriginals.push({ el: script, text: script.textContent });
    });
  }

  function applyJsonLd(lang) {
    jsonLdOriginals.forEach(function (item) {
      try {
        var data = JSON.parse(item.text);
        patchJsonLdLang(data, lang);
        item.el.textContent = JSON.stringify(data);
      } catch (e) {
        item.el.textContent = item.text;
      }
    });
  }

  function applyMeta(lang) {
    var page = window.I18N_PAGE || {};
    var d = page.zh || {};
    if (lang === "zh") {
      if (d._title) document.title = d._title;
      else if (page._title) document.title = page._title;
      if (descEl && d._desc) descEl.setAttribute("content", d._desc);
      else if (descEl && page._desc) descEl.setAttribute("content", page._desc);
    } else {
      document.title = origTitle;
      if (descEl && origDesc != null) descEl.setAttribute("content", origDesc);
    }
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";
    if (ogLocaleEl) {
      ogLocaleEl.setAttribute(
        "content",
        lang === "zh" ? "zh_CN" : origOgLocale || "en_GB"
      );
    }
    if (ogLocaleAltEl) {
      ogLocaleAltEl.setAttribute(
        "content",
        lang === "zh" ? origOgLocale || "en_GB" : origOgLocaleAlt || "zh_CN"
      );
    }
    document.querySelectorAll(".lang-toggle").forEach(function (b) {
      b.textContent = lang === "zh" ? "EN" : "中文";
      b.setAttribute("aria-label", lang === "zh" ? "Switch to English" : "切换到中文");
      b.setAttribute("title", lang === "zh" ? "Switch to English" : "切换到中文");
    });
  }

  var current = "en";
  function setLang(lang) {
    current = lang;
    try {
      localStorage.setItem(STORE_KEY, lang);
    } catch (e) {}
    applyKeyed(lang);
    applyLegacy(lang);
    applyMeta(lang);
    applyJsonLd(lang);
    try {
      document.dispatchEvent(
        new CustomEvent("i18n:changed", { detail: { lang: lang } })
      );
    } catch (e) {}
  }

  function init() {
    captureDefaults();
    captureJsonLd();
    collectLegacy();
    var saved = null;
    try {
      saved = localStorage.getItem(STORE_KEY);
    } catch (e) {}
    var lang =
      saved ||
      ((navigator.language || "").toLowerCase().indexOf("zh") === 0 ? "zh" : "en");
    setLang(lang);
    document.querySelectorAll(".lang-toggle").forEach(function (b) {
      b.addEventListener("click", function () {
        setLang(current === "zh" ? "en" : "zh");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
/* reranker.uk — small shared UI helpers (mobile nav, active link, year) */
(function () {
  var zh = (document.documentElement.lang || "").toLowerCase().indexOf("zh") === 0;

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    function menuLabel(open) {
      if (zh) return open ? "关闭菜单" : "打开菜单";
      return open ? "Close menu" : "Open menu";
    }
    toggle.setAttribute("aria-label", menuLabel(false));
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", menuLabel(open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", menuLabel(false));
      }
    });
  }

  // The active nav item is marked at build time (scripts/build.mjs), so there
  // is nothing to do here — no first-paint flash, no work on every navigation.

  // Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Light / dark theme toggle
  var THEME_KEY = "rr_theme";
  var themeBtn = document.getElementById("theme-toggle");
  var metaTheme = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    var light = theme === "light";
    if (light) document.documentElement.dataset.theme = "light";
    else document.documentElement.removeAttribute("data-theme");
    if (themeBtn) {
      themeBtn.textContent = light ? "🌙" : "☀";
      themeBtn.setAttribute(
        "aria-label",
        light
          ? (zh ? "切换到深色" : "Switch to dark theme")
          : (zh ? "切换到浅色" : "Switch to light theme")
      );
      themeBtn.title = light
        ? (zh ? "深色" : "Dark theme")
        : (zh ? "浅色" : "Light theme");
    }
    if (metaTheme) metaTheme.setAttribute("content", light ? "#f4f5f9" : "#0b0d17");
  }

  // A choice the reader made with the toggle wins; until they make one, the
  // site follows the system setting, including when it changes (the inline
  // script in <head> does the same before first paint).
  var systemLight = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;
  function storedTheme() {
    try {
      var t = localStorage.getItem(THEME_KEY);
      return t === "light" || t === "dark" ? t : null;
    } catch (e) {
      return null;
    }
  }
  function initialTheme() {
    return storedTheme() || (systemLight && systemLight.matches ? "light" : "dark");
  }
  applyTheme(initialTheme());
  if (systemLight) {
    var onSystemChange = function () {
      if (!storedTheme()) applyTheme(initialTheme());
    };
    if (systemLight.addEventListener) systemLight.addEventListener("change", onSystemChange);
    else if (systemLight.addListener) systemLight.addListener(onSystemChange);
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next =
        document.documentElement.dataset.theme === "light" ? "dark" : "light";
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (e) {}
      applyTheme(next);
    });
  }

  // Site search: a static index built by scripts/build.mjs, fetched on first
  // use. "/" opens it, Esc closes it, arrow keys move through the results.
  // Each locale searches only its own pages.
  var searchBtn = document.getElementById("search-toggle");
  var panel = document.getElementById("site-search");
  var input = document.getElementById("site-search-input");
  var list = document.getElementById("site-search-results");
  var status = document.getElementById("site-search-status");
  if (searchBtn && panel && input && list) {
    var index = null;
    var loading = null;
    var locale = zh ? "zh" : "en";

    function load() {
      if (!loading) {
        loading = fetch("/search-index.json")
          .then(function (r) { return r.json(); })
          .then(function (all) { index = all.filter(function (e) { return e.l === locale; }); })
          .catch(function () { index = []; });
      }
      return loading;
    }

    function fold(t) { return (t || "").toLowerCase(); }

    function search(q) {
      var terms = fold(q).split(/\s+/).filter(Boolean);
      if (!terms.length || !index) return [];
      return index
        .map(function (e) {
          var t = fold(e.t), d = fold(e.d), h = fold(e.h.join(" "));
          var score = 0;
          for (var i = 0; i < terms.length; i++) {
            var w = terms[i], s = 0;
            if (t.indexOf(w) !== -1) s += 5;
            if (h.indexOf(w) !== -1) s += 2;
            if (d.indexOf(w) !== -1) s += 1;
            if (!s) return null; // every term must match somewhere
            score += s;
          }
          return { e: e, score: score };
        })
        .filter(Boolean)
        .sort(function (a, b) { return b.score - a.score; })
        .slice(0, 8)
        .map(function (r) { return r.e; });
    }

    function render() {
      var q = input.value.trim();
      var hits = search(q);
      list.innerHTML = "";
      hits.forEach(function (e) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = e.u;
        var strong = document.createElement("strong");
        strong.textContent = e.t;
        var span = document.createElement("span");
        span.textContent = e.d;
        a.appendChild(strong);
        a.appendChild(span);
        li.appendChild(a);
        list.appendChild(li);
      });
      if (!q) status.textContent = "";
      else if (!hits.length) status.textContent = zh ? "没有找到相关页面。" : "No pages match.";
      else status.textContent = zh ? "找到 " + hits.length + " 个页面" : hits.length + (hits.length === 1 ? " page" : " pages");
    }

    function open() {
      panel.hidden = false;
      searchBtn.setAttribute("aria-expanded", "true");
      input.focus();
      load().then(render);
    }

    function close(returnFocus) {
      panel.hidden = true;
      searchBtn.setAttribute("aria-expanded", "false");
      if (returnFocus) searchBtn.focus();
    }

    searchBtn.addEventListener("click", function () {
      if (panel.hidden) open(); else close(true);
    });
    input.addEventListener("input", function () { load().then(render); });

    document.addEventListener("keydown", function (e) {
      var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
      if (e.key === "/" && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        open();
      } else if (e.key === "Escape" && !panel.hidden) {
        close(true);
      } else if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !panel.hidden && panel.contains(e.target)) {
        var links = Array.prototype.slice.call(list.querySelectorAll("a"));
        if (!links.length) return;
        var i = links.indexOf(e.target);
        var next = e.key === "ArrowDown" ? (i < 0 ? 0 : Math.min(i + 1, links.length - 1)) : i - 1;
        e.preventDefault();
        if (next < 0) input.focus(); else links[next].focus();
      }
    });
  }
})();

// The changelog folds older months into <details> (foldChangelog in
// scripts/build.mjs). A link to an entry inside one — every RSS item links
// to /changelog#<id> — opens that month and scrolls to the entry.
(function () {
  function reveal() {
    var id = decodeURIComponent(location.hash.slice(1));
    var el = id && document.getElementById(id);
    var box = el && el.closest("details");
    if (!box || box.open) return;
    box.open = true;
    el.scrollIntoView();
  }
  reveal();
  window.addEventListener("hashchange", reveal);
})();

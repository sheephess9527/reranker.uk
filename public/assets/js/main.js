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

  try {
    applyTheme(localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark");
  } catch (e) {
    applyTheme("dark");
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
})();

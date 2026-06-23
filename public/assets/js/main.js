/* reranker.uk — small shared UI helpers (mobile nav, active link, year) */
(function () {
  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  // Highlight active nav link by pathname
  var here = location.pathname.replace(/index\.html$/, "").replace(/\/$/, "") || "/";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var href = a.getAttribute("href") || "";
    var path = href.replace(/index\.html$/, "").replace(/\/$/, "") || "/";
    if (path !== "/" && here.indexOf(path) === 0) a.classList.add("active");
    if (path === "/" && here === "/") a.classList.add("active");
  });

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
        light ? "Switch to dark theme" : "Switch to light theme"
      );
      themeBtn.title = light ? "Dark theme" : "Light theme";
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

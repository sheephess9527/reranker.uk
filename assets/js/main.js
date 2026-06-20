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
})();

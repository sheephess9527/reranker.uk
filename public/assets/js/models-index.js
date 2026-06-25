/* Models comparison table — sort, filter, demo deep links */
(function () {
  const DEMO_MODELS = {
    "jina-reranker": "jinaai/jina-reranker-v1-tiny-en",
    "mxbai-rerank": "mixedbread-ai/mxbai-rerank-xsmall-v1",
    "ms-marco": "Xenova/ms-marco-MiniLM-L-6-v2",
  };

  const table = document.getElementById("models-table");
  const tbody = table?.querySelector("tbody");
  const filterInput = document.getElementById("models-filter");
  const typeFilter = document.getElementById("models-type-filter");
  const archFilter = document.getElementById("models-arch-filter");
  if (!table || !tbody) return;

  const rows = Array.from(tbody.querySelectorAll("tr"));

  function isZh() {
    return (document.documentElement.lang || "").toLowerCase().indexOf("zh") === 0;
  }
  function L(en, zh) {
    return isZh() ? zh : en;
  }

  function rowText(row) {
    return row.textContent.toLowerCase();
  }

  function applyFilters() {
    const q = (filterInput?.value || "").trim().toLowerCase();
    const type = typeFilter?.value || "all";
    const arch = archFilter?.value || "all";
    rows.forEach((row) => {
      const types = (row.dataset.type || "").split(/\s+/);
      const typeOk = type === "all" || types.includes(type);
      const archOk = arch === "all" || row.dataset.arch === arch;
      const textOk = !q || rowText(row).includes(q);
      row.hidden = !(typeOk && archOk && textOk);
    });
    const visible = rows.filter((r) => !r.hidden).length;
    const countEl = document.getElementById("models-count");
    if (countEl) {
      countEl.textContent = L(
        `${visible} of ${rows.length} models`,
        `显示 ${visible} / ${rows.length} 个模型`
      );
    }
  }

  function sortBy(key, dir) {
    const sorted = rows.slice().sort((a, b) => {
      const av = a.dataset[key] || "";
      const bv = b.dataset[key] || "";
      if (key === "beir") {
        return (parseFloat(av) || 0) - (parseFloat(bv) || 0);
      }
      return av.localeCompare(bv, undefined, { numeric: true, sensitivity: "base" });
    });
    if (dir === "desc") sorted.reverse();
    sorted.forEach((r) => tbody.appendChild(r));
  }

  let sortKey = "name";
  let sortDir = "asc";

  table.querySelectorAll("th[data-sort]").forEach((th) => {
    th.style.cursor = "pointer";
    th.setAttribute("role", "button");
    th.setAttribute("tabindex", "0");
    const activate = () => {
      const key = th.dataset.sort;
      if (sortKey === key) sortDir = sortDir === "asc" ? "desc" : "asc";
      else {
        sortKey = key;
        sortDir = "asc";
      }
      table.querySelectorAll("th[data-sort]").forEach((h) => {
        h.classList.remove("sort-asc", "sort-desc");
        h.removeAttribute("aria-sort");
      });
      th.classList.add(sortDir === "asc" ? "sort-asc" : "sort-desc");
      th.setAttribute("aria-sort", sortDir === "asc" ? "ascending" : "descending");
      sortBy(sortKey, sortDir);
      applyFilters();
    };
    th.addEventListener("click", activate);
    th.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate();
      }
    });
  });

  if (filterInput) filterInput.addEventListener("input", applyFilters);
  if (typeFilter) typeFilter.addEventListener("change", applyFilters);
  if (archFilter) archFilter.addEventListener("change", applyFilters);

  rows.forEach((row) => {
    const slug = row.dataset.demo;
    if (!slug || !DEMO_MODELS[slug]) return;
    const cell = row.querySelector(".demo-link-cell");
    if (!cell) return;
    const m = DEMO_MODELS[slug];
    const a = document.createElement("a");
    a.href = `/demo.html?m=${encodeURIComponent(m)}`;
    a.className = "btn btn-ghost btn-sm";
    a.textContent = L("Try in demo", "在 Demo 中试用");
    cell.appendChild(a);
  });

  function translateFilterUI() {
    if (filterInput) {
      filterInput.placeholder = L("Filter models…", "筛选模型…");
      filterInput.setAttribute("aria-label", L("Filter models", "筛选模型"));
    }
    if (typeFilter) {
      const map = [
        ["all", "All types", "全部类型"],
        ["open", "Open weights", "开源权重"],
        ["api", "Hosted API", "托管 API"],
        ["browser", "Browser runnable", "浏览器可运行"],
      ];
      map.forEach(([val, en, zh]) => {
        const opt = typeFilter.querySelector(`option[value="${val}"]`);
        if (opt) opt.textContent = L(en, zh);
      });
    }
    if (archFilter) {
      const map = [
        ["all", "All architectures", "全部架构"],
        ["cross-encoder", "Cross-encoder", "Cross-encoder"],
        ["late-interaction", "Late-interaction", "Late-interaction"],
      ];
      map.forEach(([val, en, zh]) => {
        const opt = archFilter.querySelector(`option[value="${val}"]`);
        if (opt) opt.textContent = L(en, zh);
      });
    }
    const demoTh = table.querySelector("thead th:last-child");
    if (demoTh && !demoTh.dataset.sort) {
      demoTh.textContent = L("Demo", "Demo");
    }
  }

  translateFilterUI();
  applyFilters();

  document.addEventListener("i18n:changed", () => {
    translateFilterUI();
    applyFilters();
    rows.forEach((row) => {
      const slug = row.dataset.demo;
      if (!slug || !DEMO_MODELS[slug]) return;
      const link = row.querySelector(".demo-link-cell a");
      if (link) link.textContent = L("Try in demo", "在 Demo 中试用");
    });
  });
})();
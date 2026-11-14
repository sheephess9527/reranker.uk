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
  const inputFilter = document.getElementById("models-input-filter");
  const licenseFilter = document.getElementById("models-license-filter");
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
    const input = inputFilter?.value || "all";
    const licence = licenseFilter?.value || "all";
    rows.forEach((row) => {
      const types = (row.dataset.type || "").split(/\s+/);
      const typeOk = type === "all" || types.includes(type);
      // LightOn reranks pointwise or listwise, so a row can carry both.
      const arches = (row.dataset.arch || "").split(/\s+/);
      const archOk = arch === "all" || arches.includes(arch);
      // data-modal marks the models that also take page images, screenshots or
      // video; every other row ranks text alone.
      const multimodal = row.dataset.modal === "1";
      const inputOk = input === "all" || (input === "multimodal" ? multimodal : !multimodal);
      // data-license is only set where there are weights to license. A hosted-only
      // API has none, so it answers neither licence question.
      const licenceOk = licence === "all" || row.dataset.license === licence;
      const textOk = !q || rowText(row).includes(q);
      row.hidden = !(typeOk && archOk && inputOk && licenceOk && textOk);
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
    const sign = dir === "desc" ? -1 : 1;
    const sorted = rows.slice().sort((a, b) => {
      const av = a.dataset[key] || "";
      const bv = b.dataset[key] || "";
      if (key === "beir") {
        // Several models publish no comparable BEIR average. Those rows sink to
        // the bottom either way — treating a blank as 0 would float them to the
        // top of a descending sort, as if they had ranked worst.
        const an = parseFloat(av);
        const bn = parseFloat(bv);
        const aMissing = !isFinite(an);
        const bMissing = !isFinite(bn);
        if (aMissing || bMissing) return aMissing && bMissing ? 0 : aMissing ? 1 : -1;
        return (an - bn) * sign;
      }
      return av.localeCompare(bv, undefined, { numeric: true, sensitivity: "base" }) * sign;
    });
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
  if (inputFilter) inputFilter.addEventListener("change", applyFilters);
  if (licenseFilter) licenseFilter.addEventListener("change", applyFilters);

  rows.forEach((row) => {
    const slug = row.dataset.demo;
    if (!slug || !DEMO_MODELS[slug]) return;
    const cell = row.querySelector(".demo-link-cell");
    if (!cell) return;
    const m = DEMO_MODELS[slug];
    const a = document.createElement("a");
    a.href = `/demo?m=${encodeURIComponent(m)}`;
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
        ["listwise", "Listwise", "Listwise"],
        ["late-interaction", "Late-interaction", "Late-interaction"],
      ];
      map.forEach(([val, en, zh]) => {
        const opt = archFilter.querySelector(`option[value="${val}"]`);
        if (opt) opt.textContent = L(en, zh);
      });
    }
    if (inputFilter) {
      const map = [
        ["all", "All inputs", "全部输入"],
        ["text", "Text only", "仅文本"],
        ["multimodal", "Text + images", "文本 + 图片"],
      ];
      map.forEach(([val, en, zh]) => {
        const opt = inputFilter.querySelector(`option[value="${val}"]`);
        if (opt) opt.textContent = L(en, zh);
      });
      inputFilter.setAttribute("aria-label", L("Filter by what the model ranks", "按模型打分的输入类型筛选"));
      inputFilter.title = L(
        "Some rerankers also rank page images, screenshots or video, not just text.",
        "有些重排序模型除文本外还能给页面图片、截图或视频打分。"
      );
    }
    if (licenseFilter) {
      const map = [
        ["all", "All licences", "全部许可"],
        ["commercial", "Commercial use", "可商用"],
        ["noncommercial", "Non-commercial", "仅限非商用"],
      ];
      map.forEach(([val, en, zh]) => {
        const opt = licenseFilter.querySelector(`option[value="${val}"]`);
        if (opt) opt.textContent = L(en, zh);
      });
      licenseFilter.setAttribute("aria-label", L("Filter open-weight models by licence", "按许可证筛选开源权重模型"));
      licenseFilter.title = L(
        "Applies to open weights only — a hosted API is covered by the vendor's service terms, so hosted-only rows drop out of either licence.",
        "只针对开源权重 —— 托管 API 适用厂商的服务条款，所以在任一许可证下，纯托管行都不会出现。"
      );
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
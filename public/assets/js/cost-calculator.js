/* reranker.uk — rerank cost calculator.
 *
 * Prices verified August 2026 (see the assumptions section on the page).
 * Cohere bills per search: one query plus up to 100 documents, regardless of
 * length. Voyage bills per token across query + documents. That difference is
 * the whole point of the page, so the two are modelled separately rather than
 * flattened into one "cost per 1k docs" figure.
 */
(function () {
  const zh = () => (document.documentElement.lang || "").toLowerCase().indexOf("zh") === 0;
  const L = (en, cn) => (zh() ? cn : en);

  const DOCS_PER_SEARCH = 100;

  const OPTIONS = [
    {
      id: "cohere-pro",
      nameEn: "Cohere Rerank 4 Pro",
      nameZh: "Cohere Rerank 4 Pro",
      unitEn: "per search",
      unitZh: "按次检索",
      href: "/models/cohere-rerank.html",
      cost: (w) => searches(w) * 0.0025,
      volume: (w) => fmtInt(searches(w)) + L(" searches", " 次检索"),
    },
    {
      id: "cohere-fast",
      nameEn: "Cohere Rerank 4 Fast",
      nameZh: "Cohere Rerank 4 Fast",
      unitEn: "per search",
      unitZh: "按次检索",
      href: "/models/cohere-rerank.html",
      cost: (w) => searches(w) * 0.002,
      volume: (w) => fmtInt(searches(w)) + L(" searches", " 次检索"),
    },
    {
      id: "voyage",
      nameEn: "Voyage rerank-2.5",
      nameZh: "Voyage rerank-2.5",
      unitEn: "per token",
      unitZh: "按 token",
      href: "/models/voyage-rerank.html",
      cost: (w) => (tokens(w) / 1e6) * 0.05,
      volume: (w) => fmtTokens(tokens(w)),
    },
    {
      id: "voyage-lite",
      nameEn: "Voyage rerank-2.5-lite",
      nameZh: "Voyage rerank-2.5-lite",
      unitEn: "per token",
      unitZh: "按 token",
      href: "/models/voyage-rerank.html",
      cost: (w) => (tokens(w) / 1e6) * 0.02,
      volume: (w) => fmtTokens(tokens(w)),
    },
  ];

  /** Cohere rounds up to a whole search per 100 documents. */
  function searches(w) {
    return w.queries * Math.ceil(w.topk / DOCS_PER_SEARCH);
  }

  function tokens(w) {
    return w.queries * (w.queryTokens + w.topk * w.passageTokens);
  }

  const els = {
    queries: document.getElementById("calc-queries"),
    topk: document.getElementById("calc-topk"),
    passage: document.getElementById("calc-passage"),
    queryTokens: document.getElementById("calc-query-tokens"),
    rows: document.getElementById("calc-rows"),
    note: document.getElementById("calc-note"),
    summary: document.getElementById("calc-summary"),
    breakeven: document.getElementById("calc-breakeven"),
  };

  const num = (el, fallback) => {
    const v = parseFloat(el?.value);
    return isFinite(v) && v >= 0 ? v : fallback;
  };

  function readWorkload() {
    return {
      queries: Math.floor(num(els.queries, 0)),
      topk: Math.max(1, Math.floor(num(els.topk, 1))),
      passageTokens: Math.max(1, num(els.passage, 1)),
      queryTokens: Math.max(1, num(els.queryTokens, 1)),
    };
  }

  const fmtInt = (n) => Math.round(n).toLocaleString(zh() ? "zh-CN" : "en-GB");

  function fmtTokens(n) {
    const unit = L(" tokens", " token");
    if (n >= 1e9) return (n / 1e9).toFixed(2) + "B" + unit;
    if (n >= 1e6) return (n / 1e6).toFixed(1) + "M" + unit;
    if (n >= 1e3) return (n / 1e3).toFixed(1) + "K" + unit;
    return fmtInt(n) + unit;
  }

  function money(n) {
    if (n === 0) return "$0";
    if (n < 0.01) return "<$0.01";
    if (n < 1000) return "$" + n.toFixed(2);
    return "$" + fmtInt(n);
  }

  const esc = (s) =>
    String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /**
   * Passage length at which per-token billing costs the same as Cohere Pro.
   * Below it Voyage is cheaper, above it Cohere is — the headline of the page.
   */
  function breakevenPassageTokens(w) {
    const perQuerySearchCost = Math.ceil(w.topk / DOCS_PER_SEARCH) * 0.0025;
    // perQuerySearchCost = ((queryTokens + topk * p) / 1e6) * 0.05  →  solve for p
    const p = ((perQuerySearchCost / 0.05) * 1e6 - w.queryTokens) / w.topk;
    return p;
  }

  function render() {
    if (!els.rows) return;
    const w = readWorkload();

    const priced = OPTIONS.map((o) => ({ o, cost: o.cost(w) })).sort((a, b) => a.cost - b.cost);
    const cheapest = priced[0];

    els.rows.innerHTML = priced
      .map(({ o, cost }) => {
        const best = o.id === cheapest.o.id && w.queries > 0;
        return `<tr>
          <td><a href="${o.href}">${esc(L(o.nameEn, o.nameZh))}</a>${
          best ? ` <span class="pill good">${esc(L("cheapest", "最便宜"))}</span>` : ""
        }</td>
          <td>${esc(L(o.unitEn, o.unitZh))}</td>
          <td class="mono">${esc(o.volume(w))}</td>
          <td class="mono"><strong>${esc(money(cost))}</strong></td>
        </tr>`;
      })
      .join("");

    const perQuery = w.queries > 0 ? cheapest.cost / w.queries : 0;
    els.note.textContent = L(
      `Cheapest for this workload: ${cheapest.o.nameEn} at ${money(cheapest.cost)} a month — about ${money(
        perQuery
      )} per query. Free allowances and batch discounts are not applied.`,
      `该负载下最便宜的是 ${cheapest.o.nameZh}，每月约 ${money(cheapest.cost)}，折合每次查询约 ${money(
        perQuery
      )}。未计入免费额度与批量折扣。`
    );

    if (els.summary) {
      els.summary.textContent = L(
        `${fmtInt(w.queries)} queries × ${fmtInt(w.topk)} candidates = ${fmtInt(
          w.queries * w.topk
        )} passages scored, ${fmtTokens(tokens(w))} sent.`,
        `${fmtInt(w.queries)} 次查询 × ${fmtInt(w.topk)} 个候选 = 打分 ${fmtInt(
          w.queries * w.topk
        )} 段，共发送 ${fmtTokens(tokens(w))}。`
      );
    }

    if (els.breakeven) {
      const p = breakevenPassageTokens(w);
      els.breakeven.textContent =
        p < 1
          ? L(
              "At this top-k, per-search billing is cheaper at any passage length.",
              "在当前 top-k 下，无论段落多短，按次计费都更便宜。"
            )
          : L(
              `At ${fmtInt(w.topk)} candidates per query, Voyage rerank-2.5 and Cohere Rerank 4 Pro cost the same at about ${fmtInt(
                p
              )} tokens per passage. Shorter passages favour Voyage; longer ones favour Cohere.`,
              `在每次查询 ${fmtInt(w.topk)} 个候选时，段落长度约 ${fmtInt(
                p
              )} token 时 Voyage rerank-2.5 与 Cohere Rerank 4 Pro 成本相等。更短的段落对 Voyage 有利，更长的对 Cohere 有利。`
            );
    }
  }

  [els.queries, els.topk, els.passage, els.queryTokens].forEach((el) => {
    if (el) el.addEventListener("input", render);
  });
  document.addEventListener("i18n:changed", render);
  render();
})();

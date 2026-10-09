/* reranker.uk — rerank cost calculator.
 *
 * Prices come from data/models.json via data-* attributes on #calc-table, so
 * the page, the table and this script can't disagree and the daily source
 * check covers all three. See the assumptions section on the page.
 *
 * Cohere bills per search: one query plus up to 100 documents, where any
 * document longer than 500 tokens (query included) counts as one document
 * per 500-token chunk — that's Cohere's own pricing FAQ, and until Oct 2026
 * this script ignored it. Voyage bills per token, with the query counted
 * once per document reranked. Google bills per query of up to 100
 * documents. Alibaba Cloud and SiliconFlow bill input tokens, counted here
 * like Voyage's. Each is modelled as the vendor states it rather than
 * flattened into one "cost per 1k docs" figure. Yuan-priced options get
 * their own table: converting currencies would add a rate nobody checks.
 */
(function () {
  const zh = () => (document.documentElement.lang || "").toLowerCase().indexOf("zh") === 0;
  const L = (en, cn) => (zh() ? cn : en);

  const table = document.getElementById("calc-table");
  const fact = (name) => {
    const v = parseFloat(String(table?.dataset[name] ?? "").replace(/,/g, ""));
    return isFinite(v) ? v : NaN;
  };
  const DOCS_PER_SEARCH = fact("docsPerSearch");
  const CHUNK_TOKENS = fact("chunkTokens");

  const OPTIONS = [
    {
      id: "cohere-pro",
      nameEn: "Cohere Rerank 4 Pro",
      nameZh: "Cohere Rerank 4 Pro",
      unitEn: "per search",
      unitZh: "按次检索",
      href: "/models/cohere-rerank",
      price: fact("cohereProPerSearch"),
      cost: (w, o) => searches(w) * o.price,
      volume: (w) => fmtInt(searches(w)) + L(" searches", " 次检索"),
    },
    {
      id: "cohere-fast",
      nameEn: "Cohere Rerank 4 Fast",
      nameZh: "Cohere Rerank 4 Fast",
      unitEn: "per search",
      unitZh: "按次检索",
      href: "/models/cohere-rerank",
      price: fact("cohereFastPerSearch"),
      cost: (w, o) => searches(w) * o.price,
      volume: (w) => fmtInt(searches(w)) + L(" searches", " 次检索"),
    },
    {
      id: "voyage",
      nameEn: "Voyage rerank-3",
      nameZh: "Voyage rerank-3",
      unitEn: "per token",
      unitZh: "按 token",
      href: "/models/voyage-rerank",
      price: fact("voyagePerM"),
      cost: (w, o) => (tokens(w) / 1e6) * o.price,
      volume: (w) => fmtTokens(tokens(w)),
    },
    {
      id: "google",
      nameEn: "Google Vertex AI ranking",
      nameZh: "Google Vertex AI 排序",
      unitEn: "per query (≤100 docs)",
      unitZh: "按查询（每次 ≤100 篇）",
      href: "/models/#vertex-ai-ranking",
      price: fact("googlePerKQueries"),
      cost: (w, o) => (googleQueries(w) / 1000) * o.price,
      volume: (w) => fmtInt(googleQueries(w)) + L(" queries", " 次查询"),
    },
    {
      id: "alibaba-intl",
      nameEn: "Alibaba Cloud qwen3-rerank (international)",
      nameZh: "阿里云 qwen3-rerank（国际）",
      unitEn: "per token",
      unitZh: "按 token",
      href: "/models/#alibaba-model-studio",
      price: fact("alibabaIntlPerM"),
      cost: (w, o) => (tokens(w) / 1e6) * o.price,
      volume: (w) => fmtTokens(tokens(w)),
    },
    {
      id: "voyage-lite",
      nameEn: "Voyage rerank-3-lite",
      nameZh: "Voyage rerank-3-lite",
      unitEn: "per token",
      unitZh: "按 token",
      href: "/models/voyage-rerank",
      price: fact("voyageLitePerM"),
      cost: (w, o) => (tokens(w) / 1e6) * o.price,
      volume: (w) => fmtTokens(tokens(w)),
    },
  ].filter((o) => isFinite(o.price));

  const OPTIONS_CNY = [
    {
      id: "alibaba-cn",
      nameEn: "Alibaba Cloud qwen3-rerank / qwen3.7-text-rerank (Beijing)",
      nameZh: "阿里云百炼 qwen3-rerank / qwen3.7-text-rerank（北京）",
      unitEn: "per token",
      unitZh: "按 token",
      href: "/models/#alibaba-model-studio",
      price: fact("alibabaCnPerM"),
      cost: (w, o) => (tokens(w) / 1e6) * o.price,
      volume: (w) => fmtTokens(tokens(w)),
    },
    {
      id: "siliconflow-pro",
      nameEn: "SiliconFlow bge-reranker-v2-m3 (Pro)",
      nameZh: "硅基流动 bge-reranker-v2-m3（Pro）",
      unitEn: "per token",
      unitZh: "按 token",
      href: "/models/#siliconflow",
      price: fact("siliconflowProPerM"),
      cost: (w, o) => (tokens(w) / 1e6) * o.price,
      volume: (w) => fmtTokens(tokens(w)),
    },
    {
      id: "siliconflow-free",
      nameEn: "SiliconFlow bge-reranker-v2-m3 (free)",
      nameZh: "硅基流动 bge-reranker-v2-m3（免费）",
      unitEn: "listed free",
      unitZh: "标注免费",
      href: "/models/#siliconflow",
      price: 0,
      cost: () => 0,
      volume: (w) => fmtTokens(tokens(w)),
    },
  ].filter((o) => isFinite(o.price));

  /** Documents Cohere bills per candidate: one per started 500-token chunk. */
  function cohereDocsPerCandidate(w) {
    return Math.max(1, Math.ceil((w.queryTokens + w.passageTokens) / CHUNK_TOKENS));
  }

  /** Cohere rounds up to a whole search per 100 billed documents, per query. */
  function searches(w) {
    return w.queries * Math.ceil((w.topk * cohereDocsPerCandidate(w)) / DOCS_PER_SEARCH);
  }

  /** Google: each query counts once per started 100 documents. */
  function googleQueries(w) {
    return w.queries * Math.ceil(w.topk / 100);
  }

  /** Voyage: query tokens × documents + sum of document tokens (their formula). */
  function tokens(w) {
    return w.queries * w.topk * (w.queryTokens + w.passageTokens);
  }

  const els = {
    queries: document.getElementById("calc-queries"),
    topk: document.getElementById("calc-topk"),
    passage: document.getElementById("calc-passage"),
    queryTokens: document.getElementById("calc-query-tokens"),
    rows: document.getElementById("calc-rows"),
    note: document.getElementById("calc-note"),
    rowsCny: document.getElementById("calc-rows-cny"),
    noteCny: document.getElementById("calc-note-cny"),
    summary: document.getElementById("calc-summary"),
    billing: document.getElementById("calc-billing"),
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

  function money(n, sym = "$") {
    if (n === 0) return sym + "0";
    if (n < 0.01) return "<" + sym + "0.01";
    if (n < 1000) return sym + n.toFixed(2);
    return sym + fmtInt(n);
  }
  const yuan = (n) => money(n, "¥");

  const esc = (s) =>
    String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /** Fills one table, cheapest first; returns the cheapest option and cost. */
  function fillTable(tbody, options, w, fmt) {
    const priced = options.map((o) => ({ o, cost: o.cost(w, o) })).sort((a, b) => a.cost - b.cost);
    const cheapest = priced[0];
    if (tbody) {
      tbody.innerHTML = priced
        .map(({ o, cost }) => {
          const best = o.id === cheapest.o.id && w.queries > 0;
          return `<tr>
          <td><a href="${o.href}">${esc(L(o.nameEn, o.nameZh))}</a>${
            best ? ` <span class="pill good">${esc(L("cheapest", "最便宜"))}</span>` : ""
          }</td>
          <td>${esc(L(o.unitEn, o.unitZh))}</td>
          <td class="mono">${esc(o.volume(w))}</td>
          <td class="mono"><strong>${esc(fmt(cost))}</strong></td>
        </tr>`;
        })
        .join("");
    }
    return cheapest;
  }

  function render() {
    if (!els.rows) return;
    const w = readWorkload();

    const cheapest = fillTable(els.rows, OPTIONS, w, money);
    const perQuery = w.queries > 0 ? cheapest.cost / w.queries : 0;
    els.note.textContent = L(
      `Cheapest for this workload: ${cheapest.o.nameEn} at ${money(cheapest.cost)} a month — about ${money(
        perQuery
      )} per query. Free allowances and batch discounts are not applied.`,
      `该负载下最便宜的是 ${cheapest.o.nameZh}，每月约 ${money(cheapest.cost)}，折合每次查询约 ${money(
        perQuery
      )}。未计入免费额度与批量折扣。`
    );

    if (OPTIONS_CNY.length) {
      fillTable(els.rowsCny, OPTIONS_CNY, w, yuan);
      const cheapestPaid = OPTIONS_CNY.filter((o) => o.price > 0)
        .map((o) => ({ o, cost: o.cost(w, o) }))
        .sort((a, b) => a.cost - b.cost)[0];
      const tooLong = w.passageTokens > 4000;
      if (els.noteCny && cheapestPaid) {
        els.noteCny.textContent = L(
          `Cheapest paid option: ${cheapestPaid.o.nameEn} at ${yuan(cheapestPaid.cost)} a month. Free quotas are not applied.` +
            (tooLong ? " qwen3-rerank rejects passages over 4,000 tokens; qwen3.7-text-rerank takes up to 30,000." : ""),
          `付费方案中最便宜的是 ${cheapestPaid.o.nameZh}，每月约 ${yuan(cheapestPaid.cost)}。未计入免费额度。` +
            (tooLong ? "qwen3-rerank 遇到超过 4,000 token 的段落会直接报错；qwen3.7-text-rerank 最多可接收 30,000 token。" : "")
        );
      }
    }

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

    if (els.billing) {
      const perCand = w.queryTokens + w.passageTokens;
      const docs = cohereDocsPerCandidate(w);
      const used = Math.round((perCand / (docs * CHUNK_TOKENS)) * 100);
      els.billing.textContent = L(
        `Each candidate is ${fmtInt(perCand)} tokens with the query. Cohere bills that as ${fmtInt(docs)} document${
          docs === 1 ? "" : "s"
        } (one per ${fmtInt(CHUNK_TOKENS)} tokens started), so you pay for ${fmtInt(
          docs * CHUNK_TOKENS
        )} tokens' worth and use ${used}% of it. Voyage bills the ${fmtInt(perCand)} you send.`,
        `每个候选连同 query 共 ${fmtInt(perCand)} token。Cohere 按每满 ${fmtInt(
          CHUNK_TOKENS
        )} token（不足也算）计一篇，所以算作 ${fmtInt(docs)} 篇文档，相当于为 ${fmtInt(
          docs * CHUNK_TOKENS
        )} token 付费，实际只用了其中 ${used}%。Voyage 只按你发送的 ${fmtInt(perCand)} token 计费。`
      );
    }
  }

  [els.queries, els.topk, els.passage, els.queryTokens].forEach((el) => {
    if (el) el.addEventListener("input", render);
  });
  document.addEventListener("i18n:changed", render);
  render();
})();

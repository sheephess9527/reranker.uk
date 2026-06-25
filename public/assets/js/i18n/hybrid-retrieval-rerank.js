window.I18N_PAGE = { zh: {
  "_title": "混合检索 + 重排序 — BM25、向量，再 rerank | reranker.uk",
  "_desc": "如何结合 BM25 与向量检索提升召回，再用 cross-encoder reranker 修正排序。融合策略、top-k 调优，以及混合检索何时优于纯向量。",

  "<a href=\"/\">Home</a><span>/</span><a href=\"/guides/\">Guides</a><span>/</span>Hybrid retrieval + rerank": "<a href=\"/\">首页</a><span>/</span><a href=\"/guides/\">指南</a><span>/</span>混合检索 + 重排序",
  "Hybrid retrieval + reranking": "混合检索 + 重排序",
  "Production · ~9 min read · <time datetime=\"2026-06-23\">Updated 23 Jun 2026</time>": "生产实践 · 约 9 分钟阅读 · <time datetime=\"2026-06-23\">更新于 2026 年 6 月 23 日</time>",
  "Vector search alone often misses exact keyword matches; BM25 alone misses paraphrases. <strong>Hybrid retrieval</strong> runs both, merges the candidate lists, and a <strong>reranker</strong> then fixes the final order before your LLM sees anything.": "纯向量检索常漏掉精确关键词匹配；纯 BM25 又漏掉改写表述。<strong>混合检索</strong>同时跑两路、合并候选列表，再由 <strong>reranker</strong> 在 LLM 看到内容前修正最终顺序。",

  "On this page": "本页目录",
  "Why hybrid?": "为何用混合？",
  "The retrieve-merge-rerank pattern": "检索—合并—重排序范式",
  "Fusion strategies": "融合策略",
  "Minimal Python example": "最小 Python 示例",
  "Tuning tips": "调优建议",

  "<a href=\"#why\">Why hybrid?</a>": "<a href=\"#why\">为何用混合？</a>",
  "<a href=\"#pattern\">The retrieve-merge-rerank pattern</a>": "<a href=\"#pattern\">检索—合并—重排序范式</a>",
  "<a href=\"#fusion\">Fusion strategies</a>": "<a href=\"#fusion\">融合策略</a>",
  "<a href=\"#code\">Minimal Python example</a>": "<a href=\"#code\">最小 Python 示例</a>",
  "<a href=\"#tuning\">Tuning tips</a>": "<a href=\"#tuning\">调优建议</a>",

  "Why hybrid?": "为何用混合？",
  "Bi-encoder vector search excels at semantic similarity — “vehicle” matches “car”. BM25 excels at lexical overlap — product SKUs, legal clause numbers, error codes. In enterprise RAG, the right chunk often needs <em>both</em> signals. Hybrid retrieval widens recall; reranking supplies precision on the merged shortlist.": "bi-encoder 向量检索擅长语义相似 ——「vehicle」能匹配「car」。BM25 擅长词面重叠 —— 产品 SKU、法律条款编号、错误码。企业 RAG 里，正确 chunk 往往需<em>两种</em>信号。混合检索加宽召回；重排序在合并后的短名单上提供精度。",
  "Hybrid finds more of the right hay. Reranking finds the needle in it.": "混合检索找到更多对的干草；重排序在里头找到针。",

  "The retrieve-merge-rerank pattern": "检索—合并—重排序范式",
  "Retrieve wider than you would with a single channel — each list might return 40–60 items. After deduplication you still want 50–100 unique chunks going into the reranker. See <a href=\"/guides/rerank-rag.html\">rerank for RAG</a> for top-k defaults.": "单路检索时宁可召回更宽 —— 每路可返回 40–60 条。去重后仍希望有 50–100 个唯一 chunk 进入 reranker。top-k 默认值见 <a href=\"/guides/rerank-rag.html\">为 RAG 加重排序</a>。",

  "Fusion strategies": "融合策略",
  "Method": "方法",
  "How it works": "原理",
  "When to use": "适用场景",
  "Reciprocal Rank Fusion (RRF)": "倒数排名融合（RRF）",
  "Score = Σ 1/(k + rank) per list": "分数 = 各列表 Σ 1/(k + rank)",
  "Default choice — no score normalisation needed": "默认首选 —— 无需分数归一化",
  "Linear combination": "线性组合",
  "α·vector_score + (1-α)·BM25_score": "α·向量分 + (1-α)·BM25 分",
  "When both scores are calibrated on your data": "两路分数已在你数据上标定",
  "Union + rerank only": "并集 + 仅 rerank",
  "Concatenate lists, dedupe, skip fusion": "拼接列表、去重、跳过融合",
  "When reranker is strong and latency budget allows": "reranker 够强且延迟预算允许",

  "Minimal Python example": "最小 Python 示例",
  "Frameworks like Elasticsearch hybrid queries, Weaviate hybrid search, and LlamaIndex <code>QueryFusionRetriever</code> wrap the same idea — retrieve from multiple backends, then optionally rerank.": "Elasticsearch 混合查询、Weaviate 混合搜索、LlamaIndex <code>QueryFusionRetriever</code> 等框架封装同一思路 —— 多后端召回，再可选 rerank。",

  "Tuning tips": "调优建议",
  "<strong>Over-retrieve each channel.</strong> If BM25 returns 30 and vectors return 30, overlap means fewer than 60 unique — aim higher per channel.": "<strong>每路过度召回。</strong>BM25 30 条、向量 30 条时，重叠后唯一数会少于 60 —— 每路目标应更高。",
  "<strong>Reranker is the equaliser.</strong> Fusion order matters less once a good cross-encoder sees every candidate.": "<strong>reranker 是均衡器。</strong>好的 cross-encoder 看过所有候选后，融合顺序不那么关键。",
  "<strong>Measure on your data.</strong> Hybrid helps most when your eval set has both lexical and semantic queries — see <a href=\"/guides/evaluate-reranker.html\">evaluate rerankers</a>.": "<strong>用你自己的数据度量。</strong>评测集同时含词面与语义查询时混合收益最大 —— 见 <a href=\"/guides/evaluate-reranker.html\">评测 reranker</a>。",

  "See reranking fix a messy shortlist": "看重排序如何收拾乱序短名单",
  "Our demo includes a bi-encoder proxy column — paste distractors and watch the cross-encoder recover.": "Demo 含 bi-encoder 代理列 —— 粘贴干扰项，看 cross-encoder 如何纠正。",
  "Open the demo →": "打开 Demo →",

  "Keep reading": "继续阅读",
  "Rerank for RAG": "为 RAG 加重排序",
  "End-to-end pipeline code.": "端到端流水线代码。",
  "Evaluate rerankers": "评测 reranker",
  "Metrics and labelled test sets.": "指标与标注测试集。",
}};
window.I18N_PAGE = { zh: {
  "_title": "混合检索 + 重排序 — BM25、向量，再 rerank | reranker.uk",
  "_desc": "如何结合 BM25 与向量检索提升召回，再用 cross-encoder reranker 修正排序。融合策略、top-k 调优，以及混合检索何时优于纯向量。",

  "<a href=\"/\">Home</a><span>/</span><a href=\"/guides/\">Guides</a><span>/</span>Hybrid retrieval + rerank": "<a href=\"/\">首页</a><span>/</span><a href=\"/guides/\">指南</a><span>/</span>混合检索 + 重排序",
  "Hybrid retrieval + reranking": "混合检索 + 重排序",
  "Production · ~9 min read · <time datetime=\"2026-06-23\">Updated 23 Jun 2026</time>": "生产实践 · 约 9 分钟阅读 · <time datetime=\"2026-06-23\">更新于 2026年6月23日</time>",
  "Vector search alone often misses exact keyword matches; BM25 alone misses paraphrases. <strong>Hybrid retrieval</strong> runs both, merges the candidate lists, and a <strong>reranker</strong> then fixes the final order before your LLM sees anything.": "单纯的向量搜索常常漏掉精确关键词匹配；单纯的 BM25 又会错过语义近似表达。<strong>混合检索</strong>同时运行两者、合并候选列表，再由 <strong>reranker</strong> 在结果送入 LLM 之前修正最终顺序。",

  "On this page": "本页目录",

  "Why hybrid?": "为什么选混合检索？",
  "The retrieve-merge-rerank pattern": "检索—合并—重排序 范式",
  "Fusion strategies": "融合策略",
  "Minimal Python example": "最简 Python 示例",
  "Tuning tips": "调优建议",

  "Bi-encoder vector search excels at semantic similarity — \"vehicle\" matches \"car\". BM25 excels at lexical overlap — product SKUs, legal clause numbers, error codes. In enterprise RAG, the right chunk often needs <em>both</em> signals. Hybrid retrieval widens recall; reranking supplies precision on the merged shortlist.": "Bi-encoder 向量搜索擅长语义相似度 —— 「vehicle」能匹配「car」。BM25 擅长词汇重叠 —— 产品 SKU、法律条款编号、错误码。在企业级 RAG 中，正确的片段往往同时需要<em>两种</em>信号。混合检索拓宽召回，重排序则在合并后的短名单上提供精度。",
  "Hybrid finds more of the right hay. Reranking finds the needle in it.": "混合检索找到了更多正确的草垛，重排序则从中找到那根针。",

  "Retrieve wider than you would with a single channel — each list might return 40–60 items. After deduplication you still want 50–100 unique chunks going into the reranker. See <a href=\"/guides/rerank-rag.html\">rerank for RAG</a> for top-k defaults.": "比单通道检索更宽地召回 —— 每个列表可能返回 40–60 条。去重后，你仍需要 50–100 个唯一片段送入 reranker。默认 top-k 取值请参考<a href=\"/guides/rerank-rag.html\">为 RAG 加重排序</a>。",

  "Method": "方法",
  "How it works": "原理",
  "When to use": "适用场景",
  "Reciprocal Rank Fusion (RRF)": "互惠排名融合（RRF）",
  "Score = Σ 1/(k + rank) per list": "分数 = Σ 1/(k + rank)，每个列表单独计算",
  "Default choice — no score normalisation needed": "默认选择 —— 无需分数归一化",
  "Linear combination": "线性组合",
  "α·vector_score + (1-α)·BM25_score": "α·向量分数 + (1-α)·BM25 分数",
  "When both scores are calibrated on your data": "当两种分数都在你的数据上经过校准时",
  "Union + rerank only": "取并集 + 仅重排序",
  "Concatenate lists, dedupe, skip fusion": "拼接列表、去重，跳过融合",
  "When reranker is strong and latency budget allows": "当 reranker 足够强且延迟预算允许时",

  "Frameworks like Elasticsearch hybrid queries, Weaviate hybrid search, and LlamaIndex <code>QueryFusionRetriever</code> wrap the same idea — retrieve from multiple backends, then optionally rerank.": "Elasticsearch 混合查询、Weaviate 混合搜索和 LlamaIndex 的 <code>QueryFusionRetriever</code> 等框架都封装了同一思路 —— 从多个后端检索，然后可选地重排序。",

  "<strong>Over-retrieve each channel.</strong> If BM25 returns 30 and vectors return 30, overlap means fewer than 60 unique — aim higher per channel.": "<strong>每个通道多召回一些。</strong>如果 BM25 返回 30 条、向量也返回 30 条，重叠意味着不到 60 条唯一结果 —— 每个通道应当设置更高的召回数。",
  "<strong>Reranker is the equaliser.</strong> Fusion order matters less once a good cross-encoder sees every candidate.": "<strong>Reranker 是均衡器。</strong>一旦优质的 cross-encoder 见到所有候选，融合顺序就不那么重要了。",
  "<strong>Measure on your data.</strong> Hybrid helps most when your eval set has both lexical and semantic queries — see <a href=\"/guides/evaluate-reranker.html\">evaluate rerankers</a>.": "<strong>在你的数据上量化效果。</strong>混合检索在评测集同时包含词汇型和语义型查询时收益最大 —— 参见<a href=\"/guides/evaluate-reranker.html\">评测 reranker</a>。",

  "See reranking fix a messy shortlist": "看 reranker 整顿杂乱的候选名单",
  "Our demo includes a bi-encoder proxy column — paste distractors and watch the cross-encoder recover.": "我们的 Demo 包含 bi-encoder 代理列排序列 —— 粘贴干扰项，看 cross-encoder 如何纠正。",
  "Open the demo →": "打开 Demo →",

  "Keep reading": "继续阅读",
  "Rerank for RAG": "为 RAG 加重排序",
  "End-to-end pipeline code.": "端到端流水线代码。",
  "Evaluate rerankers": "评测 reranker",
  "Metrics and labelled test sets.": "指标与标注测试集。",
}};

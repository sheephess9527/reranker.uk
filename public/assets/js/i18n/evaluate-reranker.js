window.I18N_PAGE = { zh: {
  "_title": "如何评测 reranker — NDCG、MRR 与标注查询 | reranker.uk",
  "_desc": "评测重排序模型的实用指南：构建标注查询集、衡量 NDCG@k 与 MRR、对比重排前后效果，并对流水线变更做回归测试。",

  "<a href=\"/\">Home</a><span>/</span><a href=\"/guides/\">Guides</a><span>/</span>Evaluate rerankers": "<a href=\"/\">首页</a><span>/</span><a href=\"/guides/\">指南</a><span>/</span>评测 reranker",
  "How to evaluate rerankers": "如何评测 reranker",
  "Evaluation · ~8 min read · <time datetime=\"2026-06-23\">Updated 23 Jun 2026</time>": "评测 · 约 8 分钟阅读 · <time datetime=\"2026-06-23\">更新于 2026年6月23日</time>",
  "Public BEIR scores are a starting point, not a verdict. A reranker that wins on English news may flop on your support tickets. You need a <strong>small labelled set of real queries</strong> and two metrics: <strong>NDCG@k</strong> (ranking quality) and <strong>MRR</strong> (is the best answer near the top?).": "公开的 BEIR 分数只是起点，不是定论。在英文新闻上胜出的 reranker，用在你的工单上可能表现糟糕。你需要一个<strong>小型真实查询标注集</strong>和两个指标：<strong>NDCG@k</strong>（排序质量）和 <strong>MRR</strong>（最佳答案是否排在前面？）。",

  "On this page": "本页目录",

  "Build a labelled query set": "构建标注查询集",
  "Metrics that matter": "关键指标",
  "Evaluation protocol": "评测方案",
  "Python with ranx": "用 ranx 实现 Python 评测",
  "Comparing rerankers": "对比不同 reranker",

  "Pull 30–100 real queries from logs (anonymised). For each query, mark which document IDs are <em>relevant</em> (binary is enough to start). Store as JSON:": "从日志中抽取 30–100 条真实查询（脱敏处理）。对每条查询，标注哪些文档 ID 是<em>相关的</em>（二元标注就够了）。以 JSON 格式存储：",
  "Thirty queries with one gold document each is enough to see whether reranking beats retrieval-only — you're measuring relative lift, not publishing a leaderboard.": "每条查询有一个金标文档、共 30 条，就足以判断重排序是否优于纯检索 —— 你衡量的是相对提升，不是发布榜单。",

  "Metric": "指标",
  "What it tells you": "衡量什么",
  "Typical k": "常见 k 值",
  "<strong>NDCG@k</strong>": "<strong>NDCG@k</strong>",
  "Rewards putting highly relevant docs at the top; graded relevance if you have it": "奖励把高度相关文档排在顶部；支持分级相关性（如果有）",
  "5 or 10": "5 或 10",
  "<strong>MRR</strong>": "<strong>MRR</strong>",
  "How high the <em>first</em> relevant doc ranks — great for single-answer RAG": "<em>第一个</em>相关文档排名多高 —— 非常适合单答案 RAG",
  "—": "—",
  "<strong>Recall@k</strong>": "<strong>Recall@k</strong>",
  "Is the right doc in the shortlist at all? Diagnoses retrieval, not reranker": "正确文档是否出现在候选名单里？诊断检索问题，而非 reranker 问题",
  "50–100": "50–100",
  "Run metrics <strong>before and after</strong> reranking on the <em>same</em> retrieved candidates. If NDCG@5 jumps but Recall@50 is low, your problem is retrieval — reranking can't invent missing chunks.": "在<em>相同</em>已检索候选上计算重排序<strong>前后</strong>的指标。如果 NDCG@5 大幅提升但 Recall@50 偏低，问题出在检索上 —— reranker 无法凭空生成未被检索到的片段。",

  "Fix a retrieval pipeline (vector-only or <a href=\"/guides/hybrid-retrieval-rerank.html\">hybrid</a>) and log top-50 candidates per query.": "固定一套检索流水线（纯向量或<a href=\"/guides/hybrid-retrieval-rerank.html\">混合</a>），记录每条查询的 top-50 候选。",
  "Score baseline: order as retrieved (or bi-encoder scores).": "计算基准分数：按检索顺序排列（或使用 bi-encoder 分数）。",
  "Apply reranker A, measure NDCG@5 and MRR.": "应用 reranker A，计算 NDCG@5 和 MRR。",
  "Swap reranker B (different model or hosted API), repeat.": "换 reranker B（不同模型或托管 API），重复上述步骤。",
  "Track latency p50/p95 alongside quality — a 2-point NDCG gain may not justify 400 ms.": "同步追踪延迟 p50/p95 与质量 —— 2 个 NDCG 点的提升未必值得 400 ms 的代价。",

  "<code>ir-measures</code> and BEIR's evaluator work too. The important part is consistent qrels and the same candidate pool — not which library you pick.": "<code>ir-measures</code> 和 BEIR 的评测器同样可用。关键在于 qrels 的一致性和相同的候选池 —— 而不是你选择哪个库。",

  "Use the <a href=\"/models/\">model comparison table</a> for ballpark BEIR numbers, then validate on your labelled set. Hosted APIs (Cohere, Jina, Voyage) are fastest to A/B; open models (bge, mxbai) need GPU for fair latency comparison.": "参考<a href=\"/models/\">模型对比表</a>获取大致的 BEIR 数字，再在你的标注集上验证。托管 API（Cohere、Jina、Voyage）A/B 测试最快；开源模型（bge、mxbai）需要 GPU 才能做公平的延迟对比。",
  "<strong>Regression tests:</strong> check eval metrics into CI. When you change chunk size, embedding model, or reranker version, re-run the same JSON qrels — quality drops should block deploys.": "<strong>回归测试：</strong>将评测指标纳入 CI。每次修改分块大小、嵌入模型或 reranker 版本时，重跑相同的 JSON qrels —— 质量下降应阻止部署。",

  "Build intuition before you benchmark": "先建立直觉，再做基准测试",
  "Use the live demo to see how a cross-encoder reorders a hand-picked shortlist — then scale up with labelled queries.": "使用在线 Demo 观察 cross-encoder 如何重排精心挑选的候选名单 —— 再用标注查询扩大规模。",
  "Try the demo →": "试试 Demo →",

  "Keep reading": "继续阅读",
  "Rerank for RAG": "为 RAG 加重排序",
  "Wire reranking into your pipeline.": "把重排序接入你的流水线。",
  "Model comparison": "模型对比",
}};

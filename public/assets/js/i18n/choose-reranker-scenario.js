window.I18N_PAGE = { zh: {
  "_title": "按场景选择 reranker — RAG、客服、法律、代码 | reranker.uk",
  "_desc": "决策指南：RAG 流水线、客服工单、法律检索、代码搜索分别适合哪种 rerank 模型。含场景矩阵、模型推荐与 Demo 预设对照。",

  "<a href=\"/\">Home</a><span>/</span><a href=\"/guides/\">Guides</a><span>/</span>Choose by scenario": "<a href=\"/\">首页</a><span>/</span><a href=\"/guides/\">指南</a><span>/</span>按场景选型",
  "Which reranker fits your scenario?": "哪种 reranker 适合你的场景？",
  "Decision guide · ~8 min read · <time datetime=\"2026-06-23\">Updated 23 Jun 2026</time>": "选型指南 · 约 8 分钟阅读 · <time datetime=\"2026-06-23\">更新于 2026年6月23日</time>",
  "Rerankers are not one-size-fits-all. The right choice depends on <strong>language coverage</strong>, <strong>latency budget</strong>, <strong>data sensitivity</strong>, and whether your queries look more like <em>support tickets</em>, <em>legal clauses</em>, <em>code search</em>, or <em>RAG chunks</em>.": "Reranker 并非通用一刀切。正确选择取决于<strong>语言覆盖范围</strong>、<strong>延迟预算</strong>、<strong>数据敏感性</strong>，以及你的查询更像<em>客服工单</em>、<em>法律条款</em>、<em>代码搜索</em>还是 <em>RAG 片段</em>。",

  "On this page": "本页目录",

  "Scenario matrix": "场景矩阵",
  "RAG &amp; knowledge bases": "RAG 与知识库",
  "Customer support": "客户服务",
  "Legal &amp; compliance": "法律与合规",
  "Code &amp; technical docs": "代码与技术文档",
  "Try it in the demo": "在 Demo 中试试",

  "Scenario": "场景",
  "Typical challenge": "典型挑战",
  "Starting recommendation": "入门推荐",
  "Run where": "运行方式",
  "RAG pipeline": "RAG 流水线",
  "Noisy vector recall, need top-5 precision": "向量召回噪声大，需要 top-5 精度",
  "Your GPU / hosted API": "自有 GPU / 托管 API",
  "Customer support": "客户支持",
  "Many similar FAQ lines, fast response": "大量相似 FAQ 条目，需要快速响应",
  "API or browser demo": "API 或浏览器 Demo",
  "Legal / contracts": "法律 / 合同",
  "Subtle wording, distractors share vocabulary": "措辞细微差异，干扰项共享词汇",
  "Self-host / API": "自建 / API",
  "Code &amp; API docs": "代码 &amp; API 文档",
  "Exact identifiers, syntax matters": "精确标识符，语法至关重要",
  "Hybrid retrieve + rerank": "混合检索 + 重排序",

  "Retrieve 50–100 chunks, rerank to 5–10, then prompt. Multilingual knowledge bases favour <strong>bge-v2-m3</strong> or <strong>Cohere v3.5</strong>. English-only stacks with tight quality targets often pick <strong>mxbai-large</strong>. See <a href=\"/guides/rerank-rag.html\">rerank for RAG</a> and <a href=\"/guides/hybrid-retrieval-rerank.html\">hybrid retrieval</a> when lexical matches matter.": "召回 50–100 个片段，重排序至 5–10 个，再送入 prompt。多语言知识库倾向 <strong>bge-v2-m3</strong> 或 <strong>Cohere v3.5</strong>。英文专用且对质量要求严格的场景通常选 <strong>mxbai-large</strong>。当词汇精确匹配重要时，参见<a href=\"/guides/rerank-rag.html\">为 RAG 加重排序</a>和<a href=\"/guides/hybrid-retrieval-rerank.html\">混合检索</a>。",
  "Rule of thumb: if bi-encoder recall is already good, a mid-size reranker is enough. If recall is messy, fix retrieval width first.": "经验法则：如果 bi-encoder 召回已经够好，中等规模的 reranker 就够了。如果召回一塌糊涂，先修好检索覆盖面。",

  "Queries are short, passages are FAQ-sized, and latency dominates UX. A <strong>tiny</strong> cross-encoder (Jina tiny, ms-marco MiniLM) often suffices — you are choosing among a handful of similar answers, not reading 100-page PDFs. Try the <strong>Customer support</strong> preset in our <a href=\"/demo.html\">demo</a>.": "查询较短，段落是 FAQ 大小，延迟主导用户体验。一个<strong>微型</strong> cross-encoder（Jina tiny、ms-marco MiniLM）通常就够了 —— 你是在少量相似答案中做选择，而不是阅读 100 页 PDF。试试我们 <a href=\"/demo.html\">Demo</a> 中的<strong>客户支持</strong>预设。",

  "Distractors share vocabulary (\"termination\", \"notice period\", \"breach\"). Bi-encoders confuse them; cross-encoders separate nuance. Budget extra latency for a larger model and keep passages to single clauses. Demo preset: <strong>Legal clause</strong>.": "干扰项共享词汇（"termination"、"notice period"、"breach"）。Bi-encoder 会混淆它们，cross-encoder 能区分细微差异。为更大的模型预留额外延迟，并将段落保持在单个条款的长度。Demo 预设：<strong>法律条款</strong>。",

  "Vector search alone misses exact function names; BM25 alone misses paraphrased \"how do I…\" questions. Use <strong>hybrid retrieval</strong>, then rerank. Domain rerankers (Voyage code) help; otherwise bge-base + good chunking works. Demo presets: <strong>Technical docs</strong> and <strong>Code search</strong>.": "单纯向量搜索会漏掉精确的函数名；单纯 BM25 会错过"我怎么……"之类的改写查询。使用<strong>混合检索</strong>，然后重排序。领域 reranker（Voyage code）有帮助；否则 bge-base + 良好的分块也能奏效。Demo 预设：<strong>技术文档</strong>和<strong>代码搜索</strong>。",

  "Each scenario below maps to a built-in preset — load it, hit Rerank, and watch the bi-encoder proxy column mis-order before the cross-encoder fixes it.": "下面每个场景都对应一个内置预设 —— 加载它，点击重排序，看 bi-encoder 代理列先如何错误排序，再看 cross-encoder 如何纠正。",
  "Mixed on-topic + off-topic chunks.": "混合切题与跑题的片段。",
  "Tracking vs refunds vs passwords.": "物流查询 vs 退款 vs 密码重置。",
  "Several \"termination\" distractors.": "多个"终止"相关的干扰项。",
  "Technical docs": "技术文档",
  "API rate limits vs unrelated endpoints.": "API 速率限制 vs 不相关接口。",

  "Still deciding?": "还在犹豫？",
  "Compare all five model families side by side, then jump into the demo with one click.": "并排对比所有五个模型家族，然后一键跳入 Demo。",
  "Compare models →": "对比模型 →",

  "Keep reading": "继续阅读",
  "Self-host a reranker": "自托管 reranker",
  "sentence-transformers + serving.": "sentence-transformers + 服务化。",
  "Evaluate rerankers": "评测 reranker",
  "Prove the choice on your data.": "在你的数据上验证选型。",
}};

window.I18N_PAGE = { zh: {
  "Cohere Rerank 5":
    "Cohere Rerank 5",
  "Hosted API · Cohere · <time datetime=\"2026-10-21\">Updated 21 Oct 2026</time>":
    "托管 API · Cohere · <time datetime=\"2026-10-21\">更新于 2026 年 10 月 21 日</time>",
  "Cohere Rerank was one of the first commercial reranking APIs and remains among the most widely deployed. The current generation, <strong>Rerank 5</strong>, was released on 21 October 2026 in two variants: <code>rerank-v5.0-pro</code> (about {{fact:cohere-rerank-5.pro_params}} parameters) for quality and <code>rerank-v5.0-fast</code> (about {{fact:cohere-rerank-5.fast_params}}) for throughput. Both take {{fact:cohere-rerank-5.context_tokens}} tokens and 100+ languages, return calibrated scores, and can point to the passages that matter inside each document. Rerank 4 remains available.":
    "Cohere Rerank 是最早的商用重排序 API 之一，至今仍是部署最广的之一。当前一代 <strong>Rerank 5</strong> 于 2026 年 10 月 21 日发布，分两个版本：重质量的 <code>rerank-v5.0-pro</code>（约 {{fact:cohere-rerank-5.pro_params}} 参数）和重吞吐的 <code>rerank-v5.0-fast</code>（约 {{fact:cohere-rerank-5.fast_params}}）。两者都支持 {{fact:cohere-rerank-5.context_tokens}} token 和 100 多种语言，返回校准过的分数，还能指出每篇文档里真正相关的段落。Rerank 4 仍可继续使用。",
  "What’s new in Rerank 5":
    "Rerank 5 有什么新东西",
  "Previous flagship (April 2026)":
    "上一代旗舰（2026 年 4 月）",
  "Current flagship, about {{fact:cohere-rerank-5.pro_params}} parameters; best for reasoning-heavy queries and long or domain-specific documents":
    "当前旗舰，约 {{fact:cohere-rerank-5.pro_params}} 参数；最适合需要推理的查询和长篇或专业领域文档",
  "About {{fact:cohere-rerank-5.fast_params}} parameters; for high-volume search and agent loops":
    "约 {{fact:cohere-rerank-5.fast_params}} 参数；适合高并发搜索和智能体循环调用",
  "For new work, start with <code>rerank-v5.0-pro</code>, or <code>rerank-v5.0-fast</code> when throughput or tail latency matters more; Cohere say Rerank 5 Fast outperforms Rerank 4 Pro. Upgrading is a change to the <code>model</code> parameter: a reranker reads raw text at query time, so nothing needs re-indexing. Cohere hadn’t listed a Rerank 5 price on their pricing page by 21 October, so budget against Rerank 4’s until they do.":
    "新项目先用 <code>rerank-v5.0-pro</code>；更看重吞吐或尾延迟时用 <code>rerank-v5.0-fast</code>。Cohere 称 Rerank 5 Fast 胜过 Rerank 4 Pro。升级只需改 <code>model</code> 参数：重排序模型在查询时直接读原文，所以什么都不用重建索引。到 10 月 21 日为止，Cohere 的价格页还没有列出 Rerank 5 的价格，在那之前先按 Rerank 4 的价格做预算。",
  "<strong>Calibrated scores.</strong> Each result’s score runs from 0 to 1 and is meant to mean the same thing across queries and domains, so one threshold can decide what reaches your LLM, or when to search again or answer “I don’t know”. Check any threshold tuned on Rerank 4 before reusing it.":
    "<strong>校准过的分数。</strong>每个结果的分数在 0 到 1 之间，并且在不同查询、不同领域之间含义一致，所以可以用一个阈值决定哪些结果交给 LLM，或者什么时候重新检索、回答“不知道”。在 Rerank 4 上调好的阈值，复用前要重新检查。",
  "<strong>Context Focus.</strong> Optional, and off by default. Add <code>relevant_spans</code> to the request and each result also returns the passages inside the document that answer the query, as scored character offsets, so you can send only those to your LLM or highlight them for users.":
    "<strong>Context Focus。</strong>可选功能，默认关闭。在请求里加上 <code>relevant_spans</code>，每个结果还会返回文档内回答了查询的段落（带分数的字符偏移），这样可以只把这些段落交给 LLM，或者在界面上高亮给用户看。",
  "<strong>Semi-structured data.</strong> Pass JSON, tables or records as YAML strings.":
    "<strong>半结构化数据。</strong>JSON、表格或记录以 YAML 字符串的形式传入。",
  "A higher <code>threshold</code> keeps less text, and <code>max_spans</code> caps the passages per document. Cohere note that Context Focus suits targeted questions; summarisation needs the whole document, and tables, forms and code split less cleanly than prose. It is available through Cohere’s own API.":
    "<code>threshold</code> 越高，保留的文字越少；<code>max_spans</code> 限制每篇文档返回的段落数。Cohere 提醒，Context Focus 适合针对性的问题；总结类请求需要整篇文档，表格、表单和代码也不如普通文字切得干净。这个功能通过 Cohere 自己的 API 提供。",
  "<strong>What it doesn’t do:</strong> Rerank 5 takes text only, and it doesn’t accept instructions that change how relevance is judged. For that, see <a href=\"/guides/instruction-reranker.html\">instruction-following rerankers</a> such as Voyage rerank-3 or Qwen3-Reranker.":
    "<strong>它做不到的：</strong>Rerank 5 只接收文本，也不接受改变相关性判断方式的指令。需要指令的话，看 Voyage rerank-3 或 Qwen3-Reranker 这类<a href=\"/guides/instruction-reranker.html\">能跟随指令的重排序模型</a>。",
  "<strong>Where it runs:</strong> the Cohere API, Cohere’s Model Vault, Microsoft Foundry and Amazon SageMaker, or a private deployment. Amazon Bedrock’s rerank API still lists only Rerank 3.5.":
    "<strong>在哪里能用：</strong>Cohere API、Cohere 的 Model Vault、Microsoft Foundry 和 Amazon SageMaker，或者私有部署。Amazon Bedrock 的重排序 API 仍然只有 Rerank 3.5。",
  "Not yet listed":
    "尚未公布",
  "No Rerank 5 price on cohere.com/pricing as of 21 October 2026":
    "截至 2026 年 10 月 21 日，cohere.com/pricing 上还没有 Rerank 5 的价格",
  "Rerank 5: calibrated scores and Context Focus":
    "Rerank 5：校准过的分数和 Context Focus",
  "No task instructions, even in Rerank 5":
    "不支持任务指令，Rerank 5 也不支持",
  "<strong>Through a cloud instead:</strong> <a href=\"/models/#amazon-bedrock\">Amazon Bedrock</a> sells Cohere Rerank 3.5 at ${{fact:amazon-bedrock-rerank.cohere_3_5_usd_per_1000_queries}} per 1,000 queries of up to {{fact:amazon-bedrock-rerank.docs_per_query}} documents. <a href=\"/guides/rerank-vector-database.html#pinecone\">Pinecone</a> serves cohere-rerank-4-fast inside its vector database, and since 31 August 2026 has answered requests for cohere-rerank-3.5 with 4-fast.":
    "<strong>也可以通过云平台用：</strong><a href=\"/models/#amazon-bedrock\">Amazon Bedrock</a> 提供 Cohere Rerank 3.5，每 1,000 次查询 ${{fact:amazon-bedrock-rerank.cohere_3_5_usd_per_1000_queries}}，每次查询最多 {{fact:amazon-bedrock-rerank.docs_per_query}} 个文档。<a href=\"/guides/rerank-vector-database.html#pinecone\">Pinecone</a> 在自家向量数据库里提供 cohere-rerank-4-fast，并且从 2026 年 8 月 31 日起，对 cohere-rerank-3.5 的请求都改由 4-fast 响应。",
  "Cohere Rerank 4":
    "Cohere Rerank 4",
  "Hosted API · Cohere · <time datetime=\"2026-08-11\">Updated 11 Aug 2026</time>":
    "托管 API · Cohere · <time datetime=\"2026-08-11\">更新于 2026 年 8 月 11 日</time>",
  "Cohere Rerank was one of the first commercial reranking APIs and remains among the most widely deployed. The current generation, <strong>Rerank 4</strong> (released April 2026), ships as two variants — <code>rerank-v4.0-pro</code> for precision and <code>rerank-v4.0-fast</code> for throughput — both with a {{fact:cohere-rerank.context_tokens}}-token context window and 100+ languages, behind a clean REST + SDK interface.":
    "Cohere Rerank 是最早的商用重排序 API 之一，至今仍是部署最广泛的产品之一。当前一代 <strong>Rerank 4</strong>（2026 年 4 月发布）提供两个版本 —— 偏精度的 <code>rerank-v4.0-pro</code> 与偏吞吐的 <code>rerank-v4.0-fast</code> —— 两者都是 {{fact:cohere-rerank.context_tokens}} token 上下文、支持 100+ 语言，接口为简洁的 REST + SDK。",
  "Use <code>rerank-v4.0-pro</code> by default. Switch to <code>rerank-v4.0-fast</code> when throughput or tail latency matters more than the last point of precision — the two are priced close enough (${{fact:cohere-rerank-4-pro.price_per_search}} vs ${{fact:cohere-rerank-4-fast.price_per_search}} a search) that quality, not cost, should drive the choice.":
    "默认用 <code>rerank-v4.0-pro</code>。当吞吐或尾延迟比最后一点精度更重要时再换 <code>rerank-v4.0-fast</code> —— 两者价格相差很小（每次检索 ${{fact:cohere-rerank-4-pro.price_per_search}} 对 ${{fact:cohere-rerank-4-fast.price_per_search}}），所以该由质量而非成本来决定选型。",
  "A search = 1 query + up to 100 documents":
    "一次检索 = 1 个 query + 最多 100 篇文档",
  "Same billing unit":
    "计费单位相同",
  "Current flagship; higher-precision reranking":
    "当前旗舰；更高精度的重排序",
  "Lower latency, higher throughput":
    "更低延迟、更高吞吐",
  "Previous multilingual flagship":
    "上一代多语言旗舰",
  "32,000-token context window":
    "32,000 token 上下文窗口",
  "Consistent quality across 100+ languages":
    "在 100+ 语言上质量稳定",
  "_title": "Cohere Rerank 5：托管重排序 API 评测 | reranker.uk",
  "_desc": "Cohere Rerank 5 评测（2026 年 10 月）：rerank-v5.0-pro 与 rerank-v5.0-fast、校准过的分数和 Context Focus、相比 Rerank 4 有什么变化、价格、Python 与 Node SDK 用法，以及为 RAG 选型的优缺点。",

  "<a href=\"/\">Home</a><span>/</span><a href=\"/models/\">Models</a><span>/</span>Cohere Rerank": "<a href=\"/\">首页</a><span>/</span><a href=\"/models/\">模型对比</a><span>/</span>Cohere Rerank",
  "Cohere Rerank": "Cohere Rerank",
  "Hosted API · Cohere": "托管 API · Cohere",
  "Cohere Rerank was one of the first commercial reranking APIs and remains among the most widely deployed. The current generation — <code>rerank-v3.5</code> — delivers strong multilingual precision on BEIR benchmarks, a clean REST + SDK interface, and a free tier generous enough for development and low-volume production.": "Cohere Rerank 是最早的商业重排序 API 之一，至今仍是部署最广泛的产品之一。当前这一代 —— <code>rerank-v3.5</code> —— 在 BEIR 基准上有很强的多语言精度，提供简洁的 REST + SDK 接口，免费额度也足够开发和低流量生产使用。",

  "Available models": "可用模型",
  "Pricing": "价格",
  "Quick start": "快速上手",
  "Pros and cons": "优缺点",

  "Model ID": "模型 ID",
  "Languages": "语言",
  "Context": "上下文",
  "Notes": "说明",
  "100+ langs": "100+ 种语言",
  "English": "英文",
  "Current best; multilingual flagship": "当前最佳；多语言旗舰",
  "Slightly faster, English-only": "略快，仅英文",
  "Previous multilingual generation": "上一代多语言模型",
  "Use <code>rerank-v3.5</code> by default. Downgrade to <code>rerank-english-v3.0</code> only if you're English-only and every millisecond matters.": "默认使用 <code>rerank-v3.5</code>。只有当你纯英文、且每一毫秒都很关键时，才降级到 <code>rerank-english-v3.0</code>。",

  "Tier": "档位",
  "Price": "价格",
  "Limits": "限制",
  "Free": "免费",
  "1,000 API calls/month": "每月 1,000 次 API 调用",
  "Pay-as-you-go": "按量付费",
  "~$2 / 1,000 searches": "约 $2 / 1,000 次搜索",
  "No limit": "无上限",
  "Enterprise": "企业版",
  "Custom": "定制",
  "SLA, private deployment options": "SLA、私有部署选项",
  "Check the official Cohere pricing page for current rates — figures above may be outdated.": "当前费率请查阅 Cohere 官方价格页 —— 上方数字可能已过时。",

  "Mature, production-grade API with an SLA": "成熟的生产级 API，带 SLA",
  "Top multilingual BEIR scores": "顶级的多语言 BEIR 成绩",
  "SDK support: Python, Node, Java, Go, curl": "SDK 支持：Python、Node、Java、Go、curl",
  "Generous free tier for prototyping": "适合原型开发的慷慨免费额度",
  "4096-token document context window": "4096 token 的文档上下文窗口",
  "Simple, predictable pricing": "简单、可预期的定价",
  "Closed weights — you depend on Cohere": "权重闭源 —— 你依赖于 Cohere",
  "Per-call cost adds up at high volume": "高流量下按次成本会累积",
  "No self-hosted option (for most plans)": "（大多数套餐）没有自建部署选项",
  "Latency is network-bound (~100–200 ms)": "延迟受网络限制（约 100–200 ms）",

  "Try reranking without an API key": "无需 API 密钥也能试重排序",
  "Our demo runs a cross-encoder entirely in your browser — no signup, no cost.": "我们的 Demo 完全在你的浏览器里运行一个 cross-encoder —— 无需注册、零成本。",
  "Open the demo →": "打开 Demo →",

  "bge-reranker": "bge-reranker",
  "Free, open-weight alternative.": "免费的开源权重替代品。",
  "Jina Reranker": "Jina Reranker",
  "Open weights + hosted API.": "开源权重 + 托管 API。",
  "Voyage Rerank": "Voyage Rerank",
  "High-precision hosted API.": "高精度托管 API。",
  "mxbai-rerank": "mxbai-rerank",
  "Apache 2.0 open weights, browser xsmall.": "Apache 2.0 开源权重，浏览器可跑 xsmall。",

  "Hosted API · Cohere · <time datetime=\"2026-06-21\">Updated 21 Jun 2026</time>": "托管 API · Cohere · <time datetime=\"2026-06-21\">更新于 2026 年 6 月 21 日</time>",
  "Hosted API": "托管 API",
  "Multilingual": "多语言",
  "Free tier": "免费档",
  "On this page": "本页目录",
  "<a href=\"#models\">Available models</a>": "<a href=\"#models\">可用模型</a>",
  "<a href=\"#pricing\">Pricing</a>": "<a href=\"#pricing\">价格</a>",
  "<a href=\"#usage\">Quick start</a>": "<a href=\"#usage\">快速上手</a>",
  "<a href=\"#pros-cons\">Pros and cons</a>": "<a href=\"#pros-cons\">优缺点</a>",
  "Python": "Python",
  "Node.js": "Node.js",
  "REST (curl)": "REST（curl）",
  "Pros": "优点",
  "Cons": "缺点",
  "Other models": "其他模型",

  // Oct 2026: jina-reranker-v3.5, licences
  "Hosted API · Cohere · <time datetime=\"2026-10-01\">Updated 1 Oct 2026</time>":
    "托管 API · Cohere · <time datetime=\"2026-10-01\">更新于 2026 年 10 月 1 日</time>",
  "Free trial key":
    "免费试用 key",
  "Trial key":
    "试用 key",
  "{{fact:cohere-rerank.trial_calls_per_month}} API calls a month; Rerank limited to 10 requests a minute; not for production or commercial use":
    "每月 {{fact:cohere-rerank.trial_calls_per_month}} 次 API 调用；Rerank 每分钟限 10 次请求；不得用于生产或商业用途",
  "A search = 1 query + up to {{fact:cohere-rerank.docs_per_search}} documents; a document over {{fact:cohere-rerank.billing_chunk_tokens}} tokens (query included) counts as one per {{fact:cohere-rerank.billing_chunk_tokens}}-token chunk":
    "一次检索 = 1 个 query + 最多 {{fact:cohere-rerank.docs_per_search}} 篇文档；文档（连同 query）超过 {{fact:cohere-rerank.billing_chunk_tokens}} token 时，每 {{fact:cohere-rerank.billing_chunk_tokens}} token 一块，每块算一篇",
  "Model Vault":
    "Model Vault（专属实例）",
  "From $5 / hour":
    "每小时 $5 起",
  "Dedicated instances: Rerank 4 Fast or Pro (Medium) $5 an hour, Pro (Large) $10 an hour":
    "专属实例：Rerank 4 Fast 或 Pro（Medium）每小时 $5，Pro（Large）每小时 $10",
  "Private deployment":
    "私有部署",
  "On-premises or isolated VPC":
    "本地部署或隔离的 VPC",
  "Prices from <a href=\"https://cohere.com/pricing\" rel=\"noopener noreferrer\">cohere.com/pricing</a> ($2.50 and $2 per 1,000 searches) and Cohere’s <a href=\"https://docs.cohere.com/docs/rate-limits\" rel=\"noopener noreferrer\">rate-limit docs</a>, verified 1 October 2026 and re-checked daily by this site’s source check. The {{fact:cohere-rerank.billing_chunk_tokens}}-token rule matters: see the <a href=\"/rerank-cost-calculator.html\">cost calculator</a> for what it does to a real workload.":
    "价格取自 <a href=\"https://cohere.com/pricing\" rel=\"noopener noreferrer\">cohere.com/pricing</a>（每千次检索 $2.50 和 $2）和 Cohere 的<a href=\"https://docs.cohere.com/docs/rate-limits\" rel=\"noopener noreferrer\">速率限制文档</a>，2026 年 10 月 1 日核对，本站来源检查每天复核。{{fact:cohere-rerank.billing_chunk_tokens}} token 规则影响不小：它对真实负载意味着什么，见<a href=\"/rerank-cost-calculator.html\">成本计算器</a>。",
  "Free trial key for prototyping ({{fact:cohere-rerank.trial_calls_per_month}} calls a month)":
    "免费试用 key 适合原型开发（每月 {{fact:cohere-rerank.trial_calls_per_month}} 次调用）",
  "{{fact:cohere-rerank.context_tokens}}-token context window":
    "{{fact:cohere-rerank.context_tokens}} token 上下文窗口",
  "Per-search pricing is easy to forecast for short passages":
    "段落较短时，按次计费很容易预估",
  "Self-hosting means a private-deployment contract":
    "想自建部署需要签私有部署合同",
  "Passages over {{fact:cohere-rerank.billing_chunk_tokens}} tokens are billed as several documents":
    "超过 {{fact:cohere-rerank.billing_chunk_tokens}} token 的段落会按多篇文档计费",
  "Custom":
    "定制",

  // Oct 2026: jina-reranker-v3.5, licences
  "Every call is a network round trip — measure from your own region":
    "每次调用都要走一趟网络 —— 请从你自己所在的区域实测",
}};

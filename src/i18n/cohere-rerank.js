window.I18N_PAGE = { zh: {
  "Cohere Rerank 4":
    "Cohere Rerank 4",
  "Hosted API · Cohere · <time datetime=\"2026-08-11\">Updated 11 Aug 2026</time>":
    "托管 API · Cohere · <time datetime=\"2026-08-11\">更新于 2026 年 8 月 11 日</time>",
  "Cohere Rerank was one of the first commercial reranking APIs and remains among the most widely deployed. The current generation, <strong>Rerank 4</strong> (released April 2026), ships as two variants — <code>rerank-v4.0-pro</code> for precision and <code>rerank-v4.0-fast</code> for throughput — both with a 32,000-token context window and 100+ languages, behind a clean REST + SDK interface.":
    "Cohere Rerank 是最早的商用重排序 API 之一，至今仍是部署最广泛的产品之一。当前一代 <strong>Rerank 4</strong>（2026 年 4 月发布）提供两个版本 —— 偏精度的 <code>rerank-v4.0-pro</code> 与偏吞吐的 <code>rerank-v4.0-fast</code> —— 两者都是 32,000 token 上下文、支持 100+ 语言，接口为简洁的 REST + SDK。",
  "Use <code>rerank-v4.0-pro</code> by default. Switch to <code>rerank-v4.0-fast</code> when throughput or tail latency matters more than the last point of precision — the two are priced close enough ($0.0025 vs $0.002 a search) that quality, not cost, should drive the choice.":
    "默认用 <code>rerank-v4.0-pro</code>。当吞吐或尾延迟比最后一点精度更重要时再换 <code>rerank-v4.0-fast</code> —— 两者价格相差很小（每次检索 $0.0025 对 $0.002），所以该由质量而非成本来决定选型。",
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
  "_title": "Cohere Rerank 4：托管重排序 API 评测 | reranker.uk",
  "_desc": "Cohere Rerank 4 评测：对比 rerank-v4.0-pro 与 rerank-v4.0-fast —— 32k 上下文、100+ 语言、按次检索计费，含 Python 与 Node SDK 用法及为 RAG 加重排序的优缺点。",

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
}};

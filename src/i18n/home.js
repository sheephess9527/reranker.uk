window.I18N_PAGE = { zh: {
  "0.6B / 4B / 8B Apache 2.0 family — the multilingual GPU self-host pick. Start at 4B, not 8B.":
    "0.6B / 4B / 8B 的 Apache 2.0 家族 —— 多语言 GPU 自托管首选。从 4B 起步，而不是 8B。",
  "Mature hosted API in Pro and Fast variants — 32k context, 100+ languages, billed per search.":
    "成熟的托管 API，分 Pro 与 Fast 两档 —— 32k 上下文、100+ 语言，按「次检索」计费。",
  "0.6B listwise model at 61.94 BEIR — ahead of Qwen3-Reranker-4B. v1-tiny powers our demo.":
    "0.6B 的 listwise 模型，BEIR 达 61.94 —— 优于 Qwen3-Reranker-4B。v1-tiny 仍在驱动我们的 Demo。",
  "Hosted rerankers you steer with a natural-language instruction. 32k context, per-token pricing.":
    "可以用自然语言指令来引导的托管重排序器。32k 上下文，按 token 计费。",
  "_title": "Reranker 是什么？浏览器内免费体验重排序模型 | reranker.uk",
  "_desc": "免费在浏览器里体验 Reranker（重排序模型）。纯客户端运行，无需 API Key，保护隐私。学习 reranker 原理，并通过交互式 Demo 理解它如何提升 RAG 检索效果。",

  "Reranker · rerank model · rerank for RAG": "Reranker · rerank 模型 · 为 RAG 重排序",
  "Understand rerankers. Then watch one run in your browser.": "读懂 reranker，再亲眼看它在你的浏览器里运行。",
  "A reranker re-scores your retrieved candidates so the most relevant passages rise to the top. Learn how it works, compare the popular models, and try a cross-encoder live — with zero API cost and nothing leaving your machine.": "重排序器（reranker）会对检索得到的候选重新打分，让最相关的段落浮到最前面。在这里了解它的原理、对比主流模型，并实时体验一个 cross-encoder —— 零 API 成本，数据全程不离开你的设备。",
  "▶ Try the live demo": "▶ 试试在线 Demo",
  "Start with the basics": "从基础概念开始",
  "Runs on transformers.js · 100% client-side · no key required": "基于 transformers.js · 100% 在客户端运行 · 无需密钥",

  "Start here": "从这里开始",
  "Three short guides take you from “what is a reranker?” to a working reranking stage in your RAG pipeline.": "三篇短指南，带你从“什么是 reranker？”一路走到在 RAG 流水线中真正可用的重排序环节。",

  "What is a reranker?": "什么是 reranker？",
  "The two-stage retrieval pattern, why order matters, and where reranking fits.": "两阶段检索范式、排序为何重要，以及重排序在其中的位置。",
  "A reranker scores (query, document) pairs jointly — far more accurate than cosine similarity alone.": "reranker 联合对 (query, document) 对打分 —— 远比单独做余弦相似度准确。",
  "Cross-encoder vs bi-encoder": "Cross-encoder vs bi-encoder",
  "Why bi-encoders are fast and cross-encoders are accurate — and how to use both.": "为什么 bi-encoder 快、cross-encoder 准，以及如何把两者结合使用。",
  "Bi-encoders retrieve at scale; cross-encoders rank with precision. Use them in two stages.": "bi-encoder 负责大规模召回，cross-encoder 负责精准排序。把它们组合成两个阶段来使用。",
  "How to add reranking to RAG": "如何为 RAG 加重排序",
  "Retrieve wide, rerank, keep the best. With code, top-k tips and latency trade-offs.": "宽召回、重排序、保留最优。含代码、top-k 取值建议与延迟取舍。",
  "Retrieve 50+ candidates, rerank, keep 5 — better answers and fewer tokens to the LLM.": "召回 50+ 个候选，重排序，保留 5 个 —— 更好的答案，更少的 token 送进 LLM。",

  "The fun part": "最有意思的部分",
  "Rerank in your browser, right now": "现在就在你的浏览器里重排序",
  "Paste a query and a few candidate passages. A real cross-encoder downloads once, caches, and scores every pair locally — you watch the ranking reshuffle in milliseconds. No server, no API key, no data leaving the page.": "粘贴一个查询和几段候选文本。一个真实的 cross-encoder 只需下载一次并缓存，之后在本地对每一对打分 —— 你能看到排名在毫秒间重新洗牌。没有服务器、没有 API 密钥，数据不离开页面。",
  "Real model weights via transformers.js + ONNX Runtime Web": "通过 transformers.js + ONNX Runtime Web 加载真实模型权重",
  "Zero API cost and zero abuse risk — it’s all on your device": "零 API 成本、零滥用风险 —— 一切都在你的设备上完成",
  "See exactly how scores reorder your retrieval results": "直观看到分数如何重新排列你的检索结果",
  "Open the demo →": "打开 Demo →",

  "Compare the rerank models": "对比主流重排序模型",
  "2026 open SOTA candidates (<a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a>), Jina v3 listwise, classic bge/mxbai, hosted Cohere/Voyage — plus late-interaction and instruction APIs.": "2026 开源 SOTA 候选（<a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a>）、Jina v3 listwise、经典 bge/mxbai、托管 Cohere/Voyage —— 以及 late-interaction 与指令 API。",
  "Also: <a href=\"/guides/late-interaction-rerank.html\">ColBERT / late-interaction</a> · <a href=\"/guides/instruction-reranker.html\">instruction-following rerank</a>": "另见：<a href=\"/guides/late-interaction-rerank.html\">ColBERT / late-interaction</a> · <a href=\"/guides/instruction-reranker.html\">指令跟随 rerank</a>",
  "0.6B / 4B / 8B open family — default GPU self-host pick in 2026 when quality matters.": "0.6B / 4B / 8B 开源家族 —— 2026 质量优先时默认 GPU 自建选择。",
  "Open-weight rerankers from BAAI. Still the best CPU-friendly multilingual default.": "智源（BAAI）开源权重。仍是 CPU 友好的多语言默认。",
  "Listwise long-context flagship; v1-tiny still powers the browser demo.": "Listwise 长上下文旗舰；v1-tiny 仍驱动浏览器 Demo。",
  "A mature hosted rerank API with strong multilingual quality and simple integration.": "成熟的托管重排序 API，多语言质量强、接入简单。",
  "Hosted rerankers tuned for retrieval quality, with domain-specific variants.": "为检索质量调优的托管重排序器，并提供面向特定领域的变体。",
  "Apache 2.0 open weights with a browser-runnable xsmall variant — highest BEIR score in our table.": "Apache 2.0 开源权重，含可在浏览器运行的 xsmall 变体 —— 本表中 BEIR 分数最高。",
  "See the full comparison →": "查看完整对比 →",

  "Fundamentals": "基础",
  "Architecture": "架构",
  "Practical": "实战",
  "Open weights": "开源权重",
  "Self-host": "自建部署",
  "Hosted API": "托管 API",
  "Multilingual": "多语言",
  "High quality": "高质量",
  "Browser ✓": "浏览器 ✓",

  "Reranking in one diagram": "一张图看懂重排序",
  "Retrieve wide for recall, rerank for precision, send only the best to the model.": "宽召回保证 recall，重排序保证 precision，只把最优结果送进模型。"
}};

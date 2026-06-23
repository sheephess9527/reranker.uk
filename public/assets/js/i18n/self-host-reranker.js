window.I18N_PAGE = { zh: {
  "_title": "如何自托管 reranker — sentence-transformers、GPU、部署 | reranker.uk",
  "_desc": "自托管 cross-encoder reranker 实战指南：模型选择（bge、mxbai、Jina）、sentence-transformers 快速上手、FastAPI 服务化与运维清单。",

  "<a href=\"/\">Home</a><span>/</span><a href=\"/guides/\">Guides</a><span>/</span>Self-host a reranker": "<a href=\"/\">首页</a><span>/</span><a href=\"/guides/\">指南</a><span>/</span>自托管 reranker",
  "How to self-host a reranker": "如何自托管 reranker",
  "Production · ~10 min read · <time datetime=\"2026-06-23\">Updated 23 Jun 2026</time>": "生产实践 · 约 10 分钟阅读 · <time datetime=\"2026-06-23\">更新于 2026年6月23日</time>",
  "Hosted rerank APIs are convenient, but <strong>self-hosting</strong> gives you zero per-call cost, full data control, and predictable latency on your own GPU or CPU fleet. Here's a practical path from a first <code>CrossEncoder</code> call to a production microservice.": "托管重排序 API 虽然方便，但<strong>自建部署</strong>能给你零按次成本、完全的数据控制权，以及在自有 GPU 或 CPU 集群上可预期的延迟。这里是从第一次 <code>CrossEncoder</code> 调用到生产微服务的实践路径。",

  "On this page": "本页目录",

  "When self-hosting wins": "自建部署的优势场景",
  "Pick a model": "选择模型",
  "Quick start with sentence-transformers": "sentence-transformers 快速上手",
  "Serving options": "部署方式",
  "Ops checklist": "运维清单",

  "<strong>High volume.</strong> Reranking 50–100 chunks per query adds up fast on per-1k-doc APIs.": "<strong>高流量。</strong>每次查询重排序 50–100 个片段，按千条计费的 API 成本累积很快。",
  "<strong>Data residency.</strong> Queries and documents never leave your VPC.": "<strong>数据驻留。</strong>查询和文档永远不会离开你的 VPC。",
  "<strong>Custom fine-tuning.</strong> You can swap in a domain-tuned checkpoint without waiting on a vendor.": "<strong>自定义微调。</strong>你可以随时替换领域调优的检查点，无需等待厂商。",
  "When you need multilingual quality with minimal ops, a hosted API like <a href=\"/models/cohere-rerank.html\">Cohere Rerank</a> or <a href=\"/models/jina-reranker.html\">Jina</a> may still be cheaper all-in — see <a href=\"/guides/choose-reranker-scenario.html\">choose by scenario</a>.": "当你需要多语言质量且希望最小化运维时，<a href=\"/models/cohere-rerank.html\">Cohere Rerank</a> 或 <a href=\"/models/jina-reranker.html\">Jina</a> 等托管 API 综合成本可能更低 —— 参见<a href=\"/guides/choose-reranker-scenario.html\">按场景选型</a>。",

  "Model": "模型",
  "Size": "体积",
  "Best for": "最适合",
  "~278M": "~2.78 亿参数",
  "Strong English default, easy HF integration": "强力英文基线，易于集成 HuggingFace",
  "~568M": "~5.68 亿参数",
  "Multilingual production choice": "多语言生产首选",
  "~435M": "~4.35 亿参数",
  "Top BEIR score, Apache 2.0 licence": "BEIR 分数最高，Apache 2.0 协议",
  "Same family as the hosted API": "与托管 API 同一家族",
  "Start with <strong>bge-reranker-base</strong> on CPU for prototyping; move to <strong>v2-m3</strong> or <strong>mxbai-large</strong> on GPU when quality metrics justify it.": "原型阶段从 CPU 上的 <strong>bge-reranker-base</strong> 开始；当质量指标达到要求时，转到 GPU 上的 <strong>v2-m3</strong> 或 <strong>mxbai-large</strong>。",

  "Batch your pairs — scoring 50 documents in one <code>predict()</code> call is far faster than 50 separate forwards. Cap passage length at 512 tokens (model default) to avoid silent truncation.": "批量处理你的配对 —— 一次 <code>predict()</code> 调用对 50 个文档打分，远比 50 次单独的前向传播快。将段落长度上限设为 512 token（模型默认值），以避免静默截断。",

  "Embedded in your app": "嵌入应用中",
  "Load the model inside your FastAPI / Flask RAG service. Simplest for low QPS; scale replicas horizontally.": "将模型加载到你的 FastAPI / Flask RAG 服务内部。低 QPS 时最简单；横向扩展副本即可。",
  "Dedicated rerank microservice": "独立重排序微服务",
  "Expose <code>POST /rerank</code> with <code>{ query, documents[] }</code>. Share one GPU across many app pods.": "暴露 <code>POST /rerank</code> 接口，接受 <code>{ query, documents[] }</code>。多个应用 Pod 共用一块 GPU。",
  "For ONNX export and C++ runtimes, see the model cards on Hugging Face. For browser-only experiments, try our <a href=\"/demo.html\">in-browser demo</a> with the xsmall ONNX builds.": "ONNX 导出和 C++ 运行时，请参阅 Hugging Face 上的模型卡。浏览器实验可以使用 xsmall ONNX 版本的<a href=\"/demo.html\">浏览器内 Demo</a>。",

  "<strong>GPU:</strong> a single T4 handles ~30–80 ms for 50 docs with bge-base; CPU is 5–10× slower.": "<strong>GPU：</strong>单张 T4 对 50 篇文档（bge-base）约需 30–80 ms；CPU 慢 5–10 倍。",
  "<strong>Memory:</strong> budget ~1–2 GB VRAM for base models; large variants need more.": "<strong>内存：</strong>base 模型预算约 1–2 GB 显存；large 变体需要更多。",
  "<strong>Warm-up:</strong> run a dummy predict on startup to avoid cold-start latency spikes.": "<strong>预热：</strong>启动时运行一次虚拟 predict，以避免冷启动延迟峰值。",
  "<strong>Monitoring:</strong> track p95 latency and NDCG on a labelled slice — <a href=\"/guides/evaluate-reranker.html\">evaluate rerankers</a>.": "<strong>监控：</strong>追踪 p95 延迟和标注切片上的 NDCG —— 参见<a href=\"/guides/evaluate-reranker.html\">评测 reranker</a>。",
  "<strong>Fallback:</strong> if the rerank service is down, pass through vector top-k rather than failing the whole RAG request.": "<strong>降级：</strong>如果重排序服务宕机，直接透传向量 top-k，而不是让整个 RAG 请求失败。",

  "Prototype before you deploy": "先验证，再部署",
  "Paste your own query and passages in the browser demo — no server required.": "在浏览器 Demo 中粘贴你自己的查询和段落 —— 无需服务器。",
  "Open the demo →": "打开 Demo →",

  "Keep reading": "继续阅读",
  "Choose by scenario": "按场景选型",
  "RAG vs support vs code — which stack fits.": "RAG、客服、代码 —— 哪种配置更合适。",
  "Rerank for RAG": "为 RAG 加重排序",
  "Pipeline integration patterns.": "流水线集成模式。",
}};

window.I18N_PAGE = { zh: {
  "Production · ~10 min read · <time datetime=\"2026-10-12\">Updated 12 Oct 2026</time>":
    "生产实践 · 约 10 分钟阅读 · <time datetime=\"2026-10-12\">更新于 2026 年 10 月 12 日</time>",
  "When you need multilingual quality with minimal ops, a hosted API — <a href=\"/models/cohere-rerank.html\">Cohere</a>, <a href=\"/models/voyage-rerank.html\">Voyage</a>, or in mainland China <a href=\"/models/#alibaba-model-studio\">Alibaba Cloud Model Studio</a> and <a href=\"/models/#siliconflow\">SiliconFlow</a> — may still be cheaper all-in. The <a href=\"/rerank-cost-calculator.html\">cost calculator</a> prices your volume; see also <a href=\"/guides/choose-reranker-scenario.html\">choose by scenario</a>.":
    "如果需要多语言效果、又不想多运维，托管 API —— <a href=\"/models/cohere-rerank.html\">Cohere</a>、<a href=\"/models/voyage-rerank.html\">Voyage</a>，国内则有<a href=\"/models/#alibaba-model-studio\">阿里云百炼</a>和<a href=\"/models/#siliconflow\">硅基流动</a> —— 算上所有成本可能仍然更便宜。<a href=\"/rerank-cost-calculator.html\">成本计算器</a>可以按你的量级算价格；另见<a href=\"/guides/choose-reranker-scenario.html\">按场景选择</a>。",
  "<strong>Default</strong> — multilingual, small enough for CPU":
    "<strong>默认之选</strong> —— 多语言，小到能在 CPU 上跑",
  "Smaller multilingual option (70+ languages, 8K context)":
    "更小的多语言选择（70 多种语言，8K 上下文）",
  "<strong>Default GPU pick</strong> — in Qwen’s tests, the best of its three sizes on English and instruction-following":
    "<strong>有 GPU 时的默认之选</strong> —— 在 Qwen 的测试中，三个尺寸里英文和指令跟随表现最好",
  "Start with <strong>bge-reranker-v2-m3</strong>, which runs on CPU. On GPU, A/B <strong>Qwen3-Reranker-4B</strong> against it or <strong>mxbai-rerank-base-v2</strong> on your labelled set — do not assume leaderboard order transfers. Until October 2026 this table recommended bge-reranker-base, BAAI’s 2023 model for Chinese and English only.":
    "先用 <strong>bge-reranker-v2-m3</strong>，它在 CPU 上就能跑。有 GPU 时，在你的标注数据上把 <strong>Qwen3-Reranker-4B</strong> 和它或 <strong>mxbai-rerank-base-v2</strong> 做 A/B 对比 —— 不要以为排行榜上的顺序能照搬到你的数据。2026 年 10 月之前，这张表推荐的是 bge-reranker-base，那是 BAAI 2023 年只支持中英文的模型。",
  "Batch your pairs — scoring 50 documents in one <code>predict()</code> call is far faster than 50 separate forwards. <code>max_length=512</code> truncates anything longer, so chunk passages to fit rather than letting the end of a passage silently drop off.":
    "把文档对批量处理 —— 一次 <code>predict()</code> 给 50 篇文档打分，比单独前向 50 次快得多。<code>max_length=512</code> 会截断更长的内容，所以要把段落切到合适长度，别让段落末尾被悄悄丢掉。",
  "You don’t have to write the service yourself: Hugging Face’s <a href=\"https://github.com/huggingface/text-embeddings-inference\" rel=\"noopener noreferrer\">Text Embeddings Inference</a> and <a href=\"https://github.com/michaelfeil/infinity\" rel=\"noopener noreferrer\">Infinity</a> both serve cross-encoders behind a rerank endpoint — the <a href=\"https://huggingface.co/Alibaba-NLP/gte-multilingual-reranker-base\" rel=\"noopener noreferrer\">gte-multilingual-reranker-base card</a> shows the Docker commands for each. Check that your model is on the server’s supported list first.":
    "服务不一定要自己写：Hugging Face 的 <a href=\"https://github.com/huggingface/text-embeddings-inference\" rel=\"noopener noreferrer\">Text Embeddings Inference</a> 和 <a href=\"https://github.com/michaelfeil/infinity\" rel=\"noopener noreferrer\">Infinity</a> 都能把 cross-encoder 部署成 rerank 接口 —— <a href=\"https://huggingface.co/Alibaba-NLP/gte-multilingual-reranker-base\" rel=\"noopener noreferrer\">gte-multilingual-reranker-base 的模型卡</a>里有两者的 Docker 命令。先确认你的模型在服务端的支持列表里。",
  "<strong>Memory:</strong> in fp16 the weights alone take about 2 bytes per parameter — roughly 1.1 GB for bge-reranker-v2-m3’s 568M and 8 GB for a 4B model — plus activations that grow with batch size and passage length.":
    "<strong>显存：</strong>fp16 下光权重就要每个参数约 2 字节 —— bge-reranker-v2-m3 的 568M 参数约 1.1 GB，4B 模型约 8 GB —— 再加上随批大小和段落长度增长的激活值。",
  "_title": "如何自托管 reranker — sentence-transformers、GPU、部署 | reranker.uk",
  "_desc": "自托管 cross-encoder reranker 实战指南：模型选择（bge、mxbai、Jina）、sentence-transformers 快速上手、FastAPI 服务化与运维清单。",

  "<a href=\"/\">Home</a><span>/</span><a href=\"/guides/\">Guides</a><span>/</span>Self-host a reranker": "<a href=\"/\">首页</a><span>/</span><a href=\"/guides/\">指南</a><span>/</span>自托管 reranker",
  "How to self-host a reranker": "如何自托管 reranker",
  "Production · ~10 min read · <time datetime=\"2026-06-23\">Updated 23 Jun 2026</time>": "生产实践 · 约 10 分钟阅读 · <time datetime=\"2026-06-23\">更新于 2026 年 6 月 23 日</time>",
  "Hosted rerank APIs are convenient, but <strong>self-hosting</strong> gives you zero per-call cost, full data control, and predictable latency on your own GPU or CPU fleet. Here’s a practical path from a first <code>CrossEncoder</code> call to a production microservice.": "托管 rerank API 很方便，但<strong>自托管</strong>能带来零按次成本、数据完全可控，以及在自己 GPU/CPU 集群上的可预测延迟。本文从第一次 <code>CrossEncoder</code> 调用，到生产级微服务的实操路径。",

  "On this page": "本页目录",
  "When self-hosting wins": "何时值得自托管",
  "Pick a model": "选择模型",
  "Quick start with sentence-transformers": "sentence-transformers 快速上手",
  "Serving options": "服务化方案",
  "Ops checklist": "运维清单",

  "<a href=\"#when\">When self-hosting wins</a>": "<a href=\"#when\">何时值得自托管</a>",
  "<a href=\"#models\">Pick a model</a>": "<a href=\"#models\">选择模型</a>",
  "<a href=\"#quickstart\">Quick start with sentence-transformers</a>": "<a href=\"#quickstart\">sentence-transformers 快速上手</a>",
  "<a href=\"#serve\">Serving options</a>": "<a href=\"#serve\">服务化方案</a>",
  "<a href=\"#ops\">Ops checklist</a>": "<a href=\"#ops\">运维清单</a>",

  "When self-hosting wins": "何时值得自托管",
  "<strong>High volume.</strong> Reranking 50–100 chunks per query adds up fast on per-1k-doc APIs.": "<strong>调用量大。</strong>每个查询对 50–100 个 chunk 重排序，按千条文档计费的 API 成本会迅速累积。",
  "<strong>Data residency.</strong> Queries and documents never leave your VPC.": "<strong>数据驻留。</strong>查询与文档不出你的 VPC。",
  "<strong>Custom fine-tuning.</strong> You can swap in a domain-tuned checkpoint without waiting on a vendor.": "<strong>自定义微调。</strong>可随时换上领域微调 checkpoint，无需等厂商。",
  "When you need multilingual quality with minimal ops, a hosted API like <a href=\"/models/cohere-rerank.html\">Cohere Rerank</a> or <a href=\"/models/jina-reranker.html\">Jina</a> may still be cheaper all-in — see <a href=\"/guides/choose-reranker-scenario.html\">choose by scenario</a>.": "若你需要多语言质量且运维要极简，<a href=\"/models/cohere-rerank.html\">Cohere Rerank</a> 或 <a href=\"/models/jina-reranker.html\">Jina</a> 等托管 API 的综合成本可能更低 —— 见<a href=\"/guides/choose-reranker-scenario.html\">按场景选型</a>。",

  "Pick a model": "选择模型",
  "Model": "模型",
  "Size": "规模",
  "Best for": "最适合",
  "CPU-friendly English default": "CPU 友好的英文默认",
  "Multilingual when GPU is limited": "GPU 有限时的多语言选择",
  "<strong>2026 open SOTA pick</strong> (needs GPU)": "<strong>2026 开源 SOTA 首选</strong>（需 GPU）",
  "Strong classic BEIR, Apache 2.0": "经典 BEIR 强，Apache 2.0",
  "Listwise long-context; or v2 pair-wise": "Listwise 长上下文；或 v2 成对",
  "Start with <strong>bge-reranker-base</strong> on CPU for prototyping. On GPU, A/B <strong>Qwen3-Reranker-4B</strong> against <strong>bge-v2-m3</strong> or <strong>mxbai-base-v2</strong> on your labelled set — do not assume leaderboard order transfers.": "原型阶段用 CPU 跑 <strong>bge-reranker-base</strong>。有 GPU 时在标注集上 A/B <strong>Qwen3-Reranker-4B</strong> 与 <strong>bge-v2-m3</strong> 或 <strong>mxbai-base-v2</strong> —— 不要假设榜单顺序会迁移。",

  "Quick start with sentence-transformers": "sentence-transformers 快速上手",
  "Batch your pairs — scoring 50 documents in one <code>predict()</code> call is far faster than 50 separate forwards. Cap passage length at 512 tokens (model default) to avoid silent truncation.": "批量打分 —— 一次 <code>predict()</code> 处理 50 段远比 50 次单独前向快。单段长度建议不超过 512 token（模型默认），避免静默截断。",

  "Serving options": "服务化方案",
  "Embedded in your app": "嵌入应用进程",
  "Load the model inside your FastAPI / Flask RAG service. Simplest for low QPS; scale replicas horizontally.": "在 FastAPI / Flask RAG 服务内加载模型。低 QPS 最简单；水平扩展副本即可。",
  "Dedicated rerank microservice": "独立 rerank 微服务",
  "Expose <code>POST /rerank</code> with <code>{ query, documents[] }</code>. Share one GPU across many app pods.": "暴露 <code>POST /rerank</code>，请求体 <code>{ query, documents[] }</code>。多个应用 Pod 共享一块 GPU。",
  "For ONNX export and C++ runtimes, see the model cards on Hugging Face. For browser-only experiments, try our <a href=\"/demo.html\">in-browser demo</a> with the xsmall ONNX builds.": "ONNX 导出与 C++ 运行时见 Hugging Face 模型卡。仅浏览器实验可用我们的 <a href=\"/demo.html\">在线 Demo</a>（xsmall ONNX 构建）。",

  "Ops checklist": "运维清单",
  "<strong>GPU:</strong> a single T4 handles ~30–80 ms for 50 docs with bge-base; CPU is 5–10× slower.": "<strong>GPU：</strong>单张 T4 跑 bge-base 对 50 段约 30–80 ms；CPU 慢 5–10 倍。",
  "<strong>Memory:</strong> budget ~1–2 GB VRAM for base models; large variants need more.": "<strong>内存：</strong>base 模型预留约 1–2 GB VRAM；大模型需更多。",
  "<strong>Warm-up:</strong> run a dummy predict on startup to avoid cold-start latency spikes.": "<strong>预热：</strong>启动时跑一次 dummy predict，避免冷启动延迟尖峰。",
  "<strong>Monitoring:</strong> track p95 latency and NDCG on a labelled slice — <a href=\"/guides/evaluate-reranker.html\">evaluate rerankers</a>.": "<strong>监控：</strong>在标注子集上跟踪 p95 延迟与 NDCG —— <a href=\"/guides/evaluate-reranker.html\">评测 reranker</a>。",
  "<strong>Fallback:</strong> if the rerank service is down, pass through vector top-k rather than failing the whole RAG request.": "<strong>降级：</strong>rerank 服务不可用时，透传向量 top-k，不要让整条 RAG 请求失败。",

  "Prototype before you deploy": "部署前先原型验证",
  "Paste your own query and passages in the browser demo — no server required.": "在浏览器 Demo 粘贴自己的查询与段落 —— 无需服务器。",
  "Open the demo →": "打开 Demo →",

  "Keep reading": "继续阅读",
  "Choose by scenario": "按场景选型",
  "RAG vs support vs code — which stack fits.": "RAG / 客服 / 代码 —— 哪种栈更合适。",
  "Rerank for RAG": "为 RAG 加重排序",
  "Pipeline integration patterns.": "流水线集成模式。",

  // Oct 2026: jina-reranker-v3.5, licences
  "Licence":
    "许可证",
  "CPU-friendly Chinese / English default":
    "CPU 友好的中英文默认选择",
  "Multilingual incl. Chinese; best size/quality balance of mxbai v2":
    "多语言（含中文）；mxbai v2 里体量与质量最均衡的一款",
  "Listwise, long context — <strong>non-commercial</strong> unless licensed":
    "Listwise、长上下文 —— 未获许可时<strong>仅限非商用</strong>",

  // Oct 2026: jina-reranker-v3.5, licences
  "<strong>GPU:</strong> worth it once you rerank more than a few dozen passages per query. Measure p50 / p95 on your own hardware before sizing — model cards rarely publish latency, and we don’t quote figures we haven’t measured.":
    "<strong>GPU：</strong>每次查询要重排几十段以上时就值得上 GPU。确定配置前，请在你自己的硬件上实测 p50 / p95 —— 模型卡很少公布延迟，我们也不引用自己没测过的数字。",
}};
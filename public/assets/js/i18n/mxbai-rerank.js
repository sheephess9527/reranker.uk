window.I18N_PAGE = { zh: {
  "_title": "mxbai-rerank：mixedbread-ai 开源 DeBERTa 重排序模型评测 | reranker.uk",
  "_desc": "mxbai-rerank 评测：mixedbread-ai 基于 DeBERTa-v3 的开源权重 cross-encoder 重排序器（xsmall、base、large）。基准、Python 用法、托管 API，以及可在浏览器中运行的 xsmall 模型。",

  "<a href=\"/\">Home</a><span>/</span><a href=\"/models/\">Models</a><span>/</span>mxbai-rerank": "<a href=\"/\">首页</a><span>/</span><a href=\"/models/\">模型对比</a><span>/</span>mxbai-rerank",
  "mxbai-rerank": "mxbai-rerank",
  "Open weights + Hosted API · mixedbread-ai": "开源权重 + 托管 API · mixedbread-ai",
  "mixedbread-ai's reranker family is built on DeBERTa-v3 — an architecture with disentangled attention that delivers strong cross-encoder precision. All three variants ship under Apache 2.0, so you can self-host freely. The <code>xsmall</code> model is compact enough to run in the browser, which is why it's one of the options in <a href=\"/demo.html\">this site's live demo</a>.": "mixedbread-ai 的重排序器系列基于 DeBERTa-v3 —— 一种采用解耦注意力机制的架构，能带来出色的 cross-encoder 精度。三个变体均采用 Apache 2.0 协议，可自由自建部署。<code>xsmall</code> 模型足够轻量，可以在浏览器中运行，这也是它成为<a href=\"/demo.html\">本站在线 Demo</a> 选项之一的原因。",

  "Model variants": "模型变体",
  "Benchmarks": "基准测试",
  "Quick start": "快速上手",
  "Hosted API": "托管 API",
  "Browser use": "浏览器使用",
  "Pros and cons": "优缺点",

  "Model": "模型",
  "Size": "体积",
  "Context": "上下文长度",
  "Best for": "最适合",
  "Browser / edge; lowest latency": "浏览器 / 边缘端；延迟最低",
  "Good balance of speed and quality": "速度与质量的良好平衡",
  "Highest precision; GPU recommended": "精度最高；建议使用 GPU",
  "All three are DeBERTa-v3 cross-encoders trained on MS MARCO passage ranking. <strong>Start with <code>mxbai-rerank-base-v1</code></strong> for production use; switch to <code>large</code> if you have GPU headroom and need the extra precision. Use <code>xsmall</code> for browser or edge deployments where model size is the constraint.": "三个变体均为在 MS MARCO 段落排序任务上训练的 DeBERTa-v3 cross-encoder。生产环境<strong>建议从 <code>mxbai-rerank-base-v1</code> 开始</strong>；若有 GPU 余量且需要更高精度，则切换到 <code>large</code>。在浏览器或边缘端部署且模型体积受限时，使用 <code>xsmall</code>。",

  "Scores are approximate averages across the 18 BEIR datasets. Check the mixedbread-ai HuggingFace model cards for per-dataset results.": "分数为 18 个 BEIR 数据集上的近似平均值。请查阅 mixedbread-ai 在 HuggingFace 上的模型卡片以获取各数据集结果。",

  "Self-hosted (sentence-transformers)": "自建部署（sentence-transformers）",
  "In a RAG pipeline": "在 RAG 流水线中",
  "mixedbread-ai offers a hosted rerank endpoint backed by the same model weights. Useful if you want to avoid running inference on your own infrastructure.": "mixedbread-ai 提供基于相同模型权重的托管重排序端点。如果你不想在自有基础设施上运行推理，这是个不错的选择。",
  "The <code>xsmall</code> variant is compact enough to run in the browser via transformers.js — this is exactly what our demo uses:": "<code>xsmall</code> 变体足够轻量，可以通过 transformers.js 在浏览器中运行 —— 这正是我们 Demo 所使用的方式：",
  "With <code>dtype: \"q8\"</code> the quantized weights are roughly 35 MB — fast to download and cached in IndexedDB after the first run.": "使用 <code>dtype: \"q8\"</code> 后，量化权重约为 35 MB —— 下载迅速，首次运行后即缓存到 IndexedDB 中。",

  "Apache 2.0 — fully open, commercial use allowed": "Apache 2.0 —— 完全开放，允许商业使用",
  "xsmall variant runs in-browser via transformers.js": "xsmall 变体可通过 transformers.js 在浏览器中运行",
  "DeBERTa-v3 architecture: strong cross-encoder precision": "DeBERTa-v3 架构：cross-encoder 精度出色",
  "Large variant competitive with top commercial APIs": "large 变体可与顶级商业 API 一较高下",
  "Easy drop-in with sentence-transformers": "可轻松集成到 sentence-transformers",
  "Hosted API option for managed inference": "提供托管 API 选项，无需自行管理推理",
  "Primarily English — limited multilingual support": "主要面向英文 —— 多语言支持有限",
  "512-token context is short for long documents": "512 token 上下文对长文档而言较短",
  "Smaller community than bge or Cohere": "社区规模小于 bge 或 Cohere",
  "Large variant needs GPU for practical speed": "large 变体需要 GPU 才能达到实用速度",

  "mxbai-rerank-xsmall powers this demo": "mxbai-rerank-xsmall 驱动本站 Demo",
  "Select it in the model picker and see it score your passages live — no download required after first use.": "在模型选择器中选中它，实时看到它对你的段落打分 —— 首次使用后无需重新下载。",
  "Open the demo →": "打开 Demo →",

  "bge-reranker": "bge-reranker",
  "Open-weight rerankers with strong multilingual support.": "开源权重重排序器，多语言支持出色。",
  "Jina Reranker": "Jina Reranker",
  "Open weights + hosted API, including a tiny browser model.": "开源权重 + 托管 API，包含可在浏览器运行的微型模型。",
  "Cohere Rerank": "Cohere Rerank",
  "Mature hosted API with top multilingual quality.": "成熟的托管 API，多语言质量领先。",
  "Voyage Rerank": "Voyage Rerank",
  "High-precision hosted API with domain-specific variants.": "高精度托管 API，提供特定领域变体。"
}};

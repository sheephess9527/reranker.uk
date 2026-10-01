window.I18N_PAGE = { zh: {
  "Open weights + Hosted API · Jina AI · <time datetime=\"2026-08-11\">Updated 11 Aug 2026</time>":
    "开源权重 + 托管 API · Jina AI · <time datetime=\"2026-08-11\">更新于 2026 年 8 月 11 日</time>",
  "Jina’s 2026 flagship is <strong>jina-reranker-v3</strong>: a <strong>0.6B</strong> <em>listwise</em> reranker built on Qwen3-0.6B that scores up to <strong>64 documents inside one 131K-token context</strong> and reaches <strong>61.94 nDCG@10 on BEIR</strong> — ahead of Qwen3-Reranker-4B at roughly a sixth of the size. Older <strong>v2</strong> pairwise models remain useful; <strong>v1-tiny</strong> is still what runs in <a href=\"/demo.html\">our browser demo</a>.":
    "Jina 的 2026 旗舰是 <strong>jina-reranker-v3</strong>：一个基于 Qwen3-0.6B 的 <strong>0.6B</strong> <em>listwise</em> 重排序器，可在<strong>同一个 131K token 上下文里一次性给最多 64 篇文档打分</strong>，BEIR nDCG@10 达到 <strong>61.94</strong> —— 以约六分之一的体量超过 Qwen3-Reranker-4B。较早的 <strong>v2</strong> 成对模型依然有用；<strong>v1-tiny</strong> 仍是 <a href=\"/demo.html\">我们浏览器 Demo</a> 里跑的那个。",
  "<strong>Flagship 2026</strong> — listwise, 64 docs in 131K ctx, 61.94 BEIR":
    "<strong>2026 旗舰</strong> —— listwise，131K 上下文内 64 篇文档，BEIR 61.94",
  "v3 reports <strong>61.94 nDCG@10 on BEIR</strong> — level with the strongest cross-encoders in <a href=\"/models/\">our table</a> while being small enough to serve on a single GPU, and ahead of Qwen3-Reranker-4B despite being 6× smaller. Architecturally it takes contextual embeddings from each document’s final token after causal attention across the whole slate, rather than scoring pairs late. Details in the <a href=\"https://arxiv.org/abs/2509.25085\" rel=\"noopener noreferrer\">v3 paper</a>; confirm model IDs and limits on <a href=\"https://jina.ai/reranker\" rel=\"noopener noreferrer\">jina.ai/reranker</a>.":
    "v3 公布的 BEIR nDCG@10 为 <strong>61.94</strong> —— 与<a href=\"/models/\">我们表中</a>最强的 cross-encoder 持平，却小到单卡即可部署，并且在体量只有 6 分之 1 的情况下超过 Qwen3-Reranker-4B。架构上，它先对整个候选列表做因果注意力，再从每篇文档的最后一个 token 取上下文向量，而不是在末端逐对打分。细节见 <a href=\"https://arxiv.org/abs/2509.25085\" rel=\"noopener noreferrer\">v3 论文</a>；模型 ID 与各项限制请以 <a href=\"https://jina.ai/reranker\" rel=\"noopener noreferrer\">jina.ai/reranker</a> 为准。",
  "61.94 BEIR nDCG@10 from only 0.6B parameters":
    "仅 0.6B 参数就拿到 61.94 BEIR nDCG@10",

  "<a href=\"/\">Home</a><span>/</span><a href=\"/models/\">Models</a><span>/</span>Jina Reranker": "<a href=\"/\">首页</a><span>/</span><a href=\"/models/\">模型对比</a><span>/</span>Jina Reranker",
  "Jina Reranker": "Jina Reranker",
  "Open weights + Hosted API · Jina AI": "开源权重 + 托管 API · Jina AI",
  "Jina AI's reranker family is unique in offering both open-weight models you can self-host <em>and</em> a hosted API — with the same model. Their <code>v1-tiny</code> variant is small enough to run in the browser via transformers.js, which is exactly what powers <a href=\"/demo.html\">this site's live demo</a>.": "Jina AI 的重排序系列与众不同：它同时提供可自建的开源权重模型<em>和</em>托管 API —— 而且是同一个模型。其 <code>v1-tiny</code> 变体小到可以通过 transformers.js 在浏览器里运行，这正是驱动<a href=\"/demo.html\">本站在线 Demo</a> 的模型。",

  "Model variants": "模型变体",
  "Pricing": "价格",
  "Quick start": "快速上手",
  "Browser / edge use": "浏览器 / 边缘端使用",
  "Pros and cons": "优缺点",

  "Model": "模型",
  "Size": "体积",
  "Languages": "语言",
  "Notes": "说明",
  "100+ langs": "100+ 种语言",
  "English": "英文",
  "Flagship; strong multilingual BEIR": "旗舰；多语言 BEIR 强",
  "Good English baseline": "不错的英文基线",
  "Tiny; runs in browser / on edge": "微型；可在浏览器 / 边缘端运行",

  "Tier": "档位",
  "Price": "价格",
  "Free tier": "免费额度",
  "1 M tokens/month free — no credit card": "每月 100 万 token 免费 —— 无需信用卡",
  "Pay-as-you-go": "按量付费",
  "~$0.018 / 1M tokens": "约 $0.018 / 百万 token",
  "Token-based pricing is friendlier for long documents than per-call pricing. Check the Jina AI website for current rates.": "相比按次计费，按 token 计费对长文档更友好。当前费率请查阅 Jina AI 官网。",

  "Hosted API (Python)": "托管 API（Python）",
  "Self-hosted (sentence-transformers)": "自建部署（sentence-transformers）",
  "The <code>v1-tiny</code> model (33 MB quantised) loads via transformers.js in under 10 seconds on a typical broadband connection and runs scoring at ~200 ms for a 10-candidate batch. This is what powers our demo:": "<code>v1-tiny</code> 模型（量化后 33 MB）在普通宽带下可通过 transformers.js 在 10 秒内加载，对 10 个候选的批次打分约需 200 ms。这正是驱动我们 Demo 的模型：",

  "Dual-mode: same model as API or self-hosted weights": "双模式：同一模型既可走 API，也可自建权重",
  "Tiny variant runs in the browser — unique in the space": "微型变体可在浏览器运行 —— 在同类中独一无二",
  "Generous free tier (1M tokens/month, no card needed)": "慷慨的免费额度（每月 100 万 token，无需信用卡）",
  "Strong multilingual quality on v2": "v2 的多语言质量很强",
  "Token-based pricing suits long documents": "按 token 计费适合长文档",
  "v1-tiny is English-only and lower quality": "v1-tiny 仅支持英文，质量较低",
  "Smaller company than Cohere — less ecosystem tooling": "公司规模小于 Cohere —— 生态工具较少",
  "Self-hosted requires <code>trust_remote_code=True</code>": "自建部署需要 <code>trust_remote_code=True</code>",
  "Token pricing can be opaque for short passages": "对短段落而言，按 token 计费可能不够直观",

  "jina-reranker-v1-tiny powers this demo": "jina-reranker-v1-tiny 驱动了这个 Demo",
  "See it score your own passages live in the browser — no API key, no data leaving the page.": "在浏览器里实时看它为你自己的段落打分 —— 无 API 密钥，数据不离开页面。",
  "Open the demo →": "打开 Demo →",

  "bge-reranker": "bge-reranker",
  "Free, open-weight alternative.": "免费的开源权重替代品。",
  "Cohere Rerank": "Cohere Rerank",
  "Mature hosted API.": "成熟的托管 API。",
  "Voyage Rerank": "Voyage Rerank",
  "High-precision hosted API.": "高精度托管 API。",
  "mxbai-rerank": "mxbai-rerank",
  "Apache 2.0 open weights, browser xsmall.": "Apache 2.0 开源权重，浏览器可跑 xsmall。",

  "Open weights + Hosted API · Jina AI · <time datetime=\"2026-06-25\">Updated 25 Jun 2026</time>": "开源权重 + 托管 API · Jina AI · <time datetime=\"2026-06-25\">更新于 2026 年 6 月 25 日</time>",
  "Open weights": "开源权重",
  "Hosted API": "托管 API",
  "v3 listwise": "v3 listwise",
  "Browser tiny": "浏览器 tiny",
  "Jina’s 2026 flagship is <strong>jina-reranker-v3</strong>: <em>listwise</em> ranking over many candidates with a very long context window (reports cite scoring dozens of docs together). Older <strong>v2</strong> pairwise models remain useful; <strong>v1-tiny</strong> is still what runs in <a href=\"/demo.html\">our browser demo</a>.": "Jina 2026 旗舰是 <strong>jina-reranker-v3</strong>：对多候选做 <em>listwise</em> 排序，上下文极长（报道称可一次看几十段）。旧版 <strong>v2</strong> 成对模型仍可用；<strong>v1-tiny</strong> 仍是 <a href=\"/demo.html\">本站 Demo</a> 所用模型。",
  "On this page": "本页目录",
  "What listwise v3 changes": "Listwise v3 改了什么",
  "<a href=\"#models\">Model variants</a>": "<a href=\"#models\">模型变体</a>",
  "<a href=\"#v3\">What listwise v3 changes</a>": "<a href=\"#v3\">Listwise v3 改了什么</a>",
  "<a href=\"#pricing\">Pricing</a>": "<a href=\"#pricing\">价格</a>",
  "<a href=\"#usage\">Quick start</a>": "<a href=\"#usage\">快速上手</a>",
  "<a href=\"#browser\">Browser / edge use</a>": "<a href=\"#browser\">浏览器 / 边缘端使用</a>",
  "<a href=\"#pros-cons\">Pros and cons</a>": "<a href=\"#pros-cons\">优缺点</a>",
  "<strong>Flagship 2026</strong> — listwise, long context (~64 docs)": "<strong>2026 旗舰</strong> —— listwise、长上下文（约 64 段）",
  "Prior multilingual pair-wise flagship": "上一代多语言成对旗舰",
  "English baseline": "英文基线",
  "Browser / edge; powers our demo": "浏览器 / 边缘；驱动本站 Demo",
  "Classic cross-encoders score each <code>(query, doc)</code> independently. <strong>Listwise</strong> models see a slate of candidates at once, which can improve relative ordering when many passages share vocabulary. The trade-off is higher memory and a different serving path than MiniLM-style pair scoring.": "经典 cross-encoder 对每个 <code>(query, doc)</code> 独立打分。<strong>Listwise</strong> 模型一次看到整批候选，在多段共享词汇时有助于相对排序。代价是更高显存，以及与 MiniLM 成对打分不同的服务路径。",
  "Published BEIR nDCG@10 for v3 is often cited around <strong>~61.9</strong> — in the same ballpark as mature hosted APIs, with the listwise / long-context story as the real differentiator. Confirm model IDs and context limits on <a href=\"https://jina.ai/reranker\" rel=\"noopener noreferrer\">jina.ai/reranker</a>.": "v3 的 BEIR nDCG@10 常被报为约 <strong>~61.9</strong> —— 与成熟托管 API 同档，真正差异在 listwise / 长上下文。模型 ID 与上下文上限请以 <a href=\"https://jina.ai/reranker\" rel=\"noopener noreferrer\">jina.ai/reranker</a> 为准。",
  "v3 listwise long-context for multi-doc ranking": "v3 listwise 长上下文，适合多文档排序",
  "Dual-mode: hosted API + open weights": "双模式：托管 API + 开源权重",
  "Tiny variant still runs in the browser (our demo)": "tiny 变体仍可在浏览器运行（本站 Demo）",
  "Qwen3-Reranker": "Qwen3-Reranker",
  "2026 open SOTA family (GPU).": "2026 开源 SOTA 家族（需 GPU）。",
  "Pros": "优点",
  "Cons": "缺点",
  "Other models": "其他模型",

  // Oct 2026 rewrite: v3.5, licences, verified pricing
  "Weights + hosted API · Jina AI, now part of Elastic · <time datetime=\"2026-10-01\">Updated 1 Oct 2026</time>":
    "权重 + 托管 API · Jina AI（现属 Elastic）· <time datetime=\"2026-10-01\">更新于 2026 年 10 月 1 日</time>",
  "Weights: non-commercial":
    "权重：仅限非商用",
  "v3.5 listwise":
    "v3.5 listwise",
  "Jina’s current flagship is <strong>jina-reranker-v3.5</strong>, announced August 2026: a <strong>0.6B</strong> <em>listwise</em> reranker built on Qwen3-0.6B and a drop-in upgrade to v3 — same API, 131K-token context, and 1.22–1.56× faster. In Jina’s own evaluation it scores <strong>{{fact:jina-reranker-v3.5.beir}} nDCG@10 on BEIR</strong>, just above Qwen3-Reranker-4B at about a seventh of the size, though the 4B still leads on multilingual, professional-domain and structured retrieval. The catch for self-hosting: the v2, v3 and v3.5 weights are <strong>CC BY-NC 4.0 — non-commercial</strong>. <strong>v1-tiny</strong> (Apache 2.0) is still what runs in <a href=\"/demo.html?m=jinaai/jina-reranker-v1-tiny-en\">our browser demo</a>.":
    "Jina 目前的旗舰是 2026 年 8 月发布的 <strong>jina-reranker-v3.5</strong>：一个基于 Qwen3-0.6B 的 <strong>0.6B</strong> <em>listwise</em> 重排序器，可直接替换 v3 —— API 相同、131K token 上下文，速度快 1.22–1.56 倍。在 Jina 自己的评测里，它的 <strong>BEIR nDCG@10 为 {{fact:jina-reranker-v3.5.beir}}</strong>，以约七分之一的体量略高于 Qwen3-Reranker-4B；不过在多语言、专业领域和结构化数据检索上，仍是 4B 领先。自建部署要注意：v2、v3 和 v3.5 的权重采用 <strong>CC BY-NC 4.0 —— 仅限非商用</strong>。<strong>v1-tiny</strong>（Apache 2.0）仍是<a href=\"/demo.html?m=jinaai/jina-reranker-v1-tiny-en\">本站浏览器 Demo</a> 所用的模型。",
  "<a href=\"#v3\">What listwise v3 and v3.5 change</a>":
    "<a href=\"#v3\">Listwise 的 v3 与 v3.5 改了什么</a>",
  "<a href=\"#benchmarks\">Whose benchmark?</a>":
    "<a href=\"#benchmarks\">谁测的分数？</a>",
  "<a href=\"#licence\">Licence: what you can self-host</a>":
    "<a href=\"#licence\">许可证：哪些能自建部署</a>",
  "Parameters":
    "参数量",
  "Licence":
    "许可证",
  "Multilingual":
    "多语言",
  "CC BY-NC 4.0":
    "CC BY-NC 4.0",
  "Apache 2.0":
    "Apache 2.0",
  "<strong>Flagship</strong> — listwise, hybrid attention, 131K ctx, {{fact:jina-reranker-v3.5.beir}} BEIR":
    "<strong>旗舰</strong> —— listwise、混合注意力、131K 上下文，BEIR {{fact:jina-reranker-v3.5.beir}}",
  "Previous flagship — listwise, 64 docs in 131K ctx. Jina now point new projects to v3.5":
    "上一代旗舰 —— listwise，131K 上下文内 64 篇文档。Jina 现在建议新项目改用 v3.5",
  "Multimodal: ranks visual documents such as page images":
    "多模态：可对页面截图等视觉文档排序",
  "Pairwise cross-encoder; the API takes 1,024 tokens per document and chunks longer ones":
    "成对打分的 cross-encoder；API 每篇文档接受 1,024 token，更长的会自动分块",
  "Legacy; tiny’s slightly larger sibling":
    "旧版；比 tiny 稍大的同系列模型",
  "Legacy; browser / edge; powers our demo":
    "旧版；浏览器 / 边缘端；驱动本站 Demo",
  "Parameter counts and licences from each model’s Hugging Face page (Oct 2026). <code>jina-reranker-v1-base-en</code>, listed here until then, is no longer public on Hugging Face.":
    "参数量与许可证取自各模型的 Hugging Face 页面（2026 年 10 月）。此前列在这里的 <code>jina-reranker-v1-base-en</code> 已不再在 Hugging Face 上公开。",
  "What listwise v3 and v3.5 change":
    "Listwise 的 v3 与 v3.5 改了什么",
  "v3 introduced what Jina call <em>last but not late</em> interaction: the query and every candidate run through causal self-attention as one sequence, and each document’s score is the cosine between projected embeddings taken at special token positions — so documents are judged in the context of each other, not just the query. v3.5 keeps that and replaces uniform global attention with a schedule of three sliding-window layers (1,024-token windows) followed by two global layers, with the final layer always global. It adds legal, medical, financial and structured-data training, and distils from a same-size full-attention teacher. Jina measure 1.22× lower latency on short passages and 1.56× on long ones (A100, top-100 lists). Details in the <a href=\"https://arxiv.org/abs/2607.18152\" rel=\"noopener noreferrer\">v3.5 paper</a> and the <a href=\"https://arxiv.org/abs/2509.25085\" rel=\"noopener noreferrer\">v3 paper</a>.":
    "v3 引入了 Jina 所说的 <em>last but not late</em> 交互：query 与所有候选文档作为同一个序列做因果自注意力，每篇文档的分数是特殊 token 位置上投影向量之间的余弦相似度 —— 所以文档是放在彼此的上下文里评判的，而不只是对着 query。v3.5 保留了这一点，并把统一的全局注意力换成「三层滑动窗口（窗口 1,024 token）+ 两层全局」的交替结构，最后一层始终是全局的。它还加入了法律、医疗、金融和结构化数据的训练，并从同等体量的全注意力教师模型蒸馏而来。Jina 测得短文本延迟降低 1.22 倍、长文本降低 1.56 倍（A100，每次 100 个候选）。详见 <a href=\"https://arxiv.org/abs/2607.18152\" rel=\"noopener noreferrer\">v3.5 论文</a>和 <a href=\"https://arxiv.org/abs/2509.25085\" rel=\"noopener noreferrer\">v3 论文</a>。",
  "Whose benchmark?":
    "谁测的分数？",
  "For v3.5, Jina re-ran every model under one protocol: 13 BEIR datasets, MIRACL across 18 languages, RTEB (legal, finance, code, medical) and Struct-IR, each reranking the top 100 candidates from jina-embeddings-v5-text-small.":
    "为了 v3.5，Jina 用同一套方法把所有模型重新测了一遍：13 个 BEIR 数据集、覆盖 18 种语言的 MIRACL、RTEB（法律、金融、代码、医疗）以及 Struct-IR，每项都是对 jina-embeddings-v5-text-small 召回的前 100 个候选重排。",
  "Params":
    "参数",
  "BEIR":
    "BEIR",
  "MIRACL":
    "MIRACL",
  "RTEB":
    "RTEB",
  "Struct-IR":
    "Struct-IR",
  "nDCG@10, from the <a href=\"https://huggingface.co/jinaai/jina-reranker-v3.5\" rel=\"noopener noreferrer\">jina-reranker-v3.5 model card</a>. Struct-IR uses a controlled candidate pool (all gold documents plus the 30 hardest distractors), so it isn’t comparable to other Struct-IR leaderboards.":
    "指标为 nDCG@10，取自 <a href=\"https://huggingface.co/jinaai/jina-reranker-v3.5\" rel=\"noopener noreferrer\">jina-reranker-v3.5 模型卡</a>。Struct-IR 用的是受控候选池（全部正确文档加上最难的 30 个干扰项），因此不能和其他 Struct-IR 排行榜直接比较。",
  "v3.5 leads on BEIR, by under a point. On the other three the 4B is ahead, which Jina’s own write-up says plainly. The v3 paper’s 2025 run, over a different first-stage retriever, had v3 at 61.94 and Qwen3-Reranker-4B at 61.16. That is where “v3 beats Qwen3-Reranker-4B”, repeated on this site until October 2026, came from; on the newer run it no longer holds. Qwen3-Reranker-4B moving by more than a point between two runs from the same vendor is a good reason to read BEIR averages as tiers rather than rankings.":
    "v3.5 在 BEIR 上领先，但不到一分；另外三项都是 4B 领先，Jina 自己的文章也直说了这一点。v3 论文在 2025 年用另一个第一阶段召回模型测过一次，当时 v3 是 61.94，Qwen3-Reranker-4B 是 61.16 —— 本站直到 2026 年 10 月都在重复的「v3 超过 Qwen3-Reranker-4B」就出自这里；在新的评测里，这个结论已经不成立。同一家厂商测的两次结果里，Qwen3-Reranker-4B 就差了一分多，这正说明 BEIR 均值应当当作档位来看，而不是精确排名。",
  "Licence: what you can self-host":
    "许可证：哪些能自建部署",
  "The <code>v2</code>, <code>v3</code>, <code>v3.5</code> and <code>m0</code> weights are released under <strong>CC BY-NC 4.0</strong>: free to download and evaluate, not to use commercially. For production there are three routes: Jina’s hosted API, billed per token; for v3.5, Elastic Inference Service (Elastic Stack 9.3 and later); or a commercial licence, which Jina now arrange through Elastic’s sales team. Jina also list v3 on the Azure and Google Cloud marketplaces. Only the legacy <code>v1</code> English models are Apache 2.0.":
    "<code>v2</code>、<code>v3</code>、<code>v3.5</code> 和 <code>m0</code> 的权重采用 <strong>CC BY-NC 4.0</strong> 发布：可以免费下载和评估，但不能商用。生产环境有三条路：Jina 的托管 API，按 token 计费；v3.5 还可以走 Elastic Inference Service（Elastic Stack 9.3 及以上）；或者购买商用许可，现在由 Elastic 的销售团队负责。Jina 还把 v3 上架到了 Azure 和 Google Cloud 的应用市场。只有旧版的 <code>v1</code> 英文模型是 Apache 2.0。",
  "If you need commercially permissive open weights at a similar level, <a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a>, <a href=\"/models/mxbai-rerank.html\">mxbai-rerank-v2</a> and <a href=\"/models/bge-reranker.html\">bge-reranker-v2</a> are all Apache 2.0.":
    "如果你需要水平相近、又允许商用的开源权重，<a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a>、<a href=\"/models/mxbai-rerank.html\">mxbai-rerank-v2</a> 和 <a href=\"/models/bge-reranker.html\">bge-reranker-v2</a> 都是 Apache 2.0。",
  "Jina bill the reranker by token, from the same balance as their other APIs. New API keys come with free tokens to try it; after that you buy token packages. Jina changed their pricing on 6 May 2025, and their site shows current package prices only once the page has loaded in a browser, so we don’t quote a figure here — check <a href=\"https://jina.ai/reranker\" rel=\"noopener noreferrer\">jina.ai/reranker</a> before you budget.":
    "Jina 的重排序 API 按 token 计费，和他们的其他 API 共用同一个余额。新的 API key 附带免费 token 供试用；之后需要购买 token 包。Jina 在 2025 年 5 月 6 日调整过定价，而且他们网站上的当前价格要在浏览器里加载完页面才显示，所以这里不写具体数字 —— 做预算前请到 <a href=\"https://jina.ai/reranker\" rel=\"noopener noreferrer\">jina.ai/reranker</a> 查看。",
  "API key":
    "API key",
  "Requests / min":
    "每分钟请求数",
  "Tokens / min":
    "每分钟 token 数",
  "Free":
    "免费",
  "Paid":
    "付费",
  "Premium":
    "高级",
  "Rate limits from the jina.ai/reranker FAQ, shared with the Embeddings API. The API accepts up to 131,072 tokens per request (query plus all documents) for v3 and v3.5, truncating beyond that. On latency, the same FAQ puts 100 documents of 256 tokens with a 64-token query at about 150 ms, rising to 3.5 s with 4,096-token documents and 7 s if the query is also 512 tokens.":
    "速率限制取自 jina.ai/reranker 的 FAQ，与 Embeddings API 共用。v3 和 v3.5 的 API 每次请求最多接受 131,072 token（query 加全部文档），超出部分会被截断。延迟方面，同一份 FAQ 给出的数字是：100 篇 256 token 的文档加 64 token 的 query 约 150 毫秒；文档增至 4,096 token 时约 3.5 秒；query 也增至 512 token 时约 7 秒。",
  "Self-hosted (transformers)":
    "自建部署（transformers）",
  "Non-commercial use only, unless you have a licence — see <a href=\"#licence\">above</a>.":
    "除非已获得商用许可，否则仅限非商用 —— 见<a href=\"#licence\">上文</a>。",
  "The <code>v1-tiny</code> model (33M parameters) loads via transformers.js in under 10 seconds on a typical broadband connection and runs scoring at ~200 ms for a 10-candidate batch. This is what powers our demo:":
    "<code>v1-tiny</code> 模型（3300 万参数）在普通宽带下通过 transformers.js 加载不到 10 秒，给 10 个候选打分约 200 毫秒。本站 Demo 用的就是它：",
  "{{fact:jina-reranker-v3.5.beir}} BEIR nDCG@10 from 0.6B parameters, in Jina’s own test":
    "0.6B 参数在 Jina 自己的测试里拿到 {{fact:jina-reranker-v3.5.beir}} BEIR nDCG@10",
  "Listwise: documents are scored against each other in one pass":
    "Listwise：一次前向计算里，文档彼此对照打分",
  "The same models as a hosted API and as downloadable weights":
    "同一批模型既有托管 API，也有可下载的权重",
  "v3.5 on Elastic Inference Service (Stack 9.3+)":
    "v3.5 可在 Elastic Inference Service 上使用（Stack 9.3+）",
  "v1-tiny is Apache 2.0 and runs in the browser (our demo)":
    "v1-tiny 采用 Apache 2.0，可在浏览器里运行（本站 Demo）",
  "v2, v3 and v3.5 weights are non-commercial — self-hosting in production needs a licence":
    "v2、v3 和 v3.5 的权重仅限非商用 —— 生产环境自建部署需要购买许可",
  "Qwen3-Reranker-4B still leads on multilingual, legal / medical and structured retrieval":
    "在多语言、法律 / 医疗和结构化数据检索上，Qwen3-Reranker-4B 仍然领先",
  "Listwise calls cap the total length of all candidates (131K tokens)":
    "Listwise 调用对全部候选的总长度有上限（131K token）",
  "API prices aren’t published as plain text — check before you budget":
    "API 价格没有以文字形式公开 —— 做预算前请先确认",
  "_title":
    "Jina Reranker v3.5：listwise、许可证与价格 | reranker.uk",
  "_desc":
    "Jina Reranker 评测（2026 年 10 月）：jina-reranker-v3.5 是 0.6B 的 listwise 模型，在 Jina 自己的测试里 BEIR nDCG@10 为 63.20。注意 v2、v3、v3.5 权重为 CC BY-NC 4.0 非商用许可。另含评测对比、API 用法与浏览器 tiny 模型。",

  // Oct 2026: jina-reranker-v3.5, licences
  "The <code>v1-tiny</code> model (33M parameters) runs in the browser via transformers.js. On a 4-vCPU GitHub Actions runner, the demo’s first run — download plus scoring 10 passages — took {{fact:jina-reranker-v1-tiny-en.browser_cold_s}} s, and later runs scored 10 passages in {{fact:jina-reranker-v1-tiny-en.browser_ms_10}} ms and 30 in {{fact:jina-reranker-v1-tiny-en.browser_ms_30}} ms. That is with the demo page cross-origin isolated, which lets ONNX Runtime score on several threads; a browser that doesn’t support the isolation header runs single-threaded, about half as fast. A phone or older laptop will be slower too; the demo shows the time for each run on your own device. This is what powers it:":
    "<code>v1-tiny</code> 模型（3300 万参数）通过 transformers.js 在浏览器中运行。在一台 4 核的 GitHub Actions 机器上，Demo 的首次运行（下载加打分 10 段）用了 {{fact:jina-reranker-v1-tiny-en.browser_cold_s}} 秒，之后打分 10 段用 {{fact:jina-reranker-v1-tiny-en.browser_ms_10}} ms，30 段用 {{fact:jina-reranker-v1-tiny-en.browser_ms_30}} ms。这是在 Demo 页面开启跨源隔离、让 ONNX Runtime 多线程打分时的数字；不支持该隔离响应头的浏览器会以单线程运行，速度约慢一半。手机或较旧的笔记本也会更慢；Demo 会在你自己的设备上显示每次运行的耗时。本站 Demo 用的就是它：",
}};

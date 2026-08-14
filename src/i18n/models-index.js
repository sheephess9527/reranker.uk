window.I18N_PAGE = { zh: {
  "Sources: <a href=\"https://huggingface.co/Qwen\" rel=\"noopener noreferrer\">Qwen3-Reranker</a> · <a href=\"https://arxiv.org/abs/2509.25085\" rel=\"noopener noreferrer\">jina-reranker-v3 paper</a> · <a href=\"https://docs.voyageai.com/docs/reranker\" rel=\"noopener noreferrer\">Voyage rerankers</a> · <a href=\"https://huggingface.co/nvidia/llama-nemotron-rerank-1b-v2\" rel=\"noopener noreferrer\">nemotron-rerank</a> · <a href=\"https://huggingface.co/spaces/mteb/leaderboard\" rel=\"noopener noreferrer\">MTEB</a> · <a href=\"https://github.com/beir-cellar/beir\" rel=\"noopener noreferrer\">BEIR</a> · <a href=\"https://huggingface.co/BAAI/bge-reranker-v2-m3\" rel=\"noopener noreferrer\">BAAI</a> · <a href=\"https://huggingface.co/Alibaba-NLP/gte-reranker-modernbert-base\" rel=\"noopener noreferrer\">GTE ModernBERT</a> · <a href=\"/models/qwen-reranker.html\">Qwen guide</a> · <a href=\"/guides/instruction-reranker.html\">instruction</a> · <a href=\"/guides/late-interaction-rerank.html\">ColBERT</a>":
    "资料来源： <a href=\"https://huggingface.co/Qwen\" rel=\"noopener noreferrer\">Qwen3-Reranker</a> · <a href=\"https://arxiv.org/abs/2509.25085\" rel=\"noopener noreferrer\">jina-reranker-v3 论文</a> · <a href=\"https://docs.voyageai.com/docs/reranker\" rel=\"noopener noreferrer\">Voyage 重排序器</a> · <a href=\"https://huggingface.co/nvidia/llama-nemotron-rerank-1b-v2\" rel=\"noopener noreferrer\">nemotron-rerank</a> · <a href=\"https://huggingface.co/spaces/mteb/leaderboard\" rel=\"noopener noreferrer\">MTEB</a> · <a href=\"https://github.com/beir-cellar/beir\" rel=\"noopener noreferrer\">BEIR</a> · <a href=\"https://huggingface.co/BAAI/bge-reranker-v2-m3\" rel=\"noopener noreferrer\">BAAI</a> · <a href=\"https://huggingface.co/Alibaba-NLP/gte-reranker-modernbert-base\" rel=\"noopener noreferrer\">GTE ModernBERT</a> · <a href=\"/models/qwen-reranker.html\">Qwen 指南</a> · <a href=\"/guides/instruction-reranker.html\">指令跟随</a> · <a href=\"/guides/late-interaction-rerank.html\">ColBERT</a>",
  "Production stacks mix <strong>cross-encoders</strong>, <strong>listwise</strong> models, <strong>late-interaction</strong>, and instruction APIs. The headline of 2026 is that <strong>size stopped predicting quality</strong>: a 0.6B listwise model (Jina v3) outscores Qwen3-Reranker-4B on BEIR, a 149M cross-encoder ties a 1.2B one on Hit@1, and Qwen3's own 4B edges its 8B. Architecture, latency, languages and cost below — with honest footnotes wherever score protocols differ.":
    "生产环境往往混用 <strong>cross-encoder</strong>、<strong>listwise</strong> 模型、<strong>late-interaction</strong> 以及指令式 API。2026 年最值得注意的一点是：<strong>参数量不再预测质量</strong> —— 0.6B 的 listwise 模型（Jina v3）在 BEIR 上超过 Qwen3-Reranker-4B，149M 的 cross-encoder 在 Hit@1 上与 1.2B 打平，而 Qwen3 自己的 4B 也略胜 8B。下表对比架构、延迟、语言与成本，凡评测协议不一致处均如实标注。",
  "<span class=\"pill good\">Apache 2.0</span><span class=\"pill info\">Best Qwen3 size</span>":
    "<span class=\"pill good\">Apache 2.0</span><span class=\"pill info\">Qwen3 最佳档位</span>",
  "Strongest multilingual open self-host (GPU)":
    "多语言开源自托管最强（需 GPU）",
  "Largest Qwen3 — but 4B edges it on BEIR":
    "Qwen3 最大档 —— 但 BEIR 上 4B 更好",
  "<span class=\"pill good\">Open + Hosted</span><span class=\"pill info\">Beats Qwen3-4B</span>":
    "<span class=\"pill good\">开源 + 托管</span><span class=\"pill info\">优于 Qwen3-4B</span>",
  "0.6B listwise; 64 docs in one 131K ctx":
    "0.6B listwise；64 篇文档共享 131K 上下文",
  "Mature multilingual API; 32k ctx":
    "成熟的多语言 API；32k 上下文",
  "Throughput / latency-tuned sibling":
    "面向吞吐与延迟调优的同系版本",
  "Instruction-following; 32k ctx":
    "支持指令跟随；32k 上下文",
  "Cheaper tier; same 32k ctx":
    "更便宜的档位；同样 32k 上下文",
  "~149M, yet ties nemotron-1b on Hit@1":
    "仅约 149M，Hit@1 却与 nemotron-1b 打平",
  "1.2B; top accuracy when latency is free":
    "1.2B；在不计延迟时精度居首",
  "Multilingual (MIRACL / MLQA evals)":
    "多语言（MIRACL / MLQA 评测）",
  "<strong>Last verified:</strong> August 2026 (Cohere Rerank 4, Voyage rerank-2.5, Jina v3 BEIR, nemotron-1b) · <strong>Next review:</strong> Nov 2026. Columns marked <strong>*</strong> use MTEB-R, vendor, or task-specific protocols — <em>not</em> the same classic BEIR 18-dataset avg as the bge/mxbai/Jina rows. Where a vendor publishes no comparable number we say <em>not published</em> rather than guess. <strong>†</strong> Note the differing units: Cohere bills per <em>search</em> (one query + up to 100 docs), Voyage per <em>token</em>. Demo-capable models only: mxbai xsmall, Jina tiny, ms-marco MiniLM.":
    "<strong>最近核对：</strong>2026 年 8 月（Cohere Rerank 4、Voyage rerank-2.5、Jina v3 的 BEIR、nemotron-1b）· <strong>下次复核：</strong>2026 年 11 月。标 <strong>*</strong> 的列使用 MTEB-R、厂商或任务特定协议，<em>不同于</em> bge / mxbai / Jina 行所用的经典 BEIR 18 数据集均值。厂商未公布可比数字时，我们写「未公布」而不去猜。<strong>†</strong> 注意计价单位不同：Cohere 按<em>每次检索</em>（一个 query + 最多 100 篇文档）计费，Voyage 按 <em>token</em> 计费。可在 Demo 中运行的仅有：mxbai xsmall、Jina tiny、ms-marco MiniLM。",
  "0.6B / 4B / 8B, 32K context. Start at 4B — it reportedly edges the 8B on BEIR, so the largest size is not the automatic answer.":
    "0.6B / 4B / 8B，32K 上下文。从 4B 开始 —— 据报告它在 BEIR 上略胜 8B，所以「越大越好」在这里并不成立。",
  "Pro and Fast variants, 32k context, 100+ languages. Billed per search — one query plus up to 100 documents — not per document.":
    "Pro 与 Fast 两个版本，32k 上下文，100+ 语言。按「次检索」计费 —— 一个 query 加最多 100 篇文档 —— 而不是按文档数。",
  "0.6B listwise model scoring 61.94 on BEIR — ahead of Qwen3-Reranker-4B at a sixth of the size. v1-tiny still powers our demo.":
    "0.6B 的 listwise 模型，BEIR 得分 61.94 —— 以约六分之一的体量超过 Qwen3-Reranker-4B。v1-tiny 仍在驱动我们的 Demo。",
  "rerank-2.5 and -lite, both 32k context with instruction following, so you can steer relevance in natural language. Priced per token.":
    "rerank-2.5 与 -lite，均为 32k 上下文并支持指令跟随，可以用自然语言引导相关性判断。按 token 计费。",
  "Best multilingual open weights — start at 4B":
    "多语言开源权重最优 —— 从 4B 起步",
  "0.6B / 4B / 8B, all Apache 2.0, all 32K context":
    "0.6B / 4B / 8B，全部 Apache 2.0，全部 32K 上下文",
  "4B is the sweet spot — the 8B costs more and scores no better":
    "4B 是甜点档 —— 8B 更贵，分数却不更高",
  "Vendor numbers are MTEB-R, so verify on your own labelled set":
    "厂商给的是 MTEB-R 数字，请在你自己的标注集上复核",
  "Easiest hosted API; pick Pro or Fast":
    "最省事的托管 API；在 Pro 与 Fast 间二选一",
  "32k context and 100+ languages on both variants":
    "两个版本都是 32k 上下文、100+ 语言",
  "Pro for precision, Fast for throughput — $0.0025 vs $0.002 a search":
    "Pro 重精度，Fast 重吞吐 —— 每次检索 $0.0025 对 $0.002",
  "Top-tier BEIR from a model that fits on one GPU":
    "单卡就能跑，BEIR 却在第一梯队",
  "61.94 BEIR nDCG@10 from 0.6B — beats Qwen3-Reranker-4B, 6× its size":
    "0.6B 拿到 61.94 BEIR nDCG@10 —— 胜过体量 6 倍的 Qwen3-Reranker-4B",
  "Listwise: 64 documents share one 131K-token context":
    "Listwise：64 篇文档共享同一个 131K token 的上下文",
  "Instruction-following relevance, priced per token":
    "可用指令引导相关性，按 token 计费",
  "Steer scoring with a natural-language instruction, no fine-tune":
    "用自然语言指令引导打分，无需微调",
  "32k context on both rerank-2.5 and the cheaper -lite tier":
    "rerank-2.5 与更便宜的 -lite 都是 32k 上下文",
  "First 200M tokens free per account; 33% off via the Batch API":
    "每个账号前 2 亿 token 免费；走 Batch API 再打 67 折",
  "Cohere Rerank 4":
    "Cohere Rerank 4",
  "Jina Reranker v3":
    "Jina Reranker v3",
  "Voyage rerank-2.5":
    "Voyage rerank-2.5",
  "_title": "重排序模型对比：cross-encoder、ColBERT、Qwen3 等 | reranker.uk",
  "_desc": "rerank 模型横向对比：五大成熟家族 + Qwen3-Reranker、Contextual AI、ColBERTv2 等 2026 方向。架构、质量、延迟、语言与成本一览。",

  "Rerank model comparison": "重排序模型对比",
  "Production stacks mix <strong>cross-encoders</strong>, <strong>listwise</strong> models, <strong>late-interaction</strong>, and instruction APIs. This table puts <strong>2026 open SOTA candidates (Qwen3)</strong> next to proven families (bge, mxbai, Cohere, Jina v3) — architecture, latency, languages, cost, with honest footnotes when score protocols differ.": "生产栈混合 <strong>cross-encoder</strong>、<strong>listwise</strong>、<strong>late-interaction</strong> 与指令 API。本表把 <strong>2026 开源 SOTA 候选（Qwen3）</strong> 与成熟家族（bge、mxbai、Cohere、Jina v3）并列 —— 架构、延迟、语言、成本；分数协议不同时脚注标明。",
  "Listwise": "Listwise",
  "2026 SOTA*": "2026 SOTA*",
  "Default 2026 open self-host pick (GPU)": "2026 开源自建默认（GPU）",
  "Top open-weight quality; largest Qwen3": "开源质量顶配；最大 Qwen3",
  "Lightest Qwen3; still needs GPU for comfort": "最轻 Qwen3；舒适运行仍需 GPU",
  "Proven self-host default; CPU-friendly": "经过验证的自建默认；CPU 友好",
  "Strong classic BEIR; xsmall in demo": "经典 BEIR 强；Demo 用 xsmall",
  "Listwise long-context (up to ~64 docs)": "Listwise 长上下文（最多约 64 段）",
  "Browser / edge; powers our demo": "浏览器 / 边缘；驱动本站 Demo",
  "Mature multilingual API": "成熟多语言 API",
  "High precision; domain variants": "高精度；领域变体",
  "~149M; strong English hit-rate in 2026 benches": "~149M；2026 英文 hit-rate 强",
  "Enterprise / NVIDIA stack; QA-tuned": "企业 / NVIDIA 栈；偏 QA",
  "Classic baseline; demo default": "经典基线；Demo 默认",
  "Instruction-following / policy-shaped relevance": "指令跟随 / 策略型相关性",
  "Token MaxSim; stage-1.5 not full CE": "Token MaxSim；1.5 阶段而非完整 CE",
  "MTEB-R ~70+*": "MTEB-R ~70+*",
  "BEIR-style ~75+*": "BEIR 类 ~75+*",
  "MTEB-R competitive*": "MTEB-R 有竞争力*",
  "legacy tiny": "旧版 tiny",
  "task benches*": "任务基准*",
  "product metrics*": "产品指标*",
  "0.6B / 4B / 8B family — the leading open-weight story in 2026 for multilingual self-host (GPU). Start with 4B when quality matters.": "0.6B / 4B / 8B 家族 —— 2026 多语言 GPU 自建开源主线。质量优先从 4B 起。",
  "Open-weight rerankers from BAAI. Still the best CPU-friendly default (v2-m3). Pair with Qwen3 when you have GPU headroom.": "智源开源权重。仍是 CPU 友好默认（v2-m3）。有 GPU 余量时与 Qwen3 对比。",
  "v3 listwise long-context flagship; v1-tiny still powers the browser demo. Open weights + hosted API.": "v3 listwise 长上下文旗舰；v1-tiny 仍驱动 Demo。开源 + 托管 API。",
  "2026 open SOTA candidate — start at 4B": "2026 开源 SOTA 候选 —— 从 4B 起步",
  "0.6B / 4B / 8B — pick size vs latency on your GPU": "0.6B / 4B / 8B —— 按 GPU 在体量与延迟间取舍",
  "Strong multilingual + long-context reports (MTEB-R)": "多语言 + 长上下文（MTEB-R 报道）",
  "Apache 2.0 family; verify on your labelled set": "Apache 2.0 家族；用自有标注验证",
  "Best free self-host when GPU is limited": "GPU 有限时的最佳免费自建",
  "v3 listwise + browser tiny": "v3 listwise + 浏览器 tiny",
  "v3 listwise long-context for production ranking": "v3 listwise 长上下文，适合生产排序",
  "v1-tiny still runs in the browser (our demo)": "v1-tiny 仍可在浏览器跑（本站 Demo）",
  "Free tier; open weights + hosted API": "免费档；开源权重 + 托管 API",
  "<strong>Last verified:</strong> June 2026 (refreshed for Qwen3 / Jina v3) · <strong>Next review:</strong> Oct 2026. Columns marked <strong>*</strong> use MTEB-R, vendor, or task-specific protocols — <em>not</em> the same classic BEIR 18-dataset avg as bge/Cohere/mxbai rows. <strong>†</strong> Pricing lags vendor pages. Demo-capable models only: mxbai xsmall, Jina tiny, ms-marco MiniLM.": "<strong>最近核验：</strong>2026 年 6 月（为 Qwen3 / Jina v3 刷新）· <strong>下次复核：</strong>2026 年 10 月。标 <strong>*</strong> 的列为 MTEB-R / 厂商 / 任务协议 —— <em>并非</em> bge/Cohere/mxbai 行的经典 BEIR 18 均值。<strong>†</strong> 价格可能滞后。可进 Demo：mxbai xsmall、Jina tiny、ms-marco MiniLM。",

  "Model": "模型",
  "Architecture": "架构",
  "Type": "类型",
  "Cross-encoder": "Cross-encoder",
  "Late-interaction": "Late-interaction",
  "Instruction": "Instruction",
  "Emerging": "新兴",
  "Best for": "最适合",
  "Languages": "语言",
  "Typ. latency <span class=\"th-hint\">50 docs</span>": "典型延迟 <span class=\"th-hint\">50 条文档</span>",
  "Pricing": "价格",
  "Self-hosted, free, multilingual": "自建部署、免费、多语言",
  "Best multilingual quality, mature API": "最佳多语言质量、成熟 API",
  "Open weights + API + tiny browser model": "开源权重 + API + 浏览器微型模型",
  "High retrieval precision, domain-specific": "高检索精度、面向特定领域",
  "100+ langs": "100+ 种语言",
  "Multilingual": "多语言",
  "Free (self-host)": "免费（自建）",
  "Free tier + pay-as-you-go": "免费额度 + 按量付费",

  "<strong>Last verified:</strong> June 2026 · <strong>Next review:</strong> Sep 2026. <strong>BEIR NDCG@10</strong> for mature rows is an approximate average across the 18-dataset suite — a rough guide, not a leaderboard. <strong>Emerging rows</strong> (Qwen3, Contextual, ColBERT) use ≈ / n/a because public scores are not aligned to the same protocol. <strong>Pricing</strong> and <strong>latency</strong> lag vendor pages; re-check before production decisions.": "<strong>最近核验：</strong>2026 年 6 月 · <strong>下次复核：</strong>2026 年 9 月。成熟行的 <strong>BEIR NDCG@10</strong> 为 18 数据集近似均值 —— 粗略参考，非排行榜。<strong>新兴行</strong>（Qwen3、Contextual、ColBERT）用 ≈ / n/a，因公开分数协议不统一。<strong>价格</strong>与<strong>延迟</strong>可能滞后厂商页，上线前请复核。",
  "Classic baseline; default in our demo": "经典基线；本站 Demo 默认",
  "2026 multilingual open reranker; Qwen ecosystem": "2026 多语言开源 reranker；Qwen 生态",
  "Instruction-following rerank for task-shaped queries": "面向任务型查询的指令跟随 rerank",
  "Token-level MaxSim; stage-1.5 not full rerank": "Token 级 MaxSim；1.5 阶段而非完整 rerank",
  "Contact vendor": "联系厂商",
  "GPU recommended": "建议 GPU",
  "Fast rescore @ scale": "大规模快速重打分",
  "≈ / unaligned": "≈ / 未对齐",
  "n/a": "不适用",
  "Late-interaction (ColBERT)": "Late-interaction（ColBERT）",
  "When ColBERTv2 beats bi-encoders and when you still need a cross-encoder — decision guide for 2026 stacks.": "ColBERTv2 何时胜过 bi-encoder、何时仍要 cross-encoder —— 2026 栈决策指南。",
  "Instruction-following rerank": "指令跟随 rerank",
  "When task instructions change relevance — Contextual AI-style rerankers vs plain cross-encoders.": "任务指令如何改变相关性 —— Contextual AI 类 vs 经典 cross-encoder。",

  "Open-weight rerankers from BAAI. A strong English baseline (bge-reranker-base) and excellent multilingual models (bge-reranker-v2-m3). The default choice when you want to self-host for free.": "智源（BAAI）的开源权重重排序器。既有强力的英文基线（bge-reranker-base），也有出色的多语言模型（bge-reranker-v2-m3）。想免费自建时的默认选择。",
  "The most mature hosted rerank API, with consistent multilingual quality, a generous free tier and SDK support across Python, Node, Java and Go.": "最成熟的托管重排序 API，多语言质量稳定，免费额度慷慨，并提供 Python、Node、Java、Go 的 SDK。",
  "Unique in offering both a hosted API and open weights — including a tiny model small enough to run in the browser (which powers our demo).": "独特之处在于同时提供托管 API 和开源权重 —— 包含一个小到能在浏览器里运行的微型模型（正是它驱动了我们的 Demo）。",
  "Voyage AI's rerankers are optimised specifically for retrieval precision and offer domain-tuned variants for code and finance.": "Voyage AI 的重排序器专门为检索精度优化，并为代码和金融提供领域调优的变体。",

  "Demo": "试用",
  "How to choose": "如何选择",
  "Best free self-hosted option": "最佳免费自建方案",
  "Zero per-call cost — runs on your own infra": "零按次成本 —— 跑在你自己的基础设施上",
  "Strong multilingual quality (v2-m3 covers 100+ languages)": "强多语言质量（v2-m3 覆盖 100+ 种语言）",
  "Drop-in with <code>sentence-transformers</code>, LangChain, LlamaIndex": "与 <code>sentence-transformers</code>、LangChain、LlamaIndex 即插即用",
  "Easiest hosted API, top multilingual quality": "最简单的托管 API，顶级多语言质量",
  "Official SDK for Python, Node, Java, Go — one-liner integration": "Python、Node、Java、Go 官方 SDK —— 一行代码接入",
  "Consistent multilingual quality across 100+ languages": "100+ 语言的稳定多语言质量",
  "Generous free tier; mature, production-proven API": "慷慨的免费额度；成熟、久经生产验证的 API",
  "Maximum flexibility — API, self-host, or browser": "最大灵活性 —— API、自建或浏览器随你选",
  "Choose hosted API <em>or</em> open weights — same model family": "选择托管 API <em>或</em>开源权重 —— 同一模型家族",
  "Tiny variant runs in the browser (no server needed)": "微型变体可在浏览器里运行（无需服务器）",
  "Free tier, no credit card required to start": "有免费额度，无需信用卡即可开始",
  "Top retrieval precision, domain-specific variants": "顶级检索精度，领域专用变体",
  "Tuned specifically for retrieval quality, not just classification": "专门为检索质量调优，而非仅面向分类任务",
  "Domain-specific models for code search and finance": "面向代码搜索和金融的领域专属模型",
  "Lowest per-1k-doc price among the hosted APIs": "托管 API 中按千条计费最低价",
  "Apache 2.0 open weights, browser-runnable xsmall": "Apache 2.0 开源权重，浏览器可运行的 xsmall",
  "Permissive Apache 2.0 licence — use commercially without restrictions": "宽松的 Apache 2.0 协议 —— 可商用、无限制",
  "xsmall variant runs in the browser (powers our live demo)": "xsmall 变体可在浏览器中运行（驱动本站实时 Demo）",
  "Highest BEIR score in this table at the large size": "大参数版本在本表中 BEIR 分数最高",
  "Open weights + browser-runnable xsmall": "开源权重 + 可在浏览器运行的 xsmall",
  "English": "英文",

  "Try a cross-encoder live": "实时体验一个 cross-encoder",
  "See how any of these models would reorder your retrieval results — demo runs in your browser.": "看看这些模型会如何重排你的检索结果 —— Demo 在你的浏览器里运行。",
  "Open the demo →": "打开 Demo →"
}};

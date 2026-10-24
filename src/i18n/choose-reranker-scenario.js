window.I18N_PAGE = { zh: {
  "The classic small models — ms-marco MiniLM, Jina v1, mxbai v1 — were trained on English only. Qwen3-Reranker (100+ languages), bge-reranker-v2-m3 and the 306M <strong>gte-multilingual-reranker-base</strong> (70+ languages) were trained for it. If your servers are in mainland China and you would rather not host a model, <strong>Alibaba Cloud Model Studio</strong> sells qwen3-rerank by the token in yuan, and <strong>SiliconFlow</strong> serves bge-reranker-v2-m3 and Qwen3-Reranker behind one endpoint; both are in the <a href=\"/models/\">models table</a> and the cost calculator’s yuan table. To download open weights in mainland China, <a href=\"https://hf-mirror.com\" rel=\"noopener noreferrer\">hf-mirror.com</a> mirrors Hugging Face. The <a href=\"/guides/rerank-in-china.html\">mainland China guide</a> compares the three routes in detail.":
    "经典的小模型 —— ms-marco MiniLM、Jina v1、mxbai v1 —— 只用英文训练。Qwen3-Reranker（100 多种语言）、bge-reranker-v2-m3 和 306M 的 <strong>gte-multilingual-reranker-base</strong>（70 多种语言）是为多语言训练的。如果服务器在国内、又不想自己部署模型，<strong>阿里云百炼</strong>按 token 以人民币出售 qwen3-rerank，<strong>硅基流动</strong>用同一个接口提供 bge-reranker-v2-m3 和 Qwen3-Reranker；两者都在<a href=\"/models/\">模型对比表</a>和成本计算器的人民币表里。在国内下载开源权重，可以用 Hugging Face 的镜像 <a href=\"https://hf-mirror.com\" rel=\"noopener noreferrer\">hf-mirror.com</a>。<a href=\"/guides/rerank-in-china.html\">国内选型指南</a>详细对比了这三条路。",
  "<a href=\"/models/bge-reranker.html\">bge-reranker-v2-m3</a> or <a href=\"/models/qwen-reranker.html\">Qwen3-Reranker-4B</a> (self-host), <a href=\"/models/cohere-rerank.html\">Cohere Rerank 5</a> or <a href=\"/models/voyage-rerank.html\">Voyage rerank-3</a> (API)":
    "自建可用 <a href=\"/models/bge-reranker.html\">bge-reranker-v2-m3</a> 或 <a href=\"/models/qwen-reranker.html\">Qwen3-Reranker-4B</a>；托管 API 可用 <a href=\"/models/cohere-rerank.html\">Cohere Rerank 5</a> 或 <a href=\"/models/voyage-rerank.html\">Voyage rerank-3</a>",
  "CPU or GPU / hosted API":
    "CPU 或 GPU / 托管 API",
  "Chinese and multilingual":
    "中文与多语言",
  "Mixed-language queries and documents":
    "查询和文档混合多种语言",
  "<a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a>, <a href=\"/models/bge-reranker.html\">bge-reranker-v2-m3</a> or <a href=\"/models/#gte-multilingual-reranker-base\">gte-multilingual-reranker-base</a>; in mainland China, <a href=\"/models/#alibaba-model-studio\">Alibaba Cloud Model Studio</a> or <a href=\"/models/#siliconflow\">SiliconFlow</a>":
    "<a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a>、<a href=\"/models/bge-reranker.html\">bge-reranker-v2-m3</a> 或 <a href=\"/models/#gte-multilingual-reranker-base\">gte-multilingual-reranker-base</a>；在国内可用<a href=\"/models/#alibaba-model-studio\">阿里云百炼</a>或<a href=\"/models/#siliconflow\">硅基流动</a>",
  "Self-host / API in China":
    "自建 / 国内 API",
  "<a href=\"/models/jina-reranker.html\">jina-reranker-v1-tiny-en</a> or ms-marco MiniLM (English), <a href=\"/models/cohere-rerank.html\">Cohere Rerank 5 Fast</a>":
    "英文场景用 <a href=\"/models/jina-reranker.html\">jina-reranker-v1-tiny-en</a> 或 ms-marco MiniLM，托管 API 用 <a href=\"/models/cohere-rerank.html\">Cohere Rerank 5 Fast</a>",
  "CPU, browser or API":
    "CPU、浏览器或 API",
  "An <a href=\"/guides/instruction-reranker.html\">instruction-following reranker</a>: Qwen3-Reranker, Voyage rerank-3, or Contextual AI Rerank v2 (weights for non-commercial use, or its hosted API)":
    "<a href=\"/guides/instruction-reranker.html\">能跟随指令的重排序模型</a>：Qwen3-Reranker、Voyage rerank-3，或 Contextual AI Rerank v2（权重仅限非商用，商用可走它的托管 API）",
  "<a href=\"/guides/hybrid-retrieval-rerank.html\">Hybrid BM25 + vector retrieval</a>, then Qwen3-Reranker or Voyage rerank-3":
    "<a href=\"/guides/hybrid-retrieval-rerank.html\">BM25 + 向量混合检索</a>，再用 Qwen3-Reranker 或 Voyage rerank-3 重排序",
  "Scanned PDFs, slides, screenshots":
    "扫描 PDF、幻灯片、截图",
  "The text is in an image, or the layout carries meaning":
    "文字在图片里，或版面本身带有信息",
  "<a href=\"/models/#qwen3-vl-reranker\">Qwen3-VL-Reranker</a>, <a href=\"/models/#lighton-rerank\">LightOn-rerank</a> or <a href=\"/models/nvidia-rerank.html\">NVIDIA Nemotron</a>":
    "<a href=\"/models/#qwen3-vl-reranker\">Qwen3-VL-Reranker</a>、<a href=\"/models/#lighton-rerank\">LightOn-rerank</a> 或 <a href=\"/models/nvidia-rerank.html\">NVIDIA Nemotron</a>",
  "GPU":
    "GPU",
  "Each pick links to its page or row, where the vendor’s own figures are shown with how they were measured. None of them replaces a test on your own queries — see <a href=\"/guides/evaluate-reranker.html\">evaluating a reranker</a>.":
    "每个推荐都链接到对应的页面或表格行，那里列有厂商自己的数字和测试方法。但这些都替代不了用你自己的查询做测试 —— 见<a href=\"/guides/evaluate-reranker.html\">如何评估重排序模型</a>。",
  "Retrieve 50–100 chunks, rerank to 5–10, then prompt. Without a GPU, <strong>bge-reranker-v2-m3</strong> is the usual self-hosted default; with one, <strong>Qwen3-Reranker-4B</strong>, which in Qwen’s own tests beats the 8B on English. As a hosted API, <strong>Cohere Rerank 5</strong> and <strong>Voyage rerank-3</strong> both bill per token, at the same list price — the <a href=\"/rerank-cost-calculator.html\">cost calculator</a> compares them with the other APIs at your volume. See <a href=\"/guides/rerank-rag.html\">rerank for RAG</a> and <a href=\"/guides/hybrid-retrieval-rerank.html\">hybrid retrieval</a> when lexical matches matter.":
    "先召回 50–100 个分块，重排序后留 5–10 个，再交给大模型。没有 GPU 时，自建通常默认用 <strong>bge-reranker-v2-m3</strong>；有 GPU 就用 <strong>Qwen3-Reranker-4B</strong>，在 Qwen 自己的测试里它在英文上比 8B 还好。托管 API 方面，<strong>Cohere Rerank 5</strong> 和 <strong>Voyage rerank-3</strong> 都按 token 计费，标价相同 —— <a href=\"/rerank-cost-calculator.html\">成本计算器</a>能在你的量级下把它们和其他 API 放在一起比较。需要关键词精确匹配时，见<a href=\"/guides/rerank-rag.html\">RAG 中的重排序</a>和<a href=\"/guides/hybrid-retrieval-rerank.html\">混合检索</a>。",
  "The classic small models — ms-marco MiniLM, Jina v1, mxbai v1 — were trained on English only. Qwen3-Reranker (100+ languages), bge-reranker-v2-m3 and the 306M <strong>gte-multilingual-reranker-base</strong> (70+ languages) were trained for it. If your servers are in mainland China and you would rather not host a model, <strong>Alibaba Cloud Model Studio</strong> sells qwen3-rerank by the token in yuan, and <strong>SiliconFlow</strong> serves bge-reranker-v2-m3 and Qwen3-Reranker behind one endpoint; both are in the <a href=\"/models/\">models table</a> and the cost calculator’s yuan table. To download open weights in mainland China, <a href=\"https://hf-mirror.com\" rel=\"noopener noreferrer\">hf-mirror.com</a> mirrors Hugging Face.":
    "经典的小模型 —— ms-marco MiniLM、Jina v1、mxbai v1 —— 只用英文训练。Qwen3-Reranker（100 多种语言）、bge-reranker-v2-m3 和 306M 的 <strong>gte-multilingual-reranker-base</strong>（70 多种语言）是为多语言训练的。如果服务器在国内、又不想自己部署模型，<strong>阿里云百炼</strong>按 token 以人民币出售 qwen3-rerank，<strong>硅基流动</strong>用同一个接口提供 bge-reranker-v2-m3 和 Qwen3-Reranker；两者都在<a href=\"/models/\">模型对比表</a>和成本计算器的人民币表里。在国内下载开源权重，可以用 Hugging Face 的镜像 <a href=\"https://hf-mirror.com\" rel=\"noopener noreferrer\">hf-mirror.com</a>。",
  "Queries are short, passages are FAQ-sized, and latency dominates UX. A <strong>tiny</strong> cross-encoder (Jina v1 tiny, ms-marco MiniLM) often suffices for English — you are choosing among a handful of similar answers, not reading 100-page PDFs. If MiniLM-L6 is still too slow, its sibling <code>cross-encoder/ms-marco-MiniLM-L4-v2</code> drops two layers: {{fact:ms-marco-minilm-l4-v2.trec_dl19}} against {{fact:ms-marco-minilm-l6-v2.trec_dl19}} NDCG@10 on TREC DL 19, at {{fact:ms-marco-minilm-l4-v2.docs_per_sec}} documents a second against {{fact:ms-marco-minilm-l6-v2.docs_per_sec}} on a V100, by sentence-transformers’ own figures. For other languages, start with bge-reranker-v2-m3. Try the <strong>Customer support</strong> preset in our <a href=\"/demo.html?s=support\">demo</a>.":
    "查询很短，段落只有 FAQ 那么长，延迟决定体验。英文场景下，一个<strong>极小</strong>的 cross-encoder（Jina v1 tiny、ms-marco MiniLM）往往就够了 —— 你是在几条相似答案里挑一条，而不是读 100 页的 PDF。如果 MiniLM-L6 还是太慢，同系列的 <code>cross-encoder/ms-marco-MiniLM-L4-v2</code> 少两层：按 sentence-transformers 自己的数据，TREC DL 19 上 NDCG@10 是 {{fact:ms-marco-minilm-l4-v2.trec_dl19}}（L6 是 {{fact:ms-marco-minilm-l6-v2.trec_dl19}}），在 V100 上每秒处理 {{fact:ms-marco-minilm-l4-v2.docs_per_sec}} 篇文档（L6 是 {{fact:ms-marco-minilm-l6-v2.docs_per_sec}}）。其他语言先从 bge-reranker-v2-m3 开始。可以在 <a href=\"/demo.html?s=support\">Demo</a> 里试试<strong>客服</strong>预设。",
  "Distractors share vocabulary (“termination”, “notice period”, “breach”). Bi-encoders confuse them; cross-encoders separate nuance, and an <strong>instruction-following</strong> reranker lets you say what counts — “the clause that governs termination for convenience”, “later amendments supersede earlier ones”. Qwen3-Reranker and Voyage rerank-3 take instructions; Contextual AI Rerank v2’s weights are non-commercial. Budget extra latency for a larger model and keep passages to single clauses. Demo preset: <strong>Legal clause</strong>.":
    "干扰项和正确答案用词相同（“终止”“通知期”“违约”）。bi-encoder 容易混淆它们；cross-encoder 能分辨细微差别，而<strong>能跟随指令</strong>的重排序模型还能让你说明什么才算相关 —— 例如“规定无故终止的条款”“后来的修订取代先前的”。Qwen3-Reranker 和 Voyage rerank-3 支持指令；Contextual AI Rerank v2 的权重仅限非商用。为更大的模型预留延迟，并把段落切成单条条款。Demo 预设：<strong>法律条款</strong>。",
  "Vector search alone misses exact function names; BM25 alone misses paraphrased “how do I…” questions. Use <strong>hybrid retrieval</strong>, then rerank. Qwen publish code-retrieval scores for Qwen3-Reranker (see the <a href=\"/models/qwen-reranker.html#scores\">Qwen page</a>), and Voyage report rerank-3’s gain over rerank-2.5 on their code datasets (see the <a href=\"/models/voyage-rerank.html\">Voyage page</a>). Demo presets: <strong>Technical docs</strong> and <strong>Code search</strong>.":
    "单靠向量检索会漏掉精确的函数名；单靠 BM25 会漏掉换了说法的“怎么……”类问题。先做<strong>混合检索</strong>，再重排序。Qwen 公布了 Qwen3-Reranker 的代码检索分数（见 <a href=\"/models/qwen-reranker.html#scores\">Qwen 页面</a>），Voyage 也公布了 rerank-3 在自家代码数据集上相对 rerank-2.5 的提升（见 <a href=\"/models/voyage-rerank.html\">Voyage 页面</a>）。Demo 预设：<strong>技术文档</strong>和<strong>代码搜索</strong>。",
  "Scanned PDFs, slides and screenshots":
    "扫描 PDF、幻灯片和截图",
  "If your documents are page images — scans, slide decks, dashboards — a text reranker only sees whatever OCR extracted. <strong>Qwen3-VL-Reranker</strong> (2B / 8B) and <strong>LightOn-rerank</strong> score page images directly, both under Apache 2.0, and Alibaba Cloud sells <strong>qwen3-vl-rerank</strong> as an API. NVIDIA’s <a href=\"/models/nvidia-rerank.html\">Nemotron-3.5-Rerank-8B</a> and the smaller llama-nemotron-rerank-vl-1b-v2 do the same under licences that allow commercial use, and take a page’s image and its extracted text together. Their published scores are on ViDoRe, a visual-document benchmark, so compare them with each other rather than with the BEIR column.":
    "如果你的文档是页面图片 —— 扫描件、幻灯片、仪表盘 —— 文本重排序模型只能看到 OCR 提取出来的内容。<strong>Qwen3-VL-Reranker</strong>（2B / 8B）和 <strong>LightOn-rerank</strong> 直接给页面图片打分，都是 Apache 2.0 许可，阿里云还以 API 形式提供 <strong>qwen3-vl-rerank</strong>。NVIDIA 的 <a href=\"/models/nvidia-rerank.html\">Nemotron-3.5-Rerank-8B</a> 和更小的 llama-nemotron-rerank-vl-1b-v2 也能这样做，许可证允许商用，而且能把页面图片和提取出的文本一起输入。它们公布的分数来自视觉文档基准 ViDoRe，所以应该互相比较，而不是和 BEIR 那一列比。",
  "Compare every model and hosted API in one table, then jump into the demo with one click.":
    "在一张表里对比所有模型和托管 API，一键跳转到 Demo。",
  "Decision guide · ~8 min read · <time datetime=\"2026-10-12\">Updated 12 Oct 2026</time>":
    "决策指南 · 约 8 分钟阅读 · <time datetime=\"2026-10-12\">更新于 2026 年 10 月 12 日</time>",
  "_title": "按场景选择 reranker — RAG、客服、法律、代码 | reranker.uk",
  "_desc": "决策指南：RAG 流水线、客服工单、法律检索、代码搜索分别适合哪种 rerank 模型。含场景矩阵、模型推荐与 Demo 预设对照。",

  "<a href=\"/\">Home</a><span>/</span><a href=\"/guides/\">Guides</a><span>/</span>Choose by scenario": "<a href=\"/\">首页</a><span>/</span><a href=\"/guides/\">指南</a><span>/</span>按场景选型",
  "Which reranker fits your scenario?": "哪种 reranker 适合你的场景？",
  "Decision guide · ~8 min read · <time datetime=\"2026-06-23\">Updated 23 Jun 2026</time>": "决策指南 · 约 8 分钟阅读 · <time datetime=\"2026-06-23\">更新于 2026 年 6 月 23 日</time>",
  "Rerankers are not one-size-fits-all. The right choice depends on <strong>language coverage</strong>, <strong>latency budget</strong>, <strong>data sensitivity</strong>, and whether your queries look more like <em>support tickets</em>, <em>legal clauses</em>, <em>code search</em>, or <em>RAG chunks</em>.": "reranker 并非一刀切。正确选择取决于<strong>语言覆盖</strong>、<strong>延迟预算</strong>、<strong>数据敏感度</strong>，以及你的查询更像<em>客服工单</em>、<em>法律条款</em>、<em>代码检索</em>还是<em>RAG 分块</em>。",

  "On this page": "本页目录",
  "Scenario matrix": "场景矩阵",
  "RAG &amp; knowledge bases": "RAG 与知识库",
  "Customer support": "客服工单",
  "Legal &amp; compliance": "法律与合规",
  "Code &amp; technical docs": "代码与技术文档",
  "Try it in the demo": "在 Demo 中试用",

  "Scenario matrix": "场景矩阵",
  "Scenario": "场景",
  "Typical challenge": "典型难点",
  "Starting recommendation": "起步推荐",
  "Run where": "运行位置",
  "RAG pipeline": "RAG 流水线",
  "Noisy vector recall, need top-5 precision": "向量召回噪声大，需要 top-5 精度",
  "Your GPU / hosted API": "你的 GPU / 托管 API",
  "Many similar FAQ lines, fast response": "大量相似 FAQ，要求快速响应",
  "API or browser demo": "API 或浏览器 Demo",
  "Legal / contracts": "法律 / 合同",
  "Subtle wording, distractors share vocabulary": "措辞细微，干扰项共享词汇",
  "Self-host / API": "自托管 / API",
  "Code &amp; API docs": "代码与 API 文档",
  "Exact identifiers, syntax matters": "精确标识符与语法很重要",
  "Hybrid retrieve + rerank": "混合检索 + 重排序",
  "<a href=\"/models/bge-reranker.html\">bge-reranker-v2-m3</a> (self-host) or <a href=\"/models/cohere-rerank.html\">Cohere Rerank</a> (API)": "<a href=\"/models/bge-reranker.html\">bge-reranker-v2-m3</a>（自托管）或 <a href=\"/models/cohere-rerank.html\">Cohere Rerank</a>（API）",
  "<a href=\"/models/jina-reranker.html\">jina-reranker tiny</a> or <a href=\"/models/cohere-rerank.html\">Cohere Rerank 4 Fast</a>": "可在浏览器跑 <a href=\"/models/jina-reranker.html\">jina-reranker tiny</a>，或用托管的 <a href=\"/models/cohere-rerank.html\">Cohere Rerank 4 Fast</a>",
  "<a href=\"/models/mxbai-rerank.html\">mxbai-rerank-large</a> or <a href=\"/models/voyage-rerank.html\">Voyage</a> legal-tuned": "<a href=\"/models/mxbai-rerank.html\">mxbai-rerank-large</a> 或 <a href=\"/models/voyage-rerank.html\">Voyage</a> 法律微调",
  "<a href=\"/models/voyage-rerank.html\">Voyage code</a> or hybrid BM25 + <a href=\"/models/bge-reranker.html\">bge</a>": "<a href=\"/models/voyage-rerank.html\">Voyage code</a> 或混合 BM25 + <a href=\"/models/bge-reranker.html\">bge</a>",

  "<a href=\"#matrix\">Scenario matrix</a>": "<a href=\"#matrix\">场景矩阵</a>",
  "<a href=\"#rag\">RAG &amp; knowledge bases</a>": "<a href=\"#rag\">RAG 与知识库</a>",
  "<a href=\"#support\">Customer support</a>": "<a href=\"#support\">客服工单</a>",
  "<a href=\"#legal\">Legal &amp; compliance</a>": "<a href=\"#legal\">法律与合规</a>",
  "<a href=\"#code\">Code &amp; technical docs</a>": "<a href=\"#code\">代码与技术文档</a>",
  "<a href=\"#try\">Try it in the demo</a>": "<a href=\"#try\">在 Demo 中试用</a>",

  "RAG &amp; knowledge bases": "RAG 与知识库",
  "Retrieve 50–100 chunks, rerank to 5–10, then prompt. Multilingual knowledge bases favour <strong>bge-v2-m3</strong> or <strong>Cohere v3.5</strong>. English-only stacks with tight quality targets often pick <strong>mxbai-large</strong>. See <a href=\"/guides/rerank-rag.html\">rerank for RAG</a> and <a href=\"/guides/hybrid-retrieval-rerank.html\">hybrid retrieval</a> when lexical matches matter.": "召回 50–100 个 chunk，重排至 5–10 条再进 prompt。多语言知识库倾向 <strong>bge-v2-m3</strong> 或 <strong>Cohere v3.5</strong>；仅英文且质量要求高常选 <strong>mxbai-large</strong>。词面匹配重要时见 <a href=\"/guides/rerank-rag.html\">为 RAG 加重排序</a> 与 <a href=\"/guides/hybrid-retrieval-rerank.html\">混合检索</a>。",
  "Rule of thumb: if bi-encoder recall is already good, a mid-size reranker is enough. If recall is messy, fix retrieval width first.": "经验法则：bi-encoder 召回已经够好，中等 reranker 即可；召回很乱时，先加宽检索。",

  "Customer support": "客服工单",
  "Queries are short, passages are FAQ-sized, and latency dominates UX. A <strong>tiny</strong> cross-encoder (Jina tiny, ms-marco MiniLM) often suffices — you are choosing among a handful of similar answers, not reading 100-page PDFs. Try the <strong>Customer support</strong> preset in our <a href=\"/demo.html\">demo</a>.": "查询短、段落 FAQ 体量、延迟主导体验。<strong>tiny</strong> cross-encoder（Jina tiny、ms-marco MiniLM）往往够用 —— 你是在若干相似答案里选，不是读百页 PDF。可在 <a href=\"/demo.html\">Demo</a> 试 <strong>客服工单</strong> 预设。",

  "Legal &amp; compliance": "法律与合规",
  "Distractors share vocabulary (“termination”, “notice period”, “breach”). Bi-encoders confuse them; cross-encoders separate nuance. Budget extra latency for a larger model and keep passages to single clauses. Demo preset: <strong>Legal clause</strong>.": "干扰项共享词汇（「终止」「通知期」「违约」）。bi-encoder 易混淆；cross-encoder 能区分细微差别。为大模型预留额外延迟，段落保持单条款粒度。Demo 预设：<strong>法律条款</strong>。",

  "Code &amp; technical docs": "代码与技术文档",
  "Vector search alone misses exact function names; BM25 alone misses paraphrased “how do I…” questions. Use <strong>hybrid retrieval</strong>, then rerank. Domain rerankers (Voyage code) help; otherwise bge-base + good chunking works. Demo presets: <strong>Technical docs</strong> and <strong>Code search</strong>.": "纯向量检索会漏精确函数名；纯 BM25 会漏「我该如何…」类改写。用<strong>混合检索</strong>再 rerank。领域 reranker（Voyage code）有帮助；否则 bge-base + 合理分块也行。Demo 预设：<strong>技术文档</strong>、<strong>代码检索</strong>。",

  "Try it in the demo": "在 Demo 中试用",
  "Each scenario below maps to a built-in preset — load it, hit Rerank, and watch the bi-encoder proxy column mis-order before the cross-encoder fixes it.": "下列场景对应内置预设 —— 载入后点重排序，看 bi-encoder 代理列先排错，再由 cross-encoder 纠正。",
  "Mixed on-topic + off-topic chunks.": "切题与跑题 chunk 混合。",
  "Tracking vs refunds vs passwords.": "物流 vs 退款 vs 密码。",
  "Several “termination” distractors.": "多条「终止」干扰项。",
  "API rate limits vs unrelated endpoints.": "API 限流 vs 无关端点。",

  "Still deciding?": "还在犹豫？",
  "Compare all five model families side by side, then jump into the demo with one click.": "并排对比五大模型家族，一键跳进 Demo。",
  "Compare models →": "对比模型 →",

  "Keep reading": "继续阅读",
  "Self-host a reranker": "自托管 reranker",
  "sentence-transformers + serving.": "sentence-transformers 与服务化。",
  "Evaluate rerankers": "评测 reranker",
  "Prove the choice on your data.": "用你的数据验证选择。",
  "Technical docs": "技术文档",
  "Legal clause": "法律条款",
}};
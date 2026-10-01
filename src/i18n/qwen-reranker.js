window.I18N_PAGE = { zh: {
  "_title": "Qwen3-Reranker：0.6B / 4B / 8B 开源重排序评测 | reranker.uk",
  "_desc": "Qwen3-Reranker 评测（2026 年 10 月）：0.6B、4B、8B 怎么选，Qwen 自己公布的 MTEB-R 等分数及其测法，指令用法、sentence-transformers 示例，以及相对 bge 与托管 API 的取舍。",

  "<a href=\"/\">Home</a><span>/</span><a href=\"/models/\">Models</a><span>/</span>Qwen3-Reranker": "<a href=\"/\">首页</a><span>/</span><a href=\"/models/\">模型对比</a><span>/</span>Qwen3-Reranker",
  "Qwen3-Reranker": "Qwen3-Reranker",
  "Open weights · Qwen / Tongyi · <time datetime=\"2026-06-25\">Updated 25 Jun 2026</time>": "开源权重 · 通义 Qwen · <time datetime=\"2026-06-25\">更新于 2026 年 6 月 25 日</time>",
  "The <strong>Qwen3-Reranker</strong> family (0.6B / 4B / 8B) is the headline open-weight reranker story of 2026: multilingual, long-context friendly, and frequently topping community open-weight leaderboards. Treat published MTEB-R / BEIR-style numbers as <em>directionally</em> strong — always validate on your own labels before replacing bge or a hosted API.": "<strong>Qwen3-Reranker</strong> 家族（0.6B / 4B / 8B）是 2026 开源重排序主线：多语言、偏长上下文，常居社区开源榜前列。公开 MTEB-R / BEIR 类数字仅作<em>方向性</em>参考 —— 替换 bge 或托管 API 前务必用自有标注验证。",

  "On this page": "本页目录",
  "Model variants": "模型变体",
  "Scores &amp; honesty": "分数与诚实说明",
  "Quick start": "快速上手",
  "When to pick Qwen3": "何时选 Qwen3",
  "Pros and cons": "优缺点",

  "<a href=\"#variants\">Model variants</a>": "<a href=\"#variants\">模型变体</a>",
  "<a href=\"#scores\">Scores &amp; honesty</a>": "<a href=\"#scores\">分数与诚实说明</a>",
  "<a href=\"#usage\">Quick start</a>": "<a href=\"#usage\">快速上手</a>",
  "<a href=\"#when\">When to pick Qwen3</a>": "<a href=\"#when\">何时选 Qwen3</a>",
  "<a href=\"#pros-cons\">Pros and cons</a>": "<a href=\"#pros-cons\">优缺点</a>",

  "Model": "模型",
  "Size": "规模",
  "Best for": "最适合",
  "Lightest sibling; still prefers GPU": "最轻量；仍建议 GPU",
  "<strong>Default self-host pick</strong> when quality matters": "质量优先时的<strong>默认自建选择</strong>",
  "Maximum open quality; highest VRAM / latency": "开源质量顶配；VRAM / 延迟最高",
  "<strong>Recommendation:</strong> start with <strong>4B</strong> on a single modern GPU. Drop to 0.6B only if memory is tight; move to 8B only when labelled eval shows a clear NDCG gain worth the cost.": "<strong>建议：</strong>单卡现代 GPU 从 <strong>4B</strong> 起步。内存紧再降 0.6B；仅当标注评测显示明确 NDCG 收益时再上 8B。",

  "Scores &amp; honesty": "分数与诚实说明",
  "Public write-ups often cite MTEB-R / multilingual rerank suites in the <strong>~70+</strong> range for mid/large Qwen3 sizes, with 8B at the top of open-weight tables. Those figures are <strong>not</strong> guaranteed to match the classic BEIR 18-dataset averages we list for bge (~60) or mxbai (~62).": "公开文章常报中大型 Qwen3 在 MTEB-R / 多语言 rerank 套件约 <strong>~70+</strong>，8B 居开源榜前列。这些数字<strong>不能</strong>保证与表中 bge（~60）、mxbai（~62）的经典 BEIR 18 数据集均值同协议。",
  "Different suites, languages, and preprocessing → different numbers.": "不同套件、语言与预处理 → 不同数字。",
  "On some English-only product benches, compact models (e.g. ModernBERT-GTE) can beat a 4B model on Hit@1 while being far cheaper.": "部分纯英文产品基准上，紧凑模型（如 ModernBERT-GTE）Hit@1 可超过 4B，成本却低得多。",
  "Our <a href=\"/models/\">comparison table</a> marks Qwen scores with <strong>*</strong> for this reason.": "因此本站 <a href=\"/models/\">对比表</a> 给 Qwen 分数标了 <strong>*</strong>。",

  "Quick start": "快速上手",
  "Hugging Face / transformers": "Hugging Face / transformers",
  "For production serving, many teams use <strong>vLLM</strong> / OpenAI-compatible <code>/v1/rerank</code> endpoints. Follow the current Qwen docs for the exact prompt format — wrong templates silently destroy quality.": "生产服务常见 <strong>vLLM</strong> / OpenAI 兼容 <code>/v1/rerank</code>。务必按当前 Qwen 文档使用正确 prompt 模板 —— 模板错了会静默毁掉质量。",
  "In a RAG pipeline": "在 RAG 流水线中",

  "When to pick Qwen3": "何时选 Qwen3",
  "<strong>Yes:</strong> you have GPU, need multilingual quality, and want open weights without per-call API cost.": "<strong>适合：</strong>有 GPU、需要多语言质量、要开源权重且零按次 API 成本。",
  "<strong>Yes:</strong> long passages / long context matter and you can afford 4B–8B memory.": "<strong>适合：</strong>长段落 / 长上下文重要，且能负担 4B–8B 显存。",
  "<strong>Maybe not:</strong> CPU-only or edge — prefer <a href=\"/models/bge-reranker.html\">bge-v2-m3</a>, mxbai, or Jina tiny for demos.": "<strong>不太适合：</strong>仅 CPU 或边缘 —— 优先 <a href=\"/models/bge-reranker.html\">bge-v2-m3</a>、mxbai，或 Demo 用 Jina tiny。",
  "<strong>Maybe not:</strong> instruction-shaped policies — see <a href=\"/guides/instruction-reranker.html\">instruction-following rerank</a>.": "<strong>不太适合：</strong>策略/指令型相关性 —— 见 <a href=\"/guides/instruction-reranker.html\">指令跟随 rerank</a>。",

  "Pros and cons": "优缺点",
  "Pros": "优点",
  "Cons": "缺点",
  "Leading open-weight narrative in 2026 (0.6B–8B ladder)": "2026 开源叙事领先（0.6B–8B 阶梯）",
  "Strong multilingual + long-context positioning": "多语言 + 长上下文定位强",
  "Zero per-call cost once self-hosted": "自托管后零按次成本",
  "Active ecosystem (HF, vLLM, community recipes)": "生态活跃（HF、vLLM、社区方案）",
  "GPU (or heavy quant) required for comfort": "舒适运行需要 GPU（或强量化）",
  "Scoring template / serving stack more fiddly than MiniLM": "打分模板 / 服务栈比 MiniLM 更绕",
  "Public leaderboard numbers not 1:1 with classic BEIR avg": "公开榜数字与经典 BEIR 均值非 1:1",
  "Too large for our in-browser demo": "体量过大，无法进本站浏览器 Demo",

  "Compare on your data first": "先在你的数据上对比",
  "Use a tiny browser model to learn the UX of reranking, then A/B Qwen3-4B vs bge-v2-m3 on 30 labelled queries.": "用浏览器小模型建立 rerank 直觉，再在 30 条标注上 A/B Qwen3-4B vs bge-v2-m3。",
  "Open the demo →": "打开 Demo →",
  "Evaluate guide →": "评测指南 →",

  "Other models": "其他模型",
  "bge-reranker": "bge-reranker",
  "CPU-friendly open default.": "CPU 友好的开源默认。",
  "Jina Reranker v3": "Jina Reranker v3",
  "Listwise long-context + tiny demo.": "Listwise 长上下文 + tiny Demo。",
  "mxbai-rerank": "mxbai-rerank",
  "Classic BEIR + browser xsmall.": "经典 BEIR + 浏览器 xsmall。",
  "Self-host guide": "自托管指南",
  "Serving and ops checklist.": "服务化与运维清单。",

  // Oct 2026: jina-reranker-v3.5, licences
  "Open weights · Qwen, Alibaba · <time datetime=\"2026-10-01\">Updated 1 Oct 2026</time>":
    "开源权重 · 阿里巴巴 Qwen · <time datetime=\"2026-10-01\">更新于 2026 年 10 月 1 日</time>",
  "The <strong>Qwen3-Reranker</strong> family (0.6B / 4B / 8B) are Apache 2.0 rerankers built on Qwen3, with a 32K context, 100+ languages and support for a task instruction. In Qwen’s own tests the 4B and 8B lead bge-reranker-v2-m3 and gte-multilingual-reranker on every suite they ran — English, Chinese, multilingual, long-document and code. Those are Qwen’s numbers on Qwen’s setup: validate on your own labels before replacing bge or a hosted API.":
    "<strong>Qwen3-Reranker</strong> 家族（0.6B / 4B / 8B）是基于 Qwen3 的 Apache 2.0 重排序模型，32K 上下文，支持 100+ 种语言，并且可以接收任务指令。在 Qwen 自己的测试里，4B 和 8B 在他们跑的每一项上都领先 bge-reranker-v2-m3 和 gte-multilingual-reranker —— 英文、中文、多语言、长文档和代码。这些是 Qwen 在自己的设置下测出的数字：替换 bge 或托管 API 之前，请先在你自己的标注数据上验证。",
  "Lightest; still prefers a GPU":
    "最轻；仍然更适合在 GPU 上跑",
  "<strong>Default self-host pick</strong> — best English and instruction-following scores of the three":
    "<strong>自建部署首选</strong> —— 三者中英文和指令跟随得分最高",
  "Leads on Chinese, multilingual, long-document and code — by at most 1.5 points":
    "在中文、多语言、长文档和代码上领先 —— 最多领先 1.5 分",
  "All three: 32K context, 100+ languages, Apache 2.0.":
    "三者均为：32K 上下文、100+ 种语言、Apache 2.0。",
  "<strong>Recommendation:</strong> start with <strong>4B</strong> on a single modern GPU. Drop to 0.6B only if memory is tight; move to 8B only when labelled eval shows a clear NDCG gain worth the cost.":
    "<strong>建议：</strong>在一张现代 GPU 上从 <strong>4B</strong> 开始。只有显存吃紧时才降到 0.6B；只有在标注评测显示 NDCG 有明显、值得付出成本的提升时，才换到 8B。",
  "Scores, and whose they are":
    "分数，以及是谁测的",
  "Qwen’s own runs, from the model cards: the retrieval subsets of MTEB (English v2, Chinese v1, multilingual MMTEB and Code), MLDR for long documents and FollowIR for instruction-following, each reranking the top 100 candidates from Qwen3-Embedding-0.6B. MTEB-R is an English NDCG@10 average, but it isn’t the BEIR suite, so these numbers don’t share a column with other vendors’ BEIR figures.":
    "以上为 Qwen 自己的测试结果，取自模型卡：MTEB 的检索子集（英文 v2、中文 v1、多语言 MMTEB 和代码），长文档用 MLDR，指令跟随用 FollowIR，每项都是对 Qwen3-Embedding-0.6B 召回的前 100 个候选重排。MTEB-R 是英文 NDCG@10 均值，但不是 BEIR 套件，所以这些数字不能和其他厂商的 BEIR 分数放在同一列比较。",
  "One outside reference: Jina’s 2026 run puts Qwen3-Reranker-4B at {{fact:qwen3-reranker-4b.beir_jina_2026}} on 13 BEIR datasets — just under jina-reranker-v3.5 there, and ahead of it on multilingual, legal / medical and structured retrieval (see the <a href=\"/models/jina-reranker.html#benchmarks\">Jina page</a>). Until October 2026 this page compared Qwen’s scores with “bge (~60)” and “mxbai (~62)”; neither figure had a source, and the <a href=\"/models/\">models table</a> now shows what BAAI and mixedbread actually publish.":
    "一个外部参照：Jina 2026 年的评测里，Qwen3-Reranker-4B 在 13 个 BEIR 数据集上为 {{fact:qwen3-reranker-4b.beir_jina_2026}} —— 略低于 jina-reranker-v3.5，但在多语言、法律 / 医疗和结构化数据检索上领先它（见 <a href=\"/models/jina-reranker.html#benchmarks\">Jina 专页</a>）。2026 年 10 月之前，本页拿 Qwen 的分数去和「bge（约 60）」「mxbai（约 62）」比较；这两个数字都没有出处，<a href=\"/models/\">模型对比表</a>现在列出的是 BAAI 和 mixedbread 实际公布的数字。",
  "The model cards load the rerankers straight into sentence-transformers’ <code>CrossEncoder</code>. The card also shows a plain <code>transformers</code> path (transformers ≥ 4.51) that scores yes/no logits through Qwen’s chat template — get that template wrong and quality drops without an error.":
    "模型卡里的做法是直接用 sentence-transformers 的 <code>CrossEncoder</code> 加载。模型卡也给了一条直接用 <code>transformers</code>（需 ≥ 4.51）的路径，通过 Qwen 的对话模板给 yes/no 的 logits 打分 —— 模板一旦写错，质量会下降，但不会报错。",
  "<strong>Yes:</strong> you have GPU, need multilingual quality, and want open weights without per-call API cost.":
    "<strong>适合：</strong>你有 GPU，需要多语言质量，并且想要没有按次调用成本的开源权重。",
  "<strong>Yes:</strong> long passages matter — all three take 32K tokens.":
    "<strong>适合：</strong>需要处理长段落 —— 三个尺寸都支持 32K token。",
  "<strong>Yes:</strong> relevance needs steering. The rerankers take a task instruction; Qwen recommend writing one per task (in English, even for multilingual data) and report typical gains of 1–5%. See <a href=\"/guides/instruction-reranker.html\">instruction-following rerank</a>.":
    "<strong>适合：</strong>相关性需要按任务调整。这些模型可以接收任务指令；Qwen 建议为每个任务单独写指令（多语言数据也用英文写），并称通常能带来 1–5% 的提升。见<a href=\"/guides/instruction-reranker.html\">指令跟随重排序</a>。",
  "<strong>Maybe not:</strong> CPU-only or edge — prefer <a href=\"/models/bge-reranker.html\">bge-v2-m3</a>, mxbai, or Jina tiny for demos.":
    "<strong>不太适合：</strong>只有 CPU 或边缘设备 —— 优先考虑 <a href=\"/models/bge-reranker.html\">bge-v2-m3</a>、mxbai，演示用可选 Jina tiny。",
  "Apache 2.0 at every size, 0.6B to 8B":
    "从 0.6B 到 8B，每个尺寸都是 Apache 2.0",
  "100+ languages and a 32K context":
    "100+ 种语言，32K 上下文",
  "Takes a task instruction — the 4B has the best FollowIR score in Qwen’s table":
    "可接收任务指令 —— Qwen 的表里 4B 的 FollowIR 得分最高",
  "Loads directly with sentence-transformers’ <code>CrossEncoder</code>":
    "可直接用 sentence-transformers 的 <code>CrossEncoder</code> 加载",
  "Zero per-call cost once self-hosted":
    "自建部署后没有按次调用成本",
  "GPU (or heavy quant) required for comfort":
    "想跑得顺畅需要 GPU（或重度量化）",
  "The raw <code>transformers</code> path needs Qwen’s exact prompt template":
    "直接用 <code>transformers</code> 时必须严格套用 Qwen 的提示模板",
  "Vendor numbers are MTEB-R, not BEIR":
    "厂商公布的是 MTEB-R，不是 BEIR",
  "Too large for our in-browser demo":
    "体量太大，无法放进本站的浏览器 Demo",
  "Parameters":
    "参数量",
  "Layers":
    "层数",
  "Best for":
    "最适合",
  "Model":
    "模型",
  "MTEB-R":
    "MTEB-R",
  "CMTEB-R":
    "CMTEB-R",
  "MMTEB-R":
    "MMTEB-R",
  "MLDR":
    "MLDR",
  "MTEB-Code":
    "MTEB-Code",
  "FollowIR":
    "FollowIR",
  "Apache 2.0":
    "Apache 2.0",
  "Instruction-aware":
    "支持指令",
  "Pros":
    "优点",
  "Cons":
    "缺点",
  "Quick start":
    "快速上手",
  "Model variants":
    "模型变体",
  "When to pick Qwen3":
    "什么时候选 Qwen3",
  "Pros and cons":
    "优缺点",
  "sentence-transformers":
    "sentence-transformers",
  "In a RAG pipeline":
    "在 RAG 流水线中",
  "<a href=\"#scores\">Scores, and whose they are</a>":
    "<a href=\"#scores\">分数，以及是谁测的</a>",
}};
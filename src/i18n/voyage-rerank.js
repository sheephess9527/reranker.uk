window.I18N_PAGE = { zh: {
  "What changed in rerank-3":
    "rerank-3 有哪些变化",
  "Voyage released <code>rerank-3</code> and <code>rerank-3-lite</code> on 30 September 2026 as a drop-in upgrade to the 2.5 series: same API, context length, instruction support and price, and relevance scores calibrated to match the 2.5 models, so thresholds you tuned on 2.5 should still hold. <code>rerank-2.5</code> remains available.":
    "Voyage 于 2026 年 9 月 30 日发布 <code>rerank-3</code> 和 <code>rerank-3-lite</code>，作为 2.5 系列的直接升级：API、上下文长度、指令支持和价格都不变，相关性分数也按 2.5 模型的分布校准过，所以在 2.5 上调好的阈值应该仍然适用。<code>rerank-2.5</code> 继续提供。",
  "<strong>Largest gains on long documents and code.</strong> On LongEmbed, <code>rerank-3</code> beats <code>rerank-2.5</code> by {{fact:voyage-rerank-3.longdoc_gain_vs_2_5}}; on Voyage’s code datasets the gain is about 2%.":
    "<strong>长文档和代码提升最大。</strong>在 LongEmbed 上，<code>rerank-3</code> 比 <code>rerank-2.5</code> 高 {{fact:voyage-rerank-3.longdoc_gain_vs_2_5}}；在 Voyage 的代码数据集上提升约 2%。",
  "<strong>Against other rerankers.</strong> Across Voyage’s 95-dataset suite (top 100 from four first-stage retrievers, NDCG@10), Voyage report <code>rerank-3</code> ahead of Cohere Rerank v4.0 Pro by {{fact:voyage-rerank-3.gain_vs_cohere_v4_pro}} and of Qwen3-Reranker-8B by {{fact:voyage-rerank-3.gain_vs_qwen3_8b}}.":
    "<strong>与其他重排序模型相比。</strong>在 Voyage 的 95 个数据集测试中（对四种第一阶段检索各自的前 100 条重排序，NDCG@10），Voyage 报告 <code>rerank-3</code> 比 Cohere Rerank v4.0 Pro 高 {{fact:voyage-rerank-3.gain_vs_cohere_v4_pro}}，比 Qwen3-Reranker-8B 高 {{fact:voyage-rerank-3.gain_vs_qwen3_8b}}。",
  "<strong><code>rerank-3-lite</code></strong> matches <code>rerank-2.5</code>’s quality at {{fact:voyage-rerank-3-lite.price_vs_2_5}} of its price, per Voyage.":
    "据 Voyage 称，<strong><code>rerank-3-lite</code></strong> 以 <code>rerank-2.5</code> {{fact:voyage-rerank-3-lite.price_vs_2_5}} 的价格达到了它的质量。",
  "These are Voyage’s own evaluations; no independent benchmark covers rerank-3 yet. Source: <a href=\"https://blog.voyageai.com/2026/09/30/rerank-3/\" rel=\"noopener noreferrer\">Voyage’s announcement</a>. Voyage also publish each model’s tokenizer — no weights — on Hugging Face, which you can use to count tokens locally before you’re billed for them.":
    "以上都是 Voyage 自己的评测，目前还没有独立基准测过 rerank-3。来源：<a href=\"https://blog.voyageai.com/2026/09/30/rerank-3/\" rel=\"noopener noreferrer\">Voyage 的发布公告</a>。Voyage 还在 Hugging Face 上公开了每个模型的分词器（不含模型权重），可以在被计费之前先在本地统计 token 数。",
  "Hosted API · Voyage AI · <time datetime=\"2026-09-18\">Updated 18 Sep 2026</time>":
    "托管 API · Voyage AI · <time datetime=\"2026-09-18\">更新于 2026 年 9 月 18 日</time>",
  "<code>rerank-3</code> / <code>rerank-3-lite</code>":
    "<code>rerank-3</code> / <code>rerank-3-lite</code>",
  "Preview; same context and price, carries the free-token grant":
    "预览版；上下文与价格相同，带免费 token 额度",
  "<code>rerank-3</code> / <code>rerank-3-lite</code> (preview)":
    "<code>rerank-3</code> / <code>rerank-3-lite</code>（预览版）",
  "Same rate; first 200M tokens per account free":
    "价格相同；每个账号前 2 亿 token 免费",
  "Voyage uses token-based pricing, which is cost-effective at high volume. The 200M free-token grant moved to the <code>rerank-3</code> preview generation — <code>rerank-2.5</code> and <code>rerank-2.5-lite</code> no longer include it. Check the Voyage AI website for current rates.":
    "Voyage 按 token 计费，用量越大越划算。2 亿免费 token 的额度已经转移到了 <code>rerank-3</code> 预览版这一代 —— <code>rerank-2.5</code> 与 <code>rerank-2.5-lite</code> 不再享有这个额度。请以 Voyage AI 官网当前费率为准。",
  "Preview <code>rerank-3</code> carries a 200M free-token grant":
    "预览版 <code>rerank-3</code> 带有 2 亿免费 token 额度",
  "Voyage rerank-2.5":
    "Voyage rerank-2.5",
  "Hosted API · Voyage AI · <time datetime=\"2026-08-11\">Updated 11 Aug 2026</time>":
    "托管 API · Voyage AI · <time datetime=\"2026-08-11\">更新于 2026 年 8 月 11 日</time>",
  "Voyage AI built their rerankers with a single goal: maximise retrieval precision. The current generation, <code>rerank-2.5</code> and <code>rerank-2.5-lite</code>, doubles the context window to 32,000 tokens and adds <strong>instruction following</strong> — you can shape what counts as relevant with a natural-language prompt instead of fine-tuning. Pricing is per token, which stays cheap when your passages are short.":
    "Voyage AI 做重排序器只有一个目标：把检索精度做到最高。当前一代 <code>rerank-2.5</code> 与 <code>rerank-2.5-lite</code> 把上下文窗口翻倍到 32,000 token，并加入了<strong>指令跟随</strong> —— 你可以用一句自然语言来定义什么算「相关」，而不必微调。计费按 token，段落较短时相当便宜。",
  "The 32K context window on the 2.5 models is large enough to rerank long legal, medical or financial documents without chunking them first. Instruction following is the more interesting change: a prompt such as <em>“prefer passages that cite a statute”</em> reshapes the ranking without any training data.":
    "2.5 系列的 32K 上下文足以直接重排长篇法律、医疗或金融文档，无需先切块。更有意思的变化是指令跟随：一句 <em>「优先引用了法条的段落」</em> 就能重塑排序，完全不需要训练数据。",
  "Current flagship; instruction following":
    "当前旗舰；支持指令跟随",
  "Same context and instructions, lower cost":
    "上下文与指令能力相同，成本更低",
  "Previous generation, still served":
    "上一代，仍在提供服务",
  "Free allowance":
    "免费额度",
  "First 200M tokens per account":
    "每个账号前 2 亿 token",
  "Batch API":
    "Batch API",
  "33% discount":
    "打 67 折",
  "32K token context — great for long documents":
    "32K token 上下文 —— 很适合长文档",
  "_title": "Voyage rerank-3：按 token 计费的重排序 API 评测 | reranker.uk",
  "_desc": "Voyage rerank-3 评测（2026 年 10 月）：rerank-3 与 rerank-3-lite，32K 上下文，按 token 计费并各送 2 亿免费 token；旧版 rerank-2.5 有何不同，Python 用法，以及为 RAG 加重排序的优缺点。",

  "<a href=\"/\">Home</a><span>/</span><a href=\"/models/\">Models</a><span>/</span>Voyage Rerank": "<a href=\"/\">首页</a><span>/</span><a href=\"/models/\">模型对比</a><span>/</span>Voyage Rerank",
  "Voyage Rerank": "Voyage Rerank",
  "Hosted API · Voyage AI": "托管 API · Voyage AI",
  "Voyage AI built their rerankers with a single goal: maximise retrieval precision. <code>voyage-rerank-2</code> consistently ranks among the highest on BEIR and MTEB retrieval tasks, and the company offers domain-specific variants for code and financial documents — a strong choice when generic quality isn't enough.": "Voyage AI 打造重排序器只有一个目标：把检索精度做到极致。<code>voyage-rerank-2</code> 在 BEIR 和 MTEB 检索任务上始终名列前茅，公司还为代码和金融文档提供面向特定领域的变体 —— 当通用质量不够用时，它是个强力选择。",

  "Available models": "可用模型",
  "Pricing": "价格",
  "Quick start": "快速上手",
  "Pros and cons": "优缺点",

  "Model": "模型",
  "Context": "上下文",
  "Best for": "最适合",
  "16K tokens": "16K token",
  "4K tokens": "4K token",
  "General-purpose flagship; top BEIR scores": "通用旗舰；顶级 BEIR 成绩",
  "Faster, lower cost; good quality": "更快、更省；质量不错",
  "Legacy lite model": "旧版轻量模型",
  "The 16K context window on <code>rerank-2</code> is notably large — useful for reranking long legal, medical or financial documents without chunking.": "<code>rerank-2</code> 的 16K 上下文窗口相当大 —— 适合在不分块的情况下重排长篇法律、医疗或金融文档。",

  "Price": "价格",
  "~$0.05 / 1M tokens": "约 $0.05 / 百万 token",
  "~$0.02 / 1M tokens": "约 $0.02 / 百万 token",
  "Free trial": "免费试用",
  "200M tokens included on sign-up": "注册即赠 2 亿 token",
  "Voyage uses token-based pricing, which is cost-effective at high volume. Check the Voyage AI website for current rates.": "Voyage 采用按 token 计费，在高流量下更具成本效益。当前费率请查阅 Voyage AI 官网。",

  "Python": "Python",
  "REST (curl)": "REST（curl）",
  "In a RAG pipeline": "在 RAG 流水线中",

  "Top-tier BEIR retrieval precision scores": "顶级的 BEIR 检索精度成绩",
  "16K token context — great for long documents": "16K token 上下文 —— 非常适合长文档",
  "Competitive token-based pricing": "有竞争力的按 token 计费",
  "200M free tokens on sign-up": "注册赠送 2 亿免费 token",
  "Works seamlessly with Voyage embeddings": "与 Voyage 的 embedding 无缝配合",
  "Clean Python SDK": "简洁的 Python SDK",
  "Hosted-only — no open weights": "仅托管 —— 没有开源权重",
  "Smaller community than Cohere or bge": "社区规模小于 Cohere 或 bge",
  "SDK is Python-only (REST for other languages)": "SDK 仅支持 Python（其他语言用 REST）",
  "No multilingual flagship (general model is multilingual but not marketed as such)": "没有多语言旗舰（通用模型支持多语言，但并未以此为卖点）",

  "See reranking in action": "看看重排序的实际效果",
  "Our demo runs a cross-encoder in your browser — no API key, no cost, same reranking logic.": "我们的 Demo 在你的浏览器里运行一个 cross-encoder —— 无 API 密钥、零成本，重排序逻辑完全相同。",
  "Open the demo →": "打开 Demo →",

  "bge-reranker": "bge-reranker",
  "Free, open-weight alternative.": "免费的开源权重替代品。",
  "Cohere Rerank": "Cohere Rerank",
  "Mature hosted API.": "成熟的托管 API。",
  "Jina Reranker": "Jina Reranker",
  "Open weights + hosted API.": "开源权重 + 托管 API。",
  "mxbai-rerank": "mxbai-rerank",
  "Apache 2.0 open weights, browser xsmall.": "Apache 2.0 开源权重，浏览器可跑 xsmall。",

  "Hosted API · Voyage AI · <time datetime=\"2026-06-21\">Updated 21 Jun 2026</time>": "托管 API · Voyage AI · <time datetime=\"2026-06-21\">更新于 2026 年 6 月 21 日</time>",
  "Hosted API": "托管 API",
  "High precision": "高精度",
  "Domain-specific variants": "领域专用变体",
  "On this page": "本页目录",
  "<a href=\"#models\">Available models</a>": "<a href=\"#models\">可用模型</a>",
  "<a href=\"#pricing\">Pricing</a>": "<a href=\"#pricing\">价格</a>",
  "<a href=\"#usage\">Quick start</a>": "<a href=\"#usage\">快速上手</a>",
  "<a href=\"#pros-cons\">Pros and cons</a>": "<a href=\"#pros-cons\">优缺点</a>",
  "Pros": "优点",
  "Cons": "缺点",
  "Other models": "其他模型",

  // Oct 2026: jina-reranker-v3.5, licences
  "Voyage AI’s current rerankers are <code>rerank-3</code>, which Voyage call their highest-accuracy model and recommend for most applications, and <code>rerank-3-lite</code>, tuned for latency. Both accept {{fact:voyage-rerank-3.context_tokens}} tokens of query plus document, and both are billed per token with {{fact:voyage-rerank-3.free_tokens}} free tokens per account. The previous <code>rerank-2.5</code> generation is still served at the same price — and it’s the one Voyage document for natural-language instructions and the Batch API.":
    "Voyage AI 当前的重排序模型是 <code>rerank-3</code> —— Voyage 称之为准确度最高、推荐大多数应用使用的模型 —— 以及为延迟优化的 <code>rerank-3-lite</code>。两者都支持 query 加文档共 {{fact:voyage-rerank-3.context_tokens}} token，都按 token 计费，每个账号各送 {{fact:voyage-rerank-3.free_tokens}} 免费 token。上一代 <code>rerank-2.5</code> 仍以相同价格提供 —— 而且 Voyage 文档里写明支持自然语言指令和 Batch API 的，正是它。",
  "Hosted API · Voyage AI · <time datetime=\"2026-10-05\">Updated 5 Oct 2026</time>":
    "托管 API · Voyage AI · <time datetime=\"2026-10-05\">更新于 2026 年 10 月 5 日</time>",
  "Highest accuracy; Voyage’s recommendation for most applications":
    "准确度最高；Voyage 推荐大多数应用使用",
  "Fast and cost-effective, for latency-sensitive use":
    "快速、经济，适合对延迟敏感的场景",
  "Older; instruction-following and multilingual, per Voyage’s docs":
    "旧版；Voyage 文档写明支持指令与多语言",
  "Older":
    "旧版",
  "Per request the query can be up to 8,000 tokens, the query plus any one document up to 32,000, with up to 1,000 documents and 600K tokens in total — counting the query once per document.":
    "每次请求：query 最多 8,000 token，query 加任一篇文档最多 32,000 token，文档最多 1,000 篇，总量最多 60 万 token —— query 按每篇文档各算一次。",
  "Instructions — a line such as <em>“prefer passages that cite a statute”</em> added to the query — reshape relevance without training data. Voyage introduced them with <code>rerank-2.5</code>, and their rerank-3 announcement says the Rerank 3 series keeps them: on the MAIR instruction-following benchmark, <code>rerank-3</code> scores on par with <code>rerank-2.5</code> in Voyage’s own test.":
    "指令 —— 例如在 query 里加一句<em>「优先选择引用了法条的段落」</em> —— 无需训练数据就能改变相关性判断。Voyage 从 <code>rerank-2.5</code> 开始支持指令，rerank-3 的发布公告说 Rerank 3 系列保留了这一能力：在 Voyage 自己的测试中，<code>rerank-3</code> 在指令跟随基准 MAIR 上与 <code>rerank-2.5</code> 持平。",
  "Billed tokens = query tokens × number of documents + all document tokens. At list price, 100 documents of 500 tokens each (query included) cost $0.0025 on <code>rerank-3</code> — Voyage’s own example, and exactly the price of one Cohere Rerank 4 Pro search. Voyage’s pricing page still says in one sentence that <code>rerank-2.5</code> includes free tokens, while its price table lists <code>rerank-2.5</code> under older models with none; we follow the table. Prices from <a href=\"https://docs.voyageai.com/docs/pricing\" rel=\"noopener noreferrer\">docs.voyageai.com/docs/pricing</a>, verified 1 October 2026 and re-checked daily by this site’s source check.":
    "计费 token = query token × 文档数 + 全部文档 token。按标价，100 篇各 500 token（含 query）的文档在 <code>rerank-3</code> 上花费 $0.0025 —— 这是 Voyage 自己举的例子，恰好等于 Cohere Rerank 4 Pro 一次检索的价格。Voyage 价格页里仍有一句话说 <code>rerank-2.5</code> 含免费 token，但同一页的价格表把 <code>rerank-2.5</code> 列在不送免费 token 的旧模型里；我们以价格表为准。价格取自 <a href=\"https://docs.voyageai.com/docs/pricing\" rel=\"noopener noreferrer\">docs.voyageai.com/docs/pricing</a>，2026 年 10 月 1 日核对，本站来源检查每天复核。",
  "<code>rerank-2.5</code> and <code>-lite</code>; free tokens don’t apply":
    "<code>rerank-2.5</code> 及其 <code>-lite</code>；不可使用免费 token",
  "Per 1M tokens":
    "每百万 token",
  "Free tokens":
    "免费 token",
  "None":
    "无",
  "{{fact:voyage-batch.discount}} off":
    "减 {{fact:voyage-batch.discount}}",
  "Per token":
    "按 token 计费",
  "32K context":
    "32K 上下文",
  "Context":
    "上下文",
  "Notes":
    "说明",
  "<code>rerank-3</code>: Voyage’s highest-accuracy reranker, 32K tokens per query–document pair":
    "<code>rerank-3</code>：Voyage 准确度最高的重排序模型，每对 query–文档 32K token",
  "Billed for exactly the tokens you send — cheap for short passages":
    "只按你实际发送的 token 计费 —— 段落短时很便宜",
  "{{fact:voyage-rerank-3.free_tokens}} free tokens per account on <code>rerank-3</code> and <code>-lite</code>":
    "<code>rerank-3</code> 和 <code>-lite</code> 每个账号各送 {{fact:voyage-rerank-3.free_tokens}} 免费 token",
  "Same API key and client as Voyage embeddings":
    "与 Voyage 向量模型共用同一个 API key 和客户端",
  "Python and TypeScript libraries, plus REST":
    "提供 Python 与 TypeScript 库，以及 REST 接口",
  "No open weights; private deployment goes through the AWS or Azure marketplace":
    "没有开源权重；私有部署需通过 AWS 或 Azure 应用市场",
  "The Batch discount is documented only for the older <code>rerank-2.5</code>":
    "Batch 折扣目前只在旧版 <code>rerank-2.5</code> 的文档中写明",
  "No published BEIR average — comparisons rest on Voyage’s own evaluations":
    "没有公布 BEIR 均值 —— 只能依据 Voyage 自己的评测来比较",
  "Smaller community than Cohere or bge":
    "社区规模小于 Cohere 或 bge",
}};

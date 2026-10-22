window.I18N_PAGE = { zh: {
  "_title":
    "Contextual AI Rerank v2：能跟随指令的重排序模型 | reranker.uk",
  "_desc":
    "Contextual AI Rerank v2 评测（2026 年 10 月）：能跟随指令的重排序模型，有非商用的开源权重（1B、2B、6B）和付费托管 API；怎么写指令、API 价格和限制，以及为什么这里没有可引用的分数。",
  "<a href=\"/\">Home</a><span>/</span><a href=\"/models/\">Models</a><span>/</span>Contextual AI Rerank":
    "<a href=\"/\">首页</a><span>/</span><a href=\"/models/\">模型对比</a><span>/</span>Contextual AI Rerank",
  "Open weights + hosted API · Contextual AI · <time datetime=\"2026-10-16\">Updated 16 Oct 2026</time>":
    "开源权重 + 托管 API · Contextual AI · <time datetime=\"2026-10-16\">更新于 2026 年 10 月 16 日</time>",
  "Instruction-following":
    "跟随指令",
  "Weights: non-commercial":
    "权重：仅限非商用",
  "Hosted API":
    "托管 API",
  "<strong>Contextual AI Rerank v2</strong> is built to take an instruction next to the query, such as “prioritise recent internal documents”, and rank by relevance first and the instruction second. It comes as open weights in three sizes (1B, 2B and 6B, 100+ languages, up to 32K tokens) under a non-commercial licence, and as a paid hosted API for commercial use.":
    "<strong>Contextual AI Rerank v2</strong> 的设计是在查询旁边再接收一条指令，比如“优先最近的内部文档”，先按相关性、再按指令排序。它有三种尺寸的开源权重（1B、2B、6B，支持 100 多种语言，最长 32K token），采用非商用许可；商用则有付费的托管 API。",
  "On this page":
    "本页目录",
  "Weights or API":
    "用权重还是用 API",
  "Route":
    "渠道",
  "Models":
    "模型",
  "Licence or price":
    "许可或价格",
  "Limits":
    "限制",
  "Open weights":
    "开源权重",
  "v2 in 1B, 2B and 6B sizes (for example <code>ctxl-rerank-v2-instruct-multilingual-2b</code>), plus quantised versions":
    "v2 有 1B、2B、6B 三种尺寸（例如 <code>ctxl-rerank-v2-instruct-multilingual-2b</code>），另有量化版本",
  "CC BY-NC-SA 4.0: non-commercial only":
    "CC BY-NC-SA 4.0：仅限非商用",
  "Up to 32K tokens":
    "最长 32K token",
  "Hosted API, v2":
    "托管 API：v2",
  "${{fact:contextual-rerank-api.v2_usd_per_m}} per 1M tokens":
    "每 100 万 token ${{fact:contextual-rerank-api.v2_usd_per_m}}",
  "{{fact:contextual-rerank-api.max_tokens_per_doc}} tokens for query, instruction and each document; {{fact:contextual-rerank-api.max_request_tokens}} per request":
    "查询、指令和每个文档合计 {{fact:contextual-rerank-api.max_tokens_per_doc}} token；每次请求 {{fact:contextual-rerank-api.max_request_tokens}} token",
  "Hosted API, v2-mini":
    "托管 API：v2-mini",
  "${{fact:contextual-rerank-api.v2_mini_usd_per_m}} per 1M tokens":
    "每 100 万 token ${{fact:contextual-rerank-api.v2_mini_usd_per_m}}",
  "The API also still serves the older <code>ctxl-rerank-v1-instruct</code>. Contextual doesn’t say which open-weight size the API’s v2 and v2-mini correspond to, so don’t assume a benchmark of one carries over to the other.":
    "API 也还提供较早的 <code>ctxl-rerank-v1-instruct</code>。Contextual 没有说明 API 的 v2 和 v2-mini 对应哪个尺寸的开源权重，所以别假设一边的评测结果能套用到另一边。",
  "Writing instructions":
    "怎么写指令",
  "Contextual evaluated instructions about four things: recency, document type, source and metadata. Some practical points from their documentation:":
    "Contextual 测试过四类指令：时效、文档类型、来源和元数据。他们文档里的几点实用建议：",
  "<strong>Relevance still comes first.</strong> The model ranks by relevance to the query and uses the instruction second, so an instruction won’t lift an off-topic document.":
    "<strong>相关性仍然排第一。</strong>模型先按与查询的相关性排序，再参考指令，所以指令救不回一篇离题的文档。",
  "<strong>Give a timeframe, not “this year”.</strong> The model doesn’t know today’s date, so name the dates or range you mean.":
    "<strong>写明时间范围，别写“今年”。</strong>模型不知道今天是哪天，所以要写出具体的日期或区间。",
  "<strong>Pass metadata with the document</strong> if the instruction depends on it (source, type, date); the API takes a <code>metadata</code> list alongside the documents.":
    "<strong>指令依赖元数据时，把元数据和文档一起传</strong>（来源、类型、日期）；API 在文档之外还接收一个 <code>metadata</code> 列表。",
  "For the general pattern and how to evaluate instruction rerankers, see <a href=\"/guides/instruction-reranker.html\">instruction-following rerank</a>.":
    "通用做法和怎么评测指令重排序，见<a href=\"/guides/instruction-reranker.html\">指令跟随重排序</a>。",
  "Quick start":
    "快速上手",
  "Open weights, with sentence-transformers":
    "开源权重，用 sentence-transformers",
  "The instruction goes in <code>prompt</code> and is optional. Scores are raw logits, higher meaning more relevant. For production serving the model card recommends vLLM.":
    "指令放在 <code>prompt</code> 里，可以不传。分数是原始 logit，越高越相关。生产环境部署时，模型卡推荐用 vLLM。",
  "Scores":
    "分数",
  "Contextual publish their benchmark results only as charts, in their <a href=\"https://contextual.ai/blog/rerank-v2\" rel=\"noopener noreferrer\">launch post</a>: instruction-following, question answering, BEIR, multilingual and product search, each plotted against price. There is no table to cite, so this site shows no number for it. They also released the three instruction-following datasets they used, so you can rerun that part yourself.":
    "Contextual 只在<a href=\"https://contextual.ai/blog/rerank-v2\" rel=\"noopener noreferrer\">发布文章</a>里用图表公布评测结果：指令跟随、问答、BEIR、多语言和商品搜索，每项都画成和价格的对比图。没有可以引用的表格，所以本站不给它标分数。他们也公开了所用的三个指令跟随数据集，这部分你可以自己重跑。",
  "When to pick Contextual AI":
    "什么时候选 Contextual AI",
  "<strong>Yes:</strong> ranking rules that a query alone can’t express, such as freshness, source priority or document type, especially when the rule changes per product surface.":
    "<strong>适合：</strong>光靠查询表达不了的排序规则，比如时效、来源优先级或文档类型，尤其是不同产品界面规则不同的时候。",
  "<strong>Yes:</strong> research or internal non-commercial use of open weights, with the instruction support included.":
    "<strong>适合：</strong>研究或内部非商用场景使用开源权重，同样支持指令。",
  "<strong>Check the licence:</strong> a commercial product has to use the hosted API, not the weights.":
    "<strong>先看许可：</strong>商业产品只能用托管 API，不能用权重。",
  "<strong>Maybe not:</strong> you need published numbers to compare against. Look at <a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a>, which also takes instructions and publishes FollowIR scores.":
    "<strong>可能不适合：</strong>你需要公开的数字来比较。可以看 <a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a>，它也支持指令，并且公布了 FollowIR 分数。",
  "Pros and cons":
    "优缺点",
  "Pros":
    "优点",
  "Instruction-following, with metadata passed alongside documents":
    "跟随指令，元数据可以随文档一起传",
  "100+ languages and up to 32K tokens":
    "100 多种语言，最长 32K token",
  "Three open sizes, plus quantised versions":
    "三种开源尺寸，另有量化版本",
  "Hosted API priced per token":
    "托管 API 按 token 计费",
  "Cons":
    "缺点",
  "Weights are non-commercial (CC BY-NC-SA 4.0)":
    "权重仅限非商用（CC BY-NC-SA 4.0）",
  "Benchmarks only as charts, no table":
    "评测只有图表，没有表格",
  "The API’s models aren’t mapped to the open sizes":
    "API 的模型没有对应到开源尺寸",
  "GPU required; too large for our in-browser demo":
    "需要 GPU；太大，放不进我们的浏览器内 Demo",
  "Test an instruction on your own data":
    "在自己的数据上试一条指令",
  "Rerank the same candidates with and without an instruction, on labelled queries, and check the instruction moves the documents you meant it to.":
    "用带标注的查询，对同一批候选分别加指令和不加指令重排，看指令是否把你想要的文档往前挪了。",
  "Instruction rerank guide →":
    "指令重排序指南 →",
  "All models →":
    "全部模型 →",
  "Other models":
    "其他模型",
  "Apache 2.0 and instruction-aware.":
    "Apache 2.0，支持指令。",
  "Hosted, takes instructions in the query.":
    "托管，指令写在查询里。",
  "Weights and API from ZeroEntropy.":
    "ZeroEntropy 的权重和 API。",
  "Hosted API, Pro and Fast.":
    "托管 API，分 Pro 和 Fast 两档。",
}};

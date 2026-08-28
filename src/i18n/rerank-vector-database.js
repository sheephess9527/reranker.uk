window.I18N_PAGE = { zh: {
  "_title": "为 pgvector、Qdrant、Elasticsearch 加上重排序 | reranker.uk",
  "_desc": "如何在向量数据库之上加一层重排序。「宽召回—打分—截断」模式，含 pgvector、Qdrant 与 Elasticsearch 的可用代码，以及 HNSW ef_search、过滤顺序等让重排序看起来没用的坑。",

  "<a href=\"/\">Home</a><span>/</span><a href=\"/guides/\">Guides</a><span>/</span>Rerank on a vector database":
    "<a href=\"/\">首页</a><span>/</span><a href=\"/guides/\">指南</a><span>/</span>在向量数据库上做重排序",
  "Adding a reranker to your vector database": "为你的向量数据库加上重排序",
  "Practical · ~10 min read · <time datetime=\"2026-08-25\">Updated 25 Aug 2026</time>":
    "实践 · 约 10 分钟阅读 · <time datetime=\"2026-08-25\">更新于 2026 年 8 月 25 日</time>",
  "Vector databases return neighbours, not answers. The rerank stage sits between the database and your prompt, and the integration is the same three lines everywhere: <strong>raise the limit, score the candidates, truncate</strong>. What changes per database is only how you ask for more rows and how you carry the payload back.":
    "向量数据库返回的是「邻居」，不是「答案」。重排序这一步位于数据库和 prompt 之间，而各家的接入方式其实是同样的三行：<strong>放大 limit、给候选打分、截断</strong>。数据库之间的差别，只在于怎么多要几行、以及怎么把 payload 带回来。",

  "On this page": "本页内容",
  "<a href=\"#pattern\">The pattern</a>": "<a href=\"#pattern\">通用模式</a>",
  "<a href=\"#pgvector\">pgvector (Postgres)</a>": "<a href=\"#pgvector\">pgvector（Postgres）</a>",
  "<a href=\"#qdrant\">Qdrant</a>": "<a href=\"#qdrant\">Qdrant</a>",
  "<a href=\"#elasticsearch\">Elasticsearch</a>": "<a href=\"#elasticsearch\">Elasticsearch</a>",
  "<a href=\"#builtin\">When the database reranks for you</a>": "<a href=\"#builtin\">当数据库自带重排序</a>",
  "<a href=\"#pitfalls\">Pitfalls</a>": "<a href=\"#pitfalls\">常见坑</a>",

  "The pattern": "通用模式",
  "Whatever the store, reranking changes your retrieval call in exactly one way — you ask for more rows than you intend to use:":
    "不管用哪个存储，加重排序对检索调用的改动只有一处 —— 你要的行数比实际要用的多：",
  "Two details matter more than the database choice. First, keep the <strong>original row objects</strong> through the rerank so you still have ids, metadata and permissions on the other side — reranking text alone and then trying to match it back by string is a reliable way to lose your primary keys. Second, the reranker sees only the text you hand it, so if your stored text is a heading-plus-body blob, that is what gets scored.":
    "有两个细节比选哪个数据库更重要。第一，让<strong>原始行对象</strong>贯穿整个重排序过程，这样排完之后 id、元数据和权限都还在 —— 只对文本重排、之后再靠字符串匹配找回来，是丢主键的可靠方式。第二，reranker 只看得到你递给它的文本，所以如果你存的是「标题+正文」拼在一起的大块，被打分的就是那一整块。",

  "pgvector (Postgres)": "pgvector（Postgres）",
  "pgvector returns rows ordered by distance. You raise the <code>LIMIT</code>, keep the ids, and rank in the application layer:":
    "pgvector 按距离排序返回行。你只需放大 <code>LIMIT</code>、保留 id，然后在应用层排序：",
  "<code>&lt;=&gt;</code> is cosine distance; use <code>&lt;-&gt;</code> for L2 or <code>&lt;#&gt;</code> for inner product, matching whatever your index was built with. Note that raising the limit from 5 to 50 interacts with your index settings — with HNSW you may need <code>SET LOCAL hnsw.ef_search</code> above the default so the index actually considers enough neighbours to return 50 good ones. A limit larger than <code>ef_search</code> silently gives you padding rather than candidates, which looks exactly like <a href=\"/guides/reranking-not-working.html\">a reranker that does not help</a>.":
    "<code>&lt;=&gt;</code> 是余弦距离；L2 用 <code>&lt;-&gt;</code>，内积用 <code>&lt;#&gt;</code>，与建索引时用的保持一致。注意把 limit 从 5 提到 50 会和索引配置相互影响 —— 用 HNSW 时可能需要把 <code>SET LOCAL hnsw.ef_search</code> 调到默认值以上，索引才会真的考察足够多的邻居、返回 50 条像样的候选。limit 大于 <code>ef_search</code> 时，你拿到的会是凑数而非候选，而这看起来和<a href=\"/guides/reranking-not-working.html\">「reranker 没起作用」</a>一模一样。",

  "Qdrant": "Qdrant",
  "Same shape, with the payload carried along so you do not lose metadata:":
    "结构一样，把 payload 一起带上，避免丢元数据：",
  "If you filter by tenant, permission or date, apply that filter in the <code>query_points</code> call rather than after reranking. Filtering afterwards means you paid to score rows you then threw away, and your 50 candidates might collapse to 3.":
    "如果你按租户、权限或日期过滤，请把过滤放进 <code>query_points</code> 调用里，而不是重排之后再过滤。放在后面意味着你花钱给一批马上要丢掉的行打了分，而且 50 个候选可能塌缩到只剩 3 个。",

  "Elasticsearch": "Elasticsearch",
  "Elasticsearch is where reranking pays off most visibly, because you can feed it a <a href=\"/guides/hybrid-retrieval-rerank.html\">hybrid</a> candidate set — BM25 and vectors fail on different queries, and the cross-encoder sorts out the union:":
    "Elasticsearch 上重排序的收益最直观，因为你可以喂给它一个<a href=\"/guides/hybrid-retrieval-rerank.html\">混合</a>候选集 —— BM25 和向量在不同查询上各自失手，而 cross-encoder 负责把两者的并集理顺：",
  "The BM25 and kNN scores are on different scales and are not meaningfully comparable, which is the usual argument for reciprocal rank fusion. A cross-encoder sidesteps that problem entirely: it re-scores every candidate on one scale of its own, so how the candidate got into the pool stops mattering.":
    "BM25 分数和 kNN 分数量纲不同、没有可比性，这正是通常要用 RRF（倒数排名融合）的理由。cross-encoder 则直接绕开了这个问题：它用自己的一套尺度给每个候选重新打分，于是候选是怎么进池子的就不再重要了。",

  "When the database reranks for you": "当数据库自带重排序",
  "Several stores now offer a rerank step inside the query — as a managed integration with a hosted model, or as a native second stage. Using it is a reasonable default, and it saves you a network hop and a chunk of glue code.":
    "现在有几家存储支持在查询内部完成重排序 —— 或是与托管模型的托管式集成，或是原生的第二阶段。用它是个合理的默认选择，能省掉一次网络往返和一堆胶水代码。",
  "What you trade away is worth knowing before you commit:": "但在投入之前，值得知道你让渡了什么：",
  "<strong>Model choice</strong> narrows to what the vendor integrates, which may not include the model that wins on your domain.":
    "<strong>模型选择</strong>被限制在厂商已集成的范围内，而在你的领域表现最好的那个未必在列。",
  "<strong>Evaluation gets harder</strong> — it is more work to A/B two rerankers when one of them lives inside the query engine.":
    "<strong>评测变难</strong> —— 当其中一个 reranker 住在查询引擎内部时，做 A/B 对比要费更多力气。",
  "<strong>Your API key</strong> and your passages now flow through the database vendor as well as the model vendor.":
    "<strong>你的 API 密钥</strong>和段落内容，现在除了模型厂商，还会流经数据库厂商。",
  "The application-layer pattern above stays portable across all of them, so it is a sound place to start even if you later move the stage into the database. Check your store's current documentation for what it supports — this area moves quickly, and we deliberately do not maintain a per-vendor feature matrix we cannot keep accurate.":
    "上面这套应用层写法在各家之间都是可移植的，所以即便你之后打算把这一步挪进数据库，从它起步也很稳妥。具体支持情况请查阅你所用存储的最新文档 —— 这块变化很快，我们刻意不去维护一张自己没把握保持准确的厂商功能对照表。",

  "Pitfalls": "常见坑",
  "Symptom": "现象",
  "Cause": "原因",
  "Fix": "解法",
  "No quality change": "质量没变化",
  "Candidate pool as small as the kept set": "候选池和保留集一样大",
  "Retrieve 5–10× what you keep": "召回量取保留量的 5–10 倍",
  "Latency spike at high k": "k 大时延迟飙升",
  "Cross-encoder cost is linear in candidates": "cross-encoder 开销与候选数成正比",
  "Lower k, or batch and cap concurrency": "降低 k，或做批处理并限制并发",
  "Results miss recent docs": "结果里没有新文档",
  "Filters applied after reranking": "过滤放在了重排序之后",
  "Filter in the database query": "把过滤放进数据库查询里",
  "Scores look random": "分数看起来是随机的",
  "Passages truncated at the token limit": "段落在 token 上限处被截断",
  "Smaller chunks, or a long-context model": "改小分块，或换长上下文模型",
  "Lost ids or permissions": "id 或权限丢失",
  "Reranked bare strings": "只对纯字符串做了重排",
  "Carry row objects through the sort": "让行对象贯穿整个排序过程",
  "Cross-encoder cost scales linearly with the candidate count, so going from 50 to 200 roughly quadruples the rerank latency and, on a hosted API, the bill. The <a href=\"/rerank-cost-calculator.html\">cost calculator</a> puts numbers on the second half of that.":
    "cross-encoder 的开销与候选数量线性相关，所以从 50 提到 200，重排延迟大致翻两番，用托管 API 的话账单也一样。后半句的具体数字可以用<a href=\"/rerank-cost-calculator.html\">成本计算器</a>算出来。",

  "See the reordering before you wire it up": "接进去之前，先看看它是怎么重排的",
  "Paste candidates straight out of your store and watch a cross-encoder re-score them in the browser.":
    "直接从你的存储里粘出候选，在浏览器里看 cross-encoder 给它们重新打分。",
  "Open the live demo →": "打开在线 Demo →",
  "Keep reading": "继续阅读",
  "How to add reranking to RAG": "如何为 RAG 加上重排序",
  "The full pipeline, with top-k tips and latency trade-offs.": "完整流水线，含 top-k 取值建议与延迟取舍。",
  "Reranking didn't help": "重排序没起作用",
  "Seven reasons you see no lift, and how to tell which one you have.": "看不到提升的七个原因，以及如何判断你属于哪一种。"
} };

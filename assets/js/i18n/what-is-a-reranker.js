window.I18N_PAGE = { zh: {
  "_title": "什么是 reranker？rerank 模型通俗指南 | reranker.uk",
  "_desc": "什么是 reranker？重排序器（rerank 模型）会按相关性对检索到的候选重新打分，通常作为快速检索之后的第二阶段。了解 reranker 的工作原理、它如何提升搜索与 RAG 质量，以及何时该用它。",

  "<a href=\"/\">Home</a><span>/</span><a href=\"/guides/what-is-a-reranker.html\">Guides</a><span>/</span>What is a reranker": "<a href=\"/\">首页</a><span>/</span><a href=\"/guides/what-is-a-reranker.html\">指南</a><span>/</span>什么是 reranker",
  "What is a reranker?": "什么是 reranker？",
  "Fundamentals · ~7 min read": "基础概念 · 约 7 分钟阅读",
  "A <strong>reranker</strong> is a model that takes a query and a list of candidate documents and reorders them by how relevant each one actually is to the query. It almost always runs as a <em>second stage</em>: something fast retrieves a broad set of candidates, then the reranker carefully re-scores the top of that list.": "<strong>重排序器（reranker）</strong>是一个模型：它接收一个查询和一组候选文档，并根据每个文档与查询的真实相关性重新排序。它几乎总是作为<em>第二阶段</em>运行：先由某种快速方法召回一大批候选，再由 reranker 仔细地对这批候选的头部重新打分。",

  "Why ranking order is a problem": "为什么排序顺序是个问题",
  "The two-stage retrieval pattern": "两阶段检索范式",
  "How a rerank model scores relevance": "rerank 模型如何为相关性打分",
  "When you should (and shouldn’t) rerank": "什么时候该（以及不该）做重排序",
  "Try it yourself": "亲自上手试试",

  "Modern search and <a href=\"/guides/rerank-rag.html\">retrieval-augmented generation (RAG)</a> usually start with a vector database. You embed your documents once, embed the query at request time, and fetch the nearest neighbours by cosine similarity. This is fast and scales to millions of documents — but the <strong>ordering it produces is only roughly right</strong>.": "现代搜索与 <a href=\"/guides/rerank-rag.html\">检索增强生成（RAG）</a>通常都从一个向量数据库开始。你先对文档做一次嵌入，在请求时对查询做嵌入，再用余弦相似度取出最近邻。这很快，也能扩展到数百万文档 —— 但它<strong>给出的排序只是大致正确</strong>。",
  "The reason is structural. To stay fast, the retriever embeds the query and each document <em>independently</em>, with no chance for the two texts to interact. A passage that merely shares vocabulary with the query can score as highly as one that genuinely answers it. So the correct document is often <em>in</em> the top 50 — just not at position 1, 2 or 3, which is exactly where it needs to be when you only feed a few passages to an LLM.": "原因是结构性的。为了保持快速，检索器会<em>独立地</em>对查询和每个文档做嵌入，两段文本没有机会相互作用。一段只是与查询共享词汇的文本，得分可能和真正回答了问题的文本一样高。于是正确的文档常常确实<em>在</em>前 50 名里 —— 只是不在第 1、2、3 名，而当你只把少数几段送进 LLM 时，恰恰需要它排在最前面。",
  "Retrieval is good at <em>recall</em> (“is the answer somewhere in the shortlist?”). It’s mediocre at <em>precision</em> (“is the answer at the very top?”). Reranking fixes precision.": "检索擅长 <em>recall（召回）</em>（“答案是否在候选名单里？”），但在 <em>precision（精度）</em>上表现平平（“答案是否就排在最前？”）。重排序正是用来修复精度的。",

  "Rerankers exist because of a speed-versus-accuracy trade-off. The accurate way to compare a query and a document is to run them through a model <em>together</em> — but doing that against every document in your corpus would be impossibly slow. So we split the work:": "reranker 之所以存在，是因为速度与准确性之间的取舍。比较查询与文档的准确做法，是把它们<em>一起</em>送进模型 —— 但对语料库里的每一个文档都这么做会慢到不可行。于是我们把工作拆开：",
  "The retriever casts a wide net cheaply; the reranker applies an expensive, accurate model only to the handful of candidates that survived. You get most of the quality of running the big model everywhere, at a tiny fraction of the cost.": "检索器以很低的成本撒一张大网；reranker 只对幸存下来的少数候选施加一个昂贵而准确的模型。你以极小的代价，获得了在所有文档上都跑大模型才能得到的大部分质量。",

  "Most rerankers are <strong>cross-encoders</strong>. The query and a candidate document are concatenated into a single input and passed through a transformer, which outputs one number: a relevance score. Because every token of the query can attend to every token of the document, the model can judge things a similarity score can’t — negation, specificity, whether the passage truly answers the question rather than just mentioning the topic.": "大多数 reranker 是 <strong>cross-encoder</strong>。查询和候选文档被拼接成单一输入，送入一个 transformer，输出一个数字：相关性分数。由于查询的每个 token 都能注意（attend）到文档的每个 token，模型能判断相似度分数无法判断的东西 —— 否定、具体性，以及这段文本是真正回答了问题，还是仅仅提到了话题。",
  "You run this once per candidate, then sort by score. The output is typically turned into a 0–1 value (via a sigmoid) so it’s easy to threshold or display.": "你对每个候选跑一次，然后按分数排序。输出通常会（通过 sigmoid）转成 0–1 的数值，便于设阈值或展示。",
  "<strong>The key contrast:</strong> a <a href=\"/guides/cross-encoder-vs-bi-encoder.html\">bi-encoder</a> embeds query and document separately and compares vectors — fast, but coarse. A cross-encoder reads them together and scores the pair — slow per item, but far more accurate. Rerankers are the cross-encoders you apply to a short list.": "<strong>关键对比：</strong><a href=\"/guides/cross-encoder-vs-bi-encoder.html\">bi-encoder</a> 分别嵌入查询和文档再比较向量 —— 快，但粗糙。cross-encoder 把两者一起读入并对这一对打分 —— 单条慢，但准确得多。reranker 就是你施加在一个短名单上的 cross-encoder。",

  "<strong>Reranking pays off when:</strong>": "<strong>以下情况，重排序很值得：</strong>",
  "You feed retrieved context to an LLM and want the most relevant passages first (classic RAG).": "你把检索到的上下文喂给 LLM，并希望最相关的段落排在最前（经典 RAG）。",
  "Your top-k looks “mostly right but mis-ordered”, or the right answer is in the top 50 but not the top 5.": "你的 top-k 看起来“大体正确但顺序不对”，或者正确答案在前 50 名里却不在前 5 名。",
  "You can afford ~tens of milliseconds of extra latency for a meaningful jump in answer quality.": "你能接受多花约几十毫秒的延迟，换取答案质量的明显提升。",
  "You want to send <em>fewer</em> passages to the LLM (cheaper prompts) without losing the good one.": "你想给 LLM 送<em>更少</em>的段落（更便宜的 prompt），又不想漏掉那段好的。",
  "<strong>It’s less useful when:</strong>": "<strong>以下情况，它用处不大：</strong>",
  "Your retriever already returns near-perfect ordering for your domain.": "在你的领域里，检索器返回的排序已经近乎完美。",
  "You’re extremely latency-bound and can’t add a second model call.": "你对延迟极度敏感，无法再加一次模型调用。",
  "Your candidate set is tiny (rerank 3 items and there’s little to reorder).": "你的候选集合非常小（只有 3 条可重排，几乎没什么可调整的）。",

  "The fastest way to build intuition is to watch a reranker work. Our <a href=\"/demo.html\">in-browser demo</a> loads a real cross-encoder and scores your own query against passages you paste — entirely on your device, no API key, no cost. Drop in a couple of off-topic lines and watch them sink.": "建立直觉最快的方式，就是亲眼看 reranker 工作。我们的<a href=\"/demo.html\">浏览器内 Demo</a> 会加载一个真实的 cross-encoder，对你粘贴的段落按你的查询打分 —— 全程在你的设备上，无需 API 密钥、零成本。放进几段跑题的文字，看它们沉下去。",
  "See a reranker reorder text live": "实时看 reranker 重新排列文本",
  "No setup. A cross-encoder runs in your browser and re-scores passages in milliseconds.": "无需任何配置。一个 cross-encoder 在你的浏览器里运行，毫秒间为段落重新打分。",
  "Open the live demo →": "打开在线 Demo →",

  "Cross-encoder vs bi-encoder": "Cross-encoder vs bi-encoder",
  "The architecture behind the speed/accuracy trade-off.": "速度／准确性取舍背后的架构。",
  "How to add reranking to RAG": "如何为 RAG 加重排序",
  "A practical, code-level walkthrough.": "一份贴近代码的实操讲解。"
}};

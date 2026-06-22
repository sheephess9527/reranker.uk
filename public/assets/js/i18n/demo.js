window.I18N_PAGE = { zh: {
  "_title": "在线重排序 Demo — 浏览器里的 cross-encoder 重排序 | reranker.uk",
  "_desc": "在浏览器里实时体验 rerank 模型。粘贴查询和候选段落，cross-encoder 会实时打分并重新排序 —— 100% 在客户端用 transformers.js 运行，无需 API 密钥、零成本。",

  "100% in your browser": "100% 在你的浏览器中运行",
  "Live reranking demo": "在线重排序 Demo",
  "Paste a query and a few candidate passages. A real cross-encoder scores every pair and reorders them — running entirely on your device. The first run downloads the model (then it’s cached); after that, scoring is near-instant.": "粘贴一个查询和几段候选文本。一个真实的 cross-encoder 会对每一对打分并重新排序 —— 全程在你的设备上运行。首次运行会下载模型（之后即缓存）；此后打分几乎是瞬时的。",

  "Rerank model <span class=\"hint\">— downloaded once, cached in your browser</span>": "重排序模型 <span class=\"hint\">— 仅下载一次，缓存在你的浏览器中</span>",
  "Query": "查询（Query）",
  "Candidate passages <span class=\"hint\">— one per line</span>": "候选段落 <span class=\"hint\">— 每行一段</span>",
  "Rerank": "重排序",
  "Load sample": "载入示例",

  "Reranked results": "重排序结果",
  "Sorted by relevance score (higher = more relevant). The badge shows each passage’s original input position.": "按相关性分数排序（越高越相关）。标签显示每段文本在输入中的原始位置。",
  "<strong>Privacy &amp; cost:</strong> everything here runs locally with <a href=\"https://github.com/huggingface/transformers.js\" rel=\"noopener\">transformers.js</a> on ONNX Runtime Web. Your query and passages never leave the browser, there’s no API key, and there’s no per-call cost — which is exactly why this page can be free and abuse-proof.": "<strong>隐私与成本：</strong>这里的一切都通过 <a href=\"https://github.com/huggingface/transformers.js\" rel=\"noopener\">transformers.js</a> 在 ONNX Runtime Web 上本地运行。你的查询和段落不会离开浏览器，没有 API 密钥，也没有按次计费 —— 这正是本页能够免费且天然防滥用的原因。",

  "How this demo works": "这个 Demo 的工作原理",
  "The model is a <strong>cross-encoder</strong>: instead of embedding the query and each passage separately, it feeds the pair <code>(query, passage)</code> through the network together and outputs a single relevance score. Because the two texts attend to each other directly, the score is far more precise than cosine similarity between independent embeddings — at the cost of one model call per candidate.": "这个模型是一个 <strong>cross-encoder</strong>：它不会分别对查询和每段文本做嵌入，而是把 <code>(query, passage)</code> 这一对一起送入网络，输出一个相关性分数。由于两段文本可以直接相互注意（attend），这个分数远比对独立嵌入做余弦相似度要精确 —— 代价是每个候选都要跑一次模型。",
  "Your query is paired with every candidate passage.": "你的查询会与每一段候选文本配对。",
  "Each pair is tokenised and run through the cross-encoder.": "每一对都会被分词并送入 cross-encoder。",
  "The output logit is squashed to a 0–1 relevance score.": "输出的 logit 会被压缩成 0–1 的相关性分数。",
  "Passages are sorted by score; you see how the order changes versus the input.": "段落按分数排序；你能看到顺序相对输入发生了怎样的变化。",
  "That’s the same operation you’d run as the second stage of a <a href=\"/guides/rerank-rag.html\">RAG pipeline</a> — only here it happens in a browser tab instead of behind an API.": "这正是你在 <a href=\"/guides/rerank-rag.html\">RAG 流水线</a> 第二阶段会做的操作 —— 只不过这里发生在浏览器标签页里，而不是某个 API 背后。",
  "<strong>Tips:</strong> include a couple of clearly off-topic lines (the sample has “London” and “bananas”) to watch them sink to the bottom. Try rephrasing the query to see scores shift. First load is slower because of the model download; subsequent runs reuse the cached weights.": "<strong>小提示：</strong>加入几段明显跑题的文本（示例里有“伦敦”和“香蕉”），看它们沉到最底部。试着改写查询，观察分数如何变化。首次加载较慢是因为要下载模型；之后的运行会复用缓存的权重。",
  "Read: what is a reranker? →": "阅读：什么是 reranker？→"
}};

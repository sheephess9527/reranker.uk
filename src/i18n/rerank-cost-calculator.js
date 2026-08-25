window.I18N_PAGE = { zh: {
  "_title": "重排序成本计算器 —— Cohere 与 Voyage 价格对比 | reranker.uk",
  "_desc": "估算重排序每月要花多少钱。Cohere Rerank 4 按次检索计费，Voyage rerank-2.5 按 token 计费，所以哪家更便宜会随段落长度和 top-k 翻转。输入你自己的量级来对比。",

  "<a href=\"/\">Home</a><span>/</span>Rerank cost calculator":
    "<a href=\"/\">首页</a><span>/</span>重排序成本计算器",
  "Rerank cost calculator": "重排序成本计算器",
  "Tool · <time datetime=\"2026-08-14\">Updated 14 Aug 2026</time>":
    "工具 · <time datetime=\"2026-08-14\">更新于 2026 年 8 月 14 日</time>",
  "Hosted rerankers do not bill the same way. Cohere charges per <strong>search</strong> — one query plus up to 100 documents, whatever their length. Voyage charges per <strong>token</strong>. So the cheaper vendor flips depending on how long your passages are and how many you rerank. Put your own numbers in.":
    "托管重排序服务的计费方式并不相同。Cohere 按<strong>次检索</strong>收费 —— 一个 query 加最多 100 篇文档，与长度无关；Voyage 则按 <strong>token</strong> 收费。因此哪家更便宜，取决于你的段落有多长、一次重排多少条。把你自己的数字填进去看看。",

  "Your workload": "你的负载",
  "Queries per month <span class=\"hint\">how many searches your app runs</span>":
    "每月查询次数 <span class=\"hint\">你的应用会跑多少次检索</span>",
  "Candidates reranked per query <span class=\"hint\">the top-k you send to the reranker</span>":
    "每次查询重排的候选数 <span class=\"hint\">送进重排序器的 top-k</span>",
  "Average tokens per passage <span class=\"hint\">a 400-word chunk is roughly 550 tokens</span>":
    "每段平均 token 数 <span class=\"hint\">400 词左右的分块约合 550 token</span>",
  "Average tokens per query": "每次查询的平均 token 数",

  "Monthly cost": "每月成本",
  "Option": "方案",
  "Billing unit": "计费单位",
  "Billable volume": "计费量",

  "Why the ranking changes": "为什么排名会变",
  "Per-search pricing is indifferent to passage length: reranking 50 chunks of 80 tokens costs exactly what 50 chunks of 800 tokens costs. Per-token pricing scales with everything you send. That gives a simple rule of thumb:":
    "按次计费对段落长度不敏感：重排 50 段 80 token 的内容，和重排 50 段 800 token 的内容价格完全一样。按 token 计费则随你发送的全部内容线性增长。由此可得一条简单经验：",
  "<strong>Short passages, large top-k</strong> — per-token billing tends to win, because you are paying for very little text.":
    "<strong>段落短、top-k 大</strong> —— 按 token 计费通常更划算，因为你实际付费的文本很少。",
  "<strong>Long passages</strong> — per-search billing tends to win, and its advantage grows with every extra token in the chunk.":
    "<strong>段落长</strong> —— 按次计费通常更划算，而且分块每多一个 token，这个优势就更大一分。",
  "<strong>Top-k above 100</strong> — Cohere starts a second billable search per query, so cost steps up rather than sliding.":
    "<strong>top-k 超过 100</strong> —— Cohere 每次查询会多计一次检索，成本是阶梯式跳升而非平滑上升。",
  "<strong>Breakeven:</strong> <span id=\"calc-breakeven\">—</span>":
    "<strong>盈亏平衡点：</strong><span id=\"calc-breakeven\">—</span>",

  "What about self-hosting?": "那自托管呢？",
  "Self-hosting has no per-call price, so it does not belong in the table above — you trade a usage bill for a GPU bill plus operations. The comparison only becomes meaningful at your own volume: divide your monthly GPU cost by the number of queries above and compare that to the per-query figures in the table. Below a few hundred thousand queries a month an API is usually cheaper than a dedicated GPU; well above that, self-hosting a <a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a> or <a href=\"/models/bge-reranker.html\">bge-reranker-v2-m3</a> starts to pay off. Our <a href=\"/guides/self-host-reranker.html\">self-hosting guide</a> covers the serving side.":
    "自托管没有按调用计的价格，所以它不适合放进上面的表里 —— 你是用 GPU 账单加运维成本换掉了用量账单。只有放到你自己的量级上比较才有意义：把每月 GPU 成本除以上面的查询次数，再和表中的每次查询成本对比。每月几十万次查询以下，API 通常比一块专属 GPU 便宜；远高于这个量级后，自托管 <a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a> 或 <a href=\"/models/bge-reranker.html\">bge-reranker-v2-m3</a> 才开始划算。服务端怎么搭见我们的<a href=\"/guides/self-host-reranker.html\">自托管指南</a>。",
  "Note that a smaller model is not automatically a worse one — <a href=\"/models/jina-reranker.html\">Jina Reranker v3</a> reaches 61.94 BEIR nDCG@10 at 0.6B, so the cheapest thing to serve may also be the most accurate.":
    "另外，模型小并不等于差 —— <a href=\"/models/jina-reranker.html\">Jina Reranker v3</a> 以 0.6B 的体量拿到 61.94 的 BEIR nDCG@10，所以最省资源的那个，可能同时也是最准的那个。",

  "Assumptions and sources": "假设与来源",
  "<strong>Cohere Rerank 4</strong> — $0.0025 per search (Pro) and $0.002 per search (Fast), where a search is one query plus up to 100 documents. More than 100 candidates bills as multiple searches.":
    "<strong>Cohere Rerank 4</strong> —— Pro 每次检索 $0.0025，Fast 每次检索 $0.002；一次检索指一个 query 加最多 100 篇文档。候选超过 100 会按多次检索计费。",
  "<strong>Voyage rerank-2.5</strong> — $0.05 per 1M tokens, and $0.02 per 1M tokens for <code>rerank-2.5-lite</code>. Billable tokens are the query plus every document you send. The first 200M tokens per account are free and the Batch API is discounted 33%; neither is applied above.":
    "<strong>Voyage rerank-2.5</strong> —— 每 100 万 token $0.05，<code>rerank-2.5-lite</code> 每 100 万 token $0.02。计费 token 包括 query 和你发送的每一篇文档。每个账号前 2 亿 token 免费，Batch API 另有 33% 折扣；上表两者均未计入。",
  "Token counts are approximate — every vendor tokenises differently, and this page multiplies your averages rather than tokenising real text.":
    "token 数为近似值 —— 各家分词方式不同，本页是用你填的平均值相乘，而非对真实文本做分词。",
  "Rates verified August 2026. Check <a href=\"https://docs.cohere.com/docs/rerank-overview\" rel=\"noopener noreferrer\">Cohere</a> and <a href=\"https://docs.voyageai.com/docs/pricing\" rel=\"noopener noreferrer\">Voyage</a> for current pricing before committing to a budget.":
    "价格核对于 2026 年 8 月。做预算前请以 <a href=\"https://docs.cohere.com/docs/rerank-overview\" rel=\"noopener noreferrer\">Cohere</a> 与 <a href=\"https://docs.voyageai.com/docs/pricing\" rel=\"noopener noreferrer\">Voyage</a> 的最新价格为准。",

  "Cost is only half the decision": "成本只是决策的一半",
  "Quality is the other half. Run a cross-encoder against your own passages in the browser — no key, no spend.":
    "另一半是质量。在浏览器里拿你自己的段落跑一个 cross-encoder —— 无需密钥，零成本。",
  "Open the live demo →": "打开在线 Demo →",

  "Keep reading": "继续阅读",
  "Compare rerank models": "对比重排序模型",
  "Architecture, latency, languages and cost across 16 models.": "16 个模型的架构、延迟、语言与成本对比。",
  "Choose by scenario": "按场景选型",
  "Which reranker suits support, legal, code or multilingual search.": "客服、法律、代码或多语言检索各自适合哪种重排序器。"
} };

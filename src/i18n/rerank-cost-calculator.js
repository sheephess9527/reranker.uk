window.I18N_PAGE = { zh: {
  "Tool · <time datetime=\"2026-10-09\">Updated 9 Oct 2026</time>":
    "工具 · <time datetime=\"2026-10-09\">更新于 2026 年 10 月 9 日</time>",
  "<time datetime=\"2026-10-09\">Updated 9 Oct 2026</time>":
    "<time datetime=\"2026-10-09\">更新于 2026 年 10 月 9 日</time>",
  "Hosted rerankers do not bill the same way. Cohere charges per <strong>search</strong> — one query plus up to {{fact:cohere-rerank.docs_per_search}} documents, with any document over {{fact:cohere-rerank.billing_chunk_tokens}} tokens counted as several. Google charges per <strong>query</strong> of up to 100 documents, whatever their length. Voyage and Alibaba Cloud charge per <strong>token</strong>, and so do the yuan-priced services in mainland China. Which is cheapest depends on how your passages round. Put your own numbers in.":
    "托管重排序服务的计费方式各不相同。Cohere 按<strong>检索次数</strong>收费 —— 一次检索包含一个 query 和最多 {{fact:cohere-rerank.docs_per_search}} 篇文档，超过 {{fact:cohere-rerank.billing_chunk_tokens}} token 的文档按多篇计。Google 按<strong>查询次数</strong>收费，每次最多 100 篇文档，不管长短。Voyage 和阿里云按 <strong>token</strong> 收费，国内以人民币计价的服务也是如此。哪家最便宜取决于你的段落长度怎么取整。填入你自己的数字试试。",
  "Priced in yuan, for mainland China":
    "以人民币计价（中国大陆）",
  "Estimated monthly rerank cost in yuan for the workload entered above":
    "按上方负载估算的每月重排序费用（人民币）",
  "<strong>Google Vertex AI ranking</strong> — ${{fact:vertex-ai-ranking.usd_per_1000_queries}} per 1,000 queries; a query covers up to 100 documents, and each further 100 counts as another query (<a href=\"https://cloud.google.com/generative-ai-app-builder/pricing\" rel=\"noopener noreferrer\">Google’s pricing</a>). Passage length doesn’t change the price, but the models read only 1,024 tokens per record.":
    "<strong>Google Vertex AI 排序</strong> —— 每 1,000 次查询 ${{fact:vertex-ai-ranking.usd_per_1000_queries}}；一次查询最多 100 篇文档，每多 100 篇算一次查询（<a href=\"https://cloud.google.com/generative-ai-app-builder/pricing\" rel=\"noopener noreferrer\">Google 价格页</a>）。段落长短不影响价格，但模型每条记录只读 1,024 token。",
  "<strong>Alibaba Cloud Model Studio</strong> — qwen3-rerank at ${{fact:alibaba-model-studio-rerank.qwen3_rerank_usd_per_m}} per 1M input tokens internationally and ¥{{fact:alibaba-model-studio-rerank.qwen3_rerank_cny_per_m}} in the Beijing region, where qwen3.7-text-rerank costs the same (<a href=\"https://help.aliyun.com/zh/model-studio/model-pricing\" rel=\"noopener noreferrer\">price list</a>). Alibaba bills input tokens and caps a request at query tokens × documents + document tokens, so this page counts tokens the way it does for Voyage. qwen3-rerank rejects any single document over 4,000 tokens rather than truncating it.":
    "<strong>阿里云百炼</strong> —— qwen3-rerank 国际版每百万输入 token ${{fact:alibaba-model-studio-rerank.qwen3_rerank_usd_per_m}}，北京地域 ¥{{fact:alibaba-model-studio-rerank.qwen3_rerank_cny_per_m}}，qwen3.7-text-rerank 在北京地域同价（<a href=\"https://help.aliyun.com/zh/model-studio/model-pricing\" rel=\"noopener noreferrer\">价格页</a>）。阿里云按输入 token 计费，单次请求上限按 query token × 文档数 + 文档 token 总和计算，所以本页和 Voyage 用同一种方式数 token。qwen3-rerank 遇到单篇超过 4,000 token 的文档会直接报错，不会截断。",
  "<strong>SiliconFlow</strong> — bge-reranker-v2-m3 is listed free and its Pro tier at ¥{{fact:siliconflow-rerank.bge_v2_m3_pro_cny_per_m}} per 1M tokens (<a href=\"https://siliconflow.cn/pricing\" rel=\"noopener noreferrer\">price list</a>). SiliconFlow doesn’t say how it counts rerank tokens; this page assumes the same formula as Alibaba and Voyage. Its price list gives no price for the Qwen3-Reranker models it also serves.":
    "<strong>硅基流动</strong> —— 价格页上 bge-reranker-v2-m3 免费，Pro 版每百万 token ¥{{fact:siliconflow-rerank.bge_v2_m3_pro_cny_per_m}}（<a href=\"https://siliconflow.cn/pricing\" rel=\"noopener noreferrer\">价格页</a>）。硅基流动没有说明重排序怎么数 token，本页假定与阿里云、Voyage 的算法相同。它同时提供的 Qwen3-Reranker 在价格页上没有标价。",
  "Rates verified in October 2026 and re-checked daily against each vendor’s price page by this site’s source check. Confirm before committing to a budget.":
    "价格于 2026 年 10 月核对，本站的来源检查每天都会和各厂商的价格页重新核对。做预算前请再确认一次。",
  "Estimated monthly rerank cost by vendor for the workload entered above":
    "按上面填写的用量，估算各厂商每月的重排序费用",
  "Tool · <time datetime=\"2026-09-18\">Updated 18 Sep 2026</time>":
    "工具 · <time datetime=\"2026-09-18\">更新于 2026 年 9 月 18 日</time>",
  "<strong>A note on \"chunking\":</strong> some pricing write-ups claim Cohere splits any document over 500 tokens into multiple billable chunks. That is not correct for Rerank 4 — its context window is 32,768 tokens per document, and <code>max_chunks_per_doc</code> defaults to 1, so a normal RAG passage (a few hundred tokens) is never split. Chunking only kicks in for documents that individually exceed roughly 32.7K tokens, and only if you opt into it.":
    "<strong>关于「分块」的说明：</strong>有些价格分析文章声称 Cohere 会把超过 500 token 的文档拆成多个计费单元。这个说法对 Rerank 4 并不成立 —— 它每篇文档的上下文窗口是 32,768 token，且 <code>max_chunks_per_doc</code> 默认值为 1，所以一段普通的 RAG 段落（几百 token）根本不会被拆分。只有单篇文档本身超过约 32.7K token、且你主动开启该选项时，分块才会发生。",
  "<strong>Cohere Rerank 4</strong> — $0.0025 per search (Pro) and $0.002 per search (Fast), where a search is one query plus up to 100 documents. More than 100 candidates bills as multiple searches; so does a single document beyond the 32,768-token context window, though that is not a realistic case for RAG-sized passages.":
    "<strong>Cohere Rerank 4</strong> —— Pro 每次检索 $0.0025，Fast 每次检索 $0.002；一次检索指一个 query 加最多 100 篇文档。候选超过 100 篇会按多次检索计费；单篇文档超过 32,768 token 的上下文窗口同样会触发多次计费，不过对 RAG 场景的段落长度而言这基本不会发生。",
  "<strong>Voyage rerank-2.5</strong> — $0.05 per 1M tokens, and $0.02 per 1M tokens for <code>rerank-2.5-lite</code>. Billable tokens are the query counted once per document, plus every document token you send — so 50 candidates means the query is billed 50 times, not once. The 200M-free-token grant that rerank-2.5 launched with has since moved to the newer <code>rerank-3</code> preview generation; rerank-2.5/2.5-lite are no longer free for the first tokens. The Batch API is discounted 33%, not applied above.":
    "<strong>Voyage rerank-2.5</strong> —— 每 100 万 token $0.05，<code>rerank-2.5-lite</code> 每 100 万 token $0.02。计费 token 是「查询按每篇文档各计一次」再加上你发送的每篇文档本身的 token —— 也就是说 50 个候选意味着查询被计费 50 次，而不是 1 次。rerank-2.5 发布时带的那 2 亿免费 token 额度，后来已经转移到了更新的 <code>rerank-3</code> 预览版；rerank-2.5/2.5-lite 现在不再享有首批免费额度。Batch API 有 33% 折扣，上表未计入。",
  "Rates verified September 2026. Check <a href=\"https://docs.cohere.com/docs/rerank-overview\" rel=\"noopener noreferrer\">Cohere</a> and <a href=\"https://docs.voyageai.com/docs/pricing\" rel=\"noopener noreferrer\">Voyage</a> for current pricing before committing to a budget.":
    "价格核对于 2026 年 9 月。做预算前请以 <a href=\"https://docs.cohere.com/docs/rerank-overview\" rel=\"noopener noreferrer\">Cohere</a> 与 <a href=\"https://docs.voyageai.com/docs/pricing\" rel=\"noopener noreferrer\">Voyage</a> 的最新价格为准。",
  "_title": "重排序成本计算器 —— Cohere 与 Voyage 价格对比 | reranker.uk",
  "_desc": "估算重排序每月要花多少钱。Cohere Rerank 4 按次检索计费，长文档每 500 token 算一篇；Voyage rerank-3 按 token 计费。输入你自己的量级来对比。",

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
  "Note that a smaller model is not automatically a worse one — <a href=\"/models/jina-reranker.html\">Jina Reranker v3.5</a> reaches 63.20 BEIR nDCG@10 at 0.6B in Jina's own test, level with a 4B model, so the cheapest thing to serve may also be among the most accurate.":
    "另外，模型小并不等于差 —— <a href=\"/models/jina-reranker.html\">Jina Reranker v3.5</a> 以 0.6B 的体量，在 Jina 自己的测试里拿到 63.20 的 BEIR nDCG@10，与 4B 模型持平，所以最省资源的那个，也可能是最准的之一。",

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
  "Which reranker suits support, legal, code or multilingual search.": "客服、法律、代码或多语言检索各自适合哪种重排序器。",

  // Oct 2026: jina-reranker-v3.5, licences
  "<time datetime=\"2026-10-01\">Updated 1 Oct 2026</time>":
    "<time datetime=\"2026-10-01\">更新于 2026 年 10 月 1 日</time>",
  "Tool · <time datetime=\"2026-10-01\">Updated 1 Oct 2026</time>":
    "工具 · <time datetime=\"2026-10-01\">更新于 2026 年 10 月 1 日</time>",
  "Hosted rerankers do not bill the same way. Cohere charges per <strong>search</strong> — one query plus up to {{fact:cohere-rerank.docs_per_search}} documents, with any document over {{fact:cohere-rerank.billing_chunk_tokens}} tokens counted as several. Voyage charges per <strong>token</strong>. The two land closer than they look, and which is cheaper depends on how your passages round. Put your own numbers in.":
    "托管重排序服务的计费方式各不相同。Cohere 按<strong>检索次数</strong>计费 —— 一个 query 加最多 {{fact:cohere-rerank.docs_per_search}} 篇文档，超过 {{fact:cohere-rerank.billing_chunk_tokens}} token 的文档会被算作多篇。Voyage 按 <strong>token</strong> 计费。两者实际差距比看上去小，哪家更便宜取决于你的段落长度怎么取整。填入你自己的数字试试。",
  "Both vendors end up charging for text, but they round it differently. Cohere bills each candidate as one document per started {{fact:cohere-rerank.billing_chunk_tokens}} tokens — query included — and each search covers {{fact:cohere-rerank.docs_per_search}} documents. Voyage bills exactly the tokens you send, counting the query once per document.":
    "两家最终都是按文本量收费，只是取整方式不同。Cohere 把每个候选按「每满 {{fact:cohere-rerank.billing_chunk_tokens}} token 算一篇，不足也算」计费（query 计入在内），每次检索包含 {{fact:cohere-rerank.docs_per_search}} 篇文档。Voyage 只按你实际发送的 token 计费，query 按每篇文档各算一次。",
  "At list prices the two meet exactly: {{fact:cohere-rerank.billing_chunk_tokens}} tokens costs the same on Cohere Rerank 4 Pro (${{fact:cohere-rerank-4-pro.price_per_search}} per search of {{fact:cohere-rerank.docs_per_search}} documents) and Voyage rerank-3 (${{fact:voyage-rerank-3.price_per_m_tokens}} per 1M tokens) — Voyage’s own pricing page uses that very example. What separates them is rounding:":
    "按标价算，两家恰好在一个点上相等：{{fact:cohere-rerank.billing_chunk_tokens}} token 的文本，在 Cohere Rerank 4 Pro（每次检索 {{fact:cohere-rerank.docs_per_search}} 篇，${{fact:cohere-rerank-4-pro.price_per_search}}）和 Voyage rerank-3（每百万 token ${{fact:voyage-rerank-3.price_per_m_tokens}}）上花费完全相同 —— Voyage 自己的价格页用的就是这个例子。真正拉开差距的是取整：",
  "<strong>Short passages</strong> — Cohere still bills each one as a full document, so per-token billing wins, by more the shorter they are.":
    "<strong>段落较短</strong> —— Cohere 仍把每段按一整篇计费，所以按 token 计费更便宜，段落越短差得越多。",
  "<strong>Just past a {{fact:cohere-rerank.billing_chunk_tokens}}-token boundary</strong> — a 520-token candidate is two documents on Cohere; per-token billing costs about half.":
    "<strong>刚超过 {{fact:cohere-rerank.billing_chunk_tokens}} token 的边界</strong> —— 520 token 的候选在 Cohere 算两篇；按 token 计费只要大约一半的钱。",
  "<strong>Top-k that isn’t a multiple of {{fact:cohere-rerank.docs_per_search}}</strong> — Cohere rounds each query up to a whole search, so cost steps up rather than sliding.":
    "<strong>top-k 不是 {{fact:cohere-rerank.docs_per_search}} 的整数倍</strong> —— Cohere 会把每次查询向上取整到整次检索，所以成本是阶梯式上涨，而不是平滑变化。",
  "<strong>Cohere Fast vs Voyage rerank-3</strong> — Fast is cheaper only when query plus passage fills more than 80% of its last chunk. The <code>-lite</code> tier is cheaper than both on any workload.":
    "<strong>Cohere Fast 对比 Voyage rerank-3</strong> —— 只有当 query 加段落占满最后一块的 80% 以上时，Fast 才更便宜。<code>-lite</code> 档在任何负载下都比两者便宜。",
  "<strong>Correction, October 2026:</strong> until now this page said Cohere’s {{fact:cohere-rerank.billing_chunk_tokens}}-token splitting was a myth and that per-search pricing ignores passage length. Cohere’s own pricing FAQ says otherwise: a document over {{fact:cohere-rerank.billing_chunk_tokens}} tokens, counting the query, is split, and every chunk counts toward the {{fact:cohere-rerank.docs_per_search}} documents in a search. The calculator now models that, which removes the long-passage advantage the old version showed for Cohere.":
    "<strong>2026 年 10 月更正：</strong>此前本页说 Cohere 按 {{fact:cohere-rerank.billing_chunk_tokens}} token 拆分计费是误传，并称按次计费与段落长度无关。Cohere 自己的价格 FAQ 写的正相反：文档（连同 query）超过 {{fact:cohere-rerank.billing_chunk_tokens}} token 就会被拆分，每一块都计入每次检索的 {{fact:cohere-rerank.docs_per_search}} 篇文档。计算器现已按此建模，旧版里 Cohere 在长段落上的优势也随之消失。",
  "<strong>Your workload:</strong> <span id=\"calc-billing\">—</span>":
    "<strong>你的负载：</strong><span id=\"calc-billing\">—</span>",
  "<strong>Cohere Rerank 4</strong> — ${{fact:cohere-rerank-4-pro.price_per_search}} per search (Pro) and ${{fact:cohere-rerank-4-fast.price_per_search}} per search (Fast). A search is one query plus up to {{fact:cohere-rerank.docs_per_search}} documents; per Cohere’s pricing FAQ, a document longer than {{fact:cohere-rerank.billing_chunk_tokens}} tokens including the query is split, and each chunk counts as a document. Prices are from <a href=\"https://cohere.com/pricing\" rel=\"noopener noreferrer\">cohere.com/pricing</a> ($2.50 and $2 per 1,000 searches).":
    "<strong>Cohere Rerank 4</strong> —— 每次检索 ${{fact:cohere-rerank-4-pro.price_per_search}}（Pro）和 ${{fact:cohere-rerank-4-fast.price_per_search}}（Fast）。一次检索 = 一个 query 加最多 {{fact:cohere-rerank.docs_per_search}} 篇文档；按 Cohere 价格 FAQ，文档连同 query 超过 {{fact:cohere-rerank.billing_chunk_tokens}} token 就会被拆分，每一块算一篇文档。价格取自 <a href=\"https://cohere.com/pricing\" rel=\"noopener noreferrer\">cohere.com/pricing</a>（每千次检索 $2.50 和 $2）。",
  "<strong>Voyage rerank-3</strong> — ${{fact:voyage-rerank-3.price_per_m_tokens}} per 1M tokens, and ${{fact:voyage-rerank-3-lite.price_per_m_tokens}} for <code>rerank-3-lite</code>. Billable tokens are the query counted once per document, plus every document token you send — so 50 candidates means the query is billed 50 times. The older <code>rerank-2.5</code> and <code>-lite</code> cost the same per token. Free tokens and the Batch API discount are not applied here — see the <a href=\"/models/voyage-rerank.html\">Voyage page</a> for which models they cover.":
    "<strong>Voyage rerank-3</strong> —— 每百万 token ${{fact:voyage-rerank-3.price_per_m_tokens}}，<code>rerank-3-lite</code> 为 ${{fact:voyage-rerank-3-lite.price_per_m_tokens}}。计费 token = query 按每篇文档各算一次，再加上你发送的全部文档 token —— 所以 50 个候选意味着 query 被计费 50 次。旧版 <code>rerank-2.5</code> 及其 <code>-lite</code> 的单价相同。这里没有计入免费 token 和 Batch API 折扣 —— 哪些模型适用，见 <a href=\"/models/voyage-rerank.html\">Voyage 专页</a>。",
  "Rates verified 1 October 2026 and re-checked against <a href=\"https://cohere.com/pricing\" rel=\"noopener noreferrer\">Cohere</a> and <a href=\"https://docs.voyageai.com/docs/pricing\" rel=\"noopener noreferrer\">Voyage</a> daily by this site’s source check. Confirm before committing to a budget.":
    "价格于 2026 年 10 月 1 日核对，本站的来源检查每天都会对照 <a href=\"https://cohere.com/pricing\" rel=\"noopener noreferrer\">Cohere</a> 和 <a href=\"https://docs.voyageai.com/docs/pricing\" rel=\"noopener noreferrer\">Voyage</a> 复核一次。做预算前请再确认。",
} };

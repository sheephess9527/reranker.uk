window.I18N_PAGE = { zh: {
  "9 Oct 2026 (later) — Hosted rerankers watched too; Mixedbread’s new listwise model":
    "2026 年 10 月 9 日（稍后）—— 托管重排序 API 也纳入每日检查；Mixedbread 的新列表式模型",
  "<strong>Eleven more vendor pages watched</strong> — the daily release check now also reads the model lists of ZeroEntropy, Mixedbread, Alibaba Cloud Model Studio, SiliconFlow, Pinecone, Contextual AI, Amazon Bedrock, Google Vertex AI and NVIDIA NIM, so hosted-only rerankers are noticed too, including ones sold mainly in China":
    "<strong>多盯 11 个厂商页面</strong> —— 每日新发布检查现在还会读取 ZeroEntropy、Mixedbread、阿里云百炼（Model Studio）、硅基流动、Pinecone、Contextual AI、Amazon Bedrock、Google Vertex AI 和 NVIDIA NIM 的模型列表，只以托管 API 形式发布的重排序模型（包括主要面向国内的）也能及时发现",
  "<strong>Mixedbread’s hosted reranker has moved on</strong> — Mixedbread now lists v1 and v2 as legacy models and reranks inside Mixedbread Search with mxbai-rerank-v3.1-listwise, a listwise, instruction-following model whose weights aren’t published. The Mixedbread page says so, with the instruction-following figures from Mixedbread’s announcement, checked daily":
    "<strong>Mixedbread 的托管重排序已经换代</strong> —— Mixedbread 现在把 v1、v2 列为旧版模型，在 Mixedbread Search 内用 mxbai-rerank-v3.1-listwise 重排序，这是一个能跟随指令的列表式模型，权重未公开。Mixedbread 页面已写明这一点，并附上 Mixedbread 公告里的指令跟随评测数字，每天核对",
  "<strong>zerank-2’s licence</strong> — the weights on Hugging Face were relicensed to Apache 2.0 in July 2026, while ZeroEntropy’s own docs still call them non-commercial; the models table now notes the conflict. NVIDIA’s smaller llama-nemotron-rerank-500m-v2 is mentioned beside the 1B":
    "<strong>zerank-2 的许可</strong> —— Hugging Face 上的权重在 2026 年 7 月改为 Apache 2.0 许可，而 ZeroEntropy 自己的文档仍写着非商用；模型对比表现在注明了这一矛盾。NVIDIA 更小的 llama-nemotron-rerank-500m-v2 也在 1B 旁边提到",
  "9 Oct 2026 — Three rerankers the release watch had missed; ColBERT through sentence-transformers":
    "2026 年 10 月 9 日 —— 补上新发布检查漏掉的三个重排序模型；用 sentence-transformers 跑 ColBERT",
  "<strong>The release watch was looking in too few places</strong> — it only checked 14 organisations on Hugging Face, and only models with “rerank” in the name. It now checks every model Hugging Face tags as a reranker, whoever published it, plus popular ones the site has never mentioned, and new releases of the libraries the demo and guides use":
    "<strong>新发布检查看的范围太窄</strong> —— 之前只查 Hugging Face 上的 14 个机构，而且只看名字里带“rerank”的模型。现在会检查 Hugging Face 标为重排序的所有模型（不论谁发布），以及本站从没提过的热门模型，还有 Demo 和指南所用库的新版本",
  "<strong>Qwen3-VL-Reranker, zerank-2 and gte-multilingual-reranker-base in the models table</strong> — Qwen’s 2B / 8B reranker for text, images, screenshots and video; ZeroEntropy’s Apache 2.0 4B model, also sold as an API; and Alibaba’s 306M multilingual model, which supports 70+ languages. Each row shows the vendor’s own figures with how they were measured, checked daily against the model card":
    "<strong>模型对比表新增 Qwen3-VL-Reranker、zerank-2 和 gte-multilingual-reranker-base</strong> —— Qwen 能处理文本、图片、截图和视频的 2B / 8B 重排序模型；ZeroEntropy 以 Apache 2.0 开源、也作为 API 出售的 4B 模型；以及阿里巴巴支持 70 多种语言的 306M 多语言模型。每一行都列出厂商自己的数字和测试方法，每天和模型卡核对",
  "<strong>CLM-v0.1-8B, explained rather than added</strong> — the most-liked reranker-tagged model on Hugging Face scores actions for agents, not passages for RAG; the models page now says so":
    "<strong>CLM-v0.1-8B：说明原因，不收录</strong> —— Hugging Face 上点赞最多的“重排序”标签模型，打分对象是智能体的动作，而不是 RAG 里的段落；模型页现在写明了这一点",
  "<strong>ColBERT code that runs</strong> — the late-interaction guide’s snippet searched a ColBERT index it never built. It now rescores candidates with sentence-transformers 6’s <code>MultiVectorEncoder</code>, which we ran on version 6.1.0":
    "<strong>能跑通的 ColBERT 代码</strong> —— late-interaction 指南里的代码去检索一个从没建过的 ColBERT 索引。现在改为用 sentence-transformers 6 的 <code>MultiVectorEncoder</code> 对候选重新打分，我们在 6.1.0 版上实际跑过",
  "5 Oct 2026 — Voyage rerank-3, what changed; LightOn-rerank added":
    "2026 年 10 月 5 日 —— Voyage rerank-3 有哪些变化；新增 LightOn-rerank",
  "<strong>Voyage rerank-3, from Voyage’s announcement</strong> — the site said Voyage’s docs didn’t say whether rerank-3 takes natural-language instructions. Voyage’s 30 September announcement does: the Rerank 3 series keeps them. The Voyage page now covers what changed — a drop-in upgrade at the same price, scores calibrated to rerank-2.5, the largest gains on long documents and code, and Voyage’s own comparison against Cohere and Qwen3 — with each figure checked daily against the announcement":
    "<strong>Voyage rerank-3：依据 Voyage 的发布公告</strong> —— 本站之前写的是 Voyage 文档没说 rerank-3 是否支持自然语言指令。Voyage 9 月 30 日的发布公告明确说了：Rerank 3 系列保留这项能力。Voyage 页面新增了“rerank-3 有哪些变化”：价格不变的直接升级、分数按 rerank-2.5 校准、长文档和代码提升最大，以及 Voyage 自己与 Cohere、Qwen3 的对比 —— 每个数字每天都会和公告核对",
  "<strong>LightOn-rerank in the models table</strong> — LightOn’s Apache 2.0 family (0.8B / 2B / 4B, pointwise or listwise) scores text passages and document-page images with one model. The table shows LightOn’s own BEIR figure with its protocol, which differs from the other rows":
    "<strong>模型对比表新增 LightOn-rerank</strong> —— LightOn 的 Apache 2.0 模型系列（0.8B / 2B / 4B，逐点或列表式）用一个模型同时给文本段落和文档页面图片打分。表中列出 LightOn 自己的 BEIR 数字及其测试方法，与其他行不同",
  "<strong>A daily watch for new releases</strong> — every morning the site now checks Hugging Face and the Cohere, Voyage and Jina model pages for rerankers it doesn’t cover yet, and adds them after reading each vendor’s own announcement":
    "<strong>每天检查新发布</strong> —— 现在每天早上都会检查 Hugging Face 以及 Cohere、Voyage、Jina 的模型页面，发现本站还没收录的重排序模型后，先阅读厂商自己的公告，再更新到网站",
  "3 Oct 2026 — The RAG guide’s model picks, corrected; the Chinese pages, finished":
    "2026 年 10 月 3 日 —— 修正 RAG 指南的模型推荐，补完中文页面",
  "<strong>“Which reranker to pick” was out of date</strong> — the RAG guide called bge-reranker-v2-m3 English-only (it’s BAAI’s multilingual model), recommended Cohere Rerank v3.5 for “best multilingual quality” and Voyage Rerank 2. It now points at Cohere Rerank 4 and Voyage rerank-3, describes each by how it bills and what it supports rather than with an unsourced superlative, and its code sample uses Cohere’s current client and model":
    "<strong>“该选哪个 reranker”过时了</strong> —— RAG 指南把 bge-reranker-v2-m3 说成仅支持英文（它其实是 BAAI 的多语言模型），还推荐 Cohere Rerank v3.5 为“最佳多语言质量”、以及 Voyage Rerank 2。现在改为推荐 Cohere Rerank 4 和 Voyage rerank-3，按计费方式和支持的能力来描述，不再用没有出处的最高级说法；示例代码也换成了 Cohere 当前的客户端和模型",
  "<strong>English left on the Chinese pages</strong> — five guides’ tables of contents, the RAG pipeline diagram, every source note on the model table’s BEIR column, the demo’s input hints and screen-reader labels, and several badges were still in English. Tables of contents now take their wording from the translated headings, so they can’t fall behind again":
    "<strong>中文页面里残留的英文</strong> —— 五篇指南的目录、RAG 流水线示意图、模型对比表 BEIR 列的全部出处说明、Demo 的输入提示和读屏标签，以及若干标签徽章，之前都还是英文。现在目录直接取自翻译后的标题，以后不会再落下",
  "2 Oct 2026 — Structured data that matches the page":
    "2026 年 10 月 2 日 —— 结构化数据与页面内容保持一致",
  "<strong>Hidden FAQs removed</strong> — five pages carried FAQ markup for questions the page never shows, and it had gone stale: it still said Jina v3 beats Qwen3-Reranker-4B and quoted a Hit@1 tie, both withdrawn from the visible pages. Search engines and AI assistants read that markup, so it’s gone (Google stopped showing FAQ results for sites like this in 2023 anyway)":
    "<strong>删掉了隐藏的 FAQ</strong> —— 有五个页面带着 FAQ 结构化数据，但这些问答在页面上并不显示，而且内容已经过时：仍然写着 Jina v3 超过 Qwen3-Reranker-4B，还引用了一个 Hit@1 打平的数字，这两条在正文里早已撤回。搜索引擎和 AI 助手会读取这些数据，所以全部删掉（Google 从 2023 年起就不再为这类网站显示 FAQ 结果了）",
  "<strong>Chinese pages describe themselves in Chinese</strong> — the /zh/ pages shipped the English structured data verbatim, some declaring their language as English. Headlines, descriptions, language and breadcrumbs now come from each page’s own title and description at build time, so they can’t drift from the page again; a CI check enforces it":
    "<strong>中文页面的结构化数据改成中文</strong> —— 之前 /zh/ 页面原样带着英文的结构化数据，有的还把语言标成英文。现在标题、描述、语言和面包屑导航都在构建时从页面自己的标题和描述生成，不会再和页面内容脱节；CI 里加了检查来保证这一点",
  "1 Oct 2026 — The demo recovers when the mirror can’t serve":
    "2026 年 10 月 1 日 —— 镜像下载失败时，Demo 会自动换回原站",
  "<strong>Automatic fallback between model hosts</strong> — the demo picks whichever of huggingface.co and hf-mirror.com answers first. Answering isn’t serving: outside mainland China, hf-mirror.com redirects every file to huggingface.co without the CORS header a browser needs, so if it won the race the model never loaded. A load that fails at the network level is now retried once on the other host":
    "<strong>模型下载源之间自动切换</strong> —— Demo 会在 huggingface.co 和 hf-mirror.com 之间选先响应的那个。但先响应不等于能下载：在中国大陆以外，hf-mirror.com 会把每个文件重定向回 huggingface.co，而且不带浏览器需要的 CORS 响应头，所以一旦它抢先，模型就加载不出来。现在如果因为网络原因加载失败，会自动换另一个下载源重试一次",
  "<strong>Tested against the real hosts</strong> — the daily real-network check now also loads each model with hf-mirror.com winning the race, and confirms the fallback ranks correctly. Every page is also checked for CSP violations on every pull request, not just the demo":
    "<strong>对着真实下载源测过</strong> —— 每日真实网络检查新增一项：让 hf-mirror.com 抢先，逐个加载三个模型，确认自动切换后排序结果正确。另外，每次提交 PR 时，全站每个页面都会检查有没有 CSP 违规，不再只查 Demo",
  "1 Oct 2026 — The demo scores about twice as fast":
    "2026 年 10 月 1 日 —— Demo 打分速度快了约一倍",
  "<strong>Multi-threaded inference in the demo</strong> — the demo pages are now cross-origin isolated, which lets ONNX Runtime Web score on several threads. Measured A/B on the same 4-vCPU runner: about 1.9× faster for all three models (Jina v1 tiny 424 → 229 ms for 10 passages). Browsers that don't support the isolation header simply stay single-threaded":
    "<strong>Demo 改为多线程推理</strong> —— Demo 页面现在开启了跨源隔离，ONNX Runtime Web 可以用多个线程打分。在同一台 4 核机器上做 A/B 实测：三个模型都快了约 1.9 倍（Jina v1 tiny 打分 10 段从 424 ms 降到 229 ms）。不支持隔离响应头的浏览器会保持单线程，不受影响",
  "<strong>Only where it's needed</strong> — isolation and a CSP that also allows blob: scripts (the threaded runtime loads that way) apply to the demo pages alone; every other page keeps the stricter policy. A new daily check confirms both on the live site":
    "<strong>只在需要的地方开启</strong> —— 跨源隔离和允许 blob: 脚本的 CSP（多线程运行时需要这样加载）只用于 Demo 页面；其他页面仍保持更严格的策略。新增的每日检查会在线上确认这两点",
  "1 Oct 2026 — Latency figures measured, or sourced, or gone":
    "2026 年 10 月 1 日 —— 延迟数字：要么实测，要么有出处，要么删掉",
  "<strong>The browser demo, measured</strong> — a new script runs the live demo in Chromium on a 4-vCPU GitHub Actions runner. Scoring 10 passages takes about 430 ms with Jina v1 tiny, 515 ms with ms-marco MiniLM and 1.4 s with mxbai xsmall. The site had claimed 30–80 ms and 50–150 ms":
    "<strong>浏览器 Demo 有了实测数字</strong> —— 新写了一个脚本，在 4 核的 GitHub Actions 机器上用 Chromium 跑在线 Demo。给 10 段打分：Jina v1 tiny 约 430 ms，ms-marco MiniLM 约 515 ms，mxbai xsmall 约 1.4 秒。网站原先写的是 30–80 ms 和 50–150 ms",
  "<strong>Demo model sizes corrected</strong> — the picker listed mxbai xsmall at 70 MB and ms-marco MiniLM at 90 MB; the demo actually downloads 92 MB and 23 MB. So ms-marco was labelled \"larger\" when it's the smallest, and mxbai \"balanced\" when it's the largest and slowest. The \"try a smaller model\" button now picks the actual smallest":
    "<strong>Demo 模型大小改正了</strong> —— 选择框里写 mxbai xsmall 70 MB、ms-marco MiniLM 90 MB；Demo 实际下载的是 92 MB 和 23 MB。所以 ms-marco 明明最小却被标成「更大」，mxbai 最大也最慢却被标成「均衡」。「换个更小的模型」按钮现在指向真正最小的那个",
  "<strong>Sourced where vendors publish</strong> — mixedbread's own A100 latencies on the mxbai page, and Jina's API latency figures on the Jina page":
    "<strong>厂商有公布的，就引用出处</strong> —— mxbai 专页引用了 mixedbread 自己公布的 A100 延迟，Jina 专页引用了 Jina 公布的 API 延迟",
  "<strong>Removed where nobody measured</strong> — the CPU/GPU millisecond ranges for bge and mxbai in the models table, Cohere's \"~100–200 ms\", and the self-hosting guide's T4 figure had no source; they're now described without numbers, and the RAG guide's latency table says which rows are estimates":
    "<strong>没人测过的，就删掉</strong> —— 模型对比表里 bge 和 mxbai 的 CPU / GPU 毫秒范围、Cohere 的「约 100–200 ms」、自建部署指南里的 T4 数字，都没有出处；现在改为不带数字的描述，RAG 指南的延迟表也注明了哪些行是估算",
  "1 Oct 2026 — Qwen3, Contextual AI, GTE and NVIDIA rows checked against their model cards":
    "2026 年 10 月 1 日 —— 对照官方模型卡核对 Qwen3、Contextual AI、GTE 与 NVIDIA 各行",
  "<strong>Contextual AI Rerank v2 was described wrongly</strong> — the table called it an English-only hosted API with prices on request. It has shipped open weights on Hugging Face since August 2025 (1B, 2B and 6B), covers 100+ languages with a 32K context, and is licensed CC BY-NC-SA — non-commercial":
    "<strong>Contextual AI Rerank v2 的描述是错的</strong> —— 表里写它是只支持英文、价格需询价的托管 API。实际上它自 2025 年 8 月起就在 Hugging Face 上提供开源权重（1B、2B、6B），支持 100+ 种语言、32K 上下文，许可证是 CC BY-NC-SA —— 仅限非商用",
  "<strong>Two unsourced scores removed</strong> — the NVIDIA row's \"Hit@1 83.0\" and the GTE row's \"ties nemotron on Hit@1\" appear in neither model card. NVIDIA report Recall@5 for their own embed + rerank pipeline; GTE now shows Alibaba's own 56.19 BEIR":
    "<strong>删掉两个没有出处的分数</strong> —— NVIDIA 那行的「Hit@1 83.0」和 GTE 那行的「Hit@1 与 nemotron 打平」，在两家的模型卡里都找不到。NVIDIA 公布的是自家向量模型 + 重排序整条流水线的 Recall@5；GTE 现在显示阿里自己公布的 BEIR 56.19",
  "<strong>Qwen3 numbers now sourced</strong> — the table shows Qwen's own MTEB-R (65.80, 69.76, 69.02). \"The 4B edges the 8B by ~0.48 on BEIR\" is corrected to 0.74 on MTEB-R, with the 8B ahead on Chinese, multilingual, long-document and code. The Qwen page had still been comparing against \"bge ~60\" and \"mxbai ~62\", both withdrawn earlier; it now shows Qwen's full table":
    "<strong>Qwen3 的分数有了出处</strong> —— 表里现在显示 Qwen 自己公布的 MTEB-R（65.80、69.76、69.02）。「4B 在 BEIR 上比 8B 高约 0.48」更正为 MTEB-R 上高 0.74，而中文、多语言、长文档和代码上是 8B 领先。Qwen 专页之前还在拿「bge 约 60」「mxbai 约 62」做对比，这两个数字早已撤回；现在改为展示 Qwen 的完整评测表",
  "<strong>Qwen3 takes instructions</strong> — its page said \"maybe not\" for instruction-shaped relevance, but the Qwen rerankers are instruction-aware. The quick start now uses the model card's own sentence-transformers code, and the instruction-following guide lists three rerankers that take an instruction, with real usage":
    "<strong>Qwen3 支持指令</strong> —— 它的专页原先说需要指令的场景「不太适合」，但 Qwen 重排序模型本身就支持指令。快速上手现在用的是模型卡里官方的 sentence-transformers 代码，指令跟随指南也列出了三款支持指令的重排序器及其实际用法",
  "1 Oct 2026 — Cohere's 500-token rule, and Voyage rerank-3":
    "2026 年 10 月 1 日 —— Cohere 的 500 token 规则，以及 Voyage rerank-3",
  "<strong>A correction to our own correction</strong> — in September this site called it a myth that Cohere splits documents over 500 tokens into extra billable chunks. Cohere's own pricing FAQ says it does: a document over 500 tokens, query included, counts once per 500-token chunk toward a search's 100 documents. The cost calculator now models that, and the \"long passages favour Cohere\" rule it used to give is gone":
    "<strong>更正我们自己的更正</strong> —— 9 月时本站说「Cohere 把超过 500 token 的文档拆成多块额外计费」是误传。但 Cohere 自己的价格 FAQ 写明确实如此：文档连同 query 超过 500 token，每 500 token 一块，每块都计入一次检索的 100 篇文档。成本计算器已按此重算，之前给出的「段落越长越适合 Cohere」的结论也随之撤回",
  "<strong>Voyage rerank-3 is current, not a preview</strong> — Voyage now list rerank-3 and -lite as their recommended rerankers and rerank-2.5 among older models. The Voyage page, models table and calculator lead with rerank-3. The 200M free tokens apply to rerank-3; the 33% Batch API discount and natural-language instructions are documented only for rerank-2.5":
    "<strong>Voyage rerank-3 已是正式版，不再是预览</strong> —— Voyage 现在把 rerank-3 和 -lite 列为推荐模型，rerank-2.5 归入旧模型。Voyage 专页、模型对比表和计算器都改为以 rerank-3 为主。2 亿免费 token 适用于 rerank-3；Batch API 的 33% 折扣和自然语言指令目前只在 rerank-2.5 的文档里写明",
  "<strong>Prices are sourced and checked daily</strong> — Cohere's per-search and Voyage's per-token prices now live in data/models.json; the calculator reads them from the page, and the daily source check confirms them against cohere.com/pricing and Voyage's docs":
    "<strong>价格有了出处，并且每天核对</strong> —— Cohere 的按次价格和 Voyage 的按 token 价格现在都放在 data/models.json 里；计算器直接从页面读取，每日来源检查会对照 cohere.com/pricing 和 Voyage 文档确认",
  "<strong>Smaller fixes</strong> — Cohere trial keys (1,000 calls a month) may not be used in production, so the scenario guide no longer suggests them for customer support; Cohere's context is 32,768 tokens, not 32,000; the RAG guide's API cost was more than ten times too low; rerank-2-lite's context is 8,000 tokens, not 16,000; Voyage does have a TypeScript library":
    "<strong>其他小修正</strong> —— Cohere 试用 key（每月 1,000 次调用）不得用于生产，场景指南不再推荐用它做客服；Cohere 的上下文是 32,768 token，不是 32,000；RAG 指南里的 API 成本低估了十倍以上；rerank-2-lite 的上下文是 8,000 token，不是 16,000；Voyage 其实有 TypeScript 库",
  "1 Oct 2026 — jina-reranker-v3.5, and Jina's licences spelled out":
    "2026 年 10 月 1 日 —— 收录 jina-reranker-v3.5，并写明 Jina 的许可证",
  "<strong>jina-reranker-v3.5 added</strong> — Jina's August 2026 flagship: 0.6B, listwise, a drop-in replacement for v3 and 1.22–1.56× faster. 63.20 BEIR nDCG@10 in Jina's own test. It's in the models table, and the Jina page is rewritten around it":
    "<strong>收录 jina-reranker-v3.5</strong> —— Jina 2026 年 8 月的旗舰：0.6B、listwise，可直接替换 v3，速度快 1.22–1.56 倍；在 Jina 自己的测试里 BEIR nDCG@10 为 63.20。已加入模型对比表，Jina 专页也围绕它重写",
  "<strong>Licences stated</strong> — the v2, v3, v3.5 and m0 weights are CC BY-NC 4.0, non-commercial. This site called them \"open weights\" without saying so. The Jina page now has a licence section, and the self-hosting guide's model table a licence column":
    "<strong>写明许可证</strong> —— v2、v3、v3.5 和 m0 的权重采用 CC BY-NC 4.0，仅限非商用。本站此前只写「开源权重」，没有提这一点。现在 Jina 专页加了许可证一节，自建部署指南的模型表也加了许可证一列",
  "<strong>\"Jina v3 beats Qwen3-Reranker-4B\" withdrawn</strong> — true in the v3 paper's 2025 run (61.94 vs 61.16), but in Jina's own 2026 re-run v3 scores 62.10 and the 4B 62.28. The Jina rows in the models table now use that 2026 run, the same one as v3.5":
    "<strong>撤回「Jina v3 超过 Qwen3-Reranker-4B」</strong> —— 在 v3 论文 2025 年的评测里成立（61.94 对 61.16），但在 Jina 自己 2026 年重测时，v3 是 62.10，4B 是 62.28。模型对比表里的 Jina 各行现在都用这次 2026 年的评测，与 v3.5 相同",
  "<strong>Unsourced Jina prices removed</strong> — \"1M tokens/month free\" and \"~$0.018 / 1M tokens\" had no source we could find. Jina's own page says new keys get free trial tokens and then token packages; we now list their published rate limits instead of a price":
    "<strong>删掉没有出处的 Jina 价格</strong> —— 「每月 100 万免费 token」和「约 $0.018 / 百万 token」都找不到出处。Jina 自己的页面只说新 key 附带免费试用 token，之后购买 token 包；现在改为列出他们公布的速率限制，不再写价格",
  "<strong>Smaller fixes</strong> — parameter counts written as MB on the Jina and mxbai pages (mxbai-rerank-large-v1 is 435M, not the 1.5B its own README states); jina-reranker-v1-base-en, no longer on Hugging Face, removed":
    "<strong>其他小修正</strong> —— Jina 和 mxbai 专页把参数量写成了 MB（mxbai-rerank-large-v1 实际是 4.35 亿参数，而不是它自己 README 里写的 1.5B）；已不在 Hugging Face 上的 jina-reranker-v1-base-en 已移除",
  "1 Oct 2026 — bge-reranker's BEIR figure, and a daily check on every source":
    "2026 年 10 月 1 日 —— 修正 bge-reranker 的 BEIR 分数，并每天核对所有来源",
  "<strong>bge-reranker-v2-m3 now reads 55.36</strong> — BAAI's own BEIR figure. The ~60.1 the models table carried could not be traced to anything BAAI or anyone else published":
    "<strong>bge-reranker-v2-m3 改为 55.36</strong> —— 这是 BAAI 自己公布的 BEIR 分数。模型对比表此前写的 ~60.1，在 BAAI 和其他任何地方都找不到出处",
  "<strong>The bge-reranker page's benchmark table, rebuilt</strong> — all four rows' BEIR and MS MARCO figures were untraceable. It now shows what BAAI did publish: BEIR for the v2 models, C-MTEB reranking for v1. The size column was also showing parameter counts as megabytes":
    "<strong>bge-reranker 专页的基准表重做了</strong> —— 原来四行的 BEIR 和 MS MARCO 分数都查不到出处。现在只列 BAAI 真正公布过的：v2 的 BEIR 分数，v1 的 C-MTEB 重排序分数。「体积」一列原先把参数量写成了 MB，也一并改正",
  "<strong>Jina v1 tiny and ms-marco MiniLM-L6 get real BEIR figures</strong> — 48.54 and 48.64, both from Jina's v1 model card (17 BEIR datasets). The ms-marco figure is Jina's measurement, not its authors', and says so on hover":
    "<strong>Jina v1 tiny 与 ms-marco MiniLM-L6 有了真实的 BEIR 分数</strong> —— 分别是 48.54 和 48.64，都来自 Jina 的 v1 模型卡（17 个 BEIR 数据集）。ms-marco 这个分数是 Jina 测的，不是模型作者测的，鼠标悬停时会注明",
  "<strong>The footnote stops claiming a common protocol</strong> — it said the bge and Jina rows used \"the classic BEIR 18-dataset average\". Neither does: BAAI average 15 datasets, Jina 13, over different first-stage retrievers. The same model lands over a point apart between them (bge-reranker-v2-m3: 55.36 by BAAI, 56.51 by Jina), so every BEIR figure now carries a * and its protocol":
    "<strong>脚注不再声称有统一的评测方法</strong> —— 原先写 bge 和 Jina 两行用的是「经典 BEIR 18 数据集均值」，其实两家都不是：BAAI 用 15 个数据集，Jina 用 13 个，第一阶段召回模型也不同。同一个模型在两家的测法下能差出一分多（bge-reranker-v2-m3：BAAI 测 55.36，Jina 测 56.51），所以现在每个 BEIR 数字都带 *，并注明评测方法",
  "<strong>A daily check that sources still say what we say</strong> — every figure in the table that is published as text is re-fetched from its source each day and the run fails if the number has gone. Jina's v3 paper has already been revised once (61.85 in the arXiv full text, 61.94 on the model card) — the kind of drift this exists to catch":
    "<strong>每天核对一次：来源上的数字是否还和我们一致</strong> —— 表里每个以文字形式公布的数字，每天都会回到来源页面重新抓取，数字不在了就报错。Jina v3 的论文已经改过一版（arXiv 全文写 61.85，模型卡写 61.94）—— 这道检查要抓的就是这种变动",
  "1 Oct 2026 — An accessibility pass, and a check to keep it":
    "2026 年 10 月 1 日 —— 一轮无障碍修复，外加一道防回退的检查",
  "<strong>Links in text are underlined</strong> — they were told apart from surrounding text by colour alone; in the dark theme that was a 1.47:1 difference, well under the 3:1 a reader without full colour vision needs. Buttons, cards and navigation are unchanged":
    "<strong>正文里的链接加了下划线</strong> —— 以前只靠颜色和周围文字区分；深色主题下两者的对比度只有 1.47:1，远低于色觉不完全的读者需要的 3:1。按钮、卡片和导航保持不变",
  "<strong>Five text colours fixed</strong> — the light theme's teal and amber labels and the Chinese dark-theme page labels were 3.1–4.2:1, under the 4.5:1 minimum for body-size text":
    "<strong>修正了五处文字颜色</strong> —— 浅色主题里的青色、琥珀色标签，以及中文页面深色主题下的标签，对比度在 3.1–4.2:1 之间，低于正文字号要求的 4.5:1",
  "<strong>Code blocks reachable by keyboard</strong> — a code sample wider than the screen scrolls sideways, and could only be scrolled with a mouse":
    "<strong>代码块可以用键盘操作了</strong> —— 比屏幕宽的代码示例需要横向滚动，以前只能用鼠标滚",
  "<strong>A check on every page, both themes</strong> — every build now runs axe-core's WCAG 2.1 AA rules across all 48 pages in light and dark; it found over 400 issues the first time and finds none now":
    "<strong>每个页面、两种主题都检查</strong> —— 现在每次构建都会用 axe-core 的 WCAG 2.1 AA 规则把全部 48 个页面在浅色、深色主题下各查一遍；第一次跑查出 400 多处问题，现在为零",
  "28 Sep 2026 — transformers.js 4.3.0, and what report-only caught":
    "2026 年 9 月 28 日 —— transformers.js 4.3.0，以及「只报告」模式抓到了什么",
  "<strong>The demo runs on transformers.js 4.3.0</strong> — up from 3.5.1, with ONNX Runtime Web 1.22 → 1.31. Verified against live jsDelivr and HuggingFace on all three demo models before merging, not just checked against the source":
    "<strong>Demo 升级到 transformers.js 4.3.0</strong> —— 从 3.5.1 升上来，ONNX Runtime Web 也从 1.22 升到 1.31。合并前在真实的 jsDelivr 和 HuggingFace 上把三个 Demo 模型都跑过一遍，不只是对着源码看了看",
  "<strong>The report-only CSP earned its keep</strong> — its first run against real traffic flagged that HuggingFace redirects model weights to separate CDN hosts the policy didn't list. Enforcing, that would have blocked every model download in the demo. Fixed before it was ever enforced":
    "<strong>「只报告」模式的 CSP 立了功</strong> —— 第一次对着真实流量跑，就发现 HuggingFace 会把模型权重重定向到策略里没列出的 CDN 域名。如果当时是强制模式，Demo 里的每一次模型下载都会被拦掉。在真正强制之前就已经修好了",
  "<strong>…and caught the upgrade too</strong> — transformers.js 4 loads part of ONNX Runtime from a <code>blob:</code> URL by default. The demo now switches that cache off instead of loosening the policy for every page":
    "<strong>……升级时也抓到了问题</strong> —— transformers.js 4 默认会从 <code>blob:</code> URL 加载 ONNX Runtime 的一部分代码。现在 Demo 直接关掉了这个缓存，而不是为此放宽全站每一页的策略",
  "<strong>A stricter real-network test</strong> — the daily check now runs every model in the demo's picker, not just the default, and fails if an obviously relevant passage doesn't outrank an unrelated one, so a model that loads but ranks wrong no longer passes":
    "<strong>更严格的真实网络测试</strong> —— 每日检查现在会跑 Demo 里可选的每一个模型，而不只是默认那个；如果一段明显相关的文本没能排在无关文本前面，测试就会失败，所以「能加载但排错了」的模型不会再蒙混过关",
  "27 Sep 2026 — Security headers, report-only for now":
    "2026 年 9 月 27 日 —— 加了安全响应头，先以只报告模式跑",
  "<strong><code>public/_headers</code> added</strong> — <code>X-Content-Type-Options</code>, <code>X-Frame-Options</code>, <code>Referrer-Policy</code>, <code>Permissions-Policy</code>, and a Content-Security-Policy, generated at build time rather than hand-maintained":
    "<strong>新增 <code>public/_headers</code></strong> —— <code>X-Content-Type-Options</code>、<code>X-Frame-Options</code>、<code>Referrer-Policy</code>、<code>Permissions-Policy</code>，外加一条 Content-Security-Policy，在构建期生成，而不是手工维护",
  "<strong>CSP ships report-only</strong> — this repo's sandboxed dev environment can't reach real jsDelivr/HuggingFace/hf-mirror.com traffic or real WASM instantiation to confirm a stricter policy wouldn't break the demo in practice, so it logs violations instead of blocking anything until that's been checked against the real thing":
    "<strong>CSP 目前是「只报告」模式</strong> —— 这个仓库的沙盒开发环境连不上真实的 jsDelivr / HuggingFace / hf-mirror.com 流量，也跑不了真实的 WASM 实例化，没法确认更严格的策略实际会不会弄坏 Demo，所以现在只记录违规，等对着真实环境验证过之后再改成强制拦截",
  "<strong>No hand-copied hash</strong> — the CSP's <code>script-src</code> allows the site's one inline script (early theme detection) via a <code>sha256-</code> hash computed from its actual content at build time, not typed in by hand where it could drift":
    "<strong>没有手抄的哈希值</strong> —— CSP 的 <code>script-src</code> 通过一个在构建期从脚本实际内容算出的 <code>sha256-</code> 哈希，放行站内唯一的内联脚本（早期主题检测），而不是手工填一个可能跑偏的值",
  "<strong>Both smoke tests now watch for CSP violations</strong> — <code>tests/helpers/csp.mjs</code>, asserted in both the mocked and real-network demo tests; verified the mechanism actually catches something by deliberately breaking <code>style-src</code> locally and watching the test fail":
    "<strong>两个冒烟测试现在都会盯着 CSP 违规</strong> —— <code>tests/helpers/csp.mjs</code>，在 mock 版和真实网络版的 Demo 测试里都有断言；特意在本地弄坏了一次 <code>style-src</code> 看着测试真的红了，确认这套机制真能抓到问题",
  "26 Sep 2026 — ms-marco MiniLM's BEIR figure was never published":
    "2026 年 9 月 26 日 —— ms-marco MiniLM 的 BEIR 数字其实从没被公布过",
  "<strong>ms-marco MiniLM-L6 now reads \"not published\"</strong> — this table carried it at an unsourced ~55.0; sentence-transformers' own docs report NDCG@10 on TREC DL 19 (74.30) and MRR@10 on MS MARCO Dev (39.01) for this model, not a BEIR average. Found while checking the rest of the table after the mxbai correction below — same failure shape, different model":
    "<strong>ms-marco MiniLM-L6 现在写「未公布」</strong> —— 本表此前挂着一个没有来源的 ~55.0；sentence-transformers 自己的文档给这个模型报的是 TREC DL 19 上的 NDCG@10（74.30）和 MS MARCO Dev 上的 MRR@10（39.01），并不是 BEIR 均值。是在下面这条 mxbai 修正之后顺手检查表里其他数字时发现的 —— 同样的问题，换了个模型",
  "26 Sep 2026 — mxbai-rerank-v2, a corrected BEIR figure, and a demo smoke test":
    "2026 年 9 月 26 日 —— mxbai-rerank-v2、一处 BEIR 数字修正，以及一个 Demo 冒烟测试",
  "<strong>mxbai-rerank-large-v1's BEIR score corrected</strong> — this table carried an unsourced ~62.1 for months; mixedbread's own comparison table puts it at 49.32*. A reader flagged the gap between that number and mixedbread's own figures for their newer models, which is what surfaced it":
    "<strong>mxbai-rerank-large-v1 的 BEIR 分数已修正</strong> —— 本表此前挂着一个没有来源的 ~62.1，挂了好几个月；mixedbread 自己的对比表给出的是 49.32*。是一位读者发现这个数字跟 mixedbread 自己给新模型报的分数对不上，才让这个问题浮出水面",
  "<strong><code>mxbai-rerank-v2</code> added</strong> — a newer, Qwen2.5-based, RL-trained generation (<code>base-v2</code> 0.5B, <code>large-v2</code> 1.5B) that adds 100+ languages including Chinese; v1 was English-only, which the table didn't make clear":
    "<strong>新增 <code>mxbai-rerank-v2</code></strong> —— 基于 Qwen2.5、经强化学习训练的新一代（<code>base-v2</code> 0.5B、<code>large-v2</code> 1.5B），新增 100+ 种语言支持，包括中文；v1 其实只支持英文，之前的表没把这点说清楚",
  "<strong><code>data/models.json</code></strong> — benchmark numbers that have been through a correction like the one above now live in one sourced file instead of a hand-typed literal in every page that mentions them; the build refuses to render one with no source and warns when one hasn't been re-checked in 6 months":
    "<strong><code>data/models.json</code></strong> —— 经历过上面这种修正的基准数字，现在统一放进一个带来源的文件，而不是散落在每个提到它的页面里手写一遍；没有来源的数字构建会直接拒绝渲染，超过 6 个月没复核过也会有构建期提醒",
  "<strong>A smoke test for the live demo</strong> — <code>npm test</code> runs the demo's load → score → render pipeline against a fake model on every PR; a separate daily job runs it against the real jsDelivr / HuggingFace chain, which is what would actually catch one of those going dark":
    "<strong>为在线 Demo 加了冒烟测试</strong> —— 每个 PR 都会用 <code>npm test</code> 对着一个假模型跑一遍「加载 → 打分 → 渲染」流程；另有一个每日任务对着真实的 jsDelivr / HuggingFace 链路跑，真出问题时才靠这个发现",
  "18 Sep 2026 — URLs without the .html, and two pricing corrections":
    "2026 年 9 月 18 日 —— URL 去掉了 .html，外加两处计价修正",
  "<strong>URLs dropped their <code>.html</code></strong> — every internal link, the sitemap, hreflang tags and JSON-LD now point straight at the extensionless URL Cloudflare was already redirecting to, cutting a 307 round-trip off every internal navigation":
    "<strong>URL 去掉了 <code>.html</code></strong> —— 站内所有链接、sitemap、hreflang 标签与 JSON-LD 现在都直接指向 Cloudflare 本就会跳转到的无扩展名 URL，省掉了每次站内跳转多余的一次 307",
  "<strong>Voyage's free-tier grant moved on</strong> — the 200M free-token allowance is no longer on <code>rerank-2.5</code>; it now ships with the <code>rerank-3</code> preview, added to the model table and cost calculator alongside <code>rerank-3-lite</code>":
    "<strong>Voyage 的免费额度换代了</strong> —— 2 亿免费 token 的额度已不在 <code>rerank-2.5</code> 上；现在随 <code>rerank-3</code> 预览版发放，已连同 <code>rerank-3-lite</code> 一并加入模型表与成本计算器",
  "<strong>Cost calculator token formula fixed</strong> — Voyage bills the query once per document reranked, not once per query; the calculator undercounted tokens (and cost) on any workload with more than one candidate per query":
    "<strong>成本计算器的 token 公式修正了</strong> —— Voyage 是按「每个被重排的文档都计一次 query」计费，而不是每次查询只计一次；只要每次查询的候选数大于一，计算器此前都会低估 token 数（和成本）",
  "<strong>Cohere chunking, clarified</strong> — an outside audit suggested Cohere silently splits passages over 500 tokens into extra billable chunks; that isn't how it works (context is 32,768 tokens and chunking is opt-in), so the calculator page now says so directly instead of adopting the wrong model":
    "<strong>Cohere 分块问题说清楚</strong> —— 一份外部审计认为 Cohere 会把超过 500 token 的段落静默拆分成额外的计费分块；实际并非如此（上下文长度是 32,768 token，分块是可选项），因此计算器页面直接说明了这一点，而不是照搬这个错误的计费模型",
  "<strong>Homepage diagram, now bilingual</strong> — the \"Reranking in one diagram\" figure was inline SVG the translation pass couldn't see; its labels and caption now render in Chinese on <a href=\"/zh/\">/zh/</a>":
    "<strong>首页示意图现在也有中文</strong> —— 「一张图看懂重排序」是一段翻译流程看不到的内联 SVG；现在它的标签与图注在 <a href=\"/zh/\">/zh/</a> 上会显示为中文",
  "<strong>Model table accessibility</strong> — the comparison table gets a caption, column/row headers, and a scrollable, keyboard-focusable region for screen readers and narrow viewports":
    "<strong>模型对比表的可访问性</strong> —— 对比表新增了标题说明、列/行表头，并做成了可滚动、可用键盘聚焦的区域，方便屏幕阅读器与窄屏使用",
  "25 Aug 2026 — Two guides for the questions people actually ask":
    "2026 年 8 月 25 日 —— 两篇针对真实提问的指南",
  "<strong><a href=\"/guides/reranking-not-working.html\">Reranking didn't help</a></strong> — a diagnostic walkthrough of the seven reasons a rerank stage shows no lift, starting with the one that explains most of them: retrieval never returned the right document":
    "<strong><a href=\"/guides/reranking-not-working.html\">重排序没起作用</a></strong> —— 逐条排查重排序看不到提升的七个原因，从最能解释问题的那条开始：检索压根没返回正确的文档",
  "<strong><a href=\"/guides/rerank-vector-database.html\">Rerank on a vector database</a></strong> — the retrieve-wide-then-rerank pattern with code for pgvector, Qdrant and Elasticsearch, including the HNSW <code>ef_search</code> trap that makes a wider limit return padding instead of candidates":
    "<strong><a href=\"/guides/rerank-vector-database.html\">在向量数据库上做重排序</a></strong> —— 「宽召回后重排」模式，含 pgvector、Qdrant 与 Elasticsearch 的代码，也包括 HNSW 的 <code>ef_search</code> 陷阱：limit 放大了，返回的却是凑数而非候选",
  "<strong><a href=\"/llms.txt\">/llms.txt</a></strong> — a generated map of the site for assistants that read one before citing a source, including how to read our benchmark footnotes":
    "<strong><a href=\"/llms.txt\">/llms.txt</a></strong> —— 自动生成的站点地图，供引用前会读它的 AI 助手使用，其中也说明了我们的基准脚注该怎么读",
  "<strong>Feed autodiscovery</strong> — the changelog RSS is now advertised from every page, not just the changelog":
    "<strong>订阅源自动发现</strong> —— 更新日志 RSS 现在在每一页都会声明，而不只是更新日志页",
  "14 Aug 2026 — Cost calculator, and demo links that land somewhere":
    "2026 年 8 月 14 日 —— 成本计算器，以及不再落空的 Demo 链接",
  "<strong><a href=\"/rerank-cost-calculator.html\">Rerank cost calculator</a></strong> — Cohere bills per search, Voyage per token, so the cheaper vendor flips with passage length and top-k. Put your own volume in and see where the line sits":
    "<strong><a href=\"/rerank-cost-calculator.html\">重排序成本计算器</a></strong> —— Cohere 按次检索计费、Voyage 按 token 计费，因此哪家更便宜会随段落长度和 top-k 翻转。填入你自己的量级，看看分界线在哪",
  "<strong>Scenario deep links</strong> — all 25 demo links across the guides and model pages now open the scenario the page is actually about, via a new <code>?s=</code> parameter":
    "<strong>场景深度链接</strong> —— 指南与模型页上全部 25 个 Demo 链接，现在都会通过新的 <code>?s=</code> 参数打开该页真正讲的那个场景",
  "<strong>Shorter share links</strong> — an untouched built-in scenario shares as <code>?s=rag</code> instead of a 900-character URL":
    "<strong>分享链接变短</strong> —— 未经修改的内置场景现在分享为 <code>?s=rag</code>，而不是 900 字符的长链接",
  "<strong>Translations survive link edits</strong> — the build now retargets links inside a translation instead of dropping it back to English":
    "<strong>改链接不再丢翻译</strong> —— 构建会把译文里的链接指向新目标，而不是让整段退回英文",
  "11 Aug 2026 — Real Chinese URLs, and a 2026 model refresh":
    "2026 年 8 月 11 日 —— 中文有了独立 URL，模型数据刷新到 2026",
  "<strong>Chinese lives at <a href=\"/zh/\">/zh/</a></strong> — every page is now pre-rendered in Chinese at its own URL with a self-referencing canonical, instead of a client-side toggle that left all three hreflang tags pointing at one page":
    "<strong>中文页面迁到 <a href=\"/zh/\">/zh/</a></strong> —— 每个页面都在构建期预渲染成中文并拥有自己的 URL 与自指 canonical，不再是三个 hreflang 全指向同一页的前端切换",
  "<strong>Lighter pages</strong> — translation moved to build time, so ~200 KB of dictionaries no longer ship to the browser":
    "<strong>页面更轻</strong> —— 翻译改在构建期完成，约 200 KB 的词典不再下发到浏览器",
  "<strong>Sitemap is generated</strong> — built from the page tree with hreflang alternates and <code>lastmod</code> from git, replacing a hand-maintained file that had drifted":
    "<strong>Sitemap 改为自动生成</strong> —— 从页面树生成，带 hreflang 备选链接，<code>lastmod</code> 取自 git，替代此前已经失准的手工维护文件",
  "<strong>Cohere Rerank 4</strong> — <code>rerank-v4.0-pro</code> and <code>rerank-v4.0-fast</code> replace v3.5; 32k context, billed per search":
    "<strong>Cohere Rerank 4</strong> —— <code>rerank-v4.0-pro</code> 与 <code>rerank-v4.0-fast</code> 取代 v3.5；32k 上下文，按次检索计费",
  "<strong>Voyage rerank-2.5</strong> — 32k context and instruction following; the index table's per-doc pricing was wrong and is now per token":
    "<strong>Voyage rerank-2.5</strong> —— 32k 上下文并支持指令跟随；对比表此前按文档计价有误，现已改为按 token",
  "<strong>Jina v3 numbers firmed up</strong> — 0.6B, 61.94 BEIR nDCG@10, 64 docs in a 131K context":
    "<strong>Jina v3 数据落实</strong> —— 0.6B，BEIR nDCG@10 61.94，131K 上下文内 64 篇文档",
  "<strong>Honest Qwen3 rows</strong> — dropped an unverifiable \"~75+\" figure for the 8B; reports put the 4B slightly ahead of it":
    "<strong>Qwen3 行如实修正</strong> —— 移除 8B 无法核实的「~75+」数字；有报告显示 4B 反而略优于它",
  "<strong>Design refresh</strong> — fluid type scale, a real elevation ramp, and one focus-visible treatment site-wide":
    "<strong>视觉改版</strong> —— 流体字号阶梯、成体系的层次阴影，以及全站统一的键盘聚焦样式",
  "_title": "更新日志 — reranker.uk 版本记录 | reranker.uk",
  "_desc": "reranker.uk 发布说明：Demo 功能、新指南、模型对比更新与站点改进。",

  "Changelog": "更新日志",
  "What shipped on reranker.uk — demo improvements, new guides, and site infrastructure.": "reranker.uk 已上线内容 —— Demo 改进、新指南与站点基础设施。",

  "25 Jun 2026 — Low-priority polish": "2026 年 6 月 25 日 — 低优先级打磨",
  "<strong>Guide i18n</strong> — full Chinese body for self-host, scenario, hybrid retrieval, and evaluate guides": "<strong>指南 i18n</strong> —— 自托管、场景选型、混合检索、评测指南全文中文",
  "<strong>Compressed share links</strong> — demo <code>?z=</code> gzip when URLs exceed ~1600 chars": "<strong>压缩分享链接</strong> —— Demo URL 超约 1600 字符时用 <code>?z=</code> gzip",
  "<strong>Preset mobile layout</strong> — 2-column grid on narrow screens": "<strong>预设移动端布局</strong> —— 窄屏 2 列网格",
  "<strong>og:locale</strong> — switches to <code>zh_CN</code> when language toggle is 中文": "<strong>og:locale</strong> —— 语言切换为中文时设为 <code>zh_CN</code>",
  "<strong>Dual-diff a11y</strong> — table caption, row headers, empty state, <code>aria-labelledby</code>": "<strong>双模型差异 a11y</strong> —— 表格 caption、行表头、空状态、<code>aria-labelledby</code>",

  "25 Jun 2026 — Model landscape refresh": "2026 年 6 月 25 日 — 模型版图刷新",
  "<strong>Qwen3-Reranker</strong> — 0.6B / 4B / 8B rows + <a href=\"/models/qwen-reranker.html\">deep review page</a>": "<strong>Qwen3-Reranker</strong> —— 0.6B / 4B / 8B 行 + <a href=\"/models/qwen-reranker.html\">深评页</a>",
  "<strong>Jina v3</strong> — listwise flagship; tiny kept for browser demo": "<strong>Jina v3</strong> —— listwise 旗舰；tiny 保留给浏览器 Demo",
  "<strong>Table adds</strong> — gte-reranker-modernbert-base, NVIDIA nv-rerankqa / Nemotron": "<strong>表新增</strong> —— gte-reranker-modernbert-base、NVIDIA nv-rerankqa / Nemotron",
  "<strong>Self-host / homepage / chooser</strong> — GPU default Qwen3-4B; bge remains CPU path": "<strong>自托管 / 首页 / 选型</strong> —— GPU 默认 Qwen3-4B；bge 仍为 CPU 路径",
  "<strong>Score footnotes</strong> — MTEB-R* vs classic BEIR; next review Oct 2026": "<strong>分数脚注</strong> —— MTEB-R* vs 经典 BEIR；下次复核 2026 年 10 月",

  "25 Jun 2026 — Minimal polish pack": "2026 年 6 月 25 日 — 最小打磨包",
  "<strong>Honest benchmarks</strong> — emerging rows use ≈ / n/a; next review Sep 2026; pricing lag disclaimer": "<strong>诚实基准</strong> —— 新兴行用 ≈ / n/a；下次复核 2026 年 9 月；价格滞后说明",
  "<strong>Demo max_length</strong> — 256 / 384 / 512 tokens; char warnings follow selection": "<strong>Demo max_length</strong> —— 256 / 384 / 512 token；字符警告随选择变化",
  "<strong>Lazy transformers.js</strong> — loaded on first Rerank only": "<strong>按需加载 transformers.js</strong> —— 首次点重排序才加载",
  "<strong>Instruction-rerank guide</strong> — <a href=\"/guides/instruction-reranker.html\">task-shaped ranking</a>": "<strong>指令 rerank 指南</strong> —— <a href=\"/guides/instruction-reranker.html\">任务导向排序</a>",
  "<strong>Homepage</strong> — beyond five families + links to ColBERT / instruction guides": "<strong>首页</strong> —— 不止五大家 + ColBERT / 指令指南链接",

  "25 Jun 2026 — Content expansion &amp; polish": "2026 年 6 月 25 日 — 内容扩展与打磨",
  "<strong>Models table</strong> — architecture column; Qwen3-Reranker, Contextual AI, ColBERTv2, ms-marco browser rows": "<strong>模型表</strong> —— 架构列；Qwen3-Reranker、Contextual AI、ColBERTv2、ms-marco 浏览器行",
  "<strong>Late-interaction guide</strong> — <a href=\"/guides/late-interaction-rerank.html\">ColBERT &amp; when to skip cross-encoder rerank</a>": "<strong>Late-interaction 指南</strong> —— <a href=\"/guides/late-interaction-rerank.html\">ColBERT 与何时跳过 cross-encoder rerank</a>",
  "<strong>Demo presets</strong> — E-commerce + Multilingual (7 scenarios); ms-marco <code>?m=</code> on models table": "<strong>Demo 预设</strong> —— 电商 + 多语言（7 个场景）；模型表 ms-marco <code>?m=</code>",
  "<strong>JSON-LD</strong> — <code>inLanguage</code> follows zh/en toggle": "<strong>JSON-LD</strong> —— <code>inLanguage</code> 随中/英切换",
  "<strong>Changelog RSS</strong> — <a href=\"/changelog.rss\">/changelog.rss</a> feed": "<strong>更新日志 RSS</strong> —— <a href=\"/changelog.rss\">/changelog.rss</a> 订阅",

  "25 Jun 2026 — i18n &amp; SEO completion": "2026 年 6 月 25 日 — i18n 与 SEO 补全",
  "<strong>Model page i18n</strong> — pills, TOC, meta dates, Pros/Cons, Other models for all five families": "<strong>模型页 i18n</strong> —— 五个模型家族的标签、目录、日期、优缺点、其他模型",
  "<strong>Changelog + Privacy i18n</strong> — full Chinese body on both pages": "<strong>更新日志 + 隐私 i18n</strong> —— 两页全文中文",
  "<strong>hreflang</strong> — <code>en</code>, <code>zh-Hans</code>, <code>x-default</code> on every page (same URL, client-side toggle)": "<strong>hreflang</strong> —— 全站 <code>en</code>、<code>zh-Hans</code>、<code>x-default</code>（同 URL，客户端切换）",
  "<strong>og:locale:alternate</strong> — swaps with primary locale on language toggle": "<strong>og:locale:alternate</strong> —— 随语言切换与主 locale 对调",

  "23 Jun 2026 — Medium-priority UX &amp; content": "2026 年 6 月 23 日 — 中优先级体验与内容",
  "<strong>Self-host guide</strong> — <a href=\"/guides/self-host-reranker.html\">sentence-transformers, serving, ops</a>": "<strong>自托管指南</strong> —— <a href=\"/guides/self-host-reranker.html\">sentence-transformers、服务化、运维</a>",
  "<strong>Scenario guide</strong> — <a href=\"/guides/choose-reranker-scenario.html\">RAG vs support vs legal vs code</a>": "<strong>场景指南</strong> —— <a href=\"/guides/choose-reranker-scenario.html\">RAG / 客服 / 法律 / 代码</a>",
  "<strong>Passage char counts</strong> — per-list stats + 512-char truncation warning": "<strong>段落字符统计</strong> —— 列表统计 + 超 512 字警告",
  "<strong>New presets</strong> — Technical docs, Code search": "<strong>新预设</strong> —— 技术文档、代码检索",
  "<strong>CSV export</strong> — Copy CSV alongside JSON and Markdown": "<strong>CSV 导出</strong> —— 与 JSON、Markdown 并列的复制 CSV",
  "<strong>Light theme</strong> — toggle in nav, persisted in <code>localStorage</code>": "<strong>浅色主题</strong> —— 导航栏切换，<code>localStorage</code> 持久化",

  "23 Jun 2026 — Demo UX round 2": "2026 年 6 月 23 日 — Demo 体验第二轮",
  "<strong>Model loading panel</strong> — progress %, ETA, file name, cache status": "<strong>模型加载面板</strong> —— 进度 %、ETA、文件名、缓存状态",
  "<strong>JSON passages</strong> — paste a JSON array or <code>{ \"passages\": [...] }</code> object": "<strong>JSON 段落</strong> —— 粘贴 JSON 数组或 <code>{ \"passages\": [...] }</code> 对象",
  "<strong>Dual-model diff view</strong> — aligned table with score and rank deltas": "<strong>双模型差异视图</strong> —— 对齐表格，含分数与名次差",
  "<strong>Models table</strong> — sort, filter, and jump to demo with <code>?m=</code>": "<strong>模型表</strong> —— 排序、筛选，<code>?m=</code> 跳转 Demo",
  "<strong>Mobile passage editor</strong> — add/remove list on small screens": "<strong>移动端段落编辑</strong> —— 小屏增删列表",
  "<strong>Error hints</strong> — classified messages for network, WebGPU, memory, and limits": "<strong>错误提示</strong> —— 网络、WebGPU、内存、限制等分类消息",
  "<strong>Changelog + Privacy</strong> — this page and a short privacy statement": "<strong>更新日志 + 隐私</strong> —— 本页与简短隐私说明",
  "<strong>Nav</strong> — Home and Guides links in the top bar": "<strong>导航</strong> —— 顶栏首页与指南链接",

  "23 Jun 2026 — Full release (plan items 1–5, 7–10)": "2026 年 6 月 23 日 — 完整发布（计划项 1–5、7–10）",
  "Build system: <code>src/partials</code> + <code>src/pages</code> → <code>scripts/build.mjs</code>": "构建系统：<code>src/partials</code> + <code>src/pages</code> → <code>scripts/build.mjs</code>",
  "Demo: three-column results, bi-encoder proxy, dual-model compare, WebGPU, URL sharing": "Demo：三列结果、bi-encoder 代理、双模型对比、WebGPU、URL 分享",
  "Guides index, hybrid retrieval, evaluate rerankers": "指南索引、混合检索、评测 reranker",
  "Models: Last verified June 2026, chooser cards, mxbai on homepage": "模型：2026 年 6 月核验、选型卡片、首页 mxbai",
  "i18n: <code>data-i18n</code> keys + shared dictionary; EN/中文 toggle": "i18n：<code>data-i18n</code> 键 + 共享词典；EN/中文 切换",
  "Footer GitHub link; sticky nav; aria-live status": "页脚 GitHub 链接；粘性导航；aria-live 状态",

  "21 Jun 2026 — Initial launch": "2026 年 6 月 21 日 — 首次上线",
  "Educational guides on rerankers, cross- vs bi-encoder, and RAG": "reranker、cross- vs bi-encoder、RAG 教育指南",
  "Model comparison pages for bge, Cohere, Jina, Voyage, mxbai": "bge、Cohere、Jina、Voyage、mxbai 模型对比页",
  "In-browser cross-encoder demo with transformers.js": "基于 transformers.js 的浏览器内 cross-encoder Demo",
  "Deployed on Cloudflare Workers (static assets)": "部署于 Cloudflare Workers（静态资源）",

  "Try the demo →": "试用 Demo →",
}};
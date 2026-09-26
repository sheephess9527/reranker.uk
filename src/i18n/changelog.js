window.I18N_PAGE = { zh: {
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
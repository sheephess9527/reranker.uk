# 给 Claude 的交接（2026-10-14 夜）

Grok 刚改完首页。先读完这一份，再读 [README.md](README.md) 的 Build 一节。**不要重做下面「已完成」里的事。**

用户要的是：继续优化 [reranker.uk](https://reranker.uk)，改动写进本文件（做完一项就划掉，并在 changelog 留一条）。交流用中文，代码和页面英文原文保持现有文风。

## 仓库铁律

- **只改 `src/`。** `public/*.html`、`public/sitemap.xml`、`public/llms.txt` 由 `npm run build` 生成，手改会被覆盖。例外：`public/assets/**`、`public/robots.txt`、`public/changelog.rss` 直接改。
- 改了英文句子，必须在对应的 `src/i18n/<page>.js` 里加译文。键是该元素**规范化后的 inner HTML**（旧页面）或 `data-i18n-html` 的 key（首页流程图）。漏译跑 `node scripts/check-zh-coverage.mjs` 能看出来。
- 数字不手写进页面。带出处的数走 `data/models.json` 的 `{{fact:...}}`，见 README「Maintaining benchmarks」。
- 提交前：`npm run build && npm run check:links && npm run check:ld && npm test`。`check:zh` 是提示，不是失败门，但新增正文不能留英文。
- 厂商动作（新模型、调价、弃用）还要在 `/news` 加一条：`src/pages/news.html`、`src/i18n/news.js`、`public/news.rss` 三处一起改，规则同 changelog。
- 改 changelog 时三处一起改：`src/pages/changelog.html`、`src/i18n/changelog.js`（键必须和英文 inner HTML 逐字相同，含弯引号 `“”` 和 `—`）、`public/changelog.rss`（最新条目放最上面，`guid` 用页面上那个 `h2` 的 id）。`tests/feed.spec.js` 会核对。

## 已完成（不要重做）

首页流程图原先把 **「top 50–100」标在进入检索器的箭头上**，把 **「top 5–10」标在进入重排序器的箭头上**。这两个数是每一级的**输出**，不是输入。手机上整张 SVG 被缩到大约 7px，标签还和方框叠在一起。

现在改成 HTML 流程图（桌面横向、≤720px 纵向）：

1. Query
2. Retriever → **returns 50–100**
3. Reranker（高亮）→ **keeps the top 5**
4. LLM

另外首页「Start here」下面加了 **Jump to the job**：按场景选型、国内重排序、成本计算器、重排序没起作用。这四页本来就有，首页没链过去。

中文导航按钮和主题切换的 `aria-label` 不再写死英文（`public/assets/js/main.js`，看 `<html lang>`）。

| 文件 | 改了什么 |
|---|---|
| `src/pages/index.html` | 任务入口 + 新流程图，删掉错误的 SVG |
| `src/i18n/home.js` | 新文案的中文；`pipeline.*` 键换了一套 |
| `public/assets/css/style.css` | `.pipeline` / `.pipe-step`，手机纵向 |
| `public/assets/js/main.js` | 菜单和主题按钮的中文无障碍名称 |
| `src/pages/changelog.html` | 条目 `#2026-10-14-home` |
| `src/i18n/changelog.js` | 上面这条的中文 |
| `public/changelog.rss` | 对应 `<item>`，`pubDate` 2026-10-14 18:00 GMT |

图注现在的英文是：`The retriever is what returns 50–100 candidates. The reranker is what cuts that list to the top 5 before the LLM sees it.`

## 下一轮（按顺序做，做完一项再做下一项）

每一项做完：划掉本段、按上面的铁律写 changelog、跑检查。不要顺手改无关文案，不要换模型分数。

### ~~1. 模型对比表在手机上横滑时，模型名会滑走~~（2026-10-14 已完成）

> 完成：`.table-sticky`（只加在 `/models/` 的表上），≤960px 时外框 `max-height: 78vh` 双向滚动，表头 `top: 0`、模型名列 `left: 0` 粘住，实色 `--bg-elev` + 右侧 1px 分隔，列宽 8.5rem 允许换行。`tests/models-table.spec.js` 在 390×844 下核对，已加进 `npm test`。桌面端不变。
>
> 顺带修了全站的手机边距：`.section { padding: 2.75rem 0 }` 写在 `.container` 后面，把所有 `section container`（首页、更新日志、Demo）的左右 20px 边距清成了 0，首页流程图在手机上因此贴边。现在 `.section` 只设上下内边距。

`/models/` 的表列很多。390px 宽时向右滑，第一列（模型名）离开视口，后面的分数对不上是谁。

- 看 `src/pages/models/index.html` 的表结构，样式写在 `public/assets/css/style.css` 的 `.table-wrap`。
- 第一列 `position: sticky; left: 0`，背景用实色 `--bg-elev`（不能透），右侧加 1px 分隔。表头也要粘住。
- 完成标准：390×844 下横滑时模型名一直可见；`tests/a11y.spec.js` 仍过（粘性单元格的对比度不能比现在差）；中英文页面都生效（样式是全局的）。
- 不要把表改成卡片堆，桌面端现在的表是对的。

### ~~2. 指南目录没有阅读顺序~~（2026-10-14 已完成）

> 完成：`/guides/` 拆成「Read these in order」（`<ol class="reading-path">`，标题前自动编号 1–5）和「Already have a specific question?」两组，URL 未变，卡片原文和译文不动，只新增两组的 h2/p 译文。卡片放进 `li` 后被正文链接的下划线规则套上了，规则改为 `a:not(.btn, .card)`。
>
> 顺带修了全站手机边距的另一半：`.hero`、`.article`、`.demo-wrap` 也用 `padding: X 0` 盖掉了 `.container` 的 20px，所有指南和模型页的正文在手机上贴着屏幕边。现在都只设上下内边距；`tests/mobile-layout.spec.js` 在 390px 下逐页检查左右至少 16px、页面不横向滚动（在旧样式上 50 页全部失败）。

`src/pages/guides/index.html` 现在是一格一格平铺。拆成两组，URL 不要改：

- **按这个顺序读**：what-is-a-reranker → cross-encoder-vs-bi-encoder → rerank-rag → hybrid-retrieval-rerank → evaluate-reranker
- **你已经有具体问题**：choose-reranker-scenario、rerank-in-china、reranking-not-working、rerank-cost-calculator、self-host-reranker、rerank-vector-database、late-interaction-rerank、instruction-reranker，再加上 demo

译文在 `src/i18n/guides-index.js`。新的 `<h2>` / `<p>` 都要有中文键。

### ~~3. 全站没有站内搜索~~（2026-10-15 已完成）

> 完成：`build.mjs` 每页生成一条索引（`l` 语言、`u` 链接、`t` 页面 h1、`d` description、`h` 各 h2，fact 已解析；更新日志的 h2 不收），写到 `public/search-index.json`（约 21 KB，已加入 `LOCALE_NEUTRAL`）。导航右侧加了搜索按钮，面板在 header 里；逻辑在 `main.js`：首次打开才拉索引，`/` 打开（在输入框里打字不触发），Esc 关闭并把焦点还给按钮，上下方向键在结果间移动，每个词都必须命中，标题 > h2 > 简介加权。按钮和输入框的中文用新支持的 `data-i18n-placeholder` 和 shared 键。`tests/search.spec.js`：英文搜 Cohere 第一条是模型页、`/zh/` 搜百炼命中国内指南且只返回中文页、输入框里按 `/` 不触发。面板打开时 axe 无问题。

22 页英文 + 22 页中文，导航只有 Home / Guides / Models / Demo。

- 在 `scripts/build.mjs` 里从现有页面 meta（title、description、url）生成 `public/search-index.json`。这个文件是全站一份，加进 `LOCALE_NEUTRAL`，否则中文页会把链接改成 `/zh/search-index.json`。
- 搜索框放在 `src/partials/nav.html`，逻辑放 `public/assets/js/main.js`。`/` 聚焦，Esc 关闭。纯客户端，不要后端。
- 中文页只搜中文结果，英文页只搜英文结果（索引用 `locale` 字段区分）。
- 完成标准：搜 “Cohere” 能进模型页，搜 “百炼” 在 `/zh/` 能进国内指南；`npm test` 里加一条键盘用例，不要另起一套测试框架。

### ~~4. 第一次访问不跟系统主题~~（2026-10-15 已完成）

> 完成：`head-open.html` 的内联脚本和 `main.js` 一起改：`rr_theme` 存了 `light`/`dark` 就照它；没存时跟随 `prefers-color-scheme`，系统切换时也跟着变（只在没存过时）。内联脚本的 CSP 哈希由 `build.mjs` 的 `writeHeadersFile()` 自动重算。测试辅助 `setTheme` 现在把 dark 也显式存进 `rr_theme`（Playwright 默认模拟浅色系统，不存的话 dark 用例会变成浅色）。`tests/theme.spec.js` 覆盖：浅色/深色系统首访、已存选择优先、切换后跨页保持、系统变化只在未存时生效。
>
> 下一轮四项全部完成。

现在只要 `localStorage` 里没有 `rr_theme`，就一律深色。`src/partials/head-open.html` 里的内联脚本和 `public/assets/js/main.js` 的 `applyTheme` 要一起改：没有存过选择时，跟随 `prefers-color-scheme`。用户点过切换之后仍然以 `rr_theme` 为准，不要把已经存过的人改掉。

### ~~5. CSP 从 report-only 改为强制执行~~（2026-10-15 已完成）

> 完成：用户在国内网络下打开 `/zh/demo`，控制台无 CSP/CORS 报错、Demo 正常加载；每日真实网络检查自 9 月 27 日起一直通过。`build.mjs` 的 `writeHeadersFile()` 现在输出 `Content-Security-Policy`（不再带 `-Report-Only`），策略内容不变。`demo-smoke-daily.yml` 的 `headers` 任务改查强制头，并新增 `live-csp` 任务（`npm run test:live`，`tests/live-csp.real.spec.js`）：每天从线上逐页加载 sitemap 里的所有页面，有任何违规就失败。改 `_headers` 前先用 `headers_base` 指向预览部署跑一次。

## 第三轮（2026-10-15 用户说「都做」，按顺序）

### ~~6. 静态资源缓存~~（2026-10-15 已完成）

> 完成：`build.mjs` 的 `versionAssets()` 给页面里所有 `/assets/` 地址加 `?v=<内容哈希前 10 位>`；`_headers` 给 `/assets/css|js|og/*` 一年 `immutable`，`/assets/img/*` 一天（`site.webmanifest` 里的图标没有版本号）。`scripts/serve.mjs` 支持 `/assets/css/*` 这类前缀匹配。`tests/asset-cache.spec.js` 检查页面上没有不带版本号的资源地址、本地响应头正确；`demo-smoke-daily.yml` 的 `headers` 任务检查线上的 Cache-Control。脚本里不要自己去加载 `/assets/` 下的文件（那样拿不到版本号）。

### ~~7. 给表里有但没有详情页的模型补页面（先 zerank-2、Qwen3-VL）~~（2026-10-15 已完成）

> 完成：新增 `/models/zerank` 和 `/models/qwen3-vl-reranker`（中英文、meta、JSON-LD、社交卡片），结构照现有模型页。所有数字都新进了 `data/models.json`（46 个，来源是 ZeroEntropy 模型卡与文档、Qwen3-VL-Reranker 模型卡，每个 check_pattern 都在抓下来的原文上验证过只命中一次）。模型对比表、页脚、Qwen 页里的链接改指向新页面。zerank-2 的许可证矛盾（模型卡 Apache 2.0，文档仍写非商业）在页面上写明；HF 上 `zeroentropy/zerank-2` 会重定向到 `zerank-2-reranker`，代码用后者。表里其余没有专页的（Contextual、NVIDIA、GTE、LightOn）以后再补。

### ~~8. 入门五篇指南加「上一篇 / 下一篇」~~（2026-10-15 已完成）

> 完成：`build.mjs` 的 `readingPathPager()` 从 `src/pages/guides/index.html` 的 `ol.reading-path` 读顺序，在这五篇的 `.cta-band` 前插入 `nav.guide-pager`（「阅读路线：第 n 篇，共 5 篇」+ 上一篇/下一篇，最后一篇的下一篇指回 `/guides/`）。标题取相邻页面自己的 h1，中文页用对方词典里的译文；按钮文字是 shared 键 `shared.pager.*`。要改顺序只改指南索引那个列表。样式 `.guide-pager`（≤560px 纵向）。`tests/guide-pager.spec.js` 中英文各走一遍路线。

### ~~9. 更新日志太长~~（2026-10-15 已完成）

> 完成：没按「近三个月」做——那样 46 条里只会折叠 6 月的 9 条（10 月一个月就有 29 条）。改为 `build.mjs` 的 `foldChangelog()`：最新 10 条（`CHANGELOG_OPEN`）展开，其余按月份各放进一个 `<details class="changelog-month">`，标题如「Earlier in October 2026 (n entries)」/「2026 年 10 月更早的更新（n 条）」，日期取 h2 的 id。条目仍在页面里、id 不变，所以 RSS 链接照常；`main.js` 在打开 `#id` 或 hash 变化时展开对应月份并滚过去。源文件照旧按时间倒序写，不用手动挪。`tests/changelog.spec.js` 覆盖折叠、链接到旧条目、中文标题；`feed.spec.js` 不受影响。
>
> 第三轮四项全部完成。

## 第四轮（2026-10-16 用户说「好的」：把监控里有、网站上没有的补上，按顺序）

### ~~10. Pinecone 和 Amazon Bedrock~~（2026-10-16 已完成）

> 完成：模型对比表加 `#amazon-bedrock`、`#pinecone` 两行；向量数据库指南「When the database reranks for you」下加 `#pinecone` 小节（三个模型的限制和套餐、3.5 已由 4-fast 响应、Cohere 跑在 Azure）；Cohere 页加一段云平台渠道。13 个新数字进 `data/models.json`（`amazon-bedrock-rerank`、`pinecone-rerank`）。Bedrock 的 Amazon Rerank 价格在页面上是 JS 渲染的，事实里的 check_url 是 AWS 价目表 JSON（`priceOf` 键 `lCmRnze6…`，每次查询 $0.001），`check_raw`。顺带：`caveman-so/trim-1` 不是重排序模型，进 `hf_seen`；`Alibaba-NLP/core-reranker-*` 读过模型卡，是做图文组合匹配的研究模型（CC-BY-4.0、代码链接是占位符），不收录。

### ~~11. ZeroEntropy：zerank-2-small / nano，成本计算器加 ZeroEntropy、Bedrock、Pinecone~~（2026-10-16 已完成）

> 完成：计算器加了 zerank-2（按 token，计法同 Voyage，页面注明是假设）、Bedrock 的 Amazon Rerank 1.0（每次查询 ≤100 篇）、Pinecone 的 v0 / bge（每次请求 ≤100 篇），价格都走 `data-*` 属性里的 fact；`tests/cost-calculator.spec.js` 加了 100 / 250 篇的分段用例。故意不加：Bedrock 上的 Cohere 3.5（AWS 页面同时写 500 和 512 token，自相矛盾）、Pinecone 上的 Cohere（「rerank unit」没有定义）。zerank 页写明 zerank-2-small / nano 已列出但无价格和模型卡。

### ~~12. Contextual AI：v2 mini 和 v1~~（2026-10-16 已完成）

> 完成：真正的缺口比「少两个型号」大——表里只有非商用的开源权重，商用唯一的路（托管 API）没提，选型指南还写着「非商用场景也可用」。加了 `#contextual-api` 一行（v2、v2-mini、v1，$0.05 / $0.02 每百万 token，单次查询+指令+文档 8,000 token），指令跟随指南加一条托管 API，选型指南改成「权重非商用，或用托管 API」，计算器加 v2 和 v2-mini（token 计法同 ZeroEntropy，注明是假设）。4 个新 fact（`contextual-rerank-api`）。API 的 v2 / mini 对应开源的 1B/2B/6B 哪个，官方没说，页面不写。

### ~~13. Contextual、GTE、LightOn 详情页；首页模型卡片补上 zerank-2、Qwen3-VL~~（2026-10-16 已完成）

> 完成：新增 `/models/lighton-rerank`、`/models/gte-reranker`（两个 GTE 合一页）、`/models/contextual-rerank`，中英文、meta、JSON-LD、社交卡片齐全；模型表、页脚、首页「另见」都链过去，首页卡片加 zerank-2 和 Qwen3-VL（共 8 张）。13 个新 fact：LightOn 全家 ViDoRe V3（LightOn 自己同一流程重测，含 Qwen3-VL-8B/2B、jina-m0、第一阶段基线，放在 `lighton-run`）和 LW-2B/LW-4B 的 BEIR，GTE ModernBERT 的 LoCo / CoIR。Contextual 只以图表公布分数，页面写明不标数字。注意：LightOn 测的 Qwen3-VL-8B ViDoRe V3 是 64.23，Qwen 自己卡上是 66.7，两边页面都注明是谁测的。

### ~~14. NVIDIA 页（10 月 20 日 Nemotron-3.5-Rerank-8B 正式发布后，连同 VL-1B）~~（2026-10-23 已完成）

> 完成：新增 `/models/nvidia-rerank`（中英文、meta、JSON-LD、社交卡片），四个模型一页：Nemotron-3.5-Rerank-8B（8.38B，Ministral-3-8B，文本/页面图片/两者，32,768 token，OpenMDW-1.1）、llama-nemotron-rerank-vl-1b-v2（约 1.7B，NVIDIA Open Model License）、llama-nemotron-rerank-1b-v2（文本，26 种语言，8192 token，OpenMDW-1.1）、500M（只有 NIM，无 HF 模型卡）。31 个新 fact（`nemotron-3.5-rerank-8b`、`nvidia-rerank-run`、`llama-nemotron-rerank-vl-1b-v2`，以及 `llama-nemotron-rerank-1b-v2` 补 5 个），来源是三张模型卡、NVIDIA 博客（ViDoRe v3.1 排行榜 60.49 / 59.17）和 NIM 支持矩阵；每个 check_pattern 都在抓下来的原文上验证过只命中一次。模型表加两行（`#nvidia-rerank`），1B 行改链到新页；选型指南「扫描件」一节、页脚、首页「另见」都加了。注意：同一个 Qwen3-VL-Reranker-8B 的 ViDoRe V3，Qwen 自测 66.7、LightOn 64.23、NVIDIA 66.02（图片），页面写明谁测的；1B 流水线的 MLDR 在两张 NVIDIA 卡上不一致（70.69 / 68.49），没有收录。8B 的 NIM 博客里有链接，但 10 月 23 日 NIM 支持矩阵仍未列出。

## 第五轮（2026-11-01 用户选了四项：「做完照旧验证后自动合并」）

### ~~15. 链接检查扛住临时故障~~（2026-11-01 已完成）

> 完成：`check-external-links.mjs` 把 5xx / 429 / 网络错误（重试后仍失败）记为警告（GitHub 上是 `::warning::` 注释），同一个链接连续 `TRANSIENT_DAYS`（默认 3）天都这样才算失败；4xx 仍立即失败，厂商数字检查（`check-sources`）不受影响。首次失败日期存在 `.link-health.json`（`LINK_HEALTH_FILE`），`demo-smoke-daily.yml` 的 `sources` 任务用 `actions/cache/restore|save@v5` 在每天之间传递（key 带 run_id，restore-keys 取最新一份）。判定逻辑是导出的 `judge()`，`tests/link-health.spec.js` 已加进 `npm test`。

### ~~16. 补齐中文页漏译~~（2026-11-01 已完成）

> 完成：真正漏的是 20 处短文本（`check-zh-coverage` 只看 40 字以上，所以没报）：模型表的 Voyage 价格（两个旧键是写死数字的，源文件改用 fact 后失配）和「not published*」「GPU required」「(browser)」，Cohere / Voyage / mxbai 页的 token 上限，Qwen 页的「GPU recommended」，三篇指南的「Keep reading」。之前说的「mxbai 三处」是 `check:i18n`（正则粗查）的误报，那三处早就译了。`check-zh-coverage` 现在第二遍逐个比对表格单元格 / 标题 / pill / 列表项：和英文页一字不差、又含普通小写英文单词的就报；故意保留英文的名字（「v3.5 listwise」）在词典里写成键=值即可。CJK 标点也算中文，原来 5 条误报清零。仍然只是提示，不是失败门。Voyage 免费额度在中文里写成「2 亿」（没有 zh 版 fact，沿用已有做法）。

### ~~17. 旧 PR #2（Cloudflare 自动配置）~~（2026-11-01 已关闭）

> Cloudflare 机器人 6 月 20 日开的，只加 `.gitignore` 和 `wrangler.jsonc`，后者 `assets.directory` 是 `.`（会把整个仓库，包括 `src/`、`scripts/`、`data/` 当静态文件发布）。main 上早有自己的 `wrangler.jsonc`（`./public`、`404-page`、`auto-trailing-slash`），两个文件都会冲突。用户同意后关闭，PR 里留了原因；`cloudflare/workers-autoconfig` 分支没删。只是仓库清理，网站没变，所以不写 changelog。
>
> 第五轮四项全部完成。

### ~~18. 盯 pinecone-rerank-v0~~（2026-11-01 已完成）

> 完成：`watch-releases.mjs` 的 vendor 页面支持反向检查：`expect`（站上推荐的型号必须还在页面上）和 `retired`（`{id}` 附近出现 deprecated / retired / end of life 就报，ID 取 `retired_ids` 或 `expect`）；页面一个 ID 都没匹配到时不做反向检查（页面挪了不等于下架）。「Pinecone hosted rerankers」加了 `expect` 三个型号；新增「Pinecone changelog」（`/release-notes/2026`，Pinecone 7 月就是在这里宣布 cohere-rerank-3.5 弃用的），只查 `retired`。**这个 URL 按年份，2027 年 1 月要改成 `/release-notes/2027`。** 模型总览页已经没有 v0，不监控它。实跑 baseline：两页都没有缺失 / 弃用。处理办法写在 issue 里：改站点后把型号从 `expect` / `retired_ids` 删掉。

## 第六轮（2026-11-05 用户问「还有什么可以提升流量和粘性」，给了 Cloudflare Core Web Vitals 截图）

数据只有 19 个样本（CWV 只统计部分 Chromium 访问，不是访客数）：美国 13、厄瓜多尔 3、乌克兰 1、法国 1、委内瑞拉 1；入口页是 `/models/qwen-reranker`、`/guides/rerank-rag`、`/models/gte-reranker`、`/zh/models/`、`/models/cohere-rerank`。LCP 84% 好 / 16% 需改进 / 0% 差，**那 16% 恰好是厄瓜多尔和委内瑞拉的 3 个样本**，美欧样本全部达标，所以性能不用动。结论：访客以英文、美国为主，入口是具体模型页和 RAG 指南。中文专项（bce-reranker 等）优先级下调（中国访问可能被统计脚本漏掉，这个数据不能证明没有）。

建议清单（用户说「按 1、2、3 开工」后的顺序）：① 对比页 ✅ ② 「重排序动态」页 + 单独 RSS（只放厂商发布和弃用）③ 选型向导 ④ 中文专项 ⑤ 代码块复制按钮、Demo 和计算器的 WebApplication 结构化数据、确认 Google / Bing / 百度站长平台已提交 ⑥ 浏览器里的 NDCG 评测小工具。分发渠道（HN、Reddit、知乎、掘金、V2EX、HF 讨论区）要用户自己发，可以代写稿。

### ~~19. 对比页 `/guides/compare-rerankers`~~（2026-11-05 已完成）

> 完成：新增 `/guides/compare-rerankers`（中英文、meta、JSON-LD、社交卡片）。只在分数来自**同一次评测**时并排：Qwen 自己的评测（Qwen3 0.6B/4B/8B 对 bge-reranker-v2-m3，MTEB-R / CMTEB-R / MMTEB-R / MLDR / MTEB-Code）和 Jina 2026 年的评测（jina-v3.5、mxbai-large-v2、Qwen3 4B / 0.6B，BEIR / MIRACL / RTEB / Struct-IR）；GTE 和 Cohere 没有可对齐的数字，页面直说。所有数字都是已有 fact（没有新增）；规模、许可证、语言来自各模型页已有的文字；托管 API 一表只列价格和上下文（Cohere / Voyage / zerank-2）。一个模型页里没写透的发现：Qwen3-0.6B 的 CMTEB-R 比 bge-v2-m3 低（用 fact 写，不手写数字）。指南目录、页脚、八个模型页（qwen、bge、mxbai、jina、gte、cohere、voyage、zerank）的「Other models」下加了入口。更新日志 `#2026-11-05-compare`。

### ~~20. 「重排序动态」页 `/news` + 单独 RSS~~（2026-11-12 已完成，用户说「做」= ②–⑥ 全做，按顺序）

> 完成：新增 `/news`（`src/pages/news.html`、`src/i18n/news.js`、meta、社交卡片），只放厂商的发布 / 调价 / 下线，每条一小段 + 出处（厂商自己的页面）+ 本站对应页面，从 9 月 30 日 Voyage rerank-3 起共 9 条，数字全走已有 fact。单独的 `public/news.rss`（手改，和 changelog.rss 一样；已进 `LOCALE_NEUTRAL`、llms.txt、页脚，页面 head 里有 alternate）。`tests/feed.spec.js` 现在两个 feed 都核对（条目用同一个 `.changelog-entry h2[id]` 结构，最新条目必须在最上面）。**以后发布监控里凡是厂商动作（新模型、价格、弃用），除了 changelog 还要在 `/news` 加一条：`news.html` + `news.js` + `news.rss` 三处；纯站点维护不放。** 更新日志 `#2026-11-12-news`。剩下：③ 选型向导 ④ 中文专项 ⑤ 复制按钮 / WebApplication 结构化数据 ⑥ NDCG 小工具。

### ~~21. 选型向导 `/reranker-picker`~~（2026-11-12 已完成）

> 完成：新增 `/reranker-picker`（中英文、meta、WebApplication JSON-LD、社交卡片）。四个问题（内容 / 运行位置 / 语言 / 要不要指令），十条建议全部写在 HTML 里（`section.picker-result`，`data-content|run|lang|instr` 列出适用的答案，缺省 = 都适用），`public/assets/js/picker.js` 只负责显示 / 隐藏，所以中文走词典预渲染、不开 JS 时是完整列表。建议的说法都取自场景指南和模型页，没有新数字。**场景指南的推荐变了，这里要跟着改。** 入口：页脚、场景指南开头、llms.txt 的 Tools。`tests/picker.spec.js`（已进 `npm test`）：几组答案对应的建议，48 种组合每种至少一条。更新日志 `#2026-11-12-picker`。剩下：④ 中文专项 ⑤ 复制按钮 / WebApplication 结构化数据 ⑥ NDCG 小工具。

## 发布监控处理记录

- **2026-10-21 Cohere Rerank 5**：Cohere 当天发布（changelog「Announcing Cohere's Rerank 5 Models」）。Cohere 页改为 Rerank 5（新增「What's new in Rerank 5」：校准分数、Context Focus、只支持文本、不支持指令、可用渠道），模型表加 v5 Pro / Fast 两行，首页和表里的卡片更新，代码示例改用 `rerank-v5.0-pro`。3 个新 fact（`cohere-rerank-5`）。**价格还没公布**：页面写「尚未公布」，计算器暂不加；`data/release-watch.json` 新增「Cohere pricing」页面监控（`Rerank N Pro|Fast`，已知 Rerank 4），价格一出现就会报到 release-watch issue，届时补 price fact、计算器选项和价格表行。
- **2026-10-22 Cohere Rerank 5 定价 + Rerank 4 下架价格**：cohere.com/pricing（10 月 21 日 15:03 UTC 更新）给 Rerank 5 标了按 token 的价格：Pro $0.05、Fast $0.02 每百万 token（发布博客同样写明）；同一次更新撤掉了 Rerank 4 的价格卡片（模型仍在 docs 里、未进 deprecations，价格 FAQ 的 search unit 定义还在）。Wayback 快照里没有价格数据，找不到存档出处。处理：新增 `cohere-rerank-5.pro_usd_per_m` / `fast_usd_per_m`（check_raw，内嵌 JSON 里的 inputPrice）和 Model Vault 的 `vault_usd_per_hour` / `vault_usd_per_month`（Rerank 5 Medium $4.00 / $2,500）；`cohere-rerank-4-*.price_per_search` 改为 `check: "manual"` 并写明原因，页面上一律标「last listed / 最后公布价」。计算器加 Rerank 5 Pro/Fast（按 token，计法同 Voyage，注明是假设），Rerank 4 两项保留并改名带「(last listed)」。顺带：sentence-transformers 6.2.0 在 runner 上实跑了自建快速上手（bge-reranker-v2-m3）、GTE、mxbai 和 ColBERT 片段，全部通过，late-interaction 指南改为「在 6.2.0 上跑过」，watch 的 known 改为 v6.2.0。
- **2026-10-24 cross-encoder/ms-marco-MiniLM-L4-v2**（watch 的「popular, never covered」，2022 年的模型，520 万下载）：收录为选型指南「Customer support」里的一句话（L6 太慢时的替代），3 个新 fact（L4 的 TREC DL 19 73.04、每秒 2500 篇，L6 每秒 1800 篇，都取自 L4 模型卡的 sentence-transformers 对比表，V100）；不单独开页、不进模型表。进 `hf_seen`，issue #55 关闭。
- **2026-11-01（巡检暂停 10/24–11/1 后恢复）**：每日真实网络检查 10 月 30、31 日的 `sources` 失败，两处厂商改了页面。① Pinecone 文档把 `cohere-rerank-4-fast` 的每文档上限从 8,192 改成 4,096（`max_tokens_per_doc` 默认 1,024、最大 4,096）——事实值改为 4,096，向量数据库指南自动更新。② NVIDIA NIM 2.4（10 月 29 日文档）开始以 `nvcr.io/nim/nvidia/nemotron-rerank` 提供 Nemotron-3.5-Rerank-8B，默认每对 10,240 token（`NIM_PIPELINE_MAX_SEQ_LEN` 可放到 32,768）；「latest」支持矩阵只剩 8B，三个 llama-nemotron 留在 2.3 版文档（`/nim/nemo-retriever/reranking/2.3/support-matrix.html`）。VL-1B 的 `nim_max_tokens` 改指向 2.3 版，新增 `nemotron-3.5-rerank-8b.nim_default_tokens`；NVIDIA 页改写 NIM 一句；release-watch 的 NIM 监控改用新 URL、正则加上 `nemotron-3.5-rerank-8b-bf16`。另外 issue #57：transformers.js 4.3.2（LFM3 支持、设备列表、随机种子和外部数据下载修复），Demo 用的是 4.3.0，与重排序无关，不升级，`known` 记为 4.3.2。另：`docs.siliconflow.cn` 整站返回 502（根路径也是，持续 2.5 小时以上），国内指南里的硅基流动 API 链接改为官方现用的 `docs.siliconflow.com/cn/api-reference/rerank/create-rerank`（中文版）。
- **2026-11-03 pinecone-rerank-v0 弃用**（issue #61，第 18 项的新检查第一次报警）：Pinecone 重排序文档和模型页（11 月 3 日 00:45 UTC 更新）都加了警告「is deprecated. It still serves rerank requests, but don’t use it for new projects」，模型卡数据 `deprecated: true`；没有停用日期，2026 更新日志里还没写，价格页那一行还在。新 fact `pinecone-rerank.v0_status`（"deprecated"，每天核对那句警告）；模型表、向量数据库指南（表里标注 + 新增一条要点，「两点」改「三点」）、成本计算器（选项名和说明）都写明已弃用，推荐 bge / cohere-4-fast。release-watch：v0 留在 `expect`（从页面上消失时会报，届时从站上删掉），但从两处 `retired_ids` 拿掉，免得每天重报。同一个 issue 里的 `cross-encoder/merged-bge-reranker-large`（sentence-transformers 演示 `CrossEncoder.merge` 的 50/50 合并，英文、512 token，NanoBEIR 均值 0.698 对 v2-m3 的 0.693，作者自己说后选 7 个数据集上的提升置信区间含 0）不收录，进 `hf_seen`。
- **2026-11-05 Pinecone 和 Cohere 改版**（每日真实网络检查 `sources` 失败，9 个数字「not found」）：① Pinecone 在 11 月 5 日 00:18 UTC 重做了文档：`/guides/search/rerank-results` 只剩模型清单（`pinecone-rerank-v0 (deprecated)`），每个模型的限制挪到自己的页面 `/models/<模型>`，写法是表格「Text 1024 tokens per query and document pair, 100 documents per request」，数字全部没变（v0 512/100，bge 1024/100，cohere-4-fast 4096 每文档、250 篇）。七个 `pinecone-rerank` 事实的来源和 `check_pattern` 改到各模型页；cohere-4-fast 的 4,096 在页面上写成 `4096`，所以那条 pattern 不用 `{value}`；`v0_status` 的警告句现在只在 v0 模型页上。② Cohere 价格页的 Model Vault 表改成每种 GPU 的每小时价（L4 24GB 按需 $3.00、促销 $1.00 到 2027-03-31，GB200 $12.50），不再有 Rerank 5 Fast/Pro Medium 的 $4.00/小时、$2,500/月：删掉 `vault_usd_per_hour` / `vault_usd_per_month`，新增 `vault_l4_usd_per_gpu_hour`（$3.00），Cohere 页那一行改写。Rerank 5 的每 token 价格没变（`pro_usd_per_m` / `fast_usd_per_m` 仍然通过）。更新日志 `#2026-11-05-vendors`。
- **2026-11-10 hindsight-ai/hs-decide-1-flash**（issue #64，HF 新 `text-ranking` 模型，17 赞）：不收录。Hindsight（vectorize-io 的智能体记忆系统）的 0.8B「决策模型」（Qwen3.5-0.8B，Apache 2.0）：给一个状态和若干类型化问题（choice / score / noul），一次前向返回每个选项的概率，要配它自己的 vLLM 插件（`/v1/systemone` 接口）才能用，不是给段落排序的 reranker；模型卡的评测只有图片，没有文字数字，没有厂商以外的出处。进 `hf_seen`。同一天另有一次误报式失败：11 月 8 日定时检查的 `sources` 因 `github.com/mixedbread-ai/mxbai-rerank` 返回 HTTP 504 没能核对 mxbai 的 12 个数字，不是厂商改数字；当天在 main 上重跑全部通过，没改站点。
- **2026-11-10 用户问「最近都没有新模型要收录吗」→ 放宽门槛重查，发现监控漏了 `hindsight-ai/hs-rerank-1`**：我把 `text-ranking` 或名字带 rerank 的模型按「10 月 20 日以来、不设赞数门槛」列了一遍（131 个，绝大多数是个人微调、ONNX/GGUF 量化、领域专用），问题出在门槛：非跟踪机构要 ≥10 个赞才报，`hs-rerank-1`（10 月 28 日，5 个赞，**两周 60 万次下载**）因此被漏了；同一家的 `hs-decide-1-flash`（17 赞）反而报了，那个不是 reranker。读了厂商模型卡：Hindsight AI 做的多语言 cross-encoder（114M 参数，其中 98M 是词嵌入表，transformer 只有 15M；mmBERT-small 微调；8,192 token；en/es/fr/de/pt/ja/ko/zh；MIT；int8 ONNX 给 CPU，TEI 可部署），评测只有图片 `assets/benchmarks.png`，**没有文字数字**。处理：收录，但不写分数、不单开页——模型对比表加 `#hs-rerank-1` 一行（「not published*」），横向对比页的「规模、许可证」表和「先说结论」加了它，4 个新 fact（`hs-rerank-1`：params / embedding_params / transformer_params / context_tokens，都从模型卡 README 核对）。60 万下载量**不写进页面**：下载量里有多少是 Hindsight 自己安装带来的无法判断。监控改动：新增 `hf_new_min_downloads`（5,000），新模型满足「赞数 ≥10 或下载 ≥5,000」就报（`scripts/watch-releases.mjs`）。另外读了两个：`Asteromorph/AsteroRank-Lepton`（Qwen3.5-4B 微调，CC BY-NC 4.0，下载 28 次，BRIGHT 图表和博客里的「SOTA」说法无法核对，它说还有 Drachma / Talent 两个更强的型号——**以后留意**）、`airun-ai/GlanceRAG-MiMo-9B-Reranker`（LoRA 适配器 + pointer head，论文 arXiv 2610.40454，「不是独立模型」）都不收录，三个都进 `hf_seen`。其余 128 个没逐个读卡，都是个人微调、量化转换或领域专用（小说、围棋、希伯来语问答等）。更新日志 `#2026-11-10-hs-rerank`。
- **2026-11-12 sentence-transformers v6.3.0**（issue #67）：发布说明是多向量（token pooling 感知的训练 / Matryoshka loss）、可选 kernels、AWS Neuron 和工具函数，加一条多向量 loss 打分的兼容性说明。站上用的接口没变：在 runner 上装 `sentence-transformers==6.3.0` 实跑了自建快速上手（bge-reranker-v2-m3）、GTE、mxbai 的 `CrossEncoder` 片段和 late-interaction 指南的 `MultiVectorEncoder`（colbertv2.0）片段，全部通过。只把 watch 的 `known` 改为 v6.3.0，不改页面、不写更新日志。
- **NVIDIA Nemotron-3.5-Rerank-8B**：评测结果其实在 10 月 20 日 21:28 UTC 就加进了模型卡（commit「add evaluation results」），10 月 21 日那次复查漏看了。10 月 23 日补上，见上面第 14 项；进 `hf_seen`，issue #47 关闭。

### 明确不要做

- 不要改 `data/models.json` 里的分数，除非 `npm run check:sources` 证明厂商页面上的数字变了。
- 不要为了「好看」重写 `public/assets/css/style.css` 的 token。对比度是用 axe 卡过的（浅色主题的 `--accent` 特意用了 teal-700）。
- 不要把 Demo 的打分数学改了。`public/assets/js/demo.js` 里的 token-overlap 和 cross-encoder 路径有 `tests/demo.smoke.spec.js`（mock）和 `tests/demo.smoke.real.spec.js`（真模型，要联网）。
- 不要新增 npm 依赖，除非这一项离开它就做不了。构建只用 `node-html-parser`。

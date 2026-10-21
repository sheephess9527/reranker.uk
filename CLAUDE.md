# 给 Claude 的交接（2026-10-14 夜）

Grok 刚改完首页。先读完这一份，再读 [README.md](README.md) 的 Build 一节。**不要重做下面「已完成」里的事。**

用户要的是：继续优化 [reranker.uk](https://reranker.uk)，改动写进本文件（做完一项就划掉，并在 changelog 留一条）。交流用中文，代码和页面英文原文保持现有文风。

## 仓库铁律

- **只改 `src/`。** `public/*.html`、`public/sitemap.xml`、`public/llms.txt` 由 `npm run build` 生成，手改会被覆盖。例外：`public/assets/**`、`public/robots.txt`、`public/changelog.rss` 直接改。
- 改了英文句子，必须在对应的 `src/i18n/<page>.js` 里加译文。键是该元素**规范化后的 inner HTML**（旧页面）或 `data-i18n-html` 的 key（首页流程图）。漏译跑 `node scripts/check-zh-coverage.mjs` 能看出来。
- 数字不手写进页面。带出处的数走 `data/models.json` 的 `{{fact:...}}`，见 README「Maintaining benchmarks」。
- 提交前：`npm run build && npm run check:links && npm run check:ld && npm test`。`check:zh` 是提示，不是失败门，但新增正文不能留英文。
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

### 14. NVIDIA 页（10 月 20 日 Nemotron-3.5-Rerank-8B 正式发布后，连同 VL-1B）

## 发布监控处理记录

- **2026-10-21 Cohere Rerank 5**：Cohere 当天发布（changelog「Announcing Cohere's Rerank 5 Models」）。Cohere 页改为 Rerank 5（新增「What's new in Rerank 5」：校准分数、Context Focus、只支持文本、不支持指令、可用渠道），模型表加 v5 Pro / Fast 两行，首页和表里的卡片更新，代码示例改用 `rerank-v5.0-pro`。3 个新 fact（`cohere-rerank-5`）。**价格还没公布**：页面写「尚未公布」，计算器暂不加；`data/release-watch.json` 新增「Cohere pricing」页面监控（`Rerank N Pro|Fast`，已知 Rerank 4），价格一出现就会报到 release-watch issue，届时补 price fact、计算器选项和价格表行。
- **NVIDIA Nemotron-3.5-Rerank-8B**：模型卡写 10 月 20 日发布，但 10 月 21 日再看仍无任何分数，NIM 也未收录，继续等（issue #47 保持打开）。

### 明确不要做

- 不要改 `data/models.json` 里的分数，除非 `npm run check:sources` 证明厂商页面上的数字变了。
- 不要为了「好看」重写 `public/assets/css/style.css` 的 token。对比度是用 axe 卡过的（浅色主题的 `--accent` 特意用了 teal-700）。
- 不要把 Demo 的打分数学改了。`public/assets/js/demo.js` 里的 token-overlap 和 cross-encoder 路径有 `tests/demo.smoke.spec.js`（mock）和 `tests/demo.smoke.real.spec.js`（真模型，要联网）。
- 不要新增 npm 依赖，除非这一项离开它就做不了。构建只用 `node-html-parser`。

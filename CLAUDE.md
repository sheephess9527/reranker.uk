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

### 3. 全站没有站内搜索

22 页英文 + 22 页中文，导航只有 Home / Guides / Models / Demo。

- 在 `scripts/build.mjs` 里从现有页面 meta（title、description、url）生成 `public/search-index.json`。这个文件是全站一份，加进 `LOCALE_NEUTRAL`，否则中文页会把链接改成 `/zh/search-index.json`。
- 搜索框放在 `src/partials/nav.html`，逻辑放 `public/assets/js/main.js`。`/` 聚焦，Esc 关闭。纯客户端，不要后端。
- 中文页只搜中文结果，英文页只搜英文结果（索引用 `locale` 字段区分）。
- 完成标准：搜 “Cohere” 能进模型页，搜 “百炼” 在 `/zh/` 能进国内指南；`npm test` 里加一条键盘用例，不要另起一套测试框架。

### 4. 第一次访问不跟系统主题

现在只要 `localStorage` 里没有 `rr_theme`，就一律深色。`src/partials/head-open.html` 里的内联脚本和 `public/assets/js/main.js` 的 `applyTheme` 要一起改：没有存过选择时，跟随 `prefers-color-scheme`。用户点过切换之后仍然以 `rr_theme` 为准，不要把已经存过的人改掉。

### 明确不要做

- 不要改 `data/models.json` 里的分数，除非 `npm run check:sources` 证明厂商页面上的数字变了。
- 不要为了「好看」重写 `public/assets/css/style.css` 的 token。对比度是用 axe 卡过的（浅色主题的 `--accent` 特意用了 teal-700）。
- 不要把 Demo 的打分数学改了。`public/assets/js/demo.js` 里的 token-overlap 和 cross-encoder 路径有 `tests/demo.smoke.spec.js`（mock）和 `tests/demo.smoke.real.spec.js`（真模型，要联网）。
- 不要新增 npm 依赖，除非这一项离开它就做不了。构建只用 `node-html-parser`。

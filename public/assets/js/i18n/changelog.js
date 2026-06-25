window.I18N_PAGE = { zh: {
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
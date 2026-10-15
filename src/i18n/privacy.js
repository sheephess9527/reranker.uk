window.I18N_PAGE = { zh: {
  "_title": "隐私说明 — reranker.uk | reranker.uk",
  "_desc": "reranker.uk 如何处理你的数据：静态页面、不用 cookie 的 Cloudflare Web Analytics、浏览器内 Demo 处理、第三方 CDN 与分享链接。",

  "Privacy": "隐私说明",
  "reranker.uk is a static educational site. Here is what happens to your data when you browse or use the live demo.": "reranker.uk 是静态教育站点。浏览或使用在线 Demo 时，你的数据会经历以下处理。",

  "Static pages": "静态页面",
  "Guide and model pages are plain HTML served from Cloudflare. There are no ads, tracking pixels, or sign-in flows on this site.": "指南与模型页为 Cloudflare 提供的纯 HTML。本站没有广告、追踪像素或登录流程。",

  "Analytics": "访问统计",
  "We use <a href=\"https://www.cloudflare.com/web-analytics/\" rel=\"noopener noreferrer\">Cloudflare Web Analytics</a> to count page views and see how quickly pages load. Cloudflare adds a small script to each page, which measures load times with your browser’s Performance API and reports them to this site’s own address.": "我们使用 <a href=\"https://www.cloudflare.com/web-analytics/\" rel=\"noopener noreferrer\">Cloudflare Web Analytics</a> 统计页面浏览量、了解页面加载速度。Cloudflare 会在每个页面加入一段小脚本，用浏览器的 Performance API 测量加载时间，并把结果发回本站自己的地址。",
  "According to <a href=\"https://developers.cloudflare.com/web-analytics/about/\" rel=\"noopener noreferrer\">Cloudflare’s documentation</a>, it sets no cookies and uses no local storage, does not fingerprint visitors by IP address or user agent, does not collect visitors’ personal data, and does not record query strings — so the text in a demo share link is not part of it. Ad blockers often block the script; the site works the same either way.": "根据 <a href=\"https://developers.cloudflare.com/web-analytics/about/\" rel=\"noopener noreferrer\">Cloudflare 的官方文档</a>，它不设置 cookie、不使用本地存储，不通过 IP 地址或 User-Agent 识别访客，不收集访客的个人数据，也不记录网址中的查询参数 —— 所以 Demo 分享链接里的文字不会进入统计。广告拦截插件常会拦下这段脚本，网站照样正常使用。",

  "Live demo": "在线 Demo",
  "The <a href=\"/demo.html\">reranking demo</a> runs entirely in your browser with <a href=\"https://github.com/huggingface/transformers.js\" rel=\"noopener noreferrer\">transformers.js</a>. Your query and candidate passages are processed locally on your device. They are <strong>not</strong> sent to reranker.uk servers or any rerank API.": "<a href=\"/demo.html\">重排序 Demo</a> 完全在浏览器内通过 <a href=\"https://github.com/huggingface/transformers.js\" rel=\"noopener noreferrer\">transformers.js</a> 运行。查询与候选段落在你的设备本地处理，<strong>不会</strong>发送到 reranker.uk 服务器或任何 rerank API。",
  "On first use, the demo downloads open-weight model files from the Hugging Face CDN (via jsDelivr). Those weights are cached in your browser storage for faster repeat visits. Share links encode your query and passages in the URL — only share them with people you trust, since anyone with the link can read that text.": "首次使用时，Demo 从 Hugging Face CDN（经 jsDelivr）下载开源模型文件，权重会缓存在浏览器存储中以加速再次访问。分享链接把查询与段落编码进 URL —— 只发给信任的人，持有链接者均可阅读其中文本。",

  "Third parties": "第三方",
  "<strong>Cloudflare</strong> — hosts static files, may log standard request metadata (IP, user agent) per their <a href=\"https://www.cloudflare.com/privacypolicy/\" rel=\"noopener noreferrer\">privacy policy</a>, and runs the analytics described above.": "<strong>Cloudflare</strong> —— 托管静态文件，可能按其 <a href=\"https://www.cloudflare.com/privacypolicy/\" rel=\"noopener noreferrer\">隐私政策</a> 记录常规请求元数据（IP、User-Agent），并提供上文所述的访问统计。",
  "<strong>jsDelivr / Hugging Face</strong> — serves transformers.js and ONNX model weights when you open the demo.": "<strong>jsDelivr / Hugging Face</strong> —— 打开 Demo 时提供 transformers.js 与 ONNX 模型权重。",
  "<strong>GitHub</strong> — if you follow the “View source” link, GitHub’s terms apply.": "<strong>GitHub</strong> —— 若点击「查看源码」链接，适用 GitHub 条款。",

  "Contact": "联系",
  "Questions or corrections: open an issue on <a href=\"https://github.com/sheephess9527/reranker.uk\" rel=\"noopener noreferrer\">GitHub</a>.": "问题或勘误：在 <a href=\"https://github.com/sheephess9527/reranker.uk\" rel=\"noopener noreferrer\">GitHub</a> 提交 issue。",

  "Last updated: 15 October 2026": "最后更新：2026 年 10 月 15 日",
}};
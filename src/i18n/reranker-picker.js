window.I18N_PAGE = { zh: {
  "Four questions, and a starting point. The answers come from this site’s model reviews and guides; none of them replaces a test on your own queries.":
    "四个问题，给你一个起点。答案来自本站的模型评测和指南；哪一个都替代不了在你自己的查询上测一遍。",
  "<a href=\"/\">Home</a><span>/</span>Reranker picker":
    "<a href=\"/\">首页</a><span>/</span>选型向导",
  "Which reranker should I use?":
    "我该用哪个 reranker？",
  "Tool · <time datetime=\"2026-11-12\">Updated 12 Nov 2026</time>":
    "工具 · <time datetime=\"2026-11-12\">更新于 2026 年 11 月 12 日</time>",
  "Your situation":
    "你的情况",
  "What are you ranking?":
    "你要排序的是什么？",
  "Text passages":
    "文本段落",
  "Code and API docs":
    "代码和 API 文档",
  "Page images: scans, slides, screenshots":
    "页面图片：扫描件、幻灯片、截图",
  "Where will it run?":
    "在哪里运行？",
  "A hosted API":
    "托管 API",
  "My own servers, with a GPU":
    "自己的服务器，有 GPU",
  "My own servers, CPU only":
    "自己的服务器，只有 CPU",
  "A hosted API inside mainland China":
    "中国大陆境内的托管 API",
  "Which languages?":
    "哪些语言？",
  "English only":
    "只有英文",
  "Chinese or several languages":
    "中文或多种语言",
  "Do you need to tell it what counts as relevant?":
    "需要用指令告诉它什么算相关吗？",
  "No, the query is enough":
    "不用，查询本身就够",
  "Yes, with a written instruction":
    "需要，用一句书面指令",
  "Start with":
    "从这里开始",
  "Every suggestion is listed below; with JavaScript on, the list narrows to the ones that match your answers.":
    "下面列出了全部建议；开启 JavaScript 后，只显示符合你选择的那几条。",
  "A hosted API: Cohere Rerank 5 or Voyage rerank-3":
    "托管 API：Cohere Rerank 5 或 Voyage rerank-3",
  "Both bill per token, at the same list price. <a href=\"/models/cohere-rerank.html\">Cohere Rerank 5</a> returns calibrated scores, so one threshold works across queries. <a href=\"/models/voyage-rerank.html\">Voyage rerank-3</a> also takes instructions if you need them later. The <a href=\"/rerank-cost-calculator.html\">cost calculator</a> compares them with the other APIs at your volume.":
    "两者都按 token 计费，标价相同。<a href=\"/models/cohere-rerank.html\">Cohere Rerank 5</a> 返回校准过的分数，一个阈值可以跨查询使用。<a href=\"/models/voyage-rerank.html\">Voyage rerank-3</a> 还支持指令，以后需要时可以用上。<a href=\"/rerank-cost-calculator.html\">成本计算器</a>可以按你的用量把它们和其他 API 放在一起比较。",
  "An API that takes instructions: Voyage rerank-3 or Contextual AI":
    "支持指令的 API：Voyage rerank-3 或 Contextual AI",
  "<a href=\"/models/voyage-rerank.html\">Voyage rerank-3</a> takes natural-language instructions; Cohere Rerank 5 does not. <a href=\"/models/contextual-rerank.html\">Contextual AI Rerank v2</a> is built around instructions and is sold as an API (its open weights are for non-commercial use). The <a href=\"/guides/instruction-reranker.html\">instruction guide</a> shows what to write.":
    "<a href=\"/models/voyage-rerank.html\">Voyage rerank-3</a> 支持自然语言指令；Cohere Rerank 5 不支持。<a href=\"/models/contextual-rerank.html\">Contextual AI Rerank v2</a> 就是围绕指令设计的，以 API 形式出售（开源权重仅限非商用）。<a href=\"/guides/instruction-reranker.html\">指令指南</a>里有写法示例。",
  "In mainland China: Alibaba Cloud Model Studio or SiliconFlow":
    "在中国大陆：阿里云百炼或硅基流动",
  "Alibaba Cloud Model Studio sells <a href=\"/models/#alibaba-model-studio\">qwen3-rerank</a> by the token in yuan, and <a href=\"/models/#siliconflow\">SiliconFlow</a> serves bge-reranker-v2-m3 and Qwen3-Reranker behind one endpoint. The <a href=\"/guides/rerank-in-china.html\">mainland China guide</a> compares them with hosting the weights yourself.":
    "阿里云百炼按 token 以人民币出售 <a href=\"/models/#alibaba-model-studio\">qwen3-rerank</a>，<a href=\"/models/#siliconflow\">硅基流动</a>用同一个接口提供 bge-reranker-v2-m3 和 Qwen3-Reranker。<a href=\"/guides/rerank-in-china.html\">国内指南</a>把它们和自己部署权重做了比较。",
  "On your own GPU: Qwen3-Reranker-4B":
    "自己的 GPU：Qwen3-Reranker-4B",
  "<a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a> covers 100+ languages and takes instructions. In Qwen’s own tests the 4B beats the 8B on English, so the largest model is not the automatic choice. The <a href=\"/guides/self-host-reranker.html\">self-hosting guide</a> has code that runs.":
    "<a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a> 覆盖 100 多种语言，支持指令。在 Qwen 自己的测试里，4B 在英文上超过 8B，所以不必默认选最大的。<a href=\"/guides/self-host-reranker.html\">自建指南</a>里有能直接跑的代码。",
  "On CPU, multilingual: bge-reranker-v2-m3":
    "只有 CPU、多语言：bge-reranker-v2-m3",
  "<a href=\"/models/bge-reranker.html\">bge-reranker-v2-m3</a> is the usual self-hosted default without a GPU. <a href=\"/models/gte-reranker.html\">gte-multilingual-reranker-base</a> is a smaller alternative that covers 70+ languages. The classic small models (ms-marco MiniLM, Jina v1, mxbai v1) were trained on English only.":
    "没有 GPU 时，<a href=\"/models/bge-reranker.html\">bge-reranker-v2-m3</a> 是常见的自建默认选择。<a href=\"/models/gte-reranker.html\">gte-multilingual-reranker-base</a> 更小，覆盖 70 多种语言。经典的小模型（ms-marco MiniLM、Jina v1、mxbai v1）只用英文训练过。",
  "On CPU, English: ms-marco MiniLM or jina-reranker-v1-tiny-en":
    "只有 CPU、英文：ms-marco MiniLM 或 jina-reranker-v1-tiny-en",
  "A tiny cross-encoder is often enough when passages are short and latency matters; both run in the browser too, so you can <a href=\"/demo.html\">try them in the demo</a> first. For longer passages, look at the English <a href=\"/models/gte-reranker.html\">GTE reranker</a>.":
    "段落短、延迟要紧时，一个很小的 cross-encoder 往往就够了；这两个也能在浏览器里跑，可以先<a href=\"/demo.html\">在 Demo 里试</a>。段落较长的话，看看英文的 <a href=\"/models/gte-reranker.html\">GTE reranker</a>。",
  "Instructions on CPU are a stretch":
    "只有 CPU 时用指令比较勉强",
  "The small CPU models above don’t take instructions. <a href=\"/models/qwen-reranker.html\">Qwen3-Reranker-0.6B</a> does, but a GPU is recommended for it. If you can’t add one, an API that takes instructions is the simpler route.":
    "上面这些小型 CPU 模型不支持指令。<a href=\"/models/qwen-reranker.html\">Qwen3-Reranker-0.6B</a> 支持，但建议配 GPU。加不了 GPU 的话，用支持指令的 API 更省事。",
  "Page images, self-hosted: Qwen3-VL-Reranker, LightOn-rerank or NVIDIA Nemotron":
    "页面图片、自建：Qwen3-VL-Reranker、LightOn-rerank 或 NVIDIA Nemotron",
  "A text reranker only sees what OCR extracted; these score the page image itself, and all of them need a GPU. <a href=\"/models/qwen3-vl-reranker.html\">Qwen3-VL-Reranker</a> and <a href=\"/models/lighton-rerank.html\">LightOn-rerank</a> are Apache 2.0. <a href=\"/models/nvidia-rerank.html\">NVIDIA’s Nemotron rerankers</a> allow commercial use and can read a page’s image and its extracted text together.":
    "文本 reranker 只能看到 OCR 提取出来的内容；这几个直接给页面图片打分，而且都需要 GPU。<a href=\"/models/qwen3-vl-reranker.html\">Qwen3-VL-Reranker</a> 和 <a href=\"/models/lighton-rerank.html\">LightOn-rerank</a> 是 Apache 2.0。<a href=\"/models/nvidia-rerank.html\">NVIDIA 的 Nemotron reranker</a> 允许商用，还能把页面图片和提取出的文字一起读。",
  "Page images, hosted: Alibaba Cloud’s qwen3-vl-rerank":
    "页面图片、托管：阿里云的 qwen3-vl-rerank",
  "Alibaba Cloud Model Studio sells <a href=\"/models/#alibaba-model-studio\">qwen3-vl-rerank</a> as an API for images and video. The other visual rerankers on this site are open weights you host yourself, on a GPU: see the <a href=\"/guides/choose-reranker-scenario.html#visual\">scenario guide</a>.":
    "阿里云百炼把 <a href=\"/models/#alibaba-model-studio\">qwen3-vl-rerank</a> 作为 API 出售，支持图片和视频。本站其余的视觉 reranker 都是需要自己用 GPU 部署的开源权重，见<a href=\"/guides/choose-reranker-scenario.html#visual\">场景指南</a>。",
  "For code, fix retrieval first":
    "做代码检索，先把召回做好",
  "Vector search alone misses exact function names, and BM25 alone misses paraphrased questions. Use <a href=\"/guides/hybrid-retrieval-rerank.html\">hybrid retrieval</a>, then rerank. Qwen and Voyage both publish code-retrieval results for their rerankers.":
    "只用向量检索会漏掉精确的函数名，只用 BM25 会漏掉换了说法的问题。先用<a href=\"/guides/hybrid-retrieval-rerank.html\">混合检索</a>，再重排序。Qwen 和 Voyage 都公布了各自 reranker 的代码检索结果。",
  "Then check it":
    "然后验证",
  "A suggestion is where to start, not the answer. Line the candidates up in the <a href=\"/guides/compare-rerankers.html\">comparison guide</a> or the <a href=\"/models/\">models table</a>, then <a href=\"/guides/evaluate-reranker.html\">evaluate</a> two of them on fifty of your own queries. The <a href=\"/guides/choose-reranker-scenario.html\">scenario guide</a> explains the reasoning behind each pick.":
    "建议只是起点，不是答案。先在<a href=\"/guides/compare-rerankers.html\">横向对比指南</a>或<a href=\"/models/\">模型对比表</a>里把候选并排看一遍，再拿你自己的五十条查询<a href=\"/guides/evaluate-reranker.html\">评测</a>其中两个。每个推荐背后的理由在<a href=\"/guides/choose-reranker-scenario.html\">场景指南</a>里。",
  "_title":
    "reranker 选型向导：我该用哪个 reranker？ | reranker.uk",
  "_desc":
    "回答四个问题：排序什么内容、在哪里运行、哪些语言、要不要指令，得到一个 reranker 起点：Cohere、Voyage、Qwen3、bge、GTE、视觉 reranker，或国内的托管 API。",
}};

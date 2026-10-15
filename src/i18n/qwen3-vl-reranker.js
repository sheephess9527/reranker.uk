window.I18N_PAGE = { zh: {
  "_title":
    "Qwen3-VL-Reranker：给图片、截图和视频重排序 | reranker.uk",
  "_desc":
    "Qwen3-VL-Reranker 评测（2026 年 10 月）：面向页面图片、截图和视频的 2B 与 8B 多模态重排序模型，Qwen 自己公布的 MMEB-v2、JinaVDR、ViDoRe v3 分数及与 jina-reranker-m0 的对比，sentence-transformers 快速上手，以及托管选项。",
  "<a href=\"/\">Home</a><span>/</span><a href=\"/models/\">Models</a><span>/</span>Qwen3-VL-Reranker":
    "<a href=\"/\">首页</a><span>/</span><a href=\"/models/\">模型对比</a><span>/</span>Qwen3-VL-Reranker",
  "Open weights · Qwen, Alibaba · <time datetime=\"2026-10-15\">Updated 15 Oct 2026</time>":
    "开源权重 · 阿里巴巴 Qwen · <time datetime=\"2026-10-15\">更新于 2026 年 10 月 15 日</time>",
  "Images and video":
    "图片和视频",
  "GPU required":
    "需要 GPU",
  "<strong>Qwen3-VL-Reranker</strong> (2B / 8B) scores a query against documents that can be text, images, screenshots, video, or a mix of them. A scanned page or a slide is ranked as the picture it is, not through whatever OCR managed to extract. It is built on Qwen3-VL, with a 32K context, 30+ languages and an Apache 2.0 licence. For text-only documents, its sibling <a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a> is the one to look at.":
    "<strong>Qwen3-VL-Reranker</strong>（2B / 8B）给查询和文档打相关性分，文档可以是文字、图片、截图、视频，或它们的组合。扫描页或幻灯片按图片本身来排序，而不是靠 OCR 碰巧识别出来的文字。它基于 Qwen3-VL，32K 上下文，支持 30 多种语言，Apache 2.0 许可。如果文档只有文字，应该看它的同门 <a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a>。",
  "On this page":
    "本页目录",
  "Model variants":
    "模型版本",
  "Model":
    "模型",
  "Parameters":
    "参数量",
  "Layers":
    "层数",
  "Context":
    "上下文",
  "Both take a task instruction. Qwen report that instructions usually add 1–5%, and recommend writing them in English even for other languages. The family pairs with Qwen3-VL-Embedding, the first-stage retriever for the same kinds of input.":
    "两个版本都支持任务指令。Qwen 称加指令通常能提升 1–5%，并建议即使处理其他语言也用英文写指令。这个系列和 Qwen3-VL-Embedding 配套：后者负责同类输入的第一阶段召回。",
  "Scores, and whose they are":
    "分数，以及是谁测的",
  "MMEB-v2 image":
    "MMEB-v2 图片",
  "MMEB-v2 video":
    "MMEB-v2 视频",
  "MMEB-v2 visual docs":
    "MMEB-v2 视觉文档",
  "MMTEB retrieval":
    "MMTEB 检索",
  "Qwen’s own runs, from the model card. The card doesn’t say which first stage each reranker reordered. MMEB-v2 covers image, video and visual-document retrieval; JinaVDR and ViDoRe v3 are visual-document benchmarks (page images); MMTEB retrieval is text. None of them is BEIR.":
    "Qwen 自己的测试，数据来自模型卡。模型卡没有说明每个重排序模型重排的是哪个第一阶段的结果。MMEB-v2 包括图片、视频和视觉文档检索；JinaVDR 和 ViDoRe v3 是视觉文档（页面图片）基准；MMTEB 检索是纯文本。它们都不是 BEIR。",
  "In Qwen’s table, the 2B is close to <a href=\"/models/jina-reranker.html\">jina-reranker-m0</a>, Jina’s multimodal reranker, whose weights are licensed for non-commercial use only: ahead on images and ViDoRe v3, behind on visual documents and JinaVDR. The 8B leads every column. One outside run: LightOn, who make a competing model, report BEIR over BM25’s top 100, averaged over 11 datasets kept out of their own training data. There the 2B scores {{fact:qwen3-vl-reranker-2b.beir_lighton}} and jina-reranker-m0 {{fact:jina-reranker-m0.beir_lighton}}: on text, the 2B trails m0 in that run.":
    "在 Qwen 的表里，2B 和 <a href=\"/models/jina-reranker.html\">jina-reranker-m0</a> 很接近（m0 是 Jina 的多模态重排序模型，权重只允许非商业使用）：图片和 ViDoRe v3 上领先，视觉文档和 JinaVDR 上落后。8B 每一列都领先。还有一个外部测试：做竞品模型的 LightOn 用 BM25 召回前 100 个结果做 BEIR，取 11 个没进过他们训练数据的数据集平均。在那里 2B 得 {{fact:qwen3-vl-reranker-2b.beir_lighton}}，jina-reranker-m0 得 {{fact:jina-reranker-m0.beir_lighton}}：在这次纯文本测试里，2B 落后于 m0。",
  "Quick start":
    "快速上手",
  "A document can be text, an image URL or path, or a dict with both. Without <code>prompt</code>, the instruction is “Retrieve text relevant to the user’s query.” The model card also shows a plain <code>transformers</code> path, which needs a helper script from <a href=\"https://github.com/QwenLM/Qwen3-VL-Embedding\" rel=\"noopener noreferrer\">Qwen’s GitHub repository</a>, and a vLLM path.":
    "文档可以是文字、图片的 URL 或路径，或者同时包含两者的 dict。不传 <code>prompt</code> 时，默认指令是“Retrieve text relevant to the user’s query.”。模型卡还给了直接用 <code>transformers</code> 的写法（需要 <a href=\"https://github.com/QwenLM/Qwen3-VL-Embedding\" rel=\"noopener noreferrer\">Qwen GitHub 仓库</a>里的辅助脚本）和 vLLM 的写法。",
  "Hosted options":
    "托管选项",
  "Alibaba Cloud Model Studio sells <code>qwen3-vl-rerank</code>, and SiliconFlow hosts Qwen3-VL-Reranker-8B. Both are reachable from mainland China; see <a href=\"/guides/rerank-in-china.html\">reranking in mainland China</a> for endpoints and prices. Alibaba Cloud publishes no scores for its hosted version.":
    "阿里云百炼提供 <code>qwen3-vl-rerank</code>，硅基流动托管了 Qwen3-VL-Reranker-8B，两者在中国大陆都能直接访问；接口地址和价格见<a href=\"/guides/rerank-in-china.html\">国内重排序指南</a>。阿里云没有公布托管版本的分数。",
  "When to pick Qwen3-VL-Reranker":
    "什么时候选 Qwen3-VL-Reranker",
  "<strong>Yes:</strong> your documents are page images: scans, slide decks, screenshots, dashboards.":
    "<strong>适合：</strong>文档是页面图片：扫描件、幻灯片、截图、看板。",
  "<strong>Yes:</strong> a query should match images or video, or documents that mix text and pictures.":
    "<strong>适合：</strong>查询要匹配图片或视频，或者图文混排的文档。",
  "<strong>Maybe not:</strong> the documents are plain text. Use <a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a> or another reranker built for text; it does the same job with less compute.":
    "<strong>可能不适合：</strong>文档是纯文本。用 <a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a> 或其他文本重排序模型，同样的活计算量更小。",
  "<strong>Maybe not:</strong> CPU-only serving. Even the 2B wants a GPU, and images make every pair more expensive to score than text.":
    "<strong>可能不适合：</strong>只有 CPU 的部署。即使是 2B 也需要 GPU，而且有图片时每一对的打分成本都比纯文本高。",
  "Pros and cons":
    "优缺点",
  "Pros":
    "优点",
  "Text, images, screenshots and video in one model":
    "文字、图片、截图、视频一个模型搞定",
  "Apache 2.0 at both sizes":
    "两个尺寸都是 Apache 2.0",
  "Takes a task instruction":
    "支持任务指令",
  "Loads with sentence-transformers’ <code>CrossEncoder</code>":
    "可用 sentence-transformers 的 <code>CrossEncoder</code> 加载",
  "Cons":
    "缺点",
  "GPU required, and images cost more to score than text":
    "需要 GPU，图片的打分成本比文字高",
  "Published scores are Qwen’s own, first stage unstated":
    "公布的分数是 Qwen 自己测的，没说明第一阶段",
  "More model than text-only documents need":
    "对纯文本文档来说大材小用",
  "Too large for our in-browser demo":
    "太大，放不进我们的浏览器内 Demo",
  "Choosing for page images?":
    "要给页面图片选模型？",
  "The scenario guide compares Qwen3-VL-Reranker with LightOn-rerank and the hosted options for visual documents.":
    "按场景选型指南对比了 Qwen3-VL-Reranker、LightOn-rerank 以及处理视觉文档的托管选项。",
  "Choose by scenario →":
    "按场景选型 →",
  "All models →":
    "全部模型 →",
  "Other models":
    "其他模型",
  "The text-only family: 0.6B, 4B, 8B.":
    "纯文本系列：0.6B、4B、8B。",
  "Listwise v3.5, and the multimodal m0.":
    "列表式 v3.5，以及多模态的 m0。",
  "Late interaction":
    "Late-interaction（ColBERT）",
  "Token-level scoring, ColBERT style.":
    "token 级打分，ColBERT 式。",
  "Self-host guide":
    "自托管指南",
  "Serving and ops checklist.":
    "服务化与运维清单。",
}};

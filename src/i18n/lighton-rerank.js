window.I18N_PAGE = { zh: {
  "_title":
    "LightOn-rerank：文本和页面图片共用一个重排序模型 | reranker.uk",
  "_desc":
    "LightOn-rerank 评测（2026 年 10 月）：六个 Apache 2.0 重排序模型（0.8B、2B、4B，各有逐点和列表式两种），能给文本和文档页面图片打分；LightOn 在 ViDoRe V3 和 BEIR 上对比 Qwen3-VL-Reranker 与 jina-reranker-m0 的结果，以及使用方法。",
  "<a href=\"/\">Home</a><span>/</span><a href=\"/models/\">Models</a><span>/</span>LightOn-rerank":
    "<a href=\"/\">首页</a><span>/</span><a href=\"/models/\">模型对比</a><span>/</span>LightOn-rerank",
  "Open weights · LightOn · <time datetime=\"2026-10-16\">Updated 16 Oct 2026</time>":
    "开源权重 · LightOn · <time datetime=\"2026-10-16\">更新于 2026 年 10 月 16 日</time>",
  "Text and page images":
    "文本和页面图片",
  "GPU required":
    "需要 GPU",
  "<strong>LightOn-rerank</strong> is a family of six rerankers that score text passages and document page images with the same model, so one second stage covers both a text index and a PDF-page index. It comes in three sizes (0.8B, 2B, 4B), each in a pointwise and a listwise version, built on Qwen3.5 and released under Apache 2.0. On visual documents the listwise 4B is the strongest reranker in LightOn’s own comparison; on text it trails jina-reranker-m0.":
    "<strong>LightOn-rerank</strong> 是一组六个重排序模型，用同一个模型给文本段落和文档页面图片打分，所以一个第二阶段就能同时服务文本索引和 PDF 页面索引。它有三个尺寸（0.8B、2B、4B），每个尺寸都有逐点和列表式两个版本，基于 Qwen3.5，Apache 2.0 许可。在视觉文档上，列表式 4B 是 LightOn 自己对比里最强的；在文本上它落后于 jina-reranker-m0。",
  "On this page":
    "本页目录",
  "Pointwise or listwise":
    "逐点还是列表式",
  "Each size comes in two versions, and the choice matters more than the size:":
    "每个尺寸都有两个版本，而选哪个版本比选尺寸更重要：",
  "<strong>PW (pointwise)</strong> scores each candidate on its own, as the difference between the “Yes” and “No” logits. One forward pass per candidate, easy to batch, and it loads into sentence-transformers’ <code>CrossEncoder</code>.":
    "<strong>PW（逐点）</strong>单独给每个候选打分，分数是“Yes”和“No”两个 logit 之差。每个候选一次前向计算，便于批处理，可以直接用 sentence-transformers 的 <code>CrossEncoder</code> 加载。",
  "<strong>LW (listwise)</strong> reads four candidates in one prompt and generates their order, such as <code>[2] &gt; [4] &gt; [1] &gt; [3]</code>. Longer lists are ranked with a sliding window of four, moving two at a time from the bottom up. Seeing candidates side by side makes it stronger on visual documents at every size, at roughly three times the latency of pointwise.":
    "<strong>LW（列表式）</strong>在一个提示里同时读四个候选，生成它们的顺序，比如 <code>[2] &gt; [4] &gt; [1] &gt; [3]</code>。更长的列表用宽度为四、每次移动两个的滑动窗口从下往上排。能同时看到多个候选，让它在每个尺寸上处理视觉文档都更强，代价是延迟大约是逐点的三倍。",
  "Training data is English only. French works without extra training, through the multilingual backbone, but trails English slightly.":
    "训练数据只有英文。借助多语言底座，法语不需要额外训练也能用，但比英文略差。",
  "Scores, and whose they are":
    "分数，以及是谁测的",
  "Model":
    "模型",
  "Scoring":
    "打分方式",
  "ViDoRe V3 (page images)":
    "ViDoRe V3（页面图片）",
  "BEIR (text)":
    "BEIR（文本）",
  "First stage only (ColQwen2.5)":
    "只用第一阶段（ColQwen2.5）",
  "Pointwise":
    "逐点",
  "Listwise":
    "列表式",
  "LightOn’s own runs, from the model cards, with every model re-evaluated under the same protocol. ViDoRe V3: NDCG@10 over the top 100 page images from ColQwen2.5. BEIR: NDCG@10 over BM25’s top 100, averaged over the 11 datasets that weren’t in LightOn’s training data. Neither matches vendors’ own numbers: Qwen’s card, for instance, gives the 8B a higher ViDoRe V3 score from its own setup (see the <a href=\"/models/qwen3-vl-reranker.html\">Qwen3-VL-Reranker page</a>).":
    "LightOn 自己的测试，数据来自模型卡，所有模型都在同一套流程下重新评测。ViDoRe V3：对 ColQwen2.5 召回的前 100 张页面图片重排，指标 NDCG@10。BEIR：对 BM25 召回的前 100 个结果重排，指标 NDCG@10，取 11 个没进过 LightOn 训练数据的数据集平均。两者都和厂商自己公布的数字对不上：比如 Qwen 的模型卡按自己的设置给 8B 的 ViDoRe V3 分数更高（见 <a href=\"/models/qwen3-vl-reranker.html\">Qwen3-VL-Reranker 页面</a>）。",
  "Three things the table shows. The listwise models gain with size, and LW-4B edges past Qwen3-VL-Reranker-8B at about half the parameters; the pointwise 4B does no better than the pointwise 2B. On text, the three LightOn models with published scores sit three to four points behind jina-reranker-m0, whose weights are non-commercial. And PW-0.8B scores below the first stage it reranks, so don’t use it on page images.":
    "这张表说明三件事。列表式模型越大越强，LW-4B 以大约一半的参数略微超过 Qwen3-VL-Reranker-8B；逐点 4B 并不比逐点 2B 好。在文本上，三个公布了分数的 LightOn 模型比 jina-reranker-m0 低三到四分，而 m0 的权重只能非商用。另外，PW-0.8B 的分数比它重排的第一阶段还低，所以不要拿它处理页面图片。",
  "Quick start":
    "快速上手",
  "Pointwise, with sentence-transformers":
    "逐点模型，用 sentence-transformers",
  "Text and image candidates can share a call. The chat template the model was trained with ships inside the checkpoint, so pairs are formatted correctly without extra code.":
    "文本候选和图片候选可以放在同一次调用里。模型训练时用的对话模板已经打包在检查点里，不需要额外代码就能正确格式化输入。",
  "Listwise models":
    "列表式模型",
  "The LW models don’t load into <code>CrossEncoder</code>: they generate an order rather than a score. The model cards include a short <code>transformers</code> implementation of the four-candidate window and the sliding pass over a longer list. To serve either kind with vLLM, turn thinking off (<code>enable_thinking: False</code>; the Qwen3.5 template has it on by default and it distorts the scores), and allow at least 16,384 tokens of context when ranking full page images.":
    "LW 模型不能用 <code>CrossEncoder</code> 加载：它们生成的是顺序而不是分数。模型卡里附了一段简短的 <code>transformers</code> 实现，包括四候选窗口和在长列表上的滑动。用 vLLM 部署任何一种时，都要关掉思考模式（<code>enable_thinking: False</code>；Qwen3.5 的模板默认开启，会扭曲分数），给整页图片排序时上下文至少留 16,384 token。",
  "When to pick LightOn-rerank":
    "什么时候选 LightOn-rerank",
  "<strong>Yes:</strong> you search PDF pages, slides or scans, and want a commercial-friendly licence: LW-2B for the best quality for its cost, LW-4B for the best quality.":
    "<strong>适合：</strong>你检索的是 PDF 页面、幻灯片或扫描件，并且需要能商用的许可：要性价比选 LW-2B，要最好效果选 LW-4B。",
  "<strong>Yes:</strong> one model has to rerank both a text index and a page-image index.":
    "<strong>适合：</strong>一个模型要同时给文本索引和页面图片索引重排序。",
  "<strong>Maybe not:</strong> text only. Text rerankers such as <a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a> are the more natural fit there.":
    "<strong>可能不适合：</strong>只有文本。这时 <a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a> 这类文本重排序模型更合适。",
  "<strong>Maybe not:</strong> languages other than English and French, which it wasn’t trained or tested on.":
    "<strong>可能不适合：</strong>英语和法语以外的语言，它既没在这些语言上训练过，也没测过。",
  "Pros and cons":
    "优缺点",
  "Pros":
    "优点",
  "Apache 2.0 at every size":
    "每个尺寸都是 Apache 2.0",
  "Text and page images in one model":
    "文本和页面图片一个模型搞定",
  "LW-4B leads LightOn’s visual-document comparison":
    "LW-4B 在 LightOn 的视觉文档对比里领先",
  "Every baseline re-run under one protocol, contamination flagged":
    "所有基线都在同一流程下重测，并标出了训练数据污染",
  "Cons":
    "缺点",
  "Trained on English only":
    "只用英文训练",
  "Listwise models need custom code and cost about three times the latency":
    "列表式模型需要自定义代码，延迟约为三倍",
  "Behind jina-reranker-m0 on text":
    "文本上落后于 jina-reranker-m0",
  "GPU required; too large for our in-browser demo":
    "需要 GPU；太大，放不进我们的浏览器内 Demo",
  "Choosing for page images?":
    "要给页面图片选模型？",
  "The scenario guide compares LightOn-rerank with Qwen3-VL-Reranker and the hosted options for visual documents.":
    "按场景选型指南对比了 LightOn-rerank、Qwen3-VL-Reranker 以及处理视觉文档的托管选项。",
  "Choose by scenario →":
    "按场景选型 →",
  "All models →":
    "全部模型 →",
  "Other models":
    "其他模型",
  "Images, screenshots and video; 2B and 8B.":
    "图片、截图和视频；2B 和 8B。",
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

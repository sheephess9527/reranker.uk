window.I18N_PAGE = { zh: {
  "MIT":
    "MIT",
  "<a href=\"https://huggingface.co/hindsight-ai/hs-rerank-1\" rel=\"noopener noreferrer\">hs-rerank-1</a>":
    "<a href=\"https://huggingface.co/hindsight-ai/hs-rerank-1\" rel=\"noopener noreferrer\">hs-rerank-1</a>",
  "8, incl. Chinese, Japanese and Korean":
    "8 种，含中文、日语和韩语",
  "CPU (int8 ONNX) or GPU":
    "CPU（int8 ONNX）或 GPU",
  "<a href=\"/\">Home</a><span>/</span><a href=\"/guides/\">Guides</a><span>/</span>Compare rerankers":
    "<a href=\"/\">首页</a><span>/</span><a href=\"/guides/\">指南</a><span>/</span>对比 reranker",
  "Best reranker in 2026: Qwen3, bge, mxbai, Jina, GTE and the hosted APIs compared":
    "2026 年最好的 reranker：Qwen3、bge、mxbai、Jina、GTE 和托管 API 横向对比",
  "Comparison · ~7 min read · <time datetime=\"2026-11-10\">Updated 10 Nov 2026</time>":
    "横向对比 · 约 7 分钟阅读 · <time datetime=\"2026-11-10\">更新于 2026 年 11 月 10 日</time>",
  "Every reranker vendor publishes a table in which its own model wins, and the tables use different datasets, so the numbers cannot be lined up across vendors. This page only sets scores side by side when they come from <strong>one run</strong>, says whose run it was, and says plainly which models have no number that can be compared.":
    "每家 reranker 厂商公布的表格里，赢的都是自己的模型，而且各家用的数据集不同，数字没法跨厂商直接对齐。本页只在分数来自<strong>同一次评测</strong>时才把它们并排放，并写明是谁跑的；没有可比数字的模型，也会直接说明。",
  "On this page":
    "本页目录",
  "<a href=\"#short\">The short answer</a>":
    "<a href=\"#short\">先说结论</a>",
  "<a href=\"#rule\">Which numbers can be compared</a>":
    "<a href=\"#rule\">哪些数字能比</a>",
  "<a href=\"#qwen-run\">Qwen3 against bge-reranker-v2-m3</a>":
    "<a href=\"#qwen-run\">Qwen3 对比 bge-reranker-v2-m3</a>",
  "<a href=\"#jina-run\">Qwen3, mxbai and Jina on one BEIR run</a>":
    "<a href=\"#jina-run\">同一次 BEIR 评测里的 Qwen3、mxbai 和 Jina</a>",
  "<a href=\"#practical\">Size, licence and where each runs</a>":
    "<a href=\"#practical\">规模、许可证和运行环境</a>",
  "<a href=\"#hosted\">Hosted APIs</a>":
    "<a href=\"#hosted\">托管 API</a>",
  "<a href=\"#decide\">How to decide</a>":
    "<a href=\"#decide\">怎么选</a>",
  "The short answer":
    "先说结论",
  "<strong>Self-hosting on a GPU and want the best open model:</strong> <a href=\"/models/qwen-reranker.html\">Qwen3-Reranker-4B</a>. In both runs below it is at or near the top, and it is Apache 2.0.":
    "<strong>自托管、有 GPU、想要最好的开源模型：</strong><a href=\"/models/qwen-reranker.html\">Qwen3-Reranker-4B</a>。下面两次评测里它都在榜首或接近榜首，而且是 Apache 2.0 协议。",
  "<strong>Small, CPU-friendly, multilingual:</strong> <a href=\"/models/bge-reranker.html\">bge-reranker-v2-m3</a> is the standard baseline; the <a href=\"/models/gte-reranker.html\">GTE rerankers</a> are smaller still, and Hindsight’s <a href=\"https://huggingface.co/hindsight-ai/hs-rerank-1\" rel=\"noopener noreferrer\">hs-rerank-1</a> (MIT, {{fact:hs-rerank-1.params}}) is smaller again but comes with no scores we can quote.":
    "<strong>要小、能在 CPU 上跑、支持多语言：</strong><a href=\"/models/bge-reranker.html\">bge-reranker-v2-m3</a> 是通行的基线；<a href=\"/models/gte-reranker.html\">GTE reranker</a> 还要更小，Hindsight 的 <a href=\"https://huggingface.co/hindsight-ai/hs-rerank-1\" rel=\"noopener noreferrer\">hs-rerank-1</a>（MIT，{{fact:hs-rerank-1.params}}）更小，但没有可以引用的分数。",
  "<strong>No GPU and no ops:</strong> a hosted API. <a href=\"/models/cohere-rerank.html\">Cohere Rerank 5</a> and <a href=\"/models/voyage-rerank.html\">Voyage rerank-3</a> are the established ones, <a href=\"/models/zerank.html\">zerank-2</a> the cheapest per token.":
    "<strong>没有 GPU，也不想运维：</strong>用托管 API。<a href=\"/models/cohere-rerank.html\">Cohere Rerank 5</a> 和 <a href=\"/models/voyage-rerank.html\">Voyage rerank-3</a> 是老牌选择，<a href=\"/models/zerank.html\">zerank-2</a> 按 token 算最便宜。",
  "<strong>Commercial product, open weights:</strong> check the licence first. <a href=\"/models/jina-reranker.html\">Jina’s</a> weights are non-commercial.":
    "<strong>商用产品、想用开源权重：</strong>先看许可证。<a href=\"/models/jina-reranker.html\">Jina</a> 的权重是非商用的。",
  "Which numbers can be compared":
    "哪些数字能比",
  "A score only means something next to scores from the same run: the same datasets, the same candidate lists from the same first-stage retriever, the same cut-off. Two numbers from two vendors’ pages are not on one scale, even when both say “nDCG@10” or “BEIR”. This page uses two runs that cover several models at once, and both were run by a vendor with a model of its own in the table, so read them as strong hints and confirm on your own labelled queries (<a href=\"/guides/evaluate-reranker.html\">how</a>).":
    "分数只有和同一次评测里的分数放在一起才有意义：同样的数据集、同一个第一阶段检索器给出的同样的候选列表、同样的截断位置。两家厂商页面上的数字不在同一把尺子上，哪怕两边都写着“nDCG@10”或“BEIR”。本页用的两次评测都一次覆盖了好几个模型，但两次都是由表里有自家模型的厂商来跑的，所以只能当作有力的线索，最终还要在你自己标注的查询上验证（<a href=\"/guides/evaluate-reranker.html\">怎么做</a>）。",
  "Three families have no run to put here. <strong>GTE</strong>: Alibaba publishes its reranking results as a chart, so there is no table to line up. <strong>Cohere</strong>: no benchmark table has been published for Rerank 5. <strong>hs-rerank-1</strong>: Hindsight’s model card shows its results as an image only. They are compared below on size, licence, price and fit instead.":
    "有三类模型没有可放进来的评测。<strong>GTE</strong>：阿里只以图表形式公布 reranker 结果，没有可以对齐的表格。<strong>Cohere</strong>：Rerank 5 没有公布过评测表。<strong>hs-rerank-1</strong>：Hindsight 的模型卡只以图片形式展示结果。下面改从规模、许可证、价格和适用场景来比较它们。",
  "Qwen3 against bge-reranker-v2-m3":
    "Qwen3 对比 bge-reranker-v2-m3",
  "This is Qwen’s own run, from the Qwen3-Reranker model cards: the retrieval subsets of MTEB (English, Chinese, multilingual and code) and MLDR for long documents, each reranking the same top 100 candidates.":
    "这是 Qwen 自己跑的评测，来自 Qwen3-Reranker 的模型卡：MTEB 的检索子集（英文、中文、多语言和代码）以及用于长文档的 MLDR，每项都对同一批前 100 个候选重排。",
  "Model":
    "模型",
  "MTEB-R":
    "MTEB-R",
  "CMTEB-R":
    "CMTEB-R",
  "MMTEB-R":
    "MMTEB-R",
  "MLDR":
    "MLDR",
  "MTEB-Code":
    "MTEB-Code",
  "Qwen3-Reranker-8B":
    "Qwen3-Reranker-8B",
  "Qwen3-Reranker-4B":
    "Qwen3-Reranker-4B",
  "Qwen3-Reranker-0.6B":
    "Qwen3-Reranker-0.6B",
  "bge-reranker-v2-m3":
    "bge-reranker-v2-m3",
  "The 4B and 8B lead bge-reranker-v2-m3 on every column, and the gap is widest on code. The 0.6B is the exception that matters if you work in Chinese: on CMTEB-R it scores {{fact:qwen3-reranker-0.6b.cmteb_r}} against bge’s {{fact:bge-reranker-v2-m3.qwen_cmteb_r}}, so shrinking to 0.6B costs the lead there. The 8B is not clearly better than the 4B: it is ahead only on Chinese, level on multilingual, long documents and code, and behind on English.":
    "4B 和 8B 在每一列上都领先 bge-reranker-v2-m3，差距最大的是代码。如果你做中文，0.6B 是需要留意的例外：它在 CMTEB-R 上是 {{fact:qwen3-reranker-0.6b.cmteb_r}}，而 bge 是 {{fact:bge-reranker-v2-m3.qwen_cmteb_r}}，缩到 0.6B 就丢掉了中文上的领先。8B 也不比 4B 明显更好：只有中文上领先，多语言、长文档和代码基本持平，英文上反而落后。",
  "Qwen3, mxbai and Jina on one BEIR run":
    "同一次 BEIR 评测里的 Qwen3、mxbai 和 Jina",
  "This is Jina’s 2026 evaluation, from the jina-reranker-v3.5 model card. Jina re-ran six models under one protocol (nDCG@10): 13 BEIR datasets, MIRACL for multilingual retrieval, RTEB for professional domains (legal, finance, code, medical) and Struct-IR for structured data, each reranking the top 100 candidates from jina-embeddings-v5-text-small. The table shows four of them; bge-reranker-v2-m3 was not in the run.":
    "这是 Jina 的 2026 年评测，来自 jina-reranker-v3.5 的模型卡。Jina 在同一套协议下重跑了六个模型（nDCG@10）：13 个 BEIR 数据集、用于多语言检索的 MIRACL、用于专业领域（法律、金融、代码、医学）的 RTEB，以及用于结构化数据的 Struct-IR，每项都对 jina-embeddings-v5-text-small 给出的前 100 个候选重排。下表列出其中四个；这次评测里没有 bge-reranker-v2-m3。",
  "BEIR":
    "BEIR",
  "MIRACL":
    "MIRACL",
  "RTEB":
    "RTEB",
  "Struct-IR":
    "Struct-IR",
  "jina-reranker-v3.5 (0.6B)":
    "jina-reranker-v3.5（0.6B）",
  "mxbai-rerank-large-v2 (1.5B)":
    "mxbai-rerank-large-v2（1.5B）",
  "On plain English BEIR the top three are within a point of each other, so that benchmark cannot pick between them. The differences show up elsewhere: Qwen3-Reranker-4B leads on multilingual, professional-domain and structured retrieval by clear margins. Jina’s own model tops BEIR in Jina’s own run; its weights are non-commercial, so for a product the practical comparison is Qwen3 against mxbai.":
    "在纯英文的 BEIR 上，前三名相差不到一分，这个基准分不出高下。差别出现在别处：Qwen3-Reranker-4B 在多语言、专业领域和结构化检索上领先得很明显。Jina 自家的模型在 Jina 自己的评测里拿下 BEIR 第一；它的权重是非商用的，所以做产品时实际要比的是 Qwen3 和 mxbai。",
  "Size, licence and where each runs":
    "规模、许可证和运行环境",
  "Size":
    "规模",
  "Licence":
    "许可证",
  "Languages":
    "语言",
  "Run it on":
    "运行环境",
  "<a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a>":
    "<a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a>",
  "Apache 2.0":
    "Apache 2.0",
  "GPU recommended":
    "建议用 GPU",
  "<a href=\"/models/bge-reranker.html\">bge-reranker-v2-m3</a>":
    "<a href=\"/models/bge-reranker.html\">bge-reranker-v2-m3</a>",
  "Open weights":
    "开源权重",
  "CPU or GPU":
    "CPU 或 GPU",
  "<a href=\"/models/mxbai-rerank.html\">mxbai-rerank-large-v2</a>":
    "<a href=\"/models/mxbai-rerank.html\">mxbai-rerank-large-v2</a>",
  "<a href=\"/models/jina-reranker.html\">jina-reranker-v3.5</a>":
    "<a href=\"/models/jina-reranker.html\">jina-reranker-v3.5</a>",
  "Non-commercial weights":
    "非商用权重",
  "Multilingual":
    "多语言",
  "Hosted API, or weights for research":
    "托管 API，或仅用于研究的权重",
  "<a href=\"/models/gte-reranker.html\">GTE rerankers</a>":
    "<a href=\"/models/gte-reranker.html\">GTE reranker</a>",
  "English / 70+":
    "英文 / 70+ 种语言",
  "CPU, small GPU or browser (English)":
    "CPU、小 GPU 或浏览器（英文模型）",
  "Sizes and licences are from each model’s own page here, which cite the vendors’ model cards; hs-rerank-1 has no page of its own, so its row comes straight from its model card. “Open weights” means the licence is not restated on this page; check the card before shipping.":
    "规模和许可证取自本站各模型页，那些页面引用的是厂商的模型卡；hs-rerank-1 没有自己的页面，它那一行直接来自它的模型卡。“开源权重”表示本页没有复述它的许可证；上线前请去看模型卡。",
  "Hosted APIs":
    "托管 API",
  "You pay per token instead of running a GPU. None of these vendors publishes a comparable benchmark, so the table gives what can be checked: the price and the context length.":
    "按 token 付费，不用自己养 GPU。这几家都没有公布可比的评测，所以表里只列能核对的：价格和上下文长度。",
  "API":
    "API",
  "Price per million tokens":
    "每百万 token 价格",
  "Context":
    "上下文",
  "Benchmark":
    "评测",
  "<a href=\"/models/cohere-rerank.html\">Cohere Rerank 5</a> Pro / Fast":
    "<a href=\"/models/cohere-rerank.html\">Cohere Rerank 5</a> Pro / Fast",
  "{{fact:cohere-rerank-5.context_tokens}} tokens":
    "{{fact:cohere-rerank-5.context_tokens}} token",
  "None published":
    "未公布",
  "<a href=\"/models/voyage-rerank.html\">Voyage rerank-3</a> / lite":
    "<a href=\"/models/voyage-rerank.html\">Voyage rerank-3</a> / lite",
  "{{fact:voyage-rerank-3.context_tokens}} tokens":
    "{{fact:voyage-rerank-3.context_tokens}} token",
  "Voyage’s own evaluations only":
    "仅有 Voyage 自己的评测",
  "<a href=\"/models/zerank.html\">zerank-2</a>":
    "<a href=\"/models/zerank.html\">zerank-2</a>",
  "{{fact:zerank-2.context_tokens}} tokens":
    "{{fact:zerank-2.context_tokens}} token",
  "ZeroEntropy’s own run only":
    "仅有 ZeroEntropy 自己的评测",
  "Per-token and per-search prices are billed differently, so the cheapest sticker price is not always the cheapest bill. The <a href=\"/rerank-cost-calculator.html\">cost calculator</a> works it out for your documents per query and queries per month.":
    "按 token 计费和按次计费的算法不同，所以标价最低的不一定账单最低。<a href=\"/rerank-cost-calculator.html\">成本计算器</a>可以按你每次查询的文档数和每月查询量算出来。",
  "How to decide":
    "怎么选",
  "<strong>Pick two candidates from this page</strong>: one open model you could host and one hosted API.":
    "<strong>先从本页挑两个候选</strong>：一个你能自己部署的开源模型，一个托管 API。",
  "<strong>Label 30–50 real queries</strong> from your own users with the passages that answer them.":
    "<strong>标注 30–50 条真实查询</strong>：取自你自己的用户，并标出能回答它们的段落。",
  "<strong>Run both and compare nDCG@10</strong> on your labels, with the same candidate list. This is the only comparison that predicts your result; <a href=\"/guides/evaluate-reranker.html\">the evaluation guide</a> walks through it.":
    "<strong>两个都跑一遍，比较 nDCG@10</strong>，用你的标注和同一份候选列表。这是唯一能预测你实际效果的比较；<a href=\"/guides/evaluate-reranker.html\">评测指南</a>里有完整步骤。",
  "<strong>Check that reranking is the bottleneck.</strong> If the right passage is never in the candidates, no reranker helps; see <a href=\"/guides/reranking-not-working.html\">why reranking didn’t help</a>.":
    "<strong>确认瓶颈真的是重排序。</strong>如果正确的段落根本没进候选，换什么 reranker 都没用；见<a href=\"/guides/reranking-not-working.html\">为什么重排序没起作用</a>。",
  "See the whole market in one table":
    "一张表看完整个市场",
  "Every model and hosted API, with the protocol behind each score, and a one-click jump to the browser demo.":
    "每个模型和托管 API，附上每个分数背后的评测方法，还能一键跳到浏览器 Demo。",
  "Compare all models →":
    "对比全部模型 →",
  "Choose by scenario →":
    "按场景选型 →",
  "Keep reading":
    "继续阅读",
  "Evaluate rerankers":
    "评测 reranker",
  "Prove the choice on your data.":
    "用你的数据验证选择。",
  "Cost calculator":
    "成本计算器",
  "Per-token and per-search pricing side by side.":
    "按 token 和按次计费的价格并排对比。",
  "_title":
    "2026 年最好的 reranker：Qwen3、bge、mxbai、Jina、GTE、Cohere 横向对比 | reranker.uk",
  "_desc":
    "在同一评测下横向对比 reranker，而不是各家厂商自己的表：Qwen3-Reranker 对比 bge-reranker-v2-m3，mxbai 和 Jina 的同一次评测，以及规模、许可证、托管 API 价格和选型方法。",
}};

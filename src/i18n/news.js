window.I18N_PAGE = { zh: {
  "Reranker news":
    "重排序动态",
  "Releases, price changes and retirements from the companies that make rerankers. One short entry each, with the vendor’s own page as the source. No site housekeeping: that is in the <a href=\"/changelog.html\">changelog</a>.":
    "reranker 厂商的新发布、调价和下线。每条一小段，以厂商自己的页面为出处。不含本站的维护记录，那些在<a href=\"/changelog.html\">更新日志</a>里。",
  "<strong>How this page is kept.</strong> Every morning a script checks Hugging Face and each vendor’s model, pricing and deprecation pages for changes. A person reads the vendor’s own page before anything is written here, and figures are re-checked against it daily. Follow it by <a href=\"/news.rss\">RSS</a>.":
    "<strong>这一页怎么维护。</strong>每天早上有脚本检查 Hugging Face 和各厂商的模型、价格、弃用页面有没有变化。写到这里之前，都先读过厂商自己的页面，数字每天再和它核对一次。可以用 <a href=\"/news.rss\">RSS</a> 订阅。",
  "_title":
    "重排序动态：新模型、调价与下线 | reranker.uk",
  "_desc":
    "reranker 厂商的新发布、调价和下线：Cohere、Voyage、NVIDIA、Pinecone 等。每条都以厂商自己的页面为出处，可用 RSS 订阅。",
  "11 Nov 2026 — sentence-transformers 6.3.0":
    "2026 年 11 月 11 日 —— sentence-transformers 6.3.0",
  "The library most people use to run open rerankers shipped 6.3.0. The release is mostly about multi-vector (ColBERT-style) training; nothing changes for scoring with <code>CrossEncoder</code>. We ran this site’s self-hosting quick start, the GTE and mxbai examples and the ColBERT snippet on it, unchanged.":
    "大多数人用来跑开源 reranker 的库发布了 6.3.0。这一版主要是多向量（ColBERT 一类）的训练；用 <code>CrossEncoder</code> 打分没有变化。本站的自建快速上手、GTE 和 mxbai 示例、ColBERT 片段都在这一版上原样跑过。",
  "Source: <a href=\"https://github.com/UKPLab/sentence-transformers/releases/tag/v6.3.0\" rel=\"noopener noreferrer\">release notes</a>. On this site: <a href=\"/guides/self-host-reranker.html\">self-hosting guide</a>.":
    "出处：<a href=\"https://github.com/UKPLab/sentence-transformers/releases/tag/v6.3.0\" rel=\"noopener noreferrer\">发布说明</a>。本站：<a href=\"/guides/self-host-reranker.html\">自建指南</a>。",
  "5 Nov 2026 — Cohere prices Model Vault by the GPU":
    "2026 年 11 月 5 日 —— Cohere 的 Model Vault 改为按 GPU 计价",
  "Cohere’s pricing page now lists Model Vault, its dedicated deployment, as an hourly rate per GPU type: from ${{fact:cohere-rerank-5.vault_l4_usd_per_gpu_hour}} per GPU-hour for an L4 on demand, times the number of replicas. The per-model rates it listed for Rerank 5 in October are gone. Pay-as-you-go Rerank 5 prices are unchanged.":
    "Cohere 的价格页现在把专属部署 Model Vault 按 GPU 型号列出每小时价格：按需的 L4 每 GPU 小时 ${{fact:cohere-rerank-5.vault_l4_usd_per_gpu_hour}} 起，再乘以副本数。10 月给 Rerank 5 列出的按模型价格已经撤掉。按量付费的 Rerank 5 价格没有变。",
  "Source: <a href=\"https://cohere.com/pricing\" rel=\"noopener noreferrer\">Cohere pricing</a>. On this site: <a href=\"/models/cohere-rerank.html#pricing\">Cohere Rerank pricing</a>.":
    "出处：<a href=\"https://cohere.com/pricing\" rel=\"noopener noreferrer\">Cohere 价格页</a>。本站：<a href=\"/models/cohere-rerank.html#pricing\">Cohere Rerank 价格</a>。",
  "3 Nov 2026 — Pinecone deprecates pinecone-rerank-v0":
    "2026 年 11 月 3 日 —— Pinecone 弃用 pinecone-rerank-v0",
  "Pinecone’s docs now mark its own reranker as deprecated: it still serves requests, but shouldn’t be used for new projects. No shutdown date is given. The two other rerankers Pinecone hosts, <code>bge-reranker-v2-m3</code> and <code>cohere-rerank-4-fast</code>, are unaffected.":
    "Pinecone 的文档现在把它自家的 reranker 标为已弃用：仍然响应请求，但新项目不应再用。没有给出停用日期。Pinecone 托管的另外两个 reranker（<code>bge-reranker-v2-m3</code> 和 <code>cohere-rerank-4-fast</code>）不受影响。",
  "Source: <a href=\"https://docs.pinecone.io/models/pinecone-rerank-v0\" rel=\"noopener noreferrer\">Pinecone model page</a>. On this site: <a href=\"/guides/rerank-vector-database.html#pinecone\">reranking inside Pinecone</a>.":
    "出处：<a href=\"https://docs.pinecone.io/models/pinecone-rerank-v0\" rel=\"noopener noreferrer\">Pinecone 模型页</a>。本站：<a href=\"/guides/rerank-vector-database.html#pinecone\">在 Pinecone 里重排序</a>。",
  "30 Oct 2026 — Pinecone halves a limit on cohere-rerank-4-fast":
    "2026 年 10 月 30 日 —— Pinecone 把 cohere-rerank-4-fast 的一项上限减半",
  "<code>cohere-rerank-4-fast</code> on Pinecone now takes {{fact:pinecone-rerank.cohere_4_fast_max_tokens_per_doc}} tokens per document, half of what Pinecone’s docs listed before. Longer documents are truncated, so check your chunk sizes if you rerank long passages there.":
    "Pinecone 上的 <code>cohere-rerank-4-fast</code> 现在每篇文档最多 {{fact:pinecone-rerank.cohere_4_fast_max_tokens_per_doc}} token，是 Pinecone 文档此前所列的一半。更长的文档会被截断，在那里重排长段落的话请检查分块大小。",
  "Source: <a href=\"https://docs.pinecone.io/models/cohere-rerank-4-fast\" rel=\"noopener noreferrer\">Pinecone model page</a>. On this site: <a href=\"/guides/rerank-vector-database.html#pinecone\">reranking inside Pinecone</a>.":
    "出处：<a href=\"https://docs.pinecone.io/models/cohere-rerank-4-fast\" rel=\"noopener noreferrer\">Pinecone 模型页</a>。本站：<a href=\"/guides/rerank-vector-database.html#pinecone\">在 Pinecone 里重排序</a>。",
  "29 Oct 2026 — Nemotron-3.5-Rerank-8B becomes a NIM":
    "2026 年 10 月 29 日 —— Nemotron-3.5-Rerank-8B 有了 NIM",
  "NVIDIA’s NIM release 2.4 serves the 8B reranker as the <code>nemotron-rerank</code> container. It is capped at {{fact:nemotron-3.5-rerank-8b.nim_default_tokens}} tokens per query-document pair by default, and the limit can be raised to the model’s full {{fact:nemotron-3.5-rerank-8b.context_tokens}}. The older llama-nemotron rerankers stay on NIM 2.3.":
    "NVIDIA 的 NIM 2.4 以 <code>nemotron-rerank</code> 容器提供这个 8B reranker。默认每个查询-文档对上限 {{fact:nemotron-3.5-rerank-8b.nim_default_tokens}} token，可以调到模型完整的 {{fact:nemotron-3.5-rerank-8b.context_tokens}}。较早的 llama-nemotron reranker 留在 NIM 2.3。",
  "On this site: <a href=\"/models/nvidia-rerank.html\">NVIDIA Nemotron rerankers</a>.":
    "本站：<a href=\"/models/nvidia-rerank.html\">NVIDIA Nemotron reranker</a>。",
  "28 Oct 2026 — Hindsight releases hs-rerank-1":
    "2026 年 10 月 28 日 —— Hindsight 发布 hs-rerank-1",
  "A small multilingual cross-encoder under the MIT licence: {{fact:hs-rerank-1.params}} parameters, of which {{fact:hs-rerank-1.embedding_params}} are the embedding table, {{fact:hs-rerank-1.context_tokens}} tokens of context, eight languages including Chinese, Japanese and Korean, and an int8 ONNX file for CPUs. Its model card shows results only as an image, so there is no published number to compare it by yet.":
    "一个 MIT 许可证的小型多语言 cross-encoder：{{fact:hs-rerank-1.params}} 参数（其中 {{fact:hs-rerank-1.embedding_params}} 是词嵌入表），{{fact:hs-rerank-1.context_tokens}} token 上下文，支持包括中、日、韩在内的八种语言，并提供给 CPU 用的 int8 ONNX 文件。它的模型卡只以图片展示结果，所以目前没有可以用来比较的公开数字。",
  "Source: <a href=\"https://huggingface.co/hindsight-ai/hs-rerank-1\" rel=\"noopener noreferrer\">model card</a>. On this site: <a href=\"/models/#hs-rerank-1\">models table</a>.":
    "出处：<a href=\"https://huggingface.co/hindsight-ai/hs-rerank-1\" rel=\"noopener noreferrer\">模型卡</a>。本站：<a href=\"/models/#hs-rerank-1\">模型对比表</a>。",
  "21 Oct 2026 — Cohere releases Rerank 5":
    "2026 年 10 月 21 日 —— Cohere 发布 Rerank 5",
  "Two models, <code>rerank-v5.0-pro</code> (about {{fact:cohere-rerank-5.pro_params}} parameters) and <code>rerank-v5.0-fast</code> (about {{fact:cohere-rerank-5.fast_params}}), both with {{fact:cohere-rerank-5.context_tokens}} tokens of context. New: calibrated 0–1 scores, so one threshold works across queries, and Context Focus, which returns the passages inside a document that answer the query. Pricing moved from per search to per token: ${{fact:cohere-rerank-5.pro_usd_per_m}} per million tokens for Pro and ${{fact:cohere-rerank-5.fast_usd_per_m}} for Fast. Rerank 4 is still served, but its prices left the pricing page.":
    "两个模型：<code>rerank-v5.0-pro</code>（约 {{fact:cohere-rerank-5.pro_params}} 参数）和 <code>rerank-v5.0-fast</code>（约 {{fact:cohere-rerank-5.fast_params}}），上下文都是 {{fact:cohere-rerank-5.context_tokens}} token。新增：校准过的 0–1 分数，一个阈值可以跨查询使用；以及 Context Focus，返回文档里回答查询的段落。计价从按搜索次数改为按 token：Pro 每百万 token ${{fact:cohere-rerank-5.pro_usd_per_m}}，Fast ${{fact:cohere-rerank-5.fast_usd_per_m}}。Rerank 4 仍在服务，但价格已从价格页撤下。",
  "Source: <a href=\"https://cohere.com/blog/rerank-5\" rel=\"noopener noreferrer\">Cohere’s announcement</a>. On this site: <a href=\"/models/cohere-rerank.html\">Cohere Rerank review</a>.":
    "出处：<a href=\"https://cohere.com/blog/rerank-5\" rel=\"noopener noreferrer\">Cohere 的发布公告</a>。本站：<a href=\"/models/cohere-rerank.html\">Cohere Rerank 评测</a>。",
  "20 Oct 2026 — NVIDIA releases Nemotron-3.5-Rerank-8B":
    "2026 年 10 月 20 日 —— NVIDIA 发布 Nemotron-3.5-Rerank-8B",
  "An {{fact:nemotron-3.5-rerank-8b.params}} reranker that scores text, page images or both, with {{fact:nemotron-3.5-rerank-8b.context_tokens}} tokens of context and a licence that allows commercial use. In NVIDIA’s own run it scores {{fact:nemotron-3.5-rerank-8b.vidore_v3_image}} on ViDoRe V3 with page images, ahead of Qwen3-VL-Reranker-8B; other labs report different figures for the Qwen model, and our page sets them side by side.":
    "一个 {{fact:nemotron-3.5-rerank-8b.params}} 的 reranker，可以给文本、页面图片或两者一起打分，上下文 {{fact:nemotron-3.5-rerank-8b.context_tokens}} token，许可证允许商用。在 NVIDIA 自己的评测里，它用页面图片在 ViDoRe V3 上得到 {{fact:nemotron-3.5-rerank-8b.vidore_v3_image}}，高于 Qwen3-VL-Reranker-8B；其他机构对这个 Qwen 模型报告的数字不同，本站页面把它们并排列出。",
  "Source: <a href=\"https://huggingface.co/nvidia/Nemotron-3.5-Rerank-8B-BF16\" rel=\"noopener noreferrer\">model card</a>. On this site: <a href=\"/models/nvidia-rerank.html\">NVIDIA Nemotron rerankers</a>.":
    "出处：<a href=\"https://huggingface.co/nvidia/Nemotron-3.5-Rerank-8B-BF16\" rel=\"noopener noreferrer\">模型卡</a>。本站：<a href=\"/models/nvidia-rerank.html\">NVIDIA Nemotron reranker</a>。",
  "30 Sep 2026 — Voyage releases rerank-3":
    "2026 年 9 月 30 日 —— Voyage 发布 rerank-3",
  "A drop-in upgrade from rerank-2.5 at the same price, ${{fact:voyage-rerank-3.price_per_m_tokens}} per million tokens, with {{fact:voyage-rerank-3.context_tokens}} tokens of context. It still takes natural-language instructions. Voyage reports its largest gain on long documents, {{fact:voyage-rerank-3.longdoc_gain_vs_2_5}} over rerank-2.5 in its own evaluation.":
    "rerank-2.5 的直接升级，价格不变：每百万 token ${{fact:voyage-rerank-3.price_per_m_tokens}}，上下文 {{fact:voyage-rerank-3.context_tokens}} token。仍然支持自然语言指令。Voyage 说提升最大的是长文档：在它自己的评测里比 rerank-2.5 高 {{fact:voyage-rerank-3.longdoc_gain_vs_2_5}}。",
  "Source: <a href=\"https://blog.voyageai.com/2026/09/30/rerank-3/\" rel=\"noopener noreferrer\">Voyage’s announcement</a>. On this site: <a href=\"/models/voyage-rerank.html\">Voyage Rerank review</a>.":
    "出处：<a href=\"https://blog.voyageai.com/2026/09/30/rerank-3/\" rel=\"noopener noreferrer\">Voyage 的发布公告</a>。本站：<a href=\"/models/voyage-rerank.html\">Voyage Rerank 评测</a>。",
}};

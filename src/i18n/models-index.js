window.I18N_PAGE = {
  keys: {
    "models.tableAriaLabel": "重排序模型对比表",
    "models.tableCaption": "重排序模型对比：架构、类型、适用场景、语言、延迟、价格与 BEIR 分数",
  },
  zh: {
  "<a href=\"/models/voyage-rerank\">Voyage rerank-3</a>":
    "<a href=\"/models/voyage-rerank\">Voyage rerank-3</a>",
  "<span class=\"pill\">Hosted API</span><span class=\"pill warn\">Preview</span>":
    "<span class=\"pill\">托管 API</span><span class=\"pill warn\">预览版</span>",
  "Preview":
    "预览版",
  "Preview successor to 2.5; carries the free-token grant":
    "2.5 的预览版继任者；带免费 token 额度",
  "$0.05/M tokens† <span class=\"muted\">(200M free)</span>":
    "$0.05/M token† <span class=\"muted\">（前 2 亿免费）</span>",
  "<a href=\"/models/voyage-rerank\">Voyage rerank-3-lite</a>":
    "<a href=\"/models/voyage-rerank\">Voyage rerank-3-lite</a>",
  "Cheaper preview tier; same 32k ctx":
    "更便宜的预览档位；同样 32k 上下文",
  "<a href=\"/models/mxbai-rerank.html\">mxbai-rerank-large-v2</a>":
    "<a href=\"/models/mxbai-rerank.html\">mxbai-rerank-large-v2</a>",
  "<a href=\"/models/mxbai-rerank.html\">mxbai-rerank-base-v2</a>":
    "<a href=\"/models/mxbai-rerank.html\">mxbai-rerank-base-v2</a>",
  "$0.02/M tokens† <span class=\"muted\">(200M free)</span>":
    "$0.02/M token† <span class=\"muted\">（前 2 亿免费）</span>",
  "<strong>Last verified:</strong> September 2026 (added Voyage rerank-3 preview; corrected Voyage free-tier and Cohere chunking claims) · <strong>Next review:</strong> Nov 2026. Columns marked <strong>*</strong> use MTEB-R, vendor, or task-specific protocols — <em>not</em> the same classic BEIR 18-dataset avg as the bge/mxbai/Jina rows. Where a vendor publishes no comparable number we say <em>not published</em> rather than guess. <strong>†</strong> Note the differing units: Cohere bills per <em>search</em> (one query + up to 100 docs), Voyage per <em>token</em>. Our <a href=\"/rerank-cost-calculator\">cost calculator</a> works out which is cheaper for your volume. Demo-capable models only: mxbai xsmall, Jina tiny, ms-marco MiniLM.":
    "<strong>最近核对：</strong>2026 年 9 月（新增 Voyage rerank-3 预览版；修正了 Voyage 免费额度与 Cohere 分块两处说法）· <strong>下次复核：</strong>2026 年 11 月。标 <strong>*</strong> 的列使用 MTEB-R、厂商或任务特定协议，<em>不同于</em> bge / mxbai / Jina 行所用的经典 BEIR 18 数据集均值。厂商未公布可比数字时，我们写「未公布」而不去猜。<strong>†</strong> 注意计价单位不同：Cohere 按<em>每次检索</em>（一个 query + 最多 100 篇文档）计费，Voyage 按 <em>token</em> 计费。我们的<a href=\"/rerank-cost-calculator\">成本计算器</a>可以算出在你的量级下哪家更便宜。可在 Demo 中运行的仅有：mxbai xsmall、Jina tiny、ms-marco MiniLM。",
  "<strong>Last verified:</strong> September 2026 (added mxbai-rerank-v2; corrected mxbai-rerank-large-v1's BEIR figure, which this table carried at an unsourced ~62.1 — mixedbread's own comparison table puts it at {{fact:mxbai-rerank-large-v1.beir}}) · <strong>Next review:</strong> Nov 2026. Columns marked <strong>*</strong> use MTEB-R, vendor, or task-specific protocols — <em>not</em> the same classic BEIR 18-dataset avg as the bge/Jina rows. Where a vendor publishes no comparable number we say <em>not published</em> rather than guess. <strong>†</strong> Note the differing units: Cohere bills per <em>search</em> (one query + up to 100 docs), Voyage per <em>token</em>. Our <a href=\"/rerank-cost-calculator.html\">cost calculator</a> works out which is cheaper for your volume. Demo-capable models only: mxbai xsmall, Jina tiny, ms-marco MiniLM.":
    "<strong>最近核对：</strong>2026 年 9 月（新增 mxbai-rerank-v2；修正了 mxbai-rerank-large-v1 的 BEIR 数字 —— 本表此前挂着一个没有来源的 ~62.1，而 mixedbread 自己的对比表给出的是 {{fact:mxbai-rerank-large-v1.beir}}）· <strong>下次复核：</strong>2026 年 11 月。标 <strong>*</strong> 的列使用 MTEB-R、厂商或任务特定协议，<em>不同于</em> bge / Jina 行所用的经典 BEIR 18 数据集均值。厂商未公布可比数字时，我们写「未公布」而不去猜。<strong>†</strong> 注意计价单位不同：Cohere 按<em>每次检索</em>（一个 query + 最多 100 篇文档）计费，Voyage 按 <em>token</em> 计费。我们的<a href=\"/rerank-cost-calculator.html\">成本计算器</a>可以算出在你的量级下哪家更便宜。可在 Demo 中运行的仅有：mxbai xsmall、Jina tiny、ms-marco MiniLM。",
  "<strong>Last verified:</strong> September 2026 (added mxbai-rerank-v2; corrected mxbai-rerank-large-v1's BEIR figure, which this table carried at an unsourced ~62.1 — mixedbread's own comparison table puts it at {{fact:mxbai-rerank-large-v1.beir}}; ms-marco MiniLM-L6 now reads not published — sentence-transformers' own docs report NDCG@10 on TREC DL 19, not a BEIR average, so the ~55.0 this table carried had nowhere to point) · <strong>Next review:</strong> Nov 2026. Columns marked <strong>*</strong> use MTEB-R, vendor, or task-specific protocols — <em>not</em> the same classic BEIR 18-dataset avg as the bge/Jina rows. Where a vendor publishes no comparable number we say <em>not published</em> rather than guess. <strong>†</strong> Note the differing units: Cohere bills per <em>search</em> (one query + up to 100 docs), Voyage per <em>token</em>. Our <a href=\"/rerank-cost-calculator.html\">cost calculator</a> works out which is cheaper for your volume. Demo-capable models only: mxbai xsmall, Jina tiny, ms-marco MiniLM.":
    "<strong>最近核对：</strong>2026 年 9 月（新增 mxbai-rerank-v2；修正了 mxbai-rerank-large-v1 的 BEIR 数字 —— 本表此前挂着一个没有来源的 ~62.1，而 mixedbread 自己的对比表给出的是 {{fact:mxbai-rerank-large-v1.beir}}；ms-marco MiniLM-L6 现在写「未公布」—— sentence-transformers 自己的文档给的是 TREC DL 19 上的 NDCG@10，并不是 BEIR 均值，所以本表此前挂着的 ~55.0 根本无处可查）· <strong>下次复核：</strong>2026 年 11 月。标 <strong>*</strong> 的列使用 MTEB-R、厂商或任务特定协议，<em>不同于</em> bge / Jina 行所用的经典 BEIR 18 数据集均值。厂商未公布可比数字时，我们写「未公布」而不去猜。<strong>†</strong> 注意计价单位不同：Cohere 按<em>每次检索</em>（一个 query + 最多 100 篇文档）计费，Voyage 按 <em>token</em> 计费。我们的<a href=\"/rerank-cost-calculator.html\">成本计算器</a>可以算出在你的量级下哪家更便宜。可在 Demo 中运行的仅有：mxbai xsmall、Jina tiny、ms-marco MiniLM。",
  "<strong>Last verified:</strong> October 2026 (added jina-reranker-v3.5; Jina rows now share one 2026 protocol; bge-reranker-v2-m3 corrected from an untraceable ~60.1 to BAAI's own {{fact:bge-reranker-v2-m3.beir}}; Jina v1 tiny and ms-marco MiniLM-L6 now show the BEIR figures Jina published for them; in September, mxbai-rerank-large-v1 was corrected from an unsourced ~62.1) · <strong>Next review:</strong> Nov 2026. <strong>*</strong> No two vendors run BEIR the same way — BAAI average 15 datasets over bge-large-en-v1.5's top 100, Jina 13 datasets over jina-embeddings-v5-text-small's top 100, mixedbread their own set — so every BEIR figure here carries a * and its protocol on hover. The differences are not small: Jina's run puts bge-reranker-v2-m3 at 56.51 against BAAI's own 55.36, and mxbai-rerank-large-v2 at 61.44 against mixedbread's 57.49. Read the column as rough tiers, not decimals. Other * cells use MTEB-R or task-specific metrics. Where a vendor publishes no comparable number we say <em>not published</em> rather than guess. <strong>†</strong> Note the differing units: Cohere bills per <em>search</em> (one query + up to 100 docs, each counted once per {{fact:cohere-rerank.billing_chunk_tokens}} tokens), Voyage per <em>token</em>. Our <a href=\"/rerank-cost-calculator.html\">cost calculator</a> works out which is cheaper for your volume. Demo-capable models only: mxbai xsmall, Jina tiny, ms-marco MiniLM.":
    "<strong>最近核对：</strong>2026 年 10 月（新增 jina-reranker-v3.5；Jina 各行改用同一套 2026 年评测；bge-reranker-v2-m3 由查不到出处的 ~60.1 改为 BAAI 自己公布的 {{fact:bge-reranker-v2-m3.beir}}；Jina v1 tiny 与 ms-marco MiniLM-L6 现在显示 Jina 为它们公布的 BEIR 分数；9 月已将 mxbai-rerank-large-v1 由没有来源的 ~62.1 修正）· <strong>下次复核：</strong>2026 年 11 月。<strong>*</strong> 各家跑 BEIR 的方式都不一样 —— BAAI 用 15 个数据集、对 bge-large-en-v1.5 召回的前 100 条重排，Jina 用 13 个数据集、对 jina-embeddings-v5-text-small 的前 100 条重排，mixedbread 用自己选的一套 —— 所以本列每个 BEIR 数字都带 *，鼠标悬停可见其评测方法。差距并不小：Jina 的评测里 bge-reranker-v2-m3 是 56.51，BAAI 自己测的是 55.36；mxbai-rerank-large-v2 在 Jina 那边是 61.44，mixedbread 自己测的是 57.49。请把这一列当作大致的档位，而不是精确到小数的排名。其余带 * 的格子用的是 MTEB-R 或任务特定指标。厂商未公布可比数字时，我们写「未公布」而不去猜。<strong>†</strong> 注意计价单位不同：Cohere 按<em>每次检索</em>（一个 query + 最多 100 篇文档，每篇按每 {{fact:cohere-rerank.billing_chunk_tokens}} token 计一次）计费，Voyage 按 <em>token</em> 计费。我们的<a href=\"/rerank-cost-calculator.html\">成本计算器</a>可以算出在你的量级下哪家更便宜。可在 Demo 中运行的仅有：mxbai xsmall、Jina tiny、ms-marco MiniLM。",
  "The preview <code>rerank-3</code> tier now carries the 200M free-token grant that 2.5 launched with; 33% off via the Batch API":
    "预览版 <code>rerank-3</code> 现在带着 2.5 当初发布时的那份 2 亿免费 token 额度；走 Batch API 还能再打 67 折",
  "Classic baseline; largest of the three demo models": "经典基线；三个 Demo 模型里体积最大",
  "<strong>Last verified:</strong> August 2026 (Cohere Rerank 4, Voyage rerank-2.5, Jina v3 BEIR, nemotron-1b) · <strong>Next review:</strong> Nov 2026. Columns marked <strong>*</strong> use MTEB-R, vendor, or task-specific protocols — <em>not</em> the same classic BEIR 18-dataset avg as the bge/mxbai/Jina rows. Where a vendor publishes no comparable number we say <em>not published</em> rather than guess. <strong>†</strong> Note the differing units: Cohere bills per <em>search</em> (one query + up to 100 docs), Voyage per <em>token</em>. Our <a href=\"/rerank-cost-calculator.html\">cost calculator</a> works out which is cheaper for your volume. Demo-capable models only: mxbai xsmall, Jina tiny, ms-marco MiniLM.":
    "<strong>最近核对：</strong>2026 年 8 月（Cohere Rerank 4、Voyage rerank-2.5、Jina v3 的 BEIR、nemotron-1b）· <strong>下次复核：</strong>2026 年 11 月。标 <strong>*</strong> 的列使用 MTEB-R、厂商或任务特定协议，<em>不同于</em> bge / mxbai / Jina 行所用的经典 BEIR 18 数据集均值。厂商未公布可比数字时，我们写「未公布」而不去猜。<strong>†</strong> 注意计价单位不同：Cohere 按<em>每次检索</em>（一个 query + 最多 100 篇文档）计费，Voyage 按 <em>token</em> 计费。我们的<a href=\"/rerank-cost-calculator.html\">成本计算器</a>可以算出在你的量级下哪家更便宜。可在 Demo 中运行的仅有：mxbai xsmall、Jina tiny、ms-marco MiniLM。",
  "Sources: <a href=\"https://huggingface.co/Qwen\" rel=\"noopener noreferrer\">Qwen3-Reranker</a> · <a href=\"https://arxiv.org/abs/2509.25085\" rel=\"noopener noreferrer\">jina-reranker-v3 paper</a> · <a href=\"https://docs.voyageai.com/docs/reranker\" rel=\"noopener noreferrer\">Voyage rerankers</a> · <a href=\"https://huggingface.co/nvidia/llama-nemotron-rerank-1b-v2\" rel=\"noopener noreferrer\">nemotron-rerank</a> · <a href=\"https://huggingface.co/spaces/mteb/leaderboard\" rel=\"noopener noreferrer\">MTEB</a> · <a href=\"https://github.com/beir-cellar/beir\" rel=\"noopener noreferrer\">BEIR</a> · <a href=\"https://huggingface.co/BAAI/bge-reranker-v2-m3\" rel=\"noopener noreferrer\">BAAI</a> · <a href=\"https://huggingface.co/Alibaba-NLP/gte-reranker-modernbert-base\" rel=\"noopener noreferrer\">GTE ModernBERT</a> · <a href=\"/models/qwen-reranker.html\">Qwen guide</a> · <a href=\"/guides/instruction-reranker.html\">instruction</a> · <a href=\"/guides/late-interaction-rerank.html\">ColBERT</a>":
    "资料来源： <a href=\"https://huggingface.co/Qwen\" rel=\"noopener noreferrer\">Qwen3-Reranker</a> · <a href=\"https://arxiv.org/abs/2509.25085\" rel=\"noopener noreferrer\">jina-reranker-v3 论文</a> · <a href=\"https://docs.voyageai.com/docs/reranker\" rel=\"noopener noreferrer\">Voyage 重排序器</a> · <a href=\"https://huggingface.co/nvidia/llama-nemotron-rerank-1b-v2\" rel=\"noopener noreferrer\">nemotron-rerank</a> · <a href=\"https://huggingface.co/spaces/mteb/leaderboard\" rel=\"noopener noreferrer\">MTEB</a> · <a href=\"https://github.com/beir-cellar/beir\" rel=\"noopener noreferrer\">BEIR</a> · <a href=\"https://huggingface.co/BAAI/bge-reranker-v2-m3\" rel=\"noopener noreferrer\">BAAI</a> · <a href=\"https://huggingface.co/Alibaba-NLP/gte-reranker-modernbert-base\" rel=\"noopener noreferrer\">GTE ModernBERT</a> · <a href=\"/models/qwen-reranker.html\">Qwen 指南</a> · <a href=\"/guides/instruction-reranker.html\">指令跟随</a> · <a href=\"/guides/late-interaction-rerank.html\">ColBERT</a>",
  "Sources: <a href=\"https://huggingface.co/Qwen\" rel=\"noopener noreferrer\">Qwen3-Reranker</a> · <a href=\"https://huggingface.co/jinaai/jina-reranker-v3.5\" rel=\"noopener noreferrer\">jina-reranker-v3.5</a> · <a href=\"https://arxiv.org/abs/2509.25085\" rel=\"noopener noreferrer\">jina-reranker-v3 paper</a> · <a href=\"https://huggingface.co/jinaai/jina-reranker-v1-tiny-en\" rel=\"noopener noreferrer\">jina-reranker-v1</a> · <a href=\"https://docs.voyageai.com/docs/reranker\" rel=\"noopener noreferrer\">Voyage rerankers</a> · <a href=\"https://github.com/mixedbread-ai/mxbai-rerank\" rel=\"noopener noreferrer\">mxbai-rerank</a> · <a href=\"https://huggingface.co/nvidia/llama-nemotron-rerank-1b-v2\" rel=\"noopener noreferrer\">nemotron-rerank</a> · <a href=\"https://huggingface.co/spaces/mteb/leaderboard\" rel=\"noopener noreferrer\">MTEB</a> · <a href=\"https://github.com/beir-cellar/beir\" rel=\"noopener noreferrer\">BEIR</a> · <a href=\"https://github.com/FlagOpen/FlagEmbedding/tree/master/research/llm_reranker\" rel=\"noopener noreferrer\">BAAI evals</a> · <a href=\"https://huggingface.co/Alibaba-NLP/gte-reranker-modernbert-base\" rel=\"noopener noreferrer\">GTE ModernBERT</a> · <a href=\"/models/qwen-reranker.html\">Qwen guide</a> · <a href=\"/guides/instruction-reranker.html\">instruction</a> · <a href=\"/guides/late-interaction-rerank.html\">ColBERT</a>":
    "资料来源： <a href=\"https://huggingface.co/Qwen\" rel=\"noopener noreferrer\">Qwen3-Reranker</a> · <a href=\"https://huggingface.co/jinaai/jina-reranker-v3.5\" rel=\"noopener noreferrer\">jina-reranker-v3.5</a> · <a href=\"https://arxiv.org/abs/2509.25085\" rel=\"noopener noreferrer\">jina-reranker-v3 论文</a> · <a href=\"https://huggingface.co/jinaai/jina-reranker-v1-tiny-en\" rel=\"noopener noreferrer\">jina-reranker-v1</a> · <a href=\"https://docs.voyageai.com/docs/reranker\" rel=\"noopener noreferrer\">Voyage 重排序器</a> · <a href=\"https://github.com/mixedbread-ai/mxbai-rerank\" rel=\"noopener noreferrer\">mxbai-rerank</a> · <a href=\"https://huggingface.co/nvidia/llama-nemotron-rerank-1b-v2\" rel=\"noopener noreferrer\">nemotron-rerank</a> · <a href=\"https://huggingface.co/spaces/mteb/leaderboard\" rel=\"noopener noreferrer\">MTEB</a> · <a href=\"https://github.com/beir-cellar/beir\" rel=\"noopener noreferrer\">BEIR</a> · <a href=\"https://github.com/FlagOpen/FlagEmbedding/tree/master/research/llm_reranker\" rel=\"noopener noreferrer\">BAAI 评测</a> · <a href=\"https://huggingface.co/Alibaba-NLP/gte-reranker-modernbert-base\" rel=\"noopener noreferrer\">GTE ModernBERT</a> · <a href=\"/models/qwen-reranker.html\">Qwen 指南</a> · <a href=\"/guides/instruction-reranker.html\">指令跟随</a> · <a href=\"/guides/late-interaction-rerank.html\">ColBERT</a>",
  "Production stacks mix <strong>cross-encoders</strong>, <strong>listwise</strong> models, <strong>late-interaction</strong>, and instruction-following rerankers. The headline of 2026 is that <strong>size stopped predicting quality</strong>: a 0.6B listwise model (Jina v3.5) edges Qwen3-Reranker-4B on BEIR in Jina's own test, and in Qwen's own tests the 4B beats its 8B on English retrieval. Architecture, latency, languages and cost below — with honest footnotes wherever score protocols differ.":
    "生产环境往往混用 <strong>cross-encoder</strong>、<strong>listwise</strong> 模型、<strong>late-interaction</strong> 以及指令跟随重排序器。2026 年最值得注意的一点是：<strong>参数量不再预测质量</strong> —— 0.6B 的 listwise 模型（Jina v3.5）在 Jina 自己的测试里，BEIR 略高于 Qwen3-Reranker-4B，而在 Qwen 自己的测试里，4B 在英文检索上胜过自家的 8B。下表对比架构、延迟、语言与成本，凡评测协议不一致处均如实标注。",
  "<span class=\"pill good\">Apache 2.0</span><span class=\"pill info\">Best Qwen3 size</span>":
    "<span class=\"pill good\">Apache 2.0</span><span class=\"pill info\">Qwen3 最佳档位</span>",
  "Strongest multilingual open self-host (GPU)":
    "多语言开源自托管最强（需 GPU）",
  "Largest Qwen3 — but 4B edges it on BEIR":
    "Qwen3 最大档 —— 但 BEIR 上 4B 更好",
  "<span class=\"pill good\">Open + Hosted</span><span class=\"pill info\">Beats Qwen3-4B</span>":
    "<span class=\"pill good\">开源 + 托管</span><span class=\"pill info\">优于 Qwen3-4B</span>",
  "0.6B listwise; 64 docs in one 131K ctx":
    "0.6B listwise；64 篇文档共享 131K 上下文",
  "Mature multilingual API; 32k ctx":
    "成熟的多语言 API；32k 上下文",
  "Throughput / latency-tuned sibling":
    "面向吞吐与延迟调优的同系版本",
  "Instruction-following; 32k ctx":
    "支持指令跟随；32k 上下文",
  "Cheaper tier; same 32k ctx":
    "更便宜的档位；同样 32k 上下文",
  "~149M, yet ties nemotron-1b on Hit@1":
    "仅约 149M，Hit@1 却与 nemotron-1b 打平",
  "1.2B; top accuracy when latency is free":
    "1.2B；在不计延迟时精度居首",
  "Multilingual (MIRACL / MLQA evals)":
    "多语言（MIRACL / MLQA 评测）",
  "<strong>Last verified:</strong> August 2026 (Cohere Rerank 4, Voyage rerank-2.5, Jina v3 BEIR, nemotron-1b) · <strong>Next review:</strong> Nov 2026. Columns marked <strong>*</strong> use MTEB-R, vendor, or task-specific protocols — <em>not</em> the same classic BEIR 18-dataset avg as the bge/mxbai/Jina rows. Where a vendor publishes no comparable number we say <em>not published</em> rather than guess. <strong>†</strong> Note the differing units: Cohere bills per <em>search</em> (one query + up to 100 docs), Voyage per <em>token</em>. Demo-capable models only: mxbai xsmall, Jina tiny, ms-marco MiniLM.":
    "<strong>最近核对：</strong>2026 年 8 月（Cohere Rerank 4、Voyage rerank-2.5、Jina v3 的 BEIR、nemotron-1b）· <strong>下次复核：</strong>2026 年 11 月。标 <strong>*</strong> 的列使用 MTEB-R、厂商或任务特定协议，<em>不同于</em> bge / mxbai / Jina 行所用的经典 BEIR 18 数据集均值。厂商未公布可比数字时，我们写「未公布」而不去猜。<strong>†</strong> 注意计价单位不同：Cohere 按<em>每次检索</em>（一个 query + 最多 100 篇文档）计费，Voyage 按 <em>token</em> 计费。可在 Demo 中运行的仅有：mxbai xsmall、Jina tiny、ms-marco MiniLM。",
  "0.6B / 4B / 8B, 32K context. Start at 4B — it reportedly edges the 8B on BEIR, so the largest size is not the automatic answer.":
    "0.6B / 4B / 8B，32K 上下文。从 4B 开始 —— 据报告它在 BEIR 上略胜 8B，所以「越大越好」在这里并不成立。",
  "Pro and Fast variants, 32k context, 100+ languages. Billed per search — one query plus up to 100 documents — not per document.":
    "Pro 与 Fast 两个版本，32k 上下文，100+ 语言。按「次检索」计费 —— 一个 query 加最多 100 篇文档 —— 而不是按文档数。",
  "0.6B listwise model scoring 61.94 on BEIR — ahead of Qwen3-Reranker-4B at a sixth of the size. v1-tiny still powers our demo.":
    "0.6B 的 listwise 模型，BEIR 得分 61.94 —— 以约六分之一的体量超过 Qwen3-Reranker-4B。v1-tiny 仍在驱动我们的 Demo。",
  "rerank-2.5 and -lite, both 32k context with instruction following, so you can steer relevance in natural language. Priced per token.":
    "rerank-2.5 与 -lite，均为 32k 上下文并支持指令跟随，可以用自然语言引导相关性判断。按 token 计费。",
  "Best multilingual open weights — start at 4B":
    "多语言开源权重最优 —— 从 4B 起步",
  "0.6B / 4B / 8B, all Apache 2.0, all 32K context":
    "0.6B / 4B / 8B，全部 Apache 2.0，全部 32K 上下文",
  "4B is the sweet spot — the 8B costs more and scores no better":
    "4B 是甜点档 —— 8B 更贵，分数却不更高",
  "Vendor numbers are MTEB-R, so verify on your own labelled set":
    "厂商给的是 MTEB-R 数字，请在你自己的标注集上复核",
  "Easiest hosted API; pick Pro or Fast":
    "最省事的托管 API；在 Pro 与 Fast 间二选一",
  "32k context and 100+ languages on both variants":
    "两个版本都是 32k 上下文、100+ 语言",
  "Pro for precision, Fast for throughput — $0.0025 vs $0.002 a search":
    "Pro 重精度，Fast 重吞吐 —— 每次检索 $0.0025 对 $0.002",
  "Top-tier BEIR from a model that fits on one GPU":
    "单卡就能跑，BEIR 却在第一梯队",
  "61.94 BEIR nDCG@10 from 0.6B — beats Qwen3-Reranker-4B, 6× its size":
    "0.6B 拿到 61.94 BEIR nDCG@10 —— 胜过体量 6 倍的 Qwen3-Reranker-4B",
  "Listwise: 64 documents share one 131K-token context":
    "Listwise：64 篇文档共享同一个 131K token 的上下文",
  "Instruction-following relevance, priced per token":
    "可用指令引导相关性，按 token 计费",
  "Steer scoring with a natural-language instruction, no fine-tune":
    "用自然语言指令引导打分，无需微调",
  "32k context on both rerank-2.5 and the cheaper -lite tier":
    "rerank-2.5 与更便宜的 -lite 都是 32k 上下文",
  "First 200M tokens free per account; 33% off via the Batch API":
    "每个账号前 2 亿 token 免费；走 Batch API 再打 67 折",
  "Cohere Rerank 4":
    "Cohere Rerank 4",
  "Jina Reranker v3":
    "Jina Reranker v3",
  "Voyage rerank-2.5":
    "Voyage rerank-2.5",
  "_title": "重排序模型对比：cross-encoder、ColBERT、Qwen3 等 | reranker.uk",
  "_desc": "rerank 模型横向对比：五大成熟家族 + Qwen3-Reranker、Contextual AI、ColBERTv2 等 2026 方向。架构、质量、延迟、语言与成本一览。",

  "Rerank model comparison": "重排序模型对比",
  "Production stacks mix <strong>cross-encoders</strong>, <strong>listwise</strong> models, <strong>late-interaction</strong>, and instruction APIs. This table puts <strong>2026 open SOTA candidates (Qwen3)</strong> next to proven families (bge, mxbai, Cohere, Jina v3) — architecture, latency, languages, cost, with honest footnotes when score protocols differ.": "生产栈混合 <strong>cross-encoder</strong>、<strong>listwise</strong>、<strong>late-interaction</strong> 与指令 API。本表把 <strong>2026 开源 SOTA 候选（Qwen3）</strong> 与成熟家族（bge、mxbai、Cohere、Jina v3）并列 —— 架构、延迟、语言、成本；分数协议不同时脚注标明。",
  "Listwise": "Listwise",
  "2026 SOTA*": "2026 SOTA*",
  "Default 2026 open self-host pick (GPU)": "2026 开源自建默认（GPU）",
  "Top open-weight quality; largest Qwen3": "开源质量顶配；最大 Qwen3",
  "Lightest Qwen3; still needs GPU for comfort": "最轻 Qwen3；舒适运行仍需 GPU",
  "Proven self-host default; CPU-friendly": "经过验证的自建默认；CPU 友好",
  "Strong classic BEIR; xsmall in demo": "经典 BEIR 强；Demo 用 xsmall",
  "Legacy generation; xsmall still powers the browser demo": "上一代；xsmall 仍驱动浏览器 Demo",
  "Strongest mxbai generation; multilingual incl. Chinese": "mxbai 最强一代；支持多语言，含中文",
  "Best size/quality balance in the v2 generation": "v2 代中体积与质量的最佳平衡",
  "CPU-capable; GPU faster": "CPU 可运行；GPU 更快",
  "Listwise long-context (up to ~64 docs)": "Listwise 长上下文（最多约 64 段）",
  "Browser / edge; powers our demo": "浏览器 / 边缘；驱动本站 Demo",
  "Mature multilingual API": "成熟多语言 API",
  "High precision; domain variants": "高精度；领域变体",
  "~149M; strong English hit-rate in 2026 benches": "~149M；2026 英文 hit-rate 强",
  "Enterprise / NVIDIA stack; QA-tuned": "企业 / NVIDIA 栈；偏 QA",
  "Classic baseline; demo default": "经典基线；Demo 默认",
  "Instruction-following / policy-shaped relevance": "指令跟随 / 策略型相关性",
  "Token MaxSim; stage-1.5 not full CE": "Token MaxSim；1.5 阶段而非完整 CE",
  "MTEB-R ~70+*": "MTEB-R ~70+*",
  "BEIR-style ~75+*": "BEIR 类 ~75+*",
  "MTEB-R competitive*": "MTEB-R 有竞争力*",
  "legacy tiny": "旧版 tiny",
  "task benches*": "任务基准*",
  "product metrics*": "产品指标*",
  "0.6B / 4B / 8B family — the leading open-weight story in 2026 for multilingual self-host (GPU). Start with 4B when quality matters.": "0.6B / 4B / 8B 家族 —— 2026 多语言 GPU 自建开源主线。质量优先从 4B 起。",
  "Open-weight rerankers from BAAI. Still the best CPU-friendly default (v2-m3). Pair with Qwen3 when you have GPU headroom.": "智源开源权重。仍是 CPU 友好默认（v2-m3）。有 GPU 余量时与 Qwen3 对比。",
  "v3 listwise long-context flagship; v1-tiny still powers the browser demo. Open weights + hosted API.": "v3 listwise 长上下文旗舰；v1-tiny 仍驱动 Demo。开源 + 托管 API。",
  "2026 open SOTA candidate — start at 4B": "2026 开源 SOTA 候选 —— 从 4B 起步",
  "0.6B / 4B / 8B — pick size vs latency on your GPU": "0.6B / 4B / 8B —— 按 GPU 在体量与延迟间取舍",
  "Strong multilingual + long-context reports (MTEB-R)": "多语言 + 长上下文（MTEB-R 报道）",
  "Apache 2.0 family; verify on your labelled set": "Apache 2.0 家族；用自有标注验证",
  "Best free self-host when GPU is limited": "GPU 有限时的最佳免费自建",
  "v3 listwise + browser tiny": "v3 listwise + 浏览器 tiny",
  "v3 listwise long-context for production ranking": "v3 listwise 长上下文，适合生产排序",
  "v1-tiny still runs in the browser (our demo)": "v1-tiny 仍可在浏览器跑（本站 Demo）",
  "Free tier; open weights + hosted API": "免费档；开源权重 + 托管 API",
  "<strong>Last verified:</strong> June 2026 (refreshed for Qwen3 / Jina v3) · <strong>Next review:</strong> Oct 2026. Columns marked <strong>*</strong> use MTEB-R, vendor, or task-specific protocols — <em>not</em> the same classic BEIR 18-dataset avg as bge/Cohere/mxbai rows. <strong>†</strong> Pricing lags vendor pages. Demo-capable models only: mxbai xsmall, Jina tiny, ms-marco MiniLM.": "<strong>最近核验：</strong>2026 年 6 月（为 Qwen3 / Jina v3 刷新）· <strong>下次复核：</strong>2026 年 10 月。标 <strong>*</strong> 的列为 MTEB-R / 厂商 / 任务协议 —— <em>并非</em> bge/Cohere/mxbai 行的经典 BEIR 18 均值。<strong>†</strong> 价格可能滞后。可进 Demo：mxbai xsmall、Jina tiny、ms-marco MiniLM。",

  "Model": "模型",
  "Architecture": "架构",
  "Type": "类型",
  "Cross-encoder": "Cross-encoder",
  "Late-interaction": "Late-interaction",
  "Instruction": "Instruction",
  "Emerging": "新兴",
  "Best for": "最适合",
  "Languages": "语言",
  "Typ. latency <span class=\"th-hint\">50 docs</span>": "典型延迟 <span class=\"th-hint\">50 条文档</span>",
  "Pricing": "价格",
  "Self-hosted, free, multilingual": "自建部署、免费、多语言",
  "Best multilingual quality, mature API": "最佳多语言质量、成熟 API",
  "Open weights + API + tiny browser model": "开源权重 + API + 浏览器微型模型",
  "High retrieval precision, domain-specific": "高检索精度、面向特定领域",
  "100+ langs": "100+ 种语言",
  "Multilingual": "多语言",
  "Free (self-host)": "免费（自建）",
  "Free tier + pay-as-you-go": "免费额度 + 按量付费",

  "<strong>Last verified:</strong> June 2026 · <strong>Next review:</strong> Sep 2026. <strong>BEIR NDCG@10</strong> for mature rows is an approximate average across the 18-dataset suite — a rough guide, not a leaderboard. <strong>Emerging rows</strong> (Qwen3, Contextual, ColBERT) use ≈ / n/a because public scores are not aligned to the same protocol. <strong>Pricing</strong> and <strong>latency</strong> lag vendor pages; re-check before production decisions.": "<strong>最近核验：</strong>2026 年 6 月 · <strong>下次复核：</strong>2026 年 9 月。成熟行的 <strong>BEIR NDCG@10</strong> 为 18 数据集近似均值 —— 粗略参考，非排行榜。<strong>新兴行</strong>（Qwen3、Contextual、ColBERT）用 ≈ / n/a，因公开分数协议不统一。<strong>价格</strong>与<strong>延迟</strong>可能滞后厂商页，上线前请复核。",
  "Classic baseline; default in our demo": "经典基线；本站 Demo 默认",
  "2026 multilingual open reranker; Qwen ecosystem": "2026 多语言开源 reranker；Qwen 生态",
  "Instruction-following rerank for task-shaped queries": "面向任务型查询的指令跟随 rerank",
  "Token-level MaxSim; stage-1.5 not full rerank": "Token 级 MaxSim；1.5 阶段而非完整 rerank",
  "Contact vendor": "联系厂商",
  "GPU recommended": "建议 GPU",
  "Fast rescore @ scale": "大规模快速重打分",
  "≈ / unaligned": "≈ / 未对齐",
  "n/a": "不适用",
  "Late-interaction (ColBERT)": "Late-interaction（ColBERT）",
  "When ColBERTv2 beats bi-encoders and when you still need a cross-encoder — decision guide for 2026 stacks.": "ColBERTv2 何时胜过 bi-encoder、何时仍要 cross-encoder —— 2026 栈决策指南。",
  "Instruction-following rerank": "指令跟随 rerank",
  "When task instructions change relevance — Contextual AI-style rerankers vs plain cross-encoders.": "任务指令如何改变相关性 —— Contextual AI 类 vs 经典 cross-encoder。",

  "Open-weight rerankers from BAAI. A strong English baseline (bge-reranker-base) and excellent multilingual models (bge-reranker-v2-m3). The default choice when you want to self-host for free.": "智源（BAAI）的开源权重重排序器。既有强力的英文基线（bge-reranker-base），也有出色的多语言模型（bge-reranker-v2-m3）。想免费自建时的默认选择。",
  "The most mature hosted rerank API, with consistent multilingual quality, a generous free tier and SDK support across Python, Node, Java and Go.": "最成熟的托管重排序 API，多语言质量稳定，免费额度慷慨，并提供 Python、Node、Java、Go 的 SDK。",
  "Unique in offering both a hosted API and open weights — including a tiny model small enough to run in the browser (which powers our demo).": "独特之处在于同时提供托管 API 和开源权重 —— 包含一个小到能在浏览器里运行的微型模型（正是它驱动了我们的 Demo）。",
  "Voyage AI's rerankers are optimised specifically for retrieval precision and offer domain-tuned variants for code and finance.": "Voyage AI 的重排序器专门为检索精度优化，并为代码和金融提供领域调优的变体。",

  "Demo": "试用",
  "How to choose": "如何选择",
  "Best free self-hosted option": "最佳免费自建方案",
  "Zero per-call cost — runs on your own infra": "零按次成本 —— 跑在你自己的基础设施上",
  "Strong multilingual quality (v2-m3 covers 100+ languages)": "强多语言质量（v2-m3 覆盖 100+ 种语言）",
  "Drop-in with <code>sentence-transformers</code>, LangChain, LlamaIndex": "与 <code>sentence-transformers</code>、LangChain、LlamaIndex 即插即用",
  "Easiest hosted API, top multilingual quality": "最简单的托管 API，顶级多语言质量",
  "Official SDK for Python, Node, Java, Go — one-liner integration": "Python、Node、Java、Go 官方 SDK —— 一行代码接入",
  "Consistent multilingual quality across 100+ languages": "100+ 语言的稳定多语言质量",
  "Generous free tier; mature, production-proven API": "慷慨的免费额度；成熟、久经生产验证的 API",
  "Maximum flexibility — API, self-host, or browser": "最大灵活性 —— API、自建或浏览器随你选",
  "Choose hosted API <em>or</em> open weights — same model family": "选择托管 API <em>或</em>开源权重 —— 同一模型家族",
  "Tiny variant runs in the browser (no server needed)": "微型变体可在浏览器里运行（无需服务器）",
  "Free tier, no credit card required to start": "有免费额度，无需信用卡即可开始",
  "Top retrieval precision, domain-specific variants": "顶级检索精度，领域专用变体",
  "Tuned specifically for retrieval quality, not just classification": "专门为检索质量调优，而非仅面向分类任务",
  "Domain-specific models for code search and finance": "面向代码搜索和金融的领域专属模型",
  "Lowest per-1k-doc price among the hosted APIs": "托管 API 中按千条计费最低价",
  "Apache 2.0 open weights, browser-runnable xsmall": "Apache 2.0 开源权重，浏览器可运行的 xsmall",
  "Apache 2.0 open weights; v2 adds 100+ languages": "Apache 2.0 开源权重；v2 新增 100+ 种语言支持",
  "Apache 2.0 rerankers from mixedbread-ai. v1 (DeBERTa-v3) still has the browser-sized xsmall powering our demo; v2 (Qwen2.5-based) adds 100+ languages.":
    "mixedbread-ai 出品的 Apache 2.0 重排序器。v1（DeBERTa-v3）体积最小的 xsmall 仍驱动本站 Demo；v2（基于 Qwen2.5）新增 100+ 种语言支持。",
  "Permissive Apache 2.0 licence — use commercially without restrictions": "宽松的 Apache 2.0 协议 —— 可商用、无限制",
  "xsmall variant runs in the browser (powers our live demo)": "xsmall 变体可在浏览器中运行（驱动本站实时 Demo）",
  "v1 xsmall variant runs in the browser (powers our live demo)": "v1 的 xsmall 变体可在浏览器中运行（驱动本站实时 Demo）",
  "v2 (base/large) is multilingual, including Chinese — v1 was English-only": "v2（base/large）支持多语言，包括中文 —— v1 仅支持英文",
  "Highest BEIR score in this table at the large size": "大参数版本在本表中 BEIR 分数最高",
  "Open weights + browser-runnable xsmall": "开源权重 + 可在浏览器运行的 xsmall",
  "English": "英文",

  "Try a cross-encoder live": "实时体验一个 cross-encoder",
  "See how any of these models would reorder your retrieval results — demo runs in your browser.": "看看这些模型会如何重排你的检索结果 —— Demo 在你的浏览器里运行。",
  "Open the demo →": "打开 Demo →",

  // Oct 2026: jina-reranker-v3.5, licences
  "Weights: non-commercial":
    "权重：仅限非商用",
  "Jina's 2026 flagship; drop-in for v3, 1.22–1.56× faster":
    "Jina 2026 旗舰；可直接替换 v3，速度快 1.22–1.56 倍",
  "Free trial tokens, then token packages":
    "送试用 token，之后购买 token 包",
  "0.6B listwise; 64 docs in one 131K ctx; superseded by v3.5":
    "0.6B listwise；131K 上下文内 64 篇文档；已被 v3.5 取代",
  "Jina Reranker v3.5":
    "Jina Reranker v3.5",
  "0.6B listwise model at 63.20 BEIR in Jina's own test, just ahead of Qwen3-Reranker-4B's 62.28 there — though the 4B still leads on multilingual and legal/medical retrieval. Self-hosting the weights commercially needs a licence. v1-tiny (Apache 2.0) still powers our demo.":
    "0.6B 的 listwise 模型，在 Jina 自己的测试里 BEIR 为 63.20，略高于同一测试中 Qwen3-Reranker-4B 的 62.28 —— 不过在多语言和法律 / 医疗检索上仍是 4B 领先。商用自建部署需要另购许可。v1-tiny（Apache 2.0）仍在驱动我们的 Demo。",
  "63.20 BEIR nDCG@10 from 0.6B in Jina's own test — level with Qwen3-Reranker-4B, ~7× its size":
    "0.6B 在 Jina 自己的测试里拿到 63.20 BEIR nDCG@10 —— 与体量约 7 倍的 Qwen3-Reranker-4B 持平",
  "Listwise: the query and all candidates share one 131K-token context":
    "Listwise：query 和全部候选文档共享同一个 131K token 上下文",
  "Weights are CC BY-NC 4.0: use the API, or license them for commercial self-hosting":
    "权重采用 CC BY-NC 4.0：商用请走 API，或购买许可后自建部署",

  // Oct 2026: jina-reranker-v3.5, licences
  "Voyage’s current flagship; 32k ctx":
    "Voyage 当前旗舰；32k 上下文",
  "Faster, cheaper current tier; 32k ctx":
    "当前更快、更便宜的一档；32k 上下文",
  "Older; the one documented for instructions; 32k ctx":
    "旧版；官方文档写明支持指令的就是它；32k 上下文",
  "Older cheaper tier; 32k ctx":
    "旧版的便宜一档；32k 上下文",
  "Voyage rerank-3":
    "Voyage rerank-3",
  "Per token":
    "按 token 计费",
  "rerank-3 and -lite are Voyage’s current rerankers: 32k context, priced per token, with 200M free tokens each. The older rerank-2.5 is the one Voyage document for natural-language instructions.":
    "rerank-3 和 -lite 是 Voyage 当前的重排序模型：32k 上下文，按 token 计费，各送 2 亿免费 token。官方文档写明支持自然语言指令的，是旧版的 rerank-2.5。",
  "Per-token pricing that tracks what you send":
    "按 token 计费，发多少算多少",
  "rerank-3 for accuracy, rerank-3-lite for latency — ${{fact:voyage-rerank-3.price_per_m_tokens}} and ${{fact:voyage-rerank-3-lite.price_per_m_tokens}} per 1M tokens":
    "追求准确用 rerank-3，追求速度用 rerank-3-lite —— 每百万 token 分别 ${{fact:voyage-rerank-3.price_per_m_tokens}} 和 ${{fact:voyage-rerank-3-lite.price_per_m_tokens}}",
  "200M free tokens per account on each; 32k context":
    "每个账号各送 2 亿免费 token；32k 上下文",
  "Need natural-language instructions or the 33% Batch API discount? Voyage document both for the older rerank-2.5 only":
    "需要自然语言指令或 Batch API 的 33% 折扣？Voyage 目前只为旧版 rerank-2.5 写明了这两项",
  "Pro for precision, Fast for throughput — ${{fact:cohere-rerank-4-pro.price_per_search}} vs ${{fact:cohere-rerank-4-fast.price_per_search}} a search":
    "Pro 重精度，Fast 重吞吐 —— 每次检索 ${{fact:cohere-rerank-4-pro.price_per_search}} 对 ${{fact:cohere-rerank-4-fast.price_per_search}}",
  "Pro and Fast variants, 32k context, 100+ languages. Billed per search: one query plus up to 100 documents, each counted once per {{fact:cohere-rerank.billing_chunk_tokens}} tokens.":
    "Pro 与 Fast 两个版本，32k 上下文，100+ 种语言。按检索次数计费：一个 query 加最多 100 篇文档，每篇按每 {{fact:cohere-rerank.billing_chunk_tokens}} token 计一次。",

  // Oct 2026: jina-reranker-v3.5, licences
  "Best English score of the three; instruction-aware (GPU)":
    "三者中英文得分最高；支持指令（需 GPU）",
  "Largest Qwen3 — leads on Chinese, multilingual, long-document and code; 4B edges it on English":
    "最大的 Qwen3 —— 中文、多语言、长文档和代码上领先；英文上 4B 略胜",
  "149M, 8K context; also runs in transformers.js":
    "1.49 亿参数、8K 上下文；也能在 transformers.js 里运行",
  "1.2B, 8K context; licensed for commercial use":
    "12 亿参数、8K 上下文；许可允许商用",
  "Multilingual (26 langs evaluated)":
    "多语言（评测覆盖 26 种语言）",
  "Instruction-following; 1B / 2B / 6B":
    "指令跟随；1B / 2B / 6B 三种尺寸",
  "100+ langs · 32K ctx":
    "100+ 种语言 · 32K 上下文",
  "Free (non-commercial self-host)":
    "免费（仅限非商用自建）",

  // Oct 2026: jina-reranker-v3.5, licences
  "0.6B / 4B / 8B, 32K context, Apache 2.0. Start at 4B — in Qwen's own tests it beats the 8B on English and on instruction-following, and trails it by at most 1.5 points elsewhere.":
    "0.6B / 4B / 8B 三种尺寸，32K 上下文，Apache 2.0。建议从 4B 开始 —— 在 Qwen 自己的测试里，它在英文和指令跟随上胜过 8B，其余项目最多落后 1.5 分。",
  "4B is the sweet spot — the 8B is twice the size for at most 1.5 points, and only outside English":
    "4B 最划算 —— 8B 体量翻倍，最多只多 1.5 分，而且只在英文以外的项目上",

  // Oct 2026: jina-reranker-v3.5, licences
  "~{{fact:jina-reranker-v1-tiny-en.browser_ms_10}} ms per 10 passages (browser)":
    "浏览器中每 10 段约 {{fact:jina-reranker-v1-tiny-en.browser_ms_10}} ms",
  "~{{fact:ms-marco-minilm-l6-v2.browser_ms_10}} ms per 10 passages (browser)":
    "浏览器中每 10 段约 {{fact:ms-marco-minilm-l6-v2.browser_ms_10}} ms",
  "Classic baseline; smallest of the three demo models (23M)":
    "经典基线；三个 Demo 模型中最小的（2300 万参数）",
}};

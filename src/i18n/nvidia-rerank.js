window.I18N_PAGE = { zh: {
  "_title":
    "NVIDIA Nemotron 重排序模型：Nemotron-3.5-Rerank-8B 与 llama-nemotron | reranker.uk",
  "_desc":
    "NVIDIA 重排序模型评测（2026 年 10 月）：处理文本和页面图片的 Nemotron-3.5-Rerank-8B、llama-nemotron-rerank-vl-1b-v2，以及 1B 和 500M 文本重排序模型。许可证、NVIDIA 自己公布的分数及其出处，以及 sentence-transformers、vLLM 和 NIM 的用法。",
  "<a href=\"/\">Home</a><span>/</span><a href=\"/models/\">Models</a><span>/</span>NVIDIA Nemotron rerankers":
    "<a href=\"/\">首页</a><span>/</span><a href=\"/models/\">模型</a><span>/</span>NVIDIA Nemotron 重排序模型",
  "NVIDIA Nemotron rerankers":
    "NVIDIA Nemotron 重排序模型",
  "Open weights + NIM · NVIDIA · <time datetime=\"2026-10-23\">Updated 23 Oct 2026</time>":
    "开放权重 + NIM · NVIDIA · <time datetime=\"2026-10-23\">更新于 2026 年 10 月 23 日</time>",
  "Commercial use":
    "可商用",
  "Text and page images":
    "文本和页面图片",
  "GPU required":
    "需要 GPU",
  "NVIDIA offers four rerankers for commercial use, three of them as open weights. The newest, <strong>Nemotron-3.5-Rerank-8B</strong> (20 October 2026), scores text, page images or both with one {{fact:nemotron-3.5-rerank-8b.params}}-parameter model and a {{fact:nemotron-3.5-rerank-8b.context_tokens}}-token context. The older <strong>llama-nemotron</strong> family is much smaller: a 1.7B vision-language reranker and 1B and 500M text rerankers, all three served as NVIDIA NIM containers.":
    "NVIDIA 提供四个可商用的重排序模型，其中三个公开权重。最新的 <strong>Nemotron-3.5-Rerank-8B</strong>（2026 年 10 月 20 日）用一个 {{fact:nemotron-3.5-rerank-8b.params}} 参数的模型给文本、页面图片或两者一起打分，上下文 {{fact:nemotron-3.5-rerank-8b.context_tokens}} token。更早的 <strong>llama-nemotron</strong> 系列小得多：一个 1.7B 的视觉语言重排序模型，以及 1B 和 500M 两个文本重排序模型，三者都以 NVIDIA NIM 容器提供。",
  "On this page":
    "本页目录",
  "<a href=\"#models\">The four models</a>":
    "<a href=\"#models\">四个模型</a>",
  "<a href=\"#scores\">Scores, and whose they are</a>":
    "<a href=\"#scores\">分数，以及是谁测的</a>",
  "<a href=\"#usage\">Quick start</a>":
    "<a href=\"#usage\">快速上手</a>",
  "<a href=\"#when\">When to pick NVIDIA</a>":
    "<a href=\"#when\">什么时候选 NVIDIA</a>",
  "<a href=\"#pros-cons\">Pros and cons</a>":
    "<a href=\"#pros-cons\">优缺点</a>",
  "The four models":
    "四个模型",
  "Model":
    "模型",
  "Size":
    "规模",
  "Input":
    "输入",
  "Context":
    "上下文",
  "Licence":
    "许可证",
  "{{fact:nemotron-3.5-rerank-8b.params}}, on Ministral-3-8B":
    "{{fact:nemotron-3.5-rerank-8b.params}}，基于 Ministral-3-8B",
  "Text, page image, or both":
    "文本、页面图片，或两者一起",
  "{{fact:nemotron-3.5-rerank-8b.context_tokens}} tokens":
    "{{fact:nemotron-3.5-rerank-8b.context_tokens}} token",
  "About {{fact:llama-nemotron-rerank-vl-1b-v2.params}}, on Llama 3.2 1B with a SigLIP 2 vision encoder":
    "约 {{fact:llama-nemotron-rerank-vl-1b-v2.params}}，基于 Llama 3.2 1B 加 SigLIP 2 视觉编码器",
  "{{fact:llama-nemotron-rerank-vl-1b-v2.nim_max_tokens}} tokens in NIM":
    "NIM 中 {{fact:llama-nemotron-rerank-vl-1b-v2.nim_max_tokens}} token",
  "NVIDIA Open Model License":
    "NVIDIA Open Model License",
  "1B, on Llama 3.2 1B":
    "1B，基于 Llama 3.2 1B",
  "Text, {{fact:llama-nemotron-rerank-1b-v2.languages}} languages evaluated":
    "文本，评测过 {{fact:llama-nemotron-rerank-1b-v2.languages}} 种语言",
  "{{fact:llama-nemotron-rerank-1b-v2.max_tokens}} tokens":
    "{{fact:llama-nemotron-rerank-1b-v2.max_tokens}} token",
  "Text":
    "文本",
  "{{fact:llama-nemotron-rerank-1b-v2.max_tokens}} tokens in NIM":
    "NIM 中 {{fact:llama-nemotron-rerank-1b-v2.max_tokens}} token",
  "NIM only; no Hugging Face card":
    "仅 NIM；没有 Hugging Face 模型卡",
  "All four are cross-encoders that return a raw logit per query–document pair: higher means more relevant, and it isn’t a probability. The OpenMDW licence allows commercial use; the vision-language model’s NVIDIA Open Model License does too, with the Llama 3.2 licence on top. The 500M has no Hugging Face card; it is available only as a NIM. NVIDIA also sells the 8B through Baseten, DeepInfra, FriendliAI and OpenRouter, and announced a NIM for it. On 23 October the reranking NIM’s support matrix still listed only the three llama-nemotron models.":
    "四个都是交叉编码器，对每个查询–文档对输出一个原始 logit：越高越相关，但它不是概率。OpenMDW 许可证允许商用；视觉语言模型用的 NVIDIA Open Model License 也允许，另外还要遵守 Llama 3.2 许可证。500M 没有 Hugging Face 模型卡，只以 NIM 提供。NVIDIA 还通过 Baseten、DeepInfra、FriendliAI 和 OpenRouter 提供 8B，并宣布了它的 NIM；不过 10 月 23 日重排序 NIM 的支持矩阵里仍只有三个 llama-nemotron 模型。",
  "Scores, and whose they are":
    "分数，以及是谁测的",
  "ViDoRe V3, page image":
    "ViDoRe V3，页面图片",
  "ViDoRe V3, text":
    "ViDoRe V3，文本",
  "ViDoRe V3, image + text":
    "ViDoRe V3，图片 + 文本",
  "First stage only (Nemotron-3.5-Embed-1B)":
    "只用第一阶段（Nemotron-3.5-Embed-1B）",
  "NVIDIA’s own run, from the model card: NDCG@10, with both rerankers reordering the top 50 candidates from NVIDIA’s Nemotron-3.5-Embed-1B. MIRACL-VISION is page images in 18 languages. NVIDIA’s blog also reports the new ViDoRe v3.1 reranking leaderboard, a different setup, where the 8B scores {{fact:nemotron-3.5-rerank-8b.vidore_v31_leaderboard}} on image-and-text inputs against Qwen3-VL-Reranker-8B’s {{fact:nvidia-rerank-run.qwen3_vl_8b_vidore_v31_leaderboard}}.":
    "NVIDIA 自己的测试，取自模型卡：NDCG@10，两个重排序模型都对 NVIDIA 的 Nemotron-3.5-Embed-1B 召回的前 50 条重新排序。MIRACL-VISION 是 18 种语言的页面图片。NVIDIA 的博客还给出了新的 ViDoRe v3.1 重排序排行榜（另一套设置）：图片加文本输入时，8B 得 {{fact:nemotron-3.5-rerank-8b.vidore_v31_leaderboard}}，Qwen3-VL-Reranker-8B 得 {{fact:nvidia-rerank-run.qwen3_vl_8b_vidore_v31_leaderboard}}。",
  "The lead over Qwen3-VL-Reranker-8B is one to two points on ViDoRe V3 and nearly four on the multilingual MIRACL-VISION. Put the Qwen figure next to the others before reading much into it: Qwen’s own card gives the same model {{fact:qwen3-vl-reranker-8b.vidore_v3}} on ViDoRe V3, and LightOn’s run {{fact:lighton-run.qwen3_vl_8b_vidore_v3}}, each with a different first stage and settings (see the <a href=\"/models/qwen3-vl-reranker.html\">Qwen3-VL-Reranker page</a>). What the table shows clearly is the gain over the first stage: about nine points on ViDoRe V3 and ten on MIRACL-VISION.":
    "相比 Qwen3-VL-Reranker-8B，它在 ViDoRe V3 上领先一到两分，在多语言的 MIRACL-VISION 上领先近四分。不过先把 Qwen 的数字和其他来源放在一起看：Qwen 自己的模型卡给同一个模型的 ViDoRe V3 是 {{fact:qwen3-vl-reranker-8b.vidore_v3}}，LightOn 测的是 {{fact:lighton-run.qwen3_vl_8b_vidore_v3}}，各自的第一阶段和设置都不同（见 <a href=\"/models/qwen3-vl-reranker.html\">Qwen3-VL-Reranker 页面</a>）。这张表最清楚的是相对第一阶段的提升：ViDoRe V3 上约九分，MIRACL-VISION 上约十分。",
  "Page image":
    "页面图片",
  "Image + text":
    "图片 + 文本",
  "First stage only (llama-nemotron-embed-vl-1b-v2)":
    "只用第一阶段（llama-nemotron-embed-vl-1b-v2）",
  "NVIDIA’s own run, from the model card: average Recall@5 over ViDoRe V1, V2 and V3 and two NVIDIA datasets (DigitalCorpora-10k and Earnings V2), reranking the candidates from llama-nemotron-embed-vl-1b-v2. NVIDIA ran jina-reranker-m0 on text and images only, as it doesn’t take both together.":
    "NVIDIA 自己的测试，取自模型卡：在 ViDoRe V1、V2、V3 和两个 NVIDIA 数据集（DigitalCorpora-10k 和 Earnings V2）上的平均 Recall@5，对 llama-nemotron-embed-vl-1b-v2 召回的候选重新排序。NVIDIA 只用文本和图片分别测了 jina-reranker-m0，因为它不能同时接收两者。",
  "On page images alone, jina-reranker-m0 scores higher, but its weights are non-commercial; the NVIDIA model’s advantage is the licence and the combined image-and-text input.":
    "只看页面图片时 jina-reranker-m0 分数更高，但它的权重不可商用；NVIDIA 这个模型的优势在于许可证，以及能同时接收图片和文本。",
  "NVIDIA report this one only as part of their own embed-and-rerank pipeline, with Recall@5 rather than NDCG. Reranking llama-nemotron-embed-1b-v2’s candidates lifts the average over NQ, HotpotQA, FiQA and TechQA from {{fact:llama-nemotron-rerank-1b-v2.embed_only_recall5}}% to {{fact:llama-nemotron-rerank-1b-v2.pipeline_recall5}}%. The same pipeline reaches {{fact:llama-nemotron-rerank-1b-v2.miracl_recall5}}% on NVIDIA’s subsampled multilingual MIRACL and {{fact:llama-nemotron-rerank-1b-v2.mlqa_recall5}}% on cross-lingual MLQA. None of these can be compared with BEIR NDCG@10 figures, so the <a href=\"/models/\">models table</a> shows none.":
    "NVIDIA 只在自家的「向量召回 + 重排序」流程里报告这个模型，而且用的是 Recall@5 而不是 NDCG。对 llama-nemotron-embed-1b-v2 召回的候选重排后，NQ、HotpotQA、FiQA 和 TechQA 上的平均值从 {{fact:llama-nemotron-rerank-1b-v2.embed_only_recall5}}% 提到 {{fact:llama-nemotron-rerank-1b-v2.pipeline_recall5}}%。同一流程在 NVIDIA 抽样的多语言 MIRACL 上是 {{fact:llama-nemotron-rerank-1b-v2.miracl_recall5}}%，在跨语言的 MLQA 上是 {{fact:llama-nemotron-rerank-1b-v2.mlqa_recall5}}%。这些都不能和 BEIR NDCG@10 比，所以<a href=\"/models/\">模型对比表</a>里不列。",
  "Quick start":
    "快速上手",
  "Nemotron-3.5-Rerank-8B with sentence-transformers":
    "用 sentence-transformers 跑 Nemotron-3.5-Rerank-8B",
  "A document can be text, one page image, or both. The example needs Flash Attention 2 installed. NVIDIA’s card tests it with Transformers 5.20.0 and warns that Flash Attention 2 can give wrong results on image inputs in 5.17 to 5.19. It needs a CUDA GPU; NVIDIA list A100 and H100 80GB and GB200.":
    "一个文档可以是文本、一张页面图片，或两者一起。示例需要先装 Flash Attention 2。NVIDIA 的模型卡用 Transformers 5.20.0 测过，并提醒 5.17 到 5.19 版里 Flash Attention 2 处理图片输入可能出错。需要 CUDA GPU；NVIDIA 列出的是 A100、H100 80GB 和 GB200。",
  "Serving the 8B with vLLM":
    "用 vLLM 部署 8B",
  "The card serves it with <code>vllm serve --runner pooling</code> and the chat template that ships with the checkpoint, and scores each pair through the <code>/classify</code> endpoint. Don’t use <code>/score</code> or <code>/rerank</code>: NVIDIA note they can mishandle the model’s image placeholders. Each document takes at most one image.":
    "模型卡用 <code>vllm serve --runner pooling</code> 加上检查点自带的聊天模板来部署，通过 <code>/classify</code> 接口给每一对打分。不要用 <code>/score</code> 或 <code>/rerank</code>：NVIDIA 说明这两个接口可能处理错模型的图片占位符。每个文档最多一张图片。",
  "The llama-nemotron models through NIM":
    "通过 NIM 使用 llama-nemotron 模型",
  "Both open llama-nemotron models load from Hugging Face with <code>transformers</code>, and the vision-language one also with sentence-transformers’ <code>CrossEncoder</code>. For production, NVIDIA package them, and the 500M, as NIM containers, supported on A100, H100, B200, RTX PRO 6000 Blackwell and DGX Spark. The 1B is also callable as a hosted API on build.nvidia.com.":
    "两个公开权重的 llama-nemotron 模型都能从 Hugging Face 用 <code>transformers</code> 加载，视觉语言那个也能用 sentence-transformers 的 <code>CrossEncoder</code>。生产环境里，NVIDIA 把它们和 500M 一起打包成 NIM 容器，支持 A100、H100、B200、RTX PRO 6000 Blackwell 和 DGX Spark。1B 还可以在 build.nvidia.com 上作为托管 API 调用。",
  "When to pick NVIDIA":
    "什么时候选 NVIDIA",
  "<strong>Yes:</strong> you rerank PDF pages, slides or scans, possibly with their extracted text, and need a commercial licence: Nemotron-3.5-Rerank-8B if you have the GPU, llama-nemotron-rerank-vl-1b-v2 if you don’t.":
    "<strong>适合：</strong>你要重排 PDF 页面、幻灯片或扫描件（可能还带着提取出的文本），并且需要可商用的许可证：有 GPU 就用 Nemotron-3.5-Rerank-8B，没有就用 llama-nemotron-rerank-vl-1b-v2。",
  "<strong>Yes:</strong> you already run NVIDIA NIM, and want a reranker that drops into the same stack.":
    "<strong>适合：</strong>你已经在用 NVIDIA NIM，想要一个能直接放进同一套部署的重排序模型。",
  "<strong>Yes:</strong> multilingual text with a small model: the 1B text reranker covers {{fact:llama-nemotron-rerank-1b-v2.languages}} evaluated languages at {{fact:llama-nemotron-rerank-1b-v2.max_tokens}} tokens.":
    "<strong>适合：</strong>用小模型做多语言文本：1B 文本重排序模型评测过 {{fact:llama-nemotron-rerank-1b-v2.languages}} 种语言，支持 {{fact:llama-nemotron-rerank-1b-v2.max_tokens}} token。",
  "<strong>Maybe not:</strong> CPU serving, or a comparison against BEIR scores. Look at <a href=\"/models/bge-reranker.html\">bge-reranker</a> or the <a href=\"/models/gte-reranker.html\">GTE rerankers</a>.":
    "<strong>可能不适合：</strong>只能用 CPU 部署，或者需要和 BEIR 分数对比。可以看看 <a href=\"/models/bge-reranker.html\">bge-reranker</a> 或 <a href=\"/models/gte-reranker.html\">GTE 重排序模型</a>。",
  "Pros and cons":
    "优缺点",
  "Pros":
    "优点",
  "Open weights licensed for commercial use":
    "公开权重，可商用",
  "Text, page images, or both, in one model":
    "一个模型同时处理文本、页面图片或两者",
  "The 8B leads NVIDIA’s ViDoRe V3 and MIRACL-VISION comparison":
    "在 NVIDIA 的 ViDoRe V3 和 MIRACL-VISION 对比里，8B 领先",
  "NIM containers and hosted APIs for production":
    "生产环境有 NIM 容器和托管 API",
  "Cons":
    "缺点",
  "Published scores are NVIDIA’s own, mostly on its own pipelines":
    "公布的分数都是 NVIDIA 自己测的，大多用的是自家流程",
  "The 8B needs a large GPU; none run on CPU in practice":
    "8B 需要大显存 GPU；实际上没有一个适合用 CPU 跑",
  "The 8B’s vLLM serving needs NVIDIA’s exact setup":
    "8B 用 vLLM 部署要严格照 NVIDIA 的配置",
  "Too large for our in-browser demo":
    "太大，放不进本站的浏览器 Demo",
  "Choosing for page images?":
    "要给页面图片选模型？",
  "The scenario guide compares NVIDIA, Qwen3-VL-Reranker, LightOn-rerank and the hosted options for visual documents.":
    "选型指南对比了 NVIDIA、Qwen3-VL-Reranker、LightOn-rerank 和几种托管方案在视觉文档上的表现。",
  "Choose by scenario →":
    "按场景选型 →",
  "All models →":
    "全部模型 →",
  "Other models":
    "其他模型",
  "Images, screenshots and video; 2B and 8B.":
    "图片、截图和视频；2B 和 8B。",
  "Apache 2.0, text and page images, 0.8B to 4B.":
    "Apache 2.0，处理文本和页面图片，0.8B 到 4B。",
  "Jina Reranker":
    "Jina 重排序",
  "Listwise v3.5, and the multimodal m0.":
    "列表式的 v3.5，以及多模态的 m0。",
  "Self-host guide":
    "自建指南",
  "Serving and ops checklist.":
    "部署与运维清单。",
}};

window.I18N_PAGE = { zh: {
  "_title": "在国内做重排序 —— 阿里云百炼、硅基流动还是自己部署 | reranker.uk",
  "_desc": "在国内给检索加上重排序：阿里云百炼（qwen3-rerank）、硅基流动（托管 bge-reranker-v2-m3 和 Qwen3-Reranker），或者通过 hf-mirror 和魔搭下载模型自己部署 —— 人民币价格、中文评测分数和代码。",

  "Reranking in mainland China: Alibaba Cloud, SiliconFlow or your own server":
    "在国内做重排序：阿里云百炼、硅基流动，还是自己部署",
  "Practical · ~8 min read · <time datetime=\"2026-10-14\">Updated 14 Oct 2026</time>":
    "实践 · 约 8 分钟阅读 · <time datetime=\"2026-10-14\">更新于 2026 年 10 月 14 日</time>",
  "From a server in mainland China, the usual advice — call Cohere or Voyage, or download weights from Hugging Face — runs into slow or blocked connections and foreign-currency billing. There are three routes that work well from inside China: <strong>Alibaba Cloud Model Studio</strong>, <strong>SiliconFlow</strong>, or <strong>running an open model yourself</strong>. This guide compares them on price, Chinese-language quality and setup, using only what each vendor publishes.":
    "服务器在国内时，常见的建议 —— 调用 Cohere 或 Voyage，或者从 Hugging Face 下载权重 —— 会碰到连接慢甚至连不上、要用外币付费的问题。在国内比较好走的路有三条：<strong>阿里云百炼</strong>、<strong>硅基流动</strong>，或者<strong>自己部署开源模型</strong>。本指南只用各厂商自己公布的信息，从价格、中文效果和接入方式三方面对比它们。",
  "Three routes at a glance":
    "三条路一览",
  "Route":
    "方案",
  "Models":
    "模型",
  "Price":
    "价格",
  "Pick it when":
    "适合什么情况",
  "<a href=\"/models/#alibaba-model-studio\">Alibaba Cloud Model Studio</a>":
    "<a href=\"/models/#alibaba-model-studio\">阿里云百炼</a>",
  "qwen3-rerank, qwen3.7-text-rerank, qwen3-vl-rerank (images and video)":
    "qwen3-rerank、qwen3.7-text-rerank、qwen3-vl-rerank（支持图片和视频）",
  "¥{{fact:alibaba-model-studio-rerank.qwen3_rerank_cny_per_m}} per million input tokens":
    "每百万输入 token ¥{{fact:alibaba-model-studio-rerank.qwen3_rerank_cny_per_m}}",
  "You already use Alibaba Cloud, need long documents or many languages, and don’t want to run a GPU":
    "已经在用阿里云，需要处理长文档或多种语言，又不想自己维护 GPU",
  "<a href=\"/models/#siliconflow\">SiliconFlow</a>":
    "<a href=\"/models/#siliconflow\">硅基流动</a>",
  "Hosted open models: bge-reranker-v2-m3, bce-reranker-base_v1, Qwen3-Reranker 0.6B / 4B / 8B, Qwen3-VL-Reranker-8B":
    "托管的开源模型，包括 bge-reranker-v2-m3、bce-reranker-base_v1、Qwen3-Reranker 0.6B / 4B / 8B 和多模态的 Qwen3-VL-Reranker-8B",
  "bge-reranker-v2-m3 free; Pro tier ¥{{fact:siliconflow-rerank.bge_v2_m3_pro_cny_per_m}} per million tokens":
    "bge-reranker-v2-m3 免费；Pro 版每百万 token ¥{{fact:siliconflow-rerank.bge_v2_m3_pro_cny_per_m}}",
  "You want an open model without hosting it, or a free tier to start on":
    "想用开源模型但不想自己部署，或者想先从免费额度开始",
  "<a href=\"/guides/self-host-reranker.html\">Your own server</a>":
    "<a href=\"/guides/self-host-reranker.html\">自己的服务器</a>",
  "bge-reranker-v2-m3 (CPU), Qwen3-Reranker-4B (GPU), gte-multilingual-reranker-base":
    "用 CPU 就能跑的 bge-reranker-v2-m3、需要 GPU 的 Qwen3-Reranker-4B，以及更小的 gte-multilingual-reranker-base",
  "No per-call price; you pay for the hardware":
    "没有按调用收费；成本是硬件",
  "Data must not leave your network, or your volume is high enough that a GPU costs less than an API":
    "数据不能离开自己的网络，或者调用量大到自建 GPU 比 API 更便宜",
  "The three are not exclusive. A common path is to start on SiliconFlow’s free bge-reranker-v2-m3, measure on your own queries, then either stay hosted or move the same open model onto your own hardware — the scores don’t change, because it is the same model.":
    "这三条路并不互斥。常见的做法是先用硅基流动免费的 bge-reranker-v2-m3，在自己的查询上测一测，然后要么继续用托管服务，要么把同一个开源模型搬到自己的机器上 —— 分数不会变，因为是同一个模型。",
  "How well the models handle Chinese":
    "这些模型的中文效果如何",
  "The one public comparison that covers most of these models on Chinese retrieval is Qwen’s: CMTEB-R, the retrieval tasks of the Chinese MTEB, reranking the top 100 from Qwen3-Embedding-0.6B. It is Qwen’s own run, so read it as a guide to tiers rather than a final ranking.":
    "目前覆盖了其中大多数模型的中文检索公开对比，只有 Qwen 做的这一份：CMTEB-R，即中文 MTEB 的检索任务，对 Qwen3-Embedding-0.6B 召回的前 100 条重排序。这是 Qwen 自己的测试，所以把它当作大致的档位参考，而不是最终排名。",
  "Model":
    "模型",
  "Size":
    "规模",
  "MMTEB-R (multilingual)":
    "MMTEB-R（多语言）",
  "From the <a href=\"https://huggingface.co/Qwen/Qwen3-Reranker-4B\" rel=\"noopener noreferrer\">Qwen3-Reranker model card</a>, checked daily. Alibaba Cloud publishes no scores for its hosted qwen3-rerank, qwen3.7-text-rerank or qwen3-vl-rerank, so they are not in the table.":
    "数据来自 <a href=\"https://huggingface.co/Qwen/Qwen3-Reranker-4B\" rel=\"noopener noreferrer\">Qwen3-Reranker 模型卡</a>，每天核对。阿里云没有为托管的 qwen3-rerank、qwen3.7-text-rerank 和 qwen3-vl-rerank 公布分数，所以它们不在表中。",
  "Two things stand out. The 306M <strong>gte-multilingual-reranker-base</strong> scores above bge-reranker-v2-m3 on Chinese at about half its size, which makes it the cheapest model to serve here. And the step from bge-reranker-v2-m3 to <strong>Qwen3-Reranker-4B</strong> is small on Chinese but large on the multilingual column — worth it if your corpus mixes languages, less so for Chinese alone. The classic English models (ms-marco MiniLM, Jina v1, mxbai v1) were not trained on Chinese and don’t belong in this list.":
    "有两点值得注意。306M 的 <strong>gte-multilingual-reranker-base</strong> 在中文上的分数高于 bge-reranker-v2-m3，体积却只有它的一半左右，是这里部署成本最低的模型。另外，从 bge-reranker-v2-m3 换到 <strong>Qwen3-Reranker-4B</strong>，中文上提升不大，多语言那一列却提升很多 —— 语料混合多种语言时值得换，只做中文就没那么必要。经典的英文模型（ms-marco MiniLM、Jina v1、mxbai v1）没有用中文训练过，不在考虑之列。",
  "Alibaba Cloud Model Studio":
    "阿里云百炼",
  "Model Studio (百炼) sells three rerankers, billed per million input tokens in yuan in the Beijing region:":
    "百炼（Model Studio）提供三个重排序模型，在北京地域按每百万输入 token 以人民币计费：",
  "<strong>qwen3-rerank</strong> — 100+ languages, up to 500 documents per request and {{fact:alibaba-model-studio-rerank.qwen3_rerank_tokens_per_doc}} tokens per document. A longer document is rejected with an error, not truncated, so chunk before you send.":
    "<strong>qwen3-rerank</strong> —— 支持 100 多种语言，每次请求最多 500 篇文档，每篇最多 {{fact:alibaba-model-studio-rerank.qwen3_rerank_tokens_per_doc}} token。超长的文档会直接报错，不会被截断，所以发送前要先切分。",
  "<strong>qwen3.7-text-rerank</strong> — {{fact:alibaba-model-studio-rerank.qwen37_languages}} languages and dialects and up to {{fact:alibaba-model-studio-rerank.qwen37_tokens_per_doc}} tokens per document, at the same price; Beijing region only.":
    "<strong>qwen3.7-text-rerank</strong> —— 支持 {{fact:alibaba-model-studio-rerank.qwen37_languages}} 种语言和方言，每篇最多 {{fact:alibaba-model-studio-rerank.qwen37_tokens_per_doc}} token，价格相同；仅北京地域提供。",
  "<strong>qwen3-vl-rerank</strong> — ranks images and video as well as text.":
    "<strong>qwen3-vl-rerank</strong> —— 除了文本，还能给图片和视频排序。",
  "All three take an <code>instruct</code> parameter that says what “relevant” means; without one they rank for question answering, and Alibaba suggest writing instructions in English (see <a href=\"/guides/instruction-reranker.html\">instruction-following rerankers</a>). The older gte-rerank was retired on 30 May 2026; gte-rerank-v2 is still sold. qwen3-rerank is also offered internationally at ${{fact:alibaba-model-studio-rerank.qwen3_rerank_usd_per_m}} per million tokens.":
    "三个模型都支持 <code>instruct</code> 参数，用来说明什么算“相关”；不传时默认按问答检索排序，阿里云建议用英文写指令（见<a href=\"/guides/instruction-reranker.html\">指令跟随重排序</a>）。较早的 gte-rerank 已于 2026 年 5 月 30 日下线，gte-rerank-v2 仍在售。qwen3-rerank 在国际站也有，每百万 token ${{fact:alibaba-model-studio-rerank.qwen3_rerank_usd_per_m}}。",
  "qwen3.7-text-rerank, qwen3-vl-rerank and gte-rerank-v2 use a different endpoint and request shape; the <a href=\"https://help.aliyun.com/zh/model-studio/text-rerank-api\" rel=\"noopener noreferrer\">Model Studio rerank API page</a> has both.":
    "qwen3.7-text-rerank、qwen3-vl-rerank 和 gte-rerank-v2 用的是另一个接口和请求格式；<a href=\"https://help.aliyun.com/zh/model-studio/text-rerank-api\" rel=\"noopener noreferrer\">百炼重排序 API 文档</a>里两种都有。",
  "SiliconFlow":
    "硅基流动",
  "SiliconFlow (硅基流动) runs other vendors’ open models behind one rerank endpoint, so what you call is the published open model, and the table above describes it. Its price list shows bge-reranker-v2-m3 as free and a Pro tier at ¥{{fact:siliconflow-rerank.bge_v2_m3_pro_cny_per_m}} per million tokens; it lists no price for the Qwen3-Reranker models.":
    "硅基流动（SiliconFlow）用一个 rerank 接口托管其他厂商的开源模型，所以你调用的就是公开发布的开源模型，上面的表格描述的就是它。它的价格页上 bge-reranker-v2-m3 免费，Pro 版每百万 token ¥{{fact:siliconflow-rerank.bge_v2_m3_pro_cny_per_m}}；没有列出 Qwen3-Reranker 的价格。",
  "Two options are model-specific. <code>instruction</code> works only with the Qwen3-Reranker models. For bge-reranker-v2-m3 and bce-reranker-base_v1, SiliconFlow splits a long document into chunks itself (<code>max_chunks_per_doc</code>, <code>overlap_tokens</code>) and scores the document by its best chunk — convenient, but it means a long document wins on its single best passage. Qwen3-VL-Reranker-8B has its own multimodal request format. Details are on the <a href=\"https://docs.siliconflow.cn/docs/api/rerank-post\" rel=\"noopener noreferrer\">SiliconFlow rerank API page</a>.":
    "有两个参数只对部分模型有效。<code>instruction</code> 只支持 Qwen3-Reranker 系列。对于 bge-reranker-v2-m3 和 bce-reranker-base_v1，硅基流动会自己把长文档切成片段（<code>max_chunks_per_doc</code>、<code>overlap_tokens</code>），取得分最高的片段作为整篇文档的分数 —— 很方便，但意味着一篇长文档只凭其中最好的一段胜出。Qwen3-VL-Reranker-8B 有自己的多模态请求格式。详见<a href=\"https://docs.siliconflow.cn/docs/api/rerank-post\" rel=\"noopener noreferrer\">硅基流动重排序 API 文档</a>。",
  "Self-hosting: getting the weights":
    "自己部署：怎么下载权重",
  "The models are open, but huggingface.co is often slow or unreachable from mainland China. Two ways around it:":
    "这些模型都是开源的，但在国内访问 huggingface.co 经常很慢甚至连不上。有两个办法：",
  "<strong><a href=\"https://hf-mirror.com\" rel=\"noopener noreferrer\">hf-mirror.com</a></strong>, a community mirror of Hugging Face. Set <code>HF_ENDPOINT</code> and every tool built on <code>huggingface_hub</code> — including sentence-transformers — downloads from the mirror.":
    "<strong><a href=\"https://hf-mirror.com\" rel=\"noopener noreferrer\">hf-mirror.com</a></strong>，一个社区维护的 Hugging Face 镜像。设置好 <code>HF_ENDPOINT</code> 后，所有基于 <code>huggingface_hub</code> 的工具 —— 包括 sentence-transformers —— 都会从镜像下载。",
  "<strong>ModelScope (魔搭)</strong>, Alibaba’s model hub, which hosts <a href=\"https://modelscope.cn/models/Qwen/Qwen3-Reranker-4B\" rel=\"noopener noreferrer\">Qwen/Qwen3-Reranker-4B</a> and <a href=\"https://modelscope.cn/models/BAAI/bge-reranker-v2-m3\" rel=\"noopener noreferrer\">BAAI/bge-reranker-v2-m3</a> under the same names.":
    "<strong>魔搭（ModelScope）</strong>，阿里的模型社区，以相同的名称托管了 <a href=\"https://modelscope.cn/models/Qwen/Qwen3-Reranker-4B\" rel=\"noopener noreferrer\">Qwen/Qwen3-Reranker-4B</a> 和 <a href=\"https://modelscope.cn/models/BAAI/bge-reranker-v2-m3\" rel=\"noopener noreferrer\">BAAI/bge-reranker-v2-m3</a>。",
  "From there, serving is the same as anywhere else — see <a href=\"/guides/self-host-reranker.html\">self-hosting a reranker</a>. bge-reranker-v2-m3 runs on a CPU; Qwen3-Reranker-4B wants a GPU. Our <a href=\"/demo.html\">browser demo</a> uses the mirror too: it requests the model from huggingface.co and hf-mirror.com at once and keeps whichever answers first.":
    "之后的部署就和在其他地方一样了 —— 见<a href=\"/guides/self-host-reranker.html\">自建重排序服务</a>。bge-reranker-v2-m3 用 CPU 就能跑；Qwen3-Reranker-4B 需要 GPU。我们的<a href=\"/demo.html\">浏览器 Demo</a> 也用了镜像：它同时向 huggingface.co 和 hf-mirror.com 请求模型，哪边先响应就用哪边。",
  "What it costs":
    "费用",
  "Alibaba Cloud and SiliconFlow both bill by the token, so the cost scales with how many candidates you rerank and how long they are, not with the number of queries alone. The <a href=\"/rerank-cost-calculator.html#results-cny\">cost calculator’s yuan table</a> works it out for your volume, and warns when your passages are longer than qwen3-rerank accepts. Free quotas and trial credits are not included; check each vendor’s price page.":
    "阿里云和硅基流动都按 token 计费，所以费用取决于你重排序多少候选、每条有多长，而不只是查询次数。<a href=\"/rerank-cost-calculator.html#results-cny\">成本计算器的人民币表</a>能按你的量级算出来，段落超过 qwen3-rerank 的长度上限时还会提示。免费额度和试用金不计算在内；请查看各厂商的价格页。",
  "Whichever route you pick, label 30–100 of your own queries and compare before committing — the <a href=\"/guides/evaluate-reranker.html\">evaluation guide</a> shows how.":
    "不管选哪条路，都先给 30–100 条自己的查询标注相关性，比较之后再定 —— <a href=\"/guides/evaluate-reranker.html\">评估指南</a>里有做法。",
  "Keep reading":
    "延伸阅读",
  "Choose by scenario":
    "按场景选择",
  "RAG, support, legal, code, scanned documents.":
    "RAG、客服、法律、代码、扫描文档。",
  "0.6B / 4B / 8B, Apache 2.0 — sizes and scores.":
    "0.6B / 4B / 8B，Apache 2.0 —— 规格和分数。",
  "<a href=\"/\">Home</a><span>/</span><a href=\"/guides/\">Guides</a><span>/</span>Reranking in mainland China":
    "<a href=\"/\">首页</a><span>/</span><a href=\"/guides/\">指南</a><span>/</span>在国内做重排序",
}};

window.I18N_PAGE = { zh: {
  "_title":
    "GTE 重排序模型：阿里巴巴的小型 Apache 2.0 交叉编码器 | reranker.uk",
  "_desc":
    "GTE 重排序模型评测（2026 年 10 月）：gte-reranker-modernbert-base（149M，英文）和 gte-multilingual-reranker-base（306M，70 多种语言），都支持 8,192 token、Apache 2.0；分数及其出处，以及在 CPU、GPU 或浏览器里运行的方法。",
  "<a href=\"/\">Home</a><span>/</span><a href=\"/models/\">Models</a><span>/</span>GTE rerankers":
    "<a href=\"/\">首页</a><span>/</span><a href=\"/models/\">模型对比</a><span>/</span>GTE 重排序模型",
  "GTE rerankers":
    "GTE 重排序模型",
  "Open weights · Tongyi Lab, Alibaba · <time datetime=\"2026-10-16\">Updated 16 Oct 2026</time>":
    "开源权重 · 阿里巴巴通义实验室 · <time datetime=\"2026-10-16\">更新于 2026 年 10 月 16 日</time>",
  "Small":
    "小模型",
  "CPU-friendly":
    "CPU 友好",
  "Alibaba’s two <strong>GTE</strong> rerankers are small encoder cross-encoders, not LLM-based ones: <strong>gte-reranker-modernbert-base</strong> (149M, English) and <strong>gte-multilingual-reranker-base</strong> (306M, 70+ languages). Both take 8,192 tokens and are Apache 2.0. They are the size you can serve on a CPU or a small GPU, and the English model even runs in the browser.":
    "阿里巴巴的两个 <strong>GTE</strong> 重排序模型是小型编码器交叉编码器，不是基于大模型的：<strong>gte-reranker-modernbert-base</strong>（149M，英文）和 <strong>gte-multilingual-reranker-base</strong>（306M，70 多种语言）。两者都能接收 8,192 token，都是 Apache 2.0。它们的体量在 CPU 或小显卡上就能跑，英文模型甚至能在浏览器里运行。",
  "On this page":
    "本页目录",
  "The two models":
    "两个模型",
  "Model":
    "模型",
  "Parameters":
    "参数量",
  "Languages":
    "语言",
  "Built on":
    "基于",
  "Runs with":
    "可用的运行方式",
  "English":
    "英文",
  "transformers, sentence-transformers, transformers.js, Text Embeddings Inference":
    "transformers、sentence-transformers、transformers.js、Text Embeddings Inference",
  "Alibaba’s own encoder":
    "阿里巴巴自家的编码器",
  "transformers (custom code), sentence-transformers, Text Embeddings Inference, Infinity":
    "transformers（自定义代码）、sentence-transformers、Text Embeddings Inference、Infinity",
  "Alibaba Cloud’s hosted <code>gte-rerank</code> APIs are related models, not these weights; see <a href=\"/guides/rerank-in-china.html\">reranking in mainland China</a> for the hosted ones.":
    "阿里云托管的 <code>gte-rerank</code> API 是相关模型，并不是这两份权重；托管版本见<a href=\"/guides/rerank-in-china.html\">国内重排序指南</a>。",
  "Scores, and whose they are":
    "分数，以及是谁测的",
  "Benchmark":
    "评测",
  "Score":
    "分数",
  "Whose run":
    "测试方",
  "Alibaba, model card":
    "阿里巴巴，模型卡",
  "LoCo (long documents)":
    "LoCo（长文档）",
  "CoIR (code)":
    "CoIR（代码）",
  "MTEB-R (English)":
    "MTEB-R（英文）",
  "Qwen, Qwen3-Reranker cards":
    "Qwen，Qwen3-Reranker 模型卡",
  "CMTEB-R (Chinese)":
    "CMTEB-R（中文）",
  "MMTEB-R (multilingual)":
    "MMTEB-R（多语言）",
  "Alibaba’s card for the ModernBERT model doesn’t say which BEIR datasets or which first stage it used. For the multilingual model Alibaba publish results only as a chart (on the card and in the mGTE paper), so the numbers here are Qwen’s, who ran it as a baseline for Qwen3-Reranker, reranking the top 100 from Qwen3-Embedding-0.6B. The two models’ rows aren’t comparable with each other.":
    "ModernBERT 模型的卡片没有说明用了哪些 BEIR 数据集、第一阶段是什么。多语言模型的结果阿里巴巴只以图表形式发布（模型卡和 mGTE 论文里），所以这里用的是 Qwen 的数字：Qwen 把它作为 Qwen3-Reranker 的对照基线，重排的是 Qwen3-Embedding-0.6B 召回的前 100 个结果。两个模型的这几行彼此不可比。",
  "Next to Alibaba’s newer Qwen3-Reranker, the multilingual model is the cheap end of the scale: on the same Qwen runs the 0.6B <a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a> scores {{fact:qwen3-reranker-0.6b.mteb_r}} on MTEB-R and {{fact:qwen3-reranker-0.6b.cmteb_r}} on CMTEB-R, for twice the parameters and an LLM-style serving setup.":
    "和阿里巴巴更新的 Qwen3-Reranker 相比，多语言模型处在低成本那一端：在同一批 Qwen 测试中，0.6B 的 <a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a> 在 MTEB-R 上得 {{fact:qwen3-reranker-0.6b.mteb_r}}，在 CMTEB-R 上得 {{fact:qwen3-reranker-0.6b.cmteb_r}}，代价是两倍的参数量和大模型式的部署。",
  "Quick start":
    "快速上手",
  "The multilingual model’s card loads it with plain <code>transformers</code> and <code>trust_remote_code=True</code>, and recommends installing xformers and enabling unpadding for speed.":
    "多语言模型的卡片用普通 <code>transformers</code> 加 <code>trust_remote_code=True</code> 加载，并建议安装 xformers、开启 unpadding 以提速。",
  "As a service":
    "作为服务部署",
  "Hugging Face’s Text Embeddings Inference serves both models behind a <code>/rerank</code> route, on CPU or GPU (drop <code>cpu-</code> from the image tag and add <code>--gpus all</code>). The English model also runs in the browser through transformers.js, in fp32, fp16, q8, q4 or q4f16.":
    "Hugging Face 的 Text Embeddings Inference 可以通过 <code>/rerank</code> 接口提供这两个模型，CPU 或 GPU 都行（去掉镜像标签里的 <code>cpu-</code> 并加上 <code>--gpus all</code>）。英文模型还能通过 transformers.js 在浏览器里运行，支持 fp32、fp16、q8、q4、q4f16。",
  "When to pick GTE":
    "什么时候选 GTE",
  "<strong>Yes:</strong> CPU serving, or a GPU budget too small for an LLM-based reranker.":
    "<strong>适合：</strong>用 CPU 部署，或者显卡预算不够跑基于大模型的重排序。",
  "<strong>Yes:</strong> long passages: both take 8,192 tokens, where many small cross-encoders stop at 512.":
    "<strong>适合：</strong>段落较长：两者都能接收 8,192 token，而很多小型交叉编码器只到 512。",
  "<strong>Yes:</strong> English code or long-document search, the two areas Alibaba report for the ModernBERT model.":
    "<strong>适合：</strong>英文代码检索或长文档检索，这是阿里巴巴为 ModernBERT 模型给出成绩的两个方向。",
  "<strong>Maybe not:</strong> you need instructions, or the best multilingual quality and have a GPU: <a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a> takes instructions and scores higher on Qwen’s runs.":
    "<strong>可能不适合：</strong>需要指令，或者有 GPU 且要最好的多语言效果：<a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a> 支持指令，在 Qwen 的测试里分数也更高。",
  "Pros and cons":
    "优缺点",
  "Pros":
    "优点",
  "Apache 2.0, 149M and 306M parameters":
    "Apache 2.0，参数量 149M 和 306M",
  "8,192-token context":
    "8,192 token 上下文",
  "Served by Text Embeddings Inference on CPU or GPU":
    "可用 Text Embeddings Inference 在 CPU 或 GPU 上部署",
  "The English model runs in the browser via transformers.js":
    "英文模型可通过 transformers.js 在浏览器里运行",
  "Cons":
    "缺点",
  "No task instructions":
    "不支持任务指令",
  "Alibaba’s BEIR figure comes without its datasets or first stage":
    "阿里巴巴的 BEIR 分数没有说明数据集和第一阶段",
  "The multilingual model needs custom code in transformers":
    "多语言模型在 transformers 里需要自定义代码",
  "Behind LLM-based rerankers on Qwen’s multilingual runs":
    "在 Qwen 的多语言测试里落后于基于大模型的重排序",
  "Serving it yourself?":
    "打算自己部署？",
  "The self-host guide covers when self-hosting pays off, picking a model, serving options and an ops checklist.":
    "自托管指南讲了什么时候自托管划算、怎么选模型、有哪些部署方式，以及一份运维清单。",
  "Self-host guide →":
    "自托管指南 →",
  "All models →":
    "全部模型 →",
  "Other models":
    "其他模型",
  "The other CPU-friendly open default.":
    "另一个 CPU 友好的开源默认选择。",
  "Apache 2.0 at 0.6B, 4B and 8B.":
    "0.6B、4B、8B 全部 Apache 2.0。",
  "Apache 2.0, with a browser-sized xsmall.":
    "Apache 2.0，还有浏览器能跑的 xsmall。",
  "Reranking in China":
    "国内重排序",
  "Alibaba Cloud’s hosted rerankers.":
    "阿里云的托管重排序。",
}};

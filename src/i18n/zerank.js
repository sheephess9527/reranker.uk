window.I18N_PAGE = { zh: {
  "Deciding between them? <a href=\"/guides/compare-rerankers.html\">Compare the rerankers on the same benchmarks →</a>":
    "正在几个模型之间犹豫？<a href=\"/guides/compare-rerankers.html\">在同一评测下对比这些 reranker →</a>",
  "_title":
    "zerank-2：ZeroEntropy 的 4B 重排序模型，Apache 2.0 权重 | reranker.uk",
  "_desc":
    "zerank-2 评测（2026 年 11 月）：基于 Qwen3-4B 的 ZeroEntropy 4B 重排序模型，Hugging Face 上的 Apache 2.0 权重，托管 API 随公司并入 Notion 于 2026 年 9 月 4 日关停，ZeroEntropy 自己对比 Cohere rerank-3.5 的分数，以及 sentence-transformers 快速上手。",
  "<a href=\"/\">Home</a><span>/</span><a href=\"/models/\">Models</a><span>/</span>zerank-2":
    "<a href=\"/\">首页</a><span>/</span><a href=\"/models/\">模型对比</a><span>/</span>zerank-2",
  "Open weights · ZeroEntropy, now part of Notion · <time datetime=\"2026-11-20\">Updated 20 Nov 2026</time>":
    "开源权重 · ZeroEntropy（已并入 Notion） · <time datetime=\"2026-11-20\">更新于 2026 年 11 月 20 日</time>",
  "Open weights":
    "开源权重",
  "Apache 2.0":
    "Apache 2.0",
  "GPU recommended":
    "建议用 GPU",
  "API closed":
    "API 已关停",
  "<strong>zerank-2</strong> is ZeroEntropy’s 4B reranker, built on Qwen3-4B with a {{fact:zerank-2.context_tokens}}-token context. The weights are on Hugging Face under Apache 2.0, so you can serve it yourself. ZeroEntropy’s own API, which last listed ${{fact:zerank-2.api_usd_per_m}} per million tokens, was shut down on 4 September 2026 after the company joined Notion. Its published scores come from ZeroEntropy’s own seven-domain test. They are strong, but they can’t be compared with anyone’s BEIR figures.":
    "<strong>zerank-2</strong> 是 ZeroEntropy 的 4B 重排序模型，基于 Qwen3-4B，上下文 {{fact:zerank-2.context_tokens}} 个 token。权重以 Apache 2.0 放在 Hugging Face 上，可以自己部署。ZeroEntropy 自家的 API（最后公布价每百万 token ${{fact:zerank-2.api_usd_per_m}}）已随公司并入 Notion 于 2026 年 9 月 4 日关停。它公布的分数来自 ZeroEntropy 自己的七领域测试：成绩不错，但不能和任何人的 BEIR 分数直接比较。",
  "On this page":
    "本页目录",
  "The licence":
    "许可证",
  "ZeroEntropy relicensed every one of its models to Apache 2.0 on 24 July 2026, the day it announced it was joining Notion, and the <a href=\"https://huggingface.co/zeroentropy/zerank-2-reranker\" rel=\"noopener noreferrer\">Hugging Face model card</a> says Apache 2.0. An earlier version of ZeroEntropy’s models documentation, now offline with the rest of the site, called zerank-2 non-commercial and asked commercial users to get in touch; the company’s own announcement supersedes that line.":
    "ZeroEntropy 在 2026 年 7 月 24 日宣布并入 Notion 当天，把所有模型都改成了 Apache 2.0，<a href=\"https://huggingface.co/zeroentropy/zerank-2-reranker\" rel=\"noopener noreferrer\">Hugging Face 模型卡</a>写的也是 Apache 2.0。ZeroEntropy 早先的模型文档（已随整站下线）曾把 zerank-2 写成非商用、请商业用户联系他们；厂商自己的公告已经取代了那句话。",
  "Commercial self-hosting therefore rests on the Apache 2.0 licence on the model card. It comes without a warranty or a support contract — ZeroEntropy no longer sells either.":
    "因此商业自托管依据的就是模型卡上的 Apache 2.0 许可。它不带质保，也没有支持合同——ZeroEntropy 已经不再提供这两样。",
  "Scores, and whose they are":
    "分数，以及是谁测的",
  "Domain":
    "领域",
  "Embeddings only":
    "只用向量检索",
  "Cohere rerank-3.5":
    "Cohere rerank-3.5",
  "Web":
    "网页",
  "Conversational":
    "对话",
  "STEM and logic":
    "理工与逻辑",
  "Code":
    "代码",
  "Legal":
    "法律",
  "Biomedical":
    "生物医学",
  "Finance":
    "金融",
  "<strong>Average</strong>":
    "<strong>平均</strong>",
  "ZeroEntropy’s own run, from the model card. The metric is NDCG@10, and every reranker reorders the same top 100 candidates from OpenAI’s text-embedding-3-small; “embeddings only” is that first stage on its own. The datasets are ZeroEntropy’s, not BEIR, so the <a href=\"/models/\">models table</a> lists no BEIR figure for zerank-2.":
    "ZeroEntropy 自己的测试，数据来自模型卡。指标是 NDCG@10，每个重排序模型重排的都是 OpenAI text-embedding-3-small 召回的同一批前 100 个候选；“只用向量检索”就是第一阶段本身的成绩。数据集是 ZeroEntropy 自己的，不是 BEIR，所以<a href=\"/models/\">模型对比表</a>里 zerank-2 没有 BEIR 分数。",
  "The same run puts the older zerank-1 at {{fact:zerank-2.zerank1_same_run}} on average, and Gemini 2.5 Flash, used as a listwise reranker, at {{fact:zerank-2.gemini_flash_same_run}}. Finance is the one domain where zerank-2 doesn’t lead: Gemini scores higher there. What the table shows most clearly is the size of the jump any of these rerankers gives over embeddings alone. That jump is the thing to measure on your own data.":
    "同一测试里，更早的 zerank-1 平均 {{fact:zerank-2.zerank1_same_run}}，把 Gemini 2.5 Flash 当作列表式重排序模型用是 {{fact:zerank-2.gemini_flash_same_run}}。金融是 zerank-2 唯一没有领先的领域，Gemini 在那里更高。这张表最清楚的结论，是任何一个重排序模型相比只用向量检索带来的提升有多大——这个提升才是你该在自己数据上测的。",
  "Quick start":
    "快速上手",
  "Since May 2026, <code>predict()</code> and <code>rank()</code> return a raw logit rather than a 0–1 probability. The ranking is the same either way. For a 0–1 score, apply <code>sigmoid(score / 5)</code>, as the model card does. Loading no longer needs <code>trust_remote_code=True</code>.":
    "从 2026 年 5 月起，<code>predict()</code> 和 <code>rank()</code> 返回原始 logit，而不是 0–1 的概率，排序结果不变。需要 0–1 分数时，按模型卡的做法计算 <code>sigmoid(score / 5)</code>。加载时也不再需要 <code>trust_remote_code=True</code>。",
  "The API, and what replaced it":
    "API，以及现在用什么代替",
  "ZeroEntropy ran zerank-2 as a hosted API: ${{fact:zerank-2.api_usd_per_m}} per million tokens, the same price it listed for zerank-1 and zerank-1-small, served from US-East, US-West and Europe. That API is closed. ZeroEntropy was acquired by Notion on 24 July 2026 and said its products would be supported until 4 September 2026 and then sunset; <code>zeroentropy.dev</code> and <code>docs.zeroentropy.dev</code> no longer resolve (checked 20 November 2026). The price above is the last one listed, not something you can buy today.":
    "ZeroEntropy 曾以托管 API 提供 zerank-2：每百万 token ${{fact:zerank-2.api_usd_per_m}}，与 zerank-1、zerank-1-small 同价，服务部署在美国东部、美国西部和欧洲。这个 API 已经关停。ZeroEntropy 于 2026 年 7 月 24 日被 Notion 收购，并说明产品支持到 2026 年 9 月 4 日、之后下线；<code>zeroentropy.dev</code> 和 <code>docs.zeroentropy.dev</code> 现在已无 DNS 解析（2026 年 11 月 20 日实测）。上面那个价格是它最后一次公布的，今天买不到。",
  "What is left is the model: the weights on Hugging Face are the ones the API served, and the sentence-transformers quick start above runs them on your own GPU. If you would rather not run a GPU, the <a href=\"/rerank-cost-calculator.html\">cost calculator</a> compares the hosted rerankers that are still selling — Cohere Rerank 5, Voyage rerank-3, Jina and the cloud platforms.":
    "剩下的是模型本身：Hugging Face 上的权重就是当年 API 提供的那些，上面的 sentence-transformers 快速上手可以在自己的 GPU 上跑起来。如果不想自己养 GPU，<a href=\"/rerank-cost-calculator.html\">成本计算器</a>比较的是还在卖的托管重排序服务——Cohere Rerank 5、Voyage rerank-3、Jina 以及各家云平台。",
  "ZeroEntropy’s site also listed two smaller models, <strong>zerank-2-small</strong> and <strong>zerank-2-nano</strong>, with neither a price nor a model card, and neither is published on Hugging Face. With the company gone there is nothing more to say about them.":
    "ZeroEntropy 网站还列过两个更小的模型 <strong>zerank-2-small</strong> 和 <strong>zerank-2-nano</strong>，既没有价格也没有模型卡，两者在 Hugging Face 上都没有发布。公司已经不在了，这两个模型也就没有什么可说的了。",
  "When to pick zerank-2":
    "什么时候选 zerank-2",
  "<strong>Yes:</strong> you want an Apache 2.0 4B reranker whose weights you keep serving yourself, with no API in the middle.":
    "<strong>适合：</strong>想要一个 Apache 2.0 的 4B 重排序模型，自己拿着权重部署，中间不经过任何 API。",
  "<strong>Yes:</strong> your documents look like the domains ZeroEntropy tested: legal, finance, code, biomedical, technical.":
    "<strong>适合：</strong>你的文档和 ZeroEntropy 测过的领域相近：法律、金融、代码、生物医学、技术文档。",
  "<strong>Check first:</strong> other languages. The model card lists only English, while ZeroEntropy’s launch post calls it multilingual. Test your languages on labelled queries before relying on either.":
    "<strong>先测试：</strong>英语以外的语言。模型卡只列了英语，ZeroEntropy 的发布文章却称它支持多语言。两种说法都别直接信，先用带标注的查询测你要用的语言。",
  "<strong>Maybe not:</strong> CPU-only serving, or a team that wants a vendor to call. A 4B model wants a GPU, and there is no hosted zerank-2 any more; for CPU, start with <a href=\"/models/bge-reranker.html\">bge-reranker</a>.":
    "<strong>可能不适合：</strong>只有 CPU 的部署，或者希望有事能找厂商负责的团队。4B 模型需要 GPU，而且 zerank-2 已经没有托管服务；只有 CPU 的话，先试 <a href=\"/models/bge-reranker.html\">bge-reranker</a>。",
  "Pros and cons":
    "优缺点",
  "Pros":
    "优点",
  "Apache 2.0 weights, so self-hosting carries no per-token bill":
    "Apache 2.0 权重，自托管没有按 token 的账单",
  "32K context":
    "32K 上下文",
  "Loads directly with sentence-transformers’ <code>CrossEncoder</code>":
    "可直接用 sentence-transformers 的 <code>CrossEncoder</code> 加载",
  "Leads Cohere rerank-3.5 in every domain of ZeroEntropy’s own test":
    "在 ZeroEntropy 自己的测试里，每个领域都领先 Cohere rerank-3.5",
  "Cons":
    "缺点",
  "No hosted API since September 2026: self-hosting is the only route":
    "2026 年 9 月起没有托管 API：只能自己部署",
  "Published scores are the vendor’s own, on its own datasets":
    "公布的分数是厂商自己用自己的数据集测的",
  "4B parameters: GPU required for comfortable latency":
    "4B 参数：要有 GPU 延迟才舒服",
  "Too large for our in-browser demo":
    "太大，放不进我们的浏览器内 Demo",
  "Measure it against what you run now":
    "和你现在用的方案比一比",
  "Rerank the same top 100 from your current retriever with zerank-2 and with your current setup, on 30 labelled queries.":
    "用你现有检索器召回的同一批前 100 个结果，分别交给 zerank-2 和你现在的方案重排，在 30 条带标注的查询上比较。",
  "Evaluate guide →":
    "评测指南 →",
  "All models →":
    "全部模型 →",
  "Other models":
    "其他模型",
  "The hosted API zerank-2 compares itself with.":
    "zerank-2 拿来对比的那个托管 API。",
  "Apache 2.0 at 0.6B, 4B and 8B.":
    "0.6B、4B、8B 全部 Apache 2.0。",
  "Hosted, per-token, 32K context.":
    "托管、按 token 计费、32K 上下文。",
  "Self-host guide":
    "自托管指南",
  "Serving and ops checklist.":
    "服务化与运维清单。",
}};

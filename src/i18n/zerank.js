window.I18N_PAGE = { zh: {
  "_title":
    "zerank-2：ZeroEntropy 的 4B 重排序模型，开源权重与 API | reranker.uk",
  "_desc":
    "zerank-2 评测（2026 年 10 月）：基于 Qwen3-4B 的 ZeroEntropy 4B 重排序模型，模型卡与官方文档在许可证上的矛盾，ZeroEntropy 自己对比 Cohere rerank-3.5 的分数，API 价格，以及 sentence-transformers 快速上手。",
  "<a href=\"/\">Home</a><span>/</span><a href=\"/models/\">Models</a><span>/</span>zerank-2":
    "<a href=\"/\">首页</a><span>/</span><a href=\"/models/\">模型对比</a><span>/</span>zerank-2",
  "Open weights + hosted API · ZeroEntropy · <time datetime=\"2026-10-15\">Updated 15 Oct 2026</time>":
    "开源权重 + 托管 API · ZeroEntropy · <time datetime=\"2026-10-15\">更新于 2026 年 10 月 15 日</time>",
  "Licence: check first":
    "许可证：先确认",
  "Hosted API":
    "托管 API",
  "GPU recommended":
    "建议用 GPU",
  "<strong>zerank-2</strong> is ZeroEntropy’s 4B reranker, built on Qwen3-4B with a {{fact:zerank-2.context_tokens}}-token context. The weights are on Hugging Face, and ZeroEntropy serves the same model through its API at ${{fact:zerank-2.api_usd_per_m}} per million tokens. Its published scores come from ZeroEntropy’s own seven-domain test. They are strong, but they can’t be compared with anyone’s BEIR figures.":
    "<strong>zerank-2</strong> 是 ZeroEntropy 的 4B 重排序模型，基于 Qwen3-4B，上下文 {{fact:zerank-2.context_tokens}} 个 token。权重放在 Hugging Face 上，ZeroEntropy 也通过自家 API 提供同一个模型，每百万 token ${{fact:zerank-2.api_usd_per_m}}。它公布的分数来自 ZeroEntropy 自己的七领域测试：成绩不错，但不能和任何人的 BEIR 分数直接比较。",
  "On this page":
    "本页目录",
  "The licence question":
    "许可证问题",
  "The <a href=\"https://huggingface.co/zeroentropy/zerank-2-reranker\" rel=\"noopener noreferrer\">Hugging Face model card</a> says Apache 2.0; the repository was relicensed in July 2026. ZeroEntropy’s <a href=\"https://docs.zeroentropy.dev/models\" rel=\"noopener noreferrer\">models documentation</a> still says zerank-2 is downloadable “under a non-commercial license” and asks commercial users to get in touch.":
    "<a href=\"https://huggingface.co/zeroentropy/zerank-2-reranker\" rel=\"noopener noreferrer\">Hugging Face 模型卡</a>写的是 Apache 2.0，仓库在 2026 年 7 月改了许可证。但 ZeroEntropy 的<a href=\"https://docs.zeroentropy.dev/models\" rel=\"noopener noreferrer\">模型文档</a>仍然写着 zerank-2 “按非商业许可证”提供下载，并请商业用户联系他们。",
  "Until the two agree, get ZeroEntropy’s confirmation in writing before you self-host it in a commercial product. Using it through the API is covered by ZeroEntropy’s terms of service instead, and the older <strong>zerank-1-small</strong> is Apache 2.0 in both places.":
    "在两边说法一致之前，如果要在商业产品里自托管，先拿到 ZeroEntropy 的书面确认。通过 API 使用则受 ZeroEntropy 的服务条款约束，不涉及这个问题；更早的 <strong>zerank-1-small</strong> 在两边都是 Apache 2.0。",
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
  "The API costs ${{fact:zerank-2.api_usd_per_m}} per million tokens. ZeroEntropy’s documentation lists the same price for zerank-1 and zerank-1-small, and serves the API from US-East, US-West and Europe. Rate limits depend on your subscription tier; check the <a href=\"https://docs.zeroentropy.dev/models\" rel=\"noopener noreferrer\">docs</a> for the current figures. The model is also sold through the AWS and Azure marketplaces, where it runs inside your own cloud account.":
    "API 价格为每百万 token ${{fact:zerank-2.api_usd_per_m}}。ZeroEntropy 文档里 zerank-1 和 zerank-1-small 价格相同，API 部署在美国东部、美国西部和欧洲。速率限制取决于订阅档位，当前数值见<a href=\"https://docs.zeroentropy.dev/models\" rel=\"noopener noreferrer\">文档</a>。这个模型也在 AWS 和 Azure 应用市场上架，部署后运行在你自己的云账号里。",
  "When to pick zerank-2":
    "什么时候选 zerank-2",
  "<strong>Yes:</strong> you want one model you can call as an API now and self-host later without changing its behaviour.":
    "<strong>适合：</strong>想先调用 API，以后再自托管，而且换部署方式时模型行为不变。",
  "<strong>Yes:</strong> your documents look like the domains ZeroEntropy tested: legal, finance, code, biomedical, technical.":
    "<strong>适合：</strong>你的文档和 ZeroEntropy 测过的领域相近：法律、金融、代码、生物医学、技术文档。",
  "<strong>Check first:</strong> other languages. The model card lists only English, while ZeroEntropy’s launch post calls it multilingual. Test your languages on labelled queries before relying on either.":
    "<strong>先测试：</strong>英语以外的语言。模型卡只列了英语，ZeroEntropy 的发布文章却称它支持多语言。两种说法都别直接信，先用带标注的查询测你要用的语言。",
  "<strong>Maybe not:</strong> commercial self-hosting before the licence is settled (<a href=\"#licence\">above</a>), or CPU-only serving. A 4B model wants a GPU; for CPU, start with <a href=\"/models/bge-reranker.html\">bge-reranker</a>.":
    "<strong>可能不适合：</strong>许可证问题解决前的商业自托管（见<a href=\"#licence\">上文</a>），或者只有 CPU 的部署。4B 模型需要 GPU；只有 CPU 的话，先试 <a href=\"/models/bge-reranker.html\">bge-reranker</a>。",
  "Pros and cons":
    "优缺点",
  "Pros":
    "优点",
  "The same model as weights and as an API":
    "同一个模型既有权重也有 API",
  "32K context":
    "32K 上下文",
  "Loads directly with sentence-transformers’ <code>CrossEncoder</code>":
    "可直接用 sentence-transformers 的 <code>CrossEncoder</code> 加载",
  "Leads Cohere rerank-3.5 in every domain of ZeroEntropy’s own test":
    "在 ZeroEntropy 自己的测试里，每个领域都领先 Cohere rerank-3.5",
  "Cons":
    "缺点",
  "Model card and documentation disagree on the licence":
    "模型卡和官方文档对许可证说法不一",
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

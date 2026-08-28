window.I18N_PAGE = { zh: {
  "_title": "加了 reranker 却没变好？7 个原因 | reranker.uk",
  "_desc": "接入重排序后效果没提升？常见原因是检索召回不够、候选池太小、超过模型 token 上限被静默截断、分块过大、语言不匹配，以及把未校准的分数当概率用。附逐条排查清单。",

  "<a href=\"/\">Home</a><span>/</span><a href=\"/guides/\">Guides</a><span>/</span>Reranking didn't help":
    "<a href=\"/\">首页</a><span>/</span><a href=\"/guides/\">指南</a><span>/</span>重排序没起作用",
  "Your reranker didn't improve results. Here's why": "加了 reranker 却没变好，原因在这里",
  "Troubleshooting · ~9 min read · <time datetime=\"2026-08-25\">Updated 25 Aug 2026</time>":
    "排障 · 约 9 分钟阅读 · <time datetime=\"2026-08-25\">更新于 2026 年 8 月 25 日</time>",
  "You added a rerank stage, the latency went up, and the answers are the same. That is a common outcome, and it is almost never because the reranker is bad. In nearly every case the model is doing its job on inputs that make its job pointless. Work through these in order — the first two explain most failures.":
    "你加了重排序这一步，延迟涨了，答案还是原来那些。这个结果很常见，而且几乎从来不是因为 reranker 不行。绝大多数情况下，模型正常工作，只是输入让它的工作失去了意义。按顺序排查下面几条 —— 前两条能解释大部分失败。",

  "On this page": "本页内容",
  "<a href=\"#recall\">Retrieval never returned the right document</a>": "<a href=\"#recall\">检索压根没返回正确的文档</a>",
  "<a href=\"#topk\">Your candidate pool is too small</a>": "<a href=\"#topk\">候选池太小</a>",
  "<a href=\"#truncation\">Passages are being silently truncated</a>": "<a href=\"#truncation\">段落被静默截断了</a>",
  "<a href=\"#chunks\">Chunks are too big to rank</a>": "<a href=\"#chunks\">分块太大，排不动</a>",
  "<a href=\"#language\">Language or domain mismatch</a>": "<a href=\"#language\">语言或领域不匹配</a>",
  "<a href=\"#scores\">Misreading the scores</a>": "<a href=\"#scores\">误读了分数</a>",
  "<a href=\"#measure\">You cannot see the improvement</a>": "<a href=\"#measure\">你看不见提升</a>",
  "<a href=\"#checklist\">Checklist</a>": "<a href=\"#checklist\">排查清单</a>",

  "<strong>The one-line diagnosis:</strong> a reranker can only reorder what retrieval handed it. If the right passage is not in the candidate list, no reranker will invent it — and reordering wrong answers changes nothing you can measure.":
    "<strong>一句话诊断：</strong>reranker 只能对检索交给它的东西重新排序。如果正确的段落根本不在候选列表里，再好的 reranker 也变不出来 —— 而把错误答案换个顺序，不会带来任何可测量的变化。",

  "1. Retrieval never returned the right document": "1. 检索压根没返回正确的文档",
  "This is the single most common cause. Reranking is a <em>precision</em> stage; it cannot fix <em>recall</em>. If your vector search misses the relevant chunk entirely, the reranker faithfully ranks a set of documents none of which answer the question.":
    "这是最常见的单一原因。重排序是<em>精度</em>环节，它修不了<em>召回</em>。如果向量检索完全漏掉了相关分块，reranker 只会老老实实地对一堆都答非所问的文档排序。",
  "Test it directly, before touching the reranker. Take 20 queries where you know the correct document, retrieve your normal top-k, and just check membership:":
    "动 reranker 之前先直接测一下。取 20 条你已知正确文档的查询，按平时的 top-k 检索，然后只看命中与否：",
  "If that number is below roughly 0.8, stop tuning the reranker — you are working on the wrong stage. Fix retrieval first: widen k, improve chunking, or add keyword matching. A <a href=\"/guides/hybrid-retrieval-rerank.html\">hybrid retriever</a> that combines BM25 with vectors usually lifts recall more than any reranker choice will, because the two fail on different queries.":
    "如果这个数低于 0.8 左右，就别再调 reranker 了 —— 你在错误的环节上使劲。先修检索：放大 k、改进分块，或者加上关键词匹配。把 BM25 和向量结合起来的<a href=\"/guides/hybrid-retrieval-rerank.html\">混合检索</a>，对召回的提升通常比换任何 reranker 都大，因为这两者失败的查询类型不同。",

  "2. Your candidate pool is too small": "2. 候选池太小",
  "Reranking the top 5 and keeping 5 does nothing — there is no reordering to do that matters. The reranker needs room to work: retrieve wide, rank, then cut.":
    "对前 5 条重排再保留 5 条，等于什么也没做 —— 没有任何有意义的顺序可调。reranker 需要发挥空间：先宽召回，再排序，最后截断。",
  "Retrieve": "召回",
  "Keep after rerank": "重排后保留",
  "Effect": "效果",
  "No effect — same set, mildly different order": "无效 —— 同一批内容，顺序略有不同",
  "Marginal; the reranker can only promote from 5 spare slots": "微弱；reranker 只有 5 个备选位可以提拔",
  "<strong>Typical useful setting</strong>": "<strong>典型的有效配置</strong>",
  "Best quality; watch latency and cost": "质量最好；注意延迟与成本",
  "If you retrieve 50 and keep 5, the reranker has 45 candidates it can promote into the answer. That is where the lift comes from. Our <a href=\"/rerank-cost-calculator.html\">cost calculator</a> shows what widening the pool does to your bill — usually less than people fear, and a step rather than a slope on per-search pricing.":
    "召回 50 保留 5，reranker 就有 45 个候选可以提拔进最终答案，提升正是从这里来的。放大候选池对账单的影响可以用我们的<a href=\"/rerank-cost-calculator.html\">成本计算器</a>算 —— 通常比大家担心的小，而且在按次计费下是阶梯式而非线性上涨。",

  "3. Passages are being silently truncated": "3. 段落被静默截断了",
  "Every cross-encoder has a maximum input length, and the query plus the passage share it. Exceed it and the tail of your passage is cut off — often the part that actually answers the question. Nothing errors; the score just comes back meaningless.":
    "每个 cross-encoder 都有输入长度上限，而且查询和段落共用这个额度。超了，段落尾部就会被切掉 —— 而那往往正是真正回答问题的部分。不会报任何错，只是分数变得没有意义。",
  "Classic MiniLM-style rerankers cap at <strong>512 tokens</strong> for the pair. Modern hosted models are far roomier — <a href=\"/models/cohere-rerank.html\">Cohere Rerank 4</a> and <a href=\"/models/voyage-rerank.html\">Voyage rerank-2.5</a> both take 32,000 — so a model swap can fix this outright. If you are self-hosting a 512-token model, check where your passages actually land:":
    "经典的 MiniLM 系 reranker 对「查询+段落」整体上限是 <strong>512 token</strong>。现在的托管模型宽裕得多 —— <a href=\"/models/cohere-rerank.html\">Cohere Rerank 4</a> 和 <a href=\"/models/voyage-rerank.html\">Voyage rerank-2.5</a> 都是 32,000 —— 所以换个模型就能直接解决。如果你自托管的是 512 token 的模型，先看看你的段落实际落在哪个区间：",
  "You can watch this happen in <a href=\"/demo.html?s=legal\">the demo</a>: it warns when a passage exceeds the selected <code>max_length</code>, and you can see the score for a long passage change as you shorten it.":
    "这个现象可以在 <a href=\"/demo.html?s=legal\">Demo</a> 里直接看到：段落超过所选 <code>max_length</code> 时它会警告，你也能看到把长段落缩短后分数是怎么变的。",

  "4. Chunks are too big to rank": "4. 分块太大，排不动",
  "Even inside the length limit, a large chunk dilutes the signal. A 2,000-word page that mentions your topic once looks, to the model, mostly like text about something else. Its relevance score lands in the middle, below a short passage that is entirely on-topic.":
    "即便没超长度上限，大分块也会稀释信号。一篇 2000 词、只提了一次你关心主题的页面，在模型看来大部分内容都是在讲别的事。它的相关性分数会落在中间，低于一个通篇切题的短段落。",
  "This is the opposite failure from truncation and it has the opposite fix: <strong>smaller chunks</strong>. 200–400 tokens with a little overlap is a reasonable starting point for reranking. If you need the surrounding context for generation, retrieve and rank the small chunk, then expand to its parent section before putting it in the prompt.":
    "这和截断是相反的失败模式，解法也相反：<strong>把分块改小</strong>。200–400 token 加一点重叠，是重排序场景下比较合理的起点。如果生成时需要上下文，可以先用小块检索和排序，再在放进 prompt 前扩展到它所属的父级章节。",

  "5. Language or domain mismatch": "5. 语言或领域不匹配",
  "An English-only reranker on Chinese, German or mixed-language content will produce scores, and they will be close to noise. Check that the model you picked actually covers your languages — <a href=\"/models/bge-reranker.html\">bge-reranker-v2-m3</a> and <a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a> cover 100+, while several strong English models cover exactly one.":
    "把只支持英文的 reranker 用在中文、德文或混合语言内容上，它照样会给出分数，但那基本是噪声。确认你选的模型确实覆盖你的语言 —— <a href=\"/models/bge-reranker.html\">bge-reranker-v2-m3</a> 和 <a href=\"/models/qwen-reranker.html\">Qwen3-Reranker</a> 覆盖 100+ 种，而好几个很强的英文模型只覆盖一种。",
  "Domain is subtler. Code, legal clauses and clinical notes all break models trained on web prose, because the vocabulary that signals relevance is different. If your content is one of these, test against a domain-appropriate option before concluding that reranking does not help. The <a href=\"/demo.html?s=code\">code search scenario</a> in the demo shows how differently a general model treats an exact function name versus a paraphrase.":
    "领域的影响更隐蔽。代码、法律条款、临床记录都会让基于网页文本训练的模型失灵，因为标志「相关」的词汇体系不一样。如果你的内容属于这几类，先换一个适配该领域的模型再测，别急着下「重排序没用」的结论。Demo 里的<a href=\"/demo.html?s=code\">代码检索场景</a>就能看出，通用模型对精确函数名和对同义改写的处理差别有多大。",

  "6. Misreading the scores": "6. 误读了分数",
  "Two mistakes here, both common:": "这里有两个常见误区：",
  "<strong>Treating scores as probabilities.</strong> Most cross-encoders emit an unbounded logit, not a calibrated 0–1 relevance. A score of 3.2 does not mean \"76% relevant\". Only the <em>ordering</em> is meaningful.":
    "<strong>把分数当概率。</strong>大多数 cross-encoder 输出的是无界 logit，而不是校准过的 0–1 相关度。分数 3.2 不代表「76% 相关」。只有<em>顺序</em>是有意义的。",
  "<strong>Comparing scores across models or queries.</strong> A score of 0.4 from one model and 0.4 from another mean nothing to each other, and the same model's scores are not comparable between two different queries. If you want an absolute cutoff, calibrate a threshold on your own labelled data — do not import one from a blog post.":
    "<strong>跨模型或跨查询比较分数。</strong>A 模型的 0.4 和 B 模型的 0.4 之间没有任何可比性；即使同一个模型，两个不同查询下的分数也不可比。如果你需要一个绝对阈值，请在自己的标注数据上校准 —— 别直接抄博客里的数字。",
  "If you are filtering with something like <code>score &gt; 0.5</code> and getting empty result sets, this is why.":
    "如果你在用 <code>score &gt; 0.5</code> 之类的条件过滤、结果却总是空的，原因就在这里。",

  "7. You cannot see the improvement": "7. 你看不见提升",
  "Sometimes reranking <em>is</em> working and the measurement is not sensitive enough to show it. Two things to check:":
    "有时重排序<em>确实</em>在起作用，只是你的测量方式不够灵敏，看不出来。检查两点：",
  "<strong>Are you measuring ranking, or the final answer?</strong> If your LLM was already getting the right answer from a mediocre ordering, better ordering will not change the output — it will change your token bill instead. That is a real win, just not the one you were watching.":
    "<strong>你测的是排序，还是最终答案？</strong>如果在排序一般的情况下大模型本来就能答对，那么排序变好不会改变输出 —— 改变的是你的 token 账单。这仍然是实打实的收益，只是不在你盯着的那个指标上。",
  "<strong>Is your eval set big enough?</strong> Ten queries cannot distinguish a 5% lift from noise. Thirty to a hundred labelled queries is the usual minimum — see <a href=\"/guides/evaluate-reranker.html\">how to evaluate rerankers</a> for NDCG@k and MRR, which detect ordering changes that an exact-match check will not.":
    "<strong>你的评测集够大吗？</strong>10 条查询区分不出 5% 的提升和噪声。30 到 100 条标注查询是通常的下限 —— 参见<a href=\"/guides/evaluate-reranker.html\">如何评测 reranker</a> 中的 NDCG@k 与 MRR，它们能捕捉到精确匹配检查发现不了的顺序变化。",

  "Checklist": "排查清单",
  "recall@50 of your retriever is above ~0.8": "检索器的 recall@50 高于约 0.8",
  "you retrieve at least 5–10× what you keep": "召回量至少是保留量的 5–10 倍",
  "no passage exceeds the model's input limit once the query is added": "加上查询后，没有段落超过模型的输入上限",
  "chunks are 200–400 tokens, not whole documents": "分块是 200–400 token，而不是整篇文档",
  "the model covers your languages and is sane on your domain": "模型覆盖你的语言，且在你的领域表现正常",
  "you rank by score rather than thresholding on an uncalibrated number": "你是按分数排序，而不是拿未校准的数字设阈值",
  "you measure NDCG or MRR on 30+ labelled queries, not vibes": "你在 30 条以上标注查询上测 NDCG 或 MRR，而不是凭感觉",
  "If every box is ticked and reranking still shows no lift, that is a legitimate finding: your retrieval is already good enough for your queries, and you can drop the stage and keep the latency. That is a better outcome than a reranker that quietly does nothing.":
    "如果每一条都满足了，重排序仍然没有提升，那本身就是一个有效结论：对你的查询而言检索已经足够好，可以砍掉这一步、把延迟省下来。这比留着一个默默不起作用的 reranker 要好。",

  "Watch the failure modes directly": "直接观察这些失败模式",
  "Paste your own passages, shorten them, lengthen them — see exactly when scores stop making sense.":
    "粘贴你自己的段落，把它改短、改长 —— 亲眼看看分数从什么时候开始失去意义。",
  "Open the live demo →": "打开在线 Demo →",
  "Keep reading": "继续阅读",
  "How to evaluate rerankers": "如何评测 reranker",
  "NDCG, MRR and a labelled set small enough to actually build.": "NDCG、MRR，以及一个小到真的做得出来的标注集。",
  "Hybrid retrieval + rerank": "混合检索 + 重排序",
  "Fix recall before blaming the ranking stage.": "先修召回，再怪排序环节。"
} };

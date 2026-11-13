window.I18N_PAGE = { zh: {
  "<a href=\"/\">Home</a><span>/</span>NDCG and MRR calculator":
    "<a href=\"/\">首页</a><span>/</span>NDCG 与 MRR 计算器",
  "NDCG and MRR calculator":
    "NDCG 与 MRR 计算器",
  "Tool · <time datetime=\"2026-11-13\">Updated 13 Nov 2026</time>":
    "工具 · <time datetime=\"2026-11-13\">更新于 2026 年 11 月 13 日</time>",
  "Did the reranker help? Paste the relevance labels of each query’s candidates in the order they were returned, once before reranking and once after, and read off NDCG@k, MRR and Hit@1. It runs in your browser: nothing you type is sent anywhere. The <a href=\"/guides/evaluate-reranker.html\">evaluation guide</a> explains how to build the labels.":
    "reranker 有没有帮上忙？把每条查询的候选按返回顺序给出相关度标签，重排序前一份、重排序后一份，就能读出 NDCG@k、MRR 和 Hit@1。全部在浏览器里计算：你输入的内容不会发送到任何地方。如何准备标签见<a href=\"/guides/evaluate-reranker.html\">评测指南</a>。",
  "Your rankings":
    "你的排序结果",
  "Before reranking <span class=\"hint\">one query per line</span>":
    "重排序前 <span class=\"hint\">每行一条查询</span>",
  "After reranking <span class=\"hint\">same queries, same order</span>":
    "重排序后 <span class=\"hint\">同样的查询，同样的顺序</span>",
  "Cut-off k <span class=\"hint\">top results that count</span>":
    "截断位置 k <span class=\"hint\">只计前几名</span>",
  "Results":
    "结果",
  "Average ranking quality before and after reranking":
    "重排序前后的平均排序质量",
  "Metric":
    "指标",
  "Before":
    "重排序前",
  "After":
    "重排序后",
  "Change":
    "变化",
  "Per query":
    "逐条查询",
  "NDCG and reciprocal rank for each query":
    "每条查询的 NDCG 和倒数排名",
  "Query":
    "查询",
  "NDCG before":
    "NDCG 前",
  "NDCG after":
    "NDCG 后",
  "Rank of first relevant":
    "首个相关结果的名次",
  "How to enter the labels":
    "标签怎么填",
  "Each line is one query. Write one number per candidate, in ranked order, separated by spaces or commas: <code>0</code> for not relevant, <code>1</code> for relevant, and <code>2</code> or <code>3</code> if you grade relevance. “Before” is the order your retriever returned; “after” is the same candidates in the order the reranker put them. The two lines for a query must hold the same labels, just in a different order.":
    "每行是一条查询。按排名顺序给每个候选写一个数字，用空格或逗号隔开：<code>0</code> 表示不相关，<code>1</code> 表示相关；如果你给相关度分级，可以用 <code>2</code>、<code>3</code>。「重排序前」是检索器返回的顺序，「重排序后」是同一批候选经 reranker 重新排列的顺序。同一条查询的两行必须包含相同的标签，只是顺序不同。",
  "What the numbers mean":
    "这些数字是什么意思",
  "<strong>NDCG@k</strong> — discounted cumulative gain of the top k results, divided by the best score those same candidates could have reached. 1.0 means the best candidates are on top. Gain is the label itself and the discount is 1 / log2(rank + 1).":
    "<strong>NDCG@k</strong> —— 前 k 个结果的折损累计增益，除以这批候选能达到的最好得分。1.0 表示最好的候选都排在最前面。增益取标签本身，折损为 1 / log2(名次 + 1)。",
  "<strong>MRR</strong> — the average of 1 / rank of the first relevant result within the top k, counting 0 when there is none.":
    "<strong>MRR</strong> —— 前 k 名内第一个相关结果的 1 / 名次的平均值，没有则记 0。",
  "<strong>Hit@1</strong> — the share of queries whose top result is relevant.":
    "<strong>Hit@1</strong> —— 排第一的结果是相关的查询所占比例。",
  "Queries with no relevant candidate at all are left out of the averages, because no reranker can fix them; if there are many, the problem is retrieval, not reranking. Only the candidates you list are scored, so this measures reordering, not recall. With 30 queries a small difference can be noise: treat gains of a point or two as a tie and look at the per-query table before trusting them.":
    "完全没有相关候选的查询不计入平均值，因为任何 reranker 都救不了它们；这样的查询很多的话，问题出在检索而不是重排序。只有你列出的候选会被打分，所以这里衡量的是重新排序的效果，不是召回。只有 30 条查询时，小幅差异可能只是噪声：一两个点的提升当作持平，信它之前先看逐条查询的表。",
  "Need candidates to label?":
    "需要标注的候选？",
  "The live demo shows how a cross-encoder reorders a shortlist — a quick way to see which ranking is better before you label a real set.":
    "在线 Demo 展示 cross-encoder 如何重新排列一份候选名单，在标注真实数据集之前，可以先直观地看看哪种排序更好。",
  "Open the live demo →":
    "打开在线 Demo →",
  "Keep reading":
    "继续阅读",
  "Evaluate rerankers":
    "评测 reranker",
  "Build the labelled set, run the protocol, regression-test.":
    "建标注集、跑评测流程、做回归测试。",
  "Reranking didn’t help":
    "重排序没起作用",
  "What to check when the numbers don’t move.":
    "数字没有变化时该检查什么。",
  "_title":
    "NDCG 与 MRR 计算器：重排序有没有用？ | reranker.uk",
  "_desc":
    "粘贴每条查询候选的相关度标签（重排序前后各一份），在浏览器里算出 NDCG@k、MRR 和 Hit@1，不上传任何数据。",
}};

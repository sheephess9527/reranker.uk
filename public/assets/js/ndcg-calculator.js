/* NDCG / MRR / Hit@1 calculator. Pure client-side; nothing leaves the page. */
(function () {
  var before = document.getElementById("ndcg-before");
  var after = document.getElementById("ndcg-after");
  var kInput = document.getElementById("ndcg-k");
  var status = document.getElementById("ndcg-status");
  var rows = document.getElementById("ndcg-rows");
  var rowsQ = document.getElementById("ndcg-rows-q");
  if (!before || !after || !kInput || !rows) return;

  var zh = (document.documentElement.lang || "").toLowerCase().indexOf("zh") === 0;
  function L(en, cn) { return zh ? cn : en; }

  function parseLines(text) {
    var out = [];
    var lines = text.split(/\r?\n/);
    for (var i = 0; i < lines.length; i++) {
      var raw = lines[i].trim();
      if (!raw) continue;
      var parts = raw.split(/[\s,;]+/).filter(Boolean);
      var nums = parts.map(Number);
      if (nums.some(function (n) { return !isFinite(n) || n < 0; })) return { error: i + 1 };
      out.push(nums);
    }
    return { lines: out };
  }

  function dcg(labels, k) {
    var s = 0;
    for (var i = 0; i < Math.min(k, labels.length); i++) s += labels[i] / Math.log2(i + 2);
    return s;
  }
  function ndcg(labels, k) {
    var ideal = dcg(labels.slice().sort(function (a, b) { return b - a; }), k);
    return ideal > 0 ? dcg(labels, k) / ideal : null;
  }
  function firstRelevant(labels, k) {
    for (var i = 0; i < Math.min(k, labels.length); i++) if (labels[i] > 0) return i + 1;
    return 0;
  }
  function sameLabels(a, b) {
    if (a.length !== b.length) return false;
    var x = a.slice().sort(), y = b.slice().sort();
    return x.every(function (v, i) { return v === y[i]; });
  }
  function fmt(n) { return n.toFixed(3); }
  function mean(a) { return a.reduce(function (s, v) { return s + v; }, 0) / a.length; }
  function esc(s) { return s.replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }

  function update() {
    rows.innerHTML = "";
    rowsQ.innerHTML = "";
    var k = Math.floor(Number(kInput.value));
    var b = parseLines(before.value), a = parseLines(after.value);
    if (!(k >= 1)) { status.textContent = L("Enter a cut-off k of 1 or more.", "请输入不小于 1 的截断位置 k。"); return; }
    if (b.error || a.error) {
      status.textContent = L("Line " + (b.error || a.error) + " has something other than numbers (0, 1, 2…).", "第 " + (b.error || a.error) + " 行含有数字以外的内容（0、1、2…）。");
      return;
    }
    if (!b.lines.length || b.lines.length !== a.lines.length) {
      status.textContent = L("“Before” and “after” need the same number of queries (" + b.lines.length + " vs " + a.lines.length + ").",
        "「重排序前」和「重排序后」的查询数量要一致（" + b.lines.length + " 对 " + a.lines.length + "）。");
      return;
    }
    for (var i = 0; i < b.lines.length; i++) {
      if (!sameLabels(b.lines[i], a.lines[i])) {
        status.textContent = L("Query " + (i + 1) + ": the two lines must hold the same labels in a different order.",
          "第 " + (i + 1) + " 条查询：两行必须包含相同的标签，只是顺序不同。");
        return;
      }
    }

    var nB = [], nA = [], mB = [], mA = [], hB = [], hA = [], skipped = 0, q = [];
    b.lines.forEach(function (lb, idx) {
      var la = a.lines[idx];
      var xb = ndcg(lb, k), xa = ndcg(la, k);
      var rb = firstRelevant(lb, k), ra = firstRelevant(la, k);
      if (xb === null) { skipped++; q.push({ i: idx + 1, skip: true }); return; }
      nB.push(xb); nA.push(xa);
      mB.push(rb ? 1 / rb : 0); mA.push(ra ? 1 / ra : 0);
      hB.push(lb[0] > 0 ? 1 : 0); hA.push(la[0] > 0 ? 1 : 0);
      q.push({ i: idx + 1, nb: xb, na: xa, ra: ra });
    });
    var n = nB.length;
    if (!n) { status.textContent = L("No query has a relevant candidate, so there is nothing to score.", "没有任何一条查询含有相关候选，无法打分。"); return; }

    status.textContent = L(n + " queries scored" + (skipped ? ", " + skipped + " left out for having no relevant candidate" : "") + ", k = " + k + ".",
      "已计算 " + n + " 条查询" + (skipped ? "，另有 " + skipped + " 条因没有相关候选而不计入" : "") + "，k = " + k + "。");

    [["NDCG@" + k, nB, nA], ["MRR@" + k, mB, mA], ["Hit@1", hB, hA]].forEach(function (m) {
      var x = mean(m[1]), y = mean(m[2]), d = y - x;
      var tr = document.createElement("tr");
      tr.innerHTML = "<td>" + m[0] + "</td><td class=\"mono\">" + fmt(x) + "</td><td class=\"mono\">" + fmt(y) + "</td><td class=\"mono\">" + (d > 0 ? "+" : "") + fmt(d) + "</td>";
      rows.appendChild(tr);
    });
    q.forEach(function (r) {
      var tr = document.createElement("tr");
      if (r.skip) tr.innerHTML = "<td>" + r.i + "</td><td colspan=\"3\">" + esc(L("no relevant candidate", "没有相关候选")) + "</td>";
      else tr.innerHTML = "<td>" + r.i + "</td><td class=\"mono\">" + fmt(r.nb) + "</td><td class=\"mono\">" + fmt(r.na) + "</td><td class=\"mono\">" + (r.ra || "–") + "</td>";
      rowsQ.appendChild(tr);
    });
  }

  [before, after, kInput].forEach(function (el) { el.addEventListener("input", update); });
  update();
})();

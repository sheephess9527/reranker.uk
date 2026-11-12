/* Reranker picker: show the suggestions whose data-* conditions match the answers. */
(function () {
  const form = document.getElementById("picker");
  const results = Array.from(document.querySelectorAll(".picker-result"));
  if (!form || !results.length) return;
  const hint = document.getElementById("picker-hint");
  if (hint) hint.hidden = true;
  const FIELDS = ["content", "run", "lang", "instr"];

  function update() {
    const answers = {};
    for (const f of FIELDS) answers[f] = form.elements[f].value;
    for (const el of results) {
      el.hidden = FIELDS.some((f) => {
        const want = el.dataset[f];
        return want && !want.split(" ").includes(answers[f]);
      });
    }
  }
  form.addEventListener("change", update);
  update();
})();

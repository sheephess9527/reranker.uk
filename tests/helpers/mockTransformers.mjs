/**
 * A fake transformers.js ESM module, served in place of the real CDN import
 * so the mocked demo smoke test can run with no network access. It doesn't
 * simulate real model weights — it fabricates scores that rank the *last*
 * document highest, so the test can assert the render actually reordered
 * the DOM by score rather than just echoing input order.
 */
export const FAKE_TRANSFORMERS_MODULE_SOURCE = `
export const env = { allowLocalModels: true, useBrowserCache: true, remoteHost: "" };

function fireProgress(cb, file) {
  if (!cb) return;
  cb({ status: "progress", file, loaded: 50, total: 100 });
  cb({ status: "progress", file, loaded: 100, total: 100 });
  cb({ status: "done", file });
}

// A test can name a host whose files "fail" the way a CORS rejection does
// in a real browser: fetch() throws TypeError("Failed to fetch").
function failIfHostDown() {
  if (globalThis.__downHost && env.remoteHost === globalThis.__downHost) {
    throw new TypeError("Failed to fetch");
  }
}

export const AutoTokenizer = {
  from_pretrained: async (modelId, opts) => {
    failIfHostDown();
    fireProgress(opts && opts.progress_callback, "tokenizer.json");
    return (queries, callOpts) => ({
      __n: (callOpts && callOpts.text_pair ? callOpts.text_pair.length : queries.length),
    });
  },
};

export const AutoModelForSequenceClassification = {
  from_pretrained: async (modelId, opts) => {
    failIfHostDown();
    fireProgress(opts && opts.progress_callback, "model.onnx");
    return async (inputs) => {
      const n = inputs.__n;
      // Ascending raw scores by input position: the last document supplied
      // gets the highest score, the first gets the lowest.
      const raw = Array.from({ length: n }, (_, i) => i);
      const max = Math.max(n - 1, 1);
      return {
        logits: {
          sigmoid: () => ({ tolist: () => raw.map((s) => [s / max]) }),
          tolist: () => raw.map((s) => [s]),
        },
      };
    };
  },
};
`;

/**
 * Wires a page so demo.js's dynamic import of transformers.js resolves to
 * the fake module above, and the huggingface.co/hf-mirror.com host race
 * resolves immediately instead of waiting out its real timeout.
 *
 * mirrorWinsButFails: huggingface.co's probe fails, so hf-mirror.com wins
 * the race, but model files then fail from hf-mirror.com — what a visitor
 * outside mainland China gets when hf-mirror.com happens to answer first.
 */
export async function mockTransformersOnPage(page, { mirrorWinsButFails = false } = {}) {
  await page.route("https://cdn.jsdelivr.net/npm/@huggingface/transformers**", (route) =>
    route.fulfill({ contentType: "text/javascript", body: FAKE_TRANSFORMERS_MODULE_SOURCE })
  );
  if (mirrorWinsButFails) {
    await page.addInitScript(() => (globalThis.__downHost = "https://hf-mirror.com"));
    await page.route("https://huggingface.co/api/models", (route) => route.abort());
  }
  await page.route("https://huggingface.co/**", (route) => route.fulfill({ status: 200, body: "" }));
  await page.route("https://hf-mirror.com/**", (route) => route.fulfill({ status: 200, body: "" }));
}

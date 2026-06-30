#!/usr/bin/env node
/**
 * Rasterise the master app icon (public/assets/img/icon-master.svg) into the
 * PNG sizes iOS "Add to Home Screen" and the PWA manifest need.
 *
 * Requires the dev dependency @resvg/resvg-js:  npm install
 * Run:  node scripts/render-icons.mjs   (or: npm run icons)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { Resvg } = require("@resvg/resvg-js");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMG = path.join(__dirname, "..", "public", "assets", "img");
const svg = fs.readFileSync(path.join(IMG, "icon-master.svg"), "utf8");

// filename → pixel size
const targets = {
  "apple-touch-icon.png": 180, // iOS home-screen icon
  "icon-192.png": 192, // PWA manifest
  "icon-512.png": 512, // PWA manifest / splash
};

for (const [name, size] of Object.entries(targets)) {
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: size } });
  const png = resvg.render().asPng();
  fs.writeFileSync(path.join(IMG, name), png);
  console.log(`rendered ${name} (${size}×${size})`);
}

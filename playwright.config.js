// @ts-check
import { defineConfig, devices } from "@playwright/test";
import fs from "fs";

// This sandbox pre-installs Chromium at a fixed path instead of letting
// Playwright manage its own download; CI environments don't have that path
// and run `playwright install` instead, so only pin it when it exists.
const pinnedChromium = "/opt/pw-browsers/chromium";
const executablePath = fs.existsSync(pinnedChromium) ? pinnedChromium : undefined;

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "line" : "list",
  use: {
    baseURL: "http://localhost:4173",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "node scripts/serve.mjs",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 15_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], launchOptions: { executablePath } },
    },
  ],
});

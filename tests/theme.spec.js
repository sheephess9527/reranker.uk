// @ts-check
import { test, expect } from "@playwright/test";

/**
 * First visit follows the system theme; a choice made with the toggle wins
 * from then on, whatever the system says.
 */
const theme = (page) => page.evaluate(() => document.documentElement.dataset.theme || "dark");

test("a first visit follows a light system theme", async ({ browser }) => {
  const ctx = await browser.newContext({ colorScheme: "light" });
  const page = await ctx.newPage();
  await page.goto("http://localhost:4173/");
  expect(await theme(page)).toBe("light");
  await ctx.close();
});

test("a first visit follows a dark system theme", async ({ browser }) => {
  const ctx = await browser.newContext({ colorScheme: "dark" });
  const page = await ctx.newPage();
  await page.goto("http://localhost:4173/");
  expect(await theme(page)).toBe("dark");
  await ctx.close();
});

test("a stored choice beats the system theme", async ({ browser }) => {
  const ctx = await browser.newContext({ colorScheme: "light" });
  const page = await ctx.newPage();
  await page.addInitScript(() => localStorage.setItem("rr_theme", "dark"));
  await page.goto("http://localhost:4173/");
  expect(await theme(page)).toBe("dark");
  await ctx.close();
});

test("the toggle stores a choice that sticks across pages", async ({ browser }) => {
  const ctx = await browser.newContext({ colorScheme: "dark" });
  const page = await ctx.newPage();
  await page.goto("http://localhost:4173/");
  await page.click("#theme-toggle");
  expect(await theme(page)).toBe("light");
  await page.goto("http://localhost:4173/guides/");
  expect(await theme(page)).toBe("light");
  await ctx.close();
});

test("a system change applies only while nothing is stored", async ({ browser }) => {
  const ctx = await browser.newContext({ colorScheme: "dark" });
  const page = await ctx.newPage();
  await page.goto("http://localhost:4173/");
  await page.emulateMedia({ colorScheme: "light" });
  await expect.poll(() => theme(page)).toBe("light");
  await page.click("#theme-toggle"); // now stored: dark
  await page.emulateMedia({ colorScheme: "light" });
  expect(await theme(page)).toBe("dark");
  await ctx.close();
});

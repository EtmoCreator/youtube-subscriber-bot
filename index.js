=const { chromium } = require("playwright");
require("dotenv").config();

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox"
    ]
  });

  const context = await browser.newContext({
    proxy: process.env.PROXY
      ? { server: process.env.PROXY }
      : undefined,
  });

  const page = await context.newPage();

  console.log("[INFO] Navigating to YouTube...");
  await page.goto("https://www.youtube.com", {
    waitUntil: "domcontentloaded"
  });

  console.log("[INFO] Searching video...");

  await page.fill("input[name='search_query']", "lofi hip hop radio");
  await page.keyboard.press("Enter");

  await page.waitForTimeout(4000);

  console.log("[INFO] Clicking first result...");

  await page.click("ytd-video-renderer a#thumbnail", {
    timeout: 10000
  });

  console.log("[INFO] Video playing...");

  await page.waitForTimeout(15000);

  await browser.close();
})();

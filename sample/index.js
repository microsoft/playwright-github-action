//@ts-check
const playwright = require("playwright");

const headless = !process.env.HEADFUL;

async function run(browserType) {
  const browser = await playwright[browserType].launch({ headless });
  const page = await browser.newPage();
  await page.goto('http://example.com');
  console.log(browserType, await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    clientHeight: document.documentElement.clientHeight
  })));
  await browser.close();
}

(async () => {
  await run('chromium');
  await run('webkit');
  await run('firefox');
})();

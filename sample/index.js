//@ts-check
const playwright = require("playwright");

const headless = !process.env.HEADFUL;

async function run(browserType) {
  try {
    const browser = await playwright[browserType].launch({ headless });
    const page = await browser.newPage();
    console.log(browserType, await page.evaluate(() => ({
      width: document.documentElement.clientWidth,
      clientHeight: document.documentElement.clientHeight
    })));
    await browser.close();
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  }
}

(async () => {
  await run('chromium');
  await run('webkit');
  await run('firefox');
})();

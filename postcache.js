const os = require("os");
const path = require("path");
const cache = require("@actions/cache");

async function run() {
  let cachePath = "";
  if (os.platform() === "linux") cachePath = path.join(os.homedir(), ".cache", "ms-playwright");
  else if (os.platform() === "darwin") cachePath = path.join(os.homedir(), "Library", "Caches", "ms-playwright");
  else if (os.platform() === "win32") cachePath = path.join(os.homedir(), "AppData", "Local", "ms-playwright");
  await cache.saveCache([cachePath], `playwright-${os.version()}-${new Date().getTime()}`);
}

run();

const core = require('@actions/core');
const { exec } = require('@actions/exec');
const os = require('os');
const util = require('util');
const fs = require('fs');

const readFileAsync = util.promisify(fs.readFile.bind(fs));

const DEPENDENCIES = {
  'ubuntu18.04': {
    chromium: [
      'libglib2.0-0',
      'libnss3',
      'libnspr4',
      'libatk1.0-0',
      'libatk-bridge2.0-0',
      'libx11-6',
      'libx11-xcb1',
      'libxcb1',
      'libxcb-dri3-0',
      'libxcomposite1',
      'libxdamage1',
      'libxext6',
      'libxfixes3',
      'libxi6',
      'libxtst6',
      'libcups2',
      'libdbus-1-3',
      'libdrm2',
      'libxrandr2',
      'libgbm1',
      'libasound2',
      'libpangocairo-1.0-0',
      'libpango-1.0-0',
      'libcairo2',
      'libatspi2.0-0',
      'libgtk-3-0',
      'libgdk-pixbuf2.0-0',
    ],
    firefox: [
      'libgtk-3-0',
      'libpangocairo-1.0-0',
      'libpango-1.0-0',
      'libatk1.0-0',
      'libcairo-gobject2',
      'libcairo2',
      'libgdk-pixbuf2.0-0',
      'libglib2.0-0',
      'libx11-6',
      'libx11-xcb1',
      'libxcb1',
      'libxcomposite1',
      'libxcursor1',
      'libxdamage1',
      'libxext6',
      'libxfixes3',
      'libxi6',
      'libxrender1',
      'libfreetype6',
      'libfontconfig1',
      'libdbus-glib-1-2',
      'libdbus-1-3',
      'libxcb-shm0',
      'libpangoft2-1.0-0',
      'libxt6',
    ],
    webkit: [
      // libgles2 is needed for Playwright v1.2.1, but not needed anymore for v1.3.0
      'libgles2',
      'libglib2.0-0',
      'libgstreamer1.0-0',
      'libcairo2',
      'libgtk-3-0',
      'libxml2',
      'libbrotli1',
      'libgl1',
      'libegl1',
      'libnotify4',
      'libgdk-pixbuf2.0-0',
      'libopus0',
      'libicu60',
      'libxslt1.1',
      'libwoff1',
      'libfontconfig1',
      'libfreetype6',
      'libharfbuzz0b',
      'libharfbuzz-icu0',
      'libgstreamer-plugins-base1.0-0',
      'libgstreamer-gl1.0-0',
      'libgstreamer-plugins-bad1.0-0',
      'libjpeg-turbo8',
      'libpng16-16',
      'libopenjp2-7',
      'libvpx5',
      'libwebpdemux2',
      'libwebp6',
      'libenchant1c2a',
      'libsecret-1-0',
      'libhyphen0',
      'libx11-6',
      'libxcomposite1',
      'libxdamage1',
      'libwayland-server0',
      'libwayland-egl1',
      'libwayland-client0',
      'libpango-1.0-0',
      'libatk1.0-0',
      'libxkbcommon0',
      'libepoxy0',
      'libatk-bridge2.0-0',
    ],
  },

  'ubuntu20.04': {
    chromium: [
      'libglib2.0-0',
      'libnss3',
      'libnspr4',
      'libatk1.0-0',
      'libatk-bridge2.0-0',
      'libx11-6',
      'libx11-xcb1',
      'libxcb1',
      'libxcb-dri3-0',
      'libxcomposite1',
      'libxdamage1',
      'libxext6',
      'libxfixes3',
      'libxi6',
      'libxtst6',
      'libcups2',
      'libdbus-1-3',
      'libdrm2',
      'libxrandr2',
      'libgbm1',
      'libpangocairo-1.0-0',
      'libpango-1.0-0',
      'libcairo2',
      'libatspi2.0-0',
      'libgtk-3-0',
      'libgdk-pixbuf2.0-0',
    ],
    firefox: [
      'libgtk-3-0',
      'libpangocairo-1.0-0',
      'libpango-1.0-0',
      'libatk1.0-0',
      'libcairo-gobject2',
      'libcairo2',
      'libgdk-pixbuf2.0-0',
      'libglib2.0-0',
      'libx11-6',
      'libx11-xcb1',
      'libxcb1',
      'libxcomposite1',
      'libxcursor1',
      'libxdamage1',
      'libxext6',
      'libxfixes3',
      'libxi6',
      'libxrender1',
      'libfreetype6',
      'libfontconfig1',
      'libdbus-glib-1-2',
      'libdbus-1-3',
      'libxcb-shm0',
      'libpangoft2-1.0-0',
      'libxt6',
    ],
    webkit: [
      'libglib2.0-0',
      'libgstreamer1.0-0',
      'libsoup2.4-1',
      'libcairo2',
      'libgtk-3-0',
      'libgl1',
      'libegl1',
      'libnotify4',
      'libgdk-pixbuf2.0-0',
      'libvpx6',
      'libopus0',
      'libxml2',
      'libicu66',
      'libxslt1.1',
      'libwoff1',
      'libfontconfig1',
      'libfreetype6',
      'libharfbuzz0b',
      'libharfbuzz-icu0',
      'libgstreamer-plugins-base1.0-0',
      'libgstreamer-gl1.0-0',
      'libgstreamer-plugins-bad1.0-0',
      'libjpeg-turbo8',
      'libpng16-16',
      'libopenjp2-7',
      'libwebpdemux2',
      'libwebp6',
      'libenchant1c2a',
      'libsecret-1-0',
      'libhyphen0',
      'libx11-6',
      'libxcomposite1',
      'libxdamage1',
      'libwayland-server0',
      'libwayland-egl1',
      'libwayland-client0',
      'libpango-1.0-0',
      'libatk1.0-0',
      'libxkbcommon0',
      'libepoxy0',
      'libatk-bridge2.0-0',
    ],
  },
};

async function run() {
  try {
    if (os.platform() === 'linux') {
      await exec('sudo', ['apt-get', 'update']);
      const ubuntuVersion = await getUbuntuVersion();
      let deps = [];
      if (ubuntuVersion === '18.04')
        deps = DEPENDENCIES['ubuntu18.04'];
      else if (ubuntuVersion === '20.04')
        deps = DEPENDENCIES['ubuntu20.04'];
      else
        throw new Error('Cannot install dependencies for this linux distribution!');
      await exec('sudo', ['apt-get', 'install', '--no-install-recommends',
        ...deps.chromium,
        ...deps.firefox,
        ...deps.webkit
      ]);
      // For video playback in Firefox
      await exec('sudo', ['apt-get', 'install', 'ffmpeg']);
      // For headful execution
      await exec('sudo', ['apt-get', 'install', 'xvfb'])
    }
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

async function getUbuntuVersion() {
  if (os.platform() !== 'linux')
    return '';
  const osReleaseText = await readFileAsync('/etc/os-release', 'utf8').catch(e => '');
  if (!osReleaseText)
    return '';

  const fields = new Map();
  for (const line of osReleaseText.split('\n')) {
    const tokens = line.split('=');
    const name = tokens.shift();
    let value = tokens.join('=').trim();
    if (value.startsWith('"') && value.endsWith('"'))
      value = value.substring(1, value.length - 1);
    if (!name)
      continue;
    fields.set(name.toLowerCase(), value);
  }
  if (!fields.get('name') || fields.get('name').toLowerCase() !== 'ubuntu')
    return '';
  return fields.get('version_id') || '';
}

run()

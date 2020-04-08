const core = require('@actions/core');
const { exec } = require('@actions/exec');
const os = require('os');

async function run() {
  try {
    if (os.platform() === 'linux') {
      exec('sudo', ['apt-get', 'update']);
      // For Chromium
      exec('sudo', ['apt-get', 'install', 'libgbm-dev']);
      // For WebKit
      exec('sudo', ['apt-get', 'install', 'libwoff1', 
                                          'libopus0',
                                          'libwebp6',
                                          'libwebpdemux2',
                                          'libenchant1c2a',
                                          'libgudev-1.0-0',
                                          'libsecret-1-0',
                                          'libhyphen0',
                                          'libgdk-pixbuf2.0-0',
                                          'libegl1',
                                          'libgles2',
                                          'libevent-2.1-6',
                                          'libnotify4',
                                          'libxslt1.1']);
    }
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()

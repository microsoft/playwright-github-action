// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
const os = require('os');
const path = require('path');

export const browserPaths = (() => {
  const suffix = 'ms-playwright';  
  if (os.platform() === 'linux') {
    return path.join(os.homedir(), '.cache', suffix);
  }
  if (os.platform() === 'darwin') {
    return path.join(os.homedir(), 'Libray', 'Caches', suffix);
  }
  if (os.platform() === 'win32') {
    return path.join(os.homedir(), 'AppData', 'Local', suffix);
  }
  throw new Error('Unsupported platfor:', os.platform());
})();
export const toolName = 'ms-playwright-browsers';

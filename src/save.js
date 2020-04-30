// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
const tc = require('@actions/tool-cache');
const { browserPaths, toolName } = require('./browserPaths');

const cachedPath = await tc.cacheDir(browserPaths, toolName, 'version');
console.log('Cached path:', cachedPath);

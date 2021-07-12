# Playwright GitHub Action

 ![ubuntu](https://github.com/microsoft/playwright-github-action/workflows/ubuntu/badge.svg) ![windows](https://github.com/microsoft/playwright-github-action/workflows/windows/badge.svg) ![macos](https://github.com/microsoft/playwright-github-action/workflows/macos/badge.svg)

Set up GitHub Actions to run cross-browser tests on Chromium, WebKit and Firefox with [Playwright](https://github.com/microsoft/playwright).

## ⚠️ **You don't need this GitHub Action** ⚠️

**We recommend using Playwright CLI instead of this action**. 

Since v1.8.0 Playwright [includes CLI](https://playwright.dev/docs/next/cli#install-system-dependencies) that installs all required browser dependencies. To install dependencies with CLI:

```sh
$ npx playwright install-deps # install dependencies for all browsers
$ npx playwright install-deps chromium # install dependencies for Chromium only
```

If something doesn't work, please [let us know](https://github.com/microsoft/playwright/issues/new)! 


## Usage

Add `uses: microsoft/playwright-github-action@v1` to the GitHub workflow definition before running your tests.

```yml
on:
  push:
    branches:
    - main

jobs:
  e2e-tests:
    runs-on: ubuntu-latest # or macos-latest, windows-latest

    steps:
      - uses: actions/checkout@v2

      - uses: actions/setup-node@v1

      - uses: microsoft/playwright-github-action@v1

      - name: Install dependencies and run tests
        run: npm install && npm test
```

### Upload artifacts

This GitHub Action can be combined with the [Upload Artifact action](https://github.com/actions/upload-artifact) to upload test artifacts (like screenshots or logs).

```yml
steps:
- uses: microsoft/playwright-github-action@v1

- name: Install dependencies and run tests
  run: npm install && npm test

- uses: actions/upload-artifact@v2
  if: ${{ always() }}
  with:
    name: test-artifacts
    path: path/to/artifacts
```

### Run in headful mode

This GitHub Action can also execute tests in headful mode. To do this, use `xvfb-run` on a Linux agent.

```sh
# Windows/macOS
$ npm test

# Linux
$ xvfb-run --auto-servernum -- npm test
```

## Resources

* [Get started with Playwright](https://github.com/microsoft/playwright)
* [Playwright API reference](https://playwright.dev/docs/api/class-playwright/)
* [Development docs](DEVELOPMENT.md)

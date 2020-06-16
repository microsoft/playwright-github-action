# Playwright GitHub Action

 ![ubuntu](https://github.com/microsoft/playwright-github-action/workflows/ubuntu/badge.svg) ![windows](https://github.com/microsoft/playwright-github-action/workflows/windows/badge.svg) ![macos](https://github.com/microsoft/playwright-github-action/workflows/macos/badge.svg)

Set up GitHub Actions to run cross-browser tests on Chromium, WebKit and Firefox with [Playwright](https://github.com/microsoft/playwright).

## Usage

Add `uses: microsoft/playwright-github-action@v1` to the GitHub workflow definition before running your tests.

```yml
on:
  push:
    branches:
    - master

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
$ xfvb-run --auto-servernum -- npm test
```

## Resources

* [Get started with Playwright](https://github.com/microsoft/playwright)
* [Playwright API reference](https://github.com/microsoft/playwright/blob/master/docs/api.md)
* [Development docs](DEVELOPMENT.md)

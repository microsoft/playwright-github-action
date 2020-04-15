# Playwright GitHub Action

 ![ubuntu](https://github.com/microsoft/playwright-github-action/workflows/ubuntu/badge.svg) ![windows](https://github.com/microsoft/playwright-github-action/workflows/windows/badge.svg) ![macos](https://github.com/microsoft/playwright-github-action/workflows/macos/badge.svg)

Set up GitHub Actions to run cross-browser tests on Chromium, WebKit and Firefox with [Playwright](https://github.com/microsoft/playwright).

## Usage

Add `uses: microsoft/playwright-github-action@v1` to the GitHub workflow definition before running your tests.

```yml
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

## Resources

* [Get started with Playwright](https://github.com/microsoft/playwright)
* [Playwright API reference](https://github.com/microsoft/playwright/blob/master/docs/api.md)
* [Development docs](DEVELOPMENT.md)

# Playwright GitHub Action

 ![ubuntu](https://github.com/microsoft/playwright-github-action/workflows/ubuntu/badge.svg) ![windows](https://github.com/microsoft/playwright-github-action/workflows/windows/badge.svg) ![macos](https://github.com/microsoft/playwright-github-action/workflows/macos/badge.svg)

Set up GitHub Actions to run cross-browser tests on Chromium, WebKit and Firefox with [Playwright](https://github.com/microsoft/playwright).

## ❌ You don't need this GitHub Action

**We recommend using the Playwright CLI instead of this GitHub Action**.

One of the reasons for deprecating the GitHub Actions is that it doesn't know which version of Playwright is installed,
which then requires installing many more dependencies to ensure support.

We highly discourage the use of the GitHub Action. See next section for using the CLI.

## ✅ Use the Playwright CLI

Starting with Playwright v1.8.0 it [includes a CLI](https://playwright.dev/docs/next/cli#install-system-dependencies) that installs all required browser dependencies.

### To install dependencies with a CLI:

```sh
$ npx playwright install-deps # install dependencies for all browsers
$ npx playwright install-deps chromium # install dependencies for Chromium only
```

### Playwright CLI with GitHub Actions CI

Following is an example usage of the Playwright CLI with a GitHub Actions workflow file.
It shows a `tests_e2e` job which includes steps in which the Playwright CLI invokes the
installation of required dependencies (headless browsers, etc) and then invokes the
actual npm run script `npm run test:e2e` for the Playwright test runner:

```yaml
jobs:
  tests_e2e:
    name: Run end-to-end tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - name: install dependencies
        run: npm ci
      - name: install playwright browsers
        run: npx playwright install --with-deps
      - name: npm run test:e2e
        run: npm run test:e2e
```

If something doesn't work, please [let us know](https://github.com/microsoft/playwright/issues/new)! 


<details>
 <summary>
  ⚠️ GitHub Action Usage (deprecated)
 </summary>

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

</details>
 
 
## Resources

* [Get started with Playwright](https://github.com/microsoft/playwright)
* [Playwright API reference](https://playwright.dev/docs/api/class-playwright/)
* [Development docs](DEVELOPMENT.md)

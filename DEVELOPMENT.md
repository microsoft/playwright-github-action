# Development

The GitHub Action was bootstrapped with the [actions/javascript-action](https://github.com/actions/javascript-action) template.

## Packaging

The GitHub Action relies on `dist/index.js` as the entrypoint. This entrypoint needs to be committed after every change. Use the following command to package the code into `dist/index.js`.

```
npm run package
```

## Releases

1. Create a new release draft with text `Support for Playwright v1.XX` (put a proper PW version)
1. Draft a new release on GitHub using the semver tag.
1. Update the sliding tag (`v1`) to point to the new release. Note that existing users relying on the `v1` will get auto-updated.
    ```bash
    # example: move the v1 to point to v1.4.4
    git tag -f v1 v1.4.4
    git push -f upstream v1
    ```

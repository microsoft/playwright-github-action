# Development

The GitHub Action was bootstrapped with the [actions/javascript-action](https://github.com/actions/javascript-action) template.

## Packaging

The GitHub Action relies on `dist/index.js` as the entrypoint. This entrypoint needs to be committed after every change. Use the following command to package the code into `dist/index.js`.

```
npm run package
```

## Releases

1. Draft a new release on GitHub.
1. Update the sliding tag (`v1`) to point to the new release commit. Note that existing users relying on the `v1` will get auto-updated.

### Updating sliding tag

Follow these steps to move the `v1` to a new commit `1e2d565`.

```
git tag -d v1
git push upstream :v1
git tag v1 1e2d565
git push upstream v1
```

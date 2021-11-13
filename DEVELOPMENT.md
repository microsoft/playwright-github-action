# Development

The GitHub Action was bootstrapped with the [actions/javascript-action](https://github.com/actions/javascript-action) template.

## Packaging

The GitHub Action relies on `dist/index.js` as the entrypoint. This entrypoint needs to be committed after every change. Use the following command to package the code into `dist/index.js`.

```
npm run package
```

## Releases

1. Create a semver tag pointing to the commit you want to release. E.g. to create `v1.4.4` from tip-of-tree:
```
git checkout main
git pull upstream main
git tag v1.4.4
git push upstream v1.4.4
```
1. Create Playwrgight PR with updated reference to the GitHub action (change `playwright-github-action@v1` to the newly created version `playwright-github-action@v1.4.4`) and make sure the tests are passing. Do not commit the change.
1. Draft a new release on GitHub using the semver tag.
1. Update the sliding tag (`v1`) to point to the new release commit. Note that existing users relying on the `v1` will get auto-updated.

### Updating sliding tag

Follow these steps to move the `v1` to a new version `v1.4.4`.

```
git tag -f v1 v1.4.4
git push -f upstream v1
```

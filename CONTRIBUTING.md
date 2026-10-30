# Contributing

The development source is maintained in GitLab. GitHub `main` and release tags
are synchronized by a push mirror. Please open issues or pull requests here;
maintainers apply accepted changes to the GitLab source. Direct writes to the
GitHub mirror branch can interrupt synchronization.

## Local checks

```sh
npm ci
npm test
npm run lint
```

Tests use mocked HTTP responses and TypeScript contract fixtures. They do not
need production tokens. Never add access tokens, `.env` files or user data to
source, examples or Git history.

API-token writes and user-JWT management operations have separate credentials.
Use project and channel slugs, millisecond timestamps and current event fields.
See the README for pipeline and action examples.

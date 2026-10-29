# Testing the Tracklytic SDK

Run `npm ci`, then `npm test` and `npm run lint`.

`npm test` builds the package, verifies public TypeScript contracts (including rejected legacy event icons and boolean insight values), and runs mocked HTTP tests. No real project or credentials are required.

The tests cover millisecond timestamps without option mutation, badges and nested tags, pipeline IDs and step updates, API-token versus user-JWT authentication, escaped paths and query filters, forms and confirmations, profiles and avatars, insight mutations, empty responses, non-JSON HTTP errors and disabled writes.

`test.js` is an older manual integration example. It is not part of the automatic suite. Running it sends real events, insights and profiles after you supply credentials; use a dedicated test project. Prefer server-side environment variables and never commit credentials.

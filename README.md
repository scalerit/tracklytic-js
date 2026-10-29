# Tracklytic JavaScript / TypeScript SDK

A typed client for the current Tracklytic v1 API. Supports events, interactive actions, pipelines, profiles and insights.

```sh
npm install tracklytic@^2.0.0
```

```ts
import Tracklytic from 'tracklytic';

const tracklytic = new Tracklytic({
  token: process.env.TRACKLYTIC_TOKEN!,
  project: 'my-project',
});

await tracklytic.track({
  channel: 'deployments',
  event: 'Release deployed',
  userId: 'user-123',
  badge: { title: 'Production', color: 'success' },
  logLevel: 'info',
  tags: { version: '2.4.0', checks: { passed: true } },
  timestamp: new Date(),
});
```

`project` is the project slug; `channel` is the channel slug. Event icons have been replaced by `badge` (`title`, `color`). Badge colors are `primary`, `success`, `danger`, `alert`, `info`, `neutral`. Severity (`logLevel`) is `info`, `warning`, `failed`, `critical`. Omit `notify` to use the API default: false for info/warning, true for failed/critical. Explicit booleans override that default.

`timestamp` is a `Date` or Unix **milliseconds**, including `0`. Numbers are never inferred as seconds. Tags and profile properties support nested JSON objects, arrays, booleans, numbers and null. The SDK does not mutate the supplied options.

## Pipelines

```ts
const pipeline = await tracklytic.pipeline.create({
  channel: 'deployments',
  event: 'Production release',
  steps: [
    { id: 'build', name: 'Build', stage: 'prepare', status: 'running' },
    { id: 'deploy', name: 'Deploy', stage: 'release', requires: ['build'] },
  ],
  pipeline: {
    timeout: 1800,
    timeoutAlert: { logLevel: 'failed', notify: true },
  },
});

if (pipeline) {
  await tracklytic.pipeline.update(pipeline.id, {
    id: 'build',
    status: 'success',
    message: 'Build completed',
  });
  await tracklytic.pipeline.update(pipeline.id, {
    id: 'deploy',
    status: 'running',
  });
}
```

`stage` groups the presentation. Only explicit `requires` edges control readiness. Ready steps do not execute external jobs automatically. Step statuses: `waiting`, `running`, `success`, `failed`, `skipped`, `cancelled`. A pipeline accepts 1–200 unique steps. `required` and `allowFailure` control completion and dependencies. Pipeline timeout is in **seconds**.

`pipeline.update(eventId, { id, status?, steps?, message? })` uses the API token and `POST /v1/event/:eventId/step`; at least `status` or `steps` is required. `steps` adds downstream steps using the API's graph rules. `pipeline.updateAsUser` uses the user JWT and `PATCH` on that path.

`track()` retains its `Promise<boolean>` return value. Use `createEvent()` to obtain the actual API response: `{}` for ordinary events, `{ id, status, pipeline }` for pipeline events. `pipeline.create()` exposes the pipeline response directly.

## Interactive actions

```ts
await tracklytic.track({
  channel: 'deployments',
  event: 'Approval required',
  actions: [
    {
      type: 'form',
      confirmation: 'Deploy this release?',
      maxRuns: 1,
      allowRetryOnFailure: true,
      stopOnFailure: true,
      properties: {
        buttonText: 'Deploy',
        fields: [
          {
            name: 'environment',
            type: 'select',
            label: 'Environment',
            required: true,
            options: [{ label: 'Production', value: 'production' }],
          },
        ],
      },
      action: [
        {
          type: 'webhook',
          properties: {
            url: 'https://example.com/deploy',
            method: 'POST',
            bodyType: 'json',
            body: { environment: '{{inputs.environment}}' },
            timeout: 10000,
            expects: { code: [200, 202] },
          },
        },
      ],
    },
    {
      type: 'link',
      properties: { buttonText: 'View release', url: 'https://example.com/releases/2.4.0' },
    },
  ],
});
```

Components support `button`, `form`, `custom`, `link`; link components have a URL and no `action` list. Executions support `webhook`, `url`, `notification`. Form types include text/input, date/time/hour, select and number, with validation options. `expiresAt` is an ISO date string. Webhook timeout is in **milliseconds**. Steps can use the same action definitions.

## Profiles and insights

```ts
await tracklytic.identify({
  userId: 'user-123',
  properties: { name: 'Alex', plan: 'pro', preferences: { language: 'de' } },
  avatar: 'https://example.com/avatar.jpg',
});

await tracklytic.insight.track({ title: 'Deployments', value: 42 });
await tracklytic.insight.increment({ title: 'Deployments', value: 1, notify: false });
await tracklytic.insight.mutate({ title: 'Deployments', value: { $inc: -1 } });
```

`avatar` accepts a public HTTPS URL, supported Base64 image, or `null` to remove it. Insight values are strings or numbers, not booleans. Legacy insight `icon` remains optional because the API still accepts it; event icons are removed.

## Reads, management and action execution

These routes require a **user access JWT**, separately from the project API token:

```ts
const admin = new Tracklytic({
  token: process.env.TRACKLYTIC_TOKEN!,
  accessToken: userAccessToken,
  project: 'my-project',
});

const events = await admin.events.list({ status: ['running', 'failed'], page: 1, limit: 20 });
const event = await admin.events.get('event-id');
await admin.events.update(event.id, { badge: null, notify: false });
await admin.events.addLog(event.id, { type: 'manual', message: 'Reviewed' });
await admin.events.executeAction(event.id, 0, { inputs: { environment: 'production' }, confirmed: true });
await admin.pipeline.executeAction('pipeline-id', 'approval', 0, { confirmed: true });

await admin.profiles.list({ page: 1 });
await admin.profiles.get('user-123');
await admin.insight.list({ title: 'Deployments' });
await admin.insight.get('Deployments');
```

`events.delete(id)`, `profiles.delete(userId)` and `insight.delete(title)` invoke the corresponding deletion endpoints. Action indices start at zero. Pipeline events use `pipeline.executeAction`, ordinary events use `events.executeAction`. Lists return `{ results, page, limit, totalPages, totalResults }`.

Keep write credentials server-side for untrusted clients. A secret placed in a browser bundle is public. User tokens must come from the signed-in user's session and must not be hardcoded.

## Configuration and errors

`ClientOptions` supports `baseUrl`, `request` (a fetch-compatible function), `disableTracking`, `token`, `project`, and optional `accessToken`. The default API origin is `https://api.tracklytic.de`; do not append `/v1` to `baseUrl`.

`disableTracking()` suppresses **all writes**, including action execution and deletion; reads still run. `enableTracking()` resumes writes. Boolean write methods return `true` when disabled, `createEvent()` returns `{}`, and methods returning created/updated entities return `undefined`. A disabled pipeline does not produce a usable event ID.

Non-success HTTP responses throw `HTTPResponseError` with `status`, `statusText`, `message`, and `toJSON()`. Non-JSON error pages retain the original HTTP status. Network errors propagate unchanged. The SDK never retries side-effecting requests automatically.

## Migration from older SDK versions

- Use canonical `userId` (and `groupId` in the legacy type declaration), not snake_case identifiers.
- Replace event `icon` with `badge`; untyped legacy event icons are omitted on the wire.
- Send numeric timestamps in milliseconds, not seconds.
- Use string/number insight values, not booleans.
- `track()` still returns a boolean; use `pipeline.create()` or `createEvent()` to retain IDs.
- No group endpoint exists in the current API; the SDK does not invent one.

## Development

```sh
npm ci
npm test
npm run lint
```

Tests mock HTTP requests and never contact a real Tracklytic project. The legacy `test.js` script is a manual example and requires explicit credentials before use.

[API reference](https://docs.tracklytic.de/api/introduction/)

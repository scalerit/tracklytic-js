import Tracklytic, { ActionComponent, PipelineOptions, TrackOptions, InsightTrackOptions } from '../src';
const options: PipelineOptions = {
  channel: 'ci', event: 'Release', badge: { title: 'Production', color: 'success' }, logLevel: 'warning',
  tags: { camelCase: { nested: [true, null] } },
  steps: [{ id: 'build', name: 'Build', stage: 'build', requires: [], actions: [{ type: 'link', properties: { url: 'https://example.com' } }] }]
};
const client = new Tracklytic({ token: 'api', project: 'project', accessToken: 'jwt', baseUrl: 'https://example.com' });
void client.pipeline.create(options);
void client.pipeline.update('id', { id: 'build', status: 'success' });
void client.events.list({ status: ['running', 'failed'], deleted: [true, false] });
void client.identify({ userId: 'user', properties: { nested: { value: null } }, avatar: null });
// @ts-expect-error event icons were replaced by badges
const oldIcon: TrackOptions = { channel: 'ci', event: 'Build', icon: 'legacy' };
// @ts-expect-error the API accepts string/number insight values only
const booleanInsight: InsightTrackOptions = { title: 'Builds', value: true };
// @ts-expect-error link components cannot execute server actions
const invalidLink: ActionComponent = { type: 'link', properties: { url: 'https://example.com' }, action: [] };
// @ts-expect-error step updates require a status or follow-up steps
void client.pipeline.update('id', { id: 'build' });
void oldIcon;
void booleanInsight;
void invalidLink;

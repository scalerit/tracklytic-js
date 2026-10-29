import { HTTPResponseError } from './error';
import {
  ClientOptions, TrackOptions, IdentifyOptions, InsightTrackOptions,
  InsightIncrementOptions, InsightMutateOptions, CreateEventResponse,
  PipelineOptions, PipelineResponse, PipelineUpdateOptions, EventRecord,
  EventQuery, Paginated, UpdateEventOptions, EventLog, ExecuteActionOptions,
  ActionExecutionResponse, ProfileQuery, UserProfile, InsightQuery, InsightRecord
} from '../types';
import { toUnixTimestamp } from '../utils/date';

/** API-token writes and optional authenticated user operations. */
export default class Tracklytic {
  private readonly token: string;
  private readonly project: string;
  private readonly accessToken?: string;
  private readonly baseUrl: string;
  private readonly request: typeof fetch;
  private disabled: boolean;

  constructor(options: ClientOptions) {
    this.token = options.token;
    this.project = options.project;
    this.accessToken = options.accessToken;
    this.baseUrl = (options.baseUrl || 'https://api.tracklytic.de').replace(/\/+$/, '');
    this.request = options.request || ((...args) => fetch(...args));
    this.disabled = options.disableTracking || false;
  }

  disableTracking(): void { this.disabled = true; }
  enableTracking(): void { this.disabled = false; }
  getProject(): string { return this.project; }

  private path(id: string): string { return encodeURIComponent(id); }
  private query(values: object): string {
    const params = new URLSearchParams();
    Object.entries({ ...values, project: this.project }).forEach(([key, value]) => {
      if (value !== undefined) params.set(key, Array.isArray(value) ? value.join(',') : String(value));
    });
    return `?${params.toString()}`;
  }

  private async send<T>(path: string, method: string, body?: unknown, user = false): Promise<T> {
    const token = user ? this.accessToken : this.token;
    if (!token) throw new Error(user ? 'A user accessToken is required for this operation' : 'An API token is required');
    const response = await this.request(`${this.baseUrl}/v1${path}`, {
      method,
      headers: { Authorization: `Bearer ${token}`, ...(body === undefined ? {} : { 'Content-Type': 'application/json' }) },
      ...(body === undefined ? {} : { body: JSON.stringify(body) })
    });
    // Error pages from a proxy may be plain text or HTML. Preserve HTTP status.
    const text = await response.text();
    let result: unknown;
    try { result = text ? JSON.parse(text) : undefined; } catch { result = undefined; }
    if (!response.ok) throw new HTTPResponseError(response.status, response.statusText, result);
    return result as T;
  }

  /** Existing convenience method retains its boolean success contract. */
  async track(options: TrackOptions): Promise<boolean> {
    await this.createEvent(options);
    return true;
  }

  /** Returns the pipeline ID when steps are supplied, otherwise the API's empty object. */
  async createEvent(options: TrackOptions): Promise<CreateEventResponse> {
    if (this.disabled) return {};
    // Do not forward legacy event icons, even from untyped JavaScript callers.
    const { icon: ignoredIcon, ...current } = options as TrackOptions & { icon?: unknown };
    void ignoredIcon;
    return this.send('/event', 'POST', { ...current, timestamp: toUnixTimestamp(options.timestamp), project: this.project });
  }

  async identify(options: IdentifyOptions): Promise<boolean> {
    if (this.disabled) return true;
    await this.send('/identify', 'POST', { ...options, project: this.project });
    return true;
  }

  get pipeline() {
    return {
      create: async (options: PipelineOptions): Promise<PipelineResponse | undefined> => {
        if (this.disabled) return undefined;
        if (!Array.isArray(options.steps) || options.steps.length === 0) throw new TypeError('A pipeline requires at least one step');
        return await this.createEvent(options) as PipelineResponse;
      },
      update: async (eventId: string, options: PipelineUpdateOptions): Promise<EventRecord | undefined> => {
        if (this.disabled) return undefined;
        return this.send(`/event/${this.path(eventId)}/step`, 'POST', options);
      },
      updateAsUser: async (eventId: string, options: PipelineUpdateOptions): Promise<EventRecord | undefined> => {
        if (this.disabled) return undefined;
        return this.send(`/event/${this.path(eventId)}/step`, 'PATCH', options, true);
      },
      executeAction: async (eventId: string, stepId: string, actionIndex: number, options: ExecuteActionOptions = {}): Promise<ActionExecutionResponse | undefined> => {
        if (this.disabled) return undefined;
        this.checkIndex(actionIndex);
        return this.send(`/event/${this.path(eventId)}/steps/${this.path(stepId)}/actions/${actionIndex}/execute`, 'POST', options, true);
      }
    };
  }

  private checkIndex(index: number): void {
    if (!Number.isInteger(index) || index < 0) throw new TypeError('actionIndex must be a non-negative integer');
  }

  get events() {
    return {
      list: (options: EventQuery = {}): Promise<Paginated<EventRecord>> => this.send(`/event/query${this.query(options)}`, 'GET', undefined, true),
      get: (id: string): Promise<EventRecord> => this.send(`/event/${this.path(id)}`, 'GET', undefined, true),
      update: async (id: string, options: UpdateEventOptions): Promise<EventRecord | undefined> => {
        if (this.disabled) return undefined;
        return this.send(`/event/${this.path(id)}`, 'PATCH', options, true);
      },
      delete: async (id: string): Promise<void> => {
        if (!this.disabled) await this.send(`/event/${this.path(id)}`, 'DELETE', undefined, true);
      },
      addLog: async (id: string, options: EventLog): Promise<EventRecord | undefined> => {
        if (this.disabled) return undefined;
        return this.send(`/event/${this.path(id)}/logs`, 'POST', options, true);
      },
      executeAction: async (id: string, index: number, options: ExecuteActionOptions = {}): Promise<ActionExecutionResponse | undefined> => {
        if (this.disabled) return undefined;
        this.checkIndex(index);
        return this.send(`/event/${this.path(id)}/actions/${index}/execute`, 'POST', options, true);
      }
    };
  }

  get profiles() {
    return {
      list: (options: ProfileQuery = {}): Promise<Paginated<UserProfile>> => this.send(`/identify/query${this.query(options)}`, 'GET', undefined, true),
      get: (userId: string): Promise<UserProfile> => this.send(`/identify/profile${this.query({ userId })}`, 'GET', undefined, true),
      delete: async (userId: string): Promise<void> => {
        if (!this.disabled) await this.send(`/identify/query${this.query({ userId })}`, 'DELETE', undefined, true);
      }
    };
  }

  get insight() {
    return {
      track: this.insightTrack.bind(this),
      increment: this.insightIncrement.bind(this),
      mutate: this.insightMutate.bind(this),
      list: (options: InsightQuery = {}): Promise<Paginated<InsightRecord>> => this.send(`/insight/query${this.query(options)}`, 'GET', undefined, true),
      get: (title: string): Promise<InsightRecord> => this.send(`/insight/insight${this.query({ title })}`, 'GET', undefined, true),
      delete: async (title: string): Promise<void> => {
        if (!this.disabled) await this.send(`/insight/query${this.query({ title })}`, 'DELETE', undefined, true);
      }
    };
  }

  protected async insightTrack(options: InsightTrackOptions): Promise<boolean> {
    if (this.disabled) return true;
    await this.send('/insight', 'POST', { ...options, project: this.project });
    return true;
  }
  protected async insightIncrement(options: InsightIncrementOptions): Promise<boolean> {
    return this.insightMutate({ ...options, value: { $inc: options.value } });
  }
  protected async insightMutate(options: InsightMutateOptions): Promise<boolean> {
    if (this.disabled) return true;
    await this.send('/insight/mutate', 'PATCH', { ...options, project: this.project });
    return true;
  }
}

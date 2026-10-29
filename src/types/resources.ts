import { BadgeColor, EventStatus, LogLevel, TrackOptions, JSONObject } from './track';
export interface PaginationOptions { sortBy?: string; limit?: number; page?: number }
export interface Paginated<T> { results: T[]; page: number; limit: number; totalPages: number; totalResults: number }
export interface EventQuery extends PaginationOptions {
  channel?: string;
  event?: string;
  userId?: string;
  notify?: boolean | boolean[];
  status?: EventStatus | EventStatus[];
  deleted?: boolean | boolean[];
  logLevel?: LogLevel;
  badgeTitle?: string;
  badgeColor?: BadgeColor;
  search?: string;
}
export interface EventRecord extends Omit<TrackOptions, 'timestamp' | 'status'> {
  id: string;
  project: string;
  status: EventStatus;
  timestamp?: string;
  [key: string]: unknown;
}
export interface ProfileQuery extends PaginationOptions { userId?: string }
export interface UserProfile { id: string; userId: string; project: string; properties: JSONObject; avatarUrl?: string | null; [key: string]: unknown }
export interface InsightQuery extends PaginationOptions { title?: string }
export interface InsightRecord { id: string; project: string; title: string; value: string | number; notify?: boolean; [key: string]: unknown }
export interface ClientOptions {
  token: string;
  project: string;
  disableTracking?: boolean;
  /** User JWT for reads, management, and action execution; never expose in public bundles. */
  accessToken?: string;
  baseUrl?: string;
  request?: typeof fetch;
}

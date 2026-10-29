import { ActionComponent } from './action';
import { PipelineConfig, PipelineStep } from './pipeline';

export type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue };
export type JSONObject = { [key: string]: JSONValue };
export type TagKey = string;
export type Tags = JSONObject;
export type LogLevel = 'info' | 'warning' | 'failed' | 'critical';
export type BadgeColor = 'primary' | 'success' | 'danger' | 'alert' | 'info' | 'neutral';
export interface Badge { title: string; color: BadgeColor }
export type EventStatus = 'pending' | 'active' | 'completed' | 'failed' | 'cancelled' | 'waiting' | 'running' | 'success' | 'timed_out';
export interface EventLog {
  type: 'info' | 'success' | 'warning' | 'error' | 'manual';
  message: string;
  details?: JSONObject;
  actionId?: string;
  userId?: string;
}
export interface TrackOptions {
  /** Channel slug. */
  channel: string;
  event: string;
  description?: string;
  userId?: string;
  badge?: Badge;
  logLevel?: LogLevel;
  tags?: Tags;
  /** Omit to use the severity-dependent server default. */
  notify?: boolean;
  actions?: ActionComponent[];
  /** Unix milliseconds or Date; numeric values are sent unchanged. */
  timestamp?: number | Date;
  status?: 'pending' | 'active' | 'completed' | 'failed' | 'cancelled';
  logs?: EventLog[];
  steps?: PipelineStep[];
  pipeline?: PipelineConfig;
}
export interface UpdateEventOptions {
  description?: string;
  badge?: Badge | null;
  logLevel?: LogLevel;
  notify?: boolean;
  tags?: Tags;
  userId?: string;
  status?: TrackOptions['status'];
  actions?: ActionComponent[];
  logs?: EventLog[];
}

import { ActionComponent } from './action';
import { LogLevel, TrackOptions } from './track';
export type StepStatus = 'waiting' | 'running' | 'success' | 'failed' | 'skipped' | 'cancelled';
export interface PipelineStep {
  id: string;
  name: string;
  /** Presentation group; use requires for dependencies. */
  stage: string;
  description?: string;
  required?: boolean;
  allowFailure?: boolean;
  requires?: string[];
  status?: StepStatus;
  actions?: ActionComponent[];
}
export interface PipelineConfig {
  /** Timeout in seconds. */
  timeout?: number;
  timeoutAlert?: { logLevel?: LogLevel; notify?: boolean };
}
export interface PipelineOptions extends TrackOptions { steps: PipelineStep[] }
export type PipelineUpdateOptions = { id: string; message?: string } & (
  { status: StepStatus; steps?: PipelineStep[] } | { steps: PipelineStep[]; status?: StepStatus }
);
export interface PipelineState extends PipelineConfig {
  deadline?: string;
  startedAt?: string;
  finishedAt?: string;
  [key: string]: unknown;
}
export interface PipelineResponse {
  id: string;
  status: 'waiting' | 'running' | 'success' | 'failed' | 'cancelled' | 'timed_out';
  pipeline: PipelineState;
}
export type CreateEventResponse = PipelineResponse | Record<string, never>;

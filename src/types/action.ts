import { JSONObject, JSONValue } from './track';
export type ActionComponentType = 'button' | 'form' | 'custom' | 'link';
export type ActionExecutionType = 'webhook' | 'url' | 'notification';
export interface FormField {
  name: string;
  type: 'text' | 'input' | 'date' | 'time' | 'hour' | 'select' | 'number';
  label: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string | number | string[];
  format?: 'YYYY-MM-DD' | 'DD.MM.YYYY' | 'MM/DD/YYYY';
  multiple?: boolean;
  options?: { label: string; value: string }[];
  numberType?: 'int' | 'float';
  min?: number;
  max?: number;
}
export interface ActionExecution {
  type: ActionExecutionType;
  properties?: {
    url?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    headers?: Record<string, string>;
    body?: JSONValue;
    bodyType?: 'json' | 'urlencoded' | 'multipart' | 'text';
    /** Request timeout in milliseconds. */
    timeout?: number;
    expects?: { code?: number | number[]; body?: JSONValue; json?: { path: string; operator?: 'equals' | 'exists' | 'type'; value?: JSONValue }[] };
    [key: string]: unknown;
  };
}
interface ComponentBase {
  maxRuns?: number;
  allowRetryOnFailure?: boolean;
  expiresAt?: string;
  stopOnFailure?: boolean;
  confirmation?: string;
}
export type ActionComponent = ComponentBase & (
  { type: 'link'; properties: { url: string; buttonText?: string; [key: string]: unknown }; action?: never } |
  { type: 'button' | 'custom'; properties?: { buttonText?: string; [key: string]: unknown }; action: ActionExecution[] } |
  { type: 'form'; properties: { fields: FormField[]; buttonText?: string; [key: string]: unknown }; action: ActionExecution[] }
);
export interface ExecuteActionOptions { inputs?: JSONObject; confirmed?: boolean }
export interface ActionExecutionResponse {
  success: boolean;
  message?: string;
  eventStatus?: string;
  results?: unknown[];
  [key: string]: unknown;
}

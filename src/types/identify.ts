import { JSONObject } from './track';
export type Properties = JSONObject;
export interface IdentifyOptions {
  userId: string;
  properties: Properties;
  /** Public HTTPS URL, supported Base64 image, or null to remove. */
  avatar?: string | null;
}

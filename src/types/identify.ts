import { TagKey } from './track';

/** Properties Type **/
export type Properties = { [key: TagKey]: string | number | boolean };

/**
 * Options for publishing Tracklytic identify
 */
export interface IdentifyOptions {
  /**
   * User ID
   * example: "user_123"
   */
  user_id: string;

  /**
   * User properties
   * example: { name: "John Doe", email: "john@example.com", plan: "premium" }
   */
  properties: Properties;
}

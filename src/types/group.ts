import { TagKey } from './track';

/** Properties Type **/
export type Properties = { [key: TagKey]: string | number | boolean };

interface GroupWithUserOptions {
  /**
   * Group ID
   * example: "group_123"
   */
  group_id: string;

  /**
   * User ID
   * example: "user_123"
   */
  user_id: string;
}

interface GroupWithPropertiesOptions {
  /**
   * Group ID
   * example: "group_123"
   */
  group_id: string;

  /**
   * User ID
   * example: "user_123"
   */
  user_id: string | undefined;

  /**
   * Group properties
   * example: { name: "Premium Users", plan: "premium" }
   */
  properties: Properties;
}

/**
 * Options for publishing Tracklytic group
 * Note: This functionality may not be available in the current API
 */
export type GroupOptions = GroupWithUserOptions | GroupWithPropertiesOptions;

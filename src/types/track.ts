/**
 * Options for publishing Tracklytic events
 */
export interface TrackOptions {
  /**
   * Channel ID (required in Tracklytic)
   * example: "507f1f77bcf86cd799439013"
   */
  channel: string;

  /**
   * Event name
   * example: "page_view"
   */
  event: string;

  /**
   * Event description
   * example: "User viewed homepage"
   */
  description?: string;

  /**
   * User ID
   * example: "user_123"
   */
  user_id?: string;

  /**
   * Event icon (emoji)
   * must be a single emoji
   * example: "👁️"
   */
  icon?: string;

  /**
   * Event tags
   * example: { source: "web", user_type: "premium" }
   */
  tags?: Tags;

  /**
   * Send push notification
   */
  notify?: boolean;

  /**
   * Parser for description
   */
  parser?: Parser;

  /**
   * Event timestamp
   */
  timestamp?: number | Date;
}

export type TagKey = Lowercase<string>;

/** Tag Type **/
export type Tags = { [key: TagKey]: string | number | boolean };
export type Parser = 'markdown' | 'text';

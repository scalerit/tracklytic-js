interface InsightBase {
  /**
   * Insight title
   * example: "Total Users"
   */
  title: string;

  /**
   * Event icon (emoji)
   * must be a single emoji
   * example: "👥"
   */
  icon?: string;
}

/**
 * Options for publishing Tracklytic insight
 */
export interface InsightTrackOptions extends InsightBase {
  /**
   * Insight value
   * example: 1250
   */
  value: string | boolean | number;
}

export interface InsightIncrementOptions extends InsightBase {
  /**
   * Insight value
   * example: 1
   */
  value: number;
}

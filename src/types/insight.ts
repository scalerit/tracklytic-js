interface InsightBase {
  title: string;
  notify?: boolean;
  /** Legacy API field. Prefer a descriptive title. */
  icon?: string;
}
export interface InsightTrackOptions extends InsightBase { value: string | number }
export interface InsightIncrementOptions extends InsightBase { value: number }
export interface InsightMutateOptions extends InsightBase { value: { $inc: number } }

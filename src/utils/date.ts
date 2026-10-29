/** Convert Date to API Unix milliseconds without mutating caller options. */
export function toUnixTimestamp(timestamp?: number | Date): number | undefined {
  if (timestamp === undefined) return undefined;
  const value = timestamp instanceof Date ? timestamp.getTime() : timestamp;
  if (!Number.isFinite(value)) throw new TypeError('timestamp must be a finite Unix millisecond value or valid Date');
  return value;
}

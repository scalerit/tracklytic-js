/**
 * Tracklytic Base Endpoint
 */
const TRACKLYTIC_BASE = 'https://api.tracklytic.de';

export const ENDPOINTS = {
  /**
   * Tracklytic Event Endpoint
   */
  EVENT: TRACKLYTIC_BASE + '/v1/event',

  /**
   * Tracklytic Identify Endpoint
   */
  IDENTIFY: TRACKLYTIC_BASE + '/v1/identify',

  /**
   * Tracklytic Insight Endpoint
   */
  INSIGHT: TRACKLYTIC_BASE + '/v1/insight',

  /**
   * Tracklytic Insight Mutate Endpoint
   */
  INSIGHT_MUTATE: TRACKLYTIC_BASE + '/v1/insight/mutate'
};

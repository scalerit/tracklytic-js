/**
 * Fetch HTTP Response Error
 */
export class HTTPResponseError extends Error {
  public readonly message: string;
  public readonly status: number;
  public readonly statusText: string;

  constructor(status: number, statusText: string, body: unknown) {
    super(`HTTP Error Response: ${status} ${statusText}`);
    this.status = status;
    this.statusText = statusText;
    this.message = this.createReadableString(body);
  }

  /**
   * Create a readable string from the response body
   * @param body
   */
  createReadableString(body: unknown) {
    let error = '[Tracklytic] Failed to publish: ';
    
    // Handle API error responses according to the API specification
    if (body && typeof body === 'object') {
      const details = body as { code?: unknown; message?: unknown; validation?: { body?: { message: string }[] } };
      // Check for standard API error format (code + message)
      if (details.code && details.message) {
        error += String(details.message);
      }
      // Check for validation errors (legacy format)
      else if (details.validation && Array.isArray(details.validation.body)) {
        error += details.validation.body
          .map((item: { message: string }) => item.message)
          .join(', ');
      }
      // Check for direct message property
      else if (details.message) {
        error += String(details.message);
      }
      // Fallback for other error formats
      else {
        error += `HTTP ${this.status}: ${this.statusText}`;
      }
    } else {
      // Fallback when no body is provided
      error += `HTTP ${this.status}: ${this.statusText}`;
    }
    
    return error;
  }

  toString() {
    return this.message;
  }

  /**
   * Get Error Info as JSON
   */
  toJSON() {
    return {
      message: this.message,
      status: this.status,
      statusText: this.statusText
    };
  }
}

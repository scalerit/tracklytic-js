/**
 * Fetch HTTP Response Error
 */
export class HTTPResponseError extends Error {
  public readonly message: string;
  public readonly status: number;
  public readonly statusText: string;

  constructor(status: number, statusText: string, body: any | undefined) {
    super(`HTTP Error Response: ${status} ${statusText}`);
    this.status = status;
    this.statusText = statusText;
    this.message = this.createReadableString(body);
  }

  /**
   * Create a readable string from the response body
   * @param body
   */
  createReadableString(body: any) {
    let error = '[Tracklytic] Failed to publish: ';
    
    // Handle API error responses according to the API specification
    if (body && typeof body === 'object') {
      // Check for standard API error format (code + message)
      if (body.code && body.message) {
        error += body.message;
      }
      // Check for validation errors (legacy format)
      else if (body.validation && Array.isArray(body.validation.body)) {
        error += body.validation.body
          .map((item: { message: string }) => item.message)
          .join(', ');
      }
      // Check for direct message property
      else if (body.message) {
        error += body.message;
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

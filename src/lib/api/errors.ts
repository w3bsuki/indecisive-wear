/**
 * API Error Management
 * 
 * Consolidates error handling patterns from across the codebase
 */

import { HTTP_STATUS, API_MESSAGES } from '@/lib/constants/api';
import type { ApiError as ApiErrorType } from './types';

export class ApiError extends Error implements ApiErrorType {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: Record<string, unknown>;
  public readonly timestamp: string;
  public readonly traceId?: string;
  public readonly retryable: boolean;
  public readonly isRetryable: boolean;
  public readonly isRetryableStatus: (statusCode: number) => boolean;

  constructor(
    message: string,
    statusCode: number,
    code?: string,
    details?: Record<string, unknown>,
    traceId?: string
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code || `HTTP_${statusCode}`;
    this.details = details;
    this.timestamp = new Date().toISOString();
    this.traceId = traceId;
    this.isRetryableStatus = this.isRetryableStatusMethod.bind(this);
    this.retryable = this.isRetryableStatus(statusCode);
    this.isRetryable = this.retryable;

    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  public isRetryableStatusMethod(statusCode: number): boolean {
    // Retryable status codes
    const retryableStatuses = [
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      429, // Rate limit
      502, // Bad gateway
      503, // Service unavailable
      504, // Gateway timeout
    ];
    
    return retryableStatuses.includes(statusCode);
  }

  public toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      code: this.code,
      details: this.details,
      timestamp: this.timestamp,
      traceId: this.traceId,
      retryable: this.retryable,
    };
  }
}

/**
 * Creates an ApiError from a Response object
 */
export async function createApiError(
  response: Response,
  traceId?: string
): Promise<ApiError> {
  let message: string = API_MESSAGES.INTERNAL_ERROR;
  let details: Record<string, unknown> | undefined;

  try {
    const responseText = await response.text();
    if (responseText) {
      try {
        const parsedResponse = JSON.parse(responseText);
        message = parsedResponse.message || parsedResponse.error || message;
        details = parsedResponse.details || parsedResponse;
      } catch {
        // If JSON parsing fails, use the raw text as message
        message = responseText;
      }
    }
  } catch {
    // If reading response fails, use default message
  }

  // Map status codes to user-friendly messages
  const statusMessage = getStatusMessage(response.status);
  if (statusMessage && !message.includes(statusMessage)) {
    message = statusMessage;
  }

  return new ApiError(
    message,
    response.status,
    `HTTP_${response.status}`,
    details,
    traceId
  );
}

/**
 * Gets user-friendly message for HTTP status codes
 */
function getStatusMessage(statusCode: number): string {
  switch (statusCode) {
    case HTTP_STATUS.BAD_REQUEST:
      return API_MESSAGES.VALIDATION_ERROR;
    case HTTP_STATUS.UNAUTHORIZED:
      return API_MESSAGES.UNAUTHORIZED;
    case HTTP_STATUS.FORBIDDEN:
      return API_MESSAGES.FORBIDDEN;
    case HTTP_STATUS.NOT_FOUND:
      return API_MESSAGES.NOT_FOUND;
    case HTTP_STATUS.CONFLICT:
      return 'This request conflicts with existing data';
    case HTTP_STATUS.UNPROCESSABLE_ENTITY:
      return API_MESSAGES.VALIDATION_ERROR;
    case 429:
      return API_MESSAGES.RATE_LIMIT_EXCEEDED;
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      return API_MESSAGES.INTERNAL_ERROR;
    case HTTP_STATUS.SERVICE_UNAVAILABLE:
      return API_MESSAGES.SERVICE_UNAVAILABLE;
    default:
      return `Request failed with status ${statusCode}`;
  }
}

/**
 * Determines if an error should be retried
 */
export function shouldRetry(error: unknown): boolean {
  if (error instanceof ApiError) {
    return error.retryable;
  }
  
  // Network errors are generally retryable
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return true;
  }
  
  return false;
}

/**
 * Creates a network error for fetch failures
 */
export function createNetworkError(originalError: Error, traceId?: string): ApiError {
  return new ApiError(
    'Network error. Please check your connection and try again.',
    0,
    'NETWORK_ERROR',
    { originalError: originalError.message },
    traceId
  );
} 
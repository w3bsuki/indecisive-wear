/**
 * API Services - Standardized service functions
 * 
 * Replaces scattered fetch calls with consistent service methods
 */

import { api } from './client';
import { API_ENDPOINTS } from '@/lib/constants/api';
import type { ApiResponse } from './types';

// Waitlist types
export interface WaitlistData {
  email: string;
  firstName: string;
  source?: string;
  stylePreference?: string;
  socialHandles?: {
    instagram: string;
    tiktok: string;
  };
  marketingConsent?: boolean;
  location?: string;
}

interface WaitlistResponse {
  email: string;
  firstName: string;
  timestamp: string;
}

// Question mark types
interface QuestionMarkData {
  question: string;
  userAgent?: string;
  timestamp?: string;
}

/**
 * Waitlist API Service
 */
export const waitlistService = {
  /**
   * Join the waitlist
   */
  async join(data: WaitlistData): Promise<ApiResponse<WaitlistResponse>> {
    return api.post<WaitlistResponse, WaitlistData>(API_ENDPOINTS.WAITLIST, data, {
      cache: { enabled: false }, // Don't cache POST requests
      retry: {
        maxAttempts: 2, // Retry only once for form submissions
        retryCondition: (error) => error.statusCode >= 500, // Only retry server errors
      },
    });
  },

  /**
   * Check if email is already in waitlist (if we add this endpoint)
   */
  async checkEmail(email: string): Promise<ApiResponse<{ exists: boolean }>> {
    return api.get(`${API_ENDPOINTS.WAITLIST}/check`, {
      cache: { enabled: true, ttl: 60000 }, // Cache for 1 minute
      data: { email },
    });
  },
};

/**
 * Question Mark API Service
 */
export const questionMarkService = {
  /**
   * Submit a question
   */
  async submit(data: QuestionMarkData): Promise<ApiResponse<{ id: string }>> {
    return api.post(API_ENDPOINTS.QUESTION_MARK, data, {
      cache: { enabled: false },
      retry: { maxAttempts: 2 },
    });
  },
};

/**
 * Products API Service (if we add product endpoints)
 */
export const productsService = {
  /**
   * Get all products
   */
  async getAll(): Promise<ApiResponse<Product[]>> {
    return api.get(API_ENDPOINTS.PRODUCTS, {
      cache: { enabled: true, ttl: 10 * 60 * 1000 }, // Cache for 10 minutes
    });
  },

  /**
   * Get product by ID
   */
  async getById(id: string): Promise<ApiResponse<Product>> {
    return api.get(`${API_ENDPOINTS.PRODUCTS}/${id}`, {
      cache: { enabled: true, ttl: 15 * 60 * 1000 }, // Cache for 15 minutes
    });
  },
};

/**
 * Analytics API Service (if we add analytics endpoints)
 */
export const analyticsService = {
  /**
   * Track an event
   */
  async trackEvent(event: string, data?: Record<string, unknown>): Promise<ApiResponse<void>> {
    return api.post(API_ENDPOINTS.ANALYTICS, { event, data }, {
      cache: { enabled: false },
      timeout: 5000, // Short timeout for analytics
      retry: { maxAttempts: 1 }, // Don't retry analytics calls
    });
  },
};

// Generic Product type (define based on your actual product structure)
interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  description?: string;
} 
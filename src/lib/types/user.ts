/**
 * User and Waitlist Type Definitions
 */

// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  location?: string;
  marketingConsent?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Waitlist types
export interface WaitlistEntry {
  email: string;
  firstName: string;
  lastName?: string;
  source?: string;
  stylePreference?: string;
  location?: string;
  marketingConsent?: boolean;
  socialHandles?: {
    instagram?: string;
    tiktok?: string;
  };
  referralCode?: string;
  submittedAt?: string;
}

export interface WaitlistFormData extends Omit<WaitlistEntry, 'submittedAt'> {
  // Form-specific fields
  agreeToTerms?: boolean;
  newsletterSubscribe?: boolean;
}

// Authentication types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Social media types
export interface SocialHandles {
  instagram?: string;
  tiktok?: string;
  twitter?: string;
  youtube?: string;
}

// User preferences
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  stylePreferences: string[];
  currency: 'USD' | 'EUR' | 'GBP';
  language: string;
}

// Analytics and tracking
export interface UserActivity {
  userId?: string;
  sessionId: string;
  action: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
  userId?: string;
  timestamp?: string;
} 
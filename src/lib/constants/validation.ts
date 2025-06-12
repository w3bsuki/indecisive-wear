/**
 * Validation Constants
 */

// Field length constraints
export const FIELD_LENGTHS = {
  EMAIL: {
    MIN: 5,
    MAX: 254,
  },
  PASSWORD: {
    MIN: 8,
    MAX: 128,
  },
  NAME: {
    MIN: 1,
    MAX: 50,
  },
  TEXT_AREA: {
    MIN: 0,
    MAX: 500,
  },
  PHONE: {
    MIN: 10,
    MAX: 15,
  },
  LOCATION: {
    MIN: 2,
    MAX: 100,
  },
} as const;

// Validation error messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_URL: 'Please enter a valid URL',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long',
  PASSWORD_TOO_WEAK: 'Password must contain uppercase, lowercase, number and special character',
  NAME_TOO_SHORT: 'Name must be at least 1 character long',
  NAME_TOO_LONG: 'Name cannot exceed 50 characters',
  EMAIL_TOO_LONG: 'Email cannot exceed 254 characters',
  TEXT_TOO_LONG: 'Text cannot exceed 500 characters',
  TERMS_NOT_ACCEPTED: 'You must accept the terms and conditions',
  INVALID_FORMAT: 'Invalid format',
  ALREADY_EXISTS: 'This value already exists',
  NOT_FOUND: 'Value not found',
} as const;

// Form field names
export const FORM_FIELDS = {
  EMAIL: 'email',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  PHONE: 'phone',
  LOCATION: 'location',
  STYLE_PREFERENCE: 'stylePreference',
  MARKETING_CONSENT: 'marketingConsent',
  TERMS_AGREEMENT: 'agreeToTerms',
  NEWSLETTER_SUBSCRIBE: 'newsletterSubscribe',
  SOCIAL_INSTAGRAM: 'socialHandles.instagram',
  SOCIAL_TIKTOK: 'socialHandles.tiktok',
  REFERRAL_CODE: 'referralCode',
} as const;

// Validation patterns (using existing regex from main constants)
export const VALIDATION_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^\+?[\d\s-()]+$/,
  URL: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
  INSTAGRAM_HANDLE: /^@?[\w.]+$/,
  TIKTOK_HANDLE: /^@?[\w.]+$/,
  NAME: /^[a-zA-Z\s'-]+$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
} as const;

// Password strength requirements
export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 8,
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBER: true,
  REQUIRE_SPECIAL_CHAR: true,
  SPECIAL_CHARS: '!@#$%^&*(),.?":{}|<>',
} as const;

// Social media handle constraints
export const SOCIAL_HANDLE_CONSTRAINTS = {
  INSTAGRAM: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 30,
    PATTERN: VALIDATION_PATTERNS.INSTAGRAM_HANDLE,
  },
  TIKTOK: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 24,
    PATTERN: VALIDATION_PATTERNS.TIKTOK_HANDLE,
  },
} as const;

// File upload constraints
export const FILE_UPLOAD = {
  MAX_SIZE_MB: 5,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'text/plain'],
} as const; 
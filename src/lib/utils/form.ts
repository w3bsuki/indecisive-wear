/**
 * Form Utilities
 * 
 * Consolidates form-related utility functions:
 * - Validation helpers
 * - Form data processing
 * - Input formatting
 */

import { VALIDATION_PATTERNS, VALIDATION_MESSAGES } from '@/lib/constants/validation';

// Validation result interface
export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

// Email validation
export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { isValid: false, message: VALIDATION_MESSAGES.REQUIRED };
  }
  
  const isValid = VALIDATION_PATTERNS.EMAIL.test(email);
  return {
    isValid,
    message: isValid ? undefined : VALIDATION_MESSAGES.INVALID_EMAIL
  };
}

// Phone validation
export function validatePhone(phone: string): ValidationResult {
  if (!phone) {
    return { isValid: false, message: VALIDATION_MESSAGES.REQUIRED };
  }
  
  const isValid = VALIDATION_PATTERNS.PHONE.test(phone);
  return {
    isValid,
    message: isValid ? undefined : VALIDATION_MESSAGES.INVALID_PHONE
  };
}

// Name validation
export function validateName(name: string): ValidationResult {
  if (!name) {
    return { isValid: false, message: VALIDATION_MESSAGES.REQUIRED };
  }
  
  if (name.length < 1) {
    return { isValid: false, message: VALIDATION_MESSAGES.NAME_TOO_SHORT };
  }
  
  if (name.length > 50) {
    return { isValid: false, message: VALIDATION_MESSAGES.NAME_TOO_LONG };
  }
  
  return { isValid: true };
}

// Password validation
export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, message: VALIDATION_MESSAGES.REQUIRED };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: VALIDATION_MESSAGES.PASSWORD_TOO_SHORT };
  }
  
  // Check for complexity
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  if (!(hasUppercase && hasLowercase && hasNumber && hasSpecialChar)) {
    return { isValid: false, message: VALIDATION_MESSAGES.PASSWORD_TOO_WEAK };
  }
  
  return { isValid: true };
}

// URL validation
export function validateUrl(url: string): ValidationResult {
  if (!url) {
    return { isValid: false, message: VALIDATION_MESSAGES.REQUIRED };
  }
  
  const isValid = VALIDATION_PATTERNS.URL.test(url);
  return {
    isValid,
    message: isValid ? undefined : VALIDATION_MESSAGES.INVALID_URL
  };
}

// Generic required field validation
export function validateRequired(value: string | undefined | null): ValidationResult {
  const isValid = Boolean(value && value.trim().length > 0);
  return {
    isValid,
    message: isValid ? undefined : VALIDATION_MESSAGES.REQUIRED
  };
}

// Text length validation
export function validateTextLength(
  text: string,
  minLength?: number,
  maxLength?: number
): ValidationResult {
  if (minLength && text.length < minLength) {
    return { isValid: false, message: `Minimum ${minLength} characters required` };
  }
  
  if (maxLength && text.length > maxLength) {
    return { isValid: false, message: `Maximum ${maxLength} characters allowed` };
  }
  
  return { isValid: true };
}

// Form data processing
export function sanitizeFormData<T extends Record<string, unknown>>(data: T): T {
  const sanitized = {} as T;
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // Trim whitespace and remove extra spaces
      sanitized[key as keyof T] = value.trim().replace(/\s+/g, ' ') as T[keyof T];
    } else {
      sanitized[key as keyof T] = value as T[keyof T];
    }
  }
  
  return sanitized;
}

// Extract form data from FormData object
export function extractFormData(formData: FormData): Record<string, string> {
  const data: Record<string, string> = {};
  
  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string') {
      data[key] = value;
    }
  }
  
  return data;
}

// Convert form data to URL search params
export function formDataToSearchParams(data: Record<string, string>): URLSearchParams {
  const params = new URLSearchParams();
  
  for (const [key, value] of Object.entries(data)) {
    if (value) {
      params.append(key, value);
    }
  }
  
  return params;
}

// Input formatting utilities
export function formatPhoneInput(value: string): string {
  // Remove all non-numeric characters
  const cleaned = value.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  if (cleaned.length >= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  } else if (cleaned.length >= 3) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else {
    return cleaned;
  }
}

export function formatCreditCardInput(value: string): string {
  // Remove all non-numeric characters
  const cleaned = value.replace(/\D/g, '');
  
  // Add spaces every 4 digits
  return cleaned.replace(/(.{4})/g, '$1 ').trim();
}

export function formatExpiryDateInput(value: string): string {
  // Remove all non-numeric characters
  const cleaned = value.replace(/\D/g, '');
  
  // Add slash after 2 digits
  if (cleaned.length >= 2) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
  }
  
  return cleaned;
}

// Validation for specific input types
export function validateCreditCard(cardNumber: string): ValidationResult {
  const cleaned = cardNumber.replace(/\D/g, '');
  
  if (cleaned.length < 13 || cleaned.length > 19) {
    return { isValid: false, message: 'Invalid card number length' };
  }
  
  // Luhn algorithm check
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  const isValid = sum % 10 === 0;
  return {
    isValid,
    message: isValid ? undefined : 'Invalid card number'
  };
}

export function validateExpiryDate(expiryDate: string): ValidationResult {
  const [month, year] = expiryDate.split('/');
  
  if (!month || !year) {
    return { isValid: false, message: 'Please enter expiry date in MM/YY format' };
  }
  
  const monthNum = parseInt(month);
  const yearNum = parseInt(`20${year}`);
  
  if (monthNum < 1 || monthNum > 12) {
    return { isValid: false, message: 'Invalid month' };
  }
  
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  
  if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
    return { isValid: false, message: 'Card has expired' };
  }
  
  return { isValid: true };
}

// Form state helpers
export function createFormValidator<T extends Record<string, unknown>>(
  validationRules: Record<keyof T, (value: unknown) => ValidationResult>
) {
  return function validateForm(data: T): {
    isValid: boolean;
    errors: Partial<Record<keyof T, string>>;
  } {
    const errors: Partial<Record<keyof T, string>> = {};
    let isValid = true;
    
    for (const [field, validator] of Object.entries(validationRules)) {
      const result = validator(data[field]);
      if (!result.isValid) {
        errors[field as keyof T] = result.message;
        isValid = false;
      }
    }
    
    return { isValid, errors };
  };
}

// Debounced validation
export function createDebouncedValidator(
  validator: (value: string) => ValidationResult,
  delay: number = 300
) {
  let timeoutId: NodeJS.Timeout;
  
  return function validate(
    value: string,
    callback: (result: ValidationResult) => void
  ): void {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      const result = validator(value);
      callback(result);
    }, delay);
  };
} 
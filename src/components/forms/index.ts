/**
 * Form Components - CVA Standardized reusable form elements
 * 
 * This module consolidates repeated form patterns with CVA standardization:
 * - BaseInput with CVA variants for consistent styling
 * - Specialized inputs (Email, Text) extending BaseInput
 * - Form composition components with standardized patterns
 * - Type-safe form utilities
 */

// Base components with CVA standardization
export { BaseInput } from './BaseInput';

// Specialized form inputs
export { EmailInput } from './EmailInput';
export { TextInput } from './TextInput';

// Form composition components
export { FormField } from './FormField';
export { FormActions } from './FormActions';

// Re-export form types
export type { 
  FormFieldProps, 
  TextFieldProps, 
  SelectFieldProps, 
  CheckboxFieldProps 
} from '@/lib/types/forms'; 
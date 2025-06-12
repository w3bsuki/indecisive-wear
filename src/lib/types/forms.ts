/**
 * Form-related Type Definitions
 */

// Form field validation
export interface FieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => string | null;
}

// Form field state
export interface FieldState {
  value: string;
  error?: string;
  touched: boolean;
  dirty: boolean;
  valid: boolean;
}

// Form state
export interface FormState<T = Record<string, unknown>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  dirty: boolean;
  valid: boolean;
  submitting: boolean;
  submitted: boolean;
}

// Form configuration
export interface FormConfig<T = Record<string, unknown>> {
  initialValues: T;
  validationSchema?: Partial<Record<keyof T, FieldValidation>>;
  onSubmit: (values: T) => Promise<void> | void;
  onError?: (error: Error) => void;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

// Form field props
export interface FormFieldProps {
  name: string;
  value: string;
  error?: string;
  touched?: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
  onFocus?: () => void;
}

// Validation result
export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

// Field validators
export type FieldValidator = (value: unknown) => string | null;

// Common form field types
export interface TextFieldProps extends FormFieldProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface SelectFieldProps extends FormFieldProps {
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface CheckboxFieldProps extends Omit<FormFieldProps, 'value' | 'onChange'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  required?: boolean;
} 
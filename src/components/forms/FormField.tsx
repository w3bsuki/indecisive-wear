/**
 * FormField Component
 * 
 * Consolidates the repeated form field patterns found in:
 * - components/ui/waitlist-form.tsx
 * - app/features/waitlist/WaitlistOverlay.tsx
 * - Other form implementations
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import type { FormFieldProps } from '@/lib/types/forms';

interface StandardFormFieldProps extends FormFieldProps {
  children: React.ReactNode;
  label?: string;
  required?: boolean;
  description?: string;
  className?: string;
}

// Common style variables to improve render performance
const formFieldClass = cn(
  "space-y-2"
);

const errorMessageClass = cn(
  "flex items-start gap-2 p-3 mt-2 text-sm bg-red-50 border border-red-100 rounded-lg text-red-500"
);

const labelClass = cn(
  "text-sm font-medium text-gray-700"
);

const requiredIndicatorClass = cn(
  "text-red-500"
);

export function FormField({
  children,
  name,
  value,
  error,
  touched,
  onChange,
  onBlur,
  onFocus,
  label,
  required = false,
  description,
  className,
}: StandardFormFieldProps) {
  const fieldId = `field-${name}`;
  const showError = touched && error;

  return (
    <div className={cn(formFieldClass, className)}>
      {label && (
        <Label htmlFor={fieldId} className={labelClass}>
          {label}
          {required && <span className={requiredIndicatorClass}> *</span>}
        </Label>
      )}
      
      <div className="relative">
        {React.cloneElement(children as React.ReactElement<any>, {
          id: fieldId,
          name,
          value,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
          onBlur,
          onFocus,
          'aria-invalid': showError,
          'aria-describedby': showError ? `${fieldId}-error` : undefined,
        })}
      </div>
      
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
      
      {showError && (
        <div 
          id={`${fieldId}-error`}
          role="alert"
          aria-live="polite"
          className={errorMessageClass}
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div className="flex-1">{error}</div>
        </div>
      )}
    </div>
  );
} 
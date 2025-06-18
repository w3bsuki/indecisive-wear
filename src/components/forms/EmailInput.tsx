/**
 * EmailInput Component - CVA Standardized
 * 
 * Specialized email input with consistent styling and validation
 * Uses CVA-based BaseInput for standardized styling patterns
 */

import React from 'react'
import { BaseInput } from './BaseInput'
import { sanitizeEmail } from '@/lib/utils/xss-protection'
import { type InputVariants } from '@/lib/design-system/form-variants'

interface EmailInputProps 
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>,
    Omit<InputVariants, 'state'> {
  /** Whether the input is in a loading state */
  isLoading?: boolean
  /** Custom error state styling */
  hasError?: boolean
  /** Container class name for wrapper */
  containerClassName?: string
}

export const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  ({ 
    hasError = false,
    isLoading = false,
    onChange,
    variant = 'default',
    size = 'md',
    ...props 
  }, ref) => {
    // Handle input sanitization
    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        // Sanitize email input for XSS protection
        const sanitizedValue = sanitizeEmail(e.target.value)
        
        // Create new event with sanitized value
        const sanitizedEvent = {
          ...e,
          target: {
            ...e.target,
            value: sanitizedValue,
          },
        }
        
        onChange(sanitizedEvent as React.ChangeEvent<HTMLInputElement>)
      }
    }, [onChange])

    return (
      <BaseInput
        ref={ref}
        type="email"
        autoComplete="email"
        variant={variant}
        size={size}
        state={hasError ? 'error' : 'default'}
        isLoading={isLoading}
        onChange={handleChange}
        {...props}
      />
    )
  }
)

EmailInput.displayName = 'EmailInput' 
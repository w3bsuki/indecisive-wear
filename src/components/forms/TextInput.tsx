/**
 * TextInput Component - CVA Standardized
 * 
 * Standardized text input with consistent styling and validation
 * Uses CVA-based BaseInput for standardized styling patterns
 */

import React from 'react'
import { BaseInput } from './BaseInput'
import { sanitizeName, sanitizeText } from '@/lib/utils/xss-protection'
import { type InputVariants } from '@/lib/design-system/form-variants'

interface TextInputProps 
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>,
    Omit<InputVariants, 'state'> {
  /** Whether the input is in a loading state */
  isLoading?: boolean
  /** Custom error state styling */
  hasError?: boolean
  /** Input type override (default: text) */
  inputType?: 'text' | 'tel' | 'url' | 'search'
  /** Input purpose for XSS sanitization (default: general) */
  inputPurpose?: 'name' | 'general' | 'search'
  /** Container class name for wrapper */
  containerClassName?: string
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ 
    hasError = false,
    isLoading = false,
    inputType = 'text',
    inputPurpose = 'general',
    onChange,
    variant = 'default',
    size = 'md',
    ...props 
  }, ref) => {
    // Handle input sanitization based on purpose
    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        let sanitizedValue: string
        
        // Apply different sanitization based on input purpose
        switch (inputPurpose) {
          case 'name':
            sanitizedValue = sanitizeName(e.target.value)
            break
          case 'search':
            sanitizedValue = sanitizeText(e.target.value, 200)
            break
          default:
            sanitizedValue = sanitizeText(e.target.value)
        }
        
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
    }, [onChange, inputPurpose])

    return (
      <BaseInput
        ref={ref}
        type={inputType}
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

TextInput.displayName = 'TextInput' 
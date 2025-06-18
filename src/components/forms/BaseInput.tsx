/**
 * BaseInput Component - CVA Standardized
 * 
 * Foundation input component using Class Variance Authority for consistent styling
 * Provides base functionality that other input components can extend
 */

import React from 'react'
import { cn } from '@/lib/utils'
import { inputVariants, type InputVariants } from '@/lib/design-system/form-variants'

interface BaseInputProps 
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    InputVariants {
  /** Whether the input is in a loading state */
  isLoading?: boolean
  /** Container class name for wrapper */
  containerClassName?: string
  /** Input ref for proper forwarding */
  inputRef?: React.Ref<HTMLInputElement>
}

/**
 * BaseInput with CVA variants and forwardRef support
 */
export const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ 
    className, 
    containerClassName,
    variant, 
    size, 
    state, 
    isLoading = false,
    disabled,
    inputRef,
    style,
    ...props 
  }, ref) => {
    // Merge refs if both provided
    const inputElement = React.useRef<HTMLInputElement>(null)
    
    React.useImperativeHandle(ref, () => inputElement.current!, [])
    React.useImperativeHandle(inputRef, () => inputElement.current!, [])

    // Determine the final state based on props
    const finalState = React.useMemo(() => {
      if (state && state !== 'default') return state
      return 'default'
    }, [state])

    // Apply mobile optimization styles
    const mobileOptimizedStyle = React.useMemo(() => ({
      fontSize: '16px', // Prevents zoom on iOS
      ...style
    }), [style])

    return (
      <div className={cn(containerClassName)}>
        <input
          ref={inputElement}
          className={cn(
            inputVariants({ variant, size, state: finalState }),
            className
          )}
          disabled={disabled || isLoading}
          style={mobileOptimizedStyle}
          {...props}
        />
      </div>
    )
  }
)

BaseInput.displayName = 'BaseInput'
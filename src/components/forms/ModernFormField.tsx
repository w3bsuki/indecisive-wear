/**
 * Modern Form Field Components
 * Reusable form fields that work with useModernForm hook
 * 
 * Phase 9.2: Data Fetching Modernization
 */

'use client'

import { ReactNode } from 'react'
import { FieldValues, Path, Controller } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { ModernFormFieldProps } from '@/hooks/forms/useModernForm'

// Base form field wrapper
interface FormFieldWrapperProps {
  label?: string
  description?: string
  error?: string
  required?: boolean
  children: ReactNode
  className?: string
}

function FormFieldWrapper({ 
  label, 
  description, 
  error, 
  required, 
  children, 
  className,
  fieldId,
}: FormFieldWrapperProps & { fieldId?: string }) {
  const descriptionId = description ? `${fieldId}-description` : undefined
  const errorId = error ? `${fieldId}-error` : undefined
  
  return (
    <div className={cn('space-y-2', className)} role="group">
      {label && (
        <Label 
          htmlFor={fieldId}
          className="text-sm font-medium text-gray-700"
        >
          {label}
          {required && (
            <span 
              className="text-red-500 ml-1" 
              aria-label="required"
              role="img"
            >
              *
            </span>
          )}
        </Label>
      )}
      {children}
      {description && (
        <p 
          id={descriptionId}
          className="text-xs text-gray-500"
          role="note"
        >
          {description}
        </p>
      )}
      {error && (
        <p 
          id={errorId}
          className="text-xs text-red-600"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  )
}

// Text Input Field
export function ModernTextField<TData extends FieldValues, TName extends Path<TData>>({
  form,
  name,
  label,
  description,
  placeholder,
  disabled,
  required,
  type = 'text',
  className,
  ...props
}: ModernFormFieldProps<TData, TName> & {
  type?: 'text' | 'email' | 'password' | 'url' | 'tel'
  className?: string
  [key: string]: unknown
}) {
  const fieldId = `field-${name}`
  const descriptionId = description ? `${fieldId}-description` : undefined
  const errorId = fieldState => fieldState.error ? `${fieldId}-error` : undefined
  
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const ariaDescribedBy = [
          descriptionId,
          errorId(fieldState)
        ].filter(Boolean).join(' ')
        
        return (
          <FormFieldWrapper
            {...(label !== undefined && { label })}
            {...(description !== undefined && { description })}
            {...(fieldState.error?.message !== undefined && { error: fieldState.error.message })}
            {...(required !== undefined && { required })}
            {...(className !== undefined && { className })}
            fieldId={fieldId}
          >
            <Input
              {...field}
              {...props}
              id={fieldId}
              type={type}
              placeholder={placeholder}
              disabled={disabled || form.formState.isSubmitting}
              required={required}
              aria-invalid={fieldState.error ? 'true' : 'false'}
              aria-describedby={ariaDescribedBy || undefined}
              aria-required={required ? 'true' : 'false'}
              className={cn(
                'h-10 border-gray-200 focus:border-pink-500 focus:ring-pink-500/20',
                fieldState.error && 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
              )}
            />
          </FormFieldWrapper>
        )
      }}
    />
  )
}

// Textarea Field
export function ModernTextareaField<TData extends FieldValues, TName extends Path<TData>>({
  form,
  name,
  label,
  description,
  placeholder,
  disabled,
  required,
  rows = 3,
  className,
  ...props
}: ModernFormFieldProps<TData, TName> & {
  rows?: number
  className?: string
  [key: string]: unknown
}) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <FormFieldWrapper
          {...(label !== undefined && { label })}
          {...(description !== undefined && { description })}
          {...(fieldState.error?.message !== undefined && { error: fieldState.error.message })}
          {...(required !== undefined && { required })}
          {...(className !== undefined && { className })}
        >
          <Textarea
            {...field}
            {...props}
            rows={rows}
            placeholder={placeholder}
            disabled={disabled || form.formState.isSubmitting}
            className={cn(
              'border-gray-200 focus:border-pink-500 focus:ring-pink-500/20 resize-none',
              fieldState.error && 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
            )}
          />
        </FormFieldWrapper>
      )}
    />
  )
}

// Select Field
export function ModernSelectField<TData extends FieldValues, TName extends Path<TData>>({
  form,
  name,
  label,
  description,
  placeholder,
  disabled,
  required,
  options,
  className,
}: ModernFormFieldProps<TData, TName> & {
  options: Array<{ value: string; label: string; disabled?: boolean }>
  className?: string
}) {
  const fieldId = `field-${name}`
  const descriptionId = description ? `${fieldId}-description` : undefined
  const errorId = fieldState => fieldState.error ? `${fieldId}-error` : undefined
  
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const ariaDescribedBy = [
          descriptionId,
          errorId(fieldState)
        ].filter(Boolean).join(' ')
        
        return (
          <FormFieldWrapper
            {...(label !== undefined && { label })}
            {...(description !== undefined && { description })}
            {...(fieldState.error?.message !== undefined && { error: fieldState.error.message })}
            {...(required !== undefined && { required })}
            {...(className !== undefined && { className })}
            fieldId={fieldId}
          >
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={disabled || form.formState.isSubmitting}
              required={required}
            >
              <SelectTrigger 
                id={fieldId}
                aria-invalid={fieldState.error ? 'true' : 'false'}
                aria-describedby={ariaDescribedBy || undefined}
                aria-required={required ? 'true' : 'false'}
                className={cn(
                  'h-10 border-gray-200 focus:border-pink-500 focus:ring-pink-500/20',
                  fieldState.error && 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent role="listbox">
                {options.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    role="option"
                    {...(option.disabled !== undefined && { disabled: option.disabled })}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormFieldWrapper>
        )
      }}
    />
  )
}

// Checkbox Field
export function ModernCheckboxField<TData extends FieldValues, TName extends Path<TData>>({
  form,
  name,
  label,
  description,
  disabled,
  required,
  className,
}: ModernFormFieldProps<TData, TName> & {
  className?: string
}) {
  const fieldId = `field-${name}`
  const descriptionId = description ? `${fieldId}-description` : undefined
  const errorId = fieldState => fieldState.error ? `${fieldId}-error` : undefined
  
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const ariaDescribedBy = [
          descriptionId,
          errorId(fieldState)
        ].filter(Boolean).join(' ')
        
        return (
          <div className={cn('flex items-start space-x-2', className)} role="group">
            <Checkbox
              id={fieldId}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled || form.formState.isSubmitting}
              required={required}
              aria-invalid={fieldState.error ? 'true' : 'false'}
              aria-describedby={ariaDescribedBy || undefined}
              aria-required={required ? 'true' : 'false'}
              className="mt-0.5 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
            />
            <div className="grid gap-1">
              {label && (
                <Label
                  htmlFor={fieldId}
                  className="text-sm leading-relaxed text-gray-700 font-normal cursor-pointer"
                >
                  {label}
                  {required && (
                    <span 
                      className="text-red-500 ml-1" 
                      aria-label="required"
                      role="img"
                    >
                      *
                    </span>
                  )}
                </Label>
              )}
              {description && (
                <p 
                  id={descriptionId}
                  className="text-xs text-gray-500"
                  role="note"
                >
                  {description}
                </p>
              )}
              {fieldState.error && (
                <p 
                  id={errorId(fieldState)}
                  className="text-xs text-red-600"
                  role="alert"
                  aria-live="polite"
                >
                  {fieldState.error.message}
                </p>
              )}
            </div>
          </div>
        )
      }}
    />
  )
}

// Switch Field
export function ModernSwitchField<TData extends FieldValues, TName extends Path<TData>>({
  form,
  name,
  label,
  description,
  disabled,
  required,
  className,
}: ModernFormFieldProps<TData, TName> & {
  className?: string
}) {
  const fieldId = `field-${name}`
  const descriptionId = description ? `${fieldId}-description` : undefined
  const errorId = fieldState => fieldState.error ? `${fieldId}-error` : undefined
  
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const ariaDescribedBy = [
          descriptionId,
          errorId(fieldState)
        ].filter(Boolean).join(' ')
        
        return (
          <div className={cn('flex items-center justify-between', className)} role="group">
            <div className="space-y-0.5">
              {label && (
                <Label 
                  htmlFor={fieldId}
                  className="text-sm font-medium"
                >
                  {label}
                  {required && (
                    <span 
                      className="text-red-500 ml-1" 
                      aria-label="required"
                      role="img"
                    >
                      *
                    </span>
                  )}
                </Label>
              )}
              {description && (
                <p 
                  id={descriptionId}
                  className="text-xs text-gray-500"
                  role="note"
                >
                  {description}
                </p>
              )}
              {fieldState.error && (
                <p 
                  id={errorId(fieldState)}
                  className="text-xs text-red-600"
                  role="alert"
                  aria-live="polite"
                >
                  {fieldState.error.message}
                </p>
              )}
            </div>
            <Switch
              id={fieldId}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled || form.formState.isSubmitting}
              required={required}
              aria-invalid={fieldState.error ? 'true' : 'false'}
              aria-describedby={ariaDescribedBy || undefined}
              aria-required={required ? 'true' : 'false'}
              role="switch"
              aria-checked={field.value ? 'true' : 'false'}
            />
          </div>
        )
      }}
    />
  )
}

// Form Submit Button
interface ModernFormSubmitProps {
  form: {
    formState: {
      isSubmitting: boolean
      isValid: boolean
    }
  }
  children: ReactNode
  loadingText?: string
  disabled?: boolean
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  icon?: ReactNode
}

export function ModernFormSubmit({
  form,
  children,
  loadingText = 'Submitting...',
  disabled,
  variant = 'default',
  size = 'default',
  className,
  icon,
}: ModernFormSubmitProps & { icon?: ReactNode }) {
  const isLoading = form.formState.isSubmitting
  const isDisabled = disabled || isLoading
  
  return (
    <button
      type="submit"
      disabled={isDisabled}
      aria-describedby={isLoading ? 'submit-status' : undefined}
      aria-disabled={isDisabled ? 'true' : 'false'}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'touch-manipulation', // Better mobile interaction
        
        // Variant styles
        variant === 'default' && 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg hover:from-pink-600 hover:to-pink-700',
        variant === 'destructive' && 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        variant === 'outline' && 'border border-pink-300 bg-background text-pink-700 shadow-sm hover:bg-pink-50',
        variant === 'secondary' && 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        variant === 'ghost' && 'hover:bg-pink-50 hover:text-pink-700',
        variant === 'link' && 'text-pink-600 underline-offset-4 hover:underline',
        
        // Size styles
        size === 'default' && 'h-9 px-4 py-2',
        size === 'sm' && 'h-8 rounded-md px-3 text-xs',
        size === 'lg' && 'h-10 rounded-md px-8',
        size === 'icon' && 'h-9 w-9',
        
        className
      )}
    >
      {isLoading ? (
        <>
          <div 
            className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"
            aria-hidden="true"
          />
          <span id="submit-status" className="sr-only">
            Form is being submitted
          </span>
          {loadingText}
        </>
      ) : (
        <>
          {icon && <span className="mr-2" aria-hidden="true">{icon}</span>}
          {children}
        </>
      )}
    </button>
  )
} 
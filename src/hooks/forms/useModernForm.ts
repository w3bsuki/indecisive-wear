/**
 * Modern Form Hook
 * Integrates React Hook Form + Zod validation + Zustand stores + TanStack Query
 * 
 * Phase 9.2: Data Fetching Modernization
 */

import { useForm, UseFormProps, FieldValues, Path, DefaultValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'
import { z } from 'zod'
import { useUIActions } from '@/stores'

// Generic form configuration
export interface ModernFormConfig<TSchema extends z.ZodSchema, TData extends FieldValues = z.infer<TSchema>> {
  // Schema and validation
  schema: TSchema
  defaultValues?: DefaultValues<TData>
  
  // Submission
  onSubmit: (data: TData) => Promise<unknown>
  onSuccess?: (data: TData, response?: unknown) => void
  onError?: (error: Error, data: TData) => void
  
  // Store integration
  storeKey?: string
  persistForm?: boolean
  
  // Query integration
  invalidateQueries?: readonly unknown[][]
  optimisticUpdate?: (data: TData) => void
  
  // UI options
  showToasts?: boolean
  successMessage?: string | ((data: TData) => string)
  errorMessage?: string | ((error: Error) => string)
  
  // Form options
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all'
  reValidateMode?: 'onBlur' | 'onChange' | 'onSubmit'
}

export function useModernForm<TSchema extends z.ZodSchema, TData extends FieldValues = z.infer<TSchema>>(
  config: ModernFormConfig<TSchema, TData>
) {
  const {
    schema,
    defaultValues,
    onSubmit,
    onSuccess,
    onError,
    invalidateQueries,
    optimisticUpdate,
    showToasts = true,
    successMessage,
    errorMessage,
    mode = 'onBlur',
    reValidateMode = 'onChange'
  } = config

  const queryClient = useQueryClient()
  const { addToast } = useUIActions()

  // Initialize React Hook Form with Zod resolver
  const form = useForm<TData>({
    resolver: zodResolver(schema),
    defaultValues,
    mode,
    reValidateMode,
  })

  // Create mutation for form submission
  const mutation = useMutation({
    mutationFn: onSubmit,
    onMutate: async (data: TData) => {
      // Apply optimistic update if provided
      if (optimisticUpdate) {
        optimisticUpdate(data)
      }
    },
    onSuccess: (response, data) => {
      // Reset form on success
      form.reset()
      
      // Invalidate related queries
      if (invalidateQueries) {
        invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey })
        })
      }
      
      // Show success toast
      if (showToasts) {
        const message = typeof successMessage === 'function' 
          ? successMessage(data)
          : successMessage || 'Form submitted successfully!'
        
        addToast({
          type: 'success',
          title: 'Success',
          description: message,
        })
      }
      
      // Call success callback
      onSuccess?.(data, response)
    },
    onError: (error: Error, data) => {
      // Show error toast
      if (showToasts) {
        const message = typeof errorMessage === 'function'
          ? errorMessage(error)
          : errorMessage || error.message || 'Something went wrong'
        
        addToast({
          type: 'error',
          title: 'Error',
          description: message,
        })
      }
      
      // Call error callback
      onError?.(error, data)
    },
  })

  // Handle form submission
  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await mutation.mutateAsync(data as TData)
    } catch (error) {
      // Error is already handled in mutation.onError
    }
  })

  // Enhanced form state
  const formState = {
    ...form.formState,
    isSubmitting: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    isLoading: mutation.isPending,
  }

  // Field helpers with better TypeScript support
  const setFieldValue = useCallback(<K extends Path<TData>>(
    name: K,
    value: TData[K],
    options?: { shouldValidate?: boolean; shouldDirty?: boolean }
  ) => {
    form.setValue(name, value, {
      shouldValidate: options?.shouldValidate ?? true,
      shouldDirty: options?.shouldDirty ?? true,
    })
  }, [form])

  const getFieldError = useCallback(<K extends Path<TData>>(name: K) => {
    return form.formState.errors[name]?.message
  }, [form.formState.errors])

  // Reset mutation state when form is reset
  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      mutation.reset()
    }
  }, [form.formState.isSubmitSuccessful, mutation])

  return {
    // Form instance and methods
    form,
    register: form.register,
    handleSubmit,
    reset: form.reset,
    watch: form.watch,
    getValues: form.getValues,
    trigger: form.trigger,
    clearErrors: form.clearErrors,
    
    // Enhanced state
    formState,
    
    // Field helpers
    setFieldValue,
    getFieldError,
    
    // Mutation state
    mutation,
    
    // Convenience flags
    isValid: form.formState.isValid,
    isDirty: form.formState.isDirty,
    isSubmitting: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  }
}

// Form field component props helper
export interface ModernFormFieldProps<TData extends FieldValues, TName extends Path<TData>> {
  form: ReturnType<typeof useModernForm<z.ZodSchema, TData>>['form']
  name: TName
  label?: string
  description?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
} 
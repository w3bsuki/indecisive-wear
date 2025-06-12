/**
 * FormActions Component
 * 
 * Standardizes form button layouts and common action patterns
 * Used for submit buttons, cancel buttons, and other form actions
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FormActionsProps {
  /** Primary action button props */
  primaryAction?: {
    label: string;
    onClick?: () => void;
    loading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
  };
  /** Secondary action button props */
  secondaryAction?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
  /** Layout direction */
  direction?: 'row' | 'column';
  /** Additional className */
  className?: string;
  /** Whether to make buttons full width on mobile */
  fullWidthOnMobile?: boolean;
}

export function FormActions({
  primaryAction,
  secondaryAction,
  direction = 'row',
  className,
  fullWidthOnMobile = true,
}: FormActionsProps) {
  const containerClass = cn(
    "flex gap-3",
    direction === 'row' ? "flex-row" : "flex-col",
    fullWidthOnMobile && "sm:flex-row flex-col",
    className
  );

  const buttonClass = cn(
    fullWidthOnMobile && "w-full sm:w-auto"
  );

  return (
    <div className={containerClass}>
      {secondaryAction && (
        <Button
          type="button"
          variant="outline"
          onClick={secondaryAction.onClick}
          disabled={secondaryAction.disabled}
          className={buttonClass}
        >
          {secondaryAction.label}
        </Button>
      )}
      
      {primaryAction && (
        <Button
          type={primaryAction.type || 'submit'}
          onClick={primaryAction.onClick}
          disabled={primaryAction.disabled || primaryAction.loading}
          className={buttonClass}
        >
          {primaryAction.loading ? 'Loading...' : primaryAction.label}
        </Button>
      )}
    </div>
  );
} 
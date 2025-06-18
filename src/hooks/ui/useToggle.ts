/**
 * Custom hook for managing boolean toggle states
 * Consolidates modal, dialog, menu, and other boolean state management
 */

import { useState, useCallback } from 'react';

export interface UseToggleOptions {
  defaultValue?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export interface ToggleState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  set: (value: boolean) => void;
}

export function useToggle(
  defaultValue: boolean = false,
  options?: UseToggleOptions
): ToggleState {
  const { onToggle } = options || {};
  const [isOpen, setIsOpen] = useState(defaultValue);

  const open = useCallback(() => {
    setIsOpen(true);
    onToggle?.(true);
  }, [onToggle]);

  const close = useCallback(() => {
    setIsOpen(false);
    onToggle?.(false);
  }, [onToggle]);

  const toggle = useCallback(() => {
    setIsOpen(prev => {
      const newValue = !prev;
      onToggle?.(newValue);
      return newValue;
    });
  }, [onToggle]);

  const set = useCallback((value: boolean) => {
    setIsOpen(value);
    onToggle?.(value);
  }, [onToggle]);

  return {
    isOpen,
    open,
    close,
    toggle,
    set,
  };
}

// Specialized variants for common use cases
export function useModal(defaultOpen: boolean = false) {
  return useToggle(defaultOpen);
}

export function useDialog(defaultOpen: boolean = false) {
  return useToggle(defaultOpen);
}

export function useDrawer(defaultOpen: boolean = false) {
  return useToggle(defaultOpen);
}

export function useDropdown(defaultOpen: boolean = false) {
  return useToggle(defaultOpen);
} 
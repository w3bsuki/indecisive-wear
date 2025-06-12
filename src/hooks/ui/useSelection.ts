/**
 * Custom hook for managing selection and filter states
 * Consolidates filter, selection, active tab, and multi-selection logic
 */

import { useState, useCallback } from 'react';

export interface UseSelectionOptions<T> {
  defaultSelected?: T | T[];
  multiple?: boolean;
  onChange?: (selected: T | T[]) => void;
}

export interface SelectionState<T> {
  selected: T | T[];
  isSelected: (item: T) => boolean;
  select: (item: T) => void;
  deselect: (item: T) => void;
  toggle: (item: T) => void;
  clear: () => void;
  set: (items: T | T[]) => void;
  selectAll: (items: T[]) => void;
  selectedCount: number;
}

export function useSelection<T>(
  options: UseSelectionOptions<T> = {}
): SelectionState<T> {
  const { defaultSelected, multiple = false, onChange } = options;
  
  const [selected, setSelected] = useState<T | T[]>(
    multiple 
      ? (Array.isArray(defaultSelected) ? defaultSelected : defaultSelected ? [defaultSelected] : [])
      : (Array.isArray(defaultSelected) ? defaultSelected[0] : defaultSelected) as T | T[]
  );

  const isSelected = useCallback((item: T): boolean => {
    if (multiple) {
      return Array.isArray(selected) && selected.includes(item);
    }
    return selected === item;
  }, [selected, multiple]);

  const select = useCallback((item: T) => {
    if (multiple) {
      setSelected(prev => {
        const prevArray = Array.isArray(prev) ? prev : [];
        if (!prevArray.includes(item)) {
          const newSelected = [...prevArray, item];
          onChange?.(newSelected);
          return newSelected;
        }
        return prev;
      });
    } else {
      setSelected(item);
      onChange?.(item);
    }
  }, [multiple, onChange]);

  const deselect = useCallback((item: T) => {
    if (multiple) {
      setSelected(prev => {
        const prevArray = Array.isArray(prev) ? prev : [];
        const newSelected = prevArray.filter(i => i !== item);
        onChange?.(newSelected);
        return newSelected;
      });
    } else if (selected === item) {
      setSelected(undefined as T);
      onChange?.(undefined as T);
    }
  }, [multiple, selected, onChange]);

  const toggle = useCallback((item: T) => {
    if (isSelected(item)) {
      deselect(item);
    } else {
      select(item);
    }
  }, [isSelected, select, deselect]);

  const clear = useCallback(() => {
    const newSelected = multiple ? [] : undefined;
    setSelected(newSelected as T | T[]);
    onChange?.(newSelected as T | T[]);
  }, [multiple, onChange]);

  const set = useCallback((items: T | T[]) => {
    setSelected(items);
    onChange?.(items);
  }, [onChange]);

  const selectAll = useCallback((items: T[]) => {
    if (multiple) {
      setSelected(items);
      onChange?.(items);
    }
  }, [multiple, onChange]);

  const selectedCount = multiple && Array.isArray(selected) ? selected.length : selected ? 1 : 0;

  return {
    selected,
    isSelected,
    select,
    deselect,
    toggle,
    clear,
    set,
    selectAll,
    selectedCount,
  };
}

// Specialized hooks for common use cases
export function useFilter<T>(defaultFilter?: T) {
  return useSelection<T>({ defaultSelected: defaultFilter, multiple: false });
}

export function useActiveTab<T>(defaultTab?: T) {
  return useSelection<T>({ defaultSelected: defaultTab, multiple: false });
}

export function useMultiSelect<T>(defaultSelected?: T[]) {
  return useSelection<T>({ defaultSelected, multiple: true });
}

export function useActiveIndex(defaultIndex: number = 0) {
  const { selected, select } = useSelection<number>({ defaultSelected: defaultIndex });
  
  return {
    activeIndex: selected as number,
    setActiveIndex: select,
    next: () => select((selected as number) + 1),
    prev: () => select(Math.max(0, (selected as number) - 1)),
  };
} 
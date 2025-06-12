/**
 * Central Type Definitions Export
 * All application types are re-exported from here for easy importing
 */

// Base types
export * from './ui';
export * from './api';
export * from './forms';
export * from './product';
export * from './user';

// Common utility types
export type Maybe<T> = T | null | undefined;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type StringOrNumber = string | number;
export type EmptyObject = Record<string, never>;

// React common types
export type ReactChildren = React.ReactNode;
export type ReactProps<T = {}> = T & {
  children?: React.ReactNode;
  className?: string;
};

// Event types
export type MouseEventHandler = (event: React.MouseEvent) => void;
export type ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type FormEventHandler = (event: React.FormEvent) => void;

// Status types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
export type Status = 'active' | 'inactive' | 'pending';

// Generic response wrapper
export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp?: string;
}; 
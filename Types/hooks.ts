// Hook related types

import { QueryObserverResult } from "@tanstack/react-query"
import { User } from "./index"

// React Query hook types
export type UseQueryResult<T> = QueryObserverResult<T, Error>

// Custom hook types
export interface UseLocalStorageResult<T> {
  value: T
  setValue: (value: T | ((prev: T) => T)) => void
  removeValue: () => void
}

export interface UseDebounceResult<T> {
  debouncedValue: T
  isDebouncing: boolean
}

export interface UsePaginationResult {
  pageIndex: number
  pageSize: number
  totalPages: number
  setPageIndex: (page: number) => void
  setPageSize: (size: number) => void
  goToFirstPage: () => void
  goToLastPage: () => void
  goToNextPage: () => void
  goToPreviousPage: () => void
  canGoToFirstPage: boolean
  canGoToLastPage: boolean
  canGoToNextPage: boolean
  canGoToPreviousPage: boolean
}

// Form hook types
export interface UseFormResult<T> {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
  isSubmitting: boolean
  isValid: boolean
  setValue: (field: keyof T, value: T[keyof T]) => void
  setValues: (values: Partial<T>) => void
  setError: (field: keyof T, error: string) => void
  setTouched: (field: keyof T, touched: boolean) => void
  reset: () => void
  submit: () => Promise<void>
}

// Mobile hook types
export interface UseMobileResult {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

// Auth hook types
export interface UseAuthResult {
  user: User | null
  login: (credentials: { username: string; password: string }) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

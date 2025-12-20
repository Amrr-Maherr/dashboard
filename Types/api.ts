// API related types

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}

// HTTP methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

// Request config
export interface RequestConfig {
  method?: HttpMethod
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean>
  data?: unknown
  timeout?: number
}

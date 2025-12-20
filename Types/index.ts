// External imports
import { ColumnDef } from "@tanstack/react-table"
import React from "react"

// User types
export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}

// Authentication types
export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token?: string
}

// Cart/Product types
export interface CartProduct {
  id: number
  title: string
  price: number
  quantity: number
  total: number
  discountPercentage: number
  discountedPrice: number
}

export interface Cart {
  id: number
  products: CartProduct[]
  total: number
  discountedTotal: number
  userId: number
  totalProducts: number
  totalQuantity: number
}

// API Response types
export interface CartsResponse {
  carts: Cart[]
  total: number
  skip: number
  limit: number
}

// Formatted data types for the data table
export interface SectionData {
  id: number
  header: string
  type: string
  status: string
  target: string
  limit: string
  reviewer: string
}

// Paginated response types
export interface PaginatedOrdersResponse {
  data: SectionData[]
  total: number
  limit: number
  skip: number
}

// Component prop types
export interface DataTableProps {
  data: SectionData[]
  customColumns?: ColumnDef<SectionData>[]
  totalCount?: number
  pageIndex?: number
  pageSize?: number
  onPageChange?: (pageIndex: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

// Navigation types
export interface NavItem {
  title: string
  url: string
  icon?: React.ComponentType<{ className?: string }>
  isActive?: boolean
}

// API types
export interface ApiError {
  message: string
  status?: number
}

// Auth context types
export interface AuthContextType {
  user: User | null
  login: (credentials: LoginCredentials) => Promise<AuthResponse>
  logout: () => void
  isAuthenticated: boolean
  isLoading?: boolean
}

// Form types
export interface AddSectionForm {
  header: string
  type: string
  status: string
  target?: string
  limit?: string
  reviewer?: string
}

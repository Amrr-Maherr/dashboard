// Component related types

import { ReactNode } from "react"

// Base component props
export interface BaseComponentProps {
  className?: string
  children?: ReactNode
}

// Form component types
export interface FormFieldProps extends BaseComponentProps {
  label?: string
  error?: string
  required?: boolean
  disabled?: boolean
}

// Button variants and sizes
export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"

export type ButtonSize = "default" | "sm" | "lg" | "icon"

// Table component types
export interface TableColumn<T = unknown> {
  key: string
  title: string
  dataIndex?: keyof T
  render?: (value: T[keyof T], record: T, index: number) => ReactNode
  sortable?: boolean
  width?: string | number
}

// Sidebar component types
export interface SidebarItem {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  href?: string
  children?: SidebarItem[]
}

// Modal/Dialog types
export interface ModalProps extends BaseComponentProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
}

// Chart component types
export interface ChartDataPoint {
  name: string
  value: number
  [key: string]: string | number
}

export interface ChartConfig {
  [key: string]: {
    label: string
    color?: string
  }
}

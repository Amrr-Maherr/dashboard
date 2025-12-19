"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import { ProtectedRoute } from "@/Providers/ProtectedRoute"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useProducts } from "@/Hooks/useProducts"

export default function ProductsPage() {
  const { data: productsData, isLoading, error } = useProducts()

  if (isLoading) {
    return (
      <ProtectedRoute>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="floating" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="text-lg">Loading products...</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
    )
  }

  if (error) {
    return (
      <ProtectedRoute>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="floating" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="text-lg text-red-500">Error loading products</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
    )
  }

  // Transform products data for DataTable
  const transformedProducts = productsData?.map((product) => ({
    id: product.id,
    header: product.title,
    type: product.category,
    status: product.stock > 0 ? 'In Stock' : 'Out of Stock',
    target: product.price.toString(),
    limit: product.discountPercentage.toString(),
    reviewer: product.brand,
  })) || []

  return (
    <ProtectedRoute>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="floating" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6">
                  <h1 className="text-2xl font-bold">Products Management</h1>
                  <p className="text-muted-foreground">Manage your product inventory</p>
                </div>
                <DataTable data={transformedProducts} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
}

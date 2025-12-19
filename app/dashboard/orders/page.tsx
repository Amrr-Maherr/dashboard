"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import { ProtectedRoute } from "@/Providers/ProtectedRoute"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useOrders } from "@/Hooks/useOrders"

export default function OrdersPage() {
  const { data: ordersData, isLoading, error } = useOrders()

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
              <div className="text-lg">Loading orders...</div>
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
              <div className="text-lg text-red-500">Error loading orders</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
    )
  }

  // Transform orders data for DataTable
  const transformedOrders = ordersData?.map((order) => ({
    id: order.id,
    header: `Order #${order.id}`,
    type: order.userId.toString(),
    status: order.total > 500 ? 'Completed' : 'Pending',
    target: order.total.toString(),
    limit: order.totalProducts.toString(),
    reviewer: 'Admin',
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
                  <h1 className="text-2xl font-bold">Orders Management</h1>
                  <p className="text-muted-foreground">Manage customer orders and transactions</p>
                </div>
                <DataTable data={transformedOrders} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
}

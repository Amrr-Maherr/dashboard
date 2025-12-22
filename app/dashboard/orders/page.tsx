"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { ProtectedRoute } from "@/Providers/ProtectedRoute"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useOrders } from "@/Hooks/useOrders"
import { OrderTable } from "@/components/OrderTable"
import { exportToExcelAdvanced } from "@/lib/utils"
import { IconDownload } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

export default function OrdersPage() {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const { data: ordersResponse, isLoading, error } = useOrders(pageIndex, pageSize)

  if (isLoading) {
    return (
      <ProtectedRoute>
      <SidebarProvider>
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
        <SidebarProvider>
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

  const ordersData = ordersResponse?.data || []
  const totalCount = ordersResponse?.total || 0

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar variant="floating" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6 flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">Orders Management</h1>
                    <p className="text-muted-foreground">Manage customer orders and transactions ({totalCount} total orders)</p>
                  </div>
                  <Button onClick={() => {
                    const exportData = ordersData.map((item: any) => ({
                      'Order ID': item.id,
                      'Cart ID': item.header,
                      'Customer': item.type,
                      'Total Price': item.target,
                      'Items Count': item.limit,
                      'Total Quantity': item.reviewer,
                      'Status': item.status
                    }));

                    exportToExcelAdvanced(exportData, 'orders.xlsx', {
                      sheetName: 'Orders'
                    });
                  }} variant="outline">
                    <IconDownload className="mr-2 h-4 w-4" />
                    Export Excel
                  </Button>
                </div>
                <OrderTable
                  data={ordersData}
                  totalCount={totalCount}
                  pageIndex={pageIndex}
                  pageSize={pageSize}
                  onPageChange={setPageIndex}
                  onPageSizeChange={setPageSize}
                />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
}

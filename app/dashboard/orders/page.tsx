"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { ProtectedRoute } from "@/Providers/ProtectedRoute";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ShimmerLoader } from "@/components/ui/shimmer-loader";
import { TableHeaderSection } from "@/components/ui/table-header-section";
import { useOrders } from "@/Hooks/useOrders";
import { OrderTable } from "@/components/OrderTable";
import { exportToExcelAdvanced } from "@/lib/utils";

export default function OrdersPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: ordersResponse,
    isLoading,
    error,
  } = useOrders(pageIndex, pageSize);

  const ordersData = ordersResponse?.data || [];
  const totalCount = ordersResponse?.total || 0;

  const handleExport = () => {
    const exportData = ordersData.map((item: any) => ({
      "Order ID": item.id,
      "Cart ID": item.header,
      Customer: item.type,
      "Total Price": item.target,
      "Items Count": item.limit,
      "Total Quantity": item.reviewer,
      Status: item.status,
    }));

    exportToExcelAdvanced(exportData, "orders.xlsx", {
      sheetName: "Orders",
    });
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <SidebarProvider>
          <AppSidebar variant="floating" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <TableHeaderSection
                    title="Orders Management"
                    description="Manage customer orders and transactions"
                  />
                  <ShimmerLoader columns={6} />
                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
    );
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
    );
  }

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar variant="floating" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <TableHeaderSection
                  title="Orders Management"
                  description="Manage customer orders and transactions ({totalCount} total orders)"
                  totalCount={totalCount}
                  onExport={handleExport}
                />
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
  );
}

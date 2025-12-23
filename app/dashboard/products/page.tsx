"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { ProtectedRoute } from "@/Providers/ProtectedRoute";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ShimmerLoader } from "@/components/ui/shimmer-loader";
import { TableHeaderSection } from "@/components/ui/table-header-section";
import { useProducts } from "@/Hooks/useProducts";
import { ProductTable } from "@/components/ProductTable";
import { exportToExcelAdvanced } from "@/lib/utils";

export default function ProductsPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: productsResponse,
    isLoading,
    error,
  } = useProducts(pageIndex, pageSize);

  console.log("Products response:", productsResponse); // Debug

  /** @type {PaginatedProductsResponse | undefined} */
  const response = productsResponse;
  const productsData = response?.data || [];
  const totalCount = response?.total || 0;

  const handleExport = () => {
    const exportData = productsData.map((item: any) => ({
      "Product ID": item.id,
      "Product Name": item.title,
      Category: item.category?.name || "N/A",
      Brand: item.brand?.name || "N/A",
      Price: item.price,
      "Stock Quantity": item.quantity,
      Rating: item.ratingsAverage || "N/A",
      Images: item.images?.join(", ") || "N/A",
    }));

    exportToExcelAdvanced(exportData, "products.xlsx", {
      sheetName: "Products",
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
                    title="Products Management"
                    description="Manage your product inventory"
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
              <div className="text-lg text-red-500">Error loading products</div>
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
                  title="Products Management"
                  description="Manage your product inventory ({totalCount} total products)"
                  totalCount={totalCount}
                  onExport={handleExport}
                />
                <ProductTable
                  data={productsData}
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

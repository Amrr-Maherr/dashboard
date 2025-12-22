"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { ProtectedRoute } from "@/Providers/ProtectedRoute";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useProducts } from "@/Hooks/useProducts";
import { ProductTable } from "@/components/ProductTable";
import { exportToExcelAdvanced } from "@/lib/utils";
import { IconDownload } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: productsResponse,
    isLoading,
    error,
  } = useProducts(pageIndex, pageSize);

  console.log("Products response:", productsResponse); // Debug

  if (isLoading) {
    return (
      <ProtectedRoute>
        <SidebarProvider>
          <AppSidebar variant="floating" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="text-lg">Loading products...</div>
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

  /** @type {PaginatedProductsResponse | undefined} */
  const response = productsResponse;
  const productsData = response?.data || [];
  const totalCount = response?.total || 0;

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar variant="floating" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6 flex flex-wrap gap-[15px] items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">Products Management</h1>
                    <p className="text-muted-foreground">
                      Manage your product inventory ({totalCount} total
                      products)
                    </p>
                  </div>
                  <Button
                    onClick={() => {
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
                    }}
                    variant="outline"
                  >
                    <IconDownload className="mr-2 h-4 w-4" />
                    Export Excel
                  </Button>
                </div>
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

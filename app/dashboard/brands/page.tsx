"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { BrandTable } from "@/components/BrandTable";
import { SiteHeader } from "@/components/site-header";
import { ProtectedRoute } from "@/Providers/ProtectedRoute";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ShimmerLoader } from "@/components/ui/shimmer-loader";
import { TableHeaderSection } from "@/components/ui/table-header-section";
import { useBrands } from "@/Hooks/useBrands";
import { exportToExcelAdvanced } from "@/lib/utils";

export default function BrandsPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: brandsResponse,
    isLoading,
    error,
  } = useBrands(pageIndex, pageSize);

  const brandsData = brandsResponse?.data || [];
  const totalCount = brandsResponse?.total || 0;

  const handleExport = () => {
    const exportData = brandsData.map((item: any) => ({
      "Brand ID": item._id,
      "Brand Name": item.name,
      Slug: item.slug,
      "Logo URL": item.image,
    }));

    exportToExcelAdvanced(exportData, "brands.xlsx", {
      sheetName: "Brands",
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
                    title="Brands Management"
                    description="Manage product brands"
                  />
                  <ShimmerLoader columns={3} />
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
              <div className="text-lg text-red-500">Error loading brands</div>
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
                  title="Brands Management"
                  description="Manage product brands ({totalCount} total brands)"
                  totalCount={totalCount}
                  onExport={handleExport}
                />
                <BrandTable
                  data={brandsData}
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

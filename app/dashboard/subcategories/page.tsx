"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SubcategoryTable } from "@/components/SubcategoryTable";
import { SiteHeader } from "@/components/site-header";
import { ProtectedRoute } from "@/Providers/ProtectedRoute";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ShimmerLoader } from "@/components/ui/shimmer-loader";
import { TableHeaderSection } from "@/components/ui/table-header-section";
import { useSubcategories } from "@/Hooks/useSubcategories";
import { exportToExcelAdvanced } from "@/lib/utils";

export default function SubcategoriesPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: subcategoriesResponse,
    isLoading,
    error,
  } = useSubcategories(pageIndex, pageSize);

  const subcategoriesData = subcategoriesResponse?.data || [];
  const totalCount = subcategoriesResponse?.total || 0;

  const handleExport = () => {
    const exportData = subcategoriesData.map((item: any) => ({
      "Subcategory ID": item._id,
      "Subcategory Name": item.name,
      Slug: item.slug,
      Category: item.category,
    }));

    exportToExcelAdvanced(exportData, "subcategories.xlsx", {
      sheetName: "Subcategories",
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
                    title="Subcategories Management"
                    description="Manage product subcategories"
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
              <div className="text-lg text-red-500">
                Error loading subcategories
              </div>
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
                  title="Subcategories Management"
                  description="Manage product subcategories ({totalCount} total subcategories)"
                  totalCount={totalCount}
                  onExport={handleExport}
                />
                <SubcategoryTable
                  data={subcategoriesData}
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

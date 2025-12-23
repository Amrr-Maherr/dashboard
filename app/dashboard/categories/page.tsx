"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { CategoryTable } from "@/components/CategoryTable";
import { SiteHeader } from "@/components/site-header";
import { ProtectedRoute } from "@/Providers/ProtectedRoute";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ShimmerLoader } from "@/components/ui/shimmer-loader";
import { TableHeaderSection } from "@/components/ui/table-header-section";
import { useCategories } from "@/Hooks/useCategories";
import { exportToExcelAdvanced } from "@/lib/utils";

export default function CategoriesPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: categoriesResponse,
    isLoading,
    error,
  } = useCategories(pageIndex, pageSize);

  const categoriesData = categoriesResponse?.data || [];
  const totalCount = categoriesResponse?.total || 0;

  const handleExport = () => {
    const exportData = categoriesData.map((item: any) => ({
      "Category ID": item._id,
      "Category Name": item.name,
      Slug: item.slug,
      "Image URL": item.image,
    }));

    exportToExcelAdvanced(exportData, "categories.xlsx", {
      sheetName: "Categories",
    });
  };

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
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <TableHeaderSection
                    title="Categories Management"
                    description="Manage product categories"
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
              <div className="text-lg text-red-500">
                Error loading categories
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
    );
  }

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
                <TableHeaderSection
                  title="Categories Management"
                  description="Manage product categories ({totalCount} total categories)"
                  totalCount={totalCount}
                  onExport={handleExport}
                />
                <CategoryTable
                  data={categoriesData}
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

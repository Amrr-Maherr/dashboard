"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SubcategoryTable } from "@/components/SubcategoryTable";
import { SiteHeader } from "@/components/site-header";
import { ProtectedRoute } from "@/Providers/ProtectedRoute";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useSubcategories } from "@/Hooks/useSubcategories";
import { exportToExcelAdvanced } from "@/lib/utils";
import { IconDownload } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function SubcategoriesPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: subcategoriesResponse,
    isLoading,
    error,
  } = useSubcategories(pageIndex, pageSize);

  if (isLoading) {
    return (
      <ProtectedRoute>
        <SidebarProvider>
          <AppSidebar variant="floating" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="text-lg">Loading subcategories...</div>
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

  const subcategoriesData = subcategoriesResponse?.data || [];
  const totalCount = subcategoriesResponse?.total || 0;

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
                    <h1 className="text-2xl font-bold">
                      Subcategories Management
                    </h1>
                    <p className="text-muted-foreground">
                      Manage product subcategories ({totalCount} total
                      subcategories)
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      const exportData = subcategoriesData.map((item: any) => ({
                        "Subcategory ID": item._id,
                        "Subcategory Name": item.name,
                        Slug: item.slug,
                        Category: item.category,
                      }));

                      exportToExcelAdvanced(exportData, "subcategories.xlsx", {
                        sheetName: "Subcategories",
                      });
                    }}
                    variant="outline"
                  >
                    <IconDownload className="mr-2 h-4 w-4" />
                    Export Excel
                  </Button>
                </div>
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

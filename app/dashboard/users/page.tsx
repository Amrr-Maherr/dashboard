"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { ProtectedRoute } from "@/Providers/ProtectedRoute";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ShimmerLoader } from "@/components/ui/shimmer-loader";
import { useUsers } from "@/Hooks/useUsers";
import { UserTable } from "@/components/UserTable";
import { exportToExcelAdvanced } from "@/lib/utils";
import { IconDownload } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function UsersPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: usersResponse,
    isLoading,
    error,
  } = useUsers(pageIndex, pageSize);

  console.log("Users response:", usersResponse); // Debug

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
                  <div className="px-4 lg:px-6 flex flex-wrap gap-[15px] items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold">Users Management</h1>
                      <p className="text-muted-foreground">
                        Manage your users
                      </p>
                    </div>
                  </div>
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
              <div className="text-lg text-red-500">Error loading users</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
    );
  }

  /** @type {PaginatedUsersResponse | undefined} */
  const response = usersResponse;
  const usersData = response?.data || [];
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
                    <h1 className="text-2xl font-bold">Users Management</h1>
                    <p className="text-muted-foreground">
                      Manage your users ({totalCount} total users)
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      const exportData = usersData.map((item: any) => ({
                        "User ID": item.id,
                        Name: item.header,
                        Role: item.type,
                        Status: item.status,
                        Age: item.target,
                        Email: item.limit,
                        Phone: item.reviewer,
                      }));

                      exportToExcelAdvanced(exportData, "users.xlsx", {
                        sheetName: "Users",
                      });
                    }}
                    variant="outline"
                  >
                    <IconDownload className="mr-2 h-4 w-4" />
                    Export Excel
                  </Button>
                </div>
                <UserTable
                  data={usersData}
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

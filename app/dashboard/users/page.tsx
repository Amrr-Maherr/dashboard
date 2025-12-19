"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import { ProtectedRoute } from "@/Providers/ProtectedRoute"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useUsers } from "@/Hooks/useUsers"

export default function UsersPage() {
  const { data: usersData, isLoading, error } = useUsers()

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
              <div className="text-lg">Loading users...</div>
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
              <div className="text-lg text-red-500">Error loading users</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
    )
  }

  // Transform users data for DataTable
  const transformedUsers = usersData?.map((user) => ({
    id: user.id,
    header: `${user.firstName} ${user.lastName}`,
    type: user.company?.department || 'N/A',
    status: 'Active',
    target: user.age.toString(),
    limit: user.company?.title || 'N/A',
    reviewer: user.email,
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
                  <h1 className="text-2xl font-bold">Users Management</h1>
                  <p className="text-muted-foreground">Manage your user accounts</p>
                </div>
                <DataTable data={transformedUsers} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
}

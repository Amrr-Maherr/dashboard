"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import { ProtectedRoute } from "@/Providers/ProtectedRoute"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useBrands } from "@/Hooks/useBrands"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

function TableCellViewer({ item }: { item: { id: string; header: string } }) {
  const router = useRouter();

  return (
    <span className="text-foreground">
      <Button
        variant="link"
        className="text-foreground w-fit px-0 text-left h-auto p-0"
        onClick={() => router.push(`/dashboard/brands/${item.id}`)}
      >
        {item.header}
      </Button>
    </span>
  );
}

export default function BrandsPage() {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const { data: brandsResponse, isLoading, error } = useBrands(pageIndex, pageSize)

  if (isLoading) {
    return (
      <ProtectedRoute>
        <SidebarProvider>
          <AppSidebar variant="floating" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col items-center justify-center">
              <div className="text-lg">Loading brands...</div>
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
              <div className="text-lg text-red-500">Error loading brands</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ProtectedRoute>
    )
  }

  const brandsData = brandsResponse?.data || []
  const totalCount = brandsResponse?.total || 0

  const customColumns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Brand Name",
      cell: ({ row }: { row: any }) => {
        return <TableCellViewer item={{ id: row.original._id, header: row.original.name }} />
      },
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }: { row: any }) => (
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.slug}
        </Badge>
      ),
    },
    {
      accessorKey: "image",
      header: "Logo",
      cell: ({ row }: { row: any }) => (
        <img
          src={row.original.image}
          alt={row.original.name}
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
  ]

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar variant="floating" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6">
                  <h1 className="text-2xl font-bold">Brands Management</h1>
                  <p className="text-muted-foreground">Manage product brands ({totalCount} total brands)</p>
                </div>
                <DataTable
                  data={brandsData as any}
                  customColumns={customColumns as any}
                  totalCount={totalCount}
                  pageIndex={pageIndex}
                  pageSize={pageSize}
                  onPageChange={setPageIndex}
                  onPageSizeChange={setPageSize}
                  getRowId={(row) => row._id}
                />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  )
}

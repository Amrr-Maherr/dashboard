"use client"

import { DataTable } from "@/components/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"

interface OrderTableProps {
  data: any[]
  totalCount: number
  pageIndex: number
  pageSize: number
  onPageChange: (pageIndex: number) => void
  onPageSizeChange: (pageSize: number) => void
}

export function OrderTable({
  data,
  totalCount,
  pageIndex,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: OrderTableProps) {
  const customColumns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "Order ID",
      cell: ({ row }: { row: any }) => (
        <span>#{row.original.id}</span>
      ),
    },
    {
      accessorKey: "user",
      header: "Customer",
      cell: ({ row }: { row: any }) => (
        <span>{row.original.user?.name || row.original.user?.email || 'Unknown'}</span>
      ),
    },
    {
      accessorKey: "totalOrderPrice",
      header: "Total Price",
      cell: ({ row }: { row: any }) => (
        <span>${row.original.totalOrderPrice?.toFixed(2)}</span>
      ),
    },
    {
      accessorKey: "cartItems",
      header: "Items",
      cell: ({ row }: { row: any }) => (
        <span>{row.original.cartItems?.length || 0}</span>
      ),
    },
    {
      accessorKey: "isPaid",
      header: "Payment",
      cell: ({ row }: { row: any }) => (
        <Badge variant={row.original.isPaid ? "default" : "destructive"}>
          {row.original.isPaid ? "Paid" : "Pending"}
        </Badge>
      ),
    },
    {
      accessorKey: "isDelivered",
      header: "Delivery",
      cell: ({ row }: { row: any }) => (
        <Badge variant={row.original.isDelivered ? "default" : "secondary"}>
          {row.original.isDelivered ? "Delivered" : "Processing"}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }: { row: any }) => (
        <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
      ),
    },
  ]

  return (
    <DataTable
      data={data as any}
      customColumns={customColumns as any}
      totalCount={totalCount}
      pageIndex={pageIndex}
      pageSize={pageSize}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      getRowId={(row) => row.id}
    />
  )
}

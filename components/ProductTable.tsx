"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { exportToExcelAdvanced } from "@/lib/utils"
import { IconDownload } from "@tabler/icons-react"
import { SimpleDataTable } from "@/components/simple-data-table"

function TableCellViewer({ item }: { item: { id: string; header: string } }) {
  const router = useRouter();

  return (
    <span className="text-foreground">
      <Button
        variant="link"
        className="text-foreground w-fit px-0 text-left h-auto p-0"
        onClick={() => router.push(`/dashboard/products/${item.id}`)}
      >
        {item.header}
      </Button>
    </span>
  );
}

interface ProductTableProps {
  data: any[]
  totalCount: number
  pageIndex: number
  pageSize: number
  onPageChange: (pageIndex: number) => void
  onPageSizeChange: (pageSize: number) => void
}

export function ProductTable({
  data,
  totalCount,
  pageIndex,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: ProductTableProps) {
  const customColumns: ColumnDef<any>[] = [
    {
      accessorKey: "title",
      header: "Product Name",
      cell: ({ row }: { row: any }) => {
        return <TableCellViewer item={{ id: row.original.id, header: row.original.title }} />
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }: { row: any }) => (
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.category?.name || 'Unknown'}
        </Badge>
      ),
    },
    {
      accessorKey: "brand",
      header: "Brand",
      cell: ({ row }: { row: any }) => (
        <span>{row.original.brand?.name || 'Unknown'}</span>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }: { row: any }) => (
        <span>${row.original.price}</span>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Stock",
      cell: ({ row }: { row: any }) => (
        <Badge variant={row.original.quantity > 0 ? "default" : "destructive"}>
          {row.original.quantity}
        </Badge>
      ),
    },
    {
      accessorKey: "ratingsAverage",
      header: "Rating",
      cell: ({ row }: { row: any }) => (
        <span>⭐ {row.original.ratingsAverage?.toFixed(1) || 'N/A'}</span>
      ),
    },
  ]

  return (
    <SimpleDataTable
      data={data}
      columns={customColumns}
      totalCount={totalCount}
      pageIndex={pageIndex}
      pageSize={pageSize}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    />
  )
}

"use client"

import { DataTable } from "@/components/data-table"
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
        onClick={() => router.push(`/dashboard/categories/${item.id}`)}
      >
        {item.header}
      </Button>
    </span>
  );
}

interface CategoryTableProps {
  data: any[]
  totalCount: number
  pageIndex: number
  pageSize: number
  onPageChange: (pageIndex: number) => void
  onPageSizeChange: (pageSize: number) => void
}

export function CategoryTable({
  data,
  totalCount,
  pageIndex,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: CategoryTableProps) {
  const customColumns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Category Name",
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
      header: "Image",
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
    <DataTable
      data={data as any}
      customColumns={customColumns as any}
      totalCount={totalCount}
      pageIndex={pageIndex}
      pageSize={pageSize}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      getRowId={(row) => row._id}
    />
  )
}

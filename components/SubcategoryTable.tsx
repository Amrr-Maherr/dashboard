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
        onClick={() => router.push(`/dashboard/subcategories/${item.id}`)}
      >
        {item.header}
      </Button>
    </span>
  );
}

interface SubcategoryTableProps {
  data: any[]
  totalCount: number
  pageIndex: number
  pageSize: number
  onPageChange: (pageIndex: number) => void
  onPageSizeChange: (pageSize: number) => void
}

export function SubcategoryTable({
  data,
  totalCount,
  pageIndex,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: SubcategoryTableProps) {
  const customColumns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Subcategory Name",
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
      accessorKey: "category",
      header: "Category",
      cell: ({ row }: { row: any }) => (
        <span>{row.original.category}</span>
      ),
    },
  ]



  return <SimpleDataTable
    data={data}
    columns={customColumns}
    totalCount={totalCount}
    pageIndex={pageIndex}
    pageSize={pageSize}
    onPageChange={onPageChange}
    onPageSizeChange={onPageSizeChange}
  />
}

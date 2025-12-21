"use client"

import { DataTable } from "@/components/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { exportToExcelAdvanced } from "@/lib/utils"
import { IconDownload } from "@tabler/icons-react"

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

  const handleExport = () => {
    const exportData = data.map(item => ({
      'Subcategory ID': item._id,
      'Subcategory Name': item.name,
      'Slug': item.slug,
      'Category': item.category
    }));

    exportToExcelAdvanced(exportData, 'subcategories.xlsx', {
      sheetName: 'Subcategories'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleExport} variant="outline">
          <IconDownload className="mr-2 h-4 w-4" />
          Export to Excel
        </Button>
      </div>
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
    </div>
  )
}

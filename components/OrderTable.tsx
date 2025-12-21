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
        onClick={() => router.push(`/dashboard/orders/${item.id}`)}
      >
        {item.header}
      </Button>
    </span>
  );
}

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
      accessorKey: "header",
      header: "Cart ID",
      cell: ({ row }: { row: any }) => {
        return <TableCellViewer item={{ id: row.original.id, header: row.original.header }} />
      },
    },
    {
      accessorKey: "type",
      header: "Customer",
      cell: ({ row }: { row: any }) => (
        <span>{row.original.type}</span>
      ),
    },
    {
      accessorKey: "target",
      header: "Total Price",
      cell: ({ row }: { row: any }) => (
        <span>${row.original.target}</span>
      ),
    },
    {
      accessorKey: "limit",
      header: "Items Count",
      cell: ({ row }: { row: any }) => (
        <span>{row.original.limit} items</span>
      ),
    },
    {
      accessorKey: "reviewer",
      header: "Total Quantity",
      cell: ({ row }: { row: any }) => (
        <span>{row.original.reviewer} pcs</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: any }) => (
        <Badge variant="default">
          {row.original.status}
        </Badge>
      ),
    },
  ]

  const handleExport = () => {
    const exportData = data.map(item => ({
      'Order ID': item.id,
      'Cart ID': item.header,
      'Customer': item.type,
      'Total Price': item.target,
      'Items Count': item.limit,
      'Total Quantity': item.reviewer,
      'Status': item.status
    }));

    exportToExcelAdvanced(exportData, 'orders.xlsx', {
      sheetName: 'Orders'
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
        getRowId={(row) => row.id}
      />
    </div>
  )
}

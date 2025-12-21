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



  return <SimpleDataTable data={data} columns={customColumns} />
}

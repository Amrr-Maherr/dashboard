"use client"

import { useState } from "react"
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
        onClick={() => router.push(`/dashboard/users/${item.id}`)}
      >
        {item.header}
      </Button>
    </span>
  );
}

interface UserTableProps {
  data: any[]
  totalCount: number
  pageIndex: number
  pageSize: number
  onPageChange: (pageIndex: number) => void
  onPageSizeChange: (pageSize: number) => void
}

export function UserTable({
  data,
  totalCount,
  pageIndex,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: UserTableProps) {
  const customColumns: ColumnDef<any>[] = [
    {
      accessorKey: "header",
      header: "Name",
      cell: ({ row }: { row: any }) => {
        return <TableCellViewer item={{ id: row.original.id, header: row.original.header }} />
      },
    },
    {
      accessorKey: "type",
      header: "Role",
      cell: ({ row }: { row: any }) => (
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.type}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: any }) => (
        <Badge variant={row.original.status === 'Active' ? "default" : "secondary"}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "target",
      header: "Age",
      cell: ({ row }: { row: any }) => (
        <span>{row.original.target}</span>
      ),
    },
    {
      accessorKey: "limit",
      header: "Email",
      cell: ({ row }: { row: any }) => (
        <span>{row.original.limit}</span>
      ),
    },
    {
      accessorKey: "reviewer",
      header: "Phone",
      cell: ({ row }: { row: any }) => (
        <span>{row.original.reviewer}</span>
      ),
    },
  ]



  return <SimpleDataTable data={data} columns={customColumns} />
}

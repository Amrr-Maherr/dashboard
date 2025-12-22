"use client"

import { useState } from "react"
import { flexRender, getCoreRowModel, useReactTable, ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react"

interface SimpleDataTableProps {
  data: any[]
  columns: ColumnDef<any>[]
  pageSize?: number
  // Server-side pagination props
  totalCount?: number
  pageIndex?: number
  onPageChange?: (pageIndex: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

export function SimpleDataTable({
  data,
  columns,
  pageSize = 10,
  totalCount,
  pageIndex: externalPageIndex,
  onPageChange,
  onPageSizeChange
}: SimpleDataTableProps) {
  // Use server-side pagination if props provided, otherwise client-side
  const isServerSide = totalCount !== undefined && externalPageIndex !== undefined && onPageChange !== undefined

  const [clientPageIndex, setClientPageIndex] = useState(0)
  const [clientPageSize, setClientPageSize] = useState(pageSize)

  const currentPageIndex = isServerSide ? externalPageIndex : clientPageIndex
  const currentPageSize = isServerSide ? pageSize : clientPageSize
  const totalPages = isServerSide ? Math.ceil(totalCount / pageSize) : Math.ceil(data.length / pageSize)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: totalPages,
    state: {
      pagination: {
        pageIndex: currentPageIndex,
        pageSize: currentPageSize,
      },
    },
    onPaginationChange: (updater) => {
      if (isServerSide) {
        const newState = typeof updater === "function" ? updater({ pageIndex: currentPageIndex, pageSize: currentPageSize }) : updater
        onPageChange(newState.pageIndex)
        if (onPageSizeChange && newState.pageSize !== currentPageSize) {
          onPageSizeChange(newState.pageSize)
        }
      } else {
        const newState = typeof updater === "function" ? updater({ pageIndex: clientPageIndex, pageSize: clientPageSize }) : updater
        setClientPageIndex(newState.pageIndex)
        setClientPageSize(newState.pageSize)
      }
    },
    manualPagination: isServerSide,
  });

  const canPreviousPage = currentPageIndex > 0
  const canNextPage = currentPageIndex < totalPages - 1

  return (
    <div className="space-y-4">
      <div className="px-4 lg:px-6">
        <div className="rounded-lg border">
          <Table>
            <TableHeader className="bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 px-4 lg:px-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (isServerSide) {
                onPageChange(0)
              } else {
                setClientPageIndex(0)
              }
            }}
            disabled={!canPreviousPage}
          >
            <IconChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (isServerSide) {
                onPageChange(currentPageIndex - 1)
              } else {
                setClientPageIndex(clientPageIndex - 1)
              }
            }}
            disabled={!canPreviousPage}
          >
            <IconChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPageIndex + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (isServerSide) {
                onPageChange(currentPageIndex + 1)
              } else {
                setClientPageIndex(clientPageIndex + 1)
              }
            }}
            disabled={!canNextPage}
          >
            <IconChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (isServerSide) {
                onPageChange(totalPages - 1)
              } else {
                setClientPageIndex(totalPages - 1)
              }
            }}
            disabled={!canNextPage}
          >
            <IconChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

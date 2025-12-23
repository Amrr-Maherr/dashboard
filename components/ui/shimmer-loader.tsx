import { Skeleton } from "@/components/ui/skeleton"

interface ShimmerLoaderProps {
  rows?: number
  columns?: number
  showPagination?: boolean
}

export function ShimmerLoader({
  rows = 5,
  columns = 4,
  showPagination = true
}: ShimmerLoaderProps) {
  return (
    <div className="space-y-4">
      <div className="px-4 lg:px-6">
        <div className="rounded-lg border">
          <div className="bg-muted">
            <div className="flex">
              {Array.from({ length: columns }).map((_, index) => (
                <div key={index} className="flex-1 p-4">
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          </div>
          <div>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex border-t">
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <div key={colIndex} className="flex-1 p-4">
                    {colIndex === 0 ? (
                      <Skeleton className="h-4 w-2/3" />
                    ) : colIndex === columns - 1 ? (
                      <Skeleton className="h-6 w-16 rounded-full" />
                    ) : (
                      <Skeleton className="h-4 w-1/2" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showPagination && (
        <div className="flex items-center justify-center space-x-2 px-4 lg:px-6">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
        </div>
      )}
    </div>
  )
}

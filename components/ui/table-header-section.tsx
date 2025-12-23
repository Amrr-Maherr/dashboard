import { Button } from "@/components/ui/button"
import { IconDownload } from "@tabler/icons-react"

interface TableHeaderSectionProps {
  title: string
  description: string
  totalCount?: number
  onExport?: () => void
  exportDisabled?: boolean
}

export function TableHeaderSection({
  title,
  description,
  totalCount,
  onExport,
  exportDisabled = false
}: TableHeaderSectionProps) {
  const descriptionWithCount = totalCount !== undefined
    ? description.replace("{totalCount}", totalCount.toString())
    : description

  return (
    <div className="px-4 lg:px-6 flex flex-wrap gap-[15px] items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">
          {descriptionWithCount}
        </p>
      </div>
      {onExport && (
        <Button
          onClick={onExport}
          variant="outline"
          disabled={exportDisabled}
        >
          <IconDownload className="mr-2 h-4 w-4" />
          Export Excel
        </Button>
      )}
    </div>
  )
}

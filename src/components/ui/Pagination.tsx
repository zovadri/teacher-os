import { cn } from "@/lib/utils"
import { HiChevronRight, HiChevronLeft } from "react-icons/hi"

interface PaginationProps {
  current: number
  total: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ current, total, onPageChange, className }: PaginationProps) {
  if (total <= 1) return null

  return (
    <div className={cn("flex items-center justify-between text-sm", className)}>
      <span className="text-text-secondary">
        الصفحة {current} من {total}
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.min(current + 1, total))}
          disabled={current === total}
          className="p-2 rounded-[10px] text-text-secondary hover:bg-card hover:text-text disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <HiChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => onPageChange(Math.max(current - 1, 1))}
          disabled={current === 1}
          className="p-2 rounded-[10px] text-text-secondary hover:bg-card hover:text-text disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <HiChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

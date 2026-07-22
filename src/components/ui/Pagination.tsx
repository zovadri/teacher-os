"use client"

import { cn } from "@/lib/utils"
import { HiChevronRight, HiChevronLeft } from "react-icons/hi"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages: (number | "ellipsis")[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== "ellipsis") {
      pages.push("ellipsis")
    }
  }

  return (
    <div className={cn("flex items-center justify-center gap-1.5", className)}>
      <button type="button" onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}
        className="p-2 rounded-[12px] hover:bg-card/60 disabled:opacity-30 disabled:cursor-not-allowed text-text-secondary transition-all"
      >
        <HiChevronRight className="w-4 h-4" />
      </button>
      {pages.map((page, i) =>
        page === "ellipsis" ? (
          <span key={`e-${i}`} className="px-2 text-text-tertiary text-sm">...</span>
        ) : (
          <button type="button" key={page} onClick={() => onPageChange(page)}
            className={cn(
              "min-w-[36px] h-9 rounded-[12px] text-sm font-medium transition-all",
              page === currentPage
                ? "bg-primary/20 border border-primary/30 text-primary"
                : "text-text-secondary hover:bg-card/60 hover:text-text",
            )}
          >
            {page}
          </button>
        ),
      )}
      <button type="button" onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}
        className="p-2 rounded-[12px] hover:bg-card/60 disabled:opacity-30 disabled:cursor-not-allowed text-text-secondary transition-all"
      >
        <HiChevronLeft className="w-4 h-4" />
      </button>
    </div>
  )
}

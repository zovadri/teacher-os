"use client"

import { memo } from "react"
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

  const getPages = () => {
    const pages: (number | "...")[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push("...")
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i)
      if (currentPage < totalPages - 2) pages.push("...")
      pages.push(totalPages)
    }
    return pages
  }

  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      <button type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg hover:bg-surface-secondary disabled:opacity-30 disabled:cursor-not-allowed text-text-secondary"
      >
        <HiChevronRight className="w-5 h-5" />
      </button>
      {getPages().map((page, idx) =>
        page === "..." ? (
          <span key={`dots-${idx}`} className="px-2 text-text-tertiary">...</span>
        ) : (
          <button type="button"
            key={page}
            onClick={() => onPageChange(page as number)}
            className={cn(
              "min-w-[36px] h-9 rounded-lg text-sm font-medium transition-colors",
              currentPage === page
                ? "bg-primary text-white"
                : "text-text-secondary hover:bg-surface-secondary"
            )}
          >
            {page}
          </button>
        )
      )}
      <button type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg hover:bg-surface-secondary disabled:opacity-30 disabled:cursor-not-allowed text-text-secondary"
      >
        <HiChevronLeft className="w-5 h-5" />
      </button>
    </div>
  )
}

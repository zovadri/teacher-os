"use client"

import { cn } from "@/lib/utils"

interface Column<T> {
  key: string
  header: string | React.ReactNode
  render?: (item: T) => React.ReactNode
  className?: string
  mobileLabel?: string
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (item: T) => void
  emptyMessage?: string
  className?: string
  mobileCard?: boolean
}

export function Table<T extends Record<string, any>>({
  columns, data, onRowClick, emptyMessage = "لا توجد بيانات", className, mobileCard = true,
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-2xl bg-card/60 backdrop-blur border border-border flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <p className="text-sm text-text-secondary">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <>
      {/* Desktop: Table */}
      <div className={cn("hidden sm:block overflow-x-auto", className)}>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th key={col.key} className={cn("text-right text-xs font-medium text-text-tertiary px-4 py-3.5 whitespace-nowrap", col.className)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr
                key={item.id || i}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  "border-b border-border/50 transition-all duration-200",
                  onRowClick && "cursor-pointer",
                  "hover:bg-card/40",
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn("px-4 py-3.5 text-sm text-text", col.className)}>
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: Card layout */}
      <div className={cn("sm:hidden space-y-3", className)}>
        {data.map((item, i) => (
          <div
            key={item.id || i}
            onClick={() => onRowClick?.(item)}
            className={cn(
              "bg-card/60 backdrop-blur-xl border border-border rounded-[20px] p-4",
              "shadow-[0_4px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.03)]",
              "transition-all duration-250",
              onRowClick && "cursor-pointer",
              "hover:-translate-y-0.5",
            )}
          >
            <div className="space-y-2.5">
              {columns.map((col) => (
                <div key={col.key} className="flex items-center justify-between">
                  <span className="text-xs text-text-tertiary">{col.mobileLabel || (typeof col.header === "string" ? col.header : "")}</span>
                  <span className="text-sm text-text">
                    {col.render ? col.render(item) : item[col.key]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

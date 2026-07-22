import { cn } from "@/lib/utils"

interface Column<T> {
  key: string
  header: string
  render?: (item: T) => React.ReactNode
  className?: string
  sortable?: boolean
  mobileLabel?: string
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  className?: string
  onRowClick?: (item: T) => void
  emptyMessage?: string
  mobileCard?: boolean
}

export function Table<T extends Record<string, any>>({ columns, data, className, onRowClick, emptyMessage = "لا توجد بيانات", mobileCard = true }: TableProps<T>) {
  return (
    <>
      <div className="hidden md:block overflow-x-auto rounded-[24px] border border-border shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)]">
        <table className={cn("w-full text-sm", className)}>
          <thead>
            <tr className="bg-surface/50">
              {columns.map((col) => (
                <th key={col.key} className={cn("text-right px-4 py-3 font-medium text-text-secondary whitespace-nowrap text-xs tracking-wide", col.className)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-12 text-text-tertiary">{emptyMessage}</td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr
                  key={item.id || idx}
                  onClick={() => onRowClick?.(item)}
                  className={cn(
                    "border-t border-border transition-colors",
                    onRowClick && "cursor-pointer hover:bg-surface-secondary/30"
                  )}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={cn("px-4 py-3 text-text", col.className)}>
                      {col.render ? col.render(item) : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {mobileCard && (
        <div className="md:hidden space-y-3">
          {data.length === 0 ? (
            <p className="text-center py-12 text-text-tertiary">{emptyMessage}</p>
          ) : (
            data.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  "bg-surface border border-border rounded-[20px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.15)]",
                  onRowClick && "cursor-pointer"
                )}
              >
                {columns.map((col) => {
                  if (col.key === "select") {
                    return col.render ? col.render(item) : null
                  }
                  return (
                    <div key={col.key} className="flex items-center justify-between py-1.5">
                      <span className="text-xs text-text-tertiary">{col.mobileLabel || col.header}</span>
                      <span className="text-sm text-text">
                        {col.render ? col.render(item) : item[col.key]}
                      </span>
                    </div>
                  )
                })}
              </div>
            ))
          )}
        </div>
      )}
    </>
  )
}

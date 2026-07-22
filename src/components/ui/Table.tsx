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
      <div className="hidden md:block overflow-x-auto rounded-[20px] border border-[rgba(255,255,255,0.06)]">
        <table className={cn("w-full text-sm", className)}>
          <thead>
            <tr className="bg-white/[0.03]">
              {columns.map((col) => (
                <th key={col.key} className={cn("text-right px-4 py-3 font-medium text-[#94A3B8] whitespace-nowrap text-xs tracking-wide", col.className)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-12 text-[#64748B]">{emptyMessage}</td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr
                  key={item.id || idx}
                  onClick={() => onRowClick?.(item)}
                  className={cn(
                    "border-t border-[rgba(255,255,255,0.06)] transition-colors",
                    onRowClick && "cursor-pointer hover:bg-white/[0.02]"
                  )}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={cn("px-4 py-3 text-[#F8FAFC]", col.className)}>
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
            <p className="text-center py-12 text-[#64748B]">{emptyMessage}</p>
          ) : (
            data.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  "bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-[20px] p-4",
                  onRowClick && "cursor-pointer"
                )}
              >
                {columns.map((col) => {
                  if (col.key === "select") {
                    return col.render ? col.render(item) : null
                  }
                  return (
                    <div key={col.key} className="flex items-center justify-between py-1.5">
                      <span className="text-xs text-[#64748B]">{col.mobileLabel || col.header}</span>
                      <span className="text-sm text-[#F8FAFC]">
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

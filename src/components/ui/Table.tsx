import { cn } from "@/lib/utils"

interface Column<T> {
  key: string
  header: string
  render?: (item: T) => React.ReactNode
  className?: string
  sortable?: boolean
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  className?: string
  onRowClick?: (item: T) => void
  emptyMessage?: string
}

export function Table<T extends Record<string, any>>({ columns, data, className, onRowClick, emptyMessage = "لا توجد بيانات" }: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className={cn("w-full text-sm", className)}>
        <thead>
          <tr className="bg-surface-tertiary">
            {columns.map((col) => (
              <th key={col.key} className={cn("text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap", col.className)}>
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
                  "border-b border-border/50 last:border-0 transition-colors",
                  onRowClick && "cursor-pointer hover:bg-surface-tertiary/50"
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
  )
}

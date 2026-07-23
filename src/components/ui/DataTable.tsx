"use client"

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { HiChevronRight, HiChevronLeft } from "react-icons/hi"

interface Column<T> {
  key: string
  label: string
  render?: (item: T) => React.ReactNode
  sortable?: boolean
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  pageSize?: number
  searchable?: boolean
  searchKeys?: (keyof T)[]
  className?: string
}

export function DataTable<T extends Record<string, any>>({ data, columns, pageSize = 10, searchable, searchKeys, className }: DataTableProps<T>) {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")

  const filtered = useMemo(() => {
    if (!search || !searchKeys) return data
    const q = search.toLowerCase()
    return data.filter(item => searchKeys.some(key => String(item[key]).toLowerCase().includes(q)))
  }, [data, search, searchKeys])

  const sorted = useMemo(() => {
    if (!sortKey) return filtered
    return [...filtered].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey]
      const cmp = typeof av === "number" ? av - bv : String(av).localeCompare(String(bv))
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [filtered, sortKey, sortDir])

  const totalPages = Math.ceil(sorted.length / pageSize)
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className={cn("space-y-4", className)}>
      {searchable && (
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          placeholder="بحث..."
          className="w-full bg-card/70 backdrop-blur-sm border border-border rounded-[14px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50 focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30"
        />
      )}
      <div className="w-full overflow-auto rounded-[16px] border border-border">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border bg-card/50">
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => {
                    if (col.sortable) {
                      setSortKey(col.key)
                      setSortDir(d => d === "asc" ? "desc" : "asc")
                    }
                  }}
                  className={cn(
                    "px-4 py-3 text-right text-sm font-medium text-text-secondary",
                    col.sortable && "cursor-pointer hover:text-text select-none",
                    col.className,
                  )}
                >
                  {col.label}
                  {sortKey === col.key && (
                    <span className="mr-1 text-primary">{sortDir === "asc" ? "↑" : "↓"}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginated.map((item, i) => (
              <tr key={i} className="transition-colors hover:bg-card/30">
                {columns.map(col => (
                  <td key={col.key} className={cn("px-4 py-3 text-sm text-text", col.className)}>
                    {col.render ? col.render(item) : String(item[col.key])}
                  </td>
                ))}
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center py-12 text-text-secondary text-sm">
                  لا توجد نتائج
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">
            الصفحة {page} من {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages} className="p-2 rounded-[10px] text-text-secondary hover:bg-card hover:text-text disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <HiChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1} className="p-2 rounded-[10px] text-text-secondary hover:bg-card hover:text-text disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <HiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

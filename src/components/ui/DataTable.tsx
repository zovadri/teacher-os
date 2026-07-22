"use client"

import { useState, useMemo, useCallback } from "react"
import { cn } from "@/lib/utils"
import { SearchInput } from "./SearchInput"
import { Table } from "./Table"
import { HiSortAscending, HiSortDescending, HiChevronRight, HiChevronLeft } from "react-icons/hi"
import Button from "./Button"

export interface DataColumn<T> {
  key: string
  header: string
  render?: (item: T) => React.ReactNode
  className?: string
  sortable?: boolean
  mobileLabel?: string
  filterable?: boolean
}

export interface FilterOption {
  key: string
  label: string
  options: { value: string; label: string }[]
}

interface DataTableProps<T> {
  columns: DataColumn<T>[]
  data: T[]
  className?: string
  onRowClick?: (item: T) => void
  emptyMessage?: string
  searchable?: boolean
  searchKeys?: string[]
  searchPlaceholder?: string
  pageSize?: number
  filters?: FilterOption[]
  mobileCard?: boolean
  actions?: React.ReactNode
}

export function DataTable<T extends Record<string, any>>({
  columns, data, className, onRowClick, emptyMessage, searchable = false,
  searchKeys, searchPlaceholder, pageSize = 10, filters, mobileCard = true, actions,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

  const filtered = useMemo(() => {
    let items = [...data]
    if (search && searchKeys) {
      const q = search.toLowerCase()
      items = items.filter((item) => searchKeys.some((key) => String(item[key] || "").toLowerCase().includes(q)))
    }
    Object.entries(activeFilters).forEach(([key, val]) => {
      if (val) items = items.filter((item) => String(item[key]) === val)
    })
    if (sortKey) {
      items.sort((a, b) => {
        const av = a[sortKey], bv = b[sortKey]
        if (typeof av === "number" && typeof bv === "number") return sortDir === "asc" ? av - bv : bv - av
        return sortDir === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av))
      })
    }
    return items
  }, [data, search, searchKeys, sortKey, sortDir, activeFilters])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handleSort = useCallback((key: string) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    else { setSortKey(key); setSortDir("asc") }
    setCurrentPage(1)
  }, [sortKey])

  const sortableColumns = columns.map((col) => ({
    ...col,
    header: col.sortable ? (
      <button type="button" onClick={() => handleSort(col.key)} className="flex items-center gap-1 hover:text-text transition-colors group">
        {col.header}
        {sortKey === col.key ? (
          sortDir === "asc" ? <HiSortAscending className="w-3.5 h-3.5" /> : <HiSortDescending className="w-3.5 h-3.5" />
        ) : (
          <HiSortAscending className="w-3.5 h-3.5 opacity-0 group-hover:opacity-50" />
        )}
      </button>
    ) : col.header,
  }))

  return (
    <div className={cn("space-y-4", className)}>
      {(searchable || (filters && filters.length > 0) || actions) && (
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {searchable && (
            <SearchInput value={search} onChange={(v) => { setSearch(v); setCurrentPage(1) }} placeholder={searchPlaceholder || "بحث..."} className="sm:max-w-xs" />
          )}
          {filters?.map((f) => (
            <select key={f.key} value={activeFilters[f.key] || ""} onChange={(e) => { setActiveFilters((p) => ({ ...p, [f.key]: e.target.value })); setCurrentPage(1) }}
              className="bg-card/60 backdrop-blur border border-border rounded-[16px] px-3.5 py-2.5 text-sm text-text appearance-none transition-all shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)] focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">{f.label}</option>
              {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          ))}
          {actions && <div className="sm:mr-auto">{actions}</div>}
        </div>
      )}

      <Table columns={sortableColumns as any} data={paginated} onRowClick={onRowClick} emptyMessage={emptyMessage} mobileCard={mobileCard} />

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button type="button" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}
            className="p-2 rounded-[12px] hover:bg-card disabled:opacity-30 disabled:cursor-not-allowed text-text-secondary transition-all"
          >
            <HiChevronRight className="w-5 h-5" />
          </button>
          <span className="text-sm text-text-secondary">{currentPage} / {totalPages}</span>
          <button type="button" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}
            className="p-2 rounded-[12px] hover:bg-card disabled:opacity-30 disabled:cursor-not-allowed text-text-secondary transition-all"
          >
            <HiChevronLeft className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}

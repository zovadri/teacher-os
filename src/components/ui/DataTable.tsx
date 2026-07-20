"use client"

import { useState, useMemo, useCallback, memo } from "react"
import { cn } from "@/lib/utils"
import Button from "./Button"
import { SearchInput } from "./SearchInput"
import { Pagination } from "./Pagination"
import Select from "./Select"
import { EmptyState } from "./EmptyState"
import { Skeleton } from "./Skeleton"
import { handleExport, type ExportFormat } from "@/lib/print-utils"
import { HiFilter, HiX, HiChevronUp, HiChevronDown, HiEye } from "react-icons/hi"
import { toast } from "react-hot-toast"

export interface DataColumn<T> {
  key: string
  header: string
  render?: (item: T) => React.ReactNode
  className?: string
  sortable?: boolean
  hideable?: boolean
  hidden?: boolean
  width?: string
}

export interface FilterOption {
  key: string
  label: string
  options: { value: string; label: string }[]
  defaultValue?: string
}

interface DataTableProps<T> {
  columns: DataColumn<T>[]
  data: T[]
  id?: string
  pageSize?: number
  searchable?: boolean
  searchKeys?: string[]
  searchPlaceholder?: string
  sortable?: boolean
  selectable?: boolean
  exportable?: boolean
  printable?: boolean
  filters?: FilterOption[]
  quickFilters?: { label: string; filter: (item: T) => boolean }[]
  filename?: string
  loading?: boolean
  emptyMessage?: string
  onRowClick?: (item: T) => void
  onSelectionChange?: (selected: T[]) => void
  bulkActions?: { label: string; icon?: React.ReactNode; onClick: (selected: T[]) => void; variant?: "primary" | "danger" | "ghost" }[]
  stickyHeader?: boolean
  skeletonRows?: number
  noCard?: boolean
  className?: string
}

function DataTableInner<T extends Record<string, unknown>>({
  columns: rawColumns, data, pageSize = 10, searchable = true, searchKeys, searchPlaceholder = "ط¨ط­ط«...",
  sortable = true, selectable = false, exportable = true, printable = true, filters, quickFilters,
  filename = "export", loading, emptyMessage = "ظ„ط§ طھظˆط¬ط¯ ط¨ظٹط§ظ†ط§طھ", onRowClick,
  onSelectionChange, bulkActions, stickyHeader = true, skeletonRows = 5,
  noCard, className, id,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  const [quickFilter, setQuickFilter] = useState<number | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(rawColumns.filter((c) => !c.hidden).map((c) => c.key))
  )
  const [showColumnMenu, setShowColumnMenu] = useState(false)

  const columns = useMemo(() => rawColumns.filter((c) => visibleColumns.has(c.key)), [rawColumns, visibleColumns])

  const filtered = useMemo(() => {
    let result = [...data]
    if (search && searchKeys) {
      const q = search.toLowerCase()
      result = result.filter((item) => searchKeys.some((k) => String(item[k] ?? "").toLowerCase().includes(q)))
    }
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value) result = result.filter((item) => String(item[key] ?? "") === value)
    })
    if (quickFilter !== null && quickFilters?.[quickFilter]) {
      result = result.filter(quickFilters[quickFilter].filter)
    }
    return result
  }, [data, search, searchKeys, activeFilters, quickFilter, quickFilters])

  const sorted = useMemo(() => {
    if (!sortKey || !sortable) return filtered
    return [...filtered].sort((a, b) => {
      const va = a[sortKey], vb = b[sortKey]
      if (va == null) return 1; if (vb == null) return -1
      const cmp = typeof va === "number" ? va - vb : String(va).localeCompare(String(vb))
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [filtered, sortKey, sortDir, sortable])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const safePage = Math.min(currentPage, totalPages)
  const pageData = sorted.slice((safePage - 1) * pageSize, safePage * pageSize)

  const toggleSort = (key: string) => {
    if (!sortable) return
    if (sortKey === key) { setSortDir((d) => (d === "asc" ? "desc" : "asc")) }
    else { setSortKey(key); setSortDir("asc") }
  }

  const toggleSelect = (id: string) => {
    const next = new Set(selected)
    if (next.has(id)) { next.delete(id) } else { next.add(id) }
    setSelected(next); onSelectionChange?.(data.filter((d) => next.has(String(d.id ?? ""))))
  }
  const toggleAll = () => {
    if (selected.size === pageData.length) { setSelected(new Set()); onSelectionChange?.([]) }
    else {
      const ids = new Set(pageData.map((d) => String(d.id ?? "")))
      setSelected(ids); onSelectionChange?.(pageData)
    }
  }

  const resetFilters = () => { setActiveFilters({}); setQuickFilter(null); setSearch(""); setCurrentPage(1) }
  const hasActiveFilters = Object.values(activeFilters).some(Boolean) || quickFilter !== null || search

  const tableId = id || "data-table"

  const exportData = useMemo(() => {
    return sorted.map((row) => {
      const obj: Record<string, unknown> = {}
      columns.forEach((col) => { obj[col.header] = col.render ? "" : row[col.key] })
      return obj
    })
  }, [sorted, columns])

  const ExportButton = ({ format }: { format: ExportFormat }) => (
    <button type="button" onClick={() => handleExport(format, exportData, tableId, filename)}
      className="px-2 py-1 text-xs rounded-md border border-border hover:bg-surface-secondary transition-colors">
      {format === "csv" ? "CSV" : format === "excel" ? "Excel" : format === "pdf" ? "PDF" : "ط·ط¨ط§ط¹ط©"}
    </button>
  )

  if (loading) {
    return <Skeleton rows={skeletonRows} cols={columns.length} />
  }

  return (
    <div className={cn("space-y-4", className)} id={tableId}>
      {searchable || filters || quickFilters || exportable || printable ? (
        <div className="flex flex-wrap items-center gap-2">
          {searchable ? (
            <div className="flex-1 min-w-[200px]"><SearchInput value={search} onChange={setSearch} placeholder={searchPlaceholder} /></div>
          ) : <div className="flex-1" />}
          {quickFilters?.map((qf, i) => (
            <button key={i} type="button" onClick={() => setQuickFilter(quickFilter === i ? null : i)}
              className={cn("px-3 py-1.5 text-xs rounded-lg border transition-colors",
                quickFilter === i ? "bg-primary text-white border-primary" : "border-border hover:bg-surface-secondary")}>
              {qf.label}
            </button>
          ))}
          {filters && filters.length > 0 ? (
            <button type="button" onClick={() => setShowFilters(!showFilters)}
              className={cn("flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border transition-colors",
                hasActiveFilters ? "bg-primary/10 border-primary text-primary" : "border-border hover:bg-surface-secondary")}>
              <HiFilter className="w-3.5 h-3.5" /> ظپظ„طھط± {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
            </button>
          ) : null}
          {selectable && bulkActions && selected.size > 0 ? (
            <span className="text-xs text-text-secondary px-2">{selected.size} ظ…ط­ط¯ط¯</span>
          ) : null}
          <div className="flex items-center gap-1 mr-auto">
            <div className="relative">
              <button type="button" onClick={() => setShowColumnMenu(!showColumnMenu)}
                className="p-1.5 rounded-lg border border-border hover:bg-surface-secondary">
                <HiEye className="w-4 h-4" />
              </button>
              {showColumnMenu ? (
                <div className="absolute left-0 top-full mt-1 z-50 w-44 bg-surface border border-border rounded-xl shadow-xl p-2 space-y-1">
                  {rawColumns.filter((c) => c.hideable).map((col) => (
                    <label key={col.key} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-secondary text-xs cursor-pointer">
                      <input type="checkbox" checked={visibleColumns.has(col.key)}
                        onChange={() => {
                          const next = new Set(visibleColumns)
                          if (next.has(col.key)) { next.delete(col.key) } else { next.add(col.key) }
                          setVisibleColumns(next)
                        }} className="rounded border-border" />
                      {col.header}
                    </label>
                  ))}
                </div>
              ) : null}
            </div>
            {exportable ? (
              <div className="flex items-center gap-1">
                <ExportButton format="csv" />
                <ExportButton format="excel" />
                {printable ? <ExportButton format="print" /> : null}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {showFilters && filters ? (
        <div className="flex flex-wrap gap-3 p-3 rounded-xl bg-surface-secondary border border-border">
          {filters.map((f) => (
            <div key={f.key} className="min-w-[150px]">
              <Select
                value={activeFilters[f.key] || f.defaultValue || ""}
                onChange={(v) => { setActiveFilters((prev) => ({ ...prev, [f.key]: v })); setCurrentPage(1) }}
                options={[{ value: "", label: `ظƒظ„ ${f.label}` }, ...f.options]}
              />
            </div>
          ))}
          {hasActiveFilters ? (
            <button type="button" onClick={resetFilters}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-error hover:bg-error/10 rounded-lg transition-colors">
              <HiX className="w-3.5 h-3.5" /> ط¥ط¹ط§ط¯ط© طھط¹ظٹظٹظ†
            </button>
          ) : null}
        </div>
      ) : null}

      {selectable && selected.size > 0 && bulkActions ? (
        <div className="flex items-center gap-2 p-2 bg-primary/5 rounded-xl border border-primary/20">
          <span className="text-xs text-text-secondary px-2">{selected.size} ظ…ط­ط¯ط¯</span>
          {bulkActions.map((action, i) => (
            <Button key={i} size="sm" variant={action.variant || "ghost"} onClick={() => { action.onClick(data.filter((d) => selected.has(String(d.id ?? "")))); setSelected(new Set()) }}>
              {action.icon} {action.label}
            </Button>
          ))}
        </div>
      ) : null}

      <div className={cn("overflow-x-auto", stickyHeader && "max-h-[600px]")}>
        <table className={cn("w-full text-sm border-collapse", noCard ? "" : "border border-border rounded-xl")}>
          <thead>
            <tr className={cn("bg-surface-secondary border-b border-border", stickyHeader && "sticky top-0 z-10")}>
              {selectable ? (
                <th className="px-3 py-3 w-10">
                  <input type="checkbox" checked={selected.size === pageData.length && pageData.length > 0}
                    onChange={toggleAll} className="rounded border-border" />
                </th>
              ) : null}
              {columns.map((col) => (
                <th key={col.key}
                  onClick={() => col.sortable !== false && toggleSort(col.key)}
                  className={cn(
                    "text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap",
                    col.sortable !== false && sortable && "cursor-pointer select-none hover:text-text",
                    col.className
                  )}
                  style={col.width ? { width: col.width } : undefined}
                >
                  <span className="flex items-center gap-1">
                    {col.header}
                    {sortKey === col.key ? (
                      sortDir === "asc" ? <HiChevronUp className="w-3.5 h-3.5" /> : <HiChevronDown className="w-3.5 h-3.5" />
                    ) : null}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 ? (
              <tr><td colSpan={columns.length + (selectable ? 1 : 0)} className="py-12"><EmptyState message={emptyMessage} /></td></tr>
            ) : (
              pageData.map((item, idx) => (
                <tr key={String(item.id ?? idx)}
                  onClick={() => onRowClick?.(item)}
                  className={cn(
                    "border-b border-border last:border-0 transition-colors",
                    onRowClick && "cursor-pointer hover:bg-surface-secondary",
                    selected.has(String(item.id ?? "")) && "bg-primary/5"
                  )}
                >
                  {selectable ? (
                    <td className="px-3 py-3">
                      <input type="checkbox" checked={selected.has(String(item.id ?? ""))}
                        onChange={() => toggleSelect(String(item.id ?? ""))}
                        onClick={(e) => e.stopPropagation()} className="rounded border-border" />
                    </td>
                  ) : null}
                  {columns.map((col) => (
                    <td key={col.key} className={cn("px-4 py-3 text-text", col.className)}>
                      {col.render ? col.render(item) : String(item[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 ? (
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-tertiary">{sorted.length} ظ†طھظٹط¬ط©</span>
          <Pagination current={safePage} total={totalPages} onChange={setCurrentPage} />
        </div>
      ) : null}
    </div>
  )
}

export const DataTable = memo(DataTableInner) as typeof DataTableInner & { displayName: string }
DataTable.displayName = "DataTable"

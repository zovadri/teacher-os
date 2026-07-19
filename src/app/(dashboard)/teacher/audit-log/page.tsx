"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineClipboardList, HiOutlineFilter, HiOutlineSearch,
  HiOutlineDownload, HiOutlineCalendar, HiOutlineUser, HiOutlineShieldCheck,
} from "react-icons/hi"
import toast from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Pagination } from "@/components/ui/Pagination"
import Button from "@/components/ui/Button"
import { SearchInput } from "@/components/ui/SearchInput"
import Select from "@/components/ui/Select"
import { CardSkeleton, StatsSkeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { cn, formatDate, formatRelativeTime } from "@/lib/utils"
import { mockAuditLogs } from "@/lib/mock/data"

const actionConfig: Record<string, { label: string; variant: "info" | "neutral" | "success" | "warning" | "error" | "premium" }> = {
  login: { label: "طھط³ط¬ظٹظ„ ط¯ط®ظˆظ„", variant: "info" },
  logout: { label: "طھط³ط¬ظٹظ„ ط®ط±ظˆط¬", variant: "neutral" },
  create: { label: "ط¥ظ†ط´ط§ط،", variant: "success" },
  edit: { label: "طھط¹ط¯ظٹظ„", variant: "warning" },
  delete: { label: "ط­ط°ظپ", variant: "error" },
  payment: { label: "ط¯ظپط¹", variant: "premium" },
  attendance: { label: "ط­ط¶ظˆط±", variant: "info" },
  exam: { label: "ط§ظ…طھط­ط§ظ†", variant: "warning" },
  homework: { label: "ظˆط§ط¬ط¨", variant: "success" },
}

const modules = [...new Set(mockAuditLogs.map((l) => l.module))]
const actions = [...new Set(mockAuditLogs.map((l) => l.action))]

const PAGE_SIZE = 10

export default function AuditLogPage() {
  const [logs] = useState(mockAuditLogs)
  const [search, setSearch] = useState("")
  const [actionFilter, setActionFilter] = useState("all")
  const [moduleFilter, setModuleFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const loadData = useCallback(() => {
    setIsLoading(true)
    setHasError(false)
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  const stats = useMemo(() => {
    const today = new Date()
    const todayLogs = logs.filter((l) => l.timestamp.toDateString() === today.toDateString())
    const actionBreakdown = actions.reduce((acc, a) => ({ ...acc, [a]: logs.filter((l) => l.action === a).length }), {} as Record<string, number>)
    return { today: todayLogs.length, total: logs.length, actionBreakdown }
  }, [logs])

  const filtered = useMemo(() => {
    return logs.filter((l) => {
      const matchSearch = l.userName.includes(search) || l.description.includes(search) || l.ip.includes(search)
      const matchAction = actionFilter === "all" || l.action === actionFilter
      const matchModule = moduleFilter === "all" || l.module === moduleFilter
      return matchSearch && matchAction && matchModule
    })
  }, [search, actionFilter, moduleFilter, logs])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleExport = () => {
    toast.success("ط³ظٹطھظ… طھطµط¯ظٹط± ط§ظ„ط³ط¬ظ„ ط¥ظ„ظ‰ Excel")
  }

  if (hasError) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <DashboardHeader title="ط³ط¬ظ„ ط§ظ„طھط¯ظ‚ظٹظ‚" subtitle="ظ…ط±ط§ظ‚ط¨ط© ظ†ط´ط§ط· ط§ظ„ظ†ط¸ط§ظ…" />
        <ErrorState onRetry={() => { setHasError(false); loadData() }} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <DashboardHeader title="ط³ط¬ظ„ ط§ظ„طھط¯ظ‚ظٹظ‚" subtitle="ظ…ط±ط§ظ‚ط¨ط© ظ†ط´ط§ط· ط§ظ„ظ†ط¸ط§ظ…" />
      <div className="flex justify-end">
        <button type="button" variant="secondary" leftIcon={<HiOutlineDownload className="w-4 h-4" />} onClick={handleExport}>
          طھطµط¯ظٹط±
        </Button>
      </div>

      {isLoading ? (
        <StatsSkeleton count={4} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط³ط¬ظ„ط§طھ" value={stats.total} icon={HiOutlineClipboardList} color="primary" />
          <StatsCard title="ط³ط¬ظ„ط§طھ ط§ظ„ظٹظˆظ…" value={stats.today} icon={HiOutlineCalendar} color="info" />
          <StatsCard title="ط§ظ„ط¥ط¬ط±ط§ط،ط§طھ" value={actions.length} icon={HiOutlineFilter} color="warning" subtitle="ظ†ظˆط¹ ط¥ط¬ط±ط§ط،" />
          <StatsCard title="ط§ظ„ظˆط­ط¯ط§طھ" value={modules.length} icon={HiOutlineShieldCheck} color="success" subtitle="ظˆط­ط¯ط© ظ†ط¸ط§ظ…" />
        </motion.div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>ط³ط¬ظ„ ط§ظ„ظ†ط´ط§ط·ط§طھ</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 border-b border-border flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1) }} placeholder="ط¨ط­ط« ط¨ط§ط³ظ… ط§ظ„ظ…ط³طھط®ط¯ظ… ط£ظˆ IP..." />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select options={[{ value: "all", label: "ط¬ظ…ظٹط¹ ط§ظ„ط¥ط¬ط±ط§ط،ط§طھ" }, ...actions.map((a) => ({ value: a, label: actionConfig[a]?.label || a }))]} value={actionFilter} onChange={(e) => { setActionFilter(e.target.value); setPage(1) }} />
              <Select options={[{ value: "all", label: "ط¬ظ…ظٹط¹ ط§ظ„ظˆط­ط¯ط§طھ" }, ...modules.map((m) => ({ value: m, label: m }))]} value={moduleFilter} onChange={(e) => { setModuleFilter(e.target.value); setPage(1) }} />
            </div>
          </div>

          {isLoading ? (
            <div className="p-4"><CardSkeleton count={3} /></div>
          ) : filtered.length === 0 ? (
            <EmptyState icon={HiOutlineClipboardList} title="ظ„ط§ طھظˆط¬ط¯ ط³ط¬ظ„ط§طھ" description="ظ„ظ… ظٹطھظ… ط§ظ„ط¹ط«ظˆط± ط¹ظ„ظ‰ ط³ط¬ظ„ط§طھ ظ…ط·ط§ط¨ظ‚ط© ظ„ظ„ط¨ط­ط«" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-secondary">
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط§ظ„ظ…ط³طھط®ط¯ظ…</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط§ظ„ط¥ط¬ط±ط§ط،</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط§ظ„ظˆط­ط¯ط©</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط§ظ„ظˆطµظپ</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">IP</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط§ظ„ط¬ظ‡ط§ط²</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط§ظ„طھط§ط±ظٹط®</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((log) => (
                    <tr key={log.id} className="border-b border-border last:border-0 hover:bg-surface-secondary transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <HiOutlineUser className="w-4 h-4 text-text-tertiary" />
                          <span className="font-medium text-text">{log.userName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={actionConfig[log.action]?.variant || "neutral"} size="sm">
                          {actionConfig[log.action]?.label || log.action}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-text-secondary">{log.module}</td>
                      <td className="px-4 py-3 text-text-secondary max-w-xs truncate">{log.description}</td>
                      <td className="px-4 py-3 text-text-tertiary text-xs">{log.ip}</td>
                      <td className="px-4 py-3 text-text-tertiary text-xs">{log.device}</td>
                      <td className="px-4 py-3 text-text-tertiary text-xs whitespace-nowrap">{formatRelativeTime(log.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {totalPages > 1 && (
            <div className="p-4 border-t border-border">
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

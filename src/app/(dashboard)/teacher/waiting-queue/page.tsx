"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import {
  HiOutlineUsers,
  HiOutlineClock,
  HiOutlineBell,
  HiOutlineCheckCircle,
  HiOutlineRefresh,
  HiOutlineUserAdd,
} from "react-icons/hi"
import toast from "react-hot-toast"
import Button from "@/components/ui/Button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { PageHeader } from "@/components/ui/PageHeader"
import { SearchInput } from "@/components/ui/SearchInput"
import Select from "@/components/ui/Select"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { Skeleton, TableSkeleton, StatsSkeleton } from "@/components/ui/Skeleton"
import { mockWaitingStudents, mockWaitingQueueStats, mockClassGroups } from "@/lib/mock/data"

export default function WaitingQueuePage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [groupFilter, setGroupFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [notifyingId, setNotifyingId] = useState<string | null>(null)
  const [enrollingId, setEnrollingId] = useState<string | null>(null)
  const [autoNotify, setAutoNotify] = useState(false)
  const [lastCheck, setLastCheck] = useState<Date>(new Date())

  const stats = mockWaitingQueueStats

  const loadData = useCallback(() => {
    setLoading(true)
    setError(null)
    setTimeout(() => {
      setLoading(false)
      setLastCheck(new Date())
    }, 500)
  }, [])

  useEffect(() => { loadData() }, [loadData])

  useEffect(() => {
    if (!autoNotify) return
    const interval = setInterval(() => {
      const availableSeats = mockClassGroups.filter(g => g.enrolledCount < g.capacity).length
      if (availableSeats > 0 && mockWaitingStudents.some(w => w.status === "waiting")) {
        toast.success(`طھظ… ط§ظ„ط¹ط«ظˆط± ط¹ظ„ظ‰ ${availableSeats} ظ…ظ‚ط¹ط¯ ط´ط§ط؛ط± - ط¬ط§ط±ظٹ ط¥ط®ط·ط§ط± ط§ظ„ط·ظ„ط§ط¨ ط§ظ„ظ…ظ†طھط¸ط±ظٹظ†`)
      }
      setLastCheck(new Date())
    }, 30000)
    return () => clearInterval(interval)
  }, [autoNotify])

  const filtered = useMemo(() => {
    return mockWaitingStudents.filter((w) => {
      const matchSearch = w.studentName.includes(search)
      const matchGroup = groupFilter === "all" || w.groupId === groupFilter
      const matchStatus = statusFilter === "all" || w.status === statusFilter
      return matchSearch && matchGroup && matchStatus
    })
  }, [search, groupFilter, statusFilter])

  const handleNotify = async (id: string) => {
    setNotifyingId(id)
    await new Promise(r => setTimeout(r, 800))
    toast.success("طھظ… ط¥ط±ط³ط§ظ„ ط§ظ„ط¥ط´ط¹ط§ط± ظ„ظ„ط·ط§ظ„ط¨ ط¨ظ†ط¬ط§ط­")
    setNotifyingId(null)
  }

  const handleEnroll = async (id: string) => {
    setEnrollingId(id)
    await new Promise(r => setTimeout(r, 1000))
    toast.success("طھظ… طھط³ط¬ظٹظ„ ط§ظ„ط·ط§ظ„ط¨ ظپظٹ ط§ظ„ظ…ط¬ظ…ظˆط¹ط©")
    setEnrollingId(null)
  }

  const handleRetry = () => { loadData() }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <PageHeader title="ط¥ط¯ط§ط±ط© ظ‚ط§ط¦ظ…ط© ط§ظ„ط§ظ†طھط¸ط§ط±" description="ظ…طھط§ط¨ط¹ط© ط§ظ„ط·ظ„ط§ط¨ ط§ظ„ظ…ظ†طھط¸ط±ظٹظ† ظˆط¥ط¯ط§ط±ط© ط§ظ„ظ…ظ‚ط§ط¹ط¯ ط§ظ„ط´ط§ط؛ط±ط©" />
        <ErrorState message={error} onRetry={handleRetry} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="ط¥ط¯ط§ط±ط© ظ‚ط§ط¦ظ…ط© ط§ظ„ط§ظ†طھط¸ط§ط±"
        description="ظ…طھط§ط¨ط¹ط© ط§ظ„ط·ظ„ط§ط¨ ط§ظ„ظ…ظ†طھط¸ط±ظٹظ† ظˆط¥ط¯ط§ط±ط© ط§ظ„ظ…ظ‚ط§ط¹ط¯ ط§ظ„ط´ط§ط؛ط±ط©"
        actions={
          <div className="flex items-center gap-3">
            <button type="button"`nvariant={autoNotify ? "success" : "outline"}
              size="sm"
              leftIcon={<HiOutlineBell className="w-4 h-4" />}
              onClick={() => { setAutoNotify(!autoNotify); toast.success(autoNotify ? "طھظ… ط¥ظٹظ‚ط§ظپ ط§ظ„ط¥ط®ط·ط§ط± ط§ظ„طھظ„ظ‚ط§ط¦ظٹ" : "طھظ… طھظپط¹ظٹظ„ ط§ظ„ط¥ط®ط·ط§ط± ط§ظ„طھظ„ظ‚ط§ط¦ظٹ ظƒظ„ 30 ط«ط§ظ†ظٹط©") }}
            >
              {autoNotify ? "ط§ظ„ط¥ط®ط·ط§ط± ط§ظ„طھظ„ظ‚ط§ط¦ظٹ ظ…ظپط¹ظ„" : "طھظپط¹ظٹظ„ ط§ظ„ط¥ط®ط·ط§ط± ط§ظ„طھظ„ظ‚ط§ط¦ظٹ"}
            </Button>
            <button type="button" variant="ghost" size="sm" leftIcon={<HiOutlineRefresh className="w-4 h-4" />} onClick={loadData}>
              طھط­ط¯ظٹط«
            </Button>
          </div>
        }
      />

      {loading ? (
        <StatsSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظ…ظ†طھط¸ط±ظٹظ†" value={stats.totalWaiting} icon={HiOutlineUsers} color="warning" />
          <StatsCard title="ظ…طھظˆط³ط· ط£ظٹط§ظ… ط§ظ„ط§ظ†طھط¸ط§ط±" value={stats.averageWaitDays} icon={HiOutlineClock} color="info" subtitle="ظٹظˆظ…" />
          <StatsCard title="طھظ… ط§ظ„ط¥ط®ط·ط§ط± ط§ظ„ظٹظˆظ…" value={stats.notifiedToday} icon={HiOutlineBell} color="primary" />
          <StatsCard title="طھظ… ط§ظ„طھط³ط¬ظٹظ„ ط§ظ„ظٹظˆظ…" value={stats.enrolledToday} icon={HiOutlineUserAdd} color="success" />
        </div>
      )}

      {loading ? (
        <CardSkeleton count={1} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>طھظˆط²ظٹط¹ ط§ظ„ط·ظ„ط§ط¨ ط­ط³ط¨ ط§ظ„ظ…ط¬ظ…ظˆط¹ط©</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.byGroup.map((g) => (
                <div key={g.groupName} className="p-4 rounded-xl bg-surface-secondary border border-border text-center">
                  <p className="text-sm text-text-secondary mb-1">{g.groupName}</p>
                  <p className="text-2xl font-bold text-text">{g.count}</p>
                  <p className="text-xs text-text-tertiary mt-1">ظ…ظ†طھط¸ط±</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>ط§ظ„ط·ظ„ط§ط¨ ط§ظ„ظ…ظ†طھط¸ط±ظˆظ†</CardTitle>
          <Badge variant="warning">{filtered.length}</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <SearchInput value={search} onChange={setSearch} placeholder="ط¨ط­ط« ط¹ظ† ط·ط§ظ„ط¨..." />
            </div>
            <div className="flex gap-3">
              <Select
                options={[
                  { value: "all", label: "ط¬ظ…ظٹط¹ ط§ظ„ظ…ط¬ظ…ظˆط¹ط§طھ" },
                  ...mockClassGroups.map(g => ({ value: g.id, label: g.name })),
                ]}
                value={groupFilter}
                onChange={(e) => setGroupFilter(e.target.value)}
              />
              <Select
                options={[
                  { value: "all", label: "ط¬ظ…ظٹط¹ ط§ظ„ط­ط§ظ„ط§طھ" },
                  { value: "waiting", label: "ط¨ط§ظ†طھط¸ط§ط±" },
                  { value: "offered", label: "طھظ… ط§ظ„ط¹ط±ط¶" },
                  { value: "enrolled", label: "ظ…ط³ط¬ظ„" },
                  { value: "cancelled", label: "ظ…ظ„ط؛ظٹ" },
                ]}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <TableSkeleton rows={6} columns={6} />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={HiOutlineUsers}
              title="ظ„ط§ ظٹظˆط¬ط¯ ط·ظ„ط§ط¨ ظپظٹ ظ‚ط§ط¦ظ…ط© ط§ظ„ط§ظ†طھط¸ط§ط±"
              description={search || groupFilter !== "all" || statusFilter !== "all" ? "ظ„ط§ طھظˆط¬ط¯ ظ†طھط§ط¦ط¬ ظ„ظ„طھطµظپظٹط©" : "ظ‚ط§ط¦ظ…ط© ط§ظ„ط§ظ†طھط¸ط§ط± ظپط§ط±ط؛ط© ط­ط§ظ„ظٹط§ظ‹"}
            />
          ) : (
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-secondary border-b border-border">
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط§ظ„ط·ط§ظ„ط¨</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط§ظ„ظ…ط¬ظ…ظˆط¹ط©</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">طھط§ط±ظٹط® ط§ظ„ط§ظ†ط¶ظ…ط§ظ…</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط§ظ„ط£ظˆظ„ظˆظٹط©</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط§ظ„ط­ط§ظ„ط©</th>
                    <th className="text-center px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط§ظ„ط¥ط¬ط±ط§ط،ط§طھ</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((w) => (
                    <tr key={w.id} className="border-b border-border last:border-0 hover:bg-surface-secondary/50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="text-text font-medium">{w.studentName}</span>
                      </td>
                      <td className="px-4 py-3 text-text-secondary">{w.groupName}</td>
                      <td className="px-4 py-3 text-text-secondary">{w.joinedAt.toLocaleDateString("ar-EG")}</td>
                      <td className="px-4 py-3">
                        <Badge variant={w.priority === 1 ? "error" : w.priority === 2 ? "warning" : "info"}>
                          {w.priority === 1 ? "ط¹ط§ظ„ظٹط©" : w.priority === 2 ? "ظ…طھظˆط³ط·ط©" : "ظ…ظ†ط®ظپط¶ط©"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={w.status === "waiting" ? "warning" : w.status === "offered" ? "info" : w.status === "enrolled" ? "success" : "error"}>
                          {w.status === "waiting" ? "ط¨ط§ظ†طھط¸ط§ط±" : w.status === "offered" ? "طھظ… ط§ظ„ط¹ط±ط¶" : w.status === "enrolled" ? "ظ…ط³ط¬ظ„" : "ظ…ظ„ط؛ظٹ"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button type="button"`nvariant={w.notified ? "secondary" : "outline"}
                            size="xs"
                            leftIcon={notifyingId === w.id ? <HiOutlineRefresh className="w-3.5 h-3.5 animate-spin" /> : <HiOutlineBell className="w-3.5 h-3.5" />}
                            onClick={() => handleNotify(w.id)}
                            disabled={notifyingId === w.id}
                          >
                            {w.notified ? "طھظ… ط§ظ„ط¥ط®ط·ط§ط±" : "ط¥ط®ط·ط§ط±"}
                          </Button>
                          <button type="button"`nvariant="success"
                            size="xs"
                            leftIcon={enrollingId === w.id ? <HiOutlineRefresh className="w-3.5 h-3.5 animate-spin" /> : <HiOutlineCheckCircle className="w-3.5 h-3.5" />}
                            onClick={() => handleEnroll(w.id)}
                            disabled={enrollingId === w.id || w.status === "enrolled"}
                          >
                            {w.status === "enrolled" ? "ظ…ط³ط¬ظ„" : "طھط³ط¬ظٹظ„"}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center text-xs text-text-tertiary">
        ط¢ط®ط± طھط­ط¯ظٹط«: {lastCheck.toLocaleTimeString("ar-EG")}
        {autoNotify && " | ط§ظ„ط¥ط®ط·ط§ط± ط§ظ„طھظ„ظ‚ط§ط¦ظٹ ظ†ط´ط· (ظƒظ„ 30 ط«ط§ظ†ظٹط©)"}
      </div>
    </div>
  )
}

function CardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-4">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-8 w-1/2" />
        </div>
      ))}
    </div>
  )
}

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
        toast.success(`تم العثور على ${availableSeats} مقعد شاغر - جاري إخطار الطلاب المنتظرين`)
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
    toast.success("تم إرسال الإشعار للطالب بنجاح")
    setNotifyingId(null)
  }

  const handleEnroll = async (id: string) => {
    setEnrollingId(id)
    await new Promise(r => setTimeout(r, 1000))
    toast.success("تم تسجيل الطالب في المجموعة")
    setEnrollingId(null)
  }

  const handleRetry = () => { loadData() }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <PageHeader title="إدارة قائمة الانتظار" description="متابعة الطلاب المنتظرين وإدارة المقاعد الشاغرة" />
        <ErrorState description={error} onRetry={handleRetry} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="إدارة قائمة الانتظار"
        description="متابعة الطلاب المنتظرين وإدارة المقاعد الشاغرة"
        actions={
          <div className="flex items-center gap-3">
            <Button type="button"
variant={autoNotify ? "success" : "outline"}
              size="sm"
              leftIcon={<HiOutlineBell className="w-4 h-4" />}
              onClick={() => { setAutoNotify(!autoNotify); toast.success(autoNotify ? "تم إيقاف الإخطار التلقائي" : "تم تفعيل الإخطار التلقائي كل 30 ثانية") }}
            >
              {autoNotify ? "الإخطار التلقائي مفعل" : "تفعيل الإخطار التلقائي"}
            </Button>
            <Button variant="ghost" size="sm" leftIcon={<HiOutlineRefresh className="w-4 h-4" />} onClick={loadData}>
              تحديث
            </Button>
          </div>
        }
      />

      {loading ? (
        <StatsSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="إجمالي المنتظرين" value={stats.totalWaiting} icon={HiOutlineUsers} color="warning" />
          <StatsCard title="متوسط أيام الانتظار" value={stats.averageWaitDays} icon={HiOutlineClock} color="info" subtitle="يوم" />
          <StatsCard title="تم الإخطار اليوم" value={stats.notifiedToday} icon={HiOutlineBell} color="primary" />
          <StatsCard title="تم التسجيل اليوم" value={stats.enrolledToday} icon={HiOutlineUserAdd} color="success" />
        </div>
      )}

      {loading ? (
        <CardSkeleton count={1} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>توزيع الطلاب حسب المجموعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.byGroup.map((g) => (
                <div key={g.groupName} className="p-4 rounded-xl bg-surface-secondary border border-border text-center">
                  <p className="text-sm text-text-secondary mb-1">{g.groupName}</p>
                  <p className="text-2xl font-bold text-text">{g.count}</p>
                  <p className="text-xs text-text-tertiary mt-1">منتظر</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>الطلاب المنتظرون</CardTitle>
          <Badge variant="warning">{filtered.length}</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <SearchInput value={search} onChange={setSearch} placeholder="بحث عن طالب..." />
            </div>
            <div className="flex gap-3">
              <Select
                options={[
                  { value: "all", label: "جميع المجموعات" },
                  ...mockClassGroups.map(g => ({ value: g.id, label: g.name })),
                ]}
                value={groupFilter}
                onChange={(e) => setGroupFilter(e.target.value)}
              />
              <Select
                options={[
                  { value: "all", label: "جميع الحالات" },
                  { value: "waiting", label: "بانتظار" },
                  { value: "offered", label: "تم العرض" },
                  { value: "enrolled", label: "مسجل" },
                  { value: "cancelled", label: "ملغي" },
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
              title="لا يوجد طلاب في قائمة الانتظار"
              description={search || groupFilter !== "all" || statusFilter !== "all" ? "لا توجد نتائج للتصفية" : "قائمة الانتظار فارغة حالياً"}
            />
          ) : (
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-secondary border-b border-border">
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">الطالب</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">المجموعة</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">تاريخ الانضمام</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">الأولوية</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">الحالة</th>
                    <th className="text-center px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">الإجراءات</th>
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
                          {w.priority === 1 ? "عالية" : w.priority === 2 ? "متوسطة" : "منخفضة"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={w.status === "waiting" ? "warning" : w.status === "offered" ? "info" : w.status === "enrolled" ? "success" : "error"}>
                          {w.status === "waiting" ? "بانتظار" : w.status === "offered" ? "تم العرض" : w.status === "enrolled" ? "مسجل" : "ملغي"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <Button type="button"
variant={w.notified ? "secondary" : "outline"}
                            size="xs"
                            leftIcon={notifyingId === w.id ? <HiOutlineRefresh className="w-3.5 h-3.5 animate-spin" /> : <HiOutlineBell className="w-3.5 h-3.5" />}
                            onClick={() => handleNotify(w.id)}
                            disabled={notifyingId === w.id}
                          >
                            {w.notified ? "تم الإخطار" : "إخطار"}
                          </Button>
                          <Button type="button"
variant="success"
                            size="xs"
                            leftIcon={enrollingId === w.id ? <HiOutlineRefresh className="w-3.5 h-3.5 animate-spin" /> : <HiOutlineCheckCircle className="w-3.5 h-3.5" />}
                            onClick={() => handleEnroll(w.id)}
                            disabled={enrollingId === w.id || w.status === "enrolled"}
                          >
                            {w.status === "enrolled" ? "مسجل" : "تسجيل"}
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
        آخر تحديث: {lastCheck.toLocaleTimeString("ar-EG")}
        {autoNotify && " | الإخطار التلقائي نشط (كل 30 ثانية)"}
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

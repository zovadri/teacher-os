"use client"

import { useState, useEffect, useMemo } from "react"
import {
  HiOutlineAcademicCap,
  HiOutlineUsers,
  HiOutlineClock,
  HiOutlineCash,
  HiOutlineUserAdd,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineRefresh,
} from "react-icons/hi"
import toast from "react-hot-toast"
import Button from "@/components/ui/Button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { PageHeader } from "@/components/ui/PageHeader"
import { EmptyState } from "@/components/ui/EmptyState"
import { Skeleton, StatsSkeleton } from "@/components/ui/Skeleton"
import {
  mockClassGroups,
  mockWaitingStudents,
  mockPayments,
  mockEnrollments,
  mockAttendance,
} from "@/lib/mock/data"

const now = new Date()
const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
const todayDayName = dayNames[now.getDay()]

const mockAppointments = Array.from({ length: 6 }, (_, i) => ({
  id: `appt-${i + 1}`,
  studentName: `ط·ط§ظ„ط¨ ${i + 1}`,
  time: `${8 + i}:00`,
  type: i % 2 === 0 ? "ظ…ظ‚ط§ط¨ظ„ط©" : "ط§ط®طھط¨ط§ط± طھط­ط¯ظٹط¯ ظ…ط³طھظˆظ‰",
  status: i < 2 ? "ط¬ط§ط±ظٹ" : i < 4 ? "ظ‚ط§ط¯ظ…" : "ظ…ظ†طھظ‡ظٹ" as const,
}))

function SectionSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-20" />
    </div>
  )
}

export default function ReceptionPage() {
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date())
      toast.success("طھظ… طھط­ط¯ظٹط« ط§ظ„ط¨ظٹط§ظ†ط§طھ طھظ„ظ‚ط§ط¦ظٹط§ظ‹")
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const todayClasses = useMemo(() => {
    return mockClassGroups.filter(g =>
      g.schedule.some(s => s.day === todayDayName) && g.status === "active"
    )
  }, [])

  const currentAttendance = useMemo(() => {
    return mockAttendance.slice(0, 5).map(a => ({
      ...a,
      checkedIn: a.status === "present" || a.status === "late",
    }))
  }, [])

  const waitingSummary = useMemo(() => mockWaitingStudents.filter(w => w.status === "waiting"), [])

  const pendingPayments = useMemo(() => mockPayments.filter(p => p.status === "pending"), [])

  const todayRegistrations = useMemo(() => mockEnrollments.slice(0, 5), [])

  const stats = useMemo(() => ({
    todayClasses: todayClasses.length,
    currentAttendance: currentAttendance.filter(a => a.checkedIn).length,
    waitingCount: waitingSummary.length,
    pendingPayments: pendingPayments.length,
    todayRegistrations: todayRegistrations.length,
    todayAppointments: mockAppointments.filter(a => a.status !== "ظ…ظ†طھظ‡ظٹ").length,
  }), [todayClasses, currentAttendance, waitingSummary, pendingPayments, todayRegistrations])

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setLastRefresh(new Date())
      toast.success("طھظ… طھط­ط¯ظٹط« ط§ظ„ط¨ظٹط§ظ†ط§طھ")
    }, 600)
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="ظ„ظˆط­ط© ط§ظ„ط§ط³طھظ‚ط¨ط§ظ„"
        description="ظ†ط¸ط±ط© ط¹ط§ظ…ط© ط¹ظ„ظ‰ ظ†ط´ط§ط· ط§ظ„ظٹظˆظ…"
        actions={
          <div className="flex items-center gap-3">
            <span className="text-xs text-text-tertiary">
              ط¢ط®ط± طھط­ط¯ظٹط«: {lastRefresh.toLocaleTimeString("ar-EG")}
            </span>
            <button type="button" variant="ghost" size="sm" leftIcon={<HiOutlineRefresh className="w-4 h-4" />} onClick={handleRefresh}>
              طھط­ط¯ظٹط«
            </Button>
          </div>
        }
      />

      {loading ? (
        <StatsSkeleton count={6} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatsCard title="ط­طµطµ ط§ظ„ظٹظˆظ…" value={stats.todayClasses} icon={HiOutlineAcademicCap} color="primary" />
          <StatsCard title="ط§ظ„ط­ط¶ظˆط± ط§ظ„ط­ط§ظ„ظٹ" value={stats.currentAttendance} icon={HiOutlineUsers} color="success" />
          <StatsCard title="ط§ظ„ط·ظ„ط§ط¨ ط§ظ„ظ…ظ†طھط¸ط±ظˆظ†" value={stats.waitingCount} icon={HiOutlineClock} color="warning" />
          <StatsCard title="ط§ظ„ظ…ط¯ظپظˆط¹ط§طھ ط§ظ„ظ…ط¹ظ„ظ‚ط©" value={stats.pendingPayments} icon={HiOutlineCash} color="error" />
          <StatsCard title="طھط³ط¬ظٹظ„ط§طھ ط§ظ„ظٹظˆظ…" value={stats.todayRegistrations} icon={HiOutlineUserAdd} color="info" />
          <StatsCard title="ظ…ظˆط§ط¹ظٹط¯ ط§ظ„ظٹظˆظ…" value={stats.todayAppointments} icon={HiOutlineCalendar} color="primary" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ط­طµطµ ط§ظ„ظٹظˆظ…</CardTitle>
            <Badge variant="primary">{todayClasses.length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SectionSkeleton />
            ) : todayClasses.length === 0 ? (
              <EmptyState icon={HiOutlineAcademicCap} title="ظ„ط§ طھظˆط¬ط¯ ط­طµطµ ط§ظ„ظٹظˆظ…" description="ظ„ظٹط³ ظ„ط¯ظٹظƒ ط£ظٹ ط­طµطµ ظ…ط¬ط¯ظˆظ„ط© ط§ظ„ظٹظˆظ…" bordered withBackground={false} />
            ) : (
              <div className="space-y-3">
                {todayClasses.map((g) => {
                  const todaySched = g.schedule.find(s => s.day === todayDayName)
                  if (!todaySched) return null
                  return (
                    <div key={g.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary border border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary-10 flex items-center justify-center">
                          <HiOutlineAcademicCap className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text">{g.courseName}</p>
                          <p className="text-xs text-text-tertiary">{g.name} - {g.classroom}</p>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-text">{todaySched.startTime} - {todaySched.endTime}</p>
                        <p className="text-xs text-text-tertiary">{g.enrolledCount} ط·ط§ظ„ط¨</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ط§ظ„ط­ط¶ظˆط± ط§ظ„ط­ط§ظ„ظٹ</CardTitle>
            <Badge variant="success">{currentAttendance.filter(a => a.checkedIn).length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SectionSkeleton />
            ) : currentAttendance.filter(a => a.checkedIn).length === 0 ? (
              <EmptyState icon={HiOutlineUsers} title="ظ„ط§ ظٹظˆط¬ط¯ ط­ط¶ظˆط± ط­ط§ظ„ظٹط§ظ‹" description="ظ„ظ… ظٹطھظ… طھط³ط¬ظٹظ„ ط£ظٹ ط­ط¶ظˆط± ط­طھظ‰ ط§ظ„ط¢ظ†" bordered withBackground={false} />
            ) : (
              <div className="space-y-3">
                {currentAttendance.filter(a => a.checkedIn).map((a) => (
                  <div key={a.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary border border-border">
                    <div className="flex items-center gap-3">
                      <HiOutlineCheckCircle className="w-5 h-5 text-success" />
                      <div>
                        <p className="text-sm font-medium text-text">{a.studentName}</p>
                        <p className="text-xs text-text-tertiary">{a.courseName}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-text-secondary">ط¯ط®ظˆظ„: {a.checkIn}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ط§ظ„ط·ظ„ط§ط¨ ط§ظ„ظ…ظ†طھط¸ط±ظˆظ†</CardTitle>
            <Badge variant="warning">{waitingSummary.length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SectionSkeleton />
            ) : waitingSummary.length === 0 ? (
              <EmptyState icon={HiOutlineClock} title="ظ„ط§ ظٹظˆط¬ط¯ ط·ظ„ط§ط¨ ظ…ظ†طھط¸ط±ظˆظ†" description="ظ‚ط§ط¦ظ…ط© ط§ظ„ط§ظ†طھط¸ط§ط± ظپط§ط±ط؛ط© ط­ط§ظ„ظٹط§ظ‹" bordered withBackground={false} />
            ) : (
              <div className="space-y-3">
                {waitingSummary.slice(0, 5).map((w) => (
                  <div key={w.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary border border-border">
                    <div className="flex items-center gap-3">
                      <HiOutlineClock className="w-5 h-5 text-warning" />
                      <div>
                        <p className="text-sm font-medium text-text">{w.studentName}</p>
                        <p className="text-xs text-text-tertiary">{w.groupName}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <Badge variant={w.priority === 1 ? "error" : w.priority === 2 ? "warning" : "info"} size="sm">
                        ط£ظˆظ„ظˆظٹط© {w.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
                {waitingSummary.length > 5 && (
                  <p className="text-center text-xs text-text-tertiary pt-2">+ {waitingSummary.length - 5} ط¢ط®ط±ظˆظ†</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ط§ظ„ظ…ط¯ظپظˆط¹ط§طھ ط§ظ„ظ…ط¹ظ„ظ‚ط©</CardTitle>
            <Badge variant="error">{pendingPayments.length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SectionSkeleton />
            ) : pendingPayments.length === 0 ? (
              <EmptyState icon={HiOutlineCash} title="ظ„ط§ طھظˆط¬ط¯ ظ…ط¯ظپظˆط¹ط§طھ ظ…ط¹ظ„ظ‚ط©" description="ط¬ظ…ظٹط¹ ط§ظ„ظ…ط¯ظپظˆط¹ط§طھ ظ…ط³ط¯ط¯ط©" bordered withBackground={false} />
            ) : (
              <div className="space-y-3">
                {pendingPayments.slice(0, 5).map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary border border-border">
                    <div className="flex items-center gap-3">
                      <HiOutlineCash className="w-5 h-5 text-error" />
                      <div>
                        <p className="text-sm font-medium text-text">{p.studentName}</p>
                        <p className="text-xs text-text-tertiary">{p.method === "cash" ? "ظ†ظ‚ط¯ط§ظ‹" : p.method === "fawry" ? "ظپظˆط±ظٹ" : "ظƒظˆط¯"}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-error">{p.amount.toLocaleString("ar-EG")} ط¬.ظ…</p>
                      <p className="text-xs text-text-tertiary">{p.createdAt.toLocaleDateString("ar-EG")}</p>
                    </div>
                  </div>
                ))}
                {pendingPayments.length > 5 && (
                  <p className="text-center text-xs text-text-tertiary pt-2">+ {pendingPayments.length - 5} ظ…ط¯ظپظˆط¹ط§طھ ط£ط®ط±ظ‰</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>طھط³ط¬ظٹظ„ط§طھ ط§ظ„ظٹظˆظ…</CardTitle>
            <Badge variant="info">{todayRegistrations.length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SectionSkeleton />
            ) : todayRegistrations.length === 0 ? (
              <EmptyState icon={HiOutlineUserAdd} title="ظ„ط§ طھظˆط¬ط¯ طھط³ط¬ظٹظ„ط§طھ ط§ظ„ظٹظˆظ…" description="ظ„ظ… ظٹطھظ… طھط³ط¬ظٹظ„ ط£ظٹ ط·ط§ظ„ط¨ ط¬ط¯ظٹط¯ ط§ظ„ظٹظˆظ…" bordered withBackground={false} />
            ) : (
              <div className="space-y-3">
                {todayRegistrations.map((e) => (
                  <div key={e.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary border border-border">
                    <div className="flex items-center gap-3">
                      <HiOutlineUserAdd className="w-5 h-5 text-info" />
                      <div>
                        <p className="text-sm font-medium text-text">{e.studentName}</p>
                        <p className="text-xs text-text-tertiary">{e.courseName}</p>
                      </div>
                    </div>
                    <Badge variant={e.status === "active" ? "success" : "warning"} size="sm">
                      {e.status === "active" ? "ظ†ط´ط·" : e.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ظ…ظˆط§ط¹ظٹط¯ ط§ظ„ظٹظˆظ…</CardTitle>
            <Badge variant="primary">{mockAppointments.filter(a => a.status !== "ظ…ظ†طھظ‡ظٹ").length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SectionSkeleton />
            ) : mockAppointments.length === 0 ? (
              <EmptyState icon={HiOutlineCalendar} title="ظ„ط§ طھظˆط¬ط¯ ظ…ظˆط§ط¹ظٹط¯ ط§ظ„ظٹظˆظ…" description="ظ„ط§ طھظˆط¬ط¯ ظ…ظˆط§ط¹ظٹط¯ ظ…ط¬ط¯ظˆظ„ط© ظ„ظ„ظٹظˆظ…" bordered withBackground={false} />
            ) : (
              <div className="space-y-3">
                {mockAppointments.map((a) => (
                  <div key={a.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary border border-border">
                    <div className="flex items-center gap-3">
                      <HiOutlineCalendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-text">{a.studentName}</p>
                        <p className="text-xs text-text-tertiary">{a.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-text-secondary">{a.time}</span>
                      <Badge variant={a.status === "ط¬ط§ط±ظٹ" ? "success" : a.status === "ظ‚ط§ط¯ظ…" ? "info" : "neutral"} size="sm">
                        {a.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="text-center text-xs text-text-tertiary">
        ط§ظ„طھط­ط¯ظٹط« ط§ظ„طھظ„ظ‚ط§ط¦ظٹ ظƒظ„ 60 ط«ط§ظ†ظٹط© | ط¢ط®ط± طھط­ط¯ظٹط«: {lastRefresh.toLocaleTimeString("ar-EG")}
      </div>
    </div>
  )
}

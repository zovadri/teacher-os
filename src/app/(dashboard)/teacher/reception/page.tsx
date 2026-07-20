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
  studentName: `ط·آ·ط·آ§ط¸â€‍ط·آ¨ ${i + 1}`,
  time: `${8 + i}:00`,
  type: i % 2 === 0 ? "ط¸â€¦ط¸â€ڑط·آ§ط·آ¨ط¸â€‍ط·آ©" : "ط·آ§ط·آ®ط·ع¾ط·آ¨ط·آ§ط·آ± ط·ع¾ط·آ­ط·آ¯ط¸ظ¹ط·آ¯ ط¸â€¦ط·آ³ط·ع¾ط¸ث†ط¸â€°",
  status: i < 2 ? "ط·آ¬ط·آ§ط·آ±ط¸ظ¹" : i < 4 ? "ط¸â€ڑط·آ§ط·آ¯ط¸â€¦" : "ط¸â€¦ط¸â€ ط·ع¾ط¸â€،ط¸ظ¹" as const,
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
      toast.success("ط·ع¾ط¸â€¦ ط·ع¾ط·آ­ط·آ¯ط¸ظ¹ط·آ« ط·آ§ط¸â€‍ط·آ¨ط¸ظ¹ط·آ§ط¸â€ ط·آ§ط·ع¾ ط·ع¾ط¸â€‍ط¸â€ڑط·آ§ط·آ¦ط¸ظ¹ط·آ§ط¸â€¹")
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
    todayAppointments: mockAppointments.filter(a => a.status !== "ط¸â€¦ط¸â€ ط·ع¾ط¸â€،ط¸ظ¹").length,
  }), [todayClasses, currentAttendance, waitingSummary, pendingPayments, todayRegistrations])

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setLastRefresh(new Date())
      toast.success("ط·ع¾ط¸â€¦ ط·ع¾ط·آ­ط·آ¯ط¸ظ¹ط·آ« ط·آ§ط¸â€‍ط·آ¨ط¸ظ¹ط·آ§ط¸â€ ط·آ§ط·ع¾")
    }, 600)
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="ط¸â€‍ط¸ث†ط·آ­ط·آ© ط·آ§ط¸â€‍ط·آ§ط·آ³ط·ع¾ط¸â€ڑط·آ¨ط·آ§ط¸â€‍"
        description="ط¸â€ ط·آ¸ط·آ±ط·آ© ط·آ¹ط·آ§ط¸â€¦ط·آ© ط·آ¹ط¸â€‍ط¸â€° ط¸â€ ط·آ´ط·آ§ط·آ· ط·آ§ط¸â€‍ط¸ظ¹ط¸ث†ط¸â€¦"
        actions={
          <div className="flex items-center gap-3">
            <span className="text-xs text-text-tertiary">
              ط·آ¢ط·آ®ط·آ± ط·ع¾ط·آ­ط·آ¯ط¸ظ¹ط·آ«: {lastRefresh.toLocaleTimeString("ar-EG")}
            </span>
            <Button variant="ghost" size="sm" leftIcon={<HiOutlineRefresh className="w-4 h-4" />} onClick={handleRefresh}>
              ط·ع¾ط·آ­ط·آ¯ط¸ظ¹ط·آ«
            </Button>
          </div>
        }
      />

      {loading ? (
        <StatsSkeleton count={6} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatsCard title="ط·آ­ط·آµط·آµ ط·آ§ط¸â€‍ط¸ظ¹ط¸ث†ط¸â€¦" value={stats.todayClasses} icon={HiOutlineAcademicCap} color="primary" />
          <StatsCard title="ط·آ§ط¸â€‍ط·آ­ط·آ¶ط¸ث†ط·آ± ط·آ§ط¸â€‍ط·آ­ط·آ§ط¸â€‍ط¸ظ¹" value={stats.currentAttendance} icon={HiOutlineUsers} color="success" />
          <StatsCard title="ط·آ§ط¸â€‍ط·آ·ط¸â€‍ط·آ§ط·آ¨ ط·آ§ط¸â€‍ط¸â€¦ط¸â€ ط·ع¾ط·آ¸ط·آ±ط¸ث†ط¸â€ " value={stats.waitingCount} icon={HiOutlineClock} color="warning" />
          <StatsCard title="ط·آ§ط¸â€‍ط¸â€¦ط·آ¯ط¸ظ¾ط¸ث†ط·آ¹ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط¸â€¦ط·آ¹ط¸â€‍ط¸â€ڑط·آ©" value={stats.pendingPayments} icon={HiOutlineCash} color="error" />
          <StatsCard title="ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط¸ظ¹ط¸ث†ط¸â€¦" value={stats.todayRegistrations} icon={HiOutlineUserAdd} color="info" />
          <StatsCard title="ط¸â€¦ط¸ث†ط·آ§ط·آ¹ط¸ظ¹ط·آ¯ ط·آ§ط¸â€‍ط¸ظ¹ط¸ث†ط¸â€¦" value={stats.todayAppointments} icon={HiOutlineCalendar} color="primary" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ط·آ­ط·آµط·آµ ط·آ§ط¸â€‍ط¸ظ¹ط¸ث†ط¸â€¦</CardTitle>
            <Badge variant="primary">{todayClasses.length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SectionSkeleton />
            ) : todayClasses.length === 0 ? (
              <EmptyState icon={HiOutlineAcademicCap} title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·آ­ط·آµط·آµ ط·آ§ط¸â€‍ط¸ظ¹ط¸ث†ط¸â€¦" description="ط¸â€‍ط¸ظ¹ط·آ³ ط¸â€‍ط·آ¯ط¸ظ¹ط¸ئ’ ط·آ£ط¸ظ¹ ط·آ­ط·آµط·آµ ط¸â€¦ط·آ¬ط·آ¯ط¸ث†ط¸â€‍ط·آ© ط·آ§ط¸â€‍ط¸ظ¹ط¸ث†ط¸â€¦" bordered withBackground={false} />
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
                        <p className="text-xs text-text-tertiary">{g.enrolledCount} ط·آ·ط·آ§ط¸â€‍ط·آ¨</p>
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
            <CardTitle>ط·آ§ط¸â€‍ط·آ­ط·آ¶ط¸ث†ط·آ± ط·آ§ط¸â€‍ط·آ­ط·آ§ط¸â€‍ط¸ظ¹</CardTitle>
            <Badge variant="success">{currentAttendance.filter(a => a.checkedIn).length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SectionSkeleton />
            ) : currentAttendance.filter(a => a.checkedIn).length === 0 ? (
              <EmptyState icon={HiOutlineUsers} title="ط¸â€‍ط·آ§ ط¸ظ¹ط¸ث†ط·آ¬ط·آ¯ ط·آ­ط·آ¶ط¸ث†ط·آ± ط·آ­ط·آ§ط¸â€‍ط¸ظ¹ط·آ§ط¸â€¹" description="ط¸â€‍ط¸â€¦ ط¸ظ¹ط·ع¾ط¸â€¦ ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ ط·آ£ط¸ظ¹ ط·آ­ط·آ¶ط¸ث†ط·آ± ط·آ­ط·ع¾ط¸â€° ط·آ§ط¸â€‍ط·آ¢ط¸â€ " bordered withBackground={false} />
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
                      <p className="text-xs text-text-secondary">ط·آ¯ط·آ®ط¸ث†ط¸â€‍: {a.checkIn}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ط·آ§ط¸â€‍ط·آ·ط¸â€‍ط·آ§ط·آ¨ ط·آ§ط¸â€‍ط¸â€¦ط¸â€ ط·ع¾ط·آ¸ط·آ±ط¸ث†ط¸â€ </CardTitle>
            <Badge variant="warning">{waitingSummary.length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SectionSkeleton />
            ) : waitingSummary.length === 0 ? (
              <EmptyState icon={HiOutlineClock} title="ط¸â€‍ط·آ§ ط¸ظ¹ط¸ث†ط·آ¬ط·آ¯ ط·آ·ط¸â€‍ط·آ§ط·آ¨ ط¸â€¦ط¸â€ ط·ع¾ط·آ¸ط·آ±ط¸ث†ط¸â€ " description="ط¸â€ڑط·آ§ط·آ¦ط¸â€¦ط·آ© ط·آ§ط¸â€‍ط·آ§ط¸â€ ط·ع¾ط·آ¸ط·آ§ط·آ± ط¸ظ¾ط·آ§ط·آ±ط·ط›ط·آ© ط·آ­ط·آ§ط¸â€‍ط¸ظ¹ط·آ§ط¸â€¹" bordered withBackground={false} />
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
                        ط·آ£ط¸ث†ط¸â€‍ط¸ث†ط¸ظ¹ط·آ© {w.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
                {waitingSummary.length > 5 && (
                  <p className="text-center text-xs text-text-tertiary pt-2">+ {waitingSummary.length - 5} ط·آ¢ط·آ®ط·آ±ط¸ث†ط¸â€ </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ط·آ§ط¸â€‍ط¸â€¦ط·آ¯ط¸ظ¾ط¸ث†ط·آ¹ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط¸â€¦ط·آ¹ط¸â€‍ط¸â€ڑط·آ©</CardTitle>
            <Badge variant="error">{pendingPayments.length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SectionSkeleton />
            ) : pendingPayments.length === 0 ? (
              <EmptyState icon={HiOutlineCash} title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط¸â€¦ط·آ¯ط¸ظ¾ط¸ث†ط·آ¹ط·آ§ط·ع¾ ط¸â€¦ط·آ¹ط¸â€‍ط¸â€ڑط·آ©" description="ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¹ ط·آ§ط¸â€‍ط¸â€¦ط·آ¯ط¸ظ¾ط¸ث†ط·آ¹ط·آ§ط·ع¾ ط¸â€¦ط·آ³ط·آ¯ط·آ¯ط·آ©" bordered withBackground={false} />
            ) : (
              <div className="space-y-3">
                {pendingPayments.slice(0, 5).map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary border border-border">
                    <div className="flex items-center gap-3">
                      <HiOutlineCash className="w-5 h-5 text-error" />
                      <div>
                        <p className="text-sm font-medium text-text">{p.studentName}</p>
                        <p className="text-xs text-text-tertiary">{p.method === "cash" ? "ط¸â€ ط¸â€ڑط·آ¯ط·آ§ط¸â€¹" : p.method === "fawry" ? "ط¸ظ¾ط¸ث†ط·آ±ط¸ظ¹" : "ط¸ئ’ط¸ث†ط·آ¯"}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-error">{p.amount.toLocaleString("ar-EG")} ط·آ¬.ط¸â€¦</p>
                      <p className="text-xs text-text-tertiary">{p.createdAt.toLocaleDateString("ar-EG")}</p>
                    </div>
                  </div>
                ))}
                {pendingPayments.length > 5 && (
                  <p className="text-center text-xs text-text-tertiary pt-2">+ {pendingPayments.length - 5} ط¸â€¦ط·آ¯ط¸ظ¾ط¸ث†ط·آ¹ط·آ§ط·ع¾ ط·آ£ط·آ®ط·آ±ط¸â€°</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط¸ظ¹ط¸ث†ط¸â€¦</CardTitle>
            <Badge variant="info">{todayRegistrations.length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SectionSkeleton />
            ) : todayRegistrations.length === 0 ? (
              <EmptyState icon={HiOutlineUserAdd} title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط¸ظ¹ط¸ث†ط¸â€¦" description="ط¸â€‍ط¸â€¦ ط¸ظ¹ط·ع¾ط¸â€¦ ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ ط·آ£ط¸ظ¹ ط·آ·ط·آ§ط¸â€‍ط·آ¨ ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯ ط·آ§ط¸â€‍ط¸ظ¹ط¸ث†ط¸â€¦" bordered withBackground={false} />
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
                      {e.status === "active" ? "ط¸â€ ط·آ´ط·آ·" : e.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ط¸â€¦ط¸ث†ط·آ§ط·آ¹ط¸ظ¹ط·آ¯ ط·آ§ط¸â€‍ط¸ظ¹ط¸ث†ط¸â€¦</CardTitle>
            <Badge variant="primary">{mockAppointments.filter(a => a.status !== "ط¸â€¦ط¸â€ ط·ع¾ط¸â€،ط¸ظ¹").length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SectionSkeleton />
            ) : mockAppointments.length === 0 ? (
              <EmptyState icon={HiOutlineCalendar} title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط¸â€¦ط¸ث†ط·آ§ط·آ¹ط¸ظ¹ط·آ¯ ط·آ§ط¸â€‍ط¸ظ¹ط¸ث†ط¸â€¦" description="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط¸â€¦ط¸ث†ط·آ§ط·آ¹ط¸ظ¹ط·آ¯ ط¸â€¦ط·آ¬ط·آ¯ط¸ث†ط¸â€‍ط·آ© ط¸â€‍ط¸â€‍ط¸ظ¹ط¸ث†ط¸â€¦" bordered withBackground={false} />
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
                      <Badge variant={a.status === "ط·آ¬ط·آ§ط·آ±ط¸ظ¹" ? "success" : a.status === "ط¸â€ڑط·آ§ط·آ¯ط¸â€¦" ? "info" : "neutral"} size="sm">
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
        ط·آ§ط¸â€‍ط·ع¾ط·آ­ط·آ¯ط¸ظ¹ط·آ« ط·آ§ط¸â€‍ط·ع¾ط¸â€‍ط¸â€ڑط·آ§ط·آ¦ط¸ظ¹ ط¸ئ’ط¸â€‍ 60 ط·آ«ط·آ§ط¸â€ ط¸ظ¹ط·آ© | ط·آ¢ط·آ®ط·آ± ط·ع¾ط·آ­ط·آ¯ط¸ظ¹ط·آ«: {lastRefresh.toLocaleTimeString("ar-EG")}
      </div>
    </div>
  )
}

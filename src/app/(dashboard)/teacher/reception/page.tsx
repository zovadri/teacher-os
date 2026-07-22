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
  studentName: `طالب ${i + 1}`,
  time: `${8 + i}:00`,
  type: i % 2 === 0 ? "مقابلة" : "اختبار تحديد مستوى",
  status: i < 2 ? "جاري" : i < 4 ? "قادم" : "منتهي" as const,
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
      toast.success("تم تحديث البيانات تلقائياً")
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
    todayAppointments: mockAppointments.filter(a => a.status !== "منتهي").length,
  }), [todayClasses, currentAttendance, waitingSummary, pendingPayments, todayRegistrations])

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setLastRefresh(new Date())
      toast.success("تم تحديث البيانات")
    }, 600)
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="لوحة الاستقبال"
        description="نظرة عامة على نشاط اليوم"
        actions={
          <div className="flex items-center gap-3">
            <span className="text-xs text-text-tertiary">
              آخر تحديث: {lastRefresh.toLocaleTimeString("ar-EG")}
            </span>
            <Button variant="ghost" size="sm" leftIcon={<HiOutlineRefresh className="w-4 h-4" />} onClick={handleRefresh}>
              تحديث
            </Button>
          </div>
        }
      />

      {loading ? (
        <StatsSkeleton count={6} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatsCard title="حصص اليوم" value={stats.todayClasses} icon={HiOutlineAcademicCap} color="primary" />
          <StatsCard title="الحضور الحالي" value={stats.currentAttendance} icon={HiOutlineUsers} color="success" />
          <StatsCard title="الطلاب المنتظرون" value={stats.waitingCount} icon={HiOutlineClock} color="warning" />
          <StatsCard title="المدفوعات المعلقة" value={stats.pendingPayments} icon={HiOutlineCash} color="error" />
          <StatsCard title="تسجيلات اليوم" value={stats.todayRegistrations} icon={HiOutlineUserAdd} color="info" />
          <StatsCard title="مواعيد اليوم" value={stats.todayAppointments} icon={HiOutlineCalendar} color="primary" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>حصص اليوم</CardTitle>
            <Badge variant="primary">{todayClasses.length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SectionSkeleton />
            ) : todayClasses.length === 0 ? (
              <EmptyState icon={HiOutlineAcademicCap} title="لا توجد حصص اليوم" description="ليس لديك أي حصص مجدولة اليوم" bordered />
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
                        <p className="text-xs text-text-tertiary">{g.enrolledCount} طالب</p>
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
            <CardTitle>الحضور الحالي</CardTitle>
            <Badge variant="success">{currentAttendance.filter(a => a.checkedIn).length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SectionSkeleton />
            ) : currentAttendance.filter(a => a.checkedIn).length === 0 ? (
              <EmptyState icon={HiOutlineUsers} title="لا يوجد حضور حالياً" description="لم يتم تسجيل أي حضور حتى الآن" bordered />
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
                      <p className="text-xs text-text-secondary">دخول: {a.checkIn}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>الطلاب المنتظرون</CardTitle>
            <Badge variant="warning">{waitingSummary.length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SectionSkeleton />
            ) : waitingSummary.length === 0 ? (
              <EmptyState icon={HiOutlineClock} title="لا يوجد طلاب منتظرون" description="قائمة الانتظار فارغة حالياً" bordered />
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
                        أولوية {w.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
                {waitingSummary.length > 5 && (
                  <p className="text-center text-xs text-text-tertiary pt-2">+ {waitingSummary.length - 5} آخرون</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>المدفوعات المعلقة</CardTitle>
            <Badge variant="error">{pendingPayments.length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SectionSkeleton />
            ) : pendingPayments.length === 0 ? (
              <EmptyState icon={HiOutlineCash} title="لا توجد مدفوعات معلقة" description="جميع المدفوعات مسددة" bordered />
            ) : (
              <div className="space-y-3">
                {pendingPayments.slice(0, 5).map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary border border-border">
                    <div className="flex items-center gap-3">
                      <HiOutlineCash className="w-5 h-5 text-error" />
                      <div>
                        <p className="text-sm font-medium text-text">{p.studentName}</p>
                        <p className="text-xs text-text-tertiary">{p.method === "cash" ? "نقداً" : p.method === "fawry" ? "فوري" : "كود"}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-error">{p.amount.toLocaleString("ar-EG")} ج.ظ…</p>
                      <p className="text-xs text-text-tertiary">{p.createdAt.toLocaleDateString("ar-EG")}</p>
                    </div>
                  </div>
                ))}
                {pendingPayments.length > 5 && (
                  <p className="text-center text-xs text-text-tertiary pt-2">+ {pendingPayments.length - 5} مدفوعات أخرى</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>تسجيلات اليوم</CardTitle>
            <Badge variant="info">{todayRegistrations.length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SectionSkeleton />
            ) : todayRegistrations.length === 0 ? (
              <EmptyState icon={HiOutlineUserAdd} title="لا توجد تسجيلات اليوم" description="لم يتم تسجيل أي طالب جديد اليوم" bordered />
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
                      {e.status === "active" ? "نشط" : e.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>مواعيد اليوم</CardTitle>
            <Badge variant="primary">{mockAppointments.filter(a => a.status !== "منتهي").length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SectionSkeleton />
            ) : mockAppointments.length === 0 ? (
              <EmptyState icon={HiOutlineCalendar} title="لا توجد مواعيد اليوم" description="لا توجد مواعيد مجدولة لليوم" bordered />
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
                      <Badge variant={a.status === "جاري" ? "success" : a.status === "قادم" ? "info" : "default"} size="sm">
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
        التحديث التلقائي كل 60 ثانية | آخر تحديث: {lastRefresh.toLocaleTimeString("ar-EG")}
      </div>
    </div>
  )
}

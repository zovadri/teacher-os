"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlineExclamation,
  HiOutlineUser,
  HiOutlineChevronRight,
  HiOutlineChevronLeft,
  HiOutlineChartSquareBar,
  HiOutlineUsers,
} from "react-icons/hi"
import { Toaster, toast } from "react-hot-toast"
import { cn, formatDate } from "@/lib/utils"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Table } from "@/components/ui/Table"
import Select from "@/components/ui/Select"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { StatsSkeleton, TableSkeleton } from "@/components/ui/Skeleton"
import { mockAttendance, mockParentChildren } from "@/lib/mock/data"
import type { AttendanceStatus } from "@/lib/types"

const ARABIC_MONTHS = [
  "يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
]

const ARABIC_DAYS = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]

const statusColors: Record<AttendanceStatus, string> = {
  present: "bg-emerald-500",
  absent: "bg-red-500",
  late: "bg-amber-400",
  excused: "bg-blue-500",
}

const statusLabels: Record<AttendanceStatus, string> = {
  present: "حاضر",
  absent: "غائب",
  late: "متأخر",
  excused: "معذر",
}

export default function ParentAttendancePage() {
  const [selectedChild, setSelectedChild] = useState(mockParentChildren[0]?.id || "")
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const childData = useMemo(() => {
    return mockParentChildren.find((c) => c.id === selectedChild)
  }, [selectedChild])

  const attendanceRecords = useMemo(() => {
    if (!selectedChild) return []
    return mockAttendance.filter((a) => a.studentId === selectedChild)
  }, [selectedChild])

  const monthAttendance = useMemo(() => {
    return attendanceRecords.filter((a) => {
      const d = new Date(a.date)
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear
    })
  }, [attendanceRecords, currentMonth, currentYear])

  const daysInMonth = useMemo(() => {
    return new Date(currentYear, currentMonth + 1, 0).getDate()
  }, [currentMonth, currentYear])

  const firstDayOfMonth = useMemo(() => {
    return new Date(currentYear, currentMonth, 1).getDay()
  }, [currentMonth, currentYear])

  const monthStats = useMemo(() => {
    const total = monthAttendance.length
    const present = monthAttendance.filter((a) => a.status === "present").length
    const absent = monthAttendance.filter((a) => a.status === "absent").length
    const late = monthAttendance.filter((a) => a.status === "late").length
    const excused = monthAttendance.filter((a) => a.status === "excused").length
    return {
      total,
      present,
      absent,
      late,
      excused,
      rate: total > 0 ? Math.round((present / total) * 100) : 0,
    }
  }, [monthAttendance])

  const getDayStatus = useCallback(
    (day: number): AttendanceStatus | null => {
      const dateStr = new Date(currentYear, currentMonth, day).toDateString()
      const record = monthAttendance.find((a) => new Date(a.date).toDateString() === dateStr)
      return record ? record.status : null
    },
    [monthAttendance, currentMonth, currentYear]
  )

  const navigateMonth = (direction: -1 | 1) => {
    let newMonth = currentMonth + direction
    let newYear = currentYear
    if (newMonth < 0) { newMonth = 11; newYear-- }
    if (newMonth > 11) { newMonth = 0; newYear++ }
    setCurrentMonth(newMonth)
    setCurrentYear(newYear)
  }

  const handleChildChange = (id: string) => {
    setSelectedChild(id)
    toast.success("تم تغيير الطالب", { position: "top-left" })
  }

  if (hasError) {
    return (
      <div className="p-4 md:p-6">
        <ErrorState
          title="حدث خطأ في تحميل بيانات الحضور"
          message="يرجى المحاولة مرة أخرى"
          onRetry={() => { setHasError(false); setIsLoading(true); setTimeout(() => setIsLoading(false), 1000) }}
        />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Toaster />
      <PageHeader
        title="متابعة الحضور"
        description="تابع سجل حضور أبنائك"
        actions={
          mockParentChildren.length > 1 ? (
            <Select
              value={selectedChild}
              onChange={(e) => handleChildChange(e.target.value)}
              options={mockParentChildren.map((c) => ({ value: c.id, label: c.name }))}
            />
          ) : null
        }
      />

      {isLoading ? (
        <StatsSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="نسبة الحضور" value={`${monthStats.rate}%`} icon={HiOutlineChartSquareBar} color="primary" />
          <StatsCard title="حاضر" value={monthStats.present} icon={HiOutlineCheckCircle} color="success" />
          <StatsCard title="غائب" value={monthStats.absent} icon={HiOutlineXCircle} color="error" />
          <StatsCard title="متأخر" value={monthStats.late} icon={HiOutlineClock} color="warning" />
        </div>
      )}

      {childData && (
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <img src={childData.avatar} alt="" className="w-14 h-14 rounded-full bg-surface-tertiary border-2 border-border" />
            <div>
              <h3 className="font-bold text-text text-lg">{childData.name}</h3>
              <p className="text-sm text-text-secondary">{childData.grade} - {childData.school}</p>
              <Badge variant={childData.status === "active" ? "success" : "warning"} size="sm" className="mt-1" dot>
                {childData.status === "active" ? "الاشتراك نشط" : "الاشتراك منتهي"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <button type="button" onClick={() => navigateMonth(-1)} className="p-2 rounded-lg hover:bg-surface-secondary text-text-secondary transition-colors">
              <HiOutlineChevronRight className="w-5 h-5" />
            </button>
            <div className="text-center">
              <CardTitle>{ARABIC_MONTHS[currentMonth]} {currentYear}</CardTitle>
              <p className="text-sm text-text-tertiary mt-0.5">{monthStats.total} يوم مسجل</p>
            </div>
            <button type="button" onClick={() => navigateMonth(1)} className="p-2 rounded-lg hover:bg-surface-secondary text-text-secondary transition-colors">
              <HiOutlineChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {ARABIC_DAYS.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-text-tertiary py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1
              const status = getDayStatus(day)
              const isToday =
                day === new Date().getDate() &&
                currentMonth === new Date().getMonth() &&
                currentYear === new Date().getFullYear()
              return (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (i % 28) * 0.01 }}
                  className={cn(
                    "aspect-square flex flex-col items-center justify-center rounded-xl text-sm transition-all relative",
                    status ? statusColors[status] : "bg-surface-secondary",
                    isToday && "ring-2 ring-primary ring-offset-2",
                    "hover:scale-105 cursor-default"
                  )}
                >
                  <span className={cn("font-medium text-xs", status ? "text-white" : "text-text")}>
                    {day}
                  </span>
                  {status && (
                    <span className="text-[8px] mt-0.5 leading-none">
                      {status === "present" && "✓"}
                      {status === "absent" && "✗"}
                      {status === "late" && "⏱"}
                      {status === "excused" && "◉"}
                    </span>
                  )}
                </motion.div>
              )
            })}
          </div>
          <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <div className="w-3 h-3 rounded bg-emerald-500" /> حاضر
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <div className="w-3 h-3 rounded bg-red-500" /> غائب
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <div className="w-3 h-3 rounded bg-amber-400" /> متأخر
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <div className="w-3 h-3 rounded bg-blue-500" /> معذر
            </div>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <TableSkeleton rows={5} columns={4} />
      ) : attendanceRecords.length === 0 ? (
        <EmptyState
          icon={HiOutlineCalendar}
          title="لا توجد سجلات حضور"
          description="لم يتم تسجيل أي حضور لهذا الطالب بعد"
          action={
            <div className="text-sm text-text-tertiary">سيتم عرض سجلات الحضور هنا عند تسجيلها</div>
          }
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>سجل الحضور</CardTitle>
            <Badge variant="primary" size="sm">{attendanceRecords.length} سجل</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <Table
              columns={[
                { key: "courseName", header: "الكورس" },
                { key: "date", header: "التاريخ", render: (a) => (
                  <span className="text-text-secondary">{formatDate(a.date)}</span>
                )},
                { key: "status", header: "الحالة", render: (a) => (
                  <span className={cn(
                    "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border",
                    a.status === "present" && "bg-emerald-100 text-emerald-700 border-emerald-200",
                    a.status === "absent" && "bg-red-100 text-red-700 border-red-200",
                    a.status === "late" && "bg-amber-100 text-amber-700 border-amber-200",
                    a.status === "excused" && "bg-blue-100 text-blue-700 border-blue-200",
                  )}>
                    {statusLabels[a.status]}
                  </span>
                )},
                { key: "notes", header: "ملاحظات", render: (a) => (
                  <span className="text-text-tertiary text-xs">{a.notes || "—"}</span>
                )},
              ]}
              data={attendanceRecords.slice(0, 10)}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

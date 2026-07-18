"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlineExclamation,
  HiOutlineCalendar,
  HiOutlineFilter,
  HiOutlineUserGroup,
  HiOutlineUserAdd,
  HiOutlineChartSquareBar,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Badge } from "@/components/ui/Badge"
import { Table } from "@/components/ui/Table"
import { Modal } from "@/components/ui/Modal"
import { StatsCard } from "@/components/ui/StatsCard"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { SearchInput } from "@/components/ui/SearchInput"
import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select"
import { mockAttendance, mockCourses } from "@/lib/mock/data"
import { formatDate, cn } from "@/lib/utils"

const statusConfig: Record<string, { label: string; variant: "success" | "error" | "warning" | "info"; color: string }> = {
  present: { label: "حاضر", variant: "success", color: "bg-success/10 text-success border-success/20" },
  absent: { label: "غائب", variant: "error", color: "bg-error/10 text-error border-error/20" },
  late: { label: "متأخر", variant: "warning", color: "bg-warning/10 text-warning border-warning/20" },
  excused: { label: "معذر", variant: "info", color: "bg-info/10 text-info border-info/20" },
}

export default function AttendancePage() {
  const [search, setSearch] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [showRecordModal, setShowRecordModal] = useState(false)

  const filtered = useMemo(() => {
    return mockAttendance.filter((a) => {
      const matchSearch = a.studentName.includes(search)
      const matchCourse = courseFilter === "all" || a.courseId === courseFilter
      const matchStatus = statusFilter === "all" || a.status === statusFilter
      const matchDate = !selectedDate || a.date.toISOString().split("T")[0] === selectedDate
      return matchSearch && matchCourse && matchStatus && matchDate
    })
  }, [search, courseFilter, statusFilter, selectedDate])

  const stats = useMemo(() => {
    const today = filtered
    const total = today.length
    const present = today.filter((a) => a.status === "present").length
    const absent = today.filter((a) => a.status === "absent").length
    const late = today.filter((a) => a.status === "late").length
    return {
      total,
      present,
      absent,
      late,
      presentRate: total > 0 ? Math.round((present / total) * 100) : 0,
    }
  }, [filtered])

  const weekDays = ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="الحضور والغياب" subtitle="تسجيل ومتابعة حضور الطلاب" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="نسبة الحضور" value={`${stats.presentRate}%`} icon={HiOutlineChartSquareBar} color="primary" />
        <StatsCard title="الحاضرون" value={stats.present} icon={HiOutlineCheckCircle} color="success" />
        <StatsCard title="الغائبون" value={stats.absent} icon={HiOutlineXCircle} color="error" />
        <StatsCard title="المتأخرون" value={stats.late} icon={HiOutlineClock} color="warning" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>الحضور اليومي</CardTitle>
          <div className="flex items-center gap-2 text-sm text-text-tertiary">
            <HiOutlineCalendar className="w-4 h-4" />
            <span>{formatDate(new Date(selectedDate || Date.now()))}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-1 mb-4">
            {weekDays.map((day, i) => {
              const dayAttendance = mockAttendance.filter(
                (a) => new Date(a.date).getDay() === i
              )
              const presentCount = dayAttendance.filter((a) => a.status === "present").length
              const rate = dayAttendance.length > 0 ? (presentCount / dayAttendance.length) * 100 : 0
              return (
                <div key={day} className="flex-1 text-center p-2 rounded-lg bg-surface-secondary border border-border">
                  <p className="text-xs text-text-tertiary mb-1">{day}</p>
                  <div className="h-16 flex items-end justify-center">
                    <div
                      className="w-full max-w-[20px] rounded-t-md bg-primary transition-all duration-500"
                      style={{ height: `${rate}%`, minHeight: "4px" }}
                    />
                  </div>
                  <p className="text-xs font-medium text-text mt-1">{Math.round(rate)}%</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <div className="flex flex-1 flex-wrap gap-3 w-full">
          <div className="w-full md:w-48">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-surface border border-border rounded-xl px-3.5 py-2.5 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <SearchInput value={search} onChange={setSearch} placeholder="بحث باسم الطالب..." />
          </div>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
          >
            <option value="all">جميع الكورسات</option>
            {mockCourses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
          >
            <option value="all">جميع الحالات</option>
            <option value="present">حاضر</option>
            <option value="absent">غائب</option>
            <option value="late">متأخر</option>
            <option value="excused">معذر</option>
          </select>
        </div>
        <Button leftIcon={<HiOutlineUserAdd className="w-4 h-4" />} onClick={() => setShowRecordModal(true)}>
          تسجيل حضور
        </Button>
      </div>

      <Table
        columns={[
          { key: "studentName", header: "اسم الطالب", render: (a) => (
            <span className="text-sm font-medium text-text">{a.studentName}</span>
          )},
          { key: "courseName", header: "الكورس" },
          { key: "date", header: "التاريخ", render: (a) => (
            <span className="text-sm text-text-secondary">{formatDate(a.date)}</span>
          )},
          { key: "status", header: "الحالة", render: (a) => {
            const config = statusConfig[a.status]
            return (
              <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border", config.color)}>
                {config.label}
              </span>
            )
          }},
          { key: "checkIn", header: "وقت الحضور", render: (a) => (
            <span className="text-sm text-text-secondary" dir="ltr">{a.checkIn || "—"}</span>
          )},
          { key: "checkOut", header: "وقت الانصراف", render: (a) => (
            <span className="text-sm text-text-secondary" dir="ltr">{a.checkOut || "—"}</span>
          )},
          { key: "notes", header: "ملاحظات", render: (a) => (
            <span className="text-xs text-text-tertiary">{a.notes || "—"}</span>
          )},
        ]}
        data={filtered}
      />

      <Modal isOpen={showRecordModal} onClose={() => setShowRecordModal(false)} title="تسجيل حضور" subtitle="سجل حضور الطلاب للجلسة الحالية" size="lg">
        <div className="space-y-4">
          <Select
            label="الكورس"
            options={mockCourses.map((c) => ({ value: c.id, label: c.title }))}
            placeholder="اختر الكورس"
          />
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
            <span className="text-sm text-text">عدد الطلاب الحاضرين</span>
            <input type="number" defaultValue={5} className="w-20 bg-surface border border-border rounded-lg px-3 py-1.5 text-sm text-text text-center" />
          </div>
          <div className="pt-4 flex gap-3">
            <Button variant="primary" size="lg" className="flex-1">تأكيد الحضور</Button>
            <Button variant="secondary" size="lg" onClick={() => setShowRecordModal(false)}>إلغاء</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

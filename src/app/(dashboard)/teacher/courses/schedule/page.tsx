"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlinePlus,
  HiOutlineChevronRight,
  HiOutlineChevronLeft,
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlineEye,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineBookOpen,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import { Modal } from "@/components/ui/Modal"
import Select from "@/components/ui/Select"
import Input from "@/components/ui/Input"
import { EmptyState } from "@/components/ui/EmptyState"
import { Alert } from "@/components/ui/Alert"
import { mockCourses } from "@/lib/mock/data"
import { cn, formatDate } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

const daysOfWeek = ["ط·آ§ط¸â€‍ط·آ³ط·آ¨ط·ع¾", "ط·آ§ط¸â€‍ط·آ£ط·آ­ط·آ¯", "ط·آ§ط¸â€‍ط·آ¥ط·آ«ط¸â€ ط¸ظ¹ط¸â€ ", "ط·آ§ط¸â€‍ط·آ«ط¸â€‍ط·آ§ط·آ«ط·آ§ط·طŒ", "ط·آ§ط¸â€‍ط·آ£ط·آ±ط·آ¨ط·آ¹ط·آ§ط·طŒ", "ط·آ§ط¸â€‍ط·آ®ط¸â€¦ط¸ظ¹ط·آ³", "ط·آ§ط¸â€‍ط·آ¬ط¸â€¦ط·آ¹ط·آ©"]

const mockScheduledLessons = [
  { id: "sched-1", courseId: "c-1", courseName: "ط·آ§ط¸â€‍ط¸â€ ط·آ­ط¸ث† ط¸ث†ط·آ§ط¸â€‍ط·آµط·آ±ط¸ظ¾", lessonName: "ط·آ¯ط·آ±ط·آ³ 1: ط·آ§ط¸â€‍ط¸â€¦ط¸â€ڑط·آ¯ط¸â€¦ط·آ©", date: new Date(2025, 6, 20), time: "10:00", duration: 45, notes: "ط¸â€¦ط·آ±ط·آ§ط·آ¬ط·آ¹ط·آ© ط·آ³ط·آ±ط¸ظ¹ط·آ¹ط·آ© ط¸â€‍ط¸â€‍ط·آ¯ط·آ±ط·آ³ ط·آ§ط¸â€‍ط·آ³ط·آ§ط·آ¨ط¸â€ڑ", autoPublish: true },
  { id: "sched-2", courseId: "c-1", courseName: "ط·آ§ط¸â€‍ط¸â€ ط·آ­ط¸ث† ط¸ث†ط·آ§ط¸â€‍ط·آµط·آ±ط¸ظ¾", lessonName: "ط·آ¯ط·آ±ط·آ³ 2: ط·آ§ط¸â€‍ط·آ´ط·آ±ط·آ­", date: new Date(2025, 6, 22), time: "10:00", duration: 45, notes: "", autoPublish: false },
  { id: "sched-3", courseId: "c-2", courseName: "ط·آ§ط¸â€‍ط·آ¨ط¸â€‍ط·آ§ط·ط›ط·آ© ط¸ث†ط·آ§ط¸â€‍ط·آ£ط·آ¯ط·آ¨", lessonName: "ط·آ¯ط·آ±ط·آ³ 1: ط·آ§ط¸â€‍ط¸â€¦ط¸â€ڑط·آ¯ط¸â€¦ط·آ©", date: new Date(2025, 6, 21), time: "14:00", duration: 60, notes: "ط·ع¾ط·آ¬ط¸â€،ط¸ظ¹ط·آ² ط·آ§ط¸â€‍ط·آ¹ط·آ±ط·آ¶ ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ¯ط¸ظ¹ط¸â€¦ط¸ظ¹", autoPublish: true },
  { id: "sched-4", courseId: "c-6", courseName: "ط·آ§ط¸â€‍ط·ع¾ط·آ¹ط·آ¨ط¸ظ¹ط·آ± ط¸ث†ط·آ§ط¸â€‍ط·آ¥ط¸â€ ط·آ´ط·آ§ط·طŒ", lessonName: "ط·آ¯ط·آ±ط·آ³ 3: ط·آ§ط¸â€‍ط·ع¾ط·آ·ط·آ¨ط¸ظ¹ط¸â€ڑ", date: new Date(2025, 6, 23), time: "12:00", duration: 30, notes: "", autoPublish: true },
  { id: "sched-5", courseId: "c-4", courseName: "ط¸â€ڑط¸ث†ط·آ§ط·آ¹ط·آ¯ ط·آ§ط¸â€‍ط¸â€ ط·آ­ط¸ث† ط·آ§ط¸â€‍ط¸â€¦ط·ع¾ط¸â€ڑط·آ¯ط¸â€¦", lessonName: "ط·آ¯ط·آ±ط·آ³ 1: ط¸â€¦ط¸â€ڑط·آ¯ط¸â€¦ط·آ©", date: new Date(2025, 6, 25), time: "09:00", duration: 50, notes: "ط·آ§ط·آ®ط·ع¾ط·آ¨ط·آ§ط·آ± ط¸â€ڑط·آµط¸ظ¹ط·آ± ط¸ظ¾ط¸ظ¹ ط¸â€ ط¸â€،ط·آ§ط¸ظ¹ط·آ© ط·آ§ط¸â€‍ط·آ¯ط·آ±ط·آ³", autoPublish: false },
]

export default function SchedulePage() {
  const [schedule, setSchedule] = useState(mockScheduledLessons)
  const [showAddModal, setShowAddModal] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 6))
  const [autoPublish, setAutoPublish] = useState(true)
  const [newLesson, setNewLesson] = useState({ courseId: "", lessonName: "", date: "", time: "", duration: 45, notes: "" })
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
  const startDay = monthStart.getDay()
  const daysInMonth = monthEnd.getDate()

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))

  const monthName = currentMonth.toLocaleDateString("ar-EG", { month: "long", year: "numeric" })

  const lessonsOnDate = (day: number) => {
    return schedule.filter((s) => {
      const d = s.date
      return d.getFullYear() === currentMonth.getFullYear() && d.getMonth() === currentMonth.getMonth() && d.getDate() === day
    })
  }

  const addLesson = () => {
    if (!newLesson.courseId || !newLesson.lessonName || !newLesson.date || !newLesson.time) return
    const course = mockCourses.find((c) => c.id === newLesson.courseId)
    setSchedule((prev) => [...prev, {
      id: `sched-${Date.now()}`,
      courseId: newLesson.courseId,
      courseName: course?.title || "",
      lessonName: newLesson.lessonName,
      date: new Date(newLesson.date),
      time: newLesson.time,
      duration: newLesson.duration,
      notes: newLesson.notes,
      autoPublish: autoPublish,
    }])
    toast.success("طھظ…طھ ط¥ط¶ط§ظپط© ط§ظ„ط¯ط±ط³ ط¥ظ„ظ‰ ط§ظ„ط¬ط¯ظˆظ„ط© ط¨ظ†ط¬ط§ط­")
    setShowAddModal(false)
    setNewLesson({ courseId: "", lessonName: "", date: "", time: "", duration: 45, notes: "" })
  }

  const deleteLesson = (id: string) => {
    setSchedule((prev) => prev.filter((s) => s.id !== id))
    toast.success("طھظ… ط­ط°ظپ ط§ظ„ط¯ط±ط³ ظ…ظ† ط§ظ„ط¬ط¯ظˆظ„ط©")
  }

  const courseOptions = mockCourses.map((c) => ({ value: c.id, label: c.title }))

  const sortedSchedule = useMemo(() => [...schedule].sort((a, b) => a.date.getTime() - b.date.getTime()), [schedule])

  const upcomingLessons = useMemo(() => sortedSchedule.filter((s) => s.date >= new Date()), [sortedSchedule])

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³ط·آ§ط·ع¾", href: "/teacher/courses" }, { label: "ط·آ¬ط·آ¯ط¸ث†ط¸â€‍ ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³ط·آ§ط·ع¾" }]} />
      <DashboardHeader title="ط·آ¬ط·آ¯ط¸ث†ط¸â€‍ط·آ© ط·آ§ط¸â€‍ط·آ¯ط·آ±ط¸ث†ط·آ³" subtitle="ط·ع¾ط·آ®ط·آ·ط¸ظ¹ط·آ· ط¸ث†ط·آ¬ط·آ¯ط¸ث†ط¸â€‍ط·آ© ط·آ§ط¸â€‍ط·آ¯ط·آ±ط¸ث†ط·آ³ ط¸â€‍ط¸â€‍ط·آ·ط¸â€‍ط·آ§ط·آ¨" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="info" size="md">{schedule.length} ط·آ¯ط·آ±ط·آ³ ط¸â€¦ط·آ¬ط·آ¯ط¸ث†ط¸â€‍</Badge>
          <Badge variant="success" size="md">{upcomingLessons.length} ط¸â€ڑط·آ§ط·آ¯ط¸â€¦</Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-surface border border-border rounded-xl">
            <button type="button"
              onClick={() => setViewMode("list")}
              className={cn("px-3 py-1.5 text-xs rounded-lg transition-colors", viewMode === "list" ? "bg-primary text-white" : "text-text-secondary")}
            >
              ط¸â€ڑط·آ§ط·آ¦ط¸â€¦ط·آ©
            </button>
            <button type="button"
              onClick={() => setViewMode("grid")}
              className={cn("px-3 py-1.5 text-xs rounded-lg transition-colors", viewMode === "grid" ? "bg-primary text-white" : "text-text-secondary")}
            >
              ط·ع¾ط¸â€ڑط¸ث†ط¸ظ¹ط¸â€¦
            </button>
          </div>
          <Button variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
            ط·آ¬ط·آ¯ط¸ث†ط¸â€‍ط·آ© ط·آ¯ط·آ±ط·آ³ ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <button type="button" onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-surface-secondary text-text-tertiary"><HiOutlineChevronRight className="w-5 h-5" /></button>
              <CardTitle>{monthName}</CardTitle>
              <button type="button" onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-surface-secondary text-text-tertiary"><HiOutlineChevronLeft className="w-5 h-5" /></button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-px bg-border rounded-xl overflow-hidden">
              {daysOfWeek.map((d) => (
                <div key={d} className="bg-surface-secondary px-2 py-2 text-center text-xs font-semibold text-text-secondary">{d}</div>
              ))}
              {Array.from({ length: startDay }, (_, i) => (
                <div key={`empty-${i}`} className="bg-surface-secondary/50 p-2 min-h-[80px]" />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1
                const lessons = lessonsOnDate(day)
                const isToday = new Date().getDate() === day && new Date().getMonth() === currentMonth.getMonth() && new Date().getFullYear() === currentMonth.getFullYear()
                return (
                  <div
                    key={day}
                    className={cn(
                      "bg-surface p-1.5 min-h-[80px] border-b border-l border-border/50 transition-colors",
                      isToday && "bg-primary-50 dark:bg-primary-900/10 ring-1 ring-primary/30"
                    )}
                  >
                    <span className={cn("text-xs font-medium px-1.5 py-0.5 rounded", isToday && "bg-primary text-white")}>{day}</span>
                    <div className="mt-1 space-y-0.5">
                      {lessons.slice(0, 2).map((l) => (
                        <Link key={l.id} href={`/teacher/courses/${l.courseId}`} className="text-[10px] px-1 py-0.5 rounded bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 truncate leading-tight block hover:opacity-80 transition-opacity">
                          {l.courseName}
                        </Link>
                      ))}
                      {lessons.length > 2 && (
                        <span className="text-[10px] text-text-tertiary px-1">+{lessons.length - 2}</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>ط·آ§ط¸â€‍ط·آ¯ط·آ±ط¸ث†ط·آ³ ط·آ§ط¸â€‍ط¸â€¦ط·آ¬ط·آ¯ط¸ث†ط¸â€‍ط·آ©</CardTitle>
            <CardDescription>ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¹ ط·آ§ط¸â€‍ط·آ¯ط·آ±ط¸ث†ط·آ³ ط·آ­ط·آ³ط·آ¨ ط·ع¾ط·آ§ط·آ±ط¸ظ¹ط·آ® ط·آ§ط¸â€‍ط·آ¬ط·آ¯ط¸ث†ط¸â€‍ط·آ©</CardDescription>
          </CardHeader>
          <CardContent>
            {sortedSchedule.length === 0 ? (
              <EmptyState
                icon={HiOutlineCalendar}
                title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·آ¯ط·آ±ط¸ث†ط·آ³ ط¸â€¦ط·آ¬ط·آ¯ط¸ث†ط¸â€‍ط·آ©"
                description="ط¸â€ڑط¸â€¦ ط·آ¨ط·آ¬ط·آ¯ط¸ث†ط¸â€‍ط·آ© ط·آ£ط¸ث†ط¸â€‍ ط·آ¯ط·آ±ط·آ³ ط·آ§ط¸â€‍ط·آ¢ط¸â€ "
                action={<Button variant="primary" leftIcon={<HiOutlinePlus className="w-3 h-3" />} onClick={() => setShowAddModal(true)}>ط·آ¬ط·آ¯ط¸ث†ط¸â€‍ط·آ© ط·آ¯ط·آ±ط·آ³</Button>}
              />
            ) : (
              <div className="space-y-2">
                {sortedSchedule.map((s, idx) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-surface-secondary border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex flex-col items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">{s.date.getDate()}</span>
                      <span className="text-[10px] text-primary/70">{daysOfWeek[s.date.getDay()]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-text text-sm">{s.lessonName}</h4>
                        <Link href={`/teacher/courses/${s.courseId}`}>
                          <Badge variant="info" size="sm" className="cursor-pointer hover:opacity-80 transition-opacity">{s.courseName}</Badge>
                        </Link>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-text-tertiary">
                        <span className="flex items-center gap-1"><HiOutlineClock className="w-3 h-3" />{s.time}</span>
                        <span>{s.duration} ط·آ¯ط¸â€ڑط¸ظ¹ط¸â€ڑط·آ©</span>
                        {s.notes && <span className="truncate max-w-[200px]">ط¢آ· {s.notes}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={s.autoPublish ? "success" : "warning"} size="sm">{s.autoPublish ? "ط¸â€ ط·آ´ط·آ± ط·ع¾ط¸â€‍ط¸â€ڑط·آ§ط·آ¦ط¸ظ¹" : "ط¸ظ¹ط·آ¯ط¸ث†ط¸ظ¹"}</Badge>
                      <button type="button" className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"><HiOutlinePencil size={14} /></button>
                      <button type="button" onClick={() => deleteLesson(s.id)} className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors"><HiOutlineTrash size={14} /></button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <HiOutlineEye className="w-5 h-5 text-primary" />
            <CardTitle>ط·آ§ط¸â€‍ط¸â€ ط·آ´ط·آ± ط·آ§ط¸â€‍ط·ع¾ط¸â€‍ط¸â€ڑط·آ§ط·آ¦ط¸ظ¹</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text">ط·آ§ط¸â€‍ط¸â€ ط·آ´ط·آ± ط·آ§ط¸â€‍ط·ع¾ط¸â€‍ط¸â€ڑط·آ§ط·آ¦ط¸ظ¹ ط·آ¹ط¸â€ ط·آ¯ ط·آ­ط¸â€‍ط¸ث†ط¸â€‍ ط·آ§ط¸â€‍ط¸â€¦ط¸ث†ط·آ¹ط·آ¯</p>
              <p className="text-xs text-text-tertiary">ط·آ¹ط¸â€ ط·آ¯ ط·ع¾ط¸ظ¾ط·آ¹ط¸ظ¹ط¸â€‍ط¸â€،ط·إ’ ط·آ³ط¸ظ¹ط·ع¾ط¸â€¦ ط¸â€ ط·آ´ط·آ± ط·آ§ط¸â€‍ط·آ¯ط·آ±ط·آ³ ط·ع¾ط¸â€‍ط¸â€ڑط·آ§ط·آ¦ط¸ظ¹ط·آ§ط¸â€¹ ط¸â€‍ط¸â€‍ط·آ·ط¸â€‍ط·آ§ط·آ¨ ط¸ظ¾ط¸ظ¹ ط·ع¾ط·آ§ط·آ±ط¸ظ¹ط·آ® ط¸ث†ط¸â€¦ط¸ظ¹ط·آ¹ط·آ§ط·آ¯ ط·آ§ط¸â€‍ط·آ¬ط·آ¯ط¸ث†ط¸â€‍ط·آ©</p>
            </div>
            <button type="button"
              onClick={() => setAutoPublish(!autoPublish)}
              className={cn("w-12 h-6 rounded-full transition-colors relative", autoPublish ? "bg-primary" : "bg-surface-tertiary")}
            >
              <span className={cn("absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform", autoPublish ? "translate-x-6" : "translate-x-0.5")} />
            </button>
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="ط·آ¬ط·آ¯ط¸ث†ط¸â€‍ط·آ© ط·آ¯ط·آ±ط·آ³ ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯" size="lg">
        <div className="space-y-4">
          <Select
            label="ط·آ§ط·آ®ط·ع¾ط·آ± ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³"
            options={courseOptions}
            value={newLesson.courseId}
            onChange={(e) => setNewLesson({ ...newLesson, courseId: e.target.value })}
            placeholder="ط·آ§ط·آ®ط·ع¾ط·آ± ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³"
          />
          <Input
            label="ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط·آ¯ط·آ±ط·آ³"
            value={newLesson.lessonName}
            onChange={(e) => setNewLesson({ ...newLesson, lessonName: e.target.value })}
            placeholder="ط¸â€¦ط·آ«ط·آ§ط¸â€‍: ط·آ¯ط·آ±ط·آ³ 4: ط·آ§ط¸â€‍ط·ع¾ط·آ·ط·آ¨ط¸ظ¹ط¸â€ڑط·آ§ط·ع¾"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="ط·آ§ط¸â€‍ط·ع¾ط·آ§ط·آ±ط¸ظ¹ط·آ®"
              type="date"
              value={newLesson.date}
              onChange={(e) => setNewLesson({ ...newLesson, date: e.target.value })}
            />
            <Input
              label="ط·آ§ط¸â€‍ط¸ث†ط¸â€ڑط·ع¾"
              type="time"
              value={newLesson.time}
              onChange={(e) => setNewLesson({ ...newLesson, time: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="ط·آ§ط¸â€‍ط¸â€¦ط·آ¯ط·آ© (ط·آ¯ط¸â€ڑط¸ظ¹ط¸â€ڑط·آ©)"
              type="number"
              value={newLesson.duration}
              onChange={(e) => setNewLesson({ ...newLesson, duration: Number(e.target.value) })}
            />
            <div className="flex items-end pb-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-text-secondary">ط¸â€ ط·آ´ط·آ± ط·ع¾ط¸â€‍ط¸â€ڑط·آ§ط·آ¦ط¸ظ¹</span>
                <button type="button"
                  onClick={() => setAutoPublish(!autoPublish)}
                  className={cn("w-10 h-5 rounded-full transition-colors relative", autoPublish ? "bg-primary" : "bg-surface-tertiary")}
                >
                  <span className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform", autoPublish ? "translate-x-5" : "translate-x-0.5")} />
                </button>
              </div>
            </div>
          </div>
          <Input
            label="ط¸â€¦ط¸â€‍ط·آ§ط·آ­ط·آ¸ط·آ§ط·ع¾ (ط·آ§ط·آ®ط·ع¾ط¸ظ¹ط·آ§ط·آ±ط¸ظ¹)"
            value={newLesson.notes}
            onChange={(e) => setNewLesson({ ...newLesson, notes: e.target.value })}
            placeholder="ط¸â€¦ط¸â€‍ط·آ§ط·آ­ط·آ¸ط·آ§ط·ع¾ ط¸â€‍ط¸â€‍ط·آ¯ط·آ±ط·آ³..."
          />
          <div className="flex gap-3 pt-2">
            <Button variant="primary" className="flex-1" leftIcon={<HiOutlineCheck className="w-4 h-4" />} onClick={addLesson}>
              ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ¥ط¸â€‍ط¸â€° ط·آ§ط¸â€‍ط·آ¬ط·آ¯ط¸ث†ط¸â€‍
            </Button>
            <Button variant="secondary" leftIcon={<HiOutlineX className="w-4 h-4" />} onClick={() => setShowAddModal(false)}>
              ط·آ¥ط¸â€‍ط·ط›ط·آ§ط·طŒ
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

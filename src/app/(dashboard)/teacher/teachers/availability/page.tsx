"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineUsers, HiOutlineClock, HiOutlineCalendar,
  HiOutlineBriefcase, HiOutlineSun, HiOutlineMoon,
  HiOutlinePlus, HiOutlineTrash, HiOutlineExclamationCircle,
  HiOutlineCheckCircle, HiOutlineFilter,
} from "react-icons/hi"
import toast from "react-hot-toast"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Modal } from "@/components/ui/Modal"
import { Progress } from "@/components/ui/Progress"
import { cn, det } from "@/lib/utils"

const days = ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"]
const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

interface DayHours {
  day: number
  start: string
  end: string
}

interface Vacation {
  id: string
  start: string
  end: string
  reason: string
}

interface BookedSlot {
  day: number
  start: string
  end: string
  subject: string
  group: string
}

interface Teacher {
  id: string
  name: string
  subject: string
  totalHours: number
  avatar: string
  availability: DayHours[]
  vacations: Vacation[]
  bookedSlots: BookedSlot[]
}

function generateId(): string {
  return `id-${Date.now()}-${Math.floor(det() * 10000)}`
}

function toMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number)
  return h * 60 + m
}

function hasOverlap(a: { start: string; end: string }, b: { start: string; end: string }): boolean {
  return toMinutes(a.start) < toMinutes(b.end) && toMinutes(b.start) < toMinutes(a.end)
}

const teachersData: Teacher[] = [
  { id: "t1", name: "أ. خالد صقر", subject: "الكيمياء", totalHours: 24, avatar: "",
    availability: [{ day: 0, start: "09:00", end: "14:00" }, { day: 1, start: "08:00", end: "13:00" }, { day: 2, start: "10:00", end: "15:00" }, { day: 3, start: "08:00", end: "12:00" }],
    vacations: [{ id: "v1", start: "2026-08-01", end: "2026-08-10", reason: "إجازة سنوية" }],
    bookedSlots: [
      { day: 0, start: "09:00", end: "10:30", subject: "الكيمياء", group: "مجموعة 1" },
      { day: 0, start: "10:00", end: "11:30", subject: "الكيمياء", group: "مجموعة 2" },
      { day: 1, start: "08:00", end: "09:30", subject: "الكيمياء", group: "مجموعة 3" },
      { day: 1, start: "10:00", end: "11:30", subject: "الكيمياء", group: "مجموعة 1" },
      { day: 2, start: "10:00", end: "11:30", subject: "الكيمياء", group: "مجموعة 2" },
    ] },
  { id: "t2", name: "أ. أحمد سمير", subject: "الفيزياء", totalHours: 24, avatar: "",
    availability: [{ day: 0, start: "08:00", end: "13:00" }, { day: 1, start: "09:00", end: "14:00" }, { day: 3, start: "08:00", end: "12:00" }, { day: 4, start: "09:00", end: "14:00" }],
    vacations: [],
    bookedSlots: [
      { day: 0, start: "08:00", end: "09:30", subject: "الفيزياء", group: "مجموعة 2" },
      { day: 0, start: "10:00", end: "11:30", subject: "الفيزياء", group: "مجموعة 3" },
      { day: 1, start: "09:00", end: "10:30", subject: "الفيزياء", group: "مجموعة 1" },
      { day: 3, start: "08:00", end: "09:30", subject: "الفيزياء", group: "مجموعة 2" },
      { day: 4, start: "09:00", end: "10:30", subject: "الفيزياء", group: "مجموعة 3" },
    ] },
  { id: "t3", name: "أ. نبيل إبراهيم", subject: "الرياضيات", totalHours: 20, avatar: "",
    availability: [{ day: 0, start: "10:00", end: "15:00" }, { day: 2, start: "08:00", end: "13:00" }, { day: 3, start: "10:00", end: "15:00" }, { day: 4, start: "08:00", end: "12:00" }],
    vacations: [{ id: "v2", start: "2026-07-25", end: "2026-07-30", reason: "ظرف عائلي" }],
    bookedSlots: [
      { day: 0, start: "10:00", end: "11:30", subject: "الرياضيات", group: "مجموعة 1" },
      { day: 2, start: "08:00", end: "09:30", subject: "الرياضيات", group: "مجموعة 2" },
      { day: 2, start: "10:00", end: "11:30", subject: "الرياضيات", group: "مجموعة 3" },
      { day: 3, start: "10:00", end: "11:30", subject: "الرياضيات", group: "مجموعة 1" },
    ] },
  { id: "t4", name: "أ. محمد صلاح", subject: "اللغة العربية", totalHours: 22, avatar: "",
    availability: [{ day: 1, start: "08:00", end: "14:00" }, { day: 2, start: "09:00", end: "13:00" }, { day: 4, start: "08:00", end: "14:00" }, { day: 5, start: "10:00", end: "14:00" }],
    vacations: [],
    bookedSlots: [
      { day: 1, start: "08:00", end: "09:30", subject: "العربية", group: "مجموعة 2" },
      { day: 1, start: "10:00", end: "11:30", subject: "العربية", group: "مجموعة 1" },
      { day: 2, start: "09:00", end: "10:30", subject: "العربية", group: "مجموعة 3" },
      { day: 4, start: "08:00", end: "09:30", subject: "العربية", group: "مجموعة 2" },
    ] },
  { id: "t5", name: "أ. أحمد فريد", subject: "اللغة الإنجليزية", totalHours: 20, avatar: "",
    availability: [{ day: 0, start: "08:00", end: "12:00" }, { day: 2, start: "08:00", end: "12:00" }, { day: 3, start: "09:00", end: "14:00" }, { day: 5, start: "09:00", end: "13:00" }],
    vacations: [{ id: "v3", start: "2026-08-15", end: "2026-08-20", reason: "إجازة سنوية" }],
    bookedSlots: [
      { day: 0, start: "08:00", end: "09:30", subject: "الإنجليزية", group: "مجموعة 1" },
      { day: 2, start: "08:00", end: "09:30", subject: "الإنجليزية", group: "مجموعة 3" },
      { day: 3, start: "09:00", end: "10:30", subject: "الإنجليزية", group: "مجموعة 2" },
    ] },
  { id: "t6", name: "أ. مينا مجدي", subject: "الأحياء", totalHours: 18, avatar: "",
    availability: [{ day: 1, start: "10:00", end: "15:00" }, { day: 3, start: "08:00", end: "13:00" }, { day: 4, start: "10:00", end: "15:00" }, { day: 5, start: "08:00", end: "12:00" }],
    vacations: [],
    bookedSlots: [
      { day: 1, start: "10:00", end: "11:30", subject: "الأحياء", group: "مجموعة 1" },
      { day: 3, start: "08:00", end: "09:30", subject: "الأحياء", group: "مجموعة 2" },
      { day: 4, start: "10:00", end: "11:30", subject: "الأحياء", group: "مجموعة 3" },
    ] },
]

function bookedMinutesForDay(teacher: Teacher, day: number): number {
  return teacher.bookedSlots
    .filter((s) => s.day === day)
    .reduce((acc, s) => acc + (toMinutes(s.end) - toMinutes(s.start)), 0)
}

function totalBookedMinutes(teacher: Teacher): number {
  return days.reduce((acc, _, d) => acc + bookedMinutesForDay(teacher, d), 0)
}

function totalAvailableMinutes(teacher: Teacher): number {
  return teacher.availability.reduce((acc, a) => acc + (toMinutes(a.end) - toMinutes(a.start)), 0)
}

function getSlotStatus(teacher: Teacher, day: number, time: string): "free" | "booked" | "conflict" {
  const isAvailable = teacher.availability.some(
    (a) => a.day === day && toMinutes(time) >= toMinutes(a.start) && toMinutes(time) < toMinutes(a.end)
  )
  if (!isAvailable) return "free"
  const daySlots = teacher.bookedSlots.filter(
    (s) => s.day === day && toMinutes(time) >= toMinutes(s.start) && toMinutes(time) < toMinutes(s.end)
  )
  if (daySlots.length > 1) return "conflict"
  if (daySlots.length === 1) return "booked"
  return "free"
}

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function TeachersAvailabilityPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(teachersData)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [dayFilter, setDayFilter] = useState<number | null>(null)
  const [availModal, setAvailModal] = useState(false)
  const [vacationModal, setVacationModal] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
  const [newAvail, setNewAvail] = useState<DayHours>({ day: 0, start: "08:00", end: "10:00" })
  const [newVacation, setNewVacation] = useState({ start: "", end: "", reason: "" })

  const onLeave = teachers.filter((t) => t.vacations.length > 0).length

  const stats = useMemo(() => ({
    totalTeachers: teachers.length,
    totalAvailHours: teachers.reduce((acc, t) => acc + totalAvailableMinutes(t) / 60, 0),
    totalBookedHours: teachers.reduce((acc, t) => acc + totalBookedMinutes(t) / 60, 0),
    onLeave,
  }), [teachers])

  const addAvailability = () => {
    if (!selectedTeacher) return
    if (toMinutes(newAvail.start) >= toMinutes(newAvail.end)) {
      toast.error("وقت البداية يجب أن يكون قبل وقت النهاية")
      return
    }
    setTeachers((prev) =>
      prev.map((t) =>
        t.id === selectedTeacher.id
          ? { ...t, availability: [...t.availability, newAvail] }
          : t
      )
    )
    toast.success("تم إضافة موعد التوفر بنجاح")
    setAvailModal(false)
  }

  const addVacation = () => {
    if (!selectedTeacher) return
    if (!newVacation.start || !newVacation.end) {
      toast.error("يرجى تحديد تاريخ البداية والنهاية")
      return
    }
    if (newVacation.start > newVacation.end) {
      toast.error("تاريخ البداية يجب أن يكون قبل تاريخ النهاية")
      return
    }
    const vacation: Vacation = { id: generateId(), ...newVacation }
    setTeachers((prev) =>
      prev.map((t) =>
        t.id === selectedTeacher.id
          ? { ...t, vacations: [...t.vacations, vacation] }
          : t
      )
    )
    toast.success("تم إضافة الإجازة بنجاح")
    setNewVacation({ start: "", end: "", reason: "" })
    setVacationModal(false)
  }

  const removeVacation = (teacherId: string, vacationId: string) => {
    setTeachers((prev) =>
      prev.map((t) =>
        t.id === teacherId
          ? { ...t, vacations: t.vacations.filter((v) => v.id !== vacationId) }
          : t
      )
    )
    toast.success("تم حذف الإجازة")
  }

  const handleOpenAvail = (t: Teacher) => {
    setSelectedTeacher(t)
    setNewAvail({ day: 0, start: "08:00", end: "10:00" })
    setAvailModal(true)
  }

  const handleOpenVacation = (t: Teacher) => {
    setSelectedTeacher(t)
    setNewVacation({ start: "", end: "", reason: "" })
    setVacationModal(true)
  }

  const filteredTeachers = useMemo(() => {
    if (dayFilter === null) return teachers
    return teachers.filter((t) => t.availability.some((a) => a.day === dayFilter))
  }, [teachers, dayFilter])

  return (
    <div className="min-h-screen">
      <Breadcrumb items={[{ label: "المعلمين", href: "/teacher/teachers" }, { label: "المواعيد المتاحة" }]} />
      <PageHeader title="توفر المدرسين" description="إدارة أوقات التوفر والإجازات وجدول المدرسين" />
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <StatsCard title="إجمالي المدرسين" value={stats.totalTeachers} icon={HiOutlineUsers} color="primary" />
            <StatsCard title="ساعات التوفر" value={Math.round(stats.totalAvailHours)} icon={HiOutlineClock} color="success" subtitle="إجمالي ساعات التوفر" />
            <StatsCard title="ساعات محجوزة" value={Math.round(stats.totalBookedHours)} icon={HiOutlineCalendar} color="warning" subtitle="إجمالي الساعات المحجوزة" />
            <StatsCard title="في إجازة" value={stats.onLeave} icon={HiOutlineBriefcase} color="error" subtitle="عدد المدرسين في إجازة" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <HiOutlineFilter className="w-4 h-4 text-text-tertiary" />
              <span className="text-xs text-text-tertiary">تصفية باليوم:</span>
              <button type="button" onClick={() => setDayFilter(null)}
                className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                  dayFilter === null
                    ? "bg-primary text-white border-primary"
                    : "bg-surface text-text-secondary border-border hover:bg-surface-secondary"
                )}>الكل</button>
              {days.map((d, i) => (
                <button type="button" key={d} onClick={() => setDayFilter(i)}
                  className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                    dayFilter === i
                      ? "bg-primary text-white border-primary"
                      : "bg-surface text-text-secondary border-border hover:bg-surface-secondary"
                  )}>{d}</button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4">
            {filteredTeachers.map((teacher, idx) => {
              const bm = totalBookedMinutes(teacher)
              const am = totalAvailableMinutes(teacher) || 1
              const loadPct = Math.min(Math.round((bm / am) * 100), 100)
              const hoursBooked = Math.round(bm / 60 * 10) / 10
              const isExpanded = expandedId === teacher.id
              const conflicts = teacher.bookedSlots.filter((s, _, arr) =>
                arr.filter((o) => o.day === s.day && hasOverlap(s, o)).length > 1
              )

              return (
                <Card key={teacher.id} hover className="overflow-hidden">
                  <button type="button" onClick={() => setExpandedId(isExpanded ? null : teacher.id)} className="w-full text-right">
                    <CardHeader>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            {teacher.name.charAt(2)}
                          </div>
                          <div className="text-right">
                            <CardTitle>{teacher.name}</CardTitle>
                            <p className="text-xs text-text-tertiary">{teacher.subject}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="primary" size="sm">{teacher.totalHours} س</Badge>
                          {conflicts.length > 0 && (
                            <Badge variant="error" size="sm" dot>
                              {conflicts.length} تعارض
                            </Badge>
                          )}
                          <HiOutlineSun className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-180")} />
                        </div>
                      </div>
                    </CardHeader>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-1">
                                <div className="flex justify-between text-xs text-text-secondary mb-1">
                                  <span>الحمل التدريسي: {hoursBooked}/{teacher.totalHours} ساعة</span>
                                  <span>{loadPct}%</span>
                                </div>
                                <Progress value={bm} max={teacher.totalHours * 60} variant={loadPct > 80 ? "error" : loadPct > 60 ? "warning" : "success"} size="md" />
                              </div>
                              <button type="button" onClick={() => handleOpenAvail(teacher)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-all">
                                <HiOutlinePlus className="w-3.5 h-3.5" /> توفر
                              </button>
                              <button type="button" onClick={() => handleOpenVacation(teacher)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 text-xs font-medium hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all">
                                <HiOutlinePlus className="w-3.5 h-3.5" /> إجازة
                              </button>
                            </div>

                            <div className="overflow-x-auto">
                              <table className="w-full text-xs min-w-[700px] border-collapse">
                                <thead>
                                  <tr>
                                    <th className="w-16 p-1.5 border border-border bg-surface-secondary text-text-tertiary font-medium text-center">الوقت</th>
                                    {days.map((d, i) => (
                                      <th key={d} className={cn("p-1.5 border border-border text-center font-medium", i >= 5 && "text-error")}>
                                        {d}
                                        <span className="block text-[10px] text-text-tertiary font-normal">
                                          {Math.round(bookedMinutesForDay(teacher, i) / 60 * 10) / 10}h
                                        </span>
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {timeSlots.map((t, ti) => (
                                    <tr key={t}>
                                      <td className="p-1.5 border border-border text-text-tertiary font-mono text-[10px] text-center">{t}</td>
                                      {days.map((_, di) => {
                                        const status = getSlotStatus(teacher, di, t)
                                        const isAvail = teacher.availability.some((a) => a.day === di && toMinutes(t) >= toMinutes(a.start) && toMinutes(t) < toMinutes(a.end))
                                        return (
                                          <td key={`${di}-${ti}`} className={cn(
                                            "p-1 border border-border text-center text-[10px] transition-colors",
                                            status === "conflict" && "bg-red-100 dark:bg-red-900/30",
                                            status === "booked" && "bg-emerald-50 dark:bg-emerald-900/20",
                                            !isAvail && "bg-gray-50 dark:bg-gray-800/30"
                                          )}>
                                            {status === "conflict" && (
                                              <span className="flex items-center justify-center gap-1 text-red-600 dark:text-red-400 font-medium">
                                                <HiOutlineExclamationCircle className="w-3 h-3" /> تعارض
                                              </span>
                                            )}
                                            {status === "booked" && (
                                              <span className="text-emerald-600 dark:text-emerald-400">
                                                {teacher.bookedSlots.find((s) => s.day === di && toMinutes(t) >= toMinutes(s.start) && toMinutes(t) < toMinutes(s.end))?.subject}
                                              </span>
                                            )}
                                            {status === "free" && isAvail && (
                                              <span className="text-text-tertiary">متاح</span>
                                            )}
                                          </td>
                                        )
                                      })}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            {teacher.vacations.length > 0 && (
                              <div>
                                <p className="text-xs font-medium text-text-secondary mb-2">الإجازات القادمة:</p>
                                <div className="flex flex-wrap gap-2">
                                  {teacher.vacations.map((v) => (
                                    <div key={v.id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                      <HiOutlineMoon className="w-3.5 h-3.5 text-amber-500" />
                                      <span className="text-xs text-amber-700 dark:text-amber-300">
                                        {v.start} → {v.end}
                                      </span>
                                      <span className="text-[10px] text-amber-500">({v.reason})</span>
                                      <button type="button" onClick={() => removeVacation(teacher.id, v.id)}
                                        className="p-0.5 rounded hover:bg-amber-200 dark:hover:bg-amber-800 text-amber-500 transition-colors">
                                        <HiOutlineTrash className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              )
            })}
          </motion.div>
        </motion.div>

        <Modal isOpen={availModal} onClose={() => setAvailModal(false)} title="إضافة وقت توفر" subtitle={selectedTeacher?.name}>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-text-tertiary">اليوم</label>
              <select value={newAvail.day} onChange={(e) => setNewAvail({ ...newAvail, day: Number(e.target.value) })}
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30">
                {days.map((d, i) => <option key={d} value={i}>{d}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-text-tertiary">من</label>
                <select value={newAvail.start} onChange={(e) => setNewAvail({ ...newAvail, start: e.target.value })}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30">
                  {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-text-tertiary">إلى</label>
                <select value={newAvail.end} onChange={(e) => setNewAvail({ ...newAvail, end: e.target.value })}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30">
                  {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <button type="button" onClick={addAvailability}
              className="w-full px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-all">
              إضافة وقت التوفر
            </button>
          </div>
        </Modal>

        <Modal isOpen={vacationModal} onClose={() => setVacationModal(false)} title="إضافة إجازة" subtitle={selectedTeacher?.name}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-text-tertiary">تاريخ البداية</label>
                <input type="date" value={newVacation.start} onChange={(e) => setNewVacation({ ...newVacation, start: e.target.value })}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-text-tertiary">تاريخ النهاية</label>
                <input type="date" value={newVacation.end} onChange={(e) => setNewVacation({ ...newVacation, end: e.target.value })}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-text-tertiary">السبب</label>
              <input type="text" value={newVacation.reason} onChange={(e) => setNewVacation({ ...newVacation, reason: e.target.value })}
                placeholder="سبب الإجازة"
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <button type="button" onClick={addVacation}
              className="w-full px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-all">
              إضافة الإجازة
            </button>
          </div>
        </Modal>
      </div>
    </div>
  )
}

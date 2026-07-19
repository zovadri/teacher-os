"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineCalendar, HiOutlineClock, HiOutlineUserGroup,
  HiOutlineAcademicCap, HiOutlineExclamationCircle, HiOutlineCheckCircle,
  HiOutlineRefresh, HiOutlinePlus, HiOutlineTrash, HiOutlineX,
} from "react-icons/hi"
import toast from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
type SlotField = "day" | "start" | "end" | "subject" | "teacher" | "room" | "group"
type TeacherOrRoom = { name: string }
import { EmptyState } from "@/components/ui/EmptyState"
import { StatsCard } from "@/components/ui/StatsCard"

interface TimeSlot { day: number; start: string; end: string; subject: string; teacher: string; room: string; group: string; color: string }
interface Teacher { id: string; name: string; subject: string; hours: number }
interface Room { id: string; name: string; capacity: number; occupancy: number }

const days = ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"]
const colors = ["bg-blue-500/20 border-blue-500 text-blue-700 dark:text-blue-300", "bg-emerald-500/20 border-emerald-500 text-emerald-700", "bg-purple-500/20 border-purple-500 text-purple-700", "bg-amber-500/20 border-amber-500 text-amber-700", "bg-rose-500/20 border-rose-500 text-rose-700"]

const initialSlots: TimeSlot[] = [
  { day: 0, start: "08:00", end: "09:30", subject: "الكيمياء", teacher: "أ. خالد صقر", room: "قاعة A", group: "مجموعة 1", color: colors[0] },
  { day: 0, start: "10:00", end: "11:30", subject: "الفيزياء", teacher: "أ. أحمد سمير", room: "قاعة B", group: "مجموعة 2", color: colors[1] },
  { day: 1, start: "08:00", end: "09:30", subject: "الرياضيات", teacher: "أ. نبيل إبراهيم", room: "قاعة A", group: "مجموعة 1", color: colors[2] },
  { day: 1, start: "10:00", end: "11:30", subject: "الكيمياء", teacher: "أ. خالد صقر", room: "قاعة C", group: "مجموعة 3", color: colors[0] },
  { day: 2, start: "09:00", end: "10:30", subject: "العربي", teacher: "أ. محمد صلاح", room: "قاعة B", group: "مجموعة 2", color: colors[3] },
  { day: 2, start: "11:00", end: "12:30", subject: "الإنجليزي", teacher: "أ. أحمد فريد", room: "قاعة A", group: "مجموعة 1", color: colors[4] },
  { day: 3, start: "08:00", end: "09:30", subject: "الفيزياء", teacher: "أ. مينا مجدي", room: "قاعة B", group: "مجموعة 3", color: colors[1] },
  { day: 3, start: "10:00", end: "11:30", subject: "الرياضيات", teacher: "أ. نبيل إبراهيم", room: "قاعة C", group: "مجموعة 2", color: colors[2] },
  { day: 4, start: "09:00", end: "10:30", subject: "الكيمياء", teacher: "أ. محمود جلال", room: "قاعة A", group: "مجموعة 2", color: colors[0] },
]

const teachers: Teacher[] = [
  { id: "t1", name: "أ. خالد صقر", subject: "الكيمياء", hours: 6 },
  { id: "t2", name: "أ. أحمد سمير", subject: "الفيزياء", hours: 4 },
  { id: "t3", name: "أ. نبيل إبراهيم", subject: "الرياضيات", hours: 5 },
  { id: "t4", name: "أ. محمد صلاح", subject: "العربي", hours: 3 },
  { id: "t5", name: "أ. أحمد فريد", subject: "الإنجليزي", hours: 3 },
]
const rooms: Room[] = [
  { id: "r1", name: "قاعة A", capacity: 30, occupancy: 87 },
  { id: "r2", name: "قاعة B", capacity: 25, occupancy: 72 },
  { id: "r3", name: "قاعة C", capacity: 20, occupancy: 65 },
  { id: "r4", name: "قاعة D", capacity: 35, occupancy: 91 },
]

const subjects = ["الكيمياء", "الفيزياء", "الرياضيات", "العربي", "الإنجليزي"]
const groups = ["مجموعة 1", "مجموعة 2", "مجموعة 3", "مجموعة 4"]

const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function SchedulePage() {
  const [slots, setSlots] = useState(initialSlots)
  const [weekOffset, setWeekOffset] = useState(0)
  const [filterTeacher, setFilterTeacher] = useState("all")
  const [filterRoom, setFilterRoom] = useState("all")
  const [showModal, setShowModal] = useState(false)
  const [newSlot, setNewSlot] = useState({ day: 0, start: "08:00", end: "09:30", subject: subjects[0], teacher: teachers[0].name, room: rooms[0].name, group: groups[0] })

  const filteredSlots = slots.filter((s) => {
    if (filterTeacher !== "all" && s.teacher !== filterTeacher) return false
    if (filterRoom !== "all" && s.room !== filterRoom) return false
    return true
  })

  const addSlot = () => {
    const conflict = slots.some((s) => s.day === newSlot.day && s.room === newSlot.room && s.start === newSlot.start)
    if (conflict) { toast.error("تعارض في الموعد! القاعة محجوزة في هذا الوقت."); return }
    const tConflict = slots.some((s) => s.day === newSlot.day && s.teacher === newSlot.teacher && s.start === newSlot.start)
    if (tConflict) { toast.error("تعارض في موعد المدرس!"); return }
    setSlots((prev) => [...prev, { ...newSlot, color: colors[subjects.indexOf(newSlot.subject) % colors.length] }])
    toast.success("تمت إضافة الحصة بنجاح")
    setShowModal(false)
  }

  const removeSlot = (idx: number) => {
    setSlots((prev) => prev.filter((_, i) => i !== idx))
    toast.success("تم حذف الحصة")
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader title="جدول الحصص" subtitle="إدارة جدول السنتر بالكامل - المدرسين والقاعات والمجموعات" />
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <StatsCard title="إجمالي الحصص" value={slots.length} icon={HiOutlineCalendar} color="primary" />
            <StatsCard title="المدرسين" value={teachers.length} icon={HiOutlineUserGroup} color="success" />
            <StatsCard title="القاعات" value={rooms.length} icon={HiOutlineAcademicCap} color="info" />
            <StatsCard title="المجموعات" value={groups.length} icon={HiOutlineClock} color="warning" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex gap-2 flex-wrap items-center">
              <span className="text-xs text-text-tertiary">تصفية:</span>
              <select value={filterTeacher} onChange={(e) => setFilterTeacher(e.target.value)} className="bg-surface border border-border rounded-lg px-3 py-1.5 text-xs text-text focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="all">كل المدرسين</option>
                {teachers.map((t) => <option key={t.id} value={t.name}>{t.name}</option>)}
              </select>
              <select value={filterRoom} onChange={(e) => setFilterRoom(e.target.value)} className="bg-surface border border-border rounded-lg px-3 py-1.5 text-xs text-text focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="all">كل القاعات</option>
                {rooms.map((r) => <option key={r.id} value={r.name}>{r.name}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setWeekOffset((w) => w - 1)} className="px-3 py-1.5 rounded-lg border border-border text-xs text-text hover:bg-surface-secondary">← الأسبوع السابق</button>
              <span className="text-xs font-medium text-text">الأسبوع {Math.abs(weekOffset) + 1}</span>
              <button type="button" onClick={() => setWeekOffset((w) => w + 1)} className="px-3 py-1.5 rounded-lg border border-border text-xs text-text hover:bg-surface-secondary">الأسبوع التالي →</button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>الجدول الأسبوعي</CardTitle>
                  <button type="button" onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-dark transition-all">
                    <HiOutlinePlus className="w-3.5 h-3.5" /> إضافة حصة
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                {filteredSlots.length === 0 ? (
                  <EmptyState
                    icon={HiOutlineCalendar}
                    title="لا يوجد جدول"
                    description="لم يتم إضافة أي حصص في الجدول بعد"
                  />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs min-w-[800px] border-collapse">
                      <thead>
                        <tr>
                          <th className="w-16 p-2 border border-border bg-surface-secondary text-text-tertiary font-medium">الوقت</th>
                          {days.map((d, i) => <th key={d} className={`p-2 border border-border text-center font-medium ${i >= 5 ? "text-error" : "text-text"}`}>{d}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {hours.map((h, hi) => (
                          <tr key={h}>
                            <td className="p-2 border border-border text-text-tertiary font-mono text-[10px] text-center">{h}</td>
                            {days.map((_, di) => {
                              const cellSlots = filteredSlots.filter((s) => s.day === di && s.start === h)
                              return (
                                <td key={`${di}-${hi}`} className="p-1 border border-border align-top min-h-[60px]">
                                  {cellSlots.map((s, si) => (
                                    <div key={si} className={`${s.color} border rounded-lg p-1.5 mb-1 text-[10px] leading-tight relative group`}>
                                      <p className="font-semibold">{s.subject}</p>
                                      <p className="opacity-80">{s.teacher}</p>
                                      <p className="opacity-70">{s.room} • {s.group}</p>
                                      <button type="button" onClick={() => removeSlot(slots.indexOf(s))} className="absolute -top-1 -left-1 w-4 h-4 bg-error text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <HiOutlineX className="w-2.5 h-2.5" />
                                      </button>
                                    </div>
                                  ))}
                                </td>
                              )
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle>المدرسون</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {teachers.map((t) => (
                    <div key={t.id} className="flex items-center justify-between p-2.5 rounded-lg bg-surface-secondary">
                      <span className="text-sm font-medium text-text">{t.name}</span>
                      <div className="flex items-center gap-2"><span className="text-xs text-text-tertiary">{t.subject}</span><Badge variant="primary" size="sm">{t.hours} ساعة/أسبوع</Badge></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>القاعات</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {rooms.map((r) => (
                    <div key={r.id} className="flex items-center justify-between p-2.5 rounded-lg bg-surface-secondary">
                      <span className="text-sm font-medium text-text">{r.name}</span>
                      <div className="flex items-center gap-3"><span className="text-xs text-text-tertiary">{r.capacity} مقعد</span><Progress value={r.occupancy} size="sm" variant={r.occupancy > 85 ? "error" : "primary"} className="w-16" /><span className="text-xs text-text-tertiary">{r.occupancy}%</span></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center" onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-surface rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-bold text-text mb-4">إضافة حصة جديدة</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {["day", "start", "end", "subject"].map((field) => (
                    <div key={field} className="space-y-1">
                      <label className="text-xs text-text-tertiary">{field === "day" ? "اليوم" : field === "start" ? "بداية" : field === "end" ? "نهاية" : "المادة"}</label>
                       <select value={newSlot[field as SlotField]} onChange={(e) => setNewSlot({ ...newSlot, [field]: e.target.value })}
                         className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:ring-2 focus:ring-primary/30">
                         {field === "day" ? days.map((d, i) => <option key={d} value={i}>{d}</option>) :
                          field === "start" || field === "end" ? hours.map((h) => <option key={h} value={h}>{h}</option>) :
                          subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                       </select>
                     </div>
                   ))}
                 </div>
                 {(["teacher", "room", "group"] as const).map((field) => (
                   <div key={field} className="space-y-1">
                     <label className="text-xs text-text-tertiary">{field === "teacher" ? "المدرس" : field === "room" ? "القاعة" : "المجموعة"}</label>
                     <select value={newSlot[field]} onChange={(e) => setNewSlot({ ...newSlot, [field]: e.target.value })}
                       className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:ring-2 focus:ring-primary/30">
                       {(field === "teacher" ? teachers : field === "room" ? rooms : groups.map((g) => ({ name: g }))).map((item: TeacherOrRoom) => <option key={item.name} value={item.name}>{item.name}</option>)}
                    </select>
                  </div>
                ))}
                <div className="flex items-center gap-2 p-2 rounded-lg bg-warning/5 text-[10px] text-warning">
                  <HiOutlineExclamationCircle className="w-4 h-4 shrink-0" /> سيتم التحقق من تعارض المواعيد تلقائياً
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-border text-sm text-text-secondary hover:bg-surface-secondary transition-all">إلغاء</button>
                <button type="button" onClick={addSlot} className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-all">إضافة</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

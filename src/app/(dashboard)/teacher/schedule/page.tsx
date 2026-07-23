"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineCalendar, HiOutlineClock, HiOutlineUserGroup,
  HiOutlineAcademicCap, HiOutlineExclamationCircle, HiOutlineCheckCircle,
  HiOutlineRefresh, HiOutlinePlus, HiOutlineTrash, HiOutlineX,
} from "react-icons/hi"
import toast from "react-hot-toast"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { EmptyState } from "@/components/ui/EmptyState"
import { StatsCard } from "@/components/ui/StatsCard"
import { Progress } from "@/components/ui/Progress"
import { Modal } from "@/components/ui/Modal"
import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select"
import { cn } from "@/lib/utils"

interface TimeSlot { day: number; start: string; end: string; subject: string; teacher: string; room: string; group: string; color: string }
interface Teacher { id: string; name: string; subject: string; hours: number }
interface Room { id: string; name: string; capacity: number; occupancy: number }

const days = ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"]
const colors = [
  "bg-primary/10 border-primary/20 text-primary",
  "bg-success/10 border-success/20 text-success",
  "bg-purple-500/10 border-purple-500/20 text-purple-400",
  "bg-warning/10 border-warning/20 text-warning",
  "bg-error/10 border-error/20 text-error",
]

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
    <div className="space-y-6">
      <PageHeader title="جدول الحصص" description="إدارة جدول السنتر بالكامل - المدرسين والقاعات والمجموعات" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
        className="space-y-6"
      >
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
          className="grid grid-cols-1 sm:grid-cols-4 gap-5"
        >
          <StatsCard title="إجمالي الحصص" value={slots.length} icon={HiOutlineCalendar} color="primary" />
          <StatsCard title="المدرسين" value={teachers.length} icon={HiOutlineUserGroup} color="success" />
          <StatsCard title="القاعات" value={rooms.length} icon={HiOutlineAcademicCap} color="info" />
          <StatsCard title="المجموعات" value={groups.length} icon={HiOutlineClock} color="warning" />
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
          className="flex items-center justify-between gap-4 flex-wrap"
        >
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-xs text-text-tertiary">تصفية:</span>
            <Select
              options={[{ value: "all", label: "كل المدرسين" }, ...teachers.map((t) => ({ value: t.name, label: t.name }))]}
              value={filterTeacher}
              onChange={(e) => setFilterTeacher(e.target.value)}
              className="w-36"
            />
            <Select
              options={[{ value: "all", label: "كل القاعات" }, ...rooms.map((r) => ({ value: r.name, label: r.name }))]}
              value={filterRoom}
              onChange={(e) => setFilterRoom(e.target.value)}
              className="w-32"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => setWeekOffset((w) => w - 1)}>
              ← الأسبوع السابق
            </Button>
            <span className="text-xs font-medium text-text">الأسبوع {Math.abs(weekOffset) + 1}</span>
            <Button variant="secondary" size="sm" onClick={() => setWeekOffset((w) => w + 1)}>
              الأسبوع التالي →
            </Button>
          </div>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>الجدول الأسبوعي</CardTitle>
                <Button variant="primary" size="sm" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowModal(true)}>
                  إضافة حصة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {filteredSlots.length === 0 ? (
                <EmptyState icon={HiOutlineCalendar} title="لا يوجد جدول" description="لم يتم إضافة أي حصص في الجدول بعد" />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs min-w-[800px] border-collapse">
                    <thead>
                      <tr>
                        <th className="w-16 p-2 border border-border bg-card text-text-tertiary font-medium">الوقت</th>
                        {days.map((d, i) => (
                          <th key={d} className={cn("p-2 border border-border text-center font-medium", i >= 5 ? "text-error" : "text-text")}>
                            {d}
                          </th>
                        ))}
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
                                  <div key={si} className={cn("relative rounded-[12px] p-2 mb-1 text-[10px] leading-tight border group backdrop-blur", s.color)}>
                                    <p className="font-semibold">{s.subject}</p>
                                    <p className="opacity-80">{s.teacher}</p>
                                    <p className="opacity-70">{s.room} • {s.group}</p>
                                    <button type="button" onClick={() => removeSlot(slots.indexOf(s))}
                                      className="absolute -top-1 -left-1 w-4 h-4 bg-error text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
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

        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Card>
            <CardHeader><CardTitle>المدرسون</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {teachers.map((t) => (
                  <div key={t.id} className="flex items-center justify-between p-3 rounded-[14px] bg-card/40 border border-border">
                    <span className="text-sm font-medium text-text">{t.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-text-tertiary">{t.subject}</span>
                      <Badge variant="primary" size="sm">{t.hours} ساعة/أسبوع</Badge>
                    </div>
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
                  <div key={r.id} className="flex items-center justify-between p-3 rounded-[14px] bg-card/40 border border-border">
                    <span className="text-sm font-medium text-text">{r.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-text-tertiary">{r.capacity} مقعد</span>
                      <Progress value={r.occupancy} size="sm" variant={r.occupancy > 85 ? "error" : "primary"} className="w-16" />
                      <span className="text-xs text-text-tertiary">{r.occupancy}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="إضافة حصة جديدة" size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="اليوم"
              options={days.map((d, i) => ({ value: String(i), label: d }))}
              value={String(newSlot.day)}
              onChange={(e) => setNewSlot({ ...newSlot, day: Number(e.target.value) })}
            />
            <Select
              label="المادة"
              options={subjects.map((s) => ({ value: s, label: s }))}
              value={newSlot.subject}
              onChange={(e) => setNewSlot({ ...newSlot, subject: e.target.value })}
            />
            <Select
              label="بداية"
              options={hours.map((h) => ({ value: h, label: h }))}
              value={newSlot.start}
              onChange={(e) => setNewSlot({ ...newSlot, start: e.target.value })}
            />
            <Select
              label="نهاية"
              options={hours.map((h) => ({ value: h, label: h }))}
              value={newSlot.end}
              onChange={(e) => setNewSlot({ ...newSlot, end: e.target.value })}
            />
            <Select
              label="المدرس"
              options={teachers.map((t) => ({ value: t.name, label: t.name }))}
              value={newSlot.teacher}
              onChange={(e) => setNewSlot({ ...newSlot, teacher: e.target.value })}
            />
            <Select
              label="القاعة"
              options={rooms.map((r) => ({ value: r.name, label: r.name }))}
              value={newSlot.room}
              onChange={(e) => setNewSlot({ ...newSlot, room: e.target.value })}
            />
            <Select
              label="المجموعة"
              options={groups.map((g) => ({ value: g, label: g }))}
              value={newSlot.group}
              onChange={(e) => setNewSlot({ ...newSlot, group: e.target.value })}
              className="col-span-2"
            />
          </div>
          <div className="flex items-center gap-3 p-4 rounded-[12px] bg-warning/5 border border-warning/10 text-xs text-warning">
            <HiOutlineExclamationCircle className="w-4 h-4 shrink-0" /> سيتم التحقق من تعارض المواعيد تلقائياً
          </div>
          <div className="flex gap-4 pt-2">
            <Button variant="primary" className="flex-1" onClick={addSlot}>إضافة</Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>إلغاء</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

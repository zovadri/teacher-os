"use client"

import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"
import Link from "next/link"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { DashboardHeader } from "@/components/ui/dashboard-header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "@/components/ui/stats-card"
import { Modal } from "@/components/ui/modal"

type Equipment = "projector" | "whiteboard" | "ac" | "smartBoard"
type BookingStatus = "available" | "occupied" | "maintenance"
type DayOfWeek = "saturday" | "sunday" | "monday" | "tuesday" | "wednesday" | "thursday"

interface Room {
  id: string
  name: string
  capacity: number
  equipment: Equipment[]
  status: BookingStatus
}

interface Booking {
  id: string
  roomId: string
  day: DayOfWeek
  startHour: number
  endHour: number
  teacher: string
  group: string
  purpose: string
  date: string
}

const equipmentLabels: Record<Equipment, string> = {
  projector: "بروجيكتور",
  whiteboard: "سبورة",
  ac: "تكييف",
  smartBoard: "سبورة ذكية",
}

const days: DayOfWeek[] = ["saturday", "sunday", "monday", "tuesday", "wednesday", "thursday"]
const dayLabels: Record<DayOfWeek, string> = {
  saturday: "السبت", sunday: "الأحد", monday: "الإثنين",
  tuesday: "الثلاثاء", wednesday: "الأربعاء", thursday: "الخميس",
}

const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16]

const statusColors: Record<BookingStatus, string> = {
  available: "bg-green-500",
  occupied: "bg-yellow-500",
  maintenance: "bg-red-500",
}

const statusLabels: Record<BookingStatus, string> = {
  available: "متاح",
  occupied: "مشغول",
  maintenance: "صيانة",
}

const equipmentOptions: Equipment[] = ["projector", "whiteboard", "ac", "smartBoard"]

const roomsData: Room[] = [
  { id: "a", name: "قاعة A", capacity: 30, equipment: ["projector", "whiteboard", "ac"], status: "available" },
  { id: "b", name: "قاعة B", capacity: 25, equipment: ["projector", "whiteboard", "ac", "smartBoard"], status: "occupied" },
  { id: "c", name: "قاعة C", capacity: 40, equipment: ["projector", "ac", "smartBoard"], status: "available" },
  { id: "d", name: "قاعة D", capacity: 20, equipment: ["whiteboard", "ac"], status: "maintenance" },
  { id: "e", name: "قاعة E", capacity: 35, equipment: ["projector", "whiteboard", "ac", "smartBoard"], status: "occupied" },
  { id: "f", name: "قاعة F", capacity: 50, equipment: ["projector", "whiteboard", "ac"], status: "available" },
]

const initialBookings: Booking[] = [
  { id: "b01", roomId: "a", day: "saturday", startHour: 8, endHour: 10, teacher: "أ. أحمد", group: "المجموعة 1", purpose: "محاضرة", date: "2026-07-19" },
  { id: "b02", roomId: "a", day: "sunday", startHour: 10, endHour: 12, teacher: "أ. سارة", group: "المجموعة 2", purpose: "ورشة", date: "2026-07-20" },
  { id: "b03", roomId: "b", day: "saturday", startHour: 9, endHour: 11, teacher: "أ. محمد", group: "المجموعة 3", purpose: "محاضرة", date: "2026-07-19" },
  { id: "b04", roomId: "b", day: "monday", startHour: 13, endHour: 15, teacher: "أ. ليلى", group: "المجموعة 4", purpose: "اجتماع", date: "2026-07-21" },
  { id: "b05", roomId: "c", day: "sunday", startHour: 8, endHour: 10, teacher: "أ. خالد", group: "المجموعة 5", purpose: "محاضرة", date: "2026-07-20" },
  { id: "b06", roomId: "c", day: "tuesday", startHour: 11, endHour: 13, teacher: "أ. نور", group: "المجموعة 6", purpose: "ورشة", date: "2026-07-22" },
  { id: "b07", roomId: "e", day: "saturday", startHour: 12, endHour: 14, teacher: "أ. هدى", group: "المجموعة 7", purpose: "محاضرة", date: "2026-07-19" },
  { id: "b08", roomId: "e", day: "wednesday", startHour: 9, endHour: 11, teacher: "أ. عمر", group: "المجموعة 8", purpose: "اجتماع", date: "2026-07-23" },
  { id: "b09", roomId: "f", day: "sunday", startHour: 14, endHour: 16, teacher: "أ. رنا", group: "المجموعة 9", purpose: "ورشة", date: "2026-07-20" },
  { id: "b10", roomId: "f", day: "thursday", startHour: 8, endHour: 10, teacher: "أ. سامي", group: "المجموعة 10", purpose: "محاضرة", date: "2026-07-24" },
  { id: "b11", roomId: "a", day: "wednesday", startHour: 11, endHour: 13, teacher: "أ. مريم", group: "المجموعة 11", purpose: "ورشة", date: "2026-07-23" },
  { id: "b12", roomId: "b", day: "thursday", startHour: 10, endHour: 12, teacher: "أ. كريم", group: "المجموعة 12", purpose: "محاضرة", date: "2026-07-24" },
  { id: "b13", roomId: "c", day: "saturday", startHour: 14, endHour: 16, teacher: "أ. دينا", group: "المجموعة 13", purpose: "اجتماع", date: "2026-07-19" },
  { id: "b14", roomId: "e", day: "tuesday", startHour: 8, endHour: 10, teacher: "أ. يوسف", group: "المجموعة 14", purpose: "محاضرة", date: "2026-07-22" },
  { id: "b15", roomId: "f", day: "monday", startHour: 11, endHour: 13, teacher: "أ. هاني", group: "المجموعة 15", purpose: "ورشة", date: "2026-07-21" },
]

export default function ClassroomsReservationsPage() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [showBookModal, setShowBookModal] = useState(false)
  const [bookRoomId, setBookRoomId] = useState<string | null>(null)
  const [equipFilter, setEquipFilter] = useState<Equipment[]>([])
  const [minCapacity, setMinCapacity] = useState(0)
  const [nextId, setNextId] = useState(16)

  const [formDate, setFormDate] = useState("")
  const [formDay, setFormDay] = useState<DayOfWeek>("saturday")
  const [formStart, setFormStart] = useState(8)
  const [formEnd, setFormEnd] = useState(10)
  const [formTeacher, setFormTeacher] = useState("")
  const [formGroup, setFormGroup] = useState("")
  const [formPurpose, setFormPurpose] = useState("")

  const filteredRooms = useMemo(() => {
    return roomsData.filter(room => {
      if (minCapacity > 0 && room.capacity < minCapacity) return false
      if (equipFilter.length > 0 && !equipFilter.every(e => room.equipment.includes(e))) return false
      return true
    })
  }, [minCapacity, equipFilter])

  const stats = useMemo(() => ({
    total: roomsData.length,
    available: roomsData.filter(r => r.status === "available").length,
    occupied: roomsData.filter(r => r.status === "occupied").length,
    maintenance: roomsData.filter(r => r.status === "maintenance").length,
  }), [])

  const toggleEquip = useCallback((eq: Equipment) => {
    setEquipFilter(prev => prev.includes(eq) ? prev.filter(e => e !== eq) : [...prev, eq])
  }, [])

  const hasConflict = useCallback((roomId: string, day: DayOfWeek, start: number, end: number, excludeId?: string): boolean => {
    return bookings.some(b =>
      b.roomId === roomId && b.day === day && b.id !== excludeId && start < b.endHour && b.startHour < end
    )
  }, [bookings])

  const openBookModal = useCallback((roomId: string) => {
    setBookRoomId(roomId)
    setFormDate("")
    setFormDay("saturday")
    setFormStart(8)
    setFormEnd(10)
    setFormTeacher("")
    setFormGroup("")
    setFormPurpose("")
    setShowBookModal(true)
  }, [])

  const handleBook = useCallback(() => {
    if (!bookRoomId) return
    if (hasConflict(bookRoomId, formDay, formStart, formEnd)) {
      toast.error("تعارض! هذه القاعة محجوزة في هذا الوقت")
      return
    }
    const id = `b${String(nextId).padStart(2, "0")}`
    setNextId(prev => prev + 1)
    const newBooking: Booking = {
      id,
      roomId: bookRoomId,
      day: formDay,
      startHour: formStart,
      endHour: formEnd,
      teacher: formTeacher || "غير محدد",
      group: formGroup || "غير محدد",
      purpose: formPurpose || "غير محدد",
      date: formDate || new Date().toISOString().split("T")[0],
    }
    setBookings(prev => [...prev, newBooking])
    setShowBookModal(false)
    toast.success("تم الحجز بنجاح")
  }, [bookRoomId, formDay, formStart, formEnd, formTeacher, formGroup, formPurpose, formDate, hasConflict, nextId])

  const todayDate = new Date().toISOString().split("T")[0]
  const todayReservations = useMemo(() => {
    return bookings.filter(b => b.date === todayDate).sort((a, b) => a.startHour - b.startHour)
  }, [bookings, todayDate])

  return (
    <div dir="rtl" className="space-y-6 p-6">
      <Breadcrumb items={[{ label: "القاعات", href: "/teacher/classrooms" }, { label: "حجوزات القاعات" }]} />
      <DashboardHeader title="حجوزات القاعات" description="إدارة حجوزات القاعات الدراسية" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard title="إجمالي القاعات" value={stats.total} />
        <StatsCard title="متاح الآن" value={stats.available} />
        <StatsCard title="مشغول" value={stats.occupied} />
        <StatsCard title="صيانة" value={stats.maintenance} />
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          {equipmentOptions.map(eq => (
            <label key={eq} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={equipFilter.includes(eq)}
                onChange={() => toggleEquip(eq)}
                className="accent-blue-600"
              />
              {equipmentLabels[eq]}
            </label>
          ))}
          <div className="flex items-center gap-2 mr-4">
            <span className="text-sm whitespace-nowrap">أقل سعة:</span>
            <input
              type="number"
              min={0}
              max={100}
              value={minCapacity}
              onChange={e => setMinCapacity(Math.max(0, Number(e.target.value)))}
              className="w-20 px-2 py-1 border rounded-md text-sm dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredRooms.map(room => (
            <motion.div
              key={room.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="p-4 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedRoom(room)}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold">{room.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${statusColors[room.status]}`} />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{statusLabels[room.status]}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">السعة: {room.capacity} طالب</p>
                <div className="flex gap-1 flex-wrap">
                  {room.equipment.map(eq => (
                    <Badge key={eq} variant="outline">{equipmentLabels[eq]}</Badge>
                  ))}
                </div>
                <button
                  onClick={e => { e.stopPropagation(); openBookModal(room.id) }}
                  className="mt-3 w-full py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  حجز
                </button>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Card className="p-4">
        <h3 className="text-lg font-bold mb-3">حجوزات اليوم</h3>
        {todayReservations.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">لا توجد حجوزات اليوم</p>
        ) : (
          <div className="space-y-2">
            {todayReservations.map(b => {
              const room = roomsData.find(r => r.id === b.roomId)
              return (
                <div key={b.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="font-medium">
                    {room?.name} <span className="mx-1 text-gray-400">|</span> {b.startHour}:00 - {b.endHour}:00
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {b.teacher} — {b.purpose}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Card>

      <AnimatePresence>
        {selectedRoom && (
          <Modal onClose={() => setSelectedRoom(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-950 rounded-2xl p-6 max-w-4xl w-full mx-auto max-h-[90vh] overflow-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">الجدول الأسبوعي — {selectedRoom.name}</h2>
                <button onClick={() => setSelectedRoom(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl leading-none">&times;</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2 border dark:border-gray-700 text-center">الوقت</th>
                      {days.map(d => (
                        <th key={d} className="p-2 border dark:border-gray-700 text-center">{dayLabels[d]}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {hours.map(h => (
                      <tr key={h}>
                        <td className="p-2 border dark:border-gray-700 text-center font-medium">{h}:00</td>
                        {days.map(d => {
                          const bs = bookings.filter(
                            b => b.roomId === selectedRoom.id && b.day === d && b.startHour <= h && h < b.endHour
                          )
                          return (
                            <td key={d} className="p-1 border dark:border-gray-700 text-center align-top">
                              {bs.map(b => (
                                <div key={b.id} className="bg-blue-100 dark:bg-blue-900/40 rounded px-1 py-0.5 text-xs mb-0.5 leading-tight">
                                  {b.teacher}<br />{b.purpose}
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
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBookModal && (
          <Modal onClose={() => setShowBookModal(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-950 rounded-2xl p-6 max-w-lg w-full mx-auto"
            >
              <h2 className="text-xl font-bold mb-4">حجز قاعة</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1">التاريخ</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={e => setFormDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">اليوم</label>
                  <select
                    value={formDay}
                    onChange={e => setFormDay(e.target.value as DayOfWeek)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                  >
                    {days.map(d => <option key={d} value={d}>{dayLabels[d]}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm mb-1">بداية</label>
                    <select
                      value={formStart}
                      onChange={e => setFormStart(Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                    >
                      {hours.map(h => <option key={h} value={h}>{h}:00</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">نهاية</label>
                    <select
                      value={formEnd}
                      onChange={e => setFormEnd(Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                    >
                      {hours.filter(h => h > formStart).map(h => <option key={h} value={h}>{h}:00</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">المعلم</label>
                  <input
                    type="text"
                    value={formTeacher}
                    onChange={e => setFormTeacher(e.target.value)}
                    placeholder="اسم المعلم"
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">المجموعة</label>
                  <input
                    type="text"
                    value={formGroup}
                    onChange={e => setFormGroup(e.target.value)}
                    placeholder="اسم المجموعة"
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">الغرض</label>
                  <input
                    type="text"
                    value={formPurpose}
                    onChange={e => setFormPurpose(e.target.value)}
                    placeholder="محاضرة / ورشة / اجتماع"
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>
                <button
                  onClick={handleBook}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  تأكيد الحجز
                </button>
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}

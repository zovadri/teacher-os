"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineCalendar, HiOutlineUserGroup,
  HiOutlineBookOpen, HiOutlineArchive, HiOutlineDuplicate,
  HiOutlineSwitchHorizontal, HiOutlinePlus,
} from "react-icons/hi"
import toast from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Modal } from "@/components/ui/Modal"
import { Table } from "@/components/ui/Table"
import { Progress } from "@/components/ui/Progress"
import { EmptyState } from "@/components/ui/EmptyState"

interface AcademicYear {
  id: string; name: string; startDate: string; endDate: string
  semester1Start: string; semester1End: string
  semester2Start: string; semester2End: string
  status: "active" | "archived"
  studentsCount: number; coursesCount: number
}

const initialYears: AcademicYear[] = [
  { id: "y1", name: "2024-2025", startDate: "2024-09-01", endDate: "2025-06-30", semester1Start: "2024-09-01", semester1End: "2025-01-15", semester2Start: "2025-01-20", semester2End: "2025-06-30", status: "archived", studentsCount: 180, coursesCount: 15 },
  { id: "y2", name: "2025-2026", startDate: "2025-09-01", endDate: "2026-06-30", semester1Start: "2025-09-01", semester1End: "2026-01-15", semester2Start: "2026-01-20", semester2End: "2026-06-30", status: "active", studentsCount: 210, coursesCount: 18 },
]

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function AcademicYearsPage() {
  const [years, setYears] = useState(initialYears)
  const [selectedSemester, setSelectedSemester] = useState<"s1" | "s2">("s1")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showMigrateModal, setShowMigrateModal] = useState(false)
  const [newYear, setNewYear] = useState({ name: "", startDate: "", endDate: "", semester1Start: "", semester1End: "", semester2Start: "", semester2End: "" })

  const activeYear = years.find((y) => y.status === "active")
  const archivedYears = years.filter((y) => y.status === "archived")
  const totalStudents = years.reduce((s, y) => s + y.studentsCount, 0)
  const totalCourses = years.reduce((s, y) => s + y.coursesCount, 0)

  const addYear = () => {
    if (!newYear.name || !newYear.startDate) { toast.error("الرجاء ملء الحقول المطلوبة"); return }
    setYears((prev) => [...prev, { ...newYear, id: `y${Date.now()}`, status: "active", studentsCount: 0, coursesCount: 0 }])
    toast.success("تم إضافة السنة الدراسية بنجاح")
    setShowAddModal(false)
    setNewYear({ name: "", startDate: "", endDate: "", semester1Start: "", semester1End: "", semester2Start: "", semester2End: "" })
  }

  const archiveYear = (id: string) => {
    setYears((prev) => prev.map((y) => y.id === id ? { ...y, status: "archived" as const } : y))
    toast.success("تم أرشفة السنة الدراسية")
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader title="النظام الدراسي" subtitle="إدارة السنوات الدراسية - الترمين - الترحيل" />
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <StatsCard title="السنوات النشطة" value={years.filter((y) => y.status === "active").length} icon={HiOutlineCalendar} color="primary" />
            <StatsCard title="المؤرشفة" value={archivedYears.length} icon={HiOutlineArchive} color="neutral" />
            <StatsCard title="إجمالي الطلاب" value={totalStudents} icon={HiOutlineUserGroup} color="success" />
            <StatsCard title="إجمالي الكورسات" value={totalCourses} icon={HiOutlineBookOpen} color="info" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-3 flex-wrap">
            <button type="button" onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-all flex items-center gap-2"
            ><HiOutlinePlus className="w-4 h-4" /> إضافة سنة دراسية</button>
            <button type="button" onClick={() => { toast.success("تم نسخ الكورسات من السنة السابقة") }}
              className="px-4 py-2.5 border border-primary text-primary rounded-xl text-sm font-medium hover:bg-primary/5 transition-all flex items-center gap-2"
            ><HiOutlineDuplicate className="w-4 h-4" /> نسخ الكورسات من السنة السابقة</button>
            <button type="button" onClick={() => setShowMigrateModal(true)}
              className="px-4 py-2.5 border border-warning text-warning rounded-xl text-sm font-medium hover:bg-warning/5 transition-all flex items-center gap-2"
            ><HiOutlineSwitchHorizontal className="w-4 h-4" /> ترحيل الطلاب</button>
          </motion.div>

          {activeYear && (
            <motion.div variants={itemVariants}>
              <Card className="border-primary/30 bg-gradient-to-l from-primary/5 to-transparent">
                <CardHeader><CardTitle>السنة النشطة: {activeYear.name}</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setSelectedSemester("s1")}
                        className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${selectedSemester === "s1" ? "border-primary bg-primary/10 text-primary" : "border-border text-text-tertiary"}`}
                      >الترم الأول</button>
                      <button type="button" onClick={() => setSelectedSemester("s2")}
                        className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${selectedSemester === "s2" ? "border-primary bg-primary/10 text-primary" : "border-border text-text-tertiary"}`}
                      >الترم الثاني</button>
                    </div>
                    <button type="button" onClick={() => archiveYear(activeYear.id)}
                      className="px-3 py-1.5 text-xs text-error border border-error/30 rounded-lg hover:bg-error/5 transition-all"
                    >أرشفة السنة</button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm p-4 rounded-xl bg-surface-secondary border border-border">
                    <div><span className="text-text-tertiary">البداية: </span><span className="text-text font-medium">{selectedSemester === "s1" ? activeYear.semester1Start : activeYear.semester2Start}</span></div>
                    <div><span className="text-text-tertiary">النهاية: </span><span className="text-text font-medium">{selectedSemester === "s1" ? activeYear.semester1End : activeYear.semester2End}</span></div>
                    <div><span className="text-text-tertiary">الطلاب: </span><span className="text-text font-medium">{activeYear.studentsCount}</span></div>
                    <div><span className="text-text-tertiary">الكورسات: </span><span className="text-text font-medium">{activeYear.coursesCount}</span></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-text-tertiary"><span>تقدم الترم {selectedSemester === "s1" ? "الأول" : "الثاني"}</span><span>65%</span></div>
                    <Progress value={65} size="md" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader><CardTitle>السنوات الدراسية</CardTitle></CardHeader>
              <CardContent>
                {years.length === 0 ? (
                  <EmptyState icon={HiOutlineCalendar} title="لا يوجد سنوات دراسية" description="لم يتم إضافة أي سنوات دراسية بعد" />
                ) : (
                  <Table
                    columns={[
                      { key: "name", header: "السنة" },
                      { key: "startDate", header: "تاريخ البداية" },
                      { key: "endDate", header: "تاريخ النهاية" },
                      { key: "studentsCount", header: "الطلاب" },
                      { key: "coursesCount", header: "الكورسات" },
                      { key: "status", header: "الحالة", render: (y) => (
                        <Badge variant={y.status === "active" ? "success" : "neutral"}>{y.status === "active" ? "نشطة" : "مؤرشفة"}</Badge>
                      )},
                      { key: "actions", header: "", render: (y) => y.status === "active" ? (
                        <button type="button" onClick={() => archiveYear(y.id)}
                          className="text-xs text-error hover:text-error/80 transition-colors"
                        >أرشفة</button>
                      ) : null },
                    ]}
                    data={years}
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="إضافة سنة دراسية جديدة">
        <div className="space-y-4">
          {["name", "startDate", "endDate", "semester1Start", "semester1End", "semester2Start", "semester2End"].map((field) => (
            <div key={field}>
              <label className="text-xs text-text-tertiary mb-1 block">
                {field === "name" ? "اسم السنة" : field === "startDate" ? "بداية السنة" : field === "endDate" ? "نهاية السنة" :
                 field === "semester1Start" ? "بداية الترم الأول" : field === "semester1End" ? "نهاية الترم الأول" :
                 field === "semester2Start" ? "بداية الترم الثاني" : "نهاية الترم الثاني"}
              </label>
              <input type={field === "name" ? "text" : "date"} value={(newYear as Record<string, string>)[field]}
                onChange={(e) => setNewYear({ ...newYear, [field]: e.target.value })}
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={addYear} className="flex-1 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-all">إضافة</button>
            <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm text-text-secondary hover:bg-surface-secondary transition-all">إلغاء</button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showMigrateModal} onClose={() => setShowMigrateModal(false)} title="ترحيل الطلاب" size="sm">
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">سيتم ترحيل جميع طلاب السنة الحالية إلى السنة الدراسية الجديدة.</p>
          <div className="p-3 rounded-xl bg-warning/5 border border-warning/20 text-xs text-warning">
            العدد المتوقع للترحيل: {activeYear?.studentsCount || 0} طالب
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => { toast.success("تم ترحيل الطلاب بنجاح"); setShowMigrateModal(false) }}
              className="flex-1 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-all">تأكيد الترحيل</button>
            <button type="button" onClick={() => setShowMigrateModal(false)}
              className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm text-text-secondary hover:bg-surface-secondary transition-all">إلغاء</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineAcademicCap, HiOutlineUserGroup, HiOutlineCheckCircle,
  HiOutlineXCircle, HiOutlineArrowUp, HiOutlineRefresh,
  HiOutlineSwitchHorizontal, HiOutlineChartBar, HiOutlineSearch,
} from "react-icons/hi"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import toast from "react-hot-toast"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Modal } from "@/components/ui/Modal"
import { Table } from "@/components/ui/Table"
import { Progress } from "@/components/ui/Progress"
import { EmptyState } from "@/components/ui/EmptyState"

interface StudentGrade {
  id: string; name: string; avatar: string; grade: string; examAvg: number; passing: boolean
}

const students: StudentGrade[] = [
  { id: "s1", name: "أحمد محمد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=s1", grade: "الثانوي", examAvg: 88, passing: true },
  { id: "s2", name: "مريم أحمد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=s2", grade: "الثانوي", examAvg: 92, passing: true },
  { id: "s3", name: "يوسف علي", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=s3", grade: "الإعدادي", examAvg: 55, passing: false },
  { id: "s4", name: "سارة خالد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=s4", grade: "الثانوي", examAvg: 78, passing: true },
  { id: "s5", name: "عمر حسن", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=s5", grade: "الإعدادي", examAvg: 42, passing: false },
  { id: "s6", name: "ندى سامي", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=s6", grade: "الثانوي", examAvg: 85, passing: true },
  { id: "s7", name: "عبدالرحمن نور", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=s7", grade: "الإعدادي", examAvg: 62, passing: true },
  { id: "s8", name: "ليلى إبراهيم", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=s8", grade: "الثانوي", examAvg: 90, passing: true },
  { id: "s9", name: "محمد كريم", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=s9", grade: "الإعدادي", examAvg: 38, passing: false },
  { id: "s10", name: "هند مصطفى", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=s10", grade: "الثانوي", examAvg: 72, passing: true },
  { id: "s11", name: "خالد سامي", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=s11", grade: "الإعدادي", examAvg: 58, passing: false },
  { id: "s12", name: "نورا أحمد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=s12", grade: "الثانوي", examAvg: 95, passing: true },
]

const gradeDist = [
  { range: "أ (90%+)", count: 4, fill: "#10b981" },
  { range: "ب (80-89%)", count: 3, fill: "#3b82f6" },
  { range: "ج (70-79%)", count: 2, fill: "#f59e0b" },
  { range: "د (60-69%)", count: 1, fill: "#f97316" },
  { range: "راسب (-60%)", count: 2, fill: "#e11d48" },
]

const promotionHistory = [
  { id: "h1", student: "أحمد محمد", action: "ترقية", from: "الثانوي", to: "الجامعي", date: "2026-07-15" },
  { id: "h2", student: "عمر حسن", action: "إعادة سنة", from: "الإعدادي", to: "الإعدادي", date: "2026-07-14" },
  { id: "h3", student: "مريم أحمد", action: "ترقية", from: "الثانوي", to: "الجامعي", date: "2026-07-13" },
]

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function PromotionPage() {
  const [activeTab, setActiveTab] = useState<"students" | "history">("students")
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [transferTarget, setTransferTarget] = useState("")
  const [transferReason, setTransferReason] = useState("")
  const [transferStudentId, setTransferStudentId] = useState("")

  const stats = useMemo(() => {
    const total = students.length
    const passing = students.filter((s) => s.passing).length
    const failing = total - passing
    return { total, passing, failing, passRate: Math.round((passing / total) * 100) }
  }, [])

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])
  }

  const bulkPromote = () => {
    toast.success(`تم ترقية ${selectedIds.length} طالب بنجاح`)
    setSelectedIds([])
  }

  const openTransfer = (id: string) => {
    setTransferStudentId(id)
    setShowTransferModal(true)
  }

  return (
    <div className="min-h-screen">
      <Breadcrumb items={[{ label: "الطلاب", href: "/teacher/students" }, { label: "الترقية والرسوب" }]} />
      <PageHeader title="النجاح والترقية" description="إدارة نجاح ورسوب وترقية الطلاب" />
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <StatsCard title="إجمالي الطلاب" value={stats.total} icon={HiOutlineUserGroup} color="primary" />
            <StatsCard title="ناجح" value={stats.passing} icon={HiOutlineCheckCircle} color="success" />
            <StatsCard title="راسب" value={stats.failing} icon={HiOutlineXCircle} color="error" />
            <StatsCard title="نسبة النجاح" value={`${stats.passRate}%`} icon={HiOutlineChartBar} color="info" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-2">
            {(["students", "history"] as const).map((t) => (
              <button type="button" key={t} onClick={() => setActiveTab(t)}
                className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${activeTab === t ? "border-primary bg-primary/10 text-primary" : "border-border text-text-tertiary hover:bg-surface-secondary"}`}
              >{t === "students" ? "الطلاب" : "سجل الترقية"}</button>
            ))}
          </motion.div>

          {activeTab === "students" && (
            students.length === 0 ? (
              <EmptyState icon={HiOutlineAcademicCap} title="لا يوجد طلاب للترقية" description="لم يتم العثور على طلاب في هذه المرحلة" />
            ) : (
              <>
                {selectedIds.length > 0 && (
                  <motion.div variants={itemVariants} className="flex gap-2 p-3 rounded-xl bg-primary/5 border border-primary/20">
                    <span className="text-sm text-text font-medium ml-2">تم اختيار {selectedIds.length} طالب</span>
                    <button type="button" onClick={bulkPromote}
                      className="px-3 py-1 bg-success text-white rounded-lg text-xs font-medium hover:bg-success/90 transition-all"
                    >ترقية الكل</button>
                    <button type="button" onClick={() => toast.success(`تم إعادة ${selectedIds.length} طالب للسنة`)}
                      className="px-3 py-1 bg-error text-white rounded-lg text-xs font-medium hover:bg-error/90 transition-all"
                    >إعادة سنة للكل</button>
                  </motion.div>
                )}

                <motion.div variants={itemVariants}>
                  <Card>
                    <CardHeader><CardTitle>قائمة الطلاب</CardTitle></CardHeader>
                    <CardContent>
                      <Table
                        columns={[
                          { key: "select", header: "", render: (s) => (
                            <input type="checkbox" checked={selectedIds.includes(s.id)} onChange={() => toggleSelect(s.id)}
                              className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
                            />
                          )},
                          { key: "name", header: "الطالب", render: (s) => (
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 overflow-hidden"><img src={s.avatar} alt="" className="w-full h-full object-cover" /></div>
                              <span className="text-sm font-medium text-text">{s.name}</span>
                            </div>
                          )},
                          { key: "grade", header: "الصف" },
                          { key: "examAvg", header: "متوسط الامتحانات", render: (s) => (
                            <div className="flex items-center gap-2">
                              <Progress value={s.examAvg} size="sm" className="w-16" />
                              <span className="text-xs">{s.examAvg}%</span>
                            </div>
                          )},
                          { key: "passing", header: "الحالة", render: (s) => (
                            <Badge variant={s.passing ? "success" : "error"}>{s.passing ? "ناجح" : "راسب"}</Badge>
                          )},
                          { key: "actions", header: "الإجراءات", render: (s) => (
                            <div className="flex gap-1">
                              <button type="button" onClick={() => { toast.success(`تم ترقية ${s.name}`) }}
                                className="px-2 py-1 text-xs bg-success/10 text-success rounded-lg hover:bg-success/20 transition-all">ترقية</button>
                              <button type="button" onClick={() => { toast.success(`تم إعادة ${s.name} للسنة`) }}
                                className="px-2 py-1 text-xs bg-error/10 text-error rounded-lg hover:bg-error/20 transition-all">إعادة</button>
                              <button type="button" onClick={() => openTransfer(s.id)}
                                className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all">نقل</button>
                            </div>
                          )},
                        ]}
                        data={students}
                      />
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader><CardTitle>توزيع الدرجات</CardTitle></CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={gradeDist}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                          <XAxis dataKey="range" tick={{ fontSize: 10, fill: "var(--color-text-secondary)" }} />
                          <YAxis tick={{ fontSize: 10, fill: "var(--color-text-secondary)" }} />
                          <Tooltip />
                          <Bar dataKey="count" name="الطلاب" radius={[4, 4, 0, 0]}>
                            {gradeDist.map((e, i) => <Cell key={i} fill={e.fill} />)}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>ملخص النتائج</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-success/5 border border-success/20">
                        <span className="text-sm text-text">نسبة النجاح</span>
                        <span className="text-lg font-bold text-success">{stats.passRate}%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-error/5 border border-error/20">
                        <span className="text-sm text-text">نسبة الرسوب</span>
                        <span className="text-lg font-bold text-error">{100 - stats.passRate}%</span>
                      </div>
                      <Progress value={stats.passRate} size="lg" />
                    </CardContent>
                  </Card>
                </motion.div>
              </>
            )
          )}

          {activeTab === "history" && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader><CardTitle>سجل الترقية والإعادة</CardTitle></CardHeader>
                <CardContent>
                  <Table
                    columns={[
                      { key: "student", header: "الطالب" },
                      { key: "action", header: "الإجراء", render: (h) => (
                        <Badge variant={h.action === "ترقية" ? "success" : "error"}>{h.action}</Badge>
                      )},
                      { key: "from", header: "من" },
                      { key: "to", header: "إلى" },
                      { key: "date", header: "التاريخ" },
                    ]}
                    data={promotionHistory}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>

      <Modal isOpen={showTransferModal} onClose={() => setShowTransferModal(false)} title="نقل طالب" size="sm">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-text-tertiary mb-1 block">المجموعة المستهدفة</label>
            <select value={transferTarget} onChange={(e) => setTransferTarget(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">اختر...</option>
              <option value="مجموعة 1">مجموعة 1</option>
              <option value="مجموعة 2">مجموعة 2</option>
              <option value="مجموعة 3">مجموعة 3</option>
              <option value="مجموعة 4">مجموعة 4</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-text-tertiary mb-1 block">السبب</label>
            <textarea value={transferReason} onChange={(e) => setTransferReason(e.target.value)} rows={3}
              className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => { toast.success("تم نقل الطالب بنجاح"); setShowTransferModal(false) }}
              className="flex-1 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-all">نقل</button>
            <button type="button" onClick={() => setShowTransferModal(false)}
              className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm text-text-secondary hover:bg-surface-secondary transition-all">إلغاء</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

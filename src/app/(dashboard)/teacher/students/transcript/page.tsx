"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineDocumentText, HiOutlineDownload, HiOutlinePrinter,
  HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineClock,
  HiOutlineAcademicCap, HiOutlineQrcode, HiOutlineAward,
  HiOutlineChartBar, HiOutlineStar, HiOutlineUser,
} from "react-icons/hi"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import toast from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Progress } from "@/components/ui/Progress"

interface SubjectGrade { name: string; exam1: number; exam2: number; final: number; homework: number; total: number; max: number }
interface AttendanceSummary { present: number; absent: number; late: number; total: number }
interface Certificate { id: string; name: string; date: string; serial: string }

const students = [
  { id: "s1", name: "أحمد محمد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=t1", grade: "الثالث الثانوي", gpa: "3.8", rank: 2, totalStudents: 45 },
  { id: "s2", name: "مريم أحمد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=t2", grade: "الثالث الثانوي", gpa: "3.9", rank: 1, totalStudents: 45 },
  { id: "s3", name: "يوسف علي", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=t3", grade: "الثالث الثانوي", gpa: "3.2", rank: 8, totalStudents: 45 },
]

const subjectsData: SubjectGrade[] = [
  { name: "الكيمياء", exam1: 42, exam2: 38, final: 88, homework: 45, total: 213, max: 250 },
  { name: "الفيزياء", exam1: 40, exam2: 42, final: 85, homework: 42, total: 209, max: 250 },
  { name: "الرياضيات", exam1: 45, exam2: 40, final: 90, homework: 48, total: 223, max: 250 },
  { name: "العربي", exam1: 38, exam2: 36, final: 82, homework: 40, total: 196, max: 250 },
  { name: "الإنجليزي", exam1: 44, exam2: 46, final: 92, homework: 48, total: 230, max: 250 },
]

const attendance: AttendanceSummary = { present: 42, absent: 2, late: 1, total: 45 }

const certificates: Certificate[] = [
  { id: "c1", name: "شهادة إتمام الكيمياء - المستوى المتقدم", date: "2026-06-15", serial: "TOS-2026-0001" },
  { id: "c2", name: "شهادة التفوق في الفيزياء", date: "2026-05-20", serial: "TOS-2026-0002" },
  { id: "c3", name: "شهادة إتمام دورة الرياضيات", date: "2026-04-10", serial: "TOS-2026-0003" },
]

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function TranscriptPage() {
  const [selected, setSelected] = useState(students[0])
  const totalScore = subjectsData.reduce((s, sub) => s + sub.total, 0)
  const totalMax = subjectsData.reduce((s, sub) => s + sub.max, 0)
  const pct = Math.round((totalScore / totalMax) * 100)

  return (
    <div className="min-h-screen">
      <Breadcrumb items={[{ label: "الطلاب", href: "/teacher/students" }, { label: "كشف الدرجات" }]} />
      <DashboardHeader title="كشف الدرجات" subtitle="سجل أكاديمي كامل للطالب" />
      <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
            {students.map((s) => (
              <button type="button" key={s.id} onClick={() => setSelected(s)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${selected.id === s.id ? "border-primary bg-primary/10 text-primary" : "border-border text-text-secondary hover:bg-surface-secondary"}`}
              ><img src={s.avatar} alt="" className="w-6 h-6 rounded-full bg-surface-secondary" />{s.name}</button>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Card><CardContent className="p-4"><div className="flex items-center gap-3"><img src={selected.avatar} alt="" className="w-12 h-12 rounded-full bg-surface-secondary" /><div><p className="text-sm font-bold text-text">{selected.name}</p><p className="text-xs text-text-tertiary">{selected.grade}</p></div></div></CardContent></Card>
            <StatsCard title="المعدل التراكمي" value={selected.gpa} icon={HiOutlineStar} color="primary" />
            <StatsCard title="الترتيب" value={`#${selected.rank} من ${selected.totalStudents}`} icon={HiOutlineChartBar} color="success" />
            <StatsCard title="النسبة المئوية" value={`${pct}%`} icon={HiOutlineAcademicCap} color="info" />
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>الدرجات حسب المادة</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-right py-2 px-2 text-xs text-text-tertiary">المادة</th>
                        <th className="text-center py-2 px-2 text-xs text-text-tertiary">امتحان أول</th>
                        <th className="text-center py-2 px-2 text-xs text-text-tertiary">امتحان ثاني</th>
                        <th className="text-center py-2 px-2 text-xs text-text-tertiary">نهائي</th>
                        <th className="text-center py-2 px-2 text-xs text-text-tertiary">واجبات</th>
                        <th className="text-center py-2 px-2 text-xs text-text-tertiary">المجموع</th>
                        <th className="text-center py-2 px-2 text-xs text-text-tertiary">النسبة</th>
                        <th className="text-center py-2 px-2 text-xs text-text-tertiary">الحالة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjectsData.map((sub) => {
                        const p = Math.round((sub.total / sub.max) * 100)
                        return (
                          <tr key={sub.name} className="border-b border-border last:border-0">
                            <td className="py-2.5 px-2 text-sm font-medium text-text">{sub.name}</td>
                            <td className="py-2.5 px-2 text-center text-sm text-text">{sub.exam1}</td>
                            <td className="py-2.5 px-2 text-center text-sm text-text">{sub.exam2}</td>
                            <td className="py-2.5 px-2 text-center text-sm text-text">{sub.final}</td>
                            <td className="py-2.5 px-2 text-center text-sm text-text">{sub.homework}</td>
                            <td className="py-2.5 px-2 text-center text-sm font-bold text-text">{sub.total}/{sub.max}</td>
                            <td className="py-2.5 px-2 text-center"><Progress value={p} size="sm" variant={p >= 80 ? "success" : p >= 60 ? "warning" : "error"} className="w-16" /></td>
                            <td className="py-2.5 px-2 text-center">{p >= 60 ? <Badge variant="success" size="sm">ناجح</Badge> : <Badge variant="error" size="sm">راسب</Badge>}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>ملخص الحضور</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-success/5 text-center"><p className="text-xs text-text-tertiary">حاضر</p><p className="text-xl font-bold text-success">{attendance.present}</p></div>
                  <div className="p-3 rounded-xl bg-error/5 text-center"><p className="text-xs text-text-tertiary">غائب</p><p className="text-xl font-bold text-error">{attendance.absent}</p></div>
                  <div className="p-3 rounded-xl bg-warning/5 text-center"><p className="text-xs text-text-tertiary">متأخر</p><p className="text-xl font-bold text-warning">{attendance.late}</p></div>
                  <div className="p-3 rounded-xl bg-primary/5 text-center"><p className="text-xs text-text-tertiary">الإجمالي</p><p className="text-xl font-bold text-primary">{attendance.total}</p></div>
                </div>
                <Progress value={Math.round((attendance.present / attendance.total) * 100)} size="lg" variant="success" showLabel />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle>مقارنة الدرجات</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={subjectsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} />
                    <Tooltip />
                    <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                      {subjectsData.map((_, i) => <Cell key={i} fill={["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#e11d48"][i]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>رمز التحقق من الشهادة</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center p-6 bg-surface-secondary rounded-xl border border-border">
                  <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center mb-3 border">
                    <div className="text-center">
                      <HiOutlineQrcode className="w-16 h-16 text-text-tertiary mx-auto" />
                      <p className="text-[10px] text-text-tertiary mt-1">QR Verification</p>
                    </div>
                  </div>
                  <p className="text-xs text-text-tertiary mb-1">رمز التحقق:</p>
                  <p className="text-sm font-mono font-bold text-primary">TOS-VRFY-{selected.id.toUpperCase()}-2026</p>
                  <button type="button" onClick={() => toast.success("تم نسخ رمز التحقق")} className="mt-2 text-xs text-primary hover:underline">نسخ الرمز</button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader><div className="flex items-center justify-between"><CardTitle>الشهادات المحصل عليها</CardTitle><div className="flex gap-2"><button type="button" onClick={() => toast.success("جاري تحميل كشف الدرجات...")} className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-text hover:bg-surface-secondary transition-all"><HiOutlineDownload className="w-3.5 h-3.5" /> PDF</button><button type="button" onClick={() => toast.success("جاري التحميل للطباعة...")} className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-text hover:bg-surface-secondary transition-all"><HiOutlinePrinter className="w-3.5 h-3.5" /> طباعة</button></div></div></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {certificates.map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
                      <div className="flex items-center gap-3">
                        <HiOutlineAward className="w-8 h-8 text-primary" />
                        <div><p className="text-sm font-medium text-text">{c.name}</p><p className="text-xs text-text-tertiary">{c.date} - {c.serial}</p></div>
                      </div>
                      <button type="button" onClick={() => toast.success("جاري تحميل الشهادة...")} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-all"><HiOutlineDownload className="w-3.5 h-3.5 inline ml-1" />تحميل</button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

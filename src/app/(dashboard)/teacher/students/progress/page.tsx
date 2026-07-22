"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineUserGroup, HiOutlineChartBar, HiOutlineTrendingUp,
  HiOutlineTrendingDown, HiOutlineAcademicCap, HiOutlineClock,
  HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineSearch,
  HiOutlineFilter, HiOutlineStar, HiOutlineFire,
} from "react-icons/hi"
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area, Cell, Legend, PieChart, Pie,
} from "recharts"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Progress } from "@/components/ui/Progress"
import { DataTable } from "@/components/ui/DataTable"
import toast from "react-hot-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface StudentProgress {
  id: string
  name: string
  avatar: string
  grade: number
  attendance: number
  homework: number
  exams: { subject: string; score: number; total: number; date: string }[]
  strengths: string[]
  weaknesses: string[]
  trend: "up" | "down" | "stable"
  lastActivity: string
}

const studentsData: StudentProgress[] = [
  { id: "s1", name: "أحمد محمد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tp1", grade: 92, attendance: 95, homework: 88, exams: [{ subject: "كيمياء", score: 45, total: 50, date: "2026-07-15" }, { subject: "فيزياء", score: 42, total: 50, date: "2026-07-14" }, { subject: "رياضيات", score: 48, total: 50, date: "2026-07-13" }], strengths: ["الرياضيات", "الكيمياء"], weaknesses: ["الفيزياء"], trend: "up", lastActivity: "منذ ساعة" },
  { id: "s2", name: "مريم أحمد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tp2", grade: 88, attendance: 92, homework: 85, exams: [{ subject: "كيمياء", score: 40, total: 50, date: "2026-07-15" }, { subject: "فيزياء", score: 44, total: 50, date: "2026-07-14" }, { subject: "عربي", score: 38, total: 40, date: "2026-07-12" }], strengths: ["الفيزياء", "العربي"], weaknesses: ["الكيمياء"], trend: "up", lastActivity: "منذ 3 ساعات" },
  { id: "s3", name: "يوسف علي", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tp3", grade: 75, attendance: 80, homework: 72, exams: [{ subject: "رياضيات", score: 35, total: 50, date: "2026-07-13" }, { subject: "فيزياء", score: 30, total: 50, date: "2026-07-14" }], strengths: ["الرياضيات"], weaknesses: ["الفيزياء", "العربي"], trend: "down", lastActivity: "منذ يوم" },
  { id: "s4", name: "سارة خالد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tp4", grade: 95, attendance: 98, homework: 95, exams: [{ subject: "كيمياء", score: 48, total: 50, date: "2026-07-15" }, { subject: "فيزياء", score: 47, total: 50, date: "2026-07-14" }, { subject: "رياضيات", score: 45, total: 50, date: "2026-07-13" }, { subject: "عربي", score: 38, total: 40, date: "2026-07-12" }], strengths: ["الفيزياء", "الكيمياء", "الرياضيات"], weaknesses: [], trend: "up", lastActivity: "منذ 30 دقيقة" },
  { id: "s5", name: "عمر حسن", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tp5", grade: 68, attendance: 75, homework: 65, exams: [{ subject: "رياضيات", score: 28, total: 50, date: "2026-07-13" }, { subject: "فيزياء", score: 32, total: 50, date: "2026-07-14" }], strengths: [], weaknesses: ["الرياضيات", "الفيزياء", "الكيمياء"], trend: "down", lastActivity: "منذ 3 أيام" },
  { id: "s6", name: "ندى سامي", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tp6", grade: 85, attendance: 88, homework: 82, exams: [{ subject: "كيمياء", score: 42, total: 50, date: "2026-07-15" }, { subject: "عربي", score: 36, total: 40, date: "2026-07-12" }], strengths: ["الكيمياء", "العربي"], weaknesses: ["الرياضيات"], trend: "stable", lastActivity: "منذ 5 ساعات" },
  { id: "s7", name: "عبدالرحمن نور", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tp7", grade: 72, attendance: 82, homework: 70, exams: [{ subject: "رياضيات", score: 32, total: 50, date: "2026-07-13" }, { subject: "فيزياء", score: 36, total: 50, date: "2026-07-14" }, { subject: "كيمياء", score: 34, total: 50, date: "2026-07-15" }], strengths: [], weaknesses: ["الرياضيات"], trend: "down", lastActivity: "منذ 7 ساعات" },
  { id: "s8", name: "ليلى إبراهيم", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tp8", grade: 90, attendance: 94, homework: 90, exams: [{ subject: "كيمياء", score: 44, total: 50, date: "2026-07-15" }, { subject: "رياضيات", score: 42, total: 50, date: "2026-07-13" }], strengths: ["الكيمياء", "الرياضيات"], weaknesses: [], trend: "up", lastActivity: "منذ ساعتين" },
]

const weeklyTrend = [
  { week: "الأسبوع 1", chemistry: 78, physics: 82, math: 80, arabic: 85, english: 79 },
  { week: "الأسبوع 2", chemistry: 82, physics: 80, math: 84, arabic: 88, english: 82 },
  { week: "الأسبوع 3", chemistry: 80, physics: 85, math: 82, arabic: 86, english: 84 },
  { week: "الأسبوع 4", chemistry: 85, physics: 84, math: 86, arabic: 90, english: 85 },
  { week: "الأسبوع 5", chemistry: 88, physics: 86, math: 88, arabic: 92, english: 87 },
  { week: "الأسبوع 6", chemistry: 86, physics: 90, math: 85, arabic: 91, english: 88 },
]

const gradeDist = [
  { range: "90-100%", count: 2, fill: "#10b981" },
  { range: "80-89%", count: 3, fill: "#3b82f6" },
  { range: "70-79%", count: 2, fill: "#f59e0b" },
  { range: "-70%", count: 1, fill: "#e11d48" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function TeacherProgressPage() {
  const [search, setSearch] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<StudentProgress | null>(null)
  const [sortBy, setSortBy] = useState<"grade" | "attendance" | "homework">("grade")
  const router = useRouter()

  const filtered = useMemo(() => {
    let result = [...studentsData]
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((s) => s.name.includes(q))
    }
    result.sort((a, b) => {
      if (sortBy === "attendance") return b.attendance - a.attendance
      if (sortBy === "homework") return b.homework - a.homework
      return b.grade - a.grade
    })
    return result
  }, [search, sortBy])

  const avgGrade = Math.round(studentsData.reduce((s, st) => s + st.grade, 0) / studentsData.length)
  const avgAtt = Math.round(studentsData.reduce((s, st) => s + st.attendance, 0) / studentsData.length)
  const avgHw = Math.round(studentsData.reduce((s, st) => s + st.homework, 0) / studentsData.length)
  const upTrend = studentsData.filter((s) => s.trend === "up").length

  const columns = [
    { key: "name", label: "الطالب", render: (s: StudentProgress) => <div className="flex items-center gap-2"><img src={s.avatar} alt="" className="w-7 h-7 rounded-full bg-surface-secondary" /><span className="text-sm font-medium text-text">{s.name}</span></div> },
    { key: "grade", label: "التقييم", render: (s: StudentProgress) => <Badge variant={s.grade >= 90 ? "success" : s.grade >= 80 ? "primary" : s.grade >= 70 ? "warning" : "error"} size="sm">{s.grade}%</Badge> },
    { key: "attendance", label: "الحضور", render: (s: StudentProgress) => <span className="text-sm text-text">{s.attendance}%</span> },
    { key: "homework", label: "الواجبات", render: (s: StudentProgress) => <span className="text-sm text-text">{s.homework}%</span> },
    { key: "trend", label: "الاتجاه", render: (s: StudentProgress) => s.trend === "up" ? <HiOutlineTrendingUp className="w-5 h-5 text-success" /> : s.trend === "down" ? <HiOutlineTrendingDown className="w-5 h-5 text-error" /> : <HiOutlineStar className="w-5 h-5 text-text-tertiary" /> },
    { key: "lastActivity", label: "آخر نشاط", render: (s: StudentProgress) => <span className="text-xs text-text-tertiary">{s.lastActivity}</span> },
  ]

  return (
    <div className="min-h-screen">
      <Breadcrumb items={[{ label: "الطلاب", href: "/teacher/students" }, { label: "متابعة التقدم" }]} />
      <PageHeader title="متابعة تقدم الطلاب" description="راقب أداء وتقدم طلابك في جميع المواد" />
      <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="flex items-center gap-3 flex-wrap">
            <Link href="/teacher/reports" className="text-xs text-primary hover:underline font-medium">التقارير</Link>
            <span className="text-text-tertiary">|</span>
            <Link href="/teacher/analytics" className="text-xs text-primary hover:underline font-medium">التحليلات</Link>
            <span className="text-text-tertiary">|</span>
            <Link href="/teacher/students" className="text-xs text-primary hover:underline font-medium">جميع الطلاب</Link>
          </motion.div>
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <StatsCard title="متوسط التقييم" value={`${avgGrade}%`} icon={HiOutlineChartBar} color="primary" />
            <StatsCard title="متوسط الحضور" value={`${avgAtt}%`} icon={HiOutlineClock} color="success" />
            <StatsCard title="متوسط الواجبات" value={`${avgHw}%`} icon={HiOutlineCheckCircle} color="info" />
            <StatsCard title="طلاب متحسنون" value={upTrend} icon={HiOutlineTrendingUp} color="warning" />
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>اتجاه الأداء الأسبوعي</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={weeklyTrend}>
                    <defs>
                      {["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#e11d48"].map((color, i) => (
                        <linearGradient key={i} id={`grad${i}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                          <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="week" tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} />
                    <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} />
                    <Tooltip />
                    {["chemistry", "physics", "math", "arabic", "english"].map((key, i) => (
                      <Area key={key} type="monotone" dataKey={key} stroke={["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#e11d48"][i]} fill={`url(#grad${i})`} strokeWidth={2} />
                    ))}
                    <Legend />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>توزيع التقييمات</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={gradeDist} dataKey="count" nameKey="range" cx="50%" cy="50%" outerRadius={70} label={({ range, count }) => `${range}: ${count}`}>
                      {gradeDist.map((e, i) => <Cell key={i} fill={e.fill} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {gradeDist.map((g) => (
                    <div key={g.range} className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.fill }} />{g.range}</span>
                      <span className="font-medium text-text">{g.count} طالب</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>قائمة الطلاب</CardTitle>
                <div className="flex items-center gap-3 flex-wrap mt-3">
                  <div className="relative flex-1 min-w-[200px] max-w-sm">
                    <HiOutlineSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                      placeholder="ابحث عن طالب..."
                      className="w-full bg-surface border border-border rounded-lg pr-9 pl-3 py-2 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                  <div className="flex gap-2">
                    {(["grade", "attendance", "homework"] as const).map((s) => (
                      <button type="button"
                        key={s}
                        onClick={() => setSortBy(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          sortBy === s ? "border-primary bg-primary/10 text-primary" : "border-border text-text-secondary hover:bg-surface-secondary"
                        }`}
                      >
                        {s === "grade" ? "التقييم" : s === "attendance" ? "الحضور" : "الواجبات"}
                      </button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filtered.map((student) => (
                    <button type="button"
                      key={student.id}
                      onClick={() => setSelectedStudent(selectedStudent?.id === student.id ? null : student)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-right ${
                        selectedStudent?.id === student.id ? "border-primary bg-primary/5" : "border-border hover:bg-surface-secondary"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img src={student.avatar} alt="" className="w-9 h-9 rounded-full bg-surface-secondary" />
                        <div>
                          <Link href={`/teacher/students/${student.id}`} className="text-sm font-medium text-text hover:text-primary transition-colors" onClick={(e) => e.stopPropagation()}>{student.name}</Link>
                          <p className="text-[11px] text-text-tertiary">{student.lastActivity}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={student.grade >= 90 ? "success" : student.grade >= 80 ? "primary" : student.grade >= 70 ? "warning" : "error"} size="sm">{student.grade}%</Badge>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-text-tertiary">حضور {student.attendance}%</span>
                        </div>
                        {student.trend === "up" ? <HiOutlineTrendingUp className="w-4 h-4 text-success" /> : student.trend === "down" ? <HiOutlineTrendingDown className="w-4 h-4 text-error" /> : <HiOutlineStar className="w-4 h-4 text-text-tertiary" />}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {selectedStudent && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={selectedStudent.avatar} alt="" className="w-10 h-10 rounded-full bg-surface-secondary" />
                      <div>
                        <Link href={`/teacher/students/${selectedStudent.id}`} className="hover:text-primary transition-colors"><CardTitle>{selectedStudent.name}</CardTitle></Link>
                        <p className="text-xs text-text-tertiary">آخر نشاط: {selectedStudent.lastActivity}</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => setSelectedStudent(null)}
                      className="text-xs text-primary hover:underline"
                    >إغلاق</button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-center">
                      <p className="text-xs text-text-tertiary">التقييم</p>
                      <p className="text-lg font-bold text-primary">{selectedStudent.grade}%</p>
                    </div>
                    <div className="p-3 rounded-xl bg-success/5 border border-success/20 text-center">
                      <p className="text-xs text-text-tertiary">الحضور</p>
                      <p className="text-lg font-bold text-success">{selectedStudent.attendance}%</p>
                    </div>
                    <div className="p-3 rounded-xl bg-info/5 border border-info/20 text-center">
                      <p className="text-xs text-text-tertiary">الواجبات</p>
                      <p className="text-lg font-bold text-info">{selectedStudent.homework}%</p>
                    </div>
                  </div>

                  {selectedStudent.exams.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-text mb-2">نتائج الامتحانات الأخيرة</p>
                      <div className="space-y-2">
                        {selectedStudent.exams.map((ex, i) => (
                          <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-surface-secondary">
                            <span className="text-sm text-text">{ex.subject}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-text">{ex.score}/{ex.total}</span>
                              <Progress value={Math.round((ex.score / ex.total) * 100)} size="sm" variant={ex.score / ex.total >= 0.8 ? "success" : "warning"} className="w-16" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-success/5 border border-success/20">
                      <p className="text-xs font-medium text-success mb-1.5">نقاط القوة</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedStudent.strengths.length > 0 ? selectedStudent.strengths.map((s) => (
                          <Badge key={s} variant="success" size="sm">{s}</Badge>
                        )) : <span className="text-xs text-text-tertiary">لا توجد نقاط قوة محددة</span>}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-error/5 border border-error/20">
                      <p className="text-xs font-medium text-error mb-1.5">نقاط الضعف</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedStudent.weaknesses.length > 0 ? selectedStudent.weaknesses.map((s) => (
                          <Badge key={s} variant="error" size="sm">{s}</Badge>
                        )) : <span className="text-xs text-text-tertiary">لا توجد نقاط ضعف - ممتاز!</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button type="button" onClick={() => toast.success("تم إرسال التقرير بنجاح")} className="flex-1 px-4 py-2 bg-primary text-white rounded-xl text-xs font-medium hover:bg-primary-dark transition-all">
                      إرسال تقرير لولي الأمر
                    </button>
                    <button type="button" onClick={() => toast.success("تم إرسال رسالة التواصل")} className="flex-1 px-4 py-2 bg-surface border border-border text-text rounded-xl text-xs font-medium hover:bg-surface-secondary transition-all">
                      التواصل مع الطالب
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

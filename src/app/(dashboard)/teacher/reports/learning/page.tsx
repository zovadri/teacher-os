"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineChartBar, HiOutlineCheckCircle, HiOutlineXCircle,
  HiOutlineClock, HiOutlineAcademicCap, HiOutlineUserGroup,
  HiOutlineTrendingUp, HiOutlineTrendingDown, HiOutlinePrinter,
  HiOutlineDownload, HiOutlineBookOpen, HiOutlineStar,
  HiOutlineExclamationCircle, HiOutlineLightBulb,
} from "react-icons/hi"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area,
} from "recharts"
import toast from "react-hot-toast"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Progress } from "@/components/ui/Progress"
import { Table } from "@/components/ui/Table"

interface Student {
  id: string; name: string; avatar: string
}
interface ExamRecord {
  id: string; subject: string; score: number; max: number; date: string
}
interface HomeworkRecord {
  id: string; title: string; subject: string; score: number; max: number; status: "submitted" | "late" | "missing"; date: string
}
interface AttendanceWeek {
  week: string; present: number; late: number; absent: number
}

const students: Student[] = [
  { id: "s1", name: "أحمد محمد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=s1" },
  { id: "s2", name: "مريم أحمد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=s2" },
  { id: "s3", name: "يوسف علي", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=s3" },
  { id: "s4", name: "سارة خالد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=s4" },
  { id: "s5", name: "عمر حسن", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=s5" },
  { id: "s6", name: "ندى سامي", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=s6" },
  { id: "s7", name: "عبدالرحمن نور", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=s7" },
  { id: "s8", name: "ليلى إبراهيم", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=s8" },
  { id: "s9", name: "محمد كريم", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=s9" },
  { id: "s10", name: "هند مصطفى", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=s10" },
]

const allExams: Record<string, ExamRecord[]> = {
  s1: [
    { id: "e1", subject: "الكيمياء", score: 45, max: 50, date: "2026-07-01" },
    { id: "e2", subject: "الفيزياء", score: 42, max: 50, date: "2026-07-05" },
    { id: "e3", subject: "الرياضيات", score: 38, max: 50, date: "2026-07-10" },
    { id: "e4", subject: "العربي", score: 48, max: 50, date: "2026-07-15" },
    { id: "e5", subject: "الإنجليزي", score: 40, max: 50, date: "2026-07-18" },
  ],
  s2: [
    { id: "e6", subject: "الكيمياء", score: 48, max: 50, date: "2026-07-01" },
    { id: "e7", subject: "الفيزياء", score: 44, max: 50, date: "2026-07-05" },
    { id: "e8", subject: "الرياضيات", score: 46, max: 50, date: "2026-07-10" },
    { id: "e9", subject: "العربي", score: 42, max: 50, date: "2026-07-15" },
    { id: "e10", subject: "الإنجليزي", score: 47, max: 50, date: "2026-07-18" },
  ],
  s3: [
    { id: "e11", subject: "الكيمياء", score: 32, max: 50, date: "2026-07-01" },
    { id: "e12", subject: "الفيزياء", score: 28, max: 50, date: "2026-07-05" },
    { id: "e13", subject: "الرياضيات", score: 35, max: 50, date: "2026-07-10" },
    { id: "e14", subject: "العربي", score: 40, max: 50, date: "2026-07-15" },
    { id: "e15", subject: "الإنجليزي", score: 30, max: 50, date: "2026-07-18" },
  ],
}

const allHomework: Record<string, HomeworkRecord[]> = {
  s1: [
    { id: "h1", title: "تمارين الباب الأول", subject: "الكيمياء", score: 48, max: 50, status: "submitted", date: "2026-07-02" },
    { id: "h2", title: "مسائل القوى", subject: "الفيزياء", score: 42, max: 50, status: "submitted", date: "2026-07-06" },
    { id: "h3", title: "حل المعادلات", subject: "الرياضيات", score: 0, max: 50, status: "missing", date: "2026-07-09" },
    { id: "h4", title: "التعبير الكتابي", subject: "العربي", score: 45, max: 50, status: "submitted", date: "2026-07-13" },
    { id: "h5", title: "قواعد اللغة", subject: "الإنجليزي", score: 38, max: 50, status: "late", date: "2026-07-17" },
    { id: "h6", title: "التفاعلات الكيميائية", subject: "الكيمياء", score: 44, max: 50, status: "submitted", date: "2026-07-16" },
    { id: "h7", title: "البصريات", subject: "الفيزياء", score: 40, max: 50, status: "submitted", date: "2026-07-18" },
    { id: "h8", title: "التفاضل", subject: "الرياضيات", score: 0, max: 50, status: "missing", date: "2026-07-19" },
  ],
  s2: [
    { id: "h9", title: "تمارين الباب الأول", subject: "الكيمياء", score: 50, max: 50, status: "submitted", date: "2026-07-02" },
    { id: "h10", title: "مسائل القوى", subject: "الفيزياء", score: 46, max: 50, status: "submitted", date: "2026-07-06" },
    { id: "h11", title: "حل المعادلات", subject: "الرياضيات", score: 48, max: 50, status: "submitted", date: "2026-07-09" },
    { id: "h12", title: "التعبير الكتابي", subject: "العربي", score: 44, max: 50, status: "submitted", date: "2026-07-13" },
    { id: "h13", title: "قواعد اللغة", subject: "الإنجليزي", score: 47, max: 50, status: "submitted", date: "2026-07-17" },
  ],
  s3: [
    { id: "h14", title: "تمارين الباب الأول", subject: "الكيمياء", score: 30, max: 50, status: "submitted", date: "2026-07-02" },
    { id: "h15", title: "مسائل القوى", subject: "الفيزياء", score: 0, max: 50, status: "missing", date: "2026-07-06" },
    { id: "h16", title: "حل المعادلات", subject: "الرياضيات", score: 35, max: 50, status: "submitted", date: "2026-07-09" },
    { id: "h17", title: "التعبير الكتابي", subject: "العربي", score: 38, max: 50, status: "submitted", date: "2026-07-13" },
    { id: "h18", title: "قواعد اللغة", subject: "الإنجليزي", score: 28, max: 50, status: "late", date: "2026-07-17" },
  ],
}

const attendanceData: Record<string, AttendanceWeek[]> = {
  s1: [
    { week: "الأسبوع 1", present: 5, late: 0, absent: 0 },
    { week: "الأسبوع 2", present: 4, late: 1, absent: 0 },
    { week: "الأسبوع 3", present: 5, late: 0, absent: 0 },
    { week: "الأسبوع 4", present: 3, late: 1, absent: 1 },
    { week: "الأسبوع 5", present: 5, late: 0, absent: 0 },
  ],
  s2: [
    { week: "الأسبوع 1", present: 5, late: 0, absent: 0 },
    { week: "الأسبوع 2", present: 5, late: 0, absent: 0 },
    { week: "الأسبوع 3", present: 4, late: 1, absent: 0 },
    { week: "الأسبوع 4", present: 5, late: 0, absent: 0 },
    { week: "الأسبوع 5", present: 4, late: 0, absent: 1 },
  ],
  s3: [
    { week: "الأسبوع 1", present: 3, late: 1, absent: 1 },
    { week: "الأسبوع 2", present: 4, late: 0, absent: 1 },
    { week: "الأسبوع 3", present: 2, late: 2, absent: 1 },
    { week: "الأسبوع 4", present: 3, late: 1, absent: 1 },
    { week: "الأسبوع 5", present: 4, late: 0, absent: 1 },
  ],
}

function getStrengthWeakness(exams: ExamRecord[]) {
  const strengths = exams.filter((e) => (e.score / e.max) * 100 >= 80).map((e) => e.subject)
  const weaknesses = exams.filter((e) => (e.score / e.max) * 100 < 60).map((e) => e.subject)
  return { strengths, weaknesses }
}

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function LearningReportsPage() {
  const [selectedStudentId, setSelectedStudentId] = useState("s1")

  const student = students.find((s) => s.id === selectedStudentId)!
  const exams = allExams[selectedStudentId] || []
  const homework = allHomework[selectedStudentId] || []
  const attendance = attendanceData[selectedStudentId] || []

  const stats = useMemo(() => {
    const totalAttendance = attendance.reduce((s, w) => s + w.present + w.late + w.absent, 0)
    const presentCount = attendance.reduce((s, w) => s + w.present, 0)
    const attendanceRate = totalAttendance > 0 ? Math.round((presentCount / totalAttendance) * 100) : 0
    const submittedHW = homework.filter((h) => h.status === "submitted").length
    const hwCompletion = homework.length > 0 ? Math.round((submittedHW / homework.length) * 100) : 0
    const avgExamScore = exams.length > 0 ? Math.round(exams.reduce((s, e) => s + (e.score / e.max) * 100, 0) / exams.length) : 0
    const overall = Math.round((attendanceRate + hwCompletion + avgExamScore) / 3)
    return { attendanceRate, hwCompletion, avgExamScore, overall, submittedHW, totalHW: homework.length }
  }, [attendance, homework, exams])

  const { strengths, weaknesses } = getStrengthWeakness(exams)

  const examTrend = exams.map((e) => ({ subject: e.subject, percentage: Math.round((e.score / e.max) * 100) }))

  return (
    <div className="min-h-screen">
      <Breadcrumb items={[{ label: "التقارير", href: "/teacher/reports" }, { label: "تقارير التعلم" }]} />
      <DashboardHeader title="تقارير التعلم" subtitle="تقرير شامل لكل طالب - الحضور والواجبات والامتحانات" />
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="flex items-center gap-3 flex-wrap">
            <label className="text-sm font-medium text-text">اختر الطالب:</label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="px-4 py-2.5 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-[200px]"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <button type="button" onClick={() => toast.success("سيتم تصدير التقرير كملف PDF")}
              className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-all flex items-center gap-2 mr-auto"
            >
              <HiOutlinePrinter className="w-4 h-4" />
              <span>طباعة / PDF</span>
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            <StatsCard title="معدل الحضور" value={`${stats.attendanceRate}%`} icon={HiOutlineUserGroup} color="primary" />
            <StatsCard title="إنجاز الواجبات" value={`${stats.hwCompletion}%`} icon={HiOutlineCheckCircle} color="success" />
            <StatsCard title="متوسط الامتحانات" value={`${stats.avgExamScore}%`} icon={HiOutlineAcademicCap} color="info" />
            <StatsCard title="التقييم العام" value={`${stats.overall}%`} icon={HiOutlineChartBar} color={stats.overall >= 70 ? "success" : "warning"} />
            <StatsCard title="الواجبات المسلمة" value={`${stats.submittedHW}/${stats.totalHW}`} icon={HiOutlineBookOpen} color="warning" />
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle>الحضور الأسبوعي</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={attendance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="week" tick={{ fontSize: 10, fill: "var(--color-text-secondary)" }} />
                    <YAxis tick={{ fontSize: 10, fill: "var(--color-text-secondary)" }} />
                    <Tooltip />
                    <Bar dataKey="present" name="حاضر" stackId="a" radius={[0, 0, 0, 0]} fill="#10b981" />
                    <Bar dataKey="late" name="متأخر" stackId="a" radius={[0, 0, 0, 0]} fill="#f59e0b" />
                    <Bar dataKey="absent" name="غائب" stackId="a" radius={[4, 4, 0, 0]} fill="#e11d48" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-center gap-4 mt-3 text-xs text-text-secondary">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#10b981]" /> حاضر ({attendance.reduce((s, w) => s + w.present, 0)})</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#f59e0b]" /> متأخر ({attendance.reduce((s, w) => s + w.late, 0)})</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#e11d48]" /> غائب ({attendance.reduce((s, w) => s + w.absent, 0)})</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>اتجاه أداء الامتحانات</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={examTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="subject" tick={{ fontSize: 10, fill: "var(--color-text-secondary)" }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "var(--color-text-secondary)" }} />
                    <Tooltip formatter={(value: number) => `${value}%`} />
                    <Line type="monotone" dataKey="percentage" name="النسبة" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: "#3b82f6" }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader><CardTitle>نتائج الامتحانات</CardTitle></CardHeader>
              <CardContent>
                <Table
                  columns={[
                    { key: "subject", header: "المادة" },
                    { key: "score", header: "الدرجة", render: (e) => <span className="text-sm font-medium text-text">{e.score}/{e.max}</span> },
                    { key: "percentage", header: "النسبة", render: (e) => {
                      const pct = Math.round((e.score / e.max) * 100)
                      return (
                        <div className="flex items-center gap-2">
                          <Progress value={pct} size="sm" className="w-20" />
                          <span className="text-xs font-medium">{pct}%</span>
                        </div>
                      )
                    }},
                    { key: "grade", header: "التقدير", render: (e) => {
                      const pct = (e.score / e.max) * 100
                      const variant = pct >= 90 ? "success" as const : pct >= 80 ? "primary" as const : pct >= 70 ? "warning" as const : "error" as const
                      const label = pct >= 90 ? "أ" : pct >= 80 ? "ب" : pct >= 70 ? "ج" : pct >= 60 ? "د" : "راسب"
                      return <Badge variant={variant}>{label}</Badge>
                    }},
                    { key: "date", header: "التاريخ" },
                  ]}
                  data={exams}
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader><CardTitle>الواجبات</CardTitle></CardHeader>
              <CardContent>
                <Table
                  columns={[
                    { key: "title", header: "الواجب" },
                    { key: "subject", header: "المادة" },
                    { key: "score", header: "الدرجة", render: (h) => <span className="text-sm font-medium text-text">{h.status === "missing" ? "-" : `${h.score}/${h.max}`}</span> },
                    { key: "status", header: "الحالة", render: (h) => {
                      const map: Record<string, { variant: "success" | "warning" | "error"; label: string }> = {
                        submitted: { variant: "success", label: "مسلم" },
                        late: { variant: "warning", label: "متأخر" },
                        missing: { variant: "error", label: "غير مسلم" },
                      }
                      const s = map[h.status]
                      return <Badge variant={s.variant}>{s.label}</Badge>
                    }},
                    { key: "date", header: "التاريخ" },
                  ]}
                  data={homework}
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-success">
                  <HiOutlineTrendingUp className="w-5 h-5" />
                  <span>نقاط القوة</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {strengths.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {strengths.map((s) => (
                      <Badge key={s} variant="success" size="md">{s}</Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-text-tertiary">لا توجد نقاط قوة واضحة</p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-error">
                  <HiOutlineTrendingDown className="w-5 h-5" />
                  <span>نقاط الضعف</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {weaknesses.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {weaknesses.map((s) => (
                      <Badge key={s} variant="error" size="md">{s}</Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-text-tertiary">لا توجد نقاط ضعف - أداء ممتاز</p>
                )}
                <div className="mt-4 p-3 rounded-xl bg-surface-secondary border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <HiOutlineLightBulb className="w-4 h-4 text-warning" />
                    <span className="text-xs font-medium text-text">ملاحظات المعلم</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {weaknesses.length > 0
                      ? `يحتاج الطالب إلى تحسين مستواه في ${weaknesses.join(" و ")}. ينصح بحل تمارين إضافية ومتابعة الدروس المسجلة.`
                      : "الطالب يؤدي بشكل ممتاز في جميع المواد. يستمر على نفس المنهج."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-l from-primary/5 to-transparent border-primary/20">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 overflow-hidden shrink-0">
                    <img src={student.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text mb-1">ملخص أداء {student.name}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      نسبة الحضور {stats.attendanceRate}% - إنجاز الواجبات {stats.hwCompletion}% - متوسط الامتحانات {stats.avgExamScore}%.
                      التقييم العام: {stats.overall >= 85 ? "ممتاز" : stats.overall >= 70 ? "جيد جداً" : stats.overall >= 60 ? "مقبول" : "يحتاج تحسين"}.
                      {strengths.length > 0 && ` نقاط القوة في: ${strengths.join("، ")}.`}
                      {weaknesses.length > 0 && ` يحتاج متابعة في: ${weaknesses.join("، ")}.`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import { HiOutlineAcademicCap, HiOutlineChartBar, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineClock, HiOutlineEye, HiOutlineDownload } from "react-icons/hi"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"

interface ExamResult {
  id: string; subject: string; student: string; score: number; total: number; date: string; grade: string
}

const results: ExamResult[] = [
  { id: "r1", subject: "الكيمياء", student: "أحمد محمد", score: 45, total: 50, date: "2026-07-15", grade: "A" },
  { id: "r2", subject: "الفيزياء", student: "أحمد محمد", score: 42, total: 50, date: "2026-07-14", grade: "A" },
  { id: "r3", subject: "الرياضيات", student: "أحمد محمد", score: 48, total: 50, date: "2026-07-13", grade: "A" },
  { id: "r4", subject: "العربي", student: "أحمد محمد", score: 36, total: 40, date: "2026-07-12", grade: "A" },
  { id: "r5", subject: "الكيمياء", student: "مريم أحمد", score: 38, total: 50, date: "2026-07-15", grade: "B" },
  { id: "r6", subject: "الإنجليزي", student: "مريم أحمد", score: 42, total: 50, date: "2026-07-14", grade: "A" },
]

const subjectAvg = [
  { subject: "الكيمياء", avg: 82, color: "#10b981" },
  { subject: "الفيزياء", avg: 78, color: "#3b82f6" },
  { subject: "الرياضيات", avg: 85, color: "#8b5cf6" },
  { subject: "العربي", avg: 90, color: "#f59e0b" },
  { subject: "الإنجليزي", avg: 88, color: "#e11d48" },
]

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function ParentResultsPage() {
  const aCount = results.filter((r) => r.grade === "A").length
  const avgScore = Math.round(results.reduce((s, r) => s + (r.score / r.total) * 100, 0) / results.length)

  return (
    <div className="min-h-screen">
      <DashboardHeader title="نتائج الأبناء" subtitle="متابعة نتائج الامتحانات والتقييمات" />
      <div className="p-4 md:p-6 space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <StatsCard title="عدد الامتحانات" value={results.length} icon={HiOutlineAcademicCap} color="primary" />
            <StatsCard title="متوسط الدرجات" value={`${avgScore}%`} icon={HiOutlineChartBar} color="success" />
            <StatsCard title="امتياز A" value={aCount} icon={HiOutlineCheckCircle} color="success" />
            <StatsCard title="قيد التصحيح" value={0} icon={HiOutlineClock} color="warning" />
          </motion.div>
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle>متوسط الدرجات حسب المادة</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={subjectAvg}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="subject" tick={{ fontSize: 12, fill: "var(--color-text-secondary)" }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "var(--color-text-secondary)" }} />
                    <Tooltip />
                    <Bar dataKey="avg" radius={[6, 6, 0, 0]}>
                      {subjectAvg.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>آخر النتائج</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {results.slice(0, 5).map((r) => (
                    <div key={r.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
                      <div>
                        <p className="text-sm font-medium text-text">{r.subject}</p>
                        <p className="text-xs text-text-tertiary">{r.student} - {r.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{r.score}/{r.total}</span>
                        <Badge variant={r.grade === "A" ? "success" : "warning"} size="sm">{r.grade}</Badge>
                      </div>
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

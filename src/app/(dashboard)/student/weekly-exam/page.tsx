"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiAcademicCap, HiBeaker, HiCalculator, HiBookOpen, HiGlobe,
  HiCheckCircle, HiXCircle, HiClock, HiChartBar, HiStar,
  HiOutlineArrowUp, HiOutlineArrowDown, HiRefresh, HiTrendingUp
} from "react-icons/hi"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { cn } from "@/lib/utils"

interface WeeklyExam {
  id: string
  subject: string
  subjectAr: string
  icon: typeof HiBeaker
  color: string
  date: string
  duration: number
  questions: number
  status: "upcoming" | "completed" | "missed"
  score?: number
  total?: number
  correct?: number
  incorrect?: number
}

const weeks = [
  {
    week: 1, label: "الأسبوع الأول", exams: [
      { id: "w1e1", subject: "chemistry", subjectAr: "الكيمياء", icon: HiBeaker, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30",
        date: "الإثنين 20 يوليو", duration: 30, questions: 10, status: "completed", score: 85, total: 100, correct: 17, incorrect: 3 },
      { id: "w1e2", subject: "physics", subjectAr: "الفيزياء", icon: HiAcademicCap, color: "text-blue-500 bg-blue-50 dark:bg-blue-900/30",
        date: "الثلاثاء 21 يوليو", duration: 30, questions: 10, status: "completed", score: 72, total: 100, correct: 14, incorrect: 4 },
      { id: "w1e3", subject: "math", subjectAr: "الرياضيات", icon: HiCalculator, color: "text-purple-500 bg-purple-50 dark:bg-purple-900/30",
        date: "الأربعاء 22 يوليو", duration: 45, questions: 15, status: "completed", score: 90, total: 100, correct: 27, incorrect: 3 },
      { id: "w1e4", subject: "arabic", subjectAr: "العربي", icon: HiBookOpen, color: "text-amber-500 bg-amber-50 dark:bg-amber-900/30",
        date: "الخميس 23 يوليو", duration: 30, questions: 10, status: "completed", score: 78, total: 100, correct: 15, incorrect: 5 },
      { id: "w1e5", subject: "english", subjectAr: "الإنجليزي", icon: HiGlobe, color: "text-rose-500 bg-rose-50 dark:bg-rose-900/30",
        date: "الجمعة 24 يوليو", duration: 30, questions: 10, status: "completed", score: 95, total: 100, correct: 19, incorrect: 1 },
    ]
  },
  {
    week: 2, label: "الأسبوع الثاني", exams: [
      { id: "w2e1", subjectAr: "الكيمياء", icon: HiBeaker, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30",
        date: "الإثنين 27 يوليو", duration: 30, questions: 10, status: "completed", score: 82, total: 100, correct: 16, incorrect: 4, subject: "chemistry" },
      { id: "w2e2", subjectAr: "الفيزياء", icon: HiAcademicCap, color: "text-blue-500 bg-blue-50 dark:bg-blue-900/30",
        date: "الثلاثاء 28 يوليو", duration: 30, questions: 10, status: "completed", score: 88, total: 100, correct: 17, incorrect: 3, subject: "physics" },
      { id: "w2e3", subjectAr: "الرياضيات", icon: HiCalculator, color: "text-purple-500 bg-purple-50 dark:bg-purple-900/30",
        date: "الأربعاء 29 يوليو", duration: 45, questions: 15, status: "completed", score: 65, total: 100, correct: 19, incorrect: 11, subject: "math" },
      { id: "w2e4", subjectAr: "العربي", icon: HiBookOpen, color: "text-amber-500 bg-amber-50 dark:bg-amber-900/30",
        date: "الخميس 30 يوليو", duration: 30, questions: 10, status: "completed", score: 91, total: 100, correct: 18, incorrect: 2, subject: "arabic" },
      { id: "w2e5", subjectAr: "الإنجليزي", icon: HiGlobe, color: "text-rose-500 bg-rose-50 dark:bg-rose-900/30",
        date: "الجمعة 31 يوليو", duration: 30, questions: 10, status: "upcoming", subject: "english" },
    ]
  },
  {
    week: 3, label: "الأسبوع الثالث", exams: [
      { id: "w3e1", subjectAr: "الكيمياء", icon: HiBeaker, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30",
        date: "الإثنين 3 أغسطس", duration: 30, questions: 10, status: "upcoming", subject: "chemistry" },
      { id: "w3e2", subjectAr: "الفيزياء", icon: HiAcademicCap, color: "text-blue-500 bg-blue-50 dark:bg-blue-900/30",
        date: "الثلاثاء 4 أغسطس", duration: 30, questions: 10, status: "upcoming", subject: "physics" },
      { id: "w3e3", subjectAr: "الرياضيات", icon: HiCalculator, color: "text-purple-500 bg-purple-50 dark:bg-purple-900/30",
        date: "الأربعاء 5 أغسطس", duration: 45, questions: 15, status: "upcoming", subject: "math" },
      { id: "w3e4", subjectAr: "العربي", icon: HiBookOpen, color: "text-amber-500 bg-amber-50 dark:bg-amber-900/30",
        date: "الخميس 6 أغسطس", duration: 30, questions: 10, status: "upcoming", subject: "arabic" },
      { id: "w3e5", subjectAr: "الإنجليزي", icon: HiGlobe, color: "text-rose-500 bg-rose-50 dark:bg-rose-900/30",
        date: "الجمعة 7 أغسطس", duration: 30, questions: 10, status: "upcoming", subject: "english" },
    ]
  }
]

const performanceData = [
  { week: "أ1", معدل: 84, كيمياء: 85, فيزياء: 72, رياضيات: 90, عربي: 78, إنجليزي: 95 },
  { week: "أ2", معدل: 82, كيمياء: 82, فيزياء: 88, رياضيات: 65, عربي: 91, إنجليزي: null },
]

function getGrade(score: number): { label: string; color: string } {
  if (score >= 90) return { label: "A", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500" }
  if (score >= 80) return { label: "B", color: "text-blue-600 bg-blue-50 dark:bg-blue-900/30 border-blue-500" }
  if (score >= 70) return { label: "C", color: "text-amber-600 bg-amber-50 dark:bg-amber-900/30 border-amber-500" }
  if (score >= 60) return { label: "D", color: "text-orange-600 bg-orange-50 dark:bg-orange-900/30 border-orange-500" }
  return { label: "F", color: "text-red-600 bg-red-50 dark:bg-red-900/30 border-red-500" }
}

export default function WeeklyExamPage() {
  const [currentWeek, setCurrentWeek] = useState(0)
  const week = weeks[currentWeek]
  const allCompleted = week.exams.filter((e) => e.status === "completed")
  const avgScore = allCompleted.length > 0 ? Math.round(allCompleted.reduce((s, e) => s + (e.score || 0), 0) / allCompleted.length) : 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface to-surface-secondary">
      <DashboardHeader />
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text">الامتحانات الأسبوعية</h1>
            <p className="text-sm text-text-secondary mt-1">اختبر نفسك كل أسبوع وراجع تقدمك</p>
          </div>
          <select value={currentWeek} onChange={(e) => setCurrentWeek(Number(e.target.value))}
            className="px-3 py-2 rounded-xl bg-surface border border-border text-sm text-text focus:outline-none cursor-pointer">
            {weeks.map((w, i) => <option key={i} value={i}>{w.label}</option>)}
          </select>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "المتوسط", value: `${avgScore}%`, icon: HiChartBar, color: "text-primary bg-primary/10" },
            { label: "تم", value: `${allCompleted.length}/${week.exams.length}`, icon: HiCheckCircle, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30" },
            { label: "قادم", value: `${week.exams.filter((e) => e.status === "upcoming").length}`, icon: HiClock, color: "text-amber-600 bg-amber-50 dark:bg-amber-900/30" },
            { label: "الأفضل", value: allCompleted.length > 0 ? `${Math.max(...allCompleted.map((e) => e.score || 0))}%` : "-", icon: HiStar, color: "text-purple-600 bg-purple-50 dark:bg-purple-900/30" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-surface rounded-xl border border-border p-4 text-center">
              <div className={`w-9 h-9 rounded-xl mx-auto mb-2 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <p className="text-lg font-bold text-text">{stat.value}</p>
              <p className="text-xs text-text-tertiary">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {performanceData.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-surface rounded-2xl border border-border p-5">
            <h3 className="text-sm font-semibold text-text mb-4 flex items-center gap-2">
              <HiTrendingUp className="w-4 h-4 text-primary" /> أدائك عبر الأسابيع
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="week" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="معدل" stroke="#0EA5E9" strokeWidth={2} dot={{ fill: "#0EA5E9" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        <div className="space-y-3">
          {week.exams.map((exam, i) => {
            const Icon = exam.icon
            const grade = exam.score ? getGrade(exam.score) : null
            return (
              <motion.div key={exam.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                className={`bg-surface rounded-xl border p-4 flex items-center gap-4 ${exam.status === "completed" ? "border-border" : exam.status === "upcoming" ? "border-primary/20" : "border-red-200"}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${exam.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-text text-sm">{exam.subjectAr}</p>
                  <p className="text-xs text-text-tertiary mt-0.5">{exam.date} • {exam.duration} د • {exam.questions} سؤال</p>
                </div>
                <div className="shrink-0 flex items-center gap-3">
                  {exam.status === "completed" && exam.score !== undefined && (
                    <>
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-full border ${grade?.color}`}>{grade?.label}</span>
                      <span className="text-sm font-bold text-text">{exam.score}%</span>
                    </>
                  )}
                  {exam.status === "upcoming" && (
                    <span className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                      <HiClock className="w-3.5 h-3.5" /> يبدأ قريباً
                    </span>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineStar, HiOutlineChartBar, HiOutlineTrendingUp,
  HiOutlineTrendingDown, HiOutlineMinus, HiOutlineFilter,
  HiOutlineAcademicCap, HiStar, HiFire,
} from "react-icons/hi"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Progress } from "@/components/ui/Progress"

const allStudents = [
  { id: "s1", name: "أحمد محمد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lb1", totalScore: 985, exams: 24, accuracy: 92, subjects: { chemistry: 95, physics: 90, math: 88, arabic: 94, english: 91 }, level: "خبير", change: "up" as const },
  { id: "s2", name: "مريم أحمد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lb2", totalScore: 942, exams: 23, accuracy: 89, subjects: { chemistry: 88, physics: 92, math: 85, arabic: 90, english: 87 }, level: "متقدم", change: "up" as const },
  { id: "s3", name: "يوسف علي", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lb3", totalScore: 918, exams: 22, accuracy: 87, subjects: { chemistry: 82, physics: 85, math: 94, arabic: 80, english: 86 }, level: "متقدم", change: "same" as const },
  { id: "s4", name: "سارة خالد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lb4", totalScore: 895, exams: 25, accuracy: 85, subjects: { chemistry: 78, physics: 88, math: 82, arabic: 92, english: 84 }, level: "متقدم", change: "up" as const },
  { id: "s5", name: "عمر حسن", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lb5", totalScore: 871, exams: 21, accuracy: 83, subjects: { chemistry: 85, physics: 80, math: 78, arabic: 82, english: 90 }, level: "متوسط", change: "down" as const },
  { id: "s6", name: "ندى سامي", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lb6", totalScore: 854, exams: 20, accuracy: 82, subjects: { chemistry: 90, physics: 76, math: 80, arabic: 88, english: 79 }, level: "متوسط", change: "up" as const },
  { id: "s7", name: "عبدالرحمن نور", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lb7", totalScore: 832, exams: 22, accuracy: 80, subjects: { chemistry: 74, physics: 82, math: 90, arabic: 76, english: 82 }, level: "متوسط", change: "same" as const },
  { id: "s8", name: "ليلى إبراهيم", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lb8", totalScore: 805, exams: 19, accuracy: 78, subjects: { chemistry: 80, physics: 74, math: 76, arabic: 84, english: 78 }, level: "متوسط", change: "up" as const },
  { id: "s9", name: "محمد كريم", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lb9", totalScore: 778, exams: 20, accuracy: 75, subjects: { chemistry: 72, physics: 78, math: 84, arabic: 70, english: 74 }, level: "مبتدئ", change: "down" as const },
  { id: "s10", name: "هند مصطفى", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lb10", totalScore: 754, exams: 18, accuracy: 73, subjects: { chemistry: 68, physics: 72, math: 70, arabic: 78, english: 76 }, level: "مبتدئ", change: "down" as const },
  { id: "s11", name: "كريم أيمن", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lb11", totalScore: 721, exams: 17, accuracy: 70, subjects: { chemistry: 70, physics: 68, math: 74, arabic: 66, english: 72 }, level: "مبتدئ", change: "same" as const },
  { id: "s12", name: "دينا شريف", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lb12", totalScore: 698, exams: 16, accuracy: 68, subjects: { chemistry: 65, physics: 70, math: 68, arabic: 72, english: 68 }, level: "مبتدئ", change: "up" as const },
  { id: "s13", name: "أمير جمال", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lb13", totalScore: 665, exams: 15, accuracy: 65, subjects: { chemistry: 60, physics: 64, math: 72, arabic: 62, english: 66 }, level: "مبتدئ", change: "down" as const },
  { id: "s14", name: "شهد تامر", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lb14", totalScore: 634, exams: 14, accuracy: 62, subjects: { chemistry: 58, physics: 62, math: 64, arabic: 68, english: 60 }, level: "مبتدئ", change: "up" as const },
  { id: "s15", name: "زياد عادل", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lb15", totalScore: 602, exams: 14, accuracy: 60, subjects: { chemistry: 55, physics: 60, math: 62, arabic: 58, english: 64 }, level: "مبتدئ", change: "down" as const },
]

const subjectKey = { chemistry: "الكيمياء", physics: "الفيزياء", math: "الرياضيات", arabic: "العربي", english: "الإنجليزي" } as const
type SubjectKey = keyof typeof subjectKey

const subjectOrder: SubjectKey[] = ["chemistry", "physics", "math", "arabic", "english"]
const periodOptions = ["هذا الأسبوع", "هذا الشهر", "هذا العام", "كل الوقت"]

const levelColors: Record<string, string> = {
  خبير: "text-success",
  متقدم: "text-primary",
  متوسط: "text-warning",
  مبتدئ: "text-text-tertiary",
}

const currentUser = { id: "current", name: "أنت", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=current", totalScore: 842, exams: 21, accuracy: 81, subjects: { chemistry: 82, physics: 80, math: 78, arabic: 86, english: 83 }, level: "متوسط", change: "up" as const }

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

const scoreDistData = [
  { name: "900+", count: 3, fill: "#10b981" },
  { name: "800-899", count: 4, fill: "#3b82f6" },
  { name: "700-799", count: 4, fill: "#f59e0b" },
  { name: "-700", count: 4, fill: "#e11d48" },
]

export default function LeaderboardPage() {
  const [subjectFilter, setSubjectFilter] = useState<string>("all")
  const [period, setPeriod] = useState(0)

  const sorted = [...allStudents].sort((a, b) => {
    if (subjectFilter === "all") return b.totalScore - a.totalScore
    const key = subjectFilter as SubjectKey
    return (b.subjects[key] || 0) - (a.subjects[key] || 0)
  })

  const top3 = sorted.slice(0, 3)
  const rest = sorted.slice(3)

  const currentRank = sorted.findIndex((s) => currentUser.totalScore > s.totalScore) + 1

  return (
    <div className="min-h-screen">
      <DashboardHeader title="لوحة المتصدرين" subtitle="تصنيف الطلاب حسب الأداء والنتائج" />
      <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            <StatsCard title="ترتيبي" value={`#${currentRank}`} icon={HiOutlineStar} color="primary" />
            <StatsCard title="نقاطي" value={currentUser.totalScore} icon={HiOutlineChartBar} color="success" />
            <StatsCard title="الامتحانات" value={currentUser.exams} icon={HiOutlineAcademicCap} color="info" />
            <StatsCard title="الدقة" value={`${currentUser.accuracy}%`} icon={HiStar} color="warning" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex gap-2 flex-wrap">
              {["all", ...subjectOrder].map((s) => (
                <button type="button"
                  key={s}
                  onClick={() => setSubjectFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    subjectFilter === s ? "border-primary bg-primary/10 text-primary" : "border-border text-text-secondary hover:bg-surface-secondary"
                  }`}
                >
                  {s === "all" ? "الكل" : subjectKey[s as SubjectKey]}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {periodOptions.map((p, i) => (
                <button type="button"
                  key={p}
                  onClick={() => setPeriod(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    period === i ? "border-primary bg-primary/10 text-primary" : "border-border text-text-secondary hover:bg-surface-secondary"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
                <CardContent className="p-8">
                <div className="flex items-end justify-center gap-4 mb-8">
                  {top3.map((student, i) => {
                    const podiumColors = ["bg-yellow-400", "bg-gray-300", "bg-amber-600"]
                    const heights = ["h-36", "h-28", "h-20"]
                    return (
                      <div key={student.id} className="flex flex-col items-center gap-2">
                        <div className="relative">
                          <img src={student.avatar} alt={student.name} className="w-14 h-14 rounded-full border-4 border-white shadow-md" />
                          <div className={`absolute -top-2 -left-2 w-7 h-7 rounded-full ${podiumColors[i]} flex items-center justify-center text-white font-bold text-xs shadow`}>
                            {i + 1}
                          </div>
                        </div>
                        <span className="text-sm font-bold text-text">{student.name}</span>
                        <span className="text-xs text-text-tertiary">{student.totalScore} نقطة</span>
                        <span className={`text-[10px] font-medium ${levelColors[student.level]} bg-surface-secondary px-2 py-0.5 rounded-full`}>{student.level}</span>
                        <div className={`w-16 ${heights[i]} rounded-t-lg ${podiumColors[i]} opacity-80 mt-2 flex items-center justify-center text-white font-bold text-lg`}>
                          {i + 1}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>تصنيف الطلاب</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {currentRank > 0 && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/30 mb-2">
                      <span className="w-8 text-center text-sm font-bold text-primary">{currentRank}</span>
                      <img src={currentUser.avatar} alt="" className="w-8 h-8 rounded-full bg-surface" />
                      <span className="flex-1 text-sm font-bold text-text">{currentUser.name}</span>
                      <span className="text-xs text-text-tertiary">{currentUser.totalScore} نقطة</span>
                      <span className="text-xs text-text-tertiary">{currentUser.accuracy}%</span>
                      {currentUser.change === "up" ? <HiOutlineTrendingUp className="w-4 h-4 text-success" /> : currentUser.change === "down" ? <HiOutlineTrendingDown className="w-4 h-4 text-error" /> : <HiOutlineMinus className="w-4 h-4 text-text-tertiary" />}
                    </div>
                  )}
                  {rest.map((student, idx) => {
                    const rank = idx + 4
                    const isUser = false
                    return (
                      <div key={student.id} className={`flex items-center gap-3 p-4 rounded-xl transition-colors hover:bg-surface-secondary ${isUser ? "bg-primary/10 border border-primary/30" : ""}`}>
                        <span className="w-8 text-center text-sm font-bold text-text-tertiary">{rank}</span>
                        <img src={student.avatar} alt="" className="w-8 h-8 rounded-full bg-surface-secondary" />
                        <span className="flex-1 text-sm font-medium text-text truncate">{student.name}</span>
                        <div className="hidden sm:flex items-center gap-4 text-xs text-text-tertiary">
                          {subjectOrder.slice(0, 3).map((sk) => (
                            <span key={sk} className="flex items-center gap-1">
                              <span className="w-12 h-1.5 rounded-full bg-surface-tertiary overflow-hidden">
                                <span className="h-full rounded-full bg-primary block" style={{ width: `${student.subjects[sk]}%` }} />
                              </span>
                            </span>
                          ))}
                        </div>
                        <span className="text-xs font-semibold text-text-tertiary">{student.totalScore}</span>
                        <span className="text-xs text-text-tertiary">{student.accuracy}%</span>
                        {student.change === "up" ? <HiOutlineTrendingUp className="w-4 h-4 text-success" /> : student.change === "down" ? <HiOutlineTrendingDown className="w-4 h-4 text-error" /> : <HiOutlineMinus className="w-4 h-4 text-text-tertiary" />}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>توزيع النقاط</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={scoreDistData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name, count }: { name: string; count: number }) => `${name} (${count})`}>
                      {scoreDistData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>ترتيبي حسب المادة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {subjectOrder.map((sk) => {
                  const rankInSubj = sorted.filter((s) => (s.subjects[sk] || 0) > (currentUser.subjects[sk] || 0)).length + 1
                  return (
                    <div key={sk} className="flex items-center justify-between text-sm">
                      <span className="text-text">{subjectKey[sk]}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={currentUser.subjects[sk]} size="sm" variant="primary" className="w-24" />
                        <span className="text-xs font-bold text-primary">#{rankInSubj}</span>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineStar,
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineUsers,
  HiOutlineAcademicCap,
} from "react-icons/hi"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Avatar } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select"
import { mockExams, mockStudents } from "@/lib/mock/data"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { cn } from "@/lib/utils"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const timePeriods = [
  { id: "weekly", label: "أسبوعي" },
  { id: "monthly", label: "شهري" },
  { id: "yearly", label: "عام" },
] as const

const rankStyles = [
  { card: "border-amber-300 bg-amber-50/60 dark:border-amber-600 dark:bg-amber-900/10", badge: "bg-amber-400 text-white", icon: HiOutlineStar },
  { card: "border-slate-300 bg-slate-50/60 dark:border-slate-500 dark:bg-slate-800/10", badge: "bg-slate-400 text-white", icon: HiOutlineStar },
  { card: "border-orange-300 bg-orange-50/60 dark:border-orange-600 dark:bg-orange-900/10", badge: "bg-orange-500 text-white", icon: HiOutlineStar },
]

const examOptions = mockExams.map((e) => ({ value: e.id, label: e.title }))

function getBadge(percentage: number): { label: string; variant: "success" | "primary" | "warning" | "info" | "error" } {
  if (percentage >= 90) return { label: "ممتاز", variant: "success" }
  if (percentage >= 80) return { label: "جيد جداً", variant: "primary" }
  if (percentage >= 65) return { label: "جيد", variant: "warning" }
  if (percentage >= 50) return { label: "مقبول", variant: "info" }
  return { label: "ضعيف", variant: "error" }
}

function deterministicScore(seed: number, max: number): number {
  const raw = ((seed * 9301 + 49297) % 10000) / 10000
  return Math.min(max, Math.max(1, Math.floor(raw * max * 0.5 + max * 0.4)))
}

function deterministicTime(seed: number, maxDuration: number): number {
  const raw = ((seed * 49297 + 9301) % 1000) / 1000
  return Math.floor(raw * maxDuration * 0.7 + maxDuration * 0.1)
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-surface border border-border rounded-xl p-3 shadow-lg text-sm space-y-1">
      <p className="font-semibold text-text mb-1">{label}</p>
      {payload.map((entry: { value: number }, idx: number) => (
        <p key={idx} className="text-text-secondary">
          <span className="inline-block w-2.5 h-2.5 rounded-full ml-1.5" style={{ backgroundColor: entry.color }} />
          {entry.name}: <span className="font-medium text-text">{entry.value}%</span>
        </p>
      ))}
    </div>
  )
}

export default function LeaderboardPage() {
  const [selectedExamId, setSelectedExamId] = useState(mockExams[0]?.id || "")
  const [timePeriod, setTimePeriod] = useState("yearly")
  const [showAll, setShowAll] = useState(false)
  const router = useRouter()

  const allEntries = useMemo(() => {
    const exam = mockExams.find((e) => e.id === selectedExamId)
    if (!exam) return []
    const examIndex = parseInt(selectedExamId.replace("exam-", ""), 10) || 1
    return mockStudents
      .map((student, idx) => {
        const seed = idx * 17 + examIndex * 31
        const score = deterministicScore(seed, exam.totalGrade)
        const timeTaken = deterministicTime(seed, exam.duration)
        const date = new Date(2025, 2 + (idx % 9), 5 + (idx % 25))
        return {
          studentId: student.id,
          studentName: student.name,
          avatar: student.avatar,
          score,
          totalGrade: exam.totalGrade,
          percentage: Math.round((score / exam.totalGrade) * 100),
          timeTaken,
          date,
        }
      })
      .sort((a, b) => b.score - a.score || a.timeTaken - b.timeTaken)
  }, [selectedExamId])

  const filteredEntries = useMemo(() => {
    const now = new Date()
    return allEntries.filter((entry) => {
      const diffDays = (now.getTime() - entry.date.getTime()) / (1000 * 60 * 60 * 24)
      if (timePeriod === "weekly") return diffDays <= 7
      if (timePeriod === "monthly") return diffDays <= 30
      return true
    })
  }, [allEntries, timePeriod])

  const top3 = useMemo(() => filteredEntries.slice(0, 3), [filteredEntries])
  const top10 = useMemo(() => filteredEntries.slice(0, 10), [filteredEntries])
  const displayEntries = useMemo(() => showAll ? filteredEntries : filteredEntries.slice(0, 20), [filteredEntries, showAll])

  const chartData = useMemo(() => {
    return top10.map((entry, idx) => ({
      name: entry.studentName,
      score: entry.percentage,
    }))
  }, [top10])

  const stats = useMemo(() => {
    if (filteredEntries.length === 0) return { total: 0, avgScore: 0, highestScore: 0, fastestTime: 0 }
    const total = filteredEntries.length
    const avgScore = Math.round(filteredEntries.reduce((s, e) => s + e.percentage, 0) / total)
    const highestScore = Math.max(...filteredEntries.map((e) => e.percentage))
    const fastestTime = Math.min(...filteredEntries.map((e) => e.timeTaken))
    return { total, avgScore, highestScore, fastestTime }
  }, [filteredEntries])

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "الامتحانات", href: "/teacher/exams" }, { label: "المتصدرون" }]} />
      <PageHeader title="لوحة المتصدرين" description="ترتيب الطلاب حسب أدائهم في الامتحانات" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="w-full sm:w-72">
          <Select options={examOptions} value={selectedExamId} onChange={(e) => setSelectedExamId(e.target.value)} />
        </div>
        <Link href={`/teacher/exams/${selectedExamId}`} className="text-xs text-primary hover:underline shrink-0">
          عرض تفاصيل الامتحان
        </Link>
        <div className="flex items-center gap-2">
          {timePeriods.map((period) => (
            <button type="button"
              key={period.id}
              onClick={() => setTimePeriod(period.id)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-lg transition-all",
                timePeriod === period.id
                  ? "bg-primary text-white"
                  : "bg-surface-secondary text-text-secondary hover:text-text border border-border"
              )}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="إجمالي المشاركين" value={stats.total} icon={HiOutlineUsers} color="primary" />
        <StatsCard title="متوسط الدرجات" value={`%${stats.avgScore}`} icon={HiOutlineAcademicCap} color="success" />
        <StatsCard title="أعلى درجة" value={`%${stats.highestScore}`} icon={HiOutlineStar} color="warning" />
        <StatsCard title="أسرع وقت" value={`${stats.fastestTime} د`} icon={HiOutlineClock} color="info" />
      </div>

      {top3.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <HiOutlineStar className="w-12 h-12 mx-auto mb-3 text-text-tertiary/50" />
            <p className="text-text-secondary font-medium">لا توجد بيانات متاحة للعرض</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {top3.map((entry, idx) => {
              const rank = idx
              const isFirst = idx === 0
              return (
                <motion.div
                  key={entry.studentId}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.12, duration: 0.4 }}
                  className={cn(
                    "relative border-2 rounded-xl p-6 text-center transition-shadow hover:shadow-lg",
                    rankStyles[rank].card,
                    isFirst && "md:-mt-4 md:scale-105 z-10"
                  )}
                >
                  <div className={cn(
                    "absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-lg",
                    rankStyles[rank].badge
                  )}>
                    {isFirst ? (
                      <HiOutlineStar className="w-5 h-5 text-yellow-600" />
                    ) : (
                      <span className="text-sm font-bold">{rank + 1}</span>
                    )}
                  </div>
                  <div className="mt-4 flex flex-col items-center gap-3">
                    <Avatar src={entry.avatar} name={entry.studentName} size="lg" />
                    <div className="space-y-1">
                      <Link href={`/teacher/students/${entry.studentId}`} className="font-semibold text-text hover:text-primary transition-colors">{entry.studentName}</Link>
                      <p className="text-3xl font-bold text-primary">{entry.percentage}%</p>
                      <div className="flex items-center justify-center gap-3 text-xs text-text-tertiary">
                        <span className="flex items-center gap-1">
                          <HiOutlineClipboardList className="w-3.5 h-3.5" />
                          {entry.score}/{entry.totalGrade}
                        </span>
                        <span className="flex items-center gap-1">
                          <HiOutlineClock className="w-3.5 h-3.5" />
                          {entry.timeTaken} د
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>أفضل 10 طلاب</CardTitle>
              <CardDescription>توزيع درجات أفضل 10 طلاب في الامتحان</CardDescription>
            </CardHeader>
            <CardContent>
              <div dir="ltr" className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                    <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="score" fill="#6366F1" radius={[4, 4, 0, 0]} name="الدرجة" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>ترتيب الطلاب</CardTitle>
                <CardDescription>
                  قائمة بترتيب الطلاب حسب أدائهم
                  {!showAll && filteredEntries.length > 20 && ` (عرض أول 20 من ${filteredEntries.length})`}
                </CardDescription>
              </div>
              {filteredEntries.length > 20 && (
                <Button variant="secondary" size="sm" onClick={() => setShowAll(!showAll)}>
                  {showAll ? "عرض أقل" : "عرض الكل"}
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-surface-secondary border-b border-border">
                      <th className="text-right px-4 py-3 font-semibold text-text-secondary w-14">الترتيب</th>
                      <th className="text-right px-4 py-3 font-semibold text-text-secondary">الطالب</th>
                      <th className="text-right px-4 py-3 font-semibold text-text-secondary">الدرجة</th>
                      <th className="text-right px-4 py-3 font-semibold text-text-secondary">الوقت</th>
                      <th className="text-right px-4 py-3 font-semibold text-text-secondary">التاريخ</th>
                      <th className="text-right px-4 py-3 font-semibold text-text-secondary">التقييم</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayEntries.map((entry, idx) => {
                      const rank = idx + 1
                      const badge = getBadge(entry.percentage)
                      return (
                        <motion.tr
                          key={entry.studentId}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.02 }}
                          className="border-b border-border last:border-0 hover:bg-surface-secondary transition-colors"
                        >
                          <td className="px-4 py-3">
                            <span className={cn(
                              "inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold",
                              rank === 1 ? "bg-amber-400 text-white" :
                              rank === 2 ? "bg-slate-400 text-white" :
                              rank === 3 ? "bg-orange-500 text-white" :
                              "bg-surface-tertiary text-text-tertiary"
                            )}>
                              {rank}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <Avatar src={entry.avatar} name={entry.studentName} size="sm" />
                              <Link href={`/teacher/students/${entry.studentId}`} className="font-medium text-text hover:text-primary transition-colors">{entry.studentName}</Link>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-text">{entry.score}</span>
                              <span className="text-text-tertiary">/ {entry.totalGrade}</span>
                              <Progress value={entry.percentage} size="sm" variant="primary" className="w-16" />
                            </div>
                          </td>
                          <td className="px-4 py-3 text-text">{entry.timeTaken} دقيقة</td>
                          <td className="px-4 py-3 text-text-secondary text-xs">{entry.date.toLocaleDateString("ar-EG")}</td>
                          <td className="px-4 py-3">
                            <Badge variant={badge.variant} size="sm">{badge.label}</Badge>
                          </td>
                        </motion.tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

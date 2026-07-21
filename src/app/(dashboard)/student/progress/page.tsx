"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineChartBar, HiOutlineCalendar, HiOutlineClock,
  HiOutlineFire, HiOutlineStar, HiOutlineBookOpen,
  HiOutlineTrendingUp, HiOutlineCheckCircle, HiOutlineAcademicCap,
  HiOutlineLightningBolt,
} from "react-icons/hi"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, Cell, Legend, RadialBarChart, RadialBar,
} from "recharts"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Progress } from "@/components/ui/Progress"

const weeklyData = [
  { day: "السبت", فيزياء: 85, كيمياء: 90, رياضيات: 78, عربي: 92, إنجليزي: 88, ساعات: 3 },
  { day: "الأحد", فيزياء: 80, كيمياء: 85, رياضيات: 82, عربي: 88, إنجليزي: 85, ساعات: 2.5 },
  { day: "الإثنين", فيزياء: 88, كيمياء: 82, رياضيات: 85, عربي: 90, إنجليزي: 82, ساعات: 4 },
  { day: "الثلاثاء", فيزياء: 82, كيمياء: 88, رياضيات: 80, عربي: 85, إنجليزي: 80, ساعات: 3.5 },
  { day: "الأربعاء", فيزياء: 90, كيمياء: 86, رياضيات: 88, عربي: 92, إنجليزي: 86, ساعات: 4 },
  { day: "الخميس", فيزياء: 78, كيمياء: 80, رياضيات: 75, عربي: 82, إنجليزي: 78, ساعات: 2 },
  { day: "الجمعة", فيزياء: 92, كيمياء: 92, رياضيات: 90, عربي: 95, إنجليزي: 90, ساعات: 5 },
]

const monthlyData = Array.from({ length: 12 }, (_, i) => ({
  month: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"][i],
  score: [65, 68, 72, 75, 78, 82, 85, 83, 88, 90, 87, 92][i],
  hours: [20, 22, 25, 28, 30, 35, 38, 36, 40, 42, 38, 45][i],
}))

const subjectMastery = [
  { subject: "الفيزياء", value: 85, fill: "#3b82f6" },
  { subject: "الكيمياء", value: 87, fill: "#10b981" },
  { subject: "الرياضيات", value: 82, fill: "#8b5cf6" },
  { subject: "العربي", value: 90, fill: "#f59e0b" },
  { subject: "الإنجليزي", value: 85, fill: "#e11d48" },
]

const heatmapData = Array.from({ length: 7 }, (_, day) =>
  Array.from({ length: 12 }, (_, week) => {
    const seed = (day * 12 + week) * 7 + 3
    const vals = [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3]
    return vals[seed % vals.length]
  })
)

const dayLabels = ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function ProgressPage() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly")

  const totalHours = weeklyData.reduce((s, d) => s + d.ساعات, 0) // إجمالي ساعات المذاكرة
  const avgScore = Math.round(weeklyData.reduce((s, d) => s + (d.فيزياء + d.كيمياء + d.رياضيات + d.عربي + d.إنجليزي) / 5, 0) / 7)
  const streak = 12
  const daysStudied = 5

  return (
    <div className="min-h-screen">
      <DashboardHeader title="تقدمي الدراسي" subtitle="تحليل شامل لمستواك وأدائك في المواد" />
      <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <StatsCard title="المعدل العام" value={`${avgScore}%`} icon={HiOutlineChartBar} color="primary" />
            <StatsCard title="أيام المذاكرة" value={`${daysStudied}/7`} icon={HiOutlineCalendar} color="success" />
            <StatsCard title="التسلسل" value={`${streak} يوم`} icon={HiOutlineFire} color="warning" />
            <StatsCard title="ساعات هذا الأسبوع" value={weeklyData.reduce((s, d) => s + d.ساعات, 0)} icon={HiOutlineClock} color="info" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-2">
            {(["weekly", "monthly"] as const).map((p) => (
              <button type="button"
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${
                  period === p ? "border-primary bg-primary/10 text-primary" : "border-border text-text-secondary hover:bg-surface-secondary"
                }`}
              >
                {p === "weekly" ? "أسبوعي" : "شهري"}
              </button>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>الأداء اليومي حسب المادة</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} />
                    <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} />
                    <Tooltip />
                    {[
                      { key: "فيزياء", color: "#3b82f6" },
                      { key: "كيمياء", color: "#10b981" },
                      { key: "رياضيات", color: "#8b5cf6" },
                      { key: "عربي", color: "#f59e0b" },
                      { key: "إنجليزي", color: "#e11d48" },
                    ].map((s) => (
                      <Line key={s.key} type="monotone" dataKey={s.key} stroke={s.color} strokeWidth={2} dot={false} />
                    ))}
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>مستوى الإتقان</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" barSize={12} data={subjectMastery}>
                    <RadialBar label={{ fill: "var(--color-text)", fontSize: 11, position: "insideStart" }} background dataKey="value" />
                    <Legend iconSize={10} fontSize={11} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>سجل المذاكرة - خريطة النشاط</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-text-tertiary mb-2">
                    <span className="ml-auto">أقل</span>
                    <div className="w-3 h-3 rounded-sm bg-surface-tertiary" />
                    <div className="w-3 h-3 rounded-sm bg-primary/20" />
                    <div className="w-3 h-3 rounded-sm bg-primary/40" />
                    <div className="w-3 h-3 rounded-sm bg-primary/60" />
                    <div className="w-3 h-3 rounded-sm bg-primary/80" />
                    <div className="w-3 h-3 rounded-sm bg-primary" />
                    <span>أكثر</span>
                  </div>
                  {heatmapData.map((row, dayIdx) => (
                    <div key={dayIdx} className="flex items-center gap-1">
                      <span className="text-[10px] text-text-tertiary w-12 text-left">{dayLabels[dayIdx]}</span>
                      {row.map((val, weekIdx) => (
                        <div key={weekIdx}
                          className={`w-3 h-3 rounded-sm transition-colors ${
                            val === 0 ? "bg-surface-tertiary" :
                            val === 1 ? "bg-primary/20" :
                            val === 2 ? "bg-primary/50" :
                            "bg-primary"
                          }`}
                          title={`${dayLabels[dayIdx]} - ${val} ساعة`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>ساعات المذاكرة اليومية</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: "var(--color-text-secondary)" }} />
                    <YAxis tick={{ fontSize: 10, fill: "var(--color-text-secondary)" }} />
                    <Tooltip />
                    <Bar dataKey="ساعات" radius={[4, 4, 0, 0]}>
                      {weeklyData.map((_, i) => (
                        <Cell key={i} fill={["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#e11d48", "#06b6d4", "#84cc16"][i]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>التقدم الشهري</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="month" tick={{ fontSize: 9, fill: "var(--color-text-secondary)" }} />
                    <YAxis domain={[40, 100]} tick={{ fontSize: 10, fill: "var(--color-text-secondary)" }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="score" stroke="#3b82f6" fill="url(#scoreGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <HiOutlineLightningBolt className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-text mb-1">توصيات لتحسين مستواك</p>
                    <ul className="text-xs text-text-tertiary space-y-1 list-disc list-inside">
                      <li>تحتاج لزيادة ساعات المذاكرة في مادة <strong>الرياضيات</strong> (مستوى إتقان 82%)</li>
                      <li>واصل الأداء الممتاز في <strong>العربي</strong> (مستوى إتقان 90%)</li>
                      <li>حاول تخصيص ساعة يومية للمراجعة بدلاً من المذاكرة المكثفة في يوم الجمعة فقط</li>
                    </ul>
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

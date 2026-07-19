"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useDashboardStore } from "@/lib/dashboard-store"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import { cn, formatCurrency, formatRelativeTime, formatDate, formatDuration, det } from "@/lib/utils"
import {
  mockStats,
  mockTeacher,
  mockHomework,
  mockExams,
  mockCourses,
  mockEnrollments,
  mockActivityLog,
  mockStudents,
  mockAnalytics,
} from "@/lib/mock/data"
import {
  HiOutlineUsers,
  HiOutlineAcademicCap,
  HiOutlineCash,
  HiOutlineUserAdd,
  HiOutlineSpeakerphone,
  HiOutlinePlusCircle,
  HiOutlinePencilAlt,
  HiOutlineCog,
  HiOutlineBookOpen,
  HiOutlineClipboardCheck,
  HiOutlineCalendar,
  HiOutlineCube,
  HiOutlineExclamationCircle,
  HiOutlineClock,
} from "react-icons/hi"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts"

const quickActions = [
  { icon: HiOutlinePlusCircle, label: "ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط¸ئ’ط¸ث†ط·آ±ط·آ³", href: "/teacher/courses/create", color: "text-primary" },
  { icon: HiOutlineSpeakerphone, label: "ط·آ¥ط¸â€ ط·آ´ط·آ§ط·طŒ ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€ ", href: "/teacher/exams/create", color: "text-warning" },
  { icon: HiOutlineUserAdd, label: "ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ·ط·آ§ط¸â€‍ط·آ¨", href: "/teacher/students", color: "text-info" },
  { icon: HiOutlinePencilAlt, label: "ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط¸ث†ط·آ§ط·آ¬ط·آ¨", href: "/teacher/homework/create", color: "text-emerald-500" },
  { icon: HiOutlineCog, label: "ط·آ¥ط·آ¹ط·آ¯ط·آ§ط·آ¯ط·آ§ط·ع¾", href: "/teacher/settings", color: "text-text-secondary" },
  { icon: HiOutlineCube, label: "ط·آ¨ط¸â€ ط¸ئ’ ط·آ§ط¸â€‍ط·آ£ط·آ³ط·آ¦ط¸â€‍ط·آ©", href: "/teacher/questions", color: "text-purple-500" },
] as const

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const activityIcons: Record<string, React.ElementType> = {
  "ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ ط·آ¯ط·آ®ط¸ث†ط¸â€‍": HiOutlineCube,
  "ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ·ط·آ§ط¸â€‍ط·آ¨": HiOutlineUserAdd,
  "ط·آ±ط¸ظ¾ط·آ¹ ط¸ظ¾ط¸ظ¹ط·آ¯ط¸ظ¹ط¸ث†": HiOutlineBookOpen,
  "ط·آ¥ط¸â€ ط·آ´ط·آ§ط·طŒ ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€ ": HiOutlineSpeakerphone,
  "ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط¸ث†ط·آ§ط·آ¬ط·آ¨": HiOutlinePencilAlt,
  "ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍ ط¸ئ’ط¸ث†ط·آ±ط·آ³": HiOutlineAcademicCap,
  "ط·آ­ط·آ°ط¸ظ¾ ط·آ·ط·آ§ط¸â€‍ط·آ¨": HiOutlineUsers,
  "ط·آ¥ط·آµط·آ¯ط·آ§ط·آ± ط·آ´ط¸â€،ط·آ§ط·آ¯ط·آ©": HiOutlineClipboardCheck,
  "ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ ط·آ§ط·آ´ط·ع¾ط·آ±ط·آ§ط¸ئ’": HiOutlineCash,
  "ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍ ط·آµط¸â€‍ط·آ§ط·آ­ط¸ظ¹ط·آ§ط·ع¾": HiOutlineCog,
}

const activityColors: Record<string, string> = {
  "ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ ط·آ¯ط·آ®ط¸ث†ط¸â€‍": "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
  "ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ·ط·آ§ط¸â€‍ط·آ¨": "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20",
  "ط·آ±ط¸ظ¾ط·آ¹ ط¸ظ¾ط¸ظ¹ط·آ¯ط¸ظ¹ط¸ث†": "text-purple-500 bg-purple-50 dark:bg-purple-900/20",
  "ط·آ¥ط¸â€ ط·آ´ط·آ§ط·طŒ ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€ ": "text-amber-500 bg-amber-50 dark:bg-amber-900/20",
  "ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط¸ث†ط·آ§ط·آ¬ط·آ¨": "text-cyan-500 bg-cyan-50 dark:bg-cyan-900/20",
  "ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍ ط¸ئ’ط¸ث†ط·آ±ط·آ³": "text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20",
  "ط·آ­ط·آ°ط¸ظ¾ ط·آ·ط·آ§ط¸â€‍ط·آ¨": "text-red-500 bg-red-50 dark:bg-red-900/20",
  "ط·آ¥ط·آµط·آ¯ط·آ§ط·آ± ط·آ´ط¸â€،ط·آ§ط·آ¯ط·آ©": "text-green-500 bg-green-50 dark:bg-green-900/20",
  "ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ ط·آ§ط·آ´ط·ع¾ط·آ±ط·آ§ط¸ئ’": "text-amber-500 bg-amber-50 dark:bg-amber-900/20",
  "ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍ ط·آµط¸â€‍ط·آ§ط·آ­ط¸ظ¹ط·آ§ط·ع¾": "text-slate-500 bg-slate-50 dark:bg-slate-900/20",
}

export default function TeacherDashboard() {
  const router = useRouter()
  const { widgets } = useDashboardStore()
  const today = new Date()
  const dateStr = formatDate(today)

  const pendingHomework = useMemo(() => {
    let count = 0
    mockHomework.forEach((hw) => {
      hw.submissions.forEach((sub) => {
        if (sub.status === "submitted") count++
      })
    })
    return count
  }, [])

  const upcomingExams = useMemo(() => mockExams.filter((e) => e.status === "active").slice(0, 3), [])

  const recentEnrollments = useMemo(() => [...mockEnrollments].sort((a, b) => b.enrolledAt.getTime() - a.enrolledAt.getTime()).slice(0, 5), [])

  const lowPerformanceCount = useMemo(() => {
    return mockStudents.reduce((acc, s) => {
      const perf = s.level * 6 + s.xp / 100 + s.streak
      return perf < 65 ? acc + 1 : acc
    }, 0)
  }, [])

  const [activities, setActivities] = useState(() => mockActivityLog.slice(0, 8))

  useEffect(() => {
    const interval = setInterval(() => {
      setActivities((prev) => {
        const shuffled = [...mockActivityLog].sort(() => det() - 0.5).slice(0, 8)
        return shuffled
      })
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen">
      <DashboardHeader
        title="ط¸â€‍ط¸ث†ط·آ­ط·آ© ط·آ§ط¸â€‍ط·ع¾ط·آ­ط¸ئ’ط¸â€¦ ط·آ§ط¸â€‍ط·آ°ط¸ئ’ط¸ظ¹ط·آ©"
        subtitle={`${mockTeacher.name} أ¢â‚¬â€‌ ${dateStr}`}
      />

      <div className="p-4 md:p-6 space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/teacher/students"><StatsCard title="ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ ط·آ§ط¸â€‍ط·آ·ط¸â€‍ط·آ§ط·آ¨" value={mockStats.totalStudents} icon={HiOutlineUsers} color="primary" change={{ value: 12, isPositive: true }} subtitle="ط¸â€¦ط¸â€ڑط·آ§ط·آ±ط¸â€ ط·آ© ط·آ¨ط·آ§ط¸â€‍ط·آ´ط¸â€،ط·آ± ط·آ§ط¸â€‍ط¸â€¦ط·آ§ط·آ¶ط¸ظ¹" delay={0} /></Link>
              <Link href="/teacher/students"><StatsCard title="ط·آ§ط¸â€‍ط·آ·ط¸â€‍ط·آ§ط·آ¨ ط·آ§ط¸â€‍ط¸â€ ط·آ´ط·آ·ط¸ث†ط¸â€ " value={mockStats.activeStudents} icon={HiOutlineAcademicCap} color="success" change={{ value: 8, isPositive: true }} subtitle="ط¸â€ ط·آ³ط·آ¨ط·آ© ط·آ§ط¸â€‍ط¸â€ ط·آ´ط·آ§ط·آ· 78%" delay={0.1} /></Link>
              <Link href="/teacher/finance"><StatsCard title="ط·آ§ط¸â€‍ط·آ¥ط¸ظ¹ط·آ±ط·آ§ط·آ¯ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·آ´ط¸â€،ط·آ±ط¸ظ¹ط·آ©" value={formatCurrency(mockStats.monthlyRevenue)} icon={HiOutlineCash} color="warning" change={{ value: 15, isPositive: true }} subtitle="ط¸â€ ط¸â€¦ط¸ث† ط¸â€¦ط·آ³ط·ع¾ط¸â€¦ط·آ±" delay={0.2} /></Link>
              <Link href="/teacher/students"><StatsCard title="ط·آ§ط¸â€‍ط·آ·ط¸â€‍ط·آ§ط·آ¨ ط·آ§ط¸â€‍ط·آ¬ط·آ¯ط·آ¯" value={mockStats.newStudents} icon={HiOutlineUserAdd} color="info" change={{ value: 23, isPositive: true }} subtitle="ط¸â€،ط·آ°ط·آ§ ط·آ§ط¸â€‍ط·آ´ط¸â€،ط·آ±" delay={0.3} /></Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <Card className="h-full rounded-xl bg-surface border border-border hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                      <HiOutlineClipboardCheck className="w-6 h-6" />
                    </div>
                    <CardTitle>ط·آ§ط¸â€‍ط¸ث†ط·آ§ط·آ¬ط·آ¨ط·آ§ط·ع¾ ط·ط›ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط¸â€¦ط·آµط·آ­ط·آ­ط·آ©</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-text mb-2">{pendingHomework}</p>
                  <p className="text-sm text-text-secondary mb-4">ط¸ث†ط·آ§ط·آ¬ط·آ¨ ط¸ظ¾ط¸ظ¹ ط·آ§ط¸â€ ط·ع¾ط·آ¸ط·آ§ط·آ± ط·آ§ط¸â€‍ط·ع¾ط·آµط·آ­ط¸ظ¹ط·آ­</p>
                  <Link href="/teacher/homework" className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors font-medium">
                    ط·آ¹ط·آ±ط·آ¶ ط·آ§ط¸â€‍ط¸ث†ط·آ§ط·آ¬ط·آ¨ط·آ§ط·ع¾
                    <span aria-hidden="true">&larr;</span>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-1">
              <Card className="h-full rounded-xl bg-surface border border-border hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                      <HiOutlineExclamationCircle className="w-6 h-6" />
                    </div>
                    <CardTitle>ط·آ§ط¸â€‍ط·آ·ط¸â€‍ط·آ§ط·آ¨ ط·آ°ط¸ث†ط¸ث† ط·آ§ط¸â€‍ط·آ£ط·آ¯ط·آ§ط·طŒ ط·آ§ط¸â€‍ط¸â€¦ط¸â€ ط·آ®ط¸ظ¾ط·آ¶</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-text mb-2">{lowPerformanceCount}</p>
                  <p className="text-sm text-text-secondary mb-4">ط·آ·ط·آ§ط¸â€‍ط·آ¨ ط·آ¨ط·آ­ط·آ§ط·آ¬ط·آ© ط·آ¥ط¸â€‍ط¸â€° ط¸â€¦ط·ع¾ط·آ§ط·آ¨ط·آ¹ط·آ©</p>
                  <Link href="/teacher/students" className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors font-medium">
                    ط·آ¹ط·آ±ط·آ¶ ط·آ§ط¸â€‍ط·آ·ط¸â€‍ط·آ§ط·آ¨
                    <span aria-hidden="true">&larr;</span>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-1">
              <Card className="h-full rounded-xl bg-surface border border-border hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <CardTitle>ط·آ­ط·آ§ط¸â€‍ط·آ© ط·آ§ط¸â€‍ط¸â€ ط·آ¸ط·آ§ط¸â€¦</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">ط·آ§ط¸â€‍ط¸â€ ط·آ¸ط·آ§ط¸â€¦</span>
                    <Badge variant="success" dot size="sm">ط¸ظ¹ط·آ¹ط¸â€¦ط¸â€‍ ط·آ¨ط¸ئ’ط¸ظ¾ط·آ§ط·طŒط·آ©</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">ط·آ¢ط·آ®ط·آ± ط¸â€ ط·آ³ط·آ® ط·آ§ط·آ­ط·ع¾ط¸ظ¹ط·آ§ط·آ·ط¸ظ¹</span>
                    <span className="text-sm text-text font-medium">ط¸â€¦ط¸â€ ط·آ° ط¸ظ¹ط¸ث†ط¸â€¦ط¸ظ¹ط¸â€ </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">ط·آ§ط¸â€‍ط¸â€¦ط·آ³ط·آ§ط·آ­ط·آ© ط·آ§ط¸â€‍ط¸â€¦ط·آ³ط·ع¾ط·آ®ط·آ¯ط¸â€¦ط·آ©</span>
                      <span className="text-xs text-text-secondary">65%</span>
                    </div>
                    <Progress value={65} variant="primary" size="sm" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2">
              <Card className="rounded-xl bg-surface border border-border hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <CardTitle>ط·آ§ط¸â€‍ط·آ¥ط¸ظ¹ط·آ±ط·آ§ط·آ¯ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·آ´ط¸â€،ط·آ±ط¸ظ¹ط·آ©</CardTitle>
                  <Badge variant="primary" size="sm">2025</Badge>
                </CardHeader>
                <CardContent>
                  <div dir="ltr" className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockAnalytics.monthlyRevenue} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                        <defs>
                          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                        <XAxis dataKey="month" tick={{ fill: "#475569", fontSize: 11 }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                        <YAxis tick={{ fill: "#475569", fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{
                            background: "#FFFFFF",
                            border: "1px solid #E2E8F0",
                            borderRadius: "8px",
                            color: "#0F172A",
                            fontSize: "13px",
                          }}
                          formatter={(value: number | null) => { if (value == null) return []; return [formatCurrency(Number(value)), "ط·آ§ط¸â€‍ط·آ¥ط¸ظ¹ط·آ±ط·آ§ط·آ¯ط·آ§ط·ع¾"] }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2.5} fill="url(#revenueGradient)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-1">
              <Card className="rounded-xl bg-surface border border-border hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <CardTitle>ط·آ§ط¸â€‍ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€ ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط¸â€ڑط·آ§ط·آ¯ط¸â€¦ط·آ©</CardTitle>
                  <Link href="/teacher/exams" className="text-sm text-primary hover:text-primary-dark transition-colors">ط·آ¹ط·آ±ط·آ¶ ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍</Link>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingExams.map((exam) => {
                    const course = mockCourses.find((c) => c.id === exam.courseId)
                    return (
                      <div
                        key={exam.id}
                        onClick={() => router.push(`/teacher/exams/${exam.id}`)}
                        className="rounded-xl border border-border p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer bg-surface-secondary"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 shrink-0">
                            <HiOutlineCalendar className="w-5 h-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-text truncate">{exam.title}</p>
                            <p className="text-xs text-text-secondary mt-0.5">{course?.title || exam.courseId}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-text-tertiary">
                              <span className="flex items-center gap-1">
                                <HiOutlineCalendar className="w-3.5 h-3.5" />
                                {formatDate(exam.startDate)}
                              </span>
                              <span className="flex items-center gap-1">
                                <HiOutlineClock className="w-3.5 h-3.5" />
                                {formatDuration(exam.duration)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  {upcomingExams.length === 0 && (
                    <p className="text-sm text-text-tertiary text-center py-4">ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€ ط·آ§ط·ع¾ ط¸â€ڑط·آ§ط·آ¯ط¸â€¦ط·آ©</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2">
              <Card className="rounded-xl bg-surface border border-border hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <CardTitle>ط·آ¢ط·آ®ط·آ± ط·آ§ط¸â€‍ط¸â€ ط·آ´ط·آ§ط·آ·ط·آ§ط·ع¾</CardTitle>
                  <span className="text-xs text-text-tertiary">ط·ع¾ط·آ­ط·آ¯ط¸ظ¹ط·آ« ط·ع¾ط¸â€‍ط¸â€ڑط·آ§ط·آ¦ط¸ظ¹ ط¸ئ’ط¸â€‍ 10 ط·آ«ط¸ث†ط·آ§ط¸â€ ط¸ع†</span>
                </CardHeader>
                <CardContent className="space-y-1">
                  {activities.map((act, index) => {
                    const Icon = activityIcons[act.action] || HiOutlineCube
                    const colorClass = activityColors[act.action] || "text-slate-500 bg-slate-50 dark:bg-slate-900/20"
                    return (
                      <motion.div
                        key={act.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-secondary transition-colors"
                      >
                        <div className={cn("p-2 rounded-lg shrink-0", colorClass)}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-text">
                            <span className="font-medium">{act.userName}</span>
                            <span className="text-text-secondary"> {act.action} </span>
                            <span className="font-medium">{act.resource}</span>
                          </p>
                          <p className="text-xs text-text-tertiary mt-0.5">{formatRelativeTime(act.timestamp)}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-1">
              <Card className="rounded-xl bg-surface border border-border hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <CardTitle>ط·آ£ط·آ­ط·آ¯ط·آ« ط·آ§ط¸â€‍ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ط·آ§ط·ع¾</CardTitle>
                  <Link href="/teacher/students" className="text-sm text-primary hover:text-primary-dark transition-colors">ط·آ¹ط·آ±ط·آ¶ ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍</Link>
                </CardHeader>
                <CardContent className="space-y-2">
                  {recentEnrollments.map((enr) => (
                    <div key={enr.id} onClick={() => router.push(`/teacher/students/${enr.studentId}`)} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-secondary transition-colors">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-text truncate">{enr.studentName}</p>
                        <p className="text-xs text-text-tertiary truncate">{enr.courseName}</p>
                      </div>
                      <span className="text-xs text-text-tertiary shrink-0 mr-2">{formatRelativeTime(enr.enrolledAt)}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2">
              <Card className="rounded-xl bg-surface border border-border hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <CardTitle>ط·آ¥ط·آ¬ط·آ±ط·آ§ط·طŒط·آ§ط·ع¾ ط·آ³ط·آ±ط¸ظ¹ط·آ¹ط·آ©</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                    {quickActions.map((action) => {
                      const Icon = action.icon
                      return (
                        <Link key={action.label} href={action.href}>
                          <div className="flex flex-col items-center gap-3 p-5 rounded-xl bg-surface-secondary border border-border hover:border-primary/30 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
                            <div className={cn(action.color, "group-hover:scale-110 transition-transform duration-200")}>
                              <Icon className="w-7 h-7" />
                            </div>
                            <span className="text-xs text-text-secondary font-medium text-center leading-tight">{action.label}</span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

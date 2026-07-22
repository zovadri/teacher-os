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
} from "react-icons/hi"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const activityIcons: Record<string, React.ElementType> = {
  "تسجيل دخول": HiOutlineUserAdd,
  "إضافة طالب": HiOutlineUserAdd,
  "رفع فيديو": HiOutlineAcademicCap,
  "إنشاء امتحان": HiOutlineUsers,
  "إضافة واجب": HiOutlineAcademicCap,
  "تعديل كورس": HiOutlineAcademicCap,
  "حذف طالب": HiOutlineUsers,
  "إصدار شهادة": HiOutlineAcademicCap,
  "تسجيل اشتراك": HiOutlineCash,
  "تعديل صلاحيات": HiOutlineUsers,
}

export default function TeacherDashboard() {
  const router = useRouter()
  const { widgets } = useDashboardStore()
  const today = new Date()
  const dateStr = formatDate(today)

  const upcomingExams = useMemo(() => mockExams.filter((e) => e.status === "active").slice(0, 3), [])

  const [activities, setActivities] = useState(() => mockActivityLog.slice(0, 5))

  useEffect(() => {
    const interval = setInterval(() => {
      setActivities((prev) => {
        const shuffled = [...mockActivityLog].sort(() => det() - 0.5).slice(0, 5)
        return shuffled
      })
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "صباح الخير" : hour < 18 ? "مساء الخير" : "مساء الخير"

  return (
    <div className="min-h-screen bg-[#09090B]">
      <DashboardHeader
        title={`${greeting}، ${mockTeacher.name}`}
        subtitle={dateStr}
      />

      <div className="p-6 space-y-8">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/teacher/students"><StatsCard title="إجمالي الطلاب" value={mockStats.totalStudents} icon={HiOutlineUsers} color="primary" change={{ value: 12, isPositive: true }} subtitle="مقارنة بالشهر الماضي" delay={0} /></Link>
              <Link href="/teacher/students"><StatsCard title="الطلاب النشطون" value={mockStats.activeStudents} icon={HiOutlineAcademicCap} color="success" change={{ value: 8, isPositive: true }} subtitle="نسبة النشاط 78%" delay={0.1} /></Link>
              <Link href="/teacher/finance"><StatsCard title="الإيرادات الشهرية" value={formatCurrency(mockStats.monthlyRevenue)} icon={HiOutlineCash} color="warning" change={{ value: 15, isPositive: true }} subtitle="نمو مستمر" delay={0.2} /></Link>
              <Link href="/teacher/students"><StatsCard title="الطلاب الجدد" value={mockStats.newStudents} icon={HiOutlineUserAdd} color="info" change={{ value: 23, isPositive: true }} subtitle="هذا الشهر" delay={0.3} /></Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>الإيرادات الشهرية</CardTitle>
                  <Badge variant="primary" size="sm">2025</Badge>
                </CardHeader>
                <CardContent>
                  <div dir="ltr" className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockAnalytics.monthlyRevenue} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                        <defs>
                          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#5B5FF6" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="#5B5FF6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                        <XAxis dataKey="month" tick={{ fill: "#A1A1AA", fontSize: 11 }} axisLine={{ stroke: "#27272A" }} tickLine={false} />
                        <YAxis tick={{ fill: "#A1A1AA", fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{
                            background: "#111827",
                            border: "1px solid #27272A",
                            borderRadius: "12px",
                            color: "#FAFAFA",
                            fontSize: "13px",
                          }}
                          formatter={(value: number | null) => { if (value == null) return []; return [formatCurrency(Number(value)), "الإيرادات"] }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#5B5FF6" strokeWidth={2.5} fill="url(#revenueGradient)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>الامتحانات القادمة</CardTitle>
                  <Link href="/teacher/exams" className="text-sm text-primary hover:text-primary-light transition-colors">عرض الكل</Link>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingExams.map((exam) => {
                    const course = mockCourses.find((c) => c.id === exam.courseId)
                    return (
                      <div
                        key={exam.id}
                        onClick={() => router.push(`/teacher/exams/${exam.id}`)}
                        className="rounded-2xl border border-border p-4 hover:border-primary/50 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-text truncate">{exam.title}</p>
                            <p className="text-xs text-text-secondary mt-0.5">{course?.title || exam.courseId}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-text-tertiary">
                              <span>{formatDate(exam.startDate)}</span>
                              <span>{formatDuration(exam.duration)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  {upcomingExams.length === 0 && (
                    <p className="text-sm text-text-tertiary text-center py-4">لا توجد امتحانات قادمة</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>آخر النشاطات</CardTitle>
                  <span className="text-xs text-text-tertiary">تحديث تلقائي</span>
                </CardHeader>
                <CardContent className="space-y-1">
                  {activities.map((act, index) => {
                    const Icon = activityIcons[act.action] || HiOutlineUsers
                    return (
                      <motion.div
                        key={act.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-tertiary/50 transition-colors"
                      >
                        <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
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

            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>حالة النظام</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">النظام</span>
                    <Badge variant="success" dot size="sm">يعمل بكفاءة</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">آخر نسخ احتياطي</span>
                    <span className="text-sm text-text font-medium">منذ يومين</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">المساحة المستخدمة</span>
                      <span className="text-xs text-text-secondary">65%</span>
                    </div>
                    <Progress value={65} variant="primary" size="sm" />
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

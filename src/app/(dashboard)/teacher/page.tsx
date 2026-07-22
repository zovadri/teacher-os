"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useDashboardStore } from "@/lib/dashboard-store"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import { formatCurrency, formatRelativeTime, formatDate, formatDuration, det } from "@/lib/utils"
import {
  mockStats,
  mockTeacher,
  mockExams,
  mockCourses,
  mockActivityLog,
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

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
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
    <motion.div initial="hidden" animate="visible" className="space-y-6">

      <motion.div variants={item} className="bg-surface border border-border rounded-[20px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-text">
              {greeting}، {mockTeacher.name}
            </h1>
            <p className="text-sm text-text-secondary mt-1">{dateStr}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">5</p>
              <p className="text-xs text-text-secondary">حصص</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-success">3</p>
              <p className="text-xs text-text-secondary">امتحانات</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">12</p>
              <p className="text-xs text-text-secondary">واجبات</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: "إجمالي الطلاب", value: mockStats.totalStudents, icon: HiOutlineUsers, color: "text-primary", bg: "bg-primary/10", href: "/teacher/students" },
            { title: "الطلاب النشطون", value: mockStats.activeStudents, icon: HiOutlineAcademicCap, color: "text-success", bg: "bg-success/10", href: "/teacher/students" },
            { title: "الإيرادات الشهرية", value: formatCurrency(mockStats.monthlyRevenue), icon: HiOutlineCash, color: "text-warning", bg: "bg-warning/10", href: "/teacher/finance" },
            { title: "الطلاب الجدد", value: mockStats.newStudents, icon: HiOutlineUserAdd, color: "text-info", bg: "bg-info/10", href: "/teacher/students" },
          ].map((card) => (
            <Link key={card.title} href={card.href}>
              <div className="bg-surface border border-border rounded-[20px] p-5 transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_24px_rgba(99,102,241,0.1)] hover:border-primary/30">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${card.bg} ${card.color}`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-text-secondary">{card.title}</p>
                    <p className="text-2xl font-bold text-text mt-0.5">{card.value}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <motion.div variants={item} className="lg:col-span-2">
          <div className="bg-surface border border-border rounded-[20px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-semibold text-text">الإيرادات الشهرية</h3>
              <Badge variant="primary" size="sm">2025</Badge>
            </div>
            <div dir="ltr" className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockAnalytics.monthlyRevenue} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.06)" }} tickLine={false} />
                  <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", color: "#F8FAFC", fontSize: "13px" }}
                    formatter={(value: number | null) => { if (value == null) return []; return [formatCurrency(Number(value)), "الإيرادات"] }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2.5} fill="url(#revenueGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <div className="bg-surface border border-border rounded-[20px] p-5 h-full shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-semibold text-text">الامتحانات القادمة</h3>
              <Link href="/teacher/exams" className="text-xs text-primary hover:text-primary-light transition-colors">عرض الكل</Link>
            </div>
            <div className="space-y-2">
              {upcomingExams.map((exam) => {
                const course = mockCourses.find((c) => c.id === exam.courseId)
                return (
                  <div key={exam.id} onClick={() => router.push(`/teacher/exams/${exam.id}`)} className="rounded-xl border border-border p-3.5 hover:border-primary/30 hover:shadow-[0_2px_12px_rgba(99,102,241,0.08)] transition-all duration-200 cursor-pointer">
                    <p className="text-sm font-semibold text-text truncate">{exam.title}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{course?.title || exam.courseId}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-text-tertiary">
                      <span>{formatDate(exam.startDate)}</span>
                      <span>{formatDuration(exam.duration)}</span>
                    </div>
                  </div>
                )
              })}
              {upcomingExams.length === 0 && (
                <p className="text-sm text-text-tertiary text-center py-4">لا توجد امتحانات قادمة</p>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-2">
          <div className="bg-surface border border-border rounded-[20px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-semibold text-text">آخر النشاطات</h3>
              <span className="text-xs text-text-tertiary">تحديث تلقائي</span>
            </div>
            <div className="space-y-1">
              {activities.map((act, index) => {
                const Icon = activityIcons[act.action] || HiOutlineUsers
                return (
                  <motion.div key={act.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }} className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-tertiary/50 transition-colors">
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
            </div>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <div className="bg-surface border border-border rounded-[20px] p-5 h-full shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-semibold text-text">حالة النظام</h3>
            </div>
            <div className="space-y-4">
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
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

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

function Sparkline({ data, color = "#5B7CFF" }: { data: number[]; color?: string }) {
  if (!data || data.length < 2) return null
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 64; const h = 24
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * (h - 4) - 2
    return `${x},${y}`
  })
  const pathD = `M${points.join(" L")}`
  const fillD = `${pathD} L${w},${h} L0,${h} Z`
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      <defs>
        <linearGradient id={`sg-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillD} fill={`url(#sg-${color.replace("#", "")})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const sparklineData = [30, 45, 38, 52, 48, 62, 55, 68, 72, 65, 78, 82]

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

  const statCards = [
    { title: "إجمالي الطلاب", value: mockStats.totalStudents, icon: HiOutlineUsers, color: "#5B7CFF", module: "students", href: "/teacher/students", trend: { value: 12, isPositive: true } },
    { title: "الطلاب النشطون", value: mockStats.activeStudents, icon: HiOutlineAcademicCap, color: "#16C784", module: "finance", href: "/teacher/students", trend: { value: 8, isPositive: true } },
    { title: "الإيرادات الشهرية", value: formatCurrency(mockStats.monthlyRevenue), icon: HiOutlineCash, color: "#F5B301", module: "attendance", href: "/teacher/finance", trend: { value: 5, isPositive: false } },
    { title: "الطلاب الجدد", value: mockStats.newStudents, icon: HiOutlineUserAdd, color: "#8B5CF6", module: "exams", href: "/teacher/students", trend: { value: 22, isPositive: true } },
  ]

  return (
    <motion.div initial="hidden" animate="visible" className="space-y-6">

      <motion.div variants={item}>
        <div className="bg-card border border-border rounded-[24px] p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-text-secondary font-medium mb-1">{dateStr}</p>
              <h1 className="text-[28px] font-bold text-text leading-tight">
                {greeting}، {mockTeacher.name}
              </h1>
              <p className="text-text-secondary text-sm mt-2 max-w-lg">نظرة عامة على أداء منصتك اليوم. كل شيء يعمل بكفاءة.</p>
            </div>
            <div className="flex items-center gap-6 bg-card border border-border rounded-[16px] px-5 py-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary leading-none">5</p>
                <p className="text-xs text-text-secondary mt-1">حصص اليوم</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-success leading-none">3</p>
                <p className="text-xs text-text-secondary mt-1">امتحانات</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-warning leading-none">12</p>
                <p className="text-xs text-text-secondary mt-1">واجبات</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statCards.map((card, i) => (
            <Link key={card.title} href={card.href}>
              <div className="bg-card border border-border rounded-[24px] p-6 transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.03)] hover:-translate-y-0.5 hover:border-primary/20">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${card.color}15` }}>
                    <card.icon className="w-6 h-6" style={{ color: card.color }} />
                  </div>
                  <Sparkline data={sparklineData.slice(0, 6 + i * 2)} color={card.color} />
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">{card.title}</p>
                  <div className="flex items-end gap-3">
                    <p className="text-[28px] font-bold text-text leading-none">{card.value}</p>
                    {card.trend && (
                      <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full mb-0.5 ${card.trend.isPositive ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
                        <span>{card.trend.isPositive ? "↑" : "↓"}</span>
                        {Math.abs(card.trend.value)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <motion.div variants={item} className="lg:col-span-2">
          <div className="bg-card border border-border rounded-[24px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-text">الإيرادات الشهرية</h3>
                <p className="text-sm text-text-secondary">تطور الإيرادات خلال العام</p>
              </div>
              <Badge variant="primary" size="sm">2025</Badge>
            </div>
            <div dir="ltr" className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockAnalytics.monthlyRevenue} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="revenueGradient2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5B7CFF" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#5B7CFF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#5C6A8A", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.06)" }} tickLine={false} />
                  <YAxis tick={{ fill: "#5C6A8A", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#151D2F", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", color: "#FFFFFF", fontSize: "13px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
                    formatter={(value: number | null) => { if (value == null) return []; return [formatCurrency(Number(value)), "الإيرادات"] }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#5B7CFF" strokeWidth={2.5} fill="url(#revenueGradient2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <div className="bg-card border border-border rounded-[24px] p-6 h-full shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)]">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-semibold text-text">الامتحانات القادمة</h3>
                <p className="text-sm text-text-secondary">الامتحانات المجدولة</p>
              </div>
              <Link href="/teacher/exams" className="text-xs text-primary hover:text-primary-light transition-colors">عرض الكل</Link>
            </div>
            <div className="space-y-3">
              {upcomingExams.map((exam) => {
                const course = mockCourses.find((c) => c.id === exam.courseId)
                return (
                  <div key={exam.id} onClick={() => router.push(`/teacher/exams/${exam.id}`)} className="rounded-[16px] border border-border p-4 hover:border-primary/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer bg-card">
                    <p className="text-sm font-semibold text-text truncate">{exam.title}</p>
                    <p className="text-xs text-text-secondary mt-1">{course?.title || exam.courseId}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-text-tertiary">
                      <span>{formatDate(exam.startDate)}</span>
                      <span className="w-1 h-1 rounded-full bg-text-tertiary" />
                      <span>{formatDuration(exam.duration)}</span>
                    </div>
                  </div>
                )
              })}
              {upcomingExams.length === 0 && (
                <p className="text-sm text-text-tertiary text-center py-8">لا توجد امتحانات قادمة</p>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-2">
          <div className="bg-card border border-border rounded-[24px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)]">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-semibold text-text">آخر النشاطات</h3>
                <p className="text-sm text-text-secondary">نشاطات حديثة على المنصة</p>
              </div>
              <span className="text-xs text-text-tertiary">تحديث تلقائي</span>
            </div>
            <div className="space-y-1">
              {activities.map((act, index) => {
                const Icon = activityIcons[act.action] || HiOutlineUsers
                return (
                  <motion.div key={act.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }} className="flex items-start gap-3 p-3 rounded-[16px] hover:bg-card transition-colors">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
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
          <div className="bg-card border border-border rounded-[24px] p-6 h-full shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)]">
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-text">حالة النظام</h3>
              <p className="text-sm text-text-secondary">مؤشرات أداء المنصة</p>
            </div>
            <div className="space-y-5">
              <div className="flex items-center justify-between p-3 rounded-[16px] bg-card border border-border">
                <span className="text-sm text-text-secondary">النظام</span>
                <Badge variant="success" dot size="sm">يعمل بكفاءة</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-[16px] bg-card border border-border">
                <span className="text-sm text-text-secondary">آخر نسخ احتياطي</span>
                <span className="text-sm text-text font-medium">منذ يومين</span>
              </div>
              <div className="space-y-2">
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

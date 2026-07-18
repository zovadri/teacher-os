"use client"

import { useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  HiOutlineUsers,
  HiOutlineUserAdd,
  HiOutlineCash,
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineClipboardList,
  HiOutlineChartSquareBar,
  HiOutlinePlusCircle,
  HiOutlinePencilAlt,
  HiOutlineDocumentReport,
  HiOutlineCog,
  HiOutlineCalendar,
  HiOutlineSpeakerphone,
} from "react-icons/hi"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { StatsCard } from "@/components/ui/StatsCard"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Table } from "@/components/ui/Table"
import { useThemeStore } from "@/lib/store/useThemeStore"
import {
  mockStats,
  mockAnalytics,
  mockActivityLog,
  mockNotifications,
} from "@/lib/mock/data"
import { formatRelativeTime, formatCurrency } from "@/lib/utils"

const quickActions = [
  { icon: HiOutlinePlusCircle, label: "إضافة كورس", href: "/teacher/courses/create", color: "text-primary" },
  { icon: HiOutlineClipboardList, label: "إنشاء امتحان", href: "/teacher/exams/create", color: "text-warning" },
  { icon: HiOutlineUserAdd, label: "إضافة طالب", href: "/teacher/students", color: "text-info" },
  { icon: HiOutlineDocumentReport, label: "تقرير جديد", href: "/teacher/reports", color: "text-success" },
  { icon: HiOutlinePencilAlt, label: "إضافة واجب", href: "/teacher/homework", color: "text-purple-500" },
  { icon: HiOutlineCog, label: "إعدادات", href: "/teacher/settings", color: "text-text-secondary" },
]

const activityTypeConfig: Record<string, { color: string }> = {
  "تسجيل دخول": { color: "text-info" },
  "إضافة طالب": { color: "text-success" },
  "رفع فيديو": { color: "text-primary" },
  "إنشاء امتحان": { color: "text-warning" },
  "إضافة واجب": { color: "text-purple-500" },
  "تعديل كورس": { color: "text-primary" },
  "حذف طالب": { color: "text-error" },
  "إصدار شهادة": { color: "text-success" },
  "تسجيل اشتراك": { color: "text-warning" },
  "تعديل صلاحيات": { color: "text-info" },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function TeacherDashboard() {
  const { theme } = useThemeStore()
  const isDark = theme === "dark"
  const textColor = isDark ? "#CBD5E1" : "#475569"
  const gridColor = isDark ? "#334155" : "#E2E8F0"

  const recentActivity = useMemo(() => mockActivityLog.slice(0, 6), [])
  const latestNotifications = useMemo(() => mockNotifications.slice(0, 5), [])
  const topCourses = useMemo(() => mockAnalytics.coursePerformance.slice(0, 5), [])

  const courseColumns = useMemo(
    () => [
      { key: "courseName", header: "اسم الكورس", render: (item: any) => <span className="font-medium text-text">{item.courseName}</span> },
      {
        key: "completionRate",
        header: "الإنجاز",
        render: (item: any) => (
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 bg-surface-tertiary rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${item.completionRate}%` }} />
            </div>
            <span className="text-xs text-text-secondary">{item.completionRate}%</span>
          </div>
        ),
      },
      { key: "avgGrade", header: "المعدل", render: (item: any) => <Badge variant={item.avgGrade >= 85 ? "success" : item.avgGrade >= 70 ? "warning" : "error"}>{item.avgGrade}%</Badge> },
    ],
    []
  )

  return (
    <div className="min-h-screen">
      <DashboardHeader title="لوحة التحكم" subtitle="مرحباً أحمد، هذه نظرة سريعة على منصتك" />

      <div className="p-4 md:p-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard title="إجمالي الطلاب" value={mockStats.totalStudents} icon={HiOutlineUsers} color="primary" change={{ value: 12, isPositive: true }} subtitle="مقارنة بالشهر الماضي" />
            <StatsCard title="الطلاب النشطون" value={mockStats.activeStudents} icon={HiOutlineAcademicCap} color="success" change={{ value: 8, isPositive: true }} subtitle="نسبة النشاط 78%" />
            <StatsCard title="الإيرادات الشهرية" value={formatCurrency(mockStats.monthlyRevenue)} icon={HiOutlineCash} color="warning" change={{ value: 15, isPositive: true }} subtitle="نمو مستمر" />
            <StatsCard title="الطلاب الجدد" value={mockStats.newStudents} icon={HiOutlineUserAdd} color="info" change={{ value: 23, isPositive: true }} subtitle="هذا الشهر" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>الإيرادات الشهرية</CardTitle>
                  <Badge variant="primary" size="sm">
                    <HiOutlineCalendar className="w-3 h-3 ml-1" />
                    2025
                  </Badge>
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
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                        <XAxis dataKey="month" tick={{ fill: textColor, fontSize: 11 }} axisLine={{ stroke: gridColor }} tickLine={false} />
                        <YAxis tick={{ fill: textColor, fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{
                            background: isDark ? "#1E293B" : "#FFFFFF",
                            border: `1px solid ${gridColor}`,
                            borderRadius: "8px",
                            color: isDark ? "#F8FAFC" : "#0F172A",
                            fontSize: "13px",
                          }}
                          formatter={(value: any) => { if (value == null) return []; return [formatCurrency(Number(value)), "الإيرادات"]; }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2.5} fill="url(#revenueGradient)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>نمو الطلاب</CardTitle>
                  <Badge variant="success" size="sm">+{mockAnalytics.studentGrowth[mockAnalytics.studentGrowth.length - 1].newStudents} جديد</Badge>
                </CardHeader>
                <CardContent>
                  <div dir="ltr" className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockAnalytics.studentGrowth} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                        <XAxis dataKey="month" tick={{ fill: textColor, fontSize: 11 }} axisLine={{ stroke: gridColor }} tickLine={false} interval={1} />
                        <YAxis tick={{ fill: textColor, fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{
                            background: isDark ? "#1E293B" : "#FFFFFF",
                            border: `1px solid ${gridColor}`,
                            borderRadius: "8px",
                            color: isDark ? "#F8FAFC" : "#0F172A",
                            fontSize: "13px",
                          }}
                        />
                        <Bar dataKey="total" fill="#6366F1" radius={[4, 4, 0, 0]} name="إجمالي الطلاب" />
                        <Bar dataKey="newStudents" fill="#10B981" radius={[4, 4, 0, 0]} name="الطلاب الجدد" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>آخر النشاطات</CardTitle>
                  <Link href="/teacher/activity" className="text-sm text-primary hover:text-primary-dark transition-colors">عرض الكل</Link>
                </CardHeader>
                <CardContent className="space-y-1">
                  {recentActivity.map((activity, index) => {
                    const config = activityTypeConfig[activity.action] || { color: "text-text-secondary" }
                    return (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-secondary transition-colors"
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${config.color} bg-current/10`}>
                          <HiOutlineSpeakerphone className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-text leading-snug">
                            <span className="font-medium">{activity.userName}</span>
                            {" "}{activity.action}
                            {" "}في <span className="font-medium">{activity.resource}</span>
                          </p>
                          <p className="text-xs text-text-tertiary mt-0.5">{formatRelativeTime(activity.timestamp)}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>الإشعارات</CardTitle>
                  <Link href="/teacher/notifications" className="text-sm text-primary hover:text-primary-dark transition-colors">عرض الكل</Link>
                </CardHeader>
                <CardContent className="space-y-1">
                  {latestNotifications.map((notif, index) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${!notif.read ? "bg-primary-50/50 dark:bg-primary-900/10" : "hover:bg-surface-secondary"}`}
                    >
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!notif.read ? "bg-primary" : "bg-transparent"}`} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-text">{notif.title}</p>
                        <p className="text-xs text-text-tertiary mt-0.5">{notif.message}</p>
                        <p className="text-xs text-text-tertiary/70 mt-0.5">{formatRelativeTime(notif.createdAt)}</p>
                      </div>
                      <Badge variant={notif.type as any} size="sm" dot />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>أداء الكورسات</CardTitle>
                  <Link href="/teacher/courses" className="text-sm text-primary hover:text-primary-dark transition-colors">جميع الكورسات</Link>
                </CardHeader>
                <CardContent>
                  <Table
                    columns={courseColumns}
                    data={topCourses}
                    onRowClick={(item) => window.location.href = `/teacher/courses/${item.courseId}`}
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>إجراءات سريعة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {quickActions.map((action) => {
                      const Icon = action.icon
                      return (
                        <Link key={action.label} href={action.href}>
                          <div className="flex flex-col items-center gap-3 p-5 rounded-xl bg-surface-secondary border border-border hover:border-primary/30 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
                            <div className={`${action.color} group-hover:scale-110 transition-transform duration-200`}>
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

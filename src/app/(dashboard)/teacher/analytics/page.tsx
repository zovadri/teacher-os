"use client"

import { useState, useEffect, useMemo, Fragment } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineChartSquareBar, HiOutlineTrendingUp, HiOutlineUsers,
  HiOutlineCash, HiOutlineDownload, HiOutlineDocumentReport,
  HiOutlineAcademicCap, HiOutlineStar, HiOutlineVideoCamera,
  HiOutlineClipboardList, HiOutlineSearch, HiOutlineFilter,
  HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineCurrencyDollar,
  HiOutlinePresentationChartLine, HiOutlineExclamationCircle,
  HiOutlineBell, HiOutlineClock,
} from "react-icons/hi"
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { PageHeader } from "@/components/ui/PageHeader"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Table } from "@/components/ui/Table"
import { Tabs, TabPanel } from "@/components/ui/Tabs"
import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select"
import { Skeleton, StatsSkeleton, TableSkeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { mockAnalyticsDetailed } from "@/lib/mock/data"
import { formatCurrency, cn, det } from "@/lib/utils"

const colors = {
  primary: "#6366F1",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
  cyan: "#06B6D4",
  purple: "#8B5CF6",
  pink: "#EC4899",
}

const PIE_COLORS = [colors.primary, colors.success, colors.warning, colors.cyan, colors.purple, colors.pink]

const tabConfig = [
  { id: "overview", label: "نظرة عامة", icon: HiOutlinePresentationChartLine },
  { id: "courses", label: "تحليل الكورسات", icon: HiOutlineAcademicCap },
  { id: "videos", label: "تحليل الفيديو", icon: HiOutlineVideoCamera },
  { id: "exams", label: "تحليل الامتحانات", icon: HiOutlineClipboardList },
  { id: "financial", label: "التقارير المالية", icon: HiOutlineCurrencyDollar },
]

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "error" | "info" }> = {
  active: { label: "نشط", variant: "success" },
  draft: { label: "مسودة", variant: "warning" },
  closed: { label: "مغلق", variant: "error" },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

function ChartContainer({ children, dir = "ltr" }: { children: React.ReactNode; dir?: string }) {
  return <div dir={dir} className="h-72">{children}</div>
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-surface border border-border rounded-xl p-3 shadow-lg text-sm space-y-1">
      <p className="font-semibold text-text mb-1">{label}</p>
      {payload.map((entry: { value: number; name: string }, idx: number) => (
        <p key={idx} className="text-text-secondary">
          <span className="inline-block w-2.5 h-2.5 rounded-full ml-1.5" style={{ backgroundColor: entry.color }} />
          {entry.name}: <span className="font-medium text-text">{formatter ? formatter(entry.value) : entry.value}</span>
        </p>
      ))}
    </div>
  )
}

function RevenueCustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-surface border border-border rounded-xl p-3 shadow-lg text-sm space-y-1">
      <p className="font-semibold text-text mb-1">{label}</p>
      {payload.map((entry: { value: number; name: string }, idx: number) => (
        <p key={idx} className="text-text-secondary">
          <span className="inline-block w-2.5 h-2.5 rounded-full ml-1.5" style={{ backgroundColor: entry.color }} />
          {entry.name}: <span className="font-medium text-text">{formatCurrency(entry.value)}</span>
        </p>
      ))}
    </div>
  )
}

const recentActivity = [
  { action: "تسجيل طالب جديد", user: "أحمد محمد", time: "منذ 5 دقائق", type: "student" },
  { action: "إتمام امتحان", user: "مريم علي", time: "منذ 15 دقيقة", type: "exam" },
  { action: "اشتراك جديد", user: "خالد حسن", time: "منذ 32 دقيقة", type: "subscription" },
  { action: "إضافة كورس", user: "نورا أحمد", time: "منذ ساعة", type: "course" },
  { action: "تقييم جديد", user: "سارة محمود", time: "منذ ساعتين", type: "rating" },
  { action: "تحميل فيديو", user: "أحمد محمد", time: "منذ 3 ساعات", type: "video" },
  { action: "إصدار شهادة", user: "محمد سامي", time: "منذ 4 ساعات", type: "certificate" },
  { action: "إرسال إشعار", user: "النظام", time: "منذ 5 ساعات", type: "notification" },
]

const activityTypeColors: Record<string, string> = {
  student: "text-primary bg-primary-100 dark:bg-primary-900/30",
  exam: "text-success bg-emerald-100 dark:bg-emerald-900/30",
  subscription: "text-warning bg-amber-100 dark:bg-amber-900/30",
  course: "text-info bg-blue-100 dark:bg-blue-900/30",
  rating: "text-purple-600 bg-purple-100 dark:bg-purple-900/30",
  video: "text-cyan-600 bg-cyan-100 dark:bg-cyan-900/30",
  certificate: "text-pink-600 bg-pink-100 dark:bg-pink-900/30",
  notification: "text-text-secondary bg-surface-tertiary",
}

const activityIcons: Record<string, React.ElementType> = {
  student: HiOutlineUsers,
  exam: HiOutlineClipboardList,
  subscription: HiOutlineCash,
  course: HiOutlineAcademicCap,
  rating: HiOutlineStar,
  video: HiOutlineVideoCamera,
  certificate: HiOutlineDocumentReport,
  notification: HiOutlineBell,
}

function ActivityIcon({ type }: { type: string }) {
  const Icon = activityIcons[type] || HiOutlineExclamationCircle
  return (
    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", activityTypeColors[type] || "bg-surface-tertiary text-text-secondary")}>
      <Icon className="w-4 h-4" />
    </div>
  )
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const data = mockAnalyticsDetailed

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <ErrorState title="حدث خطأ ظپظٹ تحميل التحليلات" message="يرجى المحاولة مرة أخرى" onRetry={() => setError(null)} />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
        <StatsSkeleton count={6} />
        <div className="grid lg:grid-cols-2 gap-6">
          <Skeleton variant="card" className="h-80" />
          <Skeleton variant="card" className="h-80" />
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader title="التحليلات المتقدمة" description="إحصائيات وتحليلات شاملة لأداء المنصة" />

      <Tabs tabs={tabConfig}>
        {(activeTab) => (
          <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <TabPanel id="overview" activeTab={activeTab}>
              <OverviewSection data={data} />
            </TabPanel>
            <TabPanel id="courses" activeTab={activeTab}>
              <CourseAnalyticsSection data={data} />
            </TabPanel>
            <TabPanel id="videos" activeTab={activeTab}>
              <VideoAnalyticsSection data={data} />
            </TabPanel>
            <TabPanel id="exams" activeTab={activeTab}>
              <ExamAnalyticsSection data={data} />
            </TabPanel>
            <TabPanel id="financial" activeTab={activeTab}>
              <FinancialReportsSection data={data} />
            </TabPanel>
          </motion.div>
        )}
      </Tabs>
    </div>
  )
}

function OverviewSection({ data }: { data: typeof mockAnalyticsDetailed }) {
  const { overview } = data

  const statsCards = [
    { title: "إجمالي الطلاب", value: overview.totalStudents, icon: HiOutlineUsers, color: "primary" as const, change: { value: overview.studentGrowth, isPositive: true } },
    { title: "إجمالي الإيرادات", value: formatCurrency(overview.totalRevenue), icon: HiOutlineCash, color: "success" as const, change: { value: overview.revenueGrowth, isPositive: true } },
    { title: "إجمالي الكورسات", value: overview.totalCourses, icon: HiOutlineAcademicCap, color: "info" as const },
    { title: "إجمالي الامتحانات", value: overview.totalExams, icon: HiOutlineClipboardList, color: "warning" as const },
    { title: "معدل الإكمال", value: `%${overview.completionRate}`, icon: HiOutlineTrendingUp, color: "success" as const },
    { title: "متوسط التقييم", value: overview.averageRating.toFixed(1), icon: HiOutlineStar, color: "warning" as const },
  ]

  const monthlyRevenueData = data.financialReports.map(r => ({ month: r.month, "الإيرادات": r.revenue }))
  const studentGrowthData = data.monthlyRevenue.map((_, i) => ({
    month: data.financialReports[i]?.month || `شهر ${i + 1}`,
    newStudents: Math.floor(det() * 40) + 20 + i * 3,
  }))

  const topCourses = [...data.courseAnalytics]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statsCards.map((stat, idx) => (
          <StatsCard key={idx} {...stat} delay={idx * 0.05} />
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>الإيرادات الشهرية</CardTitle>
              <CardDescription>تطور الإيرادات خلال العام</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="success" size="md">
                  <span className="flex items-center gap-1">
                    <HiOutlineTrendingUp className="w-3.5 h-3.5" />
                    نمو بنسبة {overview.revenueGrowth}%
                  </span>
                </Badge>
              </div>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyRevenueData}>
                    <defs>
                      <linearGradient id="overviewRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                    <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <Tooltip content={<RevenueCustomTooltip />} />
                    <Area type="monotone" dataKey="الإيرادات" stroke={colors.primary} fill="url(#overviewRevenueGrad)" strokeWidth={2} name="الإيرادات" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>نمو الطلاب</CardTitle>
              <CardDescription>عدد الطلاب الجدد شهرياً</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={studentGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                    <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="newStudents" fill={colors.success} radius={[4, 4, 0, 0]} name="طلاب جدد" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>أفضل 5 كورسات بالإيرادات</CardTitle>
              <CardDescription>الكورسات الأعلى تحقيقاً للإيرادات</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topCourses} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
                    <XAxis type="number" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <YAxis dataKey="name" type="category" width={130} tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<RevenueCustomTooltip />} />
                    <Bar dataKey="revenue" fill={colors.primary} radius={[0, 4, 4, 0]} name="الإيرادات" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>النشاطات الأخيرة</CardTitle>
              <CardDescription>أحدث النشاطات على المنصة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-secondary transition-colors"
                  >
                    <ActivityIcon type={activity.type} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text truncate">{activity.action}</p>
                      <p className="text-xs text-text-tertiary">{activity.user} ط¢آ· {activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

function CourseAnalyticsSection({ data }: { data: typeof mockAnalyticsDetailed }) {
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set())

  const filteredCourses = useMemo(() => {
    let result = data.courseAnalytics
    if (statusFilter !== "all") {
      result = result.filter(c => c.status === statusFilter)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      result = result.filter(c => c.name.toLowerCase().includes(q))
    }
    return result
  }, [data.courseAnalytics, statusFilter, searchQuery])

  const toggleExpand = (id: string) => {
    const next = new Set(expandedCourses)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setExpandedCourses(next)
  }

  const handleExportCSV = () => {
    const headers = "اسم الكورس,المشتركين,الإيرادات,متوسط التقييم,نسبة الإكمال,عدد الدروس,الحالة"
    const rows = filteredCourses.map(c =>
      `${c.name},${c.enrolled},${c.revenue},${c.rating},%${c.completionRate},${c.lessons},${statusConfig[c.status]?.label || c.status}`
    )
    const csv = [headers, ...rows].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "course-analytics.csv"
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const chapterStats = [
    { name: "المقدمة", students: 235, avgGrade: 82, completionRate: 90 },
    { name: "الأساسيات", students: 228, avgGrade: 78, completionRate: 85 },
    { name: "المستوى المتقدم", students: 210, avgGrade: 74, completionRate: 72 },
    { name: "التطبيقات", students: 195, avgGrade: 80, completionRate: 78 },
    { name: "المراجعة", students: 180, avgGrade: 88, completionRate: 92 },
  ]

  const columns = [
    { key: "name", header: "اسم الكورس" },
    { key: "enrolled", header: "المشتركين" },
    { key: "revenue", header: "الإيرادات", render: (c: Record<string, unknown>) => formatCurrency(c.revenue) },
    { key: "rating", header: "متوسط التقييم", render: (c: Record<string, unknown>) => `${c.rating}/5` },
    { key: "completionRate", header: "نسبة الإكمال", render: (c: Record<string, unknown>) => `%${c.completionRate}` },
    { key: "lessons", header: "عدد الدروس" },
    { key: "status", header: "الحالة", render: (c: Record<string, unknown>) => {
      const config = statusConfig[c.status]
      return config ? <Badge variant={config.variant}>{config.label}</Badge> : <Badge>{c.status}</Badge>
    }},
  ]

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-xs">
          <HiOutlineSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            placeholder="بحث عن كورس..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-border rounded-lg pr-10 px-3.5 py-2.5 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <HiOutlineFilter className="w-4 h-4 text-text-secondary" />
          {["all", "active", "draft", "closed"].map((status) => (
            <button type="button"
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-lg transition-all",
                statusFilter === status
                  ? "bg-primary text-white"
                  : "bg-surface-secondary text-text-secondary hover:text-text border border-border"
              )}
            >
              {status === "all" ? "جميع" : statusConfig[status]?.label || status}
            </button>
          ))}
        </div>
        <Button variant="outline" size="sm" leftIcon={<HiOutlineDownload className="w-4 h-4" />} onClick={handleExportCSV}>
          تصدير CSV
        </Button>
      </motion.div>

      <motion.div variants={itemVariants} className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-secondary border-b border-border">
              <th className="w-8 px-2 py-3" />
              {columns.map((col) => (
                <th key={col.key} className={cn("text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap", col.className)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-12 text-text-tertiary">
                  <EmptyState title="لا توجد كورسات" description="لا توجد نتائج تطابق معايير البحث" withBackground={false} />
                </td>
              </tr>
            ) : (
              filteredCourses.map((course, idx) => (
                <Fragment key={course.id}>
                  <tr
                    onClick={() => toggleExpand(course.id)}
                    className="border-b border-border last:border-0 transition-colors hover:bg-surface-secondary cursor-pointer"
                  >
                    <td className="px-2 py-3 text-text-tertiary">
                      {expandedCourses.has(course.id) ? (
                        <HiOutlineChevronUp className="w-4 h-4" />
                      ) : (
                        <HiOutlineChevronDown className="w-4 h-4" />
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-text">{course.name}</td>
                    <td className="px-4 py-3 text-text">{course.enrolled.toLocaleString("ar-EG")}</td>
                    <td className="px-4 py-3 text-text">{formatCurrency(course.revenue)}</td>
                    <td className="px-4 py-3 text-text">{course.rating}/5</td>
                    <td className="px-4 py-3 text-text">%{course.completionRate}</td>
                    <td className="px-4 py-3 text-text">{course.lessons}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusConfig[course.status]?.variant || "neutral"} size="sm">
                        {statusConfig[course.status]?.label || course.status}
                      </Badge>
                    </td>
                  </tr>
                  {expandedCourses.has(course.id) && (
                    <tr className="bg-surface-secondary/50">
                      <td colSpan={columns.length + 1} className="p-4">
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-3">
                          <h4 className="text-sm font-semibold text-text mb-2">إحصائيات الفصول الدراسية</h4>
                          <div className="overflow-x-auto rounded-lg border border-border">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="bg-surface border-b border-border">
                                  <th className="text-right px-4 py-2 font-semibold text-text-secondary">اسم الفصل</th>
                                  <th className="text-right px-4 py-2 font-semibold text-text-secondary">الطلاب</th>
                                  <th className="text-right px-4 py-2 font-semibold text-text-secondary">متوسط الدرجات</th>
                                  <th className="text-right px-4 py-2 font-semibold text-text-secondary">نسبة الإكمال</th>
                                </tr>
                              </thead>
                              <tbody>
                                {chapterStats.map((ch, ci) => (
                                  <tr key={ci} className="border-b border-border last:border-0">
                                    <td className="px-4 py-2 text-text">{ch.name}</td>
                                    <td className="px-4 py-2 text-text">{ch.students}</td>
                                    <td className="px-4 py-2 text-text">{ch.avgGrade}</td>
                                    <td className="px-4 py-2">
                                      <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1.5 bg-surface-tertiary rounded-full overflow-hidden">
                                          <div className="h-full bg-primary rounded-full" style={{ width: `${ch.completionRate}%` }} />
                                        </div>
                                        <span className="text-xs text-text-secondary">%{ch.completionRate}</span>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  )
}

function VideoAnalyticsSection({ data }: { data: typeof mockAnalyticsDetailed }) {
  const [sortField, setSortField] = useState<string>("views")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")

  const totalViews = data.videoAnalytics.reduce((s, v) => s + v.views, 0)
  const avgCompletion = Math.round(data.videoAnalytics.reduce((s, v) => s + v.completionRate, 0) / data.videoAnalytics.length)
  const parseTime = (t: string) => {
    const [m, sec] = t.split(":").map(Number)
    return m * 60 + (sec || 0)
  }
  const avgWatchMinutes = Math.round(
    data.videoAnalytics.reduce((s, v) => s + parseTime(v.avgWatchTime), 0) / data.videoAnalytics.length / 60 * 10
  ) / 10

  const sortedVideos = useMemo(() => {
    return [...data.videoAnalytics].sort((a, b) => {
      const aVal = a[sortField as keyof typeof a]
      const bVal = b[sortField as keyof typeof b]
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "desc" ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal)
      }
      return sortDir === "desc" ? (bVal as number) - (aVal as number) : (aVal as number) - (bVal as number)
    })
  }, [data.videoAnalytics, sortField, sortDir])

  const top5 = useMemo(() => [...data.videoAnalytics].sort((a, b) => b.views - a.views).slice(0, 5), [data.videoAnalytics])
  const bottom5 = useMemo(() => [...data.videoAnalytics].sort((a, b) => a.views - b.views).slice(0, 5), [data.videoAnalytics])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDir(d => d === "desc" ? "asc" : "desc")
    } else {
      setSortField(field)
      setSortDir("desc")
    }
  }

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return <HiOutlineChevronDown className="w-3 h-3 opacity-30" />
    return sortDir === "desc" ? <HiOutlineChevronDown className="w-3 h-3" /> : <HiOutlineChevronUp className="w-3 h-3" />
  }

  const videoColumns = [
    { key: "name", header: "اسم الفيديو" },
    { key: "course", header: "الكورس" },
    { key: "views", header: "المشاهدات", sortable: true },
    { key: "avgWatchTime", header: "وقت المشاهدة" },
    { key: "completionRate", header: "نسبة الإكمال" },
    { key: "likes", header: "الإعجابات" },
    { key: "comments", header: "التعليقات" },
    { key: "uploadDate", header: "تاريخ الرفع" },
  ]

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="إجمالي الفيديوهات" value={data.videoAnalytics.length} icon={HiOutlineVideoCamera} color="primary" />
        <StatsCard title="إجمالي المشاهدات" value={totalViews.toLocaleString("ar-EG")} icon={HiOutlineTrendingUp} color="success" change={{ value: 15, isPositive: true }} />
        <StatsCard title="متوسط وقت المشاهدة" value={`${avgWatchMinutes} د`} icon={HiOutlineClock} color="info" />
        <StatsCard title="معدل الإكمال" value={`%${avgCompletion}`} icon={HiOutlineAcademicCap} color="warning" />
      </motion.div>

      <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>الأكثر مشاهدة</CardTitle>
            <CardDescription>أفضل 5 فيديوهات من حيث المشاهدات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {top5.map((video, idx) => (
                <div key={video.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-secondary transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text truncate">{video.name}</p>
                    <p className="text-xs text-text-tertiary truncate">{video.course}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-text">{video.views.toLocaleString("ar-EG")}</p>
                    <p className="text-xs text-text-tertiary">مشاهدة</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>الأقل مشاهدة</CardTitle>
            <CardDescription>أقل 5 فيديوهات من حيث المشاهدات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bottom5.map((video, idx) => (
                <div key={video.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-secondary transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-surface-tertiary flex items-center justify-center text-text-tertiary text-xs font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text truncate">{video.name}</p>
                    <p className="text-xs text-text-tertiary truncate">{video.course}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-text">{video.views.toLocaleString("ar-EG")}</p>
                    <p className="text-xs text-text-tertiary">مشاهدة</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-secondary border-b border-border">
              {videoColumns.map((col) => (
                <th
                  key={col.key}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  className={cn(
                    "text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap",
                    col.sortable && "cursor-pointer hover:text-text select-none"
                  )}
                >
                  <span className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && <SortIcon field={col.key} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedVideos.length === 0 ? (
              <tr>
                <td colSpan={videoColumns.length} className="text-center py-12 text-text-tertiary">
                  <EmptyState title="لا توجد فيديوهات" withBackground={false} />
                </td>
              </tr>
            ) : (
              sortedVideos.map((video) => (
                <tr key={video.id} className="border-b border-border last:border-0 hover:bg-surface-secondary transition-colors">
                  <td className="px-4 py-3 font-medium text-text">{video.name}</td>
                  <td className="px-4 py-3 text-text-secondary">{video.course}</td>
                  <td className="px-4 py-3 text-text">{video.views.toLocaleString("ar-EG")}</td>
                  <td className="px-4 py-3 text-text">{video.avgWatchTime}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-surface-tertiary rounded-full overflow-hidden">
                        <div className="h-full bg-success rounded-full" style={{ width: `${video.completionRate}%` }} />
                      </div>
                      <span className="text-xs text-text-secondary">%{video.completionRate}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text">{video.likes}</td>
                  <td className="px-4 py-3 text-text">{video.comments}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{video.uploadDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  )
}

function ExamAnalyticsSection({ data }: { data: typeof mockAnalyticsDetailed }) {
  const [courseFilter, setCourseFilter] = useState("all")
  const { examAnalytics } = data

  const courseOptions = useMemo(() => {
    const courses = [...new Set(examAnalytics.map(e => e.course))]
    return [{ value: "all", label: "جميع الكورسات" }, ...courses.map(c => ({ value: c, label: c }))]
  }, [examAnalytics])

  const filteredExams = useMemo(() => {
    if (courseFilter === "all") return examAnalytics
    return examAnalytics.filter(e => e.course === courseFilter)
  }, [examAnalytics, courseFilter])

  const totalExams = examAnalytics.length
  const totalAttempts = examAnalytics.reduce((s, e) => s + e.attempts, 0)
  const avgGradeAll = Math.round(examAnalytics.reduce((s, e) => s + e.avgGrade, 0) / examAnalytics.length)
  const avgPassRate = Math.round(examAnalytics.reduce((s, e) => s + e.passRate, 0) / examAnalytics.length)

  const passFailData = [
    { name: "ناجح", value: avgPassRate },
    { name: "راسب", value: 100 - avgPassRate },
  ]

  const examColumns = [
    { key: "name", header: "اسم الامتحان" },
    { key: "course", header: "الكورس" },
    { key: "students", header: "عدد الطلاب" },
    { key: "avgGrade", header: "متوسط الدرجة" },
    { key: "highestGrade", header: "أعلى درجة" },
    { key: "lowestGrade", header: "أدنى درجة" },
    { key: "passRate", header: "نسبة النجاح", render: (e: Record<string, unknown>) => (
      <div className="flex items-center gap-2">
        <div className="w-12 h-1.5 bg-surface-tertiary rounded-full overflow-hidden">
          <div className={cn("h-full rounded-full", e.passRate >= 80 ? "bg-success" : e.passRate >= 60 ? "bg-warning" : "bg-error")} style={{ width: `${e.passRate}%` }} />
        </div>
        <span className="text-xs text-text-secondary">%{e.passRate}</span>
      </div>
    )},
    { key: "attempts", header: "عدد المحاولات" },
  ]

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="إجمالي الامتحانات" value={totalExams} icon={HiOutlineClipboardList} color="primary" />
        <StatsCard title="إجمالي المحاولات" value={totalAttempts.toLocaleString("ar-EG")} icon={HiOutlineTrendingUp} color="info" change={{ value: 12, isPositive: true }} />
        <StatsCard title="متوسط الدرجات" value={avgGradeAll} icon={HiOutlineAcademicCap} color="success" />
        <StatsCard title="معدل النجاح" value={`%${avgPassRate}`} icon={HiOutlineStar} color="warning" />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>مقارنة نتائج الامتحانات</CardTitle>
              <CardDescription>متوسط الدرجات لكل امتحان</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredExams} margin={{ top: 10, right: 10, left: 10, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} angle={-20} textAnchor="end" height={80} />
                    <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend formatter={(value) => value === "avgGrade" ? "متوسط الدرجة" : value === "passRate" ? "نسبة النجاح" : value} />
                    <Bar dataKey="avgGrade" fill={colors.primary} radius={[4, 4, 0, 0]} name="avgGrade" />
                    <Bar dataKey="passRate" fill={colors.success} radius={[4, 4, 0, 0]} name="passRate" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>معدل النجاح العام</CardTitle>
              <CardDescription>نسبة الناجحين مقابل الراسبين</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-72" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={passFailData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={5} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {passFailData.map((entry, idx) => (
                        <Cell key={idx} fill={idx === 0 ? colors.success : colors.error} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="flex items-center gap-3">
        <HiOutlineFilter className="w-4 h-4 text-text-secondary" />
        <div className="w-56">
          <Select options={courseOptions} value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)} />
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Table columns={examColumns} data={filteredExams} emptyMessage="لا توجد امتحانات متطابقة" />
      </motion.div>
    </motion.div>
  )
}

function FinancialReportsSection({ data }: { data: typeof mockAnalyticsDetailed }) {
  const [dateRange, setDateRange] = useState("year")
  const [customFrom, setCustomFrom] = useState("")
  const [customTo, setCustomTo] = useState("")

  const { financialReports, revenueBreakdown } = data

  const totalRevenue = financialReports.reduce((s, r) => s + r.revenue, 0)
  const totalExpenses = financialReports.reduce((s, r) => s + r.expenses, 0)
  const totalNetProfit = financialReports.reduce((s, r) => s + r.netProfit, 0)
  const expectedRevenue = Math.round(totalRevenue * 1.15)
  const avgGrowth = financialReports.length > 1
    ? financialReports.slice(1).reduce((s, r) => s + r.growth, 0) / (financialReports.length - 1)
    : 0

  const filteredReports = useMemo(() => {
    if (dateRange === "all") return financialReports
    const count = dateRange === "month" ? 1 : dateRange === "quarter" ? 3 : dateRange === "half" ? 6 : dateRange === "year" ? 12 : financialReports.length
    return financialReports.slice(-count)
  }, [financialReports, dateRange])

  const reportColumns = [
    { key: "month", header: "الشهر" },
    { key: "revenue", header: "الإيرادات", render: (r: Record<string, unknown>) => formatCurrency(r.revenue) },
    { key: "expenses", header: "المصروفات", render: (r: Record<string, unknown>) => formatCurrency(r.expenses) },
    { key: "netProfit", header: "صافي الربح", render: (r: Record<string, unknown>) => (
      <span className={r.netProfit >= 0 ? "text-success" : "text-error"}>{formatCurrency(r.netProfit)}</span>
    )},
    { key: "growth", header: "النمو", render: (r: Record<string, unknown>) => (
      <span className={cn("flex items-center gap-1", r.growth >= 0 ? "text-success" : "text-error")}>
        {r.growth >= 0 ? "أ¢†‘" : "↓"} %{Math.abs(r.growth)}
      </span>
    )},
  ]

  const dateRangeOptions = [
    { value: "month", label: "شهر" },
    { value: "quarter", label: "3 أشهر" },
    { value: "half", label: "6 أشهر" },
    { value: "year", label: "سنة" },
    { value: "all", label: "مخصص" },
  ]

  const monthlyComparisonData = useMemo(() => {
    return filteredReports.map(r => ({
      month: r.month,
      "الإيرادات": r.revenue,
      "المصروفات": r.expenses,
      "صافي الربح": r.netProfit,
    }))
  }, [filteredReports])

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="إجمالي الإيرادات" value={formatCurrency(totalRevenue)} icon={HiOutlineCash} color="success" change={{ value: avgGrowth > 0 ? Math.round(avgGrowth) : 5, isPositive: avgGrowth > 0 }} />
        <StatsCard title="إجمالي المصروفات" value={formatCurrency(totalExpenses)} icon={HiOutlineCash} color="error" />
        <StatsCard title="صافي الربح" value={formatCurrency(totalNetProfit)} icon={HiOutlineTrendingUp} color="primary" />
        <StatsCard title="الإيرادات المتوقعة" value={formatCurrency(expectedRevenue)} icon={HiOutlineChartSquareBar} color="info" subtitle="تقدير الشهر القادم" />
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {dateRangeOptions.map((opt) => (
            <button type="button"
              key={opt.value}
              onClick={() => setDateRange(opt.value)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-lg transition-all",
                dateRange === opt.value
                  ? "bg-primary text-white"
                  : "bg-surface-secondary text-text-secondary hover:text-text border border-border"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<HiOutlineDownload className="w-4 h-4" />}>
            PDF
          </Button>
          <Button variant="outline" size="sm" leftIcon={<HiOutlineDownload className="w-4 h-4" />}>
            CSV
          </Button>
        </div>
      </motion.div>

      {dateRange === "all" && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
          <div>
            <label className="block text-xs text-text-secondary mb-1">من</label>
            <input type="date" value={customFrom} onChange={(e) => setCustomFrom(e.target.value)} className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text" />
          </div>
          <div>
            <label className="block text-xs text-text-secondary mb-1">إلى</label>
            <input type="date" value={customTo} onChange={(e) => setCustomTo(e.target.value)} className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text" />
          </div>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>توزيع الإيرادات</CardTitle>
              <CardDescription>مصادر الإيرادات المختلفة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-72" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={revenueBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={110} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {revenueBreakdown.map((entry, idx) => (
                        <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    <Legend formatter={(value) => value} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>الإيرادات الشهرية</CardTitle>
              <CardDescription>مقارنة الإيرادات بالمصروفات</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                    <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <Tooltip content={<RevenueCustomTooltip />} />
                    <Legend formatter={(value) => value === "الإيرادات" ? "الإيرادات" : value === "المصروفات" ? "المصروفات" : "صافي الربح"} />
                    <Bar dataKey="الإيرادات" fill={colors.success} radius={[4, 4, 0, 0]} name="الإيرادات" />
                    <Bar dataKey="المصروفات" fill={colors.error} radius={[4, 4, 0, 0]} name="المصروفات" />
                    <Bar dataKey="صافي الربح" fill={colors.primary} radius={[4, 4, 0, 0]} name="صافي الربح" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>التقارير المالية الشهرية</CardTitle>
            <CardDescription>تفاصيل الإيرادات والمصروفات والأرباح</CardDescription>
          </CardHeader>
          <CardContent>
            <Table columns={reportColumns} data={filteredReports} emptyMessage="لا توجد تقارير مالية" />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

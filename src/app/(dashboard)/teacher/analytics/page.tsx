"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineChartSquareBar, HiOutlineTrendingUp, HiOutlineUsers,
  HiOutlineCash, HiOutlineDownload, HiOutlineDocumentReport,
  HiOutlineAcademicCap, HiOutlineStar, HiOutlineVideoCamera,
  HiOutlineClipboardList, HiOutlineSearch, HiOutlineFilter,
  HiOutlineChevronDown, HiOutlineChevronUp, HiOutlinePresentationChartLine,
  HiOutlineExclamationCircle, HiOutlineBell, HiOutlineClock,
} from "react-icons/hi"
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { PageHeader } from "@/components/ui/PageHeader"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Table } from "@/components/ui/Table"
import { Tabs, TabPanel } from "@/components/ui/Tabs"
import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select"
import { SearchInput } from "@/components/ui/SearchInput"
import { Skeleton, StatsSkeleton, CardSkeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { mockAnalyticsDetailed } from "@/lib/mock/data"
import { formatCurrency, cn, det } from "@/lib/utils"

const colors = {
  primary: "#4F46E5",
  success: "#16C784",
  warning: "#F5B301",
  error: "#FF5C74",
  info: "#4F46E5",
  cyan: "#06B6D4",
  purple: "#8B5CF6",
  pink: "#EC4899",
}

const PIE_COLORS = [colors.primary, colors.success, colors.warning, colors.cyan, colors.purple, colors.pink]

const tabConfig = [
  { id: "overview", label: "نظرة عامة", icon: <HiOutlinePresentationChartLine className="w-4 h-4" /> },
  { id: "courses", label: "تحليل الكورسات", icon: <HiOutlineAcademicCap className="w-4 h-4" /> },
  { id: "videos", label: "تحليل الفيديو", icon: <HiOutlineVideoCamera className="w-4 h-4" /> },
  { id: "exams", label: "تحليل الامتحانات", icon: <HiOutlineClipboardList className="w-4 h-4" /> },
  { id: "financial", label: "التقارير المالية", icon: <HiOutlineCash className="w-4 h-4" /> },
]

const statusLabel: Record<string, string> = {
  active: "نشط",
  draft: "مسودة",
  closed: "مغلق",
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

const activityColors: Record<string, string> = {
  student: "text-primary bg-primary/10 border-primary/20",
  exam: "text-success bg-success/10 border-success/20",
  subscription: "text-warning bg-warning/10 border-warning/20",
  course: "text-info bg-info/10 border-info/20",
  rating: "text-purple bg-purple/10 border-purple/20",
  video: "text-cyan bg-cyan/10 border-cyan/20",
  certificate: "text-pink bg-pink/10 border-pink/20",
  notification: "text-text-secondary bg-card border-border",
}

const activityIcons: Record<string, React.ElementType> = {
  student: HiOutlineUsers, exam: HiOutlineClipboardList, subscription: HiOutlineCash,
  course: HiOutlineAcademicCap, rating: HiOutlineStar, video: HiOutlineVideoCamera,
  certificate: HiOutlineDocumentReport, notification: HiOutlineBell,
}

function ActivityIcon({ type }: { type: string }) {
  const Icon = activityIcons[type] || HiOutlineExclamationCircle
  const colors = activityColors[type] || "text-text-secondary bg-card border-border"
  return (
    <div className={cn("w-9 h-9 rounded-[14px] flex items-center justify-center shrink-0 backdrop-blur border", colors)}>
      <Icon className="w-4 h-4" />
    </div>
  )
}

function ChartContainer({ children }: { children: React.ReactNode }) {
  return <div dir="ltr" className="h-72">{children}</div>
}

function RevenueTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card/90 backdrop-blur-xl border border-border rounded-[16px] p-3 shadow-lg text-sm space-y-1">
      <p className="font-medium text-text mb-1">{label}</p>
      {payload.map((entry, idx) => (
        <p key={idx} className="text-text-secondary flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          {entry.name}: <span className="font-medium text-text">{formatCurrency(entry.value)}</span>
        </p>
      ))}
    </div>
  )
}

function DefaultTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card/90 backdrop-blur-xl border border-border rounded-[16px] p-3 shadow-lg text-sm space-y-1">
      <p className="font-medium text-text mb-1">{label}</p>
      {payload.map((entry, idx) => (
        <p key={idx} className="text-text-secondary flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          {entry.name}: <span className="font-medium text-text">{entry.value}</span>
        </p>
      ))}
    </div>
  )
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <ErrorState
          title="حدث خطأ في تحميل التحليلات"
          description="يرجى المحاولة مرة أخرى"
          onRetry={() => setError(null)}
        />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
        <StatsSkeleton />
        <div className="grid lg:grid-cols-2 gap-6">
          <Skeleton className="h-80 rounded-[24px]" />
          <Skeleton className="h-80 rounded-[24px]" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="التحليلات المتقدمة"
        description="إحصائيات وتحليلات شاملة لأداء المنصة"
      />

      <Tabs tabs={tabConfig}>
        {(activeTab) => (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TabPanel id="overview" activeTab={activeTab}>
              <OverviewSection />
            </TabPanel>
            <TabPanel id="courses" activeTab={activeTab}>
              <CourseSection />
            </TabPanel>
            <TabPanel id="videos" activeTab={activeTab}>
              <VideoSection />
            </TabPanel>
            <TabPanel id="exams" activeTab={activeTab}>
              <ExamSection />
            </TabPanel>
            <TabPanel id="financial" activeTab={activeTab}>
              <FinancialSection />
            </TabPanel>
          </motion.div>
        )}
      </Tabs>
    </div>
  )
}

function OverviewSection() {
  const data = mockAnalyticsDetailed.overview

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      className="space-y-6"
    >
      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
      >
        <StatsCard title="إجمالي الطلاب" value={data.totalStudents} icon={HiOutlineUsers} color="primary" trend={data.studentGrowth} />
        <StatsCard title="إجمالي الإيرادات" value={formatCurrency(data.totalRevenue)} icon={HiOutlineCash} color="success" trend={data.revenueGrowth} />
        <StatsCard title="إجمالي الكورسات" value={data.totalCourses} icon={HiOutlineAcademicCap} color="info" />
        <StatsCard title="إجمالي الامتحانات" value={data.totalExams} icon={HiOutlineClipboardList} color="warning" />
        <StatsCard title="معدل الإكمال" value={`${data.completionRate}%`} icon={HiOutlineTrendingUp} color="success" />
        <StatsCard title="متوسط التقييم" value={data.averageRating.toFixed(1)} icon={HiOutlineStar} color="warning" />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
        >
          <Card>
            <CardHeader>
              <CardTitle>الإيرادات الشهرية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="success" size="sm">
                  <HiOutlineTrendingUp className="w-3 h-3 ml-1" />
                  نمو بنسبة {data.revenueGrowth}%
                </Badge>
              </div>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockAnalyticsDetailed.financialReports.map(r => ({ month: r.month, "الإيرادات": r.revenue }))}>
                    <defs>
                      <linearGradient id="overviewRevGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: "#96A3B8", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.06)" }} tickLine={false} />
                    <YAxis tick={{ fill: "#96A3B8", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <Tooltip content={<RevenueTooltip />} />
                    <Area type="monotone" dataKey="الإيرادات" stroke={colors.primary} fill="url(#overviewRevGrad)" strokeWidth={2} name="الإيرادات" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
        >
          <Card>
            <CardHeader>
              <CardTitle>نمو الطلاب</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockAnalyticsDetailed.monthlyRevenue.map((_, i) => ({
                    month: mockAnalyticsDetailed.financialReports[i]?.month || `شهر ${i + 1}`,
                    newStudents: Math.floor(det() * 40) + 20 + i * 3,
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: "#96A3B8", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.06)" }} tickLine={false} />
                    <YAxis tick={{ fill: "#96A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<DefaultTooltip />} />
                    <Bar dataKey="newStudents" fill={colors.success} radius={[6, 6, 0, 0]} name="طلاب جدد" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
        >
          <Card>
            <CardHeader>
              <CardTitle>أفضل 5 كورسات بالإيرادات</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[...mockAnalyticsDetailed.courseAnalytics].sort((a, b) => b.revenue - a.revenue).slice(0, 5)}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                    <XAxis type="number" tick={{ fill: "#96A3B8", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <YAxis dataKey="name" type="category" width={130} tick={{ fill: "#96A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<RevenueTooltip />} />
                    <Bar dataKey="revenue" fill={colors.primary} radius={[0, 6, 6, 0]} name="الإيرادات" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
        >
          <Card>
            <CardHeader>
              <CardTitle>النشاطات الأخيرة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentActivity.map((activity, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-3 p-2.5 rounded-[16px] hover:bg-card/40 transition-all"
                  >
                    <ActivityIcon type={activity.type} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text truncate">{activity.action}</p>
                      <p className="text-xs text-text-tertiary">{activity.user} · {activity.time}</p>
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

function CourseSection() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set())

  const filteredCourses = useMemo(() => {
    let result = mockAnalyticsDetailed.courseAnalytics
    if (statusFilter !== "all") result = result.filter(c => c.status === statusFilter)
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      result = result.filter(c => c.name.toLowerCase().includes(q))
    }
    return result
  }, [statusFilter, searchQuery])

  const toggleExpand = (id: string) => {
    const next = new Set(expandedCourses)
    if (next.has(id)) next.delete(id); else next.add(id)
    setExpandedCourses(next)
  }

  const handleExport = () => {
    const headers = "اسم الكورس,المشتركين,الإيرادات,متوسط التقييم,نسبة الإكمال,عدد الدروس,الحالة"
    const rows = filteredCourses.map(c => `${c.name},${c.enrolled},${c.revenue},${c.rating},${c.completionRate}%,${c.lessons},${statusLabel[c.status] || c.status}`)
    const blob = new Blob([headers, ...rows].join("\n"), { type: "text/csv;charset=utf-8;" })
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
    { key: "revenue", header: "الإيرادات", render: (c: any) => formatCurrency(c.revenue) },
    { key: "rating", header: "التقييم", render: (c: any) => `${c.rating}/5` },
    { key: "completionRate", header: "الإكمال", render: (c: any) => `${c.completionRate}%` },
    { key: "lessons", header: "الدروس" },
    { key: "status", header: "الحالة", render: (c: any) => (
      <Badge variant={c.status === "active" ? "success" : c.status === "draft" ? "warning" : "error"} size="sm">
        {statusLabel[c.status] || c.status}
      </Badge>
    )},
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="بحث عن كورس..."
          className="max-w-xs"
        />
        <div className="flex items-center gap-2">
          <HiOutlineFilter className="w-4 h-4 text-text-secondary" />
          {["all", "active", "draft", "closed"].map((s) => (
            <button type="button"
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-[12px] transition-all duration-200",
                statusFilter === s
                  ? "bg-primary/20 border border-primary/30 text-primary"
                  : "bg-card/60 border border-border text-text-secondary hover:text-text hover:border-border-light",
              )}
            >
              {s === "all" ? "الكل" : statusLabel[s] || s}
            </button>
          ))}
        </div>
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<HiOutlineDownload className="w-4 h-4" />}
          onClick={handleExport}
        >
          تصدير CSV
        </Button>
      </div>

      <div className="bg-card/60 backdrop-blur-xl border border-border rounded-[24px] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="w-8 px-2 py-3.5" />
              {columns.map((col) => (
                <th key={col.key} className="text-right px-4 py-3.5 font-medium text-text-tertiary whitespace-nowrap">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-12">
                  <EmptyState title="لا توجد كورسات" description="لا توجد نتائج تطابق معايير البحث" />
                </td>
              </tr>
            ) : (
              filteredCourses.map((course) => (
                <>
                  <tr
                    key={course.id}
                    onClick={() => toggleExpand(course.id)}
                    className="border-b border-border/50 last:border-0 transition-all hover:bg-card/40 cursor-pointer"
                  >
                    <td className="px-2 py-3.5 text-text-tertiary">
                      {expandedCourses.has(course.id) ? (
                        <HiOutlineChevronUp className="w-4 h-4" />
                      ) : (
                        <HiOutlineChevronDown className="w-4 h-4" />
                      )}
                    </td>
                    <td className="px-4 py-3.5 font-medium text-text">{course.name}</td>
                    <td className="px-4 py-3.5 text-text">{course.enrolled.toLocaleString("ar-EG")}</td>
                    <td className="px-4 py-3.5 text-text">{formatCurrency(course.revenue)}</td>
                    <td className="px-4 py-3.5 text-text">{course.rating}/5</td>
                    <td className="px-4 py-3.5 text-text">{course.completionRate}%</td>
                    <td className="px-4 py-3.5 text-text">{course.lessons}</td>
                    <td className="px-4 py-3.5">
                      <Badge variant={course.status === "active" ? "success" : course.status === "draft" ? "warning" : "error"} size="sm">
                        {statusLabel[course.status] || course.status}
                      </Badge>
                    </td>
                  </tr>
                  {expandedCourses.has(course.id) && (
                    <tr key={`${course.id}-expanded`} className="bg-card/30">
                      <td colSpan={columns.length + 1} className="p-4">
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-3"
                        >
                          <h4 className="text-sm font-semibold text-text">إحصائيات الفصول الدراسية</h4>
                          <div className="bg-card/40 border border-border rounded-[16px] overflow-hidden">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-border">
                                  <th className="text-right px-4 py-2.5 font-medium text-text-tertiary">اسم الفصل</th>
                                  <th className="text-right px-4 py-2.5 font-medium text-text-tertiary">الطلاب</th>
                                  <th className="text-right px-4 py-2.5 font-medium text-text-tertiary">متوسط الدرجات</th>
                                  <th className="text-right px-4 py-2.5 font-medium text-text-tertiary">نسبة الإكمال</th>
                                </tr>
                              </thead>
                              <tbody>
                                {chapterStats.map((ch, ci) => (
                                  <tr key={ci} className="border-b border-border/50 last:border-0">
                                    <td className="px-4 py-2.5 text-text">{ch.name}</td>
                                    <td className="px-4 py-2.5 text-text">{ch.students}</td>
                                    <td className="px-4 py-2.5 text-text">{ch.avgGrade}</td>
                                    <td className="px-4 py-2.5">
                                      <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1.5 bg-card rounded-full overflow-hidden">
                                          <div className="h-full bg-primary rounded-full" style={{ width: `${ch.completionRate}%` }} />
                                        </div>
                                        <span className="text-xs text-text-secondary">{ch.completionRate}%</span>
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
                </>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function VideoSection() {
  const [sortField, setSortField] = useState<string>("views")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")

  const totalViews = mockAnalyticsDetailed.videoAnalytics.reduce((s, v) => s + v.views, 0)
  const avgCompletion = Math.round(mockAnalyticsDetailed.videoAnalytics.reduce((s, v) => s + v.completionRate, 0) / mockAnalyticsDetailed.videoAnalytics.length)

  const sortedVideos = useMemo(() => {
    return [...mockAnalyticsDetailed.videoAnalytics].sort((a, b) => {
      const aVal = a[sortField as keyof typeof a]
      const bVal = b[sortField as keyof typeof b]
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "desc" ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal)
      }
      return sortDir === "desc" ? (bVal as number) - (aVal as number) : (aVal as number) - (bVal as number)
    })
  }, [sortField, sortDir])

  const top5 = useMemo(() => [...mockAnalyticsDetailed.videoAnalytics].sort((a, b) => b.views - a.views).slice(0, 5), [])
  const bottom5 = useMemo(() => [...mockAnalyticsDetailed.videoAnalytics].sort((a, b) => a.views - b.views).slice(0, 5), [])

  const handleSort = (field: string) => {
    if (sortField === field) setSortDir(d => d === "desc" ? "asc" : "desc")
    else { setSortField(field); setSortDir("desc") }
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
    { key: "completionRate", header: "الإكمال" },
    { key: "likes", header: "الإعجابات" },
    { key: "comments", header: "التعليقات" },
    { key: "uploadDate", header: "تاريخ الرفع" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="إجمالي الفيديوهات" value={mockAnalyticsDetailed.videoAnalytics.length} icon={HiOutlineVideoCamera} color="primary" />
        <StatsCard title="إجمالي المشاهدات" value={totalViews.toLocaleString("ar-EG")} icon={HiOutlineTrendingUp} color="success" trend={15} />
        <StatsCard title="معدل الإكمال" value={`${avgCompletion}%`} icon={HiOutlineAcademicCap} color="warning" />
        <StatsCard title="المشاهدات الفريدة" value={Math.floor(totalViews * 0.65).toLocaleString("ar-EG")} icon={HiOutlineUsers} color="info" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>الأكثر مشاهدة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {top5.map((video, idx) => (
                <div key={video.id} className="flex items-center gap-3 p-2.5 rounded-[16px] hover:bg-card/40 transition-all">
                  <div className="w-8 h-8 rounded-[12px] bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-bold shrink-0">
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
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {bottom5.map((video, idx) => (
                <div key={video.id} className="flex items-center gap-3 p-2.5 rounded-[16px] hover:bg-card/40 transition-all">
                  <div className="w-8 h-8 rounded-[12px] bg-card border border-border flex items-center justify-center text-text-tertiary text-xs font-bold shrink-0">
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
      </div>

      <div className="bg-card/60 backdrop-blur-xl border border-border rounded-[24px] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {videoColumns.map((col) => (
                <th
                  key={col.key}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  className={cn(
                    "text-right px-4 py-3.5 font-medium text-text-tertiary whitespace-nowrap",
                    col.sortable && "cursor-pointer hover:text-text select-none",
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
                <td colSpan={videoColumns.length} className="text-center py-12">
                  <EmptyState title="لا توجد فيديوهات" />
                </td>
              </tr>
            ) : (
              sortedVideos.map((video) => (
                <tr key={video.id} className="border-b border-border/50 last:border-0 hover:bg-card/40 transition-all">
                  <td className="px-4 py-3.5 font-medium text-text">{video.name}</td>
                  <td className="px-4 py-3.5 text-text-secondary">{video.course}</td>
                  <td className="px-4 py-3.5 text-text">{video.views.toLocaleString("ar-EG")}</td>
                  <td className="px-4 py-3.5 text-text">{video.avgWatchTime}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-card rounded-full overflow-hidden">
                        <div className="h-full bg-success rounded-full" style={{ width: `${video.completionRate}%` }} />
                      </div>
                      <span className="text-xs text-text-secondary">{video.completionRate}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-text">{video.likes}</td>
                  <td className="px-4 py-3.5 text-text">{video.comments}</td>
                  <td className="px-4 py-3.5 text-text-secondary text-xs">{video.uploadDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ExamSection() {
  const [courseFilter, setCourseFilter] = useState("all")

  const examAnalytics = mockAnalyticsDetailed.examAnalytics

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

  const examColumns = [
    { key: "name", header: "اسم الامتحان" },
    { key: "course", header: "الكورس" },
    { key: "students", header: "الطلاب" },
    { key: "avgGrade", header: "متوسط الدرجة" },
    { key: "highestGrade", header: "أعلى درجة" },
    { key: "lowestGrade", header: "أدنى درجة" },
    {
      key: "passRate", header: "نسبة النجاح",
      render: (e: any) => (
        <div className="flex items-center gap-2">
          <div className="w-12 h-1.5 bg-card rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full", e.passRate >= 80 ? "bg-success" : e.passRate >= 60 ? "bg-warning" : "bg-error")}
              style={{ width: `${e.passRate}%` }}
            />
          </div>
          <span className="text-xs text-text-secondary">{e.passRate}%</span>
        </div>
      ),
    },
    { key: "attempts", header: "المحاولات" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="إجمالي الامتحانات" value={totalExams} icon={HiOutlineClipboardList} color="primary" />
        <StatsCard title="إجمالي المحاولات" value={totalAttempts.toLocaleString("ar-EG")} icon={HiOutlineTrendingUp} color="info" trend={12} />
        <StatsCard title="متوسط الدرجات" value={avgGradeAll} icon={HiOutlineAcademicCap} color="success" />
        <StatsCard title="معدل النجاح" value={`${avgPassRate}%`} icon={HiOutlineStar} color="warning" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>مقارنة نتائج الامتحانات</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredExams} margin={{ top: 10, right: 10, left: 10, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "#96A3B8", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.06)" }} tickLine={false} angle={-20} textAnchor="end" height={80} />
                  <YAxis tick={{ fill: "#96A3B8", fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip content={<DefaultTooltip />} />
                  <Legend formatter={(value) => value === "avgGrade" ? "متوسط الدرجة" : "نسبة النجاح"} />
                  <Bar dataKey="avgGrade" fill={colors.primary} radius={[6, 6, 0, 0]} name="avgGrade" />
                  <Bar dataKey="passRate" fill={colors.success} radius={[6, 6, 0, 0]} name="passRate" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>معدل النجاح العام</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-72" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "ناجح", value: avgPassRate },
                      { name: "راسب", value: 100 - avgPassRate },
                    ]}
                    cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={5} dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    <Cell fill={colors.success} />
                    <Cell fill={colors.error} />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-3">
        <HiOutlineFilter className="w-4 h-4 text-text-secondary" />
        <div className="w-56">
          <Select options={courseOptions} value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)} />
        </div>
      </div>

      <Table columns={examColumns} data={filteredExams} emptyMessage="لا توجد امتحانات متطابقة" />
    </div>
  )
}

function FinancialSection() {
  const [dateRange, setDateRange] = useState("year")

  const { financialReports, revenueBreakdown } = mockAnalyticsDetailed

  const totalRevenue = financialReports.reduce((s, r) => s + r.revenue, 0)
  const totalExpenses = financialReports.reduce((s, r) => s + r.expenses, 0)
  const totalNetProfit = financialReports.reduce((s, r) => s + r.netProfit, 0)
  const expectedRevenue = Math.round(totalRevenue * 1.15)
  const avgGrowth = financialReports.length > 1
    ? financialReports.slice(1).reduce((s, r) => s + r.growth, 0) / (financialReports.length - 1)
    : 0

  const filteredReports = useMemo(() => {
    if (dateRange === "all") return financialReports
    const count = dateRange === "month" ? 1 : dateRange === "quarter" ? 3 : dateRange === "half" ? 6 : 12
    return financialReports.slice(-count)
  }, [financialReports, dateRange])

  const reportColumns = [
    { key: "month", header: "الشهر" },
    { key: "revenue", header: "الإيرادات", render: (r: any) => formatCurrency(r.revenue) },
    { key: "expenses", header: "المصروفات", render: (r: any) => formatCurrency(r.expenses) },
    { key: "netProfit", header: "صافي الربح", render: (r: any) => (
      <span className={r.netProfit >= 0 ? "text-success" : "text-error"}>{formatCurrency(r.netProfit)}</span>
    )},
    { key: "growth", header: "النمو", render: (r: any) => (
      <span className={cn("flex items-center gap-1", r.growth >= 0 ? "text-success" : "text-error")}>
        {r.growth >= 0 ? "↑" : "↓"} {Math.abs(r.growth)}%
      </span>
    )},
  ]

  const dateOptions = [
    { value: "month", label: "شهر" },
    { value: "quarter", label: "3 أشهر" },
    { value: "half", label: "6 أشهر" },
    { value: "year", label: "سنة" },
    { value: "all", label: "الكل" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="إجمالي الإيرادات" value={formatCurrency(totalRevenue)} icon={HiOutlineCash} color="success" trend={Math.round(avgGrowth)} />
        <StatsCard title="إجمالي المصروفات" value={formatCurrency(totalExpenses)} icon={HiOutlineCash} color="error" />
        <StatsCard title="صافي الربح" value={formatCurrency(totalNetProfit)} icon={HiOutlineTrendingUp} color="primary" trend={Math.round(avgGrowth)} />
        <StatsCard title="الإيرادات المتوقعة" value={formatCurrency(expectedRevenue)} icon={HiOutlineChartSquareBar} color="info" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {dateOptions.map((opt) => (
          <button type="button"
            key={opt.value}
            onClick={() => setDateRange(opt.value)}
            className={cn(
              "px-3.5 py-1.5 text-xs font-medium rounded-[12px] transition-all duration-200",
              dateRange === opt.value
                ? "bg-primary/20 border border-primary/30 text-primary"
                : "bg-card/60 border border-border text-text-secondary hover:text-text hover:border-border-light",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>توزيع الإيرادات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-72" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueBreakdown}
                    cx="50%" cy="50%" innerRadius={60} outerRadius={110} paddingAngle={3} dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {revenueBreakdown.map((entry, idx) => (
                      <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>الإيرادات الشهرية</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredReports.map(r => ({
                  month: r.month,
                  "الإيرادات": r.revenue,
                  "المصروفات": r.expenses,
                  "صافي الربح": r.netProfit,
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#96A3B8", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.06)" }} tickLine={false} />
                  <YAxis tick={{ fill: "#96A3B8", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<RevenueTooltip />} />
                  <Legend />
                  <Bar dataKey="الإيرادات" fill={colors.success} radius={[6, 6, 0, 0]} name="الإيرادات" />
                  <Bar dataKey="المصروفات" fill={colors.error} radius={[6, 6, 0, 0]} name="المصروفات" />
                  <Bar dataKey="صافي الربح" fill={colors.primary} radius={[6, 6, 0, 0]} name="صافي الربح" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>التقارير المالية الشهرية</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table columns={reportColumns} data={filteredReports} emptyMessage="لا توجد تقارير مالية" />
        </CardContent>
      </Card>
    </div>
  )
}

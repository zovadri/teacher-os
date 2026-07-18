"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineChartSquareBar,
  HiOutlineTrendingUp,
  HiOutlineUsers,
  HiOutlineCash,
  HiOutlineDownload,
  HiOutlineDocumentReport,
  HiOutlineCalendar,
  HiOutlineAcademicCap,
  HiOutlineStar,
} from "react-icons/hi"
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import Button from "@/components/ui/Button"
import { mockAnalytics, mockStats } from "@/lib/mock/data"
import { formatCurrency } from "@/lib/utils"

const dateRanges = [
  { label: "7 أيام", value: 7 },
  { label: "30 يوماً", value: 30 },
  { label: "90 يوماً", value: 90 },
  { label: "سنة", value: 365 },
]

const chartColors = {
  primary: "#6366F1",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
}

export default function AnalyticsPage() {
  const [range, setRange] = useState(30)

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="التحليلات والتقارير" subtitle="إحصائيات شاملة حول أداء المنصة" />

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 p-1 bg-surface border border-border rounded-xl">
          {dateRanges.map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                range === r.value ? "bg-primary text-white" : "text-text-secondary hover:text-text"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
        <div className="mr-auto flex items-center gap-2">
          <Button variant="outline" size="sm" leftIcon={<HiOutlineDownload size={16} />}>
            تصدير PDF
          </Button>
          <Button variant="outline" size="sm" leftIcon={<HiOutlineDocumentReport size={16} />}>
            تقرير كامل
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="إجمالي الإيرادات" value={formatCurrency(mockAnalytics.monthlyRevenue.reduce((s, m) => s + m.revenue, 0))} icon={HiOutlineCash} color="success" />
        <StatsCard title="إجمالي الطلاب" value={mockAnalytics.studentGrowth[mockAnalytics.studentGrowth.length - 1].total} icon={HiOutlineUsers} color="primary" />
        <StatsCard title="متوسط التقييم" value="4.8/5" icon={HiOutlineStar} color="warning" />
        <StatsCard title="نسبة الإنجاز" value="%87" icon={HiOutlineAcademicCap} color="info" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>الإيرادات الشهرية</CardTitle>
            <CardDescription>تطور الإيرادات خلال العام</CardDescription>
          </CardHeader>
          <CardContent>
            <div dir="ltr" className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockAnalytics.monthlyRevenue}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                  <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "8px", fontSize: "13px" }} />
                  <Area type="monotone" dataKey="revenue" stroke={chartColors.primary} fill="url(#revenueGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>نمو الطلاب</CardTitle>
            <CardDescription>إجمالي عدد الطلاب شهرياً</CardDescription>
          </CardHeader>
          <CardContent>
            <div dir="ltr" className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockAnalytics.studentGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                  <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "8px", fontSize: "13px" }} />
                  <Line type="monotone" dataKey="total" stroke={chartColors.success} strokeWidth={2} dot={{ fill: chartColors.success, r: 4 }} />
                  <Line type="monotone" dataKey="newStudents" stroke={chartColors.info} strokeWidth={2} dot={{ fill: chartColors.info, r: 4 }} />
                  <Legend formatter={(value) => value === "total" ? "إجمالي الطلاب" : "طلاب جدد"} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>أداء الكورسات</CardTitle>
            <CardDescription>نسبة الإكمال ومتوسط الدرجات</CardDescription>
          </CardHeader>
          <CardContent>
            <div dir="ltr" className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockAnalytics.coursePerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="courseName" type="category" width={120} tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "8px", fontSize: "13px" }} />
                  <Legend formatter={(value) => value === "completionRate" ? "نسبة الإكمال" : "متوسط الدرجات"} />
                  <Bar dataKey="completionRate" fill={chartColors.primary} radius={[0, 4, 4, 0]} />
                  <Bar dataKey="avgGrade" fill={chartColors.success} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>أداء الامتحانات</CardTitle>
            <CardDescription>نسبة النجاح والمشاركة</CardDescription>
          </CardHeader>
          <CardContent>
            <div dir="ltr" className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockAnalytics.examPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="examName" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                  <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "8px", fontSize: "13px" }} />
                  <Legend formatter={(value) => value === "passRate" ? "نسبة النجاح" : value === "avgScore" ? "متوسط الدرجات" : "نسبة المشاركة"} />
                  <Bar dataKey="passRate" fill={chartColors.success} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="participationRate" fill={chartColors.warning} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>النشاط الأسبوعي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAnalytics.weeklyActivity.map((day) => (
                <div key={day.day} className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary w-16">{day.day}</span>
                  <div className="flex-1 mx-3">
                    <div className="w-full h-2 bg-surface-tertiary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${(day.videos / 20) * 100}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-tertiary">
                    <span>{day.videos} فيديو</span>
                    <span>{day.exams} اختبار</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>إحصائيات سريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: "إجمالي الدروس", value: mockStats.totalLessons, color: "text-primary", bg: "bg-primary/10" },
                { label: "إجمالي الفيديوهات", value: mockStats.totalVideos, color: "text-success", bg: "bg-success/10" },
                { label: "إجمالي الواجبات", value: mockStats.totalHomework, color: "text-warning", bg: "bg-warning/10" },
                { label: "إجمالي الامتحانات", value: mockStats.totalExams, color: "text-info", bg: "bg-info/10" },
                { label: "الشهادات المصدرة", value: mockStats.totalCertificates, color: "text-error", bg: "bg-error/10" },
                { label: "أكواد الشحن", value: mockStats.totalCodes, color: "text-purple-600", bg: "bg-purple-100" },
              ].map((s) => (
                <div key={s.label} className="p-4 rounded-xl bg-surface-secondary border border-border">
                  <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-2 ${s.color}`}>
                    <HiOutlineChartSquareBar size={18} />
                  </div>
                  <p className="text-lg font-bold text-text">{s.value.toLocaleString("ar-EG")}</p>
                  <p className="text-xs text-text-tertiary">{s.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

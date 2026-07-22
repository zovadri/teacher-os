"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineDocumentReport,
  HiOutlineDownload,
  HiOutlineCalendar,
  HiOutlineUsers,
  HiOutlineCash,
  HiOutlineAcademicCap,
  HiOutlineChartSquareBar,
  HiOutlineClock,
  HiOutlineCheck,
  HiOutlinePlus,
  HiOutlineX,
} from "react-icons/hi"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
} from "recharts"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Table } from "@/components/ui/Table"
import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select"
import { Modal } from "@/components/ui/Modal"
import { EmptyState } from "@/components/ui/EmptyState"
import { mockAnalytics, mockStats, mockPayments } from "@/lib/mock/data"
import { formatCurrency, formatDate } from "@/lib/utils"

const reportTypes = [
  { id: "summary", label: "تقرير ملخص", icon: HiOutlineDocumentReport, color: "primary", desc: "ملخص شامل لأداء المنصة" },
  { id: "students", label: "أداء الطلاب", icon: HiOutlineUsers, color: "info", desc: "تحليل أداء الطلاب وتقدمهم" },
  { id: "revenue", label: "الإيرادات", icon: HiOutlineCash, color: "success", desc: "تقرير الإيرادات والمبيعات" },
  { id: "attendance", label: "الحضور", icon: HiOutlineAcademicCap, color: "warning", desc: "إحصائيات حضور الطلاب" },
  { id: "exams", label: "تحليل الامتحانات", icon: HiOutlineChartSquareBar, color: "error", desc: "تحليل نتائج الامتحانات" },
]

const dateRangeOptions = [
  { value: "7", label: "آخر 7 أيام" },
  { value: "30", label: "آخر 30 يوم" },
  { value: "90", label: "آخر 3 أشهر" },
  { value: "365", label: "آخر سنة" },
]

const formatOptions = [
  { value: "pdf", label: "PDF" },
  { value: "excel", label: "Excel" },
  { value: "csv", label: "CSV" },
]

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("summary")
  const [dateRange, setDateRange] = useState("30")
  const [exportFormat, setExportFormat] = useState("pdf")
  const [isExporting, setIsExporting] = useState(false)
  const [exportDone, setExportDone] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)

  const handleExport = () => {
    setIsExporting(true)
    setExportDone(false)
    setTimeout(() => {
      setIsExporting(false)
      setExportDone(true)
      setTimeout(() => setExportDone(false), 3000)
    }, 2000)
  }

  const previewData = selectedReport === "revenue" ? mockAnalytics.monthlyRevenue
    : selectedReport === "students" ? mockAnalytics.studentGrowth
    : selectedReport === "exams" ? mockAnalytics.examPerformance
    : selectedReport === "attendance" ? mockAnalytics.weeklyActivity
    : []

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="التقارير" subtitle="إنشاء وتصدير التقارير" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-4">
        <StatsCard title="إجمالي الإيرادات" value={formatCurrency(mockAnalytics.monthlyRevenue.reduce((s, m) => s + m.revenue, 0))} icon={HiOutlineCash} color="success" />
        <StatsCard title="إجمالي الطلاب" value={mockStats.totalStudents} icon={HiOutlineUsers} color="primary" />
        <StatsCard title="المعاملات" value={mockPayments.length} icon={HiOutlineChartSquareBar} color="info" />
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-72 space-y-2">
          <h3 className="text-sm font-semibold text-text mb-3">أنواع التقارير</h3>
          {reportTypes.map((rt) => {
            const Icon = rt.icon
            return (
              <button type="button"
                key={rt.id}
                onClick={() => setSelectedReport(rt.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-right transition-all ${
                  selectedReport === rt.id
                    ? "bg-primary-50 dark:bg-primary-900/20 border border-primary/30"
                    : "hover:bg-surface-secondary border border-transparent"
                }`}
              >
                <div className={`w-9 h-9 rounded-lg bg-${rt.color}-100 dark:bg-${rt.color}-900/30 flex items-center justify-center text-${rt.color}-600`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-medium ${selectedReport === rt.id ? "text-primary" : "text-text"}`}>{rt.label}</p>
                  <p className="text-xs text-text-tertiary">{rt.desc}</p>
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <CardTitle>معاينة التقرير</CardTitle>
                <Badge variant="primary" size="sm">{reportTypes.find((r) => r.id === selectedReport)?.label}</Badge>
              </div>
              <CardDescription>معاينة البيانات قبل التصدير</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedReport === "summary" && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "الطلاب", value: mockStats.totalStudents, icon: HiOutlineUsers, color: "text-primary" },
                    { label: "الكورسات", value: mockStats.totalCourses, icon: HiOutlineAcademicCap, color: "text-info" },
                    { label: "الإيرادات", value: formatCurrency(mockStats.monthlyRevenue), icon: HiOutlineCash, color: "text-success" },
                    { label: "الامتحانات", value: mockStats.totalExams, icon: HiOutlineChartSquareBar, color: "text-warning" },
                  ].map((s) => (
                    <div key={s.label} className="p-4 rounded-xl bg-surface-secondary border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <s.icon className={`w-4 h-4 ${s.color}`} />
                        <span className="text-xs text-text-secondary">{s.label}</span>
                      </div>
                      <p className="text-lg font-bold text-text">{s.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {(selectedReport === "revenue" || selectedReport === "students") && (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={previewData as Record<string, unknown>[]}>
                      <defs>
                        <linearGradient id="previewGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                      <XAxis dataKey={selectedReport === "revenue" ? "month" : "month"} tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                      <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Area type="monotone" dataKey={selectedReport === "revenue" ? "revenue" : "total"} stroke="#6366F1" fill="url(#previewGrad)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}

              {selectedReport === "exams" && (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={previewData as Record<string, unknown>[]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                      <XAxis dataKey="examName" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                      <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="passRate" fill="#10B981" radius={[4, 4, 0, 0]} name="نسبة النجاح" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {selectedReport === "attendance" && (
                <div className="space-y-3">
                  {mockAnalytics.weeklyActivity.map((day) => (
                    <div key={day.day} className="flex items-center gap-3">
                      <span className="text-sm text-text-secondary w-14">{day.day}</span>
                      <div className="flex-1 h-2 bg-surface-tertiary rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${(day.videos / 20) * 100}%` }} />
                      </div>
                      <span className="text-xs text-text-tertiary w-8 text-left">{day.videos}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>خيارات التصدير</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-end gap-4">
                <div className="w-44">
                  <Select label="نطاق التاريخ" options={dateRangeOptions} value={dateRange} onChange={(e) => setDateRange(e.target.value)} />
                </div>
                <div className="w-36">
                  <Select label="الصيغة" options={formatOptions} value={exportFormat} onChange={(e) => setExportFormat(e.target.value)} />
                </div>
                <Button type="button"
variant="primary"
                  size="lg"
                  leftIcon={isExporting ? undefined : <HiOutlineDownload className="w-4 h-4" />}
                  isLoading={isExporting}
                  onClick={handleExport}
                  className="min-w-[140px]"
                >
                  {isExporting ? "جاري التصدير..." : exportDone ? "تم التصدير!" : "تصدير التقرير"}
                </Button>
                {exportDone && (
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-1.5 text-success text-sm font-medium">
                    <HiOutlineCheck className="w-4 h-4" />
                    تم التصدير بنجاح
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>التقارير المجدولة</CardTitle>
              <Button type="button" size="sm" variant="primary" leftIcon={<HiOutlinePlus className="w-3 h-3" />} onClick={() => setShowScheduleModal(true)}>
                جدولة تقرير
              </Button>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={HiOutlineClock}
                title="لا توجد تقارير مجدولة"
                description="يمكنك جدولة تقارير دورية لتصلك على بريدك الإلكتروني"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <Modal isOpen={showScheduleModal} onClose={() => setShowScheduleModal(false)} title="جدولة تقرير دوري" size="md">
        <div className="space-y-4">
          <Select label="نوع التقرير" options={reportTypes.map((r) => ({ value: r.id, label: r.label }))} placeholder="اختر نوع التقرير" />
          <Select label="الدورية" options={[{ value: "daily", label: "يومي" }, { value: "weekly", label: "أسبوعي" }, { value: "monthly", label: "شهري" }]} placeholder="اختر الدورية" />
          <Select label="الصيغة" options={formatOptions} placeholder="اختر الصيغة" />
          <div className="flex gap-3 pt-2">
            <Button variant="primary" className="flex-1">جدولة</Button>
            <Button variant="secondary" onClick={() => setShowScheduleModal(false)}>إلغاء</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

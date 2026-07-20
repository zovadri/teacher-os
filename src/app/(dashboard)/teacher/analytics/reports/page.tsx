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
  { id: "summary", label: "ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط¸â€¦ط¸â€‍ط·آ®ط·آµ", icon: HiOutlineDocumentReport, color: "primary", desc: "ط¸â€¦ط¸â€‍ط·آ®ط·آµ ط·آ´ط·آ§ط¸â€¦ط¸â€‍ ط¸â€‍ط·آ£ط·آ¯ط·آ§ط·طŒ ط·آ§ط¸â€‍ط¸â€¦ط¸â€ ط·آµط·آ©" },
  { id: "students", label: "ط·آ£ط·آ¯ط·آ§ط·طŒ ط·آ§ط¸â€‍ط·آ·ط¸â€‍ط·آ§ط·آ¨", icon: HiOutlineUsers, color: "info", desc: "ط·ع¾ط·آ­ط¸â€‍ط¸ظ¹ط¸â€‍ ط·آ£ط·آ¯ط·آ§ط·طŒ ط·آ§ط¸â€‍ط·آ·ط¸â€‍ط·آ§ط·آ¨ ط¸ث†ط·ع¾ط¸â€ڑط·آ¯ط¸â€¦ط¸â€،ط¸â€¦" },
  { id: "revenue", label: "ط·آ§ط¸â€‍ط·آ¥ط¸ظ¹ط·آ±ط·آ§ط·آ¯ط·آ§ط·ع¾", icon: HiOutlineCash, color: "success", desc: "ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط·آ¥ط¸ظ¹ط·آ±ط·آ§ط·آ¯ط·آ§ط·ع¾ ط¸ث†ط·آ§ط¸â€‍ط¸â€¦ط·آ¨ط¸ظ¹ط·آ¹ط·آ§ط·ع¾" },
  { id: "attendance", label: "ط·آ§ط¸â€‍ط·آ­ط·آ¶ط¸ث†ط·آ±", icon: HiOutlineAcademicCap, color: "warning", desc: "ط·آ¥ط·آ­ط·آµط·آ§ط·آ¦ط¸ظ¹ط·آ§ط·ع¾ ط·آ­ط·آ¶ط¸ث†ط·آ± ط·آ§ط¸â€‍ط·آ·ط¸â€‍ط·آ§ط·آ¨" },
  { id: "exams", label: "ط·ع¾ط·آ­ط¸â€‍ط¸ظ¹ط¸â€‍ ط·آ§ط¸â€‍ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€ ط·آ§ط·ع¾", icon: HiOutlineChartSquareBar, color: "error", desc: "ط·ع¾ط·آ­ط¸â€‍ط¸ظ¹ط¸â€‍ ط¸â€ ط·ع¾ط·آ§ط·آ¦ط·آ¬ ط·آ§ط¸â€‍ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€ ط·آ§ط·ع¾" },
]

const dateRangeOptions = [
  { value: "7", label: "ط·آ¢ط·آ®ط·آ± 7 ط·آ£ط¸ظ¹ط·آ§ط¸â€¦" },
  { value: "30", label: "ط·آ¢ط·آ®ط·آ± 30 ط¸ظ¹ط¸ث†ط¸â€¦" },
  { value: "90", label: "ط·آ¢ط·آ®ط·آ± 3 ط·آ£ط·آ´ط¸â€،ط·آ±" },
  { value: "365", label: "ط·آ¢ط·آ®ط·آ± ط·آ³ط¸â€ ط·آ©" },
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
      <DashboardHeader title="ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ§ط·آ±ط¸ظ¹ط·آ±" subtitle="ط·آ¥ط¸â€ ط·آ´ط·آ§ط·طŒ ط¸ث†ط·ع¾ط·آµط·آ¯ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ§ط·آ±ط¸ظ¹ط·آ±" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-4">
        <StatsCard title="ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ ط·آ§ط¸â€‍ط·آ¥ط¸ظ¹ط·آ±ط·آ§ط·آ¯ط·آ§ط·ع¾" value={formatCurrency(mockAnalytics.monthlyRevenue.reduce((s, m) => s + m.revenue, 0))} icon={HiOutlineCash} color="success" />
        <StatsCard title="ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ ط·آ§ط¸â€‍ط·آ·ط¸â€‍ط·آ§ط·آ¨" value={mockStats.totalStudents} icon={HiOutlineUsers} color="primary" />
        <StatsCard title="ط·آ§ط¸â€‍ط¸â€¦ط·آ¹ط·آ§ط¸â€¦ط¸â€‍ط·آ§ط·ع¾" value={mockPayments.length} icon={HiOutlineChartSquareBar} color="info" />
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-72 space-y-2">
          <h3 className="text-sm font-semibold text-text mb-3">ط·آ£ط¸â€ ط¸ث†ط·آ§ط·آ¹ ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ§ط·آ±ط¸ظ¹ط·آ±</h3>
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
                <CardTitle>ط¸â€¦ط·آ¹ط·آ§ط¸ظ¹ط¸â€ ط·آ© ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ±</CardTitle>
                <Badge variant="primary" size="sm">{reportTypes.find((r) => r.id === selectedReport)?.label}</Badge>
              </div>
              <CardDescription>ط¸â€¦ط·آ¹ط·آ§ط¸ظ¹ط¸â€ ط·آ© ط·آ§ط¸â€‍ط·آ¨ط¸ظ¹ط·آ§ط¸â€ ط·آ§ط·ع¾ ط¸â€ڑط·آ¨ط¸â€‍ ط·آ§ط¸â€‍ط·ع¾ط·آµط·آ¯ط¸ظ¹ط·آ±</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedReport === "summary" && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "ط·آ§ط¸â€‍ط·آ·ط¸â€‍ط·آ§ط·آ¨", value: mockStats.totalStudents, icon: HiOutlineUsers, color: "text-primary" },
                    { label: "ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³ط·آ§ط·ع¾", value: mockStats.totalCourses, icon: HiOutlineAcademicCap, color: "text-info" },
                    { label: "ط·آ§ط¸â€‍ط·آ¥ط¸ظ¹ط·آ±ط·آ§ط·آ¯ط·آ§ط·ع¾", value: formatCurrency(mockStats.monthlyRevenue), icon: HiOutlineCash, color: "text-success" },
                    { label: "ط·آ§ط¸â€‍ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€ ط·آ§ط·ع¾", value: mockStats.totalExams, icon: HiOutlineChartSquareBar, color: "text-warning" },
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
                      <Bar dataKey="passRate" fill="#10B981" radius={[4, 4, 0, 0]} name="ط¸â€ ط·آ³ط·آ¨ط·آ© ط·آ§ط¸â€‍ط¸â€ ط·آ¬ط·آ§ط·آ­" />
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
              <CardTitle>ط·آ®ط¸ظ¹ط·آ§ط·آ±ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·ع¾ط·آµط·آ¯ط¸ظ¹ط·آ±</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-end gap-4">
                <div className="w-44">
                  <Select label="ط¸â€ ط·آ·ط·آ§ط¸â€ڑ ط·آ§ط¸â€‍ط·ع¾ط·آ§ط·آ±ط¸ظ¹ط·آ®" options={dateRangeOptions} value={dateRange} onChange={(e) => setDateRange(e.target.value)} />
                </div>
                <div className="w-36">
                  <Select label="ط·آ§ط¸â€‍ط·آµط¸ظ¹ط·ط›ط·آ©" options={formatOptions} value={exportFormat} onChange={(e) => setExportFormat(e.target.value)} />
                </div>
                <Button type="button"
variant="primary"
                  size="lg"
                  leftIcon={isExporting ? undefined : <HiOutlineDownload className="w-4 h-4" />}
                  isLoading={isExporting}
                  onClick={handleExport}
                  className="min-w-[140px]"
                >
                  {isExporting ? "ط·آ¬ط·آ§ط·آ±ط¸ظ¹ ط·آ§ط¸â€‍ط·ع¾ط·آµط·آ¯ط¸ظ¹ط·آ±..." : exportDone ? "ط·ع¾ط¸â€¦ ط·آ§ط¸â€‍ط·ع¾ط·آµط·آ¯ط¸ظ¹ط·آ±!" : "ط·ع¾ط·آµط·آ¯ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ±"}
                </Button>
                {exportDone && (
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-1.5 text-success text-sm font-medium">
                    <HiOutlineCheck className="w-4 h-4" />
                    ط·ع¾ط¸â€¦ ط·آ§ط¸â€‍ط·ع¾ط·آµط·آ¯ط¸ظ¹ط·آ± ط·آ¨ط¸â€ ط·آ¬ط·آ§ط·آ­
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ§ط·آ±ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط¸â€¦ط·آ¬ط·آ¯ط¸ث†ط¸â€‍ط·آ©</CardTitle>
              <Button type="button" size="sm" variant="primary" leftIcon={<HiOutlinePlus className="w-3 h-3" />} onClick={() => setShowScheduleModal(true)}>
                ط·آ¬ط·آ¯ط¸ث†ط¸â€‍ط·آ© ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ±
              </Button>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={HiOutlineClock}
                title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·ع¾ط¸â€ڑط·آ§ط·آ±ط¸ظ¹ط·آ± ط¸â€¦ط·آ¬ط·آ¯ط¸ث†ط¸â€‍ط·آ©"
                description="ط¸ظ¹ط¸â€¦ط¸ئ’ط¸â€ ط¸ئ’ ط·آ¬ط·آ¯ط¸ث†ط¸â€‍ط·آ© ط·ع¾ط¸â€ڑط·آ§ط·آ±ط¸ظ¹ط·آ± ط·آ¯ط¸ث†ط·آ±ط¸ظ¹ط·آ© ط¸â€‍ط·ع¾ط·آµط¸â€‍ط¸ئ’ ط·آ¹ط¸â€‍ط¸â€° ط·آ¨ط·آ±ط¸ظ¹ط·آ¯ط¸ئ’ ط·آ§ط¸â€‍ط·آ¥ط¸â€‍ط¸ئ’ط·ع¾ط·آ±ط¸ث†ط¸â€ ط¸ظ¹"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <Modal isOpen={showScheduleModal} onClose={() => setShowScheduleModal(false)} title="ط·آ¬ط·آ¯ط¸ث†ط¸â€‍ط·آ© ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط·آ¯ط¸ث†ط·آ±ط¸ظ¹" size="md">
        <div className="space-y-4">
          <Select label="ط¸â€ ط¸ث†ط·آ¹ ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ±" options={reportTypes.map((r) => ({ value: r.id, label: r.label }))} placeholder="ط·آ§ط·آ®ط·ع¾ط·آ± ط¸â€ ط¸ث†ط·آ¹ ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ±" />
          <Select label="ط·آ§ط¸â€‍ط·آ¯ط¸ث†ط·آ±ط¸ظ¹ط·آ©" options={[{ value: "daily", label: "ط¸ظ¹ط¸ث†ط¸â€¦ط¸ظ¹" }, { value: "weekly", label: "ط·آ£ط·آ³ط·آ¨ط¸ث†ط·آ¹ط¸ظ¹" }, { value: "monthly", label: "ط·آ´ط¸â€،ط·آ±ط¸ظ¹" }]} placeholder="ط·آ§ط·آ®ط·ع¾ط·آ± ط·آ§ط¸â€‍ط·آ¯ط¸ث†ط·آ±ط¸ظ¹ط·آ©" />
          <Select label="ط·آ§ط¸â€‍ط·آµط¸ظ¹ط·ط›ط·آ©" options={formatOptions} placeholder="ط·آ§ط·آ®ط·ع¾ط·آ± ط·آ§ط¸â€‍ط·آµط¸ظ¹ط·ط›ط·آ©" />
          <div className="flex gap-3 pt-2">
            <Button variant="primary" className="flex-1">ط·آ¬ط·آ¯ط¸ث†ط¸â€‍ط·آ©</Button>
            <Button variant="secondary" onClick={() => setShowScheduleModal(false)}>ط·آ¥ط¸â€‍ط·ط›ط·آ§ط·طŒ</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

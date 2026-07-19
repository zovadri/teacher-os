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
  { id: "summary", label: "طھظ‚ط±ظٹط± ظ…ظ„ط®طµ", icon: HiOutlineDocumentReport, color: "primary", desc: "ظ…ظ„ط®طµ ط´ط§ظ…ظ„ ظ„ط£ط¯ط§ط، ط§ظ„ظ…ظ†طµط©" },
  { id: "students", label: "ط£ط¯ط§ط، ط§ظ„ط·ظ„ط§ط¨", icon: HiOutlineUsers, color: "info", desc: "طھط­ظ„ظٹظ„ ط£ط¯ط§ط، ط§ظ„ط·ظ„ط§ط¨ ظˆطھظ‚ط¯ظ…ظ‡ظ…" },
  { id: "revenue", label: "ط§ظ„ط¥ظٹط±ط§ط¯ط§طھ", icon: HiOutlineCash, color: "success", desc: "طھظ‚ط±ظٹط± ط§ظ„ط¥ظٹط±ط§ط¯ط§طھ ظˆط§ظ„ظ…ط¨ظٹط¹ط§طھ" },
  { id: "attendance", label: "ط§ظ„ط­ط¶ظˆط±", icon: HiOutlineAcademicCap, color: "warning", desc: "ط¥ط­طµط§ط¦ظٹط§طھ ط­ط¶ظˆط± ط§ظ„ط·ظ„ط§ط¨" },
  { id: "exams", label: "طھط­ظ„ظٹظ„ ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ", icon: HiOutlineChartSquareBar, color: "error", desc: "طھط­ظ„ظٹظ„ ظ†طھط§ط¦ط¬ ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ" },
]

const dateRangeOptions = [
  { value: "7", label: "ط¢ط®ط± 7 ط£ظٹط§ظ…" },
  { value: "30", label: "ط¢ط®ط± 30 ظٹظˆظ…" },
  { value: "90", label: "ط¢ط®ط± 3 ط£ط´ظ‡ط±" },
  { value: "365", label: "ط¢ط®ط± ط³ظ†ط©" },
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
      <DashboardHeader title="ط§ظ„طھظ‚ط§ط±ظٹط±" subtitle="ط¥ظ†ط´ط§ط، ظˆطھطµط¯ظٹط± ط§ظ„طھظ‚ط§ط±ظٹط±" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-4">
        <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط¥ظٹط±ط§ط¯ط§طھ" value={formatCurrency(mockAnalytics.monthlyRevenue.reduce((s, m) => s + m.revenue, 0))} icon={HiOutlineCash} color="success" />
        <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط·ظ„ط§ط¨" value={mockStats.totalStudents} icon={HiOutlineUsers} color="primary" />
        <StatsCard title="ط§ظ„ظ…ط¹ط§ظ…ظ„ط§طھ" value={mockPayments.length} icon={HiOutlineChartSquareBar} color="info" />
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-72 space-y-2">
          <h3 className="text-sm font-semibold text-text mb-3">ط£ظ†ظˆط§ط¹ ط§ظ„طھظ‚ط§ط±ظٹط±</h3>
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
                <CardTitle>ظ…ط¹ط§ظٹظ†ط© ط§ظ„طھظ‚ط±ظٹط±</CardTitle>
                <Badge variant="primary" size="sm">{reportTypes.find((r) => r.id === selectedReport)?.label}</Badge>
              </div>
              <CardDescription>ظ…ط¹ط§ظٹظ†ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ ظ‚ط¨ظ„ ط§ظ„طھطµط¯ظٹط±</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedReport === "summary" && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "ط§ظ„ط·ظ„ط§ط¨", value: mockStats.totalStudents, icon: HiOutlineUsers, color: "text-primary" },
                    { label: "ط§ظ„ظƒظˆط±ط³ط§طھ", value: mockStats.totalCourses, icon: HiOutlineAcademicCap, color: "text-info" },
                    { label: "ط§ظ„ط¥ظٹط±ط§ط¯ط§طھ", value: formatCurrency(mockStats.monthlyRevenue), icon: HiOutlineCash, color: "text-success" },
                    { label: "ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ", value: mockStats.totalExams, icon: HiOutlineChartSquareBar, color: "text-warning" },
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
                      <Bar dataKey="passRate" fill="#10B981" radius={[4, 4, 0, 0]} name="ظ†ط³ط¨ط© ط§ظ„ظ†ط¬ط§ط­" />
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
              <CardTitle>ط®ظٹط§ط±ط§طھ ط§ظ„طھطµط¯ظٹط±</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-end gap-4">
                <div className="w-44">
                  <Select label="ظ†ط·ط§ظ‚ ط§ظ„طھط§ط±ظٹط®" options={dateRangeOptions} value={dateRange} onChange={(e) => setDateRange(e.target.value)} />
                </div>
                <div className="w-36">
                  <Select label="ط§ظ„طµظٹط؛ط©" options={formatOptions} value={exportFormat} onChange={(e) => setExportFormat(e.target.value)} />
                </div>
                <button type="button"`nvariant="primary"
                  size="lg"
                  leftIcon={isExporting ? undefined : <HiOutlineDownload className="w-4 h-4" />}
                  isLoading={isExporting}
                  onClick={handleExport}
                  className="min-w-[140px]"
                >
                  {isExporting ? "ط¬ط§ط±ظٹ ط§ظ„طھطµط¯ظٹط±..." : exportDone ? "طھظ… ط§ظ„طھطµط¯ظٹط±!" : "طھطµط¯ظٹط± ط§ظ„طھظ‚ط±ظٹط±"}
                </Button>
                {exportDone && (
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-1.5 text-success text-sm font-medium">
                    <HiOutlineCheck className="w-4 h-4" />
                    طھظ… ط§ظ„طھطµط¯ظٹط± ط¨ظ†ط¬ط§ط­
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ط§ظ„طھظ‚ط§ط±ظٹط± ط§ظ„ظ…ط¬ط¯ظˆظ„ط©</CardTitle>
              <button type="button" size="sm" variant="primary" leftIcon={<HiOutlinePlus className="w-3 h-3" />} onClick={() => setShowScheduleModal(true)}>
                ط¬ط¯ظˆظ„ط© طھظ‚ط±ظٹط±
              </Button>
            </CardHeader>
            <CardContent>
              <EmptyState
                icon={HiOutlineClock}
                title="ظ„ط§ طھظˆط¬ط¯ طھظ‚ط§ط±ظٹط± ظ…ط¬ط¯ظˆظ„ط©"
                description="ظٹظ…ظƒظ†ظƒ ط¬ط¯ظˆظ„ط© طھظ‚ط§ط±ظٹط± ط¯ظˆط±ظٹط© ظ„طھطµظ„ظƒ ط¹ظ„ظ‰ ط¨ط±ظٹط¯ظƒ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹ"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <Modal isOpen={showScheduleModal} onClose={() => setShowScheduleModal(false)} title="ط¬ط¯ظˆظ„ط© طھظ‚ط±ظٹط± ط¯ظˆط±ظٹ" size="md">
        <div className="space-y-4">
          <Select label="ظ†ظˆط¹ ط§ظ„طھظ‚ط±ظٹط±" options={reportTypes.map((r) => ({ value: r.id, label: r.label }))} placeholder="ط§ط®طھط± ظ†ظˆط¹ ط§ظ„طھظ‚ط±ظٹط±" />
          <Select label="ط§ظ„ط¯ظˆط±ظٹط©" options={[{ value: "daily", label: "ظٹظˆظ…ظٹ" }, { value: "weekly", label: "ط£ط³ط¨ظˆط¹ظٹ" }, { value: "monthly", label: "ط´ظ‡ط±ظٹ" }]} placeholder="ط§ط®طھط± ط§ظ„ط¯ظˆط±ظٹط©" />
          <Select label="ط§ظ„طµظٹط؛ط©" options={formatOptions} placeholder="ط§ط®طھط± ط§ظ„طµظٹط؛ط©" />
          <div className="flex gap-3 pt-2">
            <button type="button" variant="primary" className="flex-1">ط¬ط¯ظˆظ„ط©</Button>
            <Button variant="secondary" onClick={() => setShowScheduleModal(false)}>ط¥ظ„ط؛ط§ط،</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineDocumentReport, HiOutlineDownload, HiOutlineEye,
  HiOutlineCalendar, HiOutlineAcademicCap, HiOutlineStar, HiOutlineClipboardCheck,
} from "react-icons/hi"
import toast from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select"
import { CardSkeleton, StatsSkeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { formatDate, det } from "@/lib/utils"
import type { WeeklyReport } from "@/lib/types"

const mockChildren = [
  { id: "s-1", name: "ط·آ·ط¢آ£ط·آ·ط¢آ­ط·آ¸أ¢â‚¬آ¦ط·آ·ط¢آ¯", grade: "ط·آ·ط¢آ«ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ«ط·آ·ط¢آ© ط·آ·ط¢آ«ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ ط·آ¸ط«â€ ط·آ¸ط¸آ¹" },
  { id: "s-2", name: "ط·آ¸أ¢â‚¬آ¦ط·آ·ط¢آ±ط·آ¸ط¸آ¹ط·آ¸أ¢â‚¬آ¦", grade: "ط·آ·ط¢آ«ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ ط·آ¸ط¸آ¹ط·آ·ط¢آ© ط·آ·ط¢آ«ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ ط·آ¸ط«â€ ط·آ¸ط¸آ¹" },
]

const generateWeeklyReports = (studentId: string): WeeklyReport[] => Array.from({ length: 4 }, (_, i) => ({
  id: `wr-${studentId}-${i + 1}`,
  studentId,
  weekStart: new Date(2026, 5 + Math.floor(i / 2), (i % 2) * 7 + 1),
  weekEnd: new Date(2026, 5 + Math.floor(i / 2), (i % 2) * 7 + 7),
  attendanceRate: Math.floor(det() * 15 + 85),
  completedHomework: Math.floor(det() * 3 + 5),
  averageGrade: Math.floor(det() * 15 + 75),
  behavior: ["ط·آ¸أ¢â‚¬آ¦ط·آ¸أ¢â‚¬آ¦ط·آ·ط¹آ¾ط·آ·ط¢آ§ط·آ·ط¢آ²", "ط·آ·ط¢آ¬ط·آ¸ط¸آ¹ط·آ·ط¢آ¯ ط·آ·ط¢آ¬ط·آ·ط¢آ¯ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ¹", "ط·آ·ط¢آ¬ط·آ¸ط¸آ¹ط·آ·ط¢آ¯", "ط·آ¸أ¢â‚¬آ¦ط·آ¸أ¢â‚¬آ¦ط·آ·ط¹آ¾ط·آ·ط¢آ§ط·آ·ط¢آ²"][i],
  notes: ["ط·آ·ط¹آ¾ط·آ¸أ¢â‚¬ع‘ط·آ·ط¢آ¯ط·آ¸أ¢â‚¬آ¦ ط·آ¸أ¢â‚¬آ¦ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ­ط·آ¸ط«â€ ط·آ·ط¢آ¸ ط·آ¸ط¸آ¾ط·آ¸ط¸آ¹ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ£ط·آ·ط¢آ¯ط·آ·ط¢آ§ط·آ·ط·إ’", "ط·آ¸ط¸آ¹ط·آ·ط¢آ­ط·آ·ط¹آ¾ط·آ·ط¢آ§ط·آ·ط¢آ¬ ط·آ¸أ¢â‚¬آ¦ط·آ·ط¢آ±ط·آ·ط¢آ§ط·آ·ط¢آ¬ط·آ·ط¢آ¹ط·آ·ط¢آ© ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬ع‘ط·آ¸ط«â€ ط·آ·ط¢آ§ط·آ·ط¢آ¹ط·آ·ط¢آ¯", "ط·آ¸أ¢â‚¬آ¦ط·آ·ط¢آ´ط·آ·ط¢آ§ط·آ·ط¢آ±ط·آ¸ط¦â€™ط·آ·ط¢آ© ط·آ¸ط¸آ¾ط·آ·ط¢آ¹ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ© ط·آ¸ط¸آ¾ط·آ¸ط¸آ¹ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ­ط·آ·ط¢آµط·آ·ط¢آ©", "ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¹آ¾ط·آ·ط¢آ²ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ¦ ط·آ·ط¢آ¨ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ­ط·آ·ط¢آ¶ط·آ¸ط«â€ ط·آ·ط¢آ±"][i],
}))

export default function ParentReportsPage() {
  const [selectedChild, setSelectedChild] = useState(mockChildren[0].id)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const loadData = useCallback(() => {
    setIsLoading(true)
    setHasError(false)
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  const reports = useMemo(() => generateWeeklyReports(selectedChild), [selectedChild])
  const child = useMemo(() => mockChildren.find((c) => c.id === selectedChild), [selectedChild])

  const aggregatedStats = useMemo(() => {
    if (reports.length === 0) return { avgAttendance: 0, avgGrade: 0, totalHomework: 0 }
    return {
      avgAttendance: Math.round(reports.reduce((s, r) => s + r.attendanceRate, 0) / reports.length),
      avgGrade: Math.round(reports.reduce((s, r) => s + r.averageGrade, 0) / reports.length),
      totalHomework: reports.reduce((s, r) => s + r.completedHomework, 0),
    }
  }, [reports])

  const handleViewFull = (reportId: string) => {
    toast.success("ط·آ·ط¢آ¬ط·آ·ط¢آ§ط·آ·ط¢آ±ط·آ¸ط¸آ¹ ط·آ·ط¹آ¾ط·آ·ط¢آ­ط·آ¸أ¢â‚¬آ¦ط·آ¸ط¸آ¹ط·آ¸أ¢â‚¬â€چ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¹آ¾ط·آ¸أ¢â‚¬ع‘ط·آ·ط¢آ±ط·آ¸ط¸آ¹ط·آ·ط¢آ± ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸ط¦â€™ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ¦ط·آ¸أ¢â‚¬â€چ")
  }

  const handleDownloadPdf = (reportId: string) => {
    toast.success("ط·آ·ط¢آ¬ط·آ·ط¢آ§ط·آ·ط¢آ±ط·آ¸ط¸آ¹ ط·آ·ط¹آ¾ط·آ·ط¢آ­ط·آ¸أ¢â‚¬آ¦ط·آ¸ط¸آ¹ط·آ¸أ¢â‚¬â€چ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¹آ¾ط·آ¸أ¢â‚¬ع‘ط·آ·ط¢آ±ط·آ¸ط¸آ¹ط·آ·ط¢آ± ط·آ·ط¢آ¨ط·آ·ط¢آµط·آ¸ط¸آ¹ط·آ·ط·â€؛ط·آ·ط¢آ© PDF")
  }

  if (hasError) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <DashboardHeader title="ط·آ·ط¹آ¾ط·آ¸أ¢â‚¬ع‘ط·آ·ط¢آ§ط·آ·ط¢آ±ط·آ¸ط¸آ¹ط·آ·ط¢آ± ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ£ط·آ·ط¢آ¨ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ§ط·آ·ط·إ’" subtitle="ط·آ¸أ¢â‚¬آ¦ط·آ·ط¹آ¾ط·آ·ط¢آ§ط·آ·ط¢آ¨ط·آ·ط¢آ¹ط·آ·ط¢آ© ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬آ¦ط·آ·ط¢آ³ط·آ·ط¹آ¾ط·آ¸ط«â€ ط·آ¸أ¢â‚¬آ° ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ¯ط·آ·ط¢آ±ط·آ·ط¢آ§ط·آ·ط¢آ³ط·آ¸ط¸آ¹" />
        <ErrorState onRetry={() => { setHasError(false); loadData() }} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <DashboardHeader title="ط·آ·ط¹آ¾ط·آ¸أ¢â‚¬ع‘ط·آ·ط¢آ§ط·آ·ط¢آ±ط·آ¸ط¸آ¹ط·آ·ط¢آ± ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ£ط·آ·ط¢آ¨ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ§ط·آ·ط·إ’" subtitle="ط·آ¸أ¢â‚¬آ¦ط·آ·ط¹آ¾ط·آ·ط¢آ§ط·آ·ط¢آ¨ط·آ·ط¢آ¹ط·آ·ط¢آ© ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬آ¦ط·آ·ط¢آ³ط·آ·ط¹آ¾ط·آ¸ط«â€ ط·آ¸أ¢â‚¬آ° ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ¯ط·آ·ط¢آ±ط·آ·ط¢آ§ط·آ·ط¢آ³ط·آ¸ط¸آ¹" />

      <div className="max-w-xs">
        <Select
          label="ط·آ·ط¢آ§ط·آ·ط¢آ®ط·آ·ط¹آ¾ط·آ·ط¢آ± ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ§ط·آ·ط¢آ¨ط·آ¸أ¢â‚¬آ "
          options={mockChildren.map((c) => ({ value: c.id, label: `${c.name} - ${c.grade}` }))}
          value={selectedChild}
          onChange={(e) => setSelectedChild(e.target.value)}
        />
      </div>

      {isLoading ? (
        <StatsSkeleton count={3} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCard title="ط·آ¸أ¢â‚¬آ¦ط·آ·ط¹آ¾ط·آ¸ط«â€ ط·آ·ط¢آ³ط·آ·ط¢آ· ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ­ط·آ·ط¢آ¶ط·آ¸ط«â€ ط·آ·ط¢آ±" value={`${aggregatedStats.avgAttendance}%`} icon={HiOutlineCalendar} color="success" subtitle={child?.name} />
          <StatsCard title="ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬آ¦ط·آ·ط¹آ¾ط·آ¸ط«â€ ط·آ·ط¢آ³ط·آ·ط¢آ· ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ¹ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ¦" value={`${aggregatedStats.avgGrade}%`} icon={HiOutlineAcademicCap} color="primary" />
          <StatsCard title="ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸ط«â€ ط·آ·ط¢آ§ط·آ·ط¢آ¬ط·آ·ط¢آ¨ط·آ·ط¢آ§ط·آ·ط¹آ¾ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬آ¦ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ¬ط·آ·ط¢آ²ط·آ·ط¢آ©" value={aggregatedStats.totalHomework} icon={HiOutlineClipboardCheck} color="info" />
        </motion.div>
      )}

      {isLoading ? (
        <CardSkeleton count={2} />
      ) : reports.length === 0 ? (
        <EmptyState icon={HiOutlineDocumentReport} title="ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ§ ط·آ·ط¹آ¾ط·آ¸ط«â€ ط·آ·ط¢آ¬ط·آ·ط¢آ¯ ط·آ·ط¹آ¾ط·آ¸أ¢â‚¬ع‘ط·آ·ط¢آ§ط·آ·ط¢آ±ط·آ¸ط¸آ¹ط·آ·ط¢آ±" description="ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ§ ط·آ·ط¹آ¾ط·آ¸ط«â€ ط·آ·ط¢آ¬ط·آ·ط¢آ¯ ط·آ·ط¹آ¾ط·آ¸أ¢â‚¬ع‘ط·آ·ط¢آ§ط·آ·ط¢آ±ط·آ¸ط¸آ¹ط·آ·ط¢آ± ط·آ·ط¢آ£ط·آ·ط¢آ³ط·آ·ط¢آ¨ط·آ¸ط«â€ ط·آ·ط¢آ¹ط·آ¸ط¸آ¹ط·آ·ط¢آ© ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬طŒط·آ·ط¢آ°ط·آ·ط¢آ§ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ·ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ¨" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report) => (
            <motion.div key={report.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <HiOutlineCalendar className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold text-text">{formatDate(report.weekStart)} - {formatDate(report.weekEnd)}</h3>
                      </div>
                      <Badge variant="info" size="sm">ط·آ·ط¢آ£ط·آ·ط¢آ³ط·آ·ط¢آ¨ط·آ¸ط«â€ ط·آ·ط¢آ¹ط·آ¸ط¸آ¹</Badge>
                    </div>
                    <div className="flex gap-1">
                      <button type="button" onClick={() => handleDownloadPdf(report.id)} className="p-2 rounded-lg hover:bg-surface-secondary text-text-tertiary hover:text-primary transition-colors" title="ط·آ·ط¹آ¾ط·آ·ط¢آ­ط·آ¸أ¢â‚¬آ¦ط·آ¸ط¸آ¹ط·آ¸أ¢â‚¬â€چ PDF">
                        <HiOutlineDownload className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => handleViewFull(report.id)} className="p-2 rounded-lg hover:bg-surface-secondary text-text-tertiary hover:text-primary transition-colors" title="ط·آ·ط¢آ¹ط·آ·ط¢آ±ط·آ·ط¢آ¶ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¹آ¾ط·آ¸أ¢â‚¬ع‘ط·آ·ط¢آ±ط·آ¸ط¸آ¹ط·آ·ط¢آ± ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸ط¦â€™ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ¦ط·آ¸أ¢â‚¬â€چ">
                        <HiOutlineEye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-surface-secondary">
                      <div className="flex items-center gap-2 mb-1">
                        <HiOutlineCalendar className="w-3.5 h-3.5 text-success" />
                        <span className="text-xs text-text-tertiary">ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ³ط·آ·ط¢آ¨ط·آ·ط¢آ© ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ­ط·آ·ط¢آ¶ط·آ¸ط«â€ ط·آ·ط¢آ±</span>
                      </div>
                      <Progress value={report.attendanceRate} size="sm" variant="success" showLabel />
                    </div>
                    <div className="p-3 rounded-lg bg-surface-secondary">
                      <div className="flex items-center gap-2 mb-1">
                        <HiOutlineClipboardCheck className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs text-text-tertiary">ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸ط«â€ ط·آ·ط¢آ§ط·آ·ط¢آ¬ط·آ·ط¢آ¨ط·آ·ط¢آ§ط·آ·ط¹آ¾</span>
                      </div>
                      <p className="text-lg font-bold text-text">{report.completedHomework} ط·آ¸ط«â€ ط·آ·ط¢آ§ط·آ·ط¢آ¬ط·آ·ط¢آ¨</p>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-secondary">
                      <div className="flex items-center gap-2 mb-1">
                        <HiOutlineAcademicCap className="w-3.5 h-3.5 text-warning" />
                        <span className="text-xs text-text-tertiary">ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬آ¦ط·آ·ط¢آ¹ط·آ·ط¢آ¯ط·آ¸أ¢â‚¬â€چ</span>
                      </div>
                      <p className="text-lg font-bold text-text">{report.averageGrade}%</p>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-secondary">
                      <div className="flex items-center gap-2 mb-1">
                        <HiOutlineStar className="w-3.5 h-3.5 text-premium" />
                        <span className="text-xs text-text-tertiary">ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ³ط·آ¸أ¢â‚¬â€چط·آ¸ط«â€ ط·آ¸ط¦â€™</span>
                      </div>
                      <p className="text-lg font-bold text-text">{report.behavior}</p>
                    </div>
                  </div>

                  {report.notes && (
                    <div className="p-3 rounded-lg bg-info-50 dark:bg-info-900/20 border border-info-200 dark:border-info-800">
                      <p className="text-sm text-text-secondary">{report.notes}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-1">
                    <button type="button" variant="primary" size="sm" className="flex-1" leftIcon={<HiOutlineEye className="w-4 h-4" />} onClick={() => handleViewFull(report.id)}>
                      ط·آ·ط¢آ¹ط·آ·ط¢آ±ط·آ·ط¢آ¶ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¹آ¾ط·آ¸أ¢â‚¬ع‘ط·آ·ط¢آ±ط·آ¸ط¸آ¹ط·آ·ط¢آ± ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸ط¦â€™ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ¦ط·آ¸أ¢â‚¬â€چ
                    </Button>
                    <button type="button" variant="secondary" size="sm" leftIcon={<HiOutlineDownload className="w-4 h-4" />} onClick={() => handleDownloadPdf(report.id)}>
                      PDF
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

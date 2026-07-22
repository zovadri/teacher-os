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
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { formatDate, det } from "@/lib/utils"
import type { WeeklyReport } from "@/lib/types"

const mockChildren = [
  { id: "s-1", name: "أحمد", grade: "ثالثة ثانوي" },
  { id: "s-2", name: "مريم", grade: "ثانية ثانوي" },
]

const generateWeeklyReports = (studentId: string): WeeklyReport[] => Array.from({ length: 4 }, (_, i) => ({
  id: `wr-${studentId}-${i + 1}`,
  studentId,
  weekStart: new Date(2026, 5 + Math.floor(i / 2), (i % 2) * 7 + 1),
  weekEnd: new Date(2026, 5 + Math.floor(i / 2), (i % 2) * 7 + 7),
  attendanceRate: Math.floor(det() * 15 + 85),
  completedHomework: Math.floor(det() * 3 + 5),
  averageGrade: Math.floor(det() * 15 + 75),
  behavior: ["ممتاز", "جيد جداً", "جيد", "ممتاز"][i],
  notes: ["تقدم ملحوظ في الأداء", "يحتاج مراجعة القواعد", "مشاركة فعالة في الحصة", "التزام بالحضور"][i],
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
    toast.success("جاري تحميل التقرير الكامل")
  }

  const handleDownloadPdf = (reportId: string) => {
    toast.success("جاري تحميل التقرير بصيغة PDF")
  }

  if (hasError) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <DashboardHeader title="تقارير الأبناء" subtitle="متابعة المستوى الدراسي" />
        <ErrorState onRetry={() => { setHasError(false); loadData() }} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <Breadcrumb items={[{ label: "الامتحانات", href: "/teacher/exams" }, { label: "تفاصيل الامتحان" }]} />
      <DashboardHeader title="تقارير الأبناء" subtitle="متابعة المستوى الدراسي" />

      <div className="max-w-xs">
        <Select
          label="اختر الابن"
          options={mockChildren.map((c) => ({ value: c.id, label: `${c.name} - ${c.grade}` }))}
          value={selectedChild}
          onChange={(e) => setSelectedChild(e.target.value)}
        />
      </div>

      {isLoading ? (
        <StatsSkeleton count={3} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCard title="متوسط الحضور" value={`${aggregatedStats.avgAttendance}%`} icon={HiOutlineCalendar} color="success" subtitle={child?.name} />
          <StatsCard title="المتوسط العام" value={`${aggregatedStats.avgGrade}%`} icon={HiOutlineAcademicCap} color="primary" />
          <StatsCard title="الواجبات المنجزة" value={aggregatedStats.totalHomework} icon={HiOutlineClipboardCheck} color="info" />
        </motion.div>
      )}

      {isLoading ? (
        <CardSkeleton count={2} />
      ) : reports.length === 0 ? (
        <EmptyState icon={HiOutlineDocumentReport} title="لا توجد تقارير" description="لا توجد تقارير أسبوعية لهذا الطالب" />
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
                      <Badge variant="info" size="sm">أسبوعي</Badge>
                    </div>
                    <div className="flex gap-1">
                      <Button onClick={() => handleDownloadPdf(report.id)} className="p-2 rounded-lg hover:bg-surface-secondary text-text-tertiary hover:text-primary transition-colors" title="تحميل PDF">
                        <HiOutlineDownload className="w-4 h-4" />
                      </Button>
                      <Button onClick={() => handleViewFull(report.id)} className="p-2 rounded-lg hover:bg-surface-secondary text-text-tertiary hover:text-primary transition-colors" title="عرض التقرير الكامل">
                        <HiOutlineEye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-surface-secondary">
                      <div className="flex items-center gap-2 mb-1">
                        <HiOutlineCalendar className="w-3.5 h-3.5 text-success" />
                        <span className="text-xs text-text-tertiary">نسبة الحضور</span>
                      </div>
                      <Progress value={report.attendanceRate} size="sm" variant="success" showLabel />
                    </div>
                    <div className="p-3 rounded-lg bg-surface-secondary">
                      <div className="flex items-center gap-2 mb-1">
                        <HiOutlineClipboardCheck className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs text-text-tertiary">الواجبات</span>
                      </div>
                      <p className="text-lg font-bold text-text">{report.completedHomework} واجب</p>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-secondary">
                      <div className="flex items-center gap-2 mb-1">
                        <HiOutlineAcademicCap className="w-3.5 h-3.5 text-warning" />
                        <span className="text-xs text-text-tertiary">المعدل</span>
                      </div>
                      <p className="text-lg font-bold text-text">{report.averageGrade}%</p>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-secondary">
                      <div className="flex items-center gap-2 mb-1">
                        <HiOutlineStar className="w-3.5 h-3.5 text-premium" />
                        <span className="text-xs text-text-tertiary">السلوك</span>
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
                    <Button variant="primary" size="sm" className="flex-1" leftIcon={<HiOutlineEye className="w-4 h-4" />} onClick={() => handleViewFull(report.id)}>
                      عرض التقرير الكامل
                    </Button>
                    <Button variant="secondary" size="sm" leftIcon={<HiOutlineDownload className="w-4 h-4" />} onClick={() => handleDownloadPdf(report.id)}>
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

"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineDocumentReport, HiOutlineUserGroup, HiOutlineAcademicCap,
  HiOutlineCalendar, HiOutlineCash, HiOutlineClipboardList,
  HiOutlineClipboardCheck, HiOutlineTrendingUp, HiOutlineCurrencyDollar,
  HiOutlineDownload, HiOutlinePlus, HiOutlineDocumentText,
} from "react-icons/hi"
import toast from "react-hot-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { PageHeader } from "@/components/ui/PageHeader"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select"
import Input from "@/components/ui/Input"
import { Modal } from "@/components/ui/Modal"
import { Tabs, TabPanel } from "@/components/ui/Tabs"
import { Skeleton, CardSkeleton, StatsSkeleton, TableSkeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { cn, det } from "@/lib/utils"
import type { ReportType, ExportFormat } from "@/lib/types"

const reportTypes: { type: ReportType; label: string; description: string; icon: React.ElementType; color: "primary" | "success" | "warning" | "error" | "info" }[] = [
  { type: "student", label: "تقرير طالب", description: "تقرير مفصل عن أداء طالب معين", icon: HiOutlineUserGroup, color: "primary" },
  { type: "group", label: "تقرير مجموعة", description: "إحصائيات مجموعة دراسية كاملة", icon: HiOutlineUserGroup, color: "success" },
  { type: "teacher", label: "تقرير مدرس", description: "تقرير أداء المدرسين", icon: HiOutlineAcademicCap, color: "info" },
  { type: "attendance", label: "تقرير حضور", description: "سجل حضور وغياب الطلاب", icon: HiOutlineCalendar, color: "warning" },
  { type: "financial", label: "تقرير مالي", description: "التقارير المالية والإيرادات", icon: HiOutlineCash, color: "success" },
  { type: "homework", label: "تقرير واجبات", description: "متابعة أداء الواجبات", icon: HiOutlineClipboardList, color: "primary" },
  { type: "exam", label: "تقرير امتحان", description: "تحليل نتائج الامتحانات", icon: HiOutlineClipboardCheck, color: "error" },
  { type: "revenue", label: "تقرير إيرادات", description: "تحليل الإيرادات الشهرية", icon: HiOutlineTrendingUp, color: "info" },
  { type: "expense", label: "تقرير مصروفات", description: "سجل المصروفات والنفقات", icon: HiOutlineCurrencyDollar, color: "warning" },
]

const recentReports = Array.from({ length: 8 }, (_, i) => ({
  id: `rep-${i + 1}`,
  type: ["student", "financial", "exam", "attendance", "group", "revenue", "expense", "homework"][i] as ReportType,
  title: [`تقرير الطالب ${i + 1}`, "التقرير المالي الشهري", "تحليل امتحان النحو", "تقرير الحضور الأسبوعي", "تقرير المجموعة A", "تقرير الإيرادات", "تقرير المصروفات", "تقرير الواجبات"][i],
  date: new Date(2026, 6, 10 - i),
  format: (["pdf", "excel", "pdf", "print", "excel", "pdf", "excel", "print"] as ExportFormat)[i],
}))

const formatLabels: Record<ExportFormat, string> = { pdf: "PDF", excel: "Excel", print: "طباعة" }

const colorMap: Record<string, string> = {
  primary: "bg-primary/10 text-primary border-primary/20",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  error: "bg-error/10 text-error border-error/20",
  info: "bg-info/10 text-info border-info/20",
}

const badgeColorMap: Record<string, "primary" | "success" | "error" | "info"> = {
  primary: "primary",
  success: "success",
  error: "error",
  info: "info",
}

function useLoadReports() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const load = useCallback(() => {
    setLoading(true)
    setError(null)
    setTimeout(() => {
      try {
        if (det() > 0.1) {
          setLoading(false)
        } else {
          throw new Error("فشل تحميل التقارير")
        }
      } catch (e) {
        setError((e as Error).message)
        setLoading(false)
      }
    }, 600)
  }, [])
  useEffect(() => { load() }, [load])
  return { loading, error, retry: load }
}

export default function ReportsPage() {
  const { loading, error, retry } = useLoadReports()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedReportType, setSelectedReportType] = useState<ReportType>("student")
  const [reportFormat, setReportFormat] = useState<ExportFormat>("pdf")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [detailType, setDetailType] = useState<ReportType | null>(null)

  const handleCreateReport = () => {
    toast.success(`تم إنشاء تقرير ${reportTypes.find((r) => r.type === selectedReportType)?.label} بصيغة ${formatLabels[reportFormat]}`)
    setShowCreateModal(false)
  }

  const handleDownload = (id: string) => {
    toast.success("جاري تحميل التقرير...")
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <PageHeader title="مركز التقارير" description="إنشاء وعرض التقارير" />
        <ErrorState description={error} onRetry={retry} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="مركز التقارير"
        description="إنشاء وعرض جميع أنواع التقارير"
        actions={
          <Button variant="primary" onClick={() => setShowCreateModal(true)} leftIcon={<HiOutlinePlus className="w-4 h-4" />}>
            إنشاء تقرير
          </Button>
        }
      />

      {loading && (
        <div className="space-y-6">
          <Skeleton className="h-[100px] rounded-[24px]" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-[140px] rounded-[24px]" />
            ))}
          </div>
          <TableSkeleton rows={4} cols={3} />
        </div>
      )}

      {!loading && (
        <>
          <StatsCard
            title="التقارير المنشأة هذا الشهر"
            value={recentReports.length}
            icon={HiOutlineDocumentReport}
            color="primary"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTypes.map((rt, i) => (
              <motion.div key={rt.type} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Card hover className="h-full" onClick={() => setDetailType(rt.type)}>
                  <CardContent className="space-y-4">
                    <div className={cn("w-12 h-12 rounded-[16px] flex items-center justify-center backdrop-blur border", colorMap[rt.color])}>
                      <rt.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text">{rt.label}</h3>
                      <p className="text-xs text-text-tertiary mt-1">{rt.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {detailType && (
            <Card>
              <CardHeader>
                <CardTitle>{reportTypes.find((r) => r.type === detailType)?.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <EmptyState icon={HiOutlineDocumentReport} title="لا توجد تقارير بعد" description="لم يتم إنشاء أي تقارير من هذا النوع بعد" />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>أحدث التقارير</CardTitle>
            </CardHeader>
            <CardContent>
              {recentReports.length === 0 ? (
                <EmptyState icon={HiOutlineDocumentReport} title="لا توجد تقارير" description="لم يتم إنشاء أي تقارير بعد" />
              ) : (
                <div className="space-y-2">
                  {recentReports.map((r) => {
                    const rt = reportTypes.find((t) => t.type === r.type)
                    return (
                      <div key={r.id} className="flex items-center justify-between p-3 rounded-[16px] hover:bg-card/40 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-[12px] bg-primary/10 border border-primary/20 flex items-center justify-center">
                            {rt && <rt.icon className="text-primary" size={18} />}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text">{r.title}</p>
                            <p className="text-xs text-text-tertiary">{r.date.toLocaleDateString("ar-EG")}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={r.format === "pdf" ? "error" : r.format === "excel" ? "success" : "info"} size="sm">
                            {formatLabels[r.format]}
                          </Badge>
                          <Button variant="ghost" size="sm" leftIcon={<HiOutlineDownload className="w-4 h-4" />} onClick={() => handleDownload(r.id)}>
                            تحميل
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="إنشاء تقرير جديد" size="md">
        <div className="space-y-4">
          <Select label="نوع التقرير" value={selectedReportType} onChange={(e) => setSelectedReportType(e.target.value as ReportType)} options={reportTypes.map((rt) => ({ value: rt.type, label: rt.label }))} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="من تاريخ" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            <Input label="إلى تاريخ" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </div>
          <Select label="صيغة التقرير" value={reportFormat} onChange={(e) => setReportFormat(e.target.value as ExportFormat)} options={[
            { value: "pdf", label: "PDF" },
            { value: "excel", label: "Excel" },
            { value: "print", label: "طباعة" },
          ]} />
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>إلغاء</Button>
            <Button variant="primary" onClick={handleCreateReport} leftIcon={<HiOutlinePlus className="w-4 h-4" />}>إنشاء التقرير</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

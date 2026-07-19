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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
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

const reportTypes: { type: ReportType; label: string; description: string; icon: React.ElementType; color: string }[] = [
  { type: "student", label: "ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط·آ·ط·آ§ط¸â€‍ط·آ¨", description: "ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط¸â€¦ط¸ظ¾ط·آµط¸â€‍ ط·آ¹ط¸â€  ط·آ£ط·آ¯ط·آ§ط·طŒ ط·آ·ط·آ§ط¸â€‍ط·آ¨ ط¸â€¦ط·آ¹ط¸ظ¹ط¸â€ ", icon: HiOutlineUserGroup, color: "primary" },
  { type: "group", label: "ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط¸â€¦ط·آ¬ط¸â€¦ط¸ث†ط·آ¹ط·آ©", description: "ط·آ¥ط·آ­ط·آµط·آ§ط·آ¦ط¸ظ¹ط·آ§ط·ع¾ ط¸â€¦ط·آ¬ط¸â€¦ط¸ث†ط·آ¹ط·آ© ط·آ¯ط·آ±ط·آ§ط·آ³ط¸ظ¹ط·آ© ط¸ئ’ط·آ§ط¸â€¦ط¸â€‍ط·آ©", icon: HiOutlineUserGroup, color: "success" },
  { type: "teacher", label: "ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط¸â€¦ط·آ¯ط·آ±ط·آ³", description: "ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط·آ£ط·آ¯ط·آ§ط·طŒ ط·آ§ط¸â€‍ط¸â€¦ط·آ¯ط·آ±ط·آ³ط¸ظ¹ط¸â€ ", icon: HiOutlineAcademicCap, color: "info" },
  { type: "attendance", label: "ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط·آ­ط·آ¶ط¸ث†ط·آ±", description: "ط·آ³ط·آ¬ط¸â€‍ ط·آ­ط·آ¶ط¸ث†ط·آ± ط¸ث†ط·ط›ط¸ظ¹ط·آ§ط·آ¨ ط·آ§ط¸â€‍ط·آ·ط¸â€‍ط·آ§ط·آ¨", icon: HiOutlineCalendar, color: "warning" },
  { type: "financial", label: "ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹", description: "ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ§ط·آ±ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ط·آ© ط¸ث†ط·آ§ط¸â€‍ط·آ¥ط¸ظ¹ط·آ±ط·آ§ط·آ¯ط·آ§ط·ع¾", icon: HiOutlineCash, color: "success" },
  { type: "homework", label: "ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط¸ث†ط·آ§ط·آ¬ط·آ¨ط·آ§ط·ع¾", description: "ط¸â€¦ط·ع¾ط·آ§ط·آ¨ط·آ¹ط·آ© ط·آ£ط·آ¯ط·آ§ط·طŒ ط·آ§ط¸â€‍ط¸ث†ط·آ§ط·آ¬ط·آ¨ط·آ§ط·ع¾", icon: HiOutlineClipboardList, color: "primary" },
  { type: "exam", label: "ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€ ", description: "ط·ع¾ط·آ­ط¸â€‍ط¸ظ¹ط¸â€‍ ط¸â€ ط·ع¾ط·آ§ط·آ¦ط·آ¬ ط·آ§ط¸â€‍ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€ ط·آ§ط·ع¾", icon: HiOutlineClipboardCheck, color: "error" },
  { type: "revenue", label: "ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط·آ¥ط¸ظ¹ط·آ±ط·آ§ط·آ¯ط·آ§ط·ع¾", description: "ط·ع¾ط·آ­ط¸â€‍ط¸ظ¹ط¸â€‍ ط·آ§ط¸â€‍ط·آ¥ط¸ظ¹ط·آ±ط·آ§ط·آ¯ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·آ´ط¸â€،ط·آ±ط¸ظ¹ط·آ©", icon: HiOutlineTrendingUp, color: "info" },
  { type: "expense", label: "ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط¸â€¦ط·آµط·آ±ط¸ث†ط¸ظ¾ط·آ§ط·ع¾", description: "ط·آ³ط·آ¬ط¸â€‍ ط·آ§ط¸â€‍ط¸â€¦ط·آµط·آ±ط¸ث†ط¸ظ¾ط·آ§ط·ع¾ ط¸ث†ط·آ§ط¸â€‍ط¸â€ ط¸ظ¾ط¸â€ڑط·آ§ط·ع¾", icon: HiOutlineCurrencyDollar, color: "warning" },
]

const recentReports = Array.from({ length: 8 }, (_, i) => ({
  id: `rep-${i + 1}`,
  type: ["student", "financial", "exam", "attendance", "group", "revenue", "expense", "homework"][i] as ReportType,
  title: [`ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط·آ·ط·آ§ط¸â€‍ط·آ¨ ${i + 1}`, "ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ ط·آ§ط¸â€‍ط·آ´ط¸â€،ط·آ±ط¸ظ¹", "ط·ع¾ط·آ­ط¸â€‍ط¸ظ¹ط¸â€‍ ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€  ط·آ§ط¸â€‍ط¸â€ ط·آ­ط¸ث†", "ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط·آ­ط·آ¶ط¸ث†ط·آ± ط·آ§ط¸â€‍ط·آ£ط·آ³ط·آ¨ط¸ث†ط·آ¹ط¸ظ¹", "ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط¸â€¦ط·آ¬ط¸â€¦ط¸ث†ط·آ¹ط·آ© A", "ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط·آ¥ط¸ظ¹ط·آ±ط·آ§ط·آ¯ط·آ§ط·ع¾", "ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط¸â€¦ط·آµط·آ±ط¸ث†ط¸ظ¾ط·آ§ط·ع¾", "ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط¸ث†ط·آ§ط·آ¬ط·آ¨ط·آ§ط·ع¾"][i],
  date: new Date(2026, 6, 10 - i),
  format: (["pdf", "excel", "pdf", "print", "excel", "pdf", "excel", "print"] as ExportFormat)[i],
}))

const formatLabels: Record<ExportFormat, string> = { pdf: "PDF", excel: "Excel", print: "ط·آ·ط·آ¨ط·آ§ط·آ¹ط·آ©" }

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
          throw new Error("ط¸ظ¾ط·آ´ط¸â€‍ ط·ع¾ط·آ­ط¸â€¦ط¸ظ¹ط¸â€‍ ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ§ط·آ±ط¸ظ¹ط·آ±")
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

  const typeColors: Record<string, "primary" | "success" | "warning" | "error" | "info"> = {
    primary: "primary", success: "success", warning: "warning", error: "error", info: "info",
  }

  const handleCreateReport = () => {
    toast.success(`ط·ع¾ط¸â€¦ ط·آ¥ط¸â€ ط·آ´ط·آ§ط·طŒ ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ${reportTypes.find((r) => r.type === selectedReportType)?.label} ط·آ¨ط·آµط¸ظ¹ط·ط›ط·آ© ${formatLabels[reportFormat]}`)
    setShowCreateModal(false)
  }

  const handleDownload = (id: string) => {
    toast.success("ط·آ¬ط·آ§ط·آ±ط¸ظ¹ ط·ع¾ط·آ­ط¸â€¦ط¸ظ¹ط¸â€‍ ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ±...")
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <PageHeader title="ط¸â€¦ط·آ±ط¸ئ’ط·آ² ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ§ط·آ±ط¸ظ¹ط·آ±" description="ط·آ¥ط¸â€ ط·آ´ط·آ§ط·طŒ ط¸ث†ط·آ¹ط·آ±ط·آ¶ ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ§ط·آ±ط¸ظ¹ط·آ±" />
        <ErrorState error={error} onRetry={retry} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <PageHeader
        title="ط¸â€¦ط·آ±ط¸ئ’ط·آ² ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ§ط·آ±ط¸ظ¹ط·آ±"
        description="ط·آ¥ط¸â€ ط·آ´ط·آ§ط·طŒ ط¸ث†ط·آ¹ط·آ±ط·آ¶ ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¹ ط·آ£ط¸â€ ط¸ث†ط·آ§ط·آ¹ ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ§ط·آ±ط¸ظ¹ط·آ±"
        actions={
          <Button variant="primary" onClick={() => setShowCreateModal(true)} rightIcon={<HiOutlinePlus size={18} />}>
            ط·آ¥ط¸â€ ط·آ´ط·آ§ط·طŒ ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ±
          </Button>
        }
      />

      {loading && (
        <>
          <StatsSkeleton count={1} />
          <CardSkeleton count={3} />
          <div className="mt-6"><TableSkeleton rows={4} columns={3} /></div>
        </>
      )}

      {!loading && (
        <>
          <StatsCard
            title="ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ§ط·آ±ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط¸â€¦ط¸â€ ط·آ´ط·آ£ط·آ© ط¸â€،ط·آ°ط·آ§ ط·آ§ط¸â€‍ط·آ´ط¸â€،ط·آ±"
            value={recentReports.length}
            icon={HiOutlineDocumentReport}
            color="primary"
            subtitle={`ط·آ¢ط·آ®ط·آ± ط·ع¾ط·آ­ط·آ¯ط¸ظ¹ط·آ«: ${new Date().toLocaleDateString("ar-EG")}`}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTypes.map((rt, i) => (
              <motion.div key={rt.type} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Card hover className="h-full" onClick={() => setDetailType(rt.type)}>
                  <CardContent className="space-y-3">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", `bg-${rt.color === "primary" ? "primary" : rt.color === "success" ? "emerald" : rt.color === "warning" ? "amber" : rt.color === "error" ? "red" : "blue"}-100 text-${rt.color === "primary" ? "primary" : rt.color === "success" ? "emerald" : rt.color === "warning" ? "amber" : rt.color === "error" ? "red" : "blue"}-600`)}>
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
                <CardDescription>ط·ع¾ط¸ظ¾ط·آ§ط·آµط¸ظ¹ط¸â€‍ ط¸ث†ط·آ¹ط·آ±ط·آ¶ ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ§ط·آ±ط¸ظ¹ط·آ±</CardDescription>
              </CardHeader>
              <CardContent>
                <EmptyState icon={HiOutlineDocumentReport} title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·ع¾ط¸â€ڑط·آ§ط·آ±ط¸ظ¹ط·آ± ط·آ¨ط·آ¹ط·آ¯" description="ط¸â€‍ط¸â€¦ ط¸ظ¹ط·ع¾ط¸â€¦ ط·آ¥ط¸â€ ط·آ´ط·آ§ط·طŒ ط·آ£ط¸ظ¹ ط·ع¾ط¸â€ڑط·آ§ط·آ±ط¸ظ¹ط·آ± ط¸â€¦ط¸â€  ط¸â€،ط·آ°ط·آ§ ط·آ§ط¸â€‍ط¸â€ ط¸ث†ط·آ¹ ط·آ¨ط·آ¹ط·آ¯" />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><HiOutlineDocumentText className="text-primary" size={20} />ط·آ£ط·آ­ط·آ¯ط·آ« ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ§ط·آ±ط¸ظ¹ط·آ±</CardTitle>
            </CardHeader>
            <CardContent>
              {recentReports.length === 0 ? (
                <EmptyState icon={HiOutlineDocumentReport} title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·ع¾ط¸â€ڑط·آ§ط·آ±ط¸ظ¹ط·آ±" description="ط¸â€‍ط¸â€¦ ط¸ظ¹ط·ع¾ط¸â€¦ ط·آ¥ط¸â€ ط·آ´ط·آ§ط·طŒ ط·آ£ط¸ظ¹ ط·ع¾ط¸â€ڑط·آ§ط·آ±ط¸ظ¹ط·آ± ط·آ¨ط·آ¹ط·آ¯" />
              ) : (
                <div className="space-y-2">
                  {recentReports.map((r) => {
                    const rt = reportTypes.find((t) => t.type === r.type)
                    return (
                      <div key={r.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-secondary transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                            {rt && <rt.icon className="text-primary" size={18} />}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text">{r.title}</p>
                            <p className="text-xs text-text-tertiary">{r.date.toLocaleDateString("ar-EG")}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={r.format === "pdf" ? "error" : r.format === "excel" ? "success" : "info"} size="sm">{formatLabels[r.format]}</Badge>
                          <Button variant="ghost" size="sm" onClick={() => handleDownload(r.id)} rightIcon={<HiOutlineDownload size={16} />}>ط·ع¾ط·آ­ط¸â€¦ط¸ظ¹ط¸â€‍</Button>
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

      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="ط·آ¥ط¸â€ ط·آ´ط·آ§ط·طŒ ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯" size="md">
        <div className="space-y-4">
          <Select label="ط¸â€ ط¸ث†ط·آ¹ ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ±" value={selectedReportType} onChange={(e) => setSelectedReportType(e.target.value as ReportType)} options={reportTypes.map((rt) => ({ value: rt.type, label: rt.label }))} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="ط¸â€¦ط¸â€  ط·ع¾ط·آ§ط·آ±ط¸ظ¹ط·آ®" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            <Input label="ط·آ¥ط¸â€‍ط¸â€° ط·ع¾ط·آ§ط·آ±ط¸ظ¹ط·آ®" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </div>
          <Select label="ط·آµط¸ظ¹ط·ط›ط·آ© ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ±" value={reportFormat} onChange={(e) => setReportFormat(e.target.value as ExportFormat)} options={[
            { value: "pdf", label: "PDF" },
            { value: "excel", label: "Excel" },
            { value: "print", label: "ط·آ·ط·آ¨ط·آ§ط·آ¹ط·آ©" },
          ]} />
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>ط·آ¥ط¸â€‍ط·ط›ط·آ§ط·طŒ</Button>
            <Button variant="primary" onClick={handleCreateReport} rightIcon={<HiOutlinePlus size={18} />}>ط·آ¥ط¸â€ ط·آ´ط·آ§ط·طŒ ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ±</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

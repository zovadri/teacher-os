"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineUpload, HiOutlineDownload, HiOutlineDocumentText,
  HiOutlineTable, HiOutlineDocument, HiOutlineCheckCircle,
  HiOutlineXCircle, HiOutlineClock, HiOutlineFilter,
  HiOutlineEye, HiOutlineRefresh,
} from "react-icons/hi"
import toast from "react-hot-toast"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Table } from "@/components/ui/Table"
import { Progress } from "@/components/ui/Progress"
import { EmptyState } from "@/components/ui/EmptyState"

const dataTypes = ["الطلاب", "الكورسات", "الامتحانات", "الأقساط", "الأكواد", "الموظفين"]
const exportTypes = ["Excel", "PDF", "CSV"]

const importHistory = [
  { id: "im1", date: "2026-07-18 10:30", type: "الطلاب", rows: 45, status: "success" as const },
  { id: "im2", date: "2026-07-17 14:00", type: "الكورسات", rows: 12, status: "success" as const },
  { id: "im3", date: "2026-07-16 09:15", type: "الأقساط", rows: 30, status: "partial" as const },
  { id: "im4", date: "2026-07-15 11:45", type: "الامتحانات", rows: 0, status: "failed" as const },
  { id: "im5", date: "2026-07-14 08:00", type: "الموظفين", rows: 8, status: "success" as const },
  { id: "im6", date: "2026-07-13 16:30", type: "الأكواد", rows: 25, status: "success" as const },
  { id: "im7", date: "2026-07-12 13:00", type: "الطلاب", rows: 20, status: "partial" as const },
  { id: "im8", date: "2026-07-11 10:00", type: "الكورسات", rows: 5, status: "success" as const },
]

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function ImportExportPage() {
  const [importType, setImportType] = useState("الطلاب")
  const [exportType, setExportType] = useState("Excel")
  const [exportDataType, setExportDataType] = useState("الطلاب")
  const [importing, setImporting] = useState(false)

  const handleImport = () => {
    setImporting(true)
    setTimeout(() => {
      setImporting(false)
      toast.success(`تم استيراد بيانات ${importType} بنجاح`)
    }, 2000)
  }

  const handleExport = () => {
    toast.success(`تم تصدير ${exportDataType} بصيغة ${exportType}`)
  }

  const stats = {
    totalImports: importHistory.length,
    success: importHistory.filter((i) => i.status === "success").length,
    failed: importHistory.filter((i) => i.status === "failed").length,
    totalExports: 24,
  }

  return (
    <div className="min-h-screen">
      <Breadcrumb items={[{ label: "البيانات", href: "/teacher/data/import-export" }, { label: "استيراد وتصدير" }]} />
      <DashboardHeader title="مركز الاستيراد والتصدير" subtitle="استيراد وتصدير البيانات - Excel - CSV - PDF" />
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <StatsCard title="إجمالي الاستيراد" value={stats.totalImports} icon={HiOutlineUpload} color="primary" />
            <StatsCard title="ناجح" value={stats.success} icon={HiOutlineCheckCircle} color="success" />
            <StatsCard title="فاشل" value={stats.failed} icon={HiOutlineXCircle} color="error" />
            <StatsCard title="إجمالي التصدير" value={stats.totalExports} icon={HiOutlineDownload} color="info" />
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle>استيراد بيانات</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-all">
                  <HiOutlineUpload className="w-10 h-10 mx-auto text-text-tertiary mb-3" />
                  <p className="text-sm text-text-secondary mb-1">اسحب وأفلت الملف هنا</p>
                  <p className="text-xs text-text-tertiary mb-3">أو انقر لاختيار ملف (Excel, CSV)</p>
                  <label className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-medium cursor-pointer hover:bg-primary-dark transition-all inline-block">
                    اختر ملف
                    <input type="file" className="hidden" accept=".xlsx,.xls,.csv" onChange={() => toast.success("تم رفع الملف")} />
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-text-tertiary">نوع البيانات:</span>
                  <select value={importType} onChange={(e) => setImportType(e.target.value)}
                    className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >{dataTypes.map((t) => <option key={t} value={t}>{t}</option>)}</select>
                  <button type="button" onClick={handleImport} disabled={importing}
                    className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-all disabled:opacity-50 flex items-center gap-2"
                  >{importing ? "جاري الاستيراد..." : "بدء الاستيراد"}</button>
                </div>
                {importing && <Progress value={65} size="sm" />}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>تصدير بيانات</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {exportTypes.map((et) => (
                    <button type="button" key={et} onClick={() => setExportType(et)}
                      className={`p-4 rounded-xl border text-center transition-all ${exportType === et ? "border-primary bg-primary/10" : "border-border hover:bg-surface-secondary"}`}
                    >
                      <HiOutlineDocumentText className="w-6 h-6 mx-auto mb-1 text-primary" />
                      <span className="text-xs font-medium text-text">{et}</span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-text-tertiary">البيانات:</span>
                  <select value={exportDataType} onChange={(e) => setExportDataType(e.target.value)}
                    className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >{dataTypes.map((t) => <option key={t} value={t}>{t}</option>)}</select>
                  <button type="button" onClick={handleExport}
                    className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-all flex items-center gap-2"
                  ><HiOutlineDownload className="w-4 h-4" /> تصدير</button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader><CardTitle>سجل الاستيراد</CardTitle></CardHeader>
              <CardContent>
                {importHistory.length === 0 ? (
                  <EmptyState icon={HiOutlineUpload} title="لا يوجد سجل استيراد" description="لم يتم استيراد أي بيانات بعد" />
                ) : (
                  <Table
                    columns={[
                      { key: "date", header: "التاريخ" },
                      { key: "type", header: "نوع البيانات" },
                      { key: "rows", header: "عدد السجلات" },
                      { key: "status", header: "الحالة", render: (h) => {
                        const variants: Record<string, "success" | "warning" | "error"> = { success: "success", partial: "warning", failed: "error" }
                        const labels: Record<string, string> = { success: "ناجح", partial: "جزئي", failed: "فاشل" }
                        return <Badge variant={variants[h.status]}>{labels[h.status]}</Badge>
                      }},
                    ]}
                    data={importHistory}
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

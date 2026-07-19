"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HiDownload, HiPrinter, HiMail, HiUser, HiChartBar, HiCheckCircle, HiExclamationCircle, HiStar } from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { PageHeader } from "@/components/ui/PageHeader"
import { toast } from "react-hot-toast"

interface StudentReport {
  id: string
  name: string
  grade: string
  attendance: number
  totalClasses: number
  gpa: number
  rank: number
  totalStudents: number
  strengths: string[]
  weaknesses: string[]
  teacherNotes: string
  lastUpdated: string
}

const reports: StudentReport[] = [
  {
    id: "s1", name: "أحمد محمود", grade: "الثالث الثانوي", attendance: 22, totalClasses: 25,
    gpa: 88.5, rank: 5, totalStudents: 120,
    strengths: ["الكيمياء - الباب الأول", "الفيزياء - الكهربية", "الرياضيات - التفاضل"],
    weaknesses: ["العربي - النحو", "الإنجليزي - Reading"],
    teacherNotes: "طالب مجتهد ويحتاج تركيز أكثر على اللغة العربية.",
    lastUpdated: "2026-07-18",
  },
  {
    id: "s2", name: "مريم حسن", grade: "الثالث الثانوي", attendance: 24, totalClasses: 25,
    gpa: 94.2, rank: 1, totalStudents: 120,
    strengths: ["جميع المواد - تفوق ملحوظ", "الرياضيات - التكامل", "الكيمياء - التحليل"],
    weaknesses: [],
    teacherNotes: "طالبة متفوقة جداً. يرجى الاستمرار بنفس المستوى.",
    lastUpdated: "2026-07-17",
  },
  {
    id: "s3", name: "خالد علي", grade: "الثاني الثانوي", attendance: 18, totalClasses: 25,
    gpa: 65.3, rank: 78, totalStudents: 120,
    strengths: ["الفيزياء - الميكانيكا"],
    weaknesses: ["الكيمياء - الاتزان", "الرياضيات - التفاضل", "العربي - البلاغة"],
    teacherNotes: "الطالب يحتاج متابعة مستمرة في المنزل. الحضور غير منتظم.",
    lastUpdated: "2026-07-18",
  },
]

export default function ParentReportsPage() {
  const [selectedReport, setSelectedReport] = useState<StudentReport | null>(null)
  const [sending, setSending] = useState(false)

  const sendReport = (report: StudentReport) => {
    setSending(true)
    setTimeout(() => {
      setSending(false)
      toast.success(`تم إرسال التقرير إلى ولي أمر ${report.name}`)
    }, 1500)
  }

  const getGradeBadge = (gpa: number) => {
    if (gpa >= 90) return { label: "ممتاز", color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" }
    if (gpa >= 80) return { label: "جيد جداً", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" }
    if (gpa >= 70) return { label: "جيد", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" }
    if (gpa >= 60) return { label: "مقبول", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" }
    return { label: "ضعيف", color: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface to-surface-secondary">
      <DashboardHeader />
      <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <PageHeader title="تقارير أولياء الأمور" description="إنشاء وإرسال تقارير أداء الطلاب لأولياء الأمور" breadcrumbs={[{ label: "التقارير", href: "/teacher/reports" }, { label: "تقارير أولياء الأمور" }]} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-text flex items-center gap-2">
              <HiUser className="w-5 h-5 text-primary" /> الطلاب
            </h2>
            {reports.map((report, i) => {
              const badge = getGradeBadge(report.gpa)
              return (
                <motion.div key={report.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className={`bg-surface rounded-xl border p-4 cursor-pointer transition-all ${selectedReport?.id === report.id ? "border-primary shadow-sm" : "border-border hover:border-primary/30"}`}
                  onClick={() => setSelectedReport(report)}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-text">{report.name}</p>
                    <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${badge.color}`}>{badge.label}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-text-tertiary">
                    <span>{report.grade}</span>
                    <span>حضور: {report.attendance}/{report.totalClasses}</span>
                    <span>المعدل: {report.gpa}%</span>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {selectedReport && (
            <motion.div key={selectedReport.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-surface rounded-2xl border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-text">{selectedReport.name}</h3>
                    <p className="text-sm text-text-secondary">{selectedReport.grade}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-3xl font-bold text-primary">{selectedReport.gpa}%</p>
                    <p className="text-xs text-text-tertiary">الترتيب: {selectedReport.rank} من {selectedReport.totalStudents}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-surface-secondary border border-border">
                    <div className="flex items-center gap-2 text-xs text-text-tertiary mb-1">
                      <HiCheckCircle className="w-3.5 h-3.5 text-emerald-500" /> الحضور
                    </div>
                    <p className="text-lg font-bold text-text">{selectedReport.attendance}/{selectedReport.totalClasses}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-secondary border border-border">
                    <div className="flex items-center gap-2 text-xs text-text-tertiary mb-1">
                      <HiChartBar className="w-3.5 h-3.5 text-primary" /> نسبة النجاح
                    </div>
                    <p className="text-lg font-bold text-text">{Math.round((selectedReport.attendance / selectedReport.totalClasses) * 100)}%</p>
                  </div>
                </div>
                {selectedReport.strengths.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-emerald-600 mb-2 flex items-center gap-1">
                      <HiStar className="w-3.5 h-3.5" /> نقاط القوة
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedReport.strengths.map((s) => (
                        <span key={s} className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg text-[10px] font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedReport.weaknesses.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-red-600 mb-2 flex items-center gap-1">
                      <HiExclamationCircle className="w-3.5 h-3.5" /> يحتاج تحسين
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedReport.weaknesses.map((w) => (
                        <span key={w} className="px-2 py-0.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-[10px] font-medium">{w}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50">
                  <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-1">ملاحظات المدرس</p>
                  <p className="text-xs text-amber-600 dark:text-amber-300">{selectedReport.teacherNotes}</p>
                </div>
              </div>
              <div className="p-4 flex gap-2">
                <button type="button" onClick={() => { toast.success("جاري تحضير التقرير للطباعة") }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border text-sm font-medium text-text hover:bg-surface-secondary transition-colors">
                  <HiPrinter className="w-4 h-4" /> طباعة
                </button>
                <button type="button" onClick={() => { toast.success("تم تحميل التقرير") }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border text-sm font-medium text-text hover:bg-surface-secondary transition-colors">
                  <HiDownload className="w-4 h-4" /> PDF
                </button>
                <button type="button" onClick={() => sendReport(selectedReport)} disabled={sending}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50">
                  <HiMail className="w-4 h-4" /> {sending ? "جاري الإرسال..." : "إرسال لولي الأمر"}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

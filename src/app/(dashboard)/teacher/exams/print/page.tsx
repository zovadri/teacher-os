"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import {
  HiOutlinePrinter, HiOutlineDocumentDuplicate,
  HiOutlineDocumentText, HiOutlineAdjustments,
  HiOutlineEye,
} from "react-icons/hi"
import toast from "react-hot-toast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { PageHeader } from "@/components/ui/PageHeader"
import { Badge } from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select"
import { Modal } from "@/components/ui/Modal"
import { Skeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { mockExams, mockExamVersions } from "@/lib/mock/data"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { cn, det } from "@/lib/utils"
import type { PrintConfig, ExamVersion } from "@/lib/types"

function useLoadExams() {
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
          throw new Error("فشل تحميل الامتحانات")
        }
      } catch (e) {
        setError((e as Error).message)
        setLoading(false)
      }
    }, 500)
  }, [])
  useEffect(() => { load() }, [load])
  return { loading, error, retry: load }
}

const typeLabels: Record<string, string> = {
  "multiple-choice": "اختيار من متعدد",
  "true-false": "صواب/خطأ",
  "fill-blank": "ملء الفراغ",
  essay: "مقالي",
  ordering: "ترتيب",
  matching: "مطابقة",
}

export default function PrintExamPage() {
  const { loading, error, retry } = useLoadExams()
  const [selectedExamId, setSelectedExamId] = useState("")
  const [config, setConfig] = useState<PrintConfig>({
    includeHeader: true,
    includeFooter: true,
    includeStudentInfo: true,
    showAnswers: false,
    showGrade: true,
    fontSize: "medium",
    columns: 1,
  })
  const [showMultiPrint, setShowMultiPrint] = useState(false)
  const [selectedVersions, setSelectedVersions] = useState<string[]>([])

  const examOptions = useMemo(() => [
    { value: "", label: "اختر الامتحان..." },
    ...mockExams.map((e) => ({ value: e.id, label: e.title })),
  ], [])

  const selectedExam = useMemo(() => mockExams.find((e) => e.id === selectedExamId), [selectedExamId])

  const versionsForExam = useMemo(() => {
    if (!selectedExamId) return []
    return mockExamVersions.filter((v) => v.examId === selectedExamId)
  }, [selectedExamId])

  const toggleConfig = (key: keyof PrintConfig) => {
    setConfig((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handlePrint = () => {
    if (!selectedExam) return
    toast.success("جاري تحضير الطباعة...")
  }

  const handlePrintAnswerSheet = () => {
    if (!selectedExam) return
    toast.success("جاري طباعة كراسة الإجابة...")
  }

  const handleMultiPrint = () => {
    if (selectedVersions.length === 0) {
      toast.error("يرجى اختيار نسخة واحدة على الأقل")
      return
    }
    toast.success(`جاري طباعة ${selectedVersions.length} نسخ`)
    setShowMultiPrint(false)
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <PageHeader title="طباعة الامتحان" description="إعدادات طباعة الامتحانات والاختبارات" />
        <ErrorState error={error} onRetry={retry} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <Breadcrumb items={[{ label: "الامتحانات", href: "/teacher/exams" }, { label: "طباعة الامتحان" }]} />
      <PageHeader
        title="طباعة الامتحان"
        description="إعدادات طباعة الامتحانات والاختبارات"
        actions={
          <div className="flex gap-2">
            <Button variant="success" onClick={handlePrint} rightIcon={<HiOutlinePrinter size={18} />}>
              طباعة
            </Button>
            <Button variant="primary" onClick={handlePrintAnswerSheet} rightIcon={<HiOutlineDocumentText size={18} />}>
              طباعة كراسة الإجابة
            </Button>
            <Button variant="outline" onClick={() => setShowMultiPrint(true)} rightIcon={<HiOutlineDocumentDuplicate size={18} />}>
              طباعة نسخ متعددة
            </Button>
          </div>
        }
      />

      <Card>
        <CardContent className="space-y-4">
          <Select label="اختر الامتحان" options={examOptions} value={selectedExamId} onChange={(e) => setSelectedExamId(e.target.value)} />
        </CardContent>
      </Card>

      {loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card><CardContent className="space-y-4"><Skeleton className="h-6 w-1/3" />{Array.from({ length: 6 }, (_, i) => <Skeleton key={i} className="h-10 w-full" />)}</CardContent></Card>
          <Card><CardContent className="space-y-4"><Skeleton className="h-6 w-1/3" /><Skeleton className="h-80 w-full" /></CardContent></Card>
        </div>
      )}

      {!loading && !selectedExam && (
        <EmptyState icon={HiOutlinePrinter} title="اختر امتحاناً" description="اختر امتحاناً من القائمة أعلاه لبدء إعدادات الطباعة" />
      )}

      {!loading && selectedExam && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><HiOutlineAdjustments className="text-primary" size={20} />إعدادات الطباعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary">
                <span className="text-sm text-text">عرض الرأس والتذييل</span>
                <button type="button" onClick={() => toggleConfig("includeHeader")} className={cn("w-10 h-5 rounded-full transition-colors relative", config.includeHeader ? "bg-primary" : "bg-surface-tertiary")}>
                  <span className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all", config.includeHeader ? "left-0.5" : "right-0.5")} />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary">
                <span className="text-sm text-text">إظهار الإجابات</span>
                <button type="button" onClick={() => toggleConfig("showAnswers")} className={cn("w-10 h-5 rounded-full transition-colors relative", config.showAnswers ? "bg-primary" : "bg-surface-tertiary")}>
                  <span className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all", config.showAnswers ? "left-0.5" : "right-0.5")} />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary">
                <span className="text-sm text-text">إظهار الدرجات</span>
                <button type="button" onClick={() => toggleConfig("showGrade")} className={cn("w-10 h-5 rounded-full transition-colors relative", config.showGrade ? "bg-primary" : "bg-surface-tertiary")}>
                  <span className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all", config.showGrade ? "left-0.5" : "right-0.5")} />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary">
                <span className="text-sm text-text">معلومات الطالب</span>
                <button type="button" onClick={() => toggleConfig("includeStudentInfo")} className={cn("w-10 h-5 rounded-full transition-colors relative", config.includeStudentInfo ? "bg-primary" : "bg-surface-tertiary")}>
                  <span className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all", config.includeStudentInfo ? "left-0.5" : "right-0.5")} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Select label="حجم الخط" options={[{ value: "small", label: "صغير" }, { value: "medium", label: "متوسط" }, { value: "large", label: "كبير" }]} value={config.fontSize} onChange={(e) => setConfig((p) => ({ ...p, fontSize: e.target.value as "small" | "medium" | "large" }))} />
                <Select label="عدد الأعمدة" options={[{ value: "1", label: "عمود واحد" }, { value: "2", label: "عمودان" }]} value={String(config.columns)} onChange={(e) => setConfig((p) => ({ ...p, columns: Number(e.target.value) as 1 | 2 }))} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><HiOutlineEye className="text-primary" size={20} />معاينة الطباعة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn("border border-border rounded-xl p-6 bg-white space-y-4", config.fontSize === "small" ? "text-xs" : config.fontSize === "large" ? "text-base" : "text-sm")}>
                {config.includeHeader && (
                  <div className="text-center border-b border-border pb-3 mb-3">
                    <h3 className="font-bold text-text text-lg">{selectedExam.title}</h3>
                    <p className="text-text-tertiary">{selectedExam.questions.length} أسئلة | {selectedExam.totalGrade} درجة | المدة: {selectedExam.duration} دقيقة</p>
                  </div>
                )}
                {config.includeStudentInfo && (
                  <div className="grid grid-cols-2 gap-3 text-sm border-b border-border pb-3 mb-3">
                    <div><span className="text-text-tertiary">اسم الطالب: </span><span className="border-b border-dotted border-text-tertiary px-4">............</span></div>
                    <div><span className="text-text-tertiary">التاريخ: </span><span className="border-b border-dotted border-text-tertiary px-4">............</span></div>
                  </div>
                )}
                <div className={cn(config.columns === 2 ? "grid grid-cols-2 gap-4" : "space-y-3")}>
                  {selectedExam.questions.slice(0, 6).map((q, idx) => (
                    <div key={q.id} className="p-3 rounded-lg bg-surface-secondary">
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-text shrink-0">{idx + 1}.</span>
                        <div>
                          <p className="text-text">{q.text}</p>
                          <div className="flex gap-2 mt-1">
                            <Badge size="sm" variant="info">{typeLabels[q.type]}</Badge>
                            {config.showGrade && <Badge size="sm">{q.grade} درجات</Badge>}
                          </div>
                          {config.showAnswers && q.choices && (
                            <div className="mt-2 p-2 rounded-lg bg-success/5 border border-success/20">
                              <span className="text-success text-xs">الإجابة: {q.choices.find((c) => c.isCorrect)?.text}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {selectedExam.questions.length > 6 && (
                    <p className="text-center text-text-tertiary text-sm">... و {selectedExam.questions.length - 6} أسئلة أخرى</p>
                  )}
                </div>
                {config.includeFooter && (
                  <div className="text-center border-t border-border pt-3 mt-3 text-text-tertiary text-xs">
                    <p>TeacherOS - نظام تشغيل المدرس | الصفحة 1 من 1</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Modal isOpen={showMultiPrint} onClose={() => setShowMultiPrint(false)} title="طباعة نسخ متعددة" size="md">
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">اختر النسخ التي تريد طباعتها:</p>
          {versionsForExam.length === 0 ? (
            <p className="text-text-tertiary text-sm">لا توجد نسخ متاحة لهذا الامتحان</p>
          ) : (
            <div className="space-y-2">
              {versionsForExam.map((v) => (
                <label key={v.id} className={cn("flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors", selectedVersions.includes(v.id) ? "border-primary bg-primary/5" : "border-border hover:bg-surface-secondary")}>
                  <input type="checkbox" checked={selectedVersions.includes(v.id)} onChange={() => setSelectedVersions((p) => p.includes(v.id) ? p.filter((id) => id !== v.id) : [...p, v.id])} className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                  <div>
                    <span className="text-sm font-medium text-text">{v.label}</span>
                    <p className="text-xs text-text-tertiary">{v.questions.length} أسئلة - {v.totalGrade} درجة</p>
                  </div>
                </label>
              ))}
            </div>
          )}
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowMultiPrint(false)}>إلغاء</Button>
            <Button variant="primary" onClick={handleMultiPrint} disabled={selectedVersions.length === 0} rightIcon={<HiOutlinePrinter size={18} />}>طباعة ({selectedVersions.length})</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

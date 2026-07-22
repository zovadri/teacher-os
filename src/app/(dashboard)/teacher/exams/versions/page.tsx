"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineDocumentDuplicate, HiOutlinePrinter, HiOutlineEye,
  HiOutlinePlus, HiOutlineScale,
  HiOutlineTemplate, HiOutlineStatusOffline,
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
import type { ExamVersion } from "@/lib/types"

function useLoadVersions() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<ExamVersion[]>([])

  const load = useCallback(() => {
    setLoading(true)
    setError(null)
    setTimeout(() => {
      try {
        if (det() > 0.1) {
          setData(mockExamVersions)
        } else {
          throw new Error("فشل تحميل النسخ")
        }
      } catch (e) {
        setError((e as Error).message)
      } finally {
        setLoading(false)
      }
    }, 800)
  }, [])

  useEffect(() => { load() }, [load])

  return { data, loading, error, retry: load }
}

const typeLabels: Record<string, string> = {
  "multiple-choice": "اختيار من متعدد",
  "true-false": "صواب/خطأ",
  "fill-blank": "ملء الفراغ",
  essay: "مقالي",
  ordering: "ترتيب",
  matching: "مطابقة",
}

const difficultyColors: Record<string, "success" | "warning" | "error"> = {
  easy: "success",
  medium: "warning",
  hard: "error",
}

export default function ExamVersionsPage() {
  const { data: versions, loading, error, retry } = useLoadVersions()
  const [selectedExamId, setSelectedExamId] = useState("")
  const [previewVersion, setPreviewVersion] = useState<ExamVersion | null>(null)
  const [compareVersionA, setCompareVersionA] = useState<string>("")
  const [compareVersionB, setCompareVersionB] = useState<string>("")
  const [showCompare, setShowCompare] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  const examOptions = useMemo(() => [
    { value: "", label: "اختر الامتحان..." },
    ...mockExams.map((e) => ({ value: e.id, label: e.title })),
  ], [])

  const filteredVersions = useMemo(() => {
    if (!selectedExamId) return []
    return versions.filter((v) => v.examId === selectedExamId)
  }, [versions, selectedExamId])

  const selectedExam = useMemo(() => {
    return mockExams.find((e) => e.id === selectedExamId)
  }, [selectedExamId])

  const versionForCompare = useMemo(() => {
    return versions.filter((v) => v.examId === selectedExamId)
  }, [versions, selectedExamId])

  const compareOptions = useMemo(() => [
    { value: "", label: "اختر..." },
    ...versionForCompare.map((v) => ({ value: v.id, label: v.label })),
  ], [versionForCompare])

  const comparedVersions = useMemo(() => {
    if (!compareVersionA || !compareVersionB) return null
    const a = versions.find((v) => v.id === compareVersionA)
    const b = versions.find((v) => v.id === compareVersionB)
    if (!a || !b) return null
    return { a, b }
  }, [compareVersionA, compareVersionB, versions])

  const handleAddVersion = () => {
    toast.success("تمت إضافة النسخة بنجاح")
    setShowAddModal(false)
  }

  const handlePrintVersion = (label: string) => {
    toast.success(`جاري طباعة ${label}`)
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <PageHeader title="نسخ الامتحان" description="إدارة نسخ متعددة للامتحان" />
        <ErrorState error={error} onRetry={retry} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <Breadcrumb items={[{ label: "الامتحانات", href: "/teacher/exams" }, { label: "إصدارات متعددة" }]} />
      <PageHeader
        title="نسخ الامتحان"
        description="إدارة نسخ متعددة للامتحان"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowCompare(true)} rightIcon={<HiOutlineScale size={18} />}>
              مقارنة النسخ
            </Button>
            <Button variant="primary" onClick={() => setShowAddModal(true)} rightIcon={<HiOutlinePlus size={18} />}>
              إضافة نسخة
            </Button>
          </div>
        }
      />

      <Card>
        <CardContent className="space-y-4">
          <Select
            label="اختر الامتحان"
            options={examOptions}
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
          />
          {selectedExam && (
            <div className="text-sm text-text-secondary">
              <span className="font-medium text-text">{selectedExam.title}</span>
              {" | "}{selectedExam.questions.length} سؤال | {selectedExam.totalGrade} درجة
            </div>
          )}
        </CardContent>
      </Card>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 3 }, (_, i) => (
            <Card key={i}>
              <CardContent className="space-y-3">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && !selectedExamId && (
        <EmptyState
          icon={HiOutlineTemplate}
          title="اختر امتحاناً"
          description="يرجى اختيار امتحان من القائمة أعلاه لعرض النسخ المتاحة"
        />
      )}

      {!loading && selectedExamId && filteredVersions.length === 0 && (
        <EmptyState
          icon={HiOutlineDocumentDuplicate}
          title="لا توجد نسخ"
          description="لم يتم إنشاء نسخ لهذا الامتحان بعد. أضف نسخة جديدة للبدء."
          action={<Button variant="primary" onClick={() => setShowAddModal(true)} rightIcon={<HiOutlinePlus size={18} />}>إضافة نسخة</Button>}
        />
      )}

      {!loading && filteredVersions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredVersions.map((version, i) => (
            <motion.div
              key={version.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="h-full">
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <HiOutlineDocumentDuplicate className="text-primary" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text">{version.label}</h3>
                        <p className="text-xs text-text-tertiary">{version.questions.length} أسئلة</p>
                      </div>
                    </div>
                    <Badge variant="primary">{version.totalGrade} درجة</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <HiOutlineStatusOffline size={14} />
                      {version.shuffleQuestions ? "ترتيب عشوائي" : "ترتيب ثابت"}
                    </span>
                    <span className={cn("px-2 py-0.5 rounded-full", version.shuffleQuestions ? "bg-success/10 text-success" : "bg-surface-tertiary text-text-tertiary")}>
                      {version.shuffleQuestions ? "أسئلة" : "أسئلة"} {version.shuffleQuestions ? "عشوائية" : "مرتبة"}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => setPreviewVersion(version)} rightIcon={<HiOutlineEye size={16} />}>
                        معاينة
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => handlePrintVersion(version.label)} rightIcon={<HiOutlinePrinter size={16} />}>
                        طباعة النسخة
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Modal isOpen={!!previewVersion} onClose={() => setPreviewVersion(null)} title={`معاينة: ${previewVersion?.label}`} size="xl">
        {previewVersion && (
          <div className="space-y-4 max-h-[70vh] overflow-y-auto">
            {previewVersion.questions.map((q, idx) => (
              <Card key={q.id}>
                <CardContent className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                      <span className="text-sm font-medium text-text">{q.text}</span>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Badge variant="info" size="sm">{typeLabels[q.type]}</Badge>
                      <Badge variant={difficultyColors[q.difficulty]} size="sm">{q.difficulty === "easy" ? "سهل" : q.difficulty === "medium" ? "متوسط" : "صعب"}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-secondary">
                    <span>الدرجة: {q.grade}</span>
                    <span>الوقت: {q.suggestedTime} د</span>
                    {q.tags.length > 0 && <span>الوسوم: {q.tags.join(", ")}</span>}
                  </div>
                  {q.choices && (
                    <div className="grid grid-cols-2 gap-2">
                      {q.choices.map((c) => (
                        <div key={c.id} className={cn("px-3 py-2 rounded-lg border text-sm", c.isCorrect ? "border-success bg-success/5 text-success" : "border-border text-text-secondary")}>
                          {c.text}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Modal>

      <Modal isOpen={showCompare} onClose={() => setShowCompare(false)} title="مقارنة النسخ" size="xl">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select label="النسخة الأولى" options={compareOptions} value={compareVersionA} onChange={(e) => setCompareVersionA(e.target.value)} />
            <Select label="النسخة الثانية" options={compareOptions} value={compareVersionB} onChange={(e) => setCompareVersionB(e.target.value)} />
          </div>
          {comparedVersions && (
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>{comparedVersions.a.label}</CardTitle>
                  <CardDescription>{comparedVersions.a.questions.length} أسئلة - {comparedVersions.a.totalGrade} درجة</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 max-h-80 overflow-y-auto">
                  {comparedVersions.a.questions.map((q, idx) => (
                    <div key={q.id} className="p-2 rounded-lg bg-surface-secondary text-sm">
                      <span className="font-medium text-text">{idx + 1}. </span>
                      <span className="text-text-secondary">{q.text}</span>
                      <div className="flex gap-1 mt-1">
                        <Badge size="sm" variant="info">{typeLabels[q.type]}</Badge>
                        <Badge size="sm" variant={difficultyColors[q.difficulty]}>{q.grade} درجات</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{comparedVersions.b.label}</CardTitle>
                  <CardDescription>{comparedVersions.b.questions.length} أسئلة - {comparedVersions.b.totalGrade} درجة</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 max-h-80 overflow-y-auto">
                  {comparedVersions.b.questions.map((q, idx) => (
                    <div key={q.id} className="p-2 rounded-lg bg-surface-secondary text-sm">
                      <span className="font-medium text-text">{idx + 1}. </span>
                      <span className="text-text-secondary">{q.text}</span>
                      <div className="flex gap-1 mt-1">
                        <Badge size="sm" variant="info">{typeLabels[q.type]}</Badge>
                        <Badge size="sm" variant={difficultyColors[q.difficulty]}>{q.grade} درجات</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </Modal>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="إضافة نسخة جديدة" size="md">
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">سيتم إنشاء نسخة جديدة من الامتحان المحدد مع إمكانية تخصيص الأسئلة والترتيب.</p>
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>إلغاء</Button>
            <Button variant="primary" onClick={handleAddVersion} rightIcon={<HiOutlinePlus size={18} />}>إضافة</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

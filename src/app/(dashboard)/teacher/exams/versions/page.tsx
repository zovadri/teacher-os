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
          throw new Error("ط·آ¸ط¸آ¾ط·آ·ط¢آ´ط·آ¸أ¢â‚¬â€چ ط·آ·ط¹آ¾ط·آ·ط¢آ­ط·آ¸أ¢â‚¬آ¦ط·آ¸ط¸آ¹ط·آ¸أ¢â‚¬â€چ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬آ ط·آ·ط¢آ³ط·آ·ط¢آ®")
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
  "multiple-choice": "ط·آ·ط¢آ§ط·آ·ط¢آ®ط·آ·ط¹آ¾ط·آ¸ط¸آ¹ط·آ·ط¢آ§ط·آ·ط¢آ± ط·آ¸أ¢â‚¬آ¦ط·آ¸أ¢â‚¬آ  ط·آ¸أ¢â‚¬آ¦ط·آ·ط¹آ¾ط·آ·ط¢آ¹ط·آ·ط¢آ¯ط·آ·ط¢آ¯",
  "true-false": "ط·آ·ط¢آµط·آ¸ط«â€ ط·آ·ط¢آ§ط·آ·ط¢آ¨/ط·آ·ط¢آ®ط·آ·ط¢آ·ط·آ·ط¢آ£",
  "fill-blank": "ط·آ¸أ¢â‚¬آ¦ط·آ¸أ¢â‚¬â€چط·آ·ط·إ’ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸ط¸آ¾ط·آ·ط¢آ±ط·آ·ط¢آ§ط·آ·ط·â€؛",
  essay: "ط·آ¸أ¢â‚¬آ¦ط·آ¸أ¢â‚¬ع‘ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸ط¸آ¹",
  ordering: "ط·آ·ط¹آ¾ط·آ·ط¢آ±ط·آ·ط¹آ¾ط·آ¸ط¸آ¹ط·آ·ط¢آ¨",
  matching: "ط·آ¸أ¢â‚¬آ¦ط·آ·ط¢آ·ط·آ·ط¢آ§ط·آ·ط¢آ¨ط·آ¸أ¢â‚¬ع‘ط·آ·ط¢آ©",
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
    { value: "", label: "ط·آ·ط¢آ§ط·آ·ط¢آ®ط·آ·ط¹آ¾ط·آ·ط¢آ± ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ¦ط·آ·ط¹آ¾ط·آ·ط¢آ­ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ ..." },
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
    { value: "", label: "ط·آ·ط¢آ§ط·آ·ط¢آ®ط·آ·ط¹آ¾ط·آ·ط¢آ±..." },
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
    toast.success("ط·آ·ط¹آ¾ط·آ¸أ¢â‚¬آ¦ط·آ·ط¹آ¾ ط·آ·ط¢آ¥ط·آ·ط¢آ¶ط·آ·ط¢آ§ط·آ¸ط¸آ¾ط·آ·ط¢آ© ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬آ ط·آ·ط¢آ³ط·آ·ط¢آ®ط·آ·ط¢آ© ط·آ·ط¢آ¨ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ¬ط·آ·ط¢آ§ط·آ·ط¢آ­")
    setShowAddModal(false)
  }

  const handlePrintVersion = (label: string) => {
    toast.success(`ط·آ·ط¢آ¬ط·آ·ط¢آ§ط·آ·ط¢آ±ط·آ¸ط¸آ¹ ط·آ·ط¢آ·ط·آ·ط¢آ¨ط·آ·ط¢آ§ط·آ·ط¢آ¹ط·آ·ط¢آ© ${label}`)
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <PageHeader title="ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ³ط·آ·ط¢آ® ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ¦ط·آ·ط¹آ¾ط·آ·ط¢آ­ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ " description="ط·آ·ط¢آ¥ط·آ·ط¢آ¯ط·آ·ط¢آ§ط·آ·ط¢آ±ط·آ·ط¢آ© ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ³ط·آ·ط¢آ® ط·آ¸أ¢â‚¬آ¦ط·آ·ط¹آ¾ط·آ·ط¢آ¹ط·آ·ط¢آ¯ط·آ·ط¢آ¯ط·آ·ط¢آ© ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬â€چط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ¦ط·آ·ط¹آ¾ط·آ·ط¢آ­ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ " />
        <ErrorState error={error} onRetry={retry} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <Breadcrumb items={[{ label: "ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ", href: "/teacher/exams" }, { label: "ط¥طµط¯ط§ط±ط§طھ ظ…طھط¹ط¯ط¯ط©" }]} />
      <PageHeader
        title="ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ³ط·آ·ط¢آ® ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ¦ط·آ·ط¹آ¾ط·آ·ط¢آ­ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ "
        description="ط·آ·ط¢آ¥ط·آ·ط¢آ¯ط·آ·ط¢آ§ط·آ·ط¢آ±ط·آ·ط¢آ© ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ³ط·آ·ط¢آ® ط·آ¸أ¢â‚¬آ¦ط·آ·ط¹آ¾ط·آ·ط¢آ¹ط·آ·ط¢آ¯ط·آ·ط¢آ¯ط·آ·ط¢آ© ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬â€چط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ¦ط·آ·ط¹آ¾ط·آ·ط¢آ­ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ "
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowCompare(true)} rightIcon={<HiOutlineScale size={18} />}>
              ط·آ¸أ¢â‚¬آ¦ط·آ¸أ¢â‚¬ع‘ط·آ·ط¢آ§ط·آ·ط¢آ±ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ© ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬آ ط·آ·ط¢آ³ط·آ·ط¢آ®
            </Button>
            <Button variant="primary" onClick={() => setShowAddModal(true)} rightIcon={<HiOutlinePlus size={18} />}>
              ط·آ·ط¢آ¥ط·آ·ط¢آ¶ط·آ·ط¢آ§ط·آ¸ط¸آ¾ط·آ·ط¢آ© ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ³ط·آ·ط¢آ®ط·آ·ط¢آ©
            </Button>
          </div>
        }
      />

      <Card>
        <CardContent className="space-y-4">
          <Select
            label="ط·آ·ط¢آ§ط·آ·ط¢آ®ط·آ·ط¹آ¾ط·آ·ط¢آ± ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ¦ط·آ·ط¹آ¾ط·آ·ط¢آ­ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ "
            options={examOptions}
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
          />
          {selectedExam && (
            <div className="text-sm text-text-secondary">
              <span className="font-medium text-text">{selectedExam.title}</span>
              {" | "}{selectedExam.questions.length} ط·آ·ط¢آ³ط·آ·ط¢آ¤ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چ | {selectedExam.totalGrade} ط·آ·ط¢آ¯ط·آ·ط¢آ±ط·آ·ط¢آ¬ط·آ·ط¢آ©
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
          title="ط·آ·ط¢آ§ط·آ·ط¢آ®ط·آ·ط¹آ¾ط·آ·ط¢آ± ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ¦ط·آ·ط¹آ¾ط·آ·ط¢آ­ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ¹"
          description="ط·آ¸ط¸آ¹ط·آ·ط¢آ±ط·آ·ط¢آ¬ط·آ¸أ¢â‚¬آ° ط·آ·ط¢آ§ط·آ·ط¢آ®ط·آ·ط¹آ¾ط·آ¸ط¸آ¹ط·آ·ط¢آ§ط·آ·ط¢آ± ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ¦ط·آ·ط¹آ¾ط·آ·ط¢آ­ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ  ط·آ¸أ¢â‚¬آ¦ط·آ¸أ¢â‚¬آ  ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬ع‘ط·آ·ط¢آ§ط·آ·ط¢آ¦ط·آ¸أ¢â‚¬آ¦ط·آ·ط¢آ© ط·آ·ط¢آ£ط·آ·ط¢آ¹ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ§ط·آ¸أ¢â‚¬طŒ ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ¹ط·آ·ط¢آ±ط·آ·ط¢آ¶ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬آ ط·آ·ط¢آ³ط·آ·ط¢آ® ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬آ¦ط·آ·ط¹آ¾ط·آ·ط¢آ§ط·آ·ط¢آ­ط·آ·ط¢آ©"
        />
      )}

      {!loading && selectedExamId && filteredVersions.length === 0 && (
        <EmptyState
          icon={HiOutlineDocumentDuplicate}
          title="ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ§ ط·آ·ط¹آ¾ط·آ¸ط«â€ ط·آ·ط¢آ¬ط·آ·ط¢آ¯ ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ³ط·آ·ط¢آ®"
          description="ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬آ¦ ط·آ¸ط¸آ¹ط·آ·ط¹آ¾ط·آ¸أ¢â‚¬آ¦ ط·آ·ط¢آ¥ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ´ط·آ·ط¢آ§ط·آ·ط·إ’ ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ³ط·آ·ط¢آ® ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬طŒط·آ·ط¢آ°ط·آ·ط¢آ§ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ¦ط·آ·ط¹آ¾ط·آ·ط¢آ­ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ  ط·آ·ط¢آ¨ط·آ·ط¢آ¹ط·آ·ط¢آ¯. ط·آ·ط¢آ£ط·آ·ط¢آ¶ط·آ¸ط¸آ¾ ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ³ط·آ·ط¢آ®ط·آ·ط¢آ© ط·آ·ط¢آ¬ط·آ·ط¢آ¯ط·آ¸ط¸آ¹ط·آ·ط¢آ¯ط·آ·ط¢آ© ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬â€چط·آ·ط¢آ¨ط·آ·ط¢آ¯ط·آ·ط·إ’."
          action={<Button variant="primary" onClick={() => setShowAddModal(true)} rightIcon={<HiOutlinePlus size={18} />}>ط·آ·ط¢آ¥ط·آ·ط¢آ¶ط·آ·ط¢آ§ط·آ¸ط¸آ¾ط·آ·ط¢آ© ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ³ط·آ·ط¢آ®ط·آ·ط¢آ©</Button>}
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
                        <p className="text-xs text-text-tertiary">{version.questions.length} ط·آ·ط¢آ£ط·آ·ط¢آ³ط·آ·ط¢آ¦ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ©</p>
                      </div>
                    </div>
                    <Badge variant="primary">{version.totalGrade} ط·آ·ط¢آ¯ط·آ·ط¢آ±ط·آ·ط¢آ¬ط·آ·ط¢آ©</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <HiOutlineStatusOffline size={14} />
                      {version.shuffleQuestions ? "ط·آ·ط¹آ¾ط·آ·ط¢آ±ط·آ·ط¹آ¾ط·آ¸ط¸آ¹ط·آ·ط¢آ¨ ط·آ·ط¢آ¹ط·آ·ط¢آ´ط·آ¸ط«â€ ط·آ·ط¢آ§ط·آ·ط¢آ¦ط·آ¸ط¸آ¹" : "ط·آ·ط¹آ¾ط·آ·ط¢آ±ط·آ·ط¹آ¾ط·آ¸ط¸آ¹ط·آ·ط¢آ¨ ط·آ·ط¢آ«ط·آ·ط¢آ§ط·آ·ط¢آ¨ط·آ·ط¹آ¾"}
                    </span>
                    <span className={cn("px-2 py-0.5 rounded-full", version.shuffleQuestions ? "bg-success/10 text-success" : "bg-surface-tertiary text-text-tertiary")}>
                      {version.shuffleQuestions ? "ط·آ·ط¢آ£ط·آ·ط¢آ³ط·آ·ط¢آ¦ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ©" : "ط·آ·ط¢آ£ط·آ·ط¢آ³ط·آ·ط¢آ¦ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ©"} {version.shuffleQuestions ? "ط·آ·ط¢آ¹ط·آ·ط¢آ´ط·آ¸ط«â€ ط·آ·ط¢آ§ط·آ·ط¢آ¦ط·آ¸ط¸آ¹ط·آ·ط¢آ©" : "ط·آ¸أ¢â‚¬آ¦ط·آ·ط¢آ±ط·آ·ط¹آ¾ط·آ·ط¢آ¨ط·آ·ط¢آ©"}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => setPreviewVersion(version)} rightIcon={<HiOutlineEye size={16} />}>
                        ط·آ¸أ¢â‚¬آ¦ط·آ·ط¢آ¹ط·آ·ط¢آ§ط·آ¸ط¸آ¹ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ©
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => handlePrintVersion(version.label)} rightIcon={<HiOutlinePrinter size={16} />}>
                        ط·آ·ط¢آ·ط·آ·ط¢آ¨ط·آ·ط¢آ§ط·آ·ط¢آ¹ط·آ·ط¢آ© ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬آ ط·آ·ط¢آ³ط·آ·ط¢آ®ط·آ·ط¢آ©
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Modal isOpen={!!previewVersion} onClose={() => setPreviewVersion(null)} title={`ط·آ¸أ¢â‚¬آ¦ط·آ·ط¢آ¹ط·آ·ط¢آ§ط·آ¸ط¸آ¹ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ©: ${previewVersion?.label}`} size="xl">
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
                      <Badge variant={difficultyColors[q.difficulty]} size="sm">{q.difficulty === "easy" ? "ط·آ·ط¢آ³ط·آ¸أ¢â‚¬طŒط·آ¸أ¢â‚¬â€چ" : q.difficulty === "medium" ? "ط·آ¸أ¢â‚¬آ¦ط·آ·ط¹آ¾ط·آ¸ط«â€ ط·آ·ط¢آ³ط·آ·ط¢آ·" : "ط·آ·ط¢آµط·آ·ط¢آ¹ط·آ·ط¢آ¨"}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-secondary">
                    <span>ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ¯ط·آ·ط¢آ±ط·آ·ط¢آ¬ط·آ·ط¢آ©: {q.grade}</span>
                    <span>ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸ط«â€ ط·آ¸أ¢â‚¬ع‘ط·آ·ط¹آ¾: {q.suggestedTime} ط·آ·ط¢آ¯</span>
                    {q.tags.length > 0 && <span>ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸ط«â€ ط·آ·ط¢آ³ط·آ¸ط«â€ ط·آ¸أ¢â‚¬آ¦: {q.tags.join(", ")}</span>}
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

      <Modal isOpen={showCompare} onClose={() => setShowCompare(false)} title="ط·آ¸أ¢â‚¬آ¦ط·آ¸أ¢â‚¬ع‘ط·آ·ط¢آ§ط·آ·ط¢آ±ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ© ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬آ ط·آ·ط¢آ³ط·آ·ط¢آ®" size="xl">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select label="ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬آ ط·آ·ط¢آ³ط·آ·ط¢آ®ط·آ·ط¢آ© ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ£ط·آ¸ط«â€ ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬آ°" options={compareOptions} value={compareVersionA} onChange={(e) => setCompareVersionA(e.target.value)} />
            <Select label="ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬آ ط·آ·ط¢آ³ط·آ·ط¢آ®ط·آ·ط¢آ© ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ«ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ ط·آ¸ط¸آ¹ط·آ·ط¢آ©" options={compareOptions} value={compareVersionB} onChange={(e) => setCompareVersionB(e.target.value)} />
          </div>
          {comparedVersions && (
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>{comparedVersions.a.label}</CardTitle>
                  <CardDescription>{comparedVersions.a.questions.length} ط·آ·ط¢آ£ط·آ·ط¢آ³ط·آ·ط¢آ¦ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ© - {comparedVersions.a.totalGrade} ط·آ·ط¢آ¯ط·آ·ط¢آ±ط·آ·ط¢آ¬ط·آ·ط¢آ©</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 max-h-80 overflow-y-auto">
                  {comparedVersions.a.questions.map((q, idx) => (
                    <div key={q.id} className="p-2 rounded-lg bg-surface-secondary text-sm">
                      <span className="font-medium text-text">{idx + 1}. </span>
                      <span className="text-text-secondary">{q.text}</span>
                      <div className="flex gap-1 mt-1">
                        <Badge size="sm" variant="info">{typeLabels[q.type]}</Badge>
                        <Badge size="sm" variant={difficultyColors[q.difficulty]}>{q.grade} ط·آ·ط¢آ¯ط·آ·ط¢آ±ط·آ·ط¢آ¬ط·آ·ط¢آ§ط·آ·ط¹آ¾</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{comparedVersions.b.label}</CardTitle>
                  <CardDescription>{comparedVersions.b.questions.length} ط·آ·ط¢آ£ط·آ·ط¢آ³ط·آ·ط¢آ¦ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ© - {comparedVersions.b.totalGrade} ط·آ·ط¢آ¯ط·آ·ط¢آ±ط·آ·ط¢آ¬ط·آ·ط¢آ©</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 max-h-80 overflow-y-auto">
                  {comparedVersions.b.questions.map((q, idx) => (
                    <div key={q.id} className="p-2 rounded-lg bg-surface-secondary text-sm">
                      <span className="font-medium text-text">{idx + 1}. </span>
                      <span className="text-text-secondary">{q.text}</span>
                      <div className="flex gap-1 mt-1">
                        <Badge size="sm" variant="info">{typeLabels[q.type]}</Badge>
                        <Badge size="sm" variant={difficultyColors[q.difficulty]}>{q.grade} ط·آ·ط¢آ¯ط·آ·ط¢آ±ط·آ·ط¢آ¬ط·آ·ط¢آ§ط·آ·ط¹آ¾</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </Modal>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="ط·آ·ط¢آ¥ط·آ·ط¢آ¶ط·آ·ط¢آ§ط·آ¸ط¸آ¾ط·آ·ط¢آ© ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ³ط·آ·ط¢آ®ط·آ·ط¢آ© ط·آ·ط¢آ¬ط·آ·ط¢آ¯ط·آ¸ط¸آ¹ط·آ·ط¢آ¯ط·آ·ط¢آ©" size="md">
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">ط·آ·ط¢آ³ط·آ¸ط¸آ¹ط·آ·ط¹آ¾ط·آ¸أ¢â‚¬آ¦ ط·آ·ط¢آ¥ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ´ط·آ·ط¢آ§ط·آ·ط·إ’ ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ³ط·آ·ط¢آ®ط·آ·ط¢آ© ط·آ·ط¢آ¬ط·آ·ط¢آ¯ط·آ¸ط¸آ¹ط·آ·ط¢آ¯ط·آ·ط¢آ© ط·آ¸أ¢â‚¬آ¦ط·آ¸أ¢â‚¬آ  ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ¦ط·آ·ط¹آ¾ط·آ·ط¢آ­ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ  ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬آ¦ط·آ·ط¢آ­ط·آ·ط¢آ¯ط·آ·ط¢آ¯ ط·آ¸أ¢â‚¬آ¦ط·آ·ط¢آ¹ ط·آ·ط¢آ¥ط·آ¸أ¢â‚¬آ¦ط·آ¸ط¦â€™ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ ط·آ¸ط¸آ¹ط·آ·ط¢آ© ط·آ·ط¹آ¾ط·آ·ط¢آ®ط·آ·ط¢آµط·آ¸ط¸آ¹ط·آ·ط¢آµ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ£ط·آ·ط¢آ³ط·آ·ط¢آ¦ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ© ط·آ¸ط«â€ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¹آ¾ط·آ·ط¢آ±ط·آ·ط¹آ¾ط·آ¸ط¸آ¹ط·آ·ط¢آ¨.</p>
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>ط·آ·ط¢آ¥ط·آ¸أ¢â‚¬â€چط·آ·ط·â€؛ط·آ·ط¢آ§ط·آ·ط·إ’</Button>
            <Button variant="primary" onClick={handleAddVersion} rightIcon={<HiOutlinePlus size={18} />}>ط·آ·ط¢آ¥ط·آ·ط¢آ¶ط·آ·ط¢آ§ط·آ¸ط¸آ¾ط·آ·ط¢آ©</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

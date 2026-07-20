"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlinePlus, HiOutlineTrash, HiOutlineEye, HiOutlineBookOpen,
  HiOutlineClipboardList, HiOutlineChartBar, HiOutlineFilter,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, StatsCard, Badge, SearchInput, Button, Modal, Input, Select, Textarea } from "@/components/ui/"
import { ConfirmDialog } from "@/components/ui/ConfirmDialog"
import { EmptyState } from "@/components/ui/EmptyState"
import { mockQuestions, mockCourses } from "@/lib/mock/data"
import type { Question } from "@/lib/types"
import { useNotificationStore } from "@/lib/notification-store"
import { generateId, truncate } from "@/lib/utils"

const typeLabels: Record<Question["type"], string> = {
  "multiple-choice": "ط·آ§ط·آ®ط·ع¾ط¸ظ¹ط·آ§ط·آ± ط¸â€¦ط¸â€  ط¸â€¦ط·ع¾ط·آ¹ط·آ¯ط·آ¯",
  "true-false": "ط·آµط·آ­/ط·آ®ط·آ·ط·آ£",
  "fill-blank": "ط¸â€¦ط¸â€‍ط·طŒ ط·آ§ط¸â€‍ط¸ظ¾ط·آ±ط·آ§ط·ط›",
  ordering: "ط·ع¾ط·آ±ط·ع¾ط¸ظ¹ط·آ¨",
  matching: "ط¸â€¦ط·آ·ط·آ§ط·آ¨ط¸â€ڑط·آ©",
  essay: "ط¸â€¦ط¸â€ڑط·آ§ط¸â€‍ط¸ظ¹",
}

const typeVariants: Record<Question["type"], "primary" | "info" | "warning" | "secondary" | "premium" | "neutral"> = {
  "multiple-choice": "primary",
  "true-false": "info",
  "fill-blank": "warning",
  ordering: "secondary",
  matching: "premium",
  essay: "neutral",
}

const difficultyLabels: Record<string, string> = { easy: "ط·آ³ط¸â€،ط¸â€‍", medium: "ط¸â€¦ط·ع¾ط¸ث†ط·آ³ط·آ·", hard: "ط·آµط·آ¹ط·آ¨" }
const difficultyVariants: Record<string, "success" | "warning" | "error"> = { easy: "success", medium: "warning", hard: "error" }

const typeOptions = [
  { value: "multiple-choice", label: "ط·آ§ط·آ®ط·ع¾ط¸ظ¹ط·آ§ط·آ± ط¸â€¦ط¸â€  ط¸â€¦ط·ع¾ط·آ¹ط·آ¯ط·آ¯" },
  { value: "true-false", label: "ط·آµط·آ­/ط·آ®ط·آ·ط·آ£" },
  { value: "fill-blank", label: "ط¸â€¦ط¸â€‍ط·طŒ ط·آ§ط¸â€‍ط¸ظ¾ط·آ±ط·آ§ط·ط›" },
  { value: "ordering", label: "ط·ع¾ط·آ±ط·ع¾ط¸ظ¹ط·آ¨" },
  { value: "matching", label: "ط¸â€¦ط·آ·ط·آ§ط·آ¨ط¸â€ڑط·آ©" },
  { value: "essay", label: "ط¸â€¦ط¸â€ڑط·آ§ط¸â€‍ط¸ظ¹" },
]

const difficultyOptions = [
  { value: "easy", label: "ط·آ³ط¸â€،ط¸â€‍" },
  { value: "medium", label: "ط¸â€¦ط·ع¾ط¸ث†ط·آ³ط·آ·" },
  { value: "hard", label: "ط·آµط·آ¹ط·آ¨" },
]

interface QuestionForm {
  text: string
  type: Question["type"]
  grade: string
  difficulty: "easy" | "medium" | "hard"
  tags: string
  courseId: string
  correctAnswer: string
  explanation: string
  mcqChoices: { id: string; text: string; isCorrect: boolean }[]
  tfCorrect: boolean
  orderingItems: { id: string; text: string; correctOrder: number }[]
  matchingLeft: { id: string; text: string }[]
  matchingRight: { id: string; text: string; matchId: string }[]
}

const emptyForm: QuestionForm = {
  text: "", type: "multiple-choice", grade: "5", difficulty: "medium",
  tags: "", courseId: "", correctAnswer: "", explanation: "",
  mcqChoices: [
    { id: "a", text: "", isCorrect: true },
    { id: "b", text: "", isCorrect: false },
    { id: "c", text: "", isCorrect: false },
    { id: "d", text: "", isCorrect: false },
  ],
  tfCorrect: true,
  orderingItems: [
    { id: "o1", text: "", correctOrder: 1 },
    { id: "o2", text: "", correctOrder: 2 },
    { id: "o3", text: "", correctOrder: 3 },
    { id: "o4", text: "", correctOrder: 4 },
  ],
  matchingLeft: [
    { id: "ml1", text: "" },
    { id: "ml2", text: "" },
    { id: "ml3", text: "" },
    { id: "ml4", text: "" },
  ],
  matchingRight: [
    { id: "mr1", text: "", matchId: "ml1" },
    { id: "mr2", text: "", matchId: "ml2" },
    { id: "mr3", text: "", matchId: "ml3" },
    { id: "mr4", text: "", matchId: "ml4" },
  ],
}

function buildQuestionFromForm(form: QuestionForm): Question {
  const base: Question = {
    id: generateId(),
    type: form.type,
    text: form.text,
    grade: Number(form.grade),
    suggestedTime: 2,
    difficulty: form.difficulty,
    tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    courseId: form.courseId,
    correctAnswer: form.correctAnswer || undefined,
    explanation: form.explanation || undefined,
    stats: { timesUsed: 0, correctRate: 0, incorrectRate: 0 },
  }
  if (form.type === "multiple-choice" || form.type === "true-false") {
    base.choices = form.type === "true-false"
      ? [
          { id: "true", text: "ط·آµط·آ­", isCorrect: form.tfCorrect },
          { id: "false", text: "ط·آ®ط·آ·ط·آ£", isCorrect: !form.tfCorrect },
        ]
      : form.mcqChoices
  }
  if (form.type === "ordering") {
    base.orderingItems = form.orderingItems.map((o) => ({ ...o }))
  }
  if (form.type === "matching") {
    base.matchingLeft = form.matchingLeft.map((m) => ({ ...m }))
    base.matchingRight = form.matchingRight.map((m) => ({ ...m }))
  }
  return base
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions)
  const [search, setSearch] = useState("")
  const [courseFilter, setCourseFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("")
  const [tagFilter, setTagFilter] = useState("")
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
  const [form, setForm] = useState<QuestionForm>(emptyForm)
  const [deleteTarget, setDeleteTarget] = useState<Question | null>(null)
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false)
  const { addToast } = useNotificationStore()

  const stats = useMemo(() => {
    const total = questions.length
    const difficultyMap = { easy: 1, medium: 2, hard: 3 }
    const avgDifficulty = total > 0
      ? (questions.reduce((s, q) => s + difficultyMap[q.difficulty], 0) / total).toFixed(1)
      : "0"
    const mostUsed = questions.reduce((best, q) =>
      (q.stats?.timesUsed ?? 0) > (best.stats?.timesUsed ?? 0) ? q : best
    , questions[0])
    const avgCorrect = total > 0
      ? Math.round(questions.reduce((s, q) => s + (q.stats?.correctRate ?? 0), 0) / total)
      : 0
    return { total, avgDifficulty, mostUsed, avgCorrect }
  }, [questions])

  const filtered = useMemo(() => {
    const tagSet = new Set<string>()
    questions.forEach((q) => q.tags?.forEach((t) => tagSet.add(t)))
    let result = [...questions]
    if (search) {
      const s = search.toLowerCase()
      result = result.filter((q) => q.text.toLowerCase().includes(s))
    }
    if (courseFilter) result = result.filter((q) => q.courseId === courseFilter)
    if (typeFilter) result = result.filter((q) => q.type === typeFilter)
    if (difficultyFilter) result = result.filter((q) => q.difficulty === difficultyFilter)
    if (tagFilter) result = result.filter((q) => q.tags?.includes(tagFilter))
    return { items: result, allTags: Array.from(tagSet).sort() }
  }, [questions, search, courseFilter, typeFilter, difficultyFilter, tagFilter])

  const courseOptions = useMemo(
    () => mockCourses.map((c) => ({ value: c.id, label: c.title })),
    []
  )
  const tagOptions = useMemo(
    () => filtered.allTags.map((t) => ({ value: t, label: t })),
    [filtered.allTags]
  )

  const openDetail = (q: Question) => {
    setSelectedQuestion(q)
    setDetailModalOpen(true)
  }

  const openCreate = () => {
    setEditingQuestion(null)
    setForm(emptyForm)
    setCreateModalOpen(true)
  }

  const openEdit = (q: Question) => {
    setEditingQuestion(q)
    const m = q.type === "multiple-choice" && q.choices
      ? q.choices.map((c) => ({ ...c }))
      : [...emptyForm.mcqChoices]
    setForm({
      text: q.text,
      type: q.type,
      grade: String(q.grade),
      difficulty: q.difficulty,
      tags: (q.tags ?? []).join(", "),
      courseId: q.courseId ?? "",
      correctAnswer: q.correctAnswer ?? "",
      explanation: q.explanation ?? "",
      mcqChoices: m.length === 4 ? m : [...emptyForm.mcqChoices],
      tfCorrect: q.choices?.[0]?.isCorrect ?? true,
      orderingItems: q.orderingItems?.map((o) => ({ ...o })) ?? [...emptyForm.orderingItems],
      matchingLeft: q.matchingLeft?.map((m) => ({ ...m })) ?? [...emptyForm.matchingLeft],
      matchingRight: q.matchingRight?.map((m) => ({ ...m })) ?? [...emptyForm.matchingRight],
    })
    setCreateModalOpen(true)
  }

  const handleSave = () => {
    if (!form.text.trim()) {
      addToast({ type: "error", title: "ط¸â€ ط·آµ ط·آ§ط¸â€‍ط·آ³ط·آ¤ط·آ§ط¸â€‍ ط¸â€¦ط·آ·ط¸â€‍ط¸ث†ط·آ¨" })
      return
    }
    if (editingQuestion) {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === editingQuestion.id ? { ...buildQuestionFromForm(form), id: q.id, stats: q.stats } : q
        )
      )
      addToast({ type: "success", title: "ط·ع¾ط¸â€¦ ط·ع¾ط·آ­ط·آ¯ط¸ظ¹ط·آ« ط·آ§ط¸â€‍ط·آ³ط·آ¤ط·آ§ط¸â€‍ ط·آ¨ط¸â€ ط·آ¬ط·آ§ط·آ­" })
    } else {
      setQuestions((prev) => [...prev, buildQuestionFromForm(form)])
      addToast({ type: "success", title: "ط·ع¾ط¸â€¦ ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ§ط¸â€‍ط·آ³ط·آ¤ط·آ§ط¸â€‍ ط·آ¨ط¸â€ ط·آ¬ط·آ§ط·آ­" })
    }
    setCreateModalOpen(false)
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    setQuestions((prev) => prev.filter((q) => q.id !== deleteTarget.id))
    addToast({ type: "success", title: "ط·ع¾ط¸â€¦ ط·آ­ط·آ°ط¸ظ¾ ط·آ§ط¸â€‍ط·آ³ط·آ¤ط·آ§ط¸â€‍ ط·آ¨ط¸â€ ط·آ¬ط·آ§ط·آ­" })
    setDeleteTarget(null)
  }

  const handleBulkDelete = () => {
    setQuestions((prev) => prev.filter((q) => !selectedIds.has(q.id)))
    addToast({ type: "success", title: `ط·ع¾ط¸â€¦ ط·آ­ط·آ°ط¸ظ¾ ${selectedIds.size} ط·آ£ط·آ³ط·آ¦ط¸â€‍ط·آ© ط·آ¨ط¸â€ ط·آ¬ط·آ§ط·آ­` })
    setSelectedIds(new Set())
    setBulkDeleteOpen(false)
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.items.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filtered.items.map((q) => q.id)))
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="ط·آ¨ط¸â€ ط¸ئ’ ط·آ§ط¸â€‍ط·آ£ط·آ³ط·آ¦ط¸â€‍ط·آ©" subtitle="ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط·آ£ط·آ³ط·آ¦ط¸â€‍ط·آ© ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³ط·آ§ط·ع¾ ط¸ث†ط·آ§ط¸â€‍ط·آ§ط·آ®ط·ع¾ط·آ¨ط·آ§ط·آ±ط·آ§ط·ع¾" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ ط·آ§ط¸â€‍ط·آ£ط·آ³ط·آ¦ط¸â€‍ط·آ©" value={stats.total} icon={HiOutlineBookOpen} color="primary" />
        <StatsCard title="ط¸â€¦ط·ع¾ط¸ث†ط·آ³ط·آ· ط·آ§ط¸â€‍ط·آµط·آ¹ط¸ث†ط·آ¨ط·آ©" value={stats.avgDifficulty} icon={HiOutlineFilter} color="warning" />
        <StatsCard
          title="ط·آ§ط¸â€‍ط·آ£ط¸ئ’ط·آ«ط·آ± ط·آ§ط·آ³ط·ع¾ط·آ®ط·آ¯ط·آ§ط¸â€¦ط·آ§ط¸â€¹"
          value={stats.mostUsed ? truncate(stats.mostUsed.text, 20) : "-"}
          icon={HiOutlineChartBar}
          color="info"
        />
        <StatsCard title="ط¸â€ ط·آ³ط·آ¨ط·آ© ط·آ§ط¸â€‍ط·آ¥ط·آ¬ط·آ§ط·آ¨ط·آ© ط·آ§ط¸â€‍ط·آµط·آ­ط¸ظ¹ط·آ­ط·آ©" value={`${stats.avgCorrect}%`} icon={HiOutlineClipboardList} color="success" />
      </div>

      <Card>
        <div className="p-4 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <SearchInput value={search} onChange={setSearch} placeholder="ط·آ¨ط·آ­ط·آ« ط·آ¹ط¸â€  ط·آ³ط·آ¤ط·آ§ط¸â€‍..." className="min-w-[200px] flex-1" />
            <Select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              options={[{ value: "", label: "ط¸ئ’ط¸â€‍ ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³ط·آ§ط·ع¾" }, ...courseOptions]}
              className="min-w-[180px]"
            />
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              options={[{ value: "", label: "ط¸ئ’ط¸â€‍ ط·آ§ط¸â€‍ط·آ£ط¸â€ ط¸ث†ط·آ§ط·آ¹" }, ...typeOptions]}
              className="min-w-[160px]"
            />
            <Select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              options={[{ value: "", label: "ط¸ئ’ط¸â€‍ ط·آ§ط¸â€‍ط·آµط·آ¹ط¸ث†ط·آ¨ط·آ§ط·ع¾" }, ...difficultyOptions]}
              className="min-w-[140px]"
            />
            <Select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              options={[{ value: "", label: "ط¸ئ’ط¸â€‍ ط·آ§ط¸â€‍ط¸ث†ط·آ³ط¸ث†ط¸â€¦" }, ...tagOptions]}
              className="min-w-[140px]"
            />
            <Button variant="primary" onClick={openCreate} leftIcon={<HiOutlinePlus size={18} />}>
              ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ³ط·آ¤ط·آ§ط¸â€‍
            </Button>
          </div>
        </div>
      </Card>

      {selectedIds.size > 0 && (
        <div className="flex items-center gap-2 px-1">
          <span className="text-sm text-text-secondary">{selectedIds.size} ط·آ³ط·آ¤ط·آ§ط¸â€‍ ط¸â€¦ط·آ­ط·آ¯ط·آ¯</span>
          <Button variant="danger" size="sm" leftIcon={<HiOutlineTrash size={16} />} onClick={() => setBulkDeleteOpen(true)}>
            ط·آ­ط·آ°ط¸ظ¾ ط·آ§ط¸â€‍ط¸â€¦ط·آ­ط·آ¯ط·آ¯
          </Button>
        </div>
      )}

      {filtered.items.length === 0 ? (
        <EmptyState
          title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·آ£ط·آ³ط·آ¦ط¸â€‍ط·آ©"
          description="ط¸â€‍ط¸â€¦ ط¸ظ¹ط·ع¾ط¸â€¦ ط·آ§ط¸â€‍ط·آ¹ط·آ«ط¸ث†ط·آ± ط·آ¹ط¸â€‍ط¸â€° ط·آ£ط·آ³ط·آ¦ط¸â€‍ط·آ© ط·ع¾ط·آ·ط·آ§ط·آ¨ط¸â€ڑ ط¸â€¦ط·آ¹ط·آ§ط¸ظ¹ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط·آ¨ط·آ­ط·آ«. ط·آ£ط·آ¶ط¸ظ¾ ط·آ³ط·آ¤ط·آ§ط¸â€‍ط·آ§ط¸â€¹ ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯ط·آ§ط¸â€¹ ط·آ£ط¸ث† ط·آ¹ط·آ¯ط¸â€کط¸â€‍ ط¸ظ¾ط¸â€‍ط·ع¾ط·آ± ط·آ§ط¸â€‍ط·آ¨ط·آ­ط·آ«."
          action={
            <Button variant="primary" onClick={openCreate} leftIcon={<HiOutlinePlus size={18} />}>
              ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ³ط·آ¤ط·آ§ط¸â€‍
            </Button>
          }
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-secondary border-b border-border">
                <th className="text-right px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === filtered.items.length && filtered.items.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-border"
                  />
                </th>
                <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط¸â€ ط·آµ ط·آ§ط¸â€‍ط·آ³ط·آ¤ط·آ§ط¸â€‍</th>
                <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط·آ§ط¸â€‍ط¸â€ ط¸ث†ط·آ¹</th>
                <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط·آ§ط¸â€‍ط·آµط·آ¹ط¸ث†ط·آ¨ط·آ©</th>
                <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط·آ§ط¸â€‍ط·آ¯ط·آ±ط·آ¬ط·آ©</th>
                <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط·آ§ط¸â€‍ط¸ث†ط·آ³ط¸ث†ط¸â€¦</th>
                <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط·آ§ط¸â€‍ط·آ§ط·آ³ط·ع¾ط·آ®ط·آ¯ط·آ§ط¸â€¦</th>
                <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط¸â€ ط·آ³ط·آ¨ط·آ© ط·آ§ط¸â€‍ط·آµط·آ­ط·آ©</th>
                <th className="text-right px-4 py-3 font-semibold text-text-secondary w-24"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.items.map((q, idx) => (
                <motion.tr
                  key={q.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  className="border-b border-border last:border-0 hover:bg-surface-secondary cursor-pointer transition-colors"
                  onClick={() => openDetail(q)}
                >
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(q.id)}
                      onChange={() => toggleSelect(q.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="px-4 py-3 text-text font-medium max-w-[300px]">
                    <span className="line-clamp-1">{truncate(q.text, 60)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={typeVariants[q.type]} size="sm">{typeLabels[q.type]}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={difficultyVariants[q.difficulty]} size="sm">{difficultyLabels[q.difficulty]}</Badge>
                  </td>
                  <td className="px-4 py-3 text-text-secondary font-mono">{q.grade}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {q.tags?.slice(0, 2).map((t) => (
                        <Badge key={t} variant="neutral" size="sm">{t}</Badge>
                      ))}
                      {(q.tags?.length ?? 0) > 2 && (
                        <Badge variant="neutral" size="sm">+{q.tags!.length - 2}</Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary font-mono">{q.stats?.timesUsed ?? 0}</td>
                  <td className="px-4 py-3 text-text-secondary font-mono">{q.stats?.correctRate ?? 0}%</td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1">
                      <button type="button"
                        onClick={() => openDetail(q)}
                        className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        title="ط·آ¹ط·آ±ط·آ¶"
                      >
                        <HiOutlineEye size={16} />
                      </button>
                      <button type="button"
                        onClick={() => openEdit(q)}
                        className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        title="ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍"
                      >
                        <HiOutlineFilter size={16} />
                      </button>
                      <button type="button"
                        onClick={() => setDeleteTarget(q)}
                        className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors"
                        title="ط·آ­ط·آ°ط¸ظ¾"
                      >
                        <HiOutlineTrash size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        title="ط·ع¾ط¸ظ¾ط·آ§ط·آµط¸ظ¹ط¸â€‍ ط·آ§ط¸â€‍ط·آ³ط·آ¤ط·آ§ط¸â€‍"
        size="lg"
      >
        {selectedQuestion && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">ط¸â€ ط·آµ ط·آ§ط¸â€‍ط·آ³ط·آ¤ط·آ§ط¸â€‍</label>
              <p className="text-text bg-surface-secondary rounded-lg p-3 leading-relaxed">{selectedQuestion.text}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div>
                <span className="text-sm text-text-secondary ml-2">ط·آ§ط¸â€‍ط¸â€ ط¸ث†ط·آ¹:</span>
                <Badge variant={typeVariants[selectedQuestion.type]}>{typeLabels[selectedQuestion.type]}</Badge>
              </div>
              <div>
                <span className="text-sm text-text-secondary ml-2">ط·آ§ط¸â€‍ط·آµط·آ¹ط¸ث†ط·آ¨ط·آ©:</span>
                <Badge variant={difficultyVariants[selectedQuestion.difficulty]}>{difficultyLabels[selectedQuestion.difficulty]}</Badge>
              </div>
              <div>
                <span className="text-sm text-text-secondary ml-2">ط·آ§ط¸â€‍ط·آ¯ط·آ±ط·آ¬ط·آ©:</span>
                <span className="font-mono text-text">{selectedQuestion.grade}</span>
              </div>
            </div>
            {(selectedQuestion.type === "multiple-choice" || selectedQuestion.type === "true-false") && selectedQuestion.choices && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">ط·آ§ط¸â€‍ط·آ®ط¸ظ¹ط·آ§ط·آ±ط·آ§ط·ع¾</label>
                <div className="space-y-2">
                  {selectedQuestion.choices.map((c) => (
                    <div
                      key={c.id}
                      className={`p-3 rounded-lg border ${c.isCorrect ? "border-success bg-success/5" : "border-border"}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${c.isCorrect ? "bg-success" : "bg-text-tertiary"}`} />
                        <span className="text-text">{c.text}</span>
                        {c.isCorrect && <Badge variant="success" size="sm">ط·آ§ط¸â€‍ط·آ¥ط·آ¬ط·آ§ط·آ¨ط·آ© ط·آ§ط¸â€‍ط·آµط·آ­ط¸ظ¹ط·آ­ط·آ©</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {selectedQuestion.correctAnswer && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">ط·آ§ط¸â€‍ط·آ¥ط·آ¬ط·آ§ط·آ¨ط·آ© ط·آ§ط¸â€‍ط·آµط·آ­ط¸ظ¹ط·آ­ط·آ©</label>
                <p className="text-text font-medium">{selectedQuestion.correctAnswer}</p>
              </div>
            )}
            {selectedQuestion.explanation && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">ط·آ§ط¸â€‍ط·آ´ط·آ±ط·آ­</label>
                <p className="text-text-secondary text-sm leading-relaxed">{selectedQuestion.explanation}</p>
              </div>
            )}
            {selectedQuestion.orderingItems && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">ط·آ¹ط¸â€ ط·آ§ط·آµط·آ± ط·آ§ط¸â€‍ط·ع¾ط·آ±ط·ع¾ط¸ظ¹ط·آ¨</label>
                <div className="space-y-1">
                  {[...selectedQuestion.orderingItems]
                    .sort((a, b) => a.correctOrder - b.correctOrder)
                    .map((item) => (
                      <div key={item.id} className="flex items-center gap-2 text-text p-2 bg-surface-secondary rounded-lg">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">
                          {item.correctOrder}
                        </span>
                        <span>{item.text}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
            {selectedQuestion.matchingLeft && selectedQuestion.matchingRight && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">ط·آ§ط¸â€‍ط¸â€¦ط·آ·ط·آ§ط·آ¨ط¸â€ڑط·آ©</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    {selectedQuestion.matchingLeft.map((m) => (
                      <div key={m.id} className="p-2 bg-surface-secondary rounded-lg text-text text-center">{m.text}</div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {selectedQuestion.matchingRight.map((m) => (
                      <div key={m.id} className="p-2 bg-surface-secondary rounded-lg text-text text-center">{m.text}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {selectedQuestion.stats && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">ط·آ§ط¸â€‍ط·آ¥ط·آ­ط·آµط·آ§ط·آ¦ط¸ظ¹ط·آ§ط·ع¾</label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-surface-secondary rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-text">{selectedQuestion.stats.timesUsed}</p>
                    <p className="text-xs text-text-tertiary">ط¸â€¦ط·آ±ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·آ§ط·آ³ط·ع¾ط·آ®ط·آ¯ط·آ§ط¸â€¦</p>
                  </div>
                  <div className="bg-surface-secondary rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-success">{selectedQuestion.stats.correctRate}%</p>
                    <p className="text-xs text-text-tertiary">ط·آ¥ط·آ¬ط·آ§ط·آ¨ط·آ§ط·ع¾ ط·آµط·آ­ط¸ظ¹ط·آ­ط·آ©</p>
                  </div>
                  <div className="bg-surface-secondary rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-error">{selectedQuestion.stats.incorrectRate}%</p>
                    <p className="text-xs text-text-tertiary">ط·آ¥ط·آ¬ط·آ§ط·آ¨ط·آ§ط·ع¾ ط·آ®ط·آ§ط·آ·ط·آ¦ط·آ©</p>
                  </div>
                </div>
              </div>
            )}
            {selectedQuestion.tags && selectedQuestion.tags.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">ط·آ§ط¸â€‍ط¸ث†ط·آ³ط¸ث†ط¸â€¦</label>
                <div className="flex flex-wrap gap-1.5">
                  {selectedQuestion.tags.map((t) => (
                    <Badge key={t} variant="neutral">{t}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title={editingQuestion ? "ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍ ط·آ³ط·آ¤ط·آ§ط¸â€‍" : "ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ³ط·آ¤ط·آ§ط¸â€‍ ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯"}
        size="xl"
      >
        <div className="space-y-4 max-h-[65vh] overflow-y-auto px-0.5">
          <Textarea
            label="ط¸â€ ط·آµ ط·آ§ط¸â€‍ط·آ³ط·آ¤ط·آ§ط¸â€‍"
            value={form.text}
            onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
            placeholder="ط·آ§ط¸ئ’ط·ع¾ط·آ¨ ط¸â€ ط·آµ ط·آ§ط¸â€‍ط·آ³ط·آ¤ط·آ§ط¸â€‍ ط¸â€،ط¸â€ ط·آ§..."
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="ط¸â€ ط¸ث†ط·آ¹ ط·آ§ط¸â€‍ط·آ³ط·آ¤ط·آ§ط¸â€‍"
              value={form.type}
              onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as Question["type"] }))}
              options={typeOptions}
            />
            <Select
              label="ط¸â€¦ط·آ³ط·ع¾ط¸ث†ط¸â€° ط·آ§ط¸â€‍ط·آµط·آ¹ط¸ث†ط·آ¨ط·آ©"
              value={form.difficulty}
              onChange={(e) => setForm((p) => ({ ...p, difficulty: e.target.value as "easy" | "medium" | "hard" }))}
              options={difficultyOptions}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="ط·آ§ط¸â€‍ط·آ¯ط·آ±ط·آ¬ط·آ©"
              type="number"
              value={form.grade}
              onChange={(e) => setForm((p) => ({ ...p, grade: e.target.value }))}
            />
            <Select
              label="ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³"
              value={form.courseId}
              onChange={(e) => setForm((p) => ({ ...p, courseId: e.target.value }))}
              options={[{ value: "", label: "ط·آ§ط·آ®ط·ع¾ط·آ± ط¸ئ’ط¸ث†ط·آ±ط·آ³ط·آ§ط¸â€¹" }, ...courseOptions]}
            />
          </div>
          <Input
            label="ط·آ§ط¸â€‍ط¸ث†ط·آ³ط¸ث†ط¸â€¦ (ط¸â€¦ط¸ظ¾ط·آµط¸ث†ط¸â€‍ط·آ© ط·آ¨ط¸ظ¾ط¸ث†ط·آ§ط·آµط¸â€‍)"
            value={form.tags}
            onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))}
            placeholder="ط¸â€ ط·آ­ط¸ث†, ط·آµط·آ±ط¸ظ¾, ط·آ¨ط¸â€‍ط·آ§ط·ط›ط·آ©"
          />
          <Input
            label="ط·آ§ط¸â€‍ط·آ´ط·آ±ط·آ­ (ط·آ§ط·آ®ط·ع¾ط¸ظ¹ط·آ§ط·آ±ط¸ظ¹)"
            value={form.explanation}
            onChange={(e) => setForm((p) => ({ ...p, explanation: e.target.value }))}
            placeholder="ط·آ´ط·آ±ط·آ­ ط·آ§ط¸â€‍ط·آ¥ط·آ¬ط·آ§ط·آ¨ط·آ© ط·آ§ط¸â€‍ط·آµط·آ­ط¸ظ¹ط·آ­ط·آ©"
          />

          {(form.type === "multiple-choice") && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-text">ط·آ§ط¸â€‍ط·آ®ط¸ظ¹ط·آ§ط·آ±ط·آ§ط·ع¾</label>
              {form.mcqChoices.map((c, i) => (
                <div key={c.id} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="mcq-correct"
                    checked={c.isCorrect}
                    onChange={() =>
                      setForm((p) => ({
                        ...p,
                        mcqChoices: p.mcqChoices.map((ch) => ({ ...ch, isCorrect: ch.id === c.id })),
                      }))
                    }
                    className="accent-primary"
                  />
                  <Input
                    value={c.text}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        mcqChoices: p.mcqChoices.map((ch) =>
                          ch.id === c.id ? { ...ch, text: e.target.value } : ch
                        ),
                      }))
                    }
                    placeholder={`ط·آ§ط¸â€‍ط·آ®ط¸ظ¹ط·آ§ط·آ± ${i + 1}`}
                    className="flex-1"
                  />
                  {c.isCorrect && <Badge variant="success" size="sm">ط·آµط·آ­ط¸ظ¹ط·آ­</Badge>}
                </div>
              ))}
            </div>
          )}

          {form.type === "true-false" && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text">ط·آ§ط¸â€‍ط·آ¥ط·آ¬ط·آ§ط·آ¨ط·آ© ط·آ§ط¸â€‍ط·آµط·آ­ط¸ظ¹ط·آ­ط·آ©</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tf-correct"
                    checked={form.tfCorrect === true}
                    onChange={() => setForm((p) => ({ ...p, tfCorrect: true }))}
                    className="accent-primary"
                  />
                  <span className="text-text">ط·آµط·آ­</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tf-correct"
                    checked={form.tfCorrect === false}
                    onChange={() => setForm((p) => ({ ...p, tfCorrect: false }))}
                    className="accent-primary"
                  />
                  <span className="text-text">ط·آ®ط·آ·ط·آ£</span>
                </label>
              </div>
            </div>
          )}

          {form.type === "fill-blank" && (
            <Input
              label="ط·آ§ط¸â€‍ط·آ¥ط·آ¬ط·آ§ط·آ¨ط·آ© ط·آ§ط¸â€‍ط·آµط·آ­ط¸ظ¹ط·آ­ط·آ©"
              value={form.correctAnswer}
              onChange={(e) => setForm((p) => ({ ...p, correctAnswer: e.target.value }))}
              placeholder="ط·آ£ط·آ¯ط·آ®ط¸â€‍ ط·آ§ط¸â€‍ط·آ¥ط·آ¬ط·آ§ط·آ¨ط·آ© ط·آ§ط¸â€‍ط·آµط·آ­ط¸ظ¹ط·آ­ط·آ©"
            />
          )}

          {form.type === "ordering" && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-text">ط·آ¹ط¸â€ ط·آ§ط·آµط·آ± ط·آ§ط¸â€‍ط·ع¾ط·آ±ط·ع¾ط¸ظ¹ط·آ¨</label>
              {form.orderingItems.map((item, i) => (
                <div key={item.id} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-bold shrink-0">
                    {item.correctOrder}
                  </span>
                  <Input
                    value={item.text}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        orderingItems: p.orderingItems.map((o) =>
                          o.id === item.id ? { ...o, text: e.target.value } : o
                        ),
                      }))
                    }
                    placeholder={`ط·آ§ط¸â€‍ط·آ¹ط¸â€ ط·آµط·آ± ${i + 1}`}
                    className="flex-1"
                  />
                </div>
              ))}
            </div>
          )}

          {form.type === "matching" && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-text">ط·آ£ط·آ²ط¸ث†ط·آ§ط·آ¬ ط·آ§ط¸â€‍ط¸â€¦ط·آ·ط·آ§ط·آ¨ط¸â€ڑط·آ©</label>
              {form.matchingLeft.map((m, i) => (
                <div key={m.id} className="grid grid-cols-2 gap-3 items-center">
                  <Input
                    value={m.text}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        matchingLeft: p.matchingLeft.map((ml) =>
                          ml.id === m.id ? { ...ml, text: e.target.value } : ml
                        ),
                      }))
                    }
                    placeholder={`ط·آ§ط¸â€‍ط·آ¹ط¸â€¦ط¸ث†ط·آ¯ ط·آ§ط¸â€‍ط·آ£ط¸ث†ط¸â€‍ - ${i + 1}`}
                  />
                  <Input
                    value={form.matchingRight.find((r) => r.matchId === m.id)?.text ?? ""}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        matchingRight: p.matchingRight.map((mr) =>
                          mr.matchId === m.id ? { ...mr, text: e.target.value } : mr
                        ),
                      }))
                    }
                    placeholder={`ط·آ§ط¸â€‍ط·آ¹ط¸â€¦ط¸ث†ط·آ¯ ط·آ§ط¸â€‍ط·آ«ط·آ§ط¸â€ ط¸ظ¹ - ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <Button variant="primary" onClick={handleSave} className="flex-1">
              {editingQuestion ? "ط·آ­ط¸ظ¾ط·آ¸ ط·آ§ط¸â€‍ط·ع¾ط·ط›ط¸ظ¹ط¸ظ¹ط·آ±ط·آ§ط·ع¾" : "ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ§ط¸â€‍ط·آ³ط·آ¤ط·آ§ط¸â€‍"}
            </Button>
            <Button variant="secondary" onClick={() => setCreateModalOpen(false)} className="flex-1">
              ط·آ¥ط¸â€‍ط·ط›ط·آ§ط·طŒ
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="ط·آ­ط·آ°ط¸ظ¾ ط·آ§ط¸â€‍ط·آ³ط·آ¤ط·آ§ط¸â€‍"
        message={deleteTarget ? `ط¸â€،ط¸â€‍ ط·آ£ط¸â€ ط·ع¾ ط¸â€¦ط·ع¾ط·آ£ط¸ئ’ط·آ¯ ط¸â€¦ط¸â€  ط·آ­ط·آ°ط¸ظ¾ ط¸â€،ط·آ°ط·آ§ ط·آ§ط¸â€‍ط·آ³ط·آ¤ط·آ§ط¸â€‍ط·ع؛ ط¸â€،ط·آ°ط·آ§ ط·آ§ط¸â€‍ط·آ¥ط·آ¬ط·آ±ط·آ§ط·طŒ ط¸â€‍ط·آ§ ط¸ظ¹ط¸â€¦ط¸ئ’ط¸â€  ط·آ§ط¸â€‍ط·ع¾ط·آ±ط·آ§ط·آ¬ط·آ¹ ط·آ¹ط¸â€ ط¸â€،.` : ""}
        confirmText="ط·آ­ط·آ°ط¸ظ¾"
        cancelText="ط·آ¥ط¸â€‍ط·ط›ط·آ§ط·طŒ"
        variant="danger"
      />

      <ConfirmDialog
        isOpen={bulkDeleteOpen}
        onClose={() => setBulkDeleteOpen(false)}
        onConfirm={handleBulkDelete}
        title="ط·آ­ط·آ°ط¸ظ¾ ط·آ§ط¸â€‍ط·آ£ط·آ³ط·آ¦ط¸â€‍ط·آ© ط·آ§ط¸â€‍ط¸â€¦ط·آ­ط·آ¯ط·آ¯ط·آ©"
        message={`ط¸â€،ط¸â€‍ ط·آ£ط¸â€ ط·ع¾ ط¸â€¦ط·ع¾ط·آ£ط¸ئ’ط·آ¯ ط¸â€¦ط¸â€  ط·آ­ط·آ°ط¸ظ¾ ${selectedIds.size} ط·آ£ط·آ³ط·آ¦ط¸â€‍ط·آ©ط·ع؛ ط¸â€،ط·آ°ط·آ§ ط·آ§ط¸â€‍ط·آ¥ط·آ¬ط·آ±ط·آ§ط·طŒ ط¸â€‍ط·آ§ ط¸ظ¹ط¸â€¦ط¸ئ’ط¸â€  ط·آ§ط¸â€‍ط·ع¾ط·آ±ط·آ§ط·آ¬ط·آ¹ ط·آ¹ط¸â€ ط¸â€،.`}
        confirmText="ط·آ­ط·آ°ط¸ظ¾ ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍"
        cancelText="ط·آ¥ط¸â€‍ط·ط›ط·آ§ط·طŒ"
        variant="danger"
      />
    </div>
  )
}

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
  "multiple-choice": "اختيار من متعدد",
  "true-false": "صح/خطأ",
  "fill-blank": "ملء الفراغ",
  ordering: "ترتيب",
  matching: "مطابقة",
  essay: "مقالي",
}

const typeVariants: Record<Question["type"], "primary" | "info" | "warning" | "secondary" | "premium" | "neutral"> = {
  "multiple-choice": "primary",
  "true-false": "info",
  "fill-blank": "warning",
  ordering: "secondary",
  matching: "premium",
  essay: "neutral",
}

const difficultyLabels: Record<string, string> = { easy: "سهل", medium: "متوسط", hard: "صعب" }
const difficultyVariants: Record<string, "success" | "warning" | "error"> = { easy: "success", medium: "warning", hard: "error" }

const typeOptions = [
  { value: "multiple-choice", label: "اختيار من متعدد" },
  { value: "true-false", label: "صح/خطأ" },
  { value: "fill-blank", label: "ملء الفراغ" },
  { value: "ordering", label: "ترتيب" },
  { value: "matching", label: "مطابقة" },
  { value: "essay", label: "مقالي" },
]

const difficultyOptions = [
  { value: "easy", label: "سهل" },
  { value: "medium", label: "متوسط" },
  { value: "hard", label: "صعب" },
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
          { id: "true", text: "صح", isCorrect: form.tfCorrect },
          { id: "false", text: "خطأ", isCorrect: !form.tfCorrect },
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
      addToast({ type: "error", title: "نص السؤال مطلوب" })
      return
    }
    if (editingQuestion) {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === editingQuestion.id ? { ...buildQuestionFromForm(form), id: q.id, stats: q.stats } : q
        )
      )
      addToast({ type: "success", title: "طھظ… تحديث السؤال بنجاح" })
    } else {
      setQuestions((prev) => [...prev, buildQuestionFromForm(form)])
      addToast({ type: "success", title: "طھظ… إضافة السؤال بنجاح" })
    }
    setCreateModalOpen(false)
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    setQuestions((prev) => prev.filter((q) => q.id !== deleteTarget.id))
    addToast({ type: "success", title: "طھظ… حذف السؤال بنجاح" })
    setDeleteTarget(null)
  }

  const handleBulkDelete = () => {
    setQuestions((prev) => prev.filter((q) => !selectedIds.has(q.id)))
    addToast({ type: "success", title: `طھظ… حذف ${selectedIds.size} أسئلة بنجاح` })
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
      <DashboardHeader title="بنك الأسئلة" subtitle="إدارة أسئلة الكورسات والاختبارات" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="إجمالي الأسئلة" value={stats.total} icon={HiOutlineBookOpen} color="primary" />
        <StatsCard title="متوسط الصعوبة" value={stats.avgDifficulty} icon={HiOutlineFilter} color="warning" />
        <StatsCard
          title="الأكثر استخداماً"
          value={stats.mostUsed ? truncate(stats.mostUsed.text, 20) : "-"}
          icon={HiOutlineChartBar}
          color="info"
        />
        <StatsCard title="نسبة الإجابة الصحيحة" value={`${stats.avgCorrect}%`} icon={HiOutlineClipboardList} color="success" />
      </div>

      <Card>
        <div className="p-4 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <SearchInput value={search} onChange={setSearch} placeholder="بحث عن سؤال..." className="min-w-[200px] flex-1" />
            <Select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              options={[{ value: "", label: "كل الكورسات" }, ...courseOptions]}
              className="min-w-[180px]"
            />
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              options={[{ value: "", label: "كل الأنواع" }, ...typeOptions]}
              className="min-w-[160px]"
            />
            <Select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              options={[{ value: "", label: "كل الصعوبات" }, ...difficultyOptions]}
              className="min-w-[140px]"
            />
            <Select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              options={[{ value: "", label: "كل الوسوم" }, ...tagOptions]}
              className="min-w-[140px]"
            />
            <Button variant="primary" onClick={openCreate} leftIcon={<HiOutlinePlus size={18} />}>
              إضافة سؤال
            </Button>
          </div>
        </div>
      </Card>

      {selectedIds.size > 0 && (
        <div className="flex items-center gap-2 px-1">
          <span className="text-sm text-text-secondary">{selectedIds.size} سؤال محدد</span>
          <Button variant="danger" size="sm" leftIcon={<HiOutlineTrash size={16} />} onClick={() => setBulkDeleteOpen(true)}>
            حذف المحدد
          </Button>
        </div>
      )}

      {filtered.items.length === 0 ? (
        <EmptyState
          title="لا توجد أسئلة"
          description="لم ظٹطھظ… العثور على أسئلة تطابق معايير البحث. أضف سؤالاً جديداً أو عدّل فلتر البحث."
          action={
            <Button variant="primary" onClick={openCreate} leftIcon={<HiOutlinePlus size={18} />}>
              إضافة سؤال
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
                <th className="text-right px-4 py-3 font-semibold text-text-secondary">نص السؤال</th>
                <th className="text-right px-4 py-3 font-semibold text-text-secondary">النوع</th>
                <th className="text-right px-4 py-3 font-semibold text-text-secondary">الصعوبة</th>
                <th className="text-right px-4 py-3 font-semibold text-text-secondary">الدرجة</th>
                <th className="text-right px-4 py-3 font-semibold text-text-secondary">الوسوم</th>
                <th className="text-right px-4 py-3 font-semibold text-text-secondary">الاستخدام</th>
                <th className="text-right px-4 py-3 font-semibold text-text-secondary">نسبة الصحة</th>
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
                        title="عرض"
                      >
                        <HiOutlineEye size={16} />
                      </button>
                      <button type="button"
                        onClick={() => openEdit(q)}
                        className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        title="تعديل"
                      >
                        <HiOutlineFilter size={16} />
                      </button>
                      <button type="button"
                        onClick={() => setDeleteTarget(q)}
                        className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors"
                        title="حذف"
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
        title="تفاصيل السؤال"
        size="lg"
      >
        {selectedQuestion && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">نص السؤال</label>
              <p className="text-text bg-surface-secondary rounded-lg p-3 leading-relaxed">{selectedQuestion.text}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div>
                <span className="text-sm text-text-secondary ml-2">النوع:</span>
                <Badge variant={typeVariants[selectedQuestion.type]}>{typeLabels[selectedQuestion.type]}</Badge>
              </div>
              <div>
                <span className="text-sm text-text-secondary ml-2">الصعوبة:</span>
                <Badge variant={difficultyVariants[selectedQuestion.difficulty]}>{difficultyLabels[selectedQuestion.difficulty]}</Badge>
              </div>
              <div>
                <span className="text-sm text-text-secondary ml-2">الدرجة:</span>
                <span className="font-mono text-text">{selectedQuestion.grade}</span>
              </div>
            </div>
            {(selectedQuestion.type === "multiple-choice" || selectedQuestion.type === "true-false") && selectedQuestion.choices && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">الخيارات</label>
                <div className="space-y-2">
                  {selectedQuestion.choices.map((c) => (
                    <div
                      key={c.id}
                      className={`p-3 rounded-lg border ${c.isCorrect ? "border-success bg-success/5" : "border-border"}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${c.isCorrect ? "bg-success" : "bg-text-tertiary"}`} />
                        <span className="text-text">{c.text}</span>
                        {c.isCorrect && <Badge variant="success" size="sm">الإجابة الصحيحة</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {selectedQuestion.correctAnswer && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">الإجابة الصحيحة</label>
                <p className="text-text font-medium">{selectedQuestion.correctAnswer}</p>
              </div>
            )}
            {selectedQuestion.explanation && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">الشرح</label>
                <p className="text-text-secondary text-sm leading-relaxed">{selectedQuestion.explanation}</p>
              </div>
            )}
            {selectedQuestion.orderingItems && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">عناصر الترتيب</label>
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
                <label className="block text-sm font-medium text-text-secondary mb-2">المطابقة</label>
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
                <label className="block text-sm font-medium text-text-secondary mb-2">الإحصائيات</label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-surface-secondary rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-text">{selectedQuestion.stats.timesUsed}</p>
                    <p className="text-xs text-text-tertiary">مرات الاستخدام</p>
                  </div>
                  <div className="bg-surface-secondary rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-success">{selectedQuestion.stats.correctRate}%</p>
                    <p className="text-xs text-text-tertiary">إجابات صحيحة</p>
                  </div>
                  <div className="bg-surface-secondary rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-error">{selectedQuestion.stats.incorrectRate}%</p>
                    <p className="text-xs text-text-tertiary">إجابات خاطئة</p>
                  </div>
                </div>
              </div>
            )}
            {selectedQuestion.tags && selectedQuestion.tags.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">الوسوم</label>
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
        title={editingQuestion ? "تعديل سؤال" : "إضافة سؤال جديد"}
        size="xl"
      >
        <div className="space-y-4 max-h-[65vh] overflow-y-auto px-0.5">
          <Textarea
            label="نص السؤال"
            value={form.text}
            onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
            placeholder="اكتب نص السؤال هنا..."
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="نوع السؤال"
              value={form.type}
              onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as Question["type"] }))}
              options={typeOptions}
            />
            <Select
              label="مستوى الصعوبة"
              value={form.difficulty}
              onChange={(e) => setForm((p) => ({ ...p, difficulty: e.target.value as "easy" | "medium" | "hard" }))}
              options={difficultyOptions}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="الدرجة"
              type="number"
              value={form.grade}
              onChange={(e) => setForm((p) => ({ ...p, grade: e.target.value }))}
            />
            <Select
              label="الكورس"
              value={form.courseId}
              onChange={(e) => setForm((p) => ({ ...p, courseId: e.target.value }))}
              options={[{ value: "", label: "اختر كورساً" }, ...courseOptions]}
            />
          </div>
          <Input
            label="الوسوم (مفصولة بفواصل)"
            value={form.tags}
            onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))}
            placeholder="نحو, صرف, بلاغة"
          />
          <Input
            label="الشرح (اختياري)"
            value={form.explanation}
            onChange={(e) => setForm((p) => ({ ...p, explanation: e.target.value }))}
            placeholder="شرح الإجابة الصحيحة"
          />

          {(form.type === "multiple-choice") && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-text">الخيارات</label>
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
                    placeholder={`الخيار ${i + 1}`}
                    className="flex-1"
                  />
                  {c.isCorrect && <Badge variant="success" size="sm">صحيح</Badge>}
                </div>
              ))}
            </div>
          )}

          {form.type === "true-false" && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text">الإجابة الصحيحة</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tf-correct"
                    checked={form.tfCorrect === true}
                    onChange={() => setForm((p) => ({ ...p, tfCorrect: true }))}
                    className="accent-primary"
                  />
                  <span className="text-text">صح</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tf-correct"
                    checked={form.tfCorrect === false}
                    onChange={() => setForm((p) => ({ ...p, tfCorrect: false }))}
                    className="accent-primary"
                  />
                  <span className="text-text">خطأ</span>
                </label>
              </div>
            </div>
          )}

          {form.type === "fill-blank" && (
            <Input
              label="الإجابة الصحيحة"
              value={form.correctAnswer}
              onChange={(e) => setForm((p) => ({ ...p, correctAnswer: e.target.value }))}
              placeholder="أدخل الإجابة الصحيحة"
            />
          )}

          {form.type === "ordering" && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-text">عناصر الترتيب</label>
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
                    placeholder={`العنصر ${i + 1}`}
                    className="flex-1"
                  />
                </div>
              ))}
            </div>
          )}

          {form.type === "matching" && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-text">أزواج المطابقة</label>
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
                    placeholder={`العمود الأول - ${i + 1}`}
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
                    placeholder={`العمود الثاني - ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <Button variant="primary" onClick={handleSave} className="flex-1">
              {editingQuestion ? "حفظ التغييرات" : "إضافة السؤال"}
            </Button>
            <Button variant="secondary" onClick={() => setCreateModalOpen(false)} className="flex-1">
              إلغاء
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="حذف السؤال"
        message={deleteTarget ? `هل أنت متأكد من حذف هذا السؤال؟ هذا الإجراء لا يمكن التراجع عنه.` : ""}
        confirmText="حذف"
        cancelText="إلغاء"
        variant="danger"
      />

      <ConfirmDialog
        isOpen={bulkDeleteOpen}
        onClose={() => setBulkDeleteOpen(false)}
        onConfirm={handleBulkDelete}
        title="حذف الأسئلة المحددة"
        message={`هل أنت متأكد من حذف ${selectedIds.size} أسئلة؟ هذا الإجراء لا يمكن التراجع عنه.`}
        confirmText="حذف الكل"
        cancelText="إلغاء"
        variant="danger"
      />
    </div>
  )
}

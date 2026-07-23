"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlinePlus, HiOutlineTrash, HiOutlineEye, HiOutlineBookOpen,
  HiOutlineClipboardList, HiOutlineChartBar, HiOutlineFilter, HiOutlinePencil,
} from "react-icons/hi"
import { PageHeader } from "@/components/ui/PageHeader"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { SearchInput } from "@/components/ui/SearchInput"
import { EmptyState } from "@/components/ui/EmptyState"
import { ConfirmDialog } from "@/components/ui/ConfirmDialog"
import Button from "@/components/ui/Button"
import { mockQuestions, mockCourses } from "@/lib/mock/data"
import type { Question } from "@/lib/types"
import { generateId, truncate } from "@/lib/utils"
import toast from "react-hot-toast"

const typeLabels: Record<Question["type"], string> = {
  "multiple-choice": "اختيار من متعدد", "true-false": "صح/خطأ", "fill-blank": "ملء الفراغ",
  ordering: "ترتيب", matching: "مطابقة", essay: "مقالي",
}

const typeVariants: Record<Question["type"], "primary" | "info" | "warning" | "success" | "error" | "default"> = {
  "multiple-choice": "primary", "true-false": "info", "fill-blank": "warning",
  ordering: "success", matching: "error", essay: "default",
}

const difficultyLabels: Record<string, string> = { easy: "سهل", medium: "متوسط", hard: "صعب" }
const difficultyVariants: Record<string, "success" | "warning" | "error"> = { easy: "success", medium: "warning", hard: "error" }

const typeOptions = Object.entries(typeLabels).map(([v, l]) => ({ value: v, label: l }))
const difficultyOptions = Object.entries(difficultyLabels).map(([v, l]) => ({ value: v, label: l }))

interface QuestionForm {
  text: string; type: Question["type"]; grade: string; difficulty: "easy" | "medium" | "hard"
  tags: string; correctAnswer: string; explanation: string; courseId: string
  mcqChoices: { id: string; text: string; isCorrect: boolean }[]
  tfCorrect: boolean
}

const emptyForm: QuestionForm = {
  text: "", type: "multiple-choice", grade: "5", difficulty: "medium",
  tags: "", courseId: "", correctAnswer: "", explanation: "",
  mcqChoices: [
    { id: "a", text: "", isCorrect: true }, { id: "b", text: "", isCorrect: false },
    { id: "c", text: "", isCorrect: false }, { id: "d", text: "", isCorrect: false },
  ],
  tfCorrect: true,
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("")
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [detailQ, setDetailQ] = useState<Question | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [editQ, setEditQ] = useState<Question | null>(null)
  const [form, setForm] = useState<QuestionForm>(emptyForm)
  const [deleteTarget, setDeleteTarget] = useState<Question | null>(null)
  const [bulkDelete, setBulkDelete] = useState(false)

  const stats = useMemo(() => {
    const total = questions.length
    const dm = { easy: 1, medium: 2, hard: 3 }
    const avgDiff = total > 0 ? (questions.reduce((s, q) => s + dm[q.difficulty], 0) / total).toFixed(1) : "0"
    const mostUsed = questions.reduce((best, q) => (q.stats?.timesUsed ?? 0) > (best.stats?.timesUsed ?? 0) ? q : best, questions[0])
    const avgCorrect = total > 0 ? Math.round(questions.reduce((s, q) => s + (q.stats?.correctRate ?? 0), 0) / total) : 0
    return { total, avgDiff, mostUsed, avgCorrect }
  }, [questions])

  const allTags = useMemo(() => [...new Set(questions.flatMap((q) => q.tags || []))].sort(), [questions])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return questions.filter((qs) =>
      (qs.text.toLowerCase().includes(q)) &&
      (!typeFilter || qs.type === typeFilter) &&
      (!difficultyFilter || qs.difficulty === difficultyFilter)
    )
  }, [search, typeFilter, difficultyFilter, questions])

  const openEdit = (q: Question) => {
    setEditQ(q)
    const choices = q.type === "multiple-choice" && q.choices ? q.choices.map((c) => ({ ...c })) : [...emptyForm.mcqChoices]
    setForm({
      text: q.text, type: q.type, grade: String(q.grade), difficulty: q.difficulty,
      tags: (q.tags ?? []).join(", "), courseId: q.courseId ?? "", correctAnswer: q.correctAnswer ?? "",
      explanation: q.explanation ?? "", mcqChoices: choices.length === 4 ? choices : [...emptyForm.mcqChoices],
      tfCorrect: q.choices?.[0]?.isCorrect ?? true,
    })
    setShowCreate(true)
  }

  const handleSave = () => {
    if (!form.text.trim()) { toast.error("نص السؤال مطلوب"); return }
    const q: Question = {
      id: editQ?.id || generateId(), type: form.type, text: form.text, grade: Number(form.grade),
      suggestedTime: 2, difficulty: form.difficulty, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      courseId: form.courseId, correctAnswer: form.correctAnswer || undefined,
      explanation: form.explanation || undefined,
      choices: form.type === "multiple-choice" ? form.mcqChoices : form.type === "true-false"
        ? [{ id: "true", text: "صح", isCorrect: form.tfCorrect }, { id: "false", text: "خطأ", isCorrect: !form.tfCorrect }] : undefined,
      stats: editQ?.stats || { timesUsed: 0, correctRate: 0, incorrectRate: 0 },
    }
    setQuestions((prev) => editQ ? prev.map((p) => p.id === editQ.id ? q : p) : [...prev, q])
    toast.success(editQ ? "تم تحديث السؤال" : "تم إضافة السؤال")
    setShowCreate(false); setEditQ(null)
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    setQuestions((prev) => prev.filter((q) => q.id !== deleteTarget.id))
    toast.success("تم حذف السؤال"); setDeleteTarget(null)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="بنك الأسئلة" description="إدارة أسئلة الكورسات والاختبارات"
        breadcrumbs={[{ label: "لوحة التحكم", href: "/teacher" }, { label: "بنك الأسئلة" }]}
        actions={<Button variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => { setEditQ(null); setForm(emptyForm); setShowCreate(true) }}>إضافة سؤال</Button>}
      />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard title="إجمالي الأسئلة" value={stats.total} icon={HiOutlineBookOpen} color="primary" trend={5} />
        <StatsCard title="متوسط الصعوبة" value={stats.avgDiff} icon={HiOutlineFilter} color="warning" />
        <StatsCard title="الأكثر استخداماً" value={stats.mostUsed ? truncate(stats.mostUsed.text, 20) : "-"} icon={HiOutlineChartBar} color="info" />
        <StatsCard title="نسبة الإجابة الصحيحة" value={`${stats.avgCorrect}%`} icon={HiOutlineClipboardList} color="success" />
      </motion.div>

      <div className="bg-card border border-border rounded-[24px] p-5 ">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <SearchInput value={search} onChange={setSearch} placeholder="بحث عن سؤال..." className="flex-1" />
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2.5 bg-card border border-border rounded-[16px] text-sm text-text appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 ">
            <option value="">كل الأنواع</option>
            {typeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-4 py-2.5 bg-card border border-border rounded-[16px] text-sm text-text appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 ">
            <option value="">كل الصعوبات</option>
            {difficultyOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {selectedIds.size > 0 && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 px-4 py-3 bg-primary/5 border border-primary/20 rounded-[16px] mb-4 backdrop-blur">
            <span className="text-sm text-primary font-medium">{selectedIds.size} سؤال محدد</span>
            <Button variant="danger" size="sm" leftIcon={<HiOutlineTrash className="w-4 h-4" />} onClick={() => setBulkDelete(true)}>حذف المحدد</Button>
          </motion.div>
        )}

        {filtered.length === 0 ? (
          <EmptyState icon={HiOutlineBookOpen} title="لا توجد أسئلة" description="لم يتم العثور على أسئلة مطابقة" actionLabel="إضافة سؤال" onAction={() => { setEditQ(null); setForm(emptyForm); setShowCreate(true) }} />
        ) : (
          <>
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="w-10 px-2 py-3.5">
                      <input type="checkbox" checked={selectedIds.size === filtered.length} onChange={() => setSelectedIds(selectedIds.size === filtered.length ? new Set() : new Set(filtered.map((q) => q.id)))}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 cursor-pointer bg-card" />
                    </th>
                    <th className="text-right text-xs font-medium text-text-tertiary px-3 py-3.5 whitespace-nowrap">نص السؤال</th>
                    <th className="text-right text-xs font-medium text-text-tertiary px-3 py-3.5 whitespace-nowrap">النوع</th>
                    <th className="text-right text-xs font-medium text-text-tertiary px-3 py-3.5 whitespace-nowrap">الصعوبة</th>
                    <th className="text-right text-xs font-medium text-text-tertiary px-3 py-3.5 whitespace-nowrap">الدرجة</th>
                    <th className="text-right text-xs font-medium text-text-tertiary px-3 py-3.5 whitespace-nowrap">الوسوم</th>
                    <th className="text-right text-xs font-medium text-text-tertiary px-3 py-3.5 whitespace-nowrap">الاستخدام</th>
                    <th className="text-right text-xs font-medium text-text-tertiary px-3 py-3.5 whitespace-nowrap">نسبة الصحة</th>
                    <th className="w-20 px-3 py-3.5" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((q, i) => (
                    <motion.tr key={q.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                      className="border-b border-border/50 transition-all duration-200 hover:bg-card/40 cursor-pointer" onClick={() => setDetailQ(q)}
                    >
                      <td className="px-2 py-3" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" checked={selectedIds.has(q.id)} onChange={() => { const n = new Set(selectedIds); n.has(q.id) ? n.delete(q.id) : n.add(q.id); setSelectedIds(n) }}
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 cursor-pointer bg-card" />
                      </td>
                      <td className="px-3 py-3 text-sm text-text font-medium max-w-[250px]"><span className="line-clamp-1">{truncate(q.text, 60)}</span></td>
                      <td className="px-3 py-3"><Badge variant={typeVariants[q.type]} size="sm">{typeLabels[q.type]}</Badge></td>
                      <td className="px-3 py-3"><Badge variant={difficultyVariants[q.difficulty]} size="sm">{difficultyLabels[q.difficulty]}</Badge></td>
                      <td className="px-3 py-3 text-sm text-text-secondary">{q.grade}</td>
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap gap-1">
                          {(q.tags || []).slice(0, 2).map((t) => <Badge key={t} variant="default" size="sm">{t}</Badge>)}
                          {(q.tags?.length ?? 0) > 2 && <Badge variant="default" size="sm">+{q.tags!.length - 2}</Badge>}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm text-text-secondary">{q.stats?.timesUsed ?? 0}</td>
                      <td className="px-3 py-3 text-sm text-text-secondary">{q.stats?.correctRate ?? 0}%</td>
                      <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-1">
                          <button onClick={() => setDetailQ(q)} className="p-1.5 rounded-[10px] text-text-tertiary hover:text-primary hover:bg-primary/10 transition-all"><HiOutlineEye className="w-4 h-4" /></button>
                          <button onClick={() => openEdit(q)} className="p-1.5 rounded-[10px] text-text-tertiary hover:text-primary hover:bg-primary/10 transition-all"><HiOutlinePencil className="w-4 h-4" /></button>
                          <button onClick={() => setDeleteTarget(q)} className="p-1.5 rounded-[10px] text-text-tertiary hover:text-error hover:bg-error/10 transition-all"><HiOutlineTrash className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="sm:hidden space-y-3">
              {filtered.map((q, i) => (
                <div key={q.id} onClick={() => setDetailQ(q)}
                  className="bg-card border border-border rounded-[20px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.03)] hover:-translate-y-0.5 transition-all duration-250 cursor-pointer"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <input type="checkbox" checked={selectedIds.has(q.id)} onChange={() => { const n = new Set(selectedIds); n.has(q.id) ? n.delete(q.id) : n.add(q.id); setSelectedIds(n) }}
                      onClick={(e) => e.stopPropagation()} className="w-4 h-4 rounded border-border text-primary mt-0.5 bg-card shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-text font-medium line-clamp-2">{truncate(q.text, 80)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary flex-wrap">
                    <Badge variant={typeVariants[q.type]} size="sm">{typeLabels[q.type]}</Badge>
                    <Badge variant={difficultyVariants[q.difficulty]} size="sm">{difficultyLabels[q.difficulty]}</Badge>
                    <span>{q.grade} درجات</span>
                    <span>استخدام: {q.stats?.timesUsed ?? 0}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Detail Modal */}
      {detailQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setDetailQ(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-card border border-border rounded-[24px] shadow-[0_24px_80px_rgba(0,0,0,0.08)] max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-4 sticky top-0 bg-card/80 backdrop-blur z-10">
              <h2 className="text-lg font-semibold text-text">تفاصيل السؤال</h2>
              <button onClick={() => setDetailQ(null)} className="p-1.5 rounded-[12px] text-text-tertiary hover:text-text hover:bg-card transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="px-6 pb-6 space-y-5">
              <div>
                <p className="text-sm text-text-secondary mb-1">نص السؤال</p>
                <p className="text-text bg-card/40 border border-border rounded-[16px] p-4 leading-relaxed">{detailQ.text}</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <span className="text-sm text-text-secondary">النوع: <Badge variant={typeVariants[detailQ.type]}>{typeLabels[detailQ.type]}</Badge></span>
                <span className="text-sm text-text-secondary">الصعوبة: <Badge variant={difficultyVariants[detailQ.difficulty]}>{difficultyLabels[detailQ.difficulty]}</Badge></span>
                <span className="text-sm text-text-secondary">الدرجة: <span className="text-text font-medium">{detailQ.grade}</span></span>
              </div>
              {(detailQ.type === "multiple-choice" || detailQ.type === "true-false") && detailQ.choices && (
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-2">الخيارات</p>
                  <div className="space-y-2">
                    {detailQ.choices.map((c) => (
                      <div key={c.id} className={`p-3 rounded-[14px] border ${c.isCorrect ? "border-success/30 bg-success/5" : "border-border bg-card/40"} backdrop-blur`}>
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
              {detailQ.explanation && (
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-1">الشرح</p>
                  <p className="text-sm text-text-secondary leading-relaxed p-4 bg-card/40 border border-border rounded-[16px]">{detailQ.explanation}</p>
                </div>
              )}
              {detailQ.stats && (
                <div>
                  <p className="text-sm font-medium text-text-secondary mb-2">الإحصائيات</p>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "مرات الاستخدام", value: detailQ.stats.timesUsed, color: "text-text" },
                      { label: "إجابات صحيحة", value: `${detailQ.stats.correctRate}%`, color: "text-success" },
                      { label: "إجابات خاطئة", value: `${detailQ.stats.incorrectRate}%`, color: "text-error" },
                    ].map((s) => (
                      <div key={s.label} className="bg-card/40 border border-border rounded-[16px] p-4 text-center backdrop-blur">
                        <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                        <p className="text-xs text-text-tertiary">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {detailQ.tags && detailQ.tags.length > 0 && (
                <div>
                  <p className="text-sm text-text-secondary mb-1">الوسوم</p>
                  <div className="flex flex-wrap gap-1.5">
                    {detailQ.tags.map((t) => <Badge key={t} variant="default">{t}</Badge>)}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowCreate(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-card border border-border rounded-[24px] shadow-[0_24px_80px_rgba(0,0,0,0.08)] max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-4 sticky top-0 bg-card/80 backdrop-blur z-10">
              <h2 className="text-lg font-semibold text-text">{editQ ? "تعديل سؤال" : "إضافة سؤال"}</h2>
              <button onClick={() => setShowCreate(false)} className="p-1.5 rounded-[12px] text-text-tertiary hover:text-text hover:bg-card transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="px-6 pb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">نص السؤال</label>
                <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="اكتب نص السؤال هنا..."
                  className="w-full bg-card border border-border rounded-[16px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50 min-h-[80px]  focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">نوع السؤال</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Question["type"] })}
                    className="w-full bg-card border border-border rounded-[16px] px-4 py-2.5 text-sm text-text appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30 ">
                    {typeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">مستوى الصعوبة</label>
                  <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value as "easy" | "medium" | "hard" })}
                    className="w-full bg-card border border-border rounded-[16px] px-4 py-2.5 text-sm text-text appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30 ">
                    {difficultyOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">الدرجة</label>
                  <input type="number" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })}
                    className="w-full bg-card border border-border rounded-[16px] px-4 py-2.5 text-sm text-text  focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">الكورس</label>
                  <select value={form.courseId} onChange={(e) => setForm({ ...form, courseId: e.target.value })}
                    className="w-full bg-card border border-border rounded-[16px] px-4 py-2.5 text-sm text-text appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30 ">
                    <option value="">اختر كورساً</option>
                    {mockCourses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">الوسوم (مفصولة بفواصل)</label>
                <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="نحو, صرف, بلاغة"
                  className="w-full bg-card border border-border rounded-[16px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50  focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">الشرح (اختياري)</label>
                <input value={form.explanation} onChange={(e) => setForm({ ...form, explanation: e.target.value })} placeholder="شرح الإجابة الصحيحة"
                  className="w-full bg-card border border-border rounded-[16px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50  focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
              </div>

              {form.type === "multiple-choice" && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-text">الخيارات</p>
                  {form.mcqChoices.map((c, i) => (
                    <div key={c.id} className="flex items-center gap-3">
                      <input type="radio" name="mcq-correct" checked={c.isCorrect} onChange={() => setForm({ ...form, mcqChoices: form.mcqChoices.map((ch) => ({ ...ch, isCorrect: ch.id === c.id })) })} className="accent-primary w-4 h-4" />
                      <input value={c.text} onChange={(e) => setForm({ ...form, mcqChoices: form.mcqChoices.map((ch) => ch.id === c.id ? { ...ch, text: e.target.value } : ch) })} placeholder={`الخيار ${i + 1}`}
                        className="flex-1 bg-card border border-border rounded-[16px] px-4 py-2 text-sm text-text placeholder-text-tertiary/50 focus:outline-none focus:ring-2 focus:ring-primary/30  transition-all" />
                      {c.isCorrect && <Badge variant="success" size="sm">صحيح</Badge>}
                    </div>
                  ))}
                </div>
              )}

              {form.type === "true-false" && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-text">الإجابة الصحيحة</p>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="tf" checked={form.tfCorrect === true} onChange={() => setForm({ ...form, tfCorrect: true })} className="accent-primary w-4 h-4" />
                      <span className="text-text">صح</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="tf" checked={form.tfCorrect === false} onChange={() => setForm({ ...form, tfCorrect: false })} className="accent-primary w-4 h-4" />
                      <span className="text-text">خطأ</span>
                    </label>
                  </div>
                </div>
              )}

              {form.type === "fill-blank" && (
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">الإجابة الصحيحة</label>
                  <input value={form.correctAnswer} onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })} placeholder="أدخل الإجابة الصحيحة"
                    className="w-full bg-card border border-border rounded-[16px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50  focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-border">
                <Button variant="primary" onClick={handleSave} className="flex-1">{editQ ? "حفظ التغييرات" : "إضافة السؤال"}</Button>
                <Button variant="secondary" onClick={() => setShowCreate(false)} className="flex-1">إلغاء</Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="حذف السؤال"
        message="هل أنت متأكد من حذف هذا السؤال؟ هذا الإجراء لا يمكن التراجع عنه." confirmText="حذف" variant="danger" />
      <ConfirmDialog isOpen={bulkDelete} onClose={() => setBulkDelete(false)} onConfirm={() => { setQuestions((prev) => prev.filter((q) => !selectedIds.has(q.id))); toast.success(`تم حذف ${selectedIds.size} أسئلة`); setSelectedIds(new Set()); setBulkDelete(false) }}
        title="حذف الأسئلة المحددة" message={`هل أنت متأكد من حذف ${selectedIds.size} أسئلة؟`} confirmText="حذف الكل" variant="danger" />
    </div>
  )
}

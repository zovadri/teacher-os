"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import {
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineSave,
  HiOutlineClipboardCheck,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Textarea from "@/components/ui/Textarea"
import Button from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { mockCourses, mockQuestions } from "@/lib/mock/data"

type QuestionType = "multiple-choice" | "true-false" | "essay"

interface Question {
  id: string
  type: QuestionType
  text: string
  grade: number
  choices?: { id: string; text: string; isCorrect: boolean }[]
  correctAnswer?: boolean
}

interface FormData {
  title: string
  description: string
  courseId: string
  chapterId: string
  duration: string
  startDate: string
  endDate: string
  totalGrade: string
  maxAttempts: string
  shuffleQuestions: boolean
  shuffleChoices: boolean
  showResultImmediately: boolean
}

const initialForm: FormData = {
  title: "",
  description: "",
  courseId: "",
  chapterId: "",
  duration: "60",
  startDate: "",
  endDate: "",
  totalGrade: "100",
  maxAttempts: "1",
  shuffleQuestions: false,
  shuffleChoices: false,
  showResultImmediately: true,
}

export default function CreateExamPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(initialForm)
  const [questions, setQuestions] = useState<Question[]>([])
  const [previewQuestion, setPreviewQuestion] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const selectedCourse = mockCourses.find((c) => c.id === form.courseId)
  const bankQuestions = mockQuestions.filter((q) => q.courseId === form.courseId)
  const totalQuestionGrade = questions.reduce((sum, q) => sum + (q.grade || 0), 0)

  const update = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const addQuestion = (type: QuestionType) => {
    const base: Question = { id: `q-${Date.now()}`, type, text: "", grade: 5 }
    if (type === "multiple-choice") base.choices = [
      { id: `c-${Date.now()}-1`, text: "", isCorrect: false },
      { id: `c-${Date.now()}-2`, text: "", isCorrect: false },
      { id: `c-${Date.now()}-3`, text: "", isCorrect: false },
      { id: `c-${Date.now()}-4`, text: "", isCorrect: false },
    ]
    if (type === "true-false") base.correctAnswer = true
    setQuestions((prev) => [...prev, base])
  }

  const addFromBank = (q: typeof bankQuestions[0]) => {
    const newQ: Question = {
      id: `q-${Date.now()}`,
      type: q.type as QuestionType,
      text: q.text,
      grade: q.grade,
    }
    if (q.type === "multiple-choice" || q.type === "true-false") {
      if (q.type === "multiple-choice" && q.choices) {
        newQ.choices = q.choices.map((c) => ({ id: c.id, text: c.text, isCorrect: c.isCorrect }))
      }
      if (q.type === "true-false") newQ.correctAnswer = true
    }
    setQuestions((prev) => [...prev, newQ])
  }

  const removeQuestion = (id: string) => setQuestions((prev) => prev.filter((q) => q.id !== id))

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...updates } : q)))
  }

  const updateChoice = (qId: string, cId: string, updates: Partial<{ text: string; isCorrect: boolean }>) => {
    setQuestions((prev) => prev.map((q) => {
      if (q.id !== qId || !q.choices) return q
      return { ...q, choices: q.choices.map((c) => (c.id === cId ? { ...c, ...updates } : c)) }
    }))
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSubmitting(false)
    toast.success("طھظ… ط­ظپط¸ ط§ظ„ط§ظ…طھط­ط§ظ† ط¨ظ†ط¬ط§ط­!")
    router.push("/teacher/exams")
  }

  const steps = ["ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„ط£ط³ط§ط³ظٹط©", "ط§ظ„ط£ط³ط¦ظ„ط©", "ط§ظ„ط¥ط¹ط¯ط§ط¯ط§طھ"]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ", href: "/teacher/exams" }, { label: "ط¥ط¶ط§ظپط© ط§ظ…طھط­ط§ظ† ط¬ط¯ظٹط¯" }]} />
      <DashboardHeader title="ط¥ط¶ط§ظپط© ط§ظ…طھط­ط§ظ† ط¬ط¯ظٹط¯" />

      <div className="flex items-center gap-2 md:gap-4 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 md:gap-4 flex-1">
            <div className={`flex items-center gap-2 ${i <= step ? "text-primary" : "text-text-tertiary"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                i < step ? "bg-primary text-white" :
                i === step ? "bg-primary/10 text-primary border-2 border-primary" :
                "bg-surface-tertiary text-text-tertiary"
              }`}>
                {i < step ? "âœ“" : i + 1}
              </div>
              <span className="text-sm font-medium hidden md:inline">{s}</span>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 rounded ${i < step ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„ط£ط³ط§ط³ظٹط©</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="ط¹ظ†ظˆط§ظ† ط§ظ„ط§ظ…طھط­ط§ظ†" value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="ظ…ط«ط§ظ„: ط§ط®طھط¨ط§ط± ط§ظ„ظ†ط­ظˆ ط§ظ„ط´ط§ظ…ظ„" />
              <Textarea label="ط§ظ„ظˆطµظپ" value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="ظˆطµظپ ط§ظ„ط§ظ…طھط­ط§ظ†..." />
              <div className="grid grid-cols-2 gap-4">
                <Select label="ط§ظ„ظƒظˆط±ط³" value={form.courseId} onChange={(e) => { update("courseId", e.target.value); update("chapterId", "") }} options={mockCourses.map((c) => ({ value: c.id, label: c.title }))} placeholder="ط§ط®طھط± ظƒظˆط±ط³ط§ظ‹" />
                <Select label="ط§ظ„ظپطµظ„ (ط§ط®طھظٹط§ط±ظٹ)" value={form.chapterId} onChange={(e) => update("chapterId", e.target.value)} options={selectedCourse?.chapters.map((ch) => ({ value: ch.id, label: ch.title })) || []} placeholder="ط§ط®طھط± ظپطµظ„ط§ظ‹" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ط§ظ„طھظˆظ‚ظٹطھ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Input label="ط§ظ„ظ…ط¯ط© (ط¨ط§ظ„ط¯ظ‚ط§ط¦ظ‚)" type="number" value={form.duration} onChange={(e) => update("duration", e.target.value)} />
                <Input label="طھط§ط±ظٹط® ط§ظ„ط¨ط¯ط§ظٹط©" type="date" value={form.startDate} onChange={(e) => update("startDate", e.target.value)} />
                <Input label="طھط§ط±ظٹط® ط§ظ„ظ†ظ‡ط§ظٹط©" type="date" value={form.endDate} onChange={(e) => update("endDate", e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ط§ظ„ط¯ط±ط¬ط© ط§ظ„ظ†ظ‡ط§ط¦ظٹط©</CardTitle>
            </CardHeader>
            <CardContent>
              <Input label="ط§ظ„ط¯ط±ط¬ط© ط§ظ„ظ†ظ‡ط§ط¦ظٹط© ظ„ظ„ط§ظ…طھط­ط§ظ†" type="number" value={form.totalGrade} onChange={(e) => update("totalGrade", e.target.value)} />
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <div />
            <Button variant="primary" size="lg" onClick={() => setStep(1)}>
              ط§ظ„طھط§ظ„ظٹ: ط§ظ„ط£ط³ط¦ظ„ط©
            </Button>
          </div>
        </motion.div>
      )}

      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>ط§ظ„ط£ط³ط¦ظ„ط©</CardTitle>
                <span className="text-sm text-text-secondary">ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط¯ط±ط¬ط§طھ: {totalQuestionGrade}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {[
                  { type: "multiple-choice" as QuestionType, label: "ط§ط®طھظٹط§ط± ظ…ظ† ظ…طھط¹ط¯ط¯" },
                  { type: "true-false" as QuestionType, label: "طµط­ ظˆط®ط·ط£" },
                  { type: "essay" as QuestionType, label: "ظ…ظ‚ط§ظ„ظٹ" },
                ].map((btn) => (
                  <Button key={btn.type} variant="outline" size="sm" leftIcon={<HiOutlinePlus size={16} />} onClick={() => addQuestion(btn.type)}>
                    {btn.label}
                  </Button>
                ))}
              </div>

              {bankQuestions.length > 0 && (
                <details className="bg-surface-secondary rounded-xl border border-border">
                  <summary className="px-4 py-3 text-sm font-medium text-text cursor-pointer hover:bg-surface-tertiary rounded-xl transition-colors">
                    ط§ظ„ط£ط³ط¦ظ„ط© ط§ظ„ظ…ظˆط¬ظˆط¯ط© ظپظٹ ط¨ظ†ظƒ ط§ظ„ط£ط³ط¦ظ„ط© ({bankQuestions.length})
                  </summary>
                  <div className="divide-y divide-border max-h-60 overflow-y-auto">
                    {bankQuestions.map((q) => (
                      <div key={q.id} className="flex items-center justify-between px-4 py-2.5 hover:bg-surface transition-colors">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-text truncate">{q.text}</p>
                          <div className="flex items-center gap-2 text-xs text-text-tertiary">
                            <Badge variant="info" size="sm">{q.type === "multiple-choice" ? "ط§ط®طھظٹط§ط± ظ…ظ† ظ…طھط¹ط¯ط¯" : q.type === "true-false" ? "طµط­ ظˆط®ط·ط£" : q.type === "essay" ? "ظ…ظ‚ط§ظ„ظٹ" : q.type}</Badge>
                            <span>{q.grade} ط¯ط±ط¬ط©</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="xs" leftIcon={<HiOutlinePlus size={14} />} onClick={() => addFromBank(q)}>
                          ط¥ط¶ط§ظپط©
                        </Button>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </CardContent>
          </Card>

          <AnimatePresence>
            {questions.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-12 text-center text-text-secondary rounded-xl border border-dashed border-border">
                <HiOutlineClipboardCheck size={48} className="mx-auto mb-3 text-text-tertiary/50" />
                <p>ظ„ظ… طھظ‚ظ… ط¨ط¥ط¶ط§ظپط© ط£ظٹ ط£ط³ط¦ظ„ط© ط¨ط¹ط¯</p>
                <p className="text-xs mt-1">ط§ط®طھط± ظ†ظˆط¹ ط§ظ„ط³ط¤ط§ظ„ ظ…ظ† ط§ظ„ط£ط²ط±ط§ط± ط£ط¹ظ„ط§ظ‡ ط£ظˆ ظ…ظ† ط¨ظ†ظƒ ط§ظ„ط£ط³ط¦ظ„ط©</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            {questions.map((q, idx) => (
              <motion.div key={q.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-5 rounded-xl bg-surface border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">{idx + 1}</span>
                    <Badge variant="neutral" size="sm">
                      {q.type === "multiple-choice" ? "ط§ط®طھظٹط§ط± ظ…ظ† ظ…طھط¹ط¯ط¯" : q.type === "true-false" ? "طµط­ ظˆط®ط·ط£" : "ظ…ظ‚ط§ظ„ظٹ"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => setPreviewQuestion(previewQuestion === q.id ? null : q.id)} className="p-1.5 rounded-lg hover:bg-surface-secondary text-text-tertiary transition-colors">
                      {previewQuestion === q.id ? <HiOutlineEyeOff size={16} /> : <HiOutlineEye size={16} />}
                    </button>
                    <button type="button" onClick={() => removeQuestion(q.id)} className="p-1.5 rounded-lg hover:bg-surface-secondary text-error transition-colors">
                      <HiOutlineTrash size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <input type="text" value={q.text} onChange={(e) => updateQuestion(q.id, { text: e.target.value })} placeholder="ط§ظƒطھط¨ ظ†طµ ط§ظ„ط³ط¤ط§ظ„..." className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                    </div>
                    <div className="w-20">
                      <input type="number" value={q.grade} min={0.5} step={0.5} onChange={(e) => updateQuestion(q.id, { grade: +e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-border bg-surface-secondary text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                      <p className="text-[10px] text-text-tertiary text-center mt-0.5">ط§ظ„ط¯ط±ط¬ط©</p>
                    </div>
                  </div>

                  {q.type === "multiple-choice" && (
                    <div className="space-y-3">
                      {q.choices?.map((choice, ci) => (
                        <div key={choice.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface-secondary border border-border">
                          <input type="radio" name={`correct-${q.id}`} checked={choice.isCorrect} onChange={() => q.choices?.forEach((c) => updateChoice(q.id, c.id, { isCorrect: c.id === choice.id }))} className="w-4 h-4 accent-primary shrink-0" />
                          <input type="text" value={choice.text} onChange={(e) => updateChoice(q.id, choice.id, { text: e.target.value })} placeholder={`ط§ط®طھظٹط§ط± ${ci + 1}`} className="flex-1 bg-transparent text-sm border-none outline-none focus:ring-0" />
                        </div>
                      ))}
                    </div>
                  )}

                  {q.type === "true-false" && (
                    <div className="flex gap-3">
                      {[{ label: "طµط­", value: true }, { label: "ط®ط·ط£", value: false }].map((opt) => (
                        <button type="button" key={opt.label} onClick={() => updateQuestion(q.id, { correctAnswer: opt.value })}
                          className={`px-6 py-2.5 rounded-xl text-sm font-medium border transition-all ${q.correctAnswer === opt.value ? "bg-primary/10 border-primary text-primary" : "border-border hover:border-primary/30"}`}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {q.type === "essay" && (
                    <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                      <p className="text-sm text-text-secondary">ط³ظٹظ‚ظˆظ… ط§ظ„ط·ط§ظ„ط¨ ط¨ظƒطھط§ط¨ط© ط¥ط¬ط§ط¨ط© ظ†طµظٹط© - ظٹطھظ… ط§ظ„طھطµط­ظٹط­ ظٹط¯ظˆظٹط§ظ‹</p>
                    </div>
                  )}

                  <AnimatePresence>
                    {previewQuestion === q.id && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <div className="p-4 rounded-xl bg-surface-tertiary border border-border">
                          <p className="text-xs font-medium text-text-secondary mb-2">ظ…ط¹ط§ظٹظ†ط© ط§ظ„ط³ط¤ط§ظ„:</p>
                          <p className="font-medium mb-3">{q.text || "ظ†طµ ط§ظ„ط³ط¤ط§ظ„"}</p>
                          {q.type === "multiple-choice" && q.choices?.map((c) => (
                            <div key={c.id} className={`p-3 rounded-lg mb-2 text-sm border ${c.isCorrect ? "border-success/30 bg-success/5" : "border-border bg-surface"}`}>
                              {c.isCorrect && <span className="text-success ml-1">âœ“</span>} {c.text || "ط§ط®طھظٹط§ط±"}
                            </div>
                          ))}
                          {q.type === "true-false" && (
                            <div className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${q.correctAnswer ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
                              {q.correctAnswer ? "طµط­" : "ط®ط·ط£"}
                            </div>
                          )}
                          {q.type === "essay" && (
                            <div className="p-4 rounded-lg border border-border bg-surface">
                              <p className="text-sm text-text-secondary">ظ…ط³ط§ط­ط© ظ„ظ„ط¥ط¬ط§ط¨ط© ط§ظ„ظ†طµظٹط©</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between">
            <Button variant="outline" size="lg" onClick={() => setStep(0)}>ط§ظ„ط³ط§ط¨ظ‚</Button>
            <Button variant="primary" size="lg" onClick={() => setStep(2)}>ط§ظ„طھط§ظ„ظٹ: ط§ظ„ط¥ط¹ط¯ط§ط¯ط§طھ</Button>
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ط§ظ…طھط­ط§ظ†</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Select label="ط§ظ„ط­ط¯ ط§ظ„ط£ظ‚طµظ‰ ظ„ظ„ظ…ط­ط§ظˆظ„ط§طھ" value={form.maxAttempts} onChange={(e) => update("maxAttempts", e.target.value)} options={[
                { value: "1", label: "ظ…ط­ط§ظˆظ„ط© ظˆط§ط­ط¯ط©" },
                { value: "2", label: "ظ…ط­ط§ظˆظ„طھط§ظ†" },
                { value: "3", label: "3 ظ…ط­ط§ظˆظ„ط§طھ" },
                { value: "5", label: "5 ظ…ط­ط§ظˆظ„ط§طھ" },
                { value: "10", label: "10 ظ…ط­ط§ظˆظ„ط§طھ" },
              ]} />

              <div className="space-y-3">
                {[
                  { key: "shuffleQuestions", label: "ط®ظ„ط· ط§ظ„ط£ط³ط¦ظ„ط©", desc: "طھط±طھظٹط¨ ط¹ط´ظˆط§ط¦ظٹ ظ„ظ„ط£ط³ط¦ظ„ط© ظ„ظƒظ„ ط·ط§ظ„ط¨" },
                  { key: "shuffleChoices", label: "ط®ظ„ط· ط§ظ„ط§ط®طھظٹط§ط±ط§طھ", desc: "طھط±طھظٹط¨ ط¹ط´ظˆط§ط¦ظٹ ظ„ط®ظٹط§ط±ط§طھ ط§ظ„ط¥ط¬ط§ط¨ط©" },
                  { key: "showResultImmediately", label: "ط¥ط¸ظ‡ط§ط± ط§ظ„ظ†طھظٹط¬ط© ظپظˆط±ط§ظ‹", desc: "ظٹط·ظ„ط¹ ط§ظ„ط·ط§ظ„ط¨ ط¹ظ„ظ‰ ظ†طھظٹط¬طھظ‡ ط¨ط¹ط¯ ط§ظ„ط§ظ†طھظ‡ط§ط، ظ…ط¨ط§ط´ط±ط©" },
                ].map((opt) => (
                  <div key={opt.key} className="flex items-center justify-between p-4 rounded-xl bg-surface-secondary border border-border">
                    <div>
                      <p className="text-sm font-medium text-text">{opt.label}</p>
                      <p className="text-xs text-text-tertiary">{opt.desc}</p>
                    </div>
                    <button type="button" onClick={() => update(opt.key as keyof FormData, !(form as Record<string, boolean>)[opt.key])}
                      className={`relative w-11 h-6 rounded-full transition-colors ${(form as Record<string, boolean>)[opt.key] ? "bg-primary" : "bg-surface-tertiary"}`}>
                      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${(form as Record<string, boolean>)[opt.key] ? "translate-x-0.5" : "translate-x-[22px]"}`} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-xl bg-surface-secondary border border-border">
                <h3 className="font-semibold text-text mb-3">ظ…ظ„ط®طµ ط§ظ„ط§ظ…طھط­ط§ظ†</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "ط§ظ„ط£ط³ط¦ظ„ط©", value: questions.length },
                    { label: "ط§ظ„ط¯ط±ط¬ط©", value: `${form.totalGrade} ط¯ط±ط¬ط©` },
                    { label: "ط§ظ„ظ…ط¯ط©", value: `${form.duration} ط¯ظ‚ظٹظ‚ط©` },
                    { label: "ط§ظ„ظ…ط­ط§ظˆظ„ط§طھ", value: form.maxAttempts },
                  ].map((s) => (
                    <div key={s.label} className="p-3 rounded-lg bg-surface border border-border text-center">
                      <p className="text-lg font-bold text-text">{s.value}</p>
                      <p className="text-xs text-text-tertiary">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" size="lg" onClick={() => setStep(1)}>ط§ظ„ط³ط§ط¨ظ‚</Button>
            <div className="flex gap-3">
              <Button variant="outline" size="lg" leftIcon={<HiOutlineEye size={18} />}>
                ظ…ط¹ط§ظٹظ†ط©
              </Button>
              <Button variant="success" size="lg" leftIcon={<HiOutlineSave size={18} />} isLoading={submitting} onClick={handleSubmit}>
                ط­ظپط¸ ط§ظ„ط§ظ…طھط­ط§ظ†
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

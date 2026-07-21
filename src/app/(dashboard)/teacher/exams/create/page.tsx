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
    toast.success("طھظ… حفظ الامتحان بنجاح!")
    router.push("/teacher/exams")
  }

  const steps = ["المعلومات الأساسية", "الأسئلة", "الإعدادات"]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "الامتحانات", href: "/teacher/exams" }, { label: "إضافة امتحان جديد" }]} />
      <DashboardHeader title="إضافة امتحان جديد" />

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
              <CardTitle>المعلومات الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="عنوان الامتحان" value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="مثال: اختبار النحو الشامل" />
              <Textarea label="الوصف" value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="وصف الامتحان..." />
              <div className="grid grid-cols-2 gap-4">
                <Select label="الكورس" value={form.courseId} onChange={(e) => { update("courseId", e.target.value); update("chapterId", "") }} options={mockCourses.map((c) => ({ value: c.id, label: c.title }))} placeholder="اختر كورساً" />
                <Select label="الفصل (اختياري)" value={form.chapterId} onChange={(e) => update("chapterId", e.target.value)} options={selectedCourse?.chapters.map((ch) => ({ value: ch.id, label: ch.title })) || []} placeholder="اختر فصلاً" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>التوقيت</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Input label="المدة (بالدقائق)" type="number" value={form.duration} onChange={(e) => update("duration", e.target.value)} />
                <Input label="تاريخ البداية" type="date" value={form.startDate} onChange={(e) => update("startDate", e.target.value)} />
                <Input label="تاريخ النهاية" type="date" value={form.endDate} onChange={(e) => update("endDate", e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الدرجة النهائية</CardTitle>
            </CardHeader>
            <CardContent>
              <Input label="الدرجة النهائية للامتحان" type="number" value={form.totalGrade} onChange={(e) => update("totalGrade", e.target.value)} />
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <div />
            <Button variant="primary" size="lg" onClick={() => setStep(1)}>
              التالي: الأسئلة
            </Button>
          </div>
        </motion.div>
      )}

      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>الأسئلة</CardTitle>
                <span className="text-sm text-text-secondary">إجمالي الدرجات: {totalQuestionGrade}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {[
                  { type: "multiple-choice" as QuestionType, label: "اختيار من متعدد" },
                  { type: "true-false" as QuestionType, label: "صح وخطأ" },
                  { type: "essay" as QuestionType, label: "مقالي" },
                ].map((btn) => (
                  <Button key={btn.type} variant="outline" size="sm" leftIcon={<HiOutlinePlus size={16} />} onClick={() => addQuestion(btn.type)}>
                    {btn.label}
                  </Button>
                ))}
              </div>

              {bankQuestions.length > 0 && (
                <details className="bg-surface-secondary rounded-xl border border-border">
                  <summary className="px-4 py-3 text-sm font-medium text-text cursor-pointer hover:bg-surface-tertiary rounded-xl transition-colors">
                    الأسئلة الموجودة ظپظٹ بنك الأسئلة ({bankQuestions.length})
                  </summary>
                  <div className="divide-y divide-border max-h-60 overflow-y-auto">
                    {bankQuestions.map((q) => (
                      <div key={q.id} className="flex items-center justify-between px-4 py-2.5 hover:bg-surface transition-colors">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-text truncate">{q.text}</p>
                          <div className="flex items-center gap-2 text-xs text-text-tertiary">
                            <Badge variant="info" size="sm">{q.type === "multiple-choice" ? "اختيار من متعدد" : q.type === "true-false" ? "صح وخطأ" : q.type === "essay" ? "مقالي" : q.type}</Badge>
                            <span>{q.grade} درجة</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="xs" leftIcon={<HiOutlinePlus size={14} />} onClick={() => addFromBank(q)}>
                          إضافة
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
                <p>لم تقم بإضافة ط£ظٹ أسئلة بعد</p>
                <p className="text-xs mt-1">اختر نوع السؤال من الأزرار أعلاه أو من بنك الأسئلة</p>
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
                      {q.type === "multiple-choice" ? "اختيار من متعدد" : q.type === "true-false" ? "صح وخطأ" : "مقالي"}
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
                      <input type="text" value={q.text} onChange={(e) => updateQuestion(q.id, { text: e.target.value })} placeholder="اكتب نص السؤال..." className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                    </div>
                    <div className="w-20">
                      <input type="number" value={q.grade} min={0.5} step={0.5} onChange={(e) => updateQuestion(q.id, { grade: +e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-border bg-surface-secondary text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                      <p className="text-[10px] text-text-tertiary text-center mt-0.5">الدرجة</p>
                    </div>
                  </div>

                  {q.type === "multiple-choice" && (
                    <div className="space-y-3">
                      {q.choices?.map((choice, ci) => (
                        <div key={choice.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface-secondary border border-border">
                          <input type="radio" name={`correct-${q.id}`} checked={choice.isCorrect} onChange={() => q.choices?.forEach((c) => updateChoice(q.id, c.id, { isCorrect: c.id === choice.id }))} className="w-4 h-4 accent-primary shrink-0" />
                          <input type="text" value={choice.text} onChange={(e) => updateChoice(q.id, choice.id, { text: e.target.value })} placeholder={`اختيار ${ci + 1}`} className="flex-1 bg-transparent text-sm border-none outline-none focus:ring-0" />
                        </div>
                      ))}
                    </div>
                  )}

                  {q.type === "true-false" && (
                    <div className="flex gap-3">
                      {[{ label: "صح", value: true }, { label: "خطأ", value: false }].map((opt) => (
                        <button type="button" key={opt.label} onClick={() => updateQuestion(q.id, { correctAnswer: opt.value })}
                          className={`px-6 py-2.5 rounded-xl text-sm font-medium border transition-all ${q.correctAnswer === opt.value ? "bg-primary/10 border-primary text-primary" : "border-border hover:border-primary/30"}`}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {q.type === "essay" && (
                    <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                      <p className="text-sm text-text-secondary">سيقوم الطالب بكتابة إجابة نصية - ظٹطھظ… التصحيح يدوياً</p>
                    </div>
                  )}

                  <AnimatePresence>
                    {previewQuestion === q.id && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <div className="p-4 rounded-xl bg-surface-tertiary border border-border">
                          <p className="text-xs font-medium text-text-secondary mb-2">معاينة السؤال:</p>
                          <p className="font-medium mb-3">{q.text || "نص السؤال"}</p>
                          {q.type === "multiple-choice" && q.choices?.map((c) => (
                            <div key={c.id} className={`p-3 rounded-lg mb-2 text-sm border ${c.isCorrect ? "border-success/30 bg-success/5" : "border-border bg-surface"}`}>
                              {c.isCorrect && <span className="text-success ml-1">âœ“</span>} {c.text || "اختيار"}
                            </div>
                          ))}
                          {q.type === "true-false" && (
                            <div className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${q.correctAnswer ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
                              {q.correctAnswer ? "صح" : "خطأ"}
                            </div>
                          )}
                          {q.type === "essay" && (
                            <div className="p-4 rounded-lg border border-border bg-surface">
                              <p className="text-sm text-text-secondary">مساحة للإجابة النصية</p>
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
            <Button variant="outline" size="lg" onClick={() => setStep(0)}>السابق</Button>
            <Button variant="primary" size="lg" onClick={() => setStep(2)}>التالي: الإعدادات</Button>
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الامتحان</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Select label="الحد الأقصى للمحاولات" value={form.maxAttempts} onChange={(e) => update("maxAttempts", e.target.value)} options={[
                { value: "1", label: "محاولة واحدة" },
                { value: "2", label: "محاولتان" },
                { value: "3", label: "3 محاولات" },
                { value: "5", label: "5 محاولات" },
                { value: "10", label: "10 محاولات" },
              ]} />

              <div className="space-y-3">
                {[
                  { key: "shuffleQuestions", label: "خلط الأسئلة", desc: "ترتيب عشوائي للأسئلة لكل طالب" },
                  { key: "shuffleChoices", label: "خلط الاختيارات", desc: "ترتيب عشوائي لخيارات الإجابة" },
                  { key: "showResultImmediately", label: "إظهار النتيجة فوراً", desc: "يطلع الطالب على نتيجته بعد الانتهاء مباشرة" },
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
                <h3 className="font-semibold text-text mb-3">ملخص الامتحان</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "الأسئلة", value: questions.length },
                    { label: "الدرجة", value: `${form.totalGrade} درجة` },
                    { label: "المدة", value: `${form.duration} دقيقة` },
                    { label: "المحاولات", value: form.maxAttempts },
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
            <Button variant="outline" size="lg" onClick={() => setStep(1)}>السابق</Button>
            <div className="flex gap-3">
              <Button variant="outline" size="lg" leftIcon={<HiOutlineEye size={18} />}>
                معاينة
              </Button>
              <Button variant="success" size="lg" leftIcon={<HiOutlineSave size={18} />} isLoading={submitting} onClick={handleSubmit}>
                حفظ الامتحان
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

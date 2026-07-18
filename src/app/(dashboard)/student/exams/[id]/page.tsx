"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { HiOutlineClipboardCheck, HiOutlineClock, HiOutlineChevronRight, HiOutlineChevronLeft, HiOutlineX, HiOutlineFlag, HiOutlineCheckCircle } from "react-icons/hi"

const examData = {
  id: "e1",
  title: "اختبار النحو الشامل",
  duration: 60,
  totalGrade: 100,
  questions: Array.from({ length: 20 }, (_, i) => ({
    id: `q-${i + 1}`,
    type: i < 12 ? "multiple-choice" : i < 16 ? "true-false" : "essay",
    text: [
      "ما هو إعراب المبتدأ في الجملة التالية: 'الطالب مجتهد'؟",
      "اختر علامة الرفع الصحيحة للجمع المذكر السالم",
      "ما هي علامة نصب الاسم المنقوص؟",
      "حدد الجملة التي تشتمل على خبر جملة",
      "أي من التالية تعتبر أداة نصب للفعل المضارع؟",
      "ما إعراب كلمة 'طلاب' في جملة 'جاء الطلاب'؟",
      "اختر الجملة الصحيحة نحوياً",
      "ما هو الفعل المعتل الآخر؟",
      "حدد نوع اللام في 'الكتاب للطالب'",
      "أي من هذه الأفعال فعل مضارع منصوب؟",
      "ما هي علامة جر الاسم الممنوع من الصرف؟",
      "اختر الإجابة الصحيحة: 'إن الطالبان مجتهدان' - الطالبان تعرب:",
      "الفعل المضارع يرفع بالضمة الظاهرة إذا كان صحيح الآخر",
      "الاسم المنقوص تقدر فيه الضمة والكسرة",
      "جملة 'الطالب الذي نجح مجتهد' تشتمل على خبر مفرد",
      "المبتدأ دائماً يأتي في أول الجملة",
      "اشرح قاعدة إعراب المبتدأ والخبر مع ثلاثة أمثلة",
      "ما الفرق بين الاسم المقصور والاسم المنقوص؟ وضح بالأمثلة",
      "اكتب فقرة عن أهمية النحو في فهم اللغة العربية",
      "حلل الجمل التالية إعرابياً: 'كان الطالب مجتهداً في دراسته'",
    ][i],
    choices: i < 12 ? [
      { id: "a", text: "الرفع بالضمة" },
      { id: "b", text: "النصب بالفتحة" },
      { id: "c", text: "الجر بالكسرة" },
      { id: "d", text: "الجزم بالسكون" },
    ] : undefined,
    correctAnswer: i < 16 ? (i % 2 === 0) : undefined,
    grade: i < 12 ? 5 : i < 16 ? 5 : 10,
  })),
}

export default function StudentExamPage() {
  const params = useParams()
  const [mounted, setMounted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | boolean | null>>({})
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set())
  const [timeLeft, setTimeLeft] = useState(examData.duration * 60)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearInterval(timer)
  }, [isSubmitted, timeLeft])

  const setAnswer = useCallback((qId: string, answer: string | boolean) => {
    setAnswers((prev) => ({ ...prev, [qId]: answer }))
  }, [])

  const toggleFlag = useCallback((qId: string) => {
    setFlaggedQuestions((prev) => {
      const next = new Set(prev)
      if (next.has(qId)) next.delete(qId)
      else next.add(qId)
      return next
    })
  }, [])

  const answeredCount = Object.keys(answers).length

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  if (!mounted) return null

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-surface-secondary flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full p-8 rounded-2xl bg-surface border border-border text-center">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <HiOutlineCheckCircle className="text-success" size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">تم تقديم الامتحان بنجاح!</h2>
          <p className="text-text-secondary text-sm mb-6">سيتم تصحيح إجاباتك وإعلان النتيجة قريباً</p>
          <Link href="/student/exams" className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors">
            العودة للامتحانات
          </Link>
        </motion.div>
      </div>
    )
  }

  const q = examData.questions[currentQuestion]

  return (
    <div className="min-h-screen bg-surface-secondary flex">
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="sticky top-0 z-20 bg-surface border-b border-border p-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen((s) => !s)} className="p-2 rounded-lg hover:bg-surface-secondary transition-colors lg:hidden">
                <HiOutlineClipboardCheck size={20} />
              </button>
              <div>
                <h1 className="font-semibold text-sm">{examData.title}</h1>
                <p className="text-xs text-text-tertiary">سؤال {currentQuestion + 1} من {examData.questions.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <span className="w-2 h-2 rounded-full bg-success" />
                <span>{answeredCount} تمت الإجابة</span>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${
                timeLeft < 300 ? "bg-error/10 text-error animate-pulse" : "bg-surface-secondary text-text"
              }`}>
                <HiOutlineClock size={16} />
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>

        {/* Question area */}
        <div className="flex-1 p-4 md:p-6">
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 rounded-xl bg-surface border border-border"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                      {currentQuestion + 1}
                    </span>
                    <div>
                      <p className="font-medium text-base leading-relaxed">{q.text}</p>
                      <p className="text-xs text-text-tertiary mt-1.5">
                        {q.type === "multiple-choice" ? "اختيار من متعدد" : q.type === "true-false" ? "صح وخطأ" : "سؤال مقالي"} • {q.grade} درجات
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFlag(q.id)}
                    className={`p-2 rounded-lg transition-colors ${flaggedQuestions.has(q.id) ? "text-warning bg-warning/10" : "text-text-tertiary hover:bg-surface-secondary"}`}
                  >
                    <HiOutlineFlag size={18} />
                  </button>
                </div>

                {q.type === "multiple-choice" && q.choices && (
                  <div className="space-y-3">
                    {q.choices.map((choice) => (
                      <button
                        key={choice.id}
                        onClick={() => setAnswer(q.id, choice.id)}
                        className={`w-full text-right p-4 rounded-xl border text-sm transition-all ${
                          answers[q.id] === choice.id
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/30 hover:bg-surface-secondary"
                        }`}
                      >
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-lg ml-3 text-xs font-medium ${
                          answers[q.id] === choice.id ? "bg-primary text-white" : "bg-surface-tertiary"
                        }`}>
                          {String.fromCharCode(65 + (q.choices?.indexOf(choice) ?? 0))}
                        </span>
                        {choice.text}
                      </button>
                    ))}
                  </div>
                )}

                {q.type === "true-false" && (
                  <div className="flex gap-3">
                    {[
                      { label: "صح", value: true },
                      { label: "خطأ", value: false },
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => setAnswer(q.id, opt.value)}
                        className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-all ${
                          answers[q.id] === opt.value
                            ? opt.value
                              ? "border-success bg-success/5 text-success"
                              : "border-error bg-error/5 text-error"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}

                {q.type === "essay" && (
                  <textarea
                    value={(answers[q.id] as string) || ""}
                    onChange={(e) => setAnswer(q.id, e.target.value)}
                    rows={6}
                    placeholder="اكتب إجابتك هنا..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-surface-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => setCurrentQuestion((q) => Math.max(0, q - 1))}
                disabled={currentQuestion === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-sm hover:bg-surface transition-colors disabled:opacity-40"
              >
                <HiOutlineChevronRight size={16} /> السابق
              </button>
              {currentQuestion < examData.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestion((q) => q + 1)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm hover:bg-primary-dark transition-colors"
                >
                  التالي <HiOutlineChevronLeft size={16} />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-success text-white text-sm hover:bg-success/90 transition-colors"
                >
                  تقديم الامتحان
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`fixed lg:sticky top-0 lg:top-0 h-screen lg:h-auto z-30 bg-surface border-l border-border w-72 p-4 overflow-y-auto transition-transform ${
        sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm">قائمة الأسئلة</h3>
          <button onClick={() => setSidebarOpen(false)} className="p-1 lg:hidden">
            <HiOutlineX size={18} />
          </button>
        </div>

        <div className="mb-4 p-3 rounded-xl bg-surface-secondary border border-border text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-text-secondary">تمت الإجابة</span>
            <span className="font-bold text-success">{answeredCount}</span>
          </div>
          <div className="h-1.5 rounded-full bg-surface-tertiary overflow-hidden">
            <div className="h-full rounded-full bg-success transition-all" style={{ width: `${(answeredCount / examData.questions.length) * 100}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-1.5">
          {examData.questions.map((q, i) => {
            const isAnswered = answers[q.id] !== undefined && answers[q.id] !== ""
            const isFlagged = flaggedQuestions.has(q.id)
            const isCurrent = i === currentQuestion
            return (
              <button
                key={q.id}
                onClick={() => setCurrentQuestion(i)}
                className={`relative h-9 rounded-lg text-xs font-medium transition-all ${
                  isCurrent
                    ? "bg-primary text-white shadow-md"
                    : isAnswered
                      ? "bg-success/10 text-success border border-success/30"
                      : "bg-surface-secondary border border-border text-text-secondary hover:border-primary/30"
                }`}
              >
                {i + 1}
                {isFlagged && (
                  <span className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-warning border-2 border-surface" />
                )}
              </button>
            )
          })}
        </div>

        <div className="mt-4 space-y-2 text-xs text-text-tertiary">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-success/20 border border-success/40" />
            <span>تمت الإجابة</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-surface-secondary border border-border" />
            <span>لم تتم الإجابة</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-warning/20 border border-warning/40" />
            <span>مميز بعلم</span>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/20 z-20 lg:hidden" />
      )}

      {/* Submit Modal */}
      <AnimatePresence>
        {showSubmitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-sm w-full p-6 rounded-2xl bg-surface border border-border"
            >
              <h2 className="text-lg font-bold mb-2">تأكيد تقديم الامتحان</h2>
              <p className="text-sm text-text-secondary mb-4">هل أنت متأكد من تقديم الامتحان؟</p>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border mb-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">تمت الإجابة</span>
                  <span className="font-medium">{answeredCount} / {examData.questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">لم تتم الإجابة</span>
                  <span className="font-medium text-error">{examData.questions.length - answeredCount}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-surface-secondary transition-colors"
                >
                  العودة
                </button>
                <button
                  onClick={() => setIsSubmitted(true)}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
                >
                  تقديم
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

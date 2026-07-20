"use client"
import { useState, useEffect, useCallback, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, Send, CheckCircle2, XCircle, HelpCircle, Flag, BarChart3, AlertTriangle, Play, Square, Clock } from "lucide-react"
import { ExamHeader } from "@/components/exam/ExamHeader"
import { QuestionCard } from "@/components/exam/QuestionCard"
import { QuestionPalette } from "@/components/exam/QuestionPalette"
import { cn } from "@/lib/utils"
import { mockExams } from "@/lib/mock/data"
import type { Exam, Question } from "@/lib/types"

const gradeBadges = [
  { min: 90, label: "A", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500" },
  { min: 80, label: "B", color: "text-blue-600 bg-blue-50 dark:bg-blue-900/30 border-blue-500" },
  { min: 70, label: "C", color: "text-amber-600 bg-amber-50 dark:bg-amber-900/30 border-amber-500" },
  { min: 60, label: "D", color: "text-orange-600 bg-orange-50 dark:bg-orange-900/30 border-orange-500" },
  { min: 0, label: "F", color: "text-red-600 bg-red-50 dark:bg-red-900/30 border-red-500" },
]

function getGrade(percent: number) {
  return gradeBadges.find((g) => percent >= g.min) || gradeBadges[gradeBadges.length - 1]
}

export default function Content({ id }: { id: string }) {
    const router = useRouter()
  const exam = useMemo(() => mockExams.find((e) => e.id === id) || mockExams[0], [id])

  const [mounted, setMounted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | boolean | string[] | Record<string, string> | null>>({})
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set())
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [showPauseModal, setShowPauseModal] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [timeTaken, setTimeTaken] = useState(0)
  const [score, setScore] = useState<{ correct: number; incorrect: number; total: number; percentage: number } | null>(null)

  const totalQuestions = exam.questions.length

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!isSubmitted && !isPaused) {
      document.title = `${exam.title} - TeacherOS`
    }
  }, [isSubmitted, isPaused, exam.title])

  const answeredCount = exam.questions.filter((q) => {
    const ans = answers[q.id]
    if (ans === undefined || ans === null) return false
    if (typeof ans === "string" && ans === "") return false
    if (typeof ans === "object" && !Array.isArray(ans) && Object.keys(ans).length === 0) return false
    return true
  }).length

  const setAnswer = useCallback((qId: string, answer: string | boolean | string[]) => {
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

  const handleSubmit = useCallback(() => {
    setIsSubmitted(true)
    setShowSubmitModal(false)
    setShowPauseModal(false)
    document.title = `╪ز┘à ╪د┘╪ز┘é╪»┘è┘à - ${exam.title}`

    let correct = 0
    let incorrect = 0
    let total = 0

    exam.questions.forEach((q) => {
      const ans = answers[q.id]
      if (ans === undefined || ans === null || ans === "") return
      total += q.grade

      if (q.type === "multiple-choice" && q.choices && typeof ans === "string") {
        const choice = q.choices.find((c) => c.id === ans)
        if (choice?.isCorrect) correct += q.grade
        else incorrect += q.grade
      } else if (q.type === "true-false" && typeof ans === "string") {
        const isCorrectAnswer = ans === "true"
        const expected = q.choices?.[0]?.isCorrect ?? true
        if (isCorrectAnswer === expected) correct += q.grade
        else incorrect += q.grade
      } else if (q.type === "essay" || q.type === "fill-blank") {
        correct += q.grade
      } else if (q.type === "ordering" || q.type === "matching") {
        correct += q.grade
      }
    })

    const totalGrade = exam.questions.reduce((sum, q) => sum + q.grade, 0)
    setScore({
      correct,
      incorrect,
      total: totalGrade,
      percentage: totalGrade > 0 ? Math.round((correct / totalGrade) * 100) : 0,
    })
    }, [exam, answers])

  const handleTimeUp = useCallback(() => {
    handleSubmit()
  }, [handleSubmit])

  const handleTick = useCallback((remainingSeconds: number) => {
    setTimeTaken(exam.duration * 60 - remainingSeconds)
    if (remainingSeconds <= 60 && remainingSeconds > 0) {
      document.title = `ظأبي╕ ${Math.floor(remainingSeconds / 60)}:${String(remainingSeconds % 60).padStart(2, "0")} - ${exam.title}`
    } else if (remainingSeconds <= 300) {
      document.title = `ظ░ ${Math.floor(remainingSeconds / 60)}:${String(remainingSeconds % 60).padStart(2, "0")} - ${exam.title}`
    }
  }, [exam.title, exam.duration])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSubmitted || showSubmitModal || showPauseModal) return
      if (e.key === "ArrowRight") {
        setCurrentQuestion((prev) => Math.min(totalQuestions - 1, prev + 1))
      } else if (e.key === "ArrowLeft") {
        setCurrentQuestion((prev) => Math.max(0, prev - 1))
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isSubmitted, showSubmitModal, showPauseModal, totalQuestions])

  if (!mounted) return null

  if (isSubmitted && score) {
    const percent = score.percentage
    const grade = getGrade(percent)
    const circumference = 2 * Math.PI * 60
    const offset = circumference - (percent / 100) * circumference

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="max-w-lg w-full"
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="p-8 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
                  <circle cx="64" cy="64" r="60" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  <motion.circle
                    cx="64" cy="64" r="60" fill="none"
                    stroke="currentColor" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={percent >= 90 ? "text-emerald-500" : percent >= 70 ? "text-blue-500" : percent >= 60 ? "text-amber-500" : "text-red-500"}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">{percent}</span>
                  <span className="text-xs text-gray-400">%</span>
                </div>
              </div>

              <span className={cn(
                "inline-flex items-center gap-1 px-4 py-1.5 rounded-full border-2 text-lg font-bold mb-4",
                grade.color
              )}>
                {grade.label}
              </span>

              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">╪ز┘à ╪ز┘é╪»┘è┘à ╪د┘╪د┘à╪ز╪ص╪د┘ ╪ذ┘╪ش╪د╪ص!</h2>
              <p className="text-sm text-gray-500 mb-6">{exam.title}</p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center justify-center gap-1 text-emerald-600 mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="text-lg font-bold text-emerald-600">{score.correct}</div>
                  <div className="text-xs text-emerald-600">╪╡╪ص┘è╪ص╪ر</div>
                </div>
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <div className="flex items-center justify-center gap-1 text-red-600 mb-1">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div className="text-lg font-bold text-red-600">{score.incorrect}</div>
                  <div className="text-xs text-red-600">╪«╪د╪╖╪خ╪ر</div>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{totalQuestions - answeredCount}</div>
                  <div className="text-xs text-gray-500">┘┘à ┘è╪ش╪ذ</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
                <Clock className="w-4 h-4" />
                <span>╪د┘┘ê┘é╪ز ╪د┘┘à╪│╪ز╪║╪▒┘é: {Math.floor(timeTaken / 60)} ╪» {timeTaken % 60} ╪س</span>
              </div>

              <div className="space-y-4">
                {exam.questions.map((q, i) => {
                  const ans = answers[q.id]
                  const isAnswered = ans !== undefined && ans !== null && ans !== "" &&
                    !(typeof ans === "object" && !Array.isArray(ans) && Object.keys(ans).length === 0)
                  const isCorrect = isAnswered && q.type === "multiple-choice" && q.choices
                    ? q.choices.find((c) => c.id === ans)?.isCorrect
                    : isAnswered && q.type === "true-false"
                      ? ans === "true"
                      : null
                  return (
                    <div key={q.id} className={cn(
                      "p-4 rounded-xl border text-right text-sm",
                      isAnswered && isCorrect === true ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800" :
                      isAnswered && isCorrect === false ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800" :
                      "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    )}>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="w-6 h-6 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                        <span className="flex-1 text-gray-700 dark:text-gray-300 line-clamp-1">{q.text}</span>
                        {isAnswered && isCorrect === true && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                        {isAnswered && isCorrect === false && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                        {!isAnswered && <HelpCircle className="w-4 h-4 text-gray-300 shrink-0" />}
                      </div>
                      {isAnswered && q.choices && typeof ans === "string" && (
                        <div className="text-xs text-gray-500">
                          ╪ح╪ش╪د╪ذ╪ز┘â: {q.choices.find((c) => c.id === ans)?.text || ans}
                          {isCorrect === false && (
                            <span className="mr-2 text-emerald-600">
                              | ╪د┘╪ح╪ش╪د╪ذ╪ر ╪د┘╪╡╪ص┘è╪ص╪ر: {q.choices.find((c) => c.isCorrect)?.text}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <Button
                onClick={() => router.push("/student/exams")}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors active:scale-[0.97]"
              >
                <BarChart3 className="w-4 h-4" />
                ╪د┘╪╣┘ê╪»╪ر ╪ح┘┘ë ╪د┘╪د┘à╪ز╪ص╪د┘╪د╪ز
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const q = exam.questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <ExamHeader
        title={exam.title}
        durationMinutes={exam.duration}
        currentIndex={currentQuestion}
        totalQuestions={totalQuestions}
        onTimeUp={handleTimeUp}
        onSubmit={() => setShowSubmitModal(true)}
        onPause={() => setShowPauseModal(!isPaused)}
        isPaused={isPaused}
        answeredCount={answeredCount}
      />

      {isPaused && (
        <div className="flex-1 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Square className="w-10 h-10 text-primary fill-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">╪د┘╪د┘à╪ز╪ص╪د┘ ┘à╪ز┘ê┘é┘</h2>
            <p className="text-gray-500 mb-6">╪د╪╢╪║╪╖ ╪╣┘┘ë ╪▓╪▒ ╪د┘╪د╪│╪ز╪خ┘╪د┘ ┘┘┘à╪ز╪د╪ذ╪╣╪ر</p>
            <Button
              onClick={() => setIsPaused(false)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors mx-auto"
            >
              <Play className="w-4 h-4" />
              ╪د╪│╪ز╪خ┘╪د┘ ╪د┘╪د┘à╪ز╪ص╪د┘
            </Button>
          </motion.div>
        </div>
      )}

      {!isPaused && (
        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 p-4 md:p-6 lg:p-8">
              <div className="max-w-3xl mx-auto">
                <AnimatePresence mode="wait">
                  <QuestionCard
                    key={q.id}
                    question={q}
                    answer={answers[q.id] ?? null}
                    onAnswer={(ans) => setAnswer(q.id, ans)}
                  />
                </AnimatePresence>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4">
              <div className="max-w-3xl mx-auto flex items-center justify-between">
                <Button
                  onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" /> ╪د┘╪│╪د╪ذ┘é
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => toggleFlag(q.id)}
                    className={cn(
                      "p-2.5 rounded-xl border transition-colors",
                      flaggedQuestions.has(q.id)
                        ? "bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700 text-amber-600"
                        : "border-gray-200 dark:border-gray-700 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    )}
                  >
                    <Flag className="w-4 h-4" />
                  </Button>
                  <span className="text-xs text-gray-500 px-2">
                    {currentQuestion + 1} / {totalQuestions}
                  </span>
                </div>

                {currentQuestion < totalQuestions - 1 ? (
                  <Button
                    onClick={() => setCurrentQuestion((prev) => prev + 1)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors active:scale-[0.97]"
                  >
                    ╪د┘╪ز╪د┘┘è <ChevronLeft className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowSubmitModal(true)}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors active:scale-[0.97]"
                  >
                    <Send className="w-4 h-4" /> ╪ز╪│┘┘è┘à ╪د┘╪د┘à╪ز╪ص╪د┘
                  </Button>
                )}
              </div>
            </div>
          </div>

          <QuestionPalette
            questions={exam.questions}
            currentIndex={currentQuestion}
            answers={answers}
            flaggedQuestions={flaggedQuestions}
            onJump={setCurrentQuestion}
            onToggleFlag={toggleFlag}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        </div>
      )}

      <AnimatePresence>
        {showSubmitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="max-w-sm w-full p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl"
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">╪ز╪ث┘â┘è╪» ╪ز╪│┘┘è┘à ╪د┘╪د┘à╪ز╪ص╪د┘</h2>
              <p className="text-sm text-gray-500 mb-4">┘è╪▒╪ش┘ë ┘à╪▒╪د╪ش╪╣╪ر ┘à┘╪«╪╡ ╪د┘╪ح╪ش╪د╪ذ╪د╪ز ┘é╪ذ┘ ╪د┘╪ز┘é╪»┘è┘à</p>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-4 space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">╪ز┘à╪ز ╪د┘╪ح╪ش╪د╪ذ╪ر</span>
                  <span className="font-bold text-emerald-600">{answeredCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">┘à┘à┘è╪▓ ┘┘┘à╪▒╪د╪ش╪╣╪ر</span>
                  <span className="font-bold text-amber-600">{flaggedQuestions.size}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">┘┘à ╪ز╪ز┘à ╪د┘╪ح╪ش╪د╪ذ╪ر</span>
                  <span className={cn(
                    "font-bold",
                    totalQuestions - answeredCount > 0 ? "text-red-600" : "text-gray-500"
                  )}>
                    {totalQuestions - answeredCount}
                  </span>
                </div>
                <div className="h-px bg-gray-200 dark:bg-gray-700" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">╪د┘┘à╪ش┘à┘ê╪╣</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">{totalQuestions}</span>
                </div>
              </div>

              {totalQuestions - answeredCount > 0 && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 mb-4 text-xs text-amber-700 dark:text-amber-400">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>┘ç┘╪د┘â {totalQuestions - answeredCount} ╪│╪ج╪د┘/╪ث╪│╪خ┘╪ر ┘┘à ╪ز╪ز┘à ╪د┘╪ح╪ش╪د╪ذ╪ر ╪╣┘┘è┘ç╪د</span>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  ╪د┘╪╣┘ê╪»╪ر
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors active:scale-[0.97] flex items-center justify-center gap-1.5"
                >
                  <Send className="w-4 h-4" /> ╪ز╪│┘┘è┘à
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}





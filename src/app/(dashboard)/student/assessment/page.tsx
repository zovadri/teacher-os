"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineClipboardCheck, HiOutlineChartBar, HiOutlineClock,
  HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineAcademicCap,
  HiOutlineRefresh, HiOutlineLightningBolt,
} from "react-icons/hi"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts"
import toast from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import { StatsCard } from "@/components/ui/StatsCard"

const subjects = [
  { id: "chemistry", label: "الكيمياء", color: "emerald" },
  { id: "physics", label: "الفيزياء", color: "blue" },
  { id: "math", label: "الرياضيات", color: "purple" },
  { id: "arabic", label: "العربي", color: "amber" },
  { id: "english", label: "الإنجليزي", color: "rose" },
]

interface QItem {
  id: number
  subject: string
  text: string
  options: string[]
  correct: number
  explanation: string
}

const questionPool: Record<string, QItem[]> = {
  chemistry: [
    { id: 1, subject: "chemistry", text: "ما العنصر الأكثر وفرة في القشرة الأرضية؟", options: ["الأكسجين", "الحديد", "السيليكون", "الألومنيوم"], correct: 0, explanation: "الأكسجين هو العنصر الأكثر وفرة في القشرة الأرضية بنسبة 46.6%" },
    { id: 2, subject: "chemistry", text: "الرقم الهيدروجيني للماء النقي هو:", options: ["7", "5", "9", "3"], correct: 0, explanation: "الماء النقي متعادل ورقمه الهيدروجيني 7" },
    { id: 3, subject: "chemistry", text: "أي المركبات التالية يعتبر حمضاً قوياً؟", options: ["HCl", "CH₃COOH", "H₂CO₃", "NH₃"], correct: 0, explanation: "حمض الهيدروكلوريك HCl من الأحماض القوية" },
    { id: 4, subject: "chemistry", text: "عدد البروتونات في نواة ذرة الكربون هو:", options: ["6", "8", "4", "12"], correct: 0, explanation: "العدد الذري للكربون هو 6" },
    { id: 5, subject: "chemistry", text: "التفاعل الذي ينتج عنه ملح وماء هو:", options: ["التعادل", "الأكسدة", "الاختزال", "البلمرة"], correct: 0, explanation: "تفاعل التعادل بين حمض وقاعدة ينتج ملح وماء" },
  ],
  physics: [
    { id: 6, subject: "physics", text: "وحدة قياس القوة في النظام الدولي هي:", options: ["نيوتن", "جول", "واط", "باسكال"], correct: 0, explanation: "النيوتن هو وحدة قياس القوة" },
    { id: 7, subject: "physics", text: "سرعة الضوء في الفراغ تساوي:", options: ["3×10⁸ م/ث", "3×10⁶ م/ث", "3×10⁴ م/ث", "3×10² م/ث"], correct: 0, explanation: "سرعة الضوء في الفراغ 3×10⁸ م/ث" },
    { id: 8, subject: "physics", text: "التيار الكهربائي يُقاس بوحدة:", options: ["الأمبير", "الفولت", "الأوم", "الواط"], correct: 0, explanation: "الأمبير هو وحدة قياس التيار الكهربائي" },
    { id: 9, subject: "physics", text: "قانون نيوتن الثاني ينص على أن القوة تساوي:", options: ["الكتلة × العجلة", "الكتلة × السرعة", "العجلة ÷ الكتلة", "الكتلة ÷ العجلة"], correct: 0, explanation: "القوة = الكتلة × العجلة" },
    { id: 10, subject: "physics", text: "الموجات الصوتية هي موجات:", options: ["طولية", "مستعرضة", "كهرومغناطيسية", "دائرية"], correct: 0, explanation: "الموجات الصوتية هي موجات طولية تحتاج إلى وسط مادي" },
  ],
  math: [
    { id: 11, subject: "math", text: "مشتقة الدالة f(x) = x³ هي:", options: ["3x²", "x²", "3x", "x⁴/4"], correct: 0, explanation: "مشتقة x³ هي 3x²" },
    { id: 12, subject: "math", text: "ما قيمة log₁₀(1000)؟", options: ["3", "2", "4", "10"], correct: 0, explanation: "10³ = 1000 إذن log₁₀(1000) = 3" },
    { id: 13, subject: "math", text: "حل المعادلة 2x² - 8 = 0 هو:", options: ["±2", "±4", "±8", "±1"], correct: 0, explanation: "2x² = 8 → x² = 4 → x = ±2" },
    { id: 14, subject: "math", text: "مساحة الدائرة التي نصف قطرها ٥ سم:", options: ["25π سم²", "10π سم²", "5π سم²", "20π سم²"], correct: 0, explanation: "مساحة الدائرة = π × 25 = 25π سم²" },
    { id: 15, subject: "math", text: "العدد ١٢٠ له كم قاسم؟", options: ["16", "12", "8", "24"], correct: 0, explanation: "120 = 2³×3×5 → عدد القواسم = 4×2×2 = 16" },
  ],
  arabic: [
    { id: 16, subject: "arabic", text: "الفاعل في جملة 'يكتب الطالب الدرس' هو:", options: ["الطالب", "الدرس", "يكتب", "الطالب الدرس"], correct: 0, explanation: "الطالب هو الذي قام بالفعل" },
    { id: 17, subject: "arabic", text: "جمع كلمة 'مكتبة' هو:", options: ["مكتبات", "مكاتب", "مكتب", "مكتبة"], correct: 0, explanation: "جمع المؤنث السالم لكلمة مكتبة هو مكتبات" },
    { id: 18, subject: "arabic", text: "حرف الجر 'إلى' يفيد:", options: ["الانتهاء", "الابتداء", "السببية", "الاستعلاء"], correct: 0, explanation: "حرف الجر 'إلى' يفيد انتهاء الغاية" },
    { id: 19, subject: "arabic", text: "المثنى من كلمة 'معلم' هو:", options: ["معلمان", "معلمون", "معلمين", "معلمات"], correct: 0, explanation: "المثنى يرفع بالألف: معلمان" },
    { id: 20, subject: "arabic", text: "الهمزة في كلمة 'استعلام' هي همزة:", options: ["وصل", "قطع", "متطرفة", "متوسطة"], correct: 0, explanation: "همزة الوصل في فعل سداسي (استفعل)" },
  ],
  english: [
    { id: 21, subject: "english", text: "Choose the correct past tense: 'She ___ to school yesterday.'", options: ["went", "goes", "going", "gone"], correct: 0, explanation: "Yesterday requires past tense → went" },
    { id: 22, subject: "english", text: "The opposite of 'generous' is:", options: ["stingy", "kind", "brave", "wise"], correct: 0, explanation: "Stingy means unwilling to give → opposite of generous" },
    { id: 23, subject: "english", text: "Which is a correct conditional sentence?", options: ["If I were you, I would study", "If I am you, I will study", "If I was you, I studied", "If I be you, I study"], correct: 0, explanation: "Second conditional uses 'if I were... would'" },
    { id: 24, subject: "english", text: "The passive voice of 'The boy broke the window' is:", options: ["The window was broken by the boy", "The window is broken", "The boy was broken", "The window broke the boy"], correct: 0, explanation: "Passive: object + was/were + past participle + by subject" },
    { id: 25, subject: "english", text: "'I have been studying for two hours' is:", options: ["Present perfect continuous", "Present perfect", "Past continuous", "Future perfect"], correct: 0, explanation: "Have/has + been + verb-ing = present perfect continuous" },
  ],
}

function getLevelBadge(avg: number): { label: string; variant: "success" | "primary" | "warning" | "error" } {
  if (avg >= 90) return { label: "خبير", variant: "success" }
  if (avg >= 75) return { label: "متقدم", variant: "primary" }
  if (avg >= 60) return { label: "متوسط", variant: "warning" }
  return { label: "مبتدئ", variant: "error" }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function AssessmentPage() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(["chemistry", "physics", "math", "arabic", "english"])
  const [started, setStarted] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [finished, setFinished] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [timeLeft, setTimeLeft] = useState(1200)

  const questions = selectedSubjects.flatMap((s) => questionPool[s] || [])
  const currentQ = questions[currentIdx]
  const progress = questions.length > 0 ? ((currentIdx) / questions.length) * 100 : 0

  const handleStart = () => {
    if (selectedSubjects.length === 0) {
      toast.error("اختر مادة واحدة على الأقل")
      return
    }
    setStarted(true)
    setTimeLeft(1200)
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timer); return 0 }
        return t - 1
      })
    }, 1000)
  }

  const handleAnswer = (qIdx: number, optIdx: number) => {
    if (finished) return
    setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))
  }

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1)
    }
  }

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((i) => i - 1)
    }
  }

  const handleFinish = () => {
    const unanswered = questions.filter((q) => answers[q.id] === undefined).length
    if (unanswered > 0) {
      toast.error(`لديك ${unanswered} أسئلة لم تجب عليها`)
      return
    }
    setFinished(true)
    toast.success("تم إكمال الاختبار بنجاح!")
  }

  const subjectScores = subjects.map((s) => {
    const subjQuestions = questions.filter((q) => q.subject === s.id)
    const correct = subjQuestions.filter((q) => answers[q.id] === q.correct).length
    return { subject: s.id, label: s.label, correct, total: subjQuestions.length, pct: subjQuestions.length > 0 ? Math.round((correct / subjQuestions.length) * 100) : 0 }
  })
  const totalCorrect = subjectScores.reduce((a, s) => a + s.correct, 0)
  const totalQuestions = questions.length
  const overallPct = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0
  const levelInfo = getLevelBadge(overallPct)
  const weakest = [...subjectScores].sort((a, b) => a.pct - b.pct)[0]

  const timerMins = Math.floor(timeLeft / 60)
  const timerSecs = timeLeft % 60

  return (
    <div className="min-h-screen">
      <DashboardHeader title="اختبار تحديد المستوى" subtitle="قيّم مستواك في المواد الدراسية" />
      <div className="p-4 md:p-6 space-y-6">
        {!started && !finished && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle>اختبار تحديد المستوى</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <HiOutlineLightningBolt className="w-10 h-10 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-text">اكتشف مستواك الحقيقي</p>
                    <p className="text-xs text-text-tertiary mt-1">أجب على 5 أسئلة في كل مادة لتحصل على تقييم دقيق لمستواك مع توصيات للتحسين</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-text mb-3">اختر المواد التي تريد اختبار نفسك فيها:</p>
                  <div className="flex flex-wrap gap-3">
                    {subjects.map((s) => {
                      const selected = selectedSubjects.includes(s.id)
                      return (
                        <button type="button"
                          key={s.id}
                          onClick={() => setSelectedSubjects((prev) => prev.includes(s.id) ? prev.filter((x) => x !== s.id) : [...prev, s.id])}
                          className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                            selected ? "border-primary bg-primary/10 text-primary shadow-sm" : "border-border bg-surface text-text-secondary hover:bg-surface-secondary"
                          }`}
                        >
                          {s.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-text-tertiary">
                  <span>⏱ المدة: 20 دقيقة</span>
                  <span>•</span>
                  <span>{selectedSubjects.length * 5} سؤال</span>
                </div>
              </CardContent>
              <CardFooter>
                <button type="button" onClick={handleStart}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary-dark transition-all"
                >
                  <HiOutlineClipboardCheck className="w-5 h-5" />
                  ابدأ الاختبار
                </button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {started && !finished && questions.length > 0 && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <Badge variant="primary" size="md">
                سؤال {currentIdx + 1} من {questions.length}
              </Badge>
              <div className={`flex items-center gap-1 text-sm font-mono font-bold ${timeLeft < 120 ? "text-error" : "text-text-tertiary"}`}>
                <HiOutlineClock className="w-4 h-4" />
                {String(timerMins).padStart(2, "0")}:{String(timerSecs).padStart(2, "0")}
              </div>
            </div>
            <Progress value={progress} size="md" variant="primary" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="info" size="sm">{subjects.find((s) => s.id === currentQ.subject)?.label}</Badge>
                      <span className="text-xs text-text-tertiary">سؤال {currentIdx + 1}</span>
                    </div>
                    <p className="text-base font-medium text-text">{currentQ.text}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentQ.options.map((opt, oi) => {
                        const selected = answers[currentQ.id] === oi
                        return (
                          <button type="button"
                            key={oi}
                            onClick={() => handleAnswer(currentQ.id, oi)}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border text-sm text-right transition-all ${
                              selected ? "border-primary bg-primary/10 text-primary shadow-sm" : "border-border bg-surface text-text hover:bg-surface-secondary"
                            }`}
                          >
                            <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${
                              selected ? "border-primary bg-primary text-white" : "border-text-tertiary text-text-tertiary"
                            }`}>
                              {String.fromCharCode(65 + oi)}
                            </span>
                            <span className="flex-1">{opt}</span>
                          </button>
                        )
                      })}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <button type="button" onClick={handlePrev} disabled={currentIdx === 0}
                      className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text disabled:opacity-30 transition-colors"
                    >
                      → السابق
                    </button>
                    {currentIdx < questions.length - 1 ? (
                      <button type="button" onClick={handleNext}
                        className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-xl hover:bg-primary-dark transition-all"
                      >
                        التالي ←
                      </button>
                    ) : (
                      <button type="button" onClick={handleFinish}
                        className="px-4 py-2 text-sm font-medium bg-success text-white rounded-xl hover:bg-emerald-600 transition-all"
                      >
                        إنهاء الاختبار
                      </button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {finished && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatsCard title="النتيجة" value={`${overallPct}%`} icon={HiOutlineChartBar} color="primary" />
              <StatsCard title="الإجابات الصحيحة" value={`${totalCorrect}/${totalQuestions}`} icon={HiOutlineCheckCircle} color="success" />
              <StatsCard title="المستوى" value={levelInfo.label} icon={HiOutlineAcademicCap} color={levelInfo.variant as "primary" | "success" | "warning" | "error"} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>النتائج التفصيلية حسب المادة</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={subjectScores.map((s) => ({ name: s.label, النسبة: s.pct }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: "var(--color-text-secondary)" }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "var(--color-text-secondary)" }} />
                      <Tooltip />
                      <Bar dataKey="النسبة" radius={[6, 6, 0, 0]}>
                        {subjectScores.map((_, i) => (
                          <Cell key={i} fill={["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#e11d48"][i]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardContent>
                  <div className="space-y-4">
                    {subjectScores.map((s) => (
                      <div key={s.subject} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-text">{s.label}</span>
                          <span className="text-text-tertiary">{s.correct}/{s.total} ({s.pct}%)</span>
                        </div>
                        <Progress value={s.pct} size="sm" variant={s.pct >= 80 ? "success" : s.pct >= 60 ? "warning" : "error"} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {weakest && weakest.pct < 70 && (
              <motion.div variants={itemVariants}>
                <Card>
                  <CardContent>
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/5 border border-warning/20">
                      <HiOutlineLightningBolt className="w-6 h-6 text-warning shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-text mb-1">توصية للتحسين</p>
                        <p className="text-xs text-text-tertiary">
                          تحتاج إلى التركيز أكثر على مادة <strong>{weakest.label}</strong> بنسبة {weakest.pct}%. ننصح بمراجعة الدروس الأساسية وحل المزيد من التمارين.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
              <button type="button" onClick={() => setShowDetails((d) => !d)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface border border-border text-text rounded-xl font-medium text-sm hover:bg-surface-secondary transition-all"
              >
                {showDetails ? "إخفاء التفاصيل" : "عرض تفاصيل الإجابات"}
              </button>
              <button type="button" onClick={() => { setStarted(false); setFinished(false); setCurrentIdx(0); setAnswers({}); setShowDetails(false) }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary-dark transition-all"
              >
                <HiOutlineRefresh className="w-5 h-5" />
                إعادة الاختبار
              </button>
            </motion.div>

            {showDetails && (
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
                {questions.map((q, idx) => {
                  const userAns = answers[q.id]
                  const correct = userAns === q.correct
                  return (
                    <motion.div key={q.id} variants={itemVariants}>
                      <Card className={`border-r-4 ${correct ? "border-r-success" : "border-r-error"}`}>
                        <CardContent className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-text-tertiary">سؤال {idx + 1}</span>
                              <Badge variant="info" size="sm">{subjects.find((s) => s.id === q.subject)?.label}</Badge>
                              {correct ? (
                                <Badge variant="success" size="sm"><HiOutlineCheckCircle className="w-3 h-3 ml-0.5" /> صحيح</Badge>
                              ) : (
                                <Badge variant="error" size="sm"><HiOutlineXCircle className="w-3 h-3 ml-0.5" /> خطأ</Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-text">{q.text}</p>
                          <div className="text-xs space-y-1">
                            <p className="text-text-tertiary">إجابتك: <span className={correct ? "text-success" : "text-error"}>{q.options[userAns] || "لم تجب"}</span></p>
                            {!correct && <p className="text-success">الإجابة الصحيحة: {q.options[q.correct]}</p>}
                            <p className="text-text-tertiary mt-1">{q.explanation}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

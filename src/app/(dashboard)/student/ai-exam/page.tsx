"use client"

import { useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import {
  HiOutlineSparkles, HiOutlineAcademicCap, HiOutlineLightningBolt,
  HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineChartBar,
  HiOutlineRefresh, HiOutlineClock, HiFire, HiOutlineStar,
  HiOutlineBeaker, HiOutlineCalculator, HiOutlineBookOpen,
  HiOutlineTranslate, HiOutlineGlobe, HiOutlinePencil,
  HiOutlineBadgeCheck,
} from "react-icons/hi"
import toast from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Progress } from "@/components/ui/Progress"
import { cn } from "@/lib/utils"

type Subject = "chemistry" | "physics" | "math" | "arabic" | "english"
type Difficulty = "easy" | "medium" | "hard" | "mixed"
type QuestionType = "mcq" | "truefalse" | "essay"

interface Question {
  id: number
  type: QuestionType
  difficulty: Difficulty
  text: string
  options?: string[]
  correctAnswer?: string | boolean
  estimatedTime: number
}

interface Answer {
  questionId: number
  value: string | boolean | null
}

interface GradeResult {
  correct: number
  wrong: number
  total: number
  percentage: number
  grade: string
}

const subjects: { value: Subject; label: string; icon: React.ElementType; color: string }[] = [
  { value: "chemistry", label: "كيمياء", icon: HiOutlineBeaker, color: "text-emerald-500" },
  { value: "physics", label: "فيزياء", icon: HiOutlineLightningBolt, color: "text-blue-500" },
  { value: "math", label: "رياضيات", icon: HiOutlineCalculator, color: "text-purple-500" },
  { value: "arabic", label: "لغة عربية", icon: HiOutlineBookOpen, color: "text-amber-500" },
  { value: "english", label: "لغة إنجليزية", icon: HiOutlineGlobe, color: "text-rose-500" },
]

const difficulties: { value: Difficulty; label: string }[] = [
  { value: "easy", label: "سهل" },
  { value: "medium", label: "متوسط" },
  { value: "hard", label: "صعب" },
  { value: "mixed", label: "متنوع" },
]

const typeLabels: Record<QuestionType, string> = {
  mcq: "اختيار من متعدد",
  truefalse: "صح وخطأ",
  essay: "مقالي",
}

const typeBadgeColors: Record<QuestionType, "primary" | "success" | "info"> = {
  mcq: "primary",
  truefalse: "success",
  essay: "info",
}

const difficultyBadgeColors: Record<string, "success" | "warning" | "error"> = {
  easy: "success",
  medium: "warning",
  hard: "error",
}

const _detTable = [0.42, 0.17, 0.83, 0.65, 0.31, 0.95, 0.08, 0.72, 0.53, 0.26, 0.89, 0.14, 0.67, 0.49, 0.03, 0.77, 0.58, 0.21, 0.91, 0.36, 0.81, 0.09, 0.74, 0.44, 0.62, 0.18, 0.96, 0.05, 0.69, 0.52, 0.27, 0.87, 0.12, 0.71, 0.34, 0.94, 0.01, 0.63, 0.48, 0.23, 0.85, 0.55, 0.19, 0.79, 0.38, 0.92, 0.07, 0.66, 0.42, 0.29]
function det(offset: number): number {
  return _detTable[(offset + 3) % _detTable.length]
}

const subjectQuestions: Record<Subject, string[]> = {
  chemistry: [
    "ما هو العنصر الأكثر وفرة في الغلاف الجوي للأرֿ",
    "تفاعل التعادل بين حمض وقاعدة ينتج عنه:",
    "ما هو الرقم الهيدروجيني للماء النقي؟",
    "أي من المركبات التالية هو هيدروكربون؟",
    "ما هو عدد البروتونات في نواة ذرة الكربون؟",
    "الروابط الأيونية تتشكل بين:",
    "ما هو القانون الذي يصف العلاقة بين حجم الغاز وضغطه؟",
    "أي العناصر التالية هو أشباه فلزاʿ",
    "ما هو ناتج عملية التمثيل الضوئي؟",
    "ما عدد الإلكترونات في مدار ذرة الأكسجين الخارجي؟",
    "اشرح نظرية برونستد-لوري للأحماض والقواعد",
    "كيف تؤثر العوامل الحفازة على سرعة التفاعل الكيميائي؟",
    "ما الفرق بين التفاعل الطارد للحرارة والماص للحرارɿ",
    "كيف يمكنك تحديد عدد التأكسد لعنصر في مركȿ",
    "اشرح مفهوم الاتزان الكيميائي مع مثال",
    "ما المقصود بالجدول الدوري وكيف تم ترتيب العناصر فيه؟",
    "اشرح نظرية التصادم في التفاعلات الكيميائية",
    "ما هي أنواع الروابط الكيميائية وخصائص كل نوڿ",
    "اشرح مفهوم المحاليل المنظمة وأهميتها",
    "كيف تؤثر درجة الحرارة على ذوبانية الغازات في السوائل؟",
  ],
  physics: [
    "ما هي وحدة قياس القوة في النظام الدولي؟",
    "قانون نيوتن الثاني ينص على أن:",
    "سرعة الضوء في الفراغ تساوي تقريباً:",
    "أي من الكميات التالية كمية متجهɿ",
    "الطاقة الحركية لجسم تتناسب مع:",
    "ما هو مبدأ حفظ الطاقɿ",
    "التيار الكهربائي يُقاس بوحدة:",
    "ما هي المقاومة المكافئة في دائرة توالي؟",
    "التردد يُقاس بوحدة:",
    "موجات الصوت هي موجات:",
    "اشرح قانون الجذب العام لنيوتن وتطبيقاته",
    "ما الفرق بين السرعة المتوسطة والسرعة اللحظيɿ",
    "كيف تعمل المحولات الكهربائيɿ",
    "اشرح مبدأ أرخميدس للطفو",
    "ما هي قوانين كيرشوف للدوائر الكهربائيɿ",
    "اشرح نظرية النسبية لأينشتاين باختصار",
    "كيف يحدث انكسار الضوء وما هي قوانينه؟",
    "ما الفرق بين الموجات الطولية والمستعرضɿ",
    "اشرح مفهوم المجال المغناطيسي وتطبيقاته",
    "كيف تؤثر درجة الحرارة على مقاومة الموصلاʿ",
  ],
  math: [
    "ما هي قيمة العدد π (باي) لأقرب منزلتين عشريتين؟",
    "مشتقة الدالة f(x)=x² هي:",
    "ما هو حل المعادلة 2x+5=15؟",
    "مساحة الدائرة تُحسب بالقانون:",
    "قيمة log₁₀(100) تساوي:",
    "العدد ٧ هو عدد:",
    "القطر في الدائرة يساوي:",
    "Jذر المعادلة التربيعية x²−5x+6=0 هما:",
    "ما هو محيط المربع الذي طول ضلعه ٥ سم؟",
    "نظرية فيثاغورس تنطبق على:",
    "اشرح طريقة إكمال المربع لحل المعادلات التربيعية",
    "ما الفرق بين المتسلسلة الحسابية والهندسيɿ",
    "كيف تحسب التكامل المحدد لتطبيقات المساحɿ",
    "اشرح مفهوم النهايات في التفاضل والتكامل",
    "ما هي خصائص المصفوفات وعملياتهǿ",
    "اشرح نظرية ذات الحدين وكيفية تطبيقها",
    "كيف تحسب الاحتمال الشرطي في الإحصاء؟",
    "اشرح مفهوم الاشتقاق الضمني مع مثال",
    "ما هي تطبيقات التفاضل في إيجاد القيم العظمى والصغرى؟",
    "كيف تحسب حجم الجسم الدوراني باستخدام التكامل؟",
  ],
  arabic: [
    "الفاعل في جملة 'قرأ الطالب الدرس' هو:",
    "المفعول به في جملة 'كتبت الدرس' هو:",
    "حرف الجر 'في' يفيد:",
    "الفعل الماضي من 'يذهب' هو:",
    "جمع كلمة 'كتاب' هو:",
    "الهمزة في كلمة 'أحمد' هي همزة:",
    "المثنى من كلمة 'طالب' هو:",
    "كلمة 'جميل' تعرب:",
    "لا النافية للجنس تدخل على:",
    "أسلوب الشرط يتكون من:",
    "اشرح الفرق بين المبتدأ والخبر مع أمثلة",
    "ما هي أنواع الاستثناء وأدواته في اللغة العربيɿ",
    "كيف تعرب الأسماء الخمسɿ",
    "اشرح قواعد كتابة الهمزة في وسط الكلمة",
    "ما الفرق بين الحال والتمييز في الإعراȿ",
    "اشرح أنواع المنادى وأحكامه في اللغة العربية",
    "كيف تفرق بين التاء المربوطة والتاء المفتوحɿ",
    "اشرح أسلوب التعجب وطرق صياغته",
    "ما هي علامات الإعراب الأصلية والفرعيɿ",
    "اشرح قواعد الإملاء في كتابة الألف اللينة",
  ],
  english: [
    "What is the past tense of 'go'?",
    "Choose the correct article: '___ apple a day keeps the doctor away.'",
    "Which sentence is in present perfect tense?",
    "The opposite of 'ancient' is:",
    "'I have been studying' is an example of:",
    "The plural of 'child' is:",
    "Which word is a synonym for 'happy'?",
    "The correct preposition: 'She is good ___ math.'",
    "A sentence with a conditional type 1 uses:",
    "The passive voice of 'The cat ate the fish' is:",
    "Explain the difference between 'some' and 'any' with examples",
    "How do you form questions in present simple tense?",
    "What are the different types of conditionals in English?",
    "Explain the use of articles 'a', 'an', and 'the'",
    "What is the difference between 'much' and 'many'?",
    "How do you use reported speech in English?",
    "Explain the present perfect continuous tense with examples",
    "What are phrasal verbs and how are they used?",
    "How do you form comparative and superlative adjectives?",
    "Explain the difference between 'will' and 'going to' for future",
  ],
}

const topicQuestions: Record<string, string[]> = {
  default: [
    "ما هو المفهوم الأساسي في هذا الموضوڿ",
    "كيف يمكن تطبيق هذا الموضوع في الحياة اليوميɿ",
    "ما هي العوامل المؤثرة في هذا الموضوڿ",
    "اشرح العلاقة بين هذا الموضوع والموضوعات الأخرى",
    "ما هي أهم النظريات المرتبطة بهذا الموضوڿ",
    "كيف يمكن قياس النتائج في هذا الموضوڿ",
    "ما هي التحديات الشائعة في دراسة هذا الموضوڿ",
    "هل يمكنك ذكر مثال تطبيقي لهذا الموضوڿ",
    "ما هي المصادر الموثوقة لدراسة هذا الموضوڿ",
    "كيف تطور هذا الموضوع عبر الزمن؟",
  ],
}

function generateQuestions(subject: Subject, topic: string, count: number, difficulty: Difficulty): Question[] {
  const basePool = subjectQuestions[subject] || topicQuestions.default
  const pool = [...basePool, ...topicQuestions.default]
  const questions: Question[] = []
  const types: QuestionType[] = ["mcq", "mcq", "truefalse", "mcq", "essay", "mcq", "truefalse", "mcq", "mcq", "essay"]

  const diffOrder: Difficulty[] = []
  for (let i = 0; i < count; i++) {
    if (difficulty === "mixed") {
      const cycle = ["easy", "medium", "hard"] as const
      diffOrder.push(cycle[i % 3])
    } else {
      diffOrder.push(difficulty)
    }
  }

  for (let i = 0; i < count; i++) {
    const type = types[i % types.length]
    const diff = diffOrder[i]
    const text = pool[i % pool.length]
    const seed = i * 7 + 13
    const timeMap: Record<string, number> = { easy: 30, medium: 60, hard: 120, mixed: 75 }
    const baseTime = timeMap[diff]

    const q: Question = {
      id: i + 1,
      type,
      difficulty: diff,
      text,
      estimatedTime: type === "essay" ? baseTime * 2 : baseTime,
    }

    if (type === "mcq") {
      const correctIdx = Math.floor(det(seed) * 4)
      q.correctAnswer = String(correctIdx)
      q.options = [
        `الخيار الأول للسؤال ${i + 1}`,
        `الخيار الثاني للسؤال ${i + 1}`,
        `الخيار الثالث للسؤال ${i + 1}`,
        `الخيار الرابع للسؤال ${i + 1}`,
      ]
    } else if (type === "truefalse") {
      q.correctAnswer = det(seed + 1) > 0.5
      q.options = ["صح", "خطأ"]
    } else {
      q.correctAnswer = `الإجابة النموذجية للسؤال ${i + 1} حول ${topic || subject}`
      q.options = undefined
    }

    questions.push(q)
  }

  return questions
}

function computeGrade(answers: Answer[], questions: Question[]): GradeResult {
  let correct = 0
  for (const ans of answers) {
    const q = questions.find((x) => x.id === ans.questionId)
    if (!q || ans.value === null || ans.value === undefined) continue
    const isCorrect = String(q.correctAnswer) === String(ans.value)
    if (isCorrect) correct++
  }
  const total = questions.length
  const wrong = total - correct
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0
  let grade: string
  if (percentage >= 90) grade = "A"
  else if (percentage >= 80) grade = "B"
  else if (percentage >= 70) grade = "C"
  else if (percentage >= 60) grade = "D"
  else grade = "F"
  return { correct, wrong, total, percentage, grade }
}

const gradeColors: Record<string, "success" | "primary" | "warning" | "error"> = {
  A: "success",
  B: "primary",
  C: "warning",
  D: "warning",
  F: "error",
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const questionVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
}

const shimmerVariants: Variants = {
  initial: { backgroundPosition: "200% 0" },
  animate: { backgroundPosition: "-200% 0", transition: { repeat: Infinity, duration: 1.5, ease: "linear" } },
}

export default function AIExamPage() {
  const [subject, setSubject] = useState<Subject>("math")
  const [topic, setTopic] = useState("")
  const [count, setCount] = useState(10)
  const [difficulty, setDifficulty] = useState<Difficulty>("mixed")
  const [isGenerating, setIsGenerating] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Answer[]>([])
  const [result, setResult] = useState<GradeResult | null>(null)
  const [showResult, setShowResult] = useState(false)

  const [stats] = useState({
    todayQuestions: 47,
    streak: 12,
    accuracy: 78,
  })

  const handleGenerate = useCallback(() => {
    if (!topic.trim()) {
      toast.error("الرجاء إدخال الموضوع")
      return
    }
    setIsGenerating(true)
    setResult(null)
    setShowResult(false)
    setAnswers([])

    toast.loading("جاري توليد الأسئلة...", { id: "gen" })

    setTimeout(() => {
      const generated = generateQuestions(subject, topic, count, difficulty)
      setQuestions(generated)
      setAnswers(generated.map((q) => ({ questionId: q.id, value: null })))
      setIsGenerating(false)
      toast.success(`تم توليد ${generated.length} سؤال بنجاح`, { id: "gen" })
    }, 2000)
  }, [subject, topic, count, difficulty])

  const handleRegenerate = useCallback(() => {
    handleGenerate()
  }, [handleGenerate])

  const handleAnswer = useCallback((questionId: number, value: string | boolean) => {
    setAnswers((prev) => prev.map((a) => (a.questionId === questionId ? { ...a, value } : a)))
  }, [])

  const handleGrade = useCallback(() => {
    const unanswered = answers.filter((a) => a.value === null).length
    if (unanswered > 0) {
      toast.error(`لديك ${unanswered} أسئلة لم تجب عليها`)
      return
    }
    const grade = computeGrade(answers, questions)
    setResult(grade)
    setShowResult(true)
    const msg = grade.percentage >= 70 ? "أحسنت! نتيجة ممتازة 🎉" : "حاول مرة أخرى لتحسين نتيجتك"
    toast.success(msg)
  }, [answers, questions])

  const allAnswered = answers.length > 0 && answers.every((a) => a.value !== null)

  const subjectIcon = subjects.find((s) => s.value === subject)?.icon || HiOutlineAcademicCap

  return (
    <div className="min-h-screen">
      <DashboardHeader title="توليد أسئلة بالذكاء الاصطناعي" subtitle="أنشئ اختبارات مخصصة باستخدام الذكاء الاصطناعي" />

      <div className="p-6 md:p-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <StatsCard title="أسئلة اليوم" value={stats.todayQuestions} icon={HiOutlineSparkles} color="primary" />
          <StatsCard title="التسلسل" value={`${stats.streak} يوم`} icon={HiFire} color="warning" />
          <StatsCard title="الدقة" value={`${stats.accuracy}%`} icon={HiOutlineChartBar} color="success" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle>إعدادات التوليد</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text">المادة</label>
                  <div className="grid grid-cols-5 gap-2">
                    {subjects.map((s) => {
                      const Icon = s.icon
                      const isActive = subject === s.value
                      return (
                        <button type="button"
                          key={s.value}
                          onClick={() => setSubject(s.value)}
                          className={cn(
                            "flex flex-col items-center gap-1 p-2 rounded-xl border transition-all duration-200",
                            isActive
                              ? "border-primary bg-primary/5 text-primary shadow-sm"
                              : "border-border bg-surface text-text-secondary hover:bg-surface-secondary hover:border-border"
                          )}
                        >
                          <Icon className={cn("w-5 h-5", isActive ? "text-primary" : s.color)} />
                          <span className="text-[10px] font-medium leading-tight text-center">{s.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="topic" className="block text-sm font-medium text-text">
                    الموضوع
                  </label>
                  <input id="topic" type="text" value={topic} onChange={(e) => setTopic(e.target.value)}
                    placeholder="أدخل الموضوع..."
                    className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text placeholder:text-text-tertiary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="count" className="block text-sm font-medium text-text">
                    عدد الأسئلة
                  </label>
                  <div className="flex items-center gap-3">
                    <input id="count" type="range" min={5} max={20} value={count} onChange={(e) => setCount(Number(e.target.value))}
                      className="flex-1 accent-primary h-2 rounded-lg appearance-none cursor-pointer bg-surface-tertiary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md"
                    />
                    <span className="text-sm font-bold text-primary w-8 text-center">{count}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text">المستوى</label>
                  <div className="grid grid-cols-4 gap-2">
                    {difficulties.map((d) => (
                      <button type="button"
                        key={d.value}
                        onClick={() => setDifficulty(d.value)}
                        className={cn(
                          "px-2 py-2 rounded-xl text-xs font-medium border transition-all duration-200",
                          difficulty === d.value
                            ? "border-primary bg-primary/5 text-primary shadow-sm"
                            : "border-border bg-surface text-text-secondary hover:bg-surface-secondary"
                        )}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <button type="button" onClick={handleGenerate} disabled={isGenerating}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium text-sm transition-all duration-200 hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97] shadow-sm"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    جاري التوليد...
                  </>
                ) : (
                  <>
                    <HiOutlineSparkles className="w-5 h-5" />
                    توليد أسئلة بالذكاء الاصطناعي
                  </>
                )}
              </button>
            </CardFooter>
          </Card>
        </motion.div>

        {isGenerating && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {Array.from({ length: Math.min(count, 5) }).map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-surface border border-border/60 rounded-xl p-6 space-y-4 overflow-hidden"
              >
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="h-5 w-48 rounded-lg"
                  style={{
                    background: "linear-gradient(90deg, var(--color-surface-tertiary) 25%, var(--color-surface-secondary) 50%, var(--color-surface-tertiary) 75%)",
                    backgroundSize: "200% 100%",
                  }}
                />
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  className="h-4 w-full rounded-lg"
                  style={{
                    background: "linear-gradient(90deg, var(--color-surface-tertiary) 25%, var(--color-surface-secondary) 50%, var(--color-surface-tertiary) 75%)",
                    backgroundSize: "200% 100%",
                  }}
                />
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((j) => (
                    <motion.div
                      key={j}
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      className="h-8 flex-1 rounded-lg"
                      style={{
                        background: "linear-gradient(90deg, var(--color-surface-tertiary) 25%, var(--color-surface-secondary) 50%, var(--color-surface-tertiary) 75%)",
                        backgroundSize: "200% 100%",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {!isGenerating && questions.length > 0 && (
            <motion.div
              key="questions"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-text">الأسئلة المولدة</h2>
                  <Badge variant="primary" size="md">{questions.length} أسئلة</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={subject === "chemistry" ? "info" : subject === "physics" ? "info" : subject === "math" ? "primary" : subject === "arabic" ? "warning" : "success"} size="md">
                    {subjects.find((s) => s.value === subject)?.label}
                  </Badge>
                  {topic && <Badge variant="neutral" size="md">{topic}</Badge>}
                </div>
              </div>

              {questions.map((q, idx) => {
                const answer = answers.find((a) => a.questionId === q.id)
                const isMcq = q.type === "mcq"
                const isTrueFalse = q.type === "truefalse"
                const isEssay = q.type === "essay"

                return (
                  <motion.div key={q.id} variants={questionVariants}>
                    <Card className={cn(
                      "border-r-4 transition-all duration-300",
                      showResult && answer?.value !== null && (
                        String(q.correctAnswer) === String(answer?.value)
                          ? "border-r-success"
                          : "border-r-error"
                      ),
                      !showResult && "border-r-primary"
                    )}>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                              {q.id}
                            </div>
                            <Badge variant={typeBadgeColors[q.type]} size="sm">{typeLabels[q.type]}</Badge>
                            <Badge variant={difficultyBadgeColors[q.difficulty]} size="sm">
                              {q.difficulty === "easy" ? "سهل" : q.difficulty === "medium" ? "متوسط" : "صعب"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-text-tertiary">
                            <HiOutlineClock size={14} />
                            <span>{q.estimatedTime} ثانية</span>
                          </div>
                        </div>

                        <p className="text-sm font-medium text-text leading-relaxed">{q.text}</p>

                        {isMcq && q.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.options.map((opt, optIdx) => {
                              const isSelected = answer?.value === String(optIdx)
                              const isCorrectAnswer = showResult && String(q.correctAnswer) === String(optIdx)
                              const isWrongAnswer = showResult && isSelected && !isCorrectAnswer
                              return (
                                <button type="button"
                                  key={optIdx}
                                  onClick={() => !showResult && handleAnswer(q.id, String(optIdx))}
                                  disabled={showResult}
                                  className={cn(
                                    "flex items-center gap-3 p-3 rounded-xl border text-sm transition-all duration-200 text-right",
                                    !showResult && "hover:border-primary hover:bg-primary/5",
                                    isSelected && !showResult && "border-primary bg-primary/10 text-primary",
                                    isCorrectAnswer && "border-success bg-success/10 text-success",
                                    isWrongAnswer && "border-error bg-error/10 text-error",
                                    !isSelected && !showResult && "border-border bg-surface text-text",
                                    showResult && !isSelected && !isCorrectAnswer && "opacity-60",
                                    showResult && "cursor-default"
                                  )}
                                >
                                  <span className={cn(
                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 transition-colors",
                                    isSelected && !showResult && "border-primary bg-primary text-white",
                                    isCorrectAnswer && "border-success bg-success text-white",
                                    isWrongAnswer && "border-error bg-error text-white",
                                    !isSelected && !isCorrectAnswer && "border-text-tertiary text-text-tertiary"
                                  )}>
                                    {String.fromCharCode(65 + optIdx)}
                                  </span>
                                  <span className="flex-1">{opt}</span>
                                  {isCorrectAnswer && <HiOutlineCheckCircle className="w-5 h-5 shrink-0 text-success" />}
                                  {isWrongAnswer && <HiOutlineXCircle className="w-5 h-5 shrink-0 text-error" />}
                                </button>
                              )
                            })}
                          </div>
                        )}

                        {isTrueFalse && (
                          <div className="flex gap-3">
                            {["true", "false"].map((val) => {
                              const boolVal = val === "true"
                              const isSelected = answer?.value === boolVal
                              const isCorrectAnswer = showResult && q.correctAnswer === boolVal
                              const isWrongAnswer = showResult && isSelected && !isCorrectAnswer
                              return (
                                <button type="button"
                                  key={val}
                                  onClick={() => !showResult && handleAnswer(q.id, boolVal)}
                                  disabled={showResult}
                                  className={cn(
                                    "flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all duration-200",
                                    !showResult && "hover:border-primary hover:bg-primary/5",
                                    isSelected && !showResult && "border-primary bg-primary/10 text-primary",
                                    isCorrectAnswer && "border-success bg-success/10 text-success",
                                    isWrongAnswer && "border-error bg-error/10 text-error",
                                    !isSelected && !showResult && "border-border bg-surface text-text",
                                    showResult && !isSelected && !isCorrectAnswer && "opacity-60",
                                    showResult && "cursor-default"
                                  )}
                                >
                                  {val === "true" ? (
                                    <HiOutlineBadgeCheck className="w-5 h-5" />
                                  ) : (
                                    <HiOutlineXCircle className="w-5 h-5" />
                                  )}
                                  {val === "true" ? "صح" : "خطأ"}
                                </button>
                              )
                            })}
                          </div>
                        )}

                        {isEssay && (
                          <textarea
                            placeholder="اكتب إجابتك هنا..."
                            value={(answer?.value as string) || ""}
                            onChange={(e) => handleAnswer(q.id, e.target.value)}
                            disabled={showResult}
                            className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text placeholder:text-text-tertiary transition-all duration-200 min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        )}

                        {showResult && isEssay && (
                          <div className="p-4 rounded-xl bg-surface-secondary border border-border/60">
                            <p className="text-xs font-medium text-text-tertiary mb-1">الإجابة النموذجية:</p>
                            <p className="text-sm text-text">{q.correctAnswer as string}</p>
                          </div>
                        )}

                        {showResult && isEssay && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-text-tertiary">التصحيح:</span>
                            {answer?.value && String(answer.value).trim().length > 10 ? (
                              <span className="flex items-center gap-1 text-success">
                                <HiOutlineCheckCircle className="w-4 h-4" /> مقبول
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-warning">
                                <HiOutlineXCircle className="w-4 h-4" /> لم يتم الإجابة بشكل كافٍ
                              </span>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              >
                {!showResult ? (
                  <button type="button" onClick={handleGrade} disabled={!allAnswered}
                    className={cn(
                      "inline-flex items-center gap-2 px-8 py-3 rounded-xl font-medium text-sm transition-all duration-200 active:scale-[0.97] shadow-sm",
                      allAnswered
                        ? "bg-success text-white hover:bg-emerald-600"
                        : "bg-surface-tertiary text-text-tertiary cursor-not-allowed"
                    )}
                  >
                    <HiOutlineCheckCircle className="w-5 h-5" />
                    تصحيح
                  </button>
                ) : (
                  <>
                    <button type="button" onClick={handleRegenerate}
                      className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-medium text-sm transition-all duration-200 hover:bg-primary-dark active:scale-[0.97] shadow-sm"
                    >
                      <HiOutlineRefresh className="w-5 h-5" />
                      توليد مرة أخرى
                    </button>
                  </>
                )}
              </motion.div>

              <AnimatePresence>
                {showResult && result && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <Card className="overflow-hidden border-2 border-primary/20">
                      <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-l from-primary via-success to-primary" />
                      <CardHeader>
                        <CardTitle>نتيجة الاختبار</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                          <div className="p-4 rounded-xl bg-success/5 border border-success/20 text-center">
                            <HiOutlineCheckCircle className="w-6 h-6 text-success mx-auto mb-1" />
                            <p className="text-xs text-text-tertiary">الإجابات الصحيحة</p>
                            <p className="text-2xl font-bold text-success">{result.correct}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-error/5 border border-error/20 text-center">
                            <HiOutlineXCircle className="w-6 h-6 text-error mx-auto mb-1" />
                            <p className="text-xs text-text-tertiary">الإجابات الخاطئة</p>
                            <p className="text-2xl font-bold text-error">{result.wrong}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
                            <HiOutlineChartBar className="w-6 h-6 text-primary mx-auto mb-1" />
                            <p className="text-xs text-text-tertiary">النسبة المئوية</p>
                            <p className="text-2xl font-bold text-primary">{result.percentage}%</p>
                          </div>
                          <div className="p-4 rounded-xl bg-warning/5 border border-warning/20 text-center">
                            <HiOutlineStar className="w-6 h-6 text-warning mx-auto mb-1" />
                            <p className="text-xs text-text-tertiary">التقدير</p>
                            <Badge variant={gradeColors[result.grade]} size="lg" className="text-lg px-4 py-1">{result.grade}</Badge>
                          </div>
                        </div>
                        <Progress value={result.percentage} size="lg" variant={
                          result.percentage >= 80 ? "success" : result.percentage >= 60 ? "warning" : "error"
                        } showLabel />
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {!isGenerating && questions.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4">
                    <HiOutlineSparkles className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-text mb-2">توليد أسئلة بالذكاء الاصطناعي</h3>
                  <p className="text-sm text-text-tertiary max-w-md">
                    اختر المادة والموضوع وعدد الأسئلة والمستوى، ثم اضغط على زر التوليد لبدء إنشاء أسئلة ذكية ومتنوعة
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

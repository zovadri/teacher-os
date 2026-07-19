"use client"

import { useState, useEffect, useMemo, useCallback, ChangeEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineLightningBolt, HiOutlineTrophy, HiOutlineUserGroup,
  HiOutlineClock, HiOutlineCalendar, HiOutlineFilter,
  HiOutlineChevronLeft, HiOutlinePlusCircle, HiStar, HiFire,
  HiOutlineChartBar, HiOutlineExclamationCircle, HiOutlineCheckCircle,
  HiOutlineAcademicCap,
} from "react-icons/hi"
import { toast } from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { StatsCard } from "@/components/ui/StatsCard"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select"

const mockOpponents = [
  { id: "o1", name: "أحمد علي", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ch1" },
  { id: "o2", name: "مريم حسن", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ch2" },
  { id: "o3", name: "خالد صقر", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ch3" },
  { id: "o4", name: "ندى سامي", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ch4" },
  { id: "o5", name: "عمر مصطفى", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ch5" },
  { id: "o6", name: "سارة أحمد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ch6" },
]

const subjectOptions = [
  { value: "chemistry", label: "كيمياء" },
  { value: "physics", label: "فيزياء" },
  { value: "math", label: "رياضيات" },
  { value: "arabic", label: "عربي" },
  { value: "english", label: "إنجليزي" },
]

const subjectLabels: Record<string, string> = {
  chemistry: "كيمياء", physics: "فيزياء", math: "رياضيات", arabic: "عربي", english: "إنجليزي",
}

const difficultyOptions = [
  { value: "easy", label: "سهل" },
  { value: "medium", label: "متوسط" },
  { value: "hard", label: "صعب" },
]

const difficultyLabels: Record<string, string> = {
  easy: "سهل", medium: "متوسط", hard: "صعب",
}

const difficultyColors: Record<string, "success" | "warning" | "error"> = {
  easy: "success", medium: "warning", hard: "error",
}

const questionsOptions = [
  { value: "5", label: "5 أسئلة" },
  { value: "10", label: "10 أسئلة" },
  { value: "15", label: "15 سؤال" },
]

const timeOptions = [
  { value: "5", label: "5 دقائق" },
  { value: "10", label: "10 دقائق" },
  { value: "15", label: "15 دقيقة" },
]

const statusLabels: Record<string, string> = {
  waiting: "قيد الانتظار", active: "جاري", finished: "منتهي",
}

const statusVariants: Record<string, "neutral" | "primary" | "success"> = {
  waiting: "neutral", active: "primary", finished: "success",
}

const resultLabels: Record<string, string> = {
  win: "فوز", loss: "خسارة", draw: "تعادل",
}

const resultVariants: Record<string, "success" | "error" | "warning"> = {
  win: "success", loss: "error", draw: "warning",
}

interface Challenge {
  id: string
  opponent: typeof mockOpponents[0]
  subject: string
  difficulty: "easy" | "medium" | "hard"
  myScore: number
  opponentScore: number
  totalQuestions: number
  timeLimit: number
  timeRemaining: number
  status: "waiting" | "active" | "finished"
  result?: "win" | "loss" | "draw"
}

const initialActiveChallenges: Challenge[] = [
  {
    id: "c1",
    opponent: mockOpponents[0],
    subject: "math",
    difficulty: "medium",
    myScore: 0,
    opponentScore: 0,
    totalQuestions: 10,
    timeLimit: 10,
    timeRemaining: 600,
    status: "waiting",
  },
  {
    id: "c2",
    opponent: mockOpponents[1],
    subject: "chemistry",
    difficulty: "hard",
    myScore: 3,
    opponentScore: 2,
    totalQuestions: 10,
    timeLimit: 15,
    timeRemaining: 272,
    status: "active",
  },
  {
    id: "c3",
    opponent: mockOpponents[2],
    subject: "physics",
    difficulty: "easy",
    myScore: 5,
    opponentScore: 7,
    totalQuestions: 10,
    timeLimit: 10,
    timeRemaining: 0,
    status: "finished",
    result: "loss",
  },
]

const mockHistory = Array.from({ length: 8 }, (_, i) => ({
  id: `h${i + 1}`,
  date: `2026-07-${String(18 - i).padStart(2, "0")}`,
  opponent: mockOpponents[i % 6],
  subject: (["math", "chemistry", "physics", "arabic", "english"] as const)[i % 5],
  myScore: [5, 3, 4, 7, 2, 6, 8, 4][i],
  opponentScore: [3, 5, 4, 4, 6, 6, 5, 7][i],
  result: (["win", "loss", "draw", "win", "loss", "draw", "win", "loss"] as const)[i],
}))

const challengeStats = {
  totalChallenges: 42,
  wins: 22,
  losses: 15,
  draws: 5,
}

const winRate = Math.round((challengeStats.wins / challengeStats.totalChallenges) * 100)
const streak = 3

function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

function ChallengeTimer({ challenge }: { challenge: Challenge }) {
  const [remaining, setRemaining] = useState(challenge.timeRemaining)

  useEffect(() => {
    if (challenge.status !== "active") return
    setRemaining(challenge.timeRemaining)
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [challenge.id, challenge.status, challenge.timeRemaining])

  const isLow = remaining < 60
  return (
    <span className={`flex items-center gap-1 text-xs font-mono font-bold ${isLow ? "text-error" : "text-text-tertiary"}`}>
      <HiOutlineClock size={14} />
      {formatTimer(remaining)}
    </span>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function ChallengesPage() {
  const [activeChallenges, setActiveChallenges] = useState<Challenge[]>(initialActiveChallenges)
  const [quickCount, setQuickCount] = useState(0)
  const [showHistory, setShowHistory] = useState(false)
  const [createForm, setCreateForm] = useState({
    subject: "chemistry",
    difficulty: "medium",
    questions: "10",
    timeLimit: "10",
    opponentId: "o1",
  })

  const handleCreateChallenge = useCallback(() => {
    const opponent = mockOpponents.find((o) => o.id === createForm.opponentId) || mockOpponents[0]
    const newChallenge: Challenge = {
      id: `c-${Date.now()}`,
      opponent,
      subject: createForm.subject,
      difficulty: createForm.difficulty as "easy" | "medium" | "hard",
      myScore: 0,
      opponentScore: 0,
      totalQuestions: Number(createForm.questions),
      timeLimit: Number(createForm.timeLimit),
      timeRemaining: Number(createForm.timeLimit) * 60,
      status: "waiting",
    }
    setActiveChallenges((prev) => [newChallenge, ...prev])
    toast.success("تم إنشاء التحدي بنجاح! في انتظار قبول الخصم.")
  }, [createForm])

  const handleQuickChallenge = useCallback(() => {
    const idx = quickCount % mockOpponents.length
    setQuickCount((c) => c + 1)
    const opponent = mockOpponents[idx]
    const subjects = ["chemistry", "physics", "math", "arabic", "english"]
    const subjectIdx = (quickCount + 1) % subjects.length
    const newChallenge: Challenge = {
      id: `cq-${Date.now()}`,
      opponent,
      subject: subjects[subjectIdx],
      difficulty: (["easy", "medium", "hard"] as const)[(quickCount + 1) % 3],
      myScore: 0,
      opponentScore: 0,
      totalQuestions: 10,
      timeLimit: 10,
      timeRemaining: 600,
      status: "active",
    }
    setActiveChallenges((prev) => [newChallenge, ...prev])
    toast.success(`تحدي سريع مع ${opponent.name}!`)
  }, [quickCount])

  const enterChallenge = useCallback((id: string) => {
    toast.success("جاري الدخول إلى التحدي...")
  }, [])

  const shownHistory = showHistory ? mockHistory : mockHistory.slice(0, 4)

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface to-surface-secondary">
      <DashboardHeader title="تحديات الطلاب" subtitle="تنافس مع زملائك في مسابقات تعليمية" />
      <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatsCard title="إجمالي التحديات" value={challengeStats.totalChallenges} icon={HiOutlineTrophy} color="primary" />
            <StatsCard title="فوز" value={challengeStats.wins} icon={HiOutlineCheckCircle} color="success" />
            <StatsCard title="خسارة" value={challengeStats.losses} icon={HiOutlineExclamationCircle} color="error" />
            <StatsCard title="نسبة الفوز" value={`${winRate}%`} icon={HiOutlineChartBar} color="info" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Badge variant="premium" size="md">
                <HiFire className="w-3.5 h-3.5 ml-1" />
                التسلسل الحالي: {streak} انتصارات متتالية
              </Badge>
            </div>
            <Button
              leftIcon={<HiOutlineLightningBolt size={18} />}
              onClick={handleQuickChallenge}
              className="bg-gradient-to-l from-amber-500 to-orange-500 text-white border-none hover:from-amber-600 hover:to-orange-600"
            >
              تحدي سريع
            </Button>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>إنشاء تحدي جديد</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <Select
                    label="المادة"
                    value={createForm.subject}
                    options={subjectOptions}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setCreateForm({ ...createForm, subject: e.target.value })}
                  />
                  <Select
                    label="الصعوبة"
                    value={createForm.difficulty}
                    options={difficultyOptions}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setCreateForm({ ...createForm, difficulty: e.target.value })}
                  />
                  <Select
                    label="عدد الأسئلة"
                    value={createForm.questions}
                    options={questionsOptions}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setCreateForm({ ...createForm, questions: e.target.value })}
                  />
                  <Select
                    label="الوقت"
                    value={createForm.timeLimit}
                    options={timeOptions}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setCreateForm({ ...createForm, timeLimit: e.target.value })}
                  />
                  <Select
                    label="الخصم"
                    value={createForm.opponentId}
                    options={mockOpponents.map((o) => ({ value: o.id, label: o.name }))}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setCreateForm({ ...createForm, opponentId: e.target.value })}
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <Button leftIcon={<HiOutlinePlusCircle size={16} />} onClick={handleCreateChallenge}>
                    إنشاء
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>التحديات النشطة</CardTitle>
              </CardHeader>
              <CardContent>
                {activeChallenges.length > 0 ? (
                  <div className="space-y-3">
                    {activeChallenges.map((challenge, i) => {
                      const OpponentIcon = HiOutlineUserGroup
                      return (
                        <motion.div
                          key={challenge.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                            challenge.status === "active"
                              ? "bg-primary/5 border-primary/30"
                              : challenge.status === "finished"
                                ? "bg-surface border-border opacity-70"
                                : "bg-surface border-border"
                          }`}
                        >
                          <div className="relative shrink-0">
                            <img
                              src={challenge.opponent.avatar}
                              alt={challenge.opponent.name}
                              className="w-10 h-10 rounded-full bg-surface-secondary"
                            />
                            {challenge.status === "active" && (
                              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-surface" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-sm font-semibold text-text truncate">{challenge.opponent.name}</span>
                              <Badge variant={statusVariants[challenge.status]} size="sm">{statusLabels[challenge.status]}</Badge>
                              <Badge variant={difficultyColors[challenge.difficulty]} size="sm">{difficultyLabels[challenge.difficulty]}</Badge>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-text-tertiary">
                              <span>{subjectLabels[challenge.subject]}</span>
                              <span>•</span>
                              <span>{challenge.totalQuestions} أسئلة</span>
                              {challenge.status !== "waiting" && (
                                <>
                                  <span>•</span>
                                  <span className="font-semibold text-text">
                                    {challenge.myScore} - {challenge.opponentScore}
                                  </span>
                                </>
                              )}
                              <span>•</span>
                              <ChallengeTimer challenge={challenge} />
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {challenge.status === "waiting" && (
                              <Badge variant="neutral" size="sm">في انتظار القبول</Badge>
                            )}
                            {challenge.status === "finished" && challenge.result && (
                              <Badge variant={resultVariants[challenge.result]} size="sm">{resultLabels[challenge.result]}</Badge>
                            )}
                            {(challenge.status === "waiting" || challenge.status === "active") && (
                              <Button size="sm" onClick={() => enterChallenge(challenge.id)}>
                                دخول
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-text-tertiary">
                    <HiOutlineTrophy className="w-12 h-12 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">لا توجد تحديات نشطة</p>
                    <p className="text-xs mt-1">أنشئ تحدياً جديداً أو ابدأ تحدياً سريعاً</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>سجل التحديات</CardTitle>
                <button
                  type="button"
                  onClick={() => setShowHistory((prev) => !prev)}
                  className="text-sm text-primary hover:underline"
                >
                  {showHistory ? "عرض أقل" : "عرض الكل"}
                </button>
              </CardHeader>
              <CardContent>
                {shownHistory.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-right py-3 px-2 text-text-tertiary font-medium text-xs">التاريخ</th>
                          <th className="text-right py-3 px-2 text-text-tertiary font-medium text-xs">الخصم</th>
                          <th className="text-right py-3 px-2 text-text-tertiary font-medium text-xs">المادة</th>
                          <th className="text-right py-3 px-2 text-text-tertiary font-medium text-xs">النتيجة</th>
                          <th className="text-right py-3 px-2 text-text-tertiary font-medium text-xs">النتيجة</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shownHistory.map((item, i) => (
                          <motion.tr
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.03 }}
                            className="border-b border-border last:border-0 hover:bg-surface-secondary transition-colors"
                          >
                            <td className="py-3 px-2 text-text text-xs whitespace-nowrap">{item.date}</td>
                            <td className="py-3 px-2">
                              <div className="flex items-center gap-2">
                                <img src={item.opponent.avatar} alt="" className="w-6 h-6 rounded-full bg-surface-secondary shrink-0" />
                                <span className="text-text text-sm">{item.opponent.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-2 text-text text-xs">{subjectLabels[item.subject]}</td>
                            <td className="py-3 px-2">
                              <span className="text-text font-semibold text-xs">{item.myScore} - {item.opponentScore}</span>
                            </td>
                            <td className="py-3 px-2">
                              <Badge variant={resultVariants[item.result]} size="sm">{resultLabels[item.result]}</Badge>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-text-tertiary">
                    <HiOutlineClock className="w-12 h-12 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">لا يوجد سجل تحديات بعد</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

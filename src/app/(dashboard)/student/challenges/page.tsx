"use client"

import { useState, useEffect, useMemo, useCallback, ChangeEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineLightningBolt, HiOutlineStar, HiOutlineUserGroup,
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
  { id: "o1", name: "ط£ط­ظ…ط¯ ط¹ظ„ظٹ", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ch1" },
  { id: "o2", name: "ظ…ط±ظٹظ… ط­ط³ظ†", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ch2" },
  { id: "o3", name: "ط®ط§ظ„ط¯ طµظ‚ط±", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ch3" },
  { id: "o4", name: "ظ†ط¯ظ‰ ط³ط§ظ…ظٹ", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ch4" },
  { id: "o5", name: "ط¹ظ…ط± ظ…طµط·ظپظ‰", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ch5" },
  { id: "o6", name: "ط³ط§ط±ط© ط£ط­ظ…ط¯", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ch6" },
]

const subjectOptions = [
  { value: "chemistry", label: "ظƒظٹظ…ظٹط§ط،" },
  { value: "physics", label: "ظپظٹط²ظٹط§ط،" },
  { value: "math", label: "ط±ظٹط§ط¶ظٹط§طھ" },
  { value: "arabic", label: "ط¹ط±ط¨ظٹ" },
  { value: "english", label: "ط¥ظ†ط¬ظ„ظٹط²ظٹ" },
]

const subjectLabels: Record<string, string> = {
  chemistry: "ظƒظٹظ…ظٹط§ط،", physics: "ظپظٹط²ظٹط§ط،", math: "ط±ظٹط§ط¶ظٹط§طھ", arabic: "ط¹ط±ط¨ظٹ", english: "ط¥ظ†ط¬ظ„ظٹط²ظٹ",
}

const difficultyOptions = [
  { value: "easy", label: "ط³ظ‡ظ„" },
  { value: "medium", label: "ظ…طھظˆط³ط·" },
  { value: "hard", label: "طµط¹ط¨" },
]

const difficultyLabels: Record<string, string> = {
  easy: "ط³ظ‡ظ„", medium: "ظ…طھظˆط³ط·", hard: "طµط¹ط¨",
}

const difficultyColors: Record<string, "success" | "warning" | "error"> = {
  easy: "success", medium: "warning", hard: "error",
}

const questionsOptions = [
  { value: "5", label: "5 ط£ط³ط¦ظ„ط©" },
  { value: "10", label: "10 ط£ط³ط¦ظ„ط©" },
  { value: "15", label: "15 ط³ط¤ط§ظ„" },
]

const timeOptions = [
  { value: "5", label: "5 ط¯ظ‚ط§ط¦ظ‚" },
  { value: "10", label: "10 ط¯ظ‚ط§ط¦ظ‚" },
  { value: "15", label: "15 ط¯ظ‚ظٹظ‚ط©" },
]

const statusLabels: Record<string, string> = {
  waiting: "ظ‚ظٹط¯ ط§ظ„ط§ظ†طھط¸ط§ط±", active: "ط¬ط§ط±ظٹ", finished: "ظ…ظ†طھظ‡ظٹ",
}

const statusVariants: Record<string, "neutral" | "primary" | "success"> = {
  waiting: "neutral", active: "primary", finished: "success",
}

const resultLabels: Record<string, string> = {
  win: "ظپظˆط²", loss: "ط®ط³ط§ط±ط©", draw: "طھط¹ط§ط¯ظ„",
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
    toast.success("طھظ… ط¥ظ†ط´ط§ط، ط§ظ„طھط­ط¯ظٹ ط¨ظ†ط¬ط§ط­! ظپظٹ ط§ظ†طھط¸ط§ط± ظ‚ط¨ظˆظ„ ط§ظ„ط®طµظ….")
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
    toast.success(`طھط­ط¯ظٹ ط³ط±ظٹط¹ ظ…ط¹ ${opponent.name}!`)
  }, [quickCount])

  const enterChallenge = useCallback((id: string) => {
    toast.success("ط¬ط§ط±ظٹ ط§ظ„ط¯ط®ظˆظ„ ط¥ظ„ظ‰ ط§ظ„طھط­ط¯ظٹ...")
  }, [])

  const shownHistory = showHistory ? mockHistory : mockHistory.slice(0, 4)

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface to-surface-secondary">
      <DashboardHeader title="طھط­ط¯ظٹط§طھ ط§ظ„ط·ظ„ط§ط¨" subtitle="طھظ†ط§ظپط³ ظ…ط¹ ط²ظ…ظ„ط§ط¦ظƒ ظپظٹ ظ…ط³ط§ط¨ظ‚ط§طھ طھط¹ظ„ظٹظ…ظٹط©" />
      <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„طھط­ط¯ظٹط§طھ" value={challengeStats.totalChallenges} icon={HiOutlineStar} color="primary" />
            <StatsCard title="ظپظˆط²" value={challengeStats.wins} icon={HiOutlineCheckCircle} color="success" />
            <StatsCard title="ط®ط³ط§ط±ط©" value={challengeStats.losses} icon={HiOutlineExclamationCircle} color="error" />
            <StatsCard title="ظ†ط³ط¨ط© ط§ظ„ظپظˆط²" value={`${winRate}%`} icon={HiOutlineChartBar} color="info" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Badge variant="premium" size="md">
                <HiFire className="w-3.5 h-3.5 ml-1" />
                ط§ظ„طھط³ظ„ط³ظ„ ط§ظ„ط­ط§ظ„ظٹ: {streak} ط§ظ†طھطµط§ط±ط§طھ ظ…طھطھط§ظ„ظٹط©
              </Badge>
            </div>
            <Button leftIcon={<HiOutlineLightningBolt size={18} />}
              onClick={handleQuickChallenge}
              className="bg-gradient-to-l from-amber-500 to-orange-500 text-white border-none hover:from-amber-600 hover:to-orange-600"
            >
              طھط­ط¯ظٹ ط³ط±ظٹط¹
            </Button>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>ط¥ظ†ط´ط§ط، طھط­ط¯ظٹ ط¬ط¯ظٹط¯</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <Select
                    label="ط§ظ„ظ…ط§ط¯ط©"
                    value={createForm.subject}
                    options={subjectOptions}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setCreateForm({ ...createForm, subject: e.target.value })}
                  />
                  <Select
                    label="ط§ظ„طµط¹ظˆط¨ط©"
                    value={createForm.difficulty}
                    options={difficultyOptions}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setCreateForm({ ...createForm, difficulty: e.target.value })}
                  />
                  <Select
                    label="ط¹ط¯ط¯ ط§ظ„ط£ط³ط¦ظ„ط©"
                    value={createForm.questions}
                    options={questionsOptions}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setCreateForm({ ...createForm, questions: e.target.value })}
                  />
                  <Select
                    label="ط§ظ„ظˆظ‚طھ"
                    value={createForm.timeLimit}
                    options={timeOptions}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setCreateForm({ ...createForm, timeLimit: e.target.value })}
                  />
                  <Select
                    label="ط§ظ„ط®طµظ…"
                    value={createForm.opponentId}
                    options={mockOpponents.map((o) => ({ value: o.id, label: o.name }))}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setCreateForm({ ...createForm, opponentId: e.target.value })}
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <Button leftIcon={<HiOutlinePlusCircle size={16} />} onClick={handleCreateChallenge}>
                    ط¥ظ†ط´ط§ط،
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>ط§ظ„طھط­ط¯ظٹط§طھ ط§ظ„ظ†ط´ط·ط©</CardTitle>
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
                              <span>â€¢</span>
                              <span>{challenge.totalQuestions} ط£ط³ط¦ظ„ط©</span>
                              {challenge.status !== "waiting" && (
                                <>
                                  <span>â€¢</span>
                                  <span className="font-semibold text-text">
                                    {challenge.myScore} - {challenge.opponentScore}
                                  </span>
                                </>
                              )}
                              <span>â€¢</span>
                              <ChallengeTimer challenge={challenge} />
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {challenge.status === "waiting" && (
                              <Badge variant="neutral" size="sm">ظپظٹ ط§ظ†طھط¸ط§ط± ط§ظ„ظ‚ط¨ظˆظ„</Badge>
                            )}
                            {challenge.status === "finished" && challenge.result && (
                              <Badge variant={resultVariants[challenge.result]} size="sm">{resultLabels[challenge.result]}</Badge>
                            )}
                            {(challenge.status === "waiting" || challenge.status === "active") && (
                              <Button size="sm" onClick={() => enterChallenge(challenge.id)}>
                                ط¯ط®ظˆظ„
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-text-tertiary">
                    <HiOutlineStar className="w-12 h-12 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">ظ„ط§ طھظˆط¬ط¯ طھط­ط¯ظٹط§طھ ظ†ط´ط·ط©</p>
                    <p className="text-xs mt-1">ط£ظ†ط´ط¦ طھط­ط¯ظٹط§ظ‹ ط¬ط¯ظٹط¯ط§ظ‹ ط£ظˆ ط§ط¨ط¯ط£ طھط­ط¯ظٹط§ظ‹ ط³ط±ظٹط¹ط§ظ‹</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>ط³ط¬ظ„ ط§ظ„طھط­ط¯ظٹط§طھ</CardTitle>
                <button
                  type="button"
                  onClick={() => setShowHistory((prev) => !prev)}
                  className="text-sm text-primary hover:underline"
                >
                  {showHistory ? "ط¹ط±ط¶ ط£ظ‚ظ„" : "ط¹ط±ط¶ ط§ظ„ظƒظ„"}
                </button>
              </CardHeader>
              <CardContent>
                {shownHistory.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-right py-3 px-2 text-text-tertiary font-medium text-xs">ط§ظ„طھط§ط±ظٹط®</th>
                          <th className="text-right py-3 px-2 text-text-tertiary font-medium text-xs">ط§ظ„ط®طµظ…</th>
                          <th className="text-right py-3 px-2 text-text-tertiary font-medium text-xs">ط§ظ„ظ…ط§ط¯ط©</th>
                          <th className="text-right py-3 px-2 text-text-tertiary font-medium text-xs">ط§ظ„ظ†طھظٹط¬ط©</th>
                          <th className="text-right py-3 px-2 text-text-tertiary font-medium text-xs">ط§ظ„ظ†طھظٹط¬ط©</th>
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
                    <p className="text-sm">ظ„ط§ ظٹظˆط¬ط¯ ط³ط¬ظ„ طھط­ط¯ظٹط§طھ ط¨ط¹ط¯</p>
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

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  HiOutlinePlusCircle, HiOutlineClock, HiOutlineAcademicCap,
  HiOutlineStar, HiOutlineEye, HiOutlineCheckCircle,
  HiOutlineLockOpen, HiOutlineArrowLeft, HiOutlineFire,
} from "react-icons/hi"
import toast from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Progress } from "@/components/ui/Progress"

interface TrialLesson {
  id: number
  title: string
  subject: string
  teacher: string
  duration: number
  views: number
  maxViews: number
  rating: number
  watched: boolean
  category: "video" | "interactive" | "pdf"
  description: string
  color: string
}

const trialLessons: TrialLesson[] = [
  { id: 1, title: "ط§ظ„ظƒظٹظ…ظٹط§ط، - ط§ظ„ط¨ط§ط¨ ط§ظ„ط£ظˆظ„: ط§ظ„ط¹ظ†ط§طµط± ط§ظ„ط§ظ†طھظ‚ط§ظ„ظٹط©", subject: "ظƒظٹظ…ظٹط§ط،", teacher: "ط£. ط®ط§ظ„ط¯ طµظ‚ط±", duration: 45, views: 3, maxViews: 5, rating: 4.9, watched: false, category: "video", description: "ط´ط±ط­ ظƒط§ظ…ظ„ ظ„ظ„ط¹ظ†ط§طµط± ط§ظ„ط§ظ†طھظ‚ط§ظ„ظٹط© ظˆط®ظˆط§طµظ‡ط§", color: "from-emerald-400 to-emerald-600" },
  { id: 2, title: "ط§ظ„ظپظٹط²ظٹط§ط، - ط§ظ„ظپطµظ„ ط§ظ„ط£ظˆظ„: ط§ظ„طھظٹط§ط± ط§ظ„ظƒظ‡ط±ط¨ظٹ", subject: "ظپظٹط²ظٹط§ط،", teacher: "ط£. ط£ط­ظ…ط¯ ط³ظ…ظٹط±", duration: 40, views: 2, maxViews: 5, rating: 4.8, watched: false, category: "video", description: "ظ‚ظˆط§ظ†ظٹظ† ط§ظ„طھظٹط§ط± ط§ظ„ظƒظ‡ط±ط¨ظٹ ظˆط·ط±ظ‚ ط­ط³ط§ط¨ظ‡", color: "from-blue-400 to-blue-600" },
  { id: 3, title: "ط§ظ„طھظپط§ط¶ظ„ - ط§ظ„ظ†ظ‡ط§ظٹط§طھ ظˆط§ظ„ط§طھطµط§ظ„", subject: "ط±ظٹط§ط¶ظٹط§طھ", teacher: "ط£. ظ†ط¨ظٹظ„ ط¥ط¨ط±ط§ظ‡ظٹظ…", duration: 35, views: 1, maxViews: 5, rating: 4.7, watched: false, category: "interactive", description: "طھظ…ط§ط±ظٹظ† طھظپط§ط¹ظ„ظٹط© ط¹ظ„ظ‰ ط§ظ„ظ†ظ‡ط§ظٹط§طھ", color: "from-purple-400 to-purple-600" },
  { id: 4, title: "ط§ظ„ظ†ط­ظˆ - ط§ظ„ظ…ط¨طھط¯ط£ ظˆط§ظ„ط®ط¨ط±", subject: "ط¹ط±ط¨ظٹ", teacher: "ط£. ظ…ط­ظ…ط¯ طµظ„ط§ط­", duration: 30, views: 4, maxViews: 5, rating: 4.9, watched: true, category: "video", description: "ظ‚ظˆط§ط¹ط¯ ط§ظ„ظ…ط¨طھط¯ط£ ظˆط§ظ„ط®ط¨ط± ظ…ط¹ ط§ظ„ط£ظ…ط«ظ„ط©", color: "from-amber-400 to-amber-600" },
  { id: 5, title: "Grammar - Present Tenses", subject: "ط¥ظ†ط¬ظ„ظٹط²ظٹ", teacher: "ط£. ط£ط­ظ…ط¯ ظپط±ظٹط¯", duration: 25, views: 0, maxViews: 5, rating: 4.5, watched: false, category: "interactive", description: "ط§ظ„ط£ط²ظ…ظ†ط© ط§ظ„ط­ط§ظ„ظٹط© ظپظٹ ط§ظ„ظ„ط؛ط© ط§ظ„ط¥ظ†ط¬ظ„ظٹط²ظٹط©", color: "from-rose-400 to-rose-600" },
  { id: 6, title: "ط§ظ„ظƒظٹظ…ظٹط§ط، - ط§ظ„ط¥طھط²ط§ظ† ط§ظ„ظƒظٹظ…ظٹط§ط¦ظٹ", subject: "ظƒظٹظ…ظٹط§ط،", teacher: "ط£. ظ…ط­ظ…ظˆط¯ ط¬ظ„ط§ظ„", duration: 50, views: 2, maxViews: 3, rating: 4.6, watched: false, category: "pdf", description: "ظ…ظ„ط®طµ طھظپط§ط¹ظ„ط§طھ ط§ظ„ط¥طھط²ط§ظ† ظ…ط¹ ط§ظ„طھظ…ط§ط±ظٹظ†", color: "from-cyan-400 to-cyan-600" },
  { id: 7, title: "ط§ظ„ظپظٹط²ظٹط§ط، ط§ظ„ط­ط¯ظٹط«ط© - ظ…ظ‚ط¯ظ…ط©", subject: "ظپظٹط²ظٹط§ط،", teacher: "ط£. ظ…ظٹظ†ط§ ظ…ط¬ط¯ظٹ", duration: 30, views: 1, maxViews: 5, rating: 4.7, watched: false, category: "video", description: "ظ†ط¸ط±ظٹط§طھ ط§ظ„ظپظٹط²ظٹط§ط، ط§ظ„ط­ط¯ظٹط«ط©", color: "from-indigo-400 to-indigo-600" },
  { id: 8, title: "ط§ظ„ط£ط­ظٹط§ط، - ط§ظ„ط®ظ„ظٹط©", subject: "ط£ط­ظٹط§ط،", teacher: "ط£. ظ‡ط§ظ†ظٹ ط¬ظ…ط¹ط©", duration: 35, views: 0, maxViews: 5, rating: 4.4, watched: false, category: "interactive", description: "طھط±ظƒظٹط¨ ط§ظ„ط®ظ„ظٹط© ظˆظˆط¸ط§ط¦ظپظ‡ط§", color: "from-green-400 to-green-600" },
]

const categories = ["ط§ظ„ظƒظ„", "ظپظٹط¯ظٹظˆ", "طھظپط§ط¹ظ„ظٹ", "PDF"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function TrialsPage() {
  const [filter, setFilter] = useState("ط§ظ„ظƒظ„")
  const [playing, setPlaying] = useState<number | null>(null)
  const [lessons, setLessons] = useState(trialLessons)

  const catMap: Record<string, string> = { "ط§ظ„ظƒظ„": "all", "ظپظٹط¯ظٹظˆ": "video", "طھظپط§ط¹ظ„ظٹ": "interactive", "PDF": "pdf" }
  const filtered = filter === "ط§ظ„ظƒظ„" ? lessons : lessons.filter((l) => l.category === catMap[filter])

  const totalViews = lessons.reduce((s, l) => s + l.views, 0)
  const lessonsLeft = lessons.filter((l) => !l.watched).length
  const avgRating = (lessons.reduce((s, l) => s + l.rating, 0) / lessons.length).toFixed(1)

  const watchLesson = (id: number) => {
    setPlaying(id)
    toast.success("ط¬ط§ط±ظٹ طھط´ط؛ظٹظ„ ط§ظ„ط­طµط© ط§ظ„طھط¬ط±ظٹط¨ظٹط©...")
    setTimeout(() => {
      setLessons((prev) => prev.map((l) => l.id === id ? { ...l, views: l.views + 1, watched: true } : l))
      setPlaying(null)
      toast.success("طھظ… ظ…ط´ط§ظ‡ط¯ط© ط§ظ„ط­طµط© ط§ظ„طھط¬ط±ظٹط¨ظٹط©! ظ…طھط¨ظ‚ظٹ " + (lessons.find((l) => l.id === id)?.maxViews! - lessons.find((l) => l.id === id)?.views! - 1) + " ظ…ط´ط§ظ‡ط¯ط©")
    }, 2000)
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader title="ط­طµطµ طھط¬ط±ظٹط¨ظٹط© ظ…ط¬ط§ظ†ظٹط©" subtitle="ط¬ط±ط¨ ط§ظ„ط¯ط±ظˆط³ ظ…ط¬ط§ظ†ط§ظ‹ ظ‚ط¨ظ„ ط§ظ„ط§ط´طھط±ط§ظƒ - ط£ظˆظ„ 4 ط­طµطµ ظ…ط¬ط§ظ†ط§ظ‹" />
      <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <StatsCard title="ط§ظ„ط­طµطµ ط§ظ„ظ…طھط§ط­ط©" value={lessons.length} icon={HiOutlinePlusCircle} color="primary" />
            <StatsCard title="طھظ… ط§ظ„ظ…ط´ط§ظ‡ط¯ط©" value={lessons.filter((l) => l.watched).length} icon={HiOutlineEye} color="success" />
            <StatsCard title="ط§ظ„ط­طµطµ ط§ظ„ظ…طھط¨ظ‚ظٹط©" value={lessonsLeft} icon={HiOutlineLockOpen} color="warning" />
            <StatsCard title="ط§ظ„طھظ‚ظٹظٹظ…" value={`${avgRating}/5`} icon={HiOutlineStar} color="info" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex gap-2 flex-wrap">
              {categories.map((c) => (
                <button type="button"
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    filter === c ? "border-primary bg-primary/10 text-primary" : "border-border text-text-secondary hover:bg-surface-secondary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <Badge variant="premium" size="md">
              <HiOutlineFire className="w-3.5 h-3.5 ml-1" />
              ط£ظˆظ„ 4 ط­طµطµ ظ…ط¬ط§ظ†ط§ظ‹ طھظ…ط§ظ…ط§ظ‹
            </Badge>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((lesson) => (
              <motion.div key={lesson.id} variants={itemVariants}>
                <Card className={`h-full flex flex-col border-2 ${lesson.watched ? "border-success/30" : "border-border"}`}>
                  <div className={`h-28 bg-gradient-to-br ${lesson.color} flex items-center justify-center relative`}>
                    <HiOutlineAcademicCap className="w-10 h-10 text-white/60" />
                    <Badge variant="neutral" size="sm" className="absolute top-2 right-2 bg-white/20 text-white border-0">
                      {lesson.subject}
                    </Badge>
                    {lesson.watched && (
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-success/80 text-white text-[10px] px-2 py-0.5 rounded-full">
                        <HiOutlineCheckCircle className="w-3 h-3" /> طھظ…طھ ط§ظ„ظ…ط´ط§ظ‡ط¯ط©
                      </div>
                    )}
                  </div>
                  <CardContent className="flex-1 flex flex-col gap-2 p-4">
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-text leading-snug mb-1">{lesson.title}</h3>
                      <p className="text-xs text-text-tertiary mb-1">{lesson.teacher}</p>
                      <p className="text-[11px] text-text-tertiary">{lesson.description}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-text-tertiary">
                      <span className="flex items-center gap-1"><HiOutlineClock className="w-3.5 h-3.5" /> {lesson.duration} ط¯ظ‚ظٹظ‚ط©</span>
                      <span className="flex items-center gap-1"><HiOutlineStar className="w-3.5 h-3.5 text-amber-400" /> {lesson.rating}</span>
                    </div>
                    <div className="text-[11px] text-text-tertiary flex items-center justify-between">
                      <span>ط§ظ„ظ…ط´ط§ظ‡ط¯ط§طھ: {lesson.views}/{lesson.maxViews}</span>
                      <Progress value={(lesson.views / lesson.maxViews) * 100} size="sm" variant="primary" className="w-16" />
                    </div>
                  </CardContent>
                  <CardFooter className="p-3 pt-0">
                    <button type="button"
                      onClick={() => watchLesson(lesson.id)}
                      disabled={playing === lesson.id || lesson.views >= lesson.maxViews}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                        lesson.views >= lesson.maxViews
                          ? "bg-surface-tertiary text-text-tertiary cursor-not-allowed"
                          : playing === lesson.id
                            ? "bg-primary/50 text-white cursor-wait"
                            : "bg-primary text-white hover:bg-primary-dark"
                      }`}
                    >
                      {playing === lesson.id ? (
                        <>ط¬ط§ط±ظٹ ط§ظ„طھط´ط؛ظٹظ„...</>
                      ) : lesson.views >= lesson.maxViews ? (
                        <>ط§ظ†طھظ‡طھ ط§ظ„ظ…ط´ط§ظ‡ط¯ط§طھ ط§ظ„ظ…طھط§ط­ط©</>
                      ) : (
                        <><HiOutlinePlusCircle className="w-4 h-4" /> ظ…ط´ط§ظ‡ط¯ط© ط§ظ„ط­طµط© ط§ظ„طھط¬ط±ظٹط¨ظٹط©</>
                      )}
                    </button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-text-tertiary">
              <HiOutlinePlusCircle className="w-16 h-16 mx-auto mb-3 opacity-30" />
              <p className="text-sm">ظ„ط§ طھظˆط¬ط¯ ط­طµطµ طھط¬ط±ظٹط¨ظٹط© ظپظٹ ظ‡ط°ط§ ط§ظ„طھطµظ†ظٹظپ</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

"use client"
import { det } from "@/lib/utils"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiCheckCircle, HiOutlineCheckCircle, HiOutlineClock, HiFire, HiStar,
  HiOutlineBookOpen, HiOutlineChartBar, HiOutlineSparkles, HiOutlineSun
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"

const weekdays = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]

interface StudyTask {
  id: string
  subject: string
  topic: string
  time: number
  priority: "high" | "medium" | "low"
  done: boolean
}

function generateTasks(): StudyTask[] {
  const subjects = [
    { subject: "الكيمياء", topics: ["الباب الأول - العناصر الانتقالية", "الباب الثاني - الاتزان الكيميائي", "الباب الثالث - الأحماض والقواعد"] },
    { subject: "الفيزياء", topics: ["الفصل الأول - الكهربية التيارية", "الفصل الثاني - capacitors", "الفصل الثالث - التيار المتردد"] },
    { subject: "الرياضيات", topics: ["التفاضل - المشتقات", "التكامل - طرق التكامل", "الهندسة الفراغية - المتجهات"] },
    { subject: "العربي", topics: ["النحو - كان وأخواتها", "البلاغة - التشبيه", "الأدب - مدرسة المهجر"] },
    { subject: "الإنجليزي", topics: ["Grammar - Tenses Review", "Vocabulary - Unit 7", "Reading Comprehension"] },
  ]
  const tasks: StudyTask[] = []
  const shuffled = [...subjects].sort(() => det() - 0.5).slice(0, 5)
  shuffled.forEach((s, i) => {
    const topic = s.topics[Math.floor(det() * s.topics.length)]
    tasks.push({
      id: `task-${i}`,
      subject: s.subject,
      topic,
      time: [45, 60, 30, 90][Math.floor(det() * 4)],
      priority: i < 2 ? "high" : i < 4 ? "medium" : "low",
      done: false,
    })
  })
  return tasks
}

export default function DailyPlanPage() {
  const today = new Date()
  const dayName = weekdays[today.getDay()]
  const dateStr = `${today.getDate()} ${["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"][today.getMonth()]} ${today.getFullYear()}`

  const [tasks, setTasks] = useState(generateTasks)
  const [streak] = useState(Math.floor(det() * 8) + 3)

  const completed = tasks.filter((t) => t.done).length
  const total = tasks.length
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const priorityColors: Record<string, string> = {
    high: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800",
    medium: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    low: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  }
  const priorityLabels: Record<string, string> = { high: "عالي", medium: "متوسط", low: "منخفض" }

  const getMessage = () => {
    if (streak >= 7) return { text: "أنت في حالة تألق! استمر بنفس القوة 🔥", icon: HiFire }
    if (streak >= 5) return { text: "مستمر في النجاح! واصل التقدم ⭐", icon: HiStar }
    if (streak >= 3) return { text: "بداية قوية! استمر على هذا المنوال 💪", icon: HiOutlineSparkles }
    return { text: "كل رحلة تبدأ بخطوة. ابدأ مذاكرتك الآن! 🌟", icon: HiOutlineSun }
  }
  const msg = getMessage()

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface to-surface-secondary">
      <DashboardHeader />
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-text">هتذاكر إيه النهاردة؟</h1>
          <p className="text-text-secondary mt-1">{dayName} - {dateStr}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="md:col-span-2 bg-surface rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <msg.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-text-secondary">{msg.text}</span>
              </div>
              <span className="text-xs text-text-tertiary">{completed}/{total} تم</span>
            </div>
            <div className="w-full h-2.5 bg-surface-tertiary rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-l from-primary to-primary/60 rounded-full transition-all" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border border-amber-200 dark:border-amber-800 p-6 text-center">
            <HiFire className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{streak}</p>
            <p className="text-xs text-amber-600/70 dark:text-amber-400/70">أيام متتالية</p>
            <p className="text-xs text-amber-600/50 dark:text-amber-400/50 mt-1">حافظ على استمراريتك!</p>
          </motion.div>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-text flex items-center gap-2">
            <HiOutlineBookOpen className="w-5 h-5 text-primary" />
            مهام اليوم
          </h2>

          <AnimatePresence mode="popLayout">
            {tasks.map((task, i) => (
              <motion.div key={task.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className={`group flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer
                  ${task.done ? "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200/50 dark:border-emerald-800/50" : "bg-surface border-border hover:border-primary/30 hover:shadow-sm"}`}
                onClick={() => toggleTask(task.id)}>
                <div className="shrink-0">
                  {task.done ? (
                    <HiCheckCircle className="w-6 h-6 text-emerald-500" />
                  ) : (
                    <HiOutlineCheckCircle className="w-6 h-6 text-text-tertiary group-hover:text-primary transition-colors" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm ${task.done ? "line-through text-text-tertiary" : "text-text"}`}>
                    {task.subject}
                  </p>
                  <p className={`text-xs mt-0.5 ${task.done ? "text-text-tertiary/60" : "text-text-secondary"}`}>
                    {task.topic}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${priorityColors[task.priority]}`}>
                    {priorityLabels[task.priority]}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-text-tertiary">
                    <HiOutlineClock className="w-3.5 h-3.5" />
                    {task.time} د
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {progress === 100 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl bg-gradient-to-l from-emerald-500 to-emerald-600 text-white text-center">
            <HiCheckCircle className="w-10 h-10 mx-auto mb-2" />
            <h3 className="text-lg font-bold">أحسنت! 🎉</h3>
            <p className="text-emerald-100 text-sm">أنهيت كل مهام اليوم. خذ قسطاً من الراحة واستعد لليوم التالي!</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiStar, HiFire, HiGift, HiBookOpen, HiVideoCamera,
  HiAcademicCap, HiBadgeCheck, HiColorSwatch, HiClock, HiCheck,
  HiOutlineClock, HiOutlineStar, HiOutlineLightningBolt
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { toast } from "react-hot-toast"

interface Reward {
  id: string
  name: string
  description: string
  cost: number
  icon: typeof HiStar
  color: string
}

interface PointsHistory {
  action: string
  points: number
  date: string
  type: "earned" | "spent"
}

const rewards: Reward[] = [
  { id: "r1", name: "5 مشاهدات فيديو إضافية", description: "فتح 5 مشاهدات إضافية لأي فيديو على المنصة", cost: 300, icon: HiVideoCamera, color: "text-blue-500" },
  { id: "r2", name: "مراجعة واجب优先级", description: "مراجعة الواجب القادم بأولوية عالية من المدرس", cost: 500, icon: HiBookOpen, color: "text-emerald-500" },
  { id: "r3", name: "جلسة خاصة مع المدرس", description: "جلسة أونلاين 30 دقيقة للمراجعة الفردية", cost: 1000, icon: HiAcademicCap, color: "text-purple-500" },
  { id: "r4", name: "شهادة تفوق", description: "شهادة إلكترونية موثقة لإنجازاتك الدراسية", cost: 750, icon: HiBadgeCheck, color: "text-amber-500" },
  { id: "r5", name: "اختبار تدريبي إضافي", description: "فتح اختبار تدريبي جديد لمادة من اختيارك", cost: 400, icon: HiStar, color: "text-rose-500" },
  { id: "r6", name: "إطار صورة شخصي مميز", description: "إطار حصري لصورة بروفايل الطالب", cost: 600, icon: HiColorSwatch, color: "text-indigo-500" },
]

const history: PointsHistory[] = [
  { action: "إكمال امتحان الكيمياء الأسبوعي", points: 150, date: "2026-07-18", type: "earned" },
  { action: "حضور 5 أيام متتالية", points: 100, date: "2026-07-17", type: "earned" },
  { action: "حل واجب الفيزياء", points: 50, date: "2026-07-16", type: "earned" },
  { action: "شراء 5 مشاهدات إضافية", points: -300, date: "2026-07-15", type: "spent" },
  { action: "تصدر ترتيب الفصل في الرياضيات", points: 200, date: "2026-07-14", type: "earned" },
  { action: "إكمال مراجعة شهرية", points: 120, date: "2026-07-13", type: "earned" },
  { action: "مشاركة في مناقشة المجموعة", points: 30, date: "2026-07-12", type: "earned" },
]

export default function RewardsPage() {
  const [points, setPoints] = useState(1250)
  const [myRewards, setMyRewards] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<"store" | "history" | "mine">("store")

  const redeem = (reward: Reward) => {
    if (myRewards.includes(reward.id)) {
      toast.error("لقد استلمت هذا already!")
      return
    }
    if (points < reward.cost) {
      toast.error("رصيد النقاط غير كافٍ!")
      return
    }
    setPoints((p) => p - reward.cost)
    setMyRewards((prev) => [...prev, reward.id])
    toast.success(`تم شراء "${reward.name}" بنجاح! 🎉`)
  }

  const tabs = [
    { id: "store" as const, label: "المتجر", icon: HiGift },
    { id: "mine" as const, label: "مكافآتي", icon: HiCheck },
    { id: "history" as const, label: "السجل", icon: HiClock },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface to-surface-secondary">
      <DashboardHeader />
      <div className="p-6 md:p-8 lg:p-10 max-w-4xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-l from-amber-500 to-orange-500 rounded-2xl p-6 text-white text-center shadow-lg">
          <HiStar className="w-10 h-10 mx-auto mb-2" />
          <p className="text-sm opacity-80">رصيد النقاط</p>
          <p className="text-4xl font-bold">{points.toLocaleString()}</p>
          <p className="text-xs opacity-70 mt-1">استمر في التعلم واجمع المزيد!</p>
        </motion.div>

        <div className="flex gap-2 bg-surface-secondary rounded-xl p-1 border border-border">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${isActive ? "bg-surface text-primary shadow-sm" : "text-text-tertiary hover:text-text"}`}>
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "store" && (
            <motion.div key="store" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward, i) => {
                const Icon = reward.icon
                const owned = myRewards.includes(reward.id)
                return (
                  <motion.div key={reward.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className={`bg-surface rounded-2xl border p-5 flex flex-col ${owned ? "border-emerald-300 dark:border-emerald-700" : "border-border hover:border-primary/30"} transition-all`}>
                    <div className={`w-12 h-12 rounded-xl bg-surface-secondary flex items-center justify-center mb-3 ${reward.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-text text-sm">{reward.name}</h3>
                    <p className="text-xs text-text-secondary mt-1 flex-1">{reward.description}</p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                      <span className="flex items-center gap-1 text-sm font-bold text-amber-600 dark:text-amber-400">
                        <HiStar className="w-4 h-4" /> {reward.cost}
                      </span>
                      {owned ? (
                        <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-lg">
                          <HiCheck className="w-3.5 h-3.5" /> تم
                        </span>
                      ) : (
                        <button type="button" onClick={() => redeem(reward)}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${points >= reward.cost ? "bg-primary text-white hover:bg-primary-dark" : "bg-surface-tertiary text-text-tertiary cursor-not-allowed"}`}
                          disabled={points < reward.cost}>
                          {points >= reward.cost ? "اشتراك" : "نقاط غير كافية"}
                        </button>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}

          {activeTab === "mine" && (
            <motion.div key="mine" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              {myRewards.length === 0 ? (
                <div className="text-center py-12 text-text-tertiary">
                  <HiGift className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>لم تشترِ أي مكافأة بعد</p>
                  <p className="text-xs mt-1">تصفح المتجر وابدأ في جمع النقاط!</p>
                </div>
              ) : (
                myRewards.map((id) => {
                  const reward = rewards.find((r) => r.id === id)!
                  const Icon = reward.icon
                  return (
                    <div key={id} className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-emerald-200 dark:border-emerald-800">
                      <div className={`w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center ${reward.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-text text-sm">{reward.name}</p>
                        <p className="text-xs text-text-secondary">{reward.description}</p>
                      </div>
                      <HiCheck className="w-5 h-5 text-emerald-500 mr-auto" />
                    </div>
                  )
                })
              )}
            </motion.div>
          )}

          {activeTab === "history" && (
            <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
              {history.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                  className="flex items-center justify-between p-4 bg-surface rounded-xl border border-border/60">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.type === "earned" ? "bg-emerald-50 dark:bg-emerald-900/30" : "bg-red-50 dark:bg-red-900/30"}`}>
                      {item.type === "earned" ? <HiOutlineLightningBolt className="w-4 h-4 text-emerald-600" /> : <HiOutlineClock className="w-4 h-4 text-red-600" />}
                    </div>
                    <div>
                      <p className="text-sm text-text">{item.action}</p>
                      <p className="text-xs text-text-tertiary">{item.date}</p>
                    </div>
                  </div>
                  <span className={`shrink-0 text-sm font-bold ${item.type === "earned" ? "text-emerald-600" : "text-red-600"}`}>
                    {item.type === "earned" ? "+" : ""}{item.points}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

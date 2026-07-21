"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineTag, HiOutlineCheckCircle, HiOutlineExclamationCircle,
  HiOutlineClock, HiOutlineCalendar, HiOutlineTrash, HiOutlinePencil,
  HiOutlinePlusCircle, HiOutlineChevronDown, HiOutlineTrendingUp,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { StatsCard } from "@/components/ui/StatsCard"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import { Modal } from "@/components/ui/Modal"
import { EmptyState } from "@/components/ui/EmptyState"

const mockGoals = Array.from({ length: 8 }, (_, i) => ({
  id: `goal-${i + 1}`,
  title: ["إنهاء كورس النحو قبل نهاية الترم", "الوصول إلى 95% في الامتحان النهائي", "حل جميع واجبات البلاغة", "حفظ 20 حديثاً هذا الشهر", "قراءة 5 كتب", "تحقيق 100% في اختبار الفصل", "إنهاء 50 درساً", "الحصول على شهادة إتمام الكورس"][i],
  description: "وصف الهدف وتفاصيله",
  targetDate: new Date(2026, 7 + (i % 4), (i % 28) + 1),
  progress: [30, 65, 80, 25, 45, 90, 55, 10][i],
  category: (["course", "exam", "homework", "reading", "academic"] as const)[i % 5],
  status: (["active", "active", "active", "active", "completed", "active"] as const)[i],
}))

const categoryColors: Record<string, "primary" | "success" | "warning" | "error" | "info"> = {
  course: "primary", exam: "error", homework: "warning", reading: "info", academic: "success",
}
const categoryLabels: Record<string, string> = {
  course: "كورس", exam: "امتحان", homework: "واجبات", reading: "قراءة", academic: "أكاديمي",
}
const statusLabels: Record<string, string> = { active: "نشط", completed: "مكتمل" }

function getCountdown(target: Date): string {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return "انتهى"
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days > 30) return `${Math.floor(days / 30)} شهر`
  return `${days} يوم`
}

export default function StudentGoalsPage() {
  const [goals, setGoals] = useState(mockGoals)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<typeof mockGoals[0] | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [newGoal, setNewGoal] = useState({ title: "", description: "", category: "course", targetDate: "" })
  const [editingProgress, setEditingProgress] = useState<string | null>(null)

  const totalActive = useMemo(() => goals.filter((g) => g.status === "active").length, [goals])
  const totalCompleted = useMemo(() => goals.filter((g) => g.status === "completed").length, [goals])
  const atRisk = useMemo(() => goals.filter((g) => {
    if (g.status === "completed") return false
    const diff = g.targetDate.getTime() - Date.now()
    return g.progress < 50 && diff < 1000 * 60 * 60 * 24 * 14
  }).length, [goals])

  const addGoal = () => {
    if (!newGoal.title.trim()) return
    setGoals((prev) => [...prev, {
      id: `goal-${Date.now()}`,
      title: newGoal.title,
      description: newGoal.description,
      targetDate: new Date(newGoal.targetDate || Date.now()),
      progress: 0,
      category: newGoal.category as "course" | "exam" | "homework" | "reading" | "academic",
      status: "active",
    }])
    setNewGoal({ title: "", description: "", category: "course", targetDate: "" })
    setShowAddModal(false)
  }

  const updateProgress = (id: string, progress: number) => {
    setGoals((prev) => prev.map((g) => {
      if (g.id !== id) return g
      const pct = Math.min(Math.max(progress, 0), 100)
      return { ...g, progress: pct, status: pct >= 100 ? "completed" : g.status }
    }))
    setEditingProgress(null)
  }

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id))
    setDeleteConfirm(null)
    if (selectedGoal?.id === id) setSelectedGoal(null)
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader title="أهدافي الدراسية" subtitle="حدد أهدافك وتابع تقدمك نحو تحقيقها" />
      <div className="p-4 md:p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <StatsCard title="الأهداف النشطة" value={totalActive} icon={HiOutlineTag} color="primary" />
          <StatsCard title="مكتملة" value={totalCompleted} icon={HiOutlineCheckCircle} color="success" />
          <StatsCard title="في خطر" value={atRisk} icon={HiOutlineExclamationCircle} color="error" subtitle="تقدم منخفض وموعد وشيك" />
        </motion.div>

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text">قائمة الأهداف</h2>
          <Button leftIcon={<HiOutlinePlusCircle size={16} />} onClick={() => setShowAddModal(true)}>إضافة هدف</Button>
        </div>

        {goals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.map((goal, i) => {
              const daysLeft = getCountdown(goal.targetDate)
              const isAtRisk = goal.status === "active" && goal.progress < 50 && daysLeft !== "انتهى" && !daysLeft.includes("شهر")
              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card
                    hover
                    className={`h-full ${goal.status === "completed" ? "border-success/30" : isAtRisk ? "border-error/30" : ""}`}
                    onClick={() => setSelectedGoal(goal)}
                  >
                    <CardContent>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-semibold text-text truncate">{goal.title}</h3>
                            <Badge variant={categoryColors[goal.category]} size="sm">{categoryLabels[goal.category]}</Badge>
                            <Badge variant={goal.status === "completed" ? "success" : "primary"} size="sm">
                              {statusLabels[goal.status]}
                            </Badge>
                          </div>
                          <p className="text-xs text-text-tertiary line-clamp-1">{goal.description}</p>
                        </div>
                        <div className="relative w-14 h-14 shrink-0 mr-3">
                          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="3" className="text-surface-tertiary" />
                            <circle
                              cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="3"
                              strokeDasharray={`${(goal.progress / 100) * 97.4} 97.4`}
                              strokeLinecap="round"
                              className={goal.progress >= 75 ? "text-success" : goal.progress >= 40 ? "text-warning" : "text-error"}
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-text">
                            {goal.progress}%
                          </span>
                        </div>
                      </div>

                      <Progress
                        value={goal.progress}
                        variant={goal.progress >= 75 ? "success" : goal.progress >= 40 ? "warning" : "error"}
                        size="sm"
                      />

                      <div className="flex items-center justify-between mt-3 text-xs text-text-tertiary">
                        <span className="flex items-center gap-1">
                          <HiOutlineCalendar size={14} />
                          {goal.targetDate.toLocaleDateString("ar-EG")}
                        </span>
                        <span className={`flex items-center gap-1 font-medium ${
                          daysLeft === "انتهى" ? "text-error" : isAtRisk ? "text-warning" : "text-text-tertiary"
                        }`}>
                          <HiOutlineClock size={14} />
                          {daysLeft === "انتهى" ? "انتهى" : `متبقي ${daysLeft}`}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <EmptyState
            icon={HiOutlineTag}
            title="لا توجد أهداف"
            description="لم تقم بإضافة أي أهداف بعد. ابدأ بإضافة هدفك الأول."
            action={<Button leftIcon={<HiOutlinePlusCircle size={16} />} onClick={() => setShowAddModal(true)}>إضافة هدف</Button>}
          />
        )}
      </div>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="إضافة هدف جديد">
        <div className="space-y-4">
          <Input
            label="عنوان الهدف"
            placeholder="أدخل عنوان الهدف"
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          />
          <Input
            label="الوصف"
            placeholder="وصف مختصر للهدف"
            value={newGoal.description}
            onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
          />
          <Select
            label="التصنيف"
            value={newGoal.category}
            options={[
              { value: "course", label: "كورس" },
              { value: "exam", label: "امتحان" },
              { value: "homework", label: "واجبات" },
              { value: "reading", label: "قراءة" },
              { value: "academic", label: "أكاديمي" },
            ]}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewGoal({ ...newGoal, category: e.target.value })}
          />
          <Input
            label="تاريخ الاستهداف"
            type="date"
            value={newGoal.targetDate}
            onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
          />
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" onClick={() => setShowAddModal(false)}>إلغاء</Button>
            <Button onClick={addGoal}>حفظ الهدف</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!selectedGoal} onClose={() => { setSelectedGoal(null); setEditingProgress(null) }} title="تفاصيل الهدف" size="md">
        {selectedGoal && (
          <div className="space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-text">{selectedGoal.title}</h3>
                  <Badge variant={categoryColors[selectedGoal.category]}>{categoryLabels[selectedGoal.category]}</Badge>
                  <Badge variant={selectedGoal.status === "completed" ? "success" : "primary"}>
                    {statusLabels[selectedGoal.status]}
                  </Badge>
                </div>
                <p className="text-sm text-text-secondary">{selectedGoal.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-4 bg-surface-secondary rounded-xl">
              <div className="relative w-20 h-20 shrink-0">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="3" className="text-surface-tertiary" />
                  <circle
                    cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="3"
                    strokeDasharray={`${(selectedGoal.progress / 100) * 97.4} 97.4`}
                    strokeLinecap="round"
                    className={selectedGoal.progress >= 75 ? "text-success" : selectedGoal.progress >= 40 ? "text-warning" : "text-error"}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-text">{selectedGoal.progress}%</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-text-tertiary">تاريخ الاستهداف:</span>
                  <span className="text-text font-medium">{selectedGoal.targetDate.toLocaleDateString("ar-EG")}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-text-tertiary">المتبقي:</span>
                  <span className="text-text font-medium">{getCountdown(selectedGoal.targetDate)}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-text-tertiary">الحالة:</span>
                  <Badge variant={selectedGoal.status === "completed" ? "success" : "primary"}>{statusLabels[selectedGoal.status]}</Badge>
                </div>
              </div>
            </div>

            {editingProgress === selectedGoal.id ? (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-text">تحديث التقدم</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0" max="100"
                    value={selectedGoal.progress}
                    onChange={(e) => setSelectedGoal({ ...selectedGoal, progress: Number(e.target.value) })}
                    className="flex-1 accent-primary"
                  />
                  <span className="text-sm font-bold text-text min-w-[3ch] text-center">{selectedGoal.progress}%</span>
                  <Input
                    type="number" min="0" max="100"
                    value={selectedGoal.progress}
                    onChange={(e) => setSelectedGoal({ ...selectedGoal, progress: Math.min(100, Math.max(0, Number(e.target.value) || 0)) })}
                    className="w-20"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="ghost" size="sm" onClick={() => setEditingProgress(null)}>إلغاء</Button>
                  <Button size="sm" onClick={() => updateProgress(selectedGoal.id, selectedGoal.progress)}>حفظ</Button>
                </div>
              </div>
            ) : (
              <Button variant="secondary"
                leftIcon={<HiOutlineTrendingUp size={16} />}
                onClick={() => setEditingProgress(selectedGoal.id)}
                className="w-full"
              >
                تحديث التقدم
              </Button>
            )}

            <div className="flex gap-3 justify-end pt-3 border-t border-border">
              {deleteConfirm === selectedGoal.id ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-text-secondary">تأكيد الحذف؟</span>
                  <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(null)}>إلغاء</Button>
                  <Button variant="danger" size="sm" onClick={() => deleteGoal(selectedGoal.id)}>حذف</Button>
                </div>
              ) : (
                <Button variant="danger" size="sm"
                  leftIcon={<HiOutlineTrash size={16} />}
                  onClick={() => setDeleteConfirm(selectedGoal.id)}
                >
                  حذف الهدف
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineClipboardCheck, HiOutlineCalendar, HiOutlineStar, HiOutlineClock,
  HiOutlineAcademicCap, HiOutlineBookOpen, HiOutlinePencil, HiOutlineEye,
  HiOutlinePlusCircle, HiOutlineChevronDown, HiOutlineTrash,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Button from "@/components/ui/Button"
import { EmptyState } from "@/components/ui/EmptyState"
import { mockCourses, mockHomework, mockExams } from "@/lib/mock/data"

const mockDailyTasks = Array.from({ length: 12 }, (_, i) => ({
  id: `task-${i + 1}`,
  title: ["مراجعة درس المبتدأ والخبر", "حل واجب النحو", "قراءة نص البلاغة", "حل تدريبات الإملاء", "مراجعة قواعد النحو", "حل اختبار الفصل", "كتابة موضوع تعبير", "قراءة نصوص الأدب", "حل تمارين الصرف", "مراجعة الامتحان", "تلخيص الدرس", "حل واجب البلاغة"][i],
  course: ["النحو والصرف", "البلاغة والأدب", "النصوص الأدبية", "الإملاء والخط", "النحو والصرف", "النصوص الأدبية", "التعبير", "الأدب", "النحو والصرف", "النحو والصرف", "البلاغة والأدب", "البلاغة والأدب"][i],
  dueDate: new Date(2026, 6, 15 + (i % 14)),
  priority: (["high", "medium", "low"] as const)[i % 3],
  completed: i < 5,
  type: (["study", "homework", "review", "exam"] as const)[i % 4],
}))

const weeklyGoals = [
  { id: "wg-1", title: "إنهاء 3 دروس من النحو", progress: 66, target: 3, achieved: 2 },
  { id: "wg-2", title: "حل جميع واجبات الأسبوع", progress: 75, target: 4, achieved: 3 },
  { id: "wg-3", title: "الوصول إلى 90% في اختبار الأسبوع", progress: 0, target: 90, achieved: 0 },
  { id: "wg-4", title: "مراجعة 5 نصوص أدبية", progress: 40, target: 5, achieved: 2 },
]

const timeSlots = ["8:00 - 9:00 ص", "9:00 - 10:00 ص", "10:00 - 11:00 ص", "11:00 - 12:00 م", "12:00 - 1:00 م", "1:00 - 2:00 م"]
const weekDays = ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"]

const scheduleData: Record<string, string[]> = {
  السبت: ["نحو وصرف", "بلاغة", "استراحة", "أدب", "تمارين", ""],
  الأحد: ["إملاء", "نصوص", "استراحة", "تعبير", "مراجعة", ""],
  الإثنين: ["نحو وصرف", "بلاغة", "استراحة", "أدب", "حل واجبات", ""],
  الثلاثاء: ["مراجعة نحو", "إملاء", "استراحة", "نصوص", "تمارين", ""],
  الأربعاء: ["تعبير", "بلاغة", "استراحة", "نحو", "حل اختبارات", ""],
  الخميس: ["مراجعة أسبوعية", "حل واجبات", "استراحة", "تلخيص", "تقييم", ""],
}

const priorityColors: Record<string, "error" | "warning" | "info"> = { high: "error", medium: "warning", low: "info" }
const priorityLabels: Record<string, string> = { high: "عالي", medium: "متوسط", low: "منخفض" }
const typeIcons: Record<string, React.ElementType> = { study: HiOutlineBookOpen, homework: HiOutlinePencil, review: HiOutlineEye, exam: HiOutlineAcademicCap }
const typeLabels: Record<string, string> = { study: "دراسة", homework: "واجب", review: "مراجعة", exam: "اختبار" }

export default function StudentPlannerPage() {
  const [tasks, setTasks] = useState(mockDailyTasks)
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTask, setNewTask] = useState({ title: "", course: "", priority: "medium" as const, type: "study" as const })

  const todayTasks = useMemo(() => tasks.filter((t) => {
    const today = new Date(2026, 6, 19)
    return t.dueDate.toDateString() === today.toDateString() || !t.completed
  }), [tasks])

  const toggleComplete = (id: string) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const addTask = () => {
    if (!newTask.title.trim()) return
    setTasks((prev) => [...prev, {
      id: `task-${Date.now()}`,
      title: newTask.title,
      course: newTask.course || "عام",
      dueDate: new Date(),
      priority: newTask.priority,
      completed: false,
      type: newTask.type,
    }])
    setNewTask({ title: "", course: "", priority: "medium", type: "study" })
    setShowAddTask(false)
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader
        title="المخطط الدراسي"
        subtitle={`الأسبوع الحالي: ${new Date(2026, 6, 19).toLocaleDateString("ar-EG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`}
      />
      <div className="p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-4"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <HiOutlineClipboardCheck className="text-primary" size={22} />
                  <CardTitle>المهام اليومية</CardTitle>
                </div>
                <Button size="sm" leftIcon={<HiOutlinePlusCircle size={16} />} onClick={() => setShowAddTask(true)}>
                  إضافة مهمة
                </Button>
              </CardHeader>
              <CardContent>
                {showAddTask && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    className="mb-4 p-4 bg-surface-secondary rounded-xl border border-border space-y-3"
                  >
                    <Input
                      placeholder="عنوان المهمة"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <Input
                        placeholder="المادة"
                        value={newTask.course}
                        onChange={(e) => setNewTask({ ...newTask, course: e.target.value })}
                      />
                      <Select
                        value={newTask.priority}
                        options={[
                          { value: "high", label: "عالي" },
                          { value: "medium", label: "متوسط" },
                          { value: "low", label: "منخفض" },
                        ]}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewTask({ ...newTask, priority: e.target.value })}
                      />
                      <Select
                        value={newTask.type}
                        options={[
                          { value: "study", label: "دراسة" },
                          { value: "homework", label: "واجب" },
                          { value: "review", label: "مراجعة" },
                          { value: "exam", label: "اختبار" },
                        ]}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewTask({ ...newTask, type: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" size="sm" onClick={() => setShowAddTask(false)}>إلغاء</Button>
                      <Button size="sm" onClick={addTask}>حفظ</Button>
                    </div>
                  </motion.div>
                )}
                {todayTasks.length > 0 ? (
                  <div className="space-y-2">
                    {todayTasks.map((task, i) => {
                      const TypeIcon = typeIcons[task.type]
                      return (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${
                            task.completed
                              ? "bg-success/5 border-success/20 opacity-70"
                              : "bg-surface border-border hover:shadow-sm"
                          }`}
                        >
                          <button type="button"
                            onClick={() => toggleComplete(task.id)}
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                              task.completed
                                ? "bg-success border-success text-white"
                                : "border-text-tertiary hover:border-primary"
                            }`}
                          >
                            {task.completed && <HiOutlineCheck className="w-3 h-3" />}
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className={`text-sm font-medium truncate ${task.completed ? "line-through text-text-tertiary" : "text-text"}`}>
                                {task.title}
                              </p>
                              <Badge variant={priorityColors[task.priority]} size="sm">{priorityLabels[task.priority]}</Badge>
                              <Badge variant="primary" size="sm">{task.course}</Badge>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-text-tertiary">
                              <span className="flex items-center gap-1">
                                <TypeIcon size={14} />
                                {typeLabels[task.type]}
                              </span>
                              <span className="flex items-center gap-1">
                                <HiOutlineClock size={14} />
                                {task.dueDate.toLocaleDateString("ar-EG")}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                ) : (
                  <EmptyState
                    icon={HiOutlineClipboardCheck}
                    title="لا توجد مهام"
                    description="لم يتم إضافة أي مهام بعد. أضف مهمة جديدة للبدء."
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <HiOutlineStar className="text-warning" size={22} />
                  <CardTitle>أهداف الأسبوع</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {weeklyGoals.map((goal) => (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    className="p-3 bg-surface-secondary rounded-xl border border-border"
                  >
                    <p className="text-sm font-medium text-text mb-2">{goal.title}</p>
                    <Progress
                      value={goal.progress}
                      variant={goal.progress >= 75 ? "success" : goal.progress >= 40 ? "warning" : "error"}
                      size="sm"
                      className="mb-2"
                    />
                    <div className="flex items-center justify-between text-xs text-text-tertiary">
                      <span>تم: {goal.achieved} / {goal.target}</span>
                      <span>{goal.progress}%</span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <HiOutlineCalendar className="text-info" size={22} />
                  <CardTitle>الجدول الدراسي</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr>
                        <th className="p-2 border border-border bg-surface-secondary text-text-secondary font-medium">اليوم</th>
                        {timeSlots.map((slot) => (
                          <th key={slot} className="p-2 border border-border bg-surface-secondary text-text-secondary font-medium whitespace-nowrap">{slot}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {weekDays.map((day) => (
                        <tr key={day}>
                          <td className="p-2 border border-border bg-surface-secondary text-text font-medium whitespace-nowrap">{day}</td>
                          {scheduleData[day].map((item, i) => (
                            <td key={i} className={`p-2 border border-border text-center ${
                              item === "استراحة" ? "bg-success/5 text-success" :
                              item ? "text-text" : "text-text-tertiary"
                            }`}>
                              {item || "—"}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

const HiOutlineCheck = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
)

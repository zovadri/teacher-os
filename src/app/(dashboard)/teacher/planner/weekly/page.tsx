"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import {
  HiOutlinePlus,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineAcademicCap,
  HiOutlineStar,
  HiOutlineTrash,
  HiOutlinePencil,
} from "react-icons/hi"
import toast from "react-hot-toast"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Progress } from "@/components/ui/Progress"
import { det } from "@/lib/utils"

type TaskStatus = "pending" | "in-progress" | "completed"
type TaskPriority = "high" | "medium" | "low"
type TaskType = "lesson" | "homework" | "exam" | "meeting" | "other"
type DayAr = "السبت" | "الأحد" | "الإثنين" | "الثلاثاء" | "الأربعاء" | "الخميس" | "الجمعة"

const DAYS: DayAr[] = ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"]

const TYPE_COLORS: Record<TaskType, string> = {
  lesson: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  homework: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  exam: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  meeting: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  other: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
}

const STATUS_LABELS: Record<TaskStatus, string> = { pending: "معلق", "in-progress": "قيد التنفيذ", completed: "مكتمل" }
const PRIORITY_LABELS: Record<TaskPriority, string> = { high: "عالية", medium: "متوسطة", low: "منخفضة" }
const TYPE_LABELS: Record<TaskType, string> = { lesson: "درس", homework: "واجب", exam: "اختبار", meeting: "اجتماع", other: "أخرى" }

interface Task {
  id: string
  title: string
  subject: string
  time: string
  day: DayAr
  status: TaskStatus
  priority: TaskPriority
  type: TaskType
  notes?: string
}

function getWeekDates(ref: Date): Date[] {
  const start = new Date(ref)
  start.setDate(start.getDate() - start.getDay() - 1)
  return DAYS.map((_, i) => {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    return d
  })
}

function fmt(d: Date) { return `${d.getDate()} / ${d.getMonth() + 1}` }

const INITIAL_TASKS: Task[] = [
  { id: "t01", title: "مراجعة درس الحركة", subject: "فيزياء", time: "08:00", day: "السبت", status: "completed", priority: "high", type: "lesson" },
  { id: "t02", title: "تصحيح واجب الرياضيات", subject: "رياضيات", time: "09:30", day: "السبت", status: "completed", priority: "medium", type: "homework" },
  { id: "t03", title: "تحضير مختبر الكيمياء", subject: "كيمياء", time: "11:00", day: "السبت", status: "in-progress", priority: "high", type: "lesson" },
  { id: "t04", title: "اختبار قصير أحياء", subject: "أحياء", time: "10:00", day: "الأحد", status: "in-progress", priority: "high", type: "exam" },
  { id: "t05", title: "مراجعة مشاريع الطلاب", subject: "علوم", time: "12:00", day: "الأحد", status: "pending", priority: "medium", type: "meeting" },
  { id: "t06", title: "تسليم تقييمات الأسبوع", subject: "إدارة", time: "13:00", day: "الأحد", status: "pending", priority: "high", type: "other" },
  { id: "t07", title: "درس المتجهات", subject: "رياضيات", time: "08:30", day: "الإثنين", status: "completed", priority: "high", type: "lesson" },
  { id: "t08", title: "ورقة عمل تفاعلية", subject: "فيزياء", time: "10:30", day: "الإثنين", status: "in-progress", priority: "medium", type: "homework" },
  { id: "t09", title: "اجتماع قسم العلوم", subject: "إدارة", time: "12:00", day: "الإثنين", status: "pending", priority: "low", type: "meeting" },
  { id: "t10", title: "شرح نظرية فيثاغورس", subject: "رياضيات", time: "08:00", day: "الثلاثاء", status: "completed", priority: "high", type: "lesson" },
  { id: "t11", title: "إعداد مختبر الضوء", subject: "فيزياء", time: "09:00", day: "الثلاثاء", status: "in-progress", priority: "medium", type: "lesson" },
  { id: "t12", title: "تصحيح اختبار الأحياء", subject: "أحياء", time: "13:00", day: "الثلاثاء", status: "pending", priority: "high", type: "exam" },
  { id: "t13", title: "حصة مراجعة عامة", subject: "كيمياء", time: "08:00", day: "الأربعاء", status: "completed", priority: "medium", type: "lesson" },
  { id: "t14", title: "أنشطة جماعية", subject: "علوم", time: "10:00", day: "الأربعاء", status: "in-progress", priority: "low", type: "other" },
  { id: "t15", title: "اجتماع أولياء الأمور", subject: "إدارة", time: "14:00", day: "الأربعاء", status: "pending", priority: "high", type: "meeting" },
  { id: "t16", title: "اختبار الفيزياء الشهري", subject: "فيزياء", time: "09:00", day: "الخميس", status: "pending", priority: "high", type: "exam" },
  { id: "t17", title: "حل تمارين الكتاب", subject: "رياضيات", time: "11:00", day: "الخميس", status: "pending", priority: "medium", type: "homework" },
  { id: "t18", title: "تحضير درس الأكسدة", subject: "كيمياء", time: "08:00", day: "الجمعة", status: "pending", priority: "medium", type: "lesson" },
  { id: "t19", title: "تقرير الأداء الأسبوعي", subject: "إدارة", time: "10:00", day: "الجمعة", status: "pending", priority: "low", type: "other" },
  { id: "t20", title: "جدولة الاختبارات القادمة", subject: "إدارة", time: "12:00", day: "الجمعة", status: "pending", priority: "medium", type: "meeting" },
]

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }
const itemVariants = { hidden: { y: 16, opacity: 0 }, visible: { y: 0, opacity: 1 } }

export default function WeeklyPlannerPage() {
  const [weekRef, setWeekRef] = useState(new Date())
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [form, setForm] = useState<{ title: string; day: DayAr; subject: string; priority: TaskPriority; type: TaskType; notes: string }>({
    title: "", day: "السبت", subject: "", priority: "medium", type: "lesson", notes: "",
  })

  const dates = useMemo(() => getWeekDates(weekRef), [weekRef])

  const tasksByDay = useMemo(() => {
    const map: Record<string, Task[]> = {}
    DAYS.forEach((d) => { map[d] = [] })
    tasks.forEach((t) => { map[t.day]?.push(t) })
    return map
  }, [tasks])

  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.status === "completed").length
    const inProgress = tasks.filter((t) => t.status === "in-progress").length
    const pending = tasks.filter((t) => t.status === "pending").length
    return { total, completed, inProgress, pending }
  }, [tasks])

  const progressPct = useMemo(() => (stats.total ? Math.round((stats.completed / stats.total) * 100) : 0), [stats])

  const moveWeek = useCallback((dir: number) => {
    setWeekRef((prev) => {
      const n = new Date(prev)
      n.setDate(n.getDate() + dir * 7)
      return n
    })
  }, [])

  const handleStatusChange = useCallback((id: string, status: TaskStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)))
    toast.success(`تم تغيير الحالة إلى "${STATUS_LABELS[status]}"`)
    setSelectedTask(null)
  }, [])

  const handleDayChange = useCallback((id: string, day: DayAr) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, day } : t)))
    toast.success(`تم نقل المهمة إلى ${day}`)
    setSelectedTask(null)
  }, [])

  const handleDelete = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
    toast.success("تم حذف المهمة")
    setSelectedTask(null)
  }, [])

  const handleAdd = useCallback(() => {
    if (!form.title.trim() || !form.subject.trim()) { toast.error("يرجى إدخال العنوان والمادة"); return }
    const newTask: Task = {
      id: `t${det()}`,
      title: form.title,
      subject: form.subject,
      time: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
      day: form.day,
      status: "pending",
      priority: form.priority,
      type: form.type,
      notes: form.notes || undefined,
    }
    setTasks((prev) => [...prev, newTask])
    toast.success("تمت إضافة المهمة بنجاح")
    setShowAddModal(false)
    setForm({ title: "", day: "السبت", subject: "", priority: "medium", type: "lesson", notes: "" })
  }, [form])

  const formatter = useMemo(() => new Intl.DateTimeFormat("ar-EG", { weekday: "long", day: "numeric", month: "long" }), [])

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6" dir="rtl">
      <Breadcrumb items={[{ label: "المخطط", href: "/teacher/planner/weekly" }, { label: "المخطط الأسبوعي" }]} />
      <DashboardHeader
        title="المخطط الأسبوعي"
        subtitle={formatter.format(dates[0]) + " — " + formatter.format(dates[6])}
        icon={<HiOutlineCalendar className="w-6 h-6" />}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="إجمالي المهام" value={stats.total} icon={<HiOutlineAcademicCap className="w-5 h-5" />} />
        <StatsCard title="مكتملة" value={stats.completed} icon={<HiOutlineCheckCircle className="w-5 h-5" />} />
        <StatsCard title="قيد التنفيذ" value={stats.inProgress} icon={<HiOutlineClock className="w-5 h-5" />} />
        <StatsCard title="معلقة" value={stats.pending} icon={<HiOutlineStar className="w-5 h-5" />} />
      </div>

      <Card>
        <CardContent className="py-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-medium">تقدم الأسبوع</span>
            <span className="text-sm text-muted-foreground ltr" dir="ltr">{progressPct}%</span>
          </div>
          <Progress value={progressPct} />
        </CardContent>
      </Card>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => moveWeek(-1)} className="px-3 py-1.5 text-sm rounded-lg border border-border hover:bg-accent transition-colors">
            الأسبوع السابق
          </button>
          <button type="button" onClick={() => moveWeek(1)} className="px-3 py-1.5 text-sm rounded-lg border border-border hover:bg-accent transition-colors">
            الأسبوع التالي
          </button>
        </div>
        <button type="button" onClick={() => setShowAddModal(true)} className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
          <HiOutlinePlus className="w-4 h-4" /> إضافة مهمة
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
        {DAYS.map((day, i) => (
          <motion.div key={day} variants={itemVariants}>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-center">{day}</CardTitle>
                <p className="text-xs text-center text-muted-foreground">{fmt(dates[i])}</p>
              </CardHeader>
              <CardContent className="space-y-2 min-h-[200px]">
                {tasksByDay[day].length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-4">لا توجد مهام</p>
                )}
                {tasksByDay[day].map((task) => (
                  <button type="button" key={task.id} onClick={() => setSelectedTask(task)} className="w-full text-right">
                    <div className="rounded-lg border border-border p-2.5 text-xs space-y-1 hover:bg-accent/50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-medium truncate">{task.title}</span>
                        <Badge className={TYPE_COLORS[task.type]}>{TYPE_LABELS[task.type]}</Badge>
                      </div>
                      <p className="text-muted-foreground truncate">{task.subject}</p>
                      <div className="flex items-center justify-between gap-1 text-muted-foreground">
                        <span>{task.time}</span>
                        <Badge variant="outline" className={`text-[10px] px-1.5 ${task.priority === "high" ? "border-red-400 text-red-500" : task.priority === "medium" ? "border-amber-400 text-amber-500" : "border-green-400 text-green-500"}`}>
                          {PRIORITY_LABELS[task.priority]}
                        </Badge>
                      </div>
                      <Badge variant="secondary" className={`text-[10px] ${task.status === "completed" ? "bg-green-500/10 text-green-600" : task.status === "in-progress" ? "bg-blue-500/10 text-blue-600" : "bg-slate-500/10 text-slate-600"}`}>
                        {STATUS_LABELS[task.status]}
                      </Badge>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setSelectedTask(null)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md rounded-xl bg-background border border-border p-6 space-y-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{selectedTask.title}</h3>
              <div className="flex items-center gap-1">
                <HiOutlinePencil className="w-4 h-4 text-muted-foreground" />
                <button type="button" onClick={() => handleDelete(selectedTask.id)}><HiOutlineTrash className="w-4 h-4 text-red-500" /></button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{selectedTask.subject} • {selectedTask.time}</p>
            {selectedTask.notes && <p className="text-xs text-muted-foreground">{selectedTask.notes}</p>}
            <div className="space-y-2">
              <label className="text-xs font-medium">الحالة</label>
              <div className="flex gap-2 flex-wrap">
                {(["pending", "in-progress", "completed"] as TaskStatus[]).map((s) => (
                  <button type="button" key={s} onClick={() => handleStatusChange(selectedTask.id, s)}
                    className={`px-3 py-1 text-xs rounded-lg border transition-colors ${selectedTask.status === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-accent"}`}>
                    {STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">اليوم</label>
              <div className="flex gap-1.5 flex-wrap">
                {DAYS.map((d) => (
                  <button type="button" key={d} onClick={() => handleDayChange(selectedTask.id, d)}
                    className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${selectedTask.day === d ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-accent"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setShowAddModal(false)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-lg rounded-xl bg-background border border-border p-6 space-y-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold">إضافة مهمة جديدة</h3>
            <div className="space-y-3">
              <div><label className="text-xs font-medium">العنوان</label><input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="عنوان المهمة" /></div>
              <div><label className="text-xs font-medium">المادة</label><input value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="المادة الدراسية" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-medium">اليوم</label>
                  <select value={form.day} onChange={(e) => setForm((f) => ({ ...f, day: e.target.value as DayAr }))} className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm">
                    {DAYS.map((d) => (<option key={d} value={d}>{d}</option>))}
                  </select>
                </div>
                <div><label className="text-xs font-medium">الأولوية</label>
                  <select value={form.priority} onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value as TaskPriority }))} className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm">
                    <option value="high">عالية</option><option value="medium">متوسطة</option><option value="low">منخفضة</option>
                  </select>
                </div>
              </div>
              <div><label className="text-xs font-medium">النوع</label>
                <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as TaskType }))} className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm">
                  {(["lesson", "homework", "exam", "meeting", "other"] as TaskType[]).map((t) => (<option key={t} value={t}>{TYPE_LABELS[t]}</option>))}
                </select>
              </div>
              <div><label className="text-xs font-medium">ملاحظات</label><textarea value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm resize-none" rows={2} /></div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button type="button" onClick={handleAdd} className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity">إضافة</button>
              <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm rounded-lg border border-border hover:bg-accent transition-colors">إلغاء</button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

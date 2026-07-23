"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineLockClosed,
  HiOutlinePlay,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineBookOpen,
  HiOutlineChartBar,
  HiOutlineAcademicCap,
  HiOutlineArrowRight,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"

type LessonStatus = "locked" | "unlocked" | "completed"

interface Prerequisite {
  id: number
  title: string
  grade: number
}

interface StudentLesson {
  id: number
  title: string
  description: string
  status: LessonStatus
  score: number | null
  passed: boolean | null
  prerequisites: Prerequisite[]
  duration: number
}

interface StudentCourse {
  id: number
  name: string
  grade: string
  teacher: string
  overallProgress: number
  totalLessons: number
  completedLessons: number
  estimatedHours: number
  currentLessonId: number
  lessons: StudentLesson[]
}

const courseNames = ["الكيمياء", "الفيزياء", "الرياضيات"]
const courseGrades = ["ثانية ثانوي", "أولى ثانوي", "ثالثة ثانوي"]
const courseTeachers = ["د. أحمد محمد", "د. سارة خالد", "د. عمر عبدالله"]
const courseHours = [28, 24, 20]

const lessonTitles: Record<string, string[]> = {
  الكيمياء: [
    "المادة وخواصها",
    "الذرة والجزيئات",
    "الجدول الدوري",
    "الروابط الكيميائية",
    "المحاليل والأحماض",
    "التفاعلات الكيميائية",
    "الكيمياء العضوية",
    "الكيمياء الحرارية",
  ],
  الفيزياء: [
    "القياس والوحدات",
    "الحركة الخطية",
    "القوى والحركة",
    "الطاقة والشغل",
    "الموجات والصوت",
    "الضوء والبصريات",
    "الكهرباء الساكنة",
  ],
  الرياضيات: [
    "الأساسيات والمصفوفات",
    "المعادلات الخطية",
    "الدوال والمتباينات",
    "الهندسة التحليلية",
    "التفاضل والتكامل",
    "الإحصاء والاحتمالات",
  ],
}

const lessonDescs: Record<string, string[]> = {
  الكيمياء: [
    "مقدمة في المادة وخصائصها الفيزيائية والكيميائية",
    "تركيب الذرة والجزيئات والروابط الأساسية",
    "ترتيب العناصر في الجدول الدوري ومجموعاته",
    "أنواع الروابط الكيميائية وخواصها",
    "المحاليل والأحماض والقواعد وتفاعلاتها",
    "أنواع التفاعلات الكيميائية ومعادلاتها",
    "مبادئ الكيمياء العضوية والمركبات الهيدروكربونية",
    "المفاهيم الأساسية للكيمياء الحرارية والطاقة",
  ],
  الفيزياء: [
    "المفاهيم الأساسية للقياس والنظام الدولي للوحدات",
    "قوانين الحركة في خط مستقيم والسرعة والتسارع",
    "قوانين نيوتن والقوى وتأثيرها على الحركة",
    "الطاقة الميكانيكية والشغل والقدرة",
    "خصائص الموجات الميكانيكية والصوتية",
    "الضوء وخصائصه والبصريات الهندسية",
    "الكهرباء الساكنة والشحنات والمجال الكهربائي",
  ],
  الرياضيات: [
    "المصفوفات والعمليات الجبرية عليها",
    "حل المعادلات الخطية بيانياً وجبرياً",
    "الدوال الجبرية والمتباينات من الدرجة الأولى",
    "الهندسة التحليلية والمعادلات في المستوى",
    "مبادئ التفاضل والتكامل والنهايات",
    "تحليل البيانات والإحصاء والاحتمالات",
  ],
}

const lessonDurations: Record<string, number[]> = {
  الكيمياء: [45, 50, 40, 55, 45, 60, 50, 45],
  الفيزياء: [40, 45, 55, 40, 50, 45, 55],
  الرياضيات: [50, 45, 55, 60, 50, 45],
}

const lessonStatuses: Record<string, LessonStatus[]> = {
  الكيمياء: ["completed", "completed", "unlocked", "locked", "locked", "locked", "locked", "locked"],
  الفيزياء: ["completed", "unlocked", "locked", "locked", "locked", "locked", "locked"],
  الرياضيات: ["completed", "completed", "completed", "unlocked", "locked", "locked"],
}

const lessonScores: Record<string, (number | null)[]> = {
  الكيمياء: [92, 88, null, null, null, null, null, null],
  الفيزياء: [85, null, null, null, null, null, null],
  الرياضيات: [95, 90, 87, null, null, null],
}

const lessonPassed: Record<string, (boolean | null)[]> = {
  الكيمياء: [true, true, null, null, null, null, null, null],
  الفيزياء: [true, null, null, null, null, null, null],
  الرياضيات: [true, true, true, null, null, null],
}

const prereqConfig: Record<string, [number, number][]> = {
  الكيمياء: [[2, 1], [3, 1], [4, 3], [5, 3], [6, 4], [6, 5], [7, 5]],
  الفيزياء: [[1, 0], [2, 1], [3, 2], [4, 3], [5, 4], [6, 5]],
  الرياضيات: [[3, 2], [4, 3], [5, 4]],
}

const prereqGrades: Record<string, number[]> = {
  الكيمياء: [0, 0, 65, 65, 70, 70, 75, 75],
  الفيزياء: [0, 55, 60, 65, 70, 65, 70],
  الرياضيات: [0, 0, 0, 70, 75, 70],
}

function buildCourse(index: number): StudentCourse {
  const name = courseNames[index]
  const titles = lessonTitles[name]
  const descs = lessonDescs[name]
  const durations = lessonDurations[name]
  const statuses = lessonStatuses[name]
  const scores = lessonScores[name]
  const passed = lessonPassed[name]
  const prereqs = prereqConfig[name]
  const pGrades = prereqGrades[name]

  const lessons: StudentLesson[] = titles.map((title, i) => {
    const prereqList: Prerequisite[] = prereqs
      .filter(([child]) => child === i)
      .map(([_, parent]) => ({
        id: parent,
        title: titles[parent],
        grade: pGrades[i],
      }))

    return {
      id: i,
      title,
      description: descs[i],
      status: statuses[i],
      score: scores[i],
      passed: passed[i],
      prerequisites: prereqList,
      duration: durations[i],
    }
  })

  const completedCount = lessons.filter((l) => l.status === "completed").length
  const overallProgress = Math.round((completedCount / lessons.length) * 100)
  const currentLessonId = lessons.find((l) => l.status === "unlocked")?.id ?? lessons.length - 1

  return {
    id: index,
    name,
    grade: courseGrades[index],
    teacher: courseTeachers[index],
    overallProgress,
    totalLessons: lessons.length,
    completedLessons: completedCount,
    estimatedHours: courseHours[index],
    currentLessonId,
    lessons,
  }
}

const allCourses: StudentCourse[] = courseNames.map((_, i) => buildCourse(i))

function computeDepth(course: StudentCourse, lessonId: number, cache: Map<number, number>): number {
  const cached = cache.get(lessonId)
  if (cached !== undefined) return cached
  const lesson = course.lessons.find((l) => l.id === lessonId)
  if (!lesson || lesson.prerequisites.length === 0) {
    cache.set(lessonId, 0)
    return 0
  }
  const maxPrereqDepth = Math.max(...lesson.prerequisites.map((p) => computeDepth(course, p.id, cache)))
  const depth = maxPrereqDepth + 1
  cache.set(lessonId, depth)
  return depth
}

const statusIcon: Record<LessonStatus, typeof HiOutlineLockClosed> = {
  locked: HiOutlineLockClosed,
  unlocked: HiOutlinePlay,
  completed: HiOutlineCheckCircle,
}

const statusColors: Record<LessonStatus, string> = {
  locked: "border-border bg-surface-tertiary",
  unlocked: "border-primary/30 bg-primary/5",
  completed: "border-success/30 bg-success/5",
}

const statusIconColors: Record<LessonStatus, string> = {
  locked: "text-text-tertiary",
  unlocked: "text-primary",
  completed: "text-success",
}

const statusLabels: Record<LessonStatus, string> = {
  locked: "مغلقة",
  unlocked: "متاحة",
  completed: "مكتملة",
}

export default function StudentLearningPathPage() {
  const [selectedCourseIdx, setSelectedCourseIdx] = useState(0)
  const course = allCourses[selectedCourseIdx]

  const depthCache = useMemo(() => new Map<number, number>(), [course])
  useMemo(() => {
    depthCache.clear()
    course.lessons.forEach((l) => computeDepth(course, l.id, depthCache))
  }, [course, depthCache])

  const groupedByDepth = useMemo(() => {
    const cache = new Map<number, number>()
    const groups = new Map<number, StudentLesson[]>()
    course.lessons.forEach((l) => {
      const d = computeDepth(course, l.id, cache)
      const existing = groups.get(d) || []
      existing.push(l)
      groups.set(d, existing)
    })
    return groups
  }, [course])

  const maxDepth = useMemo(() => Math.max(0, ...Array.from(groupedByDepth.keys())), [groupedByDepth])

  const completedMinutes = course.lessons
    .filter((l) => l.status === "completed")
    .reduce((sum, l) => sum + l.duration, 0)
  const remainingMinutes = course.lessons
    .filter((l) => l.status !== "completed")
    .reduce((sum, l) => sum + l.duration, 0)

  const estimatedRemainingHours = Math.floor(remainingMinutes / 60)
  const estimatedRemainingMins = remainingMinutes % 60

  return (
    <div className="min-h-screen bg-surface-secondary">
      <DashboardHeader
        title="مسار التعلم"
        subtitle="تابع تقدمك في مسار التعلم الخاص بك"
      />

      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-border/60 rounded-2xl p-6 md:p-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl font-bold text-text">{course.name}</h2>
              <p className="text-sm text-text-secondary">{course.grade} - {course.teacher}</p>
            </div>
            <select
              value={selectedCourseIdx}
              onChange={(e) => setSelectedCourseIdx(Number(e.target.value))}
              className="px-4 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
            >
              {allCourses.map((c, i) => (
                <option key={c.id} value={i}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 bg-surface-secondary rounded-xl">
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-text-secondary">التقدم العام</span>
                <span className="font-bold text-primary">{course.overallProgress}%</span>
              </div>
              <div className="h-3 rounded-full bg-surface-tertiary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${course.overallProgress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-l from-primary to-primary-light"
                />
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-text-secondary">
                <HiOutlineBookOpen size={18} className="text-primary" />
                <span>{course.completedLessons}/{course.totalLessons} درس</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <HiOutlineClock size={18} className="text-warning" />
                <span>المتبقي: {estimatedRemainingHours > 0 ? `${estimatedRemainingHours}س ` : ""}{estimatedRemainingMins}د</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-border/60 rounded-2xl p-6 md:p-8 overflow-x-auto"
        >
          <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
            <HiOutlineAcademicCap size={20} className="text-primary" />
            شجرة الدروس
          </h3>

          <div className="min-w-[600px]">
            <div className="flex items-start justify-center gap-6" dir="ltr">
              {Array.from({ length: maxDepth + 1 }, (_, depth) => {
                const columnLessons = groupedByDepth.get(depth) || []
                return (
                  <div key={depth} className="flex flex-col items-center gap-4 flex-1 min-w-0">
                    {depth === 0 && (
                      <div className="text-xs text-text-tertiary mb-1 font-medium">أساسي</div>
                    )}
                    {depth > 0 && (
                      <div className="text-xs text-text-tertiary mb-1 font-medium">مستوى {depth + 1}</div>
                    )}
                    {columnLessons.length === 0 && (
                      <div className="text-xs text-text-tertiary py-4">—</div>
                    )}
                    {columnLessons.map((lesson) => {
                      const isCurrent = lesson.id === course.currentLessonId
                      const Icon = statusIcon[lesson.status]
                      const iconColor = statusIconColors[lesson.status]
                      const borderColor = statusColors[lesson.status]

                      return (
                        <div
                          key={lesson.id}
                          className={`relative w-full max-w-[240px] rounded-xl border-2 p-3.5 transition-all ${
                            isCurrent ? "border-primary shadow-md shadow-primary/10" : borderColor
                          } ${isCurrent ? "bg-primary/5" : ""}`}
                        >
                          {depth > 0 && (
                            <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 flex items-center justify-center">
                              <HiOutlineArrowRight size={14} className="text-border rotate-180" />
                            </div>
                          )}

                          {isCurrent && (
                            <div className="absolute -top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold">
                              الحالي
                            </div>
                          )}

                          <div className={`flex items-center justify-between mb-2 ${lesson.status === "locked" ? "opacity-60" : ""}`}>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                              lesson.status === "completed" ? "bg-success/10 text-success" :
                              lesson.status === "unlocked" ? "bg-primary/10 text-primary" :
                              "bg-surface-tertiary text-text-tertiary"
                            }`}>
                              <Icon size={12} />
                              {statusLabels[lesson.status]}
                            </span>

                            {lesson.status === "completed" && lesson.score !== null && (
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                lesson.passed ? "bg-success/10 text-success" : "bg-error/10 text-error"
                              }`}>
                                {lesson.score}%
                              </span>
                            )}
                          </div>

                          <h4 className={`text-sm font-semibold mb-1 leading-tight ${
                            lesson.status === "locked" ? "text-text-tertiary" : "text-text"
                          }`}>
                            {lesson.title}
                          </h4>

                          <p className={`text-xs mb-2 line-clamp-2 ${
                            lesson.status === "locked" ? "text-text-tertiary/60" : "text-text-tertiary"
                          }`}>
                            {lesson.description}
                          </p>

                          <div className="flex items-center gap-1.5 text-xs text-text-tertiary mb-1.5">
                            <HiOutlineClock size={13} />
                            <span>{lesson.duration} دقيقة</span>
                          </div>

                          {lesson.status === "locked" && lesson.prerequisites.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-border">
                              <p className="text-xs text-error mb-1 font-medium">
                                يتطلب إكمال:
                              </p>
                              {lesson.prerequisites.map((pr) => (
                                <div key={pr.id} className="flex items-start gap-1 text-[11px] text-text-tertiary mb-0.5">
                                  <HiOutlineLockClosed size={10} className="mt-0.5 shrink-0 text-error" />
                                  <span>
                                    {pr.title} بنسبة {pr.grade}%
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {lesson.status === "unlocked" && (
                            <button
                              type="button"
                              className="mt-2 w-full flex items-center justify-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary-dark transition-colors"
                            >
                              <HiOutlinePlay size={14} />
                              <span>مشاهدة الدرس</span>
                            </button>
                          )}

                          {lesson.status === "completed" && (
                            <div className="mt-2 flex items-center gap-1.5 text-xs text-success font-medium">
                              <HiOutlineCheckCircle size={14} />
                              <span>{lesson.passed ? "تم الاجتياز بنجاح" : "لم يتم الاجتياز"}</span>
                            </div>
                          )}

                          {lesson.status === "locked" && lesson.prerequisites.length === 0 && (
                            <div className="mt-2 flex items-center gap-1.5 text-xs text-text-tertiary">
                              <HiOutlineLockClosed size={13} />
                              <span>غير متاحة بعد</span>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-border/60 rounded-2xl p-6 md:p-8"
        >
          <h3 className="text-lg font-bold text-text mb-3 flex items-center gap-2">
            <HiOutlineChartBar size={20} className="text-primary" />
            ملخص التقدم
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "الدروس المكتملة", value: `${course.completedLessons}`, icon: HiOutlineCheckCircle, color: "text-success" },
              { label: "الدروس المتبقية", value: `${course.totalLessons - course.completedLessons}`, icon: HiOutlineBookOpen, color: "text-primary" },
              { label: "الوقت المستغرق", value: `${Math.floor(completedMinutes / 60)}س ${completedMinutes % 60}د`, icon: HiOutlineClock, color: "text-info" },
              { label: "الوقت المتبقي", value: `${estimatedRemainingHours}س ${estimatedRemainingMins}د`, icon: HiOutlineChartBar, color: "text-warning" },
            ].map((item, i) => (
              <div key={item.label} className="p-3 bg-surface-secondary rounded-xl">
                <item.icon size={18} className={`${item.color} mb-1`} />
                <p className="text-xs text-text-tertiary">{item.label}</p>
                <p className={`text-sm font-bold mt-0.5 ${item.color}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

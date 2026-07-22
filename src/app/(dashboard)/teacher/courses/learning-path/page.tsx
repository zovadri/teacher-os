"use client"

import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlinePlus,
  HiOutlineX,
  HiOutlineTrash,
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineLink,
  HiOutlineAdjustments,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineArrowRight,
} from "react-icons/hi"
import toast from "react-hot-toast"
import { PageHeader } from "@/components/ui/PageHeader"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

type LessonStatus = "locked" | "available" | "completed"

interface Lesson {
  id: number
  title: string
  description: string
  status: LessonStatus
  passingGrade: number
  resourcesCount: number
  prerequisites: number[]
  hasQuiz: boolean
  hasHomework: boolean
}

interface CourseData {
  id: number
  name: string
  lessons: Lesson[]
}

interface Student {
  id: number
  name: string
  avatar: string
  progress: number
  currentLesson: string
}

const courseNames = ["الكيمياء", "الفيزياء", "الرياضيات"]

const lessonTitlesByCourse: Record<string, string[]> = {
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

const descriptionsByCourse: Record<string, string[]> = {
  الكيمياء: [
    "دراسة المادة وتركيبها وخصائصها المختلفة",
    "تعلم بنية الذرة وتكوين الجزيئات",
    "استكشاف ترتيب العناصر في الجدول الدوري",
    "فهم أنواع الروابط بين الذرات",
    "دراسة المحاليل والأحماض والقواعد",
    "أنواع التفاعلات الكيميائية وكيفية حدوثها",
    "مقدمة في الكيمياء العضوية والمركبات",
    "المفاهيم الأساسية للكيمياء الحرارية",
  ],
  الفيزياء: [
    "المفاهيم الأساسية للقياس والوحدات الفيزيائية",
    "دراسة الحركة في خط مستقيم",
    "قوانين نيوتن للحركة وتطبيقاتها",
    "مفهوم الطاقة وأنواعها والشغل",
    "الموجات الميكانيكية والصوتية",
    "خصائص الضوء والبصريات الهندسية",
    "الكهرباء الساكنة والشحنات الكهربائية",
  ],
  الرياضيات: [
    "المصفوفات والعمليات عليها",
    "حل المعادلات الخطية بيانياً وجبرياً",
    "الدوال الجبرية والمتباينات",
    "الهندسة في المستوى الإحداثي",
    "مبادئ التفاضل والتكامل",
    "تحليل البيانات والاحتمالات",
  ],
}

const lessonResources: Record<string, number[]> = {
  الكيمياء: [3, 4, 2, 5, 3, 6, 4, 3],
  الفيزياء: [4, 3, 5, 2, 4, 3, 5],
  الرياضيات: [3, 4, 3, 5, 4, 3],
}

const lessonGrades: Record<string, number[]> = {
  الكيمياء: [60, 65, 70, 75, 70, 80, 75, 70],
  الفيزياء: [55, 60, 70, 65, 75, 70, 65],
  الرياضيات: [50, 65, 70, 75, 80, 70],
}

const studentNames = [
  "أحمد محمد علي",
  "سارة خالد حسن",
  "عمر عبدالله أحمد",
  "مريم يوسف محمود",
  "خالد إبراهيم محمد",
  "نورة سعد عبدالرحمن",
  "فيصل تركي العنزي",
  "لينا فهد المطيري",
  "ماجد عبدالعزيز الشمري",
  "هديل ناصر الدوسري",
]

const currentLessons: Record<string, string[]> = {
  الكيمياء: [
    "الجدول الدوري",
    "الروابط الكيميائية",
    "المحاليل والأحماض",
    "التفاعلات الكيميائية",
    "الجدول الدوري",
    "الروابط الكيميائية",
    "المادة وخواصها",
    "الذرة والجزيئات",
    "التفاعلات الكيميائية",
    "المحاليل والأحماض",
  ],
  الفيزياء: [
    "الحركة الخطية",
    "القوى والحركة",
    "الطاقة والشغل",
    "الموجات والصوت",
    "القوى والحركة",
    "الحركة الخطية",
    "القياس والوحدات",
    "الضوء والبصريات",
    "الطاقة والشغل",
    "الموجات والصوت",
  ],
  الرياضيات: [
    "المعادلات الخطية",
    "الدوال والمتباينات",
    "الهندسة التحليلية",
    "التفاضل والتكامل",
    "المعادلات الخطية",
    "الدوال والمتباينات",
    "الهندسة التحليلية",
    "المعادلات الخطية",
    "التفاضل والتكامل",
    "الدوال والمتباينات",
  ],
}

const statuses: LessonStatus[] = ["available", "available", "locked", "locked", "locked", "locked", "locked", "locked"]

function buildCourse(courseName: string): CourseData {
  const titles = lessonTitlesByCourse[courseName]
  const descs = descriptionsByCourse[courseName]
  const resources = lessonResources[courseName]
  const grades = lessonGrades[courseName]
  const count = titles.length

  const lessons: Lesson[] = titles.map((title, i) => {
    const prerequisites: number[] = []
    if (i === 2 || i === 3) prerequisites.push(1)
    if (i === 4) prerequisites.push(3)
    if (i === 5) prerequisites.push(3)
    if (i === 6) prerequisites.push(4, 5)
    if (i === 7) prerequisites.push(5)
    return {
      id: i,
      title,
      description: descs[i],
      status: statuses[i < statuses.length ? i : i % statuses.length],
      passingGrade: grades[i],
      resourcesCount: resources[i],
      prerequisites,
      hasQuiz: i % 2 === 0,
      hasHomework: i % 3 === 0,
    }
  })

  return { id: courseNames.indexOf(courseName), name: courseName, lessons }
}

const coursesData: CourseData[] = courseNames.map(buildCourse)

const studentsData: Record<string, Student[]> = {}
courseNames.forEach((name) => {
  const cls = currentLessons[name]
  studentsData[name] = studentNames.map((s, i) => ({
    id: i,
    name: s,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i + name.length}`,
    progress: (i * 8 + 15) % 100,
    currentLesson: cls[i],
  }))
})

function computeDepth(lessons: Lesson[], lessonId: number, cache: Map<number, number>): number {
  const cached = cache.get(lessonId)
  if (cached !== undefined) return cached
  const lesson = lessons.find((l) => l.id === lessonId)
  if (!lesson || lesson.prerequisites.length === 0) {
    cache.set(lessonId, 0)
    return 0
  }
  const maxPrereqDepth = Math.max(...lesson.prerequisites.map((p) => computeDepth(lessons, p, cache)))
  const depth = maxPrereqDepth + 1
  cache.set(lessonId, depth)
  return depth
}

function buildAdjacencyList(lessons: Lesson[]): Map<number, number[]> {
  const adj = new Map<number, number[]>()
  lessons.forEach((l) => adj.set(l.id, []))
  lessons.forEach((l) => {
    l.prerequisites.forEach((p) => {
      const existing = adj.get(p) || []
      existing.push(l.id)
      adj.set(p, existing)
    })
  })
  return adj
}

const statusColors: Record<LessonStatus, string> = {
  locked: "text-text-tertiary",
  available: "text-success",
  completed: "text-primary",
}

const statusBgColors: Record<LessonStatus, string> = {
  locked: "bg-surface-tertiary border-border",
  available: "bg-success/5 border-success/20",
  completed: "bg-primary/5 border-primary/20",
}

const statusBadgeStyles: Record<LessonStatus, string> = {
  locked: "bg-surface-tertiary text-text-tertiary",
  available: "bg-success/10 text-success",
  completed: "bg-primary/10 text-primary",
}

const statusLabels: Record<LessonStatus, string> = {
  locked: "مغلقة",
  available: "متاحة",
  completed: "مكتملة",
}

export default function TeacherLearningPathPage() {
  const [selectedCourseIdx, setSelectedCourseIdx] = useState(0)
  const [lessons, setLessons] = useState<Lesson[]>(coursesData[0].lessons)
  const [showAddModal, setShowAddModal] = useState(false)
  const [publishLoading, setPublishLoading] = useState(false)
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  const [newLessonName, setNewLessonName] = useState("")
  const [newLessonDesc, setNewLessonDesc] = useState("")
  const [newLessonGrade, setNewLessonGrade] = useState(70)
  const [newLessonPrereqs, setNewLessonPrereqs] = useState<number[]>([])
  const [newLessonQuiz, setNewLessonQuiz] = useState(false)
  const [newLessonHomework, setNewLessonHomework] = useState(false)

  const courseName = courseNames[selectedCourseIdx]

  const handleCourseChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const idx = Number(e.target.value)
    setSelectedCourseIdx(idx)
    setLessons(coursesData[idx].lessons)
    setShowAddModal(false)
    resetForm()
  }, [])

  const resetForm = useCallback(() => {
    setNewLessonName("")
    setNewLessonDesc("")
    setNewLessonGrade(70)
    setNewLessonPrereqs([])
    setNewLessonQuiz(false)
    setNewLessonHomework(false)
  }, [])

  const depthCache = useMemo(() => new Map<number, number>(), [lessons])
  useMemo(() => {
    depthCache.clear()
    lessons.forEach((l) => computeDepth(lessons, l.id, depthCache))
  }, [lessons, depthCache])

  const groupedByDepth = useMemo(() => {
    const cache = new Map<number, number>()
    const groups = new Map<number, Lesson[]>()
    lessons.forEach((l) => {
      const d = computeDepth(lessons, l.id, cache)
      const existing = groups.get(d) || []
      existing.push(l)
      groups.set(d, existing)
    })
    return groups
  }, [lessons])

  const adjList = useMemo(() => buildAdjacencyList(lessons), [lessons])

  const maxDepth = useMemo(() => Math.max(0, ...Array.from(groupedByDepth.keys())), [groupedByDepth])

  const handleAddLesson = useCallback(() => {
    if (!newLessonName.trim()) {
      toast.error("يرجى إدخال اسم الدرس")
      return
    }
    const newId = lessons.length
    const newLesson: Lesson = {
      id: newId,
      title: newLessonName.trim(),
      description: newLessonDesc.trim(),
      status: "locked",
      passingGrade: newLessonGrade,
      resourcesCount: 0,
      prerequisites: newLessonPrereqs,
      hasQuiz: newLessonQuiz,
      hasHomework: newLessonHomework,
    }
    setLessons((prev) => [...prev, newLesson])
    toast.success("تمت إضافة الدرس بنجاح")
    setShowAddModal(false)
    resetForm()
  }, [newLessonName, newLessonDesc, newLessonGrade, newLessonPrereqs, newLessonQuiz, newLessonHomework, lessons.length, resetForm])

  const handleRemoveLesson = useCallback((id: number) => {
    setLessons((prev) => {
      const updated = prev.filter((l) => l.id !== id)
      return updated.map((l, i) => ({
        ...l,
        id: i,
        prerequisites: l.prerequisites.filter((p) => p !== id).map((p) => (p > id ? p - 1 : p)),
      }))
    })
    toast.success("تم حذف الدرس")
  }, [])

  const handleDragStart = useCallback((index: number) => {
    setDragIndex(index)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (dragIndex === null || dragIndex === index) return
    setLessons((prev) => {
      const updated = [...prev]
      const [moved] = updated.splice(dragIndex, 1)
      updated.splice(index, 0, moved)
      return updated.map((l, i) => ({ ...l, id: i }))
    })
    setDragIndex(index)
  }, [dragIndex])

  const handleDragEnd = useCallback(() => {
    setDragIndex(null)
  }, [])

  const handlePublish = useCallback(() => {
    setPublishLoading(true)
    setTimeout(() => {
      setPublishLoading(false)
      toast.success("تم نشر المسار بنجاح")
    }, 1500)
  }, [])

  const togglePrereq = useCallback((id: number) => {
    setNewLessonPrereqs((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }, [])

  const students = studentsData[courseName] || []

  return (
    <div className="min-h-screen">
      <Breadcrumb items={[{ label: "الكورسات", href: "/teacher/courses" }, { label: "مسار التعلم" }]} />
      <PageHeader title="مسارات التعلم" description="إنشاء وإدارة مسارات التعلم المتسلسلة للدروس" />

      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <label htmlFor="course-select" className="text-sm font-medium text-text-secondary">
              اختر المادة:
            </label>
            <select
              id="course-select"
              value={selectedCourseIdx}
              onChange={handleCourseChange}
              className="px-4 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer min-w-[160px]"
            >
              {courseNames.map((name, i) => (
                <option key={name} value={i}>{name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors shadow-sm"
            >
              <HiOutlinePlus size={18} />
              <span>إضافة درس</span>
            </button>
            <button
              type="button"
              onClick={handlePublish}
              disabled={publishLoading}
              className="flex items-center gap-2 px-4 py-2 bg-success text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50"
            >
              <HiOutlineCheckCircle size={18} />
              <span>{publishLoading ? "جاري النشر..." : "نشر المسار"}</span>
            </button>
          </div>
        </motion.div>

        <div className="bg-surface border border-border rounded-2xl p-4 md:p-6 overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="flex items-start justify-center gap-6" dir="ltr">
              {Array.from({ length: maxDepth + 1 }, (_, depth) => {
                const columnLessons = groupedByDepth.get(depth) || []
                return (
                  <div key={depth} className="flex flex-col items-center gap-4 flex-1 min-w-0">
                    {depth > 0 && (
                      <div className="text-xs text-text-tertiary mb-1 font-medium">
                        المستوى {depth + 1}
                      </div>
                    )}
                    {depth === 0 && (
                      <div className="text-xs text-text-tertiary mb-1 font-medium">
                        المستوى الأساسي
                      </div>
                    )}
                    {columnLessons.length === 0 && (
                      <div className="text-xs text-text-tertiary py-4">—</div>
                    )}
                    {columnLessons.map((lesson, colIdx) => {
                      const lessonGlobalIndex = lessons.findIndex((l) => l.id === lesson.id)
                      return (
                        <div
                          key={lesson.id}
                          draggable
                          onDragStart={() => handleDragStart(lessonGlobalIndex)}
                          onDragOver={(e) => handleDragOver(e, lessonGlobalIndex)}
                          onDragEnd={handleDragEnd}
                          className={`relative w-full max-w-[220px] cursor-grab active:cursor-grabbing rounded-xl border-2 p-3 transition-all ${
                            dragIndex === lessonGlobalIndex
                              ? "opacity-50 border-primary shadow-md"
                              : statusBgColors[lesson.status]
                          }`}
                        >
                          {depth > 0 && (
                            <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 flex items-center justify-center">
                              <HiOutlineArrowRight size={14} className="text-border rotate-180" />
                            </div>
                          )}

                          <div className="flex items-start justify-between mb-2">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusBadgeStyles[lesson.status]}`}>
                              {statusLabels[lesson.status]}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveLesson(lesson.id)}
                              className="p-0.5 text-text-tertiary hover:text-error transition-colors rounded"
                              title="حذف الدرس"
                            >
                              <HiOutlineTrash size={14} />
                            </button>
                          </div>

                          <h4 className="text-sm font-semibold text-text mb-1 leading-tight">
                            {lesson.title}
                          </h4>

                          <p className="text-xs text-text-tertiary mb-2 line-clamp-2">
                            {lesson.description}
                          </p>

                          <div className="flex items-center gap-2 text-xs text-text-secondary mb-1">
                            <HiOutlineAdjustments size={14} />
                            <span>نسبة النجاح: {lesson.passingGrade}%</span>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-text-secondary">
                            <HiOutlineBookOpen size={14} />
                            <span>{lesson.resourcesCount} موارد</span>
                          </div>

                          {lesson.prerequisites.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-border">
                              <div className="flex items-center gap-1 text-xs text-text-tertiary">
                                <HiOutlineLink size={12} />
                                <span>يعتمد على: </span>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {lesson.prerequisites.map((pId) => {
                                  const prereq = lessons.find((l) => l.id === pId)
                                  return prereq ? (
                                    <span
                                      key={pId}
                                      className="text-[10px] px-1.5 py-0.5 rounded bg-surface-tertiary text-text-tertiary"
                                    >
                                      {prereq.title}
                                    </span>
                                  ) : null
                                })}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-2 mt-2 text-[10px] text-text-tertiary">
                            {lesson.hasQuiz && <span className="px-1.5 py-0.5 rounded bg-warning/10 text-warning">اختبار</span>}
                            {lesson.hasHomework && <span className="px-1.5 py-0.5 rounded bg-info/10 text-info">واجب</span>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-4 md:p-6">
          <h2 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
            <HiOutlineUserGroup size={20} className="text-primary" />
            الطلاب المسجلين
            <span className="text-sm font-normal text-text-tertiary">({students.length} طالب)</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-text-tertiary">
                  <th className="text-right py-3 px-3 font-medium">الطالب</th>
                  <th className="text-right py-3 px-3 font-medium">التقدم</th>
                  <th className="text-right py-3 px-3 font-medium">الدرس الحالي</th>
                  <th className="text-right py-3 px-3 font-medium">شريط التقدم</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, i) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-border-light hover:bg-surface-secondary transition-colors"
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-7 h-7 rounded-full bg-surface-tertiary"
                        />
                        <span className="font-medium text-text">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-primary">{student.progress}%</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-text-secondary">{student.currentLesson}</span>
                    </td>
                    <td className="py-3 px-3 min-w-[140px]">
                      <div className="h-2 rounded-full bg-surface-tertiary overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-500"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface rounded-2xl border border-border shadow-xl w-full max-w-lg p-6 space-y-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-text">إضافة درس جديد</h3>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="p-1.5 rounded-lg hover:bg-surface-tertiary text-text-tertiary transition-colors"
                >
                  <HiOutlineX size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">
                    اسم الدرس
                  </label>
                  <input
                    type="text"
                    value={newLessonName}
                    onChange={(e) => setNewLessonName(e.target.value)}
                    placeholder="أدخل اسم الدرس"
                    className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">
                    الوصف
                  </label>
                  <textarea
                    value={newLessonDesc}
                    onChange={(e) => setNewLessonDesc(e.target.value)}
                    placeholder="وصف مختصر للدرس"
                    rows={3}
                    className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">
                    درجة النجاح المطلوبة: {newLessonGrade}%
                  </label>
                  <input
                    type="range"
                    min={50}
                    max={100}
                    value={newLessonGrade}
                    onChange={(e) => setNewLessonGrade(Number(e.target.value))}
                    className="w-full h-2 rounded-full bg-surface-tertiary appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-text-tertiary mt-1">
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">
                    الدروس السابقة (اختياري)
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto p-2 border border-border rounded-xl bg-surface-secondary">
                    {lessons.map((lesson) => (
                      <label
                        key={lesson.id}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-surface cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={newLessonPrereqs.includes(lesson.id)}
                          onChange={() => togglePrereq(lesson.id)}
                          className="accent-primary w-4 h-4"
                        />
                        <span className="text-sm text-text">{lesson.title}</span>
                      </label>
                    ))}
                    {lessons.length === 0 && (
                      <p className="text-xs text-text-tertiary col-span-2 text-center py-4">
                        لا توجد دروس مضافة بعد
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newLessonQuiz}
                      onChange={(e) => setNewLessonQuiz(e.target.checked)}
                      className="accent-primary w-4 h-4"
                    />
                    <span className="text-sm text-text">اختبار</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newLessonHomework}
                      onChange={(e) => setNewLessonHomework(e.target.checked)}
                      className="accent-primary w-4 h-4"
                    />
                    <span className="text-sm text-text">واجب منزلي</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddLesson}
                  className="flex-1 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors"
                >
                  إضافة الدرس
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 border border-border text-text-secondary text-sm font-medium rounded-xl hover:bg-surface-tertiary transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

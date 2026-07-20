"use client"
import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineUsers,
  HiOutlineBookOpen,
  HiOutlineVideoCamera,
  HiOutlineClipboardList,
  HiOutlineDocumentText,
  HiOutlineStar,
  HiOutlineChevronDown,
  HiOutlinePlay,
  HiOutlineLockClosed,
  HiOutlineDuplicate,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { Tabs, TabPanel } from "@/components/ui/Tabs"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Table } from "@/components/ui/Table"
import { Modal } from "@/components/ui/Modal"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { mockCourses, mockStudents, mockExams } from "@/lib/mock/data"
import { formatCurrency, cn } from "@/lib/utils"
import { LessonStatusBadge } from "@/components/courses/LessonStatusBadge"
import { useNotificationStore } from "@/lib/notification-store"

const statusBadgeVariant: Record<string, "success" | "neutral" | "warning" | "error" | "info"> = {
  published: "success",
  draft: "neutral",
  "coming-soon": "warning",
  archived: "error",
  hidden: "info",
}

const statusLabels: Record<string, string> = {
  published: "╪╕ظخ╪╕ظب╪╖┬┤╪╕╦╪╖┬▒",
  draft: "╪╕ظخ╪╖┬│╪╕╦╪╖┬»╪╖┬ر",
  "coming-soon": "╪╕ظأ╪╖┬▒╪╕┘╣╪╖┬ذ╪╖┬د╪╕ظ╣",
  archived: "╪╕ظخ╪╖┬ج╪╖┬▒╪╖┬┤╪╕┘╛",
  hidden: "╪╕ظخ╪╖┬«╪╕┘╛╪╕┘╣",
}

type LessonStatusType = 'available' | 'locked' | 'coming-soon' | 'completed' | 'in-progress'

interface LessonStatusData {
  status: LessonStatusType
  availableDate?: string
  prerequisite?: string
}

const lessonStatusOptions: { value: LessonStatusType; label: string }[] = [
  { value: 'available', label: '╪╕ظخ╪╖┌╛╪╖┬د╪╖┬ص' },
  { value: 'locked', label: '╪╕ظخ╪╕ظأ╪╕┘╛╪╕ظئ' },
  { value: 'coming-soon', label: '╪╕ظأ╪╖┬▒╪╕┘╣╪╖┬ذ╪╖┬د╪╕ظ╣' },
  { value: 'completed', label: '╪╕ظخ╪╕╞ْ╪╖┌╛╪╕ظخ╪╕ظئ' },
  { value: 'in-progress', label: '╪╖┬ش╪╖┬د╪╖┬▒╪╕┌' },
]

export default function Content({ id }: { id: string }) {
    const course = mockCourses.find((c) => c.id === id)
  const [expandedChapters, setExpandedChapters] = useState<string[]>([])
  const [lessonStatuses, setLessonStatuses] = useState<Record<string, LessonStatusData>>({})
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false)
  const [duplicateName, setDuplicateName] = useState("")
  const [duplicating, setDuplicating] = useState(false)
  const { addToast } = useNotificationStore()

  if (!course) {
    return (
      <div className="p-4 md:p-6 text-center py-20">
        <h2 className="text-xl font-bold text-text mb-2">╪╖┬د╪╕ظئ╪╕╞ْ╪╕╦╪╖┬▒╪╖┬│ ╪╖╪ؤ╪╕┘╣╪╖┬▒ ╪╕ظخ╪╕╦╪╖┬ش╪╕╦╪╖┬»</h2>
        <p className="text-sm text-text-tertiary mb-4">╪╕ظئ╪╕ظخ ╪╕┘╣╪╖┌╛╪╕ظخ ╪╖┬د╪╕ظئ╪╖┬╣╪╖┬س╪╕╦╪╖┬▒ ╪╖┬╣╪╕ظئ╪╕ظ░ ╪╖┬د╪╕ظئ╪╕╞ْ╪╕╦╪╖┬▒╪╖┬│ ╪╖┬د╪╕ظئ╪╕ظخ╪╖┬╖╪╕ظئ╪╕╦╪╖┬ذ</p>
        <Link href="/teacher/courses">
          <Button className="px-4 py-2 text-sm text-white bg-primary rounded-xl">╪╖┬د╪╕ظئ╪╖┬╣╪╕╦╪╖┬»╪╖┬ر ╪╕ظئ╪╕ظئ╪╕╞ْ╪╕╦╪╖┬▒╪╖┬│╪╖┬د╪╖┌╛</Button>
        </Link>
      </div>
    )
  }

  const toggleChapter = (id: string) => {
    setExpandedChapters((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }

  const getLessonStatus = (lessonId: string): LessonStatusData => {
    return lessonStatuses[lessonId] || { status: 'available' }
  }

  const setLessonStatus = (lessonId: string, data: LessonStatusData) => {
    setLessonStatuses((prev) => ({ ...prev, [lessonId]: data }))
  }

  const handleDuplicate = async () => {
    setDuplicating(true)
    await new Promise((r) => setTimeout(r, 1000))
    setDuplicating(false)
    setDuplicateModalOpen(false)
    addToast({ type: 'success', title: '╪╖┌╛╪╕ظخ ╪╕ظب╪╖┬│╪╖┬« ╪╖┬د╪╕ظئ╪╕╞ْ╪╕╦╪╖┬▒╪╖┬│ ╪╖┬ذ╪╕ظب╪╖┬ش╪╖┬د╪╖┬ص', message: `╪╖┌╛╪╕ظخ ╪╖┬ح╪╕ظب╪╖┬┤╪╖┬د╪╖╪î "${duplicateName}"` })
  }

  const enrolledStudents = mockStudents.slice(0, 8)
  const courseExams = mockExams.filter((e) => e.courseId === course.id)

  const tabs = [
    { id: "chapters", label: "╪╖┬د╪╕ظئ╪╕┘╛╪╖┬╡╪╕╦╪╕ظئ ╪╕╦╪╖┬د╪╕ظئ╪╖┬»╪╖┬▒╪╕╦╪╖┬│", count: course.chapters.length },
    { id: "students", label: "╪╖┬د╪╕ظئ╪╖┬╖╪╕ظئ╪╖┬د╪╖┬ذ", count: course.studentsCount },
    { id: "exams", label: "╪╖┬د╪╕ظئ╪╖┬د╪╕ظخ╪╖┌╛╪╖┬ص╪╖┬د╪╕ظب╪╖┬د╪╖┌╛", count: courseExams.length },
    { id: "files", label: "╪╖┬د╪╕ظئ╪╕ظخ╪╕ظئ╪╕┘╛╪╖┬د╪╖┌╛", count: course.filesCount },
    { id: "settings", label: "╪╖┬د╪╕ظئ╪╖┬ح╪╖┬╣╪╖┬»╪╖┬د╪╖┬»╪╖┬د╪╖┌╛" },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "╪╖┬د╪╕ظئ╪╕╞ْ╪╕╦╪╖┬▒╪╖┬│╪╖┬د╪╖┌╛", href: "/teacher/courses" }, { label: course.title }]} />
      <DashboardHeader title={course.title} subtitle={`${course.subject} ╪ت┬╖ ${course.grade} ╪ت┬╖ ╪╖┬د╪╕ظئ╪╖┌╛╪╖┬▒╪╕ظخ ${course.term}`} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="relative h-48 rounded-xl overflow-hidden">
            <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 right-4 left-4 flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={statusBadgeVariant[course.status]}>{statusLabels[course.status]}</Badge>
                  <span className="flex items-center gap-1 text-white/80 text-xs">
                    <HiOutlineUsers size={14} />
                    {course.studentsCount} ╪╖┬╖╪╖┬د╪╕ظئ╪╖┬ذ
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => { setDuplicateName(`╪╕ظب╪╖┬│╪╖┬«╪╖┬ر ╪╕ظخ╪╕ظب ${course.title}`); setDuplicateModalOpen(true) }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs font-medium hover:bg-white/30 transition-colors"
                >
                  <HiOutlineDuplicate size={14} />
                  ╪╕ظب╪╖┬│╪╖┬« ╪╖┬د╪╕ظئ╪╕╞ْ╪╕╦╪╖┬▒╪╖┬│
                </Button>
                <Button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs font-medium hover:bg-white/30 transition-colors">
                  <HiOutlinePencil size={14} />
                  ╪╖┌╛╪╖┬╣╪╖┬»╪╕┘╣╪╕ظئ
                </Button>
                <Button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs font-medium hover:bg-white/30 transition-colors">
                  <HiOutlineTrash size={14} />
                  ╪╖┬ص╪╖┬░╪╕┘╛
                </Button>
              </div>
            </div>
          </div>

          <Card>
            <CardContent>
              <p className="text-sm text-text-secondary leading-relaxed">{course.description}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-text-secondary">
                <span className="flex items-center gap-1">
                  <HiOutlineStar size={16} className="text-warning" />
                  <span className="font-medium text-text">{course.rating}</span> ╪╖┌╛╪╕ظأ╪╕┘╣╪╕┘╣╪╕ظخ
                </span>
                <span className="flex items-center gap-1">
                  {course.discountPrice ? (
                    <><span className="font-bold text-text">{formatCurrency(course.discountPrice)}</span><span className="text-text-tertiary line-through mr-1">{formatCurrency(course.price)}</span></>
                  ) : (
                    <span className={cn("font-bold", course.isFree ? "text-success" : "text-text")}>{course.isFree ? "╪╕ظخ╪╖┬ش╪╖┬د╪╕ظب╪╕┘╣" : formatCurrency(course.price)}</span>
                  )}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-1 gap-3">
          {[
            { icon: HiOutlineUsers, title: "╪╖┬د╪╕ظئ╪╖┬╖╪╕ظئ╪╖┬د╪╖┬ذ", value: course.studentsCount, color: "primary" as const },
            { icon: HiOutlineBookOpen, title: "╪╖┬د╪╕ظئ╪╖┬»╪╖┬▒╪╕╦╪╖┬│", value: course.lessonsCount, color: "info" as const },
            { icon: HiOutlineVideoCamera, title: "╪╖┬د╪╕ظئ╪╕┘╛╪╕┘╣╪╖┬»╪╕┘╣╪╕╦╪╕ظة╪╖┬د╪╖┌╛", value: course.videosCount, color: "success" as const },
            { icon: HiOutlineClipboardList, title: "╪╖┬د╪╕ظئ╪╖┬د╪╕ظخ╪╖┌╛╪╖┬ص╪╖┬د╪╕ظب╪╖┬د╪╖┌╛", value: course.examsCount, color: "warning" as const },
            { icon: HiOutlineDocumentText, title: "╪╖┬د╪╕ظئ╪╕ظخ╪╕ظئ╪╕┘╛╪╖┬د╪╖┌╛", value: course.filesCount, color: "error" as const },
          ].map((s) => (
            <StatsCard key={s.title} title={s.title} value={s.value} icon={s.icon} color={s.color} />
          ))}
        </div>
      </div>

      <Tabs tabs={tabs} defaultTab="chapters">
        {(activeTab) => (
          <>
            <TabPanel id="chapters" activeTab={activeTab}>
              <div className="space-y-3">
                {course.chapters.length === 0 ? (
                  <div className="text-center py-10 text-text-tertiary">╪╕ظئ╪╖┬د ╪╖┌╛╪╕╦╪╖┬ش╪╖┬» ╪╕┘╛╪╖┬╡╪╕╦╪╕ظئ ╪╖┬»╪╖┬▒╪╖┬د╪╖┬│╪╕┘╣╪╖┬ر ╪╖┬ذ╪╖┬╣╪╖┬»</div>
                ) : (
                  course.chapters.map((chapter) => {
                    const isExpanded = expandedChapters.includes(chapter.id)
                    return (
                      <div key={chapter.id} className="bg-surface border border-border rounded-xl overflow-hidden">
                        <Button
                          onClick={() => toggleChapter(chapter.id)}
                          className="w-full flex items-center justify-between px-4 py-3 bg-surface-secondary hover:bg-surface-tertiary transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <HiOutlineChevronDown size={16} className={cn("text-text-tertiary transition-transform shrink-0", isExpanded && "rotate-180")} />
                            <div className="text-right">
                              <p className="text-sm font-medium text-text">{chapter.title}</p>
                              <p className="text-xs text-text-tertiary">{chapter.lessons.filter((l) => l.status === "published").length} ╪╖┬»╪╖┬▒╪╖┬│ ╪ت┬╖ {chapter.lessons.reduce((a, l) => a + l.duration, 0)} ╪╖┬»╪╕ظأ╪╕┘╣╪╕ظأ╪╖┬ر</p>
                            </div>
                          </div>
                        </Button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="divide-y divide-border/50">
                                {chapter.lessons.map((lesson) => {
                                  const ls = getLessonStatus(lesson.id)
                                  return (
                                    <div key={lesson.id} className="flex items-center justify-between px-4 py-2.5 hover:bg-surface-secondary transition-colors gap-3">
                                      <div className="flex items-center gap-3 min-w-0 flex-1">
                                        <HiOutlinePlay size={14} className={cn("shrink-0", lesson.isFree ? "text-success" : "text-text-tertiary")} />
                                        <span className="text-sm text-text truncate">{lesson.title}</span>
                                      </div>
                                      <div className="flex items-center gap-2 shrink-0">
                                        <LessonStatusBadge
                                          status={ls.status}
                                          availableDate={ls.availableDate}
                                          prerequisite={ls.prerequisite}
                                        />
                                        <select
                                          value={ls.status}
                                          onChange={(e) => setLessonStatus(lesson.id, { status: e.target.value as LessonStatusType })}
                                          className="text-xs bg-transparent border border-border rounded-md px-1.5 py-1 text-text-secondary focus:outline-none focus:ring-1 focus:ring-primary/20 cursor-pointer"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          {lessonStatusOptions.map((opt) => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                          ))}
                                        </select>
                                        <span className="text-xs text-text-tertiary">{lesson.duration} ╪╖┬»</span>
                                        {lesson.isFree && <Badge variant="success" size="sm">╪╕ظخ╪╖┬ش╪╖┬د╪╕ظب╪╕┘╣</Badge>}
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })
                )}
              </div>
            </TabPanel>

            <TabPanel id="students" activeTab={activeTab}>
              <Card>
                <Table
                  columns={[
                    { key: "name", header: "╪╖┬د╪╕ظئ╪╖┬╖╪╖┬د╪╕ظئ╪╖┬ذ", render: (s) => (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 overflow-hidden shrink-0">
                          <img src={s.avatar} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-medium text-text">{s.name}</span>
                      </div>
                    )},
                    { key: "grade", header: "╪╖┬د╪╕ظئ╪╖┬╡╪╕┘╛" },
                    { key: "phone", header: "╪╖┬د╪╕ظئ╪╕ظة╪╖┬د╪╖┌╛╪╕┘╛" },
                    { key: "subscription", header: "╪╖┬د╪╕ظئ╪╖┬د╪╖┬┤╪╖┌╛╪╖┬▒╪╖┬د╪╕╞ْ", render: (s) => (
                      <Badge variant={s.subscription.status === "active" ? "success" : s.subscription.status === "pending" ? "warning" : "error"}>
                        {s.subscription.status === "active" ? "╪╕ظب╪╖┬┤╪╖┬╖" : s.subscription.status === "pending" ? "╪╕ظخ╪╖┬╣╪╕ظئ╪╕ظأ" : "╪╕ظخ╪╕ظب╪╖┌╛╪╕ظة╪╕┘╣"}
                      </Badge>
                    )},
                    { key: "xp", header: "╪╖┬د╪╕ظئ╪╕ظب╪╕ظأ╪╖┬د╪╖┬╖", render: (s) => <span className="font-medium">{s.xp} XP</span> },
                  ]}
                  data={enrolledStudents}
                />
              </Card>
            </TabPanel>

            <TabPanel id="exams" activeTab={activeTab}>
              <Card>
                {courseExams.length === 0 ? (
                  <div className="text-center py-10 text-text-tertiary">╪╕ظئ╪╖┬د ╪╖┌╛╪╕╦╪╖┬ش╪╖┬» ╪╖┬د╪╕ظخ╪╖┌╛╪╖┬ص╪╖┬د╪╕ظب╪╖┬د╪╖┌╛ ╪╕ظخ╪╖┬▒╪╖┌╛╪╖┬ذ╪╖┬╖╪╖┬ر ╪╖┬ذ╪╕ظة╪╖┬░╪╖┬د ╪╖┬د╪╕ظئ╪╕╞ْ╪╕╦╪╖┬▒╪╖┬│</div>
                ) : (
                  <Table
                    columns={[
                      { key: "title", header: "╪╖┬د╪╕ظئ╪╖┬د╪╕ظخ╪╖┌╛╪╖┬ص╪╖┬د╪╕ظب" },
                      { key: "duration", header: "╪╖┬د╪╕ظئ╪╕ظخ╪╖┬»╪╖┬ر", render: (e) => <span>{e.duration} ╪╖┬»╪╕ظأ╪╕┘╣╪╕ظأ╪╖┬ر</span> },
                      { key: "totalGrade", header: "╪╖┬د╪╕ظئ╪╖┬»╪╖┬▒╪╖┬ش╪╖┬ر", render: (e) => <span className="font-medium">{e.totalGrade}</span> },
                      { key: "status", header: "╪╖┬د╪╕ظئ╪╖┬ص╪╖┬د╪╕ظئ╪╖┬ر", render: (e) => (
                        <Badge variant={e.status === "active" ? "success" : e.status === "draft" ? "neutral" : "error"}>
                          {e.status === "active" ? "╪╕ظب╪╖┬┤╪╖┬╖" : e.status === "draft" ? "╪╕ظخ╪╖┬│╪╕╦╪╖┬»╪╖┬ر" : "╪╕ظخ╪╖╪ؤ╪╕ظئ╪╕ظأ"}
                        </Badge>
                      )},
                    ]}
                    data={courseExams}
                  />
                )}
              </Card>
            </TabPanel>

            <TabPanel id="files" activeTab={activeTab}>
              <Card>
                <div className="text-center py-10 text-text-tertiary">
                  <HiOutlineDocumentText size={40} className="mx-auto mb-3 text-text-tertiary/50" />
                  <p>╪╕ظأ╪╖┬د╪╖┬خ╪╕ظخ╪╖┬ر ╪╖┬د╪╕ظئ╪╕ظخ╪╕ظئ╪╕┘╛╪╖┬د╪╖┌╛ ╪╖┬د╪╕ظئ╪╕ظخ╪╖┬▒╪╖┌╛╪╖┬ذ╪╖┬╖╪╖┬ر ╪╖┬ذ╪╖┬د╪╕ظئ╪╕╞ْ╪╕╦╪╖┬▒╪╖┬│</p>
                </div>
              </Card>
            </TabPanel>

            <TabPanel id="settings" activeTab={activeTab}>
              <Card>
                <CardHeader>
                  <CardTitle>╪╖┬ح╪╖┬╣╪╖┬»╪╖┬د╪╖┬»╪╖┬د╪╖┌╛ ╪╖┬د╪╕ظئ╪╕╞ْ╪╕╦╪╖┬▒╪╖┬│</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-text-secondary">╪╖┬ص╪╖┬د╪╕ظئ╪╖┬ر ╪╖┬د╪╕ظئ╪╕╞ْ╪╕╦╪╖┬▒╪╖┬│</span>
                    <Badge variant={statusBadgeVariant[course.status]}>{statusLabels[course.status]}</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-text-secondary">╪╖┬د╪╕ظئ╪╖┬│╪╖┬╣╪╖┬▒</span>
                    <span className="text-sm font-medium text-text">{course.isFree ? "╪╕ظخ╪╖┬ش╪╖┬د╪╕ظب╪╕┘╣" : formatCurrency(course.price)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-text-secondary">╪╕┘╣╪╖┌╛╪╖┬╖╪╕ظئ╪╖┬ذ ╪╕╞ْ╪╕╦╪╖┬»</span>
                    <span className="text-sm text-text">{course.requiresCode ? "╪╕ظب╪╖┬╣╪╕ظخ" : "╪╕ظئ╪╖┬د"}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-text-secondary">╪╖┌╛╪╖┬د╪╖┬▒╪╕┘╣╪╖┬« ╪╖┬د╪╕ظئ╪╖┬ح╪╕ظب╪╖┬┤╪╖┬د╪╖╪î</span>
                    <span className="text-sm text-text">{course.createdAt.toLocaleDateString("ar-EG")}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-text-secondary">╪╖┬ت╪╖┬«╪╖┬▒ ╪╖┌╛╪╖┬ص╪╖┬»╪╕┘╣╪╖┬س</span>
                    <span className="text-sm text-text">{course.updatedAt.toLocaleDateString("ar-EG")}</span>
                  </div>
                </CardContent>
              </Card>
            </TabPanel>
          </>
        )}
      </Tabs>

      <Modal
        isOpen={duplicateModalOpen}
        onClose={() => setDuplicateModalOpen(false)}
        title="╪╕ظب╪╖┬│╪╖┬« ╪╖┬د╪╕ظئ╪╕╞ْ╪╕╦╪╖┬▒╪╖┬│"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="╪╖┬د╪╖┬│╪╕ظخ ╪╖┬د╪╕ظئ╪╕╞ْ╪╕╦╪╖┬▒╪╖┬│ ╪╖┬د╪╕ظئ╪╖┬ش╪╖┬»╪╕┘╣╪╖┬»"
            value={duplicateName}
            onChange={(e) => setDuplicateName(e.target.value)}
            placeholder="╪╖┬ث╪╖┬»╪╖┬«╪╕ظئ ╪╖┬د╪╖┬│╪╕ظخ ╪╖┬د╪╕ظئ╪╕╞ْ╪╕╦╪╖┬▒╪╖┬│ ╪╖┬د╪╕ظئ╪╖┬ش╪╖┬»╪╕┘╣╪╖┬»"
          />
          <div className="flex items-center gap-3 pt-2">
            <Button variant="primary" onClick={handleDuplicate} isLoading={duplicating} leftIcon={<HiOutlineDuplicate size={18} />} className="flex-1">
              {duplicating ? "╪╖┬ش╪╖┬د╪╖┬▒╪╕┘╣ ╪╖┬د╪╕ظئ╪╕ظب╪╖┬│╪╖┬«..." : "╪╖┌╛╪╖┬ث╪╕╞ْ╪╕┘╣╪╖┬» ╪╖┬د╪╕ظئ╪╕ظب╪╖┬│╪╖┬«"}
            </Button>
            <Button variant="secondary" onClick={() => setDuplicateModalOpen(false)} className="flex-1">
              ╪╖┬ح╪╕ظئ╪╖╪ؤ╪╖┬د╪╖╪î
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}





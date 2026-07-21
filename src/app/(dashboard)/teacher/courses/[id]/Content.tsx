"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
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
  published: "ظ…ظ†ط´ظˆط±",
  draft: "ظ…ط³ظˆط¯ط©",
  "coming-soon": "ظ‚ط±ظٹط¨ط§ظ‹",
  archived: "ظ…ط¤ط±ط´ظپ",
  hidden: "ظ…ط®ظپظٹ",
}

type LessonStatusType = 'available' | 'locked' | 'coming-soon' | 'completed' | 'in-progress'

interface LessonStatusData {
  status: LessonStatusType
  availableDate?: string
  prerequisite?: string
}

const lessonStatusOptions: { value: LessonStatusType; label: string }[] = [
  { value: 'available', label: 'ظ…طھط§ط­' },
  { value: 'locked', label: 'ظ…ظ‚ظپظ„' },
  { value: 'coming-soon', label: 'ظ‚ط±ظٹط¨ط§ظ‹' },
  { value: 'completed', label: 'ظ…ظƒطھظ…ظ„' },
  { value: 'in-progress', label: 'ط¬ط§ط±ظچ' },
]

export default function CourseDetailPage() {
  const params = useParams()
  const course = mockCourses.find((c) => c.id === params.id)
  const [expandedChapters, setExpandedChapters] = useState<string[]>([])
  const [lessonStatuses, setLessonStatuses] = useState<Record<string, LessonStatusData>>({})
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false)
  const [duplicateName, setDuplicateName] = useState("")
  const [duplicating, setDuplicating] = useState(false)
  const { addToast } = useNotificationStore()

  if (!course) {
    return (
      <div className="p-4 md:p-6 text-center py-20">
        <h2 className="text-xl font-bold text-text mb-2">ط§ظ„ظƒظˆط±ط³ ط؛ظٹط± ظ…ظˆط¬ظˆط¯</h2>
        <p className="text-sm text-text-tertiary mb-4">ظ„ظ… ظٹطھظ… ط§ظ„ط¹ط«ظˆط± ط¹ظ„ظ‰ ط§ظ„ظƒظˆط±ط³ ط§ظ„ظ…ط·ظ„ظˆط¨</p>
        <Link href="/teacher/courses">
          <Button className="px-4 py-2 text-sm text-white bg-primary rounded-xl">ط§ظ„ط¹ظˆط¯ط© ظ„ظ„ظƒظˆط±ط³ط§طھ</Button>
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
    addToast({ type: 'success', title: 'طھظ… ظ†ط³ط® ط§ظ„ظƒظˆط±ط³ ط¨ظ†ط¬ط§ط­', message: `طھظ… ط¥ظ†ط´ط§ط، "${duplicateName}"` })
  }

  const enrolledStudents = mockStudents.slice(0, 8)
  const courseExams = mockExams.filter((e) => e.courseId === course.id)

  const tabs = [
    { id: "chapters", label: "ط§ظ„ظپطµظˆظ„ ظˆط§ظ„ط¯ط±ظˆط³", count: course.chapters.length },
    { id: "students", label: "ط§ظ„ط·ظ„ط§ط¨", count: course.studentsCount },
    { id: "exams", label: "ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ", count: courseExams.length },
    { id: "files", label: "ط§ظ„ظ…ظ„ظپط§طھ", count: course.filesCount },
    { id: "settings", label: "ط§ظ„ط¥ط¹ط¯ط§ط¯ط§طھ" },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "ط§ظ„ظƒظˆط±ط³ط§طھ", href: "/teacher/courses" }, { label: course.title }]} />
      <DashboardHeader title={course.title} subtitle={`${course.subject} آ· ${course.grade} آ· ط§ظ„طھط±ظ… ${course.term}`} />

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
                    {course.studentsCount} ط·ط§ظ„ط¨
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={() => { setDuplicateName(`ظ†ط³ط®ط© ظ…ظ† ${course.title}`); setDuplicateModalOpen(true) }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs font-medium hover:bg-white/30 transition-colors"
                >
                  <HiOutlineDuplicate size={14} />
                  ظ†ط³ط® ط§ظ„ظƒظˆط±ط³
                </Button>
                <Button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs font-medium hover:bg-white/30 transition-colors">
                  <HiOutlinePencil size={14} />
                  طھط¹ط¯ظٹظ„
                </Button>
                <Button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs font-medium hover:bg-white/30 transition-colors">
                  <HiOutlineTrash size={14} />
                  ط­ط°ظپ
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
                  <span className="font-medium text-text">{course.rating}</span> طھظ‚ظٹظٹظ…
                </span>
                <span className="flex items-center gap-1">
                  {course.discountPrice ? (
                    <><span className="font-bold text-text">{formatCurrency(course.discountPrice)}</span><span className="text-text-tertiary line-through mr-1">{formatCurrency(course.price)}</span></>
                  ) : (
                    <span className={cn("font-bold", course.isFree ? "text-success" : "text-text")}>{course.isFree ? "ظ…ط¬ط§ظ†ظٹ" : formatCurrency(course.price)}</span>
                  )}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-1 gap-3">
          {[
            { icon: HiOutlineUsers, title: "ط§ظ„ط·ظ„ط§ط¨", value: course.studentsCount, color: "primary" as const },
            { icon: HiOutlineBookOpen, title: "ط§ظ„ط¯ط±ظˆط³", value: course.lessonsCount, color: "info" as const },
            { icon: HiOutlineVideoCamera, title: "ط§ظ„ظپظٹط¯ظٹظˆظ‡ط§طھ", value: course.videosCount, color: "success" as const },
            { icon: HiOutlineClipboardList, title: "ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ", value: course.examsCount, color: "warning" as const },
            { icon: HiOutlineDocumentText, title: "ط§ظ„ظ…ظ„ظپط§طھ", value: course.filesCount, color: "error" as const },
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
                  <div className="text-center py-10 text-text-tertiary">ظ„ط§ طھظˆط¬ط¯ ظپطµظˆظ„ ط¯ط±ط§ط³ظٹط© ط¨ط¹ط¯</div>
                ) : (
                  course.chapters.map((chapter) => {
                    const isExpanded = expandedChapters.includes(chapter.id)
                    return (
                      <div key={chapter.id} className="bg-surface border border-border rounded-xl overflow-hidden">
                        <Button onClick={() => toggleChapter(chapter.id)}
                          className="w-full flex items-center justify-between px-4 py-3 bg-surface-secondary hover:bg-surface-tertiary transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <HiOutlineChevronDown size={16} className={cn("text-text-tertiary transition-transform shrink-0", isExpanded && "rotate-180")} />
                            <div className="text-right">
                              <p className="text-sm font-medium text-text">{chapter.title}</p>
                              <p className="text-xs text-text-tertiary">{chapter.lessons.filter((l) => l.status === "published").length} ط¯ط±ط³ آ· {chapter.lessons.reduce((a, l) => a + l.duration, 0)} ط¯ظ‚ظٹظ‚ط©</p>
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
                                        <span className="text-xs text-text-tertiary">{lesson.duration} ط¯</span>
                                        {lesson.isFree && <Badge variant="success" size="sm">ظ…ط¬ط§ظ†ظٹ</Badge>}
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
                    { key: "name", header: "ط§ظ„ط·ط§ظ„ط¨", render: (s) => (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 overflow-hidden shrink-0">
                          <img src={s.avatar} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-medium text-text">{s.name}</span>
                      </div>
                    )},
                    { key: "grade", header: "ط§ظ„طµظپ" },
                    { key: "phone", header: "ط§ظ„ظ‡ط§طھظپ" },
                    { key: "subscription", header: "ط§ظ„ط§ط´طھط±ط§ظƒ", render: (s) => (
                      <Badge variant={s.subscription.status === "active" ? "success" : s.subscription.status === "pending" ? "warning" : "error"}>
                        {s.subscription.status === "active" ? "ظ†ط´ط·" : s.subscription.status === "pending" ? "ظ…ط¹ظ„ظ‚" : "ظ…ظ†طھظ‡ظٹ"}
                      </Badge>
                    )},
                    { key: "xp", header: "ط§ظ„ظ†ظ‚ط§ط·", render: (s) => <span className="font-medium">{s.xp} XP</span> },
                  ]}
                  data={enrolledStudents}
                />
              </Card>
            </TabPanel>

            <TabPanel id="exams" activeTab={activeTab}>
              <Card>
                {courseExams.length === 0 ? (
                  <div className="text-center py-10 text-text-tertiary">ظ„ط§ طھظˆط¬ط¯ ط§ظ…طھط­ط§ظ†ط§طھ ظ…ط±طھط¨ط·ط© ط¨ظ‡ط°ط§ ط§ظ„ظƒظˆط±ط³</div>
                ) : (
                  <Table
                    columns={[
                      { key: "title", header: "ط§ظ„ط§ظ…طھط­ط§ظ†" },
                      { key: "duration", header: "ط§ظ„ظ…ط¯ط©", render: (e) => <span>{e.duration} ط¯ظ‚ظٹظ‚ط©</span> },
                      { key: "totalGrade", header: "ط§ظ„ط¯ط±ط¬ط©", render: (e) => <span className="font-medium">{e.totalGrade}</span> },
                      { key: "status", header: "ط§ظ„ط­ط§ظ„ط©", render: (e) => (
                        <Badge variant={e.status === "active" ? "success" : e.status === "draft" ? "neutral" : "error"}>
                          {e.status === "active" ? "ظ†ط´ط·" : e.status === "draft" ? "ظ…ط³ظˆط¯ط©" : "ظ…ط؛ظ„ظ‚"}
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
                  <p>ظ‚ط§ط¦ظ…ط© ط§ظ„ظ…ظ„ظپط§طھ ط§ظ„ظ…ط±طھط¨ط·ط© ط¨ط§ظ„ظƒظˆط±ط³</p>
                </div>
              </Card>
            </TabPanel>

            <TabPanel id="settings" activeTab={activeTab}>
              <Card>
                <CardHeader>
                  <CardTitle>ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ظƒظˆط±ط³</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-text-secondary">ط­ط§ظ„ط© ط§ظ„ظƒظˆط±ط³</span>
                    <Badge variant={statusBadgeVariant[course.status]}>{statusLabels[course.status]}</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-text-secondary">ط§ظ„ط³ط¹ط±</span>
                    <span className="text-sm font-medium text-text">{course.isFree ? "ظ…ط¬ط§ظ†ظٹ" : formatCurrency(course.price)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-text-secondary">ظٹطھط·ظ„ط¨ ظƒظˆط¯</span>
                    <span className="text-sm text-text">{course.requiresCode ? "ظ†ط¹ظ…" : "ظ„ط§"}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-text-secondary">طھط§ط±ظٹط® ط§ظ„ط¥ظ†ط´ط§ط،</span>
                    <span className="text-sm text-text">{course.createdAt.toLocaleDateString("ar-EG")}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-text-secondary">ط¢ط®ط± طھط­ط¯ظٹط«</span>
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
        title="ظ†ط³ط® ط§ظ„ظƒظˆط±ط³"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="ط§ط³ظ… ط§ظ„ظƒظˆط±ط³ ط§ظ„ط¬ط¯ظٹط¯"
            value={duplicateName}
            onChange={(e) => setDuplicateName(e.target.value)}
            placeholder="ط£ط¯ط®ظ„ ط§ط³ظ… ط§ظ„ظƒظˆط±ط³ ط§ظ„ط¬ط¯ظٹط¯"
          />
          <div className="flex items-center gap-3 pt-2">
            <Button variant="primary" onClick={handleDuplicate} isLoading={duplicating} leftIcon={<HiOutlineDuplicate size={18} />} className="flex-1">
              {duplicating ? "ط¬ط§ط±ظٹ ط§ظ„ظ†ط³ط®..." : "طھط£ظƒظٹط¯ ط§ظ„ظ†ط³ط®"}
            </Button>
            <Button variant="secondary" onClick={() => setDuplicateModalOpen(false)} className="flex-1">
              ط¥ظ„ط؛ط§ط،
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

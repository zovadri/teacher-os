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
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { Tabs, TabPanel } from "@/components/ui/Tabs"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Table } from "@/components/ui/Table"
import { mockCourses, mockStudents, mockExams } from "@/lib/mock/data"
import { formatCurrency, cn } from "@/lib/utils"

const statusBadgeVariant: Record<string, "success" | "neutral" | "warning" | "error" | "info"> = {
  published: "success",
  draft: "neutral",
  "coming-soon": "warning",
  archived: "error",
  hidden: "info",
}

const statusLabels: Record<string, string> = {
  published: "منشور",
  draft: "مسودة",
  "coming-soon": "قريباً",
  archived: "مؤرشف",
  hidden: "مخفي",
}

export default function CourseDetailPage() {
  const params = useParams()
  const course = mockCourses.find((c) => c.id === params.id)
  const [expandedChapters, setExpandedChapters] = useState<string[]>([])

  if (!course) {
    return (
      <div className="p-4 md:p-6 text-center py-20">
        <h2 className="text-xl font-bold text-text mb-2">الكورس غير موجود</h2>
        <p className="text-sm text-text-tertiary mb-4">لم يتم العثور على الكورس المطلوب</p>
        <Link href="/teacher/courses">
          <button className="px-4 py-2 text-sm text-white bg-primary rounded-xl">العودة للكورسات</button>
        </Link>
      </div>
    )
  }

  const toggleChapter = (id: string) => {
    setExpandedChapters((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }

  const enrolledStudents = mockStudents.slice(0, 8)
  const courseExams = mockExams.filter((e) => e.courseId === course.id)

  const tabs = [
    { id: "chapters", label: "الفصول والدروس", count: course.chapters.length },
    { id: "students", label: "الطلاب", count: course.studentsCount },
    { id: "exams", label: "الامتحانات", count: courseExams.length },
    { id: "files", label: "الملفات", count: course.filesCount },
    { id: "settings", label: "الإعدادات" },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "الكورسات", href: "/teacher/courses" }, { label: course.title }]} />
      <DashboardHeader title={course.title} subtitle={`${course.subject} · ${course.grade} · الترم ${course.term}`} />

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
                    {course.studentsCount} طالب
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs font-medium hover:bg-white/30 transition-colors">
                  <HiOutlinePencil size={14} />
                  تعديل
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs font-medium hover:bg-white/30 transition-colors">
                  <HiOutlineTrash size={14} />
                  حذف
                </button>
              </div>
            </div>
          </div>

          <Card>
            <CardContent>
              <p className="text-sm text-text-secondary leading-relaxed">{course.description}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-text-secondary">
                <span className="flex items-center gap-1">
                  <HiOutlineStar size={16} className="text-warning" />
                  <span className="font-medium text-text">{course.rating}</span> تقييم
                </span>
                <span className="flex items-center gap-1">
                  {course.discountPrice ? (
                    <><span className="font-bold text-text">{formatCurrency(course.discountPrice)}</span><span className="text-text-tertiary line-through mr-1">{formatCurrency(course.price)}</span></>
                  ) : (
                    <span className={cn("font-bold", course.isFree ? "text-success" : "text-text")}>{course.isFree ? "مجاني" : formatCurrency(course.price)}</span>
                  )}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-1 gap-3">
          {[
            { icon: HiOutlineUsers, title: "الطلاب", value: course.studentsCount, color: "primary" as const },
            { icon: HiOutlineBookOpen, title: "الدروس", value: course.lessonsCount, color: "info" as const },
            { icon: HiOutlineVideoCamera, title: "الفيديوهات", value: course.videosCount, color: "success" as const },
            { icon: HiOutlineClipboardList, title: "الامتحانات", value: course.examsCount, color: "warning" as const },
            { icon: HiOutlineDocumentText, title: "الملفات", value: course.filesCount, color: "error" as const },
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
                  <div className="text-center py-10 text-text-tertiary">لا توجد فصول دراسية بعد</div>
                ) : (
                  course.chapters.map((chapter) => {
                    const isExpanded = expandedChapters.includes(chapter.id)
                    return (
                      <div key={chapter.id} className="bg-surface border border-border rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleChapter(chapter.id)}
                          className="w-full flex items-center justify-between px-4 py-3 bg-surface-secondary hover:bg-surface-tertiary transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <HiOutlineChevronDown size={16} className={cn("text-text-tertiary transition-transform shrink-0", isExpanded && "rotate-180")} />
                            <div className="text-right">
                              <p className="text-sm font-medium text-text">{chapter.title}</p>
                              <p className="text-xs text-text-tertiary">{chapter.lessons.filter((l) => l.status === "published").length} درس · {chapter.lessons.reduce((a, l) => a + l.duration, 0)} دقيقة</p>
                            </div>
                          </div>
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="divide-y divide-border/50">
                                {chapter.lessons.map((lesson) => (
                                  <div key={lesson.id} className="flex items-center justify-between px-4 py-2.5 hover:bg-surface-secondary transition-colors">
                                    <div className="flex items-center gap-3 min-w-0">
                                      <HiOutlinePlay size={14} className={cn("shrink-0", lesson.isFree ? "text-success" : "text-text-tertiary")} />
                                      <span className="text-sm text-text">{lesson.title}</span>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                      <span className="text-xs text-text-tertiary">{lesson.duration} د</span>
                                      {lesson.isFree && <Badge variant="success" size="sm">مجاني</Badge>}
                                    </div>
                                  </div>
                                ))}
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
                    { key: "name", header: "الطالب", render: (s) => (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 overflow-hidden shrink-0">
                          <img src={s.avatar} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-medium text-text">{s.name}</span>
                      </div>
                    )},
                    { key: "grade", header: "الصف" },
                    { key: "phone", header: "الهاتف" },
                    { key: "subscription", header: "الاشتراك", render: (s) => (
                      <Badge variant={s.subscription.status === "active" ? "success" : s.subscription.status === "pending" ? "warning" : "error"}>
                        {s.subscription.status === "active" ? "نشط" : s.subscription.status === "pending" ? "معلق" : "منتهي"}
                      </Badge>
                    )},
                    { key: "xp", header: "النقاط", render: (s) => <span className="font-medium">{s.xp} XP</span> },
                  ]}
                  data={enrolledStudents}
                />
              </Card>
            </TabPanel>

            <TabPanel id="exams" activeTab={activeTab}>
              <Card>
                {courseExams.length === 0 ? (
                  <div className="text-center py-10 text-text-tertiary">لا توجد امتحانات مرتبطة بهذا الكورس</div>
                ) : (
                  <Table
                    columns={[
                      { key: "title", header: "الامتحان" },
                      { key: "duration", header: "المدة", render: (e) => <span>{e.duration} دقيقة</span> },
                      { key: "totalGrade", header: "الدرجة", render: (e) => <span className="font-medium">{e.totalGrade}</span> },
                      { key: "status", header: "الحالة", render: (e) => (
                        <Badge variant={e.status === "active" ? "success" : e.status === "draft" ? "neutral" : "error"}>
                          {e.status === "active" ? "نشط" : e.status === "draft" ? "مسودة" : "مغلق"}
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
                  <p>قائمة الملفات المرتبطة بالكورس</p>
                </div>
              </Card>
            </TabPanel>

            <TabPanel id="settings" activeTab={activeTab}>
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات الكورس</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-text-secondary">حالة الكورس</span>
                    <Badge variant={statusBadgeVariant[course.status]}>{statusLabels[course.status]}</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-text-secondary">السعر</span>
                    <span className="text-sm font-medium text-text">{course.isFree ? "مجاني" : formatCurrency(course.price)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-text-secondary">يتطلب كود</span>
                    <span className="text-sm text-text">{course.requiresCode ? "نعم" : "لا"}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-text-secondary">تاريخ الإنشاء</span>
                    <span className="text-sm text-text">{course.createdAt.toLocaleDateString("ar-EG")}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-text-secondary">آخر تحديث</span>
                    <span className="text-sm text-text">{course.updatedAt.toLocaleDateString("ar-EG")}</span>
                  </div>
                </CardContent>
              </Card>
            </TabPanel>
          </>
        )}
      </Tabs>
    </div>
  )
}

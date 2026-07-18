"use client"

import { useState, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlinePlay,
  HiOutlineLockClosed,
  HiOutlineCheckCircle,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineArrowRight,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineCollection,
  HiOutlineMenu,
  HiOutlineX,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Badge } from "@/components/ui/Badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Progress } from "@/components/ui/Progress"
import Button from "@/components/ui/Button"
import { mockCourses } from "@/lib/mock/data"
import { cn } from "@/lib/utils"

export default function CoursePreviewPage() {
  const params = useParams()
  const router = useRouter()
  const course = useMemo(() => mockCourses.find((c) => c.id === params.id), [params.id])
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set())
  const [currentLesson, setCurrentLesson] = useState<string | null>(null)
  const [showSidebar, setShowSidebar] = useState(false)

  if (!course) {
    return (
      <div className="p-6">
        <DashboardHeader title="الكورس غير موجود" />
      </div>
    )
  }

  const toggleChapter = (chId: string) => {
    const next = new Set(expandedChapters)
    if (next.has(chId)) next.delete(chId)
    else next.add(chId)
    setExpandedChapters(next)
  }

  const completedLessons = course.chapters.reduce(
    (s, ch) => s + ch.lessons.filter((l) => l.status === "published" && !l.isLocked).length, 0
  )
  const totalLessons = course.chapters.reduce((s, ch) => s + ch.lessons.length, 0)
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  return (
    <div className="min-h-screen bg-surface-secondary">
      <header className="sticky top-0 z-20 bg-surface border-b border-border">
        <div className="flex items-center justify-between px-4 md:px-6 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(`/teacher/courses/${course.id}`)}
              className="flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors"
            >
              <HiOutlineArrowRight className="w-4 h-4" />
              <span>العودة إلى التحرير</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="primary" size="sm">{course.grade}</Badge>
            <span className="text-sm font-medium text-text">{course.title}</span>
            <button
              className="md:hidden p-2 text-text-tertiary hover:text-text rounded-lg hover:bg-surface-secondary"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              {showSidebar ? <HiOutlineX className="w-5 h-5" /> : <HiOutlineMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <div className={cn(
          "flex-1 p-4 md:p-6",
          "md:ml-0"
        )}>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden group">
              <img src={course.banner} alt={course.title} className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
                  <HiOutlinePlay className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 text-white text-sm">
                <HiOutlineClock className="w-4 h-4" />
                <span>{course.chapters.reduce((s, ch) => s + ch.lessons.reduce((ls, l) => ls + l.duration, 0), 0)} دقيقة</span>
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-text mb-2">{course.title}</h1>
              <p className="text-text-secondary mb-4">{course.description}</p>
              <div className="flex items-center gap-4 text-sm text-text-secondary">
                <div className="flex items-center gap-1">
                  <HiOutlineCollection className="w-4 h-4" />
                  <span>{course.chapters.length} فصول</span>
                </div>
                <div className="flex items-center gap-1">
                  <HiOutlineDocumentText className="w-4 h-4" />
                  <span>{totalLessons} درس</span>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>التقدم في الكورس</CardTitle>
                <span className="text-sm text-text-secondary">{progress}%</span>
              </CardHeader>
              <CardContent>
                <Progress value={progress} variant="primary" size="lg" showLabel />
              </CardContent>
            </Card>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-text">محتويات الكورس</h2>
              {course.chapters.map((chapter) => (
                <Card key={chapter.id} className="overflow-hidden">
                  <button
                    onClick={() => toggleChapter(chapter.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-surface-secondary transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        {chapter.order}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-text">{chapter.title}</p>
                        <p className="text-xs text-text-tertiary">{chapter.lessons.length} دروس</p>
                      </div>
                    </div>
                    {expandedChapters.has(chapter.id) ? (
                      <HiOutlineChevronUp className="w-4 h-4 text-text-tertiary" />
                    ) : (
                      <HiOutlineChevronDown className="w-4 h-4 text-text-tertiary" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedChapters.has(chapter.id) && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden border-t border-border"
                      >
                        {chapter.lessons.map((lesson) => (
                          <button
                            key={lesson.id}
                            onClick={() => setCurrentLesson(lesson.id)}
                            className={cn(
                              "w-full flex items-center gap-3 px-4 py-3 text-right hover:bg-surface-secondary transition-colors border-b border-border last:border-0",
                              currentLesson === lesson.id && "bg-primary-50/50 dark:bg-primary-900/10"
                            )}
                          >
                            {lesson.isLocked ? (
                              <HiOutlineLockClosed className="w-4 h-4 text-text-tertiary shrink-0" />
                            ) : (
                              <HiOutlinePlay className="w-4 h-4 text-primary shrink-0" />
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="text-sm text-text truncate">{lesson.title}</p>
                              <p className="text-xs text-text-tertiary">{lesson.duration} دقيقة</p>
                            </div>
                            {lesson.isFree && (
                              <Badge variant="success" size="sm">مجاني</Badge>
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className={cn(
          "w-80 shrink-0 bg-surface border-r border-border p-4 overflow-y-auto hidden md:block",
          showSidebar && "block fixed inset-0 z-10 pt-16"
        )}>
          <h3 className="text-sm font-semibold text-text mb-4">محتويات الكورس</h3>
          <div className="space-y-1">
            {course.chapters.map((chapter) => (
              <div key={chapter.id}>
                <button
                  onClick={() => toggleChapter(chapter.id)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-surface-secondary transition-colors"
                >
                  <span className="text-sm text-text-secondary">{chapter.title}</span>
                  <span className="text-xs text-text-tertiary">{chapter.lessons.length}</span>
                </button>
                <AnimatePresence>
                  {expandedChapters.has(chapter.id) && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      {chapter.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => setCurrentLesson(lesson.id)}
                          className={cn(
                            "w-full flex items-center gap-2 pr-6 py-1.5 text-right transition-colors",
                            currentLesson === lesson.id ? "text-primary" : "text-text-tertiary hover:text-text"
                          )}
                        >
                          <span className="text-xs">{lesson.isLocked ? "🔒" : "▶"}</span>
                          <span className="text-xs truncate">{lesson.title}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

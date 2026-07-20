"use client"
import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineBookOpen, HiOutlinePlay, HiOutlineClock, HiOutlineChevronDown,
  HiOutlineDownload, HiOutlineLockClosed, HiOutlineCheckCircle,
  HiOutlineDocumentText, HiOutlineFilm, HiOutlineClipboardCheck,
  HiOutlineChevronLeft, HiOutlineAcademicCap,
} from "react-icons/hi"
import { mockCourses } from "@/lib/mock/data"

const enrolledCourseData = [
  {
    id: "c-1",
    title: "╪د┘┘╪ص┘ê ┘ê╪د┘╪╡╪▒┘",
    subject: "┘╪║╪ر ╪╣╪▒╪ذ┘è╪ر",
    grade: "╪س╪د┘╪س╪ر ╪س╪د┘┘ê┘è",
    teacher: "╪ث╪ص┘à╪» ┘à╪ص┘à╪»",
    description: "╪»┘ê╪▒╪ر ╪┤╪د┘à┘╪ر ┘┘è ╪د┘┘╪ص┘ê ┘ê╪د┘╪╡╪▒┘ ┘┘┘à╪▒╪ص┘╪ر ╪د┘╪س╪د┘┘ê┘è╪ر ╪ز┘ç╪»┘ ╪ح┘┘ë ╪ز╪ث╪│┘è╪│ ╪د┘╪╖┘╪د╪ذ ┘┘è ┘é┘ê╪د╪╣╪» ╪د┘┘╪║╪ر ╪د┘╪╣╪▒╪ذ┘è╪ر ┘ê╪ز╪╖╪ذ┘è┘é╪د╪ز┘ç╪د ╪د┘╪╣┘à┘┘è╪ر.",
    progress: 75,
    totalLessons: 36,
    completedLessons: 27,
    totalDuration: "┘ت┘ج ╪│╪د╪╣╪ر",
    chapters: [
      {
        id: "ch-1",
        title: "╪د┘┘à╪ذ╪ز╪»╪ث ┘ê╪د┘╪«╪ذ╪▒",
        status: "completed",
        lessons: [
          { id: "l1", title: "╪د┘┘à╪ذ╪ز╪»╪ث - ╪ز╪╣╪▒┘è┘┘ç ┘ê╪ث┘┘ê╪د╪╣┘ç", duration: "┘ت┘ح ╪»", type: "video", completed: true },
          { id: "l2", title: "╪د┘╪«╪ذ╪▒ - ╪ز╪╣╪▒┘è┘┘ç ┘ê╪ث┘┘ê╪د╪╣┘ç", duration: "┘ث┘ب ╪»", type: "video", completed: true },
          { id: "l3", title: "╪ز╪╖╪ذ┘è┘é╪د╪ز ╪╣┘┘ë ╪د┘┘à╪ذ╪ز╪»╪ث ┘ê╪د┘╪«╪ذ╪▒", duration: "┘ت┘ب ╪»", type: "homework", completed: true },
        ],
      },
      {
        id: "ch-2",
        title: "┘â╪د┘ ┘ê╪ث╪«┘ê╪د╪ز┘ç╪د",
        status: "in-progress",
        lessons: [
          { id: "l4", title: "┘â╪د┘ ┘ê╪ث╪«┘ê╪د╪ز┘ç╪د - ╪┤╪▒╪ص ╪د┘┘é╪د╪╣╪»╪ر", duration: "┘ث┘ح ╪»", type: "video", completed: true },
          { id: "l5", title: "╪ح╪╣╪▒╪د╪ذ ┘â╪د┘ ┘ê╪ث╪«┘ê╪د╪ز┘ç╪د", duration: "┘ت┘ذ ╪»", type: "video", completed: false },
          { id: "l6", title: "╪ز╪»╪▒┘è╪ذ╪د╪ز ╪╣┘┘ë ┘â╪د┘ ┘ê╪ث╪«┘ê╪د╪ز┘ç╪د", duration: "┘ت┘ب ╪»", type: "exam", completed: false },
          { id: "l7", title: "┘à┘╪«╪╡ ╪د┘┘╪╡┘", duration: "┘ة┘ب ╪»", type: "pdf", completed: false },
        ],
      },
      {
        id: "ch-3",
        title: "╪ح┘ ┘ê╪ث╪«┘ê╪د╪ز┘ç╪د",
        status: "locked",
        lessons: [
          { id: "l8", title: "╪ح┘ ┘ê╪ث╪«┘ê╪د╪ز┘ç╪د - ┘à┘é╪»┘à╪ر", duration: "┘ث┘ب ╪»", type: "video", completed: false },
          { id: "l9", title: "╪ح╪╣╪▒╪د╪ذ ╪ح┘ ┘ê╪ث╪«┘ê╪د╪ز┘ç╪د", duration: "┘ث┘ب ╪»", type: "video", completed: false },
        ],
      },
      {
        id: "ch-4",
        title: "╪د┘╪ش┘à┘╪ر ╪د┘╪د╪│┘à┘è╪ر ┘ê╪د┘╪ش┘à┘╪ر ╪د┘┘╪╣┘┘è╪ر",
        status: "locked",
        lessons: [
          { id: "l10", title: "╪د┘╪ش┘à┘╪ر ╪د┘╪د╪│┘à┘è╪ر", duration: "┘ت┘ح ╪»", type: "video", completed: false },
          { id: "l11", title: "╪د┘╪ش┘à┘╪ر ╪د┘┘╪╣┘┘è╪ر", duration: "┘ت┘ح ╪»", type: "video", completed: false },
        ],
      },
    ],
    files: [
      { id: "f1", name: "┘à╪░┘â╪▒╪ر ╪د┘┘╪ص┘ê ┘ê╪د┘╪╡╪▒┘ - ╪د┘┘╪╡┘ ╪د┘╪ث┘ê┘", type: "pdf", size: "┘ة┘ت┘س┘ح ┘à.╪ذ" },
      { id: "f2", name: "┘à┘╪«╪╡ ┘é┘ê╪د╪╣╪» ╪د┘┘╪ص┘ê", type: "pdf", size: "┘ذ┘س┘ت ┘à.╪ذ" },
      { id: "f3", name: "╪ش╪»┘ê┘ ╪د┘╪ح╪╣╪▒╪د╪ذ", type: "pdf", size: "┘ث┘س┘ة ┘à.╪ذ" },
    ],
  },
  {
    id: "c-2",
    title: "╪د┘╪ذ┘╪د╪║╪ر ┘ê╪د┘╪ث╪»╪ذ",
    subject: "┘╪║╪ر ╪╣╪▒╪ذ┘è╪ر",
    grade: "╪س╪د┘╪س╪ر ╪س╪د┘┘ê┘è",
    teacher: "╪«╪د┘╪» ╪ث╪ص┘à╪»",
    description: "╪»╪▒╪د╪│╪ر ╪┤╪د┘à┘╪ر ┘┘╪ذ┘╪د╪║╪ر ╪د┘╪╣╪▒╪ذ┘è╪ر ┘ê╪د┘╪ث╪»╪ذ ┘à┘ ╪د┘╪╣╪╡╪▒ ╪د┘╪ش╪د┘ç┘┘è ╪ح┘┘ë ╪د┘╪ص╪»┘è╪س.",
    progress: 45,
    totalLessons: 24,
    completedLessons: 11,
    totalDuration: "┘ة┘ذ ╪│╪د╪╣╪ر",
    chapters: [
      { id: "ch-1", title: "╪╣┘┘à ╪د┘╪ذ┘è╪د┘", status: "in-progress", lessons: [
        { id: "l1", title: "╪د┘╪ز╪┤╪ذ┘è┘ç", duration: "┘ث┘ب ╪»", type: "video", completed: true },
        { id: "l2", title: "╪د┘╪د╪│╪ز╪╣╪د╪▒╪ر", duration: "┘ت┘ح ╪»", type: "video", completed: false },
      ]},
      { id: "ch-2", title: "╪╣┘┘à ╪د┘╪ذ╪»┘è╪╣", status: "locked", lessons: [
        { id: "l3", title: "╪د┘┘à╪ص╪│┘╪د╪ز ╪د┘┘┘╪╕┘è╪ر", duration: "┘ت┘ب ╪»", type: "video", completed: false },
      ]},
    ],
    files: [],
  },
]

const lessonIcons: Record<string, any> = {
  video: HiOutlineFilm,
  homework: HiOutlineClipboardCheck,
  exam: HiOutlineAcademicCap,
  pdf: HiOutlineDocumentText,
}

export default function Content({ id }: { id: string }) {
    const courseData = useMemo(() => enrolledCourseData.find((c) => c.id === id) || enrolledCourseData[0], [id])
  const [mounted, setMounted] = useState(false)
  const [expandedChapter, setExpandedChapter] = useState<string | null>("ch-1")
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Link href="/student/courses" className="hover:text-primary transition-colors">╪د┘┘â┘ê╪▒╪│╪د╪ز</Link>
          <span>/</span>
          <span className="text-text">{courseData.title}</span>
        </div>

        {/* Course Header */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-primary/80 via-primary/60 to-primary/40" />
          <div className="relative z-10 p-6 md:p-8 text-white">
            <div className="max-w-2xl">
              <span className="inline-block px-2.5 py-1 rounded-lg bg-white/20 text-xs font-medium mb-3">
                {courseData.grade} ظت {courseData.subject}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{courseData.title}</h1>
              <p className="text-white/80 text-sm mb-4">{courseData.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
                <span className="flex items-center gap-1"><HiOutlineBookOpen size={14} /> {courseData.completedLessons}/{courseData.totalLessons} ╪»╪▒╪│</span>
                <span className="flex items-center gap-1"><HiOutlineClock size={14} /> {courseData.totalDuration}</span>
                <span className="flex items-center gap-1"><HiOutlineAcademicCap size={14} /> {courseData.teacher}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="p-5 rounded-xl bg-surface border border-border">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium">╪ز┘é╪»┘à┘â ┘┘è ╪د┘┘â┘ê╪▒╪│</span>
            <span className="text-text-secondary">{courseData.progress}┘ز</span>
          </div>
          <div className="h-2.5 rounded-full bg-surface-tertiary overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${courseData.progress}%` }} />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Chapters & Lessons */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="font-semibold">┘à╪ص╪ز┘ê┘ë ╪د┘┘â┘ê╪▒╪│</h2>
            {courseData.chapters.map((chapter) => {
              const isExpanded = expandedChapter === chapter.id
              const completedInChapter = chapter.lessons.filter((l) => l.completed).length
              return (
                <div key={chapter.id} className="rounded-xl border border-border bg-surface overflow-hidden">
                  <Button
                    onClick={() => setExpandedChapter(isExpanded ? null : chapter.id)}
                    className="w-full text-right p-4 flex items-center justify-between gap-3 hover:bg-surface-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${
                        chapter.status === "completed" ? "bg-success/10 text-success" :
                        chapter.status === "in-progress" ? "bg-primary/10 text-primary" :
                        "bg-surface-tertiary text-text-tertiary"
                      }`}>
                        {chapter.status === "locked" ? <HiOutlineLockClosed size={14} /> : completedInChapter}
                      </span>
                      <div className="text-right">
                        <p className="text-sm font-medium">{chapter.title}</p>
                        <p className="text-xs text-text-tertiary">{completedInChapter}/{chapter.lessons.length} ╪»╪▒┘ê╪│</p>
                      </div>
                    </div>
                    <HiOutlineChevronDown size={16} className={`text-text-tertiary transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  </Button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border">
                          {chapter.lessons.map((lesson) => {
                            const Icon = lessonIcons[lesson.type] || HiOutlinePlay
                            return (
                              <div key={lesson.id} className={`flex items-center gap-3 p-3.5 pr-8 border-b border-border last:border-0 hover:bg-surface-secondary/50 transition-colors ${lesson.completed ? "" : ""}`}>
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  lesson.completed ? "bg-success/10 text-success" : "bg-surface-tertiary text-text-tertiary"
                                }`}>
                                  {lesson.completed ? <HiOutlineCheckCircle size={16} /> : <Icon size={16} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{lesson.title}</p>
                                  <p className="text-xs text-text-tertiary">
                                    {lesson.type === "video" ? "┘┘è╪»┘è┘ê" : lesson.type === "homework" ? "┘ê╪د╪ش╪ذ" : lesson.type === "exam" ? "╪د┘à╪ز╪ص╪د┘" : "┘à┘┘"} ظت {lesson.duration}
                                  </p>
                                </div>
                                {lesson.completed && (
                                  <span className="text-xs text-success">ظ£ô</span>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          {/* Files & Downloads */}
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-surface border border-border">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <HiOutlineDownload size={16} className="text-primary" />
                ╪د┘┘à┘┘╪د╪ز ╪د┘┘à╪▒┘┘é╪ر
              </h3>
              <div className="space-y-2">
                {courseData.files.map((file) => (
                  <a
                    key={file.id}
                    href="#"
                    className="flex items-center gap-3 p-3 rounded-xl bg-surface-secondary hover:bg-surface-tertiary transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <HiOutlineDocumentText className="text-primary" size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate group-hover:text-primary transition-colors">{file.name}</p>
                      <p className="text-[10px] text-text-tertiary">{file.size} ظت PDF</p>
                    </div>
                    <HiOutlineDownload size={14} className="text-text-tertiary shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-surface border border-border">
              <h3 className="font-semibold mb-2">╪ز┘é╪»┘à ╪د┘┘â┘ê╪▒╪│</h3>
              <p className="text-3xl font-bold text-primary mb-1">{courseData.progress}┘ز</p>
              <p className="text-xs text-text-tertiary">{courseData.completedLessons} ┘à┘ {courseData.totalLessons} ╪»╪▒┘ê╪│ ┘à┘â╪ز┘à┘╪ر</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}





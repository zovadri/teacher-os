"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { HiOutlineClipboardCheck, HiOutlineClock, HiOutlineAcademicCap, HiOutlineStar, HiOutlineCalendar } from "react-icons/hi"

const mockExams = [
  ...Array.from({ length: 3 }, (_, i) => ({
    id: `upcoming-${i + 1}`,
    title: ["اختبار النحو الشامل", "امتحان البلاغة", "اختبار النصوص"][i],
    course: ["النحو والصرف", "البلاغة والأدب", "النصوص الأدبية"][i],
    date: new Date(2026, 6, 25 + i),
    duration: [60, 45, 30][i],
    questionsCount: [20, 15, 10][i],
    totalGrade: [100, 75, 50][i],
    status: "upcoming" as const,
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    id: `available-${i + 1}`,
    title: ["اختبار الإملاء", "امتحان التعبير", "مراجعة القواعد"][i],
    course: ["الإملاء والخط", "التعبير والإنشاء", "قواعد النحو المتقدم"][i],
    date: new Date(2026, 6, 10 + i),
    duration: [30, 60, 45][i],
    questionsCount: [10, 15, 20][i],
    totalGrade: [50, 100, 100][i],
    status: "available" as const,
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `completed-${i + 1}`,
    title: ["اختبار نصف الترم", "امتحان الشهر الأول", "اختبار الفصل الدراسي", "مراجعة ليلة الامتحان"][i],
    course: ["النحو والصرف", "البلاغة والأدب", "النصوص الأدبية", "الإملاء والخط"][i],
    date: new Date(2026, 5 - i, 15),
    duration: [60, 45, 90, 30][i],
    questionsCount: [25, 15, 30, 10][i],
    totalGrade: [150, 75, 200, 50][i],
    grade: [88, 72, 95, 65][i],
    status: "completed" as const,
    graded: i !== 3,
  })),
]

const statusConfig = {
  upcoming: { label: "قادم", color: "bg-info/10 text-info", icon: HiOutlineCalendar },
  available: { label: "متاح", color: "bg-success/10 text-success", icon: HiOutlineClock },
  completed: { label: "مكتمل", color: "bg-surface-tertiary text-text-tertiary", icon: HiOutlineClipboardCheck },
}

export default function StudentExamsPage() {
  const [mounted, setMounted] = useState(false)
  const [tab, setTab] = useState<"upcoming" | "available" | "completed">("upcoming")
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const filtered = mockExams.filter((e) => e.status === tab)

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold">الامتحانات</h1>
          <p className="text-text-secondary text-sm">جميع الامتحانات والاختبارات المتاحة لك</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-surface border border-border w-fit">
          {(["upcoming", "available", "completed"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === t ? "bg-primary text-white shadow-md" : "text-text-secondary hover:text-text"
              }`}
            >
              {t === "upcoming" ? "القادمة" : t === "available" ? "المتاحة" : "المكتملة"}
            </button>
          ))}
        </div>

        {/* Exam Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((exam, i) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={exam.status === "completed" ? "#" : `/student/exams/${exam.id}`}
                className={`block p-5 rounded-xl bg-surface border border-border hover:shadow-lg hover:border-primary/30 transition-all group ${exam.status === "completed" ? "opacity-80" : ""}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <HiOutlineClipboardCheck className="text-primary" size={20} />
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusConfig[exam.status].color}`}>
                    {statusConfig[exam.status].label}
                  </span>
                </div>

                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{exam.title}</h3>
                <p className="text-xs text-text-secondary mb-3">{exam.course}</p>

                <div className="flex items-center justify-between text-xs text-text-tertiary pb-3 mb-3 border-b border-border">
                  <span>{exam.questionsCount} أسئلة</span>
                  <span>{exam.duration} دقيقة</span>
                  <span>{exam.totalGrade} درجة</span>
                </div>

                {exam.status === "completed" && exam.graded !== undefined ? (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">الدرجة</span>
                    <div className="flex items-center gap-1">
                      <HiOutlineAcademicCap className="text-primary" size={16} />
                      <span className="text-lg font-bold text-primary">{exam.grade}</span>
                      <span className="text-xs text-text-tertiary">/ {exam.totalGrade}</span>
                    </div>
                  </div>
                ) : exam.status === "completed" ? (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">الحالة</span>
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-warning/10 text-warning font-medium">في انتظار التصحيح</span>
                  </div>
                ) : exam.status === "upcoming" ? (
                  <div className="flex items-center gap-1.5 text-xs text-text-tertiary">
                    <HiOutlineCalendar size={14} />
                    <span>{exam.date.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-success">
                    <HiOutlineClock size={14} />
                    <span>متاح الآن</span>
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full p-12 text-center text-text-secondary rounded-xl border border-dashed border-border">
              <HiOutlineClipboardCheck className="mx-auto mb-3" size={48} />
              <p>لا توجد امتحانات في هذا القسم</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

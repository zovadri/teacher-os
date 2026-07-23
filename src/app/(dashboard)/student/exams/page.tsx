"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { HiOutlineClipboardCheck, HiOutlineClock, HiOutlineAcademicCap, HiOutlineCalendar } from "react-icons/hi"
import { Badge } from "@/components/ui/Badge"
import { Card } from "@/components/ui/Card"
import { EmptyState } from "@/components/ui/EmptyState"

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

const statusConfig: Record<string, { label: string; variant: "info" | "success" | "neutral" }> = {
  upcoming: { label: "قادم", variant: "info" },
  available: { label: "متاح", variant: "success" },
  completed: { label: "مكتمل", variant: "neutral" },
}

export default function StudentExamsPage() {
  const [mounted, setMounted] = useState(false)
  const [tab, setTab] = useState<"upcoming" | "available" | "completed">("upcoming")
  useEffect(() => setMounted(true), [])

  const filtered = useMemo(() => mockExams.filter((e) => e.status === tab), [tab])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">الامتحانات</h1>
          <p className="text-text-secondary text-sm">جميع الامتحانات والاختبارات المتاحة لك</p>
        </div>

        <div className="flex gap-1 p-1 rounded-xl bg-surface border border-border w-fit">
          {(["upcoming", "available", "completed"] as const).map((t) => (
            <button type="button"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((exam, i) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={exam.status === "completed" ? "#" : `/student/exams/${exam.id}`}>
                <Card hover className={`h-full ${exam.status === "completed" ? "opacity-80" : ""}`}>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <HiOutlineClipboardCheck className="text-primary" size={20} />
                      </div>
                      <Badge variant={statusConfig[exam.status].variant} size="sm">{statusConfig[exam.status].label}</Badge>
                    </div>
                    <h3 className="font-semibold mb-1">{exam.title}</h3>
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
                        <Badge variant="warning" size="sm">في انتظار التصحيح</Badge>
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
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full">
              <EmptyState title="لا توجد امتحانات" description="لا توجد امتحانات في هذا القسم" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

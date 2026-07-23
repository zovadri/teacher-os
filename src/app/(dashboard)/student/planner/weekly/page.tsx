"use client"

import { useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  HiOutlineCalendar, HiOutlineChevronRight, HiOutlineBookOpen,
  HiOutlinePencil, HiOutlineEye, HiOutlineAcademicCap,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"

const timeSlots = [
  "7:00 - 8:00 ص", "8:00 - 9:00 ص", "9:00 - 10:00 ص", "10:00 - 11:00 ص",
  "11:00 - 12:00 م", "12:00 - 1:00 م", "1:00 - 2:00 م", "2:00 - 3:00 م",
]

const weekDays = ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"]

const schedule: Record<string, { subject: string; type: string; color: string }[]> = {
  السبت: [
    { subject: "النحو والصرف", type: "study", color: "primary" },
    { subject: "البلاغة والأدب", type: "study", color: "info" },
    { subject: "استراحة", type: "break", color: "success" },
    { subject: "النصوص الأدبية", type: "review", color: "warning" },
    { subject: "تمارين النحو", type: "homework", color: "primary" },
    { subject: "", type: "", color: "" },
    { subject: "مراجعة عامة", type: "review", color: "warning" },
    { subject: "", type: "", color: "" },
  ],
  الأحد: [
    { subject: "", type: "", color: "" },
    { subject: "الإملاء والخط", type: "study", color: "info" },
    { subject: "النصوص الأدبية", type: "study", color: "primary" },
    { subject: "استراحة", type: "break", color: "success" },
    { subject: "التعبير", type: "homework", color: "warning" },
    { subject: "مراجعة", type: "review", color: "warning" },
    { subject: "", type: "", color: "" },
    { subject: "", type: "", color: "" },
  ],
  الإثنين: [
    { subject: "مراجعة النحو", type: "review", color: "primary" },
    { subject: "النحو والصرف", type: "study", color: "primary" },
    { subject: "البلاغة", type: "study", color: "info" },
    { subject: "استراحة", type: "break", color: "success" },
    { subject: "الأدب", type: "study", color: "info" },
    { subject: "حل واجبات", type: "homework", color: "warning" },
    { subject: "", type: "", color: "" },
    { subject: "", type: "", color: "" },
  ],
  الثلاثاء: [
    { subject: "", type: "", color: "" },
    { subject: "مراجعة نحو", type: "review", color: "primary" },
    { subject: "الإملاء", type: "study", color: "info" },
    { subject: "استراحة", type: "break", color: "success" },
    { subject: "النصوص", type: "review", color: "warning" },
    { subject: "تمارين", type: "homework", color: "warning" },
    { subject: "", type: "", color: "" },
    { subject: "", type: "", color: "" },
  ],
  الأربعاء: [
    { subject: "التعبير", type: "study", color: "info" },
    { subject: "البلاغة", type: "study", color: "info" },
    { subject: "", type: "", color: "" },
    { subject: "استراحة", type: "break", color: "success" },
    { subject: "النحو", type: "study", color: "primary" },
    { subject: "حل اختبارات", type: "exam", color: "error" },
    { subject: "", type: "", color: "" },
    { subject: "", type: "", color: "" },
  ],
  الخميس: [
    { subject: "", type: "", color: "" },
    { subject: "مراجعة أسبوعية", type: "review", color: "warning" },
    { subject: "حل واجبات", type: "homework", color: "warning" },
    { subject: "استراحة", type: "break", color: "success" },
    { subject: "تلخيص", type: "study", color: "primary" },
    { subject: "تقييم", type: "exam", color: "error" },
    { subject: "", type: "", color: "" },
    { subject: "", type: "", color: "" },
  ],
}

const typeLabels: Record<string, string> = { study: "دراسة", homework: "واجب", review: "مراجعة", exam: "اختبار", break: "استراحة" }
const typeColors: Record<string, string> = {
  primary: "bg-primary/10 text-primary border-primary/20",
  info: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  success: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  warning: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  error: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
}

export default function WeeklySchedulePage() {
  const today = useMemo(() => {
    const d = new Date(2026, 6, 19)
    return d.toLocaleDateString("ar-EG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
  }, [])

  return (
    <div className="min-h-screen">
      <DashboardHeader title="الخطة الأسبوعية" subtitle={today} />
      <div className="p-6 md:p-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm"
        >
          <Link href="/student/planner" className="text-primary hover:underline inline-flex items-center gap-1">
            <HiOutlineChevronRight size={14} />
            <span>المخطط الدراسي</span>
          </Link>
          <span className="text-text-tertiary">/</span>
          <span className="text-text-secondary">الخطة الأسبوعية</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[900px] border-collapse" dir="rtl">
            <thead>
              <tr>
                <th className="p-3 border border-border bg-surface-secondary text-text font-medium text-sm sticky right-0 z-10" style={{ minWidth: 100 }}>
                  التوقيت
                </th>
                {weekDays.map((day) => (
                  <th key={day} className="p-3 border border-border bg-surface-secondary text-text font-medium text-sm">
                    <div className="flex items-center justify-center gap-1.5">
                      <HiOutlineCalendar size={15} className="text-text-tertiary" />
                      {day}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, rowIdx) => (
                <tr key={slot}>
                  <td className="p-3 border border-border bg-surface-secondary/50 text-text-secondary text-xs font-medium sticky right-0 z-10 whitespace-nowrap">
                    {slot}
                  </td>
                  {weekDays.map((day) => {
                    const cell = schedule[day][rowIdx]
                    const isEmpty = !cell?.subject
                    return (
                      <td key={`${day}-${rowIdx}`} className="p-1.5 border border-border align-top">
                        {!isEmpty ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: rowIdx * 0.03 }}
                            className={`p-2 rounded-xl border text-center text-xs ${
                              cell.type === "break"
                                ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400"
                                : typeColors[cell.color]
                            }`}
                          >
                            <p className={`font-medium leading-tight ${cell.type === "break" ? "" : "text-inherit"}`}>
                              {cell.subject}
                            </p>
                            {cell.type !== "break" && cell.type && (
                              <Badge variant={cell.color as "primary" | "success" | "warning" | "error" | "info" | "neutral" | "premium"} size="sm" className="mt-1">
                                {typeLabels[cell.type]}
                              </Badge>
                            )}
                          </motion.div>
                        ) : null}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 flex-wrap"
        >
          <span className="text-sm font-medium text-text">المرجع:</span>
          {Object.entries(typeLabels).filter(([k]) => k !== "break").map(([key, label]) => (
            <div key={key} className="flex items-center gap-1.5 text-xs text-text-secondary">
              <div className={`w-3 h-3 rounded ${
                key === "study" ? "bg-primary" :
                key === "homework" ? "bg-warning" :
                key === "review" ? "bg-amber-500" :
                "bg-error"
              }`} />
              <span>{label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
            <div className="w-3 h-3 rounded bg-emerald-500" />
            <span>استراحة</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

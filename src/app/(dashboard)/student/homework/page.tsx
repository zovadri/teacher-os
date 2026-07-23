"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  HiOutlineClipboardList, HiOutlineCheckCircle, HiOutlineExclamationCircle,
  HiOutlineClock, HiOutlineChevronLeft, HiOutlineDocumentText,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { StatsCard } from "@/components/ui/StatsCard"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { SearchInput } from "@/components/ui/SearchInput"
import { EmptyState } from "@/components/ui/EmptyState"
import { mockHomework, mockCourses } from "@/lib/mock/data"

const statusFilters = [
  { value: "all", label: "الكل" },
  { value: "pending", label: "قيد الانتظار" },
  { value: "submitted", label: "تم التسليم" },
  { value: "graded", label: "مصحح" },
  { value: "late", label: "متأخر" },
]

const statusBadge: Record<string, "primary" | "success" | "warning" | "error" | "info"> = {
  pending: "warning",
  submitted: "info",
  graded: "success",
  late: "error",
}

const statusLabels: Record<string, string> = {
  pending: "قيد الانتظار",
  submitted: "تم التسليم",
  graded: "مصحح",
  late: "متأخر",
}

export default function StudentHomeworkPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const homeworkWithCourse = useMemo(
    () => mockHomework.map((h) => ({
      ...h,
      courseTitle: mockCourses.find((c) => c.id === h.courseId)?.title || "غير معروف",
    })),
    []
  )

  const filtered = useMemo(
    () => homeworkWithCourse.filter((h) => {
      const matchesSearch = h.title.includes(search) || h.courseTitle.includes(search)
      const matchesStatus = statusFilter === "all" || h.status === statusFilter
      return matchesSearch && matchesStatus
    }),
    [homeworkWithCourse, search, statusFilter]
  )

  const total = mockHomework.length
  const submitted = mockHomework.filter((h) => h.status === "submitted" || h.status === "graded").length
  const lateOrPending = mockHomework.filter((h) => h.status === "late" || h.status === "pending").length

  return (
    <div className="min-h-screen">
      <DashboardHeader title="الواجبات" subtitle="تابع واجباتك المنزلية وقدمها في الوقت المحدد" />
      <div className="p-6 md:p-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <StatsCard title="إجمالي الواجبات" value={total} icon={HiOutlineClipboardList} color="primary" />
          <StatsCard title="تم التسليم" value={submitted} icon={HiOutlineCheckCircle} color="success" />
          <StatsCard title="متأخر / متبقي" value={lateOrPending} icon={HiOutlineExclamationCircle} color="error" />
        </motion.div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <SearchInput value={search} onChange={setSearch} placeholder="بحث عن واجب..." className="w-full sm:w-64" />
          <div className="flex items-center gap-2 flex-wrap">
            {statusFilters.map((f) => (
              <button type="button"
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === f.value
                    ? "bg-primary text-white"
                    : "bg-surface border border-border text-text-secondary hover:bg-surface-tertiary"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {filtered.map((hw, i) => {
              const isLate = new Date(hw.deadline) < new Date() && hw.status === "pending"
              const displayStatus = isLate ? "late" : hw.status
              return (
                <Link key={hw.id} href={`/student/homework/${hw.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-surface border border-border/60 rounded-xl p-5 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <HiOutlineDocumentText className="text-primary" size={22} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-semibold text-text truncate">{hw.title}</p>
                          <Badge variant={statusBadge[displayStatus]} size="sm">
                            {statusLabels[displayStatus]}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-text-tertiary">
                          <span>{hw.courseTitle}</span>
                          <span className="flex items-center gap-1">
                            <HiOutlineClock size={14} />
                            {new Date(hw.deadline).toLocaleDateString("ar-EG")}
                          </span>
                          {hw.grade !== undefined && hw.status === "graded" && (
                            <span className="text-success font-medium">الدرجة: {hw.grade}</span>
                          )}
                        </div>
                      </div>
                      <HiOutlineChevronLeft className="text-text-tertiary group-hover:text-primary transition-colors shrink-0" size={18} />
                    </div>
                  </motion.div>
                </Link>
              )
            })}
          </motion.div>
        ) : (
          <EmptyState
            icon={HiOutlineClipboardList}
            title="لا توجد واجبات"
            description={search || statusFilter !== "all" ? "لا توجد نتائج تطابق بحثك. حاول تغيير معايير البحث." : "لم يتم إضافة أي واجبات بعد."}
          />
        )}
      </div>
    </div>
  )
}

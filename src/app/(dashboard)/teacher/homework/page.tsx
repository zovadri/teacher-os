"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  HiOutlinePlus,
  HiOutlineBookOpen,
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineXCircle,
  HiOutlineDocumentText,
  HiOutlineEye,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { SearchInput } from "@/components/ui/SearchInput"
import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select"
import { EmptyState } from "@/components/ui/EmptyState"
import { mockHomework, mockCourses } from "@/lib/mock/data"

const statusBadge: Record<string, "success" | "error" | "neutral"> = {
  active: "success",
  closed: "error",
  draft: "neutral",
}

const statusLabels: Record<string, string> = {
  active: "ظ†ط´ط·",
  closed: "ظ…ط؛ظ„ظ‚",
  draft: "ظ…ط³ظˆط¯ط©",
}

const typeLabels: Record<string, string> = {
  quiz: "ط§ط®طھط¨ط§ط±",
  pdf: "PDF",
  image: "طµظˆط±ط©",
  word: "Word",
  video: "ظپظٹط¯ظٹظˆ",
  zip: "ظ…ط¶ط؛ظˆط·",
  writing: "ظƒطھط§ط¨ظٹ",
  mixed: "ظ…طھظ†ظˆط¹",
}

const typeBadge: Record<string, "primary" | "info" | "warning" | "premium" | "neutral" | "success"> = {
  quiz: "primary",
  pdf: "info",
  image: "warning",
  word: "info",
  video: "premium",
  zip: "neutral",
  writing: "primary",
  mixed: "warning",
}

const typeOptions = Object.entries(typeLabels).map(([value, label]) => ({ value, label }))
const statusOptions = [
  { value: "all", label: "ط¬ظ…ظٹط¹ ط§ظ„ط­ط§ظ„ط§طھ" },
  ...Object.entries(statusLabels).map(([value, label]) => ({ value, label })),
]
const courseOptions = [
  { value: "all", label: "ط¬ظ…ظٹط¹ ط§ظ„ظƒظˆط±ط³ط§طھ" },
  ...mockCourses.map((c) => ({ value: c.id, label: c.title })),
]

const stats = [
  { title: "ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظˆط§ط¬ط¨ط§طھ", value: mockHomework.length, icon: HiOutlineBookOpen, color: "primary" as const },
  { title: "ظ†ط´ط·", value: mockHomework.filter((h) => h.status === "active").length, icon: HiOutlineClipboardList, color: "success" as const },
  { title: "ظ…ط؛ظ„ظ‚", value: mockHomework.filter((h) => h.status === "closed").length, icon: HiOutlineXCircle, color: "error" as const },
  { title: "طھط­طھ ط§ظ„ط¥ط¹ط¯ط§ط¯", value: mockHomework.filter((h) => h.status === "draft").length, icon: HiOutlineClock, color: "warning" as const },
]

export default function HomeworkPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [courseFilter, setCourseFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filtered = useMemo(() => {
    return mockHomework.filter((h) => {
      const matchSearch = h.title.includes(search)
      const matchStatus = statusFilter === "all" || h.status === statusFilter
      const matchCourse = courseFilter === "all" || h.courseId === courseFilter
      const matchType = typeFilter === "all" || h.type === typeFilter
      return matchSearch && matchStatus && matchCourse && matchType
    })
  }, [search, statusFilter, courseFilter, typeFilter])

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="ط§ظ„ظˆط§ط¬ط¨ط§طھ" subtitle="ط¥ط¯ط§ط±ط© ط§ظ„ظˆط§ط¬ط¨ط§طھ ط§ظ„ظ…ظ†ط²ظ„ظٹط© ظˆظ…طھط§ط¨ط¹ط© طھط³ظ„ظٹظ… ط§ظ„ط·ظ„ط§ط¨" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <StatsCard title={s.title} value={s.value} icon={s.icon} color={s.color} />
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchInput value={search} onChange={setSearch} placeholder="ط¨ط­ط« ط¹ظ† ظˆط§ط¬ط¨..." />
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="w-40">
            <Select
              options={courseOptions}
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
            />
          </div>
          <div className="w-36">
            <Select
              options={[{ value: "all", label: "ط¬ظ…ظٹط¹ ط§ظ„ط£ظ†ظˆط§ط¹" }, ...typeOptions]}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            />
          </div>
          <div className="w-36">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
          </div>
          <Link href="/teacher/homework/create">
            <Button variant="primary" size="md" leftIcon={<HiOutlinePlus size={18} />}>
              ط¥ط¶ط§ظپط© ظˆط§ط¬ط¨
            </Button>
          </Link>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={HiOutlineDocumentText}
          title="ظ„ط§ طھظˆط¬ط¯ ظˆط§ط¬ط¨ط§طھ ظ…ط·ط§ط¨ظ‚ط©"
          description="ط­ط§ظˆظ„ طھط؛ظٹظٹط± ظ…ط¹ط§ظٹظٹط± ط§ظ„ط¨ط­ط« ط£ظˆ ط¥ط¶ط§ظپط© ظˆط§ط¬ط¨ ط¬ط¯ظٹط¯"
          action={
            <Link href="/teacher/homework/create">
              <Button variant="primary" leftIcon={<HiOutlinePlus size={18} />}>
                ط¥ط¶ط§ظپط© ظˆط§ط¬ط¨
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((hw, index) => {
            const course = mockCourses.find((c) => c.id === hw.courseId)
            const submitted = hw.analytics.submitted
            const notSubmitted = hw.analytics.notSubmitted
            const totalStudents = submitted + notSubmitted
            return (
              <motion.div
                key={hw.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Link href={`/teacher/homework/${hw.id}`}>
                  <Card className="hover:shadow-lg hover:border-primary/20 transition-all duration-300 group h-full">
                    <CardContent className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <HiOutlineBookOpen className="text-primary" size={20} />
                        </div>
                        <div className="flex gap-1.5">
                          <Badge variant={typeBadge[hw.type]} size="sm">{typeLabels[hw.type]}</Badge>
                          <Badge variant={statusBadge[hw.status]} size="sm">{statusLabels[hw.status]}</Badge>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-text mb-0.5 line-clamp-1">{hw.title}</h3>
                        <p className="text-xs text-text-tertiary">{course?.title || "ظƒظˆط±ط³ ط¹ط§ظ…"}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-center text-xs">
                        <div className="p-2 rounded-lg bg-surface-secondary">
                          <p className="font-bold text-text">{hw.deadline.toLocaleDateString("ar-EG")}</p>
                          <p className="text-text-tertiary">ط§ظ„ظ…ظˆط¹ط¯ ط§ظ„ظ†ظ‡ط§ط¦ظٹ</p>
                        </div>
                        <div className="p-2 rounded-lg bg-surface-secondary">
                          <p className="font-bold text-text">{submitted}/{totalStudents}</p>
                          <p className="text-text-tertiary">طھظ… ط§ظ„طھط³ظ„ظٹظ…</p>
                        </div>
                        <div className="p-2 rounded-lg bg-surface-secondary">
                          <p className="font-bold text-text">{hw.analytics.averageGrade}</p>
                          <p className="text-text-tertiary">ظ…طھظˆط³ط· ط§ظ„ط¯ط±ط¬ط©</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-1">
                          <button type="button" onClick={(e) => { e.stopPropagation(); router.push(`/teacher/homework/${hw.id}`) }} className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="ط¹ط±ط¶">
                            <HiOutlineEye size={16} />
                          </button>
                        </div>
                        <Badge variant={hw.allowResubmit ? "info" : "neutral"} size="sm">
                          {hw.allowResubmit ? `ط¥ط¹ط§ط¯ط© طھط³ظ„ظٹظ… (${hw.maxResubmitCount})` : "طھط³ظ„ظٹظ… ظ…ط±ط© ظˆط§ط­ط¯ط©"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}

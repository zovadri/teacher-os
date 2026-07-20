"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import {
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineDuplicate,
  HiOutlineClipboardCheck,
  HiOutlineChartSquareBar,
  HiOutlineClock,
  HiOutlineAcademicCap,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { SearchInput } from "@/components/ui/SearchInput"
import Button from "@/components/ui/Button"
import { mockExams } from "@/lib/mock/data"

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

const stats = [
  { title: "ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ", value: mockExams.length, icon: HiOutlineClipboardCheck, color: "primary" as const },
  { title: "ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ ط§ظ„ظ†ط´ط·ط©", value: mockExams.filter((e) => e.status === "active").length, icon: HiOutlineChartSquareBar, color: "success" as const },
  { title: "ظ…طھظˆط³ط· ط§ظ„ط¯ط±ط¬ط§طھ", value: `${mockExams.reduce((s, e) => s + e.analytics.averageGrade, 0) / mockExams.length}%`, icon: HiOutlineAcademicCap, color: "info" as const },
  { title: "ظ…طھظˆط³ط· ط§ظ„ظ…ط¯ط©", value: `${Math.round(mockExams.reduce((s, e) => s + e.duration, 0) / mockExams.length)} ط¯`, icon: HiOutlineClock, color: "warning" as const },
]

const statuses = ["ط§ظ„ظƒظ„", "active", "draft", "closed"]

export default function ExamsPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("ط§ظ„ظƒظ„")

  const courses = useMemo(() => [...new Set(mockExams.map((e) => mockExams.find((ex) => ex.id === e.id)?.title).filter(Boolean))], [])

  const filtered = useMemo(() => {
    return mockExams.filter((e) => {
      const matchSearch = e.title.includes(search)
      const matchStatus = statusFilter === "ط§ظ„ظƒظ„" || e.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [search, statusFilter])

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ" subtitle="ط¥ط¯ط§ط±ط© ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ ظˆط§ظ„ط§ط®طھط¨ط§ط±ط§طھ" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <StatsCard title={s.title} value={s.value} icon={s.icon} color={s.color} />
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchInput value={search} onChange={setSearch} placeholder="ط¨ط­ط« ط¹ظ† ط§ظ…طھط­ط§ظ†..." />
        </div>
        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s === "ط§ظ„ظƒظ„" ? "ط¬ظ…ظٹط¹ ط§ظ„ط­ط§ظ„ط§طھ" : statusLabels[s]}</option>
            ))}
          </select>
          <Link href="/teacher/exams/create">
            <Button variant="primary" size="md" leftIcon={<HiOutlinePlus size={18} />}>
              ط¥ط¶ط§ظپط© ط§ظ…طھط­ط§ظ†
            </Button>
          </Link>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <HiOutlineClipboardCheck size={48} className="mx-auto text-text-tertiary/50 mb-4" />
          <p className="text-text-secondary font-medium">ظ„ط§ طھظˆط¬ط¯ ط§ظ…طھط­ط§ظ†ط§طھ ظ…ط·ط§ط¨ظ‚ط© ظ„ظ„ط¨ط­ط«</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((exam, index) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Link href={`/teacher/exams/${exam.id}`}>
                <Card className="hover:shadow-lg hover:border-primary/20 transition-all duration-300 group h-full">
                  <CardContent className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <HiOutlineClipboardCheck className="text-primary" size={20} />
                      </div>
                      <Badge variant={statusBadge[exam.status]}>{statusLabels[exam.status]}</Badge>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text mb-0.5 line-clamp-1">{exam.title}</h3>
                      <p className="text-xs text-text-tertiary">{mockExams.find((c) => c.id === exam.courseId)?.title || "ظƒظˆط±ط³ ط¹ط§ظ…"}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center text-xs">
                      <div className="p-2 rounded-lg bg-surface-secondary">
                        <p className="font-bold text-text">{exam.duration}</p>
                        <p className="text-text-tertiary">ط¯ظ‚ظٹظ‚ط©</p>
                      </div>
                      <div className="p-2 rounded-lg bg-surface-secondary">
                        <p className="font-bold text-text">{exam.totalGrade}</p>
                        <p className="text-text-tertiary">ط¯ط±ط¬ط©</p>
                      </div>
                      <div className="p-2 rounded-lg bg-surface-secondary">
                        <p className="font-bold text-text">{exam.questions.length}</p>
                        <p className="text-text-tertiary">ط³ط¤ط§ظ„</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={(e) => { e.stopPropagation(); router.push(`/teacher/exams/${exam.id}`) }} className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="ط¹ط±ط¶">
                          <HiOutlineEye size={16} />
                        </button>
                        <button type="button" onClick={(e) => { e.stopPropagation(); router.push(`/teacher/exams/${exam.id}`) }} className="p-1.5 text-text-tertiary hover:text-warning hover:bg-warning/5 rounded-lg transition-colors" title="طھط¹ط¯ظٹظ„">
                          <HiOutlinePencil size={16} />
                        </button>
                        <button type="button" onClick={(e) => { e.stopPropagation(); toast.success("طھظ… ظ†ط³ط® ط§ظ„ط§ظ…طھط­ط§ظ† ط¨ظ†ط¬ط§ط­") }} className="p-1.5 text-text-tertiary hover:text-info hover:bg-info/5 rounded-lg transition-colors" title="ظ†ط³ط®">
                          <HiOutlineDuplicate size={16} />
                        </button>
                      </div>
                      <button type="button" onClick={(e) => { e.stopPropagation(); toast.success("طھظ… ط­ط°ظپ ط§ظ„ط§ظ…طھط­ط§ظ† ط¨ظ†ط¬ط§ط­") }} className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors" title="ط­ط°ظپ">
                        <HiOutlineTrash size={16} />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

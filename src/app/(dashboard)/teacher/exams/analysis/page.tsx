"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineChartSquareBar, HiOutlineChartPie, HiOutlineFilter,
  HiOutlineClock, HiOutlineTag, HiOutlineRefresh,
  HiOutlineExclamationCircle, HiOutlineTrendingDown, HiOutlineTrendingUp,
} from "react-icons/hi"
import toast from "react-hot-toast"
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { PageHeader } from "@/components/ui/PageHeader"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Table } from "@/components/ui/Table"
import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select"
import { Skeleton, StatsSkeleton, TableSkeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { mockExams, mockQuestionAnalysis } from "@/lib/mock/data"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { cn, det } from "@/lib/utils"
import type { QuestionAnalysis } from "@/lib/types"

const COLORS = {
  primary: "#6366F1",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
  purple: "#8B5CF6",
  cyan: "#06B6D4",
  pink: "#EC4899",
}

const PIE_COLORS = [COLORS.success, COLORS.warning, COLORS.error, COLORS.info, COLORS.primary, COLORS.purple]

const difficultyConfig: Record<string, { label: string; color: string; variant: "success" | "warning" | "error" }> = {
  easy: { label: "ط·آ³ط¸â€،ط¸â€‍", color: COLORS.success, variant: "success" },
  medium: { label: "ط¸â€¦ط·ع¾ط¸ث†ط·آ³ط·آ·", color: COLORS.warning, variant: "warning" },
  hard: { label: "ط·آµط·آ¹ط·آ¨", color: COLORS.error, variant: "error" },
}

const typeLabels: Record<string, string> = {
  "multiple-choice": "ط·آ§ط·آ®ط·ع¾ط¸ظ¹ط·آ§ط·آ± ط¸â€¦ط¸â€  ط¸â€¦ط·ع¾ط·آ¹ط·آ¯ط·آ¯",
  "true-false": "ط·آµط¸ث†ط·آ§ط·آ¨/ط·آ®ط·آ·ط·آ£",
  "fill-blank": "ط¸â€¦ط¸â€‍ط·طŒ ط·آ§ط¸â€‍ط¸ظ¾ط·آ±ط·آ§ط·ط›",
  essay: "ط¸â€¦ط¸â€ڑط·آ§ط¸â€‍ط¸ظ¹",
  ordering: "ط·ع¾ط·آ±ط·ع¾ط¸ظ¹ط·آ¨",
  matching: "ط¸â€¦ط·آ·ط·آ§ط·آ¨ط¸â€ڑط·آ©",
}

function useLoadAnalysis() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<QuestionAnalysis[]>([])

  const load = useCallback(() => {
    setLoading(true)
    setError(null)
    setTimeout(() => {
      try {
        if (det() > 0.1) {
          setData(mockQuestionAnalysis)
        } else {
          throw new Error("ط¸ظ¾ط·آ´ط¸â€‍ ط·ع¾ط·آ­ط¸â€¦ط¸ظ¹ط¸â€‍ ط·آ§ط¸â€‍ط·ع¾ط·آ­ط¸â€‍ط¸ظ¹ط¸â€‍ط·آ§ط·ع¾")
        }
      } catch (e) {
        setError((e as Error).message)
      } finally {
        setLoading(false)
      }
    }, 800)
  }, [])

  useEffect(() => { load() }, [load])
  return { data, loading, error, retry: load }
}

export default function AnalysisPage() {
  const { data: analysis, loading, error, retry } = useLoadAnalysis()
  const [selectedExamId, setSelectedExamId] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍")
  const [typeFilter, setTypeFilter] = useState("ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍")
  const [tagFilter, setTagFilter] = useState("ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍")

  const examOptions = useMemo(() => [
    { value: "", label: "ط·آ§ط·آ®ط·ع¾ط·آ± ط·آ§ط¸â€‍ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€ ..." },
    ...mockExams.map((e) => ({ value: e.id, label: e.title })),
  ], [])

  const allTags = useMemo(() => {
    const tags = new Set(analysis.map((a) => a.tag))
    return ["ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍", ...Array.from(tags)]
  }, [analysis])

  const filtered = useMemo(() => {
    return analysis.filter((a) => {
      if (difficultyFilter !== "ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍" && a.difficulty !== difficultyFilter) return false
      if (typeFilter !== "ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍" && a.type !== typeFilter) return false
      if (tagFilter !== "ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍" && a.tag !== tagFilter) return false
      return true
    })
  }, [analysis, difficultyFilter, typeFilter, tagFilter])

  const difficultyDist = useMemo(() => {
    const dist: Record<string, number> = { easy: 0, medium: 0, hard: 0 }
    filtered.forEach((a) => { dist[a.difficulty]++ })
    return Object.entries(dist).map(([name, value]) => ({
      name: difficultyConfig[name].label,
      value,
      color: difficultyConfig[name].color,
    }))
  }, [filtered])

  const tagDist = useMemo(() => {
    const dist: Record<string, number> = {}
    filtered.forEach((a) => { dist[a.tag] = (dist[a.tag] || 0) + 1 })
    return Object.entries(dist).map(([name, value]) => ({ name, value }))
  }, [filtered])

  const { hardest, easiest, mostMistaken } = useMemo(() => {
    if (filtered.length === 0) return { hardest: null, easiest: null, mostMistaken: null }
    let h = filtered[0], e = filtered[0], m = filtered[0]
    filtered.forEach((a) => {
      if (a.correctRate < h.correctRate) h = a
      if (a.correctRate > e.correctRate) e = a
      if (a.incorrectCount > m.incorrectCount) m = a
    })
    return { hardest: h, easiest: e, mostMistaken: m }
  }, [filtered])

  const statsCards = useMemo(() => [
    { title: "ط·آ£ط·آµط·آ¹ط·آ¨ ط·آ³ط·آ¤ط·آ§ط¸â€‍", value: hardest ? `${hardest.correctRate}%` : "-", icon: HiOutlineTrendingDown, color: "error" as const, subtitle: hardest?.questionText },
    { title: "ط·آ£ط·آ³ط¸â€،ط¸â€‍ ط·آ³ط·آ¤ط·آ§ط¸â€‍", value: easiest ? `${easiest.correctRate}%` : "-", icon: HiOutlineTrendingUp, color: "success" as const, subtitle: easiest?.questionText },
    { title: "ط·آ£ط¸ئ’ط·آ«ط·آ± ط·آ³ط·آ¤ط·آ§ط¸â€‍ ط·آ®ط·آ·ط·آ£", value: mostMistaken ? `${mostMistaken.incorrectCount} ط·آ®ط·آ·ط·آ£` : "-", icon: HiOutlineExclamationCircle, color: "warning" as const, subtitle: mostMistaken?.questionText },
    { title: "ط¸â€¦ط·ع¾ط¸ث†ط·آ³ط·آ· ط·آ§ط¸â€‍ط·آ¥ط·آ¬ط·آ§ط·آ¨ط·آ§ط·ع¾", value: filtered.length > 0 ? `${Math.round(filtered.reduce((s, a) => s + a.correctRate, 0) / filtered.length)}%` : "-", icon: HiOutlineChartSquareBar, color: "info" as const },
  ], [hardest, easiest, mostMistaken, filtered])

  const columns = [
    { key: "questionText", header: "ط·آ§ط¸â€‍ط·آ³ط·آ¤ط·آ§ط¸â€‍", render: (a: QuestionAnalysis) => <span className="text-sm line-clamp-1 max-w-[200px]">{a.questionText}</span> },
    { key: "type", header: "ط·آ§ط¸â€‍ط¸â€ ط¸ث†ط·آ¹", render: (a: QuestionAnalysis) => <Badge variant="info" size="sm">{typeLabels[a.type] || a.type}</Badge> },
    { key: "difficulty", header: "ط·آ§ط¸â€‍ط·آµط·آ¹ط¸ث†ط·آ¨ط·آ©", render: (a: QuestionAnalysis) => <Badge variant={difficultyConfig[a.difficulty].variant} size="sm">{difficultyConfig[a.difficulty].label}</Badge> },
    { key: "correctRate", header: "ط¸â€ ط·آ³ط·آ¨ط·آ© ط·آ§ط¸â€‍ط·آµط·آ­ط·آ©", render: (a: QuestionAnalysis) => (
      <div className="flex items-center gap-2">
        <div className="w-20 h-2 rounded-full bg-surface-tertiary overflow-hidden">
          <div className="h-full rounded-full bg-success transition-all" style={{ width: `${a.correctRate}%` }} />
        </div>
        <span className="text-xs font-medium">{a.correctRate}%</span>
      </div>
    )},
    { key: "incorrectCount", header: "ط·آ®ط·آ·ط·آ£", render: (a: QuestionAnalysis) => <span className="text-error">{a.incorrectCount}</span> },
    { key: "skippedCount", header: "ط·ع¾ط·آ®ط·آ·ط¸â€°", render: (a: QuestionAnalysis) => <span className="text-text-tertiary">{a.skippedCount}</span> },
    { key: "averageTime", header: "ط¸â€¦ط·ع¾ط¸ث†ط·آ³ط·آ· ط·آ§ط¸â€‍ط¸ث†ط¸â€ڑط·ع¾", render: (a: QuestionAnalysis) => (
      <span className="flex items-center gap-1"><HiOutlineClock size={14} className="text-text-tertiary" />{a.averageTime} ط·آ«</span>
    )},
    { key: "tag", header: "ط·آ§ط¸â€‍ط¸ث†ط·آ³ط¸â€¦", render: (a: QuestionAnalysis) => <Badge size="sm">{a.tag}</Badge> },
  ]

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <PageHeader title="ط·ع¾ط·آ­ط¸â€‍ط¸ظ¹ط¸â€‍ ط·آ§ط¸â€‍ط·آ£ط·آ³ط·آ¦ط¸â€‍ط·آ©" description="ط·ع¾ط·آ­ط¸â€‍ط¸ظ¹ط¸â€‍ ط·آ£ط·آ¯ط·آ§ط·طŒ ط·آ§ط¸â€‍ط·آ£ط·آ³ط·آ¦ط¸â€‍ط·آ© ط¸ث†ط·آ§ط¸â€‍ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€ ط·آ§ط·ع¾" />
        <ErrorState error={error} onRetry={retry} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <Breadcrumb items={[{ label: "الامتحانات", href: "/teacher/exams" }, { label: "تحليل الأسئلة" }]} />
      <PageHeader title="ط·ع¾ط·آ­ط¸â€‍ط¸ظ¹ط¸â€‍ ط·آ§ط¸â€‍ط·آ£ط·آ³ط·آ¦ط¸â€‍ط·آ©" description="ط·ع¾ط·آ­ط¸â€‍ط¸ظ¹ط¸â€‍ ط·آ£ط·آ¯ط·آ§ط·طŒ ط·آ§ط¸â€‍ط·آ£ط·آ³ط·آ¦ط¸â€‍ط·آ© ط¸ث†ط·آ§ط¸â€‍ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€ ط·آ§ط·ع¾" />

      <Card>
        <CardContent className="space-y-4">
          <Select label="ط·آ§ط·آ®ط·ع¾ط·آ± ط·آ§ط¸â€‍ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€ " options={examOptions} value={selectedExamId} onChange={(e) => setSelectedExamId(e.target.value)} />
        </CardContent>
      </Card>

      {loading && (
        <div className="space-y-6">
          <StatsSkeleton count={4} />
          <TableSkeleton rows={5} columns={7} />
        </div>
      )}

      {!loading && !selectedExamId && (
        <EmptyState icon={HiOutlineChartSquareBar} title="ط·آ§ط·آ®ط·ع¾ط·آ± ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€ ط·آ§ط¸â€¹" description="ط¸ظ¹ط·آ±ط·آ¬ط¸â€° ط·آ§ط·آ®ط·ع¾ط¸ظ¹ط·آ§ط·آ± ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€  ط¸â€‍ط·آ¹ط·آ±ط·آ¶ ط·ع¾ط·آ­ط¸â€‍ط¸ظ¹ط¸â€‍ ط·آ§ط¸â€‍ط·آ£ط·آ³ط·آ¦ط¸â€‍ط·آ©" />
      )}

      {!loading && selectedExamId && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <StatsCard title={s.title} value={s.value} icon={s.icon} color={s.color} subtitle={s.subtitle} />
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="w-44">
              <Select options={[{ value: "ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍", label: "ط¸ئ’ط¸â€‍ ط·آ§ط¸â€‍ط·آµط·آ¹ط¸ث†ط·آ¨ط·آ§ط·ع¾" }, { value: "easy", label: "ط·آ³ط¸â€،ط¸â€‍" }, { value: "medium", label: "ط¸â€¦ط·ع¾ط¸ث†ط·آ³ط·آ·" }, { value: "hard", label: "ط·آµط·آ¹ط·آ¨" }]} value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)} />
            </div>
            <div className="w-44">
              <Select options={[{ value: "ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍", label: "ط¸ئ’ط¸â€‍ ط·آ§ط¸â€‍ط·آ£ط¸â€ ط¸ث†ط·آ§ط·آ¹" }, ...Object.entries(typeLabels).map(([v, l]) => ({ value: v, label: l }))]} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} />
            </div>
            <div className="w-44">
              <Select options={allTags.map((t) => ({ value: t, label: t === "ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍" ? "ط¸ئ’ط¸â€‍ ط·آ§ط¸â€‍ط¸ث†ط·آ³ط¸ث†ط¸â€¦" : t }))} value={tagFilter} onChange={(e) => setTagFilter(e.target.value)} />
            </div>
            <Button variant="ghost" onClick={() => { setDifficultyFilter("ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍"); setTypeFilter("ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍"); setTagFilter("ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍") }} rightIcon={<HiOutlineRefresh size={16} />}>
              ط·آ¥ط·آ¹ط·آ§ط·آ¯ط·آ© ط·ع¾ط·آ¹ط¸ظ¹ط¸ظ¹ط¸â€ 
            </Button>
          </div>

          {filtered.length === 0 ? (
            <EmptyState icon={HiOutlineFilter} title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط¸â€ ط·ع¾ط·آ§ط·آ¦ط·آ¬" description="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·آ£ط·آ³ط·آ¦ط¸â€‍ط·آ© ط·ع¾ط·آ·ط·آ§ط·آ¨ط¸â€ڑ ط¸â€¦ط·آ¹ط·آ§ط¸ظ¹ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط·ع¾ط·آµط¸ظ¾ط¸ظ¹ط·آ©" />
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><HiOutlineChartPie className="text-primary" size={20} />ط·ع¾ط¸ث†ط·آ²ط¸ظ¹ط·آ¹ ط·آ§ط¸â€‍ط·آµط·آ¹ط¸ث†ط·آ¨ط·آ©</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div dir="ltr" className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={difficultyDist} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                            {difficultyDist.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><HiOutlineTag className="text-primary" size={20} />ط·ع¾ط·آ­ط¸â€‍ط¸ظ¹ط¸â€‍ ط·آ§ط¸â€‍ط¸ث†ط·آ³ط¸ث†ط¸â€¦</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div dir="ltr" className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={tagDist}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip />
                          <Bar dataKey="value" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>ط·آ¬ط·آ¯ط¸ث†ط¸â€‍ ط·ع¾ط·آ­ط¸â€‍ط¸ظ¹ط¸â€‍ ط·آ§ط¸â€‍ط·آ£ط·آ³ط·آ¦ط¸â€‍ط·آ©</CardTitle>
                  <CardDescription>{filtered.length} ط·آ³ط·آ¤ط·آ§ط¸â€‍</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table columns={columns} data={filtered} />
                </CardContent>
              </Card>
            </>
          )}
        </>
      )}
    </div>
  )
}

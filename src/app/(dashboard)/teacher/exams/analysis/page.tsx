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
  primary: "#D97706",
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
  easy: { label: "سهل", color: COLORS.success, variant: "success" },
  medium: { label: "متوسط", color: COLORS.warning, variant: "warning" },
  hard: { label: "صعب", color: COLORS.error, variant: "error" },
}

const typeLabels: Record<string, string> = {
  "multiple-choice": "اختيار من متعدد",
  "true-false": "صواب/خطأ",
  "fill-blank": "ملء الفراغ",
  essay: "مقالي",
  ordering: "ترتيب",
  matching: "مطابقة",
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
          throw new Error("فشل تحميل التحليلات")
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
  const [difficultyFilter, setDifficultyFilter] = useState("الكل")
  const [typeFilter, setTypeFilter] = useState("الكل")
  const [tagFilter, setTagFilter] = useState("الكل")

  const examOptions = useMemo(() => [
    { value: "", label: "اختر الامتحان..." },
    ...mockExams.map((e) => ({ value: e.id, label: e.title })),
  ], [])

  const allTags = useMemo(() => {
    const tags = new Set(analysis.map((a) => a.tag))
    return ["الكل", ...Array.from(tags)]
  }, [analysis])

  const filtered = useMemo(() => {
    return analysis.filter((a) => {
      if (difficultyFilter !== "الكل" && a.difficulty !== difficultyFilter) return false
      if (typeFilter !== "الكل" && a.type !== typeFilter) return false
      if (tagFilter !== "الكل" && a.tag !== tagFilter) return false
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
    { title: "أصعب سؤال", value: hardest ? `${hardest.correctRate}%` : "-", icon: HiOutlineTrendingDown, color: "error" as const, subtitle: hardest?.questionText },
    { title: "أسهل سؤال", value: easiest ? `${easiest.correctRate}%` : "-", icon: HiOutlineTrendingUp, color: "success" as const, subtitle: easiest?.questionText },
    { title: "أكثر سؤال خطأ", value: mostMistaken ? `${mostMistaken.incorrectCount} خطأ` : "-", icon: HiOutlineExclamationCircle, color: "warning" as const, subtitle: mostMistaken?.questionText },
    { title: "متوسط الإجابات", value: filtered.length > 0 ? `${Math.round(filtered.reduce((s, a) => s + a.correctRate, 0) / filtered.length)}%` : "-", icon: HiOutlineChartSquareBar, color: "info" as const },
  ], [hardest, easiest, mostMistaken, filtered])

  const columns = [
    { key: "questionText", header: "السؤال", render: (a: QuestionAnalysis) => <span className="text-sm line-clamp-1 max-w-[200px]">{a.questionText}</span> },
    { key: "type", header: "النوع", render: (a: QuestionAnalysis) => <Badge variant="info" size="sm">{typeLabels[a.type] || a.type}</Badge> },
    { key: "difficulty", header: "الصعوبة", render: (a: QuestionAnalysis) => <Badge variant={difficultyConfig[a.difficulty].variant} size="sm">{difficultyConfig[a.difficulty].label}</Badge> },
    { key: "correctRate", header: "نسبة الصحة", render: (a: QuestionAnalysis) => (
      <div className="flex items-center gap-2">
        <div className="w-20 h-2 rounded-full bg-surface-tertiary overflow-hidden">
          <div className="h-full rounded-full bg-success transition-all" style={{ width: `${a.correctRate}%` }} />
        </div>
        <span className="text-xs font-medium">{a.correctRate}%</span>
      </div>
    )},
    { key: "incorrectCount", header: "خطأ", render: (a: QuestionAnalysis) => <span className="text-error">{a.incorrectCount}</span> },
    { key: "skippedCount", header: "تخطى", render: (a: QuestionAnalysis) => <span className="text-text-tertiary">{a.skippedCount}</span> },
    { key: "averageTime", header: "متوسط الوقت", render: (a: QuestionAnalysis) => (
      <span className="flex items-center gap-1"><HiOutlineClock size={14} className="text-text-tertiary" />{a.averageTime} ط«</span>
    )},
    { key: "tag", header: "الوسم", render: (a: QuestionAnalysis) => <Badge size="sm">{a.tag}</Badge> },
  ]

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <PageHeader title="تحليل الأسئلة" description="تحليل أداء الأسئلة والامتحانات" />
        <ErrorState description={error} onRetry={retry} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <Breadcrumb items={[{ label: "الامتحانات", href: "/teacher/exams" }, { label: "تحليل الأسئلة" }]} />
      <PageHeader title="تحليل الأسئلة" description="تحليل أداء الأسئلة والامتحانات" />

      <Card>
        <CardContent className="space-y-4">
          <Select label="اختر الامتحان" options={examOptions} value={selectedExamId} onChange={(e) => setSelectedExamId(e.target.value)} />
        </CardContent>
      </Card>

      {loading && (
        <div className="space-y-6">
          <StatsSkeleton count={4} />
          <TableSkeleton rows={5} columns={7} />
        </div>
      )}

      {!loading && !selectedExamId && (
        <EmptyState icon={HiOutlineChartSquareBar} title="اختر امتحاناً" description="يرجى اختيار امتحان لعرض تحليل الأسئلة" />
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
              <Select options={[{ value: "الكل", label: "كل الصعوبات" }, { value: "easy", label: "سهل" }, { value: "medium", label: "متوسط" }, { value: "hard", label: "صعب" }]} value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)} />
            </div>
            <div className="w-44">
              <Select options={[{ value: "الكل", label: "كل الأنواع" }, ...Object.entries(typeLabels).map(([v, l]) => ({ value: v, label: l }))]} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} />
            </div>
            <div className="w-44">
              <Select options={allTags.map((t) => ({ value: t, label: t === "الكل" ? "كل الوسوم" : t }))} value={tagFilter} onChange={(e) => setTagFilter(e.target.value)} />
            </div>
            <Button variant="ghost" onClick={() => { setDifficultyFilter("الكل"); setTypeFilter("الكل"); setTagFilter("الكل") }} rightIcon={<HiOutlineRefresh size={16} />}>
              إعادة تعيين
            </Button>
          </div>

          {filtered.length === 0 ? (
            <EmptyState icon={HiOutlineFilter} title="لا توجد نتائج" description="لا توجد أسئلة تطابق معايير التصفية" />
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><HiOutlineChartPie className="text-primary" size={20} />توزيع الصعوبة</CardTitle>
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
                    <CardTitle className="flex items-center gap-2"><HiOutlineTag className="text-primary" size={20} />تحليل الوسوم</CardTitle>
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
                  <CardTitle>جدول تحليل الأسئلة</CardTitle>
                  <CardDescription>{filtered.length} سؤال</CardDescription>
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

"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import {
  HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineEye, HiOutlineDuplicate,
  HiOutlineClipboardCheck, HiOutlineChartSquareBar, HiOutlineClock, HiOutlineAcademicCap,
} from "react-icons/hi"
import { PageHeader } from "@/components/ui/PageHeader"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { SearchInput } from "@/components/ui/SearchInput"
import { EmptyState } from "@/components/ui/EmptyState"
import Button from "@/components/ui/Button"
import { mockExams, mockCourses } from "@/lib/mock/data"

const statusCfg: Record<string, { label: string; variant: "success" | "error" | "default" }> = {
  active: { label: "نشط", variant: "success" },
  closed: { label: "مغلق", variant: "error" },
  draft: { label: "مسودة", variant: "default" },
}

const statuses = ["الكل", "active", "draft", "closed"]

export default function ExamsPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("الكل")

  const filtered = useMemo(() =>
    mockExams.filter((e) => {
      const q = search.toLowerCase()
      return (e.title.includes(q)) && (statusFilter === "الكل" || e.status === statusFilter)
    }), [search, statusFilter])

  return (
    <div className="space-y-6">
      <PageHeader
        title="الامتحانات"
        description="إدارة الامتحانات والاختبارات"
        breadcrumbs={[{ label: "لوحة التحكم", href: "/teacher" }, { label: "الامتحانات" }]}
        actions={
          <Link href="/teacher/exams/create">
            <Button variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />}>إضافة امتحان</Button>
          </Link>
        }
      />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard title="إجمالي الامتحانات" value={mockExams.length} icon={HiOutlineClipboardCheck} color="primary" trend={10} sparkline={[20, 25, 22, 30, 28, 35, 32, 40, 38, 42, 45, 48]} />
        <StatsCard title="الامتحانات النشطة" value={mockExams.filter((e) => e.status === "active").length} icon={HiOutlineChartSquareBar} color="success" trend={15} sparkline={[5, 8, 6, 12, 10, 15, 13, 18, 16, 20, 22, 25]} />
        <StatsCard title="متوسط الدرجات" value={`${Math.round(mockExams.reduce((s, e) => s + e.analytics.averageGrade, 0) / mockExams.length)}%`} icon={HiOutlineAcademicCap} color="info" />
        <StatsCard title="متوسط المدة" value={`${Math.round(mockExams.reduce((s, e) => s + e.duration, 0) / mockExams.length)} د`} icon={HiOutlineClock} color="warning" />
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-5">
        <SearchInput value={search} onChange={setSearch} placeholder="بحث عن امتحان..." className="sm:max-w-xs flex-1" />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 bg-card border border-border rounded-[16px] text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all appearance-none cursor-pointer ">
          {statuses.map((s) => (
            <option key={s} value={s}>{s === "الكل" ? "جميع الحالات" : statusCfg[s]?.label}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={HiOutlineClipboardCheck} title="لا توجد امتحانات" description="لم يتم العثور على امتحانات مطابقة للبحث" actionLabel="إضافة امتحان" onAction={() => router.push("/teacher/exams/create")} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((exam, i) => {
            const course = mockCourses.find((c) => c.id === exam.courseId)
            return (
              <motion.div key={exam.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <div className="group bg-card border border-border rounded-[24px] p-6  hover:-translate-y-0.5 hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)] transition-all duration-250 cursor-pointer h-full"
                  onClick={() => router.push(`/teacher/exams/${exam.id}`)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-[16px] bg-exams/10 border border-exams/20 flex items-center justify-center shrink-0">
                      <HiOutlineClipboardCheck className="w-5 h-5 text-exams" />
                    </div>
                    <Badge variant={statusCfg[exam.status]?.variant || "default"} size="sm">{statusCfg[exam.status]?.label}</Badge>
                  </div>
                  <h3 className="font-semibold text-text mb-0.5 truncate">{exam.title}</h3>
                  <p className="text-xs text-text-tertiary mb-4">{course?.title || "كورس عام"}</p>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {[
                      { label: "دقيقة", value: exam.duration },
                      { label: "درجة", value: exam.totalGrade },
                      { label: "سؤال", value: exam.questions.length },
                    ].map((s) => (
                      <div key={s.label} className="p-3 rounded-[14px] bg-card border border-border text-center">
                        <p className="font-bold text-text text-sm">{s.value}</p>
                        <p className="text-[10px] text-text-tertiary">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity duration-250">
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={(e) => { e.stopPropagation(); router.push(`/teacher/exams/${exam.id}`) }}
                        className="p-1.5 rounded-[10px] text-text-tertiary hover:text-primary hover:bg-primary/10 transition-all"><HiOutlineEye className="w-4 h-4" /></button>
                      <button type="button" onClick={(e) => { e.stopPropagation(); router.push(`/teacher/exams/${exam.id}`) }}
                        className="p-1.5 rounded-[10px] text-text-tertiary hover:text-warning hover:bg-warning/10 transition-all"><HiOutlinePencil className="w-4 h-4" /></button>
                      <button type="button" onClick={(e) => { e.stopPropagation(); toast.success("تم نسخ الامتحان") }}
                        className="p-1.5 rounded-[10px] text-text-tertiary hover:text-info hover:bg-info/10 transition-all"><HiOutlineDuplicate className="w-4 h-4" /></button>
                    </div>
                    <button type="button" onClick={(e) => { e.stopPropagation(); toast.success("تم حذف الامتحان") }}
                      className="p-1.5 rounded-[10px] text-text-tertiary hover:text-error hover:bg-error/10 transition-all"><HiOutlineTrash className="w-4 h-4" /></button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}

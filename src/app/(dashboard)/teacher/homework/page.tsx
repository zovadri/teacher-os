"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  HiOutlinePlus, HiOutlineBookOpen, HiOutlineClipboardList, HiOutlineClock,
  HiOutlineXCircle, HiOutlineDocumentText, HiOutlineEye,
} from "react-icons/hi"
import { PageHeader } from "@/components/ui/PageHeader"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { SearchInput } from "@/components/ui/SearchInput"
import { EmptyState } from "@/components/ui/EmptyState"
import Button from "@/components/ui/Button"
import { mockHomework, mockCourses } from "@/lib/mock/data"

const statusCfg: Record<string, { label: string; variant: "success" | "error" | "default" }> = {
  active: { label: "نشط", variant: "success" },
  closed: { label: "مغلق", variant: "error" },
  draft: { label: "مسودة", variant: "default" },
}

const typeCfg: Record<string, { label: string; variant: "primary" | "info" | "warning" | "success" }> = {
  quiz: { label: "اختبار", variant: "primary" },
  pdf: { label: "PDF", variant: "info" },
  image: { label: "صورة", variant: "warning" },
  word: { label: "Word", variant: "info" },
  video: { label: "فيديو", variant: "primary" },
  zip: { label: "مضغوط", variant: "warning" },
  writing: { label: "كتابي", variant: "success" },
  mixed: { label: "متنوع", variant: "warning" },
}

export default function HomeworkPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [courseFilter, setCourseFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filtered = useMemo(() =>
    mockHomework.filter((h) => {
      const q = search.toLowerCase()
      return (h.title.includes(q)) &&
        (statusFilter === "all" || h.status === statusFilter) &&
        (courseFilter === "all" || h.courseId === courseFilter) &&
        (typeFilter === "all" || h.type === typeFilter)
    }), [search, statusFilter, courseFilter, typeFilter])

  return (
    <div className="space-y-6">
      <PageHeader title="الواجبات" description="إدارة الواجبات المنزلية ومتابعة تسليم الطلاب"
        breadcrumbs={[{ label: "لوحة التحكم", href: "/teacher" }, { label: "الواجبات" }]}
        actions={<Link href="/teacher/homework/create"><Button variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />}>إضافة واجب</Button></Link>}
      />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard title="إجمالي الواجبات" value={mockHomework.length} icon={HiOutlineBookOpen} color="primary" trend={8} />
        <StatsCard title="نشط" value={mockHomework.filter((h) => h.status === "active").length} icon={HiOutlineClipboardList} color="success" />
        <StatsCard title="مغلق" value={mockHomework.filter((h) => h.status === "closed").length} icon={HiOutlineXCircle} color="error" />
        <StatsCard title="تحت الإعداد" value={mockHomework.filter((h) => h.status === "draft").length} icon={HiOutlineClock} color="warning" />
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-5 flex-wrap">
        <SearchInput value={search} onChange={setSearch} placeholder="بحث عن واجب..." className="sm:max-w-xs flex-1" />
        <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}
          className="px-4 py-2.5 bg-card border border-border rounded-[16px] text-sm text-text appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 ">
          <option value="all">جميع الكورسات</option>
          {mockCourses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2.5 bg-card border border-border rounded-[16px] text-sm text-text appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 ">
          <option value="all">جميع الأنواع</option>
          {Object.entries(typeCfg).map(([v, c]) => <option key={v} value={v}>{c.label}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 bg-card border border-border rounded-[16px] text-sm text-text appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 ">
          <option value="all">جميع الحالات</option>
          {Object.entries(statusCfg).map(([v, c]) => <option key={v} value={v}>{c.label}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={HiOutlineDocumentText} title="لا توجد واجبات" description="لم يتم العثور على واجبات مطابقة للبحث" actionLabel="إضافة واجب" onAction={() => router.push("/teacher/homework/create")} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((hw, i) => {
            const course = mockCourses.find((c) => c.id === hw.courseId)
            const submitted = hw.analytics.submitted
            const notSubmitted = hw.analytics.notSubmitted
            const total = submitted + notSubmitted
            return (
              <motion.div key={hw.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <div className="group bg-card border border-border rounded-[24px] p-6  hover:-translate-y-0.5 hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)] transition-all duration-250 cursor-pointer h-full"
                  onClick={() => router.push(`/teacher/homework/${hw.id}`)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-[16px] bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <HiOutlineBookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex gap-1.5">
                      <Badge variant={typeCfg[hw.type]?.variant || "primary"} size="sm">{typeCfg[hw.type]?.label}</Badge>
                      <Badge variant={statusCfg[hw.status]?.variant || "default"} size="sm">{statusCfg[hw.status]?.label}</Badge>
                    </div>
                  </div>
                  <h3 className="font-semibold text-text mb-0.5 truncate">{hw.title}</h3>
                  <p className="text-xs text-text-tertiary mb-4">{course?.title || "كورس عام"}</p>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {[
                      { label: "الموعد", value: hw.deadline.toLocaleDateString("ar-EG") },
                      { label: "تم التسليم", value: `${submitted}/${total}` },
                      { label: "متوسط الدرجة", value: hw.analytics.averageGrade },
                    ].map((s) => (
                      <div key={s.label} className="p-3 rounded-[14px] bg-card/40 border border-border text-center backdrop-blur">
                        <p className="font-bold text-text text-sm">{s.value}</p>
                        <p className="text-[10px] text-text-tertiary">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity duration-250">
                    <button type="button" onClick={(e) => { e.stopPropagation(); router.push(`/teacher/homework/${hw.id}`) }}
                      className="p-1.5 rounded-[10px] text-text-tertiary hover:text-primary hover:bg-primary/10 transition-all"><HiOutlineEye className="w-4 h-4" /></button>
                    <Badge variant={hw.allowResubmit ? "info" : "default"} size="sm">
                      {hw.allowResubmit ? `إعادة تسليم (${hw.maxResubmitCount})` : "تسليم مرة واحدة"}
                    </Badge>
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

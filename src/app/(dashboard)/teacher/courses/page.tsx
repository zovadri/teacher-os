"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import {
  HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineEye, HiOutlineEyeOff,
  HiOutlineStar, HiOutlineAcademicCap, HiOutlineBookOpen, HiOutlineUsers,
} from "react-icons/hi"
import { PageHeader } from "@/components/ui/PageHeader"
import { Badge } from "@/components/ui/Badge"
import { SearchInput } from "@/components/ui/SearchInput"
import { EmptyState } from "@/components/ui/EmptyState"
import Button from "@/components/ui/Button"
import { mockCourses } from "@/lib/mock/data"
import { formatCurrency } from "@/lib/utils"

const statusCfg: Record<string, { label: string; variant: "success" | "default" | "warning" | "error" | "info" }> = {
  published: { label: "منشور", variant: "success" },
  draft: { label: "مسودة", variant: "default" },
  "coming-soon": { label: "قريباً", variant: "warning" },
  archived: { label: "مؤرشف", variant: "error" },
  hidden: { label: "مخفي", variant: "info" },
}

const grades = ["الكل", "أولى ثانوي", "ثانية ثانوي", "ثالثة ثانوي"]
const statuses = ["الكل", "published", "draft", "coming-soon", "archived"]

export default function CoursesPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [gradeFilter, setGradeFilter] = useState("الكل")
  const [statusFilter, setStatusFilter] = useState("الكل")

  const filtered = useMemo(() =>
    mockCourses.filter((c) => {
      const q = search.toLowerCase()
      return (c.title.includes(q) || c.subject.includes(q)) &&
        (gradeFilter === "الكل" || c.grade === gradeFilter) &&
        (statusFilter === "الكل" || c.status === statusFilter)
    }), [search, gradeFilter, statusFilter])

  return (
    <div className="space-y-6">
      <PageHeader
        title="الكورسات"
        description="إدارة وتنظيم جميع الكورسات"
        breadcrumbs={[{ label: "لوحة التحكم", href: "/teacher" }, { label: "الكورسات" }]}
        actions={
          <Link href="/teacher/courses/create">
            <Button variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />}>إضافة كورس</Button>
          </Link>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <SearchInput value={search} onChange={setSearch} placeholder="بحث عن كورس..." className="sm:max-w-xs flex-1" />
        <select value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)}
          className="px-4 py-2.5 bg-card/60 backdrop-blur border border-border rounded-[16px] text-sm text-text appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)]">
          {grades.map((g) => <option key={g} value={g}>{g === "الكل" ? "جميع الصفوف" : g}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 bg-card/60 backdrop-blur border border-border rounded-[16px] text-sm text-text appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)]">
          {statuses.map((s) => <option key={s} value={s}>{s === "الكل" ? "جميع الحالات" : statusCfg[s]?.label}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={HiOutlineBookOpen} title="لا توجد كورسات" description="لم يتم العثور على كورسات مطابقة للبحث" actionLabel="إضافة كورس" onAction={() => router.push("/teacher/courses/create")} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((course, i) => (
            <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <div className="group bg-card/60 backdrop-blur-xl border border-border rounded-[24px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)] hover:-translate-y-0.5 hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)] transition-all duration-250 cursor-pointer h-full"
                onClick={() => router.push(`/teacher/courses/${course.id}`)}
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080B12]/70 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge variant={statusCfg[course.status]?.variant || "default"} size="sm">{statusCfg[course.status]?.label}</Badge>
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs text-white bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-[10px] border border-white/10">
                      <HiOutlineUsers className="w-3 h-3" />{course.studentsCount}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-white bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-[10px] border border-white/10">
                      <HiOutlineStar className="w-3 h-3 text-warning" />{course.rating}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-text mb-1 truncate">{course.title}</h3>
                  <p className="text-xs text-text-tertiary mb-3 line-clamp-2 leading-relaxed">{course.shortDescription}</p>
                  <div className="flex items-center gap-3 text-xs text-text-secondary">
                    <span className="flex items-center gap-1"><HiOutlineAcademicCap className="w-3.5 h-3.5" />{course.grade}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="flex items-center gap-1"><HiOutlineBookOpen className="w-3.5 h-3.5" />{course.lessonsCount} درس</span>
                  </div>
                  <div className="h-px bg-border my-3" />
                  <div className="flex items-center justify-between">
                    <div>
                      {course.discountPrice ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-text">{formatCurrency(course.discountPrice)}</span>
                          <span className="text-xs text-text-tertiary line-through">{formatCurrency(course.price)}</span>
                        </div>
                      ) : (
                        <span className="text-sm font-bold text-text">{course.isFree ? "مجاني" : formatCurrency(course.price)}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-250">
                      <button type="button" onClick={(e) => { e.stopPropagation(); router.push(`/teacher/courses/${course.id}`) }}
                        className="p-1.5 rounded-[10px] text-text-tertiary hover:text-primary hover:bg-primary/10 transition-all"><HiOutlinePencil className="w-4 h-4" /></button>
                      <button type="button" onClick={(e) => { e.stopPropagation(); router.push(`/teacher/courses/${course.id}`) }}
                        className="p-1.5 rounded-[10px] text-text-tertiary hover:text-info hover:bg-info/10 transition-all"><HiOutlineEye className="w-4 h-4" /></button>
                      <button type="button" onClick={(e) => { e.stopPropagation(); toast.success("تم إخفاء الكورس") }}
                        className="p-1.5 rounded-[10px] text-text-tertiary hover:text-warning hover:bg-warning/10 transition-all"><HiOutlineEyeOff className="w-4 h-4" /></button>
                      <button type="button" onClick={(e) => { e.stopPropagation(); toast.success("تم حذف الكورس") }}
                        className="p-1.5 rounded-[10px] text-text-tertiary hover:text-error hover:bg-error/10 transition-all"><HiOutlineTrash className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

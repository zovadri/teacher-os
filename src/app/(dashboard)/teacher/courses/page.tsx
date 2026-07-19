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
  HiOutlineEyeOff,
  HiOutlineStar,
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineUsers,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { mockCourses } from "@/lib/mock/data"
import { formatCurrency, cn } from "@/lib/utils"
import { Badge } from "@/components/ui/Badge"
import { SearchInput } from "@/components/ui/SearchInput"
import { EmptyState } from "@/components/ui/EmptyState"

const statusBadgeVariant: Record<string, "success" | "neutral" | "warning" | "error" | "info"> = {
  published: "success",
  draft: "neutral",
  "coming-soon": "warning",
  archived: "error",
  hidden: "info",
}

const statusLabels: Record<string, string> = {
  published: "منشور",
  draft: "مسودة",
  "coming-soon": "قريباً",
  archived: "مؤرشف",
  hidden: "مخفي",
}

const grades = ["الكل", "أولى ثانوي", "ثانية ثانوي", "ثالثة ثانوي"]
const statuses = ["الكل", "published", "draft", "coming-soon", "archived"]

export default function CoursesPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [gradeFilter, setGradeFilter] = useState("الكل")
  const [statusFilter, setStatusFilter] = useState("الكل")

  const filtered = useMemo(() => {
    return mockCourses.filter((c) => {
      const matchSearch = c.title.includes(search) || c.subject.includes(search)
      const matchGrade = gradeFilter === "الكل" || c.grade === gradeFilter
      const matchStatus = statusFilter === "الكل" || c.status === statusFilter
      return matchSearch && matchGrade && matchStatus
    })
  }, [search, gradeFilter, statusFilter])

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="إدارة الكورسات" subtitle="عرض وإدارة جميع الكورسات" />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchInput value={search} onChange={setSearch} placeholder="بحث عن كورس..." />
        </div>
        <div className="flex gap-3">
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="px-4 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
          >
            {grades.map((g) => (
              <option key={g} value={g}>{g === "الكل" ? "جميع الصفوف" : g}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s === "الكل" ? "جميع الحالات" : statusLabels[s]}</option>
            ))}
          </select>
          <Link href="/teacher/courses/create">
            <button type="button" className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors shadow-sm">
              <HiOutlinePlus size={18} />
              <span>إضافة كورس جديد</span>
            </button>
          </Link>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={HiOutlineBookOpen}
          title="لا توجد كورسات"
          description="لم يتم العثور على أي كورسات تطابق معايير البحث"
          action={
            <Link href="/teacher/courses/create">
              <button type="button" className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors">
                إضافة كورس جديد
              </button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/teacher/courses/${course.id}`}>
                <div className="bg-surface rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
                  <div className="relative h-40 overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge variant={statusBadgeVariant[course.status]}>
                        {statusLabels[course.status]}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                      <span className="flex items-center gap-1 text-xs text-white bg-black/40 px-2 py-1 rounded-full">
                        <HiOutlineUsers size={14} />
                        {course.studentsCount}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-white bg-black/40 px-2 py-1 rounded-full">
                        <HiOutlineStar size={14} />
                        {course.rating}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-text mb-1 line-clamp-1">{course.title}</h3>
                    <p className="text-xs text-text-tertiary mb-3 line-clamp-2">{course.shortDescription}</p>
                    <div className="flex items-center gap-3 text-xs text-text-secondary">
                      <span className="flex items-center gap-1">
                        <HiOutlineAcademicCap size={14} />
                        {course.grade}
                      </span>
                      <span className="flex items-center gap-1">
                        <HiOutlineBookOpen size={14} />
                        {course.lessonsCount} درس
                      </span>
                    </div>
                    <hr className="border-border my-3" />
                    <div className="flex items-center justify-between">
                      <div>
                        {course.discountPrice ? (
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-text">{formatCurrency(course.discountPrice)}</span>
                            <span className="text-xs text-text-tertiary line-through">{formatCurrency(course.price)}</span>
                          </div>
                        ) : (
                          <span className={cn("text-sm font-bold", course.isFree ? "text-success" : "text-text")}>
                            {course.isFree ? "مجاني" : formatCurrency(course.price)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" dir="ltr">
                        <button type="button" onClick={(e) => { e.stopPropagation(); router.push(`/teacher/courses/${course.id}`) }} className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="تعديل">
                          <HiOutlinePencil size={16} />
                        </button>
                        <button type="button" onClick={(e) => { e.stopPropagation(); router.push(`/teacher/courses/${course.id}`) }} className="p-1.5 text-text-tertiary hover:text-info hover:bg-info/5 rounded-lg transition-colors" title="عرض">
                          <HiOutlineEye size={16} />
                        </button>
                        <button type="button" onClick={(e) => { e.stopPropagation(); toast.success("تم إخفاء الكورس بنجاح") }} className="p-1.5 text-text-tertiary hover:text-warning hover:bg-warning/5 rounded-lg transition-colors" title="إخفاء">
                          <HiOutlineEyeOff size={16} />
                        </button>
                        <button type="button" onClick={(e) => { e.stopPropagation(); toast.success("تم حذف الكورس بنجاح") }} className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors" title="حذف">
                          <HiOutlineTrash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

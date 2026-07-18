"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { HiAcademicCap, HiStar, HiUserGroup, HiFilter, HiSearch, HiAdjustments } from "react-icons/hi"
import { mockCourses } from "@/lib/mock/data"
import { formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/Badge"
import { SearchInput } from "@/components/ui/SearchInput"

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const grades = ["الكل", "أولى ثانوي", "ثانية ثانوي", "ثالثة ثانوي"]
const sortOptions = [
  { value: "popular", label: "الأكثر شيوعاً" },
  { value: "rating", label: "الأعلى تقييماً" },
  { value: "newest", label: "الأحدث" },
  { value: "price-low", label: "السعر: من الأقل" },
  { value: "price-high", label: "السعر: من الأعلى" },
  { value: "students", label: "عدد الطلاب" },
]

const statusLabels: Record<string, { label: string; variant: "primary" | "success" | "warning" | "neutral" | "error" | "info" | "premium" }> = {
  published: { label: "منشور", variant: "success" },
  "coming-soon": { label: "قريباً", variant: "warning" },
  draft: { label: "مسودة", variant: "neutral" },
  hidden: { label: "مخفي", variant: "neutral" },
}

export default function CoursesPage() {
  const [activeGrade, setActiveGrade] = useState("الكل")
  const [sortBy, setSortBy] = useState("popular")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const filteredAndSortedCourses = useMemo(() => {
    let result = mockCourses.filter((course) => {
      if (activeGrade !== "الكل" && course.grade !== activeGrade) return false
      if (searchQuery && !course.title.includes(searchQuery) && !course.shortDescription.includes(searchQuery)) return false
      return true
    })

    switch (sortBy) {
      case "popular": return result.sort((a, b) => (b.studentsCount ?? 0) - (a.studentsCount ?? 0))
      case "rating": return result.sort((a, b) => b.rating - a.rating)
      case "newest": return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      case "price-low": return result.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price))
      case "price-high": return result.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price))
      case "students": return result.sort((a, b) => (b.studentsCount ?? 0) - (a.studentsCount ?? 0))
      default: return result
    }
  }, [activeGrade, sortBy, searchQuery])

  return (
    <>
      <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-gradient-to-br from-primary/5 via-surface to-surface pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-6">
              <HiAcademicCap size={14} /> الكورسات المتاحة
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              كورسات <span className="text-primary">اللغة العربية</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              اختر الكورس المناسب لك من بين مجموعة متكاملة من كورسات النحو والصرف والبلاغة لجميع المراحل الثانوية.
            </p>
            <div className="max-w-lg mx-auto">
              <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="ابحث عن كورس بالاسم أو الوصف..." />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-20 z-30 bg-surface/80 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-surface-tertiary text-text-secondary hover:bg-primary/10 hover:text-primary transition-all">
              <HiAdjustments size={14} /> {showFilters ? "إخفاء الفلتر" : "فلتر"}
            </button>
            <div className="flex items-center gap-2 text-sm text-text-tertiary mr-auto">
              <span className="font-semibold text-text">{filteredAndSortedCourses.length}</span> كورس
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border bg-surface text-text focus:outline-none focus:border-primary transition-colors"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-border">
              <HiFilter className="text-text-tertiary" size={16} />
              {grades.map((g) => (
                <button key={g} onClick={() => setActiveGrade(g)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${activeGrade === g ? "bg-primary text-white" : "bg-surface-tertiary text-text-secondary hover:bg-primary/10"}`}>
                  {g}
                </button>
              ))}
              {["published", "coming-soon"].map((s) => (
                <button key={s} onClick={() => {}} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-surface-tertiary text-text-secondary opacity-50 cursor-not-allowed">
                  {s === "published" ? "المنشورة" : "القادمة"}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedCourses.map((course, i) => (
              <motion.div key={course.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
                <Link href={`/courses/${course.id}`} className="group block rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all h-full flex flex-col">
                  <div className="relative h-44 overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-3 right-3">
                      <Badge variant="neutral" size="sm">{course.grade}</Badge>
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge variant={statusLabels[course.status]?.variant || "neutral"} size="sm">{statusLabels[course.status]?.label || course.status}</Badge>
                    </div>
                    {course.discountPrice && course.status === "published" && (
                      <div className="absolute bottom-3 right-3">
                        <Badge variant="primary" size="sm">خصم {Math.round((1 - course.discountPrice / course.price) * 100)}%</Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                    <p className="text-xs text-text-secondary mb-3 line-clamp-2 flex-1">{course.shortDescription}</p>
                    <div className="flex items-center gap-1 text-yellow-500 mb-2">
                      <HiStar size={14} />
                      <span className="text-xs font-medium text-text">{course.rating}</span>
                      <span className="text-xs text-text-tertiary">({course.studentsCount} طالب)</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-1 text-xs text-text-secondary">
                        <HiUserGroup size={14} />
                        <span>{course.lessonsCount} درس</span>
                      </div>
                      <div className="text-left">
                        {course.isFree ? (
                          <span className="text-sm font-bold text-success">مجاني</span>
                        ) : course.discountPrice ? (
                          <>
                            <span className="text-xs text-text-tertiary line-through ml-1">{formatCurrency(course.price)}</span>
                            <span className="text-sm font-bold text-primary">{formatCurrency(course.discountPrice)}</span>
                          </>
                        ) : (
                          <span className="text-sm font-bold text-primary">{formatCurrency(course.price)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          {filteredAndSortedCourses.length === 0 && (
            <div className="text-center py-20">
              <HiAcademicCap className="mx-auto text-text-tertiary mb-4" size={48} />
              <p className="text-text-secondary mb-2">لا توجد كورسات تطابق بحثك.</p>
              <button onClick={() => { setSearchQuery(""); setActiveGrade("الكل") }} className="text-primary text-sm font-medium hover:underline">إعادة ضبط الفلتر</button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineSearch, HiOutlineUserGroup, HiOutlineBookOpen,
  HiOutlineAcademicCap, HiOutlineCash, HiOutlineStar,
  HiOutlineUsers, HiOutlineShieldCheck, HiOutlineClock,
  HiOutlineChevronDown, HiOutlineX,
} from "react-icons/hi"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"

interface SearchResult {
  id: string; name: string; category: string; subtitle: string; detail: string; status?: string
}

const allData: SearchResult[] = [
  ...["أحمد محمد", "مريم أحمد", "يوسف علي", "سارة خالد", "عمر حسن", "ندى سامي", "عبدالرحمن نور", "ليلى إبراهيم", "محمد كريم", "هند مصطفى", "خالد سامي", "نورا أحمد", "جهاد علي", "رنا سعيد", "محمود جلال"].map((n, i) => ({
    id: `s${i}`, name: n, category: "الطلاب", subtitle: `مجموعة ${(i % 4) + 1}`, detail: `0100${String(1234567 + i).slice(0, 7)}`, status: i % 3 === 0 ? "نشط" : "منتظم"
  })),
  ...["الكيمياء", "الفيزياء", "الرياضيات", "العربي", "الإنجليزي", "الأحياء", "التاريخ", "الجغرافيا"].map((n, i) => ({
    id: `c${i}`, name: n, category: "الكورسات", subtitle: `${20 + i * 3} طالب`, detail: `${(i + 1) * 1500} ج.م`, status: i % 2 === 0 ? "متاح" : "مكتمل"
  })),
  ...["امتحان الكيمياء", "امتحان الفيزياء", "امتحان الرياضيات", "امتحان العربي", "امتحان الإنجليزي", "امتحان الأحياء"].map((n, i) => ({
    id: `e${i}`, name: n, category: "الامتحانات", subtitle: `2026-07-${10 + i}`, detail: `${15 + i * 5} سؤال`, status: i < 3 ? "منشور" : "مسودة"
  })),
  ...["فاتورة أحمد محمد", "فاتورة مريم أحمد", "فاتورة يوسف علي", "فاتورة سارة خالد", "قسط عمر حسن", "قسط ندى سامي", "فاتورة عبدالرحمن نور", "قسط ليلى إبراهيم", "فاتورة محمد كريم", "قسط هند مصطفى"].map((n, i) => ({
    id: `f${i}`, name: n, category: "الفواتير", subtitle: `${2000 + i * 500} ج.م`, detail: `2026-07-${10 + (i % 20)}`, status: i % 3 === 0 ? "مدفوع" : i % 3 === 1 ? "معلق" : "متأخر"
  })),
  ...["كود خصم 10%", "كود خصم 15%", "كود خصم 20%", "كود خصم 5%", "كود خصم 25%", "كود خصم 50%", "كود خصم 30%", "كود مجاني"].map((n, i) => ({
    id: `k${i}`, name: n, category: "الأكواد", subtitle: `EXP: 2026-12-${(i % 28) + 1}`, detail: `استخدم ${i * 15} مرة`, status: i < 5 ? "نشط" : "منتهي"
  })),
  ...[{ n: "والد أحمد", c: 3 }, { n: "والدة مريم", c: 2 }, { n: "والد يوسف", c: 4 }, { n: "والدة سارة", c: 1 }, { n: "والد عمر", c: 2 }, { n: "والدة ندى", c: 3 }, { n: "والد عبدالرحمن", c: 2 }, { n: "والدة ليلى", c: 1 }, { n: "والد محمد", c: 3 }, { n: "والدة هند", c: 2 }].map((p, i) => ({
    id: `p${i}`, name: p.n, category: "أولياء الأمور", subtitle: `${p.c} أبناء`, detail: `0100${String(5550000 + i * 111).slice(0, 7)}`, status: "نشط"
  })),
  ...[{ n: "أ. خالد صقر", r: "مدرس كيمياء" }, { n: "أ. أحمد سمير", r: "مدرس فيزياء" }, { n: "أ. نبيل إبراهيم", r: "مدرس رياضيات" }, { n: "أ. محمد صلاح", r: "مدرس عربي" }, { n: "أ. أحمد فريد", r: "مدرس إنجليزي" }, { n: "أ. مينا مجدي", r: "مدير أكاديمي" }].map((st, i) => ({
    id: `st${i}`, name: st.n, category: "الموظفين", subtitle: st.r, detail: `فرع رئيسي`, status: "نشط"
  })),
]

const categories = ["الكل", "الطلاب", "الكورسات", "الامتحانات", "الفواتير", "الأكواد", "أولياء الأمور", "الموظفين"]

const categoryIcons: Record<string, React.ElementType> = {
  الطلاب: HiOutlineUserGroup, الكورسات: HiOutlineBookOpen, الامتحانات: HiOutlineAcademicCap,
  الفواتير: HiOutlineCash, الأكواد: HiOutlineStar, "أولياء الأمور": HiOutlineUsers, الموظفين: HiOutlineShieldCheck,
}

const categoryRouteMap: Record<string, string> = {
  الطلاب: "/teacher/students",
  الكورسات: "/teacher/courses",
  الامتحانات: "/teacher/exams",
  الفواتير: "/teacher/finance",
  الأكواد: "/teacher/codes",
  "أولياء الأمور": "/teacher/parents",
  الموظفين: "/teacher/staff",
}

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.03 } } }
const itemVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }

export default function AdvancedSearchPage() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("الكل")
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const results = useMemo(() => {
    if (!query.trim()) return { filtered: [], counts: {} as Record<string, number>, total: 0 }
    const q = query.toLowerCase()
    const filtered = allData.filter((r) => r.name.includes(q) || r.subtitle.includes(q) || r.detail.includes(q))
    const counts: Record<string, number> = {}
    filtered.forEach((r) => { counts[r.category] = (counts[r.category] || 0) + 1 })
    return { filtered, counts, total: filtered.length }
  }, [query])

  const displayedResults = useMemo(() => {
    if (activeCategory === "الكل") return results.filtered
    return results.filtered.filter((r) => r.category === activeCategory)
  }, [results, activeCategory])

  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {}
    if (activeCategory === "الكل") {
      displayedResults.forEach((r) => {
        if (!groups[r.category]) groups[r.category] = []
        if (groups[r.category].length < 5) groups[r.category].push(r)
      })
    } else {
      groups[activeCategory] = displayedResults
    }
    return groups
  }, [displayedResults, activeCategory])

  const handleSearch = (q: string) => {
    setQuery(q)
    if (q.trim() && !recentSearches.includes(q)) {
      setRecentSearches((prev) => [q, ...prev].slice(0, 5))
    }
  }

  return (
    <div className="min-h-screen">
      <PageHeader title="البحث المتقدم" description="ابحث في الطلاب، الكورسات، الامتحانات، الفواتير، الأكواد، أولياء الأمور، الموظفين" />
      <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="relative max-w-2xl mx-auto w-full">
            <HiOutlineSearch className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
            <input value={query} onChange={(e) => handleSearch(e.target.value)}
              placeholder="ابحث عن طالب، كورس، امتحان، فاتورة..."
              className="w-full pr-12 pl-4 py-3.5 bg-surface border border-border rounded-2xl text-base text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-sm"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-text-tertiary hover:text-text transition-colors"
              ><HiOutlineX className="w-4 h-4" /></button>
            )}
          </motion.div>

          {recentSearches.length > 0 && !query && (
            <motion.div variants={itemVariants} className="max-w-2xl mx-auto w-full">
              <div className="flex items-center gap-2 mb-2">
                <HiOutlineClock className="w-4 h-4 text-text-tertiary" />
                <span className="text-xs text-text-tertiary font-medium">عمليات البحث الأخيرة</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((s) => (
                  <button type="button" key={s} onClick={() => setQuery(s)}
                    className="px-3 py-1.5 bg-surface-secondary border border-border rounded-lg text-xs text-text-secondary hover:bg-surface-tertiary transition-all"
                  >{s}</button>
                ))}
              </div>
            </motion.div>
          )}

          {query && (
            <>
              <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button type="button" key={cat} onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${activeCategory === cat ? "border-primary bg-primary/10 text-primary" : "border-border text-text-tertiary hover:bg-surface-secondary"}`}
                  >{cat}{cat !== "الكل" && results.counts[cat] ? ` (${results.counts[cat]})` : ""}</button>
                ))}
              </motion.div>

              <motion.div variants={itemVariants} className="text-xs text-text-tertiary">
                {results.total} نتيجة - 0.42 ثانية
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                {Object.entries(groupedResults).map(([category, items]) => (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {categoryIcons[category] && <span>{(() => { const Icon = categoryIcons[category]; return <Icon className="w-4 h-4 text-primary" /> })()}</span>}
                        {category}
                        {activeCategory === "الكل" && results.counts[category] > 5 && (
                          <button type="button" onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                            className="mr-auto text-xs text-primary hover:text-primary-dark transition-colors"
                          >{expandedCategory === category ? "عرض أقل" : `عرض الكل (${results.counts[category]})`}</button>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {(expandedCategory === category ? results.filtered.filter((r) => r.category === category) : items).map((r) => {
                          const route = categoryRouteMap[r.category]
                          const content = (
                            <>
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                                  {r.name.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-text truncate">{r.name}</p>
                                  <p className="text-xs text-text-tertiary truncate">{r.subtitle} - {r.detail}</p>
                                </div>
                              </div>
                              {r.status && <Badge variant="default" size="sm">{r.status}</Badge>}
                            </>
                          )
                          return route ? (
                            <Link key={r.id} href={`${route}/${r.id}`} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-surface-secondary transition-colors">
                              {content}
                            </Link>
                          ) : (
                            <div key={r.id} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-surface-secondary transition-colors">
                              {content}
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {results.filtered.length === 0 && (
                  <div className="text-center py-12">
                    <HiOutlineSearch className="w-12 h-12 mx-auto text-text-tertiary mb-3" />
                    <p className="text-sm text-text-tertiary">لا توجد نتائج لـ &quot;{query}&quot;</p>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}

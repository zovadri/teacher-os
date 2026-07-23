"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiSearch, HiDownload, HiEye, HiDocument, HiDocumentText,
  HiBookOpen, HiVideoCamera, HiOutlineDocument, HiOutlineFilter,
  HiOutlineClock, HiOutlineStar, HiChevronDown
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { toast } from "react-hot-toast"

interface Material {
  id: string
  title: string
  description: string
  subject: string
  type: "pdf" | "video" | "book" | "exam" | "review"
  size: string
  downloads: number
  date: string
}

const allMaterials: Material[] = [
  { id: "m1", title: "مذكرة الكيمياء - الباب الأول", description: "شرح وافي للعناصر الانتقالية مع أسئلة محلولة", subject: "الكيمياء", type: "pdf", size: "12.5 MB", downloads: 2341, date: "2026-07-15" },
  { id: "m2", title: "قوانين الفيزياء كاملة", description: "جميع قوانين الكهربية والتيار المتردد في 10 صفحات", subject: "الفيزياء", type: "pdf", size: "3.2 MB", downloads: 1876, date: "2026-07-14" },
  { id: "m3", title: "المراجعة النهائية - التفاضل", description: "مراجعة شاملة على التفاضل مع 50 سؤالاً", subject: "الرياضيات", type: "review", size: "8.1 MB", downloads: 3102, date: "2026-07-12" },
  { id: "m4", title: "كتاب الشرح - النحو المبسط", description: "شرح وافٍ لقواعد النحو العربي للمرحلة الثانوية", subject: "العربي", type: "book", size: "25.4 MB", downloads: 4567, date: "2026-07-10" },
  { id: "m5", title: "فيديو شرح - الباب الثالث كيمياء", description: "شرح تفصيلي للأحماض والقواعد مع تجارب عملية", subject: "الكيمياء", type: "video", size: "180 MB", downloads: 5231, date: "2026-07-18" },
  { id: "m6", title: "امتحانات المحافظات - كيمياء", description: "نماذج امتحانات المحافظات للأعوام السابقة", subject: "الكيمياء", type: "exam", size: "4.8 MB", downloads: 8902, date: "2026-07-08" },
  { id: "m7", title: "مذكرة الجرامر - English", description: "جميع قواعد اللغة الإنجليزية في 30 صفحة", subject: "الإنجليزي", type: "pdf", size: "5.6 MB", downloads: 6543, date: "2026-07-16" },
  { id: "m8", title: "مراجعة ليلة الامتحان - فيزياء", description: "أهم المسائل المتوقعة مع الحلول النموذجية", subject: "الفيزياء", type: "review", size: "6.3 MB", downloads: 4321, date: "2026-07-13" },
  { id: "m9", title: "فيديو تجارب كيميائية", description: "تجارب تفاعلية لجميع تفاعلات المنهج", subject: "الكيمياء", type: "video", size: "250 MB", downloads: 3765, date: "2026-07-17" },
  { id: "m10", title: "امتحانات شهر مارس", description: "نماذج امتحانات شهرية مجمعة لجميع المواد", subject: "عام", type: "exam", size: "9.2 MB", downloads: 7210, date: "2026-07-05" },
  { id: "m11", title: "كتاب التمارين - الرياضيات", description: "تمارين وتدريبات على التفاضل والتكامل", subject: "الرياضيات", type: "book", size: "18.7 MB", downloads: 2987, date: "2026-07-09" },
  { id: "m12", title: "مذكرة البلاغة", description: "تلخيص شامل لعلم البلاغة مع الأمثلة", subject: "العربي", type: "pdf", size: "4.1 MB", downloads: 5432, date: "2026-07-11" },
]

const categories = ["الكل", "مذكرات", "كتب", "مراجعات", "فيديوهات", "اختبارات"]
const typeMap: Record<string, string> = { pdf: "مذكرات", video: "فيديوهات", book: "كتب", exam: "اختبارات", review: "مراجعات" }
const iconMap: Record<string, typeof HiDocument> = {
  pdf: HiDocumentText, video: HiVideoCamera, book: HiBookOpen, exam: HiDocument, review: HiOutlineDocument,
}
const subjectColors: Record<string, string> = {
  الكيمياء: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  الفيزياء: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  الرياضيات: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  العربي: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  الإنجليزي: "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
  عام: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
}

export default function NotesPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("الكل")
  const [sort, setSort] = useState<"newest" | "popular" | "subject">("newest")

  const filtered = useMemo(() => {
    let result = allMaterials
    if (category !== "الكل") {
      const targetType = Object.entries(typeMap).find(([, v]) => v === category)?.[0]
      if (targetType) result = result.filter((m) => m.type === targetType)
    }
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((m) => m.title.includes(q) || m.subject.includes(q) || m.description.includes(q))
    }
    if (sort === "newest") result = [...result].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    else if (sort === "popular") result = [...result].sort((a, b) => b.downloads - a.downloads)
    else if (sort === "subject") result = [...result].sort((a, b) => a.subject.localeCompare(b.subject))
    return result
  }, [search, category, sort])

  const handleDownload = (material: Material) => {
    if (material.type === "video") {
      toast.success("تمت إضافة الفيديو إلى قائمة المشاهدة!")
    } else {
      toast.success(`جاري تحميل "${material.title}"...`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface to-surface-secondary">
      <DashboardHeader />
      <div className="p-6 md:p-8 lg:p-10 max-w-5xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-text">المكتبة</h1>
          <p className="text-sm text-text-secondary mt-1">مذكرات، كتب، فيديوهات، ومراجعات لمساعدتك على التفوق</p>
        </motion.div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <HiSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث في المكتبة..."
              className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
          </div>
          <div className="flex gap-1 bg-surface-secondary rounded-xl p-1 border border-border overflow-x-auto">
            {categories.map((cat) => (
              <button key={cat} type="button" onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${category === cat ? "bg-surface text-primary shadow-sm" : "text-text-tertiary hover:text-text"}`}>
                {cat}
              </button>
            ))}
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value as string)}
            className="px-3 py-2 rounded-xl bg-surface border border-border text-xs text-text focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer">
            <option value="newest">الأحدث</option>
            <option value="popular">الأكثر تحميلاً</option>
            <option value="subject">الموضوع</option>
          </select>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((material, i) => {
              const Icon = iconMap[material.type]
              const subColor = subjectColors[material.subject] || "bg-gray-100 text-gray-600"
              return (
                <motion.div key={material.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.02 }}
                  className="bg-surface rounded-2xl border border-border/60 p-6 hover:border-primary/30 hover:shadow-sm transition-all flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-surface-secondary flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${subColor}`}>{material.subject}</span>
                  </div>
                  <h3 className="font-semibold text-text text-sm leading-snug">{material.title}</h3>
                  <p className="text-xs text-text-secondary mt-1 flex-1">{material.description}</p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                    <div className="flex items-center gap-2 text-[10px] text-text-tertiary">
                      <span className="flex items-center gap-1"><HiOutlineClock className="w-3 h-3" />{material.date}</span>
                      <span className="flex items-center gap-1"><HiDownload className="w-3 h-3" />{material.downloads}</span>
                    </div>
                    <span className="text-[10px] text-text-tertiary">{material.size}</span>
                  </div>
                  <button type="button" onClick={() => handleDownload(material)}
                    className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-primary/5 hover:bg-primary/10 text-primary text-xs font-medium transition-colors">
                    {material.type === "video" ? <HiEye className="w-3.5 h-3.5" /> : <HiDownload className="w-3.5 h-3.5" />}
                    {material.type === "video" ? "مشاهدة" : "تحميل"}
                  </button>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-text-tertiary">
            <HiSearch className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>لا توجد نتائج للبحث</p>
          </div>
        )}
      </div>
    </div>
  )
}

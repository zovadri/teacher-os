"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { HiAcademicCap, HiSearch, HiChevronDown, HiPhone, HiMail, HiTag } from "react-icons/hi"
import { mockFaq } from "@/lib/mock/data"
import { SearchInput } from "@/components/ui/SearchInput"

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("الكل")
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const categories = useMemo(() => ["الكل", ...Array.from(new Set(mockFaq.map((f) => f.category)))], [])

  const filteredFAQs = useMemo(() => {
    return mockFaq.filter((faq) => {
      if (activeCategory !== "الكل" && faq.category !== activeCategory) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return faq.question.includes(q) || faq.answer.includes(q)
      }
      return true
    })
  }, [activeCategory, searchQuery])

  const groupedFAQs = useMemo(() => {
    const groups: Record<string, typeof mockFaq> = {}
    filteredFAQs.forEach((faq) => {
      if (!groups[faq.category]) groups[faq.category] = []
      groups[faq.category].push(faq)
    })
    return groups
  }, [filteredFAQs])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <>
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-gradient-to-br from-primary/5 via-surface to-surface pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
             <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-6 backdrop-blur border border-primary/20">
                <HiAcademicCap size={14} /> الأسئلة الشائعة
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="text-primary">الأسئلة</span> الشائعة
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
                إجابات شاملة لأكثر الأسئلة شيوعاً حول المنصة والكورسات والمدفوعات والدعم الفني.
              </p>
            <div className="max-w-lg mx-auto">
              <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="ابحث عن إجابة لسؤالك..." />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-20 z-30 bg-[#080B12]/80 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 overflow-x-auto">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <HiTag className="text-text-tertiary ml-2 shrink-0" size={16} />
            {categories.map((cat) => (
              <button type="button" key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-1.5 text-xs font-medium rounded-[16px] transition-all ${activeCategory === cat ? "bg-primary text-white shadow-[0_0_12px_rgba(91,124,255,0.3)]" : "bg-card text-text-secondary border border-border hover:border-primary/20"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-20">
              <HiAcademicCap className="mx-auto text-text-tertiary mb-4" size={48} />
              <p className="text-text-secondary mb-2">لا توجد نتائج مطابقة لبحثك.</p>
              <button type="button" onClick={() => { setSearchQuery(""); setActiveCategory("الكل") }} className="text-primary text-sm font-medium hover:underline">إعادة ضبط البحث</button>
            </div>
          ) : (
            <div className="space-y-10">
              {Object.entries(groupedFAQs).map(([category, items]) => (
                <motion.div key={category} {...fadeUp}>
                  <h2 className="text-xl font-bold mb-6 pb-2 border-b border-border flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {category}
                    <span className="text-sm text-text-tertiary font-normal">({items.length})</span>
                  </h2>
                  <div className="space-y-3">
                    {items.map((faq, i) => (
                      <motion.div key={faq.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                        <button type="button"
                          onClick={() => toggleItem(faq.id)}
                          className="w-full text-right p-5 rounded-[24px] border border-border bg-card shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.03)] hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between gap-4"
                        >
                          <span className="font-medium text-sm">{faq.question}</span>
                          <HiChevronDown size={16} className={`text-text-tertiary transition-transform shrink-0 ${openItems.has(faq.id) ? "rotate-180" : ""}`} />
                        </button>
                        {openItems.has(faq.id) && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-4 pb-4 pt-2 text-sm text-text-secondary leading-relaxed">
                            {faq.answer}
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <motion.div {...fadeUp}>
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <HiAcademicCap className="text-primary" size={32} />
            </div>
            <h2 className="text-[28px] font-bold mb-4">لم تجد إجابة لسؤالك؟</h2>
            <p className="text-text-secondary mb-8 max-w-lg mx-auto text-[15px]">
              فريق الدعم الفني جاهز لمساعدتك. تواصل معنا وسنرد عليك في أقرب وقت ممكن.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="px-6 py-3 bg-primary text-white font-medium rounded-[16px] shadow-[0_0_20px_rgba(91,124,255,0.15)] hover:shadow-[0_0_30px_rgba(91,124,255,0.3)] hover:brightness-110 transition-all text-[15px]">
                اتصل بنا
              </Link>
              <a href="tel:+201000000000" className="px-6 py-3 border border-border text-text-secondary font-medium rounded-[16px] hover:bg-surface-tertiary hover:text-text transition-all text-[15px] inline-flex items-center gap-2">
                <HiPhone size={16} /> +20 100 000 0000
              </a>
            </div>
            <div className="mt-6">
              <a href="mailto:support@teacher-os.com" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors">
                <HiMail size={16} /> support@teacher-os.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

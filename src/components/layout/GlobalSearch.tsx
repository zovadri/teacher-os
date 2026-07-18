"use client"

import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineSearch,
  HiOutlineUser,
  HiOutlineBookOpen,
  HiOutlineChat,
  HiOutlineAcademicCap,
} from "react-icons/hi"
import { cn } from "@/lib/utils"
import { mockStudents, mockCourses, mockMessages } from "@/lib/mock/data"

interface SearchResult {
  id: string
  label: string
  description?: string
  icon: React.ElementType
  href: string
  section: string
}

interface GlobalSearchProps {
  isOpen: boolean
  onClose: () => void
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [activeSection, setActiveSection] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => {
    if (!query.trim()) return [] as SearchResult[]
    const q = query
    const items: SearchResult[] = []

    mockStudents.filter((s) => s.name.includes(q)).slice(0, 5).forEach((s) => {
      items.push({
        id: s.id,
        label: s.name,
        description: `${s.grade} · ${s.governorate}`,
        icon: HiOutlineUser,
        href: `/teacher/students?id=${s.id}`,
        section: "الطلاب",
      })
    })

    mockCourses.filter((c) => c.title.includes(q)).slice(0, 5).forEach((c) => {
      items.push({
        id: c.id,
        label: c.title,
        description: c.shortDescription,
        icon: HiOutlineBookOpen,
        href: `/teacher/courses/${c.id}`,
        section: "الكورسات",
      })
    })

    mockMessages.filter((m) => m.subject.includes(q)).slice(0, 5).forEach((m) => {
      items.push({
        id: m.id,
        label: m.subject,
        description: `من ${m.senderName}`,
        icon: HiOutlineChat,
        href: `/teacher/messages?conv=${m.conversationId}`,
        section: "الرسائل",
      })
    })

    return items
  }, [query])

  const sections = useMemo(() => {
    const secs = new Map<string, SearchResult[]>()
    results.forEach((r) => {
      const existing = secs.get(r.section) || []
      existing.push(r)
      secs.set(r.section, existing)
    })
    return Array.from(secs.entries())
  }, [results])

  const flatResults = useMemo(() => {
    const flat: (SearchResult | "separator")[] = []
    sections.forEach(([section, items], idx) => {
      if (idx > 0) flat.push("separator")
      flat.push(...items)
    })
    return flat
  }, [sections])

  useEffect(() => {
    if (isOpen) {
      setQuery("")
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const executeItem = useCallback((item: SearchResult) => {
    onClose()
    router.push(item.href)
  }, [onClose, router])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const items = flatResults.filter((r): r is SearchResult => r !== "separator")
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === "Enter" && items[selectedIndex]) {
      executeItem(items[selectedIndex])
    }
  }, [flatResults, selectedIndex, executeItem])

  let currentFlatIndex = -1

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4 border-b border-border">
              <HiOutlineSearch className="w-5 h-5 text-text-tertiary shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="ابحث عن طالب، كورس، رسالة..."
                className="w-full bg-transparent text-base text-text placeholder:text-text-tertiary focus:outline-none"
              />
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {query.trim() && sections.length === 0 ? (
                <div className="text-center py-10 text-text-tertiary text-sm">
                  لا توجد نتائج لـ &ldquo;{query}&rdquo;
                </div>
              ) : query.trim() ? (
                sections.map(([section, items]) => (
                  <div key={section}>
                    <div className="px-3 py-2 text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                      {section}
                    </div>
                    {items.map((item) => {
                      currentFlatIndex++
                      const idx = currentFlatIndex
                      const Icon = item.icon
                      return (
                        <button
                          key={item.id}
                          onClick={() => executeItem(item)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-right transition-colors",
                            idx === selectedIndex
                              ? "bg-primary/10 text-primary"
                              : "text-text hover:bg-surface-secondary"
                          )}
                        >
                          <Icon className="w-5 h-5 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">{item.label}</p>
                            {item.description && (
                              <p className="text-xs text-text-tertiary truncate">{item.description}</p>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-text-tertiary text-sm">
                  ابدأ الكتابة للبحث في النظام
                </div>
              )}
            </div>
            <div className="p-3 border-t border-border flex items-center gap-4 text-xs text-text-tertiary">
              <span>↑↓ للتنقل</span>
              <span>↵ للاختيار</span>
              <span>Esc للإغلاق</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

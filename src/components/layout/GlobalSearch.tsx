"use client"

import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineSearch,
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineBriefcase,
  HiOutlineBookOpen,
  HiOutlineClipboardCheck,
  HiOutlinePencilAlt,
  HiOutlineQuestionMarkCircle,
  HiOutlineFilm,
  HiOutlineCash,
  HiOutlineUserAdd,
  HiOutlineKey,
  HiOutlineCollection,
  HiOutlineChat,
} from "react-icons/hi"
import { cn } from "@/lib/utils"
import {
  mockStudents,
  mockParents,
  mockStaffMembers,
  mockCourses,
  mockExams,
  mockHomework,
  mockQuestions,
  mockVideoLibrary,
  mockCertificates,
  mockPayments,
  mockEnrollments,
  mockCenterCodes,
  mockBundles,
  mockMessages,
} from "@/lib/mock/data"

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
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => {
    if (!query.trim()) return [] as SearchResult[]
    const q = query.trim()
    const items: SearchResult[] = []

    ;(mockStudents || []).filter((s) => s.name?.includes(q)).slice(0, 3).forEach((s) => {
      items.push({
        id: s.id, label: s.name, description: `${s.grade} آ· ${s.governorate}`,
        icon: HiOutlineUser, href: `/teacher/students?id=${s.id}`, section: "ط§ظ„ط·ظ„ط§ط¨",
      })
    })

    ;(mockParents || []).filter((p) => p.name?.includes(q) || p.children?.some((c) => c.grade?.includes(q))).slice(0, 3).forEach((p) => {
      items.push({
        id: p.id, label: p.name, description: `ظˆظ„ظٹ ط£ظ…ط± آ· ${p.children?.length || 0} ط£ط¨ظ†ط§ط،`,
        icon: HiOutlineUserGroup, href: `/teacher/parents?id=${p.id}`, section: "ط£ظˆظ„ظٹط§ط، ط§ظ„ط£ظ…ظˆط±",
      })
    })

    ;(mockStaffMembers || []).filter((s) => s.name?.includes(q)).slice(0, 3).forEach((s) => {
      items.push({
        id: s.id, label: s.name, description: s.jobTitle,
        icon: HiOutlineBriefcase, href: `/teacher/staff?id=${s.id}`, section: "ط§ظ„ظ…ظˆط¸ظپظˆظ†",
      })
    })

    ;(mockCourses || []).filter((c) => c.title?.includes(q)).slice(0, 3).forEach((c) => {
      items.push({
        id: c.id, label: c.title, description: c.shortDescription,
        icon: HiOutlineBookOpen, href: `/teacher/courses/${c.id}`, section: "ط§ظ„ظƒظˆط±ط³ط§طھ",
      })
    })

    ;(mockExams || []).filter((e) => e.title?.includes(q)).slice(0, 3).forEach((e) => {
      items.push({
        id: e.id, label: e.title, description: `${e.duration} ط¯ظ‚ظٹظ‚ط©`,
        icon: HiOutlineClipboardCheck, href: `/teacher/exams/${e.id}`, section: "ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ",
      })
    })

    ;(mockHomework || []).filter((h) => h.title?.includes(q)).slice(0, 3).forEach((h) => {
      items.push({
        id: h.id, label: h.title, description: h.description,
        icon: HiOutlinePencilAlt, href: `/teacher/homework/${h.id}`, section: "ط§ظ„ظˆط§ط¬ط¨ط§طھ",
      })
    })

    ;(mockQuestions || []).filter((qs) => qs.text?.includes(q)).slice(0, 3).forEach((qs) => {
      items.push({
        id: qs.id, label: qs.text, description: qs.type,
        icon: HiOutlineQuestionMarkCircle,
        href: `/teacher/questions?search=${encodeURIComponent(q)}`,
        section: "ط¨ظ†ظƒ ط§ظ„ط£ط³ط¦ظ„ط©",
      })
    })

    ;(mockVideoLibrary || []).filter((v) => v.title?.includes(q)).slice(0, 3).forEach((v) => {
      items.push({
        id: v.id, label: v.title, description: v.courseName || "",
        icon: HiOutlineFilm, href: "/teacher/videos", section: "ط§ظ„ظپظٹط¯ظٹظˆظ‡ط§طھ",
      })
    })

    ;(mockCertificates || []).filter((c) => c.studentName?.includes(q)).slice(0, 3).forEach((c) => {
      items.push({
        id: c.id, label: c.studentName, description: c.courseName,
        icon: HiOutlineBriefcase, href: "/teacher/certificates", section: "ط§ظ„ط´ظ‡ط§ط¯ط§طھ",
      })
    })

    ;(mockPayments || []).filter((p) => p.studentName?.includes(q)).slice(0, 3).forEach((p) => {
      items.push({
        id: p.id, label: p.studentName, description: `${p.amount} ط¬ظ†ظٹظ‡ آ· ${p.status}`,
        icon: HiOutlineCash, href: "/teacher/subscriptions", section: "ط§ظ„ظ…ط¯ظپظˆط¹ط§طھ",
      })
    })

    ;(mockEnrollments || []).filter((e) => e.studentName?.includes(q) || e.courseName?.includes(q)).slice(0, 3).forEach((e) => {
      items.push({
        id: e.id, label: e.studentName, description: e.courseName,
        icon: HiOutlineUserAdd, href: "/teacher/enrollments", section: "ط§ظ„طھط³ط¬ظٹظ„ط§طھ",
      })
    })

    ;(mockCenterCodes || []).filter((c) => c.code?.includes(q)).slice(0, 3).forEach((c) => {
      items.push({
        id: c.id, label: c.code, description: `${c.type || ""} آ· ${c.value || ""}`,
        icon: HiOutlineKey, href: "/teacher/codes", section: "ط§ظ„ط£ظƒظˆط§ط¯",
      })
    })

    ;(mockBundles || []).filter((b) => b.name?.includes(q)).slice(0, 3).forEach((b) => {
      items.push({
        id: b.id, label: b.name, description: b.description,
        icon: HiOutlineCollection, href: "/teacher/enrollments/bundles", section: "ط§ظ„ط¨ط§ظ‚ط§طھ",
      })
    })

    ;(mockMessages || []).filter((m) => m.subject?.includes(q)).slice(0, 3).forEach((m) => {
      items.push({
        id: m.id, label: m.subject, description: `ظ…ظ† ${m.senderName}`,
        icon: HiOutlineChat, href: `/teacher/messages?conv=${m.conversationId}`, section: "ط§ظ„ط±ط³ط§ط¦ظ„",
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

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const items = flatResults.filter((r): r is SearchResult => r !== "separator")
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === "Enter" && items[selectedIndex]) {
        executeItem(items[selectedIndex])
      } else if (e.key === "Escape") {
        onClose()
      }
    },
    [flatResults, selectedIndex, executeItem, onClose],
  )

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
                placeholder="ط§ط¨ط­ط« ظپظٹ ط§ظ„ظ†ط¸ط§ظ…..."
                className="w-full bg-transparent text-base text-text placeholder:text-text-tertiary focus:outline-none"
              />
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {query.trim() && sections.length === 0 ? (
                <div className="text-center py-10 text-text-tertiary text-sm">
                  ظ„ط§ طھظˆط¬ط¯ ظ†طھط§ط¦ط¬ ظ„ظ€ &ldquo;{query}&rdquo;
                </div>
              ) : query.trim() ? (
                sections.map(([section, items]) => (
                  <div key={section}>
                    <div className="px-3 py-2 text-xs font-semibold text-text-tertiary uppercase tracking-wider flex items-center justify-between">
                      <span>{section}</span>
                      <span className="text-text-tertiary/70">{items.length} ظ†طھظٹط¬ط©</span>
                    </div>
                    {items.map((item) => {
                      currentFlatIndex++
                      const idx = currentFlatIndex
                      const Icon = item.icon
                      return (
                        <button type="button"
                          key={`${section}-${item.id}`}
                          onClick={() => executeItem(item)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-right transition-colors",
                            idx === selectedIndex
                              ? "bg-primary/10 text-primary"
                              : "text-text hover:bg-surface-secondary",
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
                  ط§ط¨ط¯ط£ ط§ظ„ظƒطھط§ط¨ط© ظ„ظ„ط¨ط­ط« ظپظٹ ط§ظ„ظ†ط¸ط§ظ…
                </div>
              )}
            </div>
            <div className="p-3 border-t border-border flex items-center gap-4 text-xs text-text-tertiary">
              <span>â†‘â†“ ظ„ظ„طھظ†ظ‚ظ„</span>
              <span>â†µ ظ„ظ„ط§ط®طھظٹط§ط±</span>
              <span>Esc ظ„ظ„ط¥ط؛ظ„ط§ظ‚</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

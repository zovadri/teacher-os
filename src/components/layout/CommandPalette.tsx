"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineClipboardList,
  HiOutlineUserAdd,
  HiOutlineDocumentReport,
  HiOutlineCog,
  HiOutlineAcademicCap,
  HiOutlineCash,
  HiOutlineChat,
  HiOutlineCollection,
  HiOutlineUsers,
  HiOutlineMail,
  HiOutlinePlus,
  HiOutlineViewGrid,
} from "react-icons/hi"
import { cn } from "@/lib/utils"

interface Command {
  id: string
  label: string
  description?: string
  shortcut?: string
  icon: React.ElementType
  href: string
  category: "navigation" | "pages" | "actions"
}

const commands: Command[] = [
  { id: "nav-dashboard", label: "الرئيسية", description: "الذهاب إلى لوحة التحكم", icon: HiOutlineHome, href: "/teacher", category: "navigation" },
  { id: "nav-courses", label: "الكورسات", description: "عرض جميع الكورسات", icon: HiOutlineBookOpen, href: "/teacher/courses", category: "navigation" },
  { id: "nav-students", label: "الطلاب", description: "إدارة الطلاب", icon: HiOutlineUsers, href: "/teacher/students", category: "navigation" },
  { id: "nav-exams", label: "الامتحانات", description: "عرض الامتحانات", icon: HiOutlineClipboardList, href: "/teacher/exams", category: "navigation" },
  { id: "nav-reports", label: "التقارير", description: "التقارير والإحصائيات", icon: HiOutlineDocumentReport, href: "/teacher/analytics", category: "navigation" },
  { id: "nav-settings", label: "الإعدادات", description: "إعدادات الحساب", icon: HiOutlineCog, href: "/teacher/settings", category: "navigation" },

  { id: "page-dashboard", label: "/dashboard", description: "لوحة التحكم الرئيسية", icon: HiOutlineViewGrid, href: "/teacher", category: "pages" },
  { id: "page-courses", label: "/courses", description: "إدارة الكورسات", icon: HiOutlineBookOpen, href: "/teacher/courses", category: "pages" },
  { id: "page-students", label: "/students", description: "إدارة الطلاب", icon: HiOutlineUsers, href: "/teacher/students", category: "pages" },
  { id: "page-exams", label: "/exams", description: "الامتحانات والاختبارات", icon: HiOutlineClipboardList, href: "/teacher/exams", category: "pages" },
  { id: "page-messages", label: "/messages", description: "الرسائل والتواصل", icon: HiOutlineChat, href: "/teacher/messages", category: "pages" },
  { id: "page-analytics", label: "/analytics", description: "التحليلات والتقارير", icon: HiOutlineDocumentReport, href: "/teacher/analytics", category: "pages" },

  { id: "create-course", label: "إنشاء كورس جديد", description: "إضافة كورس دراسي جديد", icon: HiOutlinePlus, href: "/teacher/courses/create", category: "actions" },
  { id: "create-exam", label: "إنشاء امتحان جديد", description: "إضافة امتحان جديد", icon: HiOutlineAcademicCap, href: "/teacher/exams/create", category: "actions" },
  { id: "add-student", label: "إضافة طالب", description: "تسجيل طالب جديد", icon: HiOutlineUserAdd, href: "/teacher/students", category: "actions" },
  { id: "send-message", label: "إرسال رسالة", description: "إرسال رسالة لأولياء الأمور", icon: HiOutlineMail, href: "/teacher/messages", category: "actions" },
]

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

const categoryLabels: Record<string, string> = {
  navigation: "التنقل",
  pages: "الصفحات",
  actions: "الإجراءات",
}

const categoryOrder = ["navigation", "pages", "actions"]

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = commands.filter((cmd) => {
    if (!search.trim()) return true
    const q = search
    return cmd.label.includes(q) || cmd.id.includes(q) || (cmd.description || "").includes(q)
  })

  const grouped = filtered.reduce((acc, cmd) => {
    const list = acc.get(cmd.category) || []
    list.push(cmd)
    acc.set(cmd.category, list)
    return acc
  }, new Map<string, Command[]>())

  const flatItems: (Command | "separator")[] = []
  categoryOrder.forEach((cat) => {
    const items = grouped.get(cat)
    if (items && items.length > 0) {
      if (flatItems.length > 0) flatItems.push("separator")
      flatItems.push("separator")
      flatItems.push(...items)
    }
  })

  const itemCount = flatItems.filter((i): i is Command => i !== "separator").length

  useEffect(() => {
    if (isOpen) {
      setSearch("")
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  const executeCommand = useCallback((cmd: Command) => {
    onClose()
    router.push(cmd.href)
  }, [onClose, router])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const items = flatItems.filter((i): i is Command => i !== "separator")
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === "Enter" && items[selectedIndex]) {
      executeCommand(items[selectedIndex])
    }
  }, [flatItems, selectedIndex, executeCommand])

  const iconColors: Record<string, string> = {
    "nav-dashboard": "text-primary",
    "nav-courses": "text-success",
    "nav-students": "text-info",
    "nav-exams": "text-warning",
    "nav-reports": "text-purple-500",
    "nav-settings": "text-text-secondary",
    "page-dashboard": "text-primary",
    "page-courses": "text-success",
    "page-students": "text-info",
    "page-exams": "text-warning",
    "page-messages": "text-primary",
    "page-analytics": "text-purple-500",
    "create-course": "text-success",
    "create-exam": "text-warning",
    "add-student": "text-info",
    "send-message": "text-primary",
  }

  let currentFlatIndex = -1

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
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
            className="relative w-full max-w-xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-2 p-4 border-b border-border">
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="اكتب أمراً..."
                className="w-full bg-transparent text-lg text-text placeholder:text-text-tertiary focus:outline-none"
              />
              <kbd className="px-1.5 py-0.5 text-xs bg-surface-tertiary rounded text-text-tertiary font-mono shrink-0">
                Ctrl+K
              </kbd>
            </div>
            <div className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="text-center py-8 text-text-tertiary text-sm">لا توجد نتائج</div>
              ) : (
                categoryOrder.map((cat) => {
                  const items = grouped.get(cat)
                  if (!items || items.length === 0) return null
                  return (
                    <div key={cat}>
                      <div className="px-3 py-2 text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                        {categoryLabels[cat]}
                      </div>
                      {items.map((cmd) => {
                        currentFlatIndex++
                        const idx = currentFlatIndex
                        const Icon = cmd.icon
                        return (
                          <motion.button
                            key={cmd.id}
                            onClick={() => executeCommand(cmd)}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.12, delay: idx * 0.02 }}
                            className={cn(
                              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-right transition-colors",
                              idx === selectedIndex
                                ? "bg-primary/10 text-primary"
                                : "text-text hover:bg-surface-secondary"
                            )}
                          >
                            <Icon className={cn("w-5 h-5 shrink-0", iconColors[cmd.id])} />
                            <div className="min-w-0 flex-1">
                              <span className="text-sm font-medium">{cmd.label}</span>
                              {cmd.description && (
                                <span className="block text-xs text-text-tertiary truncate">{cmd.description}</span>
                              )}
                            </div>
                            {cmd.shortcut && (
                              <kbd className="px-1.5 py-0.5 text-xs bg-surface-tertiary rounded text-text-tertiary font-mono" dir="ltr">
                                {cmd.shortcut}
                              </kbd>
                            )}
                          </motion.button>
                        )
                      })}
                    </div>
                  )
                })
              )}
            </div>
            <div className="p-3 border-t border-border flex items-center gap-4 text-xs text-text-tertiary">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-surface-tertiary rounded text-text-tertiary font-mono text-[10px]">↑</kbd>
                <kbd className="px-1 py-0.5 bg-surface-tertiary rounded text-text-tertiary font-mono text-[10px]">↓</kbd>
                للتنقل
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-surface-tertiary rounded text-text-tertiary font-mono text-[10px]">↵</kbd>
                للاختيار
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-surface-tertiary rounded text-text-tertiary font-mono text-[10px]">Esc</kbd>
                للإغلاق
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  return { isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false), CommandPalette }
}

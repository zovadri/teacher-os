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
} from "react-icons/hi"
import { cn, formatRelativeTime } from "@/lib/utils"

interface Command {
  id: string
  label: string
  shortcut?: string
  icon: React.ElementType
  href: string
}

const commands: Command[] = [
  { id: "dashboard", label: "الذهاب إلى لوحة التحكم", icon: HiOutlineHome, href: "/teacher" },
  { id: "courses", label: "عرض الكورسات", icon: HiOutlineBookOpen, href: "/teacher/courses" },
  { id: "exam-create", label: "إنشاء امتحان جديد", icon: HiOutlineClipboardList, href: "/teacher/exams/create" },
  { id: "add-student", label: "إضافة طالب", icon: HiOutlineUserAdd, href: "/teacher/students" },
  { id: "reports", label: "عرض التقارير", icon: HiOutlineDocumentReport, href: "/teacher/analytics" },
  { id: "settings", label: "الإعدادات", icon: HiOutlineCog, href: "/teacher/settings" },
  { id: "subscriptions", label: "الاشتراكات", icon: HiOutlineCash, href: "/teacher/subscriptions" },
  { id: "messages", label: "الرسائل", icon: HiOutlineChat, href: "/teacher/messages" },
  { id: "certificates", label: "الشهادات", icon: HiOutlineAcademicCap, href: "/teacher/certificates" },
  { id: "files", label: "مكتبة الملفات", icon: HiOutlineCollection, href: "/teacher/files" },
]

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

const recentCommands = ["dashboard", "courses", "messages"]

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [history, setHistory] = useState<string[]>([])
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = commands.filter((cmd) =>
    cmd.label.includes(search) || cmd.id.includes(search)
  )

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
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      executeCommand(filtered[selectedIndex])
    }
  }, [filtered, selectedIndex, executeCommand])

  const iconColors: Record<string, string> = {
    dashboard: "text-primary",
    courses: "text-success",
    "exam-create": "text-warning",
    "add-student": "text-info",
    reports: "text-purple-500",
    settings: "text-text-secondary",
    subscriptions: "text-success",
    messages: "text-primary",
    certificates: "text-warning",
    files: "text-info",
  }

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
            <div className="p-4 border-b border-border">
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="اكتب أمراً..."
                className="w-full bg-transparent text-lg text-text placeholder:text-text-tertiary focus:outline-none"
              />
            </div>
            {!search && (
              <div className="px-3 py-2 text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                الأوامر السريعة
              </div>
            )}
            <div className="max-h-72 overflow-y-auto p-2">
              {!search && (
                <div className="px-3 py-1 text-xs text-text-tertiary">
                  اكتب للبحث عن أوامر إضافية
                </div>
              )}
              {filtered.length === 0 ? (
                <div className="text-center py-8 text-text-tertiary text-sm">لا توجد نتائج</div>
              ) : (
                filtered.map((cmd, idx) => {
                  const Icon = cmd.icon
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => executeCommand(cmd)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-right transition-colors",
                        idx === selectedIndex
                          ? "bg-primary/10 text-primary"
                          : "text-text hover:bg-surface-secondary"
                      )}
                    >
                    <Icon className={cn("w-5 h-5 shrink-0", iconColors[cmd.id])} />
                    <span className="flex-1 text-sm font-medium">{cmd.label}</span>
                      {cmd.shortcut && (
                        <kbd className="px-1.5 py-0.5 text-xs bg-surface-tertiary rounded text-text-tertiary font-mono" dir="ltr">
                          {cmd.shortcut}
                        </kbd>
                      )}
                    </button>
                  )
                })
              )}
            </div>
            {filtered.length > 0 && filtered[selectedIndex] && (
              <div className="px-4 py-2 bg-surface-secondary border-t border-border text-xs text-text-tertiary">
                {filtered[selectedIndex].label}
                {filtered[selectedIndex].shortcut && (
                  <span className="mr-2 font-mono text-primary">({filtered[selectedIndex].shortcut})</span>
                )}
              </div>
            )}
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

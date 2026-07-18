"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineChartBar,
  HiOutlineBookOpen,
  HiOutlineUsers,
  HiOutlineAcademicCap,
  HiOutlineClipboardList,
  HiOutlineCreditCard,
  HiOutlineCog,
  HiMenu,
  HiX,
  HiLogout,
  HiChevronLeft,
} from "react-icons/hi"
import { cn } from "../../lib/utils"
import { mockTeacher } from "../../lib/mock/data"

const navLinks = [
  { href: "/teacher", label: "لوحة التحكم", icon: HiOutlineChartBar },
  { href: "/teacher/courses", label: "الكورسات", icon: HiOutlineBookOpen },
  { href: "/teacher/students", label: "الطلاب", icon: HiOutlineUsers },
  { href: "/teacher/exams", label: "الامتحانات", icon: HiOutlineAcademicCap },
  { href: "/teacher/analytics", label: "التحليلات", icon: HiOutlineClipboardList },
  { href: "/teacher/subscriptions", label: "الاشتراكات", icon: HiOutlineCreditCard },
  { href: "/teacher/settings", label: "الإعدادات", icon: HiOutlineCog },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 right-4 z-50 lg:hidden p-2 rounded-lg bg-surface border border-border shadow-md text-text-secondary hover:text-primary"
        aria-label="القائمة"
      >
        <HiMenu size={22} />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 z-50 h-full w-72 bg-surface border-l border-border shadow-xl lg:hidden"
          >
            <MobileSidebarContent pathname={pathname} onClose={() => setMobileOpen(false)} />
          </motion.aside>
        )}
      </AnimatePresence>

      <motion.aside
        layout
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "hidden lg:flex flex-col h-screen bg-surface border-l border-border sticky top-0 shrink-0 transition-all duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className={cn("flex items-center h-16 px-4 border-b border-border", collapsed && "justify-center")}>
          {!collapsed && (
            <Link href="/teacher" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xs">T</div>
              <span className="font-bold text-base">Teacher<span className="text-primary">OS</span></span>
            </Link>
          )}
          {collapsed && (
            <Link href="/teacher">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xs">T</div>
            </Link>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
            return (
              <Link key={link.href} href={link.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    collapsed && "justify-center px-0",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-text-secondary hover:bg-surface-tertiary hover:text-text"
                  )}
                >
                  <Icon size={20} />
                  {!collapsed && <span>{link.label}</span>}
                </div>
              </Link>
            )
          })}
        </nav>

        <div className={cn("p-4 border-t border-border", collapsed && "flex flex-col items-center")}>
          <div className={cn("flex items-center gap-3", collapsed && "flex-col")}>
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
              <img src={mockTeacher.avatar} alt="" className="w-full h-full object-cover" />
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-text truncate">{mockTeacher.name}</p>
                <p className="text-xs text-text-tertiary truncate">{mockTeacher.email}</p>
              </div>
            )}
            {!collapsed && (
              <button className="p-1.5 text-text-tertiary hover:text-error rounded-lg hover:bg-surface-tertiary transition-colors" title="تسجيل الخروج">
                <HiLogout size={16} />
              </button>
            )}
          </div>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -left-3 top-20 w-6 h-6 bg-surface border border-border rounded-full flex items-center justify-center text-text-tertiary hover:text-text shadow-sm transition-colors"
        >
          <HiChevronLeft size={12} className={cn("transition-transform duration-200", collapsed && "rotate-180")} />
        </button>
      </motion.aside>
    </>
  )
}

function MobileSidebarContent({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        <Link href="/teacher" className="flex items-center gap-2" onClick={onClose}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xs">T</div>
          <span className="font-bold text-base">Teacher<span className="text-primary">OS</span></span>
        </Link>
        <button onClick={onClose} className="p-1.5 text-text-secondary hover:text-primary rounded-lg" aria-label="إغلاق">
          <HiX size={22} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
          return (
            <Link key={link.href} href={link.href} onClick={onClose}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive ? "bg-primary/10 text-primary" : "text-text-secondary hover:bg-surface-tertiary hover:text-text"
                )}
              >
                <Icon size={20} />
                <span>{link.label}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
            <img src={mockTeacher.avatar} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-text truncate">{mockTeacher.name}</p>
            <p className="text-xs text-text-tertiary truncate">{mockTeacher.email}</p>
          </div>
          <button className="p-1.5 text-text-tertiary hover:text-error rounded-lg" title="تسجيل الخروج">
            <HiLogout size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

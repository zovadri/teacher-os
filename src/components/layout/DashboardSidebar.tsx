"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiHome, HiBookOpen, HiAcademicCap, HiClipboardList, HiCalendar, HiUserGroup,
  HiCreditCard, HiChartBar, HiCog, HiQuestionMarkCircle, HiSupport,
  HiStar, HiPhotograph, HiBell, HiChevronDown, HiMenu, HiX, HiLogout,
  HiChevronRight, HiDocumentReport, 
} from "react-icons/hi"

interface NavItem {
  label: string
  icon: React.ElementType
  href: string
  children?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  { label: "لوحة التحكم", icon: HiHome, href: "/dashboard/teacher" },
  {
    label: "الكورسات", icon: HiBookOpen, href: "/dashboard/teacher/courses",
    children: [
      { label: "جميع الكورسات", href: "/dashboard/teacher/courses" },
      { label: "إضافة كورس", href: "/dashboard/teacher/courses/create" },
    ],
  },
  { label: "الطلاب", icon: HiUserGroup, href: "/dashboard/teacher/students" },
  {
    label: "الامتحانات", icon: HiAcademicCap, href: "/dashboard/teacher/exams",
    children: [
      { label: "جميع الامتحانات", href: "/dashboard/teacher/exams" },
      { label: "إضافة امتحان", href: "/dashboard/teacher/exams/create" },
    ],
  },
  { label: "الاشتراكات", icon: HiCreditCard, href: "/dashboard/teacher/subscriptions" },
  { label: "التحليلات", icon: HiChartBar, href: "/dashboard/teacher/analytics" },
  { label: "الإشعارات", icon: HiBell, href: "/dashboard/teacher/notifications" },
  { label: "الإعدادات", icon: HiCog, href: "/dashboard/teacher/settings" },
  { label: "الدعم الفني", icon: HiSupport, href: "/dashboard/teacher/support" },
]

const otherLinks = [
  { label: "لوحة الطالب", icon: HiAcademicCap, href: "/dashboard/student" },
  { label: "لوحة ولي الأمر", icon: HiUserGroup, href: "/dashboard/parent" },
  { label: "لوحة الموظفين", icon: HiStar, href: "/dashboard/staff" },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label])
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  const NavLink = ({ item, depth = 0 }: { item: NavItem; depth?: number }) => {
    const active = isActive(item.href)
    const hasChildren = item.children && item.children.length > 0
    const expanded = expandedMenus.includes(item.label)

    return (
      <div>
        <Link
          href={hasChildren ? "#" : item.href}
          onClick={(e) => { if (hasChildren) { e.preventDefault(); toggleMenu(item.label) } else { setMobileOpen(false) } }}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
            active
              ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
              : "text-text-secondary hover:bg-surface-tertiary hover:text-text",
          )}
          style={{ paddingRight: depth > 0 ? `${depth * 16 + 12}px` : undefined }}
        >
          <item.icon className="w-5 h-5 shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1 truncate">{item.label}</span>
              {hasChildren && (
                <HiChevronDown className={cn("w-4 h-4 transition-transform duration-200", expanded && "rotate-180")} />
              )}
            </>
          )}
        </Link>
        {hasChildren && !collapsed && (
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                {item.children!.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 pr-8 px-3 py-2 rounded-lg text-sm transition-all duration-200 mr-3",
                      pathname === child.href
                        ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                        : "text-text-tertiary hover:bg-surface-tertiary hover:text-text-secondary"
                    )}
                  >
                    <HiChevronRight className="w-3 h-3" />
                    {child.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    )
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-sm">T</div>
        {!collapsed && <span className="font-bold text-text text-lg">TeacherOS</span>}
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => (<NavLink key={item.href} item={item} />))}

        {!collapsed && (
          <>
            <div className="pt-4 mt-4 border-t border-border">
              <p className="px-3 text-xs font-medium text-text-tertiary mb-2">روابط أخرى</p>
              {otherLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive(item.href)
                      ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                      : "text-text-secondary hover:bg-surface-tertiary hover:text-text",
                  )}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              ))}
            </div>
          </>
        )}
      </nav>

      <div className="p-3 border-t border-border">
        <button className={cn(
          "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-text-tertiary hover:bg-surface-tertiary hover:text-error transition-all",
        )}>
          <HiLogout className="w-5 h-5 shrink-0" />
          {!collapsed && <span>تسجيل خروج</span>}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2.5 rounded-xl bg-surface border border-border shadow-md"
      >
        {mobileOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <motion.aside
        initial={{ x: "100%" }} animate={{ x: mobileOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="lg:hidden fixed top-0 left-0 z-40 h-full w-72 bg-surface border-l border-border shadow-2xl overflow-hidden"
      >
        {sidebarContent}
      </motion.aside>

      {/* Desktop sidebar */}
      <aside
        onMouseEnter={() => setCollapsed(false)}
        className={cn(
          "hidden lg:flex flex-col fixed right-0 top-0 h-full bg-surface border-l border-border z-30 transition-all duration-300 overflow-hidden",
          collapsed ? "w-[72px]" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  )
}

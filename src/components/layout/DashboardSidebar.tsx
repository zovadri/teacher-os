"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/lib/auth"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiHome, HiBookOpen, HiAcademicCap, HiClipboardList, HiCalendar, HiUserGroup,
  HiCreditCard, HiChartBar, HiCog, HiQuestionMarkCircle, HiSupport,
  HiStar, HiPhotograph, HiBell, HiChevronDown, HiMenu, HiX, HiLogout,
  HiChevronRight, HiDocumentReport, HiClock, HiShieldCheck, HiCash,
  HiOfficeBuilding, HiCollection, HiClipboard,
  HiArchive, HiSearch, HiUpload, HiCheckCircle,
} from "react-icons/hi"

interface NavItem {
  label: string
  icon: React.ElementType
  href: string
  children?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  { label: "لوحة التحكم", icon: HiHome, href: "/teacher" },
  {
    label: "الكورسات", icon: HiBookOpen, href: "/teacher/courses",
    children: [
      { label: "جميع الكورسات", href: "/teacher/courses" },
      { label: "إضافة كورس", href: "/teacher/courses/create" },
      { label: "جدول الكورسات", href: "/teacher/courses/schedule" },
      { label: "تصنيفات", href: "/teacher/courses/categories" },
      { label: "مسار التعلم", href: "/teacher/courses/learning-path" },
    ],
  },
  {
    label: "الطلاب", icon: HiUserGroup, href: "/teacher/students",
    children: [
      { label: "جميع الطلاب", href: "/teacher/students" },
      { label: "كشف الدرجات", href: "/teacher/students/transcript" },
      { label: "بطاقات الطلاب", href: "/teacher/students/id-cards" },
      { label: "الترقية والرسوب", href: "/teacher/grades/promotion" },
      { label: "نقل الطلاب", href: "/teacher/students/transfers" },
    ],
  },
  {
    label: "المجموعات", icon: HiCollection, href: "/teacher/groups",
    children: [
      { label: "جميع المجموعات", href: "/teacher/groups" },
      { label: "قائمة الانتظار", href: "/teacher/waiting-queue" },
    ],
  },
  {
    label: "الحضور", icon: HiClipboardList, href: "/teacher/attendance",
    children: [
      { label: "تسجيل الحضور", href: "/teacher/attendance" },
      { label: "مسح QR", href: "/teacher/attendance/qr" },
      { label: "تقارير الحضور", href: "/teacher/attendance/reports" },
    ],
  },
  {
    label: "الامتحانات", icon: HiAcademicCap, href: "/teacher/exams",
    children: [
      { label: "جميع الامتحانات", href: "/teacher/exams" },
      { label: "إضافة امتحان", href: "/teacher/exams/create" },
      { label: "إصدارات متعددة", href: "/teacher/exams/versions" },
      { label: "تحليل الأسئلة", href: "/teacher/exams/analysis" },
      { label: "طباعة", href: "/teacher/exams/print" },
      { label: "المتصدرين", href: "/teacher/exams/leaderboard" },
    ],
  },
  {
    label: "الواجبات", icon: HiClipboardList, href: "/teacher/homework",
    children: [
      { label: "جميع الواجبات", href: "/teacher/homework" },
      { label: "إضافة واجب", href: "/teacher/homework/create" },
    ],
  },
  {
    label: "بنك الأسئلة", icon: HiQuestionMarkCircle, href: "/teacher/questions",
    children: [
      { label: "جميع الأسئلة", href: "/teacher/questions" },
      { label: "التصنيفات", href: "/teacher/questions/categories" },
    ],
  },
  {
    label: "التسجيلات", icon: HiUserGroup, href: "/teacher/enrollments",
    children: [
      { label: "جميع التسجيلات", href: "/teacher/enrollments" },
      { label: "الباقات", href: "/teacher/enrollments/bundles" },
    ],
  },
  { label: "الإعلانات", icon: HiBell, href: "/teacher/announcements" },
  { label: "أولياء الأمور", icon: HiUserGroup, href: "/teacher/parents" },
  { label: "التقويم", icon: HiCalendar, href: "/teacher/calendar" },
  { label: "الاشتراكات", icon: HiCreditCard, href: "/teacher/subscriptions" },
  { label: "الأكواد", icon: HiStar, href: "/teacher/codes" },
  {
    label: "المالية", icon: HiCash, href: "/teacher/finance",
    children: [
      { label: "لوحة المالية", href: "/teacher/finance" },
      { label: "إحصائيات الكورسات", href: "/teacher/finance/courses" },
      { label: "المحاسبة", href: "/teacher/accounting" },
    ],
  },
  {
    label: "المدفوعات", icon: HiCreditCard, href: "/teacher/payments/installments",
    children: [
      { label: "الأقساط", href: "/teacher/payments/installments" },
      { label: "متابعة الأقساط", href: "/teacher/payments/installments/tracking" },
      { label: "الكوبونات", href: "/teacher/payments/coupons" },
      { label: "الإيصالات", href: "/teacher/payments/receipts" },
      { label: "المسترجع", href: "/teacher/payments/refunds" },
    ],
  },
  { label: "المحفظة", icon: HiCreditCard, href: "/teacher/wallet" },
  { label: "الرسائل", icon: HiSupport, href: "/teacher/messages" },
  {
    label: "التحليلات", icon: HiChartBar, href: "/teacher/analytics",
    children: [
      { label: "لوحة التحليلات", href: "/teacher/analytics" },
      { label: "التقارير", href: "/teacher/analytics/reports" },
    ],
  },
  { label: "دفتر الدرجات", icon: HiAcademicCap, href: "/teacher/gradebook" },
  {
    label: "مركز التقارير", icon: HiDocumentReport, href: "/teacher/reports",
    children: [
      { label: "جميع التقارير", href: "/teacher/reports" },
      { label: "تقارير الأهالي", href: "/teacher/reports/parents" },
      { label: "تقارير التعلم", href: "/teacher/reports/learning" },
    ],
  },
  { label: "الإشعارات", icon: HiBell, href: "/teacher/notifications" },
  { label: "الموافقات", icon: HiCheckCircle, href: "/teacher/approvals" },
  { label: "الشهادات", icon: HiDocumentReport, href: "/teacher/certificates" },
  { label: "مركز التواصل", icon: HiSupport, href: "/teacher/communication" },
  { label: "الاستقبال", icon: HiHome, href: "/teacher/reception" },
  { label: "العملاء المحتملين", icon: HiUserGroup, href: "/teacher/crm/leads" },
  {
    label: "إدارة المركز", icon: HiOfficeBuilding, href: "/teacher/branches",
    children: [
      { label: "الفروع", href: "/teacher/branches" },
      { label: "القاعات", href: "/teacher/classrooms" },
      { label: "حجز القاعات", href: "/teacher/classrooms/reservations" },
      { label: "الموظفين", href: "/teacher/employees" },
      { label: "المرتبات", href: "/teacher/employees/salaries" },
      { label: "المخزون", href: "/teacher/inventory" },
      { label: "المصروفات", href: "/teacher/expenses" },
    ],
  },
  { label: "الموظفين", icon: HiShieldCheck, href: "/teacher/staff" },
  { label: "الملفات", icon: HiPhotograph, href: "/teacher/files" },
  {
    label: "الفيديوهات", icon: HiAcademicCap, href: "/teacher/videos",
    children: [
      { label: "جميع الفيديوهات", href: "/teacher/videos" },
      { label: "تحليلات الفيديو", href: "/teacher/videos/analytics" },
      { label: "حماية الفيديو", href: "/teacher/videos/protection" },
      { label: "حماية متقدمة", href: "/teacher/videos/protection/advanced" },
    ],
  },
  {
    label: "إدارة المحتوى", icon: HiBookOpen, href: "/teacher/cms",
    children: [
      { label: "لوحة المحتوى", href: "/teacher/cms" },
      { label: "الصفحة الرئيسية", href: "/teacher/cms/homepage" },
      { label: "المظهر", href: "/teacher/cms/theme" },
      { label: "العلامة التجارية", href: "/teacher/cms/branding" },
      { label: "تحسين محركات البحث", href: "/teacher/cms/seo" },
    ],
  },
  {
    label: "الألعاب", icon: HiStar, href: "/teacher/gamification",
    children: [
      { label: "جميع الألعاب", href: "/teacher/gamification" },
      { label: "الإنجازات", href: "/teacher/gamification/achievements" },
      { label: "الشارات", href: "/teacher/gamification/badges" },
    ],
  },
  { label: "الجلسات", icon: HiClock, href: "/teacher/sessions" },
  { label: "السنوات الدراسية", icon: HiCalendar, href: "/teacher/academic-years" },
  { label: "استيراد / تصدير", icon: HiUpload, href: "/teacher/data/import-export" },
  { label: "الجدول المتقدم", icon: HiCalendar, href: "/teacher/schedule" },
  { label: "المخطط الأسبوعي", icon: HiClock, href: "/teacher/planner/weekly" },
  { label: "النسخ الاحتياطي", icon: HiDocumentReport, href: "/teacher/backup" },
  { label: "مركز الأرشيف", icon: HiArchive, href: "/teacher/archive" },
  {
    label: "سجل التدقيق", icon: HiClipboard, href: "/teacher/audit-log",
    children: [
      { label: "سجل النشاطات", href: "/teacher/audit-log" },
      { label: "سجل النظام", href: "/teacher/system-logs" },
      { label: "الصلاحيات", href: "/teacher/permissions" },
    ],
  },
  { label: "البحث المتقدم", icon: HiSearch, href: "/teacher/search" },
  { label: "الإعدادات", icon: HiCog, href: "/teacher/settings" },
  { label: "الدعم الفني", icon: HiSupport, href: "/teacher/support" },
  { label: "متابعة تقدم الطلاب", icon: HiChartBar, href: "/teacher/students/progress" },
]

const studentNavItems: NavItem[] = [
  { label: "لوحة الطالب", icon: HiHome, href: "/student" },
  { label: "الكورسات", icon: HiBookOpen, href: "/student/courses" },
  { label: "مسار التعلم", icon: HiBookOpen, href: "/student/learning-path" },
  { label: "الامتحانات", icon: HiAcademicCap, href: "/student/exams" },
  { label: "الواجبات", icon: HiClipboardList, href: "/student/homework" },
  { label: "النتائج", icon: HiChartBar, href: "/student/results" },
  { label: "المخطط الدراسي", icon: HiCalendar, href: "/student/planner" },
  { label: "الخطة الأسبوعية", icon: HiCalendar, href: "/student/planner/weekly" },
  { label: "الأهداف", icon: HiStar, href: "/student/goals" },
  { label: "هتذاكر إيه النهاردة؟", icon: HiClock, href: "/student/daily-plan" },
  { label: "المجتمع الطلابي", icon: HiUserGroup, href: "/student/community" },
  { label: "المكافآت", icon: HiPhotograph, href: "/student/rewards" },
  { label: "المكتبة", icon: HiDocumentReport, href: "/student/notes" },
  { label: "الامتحانات الأسبوعية", icon: HiShieldCheck, href: "/student/weekly-exam" },
  { label: "توليد أسئلة بالذكاء الاصطناعي", icon: HiStar, href: "/student/ai-exam" },
  { label: "اختبار تحديد المستوى", icon: HiAcademicCap, href: "/student/assessment" },
  { label: "التحديات", icon: HiStar, href: "/student/challenges" },
  { label: "لوحة المتصدرين", icon: HiChartBar, href: "/student/leaderboard" },
  { label: "مكتبة الكتب", icon: HiDocumentReport, href: "/student/bookstore" },
  { label: "حصص تجريبية مجانية", icon: HiStar, href: "/student/trials" },
  { label: "تقدمي الدراسي", icon: HiChartBar, href: "/student/progress" },
  { label: "الإشعارات", icon: HiBell, href: "/student/notifications" },
  { label: "اشتراكي", icon: HiCreditCard, href: "/student/subscription" },
]

const parentNavItems: NavItem[] = [
  { label: "لوحة ولي الأمر", icon: HiHome, href: "/parent" },
  { label: "الأبناء", icon: HiUserGroup, href: "/parent/children" },
  { label: "الحضور", icon: HiClipboardList, href: "/parent/attendance" },
  { label: "النتائج", icon: HiAcademicCap, href: "/parent/results" },
  { label: "الواجبات", icon: HiClipboardList, href: "/parent/homework" },
  { label: "المدفوعات", icon: HiCreditCard, href: "/parent/payments" },
  { label: "التقارير", icon: HiDocumentReport, href: "/parent/reports" },
  { label: "الإشعارات", icon: HiBell, href: "/parent/notifications" },
  { label: "الرسائل", icon: HiSupport, href: "/parent/messages" },
]

const staffNavItems: NavItem[] = [
  { label: "لوحة الموظفين", icon: HiHome, href: "/staff" },
  { label: "إدارة", icon: HiCog, href: "/staff/manage" },
]

export default function DashboardSidebar({ onHoverChange }: { onHoverChange?: (h: boolean) => void }) {
  const pathname = usePathname()
  const { user } = useAuthStore()
  const [hovered, setHovered] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  useEffect(() => { onHoverChange?.(hovered) }, [hovered, onHoverChange])

  const roleNavItems = useMemo(() => {
    if (!user) return []
    switch (user.role) {
      case "student": return studentNavItems
      case "parent": return parentNavItems
      case "staff": return staffNavItems
      default: return navItems
    }
  }, [user])

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label])
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  function DesktopNavLink({ item, depth = 0 }: { item: NavItem; depth?: number }) {
    const active = isActive(item.href)
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedMenus.includes(item.label)
    const showLabel = hovered

    return (
      <div className="relative group/nav">
        <Link
          href={hasChildren ? "#" : item.href}
          onClick={(e) => { if (hasChildren) { e.preventDefault(); toggleMenu(item.label) } }}
          className={cn(
            "flex items-center justify-center gap-3 rounded-[12px] transition-all duration-200 group",
            showLabel ? "px-3 py-2.5 w-full" : "w-10 h-10 mx-auto",
            active
              ? "bg-primary-100 text-primary shadow-[0_0_12px_rgba(217,119,6,0.06)]"
              : "text-text-secondary hover:bg-card/60 hover:text-primary hover:border-primary/10",
            depth > 0 && "mr-3"
          )}
        >
          <item.icon className="w-5 h-5 shrink-0" />
          {showLabel && (
            <>
              <span className="flex-1 truncate text-sm font-medium text-right">{item.label}</span>
              {hasChildren && (
                <HiChevronDown className={cn("w-4 h-4 shrink-0 transition-transform duration-200", isExpanded && "rotate-180")} />
              )}
            </>
          )}
        </Link>

        {showLabel && hasChildren && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                {item.children!.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      "flex items-center gap-3 pr-11 px-3 py-2 rounded-[12px] text-sm transition-all duration-200",
                      pathname === child.href
                        ? "bg-primary-100 text-primary"
                        : "text-text-tertiary hover:bg-card hover:text-text-secondary"
                    )}
                  >
                    <HiChevronRight className="w-3 h-3 shrink-0" />
                    <span className="truncate">{child.label}</span>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {!showLabel && (
          <div className="absolute right-14 top-1/2 -translate-y-1/2 z-50 pointer-events-none opacity-0 group-hover/nav:opacity-100 transition-opacity duration-200">
            <div className="bg-card/90 backdrop-blur-2xl border border-border rounded-[10px] px-3 py-1.5 text-sm font-medium text-text whitespace-nowrap shadow-[0_8px_32px_rgba(217,119,6,0.06)]">
              {item.label}
            </div>
          </div>
        )}
      </div>
    )
  }

  function MobileNavLink({ item, depth = 0 }: { item: NavItem; depth?: number }) {
    const active = isActive(item.href)
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedMenus.includes(item.label)

    return (
      <div>
        <Link
          href={hasChildren ? "#" : item.href}
          onClick={(e) => { if (hasChildren) { e.preventDefault(); toggleMenu(item.label) } else { setMobileOpen(false) } }}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-medium transition-all duration-200",
            active ? "bg-primary-100 text-primary" : "text-text-secondary hover:bg-card hover:text-text",
            depth > 0 && "mr-3"
          )}
        >
          <item.icon className="w-5 h-5 shrink-0" />
          <span className="flex-1 truncate">{item.label}</span>
          {hasChildren && (
            <HiChevronDown className={cn("w-4 h-4 shrink-0 transition-transform duration-200", isExpanded && "rotate-180")} />
          )}
        </Link>
        {hasChildren && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                {item.children!.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 pr-12 px-3 py-2 rounded-[12px] text-sm transition-all duration-200",
                      pathname === child.href
                        ? "bg-primary-100 text-primary"
                        : "text-text-tertiary hover:bg-card hover:text-text-secondary"
                    )}
                  >
                    <HiChevronRight className="w-3 h-3 shrink-0" />
                    <span className="truncate">{child.label}</span>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    )
  }

  return (
    <>
      <button type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-[12px] bg-surface-secondary border border-border shadow-md"
      >
        {mobileOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: mobileOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="lg:hidden fixed top-0 right-0 z-50 h-screen w-[300px] bg-surface border-l border-border shadow-2xl"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
            <button type="button" onClick={() => setMobileOpen(false)} className="ml-2 p-1 rounded-[12px] hover:bg-card transition-colors">
              <HiX className="w-5 h-5 text-text-secondary" />
            </button>
            <div className="w-9 h-9 rounded-[12px] bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-sm shadow-[0_0_12px_rgba(217,119,6,0.15)]">T</div>
            <span className="font-bold text-text text-lg">TeacherOS</span>
          </div>
          <nav className="flex-1 overflow-y-auto p-4 space-y-0.5">
            {roleNavItems.map((item) => (<MobileNavLink key={item.href} item={item} />))}
          </nav>
          <div className="p-4 border-t border-border">
            <button type="button" className="flex items-center gap-3 w-full px-4 py-3 rounded-[12px] text-sm font-medium text-text-tertiary hover:bg-card hover:text-error transition-all">
              <HiLogout className="w-5 h-5 shrink-0" />
              <span>تسجيل خروج</span>
            </button>
          </div>
        </div>
      </motion.aside>

      <aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setExpandedMenus([]) }}
        className={cn(
          "hidden lg:flex flex-col fixed right-0 top-0 h-screen z-30 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] bg-surface/80 backdrop-blur-2xl border-l border-border shadow-[0_0_30px_rgba(217,119,6,0.06)]",
          hovered ? "w-[240px]" : "w-[64px]"
        )}
      >
        <div className={cn(
          "flex items-center border-b border-border transition-all duration-300",
          hovered ? "px-4 py-4 justify-start gap-3" : "px-0 py-4 justify-center"
        )}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="w-9 h-9 rounded-[12px] bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-[0_0_12px_rgba(217,119,6,0.15)]"
          >
            T
          </motion.div>
          <AnimatePresence>
            {hovered && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-bold text-text text-lg whitespace-nowrap"
              >
                TeacherOS
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav className={cn(
          "flex-1 overflow-y-auto overflow-x-hidden transition-all duration-300",
          hovered ? "p-2 space-y-0.5" : "p-2 space-y-1"
        )}>
          {roleNavItems.map((item) => (<DesktopNavLink key={item.href} item={item} />))}
        </nav>

        <div className="border-t border-border p-2">
          <button type="button" className={cn(
            "flex items-center transition-all duration-200 rounded-[12px] text-text-tertiary hover:bg-card hover:text-error group",
            hovered ? "gap-3 w-full px-3 py-2.5 text-sm font-medium" : "justify-center w-10 h-10 mx-auto"
          )}>
            <HiLogout className="w-5 h-5 shrink-0" />
            {hovered && <span className="truncate">تسجيل خروج</span>}
          </button>
        </div>
      </aside>
    </>
  )
}

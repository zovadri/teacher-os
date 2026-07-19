"use client"

import { useState, useMemo } from "react"
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
  HiOfficeBuilding, HiCollection, HiCube, HiClipboard, HiTemplate,
  HiArchive, HiSearch, HiSwitchHorizontal, HiUpload, HiServer, HiCheckCircle,
} from "react-icons/hi"

interface NavItem {
  label: string
  icon: React.ElementType
  href: string
  children?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  { label: "ظ„ظˆط­ط© ط§ظ„طھط­ظƒظ…", icon: HiHome, href: "/teacher" },
  {
    label: "ط§ظ„ظƒظˆط±ط³ط§طھ", icon: HiBookOpen, href: "/teacher/courses",
    children: [
      { label: "ط¬ظ…ظٹط¹ ط§ظ„ظƒظˆط±ط³ط§طھ", href: "/teacher/courses" },
      { label: "ط¥ط¶ط§ظپط© ظƒظˆط±ط³", href: "/teacher/courses/create" },
      { label: "ط¬ط¯ظˆظ„ ط§ظ„ظƒظˆط±ط³ط§طھ", href: "/teacher/courses/schedule" },
      { label: "طھطµظ†ظٹظپط§طھ", href: "/teacher/courses/categories" },
      { label: "ظ…ط³ط§ط± ط§ظ„طھط¹ظ„ظ…", href: "/teacher/courses/learning-path" },
    ],
  },
  {
    label: "ط§ظ„ط·ظ„ط§ط¨", icon: HiUserGroup, href: "/teacher/students",
    children: [
      { label: "ط¬ظ…ظٹط¹ ط§ظ„ط·ظ„ط§ط¨", href: "/teacher/students" },
      { label: "ظƒط´ظپ ط§ظ„ط¯ط±ط¬ط§طھ", href: "/teacher/students/transcript" },
      { label: "ط¨ط·ط§ظ‚ط§طھ ط§ظ„ط·ظ„ط§ط¨", href: "/teacher/students/id-cards" },
      { label: "ط§ظ„طھط±ظ‚ظٹط© ظˆط§ظ„ط±ط³ظˆط¨", href: "/teacher/grades/promotion" },
      { label: "ظ†ظ‚ظ„ ط§ظ„ط·ظ„ط§ط¨", href: "/teacher/students/transfers" },
    ],
  },
  {
    label: "ط§ظ„ظ…ط¬ظ…ظˆط¹ط§طھ", icon: HiCollection, href: "/teacher/groups",
    children: [
      { label: "ط¬ظ…ظٹط¹ ط§ظ„ظ…ط¬ظ…ظˆط¹ط§طھ", href: "/teacher/groups" },
      { label: "ظ‚ط§ط¦ظ…ط© ط§ظ„ط§ظ†طھط¸ط§ط±", href: "/teacher/waiting-queue" },
    ],
  },
  {
    label: "ط§ظ„ط­ط¶ظˆط±", icon: HiClipboardList, href: "/teacher/attendance",
    children: [
      { label: "طھط³ط¬ظٹظ„ ط§ظ„ط­ط¶ظˆط±", href: "/teacher/attendance" },
      { label: "ظ…ط³ط­ QR", href: "/teacher/attendance/qr" },
      { label: "طھظ‚ط§ط±ظٹط± ط§ظ„ط­ط¶ظˆط±", href: "/teacher/attendance/reports" },
    ],
  },
  {
    label: "ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ", icon: HiAcademicCap, href: "/teacher/exams",
    children: [
      { label: "ط¬ظ…ظٹط¹ ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ", href: "/teacher/exams" },
      { label: "ط¥ط¶ط§ظپط© ط§ظ…طھط­ط§ظ†", href: "/teacher/exams/create" },
      { label: "ط¥طµط¯ط§ط±ط§طھ ظ…طھط¹ط¯ط¯ط©", href: "/teacher/exams/versions" },
      { label: "طھط­ظ„ظٹظ„ ط§ظ„ط£ط³ط¦ظ„ط©", href: "/teacher/exams/analysis" },
      { label: "ط·ط¨ط§ط¹ط©", href: "/teacher/exams/print" },
      { label: "ط§ظ„ظ…طھطµط¯ط±ظٹظ†", href: "/teacher/exams/leaderboard" },
    ],
  },
  {
    label: "ط§ظ„ظˆط§ط¬ط¨ط§طھ", icon: HiClipboardList, href: "/teacher/homework",
    children: [
      { label: "ط¬ظ…ظٹط¹ ط§ظ„ظˆط§ط¬ط¨ط§طھ", href: "/teacher/homework" },
      { label: "ط¥ط¶ط§ظپط© ظˆط§ط¬ط¨", href: "/teacher/homework/create" },
    ],
  },
  {
    label: "ط¨ظ†ظƒ ط§ظ„ط£ط³ط¦ظ„ط©", icon: HiQuestionMarkCircle, href: "/teacher/questions",
    children: [
      { label: "ط¬ظ…ظٹط¹ ط§ظ„ط£ط³ط¦ظ„ط©", href: "/teacher/questions" },
      { label: "ط§ظ„طھطµظ†ظٹظپط§طھ", href: "/teacher/questions/categories" },
    ],
  },
  {
    label: "ط§ظ„طھط³ط¬ظٹظ„ط§طھ", icon: HiUserGroup, href: "/teacher/enrollments",
    children: [
      { label: "ط¬ظ…ظٹط¹ ط§ظ„طھط³ط¬ظٹظ„ط§طھ", href: "/teacher/enrollments" },
      { label: "ط§ظ„ط¨ط§ظ‚ط§طھ", href: "/teacher/enrollments/bundles" },
    ],
  },
  { label: "ط§ظ„ط¥ط¹ظ„ط§ظ†ط§طھ", icon: HiBell, href: "/teacher/announcements" },
  { label: "ط£ظˆظ„ظٹط§ط، ط§ظ„ط£ظ…ظˆط±", icon: HiUserGroup, href: "/teacher/parents" },
  { label: "ط§ظ„طھظ‚ظˆظٹظ…", icon: HiCalendar, href: "/teacher/calendar" },
  { label: "ط§ظ„ط§ط´طھط±ط§ظƒط§طھ", icon: HiCreditCard, href: "/teacher/subscriptions" },
  { label: "ط§ظ„ط£ظƒظˆط§ط¯", icon: HiStar, href: "/teacher/codes" },
  {
    label: "ط§ظ„ظ…ط§ظ„ظٹط©", icon: HiCash, href: "/teacher/finance",
    children: [
      { label: "ظ„ظˆط­ط© ط§ظ„ظ…ط§ظ„ظٹط©", href: "/teacher/finance" },
      { label: "ط¥ط­طµط§ط¦ظٹط§طھ ط§ظ„ظƒظˆط±ط³ط§طھ", href: "/teacher/finance/courses" },
      { label: "ط§ظ„ظ…ط­ط§ط³ط¨ط©", href: "/teacher/accounting" },
    ],
  },
  {
    label: "ط§ظ„ظ…ط¯ظپظˆط¹ط§طھ", icon: HiCreditCard, href: "/teacher/payments/installments",
    children: [
      { label: "ط§ظ„ط£ظ‚ط³ط§ط·", href: "/teacher/payments/installments" },
      { label: "ظ…طھط§ط¨ط¹ط© ط§ظ„ط£ظ‚ط³ط§ط·", href: "/teacher/payments/installments/tracking" },
      { label: "ط§ظ„ظƒظˆط¨ظˆظ†ط§طھ", href: "/teacher/payments/coupons" },
      { label: "ط§ظ„ط¥ظٹطµط§ظ„ط§طھ", href: "/teacher/payments/receipts" },
      { label: "ط§ظ„ظ…ط³طھط±ط¬ط¹", href: "/teacher/payments/refunds" },
    ],
  },
  { label: "ط§ظ„ظ…ط­ظپط¸ط©", icon: HiCreditCard, href: "/teacher/wallet" },
  { label: "ط§ظ„ط±ط³ط§ط¦ظ„", icon: HiSupport, href: "/teacher/messages" },
  {
    label: "ط§ظ„طھط­ظ„ظٹظ„ط§طھ", icon: HiChartBar, href: "/teacher/analytics",
    children: [
      { label: "ظ„ظˆط­ط© ط§ظ„طھط­ظ„ظٹظ„ط§طھ", href: "/teacher/analytics" },
      { label: "ط§ظ„طھظ‚ط§ط±ظٹط±", href: "/teacher/analytics/reports" },
    ],
  },
  { label: "ط¯ظپطھط± ط§ظ„ط¯ط±ط¬ط§طھ", icon: HiAcademicCap, href: "/teacher/gradebook" },
  {
    label: "ظ…ط±ظƒط² ط§ظ„طھظ‚ط§ط±ظٹط±", icon: HiDocumentReport, href: "/teacher/reports",
    children: [
      { label: "ط¬ظ…ظٹط¹ ط§ظ„طھظ‚ط§ط±ظٹط±", href: "/teacher/reports" },
      { label: "طھظ‚ط§ط±ظٹط± ط§ظ„ط£ظ‡ط§ظ„ظٹ", href: "/teacher/reports/parents" },
      { label: "طھظ‚ط§ط±ظٹط± ط§ظ„طھط¹ظ„ظ…", href: "/teacher/reports/learning" },
    ],
  },
  { label: "ط§ظ„ط¥ط´ط¹ط§ط±ط§طھ", icon: HiBell, href: "/teacher/notifications" },
  { label: "ط§ظ„ظ…ظˆط§ظپظ‚ط§طھ", icon: HiCheckCircle, href: "/teacher/approvals" },
  { label: "ط§ظ„ط´ظ‡ط§ط¯ط§طھ", icon: HiDocumentReport, href: "/teacher/certificates" },
  { label: "ظ…ط±ظƒط² ط§ظ„طھظˆط§طµظ„", icon: HiSupport, href: "/teacher/communication" },
  { label: "ط§ظ„ط§ط³طھظ‚ط¨ط§ظ„", icon: HiHome, href: "/teacher/reception" },
  { label: "ط§ظ„ط¹ظ…ظ„ط§ط، ط§ظ„ظ…ط­طھظ…ظ„ظٹظ†", icon: HiUserGroup, href: "/teacher/crm/leads" },
  {
    label: "ط¥ط¯ط§ط±ط© ط§ظ„ظ…ط±ظƒط²", icon: HiOfficeBuilding, href: "/teacher/branches",
    children: [
      { label: "ط§ظ„ظپط±ظˆط¹", href: "/teacher/branches" },
      { label: "ط§ظ„ظ‚ط§ط¹ط§طھ", href: "/teacher/classrooms" },
      { label: "ط­ط¬ط² ط§ظ„ظ‚ط§ط¹ط§طھ", href: "/teacher/classrooms/reservations" },
      { label: "ط§ظ„ظ…ظˆط¸ظپظٹظ†", href: "/teacher/employees" },
      { label: "المرتبات", href: "/teacher/employees/salaries" },
      { label: "ط§ظ„ظ…ط®ط²ظˆظ†", href: "/teacher/inventory" },
      { label: "ط§ظ„ظ…طµط±ظˆظپط§طھ", href: "/teacher/expenses" },
    ],
  },
  { label: "ط§ظ„ظ…ظˆط¸ظپظٹظ†", icon: HiShieldCheck, href: "/teacher/staff" },
  { label: "ط§ظ„ظ…ظ„ظپط§طھ", icon: HiPhotograph, href: "/teacher/files" },
  {
    label: "ط§ظ„ظپظٹط¯ظٹظˆظ‡ط§طھ", icon: HiAcademicCap, href: "/teacher/videos",
    children: [
      { label: "ط¬ظ…ظٹط¹ ط§ظ„ظپظٹط¯ظٹظˆظ‡ط§طھ", href: "/teacher/videos" },
      { label: "طھط­ظ„ظٹظ„ط§طھ ط§ظ„ظپظٹط¯ظٹظˆ", href: "/teacher/videos/analytics" },
      { label: "ط­ظ…ط§ظٹط© ط§ظ„ظپظٹط¯ظٹظˆ", href: "/teacher/videos/protection" },
      { label: "ط­ظ…ط§ظٹط© ظ…طھظ‚ط¯ظ…ط©", href: "/teacher/videos/protection/advanced" },
    ],
  },
  {
    label: "ط¥ط¯ط§ط±ط© ط§ظ„ظ…ط­طھظˆظ‰", icon: HiBookOpen, href: "/teacher/cms",
    children: [
      { label: "ظ„ظˆط­ط© ط§ظ„ظ…ط­طھظˆظ‰", href: "/teacher/cms" },
      { label: "ط§ظ„طµظپط­ط© ط§ظ„ط±ط¦ظٹط³ظٹط©", href: "/teacher/cms/homepage" },
      { label: "ط§ظ„ظ…ط¸ظ‡ط±", href: "/teacher/cms/theme" },
      { label: "ط§ظ„ط¹ظ„ط§ظ…ط© ط§ظ„طھط¬ط§ط±ظٹط©", href: "/teacher/cms/branding" },
      { label: "طھط­ط³ظٹظ† ظ…ط­ط±ظƒط§طھ ط§ظ„ط¨ط­ط«", href: "/teacher/cms/seo" },
    ],
  },
  {
    label: "ط§ظ„ط£ظ„ط¹ط§ط¨", icon: HiStar, href: "/teacher/gamification",
    children: [
      { label: "ط¬ظ…ظٹط¹ ط§ظ„ط£ظ„ط¹ط§ط¨", href: "/teacher/gamification" },
      { label: "ط§ظ„ط¥ظ†ط¬ط§ط²ط§طھ", href: "/teacher/gamification/achievements" },
      { label: "ط§ظ„ط´ط§ط±ط§طھ", href: "/teacher/gamification/badges" },
    ],
  },
  { label: "ط§ظ„ط¬ظ„ط³ط§طھ", icon: HiClock, href: "/teacher/sessions" },
  { label: "ط§ظ„ط³ظ†ظˆط§طھ ط§ظ„ط¯ط±ط§ط³ظٹط©", icon: HiCalendar, href: "/teacher/academic-years" },
  { label: "ط§ط³طھظٹط±ط§ط¯ / طھطµط¯ظٹط±", icon: HiUpload, href: "/teacher/data/import-export" },
  { label: "ط§ظ„ط¬ط¯ظˆظ„ ط§ظ„ظ…طھظ‚ط¯ظ…", icon: HiCalendar, href: "/teacher/schedule" },
  { label: "ط§ظ„ظ…ط®ط·ط· ط§ظ„ط£ط³ط¨ظˆط¹ظٹ", icon: HiClock, href: "/teacher/planner/weekly" },
  { label: "ط§ظ„ظ†ط³ط® ط§ظ„ط§ط­طھظٹط§ط·ظٹ", icon: HiDocumentReport, href: "/teacher/backup" },
  { label: "ظ…ط±ظƒط² ط§ظ„ط£ط±ط´ظٹظپ", icon: HiArchive, href: "/teacher/archive" },
  {
    label: "ط³ط¬ظ„ ط§ظ„طھط¯ظ‚ظٹظ‚", icon: HiClipboard, href: "/teacher/audit-log",
    children: [
      { label: "ط³ط¬ظ„ ط§ظ„ظ†ط´ط§ط·ط§طھ", href: "/teacher/audit-log" },
      { label: "ط³ط¬ظ„ ط§ظ„ظ†ط¸ط§ظ…", href: "/teacher/system-logs" },
      { label: "ط§ظ„طµظ„ط§ط­ظٹط§طھ", href: "/teacher/permissions" },
    ],
  },
  { label: "ط§ظ„ط¨ط­ط« ط§ظ„ظ…طھظ‚ط¯ظ…", icon: HiSearch, href: "/teacher/search" },
  { label: "ط§ظ„ط¥ط¹ط¯ط§ط¯ط§طھ", icon: HiCog, href: "/teacher/settings" },
  { label: "ط§ظ„ط¯ط¹ظ… ط§ظ„ظپظ†ظٹ", icon: HiSupport, href: "/teacher/support" },
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

const otherLinks = [
  { label: "لوحة الطالب", icon: HiAcademicCap, href: "/student" },
  { label: "لوحة ولي الأمر", icon: HiUserGroup, href: "/parent" },
  { label: "لوحة الموظفين", icon: HiStar, href: "/staff" },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const { user } = useAuthStore()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

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
        {roleNavItems.map((item) => (<NavLink key={item.href} item={item} />))}

        {!collapsed && user?.role === "teacher" && (
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
        <button type="button" className={cn(
          "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-text-tertiary hover:bg-surface-tertiary hover:text-error transition-all",
        )}>
          <HiLogout className="w-5 h-5 shrink-0" />
          {!collapsed && <span>طھط³ط¬ظٹظ„ ط®ط±ظˆط¬</span>}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button type="button"
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

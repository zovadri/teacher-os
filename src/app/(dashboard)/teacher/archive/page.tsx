"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineArchive,
  HiOutlineUserGroup,
  HiOutlineBookOpen,
  HiOutlineAcademicCap,
  HiOutlineDocumentText,
  HiOutlineMail,
  HiOutlineSearch,
  HiOutlineRefresh,
  HiOutlineDatabase,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineSwitchHorizontal,
  HiOutlineFilter,
  HiOutlineX,
} from "react-icons/hi"
import { Archive, RotateCcw, Inbox } from "lucide-react"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Badge } from "@/components/ui/Badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Table } from "@/components/ui/Table"
import { Modal } from "@/components/ui/Modal"
import { SearchInput } from "@/components/ui/SearchInput"
import { EmptyState } from "@/components/ui/EmptyState"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { useNotificationStore } from "@/lib/notification-store"
import { cn, formatDate, det } from "@/lib/utils"

type ArchiveTab = "students" | "courses" | "exams" | "invoices" | "messages"

interface ArchiveItem {
  id: string
  name: string
  identifier: string
  archivedDate: Date
  archivedBy: string
  size: string
  reason: string
}

const tabConfig: { id: ArchiveTab; label: string; icon: React.ReactNode }[] = [
  { id: "students", label: "ط§ظ„ط·ظ„ط§ط¨", icon: <HiOutlineUserGroup className="w-4 h-4" /> },
  { id: "courses", label: "ط§ظ„ظƒظˆط±ط³ط§طھ", icon: <HiOutlineBookOpen className="w-4 h-4" /> },
  { id: "exams", label: "ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ", icon: <HiOutlineAcademicCap className="w-4 h-4" /> },
  { id: "invoices", label: "ط§ظ„ظپظˆط§طھظٹط±", icon: <HiOutlineDocumentText className="w-4 h-4" /> },
  { id: "messages", label: "ط§ظ„ط±ط³ط§ط¦ظ„", icon: <HiOutlineMail className="w-4 h-4" /> },
]

const names: Record<ArchiveTab, string[]> = {
  students: [
    "ط£ط­ظ…ط¯ ط®ط§ظ„ط¯ ط¹ط¨ط¯ ط§ظ„ظ„ظ‡",
    "ظ…ط±ظˆط§ظ† ط³ط§ظ…ظٹ ط¹ط§ط¯ظ„",
    "ظ„ظٹظ„ظ‰ ظ…ط­ظ…ط¯ ط­ط³ظ†",
    "ظ†ظˆط± ط¹ط¨ط¯ ط§ظ„ط±ط­ظ…ظ† ط¹ظ„ظٹ",
    "ظٹظˆط³ظپ ط¹ظ…ط±ظˆ ط¥ط¨ط±ط§ظ‡ظٹظ…",
    "ط³ط§ط±ط© ط£ط­ظ…ط¯ ظ…ط­ظ…ظˆط¯",
    "ط¹ظ…ط± ظ‡ط§ظ†ظٹ ط¹ط«ظ…ط§ظ†",
    "ط¯ظٹظ†ط§ ظˆظ„ظٹط¯ ظƒظ…ط§ظ„",
    "ط®ط§ظ„ط¯ ظ…طµط·ظپظ‰ ط´ط±ظٹظپ",
    "ط±ظٹظ… ط¬ظ…ط§ظ„ ط§ظ„ط¯ظٹظ†",
  ],
  courses: [
    "ط§ظ„ظ†ط­ظˆ ط§ظ„ظ…طھظ‚ط¯ظ… - طھط±ظ… ط«ط§ظ†",
    "ط§ظ„ط¨ظ„ط§ط؛ط© ظ„ظ„ظ†ط¸ط§ظ… ط§ظ„ط­ط¯ظٹط«",
    "ط§ظ„ظ†طµظˆطµ ط§ظ„ط£ط¯ط¨ظٹط© ط«ط§ظ†ظٹط© ط«ط§ظ†ظˆظٹ",
    "ظ‚ظˆط§ط¹ط¯ ط§ظ„ط¥ظ…ظ„ط§ط، ظˆط§ظ„ط®ط·",
    "ط§ظ„طھط¹ط¨ظٹط± ط§ظ„ط¥ط¨ط¯ط§ط¹ظٹ",
    "ط§ظ„ظ…ط±ط§ط¬ط¹ط© ط§ظ„ظ†ظ‡ط§ط¦ظٹط© ط§ظ„ط´ط§ظ…ظ„ط©",
    "ط§ظ„ظ†ط­ظˆ ط§ظ„طھط·ط¨ظٹظ‚ظٹ",
    "ظپظ‚ظ‡ ط§ظ„ظ„ط؛ط© ط§ظ„ط¹ط±ط¨ظٹط©",
    "ط§ظ„ط£ط¯ط¨ ط§ظ„ط­ط¯ظٹط« ظˆط§ظ„ظ…ط¹ط§طµط±",
    "ط§ظ„ظ†ظ‚ط¯ ط§ظ„ط£ط¯ط¨ظٹ",
  ],
  exams: [
    "ط§ط®طھط¨ط§ط± ط§ظ„ظ†ط­ظˆ ط§ظ„ط´ظ‡ط±ظٹ - ظ…ط§ط±ط³",
    "ط§ظ…طھط­ط§ظ† ط§ظ„ط¨ظ„ط§ط؛ط© ظ…ظ†طھطµظپ ط§ظ„طھط±ظ…",
    "ط§ط®طھط¨ط§ط± ط§ظ„ظ†طµظˆطµ ط§ظ„ط£ط¯ط¨ظٹط©",
    "ط§ظ…طھط­ط§ظ† ط§ظ„طھط¹ط¨ظٹط± ط§ظ„ظ†ظ‡ط§ط¦ظٹ",
    "ط§ط®طھط¨ط§ط± ط§ظ„ط¥ظ…ظ„ط§ط، ط§ظ„طھظ‚ظٹظٹظ…ظٹ",
    "ط§ظ…طھط­ط§ظ† ط§ظ„ظ…ط±ط§ط¬ط¹ط© ط§ظ„ط£ظˆظ„ظ‰",
    "ط§ط®طھط¨ط§ط± ط§ظ„ظپطµظ„ ط§ظ„ط¯ط±ط§ط³ظٹ ط§ظ„ط£ظˆظ„",
    "ط§ظ…طھط­ط§ظ† طھط¬ط±ظٹط¨ظٹ 3",
    "ط§ط®طھط¨ط§ط± ط§ظ„طھظ‚ظٹظٹظ… ط§ظ„ط£ط³ط¨ظˆط¹ظٹ",
    "ط§ظ…طھط­ط§ظ† ظ†ظ‡ط§ظٹط© ط§ظ„طھط±ظ…",
  ],
  invoices: [
    "ظپط§طھظˆط±ط© ط§ط´طھط±ط§ظƒ ط£ط­ظ…ط¯ ط®ط§ظ„ط¯",
    "ظپط§طھظˆط±ط© طھط¬ط¯ظٹط¯ ظ„ظٹظ„ظ‰ ظ…ط­ظ…ط¯",
    "ظپط§طھظˆط±ط© ظƒظˆط±ط³ ط§ظ„ظ†ط­ظˆ ظ„ظٹظˆط³ظپ",
    "ظپط§طھظˆط±ط© ط¨ط§ظ‚ط© ط¹ظ…ط± ط§ظ„ط³ظ†ظˆظٹط©",
    "ظپط§طھظˆط±ط© ط§ط´طھط±ط§ظƒ ط¯ظٹظ†ط§ ظˆظ„ظٹط¯",
    "ظپط§طھظˆط±ط© ظƒظˆط±ط³ ط§ظ„ط¨ظ„ط§ط؛ط© ظ„ظ†ظˆط±",
    "ظپط§طھظˆط±ط© طھط¬ط¯ظٹط¯ ظ…ط±ظˆط§ظ† ط³ط§ظ…ظٹ",
    "ظپط§طھظˆط±ط© ط¨ط§ظ‚ط© ط³ط§ط±ط© ط§ظ„ط«ظ„ط§ط«ظٹط©",
    "ظپط§طھظˆط±ط© ط§ط´طھط±ط§ظƒ ط®ط§ظ„ط¯ ظ…طµط·ظپظ‰",
    "ظپط§طھظˆط±ط© ظƒظˆط±ط³ ط§ظ„طھط¹ط¨ظٹط± ظ„ط±ظٹظ…",
  ],
  messages: [
    "ط§ط³طھظپط³ط§ط± ط¹ظ† ظ†طھظٹط¬ط© ط§ظ„ط§ظ…طھط­ط§ظ†",
    "ط·ظ„ط¨ طھط£ط¬ظٹظ„ ظˆط§ط¬ط¨ ط§ظ„ظ†ط­ظˆ",
    "ط´ظƒظˆظ‰ ظ…ظ† ظ…ط­طھظˆظ‰ ط§ظ„ظپظٹط¯ظٹظˆ",
    "ط§ط³طھظپط³ط§ط± ط¹ظ† ظ…ظˆط¹ط¯ ط§ظ„ظ…ط­ط§ط¶ط±ط©",
    "ط·ظ„ط¨ ظ…ط±ط§ط¬ط¹ط© ط§ظ„ط¯ط±ط³ ط§ظ„ط«ط§ظ„ط«",
    "ط´ظƒط± ظˆطھظ‚ط¯ظٹط± ظ„ظ„ظ…ط¯ط±ط³",
    "ظ…ط´ظƒظ„ط© ظپظٹ طھط³ط¬ظٹظ„ ط§ظ„ط¯ط®ظˆظ„",
    "ط·ظ„ط¨ ط¥ط¹ط§ط¯ط© طھطµط­ظٹط­ ط§ظ„ط§ظ…طھط­ط§ظ†",
    "ط§ط³طھظپط³ط§ط± ط¹ظ† ط¬ط¯ظˆظ„ ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ",
    "ط·ظ„ط¨ طھط­ظˆظٹظ„ ظ…ط¬ظ…ظˆط¹ط©",
  ],
}

const staffNames = [
  "ط£ط­ظ…ط¯ ظ…ط­ظ…ط¯ (ظ…ط¯ظٹط± ط§ظ„ظ†ط¸ط§ظ…)",
  "ظ†ظˆط±ط§ ط­ط³ظ† (ط¯ط¹ظ… ظپظ†ظٹ)",
  "ظ…ط­ظ…ط¯ ط¹ظ„ظٹ (ظ…ط´ط±ظپ)",
  "ط³ط§ظ…ظٹ ط¹ط¨ط¯ ط§ظ„ظ„ظ‡ (ظ…ط­ط§ط³ط¨)",
  "ظ‡ظ†ط¯ ظ…طµط·ظپظ‰ (ظ…ط´ط±ظپ ظ…ط­طھظˆظ‰)",
]

const reasons = [
  "ط؛ظٹط± ظ†ط´ط· ظ„ظ…ط¯ط© 6 ط£ط´ظ‡ط±",
  "ط§ظ†طھظ‡ط§ط، ط§ظ„ط§ط´طھط±ط§ظƒ",
  "ط·ظ„ط¨ ط­ط°ظپ ط§ظ„ط­ط³ط§ط¨",
  "ط¨ظٹط§ظ†ط§طھ ظ…ظƒط±ط±ط©",
  "ط§ظ†طھظ‡ط§ط، ط¯ظˆط±ط© ط§ظ„ظƒظˆط±ط³",
  "ط·ظ„ط¨ ط§ظ„ظ…ط¹ظ„ظ…",
  "طھط¬ط§ظˆط² ط§ظ„ظ…ط¯ط© ط§ظ„ظ‚ط§ظ†ظˆظ†ظٹط©",
  "ط¥ظ„ط؛ط§ط، ط§ظ„ط§ط´طھط±ط§ظƒ",
]

function generateArchiveData(tab: ArchiveTab): ArchiveItem[] {
  const items: ArchiveItem[] = []
  const count = Math.floor(det() * 3) + 8
  const tabNames = names[tab]
  for (let i = 0; i < count; i++) {
    const day = Math.floor(det() * 28) + 1
    const month = Math.floor(det() * 6) + 1
    const year = Math.floor(det() * 2) + 2024
    items.push({
      id: `arch-${tab}-${i + 1}`,
      name: tabNames[i % tabNames.length],
      identifier: tab === "students" ? `STU-${String(i + 1).padStart(4, "0")}`
        : tab === "courses" ? `CRS-${String(i + 1).padStart(4, "0")}`
        : tab === "exams" ? `EXM-${String(i + 1).padStart(4, "0")}`
        : tab === "invoices" ? `INV-${String(i + 1).padStart(4, "0")}`
        : `MSG-${String(i + 1).padStart(4, "0")}`,
      archivedDate: new Date(year, month - 1, day),
      archivedBy: staffNames[i % staffNames.length],
      size: tab === "messages" ? `${Math.floor(det() * 50) + 5} ظƒظٹظ„ظˆط¨ط§ظٹطھ`
        : tab === "exams" ? `${Math.floor(det() * 10) + 5} ط£ط³ط¦ظ„ط©`
        : tab === "invoices" ? `${Math.floor(det() * 2000) + 500} ط±.ط³`
        : `${Math.floor(det() * 500) + 50} ظ…ظٹط¬ط§ط¨ط§ظٹطھ`,
      reason: reasons[i % reasons.length],
    })
  }
  return items.sort((a, b) => b.archivedDate.getTime() - a.archivedDate.getTime())
}

const allArchiveData: Record<ArchiveTab, ArchiveItem[]> = {
  students: generateArchiveData("students"),
  courses: generateArchiveData("courses"),
  exams: generateArchiveData("exams"),
  invoices: generateArchiveData("invoices"),
  messages: generateArchiveData("messages"),
}

const autoArchiveRules = [
  { label: "ط£ط±ط´ظپط© طھظ„ظ‚ط§ط¦ظٹط© ظ„ظ„ط·ظ„ط§ط¨ ط؛ظٹط± ط§ظ„ظ†ط´ط·ظٹظ†", value: "6 ط£ط´ظ‡ط±", icon: HiOutlineUserGroup },
  { label: "ط£ط±ط´ظپط© ط§ظ„ظƒظˆط±ط³ط§طھ ط§ظ„ظ…ظ†طھظ‡ظٹط©", value: "ط´ظ‡ط± ط¨ط¹ط¯ ط§ظ„ط§ظ†طھظ‡ط§ط،", icon: HiOutlineBookOpen },
  { label: "ط£ط±ط´ظپط© ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ ط§ظ„ظ‚ط¯ظٹظ…ط©", value: "ط³ظ†ط© ظˆط§ط­ط¯ط©", icon: HiOutlineAcademicCap },
  { label: "ط£ط±ط´ظپط© ط§ظ„ظپظˆط§طھظٹط± ط§ظ„ظ…ط¯ظپظˆط¹ط© ظ‚ط¯ظٹظ…ط§ظ‹", value: "ط³ظ†طھط§ظ†", icon: HiOutlineDocumentText },
  { label: "ط£ط±ط´ظپط© ط§ظ„ط±ط³ط§ظ„ط© ط§ظ„ظ…ظ‚ط±ظˆط،ط©", value: "3 ط£ط´ظ‡ط±", icon: HiOutlineMail },
]

const monthNames = [
  "ظٹظ†ط§ظٹط±", "ظپط¨ط±ط§ظٹط±", "ظ…ط§ط±ط³", "ط£ط¨ط±ظٹظ„", "ظ…ط§ظٹظˆ", "ظٹظˆظ†ظٹظˆ",
  "ظٹظˆظ„ظٹظˆ", "ط£ط؛ط³ط·ط³", "ط³ط¨طھظ…ط¨ط±", "ط£ظƒطھظˆط¨ط±", "ظ†ظˆظپظ…ط¨ط±", "ط¯ظٹط³ظ…ط¨ط±",
]

export default function ArchivePage() {
  const [activeTab, setActiveTab] = useState<ArchiveTab>("students")
  const [searchQuery, setSearchQuery] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [showDateFilter, setShowDateFilter] = useState(false)
  const [restoreTarget, setRestoreTarget] = useState<ArchiveItem | null>(null)
  const [restoreTab, setRestoreTab] = useState<ArchiveTab>("students")
  const [showSettings, setShowSettings] = useState(false)
  const { addToast } = useNotificationStore()

  const archivedThisMonth = useMemo(() => {
    const now = new Date()
    let count = 0
    for (const tab of Object.values(allArchiveData)) {
      for (const item of tab) {
        if (
          item.archivedDate.getMonth() === now.getMonth() &&
          item.archivedDate.getFullYear() === now.getFullYear()
        ) {
          count++
        }
      }
    }
    return count
  }, [])

  const totalArchived = useMemo(() => {
    let count = 0
    for (const tab of Object.values(allArchiveData)) {
      count += tab.length
    }
    return count
  }, [])

  const currentData = useMemo(() => {
    const data = allArchiveData[activeTab]
    let filtered = data
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.identifier.toLowerCase().includes(q) ||
          item.archivedBy.toLowerCase().includes(q) ||
          item.reason.toLowerCase().includes(q)
      )
    }
    if (dateFrom) {
      const from = new Date(dateFrom)
      filtered = filtered.filter((item) => item.archivedDate >= from)
    }
    if (dateTo) {
      const to = new Date(dateTo)
      to.setHours(23, 59, 59, 999)
      filtered = filtered.filter((item) => item.archivedDate <= to)
    }
    return filtered
  }, [activeTab, searchQuery, dateFrom, dateTo])

  const handleRestore = () => {
    if (!restoreTarget) return
    addToast({
      type: "success",
      title: "طھظ…طھ ط§ظ„ط§ط³طھط¹ط§ط¯ط© ط¨ظ†ط¬ط§ط­",
      message: `طھظ…طھ ط§ط³طھط¹ط§ط¯ط© "${restoreTarget.name}" ظ…ظ† ط§ظ„ط£ط±ط´ظٹظپ`,
    })
    setRestoreTarget(null)
  }

  const columns = [
    {
      key: "name",
      header: "ط§ظ„ط§ط³ظ… / ط§ظ„ظ…ط¹ط±ظپ",
      render: (item: ArchiveItem) => (
        <div>
          <p className="font-medium text-text">{item.name}</p>
          <p className="text-xs text-text-tertiary mt-0.5">{item.identifier}</p>
        </div>
      ),
    },
    {
      key: "archivedDate",
      header: "طھط§ط±ظٹط® ط§ظ„ط£ط±ط´ظپط©",
      render: (item: ArchiveItem) => (
        <span className="text-sm text-text-secondary">{formatDate(item.archivedDate)}</span>
      ),
    },
    {
      key: "archivedBy",
      header: "ط¨ظˆط§ط³ط·ط©",
      render: (item: ArchiveItem) => (
        <span className="text-sm text-text-secondary">{item.archivedBy}</span>
      ),
    },
    {
      key: "size",
      header: activeTab === "exams" ? "ط¹ط¯ط¯ ط§ظ„ط£ط³ط¦ظ„ط©" : activeTab === "invoices" ? "ط§ظ„ظ…ط¨ظ„ط؛" : "ط§ظ„ط­ط¬ظ…",
      render: (item: ArchiveItem) => (
        <Badge variant="neutral" size="sm">{item.size}</Badge>
      ),
    },
    {
      key: "reason",
      header: "ط³ط¨ط¨ ط§ظ„ط£ط±ط´ظپط©",
      render: (item: ArchiveItem) => (
        <Badge variant="info" size="sm">{item.reason}</Badge>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (item: ArchiveItem) => (
        <div className="flex justify-end">
          <Button variant="outline"
            size="xs"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={() => {
              setRestoreTab(activeTab)
              setRestoreTarget(item)
            }}
          >
            ط§ط³طھط¹ط§ط¯ط©
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="ظ…ط±ظƒط² ط§ظ„ط£ط±ط´ظٹظپ" subtitle="ط¥ط¯ط§ط±ط© ط§ظ„ط¹ظ†ط§طµط± ط§ظ„ظ…ط¤ط±ط´ظپط© ظˆط§ط³طھط¹ط§ط¯طھظ‡ط§" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatsCard
          title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظ…ط¤ط±ط´ظپ"
          value={totalArchived}
          icon={HiOutlineArchive}
          color="primary"
          delay={0}
        />
        <StatsCard
          title="ظ…ط¤ط±ط´ظپ ظ‡ط°ط§ ط§ظ„ط´ظ‡ط±"
          value={archivedThisMonth}
          icon={HiOutlineCalendar}
          color="warning"
          delay={0.1}
        />
        <StatsCard
          title="طھظ…طھ ط§ظ„ط§ط³طھط¹ط§ط¯ط©"
          value={Math.floor(det() * 30) + 15}
          icon={HiOutlineRefresh}
          color="success"
          delay={0.2}
        />
        <StatsCard
          title="ط§ظ„ظ…ط³ط§ط­ط© ط§ظ„ظ…ط³طھط®ط¯ظ…ط©"
          value={`${Math.floor(det() * 8) + 4} ط¬ظٹط¬ط§ط¨ط§ظٹطھ`}
          icon={HiOutlineDatabase}
          color="info"
          delay={0.3}
        />
      </motion.div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {tabConfig.map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                    activeTab === tab.id
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "text-text-secondary hover:bg-surface-secondary hover:text-text"
                  )}
                >
                  {tab.icon}
                  {tab.label}
                  <span
                    className={cn(
                      "text-xs px-1.5 py-0.5 rounded-full",
                      activeTab === tab.id
                        ? "bg-white/20 text-white"
                        : "bg-surface-tertiary text-text-tertiary"
                    )}
                  >
                    {allArchiveData[tab.id].length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative flex-1 w-full">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="ط¨ط­ط« ظپظٹ ط§ظ„ط¹ظ†ط§طµط± ط§ظ„ظ…ط¤ط±ط´ظپط©..."
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowDateFilter(!showDateFilter)}
                className={cn(
                  "flex items-center gap-2 p-2.5 rounded-xl border transition-all duration-200",
                  showDateFilter
                    ? "border-primary bg-primary-50 dark:bg-primary-900/20 text-primary"
                    : "border-border text-text-secondary hover:bg-surface-secondary"
                )}
              >
                <HiOutlineFilter className="w-4 h-4" />
                <span className="text-sm">طھطµظپظٹط© ط¨ط§ظ„طھط§ط±ظٹط®</span>
              </button>
              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-border text-text-secondary hover:bg-surface-secondary transition-all duration-200"
              >
                <HiOutlineShieldCheck className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ط£ط±ط´ظپط©</span>
              </button>
            </div>
          </div>

          {showDateFilter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-surface-secondary rounded-xl border border-border"
            >
              <div className="flex items-center gap-2">
                <HiOutlineCalendar className="w-4 h-4 text-text-tertiary" />
                <span className="text-sm text-text-secondary">ظ…ظ†:</span>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="bg-surface border border-border rounded-lg px-3 py-1.5 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineCalendar className="w-4 h-4 text-text-tertiary" />
                <span className="text-sm text-text-secondary">ط¥ظ„ظ‰:</span>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="bg-surface border border-border rounded-lg px-3 py-1.5 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              {(dateFrom || dateTo) && (
                <button
                  type="button"
                  onClick={() => { setDateFrom(""); setDateTo("") }}
                  className="flex items-center gap-1 text-sm text-error hover:text-red-400 transition-colors"
                >
                  <HiOutlineX className="w-4 h-4" />
                  ظ…ط³ط­ ط§ظ„طھطµظپظٹط©
                </button>
              )}
            </motion.div>
          )}

          {currentData.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="ظ„ط§ طھظˆط¬ط¯ ط¹ظ†ط§طµط± ظ…ط¤ط±ط´ظپط©"
              description={searchQuery || dateFrom || dateTo ? "ظ„ط§ طھظˆط¬ط¯ ظ†طھط§ط¦ط¬ طھط·ط§ط¨ظ‚ ظ…ط¹ط§ظٹظٹط± ط§ظ„ط¨ط­ط«" : `ظ„ط§ طھظˆط¬ط¯ ط¹ظ†ط§طµط± ظ…ط¤ط±ط´ظپط© ظپظٹ ظ‚ط³ظ… ${tabConfig.find((t) => t.id === activeTab)?.label}`}
              withBackground={false}
              className="py-12"
            />
          ) : (
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-secondary border-b border-border">
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">
                      ط§ظ„ط§ط³ظ… / ط§ظ„ظ…ط¹ط±ظپ
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">
                      طھط§ط±ظٹط® ط§ظ„ط£ط±ط´ظپط©
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">
                      ط¨ظˆط§ط³ط·ط©
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">
                      {activeTab === "exams" ? "ط¹ط¯ط¯ ط§ظ„ط£ط³ط¦ظ„ط©" : activeTab === "invoices" ? "ط§ظ„ظ…ط¨ظ„ط؛" : "ط§ظ„ط­ط¬ظ…"}
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">
                      ط³ط¨ط¨ ط§ظ„ط£ط±ط´ظپط©
                    </th>
                    <th className="px-4 py-3 font-semibold text-text-secondary whitespace-nowrap w-24" />
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item, idx) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.03 }}
                      className="border-b border-border last:border-0 hover:bg-surface-secondary/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-text">{item.name}</p>
                          <p className="text-xs text-text-tertiary mt-0.5">{item.identifier}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <HiOutlineClock className="w-3.5 h-3.5 text-text-tertiary" />
                          <span className="text-sm text-text-secondary">{formatDate(item.archivedDate)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-text-secondary">{item.archivedBy}</span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="neutral" size="sm">{item.size}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="info" size="sm">{item.reason}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setRestoreTab(activeTab)
                              setRestoreTarget(item)
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border-2 border-primary text-primary hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            ط§ط³طھط¹ط§ط¯ط©
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <HiOutlineShieldCheck className="w-5 h-5 text-primary" />
                ظ‚ظˆط§ط¹ط¯ ط§ظ„ط£ط±ط´ظپط© ط§ظ„طھظ„ظ‚ط§ط¦ظٹط©
              </div>
            </CardTitle>
            <Badge variant="primary" size="sm" dot>ظ†ط´ط·</Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {autoArchiveRules.map((rule, idx) => (
                <motion.div
                  key={rule.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-surface-secondary border border-border hover:shadow-sm transition-shadow"
                >
                  <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary shrink-0">
                    <rule.icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text">{rule.label}</p>
                    <p className="text-xs text-text-tertiary mt-1">ط¨ط¹ط¯ {rule.value}</p>
                  </div>
                  <div className="mr-auto">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-9 h-5 bg-surface-tertiary rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-[-16px]" />
                    </label>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl bg-warning/10 border border-warning/20 text-xs text-warning flex items-center gap-2">
              <HiOutlineSwitchHorizontal className="w-4 h-4 shrink-0" />
              ط³ظٹطھظ… طھط·ط¨ظٹظ‚ ظ‚ظˆط§ط¹ط¯ ط§ظ„ط£ط±ط´ظپط© ط§ظ„طھظ„ظ‚ط§ط¦ظٹط© ظپظٹ ظ…ظ†طھطµظپ ظƒظ„ ط´ظ‡ط± ظˆظپظ‚ط§ظ‹ ظ„ظ„ط¥ط¹ط¯ط§ط¯ط§طھ ط£ط¹ظ„ط§ظ‡
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Modal
        isOpen={restoreTarget !== null}
        onClose={() => setRestoreTarget(null)}
        title="طھط£ظƒظٹط¯ ط§ط³طھط¹ط§ط¯ط© ط§ظ„ط¹ظ†طµط±"
        subtitle={`${tabConfig.find((t) => t.id === restoreTab)?.label} - ${restoreTarget?.name || ""}`}
        size="sm"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-surface-secondary border border-border">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">ط§ظ„ط§ط³ظ…:</span>
                <span className="font-medium text-text">{restoreTarget?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">ط§ظ„ظ…ط¹ط±ظپ:</span>
                <span className="font-medium text-text">{restoreTarget?.identifier}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">طھط§ط±ظٹط® ط§ظ„ط£ط±ط´ظپط©:</span>
                <span className="font-medium text-text">
                  {restoreTarget ? formatDate(restoreTarget.archivedDate) : ""}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">ط³ط¨ط¨ ط§ظ„ط£ط±ط´ظپط©:</span>
                <span className="font-medium text-text">{restoreTarget?.reason}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-text-secondary">
            ط³ظٹطھظ… ط§ط³طھط¹ط§ط¯ط© ظ‡ط°ط§ ط§ظ„ط¹ظ†طµط± ظ…ظ† ط§ظ„ط£ط±ط´ظٹظپ ظˆط¥ط¹ط§ط¯طھظ‡ ط¥ظ„ظ‰ ط­ط§ظ„طھظ‡ ط§ظ„ظ†ط´ط·ط©. ظ‡ظ„ ط£ظ†طھ ظ…طھط£ظƒط¯ ظ…ظ† ط§ظ„ظ…طھط§ط¨ط¹ط©طں
          </p>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestore}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-primary text-white hover:bg-primary-dark shadow-sm transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              طھط£ظƒظٹط¯ ط§ظ„ط§ط³طھط¹ط§ط¯ط©
            </button>
            <button
              type="button"
              onClick={() => setRestoreTarget(null)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-surface-secondary text-text border border-border hover:bg-surface-tertiary transition-all duration-200"
            >
              ط¥ظ„ط؛ط§ط،
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ط£ط±ط´ظپط© ط§ظ„طھظ„ظ‚ط§ط¦ظٹط©"
        subtitle="طھط®طµظٹطµ ظ‚ظˆط§ط¹ط¯ ظˆظ…ط¯ط© ط§ظ„ط£ط±ط´ظپط© ط§ظ„طھظ„ظ‚ط§ط¦ظٹط©"
        size="lg"
      >
        <div className="space-y-5">
          {autoArchiveRules.map((rule, idx) => (
            <div key={rule.label} className="flex items-start gap-4 p-4 rounded-xl bg-surface-secondary border border-border">
              <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary shrink-0">
                <rule.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text mb-2">{rule.label}</p>
                <select
                  defaultValue={rule.value}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="1 ط´ظ‡ط±">ط´ظ‡ط± ظˆط§ط­ط¯</option>
                  <option value="3 ط£ط´ظ‡ط±">3 ط£ط´ظ‡ط±</option>
                  <option value="6 ط£ط´ظ‡ط±">6 ط£ط´ظ‡ط±</option>
                  <option value="ط³ظ†ط© ظˆط§ط­ط¯ط©">ط³ظ†ط© ظˆط§ط­ط¯ط©</option>
                  <option value="ط³ظ†طھط§ظ†">ط³ظ†طھط§ظ†</option>
                  <option value="5 ط³ظ†ظˆط§طھ">5 ط³ظ†ظˆط§طھ</option>
                </select>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-2">
                <input type="checkbox" defaultChecked={idx < 4} className="sr-only peer" />
                <div className="w-10 h-6 bg-surface-tertiary rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-[-18px]" />
              </label>
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setShowSettings(false)
                addToast({ type: "success", title: "طھظ… ط­ظپط¸ ط§ظ„ط¥ط¹ط¯ط§ط¯ط§طھ", message: "طھظ… طھط­ط¯ظٹط« ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ط£ط±ط´ظپط© ط§ظ„طھظ„ظ‚ط§ط¦ظٹط© ط¨ظ†ط¬ط§ط­" })
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-primary text-white hover:bg-primary-dark shadow-sm transition-all duration-200"
            >
              ط­ظپط¸ ط§ظ„ط¥ط¹ط¯ط§ط¯ط§طھ
            </button>
            <button
              type="button"
              onClick={() => setShowSettings(false)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-surface-secondary text-text border border-border hover:bg-surface-tertiary transition-all duration-200"
            >
              ط¥ظ„ط؛ط§ط،
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

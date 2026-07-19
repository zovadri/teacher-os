"use client"

import { useState, useMemo } from "react"
import toast from "react-hot-toast"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineBell,
  HiOutlineCheckCircle,
  HiOutlineExclamation,
  HiOutlineInformationCircle,
  HiOutlineXCircle,
  HiOutlineMailOpen,
  HiOutlineArchive,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineExternalLink,
  HiOutlineSelector,
  HiOutlineCalendar,
  HiOutlineTag,
  HiOutlineFlag,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import { SearchInput } from "@/components/ui/SearchInput"
import Select from "@/components/ui/Select"
import { EmptyState } from "@/components/ui/EmptyState"
import { Modal } from "@/components/ui/Modal"
import { ConfirmDialog } from "@/components/ui/ConfirmDialog"
import { StatsCard } from "@/components/ui/StatsCard"
import { mockNotifications } from "@/lib/mock/data"
import { formatRelativeTime, cn } from "@/lib/utils"

const notificationCategories = ["all", "system", "academic", "financial", "student", "exam", "homework", "attendance"] as const

const priorityLabels: Record<string, string> = {
  high: "ط¹ط§ظ„ظٹط©",
  medium: "ظ…طھظˆط³ط·ط©",
  low: "ظ…ظ†ط®ظپط¶ط©",
}

const priorityColors: Record<string, string> = {
  high: "text-error bg-error/10",
  medium: "text-warning bg-warning/10",
  low: "text-info bg-info/10",
}

const typeIcons: Record<string, React.ElementType> = {
  info: HiOutlineInformationCircle,
  success: HiOutlineCheckCircle,
  warning: HiOutlineExclamation,
  error: HiOutlineXCircle,
}

const typeColors: Record<string, string> = {
  info: "text-info bg-info/10",
  success: "text-success bg-success/10",
  warning: "text-warning bg-warning/10",
  error: "text-error bg-error/10",
}

const typeLabels: Record<string, string> = {
  info: "ظ…ط¹ظ„ظˆظ…ط©",
  success: "ظ†ط¬ط§ط­",
  warning: "طھظ†ط¨ظٹظ‡",
  error: "ط®ط·ط£",
}

const categoryLabels: Record<string, string> = {
  system: "ط§ظ„ظ†ط¸ط§ظ…",
  academic: "ط£ظƒط§ط¯ظٹظ…ظٹ",
  financial: "ظ…ط§ظ„ظٹ",
  student: "ط·ظ„ط§ط¨",
  exam: "ط§ظ…طھط­ط§ظ†ط§طھ",
  homework: "ظˆط§ط¬ط¨ط§طھ",
  attendance: "ط­ط¶ظˆط±",
}

interface ExtendedNotification {
  id: string
  type: "info" | "success" | "warning" | "error"
  title: string
  message: string
  read: boolean
  createdAt: Date
  link?: string
  priority: "high" | "medium" | "low"
  category: "system" | "academic" | "financial" | "student" | "exam" | "homework" | "attendance"
  archived: boolean
}

const extendedMockNotifications: ExtendedNotification[] = [
  ...mockNotifications.map((n) => ({
    ...n,
    priority: (n.id === "notif-3" || n.id === "notif-4" ? "high" : n.id === "notif-2" || n.id === "notif-6" ? "low" : "medium") as "high" | "medium" | "low",
    category: (n.id === "notif-1" ? "student" : n.id === "notif-2" ? "financial" : n.id === "notif-3" ? "exam" : n.id === "notif-4" ? "financial" : n.id === "notif-5" ? "system" : "academic") as "system" | "academic" | "financial" | "student" | "exam" | "homework" | "attendance",
    archived: false,
  })),
  {
    id: "notif-7",
    type: "warning",
    title: "طھط£ط®ظٹط± ظپظٹ طھط³ظ„ظٹظ… ط§ظ„ظˆط§ط¬ط¨ط§طھ",
    message: "ظ‡ظ†ط§ظƒ 8 ط·ظ„ط§ط¨ ظ„ظ… ظٹط³ظ„ظ…ظˆط§ ظˆط§ط¬ط¨ ط§ظ„ط£ط³ط¨ظˆط¹ ط§ظ„ظ…ط§ط¶ظٹ. ظٹظڈط±ط¬ظ‰ ظ…طھط§ط¨ط¹طھظ‡ظ… ظˆط§طھط®ط§ط° ط§ظ„ط¥ط¬ط±ط§ط،ط§طھ ط§ظ„ظ„ط§ط²ظ…ط©.",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 45),
    link: "/dashboard/teacher/homework",
    priority: "medium",
    category: "homework",
    archived: false,
  },
  {
    id: "notif-8",
    type: "info",
    title: "طھط­ط¯ظٹط« ط¬ط¯ظˆظ„ ط§ظ„ط­طµطµ",
    message: "طھظ… طھط¹ط¯ظٹظ„ ط¬ط¯ظˆظ„ ط§ظ„ط­طµطµ ط§ظ„ط£ط³ط¨ظˆط¹ظٹ. ظٹظڈط±ط¬ظ‰ ظ…ط±ط§ط¬ط¹ط© ط§ظ„ط¬ط¯ظˆظ„ ط§ظ„ط¬ط¯ظٹط¯ ط¹ظ„ظ‰ ظ„ظˆط­ط© ط§ظ„طھط­ظƒظ….",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 90),
    priority: "low",
    category: "academic",
    archived: false,
  },
  {
    id: "notif-9",
    type: "success",
    title: "طھظ… طھط³ط¬ظٹظ„ 3 ط·ظ„ط§ط¨ ظپظٹ ط§ظ„ظƒظˆط±ط³",
    message: "طھظ… طھط³ط¬ظٹظ„ 3 ط·ظ„ط§ط¨ ط¬ط¯ط¯ ظپظٹ ظƒظˆط±ط³ ط§ظ„ظ†ط­ظˆ ط§ظ„ظ…طھظ‚ط¯ظ…. ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط·ظ„ط§ط¨ ط§ظ„ط¢ظ† 45 ط·ط§ظ„ط¨ط§ظ‹.",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 200),
    link: "/dashboard/teacher/courses",
    priority: "low",
    category: "student",
    archived: false,
  },
  {
    id: "notif-10",
    type: "error",
    title: "ظ…ط´ظƒظ„ط© ظپظٹ ظ†ط¸ط§ظ… ط§ظ„ط¯ظپط¹",
    message: "طھظ… ط§ظ„ط¥ط¨ظ„ط§ط؛ ط¹ظ† ط®ظ„ظ„ ظپظٹ ظ†ط¸ط§ظ… ط§ظ„ط¯ظپط¹ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹ. ظپط±ظٹظ‚ ط§ظ„طھظ‚ظ†ظٹط© ظٹط¹ظ…ظ„ ط¹ظ„ظ‰ ط­ظ„ ط§ظ„ظ…ط´ظƒظ„ط©.",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    priority: "high",
    category: "system",
    archived: false,
  },
  {
    id: "notif-11",
    type: "info",
    title: "طھظ‚ط±ظٹط± ط§ظ„ط­ط¶ظˆط± ط§ظ„ط£ط³ط¨ظˆط¹ظٹ",
    message: "ظ†ط³ط¨ط© ط­ط¶ظˆط± ط§ظ„ط·ظ„ط§ط¨ ظ‡ط°ط§ ط§ظ„ط£ط³ط¨ظˆط¹ 92%. ظ‡ظ†ط§ظƒ طھط­ط³ظ† ظ…ظ„ط­ظˆط¸ ظ…ظ‚ط§ط±ظ†ط© ط¨ط§ظ„ط£ط³ط¨ظˆط¹ ط§ظ„ظ…ط§ط¶ظٹ.",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    link: "/dashboard/teacher/attendance",
    priority: "medium",
    category: "attendance",
    archived: false,
  },
  {
    id: "notif-12",
    type: "success",
    title: "ط§ظƒطھظ…ط§ظ„ طھطµط­ظٹط­ ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ",
    message: "طھظ… ط§ظ„ط§ظ†طھظ‡ط§ط، ظ…ظ† طھطµط­ظٹط­ ط§ظ…طھط­ط§ظ†ط§طھ ط§ظ„ط´ظ‡ط± ظ„ظ…ط§ط¯ط© ط§ظ„ظ†ط­ظˆ. ط§ظ„ظ†طھط§ط¦ط¬ ط¬ط§ظ‡ط²ط© ظ„ظ„ظ†ط´ط±.",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
    link: "/dashboard/teacher/exams",
    priority: "high",
    category: "exam",
    archived: false,
  },
  {
    id: "notif-13",
    type: "warning",
    title: "ط§ظ‚طھط±ط§ط¨ ظ…ظˆط¹ط¯ ط¯ظˆط±ط© طھط¯ط±ظٹط¨ظٹط©",
    message: "ط§ظ„ط¯ظˆط±ط© ط§ظ„طھط¯ط±ظٹط¨ظٹط© ظ„ظ„ظ…ط¹ظ„ظ…ظٹظ† ط³طھط¨ط¯ط£ ط¨ط¹ط¯ ظٹظˆظ…ظٹظ†. ظٹظڈط±ط¬ظ‰ طھط£ظƒظٹط¯ ط§ظ„ط­ط¶ظˆط±.",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    priority: "medium",
    category: "academic",
    archived: false,
  },
  {
    id: "notif-14",
    type: "info",
    title: "ط¥ط¶ط§ظپط© ظ…ظٹط²ط© ط¬ط¯ظٹط¯ط©",
    message: "طھظ… ط¥ط¶ط§ظپط© ظ…ظٹط²ط© ط¥ظ†ط´ط§ط، ط§ظ„طھظ‚ط§ط±ظٹط± ط§ظ„ظ…ط®طµطµط©. ظٹظ…ظƒظ†ظƒ ط§ظ„ط¢ظ† طھطµط¯ظٹط± طھظ‚ط§ط±ظٹط± ظ…ط®طµطµط© ط­ط³ط¨ ط§ط­طھظٹط§ط¬ظƒ.",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    link: "/dashboard/teacher/analytics",
    priority: "low",
    category: "system",
    archived: false,
  },
]

export default function NotificationsPage() {
  const [readIds, setReadIds] = useState<string[]>(() =>
    extendedMockNotifications.filter((n) => n.read).map((n) => n.id),
  )
  const [archivedIds, setArchivedIds] = useState<string[]>([])
  const [deletedIds, setDeletedIds] = useState<string[]>([])
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [showRead, setShowRead] = useState<boolean | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [detailNotif, setDetailNotif] = useState<ExtendedNotification | null>(null)
  const [confirmAction, setConfirmAction] = useState<{
    type: "archive" | "delete" | "markRead"
    ids: string[]
  } | null>(null)

  const notifications = useMemo(() => {
    return extendedMockNotifications.filter((n) => !deletedIds.includes(n.id))
  }, [deletedIds])

  const activeList = useMemo(() => {
    return notifications.filter((n) => !archivedIds.includes(n.id))
  }, [notifications, archivedIds])

  const archivedList = useMemo(() => {
    return notifications.filter((n) => archivedIds.includes(n.id))
  }, [notifications, archivedIds])

  const stats = useMemo(() => {
    const all = notifications
    const unread = all.filter((n) => !readIds.includes(n.id))
    const highPriority = all.filter((n) => n.priority === "high")
    const archived = archivedList
    return {
      total: all.length,
      unread: unread.length,
      highPriority: highPriority.length,
      archived: archived.length,
    }
  }, [notifications, readIds, archivedList])

  const filtered = useMemo(() => {
    const source = archivedIds.length > 0 && categoryFilter === "all" && priorityFilter === "all" && showRead === null && !search
      ? notifications
      : activeList
    return source.filter((n) => {
      if (search && !n.title.includes(search) && !n.message.includes(search)) return false
      if (categoryFilter !== "all" && n.category !== categoryFilter) return false
      if (priorityFilter !== "all" && n.priority !== priorityFilter) return false
      if (showRead === true && !readIds.includes(n.id)) return false
      if (showRead === false && readIds.includes(n.id)) return false
      return true
    })
  }, [activeList, archivedList, notifications, search, categoryFilter, priorityFilter, showRead, readIds, archivedIds])

  const unreadCount = useMemo(() => notifications.filter((n) => !readIds.includes(n.id)).length, [notifications, readIds])

  const markAsRead = (id: string) => {
    setReadIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
    toast.success("تم تعيين الإشعار كمقروء")
  }

  const markAsUnread = (id: string) => {
    setReadIds((prev) => prev.filter((rid) => rid !== id))
    toast.success("تم تعيين الإشعار كغير مقروء")
  }

  const toggleRead = (id: string) => {
    if (readIds.includes(id)) markAsUnread(id)
    else markAsRead(id)
  }

  const markAllAsRead = () => {
    setReadIds((prev) => {
      const unreadIds = filtered.filter((n) => !prev.includes(n.id)).map((n) => n.id)
      return [...prev, ...unreadIds]
    })
    toast.success("تم تعيين الكل كمقروء")
  }

  const archiveSingle = (id: string) => {
    setArchivedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
    toast.success("تم أرشفة الإشعار")
  }

  const bulkArchive = (ids: string[]) => {
    setArchivedIds((prev) => {
      const newIds = ids.filter((id) => !prev.includes(id))
      return [...prev, ...newIds]
    })
    setSelectedIds([])
    toast.success(`تم أرشفة ${ids.length} إشعار`)
  }

  const bulkDelete = (ids: string[]) => {
    setDeletedIds((prev) => {
      const newIds = ids.filter((id) => !prev.includes(id))
      return [...prev, ...newIds]
    })
    setSelectedIds([])
    toast.success(`تم حذف ${ids.length} إشعار`)
  }

  const bulkMarkRead = (ids: string[]) => {
    setReadIds((prev) => {
      const newIds = ids.filter((id) => !prev.includes(id))
      return [...prev, ...newIds]
    })
    setSelectedIds([])
    toast.success(`تم تعيين ${ids.length} إشعار كمقروء`)
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
    )
  }

  const toggleSelectAll = () => {
    setSelectedIds((prev) =>
      prev.length === filtered.length ? [] : filtered.map((n) => n.id),
    )
  }

  const handleConfirmAction = () => {
    if (!confirmAction) return
    const { type, ids } = confirmAction
    if (type === "archive") bulkArchive(ids)
    else if (type === "delete") bulkDelete(ids)
    else if (type === "markRead") bulkMarkRead(ids)
    setConfirmAction(null)
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="ظ…ط±ظƒط² ط§ظ„ط¥ط´ط¹ط§ط±ط§طھ ط§ظ„ظ…طھظ‚ط¯ظ…" subtitle="ط¥ط¯ط§ط±ط© ط¬ظ…ظٹط¹ ط§ظ„ط¥ط´ط¹ط§ط±ط§طھ ظˆط§ظ„طھظ†ط¨ظٹظ‡ط§طھ" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط¥ط´ط¹ط§ط±ط§طھ"
          value={stats.total}
          icon={HiOutlineBell}
          color="primary"
          delay={0}
        />
        <StatsCard
          title="ط؛ظٹط± ظ…ظ‚ط±ظˆط،"
          value={stats.unread}
          icon={HiOutlineMailOpen}
          color="info"
          delay={0.1}
        />
        <StatsCard
          title="ط£ظˆظ„ظˆظٹط© ط¹ط§ظ„ظٹط©"
          value={stats.highPriority}
          icon={HiOutlineFlag}
          color="error"
          delay={0.2}
        />
        <StatsCard
          title="ظ…ط¤ط±ط´ظپ"
          value={stats.archived}
          icon={HiOutlineArchive}
          color="warning"
          delay={0.3}
        />
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="ط§ط¨ط­ط« ظپظٹ ط§ظ„ط¥ط´ط¹ط§ط±ط§طھ..."
            className="w-full md:w-64"
          />
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={notificationCategories.map((cat) => ({
              value: cat,
              label: cat === "all" ? "ظƒظ„ ط§ظ„طھطµظ†ظٹظپط§طھ" : categoryLabels[cat] || cat,
            }))}
            className="w-full md:w-40"
          />
          <Select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            options={[
              { value: "all", label: "ظƒظ„ ط§ظ„ط£ظˆظ„ظˆظٹط§طھ" },
              { value: "high", label: "ط¹ط§ظ„ظٹط©" },
              { value: "medium", label: "ظ…طھظˆط³ط·ط©" },
              { value: "low", label: "ظ…ظ†ط®ظپط¶ط©" },
            ]}
            className="w-full md:w-36"
          />
          <div className="flex items-center gap-1 p-1 bg-surface border border-border rounded-xl">
            {[
              { value: null, label: "ط§ظ„ظƒظ„" },
              { value: false, label: "ط؛ظٹط± ظ…ظ‚ط±ظˆط،" },
              { value: true, label: "ظ…ظ‚ط±ظˆط،" },
            ].map((f) => (
              <button type="button"
                key={String(f.value)}
                onClick={() => setShowRead(f.value)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
                  showRead === f.value
                    ? "bg-primary text-white"
                    : "text-text-secondary hover:text-text",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {unreadCount > 0 && filtered.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-secondary">
            {unreadCount} ط¥ط´ط¹ط§ط± ط؛ظٹط± ظ…ظ‚ط±ظˆط،
          </p>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<HiOutlineMailOpen size={16} />}
            onClick={markAllAsRead}
          >
            طھط­ط¯ظٹط¯ ط§ظ„ظƒظ„ ظƒظ…ظ‚ط±ظˆط، ({unreadCount})
          </Button>
        </div>
      )}

      {selectedIds.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-xl"
        >
          <span className="text-sm font-medium text-text ml-2">
            طھظ… طھط­ط¯ظٹط¯ {selectedIds.length} ط¥ط´ط¹ط§ط±
          </span>
          <Button
            variant="secondary"
            size="xs"
            leftIcon={<HiOutlineMailOpen size={14} />}
            onClick={() => setConfirmAction({ type: "markRead", ids: selectedIds })}
          >
            طھط¹ظٹظٹظ† ظ…ظ‚ط±ظˆط،
          </Button>
          <Button
            variant="secondary"
            size="xs"
            leftIcon={<HiOutlineArchive size={14} />}
            onClick={() => setConfirmAction({ type: "archive", ids: selectedIds })}
          >
            ط£ط±ط´ظپط©
          </Button>
          <Button
            variant="danger"
            size="xs"
            leftIcon={<HiOutlineTrash size={14} />}
            onClick={() => setConfirmAction({ type: "delete", ids: selectedIds })}
          >
            ط­ط°ظپ
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setSelectedIds([])}
          >
            ط¥ظ„ط؛ط§ط، ط§ظ„طھط­ط¯ظٹط¯
          </Button>
        </motion.div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon={HiOutlineBell}
          title="ظ„ط§ طھظˆط¬ط¯ ط¥ط´ط¹ط§ط±ط§طھ"
          description={
            search || categoryFilter !== "all" || priorityFilter !== "all" || showRead !== null
              ? "ظ„ظ… ظٹطھظ… ط§ظ„ط¹ط«ظˆط± ط¹ظ„ظ‰ ط¥ط´ط¹ط§ط±ط§طھ طھط·ط§ط¨ظ‚ ظ…ط¹ط§ظٹظٹط± ط§ظ„ط¨ط­ط«"
              : showRead === true
                ? "ظ„ط§ طھظˆط¬ط¯ ط¥ط´ط¹ط§ط±ط§طھ ظ…ظ‚ط±ظˆط،ط©"
                : showRead === false
                  ? "ظ„ط§ طھظˆط¬ط¯ ط¥ط´ط¹ط§ط±ط§طھ ط؛ظٹط± ظ…ظ‚ط±ظˆط،ط©"
                  : "ظ„ظٹط³ ظ„ط¯ظٹظƒ ط£ظٹ ط¥ط´ط¹ط§ط±ط§طھ ط­طھظ‰ ط§ظ„ط¢ظ†"
          }
        />
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <button type="button"`nonClick={toggleSelectAll}
              className="p-1 rounded hover:bg-surface-tertiary text-text-tertiary transition-colors"
              title="طھط­ط¯ظٹط¯ ط§ظ„ظƒظ„"
            >
              <HiOutlineSelector size={18} />
            </button>
            <span className="text-xs text-text-tertiary">
              {filtered.length} ط¥ط´ط¹ط§ط±
            </span>
          </div>
          <AnimatePresence>
            {filtered.map((notif, index) => {
              const Icon = typeIcons[notif.type] || HiOutlineInformationCircle
              const isUnread = !readIds.includes(notif.id)
              const isSelected = selectedIds.includes(notif.id)
              const PriorityIcon = notif.priority === "high" ? HiOutlineExclamation : HiOutlineFlag

              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                  transition={{ delay: index * 0.02 }}
                  layout
                >
                  <div
                    className={cn(
                      "flex items-start gap-3 p-4 rounded-xl border transition-all hover:shadow-md group",
                      isSelected
                        ? "bg-primary/5 border-primary/30 ring-1 ring-primary/20"
                        : isUnread
                          ? "bg-surface border-primary/20 shadow-sm"
                          : "bg-surface-secondary border-border",
                    )}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(notif.id)}
                        className="ml-2 w-4 h-4 rounded border-border text-primary focus:ring-primary/30 cursor-pointer"
                      />
                    </div>

                    <button type="button"
                      onClick={() => setDetailNotif(notif)}
                      className="flex items-start gap-3 flex-1 min-w-0 text-right"
                    >
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                          typeColors[notif.type],
                        )}
                      >
                        <Icon size={20} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4
                                className={cn(
                                  "text-sm truncate max-w-[200px] md:max-w-[400px]",
                                  isUnread ? "font-bold text-text" : "font-medium text-text-secondary",
                                )}
                              >
                                {notif.title}
                              </h4>
                              <div className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium", priorityColors[notif.priority])}>
                                <PriorityIcon size={10} />
                                {priorityLabels[notif.priority]}
                              </div>
                            </div>
                            <p className="text-xs text-text-tertiary mt-0.5 truncate max-w-md">
                              {notif.message}
                            </p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <Badge variant={
                                notif.category === "system" ? "info" :
                                notif.category === "academic" ? "primary" :
                                notif.category === "financial" ? "success" :
                                notif.category === "student" ? "info" :
                                notif.category === "exam" ? "warning" :
                                notif.category === "homework" ? "neutral" :
                                "neutral"
                              } size="sm">
                                {categoryLabels[notif.category] || notif.category}
                              </Badge>
                              {isUnread && (
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <span className="text-[10px] text-text-tertiary whitespace-nowrap">
                              {formatRelativeTime(notif.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>

                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <Link
                        href={notif.link || "#"}
                        onClick={(e) => { if (!notif.link) e.preventDefault() }}
                        className="p-1.5 rounded-lg hover:bg-surface-tertiary text-text-tertiary hover:text-primary transition-colors"
                        title="ط¹ط±ط¶ ط§ظ„Øµظپط­ط© ط§ظ„ظ…ط±طھط¨ط·ط©"
                      >
                        <HiOutlineExternalLink size={16} />
                      </Link>
                      <button type="button"
                        onClick={() => toggleRead(notif.id)}
                        className="p-1.5 rounded-lg hover:bg-surface-tertiary text-text-tertiary hover:text-text transition-colors"
                        title={isUnread ? "طھط¹ظٹظٹظ† ظƒظ…ظ‚ط±ظˆط،" : "طھط¹ظٹظٹظ† ظƒط؛ظٹط± ظ…ظ‚ط±ظˆط،"}
                      >
                        {isUnread ? <HiOutlineEye size={16} /> : <HiOutlineEyeOff size={16} />}
                      </button>
                      <button type="button"
                        onClick={() => archiveSingle(notif.id)}
                        className="p-1.5 rounded-lg hover:bg-surface-tertiary text-text-tertiary hover:text-text transition-colors"
                        title="ط£ط±ط´ظپط©"
                      >
                        <HiOutlineArchive size={16} />
                      </button>
                      <button type="button"
                        onClick={() => setConfirmAction({ type: "delete", ids: [notif.id] })}
                        className="p-1.5 rounded-lg hover:bg-error/10 text-text-tertiary hover:text-error transition-colors"
                        title="ط­ط°ظپ"
                      >
                        <HiOutlineTrash size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}

      {archivedList.length > 0 && categoryFilter === "all" && priorityFilter === "all" && showRead === null && !search && (
        <details className="mt-6">
          <summary className="text-sm font-medium text-text-secondary cursor-pointer hover:text-text transition-colors">
            ط§ظ„ط¥ط´ط¹ط§ط±ط§طھ ط§ظ„ظ…ط¤ط±ط´ظپط© ({archivedList.length})
          </summary>
          <div className="mt-3 space-y-2">
            {archivedList.map((notif) => {
              const Icon = typeIcons[notif.type] || HiOutlineInformationCircle
              return (
                <div
                  key={notif.id}
                  className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary/50 border border-border/50 opacity-70"
                >
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", typeColors[notif.type])}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-text-secondary truncate">{notif.title}</p>
                    <p className="text-[10px] text-text-tertiary">{formatRelativeTime(notif.createdAt)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </details>
      )}

      <div className="text-center">
        <p className="text-xs text-text-tertiary">
          ط¥ط¬ظ…ط§ظ„ظٹ {notifications.length} ط¥ط´ط¹ط§ط± آ· {stats.unread} ط؛ظٹط± ظ…ظ‚ط±ظˆط، آ· {stats.archived} ظ…ط¤ط±ط´ظپ
        </p>
      </div>

      <Modal
        isOpen={!!detailNotif}
        onClose={() => setDetailNotif(null)}
        title={detailNotif?.title || ""}
        subtitle={detailNotif ? formatRelativeTime(detailNotif.createdAt) : ""}
        size="md"
      >
        {detailNotif && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 flex-wrap">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", typeColors[detailNotif.type])}>
                {(() => {
                  const Icon = typeIcons[detailNotif.type] || HiOutlineInformationCircle
                  return <Icon size={20} />
                })()}
              </div>
              <Badge variant={
                detailNotif.priority === "high" ? "error" :
                detailNotif.priority === "medium" ? "warning" : "info"
              }>
                {priorityLabels[detailNotif.priority]}
              </Badge>
              <Badge variant={
                detailNotif.category === "system" ? "info" :
                detailNotif.category === "academic" ? "primary" :
                detailNotif.category === "financial" ? "success" :
                detailNotif.category === "student" ? "info" :
                detailNotif.category === "exam" ? "warning" :
                "neutral"
              }>
                {categoryLabels[detailNotif.category] || detailNotif.category}
              </Badge>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed">{detailNotif.message}</p>

            <div className="grid grid-cols-2 gap-3 text-xs text-text-tertiary">
              <div className="flex items-center gap-1.5">
                <HiOutlineTag size={14} />
                <span>{typeLabels[detailNotif.type]}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiOutlineCalendar size={14} />
                <span>{detailNotif.createdAt.toLocaleDateString("ar-EG")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiOutlineFlag size={14} />
                <span>ط£ظˆظ„ظˆظٹط© {priorityLabels[detailNotif.priority]}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiOutlineEye size={14} />
                <span>{readIds.includes(detailNotif.id) ? "ظ…ظ‚ط±ظˆط،" : "ط؛ظٹط± ظ…ظ‚ط±ظˆط،"}</span>
              </div>
            </div>

              <div className="flex items-center gap-2 pt-4 border-t border-border">
                {detailNotif.link && (
                  <Link href={detailNotif.link}>
                    <Button
                      variant="primary"
                      size="sm"
                      leftIcon={<HiOutlineExternalLink size={16} />}
                    >
                      ط¹ط±ط¶ ط§ظ„Øµظپط­ط©
                    </Button>
                  </Link>
                )}
                <Button
                  variant={readIds.includes(detailNotif.id) ? "secondary" : "primary"}
                  size="sm"
                  leftIcon={readIds.includes(detailNotif.id) ? <HiOutlineEyeOff size={16} /> : <HiOutlineEye size={16} />}
                  onClick={() => {
                    toggleRead(detailNotif.id)
                  }}
                >
                  {readIds.includes(detailNotif.id) ? "طھط¹ظٹظٹظ† ظƒط؛ظٹط± ظ…ظ‚ط±ظˆط،" : "طھط¹ظٹظٹظ† ظƒظ…ظ‚ط±ظˆط،"}
                </Button>
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<HiOutlineArchive size={16} />}
                onClick={() => {
                  archiveSingle(detailNotif.id)
                  setDetailNotif(null)
                }}
              >
                ط£ط±ط´ظپط©
              </Button>
              <Button
                variant="danger"
                size="sm"
                leftIcon={<HiOutlineTrash size={16} />}
                onClick={() => {
                  setDetailNotif(null)
                  setConfirmAction({ type: "delete", ids: [detailNotif.id] })
                }}
              >
                ط­ط°ظپ
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        onConfirm={handleConfirmAction}
        title={
          confirmAction?.type === "delete"
            ? "ط­ط°ظپ ط§ظ„ط¥ط´ط¹ط§ط±ط§طھ"
            : confirmAction?.type === "archive"
              ? "ط£ط±ط´ظپط© ط§ظ„ط¥ط´ط¹ط§ط±ط§طھ"
              : "طھط¹ظٹظٹظ† ظƒظ…ظ‚ط±ظˆط،"
        }
        message={
          confirmAction?.type === "delete"
            ? `ظ‡ظ„ ط£ظ†طھ ظ…طھط£ظƒط¯ ظ…ظ† ط­ط°ظپ ${confirmAction.ids.length === 1 ? "ظ‡ط°ط§ ط§ظ„ط¥ط´ط¹ط§ط±" : `ظ‡ط°ظ‡ ط§ظ„ط¥ط´ط¹ط§ط±ط§طھ (${confirmAction.ids.length})`}طں`
            : confirmAction?.type === "archive"
              ? `ظ‡ظ„ ط£ظ†طھ ظ…طھط£ظƒط¯ ظ…ظ† ط£ط±ط´ظپط© ${confirmAction.ids.length === 1 ? "ظ‡ط°ط§ ط§ظ„ط¥ط´ط¹ط§ط±" : `ظ‡ط°ظ‡ ط§ظ„ط¥ط´ط¹ط§ط±ط§طھ (${confirmAction.ids.length})`}طں`
              : `ط³ظٹطھظ… طھط¹ظٹظٹظ† ${confirmAction?.ids.length === 1 ? "ظ‡ط°ط§ ط§ظ„ط¥ط´ط¹ط§ط±" : `ظ‡ط°ظ‡ ط§ظ„ط¥ط´ط¹ط§ط±ط§طھ (${confirmAction?.ids.length})`} ظƒظ…ظ‚ط±ظˆط،`
        }
        variant={confirmAction?.type === "delete" ? "danger" : "info"}
        confirmText="طھط£ظƒظٹط¯"
        cancelText="ط¥ظ„ط؛ط§ط،"
      />
    </div>
  )
}

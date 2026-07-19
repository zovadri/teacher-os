"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineBell,
  HiOutlineCheckCircle,
  HiOutlineExclamation,
  HiOutlineInformationCircle,
  HiOutlineStar,
  HiOutlineAcademicCap,
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineCheck,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Badge } from "@/components/ui/Badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { EmptyState } from "@/components/ui/EmptyState"
import Button from "@/components/ui/Button"
import { cn, formatRelativeTime, formatDate } from "@/lib/utils"

interface ParentNotification {
  id: string
  type: "info" | "success" | "warning" | "error"
  title: string
  message: string
  read: boolean
  createdAt: Date
  icon: React.ElementType
}

const mockParentNotifications: ParentNotification[] = [
  { id: "pn-1", type: "success", title: "طھظپظˆظ‚ ط£ط­ظ…ط¯ ظپظٹ ط§ظ„ط§ظ…طھط­ط§ظ†", message: "ط­طµظ„ ط§ط¨ظ†ظƒ ط£ط­ظ…ط¯ ط¹ظ„ظ‰ 95% ظپظٹ ط§ظ…طھط­ط§ظ† ط§ظ„ظ†ط­ظˆ ط§ظ„ط´ظ‡ط±ظٹ", read: false, createdAt: new Date(Date.now() - 1000 * 60 * 30), icon: HiOutlineStar },
  { id: "pn-2", type: "warning", title: "طھط°ظƒظٹط± ط¨ظˆط§ط¬ط¨ ط§ظ„ظ†ط­ظˆ", message: "ط¨ط§ظ‚ظٹ ظٹظˆظ… ط¹ظ„ظ‰ ظ…ظˆط¹ط¯ طھط³ظ„ظٹظ… ظˆط§ط¬ط¨ ط§ظ„ظ†ط­ظˆ ط§ظ„ط£ط³ط¨ظˆط¹ظٹ", read: false, createdAt: new Date(Date.now() - 1000 * 60 * 120), icon: HiOutlineCalendar },
  { id: "pn-3", type: "info", title: "طھظ… ط¥ط¶ط§ظپط© ظ…ط­طھظˆظ‰ ط¬ط¯ظٹط¯", message: "طھظ… ط¥ط¶ط§ظپط© ظپظٹط¯ظٹظˆ ط´ط±ط­ ط¬ط¯ظٹط¯ ظ„ظƒظˆط±ط³ ط§ظ„ط¨ظ„ط§ط؛ط©", read: false, createdAt: new Date(Date.now() - 1000 * 60 * 180), icon: HiOutlineInformationCircle },
  { id: "pn-4", type: "error", title: "ط؛ظٹط§ط¨ ط£ط­ظ…ط¯", message: "ظ„ظ… ظٹط­ط¶ط± ط§ط¨ظ†ظƒ ط£ط­ظ…ط¯ ط¬ظ„ط³ط© ط§ظ„ظٹظˆظ… ظ„ظƒظˆط±ط³ ط§ظ„ظ†ط­ظˆ", read: false, createdAt: new Date(Date.now() - 1000 * 60 * 300), icon: HiOutlineExclamation },
  { id: "pn-5", type: "info", title: "طھظ‚ط±ظٹط± ط§ظ„ط£ط¯ط§ط، ط§ظ„ط´ظ‡ط±ظٹ", message: "طھظ… طھط­ط¯ظٹط« طھظ‚ط±ظٹط± ط£ط¯ط§ط، ط§ط¨ظ†ظƒ ظ„ظ„ط´ظ‡ط± ط§ظ„ط­ط§ظ„ظٹ", read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), icon: HiOutlineChartBar },
  { id: "pn-6", type: "success", title: "ط¥طھظ…ط§ظ… ظƒظˆط±ط³ ط§ظ„ظ†ط­ظˆ", message: "ط£ظƒظ…ظ„ ط§ط¨ظ†ظƒ ط£ط­ظ…ط¯ ط¨ظ†ط¬ط§ط­ ظƒظˆط±ط³ ط§ظ„ظ†ط­ظˆ ظˆط§ظ„طµط±ظپ", read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), icon: HiOutlineAcademicCap },
  { id: "pn-7", type: "info", title: "ظ…ظˆط¹ط¯ ط§ظ…طھط­ط§ظ† ط¬ط¯ظٹط¯", message: "ط³ظٹطھظ… ط¹ظ‚ط¯ ط§ظ…طھط­ط§ظ† ط§ظ„ط¨ظ„ط§ط؛ط© ظٹظˆظ… ط§ظ„ط®ظ…ظٹط³ ط§ظ„ظ‚ط§ط¯ظ…", read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72), icon: HiOutlineCalendar },
  { id: "pn-8", type: "warning", title: "ط§ظ‚طھط±ط§ط¨ ط§ظ†طھظ‡ط§ط، ط§ظ„ط§ط´طھط±ط§ظƒ", message: "ط¨ط§ظ‚ظٹ 5 ط£ظٹط§ظ… ط¹ظ„ظ‰ ط§ظ†طھظ‡ط§ط، ط§ط´طھط±ط§ظƒ ط§ط¨ظ†ظƒ ظپظٹ ط§ظ„ط¨ط§ظ‚ط© ط§ظ„ط«ظ„ط§ط«ظٹط©", read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96), icon: HiOutlineExclamation },
]

const typeConfig: Record<string, { bg: string; border: string }> = {
  info: { bg: "bg-info/10 border-info/20", border: "border-info/30" },
  success: { bg: "bg-success/10 border-success/20", border: "border-success/30" },
  warning: { bg: "bg-warning/10 border-warning/20", border: "border-warning/30" },
  error: { bg: "bg-error/10 border-error/20", border: "border-error/30" },
}

export default function ParentNotificationsPage() {
  const [notifications, setNotifications] = useState(mockParentNotifications)
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const filtered = useMemo(() => {
    return filter === "all" ? notifications : notifications.filter((n) => !n.read)
  }, [notifications, filter])

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications])

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n))
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="ط§ظ„ط¥ط´ط¹ط§ط±ط§طھ" subtitle="ظ…طھط§ط¨ط¹ط© ط¢ط®ط± ط§ظ„ظ…ط³طھط¬ط¯ط§طھ ظˆط§ظ„طھط­ط¯ظٹط«ط§طھ" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button type="button"
              onClick={() => setFilter("all")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                filter === "all" ? "bg-primary text-white" : "bg-surface-secondary text-text-secondary hover:bg-surface-tertiary"
              )}
            >
              ط§ظ„ظƒظ„
            </button>
            <button type="button"
              onClick={() => setFilter("unread")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                filter === "unread" ? "bg-primary text-white" : "bg-surface-secondary text-text-secondary hover:bg-surface-tertiary"
              )}
            >
              ط؛ظٹط± ظ…ظ‚ط±ظˆط،
              {unreadCount > 0 && (
                <span className="mr-1.5 px-1.5 py-0.5 text-xs bg-white/20 rounded-full">{unreadCount}</span>
              )}
            </button>
          </div>
        </div>
        {unreadCount > 0 && (
          <button type="button" variant="ghost" size="sm" leftIcon={<HiOutlineCheck className="w-4 h-4" />} onClick={markAllAsRead}>
            طھط­ط¯ظٹط¯ ط§ظ„ظƒظ„ ظƒظ…ظ‚ط±ظˆط،
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>ظ…ظ„ط®طµ ط§ظ„ط¥ط´ط¹ط§ط±ط§طھ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
                <div className="flex items-center gap-2">
                  <HiOutlineBell className="w-4 h-4 text-primary" />
                  <span className="text-sm text-text-secondary">ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط¥ط´ط¹ط§ط±ط§طھ</span>
                </div>
                <span className="text-sm font-bold text-text">{notifications.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
                <div className="flex items-center gap-2">
                  <HiOutlineExclamation className="w-4 h-4 text-warning" />
                  <span className="text-sm text-text-secondary">ط؛ظٹط± ظ…ظ‚ط±ظˆط،</span>
                </div>
                <span className="text-sm font-bold text-warning">{unreadCount}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
                <div className="flex items-center gap-2">
                  <HiOutlineCheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm text-text-secondary">ظ…ظ‚ط±ظˆط،</span>
                </div>
                <span className="text-sm font-bold text-success">{notifications.length - unreadCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ط­ط³ط¨ ط§ظ„ظ†ظˆط¹</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(["success", "warning", "info", "error"] as const).map((type) => {
                const count = notifications.filter((n) => n.type === type).length
                const colors: Record<string, string> = {
                  success: "bg-success text-success",
                  warning: "bg-warning text-warning",
                  info: "bg-info text-info",
                  error: "bg-error text-error",
                }
                return (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${colors[type].split(" ")[0]}`} />
                      <span className="text-sm text-text-secondary">
                        {type === "success" ? "ط¥ظ†ط¬ط§ط²" : type === "warning" ? "طھظ†ط¨ظٹظ‡" : type === "info" ? "ظ…ط¹ظ„ظˆظ…ط§طھ" : "ط®ط·ط£"}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-text">{count}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={HiOutlineBell}
          title="ظ„ط§ طھظˆط¬ط¯ ط¥ط´ط¹ط§ط±ط§طھ"
          description={filter === "unread" ? "ظ„ط§ طھظˆط¬ط¯ ط¥ط´ط¹ط§ط±ط§طھ ط؛ظٹط± ظ…ظ‚ط±ظˆط،ط©" : "ظ„ظٹط³ ظ„ط¯ظٹظƒ ط£ظٹ ط¥ط´ط¹ط§ط±ط§طھ ط­طھظ‰ ط§ظ„ط¢ظ†"}
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((notif, idx) => {
            const Icon = notif.icon
            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                onClick={() => markAsRead(notif.id)}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all",
                  !notif.read
                    ? "bg-primary-50/50 dark:bg-primary-900/10 border-primary/20 shadow-sm"
                    : "bg-surface border-border hover:shadow-sm"
                )}
              >
                <div className={cn("p-2.5 rounded-xl", typeConfig[notif.type].bg)}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className={cn("text-sm", !notif.read ? "font-bold text-text" : "font-medium text-text")}>
                        {notif.title}
                      </p>
                      <p className="text-xs text-text-secondary mt-0.5">{notif.message}</p>
                    </div>
                    {!notif.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />}
                  </div>
                  <p className="text-xs text-text-tertiary mt-2">{formatRelativeTime(notif.createdAt)}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}

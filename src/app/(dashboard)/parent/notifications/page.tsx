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
  { id: "pn-1", type: "success", title: "ط·ع¾ط¸ظ¾ط¸ث†ط¸â€ڑ ط·آ£ط·آ­ط¸â€¦ط·آ¯ ط¸ظ¾ط¸ظ¹ ط·آ§ط¸â€‍ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€ ", message: "ط·آ­ط·آµط¸â€‍ ط·آ§ط·آ¨ط¸â€ ط¸ئ’ ط·آ£ط·آ­ط¸â€¦ط·آ¯ ط·آ¹ط¸â€‍ط¸â€° 95% ط¸ظ¾ط¸ظ¹ ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€  ط·آ§ط¸â€‍ط¸â€ ط·آ­ط¸ث† ط·آ§ط¸â€‍ط·آ´ط¸â€،ط·آ±ط¸ظ¹", read: false, createdAt: new Date(Date.now() - 1000 * 60 * 30), icon: HiOutlineStar },
  { id: "pn-2", type: "warning", title: "ط·ع¾ط·آ°ط¸ئ’ط¸ظ¹ط·آ± ط·آ¨ط¸ث†ط·آ§ط·آ¬ط·آ¨ ط·آ§ط¸â€‍ط¸â€ ط·آ­ط¸ث†", message: "ط·آ¨ط·آ§ط¸â€ڑط¸ظ¹ ط¸ظ¹ط¸ث†ط¸â€¦ ط·آ¹ط¸â€‍ط¸â€° ط¸â€¦ط¸ث†ط·آ¹ط·آ¯ ط·ع¾ط·آ³ط¸â€‍ط¸ظ¹ط¸â€¦ ط¸ث†ط·آ§ط·آ¬ط·آ¨ ط·آ§ط¸â€‍ط¸â€ ط·آ­ط¸ث† ط·آ§ط¸â€‍ط·آ£ط·آ³ط·آ¨ط¸ث†ط·آ¹ط¸ظ¹", read: false, createdAt: new Date(Date.now() - 1000 * 60 * 120), icon: HiOutlineCalendar },
  { id: "pn-3", type: "info", title: "ط·ع¾ط¸â€¦ ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط¸â€¦ط·آ­ط·ع¾ط¸ث†ط¸â€° ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯", message: "ط·ع¾ط¸â€¦ ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط¸ظ¾ط¸ظ¹ط·آ¯ط¸ظ¹ط¸ث† ط·آ´ط·آ±ط·آ­ ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯ ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³ ط·آ§ط¸â€‍ط·آ¨ط¸â€‍ط·آ§ط·ط›ط·آ©", read: false, createdAt: new Date(Date.now() - 1000 * 60 * 180), icon: HiOutlineInformationCircle },
  { id: "pn-4", type: "error", title: "ط·ط›ط¸ظ¹ط·آ§ط·آ¨ ط·آ£ط·آ­ط¸â€¦ط·آ¯", message: "ط¸â€‍ط¸â€¦ ط¸ظ¹ط·آ­ط·آ¶ط·آ± ط·آ§ط·آ¨ط¸â€ ط¸ئ’ ط·آ£ط·آ­ط¸â€¦ط·آ¯ ط·آ¬ط¸â€‍ط·آ³ط·آ© ط·آ§ط¸â€‍ط¸ظ¹ط¸ث†ط¸â€¦ ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³ ط·آ§ط¸â€‍ط¸â€ ط·آ­ط¸ث†", read: false, createdAt: new Date(Date.now() - 1000 * 60 * 300), icon: HiOutlineExclamation },
  { id: "pn-5", type: "info", title: "ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط·آ£ط·آ¯ط·آ§ط·طŒ ط·آ§ط¸â€‍ط·آ´ط¸â€،ط·آ±ط¸ظ¹", message: "ط·ع¾ط¸â€¦ ط·ع¾ط·آ­ط·آ¯ط¸ظ¹ط·آ« ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط·آ£ط·آ¯ط·آ§ط·طŒ ط·آ§ط·آ¨ط¸â€ ط¸ئ’ ط¸â€‍ط¸â€‍ط·آ´ط¸â€،ط·آ± ط·آ§ط¸â€‍ط·آ­ط·آ§ط¸â€‍ط¸ظ¹", read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), icon: HiOutlineChartBar },
  { id: "pn-6", type: "success", title: "ط·آ¥ط·ع¾ط¸â€¦ط·آ§ط¸â€¦ ط¸ئ’ط¸ث†ط·آ±ط·آ³ ط·آ§ط¸â€‍ط¸â€ ط·آ­ط¸ث†", message: "ط·آ£ط¸ئ’ط¸â€¦ط¸â€‍ ط·آ§ط·آ¨ط¸â€ ط¸ئ’ ط·آ£ط·آ­ط¸â€¦ط·آ¯ ط·آ¨ط¸â€ ط·آ¬ط·آ§ط·آ­ ط¸ئ’ط¸ث†ط·آ±ط·آ³ ط·آ§ط¸â€‍ط¸â€ ط·آ­ط¸ث† ط¸ث†ط·آ§ط¸â€‍ط·آµط·آ±ط¸ظ¾", read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), icon: HiOutlineAcademicCap },
  { id: "pn-7", type: "info", title: "ط¸â€¦ط¸ث†ط·آ¹ط·آ¯ ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€  ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯", message: "ط·آ³ط¸ظ¹ط·ع¾ط¸â€¦ ط·آ¹ط¸â€ڑط·آ¯ ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€  ط·آ§ط¸â€‍ط·آ¨ط¸â€‍ط·آ§ط·ط›ط·آ© ط¸ظ¹ط¸ث†ط¸â€¦ ط·آ§ط¸â€‍ط·آ®ط¸â€¦ط¸ظ¹ط·آ³ ط·آ§ط¸â€‍ط¸â€ڑط·آ§ط·آ¯ط¸â€¦", read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72), icon: HiOutlineCalendar },
  { id: "pn-8", type: "warning", title: "ط·آ§ط¸â€ڑط·ع¾ط·آ±ط·آ§ط·آ¨ ط·آ§ط¸â€ ط·ع¾ط¸â€،ط·آ§ط·طŒ ط·آ§ط¸â€‍ط·آ§ط·آ´ط·ع¾ط·آ±ط·آ§ط¸ئ’", message: "ط·آ¨ط·آ§ط¸â€ڑط¸ظ¹ 5 ط·آ£ط¸ظ¹ط·آ§ط¸â€¦ ط·آ¹ط¸â€‍ط¸â€° ط·آ§ط¸â€ ط·ع¾ط¸â€،ط·آ§ط·طŒ ط·آ§ط·آ´ط·ع¾ط·آ±ط·آ§ط¸ئ’ ط·آ§ط·آ¨ط¸â€ ط¸ئ’ ط¸ظ¾ط¸ظ¹ ط·آ§ط¸â€‍ط·آ¨ط·آ§ط¸â€ڑط·آ© ط·آ§ط¸â€‍ط·آ«ط¸â€‍ط·آ§ط·آ«ط¸ظ¹ط·آ©", read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96), icon: HiOutlineExclamation },
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
      <DashboardHeader title="ط·آ§ط¸â€‍ط·آ¥ط·آ´ط·آ¹ط·آ§ط·آ±ط·آ§ط·ع¾" subtitle="ط¸â€¦ط·ع¾ط·آ§ط·آ¨ط·آ¹ط·آ© ط·آ¢ط·آ®ط·آ± ط·آ§ط¸â€‍ط¸â€¦ط·آ³ط·ع¾ط·آ¬ط·آ¯ط·آ§ط·ع¾ ط¸ث†ط·آ§ط¸â€‍ط·ع¾ط·آ­ط·آ¯ط¸ظ¹ط·آ«ط·آ§ط·ع¾" />

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
              ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍
            </button>
            <button type="button"
              onClick={() => setFilter("unread")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                filter === "unread" ? "bg-primary text-white" : "bg-surface-secondary text-text-secondary hover:bg-surface-tertiary"
              )}
            >
              ط·ط›ط¸ظ¹ط·آ± ط¸â€¦ط¸â€ڑط·آ±ط¸ث†ط·طŒ
              {unreadCount > 0 && (
                <span className="mr-1.5 px-1.5 py-0.5 text-xs bg-white/20 rounded-full">{unreadCount}</span>
              )}
            </button>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" leftIcon={<HiOutlineCheck className="w-4 h-4" />} onClick={markAllAsRead}>
            ط·ع¾ط·آ­ط·آ¯ط¸ظ¹ط·آ¯ ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍ ط¸ئ’ط¸â€¦ط¸â€ڑط·آ±ط¸ث†ط·طŒ
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>ط¸â€¦ط¸â€‍ط·آ®ط·آµ ط·آ§ط¸â€‍ط·آ¥ط·آ´ط·آ¹ط·آ§ط·آ±ط·آ§ط·ع¾</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
                <div className="flex items-center gap-2">
                  <HiOutlineBell className="w-4 h-4 text-primary" />
                  <span className="text-sm text-text-secondary">ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ ط·آ§ط¸â€‍ط·آ¥ط·آ´ط·آ¹ط·آ§ط·آ±ط·آ§ط·ع¾</span>
                </div>
                <span className="text-sm font-bold text-text">{notifications.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
                <div className="flex items-center gap-2">
                  <HiOutlineExclamation className="w-4 h-4 text-warning" />
                  <span className="text-sm text-text-secondary">ط·ط›ط¸ظ¹ط·آ± ط¸â€¦ط¸â€ڑط·آ±ط¸ث†ط·طŒ</span>
                </div>
                <span className="text-sm font-bold text-warning">{unreadCount}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
                <div className="flex items-center gap-2">
                  <HiOutlineCheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm text-text-secondary">ط¸â€¦ط¸â€ڑط·آ±ط¸ث†ط·طŒ</span>
                </div>
                <span className="text-sm font-bold text-success">{notifications.length - unreadCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ط·آ­ط·آ³ط·آ¨ ط·آ§ط¸â€‍ط¸â€ ط¸ث†ط·آ¹</CardTitle>
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
                        {type === "success" ? "ط·آ¥ط¸â€ ط·آ¬ط·آ§ط·آ²" : type === "warning" ? "ط·ع¾ط¸â€ ط·آ¨ط¸ظ¹ط¸â€،" : type === "info" ? "ط¸â€¦ط·آ¹ط¸â€‍ط¸ث†ط¸â€¦ط·آ§ط·ع¾" : "ط·آ®ط·آ·ط·آ£"}
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
          title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·آ¥ط·آ´ط·آ¹ط·آ§ط·آ±ط·آ§ط·ع¾"
          description={filter === "unread" ? "ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·آ¥ط·آ´ط·آ¹ط·آ§ط·آ±ط·آ§ط·ع¾ ط·ط›ط¸ظ¹ط·آ± ط¸â€¦ط¸â€ڑط·آ±ط¸ث†ط·طŒط·آ©" : "ط¸â€‍ط¸ظ¹ط·آ³ ط¸â€‍ط·آ¯ط¸ظ¹ط¸ئ’ ط·آ£ط¸ظ¹ ط·آ¥ط·آ´ط·آ¹ط·آ§ط·آ±ط·آ§ط·ع¾ ط·آ­ط·ع¾ط¸â€° ط·آ§ط¸â€‍ط·آ¢ط¸â€ "}
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

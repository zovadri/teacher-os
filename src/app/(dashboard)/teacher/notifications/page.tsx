"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineBell,
  HiOutlineCheckCircle,
  HiOutlineExclamation,
  HiOutlineInformationCircle,
  HiOutlineXCircle,
  HiOutlineFilter,
  HiOutlineMailOpen,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Badge } from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import { EmptyState } from "@/components/ui/EmptyState"
import { mockNotifications } from "@/lib/mock/data"
import { formatRelativeTime, cn } from "@/lib/utils"

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
  info: "معلومة",
  success: "نجاح",
  warning: "تنبيه",
  error: "خطأ",
}

type FilterType = "all" | "unread"

export default function NotificationsPage() {
  const [filter, setFilter] = useState<FilterType>("all")
  const [notifications, setNotifications] = useState(mockNotifications)
  const [readIds, setReadIds] = useState<string[]>(() => notifications.filter((n) => n.read).map((n) => n.id))

  const unreadCount = notifications.filter((n) => !readIds.includes(n.id)).length

  const filtered = useMemo(() => {
    if (filter === "unread") return notifications.filter((n) => !readIds.includes(n.id))
    return notifications
  }, [filter, notifications, readIds])

  const markAllAsRead = () => {
    setReadIds(notifications.map((n) => n.id))
  }

  const markAsRead = (id: string) => {
    if (!readIds.includes(id)) setReadIds((prev) => [...prev, id])
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="الإشعارات" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-surface border border-border rounded-xl">
            {[
              { value: "all" as FilterType, label: "الكل" },
              { value: "unread" as FilterType, label: "غير مقروء" },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  filter === f.value ? "bg-primary text-white" : "text-text-secondary hover:text-text"
                }`}
              >
                {f.label}
                {f.value === "unread" && unreadCount > 0 && (
                  <span className="mr-1.5 text-xs">({unreadCount})</span>
                )}
              </button>
            ))}
          </div>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" leftIcon={<HiOutlineMailOpen size={16} />} onClick={markAllAsRead}>
            تحديد الكل كمقروء
          </Button>
        )}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={HiOutlineBell}
          title={filter === "unread" ? "لا توجد إشعارات غير مقروءة" : "لا توجد إشعارات"}
          description={filter === "unread" ? "جميع الإشعارات مقروءة" : "ليس لديك أي إشعارات حتى الآن"}
        />
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((notif, index) => {
              const Icon = typeIcons[notif.type] || HiOutlineInformationCircle
              const isUnread = !readIds.includes(notif.id)

              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Link href={notif.link || "#"} onClick={() => markAsRead(notif.id)}>
                    <div
                      className={cn(
                        "flex items-start gap-4 p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer",
                        isUnread ? "bg-surface border-primary/20 shadow-sm" : "bg-surface-secondary border-border"
                      )}
                    >
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", typeColors[notif.type])}>
                        <Icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className={cn("text-sm", isUnread ? "font-bold text-text" : "font-medium text-text-secondary")}>
                              {notif.title}
                            </h4>
                            <p className="text-xs text-text-tertiary mt-0.5">{notif.message}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {isUnread && <span className="w-2 h-2 rounded-full bg-primary" />}
                            <span className="text-[10px] text-text-tertiary whitespace-nowrap">
                              {formatRelativeTime(notif.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}

      <div className="text-center">
        <p className="text-xs text-text-tertiary">
          إجمالي {notifications.length} إشعار · {unreadCount} غير مقروء
        </p>
      </div>
    </div>
  )
}

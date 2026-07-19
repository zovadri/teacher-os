"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  HiUserAdd, HiCheck, HiCash, HiClipboardCheck, HiAcademicCap,
  HiStar, HiExclamation, HiPencil, HiCalendar, HiPhotograph,
} from "react-icons/hi"

const typeConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  enrolled: { icon: HiUserAdd, color: "text-primary", bg: "bg-primary/10" },
  completed: { icon: HiCheck, color: "text-success", bg: "bg-success/10" },
  payment: { icon: HiCash, color: "text-emerald-500", bg: "bg-emerald-50" },
  attendance: { icon: HiClipboardCheck, color: "text-warning", bg: "bg-warning/10" },
  exam: { icon: HiAcademicCap, color: "text-purple-500", bg: "bg-purple-50" },
  reward: { icon: HiStar, color: "text-amber-500", bg: "bg-amber-50" },
  penalty: { icon: HiExclamation, color: "text-error", bg: "bg-error/10" },
  note: { icon: HiPencil, color: "text-blue-500", bg: "bg-blue-50" },
}

interface TimelineEvent {
  id: string
  type?: string
  title: string
  description?: string
  date: Date
  icon?: string
}

interface TimelineProps {
  events: TimelineEvent[]
  className?: string
}

export function Timeline({ events, className }: TimelineProps) {
  if (!events.length) return null
  return (
    <div className={cn("relative", className)}>
      <div className="absolute right-[15px] top-2 bottom-2 w-0.5 bg-border" />
      <div className="space-y-0">
        {events.map((event, idx) => {
          const cfg = typeConfig[event.type || ""] || { icon: HiCalendar, color: "text-text-secondary", bg: "bg-surface-secondary" }
          const Icon = cfg.icon
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex gap-4 pr-10 pb-6 last:pb-0 relative"
            >
              <div className={cn("absolute right-0 w-8 h-8 rounded-full flex items-center justify-center shrink-0", cfg.bg)}>
                <Icon className={cn("w-4 h-4", cfg.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm text-text">{event.title}</span>
                  <span className="text-xs text-text-tertiary">
                    {new Date(event.date).toLocaleDateString("ar-EG", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
                {event.description ? (
                  <p className="text-xs text-text-tertiary mt-0.5">{event.description}</p>
                ) : null}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

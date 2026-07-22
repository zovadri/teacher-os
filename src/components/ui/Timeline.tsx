"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface TimelineItem {
  id: string
  title: string
  description?: string
  timestamp?: string
  icon?: React.ElementType
  color?: "primary" | "success" | "warning" | "error" | "info"
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

const dotColors: Record<string, string> = {
  primary: "bg-primary border-primary/30",
  success: "bg-success border-success/30",
  warning: "bg-warning border-warning/30",
  error: "bg-error border-error/30",
  info: "bg-info border-info/30",
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("space-y-0", className)}>
      {items.map((item, i) => {
        const Icon = item.icon
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="relative flex gap-4 pb-6 last:pb-0"
          >
            <div className="flex flex-col items-center">
              <div className={cn("w-3 h-3 rounded-full border-2 shrink-0 mt-1.5", dotColors[item.color || "primary"])} />
              {i < items.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
            </div>
            <div className="flex-1 min-w-0 pb-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {Icon && <Icon className={cn("w-4 h-4", `text-${item.color || "primary"}`)} />}
                  <p className="text-sm font-medium text-text">{item.title}</p>
                </div>
                {item.timestamp && <span className="text-xs text-text-tertiary shrink-0">{item.timestamp}</span>}
              </div>
              {item.description && <p className="text-xs text-text-secondary mt-1">{item.description}</p>}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

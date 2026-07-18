"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ElementType
  change?: { value: number; isPositive: boolean }
  color?: "primary" | "success" | "warning" | "error" | "info"
  subtitle?: string
  className?: string
  delay?: number
}

const colors = {
  primary: "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400",
  success: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  warning: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  error: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  info: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
}

export function StatsCard({ title, value, icon: Icon, change, color = "primary", subtitle, className, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn("bg-surface border border-border rounded-xl p-5 hover:shadow-md transition-shadow", className)}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-text-secondary">{title}</p>
          <p className="text-2xl font-bold text-text">{typeof value === "number" ? value.toLocaleString("ar-EG") : value}</p>
          {change && (
            <span className={cn(
              "inline-flex items-center gap-0.5 text-xs font-medium",
              change.isPositive ? "text-success" : "text-error"
            )}>
              {change.isPositive ? "↑" : "↓"} {Math.abs(change.value)}%
            </span>
          )}
          {subtitle && <p className="text-xs text-text-tertiary">{subtitle}</p>}
        </div>
        <div className={cn("p-3 rounded-xl", colors[color])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  )
}

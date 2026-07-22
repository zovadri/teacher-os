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
  primary: "bg-primary/10 text-primary",
  success: "bg-emerald-500/10 text-emerald-400",
  warning: "bg-amber-500/10 text-amber-400",
  error: "bg-red-500/10 text-red-400",
  info: "bg-blue-500/10 text-blue-400",
}

export function StatsCard({ title, value, icon: Icon, change, color = "primary", subtitle, className, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn("bg-surface border border-border rounded-[24px] p-5 transition-all duration-200 hover:border-primary/50 hover:scale-[1.02]", className)}
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
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  )
}

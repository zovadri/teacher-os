"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ElementType
  description?: string
  color?: "primary" | "success" | "warning" | "error" | "info"
  className?: string
  delay?: number
}

const iconColors: Record<string, string> = {
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
  info: "text-info",
}

const iconBgColors: Record<string, string> = {
  primary: "bg-primary/10",
  success: "bg-success/10",
  warning: "bg-warning/10",
  error: "bg-error/10",
  info: "bg-info/10",
}

export function StatsCard({ title, value, icon: Icon, description, color = "primary", className, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn("bg-surface border border-border rounded-[20px] p-5 transition-all duration-200 hover:border-primary/30", className)}
    >
      <div className="flex items-start gap-4">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0", iconBgColors[color])}>
          <Icon className={cn("w-6 h-6", iconColors[color])} />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-text-secondary">{title}</p>
          <p className="text-2xl font-bold text-text mt-0.5">{typeof value === "number" ? value.toLocaleString("ar-EG") : value}</p>
          {description && <p className="text-xs text-text-tertiary mt-1">{description}</p>}
        </div>
      </div>
    </motion.div>
  )
}

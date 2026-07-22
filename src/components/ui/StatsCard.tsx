"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ElementType
  description?: string
  trend?: { value: number; isPositive: boolean }
  color?: "primary" | "success" | "warning" | "error" | "info"
  className?: string
  delay?: number
  sparklineData?: number[]
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

function Sparkline({ data, color = "#5B7CFF" }: { data: number[]; color?: string }) {
  if (!data || data.length < 2) return null
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 64
  const h = 24
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * (h - 4) - 2
    return `${x},${y}`
  })
  const pathD = `M${points.join(" L")}`
  const fillD = `${pathD} L${w},${h} L0,${h} Z`

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      <defs>
        <linearGradient id={`sparkline-grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillD} fill={`url(#sparkline-grad-${color.replace("#", "")})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function StatsCard({ title, value, icon: Icon, description, trend, color = "primary", className, delay = 0, sparklineData }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn("bg-card border border-border rounded-[24px] p-6 transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.03)] hover:-translate-y-0.5 hover:border-primary/20", className)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", iconBgColors[color])}>
          <Icon className={cn("w-6 h-6", iconColors[color])} />
        </div>
        {sparklineData && <Sparkline data={sparklineData} color={iconColors[color]?.replace("text-", "#") || "#5B7CFF"} />}
      </div>
      <div>
        <p className="text-sm text-text-secondary mb-1">{title}</p>
        <div className="flex items-end gap-3">
          <p className="text-[28px] font-bold text-text leading-none">{typeof value === "number" ? value.toLocaleString("ar-EG") : value}</p>
          {trend && (
            <span className={cn(
              "flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full mb-0.5",
              trend.isPositive ? "bg-success/10 text-success" : "bg-error/10 text-error"
            )}>
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              {Math.abs(trend.value)}%
            </span>
          )}
        </div>
        {description && <p className="text-xs text-text-tertiary mt-2">{description}</p>}
      </div>
    </motion.div>
  )
}

"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi"

interface StatsCardProps {
  title: string
  value: string | number
  icon?: React.ElementType
  trend?: number | { value: number; isPositive: boolean }
  sparkline?: number[]
  color?: "primary" | "success" | "warning" | "error" | "info"
  description?: string
  className?: string
}

const colorMap = {
  primary: { bg: "bg-primary-100", text: "text-primary", border: "border-primary-200", gradient: ["#7C5CFC", "#5B3DC4"] },
  success: { bg: "bg-success/10", text: "text-success", border: "border-success/20", gradient: ["#10B981", "#059669"] },
  warning: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/20", gradient: ["#F59E0B", "#D97706"] },
  error: { bg: "bg-error/10", text: "text-error", border: "border-error/20", gradient: ["#EF4444", "#DC2626"] },
  info: { bg: "bg-info/10", text: "text-info", border: "border-info/20", gradient: ["#6366F1", "#4F46E5"] },
}

function resolveTrend(t: number | { value: number; isPositive: boolean } | undefined): { value: number; positive: boolean } | null {
  if (t === undefined) return null
  if (typeof t === "number") return { value: Math.abs(t), positive: t >= 0 }
  return { value: t.value, positive: t.isPositive }
}

export function StatsCard({ title, value, icon: Icon, trend, sparkline, color = "primary", description, className }: StatsCardProps) {
  const palette = colorMap[color]
  const resolved = resolveTrend(trend)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className={cn(
        "group bg-card/80 backdrop-blur-xl border border-border rounded-[20px] p-5",
        "shadow-[0_4px_24px_rgba(124,92,252,0.04),inset_0_1px_0_rgba(255,255,255,0.8)]",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(124,92,252,0.08)] hover:border-border-light relative",
        "before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-primary/10 before:to-transparent before:rounded-t-[20px] before:pointer-events-none",
        className,
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-11 h-11 rounded-[14px] flex items-center justify-center backdrop-blur-xl border", palette.bg, palette.border)}>
          {Icon && <Icon className={cn("w-5 h-5", palette.text)} />}
        </div>
        {resolved && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-[8px] text-[11px] font-medium backdrop-blur-xl border",
              resolved.positive
                ? "bg-success/10 border-success/20 text-success"
                : "bg-error/10 border-error/20 text-error",
            )}
          >
            {resolved.positive ? <HiTrendingUp className="w-3.5 h-3.5" /> : <HiTrendingDown className="w-3.5 h-3.5" />}
            {resolved.value}%
          </motion.div>
        )}
      </div>

      <p className="text-sm text-text-secondary mb-1">{title}</p>
      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={cn("text-[28px] font-bold leading-tight", palette.text)}
      >
        {value}
      </motion.p>
      {description && <p className="text-xs text-text-tertiary mt-1.5">{description}</p>}

      {sparkline && sparkline.length > 0 && (
        <div className="mt-4 h-8">
          <svg viewBox={`0 0 ${sparkline.length - 1} 32`} className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`sg-${color}-${title.replace(/\s/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={palette.gradient[0]} stopOpacity="0.3" />
                <stop offset="100%" stopColor={palette.gradient[0]} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={sparkline.map((v, i) => `${i === 0 ? "M" : "L"}${i} ${32 - (v / Math.max(...sparkline)) * 28}`).join(" ")}
              fill="none"
              stroke={palette.gradient[0]}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={`${sparkline.map((v, i) => `${i === 0 ? "M" : "L"}${i} ${32 - (v / Math.max(...sparkline)) * 28}`).join(" ")} L${sparkline.length - 1} 32 L0 32 Z`}
              fill={`url(#sg-${color}-${title.replace(/\s/g, "")})`}
            />
          </svg>
        </div>
      )}
    </motion.div>
  )
}

"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi"

interface StatsCardProps {
  title: string
  value: string | number
  icon?: React.ElementType
  trend?: number
  sparkline?: number[]
  color?: "primary" | "success" | "warning" | "error" | "info"
  description?: string
  className?: string
  formatValue?: (v: number) => string
}

const colorMap = {
  primary: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20", gradient: ["#5B7CFF", "#3B5FEF"] },
  success: { bg: "bg-success/10", text: "text-success", border: "border-success/20", gradient: ["#16C784", "#0EA56A"] },
  warning: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/20", gradient: ["#F5B301", "#D49900"] },
  error: { bg: "bg-error/10", text: "text-error", border: "border-error/20", gradient: ["#FF5C74", "#E04A60"] },
  info: { bg: "bg-info/10", text: "text-info", border: "border-info/20", gradient: ["#5B7CFF", "#3B5FEF"] },
}

export function StatsCard({ title, value, icon: Icon, trend, sparkline, color = "primary", description, className, formatValue }: StatsCardProps) {
  const palette = colorMap[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className={cn(
        "bg-card/60 backdrop-blur-xl border border-border rounded-[24px] p-5",
        "shadow-[0_8px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)]",
        "transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)]",
        className,
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-11 h-11 rounded-[16px] flex items-center justify-center backdrop-blur-xl border", palette.bg, palette.border)}>
          {Icon && <Icon className={cn("w-5 h-5", palette.text)} />}
        </div>
        {trend !== undefined && (
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-[10px] text-[11px] font-medium backdrop-blur-xl border",
            trend >= 0
              ? "bg-success/10 border-success/20 text-success"
              : "bg-error/10 border-error/20 text-error",
          )}>
            {trend >= 0 ? <HiTrendingUp className="w-3.5 h-3.5" /> : <HiTrendingDown className="w-3.5 h-3.5" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      <p className="text-sm text-text-secondary mb-1">{title}</p>
      <p className={cn("text-[28px] font-bold text-text leading-tight", palette.text)}>
        {value}
      </p>
      {description && <p className="text-xs text-text-tertiary mt-1.5">{description}</p>}

      {sparkline && sparkline.length > 0 && (
        <div className="mt-4 h-8">
          <svg viewBox={`0 0 ${sparkline.length - 1} 32`} className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
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
              fill={`url(#grad-${color})`}
            />
          </svg>
        </div>
      )}
    </motion.div>
  )
}

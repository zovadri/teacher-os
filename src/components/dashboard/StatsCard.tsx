"use client"

import { motion } from "framer-motion"
import { HiArrowUp, HiArrowDown } from "react-icons/hi"
import { cn } from "../../lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: number
  trendLabel?: string
  color?: string
}

export default function StatsCard({ title, value, icon, trend, trendLabel, color = "primary" }: StatsCardProps) {
  const isUp = trend !== undefined && trend >= 0
  const trendColor = isUp ? "text-success" : "text-error"
  const bgColor = `bg-${color}/10`
  const textColor = `text-${color}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="bg-surface rounded-xl border border-border p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", `bg-${color}/10`)}>
          <div className={cn(`text-${color}`)}>{icon}</div>
        </div>
        {trend !== undefined && (
          <div className={cn("flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full", trendColor, "bg-current/5")}>
            {isUp ? <HiArrowUp size={12} /> : <HiArrowDown size={12} />}
            <span className={trendColor}>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <p className="text-xs text-text-tertiary mb-1">{title}</p>
      <p className="text-2xl font-bold text-text">{value}</p>
      {trendLabel && <p className="text-xs text-text-tertiary mt-1">{trendLabel}</p>}
    </motion.div>
  )
}

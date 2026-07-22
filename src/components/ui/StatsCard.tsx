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

const iconColors = {
  primary: "text-[#6366F1]",
  success: "text-[#22C55E]",
  warning: "text-[#F59E0B]",
  error: "text-[#EF4444]",
  info: "text-[#3B82F6]",
}

const iconBgColors = {
  primary: "bg-[#6366F1]/10",
  success: "bg-[#22C55E]/10",
  warning: "bg-[#F59E0B]/10",
  error: "bg-[#EF4444]/10",
  info: "bg-[#3B82F6]/10",
}

export function StatsCard({ title, value, icon: Icon, description, color = "primary", className, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn("bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-[20px] p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-sm", className)}
    >
      <div className="flex items-start gap-4">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0", iconBgColors[color])}>
          <Icon className={cn("w-6 h-6", iconColors[color])} />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-[#94A3B8]">{title}</p>
          <p className="text-2xl font-bold text-[#F8FAFC] mt-0.5">{typeof value === "number" ? value.toLocaleString("ar-EG") : value}</p>
          {description && <p className="text-xs text-[#64748B] mt-1">{description}</p>}
        </div>
      </div>
    </motion.div>
  )
}

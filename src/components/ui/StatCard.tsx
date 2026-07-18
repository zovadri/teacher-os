"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface StatCardProps {
  icon: React.ElementType
  value: string | number
  label: string
  color?: "primary" | "success" | "warning" | "error" | "info"
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

export function StatCard({ icon: Icon, value, label, color = "primary", className, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay }}
      className={cn("text-center p-6", className)}
    >
      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4", colors[color])}>
        <Icon className="w-7 h-7" />
      </div>
      <div className="text-3xl font-bold text-text mb-1">{value}</div>
      <div className="text-sm text-text-secondary">{label}</div>
    </motion.div>
  )
}

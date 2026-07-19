"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Inbox } from "lucide-react"
import Button from "./Button"

interface EmptyStateProps {
  icon?: React.ElementType
  title: string
  description?: string
  action?: React.ReactNode
  secondaryAction?: React.ReactNode
  className?: string
  bordered?: boolean
  withBackground?: boolean
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  secondaryAction,
  className,
  bordered = false,
  withBackground = true,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4 text-center",
        withBackground && "bg-white dark:bg-gray-800 rounded-xl",
        bordered && "border-2 border-dashed border-gray-200 dark:border-gray-700",
        className,
      )}
    >
      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">{description}</p>
      )}
      {action && <div className="mb-3">{action}</div>}
      {secondaryAction && <div>{secondaryAction}</div>}
    </motion.div>
  )
}

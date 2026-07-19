"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useNotificationStore } from "@/lib/notification-store"
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react"
import { useEffect, useState } from "react"

const typeConfig = {
  success: {
    icon: CheckCircle,
    bg: "bg-emerald-50 dark:bg-emerald-900/30",
    border: "border-emerald-200 dark:border-emerald-800",
    text: "text-emerald-800 dark:text-emerald-200",
    progress: "bg-emerald-500",
  },
  error: {
    icon: XCircle,
    bg: "bg-red-50 dark:bg-red-900/30",
    border: "border-red-200 dark:border-red-800",
    text: "text-red-800 dark:text-red-200",
    progress: "bg-red-500",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50 dark:bg-amber-900/30",
    border: "border-amber-200 dark:border-amber-800",
    text: "text-amber-800 dark:text-amber-200",
    progress: "bg-amber-500",
  },
  info: {
    icon: Info,
    bg: "bg-blue-50 dark:bg-blue-900/30",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-800 dark:text-blue-200",
    progress: "bg-blue-500",
  },
}

export function Toast({ toast }: { toast: { id: string; type: 'success' | 'error' | 'warning' | 'info'; title: string; message?: string; duration?: number } }) {
  const { removeToast } = useNotificationStore()
  const [progress, setProgress] = useState(100)
  const config = typeConfig[toast.type]
  const Icon = config.icon

  useEffect(() => {
    const duration = toast.duration ?? 4000
    const interval = 50
    const steps = duration / interval
    let current = 0
    const timer = setInterval(() => {
      current += 1
      setProgress(Math.max(0, 100 - (current / steps) * 100))
    }, interval)
    return () => clearInterval(timer)
  }, [toast.duration])

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      layout
      className={cn(
        "relative w-80 rounded-xl border shadow-lg overflow-hidden",
        config.bg,
        config.border,
      )}
    >
      <div className="flex items-start gap-3 p-4">
        <Icon className={cn("w-5 h-5 shrink-0 mt-0.5", config.text)} />
        <div className="flex-1 min-w-0">
          <p className={cn("font-medium text-sm", config.text)}>{toast.title}</p>
          {toast.message && (
            <p className="text-xs mt-0.5 opacity-80 text-current">{toast.message}</p>
          )}
        </div>
        <button type="button"
          onClick={() => removeToast(toast.id)}
          className={cn("shrink-0 p-0.5 rounded hover:bg-black/5 transition-colors", config.text)}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="h-1 w-full bg-black/5 dark:bg-white/5">
        <div
          className={cn("h-full transition-all duration-100 ease-linear rounded-full", config.progress)}
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  )
}

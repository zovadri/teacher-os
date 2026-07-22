"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { HiCheckCircle, HiExclamationCircle, HiInformationCircle, HiXCircle, HiX } from "react-icons/hi"

type ToastVariant = "success" | "error" | "warning" | "info"

interface ToastProps {
  message: string
  variant?: ToastVariant
  onClose?: () => void
  className?: string
}

const iconMap: Record<ToastVariant, React.ElementType> = {
  success: HiCheckCircle,
  error: HiXCircle,
  warning: HiExclamationCircle,
  info: HiInformationCircle,
}

const colorMap: Record<ToastVariant, string> = {
  success: "text-success",
  error: "text-error",
  warning: "text-warning",
  info: "text-info",
}

export function Toast({ message, variant = "info", onClose, className }: ToastProps) {
  const Icon = iconMap[variant]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-[16px] bg-card/80 backdrop-blur-xl border border-border shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
        "min-w-[300px] max-w-md",
        className,
      )}
    >
      <Icon className={cn("w-5 h-5 shrink-0", colorMap[variant])} />
      <p className="text-sm text-text flex-1">{message}</p>
      {onClose && (
        <button type="button" onClick={onClose} className="p-0.5 rounded-[6px] text-text-tertiary hover:text-text transition-all">
          <HiX className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  )
}

"use client"

import { useEffect, useCallback, useState } from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, Info, X } from "lucide-react"
import Button from "./Button"

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void | Promise<void>
  title: string
  message?: string
  confirmText?: string
  cancelText?: string
  variant?: "danger" | "warning" | "info"
}

const variantConfig = {
  danger: {
    icon: AlertTriangle,
    iconBg: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-600 dark:text-red-400",
    buttonVariant: "danger" as const,
  },
  warning: {
    icon: AlertTriangle,
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    buttonVariant: "primary" as const,
  },
  info: {
    icon: Info,
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    buttonVariant: "primary" as const,
  },
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  variant = "danger",
}: ConfirmDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const config = variantConfig[variant]
  const Icon = config.icon

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose()
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isOpen, handleEscape])

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm()
    } finally {
      setIsLoading(false)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6"
          >
            <button type="button"
              onClick={onClose}
              className="absolute top-4 left-4 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className={cn("p-3 rounded-full mb-4", config.iconBg)}>
                <Icon className={cn("w-6 h-6", config.iconColor)} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
              {message && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{message}</p>
              )}
            </div>
            <div className="flex gap-3">
              <Button variant="secondary"
                onClick={onClose}
                className="flex-1"
                disabled={isLoading}
              >
                {cancelText}
              </Button>
              <Button variant={config.buttonVariant}
                onClick={handleConfirm}
                className="flex-1"
                isLoading={isLoading}
              >
                {confirmText}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

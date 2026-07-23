"use client"

import { cn } from "@/lib/utils"
import { HiX } from "react-icons/hi"
import { motion, AnimatePresence } from "framer-motion"

interface ToastProps {
  open: boolean
  onClose: () => void
  message: string
  type?: "success" | "error" | "info" | "warning"
}

const styles = {
  success: "bg-success/10 border-success/20 text-success",
  error: "bg-error/10 border-error/20 text-error",
  info: "bg-info/10 border-info/20 text-info",
  warning: "bg-warning/10 border-warning/20 text-warning",
}

export function Toast({ open, onClose, message, type = "info" }: ToastProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={cn(
            "fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-4 py-3 rounded-[14px] border shadow-lg backdrop-blur-xl min-w-[300px]",
            styles[type],
          )}
        >
          <span className="flex-1 text-sm font-medium">{message}</span>
          <button onClick={onClose} className="opacity-60 hover:opacity-100 transition-opacity">
            <HiX className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

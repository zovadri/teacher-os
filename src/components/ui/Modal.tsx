"use client"

import { useEffect, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { HiX } from "react-icons/hi"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "full"
  className?: string
  showClose?: boolean
}

const sizes = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[95vw] max-h-[95vh]",
}

export function Modal({ isOpen, onClose, title, subtitle, children, size = "md", className, showClose = true }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose()
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
      modalRef.current?.focus()
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isOpen, handleEscape])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "relative bg-surface border border-border rounded-2xl shadow-xl w-full overflow-hidden",
              sizes[size],
              className
            )}
          >
            {(title || showClose) && (
              <div className="flex items-start justify-between p-6 pb-4 border-b border-border">
                <div>
                  {title && <h2 className="text-lg font-semibold text-text">{title}</h2>}
                  {subtitle && <p className="text-sm text-text-secondary mt-1">{subtitle}</p>}
                </div>
                {showClose && (
                  <button type="button" onClick={onClose} aria-label="إغلاق" className="p-1.5 rounded-lg hover:bg-surface-secondary text-text-tertiary hover:text-text transition-colors">
                    <HiX className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
            <div className="p-6 overflow-y-auto max-h-[70vh]">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

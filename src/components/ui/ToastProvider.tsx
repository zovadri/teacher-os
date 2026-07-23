"use client"

import { createContext, useContext, useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { HiX, HiCheckCircle, HiExclamationCircle, HiInformationCircle, HiExclamation } from "react-icons/hi"

type ToastType = "success" | "error" | "info" | "warning"

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within ToastProvider")
  return ctx
}

const icons: Record<ToastType, React.ElementType> = {
  success: HiCheckCircle,
  error: HiExclamationCircle,
  info: HiInformationCircle,
  warning: HiExclamation,
}

const styles: Record<ToastType, string> = {
  success: "bg-success/10 border-success/20 text-success",
  error: "bg-error/10 border-error/20 text-error",
  info: "bg-info/10 border-info/20 text-info",
  warning: "bg-warning/10 border-warning/20 text-warning",
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }, [])

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map(t => {
            const Icon = icons[t.type]
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-[14px] border shadow-lg backdrop-blur-xl min-w-[300px]",
                  styles[t.type],
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="flex-1 text-sm font-medium">{t.message}</span>
                <button onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))} className="opacity-60 hover:opacity-100 transition-opacity">
                  <HiX className="w-4 h-4" />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export default ToastProvider

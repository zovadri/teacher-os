"use client"

import { createContext, useContext, useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { HiExclamationCircle } from "react-icons/hi"

interface ConfirmDialogContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>
}

interface ConfirmOptions {
  title?: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: "danger" | "primary"
}

const ConfirmDialogContext = createContext<ConfirmDialogContextType | null>(null)

export function useConfirm() {
  const ctx = useContext(ConfirmDialogContext)
  if (!ctx) throw new Error("useConfirm must be used within ConfirmDialog provider")
  return ctx
}

export function ConfirmDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<ConfirmOptions>({ message: "" })
  const [resolve, setResolve] = useState<((v: boolean) => void) | null>(null)

  const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    setOptions(opts)
    setOpen(true)
    return new Promise(res => { setResolve(() => res) })
  }, [])

  const handleConfirm = () => { resolve?.(true); setOpen(false) }
  const handleCancel = () => { resolve?.(false); setOpen(false) }

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60"
              onClick={handleCancel}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-card border border-border rounded-[20px] shadow-[0_24px_80px_rgba(0,0,0,0.08)] p-6 max-w-sm w-full"
            >
              <div className="w-12 h-12 rounded-[14px] bg-error/10 border border-error/20 flex items-center justify-center mb-4">
                <HiExclamationCircle className="w-6 h-6 text-error" />
              </div>
              {options.title && <h3 className="text-lg font-semibold text-text mb-2">{options.title}</h3>}
              <p className="text-sm text-text-secondary mb-6">{options.message}</p>
              <div className="flex items-center gap-3 justify-end">
                <button onClick={handleCancel} className="px-4 py-2.5 text-sm font-medium text-text-secondary hover:text-text bg-transparent border border-border rounded-[12px] hover:bg-card/50 transition-colors">
                  {options.cancelLabel || "إلغاء"}
                </button>
                <button onClick={handleConfirm} className={cn(
                  "px-4 py-2.5 text-sm font-medium text-white rounded-[12px] transition-colors",
                  options.variant === "danger" ? "bg-error hover:bg-error/90" : "bg-primary hover:bg-primary-dark",
                )}>
                  {options.confirmLabel || "تأكيد"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ConfirmDialogContext.Provider>
  )
}

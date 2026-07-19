"use client"

import { AnimatePresence } from "framer-motion"
import { useNotificationStore } from "@/lib/notification-store"
import { Toast } from "./Toast"

export function ToastProvider() {
  const { toasts } = useNotificationStore()

  return (
    <div className="fixed bottom-4 left-4 z-[100] flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  )
}

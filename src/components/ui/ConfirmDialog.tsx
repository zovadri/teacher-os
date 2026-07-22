"use client"

import { Modal } from "./Modal"
import Button from "./Button"
import { cn } from "@/lib/utils"
import { HiExclamationCircle } from "react-icons/hi"

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  variant?: "danger" | "warning" | "info"
  isLoading?: boolean
}

export function ConfirmDialog({
  isOpen, onClose, onConfirm, title = "تأكيد", message = "هل أنت متأكد من هذا الإجراء؟",
  confirmText = "تأكيد", cancelText = "إلغاء", variant = "danger", isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showClose={false}>
      <div className="text-center">
        <div className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 backdrop-blur-xl border",
          variant === "danger" ? "bg-error/10 border-error/20" : variant === "warning" ? "bg-warning/10 border-warning/20" : "bg-info/10 border-info/20",
        )}>
          <HiExclamationCircle className={cn(
            "w-8 h-8",
            variant === "danger" ? "text-error" : variant === "warning" ? "text-warning" : "text-info",
          )} />
        </div>
        <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
        <p className="text-sm text-text-secondary mb-6">{message}</p>
        <div className="flex gap-3">
          <Button variant={variant === "danger" ? "danger" : "primary"} onClick={onConfirm} isLoading={isLoading} className="flex-1">
            {confirmText}
          </Button>
          <Button variant="secondary" onClick={onClose} className="flex-1">{cancelText}</Button>
        </div>
      </div>
    </Modal>
  )
}

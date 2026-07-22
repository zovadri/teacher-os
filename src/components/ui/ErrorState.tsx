import { cn } from "@/lib/utils"
import Button from "./Button"
import { HiExclamationCircle } from "react-icons/hi"

interface ErrorStateProps {
  title?: string
  description?: string
  retryLabel?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = "حدث خطأ",
  description = "عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
  retryLabel = "إعادة المحاولة",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn("text-center py-16", className)}>
      <div className="w-20 h-20 rounded-[24px] bg-error/10 backdrop-blur-xl border border-error/20 flex items-center justify-center mx-auto mb-5 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
        <HiExclamationCircle className="w-8 h-8 text-error" />
      </div>
      <h3 className="text-lg font-semibold text-text mb-1">{title}</h3>
      <p className="text-sm text-text-secondary max-w-sm mx-auto mb-6">{description}</p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>{retryLabel}</Button>
      )}
    </div>
  )
}

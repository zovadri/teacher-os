import { cn } from "@/lib/utils"
import Button from "./Button"

interface EmptyStateProps {
  icon?: React.ElementType
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function EmptyState({
  icon: Icon,
  title = "لا توجد بيانات",
  description = "لم يتم العثور على أي عناصر لعرضها.",
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("text-center py-16", className)}>
      <div className="w-20 h-20 rounded-[24px] bg-card/60 backdrop-blur-xl border border-border flex items-center justify-center mx-auto mb-5 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
        {Icon ? (
          <Icon className="w-8 h-8 text-text-tertiary" />
        ) : (
          <svg className="w-8 h-8 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        )}
      </div>
      <h3 className="text-lg font-semibold text-text mb-1">{title}</h3>
      <p className="text-sm text-text-secondary max-w-sm mx-auto mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  )
}

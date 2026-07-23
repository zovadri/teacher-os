import { cn } from "@/lib/utils"
import { HiOutlineInbox } from "react-icons/hi"

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ElementType
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ title = "لا توجد بيانات", description = "لم يتم العثور على أي عناصر بعد.", icon: Icon = HiOutlineInbox, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
      <div className="w-16 h-16 rounded-[16px] bg-card/80 border border-border flex items-center justify-center mb-5">
        <Icon className="w-7 h-7 text-text-tertiary" />
      </div>
      <h3 className="text-lg font-semibold text-text mb-1.5">{title}</h3>
      <p className="text-sm text-text-secondary max-w-sm">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

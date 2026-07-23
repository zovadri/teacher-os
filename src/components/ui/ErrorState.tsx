import { cn } from "@/lib/utils"
import { HiOutlineExclamationCircle } from "react-icons/hi"

interface ErrorStateProps {
  title?: string
  description?: string
  icon?: React.ElementType
  action?: React.ReactNode
  className?: string
}

export function ErrorState({ title = "حدث خطأ", description = "حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.", icon: Icon = HiOutlineExclamationCircle, action, className }: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
      <div className="w-16 h-16 rounded-[16px] bg-error/10 border border-error/20 flex items-center justify-center mb-5">
        <Icon className="w-7 h-7 text-error" />
      </div>
      <h3 className="text-lg font-semibold text-text mb-1.5">{title}</h3>
      <p className="text-sm text-text-secondary max-w-sm">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

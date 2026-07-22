import { cn } from "@/lib/utils"
import { HiX } from "react-icons/hi"

type AlertVariant = "info" | "success" | "warning" | "error"

interface AlertProps {
  variant?: AlertVariant
  title?: string
  children: React.ReactNode
  className?: string
  onClose?: () => void
}

const variantStyles: Record<AlertVariant, string> = {
  info: "bg-info/10 border-info/20 text-info",
  success: "bg-success/10 border-success/20 text-success",
  warning: "bg-warning/10 border-warning/20 text-warning",
  error: "bg-error/10 border-error/20 text-error",
}

const iconMap: Record<AlertVariant, string> = {
  info: "i",
  success: "✓",
  warning: "!",
  error: "✕",
}

export function Alert({ variant = "info", title, children, className, onClose }: AlertProps) {
  return (
    <div className={cn(
      "flex items-start gap-3 px-4 py-3.5 rounded-[16px] border backdrop-blur-xl transition-all duration-250",
      variantStyles[variant],
      className,
    )}>
      <span className="text-sm font-bold mt-0.5 shrink-0 w-5 h-5 rounded-[8px] flex items-center justify-center bg-current/10 text-current">
        {iconMap[variant]}
      </span>
      <div className="flex-1 min-w-0">
        {title && <p className="text-sm font-semibold mb-0.5">{title}</p>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
      {onClose && (
        <button type="button" onClick={onClose} className="p-0.5 rounded-[6px] hover:bg-current/10 transition-all shrink-0">
          <HiX className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

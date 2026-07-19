import { cn } from "@/lib/utils"
import { HiExclamationCircle, HiCheckCircle, HiInformationCircle, HiXCircle } from "react-icons/hi"

type AlertVariant = "info" | "success" | "warning" | "error"

const config: Record<AlertVariant, { icon: React.ElementType; className: string }> = {
  info: { icon: HiInformationCircle, className: "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300" },
  success: { icon: HiCheckCircle, className: "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300" },
  warning: { icon: HiExclamationCircle, className: "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-300" },
  error: { icon: HiXCircle, className: "bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300" },
}

interface AlertProps {
  variant?: AlertVariant
  title?: string
  children: React.ReactNode
  className?: string
  onClose?: () => void
}

export function Alert({ variant = "info", title, children, className, onClose }: AlertProps) {
  const { icon: Icon, className: variantClass } = config[variant]
  return (
    <div className={cn("flex items-start gap-3 p-4 rounded-xl border", variantClass, className)}>
      <Icon className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        {title && <p className="font-medium text-sm mb-1">{title}</p>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
      {onClose && (
        <button type="button" onClick={onClose} className="shrink-0 p-0.5 rounded hover:bg-black/5">
          <HiXCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

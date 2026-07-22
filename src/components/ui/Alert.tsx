import { cn } from "@/lib/utils"
import { HiExclamationCircle, HiCheckCircle, HiInformationCircle, HiXCircle } from "react-icons/hi"

type AlertVariant = "info" | "success" | "warning" | "error"

const config: Record<AlertVariant, { icon: React.ElementType; className: string }> = {
  info: { icon: HiInformationCircle, className: "bg-blue-500/10 border-blue-500/20 text-blue-400" },
  success: { icon: HiCheckCircle, className: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" },
  warning: { icon: HiExclamationCircle, className: "bg-amber-500/10 border-amber-500/20 text-amber-400" },
  error: { icon: HiXCircle, className: "bg-red-500/10 border-red-500/20 text-red-400" },
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
    <div className={cn("flex items-start gap-3 p-4 rounded-2xl border", variantClass, className)}>
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

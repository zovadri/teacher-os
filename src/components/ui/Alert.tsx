import { cn } from "@/lib/utils"
import { HiCheckCircle, HiXCircle, HiInformationCircle, HiExclamation } from "react-icons/hi"

type AlertVariant = "success" | "error" | "info" | "warning"

interface AlertProps {
  children: React.ReactNode
  variant?: AlertVariant
  className?: string
}

const icons: Record<AlertVariant, React.ElementType> = {
  success: HiCheckCircle,
  error: HiXCircle,
  info: HiInformationCircle,
  warning: HiExclamation,
}

const styles: Record<AlertVariant, string> = {
  success: "bg-success/10 border-success/20 text-success",
  error: "bg-error/10 border-error/20 text-error",
  info: "bg-info/10 border-info/20 text-info",
  warning: "bg-warning/10 border-warning/20 text-warning",
}

export function Alert({ children, variant = "info", className }: AlertProps) {
  const Icon = icons[variant]
  return (
    <div className={cn(
      "flex items-start gap-3 px-4 py-3 rounded-[14px] border",
      styles[variant],
      className,
    )}>
      <Icon className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="flex-1 text-sm">{children}</div>
    </div>
  )
}

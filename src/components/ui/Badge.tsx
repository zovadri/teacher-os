import { cn } from "@/lib/utils"

type BadgeVariant = "default" | "primary" | "success" | "warning" | "error" | "info"
type BadgeSize = "sm" | "md"

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  className?: string
  dot?: boolean
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-card/80 backdrop-blur-xl border border-border text-text-secondary",
  primary: "bg-primary-100 backdrop-blur-xl border border-primary-200 text-primary shadow-[0_0_12px_rgba(124,92,252,0.06)]",
  success: "bg-success/10 backdrop-blur-xl border border-success/20 text-success",
  warning: "bg-warning/10 backdrop-blur-xl border border-warning/20 text-warning",
  error: "bg-error/10 backdrop-blur-xl border border-error/20 text-error",
  info: "bg-info/10 backdrop-blur-xl border border-info/20 text-info",
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
}

export function Badge({ children, variant = "default", size = "md", className, dot = false }: BadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 font-medium rounded-[8px]",
      variantStyles[variant],
      sizeStyles[size],
      className,
    )}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />}
      {children}
    </span>
  )
}

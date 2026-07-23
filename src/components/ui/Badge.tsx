import { cn } from "@/lib/utils"

type BadgeVariant = "default" | "primary" | "success" | "warning" | "error" | "info" | "neutral"
type BadgeSize = "sm" | "md"

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  className?: string
  dot?: boolean
  pulse?: boolean
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-card border border-border text-text-secondary",
  neutral: "bg-surface-secondary backdrop-blur-2xl border border-border text-text-secondary",
  primary: "bg-primary-100 backdrop-blur-2xl border border-primary-200 text-primary",
  success: "bg-success/10 backdrop-blur-2xl border border-success/20 text-success",
  warning: "bg-warning/10 backdrop-blur-2xl border border-warning/20 text-warning",
  error: "bg-error/10 backdrop-blur-2xl border border-error/20 text-error",
  info: "bg-info/10 backdrop-blur-2xl border border-info/20 text-info",
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
}

export function Badge({ children, variant = "default", size = "md", className, dot = false, pulse = false }: BadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 font-medium rounded-[8px] tracking-wide",
      variantStyles[variant],
      sizeStyles[size],
      className,
    )}>
      {dot && (
        <span className={cn(
          "w-1.5 h-1.5 rounded-full bg-current shrink-0",
          pulse && "animate-pulse",
        )} />
      )}
      {children}
    </span>
  )
}

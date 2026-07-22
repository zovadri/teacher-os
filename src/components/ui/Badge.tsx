import { cn } from "@/lib/utils"

type BadgeVariant = "primary" | "success" | "warning" | "error" | "info" | "neutral" | "premium"

const variants: Record<BadgeVariant, string> = {
  primary: "bg-primary/10 text-primary-light",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  error: "bg-error/10 text-error",
  info: "bg-info/10 text-info",
  neutral: "bg-white/5 text-text-secondary",
  premium: "bg-warning/10 text-warning",
}

interface BadgeProps {
  children?: React.ReactNode
  variant?: BadgeVariant
  size?: "sm" | "md" | "lg"
  className?: string
  dot?: boolean
}

export function Badge({ children, variant = "neutral", size = "sm", className, dot }: BadgeProps) {
  const sizeClasses = { sm: "px-2 py-0.5 text-xs", md: "px-2.5 py-1 text-sm", lg: "px-3 py-1.5 text-sm" }
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-medium rounded-full", variants[variant], sizeClasses[size], className)}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}

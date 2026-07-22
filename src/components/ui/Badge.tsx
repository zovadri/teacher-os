import { cn } from "@/lib/utils"

type BadgeVariant = "primary" | "success" | "warning" | "error" | "info" | "neutral" | "premium"

const variants: Record<BadgeVariant, string> = {
  primary: "bg-primary/10 text-primary",
  success: "bg-emerald-500/10 text-emerald-400",
  warning: "bg-amber-500/10 text-amber-400",
  error: "bg-red-500/10 text-red-400",
  info: "bg-blue-500/10 text-blue-400",
  neutral: "bg-surface-tertiary text-text-secondary",
  premium: "bg-amber-500/10 text-amber-400",
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

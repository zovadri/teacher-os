import { cn } from "@/lib/utils"

type BadgeVariant = "primary" | "success" | "warning" | "error" | "info" | "neutral" | "premium"

const variants: Record<BadgeVariant, string> = {
  primary: "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300",
  success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  error: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  info: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  neutral: "bg-surface-tertiary text-text-secondary dark:bg-gray-700 dark:text-gray-300",
  premium: "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 dark:from-amber-900/40 dark:to-yellow-900/40 dark:text-amber-300",
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

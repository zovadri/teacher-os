import { cn } from "@/lib/utils"

interface ProgressProps {
  value: number
  max?: number
  size?: "sm" | "md" | "lg"
  variant?: "primary" | "success" | "warning" | "error"
  showLabel?: boolean
  className?: string
}

const sizes = { sm: "h-1.5", md: "h-2.5", lg: "h-4" }
const variants = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
}

export function Progress({ value, max = 100, size = "md", variant = "primary", showLabel, className }: ProgressProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100)
  return (
    <div className={cn("space-y-1", className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-text-secondary">
          <span>{Math.round(pct)}%</span>
        </div>
      )}
      <div className={cn("w-full bg-surface-tertiary rounded-full overflow-hidden", sizes[size])}>
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", variants[variant])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

import { cn } from "@/lib/utils"

interface ProgressProps {
  value: number
  max?: number
  size?: "sm" | "md" | "lg"
  color?: "primary" | "success" | "warning" | "error" | "info"
  showLabel?: boolean
  className?: string
}

const sizeStyles = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
}

const colorStyles = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  info: "bg-info",
}

export function Progress({ value, max = 100, size = "md", color = "primary", showLabel = false, className }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={cn("space-y-1", className)}>
      {showLabel && (
        <div className="flex justify-between text-xs">
          <span className="text-text-secondary">{Math.round(pct)}%</span>
          <span className="text-text-tertiary">{value}/{max}</span>
        </div>
      )}
      <div className={cn("w-full bg-card rounded-full overflow-hidden border border-border/50", sizeStyles[size])}>
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", colorStyles[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

import { cn } from "@/lib/utils"

interface ProgressProps {
  value: number
  className?: string
  size?: "sm" | "md"
}

export function Progress({ value, className, size = "md" }: ProgressProps) {
  return (
    <div className={cn(
      "w-full bg-card/80 rounded-full overflow-hidden border border-border",
      size === "sm" ? "h-1.5" : "h-2.5",
      className,
    )}>
      <div
        className="h-full bg-primary rounded-full transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

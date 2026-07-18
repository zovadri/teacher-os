import { cn } from "../../lib/utils"

interface SkeletonProps {
  className?: string
  variant?: "text" | "circle" | "rect"
}

export function Skeleton({ className, variant = "text" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-surface-tertiary rounded-md",
        variant === "text" && "h-4 w-full",
        variant === "circle" && "rounded-full",
        variant === "rect" && "h-32 w-full rounded-xl",
        className,
      )}
    />
  )
}

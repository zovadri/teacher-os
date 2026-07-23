import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
  variant?: "text" | "circular" | "rectangular"
}

export function Skeleton({ className, variant = "text" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-card/80",
        variant === "circular" && "rounded-full",
        variant === "text" && "h-4 rounded-[8px]",
        variant === "rectangular" && "rounded-[14px]",
        className,
      )}
    />
  )
}

export function StatsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card border border-border rounded-[16px] p-5 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
          <div className="w-11 h-11 rounded-[12px] bg-card/80 animate-pulse" />
          <div className="h-4 w-20 bg-card/80 animate-pulse rounded-[8px]" />
          <div className="h-8 w-32 bg-card/80 animate-pulse rounded-[8px]" />
        </div>
      ))}
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="border border-border rounded-[16px] overflow-hidden">
      <div className="bg-card/50 border-b border-border px-4 py-3">
        <div className="h-4 w-32 bg-card/80 animate-pulse rounded-[8px]" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="border-b border-border last:border-b-0 px-4 py-3 flex items-center gap-4">
          <div className="h-4 flex-1 bg-card/80 animate-pulse rounded-[8px]" />
          <div className="h-4 w-20 bg-card/80 animate-pulse rounded-[8px]" />
          <div className="h-4 w-16 bg-card/80 animate-pulse rounded-[8px]" />
        </div>
      ))}
    </div>
  )
}

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card border border-border rounded-[16px] p-5 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-card/80 animate-pulse" />
            <div className="h-5 flex-1 bg-card/80 animate-pulse rounded-[8px]" />
          </div>
          <div className="h-4 w-3/4 bg-card/80 animate-pulse rounded-[8px]" />
          <div className="h-4 w-1/2 bg-card/80 animate-pulse rounded-[8px]" />
        </div>
      ))}
    </div>
  )
}

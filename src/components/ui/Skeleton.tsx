import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-[16px] animate-pulse",
        className,
      )}
    />
  )
}

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex gap-4 px-4 py-3">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 px-4 py-4 border-b border-border/50">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className="h-5 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card/60 backdrop-blur-xl border border-border rounded-[24px] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="w-11 h-11 rounded-[16px]" />
            <Skeleton className="w-16 h-6 rounded-[10px]" />
          </div>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-8 w-full rounded-[12px]" />
        </div>
      ))}
    </div>
  )
}

export function StatsSkeleton() {
  return <CardSkeleton count={4} />
}

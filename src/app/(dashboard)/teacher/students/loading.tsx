"use client"

import { Skeleton, StatsSkeleton, TableSkeleton } from "@/components/ui/Skeleton"

export default function StudentsLoading() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-56" />
      </div>
      <StatsSkeleton count={4} />
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-32" />
      </div>
      <TableSkeleton rows={8} columns={6} />
    </div>
  )
}

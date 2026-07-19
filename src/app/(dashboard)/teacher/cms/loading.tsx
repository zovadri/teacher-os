"use client"

import { Skeleton, CardSkeleton } from "@/components/ui/Skeleton"

export default function CmsLoading() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-56" />
      </div>
      <CardSkeleton count={4} />
    </div>
  )
}

"use client"

import { Skeleton, StatsSkeleton, CardSkeleton } from "@/components/ui/Skeleton"

export default function TeacherLoading() {
  return (
    <div className="min-h-screen">
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <StatsSkeleton count={4} />
        <CardSkeleton count={3} />
        <div className="grid lg:grid-cols-2 gap-6">
          <Skeleton variant="card" className="h-72" />
          <Skeleton variant="card" className="h-72" />
        </div>
      </div>
    </div>
  )
}

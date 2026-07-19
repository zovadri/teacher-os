'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'table-row' | 'avatar';
  width?: string | number;
  height?: string | number;
  count?: number;
}

export function Skeleton({ className, variant = 'text', width, height, count = 1 }: SkeletonProps) {
  const baseClass = 'animate-pulse bg-gray-200 dark:bg-gray-700 rounded';

  const variants = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'h-48 w-full rounded-xl',
    'table-row': 'h-12 w-full rounded',
    avatar: 'rounded-full h-12 w-12',
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <>
      {items.map((i) => (
        <div
          key={i}
          className={cn(baseClass, variants[variant], className)}
          style={style}
          role="status"
          aria-label="Loading"
        />
      ))}
    </>
  );
}

export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-4">
        {Array.from({ length: columns }, (_, i) => (
          <Skeleton key={i} className="flex-1 h-10" />
        ))}
      </div>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: columns }, (_, j) => (
            <Skeleton key={j} className="flex-1 h-8" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-4">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  );
}

export function StatsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton variant="circular" className="h-10 w-10" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-5 w-2/3" />
            </div>
          </div>
          <Skeleton className="h-2 w-full" />
        </div>
      ))}
    </div>
  );
}

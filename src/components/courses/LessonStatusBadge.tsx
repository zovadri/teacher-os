'use client'

import { cn } from '@/lib/utils'
import { Lock, Clock, CheckCircle, PlayCircle, LucideIcon } from 'lucide-react'

type LessonStatus = 'available' | 'locked' | 'coming-soon' | 'completed' | 'in-progress'

interface LessonStatusBadgeProps {
  status: LessonStatus
  availableDate?: string
  prerequisite?: string
}

const statusConfig: Record<LessonStatus, { icon: LucideIcon; label: string; className: string }> = {
  'available': { icon: PlayCircle, label: 'متاح', className: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' },
  'locked': { icon: Lock, label: 'مقفل', className: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400' },
  'coming-soon': { icon: Clock, label: 'قريباً', className: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' },
  'completed': { icon: CheckCircle, label: 'مكتمل', className: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
  'in-progress': { icon: PlayCircle, label: 'جارٍ', className: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
}

export function LessonStatusBadge({ status, availableDate, prerequisite }: LessonStatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium', config.className)} title={
      status === 'locked' ? `مطلوب إكمال: ${prerequisite}` :
      status === 'coming-soon' ? `متاح من: ${availableDate}` :
      undefined
    }>
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </div>
  )
}

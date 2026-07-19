'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { BookOpen, FileText, LogIn, Award, CheckCircle, Clock, LucideIcon } from 'lucide-react'

interface TimelineItem {
  id: string
  type: 'login' | 'exam' | 'course' | 'homework' | 'certificate' | 'payment'
  title: string
  description?: string
  date: string
  time?: string
}

const typeIcons: Record<string, LucideIcon> = {
  login: LogIn,
  exam: FileText,
  course: BookOpen,
  homework: Clock,
  certificate: Award,
  payment: CheckCircle,
}

const typeColors: Record<string, string> = {
  login: 'text-blue-500 bg-blue-50 dark:bg-blue-900/30',
  exam: 'text-purple-500 bg-purple-50 dark:bg-purple-900/30',
  course: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30',
  homework: 'text-amber-500 bg-amber-50 dark:bg-amber-900/30',
  certificate: 'text-rose-500 bg-rose-50 dark:bg-rose-900/30',
  payment: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-900/30',
}

interface StudentTimelineProps {
  items: TimelineItem[]
}

export function StudentTimeline({ items }: StudentTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute right-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-6">
        {items.map((item, index) => {
          const Icon = typeIcons[item.type]
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative pr-10"
            >
              <div className={cn('absolute right-2 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-gray-900', typeColors[item.type])}>
                <Icon className="w-3 h-3" />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
                <p className="font-medium text-sm text-gray-900 dark:text-white">{item.title}</p>
                {item.description && <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>}
                <p className="text-xs text-gray-400 mt-1">
                  {item.date}{item.time ? ` | ${item.time}` : ''}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

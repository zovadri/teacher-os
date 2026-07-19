'use client'

import { useEffect, useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Clock, AlertTriangle } from 'lucide-react'

interface ExamTimerProps {
  durationMinutes: number
  onTimeUp: () => void
  onTick?: (remainingSeconds: number) => void
}

export function ExamTimer({ durationMinutes, onTimeUp, onTick }: ExamTimerProps) {
  const [remaining, setRemaining] = useState(durationMinutes * 60)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()
  const onTimeUpRef = useRef(onTimeUp)
  const onTickRef = useRef(onTick)
  const calledRef = useRef(false)

  onTimeUpRef.current = onTimeUp
  onTickRef.current = onTick

  useEffect(() => {
    calledRef.current = false
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          if (!calledRef.current) {
            calledRef.current = true
            onTimeUpRef.current()
          }
          return 0
        }
        onTickRef.current?.(prev - 1)
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [durationMinutes])

  const minutes = Math.floor(remaining / 60)
  const seconds = remaining % 60
  const totalMinutes = durationMinutes * 60
  const percentage = (remaining / totalMinutes) * 100

  const isWarning = remaining <= 300 && remaining > 60
  const isDanger = remaining <= 60

  return (
    <div className={cn(
      'flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors duration-300',
      isDanger ? 'bg-red-50 dark:bg-red-900/30 text-red-600' :
      isWarning ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600' :
      'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
    )}>
      {isDanger && <AlertTriangle className="w-4 h-4 animate-pulse" />}
      {!isDanger && <Clock className="w-4 h-4" />}
      <span className={cn(
        'font-mono text-lg font-bold tabular-nums',
        isDanger && 'animate-pulse'
      )}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
      <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-1000 ease-linear',
            isDanger ? 'bg-red-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

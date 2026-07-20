'use client'

import { useEffect } from 'react'
import { ExamTimer } from './ExamTimer'
import { FileText, Send, Pause, Play } from 'lucide-react'

interface ExamHeaderProps {
  title: string
  durationMinutes: number
  currentIndex: number
  totalQuestions: number
  onTimeUp: () => void
  onSubmit: () => void
  onPause: () => void
  isPaused: boolean
  answeredCount: number
}

export function ExamHeader({
  title,
  durationMinutes,
  currentIndex,
  totalQuestions,
  onTimeUp,
  onSubmit,
  onPause,
  isPaused,
  answeredCount,
}: ExamHeaderProps) {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  return (
    <header className="sticky top-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h1 className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">{title}</h1>
              <p className="text-xs text-gray-500">
                ط·آ³ط·آ¤ط·آ§ط¸â€‍ {currentIndex + 1} ط¸â€¦ط¸â€  {totalQuestions}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{answeredCount}/{totalQuestions}</span>
            </div>

            <ExamTimer
              durationMinutes={durationMinutes}
              onTimeUp={onTimeUp}
            />

            <button type="button"
onClick={onPause}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
              title={isPaused ? 'ط·آ§ط·آ³ط·ع¾ط·آ¦ط¸â€ ط·آ§ط¸ظ¾' : 'ط·آ¥ط¸ظ¹ط¸â€ڑط·آ§ط¸ظ¾ ط¸â€¦ط·آ¤ط¸â€ڑط·ع¾'}
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>

            <button type="button"
onClick={onSubmit}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors active:scale-[0.97]"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">ط·ع¾ط·آ³ط¸â€‍ط¸ظ¹ط¸â€¦ ط·آ§ط¸â€‍ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€ </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

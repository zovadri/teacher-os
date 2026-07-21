'use client'

import { cn } from '@/lib/utils'
import { Flag } from 'lucide-react'
import type { Question } from '@/lib/types'

interface QuestionPaletteProps {
  questions: Question[]
  currentIndex: number
  answers: Record<string, string | boolean | string[] | Record<string, string> | null>
  flaggedQuestions: Set<string>
  onJump: (index: number) => void
  onToggleFlag: (qId: string) => void
  isOpen: boolean
  onClose: () => void
}

export function QuestionPalette({
  questions,
  currentIndex,
  answers,
  flaggedQuestions,
  onJump,
  onToggleFlag,
  isOpen,
  onClose,
}: QuestionPaletteProps) {
  const answeredCount = questions.filter((q) => {
    const ans = answers[q.id]
    if (ans === undefined || ans === null) return false
    if (typeof ans === 'string' && ans === '') return false
    if (typeof ans === 'object' && !Array.isArray(ans) && Object.keys(ans).length === 0) return false
    return true
  }).length

  const flaggedCount = flaggedQuestions.size
  const unansweredCount = questions.length - answeredCount

  return (
    <>
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/20 z-30 lg:hidden" />
      )}
      <aside className={cn(
        'fixed lg:sticky top-0 lg:top-0 h-screen lg:h-auto z-40 lg:z-10 bg-white dark:bg-gray-900 border-l lg:border-l border-gray-200 dark:border-gray-800 w-72 p-5 overflow-y-auto transition-transform duration-300 shadow-lg lg:shadow-none',
        isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      )}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">قائمة الأسئلة</h3>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 lg:hidden transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="mb-5 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2 text-xs text-gray-500">
            <span>طھظ…طھ الإجابة</span>
            <span className="font-bold text-emerald-600">{answeredCount}/{questions.length}</span>
          </div>
          <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${(answeredCount / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 mb-5">
          {questions.map((q, i) => {
            const ans = answers[q.id]
            const isAnswered = ans !== undefined && ans !== null && ans !== '' &&
              !(typeof ans === 'object' && !Array.isArray(ans) && Object.keys(ans).length === 0)
            const isFlagged = flaggedQuestions.has(q.id)
            const isCurrent = i === currentIndex

            return (
              <button type="button"
                key={q.id}
                onClick={() => onJump(i)}
                className={cn(
                  'relative h-10 rounded-xl text-xs font-bold transition-all duration-200',
                  isCurrent
                    ? 'bg-primary text-white shadow-md ring-2 ring-primary/30'
                    : isAnswered && isFlagged
                      ? 'bg-amber-50 text-amber-700 border border-amber-300 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700'
                      : isAnswered
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-700'
                        : isFlagged
                          ? 'bg-amber-50 text-amber-700 border border-amber-300 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700'
                          : 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-primary/40'
                )}
              >
                {i + 1}
                {isFlagged && (
                  <span className="absolute -top-1 -right-1">
                    <Flag className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className="mb-5 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-500" />
              <span className="text-gray-600 dark:text-gray-400">طھظ…طھ الإجابة</span>
            </div>
            <span className="font-medium text-emerald-600">{answeredCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-500" />
              <span className="text-gray-600 dark:text-gray-400">للمراجعة</span>
            </div>
            <span className="font-medium text-amber-600">{flaggedCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-gray-300 dark:bg-gray-600" />
              <span className="text-gray-600 dark:text-gray-400">لم ظٹطھظ… الإجابة</span>
            </div>
            <span className="font-medium text-red-600">{unansweredCount}</span>
          </div>
        </div>

        <div className="space-y-2">
          {questions.map((q, i) => {
            const isCurrent = i === currentIndex
            const isFlagged = flaggedQuestions.has(q.id)
            return (
              <button type="button"
                key={q.id}
                onClick={() => {
                  onToggleFlag(q.id)
                }}
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors text-right',
                  isFlagged
                    ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400'
                )}
              >
                <Flag className={cn('w-3.5 h-3.5', isFlagged && 'fill-amber-500 text-amber-500')} />
                <span>{isFlagged ? 'إلغاء التمييز' : 'تمييز للمراجعة'} - سؤال {i + 1}</span>
              </button>
            )
          })}
        </div>
      </aside>
    </>
  )
}

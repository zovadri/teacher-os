'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ArrowUp, ArrowDown, Check, X } from 'lucide-react'
import type { Question } from '@/lib/types'

interface QuestionCardProps {
  question: Question
  answer: string | boolean | string[] | null
  onAnswer: (answer: string | boolean | string[]) => void
}

export function QuestionCard({ question, answer, onAnswer }: QuestionCardProps) {
  const isMcq = question.type === 'multiple-choice'
  const isTf = question.type === 'true-false'
  const isEssay = question.type === 'essay'
  const isFill = question.type === 'fill-blank'
  const isOrdering = question.type === 'ordering'
  const isMatching = question.type === 'matching'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
    >
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
          {question.type === 'multiple-choice' ? 'اختيار من متعدد' :
           question.type === 'true-false' ? 'صح وخطأ' :
           question.type === 'essay' ? 'سؤال مقالي' :
           question.type === 'fill-blank' ? 'املأ الفراغ' :
           question.type === 'ordering' ? 'ترتيب' :
           'مطابقة'} | {question.grade} درجات
        </span>
        <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-900 dark:text-gray-100">
          {question.text}
        </p>
      </div>

      {isMcq && question.choices && (
        <div className="space-y-3">
          {question.choices.map((choice) => {
            const selected = answer === choice.id
            return (
              <button type="button"
                key={choice.id}
                onClick={() => onAnswer(choice.id)}
                className={cn(
                  'w-full text-right flex items-center gap-4 p-4 rounded-xl border-2 text-sm transition-all duration-200',
                  selected
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary/40 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                )}
              >
                <span className={cn(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200',
                  selected
                    ? 'border-primary bg-primary'
                    : 'border-gray-300 dark:border-gray-600'
                )}>
                  {selected && <Check className="w-3.5 h-3.5 text-white" />}
                </span>
                <span className="flex-1 text-gray-700 dark:text-gray-300">{choice.text}</span>
              </button>
            )
          })}
        </div>
      )}

      {isTf && (
        <div className="flex gap-4">
          {[
            { label: 'صحيح', value: 'true', color: 'emerald' },
            { label: 'خطأ', value: 'false', color: 'red' },
          ].map((opt) => {
            const selected = answer === opt.value
            return (
              <motion.button
                key={opt.value}
                whileTap={{ scale: 0.97 }}
                onClick={() => onAnswer(opt.value)}
                className={cn(
                  'flex-1 py-4 rounded-xl text-lg font-bold border-2 transition-all duration-200',
                  selected && opt.value === 'true'
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 shadow-md'
                    : selected && opt.value === 'false'
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600 shadow-md'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  {opt.value === 'true' ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                  {opt.label}
                </div>
              </motion.button>
            )
          })}
        </div>
      )}

      {isEssay && (
        <div>
          <textarea
            value={(answer as string) || ''}
            onChange={(e) => onAnswer(e.target.value)}
            rows={6}
            placeholder="اكتب إجابتك هنا..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
          />
          <div className="flex justify-end mt-2">
            <span className="text-xs text-gray-400">
              {((answer as string) || '').length} حرف
            </span>
          </div>
        </div>
      )}

      {isFill && (
        <div>
          <input
            type="text"
            value={(answer as string) || ''}
            onChange={(e) => onAnswer(e.target.value)}
            placeholder="اكتب الإجابة هنا..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 dark:text-gray-100 placeholder-gray-400"
          />
        </div>
      )}

      {isOrdering && (
        <OrderingQuestion
          items={question.orderingItems || []}
          answer={answer as string[] | null}
          onAnswer={onAnswer}
        />
      )}

      {isMatching && (
        <MatchingQuestion
          leftItems={question.matchingLeft || []}
          rightItems={question.matchingRight || []}
          answer={answer as Record<string, string> | null}
          onAnswer={onAnswer}
        />
      )}
    </motion.div>
  )
}

function OrderingQuestion({
  items,
  answer,
  onAnswer,
}: {
  items: { id: string; text: string }[]
  answer: string[] | null
  onAnswer: (val: string[]) => void
}) {
  const order = answer || items.map((i) => i.id)

  const moveUp = (index: number) => {
    if (index === 0) return
    const newOrder = [...order]
    ;[newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]]
    onAnswer(newOrder)
  }

  const moveDown = (index: number) => {
    if (index === order.length - 1) return
    const newOrder = [...order]
    ;[newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]
    onAnswer(newOrder)
  }

  return (
    <div className="space-y-2">
      {order.map((itemId, index) => {
        const item = items.find((i) => i.id === itemId)
        if (!item) return null
        return (
          <motion.div
            key={item.id}
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
              {index + 1}
            </span>
            <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">{item.text}</span>
            <div className="flex gap-1">
              <button type="button"
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 disabled:opacity-30 transition-colors"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button type="button"
                onClick={() => moveDown(index)}
                disabled={index === order.length - 1}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 disabled:opacity-30 transition-colors"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function MatchingQuestion({
  leftItems,
  rightItems,
  answer,
  onAnswer,
}: {
  leftItems: { id: string; text: string }[]
  rightItems: { id: string; text: string }[]
  answer: Record<string, string> | null
  onAnswer: (val: Record<string, string>) => void
}) {
  const matches = answer || {}

  const handleSelectRight = (leftId: string, rightId: string) => {
    const newMatches = { ...matches }
    if (newMatches[leftId] === rightId) {
      delete newMatches[leftId]
    } else {
      newMatches[leftId] = rightId
    }
    onAnswer(newMatches)
  }

  const getMatchedRight = (leftId: string) => matches[leftId] || null

  const getUnmatchedRight = (rightId: string) => {
    return !Object.values(matches).includes(rightId)
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-3">
        {leftItems.map((item) => {
          const matched = getMatchedRight(item.id)
          return (
            <div
              key={item.id}
              className={cn(
                'p-3 rounded-xl border-2 text-sm transition-all duration-200',
                matched
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 dark:border-gray-700'
              )}
            >
              <span className="block text-gray-700 dark:text-gray-300">{item.text}</span>
            </div>
          )
        })}
      </div>
      <div className="space-y-3">
        {rightItems.map((item) => {
          const isUsed = !getUnmatchedRight(item.id)
          return (
            <button type="button"
              key={item.id}
              onClick={() => {
                const leftId = Object.entries(matches).find(([, v]) => v === item.id)?.[0]
                if (leftId) {
                  const newMatches = { ...matches }
                  delete newMatches[leftId]
                  onAnswer(newMatches)
                }
              }}
              className={cn(
                'w-full text-right p-3 rounded-xl border-2 text-sm transition-all duration-200',
                isUsed
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary/40 text-gray-700 dark:text-gray-300'
              )}
            >
              {item.text}
            </button>
          )
        })}
      </div>
    </div>
  )
}

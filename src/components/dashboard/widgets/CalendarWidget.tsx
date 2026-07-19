"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { HiChevronRight, HiChevronLeft } from "react-icons/hi"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { cn } from "@/lib/utils"

const arabicMonths = [
  "ظٹظ†ط§ظٹط±", "ظپط¨ط±ط§ظٹط±", "ظ…ط§ط±ط³", "ط¥ط¨ط±ظٹظ„", "ظ…ط§ظٹظˆ", "ظٹظˆظ†ظٹظˆ",
  "ظٹظˆظ„ظٹظˆ", "ط£ط؛ط³ط·ط³", "ط³ط¨طھظ…ط¨ط±", "ط£ظƒطھظˆط¨ط±", "ظ†ظˆظپظ…ط¨ط±", "ط¯ظٹط³ظ…ط¨ط±",
]

const arabicDays = ["ط­", "ظ†", "ط«", "ط±", "ط®", "ط¬", "ط³"]

const mockEvents = [
  { day: 5, title: "ط§ظ…طھط­ط§ظ† ط§ظ„ظ†ط­ظˆ", type: "exam" },
  { day: 12, title: "طھط³ظ„ظٹظ… ظˆط§ط¬ط¨", type: "homework" },
  { day: 15, title: "ط§ط¬طھظ…ط§ط¹ ط£ظˆظ„ظٹط§ط، ط§ظ„ط£ظ…ظˆط±", type: "meeting" },
  { day: 20, title: "ط§ط®طھط¨ط§ط± ط§ظ„ط¨ظ„ط§ط؛ط©", type: "exam" },
  { day: 25, title: "ط¨ط¯ط§ظٹط© ط§ظ„ط¥ط¬ط§ط²ط©", type: "holiday" },
]

const eventColors: Record<string, string> = {
  exam: "bg-error/15 text-error border-error/30",
  homework: "bg-warning/15 text-warning border-warning/30",
  meeting: "bg-info/15 text-info border-info/30",
  holiday: "bg-success/15 text-success border-success/30",
}

export default function CalendarWidget() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const days = useMemo(() => {
    const result: (number | null)[] = []
    for (let i = 0; i < firstDayOfMonth; i++) result.push(null)
    for (let i = 1; i <= daysInMonth; i++) result.push(i)
    return result
  }, [firstDayOfMonth, daysInMonth])

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear((y) => y - 1) }
    else setCurrentMonth((m) => m - 1)
    setSelectedDay(null)
  }

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear((y) => y + 1) }
    else setCurrentMonth((m) => m + 1)
    setSelectedDay(null)
  }

  const dayEvents = mockEvents.filter((e) => e.day === selectedDay)

  const todayStr = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`

  return (
    <Card>
      <CardHeader>
        <CardTitle>ط§ظ„طھظ‚ظˆظٹظ…</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <button type="button" onClick={prevMonth} className="p-2 rounded-lg hover:bg-surface-secondary text-text-secondary transition-colors">
            <HiChevronRight className="w-4 h-4" />
          </button>
          <span className="text-sm font-semibold text-text">
            {arabicMonths[currentMonth]} {currentYear}
          </span>
          <button type="button" onClick={nextMonth} className="p-2 rounded-lg hover:bg-surface-secondary text-text-secondary transition-colors">
            <HiChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {arabicDays.map((d) => (
            <div key={d} className="text-center text-xs text-text-tertiary font-medium py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, i) => {
            if (day === null) return <div key={`e-${i}`} />
            const isToday = `${day}-${currentMonth}-${currentYear}` === todayStr
            const hasEvent = mockEvents.some((e) => e.day === day)
            const isSelected = selectedDay === day
            return (
              <motion.button
                key={day}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedDay(isSelected ? null : day)}
                className={cn(
                  "relative text-sm py-1.5 rounded-lg transition-all duration-150 text-center",
                  isSelected && "bg-primary text-white font-semibold shadow-sm",
                  !isSelected && isToday && "bg-primary/10 text-primary font-semibold",
                  !isSelected && !isToday && "hover:bg-surface-secondary text-text-secondary",
                )}
              >
                {day}
                {hasEvent && !isSelected && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </motion.button>
            )
          })}
        </div>

        {dayEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 space-y-1.5 border-t border-border pt-3"
          >
            {dayEvents.map((ev) => (
              <div
                key={`${ev.day}-${ev.title}`}
                className={cn("text-xs px-2.5 py-1.5 rounded-lg border", eventColors[ev.type] || "bg-surface-secondary text-text-secondary")}
              >
                {ev.title}
              </div>
            ))}
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

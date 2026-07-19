"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/Card"

const arabicMonths = [
  "يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
]

const arabicDays = [
  "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت",
]

export default function ClockWidget() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const hours = time.getHours().toString().padStart(2, "0")
  const minutes = time.getMinutes().toString().padStart(2, "0")
  const seconds = time.getSeconds().toString().padStart(2, "0")

  const dayName = arabicDays[time.getDay()]
  const day = time.getDate()
  const month = arabicMonths[time.getMonth()]
  const year = time.getFullYear()

  return (
    <Card className="text-center">
      <CardContent className="py-6">
        <p className="text-xs text-text-tertiary mb-1">القاهرة</p>
        <div className="text-4xl font-bold text-text tracking-wider mb-1" dir="ltr">
          <span>{hours}</span>
          <span className="text-primary mx-0.5 animate-pulse">:</span>
          <span>{minutes}</span>
          <span className="text-primary mx-0.5 animate-pulse">:</span>
          <span className="text-lg">{seconds}</span>
        </div>
        <p className="text-sm text-text-secondary mt-2">
          {dayName}، {day} {month} {year}
        </p>
      </CardContent>
    </Card>
  )
}

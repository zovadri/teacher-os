"use client"

import { useState, useMemo, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineChevronRight,
  HiOutlineChevronLeft,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineAcademicCap,
  HiOutlineClipboardCheck,
  HiOutlinePencilAlt,
  HiOutlineUsers,
  HiOutlineViewGrid,
  HiOutlineViewList,
  HiOutlineViewBoards,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from "@/components/ui"
import { mockExams, mockHomework, mockCourses, mockEnrollments } from "@/lib/mock/data"
import { formatDate, cn } from "@/lib/utils"

type EventType = "exam" | "homework" | "class" | "meeting" | "event"

interface CalendarEvent {
  id: string
  title: string
  type: EventType
  date: Date
  endDate?: Date
  description: string
  courseId?: string
}

type ViewMode = "month" | "week" | "day" | "agenda"

const EVENT_TYPE_CONFIG: Record<EventType, { variant: "primary" | "warning" | "success" | "info" | "neutral"; icon: React.ElementType; label: string }> = {
  exam: { variant: "primary", icon: HiOutlineAcademicCap, label: "اختبار" },
  homework: { variant: "warning", icon: HiOutlinePencilAlt, label: "واجب" },
  class: { variant: "success", icon: HiOutlineUsers, label: "حصة" },
  meeting: { variant: "info", icon: HiOutlineClipboardCheck, label: "اجتماع" },
  event: { variant: "neutral", icon: HiOutlineCalendar, label: "حدث" },
}

const DAY_NAMES = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]

function getMonthDays(year: number, month: number): (Date | null)[][] {
  const firstDay = new Date(year, month, 1)
  const startDayOfWeek = firstDay.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const weeks: (Date | null)[][] = []
  let week: (Date | null)[] = []
  for (let i = 0; i < startDayOfWeek; i++) week.push(null)
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(new Date(year, month, d))
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null)
    weeks.push(week)
  }
  return weeks
}

function getWeekDays(date: Date): Date[] {
  const day = date.getDay()
  const start = new Date(date)
  start.setDate(date.getDate() - day)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return d
  })
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date())
}

function isPast(date: Date): boolean {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return date < now
}

function getEventsForDay(events: CalendarEvent[], date: Date): CalendarEvent[] {
  return events.filter((e) => isSameDay(e.date, date))
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })
}

const viewModeOptions: { id: ViewMode; label: string; icon: React.ElementType }[] = [
  { id: "month", label: "شهري", icon: HiOutlineViewGrid },
  { id: "week", label: "أسبوعي", icon: HiOutlineViewBoards },
  { id: "day", label: "يومي", icon: HiOutlineViewList },
  { id: "agenda", label: "قائمة", icon: HiOutlineCalendar },
]

function getEventRoute(event: CalendarEvent): string | null {
  switch (event.type) {
    case "exam":
      return `/teacher/exams/${event.id.replace("event-exam-", "")}`
    case "homework":
      return `/teacher/homework/${event.id.replace("event-hw-", "")}`
    case "class":
      return `/teacher/sessions`
    default:
      return null
  }
}

export default function CalendarPage() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<ViewMode>("month")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const allEvents = useMemo(() => {
    const events: CalendarEvent[] = []
    const now = new Date()
    const thisYear = now.getFullYear()
    const thisMonth = now.getMonth()

    mockExams
      .filter((e) => e.status === "active")
      .forEach((exam) => {
        events.push({
          id: `event-exam-${exam.id}`,
          title: exam.title,
          type: "exam",
          date: exam.startDate,
          endDate: exam.endDate,
          description: `${exam.duration} دقيقة • ${exam.totalGrade} درجة`,
          courseId: exam.courseId,
        })
      })

    mockHomework
      .filter((h) => h.status !== "draft")
      .forEach((hw) => {
        events.push({
          id: `event-hw-${hw.id}`,
          title: hw.title,
          type: "homework",
          date: hw.deadline,
          description: "آخر موعد للتسليم",
          courseId: hw.courseId,
        })
      })

    const classTitles = [
      "قواعد النحو المتقدمة", "تحليل النصوص الأدبية", "البلاغة العربية",
      "شرح ألفية ابن مالك", "النقد الأدبي الحديث", "مهارات الإملاء",
    ]
    const meetingTitles = [
      "اجتماع أولياء الأمور", "اجتماع هيئة التدريس", "ورشة تطوير المناهج",
      "اجتماع تنسيق الجدول الدراسي",
    ]
    const eventTitles = [
      "بداية الفصل الدراسي", "إجازة منتصف الترم", "يوم التقييم الشهري",
      "ملتقى اللغة العربية", "حفل تكريم المتفوقين",
    ]

    for (let i = 0; i < 3; i++) {
      const classDate = new Date(thisYear, thisMonth, 5 + i * 7 + (i % 3))
      events.push({
        id: `event-class-${i}`,
        title: classTitles[i % classTitles.length],
        type: "class",
        date: classDate,
        endDate: new Date(classDate.getTime() + 2 * 60 * 60 * 1000),
        description: `حصة ${i + 1} • من ${formatTime(classDate)}`,
        courseId: mockCourses[i % mockCourses.length]?.id,
      })
    }

    for (let i = 0; i < 2; i++) {
      const meetingDate = new Date(thisYear, thisMonth, 10 + i * 14)
      events.push({
        id: `event-meeting-${i}`,
        title: meetingTitles[i % meetingTitles.length],
        type: "meeting",
        date: meetingDate,
        endDate: new Date(meetingDate.getTime() + 1.5 * 60 * 60 * 1000),
        description: `مدة الاجتماع: ساعة ونصف`,
      })
    }

    for (let i = 0; i < 3; i++) {
      const eventDate = new Date(thisYear, thisMonth, 15 + i * 5)
      events.push({
        id: `event-general-${i}`,
        title: eventTitles[i % eventTitles.length],
        type: "event",
        date: eventDate,
        description: `فعالية عامة رقم ${i + 1}`,
      })
    }

    return events
  }, [])

  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  const monthWeeks = useMemo(() => getMonthDays(currentYear, currentMonth), [currentYear, currentMonth])

  const weekDays = useMemo(() => getWeekDays(selectedDate), [selectedDate])

  const navigate = useCallback((direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const d = new Date(prev)
      if (viewMode === "month") {
        d.setMonth(d.getMonth() + (direction === "next" ? 1 : -1))
      } else if (viewMode === "week") {
        d.setDate(d.getDate() + (direction === "next" ? 7 : -7))
      } else {
        d.setDate(d.getDate() + (direction === "next" ? 1 : -1))
      }
      return d
    })
  }, [viewMode])

  const navigateToToday = useCallback(() => {
    const now = new Date()
    setCurrentDate(now)
    setSelectedDate(now)
  }, [])

  const handleDayClick = useCallback((date: Date) => {
    setSelectedDate(date)
    setCurrentDate(date)
    if (viewMode === "month") setViewMode("day")
  }, [viewMode])

  const handleEventClick = useCallback((e: React.MouseEvent, event: CalendarEvent) => {
    e.stopPropagation()
    setSelectedEvent((prev) => (prev?.id === event.id ? null : event))
  }, [])

  const closeEventPopover = useCallback(() => {
    setSelectedEvent(null)
  }, [])

  const monthLabel = currentDate.toLocaleDateString("ar-EG", { year: "numeric", month: "long" })

  const courseMap = useMemo(() => {
    const map = new Map<string, string>()
    mockCourses.forEach((c) => map.set(c.id, c.title))
    return map
  }, [])

  const sortedAgendaEvents = useMemo(() => {
    return [...allEvents].sort((a, b) => a.date.getTime() - b.date.getTime())
  }, [allEvents])

  const agendaGrouped = useMemo(() => {
    const groups: { date: Date; events: CalendarEvent[] }[] = []
    sortedAgendaEvents.forEach((event) => {
      const last = groups[groups.length - 1]
      if (last && isSameDay(last.date, event.date)) {
        last.events.push(event)
      } else {
        groups.push({ date: event.date, events: [event] })
      }
    })
    return groups
  }, [sortedAgendaEvents])

  const renderEventBadge = (event: CalendarEvent, compact = false) => {
    const config = EVENT_TYPE_CONFIG[event.type]
    const EventIcon = config.icon
    if (compact) {
      return (
        <div
          className={cn(
            "w-2 h-2 rounded-full cursor-pointer hover:scale-150 transition-transform",
            config.variant === "primary" && "bg-primary",
            config.variant === "warning" && "bg-amber-500",
            config.variant === "success" && "bg-emerald-500",
            config.variant === "info" && "bg-blue-500",
            config.variant === "neutral" && "bg-purple-500",
          )}
          onClick={(e) => handleEventClick(e, event)}
          title={event.title}
        />
      )
    }
    return (
      <button type="button"
        onClick={(e) => handleEventClick(e, event)}
        className={cn(
          "w-full text-right px-2 py-1 rounded-md text-xs font-medium transition-all hover:shadow-sm flex items-center gap-1.5 group",
          config.variant === "primary" && "bg-primary/10 text-primary hover:bg-primary/15",
          config.variant === "warning" && "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/30",
          config.variant === "success" && "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30",
          config.variant === "info" && "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30",
          config.variant === "neutral" && "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30",
          isPast(event.date) && "opacity-50",
        )}
      >
        <EventIcon className="w-3 h-3 shrink-0" />
        <span className="truncate">{event.title}</span>
        <span className="mr-auto opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-text-tertiary">
          {config.label}
        </span>
      </button>
    )
  }

  const renderPopover = () => {
    if (!selectedEvent) return null
    const config = EVENT_TYPE_CONFIG[selectedEvent.type]
    const EventIcon = config.icon
    return (
      <>
        <div className="fixed inset-0 z-40" onClick={closeEventPopover} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -4 }}
          className="absolute z-50 w-72 bg-surface border border-border rounded-xl shadow-xl p-4"
          style={{
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginTop: "4px",
          }}
        >
          <div className="flex items-start gap-3">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
              config.variant === "primary" && "bg-primary/10 text-primary",
              config.variant === "warning" && "bg-amber-100 text-amber-600",
              config.variant === "success" && "bg-emerald-100 text-emerald-600",
              config.variant === "info" && "bg-blue-100 text-blue-600",
              config.variant === "neutral" && "bg-purple-100 text-purple-600",
            )}>
              <EventIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-text text-sm">{selectedEvent.title}</h4>
              <Badge variant={config.variant} size="sm" className="mt-1">
                <EventIcon className="w-3 h-3" />
                {config.label}
              </Badge>
              <div className="mt-2 space-y-1 text-xs text-text-secondary">
                <div className="flex items-center gap-1.5">
                  <HiOutlineCalendar className="w-3.5 h-3.5" />
                  <span>{formatDate(selectedEvent.date)}</span>
                </div>
                {selectedEvent.endDate && (
                  <div className="flex items-center gap-1.5">
                    <HiOutlineCalendar className="w-3.5 h-3.5" />
                    <span>إلى {formatDate(selectedEvent.endDate)}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <HiOutlineClock className="w-3.5 h-3.5" />
                  <span>{formatTime(selectedEvent.date)}</span>
                </div>
              </div>
              <p className="mt-2 text-xs text-text-tertiary">{selectedEvent.description}</p>
              {selectedEvent.courseId && courseMap.has(selectedEvent.courseId) && (
                <p className="mt-1 text-xs text-text-tertiary">
                  <HiOutlineAcademicCap className="inline w-3 h-3 ml-1" />
                  {courseMap.get(selectedEvent.courseId)}
                </p>
              )}
              {getEventRoute(selectedEvent) && (
                <Link
                  href={getEventRoute(selectedEvent)!}
                  onClick={closeEventPopover}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  عرض التفاصيل
                  <HiOutlineChevronLeft className="w-3 h-3" />
                </Link>
              )}
            </div>
            <button type="button" onClick={closeEventPopover}
              className="text-text-tertiary hover:text-text p-1 -mt-1 -ml-1"
            >
              <HiOutlineChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </>
    )
  }

  const renderMonthView = () => (
    <div>
      <div className="grid grid-cols-7 gap-px bg-border rounded-t-xl overflow-hidden">
        {DAY_NAMES.map((name) => (
          <div key={name} className="bg-surface-secondary px-3 py-2 text-center text-xs font-semibold text-text-secondary">
            {name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-border rounded-b-xl overflow-hidden">
        {monthWeeks.map((week, wi) =>
          week.map((date, di) => {
            if (!date) return <div key={`empty-${wi}-${di}`} className="bg-surface min-h-[100px] p-1.5" />
            const dayEvents = getEventsForDay(allEvents, date)
            const today = isToday(date)
            const past = isPast(date)
            return (
              <div
                key={date.toISOString()}
                onClick={() => handleDayClick(date)}
                className={cn(
                  "bg-surface min-h-[100px] p-1.5 cursor-pointer hover:bg-surface-secondary/50 transition-colors relative",
                  past && "opacity-60",
                )}
              >
                <div className="flex items-center justify-center mb-1">
                  <span
                    className={cn(
                      "inline-flex items-center justify-center w-7 h-7 text-xs font-medium rounded-full",
                      today && "bg-primary text-white",
                      !today && "text-text-secondary",
                    )}
                  >
                    {date.getDate()}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div key={event.id} className="relative">
                      {renderEventBadge(event, true)}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <span className="text-[10px] text-text-tertiary">+{dayEvents.length - 3}</span>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )

  const renderWeekView = () => (
    <div className="grid grid-cols-7 gap-px bg-border rounded-xl overflow-hidden">
      {weekDays.map((day) => {
        const dayEvents = getEventsForDay(allEvents, day)
        const today = isToday(day)
        const past = isPast(day)
        return (
          <div
            key={day.toISOString()}
            onClick={() => handleDayClick(day)}
            className={cn(
              "bg-surface min-h-[200px] p-2 cursor-pointer hover:bg-surface-secondary/50 transition-colors",
              past && "opacity-60",
            )}
          >
            <div className={cn(
              "text-center mb-2 pb-2 border-b border-border",
              today && "text-primary font-bold",
            )}>
              <div className="text-xs text-text-secondary">{DAY_NAMES[day.getDay()]}</div>
              <div className={cn(
                "inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-full mt-1",
                today && "bg-primary text-white",
              )}>
                {day.getDate()}
              </div>
            </div>
            <div className="space-y-1">
              {dayEvents.map((event) => (
                <div key={event.id} className="relative">
                  {renderEventBadge(event, false)}
                </div>
              ))}
              {dayEvents.length === 0 && (
                <p className="text-[10px] text-text-tertiary text-center mt-4">لا توجد أحداث</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )

  const renderDayView = () => {
    const dayEvents = getEventsForDay(allEvents, selectedDate)
    const today = isToday(selectedDate)
    const past = isPast(selectedDate)
    return (
      <div className={cn(past && "opacity-60")}>
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={cn("text-lg font-bold", today && "text-primary")}>
                  {DAY_NAMES[selectedDate.getDay()]}
                </h3>
                <p className="text-sm text-text-secondary">{formatDate(selectedDate)}</p>
              </div>
              {today && (
                <Badge variant="primary" dot>
                  اليوم
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
        {dayEvents.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <HiOutlineCalendar className="w-12 h-12 mx-auto text-text-tertiary mb-3" />
              <p className="text-text-secondary font-medium">لا توجد أحداث في هذا اليوم</p>
              <p className="text-sm text-text-tertiary mt-1">قم بإضافة أحداث جديدة للظهور هنا</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {dayEvents
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map((event) => {
                const config = EVENT_TYPE_CONFIG[event.type]
                const EventIcon = config.icon
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                  >
                    <div onClick={() => {
                      const route = getEventRoute(event)
                      if (route) router.push(route)
                    }}>
                      <Card hover className="p-4 cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                            config.variant === "primary" && "bg-primary/10 text-primary",
                            config.variant === "warning" && "bg-amber-100 text-amber-600",
                            config.variant === "success" && "bg-emerald-100 text-emerald-600",
                            config.variant === "info" && "bg-blue-100 text-blue-600",
                            config.variant === "neutral" && "bg-purple-100 text-purple-600",
                          )}>
                            <EventIcon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-semibold text-text text-sm">{event.title}</h4>
                              <Badge variant={config.variant} size="sm">
                                <EventIcon className="w-3 h-3" />
                                {config.label}
                              </Badge>
                            </div>
                            <div className="mt-2 flex items-center gap-3 text-xs text-text-secondary flex-wrap">
                              <span className="flex items-center gap-1">
                                <HiOutlineClock className="w-3.5 h-3.5" />
                                {formatTime(event.date)}
                              </span>
                              {event.endDate && (
                                <span className="flex items-center gap-1">
                                  <HiOutlineCalendar className="w-3.5 h-3.5" />
                                  حتى {formatTime(event.endDate)}
                                </span>
                              )}
                            </div>
                            <p className="mt-1.5 text-xs text-text-tertiary">{event.description}</p>
                            {event.courseId && courseMap.has(event.courseId) && (
                              <p className="mt-1 text-xs text-text-tertiary">
                                <HiOutlineAcademicCap className="inline w-3 h-3 ml-1" />
                                {courseMap.get(event.courseId)}
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </motion.div>
                )
              })}
          </div>
        )}
      </div>
    )
  }

  const renderAgendaView = () => (
    <div className="space-y-6">
      {agendaGrouped.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <HiOutlineCalendar className="w-12 h-12 mx-auto text-text-tertiary mb-3" />
            <p className="text-text-secondary font-medium">لا توجد أحداث مجدولة</p>
          </CardContent>
        </Card>
      ) : (
        agendaGrouped.map((group, gi) => {
          const today = isToday(group.date)
          const past = isPast(group.date)
          return (
            <motion.div
              key={group.date.toISOString()}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.03 }}
            >
              <div className={cn(
                "flex items-center gap-3 mb-3 sticky top-0 bg-surface z-10 py-2",
                past && "opacity-60",
              )}>
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold",
                  today ? "bg-primary text-white" : "bg-surface-secondary text-text",
                )}>
                  {group.date.getDate()}
                </div>
                <div>
                  <p className={cn("text-sm font-semibold", today && "text-primary")}>
                    {DAY_NAMES[group.date.getDay()]}
                  </p>
                  <p className="text-xs text-text-secondary">{formatDate(group.date)}</p>
                </div>
                {today && <Badge variant="primary" size="sm" dot>اليوم</Badge>}
              </div>
              <div className="space-y-2 mr-13">
                {group.events.map((event) => {
                  const config = EVENT_TYPE_CONFIG[event.type]
                  const EventIcon = config.icon
                  return (
                    <div key={event.id} className="relative">
                      <div onClick={() => {
                        const route = getEventRoute(event)
                        if (route) router.push(route)
                      }}>
                        <Card hover className="p-3 cursor-pointer">
                          <div className="flex items-center gap-3" onClick={(e) => handleEventClick(e, event)}>
                            <Badge variant={config.variant} size="sm" className="shrink-0">
                              <EventIcon className="w-3 h-3" />
                              {config.label}
                            </Badge>
                            <span className="text-sm font-medium text-text">{event.title}</span>
                            <span className="text-xs text-text-tertiary mr-auto">
                              {formatTime(event.date)}
                            </span>
                          </div>
                          <p className="text-xs text-text-tertiary mt-1 mr-12">{event.description}</p>
                        </Card>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )
        })
      )}
    </div>
  )

  const renderView = () => {
    switch (viewMode) {
      case "month":
        return renderMonthView()
      case "week":
        return renderWeekView()
      case "day":
        return renderDayView()
      case "agenda":
        return renderAgendaView()
    }
  }

  const selectedDayEvents = getEventsForDay(allEvents, selectedDate)

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="التقويم الدراسي" subtitle="إدارة ومتابعة الأحداث والمواعيد" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-surface-secondary rounded-xl p-1">
          {viewModeOptions.map((opt) => {
            const Icon = opt.icon
            return (
              <button type="button"
                key={opt.id}
                onClick={() => setViewMode(opt.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                  viewMode === opt.id
                    ? "bg-surface text-text shadow-sm"
                    : "text-text-secondary hover:text-text",
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{opt.label}</span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={navigateToToday}>
            اليوم
          </Button>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="xs" onClick={() => navigate("next")}>
              <HiOutlineChevronRight className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="xs" onClick={() => navigate("prev")}>
              <HiOutlineChevronLeft className="w-4 h-4" />
            </Button>
          </div>
          <h2 className="text-lg font-bold text-text min-w-[160px] text-center">
            {viewMode === "day" ? formatDate(selectedDate) : monthLabel}
          </h2>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode + currentDate.toISOString()}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          {renderView()}
          <AnimatePresence>
            {selectedEvent && renderPopover()}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {viewMode !== "day" && selectedDayEvents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              أحداث يوم {formatDate(selectedDate)}
            </CardTitle>
            <Badge variant="primary">{selectedDayEvents.length} أحداث</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {selectedDayEvents.map((event) => {
                const config = EVENT_TYPE_CONFIG[event.type]
                const EventIcon = config.icon
                return (
                  <div
                    key={event.id}
                    onClick={() => {
                      const route = getEventRoute(event)
                      if (route) router.push(route)
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-secondary transition-colors cursor-pointer"
                  >
                    <div className={cn(
                      "w-2 h-2 rounded-full shrink-0",
                      config.variant === "primary" && "bg-primary",
                      config.variant === "warning" && "bg-amber-500",
                      config.variant === "success" && "bg-emerald-500",
                      config.variant === "info" && "bg-blue-500",
                      config.variant === "neutral" && "bg-purple-500",
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text">{event.title}</p>
                      <p className="text-xs text-text-tertiary">{event.description}</p>
                    </div>
                    <Badge variant={config.variant} size="sm">
                      <EventIcon className="w-3 h-3" />
                      {config.label}
                    </Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

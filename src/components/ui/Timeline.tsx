import { cn } from "@/lib/utils"

interface TimelineProps {
  children: React.ReactNode
  className?: string
}

export function Timeline({ children, className }: TimelineProps) {
  return <div className={cn("space-y-0", className)}>{children}</div>
}

interface TimelineItemProps {
  children: React.ReactNode
  title?: string
  time?: string
  active?: boolean
  className?: string
}

export function TimelineItem({ children, title, time, active, className }: TimelineItemProps) {
  return (
    <div className={cn("relative flex gap-4 pb-6 last:pb-0", className)}>
      <div className="flex flex-col items-center">
        <div className={cn(
          "w-2.5 h-2.5 rounded-full border-2 shrink-0 mt-1.5",
          active ? "bg-primary border-primary" : "bg-card border-border",
        )} />
        <div className="w-px flex-1 bg-border mt-1" />
      </div>
      <div className="flex-1 min-w-0">
        {title && <h4 className="text-sm font-semibold text-text">{title}</h4>}
        {time && <p className="text-xs text-text-tertiary mt-0.5">{time}</p>}
        <div className="mt-1 text-sm text-text-secondary">{children}</div>
      </div>
    </div>
  )
}

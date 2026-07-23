import { cn } from "@/lib/utils"

interface TabsProps {
  children: React.ReactNode
  className?: string
}

export function Tabs({ children, className }: TabsProps) {
  return <div className={cn(className)}>{children}</div>
}

interface TabsListProps {
  children: React.ReactNode
  className?: string
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div className={cn(
      "flex items-center gap-0.5 bg-card/50 border border-border rounded-[14px] p-1 w-fit",
      className,
    )}>
      {children}
    </div>
  )
}

interface TabsTabProps {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
  className?: string
}

export function TabsTab({ children, active, onClick, className }: TabsTabProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-[10px] transition-all duration-200",
        active
          ? "bg-primary text-white shadow-sm"
          : "text-text-secondary hover:text-text",
        className,
      )}
    >
      {children}
    </button>
  )
}

interface TabsPanelProps {
  children: React.ReactNode
  active?: boolean
  className?: string
}

export function TabsPanel({ children, active, className }: TabsPanelProps) {
  if (!active) return null
  return <div className={cn("mt-4", className)}>{children}</div>
}

export const TabPanel = TabsPanel

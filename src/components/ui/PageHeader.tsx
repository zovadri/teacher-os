import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
  gradient?: boolean
}

export function PageHeader({ title, description, children, className, gradient = false }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6", className)}>
      <div>
        <h1 className={cn(
          "text-2xl font-bold",
          gradient ? "bg-gradient-to-l from-primary to-info bg-clip-text text-transparent" : "text-text",
        )}>
          {title}
        </h1>
        {description && <p className="text-sm text-text-secondary mt-1">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-3 shrink-0">{children}</div>}
    </div>
  )
}

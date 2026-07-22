import { cn } from "@/lib/utils"
import { HiChevronRight } from "react-icons/hi"
import Link from "next/link"

interface PageHeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
  breadcrumbs?: { label: string; href?: string }[]
  className?: string
}

export function PageHeader({ title, description, actions, breadcrumbs, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 text-sm mb-3">
          {breadcrumbs.map((item, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <HiChevronRight className="w-3.5 h-3.5 text-text-tertiary" />}
              {item.href ? (
                <Link href={item.href} className="text-text-tertiary hover:text-text transition-colors">{item.label}</Link>
              ) : (
                <span className="text-text-secondary font-medium">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[32px] sm:text-[40px] font-bold text-text leading-tight">{title}</h1>
          {description && <p className="text-sm text-text-secondary mt-1.5">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
      </div>
    </div>
  )
}

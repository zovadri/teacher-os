import { cn } from "@/lib/utils"
import { HiChevronLeft } from "react-icons/hi"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center gap-1.5 text-sm text-text-secondary", className)}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <HiChevronLeft className="w-3.5 h-3.5 text-text-tertiary" />}
          {item.href ? (
            <a href={item.href} className="hover:text-text transition-colors">{item.label}</a>
          ) : (
            <span className="text-text">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

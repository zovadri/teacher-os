import { cn } from "@/lib/utils"
import { HiChevronLeft } from "react-icons/hi"
import Link from "next/link"

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
    <nav className={cn("flex items-center gap-1.5 text-sm", className)}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <HiChevronLeft className="w-3.5 h-3.5 text-text-tertiary" />}
          {item.href ? (
            <Link href={item.href} className="text-text-tertiary hover:text-text transition-colors">{item.label}</Link>
          ) : (
            <span className="text-text-secondary font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

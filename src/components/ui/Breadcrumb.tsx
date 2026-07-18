import Link from "next/link"
import { cn } from "@/lib/utils"
import { HiChevronLeft } from "react-icons/hi"

interface Crumb {
  label: string
  href?: string
}

export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav className={cn("flex items-center gap-1.5 text-sm text-text-tertiary", className)}>
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-1.5">
          {idx > 0 && <HiChevronLeft className="w-3.5 h-3.5" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-text font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

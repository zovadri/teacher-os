"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { HiChevronLeft } from "react-icons/hi"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
  breadcrumbs?: BreadcrumbItem[]
  className?: string
}

export function PageHeader({ title, description, actions, breadcrumbs, className }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("mb-6", className)}
    >
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <nav className="flex items-center gap-1 text-xs text-text-tertiery mb-2">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 ? <HiChevronLeft className="w-3 h-3" /> : null}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-primary transition-colors">{crumb.label}</Link>
              ) : (
                <span className="text-text-secondary">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      ) : null}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </motion.div>
  )
}

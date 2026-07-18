"use client"

import { forwardRef, SelectHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { HiChevronDown } from "react-icons/hi"

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, ...props }, ref) => {
    const selectId = id || label?.replace(/\s/g, "-").toLowerCase()
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-text">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text appearance-none transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error && "border-error focus:ring-error/30",
              className
            )}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <HiChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none w-4 h-4" />
        </div>
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    )
  }
)

Select.displayName = "Select"
export default Select

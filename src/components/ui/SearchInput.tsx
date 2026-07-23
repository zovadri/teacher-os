"use client"

import { forwardRef, useState } from "react"
import { cn } from "@/lib/utils"
import { HiSearch, HiX } from "react-icons/hi"

interface SearchInputProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value: controlledValue, onChange, placeholder = "بحث...", className }, ref) => {
    const [internalValue, setInternalValue] = useState("")
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue

    const handleChange = (v: string) => {
      if (!isControlled) setInternalValue(v)
      onChange?.(v)
    }

    return (
      <div className={cn("relative", className)}>
        <HiSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
        <input
          ref={ref}
          value={value}
          onChange={e => handleChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-card/70 backdrop-blur-sm border border-border rounded-[14px] pr-10 pl-9 py-2.5 text-sm text-text placeholder-text-tertiary/50 focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30 transition-all duration-200"
        />
        {value && (
          <button onClick={() => handleChange("")} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text transition-colors">
            <HiX className="w-4 h-4" />
          </button>
        )}
      </div>
    )
  },
)

SearchInput.displayName = "SearchInput"
export default SearchInput
export { SearchInput }

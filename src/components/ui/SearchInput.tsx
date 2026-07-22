"use client"

import { cn } from "@/lib/utils"
import { HiSearch } from "react-icons/hi"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  onKeyDown?: (e: React.KeyboardEvent) => void
}

export function SearchInput({ value, onChange, placeholder = "بحث...", className, onKeyDown }: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <HiSearch className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={cn(
          "w-full bg-card/60 backdrop-blur border border-border rounded-[16px] pr-10 pl-4 py-2.5 text-sm text-text placeholder-text-tertiary/50",
          "shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)]",
          "transition-all duration-250",
          "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40",
          "hover:border-border-light",
        )}
      />
    </div>
  )
}

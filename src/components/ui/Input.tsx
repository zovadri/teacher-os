"use client"

import { forwardRef, InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || label?.replace(/\s/g, "-").toLowerCase()
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-text">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary">{leftIcon}</div>}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full bg-card border border-border rounded-[16px] px-3.5 py-2.5 text-sm text-text placeholder:text-text-tertiary transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)]",
              "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-card",
              error && "border-error focus:ring-error/30 focus:border-error",
              leftIcon && "pr-10",
              rightIcon && "pl-10",
              className
            )}
            {...props}
          />
          {rightIcon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">{rightIcon}</div>}
        </div>
        {error && <p className="text-xs text-error">{error}</p>}
        {helperText && !error && <p className="text-xs text-text-tertiary">{helperText}</p>}
      </div>
    )
  }
)

Input.displayName = "Input"
export default Input

"use client"

import { forwardRef, ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success" | "link"
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const variants: Record<string, string> = {
  primary: "bg-primary text-white shadow-[0_0_20px_rgba(91,124,255,0.15)] hover:shadow-[0_0_30px_rgba(91,124,255,0.3)] hover:brightness-110",
  secondary: "bg-transparent text-text-secondary border border-border hover:bg-surface-tertiary hover:text-text",
  outline: "border border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/40",
  ghost: "text-text-secondary hover:text-text",
  danger: "bg-error/10 text-error border border-error/20 hover:bg-error/20",
  success: "bg-success/10 text-success border border-success/20 hover:bg-success/20",
  link: "text-primary hover:text-primary-light underline-offset-4 hover:underline",
}

const sizes: Record<string, string> = {
  xs: "px-2.5 py-1 text-xs rounded-[12px]",
  sm: "px-3 py-1.5 text-sm rounded-[14px]",
  md: "px-6 py-3 text-sm rounded-[16px]",
  lg: "px-8 py-3.5 text-base rounded-[18px]",
  xl: "px-10 py-4 text-base rounded-[20px]",
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, leftIcon, rightIcon, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-primary/40",
          "disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    )
  }
)

Button.displayName = "Button"
export default Button

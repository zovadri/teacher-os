"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "./Spinner"

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "success"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary/20 backdrop-blur-xl border border-primary/30 text-primary hover:bg-primary/30 hover:border-primary/50 shadow-[0_0_20px_rgba(91,124,255,0.15)]",
  secondary:
    "bg-card/60 backdrop-blur-xl border border-border text-text-secondary hover:text-text hover:border-border-light hover:bg-card/80",
  ghost:
    "bg-transparent text-text-secondary hover:text-text hover:bg-card/40",
  danger:
    "bg-error/10 backdrop-blur-xl border border-error/20 text-error hover:bg-error/20 hover:border-error/40",
  success:
    "bg-success/10 backdrop-blur-xl border border-success/20 text-success hover:bg-success/20 hover:border-success/40",
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-xs rounded-[14px]",
  md: "px-5 py-2.5 text-sm rounded-[16px]",
  lg: "px-7 py-3.5 text-base rounded-[18px]",
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", isLoading, leftIcon, rightIcon, className, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-250 select-none backdrop-blur-xl",
          "hover:-translate-y-0.5 active:translate-y-0",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {isLoading ? <Spinner size="sm" /> : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    )
  },
)

Button.displayName = "Button"
export default Button

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
    "bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary shadow-[0_2px_12px_rgba(79,70,229,0.2)] hover:shadow-[0_4px_20px_rgba(79,70,229,0.3)] active:from-primary-dark active:to-primary-dark active:scale-[0.97]",
  secondary:
    "bg-card/50 backdrop-blur-2xl border border-border text-text-secondary hover:text-text hover:border-primary/20 hover:bg-card/80 hover:shadow-[0_4px_16px_rgba(79,70,229,0.03)] active:scale-[0.97]",
  ghost:
    "bg-transparent text-text-secondary hover:text-text hover:bg-card/50 active:scale-[0.97]",
  danger:
    "bg-error/10 text-error hover:bg-error/20 border border-transparent hover:border-error/20 active:scale-[0.97]",
  success:
    "bg-success/10 text-success hover:bg-success/20 border border-transparent hover:border-success/20 active:scale-[0.97]",
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-[12px]",
  md: "px-5 py-2.5 text-sm rounded-[14px]",
  lg: "px-7 py-3.5 text-base rounded-[16px]",
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", isLoading, leftIcon, rightIcon, className, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none backdrop-blur-xl",
          "hover:-translate-y-0.5 active:translate-y-0",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100",
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

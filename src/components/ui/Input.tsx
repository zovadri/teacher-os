import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-text-secondary">{label}</label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full bg-card/60 backdrop-blur border border-border rounded-[16px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50",
              "shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)]",
              "transition-all duration-250",
              "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40",
              "hover:border-border-light",
              error && "border-error/50 focus:ring-error/20 focus:border-error/60",
              leftIcon && "pr-10",
              rightIcon && "pl-10",
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-error pr-1">{error}</p>}
      </div>
    )
  },
)

Input.displayName = "Input"
export default Input

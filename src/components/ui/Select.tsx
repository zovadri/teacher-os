import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { HiChevronDown } from "react-icons/hi"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-text-secondary">{label}</label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full bg-card/60 backdrop-blur-xl border border-border rounded-[14px] px-4 py-2.5 text-sm text-text appearance-none",
              "shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.02)]",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30",
              "hover:border-border-light",
              error && "border-error/40 focus:ring-error/15 focus:border-error/50",
              className,
            )}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <HiChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
        </div>
        {error && <p className="text-xs text-error pr-1">{error}</p>}
      </div>
    )
  },
)

Select.displayName = "Select"
export default Select

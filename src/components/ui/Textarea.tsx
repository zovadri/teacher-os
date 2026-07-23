import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-text-secondary">{label}</label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full bg-card border border-border rounded-[14px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50 min-h-[100px] resize-y",
            
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30",
            "hover:border-border-light",
            error && "border-error/40 focus:ring-error/15 focus:border-error/50",
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-error pr-1">{error}</p>}
      </div>
    )
  },
)

Textarea.displayName = "Textarea"
export default Textarea

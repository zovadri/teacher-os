import { cn } from "@/lib/utils"

type BadgeVariant = "primary" | "success" | "warning" | "error" | "info" | "neutral" | "premium"

const variants: Record<BadgeVariant, string> = {
  primary: "bg-[#6366F1]/10 text-[#818CF8]",
  success: "bg-[#22C55E]/10 text-[#22C55E]",
  warning: "bg-[#F59E0B]/10 text-[#F59E0B]",
  error: "bg-[#EF4444]/10 text-[#EF4444]",
  info: "bg-[#3B82F6]/10 text-[#3B82F6]",
  neutral: "bg-white/[0.03] text-[#94A3B8]",
  premium: "bg-[#F59E0B]/10 text-[#F59E0B]",
}

interface BadgeProps {
  children?: React.ReactNode
  variant?: BadgeVariant
  size?: "sm" | "md" | "lg"
  className?: string
  dot?: boolean
}

export function Badge({ children, variant = "neutral", size = "sm", className, dot }: BadgeProps) {
  const sizeClasses = { sm: "px-2 py-0.5 text-xs", md: "px-2.5 py-1 text-sm", lg: "px-3 py-1.5 text-sm" }
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-medium rounded-full", variants[variant], sizeClasses[size], className)}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}

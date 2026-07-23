import { cn } from "@/lib/utils"

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export function Card({ children, className, hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group bg-card/70 backdrop-blur-2xl border border-border rounded-[20px]",
        "shadow-[0_4px_24px_rgba(79,70,229,0.025),0_1px_0_rgba(255,255,255,0.9)_inset]",
        "transition-all duration-500 relative",
        "before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-primary/15 before:to-transparent before:rounded-t-[20px] before:pointer-events-none",
        hover && "cursor-pointer hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_12px_48px_rgba(79,70,229,0.05),0_1px_0_rgba(255,255,255,0.9)_inset]",
        onClick && "cursor-pointer",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("px-6 pt-6 pb-3", className)}>{children}</div>
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("text-lg font-semibold text-text", className)}>{children}</h3>
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-sm text-text-secondary mt-1", className)}>{children}</p>
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("px-6 pb-6", className)}>{children}</div>
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("px-6 py-4 border-t border-border", className)}>{children}</div>
}

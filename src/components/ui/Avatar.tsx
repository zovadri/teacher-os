import { cn } from "@/lib/utils"

interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeStyles = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
}

export function Avatar({ src, alt = "", name, size = "md", className }: AvatarProps) {
  const initials = name ? name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "?"

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn("rounded-full object-cover border border-border", sizeStyles[size], className)}
      />
    )
  }

  return (
    <div className={cn(
      "rounded-full bg-primary-100 text-primary flex items-center justify-center font-medium border border-primary-200",
      sizeStyles[size],
      className,
    )}>
      {initials}
    </div>
  )
}

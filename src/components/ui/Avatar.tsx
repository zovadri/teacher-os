import { cn } from "@/lib/utils"

interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const sizes = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-lg",
  xl: "w-20 h-20 text-2xl",
}

export function Avatar({ src, alt, name, size = "md", className }: AvatarProps) {
  const initials = name
    ? name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()
    : "?"

  return (
    <div className={cn(
      "relative rounded-full overflow-hidden shrink-0 flex items-center justify-center font-medium",
      "bg-primary/10 border border-border text-text",
      sizes[size],
      className,
    )}>
      {src ? (
        <img src={src} alt={alt || name || ""} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}

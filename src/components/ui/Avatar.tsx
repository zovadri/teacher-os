import { cn, getInitials } from "@/lib/utils"
import Image from "next/image"

interface AvatarProps {
  src?: string
  name: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  status?: "online" | "offline" | "busy"
}

const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-12 h-12 text-base", xl: "w-16 h-16 text-lg" }
const dotSizes = { sm: "w-2 h-2", md: "w-2.5 h-2.5", lg: "w-3 h-3", xl: "w-3.5 h-3.5" }
const statusColors = { online: "bg-success", offline: "bg-text-tertiary", busy: "bg-warning" }

export function Avatar({ src, name, size = "md", className, status }: AvatarProps) {
  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      {src ? (
        <Image src={src} alt={name} width={64} height={64} className={cn("rounded-full object-cover", sizes[size])} />
      ) : (
        <div className={cn("rounded-full bg-primary-100 text-primary-700 font-semibold flex items-center justify-center", sizes[size])}>
          {getInitials(name)}
        </div>
      )}
      {status && (
        <span className={cn(
          "absolute bottom-0 left-0 rounded-full ring-2 ring-surface",
          dotSizes[size],
          statusColors[status]
        )} />
      )}
    </div>
  )
}

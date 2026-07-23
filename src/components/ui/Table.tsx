import { cn } from "@/lib/utils"

interface TableProps {
  children: React.ReactNode
  className?: string
}

export function Table({ children, className }: TableProps) {
  return (
    <div className={cn("w-full overflow-auto", className)}>
      <table className="w-full border-collapse">{children}</table>
    </div>
  )
}

export function TableHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <thead className={cn("border-b border-border", className)}>{children}</thead>
}

export function TableBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <tbody className={cn("divide-y divide-border", className)}>{children}</tbody>
}

export function TableRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <tr className={cn("transition-colors hover:bg-card/50", className)}>{children}</tr>
}

export function TableHead({ children, className }: { children: React.ReactNode; className?: string }) {
  return <th className={cn("px-4 py-3 text-right text-sm font-medium text-text-secondary", className)}>{children}</th>
}

export function TableCell({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={cn("px-4 py-3 text-sm text-text", className)}>{children}</td>
}

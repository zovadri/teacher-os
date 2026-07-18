import DashboardSidebar from "@/components/layout/DashboardSidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface-secondary">
      <DashboardSidebar />
      <div className="flex-1 lg:mr-64 min-w-0">
        {children}
      </div>
    </div>
  )
}

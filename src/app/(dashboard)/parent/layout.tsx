"use client"

import RouteGuard from "@/components/auth/RouteGuard"

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return <RouteGuard allowedRole="parent">{children}</RouteGuard>
}

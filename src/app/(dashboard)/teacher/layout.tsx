"use client"

import RouteGuard from "@/components/auth/RouteGuard"

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return <RouteGuard allowedRole="teacher">{children}</RouteGuard>
}

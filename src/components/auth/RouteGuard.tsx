"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/auth"
import { Spinner } from "@/components/ui/Spinner"

interface RouteGuardProps {
  children: React.ReactNode
  allowedRole: "teacher" | "student" | "parent" | "staff"
}

export default function RouteGuard({ children, allowedRole }: RouteGuardProps) {
  const router = useRouter()
  const { user, isAuthenticated, sessionExpiresAt, logout } = useAuthStore()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.replace("/login")
      return
    }
    if (sessionExpiresAt && new Date(sessionExpiresAt) < new Date()) {
      logout()
      router.replace("/login?expired=true")
      return
    }
    if (user.role !== allowedRole) {
      router.replace("/403")
      return
    }
    setChecking(false)
  }, [isAuthenticated, user, sessionExpiresAt, allowedRole, router, logout])

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <Spinner size="lg" />
          <p className="text-text-secondary text-sm">جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

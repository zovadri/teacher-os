"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  HiPhone,
  HiLockClosed,
  HiEye,
  HiEyeOff,
  HiAcademicCap,
  HiShieldCheck,
  HiArrowLeft,
} from "react-icons/hi"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { useAuthStore } from "@/lib/auth"

const roleRoutes: Record<string, string> = {
  teacher: "/teacher",
  student: "/student",
  parent: "/parent",
  staff: "/staff",
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const login = useAuthStore((s) => s.login)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [sessionExpired, setSessionExpired] = useState(false)

  useEffect(() => {
    if (searchParams?.get("expired") === "true") {
      setSessionExpired(true)
    }
  }, [searchParams])

  useEffect(() => {
    if (isAuthenticated) {
      const user = useAuthStore.getState().user
      if (user) router.replace(roleRoutes[user.role] || "/teacher")
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    try {
      const success = await login(phone, password)
      if (success) {
        const user = useAuthStore.getState().user
        router.replace(user ? roleRoutes[user.role] : "/teacher")
      } else {
        setError("رقم الهاتف أو كلمة المرور غير صحيحة")
      }
    } catch {
      setError("حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-surface-secondary">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.08),transparent_60%)] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.04),transparent_60%)] animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-info/4 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.02),transparent_70%)]" />
      </div>

      <div className="w-full max-w-sm relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 18, delay: 0.1 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary-dark text-white mb-6 shadow-[0_0_40px_rgba(217,119,6,0.15)]"
          >
            <HiAcademicCap className="w-10 h-10" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-[28px] font-bold text-text"
          >
            تسجيل الدخول
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-text-secondary mt-2 text-sm"
          >
            أدخل رقم الهاتف وكلمة المرور
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="bg-card border border-border rounded-[24px] p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {sessionExpired && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-[24px] bg-warning/10 border border-warning/20 text-sm text-warning">
                انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.
              </motion.div>
            )}
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-[24px] bg-error/10 border border-error/20 text-sm text-error">
                {error}
              </motion.div>
            )}
            <Input
              label="رقم الهاتف"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="أدخل رقم هاتفك"
              leftIcon={<HiPhone className="w-5 h-5" />}
              required
              dir="auto"
            />

            <div className="relative">
              <Input
                label="كلمة المرور"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                leftIcon={<HiLockClosed className="w-5 h-5" />}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-[38px] text-text-tertiary hover:text-text-secondary transition-colors p-0.5 rounded-lg hover:bg-card"
                tabIndex={-1}
              >
                {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
              </button>
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full" size="lg">
              {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/demo"
              className="inline-flex items-center gap-1.5 text-sm text-text-tertiary hover:text-primary transition-colors font-medium"
            >
              <HiShieldCheck className="w-4 h-4" />
              بيانات تجربة
            </Link>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8 text-xs text-text-tertiary"
        >
          &copy; {new Date().getFullYear()} TeacherOS
        </motion.p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-surface-secondary">
        <div className="space-y-4 w-full max-w-sm">
          <div className="animate-pulse space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-card mx-auto" />
            <div className="h-8 w-48 bg-card rounded-[16px] mx-auto" />
            <div className="h-4 w-64 bg-card rounded-[16px] mx-auto" />
          </div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}

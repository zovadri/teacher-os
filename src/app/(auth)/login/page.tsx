"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  HiMail,
  HiLockClosed,
  HiEye,
  HiEyeOff,
  HiAcademicCap,
  HiShieldCheck,
} from "react-icons/hi"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { Card, CardContent } from "@/components/ui/Card"
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

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
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
      const success = await login(email, password)
      if (success) {
        const user = useAuthStore.getState().user
        router.replace(user ? roleRoutes[user.role] : "/teacher")
      } else {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة")
      }
    } catch {
      setError("حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090B] px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary text-white mb-4"
          >
            <HiAcademicCap className="w-6 h-6" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-semibold text-text"
          >
            تسجيل الدخول
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-text-secondary mt-1 text-sm"
          >
            أدخل بيانات حسابك للوصول إلى لوحة التحكم
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-8">
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-5">
                {sessionExpired && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-400">
                    انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.
                  </div>
                )}
                {error && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                    {error}
                  </div>
                )}
                <Input
                  label="البريد الإلكتروني"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني"
                  leftIcon={<HiMail className="w-5 h-5" />}
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
                    className="absolute left-3 top-[38px] text-text-tertiary hover:text-text-secondary transition-colors p-0.5 rounded-lg hover:bg-surface-tertiary"
                    tabIndex={-1}
                  >
                    {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer select-none group">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 cursor-pointer bg-surface"
                    />
                    <span className="text-sm text-text-secondary group-hover:text-text transition-colors">تذكرني</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:text-primary-light transition-colors font-medium"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </div>

                <Button type="submit" isLoading={isLoading} className="w-full" size="lg">
                  {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-surface px-4 text-sm text-text-tertiary">أو الدخول عبر</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm text-text-secondary hover:bg-surface-tertiary hover:text-text transition-colors group">
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span>Google</span>
                </button>
                <button type="button" className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm text-text-secondary hover:bg-surface-tertiary hover:text-text transition-colors group">
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </button>
              </div>

              <div className="mt-6 text-center space-y-3">
                <p className="text-sm text-text-secondary">
                  ليس لديك حساب؟{" "}
                  <Link href="/register" className="text-primary hover:text-primary-light font-semibold transition-colors">
                    سجل الآن
                  </Link>
                </p>
                <div className="h-px bg-border w-12 mx-auto" />
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-1.5 text-sm text-text-tertiary hover:text-primary transition-colors font-medium"
                >
                  <HiShieldCheck className="w-4 h-4" />
                  بيانات تجربة
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
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
      <div className="min-h-screen flex items-center justify-center bg-[#09090B]">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}

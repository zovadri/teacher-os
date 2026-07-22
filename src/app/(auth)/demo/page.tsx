"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  HiAcademicCap,
  HiBookOpen,
  HiUserGroup,
  HiUserCircle,
  HiClipboardCopy,
  HiShieldCheck,
  HiArrowLeft,
  HiCheckCircle,
  HiArrowSmRight,
} from "react-icons/hi"
import { Card, CardContent } from "@/components/ui/Card"
import { Alert } from "@/components/ui/Alert"
import { Badge } from "@/components/ui/Badge"
import { useAuthStore } from "@/lib/auth"

const demoAccounts = [
  {
    id: "teacher",
    name: "مدرس",
    icon: HiAcademicCap,
    email: "ahmed@teacher-os.com",
    password: "123456",
    role: "teacher" as const,
    description: "حساب تجريبي للمدرس مع صلاحية الوصول الكامل للوحة التحكم وإدارة الكورسات والطلاب والامتحانات.",
  },
  {
    id: "student",
    name: "طالب",
    icon: HiBookOpen,
    email: "student@teacher-os.com",
    password: "123456",
    role: "student" as const,
    description: "حساب تجريبي للطالب لمشاهدة الكورسات المسجلة وأداء الامتحانات والواجبات.",
  },
  {
    id: "parent",
    name: "ولي أمر",
    icon: HiUserGroup,
    email: "parent@teacher-os.com",
    password: "123456",
    role: "parent" as const,
    description: "حساب تجريبي لولي الأمر لمتابعة أداء الأبناء الدراسي والتقارير.",
  },
  {
    id: "staff",
    name: "موظف",
    icon: HiUserCircle,
    email: "staff@teacher-os.com",
    password: "123456",
    role: "staff" as const,
    description: "حساب تجريبي لأعضاء فريق العمل مع صلاحيات إدارة محددة.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const roleRoutes: Record<string, string> = {
  teacher: "/teacher",
  student: "/student",
  parent: "/parent",
  staff: "/staff",
}

export default function DemoPage() {
  const router = useRouter()
  const loginAs = useAuthStore((s) => s.loginAs)
  const [copied, setCopied] = useState<string | null>(null)
  const [loggingIn, setLoggingIn] = useState<string | null>(null)

  const handleCopy = async (email: string, password: string, id: string) => {
    try {
      await navigator.clipboard.writeText(`البريد: ${email}\nكلمة المرور: ${password}`)
      setCopied(id)
      setTimeout(() => setCopied(null), 2500)
    } catch {
      // fallback
    }
  }

  const handleDirectLogin = (role: string, id: string) => {
    setLoggingIn(id)
    loginAs(role as any)
    setTimeout(() => {
      router.push(roleRoutes[role] || "/teacher")
    }, 300)
  }

  return (
    <div className="min-h-screen bg-[#09090B] px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <HiAcademicCap className="w-5 h-5 text-primary" />
            <span className="font-semibold text-text">TeacherOS</span>
          </div>
          <Link href="/login" className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors">
            <HiArrowLeft className="w-4 h-4" />
            العودة لتسجيل الدخول
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary text-white mb-4"
            >
              <HiShieldCheck className="w-6 h-6" />
            </motion.div>
            <h1 className="text-[28px] font-semibold text-text mb-2">بيانات التجربة</h1>
            <p className="text-text-secondary max-w-2xl mx-auto">
              استخدم حسابات التجربة أدناه لتجربة المنصة بشكل مباشر.
            </p>
          </div>

          <Alert variant="info" className="mb-8 border-border/60 bg-surface">
            <div className="flex items-start gap-3">
              <HiShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">تنبيه مهم</p>
                <p className="text-sm opacity-90 mt-1">
                  هذه بيانات تجريبية للعرض فقط. أي تغييرات تقوم بها لن يتم حفظها بشكل دائم.
                </p>
              </div>
            </div>
          </Alert>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demoAccounts.map((account) => {
              const Icon = account.icon
              return (
                <motion.div key={account.id} variants={cardVariants}>
                  <Card className="p-6 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-[18px] font-semibold text-text">{account.name}</h3>
                        <p className="text-[15px] text-text-secondary">{account.description}</p>
                      </div>
                    </div>
                    <CardContent className="p-0 space-y-3 flex-1">
                      <div className="flex items-center justify-between text-sm p-3 rounded-xl bg-[#18181B]">
                        <span className="text-text-tertiary">البريد الإلكتروني</span>
                        <Badge variant="primary" size="sm" className="font-mono ltr">{account.email}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm p-3 rounded-xl bg-[#18181B]">
                        <span className="text-text-tertiary">كلمة المرور</span>
                        <Badge variant="neutral" size="sm" className="font-mono tracking-wider">{account.password}</Badge>
                      </div>
                    </CardContent>
                    <div className="flex gap-3 mt-4">
                      <button type="button"
                        onClick={() => handleCopy(account.email, account.password, account.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm text-text-secondary hover:bg-surface-tertiary hover:text-text transition-all duration-200"
                      >
                        {copied === account.id ? (
                          <span className="text-success flex items-center gap-1.5 font-medium">
                            <HiCheckCircle className="w-4 h-4" />
                            تم النسخ
                          </span>
                        ) : (
                          <>
                            <HiClipboardCopy className="w-4 h-4" />
                            <span>نسخ</span>
                          </>
                        )}
                      </button>
                      <button type="button"
                        onClick={() => handleDirectLogin(account.role, account.id)}
                        disabled={loggingIn === account.id}
                        className="flex-[2] flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-[#6D70FF] transition-all duration-200 active:scale-[0.97] disabled:opacity-70"
                      >
                        {loggingIn === account.id ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <HiArrowSmRight className="w-4 h-4" />
                        )}
                        <span>{loggingIn === account.id ? "جاري..." : `الدخول كـ ${account.name}`}</span>
                      </button>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 text-center space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface border border-border text-sm">
              <HiCheckCircle className="w-5 h-5 text-success" />
              <span className="text-text-secondary">جميع الحسابات التجريبية جاهزة للاستخدام الفوري</span>
            </div>

            <div className="mt-4">
              <p className="text-sm text-text-secondary">
                هل تريد إنشاء حساب حقيقي؟{" "}
                <Link href="/register" className="text-primary hover:text-primary-light font-semibold transition-colors">
                  سجل الآن
                </Link>
                {" "}أو{" "}
                <Link href="/login" className="text-primary hover:text-primary-light font-semibold transition-colors">
                  سجل دخول
                </Link>
              </p>
            </div>

            <p className="text-xs text-text-tertiary mt-6">
              &copy; {new Date().getFullYear()} TeacherOS
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

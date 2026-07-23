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
    description: "صلاحية الوصول الكامل للوحة التحكم وإدارة الكورسات والطلاب والامتحانات.",
  },
  {
    id: "student",
    name: "طالب",
    icon: HiBookOpen,
    email: "student@teacher-os.com",
    password: "123456",
    role: "student" as const,
    description: "مشاهدة الكورسات المسجلة وأداء الامتحانات والواجبات.",
  },
  {
    id: "parent",
    name: "ولي أمر",
    icon: HiUserGroup,
    email: "parent@teacher-os.com",
    password: "123456",
    role: "parent" as const,
    description: "متابعة أداء الأبناء الدراسي والتقارير.",
  },
  {
    id: "staff",
    name: "موظف",
    icon: HiUserCircle,
    email: "staff@teacher-os.com",
    password: "123456",
    role: "staff" as const,
    description: "صلاحيات إدارة محددة لأعضاء فريق العمل.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
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
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-14">
          <div className="flex items-center gap-3 text-text-secondary text-sm">
            <div className="w-9 h-9 rounded-[10px] bg-primary flex items-center justify-center text-white text-xs font-bold shadow-[0_0_16px_rgba(217,119,6,0.2)]">T</div>
            <span className="font-semibold text-text text-[15px]">TeacherOS</span>
          </div>
          <Link href="/login" className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-primary border border-border hover:border-primary/20 rounded-[12px] transition-all duration-200">
            <HiArrowLeft className="w-4 h-4" />
            العودة
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="text-center mb-14">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.1 }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white mb-5 shadow-[0_0_30px_rgba(217,119,6,0.15)]"
            >
              <HiShieldCheck className="w-7 h-7" />
            </motion.div>
            <h1 className="text-[32px] md:text-[40px] font-semibold text-text mb-3 leading-tight">بيانات التجربة</h1>
            <p className="text-text-secondary text-[17px] max-w-xl mx-auto leading-relaxed">
              اختر الحساب المناسب وجرّب المنصة بشكل مباشر — جميع الحسابات جاهزة للاستخدام الفوري.
            </p>
          </div>

          <Alert variant="info" className="mb-10 px-6 py-5 rounded-[20px]">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-[10px] bg-info/10 flex items-center justify-center shrink-0">
                <HiShieldCheck className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="font-semibold text-text text-[15px] mb-1">بيانات تجريبية للعرض فقط</p>
                <p className="text-sm text-text-secondary opacity-90 leading-relaxed">
                  أي تغييرات تقوم بها داخل الحسابات التجريبية لن يتم حفظها بشكل دائم.
                </p>
              </div>
            </div>
          </Alert>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {demoAccounts.map((account) => {
              const Icon = account.icon
              return (
                <motion.div key={account.id} variants={cardVariants}>
                  <Card className="p-8 h-full flex flex-col hover:shadow-[0_12px_48px_rgba(217,119,6,0.04)] transition-shadow duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-sm">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-text">{account.name}</h3>
                        <p className="text-[15px] text-text-secondary leading-relaxed mt-0.5">{account.description}</p>
                      </div>
                    </div>

                    <CardContent className="p-0 space-y-3 mb-6 flex-1">
                      <div className="flex items-center justify-between text-sm px-5 py-3.5 rounded-[16px] bg-surface-secondary border border-border/40">
                        <span className="text-text-tertiary font-medium">البريد</span>
                        <Badge variant="primary" size="md" className="font-mono ltr tracking-tight">{account.email}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm px-5 py-3.5 rounded-[16px] bg-surface-secondary border border-border/40">
                        <span className="text-text-tertiary font-medium">كلمة المرور</span>
                        <Badge variant="neutral" size="md" className="font-mono tracking-wider">{account.password}</Badge>
                      </div>
                    </CardContent>

                    <div className="flex gap-3">
                      <button type="button"
                        onClick={() => handleCopy(account.email, account.password, account.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-[14px] text-sm text-text-secondary hover:bg-card hover:text-text hover:border-primary/20 transition-all duration-200 active:scale-[0.97]"
                      >
                        {copied === account.id ? (
                          <span className="text-success flex items-center gap-1.5 font-medium">
                            <HiCheckCircle className="w-4 h-4" />
                            تم النسخ
                          </span>
                        ) : (
                          <>
                            <HiClipboardCopy className="w-4 h-4" />
                            <span>نسخ البيانات</span>
                          </>
                        )}
                      </button>
                      <button type="button"
                        onClick={() => handleDirectLogin(account.role, account.id)}
                        disabled={loggingIn === account.id}
                        className="flex-[2] flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-[14px] text-sm font-medium hover:shadow-[0_0_30px_rgba(217,119,6,0.25)] transition-all duration-200 active:scale-[0.97] disabled:opacity-60 shadow-[0_4px_16px_rgba(217,119,6,0.15)]"
                      >
                        {loggingIn === account.id ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <HiArrowSmRight className="w-4 h-4" />
                        )}
                        <span>{loggingIn === account.id ? "جاري..." : `دخول كـ ${account.name}`}</span>
                      </button>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-card border border-border/60 text-sm shadow-sm">
              <HiCheckCircle className="w-5 h-5 text-success" />
              <span className="text-text-secondary font-medium">جميع الحسابات جاهزة — اختر ما يناسبك وابدأ فوراً</span>
            </div>



            <p className="text-xs text-text-tertiary mt-12">
              &copy; {new Date().getFullYear()} TeacherOS
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  HiAcademicCap,
  HiBookOpen,
  HiUserGroup,
  HiUserCircle,
  HiClipboardCopy,
  HiLogin,
  HiInformationCircle,
  HiShieldCheck,
  HiArrowLeft,
  HiCheckCircle,
} from "react-icons/hi"
import { Card, CardContent } from "@/components/ui/Card"
import { Alert } from "@/components/ui/Alert"
import { Badge } from "@/components/ui/Badge"

const demoAccounts = [
  {
    id: "teacher",
    name: "مدرس",
    icon: HiAcademicCap,
    gradient: "from-primary-500 to-indigo-600",
    email: "ahmed@teacher-os.com",
    password: "123456",
    description: "حساب تجريبي للمدرس مع صلاحية الوصول الكامل للوحة التحكم وإدارة الكورسات والطلاب والامتحانات والإيرادات وجميع التقارير.",
  },
  {
    id: "student",
    name: "طالب",
    icon: HiBookOpen,
    gradient: "from-emerald-500 to-teal-600",
    email: "student@teacher-os.com",
    password: "123456",
    description: "حساب تجريبي للطالب لمشاهدة الكورسات المسجلة وحضور الدروس المباشرة وأداء الامتحانات والواجبات ومتابعة التقدم.",
  },
  {
    id: "parent",
    name: "ولي أمر",
    icon: HiUserGroup,
    gradient: "from-amber-500 to-orange-600",
    email: "parent@teacher-os.com",
    password: "123456",
    description: "حساب تجريبي لولي الأمر لمتابعة أداء الأبناء الدراسي والاطلاع على التقارير الشهرية والمدفوعات والإشعارات.",
  },
  {
    id: "staff",
    name: "موظف",
    icon: HiUserCircle,
    gradient: "from-purple-500 to-pink-600",
    email: "staff@teacher-os.com",
    password: "123456",
    description: "حساب تجريبي لأعضاء فريق العمل مع صلاحيات إدارة محددة حسب الدور الوظيفي لكل موظف.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function DemoPage() {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = async (email: string, password: string, id: string) => {
    try {
      await navigator.clipboard.writeText(`البريد: ${email}\nكلمة المرور: ${password}`)
      setCopied(id)
      setTimeout(() => setCopied(null), 2500)
    } catch {
      // fallback
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#1E1B4B] px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-6 right-6 left-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 text-text-tertiary text-sm">
          <HiAcademicCap className="w-5 h-5 text-primary" />
          <span className="font-semibold text-text">TeacherOS</span>
        </div>
        <Link href="/login" className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors pointer-events-auto">
          <HiArrowLeft className="w-4 h-4" />
          العودة لتسجيل الدخول
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl relative z-10 pt-8"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 text-white mb-4 shadow-lg shadow-primary/30"
          >
            <HiShieldCheck className="w-8 h-8" />
          </motion.div>
          <h1 className="text-3xl font-bold text-text mb-2">بيانات التجربة</h1>
          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
            استخدم حسابات التجربة أدناه لتجربة المنصة بشكل مباشر. كل حساب لديه صلاحيات وأدوار مختلفة تتيح لك استكشاف جميع مزايا TeacherOS قبل إنشاء حساب حقيقي.
          </p>
        </motion.div>

        <Alert variant="info" className="mb-8">
          <div className="flex items-start gap-3">
            <HiInformationCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">تنبيه مهم</p>
              <p className="text-sm opacity-90 mt-1">
                هذه بيانات تجريبية للعرض فقط. ط£ظٹ تغييرات تقوم بها لن ظٹطھظ… حفظها بشكل دائم ولا تؤثر على النظام الفعلي. يُنصح بإنشاء حساب حقيقي للاستفادة الكاملة من جميع ميزات المنصة مع حفظ بياناتك بشكل آمن.
              </p>
            </div>
          </div>
        </Alert>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {demoAccounts.map((account) => {
            const Icon = account.icon
            return (
              <motion.div key={account.id} variants={cardVariants}>
                <Card className="overflow-hidden border-border/60 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group p-0 h-full flex flex-col">
                  <div className={`bg-gradient-to-r ${account.gradient} px-6 py-5 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/5" />
                    <div className="relative flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-inner">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white">{account.name}</h3>
                        <p className="text-sm text-white/80 leading-relaxed line-clamp-2">{account.description}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm p-3 rounded-lg bg-surface-secondary">
                        <span className="text-text-tertiary flex items-center gap-2">
                          <HiAcademicCap className="w-4 h-4" />
                          البريد الإلكتروني
                        </span>
                        <Badge variant="primary" size="sm" className="font-mono ltr">{account.email}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm p-3 rounded-lg bg-surface-secondary">
                        <span className="text-text-tertiary flex items-center gap-2">
                          <HiShieldCheck className="w-4 h-4" />
                          كلمة المرور
                        </span>
                        <Badge variant="neutral" size="sm" className="font-mono tracking-wider">{account.password}</Badge>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button type="button"
                        onClick={() => handleCopy(account.email, account.password, account.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm text-text-secondary hover:bg-surface-secondary hover:text-text hover:border-primary/30 transition-all duration-200"
                      >
                        {copied === account.id ? (
                          <span className="text-success flex items-center gap-1.5 font-medium">
                            <HiCheckCircle className="w-4 h-4" />
                            طھظ… النسخ
                          </span>
                        ) : (
                          <>
                            <HiClipboardCopy className="w-4 h-4" />
                            <span>نسخ البيانات</span>
                          </>
                        )}
                      </button>
                      <Link href="/login" className="flex-[2]">
                        <button type="button" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-all duration-200 shadow-sm shadow-primary/20 active:scale-[0.98]">
                          <HiLogin className="w-4 h-4" />
                          <span>تسجيل الدخول ظƒظ€ {account.name}</span>
                        </button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-secondary border border-border text-sm">
            <HiCheckCircle className="w-5 h-5 text-success" />
            <span className="text-text-secondary">جميع الحسابات التجريبية جاهزة للاستخدام الفوري</span>
          </div>

          <div className="mt-4">
            <p className="text-sm text-text-secondary">
              هل تريد إنشاء حساب حقيقي والاحتفاظ ببياناتك؟{" "}
              <Link href="/register" className="text-primary hover:text-primary-dark font-semibold transition-colors">
                سجل الآن
              </Link>
              {" "}أو{" "}
              <Link href="/login" className="text-primary hover:text-primary-dark font-semibold transition-colors">
                سجل دخول
              </Link>
            </p>
          </div>

          <p className="text-xs text-text-tertiary mt-6">
            &copy; {new Date().getFullYear()} TeacherOS. جميع الحقوق محفوظة. هذه المنصة مخصصة للأغراض التعليمية والتجريبية.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

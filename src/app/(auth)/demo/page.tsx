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
    name: "ظ…ط¯ط±ط³",
    icon: HiAcademicCap,
    gradient: "from-primary-500 to-indigo-600",
    email: "ahmed@teacher-os.com",
    password: "123456",
    description: "ط­ط³ط§ط¨ طھط¬ط±ظٹط¨ظٹ ظ„ظ„ظ…ط¯ط±ط³ ظ…ط¹ طµظ„ط§ط­ظٹط© ط§ظ„ظˆطµظˆظ„ ط§ظ„ظƒط§ظ…ظ„ ظ„ظ„ظˆط­ط© ط§ظ„طھط­ظƒظ… ظˆط¥ط¯ط§ط±ط© ط§ظ„ظƒظˆط±ط³ط§طھ ظˆط§ظ„ط·ظ„ط§ط¨ ظˆط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ ظˆط§ظ„ط¥ظٹط±ط§ط¯ط§طھ ظˆط¬ظ…ظٹط¹ ط§ظ„طھظ‚ط§ط±ظٹط±.",
  },
  {
    id: "student",
    name: "ط·ط§ظ„ط¨",
    icon: HiBookOpen,
    gradient: "from-emerald-500 to-teal-600",
    email: "student@teacher-os.com",
    password: "123456",
    description: "ط­ط³ط§ط¨ طھط¬ط±ظٹط¨ظٹ ظ„ظ„ط·ط§ظ„ط¨ ظ„ظ…ط´ط§ظ‡ط¯ط© ط§ظ„ظƒظˆط±ط³ط§طھ ط§ظ„ظ…ط³ط¬ظ„ط© ظˆط­ط¶ظˆط± ط§ظ„ط¯ط±ظˆط³ ط§ظ„ظ…ط¨ط§ط´ط±ط© ظˆط£ط¯ط§ط، ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ ظˆط§ظ„ظˆط§ط¬ط¨ط§طھ ظˆظ…طھط§ط¨ط¹ط© ط§ظ„طھظ‚ط¯ظ….",
  },
  {
    id: "parent",
    name: "ظˆظ„ظٹ ط£ظ…ط±",
    icon: HiUserGroup,
    gradient: "from-amber-500 to-orange-600",
    email: "parent@teacher-os.com",
    password: "123456",
    description: "ط­ط³ط§ط¨ طھط¬ط±ظٹط¨ظٹ ظ„ظˆظ„ظٹ ط§ظ„ط£ظ…ط± ظ„ظ…طھط§ط¨ط¹ط© ط£ط¯ط§ط، ط§ظ„ط£ط¨ظ†ط§ط، ط§ظ„ط¯ط±ط§ط³ظٹ ظˆط§ظ„ط§ط·ظ„ط§ط¹ ط¹ظ„ظ‰ ط§ظ„طھظ‚ط§ط±ظٹط± ط§ظ„ط´ظ‡ط±ظٹط© ظˆط§ظ„ظ…ط¯ظپظˆط¹ط§طھ ظˆط§ظ„ط¥ط´ط¹ط§ط±ط§طھ.",
  },
  {
    id: "staff",
    name: "ظ…ظˆط¸ظپ",
    icon: HiUserCircle,
    gradient: "from-purple-500 to-pink-600",
    email: "staff@teacher-os.com",
    password: "123456",
    description: "ط­ط³ط§ط¨ طھط¬ط±ظٹط¨ظٹ ظ„ط£ط¹ط¶ط§ط، ظپط±ظٹظ‚ ط§ظ„ط¹ظ…ظ„ ظ…ط¹ طµظ„ط§ط­ظٹط§طھ ط¥ط¯ط§ط±ط© ظ…ط­ط¯ط¯ط© ط­ط³ط¨ ط§ظ„ط¯ظˆط± ط§ظ„ظˆط¸ظٹظپظٹ ظ„ظƒظ„ ظ…ظˆط¸ظپ.",
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
      await navigator.clipboard.writeText(`ط§ظ„ط¨ط±ظٹط¯: ${email}\nظƒظ„ظ…ط© ط§ظ„ظ…ط±ظˆط±: ${password}`)
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
          ط§ظ„ط¹ظˆط¯ط© ظ„طھط³ط¬ظٹظ„ ط§ظ„ط¯ط®ظˆظ„
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
          <h1 className="text-3xl font-bold text-text mb-2">ط¨ظٹط§ظ†ط§طھ ط§ظ„طھط¬ط±ط¨ط©</h1>
          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
            ط§ط³طھط®ط¯ظ… ط­ط³ط§ط¨ط§طھ ط§ظ„طھط¬ط±ط¨ط© ط£ط¯ظ†ط§ظ‡ ظ„طھط¬ط±ط¨ط© ط§ظ„ظ…ظ†طµط© ط¨ط´ظƒظ„ ظ…ط¨ط§ط´ط±. ظƒظ„ ط­ط³ط§ط¨ ظ„ط¯ظٹظ‡ طµظ„ط§ط­ظٹط§طھ ظˆط£ط¯ظˆط§ط± ظ…ط®طھظ„ظپط© طھطھظٹط­ ظ„ظƒ ط§ط³طھظƒط´ط§ظپ ط¬ظ…ظٹط¹ ظ…ط²ط§ظٹط§ TeacherOS ظ‚ط¨ظ„ ط¥ظ†ط´ط§ط، ط­ط³ط§ط¨ ط­ظ‚ظٹظ‚ظٹ.
          </p>
        </motion.div>

        <Alert variant="info" className="mb-8">
          <div className="flex items-start gap-3">
            <HiInformationCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">طھظ†ط¨ظٹظ‡ ظ…ظ‡ظ…</p>
              <p className="text-sm opacity-90 mt-1">
                ظ‡ط°ظ‡ ط¨ظٹط§ظ†ط§طھ طھط¬ط±ظٹط¨ظٹط© ظ„ظ„ط¹ط±ط¶ ظپظ‚ط·. ط£ظٹ طھط؛ظٹظٹط±ط§طھ طھظ‚ظˆظ… ط¨ظ‡ط§ ظ„ظ† ظٹطھظ… ط­ظپط¸ظ‡ط§ ط¨ط´ظƒظ„ ط¯ط§ط¦ظ… ظˆظ„ط§ طھط¤ط«ط± ط¹ظ„ظ‰ ط§ظ„ظ†ط¸ط§ظ… ط§ظ„ظپط¹ظ„ظٹ. ظٹظڈظ†طµط­ ط¨ط¥ظ†ط´ط§ط، ط­ط³ط§ط¨ ط­ظ‚ظٹظ‚ظٹ ظ„ظ„ط§ط³طھظپط§ط¯ط© ط§ظ„ظƒط§ظ…ظ„ط© ظ…ظ† ط¬ظ…ظٹط¹ ظ…ظٹط²ط§طھ ط§ظ„ظ…ظ†طµط© ظ…ط¹ ط­ظپط¸ ط¨ظٹط§ظ†ط§طھظƒ ط¨ط´ظƒظ„ ط¢ظ…ظ†.
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
                          ط§ظ„ط¨ط±ظٹط¯ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹ
                        </span>
                        <Badge variant="primary" size="sm" className="font-mono ltr">{account.email}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm p-3 rounded-lg bg-surface-secondary">
                        <span className="text-text-tertiary flex items-center gap-2">
                          <HiShieldCheck className="w-4 h-4" />
                          ظƒظ„ظ…ط© ط§ظ„ظ…ط±ظˆط±
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
                            طھظ… ط§ظ„ظ†ط³ط®
                          </span>
                        ) : (
                          <>
                            <HiClipboardCopy className="w-4 h-4" />
                            <span>ظ†ط³ط® ط§ظ„ط¨ظٹط§ظ†ط§طھ</span>
                          </>
                        )}
                      </button>
                      <Link href="/login" className="flex-[2]">
                        <button type="button" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-all duration-200 shadow-sm shadow-primary/20 active:scale-[0.98]">
                          <HiLogin className="w-4 h-4" />
                          <span>طھط³ط¬ظٹظ„ ط§ظ„ط¯ط®ظˆظ„ ظƒظ€ {account.name}</span>
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
            <span className="text-text-secondary">ط¬ظ…ظٹط¹ ط§ظ„ط­ط³ط§ط¨ط§طھ ط§ظ„طھط¬ط±ظٹط¨ظٹط© ط¬ط§ظ‡ط²ط© ظ„ظ„ط§ط³طھط®ط¯ط§ظ… ط§ظ„ظپظˆط±ظٹ</span>
          </div>

          <div className="mt-4">
            <p className="text-sm text-text-secondary">
              ظ‡ظ„ طھط±ظٹط¯ ط¥ظ†ط´ط§ط، ط­ط³ط§ط¨ ط­ظ‚ظٹظ‚ظٹ ظˆط§ظ„ط§ط­طھظپط§ط¸ ط¨ط¨ظٹط§ظ†ط§طھظƒطں{" "}
              <Link href="/register" className="text-primary hover:text-primary-dark font-semibold transition-colors">
                ط³ط¬ظ„ ط§ظ„ط¢ظ†
              </Link>
              {" "}ط£ظˆ{" "}
              <Link href="/login" className="text-primary hover:text-primary-dark font-semibold transition-colors">
                ط³ط¬ظ„ ط¯ط®ظˆظ„
              </Link>
            </p>
          </div>

          <p className="text-xs text-text-tertiary mt-6">
            &copy; {new Date().getFullYear()} TeacherOS. ط¬ظ…ظٹط¹ ط§ظ„ط­ظ‚ظˆظ‚ ظ…ط­ظپظˆط¸ط©. ظ‡ط°ظ‡ ط§ظ„ظ…ظ†طµط© ظ…ط®طµطµط© ظ„ظ„ط£ط؛ط±ط§ط¶ ط§ظ„طھط¹ظ„ظٹظ…ظٹط© ظˆط§ظ„طھط¬ط±ظٹط¨ظٹط©.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

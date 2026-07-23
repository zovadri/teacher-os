"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { HiShieldExclamation, HiArrowRight } from "react-icons/hi"
import Button from "@/components/ui/Button"

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.03),transparent_70%)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="max-w-md w-full text-center space-y-6"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-error/10">
          <HiShieldExclamation className="w-10 h-10 text-error" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-text">غير مصرح بالوصول</h1>
          <p className="text-text-secondary">ليس لديك الصلاحية للوصول إلى هذه الصفحة. يرجى التواصل مع مدير النظام.</p>
        </div>
        <div className="flex justify-center gap-3">
          <Link href="/">
            <Button variant="primary" leftIcon={<HiArrowRight className="w-4 h-4" />}>
              العودة للرئيسية
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary">تسجيل الدخول</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { HiAcademicCap, HiPhone, HiArrowRight, HiCheckCircle } from "react-icons/hi"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState("")
  const [sent, setSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setSent(true)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-surface-secondary">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.06),transparent_60%)] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[150px]" />
      </div>

      <div className="w-full max-w-sm relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary-dark text-white mb-6 shadow-[0_0_40px_rgba(217,119,6,0.15)]">
            <HiAcademicCap className="w-10 h-10" />
          </div>
          <h1 className="text-[28px] font-bold text-text">نسيت كلمة المرور</h1>
          <p className="text-text-secondary mt-2 text-sm">أدخل رقم هاتفك وسنرسل لك رابط إعادة التعيين</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }} className="bg-card border border-border rounded-[24px] p-10">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                <HiCheckCircle className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-lg font-semibold text-text">تم الإرسال</h2>
              <p className="text-sm text-text-secondary leading-relaxed">تم إرسال رابط إعادة تعيين كلمة المرور إلى رقم هاتفك. يرجى التحقق من رسائلك.</p>
              <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline mt-2">
                <HiArrowRight className="w-4 h-4" />
                العودة لتسجيل الدخول
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input label="رقم الهاتف" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="أدخل رقم هاتفك" leftIcon={<HiPhone className="w-5 h-5" />} required dir="auto" />
              <Button type="submit" isLoading={isLoading} className="w-full" size="lg">
                {isLoading ? "جاري الإرسال..." : "إرسال رابط التعيين"}
              </Button>
              <div className="text-center">
                <Link href="/login" className="text-sm text-text-tertiary hover:text-primary transition-colors font-medium">
                  العودة لتسجيل الدخول
                </Link>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  HiMail,
  HiLockClosed,
  HiEye,
  HiEyeOff,
  HiAcademicCap,
  HiUser,
  HiPhone,
  HiBookOpen,
  HiUserGroup,
  HiUserCircle,
} from "react-icons/hi"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { Card, CardContent } from "@/components/ui/Card"
import { Tabs, TabPanel } from "@/components/ui/Tabs"

const roles = [
  { id: "teacher", label: "مدرس", icon: <HiAcademicCap className="w-5 h-5" /> },
  { id: "student", label: "طالب", icon: <HiBookOpen className="w-5 h-5" /> },
  { id: "parent", label: "ولي أمر", icon: <HiUserGroup className="w-5 h-5" /> },
]

export default function RegisterPage() {
  const [activeRole, setActiveRole] = useState("teacher")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    grade: "",
    studentName: "",
    studentGrade: "",
    parentRelation: "",
  })

  const updateField = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#1E1B4B] px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white mb-4 shadow-lg shadow-primary/30"
          >
            <HiUserCircle className="w-8 h-8" />
          </motion.div>
          <h1 className="text-2xl font-bold text-text">إنشاء حساب جديد</h1>
          <p className="text-text-secondary mt-2 text-sm">اختر نوع الحساب وأكمل البيانات</p>
        </div>

        <Card className="p-8 shadow-xl border-border/50">
          <CardContent className="p-0">
            <Tabs tabs={roles} defaultTab="teacher" onChange={setActiveRole}>
              {(activeTab) => (
                <TabPanel id={activeTab} activeTab={activeTab}>
                  <form onSubmit={handleSubmit} className="space-y-5 mt-2">
                    <Input
                      label="الاسم الكامل"
                      type="text"
                      value={form.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      placeholder="أدخل اسمك الكامل"
                      leftIcon={<HiUser className="w-5 h-5" />}
                      required
                    />

                    <Input
                      label="البريد الإلكتروني"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="أدخل بريدك الإلكتروني"
                      leftIcon={<HiMail className="w-5 h-5" />}
                      required
                    />

                    <Input
                      label="رقم الهاتف"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="أدخل رقم الهاتف"
                      leftIcon={<HiPhone className="w-5 h-5" />}
                      required
                    />

                    <div className="relative">
                      <Input
                        label="كلمة المرور"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={(e) => updateField("password", e.target.value)}
                        placeholder="أدخل كلمة المرور"
                        leftIcon={<HiLockClosed className="w-5 h-5" />}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-[38px] text-text-tertiary hover:text-text-secondary transition-colors"
                      >
                        {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                      </button>
                    </div>

                    <div className="relative">
                      <Input
                        label="تأكيد كلمة المرور"
                        type={showConfirm ? "text" : "password"}
                        value={form.confirmPassword}
                        onChange={(e) => updateField("confirmPassword", e.target.value)}
                        placeholder="أعد إدخال كلمة المرور"
                        leftIcon={<HiLockClosed className="w-5 h-5" />}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute left-3 top-[38px] text-text-tertiary hover:text-text-secondary transition-colors"
                      >
                        {showConfirm ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                      </button>
                    </div>

                    {activeTab === "teacher" && (
                      <Input
                        label="التخصص"
                        type="text"
                        value={form.specialization}
                        onChange={(e) => updateField("specialization", e.target.value)}
                        placeholder="مثال: لغة عربية - رياضيات"
                        leftIcon={<HiAcademicCap className="w-5 h-5" />}
                      />
                    )}

                    {activeTab === "student" && (
                      <>
                        <Input
                          label="المرحلة الدراسية"
                          type="text"
                          value={form.grade}
                          onChange={(e) => updateField("grade", e.target.value)}
                          placeholder="مثال: ثالثة ثانوي"
                          leftIcon={<HiBookOpen className="w-5 h-5" />}
                        />
                      </>
                    )}

                    {activeTab === "parent" && (
                      <>
                        <Input
                          label="اسم الطالب"
                          type="text"
                          value={form.studentName}
                          onChange={(e) => updateField("studentName", e.target.value)}
                          placeholder="أدخل اسم ابنك / ابنتك"
                          leftIcon={<HiUserGroup className="w-5 h-5" />}
                        />
                        <Input
                          label="صف الطالب"
                          type="text"
                          value={form.studentGrade}
                          onChange={(e) => updateField("studentGrade", e.target.value)}
                          placeholder="مثال: ثانية ثانوي"
                          leftIcon={<HiBookOpen className="w-5 h-5" />}
                        />
                        <Input
                          label="صلة القرابة"
                          type="text"
                          value={form.parentRelation}
                          onChange={(e) => updateField("parentRelation", e.target.value)}
                          placeholder="مثال: والد - والدة - ولي أمر"
                          leftIcon={<HiUserGroup className="w-5 h-5" />}
                        />
                      </>
                    )}

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 mt-0.5 cursor-pointer"
                      />
                      <span className="text-sm text-text-secondary leading-relaxed">
                        أوافق على{" "}
                        <Link href="/terms" className="text-primary hover:text-primary-dark">شروط الاستخدام</Link>
                        {" "}و{" "}
                        <Link href="/privacy" className="text-primary hover:text-primary-dark">سياسة الخصوصية</Link>
                      </span>
                    </label>

                    <Button type="submit" isLoading={isLoading} disabled={!agreeTerms} className="w-full" size="lg">
                      إنشاء الحساب
                    </Button>
                  </form>
                </TabPanel>
              )}
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-text-secondary">
                لديك حساب بالفعل؟{" "}
                <Link href="/login" className="text-primary hover:text-primary-dark font-medium transition-colors">
                  سجل دخول
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { HiAcademicCap, HiCheck, HiX, HiChevronDown } from "react-icons/hi"
import { mockSubscriptionPlans, mockFaq } from "@/lib/mock/data"
import { formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/Badge"

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const planIcons: Record<string, string> = {
  "الباقة الشهرية": "شهري",
  "الباقة الثلاثية": "ربع سنوي",
  "الباقة السنوية": "سنوي",
  "باقة الكورس الواحد": "كورس",
}

const comparisonFeatures = [
  { label: "جميع الكورسات", free: true, monthly: false, quarterly: true, yearly: true },
  { label: "عدد الكورسات", free: "كورس واحد", monthly: "٥ كورسات", quarterly: "غير محدود", yearly: "غير محدود" },
  { label: "فيديوهات تعليمية", free: true, monthly: true, quarterly: true, yearly: true },
  { label: "امتحانات تفاعلية", free: false, monthly: true, quarterly: true, yearly: true },
  { label: "واجبات منزلية", free: false, monthly: true, quarterly: true, yearly: true },
  { label: "شهادة معتمدة", free: false, monthly: false, quarterly: true, yearly: true },
  { label: "دعم فني", free: false, monthly: "أساسي", quarterly: "أساسي", yearly: "VIP" },
  { label: "تقرير أداء شهري", free: false, monthly: false, quarterly: false, yearly: true },
  { label: "خصم إضافي", free: false, monthly: false, quarterly: "١٥٪", yearly: "٢٥٪" },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [faqOpen, setFaqOpen] = useState<string | null>(null)

  const plans = mockSubscriptionPlans
    .filter((p) => p.status === "active")
    .sort((a, b) => a.order - b.order)
    .filter((p) => p.id !== "plan-4")

  const getPrice = (plan: typeof mockSubscriptionPlans[0]) => {
    if (isYearly && plan.durationUnit === "month") {
      const yearlyPrice = plan.price * 12 * 0.8
      return Math.round(yearlyPrice)
    }
    return plan.price
  }

  const getPeriod = (plan: typeof mockSubscriptionPlans[0]) => {
    if (isYearly && plan.durationUnit === "month") return "سنوياً"
    return plan.duration === 1 ? "شهرياً" : `كل ${plan.duration} أشهر`
  }

  const pricingFaq = mockFaq.filter((f) => f.category === "اشتراكات" || f.category === "عام").slice(0, 5)

  return (
    <>
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-gradient-to-br from-primary/5 via-surface to-surface pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-6">
              <HiAcademicCap size={14} /> الباقات والأسعار
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              اختر <span className="text-primary">الباقة</span> المناسبة
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              اشتراكات مرنة تناسب احتياجاتك التعليمية. اختر الباقة التي تناسبك وابدأ رحلة التعلم.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-medium transition-colors ${!isYearly ? "text-text" : "text-text-tertiary"}`}>شهري</span>
            <button type="button"
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-7 rounded-full transition-colors ${isYearly ? "bg-primary" : "bg-surface-tertiary"} border border-border`}
            >
              <span className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${isYearly ? "translate-x-7" : "translate-x-0.5"}`} />
            </button>
            <span className={`text-sm font-medium transition-colors ${isYearly ? "text-text" : "text-text-tertiary"}`}>
              سنوي
              <Badge variant="primary" size="sm" className="mr-1">وفر ٢٠٪</Badge>
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => {
              const isPopular = plan.id === "plan-2"
              const Icon = planIcons[plan.name] || "شهري"
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative p-8 rounded-2xl border-2 transition-all flex flex-col ${isPopular ? "border-primary bg-primary/5 shadow-lg shadow-primary/10 scale-105 md:scale-110" : "border-border hover:border-primary/30"}`}
                >
                  {isPopular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-medium rounded-full">الأكثر شيوعاً</div>}
                  <div className="mb-2">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{Icon}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm text-text-secondary mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{formatCurrency(getPrice(plan))}</span>
                    <span className="text-text-secondary text-sm mr-1">/ {getPeriod(plan)}</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {[
                      plan.allCourses ? "جميع الكورسات" : `${plan.coursesCount} كورس`,
                      "محتوى تعليمي شامل",
                      plan.duration >= 3 ? "شهادة معتمدة" : "دعم فني",
                      plan.duration >= 12 ? "تقرير أداء شهري" : "امتحانات تفاعلية",
                      "متابعة التقدم",
                    ].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                        <HiCheck className="text-success shrink-0" size={16} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/register"
                    className={`block w-full text-center py-3 rounded-xl font-medium transition-all ${isPopular ? "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25" : "border border-border hover:bg-surface-tertiary"}`}
                  >
                    ابدأ الآن
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface-secondary">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-primary text-sm font-medium mb-2 block">مقارنة الباقات</span>
            <h2 className="text-3xl font-bold mb-4">قارن بين الباقات</h2>
            <p className="text-text-secondary">تعرف على المميزات المتاحة في كل باقة.</p>
          </motion.div>
          <motion.div {...fadeUp} className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-right py-4 px-4 font-medium text-text">الميزة</th>
                  <th className="text-center py-4 px-4 font-medium text-text">باقة الكورس الواحد</th>
                  <th className="text-center py-4 px-4 font-medium text-primary">الباقة الشهرية</th>
                  <th className="text-center py-4 px-4 font-medium text-primary">الباقة الثلاثية</th>
                  <th className="text-center py-4 px-4 font-medium text-primary">الباقة السنوية</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feat) => (
                  <tr key={feat.label} className="border-b border-border hover:bg-surface-tertiary/50 transition-colors">
                    <td className="py-3 px-4 text-text font-medium">{feat.label}</td>
                    {["free", "monthly", "quarterly", "yearly"].map((key) => {
                      const val = feat[key as keyof typeof feat]
                      return (
                        <td key={key} className="text-center py-3 px-4">
                          {val === true ? <HiCheck className="text-success mx-auto" size={18} /> :
                           val === false ? <HiX className="text-text-tertiary mx-auto" size={18} /> :
                           <span className="text-text-secondary">{String(val)}</span>}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-primary text-sm font-medium mb-2 block">الأسئلة الشائعة</span>
            <h2 className="text-3xl font-bold mb-4">استفسارات حول الباقات</h2>
            <p className="text-text-secondary">إجابات لأكثر الأسئلة شيوعاً عن الباقات والاشتراكات.</p>
          </motion.div>
          <div className="space-y-3">
            {pricingFaq.map((faq, i) => (
              <motion.div key={faq.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <button type="button"
                  onClick={() => setFaqOpen(faqOpen === faq.id ? null : faq.id)}
                  className="w-full text-right p-4 rounded-xl border border-border bg-surface hover:border-primary/30 transition-all flex items-center justify-between gap-4"
                >
                  <span className="font-medium text-sm">{faq.question}</span>
                  <HiChevronDown size={16} className={`text-text-tertiary transition-transform shrink-0 ${faqOpen === faq.id ? "rotate-180" : ""}`} />
                </button>
                {faqOpen === faq.id && (
                  <div className="px-4 pb-4 pt-2 text-sm text-text-secondary leading-relaxed">{faq.answer}</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div {...fadeUp} className="relative rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-8 md:p-16 text-center text-white overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">مستعد للانضمام إلينا؟</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">اختر باقتك المفضلة وابدأ رحلة التفوق في اللغة العربية اليوم.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register" className="px-8 py-3 bg-white text-primary font-medium rounded-xl hover:bg-white/90 transition-all">إنشاء حساب جديد</Link>
                <Link href="/contact" className="px-8 py-3 border border-white/30 text-white font-medium rounded-xl hover:bg-white/10 transition-all">تواصل معنا</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

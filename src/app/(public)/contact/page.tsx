"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { HiAcademicCap, HiMail, HiPhone, HiLocationMarker, HiClock, HiChevronDown, HiCheck, HiGlobe } from "react-icons/hi"
import { mockCmsContent, mockFaq } from "@/lib/mock/data"
import Input from "@/components/ui/Input"
import Textarea from "@/components/ui/Textarea"
import Button from "@/components/ui/Button"

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const socialLinks = [
  { label: "فيسبوك", href: mockCmsContent.socialLinks.facebook, icon: "F" },
  { label: "تويتر", href: mockCmsContent.socialLinks.twitter, icon: "T" },
  { label: "يوتيوب", href: mockCmsContent.socialLinks.youtube, icon: "Y" },
  { label: "واتساب", href: mockCmsContent.socialLinks.whatsapp, icon: "W" },
  { label: "تلغرام", href: mockCmsContent.socialLinks.telegram, icon: "T" },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [faqOpen, setFaqOpen] = useState<string | null>(null)

  const contactInfo = [
    { icon: HiPhone, title: "اتصل بنا", details: [mockCmsContent.contactInfo.phone], action: "اتصل الآن" },
    { icon: HiMail, title: "البريد الإلكتروني", details: [mockCmsContent.contactInfo.email], action: "أرسل بريداً" },
    { icon: HiLocationMarker, title: "العنوان", details: [mockCmsContent.contactInfo.address], action: "عرض الخريطة" },
    { icon: HiClock, title: "مواعيد العمل", details: [mockCmsContent.contactInfo.workingHours], action: "تواصل معنا" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    setSubmitted(true)
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    setTimeout(() => setSubmitted(false), 5000)
  }

  const contactFaq = mockFaq.filter((f) => f.category === "عام" || f.category === "اشتراكات").slice(0, 5)

  return (
    <>
      <section className="relative min-h-[45vh] flex items-center overflow-hidden bg-gradient-to-br from-primary/5 via-surface to-surface pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-6">
              <HiAcademicCap size={14} /> تواصل معنا
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="text-primary">تواصل</span> معنا
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              لديك سؤال أو استفسار؟ نحن هنا لمساعدتك. تواصل معنا عبر النموذج أو معلومات الاتصال أدناه.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => (
              <motion.div key={info.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="p-6 rounded-xl border border-border bg-surface text-center hover:shadow-lg hover:border-primary/30 transition-all group">
                <info.icon className="text-primary mx-auto mb-4" size={32} />
                <h3 className="font-semibold mb-2">{info.title}</h3>
                {info.details.map((d, j) => <p key={j} className="text-sm text-text-secondary">{d}</p>)}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div {...fadeUp}>
              <h2 className="text-2xl font-bold mb-6">أرسل لنا رسالة</h2>
              {submitted ? (
                <div className="p-8 rounded-xl border border-success/30 bg-success/5 text-center">
                  <HiCheck className="text-success mx-auto mb-4" size={48} />
                  <h3 className="font-semibold text-lg mb-2">تم إرسال رسالتك بنجاح!</h3>
                  <p className="text-sm text-text-secondary">سنقوم بالرد عليك في أقرب وقت ممكن. شكراً لتواصلك معنا.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input label="الاسم" placeholder="أدخل اسمك" value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} required />
                    <Input label="البريد الإلكتروني" type="email" placeholder="أدخل بريدك الإلكتروني" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} required />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input label="رقم الهاتف" type="tel" placeholder="أدخل رقم هاتفك" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} />
                    <Input label="الموضوع" placeholder="موضوع الرسالة" value={formData.subject} onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))} />
                  </div>
                  <Textarea label="الرسالة" placeholder="اكتب رسالتك هنا..." rows={6} value={formData.message} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} required />
                  <Button type="submit" size="lg" className="w-full sm:w-auto">إرسال الرسالة</Button>
                </form>
              )}
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
              <h2 className="text-2xl font-bold mb-6">موقعنا</h2>
              <div className="rounded-2xl overflow-hidden border border-border h-[400px] md:h-full min-h-[400px] bg-surface-secondary relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <HiLocationMarker className="text-primary mx-auto mb-3" size={48} />
                    <p className="font-semibold mb-1">{mockCmsContent.contactInfo.address.split("،")[0]}</p>
                    <p className="text-sm text-text-secondary">{mockCmsContent.contactInfo.address.split("،").slice(1).join("، ")}</p>
                    <a href="https://maps.google.com/?q=New+Cairo+Egypt" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 px-6 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-all">
                      عرض على خرائط Google
                    </a>
                  </div>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05),transparent_70%)]" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div {...fadeUp} className="text-center mb-10">
            <span className="text-primary text-sm font-medium mb-2 block">تابعنا</span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">تواصل معنا عبر وسائل التواصل</h2>
            <p className="text-text-secondary">تابعنا على منصات التواصل الاجتماعي لتصلك أحدث المقالات والعروض.</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-surface hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all group">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm group-hover:bg-primary group-hover:text-white transition-all">{social.icon}</div>
                <span className="text-sm font-medium">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">الأسئلة الشائعة</h2>
            <p className="text-text-secondary">إجابات سريعة لأكثر الأسئلة شيوعاً.</p>
          </motion.div>
          <div className="space-y-3">
            {contactFaq.map((faq, i) => (
              <motion.div key={faq.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <button onClick={() => setFaqOpen(faqOpen === faq.id ? null : faq.id)} className="w-full text-right p-4 rounded-xl border border-border bg-surface hover:border-primary/30 transition-all flex items-center justify-between gap-4">
                  <span className="font-medium text-sm">{faq.question}</span>
                  <HiChevronDown size={16} className={`text-text-tertiary transition-transform shrink-0 ${faqOpen === faq.id ? "rotate-180" : ""}`} />
                </button>
                {faqOpen === faq.id && <div className="px-4 pb-4 pt-2 text-sm text-text-secondary leading-relaxed">{faq.answer}</div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

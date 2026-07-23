"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HiAcademicCap, HiMail, HiPhone, HiLocationMarker, HiClock, HiChevronDown, HiCheck } from "react-icons/hi"
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
      <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-gradient-to-br from-primary/5 via-surface to-surface pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,119,6,0.06),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full mb-6 border border-primary/20">
                <HiAcademicCap size={14} /> تواصل معنا
              </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-primary">تواصل</span> معنا
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-xl mx-auto">
              لديك سؤال أو استفسار؟ نحن هنا لمساعدتك.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, i) => (
              <motion.div key={info.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-card border border-border rounded-[24px] p-8 text-center transition-all duration-300 hover:shadow-[0_12px_48px_rgba(217,119,6,0.04)] hover:-translate-y-1 hover:border-primary/20">
                <div className="w-14 h-14 rounded-[16px] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <info.icon className="text-primary" size={26} />
                </div>
                <h3 className="font-semibold text-[17px] mb-3">{info.title}</h3>
                {info.details.map((d, j) => <p key={j} className="text-[15px] text-text-secondary leading-relaxed">{d}</p>)}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div {...fadeUp}>
              <h2 className="text-[28px] font-bold mb-8">أرسل لنا رسالة</h2>
              {submitted ? (
                <div className="bg-card border border-success/30 rounded-[24px] p-10 text-center shadow-[0_8px_40px_rgba(217,119,6,0.02)]">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-5">
                    <HiCheck className="text-success" size={36} />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">تم إرسال رسالتك بنجاح!</h3>
                  <p className="text-[15px] text-text-secondary">سنقوم بالرد عليك في أقرب وقت ممكن. شكراً لتواصلك معنا.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <Input label="الاسم" placeholder="أدخل اسمك" value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} required />
                    <Input label="البريد الإلكتروني" type="email" placeholder="أدخل بريدك الإلكتروني" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} required />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <Input label="رقم الهاتف" type="tel" placeholder="أدخل رقم هاتفك" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} />
                    <Input label="الموضوع" placeholder="موضوع الرسالة" value={formData.subject} onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))} />
                  </div>
                  <Textarea label="الرسالة" placeholder="اكتب رسالتك هنا..." rows={6} value={formData.message} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} required />
                  <Button type="submit" size="lg" className="w-full sm:w-auto">إرسال الرسالة</Button>
                </form>
              )}
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
              <h2 className="text-[28px] font-bold mb-8">موقعنا</h2>
              <div className="rounded-[24px] overflow-hidden border border-border h-[400px] md:h-full min-h-[400px] bg-card relative shadow-[0_8px_40px_rgba(217,119,6,0.02)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <HiLocationMarker className="text-primary" size={28} />
                    </div>
                    <p className="font-semibold text-[17px] mb-1">{mockCmsContent.contactInfo.address.split("،")[0]}</p>
                    <p className="text-[15px] text-text-secondary">{mockCmsContent.contactInfo.address.split("،").slice(1).join("، ")}</p>
                    <a href="https://maps.google.com/?q=New+Cairo+Egypt" target="_blank" rel="noopener noreferrer" className="inline-block mt-5 px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-[14px] hover:bg-primary-dark transition-all shadow-[0_4px_16px_rgba(217,119,6,0.15)]">
                      عرض على خرائط Google
                    </a>
                  </div>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.04),transparent_70%)]" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-primary text-sm font-medium mb-3 block">تابعنا</span>
            <h2 className="text-[28px] font-bold mb-4">تواصل معنا عبر وسائل التواصل</h2>
            <p className="text-text-secondary text-[15px] max-w-lg mx-auto">تابعنا على منصات التواصل الاجتماعي لتصلك أحدث المقالات والعروض.</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3.5 rounded-[16px] border border-border bg-card hover:border-primary/20 hover:shadow-[0_8px_32px_rgba(217,119,6,0.03)] hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary font-bold text-sm">{social.icon}</div>
                <span className="text-sm font-medium">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 pb-28">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-[28px] font-bold mb-4">الأسئلة الشائعة</h2>
            <p className="text-text-secondary text-[15px]">إجابات سريعة لأكثر الأسئلة شيوعاً.</p>
          </motion.div>
          <div className="space-y-5">
            {contactFaq.map((faq, i) => (
              <motion.div key={faq.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <button type="button" onClick={() => setFaqOpen(faqOpen === faq.id ? null : faq.id)} className="w-full text-right p-7 rounded-[20px] border border-border bg-card hover:border-primary/20 hover:shadow-[0_8px_32px_rgba(217,119,6,0.03)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between gap-4">
                  <span className="font-medium text-[15px]">{faq.question}</span>
                  <HiChevronDown size={18} className={`text-text-tertiary transition-transform shrink-0 ${faqOpen === faq.id ? "rotate-180" : ""}`} />
                </button>
                {faqOpen === faq.id && <div className="px-7 pb-6 pt-4 text-[15px] text-text-secondary leading-relaxed">{faq.answer}</div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

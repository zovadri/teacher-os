"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { HiAcademicCap, HiStar, HiUserGroup, HiBookOpen, HiClipboardCheck, HiPlay, HiLightBulb, HiShieldCheck, HiSparkles, HiBadgeCheck } from "react-icons/hi"
import { mockCmsContent, mockTeamMembers, mockStats } from "@/lib/mock/data"

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const statsData = [
  { key: "students", value: mockStats.totalStudents, label: "طالب مسجل", icon: HiUserGroup },
  { key: "courses", value: mockStats.totalCourses, label: "كورس متكامل", icon: HiBookOpen },
  { key: "videos", value: mockStats.totalVideos, label: "فيديو تعليمي", icon: HiPlay },
  { key: "exams", value: mockStats.totalExams, label: "امتحان تفاعلي", icon: HiClipboardCheck },
]

const valuesIcons = [HiSparkles, HiLightBulb, HiBadgeCheck, HiStar]

export default function AboutPage() {
  const [counts, setCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps
    statsData.forEach((stat) => {
      let current = 0
      const increment = stat.value / steps
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.value) { current = stat.value; clearInterval(timer) }
        setCounts((prev) => ({ ...prev, [stat.key]: Math.floor(current) }))
      }, interval)
    })
  }, [])

  return (
    <>
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-primary/5 via-surface to-surface pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-6 backdrop-blur border border-primary/20">
                <HiAcademicCap size={14} /> من نحن
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mb-6">
                عن <span className="text-primary">TeacherOS</span>
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-xl">
                أول نظام تشغيل متكامل للمدرسين يقدم حلولاً تعليمية مبتكرة تجمع بين أحدث التقنيات وأساليب التدريس العريقة.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/courses" className="px-8 py-3 bg-primary text-white font-medium rounded-[16px] shadow-[0_0_20px_rgba(217,119,6,0.15)] hover:shadow-[0_0_30px_rgba(217,119,6,0.3)] hover:brightness-110 transition-all text-[15px]">
                  تصفح الكورسات
                </Link>
                <Link href="/contact" className="px-8 py-3 border border-border text-text-secondary font-medium rounded-[16px] hover:bg-surface-tertiary hover:text-text transition-all text-[15px]">
                  تواصل معنا
                </Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative rounded-[24px] overflow-hidden border border-border ">
                <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=85" alt="TeacherOS" className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {statsData.map((stat, i) => (
              <motion.div key={stat.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-card border border-border rounded-[24px] p-6 text-center  hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300">
                <stat.icon className="text-primary mx-auto mb-2" size={28} />
                <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{counts[stat.key] || 0}+</p>
                <p className="text-sm text-text-secondary">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=85" alt="رؤيتنا" className="rounded-[24px] w-full border border-border " />
            </motion.div>
            <motion.div {...fadeUp}>
              <span className="text-primary text-sm font-medium mb-2 block">نبذة عنا</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">شغفنا بالتعليم يدفعنا للأمام</h2>
              <p className="text-text-secondary leading-relaxed mb-6">{mockCmsContent.aboutVision}</p>
              <p className="text-text-secondary leading-relaxed">{mockCmsContent.aboutMission}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-primary text-sm font-medium mb-2 block">قيمنا</span>
            <h2 className="text-[28px] font-bold mb-4">المبادئ التي نقوم عليها</h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-[15px]">قيم راسخة توجه مسيرتنا نحو التميز والابتكار في التعليم.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mockCmsContent.aboutValues.map((value, i) => {
              const Icon = valuesIcons[i % valuesIcons.length]
              return (
                <motion.div key={value.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="group bg-card border border-border rounded-[24px] p-6 text-center transition-all duration-300  hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 hover:border-primary/20">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                    <Icon className="text-primary" size={28} />
                  </div>
                  <h3 className="font-semibold text-[18px] mb-2">{value.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-primary text-sm font-medium mb-2 block">فريق العمل</span>
            <h2 className="text-[28px] font-bold mb-4">تعرف على فريقنا</h2>
            <p className="text-text-secondary max-w-xl mx-auto">نخبة من المحترفين يعملون معاً لتقديم أفضل تجربة تعليمية.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mockTeamMembers.map((member, i) => (
              <motion.div key={member.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-card border border-border rounded-[24px] p-6 text-center transition-all duration-300  hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 hover:border-primary/20">
                <img src={member.image} alt={member.name} className="w-20 h-20 rounded-full mx-auto mb-4 bg-card object-cover border-2 border-border" />
                <h3 className="font-semibold mb-1">{member.name}</h3>
                <p className="text-xs text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div {...fadeUp} className="relative rounded-[24px] bg-gradient-to-br from-primary to-primary-dark p-8 md:p-16 text-center text-white overflow-hidden shadow-[0_8px_40px_rgba(217,119,6,0.2)]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.12),transparent_50%)]" />
            <div className="relative z-10">
              <h2 className="text-[28px] font-bold mb-4">مستعد لبدء رحلة التعلم؟</h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto text-[15px]">انضم إلى آلاف الطلاب وابدأ رحلتك نحو التفوق مع TeacherOS.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/courses" className="px-6 py-3 bg-white text-primary font-medium rounded-[16px] hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all text-[15px]">تصفح الكورسات</Link>
                <Link href="/contact" className="px-6 py-3 border border-white/20 text-white font-medium rounded-[16px] hover:bg-white/10 transition-all text-[15px]">تواصل معنا</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

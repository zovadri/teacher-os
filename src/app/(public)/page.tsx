"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { HiStar, HiAcademicCap, HiUserGroup, HiBookOpen, HiClipboardCheck, HiCurrencyDollar, HiShieldCheck, HiChartBar, HiPlay, HiChevronLeft, HiCheck, HiArrowLeft } from "react-icons/hi"
import { Card } from "@/components/ui/Card"
import { mockCourses } from "@/lib/mock/data"

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
}

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.08 },
}

const itemFade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
}

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 -right-20 w-72 h-72 rounded-full bg-primary/4 blur-3xl" />
      <div className="absolute -bottom-10 -left-20 w-96 h-96 rounded-full bg-info/3 blur-3xl" />
      <div className="absolute top-1/3 left-1/4 w-48 h-48 rounded-full bg-primary/3 blur-2xl" />
      <div className="absolute top-2/3 right-1/3 w-32 h-32 rounded-full bg-[#0EA5E9]/2 blur-2xl" />
    </div>
  )
}

export default function HomePage() {
  const [faqOpen, setFaqOpen] = useState<string | null>(null)
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  const testimonials = [
    { name: "محمد علي", text: "منصة رائعة! ساعدتني كثيراً في فهم النحو. الشرح مبسط والتدريبات ممتازة.", rating: 5, role: "طالب ثالثة ثانوي" },
    { name: "فاطمة أحمد", text: "أفضل منصة تعليمية جربتها. نظام الامتحانات والتصحيح التلقائي وفر عليا وقت كبير.", rating: 5, role: "طالبة ثالثة ثانوي" },
    { name: "أحمد خالد", text: "والدي اشترك في المنصة بناء على توصية. تجربة ممتازة وأسعار مناسبة.", rating: 4, role: "طالب ثانية ثانوي" },
    { name: "سارة محمود", text: "بعد ما جربت منصات كتير، TeacherOS هو الأحسن بجد. المتابعة والتقييم المستمر فرق كبير.", rating: 5, role: "طالبة أولى ثانوي" },
    { name: "يوسف أحمد", text: "نظام الاشتراك بالأكواد سهل جداً. والامتحانات التفاعلية بتخليني أحب المذاكرة.", rating: 5, role: "طالب أولى ثانوي" },
  ]

  useEffect(() => {
    if (testimonials.length <= 1) return
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <FloatingOrbs />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,119,6,0.05),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-28 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/8 text-primary text-xs font-medium rounded-full mb-6 border border-primary/15 backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="tracking-wider">Enterprise Education Platform</span>
                <span className="w-6 h-[1px] bg-primary/30" />
                <span className="text-[10px] opacity-60">v3.0</span>
              </motion.div>
              <h1 className="text-[40px] sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6 tracking-tight">
                <span className="bg-gradient-to-l from-text via-text to-primary bg-clip-text text-transparent">نظام تشغيل</span>
                <br />
                <span className="bg-gradient-to-l from-primary via-primary-light to-info bg-clip-text text-transparent">المدرس</span>
                <span className="text-primary">.</span>
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary font-normal mb-3 max-w-xl leading-relaxed">
                أول منصة متكاملة لإدارة عملك التعليمي بالكامل
              </p>
              <p className="text-[15px] text-text-tertiary leading-relaxed mb-12 max-w-lg">
                من إدارة الكورسات والطلاب إلى الامتحانات والاشتراكات والتقارير — كل ما تحتاجه في مكان واحد.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/demo"
                  className="group relative px-7 py-3.5 bg-primary text-white font-medium rounded-[16px] overflow-hidden transition-all duration-300 text-[15px] shadow-[0_4px_24px_rgba(217,119,6,0.2)] hover:shadow-[0_8px_40px_rgba(217,119,6,0.3)] hover:-translate-y-0.5"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    جرب المنصة مجاناً
                    <HiArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" size={16} />
                  </span>
                </Link>
                <Link
                  href="/courses"
                  className="px-7 py-3.5 bg-card/60 backdrop-blur-sm text-text-secondary border border-border font-medium rounded-[16px] hover:bg-card hover:text-text hover:border-primary/20 transition-all duration-300 text-[15px]"
                >
                  استعرض الكورسات
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10 pt-6 border-t border-border/40">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-surface flex items-center justify-center text-xs font-medium text-primary shadow-sm">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-card border-2 border-border flex items-center justify-center text-xs font-medium text-text-secondary">
                    +
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (<HiStar key={i} className="text-warning" size={15} />))}
                  </div>
                  <p className="text-xs text-text-tertiary">أكثر من ١٢٠٠ طالب مسجل • ٩٨٪ رضا</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative"
            >
              <div className="relative rounded-[24px] overflow-hidden border border-border shadow-[0_8px_40px_rgba(217,119,6,0.04),0_1px_0_rgba(255,255,255,0.9)_inset] bg-card/80 backdrop-blur-sm">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=85"
                  alt="TeacherOS"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 bg-card/40 backdrop-blur-md rounded-[16px] p-3 border border-border/40">
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center border border-primary/20">
                    <HiPlay className="text-primary ml-0.5" size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text">شاهد شرح المنصة</p>
                    <p className="text-xs text-text-tertiary">دقيقتان — تعرف على كل الميزات</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-primary/3 blur-2xl" />
              <div className="absolute -top-4 -right-4 w-40 h-40 rounded-full bg-info/3 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-28 relative">
        <FloatingOrbs />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-primary text-sm font-medium mb-3 block tracking-wider uppercase">Features</span>
            <h2 className="text-[32px] sm:text-[40px] font-bold mb-4 text-text leading-[1.1]">كل ما تحتاجه في مكان واحد</h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-[15px] leading-relaxed">
              صممنا TeacherOS ليكون كل ما يحتاجه المدرس لإدارة عمله التعليمي. من الألف إلى الياء.
            </p>
          </motion.div>

          <motion.div {...stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: HiBookOpen, title: "إدارة الكورسات", desc: "إنشاء وتنظيم الكورسات مع وحدات ودروس وفيديوهات وملفات." },
              { icon: HiClipboardCheck, title: "الامتحانات والواجبات", desc: "بنك أسئلة متكامل مع تصحيح تلقائي وتحليل النتائج." },
              { icon: HiUserGroup, title: "إدارة الطلاب", desc: "بيانات شاملة للطلاب مع متابعة التقدم والأداء." },
              { icon: HiCurrencyDollar, title: "الاشتراكات والأكواد", desc: "نظام اشتراكات مرن مع أكواد تفعيل متعددة." },
              { icon: HiChartBar, title: "التقارير والإحصائيات", desc: "لوحة تحليلية متكاملة مع رسوم بيانية وتقارير." },
              { icon: HiShieldCheck, title: "الصلاحيات والأمان", desc: "نظام صلاحيات متكامل لكل موظف مع سجل التدقيق." },
            ].map((feat, i) => (
              <motion.div key={feat.title} variants={itemFade}>
                <Card hover className="p-8 h-full">
                  <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-primary/8 to-primary/4 flex items-center justify-center mb-5 border border-primary/10 group-hover:border-primary/20 group-hover:from-primary/12 group-hover:to-primary/6 transition-all duration-500">
                    <feat.icon className="text-primary" size={22} />
                  </div>
                  <h3 className="font-semibold text-[18px] mb-2.5 text-text">{feat.title}</h3>
                  <p className="text-[15px] text-text-secondary leading-relaxed">{feat.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-28 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.02),transparent_70%)] border-y border-border/20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...stagger} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "١٢٥٠+", label: "طالب مسجل" },
              { value: "٨", label: "كورسات" },
              { value: "٥٢٠+", label: "فيديو تعليمي" },
              { value: "٩٨٪", label: "رضا العملاء" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={itemFade}
                className="bg-card border border-border/60 rounded-[20px] p-8 text-center hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent pointer-events-none" />
                <p className="text-[36px] font-bold bg-gradient-to-b from-primary to-info bg-clip-text text-transparent mb-1 font-mono tracking-tight">{stat.value}</p>
                <p className="text-sm text-text-secondary">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-28 relative">
        <FloatingOrbs />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <span className="text-primary text-sm font-medium mb-3 block tracking-wider uppercase">Courses</span>
              <h2 className="text-[32px] sm:text-[40px] font-bold text-text leading-[1.1]">أشهر الكورسات</h2>
            </div>
            <Link href="/courses" className="group inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline">
              عرض الكل
              <HiChevronLeft className="transition-transform duration-300 group-hover:-translate-x-1" size={16} />
            </Link>
          </motion.div>

          <motion.div {...stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCourses.filter(c => c.status === "published").slice(0, 4).map((course, i) => (
              <motion.div
                key={course.id}
                variants={itemFade}
                className="group bg-card border border-border/60 rounded-[20px] overflow-hidden hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/40 to-transparent" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-surface/70 backdrop-blur-md text-[11px] font-medium rounded-[10px] border border-border/40">{course.grade}</div>
                  {course.discountPrice && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-white text-[11px] font-medium rounded-[10px] shadow-[0_0_16px_rgba(217,119,6,0.2)]">خصم</div>
                  )}
                </div>
                <div className="p-7">
                  <h3 className="font-semibold text-[18px] mb-1.5 text-text group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="text-[13px] text-text-tertiary mb-4 leading-relaxed line-clamp-2">{course.shortDescription}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-border/30">
                    <div className="flex items-center gap-1">
                      <HiStar className="text-warning" size={14} />
                      <span className="text-xs font-medium text-text-secondary">{course.rating}</span>
                    </div>
                    <div className="text-left">
                      {course.discountPrice ? (
                        <>
                          <span className="text-xs text-text-tertiary line-through ml-2">{course.price} ج.م</span>
                          <span className="text-sm font-bold text-primary">{course.discountPrice} ج.م</span>
                        </>
                      ) : (
                        <span className="text-sm font-bold text-primary">{course.price} ج.م</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-28 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.015),transparent_70%)] border-y border-border/20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-primary text-sm font-medium mb-3 block tracking-wider uppercase">Testimonials</span>
            <h2 className="text-[32px] sm:text-[40px] font-bold text-text leading-[1.1] mb-4">ماذا يقول طلابنا</h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="bg-card border border-border/60 rounded-[20px] p-8 md:p-10 text-center shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {Array.from({ length: testimonials[testimonialIndex].rating }).map((_, j) => (
                      <HiStar key={j} className="text-warning" size={20} />
                    ))}
                  </div>
                  <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                    &ldquo;{testimonials[testimonialIndex].text}&rdquo;
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                      {testimonials[testimonialIndex].name[0]}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-text">{testimonials[testimonialIndex].name}</p>
                      <p className="text-xs text-text-tertiary">{testimonials[testimonialIndex].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-center gap-2 mt-6">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setTestimonialIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === testimonialIndex ? "bg-primary w-6" : "bg-border hover:bg-text-tertiary"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 relative">
        <FloatingOrbs />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-primary text-sm font-medium mb-3 block tracking-wider uppercase">Pricing</span>
            <h2 className="text-[32px] sm:text-[40px] font-bold text-text leading-[1.1] mb-4">اختر الباقة المناسبة</h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-[15px]">اشتراكات مرنة تناسب احتياجاتك. ابدأ رحلتك التعليمية اليوم.</p>
          </motion.div>

          <motion.div {...stagger} className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: "شهر", price: "٣٠٠", period: "شهرياً", desc: "مناسب للتجربة", popular: false, features: ["جميع الكورسات", "امتحانات غير محدودة", "دعم فني"] },
              { name: "٣ شهور", price: "٧٥٠", period: "ربع سنوي", desc: "الأكثر اختياراً", popular: true, features: ["جميع الكورسات", "امتحانات غير محدودة", "دعم فني", "توفير ١٥٠ ج.م"] },
              { name: "سنة", price: "٢٤٠٠", period: "سنوياً", desc: "أفضل قيمة", popular: false, features: ["جميع الكورسات", "امتحانات غير محدودة", "دعم فني VIP", "توفير ١٢٠٠ ج.م", "تقرير أداء شهري"] },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                variants={itemFade}
                className={`relative bg-card border border-border/60 rounded-[20px] p-8 transition-all duration-300 ${
                  plan.popular
                    ? "border-primary/30 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)]"
                    : "border-border/60 hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:-translate-y-0.5"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-info text-white text-xs font-medium rounded-full shadow-[0_0_16px_rgba(217,119,6,0.3)]">
                    الأكثر شيوعاً
                  </div>
                )}
                <h3 className="text-[20px] font-semibold text-text mb-1.5">{plan.name}</h3>
                <p className="text-sm text-text-tertiary mb-6">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-[36px] font-bold text-text">{plan.price}</span>
                  <span className="text-text-tertiary text-sm mr-1">ج.م / {plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-text-secondary">
                      <HiCheck className="text-primary shrink-0" size={16} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`block w-full text-center py-3 rounded-[16px] font-medium transition-all text-[15px] ${
                    plan.popular
                      ? "bg-primary text-white shadow-[0_4px_20px_rgba(217,119,6,0.2)] hover:shadow-[0_8px_30px_rgba(217,119,6,0.3)] hover:-translate-y-0.5"
                      : "border border-border text-text-secondary hover:bg-card hover:text-text hover:border-primary/20"
                  }`}
                >
                  ابدأ الآن
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-28 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.02),transparent_70%)] border-y border-border/20">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-primary text-sm font-medium mb-3 block tracking-wider uppercase">FAQ</span>
            <h2 className="text-[32px] sm:text-[40px] font-bold text-text leading-[1.1]">إجابات لاستفساراتك</h2>
          </motion.div>
          <div className="space-y-4">
            {[
              { q: "كيف يمكنني الاشتراك في المنصة؟", a: "يمكنك اختيار الباقة المناسبة من صفحة الباقات ثم إنشاء حساب واختيار طريقة الدفع. بعد تأكيد الدفع، سيتم تفعيل اشتراكك فوراً." },
              { q: "هل يمكنني تجربة المنصة قبل الاشتراك؟", a: "نعم! يمكنك زيارة صفحة النسخة التجريبية وتجربة جميع ميزات المنصة بالكامل لمدة يوم واحد بدون أي دفع." },
              { q: "كيف يحصل الطالب على كود الاشتراك؟", a: "يقوم المدرس بإنشاء أكواد اشتراك من لوحة التحكم وإرسالها للطلاب. كل كود فريد ولا يمكن استخدامه إلا مرة واحدة." },
              { q: "هل يمكنني مشاهدة الدروس على الموبايل؟", a: "نعم، المنصة متوافقة تماماً مع جميع الأجهزة بما في ذلك الموبايل والتابلت. يمكنك مشاهدة الدروس في أي وقت ومن أي مكان." },
              { q: "كيف يتم تصحيح الامتحانات؟", a: "الأسئلة الموضوعية (اختيار من متعدد، صح وخطأ) يتم تصحيحها تلقائياً. الأسئلة المقالية يقوم المدرس بتصحيحها يدوياً." },
            ].map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                <button
                  type="button"
                  onClick={() => setFaqOpen(faqOpen === `faq-${i}` ? null : `faq-${i}`)}
                  className="w-full text-right p-6 rounded-[16px] border border-border/60 bg-card hover:border-primary/15 hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300 flex items-center justify-between gap-4"
                >
                  <span className="font-medium text-sm text-text">{faq.q}</span>
                  <span className={`text-text-tertiary transition-transform duration-300 text-xs ${faqOpen === `faq-${i}` ? "rotate-180" : ""}`}>
                    <HiChevronLeft size={16} />
                  </span>
                </button>
                <AnimatePresence>
                  {faqOpen === `faq-${i}` && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-4 text-sm text-text-secondary leading-relaxed">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="relative rounded-[24px] bg-gradient-to-br from-primary via-primary-dark to-primary-700 p-10 md:p-20 text-center text-white overflow-hidden shadow-[0_8px_48px_rgba(217,119,6,0.15)]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.1),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,119,6,0.15),transparent_50%)]" />
            <div className="relative z-10">
              <h2 className="text-[32px] sm:text-[40px] font-bold mb-4 leading-[1.1]">مستعد لتطوير مسيرتك التعليمية؟</h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto text-[15px] leading-relaxed">
                انضم إلى أكثر من ١٢٥٠ طالب وابدأ رحلة التعليم مع أول نظام تشغيل متكامل للمدرس.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/register"
                  className="px-7 py-3.5 bg-white text-primary font-medium rounded-[16px] hover:bg-white/90 hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 transition-all duration-300 text-[15px]"
                >
                  إنشاء حساب جديد
                </Link>
                <Link
                  href="/contact"
                  className="px-7 py-3.5 border border-white/20 text-white font-medium rounded-[16px] hover:bg-white/8 hover:border-white/30 transition-all duration-300 text-[15px]"
                >
                  تواصل معنا
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

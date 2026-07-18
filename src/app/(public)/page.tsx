"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { HiChevronDown, HiStar, HiAcademicCap, HiUserGroup, HiBookOpen, HiClipboardCheck, HiCurrencyDollar, HiShieldCheck, HiChartBar, HiPlay, HiPhotograph } from "react-icons/hi"
import { mockCourses } from "@/lib/mock/data"

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

export default function HomePage() {
  const [faqOpen, setFaqOpen] = useState<string | null>(null)

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary/5 via-surface to-surface">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-6">
                <HiAcademicCap size={14} /> منصة تعليمية متكاملة
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
                نظام تشغيل
                <br />
                <span className="text-primary">المدرس</span> المتكامل
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-xl">
                أول منصة عربية متكاملة تتيح للمدرس إدارة الكورسات والطلاب والامتحانات والاشتراكات والأكواد والأرباح من مكان واحد.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/demo" className="px-8 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/25">
                  جرب المنصة مجاناً
                </Link>
                <Link href="/courses" className="px-8 py-3 border border-border text-text-secondary font-medium rounded-xl hover:bg-surface-tertiary transition-all">
                  استعرض الكورسات
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-surface flex items-center justify-center text-xs font-medium">
                      {i}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (<HiStar key={i} className="text-yellow-500" size={14} />))}
                  </div>
                  <p className="text-xs text-text-tertiary">أكثر من ١٢٠٠ طالب مسجل</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=85" alt="TeacherOS" className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                    <HiPlay className="text-white ml-0.5" size={20} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">شاهد شرح المنصة</p>
                    <p className="text-white/60 text-xs">دقيقتان</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-primary text-sm font-medium mb-2 block">مميزات المنصة</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">كل ما تحتاجه في مكان واحد</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">صممنا TeacherOS ليكون كل ما يحتاجه المدرس لإدارة عمله التعليمي بنجاح.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: HiBookOpen, title: "إدارة الكورسات", desc: "إنشاء وتنظيم الكورسات مع وحدات ودروس وفيديوهات وملفات." },
              { icon: HiClipboardCheck, title: "الامتحانات والواجبات", desc: "بنك أسئلة متكامل مع تصحيح تلقائي وتحليل النتائج." },
              { icon: HiUserGroup, title: "إدارة الطلاب", desc: "بيانات شاملة للطلاب مع متابعة التقدم والأداء." },
              { icon: HiCurrencyDollar, title: "الاشتراكات والأكواد", desc: "نظام اشتراكات مرن مع أكواد تفعيل متعددة." },
              { icon: HiChartBar, title: "التقارير والإحصائيات", desc: "لوحة تحليلية متكاملة مع رسوم بيانية وتقارير." },
              { icon: HiShieldCheck, title: "الصلاحيات والأمان", desc: "نظام صلاحيات متكامل لكل موظف مع سجل التدقيق." },
            ].map((feat, i) => (
              <motion.div key={feat.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="group p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feat.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold mb-2">{feat.title}</h3>
                <p className="text-sm text-text-secondary">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "١٢٥٠+", label: "طالب مسجل" },
              { value: "٨", label: "كورسات" },
              { value: "٥٢٠+", label: "فيديو" },
              { value: "٩٨٪", label: "رضا العملاء" },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-sm text-text-secondary">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-primary text-sm font-medium mb-2 block">الكورسات</span>
              <h2 className="text-3xl md:text-4xl font-bold">أشهر الكورسات</h2>
            </div>
            <Link href="/courses" className="text-primary text-sm font-medium hover:underline">عرض الكل ←</Link>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCourses.filter(c => c.status === "published").slice(0, 4).map((course, i) => (
              <motion.div key={course.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="group rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all">
                <div className="relative h-44 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur text-xs font-medium rounded-md">{course.grade}</div>
                  {course.discountPrice && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-white text-xs font-medium rounded-md">خصم</div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="text-xs text-text-secondary mb-3">{course.shortDescription}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <HiStar size={14} />
                      <span className="text-xs font-medium">{course.rating}</span>
                    </div>
                    <div className="text-left">
                      {course.discountPrice ? (
                        <>
                          <span className="text-xs text-text-tertiary line-through ml-1">{course.price} ج.م</span>
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
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-primary text-sm font-medium mb-2 block">آراء الطلاب</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">ماذا يقول طلابنا</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "محمد علي", text: "منصة رائعة! ساعدتني كثيراً في فهم النحو. الشرح مبسط والتدريبات ممتازة.", rating: 5, role: "طالب ثالثة ثانوي" },
              { name: "فاطمة أحمد", text: "أفضل منصة تعليمية جربتها. نظام الامتحانات والتصحيح التلقائي وفر عليا وقت كبير.", rating: 5, role: "طالبة ثالثة ثانوي" },
              { name: "أحمد خالد", text: "والدي اشترك في المنصة بناء على توصية. تجربة ممتازة وأسعار مناسبة.", rating: 4, role: "طالب ثانية ثانوي" },
            ].map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="p-6 rounded-xl border border-border bg-surface">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (<HiStar key={j} className="text-yellow-500" size={16} />))}
                </div>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">{t.name[0]}</div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-text-tertiary">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-primary text-sm font-medium mb-2 block">الباقات</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">اختر الباقة المناسبة</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">اشتراكات مرنة تناسب احتياجاتك.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: "شهر", price: "٣٠٠", period: "شهرياً", desc: "مناسب للتجربة", popular: false, features: ["جميع الكورسات", "امتحانات غير محدودة", "دعم فني"] },
              { name: "٣ شهور", price: "٧٥٠", period: "ربع سنوي", desc: "الأكثر اختياراً", popular: true, features: ["جميع الكورسات", "امتحانات غير محدودة", "دعم فني", "توفير ١٥٠ ج.م"] },
              { name: "سنة", price: "٢٤٠٠", period: "سنوياً", desc: "أفضل قيمة", popular: false, features: ["جميع الكورسات", "امتحانات غير محدودة", "دعم فني VIP", "توفير ١٢٠٠ ج.م", "تقرير أداء شهري"] },
            ].map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className={`relative p-8 rounded-2xl border-2 transition-all ${plan.popular ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" : "border-border hover:border-primary/30"}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-medium rounded-full">الأكثر شيوعاً</div>}
                <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-text-secondary mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-text-secondary text-sm mr-1">ج.م / {plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={`block w-full text-center py-3 rounded-xl font-medium transition-all ${plan.popular ? "bg-primary text-white hover:bg-primary-dark" : "border border-border hover:bg-surface-tertiary"}`}>
                  ابدأ الآن
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-surface-secondary">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-primary text-sm font-medium mb-2 block">الأسئلة الشائعة</span>
            <h2 className="text-3xl md:text-4xl font-bold">إجابات لاستفساراتك</h2>
          </motion.div>
          <div className="space-y-3">
            {[
              { q: "كيف يمكنني الاشتراك في المنصة؟", a: "يمكنك اختيار الباقة المناسبة من صفحة الباقات ثم إنشاء حساب واختيار طريقة الدفع. بعد تأكيد الدفع، سيتم تفعيل اشتراكك فوراً." },
              { q: "هل يمكنني تجربة المنصة قبل الاشتراك؟", a: "نعم! يمكنك زيارة صفحة النسخة التجريبية وتجربة جميع ميزات المنصة بالكامل لمدة يوم واحد بدون أي دفع." },
              { q: "كيف يحصل الطالب على كود الاشتراك؟", a: "يقوم المدرس بإنشاء أكواد اشتراك من لوحة التحكم وإرسالها للطلاب. كل كود فريد ولا يمكن استخدامه إلا مرة واحدة." },
              { q: "هل يمكنني مشاهدة الدروس على الموبايل؟", a: "نعم، المنصة متوافقة تماماً مع جميع الأجهزة بما في ذلك الموبايل والتابلت. يمكنك مشاهدة الدروس في أي وقت ومن أي مكان." },
              { q: "كيف يتم تصحيح الامتحانات؟", a: "الأسئلة الموضوعية (اختيار من متعدد، صح وخطأ) يتم تصحيحها تلقائياً. الأسئلة المقالية يقوم المدرس بتصحيحها يدوياً." },
            ].map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <button onClick={() => setFaqOpen(faqOpen === `faq-${i}` ? null : `faq-${i}`)} className="w-full text-right p-4 rounded-xl border border-border bg-surface hover:border-primary/30 transition-all flex items-center justify-between gap-4">
                  <span className="font-medium text-sm">{faq.q}</span>
                  <span className={`text-text-tertiary transition-transform ${faqOpen === `faq-${i}` ? "rotate-180" : ""}`}>▼</span>
                </button>
                {faqOpen === `faq-${i}` && (
                  <div className="px-4 pb-4 pt-2 text-sm text-text-secondary leading-relaxed">{faq.a}</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div {...fadeUp} className="relative rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-8 md:p-16 text-center text-white overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">مستعد لتطوير مسيرتك التعليمية؟</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">انضم إلى أكثر من ١٢٥٠ طالب وابدأ رحلة التعليم مع أول نظام تشغيل متكامل للمدرس.</p>
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

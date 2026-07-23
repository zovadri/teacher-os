"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  HiAcademicCap, HiStar, HiUserGroup, HiBookOpen, HiPlay,
  HiClipboardCheck, HiDocumentText, HiClock,
  HiChevronDown, HiShieldCheck, HiCurrencyDollar, HiCheck,
} from "react-icons/hi"
import { mockCourses, mockTeacher } from "@/lib/mock/data"
import { formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

export default function CourseDetailPage() {
  const params = useParams()
  const course = useMemo(() => mockCourses.find((c) => c.id === params.id), [params.id])
  const [expandedChapters, setExpandedChapters] = useState<string[]>([])

  const toggleChapter = (id: string) => {
    setExpandedChapters((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id])
  }

  const relatedCourses = useMemo(() => {
    if (!course) return []
    return mockCourses.filter((c) => c.id !== course.id && (c.grade === course.grade || c.subject === course.subject)).slice(0, 3)
  }, [course])

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <HiAcademicCap className="mx-auto text-text-tertiary mb-4" size={64} />
          <h2 className="text-2xl font-bold mb-2">الكورس غير موجود</h2>
          <p className="text-text-secondary mb-6">عذراً، لم نجد الكورس الذي تبحث عنه.</p>
          <Link href="/courses" className="px-6 py-3 bg-primary text-white font-medium rounded-[16px] shadow-[0_0_20px_rgba(217,119,6,0.15)] hover:shadow-[0_0_30px_rgba(217,119,6,0.3)] hover:brightness-110 transition-all text-[15px]">العودة للكورسات</Link>
        </div>
      </div>
    )
  }

  const chapters = course.chapters || []
  const totalLessons = chapters.reduce((sum, ch) => sum + ch.lessons.length, 0)
  const totalDuration = chapters.reduce((sum, ch) => sum + ch.lessons.reduce((s, l) => s + l.duration, 0), 0)

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-surface to-surface pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 py-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Breadcrumb items={[{ label: "الكورسات", href: "/courses" }, { label: course.title }]} className="mb-4" />
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="primary" size="sm">{course.grade}</Badge>
                <Badge variant="neutral" size="sm">الترم {course.term}</Badge>
                {course.isFree && <Badge variant="success" size="sm">مجاني</Badge>}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-text-secondary leading-relaxed mb-6">{course.shortDescription}</p>
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <HiStar key={i} className={i <= Math.round(course.rating) ? "text-yellow-500" : "text-text-tertiary"} size={18} />
                  ))}
                  <span className="text-sm text-text-secondary mr-2">{course.rating}/ظ¥</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-text-secondary">
                  <HiUserGroup size={16} />
                  <span>{course.studentsCount} طالب</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="text-left">
                  {course.discountPrice ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">{formatCurrency(course.discountPrice)}</span>
                      <span className="text-lg text-text-tertiary line-through">{formatCurrency(course.price)}</span>
                      <Badge variant="primary" size="sm">خصم {Math.round((1 - course.discountPrice / course.price) * 100)}%</Badge>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold text-primary">{course.isFree ? "مجاني" : formatCurrency(course.price)}</span>
                  )}
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="relative rounded-[24px] overflow-hidden border border-border ">
                <img src={course.banner || course.image} alt={course.title} className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <motion.div {...fadeUp}>
                <h2 className="text-2xl font-bold mb-4">عن الكورس</h2>
                <p className="text-text-secondary leading-relaxed">{course.description || course.shortDescription}</p>
              </motion.div>

              <motion.div {...fadeUp} className="p-7 rounded-[24px] border border-border bg-card ">
                <h2 className="text-xl font-bold mb-4">المدرس</h2>
                <div className="flex items-center gap-4">
                  <img src={mockTeacher.avatar} alt={mockTeacher.name} className="w-16 h-16 rounded-full bg-surface-tertiary" />
                  <div>
                    <h3 className="font-semibold text-lg">{mockTeacher.name}</h3>
                    <p className="text-sm text-text-secondary">{mockTeacher.bio}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-text-tertiary">
                      <span>{mockTeacher.experience} سنة خبرة</span>
                      <span className="flex items-center gap-1"><HiStar className="text-yellow-500" size={14} /> {mockTeacher.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div {...fadeUp}>
                <h2 className="text-2xl font-bold mb-6">محتوى الكورس</h2>
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-text-secondary">
                  <span className="flex items-center gap-1"><HiPlay size={16} /> {course.videosCount} فيديو</span>
                  <span className="flex items-center gap-1"><HiClipboardCheck size={16} /> {course.examsCount} امتحان</span>
                  <span className="flex items-center gap-1"><HiDocumentText size={16} /> {course.filesCount} ملف</span>
                  <span className="flex items-center gap-1"><HiBookOpen size={16} /> {totalLessons} درس</span>
                </div>
                {chapters.length > 0 ? (
                  <div className="space-y-4">
                    {chapters.map((chapter) => (
                      <div key={chapter.id} className="rounded-[24px] border border-border overflow-hidden ">
                        <Button onClick={() => toggleChapter(chapter.id)} className="w-full flex items-center justify-between p-5 bg-card hover:bg-surface-secondary transition-colors text-right">
                          <div className="flex items-center gap-3">
                            <HiChevronDown size={18} className={`text-text-tertiary transition-transform ${expandedChapters.includes(chapter.id) ? "rotate-180" : ""}`} />
                            <div>
                              <span className="font-semibold text-sm">{chapter.title}</span>
                              <p className="text-xs text-text-tertiary">{chapter.lessons.length} دروس</p>
                            </div>
                          </div>
                        </Button>
                        {expandedChapters.includes(chapter.id) && (
                          <div className="divide-y divide-border">
                            {chapter.lessons.map((lesson) => (
                              <div key={lesson.id} className="flex items-center justify-between p-4 pr-12 hover:bg-surface-secondary transition-colors">
                                <div className="flex items-center gap-3">
                                  {lesson.isFree ? (
                                    <Badge variant="success" size="sm">مجاني</Badge>
                                  ) : lesson.isLocked ? (
                                    <HiShieldCheck className="text-text-tertiary" size={16} />
                                  ) : (
                                    <HiPlay className="text-primary" size={16} />
                                  )}
                                  <span className={`text-sm ${lesson.isLocked ? "text-text-tertiary" : "text-text"}`}>{lesson.title}</span>
                                </div>
                                <span className="text-xs text-text-tertiary flex items-center gap-1"><HiClock size={14} /> {lesson.duration} د</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-text-secondary text-sm py-8 text-center">سيتم إضافة محتوى الكورس قريباً.</p>
                )}
              </motion.div>
            </div>

            <div className="space-y-8">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="sticky top-28 space-y-8">
                <div className="p-7 rounded-[24px] border border-border bg-card ">
                  <div className="text-center mb-6">
                    {course.discountPrice ? (
                      <>
                        <span className="text-3xl font-bold text-primary">{formatCurrency(course.discountPrice)}</span>
                        <span className="text-sm text-text-tertiary line-through block">{formatCurrency(course.price)}</span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-primary">{course.isFree ? "مجاني" : formatCurrency(course.price)}</span>
                    )}
                  </div>
                  <Button className="w-full py-3 bg-primary text-white font-medium rounded-[16px] shadow-[0_0_20px_rgba(217,119,6,0.15)] hover:shadow-[0_0_30px_rgba(217,119,6,0.3)] hover:brightness-110 text-[15px] transition-all mb-3">اشترك الآن</Button>
                  <Button className="w-full py-3 border border-border text-text-secondary font-medium rounded-[16px] hover:bg-surface-tertiary hover:text-text transition-all text-[15px]">تجربة مجانية</Button>
                </div>

                <div className="p-7 rounded-[24px] border border-border bg-card ">
                  <h3 className="font-semibold mb-4">معلومات الكورس</h3>
                  <div className="space-y-3">
                    {[
                      { icon: HiUserGroup, label: "عدد الطلاب", value: `${course.studentsCount} طالب` },
                      { icon: HiPlay, label: "عدد الدروس", value: `${course.lessonsCount} درس` },
                      { icon: HiClock, label: "إجمالي المدة", value: `${totalDuration} دقيقة` },
                      { icon: HiClipboardCheck, label: "عدد الامتحانات", value: `${course.examsCount} امتحان` },
                      { icon: HiDocumentText, label: "عدد الملفات", value: `${course.filesCount} ملف` },
                      { icon: HiCurrencyDollar, label: "عدد الواجبات", value: `${course.homeworkCount} واجب` },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-text-secondary"><item.icon size={16} className="text-primary" /><span>{item.label}</span></div>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-7 rounded-[24px] border border-border bg-card  text-center">
                  <HiAcademicCap className="mx-auto text-primary mb-3" size={32} />
                  <h3 className="font-semibold mb-2">شهادة معتمدة</h3>
                  <p className="text-xs text-text-secondary">احصل على شهادة إتمام معتمدة بعد إنهاء الكورس.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {relatedCourses.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div {...fadeUp} className="flex items-end justify-between mb-10">
              <div>
                <span className="text-primary text-sm font-medium mb-2 block">كورسات مشابهة</span>
                <h2 className="text-[28px] font-bold">قد تهمك أيضاً</h2>
              </div>
              <Link href="/courses" className="text-primary text-sm font-medium hover:underline shrink-0">عرض الكل ←</Link>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.map((rc, i) => (
                <motion.div key={rc.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <Link href={`/courses/${rc.id}`} className="group block bg-card rounded-[24px] border border-border overflow-hidden  hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 hover:border-primary/20 transition-all duration-300">
                    <div className="relative h-40 overflow-hidden">
                      <img src={rc.image} alt={rc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-3 right-3"><Badge variant="neutral" size="sm">{rc.grade}</Badge></div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold mb-1.5 group-hover:text-primary transition-colors">{rc.title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-yellow-500">
                          <HiStar size={14} />
                          <span className="text-xs font-medium">{rc.rating}</span>
                        </div>
                        <span className="text-sm font-bold text-primary">{rc.discountPrice ? formatCurrency(rc.discountPrice) : formatCurrency(rc.price)}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div {...fadeUp} className="relative rounded-[24px] bg-gradient-to-br from-primary to-primary-dark p-10 md:p-20 text-center text-white overflow-hidden shadow-[0_8px_40px_rgba(217,119,6,0.2)]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.12),transparent_50%)]" />
            <div className="relative z-10">
              <h2 className="text-[28px] font-bold mb-4">ابدأ رحلة التعلم الآن</h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto text-[15px]">انضم إلى {course.studentsCount}+ طالب واستفد من المحتوى التعليمي المتميز.</p>
              <Button className="px-6 py-3 bg-white text-primary font-medium rounded-[16px] hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all text-[15px]">اشترك في الكورس</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

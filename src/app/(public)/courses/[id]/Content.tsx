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
          <h2 className="text-2xl font-bold mb-2">ط§ظ„ظƒظˆط±ط³ ط؛ظٹط± ظ…ظˆط¬ظˆط¯</h2>
          <p className="text-text-secondary mb-6">ط¹ط°ط±ط§ظ‹طŒ ظ„ظ… ظ†ط¬ط¯ ط§ظ„ظƒظˆط±ط³ ط§ظ„ط°ظٹ طھط¨ط­ط« ط¹ظ†ظ‡.</p>
          <Link href="/courses" className="px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all">ط§ظ„ط¹ظˆط¯ط© ظ„ظ„ظƒظˆط±ط³ط§طھ</Link>
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
              <Breadcrumb items={[{ label: "ط§ظ„ظƒظˆط±ط³ط§طھ", href: "/courses" }, { label: course.title }]} className="mb-4" />
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="primary" size="sm">{course.grade}</Badge>
                <Badge variant="neutral" size="sm">ط§ظ„طھط±ظ… {course.term}</Badge>
                {course.isFree && <Badge variant="success" size="sm">ظ…ط¬ط§ظ†ظٹ</Badge>}
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
                  <span>{course.studentsCount} ط·ط§ظ„ط¨</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="text-left">
                  {course.discountPrice ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">{formatCurrency(course.discountPrice)}</span>
                      <span className="text-lg text-text-tertiary line-through">{formatCurrency(course.price)}</span>
                      <Badge variant="primary" size="sm">ط®طµظ… {Math.round((1 - course.discountPrice / course.price) * 100)}%</Badge>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold text-primary">{course.isFree ? "ظ…ط¬ط§ظ†ظٹ" : formatCurrency(course.price)}</span>
                  )}
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src={course.banner || course.image} alt={course.title} className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <motion.div {...fadeUp}>
                <h2 className="text-2xl font-bold mb-4">ط¹ظ† ط§ظ„ظƒظˆط±ط³</h2>
                <p className="text-text-secondary leading-relaxed">{course.description || course.shortDescription}</p>
              </motion.div>

              <motion.div {...fadeUp} className="p-6 rounded-xl border border-border bg-surface-secondary">
                <h2 className="text-xl font-bold mb-4">ط§ظ„ظ…ط¯ط±ط³</h2>
                <div className="flex items-center gap-4">
                  <img src={mockTeacher.avatar} alt={mockTeacher.name} className="w-16 h-16 rounded-full bg-surface-tertiary" />
                  <div>
                    <h3 className="font-semibold text-lg">{mockTeacher.name}</h3>
                    <p className="text-sm text-text-secondary">{mockTeacher.bio}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-text-tertiary">
                      <span>{mockTeacher.experience} ط³ظ†ط© ط®ط¨ط±ط©</span>
                      <span className="flex items-center gap-1"><HiStar className="text-yellow-500" size={14} /> {mockTeacher.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div {...fadeUp}>
                <h2 className="text-2xl font-bold mb-6">ظ…ط­طھظˆظ‰ ط§ظ„ظƒظˆط±ط³</h2>
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-text-secondary">
                  <span className="flex items-center gap-1"><HiPlay size={16} /> {course.videosCount} ظپظٹط¯ظٹظˆ</span>
                  <span className="flex items-center gap-1"><HiClipboardCheck size={16} /> {course.examsCount} ط§ظ…طھط­ط§ظ†</span>
                  <span className="flex items-center gap-1"><HiDocumentText size={16} /> {course.filesCount} ظ…ظ„ظپ</span>
                  <span className="flex items-center gap-1"><HiBookOpen size={16} /> {totalLessons} ط¯ط±ط³</span>
                </div>
                {chapters.length > 0 ? (
                  <div className="space-y-3">
                    {chapters.map((chapter) => (
                      <div key={chapter.id} className="rounded-xl border border-border overflow-hidden">
                        <Button onClick={() => toggleChapter(chapter.id)} className="w-full flex items-center justify-between p-4 bg-surface-secondary hover:bg-surface-tertiary transition-colors text-right">
                          <div className="flex items-center gap-3">
                            <HiChevronDown size={18} className={`text-text-tertiary transition-transform ${expandedChapters.includes(chapter.id) ? "rotate-180" : ""}`} />
                            <div>
                              <span className="font-semibold text-sm">{chapter.title}</span>
                              <p className="text-xs text-text-tertiary">{chapter.lessons.length} ط¯ط±ظˆط³</p>
                            </div>
                          </div>
                        </Button>
                        {expandedChapters.includes(chapter.id) && (
                          <div className="divide-y divide-border">
                            {chapter.lessons.map((lesson) => (
                              <div key={lesson.id} className="flex items-center justify-between p-4 pr-12 hover:bg-surface-secondary transition-colors">
                                <div className="flex items-center gap-3">
                                  {lesson.isFree ? (
                                    <Badge variant="success" size="sm">ظ…ط¬ط§ظ†ظٹ</Badge>
                                  ) : lesson.isLocked ? (
                                    <HiShieldCheck className="text-text-tertiary" size={16} />
                                  ) : (
                                    <HiPlay className="text-primary" size={16} />
                                  )}
                                  <span className={`text-sm ${lesson.isLocked ? "text-text-tertiary" : "text-text"}`}>{lesson.title}</span>
                                </div>
                                <span className="text-xs text-text-tertiary flex items-center gap-1"><HiClock size={14} /> {lesson.duration} ط¯</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-text-secondary text-sm py-8 text-center">ط³ظٹطھظ… ط¥ط¶ط§ظپط© ظ…ط­طھظˆظ‰ ط§ظ„ظƒظˆط±ط³ ظ‚ط±ظٹط¨ط§ظ‹.</p>
                )}
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="sticky top-28 space-y-6">
                <div className="p-6 rounded-xl border border-border bg-surface shadow-lg">
                  <div className="text-center mb-6">
                    {course.discountPrice ? (
                      <>
                        <span className="text-3xl font-bold text-primary">{formatCurrency(course.discountPrice)}</span>
                        <span className="text-sm text-text-tertiary line-through block">{formatCurrency(course.price)}</span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-primary">{course.isFree ? "ظ…ط¬ط§ظ†ظٹ" : formatCurrency(course.price)}</span>
                    )}
                  </div>
                  <Button className="w-full py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 mb-3">ط§ط´طھط±ظƒ ط§ظ„ط¢ظ†</Button>
                  <Button className="w-full py-3 border border-border text-text-secondary font-medium rounded-xl hover:bg-surface-tertiary transition-all">طھط¬ط±ط¨ط© ظ…ط¬ط§ظ†ظٹط©</Button>
                </div>

                <div className="p-6 rounded-xl border border-border bg-surface">
                  <h3 className="font-semibold mb-4">ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„ظƒظˆط±ط³</h3>
                  <div className="space-y-3">
                    {[
                      { icon: HiUserGroup, label: "ط¹ط¯ط¯ ط§ظ„ط·ظ„ط§ط¨", value: `${course.studentsCount} ط·ط§ظ„ط¨` },
                      { icon: HiPlay, label: "ط¹ط¯ط¯ ط§ظ„ط¯ط±ظˆط³", value: `${course.lessonsCount} ط¯ط±ط³` },
                      { icon: HiClock, label: "ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظ…ط¯ط©", value: `${totalDuration} ط¯ظ‚ظٹظ‚ط©` },
                      { icon: HiClipboardCheck, label: "ط¹ط¯ط¯ ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ", value: `${course.examsCount} ط§ظ…طھط­ط§ظ†` },
                      { icon: HiDocumentText, label: "ط¹ط¯ط¯ ط§ظ„ظ…ظ„ظپط§طھ", value: `${course.filesCount} ظ…ظ„ظپ` },
                      { icon: HiCurrencyDollar, label: "ط¹ط¯ط¯ ط§ظ„ظˆط§ط¬ط¨ط§طھ", value: `${course.homeworkCount} ظˆط§ط¬ط¨` },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-text-secondary"><item.icon size={16} className="text-primary" /><span>{item.label}</span></div>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-border bg-surface-secondary text-center">
                  <HiAcademicCap className="mx-auto text-primary mb-3" size={32} />
                  <h3 className="font-semibold mb-2">ط´ظ‡ط§ط¯ط© ظ…ط¹طھظ…ط¯ط©</h3>
                  <p className="text-xs text-text-secondary">ط§ط­طµظ„ ط¹ظ„ظ‰ ط´ظ‡ط§ط¯ط© ط¥طھظ…ط§ظ… ظ…ط¹طھظ…ط¯ط© ط¨ط¹ط¯ ط¥ظ†ظ‡ط§ط، ط§ظ„ظƒظˆط±ط³.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {relatedCourses.length > 0 && (
        <section className="py-16 bg-surface-secondary">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div {...fadeUp} className="flex items-end justify-between mb-10">
              <div>
                <span className="text-primary text-sm font-medium mb-2 block">ظƒظˆط±ط³ط§طھ ظ…ط´ط§ط¨ظ‡ط©</span>
                <h2 className="text-2xl md:text-3xl font-bold">ظ‚ط¯ طھظ‡ظ…ظƒ ط£ظٹط¶ط§ظ‹</h2>
              </div>
              <Link href="/courses" className="text-primary text-sm font-medium hover:underline shrink-0">ط¹ط±ط¶ ط§ظ„ظƒظ„ â†گ</Link>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.map((rc, i) => (
                <motion.div key={rc.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <Link href={`/courses/${rc.id}`} className="group block rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all">
                    <div className="relative h-40 overflow-hidden">
                      <img src={rc.image} alt={rc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-3 right-3"><Badge variant="neutral" size="sm">{rc.grade}</Badge></div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{rc.title}</h3>
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

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div {...fadeUp} className="relative rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-8 md:p-16 text-center text-white overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">ط§ط¨ط¯ط£ ط±ط­ظ„ط© ط§ظ„طھط¹ظ„ظ… ط§ظ„ط¢ظ†</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">ط§ظ†ط¶ظ… ط¥ظ„ظ‰ {course.studentsCount}+ ط·ط§ظ„ط¨ ظˆط§ط³طھظپط¯ ظ…ظ† ط§ظ„ظ…ط­طھظˆظ‰ ط§ظ„طھط¹ظ„ظٹظ…ظٹ ط§ظ„ظ…طھظ…ظٹط².</p>
              <Button className="px-8 py-3 bg-white text-primary font-medium rounded-xl hover:bg-white/90 transition-all">ط§ط´طھط±ظƒ ظپظٹ ط§ظ„ظƒظˆط±ط³</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

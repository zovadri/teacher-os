"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { HiOutlineBookOpen, HiOutlineClock, HiOutlineStar, HiOutlineChevronLeft, HiStar } from "react-icons/hi"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"

const enrolledCourseItems = [
  {
    id: "c-1", title: "النحو والصرف", grade: "ثالثة ثانوي", teacher: "أحمد محمد",
    progress: 75, totalLessons: 36, completedLessons: 27, rating: 4.9,
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&q=85",
    nextLesson: "المبتدأ والخبر - الجزء الثاني",
  },
  {
    id: "c-2", title: "البلاغة والأدب", grade: "ثالثة ثانوي", teacher: "أحمد محمد",
    progress: 45, totalLessons: 24, completedLessons: 11, rating: 4.7,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=85",
    nextLesson: "التشبيه وأنواعه",
  },
  {
    id: "c-3", title: "النصوص الأدبية", grade: "ثانية ثانوي", teacher: "أحمد محمد",
    progress: 90, totalLessons: 18, completedLessons: 16, rating: 4.8,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=85",
    nextLesson: "تحليل قصيدة 'عذل العواذل'",
  },
  {
    id: "c-4", title: "الإملاء والخط", grade: "أولى ثانوي", teacher: "أحمد محمد",
    progress: 30, totalLessons: 12, completedLessons: 4, rating: 4.5,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=85",
    nextLesson: "الهمزة المتوسطة",
  },
]

export default function StudentCoursesPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const courses = useMemo(() => enrolledCourseItems, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold">الكورسات المسجلة</h1>
          <p className="text-text-secondary text-sm">تابع تقدمك في الكورسات المسجل فيها</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={`/student/courses/${course.id}`}
                className="block rounded-xl border border-border bg-surface overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 right-3 left-3">
                    <h3 className="text-white font-semibold text-lg mb-0.5">{course.title}</h3>
                    <div className="flex items-center gap-3 text-white/70 text-xs">
                      <span>{course.grade}</span>
                      <span>•</span>
                      <span>{course.teacher}</span>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur text-xs font-medium flex items-center gap-1">
                    <HiStar className="text-yellow-500" size={12} />
                    {course.rating}
                  </div>
                </div>

                <div className="p-5">
                  {/* Progress bar */}
                  <div className="flex items-center justify-between text-xs text-text-secondary mb-1.5">
                    <span>التقدم</span>
                    <span>{course.progress}٪</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-tertiary overflow-hidden mb-3">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-700"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-text-tertiary">
                      <span>{course.completedLessons}/{course.totalLessons} درس</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
                      <span>متابعة</span>
                      <HiOutlineChevronLeft size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

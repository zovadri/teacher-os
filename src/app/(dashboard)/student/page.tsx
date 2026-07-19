"use client"

import { useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  HiOutlineBookOpen, HiOutlineClipboardCheck, HiOutlineChartBar,
  HiFire, HiStar, HiOutlineCalendar, HiOutlineClock,
  HiOutlineStar, HiOutlineChevronLeft, HiOutlineAcademicCap,
  HiOutlineLightningBolt, HiTrendingUp,
} from "react-icons/hi"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { StatsCard } from "@/components/ui/StatsCard"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Avatar } from "@/components/ui/Avatar"
import { Progress } from "@/components/ui/Progress"
import {
  mockStudents, mockCourses, mockExams, mockParentChildren, mockGamification,
} from "@/lib/mock/data"
import { formatDate, formatRelativeTime } from "@/lib/utils"

const student = mockStudents[0]

const enrolledCourseIds = ["c-1", "c-2", "c-3", "c-4"]
const enrolledCourses = mockCourses.filter((c) => enrolledCourseIds.includes(c.id))

const upcomingExams = mockExams.filter((e) => e.status === "active").slice(0, 3)

const recentActivity = [
  { id: "a1", text: "أكملت درس 'المبتدأ والخبر' في النحو والصرف", time: new Date(Date.now() - 1000 * 60 * 120), type: "lesson" },
  { id: "a2", text: "حصلت على ٩٥٪ في اختبار النحو الشهري", time: new Date(Date.now() - 1000 * 60 * 300), type: "exam" },
  { id: "a3", text: "بدأت درس 'إن وأخواتها' في النحو والصرف", time: new Date(Date.now() - 1000 * 60 * 60 * 24), type: "lesson" },
  { id: "a4", text: "أنهيت واجب البلاغة وقدمته", time: new Date(Date.now() - 1000 * 60 * 60 * 48), type: "homework" },
]

const weeklyXpData = [
  { day: "السبت", xp: 120 }, { day: "الأحد", xp: 200 }, { day: "الإثنين", xp: 80 },
  { day: "الثلاثاء", xp: 250 }, { day: "الأربعاء", xp: 180 }, { day: "الخميس", xp: 300 },
  { day: "الجمعة", xp: 90 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const xpNeeded = mockGamification.levels[student.level - 1]?.xpRequired || 500
const xpProgress = Math.min((student.xp / xpNeeded) * 100, 100)

export default function StudentDashboard() {
  const examsWithCourse = useMemo(
    () => upcomingExams.map((e) => ({ ...e, courseTitle: mockCourses.find((c) => c.id === e.courseId)?.title || "" })),
    []
  )

  return (
    <div className="min-h-screen">
      <DashboardHeader title="لوحة الطالب" subtitle="مرحباً بك! تابع تقدمك الدراسي" />
      <div className="p-4 md:p-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants}>
            <Card className="relative overflow-hidden">
              <div className="absolute left-0 top-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute left-10 bottom-0 w-24 h-24 bg-warning/5 rounded-full translate-y-1/3" />
              <div className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                <div className="flex items-center gap-4">
                  <Avatar src={student.avatar} name={student.name} size="xl" />
                  <div>
                    <h2 className="text-xl font-bold">{student.name}</h2>
                    <p className="text-sm text-text-secondary">{student.grade} • {student.subscription.planName}</p>
                    <Badge variant={student.subscription.status === "active" ? "success" : "warning"} dot className="mt-1">
                      {student.subscription.status === "active" ? "اشتراك نشط" : "اشتراك منتهي"}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 md:mr-auto">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/5 border border-primary/10">
                    <HiStar className="text-primary" size={20} />
                    <div>
                      <p className="text-xs text-text-tertiary">المستوى</p>
                      <p className="text-lg font-bold text-primary">{student.level}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-warning/5 border border-warning/10">
                    <HiFire className="text-warning" size={20} />
                    <div>
                      <p className="text-xs text-text-tertiary">التسلسل</p>
                      <p className="text-lg font-bold text-warning">{student.streak} يوم</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard title="الدروس المكتملة" value={24} icon={HiOutlineBookOpen} color="primary" subtitle="من أصل 36 درساً" />
            <StatsCard title="التسلسل الحالي" value={`${student.streak} يوم`} icon={HiFire} color="warning" />
            <StatsCard title="نقاط الخبرة" value={student.xp} icon={HiStar} color="success" change={{ value: 12, isPositive: true }} />
            <StatsCard title="الترتيب" value="#15" icon={HiOutlineChartBar} color="info" subtitle="من بين 50 طالباً" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>الكورسات الحالية</CardTitle>
                  <Link href="/student/courses" className="text-sm text-primary hover:underline">عرض الكل</Link>
                </CardHeader>
                <CardContent className="space-y-4">
                  {enrolledCourses.map((course, i) => {
                    const progress = [75, 45, 90, 30][i % 4]
                    return (
                      <Link key={course.id} href={`/student/courses/${course.id}`}>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-secondary transition-colors group"
                        >
                          <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                            <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium group-hover:text-primary transition-colors">{course.title}</p>
                            <p className="text-xs text-text-tertiary">{course.grade}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <Progress value={progress} size="sm" variant="primary" className="flex-1" />
                              <span className="text-xs text-text-secondary">{progress}%</span>
                            </div>
                          </div>
                          <HiOutlineChevronLeft className="text-text-tertiary group-hover:text-primary transition-colors" size={18} />
                        </motion.div>
                      </Link>
                    )
                  })}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>الامتحانات القادمة</CardTitle>
                  <Link href="/student/exams" className="text-sm text-primary hover:underline">عرض الكل</Link>
                </CardHeader>
                <CardContent className="space-y-3">
                  {examsWithCourse.map((exam) => (
                    <Link key={exam.id} href={`/student/exams/${exam.id}`}>
                      <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-secondary transition-colors group">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          <HiOutlineClipboardCheck className="text-primary" size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{exam.title}</p>
                          <p className="text-xs text-text-tertiary">{exam.courseTitle}</p>
                          <p className="text-xs text-text-tertiary mt-0.5">{exam.duration} دقيقة • {exam.totalGrade} درجة</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                  {examsWithCourse.length === 0 && (
                    <p className="text-sm text-text-tertiary text-center py-6">لا توجد امتحانات قادمة</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>النشاطات الأخيرة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {recentActivity.map((act, i) => (
                    <motion.div
                      key={act.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-secondary transition-colors"
                    >
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        act.type === "exam" ? "bg-success" : act.type === "homework" ? "bg-warning" : "bg-primary"
                      }`} />
                      <div className="min-w-0">
                        <p className="text-sm text-text">{act.text}</p>
                        <p className="text-xs text-text-tertiary mt-0.5">{formatRelativeTime(act.time)}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>نقاط الخبرة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                      <HiStar className="text-success" size={24} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{student.xp}</p>
                      <p className="text-xs text-text-tertiary">XP • المستوى {student.level}</p>
                    </div>
                  </div>
                  <Progress value={xpProgress} size="md" variant="success" showLabel />
                  <p className="text-xs text-text-tertiary mt-1">
                    {xpNeeded - student.xp} XP متبقية للمستوى {student.level + 1}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>نقاط الخبرة الأسبوعية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40" dir="ltr">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyXpData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                        <XAxis dataKey="day" tick={{ fill: "var(--color-text-tertiary)", fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: "var(--color-text-tertiary)", fontSize: 10 }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{
                            background: "var(--color-surface)",
                            border: "1px solid var(--color-border)",
                            borderRadius: "8px",
                            color: "var(--color-text)",
                            fontSize: "12px",
                          }}
                        />
                        <Bar dataKey="xp" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

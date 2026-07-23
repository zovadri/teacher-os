"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { HiOutlineUsers, HiOutlineAcademicCap, HiOutlineCash, HiOutlineUserAdd, HiOutlineEye } from "react-icons/hi"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import { formatCurrency, formatRelativeTime, formatDate, formatDuration, det } from "@/lib/utils"
import { mockStats, mockTeacher, mockExams, mockCourses, mockActivityLog, mockAnalytics } from "@/lib/mock/data"

const activityIcons: Record<string, React.ElementType> = {
  "تسجيل دخول": HiOutlineUserAdd, "إضافة طالب": HiOutlineUserAdd, "رفع فيديو": HiOutlineAcademicCap,
  "إنشاء امتحان": HiOutlineUsers, "إضافة واجب": HiOutlineAcademicCap, "تعديل كورس": HiOutlineAcademicCap,
  "حذف طالب": HiOutlineUsers, "إصدار شهادة": HiOutlineAcademicCap, "تسجيل اشتراك": HiOutlineCash,
  "تعديل صلاحيات": HiOutlineUsers,
}

const sparklineData = [30, 45, 38, 52, 48, 62, 55, 68, 72, 65, 78, 82]

function Sparkline({ data, color = "#4F46E5" }: { data: number[]; color?: string }) {
  if (!data || data.length < 2) return null
  const max = Math.max(...data); const min = Math.min(...data); const range = max - min || 1
  const w = 64; const h = 24
  const points = data.map((v, i) => { const x = (i / (data.length - 1)) * w; const y = h - ((v - min) / range) * (h - 4) - 2; return `${x},${y}` })
  const pathD = `M${points.join(" L")}`; const fillD = `${pathD} L${w},${h} L0,${h} Z`
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      <defs><linearGradient id={`sg-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.25" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <path d={fillD} fill={`url(#sg-${color.replace("#", "")})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function TeacherDashboard() {
  const today = new Date()
  const upcomingExams = useMemo(() => mockExams.filter((e) => e.status === "active").slice(0, 3), [])
  const [activities, setActivities] = useState(() => mockActivityLog.slice(0, 5))

  useEffect(() => {
    const interval = setInterval(() => setActivities((prev) => [...mockActivityLog].sort(() => det() - 0.5).slice(0, 5)), 10000)
    return () => clearInterval(interval)
  }, [])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "صباح الخير" : hour < 18 ? "مساء الخير" : "مساء الخير"

  return (
    <motion.div initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}>
        <PageHeader title={`${greeting}، ${mockTeacher.name}`} description="نظرة عامة على أداء منصتك اليوم. كل شيء يعمل بكفاءة." />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        className="space-y-6"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-4 bg-card/80 backdrop-blur-xl border border-border rounded-[16px] px-5 py-3 shadow-[0_4px_16px_rgba(79,70,229,0.03)]">
              <div className="text-center"><p className="text-2xl font-bold text-primary leading-none">5</p><p className="text-xs text-text-tertiary mt-1">حصص اليوم</p></div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center"><p className="text-2xl font-bold text-success leading-none">3</p><p className="text-xs text-text-tertiary mt-1">امتحانات</p></div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center"><p className="text-2xl font-bold text-warning leading-none">12</p><p className="text-xs text-text-tertiary mt-1">واجبات</p></div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link href="/teacher/students">
              <StatsCard title="إجمالي الطلاب" value={mockStats.totalStudents} icon={HiOutlineUsers} color="primary" trend={{ value: 12, isPositive: true }} />
            </Link>
            <Link href="/teacher/students">
              <StatsCard title="الطلاب النشطون" value={mockStats.activeStudents} icon={HiOutlineAcademicCap} color="success" trend={{ value: 8, isPositive: true }} />
            </Link>
            <Link href="/teacher/finance">
              <StatsCard title="الإيرادات الشهرية" value={formatCurrency(mockStats.monthlyRevenue)} icon={HiOutlineCash} color="warning" trend={{ value: 5, isPositive: false }} />
            </Link>
            <Link href="/teacher/students">
              <StatsCard title="الطلاب الجدد" value={mockStats.newStudents} icon={HiOutlineUserAdd} color="error" trend={{ value: 22, isPositive: true }} />
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }} className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>الإيرادات الشهرية</CardTitle>
                <p className="text-sm text-text-tertiary">تطور الإيرادات خلال العام</p>
              </CardHeader>
              <CardContent>
                <div dir="ltr" className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockAnalytics.monthlyRevenue} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                      <defs><linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} /><stop offset="95%" stopColor="#4F46E5" stopOpacity={0} /></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
                      <XAxis dataKey="month" tick={{ fill: "#9D9DB5", fontSize: 11 }} axisLine={{ stroke: "rgba(0,0,0,0.06)" }} tickLine={false} />
                      <YAxis tick={{ fill: "#9D9DB5", fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "16px", color: "#1A1A2E", fontSize: "13px", boxShadow: "0 8px 32px rgba(79,70,229,0.06)" }} formatter={(value: number | null) => { if (value == null) return []; return [formatCurrency(Number(value)), "الإيرادات"] }} />
                      <Area type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={2.5} fill="url(#revGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>الامتحانات القادمة</CardTitle>
                  <Link href="/teacher/exams" className="text-xs text-primary hover:text-primary-light transition-colors">عرض الكل</Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingExams.length === 0 ? (
                    <p className="text-sm text-text-tertiary text-center py-8">لا توجد امتحانات قادمة</p>
                  ) : (
                    upcomingExams.map((exam) => {
                      const course = mockCourses.find((c) => c.id === exam.courseId)
                      return (
                        <Link key={exam.id} href={`/teacher/exams/${exam.id}`}>
                          <div className="rounded-[16px] border border-border p-4 hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300 bg-card/40 backdrop-blur">
                            <p className="text-sm font-semibold text-text truncate">{exam.title}</p>
                            <p className="text-xs text-text-tertiary mt-1">{course?.title || exam.courseId}</p>
                            <div className="flex items-center gap-3 mt-3 text-xs text-text-tertiary">
                              <span>{formatDate(exam.startDate)}</span>
                              <span className="w-1 h-1 rounded-full bg-text-tertiary" />
                              <span>{formatDuration(exam.duration)}</span>
                            </div>
                          </div>
                        </Link>
                      )
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }} className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>آخر النشاطات</CardTitle>
                    <p className="text-sm text-text-tertiary">نشاطات حديثة على المنصة</p>
                  </div>
                  <span className="text-xs text-text-tertiary">تحديث تلقائي</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {activities.map((act, index) => {
                    const Icon = activityIcons[act.action] || HiOutlineUsers
                    return (
                      <motion.div key={act.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }} className="flex items-start gap-3 p-3 rounded-[16px] hover:bg-card/60 transition-colors">
                        <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0"><Icon className="w-4 h-4" /></div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-text"><span className="font-medium">{act.userName}</span><span className="text-text-tertiary"> {act.action} </span><span className="font-medium">{act.resource}</span></p>
                          <p className="text-xs text-text-tertiary mt-0.5">{formatRelativeTime(act.timestamp)}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>حالة النظام</CardTitle>
                <p className="text-sm text-text-tertiary">مؤشرات أداء المنصة</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  <div className="flex items-center justify-between p-3 rounded-[16px] bg-card/40 border border-border"><span className="text-sm text-text-tertiary">النظام</span><Badge variant="success" dot size="sm">يعمل بكفاءة</Badge></div>
                  <div className="flex items-center justify-between p-3 rounded-[16px] bg-card/40 border border-border"><span className="text-sm text-text-tertiary">آخر نسخ احتياطي</span><span className="text-sm text-text font-medium">منذ يومين</span></div>
                  <div className="space-y-2"><div className="flex items-center justify-between"><span className="text-sm text-text-tertiary">المساحة المستخدمة</span><span className="text-xs text-text-tertiary">65%</span></div><Progress value={65} variant="primary" size="sm" /></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

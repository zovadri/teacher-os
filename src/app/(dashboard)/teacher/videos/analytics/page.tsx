"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineChartBar, HiOutlineClock, HiOutlineCheckCircle,
  HiOutlineXCircle, HiOutlineEye, HiOutlineRefresh, HiOutlinePlay,
  HiOutlineUserGroup, HiOutlineTrendingUp, HiOutlineCalendar,
  HiOutlineVideoCamera,
} from "react-icons/hi"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, LineChart, Line } from "recharts"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Progress } from "@/components/ui/Progress"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

const videos = [
  { id: "v1", title: "شرح الباب الأول - الكيمياء", duration: "45:20", views: 128, completions: 85, avgWatch: "32:15" },
  { id: "v2", title: "تمارين على التفاعلات", duration: "32:10", views: 96, completions: 62, avgWatch: "24:30" },
  { id: "v3", title: "حل امتحان الكيمياء", duration: "55:00", views: 145, completions: 110, avgWatch: "42:18" },
  { id: "v4", title: "مراجعة ليلة الامتحان", duration: "60:00", views: 178, completions: 142, avgWatch: "48:45" },
  { id: "v5", title: "الاتزان الكيميائي", duration: "38:45", views: 87, completions: 58, avgWatch: "26:20" },
]

const students = [
  { id: "s1", name: "أحمد محمد", watch: 95, lastView: "2026-07-18", stoppedAt: "42:15", replays: 3, completed: true },
  { id: "s2", name: "مريم أحمد", watch: 78, lastView: "2026-07-17", stoppedAt: "35:20", replays: 5, completed: false },
  { id: "s3", name: "يوسف علي", watch: 100, lastView: "2026-07-18", stoppedAt: "45:20", replays: 1, completed: true },
  { id: "s4", name: "سارة خالد", watch: 62, lastView: "2026-07-16", stoppedAt: "28:10", replays: 7, completed: false },
  { id: "s5", name: "عمر حسن", watch: 45, lastView: "2026-07-15", stoppedAt: "20:30", replays: 2, completed: false },
  { id: "s6", name: "ندى سامي", watch: 88, lastView: "2026-07-18", stoppedAt: "40:00", replays: 4, completed: true },
  { id: "s7", name: "عبدالرحمن نور", watch: 30, lastView: "2026-07-14", stoppedAt: "13:45", replays: 0, completed: false },
  { id: "s8", name: "ليلى إبراهيم", watch: 100, lastView: "2026-07-18", stoppedAt: "45:20", replays: 2, completed: true },
  { id: "s9", name: "محمد كريم", watch: 55, lastView: "2026-07-16", stoppedAt: "25:00", replays: 3, completed: false },
  { id: "s10", name: "هند مصطفى", watch: 92, lastView: "2026-07-17", stoppedAt: "41:40", replays: 1, completed: true },
]

const watchSegments = [
  { seg: "0-5 د", views: 145 }, { seg: "5-10 د", views: 138 }, { seg: "10-15 د", views: 130 },
  { seg: "15-20 د", views: 125 }, { seg: "20-25 د", views: 118 }, { seg: "25-30 د", views: 105 },
  { seg: "30-35 د", views: 95 }, { seg: "35-40 د", views: 82 }, { seg: "40-45 د", views: 68 },
]

const trendData = [
  { day: "السبت", avg: 28 }, { day: "الأحد", avg: 32 }, { day: "الإثنين", avg: 35 },
  { day: "الثلاثاء", avg: 30 }, { day: "الأربعاء", avg: 38 }, { day: "الخميس", avg: 25 },
  { day: "الجمعة", avg: 42 },
]

const completionPie = [
  { name: "أكملوا", value: 4, fill: "#10b981" },
  { name: "لم يكملوا", value: 4, fill: "#f59e0b" },
  { name: "لم يبدأوا", value: 2, fill: "#e11d48" },
]

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function VideoAnalyticsPage() {
  const [selectedVideo, setSelectedVideo] = useState(videos[0])
  const totalViews = videos.reduce((s, v) => s + v.views, 0)
  const avgCompletion = Math.round(videos.reduce((s, v) => s + (v.completions / v.views) * 100, 0) / videos.length)
  const totalStudents = students.length
  const completedCount = students.filter((s) => s.completed).length

  return (
    <div className="min-h-screen">
      <Breadcrumb items={[{ label: "الفيديوهات", href: "/teacher/videos" }, { label: "تحليلات الفيديو" }]} />
      <PageHeader title="تحليلات الفيديو" description="إحصائيات مشاهدة ومتابعة الدروس المسجلة" />
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            <StatsCard title="إجمالي المشاهدات" value={totalViews} icon={HiOutlineEye} color="primary" />
            <StatsCard title="متوسط الإكمال" value={`${avgCompletion}%`} icon={HiOutlineChartBar} color="success" />
            <StatsCard title="الطلاب" value={totalStudents} icon={HiOutlineUserGroup} color="info" />
            <StatsCard title="أكملوا الفيديو" value={completedCount} icon={HiOutlineCheckCircle} color="success" />
            <StatsCard title="لم يكملوا" value={totalStudents - completedCount} icon={HiOutlineXCircle} color="error" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
            {videos.map((v) => (
              <button type="button" key={v.id} onClick={() => setSelectedVideo(v)}
                className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${selectedVideo.id === v.id ? "border-primary bg-primary/10 text-primary" : "border-border text-text-tertiary hover:bg-surface-secondary"}`}
              >{v.title}</button>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader><CardTitle>معلومات الفيديو</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5">
                  <HiOutlineVideoCamera className="w-8 h-8 text-primary" />
                  <div><p className="text-sm font-bold text-text">{selectedVideo.title}</p><p className="text-xs text-text-tertiary">المدة: {selectedVideo.duration}</p></div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-surface-secondary"><p className="text-xs text-text-tertiary">مشاهدات</p><p className="text-lg font-bold text-text">{selectedVideo.views}</p></div>
                  <div className="p-2 rounded-lg bg-surface-secondary"><p className="text-xs text-text-tertiary">إكمال</p><p className="text-lg font-bold text-success">{selectedVideo.completions}</p></div>
                  <div className="p-2 rounded-lg bg-surface-secondary"><p className="text-xs text-text-tertiary">متوسط المشاهدة</p><p className="text-lg font-bold text-text">{selectedVideo.avgWatch}</p></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>توزيع الإكمال</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart><Pie data={completionPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={65} label={({ name, value }) => `${name}: ${value}`}>{completionPie.map((e, i) => <Cell key={i} fill={e.fill} />)}</Pie></PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>أكثر الأجزاء مشاهدة</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={watchSegments} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis type="number" tick={{ fontSize: 10, fill: "var(--color-text-secondary)" }} />
                    <YAxis type="category" dataKey="seg" tick={{ fontSize: 9, fill: "var(--color-text-secondary)" }} width={55} />
                    <Tooltip />
                    <Bar dataKey="views" radius={[0, 4, 4, 0]}>
                      {watchSegments.map((_, i) => <Cell key={i} fill={i >= 5 ? "#10b981" : i >= 3 ? "#f59e0b" : "#e11d48"} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle>متوسط مدة المشاهدة اليومي</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--color-text-secondary)" }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="avg" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>الطلاب الذين لم يكملوا الفيديو</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {students.filter((s) => !s.completed).map((s) => (
                    <div key={s.id} className="flex items-center justify-between p-2.5 rounded-lg bg-surface-secondary border border-border">
                      <div className="flex items-center gap-2"><span className="text-sm font-medium text-text">{s.name}</span><span className="text-xs text-text-tertiary">{s.stoppedAt}</span></div>
                      <div className="flex items-center gap-2"><Progress value={s.watch} size="sm" variant="warning" className="w-16" /><span className="text-xs font-mono text-text-tertiary">{s.watch}%</span></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader><CardTitle>تفاصيل مشاهدة الطلاب</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {students.map((s) => (
                    <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-sm font-medium text-text w-28 truncate">{s.name}</span>
                        <Progress value={s.watch} size="md" variant={s.watch >= 80 ? "success" : s.watch >= 50 ? "warning" : "error"} className="w-24" />
                      </div>
                      <div className="flex items-center gap-4 text-xs text-text-tertiary">
                        <span>{s.watch}%</span>
                        <span>آخر: {s.lastView}</span>
                        <span>توقف: {s.stoppedAt}</span>
                        <span>إعادة: {s.replays}x</span>
                        <Badge variant={s.completed ? "success" : "warning"} size="sm">{s.completed ? "أكمل" : "لم يكمل"}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

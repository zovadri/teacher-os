"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineCash, HiOutlineTrendingUp, HiOutlineTrendingDown,
  HiOutlineUserGroup, HiOutlineBookOpen, HiOutlineChartBar,
  HiOutlineCurrencyDollar, HiOutlineFilter,
} from "react-icons/hi"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts"
import Link from "next/link"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Progress } from "@/components/ui/Progress"

interface CourseFinance {
  id: string; name: string; students: number; revenue: number; expenses: number
  profit: number; sessionsCount: number; revenuePerStudent: number
}

const coursesData: CourseFinance[] = [
  { id: "c1", name: "الكيمياء", students: 45, revenue: 112500, expenses: 35000, profit: 77500, sessionsCount: 24, revenuePerStudent: 2500 },
  { id: "c2", name: "الفيزياء", students: 32, revenue: 80000, expenses: 28000, profit: 52000, sessionsCount: 20, revenuePerStudent: 2500 },
  { id: "c3", name: "الرياضيات", students: 38, revenue: 95000, expenses: 30000, profit: 65000, sessionsCount: 22, revenuePerStudent: 2500 },
  { id: "c4", name: "العربي", students: 28, revenue: 56000, expenses: 20000, profit: 36000, sessionsCount: 18, revenuePerStudent: 2000 },
  { id: "c5", name: "الإنجليزي", students: 25, revenue: 50000, expenses: 18000, profit: 32000, sessionsCount: 16, revenuePerStudent: 2000 },
]

const monthlyRevenue = [
  { month: "يناير", كيمياء: 18000, فيزياء: 12000, رياضيات: 15000 },
  { month: "فبراير", كيمياء: 19000, فيزياء: 13000, رياضيات: 16000 },
  { month: "مارس", كيمياء: 20000, فيزياء: 14000, رياضيات: 17000 },
  { month: "أبريل", كيمياء: 18500, فيزياء: 13500, رياضيات: 16500 },
  { month: "مايو", كيمياء: 21000, فيزياء: 15000, رياضيات: 18000 },
  { month: "يونيو", كيمياء: 22000, فيزياء: 14000, رياضيات: 19000 },
]

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function CourseFinancePage() {
  const [selectedCourse, setSelectedCourse] = useState("all")

  const stats = useMemo(() => {
    const filtered = selectedCourse === "all" ? coursesData : coursesData.filter((c) => c.name === selectedCourse)
    const totalRevenue = filtered.reduce((s, c) => s + c.revenue, 0)
    const totalExpenses = filtered.reduce((s, c) => s + c.expenses, 0)
    const totalProfit = filtered.reduce((s, c) => s + c.profit, 0)
    const totalStudents = filtered.reduce((s, c) => s + c.students, 0)
    const margin = totalRevenue > 0 ? Math.round((totalProfit / totalRevenue) * 100) : 0
    return { totalRevenue, totalExpenses, totalProfit, totalStudents, margin }
  }, [selectedCourse])

  const pieData = coursesData.map((c) => ({ name: c.name, value: c.profit, fill: ["#3b82f6", "#10b981", "#f59e0b", "#e11d48", "#8b5cf6"][coursesData.indexOf(c)] }))

  return (
    <div className="min-h-screen">
      <Breadcrumb items={[{ label: "المالية", href: "/teacher/finance" }, { label: "إحصائيات الكورسات" }]} />
      <PageHeader title="إحصائيات مالية للكورسات" description="الإيرادات والمصروفات والأرباح لكل كورس" />
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <span className="text-sm text-text-tertiary">الكورس:</span>
            <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="all">كل الكورسات</option>
              {coursesData.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            <StatsCard title="الإيرادات" value={`${(stats.totalRevenue / 1000).toFixed(1)} ألف`} icon={HiOutlineTrendingUp} color="success" />
            <StatsCard title="المصروفات" value={`${(stats.totalExpenses / 1000).toFixed(1)} ألف`} icon={HiOutlineTrendingDown} color="error" />
            <StatsCard title="الأرباح" value={`${(stats.totalProfit / 1000).toFixed(1)} ألف`} icon={HiOutlineCash} color="primary" />
            <StatsCard title="الطلاب" value={stats.totalStudents} icon={HiOutlineUserGroup} color="info" />
            <StatsCard title="هامش الربح" value={`${stats.margin}%`} icon={HiOutlineChartBar} color="success" />
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>تفاصيل الكورسات</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {coursesData.map((course) => (
                    <div key={course.id} className="p-4 rounded-xl bg-surface-secondary border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <Link href={`/teacher/courses/${course.id}`} className="text-sm font-bold text-text hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{course.name}</Link>
                        <span className="text-xs text-text-tertiary">{course.students} طالب</span>
                      </div>
                      <div className="grid grid-cols-4 gap-3 text-xs">
                        <div><span className="text-text-tertiary">الإيرادات</span><p className="text-success font-bold">{course.revenue.toLocaleString()} ج.م</p></div>
                        <div><span className="text-text-tertiary">المصروفات</span><p className="text-error font-bold">{course.expenses.toLocaleString()} ج.م</p></div>
                        <div><span className="text-text-tertiary">الربح</span><p className="text-primary font-bold">{course.profit.toLocaleString()} ج.م</p></div>
                        <div><span className="text-text-tertiary">الهامش</span><p className="text-text font-bold">{Math.round((course.profit / course.revenue) * 100)}%</p></div>
                      </div>
                      <div className="mt-2">
                        <Progress value={Math.round((course.profit / course.revenue) * 100)} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>توزيع الأرباح</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, value }) => `${name} ${(value / 1000).toFixed(0)}أ`}>
                      {pieData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value.toLocaleString()} ج.م`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-2">
                  {pieData.map((e) => (
                    <div key={e.name} className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: e.fill }} /> {e.name}</span>
                      <span className="text-text font-medium">{e.value.toLocaleString()} ج.م</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader><CardTitle>الإيرادات الشهرية (الكيمياء - فيزياء - رياضيات)</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--color-text-secondary)" }} />
                    <YAxis tick={{ fontSize: 10, fill: "var(--color-text-secondary)" }} />
                    <Tooltip formatter={(value: number) => `${(value / 1000).toFixed(1)} ألف`} />
                    <Bar dataKey="كيمياء" name="الكيمياء" radius={[4, 4, 0, 0]} fill="#3b82f6" />
                    <Bar dataKey="فيزياء" name="الفيزياء" radius={[4, 4, 0, 0]} fill="#10b981" />
                    <Bar dataKey="رياضيات" name="الرياضيات" radius={[4, 4, 0, 0]} fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

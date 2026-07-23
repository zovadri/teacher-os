"use client"

import { motion } from "framer-motion"
import { HiOutlineCash, HiOutlineTrendingUp, HiOutlineTrendingDown, HiOutlineExclamationCircle } from "react-icons/hi"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line } from "recharts"
import Link from "next/link"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"

const monthlyData = [
  { month: "يناير", revenue: 45000, expenses: 28000, profit: 17000 },
  { month: "فبراير", revenue: 48000, expenses: 26000, profit: 22000 },
  { month: "مارس", revenue: 52000, expenses: 30000, profit: 22000 },
  { month: "أبريل", revenue: 49000, expenses: 27500, profit: 21500 },
  { month: "مايو", revenue: 55000, expenses: 29000, profit: 26000 },
  { month: "يونيو", revenue: 58000, expenses: 31000, profit: 27000 },
  { month: "يوليو", revenue: 62000, expenses: 32000, profit: 30000 },
]

const dailyRevenue = [
  { day: "السبت", value: 3200 }, { day: "الأحد", value: 4500 }, { day: "الإثنين", value: 3800 },
  { day: "الثلاثاء", value: 5100 }, { day: "الأربعاء", value: 4200 }, { day: "الخميس", value: 2800 },
  { day: "الجمعة", value: 1500 },
]

const debtsData = [
  { name: "أحمد محمد", amount: 1500, days: 45, status: "overdue" },
  { name: "مريم أحمد", amount: 1000, days: 30, status: "overdue" },
  { name: "يوسف علي", amount: 750, days: 15, status: "pending" },
  { name: "سارة خالد", amount: 2000, days: 60, status: "overdue" },
  { name: "عمر حسن", amount: 500, days: 5, status: "pending" },
]

const formatter = (value: number) => `${(value / 1000).toFixed(1)} ألف`

export default function FinanceDashboardPage() {
  const currentMonth = monthlyData[monthlyData.length - 1]
  const totalRevenue = monthlyData.reduce((s, m) => s + m.revenue, 0)
  const totalProfit = monthlyData.reduce((s, m) => s + m.profit, 0)
  const totalDebts = debtsData.reduce((s, d) => s + d.amount, 0)
  const overdueDebts = debtsData.filter((d) => d.status === "overdue").reduce((s, d) => s + d.amount, 0)

  return (
    <div className="space-y-6">
      <PageHeader
        title="لوحة التحكم المالية"
        description="الإيرادات والمصروفات والأرباح والديون"
        actions={
          <div className="flex items-center gap-3">
            <Link href="/teacher/finance/courses" className="text-sm text-primary hover:text-primary-light transition-colors">
              تفاصيل الكورسات المالية
            </Link>
            <Link href="/teacher/accounting" className="text-sm text-primary hover:text-primary-light transition-colors">
              المحاسبة
            </Link>
          </div>
        }
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
        className="space-y-6"
      >
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
          className="grid grid-cols-1 sm:grid-cols-5 gap-3"
        >
          <StatsCard title="إيرادات الشهر" value={`${(currentMonth.revenue / 1000).toFixed(1)} ألف`} icon={HiOutlineTrendingUp} color="success" />
          <StatsCard title="مصروفات الشهر" value={`${(currentMonth.expenses / 1000).toFixed(1)} ألف`} icon={HiOutlineTrendingDown} color="error" />
          <StatsCard title="صافي الربح" value={`${(currentMonth.profit / 1000).toFixed(1)} ألف`} icon={HiOutlineCash} color="primary" />
          <StatsCard title="إجمالي الديون" value={`${(totalDebts / 1000).toFixed(1)} ألف`} icon={HiOutlineExclamationCircle} color="warning" />
          <StatsCard title="ديون متأخرة" value={`${(overdueDebts / 1000).toFixed(1)} ألف`} icon={HiOutlineExclamationCircle} color="error" />
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>الإيرادات والمصروفات الشهرية</CardTitle></CardHeader>
            <CardContent>
              <div dir="ltr" className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#96A3B8" }} axisLine={{ stroke: "rgba(255,255,255,0.06)" }} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#96A3B8" }} axisLine={false} tickLine={false} tickFormatter={formatter} />
                    <Tooltip
                      contentStyle={{ background: "#151D2F", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", color: "#FFFFFF", fontSize: "13px", backdropFilter: "blur(12px)" }}
                      formatter={(value: number) => [formatter(value), ""]}
                    />
                    <Bar dataKey="revenue" name="الإيرادات" radius={[6, 6, 0, 0]} fill="#16C784" />
                    <Bar dataKey="expenses" name="المصروفات" radius={[6, 6, 0, 0]} fill="#FF5C74" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>الإيرادات اليومية</CardTitle></CardHeader>
            <CardContent>
              <div dir="ltr" className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailyRevenue}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#16C784" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#16C784" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#96A3B8" }} axisLine={{ stroke: "rgba(255,255,255,0.06)" }} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#96A3B8" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: "#151D2F", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", color: "#FFFFFF", fontSize: "13px", backdropFilter: "blur(12px)" }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#16C784" fill="url(#revGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Card>
            <CardHeader><CardTitle>صافي الربح - اتجاه شهري</CardTitle></CardHeader>
            <CardContent>
              <div dir="ltr" className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#96A3B8" }} axisLine={{ stroke: "rgba(255,255,255,0.06)" }} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#96A3B8" }} axisLine={false} tickLine={false} tickFormatter={formatter} />
                    <Tooltip
                      contentStyle={{ background: "#151D2F", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", color: "#FFFFFF", fontSize: "13px", backdropFilter: "blur(12px)" }}
                      formatter={(value: number) => [formatter(value), "صافي الربح"]}
                    />
                    <Line type="monotone" dataKey="profit" stroke="#D97706" strokeWidth={2} dot={{ r: 4, fill: "#D97706" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>الديون والأقساط المتأخرة</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {debtsData.map((d, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-[16px] bg-card border border-border">
                    <div>
                      <span className="text-sm font-medium text-text">{d.name}</span>
                      <span className="text-xs text-text-tertiary mr-2">{d.days} يوم</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-text">{d.amount} ج.م</span>
                      <Badge variant={d.status === "overdue" ? "error" : "warning"} size="sm">
                        {d.status === "overdue" ? "متأخرة" : "قيد الانتظار"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

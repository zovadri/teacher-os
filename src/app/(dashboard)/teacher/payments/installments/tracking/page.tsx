"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineCash, HiOutlineExclamationCircle, HiOutlineCheckCircle,
  HiOutlineClock, HiOutlineTrendingUp, HiOutlineBell, HiOutlineSearch,
  HiOutlineFilter, HiOutlineChevronDown, HiOutlineCurrencyDollar,
} from "react-icons/hi"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import toast from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Progress } from "@/components/ui/Progress"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

interface PaymentTransaction {
  id: string; date: string; amount: number; method: string
}
interface Installment {
  id: string; student: string; total: number; paid: number; dueDate: string; status: "paid" | "partial" | "overdue" | "pending"
  transactions: PaymentTransaction[]
}

function calcFine(dueDate: string): number {
  const due = new Date(dueDate)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - due.getTime()) / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays * 10 : 0
}

const installments: Installment[] = [
  { id: "i1", student: "أحمد محمد", total: 5000, paid: 5000, dueDate: "2026-06-01", status: "paid", transactions: [{ id: "t1", date: "2026-05-15", amount: 2500, method: "نقدي" }, { id: "t2", date: "2026-06-01", amount: 2500, method: "تحويل" }] },
  { id: "i2", student: "مريم أحمد", total: 4000, paid: 2000, dueDate: "2026-06-15", status: "overdue", transactions: [{ id: "t3", date: "2026-05-20", amount: 2000, method: "نقدي" }] },
  { id: "i3", student: "يوسف علي", total: 3000, paid: 3000, dueDate: "2026-07-01", status: "paid", transactions: [{ id: "t4", date: "2026-06-25", amount: 1500, method: "بطاقة" }, { id: "t5", date: "2026-07-01", amount: 1500, method: "نقدي" }] },
  { id: "i4", student: "سارة خالد", total: 6000, paid: 1500, dueDate: "2026-05-20", status: "overdue", transactions: [{ id: "t6", date: "2026-05-10", amount: 1500, method: "تحويل" }] },
  { id: "i5", student: "عمر حسن", total: 2500, paid: 0, dueDate: "2026-07-20", status: "pending", transactions: [] },
  { id: "i6", student: "ندى سامي", total: 4500, paid: 3500, dueDate: "2026-07-10", status: "partial", transactions: [{ id: "t7", date: "2026-06-01", amount: 2000, method: "نقدي" }, { id: "t8", date: "2026-06-20", amount: 1500, method: "نقدي" }] },
  { id: "i7", student: "عبدالرحمن نور", total: 3500, paid: 3500, dueDate: "2026-06-10", status: "paid", transactions: [{ id: "t9", date: "2026-05-30", amount: 3500, method: "تحويل" }] },
  { id: "i8", student: "ليلى إبراهيم", total: 5500, paid: 1000, dueDate: "2026-05-01", status: "overdue", transactions: [{ id: "t10", date: "2026-04-15", amount: 1000, method: "نقدي" }] },
  { id: "i9", student: "محمد كريم", total: 2000, paid: 500, dueDate: "2026-07-25", status: "pending", transactions: [{ id: "t11", date: "2026-07-01", amount: 500, method: "نقدي" }] },
  { id: "i10", student: "هند مصطفى", total: 4000, paid: 4000, dueDate: "2026-06-20", status: "paid", transactions: [{ id: "t12", date: "2026-06-10", amount: 2000, method: "بطاقة" }, { id: "t13", date: "2026-06-20", amount: 2000, method: "نقدي" }] },
  { id: "i11", student: "خالد سامي", total: 3000, paid: 1500, dueDate: "2026-07-05", status: "overdue", transactions: [{ id: "t14", date: "2026-06-15", amount: 1500, method: "نقدي" }] },
]

const monthlyData = [
  { month: "مايو", collected: 18000, target: 20000 },
  { month: "يونيو", collected: 22000, target: 25000 },
  { month: "يوليو", collected: 15000, target: 18000 },
]

const statusConfig: Record<string, { variant: "success" | "warning" | "error" | "neutral"; label: string }> = {
  paid: { variant: "success", label: "مدفوع" },
  partial: { variant: "warning", label: "جزئي" },
  overdue: { variant: "error", label: "متأخر" },
  pending: { variant: "neutral", label: "معلق" },
}

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function InstallmentTrackingPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const stats = useMemo(() => {
    const totalRemaining = installments.reduce((s, i) => s + (i.total - i.paid), 0)
    const overdue = installments.filter((i) => i.status === "overdue").reduce((s, i) => s + (i.total - i.paid), 0)
    const collected = installments.reduce((s, i) => s + i.paid, 0)
    const rate = installments.length > 0 ? Math.round((installments.filter((i) => i.status === "paid").length / installments.length) * 100) : 0
    return { totalRemaining, overdue, collected, rate }
  }, [])

  const filtered = useMemo(() => {
    return installments.filter((i) => {
      const matchSearch = i.student.includes(search)
      const matchStatus = statusFilter === "all" || i.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [search, statusFilter])

  return (
    <div className="min-h-screen">
      <Breadcrumb items={[{ label: "المدفوعات", href: "/teacher/payments/installments" }, { label: "متابعة الأقساط", href: "/teacher/payments/installments/tracking" }]} />
      <DashboardHeader title="متابعة الأقساط" subtitle="المتبقي - المتأخر - الغرامات - سجل السداد" />
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <StatsCard title="إجمالي المتبقي" value={`${(stats.totalRemaining / 1000).toFixed(1)} ألف`} icon={HiOutlineCurrencyDollar} color="error" />
            <StatsCard title="المتأخر" value={`${(stats.overdue / 1000).toFixed(1)} ألف`} icon={HiOutlineExclamationCircle} color="error" />
            <StatsCard title="المحصل هذا الشهر" value={`${(stats.collected / 1000).toFixed(1)} ألف`} icon={HiOutlineTrendingUp} color="success" />
            <StatsCard title="نسبة التحصيل" value={`${stats.rate}%`} icon={HiOutlineCheckCircle} color="primary" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <HiOutlineSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="بحث باسم الطالب..."
                className="w-full pr-10 pl-3 py-2.5 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2.5 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="all">كل الحالات</option>
              <option value="paid">مدفوع</option>
              <option value="partial">جزئي</option>
              <option value="overdue">متأخر</option>
              <option value="pending">معلق</option>
            </select>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader><CardTitle>الأقساط</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filtered.map((inst) => {
                    const sc = statusConfig[inst.status]
                    const remaining = inst.total - inst.paid
                    const fine = inst.status === "overdue" ? calcFine(inst.dueDate) : 0
                    const expanded = expandedId === inst.id
                    const daysUntilDue = Math.ceil((new Date(inst.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                    return (
                      <div key={inst.id}>
                        <div onClick={() => setExpandedId(expanded ? null : inst.id)}
                          className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border hover:bg-surface-tertiary transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <HiOutlineChevronDown className={`w-4 h-4 text-text-tertiary transition-transform ${expanded ? "rotate-180" : ""}`} />
                            <div>
                              <p className="text-sm font-medium text-text">{inst.student}</p>
                              <p className="text-xs text-text-tertiary">المتبقي: {remaining.toLocaleString()} ج.م | يستحق: {inst.dueDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {fine > 0 && <span className="text-xs text-error font-medium">غرامة: {fine} ج.م</span>}
                            {daysUntilDue <= 3 && daysUntilDue > 0 && <span className="text-xs text-warning">باقي {daysUntilDue} أيام</span>}
                            <Badge variant={sc.variant}>{sc.label}</Badge>
                          </div>
                        </div>
                        {expanded && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="overflow-hidden">
                            <div className="p-3 mr-4 space-y-3">
                              <div className="grid grid-cols-3 gap-3 text-xs">
                                <div className="p-2 rounded-lg bg-surface border border-border">
                                  <span className="text-text-tertiary">الإجمالي</span>
                                  <p className="text-text font-bold">{inst.total.toLocaleString()} ج.م</p>
                                </div>
                                <div className="p-2 rounded-lg bg-surface border border-border">
                                  <span className="text-text-tertiary">المدفوع</span>
                                  <p className="text-success font-bold">{inst.paid.toLocaleString()} ج.م</p>
                                </div>
                                <div className="p-2 rounded-lg bg-surface border border-border">
                                  <span className="text-text-tertiary">المتبقي</span>
                                  <p className="text-error font-bold">{remaining.toLocaleString()} ج.م</p>
                                </div>
                              </div>
                              <Progress value={Math.round((inst.paid / inst.total) * 100)} size="sm" />
                              <div className="space-y-1">
                                <p className="text-xs text-text-tertiary font-medium">سجل السداد:</p>
                                {inst.transactions.map((tx) => (
                                  <div key={tx.id} className="flex items-center justify-between p-2 rounded-lg bg-surface border border-border text-xs">
                                    <span className="text-text-tertiary">{tx.date}</span>
                                    <span className="text-text font-medium">{tx.amount.toLocaleString()} ج.م</span>
                                    <span className="text-text-tertiary">{tx.method}</span>
                                  </div>
                                ))}
                                {inst.transactions.length === 0 && <p className="text-xs text-text-tertiary">لا توجد معاملات سداد بعد</p>}
                              </div>
                              <button type="button" onClick={() => toast.success(`تم إرسال إشعار إلى ${inst.student}`)}
                                className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary-dark transition-all flex items-center gap-1"
                              ><HiOutlineBell className="w-3 h-3" /> إرسال إشعار</button>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader><CardTitle>التحصيل الشهري</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--color-text-secondary)" }} />
                    <YAxis tick={{ fontSize: 10, fill: "var(--color-text-secondary)" }} />
                    <Tooltip formatter={(value: number) => `${(value / 1000).toFixed(1)} ألف`} />
                    <Bar dataKey="collected" name="المحصل" radius={[4, 4, 0, 0]} fill="#10b981" />
                    <Bar dataKey="target" name="المستهدف" radius={[4, 4, 0, 0]} fill="#3b82f6" />
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

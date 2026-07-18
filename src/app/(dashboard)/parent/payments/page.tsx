"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HiOutlineCurrencyDollar, HiOutlineDownload, HiOutlineFilter, HiOutlineSearch } from "react-icons/hi"

const payments = Array.from({ length: 20 }, (_, i) => ({
  id: `pay-${i + 1}`,
  child: ["أحمد علي", "فاطمة علي", "محمد علي"][i % 3],
  amount: [300, 750, 1200, 600, 1500][i % 5],
  method: ["كاش", "فوري", "كود اشتراك"][i % 3],
  status: ["completed", "completed", "completed", "pending", "failed", "refunded"][i % 6],
  date: new Date(2026, 5 + Math.floor(i / 3), (i % 28) + 1),
  invoice: `INV-2026-${String(i + 1).padStart(4, "0")}`,
}))

const statusConfig: Record<string, { label: string; color: string }> = {
  completed: { label: "مكتمل", color: "bg-success/10 text-success" },
  pending: { label: "قيد الانتظار", color: "bg-warning/10 text-warning" },
  failed: { label: "فشل", color: "bg-error/10 text-error" },
  refunded: { label: "مسترجع", color: "bg-info/10 text-info" },
}

export default function ParentPaymentsPage() {
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const totalPaid = payments.filter((p) => p.status === "completed").reduce((s, p) => s + p.amount, 0)
  const pendingAmount = payments.filter((p) => p.status === "pending").reduce((s, p) => s + p.amount, 0)
  const thisMonth = payments.filter((p) => p.date.getMonth() === 6 && p.date.getFullYear() === 2026 && p.status === "completed")
  const thisMonthTotal = thisMonth.reduce((s, p) => s + p.amount, 0)

  const filtered = payments.filter((p) => {
    if (search && !p.child.includes(search) && !p.invoice.includes(search)) return false
    if (statusFilter !== "all" && p.status !== statusFilter) return false
    return true
  })

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold">المدفوعات</h1>
          <p className="text-text-secondary text-sm">سجل المدفوعات والفواتير</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "إجمالي المدفوع", value: `${totalPaid.toLocaleString()} ج.م`, icon: HiOutlineCurrencyDollar, bg: "bg-success/10", color: "text-success" },
            { label: "المدفوعات المعلقة", value: `${pendingAmount.toLocaleString()} ج.م`, icon: HiOutlineCurrencyDollar, bg: "bg-warning/10", color: "text-warning" },
            { label: "هذا الشهر", value: `${thisMonthTotal.toLocaleString()} ج.م`, icon: HiOutlineCurrencyDollar, bg: "bg-primary/10", color: "text-primary" },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-xl bg-surface border border-border"
            >
              <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center mb-3`}>
                <card.icon className={card.color} size={20} />
              </div>
              <p className="text-2xl font-bold mb-0.5">{card.value}</p>
              <p className="text-xs text-text-tertiary">{card.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <HiOutlineSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
            <input
              type="text" placeholder="بحث باسم الطالب أو رقم الفاتورة..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <select
            value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-border bg-surface text-sm focus:outline-none appearance-none cursor-pointer"
          >
            <option value="all">جميع الحالات</option>
            <option value="completed">مكتمل</option>
            <option value="pending">قيد الانتظار</option>
            <option value="failed">فشل</option>
            <option value="refunded">مسترجع</option>
          </select>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-secondary">
                  <th className="text-right p-4 font-medium text-text-secondary">الفاتورة</th>
                  <th className="text-right p-4 font-medium text-text-secondary">الطالب</th>
                  <th className="text-center p-4 font-medium text-text-secondary">المبلغ</th>
                  <th className="text-center p-4 font-medium text-text-secondary">طريقة الدفع</th>
                  <th className="text-center p-4 font-medium text-text-secondary">الحالة</th>
                  <th className="text-center p-4 font-medium text-text-secondary">التاريخ</th>
                  <th className="text-center p-4 font-medium text-text-secondary"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className="border-b border-border last:border-0 hover:bg-surface-secondary/50 transition-colors"
                  >
                    <td className="p-4 font-mono text-xs">{p.invoice}</td>
                    <td className="p-4 font-medium">{p.child}</td>
                    <td className="p-4 text-center font-bold">{p.amount.toLocaleString()} ج.م</td>
                    <td className="p-4 text-center text-text-secondary">{p.method}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusConfig[p.status].color}`}>
                        {statusConfig[p.status].label}
                      </span>
                    </td>
                    <td className="p-4 text-center text-text-secondary text-xs">{p.date.toLocaleDateString("ar-EG")}</td>
                    <td className="p-4 text-center">
                      <button className="p-1.5 rounded-lg hover:bg-surface-secondary text-text-secondary hover:text-primary transition-colors">
                        <HiOutlineDownload size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="p-12 text-center text-text-secondary">لا توجد مدفوعات تطابق البحث</div>
          )}
        </div>
      </div>
    </div>
  )
}

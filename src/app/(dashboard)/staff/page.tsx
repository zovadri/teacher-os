"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  HiOutlineUserGroup, HiOutlineAcademicCap, HiOutlineCurrencyDollar,
  HiOutlineKey, HiOutlineUserAdd, HiOutlineCheckCircle,
  HiOutlineExclamation, HiOutlineChevronLeft,
} from "react-icons/hi"

const overviewStats = [
  { icon: HiOutlineUserGroup, label: "إجمالي الطلاب", value: "١٢٥٠", color: "text-primary", bg: "bg-primary/10" },
  { icon: HiOutlineAcademicCap, label: "المدرسين", value: "٨", color: "text-info", bg: "bg-info/10" },
  { icon: HiOutlineCurrencyDollar, label:  "المدفوعات (شهري)", value: "١٣٥,٠٠٠ ج.م", color: "text-success", bg: "bg-success/10" },
  { icon: HiOutlineKey, label: "الأكواد المفعلة", value: "١,٨٥٠", color: "text-warning", bg: "bg-warning/10" },
]

const recentRegistrations = Array.from({ length: 5 }, (_, i) => ({
  id: `reg-${i + 1}`,
  name: `طالب ${i + 1}`,
  type: i < 3 ? "student" : "parent",
  date: new Date(2026, 6, 15 - i),
  status: "active",
}))

const paymentApprovals = Array.from({ length: 4 }, (_, i) => ({
  id: `pa-${i + 1}`,
  student: `طالب ${i + 5}`,
  amount: [300, 750, 1200, 600][i],
  method: ["فوري", "كاش", "كود", "فوري"][i],
  date: new Date(2026, 6, 14 - i),
}))

const systemAlerts = [
  { type: "info", message: "٣ اشتراكات ستنتهي اليوم", time: "منذ ساعة" },
  { type: "warning", message: "مساحة التخزين ٧٥٪ مستخدمة", time: "منذ ٣ ساعات" },
  { type: "error", message: "فشل في معالجة دفع لطالب", time: "منذ ٥ ساعات" },
]

export default function StaffDashboard() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">لوحة التحكم</h1>
            <p className="text-text-secondary text-sm">نظرة عامة على النظام</p>
          </div>
          <Link
            href="/staff/manage"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-all"
          >
            <HiOutlineUserAdd size={18} />
            إدارة الموظفين
          </Link>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {overviewStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-xl bg-surface border border-border"
            >
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={stat.color} size={20} />
              </div>
              <p className="text-xl font-bold mb-0.5">{stat.value}</p>
              <p className="text-xs text-text-tertiary">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Recent Registrations */}
          <div className="p-6 rounded-xl bg-surface border border-border">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <HiOutlineUserAdd className="text-primary" size={18} />
              أحدث التسجيلات
            </h2>
            <div className="space-y-3">
              {recentRegistrations.map((reg) => (
                <div key={reg.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {reg.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{reg.name}</p>
                      <p className="text-[10px] text-text-tertiary">{reg.type === "student" ? "طالب" : "ولي أمر"}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-text-tertiary">{reg.date.toLocaleDateString("ar-EG")}</span>
                </div>
              ))}
            </div>
            <Link href="/staff/students" className="mt-3 text-xs text-primary hover:underline block">عرض الكل</Link>
          </div>

          {/* Payment Approvals */}
          <div className="p-6 rounded-xl bg-surface border border-border">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <HiOutlineCurrencyDollar className="text-warning" size={18} />
              موافقات الدفع
            </h2>
            <div className="space-y-3">
              {paymentApprovals.map((pa) => (
                <div key={pa.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary">
                  <div>
                    <p className="text-sm font-medium">{pa.student}</p>
                    <p className="text-[10px] text-text-tertiary">{pa.method} • {pa.date.toLocaleDateString("ar-EG")}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold">{pa.amount} ج.م</p>
                    <div className="flex gap-1 mt-1">
                      <button type="button" className="px-2 py-0.5 rounded bg-success/10 text-success text-[10px] hover:bg-success/20">قبول</button>
                      <button type="button" className="px-2 py-0.5 rounded bg-error/10 text-error text-[10px] hover:bg-error/20">رفض</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Alerts */}
          <div className="p-6 rounded-xl bg-surface border border-border">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <HiOutlineExclamation className="text-warning" size={18} />
              تنبيهات النظام
            </h2>
            <div className="space-y-3">
              {systemAlerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    alert.type === "error" ? "bg-error" :
                    alert.type === "warning" ? "bg-warning" : "bg-info"
                  }`} />
                  <div>
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-[10px] text-text-tertiary">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

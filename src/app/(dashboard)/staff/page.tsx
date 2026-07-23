"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  HiOutlineUserGroup, HiOutlineAcademicCap, HiOutlineCurrencyDollar,
  HiOutlineKey, HiOutlineUserAdd, HiOutlineCheckCircle,
  HiOutlineExclamation, HiOutlineChevronLeft,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import Button from "@/components/ui/Button"

const overviewStats = [
  { icon: HiOutlineUserGroup, label: "إجمالي الطلاب", value: "١٢٥٠", color: "primary" as const },
  { icon: HiOutlineAcademicCap, label: "المدرسين", value: "٨", color: "info" as const },
  { icon: HiOutlineCurrencyDollar, label: "المدفوعات (شهري)", value: "١٣٥,٠٠٠ ج.م", color: "success" as const },
  { icon: HiOutlineKey, label: "الأكواد المفعلة", value: "١,٨٥٠", color: "warning" as const },
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
    <div>
      <DashboardHeader title="لوحة التحكم" subtitle="نظرة عامة على النظام" />
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div />
          <Link href="/staff/manage">
            <Button variant="primary" leftIcon={<HiOutlineUserAdd size={18} />}>
              إدارة الموظفين
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {overviewStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <StatsCard
                title={stat.label}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
              />
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="flex items-center gap-2">
                  <HiOutlineUserAdd className="text-primary" size={18} />
                  أحدث التسجيلات
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentRegistrations.map((reg) => (
                <div key={reg.id} className="flex items-center justify-between p-3 rounded-[12px] bg-card/40 border border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-100 border border-primary-200 flex items-center justify-center text-xs font-bold text-primary">
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
              <Link href="/staff/students" className="text-sm text-primary hover:underline block mt-2">عرض الكل</Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <span className="flex items-center gap-2">
                  <HiOutlineCurrencyDollar className="text-warning" size={18} />
                  موافقات الدفع
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {paymentApprovals.map((pa) => (
                <div key={pa.id} className="flex items-center justify-between p-3 rounded-[12px] bg-card/40 border border-border">
                  <div>
                    <p className="text-sm font-medium">{pa.student}</p>
                    <p className="text-[10px] text-text-tertiary">{pa.method} • {pa.date.toLocaleDateString("ar-EG")}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold">{pa.amount} ج.م</p>
                    <div className="flex gap-1 mt-1">
                      <button type="button" className="px-2 py-0.5 rounded-[8px] bg-success/10 text-success text-[10px] hover:bg-success/20 transition-colors">قبول</button>
                      <button type="button" className="px-2 py-0.5 rounded-[8px] bg-error/10 text-error text-[10px] hover:bg-error/20 transition-colors">رفض</button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <span className="flex items-center gap-2">
                  <HiOutlineExclamation className="text-warning" size={18} />
                  تنبيهات النظام
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

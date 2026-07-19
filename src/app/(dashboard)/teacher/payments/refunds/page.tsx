"use client"

import { motion } from "framer-motion"
import { HiOutlineRefresh, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineCash, HiOutlineClock } from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

interface Refund {
  id: string; student: string; amount: number; date: string; reason: string; status: "completed" | "pending" | "rejected"
}

const refunds: Refund[] = [
  { id: "f1", student: "أحمد محمد", amount: 500, date: "2026-07-14", reason: "إلغاء اشتراك", status: "completed" },
  { id: "f2", student: "مريم أحمد", amount: 250, date: "2026-07-12", reason: "خطأ في الدفع", status: "pending" },
  { id: "f3", student: "يوسف علي", amount: 1000, date: "2026-07-10", reason: "عدم رضا عن الخدمة", status: "rejected" },
  { id: "f4", student: "سارة خالد", amount: 300, date: "2026-07-08", reason: "مبلغ مضاعف", status: "completed" },
  { id: "f5", student: "ندى سامي", amount: 750, date: "2026-07-05", reason: "إلغاء كورس", status: "pending" },
]

const statusVariant: Record<string, "success" | "warning" | "error"> = { completed: "success", pending: "warning", rejected: "error" }
const statusLabel: Record<string, string> = { completed: "مكتمل", pending: "قيد الانتظار", rejected: "مرفوض" }

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function RefundsPage() {
  const totalRefunded = refunds.filter((r) => r.status === "completed").reduce((s, r) => s + r.amount, 0)
  const pendingAmount = refunds.filter((r) => r.status === "pending").reduce((s, r) => s + r.amount, 0)

  return (
    <div className="min-h-screen">
      <Breadcrumb items={[{ label: "المدفوعات", href: "/teacher/payments/installments" }, { label: "المسترجع" }]} />
      <DashboardHeader title="المسترجع" subtitle="إدارة طلب استرداد المبالغ المالية" />
      <div className="p-4 md:p-6 space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <StatsCard title="إجمالي الطلبات" value={refunds.length} icon={HiOutlineRefresh} color="primary" />
            <StatsCard title="مكتملة" value={refunds.filter((r) => r.status === "completed").length} icon={HiOutlineCheckCircle} color="success" />
            <StatsCard title="مرفوضة" value={refunds.filter((r) => r.status === "rejected").length} icon={HiOutlineXCircle} color="error" />
            <StatsCard title="قيد الانتظار" value={refunds.filter((r) => r.status === "pending").length} icon={HiOutlineClock} color="warning" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader><CardTitle>طلبات الاسترداد</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {refunds.map((r) => (
                    <div key={r.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                          r.status === "completed" ? "bg-success/10" : r.status === "rejected" ? "bg-error/10" : "bg-warning/10"
                        }`}>
                          <HiOutlineCash className={`w-4 h-4 ${
                            r.status === "completed" ? "text-success" : r.status === "rejected" ? "text-error" : "text-warning"
                          }`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text">{r.student}</p>
                          <p className="text-xs text-text-tertiary">{r.date} - {r.reason}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-primary">{r.amount} ج.م</span>
                        <Badge variant={statusVariant[r.status]} size="sm">{statusLabel[r.status]}</Badge>
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

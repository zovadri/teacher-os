"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { HiOutlineCash, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineClock } from "react-icons/hi"
import Link from "next/link"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import DataTable from "@/components/ui/DataTable"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

interface Installment {
  id: string; student: string; amount: number; paid: number; remaining: number; dueDate: string; status: "paid" | "partial" | "overdue" | "pending"
}

const installments: Installment[] = [
  { id: "i1", student: "أحمد محمد", amount: 2000, paid: 2000, remaining: 0, dueDate: "2026-07-01", status: "paid" },
  { id: "i2", student: "مريم أحمد", amount: 2000, paid: 1000, remaining: 1000, dueDate: "2026-07-15", status: "partial" },
  { id: "i3", student: "يوسف علي", amount: 1500, paid: 500, remaining: 1000, dueDate: "2026-06-30", status: "overdue" },
  { id: "i4", student: "سارة خالد", amount: 2500, paid: 0, remaining: 2500, dueDate: "2026-08-01", status: "pending" },
  { id: "i5", student: "عمر حسن", amount: 1800, paid: 1800, remaining: 0, dueDate: "2026-06-15", status: "paid" },
  { id: "i6", student: "ندى سامي", amount: 2000, paid: 1500, remaining: 500, dueDate: "2026-07-20", status: "partial" },
  { id: "i7", student: "عبدالرحمن نور", amount: 1500, paid: 1500, remaining: 0, dueDate: "2026-07-10", status: "paid" },
  { id: "i8", student: "ليلى إبراهيم", amount: 2200, paid: 0, remaining: 2200, dueDate: "2026-08-15", status: "pending" },
]

const statusVariant: Record<string, "success" | "warning" | "error" | "neutral"> = {
  paid: "success", partial: "warning", overdue: "error", pending: "neutral",
}
const statusLabel: Record<string, string> = { paid: "مدفوع", partial: "جزئي", overdue: "متأخر", pending: "قيد الانتظار" }

const columns = [
  { key: "student", label: "الطالب", render: (r: Installment) => <span className="text-sm font-medium text-text">{r.student}</span> },
  { key: "amount", label: "المبلغ", render: (r: Installment) => <span className="text-sm text-text">{r.amount} ج.م</span> },
  { key: "paid", label: "المدفوع", render: (r: Installment) => <span className="text-sm text-text">{r.paid} ج.م</span> },
  { key: "remaining", label: "المتبقي", render: (r: Installment) => <span className={`text-sm font-semibold ${r.remaining > 0 ? "text-error" : "text-success"}`}>{r.remaining} ج.م</span> },
  { key: "dueDate", label: "تاريخ الاستحقاق", render: (r: Installment) => <span className="text-xs text-text-tertiary">{r.dueDate}</span> },
  { key: "status", label: "الحالة", render: (r: Installment) => <Badge variant={statusVariant[r.status]} size="sm">{statusLabel[r.status]}</Badge> },
  { key: "actions", label: "الإجراءات", render: (r: Installment) => <Link href="/teacher/payments/installments/tracking" className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors">متابعة</Link> },
]

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function InstallmentsPage() {
  const totalAmount = installments.reduce((s, i) => s + i.amount, 0)
  const totalPaid = installments.reduce((s, i) => s + i.paid, 0)
  const totalRemaining = installments.reduce((s, i) => s + i.remaining, 0)
  const overdue = installments.filter((i) => i.status === "overdue").length

  return (
    <div className="min-h-screen">
      <Breadcrumb items={[{ label: "المدفوعات", href: "/teacher/payments/installments" }, { label: "الأقساط" }]} />
      <DashboardHeader title="الأقساط" subtitle="متابعة الأقساط والمدفوعات" />
      <div className="p-4 md:p-6 space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <StatsCard title="إجمالي المستحق" value={`${totalAmount} ج.م`} icon={HiOutlineCash} color="primary" />
            <StatsCard title="إجمالي المدفوع" value={`${totalPaid} ج.م`} icon={HiOutlineCheckCircle} color="success" />
            <StatsCard title="المتبقي" value={`${totalRemaining} ج.م`} icon={HiOutlineClock} color="warning" />
            <StatsCard title="متأخرة" value={overdue} icon={HiOutlineXCircle} color="error" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader><CardTitle>جميع الأقساط</CardTitle></CardHeader>
              <CardContent><DataTable columns={columns} data={installments} searchable /></CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

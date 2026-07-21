"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineCash,
  HiOutlineArrowUp,
  HiOutlineArrowDown,
  HiOutlineRefresh,
  HiOutlinePlus,
  HiOutlineMinus,
  HiOutlineTrendingUp,
  HiOutlineChartBar,
} from "react-icons/hi"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Badge } from "@/components/ui/Badge"
import { Table } from "@/components/ui/Table"
import { Modal } from "@/components/ui/Modal"
import { StatsCard } from "@/components/ui/StatsCard"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import { mockWallet } from "@/lib/mock/data"
import { formatCurrency, formatDate, det } from "@/lib/utils"
import { useThemeStore } from "@/lib/store/useThemeStore"
import toast from "react-hot-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"

const typeConfig: Record<string, { label: string; variant: "success" | "error" | "warning" }> = {
  deposit: { label: "إيداع", variant: "success" },
  withdrawal: { label: "سحب", variant: "error" },
  refund: { label: "استرداد", variant: "warning" },
}

const statusBadge: Record<string, "success" | "warning" | "error"> = {
  completed: "success",
  pending: "warning",
  failed: "error",
}

const methodLabels: Record<string, string> = {
  cash: "نقداً",
  fawry: "فوري",
  bank: "بنك",
}

const chartData = Array.from({ length: 12 }, (_, i) => ({
  month: ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"][i],
  deposits: Math.floor(det() * 15000) + 8000,
  withdrawals: Math.floor(det() * 10000) + 3000,
}))

export default function WalletPage() {
  const router = useRouter()
  const { theme } = useThemeStore()
  const isDark = theme === "dark"
  const textColor = isDark ? "#CBD5E1" : "#475569"
  const gridColor = isDark ? "#334155" : "#E2E8F0"
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)

  const wallet = mockWallet

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="المحفظة" subtitle="إدارة الرصيد والمعاملات المالية" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-dark to-purple-700 p-6 md:p-8"
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white" />
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white" />
        </div>
        <div className="relative z-10">
          <p className="text-primary-100 text-sm mb-1">الرصيد الحالي</p>
          <p className="text-4xl md:text-5xl font-bold text-white mb-4">
            {formatCurrency(wallet.balance)}
          </p>
          <div className="flex items-center gap-4">
            <Button type="button"
variant="secondary"
              size="sm"
              leftIcon={<HiOutlinePlus className="w-4 h-4" />}
              onClick={() => setShowDepositModal(true)}
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              إيداع
            </Button>
            <Button type="button"
variant="secondary"
              size="sm"
              leftIcon={<HiOutlineMinus className="w-4 h-4" />}
              onClick={() => setShowWithdrawModal(true)}
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              سحب
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="إجمالي الإيداعات" value={formatCurrency(wallet.totalDeposits)} icon={HiOutlineArrowUp} color="success" />
        <StatsCard title="إجمالي السحوبات" value={formatCurrency(wallet.totalWithdrawals)} icon={HiOutlineArrowDown} color="error" />
        <StatsCard title="السحوبات المعلقة" value={formatCurrency(wallet.pendingWithdrawals)} icon={HiOutlineRefresh} color="warning" />
        <StatsCard title="العملة" value={wallet.currency} icon={HiOutlineCash} color="primary" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>حركة الرصيد الشهرية</CardTitle>
          <Badge variant="primary" size="sm">
            <HiOutlineTrendingUp className="w-3 h-3 ml-1" />
            إيداعات وسحوبات
          </Badge>
        </CardHeader>
        <CardContent>
          <div dir="ltr" className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="depositGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="withdrawGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="month" tick={{ fill: textColor, fontSize: 11 }} axisLine={{ stroke: gridColor }} tickLine={false} />
                <YAxis tick={{ fill: textColor, fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: isDark ? "#1E293B" : "#FFFFFF",
                    border: `1px solid ${gridColor}`,
                    borderRadius: "8px",
                    color: isDark ? "#F8FAFC" : "#0F172A",
                    fontSize: "13px",
                  }}
                  formatter={(value: number | null) => { if (value == null) return []; return [formatCurrency(Number(value)), ""] }}
                />
                <Area type="monotone" dataKey="deposits" stroke="#10B981" strokeWidth={2} fill="url(#depositGradient)" name="إيداعات" />
                <Area type="monotone" dataKey="withdrawals" stroke="#EF4444" strokeWidth={2} fill="url(#withdrawGradient)" name="سحوبات" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>آخر المعاملات</CardTitle>
          <Link href="/teacher/finance" className="text-sm text-primary hover:underline mr-auto">التقارير المالية</Link>
        </CardHeader>
        <CardContent className="p-0">
          <Table
            columns={[
              { key: "type", header: "النوع", render: (t) => {
                const config = typeConfig[t.type]
                return <Badge variant={config.variant} size="sm">{config.label}</Badge>
              }},
              { key: "amount", header: "المبلغ", render: (t) => (
                <span className={`font-medium ${t.type === "deposit" ? "text-success" : "text-error"}`}>
                  {t.type === "deposit" ? "+" : "-"}{formatCurrency(t.amount)}
                </span>
              )},
              { key: "description", header: "الوصف" },
              { key: "paymentMethod", header: "طريقة الدفع", render: (t) => (
                <Badge variant="neutral" size="sm">{methodLabels[t.paymentMethod] || t.paymentMethod}</Badge>
              )},
              { key: "status", header: "الحالة", render: (t) => (
                <Badge variant={statusBadge[t.status]}>
                  {t.status === "completed" ? "مكتمل" : t.status === "pending" ? "معلق" : "فاشل"}
                </Badge>
              )},
              { key: "createdAt", header: "التاريخ", render: (t) => (
                <span className="text-sm text-text-tertiary">{formatDate(t.createdAt)}</span>
              )},
            ]}
            data={wallet.transactions}
          />
        </CardContent>
      </Card>

      <Modal isOpen={showDepositModal} onClose={() => setShowDepositModal(false)} title="إيداع رصيد" subtitle="أدخل المبلغ وطريقة الدفع" size="md">
        <div className="space-y-4">
          <Input label="المبلغ" type="number" placeholder="أدخل المبلغ" leftIcon={<HiOutlineCash className="w-4 h-4" />} />
          <Select label="طريقة الدفع" options={[
            { value: "cash", label: "نقداً" },
            { value: "fawry", label: "فوري" },
            { value: "bank", label: "تحويل بنكي" },
          ]} placeholder="اختر طريقة الدفع" />
          <Input label="المرجع (اختياري)" placeholder="رقم المرجع أو الإيصال" />
          <div className="pt-4 flex gap-3">
            <Button variant="primary" size="lg" className="flex-1" onClick={() => { toast.success("تم إيداع المبلغ بنجاح"); setShowDepositModal(false); }}>تأكيد الإيداع</Button>
            <Button variant="secondary" size="lg" onClick={() => setShowDepositModal(false)}>إلغاء</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showWithdrawModal} onClose={() => setShowWithdrawModal(false)} title="سحب رصيد" subtitle="أدخل المبلغ المراد سحبه" size="md">
        <div className="space-y-4">
          <Input label="المبلغ" type="number" placeholder="أدخل المبلغ" leftIcon={<HiOutlineCash className="w-4 h-4" />} />
          <Select label="الوجهة" options={[
            { value: "bank", label: "حساب بنكي" },
            { value: "cash", label: "كاش" },
          ]} placeholder="اختر وجهة السحب" />
          <Input label="ملاحظات (اختياري)" placeholder="ملاحظات إضافية" />
          <div className="p-3 rounded-xl bg-warning/10 border border-warning/20 text-sm text-warning">
            الرصيد الحالي: {formatCurrency(wallet.balance)}
          </div>
          <div className="pt-4 flex gap-3">
            <Button variant="primary" size="lg" className="flex-1" onClick={() => { toast.success("تم تقديم طلب السحب بنجاح"); setShowWithdrawModal(false); }}>تأكيد السحب</Button>
            <Button variant="secondary" size="lg" onClick={() => setShowWithdrawModal(false)}>إلغاء</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

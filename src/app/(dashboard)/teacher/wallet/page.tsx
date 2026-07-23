"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  HiOutlineCash, HiOutlineArrowUp, HiOutlineArrowDown, HiOutlineRefresh,
  HiOutlinePlus, HiOutlineMinus, HiOutlineTrendingUp, HiOutlineFilter,
  HiOutlineSearch, HiOutlineX, HiOutlineInformationCircle,
} from "react-icons/hi"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts"
import { PageHeader } from "@/components/ui/PageHeader"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Table } from "@/components/ui/Table"
import { Modal } from "@/components/ui/Modal"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import { SearchInput } from "@/components/ui/SearchInput"
import { mockWallet } from "@/lib/mock/data"
import { formatCurrency, formatDate, det } from "@/lib/utils"
import toast from "react-hot-toast"

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
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("الكل")
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)

  const wallet = mockWallet

  const filtered = useMemo(() =>
    wallet.transactions.filter((t) => {
      const q = search.toLowerCase()
      return (
        (t.description.includes(q) || t.reference.toLowerCase().includes(q)) &&
        (typeFilter === "الكل" || t.type === typeFilter)
      )
    }),
    [search, typeFilter],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="المحفظة"
        description="إدارة الرصيد والمعاملات المالية"
        actions={
          <div className="flex items-center gap-3">
            <Button
              variant="success"
              size="sm"
              leftIcon={<HiOutlinePlus className="w-4 h-4" />}
              onClick={() => setShowDepositModal(true)}
            >
              إيداع
            </Button>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<HiOutlineMinus className="w-4 h-4" />}
              onClick={() => setShowWithdrawModal(true)}
            >
              سحب
            </Button>
          </div>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="relative overflow-hidden bg-card border border-finance/20 rounded-[24px] p-6 md:p-8 "
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-finance blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-finance blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-finance text-sm font-medium mb-1">الرصيد الحالي</p>
            <p className="text-4xl md:text-5xl font-bold text-text">
              {formatCurrency(wallet.balance)}
            </p>
            <div className="flex items-center gap-4 mt-4">
              <Button
                variant="success"
                size="sm"
                leftIcon={<HiOutlinePlus className="w-4 h-4" />}
                onClick={() => setShowDepositModal(true)}
              >
                إيداع
              </Button>
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<HiOutlineMinus className="w-4 h-4" />}
                onClick={() => setShowWithdrawModal(true)}
              >
                سحب
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-success" />
              إجمالي الإيداعات {formatCurrency(wallet.totalDeposits)}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-error" />
              إجمالي السحوبات {formatCurrency(wallet.totalWithdrawals)}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="إجمالي الإيداعات"
          value={formatCurrency(wallet.totalDeposits)}
          icon={HiOutlineArrowUp}
          color="success"
          trend={12}
          sparkline={Array.from({ length: 12 }, () => Math.floor(det() * 100) + 50)}
        />
        <StatsCard
          title="إجمالي السحوبات"
          value={formatCurrency(wallet.totalWithdrawals)}
          icon={HiOutlineArrowDown}
          color="error"
          trend={-5}
          sparkline={Array.from({ length: 12 }, () => Math.floor(det() * 80) + 30)}
        />
        <StatsCard
          title="السحوبات المعلقة"
          value={formatCurrency(wallet.pendingWithdrawals)}
          icon={HiOutlineRefresh}
          color="warning"
          description="بانتظار المراجعة"
        />
        <StatsCard
          title="العملة"
          value={wallet.currency}
          icon={HiOutlineCash}
          color="primary"
          description="الجنيه المصري"
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>حركة الرصيد الشهرية</CardTitle>
            <Badge variant="success" size="sm">
              <HiOutlineTrendingUp className="w-3 h-3 ml-1" />
              إيداعات وسحوبات
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div dir="ltr" className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="depositGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16C784" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#16C784" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="withdrawGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5C74" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FF5C74" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#96A3B8", fontSize: 11 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#96A3B8", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#151D2F",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "16px",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    backdropFilter: "blur(12px)",
                  }}
                  formatter={(value: number | null) => {
                    if (value == null) return []
                    return [formatCurrency(Number(value)), ""]
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="deposits"
                  stroke="#16C784"
                  strokeWidth={2}
                  fill="url(#depositGrad)"
                  name="إيداعات"
                />
                <Area
                  type="monotone"
                  dataKey="withdrawals"
                  stroke="#FF5C74"
                  strokeWidth={2}
                  fill="url(#withdrawGrad)"
                  name="سحوبات"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <CardTitle>آخر المعاملات</CardTitle>
              <Badge variant="default" size="sm">{filtered.length} معاملة</Badge>
            </div>
            <div className="flex items-center gap-4">
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="بحث في المعاملات..."
              />
              <Select
                options={[
                  { value: "الكل", label: "جميع الأنواع" },
                  { value: "deposit", label: "إيداع" },
                  { value: "withdrawal", label: "سحب" },
                  { value: "refund", label: "استرداد" },
                ]}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-36"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table
            columns={[
              {
                key: "type",
                header: "النوع",
                render: (t) => {
                  const config = typeConfig[t.type]
                  return <Badge variant={config.variant} size="sm">{config.label}</Badge>
                },
              },
              {
                key: "amount",
                header: "المبلغ",
                render: (t) => (
                  <span className={`font-medium tabular-nums ${
                    t.type === "deposit" ? "text-success" : "text-error"
                  }`}>
                    {t.type === "deposit" ? "+" : "-"}{formatCurrency(t.amount)}
                  </span>
                ),
              },
              {
                key: "description",
                header: "الوصف",
                render: (t) => (
                  <div className="flex flex-col">
                    <span className="text-text text-sm">{t.description}</span>
                    <span className="text-text-tertiary text-xs">{t.reference}</span>
                  </div>
                ),
              },
              {
                key: "paymentMethod",
                header: "طريقة الدفع",
                render: (t) => (
                  <Badge variant="default" size="sm">
                    {methodLabels[t.paymentMethod] || t.paymentMethod}
                  </Badge>
                ),
              },
              {
                key: "status",
                header: "الحالة",
                render: (t) => (
                  <Badge variant={statusBadge[t.status]} size="sm">
                    {t.status === "completed" ? "مكتمل" : t.status === "pending" ? "معلق" : "فاشل"}
                  </Badge>
                ),
              },
              {
                key: "createdAt",
                header: "التاريخ",
                render: (t) => (
                  <span className="text-sm text-text-tertiary">{formatDate(t.createdAt)}</span>
                ),
              },
            ]}
            data={filtered}
          />
        </CardContent>
      </Card>

      <Modal isOpen={showDepositModal} onClose={() => setShowDepositModal(false)} title="إيداع رصيد" size="md">
        <div className="space-y-4">
          <Input
            label="المبلغ"
            type="number"
            placeholder="أدخل المبلغ"
            leftIcon={<HiOutlineCash className="w-4 h-4" />}
          />
          <Select
            label="طريقة الدفع"
            options={[
              { value: "cash", label: "نقداً" },
              { value: "fawry", label: "فوري" },
              { value: "bank", label: "تحويل بنكي" },
            ]}
            placeholder="اختر طريقة الدفع"
          />
          <Input
            label="المرجع (اختياري)"
            placeholder="رقم المرجع أو الإيصال"
          />
          <div className="p-5 rounded-[16px] bg-success/5 border border-success/10 text-sm text-success flex items-start gap-3">
            <HiOutlineInformationCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>سيتم إضافة المبلغ إلى رصيدك فور تأكيد العملية</span>
          </div>
          <div className="pt-4 flex gap-4">
            <Button
              variant="success"
              size="lg"
              className="flex-1"
              onClick={() => {
                toast.success("تم إيداع المبلغ بنجاح")
                setShowDepositModal(false)
              }}
            >
              تأكيد الإيداع
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setShowDepositModal(false)}
            >
              إلغاء
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showWithdrawModal} onClose={() => setShowWithdrawModal(false)} title="سحب رصيد" size="md">
        <div className="space-y-4">
          <Input
            label="المبلغ"
            type="number"
            placeholder="أدخل المبلغ"
            leftIcon={<HiOutlineCash className="w-4 h-4" />}
          />
          <Select
            label="الوجهة"
            options={[
              { value: "bank", label: "حساب بنكي" },
              { value: "cash", label: "كاش" },
            ]}
            placeholder="اختر وجهة السحب"
          />
          <Input
            label="ملاحظات (اختياري)"
            placeholder="ملاحظات إضافية"
          />
          <div className="p-5 rounded-[16px] bg-warning/5 border border-warning/10 text-sm text-warning flex items-start gap-3">
            <HiOutlineInformationCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p>الرصيد الحالي: {formatCurrency(wallet.balance)}</p>
              <p className="text-warning/70 mt-1">قد تستغرق عملية السحب حتى 48 ساعة للمراجعة</p>
            </div>
          </div>
          <div className="pt-4 flex gap-4">
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={() => {
                toast.success("تم تقديم طلب السحب بنجاح")
                setShowWithdrawModal(false)
              }}
            >
              تأكيد السحب
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setShowWithdrawModal(false)}
            >
              إلغاء
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

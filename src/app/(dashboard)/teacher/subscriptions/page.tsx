"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineCurrencyDollar,
  HiOutlineUserGroup,
  HiOutlineCreditCard,
  HiOutlineExclamation,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlineCash,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Tabs, TabPanel } from "@/components/ui/Tabs"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Table } from "@/components/ui/Table"
import Button from "@/components/ui/Button"
import { mockSubscriptionPlans, mockPayments, mockStudents } from "@/lib/mock/data"
import { formatCurrency } from "@/lib/utils"

const paymentStatusBadge: Record<string, "success" | "warning" | "error" | "info"> = {
  completed: "success",
  pending: "warning",
  failed: "error",
  refunded: "info",
}

const paymentStatusLabels: Record<string, string> = {
  completed: "مكتمل",
  pending: "معلق",
  failed: "فاشل",
  refunded: "مسترجع",
}

const methodLabels: Record<string, string> = {
  cash: "نقداً",
  fawry: "فوري",
  code: "كود شحن",
}

const tabsConfig = [
  { id: "subscriptions", label: "الاشتراكات" },
  { id: "payments", label: "المدفوعات" },
  { id: "plans", label: "الباقات" },
]

export default function SubscriptionsPage() {
  const [activeTab, setActiveTab] = useState("subscriptions")

  const subscriptionData = useMemo(() =>
    mockStudents.slice(0, 20).map((s) => ({
      id: s.id,
      studentName: s.name,
      planName: s.subscription.planName,
      startDate: s.subscription.startDate,
      endDate: s.subscription.endDate,
      daysRemaining: Math.max(0, Math.ceil((s.subscription.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))),
      status: s.subscription.status,
      amount: s.subscription.status === "active" ? [300, 765, 2700][["الشهرية", "الثلاثية", "السنوية"].indexOf(s.subscription.planName)] || 300 : 0,
    })), [])

  const stats = useMemo(() => ({
    activeSubscriptions: subscriptionData.filter((s) => s.status === "active").length,
    expiredSubscriptions: subscriptionData.filter((s) => s.status === "expired").length,
    monthlyRevenue: mockPayments.filter((p) => p.status === "completed").reduce((s, p) => s + p.amount, 0),
    pendingPayments: mockPayments.filter((p) => p.status === "pending").length,
  }), [subscriptionData])

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="الاشتراكات والمدفوعات" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="الاشتراكات النشطة" value={stats.activeSubscriptions} icon={HiOutlineCheckCircle} color="success" />
        <StatsCard title="الاشتراكات المنتهية" value={stats.expiredSubscriptions} icon={HiOutlineXCircle} color="error" />
        <StatsCard title="الإيرادات الشهرية" value={formatCurrency(stats.monthlyRevenue)} icon={HiOutlineCurrencyDollar} color="primary" />
        <StatsCard title="المدفوعات المعلقة" value={stats.pendingPayments} icon={HiOutlineClock} color="warning" />
      </div>

      <Tabs tabs={tabsConfig} defaultTab="subscriptions" onChange={setActiveTab}>
        {(active) => (
          <>
            <TabPanel id="subscriptions" activeTab={active}>
              <Card>
                <Table
                  columns={[
                    { key: "studentName", header: "الطالب" },
                    { key: "planName", header: "الباقة" },
                    { key: "startDate", header: "تاريخ البداية", render: (s) => (
                      <span className="text-sm text-text-secondary">{s.startDate.toLocaleDateString("ar-EG")}</span>
                    )},
                    { key: "endDate", header: "تاريخ النهاية", render: (s) => (
                      <span className="text-sm text-text-secondary">{s.endDate.toLocaleDateString("ar-EG")}</span>
                    )},
                    { key: "daysRemaining", header: "الأيام المتبقية", render: (s) => (
                      <span className={`font-medium ${s.daysRemaining <= 7 ? "text-error" : "text-text"}`}>{s.daysRemaining} يوم</span>
                    )},
                    { key: "status", header: "الحالة", render: (s) => (
                      <Badge variant={s.status === "active" ? "success" : s.status === "expired" ? "error" : "warning"}>
                        {s.status === "active" ? "نشط" : s.status === "expired" ? "منتهي" : "معلق"}
                      </Badge>
                    )},
                    { key: "amount", header: "المبلغ", render: (s) => (
                      <span className="font-medium">{formatCurrency(s.amount)}</span>
                    )},
                  ]}
                  data={subscriptionData}
                />
              </Card>
            </TabPanel>

            <TabPanel id="payments" activeTab={active}>
              <Card>
                <Table
                  columns={[
                    { key: "studentName", header: "الطالب" },
                    { key: "amount", header: "المبلغ", render: (p) => (
                      <span className="font-medium">{formatCurrency(p.amount)}</span>
                    )},
                    { key: "method", header: "طريقة الدفع", render: (p) => (
                      <div className="flex items-center gap-1.5">
                        <HiOutlineCash size={14} className="text-text-tertiary" />
                        <span>{methodLabels[p.method] || p.method}</span>
                      </div>
                    )},
                    { key: "status", header: "الحالة", render: (p) => (
                      <Badge variant={paymentStatusBadge[p.status]}>{paymentStatusLabels[p.status]}</Badge>
                    )},
                    { key: "createdAt", header: "التاريخ", render: (p) => (
                      <span className="text-sm text-text-secondary">{p.createdAt.toLocaleDateString("ar-EG")}</span>
                    )},
                    { key: "transactionId", header: "رقم المعاملة", render: (p) => (
                      <span className="text-xs font-mono text-text-tertiary" dir="ltr">{p.transactionId}</span>
                    )},
                  ]}
                  data={mockPayments.slice(0, 20)}
                />
              </Card>
            </TabPanel>

            <TabPanel id="plans" activeTab={active}>
              <div className="grid md:grid-cols-3 gap-5">
                {mockSubscriptionPlans.map((plan, i) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative p-6 rounded-2xl border-2 bg-surface border-border hover:shadow-lg hover:border-primary/30 transition-all"
                  >
                    <h3 className="text-lg font-bold text-text mb-1">{plan.name}</h3>
                    <p className="text-xs text-text-secondary mb-4">{plan.description}</p>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-text">{plan.price}</span>
                      <span className="text-text-secondary text-sm mr-1">ج.م / {plan.duration} {plan.durationUnit === "month" ? "شهر" : "سنة"}</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2 text-xs text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {plan.allCourses ? "جميع الكورسات" : `${plan.coursesCount} كورسات`}
                      </li>
                      <li className="flex items-center gap-2 text-xs text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        دعم فني متواصل
                      </li>
                      <li className="flex items-center gap-2 text-xs text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        امتحانات وواجبات غير محدودة
                      </li>
                    </ul>
                    <div className="pt-4 border-t border-border space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">السعر شهرياً</span>
                        <span className="font-bold text-text">{Math.round(plan.price / plan.duration)} ج.م</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabPanel>
          </>
        )}
      </Tabs>
    </div>
  )
}

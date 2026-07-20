"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import toast from "react-hot-toast"
import Link from "next/link"
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
import { EmptyState } from "@/components/ui/EmptyState"
import { formatCurrency } from "@/lib/utils"

const paymentStatusBadge: Record<string, "success" | "warning" | "error" | "info"> = {
  completed: "success",
  pending: "warning",
  failed: "error",
  refunded: "info",
}

const paymentStatusLabels: Record<string, string> = {
  completed: "ظ…ظƒطھظ…ظ„",
  pending: "ظ…ط¹ظ„ظ‚",
  failed: "ظپط§ط´ظ„",
  refunded: "ظ…ط³طھط±ط¬ط¹",
}

const methodLabels: Record<string, string> = {
  cash: "ظ†ظ‚ط¯ط§ظ‹",
  fawry: "ظپظˆط±ظٹ",
  code: "ظƒظˆط¯ ط´ط­ظ†",
}

const tabsConfig = [
  { id: "subscriptions", label: "ط§ظ„ط§ط´طھط±ط§ظƒط§طھ" },
  { id: "payments", label: "ط§ظ„ظ…ط¯ظپظˆط¹ط§طھ" },
  { id: "plans", label: "ط§ظ„ط¨ط§ظ‚ط§طھ" },
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
      amount: s.subscription.status === "active" ? [300, 765, 2700][["ط§ظ„ط´ظ‡ط±ظٹط©", "ط§ظ„ط«ظ„ط§ط«ظٹط©", "ط§ظ„ط³ظ†ظˆظٹط©"].indexOf(s.subscription.planName)] || 300 : 0,
    })), [])

  const stats = useMemo(() => ({
    activeSubscriptions: subscriptionData.filter((s) => s.status === "active").length,
    expiredSubscriptions: subscriptionData.filter((s) => s.status === "expired").length,
    monthlyRevenue: mockPayments.filter((p) => p.status === "completed").reduce((s, p) => s + p.amount, 0),
    pendingPayments: mockPayments.filter((p) => p.status === "pending").length,
  }), [subscriptionData])

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="ط§ظ„ط§ط´طھط±ط§ظƒط§طھ ظˆط§ظ„ظ…ط¯ظپظˆط¹ط§طھ" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="ط§ظ„ط§ط´طھط±ط§ظƒط§طھ ط§ظ„ظ†ط´ط·ط©" value={stats.activeSubscriptions} icon={HiOutlineCheckCircle} color="success" />
        <StatsCard title="ط§ظ„ط§ط´طھط±ط§ظƒط§طھ ط§ظ„ظ…ظ†طھظ‡ظٹط©" value={stats.expiredSubscriptions} icon={HiOutlineXCircle} color="error" />
        <StatsCard title="ط§ظ„ط¥ظٹط±ط§ط¯ط§طھ ط§ظ„ط´ظ‡ط±ظٹط©" value={formatCurrency(stats.monthlyRevenue)} icon={HiOutlineCurrencyDollar} color="primary" />
        <StatsCard title="ط§ظ„ظ…ط¯ظپظˆط¹ط§طھ ط§ظ„ظ…ط¹ظ„ظ‚ط©" value={stats.pendingPayments} icon={HiOutlineClock} color="warning" />
      </div>

      <Tabs tabs={tabsConfig} defaultTab="subscriptions" onChange={setActiveTab}>
        {(active) => (
          <>
            <TabPanel id="subscriptions" activeTab={active}>
              <Card>
                {subscriptionData.length === 0 ? (
                  <EmptyState
                    icon={HiOutlineCreditCard}
                    title="ظ„ط§ ظٹظˆط¬ط¯ ط§ط´طھط±ط§ظƒط§طھ"
                    description="ظ„ظ… ظٹطھظ… طھط³ط¬ظٹظ„ ط£ظٹ ط§ط´طھط±ط§ظƒط§طھ ط¨ط¹ط¯"
                  />
                ) : (
                  <Table
                    columns={[
                      { key: "studentName", header: "ط§ظ„ط·ط§ظ„ط¨", render: (s) => (
                        <Link href={`/teacher/students/${s.id}`} className="text-primary hover:text-primary-dark transition-colors">{s.studentName}</Link>
                      )},
                      { key: "planName", header: "ط§ظ„ط¨ط§ظ‚ط©" },
                      { key: "startDate", header: "طھط§ط±ظٹط® ط§ظ„ط¨ط¯ط§ظٹط©", render: (s) => (
                        <span className="text-sm text-text-secondary">{s.startDate.toLocaleDateString("ar-EG")}</span>
                      )},
                      { key: "endDate", header: "طھط§ط±ظٹط® ط§ظ„ظ†ظ‡ط§ظٹط©", render: (s) => (
                        <span className="text-sm text-text-secondary">{s.endDate.toLocaleDateString("ar-EG")}</span>
                      )},
                      { key: "daysRemaining", header: "ط§ظ„ط£ظٹط§ظ… ط§ظ„ظ…طھط¨ظ‚ظٹط©", render: (s) => (
                        <span className={`font-medium ${s.daysRemaining <= 7 ? "text-error" : "text-text"}`}>{s.daysRemaining} ظٹظˆظ…</span>
                      )},
                      { key: "status", header: "ط§ظ„ط­ط§ظ„ط©", render: (s) => (
                        <Badge variant={s.status === "active" ? "success" : s.status === "expired" ? "error" : "warning"}>
                          {s.status === "active" ? "ظ†ط´ط·" : s.status === "expired" ? "ظ…ظ†طھظ‡ظٹ" : "ظ…ط¹ظ„ظ‚"}
                        </Badge>
                      )},
                      { key: "amount", header: "ط§ظ„ظ…ط¨ظ„ط؛", render: (s) => (
                        <span className="font-medium">{formatCurrency(s.amount)}</span>
                      )},
                      { key: "actions", header: "ط§ظ„ط¥ط¬ط±ط§ط،ط§طھ", render: (s) => (
                        <div className="flex items-center gap-2">
                          {s.status === "active" ? (
                            <Button type="button" size="sm" variant="danger" onClick={() => { toast.success("طھظ… ط¥ظ„ط؛ط§ط، ط§ظ„ط§ط´طھط±ط§ظƒ ط¨ظ†ط¬ط§ط­") }}>
                              ط¥ظ„ط؛ط§ط،
                            </Button>
                          ) : (
                            <Button type="button" size="sm" variant="success" onClick={() => { toast.success("طھظ… طھظپط¹ظٹظ„ ط§ظ„ط§ط´طھط±ط§ظƒ ط¨ظ†ط¬ط§ط­") }}>
                              طھظپط¹ظٹظ„
                            </Button>
                          )}
                          <Button type="button" size="sm" variant="primary" onClick={() => { toast.success("طھظ… طھط±ظ‚ظٹط© ط§ظ„ط§ط´طھط±ط§ظƒ ط¨ظ†ط¬ط§ط­") }}>
                            طھط±ظ‚ظٹط©
                          </Button>
                          <Button type="button" size="sm" variant="info" onClick={() => { toast.success("طھظ… طھط¬ط¯ظٹط¯ ط§ظ„ط§ط´طھط±ط§ظƒ ط¨ظ†ط¬ط§ط­") }}>
                            طھط¬ط¯ظٹط¯
                          </Button>
                        </div>
                      )},
                    ]}
                    data={subscriptionData}
                  />
                )}
              </Card>
            </TabPanel>

            <TabPanel id="payments" activeTab={active}>
              <Card>
                <Table
                  columns={[
                    { key: "studentName", header: "ط§ظ„ط·ط§ظ„ط¨", render: (p) => (
                      <Link href={`/teacher/students/${p.studentId}`} className="text-primary hover:text-primary-dark transition-colors">{p.studentName}</Link>
                    )},
                    { key: "amount", header: "ط§ظ„ظ…ط¨ظ„ط؛", render: (p) => (
                      <span className="font-medium">{formatCurrency(p.amount)}</span>
                    )},
                    { key: "method", header: "ط·ط±ظٹظ‚ط© ط§ظ„ط¯ظپط¹", render: (p) => (
                      <div className="flex items-center gap-1.5">
                        <HiOutlineCash size={14} className="text-text-tertiary" />
                        <span>{methodLabels[p.method] || p.method}</span>
                      </div>
                    )},
                    { key: "status", header: "ط§ظ„ط­ط§ظ„ط©", render: (p) => (
                      <Badge variant={paymentStatusBadge[p.status]}>{paymentStatusLabels[p.status]}</Badge>
                    )},
                    { key: "createdAt", header: "ط§ظ„طھط§ط±ظٹط®", render: (p) => (
                      <span className="text-sm text-text-secondary">{p.createdAt.toLocaleDateString("ar-EG")}</span>
                    )},
                    { key: "transactionId", header: "ط±ظ‚ظ… ط§ظ„ظ…ط¹ط§ظ…ظ„ط©", render: (p) => (
                      <span className="text-xs font-mono text-text-tertiary" dir="ltr">{p.transactionId}</span>
                    )},
                    { key: "actions", header: "", render: (p) => (
                      <Link href={`/teacher/subscriptions/payments/${p.id}`} className="text-primary hover:text-primary-dark transition-colors text-sm">ط¹ط±ط¶ ط§ظ„طھظپط§طµظٹظ„</Link>
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
                      <span className="text-text-secondary text-sm mr-1">ط¬.ظ… / {plan.duration} {plan.durationUnit === "month" ? "ط´ظ‡ط±" : "ط³ظ†ط©"}</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2 text-xs text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {plan.allCourses ? "ط¬ظ…ظٹط¹ ط§ظ„ظƒظˆط±ط³ط§طھ" : `${plan.coursesCount} ظƒظˆط±ط³ط§طھ`}
                      </li>
                      <li className="flex items-center gap-2 text-xs text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        ط¯ط¹ظ… ظپظ†ظٹ ظ…طھظˆط§طµظ„
                      </li>
                      <li className="flex items-center gap-2 text-xs text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        ط§ظ…طھط­ط§ظ†ط§طھ ظˆظˆط§ط¬ط¨ط§طھ ط؛ظٹط± ظ…ط­ط¯ظˆط¯ط©
                      </li>
                    </ul>
                    <div className="pt-4 border-t border-border space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">ط§ظ„ط³ط¹ط± ط´ظ‡ط±ظٹط§ظ‹</span>
                        <span className="font-bold text-text">{Math.round(plan.price / plan.duration)} ط¬.ظ…</span>
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

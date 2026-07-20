"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import { Progress } from "@/components/ui/Progress"
import { Table } from "@/components/ui/Table"
import { Tabs, TabPanel } from "@/components/ui/Tabs"
import { mockSubscriptionPlans, mockPayments } from "@/lib/mock/data"
import { formatCurrency, formatDate, cn } from "@/lib/utils"
import { HiCheck, HiX, HiCreditCard, HiCalendar, HiClock, HiShieldCheck } from "react-icons/hi"

export default function StudentSubscriptionPage() {
  const [activeTab, setActiveTab] = useState("current")

  const currentPlan = mockSubscriptionPlans[1]
  const endDate = new Date(2025, 9, 15)
  const startDate = new Date(2025, 6, 15)
  const daysRemaining = Math.ceil((endDate.getTime() - Date.now()) / 86400000)
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000)
  const daysUsed = totalDays - daysRemaining

  const studentPayments = mockPayments.slice(0, 5)

  return (
    <div>
      <DashboardHeader title="ط§ط´طھط±ط§ظƒظٹ" subtitle="ط¥ط¯ط§ط±ط© ط§ط´طھط±ط§ظƒظƒ ظˆط¹ط±ط¶ ط§ظ„ظ…ط¯ظپظˆط¹ط§طھ" />

      <div className="p-4 md:p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-success" />
            <CardHeader>
              <CardTitle>ط§ظ„ط§ط´طھط±ط§ظƒ ط§ظ„ط­ط§ظ„ظٹ</CardTitle>
              <Badge variant="success" size="md" dot>ظ†ط´ط·</Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-text-secondary mb-1">ط§ظ„ط¨ط§ظ‚ط©</p>
                  <p className="text-lg font-bold text-text">{currentPlan.name}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">طھط§ط±ظٹط® ط§ظ„ط¨ط¯ط،</p>
                  <p className="text-lg font-bold text-text">{formatDate(startDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">طھط§ط±ظٹط® ط§ظ„ط§ظ†طھظ‡ط§ط،</p>
                  <p className="text-lg font-bold text-text">{formatDate(endDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">ط§ظ„ظ…طھط¨ظ‚ظٹ</p>
                  <p className="text-lg font-bold text-text text-success">{daysRemaining} ظٹظˆظ…</p>
                </div>
              </div>
              <div className="mt-4">
                <Progress value={daysUsed} max={totalDays} size="md" variant="success" showLabel />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["ط¬ظ…ظٹط¹ ط§ظ„ظƒظˆط±ط³ط§طھ", "ط§ظ…طھط­ط§ظ†ط§طھ ط؛ظٹط± ظ…ط­ط¯ظˆط¯ط©", "ط¯ط¹ظ… ظپظ†ظٹ", "ط´ظ‡ط§ط¯ط§طھ ظ…ط¹طھظ…ط¯ط©"].map((f) => (
                  <div key={f} className="flex items-center gap-1.5 text-sm text-text-secondary">
                    <HiCheck className="w-4 h-4 text-success" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">طھط¬ط¯ظٹط¯ ط§ظ„ط§ط´طھط±ط§ظƒ</Button>
              <Button variant="ghost">ط¥ظ„ط؛ط§ط، ط§ظ„ط§ط´طھط±ط§ظƒ</Button>
            </CardFooter>
          </Card>
        </motion.div>

        <Tabs
          tabs={[
            { id: "current", label: "ط§ظ„ط¨ط§ظ‚ط© ط§ظ„ط­ط§ظ„ظٹط©", icon: <HiCreditCard className="w-4 h-4" /> },
            { id: "plans", label: "ط§ظ„ط¨ط§ظ‚ط§طھ ط§ظ„ظ…طھط§ط­ط©", icon: <HiCalendar className="w-4 h-4" /> },
            { id: "payments", label: "ط§ظ„ظ…ط¯ظپظˆط¹ط§طھ", icon: <HiClock className="w-4 h-4" /> },
          ]}
          defaultTab="current"
          onChange={setActiveTab}
        >
          {(tab) => (
            <>
              <TabPanel id="current" activeTab={tab}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader><CardTitle>ط§ظ„ظˆطµظ„ ظ„ظ„ظƒظˆط±ط³ط§طھ</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-text mb-2">ط؛ظٹط± ظ…ط­ط¯ظˆط¯</p>
                      <p className="text-sm text-text-secondary">ط¬ظ…ظٹط¹ ظƒظˆط±ط³ط§طھ ط§ظ„ظ…ظ†طµط©</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-text mb-2">ط؛ظٹط± ظ…ط­ط¯ظˆط¯</p>
                      <p className="text-sm text-text-secondary">ط¬ظ…ظٹط¹ ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ ظˆط§ظ„ط§ط®طھط¨ط§ط±ط§طھ</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>ط§ظ„ط´ظ‡ط§ط¯ط§طھ</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-text mb-2">ظ…ط¯ظپظˆط¹ط©</p>
                      <p className="text-sm text-text-secondary">ط´ظ‡ط§ط¯ط© ظ„ظƒظ„ ظƒظˆط±ط³ ظ…ظƒطھظ…ظ„</p>
                    </CardContent>
                  </Card>
                </div>
              </TabPanel>

              <TabPanel id="plans" activeTab={tab}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {mockSubscriptionPlans.filter(p => p.id !== currentPlan.id).map((plan, i) => (
                    <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                      <Card className="text-center h-full flex flex-col">
                        <CardContent className="flex-1">
                          <h3 className="text-xl font-bold text-text mb-2">{plan.name}</h3>
                          <p className="text-3xl font-bold text-primary mb-2">{formatCurrency(plan.price)}</p>
                          <p className="text-sm text-text-secondary mb-6">{plan.description}</p>
                          <div className="space-y-3 text-right">
                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                              <HiCheck className="w-4 h-4 text-success shrink-0" />
                              <span>{plan.allCourses ? "ط¬ظ…ظٹط¹ ط§ظ„ظƒظˆط±ط³ط§طھ" : `${plan.coursesCount} ظƒظˆط±ط³ط§طھ`}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                              <HiCheck className="w-4 h-4 text-success shrink-0" />
                              <span>ظ…ط¯ط© ط§ظ„ط§ط´طھط±ط§ظƒ: {plan.duration} {plan.durationUnit === "month" ? "ط´ظ‡ظˆط±" : "ط£ظٹط§ظ…"}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                              <HiCheck className="w-4 h-4 text-success shrink-0" />
                              <span>ط¯ط¹ظ… ظپظ†ظٹ ظ…طھط§ط­</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="justify-center">
                          <Button variant={i === 0 ? "primary" : "outline"}>ط§ظ„طھط±ظ‚ظٹط© ظ„ظ‡ط°ظ‡ ط§ظ„ط¨ط§ظ‚ط©</Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabPanel>

              <TabPanel id="payments" activeTab={tab}>
                <Card>
                  <CardHeader><CardTitle>ط³ط¬ظ„ ط§ظ„ظ…ط¯ظپظˆط¹ط§طھ</CardTitle></CardHeader>
                  <CardContent>
                    <Table
                      columns={[
                        { key: "transactionId", header: "ط±ظ‚ظ… ط§ظ„ط¹ظ…ظ„ظٹط©" },
                        { key: "amount", header: "ط§ظ„ظ…ط¨ظ„ط؛", render: (p) => <span className="font-semibold">{formatCurrency(p.amount)}</span> },
                        { key: "method", header: "ط·ط±ظٹظ‚ط© ط§ظ„ط¯ظپط¹", render: (p) => ({ cash: "ظ†ظ‚ط¯ط§ظ‹", fawry: "ظپظˆط±ظٹ", code: "ظƒظˆط¯" })[p.method] },
                        { key: "status", header: "ط§ظ„ط­ط§ظ„ط©", render: (p) => (
                          <Badge variant={p.status === "completed" ? "success" : p.status === "pending" ? "warning" : "error"}>
                            {p.status === "completed" ? "ظ…ظƒطھظ…ظ„" : p.status === "pending" ? "ظ‚ظٹط¯ ط§ظ„ط§ظ†طھط¸ط§ط±" : "ظپط´ظ„"}
                          </Badge>
                        )},
                        { key: "createdAt", header: "ط§ظ„طھط§ط±ظٹط®", render: (p) => formatDate(p.createdAt) },
                        { key: "invoiceId", header: "ط§ظ„ظپط§طھظˆط±ط©", render: (p) => (
                          <Button size="xs" variant="ghost">طھط­ظ…ظٹظ„</Button>
                        )},
                      ]}
                      data={studentPayments}
                      emptyMessage="ظ„ط§ طھظˆط¬ط¯ ظ…ط¯ظپظˆط¹ط§طھ ط³ط§ط¨ظ‚ط©"
                    />
                  </CardContent>
                </Card>
              </TabPanel>
            </>
          )}
        </Tabs>
      </div>
    </div>
  )
}

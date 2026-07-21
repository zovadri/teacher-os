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
      <DashboardHeader title="اشتراكي" subtitle="إدارة اشتراكك وعرض المدفوعات" />

      <div className="p-4 md:p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-success" />
            <CardHeader>
              <CardTitle>الاشتراك الحالي</CardTitle>
              <Badge variant="success" size="md" dot>نشط</Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-text-secondary mb-1">الباقة</p>
                  <p className="text-lg font-bold text-text">{currentPlan.name}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">تاريخ البدء</p>
                  <p className="text-lg font-bold text-text">{formatDate(startDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">تاريخ الانتهاء</p>
                  <p className="text-lg font-bold text-text">{formatDate(endDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">المتبقي</p>
                  <p className="text-lg font-bold text-text text-success">{daysRemaining} يوم</p>
                </div>
              </div>
              <div className="mt-4">
                <Progress value={daysUsed} max={totalDays} size="md" variant="success" showLabel />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["جميع الكورسات", "امتحانات غير محدودة", "دعم فني", "شهادات معتمدة"].map((f) => (
                  <div key={f} className="flex items-center gap-1.5 text-sm text-text-secondary">
                    <HiCheck className="w-4 h-4 text-success" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">تجديد الاشتراك</Button>
              <Button variant="ghost">إلغاء الاشتراك</Button>
            </CardFooter>
          </Card>
        </motion.div>

        <Tabs
          tabs={[
            { id: "current", label: "الباقة الحالية", icon: <HiCreditCard className="w-4 h-4" /> },
            { id: "plans", label: "الباقات المتاحة", icon: <HiCalendar className="w-4 h-4" /> },
            { id: "payments", label: "المدفوعات", icon: <HiClock className="w-4 h-4" /> },
          ]}
          defaultTab="current"
          onChange={setActiveTab}
        >
          {(tab) => (
            <>
              <TabPanel id="current" activeTab={tab}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader><CardTitle>الوصل للكورسات</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-text mb-2">غير محدود</p>
                      <p className="text-sm text-text-secondary">جميع كورسات المنصة</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>الامتحانات</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-text mb-2">غير محدود</p>
                      <p className="text-sm text-text-secondary">جميع الامتحانات والاختبارات</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>الشهادات</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-text mb-2">مدفوعة</p>
                      <p className="text-sm text-text-secondary">شهادة لكل كورس مكتمل</p>
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
                              <span>{plan.allCourses ? "جميع الكورسات" : `${plan.coursesCount} كورسات`}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                              <HiCheck className="w-4 h-4 text-success shrink-0" />
                              <span>مدة الاشتراك: {plan.duration} {plan.durationUnit === "month" ? "شهور" : "أيام"}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                              <HiCheck className="w-4 h-4 text-success shrink-0" />
                              <span>دعم فني متاح</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="justify-center">
                          <Button variant={i === 0 ? "primary" : "outline"}>الترقية لهذه الباقة</Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabPanel>

              <TabPanel id="payments" activeTab={tab}>
                <Card>
                  <CardHeader><CardTitle>سجل المدفوعات</CardTitle></CardHeader>
                  <CardContent>
                    <Table
                      columns={[
                        { key: "transactionId", header: "رقم العملية" },
                        { key: "amount", header: "المبلغ", render: (p) => <span className="font-semibold">{formatCurrency(p.amount)}</span> },
                        { key: "method", header: "طريقة الدفع", render: (p) => ({ cash: "نقداً", fawry: "فوري", code: "كود" })[p.method] },
                        { key: "status", header: "الحالة", render: (p) => (
                          <Badge variant={p.status === "completed" ? "success" : p.status === "pending" ? "warning" : "error"}>
                            {p.status === "completed" ? "مكتمل" : p.status === "pending" ? "قيد الانتظار" : "فشل"}
                          </Badge>
                        )},
                        { key: "createdAt", header: "التاريخ", render: (p) => formatDate(p.createdAt) },
                        { key: "invoiceId", header: "الفاتورة", render: (p) => (
                          <Button size="xs" variant="ghost">تحميل</Button>
                        )},
                      ]}
                      data={studentPayments}
                      emptyMessage="لا توجد مدفوعات سابقة"
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

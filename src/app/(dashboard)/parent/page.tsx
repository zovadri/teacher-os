"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  HiOutlineAcademicCap, HiOutlineClipboardCheck, HiOutlineChartBar,
  HiOutlineUserGroup, HiOutlineCurrencyDollar, HiOutlineBell,
  HiOutlineChevronLeft, HiOutlineStar, HiOutlineExclamation,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"

const childrenData = [
  {
    id: "s-1", name: "أحمد علي", grade: "ثالثة ثانوي", school: "مدرسة النصر الثانوية",
    status: "active", averageGrade: 87, coursesCount: 4, examsPassed: 8,
    subscriptionStatus: "نشط", subscriptionEnd: "2026-09-15",
    recentGrades: [
      { subject: "النحو والصرف", grade: 92 },
      { subject: "البلاغة والأدب", grade: 85 },
      { subject: "النصوص الأدبية", grade: 78 },
      { subject: "الإملاء والخط", grade: 95 },
    ],
  },
  {
    id: "s-2", name: "فاطمة علي", grade: "أولى ثانوي", school: "مدرسة الفتح الثانوية",
    status: "active", averageGrade: 92, coursesCount: 3, examsPassed: 6,
    subscriptionStatus: "نشط", subscriptionEnd: "2026-12-01",
    recentGrades: [
      { subject: "النحو والصرف", grade: 95 },
      { subject: "النصوص الأدبية", grade: 90 },
      { subject: "الإملاء والخط", grade: 92 },
    ],
  },
]

const payments = [
  { id: "p1", child: "أحمد علي", amount: 750, dueDate: "2026-08-01", status: "pending" },
  { id: "p2", child: "فاطمة علي", amount: 600, dueDate: "2026-12-01", status: "paid" },
]

const notifications = [
  { id: "n1", title: "امتحان قريب", message: "أحمد لديه امتحان نحو يوم ٢٥ يوليو", type: "info", time: "منذ ساعة" },
  { id: "n2", title: "نتيجة جديدة", message: "فاطمة حصلت على ٩٥٪ في اختبار الإملاء", type: "success", time: "منذ ٣ ساعات" },
  { id: "n3", title: "تذكير بالدفع", message: "اشتراك أحمد سينتهي قريباً", type: "warning", time: "منذ يوم" },
]

export default function ParentDashboard() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div>
      <DashboardHeader title="لوحة تحكم ولي الأمر" subtitle="متابعة أداء أبنائك وإدارة الاشتراكات" />
      <div className="p-4 md:p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-4">
          {childrenData.map((child, i) => (
            <motion.div
              key={child.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card hover>
                <CardContent className="pt-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-[14px] bg-primary-100 border border-primary-200 flex items-center justify-center text-primary text-lg font-bold">
                        {child.name[0]}
                      </div>
                      <div>
                        <Link href={`/parent/children/${child.id}`} className="font-semibold text-text hover:text-primary transition-colors">{child.name}</Link>
                        <p className="text-xs text-text-tertiary">{child.grade} • {child.school}</p>
                      </div>
                    </div>
                    <Badge variant={child.subscriptionStatus === "نشط" ? "success" : "warning"} dot>
                      {child.subscriptionStatus}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2 rounded-[12px] bg-card/60 border border-border">
                      <p className="text-lg font-bold text-primary">{child.averageGrade}%</p>
                      <p className="text-[10px] text-text-tertiary">المتوسط</p>
                    </div>
                    <div className="text-center p-2 rounded-[12px] bg-card/60 border border-border">
                      <p className="text-lg font-bold">{child.coursesCount}</p>
                      <p className="text-[10px] text-text-tertiary">كورسات</p>
                    </div>
                    <div className="text-center p-2 rounded-[12px] bg-card/60 border border-border">
                      <p className="text-lg font-bold text-success">{child.examsPassed}</p>
                      <p className="text-[10px] text-text-tertiary">ناجح</p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {child.recentGrades.slice(0, 3).map((g) => (
                      <div key={g.subject} className="flex items-center justify-between text-xs">
                        <span className="text-text-secondary">{g.subject}</span>
                        <span className="font-medium">{g.grade}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    <span className="flex items-center gap-2">
                      <HiOutlineChartBar className="text-primary" size={18} />
                      آخر الدرجات
                    </span>
                  </CardTitle>
                  <Link href="/parent/children" className="text-sm text-primary hover:underline">عرض الكل</Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-right p-3 font-medium text-text-secondary">الطالب</th>
                        <th className="text-right p-3 font-medium text-text-secondary">المادة</th>
                        <th className="text-center p-3 font-medium text-text-secondary">الدرجة</th>
                        <th className="text-center p-3 font-medium text-text-secondary">التقييم</th>
                      </tr>
                    </thead>
                    <tbody>
                      {childrenData.flatMap((child) =>
                        child.recentGrades.slice(0, 2).map((g, i) => (
                          <tr key={`${child.id}-${i}`} className="border-b border-border last:border-0 hover:bg-card/40 transition-colors">
                            <td className="p-3 font-medium">{child.name}</td>
                            <td className="p-3 text-text-secondary">{g.subject}</td>
                            <td className="p-3 text-center font-medium">{g.grade}%</td>
                            <td className="p-3 text-center">
                              <Badge variant={g.grade >= 90 ? "success" : g.grade >= 70 ? "primary" : g.grade >= 50 ? "warning" : "error"}>
                                {g.grade >= 90 ? "ممتاز" : g.grade >= 70 ? "جيد جداً" : g.grade >= 50 ? "مقبول" : "ضعيف"}
                              </Badge>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    <span className="flex items-center gap-2 text-sm">
                      <HiOutlineCurrencyDollar className="text-warning" size={16} />
                      المدفوعات القادمة
                    </span>
                  </CardTitle>
                  <Link href="/parent/payments" className="text-xs text-primary hover:underline">عرض الكل</Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {payments.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-[12px] bg-card/40 border border-border">
                    <div>
                      <p className="text-xs font-medium">{p.child}</p>
                      <p className="text-[10px] text-text-tertiary">استحقاق: {new Date(p.dueDate).toLocaleDateString("ar-EG")}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold">{p.amount} ج.م</p>
                      <Badge variant={p.status === "paid" ? "success" : "warning"} size="sm">
                        {p.status === "paid" ? "مدفوع" : "قيد الانتظار"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  <span className="flex items-center gap-2 text-sm">
                    <HiOutlineBell className="text-primary" size={16} />
                    الإشعارات
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      n.type === "success" ? "bg-success" :
                      n.type === "warning" ? "bg-warning" : "bg-info"
                    }`} />
                    <div>
                      <p className="text-xs font-medium">{n.title}</p>
                      <p className="text-[10px] text-text-tertiary">{n.message}</p>
                      <p className="text-[10px] text-text-tertiary mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

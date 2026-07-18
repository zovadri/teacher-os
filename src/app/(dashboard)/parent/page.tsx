"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  HiOutlineAcademicCap, HiOutlineClipboardCheck, HiOutlineChartBar,
  HiOutlineUserGroup, HiOutlineCurrencyDollar, HiOutlineBell,
  HiOutlineChevronLeft, HiOutlineStar, HiOutlineExclamation,
} from "react-icons/hi"

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

const statusColors: Record<string, string> = {
  active: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  expired: "bg-error/10 text-error",
}

export default function ParentDashboard() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold">لوحة تحكم ولي الأمر</h1>
          <p className="text-text-secondary text-sm">متابعة أداء أبنائك وإدارة الاشتراكات</p>
        </div>

        {/* Children Overview */}
        <div className="grid md:grid-cols-2 gap-4">
          {childrenData.map((child, i) => (
            <motion.div
              key={child.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-xl bg-surface border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-lg font-bold">
                    {child.name[0]}
                  </div>
                  <div>
                    <Link href={`/parent/children/${child.id}`} className="font-semibold hover:text-primary transition-colors">{child.name}</Link>
                    <p className="text-xs text-text-tertiary">{child.grade} • {child.school}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusColors[child.subscriptionStatus === "نشط" ? "active" : "pending"]}`}>
                  {child.subscriptionStatus === "نشط" ? "نشط" : "معلق"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2 rounded-lg bg-surface-secondary">
                  <p className="text-lg font-bold text-primary">{child.averageGrade}٪</p>
                  <p className="text-[10px] text-text-tertiary">المتوسط</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-surface-secondary">
                  <p className="text-lg font-bold">{child.coursesCount}</p>
                  <p className="text-[10px] text-text-tertiary">كورسات</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-surface-secondary">
                  <p className="text-lg font-bold text-success">{child.examsPassed}</p>
                  <p className="text-[10px] text-text-tertiary">ناجح</p>
                </div>
              </div>

              <div className="space-y-1.5">
                {child.recentGrades.slice(0, 3).map((g) => (
                  <div key={g.subject} className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">{g.subject}</span>
                    <span className="font-medium">{g.grade}٪</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Recent Grades */}
          <div className="lg:col-span-2 p-6 rounded-xl bg-surface border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold flex items-center gap-2">
                <HiOutlineChartBar className="text-primary" size={18} />
                آخر الدرجات
              </h2>
              <Link href="/parent/children" className="text-xs text-primary hover:underline">عرض الكل</Link>
            </div>
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
                      <tr key={`${child.id}-${i}`} className="border-b border-border last:border-0 hover:bg-surface-secondary/50 transition-colors">
                        <td className="p-3 font-medium">{child.name}</td>
                        <td className="p-3 text-text-secondary">{g.subject}</td>
                        <td className="p-3 text-center font-medium">{g.grade}٪</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded-lg text-xs font-medium ${
                            g.grade >= 90 ? "bg-success/10 text-success" :
                            g.grade >= 70 ? "bg-primary/10 text-primary" :
                            g.grade >= 50 ? "bg-warning/10 text-warning" :
                            "bg-error/10 text-error"
                          }`}>
                            {g.grade >= 90 ? "ممتاز" : g.grade >= 70 ? "جيد جداً" : g.grade >= 50 ? "مقبول" : "ضعيف"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payments & Notifications */}
          <div className="space-y-4">
            {/* Upcoming Payments */}
            <div className="p-5 rounded-xl bg-surface border border-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2 text-sm">
                  <HiOutlineCurrencyDollar className="text-warning" size={16} />
                  المدفوعات القادمة
                </h3>
                <Link href="/parent/payments" className="text-xs text-primary hover:underline">عرض الكل</Link>
              </div>
              <div className="space-y-2">
                {payments.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary">
                    <div>
                      <p className="text-xs font-medium">{p.child}</p>
                      <p className="text-[10px] text-text-tertiary">استحقاق: {new Date(p.dueDate).toLocaleDateString("ar-EG")}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold">{p.amount} ج.م</p>
                      <span className={`text-[10px] ${p.status === "paid" ? "text-success" : "text-warning"}`}>
                        {p.status === "paid" ? "مدفوع" : "قيد الانتظار"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="p-5 rounded-xl bg-surface border border-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2 text-sm">
                  <HiOutlineBell className="text-primary" size={16} />
                  الإشعارات
                </h3>
              </div>
              <div className="space-y-3">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

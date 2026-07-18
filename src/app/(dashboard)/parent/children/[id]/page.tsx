"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  HiOutlineAcademicCap, HiOutlineChartBar, HiOutlineClipboardCheck,
  HiOutlineStar, HiOutlineCalendar, HiOutlineBookOpen,
  HiOutlineCurrencyDollar, HiOutlineChevronRight,
} from "react-icons/hi"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const childData = {
  id: "child-1", name: "أحمد علي", grade: "ثالثة ثانوي", school: "مدرسة النصر الثانوية",
  governorate: "القاهرة", city: "مدينة نصر", gender: "ذكر",
  studentId: "s-1", subscriptionStatus: "نشط",
  subscriptionEnd: "2026-09-15", subscriptionPlan: "الباقة الثلاثية",
  averageGrade: 87, coursesCount: 4, examsCompleted: 10, examsPassed: 8,
  attendance: 95,
  monthlyGrades: [
    { month: "يناير", grade: 82 },
    { month: "فبراير", grade: 88 },
    { month: "مارس", grade: 85 },
    { month: "أبريل", grade: 92 },
    { month: "مايو", grade: 90 },
    { month: "يونيو", grade: 87 },
  ],
  examResults: Array.from({ length: 8 }, (_, i) => ({
    id: `er-${i + 1}`, title: ["اختبار النحو", "امتحان البلاغة", "اختبار النصوص", "امتحان القواعد", "اختبار الإملاء", "امتحان التعبير", "مراجعة ليلة الامتحان", "اختبار الفصل"][i],
    grade: Math.floor(Math.random() * 40) + 55, totalGrade: 100,
    date: new Date(2026, i, 15),
  })),
  courses: [
    { id: "c1", name: "النحو والصرف", progress: 75 },
    { id: "c2", name: "البلاغة والأدب", progress: 45 },
    { id: "c3", name: "النصوص الأدبية", progress: 90 },
    { id: "c4", name: "الإملاء والخط", progress: 30 },
  ],
}

export default function ParentChildDetailPage() {
  const params = useParams()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const passedExams = childData.examResults.filter((r) => r.grade >= 50).length

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Link href="/parent/children" className="hover:text-primary">الأبناء</Link>
          <span>/</span>
          <span className="text-text">{childData.name}</span>
        </div>

        {/* Profile Header */}
        <div className="p-6 rounded-xl bg-surface border border-border">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
              {childData.name[0]}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{childData.name}</h1>
              <p className="text-text-secondary text-sm">{childData.grade} • {childData.school}</p>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-text-tertiary">
                <span>{childData.city}، {childData.governorate}</span>
                <span>•</span>
                <span>{childData.gender}</span>
                <span>•</span>
                <span>كود: {childData.studentId}</span>
              </div>
            </div>
            <div className="text-left">
              <span className="inline-block px-3 py-1.5 rounded-lg bg-success/10 text-success text-sm font-medium">
                الاشتراك: {childData.subscriptionStatus}
              </span>
              <p className="text-xs text-text-tertiary mt-1">حتى {new Date(childData.subscriptionEnd).toLocaleDateString("ar-EG")}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { icon: HiOutlineChartBar, label: "المتوسط", value: `${childData.averageGrade}٪`, color: "text-primary", bg: "bg-primary/10" },
            { icon: HiOutlineBookOpen, label: "الكورسات", value: childData.coursesCount, color: "text-info", bg: "bg-info/10" },
            { icon: HiOutlineClipboardCheck, label: "الامتحانات", value: childData.examsCompleted, color: "text-warning", bg: "bg-warning/10" },
            { icon: HiOutlineStar, label: "الناجحة", value: passedExams, color: "text-success", bg: "bg-success/10" },
            { icon: HiOutlineCalendar, label: "الحضور", value: `${childData.attendance}٪`, color: "text-error", bg: "bg-error/10" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="p-4 rounded-xl bg-surface border border-border text-center">
              <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center mx-auto mb-2`}>
                <stat.icon className={stat.color} size={18} />
              </div>
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-[10px] text-text-tertiary">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Grade Chart */}
          <div className="lg:col-span-2 p-6 rounded-xl bg-surface border border-border">
            <h2 className="font-semibold mb-4">تطور الدرجات الشهرية</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={childData.monthlyGrades}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-text-tertiary)" fontSize={12} />
                  <YAxis stroke="var(--color-text-tertiary)" fontSize={12} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "12px", color: "var(--color-text)" }} />
                  <Bar dataKey="grade" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Course Progress */}
          <div className="p-5 rounded-xl bg-surface border border-border">
            <h2 className="font-semibold mb-4">تقدم الكورسات</h2>
            <div className="space-y-4">
              {childData.courses.map((course) => (
                <div key={course.id}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium">{course.name}</span>
                    <span className="text-text-secondary">{course.progress}٪</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-tertiary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-700"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl bg-surface-secondary border border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">الاشتراك</span>
                <span className="font-medium">{childData.subscriptionPlan}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1.5">
                <span className="text-text-secondary">تاريخ الانتهاء</span>
                <span className="font-medium">{new Date(childData.subscriptionEnd).toLocaleDateString("ar-EG")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Results */}
        <div className="p-6 rounded-xl bg-surface border border-border">
          <h2 className="font-semibold mb-4">نتائج الامتحانات</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-right p-3 font-medium text-text-secondary">الامتحان</th>
                  <th className="text-center p-3 font-medium text-text-secondary">الدرجة</th>
                  <th className="text-center p-3 font-medium text-text-secondary">التاريخ</th>
                  <th className="text-center p-3 font-medium text-text-secondary">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {childData.examResults.map((r) => (
                  <tr key={r.id} className="border-b border-border last:border-0 hover:bg-surface-secondary/50 transition-colors">
                    <td className="p-3 font-medium">{r.title}</td>
                    <td className="p-3 text-center">
                      <span className={`font-medium ${r.grade >= 80 ? "text-success" : r.grade >= 50 ? "text-warning" : "text-error"}`}>
                        {r.grade}
                      </span>
                      <span className="text-text-tertiary text-xs">/{r.totalGrade}</span>
                    </td>
                    <td className="p-3 text-center text-text-secondary text-xs">{r.date.toLocaleDateString("ar-EG")}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded-lg text-xs font-medium ${
                        r.grade >= 50 ? "bg-success/10 text-success" : "bg-error/10 text-error"
                      }`}>
                        {r.grade >= 50 ? "ناجح" : "راسب"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

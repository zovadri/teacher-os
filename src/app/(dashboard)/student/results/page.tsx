"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { HiOutlineAcademicCap, HiOutlineChartBar, HiOutlineClipboardCheck, HiOutlineStar, HiOutlineDownload, HiOutlineChevronLeft } from "react-icons/hi"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const examResults = Array.from({ length: 12 }, (_, i) => ({
  id: `r-${i + 1}`,
  title: ["اختبار النحو الشامل", "امتحان البلاغة", "اختبار النصوص", "امتحان القواعد", "اختبار الإملاء", "امتحان التعبير"][i % 6],
  course: ["النحو والصرف", "البلاغة والأدب", "النصوص الأدبية", "قواعد النحو المتقدم", "الإملاء والخط", "التعبير والإنشاء"][i % 6],
  grade: Math.floor(Math.random() * 40) + 55,
  totalGrade: 100,
  date: new Date(2026, Math.floor(i / 2), (i % 20) + 1),
  percentage: Math.floor(Math.random() * 30) + 65,
  status: Math.random() > 0.15 ? "pass" : "fail",
}))

const performanceData = [
  { month: "يناير", grade: 72 },
  { month: "فبراير", grade: 78 },
  { month: "مارس", grade: 65 },
  { month: "أبريل", grade: 85 },
  { month: "مايو", grade: 82 },
  { month: "يونيو", grade: 90 },
]

const certificates = [
  { id: "cert-1", name: "شهادة إتمام النحو والصرف", date: "يونيو ٢٠٢٦", grade: "ممتاز", percentage: 92 },
  { id: "cert-2", name: "شهادة إتمام البلاغة والأدب", date: "مايو ٢٠٢٦", grade: "جيد جداً", percentage: 85 },
  { id: "cert-3", name: "شهادة إتمام النصوص الأدبية", date: "أبريل ٢٠٢٦", grade: "ممتاز", percentage: 95 },
]

export default function StudentResultsPage() {
  const [mounted, setMounted] = useState(false)
  const [sortBy, setSortBy] = useState<"date" | "grade">("date")
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const passed = examResults.filter((r) => r.status === "pass").length
  const avgGrade = Math.round(examResults.reduce((s, r) => s + r.percentage, 0) / examResults.length)
  const bestGrade = Math.max(...examResults.map((r) => r.percentage))

  const sorted = [...examResults].sort((a, b) =>
    sortBy === "date" ? b.date.getTime() - a.date.getTime() : b.percentage - a.percentage
  )

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold">النتائج والتقارير</h1>
          <p className="text-text-secondary text-sm">تابع أداءك ونتائج امتحاناتك</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: HiOutlineClipboardCheck, label: "الامتحانات", value: examResults.length, color: "text-primary", bg: "bg-primary/10" },
            { icon: HiOutlineAcademicCap, label: "الناجحة", value: passed, color: "text-success", bg: "bg-success/10" },
            { icon: HiOutlineChartBar, label: "متوسط الدرجات", value: `${avgGrade}٪`, color: "text-warning", bg: "bg-warning/10" },
            { icon: HiOutlineStar, label: "أعلى درجة", value: `${bestGrade}٪`, color: "text-error", bg: "bg-error/10" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-xl bg-surface border border-border"
            >
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={stat.color} size={20} />
              </div>
              <p className="text-2xl font-bold mb-0.5">{stat.value}</p>
              <p className="text-xs text-text-tertiary">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Performance Chart */}
        <div className="p-6 rounded-xl bg-surface border border-border">
          <h2 className="font-semibold mb-6">الأداء خلال الفصل الدراسي</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-text-tertiary)" fontSize={12} />
                <YAxis stroke="var(--color-text-tertiary)" fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "12px", color: "var(--color-text)" }} />
                <Line type="monotone" dataKey="grade" stroke="var(--color-primary)" strokeWidth={2} dot={{ fill: "var(--color-primary)", strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Exam Results Table */}
          <div className="lg:col-span-2 p-6 rounded-xl bg-surface border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">نتائج الامتحانات</h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded-lg border border-border bg-surface text-xs focus:outline-none"
              >
                <option value="date">الأحدث</option>
                <option value="grade">الأعلى درجة</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-right p-3 font-medium text-text-secondary">الامتحان</th>
                    <th className="text-right p-3 font-medium text-text-secondary">الكورس</th>
                    <th className="text-center p-3 font-medium text-text-secondary">الدرجة</th>
                    <th className="text-center p-3 font-medium text-text-secondary">النسبة</th>
                    <th className="text-center p-3 font-medium text-text-secondary">التاريخ</th>
                    <th className="text-center p-3 font-medium text-text-secondary">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.slice(0, 8).map((r, i) => (
                    <tr key={r.id} className="border-b border-border last:border-0 hover:bg-surface-secondary/50 transition-colors">
                      <td className="p-3 font-medium">{r.title}</td>
                      <td className="p-3 text-text-secondary text-xs">{r.course}</td>
                      <td className="p-3 text-center font-medium">{r.grade}<span className="text-text-tertiary text-xs">/{r.totalGrade}</span></td>
                      <td className="p-3 text-center">
                        <span className={`font-medium ${r.percentage >= 80 ? "text-success" : r.percentage >= 50 ? "text-warning" : "text-error"}`}>
                          {r.percentage}٪
                        </span>
                      </td>
                      <td className="p-3 text-center text-text-secondary text-xs">{r.date.toLocaleDateString("ar-EG")}</td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded-lg text-xs font-medium ${
                          r.status === "pass" ? "bg-success/10 text-success" : "bg-error/10 text-error"
                        }`}>
                          {r.status === "pass" ? "ناجح" : "راسب"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Certificates */}
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-surface border border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <HiOutlineStar className="text-primary" size={16} />
                الشهادات
              </h3>
              <div className="space-y-3">
                {certificates.map((cert) => (
                  <div key={cert.id} className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-surface border border-primary/20">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium">{cert.name}</p>
                        <p className="text-xs text-text-tertiary">{cert.date}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-lg bg-success/10 text-success text-xs font-medium">{cert.grade}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary">{cert.percentage}٪</span>
                      <button className="flex items-center gap-1 text-xs text-primary hover:underline">
                        <HiOutlineDownload size={14} /> تحميل
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-surface border border-border">
              <h3 className="font-semibold mb-3">نظرة عامة</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">عدد الامتحانات</span>
                  <span className="font-medium">{examResults.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">الناجحة</span>
                  <span className="font-medium text-success">{passed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">الراسبة</span>
                  <span className="font-medium text-error">{examResults.length - passed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">نسبة النجاح</span>
                  <span className="font-medium">{Math.round((passed / examResults.length) * 100)}٪</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

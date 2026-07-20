"use client"
import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  HiOutlineAcademicCap, HiOutlineChartBar, HiOutlineClipboardCheck,
  HiOutlineStar, HiOutlineCalendar, HiOutlineBookOpen,
  HiOutlineCurrencyDollar, HiOutlineChevronRight,
} from "react-icons/hi"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const allChildrenData = [
  {
    id: "child-1", name: "╪ث╪ص┘à╪» ╪╣┘┘è", grade: "╪س╪د┘╪س╪ر ╪س╪د┘┘ê┘è", school: "┘à╪»╪▒╪│╪ر ╪د┘┘╪╡╪▒ ╪د┘╪س╪د┘┘ê┘è╪ر",
    governorate: "╪د┘┘é╪د┘ç╪▒╪ر", city: "┘à╪»┘è┘╪ر ┘╪╡╪▒", gender: "╪░┘â╪▒",
    studentId: "s-1", subscriptionStatus: "┘╪┤╪╖",
    subscriptionEnd: "2026-09-15", subscriptionPlan: "╪د┘╪ذ╪د┘é╪ر ╪د┘╪س┘╪د╪س┘è╪ر",
    averageGrade: 87, coursesCount: 4, examsCompleted: 10, examsPassed: 8,
    attendance: 95,
    monthlyGrades: [
      { month: "┘è┘╪د┘è╪▒", grade: 82 },
      { month: "┘╪ذ╪▒╪د┘è╪▒", grade: 88 },
      { month: "┘à╪د╪▒╪│", grade: 85 },
      { month: "╪ث╪ذ╪▒┘è┘", grade: 92 },
      { month: "┘à╪د┘è┘ê", grade: 90 },
      { month: "┘è┘ê┘┘è┘ê", grade: 87 },
    ],
    examResults: [
      { id: "er-1", title: "╪د╪«╪ز╪ذ╪د╪▒ ╪د┘┘╪ص┘ê", grade: 82, totalGrade: 100, date: new Date(2026, 0, 15) },
      { id: "er-2", title: "╪د┘à╪ز╪ص╪د┘ ╪د┘╪ذ┘╪د╪║╪ر", grade: 75, totalGrade: 100, date: new Date(2026, 1, 15) },
      { id: "er-3", title: "╪د╪«╪ز╪ذ╪د╪▒ ╪د┘┘╪╡┘ê╪╡", grade: 91, totalGrade: 100, date: new Date(2026, 2, 15) },
      { id: "er-4", title: "╪د┘à╪ز╪ص╪د┘ ╪د┘┘é┘ê╪د╪╣╪»", grade: 68, totalGrade: 100, date: new Date(2026, 3, 15) },
      { id: "er-5", title: "╪د╪«╪ز╪ذ╪د╪▒ ╪د┘╪ح┘à┘╪د╪ة", grade: 88, totalGrade: 100, date: new Date(2026, 4, 15) },
      { id: "er-6", title: "╪د┘à╪ز╪ص╪د┘ ╪د┘╪ز╪╣╪ذ┘è╪▒", grade: 95, totalGrade: 100, date: new Date(2026, 5, 15) },
      { id: "er-7", title: "┘à╪▒╪د╪ش╪╣╪ر ┘┘è┘╪ر ╪د┘╪د┘à╪ز╪ص╪د┘", grade: 72, totalGrade: 100, date: new Date(2026, 6, 15) },
      { id: "er-8", title: "╪د╪«╪ز╪ذ╪د╪▒ ╪د┘┘╪╡┘", grade: 85, totalGrade: 100, date: new Date(2026, 7, 15) },
    ],
    courses: [
      { id: "c1", name: "╪د┘┘╪ص┘ê ┘ê╪د┘╪╡╪▒┘", progress: 75 },
      { id: "c2", name: "╪د┘╪ذ┘╪د╪║╪ر ┘ê╪د┘╪ث╪»╪ذ", progress: 45 },
      { id: "c3", name: "╪د┘┘╪╡┘ê╪╡ ╪د┘╪ث╪»╪ذ┘è╪ر", progress: 90 },
      { id: "c4", name: "╪د┘╪ح┘à┘╪د╪ة ┘ê╪د┘╪«╪╖", progress: 30 },
    ],
  },
  {
    id: "child-2", name: "┘╪د╪╖┘à╪ر ╪╣┘┘è", grade: "╪ث┘ê┘┘ë ╪س╪د┘┘ê┘è", school: "┘à╪»╪▒╪│╪ر ╪د┘┘╪╡╪▒ ╪د┘╪س╪د┘┘ê┘è╪ر",
    governorate: "╪د┘┘é╪د┘ç╪▒╪ر", city: "┘à╪»┘è┘╪ر ┘╪╡╪▒", gender: "╪ث┘╪س┘ë",
    studentId: "s-2", subscriptionStatus: "┘╪┤╪╖",
    subscriptionEnd: "2026-09-15", subscriptionPlan: "╪د┘╪ذ╪د┘é╪ر ╪د┘╪س┘╪د╪س┘è╪ر",
    averageGrade: 92, coursesCount: 3, examsCompleted: 8, examsPassed: 8,
    attendance: 98,
    monthlyGrades: [
      { month: "┘è┘╪د┘è╪▒", grade: 90 },
      { month: "┘╪ذ╪▒╪د┘è╪▒", grade: 93 },
      { month: "┘à╪د╪▒╪│", grade: 88 },
      { month: "╪ث╪ذ╪▒┘è┘", grade: 95 },
      { month: "┘à╪د┘è┘ê", grade: 91 },
      { month: "┘è┘ê┘┘è┘ê", grade: 94 },
    ],
    examResults: [
      { id: "er2-1", title: "╪د╪«╪ز╪ذ╪د╪▒ ╪د┘┘╪ص┘ê", grade: 88, totalGrade: 100, date: new Date(2026, 0, 15) },
      { id: "er2-2", title: "╪د╪«╪ز╪ذ╪د╪▒ ╪د┘┘╪╡┘ê╪╡", grade: 95, totalGrade: 100, date: new Date(2026, 1, 15) },
    ],
    courses: [
      { id: "c5", name: "┘é┘ê╪د╪╣╪» ╪د┘┘╪║╪ر", progress: 80 },
      { id: "c6", name: "╪د┘┘╪╡┘ê╪╡ ╪د┘╪ث╪»╪ذ┘è╪ر", progress: 60 },
      { id: "c7", name: "╪د┘╪ح┘à┘╪د╪ة", progress: 95 },
    ],
  },
]

export default function Content({ id }: { id: string }) {
    const childData = useMemo(() => allChildrenData.find((c) => c.id === id) || allChildrenData[0], [id])
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const passedExams = childData.examResults.filter((r) => r.grade >= 50).length

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Link href="/parent/children" className="hover:text-primary">╪د┘╪ث╪ذ┘╪د╪ة</Link>
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
              <p className="text-text-secondary text-sm">{childData.grade} ظت {childData.school}</p>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-text-tertiary">
                <span>{childData.city}╪î {childData.governorate}</span>
                <span>ظت</span>
                <span>{childData.gender}</span>
                <span>ظت</span>
                <span>┘â┘ê╪»: {childData.studentId}</span>
              </div>
            </div>
            <div className="text-left">
              <span className="inline-block px-3 py-1.5 rounded-lg bg-success/10 text-success text-sm font-medium">
                ╪د┘╪د╪┤╪ز╪▒╪د┘â: {childData.subscriptionStatus}
              </span>
              <p className="text-xs text-text-tertiary mt-1">╪ص╪ز┘ë {new Date(childData.subscriptionEnd).toLocaleDateString("ar-EG")}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { icon: HiOutlineChartBar, label: "╪د┘┘à╪ز┘ê╪│╪╖", value: `${childData.averageGrade}┘ز`, color: "text-primary", bg: "bg-primary/10" },
            { icon: HiOutlineBookOpen, label: "╪د┘┘â┘ê╪▒╪│╪د╪ز", value: childData.coursesCount, color: "text-info", bg: "bg-info/10" },
            { icon: HiOutlineClipboardCheck, label: "╪د┘╪د┘à╪ز╪ص╪د┘╪د╪ز", value: childData.examsCompleted, color: "text-warning", bg: "bg-warning/10" },
            { icon: HiOutlineStar, label: "╪د┘┘╪د╪ش╪ص╪ر", value: passedExams, color: "text-success", bg: "bg-success/10" },
            { icon: HiOutlineCalendar, label: "╪د┘╪ص╪╢┘ê╪▒", value: `${childData.attendance}┘ز`, color: "text-error", bg: "bg-error/10" },
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
            <h2 className="font-semibold mb-4">╪ز╪╖┘ê╪▒ ╪د┘╪»╪▒╪ش╪د╪ز ╪د┘╪┤┘ç╪▒┘è╪ر</h2>
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
            <h2 className="font-semibold mb-4">╪ز┘é╪»┘à ╪د┘┘â┘ê╪▒╪│╪د╪ز</h2>
            <div className="space-y-4">
              {childData.courses.map((course) => (
                <div key={course.id}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium">{course.name}</span>
                    <span className="text-text-secondary">{course.progress}┘ز</span>
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
                <span className="text-text-secondary">╪د┘╪د╪┤╪ز╪▒╪د┘â</span>
                <span className="font-medium">{childData.subscriptionPlan}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1.5">
                <span className="text-text-secondary">╪ز╪د╪▒┘è╪« ╪د┘╪د┘╪ز┘ç╪د╪ة</span>
                <span className="font-medium">{new Date(childData.subscriptionEnd).toLocaleDateString("ar-EG")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Results */}
        <div className="p-6 rounded-xl bg-surface border border-border">
          <h2 className="font-semibold mb-4">┘╪ز╪د╪خ╪ش ╪د┘╪د┘à╪ز╪ص╪د┘╪د╪ز</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-right p-3 font-medium text-text-secondary">╪د┘╪د┘à╪ز╪ص╪د┘</th>
                  <th className="text-center p-3 font-medium text-text-secondary">╪د┘╪»╪▒╪ش╪ر</th>
                  <th className="text-center p-3 font-medium text-text-secondary">╪د┘╪ز╪د╪▒┘è╪«</th>
                  <th className="text-center p-3 font-medium text-text-secondary">╪د┘╪ص╪د┘╪ر</th>
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
                        {r.grade >= 50 ? "┘╪د╪ش╪ص" : "╪▒╪د╪│╪ذ"}
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





"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  HiOutlineClipboardCheck,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineChartBar,
  HiOutlineUsers,
  HiOutlineClock,
  HiOutlineAcademicCap,
  HiOutlineStar,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { Tabs, TabPanel } from "@/components/ui/Tabs"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Table } from "@/components/ui/Table"
import { mockExams, mockStudents } from "@/lib/mock/data"

const statusBadge: Record<string, "success" | "error" | "neutral"> = {
  active: "success",
  closed: "error",
  draft: "neutral",
}

const statusLabels: Record<string, string> = {
  active: "نشط",
  closed: "مغلق",
  draft: "مسودة",
}

const difficultyLabels: Record<string, string> = {
  easy: "سهل",
  medium: "متوسط",
  hard: "صعب",
}

const difficultyColors: Record<string, string> = {
  easy: "text-success bg-success/10",
  medium: "text-warning bg-warning/10",
  hard: "text-error bg-error/10",
}

export default function ExamDetailPage() {
  const params = useParams()
  const exam = mockExams.find((e) => e.id === params.id)

  if (!exam) {
    return (
      <div className="p-4 md:p-6 text-center py-20">
        <h2 className="text-xl font-bold text-text mb-2">الامتحان غير موجود</h2>
        <p className="text-sm text-text-tertiary mb-4">لم يتم العثور على الامتحان المطلوب</p>
        <Link href="/teacher/exams">
          <button className="px-4 py-2 text-sm text-white bg-primary rounded-xl">العودة للامتحانات</button>
        </Link>
      </div>
    )
  }

  const studentResults = useMemo(() =>
    mockStudents.slice(0, 10).map((s) => ({
      id: s.id,
      name: s.name,
      grade: Math.floor(Math.random() * 60) + 25,
      time: `${Math.floor(Math.random() * 30) + 15} د`,
      status: Math.random() > 0.25 ? "pass" as const : "fail" as const,
    })), [])

  const gradeDistribution = [
    { range: "0-25", count: 8 },
    { range: "26-50", count: 22 },
    { range: "51-75", count: 45 },
    { range: "76-100", count: 35 },
  ]

  const passData = [
    { name: "ناجح", value: exam.analytics.passRate, fill: "#10B981" },
    { name: "راسب", value: exam.analytics.failRate, fill: "#EF4444" },
  ]

  const tabs = [
    { id: "questions", label: "الأسئلة", count: exam.questions.length },
    { id: "results", label: "النتائج" },
    { id: "analytics", label: "التحليلات" },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "الامتحانات", href: "/teacher/exams" }, { label: exam.title }]} />
      <DashboardHeader title={exam.title} subtitle={`${exam.duration} دقيقة · ${exam.totalGrade} درجة · ${exam.questions.length} سؤال`} />

      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <HiOutlineClipboardCheck className="text-primary" size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-text">{exam.title}</h2>
                <Badge variant={statusBadge[exam.status]}>{statusLabels[exam.status]}</Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-text-tertiary">
                <span>المدة: {exam.duration} دقيقة</span>
                <span>الدرجة: {exam.totalGrade}</span>
                <span>الأسئلة: {exam.questions.length}</span>
                <span>المحاولات: {exam.maxAttempts}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-sm text-text-secondary hover:bg-surface-secondary transition-colors">
              <HiOutlinePencil size={16} /> تعديل
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-error text-sm hover:bg-error/5 transition-colors">
              <HiOutlineTrash size={16} /> حذف
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="متوسط الدرجات" value={`${exam.analytics.averageGrade}%`} icon={HiOutlineChartBar} color="primary" />
        <StatsCard title="نسبة النجاح" value={`${exam.analytics.passRate}%`} icon={HiOutlineAcademicCap} color="success" />
        <StatsCard title="أعلى درجة" value={exam.analytics.highestGrade} icon={HiOutlineStar} color="warning" />
        <StatsCard title="متوسط الوقت" value={`${exam.analytics.averageTime} د`} icon={HiOutlineClock} color="info" />
      </div>

      <Tabs tabs={tabs} defaultTab="questions">
        {(activeTab) => (
          <>
            <TabPanel id="questions" activeTab={activeTab}>
              <Card>
                <CardHeader>
                  <CardTitle>قائمة الأسئلة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {exam.questions.map((q, i) => (
                      <div key={q.id} className="p-4 rounded-xl bg-surface-secondary border border-border flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">{i + 1}</span>
                          <div className="min-w-0">
                            <p className="text-sm text-text truncate">{q.text}</p>
                            <div className="flex items-center gap-2 text-xs text-text-tertiary mt-0.5">
                              <Badge variant="neutral" size="sm">
                                {q.type === "multiple-choice" ? "اختيار من متعدد" : q.type === "true-false" ? "صح وخطأ" : q.type === "fill-blank" ? "املأ الفراغ" : q.type === "essay" ? "مقالي" : q.type}
                              </Badge>
                              <span>{q.grade} درجة</span>
                              <span>نسبة الصحة: {q.stats.correctRate}%</span>
                            </div>
                          </div>
                        </div>
                        <span className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium ${difficultyColors[q.difficulty]}`}>
                          {difficultyLabels[q.difficulty]}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabPanel>

            <TabPanel id="results" activeTab={activeTab}>
              <Card>
                <CardHeader>
                  <CardTitle>نتائج الطلاب</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table
                    columns={[
                      { key: "name", header: "الطالب" },
                      { key: "grade", header: "الدرجة", render: (r) => (
                        <span className="font-medium">{r.grade} <span className="text-text-tertiary text-xs">/ {exam.totalGrade}</span></span>
                      )},
                      { key: "time", header: "الوقت" },
                      { key: "status", header: "الحالة", render: (r) => (
                        <Badge variant={r.status === "pass" ? "success" : "error"}>
                          {r.status === "pass" ? "ناجح" : "راسب"}
                        </Badge>
                      )},
                    ]}
                    data={studentResults}
                    onRowClick={(r) => {}}
                  />
                </CardContent>
              </Card>
            </TabPanel>

            <TabPanel id="analytics" activeTab={activeTab}>
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatsCard title="متوسط الدرجات" value={`${exam.analytics.averageGrade}%`} icon={HiOutlineChartBar} color="primary" />
                  <StatsCard title="نسبة النجاح" value={`${exam.analytics.passRate}%`} icon={HiOutlineAcademicCap} color="success" />
                  <StatsCard title="أعلى درجة" value={exam.analytics.highestGrade} icon={HiOutlineStar} color="warning" />
                  <StatsCard title="أدنى درجة" value={exam.analytics.lowestGrade} icon={HiOutlineQuestionMarkCircle} color="error" />
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>توزيع الدرجات</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div dir="ltr" className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={gradeDistribution}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                            <XAxis dataKey="range" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                            <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "8px", fontSize: "13px" }} />
                            <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>نتائج الامتحان</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { label: "نسبة النجاح", value: exam.analytics.passRate, color: "bg-success" },
                          { label: "نسبة الرسوب", value: exam.analytics.failRate, color: "bg-error" },
                          { label: "معدل الحضور", value: 85, color: "bg-info" },
                        ].map((item) => (
                          <div key={item.label} className="space-y-1.5">
                            <div className="flex justify-between text-sm">
                              <span className="text-text-secondary">{item.label}</span>
                              <span className="font-medium text-text">{item.value}%</span>
                            </div>
                            <div className="w-full h-2.5 bg-surface-tertiary rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabPanel>
          </>
        )}
      </Tabs>
    </div>
  )
}

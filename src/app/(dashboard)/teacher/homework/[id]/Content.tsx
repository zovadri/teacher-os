"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  HiOutlineClipboardCheck,
  HiOutlineUsers,
  HiOutlineClock,
  HiOutlineChartBar,
  HiOutlineAcademicCap,
  HiOutlineStar,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineExclamationCircle,
  HiOutlineSave,
  HiOutlineEye,
  HiOutlineSearch,
  HiOutlineCog,
  HiOutlineDocumentText,
  HiOutlineCalendar,
  HiOutlineBookOpen,
} from "react-icons/hi"
import { PageHeader } from "@/components/ui/PageHeader"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { Tabs, TabPanel } from "@/components/ui/Tabs"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import Button from "@/components/ui/Button"
import { SearchInput } from "@/components/ui/SearchInput"
import Input from "@/components/ui/Input"
import Textarea from "@/components/ui/Textarea"
import Select from "@/components/ui/Select"
import { Progress } from "@/components/ui/Progress"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { Modal } from "@/components/ui/Modal"
import { mockHomework, mockCourses, mockStudents } from "@/lib/mock/data"
import { cn, formatDate } from "@/lib/utils"

const statusBadge: Record<string, "success" | "warning" | "error" | "neutral"> = {
  submitted: "primary",
  graded: "success",
  late: "error",
}

const statusLabels: Record<string, string> = {
  submitted: "تم التسليم",
  graded: "مصحح",
  late: "متأخر",
}

const hwStatusBadge: Record<string, "success" | "warning" | "error" | "neutral"> = {
  active: "success",
  closed: "error",
  draft: "neutral",
}

const hwStatusLabels: Record<string, string> = {
  active: "نشط",
  closed: "مغلق",
  draft: "مسودة",
}

const hwTypeLabels: Record<string, string> = {
  quiz: "اختبار",
  pdf: "PDF",
  writing: "كتابي",
  mixed: "متنوع",
}

export default function HomeworkDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [gradingSubmission, setGradingSubmission] = useState<{
    id: string
    studentName: string
    submittedAt: Date
    grade?: number
    feedback?: string
  } | null>(null)
  const [gradeInput, setGradeInput] = useState("")
  const [feedbackInput, setFeedbackInput] = useState("")

  const homework = useMemo(() => mockHomework.find((h) => h.id === params.id), [params.id])

  const course = useMemo(
    () => homework ? mockCourses.find((c) => c.id === homework.courseId) : null,
    [homework]
  )

  const filteredSubmissions = useMemo(() => {
    if (!homework) return []
    if (!searchQuery) return homework.submissions
    return homework.submissions.filter((s) =>
      s.studentName.includes(searchQuery)
    )
  }, [homework, searchQuery])

  if (!homework) {
    return (
      <div className="p-4 md:p-6 text-center py-20">
        <h2 className="text-xl font-bold text-text mb-2">الواجب غير موجود</h2>
        <p className="text-sm text-text-tertiary mb-4">لم يتم العثور على الواجب المطلوب</p>
        <Link href="/teacher/homework">
          <Button className="px-4 py-2 text-sm text-white bg-primary rounded-xl">العودة للواجبات</Button>
        </Link>
      </div>
    )
  }

  const submittedCount = homework.submissions.filter((s) => s.status === "submitted" || s.status === "graded").length
  const notSubmittedCount = homework.analytics.notSubmitted
  const lateCount = homework.submissions.filter((s) => s.status === "late").length
  const gradedSubmissions = homework.submissions.filter((s) => s.grade !== undefined)
  const avgGrade = gradedSubmissions.length > 0
    ? Math.round(gradedSubmissions.reduce((sum, s) => sum + (s.grade || 0), 0) / gradedSubmissions.length)
    : 0

  const tabs = [
    { id: "summary", label: "ملخص" },
    { id: "submissions", label: "التسليمات", count: homework.submissions.length },
    { id: "settings", label: "الإعدادات" },
  ]

  const barData = [
    { label: "0-5", count: homework.submissions.filter((s) => s.grade !== undefined && s.grade <= 5).length, color: "bg-error" },
    { label: "6-10", count: homework.submissions.filter((s) => s.grade !== undefined && s.grade > 5 && s.grade <= 10).length, color: "bg-warning" },
    { label: "11-15", count: homework.submissions.filter((s) => s.grade !== undefined && s.grade > 10 && s.grade <= 15).length, color: "bg-amber-400" },
    { label: "16-20", count: homework.submissions.filter((s) => s.grade !== undefined && s.grade > 15 && s.grade <= 20).length, color: "bg-primary" },
    { label: "21-30", count: homework.submissions.filter((s) => s.grade !== undefined && s.grade > 20).length, color: "bg-success" },
  ]

  const maxBarCount = Math.max(...barData.map((b) => b.count), 1)

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "الواجبات", href: "/teacher/homework" }, { label: homework.title }]} />

      <DashboardHeader
        title={homework.title}
        subtitle={`${course?.title || "غير محدد"} · ${homework.totalGrade} درجة · ${hwTypeLabels[homework.type]} · ${homework.submissions.length} تسليم`}
      />

      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <HiOutlineClipboardCheck className="text-primary" size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-text">{homework.title}</h2>
                <Badge variant={hwStatusBadge[homework.status]}>{hwStatusLabels[homework.status]}</Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-text-tertiary">
                <span>{course?.title || "غير محدد"}</span>
                <span className="w-1 h-1 rounded-full bg-text-tertiary" />
                <span>{homework.totalGrade} درجة</span>
                <span className="w-1 h-1 rounded-full bg-text-tertiary" />
                <span>{hwTypeLabels[homework.type]}</span>
                <span className="w-1 h-1 rounded-full bg-text-tertiary" />
                <span>الموعد: {homework.deadline.toLocaleDateString("ar-EG")}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-sm text-text-secondary hover:bg-surface-secondary transition-colors">
              <HiOutlinePencil size={16} /> تعديل
            </Button>
            <Button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-error text-sm hover:bg-error/5 transition-colors">
              <HiOutlineTrash size={16} /> حذف
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="تم التسليم" value={submittedCount} icon={HiOutlineUsers} color="success" />
        <StatsCard title="لم يسلم" value={notSubmittedCount} icon={HiOutlineExclamationCircle} color="error" />
        <StatsCard title="متأخر" value={lateCount} icon={HiOutlineClock} color="warning" />
        <StatsCard title="متوسط الدرجات" value={`${avgGrade}%`} icon={HiOutlineChartBar} color="primary" />
      </div>

      <Tabs tabs={tabs} defaultTab="summary">
        {(activeTab) => (
          <>
            <TabPanel id="summary" activeTab={activeTab}>
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatsCard title="تم التسليم" value={submittedCount} icon={HiOutlineUsers} color="success" delay={0} />
                  <StatsCard title="لم يسلم" value={notSubmittedCount} icon={HiOutlineExclamationCircle} color="error" delay={0.1} />
                  <StatsCard title="متأخر" value={lateCount} icon={HiOutlineClock} color="warning" delay={0.2} />
                  <StatsCard title="متوسط الدرجات" value={`${avgGrade}%`} icon={HiOutlineChartBar} color="primary" delay={0.3} />
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>توزيع الدرجات</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {barData.map((bar) => (
                          <div key={bar.label} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-text-secondary">{bar.label}</span>
                              <span className="font-medium text-text">{bar.count}</span>
                            </div>
                            <div className="w-full h-3 bg-surface-tertiary rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(bar.count / maxBarCount) * 100}%` }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className={`h-full rounded-full ${bar.color}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>معلومات الواجب</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <HiOutlineBookOpen className="w-5 h-5 text-text-tertiary" />
                        <div>
                          <p className="text-xs text-text-tertiary">الكورس</p>
                          <p className="text-sm font-medium text-text">{course?.title || "غير محدد"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <HiOutlineCalendar className="w-5 h-5 text-text-tertiary" />
                        <div>
                          <p className="text-xs text-text-tertiary">الموعد النهائي</p>
                          <p className="text-sm font-medium text-text">{homework.deadline.toLocaleDateString("ar-EG")}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <HiOutlineStar className="w-5 h-5 text-text-tertiary" />
                        <div>
                          <p className="text-xs text-text-tertiary">الدرجة الكلية</p>
                          <p className="text-sm font-medium text-text">{homework.totalGrade}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <HiOutlineAcademicCap className="w-5 h-5 text-text-tertiary" />
                        <div>
                          <p className="text-xs text-text-tertiary">النوع</p>
                          <p className="text-sm font-medium text-text">{hwTypeLabels[homework.type]}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <HiOutlineClipboardCheck className="w-5 h-5 text-text-tertiary" />
                        <div>
                          <p className="text-xs text-text-tertiary">إعادة التسليم</p>
                          <p className="text-sm font-medium text-text">{homework.allowResubmit ? `مسموح (${homework.maxResubmitCount} مرات)` : "غير مسموح"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>وصف الواجب</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-text-secondary leading-relaxed">{homework.description}</p>
                  </CardContent>
                </Card>
              </div>
            </TabPanel>

            <TabPanel id="submissions" activeTab={activeTab}>
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="بحث عن طالب..." className="max-w-xs" />
                  <span className="text-sm text-text-tertiary">{filteredSubmissions.length} من {homework.submissions.length} تسليم</span>
                </div>
                <Card>
                  <CardContent className="p-0">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-surface-secondary border-b border-border">
                          <th className="text-right px-4 py-3 font-semibold text-text-secondary">الطالب</th>
                          <th className="text-right px-4 py-3 font-semibold text-text-secondary">تاريخ التسليم</th>
                          <th className="text-right px-4 py-3 font-semibold text-text-secondary">الدرجة</th>
                          <th className="text-right px-4 py-3 font-semibold text-text-secondary">الملاحظات</th>
                          <th className="text-right px-4 py-3 font-semibold text-text-secondary">الحالة</th>
                          <th className="text-right px-4 py-3 font-semibold text-text-secondary" />
                        </tr>
                      </thead>
                      <tbody>
                        {filteredSubmissions.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="text-center py-12 text-text-tertiary">لا توجد تسليمات</td>
                          </tr>
                        ) : (
                          filteredSubmissions.map((sub) => (
                            <tr
                              key={sub.id}
                              onClick={() => {
                                setGradingSubmission({
                                  id: sub.id,
                                  studentName: sub.studentName,
                                  submittedAt: sub.submittedAt,
                                  grade: sub.grade,
                                  feedback: sub.feedback,
                                })
                                setGradeInput(sub.grade?.toString() || "")
                                setFeedbackInput(sub.feedback || "")
                              }}
                              className="border-b border-border last:border-0 cursor-pointer hover:bg-surface-secondary transition-colors"
                            >
                              <td className="px-4 py-3">
                                <span className="font-medium text-text">{sub.studentName}</span>
                              </td>
                              <td className="px-4 py-3 text-sm text-text-secondary">
                                {sub.submittedAt.toLocaleDateString("ar-EG")}
                              </td>
                              <td className="px-4 py-3">
                                {sub.grade !== undefined ? (
                                  <span className="font-medium">{sub.grade} <span className="text-text-tertiary text-xs">/ {homework.totalGrade}</span></span>
                                ) : (
                                  <span className="text-text-tertiary">-</span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-sm text-text-secondary max-w-[200px] truncate">
                                {sub.feedback || "-"}
                              </td>
                              <td className="px-4 py-3">
                                <Badge variant={statusBadge[sub.status]}>{statusLabels[sub.status]}</Badge>
                              </td>
                              <td className="px-4 py-3">
                                <Button onClick={(e) => {
                                    e.stopPropagation()
                                    setGradingSubmission({
                                      id: sub.id,
                                      studentName: sub.studentName,
                                      submittedAt: sub.submittedAt,
                                      grade: sub.grade,
                                      feedback: sub.feedback,
                                    })
                                    setGradeInput(sub.grade?.toString() || "")
                                    setFeedbackInput(sub.feedback || "")
                                  }}
                                  className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                >
                                  <HiOutlineEye size={16} />
                                </Button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </div>
            </TabPanel>

            <TabPanel id="settings" activeTab={activeTab}>
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات الواجب</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 max-w-2xl">
                  <Input label="عنوان الواجب" defaultValue={homework.title} />
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-text">الوصف</label>
                    <Textarea defaultValue={homework.description} rows={4} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="الدرجة الكلية" type="number" defaultValue={homework.totalGrade} />
                    <Input label="الموعد النهائي" type="date" defaultValue={homework.deadline.toISOString().split("T")[0]} />
                  </div>
                  <Select
                    label="النوع"
                    options={[
                      { value: "quiz", label: "اختبار" },
                      { value: "pdf", label: "PDF" },
                      { value: "writing", label: "كتابي" },
                      { value: "mixed", label: "متنوع" },
                    ]}
                    defaultValue={homework.type}
                  />
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="text-sm font-medium text-text">السماح بإعادة التسليم</p>
                      <p className="text-xs text-text-tertiary">يمكن للطلاب إعادة تسليم الواجب</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={homework.allowResubmit} className="sr-only peer" />
                      <div className="w-11 h-6 bg-surface-tertiary rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-[-1.25rem]" />
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="text-sm font-medium text-text">إعادة التسليم</p>
                      <p className="text-xs text-text-tertiary">السماح للطلاب بإعادة تسليم الواجب</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={homework.allowResubmit} className="sr-only peer" />
                      <div className="w-11 h-6 bg-surface-tertiary rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-[-1.25rem]" />
                    </label>
                  </div>
                  <div className="flex items-center gap-3 pt-4">
                    <Button variant="primary" leftIcon={<HiOutlineSave className="w-4 h-4" />}>حفظ التغييرات</Button>
                    <Button variant="secondary">إلغاء</Button>
                  </div>
                </CardContent>
              </Card>
            </TabPanel>
          </>
        )}
      </Tabs>

      <Modal
        isOpen={!!gradingSubmission}
        onClose={() => setGradingSubmission(null)}
        title="تصحيح الواجب"
        subtitle={gradingSubmission?.studentName}
        size="md"
      >
        {gradingSubmission && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-secondary border border-border">
              <HiOutlineUsers className="w-5 h-5 text-text-tertiary" />
              <div>
                <p className="text-sm font-medium text-text">{gradingSubmission.studentName}</p>
                <p className="text-xs text-text-tertiary">تم التسليم: {gradingSubmission.submittedAt.toLocaleDateString("ar-EG")}</p>
              </div>
            </div>
            <Input
              label="الدرجة"
              type="number"
              value={gradeInput}
              onChange={(e) => setGradeInput(e.target.value)}
              max={homework.totalGrade}
            />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text">الملاحظات</label>
              <Textarea
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                rows={4}
                placeholder="أضف ملاحظاتك على التسليم..."
              />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Button variant="primary"
                leftIcon={<HiOutlineSave className="w-4 h-4" />}
                onClick={() => setGradingSubmission(null)}
              >
                حفظ التصحيح
              </Button>
              <Button variant="ghost" onClick={() => setGradingSubmission(null)}>إلغاء</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

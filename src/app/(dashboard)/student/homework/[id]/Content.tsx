"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  HiOutlineDocumentText, HiOutlineClock, HiOutlineAcademicCap,
  HiOutlineCheckCircle, HiOutlineUpload, HiOutlineArrowRight,
  HiOutlineChatAlt2, HiOutlineStar,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import Textarea from "@/components/ui/Textarea"
import { Progress } from "@/components/ui/Progress"
import { mockHomework, mockCourses } from "@/lib/mock/data"

const statusBadge: Record<string, "warning" | "info" | "success" | "error"> = {
  pending: "warning",
  submitted: "info",
  graded: "success",
  late: "error",
}

const statusLabels: Record<string, string> = {
  pending: "قيد الانتظار",
  submitted: "تم التسليم",
  graded: "مصحح",
  late: "متأخر",
}

export default function StudentHomeworkDetailPage() {
  const params = useParams()
  const homework = mockHomework.find((h) => h.id === params.id)
  const [notes, setNotes] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  if (!homework) {
    return (
      <div className="p-4 md:p-6 text-center py-20">
        <HiOutlineDocumentText className="mx-auto w-16 h-16 text-text-tertiary mb-4" />
        <h2 className="text-xl font-bold text-text mb-2">الواجب غير موجود</h2>
        <p className="text-sm text-text-tertiary mb-4">لم يتم العثور على الواجب المطلوب</p>
        <Link href="/student/homework">
          <Button variant="primary" rightIcon={<HiOutlineArrowRight className="w-4 h-4" />}>العودة للواجبات</Button>
        </Link>
      </div>
    )
  }

  const course = mockCourses.find((c) => c.id === homework.courseId)
  const isLate = new Date(homework.deadline) < new Date() && homework.status === "pending"
  const displayStatus = isLate ? "late" : homework.status
  const daysLeft = Math.ceil((new Date(homework.deadline).getTime() - Date.now()) / 86400000)

  const handleSubmit = () => {
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 1500)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0])
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader title={homework.title} subtitle={course?.title || "غير معروف"} />
      <div className="p-4 md:p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <HiOutlineDocumentText className="text-primary" size={24} />
                  </div>
                  <div>
                    <CardTitle>{homework.title}</CardTitle>
                    <p className="text-sm text-text-secondary">{course?.title}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 flex-wrap text-sm">
                  <div className="flex items-center gap-1.5 text-text-tertiary">
                    <HiOutlineClock size={16} />
                    <span>آخر موعد: {new Date(homework.deadline).toLocaleDateString("ar-EG")}</span>
                  </div>
                  <Badge variant={statusBadge[displayStatus]} size="md">{statusLabels[displayStatus]}</Badge>
                  {homework.grade !== undefined && homework.status === "graded" && (
                    <div className="flex items-center gap-1.5 text-success font-medium">
                      <HiOutlineStar size={16} />
                      <span>الدرجة: {homework.grade}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{homework.description}</p>
                {daysLeft > 0 && homework.status === "pending" && (
                  <div className="p-3 rounded-xl bg-warning/5 border border-warning/20">
                    <p className="text-xs text-warning font-medium">المتبقي على التسليم: {daysLeft} يوم{daysLeft > 1 ? "اً" : ""}</p>
                    <Progress value={daysLeft} max={30} size="sm" variant="warning" className="mt-2" />
                  </div>
                )}
              </CardContent>
            </Card>

            {(homework.status === "submitted" || homework.status === "graded" || submitted) && (
              <Card>
                <CardHeader>
                  <CardTitle>تفاصيل التسليم</CardTitle>
                  <Badge variant={homework.status === "graded" ? "success" : "info"}>
                    {homework.status === "graded" ? "تم التصحيح" : "بانتظار التصحيح"}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  {homework.submission && (
                    <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                      <div className="flex items-center gap-3">
                        <HiOutlineDocumentText className="text-primary" size={20} />
                        <div>
                          <p className="text-sm font-medium">{homework.submission.fileName || "الملف المرفوع"}</p>
                          <p className="text-xs text-text-tertiary">{homework.submission.submittedAt ? new Date(homework.submission.submittedAt).toLocaleDateString("ar-EG") : ""}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {homework.submission?.notes && (
                    <div>
                      <p className="text-sm font-medium mb-1">ملاحظات الطالب</p>
                      <p className="text-sm text-text-secondary bg-surface-secondary rounded-lg p-3">{homework.submission.notes}</p>
                    </div>
                  )}
                  {homework.status === "graded" && (
                    <>
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-success/5 border border-success/20">
                        <HiOutlineCheckCircle className="text-success" size={24} />
                        <div>
                          <p className="text-lg font-bold text-success">{homework.grade} درجة</p>
                          <p className="text-xs text-text-tertiary">من إجمالي {homework.totalGrade || 100} درجة</p>
                        </div>
                      </div>
                      <Progress value={((homework.grade || 0) / (homework.totalGrade || 100)) * 100} size="md" variant="success" showLabel />
                      <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <HiOutlineChatAlt2 className="text-primary" size={18} />
                          <p className="text-sm font-medium">تعليق المعلم</p>
                        </div>
                        <p className="text-sm text-text-secondary">{homework.feedback || "لم يضف المعلم تعليقات."}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {(homework.status === "pending" || (homework.status === "graded" && homework.allowResubmit)) && !submitted && (
              <Card>
                <CardHeader>
                  <CardTitle>{homework.status === "graded" ? "إعادة التسليم" : "تسليم الواجب"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    onClick={() => document.getElementById("file-upload")?.click()}
                    className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
                  >
                    <HiOutlineUpload className="mx-auto w-10 h-10 text-text-tertiary mb-2" />
                    <p className="text-sm font-medium text-text">
                      {file ? file.name : "اختر ملفاً للرفع"}
                    </p>
                    <p className="text-xs text-text-tertiary mt-1">اسحب الملف أو اضغط للاختيار (PDF, DOC, ZIP)</p>
                    <input
                      id="file-upload"
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.zip,.rar,.png,.jpg"
                    />
                  </div>
                  <Textarea
                    label="ملاحظات"
                    placeholder="أضف ملاحظات للمعلم..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </CardContent>
                <CardFooter>
                  <Button variant="primary"
                    onClick={handleSubmit}
                    isLoading={submitting}
                    disabled={!file}
                    leftIcon={<HiOutlineUpload className="w-4 h-4" />}
                  >
                    {submitting ? "جاري الرفع..." : "تسليم الواجب"}
                  </Button>
                </CardFooter>
              </Card>
            )}

            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-xl bg-success/5 border border-success/20 text-center"
              >
                <HiOutlineCheckCircle className="mx-auto w-12 h-12 text-success mb-3" />
                <h3 className="text-lg font-bold text-text mb-1">تم تسليم الواجب بنجاح!</h3>
                <p className="text-sm text-text-secondary mb-4">سيتم تصحيح الواجب في أقرب وقت ممكن</p>
                <Link href="/student/homework">
                  <Button variant="outline" rightIcon={<HiOutlineArrowRight className="w-4 h-4" />}>العودة للواجبات</Button>
                </Link>
              </motion.div>
            )}
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>معلومات الواجب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">الكورس</span>
                  <span className="font-medium">{course?.title || "غير معروف"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">آخر موعد</span>
                  <span className="font-medium">{new Date(homework.deadline).toLocaleDateString("ar-EG")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">الحالة</span>
                  <Badge variant={statusBadge[displayStatus]} size="sm">{statusLabels[displayStatus]}</Badge>
                </div>
                {homework.grade !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">الدرجة</span>
                    <span className="font-medium text-success">{homework.grade}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-text-secondary">إعادة تسليم</span>
                  <span className={homework.allowResubmit ? "text-success" : "text-text-tertiary"}>
                    {homework.allowResubmit ? "مسموح" : "غير مسموح"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Link href="/student/homework">
              <Button variant="secondary" className="w-full" rightIcon={<HiOutlineArrowRight className="w-4 h-4" />}>
                العودة للواجبات
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

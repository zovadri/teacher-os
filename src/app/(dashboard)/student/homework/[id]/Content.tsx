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
  pending: "ظ‚ظٹط¯ ط§ظ„ط§ظ†طھط¸ط§ط±",
  submitted: "طھظ… ط§ظ„طھط³ظ„ظٹظ…",
  graded: "ظ…طµط­ط­",
  late: "ظ…طھط£ط®ط±",
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
        <h2 className="text-xl font-bold text-text mb-2">ط§ظ„ظˆط§ط¬ط¨ ط؛ظٹط± ظ…ظˆط¬ظˆط¯</h2>
        <p className="text-sm text-text-tertiary mb-4">ظ„ظ… ظٹطھظ… ط§ظ„ط¹ط«ظˆط± ط¹ظ„ظ‰ ط§ظ„ظˆط§ط¬ط¨ ط§ظ„ظ…ط·ظ„ظˆط¨</p>
        <Link href="/student/homework">
          <Button variant="primary" rightIcon={<HiOutlineArrowRight className="w-4 h-4" />}>ط§ظ„ط¹ظˆط¯ط© ظ„ظ„ظˆط§ط¬ط¨ط§طھ</Button>
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
      <DashboardHeader title={homework.title} subtitle={course?.title || "ط؛ظٹط± ظ…ط¹ط±ظˆظپ"} />
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
                    <span>ط¢ط®ط± ظ…ظˆط¹ط¯: {new Date(homework.deadline).toLocaleDateString("ar-EG")}</span>
                  </div>
                  <Badge variant={statusBadge[displayStatus]} size="md">{statusLabels[displayStatus]}</Badge>
                  {homework.grade !== undefined && homework.status === "graded" && (
                    <div className="flex items-center gap-1.5 text-success font-medium">
                      <HiOutlineStar size={16} />
                      <span>ط§ظ„ط¯ط±ط¬ط©: {homework.grade}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{homework.description}</p>
                {daysLeft > 0 && homework.status === "pending" && (
                  <div className="p-3 rounded-xl bg-warning/5 border border-warning/20">
                    <p className="text-xs text-warning font-medium">ط§ظ„ظ…طھط¨ظ‚ظٹ ط¹ظ„ظ‰ ط§ظ„طھط³ظ„ظٹظ…: {daysLeft} ظٹظˆظ…{daysLeft > 1 ? "ط§ظ‹" : ""}</p>
                    <Progress value={daysLeft} max={30} size="sm" variant="warning" className="mt-2" />
                  </div>
                )}
              </CardContent>
            </Card>

            {(homework.status === "submitted" || homework.status === "graded" || submitted) && (
              <Card>
                <CardHeader>
                  <CardTitle>طھظپط§طµظٹظ„ ط§ظ„طھط³ظ„ظٹظ…</CardTitle>
                  <Badge variant={homework.status === "graded" ? "success" : "info"}>
                    {homework.status === "graded" ? "طھظ… ط§ظ„طھطµط­ظٹط­" : "ط¨ط§ظ†طھط¸ط§ط± ط§ظ„طھطµط­ظٹط­"}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  {homework.submission && (
                    <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                      <div className="flex items-center gap-3">
                        <HiOutlineDocumentText className="text-primary" size={20} />
                        <div>
                          <p className="text-sm font-medium">{homework.submission.fileName || "ط§ظ„ظ…ظ„ظپ ط§ظ„ظ…ط±ظپظˆط¹"}</p>
                          <p className="text-xs text-text-tertiary">{homework.submission.submittedAt ? new Date(homework.submission.submittedAt).toLocaleDateString("ar-EG") : ""}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {homework.submission?.notes && (
                    <div>
                      <p className="text-sm font-medium mb-1">ظ…ظ„ط§ط­ط¸ط§طھ ط§ظ„ط·ط§ظ„ط¨</p>
                      <p className="text-sm text-text-secondary bg-surface-secondary rounded-lg p-3">{homework.submission.notes}</p>
                    </div>
                  )}
                  {homework.status === "graded" && (
                    <>
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-success/5 border border-success/20">
                        <HiOutlineCheckCircle className="text-success" size={24} />
                        <div>
                          <p className="text-lg font-bold text-success">{homework.grade} ط¯ط±ط¬ط©</p>
                          <p className="text-xs text-text-tertiary">ظ…ظ† ط¥ط¬ظ…ط§ظ„ظٹ {homework.totalGrade || 100} ط¯ط±ط¬ط©</p>
                        </div>
                      </div>
                      <Progress value={((homework.grade || 0) / (homework.totalGrade || 100)) * 100} size="md" variant="success" showLabel />
                      <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <HiOutlineChatAlt2 className="text-primary" size={18} />
                          <p className="text-sm font-medium">طھط¹ظ„ظٹظ‚ ط§ظ„ظ…ط¹ظ„ظ…</p>
                        </div>
                        <p className="text-sm text-text-secondary">{homework.feedback || "ظ„ظ… ظٹط¶ظپ ط§ظ„ظ…ط¹ظ„ظ… طھط¹ظ„ظٹظ‚ط§طھ."}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {(homework.status === "pending" || (homework.status === "graded" && homework.allowResubmit)) && !submitted && (
              <Card>
                <CardHeader>
                  <CardTitle>{homework.status === "graded" ? "ط¥ط¹ط§ط¯ط© ط§ظ„طھط³ظ„ظٹظ…" : "طھط³ظ„ظٹظ… ط§ظ„ظˆط§ط¬ط¨"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    onClick={() => document.getElementById("file-upload")?.click()}
                    className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
                  >
                    <HiOutlineUpload className="mx-auto w-10 h-10 text-text-tertiary mb-2" />
                    <p className="text-sm font-medium text-text">
                      {file ? file.name : "ط§ط®طھط± ظ…ظ„ظپط§ظ‹ ظ„ظ„ط±ظپط¹"}
                    </p>
                    <p className="text-xs text-text-tertiary mt-1">ط§ط³ط­ط¨ ط§ظ„ظ…ظ„ظپ ط£ظˆ ط§ط¶ط؛ط· ظ„ظ„ط§ط®طھظٹط§ط± (PDF, DOC, ZIP)</p>
                    <input
                      id="file-upload"
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.zip,.rar,.png,.jpg"
                    />
                  </div>
                  <Textarea
                    label="ظ…ظ„ط§ط­ط¸ط§طھ"
                    placeholder="ط£ط¶ظپ ظ…ظ„ط§ط­ط¸ط§طھ ظ„ظ„ظ…ط¹ظ„ظ…..."
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
                    {submitting ? "ط¬ط§ط±ظٹ ط§ظ„ط±ظپط¹..." : "طھط³ظ„ظٹظ… ط§ظ„ظˆط§ط¬ط¨"}
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
                <h3 className="text-lg font-bold text-text mb-1">طھظ… طھط³ظ„ظٹظ… ط§ظ„ظˆط§ط¬ط¨ ط¨ظ†ط¬ط§ط­!</h3>
                <p className="text-sm text-text-secondary mb-4">ط³ظٹطھظ… طھطµط­ظٹط­ ط§ظ„ظˆط§ط¬ط¨ ظپظٹ ط£ظ‚ط±ط¨ ظˆظ‚طھ ظ…ظ…ظƒظ†</p>
                <Link href="/student/homework">
                  <Button variant="outline" rightIcon={<HiOutlineArrowRight className="w-4 h-4" />}>ط§ظ„ط¹ظˆط¯ط© ظ„ظ„ظˆط§ط¬ط¨ط§طھ</Button>
                </Link>
              </motion.div>
            )}
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„ظˆط§ط¬ط¨</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">ط§ظ„ظƒظˆط±ط³</span>
                  <span className="font-medium">{course?.title || "ط؛ظٹط± ظ…ط¹ط±ظˆظپ"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">ط¢ط®ط± ظ…ظˆط¹ط¯</span>
                  <span className="font-medium">{new Date(homework.deadline).toLocaleDateString("ar-EG")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">ط§ظ„ط­ط§ظ„ط©</span>
                  <Badge variant={statusBadge[displayStatus]} size="sm">{statusLabels[displayStatus]}</Badge>
                </div>
                {homework.grade !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">ط§ظ„ط¯ط±ط¬ط©</span>
                    <span className="font-medium text-success">{homework.grade}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-text-secondary">ط¥ط¹ط§ط¯ط© طھط³ظ„ظٹظ…</span>
                  <span className={homework.allowResubmit ? "text-success" : "text-text-tertiary"}>
                    {homework.allowResubmit ? "ظ…ط³ظ…ظˆط­" : "ط؛ظٹط± ظ…ط³ظ…ظˆط­"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Link href="/student/homework">
              <Button variant="secondary" className="w-full" rightIcon={<HiOutlineArrowRight className="w-4 h-4" />}>
                ط§ظ„ط¹ظˆط¯ط© ظ„ظ„ظˆط§ط¬ط¨ط§طھ
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import {
  HiOutlineSave,
  HiOutlineClipboardList,
  HiOutlineDocumentText,
  HiOutlinePencil,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Textarea from "@/components/ui/Textarea"
import Button from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { mockCourses } from "@/lib/mock/data"

type HomeworkType = "quiz" | "pdf" | "writing" | "mixed"

interface FormData {
  title: string
  description: string
  courseId: string
  chapterId: string
  lessonId: string
  totalGrade: string
  deadline: string
  allowResubmit: boolean
  maxResubmitCount: string
  type: HomeworkType
}

const initialForm: FormData = {
  title: "",
  description: "",
  courseId: "",
  chapterId: "",
  lessonId: "",
  totalGrade: "20",
  deadline: "",
  allowResubmit: true,
  maxResubmitCount: "2",
  type: "quiz",
}

const homeworkTypes: { type: HomeworkType; label: string; description: string }[] = [
  { type: "quiz", label: "ط§ط®طھط¨ط§ط± ظ‚طµظٹط±", description: "ط£ط³ط¦ظ„ط© طھظپط§ط¹ظ„ظٹط© ظ„ظ„ط·ظ„ط§ط¨" },
  { type: "pdf", label: "ظ…ظ„ظپ PDF", description: "ط±ظپط¹ ظ…ظ„ظپ PDF ظ„ظ„ط¥ط¬ط§ط¨ط© ط¹ظ„ظٹظ‡" },
  { type: "writing", label: "ظˆط§ط¬ط¨ ظƒطھط§ط¨ظٹ", description: "ط¥ط¬ط§ط¨ط© ظƒطھط§ط¨ظٹط© ظٹظ‚ط¯ظ…ظ‡ط§ ط§ظ„ط·ط§ظ„ط¨" },
  { type: "mixed", label: "ظ…طھظ†ظˆط¹", description: "ظ…ط²ظٹط¬ ظ…ظ† ط§ظ„ط£ظ†ظˆط§ط¹ ط§ظ„ظ…ط®طھظ„ظپط©" },
]

export default function CreateHomeworkPage() {
  const router = useRouter()
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitting, setSubmitting] = useState(false)

  const selectedCourse = mockCourses.find((c) => c.id === form.courseId)
  const selectedChapter = selectedCourse?.chapters.find((ch) => ch.id === form.chapterId)

  const update = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSubmitting(false)
    toast.success("طھظ… ط­ظپط¸ ط§ظ„ظˆط§ط¬ط¨ ط¨ظ†ط¬ط§ط­!")
    router.push("/teacher/homework")
  }

  const typeIcon = (type: HomeworkType) => {
    switch (type) {
      case "quiz": return <HiOutlineClipboardList size={24} />
      case "pdf": return <HiOutlineDocumentText size={24} />
      case "writing": return <HiOutlinePencil size={24} />
      case "mixed": return <HiOutlineDocumentText size={24} />
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "ط§ظ„ظˆط§ط¬ط¨ط§طھ", href: "/teacher/homework" }, { label: "ط¥ظ†ط´ط§ط، ظˆط§ط¬ط¨ ط¬ط¯ظٹط¯" }]} />
      <DashboardHeader title="ط¥ظ†ط´ط§ط، ظˆط§ط¬ط¨ ط¬ط¯ظٹط¯" subtitle="ط£ط¶ظپ ظˆط§ط¬ط¨ط§ظ‹ ط¬ط¯ظٹط¯ط§ظ‹ ظ„ظ„ط·ظ„ط§ط¨" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle>ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„ط£ط³ط§ط³ظٹط©</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input label="ط¹ظ†ظˆط§ظ† ط§ظ„ظˆط§ط¬ط¨" value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="ظ…ط«ط§ظ„: ظˆط§ط¬ط¨ ط§ظ„ظ†ط­ظˆ ط§ظ„ط£ط³ط¨ظˆط¹ظٹ" />
                <Textarea label="ط§ظ„ظˆطµظپ" value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="ظˆطµظپ ط§ظ„ظˆط§ط¬ط¨ ظˆطھط¹ظ„ظٹظ…ط§طھ ط§ظ„ط¥ط¬ط§ط¨ط©..." />
                <div className="grid grid-cols-2 gap-4">
                  <Select label="ط§ظ„ظƒظˆط±ط³" value={form.courseId} onChange={(e) => { update("courseId", e.target.value); update("chapterId", ""); update("lessonId", "") }} options={mockCourses.map((c) => ({ value: c.id, label: c.title }))} placeholder="ط§ط®طھط± ظƒظˆط±ط³ط§ظ‹" />
                  <Select label="ط§ظ„ظپطµظ„" value={form.chapterId} onChange={(e) => { update("chapterId", e.target.value); update("lessonId", "") }} options={selectedCourse?.chapters.map((ch) => ({ value: ch.id, label: ch.title })) || []} placeholder="ط§ط®طھط± ظپطµظ„ط§ظ‹" />
                </div>
                <Select label="ط§ظ„ط¯ط±ط³" value={form.lessonId} onChange={(e) => update("lessonId", e.target.value)} options={selectedChapter?.lessons.map((ls) => ({ value: ls.id, label: ls.title })) || []} placeholder="ط§ط®طھط± ط¯ط±ط³ط§ظ‹" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle>ظ†ظˆط¹ ط§ظ„ظˆط§ط¬ط¨</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {homeworkTypes.map((t) => (
                    <button type="button" key={t.type} onClick={() => update("type", t.type)}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${form.type === t.type ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/30 bg-surface"}`}>
                      <div className="flex justify-center mb-2">{typeIcon(t.type)}</div>
                      <p className="font-medium text-sm">{t.label}</p>
                      <p className="text-xs text-text-tertiary mt-1">{t.description}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle>ط§ظ„ط¥ط¹ط¯ط§ط¯ط§طھ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="ط§ظ„ط¯ط±ط¬ط© ط§ظ„ظ†ظ‡ط§ط¦ظٹط©" type="number" value={form.totalGrade} onChange={(e) => update("totalGrade", e.target.value)} />
                  <Input label="ظ…ظˆط¹ط¯ ط§ظ„طھط³ظ„ظٹظ…" type="date" value={form.deadline} onChange={(e) => update("deadline", e.target.value)} />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-surface-secondary border border-border">
                  <div>
                    <p className="text-sm font-medium text-text">ط§ظ„ط³ظ…ط§ط­ ط¨ط¥ط¹ط§ط¯ط© ط§ظ„طھظ‚ط¯ظٹظ…</p>
                    <p className="text-xs text-text-tertiary">ظٹظ…ظƒظ† ظ„ظ„ط·ط§ظ„ط¨ ط¥ط¹ط§ط¯ط© ط±ظپط¹ ط§ظ„ط­ظ„ ط¨ط¹ط¯ ط§ظ„طھطµط­ظٹط­</p>
                  </div>
                  <button type="button" onClick={() => update("allowResubmit", !form.allowResubmit)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${form.allowResubmit ? "bg-primary" : "bg-surface-tertiary"}`}>
                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.allowResubmit ? "translate-x-0.5" : "translate-x-[22px]"}`} />
                  </button>
                </div>
                {form.allowResubmit && (
                  <Select label="ط¹ط¯ط¯ ظ…ط±ط§طھ ط¥ط¹ط§ط¯ط© ط§ظ„طھظ‚ط¯ظٹظ… ط§ظ„ظ…ط³ظ…ظˆط­ط©" value={form.maxResubmitCount} onChange={(e) => update("maxResubmitCount", e.target.value)} options={[
                    { value: "1", label: "ظ…ط±ط© ظˆط§ط­ط¯ط©" },
                    { value: "2", label: "ظ…ط±طھط§ظ†" },
                    { value: "3", label: "3 ظ…ط±ط§طھ" },
                    { value: "5", label: "5 ظ…ط±ط§طھ" },
                    { value: "10", label: "10 ظ…ط±ط§طھ" },
                  ]} />
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card>
              <CardHeader>
                <CardTitle>ظ…ظ„ط®طµ ط§ظ„ظˆط§ط¬ط¨</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-tertiary">ط§ظ„ط¹ظ†ظˆط§ظ†</span>
                      <span className="text-text font-medium">{form.title || "ظ„ظ… ظٹظڈط­ط¯ط¯"}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-tertiary">ط§ظ„ظƒظˆط±ط³</span>
                      <span className="text-text font-medium">{selectedCourse?.title || "ظ„ظ… ظٹظڈط­ط¯ط¯"}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-tertiary">ط§ظ„ظ†ظˆط¹</span>
                      <Badge variant="primary" size="sm">{homeworkTypes.find((t) => t.type === form.type)?.label}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-tertiary">ط§ظ„ط¯ط±ط¬ط©</span>
                      <span className="text-text font-medium">{form.totalGrade} ط¯ط±ط¬ط©</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-tertiary">ط¥ط¹ط§ط¯ط© ط§ظ„طھظ‚ط¯ظٹظ…</span>
                      <span className="text-text font-medium">{form.allowResubmit ? `ظ…ط³ظ…ظˆط­ (${form.maxResubmitCount} ظ…ط±ط§طھ)` : "ط؛ظٹط± ظ…ط³ظ…ظˆط­"}</span>
                    </div>
                  </div>
                </div>

                <Button variant="success" size="lg" className="w-full" leftIcon={<HiOutlineSave size={18} />} isLoading={submitting} onClick={handleSubmit}>
                  ط­ظپط¸ ط§ظ„ظˆط§ط¬ط¨
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

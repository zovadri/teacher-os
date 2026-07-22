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
import { PageHeader } from "@/components/ui/PageHeader"
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
  { type: "quiz", label: "اختبار قصير", description: "أسئلة تفاعلية للطلاب" },
  { type: "pdf", label: "ملف PDF", description: "رفع ملف PDF للإجابة عليه" },
  { type: "writing", label: "واجب كتابي", description: "إجابة كتابية يقدمها الطالب" },
  { type: "mixed", label: "متنوع", description: "مزيج من الأنواع المختلفة" },
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
    toast.success("تم حفظ الواجب بنجاح!")
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
      <Breadcrumb items={[{ label: "الواجبات", href: "/teacher/homework" }, { label: "إنشاء واجب جديد" }]} />
      <PageHeader title="إنشاء واجب جديد" description="أضف واجباً جديداً للطلاب" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle>المعلومات الأساسية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input label="عنوان الواجب" value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="مثال: واجب النحو الأسبوعي" />
                <Textarea label="الوصف" value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="وصف الواجب وتعليمات الإجابة..." />
                <div className="grid grid-cols-2 gap-4">
                  <Select label="الكورس" value={form.courseId} onChange={(e) => { update("courseId", e.target.value); update("chapterId", ""); update("lessonId", "") }} options={mockCourses.map((c) => ({ value: c.id, label: c.title }))} placeholder="اختر كورساً" />
                  <Select label="الفصل" value={form.chapterId} onChange={(e) => { update("chapterId", e.target.value); update("lessonId", "") }} options={selectedCourse?.chapters.map((ch) => ({ value: ch.id, label: ch.title })) || []} placeholder="اختر فصلاً" />
                </div>
                <Select label="الدرس" value={form.lessonId} onChange={(e) => update("lessonId", e.target.value)} options={selectedChapter?.lessons.map((ls) => ({ value: ls.id, label: ls.title })) || []} placeholder="اختر درساً" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle>نوع الواجب</CardTitle>
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
                <CardTitle>الإعدادات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="الدرجة النهائية" type="number" value={form.totalGrade} onChange={(e) => update("totalGrade", e.target.value)} />
                  <Input label="موعد التسليم" type="date" value={form.deadline} onChange={(e) => update("deadline", e.target.value)} />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-surface-secondary border border-border">
                  <div>
                    <p className="text-sm font-medium text-text">السماح بإعادة التقديم</p>
                    <p className="text-xs text-text-tertiary">يمكن للطالب إعادة رفع الحل بعد التصحيح</p>
                  </div>
                  <button type="button" onClick={() => update("allowResubmit", !form.allowResubmit)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${form.allowResubmit ? "bg-primary" : "bg-surface-tertiary"}`}>
                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.allowResubmit ? "translate-x-0.5" : "translate-x-[22px]"}`} />
                  </button>
                </div>
                {form.allowResubmit && (
                  <Select label="عدد مرات إعادة التقديم المسموحة" value={form.maxResubmitCount} onChange={(e) => update("maxResubmitCount", e.target.value)} options={[
                    { value: "1", label: "مرة واحدة" },
                    { value: "2", label: "مرتان" },
                    { value: "3", label: "3 مرات" },
                    { value: "5", label: "5 مرات" },
                    { value: "10", label: "10 مرات" },
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
                <CardTitle>ملخص الواجب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-tertiary">العنوان</span>
                      <span className="text-text font-medium">{form.title || "لم يُحدد"}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-tertiary">الكورس</span>
                      <span className="text-text font-medium">{selectedCourse?.title || "لم يُحدد"}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-tertiary">النوع</span>
                      <Badge variant="primary" size="sm">{homeworkTypes.find((t) => t.type === form.type)?.label}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-tertiary">الدرجة</span>
                      <span className="text-text font-medium">{form.totalGrade} درجة</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-tertiary">إعادة التقديم</span>
                      <span className="text-text font-medium">{form.allowResubmit ? `مسموح (${form.maxResubmitCount} مرات)` : "غير مسموح"}</span>
                    </div>
                  </div>
                </div>

                <Button variant="success" size="lg" className="w-full" leftIcon={<HiOutlineSave size={18} />} isLoading={submitting} onClick={handleSubmit}>
                  حفظ الواجب
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

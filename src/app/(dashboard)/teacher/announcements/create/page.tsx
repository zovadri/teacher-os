"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import {
  HiOutlineCheck,
  HiOutlinePencilAlt,
  HiOutlineMail,
} from "react-icons/hi"
import { PageHeader } from "@/components/ui/PageHeader"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Textarea from "@/components/ui/Textarea"
import Button from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"

const typeOptions = [
  { value: "info", label: "معلومات" },
  { value: "warning", label: "تنبيه" },
  { value: "success", label: "نجاح" },
  { value: "emergency", label: "طارئ" },
]

const targetOptions = [
  { value: "all", label: "الجميع" },
  { value: "students", label: "الطلاب" },
  { value: "teachers", label: "المعلمين" },
  { value: "parents", label: "أولياء الأمور" },
  { value: "staff", label: "الموظفين" },
]

const priorityOptions = [
  { value: "high", label: "عالي" },
  { value: "medium", label: "متوسط" },
  { value: "low", label: "منخفض" },
]

const courseOptions = [
  { value: "c-1", label: "الرياضيات" },
  { value: "c-2", label: "العلوم" },
  { value: "c-3", label: "اللغة العربية" },
  { value: "c-4", label: "اللغة الإنجليزية" },
  { value: "c-5", label: "الدراسات الاجتماعية" },
]

const gradeOptions = [
  { value: "أولى ثانوي", label: "أولى ثانوي" },
  { value: "ثانية ثانوي", label: "ثانية ثانوي" },
  { value: "ثالثة ثانوي", label: "ثالثة ثانوي" },
]

const typeBadge: Record<string, "primary" | "warning" | "success" | "error"> = {
  info: "primary",
  warning: "warning",
  success: "success",
  emergency: "error",
}

const targetBadge: Record<string, "info" | "primary" | "success" | "warning" | "neutral"> = {
  all: "info",
  students: "primary",
  teachers: "success",
  parents: "warning",
  staff: "neutral",
}

const priorityBadge: Record<string, "error" | "warning" | "neutral"> = {
  high: "error",
  medium: "warning",
  low: "neutral",
}

interface FormData {
  title: string
  content: string
  type: string
  target: string
  courseId: string
  grade: string
  priority: string
  scheduleEnabled: boolean
  scheduleDate: string
}

const initialForm: FormData = {
  title: "",
  content: "",
  type: "info",
  target: "all",
  courseId: "",
  grade: "",
  priority: "medium",
  scheduleEnabled: false,
  scheduleDate: "",
}

export default function CreateAnnouncementPage() {
  const router = useRouter()
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitting, setSubmitting] = useState(false)

  const update = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (status: "published" | "draft") => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSubmitting(false)
    toast.success(`تم ${status === "published" ? "نشر" : "حفظ"} الإعلان بنجاح!`)
    router.push("/teacher/announcements")
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "الإعلانات", href: "/teacher/announcements" }, { label: "إنشاء إعلان" }]} />
      <PageHeader title="إنشاء إعلان جديد" description="أنشئ إعلاناً وأرسله للطلاب أو أولياء الأمور أو المعلمين" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle>معلومات الإعلان</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="عنوان الإعلان"
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="أدخل عنوان الإعلان"
                />
                <Textarea
                  label="المحتوى"
                  value={form.content}
                  onChange={(e) => update("content", e.target.value)}
                  placeholder="أدخل نص الإعلان..."
                  className="min-h-[140px]"
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle>الإعدادات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="النوع"
                    value={form.type}
                    onChange={(e) => update("type", e.target.value)}
                    options={typeOptions}
                  />
                  <Select
                    label="المستهدف"
                    value={form.target}
                    onChange={(e) => { update("target", e.target.value); if (e.target.value !== "students") update("courseId", "") }}
                    options={targetOptions}
                  />
                </div>
                {form.target === "students" && (
                  <Select
                    label="الكورس (اختياري)"
                    value={form.courseId}
                    onChange={(e) => update("courseId", e.target.value)}
                    options={courseOptions}
                    placeholder="اختر كورساً"
                  />
                )}
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="الصف (اختياري)"
                    value={form.grade}
                    onChange={(e) => update("grade", e.target.value)}
                    options={gradeOptions}
                    placeholder="اختر صفاً"
                  />
                  <Select
                    label="الأولوية"
                    value={form.priority}
                    onChange={(e) => update("priority", e.target.value)}
                    options={priorityOptions}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-surface-secondary border border-border">
                  <div>
                    <p className="text-sm font-medium text-text">جدولة الإعلان</p>
                    <p className="text-xs text-text-tertiary">تحديد تاريخ ووقت النشر</p>
                  </div>
                  <button type="button"
                    onClick={() => update("scheduleEnabled", !form.scheduleEnabled)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${form.scheduleEnabled ? "bg-primary" : "bg-surface-tertiary"}`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.scheduleEnabled ? "translate-x-0.5" : "translate-x-[22px]"}`} />
                  </button>
                </div>
                {form.scheduleEnabled && (
                  <Input
                    label="تاريخ النشر"
                    type="datetime-local"
                    value={form.scheduleDate}
                    onChange={(e) => update("scheduleDate", e.target.value)}
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card>
              <CardHeader>
                <CardTitle>ملخص الإعلان</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-tertiary">العنوان</span>
                      <span className="text-text font-medium">{form.title || "لم يُحدد"}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-tertiary">النوع</span>
                      <Badge variant={typeBadge[form.type]} size="sm">{typeOptions.find((o) => o.value === form.type)?.label}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-tertiary">المستهدف</span>
                      <Badge variant={targetBadge[form.target]} size="sm">{targetOptions.find((o) => o.value === form.target)?.label}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-tertiary">الأولوية</span>
                      <Badge variant={priorityBadge[form.priority]} size="sm">{priorityOptions.find((o) => o.value === form.priority)?.label}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-tertiary">جدولة</span>
                      <span className="text-text font-medium">{form.scheduleEnabled ? "مفعلة" : "غير مفعلة"}</span>
                    </div>
                  </div>
                </div>
                <Button variant="success" size="lg" className="w-full" leftIcon={<HiOutlineCheck size={18} />} isLoading={submitting} onClick={() => handleSubmit("published")}>
                  نشر الإعلان
                </Button>
                <Button variant="secondary" size="lg" className="w-full" leftIcon={<HiOutlinePencilAlt size={18} />} isLoading={submitting} onClick={() => handleSubmit("draft")}>
                  حفظ كمسودة
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

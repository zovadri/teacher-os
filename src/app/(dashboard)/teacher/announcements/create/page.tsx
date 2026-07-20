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
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Textarea from "@/components/ui/Textarea"
import Button from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"

const typeOptions = [
  { value: "info", label: "ظ…ط¹ظ„ظˆظ…ط§طھ" },
  { value: "warning", label: "طھظ†ط¨ظٹظ‡" },
  { value: "success", label: "ظ†ط¬ط§ط­" },
  { value: "emergency", label: "ط·ط§ط±ط¦" },
]

const targetOptions = [
  { value: "all", label: "ط§ظ„ط¬ظ…ظٹط¹" },
  { value: "students", label: "ط§ظ„ط·ظ„ط§ط¨" },
  { value: "teachers", label: "ط§ظ„ظ…ط¹ظ„ظ…ظٹظ†" },
  { value: "parents", label: "ط£ظˆظ„ظٹط§ط، ط§ظ„ط£ظ…ظˆط±" },
  { value: "staff", label: "ط§ظ„ظ…ظˆط¸ظپظٹظ†" },
]

const priorityOptions = [
  { value: "high", label: "ط¹ط§ظ„ظٹ" },
  { value: "medium", label: "ظ…طھظˆط³ط·" },
  { value: "low", label: "ظ…ظ†ط®ظپط¶" },
]

const courseOptions = [
  { value: "c-1", label: "ط§ظ„ط±ظٹط§ط¶ظٹط§طھ" },
  { value: "c-2", label: "ط§ظ„ط¹ظ„ظˆظ…" },
  { value: "c-3", label: "ط§ظ„ظ„ط؛ط© ط§ظ„ط¹ط±ط¨ظٹط©" },
  { value: "c-4", label: "ط§ظ„ظ„ط؛ط© ط§ظ„ط¥ظ†ط¬ظ„ظٹط²ظٹط©" },
  { value: "c-5", label: "ط§ظ„ط¯ط±ط§ط³ط§طھ ط§ظ„ط§ط¬طھظ…ط§ط¹ظٹط©" },
]

const gradeOptions = [
  { value: "ط£ظˆظ„ظ‰ ط«ط§ظ†ظˆظٹ", label: "ط£ظˆظ„ظ‰ ط«ط§ظ†ظˆظٹ" },
  { value: "ط«ط§ظ†ظٹط© ط«ط§ظ†ظˆظٹ", label: "ط«ط§ظ†ظٹط© ط«ط§ظ†ظˆظٹ" },
  { value: "ط«ط§ظ„ط«ط© ط«ط§ظ†ظˆظٹ", label: "ط«ط§ظ„ط«ط© ط«ط§ظ†ظˆظٹ" },
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
    toast.success(`طھظ… ${status === "published" ? "ظ†ط´ط±" : "ط­ظپط¸"} ط§ظ„ط¥ط¹ظ„ط§ظ† ط¨ظ†ط¬ط§ط­!`)
    router.push("/teacher/announcements")
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "ط§ظ„ط¥ط¹ظ„ط§ظ†ط§طھ", href: "/teacher/announcements" }, { label: "ط¥ظ†ط´ط§ط، ط¥ط¹ظ„ط§ظ†" }]} />
      <DashboardHeader title="ط¥ظ†ط´ط§ط، ط¥ط¹ظ„ط§ظ† ط¬ط¯ظٹط¯" subtitle="ط£ظ†ط´ط¦ ط¥ط¹ظ„ط§ظ†ط§ظ‹ ظˆط£ط±ط³ظ„ظ‡ ظ„ظ„ط·ظ„ط§ط¨ ط£ظˆ ط£ظˆظ„ظٹط§ط، ط§ظ„ط£ظ…ظˆط± ط£ظˆ ط§ظ„ظ…ط¹ظ„ظ…ظٹظ†" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle>ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„ط¥ط¹ظ„ط§ظ†</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="ط¹ظ†ظˆط§ظ† ط§ظ„ط¥ط¹ظ„ط§ظ†"
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="ط£ط¯ط®ظ„ ط¹ظ†ظˆط§ظ† ط§ظ„ط¥ط¹ظ„ط§ظ†"
                />
                <Textarea
                  label="ط§ظ„ظ…ط­طھظˆظ‰"
                  value={form.content}
                  onChange={(e) => update("content", e.target.value)}
                  placeholder="ط£ط¯ط®ظ„ ظ†طµ ط§ظ„ط¥ط¹ظ„ط§ظ†..."
                  className="min-h-[140px]"
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle>ط§ظ„ط¥ط¹ط¯ط§ط¯ط§طھ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="ط§ظ„ظ†ظˆط¹"
                    value={form.type}
                    onChange={(e) => update("type", e.target.value)}
                    options={typeOptions}
                  />
                  <Select
                    label="ط§ظ„ظ…ط³طھظ‡ط¯ظپ"
                    value={form.target}
                    onChange={(e) => { update("target", e.target.value); if (e.target.value !== "students") update("courseId", "") }}
                    options={targetOptions}
                  />
                </div>
                {form.target === "students" && (
                  <Select
                    label="ط§ظ„ظƒظˆط±ط³ (ط§ط®طھظٹط§ط±ظٹ)"
                    value={form.courseId}
                    onChange={(e) => update("courseId", e.target.value)}
                    options={courseOptions}
                    placeholder="ط§ط®طھط± ظƒظˆط±ط³ط§ظ‹"
                  />
                )}
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="ط§ظ„طµظپ (ط§ط®طھظٹط§ط±ظٹ)"
                    value={form.grade}
                    onChange={(e) => update("grade", e.target.value)}
                    options={gradeOptions}
                    placeholder="ط§ط®طھط± طµظپط§ظ‹"
                  />
                  <Select
                    label="ط§ظ„ط£ظˆظ„ظˆظٹط©"
                    value={form.priority}
                    onChange={(e) => update("priority", e.target.value)}
                    options={priorityOptions}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-surface-secondary border border-border">
                  <div>
                    <p className="text-sm font-medium text-text">ط¬ط¯ظˆظ„ط© ط§ظ„ط¥ط¹ظ„ط§ظ†</p>
                    <p className="text-xs text-text-tertiary">طھط­ط¯ظٹط¯ طھط§ط±ظٹط® ظˆظˆظ‚طھ ط§ظ„ظ†ط´ط±</p>
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
                    label="طھط§ط±ظٹط® ط§ظ„ظ†ط´ط±"
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
                <CardTitle>ظ…ظ„ط®طµ ط§ظ„ط¥ط¹ظ„ط§ظ†</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-tertiary">ط§ظ„ط¹ظ†ظˆط§ظ†</span>
                      <span className="text-text font-medium">{form.title || "ظ„ظ… ظٹظڈط­ط¯ط¯"}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-tertiary">ط§ظ„ظ†ظˆط¹</span>
                      <Badge variant={typeBadge[form.type]} size="sm">{typeOptions.find((o) => o.value === form.type)?.label}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-tertiary">ط§ظ„ظ…ط³طھظ‡ط¯ظپ</span>
                      <Badge variant={targetBadge[form.target]} size="sm">{targetOptions.find((o) => o.value === form.target)?.label}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-tertiary">ط§ظ„ط£ظˆظ„ظˆظٹط©</span>
                      <Badge variant={priorityBadge[form.priority]} size="sm">{priorityOptions.find((o) => o.value === form.priority)?.label}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-tertiary">ط¬ط¯ظˆظ„ط©</span>
                      <span className="text-text font-medium">{form.scheduleEnabled ? "ظ…ظپط¹ظ„ط©" : "ط؛ظٹط± ظ…ظپط¹ظ„ط©"}</span>
                    </div>
                  </div>
                </div>
                <Button variant="success" size="lg" className="w-full" leftIcon={<HiOutlineCheck size={18} />} isLoading={submitting} onClick={() => handleSubmit("published")}>
                  ظ†ط´ط± ط§ظ„ط¥ط¹ظ„ط§ظ†
                </Button>
                <Button variant="secondary" size="lg" className="w-full" leftIcon={<HiOutlinePencilAlt size={18} />} isLoading={submitting} onClick={() => handleSubmit("draft")}>
                  ط­ظپط¸ ظƒظ…ط³ظˆط¯ط©
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

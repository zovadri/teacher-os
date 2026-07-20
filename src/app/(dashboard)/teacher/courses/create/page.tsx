"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { HiOutlineCheck, HiOutlineCamera, HiOutlineSave, HiOutlinePlus, HiOutlineTrash, HiOutlineArrowRight } from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Textarea from "@/components/ui/Textarea"
import Button from "@/components/ui/Button"
import { cn } from "@/lib/utils"

const subjects = [
  { value: "ظ„ط؛ط© ط¹ط±ط¨ظٹط©", label: "ظ„ط؛ط© ط¹ط±ط¨ظٹط©" },
  { value: "ظ„ط؛ط© ط¥ظ†ط¬ظ„ظٹط²ظٹط©", label: "ظ„ط؛ط© ط¥ظ†ط¬ظ„ظٹط²ظٹط©" },
  { value: "ط±ظٹط§ط¶ظٹط§طھ", label: "ط±ظٹط§ط¶ظٹط§طھ" },
  { value: "ط¹ظ„ظˆظ…", label: "ط¹ظ„ظˆظ…" },
  { value: "ط¯ط±ط§ط³ط§طھ", label: "ط¯ط±ط§ط³ط§طھ" },
]

const grades = [
  { value: "ط£ظˆظ„ظ‰ ط«ط§ظ†ظˆظٹ", label: "ط£ظˆظ„ظ‰ ط«ط§ظ†ظˆظٹ" },
  { value: "ط«ط§ظ†ظٹط© ط«ط§ظ†ظˆظٹ", label: "ط«ط§ظ†ظٹط© ط«ط§ظ†ظˆظٹ" },
  { value: "ط«ط§ظ„ط«ط© ط«ط§ظ†ظˆظٹ", label: "ط«ط§ظ„ط«ط© ط«ط§ظ†ظˆظٹ" },
]

const terms = [
  { value: "ط§ظ„ط£ظˆظ„", label: "ط§ظ„ط£ظˆظ„" },
  { value: "ط§ظ„ط«ط§ظ†ظٹ", label: "ط§ظ„ط«ط§ظ†ظٹ" },
]

const categories = [
  { value: "ظ„ط؛ظˆظٹط§طھ", label: "ظ„ط؛ظˆظٹط§طھ" },
  { value: "ط£ط¯ط¨", label: "ط£ط¯ط¨" },
  { value: "ظ…ظ‡ط§ط±ط§طھ", label: "ظ…ظ‡ط§ط±ط§طھ" },
  { value: "ظ…ط±ط§ط¬ط¹ط©", label: "ظ…ط±ط§ط¬ط¹ط©" },
]

const statusOptions = [
  { value: "draft", label: "ظ…ط³ظˆط¯ط©" },
  { value: "published", label: "ظ…ظ†ط´ظˆط±" },
  { value: "coming-soon", label: "ظ‚ط±ظٹط¨ط§ظ‹" },
]

const lessonStatusOptions = [
  { value: "available", label: "ظ…طھط§ط­" },
  { value: "locked", label: "ظ…ظ‚ظپظ„" },
  { value: "coming-soon", label: "ظ‚ط±ظٹط¨ط§ظ‹" },
]

interface LessonEntry {
  id: string
  title: string
  duration: string
  status: string
  prerequisite: string
  availableDate: string
}

interface ChapterEntry {
  id: string
  title: string
  lessons: LessonEntry[]
}

interface FormData {
  title: string
  shortDescription: string
  description: string
  subject: string
  grade: string
  term: string
  category: string
  price: string
  discountPrice: string
  status: string
  isFree: boolean
  requiresCode: boolean
}

const initialForm: FormData = {
  title: "",
  shortDescription: "",
  description: "",
  subject: "ظ„ط؛ط© ط¹ط±ط¨ظٹط©",
  grade: "ط«ط§ظ„ط«ط© ط«ط§ظ†ظˆظٹ",
  term: "ط§ظ„ط£ظˆظ„",
  category: "ظ„ط؛ظˆظٹط§طھ",
  price: "",
  discountPrice: "",
  status: "draft",
  isFree: false,
  requiresCode: false,
}

let lessonCounter = 0
let chapterCounter = 0

function createLesson(): LessonEntry {
  lessonCounter += 1
  return { id: `lesson-${lessonCounter}`, title: "", duration: "30", status: "available", prerequisite: "", availableDate: "" }
}

function createChapter(): ChapterEntry {
  chapterCounter += 1
  return { id: `chapter-${chapterCounter}`, title: "", lessons: [createLesson()] }
}

export default function CreateCoursePage() {
  const router = useRouter()
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [chapters, setChapters] = useState<ChapterEntry[]>([])

  const update = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {}
    if (!form.title.trim()) errs.title = "ط¹ظ†ظˆط§ظ† ط§ظ„ظƒظˆط±ط³ ظ…ط·ظ„ظˆط¨"
    if (!form.shortDescription.trim()) errs.shortDescription = "ط§ظ„ظˆطµظپ ط§ظ„ظ…ط®طھطµط± ظ…ط·ظ„ظˆط¨"
    if (!form.description.trim()) errs.description = "ط§ظ„ظˆطµظپ ط§ظ„ظƒط§ظ…ظ„ ظ…ط·ظ„ظˆط¨"
    if (!form.isFree && (!form.price || Number(form.price) <= 0))
      errs.price = "ط§ظ„ط³ط¹ط± ظ…ط·ظ„ظˆط¨ ظˆظ‚ظٹظ…طھظ‡ ط£ظƒط¨ط± ظ…ظ† 0"
    if (form.discountPrice && Number(form.discountPrice) >= Number(form.price))
      errs.discountPrice = "ط³ط¹ط± ط§ظ„ط®طµظ… ظٹط¬ط¨ ط£ظ† ظٹظƒظˆظ† ط£ظ‚ظ„ ظ…ظ† ط§ظ„ط³ط¹ط± ط§ظ„ط£طµظ„ظٹ"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSubmitting(false)
    setSubmitted(true)
    toast.success("طھظ… ط¥ظ†ط´ط§ط، ط§ظ„ظƒظˆط±ط³ ط¨ظ†ط¬ط§ط­!")
  }

  const addChapter = () => setChapters((prev) => [...prev, createChapter()])

  const removeChapter = (id: string) => setChapters((prev) => prev.filter((c) => c.id !== id))

  const updateChapter = (id: string, title: string) =>
    setChapters((prev) => prev.map((c) => (c.id === id ? { ...c, title } : c)))

  const addLesson = (chapterId: string) =>
    setChapters((prev) => prev.map((c) => (c.id === chapterId ? { ...c, lessons: [...c.lessons, createLesson()] } : c)))

  const removeLesson = (chapterId: string, lessonId: string) =>
    setChapters((prev) =>
      prev.map((c) => (c.id === chapterId ? { ...c, lessons: c.lessons.filter((l) => l.id !== lessonId) } : c))
    )

  const updateLesson = (chapterId: string, lessonId: string, data: Partial<LessonEntry>) =>
    setChapters((prev) =>
      prev.map((c) =>
        c.id === chapterId
          ? { ...c, lessons: c.lessons.map((l) => (l.id === lessonId ? { ...l, ...data } : l)) }
          : c
      )
    )

  const allLessonTitles = chapters.flatMap((c) =>
    c.lessons.filter((l) => l.title.trim()).map((l) => ({ value: l.id, label: l.title }))
  )

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 md:p-6">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
            <HiOutlineCheck size={32} className="text-success" />
          </div>
          <h2 className="text-xl font-bold text-text mb-2">طھظ… ط¥ظ†ط´ط§ط، ط§ظ„ظƒظˆط±ط³ ط¨ظ†ط¬ط§ط­</h2>
          <p className="text-sm text-text-tertiary mb-6">طھظ… ط­ظپط¸ ط§ظ„ظƒظˆط±ط³ &ldquo;{form.title}&rdquo; ط¨ظ†ط¬ط§ط­</p>
          <div className="flex items-center gap-3">
            <Button variant="primary" onClick={() => { setSubmitted(false); setForm(initialForm); setChapters([]) }}>
              ط¥ظ†ط´ط§ط، ظƒظˆط±ط³ ط¢ط®ط±
            </Button>
            <Button variant="outline" onClick={() => router.push("/teacher/courses")} leftIcon={<HiOutlineArrowRight size={18} />}>
              ط§ظ„ط¹ظˆط¯ط© ط¥ظ„ظ‰ ط§ظ„ظƒظˆط±ط³ط§طھ
            </Button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "ط§ظ„ظƒظˆط±ط³ط§طھ", href: "/teacher/courses" }, { label: "ط¥ط¶ط§ظپط© ظƒظˆط±ط³ ط¬ط¯ظٹط¯" }]} />
      <DashboardHeader title="ط¥ط¶ط§ظپط© ظƒظˆط±ط³ ط¬ط¯ظٹط¯" />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ط§ظ„ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„ط£ط³ط§ط³ظٹط©</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="ط¹ظ†ظˆط§ظ† ط§ظ„ظƒظˆط±ط³" value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="ظ…ط«ط§ظ„: ط§ظ„ظ†ط­ظˆ ظˆط§ظ„طµط±ظپ" error={errors.title} />
              <div className="grid grid-cols-2 gap-4">
                <Select label="ط§ظ„ظ…ط§ط¯ط©" value={form.subject} onChange={(e) => update("subject", e.target.value)} options={subjects} />
                <Select label="ط§ظ„طµظپ" value={form.grade} onChange={(e) => update("grade", e.target.value)} options={grades} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Select label="ط§ظ„طھط±ظ…" value={form.term} onChange={(e) => update("term", e.target.value)} options={terms} />
                <Select label="ط§ظ„طھطµظ†ظٹظپ" value={form.category} onChange={(e) => update("category", e.target.value)} options={categories} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ط§ظ„ظˆطµظپ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="ط§ظ„ظˆطµظپ ط§ظ„ظ…ط®طھطµط±" value={form.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} placeholder="ظˆطµظپ ظ…ط®طھطµط± ظ„ظ„ظƒظˆط±ط³..." error={errors.shortDescription} />
              <Textarea label="ط§ظ„ظˆطµظپ ط§ظ„ظƒط§ظ…ظ„" value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="ظˆطµظپ طھظپطµظٹظ„ظٹ ظ„ظ…ط­طھظˆظ‰ ط§ظ„ظƒظˆط±ط³..." error={errors.description} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ط§ظ„طھط³ط¹ظٹط±</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isFree} onChange={(e) => update("isFree", e.target.checked)} className="w-4 h-4 accent-primary" />
                  <span className="text-sm text-text">ظƒظˆط±ط³ ظ…ط¬ط§ظ†ظٹ</span>
                </label>
              </div>
              {!form.isFree && (
                <div className="grid grid-cols-2 gap-4">
                  <Input label="ط§ظ„ط³ط¹ط± (ط¬ظ†ظٹظ‡)" type="number" value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="0" error={errors.price} />
                  <Input label="ط³ط¹ط± ط§ظ„ط®طµظ… (ط§ط®طھظٹط§ط±ظٹ)" type="number" value={form.discountPrice} onChange={(e) => update("discountPrice", e.target.value)} placeholder="0" error={errors.discountPrice} />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ط§ظ„ظپطµظˆظ„ ظˆط§ظ„ط¯ط±ظˆط³</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {chapters.length === 0 && (
                <p className="text-sm text-text-tertiary text-center py-4">ظ„ظ… ظٹطھظ… ط¥ط¶ط§ظپط© ط£ظٹ ظپطµظˆظ„ ط¨ط¹ط¯. ط£ط¶ظپ ظپطµظ„ط§ظ‹ ظ„ظ„ط¨ط¯ط،.</p>
              )}
              {chapters.map((chapter) => (
                <div key={chapter.id} className="border border-border rounded-xl overflow-hidden">
                  <div className="flex items-center gap-3 p-3 bg-surface-secondary">
                    <Input
                      value={chapter.title}
                      onChange={(e) => updateChapter(chapter.id, e.target.value)}
                      placeholder="ط¹ظ†ظˆط§ظ† ط§ظ„ظپطµظ„"
                      className="flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeChapter(chapter.id)}
                      className="p-2 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors"
                    >
                      <HiOutlineTrash size={16} />
                    </button>
                  </div>
                  <div className="divide-y divide-border/50">
                    {chapter.lessons.map((lesson) => (
                      <div key={lesson.id} className="p-3 space-y-3">
                        <div className="flex items-center gap-3">
                          <Input
                            value={lesson.title}
                            onChange={(e) => updateLesson(chapter.id, lesson.id, { title: e.target.value })}
                            placeholder="ط¹ظ†ظˆط§ظ† ط§ظ„ط¯ط±ط³"
                            className="flex-1"
                          />
                          <Input
                            label=""
                            type="number"
                            value={lesson.duration}
                            onChange={(e) => updateLesson(chapter.id, lesson.id, { duration: e.target.value })}
                            placeholder="ط§ظ„ظ…ط¯ط©"
                            className="w-20"
                          />
                          <span className="text-xs text-text-tertiary">ط¯</span>
                          <button
                            type="button"
                            onClick={() => removeLesson(chapter.id, lesson.id)}
                            className="p-2 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors"
                          >
                            <HiOutlineTrash size={14} />
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <Select
                            label="ط§ظ„ط­ط§ظ„ط©"
                            value={lesson.status}
                            onChange={(e) => updateLesson(chapter.id, lesson.id, { status: e.target.value })}
                            options={lessonStatusOptions}
                          />
                          {lesson.status === "locked" && (
                            <Select
                              label="ط§ظ„ظ…طھط·ظ„ط¨ ط§ظ„ط³ط§ط¨ظ‚"
                              value={lesson.prerequisite}
                              onChange={(e) => updateLesson(chapter.id, lesson.id, { prerequisite: e.target.value })}
                              options={allLessonTitles.filter((l) => l.value !== lesson.id)}
                              placeholder="ط§ط®طھط± ط§ظ„ط¯ط±ط³ ط§ظ„ظ…ط·ظ„ظˆط¨"
                            />
                          )}
                          {lesson.status === "coming-soon" && (
                            <Input
                              label="طھط§ط±ظٹط® ط§ظ„ط¥طھط§ط­ط©"
                              type="date"
                              value={lesson.availableDate}
                              onChange={(e) => updateLesson(chapter.id, lesson.id, { availableDate: e.target.value })}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-border/50">
                    <Button variant="ghost"
                      size="sm"
                      onClick={() => addLesson(chapter.id)}
                      leftIcon={<HiOutlinePlus size={14} />}
                    >
                      ط¥ط¶ط§ظپط© ط¯ط±ط³
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline"
                onClick={addChapter}
                leftIcon={<HiOutlinePlus size={16} />}
              >
                ط¥ط¶ط§ظپط© ظپطµظ„ ط¬ط¯ظٹط¯
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ظƒظˆط±ط³</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select label="ط§ظ„ط­ط§ظ„ط©" value={form.status} onChange={(e) => update("status", e.target.value)} options={statusOptions} />
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.requiresCode} onChange={(e) => update("requiresCode", e.target.checked)} className="w-4 h-4 accent-primary" />
                  <span className="text-sm text-text">ظٹطھط·ظ„ط¨ ظƒظˆط¯ طھظپط¹ظٹظ„ ظ„ظ„ط§ط´طھط±ط§ظƒ</span>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>طµظˆط±ط© ط§ظ„ظƒظˆط±ط³</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-xl border-2 border-dashed border-border bg-surface-secondary flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 transition-colors">
                <HiOutlineCamera size={40} className="text-text-tertiary/50 mb-2" />
                <p className="text-sm text-text-tertiary">ط§ط¶ط؛ط· ظ„ط±ظپط¹ طµظˆط±ط©</p>
                <p className="text-xs text-text-tertiary/60 mt-1">PNG, JPG, WEBP</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3">
                <Button type="submit" variant="primary" size="lg" isLoading={submitting} leftIcon={<HiOutlineSave size={18} />}>
                  {submitting ? "ط¬ط§ط±ظٹ ط§ظ„ط­ظپط¸..." : "ط­ظپط¸ ظƒظ…ط³ظˆط¯ط©"}
                </Button>
                <Button variant="success" size="lg" onClick={() => { update("status", "published"); handleSubmit() }}>
                  ظ†ط´ط± ط§ظ„ظƒظˆط±ط³
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}

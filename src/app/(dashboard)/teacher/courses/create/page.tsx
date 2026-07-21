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
  { value: "لغة عربية", label: "لغة عربية" },
  { value: "لغة إنجليزية", label: "لغة إنجليزية" },
  { value: "رياضيات", label: "رياضيات" },
  { value: "علوم", label: "علوم" },
  { value: "دراسات", label: "دراسات" },
]

const grades = [
  { value: "أولى ثانوي", label: "أولى ثانوي" },
  { value: "ثانية ثانوي", label: "ثانية ثانوي" },
  { value: "ثالثة ثانوي", label: "ثالثة ثانوي" },
]

const terms = [
  { value: "الأول", label: "الأول" },
  { value: "الثاني", label: "الثاني" },
]

const categories = [
  { value: "لغويات", label: "لغويات" },
  { value: "أدب", label: "أدب" },
  { value: "مهارات", label: "مهارات" },
  { value: "مراجعة", label: "مراجعة" },
]

const statusOptions = [
  { value: "draft", label: "مسودة" },
  { value: "published", label: "منشور" },
  { value: "coming-soon", label: "قريباً" },
]

const lessonStatusOptions = [
  { value: "available", label: "متاح" },
  { value: "locked", label: "مقفل" },
  { value: "coming-soon", label: "قريباً" },
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
  subject: "لغة عربية",
  grade: "ثالثة ثانوي",
  term: "الأول",
  category: "لغويات",
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
    if (!form.title.trim()) errs.title = "عنوان الكورس مطلوب"
    if (!form.shortDescription.trim()) errs.shortDescription = "الوصف المختصر مطلوب"
    if (!form.description.trim()) errs.description = "الوصف الكامل مطلوب"
    if (!form.isFree && (!form.price || Number(form.price) <= 0))
      errs.price = "السعر مطلوب وقيمته أكبر من 0"
    if (form.discountPrice && Number(form.discountPrice) >= Number(form.price))
      errs.discountPrice = "سعر الخصم يجب أن يكون أقل من السعر الأصلي"
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
    toast.success("طھظ… إنشاء الكورس بنجاح!")
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
          <h2 className="text-xl font-bold text-text mb-2">طھظ… إنشاء الكورس بنجاح</h2>
          <p className="text-sm text-text-tertiary mb-6">طھظ… حفظ الكورس &ldquo;{form.title}&rdquo; بنجاح</p>
          <div className="flex items-center gap-3">
            <Button variant="primary" onClick={() => { setSubmitted(false); setForm(initialForm); setChapters([]) }}>
              إنشاء كورس آخر
            </Button>
            <Button variant="outline" onClick={() => router.push("/teacher/courses")} leftIcon={<HiOutlineArrowRight size={18} />}>
              العودة إلى الكورسات
            </Button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "الكورسات", href: "/teacher/courses" }, { label: "إضافة كورس جديد" }]} />
      <DashboardHeader title="إضافة كورس جديد" />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>المعلومات الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="عنوان الكورس" value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="مثال: النحو والصرف" error={errors.title} />
              <div className="grid grid-cols-2 gap-4">
                <Select label="المادة" value={form.subject} onChange={(e) => update("subject", e.target.value)} options={subjects} />
                <Select label="الصف" value={form.grade} onChange={(e) => update("grade", e.target.value)} options={grades} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Select label="الترم" value={form.term} onChange={(e) => update("term", e.target.value)} options={terms} />
                <Select label="التصنيف" value={form.category} onChange={(e) => update("category", e.target.value)} options={categories} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الوصف</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="الوصف المختصر" value={form.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} placeholder="وصف مختصر للكورس..." error={errors.shortDescription} />
              <Textarea label="الوصف الكامل" value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="وصف تفصيلي لمحتوى الكورس..." error={errors.description} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>التسعير</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isFree} onChange={(e) => update("isFree", e.target.checked)} className="w-4 h-4 accent-primary" />
                  <span className="text-sm text-text">كورس مجاني</span>
                </label>
              </div>
              {!form.isFree && (
                <div className="grid grid-cols-2 gap-4">
                  <Input label="السعر (جنيه)" type="number" value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="0" error={errors.price} />
                  <Input label="سعر الخصم (اختياري)" type="number" value={form.discountPrice} onChange={(e) => update("discountPrice", e.target.value)} placeholder="0" error={errors.discountPrice} />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الفصول والدروس</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {chapters.length === 0 && (
                <p className="text-sm text-text-tertiary text-center py-4">لم ظٹطھظ… إضافة ط£ظٹ فصول بعد. أضف فصلاً للبدء.</p>
              )}
              {chapters.map((chapter) => (
                <div key={chapter.id} className="border border-border rounded-xl overflow-hidden">
                  <div className="flex items-center gap-3 p-3 bg-surface-secondary">
                    <Input
                      value={chapter.title}
                      onChange={(e) => updateChapter(chapter.id, e.target.value)}
                      placeholder="عنوان الفصل"
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
                            placeholder="عنوان الدرس"
                            className="flex-1"
                          />
                          <Input
                            label=""
                            type="number"
                            value={lesson.duration}
                            onChange={(e) => updateLesson(chapter.id, lesson.id, { duration: e.target.value })}
                            placeholder="المدة"
                            className="w-20"
                          />
                          <span className="text-xs text-text-tertiary">د</span>
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
                            label="الحالة"
                            value={lesson.status}
                            onChange={(e) => updateLesson(chapter.id, lesson.id, { status: e.target.value })}
                            options={lessonStatusOptions}
                          />
                          {lesson.status === "locked" && (
                            <Select
                              label="المتطلب السابق"
                              value={lesson.prerequisite}
                              onChange={(e) => updateLesson(chapter.id, lesson.id, { prerequisite: e.target.value })}
                              options={allLessonTitles.filter((l) => l.value !== lesson.id)}
                              placeholder="اختر الدرس المطلوب"
                            />
                          )}
                          {lesson.status === "coming-soon" && (
                            <Input
                              label="تاريخ الإتاحة"
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
                      إضافة درس
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline"
                onClick={addChapter}
                leftIcon={<HiOutlinePlus size={16} />}
              >
                إضافة فصل جديد
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>إعدادات الكورس</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select label="الحالة" value={form.status} onChange={(e) => update("status", e.target.value)} options={statusOptions} />
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.requiresCode} onChange={(e) => update("requiresCode", e.target.checked)} className="w-4 h-4 accent-primary" />
                  <span className="text-sm text-text">يتطلب كود تفعيل للاشتراك</span>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>صورة الكورس</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-xl border-2 border-dashed border-border bg-surface-secondary flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 transition-colors">
                <HiOutlineCamera size={40} className="text-text-tertiary/50 mb-2" />
                <p className="text-sm text-text-tertiary">اضغط لرفع صورة</p>
                <p className="text-xs text-text-tertiary/60 mt-1">PNG, JPG, WEBP</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3">
                <Button type="submit" variant="primary" size="lg" isLoading={submitting} leftIcon={<HiOutlineSave size={18} />}>
                  {submitting ? "جاري الحفظ..." : "حفظ كمسودة"}
                </Button>
                <Button variant="success" size="lg" onClick={() => { update("status", "published"); handleSubmit() }}>
                  نشر الكورس
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}

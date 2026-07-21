"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlinePlus,
  HiOutlineMail,
  HiOutlineCheckCircle,
  HiOutlinePencilAlt,
  HiOutlineClock,
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlineCalendar,
  HiOutlineFilter,
  HiOutlineInformationCircle,
  HiOutlineExclamationCircle,
  HiOutlineCheck,
  HiOutlineX,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import { Modal } from "@/components/ui/Modal"
import Select from "@/components/ui/Select"
import Textarea from "@/components/ui/Textarea"
import Input from "@/components/ui/Input"
import { Tabs, TabPanel } from "@/components/ui/Tabs"
import { EmptyState } from "@/components/ui/EmptyState"
import { SearchInput } from "@/components/ui/SearchInput"
import { ConfirmDialog } from "@/components/ui/ConfirmDialog"
import { formatDate, det } from "@/lib/utils"
import toast from "react-hot-toast"
import Link from "next/link"

const mockAnnouncements = Array.from({ length: 15 }, (_, i) => ({
  id: `ann-${i + 1}`,
  title: ["تحديث هام ظپظٹ المنهج", "موعد الامتحانات النهائية", "تنبيه: بدء التسجيل", "إعلان نتائج الامتحانات", "جدول الحصص الأسبوعي", "اجتماع أولياء الأمور", "إجازة رسمية", "تحديث نظام الرسوم", "حملة التبرعات", "مسابقة الطالب المثالي", "تنويه: واجبات الأسبوع", "مبادرة النظافة", "دورة تدريبية للمعلمين", "رحلة مدرسية", "محاضرة توعوية"][i],
  content: "نص الإعلان الكامل مع التفاصيل والمعلومات الهامة",
  type: (["info", "warning", "success", "emergency"] as const)[i % 4],
  target: (["all", "students", "teachers", "parents", "staff"] as const)[i % 5],
  courseId: i % 2 === 0 ? `c-${(i % 5) + 1}` : undefined,
  grade: i % 3 === 0 ? ["أولى ثانوي", "ثانية ثانوي", "ثالثة ثانوي"][i % 3] : undefined,
  priority: (["high", "medium", "low"] as const)[i % 3],
  status: (["published", "draft", "scheduled"] as const)[i % 3],
  scheduledAt: i % 3 === 2 ? new Date(2026, 7, 20 + i) : undefined,
  createdAt: new Date(2026, 6, (i % 28) + 1),
  createdBy: "أحمد محمد",
  readCount: Math.floor(det() * 200) + 50,
}))

type Announcement = (typeof mockAnnouncements)[number]
type FormStatus = "published" | "draft" | "scheduled"

const typeLabels: Record<string, string> = {
  info: "معلومات",
  warning: "تنبيه",
  success: "نجاح",
  emergency: "طارئ",
}

const typeBadge: Record<string, "primary" | "warning" | "success" | "error"> = {
  info: "primary",
  warning: "warning",
  success: "success",
  emergency: "error",
}

const targetLabels: Record<string, string> = {
  all: "الجميع",
  students: "الطلاب",
  teachers: "المعلمين",
  parents: "أولياء الأمور",
  staff: "الموظفين",
}

const targetBadge: Record<string, "info" | "primary" | "success" | "warning" | "neutral"> = {
  all: "info",
  students: "primary",
  teachers: "success",
  parents: "warning",
  staff: "neutral",
}

const priorityLabels: Record<string, string> = {
  high: "عالي",
  medium: "متوسط",
  low: "منخفض",
}

const priorityBadge: Record<string, "error" | "warning" | "neutral"> = {
  high: "error",
  medium: "warning",
  low: "neutral",
}

const statusLabels: Record<string, string> = {
  published: "منشور",
  draft: "مسودة",
  scheduled: "مجدول",
}

const statusBadge: Record<string, "success" | "neutral" | "warning"> = {
  published: "success",
  draft: "neutral",
  scheduled: "warning",
}

const typeOptions = Object.entries(typeLabels).map(([value, label]) => ({ value, label }))
const targetOptions = Object.entries(targetLabels).map(([value, label]) => ({ value, label }))
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

export default function AnnouncementsPage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [targetFilter, setTargetFilter] = useState("all")

  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [formTitle, setFormTitle] = useState("")
  const [formContent, setFormContent] = useState("")
  const [formType, setFormType] = useState("info")
  const [formTarget, setFormTarget] = useState("all")
  const [formCourse, setFormCourse] = useState("")
  const [formGrade, setFormGrade] = useState("")
  const [formPriority, setFormPriority] = useState("medium")
  const [scheduleEnabled, setScheduleEnabled] = useState(false)
  const [scheduleDate, setScheduleDate] = useState("")

  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements)
  const [submitting, setSubmitting] = useState(false)

  const stats = useMemo(() => ({
    total: announcements.length,
    published: announcements.filter((a) => a.status === "published").length,
    drafts: announcements.filter((a) => a.status === "draft").length,
    scheduled: announcements.filter((a) => a.status === "scheduled").length,
  }), [announcements])

  const filtered = useMemo(() => {
    return announcements.filter((a) => {
      const matchSearch = a.title.includes(search) || a.content.includes(search)
      const matchType = typeFilter === "all" || a.type === typeFilter
      const matchTarget = targetFilter === "all" || a.target === targetFilter
      return matchSearch && matchType && matchTarget
    })
  }, [search, typeFilter, targetFilter, announcements])

  const handleCreateModalOpen = () => {
    setFormTitle("")
    setFormContent("")
    setFormType("info")
    setFormTarget("all")
    setFormCourse("")
    setFormGrade("")
    setFormPriority("medium")
    setScheduleEnabled(false)
    setScheduleDate("")
    setCreateModalOpen(true)
  }

  const handleCreate = async (status: FormStatus) => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    const newAnn: Announcement = {
      id: `ann-${announcements.length + 1}`,
      title: formTitle,
      content: formContent,
      type: formType as Announcement["type"],
      target: formTarget as Announcement["target"],
      courseId: (formTarget === "students" && formCourse) ? formCourse : undefined,
      grade: formGrade || undefined,
      priority: formPriority as Announcement["priority"],
      status,
      scheduledAt: scheduleEnabled && scheduleDate ? new Date(scheduleDate) : undefined,
      createdAt: new Date(),
      createdBy: "أحمد محمد",
      readCount: 0,
    }
    setAnnouncements((prev) => [newAnn, ...prev])
    setSubmitting(false)
    setCreateModalOpen(false)
    toast.success("تم إنشاء الإعلان بنجاح")
  }

  const handleDelete = async () => {
    if (!deleteId) return
    await new Promise((r) => setTimeout(r, 500))
    setAnnouncements((prev) => prev.filter((a) => a.id !== deleteId))
    setDeleteId(null)
    toast.success("تم حذف الإعلان بنجاح")
  }

  const openDetail = (ann: Announcement) => {
    setSelectedAnnouncement(ann)
    setDetailModalOpen(true)
  }

  const tabs = [
    { id: "all", label: "الكل", count: filtered.length },
    { id: "published", label: "منشور", count: announcements.filter((a) => a.status === "published").length },
    { id: "draft", label: "مسودة", count: announcements.filter((a) => a.status === "draft").length },
    { id: "scheduled", label: "مجدول", count: announcements.filter((a) => a.status === "scheduled").length },
  ]

  const renderAnnouncementList = (list: Announcement[]) => {
    if (list.length === 0) {
      return (
        <EmptyState
          icon={HiOutlineMail}
          title="لا توجد إعلانات"
          description="لم ظٹتم العثور على إعلانات تطابق معايير البحث"
          action={
            <>
              <Link href="/teacher/announcements/create" className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
                <HiOutlinePlus size={18} />
                إنشاء إعلان
              </Link>
              <Button variant="primary" leftIcon={<HiOutlinePlus size={18} />} onClick={handleCreateModalOpen}>
                إنشاء إعلان
              </Button>
            </>
          }
        />
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {list.map((ann, index) => (
          <motion.div
            key={ann.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <Card hover className="h-full" onClick={() => openDetail(ann)}>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <HiOutlineMail className="text-primary" size={20} />
                  </div>
                  <div className="flex gap-1.5">
                    <Badge variant={typeBadge[ann.type]} size="sm">{typeLabels[ann.type]}</Badge>
                    <Badge variant={statusBadge[ann.status]} size="sm">{statusLabels[ann.status]}</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-text mb-0.5 line-clamp-1">
                    <Link href={`/teacher/announcements/${ann.id}`} onClick={(e) => e.stopPropagation()} className="hover:text-primary transition-colors">
                      {ann.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-text-tertiary line-clamp-2">{ann.content}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={targetBadge[ann.target]} size="sm">{targetLabels[ann.target]}</Badge>
                  <Badge variant={priorityBadge[ann.priority]} size="sm">{priorityLabels[ann.priority]}</Badge>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-1 text-xs text-text-tertiary">
                    <HiOutlineCalendar size={14} />
                    {formatDate(ann.createdAt)}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-text-tertiary">
                    <HiOutlineEye size={14} />
                    {ann.readCount}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="مركز الإعلانات" subtitle="إدارة وإرسال الإعلانات للطلاب وأولياء الأمور" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "إجمالي الإعلانات", value: stats.total, icon: HiOutlineMail, color: "primary" as const },
          { title: "منشور", value: stats.published, icon: HiOutlineCheckCircle, color: "success" as const },
          { title: "مسودة", value: stats.drafts, icon: HiOutlinePencilAlt, color: "warning" as const },
          { title: "مجدول", value: stats.scheduled, icon: HiOutlineClock, color: "info" as const },
        ].map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <StatsCard title={s.title} value={s.value} icon={s.icon} color={s.color} />
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchInput value={search} onChange={setSearch} placeholder="بحث عن إعلان..." />
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="w-36">
            <Select
              options={[{ value: "all", label: "جميع الأنواع" }, ...typeOptions]}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            />
          </div>
          <div className="w-40">
            <Select
              options={[{ value: "all", label: "جميع المستهدفين" }, ...targetOptions]}
              value={targetFilter}
              onChange={(e) => setTargetFilter(e.target.value)}
            />
          </div>
          <Link href="/teacher/announcements/create" className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
            <HiOutlinePlus size={18} />
            إنشاء إعلان
          </Link>
          <Button variant="primary" leftIcon={<HiOutlinePlus size={18} />} onClick={handleCreateModalOpen}>
            إنشاء إعلان
          </Button>
        </div>
      </div>

      <Tabs tabs={tabs}>
        {(activeTab) => (
          <>
            <TabPanel id="all" activeTab={activeTab}>
              {renderAnnouncementList(filtered)}
            </TabPanel>
            <TabPanel id="published" activeTab={activeTab}>
              {renderAnnouncementList(filtered.filter((a) => a.status === "published"))}
            </TabPanel>
            <TabPanel id="draft" activeTab={activeTab}>
              {renderAnnouncementList(filtered.filter((a) => a.status === "draft"))}
            </TabPanel>
            <TabPanel id="scheduled" activeTab={activeTab}>
              {renderAnnouncementList(filtered.filter((a) => a.status === "scheduled"))}
            </TabPanel>
          </>
        )}
      </Tabs>

      <Modal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} title="إنشاء إعلان جديد" size="xl">
        <div className="space-y-5">
          <Input label="عنوان الإعلان" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="أدخل عنوان الإعلان" />
          <Textarea label="المحتوى" value={formContent} onChange={(e) => setFormContent(e.target.value)} placeholder="أدخل نص الإعلان..." className="min-h-[120px]" />
          <div className="grid grid-cols-2 gap-4">
            <Select label="النوع" value={formType} onChange={(e) => setFormType(e.target.value)} options={typeOptions} />
            <Select label="المستهدف" value={formTarget} onChange={(e) => { setFormTarget(e.target.value); if (e.target.value !== "students") setFormCourse("") }} options={targetOptions} />
          </div>
          {formTarget === "students" && (
            <Select label="الكورس (اختياري)" value={formCourse} onChange={(e) => setFormCourse(e.target.value)} options={courseOptions} placeholder="اختر كورساً" />
          )}
          <div className="grid grid-cols-2 gap-4">
            <Select label="الصف (اختياري)" value={formGrade} onChange={(e) => setFormGrade(e.target.value)} options={gradeOptions} placeholder="اختر صفاً" />
            <Select label="الأولوية" value={formPriority} onChange={(e) => setFormPriority(e.target.value)} options={Object.entries(priorityLabels).map(([value, label]) => ({ value, label }))} />
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-surface-secondary border border-border">
            <div>
              <p className="text-sm font-medium text-text">جدولة الإعلان</p>
              <p className="text-xs text-text-tertiary">تحديد تاريخ ووقت النشر</p>
            </div>
            <button type="button"
              onClick={() => setScheduleEnabled(!scheduleEnabled)}
              className={`relative w-11 h-6 rounded-full transition-colors ${scheduleEnabled ? "bg-primary" : "bg-surface-tertiary"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${scheduleEnabled ? "translate-x-0.5" : "translate-x-[22px]"}`} />
            </button>
          </div>
          {scheduleEnabled && (
            <Input label="تاريخ النشر" type="datetime-local" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} />
          )}
          <div className="flex gap-3 pt-2">
            <Button variant="success" size="lg" className="flex-1" leftIcon={<HiOutlineCheck size={18} />} isLoading={submitting} onClick={() => handleCreate("published")}>
              نشر
            </Button>
            <Button variant="secondary" size="lg" className="flex-1" leftIcon={<HiOutlinePencilAlt size={18} />} isLoading={submitting} onClick={() => handleCreate("draft")}>
              حفظ كمسودة
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={detailModalOpen} onClose={() => setDetailModalOpen(false)} title={selectedAnnouncement?.title} size="lg">
        {selectedAnnouncement && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Badge variant={typeBadge[selectedAnnouncement.type]} size="md">{typeLabels[selectedAnnouncement.type]}</Badge>
              <Badge variant={targetBadge[selectedAnnouncement.target]} size="md">{targetLabels[selectedAnnouncement.target]}</Badge>
              <Badge variant={priorityBadge[selectedAnnouncement.priority]} size="md">{priorityLabels[selectedAnnouncement.priority]}</Badge>
              <Badge variant={statusBadge[selectedAnnouncement.status]} size="md">{statusLabels[selectedAnnouncement.status]}</Badge>
            </div>
            {selectedAnnouncement.courseId && (
              <p className="text-sm text-text-secondary">الكورس: {courseOptions.find((c) => c.value === selectedAnnouncement.courseId)?.label}</p>
            )}
            {selectedAnnouncement.grade && (
              <p className="text-sm text-text-secondary">الصف: {selectedAnnouncement.grade}</p>
            )}
            <p className="text-sm text-text leading-relaxed">{selectedAnnouncement.content}</p>
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-surface-secondary border border-border text-sm">
              <div>
                <p className="text-text-tertiary">تاريخ الإنشاء</p>
                <p className="text-text font-medium">{formatDate(selectedAnnouncement.createdAt)}</p>
              </div>
              <div>
                <p className="text-text-tertiary">تم القراءة</p>
                <p className="text-text font-medium">{selectedAnnouncement.readCount} مرة</p>
              </div>
              <div>
                <p className="text-text-tertiary">الناشر</p>
                <p className="text-text font-medium">{selectedAnnouncement.createdBy}</p>
              </div>
              {selectedAnnouncement.scheduledAt && (
                <div>
                  <p className="text-text-tertiary">مجدول ظپظٹ</p>
                  <p className="text-text font-medium">{formatDate(selectedAnnouncement.scheduledAt)}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => { setDeleteConfirmOpen(false); setDeleteId(null) }}
        onConfirm={handleDelete}
        title="حذف الإعلان"
        message="هل أنت متأكد أنك تريد حذف هذا الإعلان؟ لا يمكن التراجع عن هذا الإجراء."
        confirmText="حذف"
        cancelText="إلغاء"
        variant="danger"
      />
    </div>
  )
}

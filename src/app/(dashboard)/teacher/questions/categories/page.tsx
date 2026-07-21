"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiBookOpen, HiQuestionMarkCircle, HiChartBar } from "react-icons/hi"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { SearchInput } from "@/components/ui/SearchInput"
import { Table } from "@/components/ui/Table"
import { Modal } from "@/components/ui/Modal"
import { ConfirmDialog } from "@/components/ui/ConfirmDialog"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import { generateId } from "@/lib/utils"
import { useNotificationStore } from "@/lib/notification-store"

const subjectOptions = [
  { value: "نحو", label: "نحو" },
  { value: "صرف", label: "صرف" },
  { value: "بلاغة", label: "بلاغة" },
  { value: "أدب", label: "أدب" },
  { value: "نصوص", label: "نصوص" },
  { value: "إملاء", label: "إملاء" },
  { value: "تعبير", label: "تعبير" },
  { value: "قواعد", label: "قواعد" },
]

const colorOptions = [
  { value: "#6366F1", label: "بنفسجي" },
  { value: "#10B981", label: "أخضر" },
  { value: "#F59E0B", label: "أصفر" },
  { value: "#EF4444", label: "أحمر" },
  { value: "#8B5CF6", label: "بنفسجي غامق" },
  { value: "#EC4899", label: "وردي" },
  { value: "#3B82F6", label: "أزرق" },
  { value: "#F97316", label: "برتقالي" },
]

const mockCategories = [
  { id: "1", name: "الأفعال", subject: "نحو", questionCount: 15, color: "#6366F1" },
  { id: "2", name: "الأسماء", subject: "نحو", questionCount: 12, color: "#10B981" },
  { id: "3", name: "الميزان الصرفي", subject: "صرف", questionCount: 10, color: "#F59E0B" },
  { id: "4", name: "المشتقات", subject: "صرف", questionCount: 8, color: "#EF4444" },
  { id: "5", name: "التشبيه", subject: "بلاغة", questionCount: 14, color: "#8B5CF6" },
  { id: "6", name: "الاستعارة", subject: "بلاغة", questionCount: 11, color: "#EC4899" },
  { id: "7", name: "الشعر الجاهلي", subject: "أدب", questionCount: 18, color: "#3B82F6" },
  { id: "8", name: "الشعر العباسي", subject: "أدب", questionCount: 9, color: "#F97316" },
  { id: "9", name: "القراءة المتحررة", subject: "نصوص", questionCount: 7, color: "#6366F1" },
  { id: "10", name: "النصوص الشعرية", subject: "نصوص", questionCount: 13, color: "#10B981" },
  { id: "11", name: "الهمزات", subject: "إملاء", questionCount: 6, color: "#F59E0B" },
  { id: "12", name: "علامات الترقيم", subject: "إملاء", questionCount: 5, color: "#EF4444" },
  { id: "13", name: "الموضوع الوصفي", subject: "تعبير", questionCount: 10, color: "#8B5CF6" },
  { id: "14", name: "الموضوع السردي", subject: "تعبير", questionCount: 8, color: "#EC4899" },
  { id: "15", name: "المرفوعات", subject: "قواعد", questionCount: 20, color: "#3B82F6" },
  { id: "16", name: "المنصوبات", subject: "قواعد", questionCount: 16, color: "#F97316" },
]

interface CategoryForm {
  name: string
  subject: string
  color: string
}

const emptyForm: CategoryForm = { name: "", subject: "نحو", color: "#6366F1" }

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories)
  const [search, setSearch] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<typeof mockCategories[0] | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<typeof mockCategories[0] | null>(null)
  const [form, setForm] = useState<CategoryForm>(emptyForm)
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof CategoryForm, string>>>({})
  const { addToast } = useNotificationStore()

  const filtered = useMemo(
    () => categories.filter((c) => c.name.includes(search) || c.subject.includes(search)),
    [categories, search]
  )

  const totalCategories = categories.length
  const totalQuestions = categories.reduce((sum, c) => sum + c.questionCount, 0)
  const avgPerCategory = Math.round(totalQuestions / totalCategories)

  const openCreateModal = () => {
    setEditingCategory(null)
    setForm(emptyForm)
    setFormErrors({})
    setModalOpen(true)
  }

  const openEditModal = (cat: typeof mockCategories[0]) => {
    setEditingCategory(cat)
    setForm({ name: cat.name, subject: cat.subject, color: cat.color })
    setFormErrors({})
    setModalOpen(true)
  }

  const validate = (): boolean => {
    const errs: Partial<Record<keyof CategoryForm, string>> = {}
    if (!form.name.trim()) errs.name = "اسم التصنيف مطلوب"
    if (!form.subject.trim()) errs.subject = "المادة مطلوبة"
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSave = () => {
    if (!validate()) return
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name: form.name, subject: form.subject, color: form.color }
            : c
        )
      )
      addToast({ type: "success", title: "طھظ… تحديث التصنيف بنجاح" })
    } else {
      setCategories((prev) => [
        ...prev,
        { id: generateId(), name: form.name, subject: form.subject, questionCount: 0, color: form.color },
      ])
      addToast({ type: "success", title: "طھظ… إضافة التصنيف بنجاح" })
    }
    setModalOpen(false)
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id))
    addToast({ type: "success", title: `طھظ… حذف تصنيف "${deleteTarget.name}" بنجاح` })
    setDeleteTarget(null)
  }

  const columns = [
    {
      key: "name",
      header: "اسم التصنيف",
      render: (item: typeof mockCategories[0]) => (
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
          <span className="font-medium text-text">{item.name}</span>
        </div>
      ),
    },
    {
      key: "subject",
      header: "المادة",
      render: (item: typeof mockCategories[0]) => (
        <Badge variant="primary" size="sm">{item.subject}</Badge>
      ),
    },
    {
      key: "questionCount",
      header: "عدد الأسئلة",
      render: (item: typeof mockCategories[0]) => (
        <span className="text-text-secondary">{item.questionCount} سؤال{item.questionCount !== 1 ? "اً" : ""}</span>
      ),
    },
    {
      key: "color",
      header: "اللون",
      render: (item: typeof mockCategories[0]) => (
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full border border-border" style={{ backgroundColor: item.color }} />
          <span className="text-xs text-text-tertiary">{colorOptions.find((o) => o.value === item.color)?.label}</span>
        </div>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (item: typeof mockCategories[0]) => (
        <div className="flex items-center justify-end gap-1">
          <button type="button"
            onClick={() => openEditModal(item)}
            className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
            title="تعديل"
          >
            <HiOutlinePencil size={16} />
          </button>
          <button type="button"
            onClick={() => setDeleteTarget(item)}
            className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors"
            title="حذف"
          >
            <HiOutlineTrash size={16} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "بنك الأسئلة", href: "/teacher/questions" }, { label: "التصنيفات" }]} />
      <DashboardHeader title="تصنيفات الأسئلة" subtitle="إدارة تصنيفات ومواضيع الأسئلة" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="إجمالي التصنيفات" value={totalCategories} icon={HiBookOpen} color="primary" />
        <StatsCard title="إجمالي الأسئلة" value={totalQuestions} icon={HiQuestionMarkCircle} color="success" />
        <StatsCard title="متوسط الأسئلة" value={avgPerCategory} icon={HiChartBar} color="info" subtitle="لكل تصنيف" />
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <SearchInput value={search} onChange={setSearch} placeholder="بحث عن تصنيف..." className="w-full sm:w-72" />
        <Button variant="primary" onClick={openCreateModal} leftIcon={<HiOutlinePlus size={18} />}>
          إضافة تصنيف جديد
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Table columns={columns} data={filtered} emptyMessage="لا توجد تصنيفات تطابق بحثك" />
          </motion.div>
        </CardContent>
      </Card>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCategory ? "تعديل تصنيف" : "إضافة تصنيف جديد"}
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="اسم التصنيف"
            value={form.name}
            onChange={(e) => { setForm((p) => ({ ...p, name: e.target.value })); setFormErrors((p) => ({ ...p, name: undefined })) }}
            placeholder="مثال: الأفعال"
            error={formErrors.name}
          />
          <Select
            label="المادة"
            value={form.subject}
            onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
            options={subjectOptions}
          />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">اللون</label>
            <div className="flex items-center gap-2 flex-wrap">
              {colorOptions.map((opt) => (
                <button type="button"
                  key={opt.value}
                  onClick={() => setForm((p) => ({ ...p, color: opt.value }))}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    form.color === opt.value ? "border-text scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: opt.value }}
                  title={opt.label}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Button variant="primary" onClick={handleSave} className="flex-1">
              {editingCategory ? "حفظ التغييرات" : "إضافة التصنيف"}
            </Button>
            <Button variant="secondary" onClick={() => setModalOpen(false)} className="flex-1">
              إلغاء
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="حذف التصنيف"
        message={deleteTarget ? `هل أنت متأكد من حذف تصنيف "${deleteTarget.name}"طں هذا الإجراء لا يمكن التراجع عنه.` : ""}
        confirmText="حذف"
        cancelText="إلغاء"
        variant="danger"
      />
    </div>
  )
}

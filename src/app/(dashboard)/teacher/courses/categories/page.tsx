"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Modal } from "@/components/ui/Modal"
import { ConfirmDialog } from "@/components/ui/ConfirmDialog"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { CardSkeleton } from "@/components/ui/Skeleton"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { mockCourseCategories } from "@/lib/mock/data"
import { useNotificationStore } from "@/lib/notification-store"
import { generateId } from "@/lib/utils"

const iconOptions = [
  { value: "ًں“گ", label: "ًں“گ مثلث" },
  { value: "🔬", label: "🔬 مجهر" },
  { value: "ًںŒچ", label: "ًںŒچ كرة أرضية" },
  { value: "ًں“œ", label: "ًں“œ لفافة" },
  { value: "ًں’»", label: "ًں’» حاسوب" },
  { value: "🎨", label: "🎨 لوحة" },
  { value: "ًں“–", label: "ًں“– كتاب" },
  { value: "✏️", label: "✏️ قلم" },
  { value: "🧮", label: "🧮 عداد" },
  { value: "🔭", label: "🔭 تلسكوب" },
  { value: "🎵", label: "🎵 موسيقى" },
  { value: "⚽", label: "⚽ كرة" },
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

interface CategoryForm {
  name: string
  description: string
  icon: string
  color: string
}

const emptyForm: CategoryForm = { name: "", description: "", icon: "ًں“گ", color: "#6366F1" }

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCourseCategories)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<typeof mockCourseCategories[0] | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<typeof mockCourseCategories[0] | null>(null)
  const [form, setForm] = useState<CategoryForm>(emptyForm)
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof CategoryForm, string>>>({})
  const { addToast } = useNotificationStore()

  const openCreateModal = () => {
    setEditingCategory(null)
    setForm(emptyForm)
    setFormErrors({})
    setModalOpen(true)
  }

  const openEditModal = (cat: typeof mockCourseCategories[0]) => {
    setEditingCategory(cat)
    setForm({ name: cat.name, description: cat.description, icon: cat.icon, color: cat.color })
    setFormErrors({})
    setModalOpen(true)
  }

  const validate = (): boolean => {
    const errs: Partial<Record<keyof CategoryForm, string>> = {}
    if (!form.name.trim()) errs.name = "اسم التصنيف مطلوب"
    if (!form.description.trim()) errs.description = "الوصف مطلوب"
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSave = () => {
    if (!validate()) return
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name: form.name, description: form.description, icon: form.icon, color: form.color }
            : c
        )
      )
      addToast({ type: "success", title: "طھظ… تحديث التصنيف بنجاح" })
    } else {
      setCategories((prev) => [
        ...prev,
        { id: generateId(), name: form.name, description: form.description, icon: form.icon, color: form.color, courseCount: 0 },
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

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <ErrorState title="حدث خطأ" message={error} onRetry={() => setError(null)} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "الكورسات", href: "/teacher/courses" }, { label: "التصنيفات" }]} />
      <PageHeader
        title="تصنيفات الكورسات"
        description="إدارة تصنيفات الكورسات التعليمية"
        actions={
          <Button variant="primary" onClick={openCreateModal} leftIcon={<HiOutlinePlus size={18} />}>
            إضافة تصنيف جديد
          </Button>
        }
      />

      {loading ? (
        <CardSkeleton count={6} />
      ) : categories.length === 0 ? (
        <EmptyState
          title="لا توجد تصنيفات"
          description="لم ظٹطھظ… إضافة ط£ظٹ تصنيفات بعد. أضف تصنيفاً جديداً للبدء."
          action={
            <Button variant="primary" onClick={openCreateModal}>
              إضافة تصنيف جديد
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hover>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                      style={{ backgroundColor: `${cat.color}15` }}
                    >
                      {cat.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text mb-1">{cat.name}</h3>
                      <p className="text-xs text-text-tertiary mb-2 line-clamp-2">{cat.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                        <span className="text-xs text-text-secondary">{cat.courseCount} كورس</span>
                      </div>
                    </div>
                  </div>
                  <hr className="border-border my-3" />
                  <div className="flex items-center justify-end gap-2">
                    <button type="button"
                      onClick={() => openEditModal(cat)}
                      className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                      title="تعديل"
                    >
                      <HiOutlinePencil size={16} />
                    </button>
                    <button type="button"
                      onClick={() => setDeleteTarget(cat)}
                      className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors"
                      title="حذف"
                    >
                      <HiOutlineTrash size={16} />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

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
            placeholder="مثال: الرياضيات"
            error={formErrors.name}
          />
          <Input
            label="الوصف"
            value={form.description}
            onChange={(e) => { setForm((p) => ({ ...p, description: e.target.value })); setFormErrors((p) => ({ ...p, description: undefined })) }}
            placeholder="وصف مختصر للتصنيف"
            error={formErrors.description}
          />
          <Select
            label="الأيقونة"
            value={form.icon}
            onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
            options={iconOptions}
          />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">اللون</label>
            <div className="flex items-center gap-2">
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

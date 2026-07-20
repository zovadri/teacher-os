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
  { value: "ظ‹ع؛â€œع¯", label: "ظ‹ع؛â€œع¯ ط¸â€¦ط·آ«ط¸â€‍ط·آ«" },
  { value: "ظ‹ع؛â€‌آ¬", label: "ظ‹ع؛â€‌آ¬ ط¸â€¦ط·آ¬ط¸â€،ط·آ±" },
  { value: "ظ‹ع؛إ’ع†", label: "ظ‹ع؛إ’ع† ط¸ئ’ط·آ±ط·آ© ط·آ£ط·آ±ط·آ¶ط¸ظ¹ط·آ©" },
  { value: "ظ‹ع؛â€œإ“", label: "ظ‹ع؛â€œإ“ ط¸â€‍ط¸ظ¾ط·آ§ط¸ظ¾ط·آ©" },
  { value: "ظ‹ع؛â€™آ»", label: "ظ‹ع؛â€™آ» ط·آ­ط·آ§ط·آ³ط¸ث†ط·آ¨" },
  { value: "ظ‹ع؛عکآ¨", label: "ظ‹ع؛عکآ¨ ط¸â€‍ط¸ث†ط·آ­ط·آ©" },
  { value: "ظ‹ع؛â€œâ€“", label: "ظ‹ع؛â€œâ€“ ط¸ئ’ط·ع¾ط·آ§ط·آ¨" },
  { value: "أ¢إ“عˆأ¯آ¸عˆ", label: "أ¢إ“عˆأ¯آ¸عˆ ط¸â€ڑط¸â€‍ط¸â€¦" },
  { value: "ظ‹ع؛آ§آ®", label: "ظ‹ع؛آ§آ® ط·آ¹ط·آ¯ط·آ§ط·آ¯" },
  { value: "ظ‹ع؛â€‌آ­", label: "ظ‹ع؛â€‌آ­ ط·ع¾ط¸â€‍ط·آ³ط¸ئ’ط¸ث†ط·آ¨" },
  { value: "ظ‹ع؛عکآµ", label: "ظ‹ع؛عکآµ ط¸â€¦ط¸ث†ط·آ³ط¸ظ¹ط¸â€ڑط¸â€°" },
  { value: "أ¢ع‘آ½", label: "أ¢ع‘آ½ ط¸ئ’ط·آ±ط·آ©" },
]

const colorOptions = [
  { value: "#6366F1", label: "ط·آ¨ط¸â€ ط¸ظ¾ط·آ³ط·آ¬ط¸ظ¹" },
  { value: "#10B981", label: "ط·آ£ط·آ®ط·آ¶ط·آ±" },
  { value: "#F59E0B", label: "ط·آ£ط·آµط¸ظ¾ط·آ±" },
  { value: "#EF4444", label: "ط·آ£ط·آ­ط¸â€¦ط·آ±" },
  { value: "#8B5CF6", label: "ط·آ¨ط¸â€ ط¸ظ¾ط·آ³ط·آ¬ط¸ظ¹ ط·ط›ط·آ§ط¸â€¦ط¸â€ڑ" },
  { value: "#EC4899", label: "ط¸ث†ط·آ±ط·آ¯ط¸ظ¹" },
  { value: "#3B82F6", label: "ط·آ£ط·آ²ط·آ±ط¸â€ڑ" },
  { value: "#F97316", label: "ط·آ¨ط·آ±ط·ع¾ط¸â€ڑط·آ§ط¸â€‍ط¸ظ¹" },
]

interface CategoryForm {
  name: string
  description: string
  icon: string
  color: string
}

const emptyForm: CategoryForm = { name: "", description: "", icon: "ظ‹ع؛â€œع¯", color: "#6366F1" }

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
    if (!form.name.trim()) errs.name = "ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾ ط¸â€¦ط·آ·ط¸â€‍ط¸ث†ط·آ¨"
    if (!form.description.trim()) errs.description = "ط·آ§ط¸â€‍ط¸ث†ط·آµط¸ظ¾ ط¸â€¦ط·آ·ط¸â€‍ط¸ث†ط·آ¨"
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
      addToast({ type: "success", title: "ط·ع¾ط¸â€¦ ط·ع¾ط·آ­ط·آ¯ط¸ظ¹ط·آ« ط·آ§ط¸â€‍ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾ ط·آ¨ط¸â€ ط·آ¬ط·آ§ط·آ­" })
    } else {
      setCategories((prev) => [
        ...prev,
        { id: generateId(), name: form.name, description: form.description, icon: form.icon, color: form.color, courseCount: 0 },
      ])
      addToast({ type: "success", title: "ط·ع¾ط¸â€¦ ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ§ط¸â€‍ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾ ط·آ¨ط¸â€ ط·آ¬ط·آ§ط·آ­" })
    }
    setModalOpen(false)
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id))
    addToast({ type: "success", title: `ط·ع¾ط¸â€¦ ط·آ­ط·آ°ط¸ظ¾ ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾ "${deleteTarget.name}" ط·آ¨ط¸â€ ط·آ¬ط·آ§ط·آ­` })
    setDeleteTarget(null)
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <ErrorState title="ط·آ­ط·آ¯ط·آ« ط·آ®ط·آ·ط·آ£" message={error} onRetry={() => setError(null)} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "ط§ظ„ظƒظˆط±ط³ط§طھ", href: "/teacher/courses" }, { label: "ط§ظ„طھطµظ†ظٹظپط§طھ" }]} />
      <PageHeader
        title="ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³ط·آ§ط·ع¾"
        description="ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·ع¾ط·آ¹ط¸â€‍ط¸ظ¹ط¸â€¦ط¸ظ¹ط·آ©"
        actions={
          <Button variant="primary" onClick={openCreateModal} leftIcon={<HiOutlinePlus size={18} />}>
            ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾ ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯
          </Button>
        }
      />

      {loading ? (
        <CardSkeleton count={6} />
      ) : categories.length === 0 ? (
        <EmptyState
          title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾ط·آ§ط·ع¾"
          description="ط¸â€‍ط¸â€¦ ط¸ظ¹ط·ع¾ط¸â€¦ ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ£ط¸ظ¹ ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾ط·آ§ط·ع¾ ط·آ¨ط·آ¹ط·آ¯. ط·آ£ط·آ¶ط¸ظ¾ ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾ط·آ§ط¸â€¹ ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯ط·آ§ط¸â€¹ ط¸â€‍ط¸â€‍ط·آ¨ط·آ¯ط·طŒ."
          action={
            <Button variant="primary" onClick={openCreateModal}>
              ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾ ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯
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
                        <span className="text-xs text-text-secondary">{cat.courseCount} ط¸ئ’ط¸ث†ط·آ±ط·آ³</span>
                      </div>
                    </div>
                  </div>
                  <hr className="border-border my-3" />
                  <div className="flex items-center justify-end gap-2">
                    <button type="button"
                      onClick={() => openEditModal(cat)}
                      className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                      title="ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍"
                    >
                      <HiOutlinePencil size={16} />
                    </button>
                    <button type="button"
                      onClick={() => setDeleteTarget(cat)}
                      className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors"
                      title="ط·آ­ط·آ°ط¸ظ¾"
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
        title={editingCategory ? "ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍ ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾" : "ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾ ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯"}
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾"
            value={form.name}
            onChange={(e) => { setForm((p) => ({ ...p, name: e.target.value })); setFormErrors((p) => ({ ...p, name: undefined })) }}
            placeholder="ط¸â€¦ط·آ«ط·آ§ط¸â€‍: ط·آ§ط¸â€‍ط·آ±ط¸ظ¹ط·آ§ط·آ¶ط¸ظ¹ط·آ§ط·ع¾"
            error={formErrors.name}
          />
          <Input
            label="ط·آ§ط¸â€‍ط¸ث†ط·آµط¸ظ¾"
            value={form.description}
            onChange={(e) => { setForm((p) => ({ ...p, description: e.target.value })); setFormErrors((p) => ({ ...p, description: undefined })) }}
            placeholder="ط¸ث†ط·آµط¸ظ¾ ط¸â€¦ط·آ®ط·ع¾ط·آµط·آ± ط¸â€‍ط¸â€‍ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾"
            error={formErrors.description}
          />
          <Select
            label="ط·آ§ط¸â€‍ط·آ£ط¸ظ¹ط¸â€ڑط¸ث†ط¸â€ ط·آ©"
            value={form.icon}
            onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
            options={iconOptions}
          />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">ط·آ§ط¸â€‍ط¸â€‍ط¸ث†ط¸â€ </label>
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
              {editingCategory ? "ط·آ­ط¸ظ¾ط·آ¸ ط·آ§ط¸â€‍ط·ع¾ط·ط›ط¸ظ¹ط¸ظ¹ط·آ±ط·آ§ط·ع¾" : "ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ§ط¸â€‍ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾"}
            </Button>
            <Button variant="secondary" onClick={() => setModalOpen(false)} className="flex-1">
              ط·آ¥ط¸â€‍ط·ط›ط·آ§ط·طŒ
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="ط·آ­ط·آ°ط¸ظ¾ ط·آ§ط¸â€‍ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾"
        message={deleteTarget ? `ط¸â€،ط¸â€‍ ط·آ£ط¸â€ ط·ع¾ ط¸â€¦ط·ع¾ط·آ£ط¸ئ’ط·آ¯ ط¸â€¦ط¸â€  ط·آ­ط·آ°ط¸ظ¾ ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾ "${deleteTarget.name}"ط·ع؛ ط¸â€،ط·آ°ط·آ§ ط·آ§ط¸â€‍ط·آ¥ط·آ¬ط·آ±ط·آ§ط·طŒ ط¸â€‍ط·آ§ ط¸ظ¹ط¸â€¦ط¸ئ’ط¸â€  ط·آ§ط¸â€‍ط·ع¾ط·آ±ط·آ§ط·آ¬ط·آ¹ ط·آ¹ط¸â€ ط¸â€،.` : ""}
        confirmText="ط·آ­ط·آ°ط¸ظ¾"
        cancelText="ط·آ¥ط¸â€‍ط·ط›ط·آ§ط·طŒ"
        variant="danger"
      />
    </div>
  )
}

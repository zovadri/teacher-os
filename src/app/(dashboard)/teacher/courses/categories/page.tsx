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
  { value: "ًں“گ", label: "ًں“گ ظ…ط«ظ„ط«" },
  { value: "ًں”¬", label: "ًں”¬ ظ…ط¬ظ‡ط±" },
  { value: "ًںŒچ", label: "ًںŒچ ظƒط±ط© ط£ط±ط¶ظٹط©" },
  { value: "ًں“œ", label: "ًں“œ ظ„ظپط§ظپط©" },
  { value: "ًں’»", label: "ًں’» ط­ط§ط³ظˆط¨" },
  { value: "ًںژ¨", label: "ًںژ¨ ظ„ظˆط­ط©" },
  { value: "ًں“–", label: "ًں“– ظƒطھط§ط¨" },
  { value: "âœڈï¸ڈ", label: "âœڈï¸ڈ ظ‚ظ„ظ…" },
  { value: "ًں§®", label: "ًں§® ط¹ط¯ط§ط¯" },
  { value: "ًں”­", label: "ًں”­ طھظ„ط³ظƒظˆط¨" },
  { value: "ًںژµ", label: "ًںژµ ظ…ظˆط³ظٹظ‚ظ‰" },
  { value: "âڑ½", label: "âڑ½ ظƒط±ط©" },
]

const colorOptions = [
  { value: "#6366F1", label: "ط¨ظ†ظپط³ط¬ظٹ" },
  { value: "#10B981", label: "ط£ط®ط¶ط±" },
  { value: "#F59E0B", label: "ط£طµظپط±" },
  { value: "#EF4444", label: "ط£ط­ظ…ط±" },
  { value: "#8B5CF6", label: "ط¨ظ†ظپط³ط¬ظٹ ط؛ط§ظ…ظ‚" },
  { value: "#EC4899", label: "ظˆط±ط¯ظٹ" },
  { value: "#3B82F6", label: "ط£ط²ط±ظ‚" },
  { value: "#F97316", label: "ط¨ط±طھظ‚ط§ظ„ظٹ" },
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
    if (!form.name.trim()) errs.name = "ط§ط³ظ… ط§ظ„طھطµظ†ظٹظپ ظ…ط·ظ„ظˆط¨"
    if (!form.description.trim()) errs.description = "ط§ظ„ظˆطµظپ ظ…ط·ظ„ظˆط¨"
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
      addToast({ type: "success", title: "طھظ… طھط­ط¯ظٹط« ط§ظ„طھطµظ†ظٹظپ ط¨ظ†ط¬ط§ط­" })
    } else {
      setCategories((prev) => [
        ...prev,
        { id: generateId(), name: form.name, description: form.description, icon: form.icon, color: form.color, courseCount: 0 },
      ])
      addToast({ type: "success", title: "طھظ… ط¥ط¶ط§ظپط© ط§ظ„طھطµظ†ظٹظپ ط¨ظ†ط¬ط§ط­" })
    }
    setModalOpen(false)
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id))
    addToast({ type: "success", title: `طھظ… ط­ط°ظپ طھطµظ†ظٹظپ "${deleteTarget.name}" ط¨ظ†ط¬ط§ط­` })
    setDeleteTarget(null)
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <ErrorState title="ط­ط¯ط« ط®ط·ط£" message={error} onRetry={() => setError(null)} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "الكورسات", href: "/teacher/courses" }, { label: "التصنيفات" }]} />
      <PageHeader
        title="طھطµظ†ظٹظپط§طھ ط§ظ„ظƒظˆط±ط³ط§طھ"
        description="ط¥ط¯ط§ط±ط© طھطµظ†ظٹظپط§طھ ط§ظ„ظƒظˆط±ط³ط§طھ ط§ظ„طھط¹ظ„ظٹظ…ظٹط©"
        actions={
          <Button variant="primary" onClick={openCreateModal} leftIcon={<HiOutlinePlus size={18} />}>
            ط¥ط¶ط§ظپط© طھطµظ†ظٹظپ ط¬ط¯ظٹط¯
          </Button>
        }
      />

      {loading ? (
        <CardSkeleton count={6} />
      ) : categories.length === 0 ? (
        <EmptyState
          title="ظ„ط§ طھظˆط¬ط¯ طھطµظ†ظٹظپط§طھ"
          description="ظ„ظ… ظٹطھظ… ط¥ط¶ط§ظپط© ط£ظٹ طھطµظ†ظٹظپط§طھ ط¨ط¹ط¯. ط£ط¶ظپ طھطµظ†ظٹظپط§ظ‹ ط¬ط¯ظٹط¯ط§ظ‹ ظ„ظ„ط¨ط¯ط،."
          action={
            <Button variant="primary" onClick={openCreateModal}>
              ط¥ط¶ط§ظپط© طھطµظ†ظٹظپ ط¬ط¯ظٹط¯
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
                        <span className="text-xs text-text-secondary">{cat.courseCount} ظƒظˆط±ط³</span>
                      </div>
                    </div>
                  </div>
                  <hr className="border-border my-3" />
                  <div className="flex items-center justify-end gap-2">
                    <button type="button"
                      onClick={() => openEditModal(cat)}
                      className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                      title="طھط¹ط¯ظٹظ„"
                    >
                      <HiOutlinePencil size={16} />
                    </button>
                    <button type="button"
                      onClick={() => setDeleteTarget(cat)}
                      className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors"
                      title="ط­ط°ظپ"
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
        title={editingCategory ? "طھط¹ط¯ظٹظ„ طھطµظ†ظٹظپ" : "ط¥ط¶ط§ظپط© طھطµظ†ظٹظپ ط¬ط¯ظٹط¯"}
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="ط§ط³ظ… ط§ظ„طھطµظ†ظٹظپ"
            value={form.name}
            onChange={(e) => { setForm((p) => ({ ...p, name: e.target.value })); setFormErrors((p) => ({ ...p, name: undefined })) }}
            placeholder="ظ…ط«ط§ظ„: ط§ظ„ط±ظٹط§ط¶ظٹط§طھ"
            error={formErrors.name}
          />
          <Input
            label="ط§ظ„ظˆطµظپ"
            value={form.description}
            onChange={(e) => { setForm((p) => ({ ...p, description: e.target.value })); setFormErrors((p) => ({ ...p, description: undefined })) }}
            placeholder="ظˆطµظپ ظ…ط®طھطµط± ظ„ظ„طھطµظ†ظٹظپ"
            error={formErrors.description}
          />
          <Select
            label="ط§ظ„ط£ظٹظ‚ظˆظ†ط©"
            value={form.icon}
            onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
            options={iconOptions}
          />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">ط§ظ„ظ„ظˆظ†</label>
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
            <button type="button" variant="primary" onClick={handleSave} className="flex-1">
              {editingCategory ? "ط­ظپط¸ ط§ظ„طھط؛ظٹظٹط±ط§طھ" : "ط¥ط¶ط§ظپط© ط§ظ„طھطµظ†ظٹظپ"}
            </Button>
            <Button variant="secondary" onClick={() => setModalOpen(false)} className="flex-1">
              ط¥ظ„ط؛ط§ط،
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="ط­ط°ظپ ط§ظ„طھطµظ†ظٹظپ"
        message={deleteTarget ? `ظ‡ظ„ ط£ظ†طھ ظ…طھط£ظƒط¯ ظ…ظ† ط­ط°ظپ طھطµظ†ظٹظپ "${deleteTarget.name}"طں ظ‡ط°ط§ ط§ظ„ط¥ط¬ط±ط§ط، ظ„ط§ ظٹظ…ظƒظ† ط§ظ„طھط±ط§ط¬ط¹ ط¹ظ†ظ‡.` : ""}
        confirmText="ط­ط°ظپ"
        cancelText="ط¥ظ„ط؛ط§ط،"
        variant="danger"
      />
    </div>
  )
}

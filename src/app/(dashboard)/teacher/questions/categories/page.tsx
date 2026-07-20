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
  { value: "ط¸â€ ط·آ­ط¸ث†", label: "ط¸â€ ط·آ­ط¸ث†" },
  { value: "ط·آµط·آ±ط¸ظ¾", label: "ط·آµط·آ±ط¸ظ¾" },
  { value: "ط·آ¨ط¸â€‍ط·آ§ط·ط›ط·آ©", label: "ط·آ¨ط¸â€‍ط·آ§ط·ط›ط·آ©" },
  { value: "ط·آ£ط·آ¯ط·آ¨", label: "ط·آ£ط·آ¯ط·آ¨" },
  { value: "ط¸â€ ط·آµط¸ث†ط·آµ", label: "ط¸â€ ط·آµط¸ث†ط·آµ" },
  { value: "ط·آ¥ط¸â€¦ط¸â€‍ط·آ§ط·طŒ", label: "ط·آ¥ط¸â€¦ط¸â€‍ط·آ§ط·طŒ" },
  { value: "ط·ع¾ط·آ¹ط·آ¨ط¸ظ¹ط·آ±", label: "ط·ع¾ط·آ¹ط·آ¨ط¸ظ¹ط·آ±" },
  { value: "ط¸â€ڑط¸ث†ط·آ§ط·آ¹ط·آ¯", label: "ط¸â€ڑط¸ث†ط·آ§ط·آ¹ط·آ¯" },
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

const mockCategories = [
  { id: "1", name: "ط·آ§ط¸â€‍ط·آ£ط¸ظ¾ط·آ¹ط·آ§ط¸â€‍", subject: "ط¸â€ ط·آ­ط¸ث†", questionCount: 15, color: "#6366F1" },
  { id: "2", name: "ط·آ§ط¸â€‍ط·آ£ط·آ³ط¸â€¦ط·آ§ط·طŒ", subject: "ط¸â€ ط·آ­ط¸ث†", questionCount: 12, color: "#10B981" },
  { id: "3", name: "ط·آ§ط¸â€‍ط¸â€¦ط¸ظ¹ط·آ²ط·آ§ط¸â€  ط·آ§ط¸â€‍ط·آµط·آ±ط¸ظ¾ط¸ظ¹", subject: "ط·آµط·آ±ط¸ظ¾", questionCount: 10, color: "#F59E0B" },
  { id: "4", name: "ط·آ§ط¸â€‍ط¸â€¦ط·آ´ط·ع¾ط¸â€ڑط·آ§ط·ع¾", subject: "ط·آµط·آ±ط¸ظ¾", questionCount: 8, color: "#EF4444" },
  { id: "5", name: "ط·آ§ط¸â€‍ط·ع¾ط·آ´ط·آ¨ط¸ظ¹ط¸â€،", subject: "ط·آ¨ط¸â€‍ط·آ§ط·ط›ط·آ©", questionCount: 14, color: "#8B5CF6" },
  { id: "6", name: "ط·آ§ط¸â€‍ط·آ§ط·آ³ط·ع¾ط·آ¹ط·آ§ط·آ±ط·آ©", subject: "ط·آ¨ط¸â€‍ط·آ§ط·ط›ط·آ©", questionCount: 11, color: "#EC4899" },
  { id: "7", name: "ط·آ§ط¸â€‍ط·آ´ط·آ¹ط·آ± ط·آ§ط¸â€‍ط·آ¬ط·آ§ط¸â€،ط¸â€‍ط¸ظ¹", subject: "ط·آ£ط·آ¯ط·آ¨", questionCount: 18, color: "#3B82F6" },
  { id: "8", name: "ط·آ§ط¸â€‍ط·آ´ط·آ¹ط·آ± ط·آ§ط¸â€‍ط·آ¹ط·آ¨ط·آ§ط·آ³ط¸ظ¹", subject: "ط·آ£ط·آ¯ط·آ¨", questionCount: 9, color: "#F97316" },
  { id: "9", name: "ط·آ§ط¸â€‍ط¸â€ڑط·آ±ط·آ§ط·طŒط·آ© ط·آ§ط¸â€‍ط¸â€¦ط·ع¾ط·آ­ط·آ±ط·آ±ط·آ©", subject: "ط¸â€ ط·آµط¸ث†ط·آµ", questionCount: 7, color: "#6366F1" },
  { id: "10", name: "ط·آ§ط¸â€‍ط¸â€ ط·آµط¸ث†ط·آµ ط·آ§ط¸â€‍ط·آ´ط·آ¹ط·آ±ط¸ظ¹ط·آ©", subject: "ط¸â€ ط·آµط¸ث†ط·آµ", questionCount: 13, color: "#10B981" },
  { id: "11", name: "ط·آ§ط¸â€‍ط¸â€،ط¸â€¦ط·آ²ط·آ§ط·ع¾", subject: "ط·آ¥ط¸â€¦ط¸â€‍ط·آ§ط·طŒ", questionCount: 6, color: "#F59E0B" },
  { id: "12", name: "ط·آ¹ط¸â€‍ط·آ§ط¸â€¦ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·ع¾ط·آ±ط¸â€ڑط¸ظ¹ط¸â€¦", subject: "ط·آ¥ط¸â€¦ط¸â€‍ط·آ§ط·طŒ", questionCount: 5, color: "#EF4444" },
  { id: "13", name: "ط·آ§ط¸â€‍ط¸â€¦ط¸ث†ط·آ¶ط¸ث†ط·آ¹ ط·آ§ط¸â€‍ط¸ث†ط·آµط¸ظ¾ط¸ظ¹", subject: "ط·ع¾ط·آ¹ط·آ¨ط¸ظ¹ط·آ±", questionCount: 10, color: "#8B5CF6" },
  { id: "14", name: "ط·آ§ط¸â€‍ط¸â€¦ط¸ث†ط·آ¶ط¸ث†ط·آ¹ ط·آ§ط¸â€‍ط·آ³ط·آ±ط·آ¯ط¸ظ¹", subject: "ط·ع¾ط·آ¹ط·آ¨ط¸ظ¹ط·آ±", questionCount: 8, color: "#EC4899" },
  { id: "15", name: "ط·آ§ط¸â€‍ط¸â€¦ط·آ±ط¸ظ¾ط¸ث†ط·آ¹ط·آ§ط·ع¾", subject: "ط¸â€ڑط¸ث†ط·آ§ط·آ¹ط·آ¯", questionCount: 20, color: "#3B82F6" },
  { id: "16", name: "ط·آ§ط¸â€‍ط¸â€¦ط¸â€ ط·آµط¸ث†ط·آ¨ط·آ§ط·ع¾", subject: "ط¸â€ڑط¸ث†ط·آ§ط·آ¹ط·آ¯", questionCount: 16, color: "#F97316" },
]

interface CategoryForm {
  name: string
  subject: string
  color: string
}

const emptyForm: CategoryForm = { name: "", subject: "ط¸â€ ط·آ­ط¸ث†", color: "#6366F1" }

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
    if (!form.name.trim()) errs.name = "ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾ ط¸â€¦ط·آ·ط¸â€‍ط¸ث†ط·آ¨"
    if (!form.subject.trim()) errs.subject = "ط·آ§ط¸â€‍ط¸â€¦ط·آ§ط·آ¯ط·آ© ط¸â€¦ط·آ·ط¸â€‍ط¸ث†ط·آ¨ط·آ©"
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
      addToast({ type: "success", title: "ط·ع¾ط¸â€¦ ط·ع¾ط·آ­ط·آ¯ط¸ظ¹ط·آ« ط·آ§ط¸â€‍ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾ ط·آ¨ط¸â€ ط·آ¬ط·آ§ط·آ­" })
    } else {
      setCategories((prev) => [
        ...prev,
        { id: generateId(), name: form.name, subject: form.subject, questionCount: 0, color: form.color },
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

  const columns = [
    {
      key: "name",
      header: "ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾",
      render: (item: typeof mockCategories[0]) => (
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
          <span className="font-medium text-text">{item.name}</span>
        </div>
      ),
    },
    {
      key: "subject",
      header: "ط·آ§ط¸â€‍ط¸â€¦ط·آ§ط·آ¯ط·آ©",
      render: (item: typeof mockCategories[0]) => (
        <Badge variant="primary" size="sm">{item.subject}</Badge>
      ),
    },
    {
      key: "questionCount",
      header: "ط·آ¹ط·آ¯ط·آ¯ ط·آ§ط¸â€‍ط·آ£ط·آ³ط·آ¦ط¸â€‍ط·آ©",
      render: (item: typeof mockCategories[0]) => (
        <span className="text-text-secondary">{item.questionCount} ط·آ³ط·آ¤ط·آ§ط¸â€‍{item.questionCount !== 1 ? "ط·آ§ط¸â€¹" : ""}</span>
      ),
    },
    {
      key: "color",
      header: "ط·آ§ط¸â€‍ط¸â€‍ط¸ث†ط¸â€ ",
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
            title="ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍"
          >
            <HiOutlinePencil size={16} />
          </button>
          <button type="button"
            onClick={() => setDeleteTarget(item)}
            className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors"
            title="ط·آ­ط·آ°ط¸ظ¾"
          >
            <HiOutlineTrash size={16} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "ط¨ظ†ظƒ ط§ظ„ط£ط³ط¦ظ„ط©", href: "/teacher/questions" }, { label: "ط§ظ„طھطµظ†ظٹظپط§طھ" }]} />
      <DashboardHeader title="ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·آ£ط·آ³ط·آ¦ط¸â€‍ط·آ©" subtitle="ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾ط·آ§ط·ع¾ ط¸ث†ط¸â€¦ط¸ث†ط·آ§ط·آ¶ط¸ظ¹ط·آ¹ ط·آ§ط¸â€‍ط·آ£ط·آ³ط·آ¦ط¸â€‍ط·آ©" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ ط·آ§ط¸â€‍ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾ط·آ§ط·ع¾" value={totalCategories} icon={HiBookOpen} color="primary" />
        <StatsCard title="ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ ط·آ§ط¸â€‍ط·آ£ط·آ³ط·آ¦ط¸â€‍ط·آ©" value={totalQuestions} icon={HiQuestionMarkCircle} color="success" />
        <StatsCard title="ط¸â€¦ط·ع¾ط¸ث†ط·آ³ط·آ· ط·آ§ط¸â€‍ط·آ£ط·آ³ط·آ¦ط¸â€‍ط·آ©" value={avgPerCategory} icon={HiChartBar} color="info" subtitle="ط¸â€‍ط¸ئ’ط¸â€‍ ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾" />
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <SearchInput value={search} onChange={setSearch} placeholder="ط·آ¨ط·آ­ط·آ« ط·آ¹ط¸â€  ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾..." className="w-full sm:w-72" />
        <Button variant="primary" onClick={openCreateModal} leftIcon={<HiOutlinePlus size={18} />}>
          ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾ ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Table columns={columns} data={filtered} emptyMessage="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾ط·آ§ط·ع¾ ط·ع¾ط·آ·ط·آ§ط·آ¨ط¸â€ڑ ط·آ¨ط·آ­ط·آ«ط¸ئ’" />
          </motion.div>
        </CardContent>
      </Card>

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
            placeholder="ط¸â€¦ط·آ«ط·آ§ط¸â€‍: ط·آ§ط¸â€‍ط·آ£ط¸ظ¾ط·آ¹ط·آ§ط¸â€‍"
            error={formErrors.name}
          />
          <Select
            label="ط·آ§ط¸â€‍ط¸â€¦ط·آ§ط·آ¯ط·آ©"
            value={form.subject}
            onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
            options={subjectOptions}
          />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">ط·آ§ط¸â€‍ط¸â€‍ط¸ث†ط¸â€ </label>
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

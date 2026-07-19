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
  { value: "ظ†ط­ظˆ", label: "ظ†ط­ظˆ" },
  { value: "طµط±ظپ", label: "طµط±ظپ" },
  { value: "ط¨ظ„ط§ط؛ط©", label: "ط¨ظ„ط§ط؛ط©" },
  { value: "ط£ط¯ط¨", label: "ط£ط¯ط¨" },
  { value: "ظ†طµظˆطµ", label: "ظ†طµظˆطµ" },
  { value: "ط¥ظ…ظ„ط§ط،", label: "ط¥ظ…ظ„ط§ط،" },
  { value: "طھط¹ط¨ظٹط±", label: "طھط¹ط¨ظٹط±" },
  { value: "ظ‚ظˆط§ط¹ط¯", label: "ظ‚ظˆط§ط¹ط¯" },
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

const mockCategories = [
  { id: "1", name: "ط§ظ„ط£ظپط¹ط§ظ„", subject: "ظ†ط­ظˆ", questionCount: 15, color: "#6366F1" },
  { id: "2", name: "ط§ظ„ط£ط³ظ…ط§ط،", subject: "ظ†ط­ظˆ", questionCount: 12, color: "#10B981" },
  { id: "3", name: "ط§ظ„ظ…ظٹط²ط§ظ† ط§ظ„طµط±ظپظٹ", subject: "طµط±ظپ", questionCount: 10, color: "#F59E0B" },
  { id: "4", name: "ط§ظ„ظ…ط´طھظ‚ط§طھ", subject: "طµط±ظپ", questionCount: 8, color: "#EF4444" },
  { id: "5", name: "ط§ظ„طھط´ط¨ظٹظ‡", subject: "ط¨ظ„ط§ط؛ط©", questionCount: 14, color: "#8B5CF6" },
  { id: "6", name: "ط§ظ„ط§ط³طھط¹ط§ط±ط©", subject: "ط¨ظ„ط§ط؛ط©", questionCount: 11, color: "#EC4899" },
  { id: "7", name: "ط§ظ„ط´ط¹ط± ط§ظ„ط¬ط§ظ‡ظ„ظٹ", subject: "ط£ط¯ط¨", questionCount: 18, color: "#3B82F6" },
  { id: "8", name: "ط§ظ„ط´ط¹ط± ط§ظ„ط¹ط¨ط§ط³ظٹ", subject: "ط£ط¯ط¨", questionCount: 9, color: "#F97316" },
  { id: "9", name: "ط§ظ„ظ‚ط±ط§ط،ط© ط§ظ„ظ…طھط­ط±ط±ط©", subject: "ظ†طµظˆطµ", questionCount: 7, color: "#6366F1" },
  { id: "10", name: "ط§ظ„ظ†طµظˆطµ ط§ظ„ط´ط¹ط±ظٹط©", subject: "ظ†طµظˆطµ", questionCount: 13, color: "#10B981" },
  { id: "11", name: "ط§ظ„ظ‡ظ…ط²ط§طھ", subject: "ط¥ظ…ظ„ط§ط،", questionCount: 6, color: "#F59E0B" },
  { id: "12", name: "ط¹ظ„ط§ظ…ط§طھ ط§ظ„طھط±ظ‚ظٹظ…", subject: "ط¥ظ…ظ„ط§ط،", questionCount: 5, color: "#EF4444" },
  { id: "13", name: "ط§ظ„ظ…ظˆط¶ظˆط¹ ط§ظ„ظˆطµظپظٹ", subject: "طھط¹ط¨ظٹط±", questionCount: 10, color: "#8B5CF6" },
  { id: "14", name: "ط§ظ„ظ…ظˆط¶ظˆط¹ ط§ظ„ط³ط±ط¯ظٹ", subject: "طھط¹ط¨ظٹط±", questionCount: 8, color: "#EC4899" },
  { id: "15", name: "ط§ظ„ظ…ط±ظپظˆط¹ط§طھ", subject: "ظ‚ظˆط§ط¹ط¯", questionCount: 20, color: "#3B82F6" },
  { id: "16", name: "ط§ظ„ظ…ظ†طµظˆط¨ط§طھ", subject: "ظ‚ظˆط§ط¹ط¯", questionCount: 16, color: "#F97316" },
]

interface CategoryForm {
  name: string
  subject: string
  color: string
}

const emptyForm: CategoryForm = { name: "", subject: "ظ†ط­ظˆ", color: "#6366F1" }

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
    if (!form.name.trim()) errs.name = "ط§ط³ظ… ط§ظ„طھطµظ†ظٹظپ ظ…ط·ظ„ظˆط¨"
    if (!form.subject.trim()) errs.subject = "ط§ظ„ظ…ط§ط¯ط© ظ…ط·ظ„ظˆط¨ط©"
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
      addToast({ type: "success", title: "طھظ… طھط­ط¯ظٹط« ط§ظ„طھطµظ†ظٹظپ ط¨ظ†ط¬ط§ط­" })
    } else {
      setCategories((prev) => [
        ...prev,
        { id: generateId(), name: form.name, subject: form.subject, questionCount: 0, color: form.color },
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

  const columns = [
    {
      key: "name",
      header: "ط§ط³ظ… ط§ظ„طھطµظ†ظٹظپ",
      render: (item: typeof mockCategories[0]) => (
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
          <span className="font-medium text-text">{item.name}</span>
        </div>
      ),
    },
    {
      key: "subject",
      header: "ط§ظ„ظ…ط§ط¯ط©",
      render: (item: typeof mockCategories[0]) => (
        <Badge variant="primary" size="sm">{item.subject}</Badge>
      ),
    },
    {
      key: "questionCount",
      header: "ط¹ط¯ط¯ ط§ظ„ط£ط³ط¦ظ„ط©",
      render: (item: typeof mockCategories[0]) => (
        <span className="text-text-secondary">{item.questionCount} ط³ط¤ط§ظ„{item.questionCount !== 1 ? "ط§ظ‹" : ""}</span>
      ),
    },
    {
      key: "color",
      header: "ط§ظ„ظ„ظˆظ†",
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
            title="طھط¹ط¯ظٹظ„"
          >
            <HiOutlinePencil size={16} />
          </button>
          <button type="button"
            onClick={() => setDeleteTarget(item)}
            className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors"
            title="ط­ط°ظپ"
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
      <DashboardHeader title="طھطµظ†ظٹظپط§طھ ط§ظ„ط£ط³ط¦ظ„ط©" subtitle="ط¥ط¯ط§ط±ط© طھطµظ†ظٹظپط§طھ ظˆظ…ظˆط§ط¶ظٹط¹ ط§ظ„ط£ط³ط¦ظ„ط©" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„طھطµظ†ظٹظپط§طھ" value={totalCategories} icon={HiBookOpen} color="primary" />
        <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط£ط³ط¦ظ„ط©" value={totalQuestions} icon={HiQuestionMarkCircle} color="success" />
        <StatsCard title="ظ…طھظˆط³ط· ط§ظ„ط£ط³ط¦ظ„ط©" value={avgPerCategory} icon={HiChartBar} color="info" subtitle="ظ„ظƒظ„ طھطµظ†ظٹظپ" />
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <SearchInput value={search} onChange={setSearch} placeholder="ط¨ط­ط« ط¹ظ† طھطµظ†ظٹظپ..." className="w-full sm:w-72" />
        <Button variant="primary" onClick={openCreateModal} leftIcon={<HiOutlinePlus size={18} />}>
          ط¥ط¶ط§ظپط© طھطµظ†ظٹظپ ط¬ط¯ظٹط¯
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Table columns={columns} data={filtered} emptyMessage="ظ„ط§ طھظˆط¬ط¯ طھطµظ†ظٹظپط§طھ طھط·ط§ط¨ظ‚ ط¨ط­ط«ظƒ" />
          </motion.div>
        </CardContent>
      </Card>

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
            placeholder="ظ…ط«ط§ظ„: ط§ظ„ط£ظپط¹ط§ظ„"
            error={formErrors.name}
          />
          <Select
            label="ط§ظ„ظ…ط§ط¯ط©"
            value={form.subject}
            onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
            options={subjectOptions}
          />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">ط§ظ„ظ„ظˆظ†</label>
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

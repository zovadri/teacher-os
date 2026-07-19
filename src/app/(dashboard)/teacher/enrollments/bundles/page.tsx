"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineCollection,
  HiOutlineBookOpen,
  HiOutlineCheckCircle,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineCurrencyDollar,
  HiOutlineTag,
} from "react-icons/hi"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import { Modal } from "@/components/ui/Modal"
import { ConfirmDialog } from "@/components/ui/ConfirmDialog"
import { EmptyState } from "@/components/ui/EmptyState"
import { mockBundles, mockCourses } from "@/lib/mock/data"
import { useNotificationStore } from "@/lib/notification-store"
import { generateId, formatCurrency } from "@/lib/utils"
import type { Bundle } from "@/lib/types"

const stats = [
  { title: "ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط¨ط§ظ‚ط§طھ", value: mockBundles.length, icon: HiOutlineCollection, color: "primary" as const },
  { title: "ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظƒظˆط±ط³ط§طھ", value: mockBundles.reduce((s, b) => s + b.courses.length, 0), icon: HiOutlineBookOpen, color: "info" as const },
  { title: "ط§ظ„ط¨ط§ظ‚ط§طھ ط§ظ„ظ†ط´ط·ط©", value: mockBundles.filter((b) => b.status === "active").length, icon: HiOutlineCheckCircle, color: "success" as const },
]

interface BundleForm {
  name: string
  description: string
  courseIds: string[]
  price: number
  discount: number
  status: "active" | "inactive"
}

const emptyForm: BundleForm = {
  name: "",
  description: "",
  courseIds: [],
  price: 0,
  discount: 0,
  status: "active",
}

export default function BundlesPage() {
  const [bundles, setBundles] = useState(mockBundles)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingBundle, setEditingBundle] = useState<Bundle | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Bundle | null>(null)
  const [form, setForm] = useState<BundleForm>(emptyForm)
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof BundleForm, string>>>({})
  const { addToast } = useNotificationStore()

  const totalCoursesCount = useMemo(() => bundles.reduce((s, b) => s + b.courses.length, 0), [bundles])
  const activeCount = useMemo(() => bundles.filter((b) => b.status === "active").length, [bundles])

  const openCreateModal = () => {
    setEditingBundle(null)
    setForm(emptyForm)
    setFormErrors({})
    setModalOpen(true)
  }

  const openEditModal = (bundle: Bundle) => {
    setEditingBundle(bundle)
    setForm({
      name: bundle.name,
      description: bundle.description,
      courseIds: [...bundle.courses],
      price: bundle.price,
      discount: bundle.discount,
      status: bundle.status,
    })
    setFormErrors({})
    setModalOpen(true)
  }

  const validate = (): boolean => {
    const errs: Partial<Record<keyof BundleForm, string>> = {}
    if (!form.name.trim()) errs.name = "ط§ط³ظ… ط§ظ„ط¨ط§ظ‚ط© ظ…ط·ظ„ظˆط¨"
    if (!form.description.trim()) errs.description = "ط§ظ„ظˆطµظپ ظ…ط·ظ„ظˆط¨"
    if (form.courseIds.length === 0) errs.courseIds = "ظٹط¬ط¨ ط§ط®طھظٹط§ط± ظƒظˆط±ط³ ظˆط§ط­ط¯ ط¹ظ„ظ‰ ط§ظ„ط£ظ‚ظ„"
    if (form.price <= 0) errs.price = "ط§ظ„ط³ط¹ط± ظٹط¬ط¨ ط£ظ† ظٹظƒظˆظ† ط£ظƒط¨ط± ظ…ظ† طµظپط±"
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSave = () => {
    if (!validate()) return
    if (editingBundle) {
      setBundles((prev) =>
        prev.map((b) =>
          b.id === editingBundle.id
            ? { ...b, name: form.name, description: form.description, courses: form.courseIds, price: form.price, discount: form.discount, status: form.status }
            : b
        )
      )
      addToast({ type: "success", title: "طھظ… طھط­ط¯ظٹط« ط§ظ„ط¨ط§ظ‚ط© ط¨ظ†ط¬ط§ط­" })
    } else {
      setBundles((prev) => [
        ...prev,
        { id: generateId(), name: form.name, description: form.description, courses: form.courseIds, price: form.price, discount: form.discount, status: form.status, createdAt: new Date() },
      ])
      addToast({ type: "success", title: "طھظ… ط¥ط¶ط§ظپط© ط§ظ„ط¨ط§ظ‚ط© ط¨ظ†ط¬ط§ط­" })
    }
    setModalOpen(false)
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    setBundles((prev) => prev.filter((b) => b.id !== deleteTarget.id))
    addToast({ type: "success", title: `طھظ… ط­ط°ظپ ط§ظ„ط¨ط§ظ‚ط© "${deleteTarget.name}" ط¨ظ†ط¬ط§ط­` })
    setDeleteTarget(null)
  }

  const toggleCourse = (courseId: string) => {
    setForm((prev) => ({
      ...prev,
      courseIds: prev.courseIds.includes(courseId)
        ? prev.courseIds.filter((id) => id !== courseId)
        : [...prev.courseIds, courseId],
    }))
    setFormErrors((prev) => ({ ...prev, courseIds: undefined }))
  }

  const effectiveStats = [
    { title: "ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط¨ط§ظ‚ط§طھ", value: bundles.length, icon: HiOutlineCollection, color: "primary" as const },
    { title: "ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظƒظˆط±ط³ط§طھ", value: totalCoursesCount, icon: HiOutlineBookOpen, color: "info" as const },
    { title: "ط§ظ„ط¨ط§ظ‚ط§طھ ط§ظ„ظ†ط´ط·ط©", value: activeCount, icon: HiOutlineCheckCircle, color: "success" as const },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "التسجيلات", href: "/teacher/enrollments" }, { label: "الباقات" }]} />
      <DashboardHeader title="ط¥ط¯ط§ط±ط© ط§ظ„ط¨ط§ظ‚ط§طھ" subtitle="ط¥ط¯ط§ط±ط© ط¨ط§ظ‚ط§طھ ط§ظ„ظƒظˆط±ط³ط§طھ ظˆط§ظ„طھط³ط¹ظٹط±" />

      <div className="grid grid-cols-3 gap-4">
        {effectiveStats.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <StatsCard title={s.title} value={s.value} icon={s.icon} color={s.color} />
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button variant="primary" onClick={openCreateModal} leftIcon={<HiOutlinePlus size={18} />}>
          ط¥ط¶ط§ظپط© ط¨ط§ظ‚ط© ط¬ط¯ظٹط¯ط©
        </Button>
      </div>

      {bundles.length === 0 ? (
        <EmptyState
          title="ظ„ط§ طھظˆط¬ط¯ ط¨ط§ظ‚ط§طھ"
          description="ظ„ظ… ظٹطھظ… ط¥ط¶ط§ظپط© ط£ظٹ ط¨ط§ظ‚ط§طھ ط¨ط¹ط¯. ط£ط¶ظپ ط¨ط§ظ‚ط© ط¬ط¯ظٹط¯ط© ظ„ظ„ط¨ط¯ط،."
          action={
            <Button variant="primary" onClick={openCreateModal}>
              ط¥ط¶ط§ظپط© ط¨ط§ظ‚ط© ط¬ط¯ظٹط¯ط©
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bundles.map((bundle, index) => {
            const courseList = bundle.courses.map((cid) => mockCourses.find((c) => c.id === cid)).filter(Boolean)
            const effectivePrice = bundle.price - (bundle.price * bundle.discount) / 100
            return (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full flex flex-col">
                  <CardContent className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <HiOutlineCollection className="text-primary" size={20} />
                      </div>
                      <Badge variant={bundle.status === "active" ? "success" : "neutral"}>
                        {bundle.status === "active" ? "ظ†ط´ط·" : "ط؛ظٹط± ظ†ط´ط·"}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-text mb-1">{bundle.name}</h3>
                    <p className="text-xs text-text-tertiary mb-3 line-clamp-2">{bundle.description}</p>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-xl font-bold text-text">{formatCurrency(effectivePrice)}</span>
                      {bundle.discount > 0 && (
                        <>
                          <span className="text-sm text-text-tertiary line-through">{formatCurrency(bundle.price)}</span>
                          <Badge variant="warning" size="sm">{bundle.discount}%</Badge>
                        </>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-text-secondary mb-2">{courseList.length} ظƒظˆط±ط³</p>
                      <div className="flex flex-wrap gap-1.5">
                        {courseList.map((c) => c && (
                          <Badge key={c.id} variant="primary" size="sm">{c.title}</Badge>
                        ))}
                      </div>
                    </div>
                    <hr className="border-border my-3" />
                    <div className="flex items-center justify-end gap-2">
                      <button type="button"
                        onClick={() => openEditModal(bundle)}
                        className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        title="طھط¹ط¯ظٹظ„"
                      >
                        <HiOutlinePencil size={16} />
                      </button>
                      <button type="button"
                        onClick={() => setDeleteTarget(bundle)}
                        className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors"
                        title="ط­ط°ظپ"
                      >
                        <HiOutlineTrash size={16} />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingBundle ? "طھط¹ط¯ظٹظ„ ط¨ط§ظ‚ط©" : "ط¥ط¶ط§ظپط© ط¨ط§ظ‚ط© ط¬ط¯ظٹط¯ط©"}
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="ط§ط³ظ… ط§ظ„ط¨ط§ظ‚ط©"
            value={form.name}
            onChange={(e) => { setForm((p) => ({ ...p, name: e.target.value })); setFormErrors((p) => ({ ...p, name: undefined })) }}
            placeholder="ظ…ط«ط§ظ„: ط§ظ„ط¨ط§ظ‚ط© ط§ظ„ط¹ط±ط¨ظٹط©"
            error={formErrors.name}
          />
          <Input
            label="ط§ظ„ظˆطµظپ"
            value={form.description}
            onChange={(e) => { setForm((p) => ({ ...p, description: e.target.value })); setFormErrors((p) => ({ ...p, description: undefined })) }}
            placeholder="ظˆطµظپ ظ…ط®طھطµط± ظ„ظ„ط¨ط§ظ‚ط©"
            error={formErrors.description}
          />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text">ط§ظ„ظƒظˆط±ط³ط§طھ</label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border border-border rounded-lg">
              {mockCourses.map((c) => (
                <label
                  key={c.id}
                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                    form.courseIds.includes(c.id) ? "bg-primary/10 border border-primary/30" : "hover:bg-surface-secondary border border-transparent"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.courseIds.includes(c.id)}
                    onChange={() => toggleCourse(c.id)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30"
                  />
                  <span className="text-sm text-text">{c.title}</span>
                </label>
              ))}
            </div>
            {formErrors.courseIds && <p className="text-xs text-error">{formErrors.courseIds}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="ط§ظ„ط³ط¹ط±"
              type="number"
              value={form.price}
              onChange={(e) => { setForm((p) => ({ ...p, price: Number(e.target.value) })); setFormErrors((p) => ({ ...p, price: undefined })) }}
              placeholder="0"
              leftIcon={<HiOutlineCurrencyDollar size={16} />}
              error={formErrors.price}
            />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text">ظ†ط³ط¨ط© ط§ظ„ط®طµظ… (%)</label>
              <div className="relative">
                <input
                  type="number"
                  value={form.discount}
                  onChange={(e) => setForm((p) => ({ ...p, discount: Number(e.target.value) }))}
                  placeholder="0"
                  className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <HiOutlineTag className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary w-4 h-4" />
              </div>
            </div>
          </div>
          <Select
            label="ط§ظ„ط­ط§ظ„ط©"
            value={form.status}
            onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as "active" | "inactive" }))}
            options={[
              { value: "active", label: "ظ†ط´ط·" },
              { value: "inactive", label: "ط؛ظٹط± ظ†ط´ط·" },
            ]}
          />
          <div className="flex items-center gap-3 pt-2">
            <button type="button" variant="primary" onClick={handleSave} className="flex-1">
              {editingBundle ? "ط­ظپط¸ ط§ظ„طھط؛ظٹظٹط±ط§طھ" : "ط¥ط¶ط§ظپط© ط§ظ„ط¨ط§ظ‚ط©"}
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
        title="ط­ط°ظپ ط§ظ„ط¨ط§ظ‚ط©"
        message={deleteTarget ? `ظ‡ظ„ ط£ظ†طھ ظ…طھط£ظƒط¯ ظ…ظ† ط­ط°ظپ ط§ظ„ط¨ط§ظ‚ط© "${deleteTarget.name}"طں ظ‡ط°ط§ ط§ظ„ط¥ط¬ط±ط§ط، ظ„ط§ ظٹظ…ظƒظ† ط§ظ„طھط±ط§ط¬ط¹ ط¹ظ†ظ‡.` : ""}
        confirmText="ط­ط°ظپ"
        cancelText="ط¥ظ„ط؛ط§ط،"
        variant="danger"
      />
    </div>
  )
}

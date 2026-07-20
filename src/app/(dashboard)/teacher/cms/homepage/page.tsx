"use client"

import { useState, useMemo } from "react"
import toast from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineChevronUp,
  HiOutlineChevronDown,
  HiOutlineEye,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineEyeOff,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Table } from "@/components/ui/Table"
import Button from "@/components/ui/Button"
import { Modal } from "@/components/ui/Modal"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import { Tabs } from "@/components/ui/Tabs"
import { mockCmsPages } from "@/lib/mock/data"
import { cn } from "@/lib/utils"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

const sectionTypes = [
  { value: "hero", label: "ط·آ´ط·آ±ط¸ظ¹ط·آ· ط·آ±ط·آ¦ط¸ظ¹ط·آ³ط¸ظ¹ (Hero)" },
  { value: "features", label: "ط¸â€¦ط¸â€¦ط¸ظ¹ط·آ²ط·آ§ط·ع¾" },
  { value: "stats", label: "ط·آ¥ط·آ­ط·آµط·آ§ط·آ¦ط¸ظ¹ط·آ§ط·ع¾" },
  { value: "courses", label: "ط¸ئ’ط¸ث†ط·آ±ط·آ³ط·آ§ط·ع¾" },
  { value: "testimonials", label: "ط·آ¢ط·آ±ط·آ§ط·طŒ ط·آ§ط¸â€‍ط·آ¹ط¸â€¦ط¸â€‍ط·آ§ط·طŒ" },
  { value: "pricing", label: "ط·آ¨ط·آ§ط¸â€ڑط·آ§ط·ع¾" },
  { value: "faq", label: "ط·آ£ط·آ³ط·آ¦ط¸â€‍ط·آ© ط·آ´ط·آ§ط·آ¦ط·آ¹ط·آ©" },
  { value: "cta", label: "ط·آ¯ط·آ¹ط¸ث†ط·آ© ط¸â€‍ط¸â€‍ط·آ¥ط·آ¬ط·آ±ط·آ§ط·طŒ" },
]

export default function HomepageBuilderPage() {
  const [sections, setSections] = useState(mockCmsPages.homepage.sections)
  const [editSection, setEditSection] = useState<any>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [newSection, setNewSection] = useState({ type: "hero", title: "", subtitle: "", cta: "", active: true })

  const sortedSections = useMemo(() => [...sections].sort((a, b) => a.order - b.order), [sections])

  const moveUp = (id: string) => {
    setSections((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order)
      const idx = sorted.findIndex((s) => s.id === id)
      if (idx <= 0) return prev
      const temp = sorted[idx].order
      sorted[idx].order = sorted[idx - 1].order
      sorted[idx - 1].order = temp
      return [...sorted]
    })
  }

  const moveDown = (id: string) => {
    setSections((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order)
      const idx = sorted.findIndex((s) => s.id === id)
      if (idx === -1 || idx >= sorted.length - 1) return prev
      const temp = sorted[idx].order
      sorted[idx].order = sorted[idx + 1].order
      sorted[idx + 1].order = temp
      return [...sorted]
    })
  }

  const toggleActive = (id: string) => {
    setSections((prev) => prev.map((s) => s.id === id ? { ...s, active: !s.active } : s))
  }

  const deleteSection = (id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id).map((s, i) => ({ ...s, order: i + 1 })))
  }

  const addSection = () => {
    const maxOrder = Math.max(...sections.map((s) => s.order), 0)
    setSections((prev) => [...prev, {
      id: `sec-${Date.now()}`,
      type: newSection.type,
      title: newSection.title || `${sectionTypes.find((t) => t.value === newSection.type)?.label || ""}`,
      subtitle: newSection.subtitle,
      cta: newSection.cta,
      backgroundImage: "",
      order: maxOrder + 1,
      active: newSection.active,
    }])
    setShowAddModal(false)
    setNewSection({ type: "hero", title: "", subtitle: "", cta: "", active: true })
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط·آ§ط¸â€‍ط¸â€¦ط·آ­ط·ع¾ط¸ث†ط¸â€°", href: "/teacher/cms" }, { label: "ط·آ§ط¸â€‍ط·آµط¸ظ¾ط·آ­ط·آ© ط·آ§ط¸â€‍ط·آ±ط·آ¦ط¸ظ¹ط·آ³ط¸ظ¹ط·آ©" }]} />
      <DashboardHeader title="ط·آ¨ط¸â€ ط·آ§ط·طŒ ط·آ§ط¸â€‍ط·آµط¸ظ¾ط·آ­ط·آ© ط·آ§ط¸â€‍ط·آ±ط·آ¦ط¸ظ¹ط·آ³ط¸ظ¹ط·آ©" subtitle="ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط¸ث†ط·ع¾ط·آ±ط·ع¾ط¸ظ¹ط·آ¨ ط¸ث†ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍ ط·آ£ط¸â€ڑط·آ³ط·آ§ط¸â€¦ ط·آ§ط¸â€‍ط·آµط¸ظ¾ط·آ­ط·آ© ط·آ§ط¸â€‍ط·آ±ط·آ¦ط¸ظ¹ط·آ³ط¸ظ¹ط·آ©" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="info" size="md">{sections.length} ط·آ£ط¸â€ڑط·آ³ط·آ§ط¸â€¦</Badge>
          <Badge variant={sections.filter((s) => s.active).length === sections.length ? "success" : "warning"} size="md">
            {sections.filter((s) => s.active).length} ط¸â€ ط·آ´ط·آ·
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" leftIcon={<HiOutlineEye className="w-4 h-4" />} onClick={() => setShowPreview(true)}>
            ط¸â€¦ط·آ¹ط·آ§ط¸ظ¹ط¸â€ ط·آ©
          </Button>
          <Button variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
            ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط¸â€ڑط·آ³ط¸â€¦
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {sortedSections.map((section, idx) => (
            <motion.div
              key={section.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={cn("relative", !section.active && "opacity-60")}>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-0.5">
                    <button type="button" onClick={() => moveUp(section.id)} disabled={idx === 0} className="p-0.5 text-text-tertiary hover:text-text disabled:opacity-30 disabled:cursor-not-allowed">
                      <HiOutlineChevronUp className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={() => moveDown(section.id)} disabled={idx === sortedSections.length - 1} className="p-0.5 text-text-tertiary hover:text-text disabled:opacity-30 disabled:cursor-not-allowed">
                      <HiOutlineChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-surface-secondary border border-border flex items-center justify-center text-lg">
                    {section.type === "hero" ? "ظ‹ع؛عˆآ " : section.type === "features" ? "أ¢إ“آ¨" : section.type === "stats" ? "ظ‹ع؛â€œظ¹" : section.type === "courses" ? "ظ‹ع؛â€œع‘" : section.type === "testimonials" ? "ظ‹ع؛â€™آ¬" : section.type === "pricing" ? "ظ‹ع؛â€™آ°" : section.type === "faq" ? "أ¢â€Œâ€œ" : "ظ‹ع؛â€‌â€Œ"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-text">{section.title || sectionTypes.find((t) => t.value === section.type)?.label}</span>
                      <Badge variant="neutral" size="sm">{sectionTypes.find((t) => t.value === section.type)?.label || section.type}</Badge>
                    </div>
                    {section.subtitle && <p className="text-xs text-text-tertiary mt-0.5 truncate">{section.subtitle}</p>}
                  </div>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => toggleActive(section.id)} className={`p-1.5 rounded-lg transition-colors ${section.active ? "text-success hover:bg-success/5" : "text-text-tertiary hover:bg-surface-secondary"}`}>
                      {section.active ? <HiOutlineEye className="w-4 h-4" /> : <HiOutlineEyeOff className="w-4 h-4" />}
                    </button>
                    <button type="button" onClick={() => setEditSection(section)} className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                      <HiOutlinePencil className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={() => deleteSection(section.id)} className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors">
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Modal isOpen={!!editSection} onClose={() => setEditSection(null)} title="ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍ ط·آ§ط¸â€‍ط¸â€ڑط·آ³ط¸â€¦" size="lg">
        {editSection && (
          <div className="space-y-4">
            <Select label="ط¸â€ ط¸ث†ط·آ¹ ط·آ§ط¸â€‍ط¸â€ڑط·آ³ط¸â€¦" options={sectionTypes} value={editSection.type} onChange={(e) => setEditSection({ ...editSection, type: e.target.value })} />
            <Input label="ط·آ§ط¸â€‍ط·آ¹ط¸â€ ط¸ث†ط·آ§ط¸â€ " value={editSection.title} onChange={(e) => setEditSection({ ...editSection, title: e.target.value })} />
            <Input label="ط·آ§ط¸â€‍ط·آ¹ط¸â€ ط¸ث†ط·آ§ط¸â€  ط·آ§ط¸â€‍ط¸ظ¾ط·آ±ط·آ¹ط¸ظ¹" value={editSection?.subtitle ?? ""} onChange={(e) => setEditSection({ ...editSection, subtitle: e.target.value })} />
            <Input label="ط¸â€ ط·آµ ط·آ§ط¸â€‍ط·آ²ط·آ±" value={editSection?.cta ?? ""} onChange={(e) => setEditSection({ ...editSection, cta: e.target.value })} />
            <Input label="ط·آµط¸ث†ط·آ±ط·آ© ط·آ§ط¸â€‍ط·آ®ط¸â€‍ط¸ظ¾ط¸ظ¹ط·آ© (URL)" value={editSection?.backgroundImage ?? ""} onChange={(e) => setEditSection({ ...editSection, backgroundImage: e.target.value })} />
            <div className="flex items-center gap-3 pt-2">
              <Button variant="primary" className="flex-1" onClick={() => {
                setSections((prev) => prev.map((s) => s.id === editSection.id ? editSection : s))
                setEditSection(null)
                toast.success("طھظ… ط­ظپط¸ ط§ظ„طµظپط­ط© ط§ظ„ط±ط¦ظٹط³ظٹط© ط¨ظ†ط¬ط§ط­")
              }}>ط·آ­ط¸ظ¾ط·آ¸ ط·آ§ط¸â€‍ط·ع¾ط·ط›ط¸ظ¹ط¸ظ¹ط·آ±ط·آ§ط·ع¾</Button>
              <Button variant="secondary" onClick={() => setEditSection(null)}>ط·آ¥ط¸â€‍ط·ط›ط·آ§ط·طŒ</Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط¸â€ڑط·آ³ط¸â€¦ ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯" size="md">
        <div className="space-y-4">
          <Select label="ط¸â€ ط¸ث†ط·آ¹ ط·آ§ط¸â€‍ط¸â€ڑط·آ³ط¸â€¦" options={sectionTypes} value={newSection.type} onChange={(e) => setNewSection({ ...newSection, type: e.target.value })} />
          <Input label="ط·آ§ط¸â€‍ط·آ¹ط¸â€ ط¸ث†ط·آ§ط¸â€ " value={newSection.title} onChange={(e) => setNewSection({ ...newSection, title: e.target.value })} />
          <Input label="ط·آ§ط¸â€‍ط·آ¹ط¸â€ ط¸ث†ط·آ§ط¸â€  ط·آ§ط¸â€‍ط¸ظ¾ط·آ±ط·آ¹ط¸ظ¹" value={newSection.subtitle} onChange={(e) => setNewSection({ ...newSection, subtitle: e.target.value })} />
          <Input label="ط¸â€ ط·آµ ط·آ§ط¸â€‍ط·آ²ط·آ±" value={newSection.cta} onChange={(e) => setNewSection({ ...newSection, cta: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <Button variant="primary" className="flex-1" onClick={addSection}>ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ©</Button>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>ط·آ¥ط¸â€‍ط·ط›ط·آ§ط·طŒ</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showPreview} onClose={() => setShowPreview(false)} title="ط¸â€¦ط·آ¹ط·آ§ط¸ظ¹ط¸â€ ط·آ© ط·آ§ط¸â€‍ط·آµط¸ظ¾ط·آ­ط·آ© ط·آ§ط¸â€‍ط·آ±ط·آ¦ط¸ظ¹ط·آ³ط¸ظ¹ط·آ©" size="xl">
        <div className="space-y-3">
          {sortedSections.filter((s) => s.active).map((s) => (
            <div key={s.id} className="p-6 rounded-xl bg-surface-secondary border border-border text-center">
              <Badge variant="neutral" size="sm" className="mb-2">{sectionTypes.find((t) => t.value === s.type)?.label}</Badge>
              <h3 className="text-lg font-bold text-text">{s.title}</h3>
              {s.subtitle && <p className="text-sm text-text-secondary mt-1">{s.subtitle}</p>}
              {s.cta && <Button variant="primary" size="sm" className="mt-3">{s.cta}</Button>}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}

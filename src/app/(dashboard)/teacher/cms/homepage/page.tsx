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
  { value: "hero", label: "ط´ط±ظٹط· ط±ط¦ظٹط³ظٹ (Hero)" },
  { value: "features", label: "ظ…ظ…ظٹط²ط§طھ" },
  { value: "stats", label: "ط¥ط­طµط§ط¦ظٹط§طھ" },
  { value: "courses", label: "ظƒظˆط±ط³ط§طھ" },
  { value: "testimonials", label: "ط¢ط±ط§ط، ط§ظ„ط¹ظ…ظ„ط§ط،" },
  { value: "pricing", label: "ط¨ط§ظ‚ط§طھ" },
  { value: "faq", label: "ط£ط³ط¦ظ„ط© ط´ط§ط¦ط¹ط©" },
  { value: "cta", label: "ط¯ط¹ظˆط© ظ„ظ„ط¥ط¬ط±ط§ط،" },
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
      <Breadcrumb items={[{ label: "ط¥ط¯ط§ط±ط© ط§ظ„ظ…ط­طھظˆظ‰", href: "/teacher/cms" }, { label: "ط§ظ„طµظپط­ط© ط§ظ„ط±ط¦ظٹط³ظٹط©" }]} />
      <DashboardHeader title="ط¨ظ†ط§ط، ط§ظ„طµظپط­ط© ط§ظ„ط±ط¦ظٹط³ظٹط©" subtitle="ط¥ط¶ط§ظپط© ظˆطھط±طھظٹط¨ ظˆطھط¹ط¯ظٹظ„ ط£ظ‚ط³ط§ظ… ط§ظ„طµظپط­ط© ط§ظ„ط±ط¦ظٹط³ظٹط©" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="info" size="md">{sections.length} ط£ظ‚ط³ط§ظ…</Badge>
          <Badge variant={sections.filter((s) => s.active).length === sections.length ? "success" : "warning"} size="md">
            {sections.filter((s) => s.active).length} ظ†ط´ط·
          </Badge>
        </div>
        <div className="flex gap-2">
          <button type="button" variant="secondary" leftIcon={<HiOutlineEye className="w-4 h-4" />} onClick={() => setShowPreview(true)}>
            ظ…ط¹ط§ظٹظ†ط©
          </Button>
          <button type="button" variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
            ط¥ط¶ط§ظپط© ظ‚ط³ظ…
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
                    {section.type === "hero" ? "ًںڈ " : section.type === "features" ? "âœ¨" : section.type === "stats" ? "ًں“ٹ" : section.type === "courses" ? "ًں“ڑ" : section.type === "testimonials" ? "ًں’¬" : section.type === "pricing" ? "ًں’°" : section.type === "faq" ? "â‌“" : "ًں”‌"}
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

      <Modal isOpen={!!editSection} onClose={() => setEditSection(null)} title="طھط¹ط¯ظٹظ„ ط§ظ„ظ‚ط³ظ…" size="lg">
        {editSection && (
          <div className="space-y-4">
            <Select label="ظ†ظˆط¹ ط§ظ„ظ‚ط³ظ…" options={sectionTypes} value={editSection.type} onChange={(e) => setEditSection({ ...editSection, type: e.target.value })} />
            <Input label="ط§ظ„ط¹ظ†ظˆط§ظ†" value={editSection.title} onChange={(e) => setEditSection({ ...editSection, title: e.target.value })} />
            <Input label="ط§ظ„ط¹ظ†ظˆط§ظ† ط§ظ„ظپط±ط¹ظٹ" value={editSection?.subtitle ?? ""} onChange={(e) => setEditSection({ ...editSection, subtitle: e.target.value })} />
            <Input label="ظ†طµ ط§ظ„ط²ط±" value={editSection?.cta ?? ""} onChange={(e) => setEditSection({ ...editSection, cta: e.target.value })} />
            <Input label="طµظˆط±ط© ط§ظ„ط®ظ„ظپظٹط© (URL)" value={editSection?.backgroundImage ?? ""} onChange={(e) => setEditSection({ ...editSection, backgroundImage: e.target.value })} />
            <div className="flex items-center gap-3 pt-2">
              <button type="button" variant="primary" className="flex-1" onClick={() => {
                setSections((prev) => prev.map((s) => s.id === editSection.id ? editSection : s))
                setEditSection(null)
                toast.success("تم حفظ الصفحة الرئيسية بنجاح")
              }}>ط­ظپط¸ ط§ظ„طھط؛ظٹظٹط±ط§طھ</Button>
              <Button variant="secondary" onClick={() => setEditSection(null)}>ط¥ظ„ط؛ط§ط،</Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="ط¥ط¶ط§ظپط© ظ‚ط³ظ… ط¬ط¯ظٹط¯" size="md">
        <div className="space-y-4">
          <Select label="ظ†ظˆط¹ ط§ظ„ظ‚ط³ظ…" options={sectionTypes} value={newSection.type} onChange={(e) => setNewSection({ ...newSection, type: e.target.value })} />
          <Input label="ط§ظ„ط¹ظ†ظˆط§ظ†" value={newSection.title} onChange={(e) => setNewSection({ ...newSection, title: e.target.value })} />
          <Input label="ط§ظ„ط¹ظ†ظˆط§ظ† ط§ظ„ظپط±ط¹ظٹ" value={newSection.subtitle} onChange={(e) => setNewSection({ ...newSection, subtitle: e.target.value })} />
          <Input label="ظ†طµ ط§ظ„ط²ط±" value={newSection.cta} onChange={(e) => setNewSection({ ...newSection, cta: e.target.value })} />
          <div className="flex gap-3 pt-2">
            <button type="button" variant="primary" className="flex-1" onClick={addSection}>ط¥ط¶ط§ظپط©</Button>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>ط¥ظ„ط؛ط§ط،</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showPreview} onClose={() => setShowPreview(false)} title="ظ…ط¹ط§ظٹظ†ط© ط§ظ„طµظپط­ط© ط§ظ„ط±ط¦ظٹط³ظٹط©" size="xl">
        <div className="space-y-3">
          {sortedSections.filter((s) => s.active).map((s) => (
            <div key={s.id} className="p-6 rounded-xl bg-surface-secondary border border-border text-center">
              <Badge variant="neutral" size="sm" className="mb-2">{sectionTypes.find((t) => t.value === s.type)?.label}</Badge>
              <h3 className="text-lg font-bold text-text">{s.title}</h3>
              {s.subtitle && <p className="text-sm text-text-secondary mt-1">{s.subtitle}</p>}
              {s.cta && <button type="button" variant="primary" size="sm" className="mt-3">{s.cta}</Button>}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}

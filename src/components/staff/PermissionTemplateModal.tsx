"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Modal } from "@/components/ui/Modal"
import Button from "@/components/ui/Button"

interface PermissionItem {
  key: string
  label: string
}

interface PermissionGroup {
  group: string
  permissions: PermissionItem[]
}

const permissionGroups: PermissionGroup[] = [
  {
    group: "ط§ظ„ط·ظ„ط§ط¨",
    permissions: [
      { key: "student_add", label: "ط¥ط¶ط§ظپط©" },
      { key: "student_edit", label: "طھط¹ط¯ظٹظ„" },
      { key: "student_delete", label: "ط­ط°ظپ" },
      { key: "student_view", label: "ط¹ط±ط¶" },
    ],
  },
  {
    group: "ط§ظ„ظƒظˆط±ط³ط§طھ",
    permissions: [
      { key: "course_add", label: "ط¥ط¶ط§ظپط©" },
      { key: "course_edit", label: "طھط¹ط¯ظٹظ„" },
      { key: "course_delete", label: "ط­ط°ظپ" },
      { key: "course_view", label: "ط¹ط±ط¶" },
    ],
  },
  {
    group: "ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ",
    permissions: [
      { key: "exam_add", label: "ط¥ط¶ط§ظپط©" },
      { key: "exam_edit", label: "طھط¹ط¯ظٹظ„" },
      { key: "exam_delete", label: "ط­ط°ظپ" },
      { key: "exam_view", label: "ط¹ط±ط¶" },
      { key: "exam_correct", label: "طھطµط­ظٹط­" },
    ],
  },
  {
    group: "ط§ظ„طھظ‚ط§ط±ظٹط±",
    permissions: [
      { key: "report_view", label: "ط¹ط±ط¶" },
      { key: "report_export", label: "طھطµط¯ظٹط±" },
    ],
  },
  {
    group: "ط§ظ„ط´ط¤ظˆظ† ط§ظ„ظ…ط§ظ„ظٹط©",
    permissions: [
      { key: "finance_view", label: "ط¹ط±ط¶" },
      { key: "finance_manage", label: "ط¥ط¯ط§ط±ط©" },
    ],
  },
  {
    group: "ط§ظ„ظ…ظˆط¸ظپظٹظ†",
    permissions: [
      { key: "staff_add", label: "ط¥ط¶ط§ظپط©" },
      { key: "staff_edit", label: "طھط¹ط¯ظٹظ„" },
      { key: "staff_delete", label: "ط­ط°ظپ" },
    ],
  },
  {
    group: "ط§ظ„ط¥ط¹ط¯ط§ط¯ط§طھ",
    permissions: [
      { key: "setting_view", label: "ط¹ط±ط¶" },
      { key: "setting_edit", label: "طھط¹ط¯ظٹظ„" },
    ],
  },
  {
    group: "ط§ظ„ط±ط³ط§ط¦ظ„",
    permissions: [
      { key: "msg_send", label: "ط¥ط±ط³ط§ظ„" },
      { key: "msg_read", label: "ظ‚ط±ط§ط،ط©" },
    ],
  },
  {
    group: "ط§ظ„ط­ط¶ظˆط±",
    permissions: [
      { key: "attendance_record", label: "طھط³ط¬ظٹظ„" },
      { key: "attendance_edit", label: "طھط¹ط¯ظٹظ„" },
      { key: "attendance_view", label: "ط¹ط±ط¶" },
    ],
  },
]

type AccessLevel = "read" | "write" | "full"

const levelStyles: Record<AccessLevel, string> = {
  read: "bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",
  write: "bg-amber-50 border-amber-200 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300",
  full: "bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300",
}

const levelLabels: Record<AccessLevel, string> = {
  read: "ظ‚ط±ط§ط،ط© ظپظ‚ط·",
  write: "ظƒطھط§ط¨ط©",
  full: "ظƒط§ظ…ظ„",
}

const levels: AccessLevel[] = ["read", "write", "full"]

export interface TemplateData {
  name: string
  description: string
  permissions: Record<string, AccessLevel>
}

interface PermissionTemplateModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: TemplateData) => void
  initialData?: TemplateData
}

export default function PermissionTemplateModal({ isOpen, onClose, onSave, initialData }: PermissionTemplateModalProps) {
  const [name, setName] = useState(initialData?.name || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [permissions, setPermissions] = useState<Record<string, AccessLevel>>(initialData?.permissions || {})

  const getLevel = (key: string): AccessLevel => permissions[key] || "read"

  const setLevel = (key: string, level: AccessLevel) => {
    setPermissions((prev) => ({ ...prev, [key]: level }))
  }

  const handleSave = () => {
    if (!name.trim()) return
    onSave({ name: name.trim(), description: description.trim(), permissions })
  }

  const allFull = () => {
    const all: Record<string, AccessLevel> = {}
    permissionGroups.forEach((g) => g.permissions.forEach((p) => { all[p.key] = "full" }))
    setPermissions(all)
  }

  const allRead = () => {
    const all: Record<string, AccessLevel> = {}
    permissionGroups.forEach((g) => g.permissions.forEach((p) => { all[p.key] = "read" }))
    setPermissions(all)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "طھط¹ط¯ظٹظ„ ظ‚ط§ظ„ط¨ ط§ظ„طµظ„ط§ط­ظٹط§طھ" : "ط¥ظ†ط´ط§ط، ظ‚ط§ظ„ط¨ ط¬ط¯ظٹط¯"} subtitle={initialData ? "طھط¹ط¯ظٹظ„ طµظ„ط§ط­ظٹط§طھ ط§ظ„ظ‚ط§ظ„ط¨" : "ط¥ط¶ط§ظپط© ظ‚ط§ظ„ط¨ طµظ„ط§ط­ظٹط§طھ ط¬ط¯ظٹط¯"} size="xl">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">ط§ط³ظ… ط§ظ„ظ‚ط§ظ„ط¨</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ط£ط¯ط®ظ„ ط§ط³ظ… ط§ظ„ظ‚ط§ظ„ط¨"
              className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">ظˆطµظپ ط§ظ„ظ‚ط§ظ„ط¨</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ط£ط¯ط®ظ„ ظˆطµظپ ط§ظ„ظ‚ط§ظ„ط¨"
              className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-text">ط§ظ„طµظ„ط§ط­ظٹط§طھ</h4>
          <div className="flex gap-2">
            <button type="button" onClick={allRead} className="text-xs text-text-tertiary hover:text-text px-2 py-1 rounded-lg border border-border transition-colors">
              طھط­ط¯ظٹط¯ ظ‚ط±ط§ط،ط© ظپظ‚ط·
            </button>
            <button type="button" onClick={allFull} className="text-xs text-text-tertiary hover:text-text px-2 py-1 rounded-lg border border-border transition-colors">
              طھط­ط¯ظٹط¯ ظƒط§ظ…ظ„
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {permissionGroups.map((group) => (
            <div key={group.group} className="border border-border rounded-xl p-3">
              <p className="text-xs font-semibold text-text mb-2 pb-2 border-b border-border">{group.group}</p>
              <div className="space-y-1.5">
                {group.permissions.map((perm) => {
                  const level = getLevel(perm.key)
                  return (
                    <div key={perm.key} className="flex items-center justify-between py-1">
                      <span className="text-xs text-text-secondary">{perm.label}</span>
                      <div className="flex gap-0.5">
                        {levels.map((l) => (
                          <button type="button"
                            key={l}
                            onClick={() => setLevel(perm.key, l)}
                            className={cn(
                              "px-1.5 py-0.5 text-[10px] font-medium rounded-md border transition-all",
                              level === l
                                ? levelStyles[l]
                                : "bg-surface border-border text-text-tertiary hover:bg-surface-secondary"
                            )}
                          >
                            {levelLabels[l]}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Button variant="secondary" onClick={onClose}>ط¥ظ„ط؛ط§ط،</Button>
          <Button variant="primary" onClick={handleSave} disabled={!name.trim()}>ط­ظپط¸</Button>
        </div>
      </div>
    </Modal>
  )
}

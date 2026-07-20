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
    group: "ط·آ§ط¸â€‍ط·آ·ط¸â€‍ط·آ§ط·آ¨",
    permissions: [
      { key: "student_add", label: "ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ©" },
      { key: "student_edit", label: "ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍" },
      { key: "student_delete", label: "ط·آ­ط·آ°ط¸ظ¾" },
      { key: "student_view", label: "ط·آ¹ط·آ±ط·آ¶" },
    ],
  },
  {
    group: "ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³ط·آ§ط·ع¾",
    permissions: [
      { key: "course_add", label: "ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ©" },
      { key: "course_edit", label: "ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍" },
      { key: "course_delete", label: "ط·آ­ط·آ°ط¸ظ¾" },
      { key: "course_view", label: "ط·آ¹ط·آ±ط·آ¶" },
    ],
  },
  {
    group: "ط·آ§ط¸â€‍ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€ ط·آ§ط·ع¾",
    permissions: [
      { key: "exam_add", label: "ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ©" },
      { key: "exam_edit", label: "ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍" },
      { key: "exam_delete", label: "ط·آ­ط·آ°ط¸ظ¾" },
      { key: "exam_view", label: "ط·آ¹ط·آ±ط·آ¶" },
      { key: "exam_correct", label: "ط·ع¾ط·آµط·آ­ط¸ظ¹ط·آ­" },
    ],
  },
  {
    group: "ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ§ط·آ±ط¸ظ¹ط·آ±",
    permissions: [
      { key: "report_view", label: "ط·آ¹ط·آ±ط·آ¶" },
      { key: "report_export", label: "ط·ع¾ط·آµط·آ¯ط¸ظ¹ط·آ±" },
    ],
  },
  {
    group: "ط·آ§ط¸â€‍ط·آ´ط·آ¤ط¸ث†ط¸â€  ط·آ§ط¸â€‍ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ط·آ©",
    permissions: [
      { key: "finance_view", label: "ط·آ¹ط·آ±ط·آ¶" },
      { key: "finance_manage", label: "ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ©" },
    ],
  },
  {
    group: "ط·آ§ط¸â€‍ط¸â€¦ط¸ث†ط·آ¸ط¸ظ¾ط¸ظ¹ط¸â€ ",
    permissions: [
      { key: "staff_add", label: "ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ©" },
      { key: "staff_edit", label: "ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍" },
      { key: "staff_delete", label: "ط·آ­ط·آ°ط¸ظ¾" },
    ],
  },
  {
    group: "ط·آ§ط¸â€‍ط·آ¥ط·آ¹ط·آ¯ط·آ§ط·آ¯ط·آ§ط·ع¾",
    permissions: [
      { key: "setting_view", label: "ط·آ¹ط·آ±ط·آ¶" },
      { key: "setting_edit", label: "ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍" },
    ],
  },
  {
    group: "ط·آ§ط¸â€‍ط·آ±ط·آ³ط·آ§ط·آ¦ط¸â€‍",
    permissions: [
      { key: "msg_send", label: "ط·آ¥ط·آ±ط·آ³ط·آ§ط¸â€‍" },
      { key: "msg_read", label: "ط¸â€ڑط·آ±ط·آ§ط·طŒط·آ©" },
    ],
  },
  {
    group: "ط·آ§ط¸â€‍ط·آ­ط·آ¶ط¸ث†ط·آ±",
    permissions: [
      { key: "attendance_record", label: "ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍" },
      { key: "attendance_edit", label: "ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍" },
      { key: "attendance_view", label: "ط·آ¹ط·آ±ط·آ¶" },
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
  read: "ط¸â€ڑط·آ±ط·آ§ط·طŒط·آ© ط¸ظ¾ط¸â€ڑط·آ·",
  write: "ط¸ئ’ط·ع¾ط·آ§ط·آ¨ط·آ©",
  full: "ط¸ئ’ط·آ§ط¸â€¦ط¸â€‍",
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
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍ ط¸â€ڑط·آ§ط¸â€‍ط·آ¨ ط·آ§ط¸â€‍ط·آµط¸â€‍ط·آ§ط·آ­ط¸ظ¹ط·آ§ط·ع¾" : "ط·آ¥ط¸â€ ط·آ´ط·آ§ط·طŒ ط¸â€ڑط·آ§ط¸â€‍ط·آ¨ ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯"} subtitle={initialData ? "ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍ ط·آµط¸â€‍ط·آ§ط·آ­ط¸ظ¹ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط¸â€ڑط·آ§ط¸â€‍ط·آ¨" : "ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط¸â€ڑط·آ§ط¸â€‍ط·آ¨ ط·آµط¸â€‍ط·آ§ط·آ­ط¸ظ¹ط·آ§ط·ع¾ ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯"} size="xl">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط¸â€ڑط·آ§ط¸â€‍ط·آ¨</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ط·آ£ط·آ¯ط·آ®ط¸â€‍ ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط¸â€ڑط·آ§ط¸â€‍ط·آ¨"
              className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">ط¸ث†ط·آµط¸ظ¾ ط·آ§ط¸â€‍ط¸â€ڑط·آ§ط¸â€‍ط·آ¨</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ط·آ£ط·آ¯ط·آ®ط¸â€‍ ط¸ث†ط·آµط¸ظ¾ ط·آ§ط¸â€‍ط¸â€ڑط·آ§ط¸â€‍ط·آ¨"
              className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-text">ط·آ§ط¸â€‍ط·آµط¸â€‍ط·آ§ط·آ­ط¸ظ¹ط·آ§ط·ع¾</h4>
          <div className="flex gap-2">
            <button type="button" onClick={allRead} className="text-xs text-text-tertiary hover:text-text px-2 py-1 rounded-lg border border-border transition-colors">
              ط·ع¾ط·آ­ط·آ¯ط¸ظ¹ط·آ¯ ط¸â€ڑط·آ±ط·آ§ط·طŒط·آ© ط¸ظ¾ط¸â€ڑط·آ·
            </button>
            <button type="button" onClick={allFull} className="text-xs text-text-tertiary hover:text-text px-2 py-1 rounded-lg border border-border transition-colors">
              ط·ع¾ط·آ­ط·آ¯ط¸ظ¹ط·آ¯ ط¸ئ’ط·آ§ط¸â€¦ط¸â€‍
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
          <Button variant="secondary" onClick={onClose}>ط·آ¥ط¸â€‍ط·ط›ط·آ§ط·طŒ</Button>
          <Button variant="primary" onClick={handleSave} disabled={!name.trim()}>ط·آ­ط¸ظ¾ط·آ¸</Button>
        </div>
      </div>
    </Modal>
  )
}

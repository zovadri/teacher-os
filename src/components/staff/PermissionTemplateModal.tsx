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
    group: "الطلاب",
    permissions: [
      { key: "student_add", label: "إضافة" },
      { key: "student_edit", label: "تعديل" },
      { key: "student_delete", label: "حذف" },
      { key: "student_view", label: "عرض" },
    ],
  },
  {
    group: "الكورسات",
    permissions: [
      { key: "course_add", label: "إضافة" },
      { key: "course_edit", label: "تعديل" },
      { key: "course_delete", label: "حذف" },
      { key: "course_view", label: "عرض" },
    ],
  },
  {
    group: "الامتحانات",
    permissions: [
      { key: "exam_add", label: "إضافة" },
      { key: "exam_edit", label: "تعديل" },
      { key: "exam_delete", label: "حذف" },
      { key: "exam_view", label: "عرض" },
      { key: "exam_correct", label: "تصحيح" },
    ],
  },
  {
    group: "التقارير",
    permissions: [
      { key: "report_view", label: "عرض" },
      { key: "report_export", label: "تصدير" },
    ],
  },
  {
    group: "الشؤون المالية",
    permissions: [
      { key: "finance_view", label: "عرض" },
      { key: "finance_manage", label: "إدارة" },
    ],
  },
  {
    group: "الموظفين",
    permissions: [
      { key: "staff_add", label: "إضافة" },
      { key: "staff_edit", label: "تعديل" },
      { key: "staff_delete", label: "حذف" },
    ],
  },
  {
    group: "الإعدادات",
    permissions: [
      { key: "setting_view", label: "عرض" },
      { key: "setting_edit", label: "تعديل" },
    ],
  },
  {
    group: "الرسائل",
    permissions: [
      { key: "msg_send", label: "إرسال" },
      { key: "msg_read", label: "قراءة" },
    ],
  },
  {
    group: "الحضور",
    permissions: [
      { key: "attendance_record", label: "تسجيل" },
      { key: "attendance_edit", label: "تعديل" },
      { key: "attendance_view", label: "عرض" },
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
  read: "قراءة فقط",
  write: "كتابة",
  full: "كامل",
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
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "تعديل قالب الصلاحيات" : "إنشاء قالب جديد"} subtitle={initialData ? "تعديل صلاحيات القالب" : "إضافة قالب صلاحيات جديد"} size="xl">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">اسم القالب</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسم القالب"
              className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">وصف القالب</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="أدخل وصف القالب"
              className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-text">الصلاحيات</h4>
          <div className="flex gap-2">
            <button type="button" onClick={allRead} className="text-xs text-text-tertiary hover:text-text px-2 py-1 rounded-lg border border-border transition-colors">
              تحديد قراءة فقط
            </button>
            <button type="button" onClick={allFull} className="text-xs text-text-tertiary hover:text-text px-2 py-1 rounded-lg border border-border transition-colors">
              تحديد كامل
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
          <Button variant="secondary" onClick={onClose}>إلغاء</Button>
          <Button variant="primary" onClick={handleSave} disabled={!name.trim()}>حفظ</Button>
        </div>
      </div>
    </Modal>
  )
}

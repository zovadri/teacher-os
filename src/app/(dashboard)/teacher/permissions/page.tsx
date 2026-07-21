"use client"

import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineShieldCheck, HiOutlinePlus, HiOutlineAdjustments,
  HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineUserGroup,
  HiOutlineCheck, HiOutlineX,
} from "react-icons/hi"
import toast from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Modal } from "@/components/ui/Modal"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { CardSkeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { cn } from "@/lib/utils"
import { mockPermissionRoles } from "@/lib/mock/data"

const actions = ["canView", "canCreate", "canEdit", "canDelete", "canPrint", "canExport", "canApprove", "canManage"] as const
const actionLabels: Record<string, string> = {
  canView: "عرض", canCreate: "إنشاء", canEdit: "تعديل", canDelete: "حذف",
  canPrint: "طباعة", canExport: "تصدير", canApprove: "اعتماد", canManage: "إدارة",
}

export default function PermissionsPage() {
  const [roles, setRoles] = useState(mockPermissionRoles)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editRole, setEditRole] = useState<{ role: (typeof mockPermissionRoles)[0]; moduleKey: string } | null>(null)
  const [newRole, setNewRole] = useState({ name: "", description: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const loadData = useCallback(() => {
    setIsLoading(true)
    setHasError(false)
    setTimeout(() => {
      setRoles(mockPermissionRoles)
      setIsLoading(false)
    }, 1000)
  }, [])

  const allModules = useMemo(() => {
    if (roles.length === 0) return []
    return Object.keys(roles[0].permissions)
  }, [roles])

  const handleTogglePermission = (roleId: string, moduleKey: string, action: string) => {
    setRoles((prev) => prev.map((r) => {
      if (r.id !== roleId) return r
      return {
        ...r,
        permissions: {
          ...r.permissions,
          [moduleKey]: {
            ...r.permissions[moduleKey],
            [action]: !r.permissions[moduleKey][action as keyof typeof r.permissions[typeof moduleKey]],
          },
        },
      }
    }))
    toast.success("طھظ… تحديث الصلاحية")
  }

  const handleAddRole = () => {
    const modules = roles[0]?.permissions || {}
    const defaultPerms = Object.keys(modules).reduce((acc, key) => ({
      ...acc,
      [key]: { module: key, label: modules[key].label, canView: false, canCreate: false, canEdit: false, canDelete: false, canPrint: false, canExport: false, canApprove: false, canManage: false },
    }), {} as Record<string, any>)
    const role = {
      id: `role-${Date.now()}`,
      name: newRole.name,
      description: newRole.description,
      isSystem: false,
      userCount: 0,
      permissions: defaultPerms,
    }
    setRoles((prev) => [...prev, role])
    setShowAddModal(false)
    setNewRole({ name: "", description: "" })
    toast.success("طھظ… إضافة الدور بنجاح")
  }

  if (hasError) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <DashboardHeader title="الصلاحيات" subtitle="إدارة أدوار الصلاحيات" />
        <ErrorState onRetry={() => { setHasError(false); loadData() }} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <DashboardHeader title="الصلاحيات" subtitle="إدارة أدوار الصلاحيات" />
      <div className="flex justify-end">
        <Button variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
          إضافة دور
        </Button>
      </div>

      {isLoading ? (
        <CardSkeleton count={3} />
      ) : roles.length === 0 ? (
        <EmptyState icon={HiOutlineShieldCheck} title="لا توجد أدوار" description="لم ظٹطھظ… إضافة ط£ظٹ أدوار صلاحيات بعد" action={<Button variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>إضافة دور</Button>} />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {roles.map((role) => (
            <Card key={role.id} className="p-0">
              <div className="p-5 cursor-pointer" onClick={() => setExpandedId(expandedId === role.id ? null : role.id)}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", role.isSystem ? "bg-primary-100 text-primary" : "bg-surface-secondary text-text-tertiary")}>
                      <HiOutlineShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text">{role.name}</h3>
                      <p className="text-sm text-text-secondary">{role.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={role.isSystem ? "premium" : "neutral"} size="sm">{role.isSystem ? "نظام" : "مخصص"}</Badge>
                    <div className="flex items-center gap-1 text-sm text-text-tertiary">
                      <HiOutlineUserGroup className="w-4 h-4" />
                      <span>{role.userCount}</span>
                    </div>
                    {expandedId === role.id ? <HiOutlineChevronUp className="w-5 h-5 text-text-tertiary" /> : <HiOutlineChevronDown className="w-5 h-5 text-text-tertiary" />}
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {expandedId === role.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-border">
                    <div className="p-5 overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr>
                            <th className="text-right px-3 py-2 font-semibold text-text-secondary border-b border-border whitespace-nowrap">الوحدة</th>
                            {actions.map((action) => (
                              <th key={action} className="text-center px-2 py-2 font-semibold text-text-secondary border-b border-border whitespace-nowrap text-xs">{actionLabels[action]}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {allModules.map((modKey) => {
                            const mod = role.permissions[modKey]
                            if (!mod) return null
                            return (
                              <tr key={modKey} className="border-b border-border last:border-0 hover:bg-surface-secondary transition-colors">
                                <td className="px-3 py-2.5 text-text font-medium whitespace-nowrap">{mod.label}</td>
                                {actions.map((action) => (
                                  <td key={action} className="text-center px-2 py-2.5">
                                    <button type="button"
                                      disabled={role.isSystem}
                                      onClick={() => handleTogglePermission(role.id, modKey, action)}
                                      className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center transition-all mx-auto",
                                        mod[action]
                                          ? "bg-success-100 text-success hover:bg-success-200"
                                          : "bg-surface-secondary text-text-tertiary hover:bg-surface-tertiary",
                                        role.isSystem && "opacity-70 cursor-not-allowed"
                                      )}
                                    >
                                      {mod[action] ? <HiOutlineCheck className="w-4 h-4" /> : <HiOutlineX className="w-4 h-4" />}
                                    </button>
                                  </td>
                                ))}
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          ))}
        </div>
      )}

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="إضافة دور جديد" size="md">
        <div className="space-y-4">
          <Input label="اسم الدور" value={newRole.name} onChange={(e) => setNewRole({ ...newRole, name: e.target.value })} placeholder="أدخل اسم الدور" />
          <Input label="الوصف" value={newRole.description} onChange={(e) => setNewRole({ ...newRole, description: e.target.value })} placeholder="وصف الدور" />
          <div className="flex gap-3 pt-2">
            <Button variant="primary" className="flex-1" onClick={handleAddRole} disabled={!newRole.name}>إضافة الدور</Button>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>إلغاء</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

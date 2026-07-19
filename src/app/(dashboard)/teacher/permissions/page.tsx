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
  canView: "ط¹ط±ط¶", canCreate: "ط¥ظ†ط´ط§ط،", canEdit: "طھط¹ط¯ظٹظ„", canDelete: "ط­ط°ظپ",
  canPrint: "ط·ط¨ط§ط¹ط©", canExport: "طھطµط¯ظٹط±", canApprove: "ط§ط¹طھظ…ط§ط¯", canManage: "ط¥ط¯ط§ط±ط©",
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
    toast.success("طھظ… طھط­ط¯ظٹط« ط§ظ„طµظ„ط§ط­ظٹط©")
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
    toast.success("طھظ… ط¥ط¶ط§ظپط© ط§ظ„ط¯ظˆط± ط¨ظ†ط¬ط§ط­")
  }

  if (hasError) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <DashboardHeader title="ط§ظ„طµظ„ط§ط­ظٹط§طھ" subtitle="ط¥ط¯ط§ط±ط© ط£ط¯ظˆط§ط± ط§ظ„طµظ„ط§ط­ظٹط§طھ" />
        <ErrorState onRetry={() => { setHasError(false); loadData() }} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <DashboardHeader title="ط§ظ„طµظ„ط§ط­ظٹط§طھ" subtitle="ط¥ط¯ط§ط±ط© ط£ط¯ظˆط§ط± ط§ظ„طµظ„ط§ط­ظٹط§طھ" />
      <div className="flex justify-end">
        <button type="button" variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
          ط¥ط¶ط§ظپط© ط¯ظˆط±
        </Button>
      </div>

      {isLoading ? (
        <CardSkeleton count={3} />
      ) : roles.length === 0 ? (
        <EmptyState icon={HiOutlineShieldCheck} title="ظ„ط§ طھظˆط¬ط¯ ط£ط¯ظˆط§ط±" description="ظ„ظ… ظٹطھظ… ط¥ط¶ط§ظپط© ط£ظٹ ط£ط¯ظˆط§ط± طµظ„ط§ط­ظٹط§طھ ط¨ط¹ط¯" action={<button type="button" variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>ط¥ط¶ط§ظپط© ط¯ظˆط±</Button>} />
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
                    <Badge variant={role.isSystem ? "premium" : "neutral"} size="sm">{role.isSystem ? "ظ†ط¸ط§ظ…" : "ظ…ط®طµطµ"}</Badge>
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
                            <th className="text-right px-3 py-2 font-semibold text-text-secondary border-b border-border whitespace-nowrap">ط§ظ„ظˆط­ط¯ط©</th>
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

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="ط¥ط¶ط§ظپط© ط¯ظˆط± ط¬ط¯ظٹط¯" size="md">
        <div className="space-y-4">
          <Input label="ط§ط³ظ… ط§ظ„ط¯ظˆط±" value={newRole.name} onChange={(e) => setNewRole({ ...newRole, name: e.target.value })} placeholder="ط£ط¯ط®ظ„ ط§ط³ظ… ط§ظ„ط¯ظˆط±" />
          <Input label="ط§ظ„ظˆطµظپ" value={newRole.description} onChange={(e) => setNewRole({ ...newRole, description: e.target.value })} placeholder="ظˆطµظپ ط§ظ„ط¯ظˆط±" />
          <div className="flex gap-3 pt-2">
            <button type="button" variant="primary" className="flex-1" onClick={handleAddRole} disabled={!newRole.name}>ط¥ط¶ط§ظپط© ط§ظ„ط¯ظˆط±</Button>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>ط¥ظ„ط؛ط§ط،</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

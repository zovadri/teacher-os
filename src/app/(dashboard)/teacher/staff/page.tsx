"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"
import Link from "next/link"
import {
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineKey,
  HiOutlineClock,
  HiOutlineUsers,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineTemplate,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlinePlus,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Badge } from "@/components/ui/Badge"
import { Table } from "@/components/ui/Table"
import { Tabs, TabPanel } from "@/components/ui/Tabs"
import { StatsCard } from "@/components/ui/StatsCard"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card"
import { Alert } from "@/components/ui/Alert"
import Button from "@/components/ui/Button"
import { ConfirmDialog } from "@/components/ui/ConfirmDialog"
import PermissionTemplateModal, { type TemplateData } from "@/components/staff/PermissionTemplateModal"
import { mockStaffMembers, mockStaffPermissions, mockAuditLogs, mockPermissions } from "@/lib/mock/data"
import { formatRelativeTime } from "@/lib/utils"

const severityBadge: Record<string, "info" | "warning" | "error"> = {
  info: "info",
  warning: "warning",
  error: "error",
}

const actionLabels: Record<string, string> = {
  create: "ط¥ظ†ط´ط§ط،",
  update: "طھط­ط¯ظٹط«",
  delete: "ط­ط°ظپ",
  login: "طھط³ط¬ظٹظ„ ط¯ط®ظˆظ„",
  logout: "طھط³ط¬ظٹظ„ ط®ط±ظˆط¬",
  export: "طھطµط¯ظٹط±",
  approve: "ظ…ظˆط§ظپظ‚ط©",
  reject: "ط±ظپط¶",
}

const resourceLabels: Record<string, string> = {
  user: "ظ…ط³طھط®ط¯ظ…",
  course: "ظƒظˆط±ط³",
  exam: "ط§ظ…طھط­ط§ظ†",
  payment: "ط¯ظپط¹ط©",
  subscription: "ط§ط´طھط±ط§ظƒ",
  certificate: "ط´ظ‡ط§ط¯ط©",
  code: "ظƒظˆط¯",
  setting: "ط¥ط¹ط¯ط§ط¯ط§طھ",
}

interface PermissionTemplate {
  id: string
  name: string
  description: string
  roleBadge: string
  permissionCount: number
  permissions: Record<string, string>
}

const initialTemplates: PermissionTemplate[] = [
  { id: "tmpl-1", name: "ظ…ط¯ظٹط± ظƒط§ظ…ظ„", description: "طµظ„ط§ط­ظٹط© ظƒط§ظ…ظ„ط© ط¹ظ„ظ‰ ط¬ظ…ظٹط¹ ط£ط¬ط²ط§ط، ط§ظ„ظ†ط¸ط§ظ…", roleBadge: "ظ…ط¯ظٹط±", permissionCount: 27, permissions: {} },
  { id: "tmpl-2", name: "ظ…ط´ط±ظپ ط£ظƒط§ط¯ظٹظ…ظٹ", description: "ط¥ط¯ط§ط±ط© ط§ظ„ط·ظ„ط§ط¨ ظˆط§ظ„ظƒظˆط±ط³ط§طھ ظˆط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ", roleBadge: "ظ…ط´ط±ظپ", permissionCount: 18, permissions: {} },
  { id: "tmpl-3", name: "ظ…ط¯ط®ظ„ ط¨ظٹط§ظ†ط§طھ", description: "ط¥ط¯ط®ط§ظ„ ظˆطھط¹ط¯ظٹظ„ ط¨ظٹط§ظ†ط§طھ ط§ظ„ط·ظ„ط§ط¨ ظˆط§ظ„ظƒظˆط±ط³ط§طھ", roleBadge: "ظ…ظˆط¸ظپ", permissionCount: 12, permissions: {} },
  { id: "tmpl-4", name: "ظ…ط´ط±ظپ ظ…ط§ظ„ظٹ", description: "ط¥ط¯ط§ط±ط© ط§ظ„ط´ط¤ظˆظ† ط§ظ„ظ…ط§ظ„ظٹط© ظˆط§ظ„طھظ‚ط§ط±ظٹط±", roleBadge: "ظ…ط­ط§ط³ط¨", permissionCount: 8, permissions: {} },
  { id: "tmpl-5", name: "ط¯ط¹ظ… ظپظ†ظٹ", description: "ط§ظ„طھط¹ط§ظ…ظ„ ظ…ط¹ ط§ظ„ط·ظ„ط§ط¨ ظˆط§ظ„ط¯ط¹ظ… ط§ظ„ظپظ†ظٹ", roleBadge: "ط¯ط¹ظ…", permissionCount: 10, permissions: {} },
]

const roleBadgeColors: Record<string, "primary" | "info" | "warning" | "success" | "neutral"> = {
  ظ…ط¯ظٹط±: "primary",
  ظ…ط´ط±ظپ: "info",
  ظ…ظˆط¸ظپ: "warning",
  ظ…ط­ط§ط³ط¨: "success",
  ط¯ط¹ظ…: "neutral",
}

export default function StaffPage() {
  const [expandedRole, setExpandedRole] = useState<string | null>(null)
  const [templates, setTemplates] = useState<PermissionTemplate[]>(initialTemplates)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<PermissionTemplate | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("staff")

  const tabs = [
    { id: "staff", label: "ط§ظ„ظ…ظˆط¸ظپظٹظ†", icon: <HiOutlineUsers className="w-4 h-4" />, count: mockStaffMembers.length },
    { id: "templates", label: "ظ‚ظˆط§ظ„ط¨ ط§ظ„طµظ„ط§ط­ظٹط§طھ", icon: <HiOutlineTemplate className="w-4 h-4" />, count: templates.length },
    { id: "roles", label: "ط§ظ„طµظ„ط§ط­ظٹط§طھ", icon: <HiOutlineKey className="w-4 h-4" />, count: mockStaffPermissions.length },
    { id: "audit", label: "ط³ط¬ظ„ ط§ظ„ظ†ط´ط§ط·ط§طھ", icon: <HiOutlineClock className="w-4 h-4" />, count: mockAuditLogs.length },
  ]

  const stats = useMemo(() => ({
    total: mockStaffMembers.length,
    active: mockStaffMembers.filter((s) => s.status === "active").length,
    roles: mockStaffPermissions.length,
    systemRoles: mockStaffPermissions.filter((r) => r.isSystem).length,
  }), [])

  const handleSave = (data: TemplateData) => {
    if (editingTemplate) {
      setTemplates((prev) =>
        prev.map((t) =>
          t.id === editingTemplate.id
            ? { ...t, name: data.name, description: data.description, permissionCount: Object.keys(data.permissions).length, permissions: data.permissions }
            : t
        )
      )
      toast.success("تم تحديث القالب بنجاح")
    } else {
      const newTemplate: PermissionTemplate = {
        id: `tmpl-${Date.now()}`,
        name: data.name,
        description: data.description,
        roleBadge: "مستخدم",
        permissionCount: Object.keys(data.permissions).length,
        permissions: data.permissions,
      }
      setTemplates((prev) => [...prev, newTemplate])
      toast.success("تم إنشاء القالب بنجاح")
    }
    setModalOpen(false)
    setEditingTemplate(null)
  }

  const openEdit = (template: PermissionTemplate) => {
    setEditingTemplate(template)
    setModalOpen(true)
  }

  const openCreate = () => {
    setEditingTemplate(null)
    setModalOpen(true)
  }

  const handleDelete = () => {
    if (deleteConfirm) {
      setTemplates((prev) => prev.filter((t) => t.id !== deleteConfirm))
      setDeleteConfirm(null)
      toast.success("تم حذف القالب بنجاح")
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="ط¥ط¯ط§ط±ط© ط§ظ„ظ…ظˆط¸ظپظٹظ† ظˆط§ظ„طµظ„ط§ط­ظٹط§طھ" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظ…ظˆط¸ظپظٹظ†" value={stats.total} icon={HiOutlineUsers} color="primary" />
        <StatsCard title="ط§ظ„ظ…ظˆط¸ظپظٹظ† ط§ظ„ظ†ط´ط·ظٹظ†" value={stats.active} icon={HiOutlineUserGroup} color="success" />
        <StatsCard title="ط£ط¯ظˆط§ط± ط§ظ„طµظ„ط§ط­ظٹط§طھ" value={stats.roles} icon={HiOutlineShieldCheck} color="info" />
        <StatsCard title="ظ‚ظˆط§ظ„ط¨ ط§ظ„طµظ„ط§ط­ظٹط§طھ" value={templates.length} icon={HiOutlineTemplate} color="warning" />
      </div>

      <Tabs tabs={tabs} defaultTab="staff" onChange={setActiveTab}>
        {(active) => (
          <>
            <TabPanel id="staff" activeTab={active}>
              <Table
                columns={[
                  { key: "name", header: "ط§ظ„ظ…ظˆط¸ظپ", render: (s) => (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 overflow-hidden shrink-0">
                        <img src={s.avatar} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-text truncate">{s.name}</p>
                        <p className="text-xs text-text-tertiary truncate" dir="ltr">{s.email}</p>
                      </div>
                    </div>
                  )},
                  { key: "jobTitle", header: "ط§ظ„ظ…ط³ظ…ظ‰ ط§ظ„ظˆط¸ظٹظپظٹ" },
                  { key: "role", header: "ط§ظ„ط¯ظˆط±" },
                  { key: "permissions", header: "ط§ظ„طµظ„ط§ط­ظٹط§طھ", render: (s) => (
                    <div className="flex flex-wrap gap-1">
                      {s.permissions.slice(0, 2).map((p: string) => {
                        const perm = mockPermissions.find((mp) => mp.key === p)
                        return <Badge key={p} variant="neutral" size="sm">{perm?.label || p}</Badge>
                      })}
                      {s.permissions.length > 2 && (
                        <Badge variant="primary" size="sm">+{s.permissions.length - 2}</Badge>
                      )}
                    </div>
                  )},
                  { key: "status", header: "ط§ظ„ط­ط§ظ„ط©", render: (s) => (
                    <Badge variant={s.status === "active" ? "success" : "warning"}>
                      {s.status === "active" ? "ظ†ط´ط·" : "ط؛ظٹط± ظ†ط´ط·"}
                    </Badge>
                  )},
                ]}
                data={mockStaffMembers}
              />
            </TabPanel>

            <TabPanel id="templates" activeTab={active}>
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-text-secondary">ظ‚ظˆط§ظ„ط¨ طµظ„ط§ط­ظٹط§طھ ظ…ط³ط¨ظ‚ط© ط§ظ„ط¥ط¹ط¯ط§ط¯ ظ„ظ„ط§ط³طھط®ط¯ط§ظ… ط§ظ„ط³ط±ظٹط¹</p>
                <button type="button" variant="primary" size="sm" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={openCreate}>
                  ط¥ظ†ط´ط§ط، ظ‚ط§ظ„ط¨ ط¬ط¯ظٹط¯
                </Button>
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {templates.map((template) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    layout
                  >
                    <Card className="h-full flex flex-col">
                      <CardHeader>
                        <div>
                          <CardTitle>{template.name}</CardTitle>
                          <CardDescription>{template.description}</CardDescription>
                        </div>
                        <Badge variant={roleBadgeColors[template.roleBadge] || "neutral"} size="sm">
                          {template.roleBadge}
                        </Badge>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="primary" size="sm">{template.permissionCount} طµظ„ط§ط­ظٹط©</Badge>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <button type="button" variant="ghost" size="sm" leftIcon={<HiOutlinePencil className="w-4 h-4" />} onClick={() => openEdit(template)}>
                          طھط¹ط¯ظٹظ„
                        </Button>
                        <button type="button" variant="ghost" size="sm" leftIcon={<HiOutlineTrash className="w-4 h-4" />} className="text-error hover:text-error" onClick={() => setDeleteConfirm(template.id)}>
                          ط­ط°ظپ
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabPanel>

            <TabPanel id="roles" activeTab={active}>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {mockStaffPermissions.map((role) => (
                  <Card key={role.id} className="relative overflow-hidden">
                    {role.isSystem && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50" />
                    )}
                    <CardHeader>
                      <div>
                        <CardTitle>{role.name}</CardTitle>
                        <CardDescription>{role.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="primary" size="sm">{role.permissions.length} طµظ„ط§ط­ظٹط©</Badge>
                        <Badge variant={role.userCount > 0 ? "info" : "neutral"} size="sm">
                          {role.userCount} ظ…ط³طھط®ط¯ظ…
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {role.isSystem && (
                        <Alert variant="info" className="mb-3">
                          ط¯ظˆط± ظ†ط¸ط§ظ…ظٹ ظ„ط§ ظٹظ…ظƒظ† طھط¹ط¯ظٹظ„ظ‡
                        </Alert>
                      )}
                      <button type="button"
                        onClick={() => setExpandedRole(expandedRole === role.id ? null : role.id)}
                        className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors"
                      >
                        {expandedRole === role.id ? "ط¥ط®ظپط§ط، ط§ظ„طµظ„ط§ط­ظٹط§طھ" : "ط¹ط±ط¶ ط§ظ„طµظ„ط§ط­ظٹط§طھ"}
                        {expandedRole === role.id ? <HiOutlineChevronUp className="w-4 h-4" /> : <HiOutlineChevronDown className="w-4 h-4" />}
                      </button>
                      <AnimatePresence>
                        {expandedRole === role.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mt-3"
                          >
                            <div className="flex flex-wrap gap-1.5">
                              {role.permissions.map((permKey) => {
                                const perm = mockPermissions.find((p) => p.key === permKey)
                                return (
                                  <Badge key={permKey} variant="neutral" size="sm">
                                    {perm?.label || permKey}
                                  </Badge>
                                )
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabPanel>

            <TabPanel id="audit" activeTab={active}>
              <Table
                columns={[
                  { key: "userName", header: "ط§ظ„ظ…ط³طھط®ط¯ظ…" },
                  { key: "action", header: "ط§ظ„ط¥ط¬ط±ط§ط،", render: (a) => (
                    <Badge variant={a.action === "delete" || a.action === "reject" ? "error" : a.action === "create" || a.action === "approve" ? "success" : "info"}>
                      {actionLabels[a.action] || a.action}
                    </Badge>
                  )},
                  { key: "resource", header: "ط§ظ„ظ…ظˆط§ط±ط¯", render: (a) => (
                    <span className="text-sm text-text-secondary">{resourceLabels[a.resource] || a.resource}</span>
                  )},
                  { key: "details", header: "ط§ظ„طھظپط§طµظٹظ„" },
                  { key: "timestamp", header: "ط§ظ„طھط§ط±ظٹط®", render: (a) => (
                    <span className="text-sm text-text-tertiary">{formatRelativeTime(a.timestamp)}</span>
                  )},
                  { key: "severity", header: "ط§ظ„ط£ظ‡ظ…ظٹط©", render: (a) => (
                    <Badge variant={severityBadge[a.severity]} size="sm" dot>
                      {a.severity === "info" ? "ظ…ط¹ظ„ظˆظ…ط§طھ" : a.severity === "warning" ? "طھط­ط°ظٹط±" : "ط®ط·ط£"}
                    </Badge>
                  )},
                ]}
                data={mockAuditLogs}
              />
            </TabPanel>
          </>
        )}
      </Tabs>

      <PermissionTemplateModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingTemplate(null) }}
        onSave={handleSave}
        initialData={editingTemplate ? { name: editingTemplate.name, description: editingTemplate.description, permissions: {} } : undefined}
      />

      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleDelete}
        title="ط­ط°ظپ ظ‚ط§ظ„ط¨ ط§ظ„طµظ„ط§ط­ظٹط§طھ"
        message="ظ‡ظ„ ط£ظ†طھ ظ…طھط£ظƒط¯ ظ…ظ† ط­ط°ظپ ظ‚ط§ظ„ط¨ ط§ظ„طµظ„ط§ط­ظٹط§طھطں ظ‡ط°ط§ ط§ظ„ط¥ط¬ط±ط§ط، ظ„ط§ ظٹظ…ظƒظ† ط§ظ„طھط±ط§ط¬ط¹ ط¹ظ†ظ‡."
        confirmText="ط­ط°ظپ"
        cancelText="ط¥ظ„ط؛ط§ط،"
        variant="danger"
      />
    </div>
  )
}

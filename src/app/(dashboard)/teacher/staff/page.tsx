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
  create: "ط·آ¥ط¸â€ ط·آ´ط·آ§ط·طŒ",
  update: "ط·ع¾ط·آ­ط·آ¯ط¸ظ¹ط·آ«",
  delete: "ط·آ­ط·آ°ط¸ظ¾",
  login: "ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ ط·آ¯ط·آ®ط¸ث†ط¸â€‍",
  logout: "ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ ط·آ®ط·آ±ط¸ث†ط·آ¬",
  export: "ط·ع¾ط·آµط·آ¯ط¸ظ¹ط·آ±",
  approve: "ط¸â€¦ط¸ث†ط·آ§ط¸ظ¾ط¸â€ڑط·آ©",
  reject: "ط·آ±ط¸ظ¾ط·آ¶",
}

const resourceLabels: Record<string, string> = {
  user: "ط¸â€¦ط·آ³ط·ع¾ط·آ®ط·آ¯ط¸â€¦",
  course: "ط¸ئ’ط¸ث†ط·آ±ط·آ³",
  exam: "ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€ ",
  payment: "ط·آ¯ط¸ظ¾ط·آ¹ط·آ©",
  subscription: "ط·آ§ط·آ´ط·ع¾ط·آ±ط·آ§ط¸ئ’",
  certificate: "ط·آ´ط¸â€،ط·آ§ط·آ¯ط·آ©",
  code: "ط¸ئ’ط¸ث†ط·آ¯",
  setting: "ط·آ¥ط·آ¹ط·آ¯ط·آ§ط·آ¯ط·آ§ط·ع¾",
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
  { id: "tmpl-1", name: "ط¸â€¦ط·آ¯ط¸ظ¹ط·آ± ط¸ئ’ط·آ§ط¸â€¦ط¸â€‍", description: "ط·آµط¸â€‍ط·آ§ط·آ­ط¸ظ¹ط·آ© ط¸ئ’ط·آ§ط¸â€¦ط¸â€‍ط·آ© ط·آ¹ط¸â€‍ط¸â€° ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¹ ط·آ£ط·آ¬ط·آ²ط·آ§ط·طŒ ط·آ§ط¸â€‍ط¸â€ ط·آ¸ط·آ§ط¸â€¦", roleBadge: "ط¸â€¦ط·آ¯ط¸ظ¹ط·آ±", permissionCount: 27, permissions: {} },
  { id: "tmpl-2", name: "ط¸â€¦ط·آ´ط·آ±ط¸ظ¾ ط·آ£ط¸ئ’ط·آ§ط·آ¯ط¸ظ¹ط¸â€¦ط¸ظ¹", description: "ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط·آ§ط¸â€‍ط·آ·ط¸â€‍ط·آ§ط·آ¨ ط¸ث†ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³ط·آ§ط·ع¾ ط¸ث†ط·آ§ط¸â€‍ط·آ§ط¸â€¦ط·ع¾ط·آ­ط·آ§ط¸â€ ط·آ§ط·ع¾", roleBadge: "ط¸â€¦ط·آ´ط·آ±ط¸ظ¾", permissionCount: 18, permissions: {} },
  { id: "tmpl-3", name: "ط¸â€¦ط·آ¯ط·آ®ط¸â€‍ ط·آ¨ط¸ظ¹ط·آ§ط¸â€ ط·آ§ط·ع¾", description: "ط·آ¥ط·آ¯ط·آ®ط·آ§ط¸â€‍ ط¸ث†ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍ ط·آ¨ط¸ظ¹ط·آ§ط¸â€ ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·آ·ط¸â€‍ط·آ§ط·آ¨ ط¸ث†ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³ط·آ§ط·ع¾", roleBadge: "ط¸â€¦ط¸ث†ط·آ¸ط¸ظ¾", permissionCount: 12, permissions: {} },
  { id: "tmpl-4", name: "ط¸â€¦ط·آ´ط·آ±ط¸ظ¾ ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹", description: "ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط·آ§ط¸â€‍ط·آ´ط·آ¤ط¸ث†ط¸â€  ط·آ§ط¸â€‍ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ط·آ© ط¸ث†ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ§ط·آ±ط¸ظ¹ط·آ±", roleBadge: "ط¸â€¦ط·آ­ط·آ§ط·آ³ط·آ¨", permissionCount: 8, permissions: {} },
  { id: "tmpl-5", name: "ط·آ¯ط·آ¹ط¸â€¦ ط¸ظ¾ط¸â€ ط¸ظ¹", description: "ط·آ§ط¸â€‍ط·ع¾ط·آ¹ط·آ§ط¸â€¦ط¸â€‍ ط¸â€¦ط·آ¹ ط·آ§ط¸â€‍ط·آ·ط¸â€‍ط·آ§ط·آ¨ ط¸ث†ط·آ§ط¸â€‍ط·آ¯ط·آ¹ط¸â€¦ ط·آ§ط¸â€‍ط¸ظ¾ط¸â€ ط¸ظ¹", roleBadge: "ط·آ¯ط·آ¹ط¸â€¦", permissionCount: 10, permissions: {} },
]

const roleBadgeColors: Record<string, "primary" | "info" | "warning" | "success" | "neutral"> = {
  "ط¸â€¦ط·آ¯ط¸ظ¹ط·آ±": "primary",
  "ط¸â€¦ط·آ´ط·آ±ط¸ظ¾": "info",
  "ط¸â€¦ط¸ث†ط·آ¸ط¸ظ¾": "warning",
  "ط¸â€¦ط·آ­ط·آ§ط·آ³ط·آ¨": "success",
  "ط·آ¯ط·آ¹ط¸â€¦": "neutral",
}

export default function StaffPage() {
  const [expandedRole, setExpandedRole] = useState<string | null>(null)
  const [templates, setTemplates] = useState<PermissionTemplate[]>(initialTemplates)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<PermissionTemplate | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("staff")

  const tabs = [
    { id: "staff", label: "ط·آ§ط¸â€‍ط¸â€¦ط¸ث†ط·آ¸ط¸ظ¾ط¸ظ¹ط¸â€ ", icon: <HiOutlineUsers className="w-4 h-4" />, count: mockStaffMembers.length },
    { id: "templates", label: "ط¸â€ڑط¸ث†ط·آ§ط¸â€‍ط·آ¨ ط·آ§ط¸â€‍ط·آµط¸â€‍ط·آ§ط·آ­ط¸ظ¹ط·آ§ط·ع¾", icon: <HiOutlineTemplate className="w-4 h-4" />, count: templates.length },
    { id: "roles", label: "ط·آ§ط¸â€‍ط·آµط¸â€‍ط·آ§ط·آ­ط¸ظ¹ط·آ§ط·ع¾", icon: <HiOutlineKey className="w-4 h-4" />, count: mockStaffPermissions.length },
    { id: "audit", label: "ط·آ³ط·آ¬ط¸â€‍ ط·آ§ط¸â€‍ط¸â€ ط·آ´ط·آ§ط·آ·ط·آ§ط·ع¾", icon: <HiOutlineClock className="w-4 h-4" />, count: mockAuditLogs.length },
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
      toast.success("طھظ… طھط­ط¯ظٹط« ط§ظ„ظ‚ط§ظ„ط¨ ط¨ظ†ط¬ط§ط­")
    } else {
      const newTemplate: PermissionTemplate = {
        id: `tmpl-${Date.now()}`,
        name: data.name,
        description: data.description,
        roleBadge: "ظ…ط³طھط®ط¯ظ…",
        permissionCount: Object.keys(data.permissions).length,
        permissions: data.permissions,
      }
      setTemplates((prev) => [...prev, newTemplate])
      toast.success("طھظ… ط¥ظ†ط´ط§ط، ط§ظ„ظ‚ط§ظ„ط¨ ط¨ظ†ط¬ط§ط­")
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
      toast.success("طھظ… ط­ط°ظپ ط§ظ„ظ‚ط§ظ„ط¨ ط¨ظ†ط¬ط§ط­")
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط·آ§ط¸â€‍ط¸â€¦ط¸ث†ط·آ¸ط¸ظ¾ط¸ظ¹ط¸â€  ط¸ث†ط·آ§ط¸â€‍ط·آµط¸â€‍ط·آ§ط·آ­ط¸ظ¹ط·آ§ط·ع¾" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ ط·آ§ط¸â€‍ط¸â€¦ط¸ث†ط·آ¸ط¸ظ¾ط¸ظ¹ط¸â€ " value={stats.total} icon={HiOutlineUsers} color="primary" />
        <StatsCard title="ط·آ§ط¸â€‍ط¸â€¦ط¸ث†ط·آ¸ط¸ظ¾ط¸ظ¹ط¸â€  ط·آ§ط¸â€‍ط¸â€ ط·آ´ط·آ·ط¸ظ¹ط¸â€ " value={stats.active} icon={HiOutlineUserGroup} color="success" />
        <StatsCard title="ط·آ£ط·آ¯ط¸ث†ط·آ§ط·آ± ط·آ§ط¸â€‍ط·آµط¸â€‍ط·آ§ط·آ­ط¸ظ¹ط·آ§ط·ع¾" value={stats.roles} icon={HiOutlineShieldCheck} color="info" />
        <StatsCard title="ط¸â€ڑط¸ث†ط·آ§ط¸â€‍ط·آ¨ ط·آ§ط¸â€‍ط·آµط¸â€‍ط·آ§ط·آ­ط¸ظ¹ط·آ§ط·ع¾" value={templates.length} icon={HiOutlineTemplate} color="warning" />
      </div>

      <Tabs tabs={tabs} defaultTab="staff" onChange={setActiveTab}>
        {(active) => (
          <>
            <TabPanel id="staff" activeTab={active}>
              <Table
                columns={[
                  { key: "name", header: "ط·آ§ط¸â€‍ط¸â€¦ط¸ث†ط·آ¸ط¸ظ¾", render: (s) => (
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
                  { key: "jobTitle", header: "ط·آ§ط¸â€‍ط¸â€¦ط·آ³ط¸â€¦ط¸â€° ط·آ§ط¸â€‍ط¸ث†ط·آ¸ط¸ظ¹ط¸ظ¾ط¸ظ¹" },
                  { key: "role", header: "ط·آ§ط¸â€‍ط·آ¯ط¸ث†ط·آ±" },
                  { key: "permissions", header: "ط·آ§ط¸â€‍ط·آµط¸â€‍ط·آ§ط·آ­ط¸ظ¹ط·آ§ط·ع¾", render: (s) => (
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
                  { key: "status", header: "ط·آ§ط¸â€‍ط·آ­ط·آ§ط¸â€‍ط·آ©", render: (s) => (
                    <Badge variant={s.status === "active" ? "success" : "warning"}>
                      {s.status === "active" ? "ط¸â€ ط·آ´ط·آ·" : "ط·ط›ط¸ظ¹ط·آ± ط¸â€ ط·آ´ط·آ·"}
                    </Badge>
                  )},
                ]}
                data={mockStaffMembers}
              />
            </TabPanel>

            <TabPanel id="templates" activeTab={active}>
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-text-secondary">ط¸â€ڑط¸ث†ط·آ§ط¸â€‍ط·آ¨ ط·آµط¸â€‍ط·آ§ط·آ­ط¸ظ¹ط·آ§ط·ع¾ ط¸â€¦ط·آ³ط·آ¨ط¸â€ڑط·آ© ط·آ§ط¸â€‍ط·آ¥ط·آ¹ط·آ¯ط·آ§ط·آ¯ ط¸â€‍ط¸â€‍ط·آ§ط·آ³ط·ع¾ط·آ®ط·آ¯ط·آ§ط¸â€¦ ط·آ§ط¸â€‍ط·آ³ط·آ±ط¸ظ¹ط·آ¹</p>
                <Button variant="primary" size="sm" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={openCreate}>
                  ط·آ¥ط¸â€ ط·آ´ط·آ§ط·طŒ ط¸â€ڑط·آ§ط¸â€‍ط·آ¨ ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯
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
                          <Badge variant="primary" size="sm">{template.permissionCount} ط·آµط¸â€‍ط·آ§ط·آ­ط¸ظ¹ط·آ©</Badge>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" size="sm" leftIcon={<HiOutlinePencil className="w-4 h-4" />} onClick={() => openEdit(template)}>
                          ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍
                        </Button>
                        <Button variant="ghost" size="sm" leftIcon={<HiOutlineTrash className="w-4 h-4" />} className="text-error hover:text-error" onClick={() => setDeleteConfirm(template.id)}>
                          ط·آ­ط·آ°ط¸ظ¾
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
                        <Badge variant="primary" size="sm">{role.permissions.length} ط·آµط¸â€‍ط·آ§ط·آ­ط¸ظ¹ط·آ©</Badge>
                        <Badge variant={role.userCount > 0 ? "info" : "neutral"} size="sm">
                          {role.userCount} ط¸â€¦ط·آ³ط·ع¾ط·آ®ط·آ¯ط¸â€¦
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {role.isSystem && (
                        <Alert variant="info" className="mb-3">
                          ط·آ¯ط¸ث†ط·آ± ط¸â€ ط·آ¸ط·آ§ط¸â€¦ط¸ظ¹ ط¸â€‍ط·آ§ ط¸ظ¹ط¸â€¦ط¸ئ’ط¸â€  ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍ط¸â€،
                        </Alert>
                      )}
                      <button type="button"
                        onClick={() => setExpandedRole(expandedRole === role.id ? null : role.id)}
                        className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors"
                      >
                        {expandedRole === role.id ? "ط·آ¥ط·آ®ط¸ظ¾ط·آ§ط·طŒ ط·آ§ط¸â€‍ط·آµط¸â€‍ط·آ§ط·آ­ط¸ظ¹ط·آ§ط·ع¾" : "ط·آ¹ط·آ±ط·آ¶ ط·آ§ط¸â€‍ط·آµط¸â€‍ط·آ§ط·آ­ط¸ظ¹ط·آ§ط·ع¾"}
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
                  { key: "userName", header: "ط·آ§ط¸â€‍ط¸â€¦ط·آ³ط·ع¾ط·آ®ط·آ¯ط¸â€¦" },
                  { key: "action", header: "ط·آ§ط¸â€‍ط·آ¥ط·آ¬ط·آ±ط·آ§ط·طŒ", render: (a) => (
                    <Badge variant={a.action === "delete" || a.action === "reject" ? "error" : a.action === "create" || a.action === "approve" ? "success" : "info"}>
                      {actionLabels[a.action] || a.action}
                    </Badge>
                  )},
                  { key: "resource", header: "ط·آ§ط¸â€‍ط¸â€¦ط¸ث†ط·آ§ط·آ±ط·آ¯", render: (a) => (
                    <span className="text-sm text-text-secondary">{resourceLabels[a.resource] || a.resource}</span>
                  )},
                  { key: "details", header: "ط·آ§ط¸â€‍ط·ع¾ط¸ظ¾ط·آ§ط·آµط¸ظ¹ط¸â€‍" },
                  { key: "timestamp", header: "ط·آ§ط¸â€‍ط·ع¾ط·آ§ط·آ±ط¸ظ¹ط·آ®", render: (a) => (
                    <span className="text-sm text-text-tertiary">{formatRelativeTime(a.timestamp)}</span>
                  )},
                  { key: "severity", header: "ط·آ§ط¸â€‍ط·آ£ط¸â€،ط¸â€¦ط¸ظ¹ط·آ©", render: (a) => (
                    <Badge variant={severityBadge[a.severity]} size="sm" dot>
                      {a.severity === "info" ? "ط¸â€¦ط·آ¹ط¸â€‍ط¸ث†ط¸â€¦ط·آ§ط·ع¾" : a.severity === "warning" ? "ط·ع¾ط·آ­ط·آ°ط¸ظ¹ط·آ±" : "ط·آ®ط·آ·ط·آ£"}
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
        title="ط·آ­ط·آ°ط¸ظ¾ ط¸â€ڑط·آ§ط¸â€‍ط·آ¨ ط·آ§ط¸â€‍ط·آµط¸â€‍ط·آ§ط·آ­ط¸ظ¹ط·آ§ط·ع¾"
        message="ط¸â€،ط¸â€‍ ط·آ£ط¸â€ ط·ع¾ ط¸â€¦ط·ع¾ط·آ£ط¸ئ’ط·آ¯ ط¸â€¦ط¸â€  ط·آ­ط·آ°ط¸ظ¾ ط¸â€ڑط·آ§ط¸â€‍ط·آ¨ ط·آ§ط¸â€‍ط·آµط¸â€‍ط·آ§ط·آ­ط¸ظ¹ط·آ§ط·ع¾ط·ع؛ ط¸â€،ط·آ°ط·آ§ ط·آ§ط¸â€‍ط·آ¥ط·آ¬ط·آ±ط·آ§ط·طŒ ط¸â€‍ط·آ§ ط¸ظ¹ط¸â€¦ط¸ئ’ط¸â€  ط·آ§ط¸â€‍ط·ع¾ط·آ±ط·آ§ط·آ¬ط·آ¹ ط·آ¹ط¸â€ ط¸â€،."
        confirmText="ط·آ­ط·آ°ط¸ظ¾"
        cancelText="ط·آ¥ط¸â€‍ط·ط›ط·آ§ط·طŒ"
        variant="danger"
      />
    </div>
  )
}

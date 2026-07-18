"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineUserAdd,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineClock,
  HiOutlineKey,
  HiOutlineUsers,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Badge } from "@/components/ui/Badge"
import { Table } from "@/components/ui/Table"
import { Tabs, TabPanel } from "@/components/ui/Tabs"
import { StatsCard } from "@/components/ui/StatsCard"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Alert } from "@/components/ui/Alert"
import { mockStaffMembers, mockStaffPermissions, mockAuditLogs, mockPermissions } from "@/lib/mock/data"
import { formatRelativeTime } from "@/lib/utils"

const severityBadge: Record<string, "info" | "warning" | "error"> = {
  info: "info",
  warning: "warning",
  error: "error",
}

const actionLabels: Record<string, string> = {
  create: "إنشاء",
  update: "تحديث",
  delete: "حذف",
  login: "تسجيل دخول",
  logout: "تسجيل خروج",
  export: "تصدير",
  approve: "موافقة",
  reject: "رفض",
}

const resourceLabels: Record<string, string> = {
  user: "مستخدم",
  course: "كورس",
  exam: "امتحان",
  payment: "دفعة",
  subscription: "اشتراك",
  certificate: "شهادة",
  code: "كود",
  setting: "إعدادات",
}

export default function StaffPage() {
  const [expandedRole, setExpandedRole] = useState<string | null>(null)

  const tabs = [
    { id: "staff", label: "الموظفين", icon: <HiOutlineUsers className="w-4 h-4" />, count: mockStaffMembers.length },
    { id: "roles", label: "الصلاحيات", icon: <HiOutlineKey className="w-4 h-4" />, count: mockStaffPermissions.length },
    { id: "audit", label: "سجل النشاطات", icon: <HiOutlineClock className="w-4 h-4" />, count: mockAuditLogs.length },
  ]

  const stats = useMemo(() => ({
    total: mockStaffMembers.length,
    active: mockStaffMembers.filter((s) => s.status === "active").length,
    roles: mockStaffPermissions.length,
    systemRoles: mockStaffPermissions.filter((r) => r.isSystem).length,
  }), [])

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="إدارة الموظفين والصلاحيات" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="إجمالي الموظفين" value={stats.total} icon={HiOutlineUsers} color="primary" />
        <StatsCard title="الموظفين النشطين" value={stats.active} icon={HiOutlineUserGroup} color="success" />
        <StatsCard title="أدوار الصلاحيات" value={stats.roles} icon={HiOutlineShieldCheck} color="info" />
        <StatsCard title="أدوار النظام" value={stats.systemRoles} icon={HiOutlineKey} color="warning" />
      </div>

      <Tabs tabs={tabs} defaultTab="staff">
        {(active) => (
          <>
            <TabPanel id="staff" activeTab={active}>
              <Table
                columns={[
                  { key: "name", header: "الموظف", render: (s) => (
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
                  { key: "jobTitle", header: "المسمى الوظيفي" },
                  { key: "role", header: "الدور" },
                  { key: "permissions", header: "الصلاحيات", render: (s) => (
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
                  { key: "status", header: "الحالة", render: (s) => (
                    <Badge variant={s.status === "active" ? "success" : "warning"}>
                      {s.status === "active" ? "نشط" : "غير نشط"}
                    </Badge>
                  )},
                ]}
                data={mockStaffMembers}
              />
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
                        <Badge variant="primary" size="sm">{role.permissions.length} صلاحية</Badge>
                        <Badge variant={role.userCount > 0 ? "info" : "neutral"} size="sm">
                          {role.userCount} مستخدم
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {role.isSystem && (
                        <Alert variant="info" className="mb-3">
                          دور نظامي لا يمكن تعديله
                        </Alert>
                      )}
                      <button
                        onClick={() => setExpandedRole(expandedRole === role.id ? null : role.id)}
                        className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors"
                      >
                        {expandedRole === role.id ? "إخفاء الصلاحيات" : "عرض الصلاحيات"}
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
                  { key: "userName", header: "المستخدم" },
                  { key: "action", header: "الإجراء", render: (a) => (
                    <Badge variant={a.action === "delete" || a.action === "reject" ? "error" : a.action === "create" || a.action === "approve" ? "success" : "info"}>
                      {actionLabels[a.action] || a.action}
                    </Badge>
                  )},
                  { key: "resource", header: "الموارد", render: (a) => (
                    <span className="text-sm text-text-secondary">{resourceLabels[a.resource] || a.resource}</span>
                  )},
                  { key: "details", header: "التفاصيل" },
                  { key: "timestamp", header: "التاريخ", render: (a) => (
                    <span className="text-sm text-text-tertiary">{formatRelativeTime(a.timestamp)}</span>
                  )},
                  { key: "severity", header: "الأهمية", render: (a) => (
                    <Badge variant={severityBadge[a.severity]} size="sm" dot>
                      {a.severity === "info" ? "معلومات" : a.severity === "warning" ? "تحذير" : "خطأ"}
                    </Badge>
                  )},
                ]}
                data={mockAuditLogs}
              />
            </TabPanel>
          </>
        )}
      </Tabs>
    </div>
  )
}

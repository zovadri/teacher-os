"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineUsers,
  HiOutlineUserGroup,
  HiOutlineExclamation,
  HiOutlineEye,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
  HiOutlineFilter,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Badge } from "@/components/ui/Badge"
import { Table } from "@/components/ui/Table"
import { Modal } from "@/components/ui/Modal"
import { StatsCard } from "@/components/ui/StatsCard"
import { SearchInput } from "@/components/ui/SearchInput"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { mockParents } from "@/lib/mock/data"
import { formatCurrency, formatDate } from "@/lib/utils"

const statusBadge: Record<string, "success" | "warning"> = {
  active: "success",
  inactive: "warning",
}

const statusLabels: Record<string, string> = {
  active: "نشط",
  inactive: "غير نشط",
}

export default function ParentsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedParent, setSelectedParent] = useState<(typeof mockParents)[0] | null>(null)

  const stats = useMemo(() => ({
    total: mockParents.length,
    active: mockParents.filter((p) => p.status === "active").length,
    inactive: mockParents.filter((p) => p.status === "inactive").length,
    withIssues: mockParents.filter((p) => p.status === "inactive").length,
  }), [])

  const filtered = useMemo(() => {
    return mockParents.filter((p) => {
      const matchSearch = p.name.includes(search) || p.phone.includes(search) || p.email.includes(search)
      const matchStatus = statusFilter === "all" || p.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [search, statusFilter])

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="إدارة أولياء الأمور" subtitle="عرض وإدارة أولياء أمور الطلاب" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="إجمالي أولياء الأمور" value={stats.total} icon={HiOutlineUsers} color="primary" />
        <StatsCard title="نشط" value={stats.active} icon={HiOutlineUserGroup} color="success" />
        <StatsCard title="غير نشط" value={stats.inactive} icon={HiOutlineUserGroup} color="warning" />
        <StatsCard title="بحاجة لمتابعة" value={stats.withIssues} icon={HiOutlineExclamation} color="error" />
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <SearchInput value={search} onChange={setSearch} placeholder="بحث بالاسم أو رقم الهاتف أو البريد..." />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
        >
          <option value="all">جميع الحالات</option>
          <option value="active">نشط</option>
          <option value="inactive">غير نشط</option>
        </select>
      </div>

      <Table
        columns={[
          { key: "name", header: "ولي الأمر", render: (p) => (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 overflow-hidden shrink-0">
                <img src={p.avatar} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-text truncate">{p.name}</p>
                <p className="text-xs text-text-tertiary truncate" dir="ltr">{p.email}</p>
              </div>
            </div>
          )},
          { key: "phone", header: "رقم الهاتف", render: (p) => (
            <div className="flex items-center gap-1.5 text-sm text-text-secondary" dir="ltr">
              <HiOutlinePhone size={14} className="text-text-tertiary shrink-0" />
              <span>{p.phone}</span>
            </div>
          )},
          { key: "email", header: "البريد الإلكتروني" },
          { key: "childrenCount", header: "عدد الأبناء", render: (p) => (
            <span className="text-sm text-text font-medium">{p.children.length}</span>
          )},
          { key: "lastPayment", header: "آخر دفعة", render: (p) => (
            <div className="text-sm">
              <span className="text-text font-medium">{formatCurrency(p.totalPaid)}</span>
              <span className="text-text-tertiary mr-1">| {formatDate(p.lastPayment)}</span>
            </div>
          )},
          { key: "status", header: "الحالة", render: (p) => (
            <Badge variant={statusBadge[p.status]}>{statusLabels[p.status]}</Badge>
          )},
          { key: "actions", header: "", render: (p) => (
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedParent(p) }}
              className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
              title="عرض التفاصيل"
            >
              <HiOutlineEye size={16} />
            </button>
          )},
        ]}
        data={filtered}
        onRowClick={(p) => setSelectedParent(p)}
      />

      <Modal isOpen={!!selectedParent} onClose={() => setSelectedParent(null)} title="بيانات ولي الأمر" size="lg">
        {selectedParent && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 overflow-hidden">
                <img src={selectedParent.avatar} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text">{selectedParent.name}</h3>
                <p className="text-sm text-text-secondary">ولي أمر</p>
              </div>
              <div className="mr-auto">
                <Badge variant={statusBadge[selectedParent.status]} size="md">
                  {statusLabels[selectedParent.status]}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">البريد الإلكتروني</p>
                <p className="text-sm text-text font-medium" dir="ltr">{selectedParent.email}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">رقم الهاتف</p>
                <p className="text-sm text-text font-medium" dir="ltr">{selectedParent.phone}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">إجمالي المدفوعات</p>
                <p className="text-sm text-text font-medium">{formatCurrency(selectedParent.totalPaid)}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">آخر دفعة</p>
                <p className="text-sm text-text font-medium">{formatDate(selectedParent.lastPayment)}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-text mb-3">الأبناء المسجلين</h4>
              <div className="space-y-2">
                {selectedParent.children.map((child) => (
                  <div key={child.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {child.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text">{child.name}</p>
                        <p className="text-xs text-text-tertiary">{child.grade}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>أولياء الأمور حسب الشهر</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2 h-32">
                {Array.from({ length: 6 }, (_, i) => {
                  const height = 30 + Math.random() * 70
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-t-md bg-primary/30 transition-all" style={{ height: `${height}%` }} />
                      <span className="text-xs text-text-tertiary">{["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو"][i]}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>حالة أولياء الأمور</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-success" />
                    <span className="text-sm text-text-secondary">نشط</span>
                  </div>
                  <span className="text-sm font-bold text-text">{stats.active}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-warning" />
                    <span className="text-sm text-text-secondary">غير نشط</span>
                  </div>
                  <span className="text-sm font-bold text-text">{stats.inactive}</span>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">الإجمالي</span>
                    <span className="text-sm font-bold text-text">{stats.total}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

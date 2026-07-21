"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import {
  HiOutlineQrcode,
  HiOutlinePlus,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlineTag,
  HiOutlineCurrencyDollar,
  HiOutlineFilter,
  HiOutlineEye,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Badge } from "@/components/ui/Badge"
import { Table } from "@/components/ui/Table"
import { Modal } from "@/components/ui/Modal"
import { StatsCard } from "@/components/ui/StatsCard"
import { SearchInput } from "@/components/ui/SearchInput"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { mockCenterCodes, mockSubscriptionPlans, mockCourses } from "@/lib/mock/data"
import { EmptyState } from "@/components/ui/EmptyState"
import { formatCurrency, formatDate } from "@/lib/utils"

const statusBadge: Record<string, "success" | "warning" | "error" | "neutral"> = {
  new: "success",
  used: "neutral",
  expired: "error",
}

const statusLabels: Record<string, string> = {
  new: "جديد",
  used: "مستخدم",
  expired: "منتهي",
}

export default function CodesPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showCreateModal, setShowCreateModal] = useState(false)

  const stats = useMemo(() => ({
    total: mockCenterCodes.length,
    used: mockCenterCodes.filter((c) => c.status === "used").length,
    available: mockCenterCodes.filter((c) => c.status === "new").length,
    expired: mockCenterCodes.filter((c) => c.status === "expired").length,
  }), [])

  const batchGroups = useMemo(() => {
    const groups = new Map<string, typeof mockCenterCodes>()
    mockCenterCodes.forEach((c) => {
      const existing = groups.get(c.batchId) || []
      existing.push(c)
      groups.set(c.batchId, existing)
    })
    return Array.from(groups.entries()).map(([batch, codes]) => ({
      batch,
      total: codes.length,
      used: codes.filter((c) => c.status === "used").length,
      available: codes.filter((c) => c.status === "new").length,
      totalValue: codes.reduce((s, c) => s + c.price, 0),
    }))
  }, [])

  const filtered = useMemo(() => {
    return mockCenterCodes.filter((c) => {
      const matchSearch = c.code.includes(search) || c.planName.includes(search)
      const matchStatus = statusFilter === "all" || c.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [search, statusFilter])

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="إدارة الأكواد" subtitle="إنشاء وإدارة أكواد الاشتراك" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="إجمالي الأكواد" value={stats.total} icon={HiOutlineTag} color="primary" />
        <StatsCard title="المتاح" value={stats.available} icon={HiOutlineCheckCircle} color="success" />
        <StatsCard title="المستخدم" value={stats.used} icon={HiOutlineClock} color="warning" />
        <StatsCard title="منتهي الصلاحية" value={stats.expired} icon={HiOutlineXCircle} color="error" />
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <div className="flex flex-1 gap-3 w-full">
          <div className="flex-1">
            <SearchInput value={search} onChange={setSearch} placeholder="بحث بالكود أو الباقة..." />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
          >
            <option value="all">جميع الحالات</option>
            <option value="new">جديد</option>
            <option value="used">مستخدم</option>
            <option value="expired">منتهي</option>
          </select>
        </div>
        <Button leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowCreateModal(true)}>
          إنشاء أكواد جديدة
        </Button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={HiOutlineQrcode}
          title="لا يوجد أكواد"
          description="لم يتم إنشاء أي أكواد تفعيل بعد"
        />
      ) : (
        <Table
          columns={[
            { key: "code", header: "الكود", render: (c) => (
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-text cursor-pointer hover:text-primary transition-colors" dir="ltr" onClick={() => router.push(`/teacher/codes/${c.code}`)}>{c.code}</span>
                <button type="button" className="p-1 text-text-tertiary hover:text-primary transition-colors" title="QR Code" onClick={() => toast.success("تم عرض رمز QR")}>
                  <HiOutlineQrcode size={16} />
                </button>
              </div>
            )},
            { key: "planName", header: "الباقة" },
            { key: "courseName", header: "الكورس", render: (c) => (
              <span className="text-sm text-text-secondary cursor-pointer hover:text-primary transition-colors" onClick={() => router.push(`/teacher/courses`)}>{c.courseName || "جميع الكورسات"}</span>
            )},
            { key: "batchId", header: "الدفعة", render: (c) => (
              <Badge variant="neutral" size="sm">{c.batchId}</Badge>
            )},
            { key: "status", header: "الحالة", render: (c) => (
              <Badge variant={statusBadge[c.status]}>{statusLabels[c.status]}</Badge>
            )},
            { key: "usedBy", header: "المستخدم", render: (c) => (
              <span className="text-sm text-text-secondary">{c.usedBy || "—"}</span>
            )},
            { key: "price", header: "السعر", render: (c) => (
              <span className="text-sm font-medium">{formatCurrency(c.price)}</span>
            )},
            { key: "createdAt", header: "تاريخ الإنشاء", render: (c) => (
              <span className="text-xs text-text-tertiary">{formatDate(c.createdAt)}</span>
            )},
          ]}
          data={filtered}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>ملخص الدفعات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {batchGroups.map((bg) => (
              <div key={bg.batch} className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
                <div>
                  <p className="text-sm font-medium text-text">{bg.batch}</p>
                  <p className="text-xs text-text-tertiary">إجمالي {bg.total} كود</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm font-bold text-success">{bg.available}</p>
                    <p className="text-xs text-text-tertiary">متاح</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-warning">{bg.used}</p>
                    <p className="text-xs text-text-tertiary">مستخدم</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-text">{formatCurrency(bg.totalValue)}</p>
                    <p className="text-xs text-text-tertiary">القيمة</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>إحصائيات الأكواد</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-xl bg-surface-secondary border border-border">
              <p className="text-2xl font-bold text-text">{stats.total}</p>
              <p className="text-xs text-text-tertiary mt-1">إجمالي</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-success/10 border border-success/20">
              <p className="text-2xl font-bold text-success">{stats.available}</p>
              <p className="text-xs text-text-tertiary mt-1">متاح</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-warning/10 border border-warning/20">
              <p className="text-2xl font-bold text-warning">{stats.used}</p>
              <p className="text-xs text-text-tertiary mt-1">مستخدم</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-error/10 border border-error/20">
              <p className="text-2xl font-bold text-error">{stats.expired}</p>
              <p className="text-xs text-text-tertiary mt-1">منتهي</p>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-primary-50/50 dark:bg-primary-900/10 border border-primary/20 text-sm text-text-secondary text-center">
            إجمالي قيمة الأكواد المتاحة: {formatCurrency(mockCenterCodes.filter((c) => c.status === "new").reduce((s, c) => s + c.price, 0))}
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="إنشاء أكواد جديدة" subtitle="أدخل البيانات لإنشاء مجموعة جديدة من الأكواد" size="lg">
        <div className="space-y-4">
          <Input label="عدد الأكواد" type="number" placeholder="مثال: 50" />
          <Select
            label="الباقة"
            options={mockSubscriptionPlans.map((p) => ({ value: p.id, label: `${p.name} - ${formatCurrency(p.price)}` }))}
            placeholder="اختر الباقة"
          />
          <Select
            label="الكورس (اختياري)"
            options={mockCourses.map((c) => ({ value: c.id, label: c.title }))}
            placeholder="اختر الكورس (اختياري)"
          />
          <Input label="اسم الدفعة" placeholder="مثال: الدفعة الأولى 2025" />
          <Input label="تاريخ انتهاء الصلاحية" type="date" />
          <div className="pt-4 flex gap-3">
            <Button variant="primary" size="lg" className="flex-1" onClick={() => { toast.success("تم إنشاء الأكواد بنجاح"); setShowCreateModal(false); }}>إنشاء الأكواد</Button>
            <Button variant="secondary" size="lg" onClick={() => setShowCreateModal(false)}>إلغاء</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

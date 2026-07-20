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
  new: "ط¬ط¯ظٹط¯",
  used: "ظ…ط³طھط®ط¯ظ…",
  expired: "ظ…ظ†طھظ‡ظٹ",
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
      <DashboardHeader title="ط¥ط¯ط§ط±ط© ط§ظ„ط£ظƒظˆط§ط¯" subtitle="ط¥ظ†ط´ط§ط، ظˆط¥ط¯ط§ط±ط© ط£ظƒظˆط§ط¯ ط§ظ„ط§ط´طھط±ط§ظƒ" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط£ظƒظˆط§ط¯" value={stats.total} icon={HiOutlineTag} color="primary" />
        <StatsCard title="ط§ظ„ظ…طھط§ط­" value={stats.available} icon={HiOutlineCheckCircle} color="success" />
        <StatsCard title="ط§ظ„ظ…ط³طھط®ط¯ظ…" value={stats.used} icon={HiOutlineClock} color="warning" />
        <StatsCard title="ظ…ظ†طھظ‡ظٹ ط§ظ„طµظ„ط§ط­ظٹط©" value={stats.expired} icon={HiOutlineXCircle} color="error" />
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <div className="flex flex-1 gap-3 w-full">
          <div className="flex-1">
            <SearchInput value={search} onChange={setSearch} placeholder="ط¨ط­ط« ط¨ط§ظ„ظƒظˆط¯ ط£ظˆ ط§ظ„ط¨ط§ظ‚ط©..." />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
          >
            <option value="all">ط¬ظ…ظٹط¹ ط§ظ„ط­ط§ظ„ط§طھ</option>
            <option value="new">ط¬ط¯ظٹط¯</option>
            <option value="used">ظ…ط³طھط®ط¯ظ…</option>
            <option value="expired">ظ…ظ†طھظ‡ظٹ</option>
          </select>
        </div>
        <Button leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowCreateModal(true)}>
          ط¥ظ†ط´ط§ط، ط£ظƒظˆط§ط¯ ط¬ط¯ظٹط¯ط©
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
            { key: "code", header: "ط§ظ„ظƒظˆط¯", render: (c) => (
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-text cursor-pointer hover:text-primary transition-colors" dir="ltr" onClick={() => router.push(`/teacher/codes/${c.code}`)}>{c.code}</span>
                <button type="button" className="p-1 text-text-tertiary hover:text-primary transition-colors" title="QR Code" onClick={() => toast.success("تم عرض رمز QR")}>
                  <HiOutlineQrcode size={16} />
                </button>
              </div>
            )},
            { key: "planName", header: "ط§ظ„ط¨ط§ظ‚ط©" },
            { key: "courseName", header: "ط§ظ„ظƒظˆط±ط³", render: (c) => (
              <span className="text-sm text-text-secondary cursor-pointer hover:text-primary transition-colors" onClick={() => router.push(`/teacher/courses`)}>{c.courseName || "ط¬ظ…ظٹط¹ ط§ظ„ظƒظˆط±ط³ط§طھ"}</span>
            )},
            { key: "batchId", header: "ط§ظ„ط¯ظپط¹ط©", render: (c) => (
              <Badge variant="neutral" size="sm">{c.batchId}</Badge>
            )},
            { key: "status", header: "ط§ظ„ط­ط§ظ„ط©", render: (c) => (
              <Badge variant={statusBadge[c.status]}>{statusLabels[c.status]}</Badge>
            )},
            { key: "usedBy", header: "ط§ظ„ظ…ط³طھط®ط¯ظ…", render: (c) => (
              <span className="text-sm text-text-secondary">{c.usedBy || "â€"}</span>
            )},
            { key: "price", header: "ط§ظ„ط³ط¹ط±", render: (c) => (
              <span className="text-sm font-medium">{formatCurrency(c.price)}</span>
            )},
            { key: "createdAt", header: "طھط§ط±ظٹط® ط§ظ„ط¥ظ†ط´ط§ط،", render: (c) => (
              <span className="text-xs text-text-tertiary">{formatDate(c.createdAt)}</span>
            )},
          ]}
          data={filtered}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>ظ…ظ„ط®طµ ط§ظ„ط¯ظپط¹ط§طھ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {batchGroups.map((bg) => (
              <div key={bg.batch} className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
                <div>
                  <p className="text-sm font-medium text-text">{bg.batch}</p>
                  <p className="text-xs text-text-tertiary">ط¥ط¬ظ…ط§ظ„ظٹ {bg.total} ظƒظˆط¯</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm font-bold text-success">{bg.available}</p>
                    <p className="text-xs text-text-tertiary">ظ…طھط§ط­</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-warning">{bg.used}</p>
                    <p className="text-xs text-text-tertiary">ظ…ط³طھط®ط¯ظ…</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-text">{formatCurrency(bg.totalValue)}</p>
                    <p className="text-xs text-text-tertiary">ط§ظ„ظ‚ظٹظ…ط©</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ط¥ط­طµط§ط¦ظٹط§طھ ط§ظ„ط£ظƒظˆط§ط¯</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-xl bg-surface-secondary border border-border">
              <p className="text-2xl font-bold text-text">{stats.total}</p>
              <p className="text-xs text-text-tertiary mt-1">ط¥ط¬ظ…ط§ظ„ظٹ</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-success/10 border border-success/20">
              <p className="text-2xl font-bold text-success">{stats.available}</p>
              <p className="text-xs text-text-tertiary mt-1">ظ…طھط§ط­</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-warning/10 border border-warning/20">
              <p className="text-2xl font-bold text-warning">{stats.used}</p>
              <p className="text-xs text-text-tertiary mt-1">ظ…ط³طھط®ط¯ظ…</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-error/10 border border-error/20">
              <p className="text-2xl font-bold text-error">{stats.expired}</p>
              <p className="text-xs text-text-tertiary mt-1">ظ…ظ†طھظ‡ظٹ</p>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-primary-50/50 dark:bg-primary-900/10 border border-primary/20 text-sm text-text-secondary text-center">
            ط¥ط¬ظ…ط§ظ„ظٹ ظ‚ظٹظ…ط© ط§ظ„ط£ظƒظˆط§ط¯ ط§ظ„ظ…طھط§ط­ط©: {formatCurrency(mockCenterCodes.filter((c) => c.status === "new").reduce((s, c) => s + c.price, 0))}
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="ط¥ظ†ط´ط§ط، ط£ظƒظˆط§ط¯ ط¬ط¯ظٹط¯ط©" subtitle="ط£ط¯ط®ظ„ ط§ظ„ط¨ظٹط§ظ†ط§طھ ظ„ط¥ظ†ط´ط§ط، ظ…ط¬ظ…ظˆط¹ط© ط¬ط¯ظٹط¯ط© ظ…ظ† ط§ظ„ط£ظƒظˆط§ط¯" size="lg">
        <div className="space-y-4">
          <Input label="ط¹ط¯ط¯ ط§ظ„ط£ظƒظˆط§ط¯" type="number" placeholder="ظ…ط«ط§ظ„: 50" />
          <Select
            label="ط§ظ„ط¨ط§ظ‚ط©"
            options={mockSubscriptionPlans.map((p) => ({ value: p.id, label: `${p.name} - ${formatCurrency(p.price)}` }))}
            placeholder="ط§ط®طھط± ط§ظ„ط¨ط§ظ‚ط©"
          />
          <Select
            label="ط§ظ„ظƒظˆط±ط³ (ط§ط®طھظٹط§ط±ظٹ)"
            options={mockCourses.map((c) => ({ value: c.id, label: c.title }))}
            placeholder="ط§ط®طھط± ط§ظ„ظƒظˆط±ط³ (ط§ط®طھظٹط§ط±ظٹ)"
          />
          <Input label="ط§ط³ظ… ط§ظ„ط¯ظپط¹ط©" placeholder="ظ…ط«ط§ظ„: ط§ظ„ط¯ظپط¹ط© ط§ظ„ط£ظˆظ„ظ‰ 2025" />
          <Input label="طھط§ط±ظٹط® ط§ظ†طھظ‡ط§ط، ط§ظ„طµظ„ط§ط­ظٹط©" type="date" />
          <div className="pt-4 flex gap-3">
            <Button variant="primary" size="lg" className="flex-1" onClick={() => { toast.success("تم إنشاء الأكواد بنجاح"); setShowCreateModal(false); }}>ط¥ظ†ط´ط§ط، ط§ظ„ط£ظƒظˆط§ط¯</Button>
            <Button variant="secondary" size="lg" onClick={() => setShowCreateModal(false)}>ط¥ظ„ط؛ط§ط،</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

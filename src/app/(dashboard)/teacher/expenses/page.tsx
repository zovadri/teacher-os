"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineCash, HiOutlinePlus, HiOutlineCalendar, HiOutlineOfficeBuilding,
  HiOutlineTag, HiOutlineUser, HiOutlineFilter,
} from "react-icons/hi"
import toast from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Modal } from "@/components/ui/Modal"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import { SearchInput } from "@/components/ui/SearchInput"
import { CardSkeleton, StatsSkeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { formatCurrency, formatDate } from "@/lib/utils"
import { mockExpenses, mockBranches } from "@/lib/mock/data"

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "error" }> = {
  approved: { label: "ط¸â€¦ط·آ¹ط·ع¾ط¸â€¦ط·آ¯", variant: "success" },
  pending: { label: "ط¸â€¦ط·آ¹ط¸â€‍ط¸â€ڑ", variant: "warning" },
  rejected: { label: "ط¸â€¦ط·آ±ط¸ظ¾ط¸ث†ط·آ¶", variant: "error" },
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState(mockExpenses)
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [branchFilter, setBranchFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [newExpense, setNewExpense] = useState({ category: "", description: "", amount: 0, branchId: "", paidBy: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const loadData = useCallback(() => {
    setIsLoading(true)
    setHasError(false)
    setTimeout(() => {
      setExpenses(mockExpenses)
      setIsLoading(false)
    }, 1000)
  }, [])

  const stats = useMemo(() => ({
    total: expenses.length,
    totalAmount: expenses.reduce((s, e) => e.status !== "rejected" ? s + e.amount : s, 0),
    approved: expenses.filter((e) => e.status === "approved").reduce((s, e) => s + e.amount, 0),
    pending: expenses.filter((e) => e.status === "pending").reduce((s, e) => s + e.amount, 0),
    pendingCount: expenses.filter((e) => e.status === "pending").length,
  }), [expenses])

  const categories = useMemo(() => [...new Set(expenses.map((e) => e.category))], [expenses])

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      const matchSearch = e.description.includes(search) || e.category.includes(search)
      const matchCat = categoryFilter === "all" || e.category === categoryFilter
      const matchBranch = branchFilter === "all" || e.branchId === branchFilter
      const matchStatus = statusFilter === "all" || e.status === statusFilter
      return matchSearch && matchCat && matchBranch && matchStatus
    })
  }, [search, categoryFilter, branchFilter, statusFilter, expenses])

  const monthlyTotal = useMemo(() => {
    const now = new Date()
    return expenses
      .filter((e) => e.date.getMonth() === now.getMonth() && e.date.getFullYear() === now.getFullYear() && e.status !== "rejected")
      .reduce((s, e) => s + e.amount, 0)
  }, [expenses])

  const handleAddExpense = () => {
    const exp = {
      id: `exp-${Date.now()}`,
      category: newExpense.category,
      description: newExpense.description,
      amount: newExpense.amount,
      date: new Date(),
      branchId: newExpense.branchId || mockBranches[0].id,
      paidBy: newExpense.paidBy,
      status: "pending" as const,
    }
    setExpenses((prev) => [exp, ...prev])
    setShowAddModal(false)
    setNewExpense({ category: "", description: "", amount: 0, branchId: "", paidBy: "" })
    toast.success("ط·ع¾ط¸â€¦ ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ§ط¸â€‍ط¸â€¦ط·آµط·آ±ط¸ث†ط¸ظ¾ ط·آ¨ط¸â€ ط·آ¬ط·آ§ط·آ­")
  }

  const getBranchName = (branchId: string) => mockBranches.find((b) => b.id === branchId)?.name || branchId

  if (hasError) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <DashboardHeader title="ط·آ§ط¸â€‍ط¸â€¦ط·آµط·آ±ط¸ث†ط¸ظ¾ط·آ§ط·ع¾" subtitle="ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط·آ§ط¸â€‍ط¸â€¦ط·آµط·آ±ط¸ث†ط¸ظ¾ط·آ§ط·ع¾" />
        <ErrorState onRetry={() => { setHasError(false); loadData() }} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <DashboardHeader title="ط·آ§ط¸â€‍ط¸â€¦ط·آµط·آ±ط¸ث†ط¸ظ¾ط·آ§ط·ع¾" subtitle="ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط¸â€¦ط·آµط·آ±ط¸ث†ط¸ظ¾ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط¸â€¦ط·آ±ط¸ئ’ط·آ²" />
      <div className="flex justify-end">
        <Button variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
          ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط¸â€¦ط·آµط·آ±ط¸ث†ط¸ظ¾
        </Button>
      </div>

      {isLoading ? (
        <StatsSkeleton count={4} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ ط·آ§ط¸â€‍ط¸â€¦ط·آµط·آ±ط¸ث†ط¸ظ¾ط·آ§ط·ع¾" value={formatCurrency(stats.totalAmount)} icon={HiOutlineCash} color="primary" />
          <StatsCard title="ط·آ§ط¸â€‍ط¸â€¦ط·آµط·آ±ط¸ث†ط¸ظ¾ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·آ´ط¸â€،ط·آ±ط¸ظ¹ط·آ©" value={formatCurrency(monthlyTotal)} icon={HiOutlineCalendar} color="info" />
          <StatsCard title="ط·آ§ط¸â€‍ط¸â€¦ط·آ¹ط·ع¾ط¸â€¦ط·آ¯ط·آ©" value={formatCurrency(stats.approved)} icon={HiOutlineTag} color="success" />
          <StatsCard title="ط·آ§ط¸â€‍ط¸â€¦ط·آ¹ط¸â€‍ط¸â€ڑط·آ©" value={formatCurrency(stats.pending)} icon={HiOutlineFilter} color="warning" subtitle={`${stats.pendingCount} ط¸â€¦ط·آ¹ط·آ§ط¸â€¦ط¸â€‍ط·آ©`} />
        </motion.div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>ط·آ³ط·آ¬ط¸â€‍ ط·آ§ط¸â€‍ط¸â€¦ط·آµط·آ±ط¸ث†ط¸ظ¾ط·آ§ط·ع¾</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 border-b border-border flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <SearchInput value={search} onChange={setSearch} placeholder="ط·آ¨ط·آ­ط·آ«..." />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select options={[{ value: "all", label: "ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¹ ط·آ§ط¸â€‍ط¸ظ¾ط·آ¦ط·آ§ط·ع¾" }, ...categories.map((c) => ({ value: c, label: c }))]} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} />
              <Select options={[{ value: "all", label: "ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¹ ط·آ§ط¸â€‍ط¸ظ¾ط·آ±ط¸ث†ط·آ¹" }, ...mockBranches.map((b) => ({ value: b.id, label: b.name }))]} value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)} />
              <Select options={[{ value: "all", label: "ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¹ ط·آ§ط¸â€‍ط·آ­ط·آ§ط¸â€‍ط·آ§ط·ع¾" }, { value: "approved", label: "ط¸â€¦ط·آ¹ط·ع¾ط¸â€¦ط·آ¯" }, { value: "pending", label: "ط¸â€¦ط·آ¹ط¸â€‍ط¸â€ڑ" }, { value: "rejected", label: "ط¸â€¦ط·آ±ط¸ظ¾ط¸ث†ط·آ¶" }]} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} />
            </div>
          </div>

          {isLoading ? (
            <div className="p-4"><CardSkeleton count={3} /></div>
          ) : filtered.length === 0 ? (
            <EmptyState icon={HiOutlineCash} title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط¸â€¦ط·آµط·آ±ط¸ث†ط¸ظ¾ط·آ§ط·ع¾" description="ط¸â€‍ط¸â€¦ ط¸ظ¹ط·ع¾ط¸â€¦ ط·آ§ط¸â€‍ط·آ¹ط·آ«ط¸ث†ط·آ± ط·آ¹ط¸â€‍ط¸â€° ط¸â€¦ط·آµط·آ±ط¸ث†ط¸ظ¾ط·آ§ط·ع¾ ط¸â€¦ط·آ·ط·آ§ط·آ¨ط¸â€ڑط·آ©" action={<Button variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط¸â€¦ط·آµط·آ±ط¸ث†ط¸ظ¾</Button>} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-secondary">
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط·آ§ط¸â€‍ط¸ظ¾ط·آ¦ط·آ©</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط·آ§ط¸â€‍ط¸ث†ط·آµط¸ظ¾</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط·آ§ط¸â€‍ط¸â€¦ط·آ¨ط¸â€‍ط·ط›</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط·آ§ط¸â€‍ط·ع¾ط·آ§ط·آ±ط¸ظ¹ط·آ®</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط·آ§ط¸â€‍ط¸ظ¾ط·آ±ط·آ¹</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط·آ§ط¸â€‍ط¸â€¦ط¸عˆط·آµط·آ±ط¸ظ¾</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط·آ§ط¸â€‍ط·آ­ط·آ§ط¸â€‍ط·آ©</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((exp) => (
                    <tr key={exp.id} className="border-b border-border last:border-0 hover:bg-surface-secondary transition-colors">
                      <td className="px-4 py-3">
                        <Badge variant="neutral" size="sm">{exp.category}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-text">{exp.description}</span>
                      </td>
                      <td className="px-4 py-3 font-medium text-text">{formatCurrency(exp.amount)}</td>
                      <td className="px-4 py-3 text-text-secondary text-xs">{formatDate(exp.date)}</td>
                      <td className="px-4 py-3 text-text-secondary">{getBranchName(exp.branchId)}</td>
                      <td className="px-4 py-3 text-text-secondary">{exp.paidBy}</td>
                      <td className="px-4 py-3">
                        <Badge variant={statusConfig[exp.status].variant} size="sm">{statusConfig[exp.status].label}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط¸â€¦ط·آµط·آ±ط¸ث†ط¸ظ¾ ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯" size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="ط·آ§ط¸â€‍ط¸ظ¾ط·آ¦ط·آ©" value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })} placeholder="ط¸â€¦ط·آ«ط·آ§ط¸â€‍: ط·آ¥ط¸ظ¹ط·آ¬ط·آ§ط·آ±" />
            <Input label="ط·آ§ط¸â€‍ط¸â€¦ط·آ¨ط¸â€‍ط·ط›" type="number" value={String(newExpense.amount)} onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })} placeholder="ط·آ§ط¸â€‍ط¸â€¦ط·آ¨ط¸â€‍ط·ط›" />
          </div>
          <Input label="ط·آ§ط¸â€‍ط¸ث†ط·آµط¸ظ¾" value={newExpense.description} onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })} placeholder="ط¸ث†ط·آµط¸ظ¾ ط·آ§ط¸â€‍ط¸â€¦ط·آµط·آ±ط¸ث†ط¸ظ¾" />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="ط·آ§ط¸â€‍ط¸ظ¾ط·آ±ط·آ¹"
              options={mockBranches.map((b) => ({ value: b.id, label: b.name }))}
              value={newExpense.branchId} onChange={(e) => setNewExpense({ ...newExpense, branchId: e.target.value })}
            />
            <Input label="ط·آ§ط¸â€‍ط¸â€¦ط¸عˆط·آµط·آ±ط¸ظ¾" value={newExpense.paidBy} onChange={(e) => setNewExpense({ ...newExpense, paidBy: e.target.value })} placeholder="ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط¸â€¦ط¸عˆط·آµط·آ±ط¸ظ¾" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="primary" className="flex-1" onClick={handleAddExpense} disabled={!newExpense.category || !newExpense.amount}>ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ§ط¸â€‍ط¸â€¦ط·آµط·آ±ط¸ث†ط¸ظ¾</Button>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>ط·آ¥ط¸â€‍ط·ط›ط·آ§ط·طŒ</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineCash, HiOutlinePlus, HiOutlineCalendar, HiOutlineOfficeBuilding,
  HiOutlineTag, HiOutlineUser, HiOutlineFilter,
} from "react-icons/hi"
import toast from "react-hot-toast"
import { PageHeader } from "@/components/ui/PageHeader"
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
  approved: { label: "معتمد", variant: "success" },
  pending: { label: "معلق", variant: "warning" },
  rejected: { label: "مرفوض", variant: "error" },
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
    toast.success("تم إضافة المصروف بنجاح")
  }

  const getBranchName = (branchId: string) => mockBranches.find((b) => b.id === branchId)?.name || branchId

  if (hasError) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <PageHeader title="المصروفات" description="إدارة المصروفات" />
        <ErrorState onRetry={() => { setHasError(false); loadData() }} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <PageHeader title="المصروفات" description="إدارة مصروفات المركز" />
      <div className="flex justify-end">
        <Button variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
          إضافة مصروف
        </Button>
      </div>

      {isLoading ? (
        <StatsSkeleton count={4} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="إجمالي المصروفات" value={formatCurrency(stats.totalAmount)} icon={HiOutlineCash} color="primary" />
          <StatsCard title="المصروفات الشهرية" value={formatCurrency(monthlyTotal)} icon={HiOutlineCalendar} color="info" />
          <StatsCard title="المعتمدة" value={formatCurrency(stats.approved)} icon={HiOutlineTag} color="success" />
          <StatsCard title="المعلقة" value={formatCurrency(stats.pending)} icon={HiOutlineFilter} color="warning" subtitle={`${stats.pendingCount} معاملة`} />
        </motion.div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>سجل المصروفات</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 border-b border-border flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <SearchInput value={search} onChange={setSearch} placeholder="بحث..." />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select options={[{ value: "all", label: "جميع الفئات" }, ...categories.map((c) => ({ value: c, label: c }))]} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} />
              <Select options={[{ value: "all", label: "جميع الفروع" }, ...mockBranches.map((b) => ({ value: b.id, label: b.name }))]} value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)} />
              <Select options={[{ value: "all", label: "جميع الحالات" }, { value: "approved", label: "معتمد" }, { value: "pending", label: "معلق" }, { value: "rejected", label: "مرفوض" }]} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} />
            </div>
          </div>

          {isLoading ? (
            <div className="p-4"><CardSkeleton count={3} /></div>
          ) : filtered.length === 0 ? (
            <EmptyState icon={HiOutlineCash} title="لا توجد مصروفات" description="لم يتم العثور على مصروفات مطابقة" action={<Button variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>إضافة مصروف</Button>} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-secondary">
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">الفئة</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">الوصف</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">المبلغ</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">التاريخ</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">الفرع</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">المُصرف</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((exp) => (
                    <tr key={exp.id} className="border-b border-border last:border-0 hover:bg-surface-secondary transition-colors">
                      <td className="px-4 py-3">
                        <Badge variant="default" size="sm">{exp.category}</Badge>
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

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="إضافة مصروف جديد" size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="الفئة" value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })} placeholder="مثال: إيجار" />
            <Input label="المبلغ" type="number" value={String(newExpense.amount)} onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })} placeholder="المبلغ" />
          </div>
          <Input label="الوصف" value={newExpense.description} onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })} placeholder="وصف المصروف" />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="الفرع"
              options={mockBranches.map((b) => ({ value: b.id, label: b.name }))}
              value={newExpense.branchId} onChange={(e) => setNewExpense({ ...newExpense, branchId: e.target.value })}
            />
            <Input label="المُصرف" value={newExpense.paidBy} onChange={(e) => setNewExpense({ ...newExpense, paidBy: e.target.value })} placeholder="اسم المُصرف" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="primary" className="flex-1" onClick={handleAddExpense} disabled={!newExpense.category || !newExpense.amount}>إضافة المصروف</Button>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>إلغاء</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

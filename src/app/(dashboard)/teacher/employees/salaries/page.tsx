"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineCurrencyDollar, HiOutlinePlus, HiOutlineMinus, HiOutlineCash,
  HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineClock, HiOutlineAdjustments,
} from "react-icons/hi"
import toast from "react-hot-toast"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Modal } from "@/components/ui/Modal"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import { CardSkeleton, StatsSkeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { formatCurrency } from "@/lib/utils"
import { mockSalaries, mockEmployees } from "@/lib/mock/data"
import { cn } from "@/lib/utils"
import { ConfirmDialog } from "@/components/ui/ConfirmDialog"

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "error" }> = {
  paid: { label: "ظ…ط¯ظپظˆط¹", variant: "success" },
  pending: { label: "ظ…ط¹ظ„ظ‚", variant: "warning" },
  cancelled: { label: "ظ…ظ„ط؛ظٹ", variant: "error" },
}

const months = [
  { value: "1", label: "ظٹظ†ط§ظٹط±" }, { value: "2", label: "ظپط¨ط±ط§ظٹط±" }, { value: "3", label: "ظ…ط§ط±ط³" },
  { value: "4", label: "ط¥ط¨ط±ظٹظ„" }, { value: "5", label: "ظ…ط§ظٹظˆ" }, { value: "6", label: "ظٹظˆظ†ظٹظˆ" },
  { value: "7", label: "ظٹظˆظ„ظٹظˆ" }, { value: "8", label: "ط£ط؛ط³ط·ط³" }, { value: "9", label: "ط³ط¨طھظ…ط¨ط±" },
  { value: "10", label: "ط£ظƒطھظˆط¨ط±" }, { value: "11", label: "ظ†ظˆظپظ…ط¨ط±" }, { value: "12", label: "ط¯ظٹط³ظ…ط¨ط±" },
]

export default function SalariesPage() {
  const [salaries, setSalaries] = useState(mockSalaries)
  const [month, setMonth] = useState("7")
  const [year, setYear] = useState("2026")
  const [editModal, setEditModal] = useState<{ open: boolean; salary: (typeof mockSalaries)[0] | null }>({ open: false, salary: null })
  const [bonusAmount, setBonusAmount] = useState(0)
  const [deductionAmount, setDeductionAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [showPayAllConfirm, setShowPayAllConfirm] = useState(false)

  const loadData = useCallback(() => {
    setIsLoading(true)
    setHasError(false)
    setTimeout(() => {
      setSalaries(mockSalaries)
      setIsLoading(false)
    }, 1000)
  }, [])

  const stats = useMemo(() => ({
    totalPayroll: salaries.reduce((s, sal) => sal.status !== "cancelled" ? s + sal.netSalary : s, 0),
    totalBonuses: salaries.reduce((s, sal) => s + sal.bonuses, 0),
    totalDeductions: salaries.reduce((s, sal) => s + sal.deductions, 0),
    pending: salaries.filter((s) => s.status === "pending").length,
    paid: salaries.filter((s) => s.status === "paid").length,
  }), [salaries])

  const monthSalaries = useMemo(() => salaries.filter((s) => String(s.month) === month && String(s.year) === year), [salaries, month, year])

  const handlePayAll = () => {
    setSalaries((prev) => prev.map((s) => {
      if (s.status === "pending" && String(s.month) === month && String(s.year) === year) {
        return { ...s, status: "paid" as const, paidAt: new Date() }
      }
      return s
    }))
    toast.success("طھظ… طµط±ظپ ط¬ظ…ظٹط¹ ط§ظ„ط±ظˆط§طھط¨ ط¨ظ†ط¬ط§ط­")
    setShowPayAllConfirm(false)
  }

  const handleEditSalary = () => {
    if (!editModal.salary) return
    const updated = editModal.salary
    updated.bonuses += bonusAmount
    updated.deductions += deductionAmount
    updated.netSalary = updated.baseSalary + updated.bonuses - updated.deductions
    setSalaries((prev) => prev.map((s) => s.id === updated.id ? updated : s))
    toast.success("طھظ… طھط­ط¯ظٹط« ط§ظ„ط±ط§طھط¨ ط¨ظ†ط¬ط§ط­")
    setEditModal({ open: false, salary: null })
    setBonusAmount(0)
    setDeductionAmount(0)
  }

  if (hasError) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <DashboardHeader title="ط§ظ„ط±ظˆط§طھط¨" subtitle="ط¥ط¯ط§ط±ط© ط§ظ„ط±ظˆط§طھط¨ ظˆط§ظ„ط£ط¬ظˆط±" />
        <ErrorState onRetry={() => { setHasError(false); loadData() }} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <Breadcrumb items={[{ label: "الموظفين", href: "/teacher/employees" }, { label: "المرتبات" }]} />
      <DashboardHeader title="ط§ظ„ط±ظˆط§طھط¨" subtitle="ط¥ط¯ط§ط±ط© ط§ظ„ط±ظˆط§طھط¨ ظˆط§ظ„ط£ط¬ظˆط±" />

      {isLoading ? (
        <StatsSkeleton count={3} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط±ظˆط§طھط¨" value={formatCurrency(stats.totalPayroll)} icon={HiOutlineCurrencyDollar} color="primary" />
          <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظ…ظƒط§ظپط¢طھ" value={formatCurrency(stats.totalBonuses)} icon={HiOutlinePlus} color="success" />
          <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط®طµظ…ط§طھ" value={formatCurrency(stats.totalDeductions)} icon={HiOutlineMinus} color="error" />
        </motion.div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>ط±ظˆط§طھط¨ ط´ظ‡ط± {months.find((m) => m.value === month)?.label} {year}</CardTitle>
          <div className="flex items-center gap-3">
            <Select options={months} value={month} onChange={(e) => setMonth(e.target.value)} className="w-28" />
            <Select options={[{ value: "2026", label: "2026" }, { value: "2025", label: "2025" }]} value={year} onChange={(e) => setYear(e.target.value)} className="w-20" />
            {stats.pending > 0 && (
              <button type="button" variant="success" size="sm" leftIcon={<HiOutlineCash className="w-4 h-4" />} onClick={() => setShowPayAllConfirm(true)}>
                طµط±ظپ ط§ظ„ط±ظˆط§طھط¨ ({stats.pending})
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4"><CardSkeleton count={3} /></div>
          ) : monthSalaries.length === 0 ? (
            <EmptyState icon={HiOutlineCurrencyDollar} title="ظ„ط§ طھظˆط¬ط¯ ط±ظˆط§طھط¨" description="ظ„ط§ طھظˆط¬ط¯ ط¨ظٹط§ظ†ط§طھ ط±ظˆط§طھط¨ ظ„ظ„ط´ظ‡ط± ط§ظ„ظ…ط­ط¯ط¯" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-secondary">
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط§ظ„ظ…ظˆط¸ظپ</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط§ظ„ط£ط³ط§ط³ظٹ</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط§ظ„ظ…ظƒط§ظپط¢طھ</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط§ظ„ط®طµظ…ط§طھ</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط§ظ„طµط§ظپظٹ</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط§ظ„ط­ط§ظ„ط©</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary"></th>
                  </tr>
                </thead>
                <tbody>
                  {monthSalaries.map((sal) => (
                    <tr key={sal.id} className="border-b border-border last:border-0 hover:bg-surface-secondary transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-medium text-text">{sal.employeeName}</span>
                      </td>
                      <td className="px-4 py-3 text-text-secondary">{formatCurrency(sal.baseSalary)}</td>
                      <td className="px-4 py-3 text-success font-medium">{sal.bonuses > 0 ? formatCurrency(sal.bonuses) : "-"}</td>
                      <td className="px-4 py-3 text-error font-medium">{sal.deductions > 0 ? formatCurrency(sal.deductions) : "-"}</td>
                      <td className="px-4 py-3 text-text font-bold">{formatCurrency(sal.netSalary)}</td>
                      <td className="px-4 py-3">
                        <Badge variant={statusConfig[sal.status].variant} size="sm">{statusConfig[sal.status].label}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        {sal.status === "pending" && (
                          <button type="button" variant="ghost" size="xs" leftIcon={<HiOutlineAdjustments className="w-3.5 h-3.5" />}
                            onClick={() => { setEditModal({ open: true, salary: sal }); setBonusAmount(0); setDeductionAmount(0) }}>
                            طھط¹ط¯ظٹظ„
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        isOpen={showPayAllConfirm}
        onClose={() => setShowPayAllConfirm(false)}
        onConfirm={handlePayAll}
        title="طھط£ظƒظٹط¯ طµط±ظپ ط§ظ„ط±ظˆط§طھط¨"
        message={`ط³ظٹطھظ… طµط±ظپ ط±ظˆط§طھط¨ ${stats.pending} ظ…ظˆط¸ظپ ظ…ط¹ظ„ظ‚ط©. ظ‡ظ„ ط£ظ†طھ ظ…طھط£ظƒط¯طں`}
        confirmText="طھط£ظƒظٹط¯ ط§ظ„طµط±ظپ"
        cancelText="ط¥ظ„ط؛ط§ط،"
        variant="info"
      />

      <Modal isOpen={editModal.open} onClose={() => setEditModal({ open: false, salary: null })} title="طھط¹ط¯ظٹظ„ ط§ظ„ط±ط§طھط¨" size="sm">
        <div className="space-y-4">
          {editModal.salary && (
            <>
              <div className="p-3 rounded-lg bg-surface-secondary">
                <p className="text-sm text-text-secondary">{editModal.salary.employeeName}</p>
                <p className="text-lg font-bold text-text">{formatCurrency(editModal.salary.netSalary)}</p>
              </div>
              <Input label="ط¥ط¶ط§ظپط© ظ…ظƒط§ظپط£ط©" type="number" value={String(bonusAmount)} onChange={(e) => setBonusAmount(Number(e.target.value))} placeholder="0" />
              <Input label="ط¥ط¶ط§ظپط© ط®طµظ…" type="number" value={String(deductionAmount)} onChange={(e) => setDeductionAmount(Number(e.target.value))} placeholder="0" />
              <div className="p-3 rounded-lg bg-primary-50 text-sm">
                <span className="text-text-secondary">ط§ظ„طµط§ظپظٹ ط§ظ„ظ…طھظˆظ‚ط¹: </span>
                <span className="font-bold text-primary">{formatCurrency(editModal.salary.baseSalary + editModal.salary.bonuses + bonusAmount - editModal.salary.deductions - deductionAmount)}</span>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" variant="primary" className="flex-1" onClick={handleEditSalary}>ط­ظپط¸ ط§ظ„طھط¹ط¯ظٹظ„ط§طھ</Button>
                <Button variant="secondary" onClick={() => setEditModal({ open: false, salary: null })}>ط¥ظ„ط؛ط§ط،</Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}

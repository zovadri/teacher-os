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
  paid: { label: "ط¸â€¦ط·آ¯ط¸ظ¾ط¸ث†ط·آ¹", variant: "success" },
  pending: { label: "ط¸â€¦ط·آ¹ط¸â€‍ط¸â€ڑ", variant: "warning" },
  cancelled: { label: "ط¸â€¦ط¸â€‍ط·ط›ط¸ظ¹", variant: "error" },
}

const months = [
  { value: "1", label: "ط¸ظ¹ط¸â€ ط·آ§ط¸ظ¹ط·آ±" }, { value: "2", label: "ط¸ظ¾ط·آ¨ط·آ±ط·آ§ط¸ظ¹ط·آ±" }, { value: "3", label: "ط¸â€¦ط·آ§ط·آ±ط·آ³" },
  { value: "4", label: "ط·آ¥ط·آ¨ط·آ±ط¸ظ¹ط¸â€‍" }, { value: "5", label: "ط¸â€¦ط·آ§ط¸ظ¹ط¸ث†" }, { value: "6", label: "ط¸ظ¹ط¸ث†ط¸â€ ط¸ظ¹ط¸ث†" },
  { value: "7", label: "ط¸ظ¹ط¸ث†ط¸â€‍ط¸ظ¹ط¸ث†" }, { value: "8", label: "ط·آ£ط·ط›ط·آ³ط·آ·ط·آ³" }, { value: "9", label: "ط·آ³ط·آ¨ط·ع¾ط¸â€¦ط·آ¨ط·آ±" },
  { value: "10", label: "ط·آ£ط¸ئ’ط·ع¾ط¸ث†ط·آ¨ط·آ±" }, { value: "11", label: "ط¸â€ ط¸ث†ط¸ظ¾ط¸â€¦ط·آ¨ط·آ±" }, { value: "12", label: "ط·آ¯ط¸ظ¹ط·آ³ط¸â€¦ط·آ¨ط·آ±" },
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
    toast.success("ط·ع¾ط¸â€¦ ط·آµط·آ±ط¸ظ¾ ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¹ ط·آ§ط¸â€‍ط·آ±ط¸ث†ط·آ§ط·ع¾ط·آ¨ ط·آ¨ط¸â€ ط·آ¬ط·آ§ط·آ­")
    setShowPayAllConfirm(false)
  }

  const handleEditSalary = () => {
    if (!editModal.salary) return
    const updated = editModal.salary
    updated.bonuses += bonusAmount
    updated.deductions += deductionAmount
    updated.netSalary = updated.baseSalary + updated.bonuses - updated.deductions
    setSalaries((prev) => prev.map((s) => s.id === updated.id ? updated : s))
    toast.success("ط·ع¾ط¸â€¦ ط·ع¾ط·آ­ط·آ¯ط¸ظ¹ط·آ« ط·آ§ط¸â€‍ط·آ±ط·آ§ط·ع¾ط·آ¨ ط·آ¨ط¸â€ ط·آ¬ط·آ§ط·آ­")
    setEditModal({ open: false, salary: null })
    setBonusAmount(0)
    setDeductionAmount(0)
  }

  if (hasError) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <DashboardHeader title="ط·آ§ط¸â€‍ط·آ±ط¸ث†ط·آ§ط·ع¾ط·آ¨" subtitle="ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط·آ§ط¸â€‍ط·آ±ط¸ث†ط·آ§ط·ع¾ط·آ¨ ط¸ث†ط·آ§ط¸â€‍ط·آ£ط·آ¬ط¸ث†ط·آ±" />
        <ErrorState onRetry={() => { setHasError(false); loadData() }} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <Breadcrumb items={[{ label: "ط§ظ„ظ…ظˆط¸ظپظٹظ†", href: "/teacher/employees" }, { label: "ط§ظ„ظ…ط±طھط¨ط§طھ" }]} />
      <DashboardHeader title="ط·آ§ط¸â€‍ط·آ±ط¸ث†ط·آ§ط·ع¾ط·آ¨" subtitle="ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط·آ§ط¸â€‍ط·آ±ط¸ث†ط·آ§ط·ع¾ط·آ¨ ط¸ث†ط·آ§ط¸â€‍ط·آ£ط·آ¬ط¸ث†ط·آ±" />

      {isLoading ? (
        <StatsSkeleton count={3} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCard title="ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ ط·آ§ط¸â€‍ط·آ±ط¸ث†ط·آ§ط·ع¾ط·آ¨" value={formatCurrency(stats.totalPayroll)} icon={HiOutlineCurrencyDollar} color="primary" />
          <StatsCard title="ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ ط·آ§ط¸â€‍ط¸â€¦ط¸ئ’ط·آ§ط¸ظ¾ط·آ¢ط·ع¾" value={formatCurrency(stats.totalBonuses)} icon={HiOutlinePlus} color="success" />
          <StatsCard title="ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ ط·آ§ط¸â€‍ط·آ®ط·آµط¸â€¦ط·آ§ط·ع¾" value={formatCurrency(stats.totalDeductions)} icon={HiOutlineMinus} color="error" />
        </motion.div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>ط·آ±ط¸ث†ط·آ§ط·ع¾ط·آ¨ ط·آ´ط¸â€،ط·آ± {months.find((m) => m.value === month)?.label} {year}</CardTitle>
          <div className="flex items-center gap-3">
            <Select options={months} value={month} onChange={(e) => setMonth(e.target.value)} className="w-28" />
            <Select options={[{ value: "2026", label: "2026" }, { value: "2025", label: "2025" }]} value={year} onChange={(e) => setYear(e.target.value)} className="w-20" />
            {stats.pending > 0 && (
              <Button variant="success" size="sm" leftIcon={<HiOutlineCash className="w-4 h-4" />} onClick={() => setShowPayAllConfirm(true)}>
                ط·آµط·آ±ط¸ظ¾ ط·آ§ط¸â€‍ط·آ±ط¸ث†ط·آ§ط·ع¾ط·آ¨ ({stats.pending})
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4"><CardSkeleton count={3} /></div>
          ) : monthSalaries.length === 0 ? (
            <EmptyState icon={HiOutlineCurrencyDollar} title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·آ±ط¸ث†ط·آ§ط·ع¾ط·آ¨" description="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·آ¨ط¸ظ¹ط·آ§ط¸â€ ط·آ§ط·ع¾ ط·آ±ط¸ث†ط·آ§ط·ع¾ط·آ¨ ط¸â€‍ط¸â€‍ط·آ´ط¸â€،ط·آ± ط·آ§ط¸â€‍ط¸â€¦ط·آ­ط·آ¯ط·آ¯" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-secondary">
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط·آ§ط¸â€‍ط¸â€¦ط¸ث†ط·آ¸ط¸ظ¾</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط·آ§ط¸â€‍ط·آ£ط·آ³ط·آ§ط·آ³ط¸ظ¹</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط·آ§ط¸â€‍ط¸â€¦ط¸ئ’ط·آ§ط¸ظ¾ط·آ¢ط·ع¾</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط·آ§ط¸â€‍ط·آ®ط·آµط¸â€¦ط·آ§ط·ع¾</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط·آ§ط¸â€‍ط·آµط·آ§ط¸ظ¾ط¸ظ¹</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط·آ§ط¸â€‍ط·آ­ط·آ§ط¸â€‍ط·آ©</th>
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
                          <Button variant="ghost" size="xs" leftIcon={<HiOutlineAdjustments className="w-3.5 h-3.5" />}
                            onClick={() => { setEditModal({ open: true, salary: sal }); setBonusAmount(0); setDeductionAmount(0) }}>
                            ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍
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
        title="ط·ع¾ط·آ£ط¸ئ’ط¸ظ¹ط·آ¯ ط·آµط·آ±ط¸ظ¾ ط·آ§ط¸â€‍ط·آ±ط¸ث†ط·آ§ط·ع¾ط·آ¨"
        message={`ط·آ³ط¸ظ¹ط·ع¾ط¸â€¦ ط·آµط·آ±ط¸ظ¾ ط·آ±ط¸ث†ط·آ§ط·ع¾ط·آ¨ ${stats.pending} ط¸â€¦ط¸ث†ط·آ¸ط¸ظ¾ ط¸â€¦ط·آ¹ط¸â€‍ط¸â€ڑط·آ©. ط¸â€،ط¸â€‍ ط·آ£ط¸â€ ط·ع¾ ط¸â€¦ط·ع¾ط·آ£ط¸ئ’ط·آ¯ط·ع؛`}
        confirmText="ط·ع¾ط·آ£ط¸ئ’ط¸ظ¹ط·آ¯ ط·آ§ط¸â€‍ط·آµط·آ±ط¸ظ¾"
        cancelText="ط·آ¥ط¸â€‍ط·ط›ط·آ§ط·طŒ"
        variant="info"
      />

      <Modal isOpen={editModal.open} onClose={() => setEditModal({ open: false, salary: null })} title="ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍ ط·آ§ط¸â€‍ط·آ±ط·آ§ط·ع¾ط·آ¨" size="sm">
        <div className="space-y-4">
          {editModal.salary && (
            <>
              <div className="p-3 rounded-lg bg-surface-secondary">
                <p className="text-sm text-text-secondary">{editModal.salary.employeeName}</p>
                <p className="text-lg font-bold text-text">{formatCurrency(editModal.salary.netSalary)}</p>
              </div>
              <Input label="ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط¸â€¦ط¸ئ’ط·آ§ط¸ظ¾ط·آ£ط·آ©" type="number" value={String(bonusAmount)} onChange={(e) => setBonusAmount(Number(e.target.value))} placeholder="0" />
              <Input label="ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ®ط·آµط¸â€¦" type="number" value={String(deductionAmount)} onChange={(e) => setDeductionAmount(Number(e.target.value))} placeholder="0" />
              <div className="p-3 rounded-lg bg-primary-50 text-sm">
                <span className="text-text-secondary">ط·آ§ط¸â€‍ط·آµط·آ§ط¸ظ¾ط¸ظ¹ ط·آ§ط¸â€‍ط¸â€¦ط·ع¾ط¸ث†ط¸â€ڑط·آ¹: </span>
                <span className="font-bold text-primary">{formatCurrency(editModal.salary.baseSalary + editModal.salary.bonuses + bonusAmount - editModal.salary.deductions - deductionAmount)}</span>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="primary" className="flex-1" onClick={handleEditSalary}>ط·آ­ط¸ظ¾ط·آ¸ ط·آ§ط¸â€‍ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍ط·آ§ط·ع¾</Button>
                <Button variant="secondary" onClick={() => setEditModal({ open: false, salary: null })}>ط·آ¥ط¸â€‍ط·ط›ط·آ§ط·طŒ</Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}

"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineCube, HiOutlinePlus, HiOutlineMinus, HiOutlineExclamation,
  HiOutlineAdjustments, HiOutlineOfficeBuilding, HiOutlineTag,
} from "react-icons/hi"
import toast from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import { Modal } from "@/components/ui/Modal"
import { Alert } from "@/components/ui/Alert"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import { SearchInput } from "@/components/ui/SearchInput"
import { CardSkeleton, StatsSkeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { cn, formatCurrency } from "@/lib/utils"
import { mockInventory, mockBranches } from "@/lib/mock/data"

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "error" }> = {
  "in-stock": { label: "ظ…طھظˆظپط±", variant: "success" },
  "low-stock": { label: "ظ…ظ†ط®ظپط¶", variant: "warning" },
  "out-of-stock": { label: "ظ†ظپط°", variant: "error" },
}

export default function InventoryPage() {
  const [items, setItems] = useState(mockInventory)
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [branchFilter, setBranchFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [editModal, setEditModal] = useState<{ open: boolean; item: (typeof mockInventory)[0] | null }>({ open: false, item: null })
  const [editQuantity, setEditQuantity] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const loadData = useCallback(() => {
    setIsLoading(true)
    setHasError(false)
    setTimeout(() => {
      setItems(mockInventory)
      setIsLoading(false)
    }, 1000)
  }, [])

  const stats = useMemo(() => ({
    total: items.length,
    inStock: items.filter((i) => i.status === "in-stock").length,
    lowStock: items.filter((i) => i.status === "low-stock").length,
    outOfStock: items.filter((i) => i.status === "out-of-stock").length,
    totalValue: items.reduce((s, i) => s + i.quantity * i.price, 0),
  }), [items])

  const categories = useMemo(() => [...new Set(items.map((i) => i.category))], [items])

  const filtered = useMemo(() => {
    return items.filter((i) => {
      const matchSearch = i.name.includes(search) || i.category.includes(search)
      const matchCat = categoryFilter === "all" || i.category === categoryFilter
      const matchBranch = branchFilter === "all" || i.branchId === branchFilter
      const matchStatus = statusFilter === "all" || i.status === statusFilter
      return matchSearch && matchCat && matchBranch && matchStatus
    })
  }, [search, categoryFilter, branchFilter, statusFilter, items])

  const lowStockItems = useMemo(() => items.filter((i) => i.status === "low-stock" || i.status === "out-of-stock"), [items])

  const handleEdit = () => {
    if (!editModal.item) return
    setItems((prev) => prev.map((i) => {
      if (i.id === editModal.item!.id) {
        const qty = editQuantity
        return {
          ...i,
          quantity: qty,
          status: qty <= 0 ? "out-of-stock" as const : qty < i.minQuantity ? "low-stock" as const : "in-stock" as const,
        }
      }
      return i
    }))
    toast.success("طھظ… طھط­ط¯ظٹط« ط§ظ„ظ…ط®ط²ظˆظ† ط¨ظ†ط¬ط§ط­")
    setEditModal({ open: false, item: null })
  }

  const getBranchName = (branchId: string) => mockBranches.find((b) => b.id === branchId)?.name || branchId

  if (hasError) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <DashboardHeader title="ط§ظ„ظ…ط®ط²ظˆظ†" subtitle="ط¥ط¯ط§ط±ط© ط§ظ„ظ…ط®ط²ظˆظ† ظˆط§ظ„ظ…ط³طھظˆط¯ط¹ط§طھ" />
        <ErrorState onRetry={() => { setHasError(false); loadData() }} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <DashboardHeader title="ط§ظ„ظ…ط®ط²ظˆظ†" subtitle="ط¥ط¯ط§ط±ط© ط§ظ„ظ…ط®ط²ظˆظ† ظˆط§ظ„ظ…ط³طھظˆط¯ط¹ط§طھ" />

      {lowStockItems.length > 0 && (
        <Alert variant="warning" title="طھظ†ط¨ظٹظ‡ ط§ظ„ظ…ط®ط²ظˆظ† ط§ظ„ظ…ظ†ط®ظپط¶">
          ظٹظˆط¬ط¯ {lowStockItems.length} طµظ†ظپ ط¨ط­ط§ط¬ط© ط¥ظ„ظ‰ ط¥ط¹ط§ط¯ط© طھظˆط±ظٹط¯. ظٹط±ط¬ظ‰ ظ…ط±ط§ط¬ط¹ط© ط§ظ„ظ…ط®ط²ظˆظ† ط§ظ„ظ…ظ†ط®ظپط¶.
        </Alert>
      )}

      {isLoading ? (
        <StatsSkeleton count={4} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط£طµظ†ط§ظپ" value={stats.total} icon={HiOutlineCube} color="primary" />
          <StatsCard title="ظ…طھظˆظپط±" value={stats.inStock} icon={HiOutlinePlus} color="success" />
          <StatsCard title="ظ…ظ†ط®ظپط¶" value={stats.lowStock} icon={HiOutlineExclamation} color="warning" />
          <StatsCard title="ظ†ظپط°" value={stats.outOfStock} icon={HiOutlineMinus} color="error" subtitle={`ط§ظ„ظ‚ظٹظ…ط©: ${formatCurrency(stats.totalValue)}`} />
        </motion.div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>ط£طµظ†ط§ظپ ط§ظ„ظ…ط®ط²ظˆظ†</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 border-b border-border flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <SearchInput value={search} onChange={setSearch} placeholder="ط¨ط­ط«..." />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select options={[{ value: "all", label: "ط¬ظ…ظٹط¹ ط§ظ„ظپط¦ط§طھ" }, ...categories.map((c) => ({ value: c, label: c }))]} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} />
              <Select options={[{ value: "all", label: "ط¬ظ…ظٹط¹ ط§ظ„ظپط±ظˆط¹" }, ...mockBranches.map((b) => ({ value: b.id, label: b.name }))]} value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)} />
              <Select options={[{ value: "all", label: "ط¬ظ…ظٹط¹ ط§ظ„ط­ط§ظ„ط§طھ" }, { value: "in-stock", label: "ظ…طھظˆظپط±" }, { value: "low-stock", label: "ظ…ظ†ط®ظپط¶" }, { value: "out-of-stock", label: "ظ†ظپط°" }]} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} />
            </div>
          </div>

          {isLoading ? (
            <div className="p-4"><CardSkeleton count={3} /></div>
          ) : filtered.length === 0 ? (
            <EmptyState icon={HiOutlineCube} title="ظ„ط§ طھظˆط¬ط¯ ط£طµظ†ط§ظپ" description="ظ„ظ… ظٹطھظ… ط§ظ„ط¹ط«ظˆط± ط¹ظ„ظ‰ ط£طµظ†ط§ظپ ظ…ط·ط§ط¨ظ‚ط©" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-secondary">
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط§ظ„طµظ†ظپ</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط§ظ„ظپط¦ط©</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط§ظ„ظƒظ…ظٹط©</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط§ظ„ط­ط¯ ط§ظ„ط£ط¯ظ†ظ‰</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط³ط¹ط± ط§ظ„ظˆط­ط¯ط©</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط§ظ„ظپط±ط¹</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">ط§ظ„ط­ط§ظ„ط©</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr key={item.id} className="border-b border-border last:border-0 hover:bg-surface-secondary transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-medium text-text">{item.name}</span>
                      </td>
                      <td className="px-4 py-3 text-text-secondary">{item.category}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className={cn("font-medium", item.quantity <= item.minQuantity ? "text-error" : "text-text")}>{item.quantity}</span>
                          <div className="w-16">
                            <Progress value={(item.quantity / Math.max(item.quantity, item.minQuantity * 2)) * 100} size="sm" variant={item.status === "out-of-stock" ? "error" : item.status === "low-stock" ? "warning" : "success"} />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-text-tertiary">{item.minQuantity}</td>
                      <td className="px-4 py-3 text-text-secondary">{formatCurrency(item.price)}</td>
                      <td className="px-4 py-3 text-text-secondary">{getBranchName(item.branchId)}</td>
                      <td className="px-4 py-3">
                        <Badge variant={statusConfig[item.status].variant} size="sm">{statusConfig[item.status].label}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <button type="button" variant="ghost" size="xs" leftIcon={<HiOutlineAdjustments className="w-3.5 h-3.5" />}
                          onClick={() => { setEditModal({ open: true, item }); setEditQuantity(item.quantity) }}>
                          طھط¹ط¯ظٹظ„
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Modal isOpen={editModal.open} onClose={() => setEditModal({ open: false, item: null })} title="طھط¹ط¯ظٹظ„ ط§ظ„ظ…ط®ط²ظˆظ†" size="sm">
        <div className="space-y-4">
          {editModal.item && (
            <>
              <div className="p-3 rounded-lg bg-surface-secondary">
                <p className="text-sm font-medium text-text">{editModal.item.name}</p>
                <p className="text-xs text-text-tertiary">{editModal.item.category}</p>
              </div>
              <Input label="ط§ظ„ظƒظ…ظٹط© ط§ظ„ط¬ط¯ظٹط¯ط©" type="number" value={String(editQuantity)} onChange={(e) => setEditQuantity(Number(e.target.value))} />
              <div className="flex gap-3 pt-2">
                <button type="button" variant="primary" className="flex-1" onClick={handleEdit}>ط­ظپط¸ ط§ظ„طھط¹ط¯ظٹظ„ط§طھ</Button>
                <Button variant="secondary" onClick={() => setEditModal({ open: false, item: null })}>ط¥ظ„ط؛ط§ط،</Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}

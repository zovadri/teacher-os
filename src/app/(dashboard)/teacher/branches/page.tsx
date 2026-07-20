"use client"

import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineOfficeBuilding, HiOutlinePhone, HiOutlineUser, HiOutlineLocationMarker,
  HiOutlinePlus, HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineExclamation,
} from "react-icons/hi"
import toast from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import { Modal } from "@/components/ui/Modal"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import { Skeleton, CardSkeleton, StatsSkeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { cn, formatDate } from "@/lib/utils"
import { mockBranches } from "@/lib/mock/data"

export default function BranchesPage() {
  const [branches, setBranches] = useState(mockBranches)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newBranch, setNewBranch] = useState({ name: "", address: "", phone: "", email: "", manager: "", capacity: 100 })
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const loadData = useCallback(() => {
    setIsLoading(true)
    setHasError(false)
    setTimeout(() => {
      setBranches(mockBranches)
      setIsLoading(false)
    }, 1000)
  }, [])

  const stats = useMemo(() => ({
    total: branches.length,
    active: branches.filter((b) => b.status === "active").length,
    totalCapacity: branches.reduce((s, b) => s + b.capacity, 0),
    totalCurrent: branches.reduce((s, b) => s + b.currentCount, 0),
  }), [branches])

  const handleAddBranch = () => {
    const branch = {
      id: `br-${Date.now()}`,
      name: newBranch.name,
      address: newBranch.address,
      phone: newBranch.phone,
      email: newBranch.email,
      manager: newBranch.manager,
      status: "active" as const,
      capacity: newBranch.capacity,
      currentCount: 0,
      createdAt: new Date(),
    }
    setBranches((prev) => [branch, ...prev])
    setShowAddModal(false)
    setNewBranch({ name: "", address: "", phone: "", email: "", manager: "", capacity: 100 })
    toast.success("ط·ع¾ط¸â€¦ ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ§ط¸â€‍ط¸ظ¾ط·آ±ط·آ¹ ط·آ¨ط¸â€ ط·آ¬ط·آ§ط·آ­")
  }

  const handleRetry = useCallback(() => {
    loadData()
  }, [loadData])

  if (hasError) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <DashboardHeader title="ط·آ§ط¸â€‍ط¸ظ¾ط·آ±ط¸ث†ط·آ¹" subtitle="ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط¸ظ¾ط·آ±ط¸ث†ط·آ¹ ط·آ§ط¸â€‍ط¸â€¦ط·آ±ط¸ئ’ط·آ²" />
        <ErrorState onRetry={handleRetry} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <DashboardHeader title="ط·آ§ط¸â€‍ط¸ظ¾ط·آ±ط¸ث†ط·آ¹" subtitle="ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط¸ظ¾ط·آ±ط¸ث†ط·آ¹ ط·آ§ط¸â€‍ط¸â€¦ط·آ±ط¸ئ’ط·آ²" />
      <div className="flex justify-end">
        <Button variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
          ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط¸ظ¾ط·آ±ط·آ¹
        </Button>
      </div>

      {isLoading ? (
        <StatsSkeleton count={4} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ ط·آ§ط¸â€‍ط¸ظ¾ط·آ±ط¸ث†ط·آ¹" value={stats.total} icon={HiOutlineOfficeBuilding} color="primary" subtitle={`${stats.active} ط¸â€ ط·آ´ط·آ·`} />
          <StatsCard title="ط·آ§ط¸â€‍ط·آ³ط·آ¹ط·آ© ط·آ§ط¸â€‍ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ط·آ©" value={stats.totalCapacity} icon={HiOutlineLocationMarker} color="info" />
          <StatsCard title="ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ ط·آ§ط¸â€‍ط¸â€¦ط·آ³ط·آ¬ط¸â€‍ط¸ظ¹ط¸â€ " value={stats.totalCurrent} icon={HiOutlineUser} color="success" subtitle={`${Math.round((stats.totalCurrent / stats.totalCapacity) * 100)}% ط¸â€¦ط¸â€  ط·آ§ط¸â€‍ط·آ³ط·آ¹ط·آ©`} />
          <StatsCard title="ط¸â€¦ط·ع¾ط¸ث†ط·آ³ط·آ· ط·آ§ط¸â€‍ط·آ¥ط·آ´ط·ط›ط·آ§ط¸â€‍" value={`${stats.total > 0 ? Math.round(branches.reduce((s, b) => s + (b.capacity > 0 ? (b.currentCount / b.capacity) * 100 : 0), 0) / stats.total) : 0}%`} icon={HiOutlineExclamation} color="warning" />
        </motion.div>
      )}

      {isLoading ? (
        <CardSkeleton count={3} />
      ) : branches.length === 0 ? (
        <EmptyState
          icon={HiOutlineOfficeBuilding}
          title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط¸ظ¾ط·آ±ط¸ث†ط·آ¹"
          description="ط¸â€‍ط¸â€¦ ط¸ظ¹ط·ع¾ط¸â€¦ ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ£ط¸ظ¹ ط¸ظ¾ط·آ±ط¸ث†ط·آ¹ ط·آ¨ط·آ¹ط·آ¯. ط·آ£ط·آ¶ط¸ظ¾ ط¸ظ¾ط·آ±ط·آ¹ط·آ§ط¸â€¹ ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯ط·آ§ط¸â€¹ ط¸â€‍ط¸â€‍ط·آ¨ط·آ¯ط·طŒ."
          action={<Button variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط¸ظ¾ط·آ±ط·آ¹</Button>}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {branches.map((branch) => (
            <motion.div key={branch.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} layout>
              <Card hover className="p-0" onClick={() => setExpandedId(expandedId === branch.id ? null : branch.id)}>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", branch.status === "active" ? "bg-primary-100 text-primary" : "bg-surface-tertiary text-text-tertiary")}>
                        <HiOutlineOfficeBuilding className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text">{branch.name}</h3>
                        <p className="text-xs text-text-tertiary">{branch.manager}</p>
                      </div>
                    </div>
                    <Badge variant={branch.status === "active" ? "success" : "neutral"}>{branch.status === "active" ? "ط¸â€ ط·آ´ط·آ·" : "ط·ط›ط¸ظ¹ط·آ± ط¸â€ ط·آ´ط·آ·"}</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="flex items-center gap-2">
                      <HiOutlineLocationMarker className="w-4 h-4 shrink-0" />
                      <span>{branch.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HiOutlinePhone className="w-4 h-4 shrink-0" />
                      <span>{branch.phone}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-text-secondary">ط·آ³ط·آ¹ط·آ© ط·آ§ط¸â€‍ط¸ظ¾ط·آ±ط·آ¹</span>
                      <span className="text-text font-medium">{branch.currentCount}/{branch.capacity}</span>
                    </div>
                    <Progress value={(branch.currentCount / branch.capacity) * 100} size="sm" variant={branch.currentCount / branch.capacity > 0.85 ? "warning" : "primary"} />
                  </div>
                  <div className="flex items-center gap-1 mt-3 text-xs text-text-tertiary">
                    {expandedId === branch.id ? <HiOutlineChevronUp className="w-3.5 h-3.5" /> : <HiOutlineChevronDown className="w-3.5 h-3.5" />}
                    <span>{expandedId === branch.id ? "ط·آ¥ط·آ®ط¸ظ¾ط·آ§ط·طŒ ط·آ§ط¸â€‍ط·ع¾ط¸ظ¾ط·آ§ط·آµط¸ظ¹ط¸â€‍" : "ط·آ¹ط·آ±ط·آ¶ ط·آ§ط¸â€‍ط·ع¾ط¸ظ¾ط·آ§ط·آµط¸ظ¹ط¸â€‍"}</span>
                  </div>
                </div>
                <AnimatePresence>
                  {expandedId === branch.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-border">
                      <div className="p-5 space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <HiOutlineUser className="w-4 h-4 text-text-tertiary" />
                          <span className="text-text-secondary">ط·آ§ط¸â€‍ط¸â€¦ط·آ¯ط¸ظ¹ط·آ±:</span>
                          <span className="text-text font-medium">{branch.manager}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-lg bg-surface-secondary">
                            <p className="text-xs text-text-tertiary">ط·آ¹ط·آ¯ط·آ¯ ط¸â€ڑط·آ§ط·آ¹ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·آ¯ط·آ±ط·آ§ط·آ³ط·آ©</p>
                            <p className="text-lg font-bold text-text">--</p>
                          </div>
                          <div className="p-3 rounded-lg bg-surface-secondary">
                            <p className="text-xs text-text-tertiary">ط·آ¹ط·آ¯ط·آ¯ ط·آ§ط¸â€‍ط¸â€¦ط¸ث†ط·آ¸ط¸ظ¾ط¸ظ¹ط¸â€ </p>
                            <p className="text-lg font-bold text-text">--</p>
                          </div>
                        </div>
                        <p className="text-xs text-text-tertiary">ط·ع¾ط·آ§ط·آ±ط¸ظ¹ط·آ® ط·آ§ط¸â€‍ط·آ¥ط¸â€ ط·آ´ط·آ§ط·طŒ: {formatDate(branch.createdAt)}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط¸ظ¾ط·آ±ط·آ¹ ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯" size="md">
        <div className="space-y-4">
          <Input label="ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط¸ظ¾ط·آ±ط·آ¹" value={newBranch.name} onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })} placeholder="ط·آ£ط·آ¯ط·آ®ط¸â€‍ ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط¸ظ¾ط·آ±ط·آ¹" />
          <Input label="ط·آ§ط¸â€‍ط·آ¹ط¸â€ ط¸ث†ط·آ§ط¸â€ " value={newBranch.address} onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })} placeholder="ط·آ£ط·آ¯ط·آ®ط¸â€‍ ط·آ§ط¸â€‍ط·آ¹ط¸â€ ط¸ث†ط·آ§ط¸â€ " />
          <div className="grid grid-cols-2 gap-3">
            <Input label="ط·آ±ط¸â€ڑط¸â€¦ ط·آ§ط¸â€‍ط¸â€،ط·آ§ط·ع¾ط¸ظ¾" value={newBranch.phone} onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })} placeholder="ط·آ±ط¸â€ڑط¸â€¦ ط·آ§ط¸â€‍ط¸â€،ط·آ§ط·ع¾ط¸ظ¾" />
            <Input label="ط·آ§ط¸â€‍ط·آ¨ط·آ±ط¸ظ¹ط·آ¯ ط·آ§ط¸â€‍ط·آ¥ط¸â€‍ط¸ئ’ط·ع¾ط·آ±ط¸ث†ط¸â€ ط¸ظ¹" value={newBranch.email} onChange={(e) => setNewBranch({ ...newBranch, email: e.target.value })} placeholder="ط·آ§ط¸â€‍ط·آ¨ط·آ±ط¸ظ¹ط·آ¯ ط·آ§ط¸â€‍ط·آ¥ط¸â€‍ط¸ئ’ط·ع¾ط·آ±ط¸ث†ط¸â€ ط¸ظ¹" />
          </div>
          <Input label="ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط¸â€¦ط·آ¯ط¸ظ¹ط·آ±" value={newBranch.manager} onChange={(e) => setNewBranch({ ...newBranch, manager: e.target.value })} placeholder="ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط¸â€¦ط·آ¯ط¸ظ¹ط·آ±" />
          <Input label="ط·آ§ط¸â€‍ط·آ³ط·آ¹ط·آ© ط·آ§ط¸â€‍ط¸â€ڑط·آµط¸ث†ط¸â€°" type="number" value={String(newBranch.capacity)} onChange={(e) => setNewBranch({ ...newBranch, capacity: Number(e.target.value) })} placeholder="ط·آ§ط¸â€‍ط·آ³ط·آ¹ط·آ© ط·آ§ط¸â€‍ط¸â€ڑط·آµط¸ث†ط¸â€°" />
          <div className="flex gap-3 pt-2">
            <Button variant="primary" className="flex-1" onClick={handleAddBranch} disabled={!newBranch.name}>ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ§ط¸â€‍ط¸ظ¾ط·آ±ط·آ¹</Button>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>ط·آ¥ط¸â€‍ط·ط›ط·آ§ط·طŒ</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

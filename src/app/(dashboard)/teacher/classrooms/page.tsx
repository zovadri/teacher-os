"use client"

import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineShare, HiOutlinePlus, HiOutlineFilter, HiOutlineTable,
  HiOutlineViewGrid, HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineAcademicCap,
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
import { Skeleton, CardSkeleton, StatsSkeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { cn } from "@/lib/utils"
import { mockClassrooms, mockBranches } from "@/lib/mock/data"

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "error" }> = {
  available: { label: "ط¸â€¦ط·ع¾ط·آ§ط·آ­ط·آ©", variant: "success" },
  occupied: { label: "ط¸â€¦ط·آ´ط·ط›ط¸ث†ط¸â€‍ط·آ©", variant: "warning" },
  maintenance: { label: "ط·آµط¸ظ¹ط·آ§ط¸â€ ط·آ©", variant: "error" },
}

export default function ClassroomsPage() {
  const [classrooms, setClassrooms] = useState(mockClassrooms)
  const [search, setSearch] = useState("")
  const [branchFilter, setBranchFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newClassroom, setNewClassroom] = useState({ name: "", branchId: "", capacity: 25, equipment: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const loadData = useCallback(() => {
    setIsLoading(true)
    setHasError(false)
    setTimeout(() => {
      setClassrooms(mockClassrooms)
      setIsLoading(false)
    }, 1000)
  }, [])

  const stats = useMemo(() => ({
    total: classrooms.length,
    available: classrooms.filter((c) => c.status === "available").length,
    occupied: classrooms.filter((c) => c.status === "occupied").length,
    maintenance: classrooms.filter((c) => c.status === "maintenance").length,
    totalCapacity: classrooms.reduce((s, c) => s + c.capacity, 0),
  }), [classrooms])

  const filtered = useMemo(() => {
    return classrooms.filter((c) => {
      const matchSearch = c.name.includes(search)
      const matchBranch = branchFilter === "all" || c.branchId === branchFilter
      const matchStatus = statusFilter === "all" || c.status === statusFilter
      return matchSearch && matchBranch && matchStatus
    })
  }, [search, branchFilter, statusFilter, classrooms])

  const handleAddClassroom = () => {
    const classroom = {
      id: `clr-${Date.now()}`,
      name: newClassroom.name,
      branchId: newClassroom.branchId || mockBranches[0].id,
      capacity: newClassroom.capacity,
      equipment: newClassroom.equipment ? newClassroom.equipment.split(",").map((s) => s.trim()) : [],
      status: "available" as const,
    }
    setClassrooms((prev) => [classroom, ...prev])
    setShowAddModal(false)
    setNewClassroom({ name: "", branchId: "", capacity: 25, equipment: "" })
    toast.success("ط·ع¾ط¸â€¦ ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ§ط¸â€‍ط¸â€ڑط·آ§ط·آ¹ط·آ© ط·آ¨ط¸â€ ط·آ¬ط·آ§ط·آ­")
  }

  const getBranchName = (branchId: string) => mockBranches.find((b) => b.id === branchId)?.name || branchId

  if (hasError) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <DashboardHeader title="ط¸â€ڑط·آ§ط·آ¹ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·آ¯ط·آ±ط·آ§ط·آ³ط·آ©" subtitle="ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط·آ§ط¸â€‍ط¸â€ڑط·آ§ط·آ¹ط·آ§ط·ع¾ ط¸ث†ط·آ§ط¸â€‍ط¸ظ¾ط·آµط¸ث†ط¸â€‍" />
        <ErrorState onRetry={() => { setHasError(false); loadData() }} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <DashboardHeader title="ط¸â€ڑط·آ§ط·آ¹ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·آ¯ط·آ±ط·آ§ط·آ³ط·آ©" subtitle="ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط·آ§ط¸â€‍ط¸â€ڑط·آ§ط·آ¹ط·آ§ط·ع¾ ط¸ث†ط·آ§ط¸â€‍ط¸ظ¾ط·آµط¸ث†ط¸â€‍" />
      <div className="flex justify-end">
        <Button variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
          ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط¸â€ڑط·آ§ط·آ¹ط·آ©
        </Button>
      </div>

      {isLoading ? (
        <StatsSkeleton count={4} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ ط·آ§ط¸â€‍ط¸â€ڑط·آ§ط·آ¹ط·آ§ط·ع¾" value={stats.total} icon={HiOutlineAcademicCap} color="primary" subtitle={`ط·آ§ط¸â€‍ط·آ³ط·آ¹ط·آ© ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍ط¸ظ¹ط·آ©: ${stats.totalCapacity}`} />
          <StatsCard title="ط¸â€¦ط·ع¾ط·آ§ط·آ­ط·آ©" value={stats.available} icon={HiOutlineShare} color="success" />
          <StatsCard title="ط¸â€¦ط·آ´ط·ط›ط¸ث†ط¸â€‍ط·آ©" value={stats.occupied} icon={HiOutlineTable} color="warning" />
          <StatsCard title="ط·آµط¸ظ¹ط·آ§ط¸â€ ط·آ©" value={stats.maintenance} icon={HiOutlineFilter} color="error" />
        </motion.div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{viewMode === "grid" ? "ط·آ¹ط·آ±ط·آ¶ ط·آ´ط·آ¨ط¸ئ’ط¸ظ¹" : "ط·آ¹ط·آ±ط·آ¶ ط·آ¬ط·آ¯ط¸ث†ط¸â€‍ط¸ظ¹"}</CardTitle>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setViewMode("grid")} className={cn("p-2 rounded-lg transition-colors", viewMode === "grid" ? "bg-primary-100 text-primary" : "text-text-tertiary hover:text-text-secondary")}>
              <HiOutlineViewGrid className="w-5 h-5" />
            </button>
            <button type="button" onClick={() => setViewMode("table")} className={cn("p-2 rounded-lg transition-colors", viewMode === "table" ? "bg-primary-100 text-primary" : "text-text-tertiary hover:text-text-secondary")}>
              <HiOutlineTable className="w-5 h-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 border-b border-border flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <SearchInput value={search} onChange={setSearch} placeholder="ط·آ¨ط·آ­ط·آ« ط·آ¹ط¸â€  ط¸â€ڑط·آ§ط·آ¹ط·آ©..." />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select
                options={[{ value: "all", label: "ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¹ ط·آ§ط¸â€‍ط¸ظ¾ط·آ±ط¸ث†ط·آ¹" }, ...mockBranches.map((b) => ({ value: b.id, label: b.name }))]}
                value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)}
              />
              <Select
                options={[
                  { value: "all", label: "ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¹ ط·آ§ط¸â€‍ط·آ­ط·آ§ط¸â€‍ط·آ§ط·ع¾" },
                  { value: "available", label: "ط¸â€¦ط·ع¾ط·آ§ط·آ­ط·آ©" },
                  { value: "occupied", label: "ط¸â€¦ط·آ´ط·ط›ط¸ث†ط¸â€‍ط·آ©" },
                  { value: "maintenance", label: "ط·آµط¸ظ¹ط·آ§ط¸â€ ط·آ©" },
                ]}
                value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="p-4"><CardSkeleton count={3} /></div>
          ) : filtered.length === 0 ? (
            <EmptyState icon={HiOutlineAcademicCap} title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط¸â€ڑط·آ§ط·آ¹ط·آ§ط·ع¾" description="ط¸â€‍ط¸â€¦ ط¸ظ¹ط·ع¾ط¸â€¦ ط·آ§ط¸â€‍ط·آ¹ط·آ«ط¸ث†ط·آ± ط·آ¹ط¸â€‍ط¸â€° ط¸â€ڑط·آ§ط·آ¹ط·آ§ط·ع¾ ط¸â€¦ط·آ·ط·آ§ط·آ¨ط¸â€ڑط·آ© ط¸â€‍ط¸â€‍ط·آ¨ط·آ­ط·آ«" />
          ) : viewMode === "grid" ? (
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((classroom) => (
                <motion.div key={classroom.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <Card hover className="p-0" onClick={() => setExpandedId(expandedId === classroom.id ? null : classroom.id)}>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-text">{classroom.name}</h3>
                        <Badge variant={statusConfig[classroom.status].variant} size="sm">{statusConfig[classroom.status].label}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                        <HiOutlineAcademicCap className="w-4 h-4 shrink-0" />
                        <span>{getBranchName(classroom.branchId)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <HiOutlineShare className="w-4 h-4 shrink-0" />
                        <span>ط·آ§ط¸â€‍ط·آ³ط·آ¹ط·آ©: {classroom.capacity} ط¸â€¦ط¸â€ڑط·آ¹ط·آ¯</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {classroom.equipment.map((eq, i) => (
                          <Badge key={i} variant="neutral" size="sm">{eq}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 mt-3 text-xs text-text-tertiary">
                        {expandedId === classroom.id ? <HiOutlineChevronUp className="w-3.5 h-3.5" /> : <HiOutlineChevronDown className="w-3.5 h-3.5" />}
                        <span>{expandedId === classroom.id ? "ط·آ¥ط·آ®ط¸ظ¾ط·آ§ط·طŒ" : "ط·آ¹ط·آ±ط·آ¶ ط·آ§ط¸â€‍ط¸â€¦ط¸â€ڑط·آ§ط·آ¹ط·آ¯"}</span>
                      </div>
                    </div>
                    <AnimatePresence>
                      {expandedId === classroom.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-border">
                          <div className="p-4">
                            <p className="text-sm text-text-secondary mb-2">ط·ع¾ط¸ث†ط·آ²ط¸ظ¹ط·آ¹ ط·آ§ط¸â€‍ط¸â€¦ط¸â€ڑط·آ§ط·آ¹ط·آ¯ ({classroom.capacity} ط¸â€¦ط¸â€ڑط·آ¹ط·آ¯)</p>
                            <div className="grid grid-cols-5 gap-1.5">
                              {Array.from({ length: Math.min(classroom.capacity, 30) }, (_, i) => (
                                <div key={i} className={cn("w-full aspect-square rounded-md flex items-center justify-center text-[10px] font-medium", i < Math.floor(classroom.capacity * 0.7) ? "bg-success-100 text-success" : "bg-surface-secondary text-text-tertiary")}>
                                  {i + 1}
                                </div>
                              ))}
                            </div>
                            <p className="text-[10px] text-text-tertiary mt-2">* ط·آ¹ط·آ±ط·آ¶ ط·ع¾ط¸ث†ط·آ¶ط¸ظ¹ط·آ­ط¸ظ¹ ط¸â€‍ط¸â€‍ط¸â€¦ط¸â€ڑط·آ§ط·آ¹ط·آ¯</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto p-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-right px-3 py-3 font-semibold text-text-secondary">ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط¸â€ڑط·آ§ط·آ¹ط·آ©</th>
                    <th className="text-right px-3 py-3 font-semibold text-text-secondary">ط·آ§ط¸â€‍ط¸ظ¾ط·آ±ط·آ¹</th>
                    <th className="text-right px-3 py-3 font-semibold text-text-secondary">ط·آ§ط¸â€‍ط·آ³ط·آ¹ط·آ©</th>
                    <th className="text-right px-3 py-3 font-semibold text-text-secondary">ط·آ§ط¸â€‍ط·ع¾ط·آ¬ط¸â€،ط¸ظ¹ط·آ²ط·آ§ط·ع¾</th>
                    <th className="text-right px-3 py-3 font-semibold text-text-secondary">ط·آ§ط¸â€‍ط·آ­ط·آ§ط¸â€‍ط·آ©</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((classroom) => (
                    <tr key={classroom.id} className="border-b border-border last:border-0 hover:bg-surface-secondary transition-colors">
                      <td className="px-3 py-3">
                        <span className="font-medium text-text">{classroom.name}</span>
                      </td>
                      <td className="px-3 py-3 text-text-secondary">{getBranchName(classroom.branchId)}</td>
                      <td className="px-3 py-3 text-text-secondary">{classroom.capacity}</td>
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap gap-1">
                          {classroom.equipment.map((eq, i) => (
                            <Badge key={i} variant="neutral" size="sm">{eq}</Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <Badge variant={statusConfig[classroom.status].variant} size="sm">{statusConfig[classroom.status].label}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط¸â€ڑط·آ§ط·آ¹ط·آ© ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯ط·آ©" size="md">
        <div className="space-y-4">
          <Input label="ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط¸â€ڑط·آ§ط·آ¹ط·آ©" value={newClassroom.name} onChange={(e) => setNewClassroom({ ...newClassroom, name: e.target.value })} placeholder="ط·آ£ط·آ¯ط·آ®ط¸â€‍ ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط¸â€ڑط·آ§ط·آ¹ط·آ©" />
          <Select
            label="ط·آ§ط¸â€‍ط¸ظ¾ط·آ±ط·آ¹"
            options={mockBranches.map((b) => ({ value: b.id, label: b.name }))}
            value={newClassroom.branchId} onChange={(e) => setNewClassroom({ ...newClassroom, branchId: e.target.value })}
          />
          <Input label="ط·آ§ط¸â€‍ط·آ³ط·آ¹ط·آ©" type="number" value={String(newClassroom.capacity)} onChange={(e) => setNewClassroom({ ...newClassroom, capacity: Number(e.target.value) })} />
          <Input label="ط·آ§ط¸â€‍ط·ع¾ط·آ¬ط¸â€،ط¸ظ¹ط·آ²ط·آ§ط·ع¾ (ط¸â€¦ط¸ظ¾ط·آµط¸ث†ط¸â€‍ط·آ© ط·آ¨ط¸ظ¾ط¸ث†ط·آ§ط·آµط¸â€‍)" value={newClassroom.equipment} onChange={(e) => setNewClassroom({ ...newClassroom, equipment: e.target.value })} placeholder="ط¸â€¦ط·آ«ط·آ§ط¸â€‍: ط·آ³ط·آ¨ط¸ث†ط·آ±ط·آ© ط·آ°ط¸ئ’ط¸ظ¹ط·آ©, ط·آ¨ط·آ±ط¸ث†ط·آ¬ط¸ظ¹ط¸ئ’ط·ع¾ط¸ث†ط·آ±" />
          <div className="flex gap-3 pt-2">
            <Button variant="primary" className="flex-1" onClick={handleAddClassroom} disabled={!newClassroom.name}>ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ§ط¸â€‍ط¸â€ڑط·آ§ط·آ¹ط·آ©</Button>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>ط·آ¥ط¸â€‍ط·ط›ط·آ§ط·طŒ</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

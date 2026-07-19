"use client"

import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineSquare, HiOutlinePlus, HiOutlineFilter, HiOutlineTable,
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
  available: { label: "ظ…طھط§ط­ط©", variant: "success" },
  occupied: { label: "ظ…ط´ط؛ظˆظ„ط©", variant: "warning" },
  maintenance: { label: "طµظٹط§ظ†ط©", variant: "error" },
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
    toast.success("طھظ… ط¥ط¶ط§ظپط© ط§ظ„ظ‚ط§ط¹ط© ط¨ظ†ط¬ط§ط­")
  }

  const getBranchName = (branchId: string) => mockBranches.find((b) => b.id === branchId)?.name || branchId

  if (hasError) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <DashboardHeader title="ظ‚ط§ط¹ط§طھ ط§ظ„ط¯ط±ط§ط³ط©" subtitle="ط¥ط¯ط§ط±ط© ط§ظ„ظ‚ط§ط¹ط§طھ ظˆط§ظ„ظپطµظˆظ„" />
        <ErrorState onRetry={() => { setHasError(false); loadData() }} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <DashboardHeader title="ظ‚ط§ط¹ط§طھ ط§ظ„ط¯ط±ط§ط³ط©" subtitle="ط¥ط¯ط§ط±ط© ط§ظ„ظ‚ط§ط¹ط§طھ ظˆط§ظ„ظپطµظˆظ„" />
      <div className="flex justify-end">
        <button type="button" variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
          ط¥ط¶ط§ظپط© ظ‚ط§ط¹ط©
        </Button>
      </div>

      {isLoading ? (
        <StatsSkeleton count={4} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظ‚ط§ط¹ط§طھ" value={stats.total} icon={HiOutlineAcademicCap} color="primary" subtitle={`ط§ظ„ط³ط¹ط© ط§ظ„ظƒظ„ظٹط©: ${stats.totalCapacity}`} />
          <StatsCard title="ظ…طھط§ط­ط©" value={stats.available} icon={HiOutlineSquare} color="success" />
          <StatsCard title="ظ…ط´ط؛ظˆظ„ط©" value={stats.occupied} icon={HiOutlineTable} color="warning" />
          <StatsCard title="طµظٹط§ظ†ط©" value={stats.maintenance} icon={HiOutlineFilter} color="error" />
        </motion.div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{viewMode === "grid" ? "ط¹ط±ط¶ ط´ط¨ظƒظٹ" : "ط¹ط±ط¶ ط¬ط¯ظˆظ„ظٹ"}</CardTitle>
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
              <SearchInput value={search} onChange={setSearch} placeholder="ط¨ط­ط« ط¹ظ† ظ‚ط§ط¹ط©..." />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select
                options={[{ value: "all", label: "ط¬ظ…ظٹط¹ ط§ظ„ظپط±ظˆط¹" }, ...mockBranches.map((b) => ({ value: b.id, label: b.name }))]}
                value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)}
              />
              <Select
                options={[
                  { value: "all", label: "ط¬ظ…ظٹط¹ ط§ظ„ط­ط§ظ„ط§طھ" },
                  { value: "available", label: "ظ…طھط§ط­ط©" },
                  { value: "occupied", label: "ظ…ط´ط؛ظˆظ„ط©" },
                  { value: "maintenance", label: "طµظٹط§ظ†ط©" },
                ]}
                value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="p-4"><CardSkeleton count={3} /></div>
          ) : filtered.length === 0 ? (
            <EmptyState icon={HiOutlineAcademicCap} title="ظ„ط§ طھظˆط¬ط¯ ظ‚ط§ط¹ط§طھ" description="ظ„ظ… ظٹطھظ… ط§ظ„ط¹ط«ظˆط± ط¹ظ„ظ‰ ظ‚ط§ط¹ط§طھ ظ…ط·ط§ط¨ظ‚ط© ظ„ظ„ط¨ط­ط«" />
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
                        <HiOutlineSquare className="w-4 h-4 shrink-0" />
                        <span>ط§ظ„ط³ط¹ط©: {classroom.capacity} ظ…ظ‚ط¹ط¯</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {classroom.equipment.map((eq, i) => (
                          <Badge key={i} variant="neutral" size="sm">{eq}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 mt-3 text-xs text-text-tertiary">
                        {expandedId === classroom.id ? <HiOutlineChevronUp className="w-3.5 h-3.5" /> : <HiOutlineChevronDown className="w-3.5 h-3.5" />}
                        <span>{expandedId === classroom.id ? "ط¥ط®ظپط§ط،" : "ط¹ط±ط¶ ط§ظ„ظ…ظ‚ط§ط¹ط¯"}</span>
                      </div>
                    </div>
                    <AnimatePresence>
                      {expandedId === classroom.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-border">
                          <div className="p-4">
                            <p className="text-sm text-text-secondary mb-2">طھظˆط²ظٹط¹ ط§ظ„ظ…ظ‚ط§ط¹ط¯ ({classroom.capacity} ظ…ظ‚ط¹ط¯)</p>
                            <div className="grid grid-cols-5 gap-1.5">
                              {Array.from({ length: Math.min(classroom.capacity, 30) }, (_, i) => (
                                <div key={i} className={cn("w-full aspect-square rounded-md flex items-center justify-center text-[10px] font-medium", i < Math.floor(classroom.capacity * 0.7) ? "bg-success-100 text-success" : "bg-surface-secondary text-text-tertiary")}>
                                  {i + 1}
                                </div>
                              ))}
                            </div>
                            <p className="text-[10px] text-text-tertiary mt-2">* ط¹ط±ط¶ طھظˆط¶ظٹط­ظٹ ظ„ظ„ظ…ظ‚ط§ط¹ط¯</p>
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
                    <th className="text-right px-3 py-3 font-semibold text-text-secondary">ط§ط³ظ… ط§ظ„ظ‚ط§ط¹ط©</th>
                    <th className="text-right px-3 py-3 font-semibold text-text-secondary">ط§ظ„ظپط±ط¹</th>
                    <th className="text-right px-3 py-3 font-semibold text-text-secondary">ط§ظ„ط³ط¹ط©</th>
                    <th className="text-right px-3 py-3 font-semibold text-text-secondary">ط§ظ„طھط¬ظ‡ظٹط²ط§طھ</th>
                    <th className="text-right px-3 py-3 font-semibold text-text-secondary">ط§ظ„ط­ط§ظ„ط©</th>
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

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="ط¥ط¶ط§ظپط© ظ‚ط§ط¹ط© ط¬ط¯ظٹط¯ط©" size="md">
        <div className="space-y-4">
          <Input label="ط§ط³ظ… ط§ظ„ظ‚ط§ط¹ط©" value={newClassroom.name} onChange={(e) => setNewClassroom({ ...newClassroom, name: e.target.value })} placeholder="ط£ط¯ط®ظ„ ط§ط³ظ… ط§ظ„ظ‚ط§ط¹ط©" />
          <Select
            label="ط§ظ„ظپط±ط¹"
            options={mockBranches.map((b) => ({ value: b.id, label: b.name }))}
            value={newClassroom.branchId} onChange={(e) => setNewClassroom({ ...newClassroom, branchId: e.target.value })}
          />
          <Input label="ط§ظ„ط³ط¹ط©" type="number" value={String(newClassroom.capacity)} onChange={(e) => setNewClassroom({ ...newClassroom, capacity: Number(e.target.value) })} />
          <Input label="ط§ظ„طھط¬ظ‡ظٹط²ط§طھ (ظ…ظپطµظˆظ„ط© ط¨ظپظˆط§طµظ„)" value={newClassroom.equipment} onChange={(e) => setNewClassroom({ ...newClassroom, equipment: e.target.value })} placeholder="ظ…ط«ط§ظ„: ط³ط¨ظˆط±ط© ط°ظƒظٹط©, ط¨ط±ظˆط¬ظٹظƒطھظˆط±" />
          <div className="flex gap-3 pt-2">
            <button type="button" variant="primary" className="flex-1" onClick={handleAddClassroom} disabled={!newClassroom.name}>ط¥ط¶ط§ظپط© ط§ظ„ظ‚ط§ط¹ط©</Button>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>ط¥ظ„ط؛ط§ط،</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

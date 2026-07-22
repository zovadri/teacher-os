"use client"

import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineShare, HiOutlinePlus, HiOutlineFilter, HiOutlineTable,
  HiOutlineViewGrid, HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineAcademicCap,
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
import { Skeleton, CardSkeleton, StatsSkeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { cn } from "@/lib/utils"
import { mockClassrooms, mockBranches } from "@/lib/mock/data"

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "error" }> = {
  available: { label: "متاحة", variant: "success" },
  occupied: { label: "مشغولة", variant: "warning" },
  maintenance: { label: "صيانة", variant: "error" },
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
    toast.success("تم إضافة القاعة بنجاح")
  }

  const getBranchName = (branchId: string) => mockBranches.find((b) => b.id === branchId)?.name || branchId

  if (hasError) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <PageHeader title="قاعات الدراسة" description="إدارة القاعات والفصول" />
        <ErrorState onRetry={() => { setHasError(false); loadData() }} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <PageHeader title="قاعات الدراسة" description="إدارة القاعات والفصول" />
      <div className="flex justify-end">
        <Button variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
          إضافة قاعة
        </Button>
      </div>

      {isLoading ? (
        <StatsSkeleton count={4} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="إجمالي القاعات" value={stats.total} icon={HiOutlineAcademicCap} color="primary" subtitle={`السعة الكلية: ${stats.totalCapacity}`} />
          <StatsCard title="متاحة" value={stats.available} icon={HiOutlineShare} color="success" />
          <StatsCard title="مشغولة" value={stats.occupied} icon={HiOutlineTable} color="warning" />
          <StatsCard title="صيانة" value={stats.maintenance} icon={HiOutlineFilter} color="error" />
        </motion.div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{viewMode === "grid" ? "عرض شبكي" : "عرض جدولي"}</CardTitle>
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
              <SearchInput value={search} onChange={setSearch} placeholder="بحث عن قاعة..." />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select
                options={[{ value: "all", label: "جميع الفروع" }, ...mockBranches.map((b) => ({ value: b.id, label: b.name }))]}
                value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)}
              />
              <Select
                options={[
                  { value: "all", label: "جميع الحالات" },
                  { value: "available", label: "متاحة" },
                  { value: "occupied", label: "مشغولة" },
                  { value: "maintenance", label: "صيانة" },
                ]}
                value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="p-4"><CardSkeleton count={3} /></div>
          ) : filtered.length === 0 ? (
            <EmptyState icon={HiOutlineAcademicCap} title="لا توجد قاعات" description="لم يتم العثور على قاعات مطابقة للبحث" />
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
                        <span>السعة: {classroom.capacity} مقعد</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {classroom.equipment.map((eq, i) => (
                          <Badge key={i} variant="default" size="sm">{eq}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 mt-3 text-xs text-text-tertiary">
                        {expandedId === classroom.id ? <HiOutlineChevronUp className="w-3.5 h-3.5" /> : <HiOutlineChevronDown className="w-3.5 h-3.5" />}
                        <span>{expandedId === classroom.id ? "إخفاء" : "عرض المقاعد"}</span>
                      </div>
                    </div>
                    <AnimatePresence>
                      {expandedId === classroom.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-border">
                          <div className="p-4">
                            <p className="text-sm text-text-secondary mb-2">توزيع المقاعد ({classroom.capacity} مقعد)</p>
                            <div className="grid grid-cols-5 gap-1.5">
                              {Array.from({ length: Math.min(classroom.capacity, 30) }, (_, i) => (
                                <div key={i} className={cn("w-full aspect-square rounded-md flex items-center justify-center text-[10px] font-medium", i < Math.floor(classroom.capacity * 0.7) ? "bg-success-100 text-success" : "bg-surface-secondary text-text-tertiary")}>
                                  {i + 1}
                                </div>
                              ))}
                            </div>
                            <p className="text-[10px] text-text-tertiary mt-2">* عرض توضيحي للمقاعد</p>
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
                    <th className="text-right px-3 py-3 font-semibold text-text-secondary">اسم القاعة</th>
                    <th className="text-right px-3 py-3 font-semibold text-text-secondary">الفرع</th>
                    <th className="text-right px-3 py-3 font-semibold text-text-secondary">السعة</th>
                    <th className="text-right px-3 py-3 font-semibold text-text-secondary">التجهيزات</th>
                    <th className="text-right px-3 py-3 font-semibold text-text-secondary">الحالة</th>
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
                            <Badge key={i} variant="default" size="sm">{eq}</Badge>
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

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="إضافة قاعة جديدة" size="md">
        <div className="space-y-4">
          <Input label="اسم القاعة" value={newClassroom.name} onChange={(e) => setNewClassroom({ ...newClassroom, name: e.target.value })} placeholder="أدخل اسم القاعة" />
          <Select
            label="الفرع"
            options={mockBranches.map((b) => ({ value: b.id, label: b.name }))}
            value={newClassroom.branchId} onChange={(e) => setNewClassroom({ ...newClassroom, branchId: e.target.value })}
          />
          <Input label="السعة" type="number" value={String(newClassroom.capacity)} onChange={(e) => setNewClassroom({ ...newClassroom, capacity: Number(e.target.value) })} />
          <Input label="التجهيزات (مفصولة بفواصل)" value={newClassroom.equipment} onChange={(e) => setNewClassroom({ ...newClassroom, equipment: e.target.value })} placeholder="مثال: سبورة ط°ظƒية, بروجيكتور" />
          <div className="flex gap-3 pt-2">
            <Button variant="primary" className="flex-1" onClick={handleAddClassroom} disabled={!newClassroom.name}>إضافة القاعة</Button>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>إلغاء</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

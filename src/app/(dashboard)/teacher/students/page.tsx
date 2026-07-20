"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlinePhone,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineUserGroup,
  HiOutlineChevronRight,
  HiOutlineChevronLeft,
  HiOutlineUsers,
  HiOutlineAcademicCap,
  HiOutlineStar,
  HiOutlineUserAdd,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Badge } from "@/components/ui/Badge"
import { Table } from "@/components/ui/Table"
import { Modal } from "@/components/ui/Modal"
import { StatsCard } from "@/components/ui/StatsCard"
import { Pagination } from "@/components/ui/Pagination"
import { SearchInput } from "@/components/ui/SearchInput"
import { BulkActions } from "@/components/student/BulkActions"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import { mockStudents } from "@/lib/mock/data"
import { EmptyState } from "@/components/ui/EmptyState"
import { cn, generateId } from "@/lib/utils"
import toast from "react-hot-toast"

const statusBadge: Record<string, "success" | "warning" | "error" | "neutral"> = {
  active: "success",
  inactive: "warning",
  expired: "error",
  suspended: "neutral",
}

const subscriptionBadge: Record<string, "success" | "error" | "warning"> = {
  active: "success",
  expired: "error",
  pending: "warning",
}

const statusLabels: Record<string, string> = {
  active: "ظ†ط´ط·",
  inactive: "ط؛ظٹط± ظ†ط´ط·",
  expired: "ظ…ظ†طھظ‡ظٹ",
  suspended: "ظ…ظˆظ‚ظˆظپ",
}

const grades = ["ط§ظ„ظƒظ„", "ط£ظˆظ„ظ‰ ط«ط§ظ†ظˆظٹ", "ط«ط§ظ†ظٹط© ط«ط§ظ†ظˆظٹ", "ط«ط§ظ„ط«ط© ط«ط§ظ†ظˆظٹ"]
const groups = ["ط§ظ„ظƒظ„", "ظ…ط¬ظ…ظˆط¹ط© A", "ظ…ط¬ظ…ظˆط¹ط© B", "ظ…ط¬ظ…ظˆط¹ط© C"]
const statuses = ["ط§ظ„ظƒظ„", "active", "inactive", "expired", "suspended"]
const governorates = ["ط§ظ„ظƒظ„", "ط§ظ„ظ‚ط§ظ‡ط±ط©", "ط§ظ„ط¬ظٹط²ط©", "ط§ظ„ط¥ط³ظƒظ†ط¯ط±ظٹط©"]

const PAGE_SIZE = 10

export default function StudentsPage() {
  const [search, setSearch] = useState("")
  const [gradeFilter, setGradeFilter] = useState("ط§ظ„ظƒظ„")
  const [groupFilter, setGroupFilter] = useState("ط§ظ„ظƒظ„")
  const [statusFilter, setStatusFilter] = useState("ط§ظ„ظƒظ„")
  const [govFilter, setGovFilter] = useState("ط§ظ„ظƒظ„")
  const [page, setPage] = useState(1)
  const [students, setStudents] = useState(mockStudents)
  const [selectedStudent, setSelectedStudent] = useState<(typeof mockStudents)[0] | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [createForm, setCreateForm] = useState({ name: "", email: "", phone: "", grade: "", parentName: "", parentPhone: "" })

  const stats = useMemo(() => ({
    total: students.length,
    active: students.filter((s) => s.status === "active").length,
    expired: students.filter((s) => s.status === "expired").length,
    inactive: students.filter((s) => s.status === "inactive").length,
  }), [students])

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchSearch = s.name.includes(search) || s.phone.includes(search)
      const matchGrade = gradeFilter === "ط§ظ„ظƒظ„" || s.grade === gradeFilter
      const matchGroup = groupFilter === "ط§ظ„ظƒظ„" || s.group === groupFilter
      const matchStatus = statusFilter === "ط§ظ„ظƒظ„" || s.status === statusFilter
      const matchGov = govFilter === "ط§ظ„ظƒظ„" || s.governorate === govFilter
      return matchSearch && matchGrade && matchGroup && matchStatus && matchGov
    })
  }, [search, gradeFilter, groupFilter, statusFilter, govFilter, students])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="ط§ظ„ط·ظ„ط§ط¨" subtitle="ط¹ط±ط¶ ظˆط¥ط¯ط§ط±ط© ط¬ظ…ظٹط¹ ط§ظ„ط·ظ„ط§ط¨" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط·ظ„ط§ط¨" value={stats.total} icon={HiOutlineUsers} color="primary" />
        <StatsCard title="ط§ظ„ط·ظ„ط§ط¨ ط§ظ„ظ†ط´ط·ظˆظ†" value={stats.active} icon={HiOutlineAcademicCap} color="success" />
        <StatsCard title="ظ…ظ†طھظ‡ظٹ ط§ط´طھط±ط§ظƒظ‡ظ…" value={stats.expired} icon={HiOutlineUserGroup} color="error" />
        <StatsCard title="ط؛ظٹط± ظ†ط´ط·" value={stats.inactive} icon={HiOutlineUserGroup} color="warning" />
      </div>

      <BulkActions
        selectedCount={selectedIds.size}
        onClear={() => setSelectedIds(new Set())}
        onMoveToGroup={(g) => { toast.success(`طھظ… ظ†ظ‚ظ„ ${selectedIds.size} ط·ط§ظ„ط¨ ط¥ظ„ظ‰ ط§ظ„ظ…ط¬ظ…ظˆط¹ط© ${g}`); setSelectedIds(new Set()) }}
        onChangeStatus={(s) => { toast.success(`طھظ… طھط؛ظٹظٹط± ط­ط§ظ„ط© ${selectedIds.size} ط·ط§ظ„ط¨`); setSelectedIds(new Set()) }}
        onSendMessage={() => toast.success("طھظ… ط¥ط±ط³ط§ظ„ ط§ظ„ط±ط³ط§ظ„ط© ط¨ظ†ط¬ط§ط­")}
        onPrint={() => toast.success("ط¬ط§ط±ظٹ طھط¬ظ‡ظٹط² ط§ظ„ط·ط¨ط§ط¹ط©")}
        onExportExcel={() => toast.success("ط¬ط§ط±ظٹ طھطµط¯ظٹط± ط§ظ„ط¨ظٹط§ظ†ط§طھ")}
      />

      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 flex items-center gap-3">
          <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1) }} placeholder="ط¨ط­ط« ط¨ط§ظ„ط§ط³ظ… ط£ظˆ ط±ظ‚ظ… ط§ظ„ظ‡ط§طھظپ..." />
          <Button variant="primary" leftIcon={<HiOutlineUserAdd size={18} />} onClick={() => setShowCreateModal(true)}>
            ط¥ط¶ط§ظپط© ط·ط§ظ„ط¨ ط¬ط¯ظٹط¯
          </Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <select value={gradeFilter} onChange={(e) => { setGradeFilter(e.target.value); setPage(1) }}
            className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer">
            {grades.map((g) => <option key={g} value={g}>{g === "ط§ظ„ظƒظ„" ? "ط¬ظ…ظٹط¹ ط§ظ„طµظپظˆظپ" : g}</option>)}
          </select>
          <select value={groupFilter} onChange={(e) => { setGroupFilter(e.target.value); setPage(1) }}
            className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer">
            {groups.map((g) => <option key={g} value={g}>{g === "ط§ظ„ظƒظ„" ? "ط¬ظ…ظٹط¹ ط§ظ„ظ…ط¬ظ…ظˆط¹ط§طھ" : g}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
            className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer">
            {statuses.map((s) => <option key={s} value={s}>{s === "ط§ظ„ظƒظ„" ? "ط¬ظ…ظٹط¹ ط§ظ„ط­ط§ظ„ط§طھ" : statusLabels[s]}</option>)}
          </select>
          <select value={govFilter} onChange={(e) => { setGovFilter(e.target.value); setPage(1) }}
            className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer">
            {governorates.map((g) => <option key={g} value={g}>{g === "ط§ظ„ظƒظ„" ? "ط¬ظ…ظٹط¹ ط§ظ„ظ…ط­ط§ظپط¸ط§طھ" : g}</option>)}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={HiOutlineUsers}
          title="ظ„ط§ ظٹظˆط¬ط¯ ط·ظ„ط§ط¨"
          description="ظ„ظ… ظٹطھظ… ط§ظ„ط¹ط«ظˆط± ط¹ظ„ظ‰ ط·ظ„ط§ط¨ ظ…ط·ط§ط¨ظ‚ظٹظ† ظ„ظ…ط¹ط§ظٹظٹط± ط§ظ„ط¨ط­ط«"
        />
      ) : (
        <>
          <Table
            columns={[
              { key: "select", header: "", render: (s) => (
                <div className="flex items-center justify-center" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedIds.has(s.id)}
                    onChange={() => {
                      const next = new Set(selectedIds)
                      if (next.has(s.id)) next.delete(s.id)
                      else next.add(s.id)
                      setSelectedIds(next)
                    }}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 cursor-pointer"
                  />
                </div>
              )},
              { key: "name", header: "ط§ظ„ط·ط§ظ„ط¨", render: (s) => (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 overflow-hidden shrink-0">
                    <img src={s.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text truncate">{s.name}</p>
                    <p className="text-xs text-text-tertiary truncate">{s.email}</p>
                  </div>
                </div>
              )},
              { key: "phone", header: "ط±ظ‚ظ… ط§ظ„ظ‡ط§طھظپ", render: (s) => (
                <div className="flex items-center gap-1.5 text-sm text-text-secondary" dir="ltr">
                  <HiOutlinePhone size={14} className="text-text-tertiary shrink-0" />
                  <span>{s.phone}</span>
                </div>
              )},
              { key: "grade", header: "ط§ظ„طµظپ" },
              { key: "group", header: "ط§ظ„ظ…ط¬ظ…ظˆط¹ط©" },
              { key: "status", header: "ط§ظ„ط­ط§ظ„ط©", render: (s) => (
                <Badge variant={statusBadge[s.status] || "neutral"}>{statusLabels[s.status] || s.status}</Badge>
              )},
              { key: "subscription", header: "ط§ظ„ط§ط´طھط±ط§ظƒ", render: (s) => (
                <Badge variant={subscriptionBadge[s.subscription.status] || "neutral"} size="sm">
                  {s.subscription.status === "active" ? "ظ†ط´ط·" : s.subscription.status === "expired" ? "ظ…ظ†طھظ‡ظٹ" : "ظ…ط¹ظ„ظ‚"}
                </Badge>
              )},
              { key: "xp", header: "ط§ظ„ظ†ظ‚ط§ط·/ط§ظ„ظ…ط³طھظˆظ‰", render: (s) => (
                <div className="flex items-center gap-1.5 text-sm">
                  <HiOutlineStar size={14} className="text-warning" />
                  <span className="font-medium text-text">{s.xp} XP</span>
                  <span className="text-text-tertiary">ظ…ط³طھظˆظ‰ {s.level}</span>
                </div>
              )},
              { key: "actions", header: "", render: (s) => (
                <div className="flex items-center gap-1">
                  <Link href={`/teacher/students/${s.id}`}>
                    <button type="button" className="px-2.5 py-1.5 text-xs font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors" title="ط¹ط±ط¶ ط§ظ„ظ…ظ„ظپ">
                      ط¹ط±ط¶ ط§ظ„ظ…ظ„ظپ
                    </button>
                  </Link>
                  <button type="button" onClick={() => setSelectedStudent(s)} className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="ط¹ط±ط¶">
                    <HiOutlineEye size={16} />
                  </button>
                  <button type="button" className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="طھط¹ط¯ظٹظ„">
                    <HiOutlinePencil size={16} />
                  </button>
                  <button type="button" className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors" title="ط­ط°ظپ">
                    <HiOutlineTrash size={16} />
                  </button>
                </div>
              )},
            ]}
            data={paginated}
            onRowClick={(s) => setSelectedStudent(s)}
          />

          {totalPages > 1 && (
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          )}
        </>
      )}

      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="ط¥ط¶ط§ظپط© ط·ط§ظ„ط¨ ط¬ط¯ظٹط¯" id="createStudentModal">
        <div className="space-y-4">
          <Input label="ط§ط³ظ… ط§ظ„ط·ط§ظ„ط¨" value={createForm.name} onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })} placeholder="ط£ط¯ط®ظ„ ط§ط³ظ… ط§ظ„ط·ط§ظ„ط¨" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="ط§ظ„ط¨ط±ظٹط¯ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹ" value={createForm.email} onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })} placeholder="ط§ظ„ط¨ط±ظٹط¯ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹ" />
            <Input label="ط±ظ‚ظ… ط§ظ„ظ‡ط§طھظپ" value={createForm.phone} onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })} placeholder="ط±ظ‚ظ… ط§ظ„ظ‡ط§طھظپ" />
          </div>
          <Select
            label="ط§ظ„طµظپ ط§ظ„ط¯ط±ط§ط³ظٹ"
            options={["ط£ظˆظ„ظ‰ ط«ط§ظ†ظˆظٹ", "ط«ط§ظ†ظٹط© ط«ط§ظ†ظˆظٹ", "ط«ط§ظ„ط«ط© ط«ط§ظ†ظˆظٹ"].map((g) => ({ value: g, label: g }))}
            value={createForm.grade}
            onChange={(e) => setCreateForm({ ...createForm, grade: e.target.value })}
            placeholder="ط§ط®طھط± ط§ظ„طµظپ"
          />
          <div className="grid grid-cols-2 gap-3">
            <Input label="ط§ط³ظ… ظˆظ„ظٹ ط§ظ„ط£ظ…ط±" value={createForm.parentName} onChange={(e) => setCreateForm({ ...createForm, parentName: e.target.value })} placeholder="ط§ط³ظ… ظˆظ„ظٹ ط§ظ„ط£ظ…ط±" />
            <Input label="ط±ظ‚ظ… ظˆظ„ظٹ ط§ظ„ط£ظ…ط±" value={createForm.parentPhone} onChange={(e) => setCreateForm({ ...createForm, parentPhone: e.target.value })} placeholder="ط±ظ‚ظ… ظˆظ„ظٹ ط§ظ„ط£ظ…ط±" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="primary" className="flex-1" onClick={() => {
              const newStudent = {
                id: generateId(),
                name: createForm.name,
                email: createForm.email,
                phone: createForm.phone,
                parentPhone: createForm.parentPhone,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${generateId()}`,
                grade: createForm.grade,
                group: "",
                school: "",
                governorate: "",
                city: "",
                gender: "male" as const,
                birthDate: new Date(),
                status: "active" as const,
                subscription: {
                  status: "active" as const,
                  planName: "",
                  startDate: new Date(),
                  endDate: new Date(),
                },
                xp: 0,
                level: 1,
                streak: 0,
              }
              setStudents((prev) => [newStudent, ...prev])
              setShowCreateModal(false)
              setCreateForm({ name: "", email: "", phone: "", grade: "", parentName: "", parentPhone: "" })
              toast.success("طھظ… ط¥ط¶ط§ظپط© ط§ظ„ط·ط§ظ„ط¨ ط¨ظ†ط¬ط§ط­")
            }}>
              ط¥ط¶ط§ظپط© ط·ط§ظ„ط¨ ط¬ط¯ظٹط¯
            </Button>
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>ط¥ظ„ط؛ط§ط،</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!selectedStudent} onClose={() => setSelectedStudent(null)} title="ط¨ظٹط§ظ†ط§طھ ط§ظ„ط·ط§ظ„ط¨" size="lg">
        {selectedStudent && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 overflow-hidden">
                <img src={selectedStudent.avatar} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text">{selectedStudent.name}</h3>
                <p className="text-sm text-text-secondary">{selectedStudent.grade} آ· {selectedStudent.governorate}</p>
              </div>
              <div className="mr-auto">
                <Badge variant={statusBadge[selectedStudent.status]} size="md">
                  {statusLabels[selectedStudent.status]}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">ط§ظ„ط¨ط±ظٹط¯ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹ</p>
                <p className="text-sm text-text font-medium" dir="ltr">{selectedStudent.email}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">ط±ظ‚ظ… ط§ظ„ظ‡ط§طھظپ</p>
                <p className="text-sm text-text font-medium" dir="ltr">{selectedStudent.phone}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">ط§ظ„ظ…ط¬ظ…ظˆط¹ط©</p>
                <p className="text-sm text-text font-medium">{selectedStudent.group}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">ط§ظ„ظ…ط­ط§ظپط¸ط©</p>
                <p className="text-sm text-text font-medium">{selectedStudent.governorate}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">ط¨ط§ظ‚ط© ط§ظ„ط§ط´طھط±ط§ظƒ</p>
                <p className="text-sm text-text font-medium">{selectedStudent.subscription.planName}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">ط§ظ„ظ†ظ‚ط§ط· ظˆط§ظ„ظ…ط³طھظˆظ‰</p>
                <p className="text-sm text-text font-medium">{selectedStudent.xp} XP آ· ظ…ط³طھظˆظ‰ {selectedStudent.level}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">طھط§ط±ظٹط® ط¨ط¯ط§ظٹط© ط§ظ„ط§ط´طھط±ط§ظƒ</p>
                <p className="text-sm text-text font-medium">{selectedStudent.subscription.startDate.toLocaleDateString("ar-EG")}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">طھط§ط±ظٹط® ظ†ظ‡ط§ظٹط© ط§ظ„ط§ط´طھط±ط§ظƒ</p>
                <p className="text-sm text-text font-medium">{selectedStudent.subscription.endDate.toLocaleDateString("ar-EG")}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button type="button" className="flex-1 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors">
                طھط¹ط¯ظٹظ„ ط¨ظٹط§ظ†ط§طھ ط§ظ„ط·ط§ظ„ط¨
              </button>
              <button type="button" className="px-4 py-2.5 border border-border text-text-secondary text-sm font-medium rounded-xl hover:bg-surface-tertiary transition-colors">
                ط¥ط±ط³ط§ظ„ ط±ط³ط§ظ„ط©
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
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
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Badge } from "@/components/ui/Badge"
import { Table } from "@/components/ui/Table"
import { Modal } from "@/components/ui/Modal"
import { StatsCard } from "@/components/ui/StatsCard"
import { Pagination } from "@/components/ui/Pagination"
import { SearchInput } from "@/components/ui/SearchInput"
import { mockStudents } from "@/lib/mock/data"
import { cn } from "@/lib/utils"

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
  active: "نشط",
  inactive: "غير نشط",
  expired: "منتهي",
  suspended: "موقوف",
}

const grades = ["الكل", "أولى ثانوي", "ثانية ثانوي", "ثالثة ثانوي"]
const groups = ["الكل", "مجموعة A", "مجموعة B", "مجموعة C"]
const statuses = ["الكل", "active", "inactive", "expired", "suspended"]
const governorates = ["الكل", "القاهرة", "الجيزة", "الإسكندرية"]

const PAGE_SIZE = 10

export default function StudentsPage() {
  const [search, setSearch] = useState("")
  const [gradeFilter, setGradeFilter] = useState("الكل")
  const [groupFilter, setGroupFilter] = useState("الكل")
  const [statusFilter, setStatusFilter] = useState("الكل")
  const [govFilter, setGovFilter] = useState("الكل")
  const [page, setPage] = useState(1)
  const [selectedStudent, setSelectedStudent] = useState<(typeof mockStudents)[0] | null>(null)

  const stats = useMemo(() => ({
    total: mockStudents.length,
    active: mockStudents.filter((s) => s.status === "active").length,
    expired: mockStudents.filter((s) => s.status === "expired").length,
    inactive: mockStudents.filter((s) => s.status === "inactive").length,
  }), [])

  const filtered = useMemo(() => {
    return mockStudents.filter((s) => {
      const matchSearch = s.name.includes(search) || s.phone.includes(search)
      const matchGrade = gradeFilter === "الكل" || s.grade === gradeFilter
      const matchGroup = groupFilter === "الكل" || s.group === groupFilter
      const matchStatus = statusFilter === "الكل" || s.status === statusFilter
      const matchGov = govFilter === "الكل" || s.governorate === govFilter
      return matchSearch && matchGrade && matchGroup && matchStatus && matchGov
    })
  }, [search, gradeFilter, groupFilter, statusFilter, govFilter])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="الطلاب" subtitle="عرض وإدارة جميع الطلاب" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="إجمالي الطلاب" value={stats.total} icon={HiOutlineUsers} color="primary" />
        <StatsCard title="الطلاب النشطون" value={stats.active} icon={HiOutlineAcademicCap} color="success" />
        <StatsCard title="منتهي اشتراكهم" value={stats.expired} icon={HiOutlineUserGroup} color="error" />
        <StatsCard title="غير نشط" value={stats.inactive} icon={HiOutlineUserGroup} color="warning" />
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1) }} placeholder="بحث بالاسم أو رقم الهاتف..." />
        </div>
        <div className="flex flex-wrap gap-3">
          <select value={gradeFilter} onChange={(e) => { setGradeFilter(e.target.value); setPage(1) }}
            className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer">
            {grades.map((g) => <option key={g} value={g}>{g === "الكل" ? "جميع الصفوف" : g}</option>)}
          </select>
          <select value={groupFilter} onChange={(e) => { setGroupFilter(e.target.value); setPage(1) }}
            className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer">
            {groups.map((g) => <option key={g} value={g}>{g === "الكل" ? "جميع المجموعات" : g}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
            className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer">
            {statuses.map((s) => <option key={s} value={s}>{s === "الكل" ? "جميع الحالات" : statusLabels[s]}</option>)}
          </select>
          <select value={govFilter} onChange={(e) => { setGovFilter(e.target.value); setPage(1) }}
            className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer">
            {governorates.map((g) => <option key={g} value={g}>{g === "الكل" ? "جميع المحافظات" : g}</option>)}
          </select>
        </div>
      </div>

      <Table
        columns={[
          { key: "name", header: "الطالب", render: (s) => (
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
          { key: "phone", header: "رقم الهاتف", render: (s) => (
            <div className="flex items-center gap-1.5 text-sm text-text-secondary" dir="ltr">
              <HiOutlinePhone size={14} className="text-text-tertiary shrink-0" />
              <span>{s.phone}</span>
            </div>
          )},
          { key: "grade", header: "الصف" },
          { key: "group", header: "المجموعة" },
          { key: "status", header: "الحالة", render: (s) => (
            <Badge variant={statusBadge[s.status] || "neutral"}>{statusLabels[s.status] || s.status}</Badge>
          )},
          { key: "subscription", header: "الاشتراك", render: (s) => (
            <Badge variant={subscriptionBadge[s.subscription.status] || "neutral"} size="sm">
              {s.subscription.status === "active" ? "نشط" : s.subscription.status === "expired" ? "منتهي" : "معلق"}
            </Badge>
          )},
          { key: "xp", header: "النقاط/المستوى", render: (s) => (
            <div className="flex items-center gap-1.5 text-sm">
              <HiOutlineStar size={14} className="text-warning" />
              <span className="font-medium text-text">{s.xp} XP</span>
              <span className="text-text-tertiary">مستوى {s.level}</span>
            </div>
          )},
          { key: "actions", header: "", render: (s) => (
            <div className="flex items-center gap-1">
              <button onClick={() => setSelectedStudent(s)} className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="عرض">
                <HiOutlineEye size={16} />
              </button>
              <button className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="تعديل">
                <HiOutlinePencil size={16} />
              </button>
              <button className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors" title="حذف">
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

      <Modal isOpen={!!selectedStudent} onClose={() => setSelectedStudent(null)} title="بيانات الطالب" size="lg">
        {selectedStudent && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 overflow-hidden">
                <img src={selectedStudent.avatar} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text">{selectedStudent.name}</h3>
                <p className="text-sm text-text-secondary">{selectedStudent.grade} · {selectedStudent.governorate}</p>
              </div>
              <div className="mr-auto">
                <Badge variant={statusBadge[selectedStudent.status]} size="md">
                  {statusLabels[selectedStudent.status]}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">البريد الإلكتروني</p>
                <p className="text-sm text-text font-medium" dir="ltr">{selectedStudent.email}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">رقم الهاتف</p>
                <p className="text-sm text-text font-medium" dir="ltr">{selectedStudent.phone}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">المجموعة</p>
                <p className="text-sm text-text font-medium">{selectedStudent.group}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">المحافظة</p>
                <p className="text-sm text-text font-medium">{selectedStudent.governorate}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">باقة الاشتراك</p>
                <p className="text-sm text-text font-medium">{selectedStudent.subscription.planName}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">النقاط والمستوى</p>
                <p className="text-sm text-text font-medium">{selectedStudent.xp} XP · مستوى {selectedStudent.level}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">تاريخ بداية الاشتراك</p>
                <p className="text-sm text-text font-medium">{selectedStudent.subscription.startDate.toLocaleDateString("ar-EG")}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">تاريخ نهاية الاشتراك</p>
                <p className="text-sm text-text font-medium">{selectedStudent.subscription.endDate.toLocaleDateString("ar-EG")}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button className="flex-1 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors">
                تعديل بيانات الطالب
              </button>
              <button className="px-4 py-2.5 border border-border text-text-secondary text-sm font-medium rounded-xl hover:bg-surface-tertiary transition-colors">
                إرسال رسالة
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

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

const chips = ["الكل", "نشط", "منتهي", "غير نشط", "موقوف"]

export default function StudentsPage() {
  const [search, setSearch] = useState("")
  const [gradeFilter, setGradeFilter] = useState("الكل")
  const [groupFilter, setGroupFilter] = useState("الكل")
  const [statusFilter, setStatusFilter] = useState("الكل")
  const [govFilter, setGovFilter] = useState("الكل")
  const [activeChip, setActiveChip] = useState("الكل")
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
      const matchGrade = gradeFilter === "الكل" || s.grade === gradeFilter
      const matchGroup = groupFilter === "الكل" || s.group === groupFilter
      const matchStatus = statusFilter === "الكل" || s.status === statusFilter
      const matchGov = govFilter === "الكل" || s.governorate === govFilter
      return matchSearch && matchGrade && matchGroup && matchStatus && matchGov
    })
  }, [search, gradeFilter, groupFilter, statusFilter, govFilter, students])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-[#F8FAFC]">الطلاب</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="إجمالي الطلاب" value={stats.total} icon={HiOutlineUsers} color="primary" />
        <StatsCard title="الطلاب النشطون" value={stats.active} icon={HiOutlineAcademicCap} color="success" />
        <StatsCard title="منتهي اشتراكهم" value={stats.expired} icon={HiOutlineUserGroup} color="error" />
        <StatsCard title="غير نشط" value={stats.inactive} icon={HiOutlineUserGroup} color="warning" />
      </div>

      <BulkActions
        selectedCount={selectedIds.size}
        onClear={() => setSelectedIds(new Set())}
        onMoveToGroup={(g) => { toast.success(`تم نقل ${selectedIds.size} طالب إلى المجموعة ${g}`); setSelectedIds(new Set()) }}
        onChangeStatus={(s) => { toast.success(`تم تغيير حالة ${selectedIds.size} طالب`); setSelectedIds(new Set()) }}
        onSendMessage={() => toast.success("تم إرسال الرسالة بنجاح")}
        onPrint={() => toast.success("جاري تجهيز الطباعة")}
        onExportExcel={() => toast.success("جاري تصدير البيانات")}
      />

      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 max-w-md">
          <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1) }} placeholder="بحث بالاسم أو رقم الهاتف..." />
        </div>
        <Button variant="primary" leftIcon={<HiOutlineUserAdd size={18} />} onClick={() => setShowCreateModal(true)}>
          إضافة طالب جديد
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {chips.map((chip) => (
          <button
            key={chip}
            onClick={() => {
              setActiveChip(chip)
              if (chip === "الكل") setStatusFilter("الكل")
              else setStatusFilter(chip === "نشط" ? "active" : chip === "منتهي" ? "expired" : chip === "غير نشط" ? "inactive" : "suspended")
              setPage(1)
            }}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-medium transition-all border",
              activeChip === chip
                ? "bg-[#6366F1] text-white border-[#6366F1]"
                : "bg-transparent text-[#94A3B8] border-[rgba(255,255,255,0.06)] hover:border-[#6366F1]/30 hover:text-[#F8FAFC]"
            )}
          >
            {chip}
          </button>
        ))}
        <div className="w-px h-5 bg-[rgba(255,255,255,0.06)] mx-1" />
        <select value={gradeFilter} onChange={(e) => { setGradeFilter(e.target.value); setPage(1) }}
          className="px-3 py-1.5 bg-transparent border border-[rgba(255,255,255,0.06)] rounded-full text-xs text-[#94A3B8] focus:outline-none cursor-pointer hover:border-[#6366F1]/30">
          {grades.map((g) => <option key={g} value={g}>{g === "الكل" ? "جميع الصفوف" : g}</option>)}
        </select>
        <select value={groupFilter} onChange={(e) => { setGroupFilter(e.target.value); setPage(1) }}
          className="px-3 py-1.5 bg-transparent border border-[rgba(255,255,255,0.06)] rounded-full text-xs text-[#94A3B8] focus:outline-none cursor-pointer hover:border-[#6366F1]/30">
          {groups.map((g) => <option key={g} value={g}>{g === "الكل" ? "جميع المجموعات" : g}</option>)}
        </select>
        <select value={govFilter} onChange={(e) => { setGovFilter(e.target.value); setPage(1) }}
          className="px-3 py-1.5 bg-transparent border border-[rgba(255,255,255,0.06)] rounded-full text-xs text-[#94A3B8] focus:outline-none cursor-pointer hover:border-[#6366F1]/30">
          {governorates.map((g) => <option key={g} value={g}>{g === "الكل" ? "جميع المحافظات" : g}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={HiOutlineUsers}
          title="لا يوجد طلاب"
          description="لم يتم العثور على طلاب مطابقين لمعايير البحث"
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
                  <Link href={`/teacher/students/${s.id}`}>
                    <button type="button" className="px-2.5 py-1.5 text-xs font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors" title="عرض الملف">
                      عرض الملف
                    </button>
                  </Link>
                  <button type="button" onClick={() => setSelectedStudent(s)} className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="عرض">
                    <HiOutlineEye size={16} />
                  </button>
                  <button type="button" className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="تعديل">
                    <HiOutlinePencil size={16} />
                  </button>
                  <button type="button" className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors" title="حذف">
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

      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="إضافة طالب جديد" id="createStudentModal">
        <div className="space-y-4">
          <Input label="اسم الطالب" value={createForm.name} onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })} placeholder="أدخل اسم الطالب" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="البريد الإلكتروني" value={createForm.email} onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })} placeholder="البريد الإلكتروني" />
            <Input label="رقم الهاتف" value={createForm.phone} onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })} placeholder="رقم الهاتف" />
          </div>
          <Select
            label="الصف الدراسي"
            options={["أولى ثانوي", "ثانية ثانوي", "ثالثة ثانوي"].map((g) => ({ value: g, label: g }))}
            value={createForm.grade}
            onChange={(e) => setCreateForm({ ...createForm, grade: e.target.value })}
            placeholder="اختر الصف"
          />
          <div className="grid grid-cols-2 gap-3">
            <Input label="اسم ولي الأمر" value={createForm.parentName} onChange={(e) => setCreateForm({ ...createForm, parentName: e.target.value })} placeholder="اسم ولي الأمر" />
            <Input label="رقم ولي الأمر" value={createForm.parentPhone} onChange={(e) => setCreateForm({ ...createForm, parentPhone: e.target.value })} placeholder="رقم ولي الأمر" />
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
              toast.success("تم إضافة الطالب بنجاح")
            }}>
              إضافة طالب جديد
            </Button>
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>إلغاء</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!selectedStudent} onClose={() => setSelectedStudent(null)} title="بيانات الطالب" size="lg">
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
                <p className="text-sm text-text font-medium">{selectedStudent.xp} XP آ· مستوى {selectedStudent.level}</p>
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
              <button type="button" className="flex-1 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors">
                تعديل بيانات الطالب
              </button>
              <button type="button" className="px-4 py-2.5 border border-border text-text-secondary text-sm font-medium rounded-xl hover:bg-surface-tertiary transition-colors">
                إرسال رسالة
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

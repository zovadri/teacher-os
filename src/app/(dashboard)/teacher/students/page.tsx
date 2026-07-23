"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  HiOutlineUsers, HiOutlineAcademicCap, HiOutlineUserGroup,
  HiOutlineEye, HiOutlinePencil, HiOutlineTrash, HiOutlineUserAdd,
  HiOutlinePhone, HiOutlineStar, HiOutlinePlus, HiOutlineFunnel,
} from "react-icons/hi"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { SearchInput } from "@/components/ui/SearchInput"
import { PageHeader } from "@/components/ui/PageHeader"
import Button from "@/components/ui/Button"
import { mockStudents } from "@/lib/mock/data"
import { EmptyState } from "@/components/ui/EmptyState"
import { cn, generateId } from "@/lib/utils"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const statusCfg = {
  active: { label: "نشط", variant: "success" as const },
  inactive: { label: "غير نشط", variant: "warning" as const },
  expired: { label: "منتهي", variant: "error" as const },
  suspended: { label: "موقوف", variant: "default" as const },
}

const grades = ["الكل", "أولى ثانوي", "ثانية ثانوي", "ثالثة ثانوي"]
const groups = ["الكل", "مجموعة A", "مجموعة B", "مجموعة C"]
const filters = ["الكل", "نشط", "منتهي", "غير نشط", "موقوف"]

export default function StudentsPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [gradeFilter, setGradeFilter] = useState("الكل")
  const [groupFilter, setGroupFilter] = useState("الكل")
  const [statusFilter, setStatusFilter] = useState("الكل")
  const [activeChip, setActiveChip] = useState("الكل")
  const [page, setPage] = useState(1)
  const [students, setStudents] = useState(mockStudents)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", grade: "", parentName: "", parentPhone: "" })

  const stats = useMemo(() => ({
    total: students.length,
    active: students.filter((s) => s.status === "active").length,
    expired: students.filter((s) => s.status === "expired").length,
    new: students.filter((s) => s.xp > 500).length,
  }), [students])

  const filtered = useMemo(() =>
    students.filter((s) => {
      const q = search.toLowerCase()
      return (s.name.includes(q) || s.phone.includes(q)) &&
        (gradeFilter === "الكل" || s.grade === gradeFilter) &&
        (groupFilter === "الكل" || s.group === groupFilter) &&
        (statusFilter === "الكل" || s.status === statusFilter)
    }), [search, gradeFilter, groupFilter, statusFilter, students])

  const PAGE_SIZE = 8
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const allSelected = paginated.length > 0 && selectedIds.size === paginated.length

  return (
    <div className="space-y-6">
      <PageHeader
        title="الطلاب"
        description="إدارة بيانات الطلاب والاشتراكات"
        breadcrumbs={[{ label: "لوحة التحكم", href: "/teacher" }, { label: "الطلاب" }]}
        actions={
          <Button variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowCreate(true)}>
            إضافة طالب
          </Button>
        }
      />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard title="إجمالي الطلاب" value={stats.total} icon={HiOutlineUsers} color="primary" trend={12} sparkline={[30, 42, 38, 52, 48, 62, 58, 68, 72, 65, 78, 82]} />
        <StatsCard title="الطلاب النشطون" value={stats.active} icon={HiOutlineAcademicCap} color="success" trend={8} sparkline={[45, 52, 48, 58, 62, 70, 65, 75, 80, 78, 85, 90]} />
        <StatsCard title="منتهي اشتراكهم" value={stats.expired} icon={HiOutlineUserGroup} color="error" trend={-5} sparkline={[12, 15, 10, 18, 14, 20, 16, 22, 18, 15, 10, 8]} />
        <StatsCard title="طلاب الجدد" value={stats.new} icon={HiOutlineUserAdd} color="info" trend={22} sparkline={[5, 8, 12, 10, 15, 18, 14, 20, 22, 25, 28, 35]} />
      </motion.div>

      <div className="bg-card border border-border rounded-[24px] p-5 ">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-5">
          <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1) }} placeholder="بحث بالاسم أو الهاتف..." className="sm:max-w-xs flex-1" />
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((chip) => (
              <button key={chip} onClick={() => { setActiveChip(chip); setStatusFilter(chip === "الكل" ? "الكل" : chip === "نشط" ? "active" : chip === "منتهي" ? "expired" : chip === "غير نشط" ? "inactive" : "suspended"); setPage(1) }}
                className={cn(
                  "px-4 py-1.5 rounded-[12px] text-xs font-medium transition-all border backdrop-blur-xl",
                  activeChip === chip
                    ? "bg-primary/20 border-primary/30 text-primary shadow-[0_0_16px_rgba(217,119,6,0.15)]"
                    : "bg-card/40 border-border text-text-secondary hover:border-primary/30 hover:text-text"
                )}
              >{chip}</button>
            ))}
            <div className="w-px h-6 bg-border mx-1" />
            <select value={gradeFilter} onChange={(e) => { setGradeFilter(e.target.value); setPage(1) }}
              className="px-3 py-1.5 bg-card/40 border border-border rounded-[12px] text-xs text-text-secondary focus:outline-none cursor-pointer hover:border-primary/30 backdrop-blur-xl appearance-none">
              {grades.map((g) => <option key={g} value={g}>{g === "الكل" ? "جميع الصفوف" : g}</option>)}
            </select>
            <select value={groupFilter} onChange={(e) => { setGroupFilter(e.target.value); setPage(1) }}
              className="px-3 py-1.5 bg-card/40 border border-border rounded-[12px] text-xs text-text-secondary focus:outline-none cursor-pointer hover:border-primary/30 backdrop-blur-xl appearance-none">
              {groups.map((g) => <option key={g} value={g}>{g === "الكل" ? "جميع المجموعات" : g}</option>)}
            </select>
          </div>
        </div>

        {selectedIds.size > 0 && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-4 px-4 py-3 bg-primary/5 border border-primary/20 rounded-[16px] backdrop-blur-xl">
            <span className="text-sm text-primary font-medium">{selectedIds.size} طالب محدد</span>
            <div className="flex gap-2">
              {["نقل لمجموعة", "تغيير الحالة", "إرسال رسالة"].map((a) => (
                <button key={a} onClick={() => { toast.success(`تم ${a}`); setSelectedIds(new Set()) }}
                  className="px-3 py-1.5 text-xs bg-primary/10 border border-primary/20 text-primary rounded-[10px] hover:bg-primary/20 transition-all">
                  {a}
                </button>
              ))}
            </div>
            <button onClick={() => setSelectedIds(new Set())} className="mr-auto text-xs text-text-tertiary hover:text-text transition-colors">إلغاء التحديد</button>
          </motion.div>
        )}

        {filtered.length === 0 ? (
          <EmptyState icon={HiOutlineUsers} title="لا يوجد طلاب" description="لم يتم العثور على طلاب مطابقين لمعايير البحث" actionLabel="إضافة طالب" onAction={() => setShowCreate(true)} />
        ) : (
          <>
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="w-10 px-2 py-3.5">
                      <input type="checkbox" checked={allSelected} onChange={() => { setSelectedIds(allSelected ? new Set() : new Set(paginated.map((s) => s.id))) }} className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 cursor-pointer bg-card" />
                    </th>
                    <th className="text-right text-xs font-medium text-text-tertiary px-3 py-3.5 whitespace-nowrap">الطالب</th>
                    <th className="text-right text-xs font-medium text-text-tertiary px-3 py-3.5 whitespace-nowrap">رقم الهاتف</th>
                    <th className="text-right text-xs font-medium text-text-tertiary px-3 py-3.5 whitespace-nowrap">الصف</th>
                    <th className="text-right text-xs font-medium text-text-tertiary px-3 py-3.5 whitespace-nowrap">المجموعة</th>
                    <th className="text-right text-xs font-medium text-text-tertiary px-3 py-3.5 whitespace-nowrap">الحالة</th>
                    <th className="text-right text-xs font-medium text-text-tertiary px-3 py-3.5 whitespace-nowrap">المستوى</th>
                    <th className="w-24 px-3 py-3.5" />
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((s, i) => (
                    <motion.tr key={s.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                      className="border-b border-border/50 transition-all duration-200 hover:bg-card/40 cursor-pointer"
                      onClick={() => router.push(`/teacher/students/${s.id}`)}
                    >
                      <td className="px-2 py-3" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" checked={selectedIds.has(s.id)} onChange={() => { const n = new Set(selectedIds); n.has(s.id) ? n.delete(s.id) : n.add(s.id); setSelectedIds(n) }}
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 cursor-pointer bg-card" />
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 border border-border overflow-hidden shrink-0">
                            <img src={s.avatar} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-text truncate">{s.name}</p>
                            <p className="text-xs text-text-tertiary truncate">{s.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1.5 text-sm text-text-secondary" dir="ltr">
                          <HiOutlinePhone className="w-3.5 h-3.5 text-text-tertiary shrink-0" />
                          <span>{s.phone}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm text-text">{s.grade}</td>
                      <td className="px-3 py-3 text-sm text-text">{s.group}</td>
                      <td className="px-3 py-3">
                        <Badge variant={statusCfg[s.status]?.variant || "default"} size="sm">
                          {statusCfg[s.status]?.label || s.status}
                        </Badge>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1.5">
                          <HiOutlineStar className="w-3.5 h-3.5 text-warning" />
                          <span className="text-sm text-text font-medium">{s.xp}</span>
                          <span className="text-xs text-text-tertiary">مستوى {s.level}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <button type="button" onClick={() => router.push(`/teacher/students/${s.id}`)}
                            className="p-1.5 rounded-[10px] text-text-tertiary hover:text-primary hover:bg-primary/10 transition-all">
                            <HiOutlineEye className="w-4 h-4" />
                          </button>
                          <button type="button" className="p-1.5 rounded-[10px] text-text-tertiary hover:text-text hover:bg-card transition-all">
                            <HiOutlinePencil className="w-4 h-4" />
                          </button>
                          <button type="button" className="p-1.5 rounded-[10px] text-text-tertiary hover:text-error hover:bg-error/10 transition-all">
                            <HiOutlineTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="sm:hidden space-y-3">
              {paginated.map((s, i) => (
                <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  onClick={() => router.push(`/teacher/students/${s.id}`)}
                  className="bg-card border border-border rounded-[20px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.03)] hover:-translate-y-0.5 transition-all duration-250 cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <input type="checkbox" checked={selectedIds.has(s.id)} onChange={() => { const n = new Set(selectedIds); n.has(s.id) ? n.delete(s.id) : n.add(s.id); setSelectedIds(n) }}
                      onClick={(e) => e.stopPropagation()} className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 bg-card shrink-0" />
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-border overflow-hidden shrink-0">
                      <img src={s.avatar} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-text truncate">{s.name}</p>
                      <p className="text-xs text-text-tertiary truncate">{s.email}</p>
                    </div>
                    <Badge variant={statusCfg[s.status]?.variant || "default"} size="sm">{statusCfg[s.status]?.label || s.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-text-secondary">
                    <span>{s.grade}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{s.group}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{s.xp} XP · مستوى {s.level}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4 border-t border-border mt-4">
                <button type="button" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
                  className="p-2 rounded-[12px] hover:bg-card/60 disabled:opacity-30 disabled:cursor-not-allowed text-text-secondary transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <span className="text-sm text-text-secondary">{page} / {totalPages}</span>
                <button type="button" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
                  className="p-2 rounded-[12px] hover:bg-card/60 disabled:opacity-30 disabled:cursor-not-allowed text-text-secondary transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowCreate(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-card border border-border rounded-[24px] shadow-[0_24px_80px_rgba(0,0,0,0.08)] p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-text">إضافة طالب جديد</h2>
              <button type="button" onClick={() => setShowCreate(false)} className="p-1.5 rounded-[12px] text-text-tertiary hover:text-text hover:bg-card transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">اسم الطالب</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="أدخل اسم الطالب"
                  className="w-full bg-card border border-border rounded-[16px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50  focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">البريد الإلكتروني</label>
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="البريد الإلكتروني"
                    className="w-full bg-card border border-border rounded-[16px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50  focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">رقم الهاتف</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="رقم الهاتف"
                    className="w-full bg-card border border-border rounded-[16px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50  focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">الصف الدراسي</label>
                <select value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })}
                  className="w-full bg-card border border-border rounded-[16px] px-4 py-2.5 text-sm text-text appearance-none  focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all">
                  <option value="">اختر الصف</option>
                  {grades.filter((g) => g !== "الكل").map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">ولي الأمر</label>
                  <input value={form.parentName} onChange={(e) => setForm({ ...form, parentName: e.target.value })} placeholder="اسم ولي الأمر"
                    className="w-full bg-card border border-border rounded-[16px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50  focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">رقم ولي الأمر</label>
                  <input value={form.parentPhone} onChange={(e) => setForm({ ...form, parentPhone: e.target.value })} placeholder="رقم ولي الأمر"
                    className="w-full bg-card border border-border rounded-[16px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50  focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="primary" className="flex-1" onClick={() => {
                  setStudents((prev) => [{ id: generateId(), name: form.name, email: form.email, phone: form.phone, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${generateId()}`, grade: form.grade, group: "", school: "", governorate: "", city: "", gender: "male" as const, birthDate: new Date(), status: "active" as const, subscription: { status: "active" as const, planName: "", startDate: new Date(), endDate: new Date() }, xp: 0, level: 1, streak: 0 }, ...prev])
                  setShowCreate(false); setForm({ name: "", email: "", phone: "", grade: "", parentName: "", parentPhone: "" }); toast.success("تم إضافة الطالب بنجاح")
                }}>
                  إضافة طالب
                </Button>
                <Button variant="secondary" onClick={() => setShowCreate(false)}>إلغاء</Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

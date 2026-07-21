"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  HiOutlineUsers,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineBeaker,
  HiOutlineEye,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineAcademicCap,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineTag,
  HiOutlineTemplate,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { SearchInput } from "@/components/ui/SearchInput"
import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select"
import { Modal } from "@/components/ui/Modal"
import { ConfirmDialog } from "@/components/ui/ConfirmDialog"
import { EmptyState } from "@/components/ui/EmptyState"
import { Progress } from "@/components/ui/Progress"
import { mockEnrollments, mockCourses, mockBundles } from "@/lib/mock/data"
import { useNotificationStore } from "@/lib/notification-store"
import { generateId, formatDate } from "@/lib/utils"
import type { CourseEnrollment, EnrollmentStatus, AccessType } from "@/lib/types"

const statusBadge: Record<EnrollmentStatus, "success" | "error" | "neutral" | "warning"> = {
  active: "success",
  expired: "error",
  cancelled: "neutral",
  trial: "warning",
}

const statusLabels: Record<EnrollmentStatus, string> = {
  active: "نشط",
  expired: "منتهي",
  cancelled: "ملغي",
  trial: "تجريبي",
}

const accessTypeLabels: Record<AccessType, string> = {
  single: "فردي",
  bundle: "باقة",
  free: "مجاني",
  trial: "تجريبي",
  vip: "VIP",
  lifetime: "مدى الحياة",
}

const sourceLabels: Record<string, string> = {
  payment: "دفع",
  code: "كود",
  free: "مجاني",
  admin: "إداري",
}

const sourceColors: Record<string, "primary" | "success" | "info" | "warning"> = {
  payment: "primary",
  code: "success",
  free: "info",
  admin: "warning",
}

const courseOptions = [
  { value: "الكل", label: "جميع الكورسات" },
  ...mockCourses.map((c) => ({ value: c.id, label: c.title })),
]

const statusOptions = [
  { value: "الكل", label: "جميع الحالات" },
  { value: "active", label: "نشط" },
  { value: "expired", label: "منتهي" },
  { value: "cancelled", label: "ملغي" },
  { value: "trial", label: "تجريبي" },
]

const accessOptions = [
  { value: "الكل", label: "جميع أنواع الوصول" },
  { value: "single", label: "فردي" },
  { value: "bundle", label: "باقة" },
  { value: "free", label: "مجاني" },
  { value: "trial", label: "تجريبي" },
  { value: "vip", label: "VIP" },
  { value: "lifetime", label: "مدى الحياة" },
]

interface CreateForm {
  studentName: string
  studentId: string
  courseId: string
  accessType: AccessType
  bundleId: string
}

const emptyCreateForm: CreateForm = {
  studentName: "",
  studentId: "",
  courseId: "",
  accessType: "single",
  bundleId: "",
}

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState(mockEnrollments)
  const [search, setSearch] = useState("")
  const [courseFilter, setCourseFilter] = useState("الكل")
  const [statusFilter, setStatusFilter] = useState("الكل")
  const [accessFilter, setAccessFilter] = useState("الكل")
  const [selectedEnrollment, setSelectedEnrollment] = useState<CourseEnrollment | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [createForm, setCreateForm] = useState<CreateForm>(emptyCreateForm)
  const [bulkEndTarget, setBulkEndTarget] = useState<CourseEnrollment | null>(null)
  const { addToast } = useNotificationStore()

  const stats = useMemo(() => {
    const total = enrollments.length
    const active = enrollments.filter((e) => e.status === "active").length
    const expired = enrollments.filter((e) => e.status === "expired").length
    const trial = enrollments.filter((e) => e.status === "trial").length
    return { total, active, expired, trial }
  }, [enrollments])

  const filtered = useMemo(() => {
    return enrollments.filter((e) => {
      const matchSearch = e.studentName.includes(search) || e.courseName.includes(search)
      const matchCourse = courseFilter === "الكل" || e.courseId === courseFilter
      const matchStatus = statusFilter === "الكل" || e.status === statusFilter
      const matchAccess = accessFilter === "الكل" || e.accessType === accessFilter
      return matchSearch && matchCourse && matchStatus && matchAccess
    })
  }, [enrollments, search, courseFilter, statusFilter, accessFilter])

  const openDetail = (enr: CourseEnrollment) => {
    setSelectedEnrollment(enr)
    setDetailModalOpen(true)
  }

  const handleCreate = () => {
    if (!createForm.studentName.trim() || !createForm.courseId) return
    const course = mockCourses.find((c) => c.id === createForm.courseId)
    const newEnr: CourseEnrollment = {
      id: generateId(),
      studentId: createForm.studentId || `s-${Date.now()}`,
      studentName: createForm.studentName,
      courseId: createForm.courseId,
      courseName: course?.title || "",
      bundleId: createForm.accessType === "bundle" ? createForm.bundleId || undefined : undefined,
      status: "active",
      accessType: createForm.accessType,
      enrolledAt: new Date(),
      expiresAt: new Date(Date.now() + 90 * 86400000),
      progress: 0,
      source: "admin",
    }
    setEnrollments((prev) => [newEnr, ...prev])
    addToast({ type: "success", title: "طھظ… إضافة التسجيل بنجاح" })
    setCreateModalOpen(false)
    setCreateForm(emptyCreateForm)
  }

  const handleBulkEnd = () => {
    if (!bulkEndTarget) return
    setEnrollments((prev) =>
      prev.map((e) =>
        e.id === bulkEndTarget.id ? { ...e, status: "expired" as const } : e
      )
    )
    addToast({ type: "success", title: `طھظ… إنهاء تسجيل "${bulkEndTarget.studentName}" بنجاح` })
    setBulkEndTarget(null)
  }

  const statsCards = [
    { title: "إجمالي التسجيلات", value: stats.total, icon: HiOutlineUsers, color: "primary" as const },
    { title: "التسجيلات النشطة", value: stats.active, icon: HiOutlineCheckCircle, color: "success" as const },
    { title: "التسجيلات المنتهية", value: stats.expired, icon: HiOutlineXCircle, color: "error" as const },
    { title: "التسجيلات التجريبية", value: stats.trial, icon: HiOutlineBeaker, color: "warning" as const },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="إدارة التسجيلات" subtitle="إدارة تسجيلات الطلاب ظپظٹ الكورسات" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <StatsCard title={s.title} value={s.value} icon={s.icon} color={s.color} />
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchInput value={search} onChange={setSearch} placeholder="بحث عن طالب أو كورس..." />
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="px-4 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
          >
            {courseOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
          >
            {statusOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <select
            value={accessFilter}
            onChange={(e) => setAccessFilter(e.target.value)}
            className="px-4 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
          >
            {accessOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <Button variant="primary" size="md" onClick={() => setCreateModalOpen(true)} leftIcon={<HiOutlinePlus size={18} />}>
            إضافة تسجيل
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="لا توجد تسجيلات"
          description="لم ظٹطھظ… العثور على تسجيلات تطابق معايير البحث"
          action={
            <Button variant="primary" onClick={() => setCreateModalOpen(true)}>
              إضافة تسجيل جديد
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((enr, index) => (
            <motion.div
              key={enr.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card hover className="group" onClick={() => openDetail(enr)}>
                <CardContent>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <HiOutlineAcademicCap className="text-primary" size={20} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-text truncate">{enr.studentName}</h3>
                        <p className="text-xs text-text-tertiary truncate">{enr.courseName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge variant={statusBadge[enr.status]}>{statusLabels[enr.status]}</Badge>
                      <Badge variant="info" size="sm">{accessTypeLabels[enr.accessType]}</Badge>
                      <Badge variant={sourceColors[enr.source]} size="sm">{sourceLabels[enr.source]}</Badge>
                    </div>
                    <div className="flex items-center gap-4 min-w-[180px]">
                      <div className="flex-1">
                        <Progress value={enr.progress} size="sm" variant={enr.progress >= 80 ? "success" : enr.progress >= 40 ? "primary" : "warning"} />
                      </div>
                      <span className="text-xs text-text-secondary w-10 text-left">{enr.progress}%</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-text-tertiary shrink-0">
                      <span className="flex items-center gap-1">
                        <HiOutlineCalendar size={14} />
                        {formatDate(enr.enrolledAt)}
                      </span>
                      {enr.expiresAt && (
                        <span className="flex items-center gap-1">
                          <HiOutlineClock size={14} />
                          {formatDate(enr.expiresAt)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button type="button"
                        onClick={() => openDetail(enr)}
                        className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        title="عرض"
                      >
                        <HiOutlineEye size={16} />
                      </button>
                      {enr.status === "active" && (
                        <button type="button"
                          onClick={() => setBulkEndTarget(enr)}
                          className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors"
                          title="إنهاء التسجيل"
                        >
                          <HiOutlineTrash size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Modal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        title="تفاصيل التسجيل"
        size="lg"
      >
        {selectedEnrollment && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <HiOutlineAcademicCap className="text-primary" size={28} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text">{selectedEnrollment.studentName}</h3>
                <p className="text-sm text-text-secondary">{selectedEnrollment.courseName}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-text-tertiary">الحالة</p>
                <Badge variant={statusBadge[selectedEnrollment.status]} size="md">{statusLabels[selectedEnrollment.status]}</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-text-tertiary">نوع الوصول</p>
                <Badge variant="info" size="md">{accessTypeLabels[selectedEnrollment.accessType]}</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-text-tertiary">المصدر</p>
                <Badge variant={sourceColors[selectedEnrollment.source]} size="md">{sourceLabels[selectedEnrollment.source]}</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-text-tertiary">التقدم</p>
                <div className="flex items-center gap-2">
                  <Progress value={selectedEnrollment.progress} size="sm" className="flex-1" />
                  <span className="text-sm font-medium text-text">{selectedEnrollment.progress}%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-text-tertiary">تاريخ التسجيل</p>
                <div className="flex items-center gap-1.5 text-sm text-text">
                  <HiOutlineCalendar size={16} className="text-text-tertiary" />
                  {formatDate(selectedEnrollment.enrolledAt)}
                </div>
              </div>
              {selectedEnrollment.expiresAt && (
                <div className="space-y-1">
                  <p className="text-xs text-text-tertiary">تاريخ الانتهاء</p>
                  <div className="flex items-center gap-1.5 text-sm text-text">
                    <HiOutlineClock size={16} className="text-text-tertiary" />
                    {formatDate(selectedEnrollment.expiresAt)}
                  </div>
                </div>
              )}
              {selectedEnrollment.bundleId && (
                <div className="space-y-1">
                  <p className="text-xs text-text-tertiary">الباقة</p>
                  <div className="flex items-center gap-1.5 text-sm text-text">
                    <HiOutlineTemplate size={16} className="text-text-tertiary" />
                    {mockBundles.find((b) => b.id === selectedEnrollment.bundleId)?.name || "غير معروفة"}
                  </div>
                </div>
              )}
              {selectedEnrollment.grade !== undefined && (
                <div className="space-y-1">
                  <p className="text-xs text-text-tertiary">الدرجة</p>
                  <div className="flex items-center gap-1.5 text-sm text-text">
                    <HiOutlineTag size={16} className="text-text-tertiary" />
                    {selectedEnrollment.grade}%
                  </div>
                </div>
              )}
              {selectedEnrollment.sourceId && (
                <div className="space-y-1">
                  <p className="text-xs text-text-tertiary">معرّف المصدر</p>
                  <p className="text-sm text-text font-mono">{selectedEnrollment.sourceId}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={createModalOpen}
        onClose={() => { setCreateModalOpen(false); setCreateForm(emptyCreateForm) }}
        title="إضافة تسجيل جديد"
        size="md"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text">اسم الطالب</label>
              <input
                value={createForm.studentName}
                onChange={(e) => setCreateForm((p) => ({ ...p, studentName: e.target.value }))}
                placeholder="مثال: أحمد محمد"
                className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text">معرّف الطالب</label>
              <input
                value={createForm.studentId}
                onChange={(e) => setCreateForm((p) => ({ ...p, studentId: e.target.value }))}
                placeholder="مثال: s-123"
                className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>
          <Select
            label="الكورس"
            value={createForm.courseId}
            onChange={(e) => setCreateForm((p) => ({ ...p, courseId: e.target.value }))}
            options={mockCourses.map((c) => ({ value: c.id, label: c.title }))}
            placeholder="اختر كورس..."
          />
          <Select
            label="نوع الوصول"
            value={createForm.accessType}
            onChange={(e) => setCreateForm((p) => ({ ...p, accessType: e.target.value as AccessType }))}
            options={[
              { value: "single", label: "فردي" },
              { value: "bundle", label: "باقة" },
              { value: "free", label: "مجاني" },
              { value: "trial", label: "تجريبي" },
              { value: "vip", label: "VIP" },
              { value: "lifetime", label: "مدى الحياة" },
            ]}
          />
          {createForm.accessType === "bundle" && (
            <Select
              label="الباقة"
              value={createForm.bundleId}
              onChange={(e) => setCreateForm((p) => ({ ...p, bundleId: e.target.value }))}
              options={mockBundles.filter((b) => b.status === "active").map((b) => ({ value: b.id, label: b.name }))}
              placeholder="اختر باقة..."
            />
          )}
          <div className="flex items-center gap-3 pt-2">
            <Button variant="primary" onClick={handleCreate} className="flex-1" disabled={!createForm.studentName.trim() || !createForm.courseId}>
              تسجيل
            </Button>
            <Button variant="secondary" onClick={() => { setCreateModalOpen(false); setCreateForm(emptyCreateForm) }} className="flex-1">
              إلغاء
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={!!bulkEndTarget}
        onClose={() => setBulkEndTarget(null)}
        onConfirm={handleBulkEnd}
        title="إنهاء التسجيل"
        message={bulkEndTarget ? `هل أنت متأكد من إنهاء تسجيل "${bulkEndTarget.studentName}" ظپظٹ كورس "${bulkEndTarget.courseName}"طں` : ""}
        confirmText="إنهاء التسجيل"
        cancelText="إلغاء"
        variant="danger"
      />
    </div>
  )
}

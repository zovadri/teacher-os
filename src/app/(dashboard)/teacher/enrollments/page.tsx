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
  active: "ط¸â€ ط·آ´ط·آ·",
  expired: "ط¸â€¦ط¸â€ ط·ع¾ط¸â€،ط¸ظ¹",
  cancelled: "ط¸â€¦ط¸â€‍ط·ط›ط¸ظ¹",
  trial: "ط·ع¾ط·آ¬ط·آ±ط¸ظ¹ط·آ¨ط¸ظ¹",
}

const accessTypeLabels: Record<AccessType, string> = {
  single: "ط¸ظ¾ط·آ±ط·آ¯ط¸ظ¹",
  bundle: "ط·آ¨ط·آ§ط¸â€ڑط·آ©",
  free: "ط¸â€¦ط·آ¬ط·آ§ط¸â€ ط¸ظ¹",
  trial: "ط·ع¾ط·آ¬ط·آ±ط¸ظ¹ط·آ¨ط¸ظ¹",
  vip: "VIP",
  lifetime: "ط¸â€¦ط·آ¯ط¸â€° ط·آ§ط¸â€‍ط·آ­ط¸ظ¹ط·آ§ط·آ©",
}

const sourceLabels: Record<string, string> = {
  payment: "ط·آ¯ط¸ظ¾ط·آ¹",
  code: "ط¸ئ’ط¸ث†ط·آ¯",
  free: "ط¸â€¦ط·آ¬ط·آ§ط¸â€ ط¸ظ¹",
  admin: "ط·آ¥ط·آ¯ط·آ§ط·آ±ط¸ظ¹",
}

const sourceColors: Record<string, "primary" | "success" | "info" | "warning"> = {
  payment: "primary",
  code: "success",
  free: "info",
  admin: "warning",
}

const courseOptions = [
  { value: "ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍", label: "ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¹ ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³ط·آ§ط·ع¾" },
  ...mockCourses.map((c) => ({ value: c.id, label: c.title })),
]

const statusOptions = [
  { value: "ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍", label: "ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¹ ط·آ§ط¸â€‍ط·آ­ط·آ§ط¸â€‍ط·آ§ط·ع¾" },
  { value: "active", label: "ط¸â€ ط·آ´ط·آ·" },
  { value: "expired", label: "ط¸â€¦ط¸â€ ط·ع¾ط¸â€،ط¸ظ¹" },
  { value: "cancelled", label: "ط¸â€¦ط¸â€‍ط·ط›ط¸ظ¹" },
  { value: "trial", label: "ط·ع¾ط·آ¬ط·آ±ط¸ظ¹ط·آ¨ط¸ظ¹" },
]

const accessOptions = [
  { value: "ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍", label: "ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¹ ط·آ£ط¸â€ ط¸ث†ط·آ§ط·آ¹ ط·آ§ط¸â€‍ط¸ث†ط·آµط¸ث†ط¸â€‍" },
  { value: "single", label: "ط¸ظ¾ط·آ±ط·آ¯ط¸ظ¹" },
  { value: "bundle", label: "ط·آ¨ط·آ§ط¸â€ڑط·آ©" },
  { value: "free", label: "ط¸â€¦ط·آ¬ط·آ§ط¸â€ ط¸ظ¹" },
  { value: "trial", label: "ط·ع¾ط·آ¬ط·آ±ط¸ظ¹ط·آ¨ط¸ظ¹" },
  { value: "vip", label: "VIP" },
  { value: "lifetime", label: "ط¸â€¦ط·آ¯ط¸â€° ط·آ§ط¸â€‍ط·آ­ط¸ظ¹ط·آ§ط·آ©" },
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
  const [courseFilter, setCourseFilter] = useState("ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍")
  const [statusFilter, setStatusFilter] = useState("ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍")
  const [accessFilter, setAccessFilter] = useState("ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍")
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
      const matchCourse = courseFilter === "ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍" || e.courseId === courseFilter
      const matchStatus = statusFilter === "ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍" || e.status === statusFilter
      const matchAccess = accessFilter === "ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍" || e.accessType === accessFilter
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
    addToast({ type: "success", title: "ط·ع¾ط¸â€¦ ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ§ط¸â€‍ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ ط·آ¨ط¸â€ ط·آ¬ط·آ§ط·آ­" })
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
    addToast({ type: "success", title: `ط·ع¾ط¸â€¦ ط·آ¥ط¸â€ ط¸â€،ط·آ§ط·طŒ ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ "${bulkEndTarget.studentName}" ط·آ¨ط¸â€ ط·آ¬ط·آ§ط·آ­` })
    setBulkEndTarget(null)
  }

  const statsCards = [
    { title: "ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ ط·آ§ط¸â€‍ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ط·آ§ط·ع¾", value: stats.total, icon: HiOutlineUsers, color: "primary" as const },
    { title: "ط·آ§ط¸â€‍ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط¸â€ ط·آ´ط·آ·ط·آ©", value: stats.active, icon: HiOutlineCheckCircle, color: "success" as const },
    { title: "ط·آ§ط¸â€‍ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط¸â€¦ط¸â€ ط·ع¾ط¸â€،ط¸ظ¹ط·آ©", value: stats.expired, icon: HiOutlineXCircle, color: "error" as const },
    { title: "ط·آ§ط¸â€‍ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·ع¾ط·آ¬ط·آ±ط¸ظ¹ط·آ¨ط¸ظ¹ط·آ©", value: stats.trial, icon: HiOutlineBeaker, color: "warning" as const },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط·آ§ط¸â€‍ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ط·آ§ط·ع¾" subtitle="ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·آ·ط¸â€‍ط·آ§ط·آ¨ ط¸ظ¾ط¸ظ¹ ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³ط·آ§ط·ع¾" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <StatsCard title={s.title} value={s.value} icon={s.icon} color={s.color} />
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchInput value={search} onChange={setSearch} placeholder="ط·آ¨ط·آ­ط·آ« ط·آ¹ط¸â€  ط·آ·ط·آ§ط¸â€‍ط·آ¨ ط·آ£ط¸ث† ط¸ئ’ط¸ث†ط·آ±ط·آ³..." />
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
            ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ط·آ§ط·ع¾"
          description="ط¸â€‍ط¸â€¦ ط¸ظ¹ط·ع¾ط¸â€¦ ط·آ§ط¸â€‍ط·آ¹ط·آ«ط¸ث†ط·آ± ط·آ¹ط¸â€‍ط¸â€° ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ط·آ§ط·ع¾ ط·ع¾ط·آ·ط·آ§ط·آ¨ط¸â€ڑ ط¸â€¦ط·آ¹ط·آ§ط¸ظ¹ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط·آ¨ط·آ­ط·آ«"
          action={
            <Button variant="primary" onClick={() => setCreateModalOpen(true)}>
              ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯
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
                        title="ط·آ¹ط·آ±ط·آ¶"
                      >
                        <HiOutlineEye size={16} />
                      </button>
                      {enr.status === "active" && (
                        <button type="button"
                          onClick={() => setBulkEndTarget(enr)}
                          className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors"
                          title="ط·آ¥ط¸â€ ط¸â€،ط·آ§ط·طŒ ط·آ§ط¸â€‍ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍"
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
        title="ط·ع¾ط¸ظ¾ط·آ§ط·آµط¸ظ¹ط¸â€‍ ط·آ§ط¸â€‍ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍"
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
                <p className="text-xs text-text-tertiary">ط·آ§ط¸â€‍ط·آ­ط·آ§ط¸â€‍ط·آ©</p>
                <Badge variant={statusBadge[selectedEnrollment.status]} size="md">{statusLabels[selectedEnrollment.status]}</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-text-tertiary">ط¸â€ ط¸ث†ط·آ¹ ط·آ§ط¸â€‍ط¸ث†ط·آµط¸ث†ط¸â€‍</p>
                <Badge variant="info" size="md">{accessTypeLabels[selectedEnrollment.accessType]}</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-text-tertiary">ط·آ§ط¸â€‍ط¸â€¦ط·آµط·آ¯ط·آ±</p>
                <Badge variant={sourceColors[selectedEnrollment.source]} size="md">{sourceLabels[selectedEnrollment.source]}</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-text-tertiary">ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ¯ط¸â€¦</p>
                <div className="flex items-center gap-2">
                  <Progress value={selectedEnrollment.progress} size="sm" className="flex-1" />
                  <span className="text-sm font-medium text-text">{selectedEnrollment.progress}%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-text-tertiary">ط·ع¾ط·آ§ط·آ±ط¸ظ¹ط·آ® ط·آ§ط¸â€‍ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍</p>
                <div className="flex items-center gap-1.5 text-sm text-text">
                  <HiOutlineCalendar size={16} className="text-text-tertiary" />
                  {formatDate(selectedEnrollment.enrolledAt)}
                </div>
              </div>
              {selectedEnrollment.expiresAt && (
                <div className="space-y-1">
                  <p className="text-xs text-text-tertiary">ط·ع¾ط·آ§ط·آ±ط¸ظ¹ط·آ® ط·آ§ط¸â€‍ط·آ§ط¸â€ ط·ع¾ط¸â€،ط·آ§ط·طŒ</p>
                  <div className="flex items-center gap-1.5 text-sm text-text">
                    <HiOutlineClock size={16} className="text-text-tertiary" />
                    {formatDate(selectedEnrollment.expiresAt)}
                  </div>
                </div>
              )}
              {selectedEnrollment.bundleId && (
                <div className="space-y-1">
                  <p className="text-xs text-text-tertiary">ط·آ§ط¸â€‍ط·آ¨ط·آ§ط¸â€ڑط·آ©</p>
                  <div className="flex items-center gap-1.5 text-sm text-text">
                    <HiOutlineTemplate size={16} className="text-text-tertiary" />
                    {mockBundles.find((b) => b.id === selectedEnrollment.bundleId)?.name || "ط·ط›ط¸ظ¹ط·آ± ط¸â€¦ط·آ¹ط·آ±ط¸ث†ط¸ظ¾ط·آ©"}
                  </div>
                </div>
              )}
              {selectedEnrollment.grade !== undefined && (
                <div className="space-y-1">
                  <p className="text-xs text-text-tertiary">ط·آ§ط¸â€‍ط·آ¯ط·آ±ط·آ¬ط·آ©</p>
                  <div className="flex items-center gap-1.5 text-sm text-text">
                    <HiOutlineTag size={16} className="text-text-tertiary" />
                    {selectedEnrollment.grade}%
                  </div>
                </div>
              )}
              {selectedEnrollment.sourceId && (
                <div className="space-y-1">
                  <p className="text-xs text-text-tertiary">ط¸â€¦ط·آ¹ط·آ±ط¸â€کط¸ظ¾ ط·آ§ط¸â€‍ط¸â€¦ط·آµط·آ¯ط·آ±</p>
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
        title="ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯"
        size="md"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text">ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط·آ·ط·آ§ط¸â€‍ط·آ¨</label>
              <input
                value={createForm.studentName}
                onChange={(e) => setCreateForm((p) => ({ ...p, studentName: e.target.value }))}
                placeholder="ط¸â€¦ط·آ«ط·آ§ط¸â€‍: ط·آ£ط·آ­ط¸â€¦ط·آ¯ ط¸â€¦ط·آ­ط¸â€¦ط·آ¯"
                className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text">ط¸â€¦ط·آ¹ط·آ±ط¸â€کط¸ظ¾ ط·آ§ط¸â€‍ط·آ·ط·آ§ط¸â€‍ط·آ¨</label>
              <input
                value={createForm.studentId}
                onChange={(e) => setCreateForm((p) => ({ ...p, studentId: e.target.value }))}
                placeholder="ط¸â€¦ط·آ«ط·آ§ط¸â€‍: s-123"
                className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>
          <Select
            label="ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³"
            value={createForm.courseId}
            onChange={(e) => setCreateForm((p) => ({ ...p, courseId: e.target.value }))}
            options={mockCourses.map((c) => ({ value: c.id, label: c.title }))}
            placeholder="ط·آ§ط·آ®ط·ع¾ط·آ± ط¸ئ’ط¸ث†ط·آ±ط·آ³..."
          />
          <Select
            label="ط¸â€ ط¸ث†ط·آ¹ ط·آ§ط¸â€‍ط¸ث†ط·آµط¸ث†ط¸â€‍"
            value={createForm.accessType}
            onChange={(e) => setCreateForm((p) => ({ ...p, accessType: e.target.value as AccessType }))}
            options={[
              { value: "single", label: "ط¸ظ¾ط·آ±ط·آ¯ط¸ظ¹" },
              { value: "bundle", label: "ط·آ¨ط·آ§ط¸â€ڑط·آ©" },
              { value: "free", label: "ط¸â€¦ط·آ¬ط·آ§ط¸â€ ط¸ظ¹" },
              { value: "trial", label: "ط·ع¾ط·آ¬ط·آ±ط¸ظ¹ط·آ¨ط¸ظ¹" },
              { value: "vip", label: "VIP" },
              { value: "lifetime", label: "ط¸â€¦ط·آ¯ط¸â€° ط·آ§ط¸â€‍ط·آ­ط¸ظ¹ط·آ§ط·آ©" },
            ]}
          />
          {createForm.accessType === "bundle" && (
            <Select
              label="ط·آ§ط¸â€‍ط·آ¨ط·آ§ط¸â€ڑط·آ©"
              value={createForm.bundleId}
              onChange={(e) => setCreateForm((p) => ({ ...p, bundleId: e.target.value }))}
              options={mockBundles.filter((b) => b.status === "active").map((b) => ({ value: b.id, label: b.name }))}
              placeholder="ط·آ§ط·آ®ط·ع¾ط·آ± ط·آ¨ط·آ§ط¸â€ڑط·آ©..."
            />
          )}
          <div className="flex items-center gap-3 pt-2">
            <Button variant="primary" onClick={handleCreate} className="flex-1" disabled={!createForm.studentName.trim() || !createForm.courseId}>
              ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍
            </Button>
            <Button variant="secondary" onClick={() => { setCreateModalOpen(false); setCreateForm(emptyCreateForm) }} className="flex-1">
              ط·آ¥ط¸â€‍ط·ط›ط·آ§ط·طŒ
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={!!bulkEndTarget}
        onClose={() => setBulkEndTarget(null)}
        onConfirm={handleBulkEnd}
        title="ط·آ¥ط¸â€ ط¸â€،ط·آ§ط·طŒ ط·آ§ط¸â€‍ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍"
        message={bulkEndTarget ? `ط¸â€،ط¸â€‍ ط·آ£ط¸â€ ط·ع¾ ط¸â€¦ط·ع¾ط·آ£ط¸ئ’ط·آ¯ ط¸â€¦ط¸â€  ط·آ¥ط¸â€ ط¸â€،ط·آ§ط·طŒ ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ "${bulkEndTarget.studentName}" ط¸ظ¾ط¸ظ¹ ط¸ئ’ط¸ث†ط·آ±ط·آ³ "${bulkEndTarget.courseName}"ط·ع؛` : ""}
        confirmText="ط·آ¥ط¸â€ ط¸â€،ط·آ§ط·طŒ ط·آ§ط¸â€‍ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍"
        cancelText="ط·آ¥ط¸â€‍ط·ط›ط·آ§ط·طŒ"
        variant="danger"
      />
    </div>
  )
}

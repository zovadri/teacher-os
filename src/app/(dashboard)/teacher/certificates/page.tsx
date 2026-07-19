"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineAcademicCap,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineDownload,
  HiOutlinePrinter,
  HiOutlinePlus,
  HiOutlineQrcode,
  HiOutlineTrash,
  HiOutlineBadgeCheck,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Table } from "@/components/ui/Table"
import { Modal } from "@/components/ui/Modal"
import { StatsCard } from "@/components/ui/StatsCard"
import { SearchInput } from "@/components/ui/SearchInput"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import { Alert } from "@/components/ui/Alert"
import { mockCertificates, mockStudents, mockCourses } from "@/lib/mock/data"
import { EmptyState } from "@/components/ui/EmptyState"
import { formatDate, det } from "@/lib/utils"
import toast from "react-hot-toast"
import Link from "next/link"

const statusBadge: Record<string, "success" | "error"> = {
  active: "success",
  revoked: "error",
}

const statusLabels: Record<string, string> = {
  active: "ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ´ط·آ·ط¢آ·ط·آ·ط¢آ©",
  revoked: "ط·آ¸أ¢â‚¬آ¦ط·آ¸أ¢â‚¬â€چط·آ·ط·â€؛ط·آ·ط¢آ§ط·آ·ط¢آ©",
}

export default function CertificatesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showIssueModal, setShowIssueModal] = useState(false)

  const stats = useMemo(() => ({
    total: mockCertificates.length,
    active: mockCertificates.filter((c) => c.status === "active").length,
    revoked: mockCertificates.filter((c) => c.status === "revoked").length,
  }), [])

  const courseCertStats = useMemo(() => {
    const map = new Map<string, { count: number; active: number; revoked: number }>()
    mockCertificates.forEach((c) => {
      const existing = map.get(c.courseName) || { count: 0, active: 0, revoked: 0 }
      existing.count++
      if (c.status === "active") existing.active++
      else existing.revoked++
      map.set(c.courseName, existing)
    })
    return Array.from(map.entries())
  }, [])

  const filtered = useMemo(() => {
    return mockCertificates.filter((c) => {
      const matchSearch = c.studentName.includes(search) || c.certificateNumber.includes(search) || c.courseName.includes(search)
      const matchStatus = statusFilter === "all" || c.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [search, statusFilter])

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ´ط·آ¸أ¢â‚¬طŒط·آ·ط¢آ§ط·آ·ط¢آ¯ط·آ·ط¢آ§ط·آ·ط¹آ¾" subtitle="ط·آ·ط¢آ¥ط·آ·ط¢آ¯ط·آ·ط¢آ§ط·آ·ط¢آ±ط·آ·ط¢آ© ط·آ·ط¢آ´ط·آ¸أ¢â‚¬طŒط·آ·ط¢آ§ط·آ·ط¢آ¯ط·آ·ط¢آ§ط·آ·ط¹آ¾ ط·آ·ط¢آ¥ط·آ·ط¹آ¾ط·آ¸أ¢â‚¬آ¦ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ¦ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸ط¦â€™ط·آ¸ط«â€ ط·آ·ط¢آ±ط·آ·ط¢آ³ط·آ·ط¢آ§ط·آ·ط¹آ¾" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="ط·آ·ط¢آ¥ط·آ·ط¢آ¬ط·آ¸أ¢â‚¬آ¦ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸ط¸آ¹ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ´ط·آ¸أ¢â‚¬طŒط·آ·ط¢آ§ط·آ·ط¢آ¯ط·آ·ط¢آ§ط·آ·ط¹آ¾" value={stats.total} icon={HiOutlineBadgeCheck} color="primary" />
        <StatsCard title="ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ´ط·آ¸أ¢â‚¬طŒط·آ·ط¢آ§ط·آ·ط¢آ¯ط·آ·ط¢آ§ط·آ·ط¹آ¾ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬آ ط·آ·ط¢آ´ط·آ·ط¢آ·ط·آ·ط¢آ©" value={stats.active} icon={HiOutlineCheckCircle} color="success" />
        <StatsCard title="ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ´ط·آ¸أ¢â‚¬طŒط·آ·ط¢آ§ط·آ·ط¢آ¯ط·آ·ط¢آ§ط·آ·ط¹آ¾ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬آ¦ط·آ¸أ¢â‚¬â€چط·آ·ط·â€؛ط·آ·ط¢آ§ط·آ·ط¢آ©" value={stats.revoked} icon={HiOutlineXCircle} color="error" />
        <StatsCard title="ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ³ط·آ·ط¢آ¨ط·آ·ط¢آ© ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ¥ط·آ·ط¢آµط·آ·ط¢آ¯ط·آ·ط¢آ§ط·آ·ط¢آ±" value={`${Math.round((stats.active / stats.total) * 100)}%`} icon={HiOutlineAcademicCap} color="info" />
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <div className="flex flex-1 gap-3 w-full">
          <div className="flex-1">
            <SearchInput value={search} onChange={setSearch} placeholder="ط·آ·ط¢آ¨ط·آ·ط¢آ­ط·آ·ط¢آ« ط·آ·ط¢آ¨ط·آ·ط¢آ§ط·آ·ط¢آ³ط·آ¸أ¢â‚¬آ¦ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ·ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ¨ ط·آ·ط¢آ£ط·آ¸ط«â€  ط·آ·ط¢آ±ط·آ¸أ¢â‚¬ع‘ط·آ¸أ¢â‚¬آ¦ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ´ط·آ¸أ¢â‚¬طŒط·آ·ط¢آ§ط·آ·ط¢آ¯ط·آ·ط¢آ© ط·آ·ط¢آ£ط·آ¸ط«â€  ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸ط¦â€™ط·آ¸ط«â€ ط·آ·ط¢آ±ط·آ·ط¢آ³..." />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
          >
            <option value="all">ط·آ·ط¢آ¬ط·آ¸أ¢â‚¬آ¦ط·آ¸ط¸آ¹ط·آ·ط¢آ¹ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ­ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ§ط·آ·ط¹آ¾</option>
            <option value="active">ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ´ط·آ·ط¢آ·ط·آ·ط¢آ©</option>
            <option value="revoked">ط·آ¸أ¢â‚¬آ¦ط·آ¸أ¢â‚¬â€چط·آ·ط·â€؛ط·آ·ط¢آ§ط·آ·ط¢آ©</option>
          </select>
        </div>
        <button type="button" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowIssueModal(true)}>
          ط·آ·ط¢آ¥ط·آ·ط¢آµط·آ·ط¢آ¯ط·آ·ط¢آ§ط·آ·ط¢آ± ط·آ·ط¢آ´ط·آ¸أ¢â‚¬طŒط·آ·ط¢آ§ط·آ·ط¢آ¯ط·آ·ط¢آ©
        </Button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={HiOutlineDocumentText}
          title="لا يوجد شهادات"
          description="لم يتم إصدار أي شهادات بعد"
        />
      ) : (
        <Table
          columns={[
            { key: "studentName", header: "ط·آ·ط¢آ§ط·آ·ط¢آ³ط·آ¸أ¢â‚¬آ¦ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ·ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ¨", render: (c) => (
              <Link href={`/teacher/students/${c.studentId}`} className="text-sm font-medium text-text hover:text-primary transition-colors">{c.studentName}</Link>
            )},
            { key: "courseName", header: "ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸ط¦â€™ط·آ¸ط«â€ ط·آ·ط¢آ±ط·آ·ط¢آ³", render: (c) => (
              <Link href={`/teacher/courses/${c.courseId}`} className="text-text hover:text-primary transition-colors">{c.courseName}</Link>
            )},
            { key: "grade", header: "ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ¯ط·آ·ط¢آ±ط·آ·ط¢آ¬ط·آ·ط¢آ©", render: (c) => (
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${c.grade >= 90 ? "text-success" : c.grade >= 70 ? "text-warning" : "text-error"}`}>
                  {c.grade}
                </span>
                <span className="text-text-tertiary text-xs">({c.percentage}%)</span>
              </div>
            )},
            { key: "issuedAt", header: "ط·آ·ط¹آ¾ط·آ·ط¢آ§ط·آ·ط¢آ±ط·آ¸ط¸آ¹ط·آ·ط¢آ® ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ¥ط·آ·ط¢آµط·آ·ط¢آ¯ط·آ·ط¢آ§ط·آ·ط¢آ±", render: (c) => (
              <span className="text-sm text-text-secondary">{formatDate(c.issuedAt)}</span>
            )},
            { key: "certificateNumber", header: "ط·آ·ط¢آ±ط·آ¸أ¢â‚¬ع‘ط·آ¸أ¢â‚¬آ¦ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ´ط·آ¸أ¢â‚¬طŒط·آ·ط¢آ§ط·آ·ط¢آ¯ط·آ·ط¢آ©", render: (c) => (
              <span className="font-mono text-xs text-text-tertiary" dir="ltr">{c.certificateNumber}</span>
            )},
            { key: "status", header: "ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ­ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ©", render: (c) => (
              <Badge variant={statusBadge[c.status]}>{statusLabels[c.status]}</Badge>
            )},
            { key: "actions", header: "", render: (c) => (
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => toast.success("جاري تجهيز الطباعة...")} className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="ط·آ·ط¢آ·ط·آ·ط¢آ¨ط·آ·ط¢آ§ط·آ·ط¢آ¹ط·آ·ط¢آ©">
                  <HiOutlinePrinter size={16} />
                </button>
                <button type="button" onClick={() => toast.success("جاري تحميل الشهادة...")} className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="ط·آ·ط¹آ¾ط·آ·ط¢آ­ط·آ¸أ¢â‚¬آ¦ط·آ¸ط¸آ¹ط·آ¸أ¢â‚¬â€چ">
                  <HiOutlineDownload size={16} />
                </button>
                <button type="button" onClick={() => toast.success("تم إنشاء رمز QR")} className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="QR">
                  <HiOutlineQrcode size={16} />
                </button>
                {c.status === "active" && (
                  <button type="button" onClick={() => toast.success("تم إلغاء الشهادة بنجاح")} className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors" title="ط·آ·ط¢آ¥ط·آ¸أ¢â‚¬â€چط·آ·ط·â€؛ط·آ·ط¢آ§ط·آ·ط·إ’ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ´ط·آ¸أ¢â‚¬طŒط·آ·ط¢آ§ط·آ·ط¢آ¯ط·آ·ط¢آ©">
                    <HiOutlineTrash size={16} />
                  </button>
                )}
              </div>
            )},
          ]}
          data={filtered}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ´ط·آ¸أ¢â‚¬طŒط·آ·ط¢آ§ط·آ·ط¢آ¯ط·آ·ط¢آ§ط·آ·ط¹آ¾ ط·آ·ط¢آ­ط·آ·ط¢آ³ط·آ·ط¢آ¨ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸ط¦â€™ط·آ¸ط«â€ ط·آ·ط¢آ±ط·آ·ط¢آ³</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {courseCertStats.map(([course, stat]) => (
              <div key={course} className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-text truncate">{course}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0 mr-3">
                  <div className="text-center">
                    <p className="text-sm font-bold text-success">{stat.active}</p>
                    <p className="text-xs text-text-tertiary">ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ´ط·آ·ط¢آ·ط·آ·ط¢آ©</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-error">{stat.revoked}</p>
                    <p className="text-xs text-text-tertiary">ط·آ¸أ¢â‚¬آ¦ط·آ¸أ¢â‚¬â€چط·آ·ط·â€؛ط·آ·ط¢آ§ط·آ·ط¢آ©</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-text">{stat.count}</p>
                    <p className="text-xs text-text-tertiary">ط·آ·ط¢آ¥ط·آ·ط¢آ¬ط·آ¸أ¢â‚¬آ¦ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸ط¸آ¹</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ¸ط·آ·ط¢آ±ط·آ·ط¢آ© ط·آ·ط¢آ¹ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ¦ط·آ·ط¢آ© ط·آ·ط¢آ¹ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬آ° ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ´ط·آ¸أ¢â‚¬طŒط·آ·ط¢آ§ط·آ·ط¢آ¯ط·آ·ط¢آ§ط·آ·ط¹آ¾</CardTitle>
          <Badge variant="primary" size="sm">ط·آ·ط¢آ¢ط·آ·ط¢آ®ط·آ·ط¢آ± 6 ط·آ·ط¢آ£ط·آ·ط¢آ´ط·آ¸أ¢â‚¬طŒط·آ·ط¢آ±</Badge>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-3 h-40">
            {Array.from({ length: 6 }, (_, i) => {
              const monthHeight = 20 + Math.floor(det() * 60)
              const revHeight = Math.floor(det() * 15)
              return (
                <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1">
                  <div className="w-full rounded-t-md bg-error/40 transition-all" style={{ height: `${revHeight}%` }} title="ط·آ¸أ¢â‚¬آ¦ط·آ¸أ¢â‚¬â€چط·آ·ط·â€؛ط·آ·ط¢آ§ط·آ·ط¢آ©" />
                  <div className="w-full rounded-t-md bg-primary transition-all" style={{ height: `${monthHeight}%` }} title="ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ´ط·آ·ط¢آ·ط·آ·ط¢آ©" />
                  <span className="text-xs text-text-tertiary mt-1">{["ط·آ¸ط¸آ¹ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ§ط·آ¸ط¸آ¹ط·آ·ط¢آ±", "ط·آ¸ط¸آ¾ط·آ·ط¢آ¨ط·آ·ط¢آ±ط·آ·ط¢آ§ط·آ¸ط¸آ¹ط·آ·ط¢آ±", "ط·آ¸أ¢â‚¬آ¦ط·آ·ط¢آ§ط·آ·ط¢آ±ط·آ·ط¢آ³", "ط·آ·ط¢آ¥ط·آ·ط¢آ¨ط·آ·ط¢آ±ط·آ¸ط¸آ¹ط·آ¸أ¢â‚¬â€چ", "ط·آ¸أ¢â‚¬آ¦ط·آ·ط¢آ§ط·آ¸ط¸آ¹ط·آ¸ط«â€ ", "ط·آ¸ط¸آ¹ط·آ¸ط«â€ ط·آ¸أ¢â‚¬آ ط·آ¸ط¸آ¹ط·آ¸ط«â€ "][i]}</span>
                </div>
              )
            })}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-text-secondary">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-primary" />
              <span>ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ´ط·آ·ط¢آ·ط·آ·ط¢آ©</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-error/40" />
              <span>ط·آ¸أ¢â‚¬آ¦ط·آ¸أ¢â‚¬â€چط·آ·ط·â€؛ط·آ·ط¢آ§ط·آ·ط¢آ©</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={showIssueModal} onClose={() => setShowIssueModal(false)} title="ط·آ·ط¢آ¥ط·آ·ط¢آµط·آ·ط¢آ¯ط·آ·ط¢آ§ط·آ·ط¢آ± ط·آ·ط¢آ´ط·آ¸أ¢â‚¬طŒط·آ·ط¢آ§ط·آ·ط¢آ¯ط·آ·ط¢آ© ط·آ·ط¢آ¬ط·آ·ط¢آ¯ط·آ¸ط¸آ¹ط·آ·ط¢آ¯ط·آ·ط¢آ©" subtitle="ط·آ·ط¢آ§ط·آ·ط¢آ®ط·آ·ط¹آ¾ط·آ·ط¢آ± ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ·ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ¨ ط·آ¸ط«â€ ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸ط¦â€™ط·آ¸ط«â€ ط·آ·ط¢آ±ط·آ·ط¢آ³ ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ¥ط·آ·ط¢آµط·آ·ط¢آ¯ط·آ·ط¢آ§ط·آ·ط¢آ± ط·آ·ط¢آ´ط·آ¸أ¢â‚¬طŒط·آ·ط¢آ§ط·آ·ط¢آ¯ط·آ·ط¢آ© ط·آ·ط¢آ¥ط·آ·ط¹آ¾ط·آ¸أ¢â‚¬آ¦ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ¦" size="lg">
        <div className="space-y-4">
          <Select
            label="ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ·ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ¨"
            options={mockStudents.slice(0, 30).map((s) => ({ value: s.id, label: s.name }))}
            placeholder="ط·آ·ط¢آ§ط·آ·ط¢آ®ط·آ·ط¹آ¾ط·آ·ط¢آ± ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ·ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ¨"
          />
          <Select
            label="ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸ط¦â€™ط·آ¸ط«â€ ط·آ·ط¢آ±ط·آ·ط¢آ³"
            options={mockCourses.map((c) => ({ value: c.id, label: c.title }))}
            placeholder="ط·آ·ط¢آ§ط·آ·ط¢آ®ط·آ·ط¹آ¾ط·آ·ط¢آ± ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸ط¦â€™ط·آ¸ط«â€ ط·آ·ط¢آ±ط·آ·ط¢آ³"
          />
          <Input label="ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ¯ط·آ·ط¢آ±ط·آ·ط¢آ¬ط·آ·ط¢آ© ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬آ ط·آ¸أ¢â‚¬طŒط·آ·ط¢آ§ط·آ·ط¢آ¦ط·آ¸ط¸آ¹ط·آ·ط¢آ©" type="number" placeholder="ط·آ·ط¢آ¯ط·آ·ط¢آ±ط·آ·ط¢آ¬ط·آ·ط¢آ© ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ·ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ¨" />
          <Input label="ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ³ط·آ·ط¢آ¨ط·آ·ط¢آ© ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ¥ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ¬ط·آ·ط¢آ§ط·آ·ط¢آ²" type="number" placeholder="ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ³ط·آ·ط¢آ¨ط·آ·ط¢آ© ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ¥ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ¬ط·آ·ط¢آ§ط·آ·ط¢آ² %" />
          <Alert variant="info">
            ط·آ·ط¢آ³ط·آ¸ط¸آ¹ط·آ·ط¹آ¾ط·آ¸أ¢â‚¬آ¦ ط·آ·ط¢آ¥ط·آ¸أ¢â‚¬آ ط·آ·ط¢آ´ط·آ·ط¢آ§ط·آ·ط·إ’ ط·آ·ط¢آ±ط·آ¸أ¢â‚¬ع‘ط·آ¸أ¢â‚¬آ¦ ط·آ·ط¢آ´ط·آ¸أ¢â‚¬طŒط·آ·ط¢آ§ط·آ·ط¢آ¯ط·آ·ط¢آ© ط·آ¸ط¸آ¾ط·آ·ط¢آ±ط·آ¸ط¸آ¹ط·آ·ط¢آ¯ ط·آ¸ط«â€ ط·آ·ط¢آ±ط·آ¸أ¢â‚¬آ¦ط·آ·ط¢آ² QR ط·آ·ط¹آ¾ط·آ¸أ¢â‚¬â€چط·آ¸أ¢â‚¬ع‘ط·آ·ط¢آ§ط·آ·ط¢آ¦ط·آ¸ط¸آ¹ط·آ·ط¢آ§ط·آ¸أ¢â‚¬آ¹
          </Alert>
          <div className="pt-4 flex gap-3">
            <button type="button" variant="primary" size="lg" className="flex-1" onClick={() => { toast.success("تم إصدار الشهادة بنجاح"); setShowIssueModal(false); }}>ط·آ·ط¢آ¥ط·آ·ط¢آµط·آ·ط¢آ¯ط·آ·ط¢آ§ط·آ·ط¢آ± ط·آ·ط¢آ§ط·آ¸أ¢â‚¬â€چط·آ·ط¢آ´ط·آ¸أ¢â‚¬طŒط·آ·ط¢آ§ط·آ·ط¢آ¯ط·آ·ط¢آ©</Button>
            <Button variant="secondary" size="lg" onClick={() => setShowIssueModal(false)}>ط·آ·ط¢آ¥ط·آ¸أ¢â‚¬â€چط·آ·ط·â€؛ط·آ·ط¢آ§ط·آ·ط·إ’</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

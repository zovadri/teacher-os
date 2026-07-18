"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlinePlay,
  HiOutlineClock,
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlineCheckCircle,
  HiOutlineExclamation,
  HiOutlineServer,
  HiOutlineDuplicate,
  HiOutlineFilm,
  HiOutlineMenu,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Badge } from "@/components/ui/Badge"
import { Table } from "@/components/ui/Table"
import { Modal } from "@/components/ui/Modal"
import { StatsCard } from "@/components/ui/StatsCard"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { SearchInput } from "@/components/ui/SearchInput"
import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select"
import { Alert } from "@/components/ui/Alert"
import { Pagination } from "@/components/ui/Pagination"
import { mockVideoLibrary, mockCourses } from "@/lib/mock/data"
import { formatDate, formatDuration } from "@/lib/utils"

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "error" }> = {
  ready: { label: "جاهز", variant: "success" },
  processing: { label: "قيد المعالجة", variant: "warning" },
  failed: { label: "فاشل", variant: "error" },
}

const PAGE_SIZE = 15

export default function VideosPage() {
  const [search, setSearch] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [resolutionFilter, setResolutionFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [selectedVideos, setSelectedVideos] = useState<Set<string>>(new Set())
  const [showBulkModal, setShowBulkModal] = useState(false)

  const stats = useMemo(() => ({
    total: mockVideoLibrary.length,
    ready: mockVideoLibrary.filter((v) => v.status === "ready").length,
    processing: mockVideoLibrary.filter((v) => v.status === "processing").length,
    failed: mockVideoLibrary.filter((v) => v.status === "failed").length,
  }), [])

  const filtered = useMemo(() => {
    return mockVideoLibrary.filter((v) => {
      const matchSearch = v.title.includes(search) || v.courseName.includes(search)
      const matchCourse = courseFilter === "all" || v.courseId === courseFilter
      const matchStatus = statusFilter === "all" || v.status === statusFilter
      const matchRes = resolutionFilter === "all" || v.resolution === resolutionFilter
      return matchSearch && matchCourse && matchStatus && matchRes
    })
  }, [search, courseFilter, statusFilter, resolutionFilter])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const toggleSelect = (id: string) => {
    const next = new Set(selectedVideos)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedVideos(next)
  }

  const toggleAll = () => {
    if (selectedVideos.size === paginated.length) setSelectedVideos(new Set())
    else setSelectedVideos(new Set(paginated.map((v) => v.id)))
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="إدارة الفيديوهات" subtitle="عرض متقدم وتحكم شامل بالفيديوهات" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="إجمالي الفيديوهات" value={stats.total} icon={HiOutlineFilm} color="primary" />
        <StatsCard title="جاهزة" value={stats.ready} icon={HiOutlineCheckCircle} color="success" />
        <StatsCard title="قيد المعالجة" value={stats.processing} icon={HiOutlineServer} color="warning" />
        <StatsCard title="فاشلة" value={stats.failed} icon={HiOutlineExclamation} color="error" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>جميع الفيديوهات</CardTitle>
          {selectedVideos.size > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">تم اختيار {selectedVideos.size}</span>
              <Button size="sm" variant="danger" leftIcon={<HiOutlineTrash className="w-4 h-4" />} onClick={() => setShowBulkModal(true)}>
                حذف المحدد
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 border-b border-border flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1) }} placeholder="بحث بالعنوان أو الكورس..." />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                value={courseFilter}
                onChange={(e) => { setCourseFilter(e.target.value); setPage(1) }}
                className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              >
                <option value="all">جميع الكورسات</option>
                {mockCourses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
                className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              >
                <option value="all">جميع الحالات</option>
                <option value="ready">جاهز</option>
                <option value="processing">قيد المعالجة</option>
                <option value="failed">فاشل</option>
              </select>
              <select
                value={resolutionFilter}
                onChange={(e) => { setResolutionFilter(e.target.value); setPage(1) }}
                className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              >
                <option value="all">جميع الدقات</option>
                <option value="1080p">1080p</option>
                <option value="720p">720p</option>
                <option value="480p">480p</option>
              </select>
            </div>
          </div>
          <Table
            columns={[
              { key: "select", header: "", render: (v) => (
                <input
                  type="checkbox"
                  checked={selectedVideos.has(v.id)}
                  onChange={() => toggleSelect(v.id)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 cursor-pointer"
                />
              ), className: "w-10" },
              { key: "title", header: "الفيديو", render: (v) => (
                <div className="flex items-center gap-3">
                  <div className="w-16 h-10 rounded-lg bg-surface-secondary overflow-hidden shrink-0 relative group">
                    <img src={v.thumbnail} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <HiOutlinePlay className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text truncate">{v.title}</p>
                    <p className="text-xs text-text-tertiary truncate">{v.courseName}</p>
                  </div>
                </div>
              )},
              { key: "duration", header: "المدة", render: (v) => (
                <div className="flex items-center gap-1 text-sm text-text-secondary">
                  <HiOutlineClock className="w-3.5 h-3.5" />
                  <span>{v.duration} د</span>
                </div>
              )},
              { key: "resolution", header: "الدقة", render: (v) => (
                <Badge variant="neutral" size="sm">{v.resolution}</Badge>
              )},
              { key: "size", header: "الحجم", render: (v) => (
                <span className="text-sm text-text-secondary">{v.size} MB</span>
              )},
              { key: "views", header: "المشاهدات", render: (v) => (
                <div className="flex items-center gap-1 text-sm text-text-secondary">
                  <HiOutlineEye className="w-3.5 h-3.5" />
                  <span>{v.views.toLocaleString("ar-EG")}</span>
                </div>
              )},
              { key: "uploadDate", header: "تاريخ الرفع", render: (v) => (
                <span className="text-xs text-text-tertiary">{formatDate(v.uploadDate)}</span>
              )},
              { key: "status", header: "الحالة", render: (v) => (
                <Badge variant={statusConfig[v.status].variant}>{statusConfig[v.status].label}</Badge>
              )},
              { key: "actions", header: "", render: (v) => (
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors">
                    <HiOutlineTrash size={16} />
                  </button>
                </div>
              )},
            ]}
            data={paginated}
          />
          {totalPages > 1 && (
            <div className="p-4 border-t border-border">
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          )}
        </CardContent>
      </Card>

      <Modal isOpen={showBulkModal} onClose={() => setShowBulkModal(false)} title="تأكيد الحذف الجماعي" size="sm">
        <div className="space-y-4">
          <Alert variant="error" title="تحذير">
            سيتم حذف {selectedVideos.size} فيديو(ات) بشكل دائم. لا يمكن التراجع عن هذا الإجراء.
          </Alert>
          <div className="flex gap-3">
            <Button variant="danger" size="lg" className="flex-1">تأكيد الحذف</Button>
            <Button variant="secondary" size="lg" onClick={() => setShowBulkModal(false)}>إلغاء</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

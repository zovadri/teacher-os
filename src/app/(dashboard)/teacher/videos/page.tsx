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
import Link from "next/link"
import { useRouter } from "next/navigation"

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "error" }> = {
  ready: { label: "ط¬ط§ظ‡ط²", variant: "success" },
  processing: { label: "ظ‚ظٹط¯ ط§ظ„ظ…ط¹ط§ظ„ط¬ط©", variant: "warning" },
  failed: { label: "ظپط§ط´ظ„", variant: "error" },
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
      <DashboardHeader title="ط¥ط¯ط§ط±ط© ط§ظ„ظپظٹط¯ظٹظˆظ‡ط§طھ" subtitle="ط¹ط±ط¶ ظ…طھظ‚ط¯ظ… ظˆطھط­ظƒظ… ط´ط§ظ…ظ„ ط¨ط§ظ„ظپظٹط¯ظٹظˆظ‡ط§طھ" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظپظٹط¯ظٹظˆظ‡ط§طھ" value={stats.total} icon={HiOutlineFilm} color="primary" />
        <StatsCard title="ط¬ط§ظ‡ط²ط©" value={stats.ready} icon={HiOutlineCheckCircle} color="success" />
        <StatsCard title="ظ‚ظٹط¯ ط§ظ„ظ…ط¹ط§ظ„ط¬ط©" value={stats.processing} icon={HiOutlineServer} color="warning" />
        <StatsCard title="ظپط§ط´ظ„ط©" value={stats.failed} icon={HiOutlineExclamation} color="error" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle>جميع الفيديوهات</CardTitle>
            <Link href="/teacher/videos/analytics" className="text-sm text-primary hover:text-primary-dark transition-colors">
              تحليلات الفيديو
            </Link>
          </div>
          {selectedVideos.size > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">طھظ… ط§ط®طھظٹط§ط± {selectedVideos.size}</span>
              <button type="button" size="sm" variant="danger" leftIcon={<HiOutlineTrash className="w-4 h-4" />} onClick={() => setShowBulkModal(true)}>
                ط­ط°ظپ ط§ظ„ظ…ط­ط¯ط¯
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 border-b border-border flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1) }} placeholder="ط¨ط­ط« ط¨ط§ظ„ط¹ظ†ظˆط§ظ† ط£ظˆ ط§ظ„ظƒظˆط±ط³..." />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                value={courseFilter}
                onChange={(e) => { setCourseFilter(e.target.value); setPage(1) }}
                className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              >
                <option value="all">ط¬ظ…ظٹط¹ ط§ظ„ظƒظˆط±ط³ط§طھ</option>
                {mockCourses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
                className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              >
                <option value="all">ط¬ظ…ظٹط¹ ط§ظ„ط­ط§ظ„ط§طھ</option>
                <option value="ready">ط¬ط§ظ‡ط²</option>
                <option value="processing">ظ‚ظٹط¯ ط§ظ„ظ…ط¹ط§ظ„ط¬ط©</option>
                <option value="failed">ظپط§ط´ظ„</option>
              </select>
              <select
                value={resolutionFilter}
                onChange={(e) => { setResolutionFilter(e.target.value); setPage(1) }}
                className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
              >
                <option value="all">ط¬ظ…ظٹط¹ ط§ظ„ط¯ظ‚ط§طھ</option>
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
              { key: "title", header: "ط§ظ„ظپظٹط¯ظٹظˆ", render: (v) => (
                <Link href={`/teacher/videos/${v.id}`} className="flex items-center gap-3">
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
                </Link>
              )},
              { key: "duration", header: "ط§ظ„ظ…ط¯ط©", render: (v) => (
                <div className="flex items-center gap-1 text-sm text-text-secondary">
                  <HiOutlineClock className="w-3.5 h-3.5" />
                  <span>{v.duration} ط¯</span>
                </div>
              )},
              { key: "resolution", header: "ط§ظ„ط¯ظ‚ط©", render: (v) => (
                <Badge variant="neutral" size="sm">{v.resolution}</Badge>
              )},
              { key: "size", header: "ط§ظ„ط­ط¬ظ…", render: (v) => (
                <span className="text-sm text-text-secondary">{v.size} MB</span>
              )},
              { key: "views", header: "ط§ظ„ظ…ط´ط§ظ‡ط¯ط§طھ", render: (v) => (
                <div className="flex items-center gap-1 text-sm text-text-secondary">
                  <HiOutlineEye className="w-3.5 h-3.5" />
                  <span>{v.views.toLocaleString("ar-EG")}</span>
                </div>
              )},
              { key: "uploadDate", header: "طھط§ط±ظٹط® ط§ظ„ط±ظپط¹", render: (v) => (
                <span className="text-xs text-text-tertiary">{formatDate(v.uploadDate)}</span>
              )},
              { key: "status", header: "ط§ظ„ط­ط§ظ„ط©", render: (v) => (
                <Badge variant={statusConfig[v.status].variant}>{statusConfig[v.status].label}</Badge>
              )},
              { key: "actions", header: "", render: (v) => (
                <div className="flex items-center gap-1">
                  <button type="button" className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors">
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

      <Modal isOpen={showBulkModal} onClose={() => setShowBulkModal(false)} title="طھط£ظƒظٹط¯ ط§ظ„ط­ط°ظپ ط§ظ„ط¬ظ…ط§ط¹ظٹ" size="sm">
        <div className="space-y-4">
          <Alert variant="error" title="طھط­ط°ظٹط±">
            ط³ظٹطھظ… ط­ط°ظپ {selectedVideos.size} ظپظٹط¯ظٹظˆ(ط§طھ) ط¨ط´ظƒظ„ ط¯ط§ط¦ظ…. ظ„ط§ ظٹظ…ظƒظ† ط§ظ„طھط±ط§ط¬ط¹ ط¹ظ† ظ‡ط°ط§ ط§ظ„ط¥ط¬ط±ط§ط،.
          </Alert>
          <div className="flex gap-3">
            <button type="button" variant="danger" size="lg" className="flex-1">طھط£ظƒظٹط¯ ط§ظ„ط­ط°ظپ</Button>
            <Button variant="secondary" size="lg" onClick={() => setShowBulkModal(false)}>ط¥ظ„ط؛ط§ط،</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlinePlay,
  HiOutlineClock,
  HiOutlineEye,
  HiOutlineUpload,
  HiOutlineViewGrid,
  HiOutlineViewList,
  HiOutlineCollection,
  HiOutlineFilm,
  HiOutlineCheckCircle,
  HiOutlineExclamation,
  HiOutlineServer,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Badge } from "@/components/ui/Badge"
import { Modal } from "@/components/ui/Modal"
import { StatsCard } from "@/components/ui/StatsCard"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { SearchInput } from "@/components/ui/SearchInput"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Textarea from "@/components/ui/Textarea"
import { mockVideoLibrary, mockCourses } from "@/lib/mock/data"
import { formatDate, cn } from "@/lib/utils"
import toast from "react-hot-toast"
import Link from "next/link"

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "error" }> = {
  ready: { label: "ط·آ¬ط·آ§ط¸â€،ط·آ²", variant: "success" },
  processing: { label: "ط¸â€ڑط¸ظ¹ط·آ¯ ط·آ§ط¸â€‍ط¸â€¦ط·آ¹ط·آ§ط¸â€‍ط·آ¬ط·آ©", variant: "warning" },
  failed: { label: "ط¸ظ¾ط·آ§ط·آ´ط¸â€‍", variant: "error" },
}

const formatDuration = (mins: number) => `${mins}:${String((mins * 7 + 13) % 60).padStart(2, "0")}`

export default function FilesPage() {
  const [search, setSearch] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showUploadModal, setShowUploadModal] = useState(false)

  const stats = useMemo(() => ({
    total: mockVideoLibrary.length,
    ready: mockVideoLibrary.filter((v) => v.status === "ready").length,
    processing: mockVideoLibrary.filter((v) => v.status === "processing").length,
    failed: mockVideoLibrary.filter((v) => v.status === "failed").length,
    totalViews: mockVideoLibrary.reduce((s, v) => s + v.views, 0),
  }), [])

  const filtered = useMemo(() => {
    return mockVideoLibrary.filter((v) => {
      const matchSearch = v.title.includes(search) || v.courseName.includes(search)
      const matchCourse = courseFilter === "all" || v.courseId === courseFilter
      const matchStatus = statusFilter === "all" || v.status === statusFilter
      return matchSearch && matchCourse && matchStatus
    })
  }, [search, courseFilter, statusFilter])

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="ط¸â€¦ط¸ئ’ط·ع¾ط·آ¨ط·آ© ط·آ§ط¸â€‍ط¸â€¦ط¸â€‍ط¸ظ¾ط·آ§ط·ع¾" subtitle="ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط·آ§ط¸â€‍ط¸ظ¾ط¸ظ¹ط·آ¯ط¸ظ¹ط¸ث†ط¸â€،ط·آ§ط·ع¾ ط¸ث†ط·آ§ط¸â€‍ط¸â€¦ط¸â€‍ط¸ظ¾ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·ع¾ط·آ¹ط¸â€‍ط¸ظ¹ط¸â€¦ط¸ظ¹ط·آ©" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ ط·آ§ط¸â€‍ط¸ظ¾ط¸ظ¹ط·آ¯ط¸ظ¹ط¸ث†ط¸â€،ط·آ§ط·ع¾" value={stats.total} icon={HiOutlineFilm} color="primary" />
        <StatsCard title="ط·آ¬ط·آ§ط¸â€،ط·آ²ط·آ©" value={stats.ready} icon={HiOutlineCheckCircle} color="success" />
        <StatsCard title="ط¸â€ڑط¸ظ¹ط·آ¯ ط·آ§ط¸â€‍ط¸â€¦ط·آ¹ط·آ§ط¸â€‍ط·آ¬ط·آ©" value={stats.processing} icon={HiOutlineServer} color="warning" />
        <StatsCard title="ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ ط·آ§ط¸â€‍ط¸â€¦ط·آ´ط·آ§ط¸â€،ط·آ¯ط·آ§ط·ع¾" value={stats.totalViews.toLocaleString("ar-EG")} icon={HiOutlineEye} color="info" />
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <div className="flex flex-1 flex-wrap gap-3 w-full">
          <div className="flex-1 min-w-[200px]">
            <SearchInput value={search} onChange={setSearch} placeholder="ط·آ¨ط·آ­ط·آ« ط¸ظ¾ط¸ظ¹ ط·آ§ط¸â€‍ط¸ظ¾ط¸ظ¹ط·آ¯ط¸ظ¹ط¸ث†ط¸â€،ط·آ§ط·ع¾..." />
          </div>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
          >
            <option value="all">ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¹ ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³ط·آ§ط·ع¾</option>
            {mockCourses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
          >
            <option value="all">ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¹ ط·آ§ط¸â€‍ط·آ­ط·آ§ط¸â€‍ط·آ§ط·ع¾</option>
            <option value="ready">ط·آ¬ط·آ§ط¸â€،ط·آ²</option>
            <option value="processing">ط¸â€ڑط¸ظ¹ط·آ¯ ط·آ§ط¸â€‍ط¸â€¦ط·آ¹ط·آ§ط¸â€‍ط·آ¬ط·آ©</option>
            <option value="failed">ط¸ظ¾ط·آ§ط·آ´ط¸â€‍</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-surface border border-border rounded-xl p-1">
            <button type="button"
              onClick={() => setViewMode("grid")}
              className={cn("p-1.5 rounded-lg transition-colors", viewMode === "grid" ? "bg-primary text-white" : "text-text-tertiary hover:text-text")}
            >
              <HiOutlineViewGrid className="w-4 h-4" />
            </button>
            <button type="button"
              onClick={() => setViewMode("list")}
              className={cn("p-1.5 rounded-lg transition-colors", viewMode === "list" ? "bg-primary text-white" : "text-text-tertiary hover:text-text")}
            >
              <HiOutlineViewList className="w-4 h-4" />
            </button>
          </div>
          <Button leftIcon={<HiOutlineUpload className="w-4 h-4" />} onClick={() => setShowUploadModal(true)}>
            ط·آ±ط¸ظ¾ط·آ¹ ط¸ظ¾ط¸ظ¹ط·آ¯ط¸ظ¹ط¸ث†
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-surface border border-border rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="relative aspect-video bg-surface-secondary overflow-hidden">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <HiOutlinePlay className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 text-white text-xs">
                  <HiOutlineClock className="w-3 h-3" />
                  <span>{video.duration} ط·آ¯ط¸â€ڑط¸ظ¹ط¸â€ڑط·آ©</span>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge variant={statusConfig[video.status].variant} size="sm">
                    {statusConfig[video.status].label}
                  </Badge>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-text truncate mb-1">{video.title}</h3>
                <Link href={`/teacher/courses/${video.courseId}`} className="text-xs text-text-tertiary truncate mb-2 hover:text-primary transition-colors block">{video.courseName}</Link>
                <div className="flex items-center justify-between text-xs text-text-tertiary">
                  <span>{formatDate(video.uploadDate)}</span>
                  <div className="flex items-center gap-1">
                    <HiOutlineEye className="w-3 h-3" />
                    <span>{video.views.toLocaleString("ar-EG")}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((video) => (
            <div key={video.id} className="flex items-center gap-4 p-3 bg-surface border border-border rounded-xl hover:shadow-sm transition-shadow">
              <div className="w-24 h-16 rounded-lg bg-surface-secondary overflow-hidden shrink-0">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-text truncate">{video.title}</p>
                <p className="text-xs text-text-tertiary truncate"><Link href={`/teacher/courses/${video.courseId}`} className="hover:text-primary transition-colors">{video.courseName}</Link> ط¢آ· {video.resolution} ط¢آ· {video.format}</p>
              </div>
              <div className="text-xs text-text-tertiary shrink-0">{video.duration} ط·آ¯</div>
              <Badge variant={statusConfig[video.status].variant} size="sm">{statusConfig[video.status].label}</Badge>
              <div className="flex items-center gap-1 text-xs text-text-tertiary shrink-0">
                <HiOutlineEye className="w-3 h-3" />
                <span>{video.views}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} title="ط·آ±ط¸ظ¾ط·آ¹ ط¸ظ¾ط¸ظ¹ط·آ¯ط¸ظ¹ط¸ث† ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯" subtitle="ط·آ£ط·آ¯ط·آ®ط¸â€‍ ط·آ¨ط¸ظ¹ط·آ§ط¸â€ ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط¸ظ¾ط¸ظ¹ط·آ¯ط¸ظ¹ط¸ث† ط¸ث†ط·آ§ط·آ®ط·ع¾ط·آ± ط·آ§ط¸â€‍ط¸â€¦ط¸â€‍ط¸ظ¾" size="lg">
        <div className="space-y-4">
          <Input label="ط·آ¹ط¸â€ ط¸ث†ط·آ§ط¸â€  ط·آ§ط¸â€‍ط¸ظ¾ط¸ظ¹ط·آ¯ط¸ظ¹ط¸ث†" placeholder="ط·آ£ط·آ¯ط·آ®ط¸â€‍ ط·آ¹ط¸â€ ط¸ث†ط·آ§ط¸â€  ط·آ§ط¸â€‍ط¸ظ¾ط¸ظ¹ط·آ¯ط¸ظ¹ط¸ث†" />
          <Textarea label="ط·آ§ط¸â€‍ط¸ث†ط·آµط¸ظ¾" placeholder="ط¸ث†ط·آµط¸ظ¾ ط·آ§ط¸â€‍ط¸ظ¾ط¸ظ¹ط·آ¯ط¸ظ¹ط¸ث† ط¸â€¦ط·آ¹ ط·ع¾ط¸ظ¾ط·آ§ط·آµط¸ظ¹ط¸â€‍ ط·آ§ط¸â€‍ط¸â€¦ط·آ­ط·ع¾ط¸ث†ط¸â€°" rows={3} />
          <Select label="ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³" options={mockCourses.map((c) => ({ value: c.id, label: c.title }))} placeholder="ط·آ§ط·آ®ط·ع¾ط·آ± ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³" />
          <Select label="ط·آ§ط¸â€‍ط¸ظ¾ط·آµط¸â€‍" options={[
            { value: "ch-1", label: "ط·آ§ط¸â€‍ط¸â€¦ط¸â€ڑط·آ¯ط¸â€¦ط·آ©" },
            { value: "ch-2", label: "ط·آ§ط¸â€‍ط·آ£ط·آ³ط·آ§ط·آ³ط¸ظ¹ط·آ§ط·ع¾" },
            { value: "ch-3", label: "ط·آ§ط¸â€‍ط¸â€¦ط·آ³ط·ع¾ط¸ث†ط¸â€° ط·آ§ط¸â€‍ط¸â€¦ط·ع¾ط¸â€ڑط·آ¯ط¸â€¦" },
          ]} placeholder="ط·آ§ط·آ®ط·ع¾ط·آ± ط·آ§ط¸â€‍ط¸ظ¾ط·آµط¸â€‍ (ط·آ§ط·آ®ط·ع¾ط¸ظ¹ط·آ§ط·آ±ط¸ظ¹)" />
          <div className="flex items-center justify-center p-8 rounded-xl border-2 border-dashed border-border bg-surface-secondary cursor-pointer hover:border-primary/50 transition-colors">
            <div className="text-center">
              <HiOutlineUpload className="w-8 h-8 mx-auto text-text-tertiary mb-2" />
              <p className="text-sm text-text-secondary">ط·آ§ط·آ³ط·آ­ط·آ¨ ط¸ث†ط·آ£ط¸ظ¾ط¸â€‍ط·ع¾ ط·آ§ط¸â€‍ط¸ظ¾ط¸ظ¹ط·آ¯ط¸ظ¹ط¸ث† ط¸â€،ط¸â€ ط·آ§ ط·آ£ط¸ث† ط·آ§ط·آ¶ط·ط›ط·آ· ط¸â€‍ط¸â€‍ط·آ§ط·آ®ط·ع¾ط¸ظ¹ط·آ§ط·آ±</p>
              <p className="text-xs text-text-tertiary mt-1">MP4, AVI, MKV - ط·آ­ط·آ¯ ط·آ£ط¸â€ڑط·آµط¸â€° 500MB</p>
            </div>
          </div>
          <div className="pt-4 flex gap-3">
            <Button variant="primary" size="lg" className="flex-1" onClick={() => { toast.success("ط¬ط§ط±ظٹ ط±ظپط¹ ط§ظ„ظپظٹط¯ظٹظˆ..."); setShowUploadModal(false); }}>ط·آ±ط¸ظ¾ط·آ¹ ط·آ§ط¸â€‍ط¸ظ¾ط¸ظ¹ط·آ¯ط¸ظ¹ط¸ث†</Button>
            <Button variant="secondary" size="lg" onClick={() => setShowUploadModal(false)}>ط·آ¥ط¸â€‍ط·ط›ط·آ§ط·طŒ</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

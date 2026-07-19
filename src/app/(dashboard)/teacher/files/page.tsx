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
  ready: { label: "ط¬ط§ظ‡ط²", variant: "success" },
  processing: { label: "ظ‚ظٹط¯ ط§ظ„ظ…ط¹ط§ظ„ط¬ط©", variant: "warning" },
  failed: { label: "ظپط§ط´ظ„", variant: "error" },
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
      <DashboardHeader title="ظ…ظƒطھط¨ط© ط§ظ„ظ…ظ„ظپط§طھ" subtitle="ط¥ط¯ط§ط±ط© ط§ظ„ظپظٹط¯ظٹظˆظ‡ط§طھ ظˆط§ظ„ظ…ظ„ظپط§طھ ط§ظ„طھط¹ظ„ظٹظ…ظٹط©" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظپظٹط¯ظٹظˆظ‡ط§طھ" value={stats.total} icon={HiOutlineFilm} color="primary" />
        <StatsCard title="ط¬ط§ظ‡ط²ط©" value={stats.ready} icon={HiOutlineCheckCircle} color="success" />
        <StatsCard title="ظ‚ظٹط¯ ط§ظ„ظ…ط¹ط§ظ„ط¬ط©" value={stats.processing} icon={HiOutlineServer} color="warning" />
        <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظ…ط´ط§ظ‡ط¯ط§طھ" value={stats.totalViews.toLocaleString("ar-EG")} icon={HiOutlineEye} color="info" />
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <div className="flex flex-1 flex-wrap gap-3 w-full">
          <div className="flex-1 min-w-[200px]">
            <SearchInput value={search} onChange={setSearch} placeholder="ط¨ط­ط« ظپظٹ ط§ظ„ظپظٹط¯ظٹظˆظ‡ط§طھ..." />
          </div>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
          >
            <option value="all">ط¬ظ…ظٹط¹ ط§ظ„ظƒظˆط±ط³ط§طھ</option>
            {mockCourses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
          >
            <option value="all">ط¬ظ…ظٹط¹ ط§ظ„ط­ط§ظ„ط§طھ</option>
            <option value="ready">ط¬ط§ظ‡ط²</option>
            <option value="processing">ظ‚ظٹط¯ ط§ظ„ظ…ط¹ط§ظ„ط¬ط©</option>
            <option value="failed">ظپط§ط´ظ„</option>
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
          <button type="button" leftIcon={<HiOutlineUpload className="w-4 h-4" />} onClick={() => setShowUploadModal(true)}>
            ط±ظپط¹ ظپظٹط¯ظٹظˆ
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
                  <span>{video.duration} ط¯ظ‚ظٹظ‚ط©</span>
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
                <p className="text-xs text-text-tertiary truncate"><Link href={`/teacher/courses/${video.courseId}`} className="hover:text-primary transition-colors">{video.courseName}</Link> آ· {video.resolution} آ· {video.format}</p>
              </div>
              <div className="text-xs text-text-tertiary shrink-0">{video.duration} ط¯</div>
              <Badge variant={statusConfig[video.status].variant} size="sm">{statusConfig[video.status].label}</Badge>
              <div className="flex items-center gap-1 text-xs text-text-tertiary shrink-0">
                <HiOutlineEye className="w-3 h-3" />
                <span>{video.views}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} title="ط±ظپط¹ ظپظٹط¯ظٹظˆ ط¬ط¯ظٹط¯" subtitle="ط£ط¯ط®ظ„ ط¨ظٹط§ظ†ط§طھ ط§ظ„ظپظٹط¯ظٹظˆ ظˆط§ط®طھط± ط§ظ„ظ…ظ„ظپ" size="lg">
        <div className="space-y-4">
          <Input label="ط¹ظ†ظˆط§ظ† ط§ظ„ظپظٹط¯ظٹظˆ" placeholder="ط£ط¯ط®ظ„ ط¹ظ†ظˆط§ظ† ط§ظ„ظپظٹط¯ظٹظˆ" />
          <Textarea label="ط§ظ„ظˆطµظپ" placeholder="ظˆطµظپ ط§ظ„ظپظٹط¯ظٹظˆ ظ…ط¹ طھظپط§طµظٹظ„ ط§ظ„ظ…ط­طھظˆظ‰" rows={3} />
          <Select label="ط§ظ„ظƒظˆط±ط³" options={mockCourses.map((c) => ({ value: c.id, label: c.title }))} placeholder="ط§ط®طھط± ط§ظ„ظƒظˆط±ط³" />
          <Select label="ط§ظ„ظپطµظ„" options={[
            { value: "ch-1", label: "ط§ظ„ظ…ظ‚ط¯ظ…ط©" },
            { value: "ch-2", label: "ط§ظ„ط£ط³ط§ط³ظٹط§طھ" },
            { value: "ch-3", label: "ط§ظ„ظ…ط³طھظˆظ‰ ط§ظ„ظ…طھظ‚ط¯ظ…" },
          ]} placeholder="ط§ط®طھط± ط§ظ„ظپطµظ„ (ط§ط®طھظٹط§ط±ظٹ)" />
          <div className="flex items-center justify-center p-8 rounded-xl border-2 border-dashed border-border bg-surface-secondary cursor-pointer hover:border-primary/50 transition-colors">
            <div className="text-center">
              <HiOutlineUpload className="w-8 h-8 mx-auto text-text-tertiary mb-2" />
              <p className="text-sm text-text-secondary">ط§ط³ط­ط¨ ظˆط£ظپظ„طھ ط§ظ„ظپظٹط¯ظٹظˆ ظ‡ظ†ط§ ط£ظˆ ط§ط¶ط؛ط· ظ„ظ„ط§ط®طھظٹط§ط±</p>
              <p className="text-xs text-text-tertiary mt-1">MP4, AVI, MKV - ط­ط¯ ط£ظ‚طµظ‰ 500MB</p>
            </div>
          </div>
          <div className="pt-4 flex gap-3">
            <button type="button" variant="primary" size="lg" className="flex-1" onClick={() => { toast.success("جاري رفع الفيديو..."); setShowUploadModal(false); }}>ط±ظپط¹ ط§ظ„ظپظٹط¯ظٹظˆ</Button>
            <Button variant="secondary" size="lg" onClick={() => setShowUploadModal(false)}>ط¥ظ„ط؛ط§ط،</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

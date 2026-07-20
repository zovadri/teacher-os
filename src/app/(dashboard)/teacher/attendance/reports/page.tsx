"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineChartSquareBar,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlineExclamation,
  HiOutlineDownload,
  HiOutlinePrinter,
  HiOutlineDocumentText,
  HiOutlineTable,
  HiOutlineFilter,
  HiOutlineSearch,
} from "react-icons/hi"
import { Toaster, toast } from "react-hot-toast"
import { cn, formatDate } from "@/lib/utils"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Table } from "@/components/ui/Table"
import { SearchInput } from "@/components/ui/SearchInput"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { StatsSkeleton, TableSkeleton, CardSkeleton } from "@/components/ui/Skeleton"
import { Pagination } from "@/components/ui/Pagination"
import { mockAttendance, mockCourses } from "@/lib/mock/data"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell,
} from "recharts"

const CHART_COLORS = {
  present: "#10B981",
  absent: "#EF4444",
  late: "#F59E0B",
  excused: "#3B82F6",
}

export default function AttendanceReportsPage() {
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const pageSize = 10

  const filtered = useMemo(() => {
    let data = [...mockAttendance]
    if (fromDate) {
      data = data.filter((a) => new Date(a.date) >= new Date(fromDate))
    }
    if (toDate) {
      data = data.filter((a) => new Date(a.date) <= new Date(toDate))
    }
    if (searchTerm) {
      data = data.filter((a) => a.studentName.includes(searchTerm))
    }
    if (courseFilter !== "all") {
      data = data.filter((a) => a.courseId === courseFilter)
    }
    if (statusFilter !== "all") {
      data = data.filter((a) => a.status === statusFilter)
    }
    return data.sort((a, b) => b.date.getTime() - a.date.getTime())
  }, [fromDate, toDate, searchTerm, courseFilter, statusFilter])

  const stats = useMemo(() => {
    const total = filtered.length
    const present = filtered.filter((a) => a.status === "present").length
    const absent = filtered.filter((a) => a.status === "absent").length
    const late = filtered.filter((a) => a.status === "late").length
    const excused = filtered.filter((a) => a.status === "excused").length
    return { total, present, absent, late, excused, rate: total > 0 ? Math.round((present / total) * 100) : 0 }
  }, [filtered])

  const chartData = useMemo(() => {
    const grouped: Record<string, { present: number; absent: number; late: number; excused: number }> = {}
    filtered.forEach((a) => {
      const key = formatDate(a.date)
      if (!grouped[key]) grouped[key] = { present: 0, absent: 0, late: 0, excused: 0 }
      grouped[key][a.status]++
    })
    return Object.entries(grouped).map(([date, counts]) => ({ date, ...counts }))
  }, [filtered])

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, currentPage])

  const totalPages = Math.ceil(filtered.length / pageSize)

  const handleExportPDF = () => {
    toast.success("ط·آ¬ط·آ§ط·آ±ط¸ع† ط·ع¾ط·آµط·آ¯ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط·آ¨ط·آµط¸ظ¹ط·ط›ط·آ© PDF", { position: "top-left" })
    setTimeout(() => toast.success("ط·ع¾ط¸â€¦ ط·ع¾ط·آµط·آ¯ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط·آ¨ط¸â€ ط·آ¬ط·آ§ط·آ­", { position: "top-left" }), 1500)
  }

  const handleExportExcel = () => {
    toast.success("ط·آ¬ط·آ§ط·آ±ط¸ع† ط·ع¾ط·آµط·آ¯ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط·آ¨ط·آµط¸ظ¹ط·ط›ط·آ© Excel", { position: "top-left" })
    setTimeout(() => toast.success("ط·ع¾ط¸â€¦ ط·ع¾ط·آµط·آ¯ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط·آ¨ط¸â€ ط·آ¬ط·آ§ط·آ­", { position: "top-left" }), 1500)
  }

  const handlePrint = () => {
    toast.success("ط·آ¬ط·آ§ط·آ±ط¸ع† ط·ع¾ط·آ­ط·آ¶ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ±ط¸ظ¹ط·آ± ط¸â€‍ط¸â€‍ط·آ·ط·آ¨ط·آ§ط·آ¹ط·آ©", { position: "top-left" })
    setTimeout(() => window.print(), 500)
  }

  if (hasError) {
    return (
      <div className="p-4 md:p-6">
        <ErrorState
          title="ط·آ­ط·آ¯ط·آ« ط·آ®ط·آ·ط·آ£ ط¸ظ¾ط¸ظ¹ ط·ع¾ط·آ­ط¸â€¦ط¸ظ¹ط¸â€‍ ط·آ§ط¸â€‍ط·ع¾ط¸â€ڑط·آ§ط·آ±ط¸ظ¹ط·آ±"
          message="ط¸ظ¹ط·آ±ط·آ¬ط¸â€° ط·آ§ط¸â€‍ط¸â€¦ط·آ­ط·آ§ط¸ث†ط¸â€‍ط·آ© ط¸â€¦ط·آ±ط·آ© ط·آ£ط·آ®ط·آ±ط¸â€°"
          onRetry={() => setHasError(false)}
        />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Toaster />
      <Breadcrumb items={[{ label: "ط§ظ„ط­ط¶ظˆط±", href: "/teacher/attendance" }, { label: "طھظ‚ط§ط±ظٹط± ط§ظ„ط­ط¶ظˆط±" }]} />
      <PageHeader
        title="ط·ع¾ط¸â€ڑط·آ§ط·آ±ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط·آ­ط·آ¶ط¸ث†ط·آ±"
        description="ط·آ¹ط·آ±ط·آ¶ ط¸ث†ط·ع¾ط·آ­ط¸â€‍ط¸ظ¹ط¸â€‍ ط·آ¥ط·آ­ط·آµط·آ§ط·آ¦ط¸ظ¹ط·آ§ط·ع¾ ط·آ­ط·آ¶ط¸ث†ط·آ± ط·آ§ط¸â€‍ط·آ·ط¸â€‍ط·آ§ط·آ¨"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" leftIcon={<HiOutlineDocumentText className="w-4 h-4" />} onClick={handleExportPDF}>
              PDF
            </Button>
            <Button variant="secondary" size="sm" leftIcon={<HiOutlineTable className="w-4 h-4" />} onClick={handleExportExcel}>
              Excel
            </Button>
            <Button variant="primary" size="sm" leftIcon={<HiOutlinePrinter className="w-4 h-4" />} onClick={handlePrint}>
              ط·آ·ط·آ¨ط·آ§ط·آ¹ط·آ©
            </Button>
          </div>
        }
      />

      {isLoading ? (
        <StatsSkeleton count={5} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <StatsCard title="ط·آ§ط¸â€‍ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹" value={stats.total} icon={HiOutlineChartSquareBar} color="primary" />
          <StatsCard title="ط·آ­ط·آ§ط·آ¶ط·آ±" value={stats.present} icon={HiOutlineCheckCircle} color="success" />
          <StatsCard title="ط·ط›ط·آ§ط·آ¦ط·آ¨" value={stats.absent} icon={HiOutlineXCircle} color="error" />
          <StatsCard title="ط¸â€¦ط·ع¾ط·آ£ط·آ®ط·آ±" value={stats.late} icon={HiOutlineClock} color="warning" />
          <StatsCard title="ط¸â€¦ط·آ¹ط·آ°ط·آ±" value={stats.excused} icon={HiOutlineExclamation} color="info" />
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>ط¸â€ ط·آ³ط·آ¨ط·آ© ط·آ§ط¸â€‍ط·آ­ط·آ¶ط¸ث†ط·آ± ط·آ­ط·آ³ط·آ¨ ط·آ§ط¸â€‍ط·ع¾ط·آ§ط·آ±ط¸ظ¹ط·آ®</CardTitle>
            <Badge variant="primary" size="sm">{stats.rate}%</Badge>
          </CardHeader>
          <CardContent>
            {chartData.length === 0 ? (
              <EmptyState
                icon={HiOutlineChartSquareBar}
                title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·آ¨ط¸ظ¹ط·آ§ط¸â€ ط·آ§ط·ع¾"
                description="ط¸â€‍ط¸â€¦ ط¸ظ¹ط·ع¾ط¸â€¦ ط·آ§ط¸â€‍ط·آ¹ط·آ«ط¸ث†ط·آ± ط·آ¹ط¸â€‍ط¸â€° ط·آ³ط·آ¬ط¸â€‍ط·آ§ط·ع¾ ط·آ­ط·آ¶ط¸ث†ط·آ± ط¸â€‍ط¸â€‍ط¸ظ¾ط·ع¾ط·آ±ط·آ© ط·آ§ط¸â€‍ط¸â€¦ط·آ­ط·آ¯ط·آ¯ط·آ©"
                withBackground={false}
              />
            ) : (
              <div dir="ltr" className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                    <XAxis dataKey="date" tick={{ fill: "#475569", fontSize: 10 }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                    <YAxis tick={{ fill: "#475569", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: "#FFFFFF",
                        border: "1px solid #E2E8F0",
                        borderRadius: "8px",
                        color: "#0F172A",
                        fontSize: "13px",
                      }}
                    />
                    <Legend
                      formatter={(value: string) => {
                        const labels: Record<string, string> = { present: "ط·آ­ط·آ§ط·آ¶ط·آ±", absent: "ط·ط›ط·آ§ط·آ¦ط·آ¨", late: "ط¸â€¦ط·ع¾ط·آ£ط·آ®ط·آ±", excused: "ط¸â€¦ط·آ¹ط·آ°ط·آ±" }
                        return labels[value] || value
                      }}
                    />
                    <Bar dataKey="present" name="present" fill={CHART_COLORS.present} radius={[2, 2, 0, 0]} maxBarSize={20} />
                    <Bar dataKey="absent" name="absent" fill={CHART_COLORS.absent} radius={[2, 2, 0, 0]} maxBarSize={20} />
                    <Bar dataKey="late" name="late" fill={CHART_COLORS.late} radius={[2, 2, 0, 0]} maxBarSize={20} />
                    <Bar dataKey="excused" name="excused" fill={CHART_COLORS.excused} radius={[2, 2, 0, 0]} maxBarSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ط·ع¾ط·آµط¸ظ¾ط¸ظ¹ط·آ© ط·آ§ط¸â€‍ط·آ¨ط¸ظ¹ط·آ§ط¸â€ ط·آ§ط·ع¾</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">ط¸â€¦ط¸â€  ط·ع¾ط·آ§ط·آ±ط¸ظ¹ط·آ®</label>
              <Input type="date" value={fromDate} onChange={(e) => { setFromDate(e.target.value); setCurrentPage(1) }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">ط·آ¥ط¸â€‍ط¸â€° ط·ع¾ط·آ§ط·آ±ط¸ظ¹ط·آ®</label>
              <Input type="date" value={toDate} onChange={(e) => { setToDate(e.target.value); setCurrentPage(1) }} />
            </div>
            <Select
              label="ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³"
              value={courseFilter}
              onChange={(e) => { setCourseFilter(e.target.value); setCurrentPage(1) }}
              options={[
                { value: "all", label: "ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¹ ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³ط·آ§ط·ع¾" },
                ...mockCourses.map((c) => ({ value: c.id, label: c.title })),
              ]}
            />
            <Select
              label="ط·آ§ط¸â€‍ط·آ­ط·آ§ط¸â€‍ط·آ©"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1) }}
              options={[
                { value: "all", label: "ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¹ ط·آ§ط¸â€‍ط·آ­ط·آ§ط¸â€‍ط·آ§ط·ع¾" },
                { value: "present", label: "ط·آ­ط·آ§ط·آ¶ط·آ±" },
                { value: "absent", label: "ط·ط›ط·آ§ط·آ¦ط·آ¨" },
                { value: "late", label: "ط¸â€¦ط·ع¾ط·آ£ط·آ®ط·آ±" },
                { value: "excused", label: "ط¸â€¦ط·آ¹ط·آ°ط·آ±" },
              ]}
            />
            <SearchInput value={searchTerm} onChange={(v) => { setSearchTerm(v); setCurrentPage(1) }} placeholder="ط·آ¨ط·آ­ط·آ« ط·آ¨ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط·آ·ط·آ§ط¸â€‍ط·آ¨..." />
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <TableSkeleton rows={5} columns={6} />
      ) : paginated.length === 0 ? (
        <EmptyState
          icon={HiOutlineFilter}
          title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط¸â€ ط·ع¾ط·آ§ط·آ¦ط·آ¬"
          description="ط¸â€‍ط¸â€¦ ط¸ظ¹ط·ع¾ط¸â€¦ ط·آ§ط¸â€‍ط·آ¹ط·آ«ط¸ث†ط·آ± ط·آ¹ط¸â€‍ط¸â€° ط·آ³ط·آ¬ط¸â€‍ط·آ§ط·ع¾ ط·ع¾ط·آ·ط·آ§ط·آ¨ط¸â€ڑ ط¸â€¦ط·آ¹ط·آ§ط¸ظ¹ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط·آ¨ط·آ­ط·آ«"
          action={
            <Button variant="secondary" onClick={() => { setSearchTerm(""); setCourseFilter("all"); setStatusFilter("all"); setFromDate(""); setToDate("") }}>
              ط·آ¥ط·آ¹ط·آ§ط·آ¯ط·آ© ط·ع¾ط·آ¹ط¸ظ¹ط¸ظ¹ط¸â€  ط·آ§ط¸â€‍ط¸ظ¾ط¸â€‍ط·ع¾ط·آ±ط·آ©
            </Button>
          }
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table
              columns={[
                { key: "studentName", header: "ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط·آ·ط·آ§ط¸â€‍ط·آ¨", render: (a) => (
                  <span className="font-medium text-text">{a.studentName}</span>
                )},
                { key: "courseName", header: "ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³" },
                { key: "date", header: "ط·آ§ط¸â€‍ط·ع¾ط·آ§ط·آ±ط¸ظ¹ط·آ®", render: (a) => (
                  <span className="text-text-secondary">{formatDate(a.date)}</span>
                )},
                { key: "status", header: "ط·آ§ط¸â€‍ط·آ­ط·آ§ط¸â€‍ط·آ©", render: (a) => {
                  const colors: Record<string, string> = {
                    present: "bg-emerald-100 text-emerald-700 border-emerald-200",
                    absent: "bg-red-100 text-red-700 border-red-200",
                    late: "bg-amber-100 text-amber-700 border-amber-200",
                    excused: "bg-blue-100 text-blue-700 border-blue-200",
                  }
                  const labels: Record<string, string> = { present: "ط·آ­ط·آ§ط·آ¶ط·آ±", absent: "ط·ط›ط·آ§ط·آ¦ط·آ¨", late: "ط¸â€¦ط·ع¾ط·آ£ط·آ®ط·آ±", excused: "ط¸â€¦ط·آ¹ط·آ°ط·آ±" }
                  return (
                    <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border", colors[a.status])}>
                      {labels[a.status]}
                    </span>
                  )
                }},
                { key: "checkIn", header: "ط·آ§ط¸â€‍ط·آ­ط·آ¶ط¸ث†ط·آ±", render: (a) => (
                  <span className="text-text-secondary" dir="ltr">{a.checkIn || "أ¢â‚¬â€‌"}</span>
                )},
                { key: "checkOut", header: "ط·آ§ط¸â€‍ط·آ§ط¸â€ ط·آµط·آ±ط·آ§ط¸ظ¾", render: (a) => (
                  <span className="text-text-secondary" dir="ltr">{a.checkOut || "أ¢â‚¬â€‌"}</span>
                )},
              ]}
              data={paginated}
            />
          </CardContent>
          <div className="p-4 border-t border-border">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </Card>
      )}
    </div>
  )
}

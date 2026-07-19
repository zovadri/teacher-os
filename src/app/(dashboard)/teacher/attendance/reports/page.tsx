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
    toast.success("ط¬ط§ط±ظچ طھطµط¯ظٹط± ط§ظ„طھظ‚ط±ظٹط± ط¨طµظٹط؛ط© PDF", { position: "top-left" })
    setTimeout(() => toast.success("طھظ… طھطµط¯ظٹط± ط§ظ„طھظ‚ط±ظٹط± ط¨ظ†ط¬ط§ط­", { position: "top-left" }), 1500)
  }

  const handleExportExcel = () => {
    toast.success("ط¬ط§ط±ظچ طھطµط¯ظٹط± ط§ظ„طھظ‚ط±ظٹط± ط¨طµظٹط؛ط© Excel", { position: "top-left" })
    setTimeout(() => toast.success("طھظ… طھطµط¯ظٹط± ط§ظ„طھظ‚ط±ظٹط± ط¨ظ†ط¬ط§ط­", { position: "top-left" }), 1500)
  }

  const handlePrint = () => {
    toast.success("ط¬ط§ط±ظچ طھط­ط¶ظٹط± ط§ظ„طھظ‚ط±ظٹط± ظ„ظ„ط·ط¨ط§ط¹ط©", { position: "top-left" })
    setTimeout(() => window.print(), 500)
  }

  if (hasError) {
    return (
      <div className="p-4 md:p-6">
        <ErrorState
          title="ط­ط¯ط« ط®ط·ط£ ظپظٹ طھط­ظ…ظٹظ„ ط§ظ„طھظ‚ط§ط±ظٹط±"
          message="ظٹط±ط¬ظ‰ ط§ظ„ظ…ط­ط§ظˆظ„ط© ظ…ط±ط© ط£ط®ط±ظ‰"
          onRetry={() => setHasError(false)}
        />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Toaster />
      <Breadcrumb items={[{ label: "الحضور", href: "/teacher/attendance" }, { label: "تقارير الحضور" }]} />
      <PageHeader
        title="طھظ‚ط§ط±ظٹط± ط§ظ„ط­ط¶ظˆط±"
        description="ط¹ط±ط¶ ظˆطھط­ظ„ظٹظ„ ط¥ط­طµط§ط¦ظٹط§طھ ط­ط¶ظˆط± ط§ظ„ط·ظ„ط§ط¨"
        actions={
          <div className="flex items-center gap-2">
            <button type="button" variant="secondary" size="sm" leftIcon={<HiOutlineDocumentText className="w-4 h-4" />} onClick={handleExportPDF}>
              PDF
            </Button>
            <button type="button" variant="secondary" size="sm" leftIcon={<HiOutlineTable className="w-4 h-4" />} onClick={handleExportExcel}>
              Excel
            </Button>
            <button type="button" variant="primary" size="sm" leftIcon={<HiOutlinePrinter className="w-4 h-4" />} onClick={handlePrint}>
              ط·ط¨ط§ط¹ط©
            </Button>
          </div>
        }
      />

      {isLoading ? (
        <StatsSkeleton count={5} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <StatsCard title="ط§ظ„ط¥ط¬ظ…ط§ظ„ظٹ" value={stats.total} icon={HiOutlineChartSquareBar} color="primary" />
          <StatsCard title="ط­ط§ط¶ط±" value={stats.present} icon={HiOutlineCheckCircle} color="success" />
          <StatsCard title="ط؛ط§ط¦ط¨" value={stats.absent} icon={HiOutlineXCircle} color="error" />
          <StatsCard title="ظ…طھط£ط®ط±" value={stats.late} icon={HiOutlineClock} color="warning" />
          <StatsCard title="ظ…ط¹ط°ط±" value={stats.excused} icon={HiOutlineExclamation} color="info" />
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>ظ†ط³ط¨ط© ط§ظ„ط­ط¶ظˆط± ط­ط³ط¨ ط§ظ„طھط§ط±ظٹط®</CardTitle>
            <Badge variant="primary" size="sm">{stats.rate}%</Badge>
          </CardHeader>
          <CardContent>
            {chartData.length === 0 ? (
              <EmptyState
                icon={HiOutlineChartSquareBar}
                title="ظ„ط§ طھظˆط¬ط¯ ط¨ظٹط§ظ†ط§طھ"
                description="ظ„ظ… ظٹطھظ… ط§ظ„ط¹ط«ظˆط± ط¹ظ„ظ‰ ط³ط¬ظ„ط§طھ ط­ط¶ظˆط± ظ„ظ„ظپطھط±ط© ط§ظ„ظ…ط­ط¯ط¯ط©"
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
                        const labels: Record<string, string> = { present: "ط­ط§ط¶ط±", absent: "ط؛ط§ط¦ط¨", late: "ظ…طھط£ط®ط±", excused: "ظ…ط¹ط°ط±" }
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
            <CardTitle>طھطµظپظٹط© ط§ظ„ط¨ظٹط§ظ†ط§طھ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">ظ…ظ† طھط§ط±ظٹط®</label>
              <Input type="date" value={fromDate} onChange={(e) => { setFromDate(e.target.value); setCurrentPage(1) }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">ط¥ظ„ظ‰ طھط§ط±ظٹط®</label>
              <Input type="date" value={toDate} onChange={(e) => { setToDate(e.target.value); setCurrentPage(1) }} />
            </div>
            <Select
              label="ط§ظ„ظƒظˆط±ط³"
              value={courseFilter}
              onChange={(e) => { setCourseFilter(e.target.value); setCurrentPage(1) }}
              options={[
                { value: "all", label: "ط¬ظ…ظٹط¹ ط§ظ„ظƒظˆط±ط³ط§طھ" },
                ...mockCourses.map((c) => ({ value: c.id, label: c.title })),
              ]}
            />
            <Select
              label="ط§ظ„ط­ط§ظ„ط©"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1) }}
              options={[
                { value: "all", label: "ط¬ظ…ظٹط¹ ط§ظ„ط­ط§ظ„ط§طھ" },
                { value: "present", label: "ط­ط§ط¶ط±" },
                { value: "absent", label: "ط؛ط§ط¦ط¨" },
                { value: "late", label: "ظ…طھط£ط®ط±" },
                { value: "excused", label: "ظ…ط¹ط°ط±" },
              ]}
            />
            <SearchInput value={searchTerm} onChange={(v) => { setSearchTerm(v); setCurrentPage(1) }} placeholder="ط¨ط­ط« ط¨ط§ط³ظ… ط§ظ„ط·ط§ظ„ط¨..." />
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <TableSkeleton rows={5} columns={6} />
      ) : paginated.length === 0 ? (
        <EmptyState
          icon={HiOutlineFilter}
          title="ظ„ط§ طھظˆط¬ط¯ ظ†طھط§ط¦ط¬"
          description="ظ„ظ… ظٹطھظ… ط§ظ„ط¹ط«ظˆط± ط¹ظ„ظ‰ ط³ط¬ظ„ط§طھ طھط·ط§ط¨ظ‚ ظ…ط¹ط§ظٹظٹط± ط§ظ„ط¨ط­ط«"
          action={
            <Button variant="secondary" onClick={() => { setSearchTerm(""); setCourseFilter("all"); setStatusFilter("all"); setFromDate(""); setToDate("") }}>
              ط¥ط¹ط§ط¯ط© طھط¹ظٹظٹظ† ط§ظ„ظپظ„طھط±ط©
            </Button>
          }
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table
              columns={[
                { key: "studentName", header: "ط§ط³ظ… ط§ظ„ط·ط§ظ„ط¨", render: (a) => (
                  <span className="font-medium text-text">{a.studentName}</span>
                )},
                { key: "courseName", header: "ط§ظ„ظƒظˆط±ط³" },
                { key: "date", header: "ط§ظ„طھط§ط±ظٹط®", render: (a) => (
                  <span className="text-text-secondary">{formatDate(a.date)}</span>
                )},
                { key: "status", header: "ط§ظ„ط­ط§ظ„ط©", render: (a) => {
                  const colors: Record<string, string> = {
                    present: "bg-emerald-100 text-emerald-700 border-emerald-200",
                    absent: "bg-red-100 text-red-700 border-red-200",
                    late: "bg-amber-100 text-amber-700 border-amber-200",
                    excused: "bg-blue-100 text-blue-700 border-blue-200",
                  }
                  const labels: Record<string, string> = { present: "ط­ط§ط¶ط±", absent: "ط؛ط§ط¦ط¨", late: "ظ…طھط£ط®ط±", excused: "ظ…ط¹ط°ط±" }
                  return (
                    <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border", colors[a.status])}>
                      {labels[a.status]}
                    </span>
                  )
                }},
                { key: "checkIn", header: "ط§ظ„ط­ط¶ظˆط±", render: (a) => (
                  <span className="text-text-secondary" dir="ltr">{a.checkIn || "â€”"}</span>
                )},
                { key: "checkOut", header: "ط§ظ„ط§ظ†طµط±ط§ظپ", render: (a) => (
                  <span className="text-text-secondary" dir="ltr">{a.checkOut || "â€”"}</span>
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

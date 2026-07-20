"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  HiOutlineUsers,
  HiOutlineUserGroup,
  HiOutlineClock,
  HiOutlinePause,
  HiOutlinePlus,
  HiOutlineEye,
  HiOutlineBell,
  HiOutlineRefresh,
  HiOutlineAcademicCap,
  HiOutlineExclamation,
} from "react-icons/hi"
import toast from "react-hot-toast"
import Button from "@/components/ui/Button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Tabs, TabPanel } from "@/components/ui/Tabs"
import { Modal } from "@/components/ui/Modal"
import { StatsCard } from "@/components/ui/StatsCard"
import { Progress } from "@/components/ui/Progress"
import { PageHeader } from "@/components/ui/PageHeader"
import { SearchInput } from "@/components/ui/SearchInput"
import Select from "@/components/ui/Select"
import Input from "@/components/ui/Input"
import { Pagination } from "@/components/ui/Pagination"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { Skeleton, CardSkeleton, TableSkeleton, StatsSkeleton } from "@/components/ui/Skeleton"
import { cn } from "@/lib/utils"
import { mockClassGroups, mockWaitingStudents, mockFreezeRecords, mockMissedLessons, mockCourses } from "@/lib/mock/data"

const dayMap: Record<string, string> = {
  saturday: "ط·آ§ط¸â€‍ط·آ³ط·آ¨ط·ع¾", sunday: "ط·آ§ط¸â€‍ط·آ£ط·آ­ط·آ¯", monday: "ط·آ§ط¸â€‍ط·آ¥ط·آ«ط¸â€ ط¸ظ¹ط¸â€ ",
  tuesday: "ط·آ§ط¸â€‍ط·آ«ط¸â€‍ط·آ§ط·آ«ط·آ§ط·طŒ", wednesday: "ط·آ§ط¸â€‍ط·آ£ط·آ±ط·آ¨ط·آ¹ط·آ§ط·طŒ", thursday: "ط·آ§ط¸â€‍ط·آ®ط¸â€¦ط¸ظ¹ط·آ³", friday: "ط·آ§ط¸â€‍ط·آ¬ط¸â€¦ط·آ¹ط·آ©",
}

const statusVariant: Record<string, "success" | "warning" | "neutral"> = {
  active: "success", inactive: "warning", completed: "neutral",
}

const tabs = [
  { id: "groups", label: "ط·آ§ط¸â€‍ط¸â€¦ط·آ¬ط¸â€¦ط¸ث†ط·آ¹ط·آ§ط·ع¾", icon: <HiOutlineUserGroup className="w-4 h-4" /> },
  { id: "waiting", label: "ط¸â€ڑط·آ§ط·آ¦ط¸â€¦ط·آ© ط·آ§ط¸â€‍ط·آ§ط¸â€ ط·ع¾ط·آ¸ط·آ§ط·آ±", icon: <HiOutlineClock className="w-4 h-4" /> },
  { id: "freeze", label: "ط·آ§ط¸â€‍ط·ع¾ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¯", icon: <HiOutlinePause className="w-4 h-4" /> },
  { id: "missed", label: "ط·آ§ط¸â€‍ط·آ¯ط·آ±ط¸ث†ط·آ³ ط·آ§ط¸â€‍ط¸â€¦ط¸ظ¾ط¸â€ڑط¸ث†ط·آ¯ط·آ©", icon: <HiOutlineExclamation className="w-4 h-4" /> },
]

export default function GroupsPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [addForm, setAddForm] = useState({ name: "", courseId: "", capacity: "25", classroom: "" })
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 6

  useEffect(() => {
    const t = setTimeout(() => { setLoading(false); setError(null) }, 800)
    return () => clearTimeout(t)
  }, [])

  const groups = useMemo(() => {
    if (!search) return mockClassGroups
    return mockClassGroups.filter(g => g.name.includes(search) || g.courseName.includes(search) || g.classroom?.includes(search))
  }, [search])

  const paginatedGroups = groups.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(groups.length / PAGE_SIZE)

  const stats = useMemo(() => ({
    totalGroups: mockClassGroups.length,
    totalStudents: mockClassGroups.reduce((a, g) => a + g.enrolledCount, 0),
    waitingCount: mockWaitingStudents.filter(w => w.status === "waiting").length,
    frozenCount: mockFreezeRecords.filter(f => f.status === "active").length,
  }), [])

  const handleAddGroup = () => {
    toast.success(`ط·ع¾ط¸â€¦ ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ§ط¸â€‍ط¸â€¦ط·آ¬ط¸â€¦ط¸ث†ط·آ¹ط·آ© ${addForm.name || "ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯ط·آ©"} ط·آ¨ط¸â€ ط·آ¬ط·آ§ط·آ­`)
    setShowAddModal(false)
    setAddForm({ name: "", courseId: "", capacity: "25", classroom: "" })
  }

  const handleNotify = (id: string) => {
    toast.success("ط·ع¾ط¸â€¦ ط·آ¥ط·آ±ط·آ³ط·آ§ط¸â€‍ ط·آ§ط¸â€‍ط·آ¥ط·آ´ط·آ¹ط·آ§ط·آ± ط¸â€‍ط¸â€‍ط·آ·ط·آ§ط¸â€‍ط·آ¨")
  }

  const handleRecover = (id: string) => {
    toast.success("ط·ع¾ط¸â€¦ ط·ع¾ط·آ¹ط¸ث†ط¸ظ¹ط·آ¶ ط·آ§ط¸â€‍ط·آ¯ط·آ±ط·آ³ ط·آ¨ط¸â€ ط·آ¬ط·آ§ط·آ­")
  }

  const handleRetry = () => {
    setLoading(true)
    setError(null)
    setTimeout(() => setLoading(false), 800)
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <PageHeader title="ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط·آ§ط¸â€‍ط¸â€¦ط·آ¬ط¸â€¦ط¸ث†ط·آ¹ط·آ§ط·ع¾ ط¸ث†ط·آ§ط¸â€‍ط¸ظ¾ط·آµط¸ث†ط¸â€‍" description="ط·آ¹ط·آ±ط·آ¶ ط¸ث†ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط·آ§ط¸â€‍ط¸â€¦ط·آ¬ط¸â€¦ط¸ث†ط·آ¹ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·آ¯ط·آ±ط·آ§ط·آ³ط¸ظ¹ط·آ©" />
        <ErrorState message={error} onRetry={handleRetry} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط·آ§ط¸â€‍ط¸â€¦ط·آ¬ط¸â€¦ط¸ث†ط·آ¹ط·آ§ط·ع¾ ط¸ث†ط·آ§ط¸â€‍ط¸ظ¾ط·آµط¸ث†ط¸â€‍"
        description="ط·آ¹ط·آ±ط·آ¶ ط¸ث†ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط·آ§ط¸â€‍ط¸â€¦ط·آ¬ط¸â€¦ط¸ث†ط·آ¹ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·آ¯ط·آ±ط·آ§ط·آ³ط¸ظ¹ط·آ©"
        actions={
          <Button onClick={() => setShowAddModal(true)} rightIcon={<HiOutlinePlus className="w-4 h-4" />}>
            ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط¸â€¦ط·آ¬ط¸â€¦ط¸ث†ط·آ¹ط·آ©
          </Button>
        }
      />

      {loading ? (
        <StatsSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ ط·آ§ط¸â€‍ط¸â€¦ط·آ¬ط¸â€¦ط¸ث†ط·آ¹ط·آ§ط·ع¾" value={stats.totalGroups} icon={HiOutlineUserGroup} color="primary" />
          <StatsCard title="ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ ط·آ§ط¸â€‍ط·آ·ط¸â€‍ط·آ§ط·آ¨" value={stats.totalStudents} icon={HiOutlineUsers} color="success" />
          <StatsCard title="ط¸â€ڑط·آ§ط·آ¦ط¸â€¦ط·آ© ط·آ§ط¸â€‍ط·آ§ط¸â€ ط·ع¾ط·آ¸ط·آ§ط·آ±" value={stats.waitingCount} icon={HiOutlineClock} color="warning" />
          <StatsCard title="ط·آ§ط¸â€‍ط¸â€¦ط·آ¬ط¸â€¦ط·آ¯ط¸ث†ط¸â€ " value={stats.frozenCount} icon={HiOutlinePause} color="error" />
        </div>
      )}

      <Tabs tabs={tabs}>
        {(activeTab) => (
          <>
            <TabPanel id="groups" activeTab={activeTab}>
              <div className="space-y-4">
                <SearchInput value={search} onChange={setSearch} placeholder="ط·آ¨ط·آ­ط·آ« ط·آ¹ط¸â€  ط¸â€¦ط·آ¬ط¸â€¦ط¸ث†ط·آ¹ط·آ©..." />
                {loading ? (
                  <CardSkeleton count={3} />
                ) : paginatedGroups.length === 0 ? (
                  <EmptyState
                    icon={HiOutlineUserGroup}
                    title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط¸â€¦ط·آ¬ط¸â€¦ط¸ث†ط·آ¹ط·آ§ط·ع¾"
                    description={search ? "ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط¸â€ ط·ع¾ط·آ§ط·آ¦ط·آ¬ ط¸â€‍ط¸â€‍ط·آ¨ط·آ­ط·آ«" : "ط¸â€‍ط¸â€¦ ط¸ظ¹ط·ع¾ط¸â€¦ ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ£ط¸ظ¹ ط¸â€¦ط·آ¬ط¸â€¦ط¸ث†ط·آ¹ط·آ§ط·ع¾ ط·آ¨ط·آ¹ط·آ¯"}
                    action={<Button onClick={() => { setAddForm({ name: "", courseId: "", capacity: "25", classroom: "" }); setShowAddModal(true) }}>ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط¸â€¦ط·آ¬ط¸â€¦ط¸ث†ط·آ¹ط·آ©</Button>}
                  />
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {paginatedGroups.map((group) => (
                        <motion.div key={group.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                          <Card hover className="h-full">
                            <CardHeader>
                              <div>
                                <CardTitle>{group.name}</CardTitle>
                                <p className="text-sm text-text-secondary mt-0.5">{group.courseName}</p>
                              </div>
                              <Badge variant={statusVariant[group.status]}>{group.status === "active" ? "ط¸â€ ط·آ´ط·آ·" : group.status === "completed" ? "ط¸â€¦ط¸ئ’ط·ع¾ط¸â€¦ط¸â€‍" : "ط·ط›ط¸ظ¹ط·آ± ط¸â€ ط·آ´ط·آ·"}</Badge>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-text-secondary">ط·آ§ط¸â€‍ط·آ³ط·آ¹ط·آ©</span>
                                  <span className="text-text font-medium">{group.enrolledCount}/{group.capacity}</span>
                                </div>
                                <Progress value={group.enrolledCount} max={group.capacity} variant={group.enrolledCount >= group.capacity ? "warning" : "primary"} size="sm" />
                              </div>
                              <div className="flex items-center gap-2 text-sm text-text-secondary">
                                <HiOutlineClock className="w-4 h-4" />
                                {group.schedule.map((s, i) => (
                                  <span key={s.id}>
                                    {dayMap[s.day]} {s.startTime}-{s.endTime}{i < group.schedule.length - 1 ? " - " : ""}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-text-secondary">
                                <HiOutlineAcademicCap className="w-4 h-4" />
                                <span>{group.classroom}</span>
                              </div>
                              {group.waitingCount > 0 && (
                                <div className="flex items-center gap-1.5 text-sm text-warning">
                                  <HiOutlineClock className="w-4 h-4" />
                                  <span>{group.waitingCount} ط·آ·ط·آ§ط¸â€‍ط·آ¨ ط¸ظ¾ط¸ظ¹ ط·آ§ط¸â€‍ط·آ§ط¸â€ ط·ع¾ط·آ¸ط·آ§ط·آ±</span>
                                </div>
                              )}
                            </CardContent>
                            <div className="flex items-center gap-2 px-6 pb-4 pt-0">
                              <Link href={`/teacher/groups/${group.id}`}>
                                <Button variant="primary" size="sm" leftIcon={<HiOutlineEye className="w-4 h-4" />}>
                                  ط·آ¹ط·آ±ط·آ¶ ط·آ§ط¸â€‍ط¸â€¦ط·آ¬ط¸â€¦ط¸ث†ط·آ¹ط·آ©
                                </Button>
                              </Link>
                              {group.waitingCount > 0 && (
                                <Button variant="outline" size="sm" leftIcon={<HiOutlineClock className="w-4 h-4" />}>
                                  ط·آ¹ط·آ±ط·آ¶ ط¸â€ڑط·آ§ط·آ¦ط¸â€¦ط·آ© ط·آ§ط¸â€‍ط·آ§ط¸â€ ط·ع¾ط·آ¸ط·آ§ط·آ±
                                </Button>
                              )}
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                    {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}
                  </>
                )}
              </div>
            </TabPanel>

            <TabPanel id="waiting" activeTab={activeTab}>
              {loading ? (
                <TableSkeleton rows={5} columns={5} />
              ) : mockWaitingStudents.length === 0 ? (
                <EmptyState icon={HiOutlineClock} title="ط¸â€‍ط·آ§ ط¸ظ¹ط¸ث†ط·آ¬ط·آ¯ ط·آ·ط¸â€‍ط·آ§ط·آ¨ ط¸ظ¾ط¸ظ¹ ط·آ§ط¸â€‍ط·آ§ط¸â€ ط·ع¾ط·آ¸ط·آ§ط·آ±" description="ط¸â€ڑط·آ§ط·آ¦ط¸â€¦ط·آ© ط·آ§ط¸â€‍ط·آ§ط¸â€ ط·ع¾ط·آ¸ط·آ§ط·آ± ط¸ظ¾ط·آ§ط·آ±ط·ط›ط·آ© ط·آ­ط·آ§ط¸â€‍ط¸ظ¹ط·آ§ط¸â€¹" />
              ) : (
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-surface-secondary border-b border-border">
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط·آ§ط¸â€‍ط·آ·ط·آ§ط¸â€‍ط·آ¨</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط·آ§ط¸â€‍ط¸â€¦ط·آ¬ط¸â€¦ط¸ث†ط·آ¹ط·آ©</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط·ع¾ط·آ§ط·آ±ط¸ظ¹ط·آ® ط·آ§ط¸â€‍ط·آ§ط¸â€ ط·آ¶ط¸â€¦ط·آ§ط¸â€¦</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط·آ§ط¸â€‍ط·آ£ط¸ث†ط¸â€‍ط¸ث†ط¸ظ¹ط·آ©</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط·آ§ط¸â€‍ط·آ­ط·آ§ط¸â€‍ط·آ©</th>
                        <th className="text-center px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط·آ§ط¸â€‍ط·آ¥ط·آ¬ط·آ±ط·آ§ط·طŒط·آ§ط·ع¾</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockWaitingStudents.map((w) => (
                        <tr key={w.id} className="border-b border-border last:border-0 hover:bg-surface-secondary/50 transition-colors">
                          <td className="px-4 py-3">
                            <span className="text-text font-medium">{w.studentName}</span>
                          </td>
                          <td className="px-4 py-3 text-text-secondary">{w.groupName}</td>
                          <td className="px-4 py-3 text-text-secondary">{w.joinedAt.toLocaleDateString("ar-EG")}</td>
                          <td className="px-4 py-3">
                            <Badge variant={w.priority === 1 ? "error" : w.priority === 2 ? "warning" : "info"}>
                              {w.priority === 1 ? "ط·آ¹ط·آ§ط¸â€‍ط¸ظ¹ط·آ©" : w.priority === 2 ? "ط¸â€¦ط·ع¾ط¸ث†ط·آ³ط·آ·ط·آ©" : "ط¸â€¦ط¸â€ ط·آ®ط¸ظ¾ط·آ¶ط·آ©"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={w.status === "waiting" ? "warning" : w.status === "enrolled" ? "success" : w.status === "cancelled" ? "error" : "info"}>
                              {w.status === "waiting" ? "ط·آ¨ط·آ§ط¸â€ ط·ع¾ط·آ¸ط·آ§ط·آ±" : w.status === "offered" ? "ط·ع¾ط¸â€¦ ط·آ§ط¸â€‍ط·آ¹ط·آ±ط·آ¶" : w.status === "enrolled" ? "ط¸â€¦ط·آ³ط·آ¬ط¸â€‍" : "ط¸â€¦ط¸â€‍ط·ط›ط¸ظ¹"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-2">
                              <Button variant="outline" size="xs" leftIcon={<HiOutlineBell className="w-3.5 h-3.5" />} onClick={() => handleNotify(w.id)}>
                                ط·آ¥ط·آ®ط·آ·ط·آ§ط·آ±
                              </Button>
                              <Button variant="success" size="xs" leftIcon={<HiOutlinePlus className="w-3.5 h-3.5" />}>
                                ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabPanel>

            <TabPanel id="freeze" activeTab={activeTab}>
              {loading ? (
                <TableSkeleton rows={4} columns={5} />
              ) : mockFreezeRecords.length === 0 ? (
                <EmptyState icon={HiOutlinePause} title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·آ³ط·آ¬ط¸â€‍ط·آ§ط·ع¾ ط·ع¾ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¯" description="ط¸â€‍ط·آ§ ط¸ظ¹ط¸ث†ط·آ¬ط·آ¯ ط·آ§ط·آ´ط·ع¾ط·آ±ط·آ§ط¸ئ’ط·آ§ط·ع¾ ط¸â€¦ط·آ¬ط¸â€¦ط·آ¯ط·آ© ط·آ­ط·آ§ط¸â€‍ط¸ظ¹ط·آ§ط¸â€¹" />
              ) : (
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-surface-secondary border-b border-border">
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط·آ§ط¸â€‍ط·آ·ط·آ§ط¸â€‍ط·آ¨</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط·آ§ط¸â€‍ط¸â€¦ط·آ¬ط¸â€¦ط¸ث†ط·آ¹ط·آ©</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط·ع¾ط·آ§ط·آ±ط¸ظ¹ط·آ® ط·آ§ط¸â€‍ط·آ¨ط·آ¯ط·آ§ط¸ظ¹ط·آ©</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط·ع¾ط·آ§ط·آ±ط¸ظ¹ط·آ® ط·آ§ط¸â€‍ط¸â€ ط¸â€،ط·آ§ط¸ظ¹ط·آ©</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط·آ§ط¸â€‍ط·آ³ط·آ¨ط·آ¨</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط·آ§ط¸â€‍ط·آ­ط·آ§ط¸â€‍ط·آ©</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockFreezeRecords.map((f) => (
                        <tr key={f.id} className="border-b border-border last:border-0 hover:bg-surface-secondary/50 transition-colors">
                          <td className="px-4 py-3 font-medium text-text">{f.studentName}</td>
                          <td className="px-4 py-3 text-text-secondary">{f.groupId}</td>
                          <td className="px-4 py-3 text-text-secondary">{f.startDate.toLocaleDateString("ar-EG")}</td>
                          <td className="px-4 py-3 text-text-secondary">{f.endDate.toLocaleDateString("ar-EG")}</td>
                          <td className="px-4 py-3 text-text-secondary">{f.reason}</td>
                          <td className="px-4 py-3">
                            <Badge variant={f.status === "active" ? "warning" : f.status === "expired" ? "neutral" : "info"}>
                              {f.status === "active" ? "ط¸â€ ط·آ´ط·آ·" : f.status === "expired" ? "ط¸â€¦ط¸â€ ط·ع¾ط¸â€،ط¸ظ¹" : "ط¸â€¦ط¸â€‍ط·ط›ط¸ظ¹"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabPanel>

            <TabPanel id="missed" activeTab={activeTab}>
              {loading ? (
                <TableSkeleton rows={4} columns={5} />
              ) : mockMissedLessons.length === 0 ? (
                <EmptyState icon={HiOutlineExclamation} title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·آ¯ط·آ±ط¸ث†ط·آ³ ط¸â€¦ط¸ظ¾ط¸â€ڑط¸ث†ط·آ¯ط·آ©" description="ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¹ ط·آ§ط¸â€‍ط·آ¯ط·آ±ط¸ث†ط·آ³ ط·ع¾ط¸â€¦ ط·ع¾ط·آ¹ط¸ث†ط¸ظ¹ط·آ¶ط¸â€،ط·آ§" />
              ) : (
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-surface-secondary border-b border-border">
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط·آ§ط¸â€‍ط·آ·ط·آ§ط¸â€‍ط·آ¨</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط·آ§ط¸â€‍ط·آ¯ط·آ±ط·آ³</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط·آ§ط¸â€‍ط·ع¾ط·آ§ط·آ±ط¸ظ¹ط·آ®</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط·آ§ط¸â€‍ط·آ­ط·آ§ط¸â€‍ط·آ©</th>
                        <th className="text-center px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط·آ§ط¸â€‍ط·آ¥ط·آ¬ط·آ±ط·آ§ط·طŒط·آ§ط·ع¾</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockMissedLessons.filter(m => !m.recovered).map((m) => (
                        <tr key={m.id} className="border-b border-border last:border-0 hover:bg-surface-secondary/50 transition-colors">
                          <td className="px-4 py-3 font-medium text-text">{m.studentName}</td>
                          <td className="px-4 py-3 text-text-secondary">{m.lessonTitle}</td>
                          <td className="px-4 py-3 text-text-secondary">{m.date.toLocaleDateString("ar-EG")}</td>
                          <td className="px-4 py-3">
                            <Badge variant={m.recovered ? "success" : "error"}>
                              {m.recovered ? "ط·ع¾ط¸â€¦ ط·آ§ط¸â€‍ط·ع¾ط·آ¹ط¸ث†ط¸ظ¹ط·آ¶" : "ط¸â€¦ط¸ظ¾ط¸â€ڑط¸ث†ط·آ¯"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex justify-center">
                              <Button variant="primary" size="xs" leftIcon={<HiOutlineRefresh className="w-3.5 h-3.5" />} onClick={() => handleRecover(m.id)}>
                                ط·ع¾ط·آ¹ط¸ث†ط¸ظ¹ط·آ¶
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabPanel>
          </>
        )}
      </Tabs>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط¸â€¦ط·آ¬ط¸â€¦ط¸ث†ط·آ¹ط·آ© ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯ط·آ©" size="md">
        <div className="space-y-4">
          <Input label="ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط¸â€¦ط·آ¬ط¸â€¦ط¸ث†ط·آ¹ط·آ©" value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} placeholder="ط¸â€¦ط·آ«ط·آ§ط¸â€‍: ط¸â€¦ط·آ¬ط¸â€¦ط¸ث†ط·آ¹ط·آ© A" />
          <Select label="ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³" options={mockCourses.map(c => ({ value: c.id, label: c.title }))} value={addForm.courseId} onChange={(e) => setAddForm({ ...addForm, courseId: e.target.value })} placeholder="ط·آ§ط·آ®ط·ع¾ط·آ± ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³" />
          <Input label="ط·آ§ط¸â€‍ط·آ³ط·آ¹ط·آ©" type="number" value={addForm.capacity} onChange={(e) => setAddForm({ ...addForm, capacity: e.target.value })} placeholder="25" />
          <Input label="ط·آ§ط¸â€‍ط¸â€ڑط·آ§ط·آ¹ط·آ©" value={addForm.classroom} onChange={(e) => setAddForm({ ...addForm, classroom: e.target.value })} placeholder="ط¸â€¦ط·آ«ط·آ§ط¸â€‍: ط¸â€ڑط·آ§ط·آ¹ط·آ© ط·آ§ط¸â€‍ط·آ£ط¸â€ ط·آ¯ط¸â€‍ط·آ³" />
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowAddModal(false)} className="flex-1">ط·آ¥ط¸â€‍ط·ط›ط·آ§ط·طŒ</Button>
            <button type="button" onClick={handleAddGroup} className="flex-1">ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ©</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

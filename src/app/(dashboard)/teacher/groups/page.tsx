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
  saturday: "ط§ظ„ط³ط¨طھ", sunday: "ط§ظ„ط£ط­ط¯", monday: "ط§ظ„ط¥ط«ظ†ظٹظ†",
  tuesday: "ط§ظ„ط«ظ„ط§ط«ط§ط،", wednesday: "ط§ظ„ط£ط±ط¨ط¹ط§ط،", thursday: "ط§ظ„ط®ظ…ظٹط³", friday: "ط§ظ„ط¬ظ…ط¹ط©",
}

const statusVariant: Record<string, "success" | "warning" | "neutral"> = {
  active: "success", inactive: "warning", completed: "neutral",
}

const tabs = [
  { id: "groups", label: "ط§ظ„ظ…ط¬ظ…ظˆط¹ط§طھ", icon: <HiOutlineUserGroup className="w-4 h-4" /> },
  { id: "waiting", label: "ظ‚ط§ط¦ظ…ط© ط§ظ„ط§ظ†طھط¸ط§ط±", icon: <HiOutlineClock className="w-4 h-4" /> },
  { id: "freeze", label: "ط§ظ„طھط¬ظ…ظٹط¯", icon: <HiOutlinePause className="w-4 h-4" /> },
  { id: "missed", label: "ط§ظ„ط¯ط±ظˆط³ ط§ظ„ظ…ظپظ‚ظˆط¯ط©", icon: <HiOutlineExclamation className="w-4 h-4" /> },
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
    toast.success(`طھظ… ط¥ط¶ط§ظپط© ط§ظ„ظ…ط¬ظ…ظˆط¹ط© ${addForm.name || "ط¬ط¯ظٹط¯ط©"} ط¨ظ†ط¬ط§ط­`)
    setShowAddModal(false)
    setAddForm({ name: "", courseId: "", capacity: "25", classroom: "" })
  }

  const handleNotify = (id: string) => {
    toast.success("طھظ… ط¥ط±ط³ط§ظ„ ط§ظ„ط¥ط´ط¹ط§ط± ظ„ظ„ط·ط§ظ„ط¨")
  }

  const handleRecover = (id: string) => {
    toast.success("طھظ… طھط¹ظˆظٹط¶ ط§ظ„ط¯ط±ط³ ط¨ظ†ط¬ط§ط­")
  }

  const handleRetry = () => {
    setLoading(true)
    setError(null)
    setTimeout(() => setLoading(false), 800)
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <PageHeader title="ط¥ط¯ط§ط±ط© ط§ظ„ظ…ط¬ظ…ظˆط¹ط§طھ ظˆط§ظ„ظپطµظˆظ„" description="ط¹ط±ط¶ ظˆط¥ط¯ط§ط±ط© ط§ظ„ظ…ط¬ظ…ظˆط¹ط§طھ ط§ظ„ط¯ط±ط§ط³ظٹط©" />
        <ErrorState message={error} onRetry={handleRetry} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="ط¥ط¯ط§ط±ط© ط§ظ„ظ…ط¬ظ…ظˆط¹ط§طھ ظˆط§ظ„ظپطµظˆظ„"
        description="ط¹ط±ط¶ ظˆط¥ط¯ط§ط±ط© ط§ظ„ظ…ط¬ظ…ظˆط¹ط§طھ ط§ظ„ط¯ط±ط§ط³ظٹط©"
        actions={
          <Button onClick={() => setShowAddModal(true)} rightIcon={<HiOutlinePlus className="w-4 h-4" />}>
            ط¥ط¶ط§ظپط© ظ…ط¬ظ…ظˆط¹ط©
          </Button>
        }
      />

      {loading ? (
        <StatsSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظ…ط¬ظ…ظˆط¹ط§طھ" value={stats.totalGroups} icon={HiOutlineUserGroup} color="primary" />
          <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط·ظ„ط§ط¨" value={stats.totalStudents} icon={HiOutlineUsers} color="success" />
          <StatsCard title="ظ‚ط§ط¦ظ…ط© ط§ظ„ط§ظ†طھط¸ط§ط±" value={stats.waitingCount} icon={HiOutlineClock} color="warning" />
          <StatsCard title="ط§ظ„ظ…ط¬ظ…ط¯ظˆظ†" value={stats.frozenCount} icon={HiOutlinePause} color="error" />
        </div>
      )}

      <Tabs tabs={tabs}>
        {(activeTab) => (
          <>
            <TabPanel id="groups" activeTab={activeTab}>
              <div className="space-y-4">
                <SearchInput value={search} onChange={setSearch} placeholder="ط¨ط­ط« ط¹ظ† ظ…ط¬ظ…ظˆط¹ط©..." />
                {loading ? (
                  <CardSkeleton count={3} />
                ) : paginatedGroups.length === 0 ? (
                  <EmptyState
                    icon={HiOutlineUserGroup}
                    title="ظ„ط§ طھظˆط¬ط¯ ظ…ط¬ظ…ظˆط¹ط§طھ"
                    description={search ? "ظ„ط§ طھظˆط¬ط¯ ظ†طھط§ط¦ط¬ ظ„ظ„ط¨ط­ط«" : "ظ„ظ… ظٹطھظ… ط¥ط¶ط§ظپط© ط£ظٹ ظ…ط¬ظ…ظˆط¹ط§طھ ط¨ط¹ط¯"}
                    action={<Button onClick={() => { setAddForm({ name: "", courseId: "", capacity: "25", classroom: "" }); setShowAddModal(true) }}>ط¥ط¶ط§ظپط© ظ…ط¬ظ…ظˆط¹ط©</Button>}
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
                              <Badge variant={statusVariant[group.status]}>{group.status === "active" ? "ظ†ط´ط·" : group.status === "completed" ? "ظ…ظƒطھظ…ظ„" : "ط؛ظٹط± ظ†ط´ط·"}</Badge>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-text-secondary">ط§ظ„ط³ط¹ط©</span>
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
                                  <span>{group.waitingCount} ط·ط§ظ„ط¨ ظپظٹ ط§ظ„ط§ظ†طھط¸ط§ط±</span>
                                </div>
                              )}
                            </CardContent>
                            <div className="flex items-center gap-2 px-6 pb-4 pt-0">
                              <Link href={`/teacher/groups/${group.id}`}>
                                <button type="button" variant="primary" size="sm" leftIcon={<HiOutlineEye className="w-4 h-4" />}>
                                  ط¹ط±ط¶ ط§ظ„ظ…ط¬ظ…ظˆط¹ط©
                                </Button>
                              </Link>
                              {group.waitingCount > 0 && (
                                <button type="button" variant="outline" size="sm" leftIcon={<HiOutlineClock className="w-4 h-4" />}>
                                  ط¹ط±ط¶ ظ‚ط§ط¦ظ…ط© ط§ظ„ط§ظ†طھط¸ط§ط±
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
                <EmptyState icon={HiOutlineClock} title="ظ„ط§ ظٹظˆط¬ط¯ ط·ظ„ط§ط¨ ظپظٹ ط§ظ„ط§ظ†طھط¸ط§ط±" description="ظ‚ط§ط¦ظ…ط© ط§ظ„ط§ظ†طھط¸ط§ط± ظپط§ط±ط؛ط© ط­ط§ظ„ظٹط§ظ‹" />
              ) : (
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-surface-secondary border-b border-border">
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط§ظ„ط·ط§ظ„ط¨</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط§ظ„ظ…ط¬ظ…ظˆط¹ط©</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">طھط§ط±ظٹط® ط§ظ„ط§ظ†ط¶ظ…ط§ظ…</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط§ظ„ط£ظˆظ„ظˆظٹط©</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط§ظ„ط­ط§ظ„ط©</th>
                        <th className="text-center px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط§ظ„ط¥ط¬ط±ط§ط،ط§طھ</th>
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
                              {w.priority === 1 ? "ط¹ط§ظ„ظٹط©" : w.priority === 2 ? "ظ…طھظˆط³ط·ط©" : "ظ…ظ†ط®ظپط¶ط©"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={w.status === "waiting" ? "warning" : w.status === "enrolled" ? "success" : w.status === "cancelled" ? "error" : "info"}>
                              {w.status === "waiting" ? "ط¨ط§ظ†طھط¸ط§ط±" : w.status === "offered" ? "طھظ… ط§ظ„ط¹ط±ط¶" : w.status === "enrolled" ? "ظ…ط³ط¬ظ„" : "ظ…ظ„ط؛ظٹ"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-2">
                              <button type="button" variant="outline" size="xs" leftIcon={<HiOutlineBell className="w-3.5 h-3.5" />} onClick={() => handleNotify(w.id)}>
                                ط¥ط®ط·ط§ط±
                              </Button>
                              <button type="button" variant="success" size="xs" leftIcon={<HiOutlinePlus className="w-3.5 h-3.5" />}>
                                طھط³ط¬ظٹظ„
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
                <EmptyState icon={HiOutlinePause} title="ظ„ط§ طھظˆط¬ط¯ ط³ط¬ظ„ط§طھ طھط¬ظ…ظٹط¯" description="ظ„ط§ ظٹظˆط¬ط¯ ط§ط´طھط±ط§ظƒط§طھ ظ…ط¬ظ…ط¯ط© ط­ط§ظ„ظٹط§ظ‹" />
              ) : (
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-surface-secondary border-b border-border">
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط§ظ„ط·ط§ظ„ط¨</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط§ظ„ظ…ط¬ظ…ظˆط¹ط©</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">طھط§ط±ظٹط® ط§ظ„ط¨ط¯ط§ظٹط©</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">طھط§ط±ظٹط® ط§ظ„ظ†ظ‡ط§ظٹط©</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط§ظ„ط³ط¨ط¨</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط§ظ„ط­ط§ظ„ط©</th>
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
                              {f.status === "active" ? "ظ†ط´ط·" : f.status === "expired" ? "ظ…ظ†طھظ‡ظٹ" : "ظ…ظ„ط؛ظٹ"}
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
                <EmptyState icon={HiOutlineExclamation} title="ظ„ط§ طھظˆط¬ط¯ ط¯ط±ظˆط³ ظ…ظپظ‚ظˆط¯ط©" description="ط¬ظ…ظٹط¹ ط§ظ„ط¯ط±ظˆط³ طھظ… طھط¹ظˆظٹط¶ظ‡ط§" />
              ) : (
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-surface-secondary border-b border-border">
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط§ظ„ط·ط§ظ„ط¨</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط§ظ„ط¯ط±ط³</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط§ظ„طھط§ط±ظٹط®</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط§ظ„ط­ط§ظ„ط©</th>
                        <th className="text-center px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط§ظ„ط¥ط¬ط±ط§ط،ط§طھ</th>
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
                              {m.recovered ? "طھظ… ط§ظ„طھط¹ظˆظٹط¶" : "ظ…ظپظ‚ظˆط¯"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex justify-center">
                              <button type="button" variant="primary" size="xs" leftIcon={<HiOutlineRefresh className="w-3.5 h-3.5" />} onClick={() => handleRecover(m.id)}>
                                طھط¹ظˆظٹط¶
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

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="ط¥ط¶ط§ظپط© ظ…ط¬ظ…ظˆط¹ط© ط¬ط¯ظٹط¯ط©" size="md">
        <div className="space-y-4">
          <Input label="ط§ط³ظ… ط§ظ„ظ…ط¬ظ…ظˆط¹ط©" value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} placeholder="ظ…ط«ط§ظ„: ظ…ط¬ظ…ظˆط¹ط© A" />
          <Select label="ط§ظ„ظƒظˆط±ط³" options={mockCourses.map(c => ({ value: c.id, label: c.title }))} value={addForm.courseId} onChange={(e) => setAddForm({ ...addForm, courseId: e.target.value })} placeholder="ط§ط®طھط± ط§ظ„ظƒظˆط±ط³" />
          <Input label="ط§ظ„ط³ط¹ط©" type="number" value={addForm.capacity} onChange={(e) => setAddForm({ ...addForm, capacity: e.target.value })} placeholder="25" />
          <Input label="ط§ظ„ظ‚ط§ط¹ط©" value={addForm.classroom} onChange={(e) => setAddForm({ ...addForm, classroom: e.target.value })} placeholder="ظ…ط«ط§ظ„: ظ‚ط§ط¹ط© ط§ظ„ط£ظ†ط¯ظ„ط³" />
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowAddModal(false)} className="flex-1">ط¥ظ„ط؛ط§ط،</Button>
            <button type="button" onClick={handleAddGroup} className="flex-1">ط¥ط¶ط§ظپط©</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

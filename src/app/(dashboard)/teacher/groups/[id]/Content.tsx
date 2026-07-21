"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  HiOutlineUsers,
  HiOutlineClock,
  HiOutlinePause,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineSwitchHorizontal,
  HiOutlineRefresh,
  HiOutlineAcademicCap,
  HiOutlineChevronRight,
} from "react-icons/hi"
import toast from "react-hot-toast"
import Button from "@/components/ui/Button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Modal } from "@/components/ui/Modal"
import { StatsCard } from "@/components/ui/StatsCard"
import { Progress } from "@/components/ui/Progress"
import { PageHeader } from "@/components/ui/PageHeader"
import { SearchInput } from "@/components/ui/SearchInput"
import Select from "@/components/ui/Select"
import Input from "@/components/ui/Input"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { Skeleton, TableSkeleton, CardSkeleton } from "@/components/ui/Skeleton"
import { cn } from "@/lib/utils"
import {
  mockClassGroups,
  mockStudents,
  mockWaitingStudents,
  mockFreezeRecords,
  mockMissedLessons,
  mockCourses,
} from "@/lib/mock/data"

const dayMap: Record<string, string> = {
  saturday: "ط§ظ„ط³ط¨طھ", sunday: "ط§ظ„ط£ط­ط¯", monday: "ط§ظ„ط¥ط«ظ†ظٹظ†",
  tuesday: "ط§ظ„ط«ظ„ط§ط«ط§ط،", wednesday: "ط§ظ„ط£ط±ط¨ط¹ط§ط،", thursday: "ط§ظ„ط®ظ…ظٹط³", friday: "ط§ظ„ط¬ظ…ط¹ط©",
}

export default function GroupDetailPage() {
  const params = useParams()
  const router = useRouter()
  const group = useMemo(() => mockClassGroups.find(g => g.id === params.id), [params.id])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [studentSearch, setStudentSearch] = useState("")

  const [showAddModal, setShowAddModal] = useState(false)
  const [addStudentSearch, setAddStudentSearch] = useState("")
  const [selectedStudentId, setSelectedStudentId] = useState("")

  const [showMoveModal, setShowMoveModal] = useState(false)
  const [moveStudentId, setMoveStudentId] = useState("")
  const [targetGroupId, setTargetGroupId] = useState("")

  const [showFreezeModal, setShowFreezeModal] = useState(false)
  const [freezeStudentId, setFreezeStudentId] = useState("")
  const [freezeStart, setFreezeStart] = useState("")
  const [freezeEnd, setFreezeEnd] = useState("")
  const [freezeReason, setFreezeReason] = useState("")

  const [showRecoverModal, setShowRecoverModal] = useState(false)
  const [recoverStudentId, setRecoverStudentId] = useState("")

  useEffect(() => {
    const t = setTimeout(() => { setLoading(false) }, 600)
    return () => clearTimeout(t)
  }, [])

  if (!group) {
    return (
      <div className="p-4 md:p-6">
        <PageHeader title="ط§ظ„ظ…ط¬ظ…ظˆط¹ط© ط؛ظٹط± ظ…ظˆط¬ظˆط¯ط©" />
        <EmptyState icon={HiOutlineUsers} title="ط§ظ„ظ…ط¬ظ…ظˆط¹ط© ط؛ظٹط± ظ…ظˆط¬ظˆط¯ط©" description="ظ„ظ… ظٹطھظ… ط§ظ„ط¹ط«ظˆط± ط¹ظ„ظ‰ ط§ظ„ظ…ط¬ظ…ظˆط¹ط© ط§ظ„ظ…ط·ظ„ظˆط¨ط©" action={<Button onClick={() => router.push("/teacher/groups")}>ط§ظ„ط¹ظˆط¯ط© ظ„ظ„ظ…ط¬ظ…ظˆط¹ط§طھ</Button>} />
      </div>
    )
  }

  const groupStudents = useMemo(() => {
    return mockStudents.filter(s => s.group === group.name)
  }, [group])

  const filteredStudents = useMemo(() => {
    if (!studentSearch) return groupStudents
    return groupStudents.filter(s => s.name.includes(studentSearch) || s.phone.includes(studentSearch))
  }, [groupStudents, studentSearch])

  const groupWaiting = useMemo(() => mockWaitingStudents.filter(w => w.groupId === group.id), [group.id])

  const missedForGroup = useMemo(() => mockMissedLessons.filter(m => !m.recovered), [])

  const capacityPct = Math.round((group.enrolledCount / group.capacity) * 100)

  const handleAddStudent = () => {
    if (!selectedStudentId) return
    toast.success("طھظ… ط¥ط¶ط§ظپط© ط§ظ„ط·ط§ظ„ط¨ ط¥ظ„ظ‰ ط§ظ„ظ…ط¬ظ…ظˆط¹ط©")
    setShowAddModal(false)
    setSelectedStudentId("")
    setAddStudentSearch("")
  }

  const handleMoveStudent = () => {
    if (!targetGroupId) return
    toast.success("طھظ… ظ†ظ‚ظ„ ط§ظ„ط·ط§ظ„ط¨ ط¥ظ„ظ‰ ط§ظ„ظ…ط¬ظ…ظˆط¹ط© ط¨ظ†ط¬ط§ط­")
    setShowMoveModal(false)
    setMoveStudentId("")
    setTargetGroupId("")
  }

  const handleFreeze = () => {
    toast.success("طھظ… طھط¬ظ…ظٹط¯ ط§ط´طھط±ط§ظƒ ط§ظ„ط·ط§ظ„ط¨")
    setShowFreezeModal(false)
    setFreezeStudentId("")
    setFreezeStart("")
    setFreezeEnd("")
    setFreezeReason("")
  }

  const handleRecover = () => {
    toast.success("طھظ… طھط¹ظˆظٹط¶ ط§ظ„ط¯ط±ط³ ظ„ظ„ط·ط§ظ„ط¨")
    setShowRecoverModal(false)
    setRecoverStudentId("")
  }

  const handleRemoveStudent = (name: string) => {
    toast.success(`طھظ… ط­ط°ظپ ${name} ظ…ظ† ط§ظ„ظ…ط¬ظ…ظˆط¹ط©`)
  }

  const handleRetry = () => {
    setLoading(true)
    setError(null)
    setTimeout(() => setLoading(false), 600)
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <PageHeader title={group.name} />
        <ErrorState message={error} onRetry={handleRetry} />
      </div>
    )
  }

  const availableStudents = mockStudents.filter(s => !groupStudents.find(gs => gs.id === s.id))

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title={group.name}
        description={`${group.courseName} - ${group.classroom}`}
        actions={
          <Button variant="outline" onClick={() => router.push("/teacher/groups")} leftIcon={<HiOutlineChevronRight className="w-4 h-4" />}>
            ط§ظ„ط¹ظˆط¯ط©
          </Button>
        }
      />

      {loading ? (
        <CardSkeleton count={1} />
      ) : (
        <Card>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <Badge variant={group.status === "active" ? "success" : group.status === "completed" ? "neutral" : "warning"} size="md">
                  {group.status === "active" ? "ظ†ط´ط·" : group.status === "completed" ? "ظ…ظƒطھظ…ظ„" : "ط؛ظٹط± ظ†ط´ط·"}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">ط§ظ„ط³ط¹ط©</p>
                <p className="text-lg font-bold text-text">{group.enrolledCount}/{group.capacity}</p>
                <Progress value={group.enrolledCount} max={group.capacity} variant={capacityPct >= 90 ? "warning" : "primary"} size="sm" className="mt-2" />
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">ط§ظ„ط·ظ„ط§ط¨ ط§ظ„ظ…ظ†طھط¸ط±ظˆظ†</p>
                <p className="text-lg font-bold text-text">{group.waitingCount}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">ط§ظ„ظ‚ط§ط¹ط©</p>
                <p className="text-lg font-bold text-text">{group.classroom}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">ط§ظ„ظ…ظˆط¹ط¯</p>
                <p className="text-sm font-bold text-text">
                  {group.schedule.map(s => `${dayMap[s.day]} ${s.startTime}-${s.endTime}`).join(" - ")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <StatsSkeleton count={3} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard title="ط§ظ„ط·ظ„ط§ط¨ ط§ظ„ظ…ط³ط¬ظ„ظˆظ†" value={groupStudents.length} icon={HiOutlineUsers} color="primary" />
          <StatsCard title="ظ‚ط§ط¦ظ…ط© ط§ظ„ط§ظ†طھط¸ط§ط±" value={groupWaiting.length} icon={HiOutlineClock} color="warning" />
          <StatsCard title="ظ†ط³ط¨ط© ط§ظ„ط¥ط´ط؛ط§ظ„" value={`${capacityPct}%`} icon={HiOutlineAcademicCap} color={capacityPct >= 90 ? "error" : "success"} />
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle>ط§ظ„ط·ظ„ط§ط¨</CardTitle>
            <Badge variant="primary">{filteredStudents.length}</Badge>
          </div>
          <div className="flex items-center gap-3">
            <SearchInput value={studentSearch} onChange={setStudentSearch} placeholder="ط¨ط­ط« ط¹ظ† ط·ط§ظ„ط¨..." className="w-64" />
            <Button onClick={() => setShowAddModal(true)} rightIcon={<HiOutlinePlus className="w-4 h-4" />}>
              ط¥ط¶ط§ظپط© ط·ط§ظ„ط¨
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <TableSkeleton rows={5} columns={5} />
          ) : filteredStudents.length === 0 ? (
            <EmptyState icon={HiOutlineUsers} title="ظ„ط§ ظٹظˆط¬ط¯ ط·ظ„ط§ط¨" description={studentSearch ? "ظ„ط§ طھظˆط¬ط¯ ظ†طھط§ط¦ط¬ ظ„ظ„ط¨ط­ط«" : "ظ‡ط°ظ‡ ط§ظ„ظ…ط¬ظ…ظˆط¹ط© ظ„ط§ طھط­طھظˆظٹ ط¹ظ„ظ‰ ط·ظ„ط§ط¨"} action={<Button onClick={() => setShowAddModal(true)}>ط¥ط¶ط§ظپط© ط·ط§ظ„ط¨</Button>} />
          ) : (
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-secondary border-b border-border">
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط§ظ„ط·ط§ظ„ط¨</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط±ظ‚ظ… ط§ظ„ظ…ظ‚ط¹ط¯</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط§ظ„ط­ط§ظ„ط©</th>
                    <th className="text-center px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">ط§ظ„ط¥ط¬ط±ط§ط،ط§طھ</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s, idx) => (
                    <tr key={s.id} className="border-b border-border last:border-0 hover:bg-surface-secondary/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 overflow-hidden shrink-0">
                            <img src={s.avatar} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-text truncate">{s.name}</p>
                            <p className="text-xs text-text-tertiary truncate">{s.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-text-secondary">{idx + 1}</td>
                      <td className="px-4 py-3">
                        <Badge variant={s.status === "active" ? "success" : s.status === "expired" ? "error" : "warning"}>
                          {s.status === "active" ? "ظ†ط´ط·" : s.status === "expired" ? "ظ…ظ†طھظ‡ظٹ" : "ط؛ظٹط± ظ†ط´ط·"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <Button variant="outline" size="xs" leftIcon={<HiOutlineSwitchHorizontal className="w-3.5 h-3.5" />} onClick={() => { setMoveStudentId(s.id); setShowMoveModal(true) }}>
                            ظ†ظ‚ظ„
                          </Button>
                          <Button variant="outline" size="xs" leftIcon={<HiOutlinePause className="w-3.5 h-3.5" />} onClick={() => { setFreezeStudentId(s.id); setShowFreezeModal(true) }}>
                            طھط¬ظ…ظٹط¯
                          </Button>
                          <Button variant="ghost" size="xs" leftIcon={<HiOutlineTrash className="w-3.5 h-3.5 text-error" />} onClick={() => handleRemoveStudent(s.name)}>
                            ط­ط°ظپ
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ظ‚ط§ط¦ظ…ط© ط§ظ„ط§ظ†طھط¸ط§ط±</CardTitle>
            <Badge variant="warning">{groupWaiting.length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-32" />
            ) : groupWaiting.length === 0 ? (
              <EmptyState icon={HiOutlineClock} title="ظ„ط§ ظٹظˆط¬ط¯ ط·ظ„ط§ط¨ ظ…ظ†طھط¸ط±ظˆظ†" bordered withBackground={false} />
            ) : (
              <div className="space-y-3">
                {groupWaiting.map((w) => (
                  <div key={w.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary border border-border">
                    <div>
                      <p className="text-sm font-medium text-text">{w.studentName}</p>
                      <p className="text-xs text-text-tertiary">{w.joinedAt.toLocaleDateString("ar-EG")}</p>
                    </div>
                    <Badge variant={w.priority === 1 ? "error" : w.priority === 2 ? "warning" : "info"}>
                      ط£ظˆظ„ظˆظٹط© {w.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ط§ظ„ط¯ط±ظˆط³ ط§ظ„ظ…ظپظ‚ظˆط¯ط©</CardTitle>
            <Badge variant="error">{missedForGroup.length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-32" />
            ) : missedForGroup.length === 0 ? (
              <EmptyState icon={HiOutlineRefresh} title="ظ„ط§ طھظˆط¬ط¯ ط¯ط±ظˆط³ ظ…ظپظ‚ظˆط¯ط©" bordered withBackground={false} />
            ) : (
              <div className="space-y-3">
                {missedForGroup.slice(0, 5).map((m) => (
                  <div key={m.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary border border-border">
                    <div>
                      <p className="text-sm font-medium text-text">{m.studentName}</p>
                      <p className="text-xs text-text-tertiary">{m.lessonTitle} - {m.date.toLocaleDateString("ar-EG")}</p>
                    </div>
                    <Button variant="primary" size="xs" leftIcon={<HiOutlineRefresh className="w-3.5 h-3.5" />} onClick={() => { setRecoverStudentId(m.studentId); setShowRecoverModal(true) }}>
                      طھط¹ظˆظٹط¶
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="ط¥ط¶ط§ظپط© ط·ط§ظ„ط¨ ط¥ظ„ظ‰ ط§ظ„ظ…ط¬ظ…ظˆط¹ط©" size="lg">
        <div className="space-y-4">
          <SearchInput value={addStudentSearch} onChange={setAddStudentSearch} placeholder="ط¨ط­ط« ط¹ظ† ط·ط§ظ„ط¨ ط¨ط§ظ„ط§ط³ظ… ط£ظˆ ط§ظ„ظ‡ط§طھظپ..." />
          <div className="max-h-64 overflow-y-auto space-y-2">
            {availableStudents.filter(s => s.name.includes(addStudentSearch) || s.phone.includes(addStudentSearch)).map((s) => (
              <div
                key={s.id}
                onClick={() => setSelectedStudentId(s.id)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer transition-colors",
                  selectedStudentId === s.id ? "bg-primary-5 border-primary" : "hover:bg-surface-secondary"
                )}
              >
                <div className="w-9 h-9 rounded-full bg-primary/10 overflow-hidden shrink-0">
                  <img src={s.avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-text">{s.name}</p>
                  <p className="text-xs text-text-tertiary">{s.grade} - {s.phone}</p>
                </div>
                <input type="radio" name="addStudent" checked={selectedStudentId === s.id} readOnly className="text-primary" />
              </div>
            ))}
            {availableStudents.length === 0 && <p className="text-center text-text-tertiary py-4">ظ„ط§ ظٹظˆط¬ط¯ ط·ظ„ط§ط¨ ظ…طھط§ط­ظˆظ†</p>}
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowAddModal(false)} className="flex-1">ط¥ظ„ط؛ط§ط،</Button>
            <Button onClick={handleAddStudent} disabled={!selectedStudentId} className="flex-1">ط¥ط¶ط§ظپط©</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showMoveModal} onClose={() => setShowMoveModal(false)} title="ظ†ظ‚ظ„ ط·ط§ظ„ط¨ ط¥ظ„ظ‰ ظ…ط¬ظ…ظˆط¹ط© ط£ط®ط±ظ‰" size="md">
        <div className="space-y-4">
          <Select label="ط§ظ„ظ…ط¬ظ…ظˆط¹ط© ط§ظ„ظ…ط³طھظ‡ط¯ظپط©" options={mockClassGroups.filter(g => g.id !== group.id).map(g => ({ value: g.id, label: `${g.name} - ${g.courseName}` }))} value={targetGroupId} onChange={(e) => setTargetGroupId(e.target.value)} placeholder="ط§ط®طھط± ط§ظ„ظ…ط¬ظ…ظˆط¹ط©" />
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowMoveModal(false)} className="flex-1">ط¥ظ„ط؛ط§ط،</Button>
            <Button onClick={handleMoveStudent} disabled={!targetGroupId} className="flex-1">ظ†ظ‚ظ„</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showFreezeModal} onClose={() => setShowFreezeModal(false)} title="طھط¬ظ…ظٹط¯ ط§ط´طھط±ط§ظƒ ط§ظ„ط·ط§ظ„ط¨" size="md">
        <div className="space-y-4">
          <Input label="طھط§ط±ظٹط® ط§ظ„ط¨ط¯ط§ظٹط©" type="date" value={freezeStart} onChange={(e) => setFreezeStart(e.target.value)} />
          <Input label="طھط§ط±ظٹط® ط§ظ„ظ†ظ‡ط§ظٹط©" type="date" value={freezeEnd} onChange={(e) => setFreezeEnd(e.target.value)} />
          <Input label="ط§ظ„ط³ط¨ط¨" value={freezeReason} onChange={(e) => setFreezeReason(e.target.value)} placeholder="ط§ط®طھظٹط§ط±ظٹ" />
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowFreezeModal(false)} className="flex-1">ط¥ظ„ط؛ط§ط،</Button>
            <Button onClick={handleFreeze} disabled={!freezeStart || !freezeEnd} className="flex-1">طھط¬ظ…ظٹط¯</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showRecoverModal} onClose={() => setShowRecoverModal(false)} title="طھط¹ظˆظٹط¶ ط¯ط±ط³ ظ…ظپظ‚ظˆط¯" size="md">
        <div className="space-y-4">
          {missedForGroup.filter(m => m.studentId === recoverStudentId || !recoverStudentId).length === 0 ? (
            <p className="text-center text-text-tertiary py-4">ظ„ط§ طھظˆط¬ط¯ ط¯ط±ظˆط³ ظ…ظپظ‚ظˆط¯ط© ظ„ظ‡ط°ط§ ط§ظ„ط·ط§ظ„ط¨</p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {missedForGroup.filter(m => m.studentId === recoverStudentId || !recoverStudentId).map((m) => (
                <div key={m.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary border border-border">
                  <div>
                    <p className="text-sm font-medium text-text">{m.lessonTitle}</p>
                    <p className="text-xs text-text-tertiary">{m.date.toLocaleDateString("ar-EG")}</p>
                  </div>
                  <Button variant="primary" size="xs" leftIcon={<HiOutlineRefresh className="w-3.5 h-3.5" />} onClick={handleRecover}>
                    طھط¹ظˆظٹط¶
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowRecoverModal(false)} className="flex-1">ط¥ط؛ظ„ط§ظ‚</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

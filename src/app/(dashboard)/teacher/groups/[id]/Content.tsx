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
  saturday: "╪╖┬د╪╕ظئ╪╖┬│╪╖┬ذ╪╖┌╛", sunday: "╪╖┬د╪╕ظئ╪╖┬ث╪╖┬ص╪╖┬»", monday: "╪╖┬د╪╕ظئ╪╖┬ح╪╖┬س╪╕ظب╪╕┘╣╪╕ظب",
  tuesday: "╪╖┬د╪╕ظئ╪╖┬س╪╕ظئ╪╖┬د╪╖┬س╪╖┬د╪╖╪î", wednesday: "╪╖┬د╪╕ظئ╪╖┬ث╪╖┬▒╪╖┬ذ╪╖┬╣╪╖┬د╪╖╪î", thursday: "╪╖┬د╪╕ظئ╪╖┬«╪╕ظخ╪╕┘╣╪╖┬│", friday: "╪╖┬د╪╕ظئ╪╖┬ش╪╕ظخ╪╖┬╣╪╖┬ر",
}

export default function Content({ id }: { id: string }) {
    const router = useRouter()
  const group = useMemo(() => mockClassGroups.find(g => g.id === id), [id])

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
        <PageHeader title="╪╖┬د╪╕ظئ╪╕ظخ╪╖┬ش╪╕ظخ╪╕╦╪╖┬╣╪╖┬ر ╪╖╪ؤ╪╕┘╣╪╖┬▒ ╪╕ظخ╪╕╦╪╖┬ش╪╕╦╪╖┬»╪╖┬ر" />
        <EmptyState icon={HiOutlineUsers} title="╪╖┬د╪╕ظئ╪╕ظخ╪╖┬ش╪╕ظخ╪╕╦╪╖┬╣╪╖┬ر ╪╖╪ؤ╪╕┘╣╪╖┬▒ ╪╕ظخ╪╕╦╪╖┬ش╪╕╦╪╖┬»╪╖┬ر" description="╪╕ظئ╪╕ظخ ╪╕┘╣╪╖┌╛╪╕ظخ ╪╖┬د╪╕ظئ╪╖┬╣╪╖┬س╪╕╦╪╖┬▒ ╪╖┬╣╪╕ظئ╪╕ظ░ ╪╖┬د╪╕ظئ╪╕ظخ╪╖┬ش╪╕ظخ╪╕╦╪╖┬╣╪╖┬ر ╪╖┬د╪╕ظئ╪╕ظخ╪╖┬╖╪╕ظئ╪╕╦╪╖┬ذ╪╖┬ر" action={<Button onClick={() => router.push("/teacher/groups")}>╪╖┬د╪╕ظئ╪╖┬╣╪╕╦╪╖┬»╪╖┬ر ╪╕ظئ╪╕ظئ╪╕ظخ╪╖┬ش╪╕ظخ╪╕╦╪╖┬╣╪╖┬د╪╖┌╛</Button>} />
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
    toast.success("╪╖┌╛╪╕ظخ ╪╖┬ح╪╖┬╢╪╖┬د╪╕┘╛╪╖┬ر ╪╖┬د╪╕ظئ╪╖┬╖╪╖┬د╪╕ظئ╪╖┬ذ ╪╖┬ح╪╕ظئ╪╕ظ░ ╪╖┬د╪╕ظئ╪╕ظخ╪╖┬ش╪╕ظخ╪╕╦╪╖┬╣╪╖┬ر")
    setShowAddModal(false)
    setSelectedStudentId("")
    setAddStudentSearch("")
  }

  const handleMoveStudent = () => {
    if (!targetGroupId) return
    toast.success("╪╖┌╛╪╕ظخ ╪╕ظب╪╕ظأ╪╕ظئ ╪╖┬د╪╕ظئ╪╖┬╖╪╖┬د╪╕ظئ╪╖┬ذ ╪╖┬ح╪╕ظئ╪╕ظ░ ╪╖┬د╪╕ظئ╪╕ظخ╪╖┬ش╪╕ظخ╪╕╦╪╖┬╣╪╖┬ر ╪╖┬ذ╪╕ظب╪╖┬ش╪╖┬د╪╖┬ص")
    setShowMoveModal(false)
    setMoveStudentId("")
    setTargetGroupId("")
  }

  const handleFreeze = () => {
    toast.success("╪╖┌╛╪╕ظخ ╪╖┌╛╪╖┬ش╪╕ظخ╪╕┘╣╪╖┬» ╪╖┬د╪╖┬┤╪╖┌╛╪╖┬▒╪╖┬د╪╕╞ْ ╪╖┬د╪╕ظئ╪╖┬╖╪╖┬د╪╕ظئ╪╖┬ذ")
    setShowFreezeModal(false)
    setFreezeStudentId("")
    setFreezeStart("")
    setFreezeEnd("")
    setFreezeReason("")
  }

  const handleRecover = () => {
    toast.success("╪╖┌╛╪╕ظخ ╪╖┌╛╪╖┬╣╪╕╦╪╕┘╣╪╖┬╢ ╪╖┬د╪╕ظئ╪╖┬»╪╖┬▒╪╖┬│ ╪╕ظئ╪╕ظئ╪╖┬╖╪╖┬د╪╕ظئ╪╖┬ذ")
    setShowRecoverModal(false)
    setRecoverStudentId("")
  }

  const handleRemoveStudent = (name: string) => {
    toast.success(`╪╖┌╛╪╕ظخ ╪╖┬ص╪╖┬░╪╕┘╛ ${name} ╪╕ظخ╪╕ظب ╪╖┬د╪╕ظئ╪╕ظخ╪╖┬ش╪╕ظخ╪╕╦╪╖┬╣╪╖┬ر`)
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
            ╪╖┬د╪╕ظئ╪╖┬╣╪╕╦╪╖┬»╪╖┬ر
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
                  {group.status === "active" ? "╪╕ظب╪╖┬┤╪╖┬╖" : group.status === "completed" ? "╪╕ظخ╪╕╞ْ╪╖┌╛╪╕ظخ╪╕ظئ" : "╪╖╪ؤ╪╕┘╣╪╖┬▒ ╪╕ظب╪╖┬┤╪╖┬╖"}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">╪╖┬د╪╕ظئ╪╖┬│╪╖┬╣╪╖┬ر</p>
                <p className="text-lg font-bold text-text">{group.enrolledCount}/{group.capacity}</p>
                <Progress value={group.enrolledCount} max={group.capacity} variant={capacityPct >= 90 ? "warning" : "primary"} size="sm" className="mt-2" />
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">╪╖┬د╪╕ظئ╪╖┬╖╪╕ظئ╪╖┬د╪╖┬ذ ╪╖┬د╪╕ظئ╪╕ظخ╪╕ظب╪╖┌╛╪╖┬╕╪╖┬▒╪╕╦╪╕ظب</p>
                <p className="text-lg font-bold text-text">{group.waitingCount}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">╪╖┬د╪╕ظئ╪╕ظأ╪╖┬د╪╖┬╣╪╖┬ر</p>
                <p className="text-lg font-bold text-text">{group.classroom}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">╪╖┬د╪╕ظئ╪╕ظخ╪╕╦╪╖┬╣╪╖┬»</p>
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
          <StatsCard title="╪╖┬د╪╕ظئ╪╖┬╖╪╕ظئ╪╖┬د╪╖┬ذ ╪╖┬د╪╕ظئ╪╕ظخ╪╖┬│╪╖┬ش╪╕ظئ╪╕╦╪╕ظب" value={groupStudents.length} icon={HiOutlineUsers} color="primary" />
          <StatsCard title="╪╕ظأ╪╖┬د╪╖┬خ╪╕ظخ╪╖┬ر ╪╖┬د╪╕ظئ╪╖┬د╪╕ظب╪╖┌╛╪╖┬╕╪╖┬د╪╖┬▒" value={groupWaiting.length} icon={HiOutlineClock} color="warning" />
          <StatsCard title="╪╕ظب╪╖┬│╪╖┬ذ╪╖┬ر ╪╖┬د╪╕ظئ╪╖┬ح╪╖┬┤╪╖╪ؤ╪╖┬د╪╕ظئ" value={`${capacityPct}%`} icon={HiOutlineAcademicCap} color={capacityPct >= 90 ? "error" : "success"} />
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle>╪╖┬د╪╕ظئ╪╖┬╖╪╕ظئ╪╖┬د╪╖┬ذ</CardTitle>
            <Badge variant="primary">{filteredStudents.length}</Badge>
          </div>
          <div className="flex items-center gap-3">
            <SearchInput value={studentSearch} onChange={setStudentSearch} placeholder="╪╖┬ذ╪╖┬ص╪╖┬س ╪╖┬╣╪╕ظب ╪╖┬╖╪╖┬د╪╕ظئ╪╖┬ذ..." className="w-64" />
            <Button onClick={() => setShowAddModal(true)} rightIcon={<HiOutlinePlus className="w-4 h-4" />}>
              ╪╖┬ح╪╖┬╢╪╖┬د╪╕┘╛╪╖┬ر ╪╖┬╖╪╖┬د╪╕ظئ╪╖┬ذ
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <TableSkeleton rows={5} columns={5} />
          ) : filteredStudents.length === 0 ? (
            <EmptyState icon={HiOutlineUsers} title="╪╕ظئ╪╖┬د ╪╕┘╣╪╕╦╪╖┬ش╪╖┬» ╪╖┬╖╪╕ظئ╪╖┬د╪╖┬ذ" description={studentSearch ? "╪╕ظئ╪╖┬د ╪╖┌╛╪╕╦╪╖┬ش╪╖┬» ╪╕ظب╪╖┌╛╪╖┬د╪╖┬خ╪╖┬ش ╪╕ظئ╪╕ظئ╪╖┬ذ╪╖┬ص╪╖┬س" : "╪╕ظة╪╖┬░╪╕ظة ╪╖┬د╪╕ظئ╪╕ظخ╪╖┬ش╪╕ظخ╪╕╦╪╖┬╣╪╖┬ر ╪╕ظئ╪╖┬د ╪╖┌╛╪╖┬ص╪╖┌╛╪╕╦╪╕┘╣ ╪╖┬╣╪╕ظئ╪╕ظ░ ╪╖┬╖╪╕ظئ╪╖┬د╪╖┬ذ"} action={<Button onClick={() => setShowAddModal(true)}>╪╖┬ح╪╖┬╢╪╖┬د╪╕┘╛╪╖┬ر ╪╖┬╖╪╖┬د╪╕ظئ╪╖┬ذ</Button>} />
          ) : (
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-secondary border-b border-border">
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">╪╖┬د╪╕ظئ╪╖┬╖╪╖┬د╪╕ظئ╪╖┬ذ</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">╪╖┬▒╪╕ظأ╪╕ظخ ╪╖┬د╪╕ظئ╪╕ظخ╪╕ظأ╪╖┬╣╪╖┬»</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">╪╖┬د╪╕ظئ╪╖┬ص╪╖┬د╪╕ظئ╪╖┬ر</th>
                    <th className="text-center px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">╪╖┬د╪╕ظئ╪╖┬ح╪╖┬ش╪╖┬▒╪╖┬د╪╖╪î╪╖┬د╪╖┌╛</th>
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
                          {s.status === "active" ? "╪╕ظب╪╖┬┤╪╖┬╖" : s.status === "expired" ? "╪╕ظخ╪╕ظب╪╖┌╛╪╕ظة╪╕┘╣" : "╪╖╪ؤ╪╕┘╣╪╖┬▒ ╪╕ظب╪╖┬┤╪╖┬╖"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <Button variant="outline" size="xs" leftIcon={<HiOutlineSwitchHorizontal className="w-3.5 h-3.5" />} onClick={() => { setMoveStudentId(s.id); setShowMoveModal(true) }}>
                            ╪╕ظب╪╕ظأ╪╕ظئ
                          </Button>
                          <Button variant="outline" size="xs" leftIcon={<HiOutlinePause className="w-3.5 h-3.5" />} onClick={() => { setFreezeStudentId(s.id); setShowFreezeModal(true) }}>
                            ╪╖┌╛╪╖┬ش╪╕ظخ╪╕┘╣╪╖┬»
                          </Button>
                          <Button variant="ghost" size="xs" leftIcon={<HiOutlineTrash className="w-3.5 h-3.5 text-error" />} onClick={() => handleRemoveStudent(s.name)}>
                            ╪╖┬ص╪╖┬░╪╕┘╛
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
            <CardTitle>╪╕ظأ╪╖┬د╪╖┬خ╪╕ظخ╪╖┬ر ╪╖┬د╪╕ظئ╪╖┬د╪╕ظب╪╖┌╛╪╖┬╕╪╖┬د╪╖┬▒</CardTitle>
            <Badge variant="warning">{groupWaiting.length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-32" />
            ) : groupWaiting.length === 0 ? (
              <EmptyState icon={HiOutlineClock} title="╪╕ظئ╪╖┬د ╪╕┘╣╪╕╦╪╖┬ش╪╖┬» ╪╖┬╖╪╕ظئ╪╖┬د╪╖┬ذ ╪╕ظخ╪╕ظب╪╖┌╛╪╖┬╕╪╖┬▒╪╕╦╪╕ظب" bordered withBackground={false} />
            ) : (
              <div className="space-y-3">
                {groupWaiting.map((w) => (
                  <div key={w.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary border border-border">
                    <div>
                      <p className="text-sm font-medium text-text">{w.studentName}</p>
                      <p className="text-xs text-text-tertiary">{w.joinedAt.toLocaleDateString("ar-EG")}</p>
                    </div>
                    <Badge variant={w.priority === 1 ? "error" : w.priority === 2 ? "warning" : "info"}>
                      ╪╖┬ث╪╕╦╪╕ظئ╪╕╦╪╕┘╣╪╖┬ر {w.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>╪╖┬د╪╕ظئ╪╖┬»╪╖┬▒╪╕╦╪╖┬│ ╪╖┬د╪╕ظئ╪╕ظخ╪╕┘╛╪╕ظأ╪╕╦╪╖┬»╪╖┬ر</CardTitle>
            <Badge variant="error">{missedForGroup.length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-32" />
            ) : missedForGroup.length === 0 ? (
              <EmptyState icon={HiOutlineRefresh} title="╪╕ظئ╪╖┬د ╪╖┌╛╪╕╦╪╖┬ش╪╖┬» ╪╖┬»╪╖┬▒╪╕╦╪╖┬│ ╪╕ظخ╪╕┘╛╪╕ظأ╪╕╦╪╖┬»╪╖┬ر" bordered withBackground={false} />
            ) : (
              <div className="space-y-3">
                {missedForGroup.slice(0, 5).map((m) => (
                  <div key={m.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary border border-border">
                    <div>
                      <p className="text-sm font-medium text-text">{m.studentName}</p>
                      <p className="text-xs text-text-tertiary">{m.lessonTitle} - {m.date.toLocaleDateString("ar-EG")}</p>
                    </div>
                    <Button variant="primary" size="xs" leftIcon={<HiOutlineRefresh className="w-3.5 h-3.5" />} onClick={() => { setRecoverStudentId(m.studentId); setShowRecoverModal(true) }}>
                      ╪╖┌╛╪╖┬╣╪╕╦╪╕┘╣╪╖┬╢
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="╪╖┬ح╪╖┬╢╪╖┬د╪╕┘╛╪╖┬ر ╪╖┬╖╪╖┬د╪╕ظئ╪╖┬ذ ╪╖┬ح╪╕ظئ╪╕ظ░ ╪╖┬د╪╕ظئ╪╕ظخ╪╖┬ش╪╕ظخ╪╕╦╪╖┬╣╪╖┬ر" size="lg">
        <div className="space-y-4">
          <SearchInput value={addStudentSearch} onChange={setAddStudentSearch} placeholder="╪╖┬ذ╪╖┬ص╪╖┬س ╪╖┬╣╪╕ظب ╪╖┬╖╪╖┬د╪╕ظئ╪╖┬ذ ╪╖┬ذ╪╖┬د╪╕ظئ╪╖┬د╪╖┬│╪╕ظخ ╪╖┬ث╪╕╦ ╪╖┬د╪╕ظئ╪╕ظة╪╖┬د╪╖┌╛╪╕┘╛..." />
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
            {availableStudents.length === 0 && <p className="text-center text-text-tertiary py-4">╪╕ظئ╪╖┬د ╪╕┘╣╪╕╦╪╖┬ش╪╖┬» ╪╖┬╖╪╕ظئ╪╖┬د╪╖┬ذ ╪╕ظخ╪╖┌╛╪╖┬د╪╖┬ص╪╕╦╪╕ظب</p>}
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowAddModal(false)} className="flex-1">╪╖┬ح╪╕ظئ╪╖╪ؤ╪╖┬د╪╖╪î</Button>
            <Button onClick={handleAddStudent} disabled={!selectedStudentId} className="flex-1">╪╖┬ح╪╖┬╢╪╖┬د╪╕┘╛╪╖┬ر</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showMoveModal} onClose={() => setShowMoveModal(false)} title="╪╕ظب╪╕ظأ╪╕ظئ ╪╖┬╖╪╖┬د╪╕ظئ╪╖┬ذ ╪╖┬ح╪╕ظئ╪╕ظ░ ╪╕ظخ╪╖┬ش╪╕ظخ╪╕╦╪╖┬╣╪╖┬ر ╪╖┬ث╪╖┬«╪╖┬▒╪╕ظ░" size="md">
        <div className="space-y-4">
          <Select label="╪╖┬د╪╕ظئ╪╕ظخ╪╖┬ش╪╕ظخ╪╕╦╪╖┬╣╪╖┬ر ╪╖┬د╪╕ظئ╪╕ظخ╪╖┬│╪╖┌╛╪╕ظة╪╖┬»╪╕┘╛╪╖┬ر" options={mockClassGroups.filter(g => g.id !== group.id).map(g => ({ value: g.id, label: `${g.name} - ${g.courseName}` }))} value={targetGroupId} onChange={(e) => setTargetGroupId(e.target.value)} placeholder="╪╖┬د╪╖┬«╪╖┌╛╪╖┬▒ ╪╖┬د╪╕ظئ╪╕ظخ╪╖┬ش╪╕ظخ╪╕╦╪╖┬╣╪╖┬ر" />
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowMoveModal(false)} className="flex-1">╪╖┬ح╪╕ظئ╪╖╪ؤ╪╖┬د╪╖╪î</Button>
            <Button onClick={handleMoveStudent} disabled={!targetGroupId} className="flex-1">╪╕ظب╪╕ظأ╪╕ظئ</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showFreezeModal} onClose={() => setShowFreezeModal(false)} title="╪╖┌╛╪╖┬ش╪╕ظخ╪╕┘╣╪╖┬» ╪╖┬د╪╖┬┤╪╖┌╛╪╖┬▒╪╖┬د╪╕╞ْ ╪╖┬د╪╕ظئ╪╖┬╖╪╖┬د╪╕ظئ╪╖┬ذ" size="md">
        <div className="space-y-4">
          <Input label="╪╖┌╛╪╖┬د╪╖┬▒╪╕┘╣╪╖┬« ╪╖┬د╪╕ظئ╪╖┬ذ╪╖┬»╪╖┬د╪╕┘╣╪╖┬ر" type="date" value={freezeStart} onChange={(e) => setFreezeStart(e.target.value)} />
          <Input label="╪╖┌╛╪╖┬د╪╖┬▒╪╕┘╣╪╖┬« ╪╖┬د╪╕ظئ╪╕ظب╪╕ظة╪╖┬د╪╕┘╣╪╖┬ر" type="date" value={freezeEnd} onChange={(e) => setFreezeEnd(e.target.value)} />
          <Input label="╪╖┬د╪╕ظئ╪╖┬│╪╖┬ذ╪╖┬ذ" value={freezeReason} onChange={(e) => setFreezeReason(e.target.value)} placeholder="╪╖┬د╪╖┬«╪╖┌╛╪╕┘╣╪╖┬د╪╖┬▒╪╕┘╣" />
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowFreezeModal(false)} className="flex-1">╪╖┬ح╪╕ظئ╪╖╪ؤ╪╖┬د╪╖╪î</Button>
            <Button onClick={handleFreeze} disabled={!freezeStart || !freezeEnd} className="flex-1">╪╖┌╛╪╖┬ش╪╕ظخ╪╕┘╣╪╖┬»</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showRecoverModal} onClose={() => setShowRecoverModal(false)} title="╪╖┌╛╪╖┬╣╪╕╦╪╕┘╣╪╖┬╢ ╪╖┬»╪╖┬▒╪╖┬│ ╪╕ظخ╪╕┘╛╪╕ظأ╪╕╦╪╖┬»" size="md">
        <div className="space-y-4">
          {missedForGroup.filter(m => m.studentId === recoverStudentId || !recoverStudentId).length === 0 ? (
            <p className="text-center text-text-tertiary py-4">╪╕ظئ╪╖┬د ╪╖┌╛╪╕╦╪╖┬ش╪╖┬» ╪╖┬»╪╖┬▒╪╕╦╪╖┬│ ╪╕ظخ╪╕┘╛╪╕ظأ╪╕╦╪╖┬»╪╖┬ر ╪╕ظئ╪╕ظة╪╖┬░╪╖┬د ╪╖┬د╪╕ظئ╪╖┬╖╪╖┬د╪╕ظئ╪╖┬ذ</p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {missedForGroup.filter(m => m.studentId === recoverStudentId || !recoverStudentId).map((m) => (
                <div key={m.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary border border-border">
                  <div>
                    <p className="text-sm font-medium text-text">{m.lessonTitle}</p>
                    <p className="text-xs text-text-tertiary">{m.date.toLocaleDateString("ar-EG")}</p>
                  </div>
                  <Button variant="primary" size="xs" leftIcon={<HiOutlineRefresh className="w-3.5 h-3.5" />} onClick={handleRecover}>
                    ╪╖┌╛╪╖┬╣╪╕╦╪╕┘╣╪╖┬╢
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowRecoverModal(false)} className="flex-1">╪╖┬ح╪╖╪ؤ╪╕ظئ╪╖┬د╪╕ظأ</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}





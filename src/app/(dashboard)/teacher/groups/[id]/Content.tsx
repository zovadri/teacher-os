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
  saturday: "السبت", sunday: "الأحد", monday: "الإثنين",
  tuesday: "الثلاثاء", wednesday: "الأربعاء", thursday: "الخميس", friday: "الجمعة",
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
        <PageHeader title="المجموعة غير موجودة" />
        <EmptyState icon={HiOutlineUsers} title="المجموعة غير موجودة" description="لم يتم العثور على المجموعة المطلوبة" action={<Button onClick={() => router.push("/teacher/groups")}>العودة للمجموعات</Button>} />
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
    toast.success("تم إضافة الطالب إلى المجموعة")
    setShowAddModal(false)
    setSelectedStudentId("")
    setAddStudentSearch("")
  }

  const handleMoveStudent = () => {
    if (!targetGroupId) return
    toast.success("تم نقل الطالب إلى المجموعة بنجاح")
    setShowMoveModal(false)
    setMoveStudentId("")
    setTargetGroupId("")
  }

  const handleFreeze = () => {
    toast.success("تم تجميد اشتراك الطالب")
    setShowFreezeModal(false)
    setFreezeStudentId("")
    setFreezeStart("")
    setFreezeEnd("")
    setFreezeReason("")
  }

  const handleRecover = () => {
    toast.success("تم تعويض الدرس للطالب")
    setShowRecoverModal(false)
    setRecoverStudentId("")
  }

  const handleRemoveStudent = (name: string) => {
    toast.success(`تم حذف ${name} من المجموعة`)
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
            العودة
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
                  {group.status === "active" ? "نشط" : group.status === "completed" ? "مكتمل" : "غير نشط"}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">السعة</p>
                <p className="text-lg font-bold text-text">{group.enrolledCount}/{group.capacity}</p>
                <Progress value={group.enrolledCount} max={group.capacity} variant={capacityPct >= 90 ? "warning" : "primary"} size="sm" className="mt-2" />
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">الطلاب المنتظرون</p>
                <p className="text-lg font-bold text-text">{group.waitingCount}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">القاعة</p>
                <p className="text-lg font-bold text-text">{group.classroom}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">الموعد</p>
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
          <StatsCard title="الطلاب المسجلون" value={groupStudents.length} icon={HiOutlineUsers} color="primary" />
          <StatsCard title="قائمة الانتظار" value={groupWaiting.length} icon={HiOutlineClock} color="warning" />
          <StatsCard title="نسبة الإشغال" value={`${capacityPct}%`} icon={HiOutlineAcademicCap} color={capacityPct >= 90 ? "error" : "success"} />
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle>الطلاب</CardTitle>
            <Badge variant="primary">{filteredStudents.length}</Badge>
          </div>
          <div className="flex items-center gap-3">
            <SearchInput value={studentSearch} onChange={setStudentSearch} placeholder="بحث عن طالب..." className="w-64" />
            <Button onClick={() => setShowAddModal(true)} rightIcon={<HiOutlinePlus className="w-4 h-4" />}>
              إضافة طالب
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <TableSkeleton rows={5} columns={5} />
          ) : filteredStudents.length === 0 ? (
            <EmptyState icon={HiOutlineUsers} title="لا يوجد طلاب" description={studentSearch ? "لا توجد نتائج للبحث" : "هذه المجموعة لا تحتوي على طلاب"} action={<Button onClick={() => setShowAddModal(true)}>إضافة طالب</Button>} />
          ) : (
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-secondary border-b border-border">
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">الطالب</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">رقم المقعد</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">الحالة</th>
                    <th className="text-center px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">الإجراءات</th>
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
                          {s.status === "active" ? "نشط" : s.status === "expired" ? "منتهي" : "غير نشط"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <Button variant="outline" size="xs" leftIcon={<HiOutlineSwitchHorizontal className="w-3.5 h-3.5" />} onClick={() => { setMoveStudentId(s.id); setShowMoveModal(true) }}>
                            نقل
                          </Button>
                          <Button variant="outline" size="xs" leftIcon={<HiOutlinePause className="w-3.5 h-3.5" />} onClick={() => { setFreezeStudentId(s.id); setShowFreezeModal(true) }}>
                            تجميد
                          </Button>
                          <Button variant="ghost" size="xs" leftIcon={<HiOutlineTrash className="w-3.5 h-3.5 text-error" />} onClick={() => handleRemoveStudent(s.name)}>
                            حذف
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
            <CardTitle>قائمة الانتظار</CardTitle>
            <Badge variant="warning">{groupWaiting.length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-32" />
            ) : groupWaiting.length === 0 ? (
              <EmptyState icon={HiOutlineClock} title="لا يوجد طلاب منتظرون" bordered withBackground={false} />
            ) : (
              <div className="space-y-3">
                {groupWaiting.map((w) => (
                  <div key={w.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary border border-border">
                    <div>
                      <p className="text-sm font-medium text-text">{w.studentName}</p>
                      <p className="text-xs text-text-tertiary">{w.joinedAt.toLocaleDateString("ar-EG")}</p>
                    </div>
                    <Badge variant={w.priority === 1 ? "error" : w.priority === 2 ? "warning" : "info"}>
                      أولوية {w.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>الدروس المفقودة</CardTitle>
            <Badge variant="error">{missedForGroup.length}</Badge>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-32" />
            ) : missedForGroup.length === 0 ? (
              <EmptyState icon={HiOutlineRefresh} title="لا توجد دروس مفقودة" bordered withBackground={false} />
            ) : (
              <div className="space-y-3">
                {missedForGroup.slice(0, 5).map((m) => (
                  <div key={m.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary border border-border">
                    <div>
                      <p className="text-sm font-medium text-text">{m.studentName}</p>
                      <p className="text-xs text-text-tertiary">{m.lessonTitle} - {m.date.toLocaleDateString("ar-EG")}</p>
                    </div>
                    <Button variant="primary" size="xs" leftIcon={<HiOutlineRefresh className="w-3.5 h-3.5" />} onClick={() => { setRecoverStudentId(m.studentId); setShowRecoverModal(true) }}>
                      تعويض
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="إضافة طالب إلى المجموعة" size="lg">
        <div className="space-y-4">
          <SearchInput value={addStudentSearch} onChange={setAddStudentSearch} placeholder="بحث عن طالب بالاسم أو الهاتف..." />
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
            {availableStudents.length === 0 && <p className="text-center text-text-tertiary py-4">لا يوجد طلاب متاحون</p>}
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowAddModal(false)} className="flex-1">إلغاء</Button>
            <Button onClick={handleAddStudent} disabled={!selectedStudentId} className="flex-1">إضافة</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showMoveModal} onClose={() => setShowMoveModal(false)} title="نقل طالب إلى مجموعة أخرى" size="md">
        <div className="space-y-4">
          <Select label="المجموعة المستهدفة" options={mockClassGroups.filter(g => g.id !== group.id).map(g => ({ value: g.id, label: `${g.name} - ${g.courseName}` }))} value={targetGroupId} onChange={(e) => setTargetGroupId(e.target.value)} placeholder="اختر المجموعة" />
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowMoveModal(false)} className="flex-1">إلغاء</Button>
            <Button onClick={handleMoveStudent} disabled={!targetGroupId} className="flex-1">نقل</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showFreezeModal} onClose={() => setShowFreezeModal(false)} title="تجميد اشتراك الطالب" size="md">
        <div className="space-y-4">
          <Input label="تاريخ البداية" type="date" value={freezeStart} onChange={(e) => setFreezeStart(e.target.value)} />
          <Input label="تاريخ النهاية" type="date" value={freezeEnd} onChange={(e) => setFreezeEnd(e.target.value)} />
          <Input label="السبب" value={freezeReason} onChange={(e) => setFreezeReason(e.target.value)} placeholder="اختياري" />
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowFreezeModal(false)} className="flex-1">إلغاء</Button>
            <Button onClick={handleFreeze} disabled={!freezeStart || !freezeEnd} className="flex-1">تجميد</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showRecoverModal} onClose={() => setShowRecoverModal(false)} title="تعويض درس مفقود" size="md">
        <div className="space-y-4">
          {missedForGroup.filter(m => m.studentId === recoverStudentId || !recoverStudentId).length === 0 ? (
            <p className="text-center text-text-tertiary py-4">لا توجد دروس مفقودة لهذا الطالب</p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {missedForGroup.filter(m => m.studentId === recoverStudentId || !recoverStudentId).map((m) => (
                <div key={m.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary border border-border">
                  <div>
                    <p className="text-sm font-medium text-text">{m.lessonTitle}</p>
                    <p className="text-xs text-text-tertiary">{m.date.toLocaleDateString("ar-EG")}</p>
                  </div>
                  <Button variant="primary" size="xs" leftIcon={<HiOutlineRefresh className="w-3.5 h-3.5" />} onClick={handleRecover}>
                    تعويض
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowRecoverModal(false)} className="flex-1">إغلاق</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

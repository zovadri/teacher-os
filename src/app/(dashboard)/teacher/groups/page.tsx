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
  saturday: "السبت", sunday: "الأحد", monday: "الإثنين",
  tuesday: "الثلاثاء", wednesday: "الأربعاء", thursday: "الخميس", friday: "الجمعة",
}

const statusVariant: Record<string, "success" | "warning" | "neutral"> = {
  active: "success", inactive: "warning", completed: "neutral",
}

const tabs = [
  { id: "groups", label: "المجموعات", icon: <HiOutlineUserGroup className="w-4 h-4" /> },
  { id: "waiting", label: "قائمة الانتظار", icon: <HiOutlineClock className="w-4 h-4" /> },
  { id: "freeze", label: "التجميد", icon: <HiOutlinePause className="w-4 h-4" /> },
  { id: "missed", label: "الدروس المفقودة", icon: <HiOutlineExclamation className="w-4 h-4" /> },
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
    toast.success(`طھظ… إضافة المجموعة ${addForm.name || "جديدة"} بنجاح`)
    setShowAddModal(false)
    setAddForm({ name: "", courseId: "", capacity: "25", classroom: "" })
  }

  const handleNotify = (id: string) => {
    toast.success("طھظ… إرسال الإشعار للطالب")
  }

  const handleRecover = (id: string) => {
    toast.success("طھظ… تعويض الدرس بنجاح")
  }

  const handleRetry = () => {
    setLoading(true)
    setError(null)
    setTimeout(() => setLoading(false), 800)
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <PageHeader title="إدارة المجموعات والفصول" description="عرض وإدارة المجموعات الدراسية" />
        <ErrorState message={error} onRetry={handleRetry} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="إدارة المجموعات والفصول"
        description="عرض وإدارة المجموعات الدراسية"
        actions={
          <Button onClick={() => setShowAddModal(true)} rightIcon={<HiOutlinePlus className="w-4 h-4" />}>
            إضافة مجموعة
          </Button>
        }
      />

      {loading ? (
        <StatsSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="إجمالي المجموعات" value={stats.totalGroups} icon={HiOutlineUserGroup} color="primary" />
          <StatsCard title="إجمالي الطلاب" value={stats.totalStudents} icon={HiOutlineUsers} color="success" />
          <StatsCard title="قائمة الانتظار" value={stats.waitingCount} icon={HiOutlineClock} color="warning" />
          <StatsCard title="المجمدون" value={stats.frozenCount} icon={HiOutlinePause} color="error" />
        </div>
      )}

      <Tabs tabs={tabs}>
        {(activeTab) => (
          <>
            <TabPanel id="groups" activeTab={activeTab}>
              <div className="space-y-4">
                <SearchInput value={search} onChange={setSearch} placeholder="بحث عن مجموعة..." />
                {loading ? (
                  <CardSkeleton count={3} />
                ) : paginatedGroups.length === 0 ? (
                  <EmptyState
                    icon={HiOutlineUserGroup}
                    title="لا توجد مجموعات"
                    description={search ? "لا توجد نتائج للبحث" : "لم ظٹطھظ… إضافة ط£ظٹ مجموعات بعد"}
                    action={<Button onClick={() => { setAddForm({ name: "", courseId: "", capacity: "25", classroom: "" }); setShowAddModal(true) }}>إضافة مجموعة</Button>}
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
                              <Badge variant={statusVariant[group.status]}>{group.status === "active" ? "نشط" : group.status === "completed" ? "مكتمل" : "غير نشط"}</Badge>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-text-secondary">السعة</span>
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
                                  <span>{group.waitingCount} طالب ظپظٹ الانتظار</span>
                                </div>
                              )}
                            </CardContent>
                            <div className="flex items-center gap-2 px-6 pb-4 pt-0">
                              <Link href={`/teacher/groups/${group.id}`}>
                                <Button variant="primary" size="sm" leftIcon={<HiOutlineEye className="w-4 h-4" />}>
                                  عرض المجموعة
                                </Button>
                              </Link>
                              {group.waitingCount > 0 && (
                                <Button variant="outline" size="sm" leftIcon={<HiOutlineClock className="w-4 h-4" />}>
                                  عرض قائمة الانتظار
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
                <EmptyState icon={HiOutlineClock} title="لا يوجد طلاب ظپظٹ الانتظار" description="قائمة الانتظار فارغة حالياً" />
              ) : (
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-surface-secondary border-b border-border">
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">الطالب</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">المجموعة</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">تاريخ الانضمام</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">الأولوية</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">الحالة</th>
                        <th className="text-center px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">الإجراءات</th>
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
                              {w.priority === 1 ? "عالية" : w.priority === 2 ? "متوسطة" : "منخفضة"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={w.status === "waiting" ? "warning" : w.status === "enrolled" ? "success" : w.status === "cancelled" ? "error" : "info"}>
                              {w.status === "waiting" ? "بانتظار" : w.status === "offered" ? "طھظ… العرض" : w.status === "enrolled" ? "مسجل" : "ملغي"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-2">
                              <Button variant="outline" size="xs" leftIcon={<HiOutlineBell className="w-3.5 h-3.5" />} onClick={() => handleNotify(w.id)}>
                                إخطار
                              </Button>
                              <Button variant="success" size="xs" leftIcon={<HiOutlinePlus className="w-3.5 h-3.5" />}>
                                تسجيل
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
                <EmptyState icon={HiOutlinePause} title="لا توجد سجلات تجميد" description="لا يوجد اشتراكات مجمدة حالياً" />
              ) : (
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-surface-secondary border-b border-border">
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">الطالب</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">المجموعة</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">تاريخ البداية</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">تاريخ النهاية</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">السبب</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">الحالة</th>
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
                              {f.status === "active" ? "نشط" : f.status === "expired" ? "منتهي" : "ملغي"}
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
                <EmptyState icon={HiOutlineExclamation} title="لا توجد دروس مفقودة" description="جميع الدروس طھظ… تعويضها" />
              ) : (
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-surface-secondary border-b border-border">
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">الطالب</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">الدرس</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">التاريخ</th>
                        <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">الحالة</th>
                        <th className="text-center px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">الإجراءات</th>
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
                              {m.recovered ? "طھظ… التعويض" : "مفقود"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex justify-center">
                              <Button variant="primary" size="xs" leftIcon={<HiOutlineRefresh className="w-3.5 h-3.5" />} onClick={() => handleRecover(m.id)}>
                                تعويض
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

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="إضافة مجموعة جديدة" size="md">
        <div className="space-y-4">
          <Input label="اسم المجموعة" value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} placeholder="مثال: مجموعة A" />
          <Select label="الكورس" options={mockCourses.map(c => ({ value: c.id, label: c.title }))} value={addForm.courseId} onChange={(e) => setAddForm({ ...addForm, courseId: e.target.value })} placeholder="اختر الكورس" />
          <Input label="السعة" type="number" value={addForm.capacity} onChange={(e) => setAddForm({ ...addForm, capacity: e.target.value })} placeholder="25" />
          <Input label="القاعة" value={addForm.classroom} onChange={(e) => setAddForm({ ...addForm, classroom: e.target.value })} placeholder="مثال: قاعة الأندلس" />
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowAddModal(false)} className="flex-1">إلغاء</Button>
            <button type="button" onClick={handleAddGroup} className="flex-1">إضافة</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

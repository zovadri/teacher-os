"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  HiOutlineUsers, HiOutlineUserGroup, HiOutlineClock, HiOutlinePause,
  HiOutlinePlus, HiOutlineEye, HiOutlineBell, HiOutlineRefresh,
  HiOutlineAcademicCap, HiOutlineExclamation, HiOutlineX,
} from "react-icons/hi"
import toast from "react-hot-toast"
import { PageHeader } from "@/components/ui/PageHeader"
import { Badge } from "@/components/ui/Badge"
import { Tabs, TabPanel } from "@/components/ui/Tabs"
import { StatsCard } from "@/components/ui/StatsCard"
import { Progress } from "@/components/ui/Progress"
import { SearchInput } from "@/components/ui/SearchInput"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { StatsSkeleton, CardSkeleton } from "@/components/ui/Skeleton"
import Button from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { mockClassGroups, mockWaitingStudents, mockFreezeRecords, mockMissedLessons, mockCourses } from "@/lib/mock/data"

const dayMap: Record<string, string> = {
  saturday: "السبت", sunday: "الأحد", monday: "الإثنين",
  tuesday: "الثلاثاء", wednesday: "الأربعاء", thursday: "الخميس", friday: "الجمعة",
}

const statusVariant: Record<string, "success" | "warning" | "default"> = {
  active: "success", inactive: "warning", completed: "default",
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
  const [showAdd, setShowAdd] = useState(false)
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

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader title="إدارة المجموعات والفصول" description="عرض وإدارة المجموعات الدراسية" />
        <ErrorState title="حدث خطأ" description={error} retryLabel="إعادة المحاولة" onRetry={() => { setLoading(true); setError(null); setTimeout(() => setLoading(false), 800) }} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader title="إدارة المجموعات والفصول" description="عرض وإدارة المجموعات الدراسية"
        breadcrumbs={[{ label: "لوحة التحكم", href: "/teacher" }, { label: "المجموعات" }]}
        actions={<Button variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowAdd(true)}>إضافة مجموعة</Button>}
      />

      {loading ? <StatsSkeleton /> : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatsCard title="إجمالي المجموعات" value={stats.totalGroups} icon={HiOutlineUserGroup} color="primary" />
          <StatsCard title="إجمالي الطلاب" value={stats.totalStudents} icon={HiOutlineUsers} color="success" />
          <StatsCard title="قائمة الانتظار" value={stats.waitingCount} icon={HiOutlineClock} color="warning" />
          <StatsCard title="المجمدون" value={stats.frozenCount} icon={HiOutlinePause} color="error" />
        </motion.div>
      )}

      <Tabs tabs={tabs}>
        {(activeTab) => (
          <>
            <TabPanel id="groups" activeTab={activeTab}>
              <div className="space-y-4">
                <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1) }} placeholder="بحث عن مجموعة..." />
                {loading ? <CardSkeleton count={3} /> : paginatedGroups.length === 0 ? (
                  <EmptyState icon={HiOutlineUserGroup} title="لا توجد مجموعات" description={search ? "لا توجد نتائج للبحث" : "لم يتم إضافة أي مجموعات بعد"} actionLabel="إضافة مجموعة" onAction={() => setShowAdd(true)} />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {paginatedGroups.map((group, i) => (
                      <motion.div key={group.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                        <div className="bg-card border border-border rounded-[24px] p-6  hover:-translate-y-0.5 hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)] transition-all duration-250 h-full">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-text">{group.name}</h3>
                              <p className="text-xs text-text-secondary mt-0.5">{group.courseName}</p>
                            </div>
                            <Badge variant={statusVariant[group.status]} size="sm">{group.status === "active" ? "نشط" : group.status === "completed" ? "مكتمل" : "غير نشط"}</Badge>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-text-secondary">السعة</span>
                                <span className="text-text font-medium">{group.enrolledCount}/{group.capacity}</span>
                              </div>
                              <Progress value={group.enrolledCount} max={group.capacity} color={group.enrolledCount >= group.capacity ? "warning" : "primary"} size="sm" />
                            </div>
                            <div className="flex items-center gap-3 text-xs text-text-secondary">
                              <HiOutlineClock className="w-3.5 h-3.5 shrink-0" />
                              <span>{group.schedule.map((s, i) => `${dayMap[s.day]} ${s.startTime}-${s.endTime}${i < group.schedule.length - 1 ? " - " : ""}`)}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-text-secondary">
                              <HiOutlineAcademicCap className="w-3.5 h-3.5 shrink-0" />
                              <span>{group.classroom}</span>
                            </div>
                            {group.waitingCount > 0 && (
                              <div className="flex items-center gap-1.5 text-xs text-warning">
                                <HiOutlineClock className="w-3.5 h-3.5" />
                                <span>{group.waitingCount} طالب في الانتظار</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-5 pt-5 border-t border-border">
                            <Link href={`/teacher/groups/${group.id}`}>
                              <Button variant="primary" size="sm" leftIcon={<HiOutlineEye className="w-4 h-4" />}>عرض المجموعة</Button>
                            </Link>
                            {group.waitingCount > 0 && (
                              <Button variant="secondary" size="sm" leftIcon={<HiOutlineClock className="w-4 h-4" />}>قائمة الانتظار</Button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="p-2 rounded-[12px] hover:bg-card/60 disabled:opacity-30 disabled:cursor-not-allowed text-text-secondary transition-all">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <span className="text-sm text-text-secondary">{page} / {totalPages}</span>
                    <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="p-2 rounded-[12px] hover:bg-card/60 disabled:opacity-30 disabled:cursor-not-allowed text-text-secondary transition-all">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                )}
              </div>
            </TabPanel>

            <TabPanel id="waiting" activeTab={activeTab}>
              {loading ? (
                <div className="space-y-3">{[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-14 bg-card rounded-[16px] animate-pulse" />)}</div>
              ) : mockWaitingStudents.length === 0 ? (
                <EmptyState icon={HiOutlineClock} title="لا يوجد طلاب في الانتظار" description="قائمة الانتظار فارغة حالياً" />
              ) : (
                <div className="bg-card border border-border rounded-[24px] overflow-hidden ">
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead><tr className="border-b border-border">
                        <th className="text-right text-xs font-medium text-text-tertiary px-4 py-3.5">الطالب</th>
                        <th className="text-right text-xs font-medium text-text-tertiary px-4 py-3.5">المجموعة</th>
                        <th className="text-right text-xs font-medium text-text-tertiary px-4 py-3.5">تاريخ الانضمام</th>
                        <th className="text-right text-xs font-medium text-text-tertiary px-4 py-3.5">الأولوية</th>
                        <th className="text-right text-xs font-medium text-text-tertiary px-4 py-3.5">الحالة</th>
                        <th className="text-center text-xs font-medium text-text-tertiary px-4 py-3.5">الإجراءات</th>
                      </tr></thead>
                      <tbody>
                        {mockWaitingStudents.map((w) => (
                          <tr key={w.id} className="border-b border-border/50 hover:bg-card/40 transition-all">
                            <td className="px-4 py-3 text-sm text-text font-medium">{w.studentName}</td>
                            <td className="px-4 py-3 text-sm text-text-secondary">{w.groupName}</td>
                            <td className="px-4 py-3 text-sm text-text-secondary">{w.joinedAt.toLocaleDateString("ar-EG")}</td>
                            <td className="px-4 py-3"><Badge variant={w.priority === 1 ? "error" : w.priority === 2 ? "warning" : "info"} size="sm">{w.priority === 1 ? "عالية" : w.priority === 2 ? "متوسطة" : "منخفضة"}</Badge></td>
                            <td className="px-4 py-3"><Badge variant={w.status === "waiting" ? "warning" : w.status === "enrolled" ? "success" : w.status === "cancelled" ? "error" : "info"} size="sm">{w.status === "waiting" ? "بانتظار" : w.status === "offered" ? "تم العرض" : w.status === "enrolled" ? "مسجل" : "ملغي"}</Badge></td>
                            <td className="px-4 py-3"><div className="flex items-center justify-center gap-2"><Button variant="secondary" size="sm" leftIcon={<HiOutlineBell className="w-3.5 h-3.5" />} onClick={() => toast.success("تم إرسال الإشعار")}>إخطار</Button><Button variant="success" size="sm" leftIcon={<HiOutlinePlus className="w-3.5 h-3.5" />}>تسجيل</Button></div></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="sm:hidden space-y-3 p-5">
                    {mockWaitingStudents.map((w) => (
                      <div key={w.id} className="bg-card/40 border border-border rounded-[16px] p-5">
                        <div className="flex items-center justify-between mb-2"><span className="text-sm font-medium text-text">{w.studentName}</span><span className="text-xs text-text-secondary">{w.groupName}</span></div>
                        <div className="flex items-center gap-3 text-xs text-text-secondary"><span>{w.joinedAt.toLocaleDateString("ar-EG")}</span><Badge variant={w.priority === 1 ? "error" : w.priority === 2 ? "warning" : "info"} size="sm">{w.priority === 1 ? "عالية" : w.priority === 2 ? "متوسطة" : "منخفضة"}</Badge></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabPanel>

            <TabPanel id="freeze" activeTab={activeTab}>
              {loading ? (
                <div className="space-y-3">{[1, 2, 3, 4].map((i) => <div key={i} className="h-14 bg-card rounded-[16px] animate-pulse" />)}</div>
              ) : mockFreezeRecords.length === 0 ? (
                <EmptyState icon={HiOutlinePause} title="لا توجد سجلات تجميد" description="لا يوجد اشتراكات مجمدة حالياً" />
              ) : (
                <div className="bg-card border border-border rounded-[24px] overflow-hidden ">
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead><tr className="border-b border-border">
                        <th className="text-right text-xs font-medium text-text-tertiary px-4 py-3.5">الطالب</th>
                        <th className="text-right text-xs font-medium text-text-tertiary px-4 py-3.5">المجموعة</th>
                        <th className="text-right text-xs font-medium text-text-tertiary px-4 py-3.5">تاريخ البداية</th>
                        <th className="text-right text-xs font-medium text-text-tertiary px-4 py-3.5">تاريخ النهاية</th>
                        <th className="text-right text-xs font-medium text-text-tertiary px-4 py-3.5">السبب</th>
                        <th className="text-right text-xs font-medium text-text-tertiary px-4 py-3.5">الحالة</th>
                      </tr></thead>
                      <tbody>
                        {mockFreezeRecords.map((f) => (
                          <tr key={f.id} className="border-b border-border/50 hover:bg-card/40 transition-all">
                            <td className="px-4 py-3 text-sm text-text font-medium">{f.studentName}</td>
                            <td className="px-4 py-3 text-sm text-text-secondary">{f.groupId}</td>
                            <td className="px-4 py-3 text-sm text-text-secondary">{f.startDate.toLocaleDateString("ar-EG")}</td>
                            <td className="px-4 py-3 text-sm text-text-secondary">{f.endDate.toLocaleDateString("ar-EG")}</td>
                            <td className="px-4 py-3 text-sm text-text-secondary">{f.reason}</td>
                            <td className="px-4 py-3"><Badge variant={f.status === "active" ? "warning" : f.status === "expired" ? "default" : "info"} size="sm">{f.status === "active" ? "نشط" : f.status === "expired" ? "منتهي" : "ملغي"}</Badge></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </TabPanel>

            <TabPanel id="missed" activeTab={activeTab}>
              {loading ? (
                <div className="space-y-3">{[1, 2, 3, 4].map((i) => <div key={i} className="h-14 bg-card rounded-[16px] animate-pulse" />)}</div>
              ) : mockMissedLessons.filter(m => !m.recovered).length === 0 ? (
                <EmptyState icon={HiOutlineExclamation} title="لا توجد دروس مفقودة" description="جميع الدروس تم تعويضها" />
              ) : (
                <div className="bg-card border border-border rounded-[24px] overflow-hidden ">
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead><tr className="border-b border-border">
                        <th className="text-right text-xs font-medium text-text-tertiary px-4 py-3.5">الطالب</th>
                        <th className="text-right text-xs font-medium text-text-tertiary px-4 py-3.5">الدرس</th>
                        <th className="text-right text-xs font-medium text-text-tertiary px-4 py-3.5">التاريخ</th>
                        <th className="text-right text-xs font-medium text-text-tertiary px-4 py-3.5">الحالة</th>
                        <th className="text-center text-xs font-medium text-text-tertiary px-4 py-3.5">الإجراءات</th>
                      </tr></thead>
                      <tbody>
                        {mockMissedLessons.filter(m => !m.recovered).map((m) => (
                          <tr key={m.id} className="border-b border-border/50 hover:bg-card/40 transition-all">
                            <td className="px-4 py-3 text-sm text-text font-medium">{m.studentName}</td>
                            <td className="px-4 py-3 text-sm text-text-secondary">{m.lessonTitle}</td>
                            <td className="px-4 py-3 text-sm text-text-secondary">{m.date.toLocaleDateString("ar-EG")}</td>
                            <td className="px-4 py-3"><Badge variant="error" size="sm">مفقود</Badge></td>
                            <td className="px-4 py-3"><div className="flex justify-center"><Button variant="primary" size="sm" leftIcon={<HiOutlineRefresh className="w-3.5 h-3.5" />} onClick={() => toast.success("تم تعويض الدرس")}>تعويض</Button></div></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </TabPanel>
          </>
        )}
      </Tabs>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-card border border-border rounded-[24px] shadow-[0_24px_80px_rgba(0,0,0,0.08)] p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-text">إضافة مجموعة جديدة</h2>
              <button onClick={() => setShowAdd(false)} className="p-1.5 rounded-[12px] text-text-tertiary hover:text-text hover:bg-card transition-all">
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">اسم المجموعة</label>
                <input value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} placeholder="مثال: مجموعة A"
                  className="w-full bg-card border border-border rounded-[16px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50  focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">الكورس</label>
                <select value={addForm.courseId} onChange={(e) => setAddForm({ ...addForm, courseId: e.target.value })}
                  className="w-full bg-card border border-border rounded-[16px] px-4 py-2.5 text-sm text-text appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30 ">
                  <option value="">اختر الكورس</option>
                  {mockCourses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">السعة</label>
                  <input type="number" value={addForm.capacity} onChange={(e) => setAddForm({ ...addForm, capacity: e.target.value })}
                    className="w-full bg-card border border-border rounded-[16px] px-4 py-2.5 text-sm text-text  focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">القاعة</label>
                  <input value={addForm.classroom} onChange={(e) => setAddForm({ ...addForm, classroom: e.target.value })} placeholder="مثال: قاعة الأندلس"
                    className="w-full bg-card border border-border rounded-[16px] px-4 py-2.5 text-sm text-text placeholder-text-tertiary/50  focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                </div>
              </div>
              <div className="flex gap-4 pt-2">
                <Button variant="primary" className="flex-1" onClick={() => { toast.success(`تم إضافة المجموعة`); setShowAdd(false); setAddForm({ name: "", courseId: "", capacity: "25", classroom: "" }) }}>إضافة</Button>
                <Button variant="secondary" onClick={() => setShowAdd(false)} className="flex-1">إلغاء</Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

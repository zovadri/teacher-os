"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import toast from "react-hot-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  HiOutlineGlobeAlt,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineXCircle,
  HiOutlineRefresh,
  HiOutlineLogout,
  HiOutlineUser,
} from "react-icons/hi"
import { Monitor, Smartphone } from "lucide-react"
import { PageHeader } from "@/components/ui/PageHeader"
import { Badge } from "@/components/ui/Badge"
import { Tabs, TabPanel } from "@/components/ui/Tabs"
import { StatsCard } from "@/components/ui/StatsCard"
import Button from "@/components/ui/Button"
import { ConfirmDialog } from "@/components/ui/ConfirmDialog"
import { Skeleton, TableSkeleton, StatsSkeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { mockSessions, mockSessionStats } from "@/lib/mock/data"
import { cn, det } from "@/lib/utils"

type SessionStatus = "active" | "expired"

interface Session {
  id: string
  user: string
  role: string
  device: string
  browser: string
  ip: string
  lastActive: string
  loginDate: string
  status: SessionStatus
}

const deviceIcons: Record<string, React.ElementType> = {
  iPhone: Smartphone,
  Android: Smartphone,
  MacBook: Monitor,
  Windows: Monitor,
}

function getDeviceIcon(device: string) {
  for (const [key, Icon] of Object.entries(deviceIcons)) {
    if (device.includes(key)) return Icon
  }
  return Monitor
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [terminateConfirm, setTerminateConfirm] = useState<string | null>(null)
  const [terminateAllConfirm, setTerminateAllConfirm] = useState(false)
  const [activeTab, setActiveTab] = useState("my")
  const [refreshCount, setRefreshCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (det() > 0.95) {
        setError("فشل ظپظٹ تحميل بيانات الجلسات")
      } else {
        setSessions(mockSessions as Session[])
      }
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [refreshCount])

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshCount((c) => c + 1)
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const mySessions = useMemo(() => sessions.filter((s) => s.user === "أحمد محمد"), [sessions])

  const displayedSessions = useMemo(() => {
    return activeTab === "my" ? mySessions : sessions
  }, [activeTab, mySessions, sessions])

  const stats = useMemo(() => {
    const active = sessions.filter((s) => s.status === "active").length
    const today = sessions.filter((s) => s.loginDate.startsWith("2026-07-19")).length
    const browsers = sessions.reduce((acc: Record<string, number>, s) => {
      acc[s.browser] = (acc[s.browser] || 0) + 1
      return acc
    }, {})
    const topBrowser = Object.entries(browsers).sort(([, a], [, b]) => b - a)[0]?.[0] || "-"
    return { totalActive: active, todaySessions: today, averageDuration: mockSessionStats.averageDuration, topBrowser }
  }, [sessions])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(displayedSessions.map((s) => s.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleTerminate = useCallback((id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id))
    setSelectedIds((prev) => prev.filter((i) => i !== id))
    setTerminateConfirm(null)
    toast.success("تم إنهاء الجلسة بنجاح")
  }, [])

  const handleTerminateAll = () => {
    setSessions([])
    setSelectedIds([])
    setTerminateAllConfirm(false)
    toast.success("تم إنهاء جميع الجلسات بنجاح")
  }

  const handleRetry = () => {
    setLoading(true)
    setError(null)
    setRefreshCount((c) => c + 1)
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <PageHeader title="إدارة الجلسات" description="عرض وإدارة جلسات المستخدمين النشطة" />
        <ErrorState title="فشل تحميل الجلسات" message="حدث خطأ أثناء تحميل بيانات الجلسات. يرجى المحاولة مرة أخرى." error={error} onRetry={handleRetry} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="إدارة الجلسات"
        description="عرض وإدارة جلسات المستخدمين النشطة"
        actions={
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-text-tertiary">
              <HiOutlineRefresh className={cn("w-3.5 h-3.5", refreshCount % 2 === 0 ? "text-text-tertiary" : "text-primary")} />
              <span>تحديث تلقائي كل 30 ثانية</span>
            </div>
            {sessions.length > 0 && (
              <Button type="button"
variant="danger"
                size="sm"
                leftIcon={<HiOutlineXCircle className="w-4 h-4" />}
                onClick={() => setTerminateAllConfirm(true)}
              >
                إنهاء جميع الجلسات
              </Button>
            )}
          </div>
        }
      />

      {loading ? (
        <div className="space-y-6">
          <StatsSkeleton count={4} />
          <div className="space-y-3">
            <div className="flex gap-1 border-b border-border mb-6">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-10 w-28" />
              ))}
            </div>
            <TableSkeleton rows={6} columns={8} />
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard title="إجمالي الجلسات النشطة" value={stats.totalActive} icon={HiOutlineShieldCheck} color="success" />
            <StatsCard title="جلسات اليوم" value={stats.todaySessions} icon={HiOutlineClock} color="info" />
            <StatsCard title="متوسط مدة الجلسة" value={stats.averageDuration} icon={HiOutlineRefresh} color="primary" />
            <StatsCard title="أكثر متصفح استخداماً" value={stats.topBrowser} icon={HiOutlineGlobeAlt} color="warning" />
          </div>

          <Tabs
            tabs={[
              { id: "my", label: "جلساتي", count: mySessions.length },
              { id: "all", label: "جميع الجلسات", count: sessions.length },
            ]}
            defaultTab="my"
            onChange={setActiveTab}
          >
            {(tab) => (
              <TabPanel id={tab} activeTab={tab}>
                {displayedSessions.length === 0 ? (
                  <EmptyState
                    icon={HiOutlineLogout}
                    title={activeTab === "my" ? "لا توجد جلسات نشطة" : "لا توجد جلسات"}
                    description={activeTab === "my" ? "ليس لديك ط£ظٹ جلسات نشطة حالياً" : "لا توجد ط£ظٹ جلسات مسجلة ظپظٹ النظام"}
                  />
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm text-text-secondary">
                        تم تحديد {selectedIds.length} أنك تريد {displayedSessions.length} جلسة
                      </p>
                      {selectedIds.length > 0 && (
                        <Button type="button"
variant="outline"
                          size="sm"
                          leftIcon={<HiOutlineXCircle className="w-4 h-4" />}
                          onClick={() => setTerminateConfirm("selected")}
                        >
                          إنهاء المحدد
                        </Button>
                      )}
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-surface-secondary border-b border-border">
                            <th className="text-right px-4 py-3 w-10">
                              <input
                                type="checkbox"
                                checked={selectedIds.length === displayedSessions.length && displayedSessions.length > 0}
                                onChange={(e) => handleSelectAll(e.target.checked)}
                                className="rounded border-border text-primary focus:ring-primary/30"
                              />
                            </th>
                            <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">المستخدم</th>
                            <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">الدور</th>
                            <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">الجهاز</th>
                            <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">المتصفح</th>
                            <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">IP</th>
                            <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">آخر نشاط</th>
                            <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">تاريخ الدخول</th>
                            <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">الحالة</th>
                            <th className="text-center px-4 py-3 font-semibold text-text-secondary whitespace-nowrap w-24">الإجراء</th>
                          </tr>
                        </thead>
                        <tbody>
                          {displayedSessions.map((s, idx) => {
                            const DeviceIcon = getDeviceIcon(s.device)
                            return (
                              <motion.tr
                                key={s.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.03 }}
                                className="border-b border-border last:border-0 hover:bg-surface-secondary/50 transition-colors"
                              >
                                <td className="px-4 py-3">
                                  <input
                                    type="checkbox"
                                    checked={selectedIds.includes(s.id)}
                                    onChange={() => handleSelectOne(s.id)}
                                    className="rounded border-border text-primary focus:ring-primary/30"
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                      <HiOutlineUser className="w-4 h-4 text-primary" />
                                    </div>
                                    <Link href={`/teacher/students/${encodeURIComponent(s.user)}`} className="text-sm font-medium text-text hover:text-primary transition-colors">{s.user}</Link>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-text-secondary">{s.role}</td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                                    <DeviceIcon className="w-3.5 h-3.5" />
                                    {s.device}
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-text-secondary">{s.browser}</td>
                                <td className="px-4 py-3">
                                  <code className="text-xs bg-surface-secondary px-2 py-0.5 rounded text-text-tertiary" dir="ltr">{s.ip}</code>
                                </td>
                                <td className="px-4 py-3 text-sm text-text-secondary">{s.lastActive}</td>
                                <td className="px-4 py-3 text-sm text-text-secondary">{s.loginDate}</td>
                                <td className="px-4 py-3">
                                  <Badge variant={s.status === "active" ? "success" : "neutral"} size="sm" dot>
                                    {s.status === "active" ? "نشط" : "منتهي"}
                                  </Badge>
                                </td>
                                <td className="px-4 py-3 text-center">
                                  {s.status === "active" && (
                                    <Button type="button"
variant="ghost"
                                      size="xs"
                                      leftIcon={<HiOutlineXCircle className="w-3.5 h-3.5" />}
                                      className="text-error hover:text-error"
                                      onClick={() => setTerminateConfirm(s.id)}
                                    >
                                      إنهاء
                                    </Button>
                                  )}
                                </td>
                              </motion.tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </TabPanel>
            )}
          </Tabs>
        </>
      )}

      <ConfirmDialog
        isOpen={!!terminateConfirm && terminateConfirm !== "selected"}
        onClose={() => setTerminateConfirm(null)}
        onConfirm={() => handleTerminate(terminateConfirm!)}
        title="إنهاء الجلسة"
        message="هل أنت متأكد أنك تريد إنهاء هذه الجلسة؟ سيتم تسجيل خروج المستخدم فوراً."
        confirmText="إنهاء الجلسة"
        cancelText="إلغاء"
        variant="danger"
      />

      <ConfirmDialog
        isOpen={terminateConfirm === "selected"}
        onClose={() => setTerminateConfirm(null)}
        onConfirm={() => { setSessions((prev) => prev.filter((s) => !selectedIds.includes(s.id))); setSelectedIds([]); setTerminateConfirm(null); toast.success("تم إنهاء الجلسات المحددة بنجاح") }}
        title="إنهاء الجلسات المحددة"
        message={`هل أنت متأكد أنك تريد إنهاء ${selectedIds.length} جلسة محددة؟ سيتم تسجيل خروج المستخدمين فوراً.`}
        confirmText="إنهاء الكل"
        cancelText="إلغاء"
        variant="danger"
      />

      <ConfirmDialog
        isOpen={terminateAllConfirm}
        onClose={() => setTerminateAllConfirm(false)}
        onConfirm={handleTerminateAll}
        title="إنهاء جميع الجلسات"
        message="هل أنت متأكد أنك تريد إنهاء جميع الجلسات؟ سيتم تسجيل خروج جميع المستخدمين فوراً."
        confirmText="إنهاء الكل"
        cancelText="إلغاء"
        variant="danger"
      />
    </div>
  )
}

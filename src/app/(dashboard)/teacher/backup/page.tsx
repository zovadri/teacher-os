"use client"

import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineCloudUpload, HiOutlineDocumentDownload, HiOutlineRefresh,
  HiOutlineTrash, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineCog,
  HiOutlineExclamation, HiOutlineDatabase, HiOutlineArchive,
  HiOutlineClock, HiOutlineTrash as HiOutlineDeletePermanent,
} from "react-icons/hi"
import toast from "react-hot-toast"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import { Alert } from "@/components/ui/Alert"
import { Modal } from "@/components/ui/Modal"
import { Tabs, TabPanel } from "@/components/ui/Tabs"
import { ConfirmDialog } from "@/components/ui/ConfirmDialog"
import { EmptyState } from "@/components/ui/EmptyState"
import { CardSkeleton } from "@/components/ui/Skeleton"
import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select"
import { mockBackupHistory, mockRecycleBin } from "@/lib/mock/data"
import { cn, formatDate, det } from "@/lib/utils"

const statusBadge: Record<string, "success" | "error" | "warning"> = {
  completed: "success",
  failed: "error",
  in_progress: "warning",
}

const typeBadge: Record<string, "primary" | "info"> = {
  full: "primary",
  incremental: "info",
}

export default function BackupPage() {
  const [backups, setBackups] = useState(mockBackupHistory)
  const [recycleItems, setRecycleItems] = useState(mockRecycleBin)
  const [isBackingUp, setIsBackingUp] = useState(false)
  const [backupProgress, setBackupProgress] = useState(0)
  const [showRestoreModal, setShowRestoreModal] = useState(false)
  const [selectedBackup, setSelectedBackup] = useState<typeof backups[0] | null>(null)
  const [autoBackup, setAutoBackup] = useState(true)
  const [autoFrequency, setAutoFrequency] = useState("weekly")
  const [backupDone, setBackupDone] = useState(false)
  const [activeTab, setActiveTab] = useState("backups")
  const [confirmRestore, setConfirmRestore] = useState<{ open: boolean; item: typeof recycleItems[0] | null }>({ open: false, item: null })
  const [confirmDelete, setConfirmDelete] = useState<{ open: boolean; item: typeof recycleItems[0] | null }>({ open: false, item: null })
  const [isLoading, setIsLoading] = useState(false)

  const startBackup = () => {
    setIsBackingUp(true)
    setBackupProgress(0)
    setBackupDone(false)
    const interval = setInterval(() => {
      setBackupProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsBackingUp(false)
          setBackupDone(true)
          const newBackup = {
            id: `bck-${Date.now()}`,
            fileName: `backup-${new Date().toISOString().split("T")[0]}.zip`,
            size: `${(det() * 100 + 200).toFixed(0)} MB`,
            createdAt: new Date(),
            type: "full" as const,
            status: "completed" as const,
          }
          setBackups((prev) => [newBackup, ...prev])
          setTimeout(() => setBackupDone(false), 3000)
          return 100
        }
        return prev + det() * 15 + 5
      })
    }, 300)
  }

  const lastBackup = backups[0]

  const handleRestoreItem = () => {
    if (!confirmRestore.item) return
    setRecycleItems((prev) => prev.filter((i) => i.id !== confirmRestore.item!.id))
    toast.success(`تم استعادة "${confirmRestore.item.name}" بنجاح`)
    setConfirmRestore({ open: false, item: null })
  }

  const handlePermanentDelete = () => {
    if (!confirmDelete.item) return
    setRecycleItems((prev) => prev.filter((i) => i.id !== confirmDelete.item!.id))
    toast.success(`تم حذف "${confirmDelete.item.name}" بشكل نهائي`)
    setConfirmDelete({ open: false, item: null })
  }

  const recycleStats = useMemo(() => ({
    total: recycleItems.length,
    students: recycleItems.filter((i) => i.type === "طالب").length,
    courses: recycleItems.filter((i) => i.type === "كورس").length,
  }), [recycleItems])

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <PageHeader title="النسخ الاحتياطي" description="إدارة النسخ الاحتياطية وسلة المحذوفات" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <HiOutlineDatabase className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">آخر نسخة احتياطية</p>
              <p className="font-bold text-text">{lastBackup ? formatDate(lastBackup.createdAt) : "لا توجد"}</p>
              <p className="text-xs text-text-tertiary">{lastBackup?.size}  |  {lastBackup?.type === "full" ? "كاملة" : "تزايدية"}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-success-100 dark:bg-success-900/30 flex items-center justify-center">
              <HiOutlineArchive className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">إجمالي النسخ</p>
              <p className="font-bold text-text">{backups.length}</p>
              <p className="text-xs text-text-tertiary">{backups.filter((b) => b.type === "full").length} كاملة  |  {backups.filter((b) => b.type === "incremental").length} تزايدية</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-warning-100 dark:bg-warning-900/30 flex items-center justify-center">
              <HiOutlineTrash className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">سلة المحذوفات</p>
              <p className="font-bold text-text">{recycleStats.total} عنصر</p>
              <p className="text-xs text-text-tertiary">{recycleStats.students} طالب  |  {recycleStats.courses} كورس</p>
            </div>
          </div>
        </Card>
      </motion.div>

      <Tabs
        tabs={[
          { id: "backups", label: "النسخ الاحتياطية", icon: <HiOutlineArchive className="w-4 h-4" />, count: backups.length },
          { id: "recycle", label: "سلة المحذوفات", icon: <HiOutlineTrash className="w-4 h-4" />, count: recycleStats.total },
        ]}
        defaultTab="backups"
        onChange={setActiveTab}
      >
        {(activeTab) => (
          <>
            <TabPanel id="backups" activeTab={activeTab}>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <Button type="button"
variant="primary" size="lg"
                    leftIcon={isBackingUp ? undefined : <HiOutlineCloudUpload className="w-5 h-5" />}
                    isLoading={isBackingUp}
                    onClick={startBackup}
                    disabled={isBackingUp}
                    className="min-w-[200px]"
                  >
                    {isBackingUp ? "جاري إنشاء النسخة..." : backupDone ? "تم الإنشاء!" : "إنشاء نسخة احتياطية الآن"}
                  </Button>
                  {isBackingUp && (
                    <div className="flex-1 max-w-xs">
                      <Progress value={Math.round(backupProgress)} size="lg" variant="primary" showLabel />
                    </div>
                  )}
                  {backupDone && (
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-1.5 text-success text-sm font-medium">
                      <HiOutlineCheckCircle className="w-4 h-4" />
                      تم إنشاء النسخة الاحتياطية بنجاح
                    </motion.div>
                  )}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>سجل النسخ الاحتياطية</CardTitle>
                    <CardDescription>جميع النسخ الاحتياطية التي تم إنشاؤها</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-right px-3 py-3 font-semibold text-text-secondary">اسم الملف</th>
                            <th className="text-right px-3 py-3 font-semibold text-text-secondary">الحجم</th>
                            <th className="text-right px-3 py-3 font-semibold text-text-secondary">التاريخ</th>
                            <th className="text-right px-3 py-3 font-semibold text-text-secondary">النوع</th>
                            <th className="text-right px-3 py-3 font-semibold text-text-secondary">الحالة</th>
                            <th className="text-right px-3 py-3 font-semibold text-text-secondary"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {backups.map((b) => (
                            <tr key={b.id} className="border-b border-border last:border-0 hover:bg-surface-secondary transition-colors">
                              <td className="px-3 py-3">
                                <div className="flex items-center gap-2">
                                  <HiOutlineDocumentDownload className="w-4 h-4 text-text-tertiary" />
                                  <span className="font-medium text-text">{b.fileName}</span>
                                </div>
                              </td>
                              <td className="px-3 py-3 text-text-secondary">{b.size}</td>
                              <td className="px-3 py-3 text-text-secondary">{formatDate(b.createdAt)}</td>
                              <td className="px-3 py-3">
                                <Badge variant={typeBadge[b.type]} size="sm">{b.type === "full" ? "كاملة" : "تزايدية"}</Badge>
                              </td>
                              <td className="px-3 py-3">
                                <Badge variant={statusBadge[b.status]} size="sm" dot>
                                  {b.status === "completed" ? "ناجحة" : b.status === "failed" ? "فاشلة" : "قيد التشغيل"}
                                </Badge>
                              </td>
                              <td className="px-3 py-3">
                                <div className="flex items-center gap-1">
                                  <button type="button" onClick={() => { setSelectedBackup(b); setShowRestoreModal(true) }}
                                    className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="استعادة">
                                    <HiOutlineRefresh className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <HiOutlineCog className="w-5 h-5 text-primary" />
                      <CardTitle>إعدادات النسخ الاحتياطي التلقائي</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-text">النسخ الاحتياطي التلقائي</p>
                        <p className="text-xs text-text-tertiary">إنشاء نسخة احتياطية تلقائياً حسب الجدول الزمني</p>
                      </div>
                      <button type="button" onClick={() => setAutoBackup(!autoBackup)}
                        className={cn("w-12 h-6 rounded-full transition-colors relative", autoBackup ? "bg-primary" : "bg-surface-tertiary")}>
                        <span className={cn("absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform", autoBackup ? "translate-x-6" : "translate-x-0.5")} />
                      </button>
                    </div>
                    {autoBackup && (
                      <Select label="الدورية" options={[
                        { value: "daily", label: "يومي" },
                        { value: "weekly", label: "أسبوعي" },
                        { value: "monthly", label: "شهري" },
                      ]} value={autoFrequency} onChange={(e) => setAutoFrequency(e.target.value)} />
                    )}
                  </CardContent>
                </Card>

                <Alert variant="warning" title="تنبيه مهم">
                  <p>النسخ الاحتياطية تخزن على سيرفر المنصة. يوصى دائماً بالاحتفاظ بنسخة احتياطية خارجية إضافية.</p>
                </Alert>

                <Modal isOpen={showRestoreModal} onClose={() => setShowRestoreModal(false)} title="استعادة نسخة احتياطية" size="md">
                  {selectedBackup && (
                    <div className="space-y-4">
                      <Alert variant="error"><p>تحذير: استعادة النسخة الاحتياطية ستحل محل جميع البيانات الحالية. لا يمكن التراجع عن هذا الإجراء.</p></Alert>
                      <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                        <div className="flex items-center gap-3">
                          <HiOutlineDocumentDownload className="w-8 h-8 text-text-tertiary" />
                          <div>
                            <p className="font-medium text-text">{selectedBackup.fileName}</p>
                            <p className="text-xs text-text-tertiary">{selectedBackup.size}  |  {formatDate(selectedBackup.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <Button variant="danger" className="flex-1" leftIcon={<HiOutlineExclamation className="w-4 h-4" />}>تأكيد الاستعادة</Button>
                        <Button variant="secondary" onClick={() => setShowRestoreModal(false)}>إلغاء</Button>
                      </div>
                    </div>
                  )}
                </Modal>
              </div>
            </TabPanel>

            <TabPanel id="recycle" activeTab={activeTab}>
              <div className="space-y-4">
                {isLoading ? (
                  <CardSkeleton count={3} />
                ) : recycleItems.length === 0 ? (
                  <EmptyState icon={HiOutlineTrash} title="سلة المحذوفات فارغة" description="لا توجد عناصر محذوفة حالياً" />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-surface-secondary">
                          <th className="text-right px-4 py-3 font-semibold text-text-secondary">العنوان</th>
                          <th className="text-right px-4 py-3 font-semibold text-text-secondary">النوع</th>
                          <th className="text-right px-4 py-3 font-semibold text-text-secondary">المحذوف بواسطة</th>
                          <th className="text-right px-4 py-3 font-semibold text-text-secondary">تاريخ الحذف</th>
                          <th className="text-right px-4 py-3 font-semibold text-text-secondary">تاريخ الانتهاء</th>
                          <th className="text-right px-4 py-3 font-semibold text-text-secondary"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {recycleItems.map((item) => (
                          <tr key={item.id} className="border-b border-border last:border-0 hover:bg-surface-secondary transition-colors">
                            <td className="px-4 py-3">
                              <span className="font-medium text-text">{item.name}</span>
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant="default" size="sm">{item.type}</Badge>
                            </td>
                            <td className="px-4 py-3 text-text-secondary">{item.deletedBy}</td>
                            <td className="px-4 py-3 text-text-tertiary text-xs">{formatDate(item.deletedAt)}</td>
                            <td className="px-4 py-3 text-text-tertiary text-xs">{formatDate(item.expiresAt)}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1">
                                <button type="button" onClick={() => setConfirmRestore({ open: true, item })}
                                  className="p-1.5 text-text-tertiary hover:text-success hover:bg-success/5 rounded-lg transition-colors" title="استعادة">
                                  <HiOutlineDatabase className="w-4 h-4" />
                                </button>
                                <button type="button" onClick={() => setConfirmDelete({ open: true, item })}
                                  className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors" title="حذف نهائي">
                                  <HiOutlineDeletePermanent className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </TabPanel>
          </>
        )}
      </Tabs>

      <ConfirmDialog
        isOpen={confirmRestore.open}
        onClose={() => setConfirmRestore({ open: false, item: null })}
        onConfirm={handleRestoreItem}
        title="تأكيد الاستعادة"
        message={`هل أنت متأكد أنك تريد استعادة "${confirmRestore.item?.name}"؟`}
        confirmText="استعادة"
        cancelText="إلغاء"
        variant="info"
      />

      <ConfirmDialog
        isOpen={confirmDelete.open}
        onClose={() => setConfirmDelete({ open: false, item: null })}
        onConfirm={handlePermanentDelete}
        title="تأكيد الحذف النهائي"
        message={`هل أنت متأكد أنك تريد حذف "${confirmDelete.item?.name}" بشكل نهائي؟ لا يمكن التراجع عن هذا الإجراء.`}
        confirmText="حذف نهائي"
        cancelText="إلغاء"
        variant="danger"
      />
    </div>
  )
}

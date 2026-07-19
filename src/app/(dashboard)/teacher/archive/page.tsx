"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineArchive,
  HiOutlineUserGroup,
  HiOutlineBookOpen,
  HiOutlineAcademicCap,
  HiOutlineDocumentText,
  HiOutlineMail,
  HiOutlineSearch,
  HiOutlineRefresh,
  HiOutlineDatabase,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineSwitchHorizontal,
  HiOutlineFilter,
  HiOutlineX,
} from "react-icons/hi"
import { Archive, RotateCcw, Inbox } from "lucide-react"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Badge } from "@/components/ui/Badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Table } from "@/components/ui/Table"
import { Modal } from "@/components/ui/Modal"
import { SearchInput } from "@/components/ui/SearchInput"
import { EmptyState } from "@/components/ui/EmptyState"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { useNotificationStore } from "@/lib/notification-store"
import { cn, formatDate, det } from "@/lib/utils"

type ArchiveTab = "students" | "courses" | "exams" | "invoices" | "messages"

interface ArchiveItem {
  id: string
  name: string
  identifier: string
  archivedDate: Date
  archivedBy: string
  size: string
  reason: string
}

const tabConfig: { id: ArchiveTab; label: string; icon: React.ReactNode }[] = [
  { id: "students", label: "الطلاب", icon: <HiOutlineUserGroup className="w-4 h-4" /> },
  { id: "courses", label: "الكورسات", icon: <HiOutlineBookOpen className="w-4 h-4" /> },
  { id: "exams", label: "الامتحانات", icon: <HiOutlineAcademicCap className="w-4 h-4" /> },
  { id: "invoices", label: "الفواتير", icon: <HiOutlineDocumentText className="w-4 h-4" /> },
  { id: "messages", label: "الرسائل", icon: <HiOutlineMail className="w-4 h-4" /> },
]

const names: Record<ArchiveTab, string[]> = {
  students: [
    "أحمد خالد عبد الله",
    "مروان سامي عادل",
    "ليلى محمد حسن",
    "نور عبد الرحمن علي",
    "يوسف عمرو إبراهيم",
    "سارة أحمد محمود",
    "عمر هاني عثمان",
    "دينا وليد كمال",
    "خالد مصطفى شريف",
    "ريم جمال الدين",
  ],
  courses: [
    "النحو المتقدم - ترم ثان",
    "البلاغة للنظام الحديث",
    "النصوص الأدبية ثانية ثانوي",
    "قواعد الإملاء والخط",
    "التعبير الإبداعي",
    "المراجعة النهائية الشاملة",
    "النحو التطبيقي",
    "فقه اللغة العربية",
    "الأدب الحديث والمعاصر",
    "النقد الأدبي",
  ],
  exams: [
    "اختبار النحو الشهري - مارس",
    "امتحان البلاغة منتصف الترم",
    "اختبار النصوص الأدبية",
    "امتحان التعبير النهائي",
    "اختبار الإملاء التقييمي",
    "امتحان المراجعة الأولى",
    "اختبار الفصل الدراسي الأول",
    "امتحان تجريبي 3",
    "اختبار التقييم الأسبوعي",
    "امتحان نهاية الترم",
  ],
  invoices: [
    "فاتورة اشتراك أحمد خالد",
    "فاتورة تجديد ليلى محمد",
    "فاتورة كورس النحو ليوسف",
    "فاتورة باقة عمر السنوية",
    "فاتورة اشتراك دينا وليد",
    "فاتورة كورس البلاغة لنور",
    "فاتورة تجديد مروان سامي",
    "فاتورة باقة سارة الثلاثية",
    "فاتورة اشتراك خالد مصطفى",
    "فاتورة كورس التعبير لريم",
  ],
  messages: [
    "استفسار عن نتيجة الامتحان",
    "طلب تأجيل واجب النحو",
    "شكوى من محتوى الفيديو",
    "استفسار عن موعد المحاضرة",
    "طلب مراجعة الدرس الثالث",
    "شكر وتقدير للمدرس",
    "مشكلة في تسجيل الدخول",
    "طلب إعادة تصحيح الامتحان",
    "استفسار عن جدول الامتحانات",
    "طلب تحويل مجموعة",
  ],
}

const staffNames = [
  "أحمد محمد (مدير النظام)",
  "نورا حسن (دعم فني)",
  "محمد علي (مشرف)",
  "سامي عبد الله (محاسب)",
  "هند مصطفى (مشرف محتوى)",
]

const reasons = [
  "غير نشط لمدة 6 أشهر",
  "انتهاء الاشتراك",
  "طلب حذف الحساب",
  "بيانات مكررة",
  "انتهاء دورة الكورس",
  "طلب المعلم",
  "تجاوز المدة القانونية",
  "إلغاء الاشتراك",
]

function generateArchiveData(tab: ArchiveTab): ArchiveItem[] {
  const items: ArchiveItem[] = []
  const count = Math.floor(det() * 3) + 8
  const tabNames = names[tab]
  for (let i = 0; i < count; i++) {
    const day = Math.floor(det() * 28) + 1
    const month = Math.floor(det() * 6) + 1
    const year = Math.floor(det() * 2) + 2024
    items.push({
      id: `arch-${tab}-${i + 1}`,
      name: tabNames[i % tabNames.length],
      identifier: tab === "students" ? `STU-${String(i + 1).padStart(4, "0")}`
        : tab === "courses" ? `CRS-${String(i + 1).padStart(4, "0")}`
        : tab === "exams" ? `EXM-${String(i + 1).padStart(4, "0")}`
        : tab === "invoices" ? `INV-${String(i + 1).padStart(4, "0")}`
        : `MSG-${String(i + 1).padStart(4, "0")}`,
      archivedDate: new Date(year, month - 1, day),
      archivedBy: staffNames[i % staffNames.length],
      size: tab === "messages" ? `${Math.floor(det() * 50) + 5} كيلوبايت`
        : tab === "exams" ? `${Math.floor(det() * 10) + 5} أسئلة`
        : tab === "invoices" ? `${Math.floor(det() * 2000) + 500} ر.س`
        : `${Math.floor(det() * 500) + 50} ميجابايت`,
      reason: reasons[i % reasons.length],
    })
  }
  return items.sort((a, b) => b.archivedDate.getTime() - a.archivedDate.getTime())
}

const allArchiveData: Record<ArchiveTab, ArchiveItem[]> = {
  students: generateArchiveData("students"),
  courses: generateArchiveData("courses"),
  exams: generateArchiveData("exams"),
  invoices: generateArchiveData("invoices"),
  messages: generateArchiveData("messages"),
}

const autoArchiveRules = [
  { label: "أرشفة تلقائية للطلاب غير النشطين", value: "6 أشهر", icon: HiOutlineUserGroup },
  { label: "أرشفة الكورسات المنتهية", value: "شهر بعد الانتهاء", icon: HiOutlineBookOpen },
  { label: "أرشفة الامتحانات القديمة", value: "سنة واحدة", icon: HiOutlineAcademicCap },
  { label: "أرشفة الفواتير المدفوعة قديماً", value: "سنتان", icon: HiOutlineDocumentText },
  { label: "أرشفة الرسالة المقروءة", value: "3 أشهر", icon: HiOutlineMail },
]

const monthNames = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
]

export default function ArchivePage() {
  const [activeTab, setActiveTab] = useState<ArchiveTab>("students")
  const [searchQuery, setSearchQuery] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [showDateFilter, setShowDateFilter] = useState(false)
  const [restoreTarget, setRestoreTarget] = useState<ArchiveItem | null>(null)
  const [restoreTab, setRestoreTab] = useState<ArchiveTab>("students")
  const [showSettings, setShowSettings] = useState(false)
  const { addToast } = useNotificationStore()

  const archivedThisMonth = useMemo(() => {
    const now = new Date()
    let count = 0
    for (const tab of Object.values(allArchiveData)) {
      for (const item of tab) {
        if (
          item.archivedDate.getMonth() === now.getMonth() &&
          item.archivedDate.getFullYear() === now.getFullYear()
        ) {
          count++
        }
      }
    }
    return count
  }, [])

  const totalArchived = useMemo(() => {
    let count = 0
    for (const tab of Object.values(allArchiveData)) {
      count += tab.length
    }
    return count
  }, [])

  const currentData = useMemo(() => {
    const data = allArchiveData[activeTab]
    let filtered = data
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.identifier.toLowerCase().includes(q) ||
          item.archivedBy.toLowerCase().includes(q) ||
          item.reason.toLowerCase().includes(q)
      )
    }
    if (dateFrom) {
      const from = new Date(dateFrom)
      filtered = filtered.filter((item) => item.archivedDate >= from)
    }
    if (dateTo) {
      const to = new Date(dateTo)
      to.setHours(23, 59, 59, 999)
      filtered = filtered.filter((item) => item.archivedDate <= to)
    }
    return filtered
  }, [activeTab, searchQuery, dateFrom, dateTo])

  const handleRestore = () => {
    if (!restoreTarget) return
    addToast({
      type: "success",
      title: "تمت الاستعادة بنجاح",
      message: `تمت استعادة "${restoreTarget.name}" من الأرشيف`,
    })
    setRestoreTarget(null)
  }

  const columns = [
    {
      key: "name",
      header: "الاسم / المعرف",
      render: (item: ArchiveItem) => (
        <div>
          <p className="font-medium text-text">{item.name}</p>
          <p className="text-xs text-text-tertiary mt-0.5">{item.identifier}</p>
        </div>
      ),
    },
    {
      key: "archivedDate",
      header: "تاريخ الأرشفة",
      render: (item: ArchiveItem) => (
        <span className="text-sm text-text-secondary">{formatDate(item.archivedDate)}</span>
      ),
    },
    {
      key: "archivedBy",
      header: "بواسطة",
      render: (item: ArchiveItem) => (
        <span className="text-sm text-text-secondary">{item.archivedBy}</span>
      ),
    },
    {
      key: "size",
      header: activeTab === "exams" ? "عدد الأسئلة" : activeTab === "invoices" ? "المبلغ" : "الحجم",
      render: (item: ArchiveItem) => (
        <Badge variant="neutral" size="sm">{item.size}</Badge>
      ),
    },
    {
      key: "reason",
      header: "سبب الأرشفة",
      render: (item: ArchiveItem) => (
        <Badge variant="info" size="sm">{item.reason}</Badge>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (item: ArchiveItem) => (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="xs"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={() => {
              setRestoreTab(activeTab)
              setRestoreTarget(item)
            }}
          >
            استعادة
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="مركز الأرشيف" subtitle="إدارة العناصر المؤرشفة واستعادتها" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatsCard
          title="إجمالي المؤرشف"
          value={totalArchived}
          icon={HiOutlineArchive}
          color="primary"
          delay={0}
        />
        <StatsCard
          title="مؤرشف هذا الشهر"
          value={archivedThisMonth}
          icon={HiOutlineCalendar}
          color="warning"
          delay={0.1}
        />
        <StatsCard
          title="تمت الاستعادة"
          value={Math.floor(det() * 30) + 15}
          icon={HiOutlineRefresh}
          color="success"
          delay={0.2}
        />
        <StatsCard
          title="المساحة المستخدمة"
          value={`${Math.floor(det() * 8) + 4} جيجابايت`}
          icon={HiOutlineDatabase}
          color="info"
          delay={0.3}
        />
      </motion.div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {tabConfig.map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                    activeTab === tab.id
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "text-text-secondary hover:bg-surface-secondary hover:text-text"
                  )}
                >
                  {tab.icon}
                  {tab.label}
                  <span
                    className={cn(
                      "text-xs px-1.5 py-0.5 rounded-full",
                      activeTab === tab.id
                        ? "bg-white/20 text-white"
                        : "bg-surface-tertiary text-text-tertiary"
                    )}
                  >
                    {allArchiveData[tab.id].length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative flex-1 w-full">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="بحث في العناصر المؤرشفة..."
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowDateFilter(!showDateFilter)}
                className={cn(
                  "flex items-center gap-2 p-2.5 rounded-xl border transition-all duration-200",
                  showDateFilter
                    ? "border-primary bg-primary-50 dark:bg-primary-900/20 text-primary"
                    : "border-border text-text-secondary hover:bg-surface-secondary"
                )}
              >
                <HiOutlineFilter className="w-4 h-4" />
                <span className="text-sm">تصفية بالتاريخ</span>
              </button>
              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-border text-text-secondary hover:bg-surface-secondary transition-all duration-200"
              >
                <HiOutlineShieldCheck className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">إعدادات الأرشفة</span>
              </button>
            </div>
          </div>

          {showDateFilter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-surface-secondary rounded-xl border border-border"
            >
              <div className="flex items-center gap-2">
                <HiOutlineCalendar className="w-4 h-4 text-text-tertiary" />
                <span className="text-sm text-text-secondary">من:</span>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="bg-surface border border-border rounded-lg px-3 py-1.5 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineCalendar className="w-4 h-4 text-text-tertiary" />
                <span className="text-sm text-text-secondary">إلى:</span>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="bg-surface border border-border rounded-lg px-3 py-1.5 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              {(dateFrom || dateTo) && (
                <button
                  type="button"
                  onClick={() => { setDateFrom(""); setDateTo("") }}
                  className="flex items-center gap-1 text-sm text-error hover:text-red-400 transition-colors"
                >
                  <HiOutlineX className="w-4 h-4" />
                  مسح التصفية
                </button>
              )}
            </motion.div>
          )}

          {currentData.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="لا توجد عناصر مؤرشفة"
              description={searchQuery || dateFrom || dateTo ? "لا توجد نتائج تطابق معايير البحث" : `لا توجد عناصر مؤرشفة في قسم ${tabConfig.find((t) => t.id === activeTab)?.label}`}
              withBackground={false}
              className="py-12"
            />
          ) : (
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-secondary border-b border-border">
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">
                      الاسم / المعرف
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">
                      تاريخ الأرشفة
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">
                      بواسطة
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">
                      {activeTab === "exams" ? "عدد الأسئلة" : activeTab === "invoices" ? "المبلغ" : "الحجم"}
                    </th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary whitespace-nowrap">
                      سبب الأرشفة
                    </th>
                    <th className="px-4 py-3 font-semibold text-text-secondary whitespace-nowrap w-24" />
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item, idx) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.03 }}
                      className="border-b border-border last:border-0 hover:bg-surface-secondary/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-text">{item.name}</p>
                          <p className="text-xs text-text-tertiary mt-0.5">{item.identifier}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <HiOutlineClock className="w-3.5 h-3.5 text-text-tertiary" />
                          <span className="text-sm text-text-secondary">{formatDate(item.archivedDate)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-text-secondary">{item.archivedBy}</span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="neutral" size="sm">{item.size}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="info" size="sm">{item.reason}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setRestoreTab(activeTab)
                              setRestoreTarget(item)
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border-2 border-primary text-primary hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            استعادة
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <HiOutlineShieldCheck className="w-5 h-5 text-primary" />
                قواعد الأرشفة التلقائية
              </div>
            </CardTitle>
            <Badge variant="primary" size="sm" dot>نشط</Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {autoArchiveRules.map((rule, idx) => (
                <motion.div
                  key={rule.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-surface-secondary border border-border hover:shadow-sm transition-shadow"
                >
                  <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary shrink-0">
                    <rule.icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text">{rule.label}</p>
                    <p className="text-xs text-text-tertiary mt-1">بعد {rule.value}</p>
                  </div>
                  <div className="mr-auto">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-9 h-5 bg-surface-tertiary rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-[-16px]" />
                    </label>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl bg-warning/10 border border-warning/20 text-xs text-warning flex items-center gap-2">
              <HiOutlineSwitchHorizontal className="w-4 h-4 shrink-0" />
              سيتم تطبيق قواعد الأرشفة التلقائية في منتصف كل شهر وفقاً للإعدادات أعلاه
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Modal
        isOpen={restoreTarget !== null}
        onClose={() => setRestoreTarget(null)}
        title="تأكيد استعادة العنصر"
        subtitle={`${tabConfig.find((t) => t.id === restoreTab)?.label} - ${restoreTarget?.name || ""}`}
        size="sm"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-surface-secondary border border-border">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">الاسم:</span>
                <span className="font-medium text-text">{restoreTarget?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">المعرف:</span>
                <span className="font-medium text-text">{restoreTarget?.identifier}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">تاريخ الأرشفة:</span>
                <span className="font-medium text-text">
                  {restoreTarget ? formatDate(restoreTarget.archivedDate) : ""}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">سبب الأرشفة:</span>
                <span className="font-medium text-text">{restoreTarget?.reason}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-text-secondary">
            سيتم استعادة هذا العنصر من الأرشيف وإعادته إلى حالته النشطة. هل أنت متأكد من المتابعة؟
          </p>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestore}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-primary text-white hover:bg-primary-dark shadow-sm transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              تأكيد الاستعادة
            </button>
            <button
              type="button"
              onClick={() => setRestoreTarget(null)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-surface-secondary text-text border border-border hover:bg-surface-tertiary transition-all duration-200"
            >
              إلغاء
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="إعدادات الأرشفة التلقائية"
        subtitle="تخصيص قواعد ومدة الأرشفة التلقائية"
        size="lg"
      >
        <div className="space-y-5">
          {autoArchiveRules.map((rule, idx) => (
            <div key={rule.label} className="flex items-start gap-4 p-4 rounded-xl bg-surface-secondary border border-border">
              <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary shrink-0">
                <rule.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text mb-2">{rule.label}</p>
                <select
                  defaultValue={rule.value}
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="1 شهر">شهر واحد</option>
                  <option value="3 أشهر">3 أشهر</option>
                  <option value="6 أشهر">6 أشهر</option>
                  <option value="سنة واحدة">سنة واحدة</option>
                  <option value="سنتان">سنتان</option>
                  <option value="5 سنوات">5 سنوات</option>
                </select>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-2">
                <input type="checkbox" defaultChecked={idx < 4} className="sr-only peer" />
                <div className="w-10 h-6 bg-surface-tertiary rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-[-18px]" />
              </label>
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setShowSettings(false)
                addToast({ type: "success", title: "تم حفظ الإعدادات", message: "تم تحديث إعدادات الأرشفة التلقائية بنجاح" })
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-primary text-white hover:bg-primary-dark shadow-sm transition-all duration-200"
            >
              حفظ الإعدادات
            </button>
            <button
              type="button"
              onClick={() => setShowSettings(false)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-surface-secondary text-text border border-border hover:bg-surface-tertiary transition-all duration-200"
            >
              إلغاء
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Table } from "@/components/ui/Table"
import { Tabs, TabPanel } from "@/components/ui/Tabs"
import { SearchInput } from "@/components/ui/SearchInput"
import Button from "@/components/ui/Button"
import { useNotificationStore } from "@/lib/notification-store"
import { cn, det, formatDate } from "@/lib/utils"
import {
  HiOutlineLogin,
  HiOutlineExclamationCircle,
  HiOutlineChartBar,
  HiOutlineDatabase,
  HiOutlineCloudUpload,
  HiOutlineSearch,
  HiOutlineDownload,
  HiOutlineRefresh,
  HiOutlineCalendar,
  HiOutlineFilter,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlineServer,
  HiOutlineGlobe,
  HiOutlineUser,
  HiOutlineShieldCheck,
  HiOutlineTrendingUp,
  HiOutlineExclamation,
  HiOutlineInformationCircle,
  HiOutlineArrowDown,
  HiOutlineSwitchHorizontal,
} from "react-icons/hi"
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
} from "recharts"

const logTabs = [
  { id: "login", label: "سجل الدخول", icon: HiOutlineLogin },
  { id: "errors", label: "أخطاء النظام", icon: HiOutlineExclamationCircle },
  { id: "performance", label: "الأداء", icon: HiOutlineChartBar },
  { id: "database", label: "قاعدة البيانات", icon: HiOutlineDatabase },
  { id: "backup", label: "النسخ الاحتياطي", icon: HiOutlineCloudUpload },
]

function generateLoginData() {
  const users = [
    "أحمد محمد", "سارة خالد", "محمد علي", "نورة أحمد", "خالد عمر",
    "فاطمة حسن", "يوسف عبدالله", "هدى سعيد", "عمر حسن", "أمل ناصر",
    "عبدالرحمن فهد", "لينا إبراهيم", "سامي عبدالعزيز", "مريم طارق", "بدر الشمري",
  ]
  const roles = ["معلم", "مشرف", "إداري", "مدير", "معلم", "معلم", "مشرف", "إداري", "معلم", "مشرف"]
  const ips = [
    "192.168.1.45", "10.0.0.112", "172.16.0.89", "192.168.1.201", "10.0.0.55",
    "192.168.2.12", "10.0.1.200", "172.16.1.33", "192.168.1.78", "10.0.0.201",
    "192.168.2.88", "172.16.0.15", "10.0.1.67", "192.168.1.150", "10.0.0.34",
  ]
  const devices = [
    "Chrome 120 / Windows 11", "Firefox 121 / macOS 14", "Safari 17 / iOS 17",
    "Chrome 119 / Android 14", "Edge 120 / Windows 11", "Chrome 120 / macOS 14",
    "Safari 17 / macOS 14", "Firefox 121 / Windows 10", "Chrome 120 / Linux",
    "Edge 119 / Windows 11", "Chrome 119 / Android 13", "Safari 16 / iOS 16",
    "Firefox 120 / Windows 11", "Chrome 120 / macOS 13", "Opera 105 / Windows 11",
  ]
  const statuses = ["success", "success", "success", "failed", "success", "success", "failed", "success", "success", "success", "failed", "success", "success", "success", "failed"]
  const now = Date.now()
  return Array.from({ length: 15 }, (_, i) => ({
    id: `login_${i}`,
    userName: users[i],
    role: roles[i % roles.length],
    ip: ips[i],
    device: devices[i],
    time: new Date(now - i * 3600000 - Math.floor(det() * 1800000)),
    status: statuses[i] as "success" | "failed",
  }))
}

function generateErrorData() {
  const errors = [
    { message: "فشل الاتصال بقاعدة البيانات - timeout after 30s", source: "DatabaseService.ts", line: 142, severity: "critical" as const },
    { message: "مؤشر فارغ - user object is null", source: "AuthMiddleware.ts", line: 67, severity: "critical" as const },
    { message: "فشل تحميل الصورة - الحجم يتجاوز الحد المسموح", source: "FileUpload.tsx", line: 234, severity: "warning" as const },
    { message: "تحذير: انتهاء صلاحية الجلسة", source: "SessionManager.ts", line: 89, severity: "warning" as const },
    { message: "طلبات API بطيئة - متوسط الاستجابة 5.2s", source: "ApiGateway.ts", line: 45, severity: "warning" as const },
    { message: "تم تسجيل دخول مشبوه من عنوان IP غير معروف", source: "SecurityAudit.ts", line: 198, severity: "critical" as const },
    { message: "ذاكرة التخزين المؤقت ممتلئة بنسبة 95%", source: "CacheManager.ts", line: 311, severity: "warning" as const },
    { message: "تحديث الملف الشخصي - تم بنجاح", source: "ProfileService.ts", line: 56, severity: "info" as const },
    { message: "مزامنة البيانات مع الخدمة السحابية", source: "SyncService.ts", line: 123, severity: "info" as const },
    { message: "فشل إرسال الإشعار - push token غير صالح", source: "NotificationService.ts", line: 77, severity: "error" as const },
    { message: "حقل الاسم مطلوب ولم يتم توفيره", source: "ValidationRules.ts", line: 34, severity: "warning" as const },
    { message: "تم تحميل التقرير بنجاح", source: "ReportGenerator.ts", line: 210, severity: "info" as const },
    { message: "استثناء غير متوقع - index out of bounds", source: "GradeCalculator.ts", line: 88, severity: "critical" as const },
    { message: "فشل الاتصال بخدمة البريد الإلكتروني", source: "MailService.ts", line: 155, severity: "error" as const },
    { message: "تم إنشاء نسخة احتياطية جديدة", source: "BackupService.ts", line: 42, severity: "info" as const },
  ]
  const now = Date.now()
  return errors.map((e, i) => ({
    id: `error_${i}`,
    ...e,
    timestamp: new Date(now - i * 7200000 - Math.floor(det() * 3600000)),
  }))
}

function generatePerformanceData() {
  const avgResponseTime = [
    { time: "00:00", value: 320 }, { time: "02:00", value: 280 }, { time: "04:00", value: 250 },
    { time: "06:00", value: 310 }, { time: "08:00", value: 580 }, { time: "10:00", value: 720 },
    { time: "12:00", value: 690 }, { time: "14:00", value: 810 }, { time: "16:00", value: 750 },
    { time: "18:00", value: 920 }, { time: "20:00", value: 870 }, { time: "22:00", value: 540 },
  ]
  const slowQueries = [
    { id: "q1", query: "SELECT * FROM students JOIN grades ON...", duration: 8.7, executedBy: "تقرير الأداء" },
    { id: "q2", query: "UPDATE attendance SET status = ? WHERE...", duration: 6.2, executedBy: "حضور الطلاب" },
    { id: "q3", query: "INSERT INTO logs (action, user_id, ...)", duration: 5.9, executedBy: "سجل النشاطات" },
    { id: "q4", query: "SELECT AVG(score) FROM exam_results GROUP BY...", duration: 4.8, executedBy: "تحليل الدرجات" },
  ]
  const endpoints = [
    { endpoint: "/api/students", method: "GET", calls: 1520, avgMs: 45, p99Ms: 210 },
    { endpoint: "/api/grades/batch", method: "POST", calls: 890, avgMs: 320, p99Ms: 1500 },
    { endpoint: "/api/reports/export", method: "GET", calls: 340, avgMs: 2800, p99Ms: 5400 },
    { endpoint: "/api/attendance", method: "GET", calls: 2100, avgMs: 38, p99Ms: 175 },
  ]
  return { avgResponseTime, slowQueries, endpoints, serverLoad: 68 }
}

function generateDatabaseData() {
  const queryTrend = Array.from({ length: 12 }, (_, i) => ({
    month: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"][i],
    count: Math.floor(15000 + det() * 12000),
  }))
  return {
    tableSize: "4.7 GB",
    lastVacuum: "2026-07-18 03:00",
    activeConnections: 23,
    maxConnections: 100,
    slowQueries: 7,
    cacheHitRate: 94.2,
    queryTrend,
  }
}

function generateBackupData() {
  const now = Date.now()
  return Array.from({ length: 12 }, (_, i) => ({
    id: `bkp_${i}`,
    date: new Date(now - i * 86400000 * 3 - Math.floor(det() * 86400000)),
    size: `${(4.2 + det() * 3.8).toFixed(1)} GB`,
    type: det() > 0.5 ? "كامل" : "تزايدي",
    status: det() > 0.15 ? "نجاح" : "فشل",
    location: i % 3 === 0 ? "Azure Blob" : i % 3 === 1 ? "AWS S3" : "خادم محلي",
  }))
}

const severityBadge = {
  critical: { variant: "error" as const, label: "حرج" },
  error: { variant: "warning" as const, label: "خطأ" },
  warning: { variant: "warning" as const, label: "تحذير" },
  info: { variant: "info" as const, label: "معلومات" },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function SystemLogsPage() {
  const { addToast } = useNotificationStore()
  const [search, setSearch] = useState("")
  const [dateRange, setDateRange] = useState("all")
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const loginData = useMemo(() => generateLoginData(), [refreshKey])
  const errorData = useMemo(() => generateErrorData(), [refreshKey])
  const perfData = useMemo(() => generatePerformanceData(), [refreshKey])
  const dbData = useMemo(() => generateDatabaseData(), [refreshKey])
  const backupData = useMemo(() => generateBackupData(), [refreshKey])

  useEffect(() => {
    if (!autoRefresh) return
    const interval = setInterval(() => setRefreshKey((k) => k + 1), 15000)
    return () => clearInterval(interval)
  }, [autoRefresh])

  const handleExport = useCallback(() => {
    addToast({ type: "success", title: "تم تصدير CSV", message: "جاري تحميل ملف السجل" })
  }, [addToast])

  const handleManualRefresh = useCallback(() => {
    setRefreshKey((k) => k + 1)
    addToast({ type: "info", title: "تحديث البيانات", message: "تم تحديث السجلات" })
  }, [addToast])

  const filterByDate = <T extends { time?: Date; timestamp?: Date; date?: Date }>(items: T[]): T[] => {
    if (dateRange === "all") return items
    const now = Date.now()
    const cutoff = dateRange === "24h" ? now - 86400000
      : dateRange === "7d" ? now - 7 * 86400000
      : dateRange === "30d" ? now - 30 * 86400000
      : 0
    return items.filter((item) => {
      const d = item.time || item.timestamp || item.date
      return d && d.getTime() >= cutoff
    })
  }

  const filterBySearch = <T extends Record<string, unknown>>(items: T[]): T[] => {
    if (!search.trim()) return items
    const q = search.toLowerCase()
    return items.filter((item) =>
      Object.values(item).some((v) => {
        if (v === null || v === undefined) return false
        return String(v).toLowerCase().includes(q)
      })
    )
  }

  const loginColumns = [
    { key: "userName", header: "المستخدم", render: (item: { userName: string; role: string }) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
          <HiOutlineUser className="w-4 h-4 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <p className="font-medium text-text">{item.userName}</p>
          <p className="text-xs text-text-tertiary">{item.role}</p>
        </div>
      </div>
    )},
    { key: "ip", header: "IP عنوان" },
    { key: "device", header: "المتصفح / الجهاز", className: "max-w-[200px] truncate" },
    { key: "time", header: "الوقت", render: (item: { time: Date }) => (
      <span className="text-sm text-text-secondary whitespace-nowrap" dir="ltr">
        {item.time.toLocaleDateString("ar-SA")} {item.time.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
      </span>
    )},
    { key: "status", header: "الحالة", render: (item: { status: string }) => (
      <Badge variant={item.status === "success" ? "success" : "error"} size="sm" dot>
        {item.status === "success" ? "نجاح" : "فشل"}
      </Badge>
    )},
  ]

  const errorColumns = [
    { key: "message", header: "رسالة الخطأ", className: "max-w-[280px]" },
    { key: "source", header: "المصدر", render: (item: { source: string; line: number }) => (
      <div className="flex items-center gap-1">
        <span className="text-text font-mono text-xs">{item.source}</span>
        <span className="text-text-tertiary text-xs">:{item.line}</span>
      </div>
    )},
    { key: "timestamp", header: "التاريخ", render: (item: { timestamp: Date }) => (
      <span className="text-sm text-text-secondary whitespace-nowrap" dir="ltr">
        {item.timestamp.toLocaleDateString("ar-SA")} {item.timestamp.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
      </span>
    )},
    { key: "severity", header: "المستوى", render: (item: { severity: keyof typeof severityBadge }) => {
      const s = severityBadge[item.severity] || severityBadge.info
      return <Badge variant={s.variant} size="sm">{s.label}</Badge>
    }},
  ]

  const backupColumns = [
    { key: "date", header: "التاريخ", render: (item: { date: Date }) => (
      <span className="text-sm text-text" dir="ltr">{item.date.toLocaleDateString("ar-SA")}</span>
    )},
    { key: "size", header: "الحجم" },
    { key: "type", header: "النوع", render: (item: { type: string }) => (
      <Badge variant={item.type === "كامل" ? "primary" : "info"} size="sm">{item.type}</Badge>
    )},
    { key: "status", header: "الحالة", render: (item: { status: string }) => (
      <Badge variant={item.status === "نجاح" ? "success" : "error"} size="sm" dot>
        {item.status}
      </Badge>
    )},
    { key: "location", header: "الموقع" },
    { key: "actions", header: "", render: () => (
      <button type="button" onClick={() => addToast({ type: "success", title: "جاري التحميل", message: "سيتم تنزيل ملف النسخة الاحتياطية" })}
        className="p-2 rounded-lg hover:bg-surface-tertiary text-text-secondary hover:text-primary transition-colors"
      >
        <HiOutlineDownload className="w-4 h-4" />
      </button>
    )},
  ]

  const perfSlowQueryColumns = [
    { key: "query", header: "الاستعلام", className: "max-w-[300px] truncate font-mono text-xs" },
    { key: "duration", header: "المدة (ط«)", render: (item: { duration: number }) => (
      <span className="text-error font-medium">{item.duration.toFixed(1)}s</span>
    )},
    { key: "executedBy", header: "المنفذ" },
  ]

  const perfEndpointColumns = [
    { key: "endpoint", header: "API نقطة", className: "font-mono text-xs" },
    { key: "method", header: "الطريقة", render: (item: { method: string }) => (
      <Badge variant={item.method === "GET" ? "success" : "warning"} size="sm">{item.method}</Badge>
    )},
    { key: "calls", header: "الطلبات" },
    { key: "avgMs", header: "متوسط (مللي)", render: (item: { avgMs: number }) => (
      <span className={item.avgMs > 1000 ? "text-error font-medium" : "text-text"}>{item.avgMs.toLocaleString()}ms</span>
    )},
    { key: "p99Ms", header: "P99 (مللي)", render: (item: { p99Ms: number }) => (
      <span className={item.p99Ms > 1000 ? "text-warning font-medium" : "text-text-tertiary"}>{item.p99Ms.toLocaleString()}ms</span>
    )},
  ]

  const filteredLogin = useMemo(() => filterBySearch(filterByDate(loginData)), [loginData, search, dateRange])
  const filteredErrors = useMemo(() => filterBySearch(filterByDate(errorData)), [errorData, search, dateRange])
  const filteredBackup = useMemo(() => filterBySearch(filterByDate(backupData)), [backupData, search, dateRange])

  return (
    <div className="min-h-screen">
      <PageHeader title="سجل النظام" description="مراقبة وتتبع جميع أحداث النظام" />

      <div className="p-4 md:p-6 space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex items-center gap-3 flex-wrap">
              <SearchInput value={search} onChange={setSearch} placeholder="بحث في السجلات..." className="w-64" />
              <div className="flex items-center gap-2 bg-surface border border-border rounded-lg px-3 py-2 text-sm">
                <HiOutlineCalendar className="w-4 h-4 text-text-tertiary" />
                <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}
                  className="bg-transparent text-text focus:outline-none text-sm"
                >
                  <option value="all">كل الفترات</option>
                  <option value="24h">آخر 24 ساعة</option>
                  <option value="7d">آخر 7 أيام</option>
                  <option value="30d">آخر 30 يوم</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button type="button"
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 border",
                  autoRefresh
                    ? "bg-primary-50 text-primary border-primary/30 dark:bg-primary-900/30 dark:text-primary-300"
                    : "bg-surface text-text-secondary border-border hover:bg-surface-secondary"
                )}
              >
                <HiOutlineRefresh className={cn("w-4 h-4", autoRefresh && "animate-spin")} />
                تلقائي
              </button>
              <button type="button" onClick={handleManualRefresh}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-surface border border-border text-text-secondary hover:bg-surface-secondary transition-all"
              >
                <HiOutlineSwitchHorizontal className="w-4 h-4" />
                تحديث
              </button>
              <Button variant="primary" size="sm" leftIcon={<HiOutlineDownload className="w-4 h-4" />} onClick={handleExport}>
                تصدير CSV
              </Button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-0">
                <Tabs tabs={logTabs}>
                  {(activeTab) => (
                    <div className="p-4 md:p-6 pt-0">
                      <TabPanel id="login" activeTab={activeTab}>
                        <div className="mb-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <StatsCard title="إجمالي محاولات الدخول" value={loginData.length} icon={HiOutlineLogin} color="primary" delay={0} />
                          <StatsCard title="محاولات ناجحة" value={loginData.filter((l) => l.status === "success").length} icon={HiOutlineCheckCircle} color="success" delay={0.05} />
                          <StatsCard title="محاولات فاشلة" value={loginData.filter((l) => l.status === "failed").length} icon={HiOutlineXCircle} color="error" delay={0.1} />
                          <StatsCard title="مستخدمين فريدين" value={new Set(loginData.map((l) => l.userName)).size} icon={HiOutlineUser} color="info" delay={0.15} />
                        </div>
                        <Table columns={loginColumns} data={filteredLogin} />
                      </TabPanel>

                      <TabPanel id="errors" activeTab={activeTab}>
                        <div className="mb-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <StatsCard title="إجمالي الأخطاء" value={errorData.length} icon={HiOutlineExclamationCircle} color="error" delay={0} />
                          <StatsCard title="حرجة" value={errorData.filter((e) => e.severity === "critical").length} icon={HiOutlineExclamation} color="error" delay={0.05} />
                          <StatsCard title="تحذيرات" value={errorData.filter((e) => e.severity === "warning").length} icon={HiOutlineExclamation} color="warning" delay={0.1} />
                          <StatsCard title="معلومات" value={errorData.filter((e) => e.severity === "info").length} icon={HiOutlineInformationCircle} color="info" delay={0.15} />
                        </div>
                        <Table columns={errorColumns} data={filteredErrors} />
                      </TabPanel>

                      <TabPanel id="performance" activeTab={activeTab}>
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatsCard title="تحميل الخادم" value={`${perfData.serverLoad}%`} icon={HiOutlineServer} color="warning" delay={0} />
                            <StatsCard title="متوسط زمن الاستجابة" value="528ms" icon={HiOutlineClock} color="primary" change={{ value: 12, isPositive: false }} delay={0.05} />
                            <StatsCard title="أقصى زمن استجابة" value="2.8s" icon={HiOutlineTrendingUp} color="error" delay={0.1} />
                            <StatsCard title="استعلامات بطيئة" value={perfData.slowQueries.length} icon={HiOutlineDatabase} color="info" delay={0.15} />
                          </div>

                          <Card>
                            <CardHeader>
                              <CardTitle>متوسط زمن الاستجابة (خلال 24 ساعة)</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div dir="ltr" className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                  <AreaChart data={perfData.avgResponseTime} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                                    <defs>
                                      <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                                      </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                                    <XAxis dataKey="time" tick={{ fill: "#475569", fontSize: 11 }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                                    <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} unit="ms" />
                                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", fontSize: "13px" }} />
                                    <Area type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={2.5} fill="url(#perfGrad)" />
                                  </AreaChart>
                                </ResponsiveContainer>
                              </div>
                            </CardContent>
                          </Card>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                              <CardHeader><CardTitle>أبطأ الاستعلامات</CardTitle></CardHeader>
                              <CardContent className="p-0">
                                <Table columns={perfSlowQueryColumns} data={perfData.slowQueries} />
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader><CardTitle>إحصائيات نقاط API</CardTitle></CardHeader>
                              <CardContent className="p-0">
                                <Table columns={perfEndpointColumns} data={perfData.endpoints} />
                              </CardContent>
                            </Card>
                          </div>

                          <Card>
                            <CardHeader><CardTitle>مؤشر تحميل الخادم</CardTitle></CardHeader>
                            <CardContent>
                              <div className="flex items-center gap-4">
                                <div className="flex-1 h-4 bg-surface-tertiary rounded-full overflow-hidden">
                                  <div className={cn(
                                    "h-full rounded-full transition-all duration-500",
                                    perfData.serverLoad > 80 ? "bg-error" : perfData.serverLoad > 60 ? "bg-warning" : "bg-success"
                                  )} style={{ width: `${perfData.serverLoad}%` }} />
                                </div>
                                <span className={cn(
                                  "text-lg font-bold",
                                  perfData.serverLoad > 80 ? "text-error" : perfData.serverLoad > 60 ? "text-warning" : "text-success"
                                )}>
                                  {perfData.serverLoad}%
                                </span>
                              </div>
                              <p className="text-xs text-text-tertiary mt-2">
                                {perfData.serverLoad > 80 ? "تحميل مرتفع - يوصى بمراجعة الموارد" :
                                 perfData.serverLoad > 60 ? "تحميل متوسط" : "تحميل منخفض - الأداء جيد"}
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </TabPanel>

                      <TabPanel id="database" activeTab={activeTab}>
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <StatsCard title="حجم قاعدة البيانات" value={dbData.tableSize} icon={HiOutlineDatabase} color="primary" delay={0} />
                            <StatsCard title="الاتصالات النشطة" value={`${dbData.activeConnections}/${dbData.maxConnections}`} icon={HiOutlineGlobe} color="success" delay={0.05} />
                            <StatsCard title="استعلامات بطيئة" value={dbData.slowQueries} icon={HiOutlineClock} color="warning" delay={0.1} />
                            <StatsCard title="معدل hit ذاكرة التخزين" value={`${dbData.cacheHitRate}%`} icon={HiOutlineChartBar} color="info" delay={0.15} />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Card>
                              <CardHeader><CardTitle>آخر تنظيف (Vacuum)</CardTitle></CardHeader>
                              <CardContent>
                                <p className="text-lg font-medium text-text">{dbData.lastVacuum}</p>
                                <Badge variant="success" size="sm" className="mt-2">مكتمل</Badge>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader><CardTitle>حجم الجداول</CardTitle></CardHeader>
                              <CardContent>
                                <div className="space-y-2">
                                  {[
                                    { name: "students", size: "1.8 GB" },
                                    { name: "grades", size: "1.2 GB" },
                                    { name: "attendance", size: "0.9 GB" },
                                    { name: "logs", size: "0.8 GB" },
                                  ].map((t) => (
                                    <div key={t.name} className="flex items-center justify-between">
                                      <span className="text-sm font-mono text-text-secondary">{t.name}</span>
                                      <span className="text-sm text-text">{t.size}</span>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader><CardTitle>مؤشر الأداء</CardTitle></CardHeader>
                              <CardContent className="space-y-3">
                                {[
                                  { label: "اتصالات متاحة", value: 77, total: 100, color: "success" },
                                  { label: "مساحة متبقية", value: 35, total: 100, color: "warning" },
                                  { label: "صحة قاعدة البيانات", value: 92, total: 100, color: "success" },
                                ].map((m) => (
                                  <div key={m.label}>
                                    <div className="flex items-center justify-between text-sm mb-1">
                                      <span className="text-text-secondary">{m.label}</span>
                                      <span className="text-text font-medium">{m.value}%</span>
                                    </div>
                                    <div className="h-2 bg-surface-tertiary rounded-full overflow-hidden">
                                      <div className={cn(
                                        "h-full rounded-full transition-all",
                                        m.color === "success" ? "bg-success" : "bg-warning"
                                      )} style={{ width: `${m.value}%` }} />
                                    </div>
                                  </div>
                                ))}
                              </CardContent>
                            </Card>
                          </div>

                          <Card>
                            <CardHeader><CardTitle>اتجاه عدد الاستعلامات</CardTitle></CardHeader>
                            <CardContent>
                              <div dir="ltr" className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                  <BarChart data={dbData.queryTrend} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                                    <XAxis dataKey="month" tick={{ fill: "#475569", fontSize: 10 }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                                    <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "8px", fontSize: "13px" }} />
                                    <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} />
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </TabPanel>

                      <TabPanel id="backup" activeTab={activeTab}>
                        <div className="mb-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <StatsCard title="إجمالي النسخ" value={backupData.length} icon={HiOutlineCloudUpload} color="primary" delay={0} />
                          <StatsCard title="ناجحة" value={backupData.filter((b) => b.status === "نجاح").length} icon={HiOutlineCheckCircle} color="success" delay={0.05} />
                          <StatsCard title="فاشلة" value={backupData.filter((b) => b.status === "فشل").length} icon={HiOutlineXCircle} color="error" delay={0.1} />
                          <StatsCard title="آخر نسخة" value={formatDate(backupData[0]?.date || new Date())} icon={HiOutlineCalendar} color="info" delay={0.15} />
                        </div>
                        <Table columns={backupColumns} data={filteredBackup} />
                      </TabPanel>
                    </div>
                  )}
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

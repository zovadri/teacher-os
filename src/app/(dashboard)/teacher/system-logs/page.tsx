"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import DashboardHeader from "@/components/layout/DashboardHeader"
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
  { id: "login", label: "ط³ط¬ظ„ ط§ظ„ط¯ط®ظˆظ„", icon: HiOutlineLogin },
  { id: "errors", label: "ط£ط®ط·ط§ط، ط§ظ„ظ†ط¸ط§ظ…", icon: HiOutlineExclamationCircle },
  { id: "performance", label: "ط§ظ„ط£ط¯ط§ط،", icon: HiOutlineChartBar },
  { id: "database", label: "ظ‚ط§ط¹ط¯ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ", icon: HiOutlineDatabase },
  { id: "backup", label: "ط§ظ„ظ†ط³ط® ط§ظ„ط§ط­طھظٹط§ط·ظٹ", icon: HiOutlineCloudUpload },
]

function generateLoginData() {
  const users = [
    "ط£ط­ظ…ط¯ ظ…ط­ظ…ط¯", "ط³ط§ط±ط© ط®ط§ظ„ط¯", "ظ…ط­ظ…ط¯ ط¹ظ„ظٹ", "ظ†ظˆط±ط© ط£ط­ظ…ط¯", "ط®ط§ظ„ط¯ ط¹ظ…ط±",
    "ظپط§ط·ظ…ط© ط­ط³ظ†", "ظٹظˆط³ظپ ط¹ط¨ط¯ط§ظ„ظ„ظ‡", "ظ‡ط¯ظ‰ ط³ط¹ظٹط¯", "ط¹ظ…ط± ط­ط³ظ†", "ط£ظ…ظ„ ظ†ط§طµط±",
    "ط¹ط¨ط¯ط§ظ„ط±ط­ظ…ظ† ظپظ‡ط¯", "ظ„ظٹظ†ط§ ط¥ط¨ط±ط§ظ‡ظٹظ…", "ط³ط§ظ…ظٹ ط¹ط¨ط¯ط§ظ„ط¹ط²ظٹط²", "ظ…ط±ظٹظ… ط·ط§ط±ظ‚", "ط¨ط¯ط± ط§ظ„ط´ظ…ط±ظٹ",
  ]
  const roles = ["ظ…ط¹ظ„ظ…", "ظ…ط´ط±ظپ", "ط¥ط¯ط§ط±ظٹ", "ظ…ط¯ظٹط±", "ظ…ط¹ظ„ظ…", "ظ…ط¹ظ„ظ…", "ظ…ط´ط±ظپ", "ط¥ط¯ط§ط±ظٹ", "ظ…ط¹ظ„ظ…", "ظ…ط´ط±ظپ"]
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
    { message: "ظپط´ظ„ ط§ظ„ط§طھطµط§ظ„ ط¨ظ‚ط§ط¹ط¯ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ - timeout after 30s", source: "DatabaseService.ts", line: 142, severity: "critical" as const },
    { message: "ظ…ط¤ط´ط± ظپط§ط±ط؛ - user object is null", source: "AuthMiddleware.ts", line: 67, severity: "critical" as const },
    { message: "ظپط´ظ„ طھط­ظ…ظٹظ„ ط§ظ„طµظˆط±ط© - ط§ظ„ط­ط¬ظ… ظٹطھط¬ط§ظˆط² ط§ظ„ط­ط¯ ط§ظ„ظ…ط³ظ…ظˆط­", source: "FileUpload.tsx", line: 234, severity: "warning" as const },
    { message: "طھط­ط°ظٹط±: ط§ظ†طھظ‡ط§ط، طµظ„ط§ط­ظٹط© ط§ظ„ط¬ظ„ط³ط©", source: "SessionManager.ts", line: 89, severity: "warning" as const },
    { message: "ط·ظ„ط¨ط§طھ API ط¨ط·ظٹط¦ط© - ظ…طھظˆط³ط· ط§ظ„ط§ط³طھط¬ط§ط¨ط© 5.2s", source: "ApiGateway.ts", line: 45, severity: "warning" as const },
    { message: "طھظ… طھط³ط¬ظٹظ„ ط¯ط®ظˆظ„ ظ…ط´ط¨ظˆظ‡ ظ…ظ† ط¹ظ†ظˆط§ظ† IP ط؛ظٹط± ظ…ط¹ط±ظˆظپ", source: "SecurityAudit.ts", line: 198, severity: "critical" as const },
    { message: "ط°ط§ظƒط±ط© ط§ظ„طھط®ط²ظٹظ† ط§ظ„ظ…ط¤ظ‚طھ ظ…ظ…طھظ„ط¦ط© ط¨ظ†ط³ط¨ط© 95%", source: "CacheManager.ts", line: 311, severity: "warning" as const },
    { message: "طھط­ط¯ظٹط« ط§ظ„ظ…ظ„ظپ ط§ظ„ط´ط®طµظٹ - طھظ… ط¨ظ†ط¬ط§ط­", source: "ProfileService.ts", line: 56, severity: "info" as const },
    { message: "ظ…ط²ط§ظ…ظ†ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ ظ…ط¹ ط§ظ„ط®ط¯ظ…ط© ط§ظ„ط³ط­ط§ط¨ظٹط©", source: "SyncService.ts", line: 123, severity: "info" as const },
    { message: "ظپط´ظ„ ط¥ط±ط³ط§ظ„ ط§ظ„ط¥ط´ط¹ط§ط± - push token ط؛ظٹط± طµط§ظ„ط­", source: "NotificationService.ts", line: 77, severity: "error" as const },
    { message: "ط­ظ‚ظ„ ط§ظ„ط§ط³ظ… ظ…ط·ظ„ظˆط¨ ظˆظ„ظ… ظٹطھظ… طھظˆظپظٹط±ظ‡", source: "ValidationRules.ts", line: 34, severity: "warning" as const },
    { message: "طھظ… طھط­ظ…ظٹظ„ ط§ظ„طھظ‚ط±ظٹط± ط¨ظ†ط¬ط§ط­", source: "ReportGenerator.ts", line: 210, severity: "info" as const },
    { message: "ط§ط³طھط«ظ†ط§ط، ط؛ظٹط± ظ…طھظˆظ‚ط¹ - index out of bounds", source: "GradeCalculator.ts", line: 88, severity: "critical" as const },
    { message: "ظپط´ظ„ ط§ظ„ط§طھطµط§ظ„ ط¨ط®ط¯ظ…ط© ط§ظ„ط¨ط±ظٹط¯ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹ", source: "MailService.ts", line: 155, severity: "error" as const },
    { message: "طھظ… ط¥ظ†ط´ط§ط، ظ†ط³ط®ط© ط§ط­طھظٹط§ط·ظٹط© ط¬ط¯ظٹط¯ط©", source: "BackupService.ts", line: 42, severity: "info" as const },
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
    { id: "q1", query: "SELECT * FROM students JOIN grades ON...", duration: 8.7, executedBy: "طھظ‚ط±ظٹط± ط§ظ„ط£ط¯ط§ط،" },
    { id: "q2", query: "UPDATE attendance SET status = ? WHERE...", duration: 6.2, executedBy: "ط­ط¶ظˆط± ط§ظ„ط·ظ„ط§ط¨" },
    { id: "q3", query: "INSERT INTO logs (action, user_id, ...)", duration: 5.9, executedBy: "ط³ط¬ظ„ ط§ظ„ظ†ط´ط§ط·ط§طھ" },
    { id: "q4", query: "SELECT AVG(score) FROM exam_results GROUP BY...", duration: 4.8, executedBy: "طھط­ظ„ظٹظ„ ط§ظ„ط¯ط±ط¬ط§طھ" },
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
    month: ["ظٹظ†ط§ظٹط±", "ظپط¨ط±ط§ظٹط±", "ظ…ط§ط±ط³", "ط£ط¨ط±ظٹظ„", "ظ…ط§ظٹظˆ", "ظٹظˆظ†ظٹظˆ", "ظٹظˆظ„ظٹظˆ", "ط£ط؛ط³ط·ط³", "ط³ط¨طھظ…ط¨ط±", "ط£ظƒطھظˆط¨ط±", "ظ†ظˆظپظ…ط¨ط±", "ط¯ظٹط³ظ…ط¨ط±"][i],
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
    type: det() > 0.5 ? "ظƒط§ظ…ظ„" : "طھط²ط§ظٹط¯ظٹ",
    status: det() > 0.15 ? "ظ†ط¬ط§ط­" : "ظپط´ظ„",
    location: i % 3 === 0 ? "Azure Blob" : i % 3 === 1 ? "AWS S3" : "ط®ط§ط¯ظ… ظ…ط­ظ„ظٹ",
  }))
}

const severityBadge = {
  critical: { variant: "error" as const, label: "ط­ط±ط¬" },
  error: { variant: "warning" as const, label: "ط®ط·ط£" },
  warning: { variant: "warning" as const, label: "طھط­ط°ظٹط±" },
  info: { variant: "info" as const, label: "ظ…ط¹ظ„ظˆظ…ط§طھ" },
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
    addToast({ type: "success", title: "طھظ… طھطµط¯ظٹط± CSV", message: "ط¬ط§ط±ظٹ طھط­ظ…ظٹظ„ ظ…ظ„ظپ ط§ظ„ط³ط¬ظ„" })
  }, [addToast])

  const handleManualRefresh = useCallback(() => {
    setRefreshKey((k) => k + 1)
    addToast({ type: "info", title: "طھط­ط¯ظٹط« ط§ظ„ط¨ظٹط§ظ†ط§طھ", message: "طھظ… طھط­ط¯ظٹط« ط§ظ„ط³ط¬ظ„ط§طھ" })
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
    { key: "userName", header: "ط§ظ„ظ…ط³طھط®ط¯ظ…", render: (item: { userName: string; role: string }) => (
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
    { key: "ip", header: "IP ط¹ظ†ظˆط§ظ†" },
    { key: "device", header: "ط§ظ„ظ…طھطµظپط­ / ط§ظ„ط¬ظ‡ط§ط²", className: "max-w-[200px] truncate" },
    { key: "time", header: "ط§ظ„ظˆظ‚طھ", render: (item: { time: Date }) => (
      <span className="text-sm text-text-secondary whitespace-nowrap" dir="ltr">
        {item.time.toLocaleDateString("ar-SA")} {item.time.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
      </span>
    )},
    { key: "status", header: "ط§ظ„ط­ط§ظ„ط©", render: (item: { status: string }) => (
      <Badge variant={item.status === "success" ? "success" : "error"} size="sm" dot>
        {item.status === "success" ? "ظ†ط¬ط§ط­" : "ظپط´ظ„"}
      </Badge>
    )},
  ]

  const errorColumns = [
    { key: "message", header: "ط±ط³ط§ظ„ط© ط§ظ„ط®ط·ط£", className: "max-w-[280px]" },
    { key: "source", header: "ط§ظ„ظ…طµط¯ط±", render: (item: { source: string; line: number }) => (
      <div className="flex items-center gap-1">
        <span className="text-text font-mono text-xs">{item.source}</span>
        <span className="text-text-tertiary text-xs">:{item.line}</span>
      </div>
    )},
    { key: "timestamp", header: "ط§ظ„طھط§ط±ظٹط®", render: (item: { timestamp: Date }) => (
      <span className="text-sm text-text-secondary whitespace-nowrap" dir="ltr">
        {item.timestamp.toLocaleDateString("ar-SA")} {item.timestamp.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
      </span>
    )},
    { key: "severity", header: "ط§ظ„ظ…ط³طھظˆظ‰", render: (item: { severity: keyof typeof severityBadge }) => {
      const s = severityBadge[item.severity] || severityBadge.info
      return <Badge variant={s.variant} size="sm">{s.label}</Badge>
    }},
  ]

  const backupColumns = [
    { key: "date", header: "ط§ظ„طھط§ط±ظٹط®", render: (item: { date: Date }) => (
      <span className="text-sm text-text" dir="ltr">{item.date.toLocaleDateString("ar-SA")}</span>
    )},
    { key: "size", header: "ط§ظ„ط­ط¬ظ…" },
    { key: "type", header: "ط§ظ„ظ†ظˆط¹", render: (item: { type: string }) => (
      <Badge variant={item.type === "ظƒط§ظ…ظ„" ? "primary" : "info"} size="sm">{item.type}</Badge>
    )},
    { key: "status", header: "ط§ظ„ط­ط§ظ„ط©", render: (item: { status: string }) => (
      <Badge variant={item.status === "ظ†ط¬ط§ط­" ? "success" : "error"} size="sm" dot>
        {item.status}
      </Badge>
    )},
    { key: "location", header: "ط§ظ„ظ…ظˆظ‚ط¹" },
    { key: "actions", header: "", render: () => (
      <button type="button" onClick={() => addToast({ type: "success", title: "ط¬ط§ط±ظٹ ط§ظ„طھط­ظ…ظٹظ„", message: "ط³ظٹطھظ… طھظ†ط²ظٹظ„ ظ…ظ„ظپ ط§ظ„ظ†ط³ط®ط© ط§ظ„ط§ط­طھظٹط§ط·ظٹط©" })}
        className="p-2 rounded-lg hover:bg-surface-tertiary text-text-secondary hover:text-primary transition-colors"
      >
        <HiOutlineDownload className="w-4 h-4" />
      </button>
    )},
  ]

  const perfSlowQueryColumns = [
    { key: "query", header: "ط§ظ„ط§ط³طھط¹ظ„ط§ظ…", className: "max-w-[300px] truncate font-mono text-xs" },
    { key: "duration", header: "ط§ظ„ظ…ط¯ط© (ط«)", render: (item: { duration: number }) => (
      <span className="text-error font-medium">{item.duration.toFixed(1)}s</span>
    )},
    { key: "executedBy", header: "ط§ظ„ظ…ظ†ظپط°" },
  ]

  const perfEndpointColumns = [
    { key: "endpoint", header: "API ظ†ظ‚ط·ط©", className: "font-mono text-xs" },
    { key: "method", header: "ط§ظ„ط·ط±ظٹظ‚ط©", render: (item: { method: string }) => (
      <Badge variant={item.method === "GET" ? "success" : "warning"} size="sm">{item.method}</Badge>
    )},
    { key: "calls", header: "ط§ظ„ط·ظ„ط¨ط§طھ" },
    { key: "avgMs", header: "ظ…طھظˆط³ط· (ظ…ظ„ظ„ظٹ)", render: (item: { avgMs: number }) => (
      <span className={item.avgMs > 1000 ? "text-error font-medium" : "text-text"}>{item.avgMs.toLocaleString()}ms</span>
    )},
    { key: "p99Ms", header: "P99 (ظ…ظ„ظ„ظٹ)", render: (item: { p99Ms: number }) => (
      <span className={item.p99Ms > 1000 ? "text-warning font-medium" : "text-text-tertiary"}>{item.p99Ms.toLocaleString()}ms</span>
    )},
  ]

  const filteredLogin = useMemo(() => filterBySearch(filterByDate(loginData)), [loginData, search, dateRange])
  const filteredErrors = useMemo(() => filterBySearch(filterByDate(errorData)), [errorData, search, dateRange])
  const filteredBackup = useMemo(() => filterBySearch(filterByDate(backupData)), [backupData, search, dateRange])

  return (
    <div className="min-h-screen">
      <DashboardHeader
        title="ط³ط¬ظ„ ط§ظ„ظ†ط¸ط§ظ…"
        subtitle="ظ…ط±ط§ظ‚ط¨ط© ظˆطھطھط¨ط¹ ط¬ظ…ظٹط¹ ط£ط­ط¯ط§ط« ط§ظ„ظ†ط¸ط§ظ…"
      />

      <div className="p-4 md:p-6 space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex items-center gap-3 flex-wrap">
              <SearchInput value={search} onChange={setSearch} placeholder="ط¨ط­ط« ظپظٹ ط§ظ„ط³ط¬ظ„ط§طھ..." className="w-64" />
              <div className="flex items-center gap-2 bg-surface border border-border rounded-lg px-3 py-2 text-sm">
                <HiOutlineCalendar className="w-4 h-4 text-text-tertiary" />
                <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}
                  className="bg-transparent text-text focus:outline-none text-sm"
                >
                  <option value="all">ظƒظ„ ط§ظ„ظپطھط±ط§طھ</option>
                  <option value="24h">ط¢ط®ط± 24 ط³ط§ط¹ط©</option>
                  <option value="7d">ط¢ط®ط± 7 ط£ظٹط§ظ…</option>
                  <option value="30d">ط¢ط®ط± 30 ظٹظˆظ…</option>
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
                طھظ„ظ‚ط§ط¦ظٹ
              </button>
              <button type="button" onClick={handleManualRefresh}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-surface border border-border text-text-secondary hover:bg-surface-secondary transition-all"
              >
                <HiOutlineSwitchHorizontal className="w-4 h-4" />
                طھط­ط¯ظٹط«
              </button>
              <Button variant="primary" size="sm" leftIcon={<HiOutlineDownload className="w-4 h-4" />} onClick={handleExport}>
                طھطµط¯ظٹط± CSV
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
                          <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ظ…ط­ط§ظˆظ„ط§طھ ط§ظ„ط¯ط®ظˆظ„" value={loginData.length} icon={HiOutlineLogin} color="primary" delay={0} />
                          <StatsCard title="ظ…ط­ط§ظˆظ„ط§طھ ظ†ط§ط¬ط­ط©" value={loginData.filter((l) => l.status === "success").length} icon={HiOutlineCheckCircle} color="success" delay={0.05} />
                          <StatsCard title="ظ…ط­ط§ظˆظ„ط§طھ ظپط§ط´ظ„ط©" value={loginData.filter((l) => l.status === "failed").length} icon={HiOutlineXCircle} color="error" delay={0.1} />
                          <StatsCard title="ظ…ط³طھط®ط¯ظ…ظٹظ† ظپط±ظٹط¯ظٹظ†" value={new Set(loginData.map((l) => l.userName)).size} icon={HiOutlineUser} color="info" delay={0.15} />
                        </div>
                        <Table columns={loginColumns} data={filteredLogin} />
                      </TabPanel>

                      <TabPanel id="errors" activeTab={activeTab}>
                        <div className="mb-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط£ط®ط·ط§ط،" value={errorData.length} icon={HiOutlineExclamationCircle} color="error" delay={0} />
                          <StatsCard title="ط­ط±ط¬ط©" value={errorData.filter((e) => e.severity === "critical").length} icon={HiOutlineExclamation} color="error" delay={0.05} />
                          <StatsCard title="طھط­ط°ظٹط±ط§طھ" value={errorData.filter((e) => e.severity === "warning").length} icon={HiOutlineExclamation} color="warning" delay={0.1} />
                          <StatsCard title="ظ…ط¹ظ„ظˆظ…ط§طھ" value={errorData.filter((e) => e.severity === "info").length} icon={HiOutlineInformationCircle} color="info" delay={0.15} />
                        </div>
                        <Table columns={errorColumns} data={filteredErrors} />
                      </TabPanel>

                      <TabPanel id="performance" activeTab={activeTab}>
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatsCard title="طھط­ظ…ظٹظ„ ط§ظ„ط®ط§ط¯ظ…" value={`${perfData.serverLoad}%`} icon={HiOutlineServer} color="warning" delay={0} />
                            <StatsCard title="ظ…طھظˆط³ط· ط²ظ…ظ† ط§ظ„ط§ط³طھط¬ط§ط¨ط©" value="528ms" icon={HiOutlineClock} color="primary" change={{ value: 12, isPositive: false }} delay={0.05} />
                            <StatsCard title="ط£ظ‚طµظ‰ ط²ظ…ظ† ط§ط³طھط¬ط§ط¨ط©" value="2.8s" icon={HiOutlineTrendingUp} color="error" delay={0.1} />
                            <StatsCard title="ط§ط³طھط¹ظ„ط§ظ…ط§طھ ط¨ط·ظٹط¦ط©" value={perfData.slowQueries.length} icon={HiOutlineDatabase} color="info" delay={0.15} />
                          </div>

                          <Card>
                            <CardHeader>
                              <CardTitle>ظ…طھظˆط³ط· ط²ظ…ظ† ط§ظ„ط§ط³طھط¬ط§ط¨ط© (ط®ظ„ط§ظ„ 24 ط³ط§ط¹ط©)</CardTitle>
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
                              <CardHeader><CardTitle>ط£ط¨ط·ط£ ط§ظ„ط§ط³طھط¹ظ„ط§ظ…ط§طھ</CardTitle></CardHeader>
                              <CardContent className="p-0">
                                <Table columns={perfSlowQueryColumns} data={perfData.slowQueries} />
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader><CardTitle>ط¥ط­طµط§ط¦ظٹط§طھ ظ†ظ‚ط§ط· API</CardTitle></CardHeader>
                              <CardContent className="p-0">
                                <Table columns={perfEndpointColumns} data={perfData.endpoints} />
                              </CardContent>
                            </Card>
                          </div>

                          <Card>
                            <CardHeader><CardTitle>ظ…ط¤ط´ط± طھط­ظ…ظٹظ„ ط§ظ„ط®ط§ط¯ظ…</CardTitle></CardHeader>
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
                                {perfData.serverLoad > 80 ? "طھط­ظ…ظٹظ„ ظ…ط±طھظپط¹ - ظٹظˆطµظ‰ ط¨ظ…ط±ط§ط¬ط¹ط© ط§ظ„ظ…ظˆط§ط±ط¯" :
                                 perfData.serverLoad > 60 ? "طھط­ظ…ظٹظ„ ظ…طھظˆط³ط·" : "طھط­ظ…ظٹظ„ ظ…ظ†ط®ظپط¶ - ط§ظ„ط£ط¯ط§ط، ط¬ظٹط¯"}
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </TabPanel>

                      <TabPanel id="database" activeTab={activeTab}>
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <StatsCard title="ط­ط¬ظ… ظ‚ط§ط¹ط¯ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ" value={dbData.tableSize} icon={HiOutlineDatabase} color="primary" delay={0} />
                            <StatsCard title="ط§ظ„ط§طھطµط§ظ„ط§طھ ط§ظ„ظ†ط´ط·ط©" value={`${dbData.activeConnections}/${dbData.maxConnections}`} icon={HiOutlineGlobe} color="success" delay={0.05} />
                            <StatsCard title="ط§ط³طھط¹ظ„ط§ظ…ط§طھ ط¨ط·ظٹط¦ط©" value={dbData.slowQueries} icon={HiOutlineClock} color="warning" delay={0.1} />
                            <StatsCard title="ظ…ط¹ط¯ظ„ hit ط°ط§ظƒط±ط© ط§ظ„طھط®ط²ظٹظ†" value={`${dbData.cacheHitRate}%`} icon={HiOutlineChartBar} color="info" delay={0.15} />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Card>
                              <CardHeader><CardTitle>ط¢ط®ط± طھظ†ط¸ظٹظپ (Vacuum)</CardTitle></CardHeader>
                              <CardContent>
                                <p className="text-lg font-medium text-text">{dbData.lastVacuum}</p>
                                <Badge variant="success" size="sm" className="mt-2">ظ…ظƒطھظ…ظ„</Badge>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader><CardTitle>ط­ط¬ظ… ط§ظ„ط¬ط¯ط§ظˆظ„</CardTitle></CardHeader>
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
                              <CardHeader><CardTitle>ظ…ط¤ط´ط± ط§ظ„ط£ط¯ط§ط،</CardTitle></CardHeader>
                              <CardContent className="space-y-3">
                                {[
                                  { label: "ط§طھطµط§ظ„ط§طھ ظ…طھط§ط­ط©", value: 77, total: 100, color: "success" },
                                  { label: "ظ…ط³ط§ط­ط© ظ…طھط¨ظ‚ظٹط©", value: 35, total: 100, color: "warning" },
                                  { label: "طµط­ط© ظ‚ط§ط¹ط¯ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ", value: 92, total: 100, color: "success" },
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
                            <CardHeader><CardTitle>ط§طھط¬ط§ظ‡ ط¹ط¯ط¯ ط§ظ„ط§ط³طھط¹ظ„ط§ظ…ط§طھ</CardTitle></CardHeader>
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
                          <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظ†ط³ط®" value={backupData.length} icon={HiOutlineCloudUpload} color="primary" delay={0} />
                          <StatsCard title="ظ†ط§ط¬ط­ط©" value={backupData.filter((b) => b.status === "ظ†ط¬ط§ط­").length} icon={HiOutlineCheckCircle} color="success" delay={0.05} />
                          <StatsCard title="ظپط§ط´ظ„ط©" value={backupData.filter((b) => b.status === "ظپط´ظ„").length} icon={HiOutlineXCircle} color="error" delay={0.1} />
                          <StatsCard title="ط¢ط®ط± ظ†ط³ط®ط©" value={formatDate(backupData[0]?.date || new Date())} icon={HiOutlineCalendar} color="info" delay={0.15} />
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

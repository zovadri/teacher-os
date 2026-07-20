"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineShieldCheck, HiOutlineDeviceMobile, HiOutlineChartBar,
  HiOutlineCog, HiOutlineXCircle, HiOutlineCheckCircle,
  HiOutlinePlay, HiOutlineStop, HiOutlineLockClosed,
} from "react-icons/hi"
import toast from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Tabs, TabPanel } from "@/components/ui/Tabs"
import { Progress } from "@/components/ui/Progress"
import Button from "@/components/ui/Button"
import { SearchInput } from "@/components/ui/SearchInput"
import { CardSkeleton, StatsSkeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { ErrorState } from "@/components/ui/ErrorState"
import { cn, formatDate, formatRelativeTime } from "@/lib/utils"
import { mockVideoSessions, mockDevices, mockWatchProgress } from "@/lib/mock/data"

const deviceTypeLabels: Record<string, string> = { desktop: "ط¸ئ’ط¸â€¦ط·آ¨ط¸ظ¹ط¸ث†ط·ع¾ط·آ±", mobile: "ط·آ¬ط¸ث†ط·آ§ط¸â€‍", tablet: "ط¸â€‍ط¸ث†ط·آ­ط¸ظ¹", laptop: "ط¸â€‍ط·آ§ط·آ¨ط·ع¾ط¸ث†ط·آ¨", watch: "ط·آ³ط·آ§ط·آ¹ط·آ©" }

export default function VideoProtectionPage() {
  const [sessions, setSessions] = useState(mockVideoSessions)
  const [devices, setDevices] = useState(mockDevices)
  const [progress] = useState(mockWatchProgress)
  const [watermark, setWatermark] = useState({ name: true, id: true, courseName: true, positionInterval: 10 })
  const [maxDevices, setMaxDevices] = useState(3)
  const [sessionTimeout, setSessionTimeout] = useState(30)
  const [activeTab, setActiveTab] = useState("sessions")
  const [sessionSearch, setSessionSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [tabLoading, setTabLoading] = useState<Record<string, boolean>>({})

  const loadData = useCallback(() => {
    setIsLoading(true)
    setHasError(false)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const stats = useMemo(() => ({
    activeSessions: sessions.filter((s) => s.active).length,
    totalDevices: devices.length,
    trustedDevices: devices.filter((d) => d.trusted).length,
    inProgress: progress.filter((p) => !p.completed).length,
  }), [sessions, devices, progress])

  const handleEndSession = (sessionId: string) => {
    setSessions((prev) => prev.map((s) => s.id === sessionId ? { ...s, active: false } : s))
    toast.success("ط·ع¾ط¸â€¦ ط·آ¥ط¸â€ ط¸â€،ط·آ§ط·طŒ ط·آ§ط¸â€‍ط·آ¬ط¸â€‍ط·آ³ط·آ© ط·آ¨ط¸â€ ط·آ¬ط·آ§ط·آ­")
  }

  const handleToggleTrust = (deviceId: string) => {
    setDevices((prev) => prev.map((d) => d.id === deviceId ? { ...d, trusted: !d.trusted } : d))
    const device = devices.find((d) => d.id === deviceId)
    toast.success(device?.trusted ? "ط·ع¾ط¸â€¦ ط·آ­ط·آ¸ط·آ± ط·آ§ط¸â€‍ط·آ¬ط¸â€،ط·آ§ط·آ²" : "ط·ع¾ط¸â€¦ ط·آ§ط¸â€‍ط·آ³ط¸â€¦ط·آ§ط·آ­ ط¸â€‍ط¸â€‍ط·آ¬ط¸â€،ط·آ§ط·آ²")
  }

  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      if (activeTab !== "sessions") return true
      return s.deviceName.includes(sessionSearch) || s.ip.includes(sessionSearch)
    })
  }, [sessions, sessionSearch, activeTab])

  if (hasError) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <Breadcrumb items={[{ label: "ط§ظ„ظپظٹط¯ظٹظˆظ‡ط§طھ", href: "/teacher/videos" }, { label: "ط­ظ…ط§ظٹط© ط§ظ„ظپظٹط¯ظٹظˆ" }]} />
        <DashboardHeader title="ط·آ­ط¸â€¦ط·آ§ط¸ظ¹ط·آ© ط·آ§ط¸â€‍ط¸ظ¾ط¸ظ¹ط·آ¯ط¸ظ¹ط¸ث†ط¸â€،ط·آ§ط·ع¾" subtitle="ط¸â€ ط·آ¸ط·آ§ط¸â€¦ ط·آ­ط¸â€¦ط·آ§ط¸ظ¹ط·آ© ط·آ§ط¸â€‍ط¸â€¦ط·آ­ط·ع¾ط¸ث†ط¸â€°" />
        <ErrorState onRetry={() => { setHasError(false); loadData() }} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <Breadcrumb items={[{ label: "ط§ظ„ظپظٹط¯ظٹظˆظ‡ط§طھ", href: "/teacher/videos" }, { label: "ط­ظ…ط§ظٹط© ط§ظ„ظپظٹط¯ظٹظˆ" }]} />
      <DashboardHeader title="ط·آ­ط¸â€¦ط·آ§ط¸ظ¹ط·آ© ط·آ§ط¸â€‍ط¸ظ¾ط¸ظ¹ط·آ¯ط¸ظ¹ط¸ث†ط¸â€،ط·آ§ط·ع¾" subtitle="ط¸â€ ط·آ¸ط·آ§ط¸â€¦ ط·آ­ط¸â€¦ط·آ§ط¸ظ¹ط·آ© ط·آ§ط¸â€‍ط¸â€¦ط·آ­ط·ع¾ط¸ث†ط¸â€° ط·آ§ط¸â€‍ط·آ±ط¸â€ڑط¸â€¦ط¸ظ¹" />

      {isLoading ? (
        <StatsSkeleton count={4} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="ط·آ§ط¸â€‍ط·آ¬ط¸â€‍ط·آ³ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط¸â€ ط·آ´ط·آ·ط·آ©" value={stats.activeSessions} icon={HiOutlineShieldCheck} color="primary" />
          <StatsCard title="ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ ط·آ§ط¸â€‍ط·آ£ط·آ¬ط¸â€،ط·آ²ط·آ©" value={stats.totalDevices} icon={HiOutlineDeviceMobile} color="info" subtitle={`${stats.trustedDevices} ط¸â€¦ط¸ث†ط·آ«ط¸ث†ط¸â€ڑ`} />
          <StatsCard title="ط¸â€ڑط¸ظ¹ط·آ¯ ط·آ§ط¸â€‍ط¸â€¦ط·آ´ط·آ§ط¸â€،ط·آ¯ط·آ©" value={stats.inProgress} icon={HiOutlineChartBar} color="warning" />
          <StatsCard title="ط·آ§ط¸â€‍ط·آ£ط·آ¬ط¸â€،ط·آ²ط·آ© ط·آ§ط¸â€‍ط¸â€¦ط¸ث†ط·آ«ط¸ث†ط¸â€ڑط·آ©" value={stats.trustedDevices} icon={HiOutlineLockClosed} color="success" />
        </motion.div>
      )}

      <Tabs
        tabs={[
          { id: "sessions", label: "ط·آ§ط¸â€‍ط·آ¬ط¸â€‍ط·آ³ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط¸â€ ط·آ´ط·آ·ط·آ©", icon: <HiOutlinePlay className="w-4 h-4" />, count: stats.activeSessions },
          { id: "devices", label: "ط·آ§ط¸â€‍ط·آ£ط·آ¬ط¸â€،ط·آ²ط·آ©", icon: <HiOutlineDeviceMobile className="w-4 h-4" />, count: stats.totalDevices },
          { id: "progress", label: "ط·ع¾ط¸â€ڑط·آ¯ط¸â€¦ ط·آ§ط¸â€‍ط¸â€¦ط·آ´ط·آ§ط¸â€،ط·آ¯ط·آ©", icon: <HiOutlineChartBar className="w-4 h-4" />, count: stats.inProgress },
          { id: "settings", label: "ط·آ§ط¸â€‍ط·آ¥ط·آ¹ط·آ¯ط·آ§ط·آ¯ط·آ§ط·ع¾", icon: <HiOutlineCog className="w-4 h-4" /> },
        ]}
        defaultTab="sessions"
        onChange={(tab) => {
          setActiveTab(tab)
          setTabLoading((prev) => ({ ...prev, [tab]: true }))
          setTimeout(() => setTabLoading((prev) => ({ ...prev, [tab]: false })), 500)
        }}
      >
        {(activeTab) => (
          <>
            <TabPanel id="sessions" activeTab={activeTab}>
              {tabLoading.sessions ? (
                <CardSkeleton count={2} />
              ) : filteredSessions.length === 0 ? (
                <EmptyState icon={HiOutlinePlay} title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·آ¬ط¸â€‍ط·آ³ط·آ§ط·ع¾ ط¸â€ ط·آ´ط·آ·ط·آ©" description="ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¹ ط·آ§ط¸â€‍ط·آ¬ط¸â€‍ط·آ³ط·آ§ط·ع¾ ط¸â€¦ط¸â€ ط·ع¾ط¸â€،ط¸ظ¹ط·آ© ط·آ£ط¸ث† ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·آ¬ط¸â€‍ط·آ³ط·آ§ط·ع¾ ط·آ­ط·آ§ط¸â€‍ط¸ظ¹ط·آ§ط¸â€¹" />
              ) : (
                <div className="space-y-3">
                  <SearchInput value={sessionSearch} onChange={setSessionSearch} placeholder="ط·آ¨ط·آ­ط·آ« ط·آ¨ط·آ¬ط¸â€،ط·آ§ط·آ² ط·آ£ط¸ث† IP..." />
                  {filteredSessions.map((session) => (
                    <Card key={session.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={cn("w-2 h-2 rounded-full", session.active ? "bg-success" : "bg-text-tertiary")} />
                            <span className="font-medium text-text">{session.deviceName}</span>
                            <Badge variant="neutral" size="sm">{deviceTypeLabels[session.deviceType] || session.deviceType}</Badge>
                          </div>
                          <p className="text-xs text-text-tertiary">IP: {session.ip}</p>
                          <p className="text-xs text-text-tertiary">ط·آ¢ط·آ®ط·آ± ط¸â€ ط·آ´ط·آ§ط·آ·: {formatRelativeTime(session.lastActiveAt)}</p>
                        </div>
                        {session.active && (
                          <Button variant="danger" size="xs" leftIcon={<HiOutlineStop className="w-3.5 h-3.5" />} onClick={() => handleEndSession(session.id)}>
                            ط·آ¥ط¸â€ ط¸â€،ط·آ§ط·طŒ ط·آ§ط¸â€‍ط·آ¬ط¸â€‍ط·آ³ط·آ©
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabPanel>

            <TabPanel id="devices" activeTab={activeTab}>
              {tabLoading.devices ? (
                <CardSkeleton count={2} />
              ) : devices.length === 0 ? (
                <EmptyState icon={HiOutlineDeviceMobile} title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·آ£ط·آ¬ط¸â€،ط·آ²ط·آ©" description="ط¸â€‍ط¸â€¦ ط¸ظ¹ط·ع¾ط¸â€¦ ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ ط·آ£ط¸ظ¹ ط·آ£ط·آ¬ط¸â€،ط·آ²ط·آ© ط·آ¨ط·آ¹ط·آ¯" />
              ) : (
                <div className="space-y-3">
                  {devices.map((device) => (
                    <Card key={device.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-text">{device.name}</span>
                            <Badge variant="neutral" size="sm">{deviceTypeLabels[device.type] || device.type}</Badge>
                            <Badge variant={device.trusted ? "success" : "error"} size="sm">{device.trusted ? "ط¸â€¦ط¸ث†ط·آ«ط¸ث†ط¸â€ڑ" : "ط¸â€¦ط·آ­ط·آ¸ط¸ث†ط·آ±"}</Badge>
                          </div>
                          <p className="text-xs text-text-tertiary">{device.os} ط¢آ· {device.browser}</p>
                          <p className="text-xs text-text-tertiary">ط·آ¢ط·آ®ط·آ± ط·آ§ط·آ³ط·ع¾ط·آ®ط·آ¯ط·آ§ط¸â€¦: {formatRelativeTime(device.lastUsed)}</p>
                        </div>
                        <Button type="button"
variant={device.trusted ? "outline" : "primary"}
                          size="xs"
                          leftIcon={device.trusted ? <HiOutlineXCircle className="w-3.5 h-3.5" /> : <HiOutlineCheckCircle className="w-3.5 h-3.5" />}
                          onClick={() => handleToggleTrust(device.id)}
                        >
                          {device.trusted ? "ط·آ­ط·آ¸ط·آ±" : "ط·آ³ط¸â€¦ط·آ§ط·آ­"}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabPanel>

            <TabPanel id="progress" activeTab={activeTab}>
              {tabLoading.progress ? (
                <CardSkeleton count={2} />
              ) : progress.length === 0 ? (
                <EmptyState icon={HiOutlineChartBar} title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط¸â€¦ط·آ´ط·آ§ط¸â€،ط·آ¯ط·آ§ط·ع¾" description="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·ع¾ط¸â€ڑط·آ¯ط¸â€¦ ط¸â€¦ط·آ´ط·آ§ط¸â€،ط·آ¯ط·آ© ط·آ­ط·آ§ط¸â€‍ط¸ظ¹ط·آ§ط¸â€¹" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {progress.slice(0, 12).map((p, idx) => (
                    <Card key={`${p.videoId}-${p.studentId}`} className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-text">ط·آ·ط·آ§ط¸â€‍ط·آ¨ {p.studentId.replace("s-", "")}</span>
                          <Badge variant={p.completed ? "success" : "warning"} size="sm">{p.completed ? "ط¸â€¦ط¸ئ’ط·ع¾ط¸â€¦ط¸â€‍" : "ط¸â€ڑط¸ظ¹ط·آ¯ ط·آ§ط¸â€‍ط¸â€¦ط·آ´ط·آ§ط¸â€،ط·آ¯ط·آ©"}</Badge>
                        </div>
                        <Progress value={p.progress} variant={p.completed ? "success" : "primary"} showLabel />
                        <div className="flex items-center justify-between text-xs text-text-tertiary">
                          <span>ط·آ¹ط·آ¯ط·آ¯ ط·آ§ط¸â€‍ط¸â€¦ط·آ´ط·آ§ط¸â€،ط·آ¯ط·آ§ط·ع¾: {p.completions}</span>
                          <span>ط·آ¢ط·آ®ط·آ± ط¸â€¦ط·آ´ط·آ§ط¸â€،ط·آ¯ط·آ©: {formatRelativeTime(p.lastWatchedAt)}</span>
                        </div>
                        <button type="button" className="text-xs text-primary hover:text-primary-dark font-medium">
                          ط¸â€¦ط·ع¾ط·آ§ط·آ¨ط·آ¹ط·آ© ط·آ§ط¸â€‍ط¸â€¦ط·آ´ط·آ§ط¸â€،ط·آ¯ط·آ©
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabPanel>

            <TabPanel id="settings" activeTab={activeTab}>
              {tabLoading.settings ? (
                <CardSkeleton count={2} />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>ط·آ¥ط·آ¹ط·آ¯ط·آ§ط·آ¯ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·آ¹ط¸â€‍ط·آ§ط¸â€¦ط·آ© ط·آ§ط¸â€‍ط¸â€¦ط·آ§ط·آ¦ط¸ظ¹ط·آ©</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text">ط·آ¥ط·آ¸ط¸â€،ط·آ§ط·آ± ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط¸â€¦ط·آ³ط·ع¾ط·آ®ط·آ¯ط¸â€¦</span>
                      <button type="button" onClick={() => setWatermark({ ...watermark, name: !watermark.name })} className={cn("w-12 h-6 rounded-full transition-colors relative", watermark.name ? "bg-primary" : "bg-surface-tertiary")}>
                        <span className={cn("absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform", watermark.name ? "translate-x-6" : "translate-x-0.5")} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text">ط·آ¥ط·آ¸ط¸â€،ط·آ§ط·آ± ط·آ§ط¸â€‍ط¸â€¦ط·آ¹ط·آ±ط¸ظ¾</span>
                      <button type="button" onClick={() => setWatermark({ ...watermark, id: !watermark.id })} className={cn("w-12 h-6 rounded-full transition-colors relative", watermark.id ? "bg-primary" : "bg-surface-tertiary")}>
                        <span className={cn("absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform", watermark.id ? "translate-x-6" : "translate-x-0.5")} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text">ط·آ¥ط·آ¸ط¸â€،ط·آ§ط·آ± ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³</span>
                      <button type="button" onClick={() => setWatermark({ ...watermark, courseName: !watermark.courseName })} className={cn("w-12 h-6 rounded-full transition-colors relative", watermark.courseName ? "bg-primary" : "bg-surface-tertiary")}>
                        <span className={cn("absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform", watermark.courseName ? "translate-x-6" : "translate-x-0.5")} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-text mb-1">ط¸ظ¾ط·آ§ط·آµط¸â€‍ ط·ع¾ط·ط›ط¸ظ¹ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط¸â€¦ط¸ث†ط·آ¶ط·آ¹ (ط·آ«ط¸ث†ط·آ§ط¸â€ ط¸ع†)</label>
                        <input type="number" value={watermark.positionInterval} onChange={(e) => setWatermark({ ...watermark, positionInterval: Number(e.target.value) })} className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text" />
                      </div>
                      <div>
                        <label className="block text-sm text-text mb-1">ط·آ§ط¸â€‍ط·آ­ط·آ¯ ط·آ§ط¸â€‍ط·آ£ط¸â€ڑط·آµط¸â€° ط¸â€‍ط¸â€‍ط·آ£ط·آ¬ط¸â€،ط·آ²ط·آ©</label>
                        <input type="number" value={maxDevices} onChange={(e) => setMaxDevices(Number(e.target.value))} className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-text mb-1">ط¸â€¦ط¸â€،ط¸â€‍ط·آ© ط·آ§ط¸â€‍ط·آ¬ط¸â€‍ط·آ³ط·آ© (ط·آ¯ط¸â€ڑط·آ§ط·آ¦ط¸â€ڑ)</label>
                      <input type="number" value={sessionTimeout} onChange={(e) => setSessionTimeout(Number(e.target.value))} className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text" />
                    </div>
                    <Button variant="primary" onClick={() => toast.success("ط·ع¾ط¸â€¦ ط·آ­ط¸ظ¾ط·آ¸ ط·آ§ط¸â€‍ط·آ¥ط·آ¹ط·آ¯ط·آ§ط·آ¯ط·آ§ط·ع¾")}>ط·آ­ط¸ظ¾ط·آ¸ ط·آ§ط¸â€‍ط·آ¥ط·آ¹ط·آ¯ط·آ§ط·آ¯ط·آ§ط·ع¾</Button>
                  </CardContent>
                </Card>
              )}
            </TabPanel>
          </>
        )}
      </Tabs>
    </div>
  )
}

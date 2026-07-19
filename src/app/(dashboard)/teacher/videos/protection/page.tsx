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

const deviceTypeLabels: Record<string, string> = { desktop: "ظƒظ…ط¨ظٹظˆطھط±", mobile: "ط¬ظˆط§ظ„", tablet: "ظ„ظˆط­ظٹ", laptop: "ظ„ط§ط¨طھظˆط¨", watch: "ط³ط§ط¹ط©" }

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
    toast.success("طھظ… ط¥ظ†ظ‡ط§ط، ط§ظ„ط¬ظ„ط³ط© ط¨ظ†ط¬ط§ط­")
  }

  const handleToggleTrust = (deviceId: string) => {
    setDevices((prev) => prev.map((d) => d.id === deviceId ? { ...d, trusted: !d.trusted } : d))
    const device = devices.find((d) => d.id === deviceId)
    toast.success(device?.trusted ? "طھظ… ط­ط¸ط± ط§ظ„ط¬ظ‡ط§ط²" : "طھظ… ط§ظ„ط³ظ…ط§ط­ ظ„ظ„ط¬ظ‡ط§ط²")
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
        <Breadcrumb items={[{ label: "الفيديوهات", href: "/teacher/videos" }, { label: "حماية الفيديو" }]} />
        <DashboardHeader title="ط­ظ…ط§ظٹط© ط§ظ„ظپظٹط¯ظٹظˆظ‡ط§طھ" subtitle="ظ†ط¸ط§ظ… ط­ظ…ط§ظٹط© ط§ظ„ظ…ط­طھظˆظ‰" />
        <ErrorState onRetry={() => { setHasError(false); loadData() }} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <Breadcrumb items={[{ label: "الفيديوهات", href: "/teacher/videos" }, { label: "حماية الفيديو" }]} />
      <DashboardHeader title="ط­ظ…ط§ظٹط© ط§ظ„ظپظٹط¯ظٹظˆظ‡ط§طھ" subtitle="ظ†ط¸ط§ظ… ط­ظ…ط§ظٹط© ط§ظ„ظ…ط­طھظˆظ‰ ط§ظ„ط±ظ‚ظ…ظٹ" />

      {isLoading ? (
        <StatsSkeleton count={4} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="ط§ظ„ط¬ظ„ط³ط§طھ ط§ظ„ظ†ط´ط·ط©" value={stats.activeSessions} icon={HiOutlineShieldCheck} color="primary" />
          <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط£ط¬ظ‡ط²ط©" value={stats.totalDevices} icon={HiOutlineDeviceMobile} color="info" subtitle={`${stats.trustedDevices} ظ…ظˆط«ظˆظ‚`} />
          <StatsCard title="ظ‚ظٹط¯ ط§ظ„ظ…ط´ط§ظ‡ط¯ط©" value={stats.inProgress} icon={HiOutlineChartBar} color="warning" />
          <StatsCard title="ط§ظ„ط£ط¬ظ‡ط²ط© ط§ظ„ظ…ظˆط«ظˆظ‚ط©" value={stats.trustedDevices} icon={HiOutlineLockClosed} color="success" />
        </motion.div>
      )}

      <Tabs
        tabs={[
          { id: "sessions", label: "ط§ظ„ط¬ظ„ط³ط§طھ ط§ظ„ظ†ط´ط·ط©", icon: <HiOutlinePlay className="w-4 h-4" />, count: stats.activeSessions },
          { id: "devices", label: "ط§ظ„ط£ط¬ظ‡ط²ط©", icon: <HiOutlineDeviceMobile className="w-4 h-4" />, count: stats.totalDevices },
          { id: "progress", label: "طھظ‚ط¯ظ… ط§ظ„ظ…ط´ط§ظ‡ط¯ط©", icon: <HiOutlineChartBar className="w-4 h-4" />, count: stats.inProgress },
          { id: "settings", label: "ط§ظ„ط¥ط¹ط¯ط§ط¯ط§طھ", icon: <HiOutlineCog className="w-4 h-4" /> },
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
                <EmptyState icon={HiOutlinePlay} title="ظ„ط§ طھظˆط¬ط¯ ط¬ظ„ط³ط§طھ ظ†ط´ط·ط©" description="ط¬ظ…ظٹط¹ ط§ظ„ط¬ظ„ط³ط§طھ ظ…ظ†طھظ‡ظٹط© ط£ظˆ ظ„ط§ طھظˆط¬ط¯ ط¬ظ„ط³ط§طھ ط­ط§ظ„ظٹط§ظ‹" />
              ) : (
                <div className="space-y-3">
                  <SearchInput value={sessionSearch} onChange={setSessionSearch} placeholder="ط¨ط­ط« ط¨ط¬ظ‡ط§ط² ط£ظˆ IP..." />
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
                          <p className="text-xs text-text-tertiary">ط¢ط®ط± ظ†ط´ط§ط·: {formatRelativeTime(session.lastActiveAt)}</p>
                        </div>
                        {session.active && (
                          <button type="button" variant="danger" size="xs" leftIcon={<HiOutlineStop className="w-3.5 h-3.5" />} onClick={() => handleEndSession(session.id)}>
                            ط¥ظ†ظ‡ط§ط، ط§ظ„ط¬ظ„ط³ط©
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
                <EmptyState icon={HiOutlineDeviceMobile} title="ظ„ط§ طھظˆط¬ط¯ ط£ط¬ظ‡ط²ط©" description="ظ„ظ… ظٹطھظ… طھط³ط¬ظٹظ„ ط£ظٹ ط£ط¬ظ‡ط²ط© ط¨ط¹ط¯" />
              ) : (
                <div className="space-y-3">
                  {devices.map((device) => (
                    <Card key={device.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-text">{device.name}</span>
                            <Badge variant="neutral" size="sm">{deviceTypeLabels[device.type] || device.type}</Badge>
                            <Badge variant={device.trusted ? "success" : "error"} size="sm">{device.trusted ? "ظ…ظˆط«ظˆظ‚" : "ظ…ط­ط¸ظˆط±"}</Badge>
                          </div>
                          <p className="text-xs text-text-tertiary">{device.os} آ· {device.browser}</p>
                          <p className="text-xs text-text-tertiary">ط¢ط®ط± ط§ط³طھط®ط¯ط§ظ…: {formatRelativeTime(device.lastUsed)}</p>
                        </div>
                        <button type="button"`nvariant={device.trusted ? "outline" : "primary"}
                          size="xs"
                          leftIcon={device.trusted ? <HiOutlineXCircle className="w-3.5 h-3.5" /> : <HiOutlineCheckCircle className="w-3.5 h-3.5" />}
                          onClick={() => handleToggleTrust(device.id)}
                        >
                          {device.trusted ? "ط­ط¸ط±" : "ط³ظ…ط§ط­"}
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
                <EmptyState icon={HiOutlineChartBar} title="ظ„ط§ طھظˆط¬ط¯ ظ…ط´ط§ظ‡ط¯ط§طھ" description="ظ„ط§ طھظˆط¬ط¯ طھظ‚ط¯ظ… ظ…ط´ط§ظ‡ط¯ط© ط­ط§ظ„ظٹط§ظ‹" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {progress.slice(0, 12).map((p, idx) => (
                    <Card key={`${p.videoId}-${p.studentId}`} className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-text">ط·ط§ظ„ط¨ {p.studentId.replace("s-", "")}</span>
                          <Badge variant={p.completed ? "success" : "warning"} size="sm">{p.completed ? "ظ…ظƒطھظ…ظ„" : "ظ‚ظٹط¯ ط§ظ„ظ…ط´ط§ظ‡ط¯ط©"}</Badge>
                        </div>
                        <Progress value={p.progress} variant={p.completed ? "success" : "primary"} showLabel />
                        <div className="flex items-center justify-between text-xs text-text-tertiary">
                          <span>ط¹ط¯ط¯ ط§ظ„ظ…ط´ط§ظ‡ط¯ط§طھ: {p.completions}</span>
                          <span>ط¢ط®ط± ظ…ط´ط§ظ‡ط¯ط©: {formatRelativeTime(p.lastWatchedAt)}</span>
                        </div>
                        <button type="button" className="text-xs text-primary hover:text-primary-dark font-medium">
                          ظ…طھط§ط¨ط¹ط© ط§ظ„ظ…ط´ط§ظ‡ط¯ط©
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
                    <CardTitle>ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ط¹ظ„ط§ظ…ط© ط§ظ„ظ…ط§ط¦ظٹط©</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text">ط¥ط¸ظ‡ط§ط± ط§ط³ظ… ط§ظ„ظ…ط³طھط®ط¯ظ…</span>
                      <button type="button" onClick={() => setWatermark({ ...watermark, name: !watermark.name })} className={cn("w-12 h-6 rounded-full transition-colors relative", watermark.name ? "bg-primary" : "bg-surface-tertiary")}>
                        <span className={cn("absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform", watermark.name ? "translate-x-6" : "translate-x-0.5")} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text">ط¥ط¸ظ‡ط§ط± ط§ظ„ظ…ط¹ط±ظپ</span>
                      <button type="button" onClick={() => setWatermark({ ...watermark, id: !watermark.id })} className={cn("w-12 h-6 rounded-full transition-colors relative", watermark.id ? "bg-primary" : "bg-surface-tertiary")}>
                        <span className={cn("absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform", watermark.id ? "translate-x-6" : "translate-x-0.5")} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text">ط¥ط¸ظ‡ط§ط± ط§ط³ظ… ط§ظ„ظƒظˆط±ط³</span>
                      <button type="button" onClick={() => setWatermark({ ...watermark, courseName: !watermark.courseName })} className={cn("w-12 h-6 rounded-full transition-colors relative", watermark.courseName ? "bg-primary" : "bg-surface-tertiary")}>
                        <span className={cn("absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform", watermark.courseName ? "translate-x-6" : "translate-x-0.5")} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-text mb-1">ظپط§طµظ„ طھط؛ظٹظٹط± ط§ظ„ظ…ظˆط¶ط¹ (ط«ظˆط§ظ†ظچ)</label>
                        <input type="number" value={watermark.positionInterval} onChange={(e) => setWatermark({ ...watermark, positionInterval: Number(e.target.value) })} className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text" />
                      </div>
                      <div>
                        <label className="block text-sm text-text mb-1">ط§ظ„ط­ط¯ ط§ظ„ط£ظ‚طµظ‰ ظ„ظ„ط£ط¬ظ‡ط²ط©</label>
                        <input type="number" value={maxDevices} onChange={(e) => setMaxDevices(Number(e.target.value))} className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-text mb-1">ظ…ظ‡ظ„ط© ط§ظ„ط¬ظ„ط³ط© (ط¯ظ‚ط§ط¦ظ‚)</label>
                      <input type="number" value={sessionTimeout} onChange={(e) => setSessionTimeout(Number(e.target.value))} className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text" />
                    </div>
                    <Button variant="primary" onClick={() => toast.success("طھظ… ط­ظپط¸ ط§ظ„ط¥ط¹ط¯ط§ط¯ط§طھ")}>ط­ظپط¸ ط§ظ„ط¥ط¹ط¯ط§ط¯ط§طھ</Button>
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

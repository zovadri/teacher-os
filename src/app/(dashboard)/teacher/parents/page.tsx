"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineUsers,
  HiOutlineUserGroup,
  HiOutlineExclamation,
  HiOutlineEye,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineChat,
  HiOutlineClock,
  HiOutlineCheck,
  HiOutlineX,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Badge } from "@/components/ui/Badge"
import { Table } from "@/components/ui/Table"
import { Modal } from "@/components/ui/Modal"
import { StatsCard } from "@/components/ui/StatsCard"
import { SearchInput } from "@/components/ui/SearchInput"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { mockParents } from "@/lib/mock/data"
import { EmptyState } from "@/components/ui/EmptyState"
import { formatCurrency, formatDate, det } from "@/lib/utils"
import toast from "react-hot-toast"
import Link from "next/link"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

const statusBadge: Record<string, "success" | "warning"> = {
  active: "success",
  inactive: "warning",
}

const statusLabels: Record<string, string> = {
  active: "ظ†ط´ط·",
  inactive: "ط؛ظٹط± ظ†ط´ط·",
}

const callTypeLabels: Record<string, string> = {
  incoming: "ظˆط§ط±ط¯",
  outgoing: "طµط§ط¯ط±",
}

const msgTypeLabels: Record<string, string> = {
  whatsapp: "ظˆط§طھط³ط§ط¨",
  sms: "ط±ط³ط§ظ„ط© ظ†طµظٹط©",
  email: "ط¨ط±ظٹط¯ ط¥ظ„ظƒطھط±ظˆظ†ظٹ",
}

const msgTypeColors: Record<string, string> = {
  whatsapp: "text-green-600 dark:text-green-400",
  sms: "text-blue-600 dark:text-blue-400",
  email: "text-purple-600 dark:text-purple-400",
}

const msgStatusLabels: Record<string, string> = {
  sent: "ظ…ط±ط³ظ„",
  delivered: "طھظ… ط§ظ„طھط³ظ„ظٹظ…",
  read: "ظ…ظ‚ط±ظˆط،",
  failed: "ظپط´ظ„",
}

const msgStatusColors: Record<string, string> = {
  sent: "bg-blue-500",
  delivered: "bg-amber-500",
  read: "bg-emerald-500",
  failed: "bg-red-500",
}

interface CallRecord {
  id: string; date: Date; time: string; duration: string; type: "incoming" | "outgoing"; notes: string
}

interface MessageRecord {
  id: string; date: Date; preview: string; type: "whatsapp" | "sms" | "email"; status: "sent" | "delivered" | "read" | "failed"
}

interface ParentNote {
  id: string; date: Date; content: string
}

function buildCommData() {
  const callTypes: ("incoming" | "outgoing")[] = ["incoming", "outgoing"]
  const msgTypes: ("whatsapp" | "sms" | "email")[] = ["whatsapp", "sms", "email"]
  const msgStatuses: ("sent" | "delivered" | "read" | "failed")[] = ["sent", "delivered", "read", "failed"]
  const callNotes = ["ظ…ظ†ط§ظ‚ط´ط© طھظ‚ط¯ظ… ط§ظ„ط·ط§ظ„ط¨", "طھط£ظƒظٹط¯ ظ…ظˆط¹ط¯", "ط§ط³طھظپط³ط§ط± ط¹ظ† ط§ظ„ط§ظ…طھط­ط§ظ†", "ظ…طھط§ط¨ط¹ط© طھط­طµظٹظ„", ""]
  const msgPreviews = ["طھط°ظƒظٹط± ط¨ظ…ظˆط¹ط¯ ط§ظ„ط§ظ…طھط­ط§ظ†", "ظ†طھظٹط¬ط© ط§ط®طھط¨ط§ط± ط§ظ„ط·ط§ظ„ط¨", "ط·ظ„ط¨ ط§ط¬طھظ…ط§ط¹", "ظ…طھط§ط¨ط¹ط© ط§ظ„ط­ط¶ظˆط±", "ط¥ط´ط¹ط§ط± ط¨ط§ظ„ط¯ظپط¹"]
  const noteContents = ["ظˆظ„ظٹ ط§ظ„ط£ظ…ط± ظ…طھط¹ط§ظˆظ† ط¬ط¯ط§ظ‹", "طھظ… ط­ظ„ ظ…ط´ظƒظ„ط© ط§ظ„ط¯ظپط¹", "ظٹط­طھط§ط¬ ظ…طھط§ط¨ط¹ط© ط­ط¶ظˆط±", "ط·ظ„ط¨ طھط£ط¬ظٹظ„ ط§ظ„ظ‚ط³ط·"]
  const calls: { parentId: string; records: CallRecord[] }[] = []
  const messages: { parentId: string; records: MessageRecord[] }[] = []
  const notes: { parentId: string; records: ParentNote[] }[] = []

  for (const parent of mockParents) {
    const callCount = 2 + Math.floor(det() * 4)
    const msgCount = 2 + Math.floor(det() * 3)
    const noteCount = Math.floor(det() * 4)
    calls.push({
      parentId: parent.id,
      records: Array.from({ length: callCount }, (_, i) => ({
        id: `call-${parent.id}-${i}`,
        date: new Date(2025, 5 + Math.floor(i / 3), ((i * 7) % 28) + 1),
        time: `${8 + Math.floor(det() * 10)}:${String(Math.floor(det() * 60)).padStart(2, "0")}`,
        duration: `${1 + Math.floor(det() * 14)} ط¯ظ‚ظٹظ‚ط©`,
        type: callTypes[Math.floor(det() * 2)],
        notes: callNotes[Math.floor(det() * callNotes.length)],
      })),
    })
    messages.push({
      parentId: parent.id,
      records: Array.from({ length: msgCount }, (_, i) => ({
        id: `msg-${parent.id}-${i}`,
        date: new Date(2025, 5 + Math.floor(i / 2), ((i * 5) % 28) + 1),
        preview: msgPreviews[Math.floor(det() * msgPreviews.length)],
        type: msgTypes[Math.floor(det() * 3)],
        status: msgStatuses[Math.floor(det() * 4)],
      })),
    })
    notes.push({
      parentId: parent.id,
      records: Array.from({ length: noteCount }, (_, i) => ({
        id: `note-${parent.id}-${i}`,
        date: new Date(2025, 4 + i, ((i * 3) % 28) + 1),
        content: noteContents[Math.floor(det() * noteContents.length)],
      })),
    })
  }
  return { calls, messages, notes }
}

export default function ParentsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedParent, setSelectedParent] = useState<(typeof mockParents)[0] | null>(null)
  const [activeTab, setActiveTab] = useState<"parents" | "communication">("parents")
  const [commParent, setCommParent] = useState<(typeof mockParents)[0] | null>(null)
  const [noteText, setNoteText] = useState("")
  const [localNotes, setLocalNotes] = useState<ParentNote[]>([])

  const commData = useMemo(() => buildCommData(), [])

  const parentCalls = useMemo(
    () => commData.calls.find((c) => c.parentId === commParent?.id)?.records ?? [],
    [commData, commParent],
  )

  const parentMessages = useMemo(
    () => commData.messages.find((m) => m.parentId === commParent?.id)?.records ?? [],
    [commData, commParent],
  )

  const parentNotes = useMemo(
    () => [...(commData.notes.find((n) => n.parentId === commParent?.id)?.records ?? []), ...localNotes]
      .sort((a, b) => b.date.getTime() - a.date.getTime()),
    [commData, commParent, localNotes],
  )

  const stats = useMemo(() => ({
    total: mockParents.length,
    active: mockParents.filter((p) => p.status === "active").length,
    inactive: mockParents.filter((p) => p.status === "inactive").length,
    withIssues: mockParents.filter((p) => p.status === "inactive").length,
    totalMessages: commData.messages.reduce((s, m) => s + m.records.length, 0),
    recentCalls: commData.calls.reduce((s, c) => s + c.records.length, 0),
  }), [commData])

  const filtered = useMemo(() => {
    return mockParents.filter((p) => {
      const matchSearch = p.name.includes(search) || p.phone.includes(search) || p.email.includes(search)
      const matchStatus = statusFilter === "all" || p.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [search, statusFilter])

  const handleAddNote = useCallback(() => {
    if (!noteText.trim() || !commParent) return
    setLocalNotes((prev) => [
      ...prev,
      { id: `local-note-${Date.now()}`, date: new Date(), content: noteText.trim() },
    ])
    setNoteText("")
    toast.success("طھظ… ط¥ط¶ط§ظپط© ط§ظ„ظ…ظ„ط§ط­ط¸ط© ط¨ظ†ط¬ط§ط­")
  }, [noteText, commParent])

  const chartMonths = ["ظٹظ†ط§ظٹط±", "ظپط¨ط±ط§ظٹط±", "ظ…ط§ط±ط³", "ط¥ط¨ط±ظٹظ„", "ظ…ط§ظٹظˆ", "ظٹظˆظ†ظٹظˆ"]

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="ط¥ط¯ط§ط±ط© ط£ظˆظ„ظٹط§ط، ط§ظ„ط£ظ…ظˆط±" subtitle="ط¹ط±ط¶ ظˆط¥ط¯ط§ط±ط© ط£ظˆظ„ظٹط§ط، ط§ظ„ط£ظ…ظˆط± ظˆط£ط¨ظ†ط§ط¦ظ‡ظ… ط§ظ„ظ…ط³ط¬ظ„ظٹظ†" />

      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط£ظˆظ„ظٹط§ط، ط§ظ„ط£ظ…ظˆط±" value={stats.total} icon={HiOutlineUsers} color="primary" />
        <StatsCard title="ظ†ط´ط·" value={stats.active} icon={HiOutlineUserGroup} color="success" />
        <StatsCard title="ط؛ظٹط± ظ†ط´ط·" value={stats.inactive} icon={HiOutlineUserGroup} color="warning" />
        <StatsCard title="ط¨ط­ط§ط¬ط© طھظˆط§طµظ„" value={stats.withIssues} icon={HiOutlineExclamation} color="error" />
        <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط±ط³ط§ط¦ظ„" value={stats.totalMessages} icon={HiOutlineChat} color="info" />
        <StatsCard title="ط§ظ„ظ…ظƒط§ظ„ظ…ط§طھ ط§ظ„ط­ط¯ظٹط«ط©" value={stats.recentCalls} icon={HiOutlinePhone} color="info" />
      </motion.div>

      <motion.div variants={itemVariants} className="flex gap-1 bg-surface-secondary p-1 rounded-xl border border-border w-fit">
        <button type="button"
          onClick={() => setActiveTab("parents")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "parents"
              ? "bg-primary text-white shadow-sm"
              : "text-text-secondary hover:text-text"
          }`}
        >
          ط¥ط¯ط§ط±ط© ط£ظˆظ„ظٹط§ط، ط§ظ„ط£ظ…ظˆط±
        </button>
        <button type="button"
          onClick={() => setActiveTab("communication")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "communication"
              ? "bg-primary text-white shadow-sm"
              : "text-text-secondary hover:text-text"
          }`}
        >
          ط³ط¬ظ„ ط§ظ„طھظˆط§طµظ„
        </button>
      </motion.div>

      {activeTab === "parents" ? (
        <>
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <SearchInput value={search} onChange={setSearch} placeholder="ط¨ط­ط« ط¨ط§ط³ظ… ظˆظ„ظٹ ط§ظ„ط£ظ…ط± ط£ظˆ ط±ظ‚ظ… ط§ظ„ظ‡ط§طھظپ ط£ظˆ ط§ظ„ط¨ط±ظٹط¯..." />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            >
              <option value="all">ط¬ظ…ظٹط¹ ط§ظ„ط­ط§ظ„ط§طھ</option>
              <option value="active">ظ†ط´ط·</option>
              <option value="inactive">ط؛ظٹط± ظ†ط´ط·</option>
            </select>
          </motion.div>

          <motion.div variants={itemVariants}>
            {filtered.length === 0 ? (
              <EmptyState
                icon={HiOutlineUserGroup}
                title="ظ„ط§ ظٹظˆط¬ط¯ ط£ظˆظ„ظٹط§ط، ط£ظ…ظˆط±"
                description="ظ„ظ… ظٹطھظ… ط§ظ„ط¹ط«ظˆط± ط¹ظ„ظ‰ ط£ظˆظ„ظٹط§ط، ط£ظ…ظˆط±"
              />
            ) : (
              <Table
                columns={[
                  { key: "name", header: "ط§ط³ظ… ظˆظ„ظٹ ط§ظ„ط£ظ…ط±", render: (p) => (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 overflow-hidden shrink-0">
                        <img src={p.avatar} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-text truncate">{p.name}</p>
                        <p className="text-xs text-text-tertiary truncate" dir="ltr">{p.email}</p>
                      </div>
                    </div>
                  )},
                  { key: "phone", header: "ط±ظ‚ظ… ط§ظ„ظ‡ط§طھظپ", render: (p) => (
                    <div className="flex items-center gap-1.5 text-sm text-text-secondary" dir="ltr">
                      <HiOutlinePhone size={14} className="text-text-tertiary shrink-0" />
                      <span>{p.phone}</span>
                    </div>
                  )},
                  { key: "email", header: "ط§ظ„ط¨ط±ظٹط¯ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹ" },
                  { key: "childrenCount", header: "ط¹ط¯ط¯ ط§ظ„ط£ط¨ظ†ط§ط،", render: (p) => (
                    <span className="text-sm text-text font-medium">{p.children.length}</span>
                  )},
                  { key: "lastPayment", header: "ط¢ط®ط± ط¯ظپط¹ط©", render: (p) => (
                    <div className="text-sm">
                      <span className="text-text font-medium">{formatCurrency(p.totalPaid)}</span>
                      <span className="text-text-tertiary mr-1">| {formatDate(p.lastPayment)}</span>
                    </div>
                  )},
                  { key: "status", header: "ط§ظ„ط­ط§ظ„ط©", render: (p) => (
                    <Badge variant={statusBadge[p.status]}>{statusLabels[p.status]}</Badge>
                  )},
                  { key: "actions", header: "", render: (p) => (
                    <div className="flex items-center gap-1">
                      <button type="button"
                        onClick={(e) => { e.stopPropagation(); toast.success(`ط¬ط§ط±ظٹ ط§ظ„ط§طھطµط§ظ„ ط¨ظ€ ${p.name}...`) }}
                        className="p-1.5 text-text-tertiary hover:text-emerald-500 hover:bg-emerald-500/5 rounded-lg transition-colors"
                        title="ط§طھطµط§ظ„"
                      >
                        <HiOutlinePhone size={16} />
                      </button>
                      <button type="button"
                        onClick={(e) => { e.stopPropagation(); toast.success(`طھظ… ط¥ط±ط³ط§ظ„ ط±ط³ط§ظ„ط© ط¥ظ„ظ‰ ${p.name}`) }}
                        className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        title="ط±ط³ط§ظ„ط©"
                      >
                        <HiOutlineChat size={16} />
                      </button>
                      <button type="button"
                        onClick={(e) => { e.stopPropagation(); toast.success(`طھظ… ط¥ط±ط³ط§ظ„ ط¨ط±ظٹط¯ ط¥ظ„ظƒطھط±ظˆظ†ظٹ ط¥ظ„ظ‰ ${p.email}`) }}
                        className="p-1.5 text-text-tertiary hover:text-amber-500 hover:bg-amber-500/5 rounded-lg transition-colors"
                        title="ط¨ط±ظٹط¯"
                      >
                        <HiOutlineMail size={16} />
                      </button>
                      <button type="button"
                        onClick={(e) => { e.stopPropagation(); setSelectedParent(p) }}
                        className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        title="ط¹ط±ط¶ ط§ظ„طھظپط§طµظٹظ„"
                      >
                        <HiOutlineEye size={16} />
                      </button>
                    </div>
                  )},
                ]}
                data={filtered}
                onRowClick={(p) => setSelectedParent(p)}
              />
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>ط£ظˆظ„ظٹط§ط، ط§ظ„ط£ظ…ظˆط± ط­ط³ط¨ ط§ظ„ط´ظ‡ط±</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-2 h-32">
                    {Array.from({ length: 6 }, (_, i) => {
                      const height = 30 + det() * 70
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div className="w-full rounded-t-md bg-primary/30 transition-all" style={{ height: `${height}%` }} />
                          <span className="text-xs text-text-tertiary">{chartMonths[i]}</span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>ط­ط§ظ„ط© ط£ظˆظ„ظٹط§ط، ط§ظ„ط£ظ…ظˆط±</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="text-sm text-text-secondary">ظ†ط´ط·</span>
                      </div>
                      <span className="text-sm font-bold text-text">{stats.active}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-amber-500" />
                        <span className="text-sm text-text-secondary">ط؛ظٹط± ظ†ط´ط·</span>
                      </div>
                      <span className="text-sm font-bold text-text">{stats.inactive}</span>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">ط§ظ„ط¥ط¬ظ…ط§ظ„ظٹ</span>
                        <span className="text-sm font-bold text-text">{stats.total}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </>
      ) : (
        <motion.div variants={itemVariants} className="space-y-4">
          {!commParent ? (
            <Card>
              <CardHeader>
                <CardTitle>ط§ط®طھط± ظˆظ„ظٹ ط£ظ…ط±</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-text-secondary mb-4">ط§ط®طھط± ظˆظ„ظٹ ط£ظ…ط± ظ…ظ† ط§ظ„ظ‚ط§ط¦ظ…ط© ظ„ط¹ط±ط¶ ط³ط¬ظ„ ط§ظ„طھظˆط§طµظ„ ط§ظ„ط®ط§طµ ط¨ظ‡</p>
                <Table
                  columns={[
                    { key: "name", header: "ط§ط³ظ… ظˆظ„ظٹ ط§ظ„ط£ظ…ط±", render: (p) => (
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 overflow-hidden shrink-0">
                          <img src={p.avatar} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-medium text-text">{p.name}</span>
                      </div>
                    )},
                    { key: "phone", header: "ط±ظ‚ظ… ط§ظ„ظ‡ط§طھظپ", render: (p) => (
                      <span className="text-sm text-text-secondary" dir="ltr">{p.phone}</span>
                    )},
                    { key: "actions", header: "", render: (p) => (
                      <button type="button"
                        onClick={(e) => { e.stopPropagation(); setCommParent(p) }}
                        className="px-3 py-1.5 text-xs font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        ط¹ط±ط¶ ط§ظ„ط³ط¬ظ„
                      </button>
                    )},
                  ]}
                  data={filtered}
                  onRowClick={(p) => setCommParent(p)}
                />
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between bg-surface border border-border rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 overflow-hidden">
                    <img src={commParent.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text">{commParent.name}</h3>
                    <p className="text-xs text-text-tertiary" dir="ltr">{commParent.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button"
                    onClick={() => toast.success(`ط¬ط§ط±ظٹ ط§ظ„ط§طھطµط§ظ„ ط¨ظ€ ${commParent.name}...`)}
                    className="p-2 text-text-tertiary hover:text-emerald-500 hover:bg-emerald-500/5 rounded-lg transition-colors"
                    title="ط§طھطµط§ظ„"
                  >
                    <HiOutlinePhone size={18} />
                  </button>
                  <button type="button"
                    onClick={() => toast.success(`طھظ… ط¥ط±ط³ط§ظ„ ط±ط³ط§ظ„ط© ط¥ظ„ظ‰ ${commParent.name}`)}
                    className="p-2 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                    title="ط±ط³ط§ظ„ط©"
                  >
                    <HiOutlineChat size={18} />
                  </button>
                  <button type="button"
                    onClick={() => setCommParent(null)}
                    className="text-sm text-primary hover:underline mr-2"
                  >
                    طھط؛ظٹظٹط± ظˆظ„ظٹ ط§ظ„ط£ظ…ط±
                  </button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>ط§ظ„ظ…ظƒط§ظ„ظ…ط§طھ ط§ظ„ط£ط®ظٹط±ط©</CardTitle>
                </CardHeader>
                <CardContent>
                  {parentCalls.length === 0 ? (
                    <p className="text-sm text-text-tertiary text-center py-4">ظ„ط§ طھظˆط¬ط¯ ظ…ظƒط§ظ„ظ…ط§طھ ظ…ط³ط¬ظ„ط©</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-right px-3 py-2 font-semibold text-text-secondary">ط§ظ„طھط§ط±ظٹط®</th>
                            <th className="text-right px-3 py-2 font-semibold text-text-secondary">ط§ظ„ظˆظ‚طھ</th>
                            <th className="text-right px-3 py-2 font-semibold text-text-secondary">ط§ظ„ظ…ط¯ط©</th>
                            <th className="text-right px-3 py-2 font-semibold text-text-secondary">ط§ظ„ظ†ظˆط¹</th>
                            <th className="text-right px-3 py-2 font-semibold text-text-secondary">ظ…ظ„ط§ط­ط¸ط§طھ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {parentCalls.map((call) => (
                            <tr key={call.id} className="border-b border-border last:border-0 hover:bg-surface-secondary transition-colors">
                              <td className="px-3 py-2.5 text-text">{formatDate(call.date)}</td>
                              <td className="px-3 py-2.5 text-text-secondary">{call.time}</td>
                              <td className="px-3 py-2.5 text-text-secondary">{call.duration}</td>
                              <td className="px-3 py-2.5">
                                <Badge variant={call.type === "incoming" ? "success" : "warning"}>
                                  {callTypeLabels[call.type]}
                                </Badge>
                              </td>
                              <td className="px-3 py-2.5 text-text-secondary">{call.notes || "â€”"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ط§ظ„ط±ط³ط§ط¦ظ„</CardTitle>
                </CardHeader>
                <CardContent>
                  {parentMessages.length === 0 ? (
                    <p className="text-sm text-text-tertiary text-center py-4">ظ„ط§ طھظˆط¬ط¯ ط±ط³ط§ط¦ظ„ ظ…ط³ط¬ظ„ط©</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-right px-3 py-2 font-semibold text-text-secondary">ط§ظ„طھط§ط±ظٹط®</th>
                            <th className="text-right px-3 py-2 font-semibold text-text-secondary">ط§ظ„ط±ط³ط§ظ„ط©</th>
                            <th className="text-right px-3 py-2 font-semibold text-text-secondary">ط§ظ„ظ†ظˆط¹</th>
                            <th className="text-right px-3 py-2 font-semibold text-text-secondary">ط§ظ„ط­ط§ظ„ط©</th>
                          </tr>
                        </thead>
                        <tbody>
                          {parentMessages.map((msg) => (
                            <tr key={msg.id} className="border-b border-border last:border-0 hover:bg-surface-secondary transition-colors">
                              <td className="px-3 py-2.5 text-text">{formatDate(msg.date)}</td>
                              <td className="px-3 py-2.5 text-text-secondary">{msg.preview}</td>
                              <td className="px-3 py-2.5">
                                <span className={`text-xs font-medium ${msgTypeColors[msg.type]}`}>
                                  {msgTypeLabels[msg.type]}
                                </span>
                              </td>
                              <td className="px-3 py-2.5">
                                <div className="flex items-center gap-1.5">
                                  <span className={`w-2 h-2 rounded-full ${msgStatusColors[msg.status]}`} />
                                  <span className="text-xs text-text-secondary">{msgStatusLabels[msg.status]}</span>
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

              <Card>
                <CardHeader>
                  <CardTitle>ط§ظ„ظ…ظ„ط§ط­ط¸ط§طھ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="ط£ط¶ظپ ظ…ظ„ط§ط­ط¸ط© ط¹ظ† ظˆظ„ظٹ ط§ظ„ط£ظ…ط±..."
                      rows={3}
                      className="w-full bg-surface border border-border rounded-xl p-3 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                    />
                    <button type="button"
                      onClick={handleAddNote}
                      disabled={!noteText.trim()}
                      className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ط¥ط¶ط§ظپط© ظ…ظ„ط§ط­ط¸ط©
                    </button>
                  </div>
                  {parentNotes.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {parentNotes.map((note) => (
                        <div key={note.id} className="p-3 rounded-xl bg-surface-secondary border border-border">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-text-tertiary">{formatDate(note.date)}</span>
                          </div>
                          <p className="text-sm text-text">{note.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </motion.div>
      )}

      <Modal isOpen={!!selectedParent} onClose={() => setSelectedParent(null)} title="ط¨ظٹط§ظ†ط§طھ ظˆظ„ظٹ ط§ظ„ط£ظ…ط±" size="lg">
        {selectedParent && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 overflow-hidden">
                <img src={selectedParent.avatar} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text">{selectedParent.name}</h3>
                <p className="text-sm text-text-secondary">ظˆظ„ظٹ ط£ظ…ط±</p>
              </div>
              <div className="mr-auto">
                <Badge variant={statusBadge[selectedParent.status]} size="md">
                  {statusLabels[selectedParent.status]}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">ط§ظ„ط¨ط±ظٹط¯ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹ</p>
                <p className="text-sm text-text font-medium" dir="ltr">{selectedParent.email}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">ط±ظ‚ظ… ط§ظ„ظ‡ط§طھظپ</p>
                <p className="text-sm text-text font-medium" dir="ltr">{selectedParent.phone}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظ…ط¯ظپظˆط¹ط§طھ</p>
                <p className="text-sm text-text font-medium">{formatCurrency(selectedParent.totalPaid)}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">ط¢ط®ط± ط¯ظپط¹ط©</p>
                <p className="text-sm text-text font-medium">{formatDate(selectedParent.lastPayment)}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-text mb-3">ط§ظ„ط£ط¨ظ†ط§ط، ط§ظ„ظ…ط³ط¬ظ„ظٹظ†</h4>
              <div className="space-y-2">
                {selectedParent.children.map((child) => (
                  <Link key={child.id} href={`/teacher/students/${child.id}`}>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border hover:bg-primary/5 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                          {child.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text">{child.name}</p>
                          <p className="text-xs text-text-tertiary">{child.grade}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  )
}

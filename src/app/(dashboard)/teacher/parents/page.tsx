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
  active: "نشط",
  inactive: "غير نشط",
}

const callTypeLabels: Record<string, string> = {
  incoming: "وارد",
  outgoing: "صادر",
}

const msgTypeLabels: Record<string, string> = {
  whatsapp: "واتساب",
  sms: "رسالة نصية",
  email: "بريد إلكتروني",
}

const msgTypeColors: Record<string, string> = {
  whatsapp: "text-green-600 dark:text-green-400",
  sms: "text-blue-600 dark:text-blue-400",
  email: "text-purple-600 dark:text-purple-400",
}

const msgStatusLabels: Record<string, string> = {
  sent: "مرسل",
  delivered: "تم التسليم",
  read: "مقروء",
  failed: "فشل",
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
  const callNotes = ["مناقشة تقدم الطالب", "تأكيد موعد", "استفسار عن الامتحان", "متابعة تحصيل", ""]
  const msgPreviews = ["تذكير بموعد الامتحان", "نتيجة اختبار الطالب", "طلب اجتماع", "متابعة الحضور", "إشعار بالدفع"]
  const noteContents = ["ولي الأمر متعاون جداً", "تم حل مشكلة الدفع", "يحتاج متابعة حضور", "طلب تأجيل القسط"]
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
        duration: `${1 + Math.floor(det() * 14)} دقيقة`,
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
    toast.success("تم إضافة الملاحظة بنجاح")
  }, [noteText, commParent])

  const chartMonths = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو"]

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="إدارة أولياء الأمور" subtitle="عرض وإدارة أولياء الأمور وأبنائهم المسجلين" />

      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatsCard title="إجمالي أولياء الأمور" value={stats.total} icon={HiOutlineUsers} color="primary" />
        <StatsCard title="نشط" value={stats.active} icon={HiOutlineUserGroup} color="success" />
        <StatsCard title="غير نشط" value={stats.inactive} icon={HiOutlineUserGroup} color="warning" />
        <StatsCard title="بحاجة تواصل" value={stats.withIssues} icon={HiOutlineExclamation} color="error" />
        <StatsCard title="إجمالي الرسائل" value={stats.totalMessages} icon={HiOutlineChat} color="info" />
        <StatsCard title="المكالمات الحديثة" value={stats.recentCalls} icon={HiOutlinePhone} color="info" />
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
          إدارة أولياء الأمور
        </button>
        <button type="button"
          onClick={() => setActiveTab("communication")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "communication"
              ? "bg-primary text-white shadow-sm"
              : "text-text-secondary hover:text-text"
          }`}
        >
          سجل التواصل
        </button>
      </motion.div>

      {activeTab === "parents" ? (
        <>
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <SearchInput value={search} onChange={setSearch} placeholder="بحث باسم ولي الأمر أو رقم الهاتف أو البريد..." />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
          </motion.div>

          <motion.div variants={itemVariants}>
            {filtered.length === 0 ? (
              <EmptyState
                icon={HiOutlineUserGroup}
                title="لا يوجد أولياء أمور"
                description="لم يتم العثور على أولياء أمور"
              />
            ) : (
              <Table
                columns={[
                  { key: "name", header: "اسم ولي الأمر", render: (p) => (
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
                  { key: "phone", header: "رقم الهاتف", render: (p) => (
                    <div className="flex items-center gap-1.5 text-sm text-text-secondary" dir="ltr">
                      <HiOutlinePhone size={14} className="text-text-tertiary shrink-0" />
                      <span>{p.phone}</span>
                    </div>
                  )},
                  { key: "email", header: "البريد الإلكتروني" },
                  { key: "childrenCount", header: "عدد الأبناء", render: (p) => (
                    <span className="text-sm text-text font-medium">{p.children.length}</span>
                  )},
                  { key: "lastPayment", header: "آخر دفعة", render: (p) => (
                    <div className="text-sm">
                      <span className="text-text font-medium">{formatCurrency(p.totalPaid)}</span>
                      <span className="text-text-tertiary mr-1">| {formatDate(p.lastPayment)}</span>
                    </div>
                  )},
                  { key: "status", header: "الحالة", render: (p) => (
                    <Badge variant={statusBadge[p.status]}>{statusLabels[p.status]}</Badge>
                  )},
                  { key: "actions", header: "", render: (p) => (
                    <div className="flex items-center gap-1">
                      <button type="button"
                        onClick={(e) => { e.stopPropagation(); toast.success(`جاري الاتصال بـ ${p.name}...`) }}
                        className="p-1.5 text-text-tertiary hover:text-emerald-500 hover:bg-emerald-500/5 rounded-lg transition-colors"
                        title="اتصال"
                      >
                        <HiOutlinePhone size={16} />
                      </button>
                      <button type="button"
                        onClick={(e) => { e.stopPropagation(); toast.success(`تم إرسال رسالة إلى ${p.name}`) }}
                        className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        title="رسالة"
                      >
                        <HiOutlineChat size={16} />
                      </button>
                      <button type="button"
                        onClick={(e) => { e.stopPropagation(); toast.success(`تم إرسال بريد إلكتروني إلى ${p.email}`) }}
                        className="p-1.5 text-text-tertiary hover:text-amber-500 hover:bg-amber-500/5 rounded-lg transition-colors"
                        title="بريد"
                      >
                        <HiOutlineMail size={16} />
                      </button>
                      <button type="button"
                        onClick={(e) => { e.stopPropagation(); setSelectedParent(p) }}
                        className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        title="عرض التفاصيل"
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
                  <CardTitle>أولياء الأمور حسب الشهر</CardTitle>
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
                  <CardTitle>حالة أولياء الأمور</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="text-sm text-text-secondary">نشط</span>
                      </div>
                      <span className="text-sm font-bold text-text">{stats.active}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-amber-500" />
                        <span className="text-sm text-text-secondary">غير نشط</span>
                      </div>
                      <span className="text-sm font-bold text-text">{stats.inactive}</span>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-secondary">الإجمالي</span>
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
                <CardTitle>اختر ولي أمر</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-text-secondary mb-4">اختر ولي أمر من القائمة لعرض سجل التواصل الخاص به</p>
                <Table
                  columns={[
                    { key: "name", header: "اسم ولي الأمر", render: (p) => (
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 overflow-hidden shrink-0">
                          <img src={p.avatar} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-medium text-text">{p.name}</span>
                      </div>
                    )},
                    { key: "phone", header: "رقم الهاتف", render: (p) => (
                      <span className="text-sm text-text-secondary" dir="ltr">{p.phone}</span>
                    )},
                    { key: "actions", header: "", render: (p) => (
                      <button type="button"
                        onClick={(e) => { e.stopPropagation(); setCommParent(p) }}
                        className="px-3 py-1.5 text-xs font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        عرض السجل
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
                    onClick={() => toast.success(`جاري الاتصال بـ ${commParent.name}...`)}
                    className="p-2 text-text-tertiary hover:text-emerald-500 hover:bg-emerald-500/5 rounded-lg transition-colors"
                    title="اتصال"
                  >
                    <HiOutlinePhone size={18} />
                  </button>
                  <button type="button"
                    onClick={() => toast.success(`تم إرسال رسالة إلى ${commParent.name}`)}
                    className="p-2 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                    title="رسالة"
                  >
                    <HiOutlineChat size={18} />
                  </button>
                  <button type="button"
                    onClick={() => setCommParent(null)}
                    className="text-sm text-primary hover:underline mr-2"
                  >
                    تغيير ولي الأمر
                  </button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>المكالمات الأخيرة</CardTitle>
                </CardHeader>
                <CardContent>
                  {parentCalls.length === 0 ? (
                    <p className="text-sm text-text-tertiary text-center py-4">لا توجد مكالمات مسجلة</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-right px-3 py-2 font-semibold text-text-secondary">التاريخ</th>
                            <th className="text-right px-3 py-2 font-semibold text-text-secondary">الوقت</th>
                            <th className="text-right px-3 py-2 font-semibold text-text-secondary">المدة</th>
                            <th className="text-right px-3 py-2 font-semibold text-text-secondary">النوع</th>
                            <th className="text-right px-3 py-2 font-semibold text-text-secondary">ملاحظات</th>
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
                              <td className="px-3 py-2.5 text-text-secondary">{call.notes || "”"}</td>
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
                  <CardTitle>الرسائل</CardTitle>
                </CardHeader>
                <CardContent>
                  {parentMessages.length === 0 ? (
                    <p className="text-sm text-text-tertiary text-center py-4">لا توجد رسائل مسجلة</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-right px-3 py-2 font-semibold text-text-secondary">التاريخ</th>
                            <th className="text-right px-3 py-2 font-semibold text-text-secondary">الرسالة</th>
                            <th className="text-right px-3 py-2 font-semibold text-text-secondary">النوع</th>
                            <th className="text-right px-3 py-2 font-semibold text-text-secondary">الحالة</th>
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
                  <CardTitle>الملاحظات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="أضف ملاحظة عن ولي الأمر..."
                      rows={3}
                      className="w-full bg-surface border border-border rounded-xl p-3 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                    />
                    <button type="button"
                      onClick={handleAddNote}
                      disabled={!noteText.trim()}
                      className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      إضافة ملاحظة
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

      <Modal isOpen={!!selectedParent} onClose={() => setSelectedParent(null)} title="بيانات ولي الأمر" size="lg">
        {selectedParent && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 overflow-hidden">
                <img src={selectedParent.avatar} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text">{selectedParent.name}</h3>
                <p className="text-sm text-text-secondary">ولي أمر</p>
              </div>
              <div className="mr-auto">
                <Badge variant={statusBadge[selectedParent.status]} size="md">
                  {statusLabels[selectedParent.status]}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">البريد الإلكتروني</p>
                <p className="text-sm text-text font-medium" dir="ltr">{selectedParent.email}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">رقم الهاتف</p>
                <p className="text-sm text-text font-medium" dir="ltr">{selectedParent.phone}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">إجمالي المدفوعات</p>
                <p className="text-sm text-text font-medium">{formatCurrency(selectedParent.totalPaid)}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">آخر دفعة</p>
                <p className="text-sm text-text font-medium">{formatDate(selectedParent.lastPayment)}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-text mb-3">الأبناء المسجلين</h4>
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

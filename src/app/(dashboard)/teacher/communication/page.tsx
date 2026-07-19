"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineBell, HiOutlineMail, HiOutlinePhone, HiOutlineUserGroup,
  HiOutlineCalendar, HiOutlineClock, HiOutlineCheckCircle, HiOutlineXCircle,
  HiOutlineAcademicCap, HiOutlineChat, HiOutlinePaperAirplane,
  HiOutlineDocumentText, HiOutlineEye, HiOutlineSearch, HiOutlineSupport,
} from "react-icons/hi"
import toast from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Table } from "@/components/ui/Table"
import { EmptyState } from "@/components/ui/EmptyState"

interface LogEntry {
  id: string; student: string; phone: string; message: string; date: string; status: "sent" | "delivered" | "failed"
}
interface EmailEntry {
  id: string; recipient: string; email: string; subject: string; date: string; status: "sent" | "opened" | "failed"
}
interface MailEntry {
  id: string; sender: string; subject: string; date: string; read: boolean
}

const groups = ["مجموعة 1", "مجموعة 2", "مجموعة 3", "مجموعة 4"]
const subjects = ["الكيمياء", "الفيزياء", "الرياضيات", "العربي", "الإنجليزي"]
const filterOptions = ["كل الطلاب", "حسب المجموعة", "حسب الكورس", "المتأخرون", "الغياب"]

const scheduledMessages = [
  { id: "m1", title: "تذكير بامتحان الكيمياء", audience: "مجموعة 1", date: "2026-07-20 10:00", status: "scheduled" as const },
  { id: "m2", title: "تنبيه للغياب", audience: "الطلاب الغائبين", date: "2026-07-19 08:00", status: "sent" as const },
  { id: "m3", title: "استلام واجبات", audience: "المتأخرون", date: "2026-07-22 14:00", status: "draft" as const },
  { id: "m4", title: "اجتماع أولياء الأمور", audience: "كل الطلاب", date: "2026-07-25 18:00", status: "scheduled" as const },
  { id: "m5", title: "نتائج الامتحان", audience: "مجموعة 3", date: "2026-07-18 09:00", status: "sent" as const },
]

const whatsappLogs: LogEntry[] = [
  { id: "w1", student: "أحمد محمد", phone: "01001234567", message: "تذكير بموعد الامتحان", date: "2026-07-18 10:30", status: "delivered" },
  { id: "w2", student: "مريم أحمد", phone: "01002345678", message: "نتيجة الامتحان", date: "2026-07-17 14:00", status: "sent" },
  { id: "w3", student: "يوسف علي", phone: "01003456789", message: "تنبيه غياب", date: "2026-07-16 08:15", status: "failed" },
  { id: "w4", student: "سارة خالد", phone: "01004567890", message: "استلام واجب", date: "2026-07-15 12:45", status: "delivered" },
  { id: "w5", student: "عمر حسن", phone: "01005678901", message: "تأكيد الحضور", date: "2026-07-14 09:00", status: "sent" },
]

const smsLogs: LogEntry[] = [
  { id: "s1", student: "ندى سامي", phone: "01006789012", message: "تنبيه بامتحان الفيزياء", date: "2026-07-18 11:00", status: "delivered" },
  { id: "s2", student: "عبدالرحمن نور", phone: "01007890123", message: "موعد الحصة القادمة", date: "2026-07-17 16:30", status: "sent" },
  { id: "s3", student: "ليلى إبراهيم", phone: "01008901234", message: "نتيجة الامتحان", date: "2026-07-16 10:00", status: "failed" },
  { id: "s4", student: "محمد كريم", phone: "01009012345", message: "تذكير بالواجب", date: "2026-07-15 08:30", status: "delivered" },
]

const emailLogs: EmailEntry[] = [
  { id: "e1", recipient: "أحمد محمد", email: "ahmed@example.com", subject: "تقرير الأداء الأكاديمي", date: "2026-07-18", status: "opened" },
  { id: "e2", recipient: "مريم أحمد", email: "maryam@example.com", subject: "نتائج الامتحانات", date: "2026-07-17", status: "sent" },
  { id: "e3", recipient: "ولاية يوسف علي", email: "parent@example.com", subject: "دعوة اجتماع", date: "2026-07-16", status: "failed" },
  { id: "e4", recipient: "سارة خالد", email: "sara@example.com", subject: "تقرير الحضور", date: "2026-07-15", status: "opened" },
  { id: "e5", recipient: "عمر حسن", email: "omar@example.com", subject: "إشعار بالقسط", date: "2026-07-14", status: "sent" },
]

const internalMail: MailEntry[] = [
  { id: "im1", sender: "أ. خالد صقر", subject: "تعديل جدول الحصص", date: "2026-07-18", read: false },
  { id: "im2", sender: "الإدارة", subject: "اجتماع المدرسين", date: "2026-07-17", read: false },
  { id: "im3", sender: "أ. أحمد سمير", subject: "طلب إجازة", date: "2026-07-16", read: true },
  { id: "im4", sender: "شؤون الطلاب", subject: "بيان غياب الطلاب", date: "2026-07-15", read: true },
  { id: "im5", sender: "المحاسبة", subject: "تسوية الرواتب", date: "2026-07-14", read: false },
]

const tabs = ["رسائل", "بريد داخلي", "واتساب", "رسائل نصية", "بريد إلكتروني"] as const
type Tab = (typeof tabs)[number]

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function CommunicationCenterPage() {
  const [activeTab, setActiveTab] = useState<Tab>("رسائل")
  const [filter, setFilter] = useState("كل الطلاب")
  const [selectedGroup, setSelectedGroup] = useState("مجموعة 1")
  const [selectedSubject, setSelectedSubject] = useState("الكيمياء")
  const [message, setMessage] = useState("")
  const [scheduleDate, setScheduleDate] = useState("")

  const sendMessage = () => {
    if (!message.trim()) { toast.error("الرجاء كتابة الرسالة"); return }
    toast.success(`تم إرسال الرسالة إلى ${filter}`)
    setMessage("")
  }

  const statusBadge = (status: string): { variant: "success" | "warning" | "error" | "neutral"; label: string } => {
    const map: Record<string, { variant: "success" | "warning" | "error" | "neutral"; label: string }> = {
      sent: { variant: "success", label: "مرسلة" },
      delivered: { variant: "success", label: "تم التسليم" },
      opened: { variant: "primary", label: "تم الفتح" },
      failed: { variant: "error", label: "فشل" },
      scheduled: { variant: "warning", label: "مجدولة" },
      draft: { variant: "neutral", label: "مسودة" },
    }
    return map[status] || { variant: "neutral", label: status }
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader title="مركز التواصل" subtitle="الرسائل - البريد الداخلي - واتساب - رسائل نصية - بريد إلكتروني" />
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            <StatsCard title="الرسائل المرسلة" value={12} icon={HiOutlineCheckCircle} color="success" />
            <StatsCard title="المجدولة" value={2} icon={HiOutlineClock} color="warning" />
            <StatsCard title="رسائل واتساب" value={whatsappLogs.length} icon={HiOutlineChat} color="primary" />
            <StatsCard title="رسائل نصية" value={smsLogs.length} icon={HiOutlinePhone} color="info" />
            <StatsCard title="بريد إلكتروني" value={emailLogs.length} icon={HiOutlineMail} color="info" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button type="button" key={t} onClick={() => setActiveTab(t)}
                className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${activeTab === t ? "border-primary bg-primary/10 text-primary" : "border-border text-text-tertiary hover:bg-surface-secondary"}`}
              >{t}</button>
            ))}
          </motion.div>

          {activeTab === "رسائل" && (
            <>
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader><CardTitle>إنشاء رسالة جديدة</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {filterOptions.map((f) => (
                        <button type="button" key={f} onClick={() => setFilter(f)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${filter === f ? "border-primary bg-primary/10 text-primary" : "border-border text-text-tertiary hover:bg-surface-secondary"}`}
                        >{f}</button>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {filter === "حسب المجموعة" && (
                        <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}
                          className="bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
                        >{groups.map((g) => <option key={g} value={g}>{g}</option>)}</select>
                      )}
                      {filter === "حسب الكورس" && (
                        <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}
                          className="bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
                        >{subjects.map((s) => <option key={s} value={s}>{s}</option>)}</select>
                      )}
                    </div>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                      placeholder="اكتب رسالتك هنا..." rows={4}
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    />
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-2">
                        <HiOutlineCalendar className="w-4 h-4 text-text-tertiary" />
                        <input type="datetime-local" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)}
                          className="bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <button type="button" onClick={sendMessage}
                        className="px-6 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-all flex items-center gap-2"
                      ><HiOutlinePaperAirplane className="w-4 h-4" /> إرسال الآن</button>
                      {scheduleDate && (
                        <button type="button" onClick={() => { if (message.trim()) { toast.success("تم جدولة الرسالة"); setMessage(""); setScheduleDate("") } }}
                          className="px-6 py-2 border border-primary text-primary rounded-xl text-sm font-medium hover:bg-primary/5 transition-all"
                        >جدولة</button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader><CardTitle>الرسائل المجدولة والمرسلة</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {scheduledMessages.map((m) => {
                        const sb = statusBadge(m.status)
                        return (
                          <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
                            <div>
                              <p className="text-sm font-medium text-text">{m.title}</p>
                              <p className="text-xs text-text-tertiary">{m.audience} - {m.date}</p>
                            </div>
                            <Badge variant={sb.variant}>{sb.label}</Badge>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}

          {activeTab === "واتساب" && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader><CardTitle>سجل واتساب</CardTitle></CardHeader>
                <CardContent>
                  {whatsappLogs.length === 0 ? (
                    <EmptyState icon={HiOutlineSupport} title="لا يوجد سجل تواصل" description="لم يتم تسجيل أي تواصل مع الطلاب أو أولياء الأمور" />
                  ) : (
                    <Table
                      columns={[
                        { key: "student", header: "الطالب" },
                        { key: "phone", header: "رقم الهاتف", render: (w) => <span dir="ltr" className="text-sm">{w.phone}</span> },
                        { key: "message", header: "الرسالة", render: (w) => <span className="text-sm text-text-secondary truncate max-w-[200px] block">{w.message}</span> },
                        { key: "date", header: "التاريخ" },
                        { key: "status", header: "الحالة", render: (w) => { const sb = statusBadge(w.status); return <Badge variant={sb.variant}>{sb.label}</Badge> } },
                      ]}
                      data={whatsappLogs}
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "رسائل نصية" && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader><CardTitle>سجل الرسائل النصية</CardTitle></CardHeader>
                <CardContent>
                  {smsLogs.length === 0 ? (
                    <EmptyState icon={HiOutlineSupport} title="لا يوجد سجل تواصل" description="لم يتم تسجيل أي تواصل مع الطلاب أو أولياء الأمور" />
                  ) : (
                    <Table
                      columns={[
                        { key: "student", header: "الطالب" },
                        { key: "phone", header: "رقم الهاتف", render: (s) => <span dir="ltr" className="text-sm">{s.phone}</span> },
                        { key: "message", header: "الرسالة", render: (s) => <span className="text-sm text-text-secondary truncate max-w-[200px] block">{s.message}</span> },
                        { key: "date", header: "التاريخ" },
                        { key: "status", header: "الحالة", render: (s) => { const sb = statusBadge(s.status); return <Badge variant={sb.variant}>{sb.label}</Badge> } },
                      ]}
                      data={smsLogs}
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "بريد إلكتروني" && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader><CardTitle>سجل البريد الإلكتروني</CardTitle></CardHeader>
                <CardContent>
                  {emailLogs.length === 0 ? (
                    <EmptyState icon={HiOutlineSupport} title="لا يوجد سجل تواصل" description="لم يتم تسجيل أي تواصل مع الطلاب أو أولياء الأمور" />
                  ) : (
                    <Table
                      columns={[
                        { key: "recipient", header: "المستلم" },
                        { key: "email", header: "البريد", render: (e) => <span dir="ltr" className="text-sm text-text-secondary">{e.email}</span> },
                        { key: "subject", header: "الموضوع" },
                        { key: "date", header: "التاريخ" },
                        { key: "status", header: "الحالة", render: (e) => { const sb = statusBadge(e.status); return <Badge variant={sb.variant}>{sb.label}</Badge> } },
                      ]}
                      data={emailLogs}
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "بريد داخلي" && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader><CardTitle>البريد الداخلي</CardTitle></CardHeader>
                <CardContent>
                  {internalMail.length === 0 ? (
                    <EmptyState icon={HiOutlineSupport} title="لا يوجد سجل تواصل" description="لم يتم تسجيل أي تواصل مع الطلاب أو أولياء الأمور" />
                  ) : (
                    <div className="space-y-1">
                      {internalMail.map((m) => (
                        <div key={m.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${m.read ? "bg-surface border-border" : "bg-primary/5 border-primary/20"}`}>
                          <div className="flex items-center gap-3">
                            {!m.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                            <div className={!m.read ? "mr-2" : "mr-5"}>
                              <p className="text-sm font-medium text-text">{m.subject}</p>
                              <p className="text-xs text-text-tertiary">من: {m.sender} - {m.date}</p>
                            </div>
                          </div>
                          <Badge variant={m.read ? "neutral" : "primary"} size="sm">{m.read ? "مقروء" : "جديد"}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

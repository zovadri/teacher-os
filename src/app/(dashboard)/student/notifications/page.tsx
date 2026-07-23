"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineBell, HiOutlinePhone, HiOutlineMail, HiOutlineCheckCircle,
  HiOutlineXCircle, HiOutlineClock, HiOutlineCog, HiOutlineAcademicCap,
  HiOutlineCalendar, HiOutlineChartBar, HiOutlineUserGroup,
} from "react-icons/hi"
import { toast } from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"

type Channel = "whatsapp" | "email" | "sms"
type EventType = "exam" | "homework" | "reminder" | "result" | "promotion"

interface NotificationPref {
  id: string
  event: EventType
  label: string
  description: string
  channels: Channel[]
}

interface NotificationLog {
  id: string
  message: string
  channel: Channel
  status: "sent" | "failed" | "pending"
  date: string
  type: EventType
}

const channelLabels: Record<Channel, string> = {
  whatsapp: "واتساب",
  email: "بريد إلكتروني",
  sms: "رسالة نصية",
}
const channelIcons: Record<Channel, React.ElementType> = {
  whatsapp: HiOutlinePhone,
  email: HiOutlineMail,
  sms: HiOutlineBell,
}
const channelColors: Record<Channel, string> = {
  whatsapp: "text-success",
  email: "text-primary",
  sms: "text-warning",
}
const channelBg: Record<Channel, string> = {
  whatsapp: "bg-success/10 border-success/30",
  email: "bg-primary/10 border-primary/30",
  sms: "bg-warning/10 border-warning/30",
}

const eventLabels: Record<EventType, string> = {
  exam: "امتحانات",
  homework: "واجبات",
  reminder: "تذكيرات",
  result: "نتائج",
  promotion: "عروض وتخفيضات",
}

const defaultPrefs: NotificationPref[] = [
  { id: "p1", event: "exam", label: "مواعيد الامتحانات", description: "إشعارات بمواعيد الامتحانات القادمة", channels: ["whatsapp", "email"] },
  { id: "p2", event: "homework", label: "الواجبات الجديدة", description: "تنبيه عند إضافة واجب جديد", channels: ["whatsapp"] },
  { id: "p3", event: "reminder", label: "تذكير بالمذاكرة", description: "تذكير يومي بخطة المذاكرة", channels: ["whatsapp", "sms"] },
  { id: "p4", event: "result", label: "إعلان النتائج", description: "إشعار فوري عند ظهور النتائج", channels: ["whatsapp", "email", "sms"] },
  { id: "p5", event: "promotion", label: "العروض والخصومات", description: "أحدث عروض الكتب والكورسات", channels: ["email"] },
]

const recentLogs: NotificationLog[] = [
  { id: "l1", message: "تذكير: امتحان الكيمياء غداً الساعة 10 صباحاً", channel: "whatsapp", status: "sent", date: "منذ 5 دقائق", type: "exam" },
  { id: "l2", message: "تم إضافة واجب جديد في الفيزياء", channel: "whatsapp", status: "sent", date: "منذ ساعتين", type: "homework" },
  { id: "l3", message: "تذكير بخطة المذاكرة اليومية", channel: "sms", status: "sent", date: "منذ 3 ساعات", type: "reminder" },
  { id: "l4", message: "نتيجة امتحان الرياضيات متاحة الآن", channel: "email", status: "failed", date: "منذ 5 ساعات", type: "result" },
  { id: "l5", message: "خصم 20% على الكتب الخارجية", channel: "whatsapp", status: "sent", date: "منذ يوم", type: "promotion" },
  { id: "l6", message: "تذكير: امتحان الفيزياء بعد غد", channel: "whatsapp", status: "pending", date: "قيد الإرسال", type: "exam" },
]

const statusBadge: Record<string, { label: string; variant: "success" | "error" | "neutral" }> = {
  sent: { label: "تم الإرسال", variant: "success" },
  failed: { label: "فشل", variant: "error" },
  pending: { label: "قيد الإرسال", variant: "neutral" },
}

const phoneNumber = "+20 10 1234 5678"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function NotificationsPage() {
  const [prefs, setPrefs] = useState<NotificationPref[]>(defaultPrefs)
  const [simulating, setSimulating] = useState(false)

  const toggleChannel = (prefId: string, channel: Channel) => {
    setPrefs((prev) => prev.map((p) => {
      if (p.id !== prefId) return p
      const has = p.channels.includes(channel)
      return { ...p, channels: has ? p.channels.filter((c) => c !== channel) : [...p.channels, channel] }
    }))
  }

  const sendTestNotification = () => {
    setSimulating(true)
    toast.loading("جاري إرسال إشعار تجريبي...", { id: "test" })
    setTimeout(() => {
      setSimulating(false)
      toast.success("تم إرسال الإشعار التجريبي عبر واتساب!", { id: "test" })
    }, 1500)
  }

  const totalSent = recentLogs.filter((l) => l.status === "sent").length
  const totalFailed = recentLogs.filter((l) => l.status === "failed").length
  const activePrefs = prefs.filter((p) => p.channels.length > 0).length

  return (
    <div className="min-h-screen">
      <DashboardHeader title="الإشعارات والتنبيهات" subtitle="تحكم في إشعارات واتساب والبريد الإلكتروني" />
      <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            <StatsCard title="الإشعارات المرسلة" value={totalSent} icon={HiOutlineCheckCircle} color="success" />
            <StatsCard title="الفاشلة" value={totalFailed} icon={HiOutlineXCircle} color="error" />
            <StatsCard title="التنبيهات المفعلة" value={activePrefs} icon={HiOutlineClock} color="primary" />
            <StatsCard title="قنوات الإرسال" value="3" icon={HiOutlinePhone} color="info" />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>رقم واتساب للتواصل</CardTitle>
                  <button type="button" onClick={sendTestNotification} disabled={simulating}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-success text-white rounded-xl text-xs font-medium hover:bg-emerald-600 transition-all disabled:opacity-50"
                  >
                    <HiOutlinePhone className="w-4 h-4" />
                    {simulating ? "جاري الإرسال..." : "إرسال إشعار تجريبي"}
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-success/5 border border-success/20">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <HiOutlinePhone className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text">{phoneNumber}</p>
                    <p className="text-xs text-text-tertiary">سيتم إرسال جميع الإشعارات إلى هذا الرقم عبر واتساب وتطبيقات التواصل</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الإشعارات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {prefs.map((pref) => (
                    <div key={pref.id} className="p-5 rounded-xl bg-surface-secondary border border-border/60">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-medium text-text">{pref.label}</p>
                          <p className="text-xs text-text-tertiary">{pref.description}</p>
                        </div>
                        <Badge variant="info" size="sm">{eventLabels[pref.event]}</Badge>
                      </div>
                      <div className="flex gap-3">
                        {(["whatsapp", "email", "sms"] as Channel[]).map((ch) => {
                          const Icon = channelIcons[ch]
                          const enabled = pref.channels.includes(ch)
                          return (
                            <button type="button"
                              key={ch}
                              onClick={() => toggleChannel(pref.id, ch)}
                              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                                enabled ? channelBg[ch] + " " + channelColors[ch] : "border-border text-text-tertiary bg-surface"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                              {channelLabels[ch]}
                              {enabled ? <HiOutlineCheckCircle className="w-3 h-3" /> : <HiOutlineXCircle className="w-3 h-3" />}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>سجل الإشعارات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentLogs.map((log) => {
                    const Icon = channelIcons[log.channel]
                    const sb = statusBadge[log.status]
                    return (
                      <div key={log.id} className="flex items-center gap-3 p-4 rounded-xl bg-surface-secondary border border-border/60">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${log.status === "sent" ? "bg-success/10" : log.status === "failed" ? "bg-error/10" : "bg-warning/10"}`}>
                          <Icon className={`w-4 h-4 ${channelColors[log.channel]}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text truncate">{log.message}</p>
                          <p className="text-xs text-text-tertiary">{log.date}</p>
                        </div>
                        <Badge variant={sb.variant} size="sm">{sb.label}</Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

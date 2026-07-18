"use client"

import { motion } from "framer-motion"
import { HiOutlineUserAdd, HiOutlineBookOpen, HiOutlineCash, HiOutlineClipboardCheck, HiOutlineStar, HiOutlineXCircle } from "react-icons/hi"
import { formatRelativeTime } from "../../lib/utils"

const activities = [
  { id: "a1", type: "student", text: "تم تسجيل طالب جديد: محمد علي", time: new Date(Date.now() - 1000 * 60 * 5) },
  { id: "a2", type: "course", text: "تم نشر كورس: النحو والصرف", time: new Date(Date.now() - 1000 * 60 * 30) },
  { id: "a3", type: "payment", text: "اشتراك جديد: أحمد خالد - الباقة الشهرية", time: new Date(Date.now() - 1000 * 60 * 60) },
  { id: "a4", type: "exam", text: "تم إضافة امتحان: اختبار النحو الشامل", time: new Date(Date.now() - 1000 * 60 * 120) },
  { id: "a5", type: "review", text: "تقييم جديد: 5 نجوم من الطالب سارة", time: new Date(Date.now() - 1000 * 60 * 180) },
  { id: "a6", type: "expired", text: "اشتراك منتهي: عمر حسن - الباقة الثلاثية", time: new Date(Date.now() - 1000 * 60 * 240) },
  { id: "a7", type: "student", text: "تم تسجيل طالب جديد: ليلى أحمد", time: new Date(Date.now() - 1000 * 60 * 300) },
  { id: "a8", type: "course", text: "تحديث محتوى الكورس: البلاغة والأدب", time: new Date(Date.now() - 1000 * 60 * 400) },
]

const typeConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  student: { icon: <HiOutlineUserAdd size={16} />, color: "text-info", bg: "bg-info/10" },
  course: { icon: <HiOutlineBookOpen size={16} />, color: "text-primary", bg: "bg-primary/10" },
  payment: { icon: <HiOutlineCash size={16} />, color: "text-success", bg: "bg-success/10" },
  exam: { icon: <HiOutlineClipboardCheck size={16} />, color: "text-warning", bg: "bg-warning/10" },
  review: { icon: <HiOutlineStar size={16} />, color: "text-warning", bg: "bg-warning/10" },
  expired: { icon: <HiOutlineXCircle size={16} />, color: "text-error", bg: "bg-error/10" },
}

export default function ActivityFeed() {
  return (
    <div className="bg-surface rounded-xl border border-border p-5">
      <h3 className="text-base font-semibold text-text mb-4">آخر النشاطات</h3>
      <div className="space-y-1">
        {activities.map((activity, index) => {
          const config = typeConfig[activity.type] || typeConfig.student
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-secondary transition-colors"
            >
              <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center shrink-0 ${config.color}`}>
                {config.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-text leading-snug">{activity.text}</p>
                <p className="text-xs text-text-tertiary mt-0.5">{formatRelativeTime(activity.time)}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

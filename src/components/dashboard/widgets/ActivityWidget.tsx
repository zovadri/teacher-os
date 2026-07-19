"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { HiOutlineSpeakerphone } from "react-icons/hi"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { formatRelativeTime } from "@/lib/utils"

interface Activity {
  id: string
  userName: string
  action: string
  resource: string
  timestamp: Date
}

const activityTypeConfig: Record<string, { color: string }> = {
  "تسجيل دخول": { color: "text-info" },
  "إضافة طالب": { color: "text-success" },
  "رفع فيديو": { color: "text-primary" },
  "إنشاء امتحان": { color: "text-warning" },
  "إضافة واجب": { color: "text-purple-500" },
  "تعديل كورس": { color: "text-primary" },
  "حذف طالب": { color: "text-error" },
  "إصدار شهادة": { color: "text-success" },
  "تسجيل اشتراك": { color: "text-warning" },
  "تعديل صلاحيات": { color: "text-info" },
}

export default function ActivityWidget({ activities, max = 6 }: { activities: Activity[]; max?: number }) {
  const items = activities.slice(0, max)

  return (
    <Card>
      <CardHeader>
        <CardTitle>آخر النشاطات</CardTitle>
        <Link href="/teacher/activity" className="text-sm text-primary hover:text-primary-dark transition-colors">
          عرض الكل
        </Link>
      </CardHeader>
      <CardContent className="space-y-1">
        {items.map((activity, index) => {
          const config = activityTypeConfig[activity.action] || { color: "text-text-secondary" }
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-secondary transition-colors"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${config.color} bg-current/10`}>
                <HiOutlineSpeakerphone className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-text leading-snug">
                  <span className="font-medium">{activity.userName}</span>{" "}{activity.action} في <span className="font-medium">{activity.resource}</span>
                </p>
                <p className="text-xs text-text-tertiary mt-0.5">{formatRelativeTime(activity.timestamp)}</p>
              </div>
            </motion.div>
          )
        })}
      </CardContent>
    </Card>
  )
}

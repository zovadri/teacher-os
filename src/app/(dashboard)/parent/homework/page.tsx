"use client"

import { motion } from "framer-motion"
import { HiOutlineClipboardList, HiOutlineCheckCircle, HiOutlineClock, HiOutlineExclamationCircle, HiOutlineEye, HiOutlineAcademicCap, HiOutlineCalendar } from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"

interface Homework {
  id: string; subject: string; student: string; title: string; dueDate: string; status: "submitted" | "pending" | "late"; grade?: number
}

const homeworks: Homework[] = [
  { id: "h1", subject: "الكيمياء", student: "أحمد محمد", title: "تمارين الباب الأول", dueDate: "2026-07-16", status: "submitted", grade: 48 },
  { id: "h2", subject: "الفيزياء", student: "أحمد محمد", title: "مسائل التيار الكهربي", dueDate: "2026-07-18", status: "pending" },
  { id: "h3", subject: "الرياضيات", student: "أحمد محمد", title: "تمارين التفاضل", dueDate: "2026-07-15", status: "submitted", grade: 45 },
  { id: "h4", subject: "العربي", student: "أحمد محمد", title: "إعراب النصوص", dueDate: "2026-07-14", status: "late" },
  { id: "h5", subject: "الإنجليزي", student: "أحمد محمد", title: "Grammar Exercises", dueDate: "2026-07-20", status: "pending" },
  { id: "h6", subject: "الكيمياء", student: "مريم أحمد", title: "تجارب المعمل", dueDate: "2026-07-16", status: "submitted", grade: 42 },
]

const statusVar: Record<string, "success" | "warning" | "error"> = { submitted: "success", pending: "warning", late: "error" }
const statusLabel: Record<string, string> = { submitted: "تم التسليم", pending: "قيد الانتظار", late: "متأخر" }

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function ParentHomeworkPage() {
  const submitted = homeworks.filter((h) => h.status === "submitted").length
  const pending = homeworks.filter((h) => h.status === "pending").length
  const late = homeworks.filter((h) => h.status === "late").length

  return (
    <div className="min-h-screen">
      <DashboardHeader title="واجبات الأبناء" subtitle="متابعة الواجبات المدرسية للأبناء" />
      <div className="p-4 md:p-6 space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <StatsCard title="إجمالي الواجبات" value={homeworks.length} icon={HiOutlineClipboardList} color="primary" />
            <StatsCard title="تم التسليم" value={submitted} icon={HiOutlineCheckCircle} color="success" />
            <StatsCard title="قيد الانتظار" value={pending} icon={HiOutlineClock} color="warning" />
            <StatsCard title="متأخر" value={late} icon={HiOutlineExclamationCircle} color="error" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader><CardTitle>الواجبات</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {homeworks.map((h) => (
                    <div key={h.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                          h.status === "submitted" ? "bg-success/10" : h.status === "late" ? "bg-error/10" : "bg-warning/10"
                        }`}>
                          <HiOutlineClipboardList className={`w-4 h-4 ${
                            h.status === "submitted" ? "text-success" : h.status === "late" ? "text-error" : "text-warning"
                          }`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text">{h.title}</p>
                          <p className="text-xs text-text-tertiary">{h.subject} - {h.student}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-text-tertiary flex items-center gap-1"><HiOutlineCalendar className="w-3 h-3" />{h.dueDate}</span>
                        {h.grade && <span className="text-xs font-semibold text-primary">{h.grade}/50</span>}
                        <Badge variant={statusVar[h.status]} size="sm">{statusLabel[h.status]}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

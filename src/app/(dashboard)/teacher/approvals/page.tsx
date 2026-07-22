"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineClock,
  HiOutlineUserGroup, HiOutlineSwitchHorizontal, HiOutlineCash,
  HiOutlinePause, HiOutlineFilter, HiOutlineSearch, HiOutlineEye,
} from "react-icons/hi"
import toast from "react-hot-toast"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Modal } from "@/components/ui/Modal"
import { EmptyState } from "@/components/ui/EmptyState"

interface Approval {
  id: string; type: "نقل مجموعة" | "تجميد كورس" | "استرداد مبلغ"
  student: string; details: string; date: string; status: "معلق" | "موافق" | "مرفوض"
}

const approvals: Approval[] = [
  { id: "a1", type: "نقل مجموعة", student: "أحمد محمد", details: "من مجموعة 1 إلى مجموعة 2 - بسبب تغيير الموعد", date: "2026-07-19", status: "معلق" },
  { id: "a2", type: "تجميد كورس", student: "مريم أحمد", details: "تجميد كورس الكيمياء لمدة شهر - ظروف سفر", date: "2026-07-18", status: "معلق" },
  { id: "a3", type: "استرداد مبلغ", student: "يوسف علي", details: "استرداد 1500 ج.م - قسط شهر لم يحضره", date: "2026-07-17", status: "موافق" },
  { id: "a4", type: "نقل مجموعة", student: "سارة خالد", details: "من مجموعة 3 إلى مجموعة 1 - لمستواها", date: "2026-07-16", status: "مرفوض" },
  { id: "a5", type: "تجميد كورس", student: "عمر حسن", details: "تجميد كورس الفيزياء شهرين - امتحانات مدرسة", date: "2026-07-15", status: "موافق" },
  { id: "a6", type: "استرداد مبلغ", student: "ندى سامي", details: "استرداد 2000 ج.م - إلغاء اشتراك", date: "2026-07-14", status: "معلق" },
  { id: "a7", type: "نقل مجموعة", student: "ليلى إبراهيم", details: "من مجموعة 2 إلى مجموعة 4 - مع صديقتها", date: "2026-07-13", status: "معلق" },
]

const statsMap = { "معلق": "warning" as const, "موافق": "success" as const, "مرفوض": "error" as const }
const typeIcons = { "نقل مجموعة": HiOutlineSwitchHorizontal, "تجميد كورس": HiOutlinePause, "استرداد مبلغ": HiOutlineCash }

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function ApprovalsPage() {
  const [list, setList] = useState(approvals)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selected, setSelected] = useState<Approval | null>(null)

  const stats = useMemo(() => ({
    total: list.length,
    pending: list.filter((a) => a.status === "معلق").length,
    approved: list.filter((a) => a.status === "موافق").length,
    rejected: list.filter((a) => a.status === "مرفوض").length,
  }), [list])

  const filtered = useMemo(() => {
    return list.filter((a) => {
      const matchSearch = a.student.includes(search) || a.details.includes(search)
      const matchType = typeFilter === "all" || a.type === typeFilter
      return matchSearch && matchType
    })
  }, [list, search, typeFilter])

  const handleApprove = (id: string) => {
    setList((prev) => prev.map((a) => a.id === id ? { ...a, status: "موافق" as const } : a))
    toast.success("تمت الموافقة على الطلب")
    setSelected(null)
  }

  const handleReject = (id: string) => {
    setList((prev) => prev.map((a) => a.id === id ? { ...a, status: "مرفوض" as const } : a))
    toast.success("تم رفض الطلب")
    setSelected(null)
  }

  return (
    <div className="min-h-screen">
      <PageHeader title="الموافقات" description="طلبات نقل مجموعة - تجميد كورس - استرداد مبلغ" />
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <StatsCard title="إجمالي الطلبات" value={stats.total} icon={HiOutlineCheckCircle} color="primary" />
            <StatsCard title="معلق" value={stats.pending} icon={HiOutlineClock} color="warning" />
            <StatsCard title="موافق" value={stats.approved} icon={HiOutlineCheckCircle} color="success" />
            <StatsCard title="مرفوض" value={stats.rejected} icon={HiOutlineXCircle} color="error" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <HiOutlineSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="بحث باسم الطالب..."
                className="w-full pr-10 pl-3 py-2.5 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2.5 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="all">كل الأنواع</option>
              <option value="نقل مجموعة">نقل مجموعة</option>
              <option value="تجميد كورس">تجميد كورس</option>
              <option value="استرداد مبلغ">استرداد مبلغ</option>
            </select>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            {filtered.length === 0 ? (
              <EmptyState icon={HiOutlineCheckCircle} title="لا يوجد موافقات" description="لا توجد طلبات موافقة في الوقت الحالي" />
            ) : filtered.map((approval) => {
              const Icon = typeIcons[approval.type]
              return (
                <div key={approval.id} onClick={() => setSelected(approval)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${approval.status === "معلق" ? "bg-warning/5 border-warning/30" : "bg-surface border-border hover:border-primary/30"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-secondary border border-border flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text">{approval.type} - {approval.student}</p>
                        <p className="text-xs text-text-tertiary max-w-md truncate">{approval.details}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-text-tertiary">{approval.date}</span>
                      <Badge variant={statsMap[approval.status]}>{approval.status}</Badge>
                      <HiOutlineEye className="w-4 h-4 text-text-tertiary" />
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="تفاصيل الطلب" size="sm">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {(() => { const Icon = typeIcons[selected.type]; return <Icon className="w-6 h-6 text-primary" /> })()}
              <div><h3 className="text-sm font-bold text-text">{selected.type}</h3><p className="text-xs text-text-tertiary">{selected.student}</p></div>
              <Badge variant={statsMap[selected.status]} className="mr-auto">{selected.status}</Badge>
            </div>
            <div className="p-3 rounded-xl bg-surface-secondary text-sm text-text-secondary">{selected.details}</div>
            <p className="text-xs text-text-tertiary">تاريخ الطلب: {selected.date}</p>
            {selected.status === "معلق" && (
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => handleApprove(selected.id)}
                  className="flex-1 px-4 py-2.5 bg-success text-white rounded-xl text-sm font-medium hover:bg-success/90 transition-all flex items-center justify-center gap-2"
                ><HiOutlineCheckCircle className="w-4 h-4" /> موافقة</button>
                <button type="button" onClick={() => handleReject(selected.id)}
                  className="flex-1 px-4 py-2.5 bg-error text-white rounded-xl text-sm font-medium hover:bg-error/90 transition-all flex items-center justify-center gap-2"
                ><HiOutlineXCircle className="w-4 h-4" /> رفض</button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

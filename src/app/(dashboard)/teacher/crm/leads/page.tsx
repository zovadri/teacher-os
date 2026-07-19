"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineUserGroup, HiOutlinePhone, HiOutlineMail,
  HiOutlineCalendar, HiOutlineStatusOnline, HiOutlineStar,
  HiOutlineChat, HiOutlineFilter, HiOutlineSearch,
  HiOutlineChevronDown, HiOutlineX, HiOutlineCheckCircle,
  HiOutlineXCircle,
} from "react-icons/hi"
import toast from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Modal } from "@/components/ui/Modal"
import { EmptyState } from "@/components/ui/EmptyState"

interface Lead {
  id: string; name: string; phone: string; email: string; course: string
  source: "فيسبوك" | "توصية" | "جوجل" | "واتساب" | "آخر"
  status: "جديد" | "تم التواصل" | "مهتم" | "محول" | "ملغي"
  date: string; notes: string
}

const leads: Lead[] = [
  { id: "l1", name: "أحمد علي", phone: "01012345678", email: "ahmed@example.com", course: "الكيمياء", source: "فيسبوك", status: "جديد", date: "2026-07-19", notes: "سأل عن مواعيد المجموعة 1" },
  { id: "l2", name: "منى سامي", phone: "01023456789", email: "mona@example.com", course: "الفيزياء", source: "توصية", status: "مهتم", date: "2026-07-18", notes: "صديقتها عندنا" },
  { id: "l3", name: "خالد محمود", phone: "01034567890", email: "khaled@example.com", course: "الرياضيات", source: "جوجل", status: "تم التواصل", date: "2026-07-17", notes: "اتصلنا به وسيأتي الأسبوع القادم" },
  { id: "l4", name: "سارة عبدالله", phone: "01045678901", email: "sara@example.com", course: "الكيمياء", source: "واتساب", status: "محول", date: "2026-07-16", notes: "تم التسجيل في المجموعة 2" },
  { id: "l5", name: "محمد نور", phone: "01056789012", email: "mohamed@example.com", course: "العربي", source: "فيسبوك", status: "ملغي", date: "2026-07-15", notes: "اختار سنتر تاني" },
  { id: "l6", name: "ندى حسن", phone: "01067890123", email: "nada@example.com", course: "الإنجليزي", source: "توصية", status: "جديد", date: "2026-07-19", notes: "تريد حصة تجريبية" },
  { id: "l7", name: "عمر سعيد", phone: "01078901234", email: "omar@example.com", course: "الرياضيات", source: "جوجل", status: "مهتم", date: "2026-07-14", notes: "يسأل عن الخصومات" },
  { id: "l8", name: "ليلى إبراهيم", phone: "01089012345", email: "layla@example.com", course: "الفيزياء", source: "واتساب", status: "تم التواصل", date: "2026-07-13", notes: "حجزت مقعد تجريبي" },
]

const statusColors: Record<string, "primary" | "success" | "warning" | "error" | "neutral"> = {
  "جديد": "primary", "تم التواصل": "warning", "مهتم": "warning", "محول": "success", "ملغي": "error",
}

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function CRMLeadsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [showConvertModal, setShowConvertModal] = useState(false)
  const [convertTarget, setConvertTarget] = useState("")

  const stats = useMemo(() => ({
    total: leads.length,
    new: leads.filter((l) => l.status === "جديد").length,
    converted: leads.filter((l) => l.status === "محول").length,
    interested: leads.filter((l) => l.status === "مهتم" || l.status === "تم التواصل").length,
  }), [])

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const matchSearch = l.name.includes(search) || l.phone.includes(search) || l.email.includes(search)
      const matchStatus = statusFilter === "all" || l.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [search, statusFilter])

  const updateStatus = (id: string, status: Lead["status"]) => {
    toast.success(`تم تحديث حالة العميل`)
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader title="إدارة العملاء المحتملين" subtitle="متابعة الاستفسارات - تحويل العملاء إلى طلاب" />
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <StatsCard title="إجمالي العملاء" value={stats.total} icon={HiOutlineUserGroup} color="primary" />
            <StatsCard title="جديد" value={stats.new} icon={HiOutlineStar} color="primary" />
            <StatsCard title="قيد المتابعة" value={stats.interested} icon={HiOutlineChat} color="warning" />
            <StatsCard title="تم التحويل" value={stats.converted} icon={HiOutlineCheckCircle} color="success" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <HiOutlineSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="بحث باسم العميل أو الهاتف..."
                className="w-full pr-10 pl-3 py-2.5 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2.5 bg-surface border border-border rounded-xl text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="all">كل الحالات</option>
              <option value="جديد">جديد</option>
              <option value="تم التواصل">تم التواصل</option>
              <option value="مهتم">مهتم</option>
              <option value="محول">محول</option>
              <option value="ملغي">ملغي</option>
            </select>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {filtered.map((lead) => (
              <div key={lead.id} onClick={() => setSelectedLead(lead)}
                className="p-4 rounded-xl bg-surface border border-border hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text">{lead.name}</p>
                      <p className="text-xs text-text-tertiary" dir="ltr">{lead.phone}</p>
                    </div>
                  </div>
                  <Badge variant={statusColors[lead.status]}>{lead.status}</Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-text-tertiary">
                  <span>📚 {lead.course}</span>
                  <span>📅 {lead.date}</span>
                  <span>🔗 {lead.source}</span>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                  <button type="button" onClick={(e) => { e.stopPropagation(); toast.success(`تم تسجيل مكالمة مع ${lead.name}`) }}
                    className="flex-1 px-2 py-1.5 text-xs bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all flex items-center justify-center gap-1"
                  ><HiOutlinePhone className="w-3 h-3" /> اتصال</button>
                  <button type="button" onClick={(e) => { e.stopPropagation(); toast.success(`تم إرسال رسالة إلى ${lead.name}`) }}
                    className="flex-1 px-2 py-1.5 text-xs bg-success/10 text-success rounded-lg hover:bg-success/20 transition-all flex items-center justify-center gap-1"
                  ><HiOutlineChat className="w-3 h-3" /> رسالة</button>
                  <button type="button" onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); setShowConvertModal(true) }}
                    className="flex-1 px-2 py-1.5 text-xs bg-warning/10 text-warning rounded-lg hover:bg-warning/20 transition-all flex items-center justify-center gap-1"
                  ><HiOutlineCheckCircle className="w-3 h-3" /> تحويل</button>
                </div>
              </div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <EmptyState icon={HiOutlineUserGroup} title="لا يوجد عملاء محتملين" description="لم يتم إضافة أي عملاء محتملين بعد" />
          )}
        </motion.div>
      </div>

      <Modal isOpen={!!selectedLead && !showConvertModal} onClose={() => setSelectedLead(null)} title="تفاصيل العميل" size="sm">
        {selectedLead && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">{selectedLead.name.charAt(0)}</div>
              <div><h3 className="text-sm font-bold text-text">{selectedLead.name}</h3><Badge variant={statusColors[selectedLead.status]}>{selectedLead.status}</Badge></div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-xl bg-surface-secondary"><span className="text-text-tertiary text-xs">الهاتف</span><p className="text-text font-medium" dir="ltr">{selectedLead.phone}</p></div>
              <div className="p-3 rounded-xl bg-surface-secondary"><span className="text-text-tertiary text-xs">البريد</span><p className="text-text font-medium">{selectedLead.email}</p></div>
              <div className="p-3 rounded-xl bg-surface-secondary"><span className="text-text-tertiary text-xs">الكورس</span><p className="text-text font-medium">{selectedLead.course}</p></div>
              <div className="p-3 rounded-xl bg-surface-secondary"><span className="text-text-tertiary text-xs">المصدر</span><p className="text-text font-medium">{selectedLead.source}</p></div>
            </div>
            <div className="p-3 rounded-xl bg-surface-secondary"><span className="text-text-tertiary text-xs">ملاحظات</span><p className="text-text text-sm mt-1">{selectedLead.notes}</p></div>
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={() => toast.success(`تم تسجيل مكالمة`)}
                className="flex-1 px-3 py-2 bg-primary text-white rounded-xl text-xs font-medium hover:bg-primary-dark transition-all">تسجيل مكالمة</button>
              <button type="button" onClick={() => { setSelectedLead(null); setShowConvertModal(true) }}
                className="flex-1 px-3 py-2 bg-success text-white rounded-xl text-xs font-medium hover:bg-success/90 transition-all">تحويل لطالب</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={showConvertModal} onClose={() => { setShowConvertModal(false); setSelectedLead(null) }} title="تحويل عميل لطالب" size="sm">
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">تحويل {selectedLead?.name} إلى طالب في النظام.</p>
          <div>
            <label className="text-xs text-text-tertiary mb-1 block">المجموعة</label>
            <select value={convertTarget} onChange={(e) => setConvertTarget(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
            ><option value="">اختر...</option><option value="مجموعة 1">مجموعة 1</option><option value="مجموعة 2">مجموعة 2</option><option value="مجموعة 3">مجموعة 3</option></select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => { toast.success(`تم تحويل ${selectedLead?.name} إلى طالب`); setShowConvertModal(false); setSelectedLead(null) }}
              className="flex-1 px-4 py-2.5 bg-success text-white rounded-xl text-sm font-medium hover:bg-success/90 transition-all">تأكيد التحويل</button>
            <button type="button" onClick={() => { setShowConvertModal(false); setSelectedLead(null) }}
              className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm text-text-secondary hover:bg-surface-secondary transition-all">إلغاء</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

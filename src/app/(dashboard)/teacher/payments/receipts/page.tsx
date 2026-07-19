"use client"

import { motion } from "framer-motion"
import toast from "react-hot-toast"
import { HiOutlineReceiptRefund, HiOutlineCheckCircle, HiOutlinePrinter, HiOutlineDownload, HiOutlineCash, HiOutlineDocumentText } from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

interface Receipt {
  id: string; student: string; amount: number; date: string; method: string; reference: string; status: "confirmed" | "pending"
}

const receipts: Receipt[] = [
  { id: "r1", student: "أحمد محمد", amount: 2000, date: "2026-07-01", method: "تحويل بنكي", reference: "TXN-001", status: "confirmed" },
  { id: "r2", student: "مريم أحمد", amount: 1000, date: "2026-07-10", method: "محفظة إلكترونية", reference: "TXN-002", status: "confirmed" },
  { id: "r3", student: "يوسف علي", amount: 500, date: "2026-07-05", method: "كاش", reference: "TXN-003", status: "pending" },
  { id: "r4", student: "سارة خالد", amount: 1500, date: "2026-07-12", method: "فيزا", reference: "TXN-004", status: "confirmed" },
  { id: "r5", student: "ندى سامي", amount: 750, date: "2026-07-08", method: "تحويل بنكي", reference: "TXN-005", status: "confirmed" },
  { id: "r6", student: "عمر حسن", amount: 1800, date: "2026-06-15", method: "كاش", reference: "TXN-006", status: "confirmed" },
]

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function ReceiptsPage() {
  const confirmed = receipts.filter((r) => r.status === "confirmed").length
  const totalAmount = receipts.reduce((s, r) => s + r.amount, 0)

  return (
    <div className="min-h-screen">
      <Breadcrumb items={[{ label: "المدفوعات", href: "/teacher/payments/installments" }, { label: "الإيصالات" }]} />
      <DashboardHeader title="الإيصالات" subtitle="سجل الإيصالات والمبالغ المستلمة" />
      <div className="p-4 md:p-6 space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <StatsCard title="الإيصالات" value={receipts.length} icon={HiOutlineReceiptRefund} color="primary" />
            <StatsCard title="مؤكدة" value={confirmed} icon={HiOutlineCheckCircle} color="success" />
            <StatsCard title="معلقة" value={receipts.length - confirmed} icon={HiOutlineDocumentText} color="warning" />
            <StatsCard title="الإجمالي" value={`${totalAmount} ج.م`} icon={HiOutlineCash} color="info" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader><CardTitle>سجل الإيصالات</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {receipts.map((r) => (
                    <div key={r.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <HiOutlineDocumentText className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text">{r.student}</p>
                          <p className="text-xs text-text-tertiary">{r.date} - {r.method} - {r.reference}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-primary">{r.amount} ج.م</span>
                        <Badge variant={r.status === "confirmed" ? "success" : "warning"} size="sm">{r.status === "confirmed" ? "مؤكد" : "معلق"}</Badge>
                        <button type="button" onClick={() => toast.success("جاري تجهيز الطباعة...")} className="p-1.5 rounded-lg hover:bg-surface transition-colors"><HiOutlinePrinter className="w-4 h-4 text-text-tertiary" /></button>
                        <button type="button" onClick={() => toast.success("جاري تحميل الإيصال...")} className="p-1.5 rounded-lg hover:bg-surface transition-colors"><HiOutlineDownload className="w-4 h-4 text-text-tertiary" /></button>
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

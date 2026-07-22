"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HiOutlineCash, HiOutlineArrowUp, HiOutlineArrowDown, HiOutlinePlus } from "react-icons/hi"
import toast from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { EmptyState } from "@/components/ui/EmptyState"

interface JournalEntry { id: string; date: string; description: string; debit: number; credit: number; account: string; type: "receipt" | "payment" }

const entries: JournalEntry[] = [
  { id: "j1", date: "2026-07-18", description: "سداد اشتراك أحمد محمد", debit: 2000, credit: 0, account: "صندوق", type: "receipt" },
  { id: "j2", date: "2026-07-18", description: "إيجار مقر السنتر", debit: 0, credit: 5000, account: "مصروفات", type: "payment" },
  { id: "j3", date: "2026-07-17", description: "مرتب مدرس كيمياء", debit: 0, credit: 3500, account: "رواتب", type: "payment" },
  { id: "j4", date: "2026-07-17", description: "بيع كتب خارجية", debit: 1500, credit: 0, account: "صندوق", type: "receipt" },
  { id: "j5", date: "2026-07-16", description: "فاتورة كهرباء", debit: 0, credit: 850, account: "مصروفات", type: "payment" },
  { id: "j6", date: "2026-07-16", description: "سداد قسط طالب", debit: 1000, credit: 0, account: "بنك", type: "receipt" },
  { id: "j7", date: "2026-07-15", description: "شراء أدوات مكتبية", debit: 0, credit: 450, account: "مصروفات", type: "payment" },
  { id: "j8", date: "2026-07-15", description: "اشتراك طالب جديد", debit: 2500, credit: 0, account: "صندوق", type: "receipt" },
]

const accounts = [
  { name: "صندوق", balance: 12500, type: "مدين" },
  { name: "بنك", balance: 45000, type: "مدين" },
  { name: "مصروفات", balance: -18500, type: "دائن" },
  { name: "رواتب", balance: -14500, type: "دائن" },
  { name: "إيرادات", balance: -52000, type: "دائن" },
]

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function AccountingPage() {
  const [activeTab, setActiveTab] = useState<"journal" | "accounts" | "vouchers">("journal")
  const totalDebit = entries.reduce((s, e) => s + e.debit, 0)
  const totalCredit = entries.reduce((s, e) => s + e.credit, 0)

  return (
    <div className="min-h-screen">
      <DashboardHeader title="المحاسبة" subtitle="دفتر اليومية - الصندوق - البنك - سندات القبض والصرف" />
      <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <StatsCard title="رصيد الصندوق" value="12,500 ج.ظ…" icon={HiOutlineCash} color="success" />
            <StatsCard title="رصيد البنك" value="45,000 ج.ظ…" icon={HiOutlineCash} color="primary" />
            <StatsCard title="إجمالي المدين" value={`${totalDebit.toLocaleString()} ج.ظ…`} icon={HiOutlineArrowUp} color="success" />
            <StatsCard title="إجمالي الدائن" value={`${totalCredit.toLocaleString()} ج.ظ…`} icon={HiOutlineArrowDown} color="error" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-2">
            {(["journal", "accounts", "vouchers"] as const).map((t) => (
              <button type="button" key={t} onClick={() => setActiveTab(t)}
                className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${activeTab === t ? "border-primary bg-primary/10 text-primary" : "border-border text-text-tertiary hover:bg-surface-secondary"}`}
              >{t === "journal" ? "دفتر اليومية" : t === "accounts" ? "شجرة الحسابات" : "سندات"}</button>
            ))}
          </motion.div>

          {activeTab === "journal" && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader><CardTitle>دفتر اليومية</CardTitle></CardHeader>
                <CardContent>
                  {entries.length === 0 ? (
                    <EmptyState icon={HiOutlineCash} title="لا يوجد قيود محاسبية" description="لم يتم تسجيل أي قيود محاسبية بعد" />
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-right py-2 px-2 text-xs text-text-tertiary">التاريخ</th>
                            <th className="text-right py-2 px-2 text-xs text-text-tertiary">البيان</th>
                            <th className="text-right py-2 px-2 text-xs text-text-tertiary">الحساب</th>
                            <th className="text-center py-2 px-2 text-xs text-text-tertiary">مدين</th>
                            <th className="text-center py-2 px-2 text-xs text-text-tertiary">دائن</th>
                            <th className="text-center py-2 px-2 text-xs text-text-tertiary">النوع</th>
                          </tr>
                        </thead>
                        <tbody>
                          {entries.map((e, i) => (
                            <tr key={e.id} className="border-b border-border last:border-0 hover:bg-surface-secondary transition-colors">
                              <td className="py-2.5 px-2 text-xs text-text-tertiary">{e.date}</td>
                              <td className="py-2.5 px-2 text-sm text-text">{e.description}</td>
                              <td className="py-2.5 px-2 text-xs text-text">{e.account}</td>
                              <td className="py-2.5 px-2 text-center text-sm font-mono text-success">{e.debit > 0 ? e.debit.toLocaleString() : "-"}</td>
                              <td className="py-2.5 px-2 text-center text-sm font-mono text-error">{e.credit > 0 ? e.credit.toLocaleString() : "-"}</td>
                              <td className="py-2.5 px-2 text-center"><Badge variant={e.type === "receipt" ? "success" : "error"} size="sm">{e.type === "receipt" ? "قبض" : "صرف"}</Badge></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "accounts" && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader><CardTitle>شجرة الحسابات</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {accounts.map((a) => (
                      <div key={a.name} className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
                        <span className="text-sm font-medium text-text">{a.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${a.balance > 0 ? "text-success" : "text-error"}`}>{Math.abs(a.balance).toLocaleString()} ج.ظ…</span>
                          <Badge variant={a.type === "مدين" ? "success" : "error"} size="sm">{a.type}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "vouchers" && (
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>سندات القبض والصرف</CardTitle>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => toast.success("تم إنشاء سند قبض جديد")} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-success/10 text-success text-xs font-medium hover:bg-success/20 transition-all"><HiOutlinePlus className="w-3.5 h-3.5" /> سند قبض</button>
                      <button type="button" onClick={() => toast.success("تم إنشاء سند صرف جديد")} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-error/10 text-error text-xs font-medium hover:bg-error/20 transition-all"><HiOutlinePlus className="w-3.5 h-3.5" /> سند صرف</button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {entries.slice(0, 6).map((e) => (
                      <div key={e.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${e.type === "receipt" ? "bg-success/10" : "bg-error/10"}`}>
                            {e.type === "receipt" ? <HiOutlineArrowUp className="w-4 h-4 text-success" /> : <HiOutlineArrowDown className="w-4 h-4 text-error" />}
                          </div>
                          <div><p className="text-sm font-medium text-text">{e.description}</p><p className="text-xs text-text-tertiary">{e.date} - {e.account}</p></div>
                        </div>
                        <span className={`text-sm font-bold ${e.type === "receipt" ? "text-success" : "text-error"}`}>{e.type === "receipt" ? "+" : "-"}{e.debit || e.credit} ج.ظ…</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HiOutlineTicket, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlinePlus, HiOutlineSelector } from "react-icons/hi"
import toast from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { DataTable } from "@/components/ui/DataTable"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

interface Coupon {
  id: string; code: string; discount: number; type: "percentage" | "fixed"; usageCount: number; maxUsage: number; expiresAt: string; active: boolean
}

const coupons: Coupon[] = [
  { id: "c1", code: "BACK2SCHOOL", discount: 20, type: "percentage", usageCount: 45, maxUsage: 100, expiresAt: "2026-09-01", active: true },
  { id: "c2", code: "SUMMER50", discount: 50, type: "fixed", usageCount: 12, maxUsage: 50, expiresAt: "2026-08-15", active: true },
  { id: "c3", code: "NEWSTUDENT", discount: 15, type: "percentage", usageCount: 8, maxUsage: 30, expiresAt: "2026-12-31", active: true },
  { id: "c4", code: "ELITE10", discount: 10, type: "percentage", usageCount: 120, maxUsage: 200, expiresAt: "2026-07-30", active: false },
  { id: "c5", code: "FINALPUSH", discount: 100, type: "fixed", usageCount: 5, maxUsage: 20, expiresAt: "2026-07-20", active: true },
]

const columns = [
  { key: "code", label: "ط§ظ„ظƒظˆط¯", render: (r: Coupon) => <span className="text-sm font-mono font-bold text-primary">{r.code}</span> },
  { key: "discount", label: "ط§ظ„ط®طµظ…", render: (r: Coupon) => <span className="text-sm text-text">{r.type === "percentage" ? `${r.discount}%` : `${r.discount} ط¬.ظ…`}</span> },
  { key: "usage", label: "ط§ظ„ط§ط³طھط®ط¯ط§ظ…", render: (r: Coupon) => <span className="text-xs text-text-tertiary">{r.usageCount}/{r.maxUsage}</span> },
  { key: "expires", label: "ظٹظ†طھظ‡ظٹ", render: (r: Coupon) => <span className="text-xs text-text-tertiary">{r.expiresAt}</span> },
  { key: "active", label: "ط§ظ„ط­ط§ظ„ط©", render: (r: Coupon) => <Badge variant={r.active ? "success" : "error"} size="sm">{r.active ? "ظ†ط´ط·" : "ظ…ظ†طھظ‡ظٹ"}</Badge> },
]

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function CouponsPage() {
  const [newCode, setNewCode] = useState("")
  const [newDiscount, setNewDiscount] = useState("")
  const [newType, setNewType] = useState<"percentage" | "fixed">("percentage")

  const handleCreate = () => {
    if (!newCode.trim() || !newDiscount.trim()) { toast.error("ط§ظ„ط±ط¬ط§ط، ط¥ط¯ط®ط§ظ„ ط§ظ„ظƒظˆط¯ ظˆط§ظ„ط®طµظ…"); return }
    toast.success(`طھظ… ط¥ظ†ط´ط§ط، ط§ظ„ظƒظˆط¯ ${newCode.trim()} ط¨ظ†ط¬ط§ط­`)
    setNewCode(""); setNewDiscount("")
  }

  const active = coupons.filter((c) => c.active).length
  const totalUsage = coupons.reduce((s, c) => s + c.usageCount, 0)

  return (
    <div className="min-h-screen">
      <Breadcrumb items={[{ label: "ط§ظ„ظ…ط¯ظپظˆط¹ط§طھ", href: "/teacher/payments/installments" }, { label: "ط§ظ„ظƒظˆط¨ظˆظ†ط§طھ" }]} />
      <DashboardHeader title="ظƒظˆط¨ظˆظ†ط§طھ ط§ظ„ط®طµظ…" subtitle="ط¥ط¯ط§ط±ط© ط£ظƒظˆط§ط¯ ط§ظ„ط®طµظ… ظˆط§ظ„ط¹ط±ظˆط¶" />
      <div className="p-4 md:p-6 space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ظƒظˆط¨ظˆظ†ط§طھ" value={coupons.length} icon={HiOutlineTicket} color="primary" />
            <StatsCard title="ظ†ط´ط·ط©" value={active} icon={HiOutlineCheckCircle} color="success" />
            <StatsCard title="ظ…ظ†طھظ‡ظٹط©" value={coupons.length - active} icon={HiOutlineXCircle} color="error" />
            <StatsCard title="ظ…ط±ط§طھ ط§ظ„ط§ط³طھط®ط¯ط§ظ…" value={totalUsage} icon={HiOutlineSelector} color="info" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader><CardTitle>ط¥ظ†ط´ط§ط، ظƒظˆط¨ظˆظ† ط¬ط¯ظٹط¯</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 items-end">
                  <div className="space-y-1">
                    <label className="text-xs text-text-tertiary">ط§ظ„ظƒظˆط¯</label>
                    <input type="text" value={newCode} onChange={(e) => setNewCode(e.target.value)} placeholder="ظ…ط«ط§ظ„: OFFER20" className="w-36 bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-text-tertiary">ط§ظ„ظ‚ظٹظ…ط©</label>
                    <input type="number" value={newDiscount} onChange={(e) => setNewDiscount(e.target.value)} placeholder="20" className="w-24 bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-text-tertiary">ط§ظ„ظ†ظˆط¹</label>
                    <div className="flex gap-2">
                      {(["percentage", "fixed"] as const).map((t) => (
                        <button type="button" key={t} onClick={() => setNewType(t)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${newType === t ? "border-primary bg-primary/10 text-primary" : "border-border text-text-tertiary"}`}
                        >{t === "percentage" ? "ظ†ط³ط¨ط© %" : "ظ‚ظٹظ…ط© ط«ط§ط¨طھط©"}</button>
                      ))}
                    </div>
                  </div>
                  <button type="button" onClick={handleCreate} className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary-dark transition-all">
                    <HiOutlinePlus className="w-4 h-4 inline ml-1" />ط¥ظ†ط´ط§ط،
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader><CardTitle>ط¬ظ…ظٹط¹ ط§ظ„ظƒظˆط¨ظˆظ†ط§طھ</CardTitle></CardHeader>
              <CardContent><DataTable columns={columns} data={coupons} searchable /></CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

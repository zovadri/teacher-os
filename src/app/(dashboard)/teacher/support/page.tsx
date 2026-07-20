"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"
import Link from "next/link"
import {
  HiOutlineQuestionMarkCircle,
  HiOutlineChevronDown,
  HiOutlinePaperAirplane,
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineExclamation,
  HiOutlinePaperClip,
  HiOutlineSupport,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import Textarea from "@/components/ui/Textarea"
import Select from "@/components/ui/Select"
import Button from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { mockFaq } from "@/lib/mock/data"
import { cn } from "@/lib/utils"

const categories = [
  { value: "technical", label: "ظ…ط´ظƒظ„ط© طھظ‚ظ†ظٹط©" },
  { value: "billing", label: "ظ…ط´ظƒظ„ط© ظپظٹ ط§ظ„ط¯ظپط¹" },
  { value: "account", label: "ظ…ط´ظƒظ„ط© ظپظٹ ط§ظ„ط­ط³ط§ط¨" },
  { value: "course", label: "ظ…ط´ظƒظ„ط© ظپظٹ ط§ظ„ظƒظˆط±ط³" },
  { value: "other", label: "ط£ط®ط±ظ‰" },
]

const priorities = [
  { value: "low", label: "ظ…ظ†ط®ظپط¶ط©" },
  { value: "medium", label: "ظ…طھظˆط³ط·ط©" },
  { value: "high", label: "ط¹ط§ظ„ظٹط©" },
  { value: "urgent", label: "ط¹ط§ط¬ظ„ط©" },
]

const priorityColors: Record<string, "neutral" | "warning" | "error"> = {
  low: "neutral",
  medium: "warning",
  high: "error",
  urgent: "error",
}

const priorityLabels: Record<string, string> = {
  low: "ظ…ظ†ط®ظپط¶ط©",
  medium: "ظ…طھظˆط³ط·ط©",
  high: "ط¹ط§ظ„ظٹط©",
  urgent: "ط¹ط§ط¬ظ„ط©",
}

const previousTickets = [
  { id: "tkt-1", subject: "ظ…ط´ظƒظ„ط© ظپظٹ ط±ظپط¹ ط§ظ„ظپظٹط¯ظٹظˆ", category: "technical", status: "closed", priority: "medium", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), lastUpdate: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { id: "tkt-2", subject: "ط§ط³طھظپط³ط§ط± ط¹ظ† ط¨ط§ظ‚ط© ط§ظ„ط§ط´طھط±ط§ظƒ", category: "billing", status: "open", priority: "low", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), lastUpdate: new Date(Date.now() - 1000 * 60 * 30) },
  { id: "tkt-3", subject: "ط·ظ„ط¨ ط¥ط¶ط§ظپط© ظ…ظٹط²ط© ط§ظ„طھظ‚ط§ط±ظٹط±", category: "other", status: "open", priority: "high", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), lastUpdate: new Date(Date.now() - 1000 * 60 * 60 * 12) },
  { id: "tkt-4", subject: "ط®ط·ط£ ظپظٹ ط¹ط±ط¶ ط§ظ„ظ†طھط§ط¦ط¬", category: "technical", status: "closed", priority: "urgent", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), lastUpdate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5) },
]

export default function SupportPage() {
  const [form, setForm] = useState({ subject: "", category: "", priority: "medium", message: "" })
  const [faqOpen, setFaqOpen] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.subject.trim() || !form.message.trim() || !form.category) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 2000))
    setSubmitting(false)
    setSubmitted(true)
    toast.success("طھظ… ط¥ط±ط³ط§ظ„ ط·ظ„ط¨ ط§ظ„ط¯ط¹ظ… ط¨ظ†ط¬ط§ط­")
  }

  if (submitted) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <DashboardHeader title="ط§ظ„ط¯ط¹ظ… ط§ظ„ظپظ†ظٹ" subtitle="طھظˆط§طµظ„ ظ…ط¹ ظپط±ظٹظ‚ ط§ظ„ط¯ط¹ظ…" />
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
              <HiOutlineCheckCircle size={32} className="text-success" />
            </div>
            <h3 className="text-xl font-bold text-text mb-2">طھظ… ط¥ط±ط³ط§ظ„ ط·ظ„ط¨ ط§ظ„ط¯ط¹ظ…</h3>
            <p className="text-sm text-text-tertiary text-center max-w-md mb-6">
              ط´ظƒط±ط§ظ‹ ظ„طھظˆط§طµظ„ظƒ ظ…ط¹ظ†ط§. طھظ… ط§ط³طھظ„ط§ظ… ط·ظ„ط¨ظƒ ظˆط³ظٹطھظ… ط§ظ„ط±ط¯ ط¹ظ„ظٹظƒ ظپظٹ ط£ظ‚ط±ط¨ ظˆظ‚طھ ظ…ظ…ظƒظ† ط¹ط¨ط± ط§ظ„ط¨ط±ظٹط¯ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹ.
            </p>
            <Button variant="primary" onClick={() => { setSubmitted(false); setForm({ subject: "", category: "", priority: "medium", message: "" }); toast.success("ظٹظ…ظƒظ†ظƒ ط¥ط±ط³ط§ظ„ ط·ظ„ط¨ ط¯ط¹ظ… ط¬ط¯ظٹط¯") }}>
              ط¥ط±ط³ط§ظ„ ط·ظ„ط¨ ط¢ط®ط±
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="ط§ظ„ط¯ط¹ظ… ط§ظ„ظپظ†ظٹ" subtitle="طھظˆط§طµظ„ ظ…ط¹ ظپط±ظٹظ‚ ط§ظ„ط¯ط¹ظ…" />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ط¥ط±ط³ط§ظ„ ط·ظ„ط¨ ط¯ط¹ظ…</CardTitle>
              <CardDescription>ط§ظ…ظ„ط£ ط§ظ„ظ†ظ…ظˆط°ط¬ ط£ط¯ظ†ط§ظ‡ ظˆط³ظٹطھظ… ط§ظ„ط±ط¯ ط¹ظ„ظٹظƒ ظپظٹ ط£ظ‚ط±ط¨ ظˆظ‚طھ</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="ط¹ظ†ظˆط§ظ† ط§ظ„ط·ظ„ط¨" value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} placeholder="ظ…ظ„ط®طµ ظ„ظ„ظ…ط´ظƒظ„ط© ط§ظ„طھظٹ طھظˆط§ط¬ظ‡ظ‡ط§" />
                <div className="grid grid-cols-2 gap-4">
                  <Select label="ط§ظ„طھطµظ†ظٹظپ" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} options={categories} placeholder="ط§ط®طھط± ط§ظ„طھطµظ†ظٹظپ" />
                  <Select label="ط§ظ„ط£ظˆظ„ظˆظٹط©" value={form.priority} onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))} options={priorities} />
                </div>
                <Textarea label="ط§ظ„ط±ط³ط§ظ„ط©" value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} placeholder="ط§ط´ط±ط­ ط§ظ„ظ…ط´ظƒظ„ط© ط¨ط§ظ„طھظپطµظٹظ„..." rows={6} />
                <div>
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/40 transition-colors">
                    <HiOutlinePaperClip size={24} className="mx-auto mb-2 text-text-tertiary/50" />
                    <p className="text-sm text-text-tertiary">ط§ط³ط­ط¨ ظ…ظ„ظپط§ظ‹ ط£ظˆ ط§ط¶ط؛ط· ظ„ظ„ط±ظپط¹</p>
                    <p className="text-xs text-text-tertiary/60 mt-1">PNG, JPG, PDF - ط­ط¬ظ… ط£ظ‚طµظ‰ 10MB</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <p className="text-xs text-text-tertiary">ط³ظٹطھظ… ط§ظ„ط±ط¯ ط®ظ„ط§ظ„ 24 ط³ط§ط¹ط©</p>
                  <Button type="submit" variant="primary" size="lg" leftIcon={<HiOutlinePaperAirplane size={18} />} isLoading={submitting} disabled={!form.subject || !form.message || !form.category}>
                    {submitting ? "ط¬ط§ط±ظٹ ط§ظ„ط¥ط±ط³ط§ظ„..." : "ط¥ط±ط³ط§ظ„ ط§ظ„ط·ظ„ط¨"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ط§ظ„طھط°ط§ظƒط± ط§ظ„ط³ط§ط¨ظ‚ط©</CardTitle>
              <CardDescription>ط¬ظ…ظٹط¹ طھط°ط§ظƒط± ط§ظ„ط¯ط¹ظ… ط§ظ„طھظٹ ظ‚ظ…طھ ط¨ط¥ظ†ط´ط§ط¦ظ‡ط§</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {previousTickets.map((ticket) => (
                  <Link key={ticket.id} href={`/teacher/support/${ticket.id}`} className="flex items-center justify-between p-4 rounded-xl bg-surface-secondary border border-border hover:bg-surface transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        ticket.status === "open" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
                      }`}>
                        {ticket.status === "open" ? <HiOutlineClock size={18} /> : <HiOutlineCheckCircle size={18} />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-text truncate">{ticket.subject}</p>
                        <div className="flex items-center gap-2 text-xs text-text-tertiary mt-0.5">
                          <span>{categories.find((c) => c.value === ticket.category)?.label}</span>
                          <span>آ·</span>
                          <Badge variant={priorityColors[ticket.priority]} size="sm">{priorityLabels[ticket.priority]}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge variant={ticket.status === "open" ? "warning" : "success"} size="sm">
                        {ticket.status === "open" ? "ظ‚ظٹط¯ ط§ظ„ظ…ط¹ط§ظ„ط¬ط©" : "ظ…ط؛ظ„ظ‚"}
                      </Badge>
                      <span className="text-[10px] text-text-tertiary">{ticket.createdAt.toLocaleDateString("ar-EG")}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HiOutlineSupport className="text-primary" size={20} />
                <CardTitle>ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„ط§طھطµط§ظ„</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">ط§ظ„ط¨ط±ظٹط¯ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹ</p>
                <p className="text-sm font-medium text-text" dir="ltr">support@teacher-os.com</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">ط±ظ‚ظ… ط§ظ„ظ‡ط§طھظپ</p>
                <p className="text-sm font-medium text-text" dir="ltr">+20 100 000 0000</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">ط£ظˆظ‚ط§طھ ط§ظ„ط¹ظ…ظ„</p>
                <p className="text-sm font-medium text-text">ط§ظ„ط³ط¨طھ - ط§ظ„ط®ظ…ظٹط³: 9 طµ - 9 ظ…</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">ظ…طھظˆط³ط· ظˆظ‚طھ ط§ظ„ط±ط¯</p>
                <p className="text-sm font-medium text-success flex items-center gap-1">
                  <HiOutlineClock size={16} />
                  ط£ظ‚ظ„ ظ…ظ† 4 ط³ط§ط¹ط§طھ
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HiOutlineQuestionMarkCircle className="text-primary" size={20} />
                <CardTitle>ط§ظ„ط£ط³ط¦ظ„ط© ط§ظ„ط´ط§ط¦ط¹ط©</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockFaq.slice(0, 5).map((faq) => (
                  <div key={faq.id} className="border border-border rounded-xl overflow-hidden">
                    <button type="button"
                      onClick={() => setFaqOpen(faqOpen === faq.id ? null : faq.id)}
                      className="w-full flex items-center justify-between px-4 py-3 text-right hover:bg-surface-secondary transition-colors"
                    >
                      <span className="text-sm font-medium text-text">{faq.question}</span>
                      <HiOutlineChevronDown size={16} className={cn("text-text-tertiary shrink-0 transition-transform", faqOpen === faq.id && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                      {faqOpen === faq.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="px-4 pb-3">
                            <p className="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

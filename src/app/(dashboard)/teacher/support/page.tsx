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
  { value: "technical", label: "مشكلة تقنية" },
  { value: "billing", label: "مشكلة ظپظٹ الدفع" },
  { value: "account", label: "مشكلة ظپظٹ الحساب" },
  { value: "course", label: "مشكلة ظپظٹ الكورس" },
  { value: "other", label: "أخرى" },
]

const priorities = [
  { value: "low", label: "منخفضة" },
  { value: "medium", label: "متوسطة" },
  { value: "high", label: "عالية" },
  { value: "urgent", label: "عاجلة" },
]

const priorityColors: Record<string, "neutral" | "warning" | "error"> = {
  low: "neutral",
  medium: "warning",
  high: "error",
  urgent: "error",
}

const priorityLabels: Record<string, string> = {
  low: "منخفضة",
  medium: "متوسطة",
  high: "عالية",
  urgent: "عاجلة",
}

const previousTickets = [
  { id: "tkt-1", subject: "مشكلة ظپظٹ رفع الفيديو", category: "technical", status: "closed", priority: "medium", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), lastUpdate: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { id: "tkt-2", subject: "استفسار عن باقة الاشتراك", category: "billing", status: "open", priority: "low", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), lastUpdate: new Date(Date.now() - 1000 * 60 * 30) },
  { id: "tkt-3", subject: "طلب إضافة ميزة التقارير", category: "other", status: "open", priority: "high", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), lastUpdate: new Date(Date.now() - 1000 * 60 * 60 * 12) },
  { id: "tkt-4", subject: "خطأ ظپظٹ عرض النتائج", category: "technical", status: "closed", priority: "urgent", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), lastUpdate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5) },
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
    toast.success("طھظ… إرسال طلب الدعم بنجاح")
  }

  if (submitted) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <DashboardHeader title="الدعم الفني" subtitle="تواصل مع فريق الدعم" />
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
              <HiOutlineCheckCircle size={32} className="text-success" />
            </div>
            <h3 className="text-xl font-bold text-text mb-2">طھظ… إرسال طلب الدعم</h3>
            <p className="text-sm text-text-tertiary text-center max-w-md mb-6">
              شكراً لتواصلك معنا. طھظ… استلام طلبك وسيتم الرد عليك ظپظٹ أقرب وقت ممكن عبر البريد الإلكتروني.
            </p>
            <Button variant="primary" onClick={() => { setSubmitted(false); setForm({ subject: "", category: "", priority: "medium", message: "" }); toast.success("يمكنك إرسال طلب دعم جديد") }}>
              إرسال طلب آخر
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="الدعم الفني" subtitle="تواصل مع فريق الدعم" />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إرسال طلب دعم</CardTitle>
              <CardDescription>املأ النموذج أدناه وسيتم الرد عليك ظپظٹ أقرب وقت</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="عنوان الطلب" value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} placeholder="ملخص للمشكلة التي تواجهها" />
                <div className="grid grid-cols-2 gap-4">
                  <Select label="التصنيف" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} options={categories} placeholder="اختر التصنيف" />
                  <Select label="الأولوية" value={form.priority} onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))} options={priorities} />
                </div>
                <Textarea label="الرسالة" value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} placeholder="اشرح المشكلة بالتفصيل..." rows={6} />
                <div>
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/40 transition-colors">
                    <HiOutlinePaperClip size={24} className="mx-auto mb-2 text-text-tertiary/50" />
                    <p className="text-sm text-text-tertiary">اسحب ملفاً أو اضغط للرفع</p>
                    <p className="text-xs text-text-tertiary/60 mt-1">PNG, JPG, PDF - حجم أقصى 10MB</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <p className="text-xs text-text-tertiary">سيتم الرد خلال 24 ساعة</p>
                  <Button type="submit" variant="primary" size="lg" leftIcon={<HiOutlinePaperAirplane size={18} />} isLoading={submitting} disabled={!form.subject || !form.message || !form.category}>
                    {submitting ? "جاري الإرسال..." : "إرسال الطلب"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>التذاكر السابقة</CardTitle>
              <CardDescription>جميع تذاكر الدعم التي قمت بإنشائها</CardDescription>
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
                        {ticket.status === "open" ? "قيد المعالجة" : "مغلق"}
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
                <CardTitle>معلومات الاتصال</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">البريد الإلكتروني</p>
                <p className="text-sm font-medium text-text" dir="ltr">support@teacher-os.com</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">رقم الهاتف</p>
                <p className="text-sm font-medium text-text" dir="ltr">+20 100 000 0000</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">أوقات العمل</p>
                <p className="text-sm font-medium text-text">السبت - الخميس: 9 ص - 9 ظ…</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">متوسط وقت الرد</p>
                <p className="text-sm font-medium text-success flex items-center gap-1">
                  <HiOutlineClock size={16} />
                  أقل من 4 ساعات
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HiOutlineQuestionMarkCircle className="text-primary" size={20} />
                <CardTitle>الأسئلة الشائعة</CardTitle>
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

"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineSearch,
  HiOutlineStar,
  HiOutlinePaperAirplane,
  HiOutlineChevronRight,
  HiOutlinePlus,
  HiOutlinePaperClip,
  HiOutlineUser,
  HiOutlineChat,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Badge } from "@/components/ui/Badge"
import { Modal } from "@/components/ui/Modal"
import { SearchInput } from "@/components/ui/SearchInput"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Textarea from "@/components/ui/Textarea"
import { EmptyState } from "@/components/ui/EmptyState"
import { formatRelativeTime, cn } from "@/lib/utils"

interface ParentMessage {
  id: string
  senderName: string
  senderRole: string
  subject: string
  content: string
  read: boolean
  createdAt: Date
  isTeacher: boolean
}

const mockParentMessages: ParentMessage[] = [
  { id: "pm-1", senderName: "أحمد محمد", senderRole: "مدرس", subject: "متابعة تقدم ابنك", content: "أود إعلامكم بأن ابنكم أحمد يقوم بعمل ممتاز في الكورس. يرجى متابعة الواجبات الأسبوعية.", read: false, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), isTeacher: true },
  { id: "pm-2", senderName: "أحمد محمد", senderRole: "مدرس", subject: "نتيجة امتحان النحو", content: "حصل ابنكم على 90% في امتحان النحو الشهري. أداء ممتاز ويحتاج لمراجعة بعض النقاط في البلاغة.", read: false, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), isTeacher: true },
  { id: "pm-3", senderName: "أحمد محمد", senderRole: "مدرس", subject: "طلب تأجيل واجب", content: "تمت الموافقة على طلب تأجيل واجب النحو حتى نهاية الأسبوع.", read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), isTeacher: true },
  { id: "pm-4", senderName: "أحمد محمد", senderRole: "مدرس", subject: "استفسار عن الدرس", content: "نعم، درس البلاغة متاح للتسجيل. يمكن لابنك مشاهدته من صفحة الكورس.", read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72), isTeacher: true },
  { id: "pm-5", senderName: "أحمد محمد", senderRole: "مدرس", subject: "تحديث جدول الحصص", content: "تم تحديث جدول الحصص للأسبوع القادم. يرجى الاطلاع على المواعيد الجديدة.", read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96), isTeacher: true },
]

export default function ParentMessagesPage() {
  const [search, setSearch] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<ParentMessage | null>(null)
  const [showCompose, setShowCompose] = useState(false)
  const [showMobileList, setShowMobileList] = useState(true)

  const filtered = useMemo(() => {
    if (!search.trim()) return mockParentMessages
    return mockParentMessages.filter(
      (m) => m.subject.includes(search) || m.senderName.includes(search) || m.content.includes(search)
    )
  }, [search])

  return (
    <div className="p-4 md:p-6 h-[calc(100vh-4rem)]">
      <DashboardHeader title="الرسائل" subtitle="التواصل مع المدرس" />

      <div className="flex gap-4 h-[calc(100%-5rem)] mt-4">
        <div className={cn(
          "w-full md:w-80 shrink-0 flex flex-col bg-surface border border-border rounded-2xl overflow-hidden",
          !showMobileList && "hidden md:flex"
        )}>
          <div className="p-3 border-b border-border space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <SearchInput value={search} onChange={setSearch} placeholder="بحث في الرسائل..." />
              </div>
              <Button size="sm" variant="primary" onClick={() => setShowCompose(true)} leftIcon={<HiOutlinePlus className="w-4 h-4" />}>
                جديدة
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {filtered.map((msg) => (
              <button type="button"
                key={msg.id}
                onClick={() => { setSelectedMessage(msg); setShowMobileList(false) }}
                className={cn(
                  "w-full text-right p-3 hover:bg-surface-secondary transition-colors",
                  selectedMessage?.id === msg.id && "bg-primary-50/50 dark:bg-primary-900/10"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center">
                      {msg.isTeacher ? (
                        <HiOutlineUser className="w-5 h-5 text-primary" />
                      ) : (
                        <span className="text-sm font-bold text-primary">و</span>
                      )}
                    </div>
                    {!msg.read && <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full border-2 border-surface" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className={cn("text-sm truncate", !msg.read ? "font-bold text-text" : "font-medium text-text")}>
                        {msg.senderName}
                      </p>
                      <span className="text-xs text-text-tertiary shrink-0">{formatRelativeTime(msg.createdAt)}</span>
                    </div>
                    <p className={cn("text-xs font-medium truncate mt-0.5", !msg.read ? "text-text" : "text-text-tertiary")}>
                      {msg.subject}
                    </p>
                    <p className="text-xs text-text-tertiary truncate mt-0.5">{msg.content}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={cn(
          "flex-1 bg-surface border border-border rounded-2xl overflow-hidden flex flex-col",
          showMobileList && "hidden md:flex"
        )}>
          {selectedMessage ? (
            <>
              <div className="flex items-center justify-between p-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <button type="button" className="md:hidden p-1 text-text-tertiary" onClick={() => setShowMobileList(true)}>
                    <HiOutlineChevronRight className="w-5 h-5" />
                  </button>
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <HiOutlineUser className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text">{selectedMessage.senderName}</p>
                    <p className="text-xs text-text-tertiary">{selectedMessage.senderRole}</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="max-w-3xl mx-auto space-y-4">
                  <div>
                    <h2 className="text-lg font-bold text-text mb-1">{selectedMessage.subject}</h2>
                    <p className="text-sm text-text-tertiary">{formatRelativeTime(selectedMessage.createdAt)}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                    <p className="text-sm text-text leading-relaxed">{selectedMessage.content}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-primary-50/50 dark:bg-primary-900/10 border border-primary/20">
                    <p className="text-sm text-text font-medium mb-2">الرد على الرسالة</p>
                    <textarea
                      placeholder="اكتب ردك هنا..."
                      rows={4}
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                    />
                    <div className="flex items-center justify-between mt-3">
                      <button type="button" className="flex items-center gap-1 text-sm text-text-tertiary hover:text-primary transition-colors">
                        <HiOutlinePaperClip className="w-4 h-4" />
                        <span>إرفاق ملف</span>
                      </button>
                      <Button type="button" size="sm" leftIcon={<HiOutlinePaperAirplane className="w-4 h-4" />}>
                        إرسال الرد
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <EmptyState
                icon={HiOutlineChat}
                title="اختر رسالة"
                description="اختر رسالة من القائمة لعرض محتواها"
                action={
                  <Button onClick={() => setShowCompose(true)} leftIcon={<HiOutlinePlus className="w-4 h-4" />}>
                    إرسال رسالة جديدة
                  </Button>
                }
              />
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={showCompose} onClose={() => setShowCompose(false)} title="رسالة جديدة إلى المدرس" subtitle="أرسل استفساراً أو طلباً إلى المدرس" size="lg">
        <div className="space-y-4">
          <Input label="الموضوع" placeholder="عنوان الرسالة" />
          <Textarea label="نص الرسالة" placeholder="اكتب رسالتك هنا..." rows={5} />
          <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-secondary border border-border cursor-pointer hover:bg-surface-tertiary transition-colors">
            <HiOutlinePaperClip className="w-4 h-4 text-text-tertiary" />
            <span className="text-sm text-text-tertiary">إرفاق ملف (اختياري)</span>
          </div>
          <div className="pt-4 flex gap-3">
            <Button variant="primary" size="lg" className="flex-1" leftIcon={<HiOutlinePaperAirplane className="w-4 h-4" />}>
              إرسال
            </Button>
            <Button variant="secondary" size="lg" onClick={() => setShowCompose(false)}>إلغاء</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineSearch,
  HiOutlineStar,
  HiOutlineTrash,
  HiOutlineReply,
  HiOutlinePaperAirplane,
  HiOutlineDotsVertical,
  HiOutlineChevronRight,
  HiOutlinePlus,
  HiOutlinePaperClip,
  HiOutlineUser,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Badge } from "@/components/ui/Badge"
import { Modal } from "@/components/ui/Modal"
import { SearchInput } from "@/components/ui/SearchInput"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Textarea from "@/components/ui/Textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { mockMessages, mockStudents } from "@/lib/mock/data"
import { formatRelativeTime, cn } from "@/lib/utils"

interface Conversation {
  id: string
  participantName: string
  participantAvatar: string
  lastMessage: string
  lastMessageDate: Date
  unread: boolean
  isStarred: boolean
  messages: typeof mockMessages
}

function buildConversations(): Conversation[] {
  const groups = new Map<string, typeof mockMessages>()
  mockMessages.forEach((msg) => {
    const existing = groups.get(msg.conversationId) || []
    existing.push(msg)
    groups.set(msg.conversationId, existing)
  })
  return Array.from(groups.entries()).map(([convId, msgs]) => {
    const sorted = [...msgs].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    const last = sorted[0]
    return {
      id: convId,
      participantName: last.senderName,
      participantAvatar: last.senderAvatar,
      lastMessage: last.content,
      lastMessageDate: last.createdAt,
      unread: !last.read,
      isStarred: last.isStarred,
      messages: msgs,
    }
  })
}

export default function MessagesPage() {
  const [search, setSearch] = useState("")
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null)
  const [showCompose, setShowCompose] = useState(false)
  const [showMobileList, setShowMobileList] = useState(true)

  const conversations = useMemo(() => buildConversations(), [])

  const filtered = useMemo(() => {
    if (!search.trim()) return conversations
    return conversations.filter((c) => c.participantName.includes(search))
  }, [search, conversations])

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === selectedConvId),
    [selectedConvId, conversations]
  )

  return (
    <div className="p-4 md:p-6 h-[calc(100vh-4rem)]">
      <DashboardHeader title="الرسائل" subtitle="التواصل مع الطلاب وأولياء الأمور" />

      <div className="flex gap-4 h-[calc(100%-5rem)] mt-4">
        <div className={cn(
          "w-full md:w-80 lg:w-96 shrink-0 flex flex-col bg-surface border border-border rounded-2xl overflow-hidden",
          !showMobileList && "hidden md:flex"
        )}>
          <div className="p-3 border-b border-border space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <SearchInput value={search} onChange={setSearch} placeholder="بحث في المحادثات..." />
              </div>
              <Button size="sm" variant="primary" onClick={() => setShowCompose(true)} leftIcon={<HiOutlinePlus className="w-4 h-4" />}>
                جديدة
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {filtered.map((conv) => (
              <button
                key={conv.id}
                onClick={() => { setSelectedConvId(conv.id); setShowMobileList(false) }}
                className={cn(
                  "w-full text-right p-3 hover:bg-surface-secondary transition-colors",
                  selectedConvId === conv.id && "bg-primary-50/50 dark:bg-primary-900/10"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 overflow-hidden">
                      <img src={conv.participantAvatar} alt="" className="w-full h-full object-cover" />
                    </div>
                    {conv.unread && <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full border-2 border-surface" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className={cn("text-sm truncate", conv.unread ? "font-bold text-text" : "font-medium text-text")}>
                        {conv.participantName}
                      </p>
                      <span className="text-xs text-text-tertiary shrink-0">{formatRelativeTime(conv.lastMessageDate)}</span>
                    </div>
                    <p className={cn("text-xs truncate mt-0.5", conv.unread ? "text-text" : "text-text-tertiary")}>
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.isStarred && <HiOutlineStar className="w-3.5 h-3.5 text-warning shrink-0 mt-1" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={cn(
          "flex-1 bg-surface border border-border rounded-2xl overflow-hidden flex flex-col",
          showMobileList && "hidden md:flex"
        )}>
          {activeConversation ? (
            <>
              <div className="flex items-center justify-between p-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <button className="md:hidden p-1 text-text-tertiary" onClick={() => setShowMobileList(true)}>
                    <HiOutlineChevronRight className="w-5 h-5" />
                  </button>
                  <div className="w-9 h-9 rounded-full bg-primary/10 overflow-hidden">
                    <img src={activeConversation.participantAvatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text">{activeConversation.participantName}</p>
                    <p className="text-xs text-text-tertiary">متصل الآن</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 text-text-tertiary hover:text-warning rounded-lg hover:bg-surface-secondary transition-colors">
                    <HiOutlineStar className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-text-tertiary hover:text-error rounded-lg hover:bg-surface-secondary transition-colors">
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeConversation.messages.map((msg) => (
                  <div key={msg.id} className={cn("flex", msg.senderId === "t-1" ? "justify-start" : "justify-end")}>
                    <div className={cn(
                      "max-w-[75%] p-3 rounded-2xl",
                      msg.senderId === "t-1"
                        ? "bg-primary text-white rounded-tr-sm"
                        : "bg-surface-secondary border border-border rounded-tl-sm"
                    )}>
                      <p className="text-sm">{msg.content}</p>
                      <div className={cn(
                        "flex items-center gap-2 mt-1",
                        msg.senderId === "t-1" ? "justify-end" : "justify-start"
                      )}>
                        <span className={cn("text-xs", msg.senderId === "t-1" ? "text-primary-200" : "text-text-tertiary")}>
                          {formatRelativeTime(msg.createdAt)}
                        </span>
                        {msg.attachments.length > 0 && (
                          <HiOutlinePaperClip className="w-3 h-3" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="اكتب رسالتك..."
                    className="flex-1 bg-surface-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <button className="p-2.5 text-text-tertiary hover:text-primary rounded-lg hover:bg-surface-secondary transition-colors">
                    <HiOutlinePaperClip className="w-5 h-5" />
                  </button>
                  <Button size="md" variant="primary" leftIcon={<HiOutlinePaperAirplane className="w-4 h-4" />}>
                    إرسال
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <HiOutlinePaperAirplane className="w-16 h-16 mx-auto text-text-tertiary mb-4" />
                <h3 className="text-lg font-semibold text-text mb-2">اختر محادثة</h3>
                <p className="text-sm text-text-secondary mb-6">اختر محادثة من القائمة لعرض الرسائل</p>
                <Button onClick={() => setShowCompose(true)} leftIcon={<HiOutlinePlus className="w-4 h-4" />}>
                  بدء محادثة جديدة
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={showCompose} onClose={() => setShowCompose(false)} title="رسالة جديدة" subtitle="أرسل رسالة إلى طالب أو ولي أمر" size="lg">
        <div className="space-y-4">
          <Select
            label="إلى"
            options={mockStudents.slice(0, 20).map((s) => ({ value: s.id, label: s.name }))}
            placeholder="اختر المستلم"
          />
          <Input label="الموضوع" placeholder="عنوان الرسالة" />
          <Textarea label="نص الرسالة" placeholder="اكتب رسالتك هنا..." rows={5} />
          <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-secondary border border-border cursor-pointer hover:bg-surface-tertiary transition-colors">
            <HiOutlinePaperClip className="w-4 h-4 text-text-tertiary" />
            <span className="text-sm text-text-tertiary">إرفاق ملف</span>
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

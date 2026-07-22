"use client"

import { useState, useMemo } from "react"
import toast from "react-hot-toast"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  HiOutlineSearch, HiOutlineStar, HiOutlineTrash, HiOutlineReply,
  HiOutlinePaperAirplane, HiOutlineDotsVertical, HiOutlineExternalLink,
  HiOutlineChevronRight, HiOutlinePlus, HiOutlinePaperClip, HiOutlineUser,
  HiOutlineMail, HiOutlineInbox,
} from "react-icons/hi"
import { PageHeader } from "@/components/ui/PageHeader"
import { Badge } from "@/components/ui/Badge"
import { Modal } from "@/components/ui/Modal"
import { SearchInput } from "@/components/ui/SearchInput"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Textarea from "@/components/ui/Textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { EmptyState } from "@/components/ui/EmptyState"
import { mockMessages, mockStudents } from "@/lib/mock/data"
import { formatRelativeTime, cn } from "@/lib/utils"

interface Conversation {
  id: string
  participantName: string
  participantAvatar: string
  participantId: string
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
      participantId: last.senderId,
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
    [selectedConvId, conversations],
  )

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col">
      <PageHeader
        title="الرسائل"
        description="التواصل مع الطلاب وأولياء الأمور"
      />

      <div className="flex gap-4 flex-1 min-h-0">
        {/* Conversation List */}
        <div className={cn(
          "w-full md:w-80 lg:w-96 shrink-0 flex flex-col bg-card/60 backdrop-blur-xl border border-border rounded-[24px] overflow-hidden",
          !showMobileList && "hidden md:flex",
        )}>
          <div className="p-4 border-b border-border space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <SearchInput value={search} onChange={setSearch} placeholder="بحث في المحادثات..." />
              </div>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<HiOutlinePlus className="w-4 h-4" />}
                onClick={() => setShowCompose(true)}
              >
                جديدة
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-border/50">
            {filtered.length === 0 ? (
              <EmptyState icon={HiOutlineInbox} title="لا يوجد رسائل" description="لم يتم تبادل أي رسائل بعد" />
            ) : (
              filtered.map((conv) => (
                <button type="button"
                  key={conv.id}
                  onClick={() => { setSelectedConvId(conv.id); setShowMobileList(false) }}
                  className={cn(
                    "w-full text-right p-4 transition-all duration-200",
                    "hover:bg-card/40",
                    selectedConvId === conv.id && "bg-primary/5",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <div className="w-11 h-11 rounded-full bg-primary/10 border border-primary/20 overflow-hidden">
                        <img src={conv.participantAvatar} alt="" className="w-full h-full object-cover" />
                      </div>
                      {conv.unread && (
                        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full border-2 border-card" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={cn("text-sm truncate", conv.unread ? "font-semibold text-text" : "text-text-secondary")}>
                          {conv.participantName}
                        </span>
                        <span className="text-[11px] text-text-tertiary shrink-0">{formatRelativeTime(conv.lastMessageDate)}</span>
                      </div>
                      <p className={cn("text-xs truncate mt-0.5", conv.unread ? "text-text" : "text-text-tertiary")}>
                        {conv.lastMessage}
                      </p>
                    </div>
                    {conv.isStarred && <HiOutlineStar className="w-3.5 h-3.5 text-warning shrink-0 mt-1" />}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={cn(
          "flex-1 bg-card/60 backdrop-blur-xl border border-border rounded-[24px] overflow-hidden flex flex-col",
          showMobileList && "hidden md:flex",
        )}>
          {activeConversation ? (
            <>
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <button type="button" className="md:hidden p-1 text-text-tertiary hover:text-text transition-colors" onClick={() => setShowMobileList(true)}>
                    <HiOutlineChevronRight className="w-5 h-5" />
                  </button>
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 overflow-hidden">
                    <img src={activeConversation.participantAvatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text">{activeConversation.participantName}</p>
                    <p className="text-xs text-text-tertiary">متصل الآن</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button type="button"
                    onClick={() => toast.success("تم تحديث الحالة")}
                    className="p-2 rounded-[12px] text-text-tertiary hover:text-warning hover:bg-card/60 transition-all"
                  >
                    <HiOutlineStar className="w-4 h-4" />
                  </button>
                  <button type="button"
                    onClick={() => toast.success("تم حذف المحادثة")}
                    className="p-2 rounded-[12px] text-text-tertiary hover:text-error hover:bg-card/60 transition-all"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {activeConversation.messages.map((msg) => (
                  <div key={msg.id} className={cn("flex", msg.senderId === "t-1" ? "justify-start" : "justify-end")}>
                    <div className={cn(
                      "max-w-[75%] p-3.5 rounded-[20px]",
                      msg.senderId === "t-1"
                        ? "bg-primary/20 border border-primary/30 text-text rounded-tr-sm"
                        : "bg-card/80 backdrop-blur border border-border rounded-tl-sm",
                    )}>
                      <p className="text-sm">{msg.content}</p>
                      <div className={cn(
                        "flex items-center gap-2 mt-1.5",
                        msg.senderId === "t-1" ? "justify-end" : "justify-start",
                      )}>
                        <span className={cn("text-[11px]", msg.senderId === "t-1" ? "text-primary/60" : "text-text-tertiary")}>
                          {formatRelativeTime(msg.createdAt)}
                        </span>
                        {msg.attachments.length > 0 && (
                          <HiOutlinePaperClip className="w-3 h-3 text-text-tertiary" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="اكتب رسالتك..."
                    className="flex-1 bg-card/60 backdrop-blur border border-border rounded-[16px] px-4 py-2.5 text-sm text-text placeholder:text-text-tertiary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-250"
                  />
                  <button type="button" className="p-2.5 rounded-[12px] text-text-tertiary hover:text-primary hover:bg-card/60 transition-all">
                    <HiOutlinePaperClip className="w-5 h-5" />
                  </button>
                  <Button
                    variant="primary"
                    size="md"
                    leftIcon={<HiOutlinePaperAirplane className="w-4 h-4" />}
                    onClick={() => toast.success("تم إرسال الرسالة")}
                  >
                    إرسال
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-[24px] bg-card/60 backdrop-blur-xl border border-border flex items-center justify-center mx-auto mb-5 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                  <HiOutlinePaperAirplane className="w-8 h-8 text-text-tertiary" />
                </div>
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

      <Modal isOpen={showCompose} onClose={() => setShowCompose(false)} title="رسالة جديدة" size="lg">
        <div className="space-y-4">
          <Select
            label="إلى"
            options={mockStudents.slice(0, 20).map((s: any) => ({ value: s.id, label: s.name }))}
            placeholder="اختر المستلم"
          />
          <Input label="الموضوع" placeholder="عنوان الرسالة" />
          <Textarea label="نص الرسالة" placeholder="اكتب رسالتك هنا..." rows={5} />
          <div onClick={() => toast.success("قريباً...")}
            className="flex items-center gap-2 p-3.5 rounded-[16px] bg-card/60 backdrop-blur border border-border cursor-pointer hover:bg-card/80 transition-all"
          >
            <HiOutlinePaperClip className="w-4 h-4 text-text-tertiary" />
            <span className="text-sm text-text-tertiary">إرفاق ملف</span>
          </div>
          <div className="pt-4 flex gap-3">
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              leftIcon={<HiOutlinePaperAirplane className="w-4 h-4" />}
              onClick={() => { toast.success("تم إرسال الرسالة"); setShowCompose(false) }}
            >
              إرسال
            </Button>
            <Button variant="secondary" size="lg" onClick={() => setShowCompose(false)}>إلغاء</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

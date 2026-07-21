"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiSearch, HiUserGroup, HiChat, HiHeart, HiPaperAirplane,
  HiOutlineChat, HiOutlineUserGroup, HiOutlineClock, HiOutlineFilter,
  HiChevronRight
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"

interface Message {
  id: string
  user: string
  avatar: string
  text: string
  time: string
  likes: number
}

interface Group {
  id: string
  name: string
  members: number
  lastActive: string
  unread: number
  messages: Message[]
}

const groups: Group[] = [
  {
    id: "g1", name: "الكيمياء - الثانوية العامة", members: 1247, lastActive: "منذ 5 دقائق", unread: 12,
    messages: [
      { id: "m1", user: "أحمد علي", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1", text: "حد عنده فكرة عن تفاعلات الباب الثالث؟", time: "منذ 10 دقائق", likes: 5 },
      { id: "m2", user: "مريم حسن", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2", text: "هشرحلكم تفاعلات الاحلال البسيط بطريقة سهلة", time: "منذ 8 دقائق", likes: 12 },
      { id: "m3", user: "خالد صقر", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3", text: "فيديو النهاردة عن الاتزان الكيميائي، يا ريت نشوفه", time: "منذ 5 دقائق", likes: 24 },
      { id: "m4", user: "ندى سامي", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4", text: "ايه رأيكم ظپظٹ امتحان الأسبوع ده؟", time: "منذ 3 دقائق", likes: 3 },
    ],
  },
  {
    id: "g2", name: "الرياضيات - التفاضل", members: 982, lastActive: "منذ 15 دقيقة", unread: 5,
    messages: [
      { id: "m5", user: "عمر مصطفى", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5", text: "ممكن حد يشرح لي قاعدة السلسلة؟", time: "منذ 20 دقيقة", likes: 8 },
      { id: "m6", user: "سارة أحمد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=6", text: "عندي ملخص جميل للتفاضل هرفعه", time: "منذ 12 دقيقة", likes: 15 },
    ],
  },
  {
    id: "g3", name: "الفيزياء - الكهربية", members: 756, lastActive: "منذ 30 دقيقة", unread: 3,
    messages: [
      { id: "m7", user: "محمد جمال", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=7", text: "قانون أوم بطريقة بسيطة من شرح مستر محمد", time: "منذ 35 دقيقة", likes: 10 },
    ],
  },
  {
    id: "g4", name: "العربي - النحو", members: 1103, lastActive: "منذ 10 دقائق", unread: 8,
    messages: [
      { id: "m8", user: "ط¢ظٹط© كريم", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=8", text: "إعراب الجمل دي صعبة أوي!", time: "منذ 15 دقيقة", likes: 6 },
      { id: "m9", user: "نور الدين", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=9", text: "شوفوا فيديو شرح كان وأخواتها هتظبط", time: "منذ 7 دقائق", likes: 11 },
    ],
  },
  {
    id: "g5", name: "الإنجليزي - Grammar", members: 834, lastActive: "منذ ساعة", unread: 2,
    messages: [
      { id: "m10", user: "يوسف محمود", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=10", text: "Anyone struggling with passive voice?", time: "منذ ساعتين", likes: 7 },
    ],
  },
  {
    id: "g6", name: "استفسارات عامة", members: 2100, lastActive: "منذ دقيقتين", unread: 25,
    messages: [
      { id: "m11", user: "منى شريف", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=11", text: "الامتحانات هتبدأ امتى؟", time: "منذ 5 دقائق", likes: 4 },
      { id: "m12", user: "أستاذ أحمد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=12", text: "مهم: مراجعة امتحانات نهاية العام متاحة الآن", time: "منذ 2 دقيقة", likes: 30 },
    ],
  },
]

export default function CommunityPage() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [search, setSearch] = useState("")
  const [newPost, setNewPost] = useState("")
  const [liked, setLiked] = useState<Set<string>>(new Set())

  const filteredGroups = useMemo(() => {
    if (!search) return groups
    const q = search.toLowerCase()
    return groups.filter((g) => g.name.includes(q) || g.messages.some((m) => m.text.includes(q)))
  }, [search])

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  const handlePost = () => {
    if (!newPost.trim() || !selectedGroup) return
    const msg: Message = {
      id: `new-${Date.now()}`,
      user: "أنت",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=me",
      text: newPost,
      time: "الآن",
      likes: 0,
    }
    selectedGroup.messages.push(msg)
    setNewPost("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface to-surface-secondary">
      <DashboardHeader />
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-text mb-6 flex items-center gap-2">
          <HiOutlineUserGroup className="w-6 h-6 text-primary" /> مجتمع الطلاب
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-3">
            <div className="relative">
              <HiSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث ظپظٹ المجموعات..."
                className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
            </div>

            <div className="space-y-2">
              {filteredGroups.map((group) => (
                <motion.button key={group.id} type="button" layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  onClick={() => setSelectedGroup(group)}
                  className={`w-full text-right p-3.5 rounded-xl border transition-all ${selectedGroup?.id === group.id ? "bg-primary/5 border-primary/30" : "bg-surface border-border hover:border-primary/20"}`}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <HiOutlineUserGroup className="w-4 h-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-text truncate">{group.name}</p>
                        <p className="text-xs text-text-tertiary">{group.members.toLocaleString()} عضو</p>
                      </div>
                    </div>
                    <div className="shrink-0 text-left">
                      {group.unread > 0 && (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-[10px] text-white font-medium">{group.unread}</span>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedGroup ? (
              <motion.div key={selectedGroup.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-surface rounded-2xl border border-border overflow-hidden flex flex-col h-[600px]">
                <div className="p-4 border-b border-border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <HiOutlineUserGroup className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-text text-sm">{selectedGroup.name}</p>
                    <p className="text-xs text-text-tertiary">{selectedGroup.members.toLocaleString()} عضو - آخر نشاط {selectedGroup.lastActive}</p>
                  </div>
                  <button type="button" onClick={() => setSelectedGroup(null)} className="mr-auto p-1.5 text-text-tertiary hover:text-text rounded-lg hover:bg-surface-secondary transition-colors lg:hidden">
                    <HiChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {selectedGroup.messages.map((msg) => (
                    <div key={msg.id} className="flex gap-3 group">
                      <img src={msg.avatar} alt="" className="w-8 h-8 rounded-full shrink-0 mt-0.5 bg-surface-secondary" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-medium text-text">{msg.user}</span>
                          <span className="text-[10px] text-text-tertiary">{msg.time}</span>
                        </div>
                        <p className="text-sm text-text-secondary">{msg.text}</p>
                        <button type="button" onClick={() => toggleLike(msg.id)}
                          className={`flex items-center gap-1 mt-1 text-xs transition-colors ${liked.has(msg.id) ? "text-red-500" : "text-text-tertiary hover:text-red-400"}`}>
                          <HiHeart className={`w-3.5 h-3.5 ${liked.has(msg.id) ? "fill-current" : ""}`} />
                          {msg.likes + (liked.has(msg.id) ? 1 : 0)}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 border-t border-border flex gap-2">
                  <input value={newPost} onChange={(e) => setNewPost(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handlePost()}
                    placeholder="اكتب رسالتك..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-surface-secondary border border-border text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                  <button type="button" onClick={handlePost} disabled={!newPost.trim()}
                    className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary-dark transition-colors disabled:opacity-40">
                    <HiPaperAirplane className="w-4 h-4 rotate-90" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="h-[600px] flex flex-col items-center justify-center text-text-tertiary bg-surface rounded-2xl border border-border">
                <HiOutlineChat className="w-16 h-16 mb-4 opacity-30" />
                <p className="font-medium">اختر مجموعة للدخول ظپظٹ النقاش</p>
                <p className="text-xs mt-1">شارك زملاءك الأسئلة والأفكار</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

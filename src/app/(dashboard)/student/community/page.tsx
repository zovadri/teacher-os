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
    id: "g1", name: "ط§ظ„ظƒظٹظ…ظٹط§ط، - ط§ظ„ط«ط§ظ†ظˆظٹط© ط§ظ„ط¹ط§ظ…ط©", members: 1247, lastActive: "ظ…ظ†ط° 5 ط¯ظ‚ط§ط¦ظ‚", unread: 12,
    messages: [
      { id: "m1", user: "ط£ط­ظ…ط¯ ط¹ظ„ظٹ", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1", text: "ط­ط¯ ط¹ظ†ط¯ظ‡ ظپظƒط±ط© ط¹ظ† طھظپط§ط¹ظ„ط§طھ ط§ظ„ط¨ط§ط¨ ط§ظ„ط«ط§ظ„ط«طں", time: "ظ…ظ†ط° 10 ط¯ظ‚ط§ط¦ظ‚", likes: 5 },
      { id: "m2", user: "ظ…ط±ظٹظ… ط­ط³ظ†", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2", text: "ظ‡ط´ط±ط­ظ„ظƒظ… طھظپط§ط¹ظ„ط§طھ ط§ظ„ط§ط­ظ„ط§ظ„ ط§ظ„ط¨ط³ظٹط· ط¨ط·ط±ظٹظ‚ط© ط³ظ‡ظ„ط©", time: "ظ…ظ†ط° 8 ط¯ظ‚ط§ط¦ظ‚", likes: 12 },
      { id: "m3", user: "ط®ط§ظ„ط¯ طµظ‚ط±", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3", text: "ظپظٹط¯ظٹظˆ ط§ظ„ظ†ظ‡ط§ط±ط¯ط© ط¹ظ† ط§ظ„ط§طھط²ط§ظ† ط§ظ„ظƒظٹظ…ظٹط§ط¦ظٹطŒ ظٹط§ ط±ظٹطھ ظ†ط´ظˆظپظ‡", time: "ظ…ظ†ط° 5 ط¯ظ‚ط§ط¦ظ‚", likes: 24 },
      { id: "m4", user: "ظ†ط¯ظ‰ ط³ط§ظ…ظٹ", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4", text: "ط§ظٹظ‡ ط±ط£ظٹظƒظ… ظپظٹ ط§ظ…طھط­ط§ظ† ط§ظ„ط£ط³ط¨ظˆط¹ ط¯ظ‡طں", time: "ظ…ظ†ط° 3 ط¯ظ‚ط§ط¦ظ‚", likes: 3 },
    ],
  },
  {
    id: "g2", name: "ط§ظ„ط±ظٹط§ط¶ظٹط§طھ - ط§ظ„طھظپط§ط¶ظ„", members: 982, lastActive: "ظ…ظ†ط° 15 ط¯ظ‚ظٹظ‚ط©", unread: 5,
    messages: [
      { id: "m5", user: "ط¹ظ…ط± ظ…طµط·ظپظ‰", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5", text: "ظ…ظ…ظƒظ† ط­ط¯ ظٹط´ط±ط­ ظ„ظٹ ظ‚ط§ط¹ط¯ط© ط§ظ„ط³ظ„ط³ظ„ط©طں", time: "ظ…ظ†ط° 20 ط¯ظ‚ظٹظ‚ط©", likes: 8 },
      { id: "m6", user: "ط³ط§ط±ط© ط£ط­ظ…ط¯", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=6", text: "ط¹ظ†ط¯ظٹ ظ…ظ„ط®طµ ط¬ظ…ظٹظ„ ظ„ظ„طھظپط§ط¶ظ„ ظ‡ط±ظپط¹ظ‡", time: "ظ…ظ†ط° 12 ط¯ظ‚ظٹظ‚ط©", likes: 15 },
    ],
  },
  {
    id: "g3", name: "ط§ظ„ظپظٹط²ظٹط§ط، - ط§ظ„ظƒظ‡ط±ط¨ظٹط©", members: 756, lastActive: "ظ…ظ†ط° 30 ط¯ظ‚ظٹظ‚ط©", unread: 3,
    messages: [
      { id: "m7", user: "ظ…ط­ظ…ط¯ ط¬ظ…ط§ظ„", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=7", text: "ظ‚ط§ظ†ظˆظ† ط£ظˆظ… ط¨ط·ط±ظٹظ‚ط© ط¨ط³ظٹط·ط© ظ…ظ† ط´ط±ط­ ظ…ط³طھط± ظ…ط­ظ…ط¯", time: "ظ…ظ†ط° 35 ط¯ظ‚ظٹظ‚ط©", likes: 10 },
    ],
  },
  {
    id: "g4", name: "ط§ظ„ط¹ط±ط¨ظٹ - ط§ظ„ظ†ط­ظˆ", members: 1103, lastActive: "ظ…ظ†ط° 10 ط¯ظ‚ط§ط¦ظ‚", unread: 8,
    messages: [
      { id: "m8", user: "ط¢ظٹط© ظƒط±ظٹظ…", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=8", text: "ط¥ط¹ط±ط§ط¨ ط§ظ„ط¬ظ…ظ„ ط¯ظٹ طµط¹ط¨ط© ط£ظˆظٹ!", time: "ظ…ظ†ط° 15 ط¯ظ‚ظٹظ‚ط©", likes: 6 },
      { id: "m9", user: "ظ†ظˆط± ط§ظ„ط¯ظٹظ†", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=9", text: "ط´ظˆظپظˆط§ ظپظٹط¯ظٹظˆ ط´ط±ط­ ظƒط§ظ† ظˆط£ط®ظˆط§طھظ‡ط§ ظ‡طھط¸ط¨ط·", time: "ظ…ظ†ط° 7 ط¯ظ‚ط§ط¦ظ‚", likes: 11 },
    ],
  },
  {
    id: "g5", name: "ط§ظ„ط¥ظ†ط¬ظ„ظٹط²ظٹ - Grammar", members: 834, lastActive: "ظ…ظ†ط° ط³ط§ط¹ط©", unread: 2,
    messages: [
      { id: "m10", user: "ظٹظˆط³ظپ ظ…ط­ظ…ظˆط¯", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=10", text: "Anyone struggling with passive voice?", time: "ظ…ظ†ط° ط³ط§ط¹طھظٹظ†", likes: 7 },
    ],
  },
  {
    id: "g6", name: "ط§ط³طھظپط³ط§ط±ط§طھ ط¹ط§ظ…ط©", members: 2100, lastActive: "ظ…ظ†ط° ط¯ظ‚ظٹظ‚طھظٹظ†", unread: 25,
    messages: [
      { id: "m11", user: "ظ…ظ†ظ‰ ط´ط±ظٹظپ", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=11", text: "ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ ظ‡طھط¨ط¯ط£ ط§ظ…طھظ‰طں", time: "ظ…ظ†ط° 5 ط¯ظ‚ط§ط¦ظ‚", likes: 4 },
      { id: "m12", user: "ط£ط³طھط§ط° ط£ط­ظ…ط¯", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=12", text: "ظ…ظ‡ظ…: ظ…ط±ط§ط¬ط¹ط© ط§ظ…طھط­ط§ظ†ط§طھ ظ†ظ‡ط§ظٹط© ط§ظ„ط¹ط§ظ… ظ…طھط§ط­ط© ط§ظ„ط¢ظ†", time: "ظ…ظ†ط° 2 ط¯ظ‚ظٹظ‚ط©", likes: 30 },
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
      user: "ط£ظ†طھ",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=me",
      text: newPost,
      time: "ط§ظ„ط¢ظ†",
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
          <HiOutlineUserGroup className="w-6 h-6 text-primary" /> ظ…ط¬طھظ…ط¹ ط§ظ„ط·ظ„ط§ط¨
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-3">
            <div className="relative">
              <HiSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="ط§ط¨ط­ط« ظپظٹ ط§ظ„ظ…ط¬ظ…ظˆط¹ط§طھ..."
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
                        <p className="text-xs text-text-tertiary">{group.members.toLocaleString()} ط¹ط¶ظˆ</p>
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
                    <p className="text-xs text-text-tertiary">{selectedGroup.members.toLocaleString()} ط¹ط¶ظˆ - ط¢ط®ط± ظ†ط´ط§ط· {selectedGroup.lastActive}</p>
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
                    placeholder="ط§ظƒطھط¨ ط±ط³ط§ظ„طھظƒ..."
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
                <p className="font-medium">ط§ط®طھط± ظ…ط¬ظ…ظˆط¹ط© ظ„ظ„ط¯ط®ظˆظ„ ظپظٹ ط§ظ„ظ†ظ‚ط§ط´</p>
                <p className="text-xs mt-1">ط´ط§ط±ظƒ ط²ظ…ظ„ط§ط،ظƒ ط§ظ„ط£ط³ط¦ظ„ط© ظˆط§ظ„ط£ظپظƒط§ط±</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

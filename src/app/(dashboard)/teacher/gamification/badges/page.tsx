"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineBadgeCheck,
  HiOutlineStar,
  HiOutlineCollection,
  HiOutlineUsers,
  HiOutlineChevronDown,
} from "react-icons/hi"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import { Modal } from "@/components/ui/Modal"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import { SearchInput } from "@/components/ui/SearchInput"
import { mockGamificationConfig, mockStudentXpData } from "@/lib/mock/data"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"

const allBadges = mockGamificationConfig.badgeCategories.flatMap((cat) =>
  cat.badges.map((name, bi) => ({
    id: `badge-${cat.id}-${name}`,
    name,
    category: cat.name,
    categoryIcon: cat.icon,
    xpReward: [150, 200, 100, 250, 80][bi % 5],
    criteria: ["ط·آ¥ط¸ئ’ط¸â€¦ط·آ§ط¸â€‍ 10 ط·آ¯ط·آ±ط¸ث†ط·آ³", "ط·آ§ط¸â€‍ط·آ­ط·آµط¸ث†ط¸â€‍ ط·آ¹ط¸â€‍ط¸â€° 95%", "ط·آ§ط¸â€‍ط¸â€¦ط·آ´ط·آ§ط·آ±ط¸ئ’ط·آ© ط¸ظ¾ط¸ظ¹ 5 ط¸â€¦ط¸â€ ط·آ§ط¸â€ڑط·آ´ط·آ§ط·ع¾", "ط·ع¾ط·آ³ط¸â€‍ط·آ³ط¸â€‍ 20 ط¸ظ¹ط¸ث†ط¸â€¦"][bi % 4],
    studentsCount: [15, 22, 30, 8, 18][bi % 5],
    icon: ["ظ‹ع؛â€œâ€“", "ظ‹ع؛â€œâ€¦", "ظ‹ع؛عکآ¯", "ظ‹ع؛آ¤â€Œ", "ظ‹ع؛â€کâ€ک"][bi % 5],
  }))
)

const mockStudentsWhoEarned: Record<string, { id: string; name: string; date: string }[]> = {}
allBadges.forEach((b, bi) => {
  const count = [1, 3, 5, 7, 2][bi % 5]
  mockStudentsWhoEarned[b.id] = mockStudentXpData.slice(0, count).map((s, si) => ({
    id: s.studentId,
    name: s.studentName,
    date: new Date(Date.now() - si * 86400000 * 3).toLocaleDateString("ar-EG"),
  }))
})

const iconOptions = [
  { value: "ظ‹ع؛â€œâ€“", label: "ظ‹ع؛â€œâ€“ ط¸ئ’ط·ع¾ط·آ§ط·آ¨" },
  { value: "ظ‹ع؛â€œâ€¦", label: "ظ‹ع؛â€œâ€¦ ط·ع¾ط¸â€ڑط¸ث†ط¸ظ¹ط¸â€¦" },
  { value: "ظ‹ع؛عکآ¯", label: "ظ‹ع؛عکآ¯ ط¸â€،ط·آ¯ط¸ظ¾" },
  { value: "ظ‹ع؛آ¤â€Œ", label: "ظ‹ع؛آ¤â€Œ ط¸â€¦ط·آµط·آ§ط¸ظ¾ط·آ­ط·آ©" },
  { value: "ظ‹ع؛â€کâ€ک", label: "ظ‹ع؛â€کâ€ک ط·ع¾ط·آ§ط·آ¬" },
  { value: "ظ‹ع؛â€‌آ¥", label: "ظ‹ع؛â€‌آ¥ ط¸â€ ط·آ§ط·آ±" },
  { value: "أ¢آ­ع¯", label: "أ¢آ­ع¯ ط¸â€ ط·آ¬ط¸â€¦ط·آ©" },
  { value: "ظ‹ع؛â€™ع¾", label: "ظ‹ع؛â€™ع¾ ط¸â€ڑط¸ث†ط·آ©" },
  { value: "ظ‹ع؛عˆâ€¦", label: "ظ‹ع؛عˆâ€¦ ط¸ث†ط·آ³ط·آ§ط¸â€¦" },
  { value: "ظ‹ع؛ع‘â‚¬", label: "ظ‹ع؛ع‘â‚¬ ط·آµط·آ§ط·آ±ط¸ث†ط·آ®" },
]

export default function BadgesPage() {
  const [search, setSearch] = useState("")
  const [showCreate, setShowCreate] = useState(false)
  const [expandedBadge, setExpandedBadge] = useState<string | null>(null)
  const [newBadge, setNewBadge] = useState({ name: "", icon: "ظ‹ع؛عˆâ€¦", category: "ط·آ£ط¸ئ’ط·آ§ط·آ¯ط¸ظ¹ط¸â€¦ط¸ظ¹", xpReward: 100, criteria: "" })

  const stats = useMemo(() => ({
    total: allBadges.length,
    categories: mockGamificationConfig.badgeCategories.length,
    totalIssued: allBadges.reduce((s, b) => s + b.studentsCount, 0),
  }), [])

  const filtered = useMemo(() => {
    if (!search) return allBadges
    return allBadges.filter((b) => b.name.includes(search) || b.category.includes(search))
  }, [search])

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "ط§ظ„ط£ظ„ط¹ط§ط¨", href: "/teacher/gamification" }, { label: "ط§ظ„ط´ط§ط±ط§طھ" }]} />
      <DashboardHeader title="ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط·آ§ط¸â€‍ط·آ´ط·آ§ط·آ±ط·آ§ط·ع¾" subtitle="ط·آ¥ط¸â€ ط·آ´ط·آ§ط·طŒ ط¸ث†ط·ع¾ط·آ¹ط·آ¯ط¸ظ¹ط¸â€‍ ط·آ§ط¸â€‍ط·آ´ط·آ§ط·آ±ط·آ§ط·ع¾ ط¸ث†ط·آ§ط¸â€‍ط¸â€¦ط¸ئ’ط·آ§ط¸ظ¾ط·آ¢ط·ع¾" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-4">
        <StatsCard title="ط·آ¥ط·آ¬ط¸â€¦ط·آ§ط¸â€‍ط¸ظ¹ ط·آ§ط¸â€‍ط·آ´ط·آ§ط·آ±ط·آ§ط·ع¾" value={stats.total} icon={HiOutlineBadgeCheck} color="primary" />
        <StatsCard title="ط·آ§ط¸â€‍ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾ط·آ§ط·ع¾" value={stats.categories} icon={HiOutlineCollection} color="info" />
        <StatsCard title="ط·ع¾ط¸â€¦ ط·آ¥ط·آµط·آ¯ط·آ§ط·آ±ط¸â€،ط·آ§" value={stats.totalIssued} icon={HiOutlineUsers} color="success" />
      </motion.div>

      <div className="flex items-center justify-between">
        <SearchInput value={search} onChange={setSearch} placeholder="ط·آ¨ط·آ­ط·آ« ط·آ¹ط¸â€  ط·آ´ط·آ§ط·آ±ط·آ©..." className="max-w-xs" />
        <Button variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowCreate(true)}>
          ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ© ط·آ´ط·آ§ط·آ±ط·آ© ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯ط·آ©
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((badge, idx) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.03 }}
          >
            <Card hover className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-primary-100/30 to-transparent dark:from-primary-900/20 rounded-bl-full" />
              <div className="flex items-start justify-between relative">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/40 dark:to-primary-800/20 flex items-center justify-center text-2xl">
                    {badge.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-text">{badge.name}</h3>
                    <Badge variant="primary" size="sm">{badge.category}</Badge>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button type="button" onClick={() => toast.success("طھظ… طھط¹ط¯ظٹظ„ ط§ظ„ط´ط§ط±ط© ط¨ظ†ط¬ط§ط­")} className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"><HiOutlinePencil size={15} /></button>
                  <button type="button" onClick={() => toast.success("طھظ… ط­ط°ظپ ط§ظ„ط´ط§ط±ط© ط¨ظ†ط¬ط§ط­")} className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors"><HiOutlineTrash size={15} /></button>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <HiOutlineStar className="w-4 h-4 text-warning" />
                  <span className="font-semibold text-text">+{badge.xpReward} XP</span>
                </div>
                <span className="text-text-tertiary text-xs">{badge.criteria}</span>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <span className="text-xs text-text-secondary"><HiOutlineUsers className="w-3.5 h-3.5 inline ml-1" />{badge.studentsCount} ط·آ·ط·آ§ط¸â€‍ط·آ¨</span>
                <button type="button"
                  onClick={() => setExpandedBadge(expandedBadge === badge.id ? null : badge.id)}
                  className="flex items-center gap-1 text-xs text-primary hover:text-primary-dark transition-colors"
                >
                  ط·آ¹ط·آ±ط·آ¶ ط·آ§ط¸â€‍ط·آ­ط·آ§ط·آµط¸â€‍ط¸ظ¹ط¸â€ 
                  <HiOutlineChevronDown className={cn("w-3 h-3 transition-transform", expandedBadge === badge.id && "rotate-180")} />
                </button>
              </div>

              {expandedBadge === badge.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="overflow-hidden mt-3 pt-3 border-t border-border">
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {mockStudentsWhoEarned[badge.id]?.map((s) => (
                      <div key={s.id} className="flex items-center justify-between text-xs px-2 py-1.5 rounded-lg hover:bg-surface-secondary">
                        <span className="font-medium text-text">{s.name}</span>
                        <span className="text-text-tertiary">{s.date}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="ط·آ¥ط¸â€ ط·آ´ط·آ§ط·طŒ ط·آ´ط·آ§ط·آ±ط·آ© ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯ط·آ©" size="lg">
        <div className="space-y-4">
          <Input
            label="ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط·آ´ط·آ§ط·آ±ط·آ©"
            value={newBadge.name}
            onChange={(e) => setNewBadge({ ...newBadge, name: e.target.value })}
            placeholder="ط·آ£ط·آ¯ط·آ®ط¸â€‍ ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط·آ´ط·آ§ط·آ±ط·آ©"
          />
          <Select
            label="ط·آ§ط¸â€‍ط·آ£ط¸ظ¹ط¸â€ڑط¸ث†ط¸â€ ط·آ©"
            options={iconOptions}
            value={newBadge.icon}
            onChange={(e) => setNewBadge({ ...newBadge, icon: e.target.value })}
          />
          <Select
            label="ط·آ§ط¸â€‍ط·ع¾ط·آµط¸â€ ط¸ظ¹ط¸ظ¾"
            options={mockGamificationConfig.badgeCategories.map((c) => ({ value: c.name, label: `${c.icon} ${c.name}` }))}
            value={newBadge.category}
            onChange={(e) => setNewBadge({ ...newBadge, category: e.target.value })}
          />
          <Input
            label="ط¸â€¦ط¸ئ’ط·آ§ط¸ظ¾ط·آ£ط·آ© XP"
            type="number"
            value={newBadge.xpReward}
            onChange={(e) => setNewBadge({ ...newBadge, xpReward: Number(e.target.value) })}
          />
          <Input
            label="ط¸â€¦ط·آ¹ط¸ظ¹ط·آ§ط·آ± ط·آ§ط¸â€‍ط·آ­ط·آµط¸ث†ط¸â€‍"
            value={newBadge.criteria}
            onChange={(e) => setNewBadge({ ...newBadge, criteria: e.target.value })}
            placeholder="ط¸â€¦ط·آ«ط·آ§ط¸â€‍: ط·آ¥ط¸ئ’ط¸â€¦ط·آ§ط¸â€‍ 10 ط·آ¯ط·آ±ط¸ث†ط·آ³"
          />
          <div className="flex gap-3 pt-2">
            <Button variant="primary" className="flex-1" onClick={() => { setShowCreate(false); toast.success("طھظ… ط¥ظ†ط´ط§ط، ط§ظ„ط´ط§ط±ط© ط¨ظ†ط¬ط§ط­") }}>ط·آ¥ط¸â€ ط·آ´ط·آ§ط·طŒ ط·آ§ط¸â€‍ط·آ´ط·آ§ط·آ±ط·آ©</Button>
            <Button variant="secondary" onClick={() => setShowCreate(false)}>ط·آ¥ط¸â€‍ط·ط›ط·آ§ط·طŒ</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

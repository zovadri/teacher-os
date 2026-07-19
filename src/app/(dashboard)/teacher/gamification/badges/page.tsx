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
    criteria: ["ط¥ظƒظ…ط§ظ„ 10 ط¯ط±ظˆط³", "ط§ظ„ط­طµظˆظ„ ط¹ظ„ظ‰ 95%", "ط§ظ„ظ…ط´ط§ط±ظƒط© ظپظٹ 5 ظ…ظ†ط§ظ‚ط´ط§طھ", "طھط³ظ„ط³ظ„ 20 ظٹظˆظ…"][bi % 4],
    studentsCount: [15, 22, 30, 8, 18][bi % 5],
    icon: ["ًں“–", "ًں“…", "ًںژ¯", "ًں¤‌", "ًں‘‘"][bi % 5],
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
  { value: "ًں“–", label: "ًں“– ظƒطھط§ط¨" },
  { value: "ًں“…", label: "ًں“… طھظ‚ظˆظٹظ…" },
  { value: "ًںژ¯", label: "ًںژ¯ ظ‡ط¯ظپ" },
  { value: "ًں¤‌", label: "ًں¤‌ ظ…طµط§ظپط­ط©" },
  { value: "ًں‘‘", label: "ًں‘‘ طھط§ط¬" },
  { value: "ًں”¥", label: "ًں”¥ ظ†ط§ط±" },
  { value: "â­گ", label: "â­گ ظ†ط¬ظ…ط©" },
  { value: "ًں’ھ", label: "ًں’ھ ظ‚ظˆط©" },
  { value: "ًںڈ…", label: "ًںڈ… ظˆط³ط§ظ…" },
  { value: "ًںڑ€", label: "ًںڑ€ طµط§ط±ظˆط®" },
]

export default function BadgesPage() {
  const [search, setSearch] = useState("")
  const [showCreate, setShowCreate] = useState(false)
  const [expandedBadge, setExpandedBadge] = useState<string | null>(null)
  const [newBadge, setNewBadge] = useState({ name: "", icon: "ًںڈ…", category: "ط£ظƒط§ط¯ظٹظ…ظٹ", xpReward: 100, criteria: "" })

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
      <Breadcrumb items={[{ label: "الألعاب", href: "/teacher/gamification" }, { label: "الشارات" }]} />
      <DashboardHeader title="ط¥ط¯ط§ط±ط© ط§ظ„ط´ط§ط±ط§طھ" subtitle="ط¥ظ†ط´ط§ط، ظˆطھط¹ط¯ظٹظ„ ط§ظ„ط´ط§ط±ط§طھ ظˆط§ظ„ظ…ظƒط§ظپط¢طھ" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-4">
        <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط´ط§ط±ط§طھ" value={stats.total} icon={HiOutlineBadgeCheck} color="primary" />
        <StatsCard title="ط§ظ„طھطµظ†ظٹظپط§طھ" value={stats.categories} icon={HiOutlineCollection} color="info" />
        <StatsCard title="طھظ… ط¥طµط¯ط§ط±ظ‡ط§" value={stats.totalIssued} icon={HiOutlineUsers} color="success" />
      </motion.div>

      <div className="flex items-center justify-between">
        <SearchInput value={search} onChange={setSearch} placeholder="ط¨ط­ط« ط¹ظ† ط´ط§ط±ط©..." className="max-w-xs" />
        <button type="button" variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowCreate(true)}>
          ط¥ط¶ط§ظپط© ط´ط§ط±ط© ط¬ط¯ظٹط¯ط©
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
                  <button type="button" onClick={() => toast.success("تم تعديل الشارة بنجاح")} className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"><HiOutlinePencil size={15} /></button>
                  <button type="button" onClick={() => toast.success("تم حذف الشارة بنجاح")} className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/5 rounded-lg transition-colors"><HiOutlineTrash size={15} /></button>
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
                <span className="text-xs text-text-secondary"><HiOutlineUsers className="w-3.5 h-3.5 inline ml-1" />{badge.studentsCount} ط·ط§ظ„ط¨</span>
                <button type="button"
                  onClick={() => setExpandedBadge(expandedBadge === badge.id ? null : badge.id)}
                  className="flex items-center gap-1 text-xs text-primary hover:text-primary-dark transition-colors"
                >
                  ط¹ط±ط¶ ط§ظ„ط­ط§طµظ„ظٹظ†
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

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="ط¥ظ†ط´ط§ط، ط´ط§ط±ط© ط¬ط¯ظٹط¯ط©" size="lg">
        <div className="space-y-4">
          <Input
            label="ط§ط³ظ… ط§ظ„ط´ط§ط±ط©"
            value={newBadge.name}
            onChange={(e) => setNewBadge({ ...newBadge, name: e.target.value })}
            placeholder="ط£ط¯ط®ظ„ ط§ط³ظ… ط§ظ„ط´ط§ط±ط©"
          />
          <Select
            label="ط§ظ„ط£ظٹظ‚ظˆظ†ط©"
            options={iconOptions}
            value={newBadge.icon}
            onChange={(e) => setNewBadge({ ...newBadge, icon: e.target.value })}
          />
          <Select
            label="ط§ظ„طھطµظ†ظٹظپ"
            options={mockGamificationConfig.badgeCategories.map((c) => ({ value: c.name, label: `${c.icon} ${c.name}` }))}
            value={newBadge.category}
            onChange={(e) => setNewBadge({ ...newBadge, category: e.target.value })}
          />
          <Input
            label="ظ…ظƒط§ظپط£ط© XP"
            type="number"
            value={newBadge.xpReward}
            onChange={(e) => setNewBadge({ ...newBadge, xpReward: Number(e.target.value) })}
          />
          <Input
            label="ظ…ط¹ظٹط§ط± ط§ظ„ط­طµظˆظ„"
            value={newBadge.criteria}
            onChange={(e) => setNewBadge({ ...newBadge, criteria: e.target.value })}
            placeholder="ظ…ط«ط§ظ„: ط¥ظƒظ…ط§ظ„ 10 ط¯ط±ظˆط³"
          />
          <div className="flex gap-3 pt-2">
            <button type="button" variant="primary" className="flex-1" onClick={() => { setShowCreate(false); toast.success("تم إنشاء الشارة بنجاح") }}>ط¥ظ†ط´ط§ط، ط§ظ„ط´ط§ط±ط©</Button>
            <Button variant="secondary" onClick={() => setShowCreate(false)}>ط¥ظ„ط؛ط§ط،</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

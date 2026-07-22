"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineStar,
  HiStar,
  HiOutlineUsers,
  HiOutlinePlus,
  HiOutlineSearch,
  HiOutlineCheck,
  HiOutlineX,
} from "react-icons/hi"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Avatar } from "@/components/ui/Avatar"
import Button from "@/components/ui/Button"
import { Modal } from "@/components/ui/Modal"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import { Progress } from "@/components/ui/Progress"
import { SearchInput } from "@/components/ui/SearchInput"
import { mockAchievements, mockStudentXpData } from "@/lib/mock/data"
import { cn, formatDate, det } from "@/lib/utils"
import toast from "react-hot-toast"

const studentAchievements: Record<string, string[]> = {}
mockStudentXpData.forEach((s) => {
  const count = Math.floor(det() * 5)
  const shuffled = [...mockAchievements].sort(() => det() - 0.5).slice(0, count)
  studentAchievements[s.studentId] = shuffled.map((a) => a.id)
})

export default function AchievementsPage() {
  const [search, setSearch] = useState("")
  const [selectedAch, setSelectedAch] = useState<string | null>(null)
  const [showAward, setShowAward] = useState(false)
  const [awardAchId, setAwardAchId] = useState("")
  const [awardStudentId, setAwardStudentId] = useState("")
  const [showAllStudents, setShowAllStudents] = useState<string | null>(null)

  const stats = useMemo(() => ({
    total: mockAchievements.length,
    totalAwarded: Object.values(studentAchievements).reduce((s, arr) => s + arr.length, 0),
    awardedStudents: Object.keys(studentAchievements).filter((sid) => studentAchievements[sid].length > 0).length,
  }), [])

  const achievementStats = useMemo(() => {
    return mockAchievements.map((ach) => {
      const count = Object.values(studentAchievements).filter((arr) => arr.includes(ach.id)).length
      return { ...ach, earnedCount: count, pct: Math.round((count / mockStudentXpData.length) * 100) }
    })
  }, [])

  const filtered = useMemo(() => {
    if (!search) return achievementStats
    return achievementStats.filter((a) => a.name.includes(search) || a.description.includes(search))
  }, [search])

  const studentsForAchievement = (achId: string) => {
    return mockStudentXpData.filter((s) => studentAchievements[s.studentId]?.includes(achId))
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "الألعاب", href: "/teacher/gamification" }, { label: "الإنجازات" }]} />
      <DashboardHeader title="إدارة الإنجازات" subtitle="عرض وإدارة الإنجازات وتتبع تقدم الطلاب" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-4">
        <StatsCard title="إجمالي الإنجازات" value={stats.total} icon={HiStar} color="primary" />
        <StatsCard title="تم منحها" value={stats.totalAwarded} icon={HiOutlineStar} color="warning" />
        <StatsCard title="الطلاب الحاصلون" value={stats.awardedStudents} icon={HiOutlineUsers} color="success" />
      </motion.div>

      <div className="flex items-center justify-between">
        <SearchInput value={search} onChange={setSearch} placeholder="بحث عن إنجاز..." className="max-w-xs" />
        <Button variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => { setAwardAchId(""); setAwardStudentId(""); setShowAward(true) }}>
          منح إنجاز لطالب
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((ach, idx) => (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
          >
            <div
              onClick={() => setSelectedAch(selectedAch === ach.id ? null : ach.id)}
              className="cursor-pointer"
            >
              <Card hover className={cn("relative overflow-hidden", selectedAch === ach.id && "ring-2 ring-primary")}>
              <div className={cn(
                "absolute inset-0 opacity-5",
                ach.earnedCount > mockStudentXpData.length * 0.5 ? "bg-success" : ach.earnedCount > mockStudentXpData.length * 0.2 ? "bg-primary" : "bg-text-tertiary"
              )} />
              <div className="text-3xl mb-2">{ach.icon}</div>
              <h3 className="font-bold text-text">{ach.name}</h3>
              <p className="text-xs text-text-tertiary mt-1 line-clamp-2">{ach.description}</p>
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="warning" size="sm">+{ach.xpReward} XP</Badge>
                <Badge variant="neutral" size="sm">{ach.criteria.type.replace("_", " ")}</Badge>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
                  <span>{ach.earnedCount} طالب</span>
                  <span>{ach.pct}%</span>
                </div>
                <Progress value={ach.pct} max={100} size="sm" variant={ach.pct > 50 ? "success" : ach.pct > 20 ? "primary" : "warning"} />
              </div>
              {selectedAch === ach.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs font-semibold text-text-secondary mb-2">الطلاب الحاصلون:</p>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto">
                    {studentsForAchievement(ach.id).slice(0, 10).map((s) => (
                      <div key={s.studentId} className="flex items-center gap-2 text-xs">
                        <Avatar name={s.studentName} size="sm" />
                        <span className="text-text">{s.studentName}</span>
                      </div>
                    ))}
                    {studentsForAchievement(ach.id).length > 10 && (
                      <button type="button"
                        onClick={(e) => { e.stopPropagation(); setShowAllStudents(ach.id) }}
                        className="text-primary text-xs hover:underline"
                      >
                        عرض الكل ({studentsForAchievement(ach.id).length})
                      </button>
                    )}
                  </div>
                  <Button type="button"
size="xs"
                    variant="primary"
                    className="mt-2 w-full"
                    onClick={(e) => { e.stopPropagation(); setAwardAchId(ach.id); setAwardStudentId(""); setShowAward(true) }}
                  >
                    منح هذا الإنجاز
                  </Button>
                </motion.div>
              )}
            </Card>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={showAward} onClose={() => setShowAward(false)} title="منح إنجاز لطالب" size="md">
        <div className="space-y-4">
          <Select
            label="الإنجاز"
            options={mockAchievements.map((a) => ({ value: a.id, label: `${a.icon} ${a.name}` }))}
            value={awardAchId}
            onChange={(e) => setAwardAchId(e.target.value)}
            placeholder="اختر الإنجاز"
          />
          <Select
            label="الطالب"
            options={mockStudentXpData.map((s) => ({ value: s.studentId, label: s.studentName }))}
            value={awardStudentId}
            onChange={(e) => setAwardStudentId(e.target.value)}
            placeholder="اختر الطالب"
          />
          <div className="flex gap-3 pt-2">
            <Button variant="primary" className="flex-1" disabled={!awardAchId || !awardStudentId} onClick={() => { setShowAward(false); toast.success("تم منح الإنجاز للطالب بنجاح") }}>
              <HiOutlineCheck className="w-4 h-4 ml-1" />
              منح الإنجاز
            </Button>
            <Button variant="secondary" onClick={() => setShowAward(false)}>
              <HiOutlineX className="w-4 h-4 ml-1" />
              إلغاء
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!showAllStudents} onClose={() => setShowAllStudents(null)} title="الطلاب الحاصلون على الإنجاز" size="lg">
        {showAllStudents && (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {studentsForAchievement(showAllStudents).map((s) => (
              <div key={s.studentId} className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-secondary transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar name={s.studentName} size="sm" />
                  <span className="font-medium text-text">{s.studentName}</span>
                </div>
                <Badge variant="primary" size="sm">مستوى {s.level}</Badge>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  )
}
